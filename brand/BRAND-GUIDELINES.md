# Shift & Lead — visual identity

The visual canon for every Shift & Lead property: www.shiftandlead.com,
guides.shiftandlead.com, brief.shiftandlead.com. Voice and positioning live in
`positioning/SKILL.md` and `queen-brain/voice.md`; this file covers what things
look like. If a page drifts from this, the page is wrong.

## Colors

| Token | Hex | Use |
|---|---|---|
| Ink | `#1A1A1A` | Body text, dark sections, the mark's tile |
| Canvas | `#FFFFFF` | Page background |
| Electric | `#2C4BE0` | The brand blue: links, buttons, accents, the ampersand |
| Navy (accent-deep) | `#1B2EA0` | Hover states, deep accents, kickers |
| Cream | `#EEF2FC` | Tinted section backgrounds, cards |
| Accent tint | `#E4EAFB` | Card borders on cream |
| Rule | `#D8D6D2` | Hairlines, borders |
| Muted | `#5C5A57` | Secondary text |
| Signal red | `#E63955` | RESERVED: the Brief's IGNORE verdict and Breaking dot only. Never decorative. |

## Typography

| Role | Face | Notes |
|---|---|---|
| Display / headlines | Playfair Display (400/700, italic for emphasis) | The wordmark face |
| Body | Source Serif 4 | 17px base, 1.6-1.75 line height |
| UI / chrome | Inter | Nav, buttons, forms, captions; uppercase with letter-spacing for nav |
| Labels / kickers | Space Mono | Uppercase, wide letter-spacing; verdicts, eyebrows, stamps |

## The wordmark

**Shift & Lead** set in Playfair Display 700, ink on light, white on dark.
In page navs it renders as live text (21px), not an image.

## The mark: the ampersand

The brand mark is the **Playfair Display italic 700 ampersand** in Electric
`#2C4BE0`. On light surfaces it sits on an ink rounded-square tile
(radius ≈ 20% of tile width). On dark surfaces the tile is dropped and the
electric ampersand stands alone.

Files:
- `brand/mark-512.png` — the tile mark, 512px, transparent corners
- `brand/mark-brief-512.png` — the Brief's variant: same tile, italic "B"

## The favicon (added 08/07/2026)

Every property serves real icon files (not inline SVG — Safari and Google
results ignore those), generated from the mark at 512px:

- `/favicon.ico` (32px), `/favicon-32.png`, `/apple-touch-icon.png` (180px)
- www.shiftandlead.com and guides.shiftandlead.com use the ampersand mark
- brief.shiftandlead.com uses the "B" variant, same tile system

Every real page carries, right after the viewport meta:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

Redirect stubs skip the tags. New pages must include them.

## Logo lockups

Horizontal lockup: mark left, wordmark right, optically baseline-aligned.

| File | Background | Use |
|---|---|---|
| `brand/logo-transparent.png` | Transparent | Anywhere on light or photographic surfaces |
| `brand/logo-white.png` | White | Documents, invoices, partners who require a solid background |
| `brand/logo-black.png` | Ink `#1A1A1A` | Dark surfaces; tile dropped, ampersand in electric, wordmark white |

Rules:
- Do not recolor the ampersand off Electric, stretch the lockup, or set the
  wordmark in another face.
- Clear space around the lockup: at least the height of the ampersand's tile
  on all sides.
- On dark surfaces always use the tile-less variant (`logo-black.png` shows
  the treatment); the ink tile disappears on dark backgrounds.

## Regenerating

Marks and lockups are rendered from the real Playfair Display webfont in
headless Chromium at 512px/2000px and downscaled with ffmpeg. If the mark ever
needs regenerating, render at source size first; never upscale the small files.
