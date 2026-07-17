# Performance Report — 2026-07-17

**Machine:** M06 Performance Tracker
**Run date:** 2026-07-17 ~UTC
**Run type:** daily (standard, no `competitors` or `linkedin-update` arg)

---

## What happened this run

**Ninth consecutive failed scrape.** No social platform data was retrievable.

### Failure log

| Platform | Preferred path | Fallback path | Result |
|---|---|---|---|
| Instagram | Meta Graph API — `META_ACCESS_TOKEN` not set | Apify MCP — not connected; no `APIFY_TOKEN` | FAILED |
| Facebook | Meta Graph API — not set | Apify MCP — not connected | FAILED |
| YouTube | Apify `streamers/youtube-channel-scraper` | Apify MCP not connected | FAILED |
| LinkedIn | Apify `curious_coder/linkedin-profile-scraper` | Manual paste (`linkedin-update` not passed) | FAILED |
| Twitter/X | Apify `apidojo/twitter-user-scraper` | Apify MCP not connected | FAILED |
| Threads | Apify `apify/threads-scraper` | Apify MCP not connected | FAILED |
| TikTok | Not connected to Blotato | n/a | NOT CONNECTED (pre-existing) |
| Blotato queue | `blotato_list_posts` — MCP not connected | n/a | FAILED |

### What is and is not working

**Working (M01/content-engine):**
- Content production has been running daily. 55 live vault entries written (0 POSTED).
- Last content-engine run: 2026-07-16 — 5 LinkedIn how-to drafts from RESEARCH 036 (ENTRY 072–076).
- Research harvest (RESEARCH 036) completed 2026-07-16. Signals ingested.
- Git commits clean; main branch is source of truth per 2026-07-08 decision.
- Newsletter (AI Insider Brief) deployed and live per recent commits.

**Not working (M06/measurement):**
- M06 has been non-functional since 2026-06-27 (partial). 20 consecutive days without platform data.
- 0 vault entries have status `POSTED` — no post-rebrand content has been released to any platform.
- The feedback loop between content production and audience signal is completely broken.

---

## Current state (last reliable data)

| Platform | Last scraped | Followers | Top post |
|---|---|---|---|
| Instagram | 2026-06-27 | 632 | "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate |
| Facebook | 2026-06-27 | (partial — scraper returned limited data) | — |
| YouTube | 2026-06-27 | (partial) | — |
| LinkedIn | Never scraped | Unknown | — |
| Twitter/X | 2026-06-27 | (partial) | — |
| Threads | 2026-06-27 | (partial) | — |

All data above is 20 days stale and pre-rebrand. Treat as directional only.

---

## What is working (lessons carried forward)

From 2026-06-27 scrape — directional, not yet confirmed against new positioning:

- Personal narrative + face/voice/story formats: ~7.9% engagement rate (IG)
- Educational listicle/glossary formats: 0.5–1.9% engagement rate (IG)
- Ratio: ~4–8x in favour of personal/narrative content

**This pattern is unconfirmed for the new brand and audience.** It was scraped
before the rebrand to The AI Automation Queen positioning. The 55 live vault entries
written since then cannot be scored until content is released.

**Content-engine recommendation (held since 2026-07-09):**
Continue the personal/narrative lean established by the pre-rebrand data — Real Talk
and Freedom Business pillars over plain Educational. This recommendation cannot
be refreshed until content goes live and M06 can score it.

---

## Three things the operator needs to do (priority order)

### 1. HIGHEST PRIORITY — unblock the measurement layer
Connect **either** of the following:
- Apify MCP server in the session/environment (unblocks Instagram, YouTube, Twitter/X, Threads, LinkedIn profile, all ~$0.01–0.05/run)
- Set `APIFY_TOKEN` as an env variable — REST API fallback in the skill will activate automatically without MCP
- Set `META_ACCESS_TOKEN` + `IG_BUSINESS_ID` + `FB_PAGE_ID` — free Graph API path for Instagram and Facebook

Without this, M06 cannot execute. The skill cannot self-wire; it requires operator configuration.
**This action item has been in every report since 2026-07-09. Nine days unresolved.**

### 2. REQUIRED — release content so M06 has something to measure
55 live vault entries exist, many with status READY TO POST. 0 have been posted.
The engine is writing into a void. Even a working M06 cannot score content that
hasn't been released.

Suggested: release 3–5 ENTRY items via Blotato, starting with the highest-scored
READY TO POST entries (ENTRY 002, 003, 004, 006, 007, 008 — see vault).

### 3. OPTIONAL — manual LinkedIn injection
Pass `linkedin-update` argument on the next M06 run to paste LinkedIn analytics
directly (follower count, post impressions, profile views). This is the only
way to get LinkedIn data until the Apify scraper is connected.

---

## Board meeting readiness (the four questions)

| Question | Answer |
|---|---|
| Emails captured this week? | Unknown — M06 does not track GHL/Kit. Check n8n → GHL source tags manually. |
| Store clicks / checkout starts? | Unknown — no analytics integration. Check Whop dashboard. |
| Drafts produced vs released? | Produced: 55 live entries (last added 16/07/2026). Released: 0. Queue health: unknown (Blotato MCP offline). |
| Which posts won / what to do differently? | Cannot answer — 0 posts released, 0 posts scored. |

**If the board asks "why is M06 dark for 20 days?" the answer is structural:**
MCP tools are not wired into this session. It requires one operator action (set
`APIFY_TOKEN` or connect Apify MCP) to resolve. This has been in the action items
since 2026-07-09.

---

_Report generated by M06 performance-tracker. queen-brain was not in this session
(noted per CLAUDE.md); this report is internal/machine data, not customer-facing._
