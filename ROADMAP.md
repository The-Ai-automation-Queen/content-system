# Build Log & Roadmap (Step 5)

> The video's Step 5 is *incremental build*: ship one working piece at a time
> instead of attempting the whole system at once. This file is the build log
> (what exists) plus the backlog (what is next) plus the maintenance cadence
> (Step 7), so the system can grow without losing the thread.

---

## Build log

### 2026-06-22 — Business OS foundation laid (8-step framework)
Implemented the architecture and the core automation layer:
- `CLAUDE.md` — operating manual mapping all 8 steps (Architecture, Step 2)
- `inventory.md` — asset map (Step 0)
- `security.md` — secrets/data/brand guardrails (Step 4)
- `skills/content-engine/` — research → in-voice drafts → vault (the core new
  automation; Step 3 + 8)
- `skills/weekly-ops/` — orchestrator for the maintenance loop (Step 7 + 8)
- `skills/research-digest/`, `skills/competitor-watch/`, `skills/vault-audit/` —
  formalized the recurring report generators as version-controlled skills (Step 3)

### Pre-existing (before this build)
- Second brain: `content-vault.md` (19 entries), `research-notes.md` (17 entries)
- Brand brain: `positioning/`, `inspiration-library/` (+ `creators.csv`)
- Report history in `reports/` back to April 2026
- `sync-to-github.bat` (Windows sync)

---

## Maintenance cadence (Step 7)

Run the loop on a fixed rhythm so the system stays alive. Targets:

| Job | Skill | Suggested cadence |
|---|---|---|
| Research sweep | `research-digest` | Weekly |
| Competitor / creator scan | `competitor-watch` | Weekly |
| Pipeline health check | `vault-audit` | Weekly |
| Draft generation | `content-engine` | Weekly (after the three above) |
| Full loop | `weekly-ops` | Weekly (runs all four) |

**Publishing cadence target** (to confirm with the operator): short-form video
blasted across Instagram, TikTok, LinkedIn, and YouTube Shorts — publish
everywhere, watch where engagement lands, double down there. Volume scales with
automation; until then, fewer/stronger pieces. The engine should keep enough
`READY TO POST` inventory to sustain the chosen cadence.

To automate the rhythm, run the harness `/loop` skill on `weekly-ops`, or trigger
`weekly-ops` manually each week.

---

## Backlog (next increments, roughly prioritized)

1. **Close the posting gap.** The standing vault audit shows 15 `READY TO POST`
   pieces and 0 `POSTED`. The highest-leverage next step is publishing the
   backlog and recording `POSTED` + date in the vault — not generating more
   drafts. The engine should respect this and avoid over-producing.
2. **Cross-platform sync.** `sync-to-github.bat` is Windows-only and one-way
   (local → GitHub, local wins). Add a pull step / shell equivalent so changes
   made by remote/web agents flow back before the next local sync overwrites them.
3. **POSTED tracking + metrics.** Add post date and a light performance note
   (reposts/shares as the real metric, per `inspiration-library` Pattern 15) so
   `vault-audit` can report on what actually worked.
4. **Wire in MCP tools, read-only first** (per `security.md` §5): Notion as
   external calendar/brain, Tavily/Apify for richer research, Canva/Gamma for
   carousels, Blotato for scheduling. Each is an increment, not a big bang.
5. **Named frameworks as content assets** (Pattern 12) — capture the operator's
   repeatable client methodologies as named, citeable assets the engine reuses.
