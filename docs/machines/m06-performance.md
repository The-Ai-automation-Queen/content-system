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

- **Meta Graph API** (preferred for IG/FB — richer data, free, needs a token)
- **Blotato analytics** (Twitter/X, Instagram, Facebook, Threads, Bluesky)
- **yt-dlp** for YouTube (free, no key, installed by `deploy/install.sh`)
- Manual paste for LinkedIn (no free automated route)
- **Apify** scrapers — optional paid fallback only

### What Blotato analytics cannot see
It reports only on posts published **through Blotato**. Engine Law 1 makes this
repo queue-only with manual release, so anything posted natively in the app is
invisible. An empty result usually means "not published via Blotato", not "no
engagement" — say which, do not conflate them. It also covers five platforms
only: LinkedIn, YouTube and TikTok never return metrics.

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
