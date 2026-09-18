# Performance Log — Fatiha Chikh

> Real engagement data scraped from social platforms. One entry per run,
> newest at the top. Date format: `YYYY-MM-DD`. Data sources: Meta Graph API,
> Apify MCP, Blotato MCP. Do not edit manually — this file is machine-written.

---

## PERFORMANCE 2026-09-18

**Run date:** 2026-09-18 (interactive operator session, not the 03:00 UTC cron)
**Sources scraped:** Instagram (FAILED — no route open), Facebook (FAILED — no route open), YouTube (FAILED — yt-dlp not installed), LinkedIn (manual paste solicited live this run — see operator briefing), Twitter/X (manual paste solicited live this run — see operator briefing), Threads (FAILED — no route open), TikTok (NOT CONNECTED), Blotato (FAILED — MCP not connected)
**Data path:** ALL automated paths blocked, fourth consecutive run with no change in wiring since the 2026-09-15 restart.
- `META_ACCESS_TOKEN` / `IG_BUSINESS_ID` / `FB_PAGE_ID` / `APIFY_TOKEN` — all unset in this session's env (verified directly). Meta Graph API and every Apify paid fallback are skipped. Per skill design, no `APIFY_TOKEN` is a normal state, not a failure — but combined with no Meta token, IG/FB/Threads have zero automated route.
- No Apify MCP tools resolve via `ToolSearch` in this session (confirmed again this run) → paid fallback structurally unavailable regardless of token.
- `yt-dlp` not installed on this host (`command -v yt-dlp` → not found) → YouTube's free, keyless path is unavailable.
- Blotato MCP tools do not resolve in this session → step 2 (queue cross-reference) skipped.
- **Difference from the last 3 runs:** this is an interactive operator session, not an unattended cron. Per the skill's "manual paste is a first-class path, not an apology" rule, LinkedIn and Twitter/X numbers were actively solicited from the operator in the chat this run (see operator briefing) rather than just noted as missing. If provided in a follow-up message, this entry will be updated with a `### LinkedIn analytics (manual)` / Twitter subsection.
- TikTok: still not connected to Blotato (pre-existing inventory.md gap).

> **Vault status confirmed by this session's own startup reality check and independently by a direct `content-vault.md` scan:** 78 entries total — 37 READY TO POST, 33 DRAFT, 6 STALE, 2 KILLED, **0 POSTED**. Unchanged from 09-17. Release, not measurement, remains the bottleneck — unchanged for a fourth day.
>
> **Confirms 2026-09-15/16/17 findings, not a new bug:** `deploy/logs/performance-tracker-2026-09-18T03-00-03.log` again shows only a `git fetch` / "Current branch main is up to date." — no scrape output. The cron fired but did not invoke this skill's actual logic, for at least four consecutive days now.

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (no data — last baseline: 636 on 04/07/2026 per inventory.md) | (no data — 76 days since baseline) | (no data) | No `META_ACCESS_TOKEN`; no Apify route |
| Facebook | AI Automation Queen | (no data) | — | — | No Meta token; no Apify route |
| YouTube | @AI-Automation-Queen | (no data) | — | — | `yt-dlp` not installed; no Apify route |
| LinkedIn | Fatiha Chikh | (pending — asked operator live this run) | — | — | Reply in chat with the weekly analytics block to fill this in |
| Twitter/X | @aiautomatik | (pending — asked operator live this run) | — | — | Reply in chat with follower/tweet numbers to fill this in |
| Threads | @thefatihachikh | (no data) | — | — | No `META_ACCESS_TOKEN` scoped route |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **(no data returned this run)** — no scraper produced results, and vault has 0 POSTED entries to cross-reference regardless. Nothing to rank.

### Blotato queue status

> **(scrape failed — Blotato MCP not connected this session)**. Last known state carried from 2026-06-27: 14 published, 0 scheduled, 5 failed. Current queue health unknown.

### Week-over-week summary

- Instagram followers: 636 (last confirmed 04/07/2026 — delta unknown, 76 days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: (no data — LinkedIn/Twitter pending operator paste this run)
- Top-performing piece: none post-rebrand — carried reference only, see Lessons below
- Weakest signal: the measurement layer itself, and the release step upstream of it
- **Structural gap (unchanged, fourth run in a row):** 37 entries sit READY TO POST with 0 POSTED. M06 cannot measure what has not been released.

### Lessons — repeatable patterns

> Insufficient data this run — 0 posts scraped, 0 POSTED vault entries to match. No ranking attempted (skill rule: fewer than 6 posts this run means skip ranking rather than force a conclusion).

**Carried forward from 2026-06-27 (now 83 days stale — treat as historical, pre-rebrand reference only, not an actionable finding):**
Personal narrative + face/voice/actual story format ran ~4–8x the engagement rate of generic AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts). This predates the current brand/positioning and has never been validated against it — do not treat as current guidance.

**Action required (operator):**
1. **Release content.** Still the highest-leverage single action: 37 READY TO POST entries exist and 0 are live. Releasing even 3–5 through Blotato (queue-only — the operator releases, per `security.md` §3.1) gives the next run something real to measure.
2. **Wire a metrics route.** Either set `APIFY_TOKEN` (unlocks paid fallback for IG/YT/X/Threads) or add `META_ACCESS_TOKEN` + `IG_BUSINESS_ID` + `FB_PAGE_ID` (free, first-party for IG/FB/Threads) as session env vars — never commit them to the repo.
3. **Check why the daily cron isn't running the skill.** Four consecutive days of logs now show only a `git fetch`, not a scrape — the "15 live" machines claim in deploy docs does not match observed behavior for M06.
4. **Reply with LinkedIn and/or Twitter/X numbers this session** — asked live below, no token needed, works today.

---

## PERFORMANCE 2026-09-17

**Run date:** 2026-09-17 03:01 UTC
**Sources scraped:** Instagram (FAILED — no route open), Facebook (FAILED — no route open), YouTube (FAILED — yt-dlp not installed), LinkedIn (manual paste required — not provided this run), Twitter/X (manual paste required — not provided this run), Threads (FAILED — no route open), TikTok (NOT CONNECTED), Blotato (FAILED — MCP not connected)
**Data path:** ALL automated paths blocked, third consecutive run with no change in wiring since the 2026-09-15 restart.
- `META_ACCESS_TOKEN` / `IG_BUSINESS_ID` / `FB_PAGE_ID` / `APIFY_TOKEN` — all unset in this session's env (verified directly: `META_ACCESS_TOKEN`, `IG_BUSINESS_ID`, `FB_PAGE_ID`, `APIFY_TOKEN` all empty). Meta Graph API and every Apify paid fallback are skipped. Per skill design, no `APIFY_TOKEN` is a normal state, not a failure — but combined with no Meta token, IG/FB/Threads have zero automated route.
- No Apify MCP tools resolve via `ToolSearch` in this session (confirmed again this run) → paid fallback structurally unavailable regardless of token.
- `yt-dlp` not installed on this host (`command -v yt-dlp` → not found) → YouTube's free, keyless path is unavailable.
- Blotato MCP tools do not resolve in this session → step 2 (queue cross-reference) skipped.
- No `linkedin-update` or `competitors` argument was passed this run, so LinkedIn/Twitter manual-paste prompts were not solicited interactively; asked in the operator briefing instead.
- TikTok: still not connected to Blotato (pre-existing inventory.md gap).

> **Vault status confirmed by this session's own startup reality check:** 78 entries total — 37 READY TO POST, 33 DRAFT, 6 STALE, 2 KILLED, **0 POSTED**. Independently confirmed by a direct `content-vault.md` scan this run (zero `POSTED` status entries found). Release, not measurement, remains the bottleneck — unchanged for a third day.
>
> **Confirms 2026-09-15 and 2026-09-16 findings, not a new bug:** `deploy/logs/performance-tracker-2026-09-17T03-00-02.log` again shows only a `git fetch` / "Already up to date" — no scrape output. The cron is firing but not invoking this skill's actual logic, for at least three consecutive days now.

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (no data — last baseline: 636 on 04/07/2026 per inventory.md) | (no data — 75 days since baseline) | (no data) | No `META_ACCESS_TOKEN`; no Apify route |
| Facebook | AI Automation Queen | (no data) | — | — | No Meta token; no Apify route |
| YouTube | @AI-Automation-Queen | (no data) | — | — | `yt-dlp` not installed; no Apify route |
| LinkedIn | Fatiha Chikh | (no data — manual paste not provided) | — | — | Re-run with `linkedin-update` to paste weekly stats |
| Twitter/X | @aiautomatik | (no data — manual paste not provided) | — | — | No automated route by design; needs manual paste |
| Threads | @thefatihachikh | (no data) | — | — | No `META_ACCESS_TOKEN` scoped route |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **(no data returned this run)** — no scraper produced results, and vault has 0 POSTED entries to cross-reference regardless. Nothing to rank.

### Blotato queue status

> **(scrape failed — Blotato MCP not connected this session)**. Last known state carried from 2026-06-27: 14 published, 0 scheduled, 5 failed. Current queue health unknown.

### Week-over-week summary

- Instagram followers: 636 (last confirmed 04/07/2026 — delta unknown, 75 days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: (no data)
- Top-performing piece: none post-rebrand — carried reference only, see Lessons below
- Weakest signal: the measurement layer itself, and the release step upstream of it
- **Structural gap (unchanged, third run in a row):** 37 entries sit READY TO POST with 0 POSTED. M06 cannot measure what has not been released.

### Lessons — repeatable patterns

> Insufficient data this run — 0 posts scraped, 0 POSTED vault entries to match. No ranking attempted (skill rule: fewer than 6 posts this run means skip ranking rather than force a conclusion).

**Carried forward from 2026-06-27 (now 82 days stale — treat as historical, pre-rebrand reference only, not an actionable finding):**
Personal narrative + face/voice/actual story format ran ~4–8x the engagement rate of generic AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts). This predates the current brand/positioning and has never been validated against it — do not treat as current guidance.

**Action required (operator):**
1. **Release content.** Still the highest-leverage single action: 37 READY TO POST entries exist and 0 are live. Releasing even 3–5 through Blotato (queue-only — the operator releases, per `security.md` §3.1) gives the next run something real to measure.
2. **Wire a metrics route.** Either set `APIFY_TOKEN` (unlocks paid fallback for IG/YT/X/Threads) or add `META_ACCESS_TOKEN` + `IG_BUSINESS_ID` + `FB_PAGE_ID` (free, first-party for IG/FB/Threads) as session env vars — never commit them to the repo.
3. **Check why the daily cron isn't running the skill.** Three consecutive days of logs now show only a `git fetch`, not a scrape — the "15 live" machines claim in deploy docs does not match observed behavior for M06.
4. **Optional:** re-run with `linkedin-update` to paste this week's LinkedIn analytics manually — that path needs no token and works today.

---

## PERFORMANCE 2026-09-16

