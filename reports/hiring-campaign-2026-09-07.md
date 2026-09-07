# Hiring Campaign — Weekly Wave Report
**Run date:** 07/09/2026 (Monday)
**Branch:** claude/ai-expert-brand-strategy-42b4n9 (working branch only, not merged)
**Wave:** Employees #026, #027, #028 (2026-W37)

---

## Produced vs released: the honesty line first

**Nothing this branch has ever produced has been released.** This is
the eighth hiring wave run from this branch (waves 1-7 on 13/07, 13/07,
27/07, 30/07, 10/08, 17/08, and 31/08). Before this run, 64 vault
entries (ENTRY 095-150) sat at READY TO POST. This wave adds 8 more,
ENTRY 151-158, bringing the branch total to **72 unreleased vault
entries**. There is no evidence in this session that any of it has
reached Blotato or gone live.

This wave is fully produced and marked **READY TO POST**, not queued to
Blotato, by design (queue never publish, Law 11: only Fatiha releases).

---

## The wave: 3 employees, 3 departments, PLAYBOOK mode

| # | Name | Role | Dept | Pain lens | Mode |
|---|---|---|---|---|---|
| 026 | Bilal | Expense Coding | Back Office | Money | PLAYBOOK |
| 027 | Tamer | Meeting Recaps | Deals | Follow-up | PLAYBOOK |
| 028 | Rania | Review Miner | Intelligence | Competitive intel | PLAYBOOK |

**Pick:** schedule.md had no remaining "planned" rows at the start of
this run (confirmed via a full read of the table). All three slots used
the "beyond #016" department-roster rule: Back Office, Deals, and
Intelligence were picked to diversify against last wave's three (Sales,
Customer, Marketing). Among the four departments not used last wave
(Back Office, Operations, Deals, Intelligence), the three least-recently
used by count were selected, leaving Operations (the most-used
department at 5 prior hires) out of this wave.

**Role distinctness check:** Tamer's Meeting Recaps (Deals) was checked
against the two other Deals employees to avoid overlap: Farah (Quote
Generator, pricing) and Adam (Signature Chaser, a signed-but-unsent
contract). Meeting Recaps covers a distinct earlier-funnel moment,
capturing a call's outcome in writing, not chasing money or a signature.
Rania's Review Miner (Intelligence) was checked against the department's
two prior hires, Yara (Competitor Watch) and Maya (News Digest); Review
Miner's real job description is specifically about mining a
competitor's customer reviews for complaint patterns, a distinct source
and angle from general competitor activity or industry news.

**Mode check:** grepped `reports/` and `performance-log.md` for any
receipt tied to Bilal, Tamer, Rania, Expense Coding, Meeting Recaps, or
Review Miner. No matches. All three confirmed PLAYBOOK. No PROOF was
faked.

**Source material, in session:** `agent-os-company-dashboard/` was
already present in this container from a prior wave and pulled fresh
this run (no new commits since 28/07, confirmed). Read the real job
description files: `backoffice/backoffice-expense-coding.md`,
`deals/deals-meeting-recaps.md`, `intelligence/intelligence-review-miner.md`.
Free playbooks narrow each real job to the one-employee, one-win slice
per the free/paid line: Expense Coding's chart-of-accounts integration
and automated receipt-coverage tracking stay paid, the free version
works from a manually provided list; Meeting Recaps' automatic filing to
a deal record/vault stays paid, the free version handles one manually
described call; Review Miner's switching-trigger extraction and
Marketing hand-off pipeline stay paid, the free version mines one
manually pasted batch of reviews.

**Keyword/slug collision check:** ran a full read of `lead-magnets.csv`
before picking keywords. EXPENSE, RECAP, and REVIEWS were each checked
individually against the full existing keyword column; none collide.

---

## Assets produced

