# CONTEXT — ai-insider-brief

Per-build glossary. Cold session entry: read this first. Lazy update during real work.

## Purpose
Dark intelligence dashboard. Scrapes AI/business sources every 12 hours via cron, runs Ollama summarisation locally, surfaces top items via Kit capture. Public-facing dashboard at index.html.

## Architecture
| Component | File | Purpose |
|-----------|------|---------|
| **Frontend** | `index.html` + `app.js` + `styles.css` / `styles-light.css` | Dashboard UI, dark theme default |
| **Pipeline** | `pipeline/` | Source fetch → Ollama summarise → JSON output |
| **Sources** | `sources.json` | Curated source list (RSS/URL list) |
| **Prompts** | `prompts.mjs` | Ollama prompt templates per content type |
| **Data** | `data/` | Generated briefs (JSON output of pipeline) |
| **OG Image** | `og-image.png` | Social card |

## Deployment
- Lives on VPS `root@187.77.153.212`
- 12h cron drives pipeline runs
- Public URL serves dashboard

## Key Decisions
- **Ollama local LLM** for summarisation (free, no token spend)
- **Kit (formerly ConvertKit) capture** wired to dashboard for opt-ins
- **Dark theme primary** (intelligence/insider aesthetic)

## Data Flow
```
sources.json → pipeline (fetch RSS/URLs) → Ollama (summarise via prompts.mjs) → data/*.json → index.html (renders)
```

## Hard Rules
- No banned phrases in summaries (Ollama prompt enforces voice rules)
- No fabricated stats — must trace to source
- Dashboard is IFP-facing (top of funnel) — accessible language, not ICP-only

## When to update this file
Add a glossary entry when a new source type, prompt template, or pipeline stage enters.
