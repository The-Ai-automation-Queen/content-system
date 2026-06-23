#!/usr/bin/env bash
# harden-vps.sh — base security hardening for the Content OS VPS.
#
# Adapted from the affiseo.fr guide "Audit Sécurité — VPS & Agents IA"
# (step-04 VPS hardening). Faithful to its safety workflow:
#   PLAN first → you validate → backup every file before editing → test before trusting.
#
#   ./harden-vps.sh                 # PLAN mode (default): prints what it WOULD do, changes nothing
#   sudo ./harden-vps.sh apply      # applies it, backing up every file first
#
# Covers: unattended-upgrades (security), fail2ban (sshd jail), UFW
# (deny-in/allow-out), SSH hardening (root off, key-only, sane limits).
#
# Deliberately does NOT change the SSH port (you choose that manually — see
# SECURITY.md) and NEVER disables password auth unless your key is already
# installed, so it can't lock you out.
set -uo pipefail

MODE="${1:-plan}"
STAMP="$(date +%Y%m%d-%H%M)"
BK="${HOME}/security-audit/04-vps/backups/${STAMP}"
SSH_USER="${SUDO_USER:-${USER:-$(id -un)}}"
USER_HOME="$(getent passwd "$SSH_USER" | cut -d: -f6)"
USER_HOME="${USER_HOME:-$HOME}"

c_hdr() { printf '\n\033[1m== %s ==\033[0m\n' "$1"; }
p()     { printf '  [PLAN]  %s\n' "$1"; }
a()     { printf '  [APPLY] %s\n' "$1"; }
warn()  { printf '  \033[33m[WARN] %s\033[0m\n' "$1"; }
applying() { [ "$MODE" = "apply" ]; }

# Detect the live SSH port so UFW/fail2ban never lock us out.
SSH_PORT="$(grep -iE '^[[:space:]]*Port[[:space:]]+[0-9]+' /etc/ssh/sshd_config 2>/dev/null | awk '{print $2}' | tail -1)"
SSH_PORT="${SSH_PORT:-22}"

if applying; then
  if [ "$(id -u)" -ne 0 ]; then echo "apply mode needs root:  sudo ./harden-vps.sh apply"; exit 1; fi
  mkdir -p "$BK"; echo "Backups → $BK"
else
  echo "PLAN MODE — nothing will change. Re-run with 'sudo ./harden-vps.sh apply' to execute."
fi
echo "SSH user: ${SSH_USER}   ·   detected SSH port: ${SSH_PORT}"

backup() { applying && [ -f "$1" ] && cp -a "$1" "$BK/" && a "backed up $1"; }

# ─────────────────────────────────────────────────────────────
c_hdr "1. Automatic security updates (unattended-upgrades)"
if applying; then
  a "install unattended-upgrades"; DEBIAN_FRONTEND=noninteractive apt-get install -y unattended-upgrades >/dev/null
  a "enable security auto-updates"
  cat >/etc/apt/apt.conf.d/20auto-upgrades <<'EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
EOF
else
  p "apt-get install unattended-upgrades; enable daily security upgrades"
  p "(optional) set notification email in /etc/apt/apt.conf.d/50unattended-upgrades"
fi

# ─────────────────────────────────────────────────────────────
c_hdr "2. fail2ban (ban brute-force SSH: bantime 1h, findtime 10m, maxretry 3)"
if applying; then
  a "install fail2ban"; apt-get install -y fail2ban >/dev/null
  a "write /etc/fail2ban/jail.d/sshd.local"
  cat >/etc/fail2ban/jail.d/sshd.local <<EOF
[sshd]
enabled  = true
port     = ${SSH_PORT}
bantime  = 1h
findtime = 10m
maxretry = 3
EOF
  systemctl enable --now fail2ban >/dev/null 2>&1 || true
  systemctl restart fail2ban || true
else
  p "apt-get install fail2ban; enable sshd jail on port ${SSH_PORT} (bantime 1h / findtime 10m / maxretry 3)"
fi

