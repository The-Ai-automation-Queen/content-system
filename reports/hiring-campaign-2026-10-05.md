# Hiring Campaign — Weekly Wave Report
**Run date:** 05/10/2026 (Monday)
**Branch:** claude/ai-expert-brand-strategy-42b4n9 (working branch only, not merged)
**Wave:** Employees #038, #039, #040 (2026-W41)

---

## Produced vs released: the honesty line first

**Nothing this branch has ever produced has been released.** This is
the twelfth hiring wave run from this branch. Before this run, a direct
count of `content-vault.md` (`grep -c "^## ENTRY .*| READY TO POST$"`)
showed 93 entries sitting READY TO POST. This wave adds 8 more, ENTRY
183-190, bringing the branch total to **101 unreleased vault entries**.
There is no evidence in this session that any of it has reached Blotato
or gone live.

This wave is fully produced and marked **READY TO POST**, not queued to
Blotato, by design (queue never publish, Law 11: only Fatiha releases).

**Container note (same as last wave):** `agent-os-company-dashboard` is
still not present in this session's container. Role concepts below use
the same documented fallback as last wave: the schedule.md departments-
roster convention and the felt-pain lens, logged honestly rather than
fabricating a dashboard read.

**Session note:** this run processes the 2026-10-05 05:07 UTC hiring-
wave trigger. A separate 2026-09-28 trigger (both the hiring-wave and
board-meeting Routines) queued during a gap in this session and was
processed earlier today as its own wave
(`reports/hiring-campaign-2026-09-28.md`, Employees #035-037) and
portfolio review (`queen-brain/board/2026-10-05.md`). This wave is the
genuinely next one in sequence, not a duplicate of that run.

---

## The wave: 3 employees, 3 departments, PLAYBOOK mode

| # | Name | Role | Dept | Pain lens | Mode |
|---|---|---|---|---|---|
| 038 | Nabil | Handoff Writer | Operations | Time (handoff gaps) | PLAYBOOK |
| 039 | Sana | Pricing Watch | Intelligence | Money (competitive awareness) | PLAYBOOK |
| 040 | Imad | Launch Announcer | Marketing | Attention (visibility) | PLAYBOOK |

**Pick:** schedule.md had no remaining "planned" rows at the start of
this run (confirmed via a full read of the table; last planned row was
#037). All three slots used the "beyond #016" department-roster rule,
with a cleaner tie-break than recency alone this time: a full count of
department uses across all eleven prior "beyond #016" waves showed
Operations, Intelligence, and Marketing tied at 2 prior hires each, the
three least-used departments overall, while Back Office, Deals, Sales,
and Customer each sat at 3. None of the three picked departments were
used in last wave's set (Back Office, Sales, Customer), so both the
recency rule and the overall-balance rule agreed on the same pick.

**Role distinctness check:** Nabil's Handoff Writer (Operations) was
checked against the department's five prior hires (Nadia, task-router;
Lina, meeting-scheduler; Idris, SOP writer; Salma, client onboarding;
Layla, time digest; Fadi, status updates) — distinct because it's a
one-time note before stepping away, not recurring comms, scheduling,
onboarding, or SOPs. Sana's Pricing Watch (Intelligence) was checked
against the department's five prior hires (Yara, Competitor Watch;
Maya, News Digest; Hind, Social Listener; Rania, Review Miner; Hana,
SWOT Builder) — distinct because it tracks one named, specific metric
(price) against a prior snapshot, not general competitor moves, news,
social chatter, reviews, or internal decision-support. Imad's Launch
Announcer (Marketing) was checked against the department's three prior
hires (Yasmine, Content Repurposer; Reem, Social Calendar; Wael, Case
Study Writer) — distinct because it announces something that just
shipped, not repurposing old content, planning a calendar, or writing
up a past win.

**Mode check:** grepped `reports/` and `performance-log.md` for any
receipt tied to Nabil, Sana, Imad, Handoff Writer, Pricing Watch, or
Launch Announcer. Nothing found (expected — invented this run). All
three confirmed PLAYBOOK. No PROOF was faked. Also re-checked all prior
PLAYBOOK employees against the current `performance-log.md`; still the
same pre-rebrand directional content, no new receipts, no promotions.

**Source material:** no `agent-os-company-dashboard` access this run
(see container note). Role scopes written from the felt-pain lens,
checked against every existing role's name and function for overlap.

