---
name: performance-tracker
version: 1.0.0
description: |
  Machine M06 — scrapes social media metrics via Apify + Blotato, writes
  performance data to performance-log.md, and updates POSTED vault entries
  with real engagement numbers. Runs daily on the cron. No API keys needed
  (Apify + Blotato are MCP-connected). Tracks: Instagram, YouTube, TikTok,
  LinkedIn (profile-level). Competitors optional via handles.

  Preferred source hierarchy per platform:
    Instagram/Facebook — Meta Graph API (when META_ACCESS_TOKEN is set) → Apify scraper fallback
    YouTube — Apify scraper (free tier)
    LinkedIn — Apify curious_coder/linkedin-profile-scraper ($0.004/scrape, max 1/day) + manual paste
    TikTok — Apify clockworks/tiktok-scraper (when connected)
argument-hint: "[nothing needed | 'competitors' to also scrape tracked creators | 'linkedin-update' for manual LinkedIn stats paste]"
allowed-tools:
  - Read
  - Edit
  - Write
  - Bash
  - Grep
  - mcp__APIFY_-_Trends_listener__call-actor
  - mcp__APIFY_-_Trends_listener__get-dataset-items
  - mcp__APIFY_-_Trends_listener__fetch-actor-details
  - mcp__APIFY_-_Trends_listener__search-actors
  - mcp__Blotato__blotato_list_posts
  - mcp__Blotato__blotato_get_post_status
---

# Performance Tracker — Machine M06

You are the **measurement layer** for the content pipeline. You pull real
engagement data from social platforms — preferring first-party APIs where
available, falling back to Apify scrapers — and cross-reference it with the
Blotato publishing queue. Results go into `performance-log.md` so the system
(and the operator) can see what is actually working. Read `CLAUDE.md` and
`positioning/SKILL.md` first.

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

## Source hierarchy — preferred vs. fallback for every platform

Each platform has a **preferred** data source (cheaper, richer, or first-party)
and a **fallback** (Apify scraper). At run time, try the preferred source first;
if it errors or is not configured, fall back silently and log which path was
taken.

| Platform | Preferred source | Fallback source | Cost note |
|---|---|---|---|
| **Instagram** | Meta Graph API (`/me/media`, `/me` insights) — requires `META_ACCESS_TOKEN` + `IG_BUSINESS_ID` in env | Apify `apify/instagram-profile-scraper` + `apify/instagram-post-scraper` | Graph API = free (rate-limited); Apify ~$0.01/run |
| **Facebook** | Meta Graph API (`/{page-id}/published_posts`, `/{page-id}` insights) — requires `META_ACCESS_TOKEN` + `FB_PAGE_ID` in env | Apify `apify/facebook-posts-scraper` ($0.005/post) | Graph API = free; Apify = pay-per-post |
| **YouTube** | Apify `streamers/youtube-channel-scraper` (channel) + `bernardo/youtube-scraper` (videos) | Apify `bernardo/youtube-scraper` keyword search | ~$0.005/run |
| **LinkedIn** | Apify `curious_coder/linkedin-profile-scraper` ($0.004/scrape, **max 1/day**) | Manual paste via `linkedin-update` argument | Scraper is cheap but rate-limited; manual is free |
| **TikTok** | Apify `clockworks/tiktok-scraper` | *(none — flag NOT CONNECTED)* | Only when operator wires a TikTok account |
| **Twitter / X** | Apify `apidojo/twitter-user-scraper` | Apify `apify/twitter-scraper` | ~$0.01/run |
| **Threads** | Apify `apify/threads-scraper` | *(none)* | ~$0.005/run |

---

## Handles to track (canonical source: `inventory.md`)

| Platform | Handle / ID | Env vars needed (preferred path) |
|---|---|---|
| Instagram | `thefatihachikh` | `META_ACCESS_TOKEN`, `IG_BUSINESS_ID` |
| Facebook | Page "AI Automation Queen" | `META_ACCESS_TOKEN`, `FB_PAGE_ID` |
| YouTube | `AI-Automation-Queen` | *(none — Apify only)* |
| LinkedIn | Fatiha Chikh | *(none — Apify + manual)* |
| Twitter / X | `aiautomatik` | *(none — Apify only)* |
| Threads | `thefatihachikh` | *(none — Apify only)* |
| TikTok | *(not yet connected)* | *(connect to Blotato first)* |

