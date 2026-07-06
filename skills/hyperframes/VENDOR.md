# Vendored: HyperFrames agent skills

- Source: `heygen-com/hyperframes` (open source, HeyGen), installed 2026-07-06
  via `npx skills add heygen-com/hyperframes --all`.
- This folder holds the router (`SKILL.md` here) plus 20 domain/workflow
  skills as subfolders. Read the router first; it picks the workflow.
- Stripped to keep the repo lean: two demo videos under
  `hyperframes-animation/examples/assets/` (36 MB, cosmetic only).
- Reviewed on install: external hosts referenced are CDNs, framework docs,
  HeyGen, and ElevenLabs (TTS). No credential handling inside skill files;
  API keys stay in Doppler/n8n per `security.md`.
- To update: rerun the install command in a scratch folder and re-copy,
  then re-strip the demo videos and rerun the host review.

## House rules on top of the vendor docs

These skills obey the Constitution and this repo's charter:

1. Output is DRAFT material for the vault/queue. Queue, never publish.
2. Brand tokens come from `queen-brain/brand.md` (electric #2C4BE0 on
   white), voice laws apply to every on-screen word: no em-dashes.
3. TTS voiceover: default faceless voice is Alice (British, confident);
   her real cloned voice is founder-only and never lives in git.
4. `talking-head-recut` + `embedded-captions` are the standard finishing
   pass for every HeyGen/Higgsfield render before it enters the queue.