# ─────────────────────────────────────────────────────────────
c_hdr "3. Firewall (UFW: deny incoming, allow outgoing, SSH only)"
if applying; then
  a "install ufw"; apt-get install -y ufw >/dev/null
  a "default deny incoming / allow outgoing"
  ufw default deny incoming >/dev/null
  ufw default allow outgoing >/dev/null
  a "allow SSH on ${SSH_PORT}/tcp (before enabling, so we don't lock out)"
  ufw allow "${SSH_PORT}/tcp" >/dev/null
  command -v tailscale >/dev/null 2>&1 && { a "Tailscale detected → allow in on tailscale0"; ufw allow in on tailscale0 >/dev/null || true; }
  a "enable UFW"
  ufw --force enable >/dev/null
  warn "Dashboard port 4321 is intentionally NOT opened — reach it via SSH tunnel:"
  warn "    ssh -L 4321:localhost:4321 ${SSH_USER}@<vps-ip>   then open http://localhost:4321"
  warn "Open 80/443 ONLY if you put a reverse proxy in front:  ufw allow 80/tcp && ufw allow 443/tcp"
else
  p "ufw default deny incoming / allow outgoing"
  p "ufw allow ${SSH_PORT}/tcp   (SSH); allow in on tailscale0 if Tailscale present"
  p "ufw --force enable  — everything else closed, incl. dashboard :4321 (reach via SSH tunnel/Tailscale)"
  p "80/443 left CLOSED unless you add a reverse proxy"
fi

# ─────────────────────────────────────────────────────────────
c_hdr "4. SSH hardening (root off, key-only, sane limits)"
KEYS="${USER_HOME}/.ssh/authorized_keys"
HAS_KEY=0; [ -s "$KEYS" ] && HAS_KEY=1
DROPIN="/etc/ssh/sshd_config.d/99-content-os-hardening.conf"

if [ "$HAS_KEY" -eq 1 ]; then
  echo "  ✓ ${SSH_USER} has an SSH key in ${KEYS} → safe to disable password login."
  PW_LINE="PasswordAuthentication no"
else
  warn "${SSH_USER} has NO key in ${KEYS}. Keeping password login ON to avoid lockout."
  warn "Add your key first:  ssh-copy-id ${SSH_USER}@<vps-ip>   then re-run apply."
  PW_LINE="# PasswordAuthentication no   # left enabled: no SSH key found for ${SSH_USER}"
fi

if applying; then
  backup /etc/ssh/sshd_config
  a "write drop-in ${DROPIN}"
  cat >"$DROPIN" <<EOF
# Content OS hardening (affiseo step-04). Remove this file to fully revert.
PermitRootLogin no
PubkeyAuthentication yes
${PW_LINE}
MaxAuthTries 3
LoginGraceTime 30
ClientAliveInterval 300
ClientAliveCountMax 2
X11Forwarding no
AllowTcpForwarding no
AllowUsers ${SSH_USER}
EOF
  a "validate config with 'sshd -t'"
  if sshd -t; then
    systemctl reload ssh 2>/dev/null || systemctl reload sshd 2>/dev/null || service ssh reload
    a "SSH reloaded."
    printf '\n  \033[1;31m>>> TEST NOW, before closing this session: open a NEW terminal and run\033[0m\n'
    printf '      ssh %s@<vps-ip>\n' "$SSH_USER"
    printf '  \033[1;31m>>> If it fails, this session is still open — delete %s and reload.\033[0m\n' "$DROPIN"
  else
    warn "sshd -t FAILED — removing drop-in, no changes applied."
    rm -f "$DROPIN"
  fi
else
  p "backup /etc/ssh/sshd_config, then write drop-in ${DROPIN} with:"
  p "   PermitRootLogin no · PubkeyAuthentication yes · ${PW_LINE}"
  p "   MaxAuthTries 3 · LoginGraceTime 30 · ClientAliveInterval 300 · ClientAliveCountMax 2"
  p "   X11Forwarding no · AllowTcpForwarding no · AllowUsers ${SSH_USER}"
  p "validate with 'sshd -t', reload SSH, then TEST in a second session before logging out"
  echo
  warn "Port change (22 → 22000-65000) is NOT automated — see SECURITY.md if you want it."
fi

c_hdr "Done (${MODE} mode)"
applying && echo "Backups kept in ${BK}. Revert SSH by deleting ${DROPIN} and reloading."
echo "Full runbook + the audit/remediation workflow: deploy/SECURITY.md"
