---
name: visual-engine
version: 1.1.0
description: |
  The visuals + video layer of Fatiha Chikh's Business OS — turns a text draft
  into the post-ready asset it needs. Three engines: Canva (brand carousels /
  infographics), Gamma (decks / social cards), and the Blotato visual engine
  (AI images via Flux/Imagen/Seedream, AI infographics, and FILM-FREE video —
  narrated AI-voice videos with ElevenLabs voices, plus AI avatar / character
  videos). Use after content-engine produces an entry and before distribution
  queues it, or whenever the operator asks for the visual/video for a specific
  ENTRY. Produces image/PDF/MP4 assets and records their location + URL on the
  entry. Does NOT publish.
argument-hint: "[ENTRY number to build visuals for — e.g. '007'; 'next' for the next entry that needs a visual; or 'carousel-batch' for the weekly 3-carousel batch]"
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
  - mcp__Blotato__blotato_list_visual_templates
  - mcp__Blotato__blotato_create_visual
  - mcp__Blotato__blotato_get_visual_status
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
| **IG/LinkedIn carousel** (text-heavy slides) | **`skills/carousel-factory/`** | Primary path: HTML slides → 1080x1350 PNGs via headless Chromium. Brand-locked template, zero credits, deterministic. Fall back to Canva only for formats the template can't do. |
| **Explainer / motion-graphics VIDEO from scratch** | **`skills/hyperframes/`** | HTML-to-MP4 with agent skills (slideshow, faceless-explainer, website-to-video, embedded-captions). Remotion (`skills/remotion/`) for heavier React motion design. |
| **LinkedIn carousel / infographic** (Canva fallback) | **Canva** | Brand-kit colors + templates; cleanest text-on-slide; exports PDF/PNG |
| **Slide deck / multi-slide social post** | **Gamma** | Fast prompt → structured slides; good for "Freedom Business Test"-style decks |
| **On-screen text cards for a video** (the `[ON SCREEN: …]` cues) | **Canva** | One branded card per cue, exported as PNG sequence |
| **Film-free short-form VIDEO** (narrated, no camera) | **Blotato** `create_visual` | AI images + ElevenLabs voiceover → finished 9:16 MP4 — see the video section below |
| **AI image / infographic** (photoreal or stylized, on demand) | **Blotato** `create_visual` | Flux / Imagen / Seedream / nano-banana via template — no Midjourney needed |
| **Quick visual variations to choose from** | **Gamma** then refine in Canva | Gamma for speed, Canva for brand polish |

> **What changed (v1.1.0):** AI *images* (Flux/Imagen/Seedream/Ideogram-class) and
> AI *video + voice* (HeyGen/ElevenLabs-class) are **now connected — inside
> Blotato's visual engine** (`blotato_create_visual`). The old "not connected"
> disclaimer is retired. The one capability still gated is a talking video of
> *her actual face*: see the brand-safety note in the video section.

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

## Film-free video & AI imagery — the Blotato visual engine

This is the layer that lets her ship short-form **video without filming** and
generate imagery on demand. It all runs through `blotato_create_visual`:
**pick a template → render → poll `blotato_get_visual_status` (≥15s between
polls) until `done` → grab `mediaUrl` (video) / `imageUrls` (slides) → record
on the entry → hand the URL to `distribution`.** Watch for `insufficient-credits`
and report it. The IDs below were live on 2026-06-23 — if one 404s, re-discover
with `blotato_list_visual_templates`.

### Film-free video (the HeyGen + ElevenLabs combo, built in)

