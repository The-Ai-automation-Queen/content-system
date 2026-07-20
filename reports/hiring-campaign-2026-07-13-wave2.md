# Hiring Campaign — Weekly Wave Report (second wave, same calendar day)
**Run date:** 13/07/2026
**Branch:** claude/ai-expert-brand-strategy-42b4n9 (working branch only, not merged)
**Wave:** Employees #008, #009, #011 (2026-W30)

**Filename note:** `reports/hiring-campaign-2026-07-13.md` already exists
from this same day's first wave (W29). Engine Law 6 forbids overwriting a
dated report, so this second run's report is filed under a distinct
`-wave2` suffix instead. Two waves landed in one day because two separate
runs were triggered back to back; that is unusual and worth a note at the
board meeting, not something to hide by clobbering the first file.

---

## Produced vs released: the honesty line first

**Week 29's wave (Sami, Lina, Karim, ENTRY 024-031) is still unreleased.**
Nothing has been queued to Blotato from that run either; it sits at READY
TO POST waiting on M04. This wave adds to that backlog rather than clearing
it. Two full waves, six employees, sixteen vault entries, are now sitting
produced and unreleased. Production is not the bottleneck here; release is.

This wave (W30) is fully produced and marked **READY TO POST**, not queued
to Blotato, by design (queue never publish, Law 11: only Fatiha releases).

---

## The wave: 3 employees, 3 departments, PLAYBOOK mode

| # | Name | Role | Dept | Pain lens | Mode |
|---|---|---|---|---|---|
| 008 | Yara | Competitor Watch | Intelligence | Attention | PLAYBOOK |
| 009 | Omar | Receipt Processor | Back Office | Money | PLAYBOOK |
| 011 | Idris | SOP Writer | Operations | Time | PLAYBOOK |

**Mode check:** grepped `reports/`, `performance-log.md`, `queen-brain/board/`,
`queen-brain/proof.md` for any receipt tied to these three. Found none. All
three confirmed PLAYBOOK, matching schedule.md's expected mode. No PROOF
was faked.

**Reordering, done in the open:** schedule.md's literal next 3 planned rows
were 008 (Yara, Intelligence), 009 (Omar, Back Office), 010 (Maya,
Intelligence). Two Intelligence-department rows in one wave breaks the
3-different-departments rule, so row 011 (Idris, Operations) was pulled
forward instead, per schedule.md's own "a planned row can be reordered"
allowance. Maya (010) is deferred to 2026-W31, noted directly in
schedule.md. Her PROOF-candidate hook (the Insider Brief crawler, which
does produce real dated output in `ai-insider-brief/pipeline/`) was
checked but nothing yet ties that pipeline's receipts to an employee
specifically named Maya, so PROOF mode stays an open question for whenever
her row is actually picked, not decided here.

**Source-material gap, same as wave 1:** `agent-os-company-dashboard/` is
not in this session, so the real job-description files
(`intelligence/intelligence-competitor-watch.md`,
`backoffice/backoffice-receipt-processor.md`,
`operations/operations-sop-writer.md`) were not read. Episodes were written
from schedule.md's role-summary column only, per the skill's documented
fallback. Same follow-up flag as wave 1: if those files describe
capabilities materially different from what shipped, the guides need a
revisit once the repo is back in session.

---

## Assets produced

**Copy (content-vault.md, ENTRY 032-039, all READY TO POST):**
- ENTRY 032: Monday wave announcement (job-ad parody, all 3 openings, notes the #010 numbering gap)
- ENTRY 033: Episode, Yara
- ENTRY 034: Carousel, Yara (6 slides)
- ENTRY 035: Episode, Omar
- ENTRY 036: Carousel, Omar (6 slides)
- ENTRY 037: Reel script (week's reel, all 3 employees, redaction modeled on Omar's receipt-log cutaway)
- ENTRY 038: Episode, Idris
- ENTRY 039: Carousel, Idris (6 slides)

**Carousels rendered and inspected (18 PNGs, no overflow, electric blue used
once per slide, all counters correct 1/6-6/6):**
- `skills/carousel-factory/out/yara/yara-competitor-watch-01..06.png`
- `skills/carousel-factory/out/omar/omar-receipt-processor-01..06.png`
- `skills/carousel-factory/out/idris/idris-sop-writer-01..06.png`
(gitignored per the skill's own rule; source HTML in `out/*.html` too)

**Playbook law, all four assets per employee, all three employees:**
- `lead-magnets/competitor-watch-setup.md`, `lead-magnets/receipt-processor-setup.md`, `lead-magnets/sop-writer-setup.md`
- `site/guides/competitor-watch-setup.html`, `site/guides/receipt-processor-setup.html`, `site/guides/sop-writer-setup.html` (standard template, rendered and verified, zero cross-contamination against the other 5 employees' names/roles)
- `site/opt-in.html` catalog entries for all 3 slugs (rendered and verified live via a local server + headless Chromium: correct chip, title, and bullets for each)
- `lead-magnets.csv` rows: WATCH, RECEIPTS, SOP — all `active=yes`
- No n8n export files included in any free asset (playbook law honored).

**Tracker (`site/99.html`):**
- 3 new interviewing slots (Employees #008, #009, #011), no hired badges (no receipts exist)
- `#wave-stamp` unchanged ("Last updated 13 Jul 2026"), same calendar day as wave 1

**Registry updates:**
- `skills/employee-stories/SKILL.md` name table: added Yara, Omar, Idris
- `skills/hiring-campaign/schedule.md`: rows 008, 009, 011 flipped `planned` -> `announced, playbook live 13/07/2026`; row 010 (Maya) marked deferred to 2026-W31 with the reordering reason noted inline
- `ai-insider-brief/ai-insider-brief/CONTEXT.md`: second one-line cross-mention added under "Pending cross-mentions" for the newsletter engine, then delete after use

---

## ACP ratio

All 8 new entries are stage **A**. Combined with wave 1's 8 entries, the
last 16 vault entries are all-A, no C, no P. This is the same imbalance
flagged in wave 1's report, now doubled. Not corrected here for the same
reason: inventing a Community or Store post to fill a quota would violate
Constitution Law 7 (no invented content to fill a quota). This is now a
two-wave-deep imbalance and belongs at the board meeting as a real decision,
not something either hiring-campaign run should paper over.

---

## Queue status

Nothing queued to Blotato (per this run's explicit instruction). All 8
entries from this wave sit at **READY TO POST** for M04, on top of wave 1's
8 still-unreleased entries. Sixteen entries, zero released, as of this run.

---

## The one release action Fatiha owes

**Release both of today's waves** (ENTRY 024-039, all marked READY TO
POST) via M04. Doing this in one release pass clears the entire backlog
that has built up across both runs today; splitting it into two separate
release actions serves no purpose since both waves queued under the same
rule (queue never publish, Law 11). Employee #008/#009/#011's badges stay
"interviewing" until real receipts exist; no separate action needed there.
