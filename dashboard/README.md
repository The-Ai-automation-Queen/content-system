# Mission Control — dashboard

A local cockpit for the AI Automation Queen content Business OS. It reads the
markdown second-brain in the repo root (`content-vault.md`, `reports/`,
`research-notes.md`) and renders pipeline status, the content board, what needs
your input, pillar coverage, and the run/audit log.

There is **no database and no backend writes** — the markdown files are the
source of truth (see `../CLAUDE.md`, Step 6). This is a read-only window onto
them. The agent loop (`skills/weekly-ops`) updates the files; you refresh the
page to see the new state.

## Run it

```bash
cd dashboard
npm install        # first time only
npm run dev        # serves http://localhost:4321
```

Then open **http://localhost:4321**. Edit a vault entry or run an agent skill,
refresh the page, and the cockpit reflects it.

## What it shows

- **KPIs** — total pieces, ready / scheduled / posted / drafts, how many need
  your input, how many have a visual asset.
- **Pipeline** — a board by status (Draft → Ready to Post → Scheduled → Posted),
  each card with platform, pillar, critic score, visual link, and flags.
- **Needs your input** — every entry still flagged `PERSONALIZE` / `VERIFY` /
  `PREP` / `NEEDS HER FACE` / `NEEDS VISUAL`.
- **Content pillars** — coverage across the six pillars.
- **Recent runs** — the dated reports in `reports/` (the audit trail).
- **Control room** — quick links to the Blotato queue and the GitHub repo.

## Notes

- Built with Astro (port 4321, `host: true` so the remote/web harness can
  preview the port).
- Parsing lives in `src/lib/data.js` — pure Node, no parsing deps. If the vault
  format changes, adjust the regexes there.
