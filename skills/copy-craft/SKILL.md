---
name: copy-craft
version: 1.0.0
description: |
  The structural/persuasion + platform-mechanics layer, distinct from voice
  (voice-file), from studied creator patterns (inspiration-library), and from
  funnel/CTA logic (monetisation). Encodes what actually earns distribution and
  read-through per platform (dwell time, hook windows, retention mechanics) and
  the timeless direct-response structure checks. Defers to real evidence in
  `performance-log.md`'s Lessons sections over generic best practice whenever
  they conflict — this repo's own data outranks any external claim. Load this
  before writing any draft, same tier as inspiration-library.
argument-hint: (no arguments — loaded as context by content-engine, not run standalone)
allowed-tools:
  - Read
  - Grep
---

# Copy Craft — structure, platform mechanics, and proof over opinion

Voice tells the engine how she sounds. Patterns tell it which format/hook
shape to borrow. This tells it **why a piece would or wouldn't actually get
read, watched, or acted on** — the mechanical layer under the words.

**Order of authority when these conflict:** `performance-log.md` Lessons
(real data for *this* audience) > this file (external best practice, dated) >
generic instinct. If the log has 5+ posts of evidence pointing one way and
this file says another, evidence wins — flag the conflict in the draft's
Critic notes rather than silently picking one.

---

## Timeless structure checks (platform-agnostic)

Run every draft against these regardless of platform:

1. **One idea, one piece.** If a draft is trying to make two points, it's two
   drafts. Split it.
2. **The hook makes a promise; the ending keeps it.** A hook that oversells
   causes a visible drop-off before the payoff — check the ending actually
   delivers what the opening implied.
3. **Specificity beats vagueness, always.** A real number, name, or exact
   moment beats an abstract claim in every case. If a draft says "a lot of
   people" or "recently," find the real one from `personal-brain.md` or
   `research-notes.md`, or mark `[VERIFY]`.
4. **Curiosity gap or bold claim, not both crammed into one line.** Pick one
   hook mechanism per opening — identify a specific struggle, challenge an
   assumption, or tease insider knowledge. Don't stack all three.
5. **The CTA asks for one small thing**, not "follow, like, share, and comment"
   stacked — `monetisation/SKILL.md` picks *which* CTA; this just enforces
   that it's singular.

## Platform mechanics (dated — recheck periodically, algorithms move)

### LinkedIn

- **The first ~210 characters are the entire game** — that's what shows before
  "see more." The hook must work as a complete, curiosity-inducing thought on
  its own, not a lead-in that needs the rest to make sense.
- **Dwell time is the primary ranking signal**, not likes. Posts read for 60+
  seconds vastly outperform quick-glance posts — so short paragraphs (2–3
  lines), a line break every 1–2 sentences, and enough real substance (150–300
  words is a solid target) to earn a full read all matter more than being
  short for the sake of short.
- **PDF/document carousels currently outperform text-only posts on dwell
  time** — worth defaulting to for pillar content that can be broken into
  steps, not just for the "Time Wins" pillar's quick tips.
- Comments that carry specific detail or a real question outrank generic
  praise for the algorithm — so a CTA that invites a specific answer (not
  "thoughts?") does double duty as both engagement and lead-gen.
- [Sources: dwell-time and formatting figures per industry analysis, 2026 — treat as directional, re-verify if `performance-log.md` shows a different pattern for this account specifically.]

### Instagram Reels / TikTok / YouTube Shorts

- **The decision window is under 2 seconds**, not 3 — assume viewers decide
  almost immediately. The first frame must answer one of: what's happening,
  why should I care, what will I get.
- **Design for sound-off** — 60%+ of mobile viewing has sound off. The
  on-screen text must carry the hook alone, not just reinforce audio.
- **One hook mechanism, matched to the payoff** — a bold claim or a
  curiosity gap, and the video must deliver on it inside the first 10 seconds
  or retention craters.
- Target self-check: would this survive a "3-version test" (same content, 3
  different hooks) — is the chosen hook the strongest of at least two
  alternatives considered, not just the first one written?
- [Sources: short-form retention-window research, 2026 — same re-verify note as above.]

### X / Substack / long-form

- Thread/long-form earns a different contract with the reader: the first
  line still has to earn the click-through or expand, but the payoff can
  build across multiple beats rather than landing in one hit.

---

## Using `performance-log.md` as ground truth

Before finalizing a draft, check whether `performance-log.md` has a Lessons
section (written by `performance-tracker`). If it does:

1. Does this draft's pillar/format/hook-shape match a pattern logged as a
   **winner** (high engagement rate) or a **loser** (low engagement rate) for
   this specific audience?
2. If it matches a logged loser pattern, don't ship it as-is — note the
   conflict and either change the hook/format shape or make an explicit,
   reasoned case for why this piece is different enough to try anyway.
3. If there's no logged evidence yet (early on, thin data), fall back to this
   file's platform mechanics and the timeless checks above — and say so in
   the Critic notes, so it's clear the piece is untested-territory, not
   proven.

## What this skill does not do

- Does not decide which of the 15 studied patterns to use — that's
  `inspiration-library`.
- Does not decide the CTA or ACP stage — that's `monetisation`.
- Does not decide tone/wording — that's `voice-file` + `positioning`.
- Does not invent platform statistics — cite the general mechanic, defer to
  real logged data when the two disagree.
