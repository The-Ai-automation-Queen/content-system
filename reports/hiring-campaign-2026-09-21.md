# Hiring Campaign — Weekly Wave Report
**Run date:** 21/09/2026 (Monday)
**Branch:** claude/ai-expert-brand-strategy-42b4n9 (working branch only, not merged)
**Wave:** Employees #032, #033, #034 (2026-W39)

---

## Produced vs released: the honesty line first

**Nothing this branch has ever produced has been released.** This is
the tenth hiring wave run from this branch (waves 1-9 on 13/07, 13/07,
27/07, 30/07, 10/08, 17/08, 31/08, 07/09, and 14/09). Before this run,
80 vault entries (ENTRY 095-166) sat at READY TO POST. This wave adds 8
more, ENTRY 167-174, bringing the branch total to **88 unreleased vault
entries**. There is no evidence in this session that any of it has
reached Blotato or gone live.

This wave is fully produced and marked **READY TO POST**, not queued to
Blotato, by design (queue never publish, Law 11: only Fatiha releases).

**Context worth flagging this run:** content-system main's autonomous
machine loop, dark since 24/07 per every prior wave report, has been
running daily since roughly 18/09 (performance-tracker, content-engine,
signal-harvester, review-cockpit, unblocker, and others all show
commits through today). Main's own vault max grew from 095 (unchanged
for seven weeks straight through 14/09) to 099 this week, the first
real movement in two months. `content-vault.md` on main still shows
zero POSTED entries as of this check. Noted here for context; not this
skill's scope to investigate further. See also queen-brain's 12/09
canon refresh and the 14/09 portfolio review
(`queen-brain/board/2026-09-14.md`), which found and reported on the
same reactivation from the queen-brain side.

---

## The wave: 3 employees, 3 departments, PLAYBOOK mode

| # | Name | Role | Dept | Pain lens | Mode |
|---|---|---|---|---|---|
| 032 | Khalil | Proposal Writer | Deals | Deal-closing | PLAYBOOK |
| 033 | Hana | SWOT Builder | Intelligence | Decision-support | PLAYBOOK |
| 034 | Fadi | Status Updates | Operations | Recurring comms | PLAYBOOK |

**Pick:** schedule.md had no remaining "planned" rows at the start of
this run (confirmed via a full read of the table). All three slots used
the "beyond #016" department-roster rule: Deals, Intelligence, and
Operations were picked to diversify against last wave's three (Sales,
Marketing, Customer). Among the four departments not used last wave
(Back Office, Operations, Deals, Intelligence), the three least-recently-
used by count were selected, leaving Back Office (tied for most-used at
5 prior hires, but touched more recently than Operations) out of this
wave.

**Role distinctness check:** Khalil's Proposal Writer (Deals) was
checked against the department's two other hires, Farah (Quote
Generator, pricing specifically) and Adam (Signature Chaser,
signed-but-unsent) and Tamer (Meeting Recaps, post-call notes); Proposal
Writer covers a distinct earlier step, turning discovery notes into a
full proposal document. Hana's SWOT Builder (Intelligence) was checked
against the department's four prior hires (Competitor Watch, News
Digest, Social Listening, Review Miner, all external-signal roles);
SWOT Builder is internal decision-support, not external monitoring.
Fadi's Status Updates (Operations) was checked against the department's
five prior hires; distinct from Meeting Recaps (call-specific) and Time
Digest (personal time tracking), this is recurring client-facing status
comms.

**Mode check:** grepped `reports/` and `performance-log.md` for any
receipt tied to Khalil, Hana, Fadi, Proposal Writer, SWOT Builder, or
Status Updates. One substring false-positive in an old vault-audit
report, checked by hand and confirmed unrelated. All three confirmed
PLAYBOOK. No PROOF was faked.

**Source material, in session:** `agent-os-company-dashboard/` was
already present in this container, pulled fresh this run (still no new
commits since 28/07). Read the real job description files:
`deals/deals-proposal-writer.md`, `intelligence/intelligence-swot-builder.md`,
`operations/operations-status-updates.md`. Free playbooks narrow each
real job to the one-employee, one-win slice per the free/paid line:
Proposal Writer's offer-library integration stays paid, the free
version drafts from manually provided notes; SWOT Builder's competitor
SWOTs and cross-cycle update tracking stay paid, the free version
handles one decision at a time; Status Updates' automated per-client
batch generation stays paid, the free version writes one update from a
manually described snapshot.

**Keyword/slug collision check:** ran a full read of `lead-magnets.csv`
before picking keywords. PROPOSAL, SWOT, and STATUS were each checked
individually against the full existing keyword column; none collide.

