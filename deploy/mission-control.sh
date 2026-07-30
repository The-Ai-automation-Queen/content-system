#!/usr/bin/env bash
# mission-control.sh — start Mission Control, checking everything first.
#
# One command, wherever you are:
#
#     bash deploy/mission-control.sh
#
# It checks Node, dependencies, the Blotato key and the firewall, tells you
# exactly what to fix if something is missing, prints the tunnel command you
# need when running on a server, and then starts the dashboard.
#
# Nothing here ever prints your API key.
set -uo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
KEY_FILE="${BLOTATO_ENV_FILE:-$HOME/.blotato.env}"
PORT=4322

bold() { printf '\033[1m%s\033[0m\n' "$*"; }
fail() { printf '\n  ✗ %s\n\n' "$*"; }
ok()   { printf '  ✓ %s\n' "$*"; }

echo
bold "Mission Control — preflight"
echo

# ── 1. Node ──────────────────────────────────────────────────────────────────
if ! command -v node >/dev/null 2>&1; then
  fail "Node.js is not installed."
  echo "  Fix it:  sudo apt-get install -y nodejs npm     (or: bash deploy/install.sh)"
  echo
  exit 1
fi
ok "node $(node -v)"

# ── 2. Repo is a real clone ──────────────────────────────────────────────────
if ! git -C "$REPO" rev-parse --git-dir >/dev/null 2>&1; then
  fail "$REPO is not a git clone, so it cannot be updated."
  echo "  Fix it:"
  echo "      mv $REPO ${REPO}-OLD"
  echo "      git clone https://github.com/The-Ai-automation-Queen/content-system.git $REPO"
  echo
  exit 1
fi
BRANCH="$(git -C "$REPO" branch --show-current 2>/dev/null)"
ok "git clone on branch ${BRANCH:-detached}"

# ── 3. Dependencies ──────────────────────────────────────────────────────────
if [ ! -d "$REPO/dashboard/node_modules" ]; then
  echo "  … installing dashboard dependencies (one time, ~1 min)"
  ( cd "$REPO/dashboard" && npm install --no-audit --no-fund ) >/dev/null 2>&1 \
    && ok "dependencies installed" \
    || { fail "npm install failed."; echo "  Run it yourself to see why:  cd $REPO/dashboard && npm install"; echo; exit 1; }
else
  ok "dependencies present"
fi

# ── 4. The Blotato key ───────────────────────────────────────────────────────
# ── 4. Blotato key — entirely optional, never in the way ─────────────────────
# The dashboard's whole job is reading posts and copying them. That needs no
# credentials, so a missing key is the normal case and is not mentioned. If the
# file happens to exist and is sound, live scheduling turns itself on quietly.
# Anything wrong with it is ignored rather than raised: a broken key file must
# never stop you reading your own content.
LIVE=0
if [ -f "$KEY_FILE" ]; then
  PERMS="$(stat -c '%a' "$KEY_FILE" 2>/dev/null || stat -f '%A' "$KEY_FILE" 2>/dev/null || echo '600')"
  case "$PERMS" in
    600|400)
      set -a; . "$KEY_FILE" 2>/dev/null; set +a
      if [ -n "${BLOTATO_API_KEY:-}" ]; then
        export BLOTATO_LIVE=1
        LIVE=1
        ok "Blotato key loaded (${#BLOTATO_API_KEY} characters, not shown)"
      fi
      ;;
    *) ok "Blotato key file skipped (mode $PERMS — needs chmod 600)" ;;
  esac
fi

# ── 5. Is this a server? Then say how to reach it. ───────────────────────────
ON_SERVER=0
if [ -z "${DISPLAY:-}" ] && [ -z "${WAYLAND_DISPLAY:-}" ] && [ "$(uname)" != "Darwin" ]; then
  ON_SERVER=1
fi

if [ "$ON_SERVER" -eq 1 ]; then
  IP="$(hostname -I 2>/dev/null | awk '{print $1}')"
  if command -v ufw >/dev/null 2>&1; then
    if ufw status 2>/dev/null | head -1 | grep -qi active; then
      ok "ufw active — port $PORT is not exposed to the internet"
    else
      echo
      bold "  ⚠ ufw is INACTIVE on this server."
      echo "  This script binds the dashboard to localhost only, so it is still not"
      echo "  reachable from outside. But nothing else here is firewalled either."
      echo "  Worth running:  sudo ufw enable    (read deploy/SECURITY.md first)"
      echo
      echo "  Note: 'npm run dev' does NOT bind localhost-only — astro.config.mjs"
      echo "  opens it to every interface. On a server, use this script, not npm."
    fi
  fi
fi

# ── 6. Start ─────────────────────────────────────────────────────────────────
echo
if [ "$LIVE" -eq 1 ]; then
  bold "  LIVE — scheduling a post will really schedule it on Blotato."
  echo
fi

if [ "$ON_SERVER" -eq 1 ]; then
  bold "  This is a server, so your browser cannot open it directly."
  echo
  echo "  On your OWN computer, open a second terminal and paste this:"
  echo
  printf '      ssh -L %s:localhost:%s %s@%s\n' "$PORT" "$PORT" "${USER:-root}" "${IP:-YOUR-VPS-IP}"
  echo
  echo "  Leave it running, then open this in your browser:"
else
  echo "  Open this in your browser:"
fi
echo
printf '      http://localhost:%s\n' "$PORT"
echo
echo "  Then click Second Brain. Keep THIS terminal open — closing it stops the"
echo "  server. Press Ctrl+C when you are done."
echo

# Bind to localhost only, explicitly. `--host localhost` is required rather than
# merely omitted: astro.config.mjs sets `server.host: true` for the web harness,
# and the config beats the CLI default, so without this the armed Schedule
# button would be reachable from the open internet. The SSH tunnel above gives
# you the same access safely.
cd "$REPO/dashboard" || exit 1
exec npx astro dev --host localhost --port "$PORT"
