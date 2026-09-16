# Review Cockpit — state

Append-only-ish working state for the digest/process loop. Latest served
digest is authoritative for card-number → entry mapping until the next
digest run overwrites it.

## Telegram offset

- Last `getUpdates` consumed offset: still none pending — checked again
  on 16/09/2026 (operator-requested `digest` run), queue empty
  (`{"ok":true,"result":[]}`). No card replies, no unblocker replies, no
  voice notes since the 15/09/2026 digest.
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
- 15/09/2026 ~12:32 GST (operator-requested `process` run) — `getUpdates`
  (no offset) returned empty (`{"ok":true,"result":[]}`). Nothing to route:
  no card decisions, no unblocker replies, no voice notes. Nothing applied
  to the vault, decisions-log.md unchanged. All 9 cards from the 15/09
  digest (#1–#6, R1–R3) remain outstanding. Sent one confirmation line to
  Telegram (message_id 1003).
- 15/09/2026 (operator-requested `process` run, this run) — `getUpdates`
  (no offset) returned empty (`{"ok":true,"result":[]}`). Nothing to route:
  no card decisions, no unblocker replies, no voice notes. Nothing applied
  to the vault (still 37 READY TO POST / 29 DRAFT / 6 STALE / 2 KILLED,
  matching the reality-check hook), decisions-log.md unchanged. All 9 cards
  from the 15/09 digest (#1–#6, R1–R3) remain outstanding. Sent one
  confirmation line to Telegram (message_id 1004).
- 16/09/2026 (operator-requested `digest` run, pre-digest sweep) —
  `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes. Nothing applied to the vault (37 READY
  TO POST / 33 DRAFT / 6 STALE / 2 KILLED, matching the reality-check hook —
  DRAFT count rose 29→33 since 15/09 from the overnight content-engine
  runs), decisions-log.md unchanged. All 9 cards from the 15/09 digest
  (#1–#6, R1–R3) go stale as of this run, superseded by the digest below.
- 16/09/2026 (operator-requested `process` run, this run — scheduled 12:30
  cron already ran today per `deploy/logs/review-cockpit
  process-2026-09-16T12-30-02.log`) — `getUpdates` (no offset, none stored)
  returned empty (`{"ok":true,"result":[]}`). Nothing to route: no card
  decisions, no unblocker replies, no voice notes. Nothing applied to the
  vault (still 37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED, matching
  the reality-check hook), decisions-log.md unchanged. All 9 cards from the
  16/09 digest (#1–#6, R1–R3) remain outstanding. Sent one confirmation line
  to Telegram (message_id 1017).

## Last digest served — 16/09/2026 (run on operator request)

Header message_id: 1005
Footer message_id: 1015

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1006 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1007 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1008 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1009 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1010 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1011 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1012 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (64d) |
| R2 | ENTRY 048 | 1013 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (64d) |
| R3 | ENTRY 049 | 1014 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (64d) |

Notes:
- DRAFT pool shifted since 15/09: entries 090/089/085/083 (previous #3–#6)
  aged out of the top-6-newest window because the overnight content-engine
  run added 4 newer DRAFTs (096–099, dated 16/09/2026) ahead of them. New
  top-6 by date: 099, 098, 097, 096 (all 16/09), then 095 (30/07), 094 (24/07).
  090/089/085/083 remain in the DRAFT pool and will rotate back in on a
  future digest.
- Ready shelf unchanged from 15/09 (047/048/049) — no approvals or kills
  landed since then, so the oldest-three selection is identical, now at 64d.
- DRAFT pool at digest time: 33 entries. 6 shown; 27 rotate in on future runs.
- Ready shelf at digest time: 37 READY TO POST entries, all 64+ days old
  (oldest batch dated 14/07/2026 — every READY TO POST entry in the vault
  already qualifies for the shelf). Shelf cap of 3/digest means the other
  34 wait for subsequent runs; flagged to operator in the briefing.
- No replies processed this run (getUpdates queue was empty before and
  after send). decisions-log.md unchanged.
- SCHEDULED count not confirmed: the only distribution report on file
  (`reports/distribution-2026-07-20.md`) is 58 days stale and recorded
  "Blotato MCP not connected" at that time — footer flagged this as
  unconfirmed rather than reporting a stale number as current.
