#!/usr/bin/env bash
# install-hermes-hiring-cron.sh — one-time setup: registers the Monday
# hiring-campaign trigger as a Hermes cron job.
#
# Run this ON THE VPS, wherever the `hermes` CLI is (as the `main` profile —
# the dispatcher). Idempotent-ish: re-running after editing
# skills/hiring-campaign/hermes-cron-prompt.md updates the existing job
# instead of creating a duplicate.
#
# Prerequisites (see hermes-cron-prompt.md's "Notes for whoever installs
# this" section — read it, this script does not check these for you):
#   1. Hermes' Telegram gateway is already set up and working.
#   2. Hermes can actually run `claude` inside THIS repo checkout — verify
#      by hand first: bash deploy/run-machine.sh "/hiring-campaign run" 1 120
#   3. hermes-watchdog.sh is installed on plain cron (crontab.example),
#      NOT through Hermes — that's the outside check that still works if
#      this job's own scheduler dies.

set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$HERE/.." && pwd)"
PROMPT_FILE="$REPO/skills/hiring-campaign/hermes-cron-prompt.md"
JOB_NAME="hiring-campaign-monday"

command -v hermes >/dev/null 2>&1 || {
  echo "ERROR: 'hermes' not found on PATH."; exit 1; }

# Pull just the fenced prompt block out of the markdown file, so the file
# stays the single source of truth and nobody has to copy/paste by hand.
PROMPT="$(awk '/^```$/{c++; next} c==1' "$PROMPT_FILE")"
if [ -z "$PROMPT" ]; then
  echo "ERROR: couldn't extract the prompt block from $PROMPT_FILE"; exit 1
fi

EXISTING_ID="$(hermes -p main cron list 2>/dev/null | awk -v n="$JOB_NAME" '$0 ~ n {print $1; exit}')"

if [ -n "${EXISTING_ID:-}" ]; then
  echo "Updating existing job: $EXISTING_ID"
  hermes -p main cron edit "$EXISTING_ID" --prompt "$PROMPT"
else
  echo "Creating new job: $JOB_NAME"
  hermes -p main cron create "0 5 * * 1" "$PROMPT" \
    --deliver telegram \
    --name "$JOB_NAME" \
    --workdir "$REPO"
fi

echo
echo "Done. Verify with:  hermes -p main cron list"
echo "Test it right now (doesn't wait for Monday):  hermes -p main cron run $JOB_NAME"
echo "Remember: hermes-watchdog.sh must ALSO be installed on plain cron"
echo "(crontab.example) — that's the outside check, this script doesn't do it."
