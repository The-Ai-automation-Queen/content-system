#!/usr/bin/env bash
set -Eeuo pipefail

MODE="deploy"
if [[ "${1:-}" == "--check" ]]; then
  MODE="check"
elif [[ -n "${1:-}" ]]; then
  echo "Usage: $0 [--check]" >&2
  exit 64
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SOURCE_ROOT="$REPO_ROOT/ai-insider-brief/ai-insider-brief/pipeline"
RUNTIME_ROOT="${NEWSLETTER_AGENT_RUNTIME_ROOT:-/root/ai-insider-brief-pipeline}"
SERVICE_SOURCE="$REPO_ROOT/deploy/brief-migration/insider-brief-bot.service"
SERVICE_TARGET="${NEWSLETTER_AGENT_SERVICE_TARGET:-/etc/systemd/system/insider-brief-bot.service}"
BACKUPS_ROOT="${NEWSLETTER_AGENT_BACKUPS_ROOT:-/var/backups/content-system-newsletter-agent}"
STATE_DIR="${NEWSLETTER_AGENT_STATE_DIR:-/var/lib/ai-insider-brief}"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
REVISION="$(git -c safe.directory="$REPO_ROOT" -C "$REPO_ROOT" rev-parse --short=12 HEAD 2>/dev/null || printf 'manual')"
BACKUP="$BACKUPS_ROOT/$TIMESTAMP-$REVISION"

runtime_files=(
  approval-bot.mjs
  archive-old-cards.mjs
  config-loader.mjs
  crawler.mjs
  health-check.mjs
  newsletter-sender.mjs
  prompts.mjs
  run.mjs
  setup-kit.mjs
  sources.json
  sync-briefs.sh
  synthesizer.mjs
  telegram.mjs
  tuesday-preview.mjs
  weekly-audit.mjs
  config.env
)

for file in "${runtime_files[@]}"; do
  if [[ ! -s "$SOURCE_ROOT/$file" ]]; then
    echo "Missing newsletter agent source file: $SOURCE_ROOT/$file" >&2
    exit 1
  fi
done
if [[ ! -s "$SERVICE_SOURCE" ]]; then
  echo "Missing newsletter agent service: $SERVICE_SOURCE" >&2
  exit 1
fi

