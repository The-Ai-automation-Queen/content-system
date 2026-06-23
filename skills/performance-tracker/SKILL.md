---
name: performance-tracker
version: 1.0.0
description: |
  Machine M06 — scrapes social media metrics via Apify + Blotato, writes
  performance data to performance-log.md, and updates POSTED vault entries
  with real engagement numbers. Runs daily on the cron. No API keys needed
  (Apify + Blotato are MCP-connected). Tracks: Instagram, YouTube, TikTok,
  LinkedIn (profile-level). Competitors optional via handles.
argument-hint: "[nothing needed — runs against inventory.md handles; or 'competitors' to also scrape tracked creators]"
allowed-tools:
  - Read
  - Edit
  - Write
  - Bash
  - Grep
  - mcp__APIFY_-_Trends_listener__call-actor
  - mcp__APIFY_-_Trends_listener__get-dataset-items
  - mcp__APIFY_-_Trends_listener__fetch-actor-details
  - mcp__Blotato__blotato_list_posts
  - mcp__Blotato__blotato_get_post_status
---

# Performance Tracker — Machine M06

You are the **measurement layer** for the content pipeline. You scrape real
engagement data from social platforms via Apify and cross-reference it with the
Blotato publishing queue, then write the numbers into `performance-log.md` so
the system (and the operator) can see what is actually working. Read `CLAUDE.md`
and `positioning/SKILL.md` first.

Every other skill produces — this one **measures**. Without it the loop is
flying blind: content-engine drafts, distribution queues, but nobody knows
whether a piece got 40 views or 40,000. This skill closes that feedback loop.

---

## When to run

- **Daily** (ideal): lightweight profile + recent-post scrape. Takes ~2 minutes
  of actor runtime.
- **Weekly** (minimum): the weekly-ops orchestrator should call this after
  distribution and before the next content-engine run, so the engine can see
  what performed.
- **On demand:** operator says "check my numbers" or "how did that post do."

---

## Handles to track (canonical source: `inventory.md`)

| Platform | Handle / ID | Apify actor |
|---|---|---|
| Instagram | `thefatihachikh` | `apify/instagram-profile-scraper` (profile) + `apify/instagram-post-scraper` (posts) |
| YouTube | `AI-Automation-Queen` | `streamers/youtube-channel-scraper` (channel) + `bernardo/youtube-scraper` (recent videos) |
| Twitter / X | `aiautomatik` | `apidojo/twitter-user-scraper` (profile + tweets) |
| Threads | `thefatihachikh` | `apify/threads-scraper` (profile + posts) |
| TikTok | *(not yet connected)* | `clockworks/tiktok-scraper` — flag as unavailable until wired |

Always re-read `inventory.md` at run time for the live handle list. If a handle
changes there, follow it — do not hardcode.

---

## Step-by-step execution

### 0. Pre-flight

1. Read `CLAUDE.md` (system orientation).
2. Read `inventory.md` — extract the handles from the Channels table (§3).
3. Read `performance-log.md` — find the most recent `## PERFORMANCE` entry to
   know the prior snapshot (needed for deltas). If the file does not exist,
   create it with the header shown in §Output below.
4. Read `content-vault.md` — collect every entry with status `POSTED` (or
   `SCHEDULED` that may have gone live). You will match scraped post data back
   to vault entries in step 3.

### 1. Scrape profile-level stats (followers / totals)

For each platform, call the corresponding Apify actor. Use
`fetch-actor-details` the first time to confirm the input schema, then
`call-actor` with `waitSecs: 45`.

#### Instagram — profile

```
Actor: apify/instagram-profile-scraper
Input: { "usernames": ["thefatihachikh"] }
```

From the result, extract:
- `followersCount`, `followsCount`, `postsCount`, `biography`

#### Instagram — recent posts

```
Actor: apify/instagram-post-scraper
Input: {
  "username": "thefatihachikh",
  "resultsLimit": 12
}
```

**If `apify/instagram-post-scraper` does not exist or errors**, fall back:

```
Actor: apify/instagram-scraper
Input: {
  "directUrls": ["https://www.instagram.com/thefatihachikh/"],
  "resultsType": "posts",
  "resultsLimit": 12
}
```

From each post extract:
- `shortCode`, `url`, `timestamp`, `caption` (first 80 chars),
  `likesCount`, `commentsCount`, `videoViewCount`, `videoPlayCount`

#### YouTube — channel

```
Actor: streamers/youtube-channel-scraper
Input: { "channelUrls": ["https://www.youtube.com/@AI-Automation-Queen"] }
```

