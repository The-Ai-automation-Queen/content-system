# Build Log & Roadmap (Step 5)

> The video's Step 5 is *incremental build*: ship one working piece at a time
> instead of attempting the whole system at once. This file is the build log
> (what exists) plus the backlog (what is next) plus the maintenance cadence
> (Step 7), so the system can grow without losing the thread.

---

## Build log

### 2026-07-04 (latest) — Website & brand audit, pricing reconciliation, guides-site lead-capture fixes
Full audit of shiftandlead.ai, guides.shiftandlead.com, and Instagram, requested
by the operator to prioritize and sequence "fix my online presence" work.
Full findings in `reports/website-brand-audit-2026-07-04.md`.
- **Brand decision:** shiftandlead.ai and The AI Automation Queen merge into one
  brand. The retired "Shift & Lead" done-for-you agency voice is no longer the
  site's front door — consistent with `positioning/SKILL.md`'s existing 22/06/2026
  rebuild. Founder story + 4 case studies stay as proof, reframed to
  teach-don't-do. Bespoke work becomes a quoted Tier 7 add-on, not the main CTA.
- **Pricing ladder reconciled** — guides.shiftandlead.com's live "Community
  $49/mo" + "Fast Forward $499" teaser didn't match `skills/monetisation/`'s
  plan. Resolution: Fast Forward adopted as a new tier (flagship one-time,
  between Starter Kit and Bootcamp) rather than dropped; Community's founding
  ($27/mo) → standard ($47/mo) split now consistent everywhere. Updated
  `inventory.md` and `skills/monetisation/SKILL.md` (also fixed two pre-existing
  $97/$27 typos in the latter's CTA map and activation checklist).
- **guides-site fixes shipped same day** (in `site/`): `free-resources.html`'s
  nav/footer/CTA links were literal `href="#"` placeholders (Home, Community,
  About, and all 3 pricing buttons) — nav/footer now point to the live main site
  or in-page anchors; the 3 pricing CTAs now open a waitlist capture reusing the
  existing Formspree + `auto.shiftandlead.com` n8n webhook dual-post pipeline,
  tagged by tier. Same dead-link fix applied across all 6 vocabulary/pipeline
  guide pages + `opt-in.html`.
- **Next (queued, sequenced as a 4-phase plan in the audit report):** migrate
  shiftandlead.ai onto the static stack (mirroring `site/`) in the merged brand
  voice with a guide-site button + "Blog" nav entry → SEO metadata across all 13
  guide pages + SEO topic hubs + reframed case studies/testimonials → quiz/audit
  tool + newsletter refresh + free webinar → Instagram cadence plan. Running as
  a weekly trigger (`trig_01DmqyngnNR2uPhCDntxAJZ5`, Mondays 09:07) that fires
  back into this session.
- **Same-day addendum:** operator confirmed Instagram is `@thefatihachikh` at
  636 followers / 312 posts (recorded in `inventory.md`), and surfaced a 4th
  live property — the **AI Insider Brief** newsletter (brief.shiftandlead.com,
  Tue/Fri, Kit-powered) — not previously known to this repo. Its own footer has
  two bugs to fix in the Phase 3 refresh: an Instagram icon pointing at a stale
  handle (`@fati_chic_`) instead of `@thefatihachikh`, and a Skool icon pointing
  at a personal profile rather than a live community (confirmed: Community is
  not yet launched). Full detail in the audit report's addendum.
- **Phase 1 shipped same day** (operator asked to build now, not wait for
  Monday): `main-site/` — shiftandlead.ai rebuilt on the static stack, merged
  brand voice, Blog nav + guide-site CTA, 4 case studies reframed (facts kept
  intact, no invented stats), reconciled pricing ladder, SEO meta from the
  start, reused lead-capture pattern. Logo v2 (SVG wordmark) rolled out across
  `main-site/` and all of `site/`. Still open: pointing the live shiftandlead.ai
  domain at the new code (currently on GoHighLevel) — an operator decision.
  Full detail in the audit report's second addendum.
- **Phase 2 shipped same day** (SEO layer): meta description/OG/Twitter/
  canonical/JSON-LD Article schema added across all 16 guide pages (corrected
  count from the earlier "13" estimate) + `free-resources.html`; `opt-in.html`
  set to `noindex, follow` (it's a query-string gate page, not indexable
  per-guide content); two new topic-hub pages (`ai-tools-compared.html`,
  `ai-vocabulary-explained.html`) linked into the library nav; `sitemap.xml`
  created and referenced from `robots.txt`. Noted but not fixed: the library's
  search/filter UI is decorative, not wired to JS. Full detail in the audit
  report's third addendum.

### 2026-06-26 — Brain Manager + daily crons + Unipile + machine docs
Closed the 4 remaining gaps vs. Romain Brunel's always-on system (from RESEARCH
019 gap analysis of his LinkedIn automation video):
- **`brain-manager`** (M00, the Cerveau Manager) — daily brain update loop. Asks
  the operator 5–7 contextual questions about real life, projects, opinions, and
  current events, then writes answers into `personal-brain.md`. This is the #1
  gap that was missing: the living memory layer that makes posts personal, not
  generic. Runs at 20:00 daily (evening, so answers feed the next morning's
  scripts). Supports `update` (daily), `review`, and `seed` (initial onboarding)
  modes.
