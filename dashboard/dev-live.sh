#!/usr/bin/env bash
# Start Mission Control with live Blotato scheduling armed.
#
#   npm run dev        preview only, nothing can be sent   (no key needed)
#   npm run dev:live   scheduling armed                    (reads the key file)
#
# The key lives OUTSIDE this repo, at ~/.blotato.env, so it cannot be committed
# by accident no matter what happens to .gitignore. Nothing here ever prints it.
set -uo pipefail

KEY_FILE="${BLOTATO_ENV_FILE:-$HOME/.blotato.env}"

if [ ! -f "$KEY_FILE" ]; then
  cat <<EOF

  No key file at $KEY_FILE

  Create it with these two lines, replacing xxx with your Blotato API key:

      printf 'BLOTATO_API_KEY=xxx\\n' > "$KEY_FILE"
      chmod 600 "$KEY_FILE"

  Then run 'npm run dev:live' again.
  ('npm run dev' works right now without any key — it just cannot send.)

EOF
  exit 1
fi

# Refuse to run if the file is readable by anyone else on the machine.
if [ "$(uname)" != "Darwin" ]; then
  PERMS="$(stat -c '%a' "$KEY_FILE" 2>/dev/null || echo '')"
else
  PERMS="$(stat -f '%A' "$KEY_FILE" 2>/dev/null || echo '')"
fi
case "$PERMS" in
  600|400) ;;
  '') echo "  Could not check permissions on $KEY_FILE — continuing." ;;
  *)  echo
      echo "  $KEY_FILE is mode $PERMS, which lets other accounts read your key."
      echo "  Fix it with:  chmod 600 \"$KEY_FILE\""
      echo
      exit 1 ;;
esac

set -a
# shellcheck disable=SC1090
. "$KEY_FILE"
set +a

if [ -z "${BLOTATO_API_KEY:-}" ]; then
  echo "  $KEY_FILE exists but has no BLOTATO_API_KEY= line."
  exit 1
fi

export BLOTATO_LIVE=1

echo
echo "  Mission Control — LIVE scheduling armed"
echo "  key: loaded from $KEY_FILE (${#BLOTATO_API_KEY} characters, not shown)"
echo "  Scheduling a post will really schedule it on Blotato."
echo

exec npx astro dev --host --port 4322
