# Hiring Campaign — Weekly Wave Report
**Run date:** 27/07/2026 (Monday)
**Branch:** claude/ai-expert-brand-strategy-42b4n9 (working branch only, not merged)
**Wave:** Employees #010, #012, #013 (2026-W31)

---

## Produced vs released: the honesty line first

**Nothing this branch has ever produced has been released.** This is the
third hiring wave run from this branch (13/07 wave 1: Sami/Lina/Karim,
13/07 wave 2: Yara/Omar/Idris, now 27/07 wave 3: Maya/Salma/Tariq). All
three waves, 24 vault entries across ENTRY 024-047, still sit at READY TO
POST. None have been queued to Blotato, none have been released. This
wave adds 8 more READY TO POST entries on top of that backlog rather than
clearing it.

Context from this week's board meeting (queen-brain/board/2026-07-20.md,
run earlier the same session): content-system's main branch took zero
commits for a full 7 days before that meeting, meaning the autonomous
distribution machine (M04) has not been healthy enough to pick up
anything either, even if it had been released. Production is not the
constraint here. Release, and the machine that would pick up a release,
both are.

This wave is fully produced and marked **READY TO POST**, not queued to
Blotato, by design (queue never publish, Law 11: only Fatiha releases).

---

## The wave: 3 employees, 3 departments, PLAYBOOK mode

| # | Name | Role | Dept | Pain lens | Mode |
|---|---|---|---|---|---|
| 010 | Maya | News Digest | Intelligence | Attention | PLAYBOOK |
| 012 | Salma | Client Onboarding | Operations | Time | PLAYBOOK |
| 013 | Tariq | Invoice Builder | Back Office | Money | PLAYBOOK |

**Pick:** these were the next 3 planned rows in schedule.md (010, 012,
013). Already 3 distinct departments as listed, no reordering needed this
run (row 011, Idris, Operations, was already used in wave 2, so no
Intelligence-Intelligence collision like the one wave 2 had to fix).

**Mode check:** grepped `reports/`, `performance-log.md`,
`queen-brain/board/` for any receipt tied to these three, plus a specific
recheck on Maya against the Insider Brief crawler pipeline
(`ai-insider-brief/pipeline/`), since her row has carried a "PROOF
candidate" note since wave 2. Found nothing new: the pipeline's files
have not changed since 13/07/2026, consistent with this week's board
finding that content-system's crons have been silent for a week. No
receipt ties that pipeline's output to an employee named Maya. All three
confirmed PLAYBOOK. No PROOF was faked.