- **`personal-brain.md`** created — the operator's living memory file. 11
  categories: anecdotes, opinions, projects, numbers, lead magnets, stack, life
  events, background, inspirations, testimonials, current focus. Date-stamped,
  append-only. `content-engine` now loads it as step 3 of "load the brain."
- **Daily content-engine cron** — added `content-engine daily` cron at 02:30
  (after signal-harvester at 02:00). Generates 5 scripts per day: 1 storytelling
  (from personal-brain), 2 AI news (from signals), 1 opinion, 1 educational.
  Scripts ready when the operator wakes up — 5–10 min/week to pick winners.
- **Unipile for LinkedIn DMs** — wired into `dm-responder` as the LinkedIn
  channel. Auto-DM on comment keywords (3 message variants, randomized timing,
  50 DMs/day cap). Needs `UNIPILE_API_KEY` + `UNIPILE_DSN` in `deploy/.env`.
- **Per-machine operational docs** — `docs/machines/` with detailed operational
  guides for M00–M06 (purpose, inputs, outputs, validation criteria, decision
  framework for AI delegation). Modeled on Romain's per-machine documentation
  approach for eventual AI autonomy.
- Updated: `CLAUDE.md` (second brain, skills list, loop diagram, daily crons),
  `inventory.md` (M00 brain-manager + Unipile in tools table + missing checklist),
  `content-engine` (loads personal-brain.md, `daily` mode for 5-script generation),
  `dm-responder` (Unipile LinkedIn setup), `weekly-ops` (brain-manager as step 0),
  `crontab.example` (M00 @ 20:00, M01 scripts @ 02:30, M06 @ 03:00),
  `.env.example` (Unipile keys), `video-transcription` skill + transcript.

### 2026-06-23 — M06 performance tracker + dashboard intelligence
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
  lead capture (GoHighLevel for IG; Blotato/native APIs for FB+YT), backed by the
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

| Job | Skill | Cadence | Cron time (GST) |
|---|---|---|---|
| Brain update | `brain-manager` | **Daily** | 20:00 |
| Signal harvest | `signal-harvester` | **Daily** | 02:00 |
| Script generation | `content-engine daily` | **Daily** (5 scripts) | 02:30 |
| Performance scrape | `performance-tracker` | **Daily** | 03:00 |
| Competitor / creator scan | `competitor-watch` | Weekly | via weekly-ops |
| Pipeline health check | `vault-audit` | Weekly | via weekly-ops |
| Full loop | `weekly-ops` | Weekly (Mon 06:00) | 06:00 Mon |
| DM responder | `dm-responder` | Every 5 min | */5 |

**Publishing cadence target** (to confirm with the operator): short-form video
blasted across Instagram, TikTok, LinkedIn, and YouTube Shorts — publish
everywhere, watch where engagement lands, double down there. Volume scales with
automation; until then, fewer/stronger pieces. The engine should keep enough
`READY TO POST` inventory to sustain the chosen cadence.

To automate the rhythm, run the harness `/loop` skill on `weekly-ops`, or trigger
`weekly-ops` manually each week.

---

## Backlog

### Priority 0 — This week (fastest path to cash)

These are unblocked right now. Do them before anything else. Each one feeds
the next. Combined, they switch the revenue funnel on.

