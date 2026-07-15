#!/usr/bin/env bash
set -Eeuo pipefail

SOURCE="/root/ai-insider-brief-pipeline/data/briefs.json"
TARGET="/var/lib/ai-insider-brief/briefs.json"

jq -e 'type == "object" and (.cards | type == "array") and (.cards | length > 0)' "$SOURCE" >/dev/null
install -d -m 0750 -o root -g www-data "$(dirname "$TARGET")"
temporary="$(mktemp "$(dirname "$TARGET")/.briefs.json.sync.XXXXXX")"
trap 'rm -f "$temporary"' EXIT
install -o root -g www-data -m 0664 "$SOURCE" "$temporary"
mv -f "$temporary" "$TARGET"
trap - EXIT

echo "Published newsletter state synchronized to $TARGET"