**Source material, this time in session:** unlike the previous two waves,
`agent-os-company-dashboard/` was present this run. Read the real job
description files: `intelligence/intelligence-news-digest.md`,
`operations/operations-client-onboarding.md`,
`backoffice/backoffice-invoicing.md`. Free playbooks narrow each real
job to the one-employee, one-win slice per the free/paid line: News
Digest's "flag items needing a company response" step is not in the free
version (that is a paid-layer workflow, not a single AI employee's setup);
Client Onboarding's welcome-and-checklist duo ships free, its "collect
approvals systematically" and "report status until steady state" tracking
layer does not; Invoicing's draft-only step ships free, its human-approval
gate is honored explicitly in both the copy and the guide (the source file
itself says "never sent without human approval," which the free version
already respects by design).

---

## Assets produced

**Copy (content-vault.md, ENTRY 040-047, all READY TO POST):**
- ENTRY 040: Monday wave announcement (job-ad parody, all 3 openings)
- ENTRY 041: Tuesday episode, Maya
- ENTRY 042: Tuesday carousel, Maya (6 slides)
- ENTRY 043: Wednesday episode, Salma
- ENTRY 044: Wednesday carousel, Salma (6 slides)
- ENTRY 045: Wednesday reel script (week's reel, all 3 employees)
- ENTRY 046: Thursday episode, Tariq
- ENTRY 047: Thursday carousel, Tariq (6 slides)

**Carousels rendered and inspected (18 PNGs, no overflow, electric blue
used once per slide, all counters correct 1/6-6/6):**
- `skills/carousel-factory/out/maya/maya-news-digest-01..06.png`
- `skills/carousel-factory/out/salma/salma-client-onboarding-01..06.png`
- `skills/carousel-factory/out/tariq/tariq-invoice-builder-01..06.png`
(gitignored per the skill's own rule; source HTML in `out/*.html` too)

**Playbook law, all four assets per employee, all three employees:**
- `lead-magnets/news-digest-setup.md`, `lead-magnets/client-onboarding-setup.md`, `lead-magnets/invoice-builder-setup.md`
- `site/guides/news-digest-setup.html`, `site/guides/client-onboarding-setup.html`, `site/guides/invoice-builder-setup.html` (standard template, rendered and verified, zero cross-contamination against the other 8 employees' names/roles)
- `site/opt-in.html` catalog entries for all 3 slugs (rendered and verified live via a local server + headless Chromium: correct chip, title, and bullets for each)
- `lead-magnets.csv` rows: DIGEST, ONBOARD, INVOICE — all `active=yes`
- No n8n export files included in any free asset (playbook law honored).

**Tracker (`site/99.html`):**
- `#wave-stamp` refreshed to "Last updated 27 Jul 2026"
- 3 new interviewing slots (Employees #010, #012, #013), no hired badges (no receipts exist)

**Registry updates:**
- `skills/employee-stories/SKILL.md` name table: added Maya, Salma, Tariq
- `skills/hiring-campaign/schedule.md`: rows 010, 012, 013 flipped `planned` -> `announced, playbook live 27/07/2026`; row 010's mode note updated to explain the repeated PROOF check and why it still resolves to PLAYBOOK
- `ai-insider-brief/ai-insider-brief/CONTEXT.md`: third cross-mention added under "Pending cross-mentions." Flagged inline that the two prior waves' cross-mentions (both dated 13/07) are still sitting there unused, consistent with the newsletter engine not having run in two weeks.

---

## Ordinal correction (caught mid-run, fixed before shipping)

The "upgrade path" line in each playbook names which numbered AI employee
in the playbook series this is (matching the established pattern: Yara
was the 5th playbook, Omar the 6th, Idris the 7th). First drafts of this
wave's three lead-magnet files mistakenly used 9th/10th/11th. Caught
before committing by counting the actual playbook sequence (Nadia, Sami,
Lina, Karim, Yara, Omar, Idris = 7 so far), corrected to 8th (Maya), 9th
(Salma), 10th (Tariq) in all three files before this run shipped.

---

## Numbering collision: still unresolved, now larger

Flagged in wave 2's report and not yet fixed: this branch's ENTRY
024-039 collide with main's own independently-produced ENTRY 024-039
(different content, from content-system's cron that ran through 13/07).
This wave continues the branch's own sequence at 040-047, which does not
create a new collision by itself, but the underlying fix (renumber one
sequence before any merge) is still outstanding. Not attempted in this
run; still an agent task, not a Fatiha decision, per last week's note.

---

## ACP ratio

All 8 new entries are stage **A**. Combined with the prior two waves, the
last 24 vault entries on this branch are now all-A, zero C, zero P. This
imbalance was flagged as a concern after wave 1, flagged again after wave
2, and is now three waves deep with no change. Not corrected here for the
same standing reason: fabricating a Community or Store post to fill a
quota would violate Constitution Law 7 (no invented content to fill a
quota), and this branch's hiring-campaign runs are not positioned to
originate C/P content on their own. This is now squarely a board-meeting
or content-engine decision (what C/P content runs next), not something
any further hiring-campaign run should paper over by inventing one.

---

## Queue status

Nothing queued to Blotato (per this run's explicit instruction). All 8
entries from this wave sit at **READY TO POST** for M04, on top of 16
still-unreleased entries from the prior two waves. 24 entries, zero
released, as of this run.

---

## The one release action Fatiha owes

**Release all three of this branch's waves in one pass** (ENTRY 024-047,
all marked READY TO POST) via M04, once M04 itself is confirmed healthy
again (see this week's board meeting for the finding that content-system's
crons went silent for 7 days). Splitting this into three separate release
actions serves no purpose; all 24 entries queued under the same rule
(queue never publish, Law 11) and none has gone stale in a way that
requires re-writing. Employees #010/#012/#013's badges stay "interviewing"
until real receipts exist; no separate action needed there.
