#!/usr/bin/env bash
# telegram-notify.sh — send one message to your Telegram bot.
# Usage: ./telegram-notify.sh "your message"
# No-ops quietly if the bot isn't configured yet, so it never breaks a run.
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Load secrets from Doppler (preferred) or deploy/.env (fallback).
if command -v doppler >/dev/null 2>&1 && doppler configs --json >/dev/null 2>&1; then
  eval "$(doppler secrets download --no-file --format env 2>/dev/null)" || true
else
  set -a; [ -f "$HERE/.env" ] && . "$HERE/.env"; set +a
fi

MSG="${1:?usage: telegram-notify.sh <message>}"

if [ -z "${TELEGRAM_BOT_TOKEN:-}" ] || [ -z "${TELEGRAM_CHAT_ID:-}" ]; then
  echo "telegram-notify: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set — skipping."
  exit 0
fi

curl -sS -m 15 \
  "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d "chat_id=${TELEGRAM_CHAT_ID}" \
  --data-urlencode "text=👑 [Content OS] ${MSG}" >/dev/null \
  && echo "telegram-notify: sent." \
  || echo "telegram-notify: send failed (non-fatal)."