**Run date:** 2026-09-16 UTC
**Sources scraped:** Instagram (FAILED — no route open), Facebook (FAILED — no route open), YouTube (FAILED — yt-dlp not installed), LinkedIn (manual paste required — not provided this run), Twitter/X (manual paste required — not provided this run), Threads (FAILED — no route open), TikTok (NOT CONNECTED), Blotato (FAILED — MCP not connected)
**Data path:** ALL automated paths blocked, same as 2026-09-15 — second consecutive run since the 53-day gap, no change in wiring.
- `META_ACCESS_TOKEN` / `IG_BUSINESS_ID` / `FB_PAGE_ID` not in env → Meta Graph API skipped for Instagram, Facebook, Threads.
- `APIFY_TOKEN` not in env, and no Apify MCP tools resolve in this session (`ToolSearch` found none) → paid fallback unavailable for every platform that needs it. Per skill design this is a normal (not degraded) state — but it means IG/FB/YT/X/Threads have zero automated route right now.
- `yt-dlp` not installed on this host → YouTube's free, keyless path is unavailable.
- Blotato MCP tools do not resolve in this session → no queue cross-reference possible (step 2 skipped).
- No `linkedin-update` or `competitors` argument was passed this run, so LinkedIn/Twitter manual-paste prompts were not solicited interactively.
- TikTok: still not connected to Blotato (pre-existing inventory.md gap).

> **Vault status confirmed by this session's own startup check and independently by `content-vault.md`:** 78 entries total — 37 READY TO POST, 33 DRAFT, 6 STALE, 2 KILLED, **0 POSTED**. Release, not measurement, remains the bottleneck. Producing more before releasing anything makes this number worse (session startup check's own words).
>
> **Confirms 2026-09-15 finding, not a new bug:** `deploy/logs/performance-tracker-2026-09-16T03-00-02.log` again shows only a `git fetch` / "Already up to date" — no scrape output. The cron is firing but not invoking this skill's actual logic, for at least two consecutive days now.

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (no data — last baseline: 636 on 04/07/2026 per inventory.md) | (no data — 74 days since baseline) | (no data) | No `META_ACCESS_TOKEN`; no Apify route |
| Facebook | AI Automation Queen | (no data) | — | — | No Meta token; no Apify route |
| YouTube | @AI-Automation-Queen | (no data) | — | — | `yt-dlp` not installed; no Apify route |
| LinkedIn | Fatiha Chikh | (no data — manual paste not provided) | — | — | Re-run with `linkedin-update` to paste weekly stats |
| Twitter/X | @aiautomatik | (no data — manual paste not provided) | — | — | No automated route by design; needs manual paste |
| Threads | @thefatihachikh | (no data) | — | — | No `META_ACCESS_TOKEN` scoped route |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **(no data returned this run)** — no scraper produced results, and vault has 0 POSTED entries to cross-reference regardless. Nothing to rank.

### Blotato queue status

> **(scrape failed — Blotato MCP not connected this session)**. Last known state carried from 2026-06-27: 14 published, 0 scheduled, 5 failed. Current queue health unknown.

### Week-over-week summary

- Instagram followers: 636 (last confirmed 04/07/2026 — delta unknown, 74 days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: (no data)
- Top-performing piece: none post-rebrand — carried reference only, see Lessons below
- Weakest signal: the measurement layer itself, and the release step upstream of it
- **Structural gap (unchanged, second run in a row):** 37 entries sit READY TO POST with 0 POSTED. M06 cannot measure what has not been released.

### Lessons — repeatable patterns

> Insufficient data this run — 0 posts scraped, 0 POSTED vault entries to match. No ranking attempted (skill rule: fewer than 6 posts this run means skip ranking rather than force a conclusion).

**Carried forward from 2026-06-27 (now 81 days stale — treat as historical, pre-rebrand reference only, not an actionable finding):**
Personal narrative + face/voice/actual story format ran ~4–8x the engagement rate of generic AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts). This predates the current brand/positioning and has never been validated against it — do not treat as current guidance.

**Action required (operator):**
1. **Release content.** Still the highest-leverage single action: 37 READY TO POST entries exist and 0 are live. Releasing even 3–5 through Blotato (queue-only — the operator releases, per `security.md` §3.1) gives the next run something real to measure.
2. **Wire a metrics route.** Either set `APIFY_TOKEN` (unlocks paid fallback for IG/YT/X/Threads) or add `META_ACCESS_TOKEN` + `IG_BUSINESS_ID` + `FB_PAGE_ID` (free, first-party for IG/FB/Threads) as session env vars — never commit them to the repo.
3. **Check why the daily cron isn't running the skill.** Two consecutive days of logs now show only a `git fetch`, not a scrape — the "15 live" machines claim in deploy docs does not match observed behavior for M06.
4. **Optional:** re-run with `linkedin-update` to paste this week's LinkedIn analytics manually — that path needs no token and works today.

---

## PERFORMANCE 2026-09-15

**Run date:** 2026-09-15 UTC
**Sources scraped:** Instagram (FAILED — no route open), Facebook (FAILED — no route open), YouTube (FAILED — yt-dlp not installed), LinkedIn (manual paste required — not provided this run), Twitter/X (manual paste required — not provided this run), Threads (FAILED — no route open), TikTok (NOT CONNECTED), Blotato (FAILED — MCP not connected)
**Data path:** ALL automated paths blocked. This is the first run in 53 days (last append was 2026-07-24) — the gap is not a fresh daily streak, it is a dead measurement layer that was never restarted.
- `META_ACCESS_TOKEN` / `IG_BUSINESS_ID` / `FB_PAGE_ID` not in env → Meta Graph API skipped for Instagram, Facebook, Threads.
- `APIFY_TOKEN` not in env, and no Apify MCP tools resolve in this session → paid fallback unavailable for every platform that needs it. Per skill design this is a normal (not degraded) state — but it means IG/FB/YT/X/Threads have zero automated route right now.
- `yt-dlp` not installed on this host → YouTube's free, keyless path is unavailable.
- Blotato MCP tools do not resolve in this session → no queue cross-reference possible (step 2 skipped).
- No `linkedin-update` or `competitors` argument was passed this run, so LinkedIn/Twitter manual-paste prompts were not solicited interactively.
- TikTok: still not connected to Blotato (pre-existing inventory.md gap).

