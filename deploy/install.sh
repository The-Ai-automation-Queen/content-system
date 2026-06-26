#!/usr/bin/env bash
# install.sh — one-shot bootstrap for the Content OS autonomous runner on a
# fresh Ubuntu/Debian VPS (e.g. Hostinger). Run from a sudo-capable user:
#
#   git clone <repo> ~/content-system
#   cd ~/content-system && bash deploy/install.sh
#
# It is idempotent — safe to re-run after editing deploy/.env.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="$(cd "$HERE/.." && pwd)"

echo "==> 1/7  System packages"
sudo apt-get update -y
sudo apt-get install -y curl git ca-certificates gnupg apt-transport-https

echo "==> 2/7  Doppler CLI (secrets manager — replaces plain .env files)"
if ! command -v doppler >/dev/null 2>&1; then
  curl -sLf --retry 3 --tlsv1.2 --proto "=https" \
    "https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key" \
    | sudo gpg --dearmor -o /usr/share/keyrings/doppler-archive-keyring.gpg
  echo "deb [signed-by=/usr/share/keyrings/doppler-archive-keyring.gpg] https://packages.doppler.com/public/cli/deb/debian any-version main" \
    | sudo tee /etc/apt/sources.list.d/doppler-cli.list
  sudo apt-get update -y && sudo apt-get install -y doppler
fi
echo "    doppler $(doppler --version 2>/dev/null || echo 'not installed')"

echo "==> 3/7  Node.js 20 (skipped if already present)"
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
echo "    node $(node -v)"

echo "==> 4/7  Claude Code CLI"
sudo npm i -g @anthropic-ai/claude-code
claude --version || true

echo "==> 5/7  Dashboard dependencies"
( cd "$REPO/dashboard" && npm ci )

echo "==> 6/7  deploy/.env (fallback) + executable scripts"
if [ ! -f "$HERE/.env" ]; then
  cp "$HERE/.env.example" "$HERE/.env"
  echo "    Created deploy/.env — EDIT IT and paste your keys before the first run."
fi
chmod +x "$HERE"/*.sh

echo "==> 7/7  Dashboard always-on service (systemd)"
sed "s|__REPO__|$REPO|g; s|__USER__|$USER|g" "$HERE/content-os-dashboard.service" \
  | sudo tee /etc/systemd/system/content-os-dashboard.service >/dev/null
sudo systemctl daemon-reload
sudo systemctl enable --now content-os-dashboard.service

cat <<EOF

✅ Bootstrap complete.

Next steps (see deploy/README.md for the full runbook):

  === SECRETS (pick one) ===
  Option A — Doppler (recommended, encrypted + auditable):
    1. doppler login                        # authenticate with your Doppler account
    2. doppler setup                        # select project + config (e.g. content-os / prd)
    3. doppler secrets set TELEGRAM_BOT_TOKEN=xxx TELEGRAM_CHAT_ID=xxx  # add your keys
       (add ANTHROPIC_API_KEY, HEYGEN_API_KEY, UNIPILE_API_KEY, etc. the same way)

  Option B — .env file (fallback, plain text):
    1. nano deploy/.env                     # paste keys (Telegram + machine APIs)

  === THEN ===
  2. claude login                          # ONLY if you left ANTHROPIC_API_KEY blank
  3. ./deploy/telegram-notify.sh "hello"   # confirm Telegram works
  4. ssh-copy-id $USER@<vps-ip>            # make sure your SSH key is installed, then:
     ./deploy/harden-vps.sh                # PLAN the security hardening (read it)
     sudo ./deploy/harden-vps.sh apply     # APPLY, then test SSH in a 2nd session (see SECURITY.md)
  5. ./deploy/run-machine.sh "/vault-audit" 0 0   # smoke-test one machine
  6. sed -i "s|__REPO__|\$PWD|g" deploy/crontab.example && crontab deploy/crontab.example

Dashboard:  http://localhost:4321  via SSH tunnel  (ssh -L 4321:localhost:4321 $USER@<vps-ip>)
            UFW keeps :4321 private — see deploy/SECURITY.md.
EOF
