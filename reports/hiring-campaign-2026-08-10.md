# Hiring Campaign — Weekly Wave Report
**Run date:** 10/08/2026 (Monday)
**Branch:** claude/ai-expert-brand-strategy-42b4n9 (working branch only, not merged)
**Wave:** Employees #016, #018, #019 (2026-W33)

---

## Produced vs released: the honesty line first

**Nothing this branch has ever produced has been released.** This is
the fifth hiring wave run from this branch (waves 1-4 on 13/07, 13/07,
27/07, and 30/07). Before this run, 40 vault entries (ENTRY 095-126, the
renumbered range from the prior four waves) sat at READY TO POST. This
wave adds 8 more, ENTRY 127-134, bringing the branch total to **48
unreleased vault entries**. There is no evidence in this session that
any of it has reached Blotato or gone live.

Session note: this run started in a fresh container with only
content-system cloned. queen-brain, fast-forward, and
agent-os-company-dashboard were all missing and had to be re-cloned from
scratch. Separately, this branch's own local git ref had somehow drifted
onto an unrelated commit history (58 commits of homepage/positioning
work, fully merged into main under a different path) instead of this
branch's real history; it was reset to match
`origin/claude/ai-expert-brand-strategy-42b4n9` before any work started
this run, confirmed clean (no uncommitted changes lost). Flagging this
because it means the container/session layer under this branch is not
fully reliable between runs, worth a look outside this skill's scope.

This wave is fully produced and marked **READY TO POST**, not queued to
Blotato, by design (queue never publish, Law 11: only Fatiha releases).

---

## The wave: 3 employees, 3 departments, PLAYBOOK mode

| # | Name | Role | Dept | Pain lens | Mode |
|---|---|---|---|---|---|
| 016 | Amal | Feedback Digest | Customer | Attention | PLAYBOOK |
| 018 | Nassim | Reactivation Writer | Sales | Money | PLAYBOOK |
| 019 | Yasmine | Content Repurposer | Marketing | Time | PLAYBOOK |

**Pick:** row 016 (Amal) was schedule.md's only remaining "planned" row,
deferred from wave 4 (2026-W32) when it collided with row 015 (Ziad,
also Customer) on department diversity. It no longer collides this wave.
The other two slots used the "beyond #016" department-roster rule: Sales
and Marketing were picked specifically because neither had been used in
this series before (Sales never; Marketing only once, for Zeina, a PROOF
employee tied to carousel-factory itself, not a playbook hire). No
reordering was needed this run: Customer, Sales, Marketing are already
3 distinct departments.

**Mode check:** grepped `reports/`, `performance-log.md`,
`queen-brain/board/` for any receipt tied to these three. Found none
beyond this branch's own prior reports mentioning Amal by name in the
wave-4 deferral note, which is not a receipt. All three confirmed
PLAYBOOK. No PROOF was faked.

**Source material, in session:** `agent-os-company-dashboard/` was
re-cloned fresh this run. Read the real job description files:
`customer/customer-feedback-digest.md`, `sales/sales-reactivation-writer.md`,
`marketing/marketing-repurposer.md`. Free playbooks narrow each real job
to the one-employee, one-win slice per the free/paid line: Feedback
Digest's "route feature asks to the roadmap list" and ticket-system
integration stay out of the free version; Reactivation Writer's
automated list-wide segmentation stays paid, the free version handles
one lead at a time; Repurposer's "batch outputs for the scheduling
pipeline" is explicitly a paid-layer step, the free version reshapes one
piece into 2-3 formats and stops there.

---

## Assets produced

