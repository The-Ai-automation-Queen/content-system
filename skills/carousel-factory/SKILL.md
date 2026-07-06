---
name: carousel-factory
version: 1.0.0
description: |
  Turn a READY TO POST vault entry into a pixel-perfect, brand-locked
  Instagram/LinkedIn carousel: Claude writes the slides as HTML from the
  templates here, a headless Chromium screenshots each slide at 1080x1350,
  and the PNGs land next to the vault entry as DRAFT assets for M02.
  No Canva credits, no drift, deterministic output.
argument-hint: "[vault entry number | path to script]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
---

# Carousel Factory

You write carousels as HTML, not in a design tool. The template carries the
brand; you only supply words and pick slide archetypes. Render, inspect,
fix, re-render. Never hand the queue a carousel you have not looked at.

## Canon (read before writing)

- `queen-brain/brand.md`: palette and type. Electric #2C4BE0 is THE gesture,
  one per slide. Canvas is pure white #FFFFFF. Ink #1A1A1A. Tint #E4EAFB,
  cream #EEF2FC. Playfair Display for headlines, Source Serif 4 for body,
  Space Mono uppercase for labels/kickers, Inter for UI chrome.
- `queen-brain/voice.md`: plain English, no em-dashes anywhere on a slide,
  redaction modeled if a prompt is shown.
- Engine law 2: the last slide is always a keyword CTA from an ACTIVE row
  in `lead-magnets.csv`. Check the row is active the same run.

## Slide archetypes (in templates/carousel-template.html)

| Class | Use |
|---|---|
| `slide--hook` | Slide 1. One Playfair line that stops the scroll. Max 9 words. |
| `slide--point` | One idea per slide: mono kicker + headline + max 3 short lines. |
| `slide--list` | 3 to 5 numbered items, one line each. |
| `slide--quote` | Proof or a pull-quote on cream, source line under it. |
| `slide--cta` | Last slide. "Comment KEYWORD" + what they get. Electric band. |

6 to 8 slides total. One idea per slide. If a slide needs a paragraph,
it is two slides.

## Workflow

1. Read the vault entry (script/draft). Extract: hook, 3 to 5 points,
   proof if any, and the CTA keyword. Verify the keyword row is ACTIVE in
   `lead-magnets.csv`.
2. Copy `templates/carousel-template.html` to a working file
   (`out/<entry-number>-<slug>.html`), keep the `<style>` block untouched,
   and fill the `<section class="slide ...">` blocks. Delete archetypes
   you do not use; duplicate the ones you need.
3. Render: `node render.mjs out/<file>.html out/<entry-number>/`
   (first time: `npm install` in this folder; Chromium comes from
   `CHROMIUM_PATH`, defaulting to `/opt/pw-browsers/chromium`).
4. Look at every PNG with the Read tool. Check: no text overflow, no
   orphan words, electric used once per slide, counter correct.
5. Attach: note the PNG paths in the vault entry, mark the entry's visual
   status, and stop. Distribution (M04) queues it; Fatiha releases it.

## Rules

- Output is DRAFT. Queue, never publish (Constitution Law 11).
- Numbers on slides trace to `queen-brain/proof.md` or the entry's named
  source (Law 7). No invented numbers, ever.
- Do not restyle the template per carousel. Consistency is the brand.
  Template changes are deliberate, separate commits.
- Renders and working HTML go in `out/` (gitignored). Only the template,
  the renderer, and this file live in git.
