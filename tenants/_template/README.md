# Tenant Template

`cp -r tenants/_template tenants/<client-slug>` produces a **working** starting
tenant — every file below already exists as a clean, empty scaffold matching
the root's structure. Nothing needs to be created from scratch; only filled in.

See `docs/CLIENT-ONBOARDING-PLAYBOOK.md` for the full step-by-step (discovery
call → scaffold → brain → voice → connections → test → go-live), and
`../README.md` for the quick-reference checklist.

## Files to fill in (from the discovery call — never invent)

- `tenant.json` — connections + schedule (use env-var names for keys, never paste)
- `positioning/SKILL.md` — the identity layer (already has section headers, fill the content)
- `inventory.md` — channels, offers, tools (already has table structure, fill the rows)
- `lead-magnets.csv` — comment-keyword CTAs + resource URLs (header row only, add rows)

## Files that stay empty until the machine populates them

- `content-vault.md`, `research-notes.md`, `performance-log.md` — write themselves
  as `content-engine`, `signal-harvester`/`research-digest`, and `performance-tracker`
  run for this tenant.
- `personal-brain.md` — populated by `brain-manager seed --tenant <slug>` (ideally
  run right after the discovery call, using the same answers).
- `voice-corpus/` + `voice-file.md` — populated by dropping the client's real
  writing samples in, then `voice-file compile --tenant <slug>`.

## Files inherited from root (no copy needed)

- The skills (`skills/`) — including `copy-craft`, which is brand-agnostic and
  shared across all tenants
- The dashboard code (`dashboard/`)
- The inspiration library (`inspiration-library/`)
- Build-log + roadmap discipline (`ROADMAP.md`)
- Security policy (`security.md`)

## Not yet supported for multi-client use

- **AI twin/avatar video** (Higgsfield Soul ID + Seedance, or HeyGen) — the
  `twin-factory` plugin lives in the sibling `AI-Creator-OS` repo and, as of
  2026-07, uses a single global `assets/twin/` folder, not tenant-scoped. Do
  not run two clients' twins through it concurrently without tenant-scoping
  that repo first — see `docs/CLIENT-ONBOARDING-PLAYBOOK.md` §5.
