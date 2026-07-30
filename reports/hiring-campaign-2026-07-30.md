# Hiring Campaign — Weekly Wave Report
**Run date:** 30/07/2026
**Branch:** claude/ai-expert-brand-strategy-42b4n9 (working branch only, not merged)
**Wave:** Employees #014, #015, #017 (2026-W32)

---

## Produced vs released: the honesty line first

**This is the fourth wave run from this branch, and nothing this branch
has ever produced has been released.** ENTRY 024-047 (24 entries, three
prior waves: Sami/Lina/Karim, Yara/Omar/Idris, Maya/Salma/Tariq) all still
sit at READY TO POST. This wave adds 8 more, ENTRY 048-055, bringing the
branch total to **32 unreleased vault entries**.

This week's board meeting (`queen-brain/board/2026-07-27.md`, run earlier
this session) confirms this is not a local problem: content-system's main
branch has taken zero commits for 14 straight days, meaning M04
distribution has not run either. Even a released queue currently has no
healthy machine to pick it up. That board meeting's founder action moved
from "do the checkout task" to "name the real blocker," since the
checkout has now missed four consecutive weeks at its smallest possible
size. Production continuing to run on schedule while nothing downstream
moves is the same pattern repeating at a different layer: agents keep
producing on time; the release and distribution steps, both requiring
Fatiha or the VPS, have not moved in two to four weeks depending on the
layer.

This wave is fully produced and marked **READY TO POST**, not queued to
Blotato, by design (queue never publish, Law 11: only Fatiha releases).

---

## The wave: 3 employees, 3 departments, PLAYBOOK mode

| # | Name | Role | Dept | Pain lens | Mode |
|---|---|---|---|---|---|
| 014 | Hind | Social Listener | Intelligence | Attention | PLAYBOOK |
| 015 | Ziad | Churn Watch | Customer | Money | PLAYBOOK |
| 017 | Farah | Quote Generator | Deals | Time | PLAYBOOK |

