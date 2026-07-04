# DM Responder (M05) — Monitor Run

**Date:** 2026-06-26T11-26 (UTC)
**Mode:** end-to-end monitor + registry-integrity pass — queue-only, no posting, no DMs sent
**Run by:** Claude agent (`/dm-responder` end-to-end)

---

## Headline — a leak the prior runs missed

Earlier runs today reported `blotato_list_posts → empty` and concluded "nothing
live." That is **no longer true** (and the live history was there to read). The
posts list returns a full publish history, and **two live Instagram posts carry a
comment-keyword CTA that had no registry row:**

| Post id | Date | Platform | Live CTA | Magnet | In registry? |
|---|---|---|---|---|---|
| 4359603 | 2026-05-28 | Instagram | "Comment **BUILD** … my AI Readiness Audit" | AI Readiness Audit | **NO → leak** |
| 4382683 | 2026-05-29 | Instagram | "Comment **BUILD** … the AI Readiness Audit" | AI Readiness Audit | **NO → leak** |

`BUILD → AI Readiness Audit` is **live in production**. It is pre-rebuild legacy
content (the vault was reset 22/06/2026, so these posts aren't in the current
ENTRY 001–011 set) — which is exactly why every prior vault-only integrity check
came back "no leaks." Checking what is *actually published* caught it.

**Action taken:** added a `BUILD` row to `lead-magnets.csv` with `active=no`,
empty `resource_url` (not invented — skill rule / security §1), and a note
documenting the live posts and what the operator must backfill. Leak closed at
the registry level. **It is not closed operationally** until the operator
confirms the GHL "BUILD" workflow + hosted URL (see actions).

No other live post is a lead-magnet keyword CTA — the rest use soft engagement
prompts ("Drop it in the comments", "Which phrase will you try first?") that
deliver no resource and need no row.

## What ran

Queue-only monitor pass. No comment was polled and no DM was sent: the IG
comment→DM loop for live keywords runs natively in GoHighLevel, and this skill
has no GHL/Unipile/FB/YT polling tool wired into this session, so it cannot read
inbound comments or capture leads directly here. All calls were read-only
(`blotato_list_posts`). Security §3.1 (queue-only, human-in-the-loop) honored —
no posting, no queue release, no DMs.

## Registry integrity — after the fix

Keyword CTAs that exist anywhere (current vault **and** live published posts):

| Keyword | Where | Status | Registry row | Magnet URL | Active |
|---|---|---|---|---|---|
| BUILD | Live IG posts (legacy) | **PUBLISHED & circulating** | yes (added today) | empty | no |
| CLAUDE | ENTRY 011 | DRAFT | yes | hosted ✅ | no (entry DRAFT) |
| STACK | ENTRY 005 | READY TO POST | yes | empty | no |
| FOLLOW UP | ENTRY 002 | READY TO POST | yes | empty | no |

No keyword CTA is now without a row → **leak closed.** Number-style soft CTAs
("comment the number 1–4", ENTRY 007/010) remain conversational, not keyword
lead-magnets — no row required.

## Magnet readiness

- **11 registry rows, 0 active.** CLAUDE has a hosted URL; BUILD is live in
  production but its URL is not recorded here; the other 9 have content drafted
  under `lead-magnets/` with no hosted `resource_url` yet.
- The most exposed gap is **BUILD**: it is the only keyword with people able to
  comment it *right now*. If its GHL workflow is live, leads are being captured
  by GHL natively but are **invisible to this logbook** (no `leads-2026-06.md`
  mirror). If the workflow is *not* live, every BUILD comment since 28 May is a
  dropped lead — the exact failure this machine exists to prevent.

## Platform connection state (DM rails)

| Platform | Rail | Credential | Status |
|---|---|---|---|
| Instagram | GoHighLevel | `GHL_API_KEY` | native comment→DM; not pollable from this session |
| LinkedIn | Unipile | `UNIPILE_API_KEY` + `UNIPILE_DSN` | ready once a magnet is active |
| Facebook | Pages API | `FB_PAGE_TOKEN` ❌ | **disconnected** |
| YouTube | Data API v3 | `YOUTUBE_API_KEY` ❌ | **disconnected** |

Blotato publishing accounts are connected (read-only check) — a separate rail
from the DM-automation credentials above.

## Leads

- New leads logged this run: **0** (no pollable inbound in this session).
- No `reports/leads-2026-06.md` exists. If BUILD's GHL workflow is live, real IG
  leads are accruing **only in GHL**, unmirrored here — a measurement blind spot
  for `vault-audit` / `performance-tracker`.
- Top-converting keyword: n/a from this session.

## Operator actions (priority order)

1. **BUILD — confirm the loop is intact (URGENT).** It is your only keyword that
   is live and comment-able today. Verify the GHL "BUILD" workflow is firing the
   DM + capturing the email; paste the hosted AI Readiness Audit URL into the new
   `BUILD` row in `lead-magnets.csv`; then set `active=yes`. If the workflow is
   NOT live, every BUILD comment since 28 May was a missed lead.
2. **Close the GHL→logbook blind spot.** Decide whether GHL is the system of
   record for IG leads (then `vault-audit` should read GHL) or whether this skill
   should mirror them into `reports/leads-YYYY-MM.md`. Right now neither happens.
3. **CLAUDE is next to go live.** When ENTRY 011 posts, confirm the GHL "CLAUDE"
   workflow, then flip its row to `active=yes`.
4. **STACK / FOLLOW UP will leak the moment ENTRY 005 / 002 post** — both ride on
   READY-TO-POST entries with no hosted URL and no live workflow. Host + paste
   URLs before releasing those entries.
5. **Wire FB + YouTube** (`FB_PAGE_TOKEN`, `YOUTUBE_API_KEY`) when you want the
   comment→DM loop on those platforms.
