# Signal Harvest — 2026-07-15

**Machine:** M01 signal-harvester
**Run time:** 2026-07-15 (manual session trigger)
**Entry written:** RESEARCH 035 in `research-notes.md`

---

## Source status

| Slot | Source | Status | Notes |
|---|---|---|---|
| TW 1 | Twitter/X (@gregisenberg) | Web-search fallback | X blocks unauthenticated fetch; URL confirmed via multiple search citations |
| TW 2 | Twitter/X (Zuckerberg/TechCrunch) | Web-search fallback — TechCrunch source | X login wall; used the verified TechCrunch article as primary source |
| IG 1 | Instagram (@sabrina_ramonov) | Web-search fallback — date unconfirmed | Instagram login wall; URL surfaced via search, content confirmed in snippets |
| IG 2 | Instagram (@shesmakingmillions) | Web-search fallback — April 2026 | No July 2026 IG reel date-confirmed; best available real result used |
| YT | YouTube (Simple Tech Skills) | Confirmed (~July 10, 2026) | Date confirmed "5 days ago" in July 15 search; view count not indexed |
| RSS | Anthropic blog | Confirmed (July 14, 2026) | https://www.anthropic.com/news/claude-for-teachers fetched directly |
| News | Mean CEO Blog | Confirmed (July 2026) | Exact day within window not confirmed; URL real and returned by search |

**Apify MCP:** NOT AVAILABLE — same as 2026-07-14. All social slots filled via web-search per failure-mode rule. No signals hallucinated.

---

## Lead-magnet rule check

Rule: ≥2 of 7 signals must map to an ACTIVE lead-magnet keyword.

| Signal | Keyword | Status |
|---|---|---|
| 1 [TW] Greg Isenberg | TEAM | active |
| 3 [IG] Sabrina Ramonov | STACK | active |
| 7 [NEWS] $0.46 agent stat | INBOX | active |

**Result: 3 of 7 flagged. Rule satisfied.**

---

## Source-mix rule check

Rule: 2 Twitter, 2 Instagram, 1 YouTube, 1 RSS, 1 News.

| Source | Required | Delivered | Notes |
|---|---|---|---|
| Twitter/X | 2 | 2 | Isenberg + Zuckerberg (via TechCrunch) |
| Instagram | 2 | 2 | Sabrina (date unconfirmed) + @shesmakingmillions (April 2026) |
| YouTube | 1 | 1 | Simple Tech Skills, ~July 10 |
| RSS | 1 | 1 | Anthropic, July 14 |
| News | 1 | 1 | Mean CEO, July 2026 |

**Result: Mix satisfied. Both IG slots are fallback/unconfirmed — noted in entry.**

---

## Operator actions required

1. **Apify MCP** — unavailable for two consecutive days (July 14 + 15). If this persists, check Apify actor credentials in Doppler and verify the MCP server config in the cloud session.
2. **Instagram slot 4** — no July 2026 reel date-confirmed. Operator can manually verify @jasminestar, @vanessalau.co, or @rachrodgersesq for a fresh July reel and update signal 4 in RESEARCH 035 if found.
3. **YouTube virality score** — view count not indexed; visit https://www.youtube.com/watch?v=M2ivBWjkPFY to confirm live count and back-fill the score.

---

## Handoff to content-engine

RESEARCH 035 is ready. Top angles prepped:
- **Build Once angle:** Greg Isenberg "readable to agents" → TEAM magnet
- **Contrarian angle:** Zuckerberg AI agent admission → WHAT magnet
- **Stop Doing That by Hand:** $0.46 agent support stat → INBOX magnet
