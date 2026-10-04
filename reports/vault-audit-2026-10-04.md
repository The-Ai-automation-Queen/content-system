# Content Vault Audit — 2026-10-04

**Auditor:** automated vault-audit scheduled task  
**Source:** `content-vault.md` header counts confirmed by reality-check hook  
**Prior audit:** `reports/vault-audit-2026-08-30.md`

---

## 1. Entry counts by status

| Status         | Count | Notes                                      |
|----------------|-------|--------------------------------------------|
| READY TO POST  | 37    | Oldest: 14/07/2026 — 82 days ago           |
| DRAFT          | 33    | Most recent batch: 16/09/2026 (18 days ago)|
| STALE          | 6     | All auto-marked 20/07/2026                 |
| KILLED         | 2     | 14/07/2026 operator kills (taste data)     |
| POSTED         | 0     | Zero posts published in this brand era     |
| **TOTAL**      | **78**|                                            |

---

## 2. Stale drafts (DRAFT entries older than 7 days)

**All 33 DRAFT entries qualify — most recent batch is 18 days old.**  
Key clusters by date:

| Date added     | Entry range | Count | Notes                                      |
|----------------|-------------|-------|--------------------------------------------|
| 16/09/2026     | 096–099     | 4     | Instagram/LinkedIn batch, critic pending   |
| 30/07/2026     | 095         | 1     | Project Panama opinion; personal content   |
| 22–24/07/2026  | 085, 089, 090, 094 | 4 | PREP flags blocking queue             |
| 21/07/2026     | 080, 083    | 2     | Community link PREP blocking queue         |
| 14–16/07/2026  | 071–076     | 6     | PREP flags; community link needed          |
| 11–13/07/2026  | (3 entries) | 3     | Mixed — AI news, corporate exit, opinion   |
| 27/06–07/07/2026| (varies)  | ~13   | Original brand-era drafts                 |

**Root cause common to most DRAFT entries:** PREP dependencies (community link, Whop checkout link, VERIFY flags on stats) that have not been resolved; operator critic review not yet completed.

### Formally STALE entries (auto-marked 20/07/2026)

| Date created   | Platform      | Title                                                  | Days stale |
|----------------|---------------|--------------------------------------------------------|------------|
| 23/06/2026     | Short-form video | "You're the Bottleneck"                            | 76         |
| 23/06/2026     | LinkedIn carousel | "The Freedom Business Test"                       | 76         |
| 23/06/2026     | Short-form video | "Turn One Idea Into a Week of Content"             | 76         |
| 23/06/2026     | Short-form video | "Stop Using AI Like a Vending Machine"             | 76         |
| 23/06/2026     | Short-form video | "I Haven't Built a Slide Deck in 9 Months"         | 76         |
| 23/06/2026     | LinkedIn      | "Stop Doing Robot Work With Human Hands"             | 76         |

Per vault rules, entries STALE for 14+ days with no keep decision are killed after 2 more stale weeks. These are 76 days past the auto-mark date — **kill threshold has long passed.** Awaiting operator decision.

---

## 3. Platform coverage

### Posted content (last 2 weeks: 20/09 → 04/10/2026)
**None.** Zero posts have been published on any platform in the entire brand era (since 22/06/2026 reset).

### Pipeline coverage by platform

| Platform         | READY TO POST | DRAFT | STALE | Notes                                              |
|------------------|:---:|:---:|:---:|------------------------------------------------------|
| LinkedIn         | ~34 | ~20 | 2   | Dominates pipeline; no posts released               |
| Short-form video | 3   | 6   | 4   | Reels scripts present; none published               |
| Instagram        | 0   | 3   | 0   | First native entries added 16/09/2026 (DRAFT only)  |
| X/Twitter        | 1   | 1   | 0   | Thin; one READY thread since 14/07/2026             |
| Facebook         | 0   | 1   | 0   | Single DRAFT, no READY entries                      |

### Platform gap flags

- **Instagram (critical):** Three DRAFT entries only (ENTRY 096, 097, 099 — added 16/09). No READY TO POST. No POSTED. The vault's own note on ENTRY 099 flags this as the first Instagram-native carousel entry; format/spec has not been verified for actual Instagram specs. Instagram is the declared primary growth channel per AGENTS.md.
- **Facebook:** One DRAFT only. No READY entries, no posts.
- **X/Twitter:** One READY entry (14/07/2026, 82 days old). Not a growth priority but a gap nonetheless.
- **LinkedIn:** Fully loaded (34 READY) but zero published. Not a content-supply problem.

---

## 4. Recommended next actions

### Priority 1 — Release the backlog (blocking everything)
37 entries have been READY TO POST since as far back as 14/07/2026. No operator approvals or kills since that date. Adding more content does not help — the bottleneck is release, not production.

**Action needed from Fatiha:**
1. Open `review-cockpit/state.md` and work through the current digest (9 cards: #1–#6 content + R1–R3 research). Each card needs a keep/kill/schedule decision.
2. Kill the 6 STALE entries or explicitly mark them for keep — they are 76+ days past their auto-mark date.
3. Pick 3–5 READY TO POST LinkedIn entries to post this week. Oldest entries first (14/07 batch) unless a newer entry is more timely.

### Priority 2 — Instagram: move 3 DRAFTs to READY
ENTRY 096 (Reel), 097 (text post), and 099 (carousel) are the only Instagram entries. None have been critic-reviewed or PREP-resolved. Before the next production run:
- Verify carousel specs for ENTRY 099 (panel count, character limits for actual Instagram).
- Time the Reel for ENTRY 096 with an actual read-aloud — duration not confirmed.
- ENTRY 097 has no PREP flag; it is closest to READY.

### Priority 3 — Resolve PREP dependencies to unblock 8+ DRAFTs
Multiple DRAFT entries are blocked on community links, Whop checkout links, or unverified stats. These do not need new content production — they need the destination links confirmed and inserted:
- Community launch link (blocks ENTRY 080, 083, and several July entries)
- Whop checkout link (blocks ENTRY 089 AI Time Audit entries)
- VERIFY stat on ENTRY 094 (view-multiplier claim from Lightreel.ai)

### Priority 4 — Do not add new DRAFT volume until Priority 1 is actioned
The pipeline has been growing without release since 14/07/2026. The content-engine has correctly blocked new production for 17 consecutive days. This should continue until at least 10–15 READY entries are published or killed.

---

*Report generated: 2026-10-04. Next vault audit due: 2026-10-11.*
