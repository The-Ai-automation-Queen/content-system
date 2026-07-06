# Vendored: Remotion best practices skill

- Source: `remotion-dev/skills` (official, Remotion AG), installed 2026-07-06
  via `npx skills add remotion-dev/skills --all`.
- Use for React-based programmatic video when HyperFrames (plain HTML) is
  not enough: complex motion design, data-driven animations, UI mockup
  animations. For most reels/explainers, start with `skills/hyperframes/`.
- Requires a Node/Bun Remotion project (`bun create video`); renders
  locally or on the VPS. Rendering uses the session Chromium at
  `/opt/pw-browsers/chromium` (do not download a browser).
- House rules: output is DRAFT for the vault/queue (queue, never publish);
  brand tokens from `queen-brain/brand.md`; no em-dashes in on-screen copy.
- To update: rerun the install command in a scratch folder and re-copy.
