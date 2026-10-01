# Performance Report — 2026-10-01

**Machine:** M06 Performance Tracker
**Run date:** 2026-10-01 (interactive, operator-requested)
**Run number:** fourteenth append since the 2026-07-24 → 2026-09-15 gap.

---

## Status: ALL AUTOMATED SCRAPERS BLOCKED; MANUAL PASTE SOLICITED LIVE

No live metrics were retrieved via automation this run. Every automated route
is closed in this session, unchanged since the 2026-09-15 restart.

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

Same wiring state as every run since 2026-09-15 — no scraper newly failed
this run; nothing has been fixed since either.

**New this run:** the 2026-10-01 03:00 UTC cron log
(`deploy/logs/performance-tracker-2026-10-01T03-00-02.log`) is only 4 lines —
`git fetch` plus "Current branch main is up to date." — with no scrape
output, briefing, or commit behind it. A 2026-09-29 re-read of the prior
"git fetch only" logs (09-20 through 09-25) found those had actually run in
full; today's log genuinely has nothing after the fetch. One missed slot so
far — worth checking tomorrow's log before treating it as a new pattern.

---

## What we know (last confirmed data)

| Platform | Last known followers | Date confirmed | Source |
|---|---|---|---|
| Instagram | 636 | 04/07/2026 | inventory.md |
| Facebook / YouTube / LinkedIn / Twitter / Threads | unknown | pre-rebrand | — |

Last reliable scraped data: **2026-06-27** — 96 days ago.

---

## Vault status (as of this run)

- Total entries: **78**
- READY TO POST: **37**
- DRAFT: **33**
- STALE: **6**
- KILLED: **2**
- POSTED: **0**

Confirmed against this session's own startup reality-check hook and
independently by a direct tally of every `## ENTRY` header's status suffix in
`content-vault.md`. Unchanged since at least 2026-09-25 — the backlog has not
moved in either direction across the entire window this report covers. Even
with every scraper wired today, there is nothing live to measure. The release
step (manual, by design per `security.md` §3.1 — queue-only,
operator-released) has not happened since the rebrand.

---

## What is working

Nothing measurable in the current window. The only data point on record is
the pre-rebrand finding from 2026-06-27 (96 days stale, directional only):
personal narrative / face-voice-story format ran ~4–8x the engagement rate of
generic AI-explainer/glossary content across 12 posts. This has never been
validated against the current brand and should not be treated as current
guidance.

## What is not working

- Every automated metrics route (Meta Graph API, Apify, yt-dlp, Blotato) is
  closed in this session — a wiring/credential gap, not a scraper failure.
- Today's 03:00 UTC cron slot produced no output at all — distinct from the
  earlier false-alarm pattern, genuinely silent this time.
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
