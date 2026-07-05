#!/usr/bin/env bash
# ONE-COMMAND VPS BOOTSTRAP — Hostinger (Ubuntu 22.04/24.04)
#
# Chains the existing runbooks into a single guided pass. Idempotent: safe to
# re-run; each phase checks before it acts. Run as your normal user (not root)
# from anywhere:   bash content-system/deploy/bootstrap-vps.sh
#
# What it does (and where the detail lives):
#   1. Repos into ~/       — content-system, fast-forward, agent-os-company-dashboard
#   2. Hardening           — deploy/harden-vps.sh (interactive; anti-lockout protocol)
#   3. Machine install     — deploy/install.sh + crontab.example (the daily loops)
#   4. Hermes              — pipx install + profile kit (agent-os repo: hermes/)
#   5. Dashboard           — npm install + QUEEN_BRAIN_DIR wiring + roster seed
# What it does NOT do: handle secrets (keys go in via Doppler / ~/.hermes —
# see deploy/SECURITY.md), open any port, or enable any scheduled job.

set -euo pipefail
cd "$HOME"
GH=git@github.com:the-ai-automation-queen
step() { printf '\n\033[1m== %s ==\033[0m\n' "$*"; }

step "1/5 Repos"
for r in content-system fast-forward agent-os-company-dashboard; do
  if [ -d "$HOME/$r/.git" ]; then git -C "$HOME/$r" pull --ff-only || true
  else git clone "$GH/$r.git" "$HOME/$r"; fi
done

step "2/5 Hardening (skip with SKIP_HARDEN=1 if already done)"
[ "${SKIP_HARDEN:-0}" = "1" ] || bash "$HOME/content-system/deploy/harden-vps.sh"

step "3/5 Content machine (install + crons)"
bash "$HOME/content-system/deploy/install.sh"
echo "Review and install the cron schedule:"
echo "  crontab -e   # paste from content-system/deploy/crontab.example"
echo "Then follow deploy/SETUP-GUIDE.md for Telegram + Doppler secrets."

step "4/5 Hermes (24/7 agent)"
command -v pipx >/dev/null 2>&1 || sudo apt-get install -y pipx
pipx install hermes-agent 2>/dev/null || pipx upgrade hermes-agent
if [ ! -f "$HOME/.hermes/profiles/main/.env" ]; then
  echo "!! Copy your Hermes config from the Mac first:  scp -r ~/.hermes vps:~/"
  echo "   Then re-run this script to finish Hermes setup."
else
  bash "$HOME/agent-os-company-dashboard/hermes/install-hermes-setup.sh"
  echo "Gateway service: hermes gateway install && sudo loginctl enable-linger $USER"
fi

step "5/5 Dashboard (agent company)"
cd "$HOME/agent-os-company-dashboard"
command -v npm >/dev/null 2>&1 || { echo "!! Install Node 20+ first (e.g. via nvm), then re-run."; exit 1; }
npm install --no-audit --no-fund
# ONE BRAIN: the company agents read the content-system repo, not a stub.
grep -q QUEEN_BRAIN_DIR "$HOME/.profile" 2>/dev/null || \
  echo "export QUEEN_BRAIN_DIR=\"$HOME/content-system\"" >> "$HOME/.profile"
echo "Start it (keep it private — access via SSH tunnel only, never a public port):"
echo "  QUEEN_BRAIN_DIR=\$HOME/content-system npm run build && npm run start"
echo "Then seed the agent roster (jobs arrive DISABLED for your review):"
echo "  node scripts/seed-company-roster.mjs"

step "Done"
echo "Remaining human steps live in: content-system/docs/OPERATOR-PLAYBOOK.md (Phase 2 tests)"
echo "and agent-os-company-dashboard/hermes/ACTIVATION-RUNBOOK.md (steps 3-6)."
