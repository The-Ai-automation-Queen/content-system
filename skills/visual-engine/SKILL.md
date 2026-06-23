---
name: visual-engine
version: 1.0.0
description: |
  The visuals layer of Fatiha Chikh's Business OS — the piece that turns a text
  draft into a post-ready visual asset. Generates carousels and infographics with
  Canva and decks / social cards with Gamma, on brand, from a vault entry. Use
  after content-engine produces a carousel or video entry and before distribution
  queues it, or whenever the operator asks for the visual for a specific ENTRY.
  Produces image/PDF assets and records their location on the entry. Does NOT
  publish.
argument-hint: "[ENTRY number to build visuals for — e.g. '007'; or 'next' for the next entry that needs a visual]"
allowed-tools:
  - Read
  - Edit
  - Grep
  - AskUserQuestion
  - mcp__Canva__generate-design
  - mcp__Canva__generate-design-structured
  - mcp__Canva__create-design-from-brand-template
  - mcp__Canva__search-brand-templates
  - mcp__Canva__list-brand-kits
  - mcp__Canva__export-design
  - mcp__Canva__get-design-thumbnail
  - mcp__Canva__get-design
  - mcp__Gamma__generate
  - mcp__Gamma__generate_from_template
  - mcp__Gamma__get_themes
  - mcp__Gamma__get_generation_status
---

# Visual Engine

You turn an approved text draft into the **visual asset it needs to ship**. You are
Layer 5 of the stack (visuals). Read `CLAUDE.md`, `positioning/SKILL.md`, and the
target vault entry before generating anything — the visual must look like *her*.

You produce assets. **You never publish.** (Distribution does that, into a queue.)

---

## Tool choice — when to use which

| Need | Tool | Why |
|---|---|---|
| **LinkedIn carousel / infographic** (text-heavy slides) | **Canva** | Brand-kit colors + templates; cleanest text-on-slide; exports PDF/PNG |
| **Slide deck / multi-slide social post** | **Gamma** | Fast prompt → structured slides; good for "Freedom Business Test"-style decks |
| **On-screen text cards for a video** (the `[ON SCREEN: …]` cues) | **Canva** | One branded card per cue, exported as PNG sequence |
| **Quick visual variations to choose from** | **Gamma** then refine in Canva | Gamma for speed, Canva for brand polish |

> **What this engine does NOT generate:** photoreal or stylized AI *images*
> (Midjourney/Flux/Ideogram-type) and AI *avatar video* (HeyGen-type) + *voice*
> (ElevenLabs-type). Those tools are **not connected** in this environment. If an
> entry needs one of them, mark the entry `NEEDS EXTERNAL VISUAL` and tell the
> operator which capability is missing — do not fake it.

---

## Brand consistency (non-negotiable)

1. Call `list-brand-kits` / `search-brand-templates` (Canva) or `get_themes`
   (Gamma) first and use the brand kit/theme if one exists. Consistent visual
   identity is the scroll-stopper before the hook is even read (inspiration-library:
   Chris Donnelly's "green system").
2. Carry the voice into the visuals: short lines, one idea per slide, the crown 👑
   motif where it fits, no corporate stock-photo energy.
3. Match the copy on the slide to the copy in the vault entry **exactly** — do not
   rewrite the approved lines. You are formatting, not re-authoring.

---

## How to build visuals for an entry

1. **Read the entry** in `content-vault.md`. Identify the visual it needs:
   - A `LinkedIn carousel` entry → its `### SLIDES` block (one design, N slides).
   - A short-form video entry → its `[ON SCREEN: …]` cues → one card each.
   - A text post → usually no visual needed (skip unless an infographic is wanted).
2. **Generate** with the chosen tool, slide by slide / card by card, using the
   entry's exact text and the brand kit.
3. **Export** (`export-design` / Gamma export) to PNG (cards) or PDF (carousel).
4. **Check it** with `get-design-thumbnail` before finalizing — is it on brand and
   legible? Regenerate once if not.
5. **Record it on the entry.** Edit the vault entry to add a `**Visual:**` line:
   `Visual: <Canva|Gamma> <design id / export link> — <PDF carousel | N PNG cards>,
   built DD/MM/YYYY`. Update the entry's readiness note (e.g. remove "build slides
   yourself").

If the operator hasn't specified an entry and several need visuals, pick the next
`READY TO POST` carousel/video entry without a `**Visual:**` line; if ambiguous,
ask once with `AskUserQuestion`.

---

## Output / handoff

End with:
- which entry, what was built (tool, format, count), and where the asset lives
- whether it's now ready for `distribution`, or still blocked (`NEEDS EXTERNAL
  VISUAL` for image-gen/avatar/voice gaps)
- one line on what to do next (usually: "run `distribution` to queue it")

## What this skill does not do

- Does not publish or schedule — that's `distribution`.
- Does not rewrite approved copy; it formats existing approved lines.
- Does not invent off-brand visuals or ignore the brand kit.
- Does not generate AI photos/avatars/voice (not connected) — it flags the gap.
