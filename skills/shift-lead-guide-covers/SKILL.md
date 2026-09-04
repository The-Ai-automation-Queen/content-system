---
name: shift-lead-guide-covers
description: Create original, consistent Shift & Lead editorial cover art for AI guides using ChatGPT image generation. Use when a new guide needs a 16:9 website cover, when replacing legacy guide artwork, or when the user asks for an engraved, surreal, halftone Shift & Lead visual based on a guide title, summary, or central idea.
---

# Shift & Lead Guide Covers

Create one visual metaphor that makes the guide's promise understandable before the title is read.

## Required input

Collect or infer:

- guide title
- one-sentence outcome
- track: `understand`, `setup`, or `tools`
- final slug

Ask one concise question only when the guide's outcome cannot be inferred. Do not ask the user to art-direct the image.

## Workflow

1. Read [references/art-direction.md](references/art-direction.md).
2. Inspect `assets/style-reference.png` before generating.
3. Write three possible concrete metaphors. Prefer the simplest idea that remains legible at card size.
4. Select one metaphor. Avoid repeating the main object used by another recent cover.
5. Use the built-in image-generation tool with `assets/style-reference.png` as a style reference.
6. Generate one 16:9 image at a time. Do not place the guide title or category inside the artwork; the website supplies those labels.
7. Inspect the output. Reject malformed hands, accidental words, logos, copied compositions, muddy silhouettes, and concepts that need explanation.
8. Preserve the generator's original outside the production path when useful. Export the website asset as `public/images/guides/<slug>.webp`, 16:9, no more than 1280px wide and no more than 200 KB. Start with WebP quality 76 and reduce only as needed after visual inspection.
9. Confirm the cover remains clear at desktop hero and 320px card sizes, then update the guide record's `cover` path and run the site build plus `node --test tests/guide-output-contract.test.mjs`.

## Prompt construction

Include:

- `ORIGINAL 16:9 editorial guide-cover illustration for Shift & Lead`
- the selected metaphor described as physical objects and actions
- antique engraved and etched rendering
- dense black cross-hatching and halftone texture
- a flat saturated background
- premium magazine art direction
- clear silhouette and negative space
- the relevant palette from the art-direction reference

Always exclude words, labels, letters, logos, copied compositions, glossy 3D rendering, photorealistic people, generic robots, floating dashboards, brains, and circuitry clichés.

## Quality bar

The cover must:

- communicate one idea in under two seconds
- remain clear at roughly 320 pixels wide
- feel related to the style reference without copying it
- use a single dominant metaphor rather than a scene full of explanations
- look deliberately commissioned for Shift & Lead
- remain 16:9 after export, use WebP, and stay within the 1280px / 200 KB production limits

If the first output misses the metaphor or contains generation defects, revise the prompt and regenerate. Do not accept it merely because it is attractive.
