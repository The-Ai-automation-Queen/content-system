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

# Agent Reach is pinned to an audited commit, not a moving branch. Upstream's
# own docs tell you to `pip install .../archive/main.zip`, which installs
# whatever is on main at that moment — unsigned, unreviewed. Bump this SHA only
# after re-reading the diff.
AGENT_REACH_COMMIT="b4d52c46c9113cb0f653d6df4cf71ebadf4930ac"  # v1.5.0, audited 2026-07-29
AGENT_REACH_VENV="$HOME/.agent-reach-venv"

echo "==> 1/8  System packages"
sudo apt-get update -y
sudo apt-get install -y curl git ca-certificates gnupg apt-transport-https

echo "==> 2/8  Doppler CLI (secrets manager — replaces plain .env files)"
if ! command -v doppler >/dev/null 2>&1; then
  curl -sLf --retry 3 --tlsv1.2 --proto "=https" \
    "https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key" \
    | sudo gpg --dearmor -o /usr/share/keyrings/doppler-archive-keyring.gpg
  echo "deb [signed-by=/usr/share/keyrings/doppler-archive-keyring.gpg] https://packages.doppler.com/public/cli/deb/debian any-version main" \
    | sudo tee /etc/apt/sources.list.d/doppler-cli.list
  sudo apt-get update -y && sudo apt-get install -y doppler
fi
echo "    doppler $(doppler --version 2>/dev/null || echo 'not installed')"

echo "==> 3/8  Node.js 20 (skipped if already present)"
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
echo "    node $(node -v)"

echo "==> 4/8  Claude Code CLI"
sudo npm i -g @anthropic-ai/claude-code
claude --version || true

echo "==> 5/8  Dashboard dependencies"
( cd "$REPO/dashboard" && npm ci )

echo "==> 6/8  deploy/.env (fallback) + executable scripts"
if [ ! -f "$HERE/.env" ]; then
  cp "$HERE/.env.example" "$HERE/.env"
  echo "    Created deploy/.env — EDIT IT and paste your keys before the first run."
fi
chmod +x "$HERE"/*.sh

echo "==> 7/8  Dashboard always-on service (systemd)"
sed "s|__REPO__|$REPO|g; s|__USER__|$USER|g" "$HERE/content-os-dashboard.service" \
  | sudo tee /etc/systemd/system/content-os-dashboard.service >/dev/null
sudo systemctl daemon-reload
sudo systemctl enable --now content-os-dashboard.service

echo "==> 8/8  Agent Reach (read-the-internet CLI for the machines)"
# Installed into a user-owned venv, never system Python: avoids PEP 668 and
# keeps it out of root's site-packages. --safe means it never apt-installs or
# npm-installs anything behind your back; step 3 already provided Node.
# Optional infrastructure — a failure here must not abort the bootstrap.
if python3 -m venv --help >/dev/null 2>&1; then
  (
    set -e
    [ -d "$AGENT_REACH_VENV" ] || python3 -m venv "$AGENT_REACH_VENV"
    "$AGENT_REACH_VENV/bin/pip" install --quiet --upgrade pip setuptools wheel
    "$AGENT_REACH_VENV/bin/pip" install --quiet \
      "git+https://github.com/Panniantong/agent-reach.git@${AGENT_REACH_COMMIT}"

    # yt-dlp needs an external JS runtime for YouTube since 2026-06.
    mkdir -p "$HOME/.config/yt-dlp"
    grep -qxF -- '--js-runtimes node' "$HOME/.config/yt-dlp/config" 2>/dev/null \
      || printf '%s\n' '--js-runtimes node' >> "$HOME/.config/yt-dlp/config"

    # Put `agent-reach` on PATH for interactive shells. Crons get a bare PATH,
    # so schedule the venv binary by absolute path instead.
    mkdir -p "$HOME/.local/bin"
    ln -sf "$AGENT_REACH_VENV/bin/agent-reach" "$HOME/.local/bin/agent-reach"

    # Register the skill so `claude -p` in run-machine.sh actually knows these
    # commands exist. Two upstream gotchas, both load-bearing:
    #   1. The installer only targets ~/.claude/skills if that directory
    #      ALREADY exists. Otherwise it silently falls back to ~/.agents/skills,
    #      which Claude Code never reads — the skill installs and does nothing.
    #   2. It ships a Chinese SKILL.md by default and only picks the English one
    #      when the locale says so. AGENT_REACH_LANG=en forces it.
    mkdir -p "$HOME/.claude/skills"
    AGENT_REACH_LANG=en "$AGENT_REACH_VENV/bin/agent-reach" skill --install
  ) && echo "    agent-reach $("$AGENT_REACH_VENV/bin/agent-reach" version 2>/dev/null || echo '(installed)')" \
    || echo "    [!] Agent Reach install failed — non-fatal, see deploy/README.md"
else
  echo "    [!] python3-venv missing (sudo apt-get install -y python3-venv) — skipped"
fi

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

Dashboard:  http://localhost:4322  via SSH tunnel  (ssh -L 4322:localhost:4322 $USER@<vps-ip>)
            UFW keeps :4322 private — see deploy/SECURITY.md.
EOF
