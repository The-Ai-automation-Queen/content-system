# Performance Log — Fatiha Chikh

> Real engagement data scraped from social platforms. One entry per run,
> newest at the top. Date format: `YYYY-MM-DD`. Data sources: Meta Graph API,
> Apify MCP, Blotato MCP. Do not edit manually — this file is machine-written.

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
