# Hiring Campaign — Weekly Wave Report
**Run date:** 12/10/2026 (Monday)
**Branch:** claude/ai-expert-brand-strategy-42b4n9 (working branch only, not merged)
**Wave:** Employees #041, #042, #043 (2026-W42)

---

## Produced vs released: the honesty line first

**Nothing this branch has ever produced has been released.** This is
the thirteenth hiring wave run from this branch. Before this run, a
direct count of `content-vault.md` showed 101 entries sitting READY TO
POST. This wave adds 8 more, ENTRY 191-198, bringing the branch total
to **109 unreleased vault entries**. There is no evidence in this
session that any of it has reached Blotato or gone live.

This wave is fully produced and marked **READY TO POST**, not queued to
Blotato, by design (queue never publish, Law 11: only Fatiha releases).

**New this run — Blotato MCP connectivity:** the Blotato MCP server is
reachable from this session for the first time across all thirteen
waves. Checked its full tool list directly rather than assuming
capability: it exposes only DM automations, comments, messages, and
post analytics — **no post-creation, scheduling, or queueing tool
exists on this server**. M04 queueing therefore remains unavailable
from this session, same practical outcome as every prior wave, just a
different reason (no tool, not no connection). Separately, main's own
`performance-tracker` reports (through 11/10) still describe Blotato
MCP as unreachable from its own sessions — worth flagging as a cross-
session discrepancy, not something this wave's skill resolves.

**Container note (same as last two waves):** `agent-os-company-
dashboard` is still not present in this session's container. Role
concepts use the same documented fallback: the schedule.md
departments-roster convention and the felt-pain lens, logged honestly.

---

## The wave: 3 employees, 3 departments, PLAYBOOK mode

| # | Name | Role | Dept | Pain lens | Mode |
|---|---|---|---|---|---|
| 041 | Rayan | Call Prep | Deals | Attention (preparedness) | PLAYBOOK |
| 042 | Samar | Tax Deadline Tracker | Back Office | Money/time (deadlines) | PLAYBOOK |
| 043 | Hiba | Check-In Writer | Customer | Attention (proactive touch) | PLAYBOOK |

**Pick:** schedule.md had no remaining "planned" rows at the start of
this run (confirmed via a full read; last planned row was #040). A
full department-usage count across all twelve prior "beyond #016"
waves showed, for the first time, every one of the 7 departments tied
at exactly 3 prior hires each. With overall balance no longer a
tie-breaker, this wave fell back to recency: avoiding last wave's set
(Operations, Intelligence, Marketing), Deals was the single least-
recently-used of the remaining four (last hired W39, older than Back
Office's, Sales', and Customer's W40). Back Office and Customer were
picked over Sales to fill the remaining two slots, leaving Sales as
next wave's most-overdue pick.

**Role distinctness check:** Rayan's Call Prep (Deals) was checked
against the department's four prior hires (Farah, Quote Generator;
Adam, Signature Chaser; Tamer, Meeting Recaps; Khalil, Proposal Writer)
— distinct because it's pre-call preparation, not pricing, chasing
signatures, post-call recaps, or proposal drafting. Samar's Tax
Deadline Tracker (Back Office) was checked against the department's
five prior hires (Omar, Receipt Processor; Tariq, Invoice Builder;
Rami, Subscription Auditor; Bilal, Expense Coding; Dalia, Vendor
Payment Tracker) — distinct because it tracks calendar-bound tax
deadlines specifically, not receipts, invoices, subscriptions, or
vendor bills. Hiba's Check-In Writer (Customer) was checked against
the department's five prior hires (Ziad, Churn Watch; Amal, Feedback
Digest; Dania, Renewal Reminder; Sara, NPS Analyst; Jana, Testimonial
Collector) — distinct because it's a proactive, no-reason touchpoint,
not a churn signal, a survey, a contract date, a score, or a captured
quote.

**Mode check:** grepped `reports/` and `performance-log.md` for any
receipt tied to Rayan, Samar, Hiba, Call Prep, Tax Deadline Tracker, or
Check-In Writer. Nothing found (expected — invented this run). All
three confirmed PLAYBOOK. No PROOF was faked. Re-checked prior PLAYBOOK
employees against `performance-log.md`; still the same pre-rebrand
directional content, no new receipts, no promotions.

**Source material:** no `agent-os-company-dashboard` access this run.
Role scopes written from the felt-pain lens, checked against every
existing role's name and function for overlap.

**Keyword/slug collision check:** ran a full read of the `keyword`
column in `lead-magnets.csv` (47 existing keywords after last wave)
before picking. PREP, TAX, and CHECKIN were each checked individually;
none collide with an existing row.

---

## Assets produced

