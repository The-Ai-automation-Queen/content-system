# Performance Report — 2026-07-14

**Machine:** M06 Performance Tracker
**Run date:** 2026-07-14
**Run result:** FAILED (sixth consecutive)

---

## Summary

All data sources unavailable for the sixth consecutive daily run. No scraped metrics
were produced. The performance log has been updated with the failure record.

**Root cause (unchanged since 2026-07-09):**
- `META_ACCESS_TOKEN`, `IG_BUSINESS_ID`, `FB_PAGE_ID` not in env → Meta Graph API blocked
- `APIFY_TOKEN` not in env → Apify REST API fallback blocked
- Apify MCP server not connected in session → no actor calls possible
- Blotato MCP not connected in session → no queue status data

---

## Platform status

| Platform | Status | Last known data |
|---|---|---|
| Instagram | FAILED — no scraper available | 632 followers (2026-06-27, 17 days ago) |
| Facebook | FAILED — no scraper available | No reliable baseline |
| YouTube | FAILED — no scraper available | No reliable baseline |
| LinkedIn | FAILED — no scraper available | Use `linkedin-update` arg for manual input |
| Twitter/X | FAILED — no scraper available | No reliable baseline |
| Threads | FAILED — no scraper available | No reliable baseline |
| TikTok | NOT CONNECTED | Account not wired to Blotato |
| Blotato queue | UNAVAILABLE | Last known: 14 published, 0 scheduled (2026-06-27) |

---

## Vault status

- Total entries: 46 (ENTRY 001–046)
- POSTED: 0
- READY TO POST: 20+
- DRAFT: remaining

No vault-to-post cross-reference possible. M06 cannot annotate any vault entry with
real engagement data until posts are released and scrapers are online.

---

## Data gap timeline

| Run | Date | Result |
|---|---|---|
| Partial | 2026-06-27 | Last reliable data — 632 IG followers, pre-rebrand content |
| 1st failure | 2026-07-09 | Scrapers offline |
| 2nd failure | 2026-07-11 | Scrapers offline |
| 3rd failure | 2026-07-12 | Scrapers offline |
| 4th failure | 2026-07-13 | Scrapers offline — escalated to CRITICAL |
| 5th failure | 2026-07-13 | (daily run) |
| **6th failure** | **2026-07-14** | **This run** |

The M06 validation criterion — no data gaps >2 consecutive days — has been
breached for 5 days. The feedback loop from content-engine to real-world
performance has been dark for 17 days.

---

## What is working / not working

**Not working:** The entire measurement layer. M01 has produced 46 vault entries.
Distribution has committed queue runs. But none of it can be measured because:
1. Posts have not been released from the Blotato queue (0 POSTED vault entries)
2. Even if posts were released, no scraper is available to read their engagement

**Working (context only):** The 2026-06-27 directional finding still stands —
personal narrative / face-on-camera content ran 4–8x the engagement rate of
generic AI-explainer formats. This is unvalidated against new-positioning content.

---

## Recommendation for content-engine

**No new data-backed recommendation possible this run.** Carry forward the
2026-06-27 directional: favor personal narrative and behind-the-scenes formats
over educational listicles in new drafts. This will be confirmed or overturned
once scraping resumes.

---

## Operator action required (priority order)

1. **Wire `APIFY_TOKEN` as an env var** — enables REST API fallback for IG,
   YouTube, Twitter/X, and Threads at ~$0.01–0.05/run. Fastest unblock.
2. **OR connect Apify MCP + Blotato MCP** in the session environment for full
   MCP-native scraping and queue visibility.
3. **Release 3–5 READY TO POST entries** via Blotato — without published posts,
   a working M06 still has nothing to score.
4. **Run `linkedin-update`** on next M06 pass to inject LinkedIn analytics manually
   (auto-scraper returns public follower count only).

Until one of actions 1 or 2 is complete, M06 will continue to produce failure
entries and the feedback loop will remain broken.
