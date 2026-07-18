# Signal Harvest Run — 2026-07-18

**Machine:** M01 signal-harvester
**Run date:** 2026-07-18
**Research entry written:** RESEARCH 038

---

## Source-by-source status

| Slot | Source | Status | URL confirmed? |
|---|---|---|---|
| TW-1 | @prayag_sonar — AI automation flows thread | Web-search fallback (X login wall) | Yes — via search snippet |
| TW-2 | @carsonmarz — "AI Agents one-pager, still true July 2026" | Web-search fallback (X login wall) | Yes — via search snippet |
| IG-3 | @fitxfearless — "Best AI Platform 2026" comment-CTA reel | Direct WebFetch ✓ | Yes — fetched successfully (588 likes, 32 comments) |
| IG-4 | @sabrina_ramonov — "I Built an AI Social Media System" | Web-search fallback (IG login wall) | Yes — Substack/web confirmed, IG cross-post noted |
| YT-5 | Corey Ganim — "$1,000/hour Solo AI Business" (Jul 15) | Web-search + Whatfinger confirmation | URL confirmed; virality score N/A (view count not indexed) |
| RSS-6 | Anthropic — "Claude for Teachers" (Jul 14) | Direct WebFetch ✓ | Yes — fetched successfully |
| NEWS-7 | Jio Haptik SOLO launch (Jul 8) | WebSearch — multiple sources ✓ | Yes — confirmed via 6+ news outlets |

---

## Source health

- **Apify MCP:** NOT AVAILABLE this session. All social scraping slots filled via web-search fallback. No signals invented.
- **X.com direct fetch:** Blocked (HTTP 402 Payment Required). X posts confirmed via Google search snippets only.
- **Instagram direct fetch:** Partial. @fitxfearless reel fetched successfully. @sabrina_ramonov blocked by login wall.
- **Tavily MCP:** NOT AVAILABLE this session. News slot filled via WebSearch fallback.
- **WebFetch (RSS):** Functional. Anthropic news page fetched successfully.
- **WebSearch:** Functional throughout.

---

## Lead-magnet rule check

- Signal 1 [TW] @prayag_sonar → STACK ★
- Signal 3 [IG] @fitxfearless → STACK ★
- Rule requires ≥2: **MET (2 flagged)**

## Source-mix rule check

2 Twitter / 2 Instagram / 1 YouTube / 1 RSS / 1 News = **7 signals, mix correct**

---

## Operator action items

1. **Apify MCP:** Remains unavailable. Social slots continue to fall back to web search. Operator should verify Apify MCP connectivity in the VPS cloud session config if live Instagram/X scraping is needed.
2. **X.com fetch:** Direct X post fetching requires authentication. Consider adding an X/Twitter MCP or Nitter proxy to the allowed tools list.
3. **Virality score for YT slot:** Corey Ganim video (Jul 15) — view count was not indexed in search results this session. Operator can manually check https://www.youtube.com/watch?v=dhbcVxYhWaQ and update the entry.

---

## External actions taken

- No posts queued. No content published. Research-only run.
- Files modified: `research-notes.md` (RESEARCH 038 appended at top)
- Files created: this report (`reports/signal-harvest-2026-07-18.md`)
