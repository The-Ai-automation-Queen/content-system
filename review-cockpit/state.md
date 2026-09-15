# Review Cockpit — state

Append-only-ish working state for the digest/process loop. Latest served
digest is authoritative for card-number → entry mapping until the next
digest run overwrites it.

## Telegram offset

- Last `getUpdates` consumed offset: still none pending — checked again
  pre-digest on 15/09/2026 (run on operator request), queue empty
  (`{"ok":true,"result":[]}`). No card replies, no unblocker replies, no
  voice notes since the 14/09/2026 digest.
- Next `process` run should call `getUpdates` with no offset filter until a
  reply produces an `update_id` to anchor to.

## Process sweeps log

- 14/09/2026 ~20:30 GST — operator-requested sweep. `getUpdates` empty.
  Nothing to route, nothing applied to the vault, nothing added to
  decisions-log.md. All 9 cards from the 07:30 digest (#1–#6, R1–R3) remain
  outstanding. Sent one confirmation line to Telegram per skill step 5
  (message_id 991).
- 15/09/2026 — pre-digest sweep (operator-requested digest run; the
  scheduled 07:30 cron for today only did a git sync, no send — see
  `deploy/logs/review-cockpit digest-2026-09-15T07-30-02.log`). `getUpdates`
  (no offset, none stored) returned empty. Nothing to route, nothing applied
  to the vault. All 9 cards from the 14/09 digest were still outstanding
  going into this run.

## Last digest served — 15/09/2026 (run on operator request)

Header message_id: 992
Footer message_id: 1002

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 095 | 993 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #2 | ENTRY 094 | 994 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| #3 | ENTRY 090 | 995 | LinkedIn | Real Talk | 7.0 | community tease — CTA-BLOCKED (PREP: Whop link) |
| #4 | ENTRY 089 | 996 | LinkedIn | Time Wins | 7.8 | AI Time Audit $47 — CTA-BLOCKED (PREP: Whop checkout link) |
| #5 | ENTRY 085 | 997 | LinkedIn | Real Talk | 7.5 | STACK (live) |
| #6 | ENTRY 083 | 998 | LinkedIn | What's Worth It | 7.5 | community waitlist — CTA-BLOCKED (PREP: link) |
| R1 | ENTRY 047 | 999 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (63d) |
| R2 | ENTRY 048 | 1000 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (63d) |
| R3 | ENTRY 049 | 1001 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (63d) |

Notes:
- Same 9 entries as the 14/09 digest (#1–#6, R1–R3) — nothing changed
  upstream (no replies, no new production, no kills) since that run, so the
  DRAFT-newest-six and Ready-shelf-oldest-three selection was identical.
  The 14/09 cards (message_ids 975–983) are superseded by this run's
  975→993 etc.; treat this table as authoritative for card→entry mapping
  until the next digest.
- DRAFT pool at digest time: 29 entries. 6 shown; 23 rotate in on future runs.
- Ready shelf at digest time: 37 READY TO POST entries, all 63+ days old
  (oldest batch dated 14/07/2026 — every READY TO POST entry in the vault
  already qualifies for the shelf). Shelf cap of 3/digest means the other
  34 wait for subsequent runs; flagged to operator in the briefing.
- No replies processed this run (getUpdates queue was empty before and
  after send). decisions-log.md unchanged.