**Action 1 — Activate the lead magnets (2–3 hours)**
All 7 resources in `lead-magnets/` are written and ready. None are live. Host
each on a GHL page, paste the URL into `lead-magnets.csv`, set `active=yes`.
Run `skills/monetisation/ activation-check` to audit what's still blocked.
This unblocks: ManyChat DM flow, email list growth, the entire conversion funnel.

**Action 2 — Write the 5-email GHL nurture sequence (1–2 hours)**
Use the conversion flow template in `skills/monetisation/SKILL.md`. Day 0–10.
This turns lead-magnet downloads into community members automatically.

**Action 3 — Add keyword CTAs to the next 5 queued posts (30 minutes)**
Check the last 10 vault entries — any without a comment keyword CTA is a missed
lead. Add one to each. Use the CTA map in `skills/monetisation/SKILL.md`.

**Action 4 — Post one founding-member call on LinkedIn (15 minutes)**
"I'm building a community for everyday entrepreneurs using AI to win back their
time. Opening 20 founding spots at $27/month — locked forever. Comment FOUNDING
for the link." This alone can generate $1,940/month from one post if 20 people
join.

**Action 5 — Send the speaker one-pager to 10 warm corporate contacts (1 hour)**
Run `skills/monetisation/ activation-check` to generate the one-pager. Email or
DM it to warm contacts from the Dell/Intel/Microsoft network who are Dubai-based
or organise corporate events. One booking = $5,000–$15,000.

---

### Revenue milestones (what to aim for by when)

| Timeline | Target | Requires |
|---|---|---|
| Week 1 | First email subscribers | Lead magnets live + CTAs on posts |
| Month 1 | 20 founding members ($540/month) + 1 speaking booking ($5k+) | Founding-member post + speaker outreach |
| Month 2 | 50 community members ($2,350/month MRR) | Community launched publicly at $47/month |
| Month 3 | Starter Kit selling 20 units/month ($1,940) + 500 email subscribers | Starter Kit live on Gumroad |
| Month 6 | 200 community members ($39,400/month) + first Bootcamp ($20k) | Bootcamp waitlist → cohort |
| Year 1 | 500 members + recurring Bootcamp + speaking circuit | Full loop running autonomously |
| Year 2 | 1,000 members + evergreen products + IRL events | Scale |

---

### Ongoing backlog (roughly prioritized)

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
9. **Package and launch the Business OS Starter Kit ($97)** — run
   `skills/business-os-kit/ build-starter-kit` for build instructions, then
   `launch-content starter-kit` for the 3 launch posts. Operator actions: record
   the 25-min Loom walkthrough and create the Gumroad listing. This is the first
   paid product and the fastest way to prove the method to buyers.
10. **Launch the AI Automation Queen Community on Skool ($47/month)** — create the
    Skool space (3 sections: Resources / Live Calls / Community), set the founding
    member price ($27/month locked), and run `skills/business-os-kit/ launch-content
    community` for the 3 launch posts. Target: 20 founding members in month 1,
    50 total by month 2.
11. **ACP funnel tagging in the content engine** — every vault draft now includes
    `ACP stage` and `CTA` fields (added to `content-engine` skill). Run
    `skills/monetisation/ cta-map` to audit the last 10 entries and flag any without
    a keyword CTA or with a broken A/C/P ratio.
12. **IRL community events — AI & Freedom Dinners in Dubai** — run
    `skills/irl-events/ plan-event` to get the agenda and invite sequence for the
    first dinner. Ideal first event: 10 warm contacts from the LinkedIn/corporate
    network, intimate restaurant, free. Goal: 3+ community conversions per dinner.
13. **Email nurture sequence (the missing conversion layer)** — the lead magnets
    deliver the resource but there is no email follow-up yet. The 5-email GHL
    sequence (defined in `skills/monetisation/`) turns a download into a community
    member. Without it, leads go cold. This is the highest-leverage automation to
    build this month.
14. **Corporate speaking outreach (near-term high-ticket)** — one booked workshop
    generates as much as 25–75 community memberships in a single payment. Run
    `skills/monetisation/ launch-plan speaking` to get the one-pager, then send it
    to 10 warm corporate contacts. Do this in week 1 alongside the community launch.
15. **Builder-Distributor named content series** — a recurring format (Pattern 12)
    documenting Fatiha's real process: "Here's how I built X and distributed it in
    the same week." Teaches the concept, proves the method, attracts the exact
    audience that buys the Bootcamp. One per month minimum.