**Copy (content-vault.md, ENTRY 127-134, all READY TO POST):**
- ENTRY 127: Monday wave announcement (job-ad parody, all 3 openings)
- ENTRY 128: Tuesday episode, Amal
- ENTRY 129: Tuesday carousel, Amal (6 slides)
- ENTRY 130: Wednesday episode, Nassim
- ENTRY 131: Wednesday carousel, Nassim (6 slides)
- ENTRY 132: Wednesday reel script (week's reel, all 3 employees)
- ENTRY 133: Thursday episode, Yasmine
- ENTRY 134: Thursday carousel, Yasmine (6 slides)

**Carousels rendered and inspected (18 PNGs, no overflow, electric blue
used once per slide, all counters correct 1/6-6/6):**
- `skills/carousel-factory/out/amal/amal-feedback-digest-01..06.png`
- `skills/carousel-factory/out/nassim/nassim-reactivation-writer-01..06.png`
- `skills/carousel-factory/out/yasmine/yasmine-content-repurposer-01..06.png`
(gitignored per the skill's own rule; source HTML in `out/*.html` too)

**Playbook law, all four assets per employee, all three employees:**
- `lead-magnets/feedback-digest-setup.md`, `lead-magnets/reactivation-writer-setup.md`, `lead-magnets/content-repurposer-setup.md`
- `site/guides/feedback-digest-setup.html`, `site/guides/reactivation-writer-setup.html`, `site/guides/content-repurposer-setup.html` (standard template, rendered and verified, zero cross-contamination against the other 16 employees' names/roles)
- `site/opt-in.html` catalog entries for all 3 slugs (rendered and verified live via a local server + headless Chromium: correct chip, title, and bullets for each; caught and fixed 3 unescaped apostrophes in the new JS string literals before verifying, confirmed no console errors after the fix)
- `lead-magnets.csv` rows: FEEDBACK, REVIVE, REPURPOSE — all `active=yes`
- No n8n export files included in any free asset (playbook law honored).

**Tracker (`site/99.html`):**
- `#wave-stamp` refreshed to "Last updated 10 Aug 2026"
- 3 new interviewing slots (Employees #016, #018, #019), no hired badges (no receipts exist)

**Registry updates:**
- `skills/employee-stories/SKILL.md` name table: added Amal, Nassim, Yasmine
- `skills/hiring-campaign/schedule.md`: row 016 flipped `planned` -> `announced, playbook live 10/08/2026`; new rows 018 (Nassim, Sales) and 019 (Yasmine, Marketing) added and flipped to announced
- `ai-insider-brief/ai-insider-brief/CONTEXT.md`: fifth cross-mention added under "Pending cross-mentions." Flagged inline that this is now five straight weeks of cross-mentions sitting unused, worth checking whether this file is actually read by the newsletter's build.

---

## Vault numbering: main has grown back into last wave's fixed range

Wave 4's report (`reports/vault-renumber-2026-07-30.md`) renumbered this
branch's then-colliding entries to 095-126, clear of main's max at the
time (094). Checked fresh this run: main's vault max is now 095, meaning
**ENTRY 095 on this branch (the wave-1 announcement) now collides
exactly with main's own ENTRY 095** ("Project Panama...", a different
post entirely). The 096-126 range does not yet collide (main hasn't
grown that far), but the fix from two weeks ago has already started
degrading. This wave's new entries (127-134) were numbered fresh against
today's real main max, not against the old fix, so they're clear for
now.

Not re-fixed in this run, out of scope for a hiring-campaign wave: a
durable fix needs either checking main's fresh max immediately before
every wave (what this run did) or a structural change, like a
branch-specific numbering prefix, so this stops being a recurring
whack-a-mole. Flagging for the board meeting and for whoever eventually
merges this branch.

---

## ACP ratio

All 8 new entries are stage **A**. Combined with the prior four waves,
the last 48 vault entries on this branch are now all-A, zero C, zero P.
Flagged after every wave so far; unchanged again. Not corrected here for
the same standing reason: fabricating Community or Store content to fill
a quota would violate Constitution Law 7. Five waves deep now; this is
squarely a board-meeting or content-engine decision.

---

## Queue status

Nothing queued to Blotato (per this run's explicit instruction). All 8
entries from this wave sit at **READY TO POST** for M04, on top of 40
still-unreleased entries from the prior four waves. 48 entries, zero
confirmed released, as of this run.

---

## The one release action Fatiha owes

**Release all five of this branch's waves in one pass** (ENTRY 127-134
plus the renumbered 095-126 range, all marked READY TO POST) via M04,
once M04 is confirmed healthy. Before that release happens, the ENTRY
095 collision with main (above) needs resolving, since releasing from
this branch while main independently has its own ENTRY 095 live would
create a real numbering conflict in the published record, not just a
file diff. Employees #016/#018/#019's badges stay "interviewing" until
real receipts exist; no separate action needed there.
