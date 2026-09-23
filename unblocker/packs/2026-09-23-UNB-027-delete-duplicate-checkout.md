# UNB-027 — clear the stale duplicate checkout

**Execute-only. One command, nothing to compose or decide beyond picking the option below.**

## What this is

`/home/fatiha/content-system-DUPLICATE` is a second full git checkout of
this repo, frozen at commit `a2e2bc1f` (30/07/2026) — 381 commits / 55 days
behind `main`. It sits in `$HOME` next to the real repo and risks someone
editing or running against stale skills/config without noticing.

## Checked this morning: nothing unique to save

It has exactly 2 uncommitted local edits, neither worth keeping:

1. **`.gitignore`** — adds a "VPS SECURITY MANAGED" secret-ignore block
   (`.env`, `id_rsa`, `*.pem`, etc.). The live repo's `.gitignore` already
   has this exact block (lines 10–51) and more — fully superseded.
2. **`deploy/crontab.example`** — swaps the `__REPO__` placeholder for a
   hardcoded `/root/content-system` path. That's a local one-off edit, not
   a convention to merge back; the live file correctly keeps `__REPO__` as
   a placeholder for whoever installs the crontab.

Nothing in the duplicate checkout postdates or improves on `main`. Safe to
remove outright.

## Do this (pick one, ~2 minutes)

**Recommended — delete it:**

```bash
rm -rf /home/fatiha/content-system-DUPLICATE
```

**Or, if you'd rather keep a labeled snapshot instead of deleting:**

```bash
mv /home/fatiha/content-system-DUPLICATE /home/fatiha/archive-content-system-DUPLICATE-2026-07-30
```

**Or reply and tell me a reason to keep it as-is** — that's a valid answer
too, it just needs to be a decision rather than it sitting there
unexamined.

## Verify

Next run checks `ls -ld ~/content-system-DUPLICATE` — gone or renamed
closes this out; a reply naming a keep-reason also closes it.
