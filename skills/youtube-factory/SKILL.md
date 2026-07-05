---
name: youtube-factory
version: 1.0.0
description: |
  The long-form authority engine. Produces a complete, twin-renderable YouTube
  tutorial package: script (result-reveal structure), AI-twin render brief,
  screen-demo shot list, and full SEO kit (titles, description, tags,
  chapters, thumbnail brief). Long-form tutorial YouTube is the biggest
  channel gap vs. the tracked creators (Nate Herk 826K+ views, Jeff Su 3.8M+,
  Layla 513K+, Marina Mogilko 11M subs): tutorials rank in search, sell
  evergreen, establish depth-authority that shorts cannot, and each video
  feeds reels-factory 5-10 shorts. With the avatar clone, production cost is
  one screen-recording session per video — the twin does the talking. Run
  weekly; one video per week compounds.
argument-hint: "[build <topic> | from-lesson <flagship lesson id> | from-research]"
allowed-tools:
  - Read
  - Write
  - Edit
  - WebSearch
---

# YouTube Factory — long-form that compounds

You produce one complete video package per run. Modes:
- `build <topic>` — from a stated topic
- `from-lesson <id>` — adapt a flagship course lesson into a public tutorial
  (teach the WHAT and one full WHY-IT-WORKS example; the complete system stays
  in the paid course — this is the IP tiering rule from
  `docs/FLAGSHIP-COURSE-STRATEGY.md` §2: demonstrate depth, sell the install)
- `from-research` — pick the highest-signal topic from the latest RESEARCH entry

Load first: `positioning/SKILL.md`, `inspiration-library/SKILL.md`,
`personal-brain.md`, `skills/monetisation/SKILL.md` (for the one CTA).

## The script (8–12 minutes, result-reveal structure)

Modeled on the tracked winners — this structure is not optional:

1. **0:00–0:15 Result reveal** (Nate Herk pattern): show the finished output
   FIRST. "This system wrote, scheduled, and posted 5 pieces of content while
   I slept. I'll build it with you from zero." Then the walk-back.
2. **0:15–0:45 Stakes + credibility**: the time cost of doing it by hand
   (before/after contrast, Adam Digital pattern) + one line of story from
   personal-brain. No résumé recitation.
3. **0:45–1:15 Roadmap**: the 3–5 steps as a numbered promise ("by minute 10
   you'll have X running"). These become the chapters.
4. **Body — steps**: each step = talking-head transition (twin) + screen demo
   (voice-over). Jeff Su discipline: problem → tool → exact steps → visible
   result. Every step ends with the output on screen.
5. **Close**: recap in 3 lines + exactly ONE CTA (comment keyword or the
   free resource → the funnel does the rest). No "like and subscribe" begging;
   one earned ask.

Write the full script in her voice with two registers clearly marked:
`[TWIN — talking head]` blocks (spoken register, contractions, short lines)
and `[VO — over screen]` blocks (narration paced for actions on screen).

## The render brief (for the twin pipeline)

- Teleprompter text per `[TWIN]` block, one file section per segment,
  max 60 seconds each (short segments render cleaner and edit cheaper)
- Screen-demo shot list per `[VO]` block: exact clicks, what must be visible,
  expected duration — precise enough that the operator can record all demos
  in one batch session without re-reading the script
- Assembly order (segment sequence for Remotion/template edit)

## The SEO kit

- 3 title options using the proven formulas: "Build [Thing] with AI in
  [Time]" · "[Tool] Tutorial for Beginners" · "I used [tool] for [time] —
  here's what happened". Under 60 chars, number where honest.
- Description: 2-line hook, chapter timestamps, resource links (active
  lead-magnet URLs only), one CTA. 150–300 words.
- 10–15 tags, chapter list (from the roadmap), and a thumbnail brief:
  3–5 words max, the result visible, her face (real photo, not twin render —
  thumbnails are the one place authenticity is checkable).

## Output & handoffs

Append to `content-vault.md` as the next `## ENTRY NNN` (Platform: `YouTube`,
Format: `long-form tutorial`, Status `DRAFT`, critic-scored) with the script
inline; write the render brief + SEO kit to
`reports/YYYY-MM-DD-youtube-package-<slug>.md`.

Then flag in the operator briefing: ① screen demos to record (the only human
production step), ② after publish, run `reels-factory` on this video — every
long-form is also 5–10 shorts, ③ next week's newsletter should link it.

## Rules

- One video teaches ONE result. If the script needs "also" more than twice,
  split the topic.
- Public tutorials demonstrate single machines; the assembled 7-machine loop
  and the full skill library are paid-tier only (IP rule — never publish the
  full system map).
- Never fabricate results on screen: demos show real outputs or the video
  waits. Credibility is the product.
