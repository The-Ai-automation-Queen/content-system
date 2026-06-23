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

echo "==> 1/6  System packages"
sudo apt-get update -y
sudo apt-get install -y curl git ca-certificates

echo "==> 2/6  Node.js 20 (skipped if already present)"
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
echo "    node $(node -v)"

echo "==> 3/6  Claude Code CLI"
sudo npm i -g @anthropic-ai/claude-code
claude --version || true

echo "==> 4/6  Dashboard dependencies"
( cd "$REPO/dashboard" && npm ci )

echo "==> 5/6  deploy/.env + executable scripts"
if [ ! -f "$HERE/.env" ]; then
  cp "$HERE/.env.example" "$HERE/.env"
  echo "    Created deploy/.env — EDIT IT and paste your keys before the first run."
fi
chmod +x "$HERE"/*.sh

echo "==> 6/6  Dashboard always-on service (systemd)"
sed "s|__REPO__|$REPO|g; s|__USER__|$USER|g" "$HERE/content-os-dashboard.service" \
  | sudo tee /etc/systemd/system/content-os-dashboard.service >/dev/null
sudo systemctl daemon-reload
sudo systemctl enable --now content-os-dashboard.service

cat <<EOF

✅ Bootstrap complete.

Next steps (see deploy/README.md for the full runbook):
  1. nano deploy/.env                      # paste keys (Telegram + machine APIs)
  2. claude login                          # ONLY if you left ANTHROPIC_API_KEY blank
  3. ./deploy/telegram-notify.sh "hello"   # confirm Telegram works
  4. ./deploy/run-machine.sh "/vault-audit" 0 0   # smoke-test one machine
  5. sed -i "s|__REPO__|$REPO|g" deploy/crontab.example && crontab deploy/crontab.example

Dashboard:  http://<your-vps-ip>:4321   (systemctl status content-os-dashboard)
EOF
