# Shift & Lead — premium visual identity

The visual canon for every Shift & Lead property and every external brand handoff: `www.shiftandlead.com`, guides, lead magnets, workshops, decks, flyers, social templates and partner-facing collateral.

Voice and positioning live in `positioning/SKILL.md` and `queen-brain/voice.md`. This file covers the visual identity. If a page, deck, flyer or template drifts from this, the asset is wrong.

## Current premium direction

Shift & Lead should feel editorial, sharp, premium, practical and confident. The current premium look is **pure white, ink, electric blue, deep blue, crisp rules and strong typography**.

Do not revive the older warm beige / cream / off-white collateral direction for new premium assets.

## Colors

| Token | Hex | Use |
|---|---|---|
| Ink | `#1A1A1A` | Primary text, dark surfaces, the mark tile, editorial contrast |
| Paper | `#FFFFFF` | Default page, deck, worksheet and flyer background |
| Electric Blue | `#2C4BE0` | Primary brand blue: buttons, links, rules, emphasis, the ampersand |
| Deep Blue | `#1B2EA0` | Premium dark sections, hover states, deep accents, kickers |
| Pale Blue | `#E4EAFB` | Soft blue panels, diagram fields, selected states, light instructional emphasis |
| Line | `#E8E4DD` | Hairlines, borders, table rules and subtle structural separators |
| Muted | `#555555` | Secondary text, metadata, captions |
| Cool Panel | `#F5F7FA` | Neutral utility panel when white-on-white needs structure; never as a dominant brand background |
| Signal Red | `#E63955` | Reserved for critical warning/breaking/error signals only. Never decorative. |

### Color hierarchy

- White is the dominant canvas.
- Ink carries authority and readability.
- Electric Blue is the signature action color.
- Deep Blue creates premium section contrast.
- Pale Blue is a functional support color, not a decorative wash.
- Do not use black text on saturated Electric Blue. Use white text on Electric Blue or Deep Blue.

## Typography

| Role | Face | Minimum size | Notes |
|---|---|---:|---|
| Display / headlines | Playfair Display | 28 px / 24 pt | Main titles, statements, section dividers, wordmark face |
| Body | Source Serif 4 | 17 px / 16 pt | Long-form reading, guide copy, worksheet explanations |
| UI / chrome | Inter | 12 px / 11 pt | Nav, buttons, captions, forms, tables, slide body and utility copy |
| Labels / kickers / eyebrows | Space Mono or system mono | **10 px minimum** | Uppercase, tracked, used sparingly for structure and navigation |

No public brand asset should use visible text below 10 px. Eyebrows, footers, diagram labels and microcopy must remain readable.

## The wordmark

**Shift & Lead** set in Playfair Display 700, ink on light, white on dark. In page navs it renders as live text, not an image.

## The mark: the ampersand

The brand mark is the **Playfair Display italic 700 ampersand** in Electric Blue `#2C4BE0`.

On light surfaces it sits on an ink rounded-square tile. On dark surfaces the tile is dropped and the electric ampersand stands alone.

Files:
- `brand/mark-512.png` — the tile mark, 512 px, transparent corners
- `brand/mark-brief-512.png` — legacy Brief variant; do not use for main Shift & Lead collateral

## Logo lockups

Horizontal lockup: mark left, wordmark right, optically baseline-aligned.

| File | Background | Use |
|---|---|---|
| `brand/logo-transparent.png` | Transparent | Primary logo on white, photos, and light UI surfaces |
| `brand/logo-white.png` | White | Documents, invoices, partner placements requiring a white base |
| `brand/logo-black.png` | Ink `#1A1A1A` | Dark surfaces; tile dropped, ampersand electric, wordmark white |

Rules:
- Do not recolor the ampersand away from Electric Blue.
- Do not stretch, squash, outline, shadow or bevel the lockup.
- Do not set the wordmark in another typeface.
- Clear space around the lockup: at least the height of the ampersand tile on all sides.
- On dark surfaces always use the tile-less treatment.

## Premium layout principles

- Use white space, not tinted backgrounds, as the main premium device.
- Use strong typographic contrast: large Playfair statements, restrained body copy, crisp mono labels.
- Use blue as an intentional signal, not as decoration everywhere.
- Use thin rules and exact alignment to create structure.
- Avoid generic SaaS card grids, rainbow palettes, cyberpunk AI visuals and decorative stock illustrations.

## Imagery

Photography should feel editorial and real: founder portraits, speaking, teaching, working sessions, workshops and behind-the-scenes build moments.

For premium promotional collateral, desaturated or black-and-white photography may be paired with Ink / Deep Blue overlays and Electric Blue accents.

Avoid generic glowing robots, neon brains, fake holograms and stock “AI future” imagery.

## Queen Bot

Queen Bot is a supporting mascot, not the brand mark. She should appear as a royal-blue queen robot with a crown, dress or cape, scepter and a clear `F` on the chest.

Use Queen Bot only when she helps instruction, playfulness or guide navigation. Do not let the mascot overpower the founder, the message or the offer.

## Diagrams and instructional visuals

Every visual must explain one of these:

- a sequence
- a relationship
- a comparison
- a decision
- a transformation

Use strict grids, direct labels, simple arrows and a maximum of 5-6 primary nodes. Avoid floating decorative stars, checkboxes, tiny icons or cluttered pseudo-technical systems.

## Template rules

For decks, flyers, carousels and worksheets:

- Minimum visible type size: 10 px.
- Eyebrows and labels must be readable, not decorative microtype.
- Use white or dark backgrounds as the primary families.
- Keep one clear message per slide/post/flyer whenever possible.
- One CTA per asset.
- Charts must be flat, directly labeled and blue-first.

## Regenerating

Marks and lockups are rendered from the real Playfair Display webfont in headless Chromium at source size and downscaled. Never upscale small logo files.
