#!/usr/bin/env bash
set -Eeuo pipefail

SOURCE_URL="${NEWSLETTER_MIRROR_SOURCE_URL:-https://brief.shiftandlead.com/data/briefs.json}"
TARGET="${NEWSLETTER_MIRROR_TARGET:-ai-insider-brief/ai-insider-brief/data/briefs.json}"
MAX_BYTES="${NEWSLETTER_MIRROR_MAX_BYTES:-2097152}"

if [[ "$SOURCE_URL" != https://* ]]; then
  echo "Newsletter mirror source must use HTTPS." >&2
  exit 1
fi
if [[ ! -f "$TARGET" || -L "$TARGET" ]]; then
  echo "Newsletter mirror target must be an existing regular file: $TARGET" >&2
  exit 1
fi

download="$(mktemp)"
normalized="$(mktemp)"
trap 'rm -f "$download" "$normalized"' EXIT

curl \
  --proto '=https' \
  --tlsv1.2 \
  --fail \
  --silent \
  --show-error \
  --location \
  --max-time 30 \
  --max-filesize "$MAX_BYTES" \
  --retry 3 \
  --retry-all-errors \
  --output "$download" \
  "$SOURCE_URL"

download_bytes="$(wc -c < "$download" | tr -d ' ')"
if (( download_bytes < 10 || download_bytes > MAX_BYTES )); then
  echo "Downloaded newsletter state has an unsafe size: $download_bytes bytes." >&2
  exit 1
fi

validate_newsletter() {
  jq -e '
    type == "object" and
    (.cards | type == "array") and
    (.cards | length > 0 and length <= 5000) and
    all(.cards[];
      type == "object" and
      (.id | type == "string" and length > 0) and
      (.headline | type == "string" and length > 0) and
      (.date | type == "string" and length > 0)
    )
  ' "$1" >/dev/null
}

validate_newsletter "$TARGET"
validate_newsletter "$download"
jq --indent 2 . "$download" > "$normalized"

old_duplicate_count="$(jq '(.cards | length) - ([.cards[].id] | unique | length)' "$TARGET")"
new_duplicate_count="$(jq '(.cards | length) - ([.cards[].id] | unique | length)' "$normalized")"
if (( new_duplicate_count > old_duplicate_count )); then
  echo "Mirror rejected: duplicate card IDs increased from $old_duplicate_count to $new_duplicate_count." >&2
  exit 1
fi

old_count="$(jq '.cards | length' "$TARGET")"
new_count="$(jq '.cards | length' "$normalized")"
if cmp -s <(jq -S -c . "$TARGET") <(jq -S -c . "$normalized"); then
  echo "Newsletter content is already mirrored ($new_count cards)."
  exit 0
fi

cp "$normalized" "$TARGET"
validate_newsletter "$TARGET"
echo "Newsletter content updated for Git: $old_count -> $new_count cards."
