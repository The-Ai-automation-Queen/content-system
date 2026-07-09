# Performance Report — 2026-07-09

**Machine:** M06 performance-tracker
**Run date:** 2026-07-09
**Prior run:** 2026-06-27 (12 days ago)
**Status:** ALL SCRAPERS FAILED — infrastructure not connected in this session

---

## What happened

Every data path was unavailable:

| Path | Reason |
|---|---|
| Meta Graph API (IG/FB preferred) | `META_ACCESS_TOKEN` not in env |
| Apify MCP (all platforms fallback) | Apify MCP server not connected in this local session |
| Apify REST API via curl | No `APIFY_TOKEN` env var |
| Blotato MCP (queue status) | Blotato MCP server not connected in this local session |

This is the second consecutive run with all scrapers failing. The M06 validation criteria flag any data gap > 2 consecutive days as an alert — that threshold has been crossed.

No `**Performance:**` annotations were written to `content-vault.md` because zero vault entries have status `POSTED`.

---

## Current state (from last good data + vault)

| Metric | Value | Source |
|---|---|---|
| Instagram followers | 632 | Apify scrape 2026-06-27 |
| POSTED vault entries | 0 / 23 | content-vault.md read today |
| READY TO POST backlog | 13 entries | content-vault.md read today |
| DRAFT backlog | 10 entries | content-vault.md read today |
| Days since brand rebuild | 17 | Since 22/06/2026 |
| Days since last perf scrape | 12 | Since 2026-06-27 |

---

## What is working / not working

**What is not working:**
1. **Infrastructure gap:** M06 cannot run usefully from local sessions without Apify MCP or a `APIFY_TOKEN` env var. The VPS cron (03:00 daily) is the correct home for this skill — verify the VPS has the Apify MCP server configured and the token injected via Doppler.
2. **Zero published content:** 17 days after the brand rebuild, no rebuilt content has been released. The measurement layer literally has nothing to measure for the new brand.

**What is working (carried from 2026-06-27 data):**
- Personal reveal / face-and-story format: 7.8–7.9% engagement rate (top 2 IG posts)
- Story + brand narrative carousels: 5.2% engagement rate
- Generic educational listicle / glossary pack: 0.5–1.9% (bottom 6 posts)

---

## One recommendation for content-engine

**Release before producing.** The vault has 13 READY TO POST entries. At the current zero-release rate, M06 will keep writing "(no POSTED entries)" indefinitely. The next content-engine run should not produce new drafts until at least 3–5 existing READY TO POST items have been queued into Blotato and released by the operator. This unblocks real engagement data for the next performance-tracker run.

---

## Infrastructure fix checklist (operator)

- [ ] Confirm Apify MCP server is configured on the VPS (`run-machine.sh` environment)
- [ ] Confirm `APIFY_TOKEN` is in Doppler (injected at cron runtime)
- [ ] Confirm Blotato MCP server is configured on the VPS
- [ ] Confirm `META_ACCESS_TOKEN`, `IG_BUSINESS_ID`, `FB_PAGE_ID` are in Doppler (to unlock the preferred Meta Graph API path for IG/FB, which is richer than Apify)
- [ ] Release 3–5 READY TO POST vault entries in Blotato (operator-only checkpoint)
- [ ] Verify next M06 cron run (03:00 VPS) produces metrics rather than a second failure