Always re-read `inventory.md` at run time for the live handle list. If a handle
changes there, follow it — do not hardcode.

> **Env-var placeholders for `inventory.md`** (the operator fills these once):
> `META_ACCESS_TOKEN`, `IG_BUSINESS_ID`, `FB_PAGE_ID`. Until they are set,
> the Meta Graph API path is skipped and the Apify fallback runs instead.
> These tokens must **never** be committed to the repo — they live in the
> shell environment or a `.env` file excluded by `.gitignore` (see
> `security.md`).

---

## Step-by-step execution

### 0. Pre-flight

1. Read `CLAUDE.md` (system orientation).
2. Read `inventory.md` — extract the handles from the Channels table (section 3).
3. **Check environment** — test whether `META_ACCESS_TOKEN` is set (Bash:
   `[ -n "$META_ACCESS_TOKEN" ] && echo "meta-ok"`). Record the result so you
   know which source path to take for Instagram and Facebook.
4. Read `performance-log.md` — find the most recent `## PERFORMANCE` entry to
   know the prior snapshot (needed for deltas). If the file does not exist,
   create it with the header shown in the Output section below.
5. Read `content-vault.md` — collect every entry with status `POSTED` (or
   `SCHEDULED` that may have gone live). You will match scraped post data back
   to vault entries in step 3.

### 1. Scrape profile-level stats + recent posts

For each platform, try the **preferred** source first. If it fails or is not
configured, fall back. Use `fetch-actor-details` the first time you call an
Apify actor to confirm its input schema, then `call-actor` with
`waitSecs: 45`. Read results via `get-dataset-items` with a `fields=`
projection to keep token cost low.

---

#### Instagram

**Preferred — Meta Graph API** (when `META_ACCESS_TOKEN` + `IG_BUSINESS_ID` are set):

```bash
# Profile
curl -s "https://graph.facebook.com/v21.0/${IG_BUSINESS_ID}?fields=followers_count,follows_count,media_count,biography,name&access_token=${META_ACCESS_TOKEN}"

# Recent posts (last 12)
curl -s "https://graph.facebook.com/v21.0/${IG_BUSINESS_ID}/media?fields=id,caption,timestamp,like_count,comments_count,media_type,permalink,insights.metric(impressions,reach,video_views)&limit=12&access_token=${META_ACCESS_TOKEN}"
```

Extract from profile: `followers_count`, `follows_count`, `media_count`.
Extract per post: `permalink`, `timestamp`, `caption` (first 80 chars),
`like_count`, `comments_count`, `impressions`, `reach`, `video_views`.

**Fallback — Apify** (when Meta token is not set or API errors):

```
Actor: apify/instagram-profile-scraper
Input: { "usernames": ["thefatihachikh"] }
```

Extract: `followersCount`, `followsCount`, `postsCount`, `biography`.

For recent posts:

```
Actor: apify/instagram-post-scraper
Input: { "username": "thefatihachikh", "resultsLimit": 12 }
```

If that actor does not exist, try:

```
Actor: apify/instagram-scraper
Input: {
  "directUrls": ["https://www.instagram.com/thefatihachikh/"],
  "resultsType": "posts",
  "resultsLimit": 12
}
```

Extract per post: `shortCode`, `url`, `timestamp`, `caption` (first 80 chars),
`likesCount`, `commentsCount`, `videoViewCount`, `videoPlayCount`.

---

#### Facebook

**Preferred — Meta Graph API** (when `META_ACCESS_TOKEN` + `FB_PAGE_ID` are set):

```bash
# Page profile
curl -s "https://graph.facebook.com/v21.0/${FB_PAGE_ID}?fields=followers_count,fan_count,name&access_token=${META_ACCESS_TOKEN}"

# Recent posts (last 12)
curl -s "https://graph.facebook.com/v21.0/${FB_PAGE_ID}/published_posts?fields=id,message,created_time,permalink_url,likes.summary(true),comments.summary(true),shares,insights.metric(post_impressions,post_video_views)&limit=12&access_token=${META_ACCESS_TOKEN}"
```