---

## Assets produced

**Copy (content-vault.md, ENTRY 167-174, all READY TO POST):**
- ENTRY 167: Tuesday episode, Khalil
- ENTRY 168: Tuesday carousel, Khalil (6 slides)
- ENTRY 169: Monday wave announcement (job-ad parody, all 3 openings)
- ENTRY 170: Wednesday episode, Hana
- ENTRY 171: Wednesday carousel, Hana (6 slides)
- ENTRY 172: Wednesday reel script (week's reel, all 3 employees)
- ENTRY 173: Thursday episode, Fadi
- ENTRY 174: Thursday carousel, Fadi (6 slides)

**Carousels rendered and inspected (18 PNGs, no overflow, electric blue
used once per slide, all counters correct 1/6-6/6):**
- `skills/carousel-factory/out/khalil/khalil-proposal-writer-01..06.png`
- `skills/carousel-factory/out/hana/hana-swot-builder-01..06.png`
- `skills/carousel-factory/out/fadi/fadi-status-updates-01..06.png`
(gitignored per the skill's own rule; source HTML in `out/*.html` too)
`playwright-core` was already present in this container from a prior
wave, no reinstall needed.

**Playbook law, all four assets per employee, all three employees:**
- `lead-magnets/proposal-writer-setup.md`, `lead-magnets/swot-builder-setup.md`, `lead-magnets/status-updates-setup.md`
- `site/guides/proposal-writer-setup.html`, `site/guides/swot-builder-setup.html`, `site/guides/status-updates-setup.html` (standard template, rendered and verified live via headless Chromium: correct title, h1, chip, zero JS errors on all three pages)
- `site/opt-in.html` catalog entries for all 3 slugs, apostrophes escaped proactively, rendered and verified live via a local server + headless Chromium with a `pageerror` listener: correct title and content for each, zero JS errors
- `lead-magnets.csv` rows: PROPOSAL, SWOT, STATUS — all `active=yes`
- No n8n export files included in any free asset (playbook law honored).
- Cross-contamination check: zero mentions of any of the three new
  names inside a different new employee's guide page.

**Tracker (`site/99.html`):**
- `#wave-stamp` refreshed to "Last updated 21 Sep 2026"
- 3 new interviewing slots (Employees #032, #033, #034), no hired badges (no receipts exist)

**Registry updates:**
- `skills/employee-stories/SKILL.md` name table: added Khalil, Hana, Fadi
- `skills/hiring-campaign/schedule.md`: new rows 032 (Khalil, Deals), 033 (Hana, Intelligence), 034 (Fadi, Operations) added and flipped to announced
- `ai-insider-brief/ai-insider-brief/CONTEXT.md`: tenth cross-mention added under "Pending cross-mentions."

---

## Vault numbering: checked fresh, growing on both sides now

Re-checked `origin/main`'s vault max this run: **099**, up from 095,
where it had sat unchanged for seven straight weekly checks (30/07
through 14/09). This is the first movement in two months, consistent
with main's autonomous content-engine cron coming back online this
week (see the context note above). This branch's own range is now up
to 174, still well clear of main's 099, but the gap is no longer static
and should be re-checked every wave going forward rather than assumed
safe. No durable fix (a branch-specific numbering prefix, or similar)
has been implemented; this remains manual vigilance.

---

## ACP ratio

All 8 new entries are stage **A**. Combined with the prior nine waves,
the last 88 vault entries on this branch are now all-A, zero C, zero P.
Flagged after every wave so far; unchanged again. Not corrected here for
the same standing reason: fabricating Community or Store content to fill
a quota would violate Constitution Law 7. Ten waves deep now; this is
squarely a board-meeting or content-engine decision.

---

## Queue status

Nothing queued to Blotato (per this run's explicit instruction). All 8
entries from this wave sit at **READY TO POST** for M04, on top of 80
still-unreleased entries from the prior nine waves. 88 entries, zero
confirmed released, as of this run.

---

## The one release action Fatiha owes

**Release all ten of this branch's waves in one pass** (ENTRY 167-174
plus the prior 095-166 range, all marked READY TO POST) via M04, once
M04 is confirmed healthy. Before that release happens, the numbering
gap with main (now 099 and growing, versus this branch's 174 range)
needs a real check, not an assumption, since releasing from this branch
while main independently keeps producing its own numbered entries could
create a real conflict in the published record if the gap ever closes.
Employees #032/#033/#034's badges stay "interviewing" until real
receipts exist; no separate action needed there.
