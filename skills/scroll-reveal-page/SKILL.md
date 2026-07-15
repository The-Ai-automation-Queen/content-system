---
name: scroll-reveal-page
version: 1.0.0
description: |
  Builds a self-contained scroll-reveal landing page (single index.html, no
  frameworks, one IntersectionObserver) from real source content: a hero,
  repeatable .step sections that fade/slide in as the reader scrolls, and a
  small component set (pill, dark callout, prompt/screenshot frame, card
  grid). Colors and fonts are pre-mapped to queen-brain/brand.md so the skill
  never re-asks for a brand. Use to turn a lead magnet, guide, or product doc
  into a page people scroll through instead of a wall of markdown.
argument-hint: "[content source — a lead-magnets/*.md file, an ENTRY number, a products/*.md file, or 'blank' for an empty shell]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
---

# Scroll-Reveal Page — Editorial Landing Page Builder

You turn existing written content (a lead magnet, a guide, a product doc) into a
single-file HTML landing page with a hero and scroll-triggered `.step` sections,
styled in the Shift & Lead brand. The interaction and design system are already
built and proven — `template.html` in this skill folder is the starting point for
every run. Your job each time is content mapping, not re-inventing the shell.

## Before you start

1. Read `queen-brain/brand.md`. The tokens in `template.html` were mapped from it
   on 09/07/2026 (canvas #FFFFFF, ink #1A1A1A, accent #2C4BE0/#1B2EA0, light-blue
   #7FA0FF on dark, muted #5C5A57, rule #D8D6D2 — Playfair Display / Source Serif
   4 / Inter / Space Mono). If brand.md has changed since, update the `:root`
   block in `template.html` itself so every future run of this skill stays
   correct, not just this one output.
2. Load `queen-brain/voice.md`: no em-dashes, plain English, first person for
   founder content, Traffic Light Rule wherever the content touches AI/data
   handling.
3. Identify the content source from the argument (a file path, an ENTRY number
   in `content-vault.md`, or a `products/*.md` file). If none is given, ask.

## What NOT to do

- **Never invent copy.** Every sentence in the hero, steps, pills, and callouts
  must trace to the source document. This is Law 7 (no invented numbers/claims)
  applied to page-building: if the source doesn't say it, the page doesn't say
  it.
- **Never point a CTA at something that isn't live.** Check `offers.md` and
  `lead-magnets.csv` status before wiring any button or link. A page that
  promises a product with no checkout is a Law 8 violation, not a design choice.
- **Don't force components onto content that doesn't fit them.** A card grid is
  for a real set or sequence (a week's cadence, three tools). A callout is for a
  rule, warning, or standout line, not a place to dump filler. Numbered step
  markers (`01 / 02 / 03`) only belong where the content is an actual ordered
  process. Most `.step` sections need nothing but a heading and body text —
  reach for a component only when the content genuinely calls for it.
- **Don't add a dark-mode toggle.** brand.md mandates a pure white ground; the
  `.callout`'s dark ink band is the brand's existing device for contrast, not a
  theme switch. This page commits to one visual world on purpose.

## Steps

1. **Read the source content in full.** Don't skim, since every line you use in
   the page has to be copy-accurate to what's approved.
2. **Copy `template.html`** to the target output path (ask where if it isn't
   obvious — typically `site/guides/<slug>.html` for a public guide, or
   alongside the product doc it's built from).
3. **Fill the hero**: wordmark, eyebrow, heading (one word can wrap in
   `<span class="accent">` if it earns the emphasis), intro paragraph, byline,
   and an optional CTA that anchors to `#step-1` or points to something that is
   actually live.
4. **Map the body into `.step` sections**, one per real beat of the content, in
   the order the source presents them. For each step, decide if it needs a
   child component:
   - a rule, a warning, a boundary → `.callout`
   - a reusable prompt or a screenshot → `.mockup` (`.mockup-body-text` for
     prompts, `.mockup-body > img` for screenshots)
   - a short standout label → `.pill`
   - a real set/sequence (not a filler list) → `.card-grid`
5. **Fill the footer** with the source's actual closing line, if it has one.
6. **Check it against the source once more**: every claim traceable, no
   em-dashes, no CTA to a dead destination, Traffic Light Rule present if the
   content touches pasting data into AI tools.
7. **Report the output path** and note anything you left out of the page
   because the source didn't support it (better to under-fill than invent).

## Reference

- `template.html` — the full shell (design tokens, hero, one example `.step`,
  every component, the IntersectionObserver script). Copy it, don't rewrite it
  from memory.
- Component and interaction spec came from the "Editorial Scroll-Reveal Landing
  Page" megaprompt (session 09/07/2026): single file, no frameworks, ~15 lines
  of JS, one observer, reveal-once, `prefers-reduced-motion` disables the
  animation entirely, progressive enhancement if JS never runs
  (`html:not(.js) .step`).
