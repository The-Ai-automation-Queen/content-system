# M06 Performance Report — 2026-07-18

**Machine:** M06 performance-tracker
**Run date:** 2026-07-18
**Run result:** FAILED — tenth consecutive scraper failure

---

## What was attempted

Full pre-flight and source hierarchy checked in order per SKILL.md:

1. Meta Graph API (Instagram + Facebook) — skipped: `META_ACCESS_TOKEN` not in env.
2. Apify MCP tools — not available: ToolSearch returned no Apify actors this session.
3. Apify REST API fallback — skipped: `APIFY_TOKEN` not in env.
4. Blotato MCP — not available: `blotato_list_posts` not in deferred tool list.
5. LinkedIn auto-scraper — not available (same Apify dependency).
6. TikTok — NOT CONNECTED (pre-existing inventory.md gap).
7. Vault cross-reference — not possible: 0 entries with status `POSTED`.

All paths blocked. No metrics produced.

---

## Data status

| Platform | Last known data | Age |
|---|---|---|
| Instagram | 636 followers (04/07/2026, inventory.md) | 14+ days |
| Facebook | (scrape failed — 2026-06-27) | 21 days |
| YouTube | (scrape failed — 2026-06-27) | 21 days |
| LinkedIn | (scrape failed — 2026-06-27) | 21 days |
| Twitter/X | (scrape failed — 2026-06-27) | 21 days |
| Threads | (scrape failed — 2026-06-27) | 21 days |
| TikTok | Never connected | — |

Last reliable multi-platform profile snapshot: **2026-06-27** (21 days ago).

---

## Consecutive failure count

| Run date | Status | Run # |
|---|---|---|
| 2026-06-27 | Partial (IG only, some data) | — |
| 2026-07-09 | FAILED | 1 |
| 2026-07-11 | FAILED | 2 |
| 2026-07-12 | FAILED | 3 |
| 2026-07-13 | FAILED | 4 |
| 2026-07-14 | FAILED | 5 |
| 2026-07-15 | FAILED | 6 |
| 2026-07-16 | FAILED | 7 |
| 2026-07-17 | FAILED | 8 (logged as ninth; numbering correction) |
| **2026-07-18** | **FAILED** | **10** |

M06 validation criterion "No data gaps >2 consecutive days" has been breached for
9 days straight.

---

## What is working

Nothing in M06 is producing output. The machine runs, reads its SKILL.md, checks
all paths, logs the failure correctly, and exits. The logging itself is functioning.

## What is not working

The measurement layer is structurally dark. The pipeline continues to produce:
- M01 daily signal harvests (committed to git)
- M01 content-engine drafts (vault entries accumulating)
- Distribution runs (queue entries in Blotato, committed to git)

None of this output can be scored. Content-engine and copy-craft are both reading
from a 21-day-old baseline (2026-06-27 pre-rebrand findings). The feedback loop
is broken.

---

## Root cause

Single root cause, unchanged across all ten failures:

**Apify MCP and Blotato MCP are not connected to the session environment, and
no `APIFY_TOKEN` or `META_ACCESS_TOKEN` env vars are set.**

This cannot self-resolve. It requires an operator configuration action.

---

## Recommendation for content-engine

Cannot update based on new data. Carry forward from 2026-06-27 (directional only):
personal narrative + face/voice format ran 4–8x the engagement rate of generic
AI-explainer format. Treat as a working hypothesis until post-rebrand content
is released and scraped.

---

## One-line operator action

**Set `APIFY_TOKEN` as an env var OR connect Apify MCP in session settings.**
This single action unblocks Instagram, YouTube, Twitter/X, and Threads profile
data on the next run at ~$0.01–0.05 cost.
