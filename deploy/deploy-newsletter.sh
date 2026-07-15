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
SOURCE_ROOT="${NEWSLETTER_SOURCE_ROOT:-$REPO_ROOT/ai-insider-brief/ai-insider-brief}"
PUBLIC_TARGET="${NEWSLETTER_PUBLIC_TARGET:-/var/www/ai-insider-brief}"
RELEASES_DIR="${NEWSLETTER_RELEASES_DIR:-/var/www/ai-insider-brief-releases}"
STATE_DIR="${NEWSLETTER_STATE_DIR:-/var/lib/ai-insider-brief}"
LOCK_FILE="${NEWSLETTER_LOCK_FILE:-/run/lock/ai-insider-brief-deploy.lock}"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
REVISION="$(git -c safe.directory="$REPO_ROOT" -C "$REPO_ROOT" rev-parse --short=12 HEAD 2>/dev/null || printf 'manual')"
RELEASE="$RELEASES_DIR/$TIMESTAMP-$REVISION"
STATE_FILE="$STATE_DIR/briefs.json"

required_files=(index.html app.js styles.css)
optional_files=(
  apple-touch-icon.png
  favicon-32.png
  favicon.ico
  llms.txt
  og-image.png
  robots.txt
  sitemap.xml
)

for file in "${required_files[@]}"; do
  if [[ ! -s "$SOURCE_ROOT/$file" ]]; then
    echo "Missing required newsletter file: $SOURCE_ROOT/$file" >&2
    exit 1
  fi
done

if [[ "$MODE" == "deploy" && "$(id -u)" -ne 0 ]]; then
  echo "Newsletter deployment must run as root." >&2
  exit 1
fi

mkdir -p "$(dirname "$LOCK_FILE")"
exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "Another newsletter deployment is already running." >&2
  exit 1
fi

install -d -m 0755 "$RELEASES_DIR"
install -d -m 0750 "$STATE_DIR"
if [[ "$(id -u)" -eq 0 ]]; then
  chown root:www-data "$STATE_DIR"
fi

if [[ ! -s "$STATE_FILE" ]]; then
  if [[ -s "$PUBLIC_TARGET/data/briefs.json" ]]; then
    install -m 0664 "$PUBLIC_TARGET/data/briefs.json" "$STATE_FILE"
  elif [[ -s "$SOURCE_ROOT/data/briefs.json" ]]; then
    install -m 0664 "$SOURCE_ROOT/data/briefs.json" "$STATE_FILE"
  else
    echo "No newsletter briefs.json is available to seed persistent state." >&2
    exit 1
  fi
fi
if [[ "$(id -u)" -eq 0 ]]; then
  chown root:www-data "$STATE_FILE"
fi

install -d -m 0755 "$RELEASE" "$RELEASE/data"
for file in "${required_files[@]}"; do
  install -m 0644 "$SOURCE_ROOT/$file" "$RELEASE/$file"
done
for file in "${optional_files[@]}"; do
  if [[ -f "$SOURCE_ROOT/$file" ]]; then
    install -m 0644 "$SOURCE_ROOT/$file" "$RELEASE/$file"
  fi
done

if [[ -d "$SOURCE_ROOT/guides" ]]; then
  rsync -a --delete "$SOURCE_ROOT/guides/" "$RELEASE/guides/"
fi

if [[ -d "$SOURCE_ROOT/data" ]]; then
  rsync -a --exclude briefs.json "$SOURCE_ROOT/data/" "$RELEASE/data/"
fi
ln -s "$STATE_FILE" "$RELEASE/data/briefs.json"

jq empty "$STATE_FILE"
node --check "$RELEASE/app.js"
grep -qi '<title>' "$RELEASE/index.html"

if find "$RELEASE" -type f \( -name '.env' -o -name 'config.env' -o -name 'CONTEXT.md' \) -print -quit | grep -q .; then
  echo "A private or operational file was included in the public release." >&2
  exit 1
fi
if [[ -e "$RELEASE/pipeline" ]]; then
  echo "The private pipeline directory must never be included in the public release." >&2
  exit 1
fi

if [[ "$MODE" == "check" ]]; then
  echo "Newsletter release validated without activation: $RELEASE"
  exit 0
fi

previous=""
if [[ -L "$PUBLIC_TARGET" ]]; then
  previous="$(readlink -f "$PUBLIC_TARGET")"
elif [[ -d "$PUBLIC_TARGET" ]]; then
  previous="$RELEASES_DIR/legacy-$TIMESTAMP"
  mv "$PUBLIC_TARGET" "$previous"
  if [[ -f "$previous/data/briefs.json" && ! -L "$previous/data/briefs.json" ]]; then
    mv "$previous/data/briefs.json" "$previous/data/briefs.before-git-deploy.json"
    ln -s "$STATE_FILE" "$previous/data/briefs.json"
  fi
elif [[ -e "$PUBLIC_TARGET" ]]; then
  echo "$PUBLIC_TARGET exists but is neither a directory nor a symlink." >&2
  exit 1
fi

next_link="$PUBLIC_TARGET.next-$$"
ln -s "$RELEASE" "$next_link"
mv -Tf "$next_link" "$PUBLIC_TARGET"

rollback() {
  if [[ -n "$previous" && -d "$previous" ]]; then
    rollback_link="$PUBLIC_TARGET.rollback-$$"
    ln -s "$previous" "$rollback_link"
    mv -Tf "$rollback_link" "$PUBLIC_TARGET"
    echo "Newsletter deployment rolled back to $previous" >&2
  fi
}

if ! nginx -t; then
  rollback
  exit 1
fi

status="$(curl -ksS --resolve brief.shiftandlead.com:443:127.0.0.1 -o /dev/null -w '%{http_code}' --max-time 15 https://brief.shiftandlead.com/)"
if [[ "$status" != "200" ]]; then
  echo "Newsletter health check returned HTTP $status." >&2
  rollback
  exit 1
fi

printf '%s\n' "$REVISION" > "$STATE_DIR/deployed-commit"
printf '%s\n' "$RELEASE" > "$STATE_DIR/current-release"
echo "Newsletter deployed successfully: $RELEASE"
