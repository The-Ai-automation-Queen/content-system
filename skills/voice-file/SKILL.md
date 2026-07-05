---
name: voice-file
version: 1.0.0
description: |
  Compiles a real, validated voice file from Fatiha's actual writing/speech —
  not style rules, real corpus. Runs the interview, compiles voice-corpus/ into
  voice-file.md, blind-tests it against real posts, and tracks staleness. This is
  what closes the gap `positioning/SKILL.md` (rules) and `personal-brain.md`
  (facts) can't: content-engine needs to see real sentences she wrote, not just
  adjectives describing her tone. Use when: the voice corpus has new material,
  a blind-test failed, or content keeps reading as "competent AI" rather than
  "her."
argument-hint: "[optional: 'interview' | 'compile' (default) | 'validate' | 'status']"
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
  - AskUserQuestion
---

# Voice File — the real corpus, compiled

`positioning/SKILL.md` tells the engine what her voice is *supposed* to sound
like. This skill gives it real sentences she actually wrote, so it can match
what her voice *actually* sounds like. Rules describe a voice in adjectives; a
corpus is the voice in real words. Both are needed — this skill produces the
half that's currently missing.

Read `voice-corpus/README.md` and `positioning/SKILL.md` first every run.

---

## The problem this solves

`content-engine` loads positioning (rules), `personal-brain.md` (facts),
`inspiration-library` (other creators' patterns), and `content-vault.md` (its
own past drafts). None of those is a real sample of her writing. Without one,
the engine pattern-matches against a rulebook and its own prior output — a
closed loop that reliably produces "competent AI following style rules," which
reads as *close* to her but not *as* her.

## Modes

### `interview` — elicit real writing when the corpus is thin

Use when `voice-corpus/` has fewer than ~10 usable pieces. Unlike
`brain-manager` (which asks about facts/opinions), this interview asks her to
**write**, in her own words, short and low-effort:

1. Ask 4–6 prompts per round via one `AskUserQuestion` call, each requesting a
   short real passage (2–4 sentences), e.g.:
   - "Text a friend explaining what you do for work, like you actually would."
   - "Write the opening line you'd use for a post about [a recent brain entry
     or vault topic] — just the first 2 sentences, unedited."
   - "How would you tell someone to stop overcomplicating their AI stack, in
     your own words, no polish?"
   - "Complain, briefly, about something in your business this week — exactly
     how you'd actually vent about it."
2. Save each answer verbatim to `voice-corpus/interview-YYYY-MM-DD.md`, tagged
   with the prompt. **Never edit or improve the wording** — the rawness is the
   point.
3. Repeat across sessions until the corpus has enough material (see README
   minimums). Rotate prompt types: explaining, opinion, venting, storytelling,
   instructing — voice varies by mode and the file should capture the range.

### `compile` (default) — corpus → `voice-file.md`

1. Read every file in `voice-corpus/`. If fewer than 10 pieces, warn and
   recommend `interview` mode first (still compile, but mark the output
   `LOW-CONFIDENCE DRAFT`).
2. Extract, with real quoted examples for each (never paraphrase the evidence):
   - **Sentence rhythm** — typical length, how often she uses fragments, run-ons
   - **Real recurring words/phrases** — the specific words she reaches for
     (not synonyms a model would pick), including any verbal tics
   - **Opening patterns** — how her real pieces actually start, verbatim examples
   - **Closing patterns** — how she actually ends/lands a piece
   - **Rhetorical habits** — repetition, contrast, questions, lists — only the
     ones actually present in the corpus, not the general "good copywriting" list
   - **Punctuation habits** — em-dash frequency, ellipses, capitalization
     quirks, emoji use or absence
   - **What she never does** — compare against generic AI-writing patterns
     (see banned list below) and confirm which ones are genuinely absent from
     her corpus, not just assumed absent
