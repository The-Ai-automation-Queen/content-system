# Hiring Campaign — Weekly Wave Report
**Run date:** 28/09/2026 (Monday)
**Branch:** claude/ai-expert-brand-strategy-42b4n9 (working branch only, not merged)
**Wave:** Employees #035, #036, #037 (2026-W40)

---

## Produced vs released: the honesty line first

**Nothing this branch has ever produced has been released.** This is
the eleventh hiring wave run from this branch. Before this run, a
direct count of `content-vault.md` (`grep -c "^## ENTRY .*| READY TO
POST$"`) showed 85 entries sitting READY TO POST. This wave adds 8
more, ENTRY 175-182, bringing the branch total to **93 unreleased vault
entries** (measured directly this run, not carried forward from a prior
report's narrative count). There is no evidence in this session that
any of it has reached Blotato or gone live.

This wave is fully produced and marked **READY TO POST**, not queued to
Blotato, by design (queue never publish, Law 11: only Fatiha releases).

**Container note this run:** `agent-os-company-dashboard` is **not**
present in this session's container (confirmed via a direct directory
listing: only `content-system` is checked out). The last several waves
had that repo available and read real job-description files from it;
this run did not have that option and says so plainly rather than
fabricating a dashboard read. Role concepts below are drawn from the
schedule.md departments-roster convention and the felt-pain lens (money
chasing, time leaks, follow-up), the same fallback the skill itself
specifies when the dashboard repo is absent.

---

## The wave: 3 employees, 3 departments, PLAYBOOK mode

| # | Name | Role | Dept | Pain lens | Mode |
|---|---|---|---|---|---|
| 035 | Dalia | Vendor Payment Tracker | Back Office | Money (owed, not chased) | PLAYBOOK |
| 036 | Marwan | Referral Asker | Sales | Follow-up (asking) | PLAYBOOK |
| 037 | Jana | Testimonial Collector | Customer | Attention (proof lost) | PLAYBOOK |

**Pick:** schedule.md had no remaining "planned" rows at the start of
this run (confirmed via a full read of the table; last planned row was
#034). All three slots used the "beyond #016" department-roster rule.
Last wave (#032-034) used Deals, Intelligence, Operations. Of the
remaining four departments, recency by last-used wave was: Back Office
(W37, oldest), then Sales, Customer, and Marketing (all tied at W38).
Back Office was picked as the clear least-recently-used. Sales and
Customer were picked over Marketing to break the three-way tie, leaving
Marketing as the next wave's most-overdue department.

**Role distinctness check:** Dalia's Vendor Payment Tracker (Back
Office) was checked against the department's four prior hires (Omar,
Receipt Processor; Tariq, Invoice Builder; Rami, Subscription Auditor;
Bilal, Expense Coding) — distinct because it tracks outbound bills
against due dates, not inbound receipts, client invoicing, or recurring
subscriptions. Marwan's Referral Asker (Sales) was checked against the
department's three prior hires (Nassim, Reactivation Writer; Samir,
Follow-Up Nudger; Mona, Lead Scorer) — distinct because it asks for new
business from a happy client, not reviving cold leads, nudging
unanswered ones, or scoring a pile of them. Jana's Testimonial
Collector (Customer) was checked against the department's four prior
hires (Ziad, Churn Watch; Amal, Feedback Digest; Dania, Renewal
Reminder; Sara, NPS Analyst) — distinct because it proactively saves
and formats a quotable client line for marketing use, not watching for
churn, digesting scattered feedback, or reading survey verbatims.

**Mode check:** grepped `reports/` and `performance-log.md` for any
receipt tied to Dalia, Marwan, Jana, Vendor Payment Tracker, Referral
Asker, or Testimonial Collector. Nothing found (expected — these three
roles were invented this run). All three confirmed PLAYBOOK. No PROOF
was faked. Also re-checked all prior PLAYBOOK employees for any new
receipt in `performance-log.md`'s latest entries: the log's most recent
content is still pre-rebrand directional data; no new receipts for any
employee. No promotions this run.

**Source material:** no `agent-os-company-dashboard` access this run
(see container note above). Role scopes (the four-job description per
employee) were written from the felt-pain lens and checked against
every existing role's name and function for overlap, not pulled from a
dashboard file. This is the documented fallback path in
`skills/hiring-campaign/SKILL.md` step 1, used honestly rather than
invented as if the dashboard had been read.

**Keyword/slug collision check:** ran a full read of the `keyword`
column in `lead-magnets.csv` (41 existing keywords) before picking.
VENDOR, REFER, and TESTIMONY were each checked individually; none
collide with an existing row.

---

## Assets produced