**Copy (content-vault.md, ENTRY 151-158, all READY TO POST):**
- ENTRY 151: Tuesday episode, Bilal
- ENTRY 152: Tuesday carousel, Bilal (6 slides)
- ENTRY 153: Wednesday episode, Tamer
- ENTRY 154: Wednesday carousel, Tamer (6 slides)
- ENTRY 155: Monday wave announcement (job-ad parody, all 3 openings)
- ENTRY 156: Wednesday reel script (week's reel, all 3 employees)
- ENTRY 157: Thursday episode, Rania
- ENTRY 158: Thursday carousel, Rania (6 slides)

(Entry numbers were assigned in the order drafted; the vault file
itself lists them in the correct descending-number order at the top,
158 down to 151, matching the append-at-top convention.)

**Carousels rendered and inspected (18 PNGs, no overflow, electric blue
used once per slide, all counters correct 1/6-6/6):**
- `skills/carousel-factory/out/bilal/bilal-expense-coding-01..06.png`
- `skills/carousel-factory/out/tamer/tamer-meeting-recaps-01..06.png`
- `skills/carousel-factory/out/rania/rania-review-miner-01..06.png`
(gitignored per the skill's own rule; source HTML in `out/*.html` too)
`playwright-core` was already present in this container from a prior
wave, no reinstall needed.

**Playbook law, all four assets per employee, all three employees:**
- `lead-magnets/expense-coding-setup.md`, `lead-magnets/meeting-recaps-setup.md`, `lead-magnets/review-miner-setup.md`
- `site/guides/expense-coding-setup.html`, `site/guides/meeting-recaps-setup.html`, `site/guides/review-miner-setup.html` (standard template, rendered and verified live via headless Chromium: correct title, h1, chip, zero JS errors on all three pages)
- `site/opt-in.html` catalog entries for all 3 slugs, apostrophes escaped proactively, rendered and verified live via a local server + headless Chromium with a `pageerror` listener: correct title and content for each, zero JS errors
- `lead-magnets.csv` rows: EXPENSE, RECAP, REVIEWS — all `active=yes`
- No n8n export files included in any free asset (playbook law honored).
- Cross-contamination check: zero mentions of any of the three new
  names inside a different new employee's guide page.

**Tracker (`site/99.html`):**
- `#wave-stamp` refreshed to "Last updated 7 Sep 2026"
- 3 new interviewing slots (Employees #026, #027, #028), no hired badges (no receipts exist)

**Registry updates:**
- `skills/employee-stories/SKILL.md` name table: added Bilal, Tamer, Rania
- `skills/hiring-campaign/schedule.md`: new rows 026 (Bilal, Back Office), 027 (Tamer, Deals), 028 (Rania, Intelligence) added and flipped to announced
- `ai-insider-brief/ai-insider-brief/CONTEXT.md`: eighth cross-mention added under "Pending cross-mentions," still none confirmed used by the newsletter engine.

---

## Vault numbering: checked fresh, still safe

Re-checked `origin/main`'s vault max this run: still **095**, unchanged
since every prior check going back to 30/07. This branch's own range is
now up to 158, well clear. No durable fix has been implemented for the
underlying collision risk; this remains manual vigilance, wave over
wave, and should be resolved structurally before any eventual merge to
main.

---

## ACP ratio

All 8 new entries are stage **A**. Combined with the prior seven waves,
the last 72 vault entries on this branch are now all-A, zero C, zero P.
Flagged after every wave so far; unchanged again. Not corrected here for
the same standing reason: fabricating Community or Store content to fill
a quota would violate Constitution Law 7. Eight waves deep now; this is
squarely a board-meeting or content-engine decision.

---

## Queue status

Nothing queued to Blotato (per this run's explicit instruction). All 8
entries from this wave sit at **READY TO POST** for M04, on top of 64
still-unreleased entries from the prior seven waves. 72 entries, zero
confirmed released, as of this run.

---

## The one release action Fatiha owes

**Release all eight of this branch's waves in one pass** (ENTRY
151-158 plus the prior 095-150 range, all marked READY TO POST) via
M04, once M04 is confirmed healthy. Before that release happens, the
ENTRY 095 collision with main (flagged in every wave report since
30/07) needs resolving, since releasing from this branch while main
independently has its own ENTRY 095 live would create a real numbering
conflict in the published record, not just a file diff. Employees
#026/#027/#028's badges stay "interviewing" until real receipts exist;
no separate action needed there.
