# M06 — Performance Tracker

## Purpose
Scrape all connected platforms for follower counts and post-level engagement.
Feed the dashboard intelligence panels and annotate POSTED vault entries so
the system learns what works.

## When it runs
- **Daily at 03:00** (VPS cron, 1 hour after signal-harvester)
- `competitors` mode: weekly in the full loop
- `linkedin-update` mode: on demand (manual paste)

## Tools
Free-first. Every default source costs nothing; Apify is opt-in and skipped
unless `APIFY_TOKEN` is set.

- **Meta Graph API** for Instagram, Facebook, and Threads if the token is
  scoped for it (free, first-party, needs `META_ACCESS_TOKEN`)
- **yt-dlp** for YouTube (free, no key, installed by `deploy/install.sh`)
- Manual paste for LinkedIn and Twitter/X (no free automated route)
- **Apify** scrapers — optional paid fallback only

### Blotato is not a metrics source
Operator decision, 2026-07-30: performance does not go through Blotato, and its
analytics feature is not built correctly. `blotato_list_posts` and
`blotato_get_post_status` stay in use for the **queue cross-reference** — what
was scheduled — but never for engagement numbers.

### The real gate is `META_ACCESS_TOKEN`
One credential covers Instagram, Facebook and possibly Threads, independent of
how posts are published. Until it is set, those three fall through to manual
paste and the machine cannot measure them on its own. Report the token status
explicitly rather than logging a generic scrape failure.

## Inputs
- Platform API credentials (Meta access token, IG business ID, FB page ID)
- `content-vault.md` — POSTED entries to annotate
- `inspiration-library/creators.csv` — competitor handles for `competitors` mode

## Outputs
- `performance-log.md` — daily KPIs and engagement data
- Vault entries annotated with engagement metrics
- Dashboard intelligence panels updated
- `reports/competitor-watch-*.md` (in competitors mode)

## Validation criteria
0. A run with no `APIFY_TOKEN` is a **normal run**, not a failure. Judge it on
   whether the free sources were tried and reported honestly.
1. All connected platforms scraped successfully
2. Engagement data attached to the correct vault entries
3. Competitor data uses real handles from `creators.csv`
4. No data gaps >2 consecutive days
5. Dashboard panels reflect the latest scrape

## Decision framework for AI delegation
An AI validator should:
- Flag posts with unusually low engagement (<50% of average) for review
- Identify top-performing content patterns (which pillars, hooks, formats win)
- Recommend pillar/format adjustments based on 30-day trend data
- Alert if follower count drops >5% week-over-week
