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

## Onboard a new client (10-minute checklist)

1. **Copy the template:** `cp -r tenants/_template tenants/<client-slug>`.
2. **Fill the brain.** In their folder, fill `positioning/SKILL.md` (who they
   serve, the promise, pillars, voice), `inventory.md` (channels, offers,
   connections), and a starter `content-vault.md`. Use the operator's profiling
   pass — never make this up.
3. **Set their connections.** Edit `tenant.json` with their Blotato workspace
   id, HeyGen avatar/voice ids (after a HeyGen clone session with them),
   GHL or ManyChat workspace, Opus Clip key, etc. Use env-var names; never paste keys.
4. **Wire their lead magnets.** Fill `lead-magnets.csv` with their active
   comment-keyword CTAs and resource URLs.
5. **Test one piece end-to-end.** Run `content-engine --tenant <slug>` →
   `visual-engine --tenant <slug>` → `distribution --tenant <slug>`. The first
   pass surfaces any missing connection.
6. **Schedule their loop.** Add their `/loop` entry to `.claude/settings.json`
   (or run from their own scheduled session).

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
- The vault and research notes — tenant-scoped.
- The connected accounts (Blotato, HeyGen, GHL/ManyChat workspaces, etc.) —
  tenant-scoped.

## What IS shared

- The **skills** (the engine).
- The **inspiration-library** (the format/hook playbook) — it's brand-agnostic
  reference.
- The **dashboard code** (one UI serves all tenants).
- The 8-step architecture and Romain's 5 machines.

This is the "plug-and-play for clients" path. The OS is the product; each
tenant is a different deployment of the same OS.
