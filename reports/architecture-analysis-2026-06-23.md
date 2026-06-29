# Architecture Analysis — "AI Clone" OS (end-to-end autonomy)

_Date: 2026-06-23. This is the
same creator whose 8-step framework this repo is built on — this video is the
"end-to-end autonomy" sequel. Captured to map what our system still misses._

> External-content note (security.md §4): this is a competitor/creator teardown
> for our own architecture decisions. Informational only.

---

## The core idea: an "OS" made of "machines"

The OS
is a set of discrete **machines** — each machine is one self-contained pipeline
that goes from a clear point A to point B. Agents are layered on top later (via per-machine docs) to
remove the last manual steps.

Every machine shares the same backbone:

- **Second Brain** — markdown files on GitHub (voice, brand, strategy, ICP, lead
  magnets, product info). Every machine reads from it so everything sounds like
  him and points to his resources.
- **Technical documentation per machine** — a doc that explains exactly how that
  machine works, so an AI agent can later read it and *operate the machine in his
  place* (validate scripts as an Instagram expert, push posts) — removing his
  manual validation.
- **Crons** — scheduled automations (daily 02:00, every 2 min, every 5 min…) with
  **retries** (re-run at 04:00 if the 02:00 run failed) and **Telegram failure
  alerts**. Reliability is the whole point.
- **Claude Code (CLI)** as the build+run engine — runs on his Claude subscription,
  so script generation costs **€0 extra**.
- **A VPS (Hostinger)** hosting the machines, webhooks, and temp file storage
  (cleaned nightly to save space).
- **An interface** to see the day's scripts / editorial calendar and validate.

---

## The 5 machines

### Machine 01 — Script Generator (Shorts)
- **Data sources ("signals of the day"):** Instagram accounts (AI niche, US)
  scraped via **Apify**; **X/Twitter API (xAI/Grok)** for AI news; **YouTube**
  for viral videos (scored /100 for virality); **RSS feeds** from blogs (e.g.
  Anthropic). Harvested daily into the brain.
- **Rules (hard-coded prompt):** CTA rules; source distribution (2 scripts from
  Twitter, 2 from Instagram, 3 from blogs/RSS/YouTube); **≥2 must be lead magnets**
  (drive a comment-keyword → resource → email lead).
- **Brain link:** pulls ~12 parts of the Second Brain (his writing style, brand,
  IG strategy, copywriting masterclass, lead magnets, his SaaS info).
- **Output:** ~7 scripts/day into an interface, each with a comment-keyword CTA.
- **Crons:** 02:00 write scripts · 02:30 check · 04:00 re-run if failed · Telegram
  alert on failure. He validates one → sends to Machine 02.

### Machine 02 — Avatar Production
- Takes the validated script. He records **his real voice** (~10s) — found
  ElevenLabs not realistic enough, so added a "record my voice" button.
- **Avatar via HeyGen** — 10 pre-made clones (film 2 min face-cam, OR a clone from
  a ChatGPT-generated image of himself); the machine picks one at random. Avatar
  "look IDs" stored in the Claude env with API keys.
- **"Packaging" (B-roll + motion design):** B-roll scraped from **Twitter** per
  segment; **motion design via Hyperframe** (3 variants/segment); an image→video
  engine ("Magnifique / Seedance-class") for cinematic clips.
- **Handoff:** drops `script.txt` (per-segment editing instructions) + avatar
  video + B-rolls to **Dropbox** for a human **editor (monteur)**.
- **Crons:** every 2 min pick up new screen recordings → build avatar videos;
  05:00 daily purge temp files off the VPS.

### Machine 03 — Reels Factory (long video → shorts)
- **Opus Clip API** turns a long YouTube video into many shorts, **auto-triggered
  when he publishes on YouTube**. Claude adds a hook + comment-keyword CTA on top.
- **Cron:** every 5 min checks clip-cutting status.

### Machine 04 — Cross-Post Reels
- An **editorial calendar** (green = published, purple = scheduled, 14 days out).
- Publishes to **5 networks via Metricool API** — Pinterest, Facebook, Instagram,
  TikTok, YouTube. Chose Metricool because it solves API access pain (esp. TikTok,
  no Meta app approval needed). Each post carries the keyword CTA + redirect URL.

