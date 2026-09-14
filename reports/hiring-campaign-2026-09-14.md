# Hiring Campaign — Weekly Wave Report
**Run date:** 14/09/2026 (Monday)
**Branch:** claude/ai-expert-brand-strategy-42b4n9 (working branch only, not merged)
**Wave:** Employees #029, #030, #031 (2026-W38)

---

## Produced vs released: the honesty line first

**Nothing this branch has ever produced has been released.** This is
the ninth hiring wave run from this branch (waves 1-8 on 13/07, 13/07,
27/07, 30/07, 10/08, 17/08, 31/08, and 07/09). Before this run, 72 vault
entries (ENTRY 095-158) sat at READY TO POST. This wave adds 8 more,
ENTRY 159-166, bringing the branch total to **80 unreleased vault
entries**. There is no evidence in this session that any of it has
reached Blotato or gone live.

This wave is fully produced and marked **READY TO POST**, not queued to
Blotato, by design (queue never publish, Law 11: only Fatiha releases).

---

## The wave: 3 employees, 3 departments, PLAYBOOK mode

| # | Name | Role | Dept | Pain lens | Mode |
|---|---|---|---|---|---|
| 029 | Mona | Lead Scorer | Sales | Money/prioritization | PLAYBOOK |
| 030 | Wael | Case Study Writer | Marketing | Proof/recognition | PLAYBOOK |
| 031 | Sara | NPS Analyst | Customer | Feedback/action | PLAYBOOK |

**Pick:** schedule.md had no remaining "planned" rows at the start of
this run (confirmed via a full read of the table). All three slots used
the "beyond #016" department-roster rule: Sales, Marketing, and Customer
were picked to diversify against last wave's three (Back Office, Deals,
Intelligence). Among the four departments not used last wave (Operations,
Customer, Sales, Marketing), the three least-recently-used by count were
selected, leaving Operations (the joint-most-used department at 5 prior
hires) out of this wave.

**Role distinctness check:** Sara's NPS Analyst (Customer) was checked
against the department's three prior hires: Ziad (Churn Watch), Amal
(Feedback Digest), Dania (Renewal Reminder). NPS Analyst covers a
distinct source and structure, survey verbatims specifically, not
general scattered feedback or churn/renewal signals. Wael's Case Study
Writer (Marketing) was checked against Yasmine (Content Repurposer) and
Reem (Social Calendar); this role's real job is proof-of-work
storytelling from a finished win, not repurposing existing content or
planning a content calendar.

**Mode check:** grepped `reports/` and `performance-log.md` for any
receipt tied to Mona, Wael, Sara, Lead Scorer, Case Study Writer, or NPS
Analyst. No genuine matches (one substring false-positive in an old
brand-authority report, checked by hand). All three confirmed PLAYBOOK.
No PROOF was faked.

**Source material, in session:** `agent-os-company-dashboard/` was
already present in this container from a prior wave, pulled fresh this
run (still no new commits since 28/07). Read the real job description
files: `sales/sales-lead-scorer.md`, `marketing/marketing-case-study-writer.md`,
`customer/customer-nps-analyst.md`. Free playbooks narrow each real job
to the one-employee, one-win slice per the free/paid line: Lead Scorer's
automatic batch-rescoring on signal change stays paid, the free version
scores one manually provided list once; Case Study Writer's batch social-
snippet production stays paid, the free version writes one case study
plus one promo cut; NPS Analyst's cross-cycle score-movement tracking
stays paid, the free version analyzes one batch at a time.

**Keyword/slug collision check:** ran a full read of `lead-magnets.csv`
before picking keywords. SCORE, CASESTUDY, and NPS were each checked
individually against the full existing keyword column; none collide.

---

## Assets produced

