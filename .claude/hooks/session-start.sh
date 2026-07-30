#!/usr/bin/env bash
# SessionStart — orient the session in reality before it does anything.
#
# Every failure this estate hit in July had the same shape: a session trusted a
# document instead of checking the system.
#   - a board meeting decided on a stale local git ref that was never re-fetched
#   - two branches numbered ENTRY 024-039 at the same time, unaware of each other
#   - CLAUDE.md documented a "Mon 05:07 cloud trigger" that was never created
#   - a crontab comment pointed at a research-hermes-bridge.timer that never existed
#
# So this prints what is TRUE, not what is written down. Read-only and
# best-effort throughout: it must never block, prompt, or fail a session.
set -uo pipefail

REPO="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$REPO" 2>/dev/null || exit 0

MAIN=main
say() { printf '%s\n' "$*"; }

say "=== reality check ==="

# 1. Fetch first. This alone kills the stale-ref class of bug.
if git rev-parse --git-dir >/dev/null 2>&1; then
  # Fetch ALL branches, not just main — otherwise remote-tracking refs for
  # other sessions' branches go stale and check 4 below sees nothing.
  timeout 45 git fetch --quiet --prune origin >/dev/null 2>&1
  BRANCH="$(git branch --show-current 2>/dev/null)"
  AHEAD="$(git rev-list --count "origin/$MAIN..HEAD" 2>/dev/null || echo 0)"
  BEHIND="$(git rev-list --count "HEAD..origin/$MAIN" 2>/dev/null || echo 0)"
  say "branch ${BRANCH:-detached} — ${AHEAD:-0} ahead, ${BEHIND:-0} behind origin/$MAIN"
  [ "${BEHIND:-0}" -gt 0 ] 2>/dev/null && \
    say "  ! origin/$MAIN moved. Do not trust local state until you rebase or pull."
fi

# 2. The constraint. Counted on origin/main, because local may be stale.
VAULT="$(git show "origin/$MAIN:content-vault.md" 2>/dev/null || cat content-vault.md 2>/dev/null || true)"
if [ -n "$VAULT" ]; then
  say ""
  say "vault on origin/$MAIN:"
  printf '%s\n' "$VAULT" | grep -E '^## ENTRY ' \
    | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/,"",$NF); print $NF}' \
    | sed -E 's/ +[0-9]{2}\/[0-9]{2}\/[0-9]{4}.*$//' \
    | sort | uniq -c | sort -rn | sed 's/^/ /'
  POSTED="$(printf '%s\n' "$VAULT" | grep -cE '^## ENTRY .*\| *POSTED *$' || true)"
  READY="$(printf '%s\n' "$VAULT" | grep -cE '^## ENTRY .*\| *READY TO POST *$' || true)"
  if [ "${POSTED:-0}" -eq 0 ] && [ "${READY:-0}" -gt 0 ] 2>/dev/null; then
    say "  ! ${READY} ready, 0 posted. Release is the bottleneck, not production."
    say "    Producing more before releasing anything makes this number worse."
  fi
fi

# 3. Canon. CLAUDE.md forbids writing prices, tiers or public words without it.
QB=""
for p in /workspace/queen-brain "$REPO/../queen-brain" "$HOME/queen-brain"; do
  [ -f "$p/STATUS.md" ] && { QB="$p"; break; }
done
say ""
if [ -n "$QB" ]; then
  say "canon: queen-brain present — $(head -1 "$QB/STATUS.md" | sed 's/^# *//')"
else
  say "canon: queen-brain NOT in this session."
  say "  ! Do not write any price, tier, offer status or customer-facing copy."
  say "    Ask for the repo instead of reconstructing it from this one's copies."
fi

# 4. Who else is working. Would have surfaced PR #81 before it was duplicated.
SELF="${BRANCH:-__none__}"
OTHERS="$(git for-each-ref --format='%(refname:short) %(committerdate:relative)' \
  --sort=-committerdate refs/remotes/origin 2>/dev/null \
  | grep -vE "origin/($MAIN|HEAD)( |$)" \
  | grep -vE "^origin/${SELF}( |$)" | head -5 || true)"
if [ -n "$OTHERS" ]; then
  say ""
  say "other branches (parallel sessions may own these):"
  printf '%s\n' "$OTHERS" | sed 's|^origin/| |'
fi

# 5. Drift: documented schedule vs actual schedule. Meaningful on the VPS only.
if command -v crontab >/dev/null 2>&1 && [ -f deploy/crontab.example ]; then
  WANT="$(grep -c 'run-machine.sh' deploy/crontab.example 2>/dev/null || true)"
  LIVE="$(crontab -l 2>/dev/null | grep -c 'run-machine.sh' || true)"
  if [ "${WANT:-0}" -gt 0 ] 2>/dev/null; then
    say ""
    say "machines scheduled: ${LIVE:-0} live / ${WANT} in deploy/crontab.example"
    [ "${LIVE:-0}" -lt "${WANT}" ] 2>/dev/null && \
      say "  ! Documented machines are not actually running. Docs are not evidence."
  fi
fi

say "=== end ==="
exit 0
