# Visual stack upgrade — 2026-07-06

Operator request: fill the tooling gaps for best-in-class visuals
(carousels, motion video, talking heads) and build reusable skills.

## Added

1. **skills/hyperframes/** — vendored `heygen-com/hyperframes` (open
   source, HeyGen): router + 20 domain/workflow skills for HTML-to-MP4
   video (slideshow, faceless-explainer, embedded-captions,
   talking-head-recut, website-to-video, motion-graphics, media, CLI).
   Review done on install: referenced hosts are CDNs, framework docs,
   HeyGen, ElevenLabs; no credential handling in skill files. Two demo
   MP4s (36 MB) stripped. See `skills/hyperframes/VENDOR.md`.
2. **skills/remotion/** — vendored `remotion-dev/skills` (official):
   React-based programmatic video best practices. See its VENDOR.md.
3. **skills/carousel-factory/** — built in-house. Brand-locked HTML slide
   template (1080x1350, brand v2 tokens from queen-brain/brand.md, five
   slide archetypes) + Playwright renderer using the preinstalled
   Chromium. Verified: rendered a 6-slide STACK sample end to end and
   inspected the PNGs. Replaces Canva as the primary carousel path.
4. **skills/captions/** — built in-house. `gen-ass.mjs` converts whisper
   word timestamps to brand-styled karaoke ASS (white fill, electric
   #2C4BE0 pre-highlight, uppercase, lower third of 1080x1920); ffmpeg
   burns it in. Verified end to end on a generated test clip, frame
   inspected. Mandatory finishing pass for talking-head video.
5. **skills/ffmpeg-toolkit/** — built in-house. Verified recipes on
   ffmpeg 6.1.1: 9:16 reframe, thumbnails, ASS burn-in, concat, music
   bed mixing, test asset generation.

## Wired

- `docs/machines/m02-visuals.md`: carousel-factory primary for carousels,
  hyperframes/remotion as the motion layer, captions as the mandatory
  talking-head finishing pass.
- `docs/machines/m03-reels.md`: ffmpeg-toolkit + captions added to tools.
- `skills/visual-engine/SKILL.md`: routing table now sends carousels to
  carousel-factory first (Canva is fallback) and scratch-built video to
  hyperframes.
- `skills/heygen/SKILL.md`: renders must pass through captions before M04.

## Notes / operator items

- **Canva MCP is connected but not authorized** in cloud sessions;
  authorize it in claude.ai connector settings if Canva fallback is
  wanted there. Not blocking: carousel-factory needs no Canva.
- VPS needs `apt-get install -y ffmpeg` (after `apt-get update`) and
  optionally the Inter font for exact caption rendering.
- ffmpeg-static npm download is blocked in cloud sessions; package
  manager install is the supported path (documented in the skill).
- Interactive avatar on the site (HeyGen streaming embed) is a paid
  vendor commitment: founder decision, not wired.
- Constitution check: all five skills produce DRAFT assets only; queue,
  never publish. No new SKUs involved; this is machine tooling for M02/M03.