Extract: `subscriberCount`, `videoCount`, `viewCount` (lifetime).

If that actor is unavailable, try:
```
Actor: bernardo/youtube-scraper
Input: { "searchKeywords": "AI-Automation-Queen", "maxResults": 1 }
```

#### YouTube — recent videos

```
Actor: bernardo/youtube-scraper
Input: {
  "channelUrls": ["https://www.youtube.com/@AI-Automation-Queen"],
  "maxResults": 10,
  "sortBy": "date"
}
```

Extract per video: `title`, `url`, `viewCount`, `likes`, `date`.

#### Twitter / X — profile + recent tweets

```
Actor: apidojo/twitter-user-scraper
Input: { "handles": ["aiautomatik"], "tweetsDesired": 10 }
```

If that actor is unavailable, try:
```
Actor: apify/twitter-scraper
Input: {
  "twitterHandles": ["aiautomatik"],
  "maxTweets": 10
}
```

Extract profile: `followersCount`, `followingCount`.
Extract per tweet: `text` (first 80 chars), `url`, `retweetCount`,
`likeCount`, `replyCount`, `viewCount`.

#### Threads — profile + recent posts

```
Actor: apify/threads-scraper
Input: { "usernames": ["thefatihachikh"], "resultsLimit": 10 }
```

Extract: `followersCount` (profile-level), and per post: `text` (first 80
chars), `likesCount`, `repliesCount`.

#### TikTok (when connected)

```
Actor: clockworks/tiktok-scraper
Input: { "username": "thefatihachikh", "resultsLimit": 10 }
```

Extract profile: `followers`, `hearts`, `videoCount`.
Extract per video: `desc` (first 80 chars), `playCount`, `diggCount`
(likes), `shareCount`, `commentCount`.

**Until TikTok is wired**, log: `TikTok: NOT CONNECTED — skipped (see
inventory.md gap)`.

### 2. Check Blotato for published posts

Call `blotato_list_posts` to get all posts with status `published` (or the
most recent batch). For each:

- Record the `postId`, `accountId`, `scheduledTime`, `publishedTime`,
  `caption` (first 80 chars), `platformUrl` (the live post URL if Blotato
  returns it), `status`.
- This is the bridge between "what we queued" and "what actually went live."

### 3. Match scraped posts to vault entries

For each scraped post (from step 1), attempt to match it to a vault entry:

1. **URL match** — if a `POSTED` vault entry already has a URL or Blotato post
   ID, and the scraped post URL matches, that is the link.
2. **Caption match** — compare the first 60 characters of the scraped caption
   to the first 60 characters of each vault entry's caption/script. Use
   case-insensitive substring matching; emoji differences are OK.
3. **Date + platform match** — if the scraped post date and platform match a
   vault entry's date and platform, and only one candidate exists, link them.

If no match is found, the post is "untracked" — still log its metrics but
note `(no vault match)`.

### 4. Compute week-over-week deltas

If a prior `## PERFORMANCE` entry exists in `performance-log.md`:

- For each profile metric (followers, total views, etc.), compute:
  `delta = current − previous`, `delta_pct = (delta / previous) * 100`.
- Format as `+N (+X.X%)` or `-N (-X.X%)`.

If no prior entry exists, write `(first snapshot — no delta)`.

---

## Output

### A. `performance-log.md` — the dated entry

If the file does not exist, create it with this header:

```markdown
# Performance Log — Fatiha Chikh

> Real engagement data scraped from social platforms. One entry per run,
> newest at the top. Date format: `YYYY-MM-DD`. Data source: Apify MCP +
> Blotato MCP. Do not edit manually — this file is machine-written.

---
```

Then prepend the new entry (newest at top, below the header):