**Pick and reorder:** schedule.md's literal next 3 planned rows were 014
(Hind, Intelligence), 015 (Ziad, Customer), 016 (Amal, Customer) — two
Customer-department rows in one wave breaks the 3-different-department
rule. Row 016 (Amal) deferred to 2026-W33. In its place, this run used
the "beyond #016" rule (campaign picks the next most audience-relevant
role from the departments roster when the explicit table runs out of
distinct-department options) and picked Quote Generator from Deals, a
department never used in this series before. Assigned as Employee #017
(next sequential number after the table's own #016), name Farah, per the
series' "numbering = order of activation" rule, the same pattern used
for Idris (#011) when Maya (#010) was deferred in wave 2.

**Mode check:** grepped `reports/`, `performance-log.md`, `queen-brain/board/`
for any receipt tied to these three. Found none. All three confirmed
PLAYBOOK. No PROOF was faked.

**Source material, in session:** `agent-os-company-dashboard/` was
present this run (as it was last week). Read the real job description
files: `intelligence/intelligence-social-listening.md`,
`customer/customer-churn-watch.md`, `deals/deals-quote-generator.md`.
Free playbooks narrow each real job to the one-employee, one-win slice:
Social Listening's "spot recurring complaints as product signals" stays
out of the free version (that's a paid-layer pattern-analysis step, not
a single weekly search-and-flag task); Churn Watch's free version reads
one client at a time rather than scoring risk across a whole account
base, and never contacts the client, matching the source file's own
"track save-play success rates" being a system-level metric the free
tier doesn't need; Quote Generator's free version skips discount-rule
automation and quote numbering (system-layer per the source file), and
respects its own "HUMAN APPROVAL REQUIRED" instruction by never sending.

---

## Assets produced

**Copy (content-vault.md, ENTRY 048-055, all READY TO POST):**
- ENTRY 048: Monday wave announcement (job-ad parody, all 3 openings, notes the #016 numbering gap)
- ENTRY 049: Tuesday episode, Hind
- ENTRY 050: Tuesday carousel, Hind (6 slides)
- ENTRY 051: Wednesday episode, Ziad
- ENTRY 052: Wednesday carousel, Ziad (6 slides)
- ENTRY 053: Wednesday reel script (week's reel, all 3 employees)
- ENTRY 054: Thursday episode, Farah
- ENTRY 055: Thursday carousel, Farah (6 slides)

**Carousels rendered and inspected (18 PNGs, no overflow, electric blue
used once per slide, all counters correct 1/6-6/6):**
- `skills/carousel-factory/out/hind/hind-social-listener-01..06.png`
- `skills/carousel-factory/out/ziad/ziad-churn-watch-01..06.png`
- `skills/carousel-factory/out/farah/farah-quote-generator-01..06.png`
(gitignored per the skill's own rule; source HTML in `out/*.html` too)

**Playbook law, all four assets per employee, all three employees:**
- `lead-magnets/social-listener-setup.md`, `lead-magnets/churn-watch-setup.md`, `lead-magnets/quote-generator-setup.md`
- `site/guides/social-listener-setup.html`, `site/guides/churn-watch-setup.html`, `site/guides/quote-generator-setup.html` (standard template, rendered and verified, zero cross-contamination against the other 11 employees' names/roles)
- `site/opt-in.html` catalog entries for all 3 slugs (rendered and verified live via a local server + headless Chromium: correct chip, title, and bullets for each)
- `lead-magnets.csv` rows: LISTEN, CHURN, QUOTE — all `active=yes`
- No n8n export files included in any free asset (playbook law honored).

**Tracker (`site/99.html`):**
- `#wave-stamp` refreshed to "Last updated 30 Jul 2026"
- 3 new interviewing slots (Employees #014, #015, #017), no hired badges (no receipts exist)

**Registry updates:**
- `skills/employee-stories/SKILL.md` name table: added Hind, Ziad, Farah
- `skills/hiring-campaign/schedule.md`: rows 014, 015 flipped `planned` -> `announced, playbook live 30/07/2026`; row 016 (Amal) marked deferred with the reordering reason; new row 017 (Farah, Quote Generator, Deals) added and flipped to `announced, playbook live 30/07/2026`
- `ai-insider-brief/ai-insider-brief/CONTEXT.md`: fourth cross-mention added under "Pending cross-mentions." Flagged inline that all three prior cross-mentions are still sitting there unused.

---

## Ordinal check (carried forward from last wave's fix)

Playbook sequence count verified before writing: Nadia, Sami, Lina,
Karim, Yara, Omar, Idris, Maya, Salma, Tariq = 10 playbooks before this
wave. This wave's three are the 11th (Hind), 12th (Ziad), and 13th
(Farah) playbooks in the "upgrade path" line of each guide. Checked
against last wave's report, which flagged and fixed the same kind of
miscount before shipping; no repeat error this time.

---

## Numbering collision: still unresolved

Unchanged from the last two reports: this branch's ENTRY 024-039
collides with main's own independently-produced ENTRY 024-039 (different
content, from content-system's cron that ran through 13/07, now dark for
two weeks). This wave's entries (048-055) continue the branch's own
sequence and do not create a new collision by themselves. The underlying
fix, renumbering one sequence before any merge, remains an open agent
task, not attempted this run.

---

## ACP ratio

All 8 new entries are stage **A**. Combined with the prior three waves,
the last 32 vault entries on this branch are now all-A, zero C, zero P.
Flagged after wave 1, flagged again after wave 2, flagged again after
wave 3, unchanged after wave 4. Not corrected here for the same standing
reason: fabricating Community or Store content to fill a quota would
violate Constitution Law 7. This is a board-meeting or content-engine
decision now, four waves running, not something a hiring-campaign run
can fix on its own.

---

## Queue status

Nothing queued to Blotato (per this run's explicit instruction, and
because M04 itself is not currently healthy per this week's board
meeting). All 8 entries from this wave sit at **READY TO POST** for M04,
on top of 24 still-unreleased entries from the prior three waves. 32
entries, zero released, as of this run.

---

## The one release action Fatiha owes

**Release all four of this branch's waves in one pass** (ENTRY 024-055,
all marked READY TO POST) via M04, once M04 is confirmed healthy again.
This is downstream of this week's board-meeting founder action (name the
real blocker on the Fast Forward checkout); the same underlying pattern,
production outpacing release, is worth naming together rather than as
four separate asks. Employees #014/#015/#017's badges stay "interviewing"
until real receipts exist; no separate action needed there.
