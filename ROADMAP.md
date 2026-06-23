# Build Log & Roadmap (Step 5)

> The video's Step 5 is *incremental build*: ship one working piece at a time
> instead of attempting the whole system at once. This file is the build log
> (what exists) plus the backlog (what is next) plus the maintenance cadence
> (Step 7), so the system can grow without losing the thread.

---

## Build log

### 2026-06-23 (latest) — M06 performance tracker + dashboard intelligence
Added the feedback loop so the system measures what it ships:
- **`performance-tracker`** (M06) — scrapes all connected platforms (Meta Graph
  API for IG/FB when tokens set, Apify fallback for everything) for follower
  counts + post-level engagement. Writes `performance-log.md`, annotates POSTED
  vault entries. Supports `competitors` mode and `linkedin-update` manual paste.
- **Dashboard intelligence panels** — Performance (follower KPIs + top-5 posts),
  Competitor Intel (creators + hooks + gaps from latest scan), Hook Scorecard
  (pattern usage bar chart). All wired into Mission Control (`dashboard/`).
- IG handle consolidated to `@thefatihachikh` across all files.
- Scheduler updated: performance-tracker runs daily at 03:00 GST (1h after
  signal-harvester). Architecture docs (CLAUDE.md, inventory.md) updated for M06.

### 2026-06-23 — Full engine: all 5 machines + HeyGen + multi-brand
Built the missing machines from the Romain architecture teardown
(`reports/architecture-analysis-2026-06-23.md`) so the OS runs end-to-end:
- **`heygen`** — talking-head of HER real cloned avatar + voice (HeyGen v2 API).
  The on-brand alternative to Blotato's generic avatars; pairs with Blotato
  `ai-avatar-broll` (HeyGen speaks → Blotato adds B-roll).
- **`signal-harvester`** (M01 data) — multi-source daily harvest (Apify IG/X,
  YouTube virality, RSS, Tavily) with source-mix + ≥2-lead-magnet rules.
- **`reels-factory`** (M03) — long video → many shorts (Opus Clip API; Blotato
  `combine-clips` fallback), landed as critic-scored vault drafts.
- **`dm-responder`** (M05, the money engine) — comment-keyword → DM resource →
  lead capture (ManyChat for IG; Blotato/native APIs for FB+YT), backed by the
  new `lead-magnets.csv` registry.
- **`weekly-ops`** extended to chain all machines (signal → … → distribution → DM).
- **Multi-brand:** `tenants/` with a `_template` (tenant.json + brain files) so
  the OS can run for clients — same engine, different brain (`tenants/README.md`).
- `inventory.md` now has a live-wiring checklist (the env keys/allowlists each
  machine needs). Skills exist; ⚙️ ones await operator keys to run live.

### 2026-06-23 (later) — Film-free video + AI imagery wired into visual-engine
The avatar/voice/image layers were already available **inside Blotato's visual
engine** — wired them in (`visual-engine` v1.1.0):
- `blotato_create_visual` now drives **film-free video** (narrated AI-voice with
  ElevenLabs voices + AI images via Flux/Imagen/Seedream) and **AI
  images/infographics** — no separate HeyGen/Midjourney/ElevenLabs hookup needed.
- Real template IDs baked into `visual-engine` (ai-story-video, ai-selfie-video,
  ai-avatar-broll, infographics, carousels) + a brand-safety guardrail: a generic
  AI avatar is never presented as her face (`NEEDS HER FACE`).
- Default brand voice set to `Alice (British, confident)`; one voice across all
  video for audio consistency.
- `inventory.md` MISSING list narrowed to: a real avatar of *her* + TikTok.

### 2026-06-23 — Closed the loop: visuals + queued publishing wired in
Wired the back-half of the Romain-shape stack so content no longer dead-ends at
`READY TO POST`:
- `skills/visual-engine/` — Canva (carousels/infographics) + Gamma (decks/cards)
  generate on-brand assets from a draft (Step 3/5 — visuals).
- `skills/distribution/` — schedules unflagged ready entries into the **Blotato
  queue** across 6 connected platforms (LinkedIn, Instagram, Facebook, YouTube,
  Threads, Twitter/X), writes `SCHEDULED`/`POSTED` + Blotato IDs back to the vault,
  logs a `reports/distribution-*.md` audit trail (Step 8 — distribution).
- `weekly-ops` extended to the full six-step loop (… → visual-engine → distribution).
- Policy change in `security.md` §3.1 / §5: from "never publish" to **queue-only**
  (Blotato schedules; the operator releases). Flagged entries are never queued.
- `inventory.md` updated: Blotato/Canva/Gamma marked WIRED; flagged the **no-TikTok**
  connection; documented the still-**missing** image-gen + AI-video/voice layers.
- Inspiration library re-anchored to the new lane (v1.3.0).

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
| Performance scrape | `performance-tracker` | Daily (03:00 GST, after signal-harvester) |
| Full loop | `weekly-ops` | Weekly (runs all five) |

**Publishing cadence target** (to confirm with the operator): short-form video
blasted across Instagram, TikTok, LinkedIn, and YouTube Shorts — publish
everywhere, watch where engagement lands, double down there. Volume scales with
automation; until then, fewer/stronger pieces. The engine should keep enough
`READY TO POST` inventory to sustain the chosen cadence.

To automate the rhythm, run the harness `/loop` skill on `weekly-ops`, or trigger
`weekly-ops` manually each week.

---

## Backlog (next increments, roughly prioritized)

1. **Run the closed loop on the backlog.** The wiring exists (`visual-engine` +
   `distribution`); the next action is to build visuals for the ready carousel/video
   entries and queue the 3 unflagged ready posts into Blotato. Resolve the
   `PERSONALIZE`/`VERIFY`/`PREP` flags on the rest so they become queueable.
2. **The last stack gaps** (operator action). _AI image-gen, infographics, and
   narrated AI-voice video are now wired via Blotato's visual engine — done. The
   operator now also has a HeyGen/ElevenLabs talking avatar of herself — done._
   What's left:
   - **Allowlist `blotato.io` egress.** This environment's network policy blocks
     `database.blotato.io`, so the agent can't upload local media (e.g. the avatar
     MP4) or fetch render files. Add `database.blotato.io` (and `*.blotato.io`) to
     the environment's network access settings. Once done, `visual-engine` can
     upload the avatar → run `ai-avatar-broll` → queue, fully autonomously.
   - **Connect a TikTok account to Blotato** — the plan wants it; it's not wired.
3. ~~Reconcile the Instagram identity~~ — resolved: `@thefatihachikh` everywhere.
4. ~~**POSTED tracking + metrics.**~~ — _mostly resolved:_ `performance-tracker`
   (M06) scrapes all platforms for post-level engagement, writes
   `performance-log.md`, and annotates POSTED vault entries. Remaining: set
   `META_ACCESS_TOKEN` + `IG_BUSINESS_ID` + `FB_PAGE_ID` for richer IG/FB data.
5. **Notion content calendar** — mirror the vault pipeline (Backlog → Ready →
   Scheduled → Posted) into a Notion board for a phone-friendly calendar view.
6. **Research upgrade** — wire Tavily (deep research) + Apify (trend scraping) into
   `research-digest` for sharper front-of-loop signals.
7. **Cross-platform sync.** `sync-to-github.bat` is Windows-only and one-way
   (local → GitHub, local wins). Add a pull step so remote/web-agent changes flow
   back before the next local sync overwrites them.
8. **Named frameworks as content assets** (Pattern 12) — capture the operator's
   repeatable methodologies as named, citeable assets the engine reuses.
