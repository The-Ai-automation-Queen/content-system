# Performance Report — 2026-07-20

**Machine:** M06 performance-tracker
**Run date:** 2026-07-20 03:01 UTC
**Run outcome:** FAILED — twelfth consecutive failure

---

## What happened

All data paths were unavailable this run:

- `META_ACCESS_TOKEN` not set → Meta Graph API skipped (Instagram, Facebook)
- Apify MCP not connected in this session → all Apify scrapers unavailable
- `APIFY_TOKEN` not set → Apify REST API fallback unavailable
- Blotato MCP not connected → queue status unreadable
- TikTok: not yet connected to Blotato (pre-existing gap)

No metrics were scraped. No vault entries were updated. No cross-reference
with Blotato published posts was possible.

---

## Data gap summary

| Stat | Value |
|---|---|
| Last successful scrape | 2026-06-27 (partial — Instagram only) |
| Days since last data | 23 |
| Consecutive failed runs | 12 (since 2026-07-09) |
| M06 validation criterion breached | "No data gaps >2 consecutive days" — breached for 11 days |
| Last confirmed Instagram followers | 636 (04/07/2026 per inventory.md) |
| Vault entries POSTED | 0 |

---

## What is working / what is not

**Working:** The log entry is written, the report is filed, the audit trail is intact.
Content-engine and M01 signal-harvester are producing output (vault has a READY TO POST
backlog). The git pipeline is healthy.

**Not working:** The entire measurement layer. M06 has been dark for 23 days.
The content engine is producing into a void — no feedback signal reaches it.
Without released posts or platform data, the system cannot learn what works.

---

## Recommendation for content-engine

**Hold** — do not change content strategy based on this run. The 2026-06-27
directional finding (personal-narrative/story format outperforms generic listicle
4–8x) remains the standing provisional signal, but it is 23 days stale and
pre-rebrand. Do not treat it as validated for the current voice/positioning.

**When M06 is unblocked:** run immediately with the `competitors` argument to
catch up on the full follower landscape, then re-derive the winners-vs-losers
comparison from post-rebrand content (ENTRY 001+).

---

## Operator action required (priority order)

1. **Connect Apify MCP to Claude Code** (or set `APIFY_TOKEN` in the session env).
   This single action unblocks five platforms: Instagram, YouTube, Twitter/X,
   Threads, LinkedIn. Cost: ~$0.01–0.05/run. See `inventory.md §7`.
2. **Release 3–5 READY TO POST vault entries** via Blotato so there is
   post-rebrand content for M06 to score on the next successful run.
3. **Run M06 again immediately** once step 1 is done — pass `linkedin-update`
   to also capture LinkedIn analytics manually.
4. **Optional:** connect Blotato MCP to restore queue-status visibility.
