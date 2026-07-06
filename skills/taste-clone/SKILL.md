---
name: taste-clone
version: 1.0.0
description: |
  The Taste Clone — learns Fatiha's editorial taste from every Review Cockpit
  decision. Each approve / edit / kill in review-cockpit/decisions-log.md is a
  labeled training example; this skill compiles them into taste-file.md, a
  ranked, evidence-backed map of what she keeps, what she rewrites, and what
  she kills. content-engine's critic loads it before scoring. Once precision
  is proven, `gate` mode pre-filters the daily 5 drafts so only the top 2
  reach the morning cockpit — the rest archived (never deleted) with reasons.
argument-hint: "[optional: 'compile' (default) | 'status' | 'gate']"
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
  - Bash
---

# Taste Clone — the editorial-judgment layer

> **⚠️ DORMANT UNTIL ≥50 DECISIONS.** This skill has nothing to learn from
> until `review-cockpit/decisions-log.md` holds at least **50 logged
> decisions**. Below that threshold, `compile` may run in draft/preview form
> (taste-file.md gets a LOW-CONFIDENCE banner) and `gate` must **refuse to
> run**. Check `status` first; if the log is thin, say so and stop — do not
> extrapolate taste from a handful of examples.

You are the **memory of her judgment**. The engine drafts, the critic scores,
but only Fatiha's morning taps say what actually sounds like her and what
doesn't. Every one of those taps is logged; your job is to turn that log into
patterns the machine can act on — so over time the critic stops guessing and
starts predicting her.

Read `CLAUDE.md` first. Portfolio context: `docs/AI-TOOLS-PORTFOLIO.md` (#7).
Load `positioning/SKILL.md` before compiling — taste patterns that contradict
the positioning are noise, not signal.

---

## The training data

`review-cockpit/decisions-log.md` — append-only, one line per decision:

```
[YYYY-MM-DD] ENTRY NNN · {approved|edited|killed} · pillar · hook-pattern ·
critic-score · {edit diff summary | kill reason | –}
```

Read it as labeled examples:
- **approved untouched** → the strongest positive label (she'd post it as-is).
- **edited** → the *diff is the lesson*: what she cut, what she added, what
  she rephrased. The edit summary outranks any inference from the final text.
- **killed** → negative label; her kill reason (when given) is gold — quote it.

Cross-reference each ENTRY NNN against `content-vault.md` when you need the
full text (hook wording, CTA, format) behind a decision line.

---

## Modes

### `compile` (default) — rebuild `taste-file.md` from the log

1. Read the full decisions log. Count decisions total and per label.
2. Cluster the evidence into ranked preference patterns, each with counts:
   - **Hooks she keeps** — hook-patterns/mechanisms with high approve rates
     ("personal-reveal hooks: 9 approved / 1 edited / 0 killed of 10 served").
   - **Phrases she deletes** — recurring cuts in edit diffs (words, openers,
     em-dash habits, AI-isms she strips every time).
   - **Topics/angles she kills** — pillars, formats, or claims with high kill
     rates, with her verbatim kill reasons attached.
   - **What her edits add** — recurring additions (more specific numbers,
     shorter first lines, harder opinions) — the direction she pushes drafts.
3. Write `taste-file.md` at repo root (overwrite is allowed for THIS file
   only — it is a compiled artifact, like `voice-file.md`, not a log). Every
   pattern line must cite its decision count and at least one ENTRY NNN.
   Include a header: compile date (YYYY-MM-DD), decisions consumed, and a
   confidence tag (`LOW-CONFIDENCE` under 50 decisions, `ACTIVE` at 50+).
4. Rank patterns by evidence weight (count × recency); patterns backed by
   fewer than 3 decisions go in a "Weak signals — do not enforce" section.
5. Note in the file header that `content-engine`'s critic loads this file
   before scoring: confirmed patterns adjust critic scores; weak signals don't.

### `status` — data readiness check

Print: total decisions in the log · split by approved/edited/killed · distinct
pillars and hook-patterns covered · days of history · **readiness verdict**
("N of 50 decisions — dormant", or "50+ reached — compile is authoritative"),
and, if gating has been proposed, the measured precision so far.

### `gate` — pre-filter the morning drafts (earn it first)

**Preconditions — all three, hard:**
1. ≥50 decisions in the log.
2. **Precision proven over 2+ weeks:** for at least 14 days, taste-file
   predictions (which drafts she'd approve) were compared against her actual
   cockpit decisions and the top-2 picks were approved ≥80% of the time.
   Log this comparison in `taste-file.md` under "Gate precision record."
3. The operator has said yes to gating (a one-time explicit approval,
   recorded in the taste-file header). Never self-activate.

**What gate does**, run after content-engine's 02:30 batch and before the
07:30 cockpit digest:
1. Score the day's 5 DRAFTs against taste-file patterns.
2. The **top 2** stay `DRAFT` and flow to the cockpit as usual.
3. The other 3 get status `ARCHIVED-BY-TASTE` in `content-vault.md`, each
   with a one-line reason citing the pattern ("archived: educational-listicle
   hook — 0/7 approval rate, see taste-file"). **They are never deleted** —
   full text stays in the vault, and she can always ask to see or restore
   them ("show me the archived ones" → list them; restore → back to `DRAFT`).
4. Log each gate decision to the decisions log with actor `taste-clone` so
   gating itself is auditable training data.

---

## Guardrails

1. **Dormant below 50 decisions.** `gate` refuses; `compile` output carries a
   LOW-CONFIDENCE banner. Say the count out loud whenever you run.
2. **Never deletes her drafts.** Gate archives with a reason; the vault keeps
   everything, forever, retrievable on request. Deleting a draft is a bug.
3. **Every pattern cites evidence.** No taste claim without decision counts
   and ENTRY references. Her verbatim kill reasons outrank your inference.
4. **Never publishes, never sends.** This skill writes taste-file.md and
   vault statuses only; the cockpit talks to her, distribution queues.
5. **Append-only conventions everywhere:** decisions-log.md is append-only;
   vault entries get status changes, never rewrites or renumbering. Dates
   are DD/MM/YYYY inside the vault, YYYY-MM-DD in the log and taste-file.
6. **Taste never overrides positioning.** If a "learned" pattern conflicts
   with `positioning/SKILL.md`, flag it for the operator instead of encoding
   it — she may be drifting, or the positioning may need a human decision.
