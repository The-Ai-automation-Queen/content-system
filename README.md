# Content System

A **Content OS** for Fatiha Chikh's content operation — a Codex-run engine
inspired by an 8-step agentic content framework and rebuilt around Notion as the
business brain, Codex as the operator, reusable skills, explicit approval gates,
and provider integrations that must be verified before use.

> **Agents start here:** read [`AGENTS.md`](AGENTS.md). `CLAUDE.md` remains only
> as a compatibility entry point for older automation.

## Website (September 2026 migration branch)

The intended web application is **`next-app/`**, not the retired `site/` guide tree.
Its public routes are the personally branded homepage, the guide library, and the
**35 owner-approved guides** in `data/guide-publication.json`. A small, generated
`next-app/public/` bridge preserves still-active HTML offer pages until their
Next.js equivalents are ready. Do not put unpublished guides or private product
source pages in public assets.

- Local: `cd next-app && npm ci && npm run dev` (the predev step syncs approved static offers).
- Verify: `node tools/audit-approved-guides.mjs && npm run validate:guides && cd next-app && npm run build`.
- Lumail: `LUMAIL_API_TOKEN` stays server-side; guide email delivery and **optional**
  marketing subscription are separate. The guide pass is local to the current device,
  **not a member account**.
- Deploy: see [`docs/NEXT-VERCEL-MIGRATION.md`](docs/NEXT-VERCEL-MIGRATION.md).
  Repository configuration is ready, but Vercel's live project Root Directory must
  be reviewed and updated on a tested preview before a production cutover.

The older hosting-topology note below is historical. On 26 September 2026,
`www.shiftandlead.com` responded from Vercel and `guides.shiftandlead.com`
redirected to `www`; confirm the assigned Vercel project in the dashboard.

## Structure

| File / folder | Step | Purpose |
|---|---|---|
| `CLAUDE.md` | 2 | Operating manual / architecture — **read first** |
| `inventory.md` | 0 | Asset map: brand, audience, channels, tools |
| `content-vault.md` | 1 | All content entries (draft → ready → posted) |
| `research-notes.md` | 1 | Research findings from last-30-days sweeps |
| `positioning/` | 3 | Brand positioning and voice (the brand brain) |
| `inspiration-library/` | 3 | Creator patterns, hooks, script rules |
| `skills/` | 3,7,8 | Action skills — see below |
| `security.md` | 4 | Secrets, data, and brand guardrails |
| `ROADMAP.md` | 5 | Build log, maintenance cadence, backlog |
| `reports/` | 8 | Dated outputs of the agentic loop |

## Skills (`skills/`)

- **`content-engine`** — research/signals → in-voice drafts in the vault (core automation)
- **`weekly-ops`** — orchestrates the full maintenance loop
- **`research-digest`** — last-30-days research sweep → report + research note
- **`competitor-watch`** — creator/competitor movement scan → report
- **`vault-audit`** — pipeline health check → report

## The agentic loop (Steps 7–8)

```
research-digest → competitor-watch → vault-audit → content-engine
```

Run `weekly-ops` to execute it end to end (schedule it with the `/loop` skill).

## Sync

**Notion is the business source of truth. GitHub `main` is the execution source.**
The VPS pulls executable skills and code from `main`; agents read approved brand,
product-readiness, and production state from Notion before taking campaign action.

**Hosting topology (verified 15/07/2026):** one server. `srv1485425`
(Hostinger) and `187.77.153.212` are the same machine: hostname and IPv4 of
the estate VPS. It serves www.shiftandlead.com, the apex, and
brief.shiftandlead.com. Newsletter changes merged into `main` deploy through
`.github/workflows/deploy-newsletter.yml` into versioned VPS releases with an
automatic health check and rollback. The generated `briefs.json` remains
persistent runtime state and is not overwritten by code deploys. A separate
hourly workflow validates that live JSON and mirrors changes back to `main`,
providing Git history without storing a repository write credential on the VPS.
The crawler and Telegram approval agent run from the reviewed pipeline code in
this repository; deployments preserve their private secrets, pending queue,
source state, and generated data while systemd keeps the approval agent alive.
guides.shiftandlead.com is served by Vercel (project `content-system`), which
auto-deploys on every merge to `main`. SSH port 22 is key-only, rate-limited,
and protected by fail2ban; password login is disabled.

`sync-to-github.bat` (the old "local wins" one-way sync) was retired and
deleted from the repo on 14/07/2026. If a copy still exists on the operator's
Windows machine, do not run it; it would overwrite the machine's autonomous
commits. Delete any local copy too.
