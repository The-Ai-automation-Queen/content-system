# Review Cockpit — state

Append-only-ish working state for the digest/process loop. Latest served
digest is authoritative for card-number → entry mapping until the next
digest run overwrites it.

## Telegram offset

- Last `getUpdates` consumed offset: still none pending — checked again
  on 04/10/2026 (operator-requested `digest` run, pre-digest sweep), queue
  empty (`{"ok":true,"result":[]}`). No card replies, no unblocker
  replies, no voice notes since the 14/09/2026 digest (46th consecutive
  empty sweep).
- Next `process` run should call `getUpdates` with no offset filter until a
  reply produces an `update_id` to anchor to.

## Process sweeps log

- 04/10/2026, second sweep after digest (operator-requested `process` run,
  this run — run end to end per operator request via `/review-cockpit
  process`, obeying `CLAUDE.md` and `security.md`; the skill is not
  registered via the Skill tool in this session, so `SKILL.md` was read and
  followed manually per the `project-skills-not-registered` memory).
  `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 48th consecutive empty sweep since the
  14/09/2026 digest. Vault counts reconfirmed directly from
  `content-vault.md`'s `## ENTRY ... |` status suffixes: 37 READY TO POST /
  33 DRAFT / 6 STALE / 2 KILLED (78 entries total) — matches this session's
  reality-check hook exactly. `unblocker/ledger.md` checked — open queue
  items (UNB-025–029) are pre-existing unblocker blockers awaiting a human
  pass (UNB-029 served earlier today per the day's `unblocker daily` run),
  not review-cockpit replies; not touched by this skill. `lead-magnets.csv`
  reconfirmed: WORDS and TEAM both `active=yes` — no CTA-BLOCKED needed for
  R1–R3. `decisions-log.md` tail checked, unchanged (last entries are the
  14/07 exit-story kills). Nothing applied to the vault. All 9 cards from
  the 04/10 digest (#1–#6, R1–R3, message_ids 1254–1262) remain outstanding.
  Publishing stayed queue-only throughout (`security.md` §3.1, `CLAUDE.md`)
  — no post released, no Blotato queue touched. Confirmation sent to
  Telegram (message_id 1266).

- 04/10/2026, sweep after digest (operator-requested `process` run, this
  run — run end to end per operator request via `/review-cockpit process`,
  obeying `CLAUDE.md` and `security.md`). `getUpdates` (no offset, none
  stored) returned empty (`{"ok":true,"result":[]}`). Nothing to route: no
  card decisions, no unblocker replies, no voice notes — 47th consecutive
  empty sweep since the 14/09/2026 digest. Vault counts reconfirmed
  directly from `content-vault.md`'s `## ENTRY ... |` status suffixes: 37
  READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED (78 entries
  total) — matches this session's reality-check hook exactly.
  `unblocker/ledger.md` checked — open queue items (UNB-025–029) are
  pre-existing unblocker blockers awaiting a human pass (UNB-029 served
  today per the day's earlier `unblocker daily` run), not review-cockpit
  replies; not touched by this skill. `lead-magnets.csv` reconfirmed: WORDS
  and TEAM both `active=yes` — no CTA-BLOCKED needed for R1–R3.
  `decisions-log.md` tail checked, unchanged (last entries are the 14/07
  exit-story kills). Nothing applied to the vault. All 9 cards from the
  04/10 digest (#1–#6, R1–R3, message_ids 1254–1262) remain outstanding.
  Publishing stayed queue-only throughout (`security.md` §3.1, `CLAUDE.md`)
  — no post released, no Blotato queue touched. Confirmation sent to
  Telegram (message_id 1265).

- 04/10/2026 — pre-digest sweep (operator-requested `digest` run, run
  end-to-end per operator request via `/review-cockpit digest`, obeying
  `CLAUDE.md` and `security.md`; today's scheduled 07:30 cron
  (`deploy/logs/review-cockpit digest-2026-10-04T07-30-01.log`) only did a
  git sync, no actual send — this is the first real send today).
  `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 46th consecutive empty sweep since
  the 14/09/2026 digest. Vault counts reconfirmed directly from
  `content-vault.md`'s `## ENTRY ... |` status suffixes: 37 READY TO POST /
  33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED (78 entries total) — matches
  this session's reality-check hook exactly. `unblocker/ledger.md`
  checked — open queue items are pre-existing unblocker blockers awaiting
  a human pass, not review-cockpit replies; not touched by this skill.
  `lead-magnets.csv` reconfirmed: WORDS and TEAM both `active=yes` — no
  CTA-BLOCKED needed for R1–R3. `decisions-log.md` tail checked,
  unchanged (last entries are the 14/07 exit-story kills). Nothing applied
  to the vault. All 9 cards from the 03/10 digest (#1–#6, R1–R3,
  message_ids 1241–1250) go stale as of this run, superseded by the
  digest below. Digest send followed immediately (header message_id 1253,
  cards 1254–1262, footer message_id 1263; no separate confirmation line —
  the digest send itself is this run's output per skill step 3).
  Publishing stayed queue-only throughout (`security.md` §3.1,
  `CLAUDE.md`) — no post released, no Blotato queue touched.

- 03/10/2026, second sweep after digest (operator-requested `process` run,
  this run — run end to end per operator request via `/review-cockpit
  process`, obeying `CLAUDE.md` and `security.md`). `getUpdates` (no
  offset, none stored) returned empty (`{"ok":true,"result":[]}`). Nothing
  to route: no card decisions, no unblocker replies, no voice notes — 45th
  consecutive empty sweep since the 14/09/2026 digest. Vault counts
  reconfirmed directly from `content-vault.md`'s `## ENTRY ... |` status
  suffixes: 37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED (78
  entries total) — matches this session's reality-check hook exactly.
  `unblocker/ledger.md` checked — all 4 queue items (UNB-025–028) remain
  past their own serve-3 confrontation with zero reply (2–17 days), no
  serve-4 rule, not touched by this skill; stale-branch count 76→74 per
  today's earlier `unblocker daily` run. `lead-magnets.csv` reconfirmed:
  WORDS and TEAM both `active=yes` — no CTA-BLOCKED needed for R1–R3.
  `decisions-log.md` tail checked, unchanged (last entries are the 14/07
  exit-story kills). Nothing applied to the vault. All 9 cards from the
  03/10 digest (#1–#6, R1–R3, message_ids 1241–1250) remain outstanding.
  Publishing stayed queue-only throughout (`security.md` §3.1, `CLAUDE.md`)
  — no post released, no Blotato queue touched. Confirmation sent to
  Telegram (message_id 1252).

- 03/10/2026, sweep after digest (operator-requested `process` run, this
  run — run end to end per operator request via `/review-cockpit process`,
  obeying `CLAUDE.md` and `security.md`; today's scheduled 12:30 cron
  (`deploy/logs/review-cockpit process-2026-10-03T12-30-02.log`) only did a
  git sync, no actual sweep — this is the first real sweep since this
  morning's digest). `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 44th consecutive empty sweep since
  the 14/09/2026 digest. Vault counts reconfirmed directly from
  `content-vault.md`'s `## ENTRY ... |` status suffixes: 37 READY TO POST /
  33 DRAFT / 6 STALE / 2 KILLED (0 POSTED) — matches this session's
  reality-check hook exactly. `unblocker/ledger.md` checked — open queue
  items are pre-existing unblocker blockers awaiting a human pass, not
  review-cockpit replies; not touched by this skill. `lead-magnets.csv`
  reconfirmed: WORDS and TEAM both `active=yes` — no CTA-BLOCKED needed for
  R1–R3. Nothing applied to the vault, `decisions-log.md` unchanged. All 9
  cards from the 03/10 digest (#1–#6, R1–R3, message_ids 1241–1250) remain
  outstanding. Publishing stayed queue-only throughout (`security.md` §3.1,
  `CLAUDE.md`) — no post released, no Blotato queue touched. Confirmation
  sent to Telegram (message_id 1251).

- 03/10/2026 — pre-digest sweep (operator-requested `digest` run, run
  end-to-end per operator request via `/review-cockpit digest`, obeying
  `CLAUDE.md` and `security.md`; today's scheduled 07:30 cron
  (`deploy/logs/review-cockpit digest-2026-10-03T07-30-02.log`) only did a
  git sync, no actual send — this is the first real send today).
  `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 43rd consecutive empty sweep since
  the 14/09/2026 digest. Vault counts reconfirmed directly from
  `content-vault.md`'s `## ENTRY ... |` status suffixes: 37 READY TO POST /
  33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED (78 entries total) — matches
  this session's reality-check hook exactly. `unblocker/ledger.md`
  checked — open queue items (UNB-025–028) are pre-existing unblocker
  blockers awaiting a human pass, not review-cockpit replies; not touched
  by this skill. `lead-magnets.csv` reconfirmed: WORDS and TEAM both
  `active=yes` — no CTA-BLOCKED needed for R1–R3. Nothing applied to the
  vault, `decisions-log.md` unchanged. All 9 cards from the 02/10 digest
  (#1–#6, R1–R3, message_ids 1228–1236) go stale as of this run, superseded
  by the digest below. Digest send followed immediately (header message_id
  1240, footer message_id 1250; no separate confirmation line — the digest
  send itself is this run's output per skill step 3). Publishing stayed
  queue-only throughout (`security.md` §3.1, `CLAUDE.md`) — no post
  released, no Blotato queue touched.

- 02/10/2026, third sweep today (operator-requested `process` run, this
  run — run end to end per operator request via `/review-cockpit process`,
  obeying `CLAUDE.md` and `security.md`) — `getUpdates` (no offset, none
  stored) returned empty (`{"ok":true,"result":[]}`). Nothing to route: no
  card decisions, no unblocker replies, no voice notes — 42nd consecutive
  empty sweep since the 14/09/2026 digest. Vault counts reconfirmed
  directly from `content-vault.md`'s `## ENTRY ... |` status suffixes: 37
  READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED (78 entries
  total) — matches this session's reality-check hook exactly.
  `unblocker/ledger.md` checked — open queue items (UNB-025, UNB-026,
  UNB-027, UNB-028) are pre-existing unblocker blockers awaiting a human
  pass, not review-cockpit replies; not touched by this skill. Nothing
  applied to the vault, `decisions-log.md` unchanged. The 9 cards from the
  02/10 digest (#1–#6, R1–R3, message_ids 1228–1236) remain outstanding.
  Publishing stayed queue-only throughout (`security.md` §3.1, `CLAUDE.md`)
  — no post released, no Blotato queue touched. Confirmation sent to
  Telegram (message_id 1239).

- 02/10/2026, second sweep today (operator-requested `process` run, this
  run — run end to end per operator request via `/review-cockpit process`,
  obeying `CLAUDE.md` and `security.md`) — `getUpdates` (no offset, none
  stored) returned empty (`{"ok":true,"result":[]}`). Nothing to route: no
  card decisions, no unblocker replies, no voice notes — 41st consecutive
  empty sweep since the 14/09/2026 digest. Vault counts reconfirmed
  directly from `content-vault.md`'s `## ENTRY ... |` status suffixes: 37
  READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED (78 entries
  total) — matches this session's reality-check hook exactly.
  `unblocker/ledger.md` checked — open queue items (UNB-025, UNB-026,
  UNB-027, UNB-028) are pre-existing unblocker blockers awaiting a human
  pass, not review-cockpit replies; not touched by this skill. Nothing
  applied to the vault, `decisions-log.md` unchanged. The 9 cards from the
  02/10 digest (#1–#6, R1–R3, message_ids 1228–1236) remain outstanding.
  Publishing stayed queue-only throughout (`security.md` §3.1, `CLAUDE.md`)
  — no post released, no Blotato queue touched. Confirmation sent to
  Telegram (message_id 1238).

- 02/10/2026 — pre-digest sweep (operator-requested `digest` run, run
  end-to-end per operator request via `/review-cockpit digest`, obeying
  `CLAUDE.md` and `security.md`; today's scheduled 07:30 cron
  (`deploy/logs/review-cockpit digest-2026-10-02T07-30-02.log`) only did a
  git sync, no actual send — this is the first real send today).
  `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 40th consecutive empty sweep since
  the 14/09/2026 digest. Vault counts reconfirmed directly from
  `content-vault.md`'s `## ENTRY ... |` status suffixes: 37 READY TO POST /
  33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED — matches this session's
  reality-check hook exactly. `unblocker/ledger.md` checked — open items
  under `## Entries`/`## Queue` are pre-existing unblocker blockers, not
  review-cockpit replies; not touched by this skill. `lead-magnets.csv`
  reconfirmed: WORDS and TEAM both `active=yes` — no CTA-BLOCKED needed for
  R1–R3. Nothing applied to the vault, `decisions-log.md` unchanged. All 9
  cards from the 01/10 digest (#1–#6, R1–R3, message_ids 1214–1222) go
  stale as of this run, superseded by the digest below. Digest send
  followed immediately (header message_id 1227; no separate confirmation
  line — the digest send itself is this run's output per skill step 3).
  Publishing stayed queue-only throughout (`security.md` §3.1, `CLAUDE.md`)
  — no post released, no Blotato queue touched. Note: three card messages
  (#3, R1, R2) have a cosmetic `%%` instead of `%` in the body text — a
  shell-escaping slip while sending via curl, harmless (doesn't change
  meaning), logged here for transparency, no vault or decision impact.

- 01/10/2026, third sweep today (operator-requested `process` run, this
  run — run end to end per operator request via `/review-cockpit process`,
  obeying `CLAUDE.md` and `security.md`) — `getUpdates` (no offset, none
  stored) returned empty (`{"ok":true,"result":[]}`). Nothing to route: no
  card decisions, no unblocker replies, no voice notes — 39th consecutive
  empty sweep since the 14/09/2026 digest. Vault counts reconfirmed
  directly from `content-vault.md`'s `## ENTRY ... |` status suffixes: 37
  READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED (78 entries
  total) — matches this session's reality-check hook exactly. `unblocker/
  ledger.md` checked — open items under `## Entries` and the `## Queue`
  (UNB-025–028) are pre-existing unblocker blockers awaiting a human pass,
  not review-cockpit replies; not touched by this skill. Nothing applied to
  the vault, `decisions-log.md` unchanged. All 9 cards from the 01/10
  digest (#1–#6, R1–R3, message_ids 1214–1222) remain outstanding.
  Publishing stayed queue-only throughout (`security.md` §3.1, `CLAUDE.md`)
  — no post released, no Blotato queue touched. Confirmation sent to
  Telegram (message_id 1226).

- 01/10/2026, second sweep today (operator-requested `process` run, this
  run — run end to end per operator request via `/review-cockpit process`,
  obeying `CLAUDE.md` and `security.md`) — `getUpdates` (no offset, none
  stored) returned empty (`{"ok":true,"result":[]}`). Nothing to route: no
  card decisions, no unblocker replies, no voice notes — 38th consecutive
  empty sweep since the 14/09/2026 digest. Vault counts reconfirmed
  directly from `content-vault.md`'s `## ENTRY ... |` status suffixes: 37
  READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED — matches this
  session's reality-check hook exactly. `unblocker/ledger.md` checked —
  open items under `## Entries` are pre-existing unblocker blockers
  awaiting a human pass, not review-cockpit replies; not touched by this
  skill. Nothing applied to the vault, `decisions-log.md` unchanged. All 9
  cards from the 01/10 digest (#1–#6, R1–R3, message_ids 1214–1222) remain
  outstanding. Publishing stayed queue-only throughout (`security.md` §3.1,
  `CLAUDE.md`) — no post released, no Blotato queue touched. Confirmation
  sent to Telegram (message_id 1225).

- 01/10/2026 — pre-digest sweep (operator-requested `digest` run, run
  end-to-end per operator request via `/review-cockpit digest`, obeying
  `CLAUDE.md` and `security.md`). `getUpdates` (no offset, none stored)
  returned empty (`{"ok":true,"result":[]}`). Nothing to route: no card
  decisions, no unblocker replies, no voice notes — 37th consecutive empty
  sweep since the 14/09/2026 digest. Vault counts reconfirmed directly
  from `content-vault.md`'s `## ENTRY ... |` status suffixes: 37 READY TO
  POST / 33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED — matches this session's
  reality-check hook exactly. Nothing applied to the vault,
  decisions-log.md unchanged. All 9 cards from the 30/09 digest (#1–#6,
  R1–R3, message_ids 1200–1208) go stale as of this run, superseded by the
  digest below. Digest send followed immediately (no separate confirmation
  line — the digest send itself is this run's output per skill step 3).
  Publishing stayed queue-only throughout (`security.md` §3.1, `CLAUDE.md`)
  — no post released, no Blotato queue touched.

- 30/09/2026, second sweep this session (operator-requested `process` run,
  this run — run end to end per operator request via `/review-cockpit
  process`, obeying `CLAUDE.md` and `security.md`). `getUpdates` (no
  offset, none stored) returned empty (`{"ok":true,"result":[]}`). Nothing
  to route: no card decisions, no unblocker replies, no voice notes — 36th
  consecutive empty sweep since the 14/09/2026 digest. Vault counts
  reconfirmed directly from `content-vault.md`'s `## ENTRY ... |` status
  suffixes: 37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED —
  matches this session's reality-check hook exactly. `unblocker/ledger.md`
  checked — open items under `## Entries` are pre-existing unblocker
  blockers awaiting a human pass, not review-cockpit replies; not touched
  by this skill. Nothing applied to the vault, `decisions-log.md`
  unchanged. Confirmation sent to Telegram (message_id 1212). Publishing
  stayed queue-only throughout (`security.md` §3.1, `CLAUDE.md`) — no post
  released, no Blotato queue touched.

- 30/09/2026 — operator-requested `process` run, run end to end per
  operator request, via `/review-cockpit process`. `getUpdates` (no offset,
  none stored) returned empty (`{"ok":true,"result":[]}`). Nothing to
  route: no card decisions, no unblocker replies, no voice notes — 35th
  consecutive empty sweep since the 14/09/2026 digest. Vault counts
  reconfirmed directly from `content-vault.md`'s `## ENTRY ... |` status
  suffixes: 37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED —
  matches this session's reality-check hook exactly. `unblocker/ledger.md`
  checked — open items (UNB-025–028 range) are pre-existing unblocker
  blockers awaiting a human pass, not review-cockpit replies; not touched
  by this skill. Nothing applied to the vault, `decisions-log.md`
  unchanged. Confirmation sent to Telegram. Publishing stayed queue-only
  throughout (`security.md` §3.1, `CLAUDE.md`) — no post released, no
  Blotato queue touched.

- 30/09/2026 — pre-digest sweep (operator-requested `digest` run, run
  end-to-end per operator request, via `/review-cockpit digest`).
  `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 34th consecutive empty sweep since
  the 14/09/2026 digest. `unblocker/ledger.md` checked — open items
  (UNB-025–028 range) are pre-existing unblocker blockers, not
  review-cockpit replies. Nothing applied to the vault (37 READY TO POST /
  33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED, recomputed directly from
  `content-vault.md`'s `## ENTRY ... |` status suffixes and matching this
  session's reality-check hook), decisions-log.md unchanged. All 9 cards
  from the 29/09 digest (#1–#6, R1–R3, message_ids 1186–1194) go stale as
  of this run, superseded by the digest below. Digest send followed
  immediately (no separate confirmation line — the digest send itself is
  this run's output per skill step 3). Publishing stayed queue-only
  throughout (`security.md` §3.1, `CLAUDE.md`) — no post released, no
  Blotato queue touched.

- 29/09/2026, third sweep today (operator-requested `process` run, this
  run — end to end per operator request, via `/review-cockpit process`) —
  `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 33rd consecutive empty sweep since
  the 14/09/2026 digest. `unblocker/ledger.md` checked — open items under
  `## Entries` (UNB-018–028 range) are pre-existing unblocker blockers, not
  review-cockpit replies, so nothing to route there either. Nothing applied
  to the vault (37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED,
  recomputed directly from `content-vault.md`'s `## ENTRY ... |` status
  suffixes and matching this session's reality-check hook), decisions-log.md
  unchanged. All 9 cards from the 29/09 digest (#1–#6, R1–R3, message_ids
  1186–1194) remain outstanding. Publishing stayed queue-only throughout
  (`security.md` §3.1, `CLAUDE.md`) — no post released, no Blotato queue
  touched. Confirmation sent to Telegram (message_id 1198).

- 29/09/2026, second sweep today (operator-requested `process` run, this
  run — end to end per operator request, via `/review-cockpit process`;
  the scheduled 12:30 cron today only did a git sync, no actual sweep, per
  `deploy/logs/review-cockpit process-2026-09-29T12-30-02.log`) —
  `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 32nd consecutive empty sweep since
  the 14/09/2026 digest. `unblocker/ledger.md` checked — no `## Open`
  section exists (only Done/Killed), so no pending unblocker items either.
  Nothing applied to the vault (37 READY TO POST / 33 DRAFT / 6 STALE / 2
  KILLED / 0 POSTED, recomputed directly from `content-vault.md`'s
  `## ENTRY ... |` status suffixes and matching this session's
  reality-check hook), decisions-log.md unchanged. All 9 cards from the
  29/09 digest (#1–#6, R1–R3, message_ids 1186–1194) remain outstanding.
  Publishing stayed queue-only throughout (`security.md` §3.1, `CLAUDE.md`)
  — no post released, no Blotato queue touched. Confirmation sent to
  Telegram (message_id 1197).
- 29/09/2026 — pre-digest sweep (operator-requested `digest` run, run
  end-to-end per operator request). `getUpdates` (no offset, none stored)
  returned empty (`{"ok":true,"result":[]}`). Nothing to route: no card
  decisions, no unblocker replies, no voice notes — 31st consecutive empty
  sweep since the 14/09/2026 digest. Nothing applied to the vault (37 READY
  TO POST / 33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED, recomputed directly
  from `content-vault.md`'s `## ENTRY ... |` status suffixes and matching
  this session's reality-check hook). All 9 cards from the 25/09 digest
  (#1–#6, R1–R3) go stale as of this run, superseded by the digest below.
  Digest send followed immediately (no separate confirmation line — the
  digest send itself is this run's output per skill step 3). Publishing
  stayed queue-only throughout (`security.md` §3.1, `CLAUDE.md`) — no post
  released, no Blotato queue touched.

- 28/09/2026, second sweep today (operator-requested `process` run, this
  run — end to end per operator request, via `/review-cockpit process`)
  — `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 30th consecutive empty sweep since
  the 14/09/2026 digest. `unblocker/ledger.md` checked — 27 open items
  (UNB-018–028 range) are pre-existing unblocker blockers, not
  review-cockpit replies. Nothing applied to the vault (37 READY TO POST /
  33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED, recomputed directly from
  `content-vault.md`'s `## ENTRY ... |` status suffixes and matching this
  session's reality-check hook), decisions-log.md unchanged. All 9 cards
  from the 25/09 digest (#1–#6, R1–R3) remain outstanding — no digest has
  been served since 25/09. Publishing stayed queue-only throughout
  (`security.md` §3.1, `CLAUDE.md`) — no post released, no Blotato queue
  touched. Confirmation sent to Telegram (message_id 1184).
- 28/09/2026 (operator-requested `process` run, this run — end to end per
  operator request; all three scheduled crons since 26/09 (`digest`
  26/09–27/09–28/09 07:30, `process` 26/09–27/09 12:30/20:30) failed with
  "You've hit your weekly limit · resets Sep 28, 10am (UTC)" per
  `deploy/logs/`, so no digest or sweep actually ran between the 25/09
  process sweep and this one) — `getUpdates` (no offset, none stored)
  returned empty (`{"ok":true,"result":[]}`). Nothing to route: no card
  decisions, no unblocker replies, no voice notes — 29th consecutive empty
  sweep since the 14/09/2026 digest. `unblocker/ledger.md` checked — open
  items (UNB-018–028) are pre-existing unblocker blockers, not
  review-cockpit replies. Nothing applied to the vault (37 READY TO POST /
  33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED, recomputed directly from
  `content-vault.md`'s `## ENTRY ... |` status suffixes and matching this
  session's reality-check hook), decisions-log.md unchanged. All 9 cards
  from the 25/09 digest (#1–#6, R1–R3) remain outstanding — no digest has
  been served since 25/09 (the 26/09–28/09 07:30 crons all hit the weekly
  limit before sending). Publishing stayed queue-only throughout
  (`security.md` §3.1, `CLAUDE.md`) — no post released, no Blotato queue
  touched. Confirmation sent to Telegram (message_id 1183), which also
  flagged the cron outage to the operator.
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
- 16/09/2026 (operator-requested `process` run, second sweep today) —
  `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes. Nothing applied to the vault (still 37
  READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED per header-line count in
  `content-vault.md`, matching the reality-check hook), decisions-log.md
  unchanged. All 9 cards from the 16/09 digest (#1–#6, R1–R3) remain
  outstanding. Sent one confirmation line to Telegram (message_id 1018).

- 17/09/2026 — pre-digest sweep (operator-requested `digest` run). `getUpdates`
  (no offset, none stored) returned empty (`{"ok":true,"result":[]}`).
  Nothing to route, nothing applied to the vault. All 9 cards from the 16/09
  digest (#1–#6, R1–R3) go stale as of this run, superseded by the digest
  below. Digest send followed immediately (no separate confirmation line —
  the digest send itself is this run's output per skill step 3).

- 18/09/2026 — pre-digest sweep (operator-requested `digest` run). `getUpdates`
  (no offset, none stored) returned empty (`{"ok":true,"result":[]}`).
  Nothing to route: no card decisions, no unblocker replies, no voice notes
  — sixth consecutive empty sweep since the 14/09 digest. Nothing applied to
  the vault (37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED, matching the
  reality-check hook and confirmed against `content-vault.md`'s exact status
  tally), decisions-log.md unchanged. All 9 cards from the 17/09 digest
  (#1–#6, R1–R3) go stale as of this run, superseded by the digest below.
  Digest send followed immediately (no separate confirmation line — the
  digest send itself is this run's output per skill step 3).

- 18/09/2026 ~20:xx GST (operator-requested `process` run, this run — the
  scheduled 12:30 cron only did a git sync per `deploy/logs/review-cockpit
  process-2026-09-18T12-30-02.log`, no actual sweep) — `getUpdates` (no
  offset, none stored) returned empty (`{"ok":true,"result":[]}`). Nothing
  to route: no card decisions, no unblocker replies, no voice notes —
  seventh consecutive empty sweep since the 14/09 digest. Nothing applied to
  the vault (still 37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED per the
  reality-check hook), decisions-log.md unchanged. All 9 cards from the
  18/09 digest (#1–#6, R1–R3) remain outstanding. Confirmation sent to
  Telegram (message_id 1044).
- 18/09/2026 ~20:3x GST (operator-requested `process` run, second sweep
  today — end-to-end run per operator request) — `getUpdates` (no offset,
  none stored) returned empty (`{"ok":true,"result":[]}`). Nothing to
  route: no card decisions, no unblocker replies, no voice notes — eighth
  consecutive empty sweep since the 14/09 digest. Nothing applied to the
  vault (still 37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED per the
  reality-check hook and reconfirmed against `content-vault.md`),
  decisions-log.md unchanged. All 9 cards from the 18/09 digest (#1–#6,
  R1–R3) remain outstanding. Confirmation sent to Telegram (message_id 1045).

- 19/09/2026 — pre-digest sweep (operator-requested `digest` run, run end-to-end
  per operator request). `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — ninth consecutive empty sweep since the
  14/09/2026 digest. Nothing applied to the vault (37 READY TO POST / 33
  DRAFT / 6 STALE / 2 KILLED, matching this session's reality-check hook and
  confirmed against `content-vault.md`'s exact header-line status tally),
  decisions-log.md unchanged. All 9 cards from the 18/09 digest (#1–#6,
  R1–R3) go stale as of this run, superseded by the digest below. Digest
  send followed immediately (no separate confirmation line — the digest
  send itself is this run's output per skill step 3).

- 19/09/2026 ~evening GST (operator-requested `process` run, this run —
  end-to-end per operator request) — `getUpdates` (no offset, none stored)
  returned empty (`{"ok":true,"result":[]}`). Nothing to route: no card
  decisions, no unblocker replies, no voice notes — 10th consecutive empty
  sweep since the 14/09/2026 digest. Nothing applied to the vault (still 37
  READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED per the reality-check hook),
  decisions-log.md unchanged. All 9 cards from the 19/09 digest (#1–#6,
  R1–R3) remain outstanding. Confirmation sent to Telegram (message_id 1057).
- 19/09/2026, second sweep today (operator-requested `process` run, this
  run — end-to-end per operator request) — `getUpdates` (no offset, none
  stored) returned empty (`{"ok":true,"result":[]}`). Nothing to route: no
  card decisions, no unblocker replies, no voice notes — 11th consecutive
  empty sweep since the 14/09/2026 digest. Nothing applied to the vault
  (still 37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED per the
  reality-check hook), decisions-log.md unchanged. All 9 cards from the
  19/09 digest (#1–#6, R1–R3) remain outstanding. Confirmation sent to
  Telegram (message_id 1058).

- 20/09/2026 — pre-digest sweep (operator-requested `digest` run, run end-to-end
  per operator request). `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 12th consecutive empty sweep since the
  14/09/2026 digest. Nothing applied to the vault (37 READY TO POST / 33
  DRAFT / 6 STALE / 2 KILLED, matching this session's reality-check hook and
  confirmed against `content-vault.md`'s exact header-line status tally),
  decisions-log.md unchanged. All 9 cards from the 19/09 digest (#1–#6,
  R1–R3) go stale as of this run, superseded by the digest below. Digest
  send followed immediately (no separate confirmation line — the digest
  send itself is this run's output per skill step 3).
- 20/09/2026 ~12:31 UTC / ~16:31 GST (operator-requested `process` run, this
  run — the scheduled 12:30 cron only did a git sync per `deploy/logs/review-cockpit
  process-2026-09-20T12-30-02.log`, no actual sweep) — `getUpdates` (no
  offset, none stored) returned empty (`{"ok":true,"result":[]}`). Nothing
  to route: no card decisions, no unblocker replies, no voice notes — 13th
  consecutive empty sweep since the 14/09/2026 digest. Nothing applied to
  the vault (still 37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED per the
  reality-check hook), decisions-log.md unchanged. All 9 cards from the
  20/09 digest (#1–#6, R1–R3) remain outstanding. Publishing stayed
  queue-only throughout (`security.md` §3.1) — no post released, no Blotato
  queue touched. Confirmation sent to Telegram (message_id 1071).
- 20/09/2026 ~evening GST (operator-requested `process` run, this run — the
  scheduled 20:30 cron again only did a git sync per `deploy/logs/review-cockpit
  process-2026-09-20T20-30-02.log`, no actual sweep) — `getUpdates` (no
  offset, none stored) returned empty (`{"ok":true,"result":[]}`). Nothing
  to route: no card decisions, no unblocker replies, no voice notes — 14th
  consecutive empty sweep since the 14/09/2026 digest. Nothing applied to
  the vault (still 37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED per the
  reality-check hook), decisions-log.md unchanged. All 9 cards from the
  20/09 digest (#1–#6, R1–R3) remain outstanding. Publishing stayed
  queue-only throughout (`security.md` §3.1) — no post released, no Blotato
  queue touched. Confirmation sent to Telegram (message_id 1072).

- 21/09/2026 ~afternoon GST (operator-requested `process` run, this run —
  the scheduled 12:30 cron only did a git sync per `deploy/logs/review-cockpit
  process-2026-09-21T12-30-02.log`, no actual sweep) — `getUpdates` (no
  offset, none stored) returned empty (`{"ok":true,"result":[]}`). Nothing
  to route: no card decisions, no unblocker replies, no voice notes — 16th
  consecutive empty sweep since the 14/09/2026 digest. Nothing applied to
  the vault (reconfirmed against `content-vault.md` entry headers: 37 READY
  TO POST / 33 DRAFT / 6 STALE / 2 KILLED, matching the reality-check hook),
  decisions-log.md unchanged. All 9 cards from the 21/09 digest (#1–#6,
  R1–R3) remain outstanding. Publishing stayed queue-only throughout
  (`security.md` §3.1) — no post released, no Blotato queue touched.
  Confirmation sent to Telegram (message_id 1085).

- 21/09/2026 ~evening GST (operator-requested `process` run, this run —
  the scheduled 20:30 cron log (`deploy/logs/review-cockpit
  process-2026-09-21T20-30-02.log`) only did a git sync, no actual sweep) —
  `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 17th consecutive empty sweep since
  the 14/09/2026 digest. Nothing applied to the vault (reconfirmed against
  `content-vault.md` entry headers and the reality-check hook: 37 READY TO
  POST / 33 DRAFT / 6 STALE / 2 KILLED), decisions-log.md unchanged. All 9
  cards from the 21/09 digest (#1–#6, R1–R3) remain outstanding. Publishing
  stayed queue-only throughout (`security.md` §3.1) — no post released, no
  Blotato queue touched. Confirmation sent to Telegram (message_id 1086).

- 22/09/2026 ~afternoon GST (operator-requested `process` run, this run — the
  scheduled 12:30 cron only did a git sync per `deploy/logs/review-cockpit
  process-2026-09-22T12-30-01.log`, no actual sweep) — `getUpdates` (no
  offset, none stored) returned empty (`{"ok":true,"result":[]}`). Nothing
  to route: no card decisions, no unblocker replies, no voice notes — 19th
  consecutive empty sweep since the 14/09/2026 digest. Nothing applied to
  the vault (still 37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED per the
  reality-check hook), decisions-log.md unchanged. All 9 cards from the
  22/09 digest (#1–#6, R1–R3) remain outstanding. Publishing stayed
  queue-only throughout (`security.md` §3.1) — no post released, no Blotato
  queue touched. Confirmation sent to Telegram (message_id 1099).
- 22/09/2026 ~evening GST (operator-requested `process` run, this run — the
  scheduled 20:30 cron only did a git sync per `deploy/logs/review-cockpit
  process-2026-09-22T20-30-02.log`, no actual sweep) — `getUpdates` (no
  offset, none stored) returned empty (`{"ok":true,"result":[]}`). Nothing
  to route: no card decisions, no unblocker replies, no voice notes — 20th
  consecutive empty sweep since the 14/09/2026 digest. Nothing applied to
  the vault (still 37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED per the
  reality-check hook), decisions-log.md unchanged. All 9 cards from the
  22/09 digest (#1–#6, R1–R3) remain outstanding. Publishing stayed
  queue-only throughout (`security.md` §3.1) — no post released, no Blotato
  queue touched. Confirmation sent to Telegram (message_id 1100).

- 23/09/2026 — pre-digest sweep (operator-requested `digest` run, run end-to-end
  per operator request). `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 21st consecutive empty sweep since the
  14/09/2026 digest. Nothing applied to the vault (37 READY TO POST / 33
  DRAFT / 6 STALE / 2 KILLED / 0 POSTED, confirmed against `content-vault.md`'s
  exact `## ENTRY` header-line status tally and matching this session's
  reality-check hook), decisions-log.md unchanged. All 9 cards from the 22/09
  digest (#1–#6, R1–R3) go stale as of this run, superseded by the digest
  below. Digest send followed immediately (no separate confirmation line —
  the digest send itself is this run's output per skill step 3). Publishing
  stayed queue-only throughout (`security.md` §3.1) — no post released, no
  Blotato queue touched.

- 23/09/2026, second sweep today (operator-requested `process` run, this
  run — end-to-end per operator request) — `getUpdates` (no offset, none
  stored) returned empty (`{"ok":true,"result":[]}`). Nothing to route: no
  card decisions, no unblocker replies, no voice notes — 22nd consecutive
  empty sweep since the 14/09/2026 digest. Nothing applied to the vault
  (still 37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED,
  reconfirmed against `content-vault.md`'s exact `## ENTRY` header-line
  status tally and matching this session's reality-check hook),
  decisions-log.md unchanged. `unblocker/ledger.md` also checked — no
  pending replies to route. All 9 cards from the 23/09 digest (#1–#6,
  R1–R3) remain outstanding. Publishing stayed queue-only throughout
  (`security.md` §3.1) — no post released, no Blotato queue touched.
  Confirmation sent to Telegram (message_id 1113).
- 23/09/2026, third sweep today (operator-requested `process` run, this
  run — end-to-end per operator request) — `getUpdates` (no offset, none
  stored) returned empty (`{"ok":true,"result":[]}`). Nothing to route: no
  card decisions, no unblocker replies, no voice notes — 23rd consecutive
  empty sweep since the 14/09/2026 digest. Nothing applied to the vault
  (still 37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED,
  reconfirmed against `content-vault.md`'s exact `## ENTRY` header-line
  status tally and matching this session's reality-check hook — recomputed
  directly from `## ENTRY ... |` status suffixes, not just the notes text),
  decisions-log.md unchanged. `unblocker/ledger.md` also checked — no
  pending review-cockpit replies to route (open UNB items are unrelated
  unblocker work, not card decisions). All 9 cards from the 23/09 digest
  (#1–#6, R1–R3) remain outstanding. Publishing stayed queue-only throughout
  (`security.md` §3.1) — no post released, no Blotato queue touched.
  Confirmation sent to Telegram (message_id 1114).

- 24/09/2026 — pre-digest sweep (operator-requested `digest` run, run
  end-to-end per operator request; the scheduled 07:30 cron today only did
  a git sync per `deploy/logs/review-cockpit digest-2026-09-24T07-30-02.log`,
  no actual send). `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 24th consecutive empty sweep since the
  14/09/2026 digest. Nothing applied to the vault (37 READY TO POST / 33
  DRAFT / 6 STALE / 2 KILLED / 0 POSTED, recomputed directly from
  `content-vault.md`'s `## ENTRY ... |` status suffixes and matching this
  session's reality-check hook). All 9 cards from the 23/09 digest (#1–#6,
  R1–R3) go stale as of this run, superseded by the digest below. Digest
  send followed immediately (no separate confirmation line — the digest
  send itself is this run's output per skill step 3). Publishing stayed
  queue-only throughout (`security.md` §3.1, `CLAUDE.md`) — no post
  released, no Blotato queue touched.
- 24/09/2026 (operator-requested `process` run, this run — first process
  sweep of the day; today's 07:30 digest cron only did a git sync, no send,
  per the pre-digest sweep entry above) — `getUpdates` (no offset, none
  stored) returned empty (`{"ok":true,"result":[]}`). Nothing to route: no
  card decisions, no unblocker replies, no voice notes — 25th consecutive
  empty sweep since the 14/09/2026 digest. `unblocker/ledger.md` also
  checked — no pending review-cockpit replies to route. Nothing applied to
  the vault (still 37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED / 0
  POSTED, matching this session's reality-check hook and `content-vault.md`
  header counts), decisions-log.md unchanged. All 9 cards from the 24/09
  digest (#1–#6, R1–R3) remain outstanding. Publishing stayed queue-only
  throughout (`security.md` §3.1, `CLAUDE.md`) — no post released, no
  Blotato queue touched. Confirmation sent to Telegram (message_id 1127).
- 24/09/2026, second sweep today (operator-requested `process` run, this
  run — end-to-end per operator request) — `getUpdates` (no offset, none
  stored) returned empty (`{"ok":true,"result":[]}`). Nothing to route: no
  card decisions, no unblocker replies, no voice notes — 26th consecutive
  empty sweep since the 14/09/2026 digest. `unblocker/ledger.md` also
  checked — open items there are pre-existing unblocker blockers, not
  review-cockpit replies; nothing new to route. Nothing applied to the vault
  (still 37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED / 0 POSTED,
  recomputed directly from `content-vault.md`'s `## ENTRY ... |` status
  suffixes and matching this session's reality-check hook), decisions-log.md
  unchanged. All 9 cards from the 24/09 digest (#1–#6, R1–R3) remain
  outstanding. Publishing stayed queue-only throughout (`security.md` §3.1,
  `CLAUDE.md`) — no post released, no Blotato queue touched. Confirmation
  sent to Telegram (message_id 1128).

- 25/09/2026 — pre-digest sweep (operator-requested `digest` run, run
  end-to-end per operator request; the scheduled 07:30 cron today only did a
  git sync per `deploy/logs/review-cockpit digest-2026-09-25T07-30-03.log`,
  no actual send). `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 27th consecutive empty sweep since the
  14/09/2026 digest. `unblocker/ledger.md` also checked — open UNB items
  (018–026, 028) are pre-existing unblocker blockers, not review-cockpit
  replies. Nothing applied to the vault (37 READY TO POST / 33 DRAFT / 6
  STALE / 2 KILLED / 0 POSTED, recomputed directly from `content-vault.md`'s
  `## ENTRY ... |` status suffixes and matching this session's reality-check
  hook), decisions-log.md unchanged. All 9 cards from the 24/09 digest
  (#1–#6, R1–R3) go stale as of this run, superseded by the digest below.
  Note: a stray one-line debug/test message ("test message from
  review-cockpit debug", message_id 1130) was sent to the live thread while
  scripting the send — harmless, logged here for transparency, no vault or
  decision impact. Digest send followed immediately (header message_id 1131;
  no separate confirmation line — the digest send itself is this run's
  output per skill step 3). Publishing stayed queue-only throughout
  (`security.md` §3.1, `CLAUDE.md`) — no post released, no Blotato queue
  touched.
- 25/09/2026 (operator-requested `process` run, this run — end to end per
  operator request; today's 12:30 cron only did a git sync per
  `deploy/logs/review-cockpit process-2026-09-25T12-30-01.log`, no actual
  sweep) — `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 28th consecutive empty sweep since the
  14/09/2026 digest. `unblocker/ledger.md` also checked — open items
  (UNB-018–028) are pre-existing unblocker blockers, not review-cockpit
  replies. Nothing applied to the vault (37 READY TO POST / 33 DRAFT / 6
  STALE / 2 KILLED / 0 POSTED per this session's reality-check hook),
  decisions-log.md unchanged. All 9 cards from the 25/09 digest (#1–#6,
  R1–R3) remain outstanding. Publishing stayed queue-only throughout
  (`security.md` §3.1, `CLAUDE.md`) — no post released, no Blotato queue
  touched. Confirmation sent to Telegram (message_id 1143).

## Last digest served — 04/10/2026 (run on operator request)

Header message_id: 1253
Footer message_id: 1263

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1254 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1255 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1256 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1257 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1258 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1259 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1260 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (82d) |
| R2 | ENTRY 048 | 1261 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (82d) |
| R3 | ENTRY 049 | 1262 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (82d) |

Notes:
- Card set is identical to every digest since 16/09 (same top-6 DRAFT window,
  same Ready-shelf three) — today's content-engine run again produced no new
  entries (see `content-vault.md` "Most recent" note): queen-brain still not
  reachable this session (reality-check hook confirms), and the release
  backlog (37 READY TO POST / 0 POSTED) is unchanged, so adding more DRAFT
  volume would only crowd an already-unreleased backlog. This is the tenth
  consecutive digest with zero operator replies in between (25/09 → 29/09 →
  30/09 → 01/10 → 02/10 → 03/10 → 04/10, `getUpdates` empty every sweep —
  46 consecutive empty sweeps total across digest + process runs since
  14/09/2026).
- DRAFT pool at digest time: 33 entries, unchanged since 16/09. Ready shelf:
  37 READY TO POST, all 82+ days old (oldest batch 14/07/2026); shelf cap
  of 3/digest means the other 34 wait for subsequent runs.
- SCHEDULED count still unconfirmed: latest distribution report
  (`reports/distribution-2026-07-20.md`) is 77 days stale.
- Ready-shelf CTA keywords (WORDS, TEAM) confirmed `active=yes` in
  `lead-magnets.csv` — no CTA-BLOCKED needed for R1–R3.
- No replies processed this run (pre-digest `getUpdates` sweep was empty).
  decisions-log.md unchanged. Publishing stayed queue-only throughout
  (`security.md` §3.1, `CLAUDE.md`) — no post released, no Blotato queue
  touched. All 9 cards from the 03/10 digest (message_ids 1241–1250) go
  stale as of this run, superseded by the digest above.

## Last digest served — 03/10/2026 (run on operator request)

Header message_id: 1240
Footer message_id: 1250

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1241 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1242 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1243 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1244 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1245 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1246 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1247 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (81d) |
| R2 | ENTRY 048 | 1248 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (81d) |
| R3 | ENTRY 049 | 1249 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (81d) |

Notes:
- Card set is identical to the 01/10–02/10 digests (same top-6 DRAFT
  window, same Ready-shelf three) — content-engine's 03/10 run again
  produced no new entries (see `content-vault.md` "Most recent" note):
  queen-brain still not reachable this session, and the release backlog
  (37 READY TO POST / 0 POSTED) is unchanged, so adding more DRAFT volume
  would only crowd an already-unreleased backlog. This is the ninth
  consecutive digest with zero operator replies in between (25/09 → 29/09
  → 30/09 → 01/10 → 02/10 → 03/10, `getUpdates` empty every sweep — 43
  consecutive empty sweeps total across digest + process runs).
- DRAFT pool at digest time: 33 entries, unchanged since 16/09. Ready shelf:
  37 READY TO POST, all 81+ days old (oldest batch 14/07/2026); shelf cap
  of 3/digest means the other 34 wait for subsequent runs.
- SCHEDULED count still unconfirmed: latest distribution report
  (`reports/distribution-2026-07-20.md`) is 75 days stale.
- Ready-shelf CTA keywords (WORDS, TEAM) confirmed `active=yes` in
  `lead-magnets.csv` — no CTA-BLOCKED needed for R1–R3.
- No replies processed this run (pre-digest `getUpdates` sweep was empty).
  decisions-log.md unchanged.

## Last digest served — 02/10/2026 (run on operator request)

Header message_id: 1227
Footer message_id: 1237

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1228 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1229 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1230 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1231 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1232 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1233 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1234 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (80d) |
| R2 | ENTRY 048 | 1235 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (80d) |
| R3 | ENTRY 049 | 1236 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (80d) |

Notes:
- Pre-digest sweep: `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`) — 40th consecutive empty sweep since the
  14/09/2026 digest. Today's scheduled 07:30 cron
  (`deploy/logs/review-cockpit digest-2026-10-02T07-30-02.log`) only did a
  git sync, no actual send — this is the first real send today, run on
  operator request end-to-end.
- Card set is identical to the 16/09–01/10 digests (same top-6 DRAFT
  window, same Ready-shelf three) — content-engine's 02/10 run again
  deliberately produced no new entries (see `content-vault.md` "Most
  recent" note: a signal harvest landed today, but queen-brain is still
  NOT in this session, blocking customer-facing drafting per the
  reality-check hook — same two blockers as every run since 17/09). This
  is the seventeenth consecutive digest with zero operator replies in
  between (14/09 → ... → 02/10, `getUpdates` empty every sweep).
- DRAFT pool at digest time: 33 entries, unchanged since 16/09. Ready
  shelf: 37 READY TO POST, all 80+ days old (oldest batch 14/07/2026);
  shelf cap of 3/digest means the other 34 wait for subsequent runs.
- SCHEDULED count still unconfirmed: latest distribution report
  (`reports/distribution-2026-07-20.md`) is 75 days stale.
- Ready-shelf CTA keywords (WORDS, TEAM) reconfirmed `active=yes` in
  `lead-magnets.csv` — no CTA-BLOCKED needed for R1–R3.
- No replies processed this run (pre-digest `getUpdates` sweep was empty).
  decisions-log.md unchanged. Publishing stayed queue-only throughout
  (`security.md` §3.1, `CLAUDE.md`) — no post released, no Blotato queue
  touched.
- Cosmetic note: cards #3, R1, R2 carry a stray `%%` instead of `%` from a
  shell-escaping slip during send — harmless, flagged for transparency.

## Last digest served — 01/10/2026 (run on operator request)

Header message_id: 1213
Footer message_id: 1223

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1214 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1215 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1216 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1217 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1218 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1219 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1220 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (79d) |
| R2 | ENTRY 048 | 1221 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (79d) |
| R3 | ENTRY 049 | 1222 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (79d) |

Notes:
- Pre-digest sweep: `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`) — 37th consecutive empty sweep since the
  14/09/2026 digest. Today's scheduled 07:30 cron
  (`deploy/logs/review-cockpit digest-2026-10-01T07-30-02.log`) only did a
  git sync, no actual send — this is the first real send today, run on
  operator request end-to-end.
- Card set is identical to the 16/09–30/09 digests (same top-6 DRAFT
  window, same Ready-shelf three) — content-engine's 01/10 run again
  deliberately produced no new entries (see `content-vault.md` "Most
  recent" note: RESEARCH 054/manual signal harvest landed, plus a second
  consecutive day of the 2026-10-01 02:00 UTC automated cron silently
  exiting after git sync with no harvest output — a new failure mode
  distinct from the 09-26–09-29 weekly-limit messages; queen-brain is
  still NOT in this session, blocking customer-facing drafting per the
  reality-check hook — same two blockers as every run since 17/09). This
  is the sixteenth consecutive digest with zero operator replies in
  between (14/09 → ... → 01/10, `getUpdates` empty every sweep).
- DRAFT pool at digest time: 33 entries, unchanged since 16/09. Ready
  shelf: 37 READY TO POST, all 79+ days old (oldest batch 14/07/2026);
  shelf cap of 3/digest means the other 34 wait for subsequent runs.
- SCHEDULED count still unconfirmed: latest distribution report
  (`reports/distribution-2026-07-20.md`) is 73 days stale.
- Ready-shelf CTA keywords (WORDS, TEAM) reconfirmed `active=yes` in
  `lead-magnets.csv` — no CTA-BLOCKED needed for R1–R3.
- No replies processed this run (pre-digest `getUpdates` sweep was empty).
  decisions-log.md unchanged. Publishing stayed queue-only throughout
  (`security.md` §3.1, `CLAUDE.md`) — no post released, no Blotato queue
  touched.

## Last digest served — 30/09/2026 (run on operator request)

Header message_id: 1199
Footer message_id: 1209

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1200 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1201 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1202 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1203 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1204 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1205 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1206 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (78d) |
| R2 | ENTRY 048 | 1207 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (78d) |
| R3 | ENTRY 049 | 1208 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (78d) |

Notes:
- Card set is identical to the 16/09–29/09 digests (same top-6 DRAFT window,
  same Ready-shelf three) — content-engine's 30/09 run again deliberately
  produced no new entries (see `content-vault.md` "Most recent" note:
  RESEARCH 053/manual signal harvest findings landed, but queen-brain is
  still NOT in this session, blocking customer-facing drafting per the
  reality-check hook — same two blockers as every run since 17/09). This is
  the fifteenth consecutive digest with zero operator replies in between
  (14/09 → ... → 30/09, `getUpdates` empty every sweep — 34 consecutive
  empty sweeps total across digest + process runs).
- DRAFT pool at digest time: 33 entries, unchanged since 16/09. Ready shelf:
  37 READY TO POST, all 78+ days old (oldest batch 14/07/2026); shelf cap of
  3/digest means the other 34 wait for subsequent runs.
- SCHEDULED count still unconfirmed: latest distribution report
  (`reports/distribution-2026-07-20.md`) is 72 days stale.
- Ready-shelf CTA keywords (WORDS, TEAM) confirmed `active=yes` in
  `lead-magnets.csv` — no CTA-BLOCKED needed for R1–R3.
- No replies processed this run (pre-digest `getUpdates` sweep was empty).
  decisions-log.md unchanged. Publishing stayed queue-only throughout
  (`security.md` §3.1, `CLAUDE.md`) — no post released, no Blotato queue
  touched.

## Last digest served — 29/09/2026 (run on operator request)

Header message_id: 1185
Footer message_id: 1195

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1186 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1187 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1188 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1189 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1190 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1191 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1192 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (77d) |
| R2 | ENTRY 048 | 1193 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (77d) |
| R3 | ENTRY 049 | 1194 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (77d) |

Notes:
- Card set is identical to the 16/09–25/09 digests (same top-6 DRAFT window,
  same Ready-shelf three) — content-engine's overnight runs since 26/09 have
  been blocked by the weekly usage limit (see `content-vault.md` "Most
  recent" note: RESEARCH 052 landed today via an operator-requested manual
  signal harvest, but queen-brain is still NOT in this session, blocking
  customer-facing drafting per the reality-check hook). This is the
  fourteenth consecutive digest with zero operator replies in between
  (14/09 → ... → 29/09, `getUpdates` empty every sweep — 31 consecutive
  empty sweeps total across digest + process runs).
- DRAFT pool at digest time: 33 entries, unchanged since 16/09. Ready shelf:
  37 READY TO POST, all 77+ days old (oldest batch 14/07/2026); shelf cap of
  3/digest means the other 34 wait for subsequent runs.
- SCHEDULED count still unconfirmed: latest distribution report
  (`reports/distribution-2026-07-20.md`) is 71 days stale.
- Ready-shelf CTA keywords (WORDS, TEAM) confirmed `active=yes` in
  `lead-magnets.csv` — no CTA-BLOCKED needed for R1–R3.
- No replies processed this run (pre-digest `getUpdates` sweep was empty).
  decisions-log.md unchanged. Publishing stayed queue-only throughout
  (`security.md` §3.1, `CLAUDE.md`) — no post released, no Blotato queue
  touched.

## Last digest served — 25/09/2026 (run on operator request)

Header message_id: 1131
Footer message_id: 1141

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1132 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1133 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1134 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1135 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1136 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1137 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1138 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (73d) |
| R2 | ENTRY 048 | 1139 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (73d) |
| R3 | ENTRY 049 | 1140 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (73d) |

Notes:
- Card set is identical to the 16/09–24/09 digests (same top-6 DRAFT window,
  same Ready-shelf three) — content-engine's 25/09 run again deliberately
  produced no new entries (see `content-vault.md` "Most recent" note:
  RESEARCH 051/signal-harvester-2026-09-25 findings landed but queen-brain is
  still NOT in this session, blocking customer-facing drafting per the
  reality-check hook — same two blockers as every run since 17/09). This is
  the thirteenth consecutive digest with zero operator replies in between
  (14/09 → 15/09 → ... → 25/09, `getUpdates` empty every sweep — 27
  consecutive empty sweeps total across digest + process runs).
- DRAFT pool at digest time: 33 entries, unchanged since 16/09. Ready shelf:
  37 READY TO POST, all 73+ days old (oldest batch 14/07/2026); shelf cap of
  3/digest means the other 34 wait for subsequent runs.
- SCHEDULED count still unconfirmed: latest distribution report
  (`reports/distribution-2026-07-20.md`) is 67 days stale.
- Ready-shelf CTA keywords (WORDS, TEAM) confirmed `active=yes` in
  `lead-magnets.csv` — no CTA-BLOCKED needed for R1–R3.
- No replies processed this run (pre-digest `getUpdates` sweep was empty).
  decisions-log.md unchanged. Publishing stayed queue-only throughout
  (`security.md` §3.1) — no post released, no Blotato queue touched.

## Last digest served — 24/09/2026 (run on operator request)

Header message_id: 1115
Footer message_id: 1125

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1116 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1117 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1118 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1119 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1120 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1121 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1122 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (72d) |
| R2 | ENTRY 048 | 1123 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (72d) |
| R3 | ENTRY 049 | 1124 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (72d) |

Notes:
- Card set is identical to the 16/09–23/09 digests (same top-6 DRAFT window,
  same Ready-shelf three) — content-engine's 24/09 run again deliberately
  produced no new entries (see `content-vault.md` "Most recent" note:
  RESEARCH 050/signal-harvest-2026-09-24 findings landed but queen-brain is
  still NOT in this session, blocking customer-facing drafting per the
  reality-check hook — same two blockers as every run since 17/09). This is
  the twelfth consecutive digest with zero operator replies in between
  (14/09 → 15/09 → 16/09 → 17/09 → 18/09 → 19/09 → 20/09 → 21/09 → 22/09 →
  23/09 → 24/09, `getUpdates` empty every sweep — 24 consecutive empty
  sweeps total across digest + process runs).
- DRAFT pool at digest time: 33 entries, unchanged since 16/09. Ready shelf:
  37 READY TO POST, all 72+ days old (oldest batch 14/07/2026); shelf cap of
  3/digest means the other 34 wait for subsequent runs.
- SCHEDULED count still unconfirmed: latest distribution report
  (`reports/distribution-2026-07-20.md`) is 66 days stale.
- Ready-shelf CTA keywords (WORDS, TEAM) confirmed `active=yes` in
  `lead-magnets.csv` — no CTA-BLOCKED needed for R1–R3.
- No replies processed this run (pre-digest `getUpdates` sweep was empty).
  decisions-log.md unchanged. Publishing stayed queue-only throughout
  (`security.md` §3.1) — no post released, no Blotato queue touched.

## Last digest served — 23/09/2026 (run on operator request)

Header message_id: 1101
Footer message_id: 1111

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1102 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1103 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1104 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1105 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1106 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1107 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1108 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (71d) |
| R2 | ENTRY 048 | 1109 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (71d) |
| R3 | ENTRY 049 | 1110 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (71d) |

Notes:
- Card set is identical to the 16/09–22/09 digests (same top-6 DRAFT window,
  same Ready-shelf three) — content-engine's 23/09 run again deliberately
  produced no new entries (see `content-vault.md` "Most recent" note:
  RESEARCH 049/signal-harvest-2026-09-23 findings landed but aren't logged
  as a numbered RESEARCH entry yet, and queen-brain is still NOT in this
  session, blocking customer-facing drafting per the reality-check hook).
  This is the eleventh consecutive digest with zero operator replies in
  between (14/09 → 15/09 → 16/09 → 17/09 → 18/09 → 19/09 → 20/09 → 21/09 →
  22/09 → 23/09, `getUpdates` empty every sweep — 21 consecutive empty
  sweeps total across digest + process runs).
- DRAFT pool at digest time: 33 entries, unchanged since 16/09. Ready shelf:
  37 READY TO POST, all 71+ days old (oldest batch 14/07/2026); shelf cap of
  3/digest means the other 34 wait for subsequent runs.
- SCHEDULED count still unconfirmed: latest distribution report
  (`reports/distribution-2026-07-20.md`) is 65 days stale.
- Ready-shelf CTA keywords (WORDS, TEAM) confirmed `active=yes` in
  `lead-magnets.csv` — no CTA-BLOCKED needed for R1–R3.
- No replies processed this run (pre-digest `getUpdates` sweep was empty).
  decisions-log.md unchanged. Publishing stayed queue-only throughout
  (`security.md` §3.1) — no post released, no Blotato queue touched.

## Last digest served — 22/09/2026 (run on operator request)

Header message_id: 1087
Footer message_id: 1097

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1088 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1089 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1090 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1091 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1092 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1093 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1094 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (70d) |
| R2 | ENTRY 048 | 1095 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (70d) |
| R3 | ENTRY 049 | 1096 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (70d) |

Notes:
- Card set is identical to the 16/09–21/09 digests (same top-6 DRAFT window,
  same Ready-shelf three) — content-engine's 22/09 run again produced no new
  numbered entries (RESEARCH 049 signal landed but isn't drafted yet; this
  session's reality-check hook again confirms queen-brain is NOT in this
  session, blocking customer-facing copy per `content-vault.md`'s "Most
  recent" note). This is the tenth consecutive digest with zero operator
  replies in between (14/09 → 15/09 → 16/09 → 17/09 → 18/09 → 19/09 → 20/09
  → 21/09 → 22/09, `getUpdates` empty every sweep — 18 consecutive empty
  sweeps total across digest + process runs).
- DRAFT pool at digest time: 33 entries, unchanged since 16/09. Ready shelf:
  37 READY TO POST, all 70+ days old (oldest batch 14/07/2026); shelf cap of
  3/digest means the other 34 wait for subsequent runs.
- SCHEDULED count still unconfirmed: latest distribution report
  (`reports/distribution-2026-07-20.md`) is 64 days stale.
- Ready-shelf CTA keywords (WORDS, TEAM) confirmed `active=yes` in
  `lead-magnets.csv` — no CTA-BLOCKED needed for R1–R3.
- No replies processed this run (pre-digest `getUpdates` sweep was empty).
  decisions-log.md unchanged. Publishing stayed queue-only throughout
  (`security.md` §3.1) — no post released, no Blotato queue touched.

- 22/09/2026 — pre-digest sweep (operator-requested `digest` run, run end-to-end
  per operator request). `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — 18th consecutive empty sweep since the
  14/09/2026 digest. Nothing applied to the vault (37 READY TO POST / 33
  DRAFT / 6 STALE / 2 KILLED, matching this session's reality-check hook and
  confirmed against `content-vault.md`'s exact header-line status tally),
  decisions-log.md unchanged. All 9 cards from the 21/09 digest (#1–#6,
  R1–R3) go stale as of this run, superseded by the digest below. Digest
  send followed immediately (no separate confirmation line — the digest
  send itself is this run's output per skill step 3). Publishing stayed
  queue-only throughout (`security.md` §3.1) — no post released, no Blotato
  queue touched.

## Last digest served — 21/09/2026 (run on operator request)

Header message_id: 1073
Footer message_id: 1083

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1074 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1075 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1076 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1077 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1078 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1079 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1080 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (69d) |
| R2 | ENTRY 048 | 1081 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (69d) |
| R3 | ENTRY 049 | 1082 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (69d) |

Notes:
- Card set is identical to the 16/09–20/09 digests (same top-6 DRAFT window,
  same Ready-shelf three) — content-engine's 21/09 run again produced no new
  numbered entries (RESEARCH 048 signal landed but isn't drafted yet; this
  session's reality-check hook again confirms queen-brain is NOT in this
  session, blocking customer-facing copy per `content-vault.md`'s "Most
  recent" note). This is the ninth consecutive digest with zero operator
  replies in between (14/09 → 15/09 → 16/09 → 17/09 → 18/09 → 19/09 → 20/09
  → 21/09, `getUpdates` empty every sweep — fifteen consecutive empty sweeps
  total across digest + process runs).
- DRAFT pool at digest time: 33 entries, unchanged since 16/09. Ready shelf:
  37 READY TO POST, all 69+ days old (oldest batch 14/07/2026); shelf cap of
  3/digest means the other 34 wait for subsequent runs.
- SCHEDULED count still unconfirmed: latest distribution report
  (`reports/distribution-2026-07-20.md`) is 63 days stale.
- Ready-shelf CTA keywords (WORDS, TEAM) confirmed `active=yes` in
  `lead-magnets.csv` — no CTA-BLOCKED needed for R1–R3.
- No replies processed this run (pre-digest `getUpdates` sweep was empty).
  decisions-log.md unchanged. Publishing stayed queue-only throughout
  (`security.md` §3.1) — no post released, no Blotato queue touched.

## Last digest served — 20/09/2026 (run on operator request)

Header message_id: 1059
Footer message_id: 1069

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1060 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1061 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1062 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1063 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1064 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1065 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1066 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (68d) |
| R2 | ENTRY 048 | 1067 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (68d) |
| R3 | ENTRY 049 | 1068 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (68d) |

Notes:
- Card set is identical to the 16/09–19/09 digests (same top-6 DRAFT window,
  same Ready-shelf three) — content-engine's 20/09 run again produced no new
  entries (two signal harvests landed but neither is logged as a numbered
  RESEARCH entry yet; also queen-brain still not in this session, blocking
  customer-facing drafting per the reality-check hook — see content-vault.md
  "Most recent" note). This is the eighth consecutive digest with zero
  operator replies in between (14/09 → 15/09 → 16/09 → 17/09 → 18/09 →
  19/09 → 20/09, `getUpdates` empty every sweep — twelve consecutive empty
  sweeps total across digest + process runs).
- DRAFT pool at digest time: 33 entries, unchanged since 16/09. Ready shelf:
  37 READY TO POST, all 68+ days old (oldest batch 14/07/2026); shelf cap of
  3/digest means the other 34 wait for subsequent runs.
- SCHEDULED count still unconfirmed: latest distribution report
  (`reports/distribution-2026-07-20.md`) is 62 days stale.
- Ready-shelf CTA keywords (WORDS, TEAM) confirmed `active=yes` in
  `lead-magnets.csv` — no CTA-BLOCKED needed for R1–R3.
- No replies processed this run (pre-digest `getUpdates` sweep was empty).
  decisions-log.md unchanged.

## Last digest served — 19/09/2026 (run on operator request)

Header message_id: 1046
Footer message_id: 1056

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1047 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1048 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1049 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1050 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1051 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1052 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1053 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (67d) |
| R2 | ENTRY 048 | 1054 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (67d) |
| R3 | ENTRY 049 | 1055 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (67d) |

Notes:
- Card set is identical to the 16/09–18/09 digests (same top-6 DRAFT window,
  same Ready-shelf three) — no new content-engine entries landed and no
  operator decisions moved anything since 18/09. This is the seventh
  consecutive digest with zero operator replies in between (14/09 → 15/09 →
  16/09 → 17/09 → 18/09 → 19/09, `getUpdates` empty every sweep — nine
  consecutive empty sweeps total across digest + process runs).
- DRAFT pool at digest time: 33 entries, unchanged since 16/09. Ready shelf:
  37 READY TO POST, all 67+ days old (oldest batch 14/07/2026); shelf cap of
  3/digest means the other 34 wait for subsequent runs.
- SCHEDULED count still unconfirmed: latest distribution report
  (`reports/distribution-2026-07-20.md`) is 61 days stale.
- Ready-shelf CTA keywords (WORDS, TEAM) confirmed `active=yes` in
  `lead-magnets.csv` — no CTA-BLOCKED needed for R1–R3.
- No replies processed this run (pre-digest `getUpdates` sweep was empty).
  decisions-log.md unchanged.

## Last digest served — 18/09/2026 (run on operator request)

Header message_id: 1033
Footer message_id: 1043

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1034 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1035 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1036 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1037 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1038 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1039 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1040 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (66d) |
| R2 | ENTRY 048 | 1041 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (66d) |
| R3 | ENTRY 049 | 1042 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (66d) |

Notes:
- Card set is identical to the 16/09 and 17/09 digests (same top-6 DRAFT
  window, same Ready-shelf three) — content-engine's 18/09 run again
  produced no new entries (see `content-vault.md` "Most recent" note /
  commit e2dd64d): backlog-crowding (37 ready, 0 posted) plus queen-brain
  not being reachable in that session, so no customer-facing copy was
  reconstructed from local mirror copies. This is the sixth consecutive
  digest with zero operator replies in between (14/09 → 15/09 → 16/09 →
  17/09 → 18/09, `getUpdates` empty every sweep).
- DRAFT pool at digest time: 33 entries, unchanged since 16/09. Ready shelf:
  37 READY TO POST, all 66+ days old (oldest batch 14/07/2026); shelf cap of
  3/digest means the other 34 wait for subsequent runs.
- SCHEDULED count still unconfirmed: latest distribution report
  (`reports/distribution-2026-07-20.md`) is 60 days stale.
- No replies processed this run (pre-digest `getUpdates` sweep was empty).
  decisions-log.md unchanged.

## Last digest served — 17/09/2026 (run on operator request)

Header message_id: 1019
Footer message_id: 1029

| Card | ENTRY | message_id | Platform | Pillar | Critic | CTA |
|---|---|---|---|---|---|---|
| #1 | ENTRY 099 | 1020 | Instagram (carousel) | Use AI for real work | pending | reflective question, no offer |
| #2 | ENTRY 098 | 1021 | LinkedIn (text post) | Find what is uniquely yours | pending | reflective question, no offer — flags "builder-and-watchdog" framing for explicit yes/no |
| #3 | ENTRY 097 | 1022 | Instagram / LinkedIn (text post) | Use AI for real work | pending | reflective question, no offer — overlaps #2's theme |
| #4 | ENTRY 096 | 1023 | Instagram Reel (~40s) | Find what is uniquely yours | pending | reflective question, no offer — needs timing check |
| #5 | ENTRY 095 | 1024 | LinkedIn | Real Talk | pending | discussion (no keyword) |
| #6 | ENTRY 094 | 1025 | LinkedIn | Build Once, Runs Forever | 7.2 | community tease — CTA-BLOCKED (VERIFY + PREP) |
| R1 | ENTRY 047 | 1026 | LinkedIn | What's Worth It | n/a | WORDS (live) — READY since 14/07/2026 (65d) |
| R2 | ENTRY 048 | 1027 | X/Twitter thread | The Freedom Business | n/a | TEAM (live) — READY since 14/07/2026 (65d) |
| R3 | ENTRY 049 | 1028 | Short-form video | Build Once, Runs Forever | n/a | TEAM (live) — READY since 14/07/2026 (65d) |

Notes:
- Card set is identical to the 16/09 digest (same top-6 DRAFT window, same
  Ready-shelf three) — content-engine's 17/09 run deliberately produced no
  new entries (see content-vault.md "Most recent" note), so nothing rotated.
  This is the third consecutive digest with zero operator replies in between
  (14/09 → 15/09 → 16/09 → 17/09, `getUpdates` empty every sweep).
- DRAFT pool at digest time: 33 entries, unchanged from 16/09. Ready shelf:
  37 READY TO POST, all 65+ days old (oldest batch 14/07/2026); shelf cap of
  3/digest means the other 34 wait for subsequent runs.
- SCHEDULED count still unconfirmed: latest distribution report
  (`reports/distribution-2026-07-20.md`) is 59 days stale.
- No replies processed this run (pre-digest `getUpdates` sweep was empty).
  decisions-log.md unchanged.

- 17/09/2026 (operator-requested `process` run, this run — the scheduled
  12:30 cron only did a git sync per `deploy/logs/review-cockpit
  process-2026-09-17T12-30-03.log`, no actual sweep) — `getUpdates` (no
  offset, none stored) returned empty (`{"ok":true,"result":[]}`). Nothing
  to route: no card decisions, no unblocker replies, no voice notes.
  Nothing applied to the vault (37 READY TO POST / 33 DRAFT / 6 STALE / 2
  KILLED per the reality-check hook), decisions-log.md unchanged. All 9
  cards from the 17/09 digest (#1–#6, R1–R3) remain outstanding — fourth
  consecutive sweep with zero operator replies since the 14/09 digest.
  Confirmation sent to Telegram (message_id 1031).
- 17/09/2026, second sweep today (operator-requested `process` run, this
  run) — `getUpdates` (no offset, none stored) returned empty
  (`{"ok":true,"result":[]}`). Nothing to route: no card decisions, no
  unblocker replies, no voice notes — UNB-025's 17/09 gentle-confrontation
  message (per `unblocker/ledger.md`) also remains unanswered. Nothing
  applied to the vault (37 READY TO POST / 33 DRAFT / 6 STALE / 2 KILLED,
  reconfirmed against `content-vault.md` header counts, matching the
  reality-check hook), decisions-log.md unchanged. All 9 cards from the
  17/09 digest (#1–#6, R1–R3) remain outstanding — fifth consecutive sweep
  with zero operator replies since the 14/09 digest. Confirmation sent to
  Telegram (message_id 1032).

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
