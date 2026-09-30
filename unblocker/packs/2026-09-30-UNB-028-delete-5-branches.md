# UNB-028 — Delete just the 5 oldest merged branches (serve 2, shrunk)

**Today's unblock, under 1 minute.** Execute-only: one command, already
verified safe. Smaller than yesterday's ask on purpose.

## Why this, why today

Yesterday's pack (`2026-09-29-UNB-028-delete-14-merged-branches.md`) served
the full 14-branch safe slice. `git for-each-ref` this morning shows all 74
stale branches unchanged — the 14-branch command wasn't run yet. Per the
skill's serve-2 rule, the ask shrinks rather than repeating: just the **5
oldest** of those 14, all committed in June/early July 2026, all still
verified merged into `main` this morning. The other 9 wait for a future
serve; the pile isn't going anywhere overnight, and a genuinely tiny first
click beats a repeated 14-branch ask.

## Verification already done (live, this morning)

```
git fetch origin --prune
git branch -r --merged origin/main
```

All 5 confirmed present in the merged list — every commit already lives on
`main`, nothing is lost by deleting them.

| Branch | Last commit |
|---|---|
| `claude/confident-maxwell-dvgrbz` | 2026-06-24 |
| `claude/gifted-keller-h5pf2m` | 2026-06-25 |
| `claude/course-strategy-content-audit-x4sogf` | 2026-07-05 |
| `local-drafts-2026-06-30` | 2026-07-05 |
| `claude/research-inbox-triage-workflow-laf7f9` | 2026-07-09 |

## The one command to run

From inside `content-system`:

```bash
git push origin --delete \
  claude/confident-maxwell-dvgrbz \
  claude/gifted-keller-h5pf2m \
  claude/course-strategy-content-audit-x4sogf \
  local-drafts-2026-06-30 \
  claude/research-inbox-triage-workflow-laf7f9
```

That's it. Nothing to write, nothing to decide — paste and go.

The remaining 9 of yesterday's 14 (and the 60 stale-but-unmerged branches)
stay parked for a future serve.
