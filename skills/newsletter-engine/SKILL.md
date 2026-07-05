---
name: newsletter-engine
version: 1.0.0
description: |
  The owned-audience engine. Produces the weekly newsletter ("The Freedom
  Letter") from what the machine already knows: this week's research signals,
  vault content, personal-brain entries, and performance data. The newsletter
  is the compounding asset every top automation creator runs (Chris Donnelly:
  200K subscribers; Jordan Wilson: podcast→newsletter flywheel; Neil Patel:
  owned channel as source of record) and the single biggest structural gap in
  this system: content that lives on rented platforms dies in 48 hours; the
  list is owned forever and is where tripwire/community/cohort conversions
  actually happen. Run weekly (Friday, so it ships Sunday/Monday).
argument-hint: "[draft | draft --topic <angle>]"
allowed-tools:
  - Read
  - Write
  - Edit
---

# Newsletter Engine — The Freedom Letter

You produce one weekly newsletter issue as a vault entry, ready for the
operator to paste into GHL (email) and LinkedIn (newsletter mirror).

## Load order (non-negotiable)

1. `positioning/SKILL.md` — voice, pillars, promise
2. `inspiration-library/SKILL.md` — hook patterns
3. `personal-brain.md` — this week's real life (the opening story comes from here)
4. `research-notes.md` — the latest 1–2 RESEARCH entries
5. `content-vault.md` — this week's entries (what shipped, what performed)
6. `skills/monetisation/SKILL.md` — current ACP ratio and the one correct CTA

## The fixed format (consistency is the product)

Subject line: Pattern 11 (number-first) or Pattern 1 (provocation) from the
inspiration library. Under 45 characters. Write 3 options, pick the best,
log the other two in the entry metadata for A/B testing in GHL.

Body (600–900 words, her voice — contractions, warm, a little impatient):

1. **The Open (from real life)** — 3–5 sentences from `personal-brain.md`.
   A real moment from her week, connected to the issue's theme. Never generic.
2. **One Big Thing** — the week's most useful insight from research-notes,
   translated for the Corporate Escapee (ICP-1): what it means for *their
   time*, not the industry. One idea only.
3. **Steal This** — one concrete, do-it-today automation win (a Time Wins
   pillar item). Steps, tool names, minutes saved. This section is why people
   stay subscribed.
4. **What's Worth It / What Isn't** — one tool or trend verdict, one sentence
   each. Curation is authority.
5. **The Close + one CTA** — exactly one, chosen from the monetisation CTA
   map by this issue's ACP stage. Default cadence: 3 issues A (lead magnet /
   reply prompt), 1 issue C or P (community / product). Never two P closes
   in a row.

## Output

Append to `content-vault.md` as the next `## ENTRY NNN`:
- Platform: `Email (GHL) + LinkedIn Newsletter` · Format: `newsletter`
- Date `DD/MM/YYYY`, pillar, ACP stage, CTA, Status `DRAFT`
- Critic score using the content-engine rubric; ≥8 → `READY TO POST`
- Metadata: the 2 unused subject lines, and a 2-line LinkedIn teaser post
  that links to the issue (the newsletter gets its own A-post announcing it)

## Rules

- No issue without a real personal-brain detail in the Open. If the brain has
  no entries this week, STOP and flag "brain empty — run /brain-manager" in
  the operator briefing instead of writing generic filler.
- Repurpose, don't recreate: at least one section each week should reuse the
  best-performing vault content of the week (per `performance-log.md`),
  rewritten for email. The newsletter is the week's greatest-hits, not new work.
- The issue must be pasteable: no placeholders, no "[insert link]" — pull real
  URLs from `lead-magnets.csv` (active rows only) and the canonical price
  ladder in `docs/FLAGSHIP-COURSE-STRATEGY.md` §1.4.
