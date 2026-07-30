#!/usr/bin/env bash
# hermes-watchdog.sh — checks ONE thing: is Hermes actually alive on this
# machine. Nothing else. Deliberately kept outside Hermes and outside
# run-machine.sh, on plain Unix cron, so a Hermes crash can't also take down
# the thing that's supposed to notice the crash.
#
# Why this exists: the 99-campaign trigger (hiring-campaign) is now fired by
# Hermes' own cron, not this repo's cron. If Hermes' gateway process dies,
# Hermes' cron dies with it — and nothing inside Hermes can tell you that,
# by definition. This script is the outside check. It has one job and it's
# boring on purpose: curl a health endpoint, alert if it doesn't answer,
# say nothing if it does.
#
# Usage: ./hermes-watchdog.sh
# Install on plain cron (see crontab.example) — NOT inside Hermes.

set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Hermes' API server binds to loopback only (127.0.0.1:8642 by default) and
# this script runs on the same VPS as Hermes, so no tunnel is needed here —
# the SSH tunnel in ACTIVATION-RUNBOOK.md is only for reaching it from a Mac.
HEALTH_URL="${HERMES_HEALTH_URL:-http://127.0.0.1:8642/health}"

if curl -fsS -m 10 "$HEALTH_URL" >/dev/null 2>&1; then
  # Healthy. Say nothing — matches this repo's "success is silent" convention.
  exit 0
fi

"$HERE/telegram-notify.sh" "🚨 Hermes did not answer its health check (${HEALTH_URL}). It may be down — the Monday hiring-campaign trigger and any other Hermes cron jobs will silently not fire until this is fixed. Check: systemctl --user status (or the Docker container), then \`hermes doctor\`." \
  >/dev/null 2>&1 || true