Extract from profile: `followers_count`, `fan_count` (page likes).
Extract per post: `permalink_url`, `created_time`, `message` (first 80 chars),
likes count (`likes.summary.total_count`), comments count
(`comments.summary.total_count`), `shares.count`, `post_impressions`,
`post_video_views`.

**Fallback — Apify** (when Meta token is not set or API errors):

```
Actor: apify/facebook-posts-scraper
Input: {
  "startUrls": [{ "url": "https://www.facebook.com/AIAutomationQueen" }],
  "resultsLimit": 12
}
```

Cost: ~$0.005 per post returned.

Extract per post: `url`, `time`, `text` (first 80 chars), `likes`,
`comments`, `shares`, `reactions`, `viewsCount`.

For profile-level follower count when the Graph API is unavailable and
`facebook-posts-scraper` does not return it, log
`(Facebook followers: unavailable — set META_ACCESS_TOKEN for this metric)`.

---

#### YouTube — channel + recent videos

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

**Recent videos:**

```
Actor: bernardo/youtube-scraper
Input: {
  "channelUrls": ["https://www.youtube.com/@AI-Automation-Queen"],
  "maxResults": 10,
  "sortBy": "date"
}
```

Extract per video: `title`, `url`, `viewCount`, `likes`, `date`.

---

#### LinkedIn

LinkedIn has no public API for creator analytics. Two-tier approach:

**Auto — Apify scraper** (max 1 scrape per day to stay within rate limits):

```
Actor: curious_coder/linkedin-profile-scraper
Input: { "profileUrls": ["https://www.linkedin.com/in/fatihachikh/"] }
```

Cost: ~$0.004 per scrape. Returns public profile data only.

Extract: `connectionsCount` (or `followersCount` if available), `headline`,
`summary`, `postsCount` (if returned).

> **Rate limit:** this actor is capped at 1 call/day for the same profile.
> If the skill runs more than once per day, skip the LinkedIn scrape on
> subsequent runs and reuse the last snapshot from `performance-log.md`.

**Manual — `linkedin-update` argument:**

When the operator passes `linkedin-update`, prompt them (via terminal input or
a pasted block) to provide their LinkedIn analytics for the week. Expected
format:

```
Followers: 12,345
Post impressions (7d): 45,000
Profile views (7d): 1,200
Top post URL: https://www.linkedin.com/posts/...
Top post impressions: 8,500
Top post reactions: 234
Top post comments: 47
```

Parse whatever they paste and merge it into the performance-log entry under the
LinkedIn row + a `### LinkedIn analytics (manual)` subsection. This is the only
way to get post-level LinkedIn data until a first-party API is available.

---

#### Twitter / X — profile + recent tweets

```
Actor: apidojo/twitter-user-scraper
Input: { "handles": ["aiautomatik"], "tweetsDesired": 10 }
```

If that actor is unavailable, fall back:

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

---

#### Threads — profile + recent posts

```
Actor: apify/threads-scraper
Input: { "usernames": ["thefatihachikh"], "resultsLimit": 10 }
```

Extract: `followersCount` (profile-level), and per post: `text` (first 80
chars), `likesCount`, `repliesCount`.

---

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

---

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
  `delta = current - previous`, `delta_pct = (delta / previous) * 100`.
- Format as `+N (+X.X%)` or `-N (-X.X%)`.

If no prior entry exists, write `(first snapshot — no delta)`.

### 5. Extract lessons — winners vs losers

This is the step that closes the loop into `content-engine` and `copy-craft`.
Raw numbers alone don't change what gets written next; a ranked, attributed
comparison does.

