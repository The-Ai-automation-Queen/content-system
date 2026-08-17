---
name: podcast-rss-scraper
description: One job - take a podcast RSS feed URL and return structured show facts (name, last episode date, cadence, days since last, whether it takes guests, active flag). Commodity step in the podcast-guesting pipeline. No judgment. Use when you have a feed URL and need clean episode facts.
---

# Podcast RSS Scraper

Atomic, deterministic. Feed URL in, facts out. No business logic, no scoring.

## Contract

**In:** `--url <rss_url>` or stdin `{"urls": ["...", ...]}`
**Out:** JSON. One object per feed:

```
show_name, rss_url, episode_count_seen, last_episode_date,
days_since_last, cadence_label, takes_guests, active, recent_titles[]
```

- `cadence_label`: multiple per week / weekly / biweekly / monthly / irregular / unknown
- `takes_guests`: heuristic from episode titles and descriptions. The
  fit-researcher confirms it. Treat as a signal, not a verdict.
- `active`: true when last episode is within 90 days (matches
  `show-qualification-criteria.md`).

On a broken feed it returns `{"rss_url", "error", "active": false}` so the
pipeline drops it cleanly instead of crashing.

## How to run

```
py "C:\Users\fatih\.claude\skills\podcast-rss-scraper\scripts\rss_scrape.py" --url "https://feeds.example.com/show.xml"
```

Batch: pipe `{"urls": [...]}` on stdin.

## Notes

Stdlib only (urllib + xml.etree). No feedparser dependency. Handles RSS 2.0 and
basic Atom. Sends a normal browser User-Agent so feeds that block default
clients still resolve.

Verified 17/05/2026 against a live NPR feed: correct show name, last episode,
cadence, guest detection.
