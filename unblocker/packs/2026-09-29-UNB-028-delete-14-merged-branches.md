# UNB-028 — Delete the 14 stale branches that are already merged (phase 1 of 2)

**Today's unblock, ~3 minutes.** Execute-only: one command, already verified safe.

## Why this, why today

`git for-each-ref` shows 74 non-main branches last committed before
2026-08-30 (30-day cutoff), up from 64 on 2026-09-20 — the pile is growing
faster than anyone is clearing it (`unblocker/ledger.md` UNB-028,
`reports/janitor-2026-09-20.md` JAN-04). Branch deletion is a guardrail-
reserved human decision, and the full 74 doesn't fit inside a 15-minute
window with zero open decisions — so this pack splits it.

This phase is the safe slice: of the 74 stale branches, exactly **14** are
already fully merged into `origin/main` (verified below). Deleting them
loses nothing — every commit on them already lives on `main`. No judgment
calls, no PR cross-checking needed for this batch.

The other 60 stale-but-unmerged branches are **not** in this pack — they
need an actual glance (old session/experiment branches that may or may not
still matter) and are left for a future, separate serve per the skill's
"split before serving" rule.

## Verification already done

```
git fetch origin --prune
comm -12 <(stale branches, committed before 2026-08-30) <(git branch -r --merged origin/main)
```

Result: 14 branches, all fully merged into `main`.

## The 14 branches (paste-ready)

- `agent/open-briefing-no-email`
- `agent/restore-homepage-with-guides`
- `claude/confident-maxwell-dvgrbz`
- `claude/course-strategy-content-audit-x4sogf`
- `claude/gifted-keller-h5pf2m`
- `claude/research-inbox-triage-workflow-laf7f9`
- `claude/shift-lead-consolidation-wdp5bm`
- `codex/add-guide-home-link`
- `codex/clean-vercel-source`
- `codex/complete-shift-lead-journey`
- `codex/finish-homepage`
- `html-freeze-final`
- `local-drafts-2026-06-30`
- `site-repair-and-architecture-2026-08-10`

## The one command to run

From inside `content-system`:

```bash
git push origin --delete \
  agent/open-briefing-no-email \
  agent/restore-homepage-with-guides \
  claude/confident-maxwell-dvgrbz \
  claude/course-strategy-content-audit-x4sogf \
  claude/gifted-keller-h5pf2m \
  claude/research-inbox-triage-workflow-laf7f9 \
  claude/shift-lead-consolidation-wdp5bm \
  codex/add-guide-home-link \
  codex/clean-vercel-source \
  codex/complete-shift-lead-journey \
  codex/finish-homepage \
  html-freeze-final \
  local-drafts-2026-06-30 \
  site-repair-and-architecture-2026-08-10
```

That's it — one paste, 14 branches gone, `main` untouched (nothing here was
ahead of `main`).

## Verify it worked

```bash
git fetch origin --prune
git for-each-ref --format='%(refname:short)' refs/remotes/origin | grep -c -v 'origin/main\|origin/HEAD'
```

Should read 122 (136 today, minus 14).

## What's next (not today)

Phase 2 — the 60 stale-but-unmerged branches — needs a real skim (old
session/experiment work that never landed) before any deletion. That's a
future, separate unblock; not asking for it today.
