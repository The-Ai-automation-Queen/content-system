# M02 — Visuals + Talking Head

## Purpose
Generate on-brand visual assets for every READY TO POST entry: images, carousels,
decks, film-free video, and talking-head video of her real avatar.

## When it runs
- After `content-engine` in the weekly loop
- On demand for specific entries

## Components

### Visual Engine (`visual-engine`)
- **carousel-factory** (primary for carousels) — HTML slides rendered to
  1080x1350 PNGs via headless Chromium; brand-locked, zero credits
- **Canva** — infographics, one-off formats the templates don't cover
- **Gamma** — decks, cards
- **Blotato** — AI images (Flux/Imagen/Seedream), film-free narrated video
  (ElevenLabs voices), AI story videos, infographics

### Motion / programmatic video
- **hyperframes** (primary) — HTML-to-MP4: explainers, motion graphics,
  slideshows, website-to-video; router at `skills/hyperframes/SKILL.md`
- **remotion** — React-based motion design when HyperFrames isn't enough

### Talking Head (`heygen`)
- **Higgsfield** (primary) — her cloned avatar + voice
- **HeyGen** (fallback) — API-based avatar rendering
- Pairs with Blotato `ai-avatar-broll` (talking head speaks, Blotato adds B-roll)
- **captions** (mandatory finishing pass) — karaoke captions burned in
  before any spoken-word video reaches M04; see `skills/captions/`

## Inputs
- READY TO POST vault entries (the script)
- Brand guidelines from `positioning/SKILL.md`
- Template IDs in `visual-engine/SKILL.md`

## Outputs
- Visual assets attached to vault entries
- Entries updated with visual status

## Validation criteria
1. Brand colors and fonts match positioning
2. No generic AI avatar presented as her face
3. Default brand voice is `Alice (British, confident)` for faceless video
4. Talking-head uses HER real cloned avatar only
5. Image quality is platform-appropriate (no stretched/blurry)

## Decision framework for AI delegation
An AI validator should:
- Check visual matches the script's message
- Verify brand consistency (fonts, colors, tone)
- Flag any generic avatar used where her face is expected
- Approve if the visual would stop a scroll on the target platform