| Use it for | Template id | Notes |
|---|---|---|
| **Narrated faceless video** — script + AI images + AI voice (great for Time Wins, What's Worth It, explainer/list reels) | `/base/v2/ai-story-video/5903fe43-514d-40ee-a060-0d6628c5f8fd/v1` | One scene per beat: each scene = an AI image prompt + the voiceover line. Feed the vault script lines as `script`. 9:16, captions, crown-yellow highlight (`#FFD700`). |
| **AI talking character / selfie video** | `/base/v2/ai-selfie-video/57f5a565-fd17-458b-be43-4a2d8ccaca75/v1` | Consistent character across scenes. ⚠️ Not *her* face — see brand-safety note. |
| **Avatar + auto B-roll** (you supply an avatar clip) | `/base/v2/ai-avatar-broll/7c26a1cd-d5b3-42da-9c73-2413333873b3/v1` | Feed a real avatar video URL (e.g. a HeyGen export of *her* avatar) → adds AI B-roll. The on-brand way to go faceless. |

**Default brand voice:** `Alice (British, confident)` — warm, authoritative, with
edge; matches her voice spec. (Also fitting: `Jessica (American, expressive)`,
`Lily (British, warm)`.) Use **one** voice across every video — audio consistency
is the brand's scroll-stopper the way Donnelly's green is his.

**Brand-safety note (do not skip):** this is a *personal* brand. A generic AI
avatar that is not Fatiha must **never** be presented as her. For now, ship
**narrated faceless video** (no face, or a real avatar of her). If a draft truly
needs a talking face that looks like her, mark the entry `NEEDS HER FACE` — she
films a take, or supplies a real HeyGen/ElevenLabs clone of *herself* for the
avatar-broll template. That clone is the endgame; narrated faceless is the
ship-now option.

### AI images & infographics

| Use it for | Template id |
|---|---|
| **Single AI infographic** (one striking image from a description) | Whiteboard `ae868019-820d-434c-8fe1-74c9da99129a`, Newspaper `07a5b5c5-387c-49e3-86b1-de822cd2dfc7`, Billboard `76b3b959-bdbe-440d-8428-984219353f18`, Breaking News `8800be71-52df-4ac7-ac94-df9d8a494d0f` (+ ~20 more styles via `list_visual_templates`) |
| **AI image carousel** (one generated image per slide) | `53cfec04-2500-41cf-8cc1-ba670d2c341a` (Instagram Carousel, nano-banana-pro) |
| **Image slideshow with text overlays** | `/base/v2/image-slideshow/5903b592-1255-43b4-b9ac-f8ed7cbf6a5f/v1` |
| **Quote / tweet-card / tutorial carousel** | `/base/v2/quote-card/77f65d2b-48cc-4adb-bfbb-5bc86f8c01bd/v1`, `/base/v2/tweet-card/ba413be6-a840-4e60-8fd6-0066d3b427df/v1`, `/base/v2/tutorial-carousel/e095104b-e6c5-4a81-a89d-b0df3d7c5baf/v1` |

Always replace the template's default footer CTA ("Follow me for more…") with the
**entry's real CTA**, and carry the brand color/voice. You are formatting approved
copy, not re-authoring it.

> **Canva/Gamma vs Blotato:** use Canva/Gamma when she wants a hand-polished,
> brand-kit carousel/deck she'll tweak. Use Blotato when she wants a *finished,
> hands-off* asset (especially video) that flows straight into the queue. For the
> autonomous loop, Blotato is the default; Canva/Gamma is the craft option.

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

## Weekly mode: `carousel-batch`

The volume play (inspiration-library: Chris Donnelly — carousels at 2× post
performance, produced in batches, one signature look). Run once a week:

1. Read `performance-log.md` and `content-vault.md`; pick the week's **3
   strongest entries** (best engagement if posted; highest critic score if not)
   that don't yet have a carousel.
2. For each, derive a 6–8 slide outline from the entry's existing copy —
   hook slide → one idea per slide → CTA slide with the entry's real CTA.
   One of the three should use the **myth/reality** contrast format when the
   source entry supports it.
3. Build all three in one pass (same template, same brand kit — the signature
   look IS the strategy), export, record `**Visual:**` lines on each entry.
4. Close with the standard handoff plus one line: which of the 3 to post first
   and why.

---

## Output / handoff

End with:
- which entry, what was built (tool, format, count), and where the asset lives
- whether it's now ready for `distribution`, or still blocked (`NEEDS HER FACE`
  for talking-head-of-her content, or `insufficient-credits` on Blotato)
- one line on what to do next (usually: "run `distribution` to queue it")

## What this skill does not do

- Does not publish or schedule — that's `distribution`.
- Does not rewrite approved copy; it formats existing approved lines.
- Does not invent off-brand visuals or ignore the brand kit.
- Generates AI photos/voice/faceless video via Blotato — but never presents a
  generic AI avatar as Fatiha's real face (flags `NEEDS HER FACE` instead).
