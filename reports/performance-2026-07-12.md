# Performance Report — 2026-07-12

**Run:** M06 performance-tracker
**Date:** 2026-07-12
**Status:** ALL SCRAPERS FAILED — fourth consecutive failure

---

## What happened

This is the fourth M06 run in a row to return zero new metrics. The root cause is
unchanged across all four runs: the Apify MCP server is not connected in the session
environment, and neither `APIFY_TOKEN` (Apify REST fallback) nor `META_ACCESS_TOKEN`
(Meta Graph API) are available as environment variables. Blotato MCP is also absent.

| Data source | Status | Why |
|---|---|---|
| Meta Graph API (IG + FB) | Skipped | `META_ACCESS_TOKEN` not in env |
| Apify MCP | Not available | MCP server not wired into session |
| Apify REST fallback | Blocked | `APIFY_TOKEN` not in env |
| Blotato MCP | Not available | MCP server not wired into session |
| LinkedIn manual | Not run | No `linkedin-update` argument passed |
| TikTok | Not connected | Pre-existing gap (inventory.md) |

The M06 validation criterion "No data gaps >2 consecutive days" has been breached
continuously since 2026-07-09.

---

## Current state of the content pipeline

Despite M06 being dark, the rest of the engine has been running:

- **Content vault:** 46 entries (as of this run), including ~20 READY TO POST
- **Distribution:** Runs committed in git (2026-07-10, 2026-07-11) — queue state unknown (Blotato MCP not available)
- **POSTED entries in vault:** 0 — rebuilt-brand content (ENTRY 001+) has not yet been confirmed as released
- **Last reliable social metrics:** Instagram 632 followers (2026-06-27, 15 days ago)

The content engine is producing. The distribution machine is running. But M06 cannot
see any of it — the scraper layer is dark and the feedback loop is broken.

---

## What is working / what is not

**Working:** Content production pipeline (M01) — 46 vault entries in 20 days.

**Not working:**
1. M06 measurement layer — 15-day scraper blackout
2. Post-rebrand content not yet confirmed released or measurable
3. No new follower growth data across any platform

**Critical dependency chain:** Content must be released (Blotato) before M06 can
measure it. M06 must measure before content-engine can use lesson feedback. Currently:
M01 → ✅ → distribution → ❓ → M06 → ❌.

---

## Recommendation for content-engine

Hold the "personal story > generic explainer" heuristic from the 2026-06-27 baseline
(personal narrative ran 4–8x engagement rate of glossary/explainer formats: 7.9%/7.8%
vs. 0.5–1.9%). But do not further refine or amplify this finding — it is 15 days old,
pre-rebrand, and cannot be validated until post-rebrand content goes live and is scraped.

**Immediate priority is not content production. It is measurement infrastructure.**

---

## Action items (operator)

Priority order:

1. **Set `APIFY_TOKEN` env var** — this is the fastest unblock. Enables Apify REST
   fallback for Instagram (profile), YouTube, Twitter/X, and Threads without MCP.
2. **Connect Apify MCP server** to the session environment for full scraping capability.
3. **Connect Blotato MCP server** to enable queue status visibility.
4. **Confirm content release:** check Blotato dashboard to verify whether the 2026-07-10
   and 2026-07-11 distribution run queues were released. If yes, 5–10 posts should now
   be live — M06 can measure them on the next run.
5. **Run M06 again immediately after items 1–4** — even Instagram-only data would break
   the 15-day blackout and restart the feedback loop.
6. **Pass `linkedin-update` on next run** to manually inject LinkedIn analytics.
