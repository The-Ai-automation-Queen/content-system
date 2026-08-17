# Hiring Campaign — Weekly Wave Report
**Run date:** 17/08/2026 (Monday)
**Branch:** claude/ai-expert-brand-strategy-42b4n9 (working branch only, not merged)
**Wave:** Employees #020, #021, #022 (2026-W34)

---

## Produced vs released: the honesty line first

**Nothing this branch has ever produced has been released.** This is
the sixth hiring wave run from this branch (waves 1-5 on 13/07, 13/07,
27/07, 30/07, and 10/08). Before this run, 48 vault entries (ENTRY
095-134, the renumbered range plus the last two waves) sat at READY TO
POST. This wave adds 8 more, ENTRY 135-142, bringing the branch total to
**56 unreleased vault entries**. There is no evidence in this session
that any of it has reached Blotato or gone live.

This wave is fully produced and marked **READY TO POST**, not queued to
Blotato, by design (queue never publish, Law 11: only Fatiha releases).

---

## The wave: 3 employees, 3 departments, PLAYBOOK mode

| # | Name | Role | Dept | Pain lens | Mode |
|---|---|---|---|---|---|
| 020 | Rami | Subscription Auditor | Back Office | Money | PLAYBOOK |
| 021 | Layla | Time Digest | Operations | Time | PLAYBOOK |
| 022 | Adam | Signature Chaser | Deals | Money | PLAYBOOK |

**Pick:** schedule.md had no remaining "planned" rows at the start of
this run (confirmed via a full read of the table). All three slots used
the "beyond #016" department-roster rule: Back Office, Operations, and
Deals were picked because none of the three had been used for the prior
wave's employees (Customer, Sales, Marketing), and they diversify
against the departments most recently tapped. No reordering was needed;
the three picks are already 3 distinct departments.

**Keyword/slug collision check:** ran a full read of `lead-magnets.csv`
before picking keywords. CHASER and DIGEST were already effectively
claimed in spirit by existing guide slugs (`invoice-builder-setup`,
`quote-generator-setup` use generic terms, but the obvious short forms
for this wave's roles risked confusion), so SUBS, HOURS, and SIGN were
chosen instead, checked one by one against the full keyword column for
zero collisions.

**Mode check:** grepped `reports/`, `performance-log.md` for any receipt
tied to Rami, Layla, Adam, Subscription Auditor, Time Digest, or
Signature Chaser. No matches beyond an unrelated "Adam Digital" TikTok
handle in an old competitor-watch report (not this employee, not a
receipt). All three confirmed PLAYBOOK. No PROOF was faked.

**Source material, in session:** `agent-os-company-dashboard/` was
already cloned from the prior wave. Read the real job description
files: `backoffice/backoffice-subscription-auditor.md`,
`operations/operations-time-digest.md`, `deals/deals-signature-chaser.md`.
Free playbooks narrow each real job to the one-employee, one-win slice
per the free/paid line: Subscription Auditor's account-wide inventory
pull and switching-note research stay paid, the free version works from
a manually provided list; Time Digest's automatic signal pull from
calendar/email/messages stays paid, the free version works from a
manually described week; Signature Chaser's scheduled multi-attempt
escalation and auto-confirmation-on-signature stay paid, the free
version drafts one reminder at a time.

---

## Assets produced

**Copy (content-vault.md, ENTRY 135-142, all READY TO POST):**
- ENTRY 135: Monday wave announcement (job-ad parody, all 3 openings)
- ENTRY 136: Tuesday episode, Rami
- ENTRY 137: Tuesday carousel, Rami (6 slides)
- ENTRY 138: Wednesday episode, Layla
- ENTRY 139: Wednesday carousel, Layla (6 slides)
- ENTRY 140: Wednesday reel script (week's reel, all 3 employees)
- ENTRY 141: Thursday episode, Adam
- ENTRY 142: Thursday carousel, Adam (6 slides)

**Carousels rendered and inspected (18 PNGs, no overflow, electric blue
used once per slide, all counters correct 1/6-6/6):**
- `skills/carousel-factory/out/rami/rami-subscription-auditor-01..06.png`
- `skills/carousel-factory/out/layla/layla-time-digest-01..06.png`
- `skills/carousel-factory/out/adam/adam-signature-chaser-01..06.png`
(gitignored per the skill's own rule; source HTML in `out/*.html` too)

**Playbook law, all four assets per employee, all three employees:**
- `lead-magnets/subscription-auditor-setup.md`, `lead-magnets/time-digest-setup.md`, `lead-magnets/signature-chaser-setup.md`
- `site/guides/subscription-auditor-setup.html`, `site/guides/time-digest-setup.html`, `site/guides/signature-chaser-setup.html` (standard template, rendered and verified live via headless Chromium: correct title, h1, chip, zero JS errors on all three pages)
- `site/opt-in.html` catalog entries for all 3 slugs, apostrophes escaped proactively this run (learned from wave 5's catch), rendered and verified live via a local server + headless Chromium with a `pageerror` listener: correct chip, title, and bullets for each, zero JS errors
- `lead-magnets.csv` rows: SUBS, HOURS, SIGN — all `active=yes`
- No n8n export files included in any free asset (playbook law honored).

**Tracker (`site/99.html`):**
- `#wave-stamp` refreshed to "Last updated 17 Aug 2026"
- 3 new interviewing slots (Employees #020, #021, #022), no hired badges (no receipts exist)

**Registry updates:**
- `skills/employee-stories/SKILL.md` name table: added Rami, Layla, Adam
- `skills/hiring-campaign/schedule.md`: new rows 020 (Rami, Back Office), 021 (Layla, Operations), 022 (Adam, Deals) added and flipped to announced
- `ai-insider-brief/ai-insider-brief/CONTEXT.md`: sixth cross-mention added under "Pending cross-mentions." Flagged inline that this is now six straight weeks of cross-mentions sitting unused, and that the newsletter's build path still hasn't been confirmed to read this file.

---

## Vault numbering: checked fresh, still safe

Re-checked `origin/main`'s vault max this run: still **095**, unchanged
since the last wave's check on 10/08. The ENTRY 095 collision flagged in
that report (this branch's own renumbered ENTRY 095 vs. main's
independent ENTRY 095) has not gotten worse, but it also hasn't been
resolved. This wave's new entries (135-142) are numbered fresh against
today's real main max and are clear for now. No durable fix has been
implemented; this remains manual vigilance, wave over wave.

---

## ACP ratio

All 8 new entries are stage **A**. Combined with the prior five waves,
the last 56 vault entries on this branch are now all-A, zero C, zero P.
Flagged after every wave so far; unchanged again. Not corrected here for
the same standing reason: fabricating Community or Store content to fill
a quota would violate Constitution Law 7. Six waves deep now; this is
squarely a board-meeting or content-engine decision.

---

## Queue status

Nothing queued to Blotato (per this run's explicit instruction). All 8
entries from this wave sit at **READY TO POST** for M04, on top of 48
still-unreleased entries from the prior five waves. 56 entries, zero
confirmed released, as of this run.

---

## The one release action Fatiha owes

**Release all six of this branch's waves in one pass** (ENTRY 135-142
plus the prior 095-134 range, all marked READY TO POST) via M04, once
M04 is confirmed healthy. Before that release happens, the ENTRY 095
collision with main (above) needs resolving, since releasing from this
branch while main independently has its own ENTRY 095 live would create
a real numbering conflict in the published record, not just a file
diff. Employees #020/#021/#022's badges stay "interviewing" until real
receipts exist; no separate action needed there.
