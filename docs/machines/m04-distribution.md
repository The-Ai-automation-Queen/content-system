# M04 — Distribution

## Purpose
Push READY TO POST entries into the Blotato queue across all connected
platforms. Queue-only — the operator releases in the Blotato dashboard.

## When it runs
- After visual-engine in the weekly loop
- On demand for specific entries

## Tools
- **Blotato** — multi-platform scheduling queue. Media handling (when upload
  is needed vs. a direct URL, presigned upload steps, Drive gotchas):
  `docs/BLOTATO-MEDIA-UPLOAD-GUIDE.md`.

## Connected platforms
LinkedIn, Instagram, Facebook, YouTube Shorts, Threads, Twitter/X.
TikTok is planned but not yet connected.

## Inputs
- READY TO POST vault entries with no unresolved flags
- Visual assets (from M02)
- Platform-specific formatting rules

## Outputs
- Entries scheduled in Blotato queue
- Vault entries updated: status → SCHEDULED, Blotato ID recorded
- `reports/distribution-*.md` audit trail

## Validation criteria
1. Only unflagged READY TO POST entries are queued
2. Platform-specific formatting applied (LinkedIn line breaks, X character limit)
3. Scheduling times are appropriate (not middle of the night)
4. No duplicate scheduling of the same entry
5. Audit trail written for every queued item

## Safety
- **Never auto-publishes.** Blotato holds the queue; the operator releases.
- Flagged entries (PERSONALIZE/VERIFY/PREP) are never queued.
- This is the `security.md` §3.1 checkpoint.

## Decision framework for AI delegation
An AI validator should:
- Verify the queue is not overloaded (max 3–5 per day per platform)
- Check that the weekly posting rhythm is balanced across pillars
- Flag if a platform has had no content for >3 days
- Never override the queue-only policy
