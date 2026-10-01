# UNB-028 — third morning, same 5-branch paste

**This is a check-in, not a new ask. No new reading required.**

## What's unchanged (verified live this morning)

`git fetch origin --prune` + `git for-each-ref` shows the stale-branch pile
still growing, not shrinking: 75 branches last committed before 30/08/2026,
up from 74 on 29/09–30/09. The 5-branch delete command from yesterday's pack
(`2026-09-30-UNB-028-delete-5-branches.md`) was not run — all 5 are still
present and still confirmed merged into `main`:

```
claude/confident-maxwell-dvgrbz
claude/gifted-keller-h5pf2m
claude/course-strategy-content-audit-x4sogf
local-drafts-2026-06-30
claude/research-inbox-triage-workflow-laf7f9
```

## The three-mornings question

Per the skill's own rule, this doesn't get served a fourth time as the same
ask. Instead:

- ✅ **Done** — if you already ran it and I'm just not seeing it, say so and
  I'll re-check live.
- 🔁 **Swap** — park this, and today's slot goes to something else. Fair
  warning: the other three open items (UNB-025 queue-a-post, UNB-026
  repo-access, UNB-027 duplicate-folder) are all already past their own
  serve-3 confrontation with no reply either, so a swap today lands back on
  one of those, not a fresh task.
- ✂️ **Smaller** — if even a 5-line paste is more friction than it's worth,
  tell me what would make it smaller (even "just these 2" is fine).
- ❌ **Not doing this one** — keeping the branches around is also a real
  answer. It just means it stays, on record as a decision rather than an
  oversight.

## Verify

Next run, I re-check `git for-each-ref` myself either way. No reply needed
to close this out, only to change course on it.