1. Rank this run's scraped posts (all platforms, pooled) by engagement rate.
2. Take the top 3 and bottom 3 (or top/bottom 25% if there are enough posts).
   For each, note: platform, format (reel/carousel/text/etc.), matched vault
   entry's **pillar** and **pattern used** (if matched), and the hook's
   mechanism (bold claim / curiosity gap / personal reveal / educational
   listicle / etc. — describe what it actually is, don't force it into a
   pre-existing label if it doesn't fit).
3. Write a **comparison, not just a list**: what structurally separates the
   top group from the bottom group? Prefer a specific, falsifiable claim
   ("personal/behind-the-scenes reveals ran 4–8x the engagement rate of
   educational listicles across N posts this run") over a vague one
   ("some posts did better").
4. Carry forward lessons across runs — if this run's top pattern matches a
   pattern already logged as a winner in a previous run's Lessons section,
   say so explicitly ("confirms the 2026-06-27 finding") rather than treating
   every run as a first look. If a run has too few posts (<6) for a reliable
   comparison, say so and skip ranking rather than force a conclusion from
   thin data.
5. Never launder an assumption as a finding — if a plausible-sounding pattern
   isn't actually supported by this run's numbers, don't write it down as a
   lesson.

---

## Output

### A. `performance-log.md` — the dated entry

If the file does not exist, create it with this header:

```markdown
# Performance Log — Fatiha Chikh

> Real engagement data scraped from social platforms. One entry per run,
> newest at the top. Date format: `YYYY-MM-DD`. Data sources: Meta Graph API,
> Apify MCP, Blotato MCP. Do not edit manually — this file is machine-written.

---
```

Then prepend the new entry (newest at top, below the header):

```markdown
## PERFORMANCE YYYY-MM-DD

**Run date:** YYYY-MM-DD HH:MM UTC
**Sources scraped:** Instagram (Graph API|Apify), Facebook (Graph API|Apify), YouTube (Apify), LinkedIn (Apify|manual), Twitter/X (Apify), Threads (Apify) [, TikTok (Apify)]
**Data path:** [list which platform used preferred vs. fallback]

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | 1,234 | +56 (+4.8%) | 89 posts | — |
| Facebook | AI Automation Queen | 2,100 | +34 (+1.6%) | 45 posts | 1,800 page likes |
| YouTube | @AI-Automation-Queen | 456 subs | +12 (+2.7%) | 23 videos | 12,345 lifetime views |
| LinkedIn | Fatiha Chikh | 5,678 | +89 (+1.6%) | — | (auto-scraped) |
| Twitter/X | @aiautomatik | 789 | +23 (+3.0%) | — | — |
| Threads | @thefatihachikh | 321 | +8 (+2.6%) | — | — |
| TikTok | — | NOT CONNECTED | — | — | — |

### Top posts by engagement (last 12 posts per platform)

| # | Platform | Caption (excerpt) | Likes | Comments | Views | Eng. rate | Vault match |
|---|---|---|---|---|---|---|---|
| 1 | IG Reel | "I run my business like..." | 847 | 63 | 12,400 | 7.4% | ENTRY 010 |
| 2 | FB | "Stop doing robot work..." | 312 | 28 | 4,800 | 7.1% | ENTRY 001 |
| 3 | YT Short | "You're the bottleneck..." | 234 | 18 | 5,600 | 4.5% | ENTRY 008 |
| ... | | | | | | | |

> **Engagement rate** = (likes + comments) / views x 100, or
> (likes + comments) / followers x 100 when views are unavailable.

### LinkedIn analytics (manual)

> Only present when operator provides data via `linkedin-update`.

- Followers: 5,678
- Post impressions (7d): 45,000
- Profile views (7d): 1,200
- Top post: [URL] — 8,500 impressions, 234 reactions, 47 comments

### Blotato queue status

- Published: N posts
- Scheduled (pending): N posts
- Failed: N posts (list IDs if any)

### Week-over-week summary

- Instagram followers: +56 (+4.8%) <-- strongest growth
- Facebook followers: +34 (+1.6%)
- YouTube subscribers: +12 (+2.7%)
- LinkedIn connections: +89 (+1.6%)
- Top-performing piece: ENTRY 010 — 12,400 views, 7.4% eng. rate
- Weakest platform: [platform] — [observation]

### Lessons — repeatable patterns

> Read by `copy-craft` and `content-engine` before every drafting pass. Every
> claim here must trace to specific posts in this run's tables above — no
> assumptions. If fewer than 6 posts were scraped this run, write "insufficient
> data this run" instead of forcing a ranking.

**Winners this run:**
1. [Pillar/format/hook mechanism] — [N]% eng. rate avg, e.g. ENTRY 010, ENTRY 003
2. ...

**Losers this run:**
1. [Pillar/format/hook mechanism] — [N]% eng. rate avg, e.g. ENTRY 007
2. ...

**The comparison:** [one specific, falsifiable sentence on what separates
winners from losers — e.g., "personal/behind-the-scenes reveals (7.8% avg)
ran 4-8x the educational-listicle format (0.5-1.9% avg) across 12 posts."]

**Carried forward:** [confirms / contradicts / extends a prior run's finding,
cite the date — or "first run with enough data to compare" if none exists yet]

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
**Performance:** IG — 847 likes, 63 comments, 12,400 views | FB — 312 likes, 28 comments, 4,800 views | YT — 234 likes, 18 comments, 5,600 views (scraped YYYY-MM-DD)
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
2. For each row where `platform_primary` is Instagram or TikTok **and** the
   `handle` column is not `—`, scrape their profile via the same Apify actors
   (profile-level only — not their individual posts, to keep costs low).
3. Add a `### Competitor snapshot` section to the performance-log entry:

```markdown
### Competitor snapshot

| # | Creator | Platform | Handle | Followers | Delta | Content focus |
|---|---|---|---|---|---|---|
| 1 | Sabrina Ramonov | IG | @sabrina_ramonov | 518K | — | AI tools + productivity |
| 2 | Riley Brown | TikTok | @rileybrown.ai | 634.5K | — | AI tool demos |
| 3 | Allie K. Miller | LinkedIn | @alliekmiller | 1.5M | — | AI for business |
| ... | | | | | | |
```

This is the bridge to `competitor-watch` — lightweight follower-level
comparison alongside our own numbers.

---

## LinkedIn-update mode

If the operator passes `linkedin-update` as the argument:

1. Print a prompt asking the operator to paste their weekly LinkedIn analytics.
   Provide the expected format:
   ```
   Followers: NNN
   Post impressions (7d): NNN
   Profile views (7d): NNN
   Top post URL: https://...
   Top post impressions: NNN
   Top post reactions: NNN
   Top post comments: NNN
   ```
2. Parse the pasted text (be lenient — accept variations in labels, commas in
   numbers, missing fields).
3. Write or update the `### LinkedIn analytics (manual)` subsection in the
   current day's `## PERFORMANCE` entry in `performance-log.md`. If no entry
   exists for today, create one (run the full scrape pipeline first, then
   append the LinkedIn manual data).
4. Compute deltas against the previous entry's LinkedIn manual data if available.

This is the **only** way to get post-level LinkedIn data. The auto-scraper gives
follower count only; everything else requires the operator's analytics export.

---

## Failure modes

- **Meta Graph API returns 401/403** → token expired or missing. Log
  `(Instagram/Facebook: META_ACCESS_TOKEN invalid or missing — falling back to
  Apify)` and proceed with the Apify fallback. Do not block the run.
- **An Apify actor fails or is not found** → run `search-actors` with a keyword
  (e.g., "instagram profile scraper") to find the current best actor. If no
  actor works, log `(Instagram scrape FAILED: <error>)` in that row and
  continue. Do not block the entire run.
- **LinkedIn scraper rate-limited** → if the skill already ran today, reuse the
  last LinkedIn snapshot from `performance-log.md` and note `(LinkedIn: reused
  prior snapshot — max 1 scrape/day)`.
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

- Follower counts across all platforms (one line)
- Which data path was used per platform (Graph API vs. Apify vs. manual)
- The single best-performing post (entry number, platform, engagement rate)
- The single weakest signal (platform or content type underperforming)
- One content recommendation for the next content-engine run
- Any scrapers that failed or platforms not yet connected

---

## What this skill does not do

- Does not draft or edit content — that is `content-engine`.
- Does not publish or schedule — that is `distribution`.
- Does not invent metrics when a scraper fails.
- Does not store API keys or tokens in the repo (env vars only, see `security.md`).
- Does not scrape private accounts or DMs.
- Does not delete or renumber vault entries.
- Does not overwrite past performance-log entries (append only, newest at top).
- Does not scrape LinkedIn more than once per day (rate-limit guard).
