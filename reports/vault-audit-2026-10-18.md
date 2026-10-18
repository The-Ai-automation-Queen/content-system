# Content Vault Audit — 2026-10-18

**Auditor:** automated vault-audit scheduled task  
**Source:** `content-vault.md` entry headers + confirmed by reality-check hook and daily content-engine run notes (2026-10-12 through 2026-10-17)  
**Prior audit:** `reports/vault-audit-2026-10-11.md`

---

## 1. Entry counts by status

| Status         | Count  | Notes                                        |
|----------------|--------|----------------------------------------------|
| READY TO POST  | 37     | Oldest: 14/07/2026 — **96 days** old         |
| DRAFT          | 33     | Most recent batch: 16/09/2026 (32 days ago)  |
| STALE          | 6      | All auto-marked 20/07/2026 (90 days ago)     |
| KILLED         | 2      | 14/07/2026 operator kills                    |
| POSTED         | 0      | Zero posts published in this brand era       |
| **TOTAL**      | **78** |                                              |

No change from the 2026-10-11 audit. Seven consecutive content-engine daily runs (11–17 Oct) all produced no new entries, citing the unchanged release backlog and the queen-brain blocker.

---

## 2. Stale drafts (DRAFT entries older than 7 days)

**All 33 DRAFT entries qualify — the most recent batch is 32 days old.**

| Date added  | Entries     | Count | Platforms                                         |
|-------------|-------------|-------|---------------------------------------------------|
| 16/09/2026  | 096–099     | 4     | Instagram carousel, Instagram Reel, LinkedIn      |
| 30/07/2026  | 095         | 1     | LinkedIn                                          |
| 24/07/2026  | 090, 094    | 2     | LinkedIn                                          |
| 22/07/2026  | 085, 089    | 2     | LinkedIn                                          |
| 21/07/2026  | 080, 083    | 2     | LinkedIn                                          |
| 16/07/2026  | 072, 076    | 2     | LinkedIn                                          |
| 15/07/2026  | 071         | 1     | LinkedIn                                          |
| 13/07/2026  | 042         | 1     | LinkedIn                                          |
| 11/07/2026  | 034, 036, 038 | 3   | LinkedIn                                          |
| 07/07/2026  | 024–028     | 5     | LinkedIn, LinkedIn carousel, Short-form video, Facebook, X/Twitter |
| 30/06/2026  | 019–023     | 5     | LinkedIn, LinkedIn carousel, Short-form video (×4)|
| 27/06/2026  | 012, 015    | 2     | LinkedIn                                          |
| 25/06/2026  | 011         | 1     | Instagram Reels / TikTok / YouTube Shorts         |
| **Total**   |             | **33**|                                                   |

---

## 3. Platform coverage

### READY TO POST — platform breakdown

| Platform                                  | Count | Oldest entry     |
|-------------------------------------------|-------|------------------|
| LinkedIn (text post)                      | 32    | 14/07/2026       |
| Short-form video (Instagram/TikTok/YT)    | 3     | 14/07/2026       |
| X/Twitter thread                          | 1     | 14/07/2026       |
| LinkedIn carousel                         | 0     | —                |
| Instagram carousel                        | 0     | —                |
| Facebook                                  | 0     | —                |

### Recent production (last 30 days — since 18/09/2026)

**No new entries added.** The last new entries were ENTRY 096–099 on 16/09/2026 (32 days ago).

### Platform gaps — no new content produced in the last 2 weeks

| Platform                             | Last entry produced | Gap       |
|--------------------------------------|---------------------|-----------|
| Instagram (carousel or Reel)         | 16/09/2026 (DRAFT)  | 32 days   |
| LinkedIn                             | 16/09/2026 (DRAFT)  | 32 days   |
| Short-form video (Reels/TikTok/YTShorts) | 16/09/2026 (DRAFT) | 32 days  |
| X/Twitter                            | 07/07/2026 (DRAFT)  | 103 days  |
| Facebook                             | 07/07/2026 (DRAFT)  | 103 days  |
| **POSTED (any platform)**            | **Never**           | **∞**     |

**Critical:** Instagram is the designated primary growth channel (AGENTS.md). Zero posts have ever been published in this brand era. The 4 oldest STALE entries (ENTRY 003, 004, 006, 008) are all Instagram/short-form video; they have been in the pipeline since 23/06/2026 (117 days) with no decision.

---

## 4. Formally STALE entries (per vault definition: READY TO POST for 14+ days, auto-marked)

| Entry | Date added  | Platform                              | Title                                            | Days stale |
|-------|-------------|---------------------------------------|--------------------------------------------------|------------|
| 008   | 23/06/2026  | Instagram Reels / TikTok / YT Shorts  | You're the Bottleneck                            | 90         |
| 007   | 23/06/2026  | LinkedIn (carousel)                   | The Freedom Business Test                        | 90         |
| 006   | 23/06/2026  | Instagram Reels / TikTok / YT Shorts  | Turn One Idea Into a Week of Content             | 90         |
| 004   | 23/06/2026  | Instagram Reels / TikTok / YT Shorts  | Stop Using AI Like a Vending Machine             | 90         |
| 003   | 23/06/2026  | Instagram Reels / TikTok / YT Shorts  | I Haven't Built a Slide Deck in 9 Months         | 90         |
| 002   | 23/06/2026  | LinkedIn (text post)                  | Stop Doing Robot Work With Human Hands           | 90         |

Per vault rules, entries stale for 2+ additional weeks after auto-marking are eligible for KILLED status. All six crossed that threshold on approximately 03/08/2026 (45 days into stale). A keep/kill decision is overdue by ~76 days.

---

## 5. Recommended next actions (priority order)

1. **Unblock release — this is the only lever that matters.**  
   37 READY TO POST entries have sat unreleased for up to 96 days. The production backlog is not the bottleneck; release is. No amount of additional drafting improves the position. The two routes remain open and unanswered: (a) restore queen-brain repo access to this session so customer-facing copy can be verified and the release gate cleared; or (b) manually review and approve/reject a batch of the 37 READY TO POST entries in Telegram or Notion so the queue starts moving.

2. **Decide the 6 STALE entries: keep or kill.**  
   All six are 90 days into STALE status. A blanket kill decision cleans the ledger without requiring a content review session. If any are worth keeping, they need a keep decision now or they should be killed to stop cluttering the backlog.

3. **Prioritise Instagram before adding more LinkedIn.**  
   32 of the 37 READY TO POST entries are LinkedIn text posts. Instagram is the primary growth channel with zero posts ever published. Before producing further LinkedIn drafts, release at least one of the existing short-form video or Instagram entries (ENTRY 049, 066, 079, 088 are all short-form video READY TO POST).

4. **Do not produce new drafts until at least 10 READY TO POST entries are released.**  
   The vault already holds 33 DRAFTs; all are older than 7 days and functionally stale. Adding volume without a release pathway makes the backlog worse, not better. The signal-harvest step can continue on its own cadence.

5. **Reconcile the split-ledger gap.**  
   Four signal-harvest reports (2026-10-12 through 2026-10-16) found qualifying source material not yet ledgered as numbered RESEARCH entries in `research-notes.md`. These should be backfilled when release is unblocked, before they become orphaned signals.