**Copy (content-vault.md, ENTRY 191-198, all READY TO POST):**
- ENTRY 191: Tuesday episode, Rayan
- ENTRY 192: Tuesday carousel, Rayan (6 slides)
- ENTRY 193: Monday wave announcement (job-ad parody, all 3 openings)
- ENTRY 194: Wednesday episode, Samar
- ENTRY 195: Wednesday carousel, Samar (6 slides)
- ENTRY 196: Wednesday reel script (week's reel, all 3 employees)
- ENTRY 197: Thursday episode, Hiba
- ENTRY 198: Thursday carousel, Hiba (6 slides)
Vault ordering re-verified after insertion via
`grep -n "^## ENTRY 19[0-9]"`: strictly descending at the top, no
collisions, no gaps.

**Carousels rendered and inspected (18 PNGs). All 18 checked for
overflow; Hiba's hook slide (ENTRY 198, slide 1) runs a dense 5-line
headline that fills most of the vertical space but does not clip —
flagged here for awareness, not a defect.**
- `skills/carousel-factory/out/rayan/rayan-call-prep-01..06.png`
- `skills/carousel-factory/out/samar/samar-tax-deadline-tracker-01..06.png`
- `skills/carousel-factory/out/hiba/hiba-check-in-writer-01..06.png`
(not committed, per this branch's standing convention)

**Playbook law, all four assets per employee, all three employees:**
- `lead-magnets/call-prep-setup.md`, `lead-magnets/tax-deadline-tracker-setup.md`, `lead-magnets/check-in-writer-setup.md`
- `site/guides/call-prep-setup.html`, `site/guides/tax-deadline-tracker-setup.html`, `site/guides/check-in-writer-setup.html` (standard template, text-substituted; rendered and verified live via headless Chromium: correct title, h1, chip, zero JS errors)
- `site/opt-in.html` catalog entries for all 3 slugs. **Caught and
  fixed an apostrophe-escaping bug this run**: the first draft of all
  three new entries' `title`/`desc`/`bullets` strings had unescaped
  apostrophes ("it's", "anything's", "someone's") inside single-quoted
  JS literals, which would have broken the GUIDES object's parse for
  every guide on the page, not just the new ones. Caught before commit
  via the standard live-Chromium `pageerror` check, fixed with three
  targeted edits (`\'`), then re-verified live with zero errors on the
  three new pages AND a regression check against two previously-shipped
  entries (`vendor-payment-tracker-setup`, `handoff-writer-setup`) to
  confirm the shared GUIDES object still parses correctly for older
  entries too.
- `lead-magnets.csv` rows: PREP, TAX, CHECKIN — all `active=yes`
- No n8n export files included in any free asset (playbook law honored).
- Cross-contamination check: grepped each new guide page for the other
  two employees' names and keywords; zero hits.

**Tracker (`site/99.html`):**
- `#wave-stamp` refreshed to "Last updated 12 Oct 2026"
- 3 new interviewing slots (Employees #041, #042, #043), no hired badges (no receipts exist)

**Registry updates:**
- `skills/employee-stories/SKILL.md` name table: added Rayan, Samar, Hiba (checked against the full existing name list first — no reuse)
- `skills/hiring-campaign/schedule.md`: new rows 041 (Rayan, Deals), 042 (Samar, Back Office), 043 (Hiba, Customer) added and flipped to announced
- `ai-insider-brief/ai-insider-brief/CONTEXT.md`: thirteenth cross-mention added under "Pending cross-mentions" (still none confirmed used)

---

## Vault numbering: re-checked fresh this run

`origin/main`'s vault max, re-checked fresh: **099**, unchanged since
21/09 despite main receiving new commits since the last check (main's
autonomous loop remains active — `performance-tracker` now 25
consecutive dark entries, `unblocker` into a 3rd consecutive no-serve
day, UNB-026 now 19 days unanswered per `inbox-distiller`). This
branch's own range is now up to 198, still well clear of main's 099.

---

## ACP ratio

All 8 new entries are stage **A**. Combined with prior waves, the
rolling content on this branch remains all-A, zero C, zero P. Flagged
again, unchanged for thirteen straight waves. Not corrected here for
the same standing reason given every prior wave: fabricating Community
or Store content to fill a quota would violate Constitution Law 7.

---

## Queue status

Nothing queued to Blotato (no queueing tool exists on this session's
Blotato MCP server, see the connectivity note above). All 8 entries
from this wave sit at **READY TO POST** for M04, on top of 101 still-
unreleased entries from the prior twelve waves. 109 entries, zero
confirmed released, as of this run.

---

## The one release action Fatiha owes

**Release this branch's full backlog** (109 vault entries, all marked
READY TO POST) via M04, once M04 is confirmed healthy and able to
reach this branch. Before that release, re-confirm the numbering gap
against main (099 and static since 21/09, versus this branch's 198)
has not closed. Employees #041/#042/#043's badges stay "interviewing"
until real receipts exist; no separate action needed there.
