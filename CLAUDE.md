# Content System — Operating Manual

This repository is a **Business OS**: a content engine for Fatiha Chikh ("the AI
Automation Queen") that any Claude agent can pick up and run. It is structured
on the 8-step framework from Romain Brunel's *"I Automated My Entire Business
with Claude Code"* ([video](https://youtu.be/RCzvjTgH-Nw)), adapted to a
personal-brand content operation.

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
- **`voice-file.md`** — the real, corpus-compiled texture layer. Maintained by
  `voice-file` from raw material dropped in `voice-corpus/` (old posts, emails,
  transcripts — anything she actually wrote/said, never AI output). Where the
  brain supplies *facts* and `positioning` supplies *rules*, this supplies real
  sentences to match — closes the gap between "sounds like the rules" and
  "sounds like her." `content-engine` loads it (when not LOW-CONFIDENCE) after
  `inspiration-library` and before the brain.

---

## AI Engine (Step 3) — the skills

Skills are reusable, version-controlled instructions. Two kinds live here:

**Context skills** (loaded *before* writing, never run standalone):
- **`positioning/SKILL.md`** — brand positioning, voice, audience, the
  win-back-your-time promise, and the six content pillars. The non-negotiable
  identity layer.
- **`inspiration-library/SKILL.md`** + `creators.csv` — 21 studied creators + 1
  tracked institutional publisher (23 rows), 15 named hook/format patterns,
  and the script application rules. Load this
  before writing any script, hook, or outline.
- **`copy-craft/SKILL.md`** — the structural/platform-mechanics layer: dwell-time
  and hook-window rules per platform, timeless direct-response checks, and the
  authority to defer to `performance-log.md`'s real logged evidence over
  general best practice whenever they conflict. Distinct from voice (tone),
  inspiration-library (which studied pattern), and monetisation (which CTA) —
  this is *why a piece would or wouldn't get read*.

**Action skills** (in `skills/`, each a folder with a `SKILL.md`). Mapped to
Romain's machines:
- **`brain-manager`** — *M00, the Cerveau Manager.* Daily brain update loop: asks
  the operator 5–7 contextual questions about their real life, projects, opinions,
  and current events, then writes answers into `personal-brain.md`. This is what
  makes content feel personal — the AI knows her anecdotes, her opinions, her
  numbers. Modeled on Romain Brunel's Telegram-based Cerveau Manager. v1.1
  adds the **Voice-Note Brain Feeder**: `listen` files voice notes/texts sent
  to the bot anytime into the brain; `prefill` mines her existing corpus into
  proposed entries she confirms instead of composes.
- **`review-cockpit`** — *The 5-minute morning ritual.* Sends the overnight
  drafts to Telegram at 07:30 as numbered cards (hook, pillar, platform,
  critic score) for one-tap ✅ approve / 🎙 edit-by-voice-note / ❌ kill.
  Twice-daily `process` sweeps apply replies to the vault (READY TO POST /
  KILLED), CTA-check approvals against live lead magnets, and log every
  decision to `review-cockpit/decisions-log.md` — the Taste Clone's future
  training data. Also the estate's single Telegram inbox router: unblocker
  replies → ledger, brain voice notes → `brain-manager listen`. Max 6 cards
  per digest; queue-only publishing stands.
- **`voice-file`** — the texture layer. Compiles `voice-corpus/` (her real,
  pre-AI writing/speech) into `voice-file.md`: verbatim opening/closing
  patterns, real recurring words, sentence rhythm, and confirmed-absent AI-isms.
  Run `interview` mode to elicit raw writing samples when the corpus is thin,
  `compile` to (re)build the voice file, `validate` to blind-test it against a
  real post, `status` for a health check. Without this, `content-engine` only
  has style *rules* (positioning) to work from — this gives it real *evidence*.
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
  Also extracts a **Lessons** subsection each run — a ranked, evidence-backed
  comparison of winning vs. losing patterns (pillar/format/hook mechanism) —
  that `copy-craft` and `content-engine` read before the next drafting pass.
  This is what actually closes the loop; scraped numbers alone don't change
  what gets written next. Supports `competitors` mode (scrapes creators.csv
  handles) and `linkedin-update` mode (manual paste for LinkedIn post analytics).
- **`weekly-ops`** — the orchestrator. Runs the full machine loop (Step 7/8).
- **`research-digest`** — last-30-days research sweep → `reports/` + a
  `research-notes.md` entry. (Lighter fallback for `signal-harvester`.)
- **`competitor-watch`** — creator/competitor movement scan → `reports/`.
- **`vault-audit`** — pipeline health check → `reports/`.
- **`video-transcription`** — YouTube (or other) video → full transcript saved
  to `transcripts/` + a summarized RESEARCH entry in `research-notes.md` with
  key takeaways, stack mentions, and gap analysis vs. our system. Dual-path:
  `yt-dlp` (fast, local) with web-extraction fallback (cloud).
- **`monetisation`** — *The revenue layer.* Defines the offer ladder (free lead
  magnets → $97 Starter Kit → $197/month Community → $997 Bootcamp → $5–15k
  Speaking), the ACP funnel tagging rules, the CTA map by content pillar, the
  conversion flow (content → email → community → product), and the monthly
  revenue tracker. Referenced by `content-engine` for ACP stage + CTA selection.
  Run with `activation-check` to audit revenue gaps, `revenue-audit` for the
  weekly report, or `launch-plan <offer>` to plan a product launch.
- **`business-os-kit`** — *Product packaging.* Packages this Business OS into
  three sellable products (Starter Kit $97, Community $197/month, Bootcamp $997)
  and produces the promotional launch content. Run with `build-starter-kit`,
  `launch-content <tier>`, or `sales-copy <tier>`.
- **`irl-events`** — *Dubai IRL community.* Plans and promotes "AI & Freedom
  Dinners" (10–15 people, monthly, intimate format in Dubai), manages invite
  sequences and post-event follow-up, and extracts 4 vault-ready content pieces
  per event. Run with `plan-event`, `invite-sequence`, or `post-event-content`.
- **`unblocker`** — *The AI Chief of Staff / ship engine.* Attacks the estate's
  documented failure mode: built-but-not-shipped. Daily at 08:00 GST it scans
  the full 8-repo estate for human-only blockers, maintains
  `unblocker/ledger.md`, picks exactly **one** task, preps ~90% of it into an
  execute-only pack (`unblocker/packs/`), delivers it via Telegram as a
  15-minute action (window 09:00–12:00), follows up with a gentle-butler
  escalation ladder, and writes verified completions back to ROADMAP /
  ACTION-PLAN / queen-brain STATUS + a line into `personal-brain.md`. Never
  serves a list. Modes: `daily`, `scan`, `status`, `done/kill/split <id>`, `swap`.
- **`prospecting`** — *Daily biz-dev intelligence.* Scans for Dubai events,
  LinkedIn engagement targets, podcast/collab opportunities, corporate training
  RFPs, and quick wins. Writes a dated briefing to `reports/` with actionable
  items the operator can execute in 15 minutes. Add to daily cron after
  performance-tracker.

- **`launch-conductor`** — *Portfolio #4.* One offer + one date in → the full
  campaign out as ONE reviewable arc (`launches/<slug>/PLAN.md`): posts, emails
  (via email-ops), DM keyword rows, countdown timing, all through existing
  machines with cockpit approval gates. `monitor` proposes (never posts)
  honest-urgency pieces mid-launch. One launch at a time. Modes: `plan`,
  `build`, `monitor`. First use: the founding community launch.
- **`speaking-pipeline`** — *Portfolio #5.* Extends prospecting into a real
  pipeline: scans Dubai/GCC corporate events + L&D contacts, drafts max 3
  personalized pitches per serving in her voice (she sends), tracks
  identified → pitched → replied → call → booked in `speaking-pipeline.md`.
  One booking = $5–15k. Modes: `scan`, `pitch`, `status`, `update`.
- **`email-ops`** — *Portfolio #6, the Nurture Completer.* Drafts the Day 0–10
  GHL nurture sequence, the 7 missing fast-forward onboarding emails, and
  launch broadcasts for the conductor — all paste-ready in `email-sequences/`,
  never sent by the skill. Modes: `nurture`, `fast-forward`, `broadcast`, `audit`.
- **`taste-clone`** — *Portfolio #7.* Learns her editorial taste from
  `review-cockpit/decisions-log.md` into an evidence-cited `taste-file.md`
  the content-engine critic loads. `gate` mode (pre-filter to top-2 drafts)
  is hard-locked behind ≥50 decisions + 2 weeks of proven precision +
  her explicit approval; archived drafts are never deleted. **Dormant until
  the decisions log has data.** Modes: `compile`, `status`, `gate`.
- **`revenue-watchdog`** — *Portfolio #9.* Daily Whop/Stripe/GHL
  reconciliation into `revenue-log.md` + milestone mirroring to queen-brain
  `proof.md`; manual-paste fallback per missing key; one first-sale
  celebration ping, then anomaly-only alerts; feeds the Sunday money
  paragraph. **Dormant until the first live checkout (UNB-002).** Modes:
  `daily`, `manual-update`, `weekly-narrative`, `status`.
- **`inbox-distiller`** — *Portfolio #10.* Weekly sweep of the
  `research-inbox` repo (750+ saved links, EN+FR): clusters, kills noise,
  emits a cited RESEARCH entry + 2–3 "What's Worth It" angles for
  content-engine + a 5-bullet Telegram brief. `backlog` mode chews the full
  history in monthly batches. `pulse` is the on-demand check — run it anytime
  for a fast read on what's new plus a "Ready to ship" list of already-logged
  angles that never became a draft. Read-only on the inbox. Modes: `weekly`,
  `pulse`, `backlog`, `status`.
- **`community-concierge`** — *Portfolio #11.* Whop community assistant,
  always labeled as her AI, never impersonating her: welcomes, answers from
  her corpus only, escalates the rest in a daily digest, flags churn risk,
  harvests member wins (permission-gated) into proof.md + testimonial
  drafts. **Dormant until ~20 members — becomes top-3 priority that day.**
  Modes: `welcome`, `answer-queue`, `digest`, `harvest`, `status`.
- **`tenant-onboarder`** — *Portfolio #12.* Discovery-call transcript →
  fully scaffolded `tenants/<slug>/` (tenant.json, seeded brain from
  transcript facts only + explicit QUESTIONS-FOR-CLIENT, connections
  checklist, sendable kickoff report). Makes the done-for-you Business OS
  offer deliverable in a day. Modes: `onboard`, `checklist`, `status`.
- **`estate-janitor`** — *Portfolio #13.* Weekly 8-repo hygiene scan:
  duplicates, phantom manifest claims, STATUS contradictions, stale
  branches, drifted copy → one immutable `reports/janitor-*.md` with ranked
  items. Fixes only typo-level issues itself; deletions/consolidations
  always route to the unblocker ledger as human decisions. Modes: `scan`,
  `fix`, `status`.
- **`french-mirror`** — *Portfolio #14.* Rebuilds proven winners (per
  `performance-log.md` evidence only) natively in French for the
  francophone MENA/France market, into a dedicated `ENTRY FR-NNN` vault
  series; queue-only, French-targeted channels only. **Dormant until the
  English funnel converts.** Modes: `mirror`, `candidates`, `status`.

> **The portfolio:** the ranked 14-tool roadmap these come from (with
> activation triggers and wave order) lives in `docs/AI-TOOLS-PORTFOLIO.md`.

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

**Daily crons** (VPS): signal-harvester @ 02:00, content-engine daily @ 02:30
(5 scripts ready by morning), performance-tracker @ 03:00, **review-cockpit
digest @ 07:30** (drafts as one-tap Telegram cards), **unblocker @ 08:00**
(the day's ONE prepped ship task), review-cockpit process @ 12:30 + 20:30
(applies replies, routes voice notes), brain-manager @ 20:00. The morning pair
makes her whole required contribution a ~15-minute phone ritual (review over
coffee, ship one thing before noon); the evening brain questions feed the next
morning's scripts. All on one shared Telegram bot.

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
