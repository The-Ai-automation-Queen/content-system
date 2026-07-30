#!/usr/bin/env bash
set -Eeuo pipefail

RUNTIME_ROOT="${NEWSLETTER_AGENT_RUNTIME_ROOT:-/root/ai-insider-brief-pipeline}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SOURCE_BRIEFS="${NEWSLETTER_SOURCE_BRIEFS:-$REPO_ROOT/ai-insider-brief/ai-insider-brief/data/briefs.json}"
PUBLIC_STATE="${NEWSLETTER_PUBLIC_STATE:-/var/lib/ai-insider-brief/briefs.json}"
BACKUP_ROOT="${NEWSLETTER_MIGRATION_BACKUP_ROOT:-/var/backups/content-system-newsletter-v2}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP="$BACKUP_ROOT/$STAMP"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run as root." >&2
  exit 1
fi

install -d -m 0700 "$BACKUP"
cp -a "$RUNTIME_ROOT/.env" "$BACKUP/env"
cp -a "$RUNTIME_ROOT/cards-pending.json" "$BACKUP/cards-pending.json"
cp -a "$PUBLIC_STATE" "$BACKUP/briefs.json"
crontab -l > "$BACKUP/crontab"

jq -e 'type == "object" and (.cards | type == "array") and ([.cards[] | select(.editorial_contract_version == 2)] | length > 0)' "$SOURCE_BRIEFS" >/dev/null

set_env() {
  local key="$1" value="$2"
  if grep -q "^${key}=" "$RUNTIME_ROOT/.env"; then
    sed -i "s|^${key}=.*|${key}=${value}|" "$RUNTIME_ROOT/.env"
  else
    printf '%s=%s\n' "$key" "$value" >> "$RUNTIME_ROOT/.env"
  fi
}

set_env LLM_PROVIDER ollama
set_env OLLAMA_MODEL gemma4:31b-cloud
set_env MAX_CARDS_PER_RUN 5
set_env MAX_CARDS_PER_DAY 8
set_env BRIEFS_JSON_PATH /var/www/ai-insider-brief/data/briefs.json

cd "$RUNTIME_ROOT"
node quarantine-legacy-pending.mjs --apply

# Publish the reviewed Git snapshot atomically. The public release points at
# this persistent state file, and future approved cards continue from it.
state_tmp="$(mktemp "$(dirname "$PUBLIC_STATE")/.briefs.v2.XXXXXX")"
trap 'rm -f "$state_tmp"' EXIT
install -o root -g www-data -m 0664 "$SOURCE_BRIEFS" "$state_tmp"
mv -f "$state_tmp" "$PUBLIC_STATE"
trap - EXIT

old_pattern='newsletter-sender.mjs semiweekly'
new_pattern='tuesday-preview.mjs'
old_count="$(grep -c "$old_pattern" "$BACKUP/crontab" || true)"
new_count="$(grep -c "$new_pattern" "$BACKUP/crontab" || true)"
if [[ "$old_count" -eq 1 && "$new_count" -eq 0 ]]; then
  awk '
    /newsletter-sender\.mjs semiweekly/ {
      print "# insider-brief: Tuesday human preview at 05:30 GST (01:30 UTC)"
      print "30 1 * * 2 cd /root/ai-insider-brief-pipeline && node tuesday-preview.mjs >> /var/log/insider-brief-preview.log 2>&1"
      next
    }
    { print }
  ' "$BACKUP/crontab" > "$BACKUP/crontab.v2"
  crontab "$BACKUP/crontab.v2"
elif [[ "$old_count" -eq 0 && "$new_count" -eq 1 ]]; then
  echo "Crontab is already on the Tuesday preview schedule."
else
  echo "Unexpected newsletter cron state (old=$old_count new=$new_count); refusing to edit." >&2
  exit 1
fi

systemctl restart insider-brief-bot.service
sleep 5
systemctl is-active --quiet insider-brief-bot.service
[[ "$(systemctl show insider-brief-bot.service -p NRestarts --value)" == "0" ]]
node health-check.mjs

echo "Newsletter v2 migration complete."
echo "Backup: $BACKUP"
echo "No newsletter was sent by this migration."