3. Write `voice-file.md` (target ~800–1,200 words — dense, not a data dump).
   Structure:
   ```markdown
   # Voice File — Fatiha Chikh
   > Compiled: YYYY-MM-DD from N corpus pieces · Confidence: LOW/MEDIUM/HIGH
   > Last validated: YYYY-MM-DD (see Validation Log) · Next re-compile due: YYYY-MM-DD

   ## Real opening lines (verbatim examples)
   - "..."
   - "..."

   ## Real closing lines (verbatim examples)
   - "..."

   ## Words and phrases she actually reaches for
   - ...

   ## Sentence rhythm
   - ...

   ## Rhetorical habits actually present in her writing
   - ...

   ## Confirmed absent — AI-isms she does not use
   - ...

   ## Validation log
   - [YYYY-MM-DD] 3-test result: N/3 correctly identified — PASS/FAIL
   ```
4. Never invent an example. Every bullet under "real opening lines," "real
   closing lines," and "words and phrases" must be a verbatim quote traceable
   to a corpus file. If a pattern seems true but has no direct quote to back
   it, leave it out.

### `validate` — the blind 3-test

1. Pick or draft 3 short pieces on a topic from `research-notes.md` or
   `personal-brain.md`: **one real** (from `voice-corpus/`, lightly trimmed for
   length parity only, no rewording), **two AI-generated** — one using
   `voice-file.md` as context, one using only `positioning/SKILL.md` (no voice
   file) as a control.
2. Present all 3, unlabeled and shuffled, via `AskUserQuestion` (or ask the
   operator to have someone else blind-read them) and ask which one is the
   real one, and which of the two AI ones sounds closer to her.
3. Record the result in `voice-file.md`'s Validation Log. **Pass bar:** the
   real piece is not reliably picked out as "the odd one," AND the voice-file
   draft is preferred over the no-voice-file control.
4. On FAIL: don't tweak the prose by hand — go back to `compile` with more
   corpus (prefer adding real material over hand-editing the voice file).

### `status` — health check, no changes

Report: corpus piece count, voice-file confidence level, days since last
compile, days since last validation, and whether re-compile is due (see
Maintenance).

---

## Maintenance cadence

- Re-run `compile` after every 5+ new corpus pieces land, or every 30 days,
  whichever comes first.
- Re-run `validate` after every recompile, and any time content-engine drafts
  start reading as "generic AI" again (operator's judgment call is the trigger
  — that feeling is real signal, log it as a FAIL and re-validate).
- If `voice-file.md` confidence is LOW for more than 30 days, prioritize
  `interview` mode over producing more content-engine drafts — a low-confidence
  voice file compounds the wrong direction the longer it's used uncorrected.

## Banned-AI-isms starter list

(CLAUDE.md references a banned-words list that was never actually written down
— this is that list, scoped to voice-file's job: confirming a pattern's *absence*
from her real corpus rather than assuming it. Extend as `compile` runs surface
more.)

Em-dash overuse as a rhythm crutch · "In today's fast-paced world" / "Let's
dive in" openers · "It's not just X, it's Y" triads · excessive rule-of-three
parallelism · hedge-everything qualifiers ("might," "could potentially") ·
"unlock/unleash/elevate/leverage" as verbs · summarizing what was just said
before landing the point · a CTA that restates the whole post instead of
asking one real thing.

---

## Wiring into content-engine

`content-engine` should load `voice-file.md` (if it exists and is not
LOW-CONFIDENCE) **alongside** `positioning/SKILL.md`, after the brain and
before the vault — rules set the boundaries, the voice file sets the actual
texture. If `voice-file.md` doesn't exist yet, content-engine runs exactly as
before (positioning + brain only) — this skill is additive, not a blocker.

## What this skill does not do

- Does not draft public-facing content — that's `content-engine`.
- Does not invent or smooth over real corpus examples — verbatim or nothing.
- Does not replace `personal-brain.md` (facts/anecdotes) or `positioning`
  (identity/boundaries) — it adds the texture layer between them.