> **Structural finding, not a scraper bug:** `content-vault.md` has 74 entries — 37 READY TO POST, 29 DRAFT, 6 STALE, 2 KILLED — and **zero POSTED**. Even with every scraper wired, there is nothing live yet to match metrics against. Release, not measurement, is the bottleneck (confirmed independently by this session's startup reality check).
>
> **Separate finding:** `deploy/logs/performance-tracker-*.log` shows a cron firing daily through 2026-09-15, but each log is only a `git fetch` — the skill's actual scrape logic has not been executing on schedule despite being "15 live" per the deploy docs. Documented automation is not the same as running automation.

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (no data — last baseline: 636 on 04/07/2026 per inventory.md) | (no data — 73 days since baseline) | (no data) | No `META_ACCESS_TOKEN`; no Apify route |
| Facebook | AI Automation Queen | (no data) | — | — | No Meta token; no Apify route |
| YouTube | @AI-Automation-Queen | (no data) | — | — | `yt-dlp` not installed; no Apify route |
| LinkedIn | Fatiha Chikh | (no data — manual paste not provided) | — | — | Re-run with `linkedin-update` to paste weekly stats |
| Twitter/X | @aiautomatik | (no data — manual paste not provided) | — | — | No automated route by design; needs manual paste |
| Threads | @thefatihachikh | (no data) | — | — | No `META_ACCESS_TOKEN` scoped route |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **(no data returned this run)** — no scraper produced results, and vault has 0 POSTED entries to cross-reference regardless. Nothing to rank.

### Blotato queue status

> **(scrape failed — Blotato MCP not connected this session)**. Last known state carried from 2026-06-27: 14 published, 0 scheduled, 5 failed. Current queue health unknown.

### Week-over-week summary

- Instagram followers: 636 (last confirmed 04/07/2026 — delta unknown, 73 days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: (no data)
- Top-performing piece: none post-rebrand — carried reference only, see Lessons below
- Weakest signal: the measurement layer itself, and the release step upstream of it
- **Structural gap (unchanged and now confirmed by the session's own startup check):** 37 entries sit READY TO POST with 0 POSTED. M06 cannot measure what has not been released.

### Lessons — repeatable patterns

> Insufficient data this run — 0 posts scraped, 0 POSTED vault entries to match. No ranking attempted (skill rule: fewer than 6 posts this run means skip ranking rather than force a conclusion).

**Carried forward from 2026-06-27 (now 80 days stale — treat as historical, pre-rebrand reference only, not an actionable finding):**
Personal narrative + face/voice/actual story format ran ~4–8x the engagement rate of generic AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts). This predates the current brand/positioning and has never been validated against it — do not treat as current guidance.

**Action required (operator):**
1. **Release content.** This is the highest-leverage single action: 37 READY TO POST entries exist and 0 are live. Releasing even 3–5 through Blotato gives the next run something real to measure.
2. **Wire a metrics route.** Either set `APIFY_TOKEN` (unlocks paid fallback for IG/YT/X/Threads) or add `META_ACCESS_TOKEN` + `IG_BUSINESS_ID` + `FB_PAGE_ID` (free, first-party for IG/FB/Threads) as session env vars — never commit them to the repo.
3. **Check why the daily cron isn't running the skill.** Logs exist for today but contain only a `git fetch`, not a scrape — the "15 live" machines claim in deploy docs does not match observed behavior for M06.
4. **Optional:** re-run with `linkedin-update` to paste this week's LinkedIn analytics manually — that path needs no token and works today.

---

## PERFORMANCE 2026-07-24

**Run date:** 2026-07-24 UTC
**Sources scraped:** Instagram (FAILED), Facebook (FAILED), YouTube (FAILED), LinkedIn (FAILED), Twitter/X (FAILED), Threads (FAILED), TikTok (NOT CONNECTED), Blotato (FAILED)
**Data path:** ALL paths blocked — sixteenth consecutive failed run.
- `META_ACCESS_TOKEN` not in env → Meta Graph API skipped for Instagram and Facebook.
- Apify MCP server not connected in this session (ToolSearch returned no Apify tools).
- `APIFY_TOKEN` not in env → Apify REST API fallback also unavailable.
- Blotato MCP not connected → no published/scheduled post data retrievable.
- TikTok: account not connected to Blotato (inventory.md gap, pre-existing).

> **ESCALATED DATA GAP ALERT — CRITICAL (SIXTEENTH CONSECUTIVE FAILURE):** Runs
> 2026-07-09 through 2026-07-24 have all produced zero scraped metrics.
> The M06 validation criterion "No data gaps >2 consecutive days" has been
> continuously breached for 15 days. Last reliable profile data: 2026-06-27 —
> **27 days ago**. Root cause is unchanged; it cannot self-resolve without
> operator action on session wiring or credential injection.
> **Operator action required — see action items at the end of this entry.**

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (scrape failed — last baseline: 636 on 04/07/2026 per inventory.md) | (no data — 27 days elapsed) | (no data) | Apify MCP not connected; no `META_ACCESS_TOKEN` |
| Facebook | AI Automation Queen | (scrape failed) | — | — | No Meta token; Apify MCP not connected |
| YouTube | @AI-Automation-Queen | (scrape failed) | — | — | Apify MCP not connected |
| LinkedIn | Fatiha Chikh | (scrape failed) | — | — | Apify MCP not connected; pass `linkedin-update` arg for manual stats |
| Twitter/X | @aiautomatik | (scrape failed) | — | — | Apify MCP not connected |
| Threads | @thefatihachikh | (scrape failed) | — | — | Apify MCP not connected |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok account to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **No data returned this run.** All Apify scrapers unavailable (MCP not connected,
> no REST API token). Blotato MCP not connected — cannot cross-reference published posts.
> Vault POSTED entries: 0 present in content-vault.md (68 entries total, none yet POSTED);
> no vault-to-post cross-reference possible this run.

### Blotato queue status

> **Blotato MCP not connected this session** — cannot query published/scheduled/failed posts.
> Last known state (2026-06-27): 14 published, 0 scheduled, 5 failed (4 were test posts / stale errors).
> Current queue health unknown across all runs since 2026-07-09.

### Week-over-week summary

- Instagram followers: 636 (last confirmed 04/07/2026 per inventory.md — delta unknown, 20+ days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no data across sixteen consecutive runs
- Top-performing piece (carried from 2026-06-27, pre-rebrand): IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate
- Weakest signal: the measurement layer itself — dark for 27 days
- **Structural gap (unchanged):** vault has 68 entries (0 POSTED, many READY TO POST). M06 cannot measure what has not been released. The feedback loop is fully blocked.

### Lessons — repeatable patterns

> **Insufficient new data — sixteenth consecutive scraper failure.** Carrying forward
> 2026-06-27 findings (pre-rebrand, 27 days stale, directional only):

**Carried forward from 2026-06-27 (27 days stale — treat as directional only):**
Personal narrative + face/voice/actual story ran ~4–8x the engagement rate of generic
AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts).
Unvalidated against new positioning — remains provisional until rebuilt-brand content
(ENTRY 001+) goes live and gets scraped.

**Systemic finding (sixteenth consecutive run):** The measurement layer has been dark for
27 consecutive days. Vault now has 68 entries; 0 are POSTED. M06 cannot read any metrics.
The feedback loop is completely broken. The content engine is producing but the pipeline
has never been released — so there is no post-rebrand data to measure.

**Action required (operator — fifteen days unresolved):**
1. **Fix the session wiring.** Connect Apify MCP + Blotato MCP in Claude Code settings
   — OR set `APIFY_TOKEN` as a session env var to enable the Apify REST API fallback.
   Either option unblocks Instagram, YouTube, Twitter/X, and Threads immediately at
   ~$0.01–0.05/run. See `inventory.md §7` for the wiring checklist.
2. **Release content.** The READY TO POST backlog has grown to 68 entries. Releasing
   even 3–5 posts via Blotato gives M06 post-rebrand content to measure on the next
   successful run. Without released content there is nothing to measure even if the
   scrapers are fixed.
3. **For Meta (IG/FB) richer data:** generate a Meta access token and set `META_ACCESS_TOKEN`,
   `IG_BUSINESS_ID`, and `FB_PAGE_ID` in the session environment (never commit to the repo).

---

## PERFORMANCE 2026-07-23

**Run date:** 2026-07-23 UTC
**Sources scraped:** Instagram (FAILED), Facebook (FAILED), YouTube (FAILED), LinkedIn (FAILED), Twitter/X (FAILED), Threads (FAILED), TikTok (NOT CONNECTED), Blotato (FAILED)
**Data path:** ALL paths blocked — fifteenth consecutive failed run.
- `META_ACCESS_TOKEN` not in env → Meta Graph API skipped for Instagram and Facebook.
- Apify MCP server not connected in this session (ToolSearch returned no Apify tools).
- `APIFY_TOKEN` not in env → Apify REST API fallback also unavailable.
- Blotato MCP not connected → no published/scheduled post data retrievable.
- TikTok: account not connected to Blotato (inventory.md gap, pre-existing).

> **ESCALATED DATA GAP ALERT — CRITICAL (FIFTEENTH CONSECUTIVE FAILURE):** Runs
> 2026-07-09 through 2026-07-23 have all produced zero scraped metrics.
> The M06 validation criterion "No data gaps >2 consecutive days" has been
> continuously breached for 14 days. Last reliable profile data: 2026-06-27 —
> **26 days ago**. Root cause is unchanged; it cannot self-resolve without
> operator action on session wiring or credential injection.
> **Operator action required — see action items at the end of this entry.**

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (scrape failed — last baseline: 636 on 04/07/2026 per inventory.md) | (no data — 26 days elapsed) | (no data) | Apify MCP not connected; no `META_ACCESS_TOKEN` |
| Facebook | AI Automation Queen | (scrape failed) | — | — | No Meta token; Apify MCP not connected |
| YouTube | @AI-Automation-Queen | (scrape failed) | — | — | Apify MCP not connected |
| LinkedIn | Fatiha Chikh | (scrape failed) | — | — | Apify MCP not connected; pass `linkedin-update` arg for manual stats |
| Twitter/X | @aiautomatik | (scrape failed) | — | — | Apify MCP not connected |
| Threads | @thefatihachikh | (scrape failed) | — | — | Apify MCP not connected |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok account to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **No data returned this run.** All Apify scrapers unavailable (MCP not connected,
> no REST API token). Blotato MCP not connected — cannot cross-reference published posts.
> Vault POSTED entries: 4 present in content-vault.md; no scraped data to match against.

### Blotato queue status

> **Blotato MCP not connected this session** — cannot query published/scheduled/failed posts.
> Last known state (2026-06-27): 14 published, 0 scheduled, 5 failed (4 were test posts / stale errors).
> Current queue health unknown across all runs since 2026-07-09.

### Week-over-week summary

- Instagram followers: 636 (last confirmed 04/07/2026 per inventory.md — delta unknown, 19+ days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no data across fifteen consecutive runs
- Top-performing piece (carried from 2026-06-27, pre-rebrand): IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate
- Weakest signal: the measurement layer itself — dark for 26 days
- **Structural gap (unchanged):** vault now has 4 POSTED entries; M06 still cannot retrieve their live metrics.

### Lessons — repeatable patterns

> **Insufficient new data — fifteenth consecutive scraper failure.** Carrying forward
> 2026-06-27 findings (pre-rebrand, 26 days stale, directional only):

**Carried forward from 2026-06-27 (26 days stale — treat as directional only):**
Personal narrative + face/voice/actual story ran ~4–8x the engagement rate of generic
AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts).
Unvalidated against new positioning — remains provisional until rebuilt-brand content
(ENTRY 001+) goes live and gets scraped.

**Systemic finding (fifteenth consecutive run):** The measurement layer has been dark for
26 consecutive days. M01 and content-engine continue producing vault entries; the POSTED
backlog has 4 entries. M06 cannot read any metrics. The feedback loop is completely broken.

**Action required (operator — fourteen days unresolved):**
1. **Fix the session wiring.** Connect Apify MCP + Blotato MCP in Claude Code settings
   — OR set `APIFY_TOKEN` as a session env var to enable the Apify REST API fallback.
   Either option unblocks Instagram, YouTube, Twitter/X, and Threads immediately at
   ~$0.01–0.05/run. See `inventory.md §7` for the wiring checklist.
2. **Release content.** The READY TO POST backlog is growing; releasing 3–5 posts via
   Blotato gives M06 post-rebrand content to measure on the next successful run.
3. **For Meta (IG/FB) richer data:** generate a Meta access token and set `META_ACCESS_TOKEN`,
   `IG_BUSINESS_ID`, and `FB_PAGE_ID` in the session environment (never commit to the repo).

---

## PERFORMANCE 2026-07-22

**Run date:** 2026-07-22 UTC
**Sources scraped:** Instagram (FAILED), Facebook (FAILED), YouTube (FAILED), LinkedIn (FAILED), Twitter/X (FAILED), Threads (FAILED), TikTok (NOT CONNECTED), Blotato (FAILED)
**Data path:** ALL paths blocked — fourteenth consecutive failed run.
- `META_ACCESS_TOKEN` not in env → Meta Graph API skipped for Instagram and Facebook.
- Apify MCP server not connected in this session (ToolSearch returned no Apify tools).
- `APIFY_TOKEN` not in env → Apify REST API fallback also unavailable.
- Blotato MCP not connected → no published/scheduled post data retrievable.
- TikTok: account not connected to Blotato (inventory.md gap, pre-existing).

> **ESCALATED DATA GAP ALERT — CRITICAL (FOURTEENTH CONSECUTIVE FAILURE):** Runs
> 2026-07-09 through 2026-07-22 have all produced zero scraped metrics.
> The M06 validation criterion "No data gaps >2 consecutive days" has been
> continuously breached for 13 days. Last reliable profile data: 2026-06-27 —
> **25 days ago**. Root cause is unchanged and cannot self-resolve.
> **Operator action required — see action items at the end of this entry.**

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (scrape failed — last baseline: 636 on 04/07/2026 per inventory.md) | (no data — 25 days elapsed) | (no data) | Apify MCP not connected; no `META_ACCESS_TOKEN` |
| Facebook | AI Automation Queen | (scrape failed) | — | — | No Meta token; Apify MCP not connected |
| YouTube | @AI-Automation-Queen | (scrape failed) | — | — | Apify MCP not connected |
| LinkedIn | Fatiha Chikh | (scrape failed) | — | — | Apify MCP not connected; pass `linkedin-update` arg for manual stats |
| Twitter/X | @aiautomatik | (scrape failed) | — | — | Apify MCP not connected |
| Threads | @thefatihachikh | (scrape failed) | — | — | Apify MCP not connected |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok account to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **No data returned this run.** All Apify scrapers unavailable (MCP not connected,
> no REST API token). Blotato MCP not connected — cannot cross-reference published posts.
> Vault status: 0 entries with status `POSTED`. No vault-to-post cross-reference possible this run.

### Blotato queue status

> **Blotato MCP not connected this session** — cannot query published/scheduled/failed posts.
> Last known state (2026-06-27): 14 published, 0 scheduled, 5 failed (4 were test posts / stale errors).
> Current queue health unknown across all runs since 2026-07-09.

### Week-over-week summary

- Instagram followers: 636 (last confirmed 04/07/2026 per inventory.md — delta unknown, 18+ days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no data across fourteen consecutive runs
- Top-performing piece (carried from 2026-06-27, pre-rebrand): IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate
- Weakest signal: the measurement layer itself — dark for 25 days
- **Structural gap (unchanged):** vault entries written, 0 POSTED. M06 cannot measure what has not been released.

### Lessons — repeatable patterns

> **Insufficient new data — fourteenth consecutive scraper failure.** Carrying forward
> 2026-06-27 findings (pre-rebrand, 25 days stale, directional only):

**Carried forward from 2026-06-27 (25 days stale — treat as directional only):**
Personal narrative + face/voice/actual story ran ~4–8x the engagement rate of generic
AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts).
Unvalidated against new positioning — remains provisional until rebuilt-brand content
(ENTRY 001+) goes live and gets scraped.

**Systemic finding (fourteenth consecutive run):** The measurement layer has been dark for
25 consecutive days. M01 and content-engine continue producing vault entries
(READY TO POST backlog growing). M06 cannot read any of it. The feedback loop is completely broken.

**Action required (operator — thirteen days unresolved):**
1. **Fix the session wiring.** Connect Apify MCP + Blotato MCP in Claude Code settings
   — OR set `APIFY_TOKEN` as a session env var to enable the Apify REST API fallback.
   Either option unblocks Instagram, YouTube, Twitter/X, and Threads immediately at
   ~$0.01–0.05/run. See `inventory.md §7` for the wiring checklist.
2. **Release content.** The READY TO POST backlog is long; releasing 3–5 posts via
   Blotato gives M06 post-rebrand content to measure on the next successful run.
3. **LinkedIn manual entry.** On the next M06 run, pass `linkedin-update` as the
   argument to inject LinkedIn follower count and impression data manually.

---

## PERFORMANCE 2026-07-21

**Run date:** 2026-07-21 UTC
**Sources scraped:** Instagram (FAILED), Facebook (FAILED), YouTube (FAILED), LinkedIn (FAILED), Twitter/X (FAILED), Threads (FAILED), TikTok (NOT CONNECTED), Blotato (FAILED)
**Data path:** ALL paths blocked — thirteenth consecutive failed run.
- `META_ACCESS_TOKEN` not in env → Meta Graph API skipped for Instagram and Facebook.
- Apify MCP server not connected in this session (ToolSearch returned no Apify tools).
- `APIFY_TOKEN` not in env → Apify REST API fallback also unavailable.
- Blotato MCP not connected → no published/scheduled post data retrievable.
- TikTok: account not connected to Blotato (inventory.md gap, pre-existing).

> **ESCALATED DATA GAP ALERT — CRITICAL (THIRTEENTH CONSECUTIVE FAILURE):** Runs
> 2026-07-09 through 2026-07-21 have all produced zero scraped metrics.
> The M06 validation criterion "No data gaps >2 consecutive days" has been
> continuously breached for 12 days. Last reliable profile data: 2026-06-27 —
> **24 days ago**. Root cause is unchanged and cannot self-resolve.
> **Operator action required — see action items at the end of this entry.**

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (scrape failed — last baseline: 636 on 04/07/2026 per inventory.md) | (no data — 24 days elapsed) | (no data) | Apify MCP not connected; no `META_ACCESS_TOKEN` |
| Facebook | AI Automation Queen | (scrape failed) | — | — | No Meta token; Apify MCP not connected |
| YouTube | @AI-Automation-Queen | (scrape failed) | — | — | Apify MCP not connected |
| LinkedIn | Fatiha Chikh | (scrape failed) | — | — | Apify MCP not connected; pass `linkedin-update` arg for manual stats |
| Twitter/X | @aiautomatik | (scrape failed) | — | — | Apify MCP not connected |
| Threads | @thefatihachikh | (scrape failed) | — | — | Apify MCP not connected |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok account to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **No data returned this run.** All Apify scrapers unavailable (MCP not connected,
> no REST API token). Blotato MCP not connected — cannot cross-reference published posts.
> Vault status: 0 entries with status `POSTED` (4 occurrences of "POSTED" in vault are
> status descriptions or references, not live published entries). No vault-to-post
> cross-reference possible this run.

### Blotato queue status

> **Blotato MCP not connected this session** — cannot query published/scheduled/failed posts.
> Last known state (2026-06-27): 14 published, 0 scheduled, 5 failed (4 were test posts / stale errors).
> Current queue health unknown across all runs since 2026-07-09.

### Week-over-week summary

- Instagram followers: 636 (last confirmed 04/07/2026 per inventory.md — delta unknown, 17+ days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no data across thirteen consecutive runs
- Top-performing piece (carried from 2026-06-27, pre-rebrand): IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate
- Weakest signal: the measurement layer itself — dark for 24 days
- **Structural gap (unchanged):** vault entries written, 0 POSTED. M06 cannot measure what has not been released.

### Lessons — repeatable patterns

> **Insufficient new data — thirteenth consecutive scraper failure.** Carrying forward
> 2026-06-27 findings (pre-rebrand, 24 days stale, directional only):

**Carried forward from 2026-06-27 (24 days stale — treat as directional only):**
Personal narrative + face/voice/actual story ran ~4–8x the engagement rate of generic
AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts).
Unvalidated against new positioning — remains provisional until rebuilt-brand content
(ENTRY 001+) goes live and gets scraped.

**Systemic finding (thirteenth consecutive run):** The measurement layer has been dark for
24 consecutive days. M01 and content-engine continue producing vault entries
(READY TO POST backlog growing). M06 cannot read any of it. The feedback loop is completely broken.

**Action required (operator — twelve days unresolved):**
1. **Fix the session wiring.** Connect Apify MCP + Blotato MCP in Claude Code settings
   — OR set `APIFY_TOKEN` as a session env var to enable the Apify REST API fallback.
   Either option unblocks Instagram, YouTube, Twitter/X, and Threads immediately at
   ~$0.01–0.05/run. See `inventory.md §7` for the wiring checklist.
2. **Release content.** The READY TO POST backlog is long; releasing 3–5 posts via
   Blotato gives M06 post-rebrand content to measure on the next successful run.
3. **LinkedIn manual entry.** On the next M06 run, pass `linkedin-update` as the
   argument to inject LinkedIn follower count and impression data manually.

---

## PERFORMANCE 2026-07-20

**Run date:** 2026-07-20 03:01 UTC
**Sources scraped:** Instagram (FAILED), Facebook (FAILED), YouTube (FAILED), LinkedIn (FAILED), Twitter/X (FAILED), Threads (FAILED), TikTok (NOT CONNECTED), Blotato (FAILED)
**Data path:** ALL paths blocked — twelfth consecutive failed run.
- `META_ACCESS_TOKEN` not in env → Meta Graph API skipped for Instagram and Facebook.
- Apify MCP server not connected in this session (ToolSearch returned no Apify tools).
- `APIFY_TOKEN` not in env → Apify REST API fallback also unavailable.
- Blotato MCP not connected → no published/scheduled post data retrievable.
- TikTok: account not connected to Blotato (inventory.md gap, pre-existing).

> **ESCALATED DATA GAP ALERT — CRITICAL (TWELFTH CONSECUTIVE FAILURE):** Runs
> 2026-07-09 through 2026-07-20 have all produced zero scraped metrics.
> The M06 validation criterion "No data gaps >2 consecutive days" has been
> continuously breached for 11 days. Last reliable profile data: 2026-06-27 —
> **23 days ago**. Root cause is unchanged and cannot self-resolve.
> **Operator action required — see action items at the end of this entry.**

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (scrape failed — last baseline: 636 on 04/07/2026 per inventory.md) | (no data — 23 days elapsed) | (no data) | Apify MCP not connected; no `META_ACCESS_TOKEN` |
| Facebook | AI Automation Queen | (scrape failed) | — | — | No Meta token; Apify MCP not connected |
| YouTube | @AI-Automation-Queen | (scrape failed) | — | — | Apify MCP not connected |
| LinkedIn | Fatiha Chikh | (scrape failed) | — | — | Apify MCP not connected; pass `linkedin-update` arg for manual stats |
| Twitter/X | @aiautomatik | (scrape failed) | — | — | Apify MCP not connected |
| Threads | @thefatihachikh | (scrape failed) | — | — | Apify MCP not connected |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok account to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **No data returned this run.** All Apify scrapers unavailable (MCP not connected,
> no REST API token). Blotato MCP not connected — cannot cross-reference published posts.
> Vault status: entries present, 0 with status `POSTED`. No vault-to-post
> cross-reference possible this run.

### Blotato queue status

> **Blotato MCP not connected this session** — cannot query published/scheduled/failed posts.
> Last known state (2026-06-27): 14 published, 0 scheduled, 5 failed (4 were test posts / stale errors).
> Current queue health unknown across all runs since 2026-07-09.

### Week-over-week summary

- Instagram followers: 636 (last confirmed 04/07/2026 per inventory.md — delta unknown, 16+ days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no data across twelve consecutive runs
- Top-performing piece (carried from 2026-06-27, pre-rebrand): IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate
- Weakest signal: the measurement layer itself — dark for 23 days
- **Structural gap (unchanged):** vault entries written, 0 POSTED. M06 cannot measure what has not been released.

### Lessons — repeatable patterns

> **Insufficient new data — twelfth consecutive scraper failure.** Carrying forward
> 2026-06-27 findings (pre-rebrand, 23 days stale, directional only):

**Carried forward from 2026-06-27 (23 days stale — treat as directional only):**
Personal narrative + face/voice/actual story ran ~4–8x the engagement rate of generic
AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts).
Unvalidated against new positioning — remains provisional until rebuilt-brand content
(ENTRY 001+) goes live and gets scraped.

**Systemic finding (twelfth consecutive run):** The measurement layer has been dark for
23 consecutive days. M01 and content-engine continue producing vault entries
(READY TO POST backlog). M06 cannot read any of it. The feedback loop is completely broken.

**Action required (operator — eleven days unresolved):**
1. **Fix the session wiring.** Connect Apify MCP + Blotato MCP in Claude Code settings
   — OR set `APIFY_TOKEN` as a session env var to enable the Apify REST API fallback.
   Either option unblocks Instagram, YouTube, Twitter/X, and Threads immediately at
   ~$0.01–0.05/run. See `inventory.md §7` for the wiring checklist.
2. **Release content.** The READY TO POST backlog is long; releasing 3–5 posts via
   Blotato gives M06 post-rebrand content to measure on the next successful run.
3. **LinkedIn manual entry.** On the next M06 run, pass `linkedin-update` as the
   argument to inject LinkedIn follower count and impression data manually.

---

## PERFORMANCE 2026-07-19

**Run date:** 2026-07-19 UTC
**Sources scraped:** Instagram (FAILED), Facebook (FAILED), YouTube (FAILED), LinkedIn (FAILED), Twitter/X (FAILED), Threads (FAILED), TikTok (NOT CONNECTED), Blotato (FAILED)
**Data path:** ALL paths blocked — eleventh consecutive failed run.
- `META_ACCESS_TOKEN` not in env → Meta Graph API skipped for Instagram and Facebook.
- Apify MCP server not connected in this session (ToolSearch returned no Apify tools).
- `APIFY_TOKEN` not in env → Apify REST API fallback also unavailable.
- Blotato MCP not connected → no published/scheduled post data retrievable.
- TikTok: account not connected to Blotato (inventory.md gap, pre-existing).

> **ESCALATED DATA GAP ALERT — CRITICAL (ELEVENTH CONSECUTIVE FAILURE):** Runs
> 2026-07-09, 2026-07-11 through 2026-07-19 have all produced zero scraped metrics.
> The M06 validation criterion "No data gaps >2 consecutive days" has been
> continuously breached for 10 days. Last reliable profile data: 2026-06-27 —
> **22 days ago**. Root cause is unchanged and cannot self-resolve.
> **Operator action required — see action items at the end of this entry.**

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (scrape failed — last baseline: 636 on 04/07/2026 per inventory.md) | (no data — 22 days elapsed) | (no data) | Apify MCP not connected; no `META_ACCESS_TOKEN` |
| Facebook | AI Automation Queen | (scrape failed) | — | — | No Meta token; Apify MCP not connected |
| YouTube | @AI-Automation-Queen | (scrape failed) | — | — | Apify MCP not connected |
| LinkedIn | Fatiha Chikh | (scrape failed) | — | — | Apify MCP not connected; pass `linkedin-update` arg for manual stats |
| Twitter/X | @aiautomatik | (scrape failed) | — | — | Apify MCP not connected |
| Threads | @thefatihachikh | (scrape failed) | — | — | Apify MCP not connected |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok account to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **No data returned this run.** All Apify scrapers unavailable (MCP not connected,
> no REST API token). Blotato MCP not connected — cannot cross-reference published posts.
> Vault status: entries present, 0 with status `POSTED`. No vault-to-post
> cross-reference possible this run.

### Blotato queue status

> **Blotato MCP not connected this session** — cannot query published/scheduled/failed posts.
> Last known state (2026-06-27): 14 published, 0 scheduled, 5 failed (4 were test posts / stale errors).
> Current queue health unknown across all runs since 2026-07-09.

### Week-over-week summary

- Instagram followers: 636 (last confirmed 04/07/2026 per inventory.md — delta unknown, 15+ days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no data across eleven consecutive runs
- Top-performing piece (carried from 2026-06-27, pre-rebrand): IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate
- Weakest signal: the measurement layer itself — dark for 22 days
- **Structural gap (unchanged):** vault entries written, 0 POSTED. M06 cannot measure what has not been released.

### Lessons — repeatable patterns

> **Insufficient new data — eleventh consecutive scraper failure.** Carrying forward
> 2026-06-27 findings (pre-rebrand, 22 days stale, directional only):

**Carried forward from 2026-06-27 (22 days stale — treat as directional only):**
Personal narrative + face/voice/actual story ran ~4–8x the engagement rate of generic
AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts).
Unvalidated against new positioning — remains provisional until rebuilt-brand content
(ENTRY 001+) goes live and gets scraped.

**Systemic finding (eleventh consecutive run):** The measurement layer has been dark for
22 consecutive days. M01 and content-engine continue producing vault entries
(READY TO POST backlog). M06 cannot read any of it. The feedback loop is completely broken.

**Action required (operator — ten days unresolved):**
1. **Fix the session wiring.** Connect Apify MCP + Blotato MCP in Claude Code settings
   — OR set `APIFY_TOKEN` as a session env var to enable the Apify REST API fallback.
   Either option unblocks Instagram, YouTube, Twitter/X, and Threads immediately at
   ~$0.01–0.05/run. See `inventory.md §7` for the wiring checklist.
2. **Release content.** The READY TO POST backlog is long; releasing 3–5 posts via
   Blotato gives M06 post-rebrand content to measure on the next successful run.
   Without released posts, even a working M06 has nothing to score.
3. **LinkedIn manual entry.** On the next M06 run, pass `linkedin-update` as the
   argument to inject LinkedIn follower count and impression data manually.

---

## PERFORMANCE 2026-07-18

**Run date:** 2026-07-18 ~UTC
**Sources scraped:** Instagram (FAILED), Facebook (FAILED), YouTube (FAILED), LinkedIn (FAILED), Twitter/X (FAILED), Threads (FAILED), TikTok (NOT CONNECTED), Blotato (FAILED)
**Data path:** ALL paths blocked — tenth consecutive failed run.
- `META_ACCESS_TOKEN` not in env → Meta Graph API skipped for Instagram and Facebook.
- Apify MCP server not connected in this session (ToolSearch returned no Apify tools).
- `APIFY_TOKEN` not in env → REST API fallback also unavailable.
- Blotato MCP not connected → no published/scheduled post data retrievable.
- TikTok: account not connected to Blotato (inventory.md gap, pre-existing).

> **ESCALATED DATA GAP ALERT — CRITICAL (TENTH CONSECUTIVE FAILURE):** Runs
> 2026-06-27 (partial), 2026-07-09, 2026-07-11 through 2026-07-18 have all
> failed to produce scraped metrics. The M06 validation criterion "No data gaps
> >2 consecutive days" has been continuously breached for 9 days (since
> 2026-07-09). Last reliable profile data: 2026-06-27 — **21 days ago**.
> Root cause is unchanged and cannot self-resolve. **Operator action required.**

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (scrape failed — last baseline: 636 on 04/07/2026 per inventory.md) | (no data — 21 days elapsed) | (no data) | Apify MCP not connected; no `META_ACCESS_TOKEN` |
| Facebook | AI Automation Queen | (scrape failed) | — | — | No Meta token; Apify MCP not connected |
| YouTube | @AI-Automation-Queen | (scrape failed) | — | — | Apify MCP not connected |
| LinkedIn | Fatiha Chikh | (scrape failed) | — | — | Apify MCP not connected; pass `linkedin-update` arg for manual stats |
| Twitter/X | @aiautomatik | (scrape failed) | — | — | Apify MCP not connected |
| Threads | @thefatihachikh | (scrape failed) | — | — | Apify MCP not connected |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok account to Blotato first |

### Top posts by engagement (last 12 posts per platform)

> **No data returned this run.** All Apify scrapers unavailable (MCP not connected,
> no REST API token). Blotato MCP not connected — cannot cross-reference published posts.
> Vault status: entries present, 0 with status `POSTED`. No vault-to-post
> cross-reference possible.

### Blotato queue status

> **Blotato MCP not connected this session** — cannot query published/scheduled/failed posts.
> Last known state (2026-06-27): 14 published, 0 scheduled, 5 failed.
> Current queue health unknown for all runs since 2026-07-09.

### Week-over-week summary

- Instagram followers: 636 (last confirmed 04/07/2026 per inventory.md — delta unknown, 14+ days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no data across ten consecutive runs
- Top-performing piece (carried from 2026-06-27, pre-rebrand): IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate
- Weakest platform: the measurement layer itself — dark for 21 days
- **Structural gap (unchanged):** vault entries written, 0 POSTED. M06 cannot measure what has not been released.

### Lessons — repeatable patterns

> **Insufficient new data — tenth consecutive scraper failure.** Carrying forward
> 2026-06-27 findings (pre-rebrand, 21 days stale, directional only):

**Carried forward from 2026-06-27 (21 days stale — treat as directional):**
Personal narrative + face/voice/actual story ran ~4–8x the engagement rate of generic
AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts).
Unvalidated against the new positioning — remains provisional until post-rebrand
content (ENTRY 001+) goes live and gets scraped.

**Systemic finding (tenth consecutive run):** The measurement layer has been dark for
21 consecutive days. M01 continues producing vault entries and distribution runs are
committed in git. M06 cannot read any of it. The feedback loop is completely broken.

**Action required (operator — ten days unresolved):**
1. **Highest priority:** Connect Apify MCP + Blotato MCP in the session environment — OR
   set `APIFY_TOKEN` as an env var so the Apify REST API fallback can run. Either unblocks
   Instagram, YouTube, Twitter/X, and Threads profile data immediately.
2. **Also required:** Release at least 3–5 READY TO POST vault entries via Blotato so
   M06 has post-rebrand content to measure on the next run.
3. **Optional but valuable:** On next M06 run, pass `linkedin-update` argument to
   manually inject LinkedIn analytics.
4. If MCP wiring is not yet possible, setting `APIFY_TOKEN` alone enables the REST API
   fallback for four platforms at low cost (~$0.01–0.05/run).

---

## PERFORMANCE 2026-07-17

**Run date:** 2026-07-17 ~UTC
**Sources scraped:** Instagram (FAILED), Facebook (FAILED), YouTube (FAILED), LinkedIn (FAILED), Twitter/X (FAILED), Threads (FAILED), TikTok (NOT CONNECTED), Blotato (FAILED)
**Data path:** ALL paths blocked — ninth consecutive failed run.
- `META_ACCESS_TOKEN` not in env → Meta Graph API skipped for Instagram and Facebook.
- Apify MCP server not connected in this session (ToolSearch returned no Apify tools).
- `APIFY_TOKEN` not in env → REST API fallback also unavailable.
- Blotato MCP not connected → no published/scheduled post data retrievable.
- TikTok: account not connected to Blotato (inventory.md gap, pre-existing).

> **ESCALATED DATA GAP ALERT — CRITICAL (NINTH CONSECUTIVE FAILURE):** Runs
> 2026-06-27 (partial), 2026-07-09, 2026-07-11, 2026-07-12, 2026-07-13,
> 2026-07-14, 2026-07-15, 2026-07-16, and now 2026-07-17 have all failed to
> produce scraped metrics. The M06 validation criterion "No data gaps >2
> consecutive days" has been continuously breached for 8 days (since 2026-07-09).
> Last reliable profile data: 2026-06-27 — **20 days ago**. Root cause is
> unchanged and cannot self-resolve. **Operator action required — see action
> items below.**

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (scrape failed — last baseline: 632 on 2026-06-27) | (no data — 20 days elapsed) | (no data) | Apify MCP not connected; no `META_ACCESS_TOKEN` |
| Facebook | AI Automation Queen | (scrape failed) | — | — | No Meta token; Apify MCP not connected |
| YouTube | @AI-Automation-Queen | (scrape failed) | — | — | Apify MCP not connected |
| LinkedIn | Fatiha Chikh | (scrape failed) | — | — | Apify MCP not connected; use `linkedin-update` arg for manual stats |
| Twitter/X | @aiautomatik | (scrape failed) | — | — | Apify MCP not connected |
| Threads | @thefatihachikh | (scrape failed) | — | — | Apify MCP not connected |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok account to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **No data returned this run.** All Apify scrapers unavailable (MCP not connected,
> no REST API token). Blotato MCP not connected — cannot cross-reference published posts.
> Vault status: 55 live entries, 0 with status `POSTED`. No vault-to-post
> cross-reference possible.

### Blotato queue status

> **Blotato MCP not connected this session** — cannot query published/scheduled/failed posts.
> Last known state (2026-06-27): 14 published, 0 scheduled, 5 failed (4 were test posts / stale errors).
> Current queue health is unknown for all distribution runs since 2026-07-09.

### Week-over-week summary

- Instagram followers: 632 (last scraped 2026-06-27 — delta unknown, 20 days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no data across nine consecutive runs
- Top-performing piece (carried from 2026-06-27, pre-rebrand): IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate
- Weakest signal: the measurement layer itself — dark for 20 days
- **Structural gap (unchanged):** 55 live vault entries written, 0 POSTED. M06 cannot measure what has not been released.

### Lessons — repeatable patterns

> **Insufficient new data — ninth consecutive scraper failure.** Carrying forward
> 2026-06-27 findings (pre-rebrand, 20 days stale, directional only):

**Carried forward from 2026-06-27 (20 days stale — treat as directional):**
Personal narrative + face/voice/actual story ran ~4–8x the engagement rate of generic
AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts).
Unvalidated against the new positioning — remains provisional until rebuilt-brand
content (ENTRY 001+) goes live and gets scraped.

**Systemic finding (ninth consecutive run):** The measurement layer has been dark for
20 consecutive days. M01 has produced 55 live vault entries (many READY TO POST) across
multiple daily runs. Distribution runs are committed in git. M06 cannot read any of it.
The feedback loop is completely broken — the engine is producing content in the dark.

**Action required (operator — nine days unresolved):**
1. **Highest priority:** Connect Apify MCP + Blotato MCP in the session environment — OR
   set `APIFY_TOKEN` as an env var so the Apify REST API fallback can run. Either unblocks
   Instagram, YouTube, Twitter/X, and Threads profile data immediately.
2. **Also required:** Release at least 3–5 READY TO POST vault entries via Blotato so
   M06 has post-rebrand content to measure on the next run. Without released posts,
   even a working M06 has nothing to score.
3. **Optional but valuable:** On next M06 run, pass `linkedin-update` argument to
   manually inject LinkedIn analytics (follower count + post impressions).
4. If MCP wiring is not yet possible, setting `APIFY_TOKEN` alone enables the REST API
   fallback for four platforms at low cost (~$0.01–0.05/run).

---

## PERFORMANCE 2026-07-16

**Run date:** 2026-07-16 ~UTC
**Sources scraped:** Instagram (FAILED), Facebook (FAILED), YouTube (FAILED), LinkedIn (FAILED), Twitter/X (FAILED), Threads (FAILED), TikTok (NOT CONNECTED), Blotato (FAILED)
**Data path:** ALL paths blocked — eighth consecutive failed run.
- `META_ACCESS_TOKEN` not in env → Meta Graph API skipped for Instagram and Facebook.
- Apify MCP server not connected in this session (ToolSearch returned no Apify tools).
- `APIFY_TOKEN` not in env → REST API fallback also unavailable.
- Blotato MCP not connected → no published/scheduled post data retrievable.
- TikTok: account not connected to Blotato (inventory.md gap, pre-existing).

> **ESCALATED DATA GAP ALERT — CRITICAL (EIGHTH CONSECUTIVE FAILURE):** Runs
> 2026-06-27 (partial), 2026-07-09, 2026-07-11, 2026-07-12, 2026-07-13,
> 2026-07-14, 2026-07-15, and now 2026-07-16 have all failed to produce scraped
> metrics. The M06 validation criterion "No data gaps >2 consecutive days" has been
> continuously breached for 7 days (since 2026-07-09). Last reliable profile
> data: 2026-06-27 — **19 days ago**. The measurement layer has been dark for
> nearly three weeks. Root cause is unchanged and cannot self-resolve.
> **Operator action required — see action items below.**

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (scrape failed — last baseline: 632 on 2026-06-27) | (no data — 19 days elapsed) | (no data) | Apify MCP not connected; no `META_ACCESS_TOKEN` |
| Facebook | AI Automation Queen | (scrape failed) | — | — | No Meta token; Apify MCP not connected |
| YouTube | @AI-Automation-Queen | (scrape failed) | — | — | Apify MCP not connected |
| LinkedIn | Fatiha Chikh | (scrape failed) | — | — | Apify MCP not connected; use `linkedin-update` arg for manual stats |
| Twitter/X | @aiautomatik | (scrape failed) | — | — | Apify MCP not connected |
| Threads | @thefatihachikh | (scrape failed) | — | — | Apify MCP not connected |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok account to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **No data returned this run.** All Apify scrapers unavailable (MCP not connected,
> no REST API token). Blotato MCP not connected — cannot cross-reference published posts.
> Vault status: ENTRY 002–076 exist (55 live entries, ~21 archived/exited since
> 2026-07-14 exit-status feature). 0 entries have status `POSTED`. Today's
> content-engine run added ENTRY 072–076 (5 new drafts from RESEARCH 036). No
> vault-to-post cross-reference possible.

### Blotato queue status

> **Blotato MCP not connected this session** — cannot query published/scheduled/failed posts.
> Last known state (2026-06-27): 14 published, 0 scheduled, 5 failed (4 were test posts / stale errors).
> Current queue health is unknown for all distribution runs since 2026-07-09.

### Week-over-week summary

- Instagram followers: 632 (last scraped 2026-06-27 — delta unknown, 19 days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no data across eight consecutive runs
- Top-performing piece (carried from 2026-06-27, pre-rebrand): IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate
- Weakest signal: the measurement layer itself — dark for 19 days
- **Structural gap (unchanged):** 76 total vault entries written, ~21 exited/archived, 0 POSTED. M06 cannot measure what has not been released.
- **New today:** 5 drafts added (ENTRY 072–076 from RESEARCH 036, dated 16/07/2026) — all LinkedIn how-to format

### Lessons — repeatable patterns

> **Insufficient new data — eighth consecutive scraper failure.** Carrying forward
> 2026-06-27 findings (pre-rebrand, 19 days stale, directional only):

**Carried forward from 2026-06-27 (19 days stale — treat as directional):**
Personal narrative + face/voice/actual story ran ~4–8x the engagement rate of generic
AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts).
Unvalidated against the new positioning — remains provisional until rebuilt-brand
content (ENTRY 001+) goes live and gets scraped.

**Systemic finding (eighth consecutive run):** The measurement layer has been dark for
19 consecutive days. M01 has produced 76 vault entries (many READY TO POST) across
multiple daily runs. Distribution runs are committed in git. M06 cannot read any of it.
The feedback loop is completely broken — the engine is producing content in the dark.

**Action required (operator — unchanged since 2026-07-09, now 7 days unresolved):**
1. **Highest priority:** Connect Apify MCP + Blotato MCP in the session environment — OR
   set `APIFY_TOKEN` as an env var so the Apify REST API fallback can run. Either unblocks
   Instagram, YouTube, Twitter/X, and Threads profile data immediately.
2. **Also required:** Release at least 3–5 READY TO POST vault entries via Blotato so
   M06 has post-rebrand content to measure on the next run. Without released posts,
   even a working M06 has nothing to score.
3. **Optional but valuable:** On next M06 run, pass `linkedin-update` argument to
   manually inject LinkedIn analytics (follower count + post impressions).
4. If MCP wiring is not yet possible, setting `APIFY_TOKEN` alone enables the REST API
   fallback for four platforms at low cost (~$0.01–0.05/run).

---

## PERFORMANCE 2026-07-15

**Run date:** 2026-07-15 ~UTC
**Sources scraped:** Instagram (FAILED), Facebook (FAILED), YouTube (FAILED), LinkedIn (FAILED), Twitter/X (FAILED), Threads (FAILED), TikTok (NOT CONNECTED), Blotato (FAILED)
**Data path:** ALL paths blocked — seventh consecutive failed run.
- `META_ACCESS_TOKEN` not in env → Meta Graph API skipped for Instagram and Facebook.
- Apify MCP server not connected in this session (ToolSearch returned no matching tools).
- `APIFY_TOKEN` not in env → REST API fallback also unavailable.
- Blotato MCP not connected → no published/scheduled post data retrievable.
- TikTok: account not connected to Blotato (inventory.md gap, pre-existing).

> **ESCALATED DATA GAP ALERT — CRITICAL (SEVENTH CONSECUTIVE FAILURE):** Runs
> 2026-06-27 (partial), 2026-07-09, 2026-07-11, 2026-07-12, 2026-07-13,
> 2026-07-14, and now 2026-07-15 have all failed to produce scraped metrics.
> The M06 validation criterion "No data gaps >2 consecutive days" has been
> continuously breached for 6 days (since 2026-07-09). Last reliable profile
> data: 2026-06-27 — **18 days ago**. The measurement layer has been dark for
> over two weeks. Root cause is unchanged and cannot self-resolve.
> **Operator action required — see action items below.**

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (scrape failed — last baseline: 632 on 2026-06-27) | (no data — 18 days elapsed) | (no data) | Apify MCP not connected; no `META_ACCESS_TOKEN` |
| Facebook | AI Automation Queen | (scrape failed) | — | — | No Meta token; Apify MCP not connected |
| YouTube | @AI-Automation-Queen | (scrape failed) | — | — | Apify MCP not connected |
| LinkedIn | Fatiha Chikh | (scrape failed) | — | — | Apify MCP not connected; use `linkedin-update` arg for manual stats |
| Twitter/X | @aiautomatik | (scrape failed) | — | — | Apify MCP not connected |
| Threads | @thefatihachikh | (scrape failed) | — | — | Apify MCP not connected |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok account to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **No data returned this run.** All Apify scrapers unavailable (MCP not connected,
> no REST API token). Blotato MCP not connected — cannot cross-reference published posts.
> Vault status: ENTRY 001–071 exist; 0 entries have status `POSTED` — all content
> remains unreleased. No vault-to-post cross-reference possible.

### Blotato queue status

> **Blotato MCP not connected this session** — cannot query published/scheduled/failed posts.
> Last known state (2026-06-27): 14 published, 0 scheduled, 5 failed (4 were test posts / stale errors).
> Current queue health is unknown for all distribution runs since 2026-07-09.

### Week-over-week summary

- Instagram followers: 632 (last scraped 2026-06-27 — delta unknown, 18 days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no data across seven consecutive runs
- Top-performing piece (carried from 2026-06-27, pre-rebrand): IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate
- Weakest signal: the measurement layer itself — dark for 18 days
- **Critical structural gap:** 71 vault entries (ENTRYs 001–071), 0 POSTED. M06 cannot measure what has not been released.

### Lessons — repeatable patterns

> **Insufficient new data — seventh consecutive scraper failure.** Carrying forward
> 2026-06-27 findings (pre-rebrand, 18 days stale, directional only):

**Carried forward from 2026-06-27 (18 days stale — treat as directional):**
Personal narrative + face/voice/actual story ran ~4–8x the engagement rate of generic
AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts).
Unvalidated against the new positioning — remains provisional until rebuilt-brand
content (ENTRY 001+) goes live and gets scraped.

**Systemic finding (seventh consecutive run):** The measurement layer has been dark
for 18 consecutive days. M01 has produced 71 vault entries across multiple daily
runs. Distribution runs are committed in git. M06 cannot read any of it.
The feedback loop is completely broken — the engine is producing content in the dark.

**Action required (operator — unchanged since 2026-07-09, seven days unresolved):**
1. **Highest priority:** Connect Apify MCP + Blotato MCP in the session environment — OR
   set `APIFY_TOKEN` as an env var so the Apify REST API fallback can run. Either unblocks
   Instagram, YouTube, Twitter/X, and Threads profile data immediately.
2. **Also required:** Release at least 3–5 READY TO POST vault entries via Blotato so
   M06 has post-rebrand content to measure on the next run. Without released posts,
   even a working M06 has nothing to score.
3. **Optional but valuable:** On next M06 run, pass `linkedin-update` argument to
   manually inject LinkedIn analytics (follower count + post impressions).
4. If MCP wiring is not yet possible, setting `APIFY_TOKEN` alone enables the REST API
   fallback for four platforms at low cost (~$0.01–0.05/run).

---

## PERFORMANCE 2026-07-14

**Run date:** 2026-07-14 ~UTC
**Sources scraped:** Instagram (FAILED), Facebook (FAILED), YouTube (FAILED), LinkedIn (FAILED), Twitter/X (FAILED), Threads (FAILED), TikTok (NOT CONNECTED), Blotato (FAILED)
**Data path:** ALL paths blocked — sixth consecutive failed run.
- `META_ACCESS_TOKEN` not in env → Meta Graph API skipped for Instagram and Facebook.
- Apify MCP server not connected in this session (ToolSearch returned no matching tools).
- `APIFY_TOKEN` not in env → REST API fallback also unavailable.
- Blotato MCP not connected → no published/scheduled post data retrievable.
- TikTok: account not connected to Blotato (inventory.md gap, pre-existing).

> **ESCALATED DATA GAP ALERT — CRITICAL (SIXTH CONSECUTIVE FAILURE):** Runs 2026-06-27
> (partial), 2026-07-09, 2026-07-11, 2026-07-12, 2026-07-13, and now 2026-07-14 have all
> failed to produce scraped metrics. The M06 validation criterion "No data gaps >2 consecutive
> days" has been continuously breached since 2026-07-09 (5 days ago). Last reliable profile
> data: 2026-06-27 — **17 days ago**. The measurement layer has been dark for over two
> weeks. **Root cause is unchanged and cannot self-resolve. Operator action required.**

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (scrape failed — last baseline: 632 on 2026-06-27) | (no data — 17 days elapsed) | (no data) | Apify MCP not connected; no `META_ACCESS_TOKEN` |
| Facebook | AI Automation Queen | (scrape failed) | — | — | No Meta token; Apify MCP not connected |
| YouTube | @AI-Automation-Queen | (scrape failed) | — | — | Apify MCP not connected |
| LinkedIn | Fatiha Chikh | (scrape failed) | — | — | Apify MCP not connected; use `linkedin-update` arg for manual stats |
| Twitter/X | @aiautomatik | (scrape failed) | — | — | Apify MCP not connected |
| Threads | @thefatihachikh | (scrape failed) | — | — | Apify MCP not connected |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok account to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **No data returned this run.** All Apify scrapers unavailable (MCP not connected,
> no REST API token). Blotato MCP not connected — cannot cross-reference published posts.
> Vault entries: 0 out of 46 entries (ENTRY 001–046) have status `POSTED` — all content
> remains unreleased. No vault-to-post cross-reference possible.

### Blotato queue status

> **Blotato MCP not connected this session** — cannot query published/scheduled/failed posts.
> Last known state (2026-06-27): 14 published, 0 scheduled, 5 failed (4 were test posts / stale errors).
> Current queue health is unknown for all distribution runs since 2026-07-09.

### Week-over-week summary

- Instagram followers: 632 (last scraped 2026-06-27 — delta unknown, 17 days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no data across six consecutive runs
- Top-performing piece (carried from 2026-06-27, pre-rebrand): IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate
- Weakest signal: the measurement layer itself — dark for 17 days
- **Critical structural gap:** 46 vault entries (20+ READY TO POST), 0 POSTED. M06 cannot measure what has not been released.

### Lessons — repeatable patterns

> **Insufficient new data — sixth consecutive scraper failure.** Carrying forward
> 2026-06-27 findings (pre-rebrand, 17 days stale, directional only):

**Carried forward from 2026-06-27 (17 days stale — treat as directional):**
Personal narrative + face/voice/actual story ran ~4–8x the engagement rate of generic
AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts).
Unvalidated against the new positioning — remains provisional until rebuilt-brand
content (ENTRY 001+) goes live and gets scraped.

**Systemic finding (sixth consecutive run):** The measurement layer has been dark for
17 consecutive days. Content engine (M01) has produced 46 vault entries across multiple
daily runs. Distribution runs are committed in git. But M06 cannot read any of it. The
feedback loop is completely broken — the engine is producing content in the dark.

**Action required (operator — unchanged since 2026-07-09, six days unresolved):**
1. **Highest priority:** Connect Apify MCP + Blotato MCP in the session environment — OR
   set `APIFY_TOKEN` as an env var so the Apify REST API fallback can run. Either unblocks
   Instagram, YouTube, Twitter/X, and Threads profile data immediately.
2. **Also required:** Release at least 3–5 READY TO POST vault entries via Blotato so
   M06 has post-rebrand content to measure on the next run. Without released posts,
   even a working M06 has nothing to score.
3. **Optional but valuable:** On next M06 run, pass `linkedin-update` argument to
   manually inject LinkedIn analytics (follower count + post impressions).
4. If MCP wiring is not yet possible in this environment, setting `APIFY_TOKEN` alone
   enables the REST API fallback for four platforms at low cost (~$0.01–0.05/run).

---

## PERFORMANCE 2026-07-13

**Run date:** 2026-07-13 ~UTC
**Sources scraped:** Instagram (FAILED), Facebook (FAILED), YouTube (FAILED), LinkedIn (FAILED), Twitter/X (FAILED), Threads (FAILED), TikTok (NOT CONNECTED), Blotato (FAILED)
**Data path:** ALL paths blocked — fifth consecutive failed run.
- `META_ACCESS_TOKEN` not in env → Meta Graph API skipped for Instagram and Facebook.
- Apify MCP server not connected in this session (ToolSearch returned no Apify tools).
- `APIFY_TOKEN` not in env → REST API fallback also unavailable.
- Blotato MCP not connected → no published/scheduled post data retrievable.
- TikTok: account not connected to Blotato (inventory.md gap, pre-existing).

> **ESCALATED DATA GAP ALERT — CRITICAL (FIFTH CONSECUTIVE FAILURE):** Runs 2026-06-27
> (partial), 2026-07-09, 2026-07-11, 2026-07-12, and now 2026-07-13 have all failed to
> produce scraped metrics. The M06 validation criterion "No data gaps >2 consecutive days"
> has been continuously breached since 2026-07-09 (4 days ago). Last reliable profile data:
> 2026-06-27 — **16 days ago**. The measurement layer has been dark for over two weeks.
> **Root cause is unchanged and cannot self-resolve. Operator action required.**

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (scrape failed — last baseline: 632 on 2026-06-27) | (no data — 16 days elapsed) | (no data) | Apify MCP not connected; no `META_ACCESS_TOKEN` |
| Facebook | AI Automation Queen | (scrape failed) | — | — | No Meta token; Apify MCP not connected |
| YouTube | @AI-Automation-Queen | (scrape failed) | — | — | Apify MCP not connected |
| LinkedIn | Fatiha Chikh | (scrape failed) | — | — | Apify MCP not connected; use `linkedin-update` arg for manual stats |
| Twitter/X | @aiautomatik | (scrape failed) | — | — | Apify MCP not connected |
| Threads | @thefatihachikh | (scrape failed) | — | — | Apify MCP not connected |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok account to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **No data returned this run.** All Apify scrapers unavailable (MCP not connected,
> no REST API token). Blotato MCP not connected — cannot cross-reference published posts.
> Vault entries: 0 out of 43 entries (ENTRY 001–043) have status `POSTED` — all content
> from the brand rebuild (22/06/2026 onward) remains unreleased. No vault-to-post
> cross-reference possible.

### Blotato queue status

> **Blotato MCP not connected this session** — cannot query published/scheduled/failed posts.
> Last known state (2026-06-27): 14 published, 0 scheduled, 5 failed (4 were test posts / stale errors).
> Current queue health is unknown for all distribution runs since 2026-07-09.

### Week-over-week summary

- Instagram followers: 632 (last scraped 2026-06-27 — delta unknown, 16 days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no data across five consecutive runs
- Top-performing piece (carried from 2026-06-27, pre-rebrand): IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate
- Weakest signal: the measurement layer itself — dark for 16 days
- **Critical structural gap:** 43 vault entries (20+ READY TO POST), 0 POSTED. M06 cannot measure what has not been released. Content engine produced 5 new drafts today (ENTRY 039–043); they join the queue with nothing ahead of them posted.

### Lessons — repeatable patterns

> **Insufficient new data — fifth consecutive scraper failure.** Carrying forward
> 2026-06-27 findings (pre-rebrand, 16 days stale, directional only):

**Carried forward from 2026-06-27 (16 days stale — treat as directional):**
Personal narrative + face/voice/actual story ran ~4–8x the engagement rate of generic
AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts).
Unvalidated against the new positioning — remains provisional until rebuilt-brand
content (ENTRY 001+) goes live and gets scraped.

**Systemic finding (fifth consecutive run):** The measurement layer has been dark for
16 consecutive days. Content engine (M01) has produced 43 vault entries across multiple
daily runs. Distribution runs are committed in git. But M06 cannot read any of it. The
feedback loop is completely broken — the engine is producing content in the dark.

**Action required (operator — no change since 2026-07-12, still unresolved):**
1. **Highest priority:** Connect Apify MCP + Blotato MCP in the session environment — OR
   set `APIFY_TOKEN` as an env var so the Apify REST API fallback can run. Either unblocks
   Instagram, YouTube, Twitter/X, and Threads profile data immediately.
2. **Also required:** Release at least 3–5 READY TO POST vault entries via Blotato so
   M06 has post-rebrand content to measure on the next run. Without released posts,
   even a working M06 has nothing to score.
3. **Optional but valuable:** On next M06 run, pass `linkedin-update` argument to
   manually inject LinkedIn analytics (follower count + post impressions) — the auto-scraper
   alone returns public follower count only.
4. If MCP wiring is not yet possible in this environment, setting `APIFY_TOKEN` alone
   enables the REST API fallback for four platforms at low cost (~$0.01–0.05/run).

---

## PERFORMANCE 2026-07-12

**Run date:** 2026-07-12 ~UTC
**Sources scraped:** Instagram (FAILED), Facebook (FAILED), YouTube (FAILED), LinkedIn (FAILED), Twitter/X (FAILED), Threads (FAILED), TikTok (NOT CONNECTED), Blotato (FAILED)
**Data path:** ALL paths blocked — fourth consecutive failed run.
- `META_ACCESS_TOKEN` not in env → Meta Graph API skipped for Instagram and Facebook.
- Apify MCP server not connected in this session (ToolSearch returned no Apify tools).
- `APIFY_TOKEN` not in env → REST API fallback also unavailable.
- Blotato MCP not connected → no published/scheduled post data retrievable.
- TikTok: account not connected to Blotato (inventory.md gap, pre-existing).

> **ESCALATED DATA GAP ALERT — CRITICAL (FOURTH CONSECUTIVE FAILURE):** Runs
> 2026-06-27 (partial), 2026-07-09, 2026-07-11, and now 2026-07-12 have all failed to
> produce new scraped metrics. The M06 validation criterion "No data gaps >2 consecutive
> days" has been continuously breached since 2026-07-09 (3 days ago). Last reliable
> profile data: 2026-06-27 (15 days ago). The measurement layer has been dark for over
> two weeks. **Root cause is unchanged:** Apify MCP and Blotato MCP are not wired into
> the session environment; `META_ACCESS_TOKEN` and `APIFY_TOKEN` absent.
> **This cannot self-resolve. Operator action required — see Action items below.**

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (scrape failed — last baseline: 632 on 2026-06-27) | (no data — 15 days elapsed) | (no data) | Apify MCP not connected; no `META_ACCESS_TOKEN` |
| Facebook | AI Automation Queen | (scrape failed) | — | — | No Meta token; Apify MCP not connected |
| YouTube | @AI-Automation-Queen | (scrape failed) | — | — | Apify MCP not connected |
| LinkedIn | Fatiha Chikh | (scrape failed) | — | — | Apify MCP not connected; use `linkedin-update` arg for manual stats |
| Twitter/X | @aiautomatik | (scrape failed) | — | — | Apify MCP not connected |
| Threads | @thefatihachikh | (scrape failed) | — | — | Apify MCP not connected |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok account to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **No data returned this run.** All Apify scrapers unavailable (MCP not connected,
> no REST API token). Blotato MCP not connected — cannot cross-reference published posts.
> Vault entries: 0 out of 46 entries have status `POSTED` — rebuilt-brand content
> (ENTRY 001–046) remains unreleased. No vault-to-post cross-reference possible.

### Blotato queue status

> **Blotato MCP not connected this session** — cannot query published/scheduled/failed posts.
> Last known state (2026-06-27): 14 published, 0 scheduled, 5 failed (4 were test posts / stale errors).
> Current queue health unknown for 2026-07-09, 2026-07-10, 2026-07-11, and 2026-07-12 distribution runs.

### Week-over-week summary

- Instagram followers: 632 (last scraped 2026-06-27 — delta unknown, 15 days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no data across all four consecutive runs
- Top-performing piece (carried from 2026-06-27, pre-rebrand): IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate
- Weakest signal: the measurement layer itself — dark for 15 days
- **Critical structural gap:** 46 vault entries (including ~20 READY TO POST), 0 POSTED. M06 cannot measure what has not been released.

### Lessons — repeatable patterns

> **Insufficient new data — fourth consecutive scraper failure.** Carrying forward
> 2026-06-27 findings (pre-rebrand, 15 days stale, directional only):

**Carried forward from 2026-06-27 (15 days stale — treat as directional):**
Personal narrative + face/voice/actual story ran ~4–8x the engagement rate of generic
AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts).
Unvalidated against the new positioning — remains provisional until rebuilt-brand
content (ENTRY 001+) goes live and gets scraped.

**Systemic finding (fourth run):** The measurement layer has been dark for 15 consecutive
days. Content engine (M01) has produced 46 vault entries. Distribution runs are committed
in git. But M06 cannot read any of it. The feedback loop is broken.

**Action required (operator):**
1. **Highest priority:** Connect Apify MCP + Blotato MCP in the session environment — OR
   set `APIFY_TOKEN` as an env var so the Apify REST API fallback can run.
2. **Also required:** Release at least 3–5 READY TO POST vault entries via Blotato so
   M06 has post-rebrand content to measure on the next run.
3. **Optional but valuable:** On next M06 run, pass `linkedin-update` argument to
   manually inject LinkedIn analytics (follower count + post impressions).
4. If the MCP wiring is not yet possible, set `APIFY_TOKEN` as a minimum — this enables
   the REST API fallback for Instagram (profile-level), YouTube, Twitter/X, and Threads.

---

## PERFORMANCE 2026-07-11

**Run date:** 2026-07-11 ~UTC
**Sources scraped:** Instagram (FAILED), Facebook (FAILED), YouTube (FAILED), LinkedIn (FAILED), Twitter/X (FAILED), Threads (FAILED), TikTok (NOT CONNECTED), Blotato (FAILED)
**Data path:** ALL paths blocked — third consecutive failed run.
- `META_ACCESS_TOKEN` not in env → Meta Graph API skipped for Instagram and Facebook.
- Apify MCP server not connected in this session (ToolSearch returned no Apify tools).
- `APIFY_TOKEN` not in env → REST API fallback also unavailable.
- Blotato MCP not connected → no published/scheduled post data retrievable.
- TikTok: account not connected to Blotato (inventory.md gap, pre-existing).

> **ESCALATED DATA GAP ALERT — CRITICAL:** This is the **third consecutive run** where
> all scrapers failed (2026-06-27 partial, 2026-07-09 all-fail, 2026-07-11 all-fail).
> M06 validation criterion "No data gaps >2 consecutive days" is **breached**. Last
> reliable profile data: 2026-06-27 (14 days ago). The measurement layer is dark.
> **Root cause:** Apify MCP and Blotato MCP are not wired into local/cloud sessions;
> `META_ACCESS_TOKEN` and `APIFY_TOKEN` are absent from the environment.
> **Fix required before next run:** either connect Apify MCP + Blotato MCP in the
> session environment, or set `APIFY_TOKEN` as an env var for REST API fallback.

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (scrape failed — reusing 2026-06-27 baseline: 632) | (no new data — 14 days elapsed) | (no new data) | Apify MCP not connected; no META_ACCESS_TOKEN |
| Facebook | AI Automation Queen | (scrape failed) | — | — | No Meta token; Apify MCP not connected |
| YouTube | @AI-Automation-Queen | (scrape failed) | — | — | Apify MCP not connected |
| LinkedIn | Fatiha Chikh | (scrape failed) | — | — | Apify MCP not connected; use `linkedin-update` for manual stats |
| Twitter/X | @aiautomatik | (scrape failed) | — | — | Apify MCP not connected |
| Threads | @thefatihachikh | (scrape failed) | — | — | Apify MCP not connected |
| TikTok | — | NOT CONNECTED | — | — | Connect TikTok account to Blotato first (inventory.md gap) |

### Top posts by engagement (last 12 posts per platform)

> **No data returned this run.** All Apify scrapers unavailable (MCP not connected,
> no REST API token). Blotato MCP not connected — cannot cross-reference published posts.
> Vault entries: 0 out of 38 entries have status `POSTED` — no vault-to-post cross-reference
> possible regardless of scraper availability. Rebuilt-brand content (ENTRY 001–038) remains
> unreleased (19 days since brand rebuild on 22/06/2026).

### Blotato queue status

> **Blotato MCP not connected this session** — cannot query published/scheduled/failed posts.
> Last known state (2026-06-27): 14 published, 0 scheduled, 5 failed (4 were test posts / stale errors).
> Current queue health unknown for the 2026-07-10 and 2026-07-11 distribution runs.

### Week-over-week summary

- Instagram followers: 632 (last scraped 2026-06-27 — delta unknown, 14 days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no data captured across all three runs
- Top-performing piece (carried from 2026-06-27): IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate (pre-rebrand)
- Weakest platform: measurement layer itself — all scrapers dark for 14 days
- **Critical gap:** 38 vault entries exist (20 READY TO POST, 18 DRAFT), 0 POSTED. The performance
  tracker cannot measure what has not been released.

### Lessons — repeatable patterns

> **Insufficient new data this run** — all scrapers failed for the third consecutive run.
> Carrying forward 2026-06-27 findings (pre-rebrand, directional only):

**Carried forward from 2026-06-27 (14 days stale — treat as directional, not current):**
Personal narrative + face/voice/actual story ran ~4–8x the engagement rate of generic
AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts).
Unvalidated against the new positioning — will remain provisional until rebuilt-brand
content (ENTRY 001+) goes live and gets scraped.

**Systemic finding this run:** M06 has failed to produce new metrics for three consecutive
runs. This is an infrastructure failure, not a content failure. The content engine (M01) has
produced 38 vault entries; the distribution machine has run (signal-harvester commits visible
in git log); but M06 cannot see any of it because the scraper layer is dark. The feedback
loop is broken.

**Action for `content-engine`:** Hold the "carry forward winners/losers" heuristic
(personal story > generic explainer) but do not further amplify it without new data —
it is now 14 days old and based on pre-rebrand content. The first batch of post-rebrand
content must go live and be scraped before any lesson carries real weight.

**Action required (operator):**
1. Connect Apify MCP + Blotato MCP in the session environment — OR set `APIFY_TOKEN` env var.
2. Release at least 3–5 READY TO POST entries via Blotato so M06 has something to measure.
3. On next M06 run, pass `linkedin-update` argument to manually inject LinkedIn analytics.

---


## PERFORMANCE 2026-07-09

**Run date:** 2026-07-09 ~06:00 UTC
**Sources scraped:** Instagram (FAILED), Facebook (FAILED), YouTube (FAILED), LinkedIn (FAILED), Twitter/X (FAILED), Threads (FAILED), Blotato (FAILED)
**Data path:** ALL paths blocked this run. `META_ACCESS_TOKEN` not in env (Meta Graph API skipped). Apify MCP server not connected in this session (no MCP tool available). No `APIFY_TOKEN` env var for REST API fallback. Blotato MCP server not connected. Only Telegram bot token found in env — not relevant to scraping.

> **Data gap alert:** This is the second consecutive session with all scrapers failing.
> Last successful data: 2026-06-27 (12 days ago — approaching the 2-consecutive-day
> alert threshold defined in M06 validation criteria). **Action required: connect Apify
> MCP and Blotato MCP, or set `APIFY_TOKEN` env var before next run.**

### Profile snapshot

| Platform | Handle | Followers | Delta | Posts/Videos | Other |
|---|---|---|---|---|---|
| Instagram | @thefatihachikh | (scrape failed — reusing 2026-06-27 baseline: 632) | (no new data) | (no new data) | Apify MCP not connected this session |
| Facebook | AI Automation Queen | (scrape failed) | — | — | Apify MCP not connected; no Meta Graph API token |
| YouTube | @AI-Automation-Queen | (scrape failed) | — | — | Apify MCP not connected |
| LinkedIn | Fatiha Chikh | (scrape failed) | — | — | Apify MCP not connected; use `linkedin-update` for manual stats |
| Twitter/X | @aiautomatik | (scrape failed) | — | — | Apify MCP not connected |
| Threads | @thefatihachikh | (scrape failed) | — | — | Apify MCP not connected |
| TikTok | — | NOT CONNECTED | — | — | See inventory.md gap — connect to Blotato first |

### Top posts by engagement (last 12 posts per platform)

> **No data returned this run.** All Apify scrapers unavailable (MCP not connected,
> no REST API token). No vault entries have status `POSTED` (0/23 entries published
> since brand rebuild on 22/06/2026), so no vault-to-post cross-reference is possible
> regardless of scraper availability.

### Blotato queue status

> **Blotato MCP not connected this session** — cannot query published/scheduled/failed posts.
> Last known state (2026-06-27): 14 published, 0 scheduled, 5 failed (4 were test posts / stale gateway error).

### Week-over-week summary

> No week-over-week deltas can be computed — this run produced no new metrics and the
> prior run (2026-06-27) was also a partial failure. Carrying forward 2026-06-27 baseline:
- Instagram followers: 632 (last scraped 2026-06-27 — delta unknown, 12 days elapsed)
- Facebook / YouTube / LinkedIn / Twitter / Threads: no baseline captured (all scrape failures across both runs)
- Top-performing piece (carried from prior run): IG clone reel "Meet mine. Fat.IA" — 41 likes, 9 comments, 893 plays, 7.9% eng. rate (2026-06-27 data)
- **Critical gap:** 0 posts released from the rebuilt brand (ENTRY 001–023) in 17 days since the brand rebuild. The performance tracker cannot measure what has not been posted.

### Lessons — repeatable patterns

> **Insufficient new data this run** — all scrapers failed, no POSTED vault entries exist.
> Carrying forward findings from 2026-06-27:

**Carried forward from 2026-06-27 (still the only data available):**
Personal narrative + face/voice/actual story ran ~4–8x the engagement rate of generic
AI-explainer/glossary-pack format (7.9%/7.8%/5.2% vs. 0.5–1.9% across 12 posts).
This is pre-rebrand data and remains unvalidated against the new positioning — it will
stay provisional until rebuilt-brand content goes live and gets scraped.

**Systemic finding this run:** The measurement layer (M06) has now failed to produce
new metrics in two consecutive runs (2026-06-27, 2026-07-09). The root cause is
infrastructure, not content: no MCP servers connected in local sessions, no env-var
fallback for the Apify REST API. Until fixed, the content engine is flying blind.

**Action for `content-engine` and `distribution`:** The backlog has 13 READY TO POST
entries. Releasing even 3–4 posts would (a) start generating real post-rebrand data
and (b) give M06 something to measure on the next run. The bottleneck is release, not
production.

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