for file in "$SOURCE_ROOT"/*.mjs; do
  node --check "$file"
done
jq -e 'type == "object" and (.sources | type == "array") and (.sources | length > 0)' "$SOURCE_ROOT/sources.json" >/dev/null
systemd-analyze verify "$SERVICE_SOURCE" >/dev/null

if [[ "$MODE" == "check" ]]; then
  echo "Newsletter agent source validated."
  exit 0
fi

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Newsletter agent deployment must run as root." >&2
  exit 1
fi

required_runtime_files=(
  .env
  cards-pending.json
  state.json
  data/briefs.json
)
for file in "${required_runtime_files[@]}"; do
  if [[ ! -s "$RUNTIME_ROOT/$file" ]]; then
    echo "Missing persistent newsletter agent state: $RUNTIME_ROOT/$file" >&2
    exit 1
  fi
done
jq -e 'type == "array"' "$RUNTIME_ROOT/cards-pending.json" >/dev/null
jq -e 'type == "object"' "$RUNTIME_ROOT/state.json" >/dev/null
jq -e 'type == "object" and (.cards | type == "array") and (.cards | length > 0)' "$RUNTIME_ROOT/data/briefs.json" >/dev/null

resolved="$(cd "$SOURCE_ROOT" && ENV_PATH="$RUNTIME_ROOT/.env" node --input-type=module -e 'import { loadMergedConfig, resolveLLMConfig } from "./config-loader.mjs"; const resolved = resolveLLMConfig(loadMergedConfig(process.cwd()).env); console.log([resolved.provider, resolved.model || "", resolved.ollamaUrl || ""].join("|"));')"
IFS='|' read -r provider model ollama_url <<< "$resolved"
if [[ "$provider" == "ollama" ]]; then
  tags="$(curl --fail --silent --show-error --max-time 10 "$ollama_url/api/tags")"
  if ! jq -e --arg model "$model" '.models | any((.name // .model) == $model)' <<< "$tags" >/dev/null; then
    echo "Configured Ollama model is not installed: $model" >&2
    exit 1
  fi
fi

changed=0
for file in "${runtime_files[@]}"; do
  if ! cmp -s "$SOURCE_ROOT/$file" "$RUNTIME_ROOT/$file"; then
    changed=1
    break
  fi
done
if ! cmp -s "$SERVICE_SOURCE" "$SERVICE_TARGET"; then
  changed=1
fi

if [[ "$changed" -eq 0 ]] && systemctl is-active --quiet insider-brief-bot.service; then
  printf '%s\n' "$REVISION" > "$STATE_DIR/agent-deployed-commit"
  echo "Newsletter agent is already current and active ($REVISION, $provider/$model)."
  exit 0
fi

install -d -m 0700 "$BACKUP"
cp -a "$RUNTIME_ROOT" "$BACKUP/runtime"
service_existed=0
service_was_active=0
if [[ -f "$SERVICE_TARGET" ]]; then
  service_existed=1
  cp -a "$SERVICE_TARGET" "$BACKUP/insider-brief-bot.service"
fi
if systemctl is-active --quiet insider-brief-bot.service; then
  service_was_active=1
fi

restore_previous() {
  set +e
  systemctl stop insider-brief-bot.service
  for file in "${runtime_files[@]}"; do
    if [[ -e "$BACKUP/runtime/$file" ]]; then
      install -D -m "$(stat -c '%a' "$BACKUP/runtime/$file")" "$BACKUP/runtime/$file" "$RUNTIME_ROOT/$file"
    else
      rm -f "$RUNTIME_ROOT/$file"
    fi
  done
  if [[ "$service_existed" -eq 1 ]]; then
    install -m 0644 "$BACKUP/insider-brief-bot.service" "$SERVICE_TARGET"
  else
    rm -f "$SERVICE_TARGET"
  fi
  systemctl daemon-reload
  if [[ "$service_was_active" -eq 1 ]]; then
    systemctl start insider-brief-bot.service
  fi
  echo "Newsletter agent code rolled back to $BACKUP/runtime" >&2
}

if [[ "$service_was_active" -eq 1 ]]; then
  systemctl stop insider-brief-bot.service
fi

for file in "${runtime_files[@]}"; do
  mode=0644
  if [[ "$file" == "sync-briefs.sh" ]]; then
    mode=0755
  fi
  install -D -m "$mode" "$SOURCE_ROOT/$file" "$RUNTIME_ROOT/$file"
done
install -m 0644 "$SERVICE_SOURCE" "$SERVICE_TARGET"
systemctl daemon-reload
systemctl enable insider-brief-bot.service >/dev/null

if ! systemctl restart insider-brief-bot.service; then
  restore_previous
  exit 1
fi

sleep 5
healthy=0
if systemctl is-active --quiet insider-brief-bot.service \
  && [[ "$(systemctl show insider-brief-bot.service -p MainPID --value)" != "0" ]] \
  && [[ "$(systemctl show insider-brief-bot.service -p NRestarts --value)" == "0" ]]; then
  healthy=1
fi
if [[ "$healthy" -ne 1 ]]; then
  systemctl status insider-brief-bot.service --no-pager -l >&2 || true
  restore_previous
  exit 1
fi

install -d -m 0750 -o root -g www-data "$STATE_DIR"
printf '%s\n' "$REVISION" > "$STATE_DIR/agent-deployed-commit"
echo "Newsletter agent deployed successfully: $REVISION ($provider/$model)"
echo "Backup: $BACKUP"
