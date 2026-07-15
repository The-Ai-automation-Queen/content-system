#!/usr/bin/env bash
set -Eeuo pipefail

if [[ "$(id -u)" -ne 0 ]]; then
  echo "The restricted VPS deployment wrapper must run as root." >&2
  exit 1
fi

REPO="/home/fatiha/content-system"
BRANCH="main"
LOCK_FILE="/run/lock/content-system-newsletter-git.lock"
REQUESTED_COMMAND="${1:-deploy-newsletter}"

if [[ "$REQUESTED_COMMAND" != "deploy-newsletter" ]]; then
  echo "Unsupported restricted deployment command." >&2
  exit 64
fi

exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "Another content-system newsletter deployment is already running." >&2
  exit 1
fi

if [[ ! -d "$REPO/.git" ]]; then
  echo "Content-system repository is missing at $REPO." >&2
  exit 1
fi

if [[ -n "$(sudo -H -u fatiha git -C "$REPO" status --porcelain)" ]]; then
  echo "The VPS content-system checkout has uncommitted changes; deployment stopped without overwriting them." >&2
  exit 1
fi

sudo -H -u fatiha git -C "$REPO" fetch origin "$BRANCH"
sudo -H -u fatiha git -C "$REPO" merge --ff-only "origin/$BRANCH"

exec "$REPO/deploy/deploy-newsletter.sh"
