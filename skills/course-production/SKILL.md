---
name: course-production
version: 1.0.0
description: |
  The AI-twin course factory's front end. Converts a written flagship lesson
  (fast-forward/course-whop-upload/*.md) into everything the render pipeline
  needs: a spoken-register teleprompter script split into ≤60s twin segments,
  a screen-demo shot list precise enough to batch-record without re-reading
  the lesson, a per-lesson slide-deck brief (for Gamma), the assembly order,
  and the lesson's platform metadata (title, description, CTA). Run per lesson
  or per module. The twin renders the [TWIN] segments (see the heygen skill +
  docs/AUTOMATED-DELIVERY-BLUEPRINT.md §2); the operator records only the
  screen demos and QAs the result. Prerequisite: avatar_id + voice_id recorded
  in inventory.md.
argument-hint: "[lesson file path | module <M0..M9> | calibration-script]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
---

# Course Production — lesson.md → render-ready package

You convert written lessons into production packages for the AI-twin pipeline.
You do not render video and you do not touch course prose meaning — you
*transform register and structure*, never content.

Load first: `positioning/SKILL.md` (voice) and the lesson file(s). The flagship
lives in the `fast-forward` repo: `course-whop-upload/`. In `module` mode,
process every lesson file of that module in sequence.

## Special mode: `calibration-script`

Produce the one-time recording-session script for the avatar/voice clone
(Operator Playbook Phase 1.2): ~15 min of natural talking-head prompts (varied
emotion: greeting, teaching, story, emphasis, humor) + ~15 min of clean read
text covering her phoneme range and the words the course says most (Claude,
Fatiha, automation, agent, Skool, Whop, tool names from the lessons) + the 4
connector clips (greeting / "let's look at the screen" / "back to me" / lesson
close). Output: `reports/YYYY-MM-DD-calibration-script.md`.

## Per lesson, produce four artifacts

### 1. Teleprompter script (`[TWIN]` segments)

- Rewrite the lesson's teaching prose into **spoken register**: contractions,
  short sentences, direct address, no headers read aloud, no "as mentioned
  above." Numbers become speakable ("about four hundred minutes", not "~400").
- Split into segments of **max 60 seconds** (~140 words each), each with a
  purpose label: `INTRO`, `CONCEPT`, `TRANSITION-TO-SCREEN`, `RECAP`, `CTA`.
- Segment 1 always opens with the lesson's hook (pull it from the lesson; if
  the lesson has none, write one per inspiration-library patterns and flag it
  as an addition for QA).
- Mark pronunciation hazards in a `SAY:` note (names, acronyms) — these are
  what the operator checks at QA.

### 2. Screen-demo shot list (`[VO]` blocks)

For every hands-on portion: the exact starting state, the exact actions
(clicks/commands/typed text), what must be visible on screen at the end, and
expected duration. Write the voice-over narration alongside, paced to the
actions. The test: the operator can batch-record every demo of a module in one
session using ONLY this list.

### 3. Slide-deck brief

Per lesson: 5–10 slide briefs (title + the one idea per slide + any exact copy
from the lesson) ready for Gamma generation. Slides carry the lesson's key
frames only — never full paragraphs.

### 4. Assembly & metadata

- Segment order: which TWIN/VO/slide blocks compose the final cut, in sequence.
- Platform metadata: lesson title as taught, 2–3 sentence description, the
  lesson's single CTA (next lesson, worksheet, or community — from the lesson
  itself; prices only from the canonical ladder).

## Output

One file per lesson:
`fast-forward/course-whop-upload/production/<lesson-file-stem>.production.md`
containing the four artifacts under clear headers, plus a header block:
source file, word counts, segment count, estimated render minutes, open QA
flags. In `module` mode, finish with a module manifest
(`production/<module>.manifest.md`): lesson list, total estimated render
minutes, the batch shot-list summary, and anything flagged for the operator.

## Rules

1. **Meaning is frozen.** You change register, never substance. If a lesson
   contains an error or a stale claim, flag it in the QA block — don't silently
   fix teaching content.
2. Prices, offer names, and URLs come from the canonical sources
   (`docs/FLAGSHIP-COURSE-STRATEGY.md` §1.4, active `lead-magnets.csv` rows) —
   never from the lesson if they conflict; flag conflicts.
3. Estimated render minutes = spoken words ÷ 140 per segment, summed — keep it
   honest; the operator budgets render credits from this number.
4. Lesson 0.0 (SHOCK-AND-AWE) is flagged `RECORD-HER-REAL-FACE` — the course
   opens with the real Fatiha; the twin carries the rest (disclosed in that
   same lesson).
5. Every package ends with the QA checklist the operator runs on the rendered
   video: pronunciation hazards listed, claims to verify, CTA correct.
