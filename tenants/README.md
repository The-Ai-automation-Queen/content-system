# Tenants — multi-brand mode

This Business OS was first built for Fatiha Chikh (the AI Automation Queen).
The 8-step architecture is generic — same machines, different brand brain —
so we can run it for **clients** by copying a tenant folder and filling in
their files. Same code, different "second brain".

## How it works

- Fatiha's brand lives at the **repo root** (positioning/, inspiration-library/,
  content-vault.md, research-notes.md, inventory.md, …). She is the default
  tenant; nothing changes for her.
- Every additional brand is a folder under `tenants/<slug>/` containing the
  same six brain files, plus a `tenant.json` with their connections (Blotato
  workspace id, HeyGen API key reference, GHL or ManyChat workspace,
  lead-magnets registry, etc.).
- Skills accept an optional `--tenant <slug>` argument. When passed, they read
  the brain from `tenants/<slug>/` instead of the root. Reports go to
  `tenants/<slug>/reports/`.
- The dashboard has a tenant switcher (top-right). Reading the URL
  `/?tenant=acme` swaps the active brain.

## Onboard a new client — quick reference

Full step-by-step (with the actual discovery-call questions) lives in
`docs/CLIENT-ONBOARDING-PLAYBOOK.md`. Short version:

1. **Discovery call first.** Never scaffold from a blank guess — get their
   positioning, audience, voice, and offers straight from them.
2. **Copy the template:** `cp -r tenants/_template tenants/<client-slug>` — this
   now produces a fully working scaffold, not just a to-do list.
3. **Fill the brain.** `positioning/SKILL.md`, `inventory.md`, `lead-magnets.csv`
   — straight from the discovery call, never invented.
4. **Seed the personal brain.** Run `brain-manager seed --tenant <slug>` right
   after discovery, while the answers are fresh.
5. **Build their voice file.** Drop 10–15 real samples of their own writing
   into `tenants/<slug>/voice-corpus/`, then `voice-file compile --tenant <slug>`
   and `voice-file validate --tenant <slug>`.
6. **Set their connections.** Edit `tenant.json` with their Blotato workspace
   id, HeyGen avatar/voice ids, GHL or ManyChat workspace, etc. Env-var names
   only — never paste keys. AI-twin/avatar video is a separate, not-yet
   tenant-scoped system — see the playbook §5 before offering it.
7. **Test one piece end-to-end.** Run `content-engine --tenant <slug>` →
   `visual-engine --tenant <slug>` → `distribution --tenant <slug>`. The first
   pass surfaces any missing connection.
8. **Schedule their loop.** Add their `/loop` entry to `.claude/settings.json`
   (or run from their own scheduled session).
9. **Go-live handoff.** Confirm they know: drafts land daily, they review and
   mark `READY TO POST`, and publishing itself is a manual release from
   Blotato — the machine never posts without a human click.

## Security notes

- API keys NEVER live in `tenant.json` — only references like
  `"heygen_api_key_env": "HEYGEN_API_KEY_ACME"`. The values live in the
  environment.
- A bug in tenant routing should fail closed (i.e. if the tenant slug is wrong,
  the skill refuses to run rather than defaulting to Fatiha's brain).
- Reports / leads are per-tenant; never mix.

## What does NOT carry across tenants

- The brand brain (positioning, voice, pillars) — by design, each tenant owns
  their own.
- The lead-magnets registry — keywords are tenant-scoped.
- The vault, research notes, and personal brain — tenant-scoped.
- The voice corpus and compiled voice file — each client's own real writing,
  never mixed with another client's or with Fatiha's.
- The performance log and its Lessons — one client's winning/losing patterns
  are not evidence for another client's audience.
- The connected accounts (Blotato, HeyGen, GHL/ManyChat workspaces, etc.) —
  tenant-scoped.
- **The AI twin/avatar** — not tenant-scoped at all yet (separate repo, single
  global asset folder). Treat as single-client-only until that's fixed.

## What IS shared

- The **skills** (the engine) — including `copy-craft`'s platform mechanics,
  which are brand-agnostic (though each tenant's own `performance-log.md`
  Lessons still outrank it for that specific audience).
- The **inspiration-library** (the format/hook playbook) — it's brand-agnostic
  reference.
- The **dashboard code** (one UI serves all tenants).
- The 8-step architecture and Romain's 5 machines.

This is the "plug-and-play for clients" path. The OS is the product; each
tenant is a different deployment of the same OS.
