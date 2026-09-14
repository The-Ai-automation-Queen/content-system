# Review Cockpit — state

Append-only-ish working state for the digest/process loop. Latest served
digest is authoritative for card-number → entry mapping until the next
digest run overwrites it.

## Telegram offset

- Last `getUpdates` consumed offset: none pending (queue was empty at both
  the pre-digest process sweep and the post-send check on 14/09/2026).
- Next `process` run should call `getUpdates` with no offset filter until a
  reply produces an `update_id` to anchor to.

## Last digest served — 14/09/2026 (07:30 GST slot, run on operator request)

Header message_id: 974
Footer message_id: 984

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 095 | 975 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #2 | ENTRY 094 | 976 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| #3 | ENTRY 090 | 977 | LinkedIn | Real Talk | 7.0 | community tease — CTA-BLOCKED (PREP: Whop link) |
| #4 | ENTRY 089 | 978 | LinkedIn | Time Wins | 7.8 | AI Time Audit $47 — CTA-BLOCKED (PREP: Whop checkout link) |
| #5 | ENTRY 085 | 979 | LinkedIn | Real Talk | 7.5 | STACK (live) |
| #6 | ENTRY 083 | 980 | LinkedIn | What's Worth It | 7.5 | community waitlist — CTA-BLOCKED (PREP: link) |
| R1 | ENTRY 047 | 981 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (62d) |
| R2 | ENTRY 048 | 982 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (62d) |
| R3 | ENTRY 049 | 983 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (62d) |

Notes:
- DRAFT pool at digest time: 29 entries. 6 shown; 23 rotate in on future runs.
- Ready shelf at digest time: 37 READY TO POST entries, all 62+ days old
  (oldest batch dated 14/07/2026 — every READY TO POST entry in the vault
  already qualifies for the shelf). Shelf cap of 3/digest means the other
  34 wait for subsequent runs; flagged to operator in the briefing.
- No replies processed this run (getUpdates queue was empty before and
  after send — this appears to be the first digest actually served via
  this skill; decisions-log.md's only entries predate it, from in-chat
  kills on 14/07/2026).
