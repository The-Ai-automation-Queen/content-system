# Performance Report — 2026-10-07

**Machine:** M06 Performance Tracker
**Run date:** 2026-10-07 (operator-requested via `/performance-tracker`)
**Run number:** 21st consecutive blocked entry since the 2026-09-15 restart.

---

## Status: ALL AUTOMATED SCRAPERS STILL BLOCKED; MANUAL PASTE SOLICITED LIVE

No live metrics were retrieved via automation this run. Every automated route
is closed in this session, unchanged since the 2026-09-15 restart.

| Data path | Status |
|---|---|
| Meta Graph API (Instagram/Facebook/Threads) | BLOCKED — no `META_ACCESS_TOKEN` / `IG_BUSINESS_ID` / `FB_PAGE_ID` |
| Apify MCP | BLOCKED — no Apify tools resolve in this session |
| Apify REST API fallback | BLOCKED — no `APIFY_TOKEN` in env (this is the designed skip, not a failure, but it removes the only paid fallback) |
| YouTube (`yt-dlp`) | BLOCKED — not installed on this host |
| Blotato MCP | BLOCKED — no Blotato tools resolve in this session |
| LinkedIn manual paste | SOLICITED this run — see operator briefing, reply to fill in |
| Twitter/X manual paste | SOLICITED this run — see operator briefing, reply to fill in |
| TikTok | NOT CONNECTED (pre-existing gap) |

Same wiring state as every run since 2026-09-15 — no scraper newly failed
this run; nothing has been fixed since either.

The day's own 23:00 UTC cron slot (`deploy/logs/performance-tracker-2026-10-07T23-00-02.log`)
was another bare 4-line `git fetch` + "Already up to date." — no scrape, no
briefing, no commit. Same shape as every cron slot since 2026-10-01's last
full run.

---

## What we know (last confirmed data)

| Platform | Last known followers | Date confirmed | Source |
|---|---|---|---|
| Instagram | 636 | 04/07/2026 | inventory.md |
| Facebook / YouTube / LinkedIn / Twitter / Threads | unknown | pre-rebrand | — |

Last reliable scraped data: **2026-06-27** — 102 days ago.

---

## Vault status (as of this run)

- Total entries: **78**
- READY TO POST: **37**
- DRAFT: **33**
- STALE: **6**
- KILLED: **2**
- POSTED: **0**

Confirmed against this session's own startup reality-check hook, and
independently by counting every `## ENTRY` header's trailing status.
Unchanged since at least 2026-09-25 — the backlog has not moved in either
direction across the entire window this report covers. Even with every
scraper wired today, there is nothing live to measure. The release step
(manual, by design per `security.md` §3.1 — queue-only, operator-released)
has not happened since the rebrand.

---

## What is working

Nothing measurable in the current window. The only data point on record is
the pre-rebrand finding from 2026-06-27 (102 days stale, directional only):
personal narrative / face-voice-story format ran ~4–8x the engagement rate of
generic AI-explainer/glossary content across 12 posts. This has never been
validated against the current brand and should not be treated as current
guidance.

## What is not working

- Every automated metrics route (Meta Graph API, Apify, yt-dlp, Blotato) is
  closed in this session — a wiring/credential gap, not a scraper failure.
- The cron's own daily slot is still landing bare (fetch-only, no scrape) —
  a standing fault in the cron invocation itself, separate from the
  credential gap, unresolved since it was first flagged around 2026-10-02.
- The pipeline's actual bottleneck is upstream of measurement: 37 entries
  are ready to post and zero have been released.
- This machine cannot produce a genuinely new number until either (a) a
  credential is wired, or (b) content gets released so there is something to
  scrape at all.

## Recommendation for content-engine

Hold production volume. The backlog is flat at 37 ready / 0 live; producing
more drafts widens the gap between written and live without giving this
machine anything new to measure.

## One recommendation for the operator

Release 3–5 of the 37 READY TO POST entries through Blotato — queue-only,
you release (per `security.md` §3.1). This unblocks both distribution and
measurement at once; nothing else this run can move either number.
