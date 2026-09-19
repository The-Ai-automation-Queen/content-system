# Performance Report — 2026-09-19

**Machine:** M06 Performance Tracker
**Run date:** 2026-09-19 (interactive operator session)
**Run number:** fifth append since the 53-day gap (2026-07-24 → 2026-09-15 → 2026-09-16 → 2026-09-17 → 2026-09-18 → 2026-09-19) — no change in automated wiring since yesterday.

---

## Status: ALL AUTOMATED SCRAPERS BLOCKED; MANUAL PASTE SOLICITED LIVE

No live metrics were retrieved via automation this run. Every automated route
is closed in this session. LinkedIn and Twitter/X manual-paste numbers were
actively solicited in the chat this run per the skill's "manual paste is a
first-class path" rule, rather than logged as skipped.

| Data path | Status |
|---|---|
| Meta Graph API (Instagram/Facebook/Threads) | BLOCKED — no `META_ACCESS_TOKEN` / `IG_BUSINESS_ID` / `FB_PAGE_ID` |
| Apify MCP | BLOCKED — no Apify tools resolve in this session |
| Apify REST API fallback | BLOCKED — no `APIFY_TOKEN` in env |
| YouTube (`yt-dlp`) | BLOCKED — not installed on this host |
| Blotato MCP | BLOCKED — no Blotato tools resolve in this session |
| LinkedIn manual paste | SOLICITED this run — see operator briefing, reply to fill in |
| Twitter/X manual paste | SOLICITED this run — see operator briefing, reply to fill in |
| TikTok | NOT CONNECTED (pre-existing gap) |

---

## What we know (last confirmed data)

| Platform | Last known followers | Date confirmed | Source |
|---|---|---|---|
| Instagram | 636 | 04/07/2026 | inventory.md |
| Facebook / YouTube / LinkedIn / Twitter / Threads | unknown | pre-rebrand | — |

Last reliable scraped data: **2026-06-27** — 84 days ago.

---

## Vault status (as of this run)

- Total entries: **78**
- READY TO POST: **37**
- DRAFT: **33**
- STALE: **6**
- KILLED: **2**
- POSTED: **0**

Confirmed independently against `content-vault.md` (direct scan found zero
`POSTED` status entries) and matches this session's own startup reality check.
Unchanged from yesterday — the backlog did not move in either direction.
Even with every scraper wired today, there is nothing live to measure. The
release step (manual, by design per `security.md` §3.1 — queue-only,
operator-released) has not happened since the rebrand.

---

## Confirmed finding: the cron still isn't doing the scrape

`deploy/logs/performance-tracker-2026-09-19T03-00-03.log` again shows only a
`git fetch` / "Current branch main is up to date." — no scrape output, same as
the prior four days. This is now confirmed across five consecutive days: the
cron fires but does not invoke this skill's actual logic. Documented
automation ("15 live" per deploy docs) is not the same as running automation.

---

## What is working

Nothing measurable in the current window. The only data point on record is
the pre-rebrand finding from 2026-06-27 (84 days stale, directional only):
personal narrative / face-voice-story format ran ~4–8x the engagement rate of
generic AI-explainer/glossary content across 12 posts. This has never been
validated against the current brand and should not be treated as current
guidance.

---

## What is not working

1. **The measurement layer** — no new automated data in 84 days.
2. **The release step upstream of it** — 37 entries ready, 0 posted, unchanged
   from yesterday. The bottleneck isn't worsening today, but it isn't closing
   either.
3. **The scheduling layer** — cron fires but does not appear to invoke the
   actual skill logic, confirmed five days running.

---

## One recommendation for content-engine

Hold volume, unchanged from prior runs. The backlog held flat at 37
READY TO POST / 0 POSTED — that's not a production gap, it's a queue waiting
on the operator. More drafts would widen the gap between what's written and
what's live without adding any signal for this machine to measure.

---

## Required operator actions (priority order)

**Action 1 — Release content (highest leverage, lowest friction).**
Publishing stays queue-only per `security.md` — this report does not
recommend or take any instant-publish action. Open Blotato, review 3–5 of the
37 READY TO POST vault entries, and release them from the queue yourself.
This alone unblocks measurement on the next run.

**Action 2 — Wire a metrics route.**
Either set `APIFY_TOKEN` (paid fallback, ~$0.01–0.05/run, covers IG/YT/X/Threads)
or set `META_ACCESS_TOKEN` + `IG_BUSINESS_ID` + `FB_PAGE_ID` (free, first-party
for IG/FB/Threads) as session env vars. Never commit these to the repo — see
`security.md` §1.

**Action 3 — Check the cron, now five days confirmed.** Today's and all four
prior days' logs for this machine contain only a `git fetch`. Confirm whether
`deploy/crontab.example` entries are actually installed and firing the skill
invocation, not just a sync step.

**Action 4 — Reply with LinkedIn and/or Twitter/X numbers this session.**
Asked live in the operator briefing below — no token needed, works today.
Expected format for LinkedIn:

```
Followers: NNN
Post impressions (7d): NNN
Profile views (7d): NNN
Top post URL: https://...
Top post impressions: NNN
Top post reactions: NNN
Top post comments: NNN
```

For Twitter/X: current follower count, and for up to 3 recent tweets — URL,
likes, replies, and views/impressions if visible.

---

*This report was generated by M06 performance-tracker. No external actions
were taken this run — read-only audit only. No content was published or
scheduled.*
