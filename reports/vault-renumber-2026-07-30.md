# Vault Renumbering — ENTRY collision fix
**Run date:** 30/07/2026
**Branch:** claude/ai-expert-brand-strategy-42b4n9 (working branch only, not merged)

---

## The collision, corrected

This was first flagged in `reports/hiring-campaign-2026-07-27-wave2.md` as
"ENTRY 024-039" colliding with main's own independently-produced entries
in that range. That framing undercounted the problem.

Re-checking against a fresh `git fetch origin main` today (this branch's
prior board-meeting checks had been reading a stale local `main` ref that
had not moved since 13/07 — see the note at the bottom of this report),
main's `content-vault.md` is not frozen. It has grown continuously via
`content-engine`/`weekly-ops` autonomous runs from 13/07 through 30/07 and
now spans ENTRY 002 through **ENTRY 094** (73 entries, with gaps where
individual entries were killed or never numbered). That means this
branch's hiring-campaign entries, ENTRY 024 through ENTRY 055 (32 entries
across four waves), collided with main across their **entire** range, not
just 024-039.

Entries 001-023 are shared ancestry (identical on both branches, predating
the fork) and were left untouched. The collision starts exactly where the
two branches independently continued the same numbering sequence after
diverging.

## The fix

Renumbered this branch's ENTRY 024-055 to ENTRY 095-126, a flat +71
offset, placing every renumbered entry above main's current max (094) as
of this run's fetch.

| Old range | New range | Wave |
|---|---|---|
| 024-031 | 095-102 | Wave 1: Sami, Lina, Karim (13/07) |
| 032-039 | 103-110 | Wave 2: Yara, Omar, Idris (13/07) |
| 040-047 | 111-118 | Wave 3: Maya, Salma, Tariq (27/07) |
| 048-055 | 119-126 | Wave 4: Hind, Ziad, Farah (30/07) |

Exact per-entry mapping: old N maps to new N+71 for every N in 024-055.

**What was changed:**
- `content-vault.md`: every `## ENTRY NNN` header in the 024-055 range,
  plus every internal cross-reference inside entry bodies (carousel
  "Visual companion to ENTRY NNN" lines, reel "Assembled from ENTRY
  NNN/NNN/NNN" lines, and one reordering-note reference). Verified
  afterward: zero remaining references to the old 024-055 range anywhere
  in the file, and the new range doesn't collide with anything main
  currently has (main's own 095+ entries do not exist yet).
- `lead-magnets.csv`: the `(ENTRY NNN/NNN)` references inside the notes
  column for the 12 rows shipped by this branch's hiring-campaign runs
  (CHASER, SCHEDULE, FAQ, WATCH, RECEIPTS, SOP, DIGEST, ONBOARD, INVOICE,
  LISTEN, CHURN, QUOTE), same mapping. Pre-existing rows referencing
  entries below 024 (STACK, FOLLOW UP, TEAM, CLAUDE, FREEDOM, FOUNDING)
  were untouched, correctly, since they're outside the collision range.

**What was deliberately NOT changed**, per Engine Law 6 (append, never
rewrite; reports are one dated file per run, never overwritten):
`reports/hiring-campaign-2026-07-13.md`, `-2026-07-13-wave2.md`,
`-2026-07-27.md`, and `-2026-07-30.md` all still cite the old entry
numbers (e.g. "ENTRY 024/025", "ENTRY 041/042"). Those reports are dated
history of what happened on the day they were written; editing them
would falsify the record. This report is the map from old numbers to new
ones for anyone reading those older reports going forward.

## A correction to the last three board meetings

`queen-brain/board/2026-07-20.md` and `2026-07-27.md` both stated that
content-system's main branch had taken zero commits for 7, then 14,
straight days, and treated that as a major machine-health finding. That
was wrong. A fresh `git fetch origin main` today shows main's most recent
commit before this session was 30/07/2026, with continuous daily activity
the entire time, including a website consolidation, a newsletter pipeline
rebuild, and ongoing signal-harvester/content-engine/performance-tracker
runs (the tracker itself has been failing for weeks, which is real and
separate, but the machine loop around it was never silent).

The likely cause: this branch's weekly board-meeting runs pulled
`queen-brain`, `fast-forward`, and `agent-os-company-dashboard` main
branches fresh each time, and pulled content-system's **working branch**
fresh each time, but never explicitly fetched content-system's `main` ref
itself. That local ref sat frozen at its first-clone commit while origin
kept moving, and `git log main` kept reading the stale local copy without
error, silently. Flagging this here so the next board meeting corrects
the record and fetches `origin/main` explicitly for every repo, content-
system included, before drawing any conclusion from its git log.

## Verification performed

- Grepped the full renumbered `content-vault.md` for any remaining
  `ENTRY 0[2-5][0-9]` reference: none found.
- Confirmed 55 entry headers total (23 untouched + 32 renumbered),
  matching the pre-renumber count exactly, no entries lost or duplicated.
- Confirmed the new top-of-file entry is `## ENTRY 126`, consistent with
  the mapping (055 -> 126).
- Spot-checked multiple entries' internal cross-references (carousel
  "Visual companion to" lines, reel "Assembled from" lines) resolve to
  the correct renumbered sibling entry.

## Next step

Nothing else in this branch references vault ENTRY numbers (site guide
pages and lead magnets reference Employee numbers, not vault entries;
`schedule.md` uses Week labels, not entry numbers). This branch's vault
numbering is now collision-free against main as of 30/07/2026. Because
main's `content-engine` adds entries daily, whoever merges this branch
should re-check main's current max at merge time; if main has passed 126
by then, this same offset technique can be reapplied to close the new
gap before merging.