**Copy (content-vault.md, ENTRY 159-166, all READY TO POST):**
- ENTRY 159: Tuesday episode, Mona
- ENTRY 160: Tuesday carousel, Mona (6 slides)
- ENTRY 161: Monday wave announcement (job-ad parody, all 3 openings)
- ENTRY 162: Wednesday episode, Wael
- ENTRY 163: Wednesday carousel, Wael (6 slides)
- ENTRY 164: Wednesday reel script (week's reel, all 3 employees)
- ENTRY 165: Thursday episode, Sara
- ENTRY 166: Thursday carousel, Sara (6 slides)

**Carousels rendered and inspected (18 PNGs, no overflow, electric blue
used once per slide, all counters correct 1/6-6/6):**
- `skills/carousel-factory/out/mona/mona-lead-scorer-01..06.png`
- `skills/carousel-factory/out/wael/wael-case-study-writer-01..06.png`
- `skills/carousel-factory/out/sara/sara-nps-analyst-01..06.png`
(gitignored per the skill's own rule; source HTML in `out/*.html` too)
`playwright-core` was already present in this container from a prior
wave, no reinstall needed.

**Playbook law, all four assets per employee, all three employees:**
- `lead-magnets/lead-scorer-setup.md`, `lead-magnets/case-study-writer-setup.md`, `lead-magnets/nps-analyst-setup.md`
- `site/guides/lead-scorer-setup.html`, `site/guides/case-study-writer-setup.html`, `site/guides/nps-analyst-setup.html` (standard template, rendered and verified live via headless Chromium: correct title, h1, chip, zero JS errors on all three pages)
- `site/opt-in.html` catalog entries for all 3 slugs, apostrophes escaped proactively, rendered and verified live via a local server + headless Chromium with a `pageerror` listener: correct title and content for each, zero JS errors
- `lead-magnets.csv` rows: SCORE, CASESTUDY, NPS — all `active=yes`
- No n8n export files included in any free asset (playbook law honored).
- Cross-contamination check: zero mentions of any of the three new
  names inside a different new employee's guide page.

**Tracker (`site/99.html`):**
- `#wave-stamp` refreshed to "Last updated 14 Sep 2026"
- 3 new interviewing slots (Employees #029, #030, #031), no hired badges (no receipts exist)

**Registry updates:**
- `skills/employee-stories/SKILL.md` name table: added Mona, Wael, Sara
- `skills/hiring-campaign/schedule.md`: new rows 029 (Mona, Sales), 030 (Wael, Marketing), 031 (Sara, Customer) added and flipped to announced
- `ai-insider-brief/ai-insider-brief/CONTEXT.md`: ninth cross-mention added under "Pending cross-mentions," still none confirmed used.

---

## Vault numbering: checked fresh, still safe

Re-checked `origin/main`'s vault max this run: still **095**, unchanged
since every prior check going back to 30/07 (seven consecutive weekly
checks now). This branch's own range is now up to 166, well clear. No
durable fix has been implemented for the underlying collision risk;
this remains manual vigilance, wave over wave, and should be resolved
structurally before any eventual merge to main.

---

## ACP ratio

All 8 new entries are stage **A**. Combined with the prior eight waves,
the last 80 vault entries on this branch are now all-A, zero C, zero P.
Flagged after every wave so far; unchanged again. Not corrected here for
the same standing reason: fabricating Community or Store content to fill
a quota would violate Constitution Law 7. Nine waves deep now; this is
squarely a board-meeting or content-engine decision.

---

## Queue status

Nothing queued to Blotato (per this run's explicit instruction). All 8
entries from this wave sit at **READY TO POST** for M04, on top of 72
still-unreleased entries from the prior eight waves. 80 entries, zero
confirmed released, as of this run.

---

## The one release action Fatiha owes

**Release all nine of this branch's waves in one pass** (ENTRY 159-166
plus the prior 095-158 range, all marked READY TO POST) via M04, once
M04 is confirmed healthy. Before that release happens, the ENTRY 095
collision with main (flagged in every wave report since 30/07) needs
resolving, since releasing from this branch while main independently
has its own ENTRY 095 live would create a real numbering conflict in
the published record, not just a file diff. Employees #029/#030/#031's
badges stay "interviewing" until real receipts exist; no separate
action needed there.
