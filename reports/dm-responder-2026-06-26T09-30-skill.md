# DM Responder (M05) — Monitor Run

**Date:** 2026-06-26 (09:30 UTC)
**Mode:** end-to-end monitor + registry-integrity pass (queue-only; no posting, no DMs sent)
**Run by:** Claude agent (`/dm-responder` skill, full loop)

---

## What ran

No vault entry is `POSTED` and no lead magnet is `active`, so there were **no
live comments to poll and no DMs to send**. The reply protocol (match → reply →
capture → mark) had no triggers to act on. The skill's monitor job ran instead:
verify every comment-keyword CTA has a registry row, check magnet readiness,
and check platform connection state.

## Registry integrity

Comment-keyword CTAs promised in `content-vault.md`:

| Keyword | Entry | Entry status | Registry row | Magnet URL | Active |
|---|---|---|---|---|---|
| CLAUDE | ENTRY 011 | DRAFT | yes | hosted ✅ | no (entry still DRAFT) |
| STACK | ENTRY 005 | READY TO POST | yes | empty | no |
| FOLLOW UP | ENTRY 002 | READY TO POST | yes | empty | no |

> Number-style soft CTAs ("comment the number 1–4", ENTRY 007/010) are
> conversational, not keyword lead-magnets — no registry row required. The
> registry's `TEAM` row points at ENTRY 010 but ENTRY 010 ships a number-CTA,
> so `TEAM` is pre-staged, not yet promised in any entry — not a leak.

**No leaks.** Every keyword a published/ready entry promises has a registry row.
The `CLAUDE` row (added 2026-06-26 to close the earlier leak) is present and
carries a real hosted URL.

## Magnet readiness

- 9 registry rows; **0 active**. `CLAUDE` has a hosted URL
  (`guides.shiftandlead.com/opt-in.html?guide=chez-claude`); the other 8 have
  content drafted under `lead-magnets/` but no hosted `resource_url` yet.
- No magnet can fire until (a) its URL is hosted, (b) its GHL/Unipile workflow
  is built, and (c) the entry carrying the keyword is POSTED.

## Platform connection state (DM rails)

Read from `deploy/.env` (Doppler-managed on the VPS; names only, no values):

- `GHL_API_KEY` — **populated** → Instagram (GHL) comment→DM→capture path credentialed.
- `UNIPILE_API_KEY` + `UNIPILE_DSN` — **populated** → LinkedIn (Unipile) path credentialed.
- `FB_PAGE_TOKEN` — **absent** → Facebook comment→DM loop not credentialed.
- `YOUTUBE_API_KEY` — **absent** → YouTube comment→DM loop not credentialed.

Live DM rails ready to fire the moment a magnet goes active: **Instagram + LinkedIn**.
Still disconnected for the comment→DM loop: **Facebook + YouTube**.

## Leads

- New leads today: **0** (nothing posted → no comment triggers fired).
- No `reports/leads-2026-06.md` created — no leads to capture.
- Top-converting keyword: n/a.

## Operator actions

1. **CLAUDE is the closest-to-live magnet.** When ENTRY 011 is posted, confirm
   the GHL "CLAUDE" comment→DM workflow is live, then flip the CLAUDE row to
   `active=yes`.
2. **STACK + FOLLOW UP are leak risks at publish time.** They ride on READY-TO-POST
   entries (005, 002). The moment either posts without a hosted URL + live
   workflow, the CTA promise breaks. Host those two magnets next.
3. **Optional:** add `FB_PAGE_TOKEN` + `YOUTUBE_API_KEY` to Doppler to extend the
   DM loop to Facebook + YouTube. IG + LinkedIn are already credentialed.

---

**Security check:** queue-only honored — no instant posting, no queue release,
no cold DMs, no auto-DMs (nothing posted to reply to). No secrets read into this
report (names only). Registry is the single source of truth; no URLs invented.
