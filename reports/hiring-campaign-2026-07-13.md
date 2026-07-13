# Hiring Campaign — Weekly Wave Report
**Run date:** 13/07/2026 (Monday)
**Branch:** claude/ai-expert-brand-strategy-42b4n9 (working branch only, not merged)
**Wave:** Employees #005, #006, #007 (2026-W29)

---

## Produced vs released: the honesty line first

**This is the first time skills/hiring-campaign/SKILL.md has been run end to
end.** There is no prior hiring-campaign report in `reports/`, and no vault
entry exists anywhere for Employee #004 (Nadia, Inbox Manager, W28). Her
playbook assets shipped correctly on 07/07/2026 (guide, lead magnet, csv
row, tracker slot all live), but the announcement and episode copy for her
wave were never written or vaulted, meaning nothing from Week 28 was ever
queued or released. That gap predates this run and is not something this
run can retroactively fix; flagging it here per the skill's own rule
(unreleased work is the bottleneck, not production) and because Week 28's
absence is the reason this week's numbering starts at ENTRY 024 with no
ENTRY for W28 to point back to.

This week's wave (W29) is fully produced and marked **READY TO POST**, not
queued to Blotato. Nothing from this run has been released either, by
design (queue never publish, Law 11: only Fatiha releases).

---

## The wave: 3 employees, 3 departments, PLAYBOOK mode

| # | Name | Role | Dept | Pain lens | Mode |
|---|---|---|---|---|---|
| 005 | Sami | Late-Payment Chaser | Back Office | Money | PLAYBOOK |
| 006 | Lina | Meeting Scheduler | Operations | Time | PLAYBOOK |
| 007 | Karim | FAQ Engine | Customer | Attention | PLAYBOOK |

**Mode check:** grepped `reports/`, `performance-log.md`, `queen-brain/board/`
for any receipt tied to these three. Found none. All three confirmed
PLAYBOOK, matching schedule.md's expected mode. No PROOF was faked.

**Source-material gap:** `agent-os-company-dashboard/` is not in this
session, so the real job-description files
(`backoffice/backoffice-late-payment-chaser.md`,
`operations/operations-meeting-scheduler.md`,
`customer/customer-faq-engine.md`) were not read. Episodes were written
from schedule.md's role-summary column only, per the skill's documented
fallback. If those files describe capabilities materially different from
what shipped, the guides need a follow-up pass once the repo is back in
session.

---

## Assets produced

**Copy (content-vault.md, ENTRY 024-031, all READY TO POST):**
- ENTRY 024: Monday wave announcement (job-ad parody, all 3 openings)
- ENTRY 025: Tuesday episode, Sami
- ENTRY 026: Tuesday carousel, Sami (6 slides)
- ENTRY 027: Wednesday episode, Lina
- ENTRY 028: Wednesday carousel, Lina (6 slides)
- ENTRY 029: Wednesday reel script (week's reel, all 3 employees)
- ENTRY 030: Thursday episode, Karim
- ENTRY 031: Thursday carousel, Karim (6 slides)

**Carousels rendered and inspected (18 PNGs, no overflow, electric used
once per slide, all counters correct):**
- `skills/carousel-factory/out/sami/sami-late-payment-chaser-01..06.png`
- `skills/carousel-factory/out/lina/lina-meeting-scheduler-01..06.png`
- `skills/carousel-factory/out/karim/karim-faq-engine-01..06.png`
(gitignored per the skill's own rule; source HTML in `out/*.html` too)

**Playbook law, all four assets per employee, all three employees:**
- `lead-magnets/late-payment-chaser-setup.md`, `lead-magnets/meeting-scheduler-setup.md`, `lead-magnets/faq-engine-setup.md`
- `site/guides/late-payment-chaser-setup.html`, `site/guides/meeting-scheduler-setup.html`, `site/guides/faq-engine-setup.html` (standard template, rendered and verified)
- `site/opt-in.html` catalog entries for all 3 slugs (rendered and verified live against the actual page)
- `lead-magnets.csv` rows: CHASER, SCHEDULE, FAQ — all `active=yes`
- No n8n export files included in any free asset (playbook law honored).

**Tracker (`site/99.html`):**
- `#wave-stamp` refreshed to "Last updated 13 Jul 2026"
- 3 new interviewing slots (Employees #005, #006, #007), no hired badges (no receipts exist)
- Counter math verified: 3 hired (unchanged), 92 open, 7 filled slots

**Registry updates:**
- `skills/employee-stories/SKILL.md` name table: added Sami, Lina, Karim
- `skills/hiring-campaign/schedule.md`: rows 005-007 flipped `planned` → `announced, playbook live 13/07/2026`
- `ai-insider-brief/ai-insider-brief/CONTEXT.md`: one-line cross-mention drafted under "Pending cross-mentions" for the newsletter engine to use next issue, then delete.

---

## ACP ratio

All 8 new entries are stage **A** (audience/value: episodes, a carousel
pair, a reel, a series-opener announcement). None pitch Store or Community.
This continues a standing imbalance already flagged in ENTRY 022/023's own
notes (rolling last-10 skewing all-A, no C/P). Not corrected here: injecting
a fabricated Community or Store post into this run to hit a ratio would
violate Constitution Law 7 (no invented content to fill a quota). The
imbalance is a board-meeting-level decision (what C/P content to run
next), not something this run should force.

---

## Queue status

Nothing queued to Blotato (per this run's explicit instruction; distribution
tools were also not checked for reachability since the instruction was
unconditional). All 8 entries sit at **READY TO POST** for M04 to pick up
on its next distribution pass.

---

## The one release action Fatiha owes

**Release Week 29's queue** (ENTRY 024-031, all marked READY TO POST) via
M04, then release Employee #005/#006/#007's badges will stay "interviewing"
on the scoreboard until a real receipt exists; no action needed there. If
Week 28 (Nadia) should also finally go out, that copy does not exist yet
and needs to be written before it can be released, that is a second,
separate decision.
