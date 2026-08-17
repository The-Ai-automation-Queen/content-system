---
name: linkedin-rvd
description: >
  Fatiha's one LinkedIn command. Built on the Richard van der Blom Algorithm
  Insights 2026 report + her 18/05/2026 audit + the France-to-Gulf pivot
  (EDR-014). Use when she says /rvd, "RVD", "linkedin", "what do I post",
  "linkedin strategy", "linkedin daily", or pastes a LinkedIn draft. ONE
  behaviour, no modes, no arguments to choose. It does everything.
---

# LinkedIn RVD: one command, does everything

When this fires, run the full flow below in order. Do not ask the user which
"mode". Do not present a menu. There are no modes. Just do all of it.

## Locked context (never re-litigate, never re-derive)

- Region target: **Gulf/MENA primary, global reach** (EDR-014). France follower
  decay is expected and fine. Gulf is the growth market. Global reach welcome.
- LinkedIn lane = **B2B corporate only** (enterprise, government, teams, L&D).
  B2C founders / solo entrepreneurs are NOT a LinkedIn target; they are served
  on Instagram and other channels. Never put B2C founder content on LinkedIn.
  (Updated 15/06/2026: gender removed from descriptor per EDR-015. AAQ
  women-coded register stays valid on IG, not on LinkedIn.)
- Contractions allowed on LinkedIn (natural voice). Banned everywhere else.
- Root cause of the reach collapse: no clean topic fingerprint. Fix = 3 anchors,
  held in posts AND comments.
- Governing metric: saves + DM conversations per impression. Not reach, not likes.
- Positioning truth: she does NOT build AI. She builds WITH AI. The verb is
  TRANSLATE. The proof is the build. 20 years vendor side = the filter.
  Daily AI usage = the learnings. She translates both for teams.

## The 3 anchors (the fingerprint, locked 22/05/2026 v4)

1. Cut the noise. Bring only what matters for the decision.
2. What AI training should actually teach (and what most of it skips).
3. What I learn building my business with AI every day.

Everything off these three is noise: crisis/geopolitics, LeLabPlus PR,
recruitment, amplifying others. Off the feed and off her comments. Regional
bridge frame, use sometimes (not every post): "here is what I see running
this in the Gulf." Do not force Gulf into universal content.

## The flow (run every time /rvd fires)

**Step 1. Keep the strategy current.**
Look for the newest `builds/outputs/linkedin-audit/LinkedIn-Content-Strategy_*.md`.
- If none exists, or it is older than 30 days, or the user just changed
  positioning/region, rebuild it fresh (structure below) and save with today's
  date. Tell her in one line it was refreshed.
- If it is current, do not rebuild. Say one line: "Strategy current (dated X)."

Strategy file structure (this file IS the strategy, keep it tight):
1. The 3 anchors, one proof line each.
2. Psychology layer: 5 drivers (status threat, loss aversion, cognitive
   dissonance, Dunning-Kruger, information overload), 3 save triggers,
   7 writing rules, anchor-to-psychology mapping.
3. Pillar mix table: Authority 40-50 / Affinity 15-25 / Proof 15-20 /
   Demand 5-10.
4. Weekly engine: 3 posts Tue/Wed/Thu, 10:00-14:00 Dubai, format rotation
   (never same format back to back, 1-2 documents/week), pillar per slot.
5. ~27 ready post titles, each tagged anchor + pillar + format + psychology
   driver + save trigger + source. ALL B2B corporate. Every title sourced
   from STORIES.md, curriculum, or vendor-side experience. Nothing invented.
   Proof entries use a real number or `[PLACEHOLDER]`.
6. Metrics: saves + DMs per impression; monthly Location-split check
   (Gulf primary, global welcome).
7. Psychology audit checklist (pre-publish gate).

**Step 2. Give today's actions.**
Run `scripts/today.py`, present the filled checklist (Gulf-aware: posting day
Tue/Wed/Thu, window 10:00-14:00 Dubai, weekend = light touch, daily comment +
nurture). Then pull the next 1 to 3 unused titles from the strategy file's
topic bank so she knows exactly what to post next, not just "post something".

**Step 3. If she pasted a draft, check it.**
Detect a pasted LinkedIn draft automatically (no keyword needed). Run it
against `references/rvd-doctrine-2026.md` + the psychology audit checklist
(Section 7 of the strategy file): hook on line 1, fits one of the 3 anchors,
activates at least one psychology driver, document format if it can be,
1,400-1,800 chars if text, one of the 4 durable structures, close lands then
a closed question or nothing (no in-post sales CTA, no raw link), would the
ICP save it (and which save trigger). Gulf frame when relevant, global-neutral
otherwise. Give a short verdict and the 1 to 3 fixes that matter most. Hand
to `/critic` only if she wants a graded 1-10 score.

**Hook Bank check (new gate).** Match the draft's hook against `context/hook-bank.md`. If it traces to a Bank skeleton (Section A / B / C) at ≥95% structural overlap, name the skeleton ID + mechanism in the verdict ("hook matches OWN-001 · shock-swap"). If no match, flag as `[NEW HOOK CANDIDATE]` and propose the nearest skeleton match as the fix. Bank-match status is a save-trigger signal — own outliers and ≥5x swipes reliably out-save unproven structures.

**Topic-bank generation (Step 1 strategy rebuild).** When generating the ~27 ready post titles, every title MUST be tagged with `hook_skeleton_id` + `hook_mechanism` from `context/hook-bank.md`. Distribute mechanisms across the topic bank so no week relies on a single skeleton.

Hard rules throughout: Gulf primary but global reach welcome, never France,
one lane per post, no fabricated proof or clients, "built WITH AI" never
"built AI", contractions OK on LinkedIn, pull voice/positioning from CLAUDE.md
(do not re-derive). Keep every output tight and plain. No jargon at her.

## Reference files (internal, never shown to her unless asked)

- `references/rvd-doctrine-2026.md` : ranked levers + exact multipliers.
- `scripts/today.py` : the date-aware daily checklist.
- Audit + daily plan + strategy: `builds/outputs/linkedin-audit/`.