**Copy (content-vault.md, ENTRY 175-182, all READY TO POST):**
- ENTRY 175: Tuesday episode, Dalia
- ENTRY 176: Tuesday carousel, Dalia (6 slides)
- ENTRY 177: Monday wave announcement (job-ad parody, all 3 openings)
- ENTRY 178: Wednesday episode, Marwan
- ENTRY 179: Wednesday carousel, Marwan (6 slides)
- ENTRY 180: Wednesday reel script (week's reel, all 3 employees)
- ENTRY 181: Thursday episode, Jana
- ENTRY 182: Thursday carousel, Jana (6 slides)
Vault ordering re-verified after insertion via
`grep -n "^## ENTRY 1[6-8][0-9]"`: strictly descending at the top, no
collisions, no gaps.

**Carousels rendered and inspected (18 PNGs, no overflow, electric blue
used once per slide, all counters correct 1/6-6/6):**
- `skills/carousel-factory/out/dalia/dalia-vendor-payment-tracker-01..06.png`
- `skills/carousel-factory/out/marwan/marwan-referral-asker-01..06.png`
- `skills/carousel-factory/out/jana/jana-testimonial-collector-01..06.png`
(not committed, per this branch's standing convention — `out/*` has
never been part of a hiring-wave commit; source HTML lives alongside
the renders)
`playwright-core` was **not** present in this fresh container this run
(no `node_modules` under `skills/carousel-factory`); reinstalled via
`npm init -y && npm install playwright-core --no-audit --no-fund`
before rendering.

**Playbook law, all four assets per employee, all three employees:**
- `lead-magnets/vendor-payment-tracker-setup.md`, `lead-magnets/referral-asker-setup.md`, `lead-magnets/testimonial-collector-setup.md`
- `site/guides/vendor-payment-tracker-setup.html`, `site/guides/referral-asker-setup.html`, `site/guides/testimonial-collector-setup.html` (standard template, copied from `status-updates-setup.html` and text-substituted; rendered and verified live via headless Chromium: correct title, h1, chip, zero JS errors on all three guide pages and their `opt-in.html?guide=` counterparts)
- `site/opt-in.html` catalog entries for all 3 slugs, apostrophes escaped, verified live
- `lead-magnets.csv` rows: VENDOR, REFER, TESTIMONY — all `active=yes`
- No n8n export files included in any free asset (playbook law honored).
- Cross-contamination check: grepped each new guide page for the other
  two employees' names and keywords; zero hits.

**Tracker (`site/99.html`):**
- `#wave-stamp` refreshed to "Last updated 28 Sep 2026"
- 3 new interviewing slots (Employees #035, #036, #037), no hired badges (no receipts exist)

**Registry updates:**
- `skills/employee-stories/SKILL.md` name table: added Dalia, Marwan, Jana (checked against the full existing name list first — no reuse)
- `skills/hiring-campaign/schedule.md`: new rows 035 (Dalia, Back Office), 036 (Marwan, Sales), 037 (Jana, Customer) added and flipped to announced
- `ai-insider-brief/ai-insider-brief/CONTEXT.md`: eleventh cross-mention added under "Pending cross-mentions" (still none confirmed used by the newsletter engine, now flagged as worth a direct build-path check)

---

## Vault numbering: re-checked fresh this run

`origin/main`'s vault max, re-checked fresh via
`git fetch origin main && git show origin/main:content-vault.md | grep
-oP "^## ENTRY \K\d{3}" | sort -n | tail -1`: **099**, unchanged from
the last check (21/09). This branch's own range is now up to 182, still
well clear of main's 099. Re-checked every wave per standing practice;
no durable fix implemented yet.

---

## ACP ratio

All 8 new entries are stage **A**. Combined with prior waves, the
rolling content on this branch remains all-A, zero C, zero P. Flagged
again, unchanged for eleven straight waves. Not corrected here for the
same standing reason: fabricating Community or Store content to fill a
quota would violate Constitution Law 7 (no invented numbers/content).
This is squarely a board-meeting or content-engine decision, not one
this skill can resolve on its own.

---

## Queue status

Nothing queued to Blotato (per this run's explicit instruction, and no
distribution tooling reachable from this session). All 8 entries from
this wave sit at **READY TO POST** for M04, on top of 85 still-
unreleased entries from the prior ten waves. 93 entries, zero confirmed
released, as of this run.

---

## The one release action Fatiha owes

**Release this branch's full backlog** (93 vault entries, ENTRY 001
through the brand-era run up to 182, all marked READY TO POST) via M04,
once M04 is confirmed healthy and able to reach this branch. Before
that release, re-confirm the numbering gap against main (099 and
static since 21/09, versus this branch's 182) has not closed, since
releasing from this branch while main independently produces its own
numbered entries could still collide if the gap ever narrows.
Employees #035/#036/#037's badges stay "interviewing" until real
receipts exist; no separate action needed there.
