# Performance Log — Fatiha Chikh

> Real engagement data scraped from social platforms. One entry per run,
> newest at the top. Date format: `YYYY-MM-DD`. Data sources: Meta Graph API,
> Apify MCP, Blotato MCP. Do not edit manually — this file is machine-written.

---

## PERFORMANCE 2026-06-27

**Run date:** 2026-06-27 03:04 UTC
**Sources scraped:** Instagram (Apify), Facebook (Apify — failed), YouTube (Apify — no stats), LinkedIn (Apify — needs auth/manual), Twitter/X (Apify — free-tier blocked), Threads (Apify — profile not found)
**Data path:** Instagram → Apify fallback (no `META_ACCESS_TOKEN` in env). Facebook → Apify fallback (Graph API path skipped, no token). All other platforms → Apify only. No first-party Meta Graph API path available this run.

> **First snapshot — no deltas.** This is the baseline. All week-over-week
> fields read `(first snapshot — no delta)` and will populate on the next run.

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | 632 | (first snapshot — no delta) | 311 posts | Follows 1,152; not verified |
| Facebook | AI Automation Queen | (scrape failed) | — | — | Page not available at `/AIAutomationQueen` — verify slug; no token for Graph API |
| YouTube | @AI-Automation-Queen | (no data returned) | — | (no data) | Channel exists (UCvCv6l1Gdx_zQ5hIG91Gtxg) but returned null subs/videos/views — no public videos yet |
| LinkedIn | Fatiha Chikh | (no data) | — | — | Auto-scraper needs login cookies (unavailable) — use `linkedin-update` for manual stats |
| Twitter/X | @aiautomatik | (no data) | — | — | Apify free-tier returned no results; needs paid plan for X data |
| Threads | @thefatihachikh | (no data) | — | — | Scraper reports profile not found |
| TikTok | — | NOT CONNECTED | — | — | See inventory.md gap — connect to Blotato first |

### Top posts by engagement (Instagram — last 12 posts)

> Engagement rate computed as `(likes + comments) / followers × 100` (632
> followers) since IG view counts are inconsistent across post types.

| # | Platform | Caption (excerpt) | Likes | Comments | Views | Eng. rate | Vault match |
|---|---|---|---|---|---|---|---|
| 1 | IG Reel | "Meet mine. Fat.IA — getting a clone is next-level automation…" | 41 | 9 | 274 (893 plays) | 7.9% | (no vault match) |
| 2 | IG (carousel) | "For the last 18 months, I attended dozens of AI events… then I started building" | 42 | 7 | — | 7.8% | (no vault match) |
| 3 | IG (carousel) | "This is how we use AI in the fashion industry… Lelabplus is my playground" | 26 | 7 | — | 5.2% | (no vault match) |
| 4 | IG Reel | "The AI Queen is out. Ready more than 99% of people on earth" | 18 | 6 | 64 | 3.8% | (no vault match) |
| 5 | IG (image) | "The gap opening up between women… Comment BUILD" (lead-magnet CTA) | 13 | 0 | — | 2.1% | (no vault match) |
| 6 | IG (carousel) | "6 AI words your friends use but never explain" (glossary Pack 1) | 9 | 3 | — | 1.9% | (no vault match) |
| 7 | IG (carousel) | "6 more AI words… Pack 2 of 6" | 6 | 2 | — | 1.3% | (no vault match) |
| 8 | IG Video | "Most businesses rush to AI tools before asking 4 questions" | 5 | 0 | 39 (211 plays) | 0.8% | (no vault match) |
| 9 | IG (carousel) | "6 AI privacy worries… Pack 3 of 6" | 5 | 1 | — | 0.9% | (no vault match) |
| 10 | IG (carousel) | "6 things AI does beyond chat… Pack 4 of 6" | 5 | 0 | — | 0.8% | (no vault match) |
| 11 | IG (carousel) | "6 phrases that unlock better AI answers… Pack 6 of 6" | 6 | 0 | — | 0.9% | (no vault match) |
| 12 | IG (carousel) | "6 small disasters AI quietly fixes… Pack 5 of 6" | 3 | 0 | — | 0.5% | (no vault match) |

> **No vault matches:** every live IG post above predates the 22/06/2026 brand
> rebuild and runs the old "women in business / Shift & Lead / glossary pack"
> voice. The current vault (ENTRY 001–016) is all `DRAFT`/`READY TO POST` — none
> are `POSTED` yet, so there are no entries to annotate with `**Performance:**`
> this run. The cross-reference link will activate once rebuilt content goes live.

### Blotato queue status

- **Published:** 14 posts (since 2026-05-01) — 11 Instagram, 2 LinkedIn, 1 Twitter/X. All live (URLs captured).
- **Scheduled (pending release):** 0 posts — nothing waiting in the queue.
- **Failed:** 5 posts —
  - `523013` IG "6 phrases… Pack 6" — `504 Gateway Timeout` on media fetch (2026-06-07); **stale** — the post later succeeded and is live (`DZcCjveFYI7`).
  - `519062` / `519059` IG "BLOTATO TEST [reel]" — media-URL fetch failures (403 / connect timeout) — **test posts, safe to ignore/delete.**
  - `519061` / `519055` LinkedIn+IG "BLOTATO TEST [text+img]" — Wikimedia thumbnail-size 400 errors — **test posts, safe to ignore/delete.**

### Week-over-week summary

- Instagram followers: 632 (first snapshot — no delta)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no baseline captured (scrape failed or platform not retrievable — see Profile snapshot notes)
- Top-performing piece: IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate
- Weakest signal: the "6 AI words / glossary pack" educational carousels — 3–9 likes each (0.5–1.9%), well below the personal/story posts

### Lessons — repeatable patterns

> Read by `copy-craft` and `content-engine` before every drafting pass. This is
> pre-rebrand data (all 12 scraped posts predate 22/06/2026), so treat it as
> **directional evidence about format/hook mechanism, not a verdict on the new
> voice/positioning** — no rebuilt-brand content has been scraped yet.

**Winners this run:**
1. Personal reveal / face-and-story (IG Reel/carousel) — "Meet mine. Fat.IA…"
   (7.9%), "18 months attending AI events… then I started building" (7.8%),
   "This is how we use AI in the fashion industry… Lelabplus" (5.2%)

**Losers this run:**
1. Generic educational listicle (IG carousel, "6 AI [topic] Pack N of 6"
   glossary series) — 0.5–1.9% across 6 posts (Packs 1–6)

**The comparison:** personal narrative + her face/voice/actual story ran
**~4–8x** the engagement rate of the generic AI-explainer glossary-pack format
across these 12 posts (7.9%/7.8%/5.2% vs. 0.5–1.9%). The format gap is large
and consistent enough across 6 losing posts to trust, even pre-rebrand.

**Carried forward:** first run with enough data to compare — no prior finding
to confirm or contradict. **Action for `copy-craft`/`content-engine`:** until
rebuilt-brand posts are scraped, treat "personal reveal/story" as the
provisional winning shape and "generic listicle/explainer" as the provisional
losing shape — re-validate against real post-rebrand data as soon as it exists,
since this evidence predates the current positioning.

---