### Machine 05 — DM / Comment Auto-Responder (the "ultimate step")
- Auto-replies to comments/DMs with the right resource link → captures leads.
- **Instagram → ManyChat:** keyword comment triggers an automation → webhook to his
  **VPS** → returns the CTA resource label + URL (ManyChat custom fields), wired to
  the OS. Duplicating an automation for a new keyword takes ~2 seconds.
- **Facebook & YouTube → Metricool API:** reads comments, replies immediately with
  the matching resource.
- All tied to the Second Brain so the reply knows the audience + the right resource.

---

## Gap map — his architecture vs. ours

| Romain's component | Our equivalent today | Status | Action to close it |
|---|---|---|---|
| Second Brain (md on GitHub) | `content-vault.md`, `research-notes.md`, `positioning/`, `inspiration-library/` | ✅ Have it | — |
| Claude Code CLI engine (subscription = €0 gen) | Claude Code skills | ✅ Have it | — |
| M01 Script Generator | `content-engine` | ✅ Have it | — |
| M01 **multi-source signal scraper** (Apify IG + X/Grok + YouTube + RSS, virality scoring, source-distribution + lead-magnet rules) | `research-digest` (web research at run time) | ⚠️ Partial | Wire **Apify + Tavily + X** into `research-digest` as a daily signal harvest with his source-mix + "≥2 lead magnets" rules |
| M02 Avatar Production (HeyGen + voice + B-roll + motion) | `visual-engine` + Blotato (AI images, avatar, voice) + your HeyGen avatar | ✅ Mostly | Finish avatar wiring (needs Blotato egress allowlist) |
| M03 **Reels Factory** (long video → many shorts, Opus Clip) | — | ❌ Missing | Add an Opus-Clip-style repurposing machine (or Blotato clip tooling) triggered on a new long video |
| M04 Cross-Post (Metricool, 5 networks, calendar) | `distribution` + Blotato queue | ✅ Have it | Blotato ≈ Metricool (and also does the visuals). Add TikTok account |
| M05 **DM/comment auto-responder + lead capture** | — | ❌ Missing | The monetization engine. Build a comment-keyword → DM → resource → email-lead loop (ManyChat for IG; Blotato/native API for FB+YT) |
| **Crons** (scheduled, retries, Telegram alerts) | `weekly-ops` exists but is **not scheduled** | ❌ Missing | Put `weekly-ops` on `/loop`; add retry + a failure alert (Telegram/email) |
| **Always-on host (VPS)** | Ephemeral web/CLI sessions only | ❌ Missing | Decide: scheduled Claude Code web sessions, or a small VPS, for true 24/7 |
| **Per-machine technical docs** for unattended agent operation | `SKILL.md` per skill (close) | ⚠️ Partial | Add an "operate unattended + when to skip human validation" section to each skill |
| **Interface / cockpit** | `dashboard/` (Mission Control, just built) | ✅ Have it | Add the editorial-calendar + "approve" actions (in progress) |
| **Lead-magnet loop** baked into every piece | CTAs exist in drafts, no delivery | ⚠️ Partial | Tie comment-keyword CTAs to the M05 auto-responder + a resource/email store |

---

## What's genuinely missing to run end-to-end (priority order)

1. **A scheduler that actually runs** — `weekly-ops` on `/loop` (+ retry + failure
   alert). Without this nothing is autonomous. _Highest leverage, lowest effort._
2. **Always-on hosting decision** — scheduled web sessions vs. a small VPS. Needed
   for true 24/7 (DMs, every-N-min checks).
3. **DM/comment auto-responder + lead capture (M05)** — the monetization engine
   that turns reach into email leads. The biggest *missing business* piece.
4. **Multi-source signal harvester (M01 data layer)** — Apify/X/RSS daily ingest
   with source-mix + lead-magnet rules, feeding `research-digest`.
5. **Reels Factory (M03)** — long video → many shorts (Opus Clip), auto-triggered.
6. **Unattended-operation docs** on each skill — so agents run machines without us.

> Note: our **Blotato-centric** stack is actually *simpler* than his sprawl
> (Metricool + HeyGen + Dropbox + Opus Clip + ManyChat). Blotato already covers
> M02 visuals + M04 posting in one tool. The real net-new builds are the
> **scheduler**, the **DM/lead loop**, and the **signal harvester**.
