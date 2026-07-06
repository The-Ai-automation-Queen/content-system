# Vault Audit — 2026-07-05

**Auditor:** vault-audit skill  
**Vault reset date:** 22/06/2026  
**Entries audited:** ENTRY 001–023  
**Staleness threshold:** 7 days (drafts created before 28/06/2026)

---

## 1. Status Summary

| Status | Count | % of total |
|---|---|---|
| DRAFT | 10 | 43% |
| READY TO POST | 13 | 57% |
| POSTED | **0** | 0% |
| **TOTAL** | **23** | |

> **Critical flag:** Zero entries have reached POSTED status, 13 days after the brand rebuild vault reset. The content engine is producing, but the distribution machine has not run. Nothing has been published.

---

## 2. Stale Drafts (>7 days old as of 05/07/2026)

| Entry | Date | Age | Platform | Title |
|---|---|---|---|---|
| ENTRY 011 | 25/06/2026 | **10 days** | Short-form video (Reel/TikTok/YT Short) | "You're Talking to the Most Powerful AI on the Planet Like It's Google" |
| ENTRY 012 | 27/06/2026 | **8 days** | LinkedIn | "The First Weekend I Didn't Open My Laptop, I Felt Sick" |
| ENTRY 015 | 27/06/2026 | **8 days** | LinkedIn | "Selling AI Agents for $5k Isn't Freedom — It's Freelancing With Extra Steps" |

**Staleness reason per entry:**

- **ENTRY 011** — Awaiting production (AI twin talking-head + on-screen text). No explicit blocker flagged in the draft, but not yet queued.
- **ENTRY 012** — **Blocked — `personal-brain.md` empty.** The anecdote ("first weekend, felt sick") is a positioning placeholder, not a real memory. Run `/brain-manager` to seed real anecdotes before this can go live.
- **ENTRY 015** — **Blocked — community offer not live.** The CTA promises founding-member access to a Skool space that must exist before posting. Resolve the offer (lock the space, lock the founding price) to unblock.

---

## 3. Ready-to-Post Entries with Active Blockers

Not all READY TO POST items are actually clearable. Four have ⚠️ PREP warnings that block queueing:

| Entry | Lead magnet / resource | Status | Action required |
|---|---|---|---|
| ENTRY 016 | "TEAM" lead magnet | `active=no` | Host + activate before queueing |
| ENTRY 014 | "STACK" lead magnet | `active=no` | Host + activate before queueing |
| ENTRY 013 | "PIPELINE" lead magnet | `active=no` | Host + activate before queueing |
| ENTRY 005 | "STACK" (same as ENTRY 014) | `active=no` | Same activation as above |
| ENTRY 002 | "FOLLOW UP" resource | Prep warning | Have the resource ready before posting |

**Immediately queueable (no PREP blockers):**  
ENTRY 001, 003, 004, 006, 007, 008, 009, 010 — 8 entries are clean and can go into the Blotato queue today.

---

## 4. Platform Coverage — Last 14 Days (21/06–05/07/2026)

| Platform | Entries (last 14 days) | Most recent | Status |
|---|---|---|---|
| LinkedIn (text post) | 11 | 30/06/2026 | Active — well stocked |
| LinkedIn (carousel) | 2 | 30/06/2026 | Active |
| Instagram Reels / TikTok / YouTube Shorts | 10 | 30/06/2026 | Active — well stocked |
| Facebook | 0 | — | **GAP — no dedicated content** |
| Twitter / X | 0 | — | **GAP — no dedicated content** |
| Email / Newsletter | 0 | — | **GAP — no email sequence content** |
| YouTube (long-form) | 0 | — | Not yet in scope (expected) |

> **Note:** All 23 entries were created in the last 14 days and are within the coverage window. The short-form video entries are platform-flexible (Reel/TikTok/Shorts) but are not adapted for Facebook-specific formatting or Twitter threads.

---

## 5. Recommended Next Actions (Prioritised)

### Immediate — unblock publishing

1. **Run `distribution` skill now.** 8 READY TO POST entries have no blockers (ENTRY 001, 003, 004, 006, 007, 008, 009, 010). Push these into the Blotato queue today. The brand rebuild launched 13 days ago with zero published posts — this is the top priority.

2. **Activate 3 lead magnets (TEAM, STACK, PIPELINE)** in `lead-magnets.csv` to unblock ENTRY 013, 014, 015, and 016 for queueing. Until they're live, those CTAs are promises the system can't keep.

3. **Finalize ENTRY 002's "FOLLOW UP" resource** and confirm the "automated lead follow-up in an afternoon" detail is true-to-life.

### Short-term — resolve draft blockers

4. **Run `/brain-manager`** to seed `personal-brain.md` with real anecdotes and opinions. ENTRY 012 is gated on this and it will gate every future storytelling post. This is not optional — it's the personalisation layer for the entire engine.

5. **Decide on ENTRY 015** (the founding-member post): either commit to opening the Skool space and lock the founding price, or swap the CTA to a waitlist to unblock it without needing the full community live.

6. **Produce ENTRY 011** (the Chez Claude reel). This is the oldest draft (10 days) and the only entry with an active lead-magnet link (`guides.shiftandlead.com`) and a GHL workflow already specified. It's the highest-leverage quickstart asset — record the AI twin, render it, mark READY TO POST.

### Medium-term — fill platform gaps

7. **Add Facebook-adapted posts.** LinkedIn text posts can often be lightly reformatted for Facebook (less professional tone, more personal). Even 2–3 Facebook-specific entries per sprint would close the gap.

8. **Add Twitter/X thread entries.** Several vault entries (notably ENTRY 009 "AI Doesn't Fix Chaos. It Scales It." and ENTRY 017 "The 4 Upgrades" carousel) are natural thread candidates. Add a `content-engine` pass with `--platform twitter` to extract thread adaptations.

9. **Start an email/newsletter sequence.** The vault has strong educational pillars (What's Worth It, Build Once Runs Forever) with no email equivalents. A 3-email welcome sequence from existing content would activate the email funnel without new writing.

---

## 6. Pipeline Health Score

| Dimension | Score | Notes |
|---|---|---|
| Draft pipeline | 8/10 | 23 quality entries, all scoring ≥8.4 Critic |
| Publishing velocity | **1/10** | 0 POSTED entries in 13 days — critical gap |
| Lead magnet readiness | 4/10 | 3 of 7 READY posts blocked by inactive magnets |
| Platform breadth | 5/10 | LinkedIn + short-form covered; Facebook/X/email absent |
| Personalisation | 4/10 | `personal-brain.md` empty; storytelling posts are placeholders |

**Overall: content quality is high, publishing infrastructure is not yet operational. The immediate lever is running `distribution` on the 8 unblocked ready entries.**