**Keyword/slug collision check:** ran a full read of the `keyword`
column in `lead-magnets.csv` (44 existing keywords after last wave)
before picking. HANDOFF, PRICE, and LAUNCH were each checked
individually; none collide with an existing row.

---

## Assets produced

**Copy (content-vault.md, ENTRY 183-190, all READY TO POST):**
- ENTRY 183: Tuesday episode, Nabil
- ENTRY 184: Tuesday carousel, Nabil (6 slides)
- ENTRY 185: Monday wave announcement (job-ad parody, all 3 openings)
- ENTRY 186: Wednesday episode, Sana
- ENTRY 187: Wednesday carousel, Sana (6 slides)
- ENTRY 188: Wednesday reel script (week's reel, all 3 employees)
- ENTRY 189: Thursday episode, Imad
- ENTRY 190: Thursday carousel, Imad (6 slides)
Vault ordering re-verified after insertion via
`grep -n "^## ENTRY 1[8-9][0-9]"`: strictly descending at the top, no
collisions, no gaps.

**Carousels rendered and inspected (18 PNGs, no overflow, electric blue
used once per slide, all counters correct 1/6-6/6):**
- `skills/carousel-factory/out/nabil/nabil-handoff-writer-01..06.png`
- `skills/carousel-factory/out/sana/sana-pricing-watch-01..06.png`
- `skills/carousel-factory/out/imad/imad-launch-announcer-01..06.png`
(not committed, per this branch's standing convention)
`playwright-core` was already present in this container from this
morning's earlier wave, no reinstall needed.

**Playbook law, all four assets per employee, all three employees:**
- `lead-magnets/handoff-writer-setup.md`, `lead-magnets/pricing-watch-setup.md`, `lead-magnets/launch-announcer-setup.md`
- `site/guides/handoff-writer-setup.html`, `site/guides/pricing-watch-setup.html`, `site/guides/launch-announcer-setup.html` (standard template, text-substituted; rendered and verified live via headless Chromium: correct title, h1, chip, zero JS errors on all three guide pages and their `opt-in.html?guide=` counterparts)
- `site/opt-in.html` catalog entries for all 3 slugs, apostrophes escaped, verified live
- `lead-magnets.csv` rows: HANDOFF, PRICE, LAUNCH — all `active=yes`
- No n8n export files included in any free asset (playbook law honored).
- Cross-contamination check: grepped each new guide page for the other
  two employees' names and keywords; zero hits.

**Tracker (`site/99.html`):**
- `#wave-stamp` refreshed to "Last updated 5 Oct 2026"
- 3 new interviewing slots (Employees #038, #039, #040), no hired badges (no receipts exist)

**Registry updates:**
- `skills/employee-stories/SKILL.md` name table: added Nabil, Sana, Imad (checked against the full existing name list first — no reuse)
- `skills/hiring-campaign/schedule.md`: new rows 038 (Nabil, Operations), 039 (Sana, Intelligence), 040 (Imad, Marketing) added and flipped to announced
- `ai-insider-brief/ai-insider-brief/CONTEXT.md`: twelfth cross-mention added under "Pending cross-mentions" (still none confirmed used)

---

## Vault numbering: re-checked fresh this run

`origin/main`'s vault max, re-checked fresh: **099**, unchanged since
21/09 (also confirmed in this morning's portfolio review). This
branch's own range is now up to 190, still well clear of main's 099.

---

## ACP ratio

All 8 new entries are stage **A**. Combined with prior waves, the
rolling content on this branch remains all-A, zero C, zero P. Flagged
again, unchanged for twelve straight waves. Not corrected here for the
same standing reason given every prior wave: fabricating Community or
Store content to fill a quota would violate Constitution Law 7.

---

## Queue status

Nothing queued to Blotato. All 8 entries from this wave sit at **READY
TO POST** for M04, on top of 93 still-unreleased entries from the
prior eleven waves. 101 entries, zero confirmed released, as of this
run.

---

## The one release action Fatiha owes

**Release this branch's full backlog** (101 vault entries, all marked
READY TO POST) via M04, once M04 is confirmed healthy and able to
reach this branch. Before that release, re-confirm the numbering gap
against main (099 and static since 21/09, versus this branch's 190)
has not closed. Employees #038/#039/#040's badges stay "interviewing"
until real receipts exist; no separate action needed there.