```markdown
## PERFORMANCE YYYY-MM-DD

**Run date:** YYYY-MM-DD HH:MM UTC
**Sources scraped:** Instagram, YouTube, Twitter/X, Threads [, TikTok]

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | 1,234 | +56 (+4.8%) | 89 posts | — |
| YouTube | @AI-Automation-Queen | 456 subs | +12 (+2.7%) | 23 videos | 12,345 lifetime views |
| Twitter/X | @aiautomatik | 789 | +23 (+3.0%) | — | — |
| Threads | @thefatihachikh | 321 | +8 (+2.6%) | — | — |
| TikTok | — | NOT CONNECTED | — | — | — |

### Top posts by engagement (last 12 posts per platform)

| # | Platform | Caption (excerpt) | Likes | Comments | Views | Eng. rate | Vault match |
|---|---|---|---|---|---|---|---|
| 1 | IG Reel | "I run my business like…" | 847 | 63 | 12,400 | 7.4% | ENTRY 010 |
| 2 | IG Reel | "Stop using AI like a…" | 612 | 41 | 9,200 | 7.1% | ENTRY 004 |
| 3 | YT Short | "You're the bottleneck…" | 234 | 18 | 5,600 | 4.5% | ENTRY 008 |
| … | | | | | | | |

> **Engagement rate** = (likes + comments) / views × 100, or
> (likes + comments) / followers × 100 when views are unavailable.

### Blotato queue status

- Published: N posts
- Scheduled (pending): N posts
- Failed: N posts (list IDs if any)

### Week-over-week summary

- Instagram followers: +56 (+4.8%) ← strongest growth
- YouTube subscribers: +12 (+2.7%)
- Top-performing piece: ENTRY 010 — 12,400 views, 7.4% eng. rate
- Weakest platform: [platform] — [observation]
- Content signal: [one sentence — e.g., "talking-head reels outperform carousels 3:1 on IG"]

---
```

Adjust the tables to actual data. Do not fabricate numbers — if a scraper
returns nothing, write `(scrape failed — see failure log below)` for that row.

### B. Update POSTED vault entries with real metrics

For every vault entry that matched a scraped post, edit its block in
`content-vault.md` to append (or update) a `**Performance:**` line:

```markdown
**Performance:** IG — 847 likes, 63 comments, 12,400 views (scraped YYYY-MM-DD)
```

If the entry was posted to multiple platforms, list each:

```markdown
**Performance:** IG — 847 likes, 63 comments, 12,400 views | YT — 234 likes, 18 comments, 5,600 views (scraped YYYY-MM-DD)
```

Rules:
- Only write `**Performance:**` on entries with status `POSTED`.
- If the line already exists, **replace** it with the fresher numbers (metrics
  only go up; if a number drops, keep the higher one — platform reporting
  delays can cause temporary dips).
- Do not change the entry's status, score, script, or any other field.
- Use `DD/MM/YYYY` for the scrape date inside vault entries (vault date format).

### C. Report file (optional but recommended)

Write `reports/performance-YYYY-MM-DD.md` with a copy of the performance-log
entry plus a short narrative analysis: what is working, what is not, and one
recommendation for content-engine (e.g., "double down on talking-head reels —
they outperform carousels 3:1 on engagement rate").

---

## Competitors mode

If the operator passes `competitors` as the argument:

1. Read `inspiration-library/creators.csv`.
2. For each row where `platform_primary` is Instagram or TikTok, scrape their
   profile via the same Apify actors (profile-level only — not their individual
   posts, to keep costs low).
3. Add a `### Competitor snapshot` section to the performance-log entry:

```markdown
### Competitor snapshot

| # | Creator | Platform | Followers | Delta | Content focus |
|---|---|---|---|---|---|
| 1 | Sabrina Ramonov | IG @sabrina_ramonov | 518K | — | AI tools + productivity |
| 2 | Riley Brown | TikTok @rileybrown.ai | 634.5K | — | AI tool demos |
| … | | | | | |
```

This is the bridge to `competitor-watch` — lightweight follower-level
comparison alongside our own numbers.

---

## Failure modes

- **An Apify actor fails or is not found** → run `search-actors` with a keyword
  (e.g., "instagram profile scraper") to find the current best actor. If no
  actor works, log `(Instagram scrape FAILED: <error>)` in that row and
  continue. Do not block the entire run.
- **A scraper returns empty data** → write `(no data returned)` rather than
  fabricate numbers. Never invent metrics.
- **Blotato returns no published posts** → note `(Blotato: 0 published posts —
  nothing to cross-reference)` and skip step 2. This is expected early on.
- **Network egress blocked** → return a clear "needs allowlist: <hosts>"
  message and stop. Do not silently substitute.
- **No prior performance entry** → write `(first snapshot — no delta)` for all
  delta fields. This is normal on the first run.

---

## After saving

Give the operator a tight summary:

- Follower counts across platforms (one line)
- The single best-performing post (entry number, platform, engagement rate)
- The single weakest signal (platform or content type underperforming)
- One content recommendation for the next content-engine run
- Any scrapers that failed or platforms not yet connected

---

## What this skill does not do

- Does not draft or edit content — that is `content-engine`.
- Does not publish or schedule — that is `distribution`.
- Does not invent metrics when a scraper fails.
- Does not store API keys in the repo.
- Does not scrape private accounts or DMs.
- Does not delete or renumber vault entries.
- Does not overwrite past performance-log entries (append only, newest at top).
