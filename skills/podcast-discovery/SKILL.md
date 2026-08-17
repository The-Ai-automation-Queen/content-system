---
name: podcast-discovery
description: First step of the podcast-guesting pipeline. Takes a seed (a topic keyword, or a peer name to reverse-look-up) and returns candidate shows with real RSS feed URLs from Apple's public podcast directory. No scoring. Use when starting a podcast-guesting run or when you need to resolve show names to feeds.
---

# Podcast Discovery

Atomic. Seed in, candidate shows out. No judgment, no tiering. Just a pile of
real shows with real feeds for the rest of the pipeline to chew on.

## Source

Apple's public podcast directory (iTunes Search API). Free, no key, no auth,
stable JSON. Chosen over HTML scraping for v1 reliability. Scrapling stays the
documented fallback for blocked sites but discovery does not need it.

## Two modes (the source post's "two jobs", scoped to discovery)

### topic
Direct directory search by keyword.
```
py scripts\discover.py --mode topic --value "women entrepreneurs business" --limit 15
```

### peer-reverse
Find shows a named peer has guested on. This needs a judgment step the script
cannot do alone:

1. Use web search (WebSearch / tavily) for: `"<peer name>" podcast guest interview`
   and list the shows that peer appeared on.
2. Pass those show NAMES to the resolver to get real feeds:
```
py scripts\discover.py --mode resolve --value '["Show A","Show B","Show C"]' --limit 15
```

Mechanics live in the script. The "which shows did this peer guest on" judgment
lives here in the skill, using web tools.

## Output

JSON list: `show_name, rss_url, artist, genres, track_count, itunes_url`.
Deduped by feed. Hand straight to `podcast-rss-scraper`.

## Run order in the pipeline

discovery -> rss-scraper -> fit-researcher -> pitch-builder -> pipeline-writer.
This skill never decides if a show is good. That is fit-researcher's job.
