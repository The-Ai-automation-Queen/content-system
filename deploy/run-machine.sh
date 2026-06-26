#!/usr/bin/env bash
# run-machine.sh — run ONE Content OS skill headless via Claude Code, then
# commit + push whatever it produced. Retries on failure and pings Telegram.
#
#   Usage: ./run-machine.sh "/weekly-ops" [retries] [retry_delay_minutes]
#   e.g.   ./run-machine.sh "/signal-harvester" 1 120
#
# This is what cron calls. It is the "cron + retry + alert" layer that
# scheduler.config.json describes but doesn't execute on its own.
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="$(cd "$HERE/.." && pwd)"
cd "$REPO"

# Load secrets/keys. Doppler (preferred) or deploy/.env (fallback).
# Doppler injects secrets as env vars via `doppler run`. If Doppler is not
# configured, we fall back to sourcing the .env file directly.
if command -v doppler >/dev/null 2>&1 && doppler configs --json >/dev/null 2>&1; then
  USE_DOPPLER=1
else
  USE_DOPPLER=0
  set -a; [ -f "$HERE/.env" ] && . "$HERE/.env"; set +a
fi

SKILL="${1:?usage: run-machine.sh /skill-name [retries] [delay_min]}"
RETRIES="${2:-1}"
DELAY_MIN="${3:-120}"
BRANCH="$(git branch --show-current)"
TS="$(date +%Y-%m-%dT%H-%M-%S)"
LOGDIR="$HERE/logs"; mkdir -p "$LOGDIR"
LOG="$LOGDIR/${SKILL//\//}-$TS.log"

notify() { "$HERE/telegram-notify.sh" "$1" >/dev/null 2>&1 || true; }

echo "== ${SKILL} @ ${TS} (branch ${BRANCH}) ==" | tee -a "$LOG"

# Start from the latest state so the agent reasons over current data.
git pull --rebase --autostash origin "$BRANCH" >>"$LOG" 2>&1 || \
  echo "warn: git pull failed (continuing offline)" >>"$LOG"

run_once() {
  # Headless / non-interactive. --dangerously-skip-permissions is acceptable
  # here: it is YOUR VPS, YOUR repo, on a cron, and the skills are queue-only
  # per security.md (they never publish instantly). Tighten with --allowedTools
  # if you prefer a narrower grant.
  local CMD="claude -p \"Run the ${SKILL} skill end to end. Obey CLAUDE.md and security.md. \
Publishing is queue-only — never post instantly. End with the operator briefing.\" \
    --dangerously-skip-permissions"

  if [ "$USE_DOPPLER" -eq 1 ]; then
    doppler run -- bash -c "$CMD" >>"$LOG" 2>&1
  else
    bash -c "$CMD" >>"$LOG" 2>&1
  fi
}

attempt=0; ok=1
while :; do
  if run_once; then ok=0; break; fi
  attempt=$((attempt+1))
  if [ "$attempt" -gt "$RETRIES" ]; then break; fi
  notify "⚠️ ${SKILL} failed (attempt ${attempt}/${RETRIES}). Retrying in ${DELAY_MIN}m."
  echo "retry ${attempt} after ${DELAY_MIN}m" >>"$LOG"
  sleep $(( DELAY_MIN * 60 ))
done

# Persist whatever the agent wrote (drafts, reports, research, status moves).
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "ops(${SKILL//\//}): autonomous run ${TS}" >>"$LOG" 2>&1 || true
  if git push origin "$BRANCH" >>"$LOG" 2>&1; then
    echo "pushed." >>"$LOG"
  else
    notify "⚠️ ${SKILL}: git push failed — see ${LOG}"
  fi
fi

if [ "$ok" -ne 0 ]; then
  notify "❌ ${SKILL} FAILED after $((RETRIES+1)) attempts. Log: ${LOG}"
  exit 1
fi

notify "✅ ${SKILL} done. $(git log -1 --pretty=%s 2>/dev/null)"
echo "== done ${SKILL} ==" >>"$LOG"
