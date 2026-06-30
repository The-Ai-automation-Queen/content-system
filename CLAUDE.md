# Content System — Operating Manual

This repository is a **Business OS**: a content engine for Fatiha Chikh ("the AI
Automation Queen") that any Claude agent can pick up and run. It is structured
on the 8-step framework from Romain Brunel's *"I Automated My Entire Business
with Claude Code"* ([video](https://youtu.be/RCzvjTgH-Nw)), adapted to a
personal-brand content operation.

**What the brand does (as of 30/06/2026):** AI marketing strategy enhanced with
AI agents + twin avatar creation for busy professionals who want to reinforce
their online presence without burning out. She also serves as fractional AI CMO
for companies wanting AI in their marketing. The content, the engine, and the
systems she uses daily ARE the proof of concept — she runs her entire business
this way.

If you are an agent working in this repo, **read this file first.** It tells you
what exists, where it lives, and which skill to run for which job.

---

## The 8-step model, mapped to this repo

| # | Step (video) | What it means here | Where it lives |
|---|---|---|---|
| 0 | **Inventory** | What assets, channels, audiences, and tools exist | `inventory.md` |
| 1 | **Second Brain** | The single source of truth for content + research | `content-vault.md`, `research-notes.md` |
| 2 | **Architecture** | How the pieces fit and how an agent navigates them | this file (`CLAUDE.md`) |
| 3 | **AI Engine** | The reusable skills that do the work | `skills/`, `positioning/`, `inspiration-library/` |
| 4 | **API & Security** | Guardrails: secrets, data handling, brand/voice safety | `security.md` |
| 5 | **Incremental Build** | Build log + what to add next, one piece at a time | `ROADMAP.md` |
| 6 | **Hosting** | Where it runs and how it syncs | this file → *Hosting* below |
| 7 | **Deployment & Maintenance** | The recurring cadence that keeps it alive | `skills/weekly-ops/`, `reports/` |
| 8 | **Agentics** | The autonomous loop: research → draft → audit | `skills/weekly-ops/` orchestrates it |

---

## Second Brain (Step 1) — the source of truth

Everything the engine produces or reasons over lives in three files. Treat these
as the database. Never invent content that contradicts them.

- **`content-vault.md`** — every content entry. Newest entries are numbered
  `## ENTRY NNN` at the top, with a quick-reference list of the most recent
  pieces above the first entry. Each entry carries: date, platform, format,
  topic, **Status** (`DRAFT` → `READY TO POST` → `POSTED`), and a **Critic
  score**. The vault was reset for the brand rebuild (22/06/2026); the current
  highest entry is **ENTRY 010** and new drafts continue the sequence. The old
  ENTRY 001–019 live in `content-vault-archive.md` (obsolete).
- **`research-notes.md`** — dated research findings (`## RESEARCH NNN`), each with
  topics searched, key findings, signals, ready-to-use content angles, and one
  logged contrarian take. Current highest is **RESEARCH 020**.
- **`personal-brain.md`** — the operator's living memory (the "Cerveau"). Updated
  daily by `brain-manager` with real anecdotes, opinions, projects, numbers, life
  events, and current focus. This is what makes content personal — not generic AI
  output. `content-engine` loads it before every writing pass.

---

## AI Engine (Step 3) — the skills

Skills are reusable, version-controlled instructions. Two kinds live here:

**Context skills** (loaded *before* writing, never run standalone):
- **`positioning/SKILL.md`** — brand positioning, voice, audience, the
  win-back-your-time promise, and the six content pillars. The non-negotiable
  identity layer.
- **`inspiration-library/SKILL.md`** + `creators.csv` — 21 studied creators,
  15 named hook/format patterns, and the script application rules. Load this
  before writing any script, hook, or outline.

**Action skills** (in `skills/`, each a folder with a `SKILL.md`). Mapped to
Romain's machines:
- **`brain-manager`** — *M00, the Cerveau Manager.* Daily brain update loop: asks
  the operator 5–7 contextual questions about their real life, projects, opinions,
  and current events, then writes answers into `personal-brain.md`. This is what
  makes content feel personal — the AI knows her anecdotes, her opinions, her
  numbers. Modeled on Romain Brunel's Telegram-based Cerveau Manager.
- **`signal-harvester`** — *M01 data layer.* Multi-source daily signal harvest
  (Apify IG/X scrapes, YouTube virality, RSS blogs, Tavily) with a source-mix +
  ≥2-lead-magnet rule → a `research-notes.md` entry. The richer alternative to
  `research-digest`.
- **`content-engine`** — *M01 scripts.* Turns signals into ready-to-review drafts
  in the vault, in voice, scored by an internal critic. *The core automation.*
- **`visual-engine`** — *M02 visuals.* Carousels/infographics via Canva, decks via
  Gamma, and **film-free video + AI imagery** via Blotato (narrated AI-voice,
  AI images). On brand, post-ready. (Step 3/5.)
- **`heygen`** (talking-head) — *M02 talking-head.* Renders a video of HER real
  cloned avatar + voice from a script. Primary engine: **Higgsfield** (paid, MCP).
  Fallback: HeyGen (API). Pairs with Blotato `ai-avatar-broll` (talking-head
  speaks → Blotato adds B-roll). Generic AI avatars are never presented as her.
- **`reels-factory`** — *M03.* Long-video → many shorts (Opus Clip API, or Blotato
  fallback) with hooks + comment CTAs, landed as vault drafts.
- **`distribution`** — *M04.* Pushes `READY TO POST` entries into the **Blotato
  queue** across the connected platforms, writes status back. **Queue-only.**
- **`dm-responder`** — *M05, the money engine.* Auto-replies to comment-keyword
  CTAs with the lead-magnet link and captures the lead (GoHighLevel for IG;
  Unipile for LinkedIn; Blotato/native APIs for FB+YT). Backed by
  `lead-magnets.csv`.
- **`performance-tracker`** — *M06, the feedback loop.* Scrapes all connected
  platforms (Meta Graph API for IG/FB when tokens set, Apify fallback for all)
  for follower counts + post-level engagement, writes `performance-log.md`,
  annotates POSTED vault entries, and feeds the dashboard intelligence panels.
  Supports `competitors` mode (scrapes creators.csv handles) and `linkedin-update`
  mode (manual paste for LinkedIn post analytics).
- **`weekly-ops`** — the orchestrator. Runs the full machine loop (Step 7/8).
- **`research-digest`** — last-30-days research sweep → `reports/` + a
  `research-notes.md` entry. (Lighter fallback for `signal-harvester`.)
- **`competitor-watch`** — creator/competitor movement scan → `reports/`.
- **`vault-audit`** — pipeline health check → `reports/`.
- **`video-transcription`** — YouTube (or other) video → full transcript saved
  to `transcripts/` + a summarized RESEARCH entry in `research-notes.md` with
  key takeaways, stack mentions, and gap analysis vs. our system. Dual-path:
  `yt-dlp` (fast, local) with web-extraction fallback (cloud).
- **`monetisation`** — *The revenue layer.* Defines the offer ladder across two
  tracks: Individual (lead magnets → digital products → AI Twin mini-course →
  Presence Engine Starter Kit $997 → ongoing $2,500-5,000/mo → community) and
  Company (fractional AI CMO $3-8k/mo → agency white-label → certification).
  Also defines ACP funnel tagging rules, CTA map by content pillar, conversion
  flow, and monthly revenue tracker. Referenced by `content-engine` for ACP stage
  + CTA selection. Run with `activation-check` to audit revenue gaps,
  `revenue-audit` for the weekly report, or `launch-plan <offer>` to plan a
  product launch.
- **`business-os-kit`** — *Product packaging.* Packages this Business OS into
  three sellable products (Starter Kit $97, Community $197/month, Bootcamp $997)
  and produces the promotional launch content. Run with `build-starter-kit`,
  `launch-content <tier>`, or `sales-copy <tier>`.
- **`irl-events`** — *Dubai IRL community.* Plans and promotes "AI & Freedom
  Dinners" (10–15 people, monthly, intimate format in Dubai), manages invite
  sequences and post-event follow-up, and extracts 4 vault-ready content pieces
  per event. Run with `plan-event`, `invite-sequence`, or `post-event-content`.

> **Multi-brand:** the engine is brand-agnostic. Additional clients live under
> `tenants/<slug>/` with their own brain + connections; skills take `--tenant`.
> See `tenants/README.md`. (The "plug-and-play for clients" path.)

> The `positioning` and `inspiration-library` skills are the **brand brain**.
> Every word the engine produces must pass through them. If a draft drifts from
> the positioning, the draft is wrong — not the positioning.

---

## Agentics (Step 8) & Maintenance (Step 7) — the loop

The system stays alive through a recurring loop, not one-off prompts. As of
2026-06-26 the loop runs the **full Romain-shape across all 7 machines** —
brain → signal → script → visual → queue → DM/lead → measure:

```
brain-manager → signal-harvester → competitor-watch → vault-audit → content-engine → visual-engine(+heygen) → reels-factory → distribution → dm-responder → performance-tracker
  (M00 brain)     (M01 data)        (what others do)   (what's stale)  (M01 scripts)     (M02 visuals/face)      (M03 shorts)    (M04 → queue)   (M05 → leads)   (M06 → measure)
signal-harvester → competitor-watch → vault-audit → content-engine → visual-engine(+heygen) → reels-factory → distribution → dm-responder → performance-tracker → monetisation
   (M01 data)        (what others do)   (what's stale)  (M01 scripts)     (M02 visuals/face)      (M03 shorts)    (M04 → queue)   (M05 → leads)   (M06 → measure)    (revenue check)
```

**Daily crons** (VPS): brain-manager @ 20:00, signal-harvester @ 02:00,
content-engine daily @ 02:30 (5 scripts ready by morning), performance-tracker
@ 03:00. The brain-manager runs in the evening so the operator's answers feed
the next morning's scripts.

`skills/weekly-ops` runs this end to end and writes a dated set of reports to
`reports/`. **Publishing is queue-only:** `distribution` schedules unflagged ready
posts into Blotato; the operator reviews and releases them in the Blotato
dashboard (see `security.md` §3.1). To schedule the loop autonomously, use the
harness `/loop` skill (e.g. weekly), or run `weekly-ops` manually. See `ROADMAP.md`
for cadence targets.

---

## Hosting (Step 6)

- **Runtime:** Claude Code (CLI, desktop, or web). No server, no build step —
  the "app" is this repo plus the skills, executed by an agent.
- **Storage:** the markdown files *are* the database. Git is the version history.
- **Source of truth:** local machine. This GitHub repo is the synced mirror that
  remote agents (like web sessions) work against.
- **Sync:** `sync-to-github.bat` copies the canonical local files into the repo
  and pushes `main`. Local files win on conflict. When a remote agent changes
  files here, those changes must be pulled back into the local copy before the
  next local sync, or they will be overwritten. See `ROADMAP.md` for the
  cross-platform sync note.

---

## Conventions for agents

1. **Dates are `DD/MM/YYYY`** in the vault, `YYYY-MM-DD` in research notes and
   report filenames. Match the file you are writing into.
2. **Never skip the brand brain.** Load `positioning` and `inspiration-library`
   before producing any public-facing words.
3. **Append, do not rewrite.** New vault/research items get the next number and
   go at the top. Do not renumber or delete history.
4. **Reports are immutable records.** One dated file per run in `reports/`;
   never overwrite a past report.
5. **Drafts are drafts.** The engine produces `DRAFT` / `READY TO POST` items
   for human approval. It does not publish, and (for now) does not call external
   posting tools — see `security.md`.
6. **Voice:** casual and conversational (contractions welcome), warm with a
   provocative edge, specific, no corporate jargon, no engagement bait. The full
   voice spec lives in `positioning/SKILL.md`. (The old "non-contracted English"
   rule is retired.)
