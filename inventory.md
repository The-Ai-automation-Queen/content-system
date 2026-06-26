# Inventory (Step 0)

> The video's Step 0 is *inventory*: before you automate anything, write down
> what you already have. This is the asset map the rest of the system reasons
> over. Keep it current — when a channel, offer, or tool changes, update it here.

_Last reviewed: 2026-06-22 (rebuilt for the new positioning)_

---

## 1. The operator

- **Name:** Fatiha Chikh
- **Brand:** **The AI Automation Queen** — automation for *freedom*
- **Background:** 20+ years in tech (Dell, Intel, Microsoft); has personally built
  the AI/automation systems she teaches. Moving out of building → into teaching,
  packaging, and automating.
- **Location:** Dubai, UAE
- **Core promise:** helps everyday entrepreneurs use AI and automation to **win back
  their time** — a business that runs without running their life.

## 2. Audience — the bridge

- **Primary:** **corporate professionals who want to build their own thing** —
  mid-career people (in or recently out of corporate) who want to escape the
  9-to-5 and use AI + automation to build a business that buys back their time.
  Smart, but **overwhelmed by AI** and mostly **non-technical**.
- **Why this audience:** it's the **bridge** — they live in her warm corporate
  LinkedIn network *and* convert into her scalable creator offers. Her own
  corporate → entrepreneur story (Dell/Intel/Microsoft → founder) is the hook.
- **She speaks to the individual, not the org.** Not enterprise/advisory sales.
- **Not** gender-specific.
- **Growth stance:** reach through **leverage** (scalable content + products),
  plus high-ticket corporate **speaking** on the side from the same authority.

## 3. Channels

Multi-platform by design — publish everywhere, let engagement data pick the winners.

| Channel | Role | Blotato-connected? | Notes |
|---|---|---|---|
| Instagram | Test + grow | ✅ `@thefatihachikh` | Short-form video; reel/story |
| LinkedIn | **Warm-network anchor** | ✅ Fatiha Chikh (+ company page) | Where the bridge audience lives; lead with insight + corporate-exit angle |
| YouTube Shorts | Test + grow | ✅ AI-Automation-Queen | Repurposed short-form |
| Facebook | Repurpose | ✅ Page "AI Automation Queen" | Mirror of LinkedIn/IG |
| Threads | Test + grow | ✅ `@thefatihachikh` | Short text / repurpose |
| Twitter / X | Test + grow | ✅ `@aiautomatik` | Short text / repurpose |
| TikTok | Test + grow | ❌ **NOT connected** | The plan wants TikTok but no account is wired to Blotato — connect it to close the gap |
| Keynote / stage | Authority anchor | n/a | Clips reused as credibility signals |
| (Long-form: YouTube/Substack) | Optional later | n/a | Only if it earns its effort |

> No single "home base" is declared yet — the data decides. Reassess after a few
> weeks of cross-platform posting.

## 4. Content pillars

Every piece maps to one (see `positioning/SKILL.md`):

1. **Time Wins** — quick AI/automation moves that save real hours
2. **Build Once, Runs Forever** — systems that run while you sleep (show the build)
3. **The Freedom Business** — work less, live more; business that runs without you
4. **Stop Doing That by Hand** — provocative "you're still doing this manually?"
5. **What's Worth It** — curated AI tools/news that actually matter (not daily)
6. **Real Talk** — relatable founder lessons from having built it

## 5. Offers / how it monetizes (active now)

1. Paid **community / membership** (core, scalable)
2. **Digital products / courses**
3. **Corporate speaking / workshops** — high-ticket, warm-network, near-term cash
   (fed by the LinkedIn authority; productized one-to-many, not 1:1 time)
4. A packaged **system / "OS"** to sell (roadmap)
5. **Affiliate / sponsorships** (opportunistic)

Not offered: 1:1 advisory/consulting; time-consuming beginner training.

## 6. Data sources (what feeds the engine)

- `research-notes.md` — last-30-days research sweeps
- `reports/` — research digests, competitor watches, vault audits
- `inspiration-library/creators.csv` — tracked creators (format/hook reference)
- Web research (Tavily / WebSearch) at run time

## 7. Tools — the stack (Romain-shape: brain → research → draft → visual → publish)

**Used now (repo-native):** Claude Code, git, markdown files, web search.

**WIRED INTO THE LOOP (skills exist; ⚙️ = needs operator key/allowlist to run live):**

| Machine | Tool | Role in the system | Skill |
|---|---|---|---|
| M00 brain | **Claude Code** + Telegram bot | Daily brain update: asks operator questions, writes `personal-brain.md` | `brain-manager` |
| M01 data | **Apify, Tavily, X, RSS** ⚙️ | Multi-source daily signal harvest (IG/X scrapes, YouTube virality, blogs, news) | `signal-harvester` |
| M01 scripts | **Claude Code** | Signals + personal brain → in-voice drafts, critic-scored (5/day in daily mode) | `content-engine` |
| M02 visuals | **Canva, Gamma, Blotato** | Carousels/decks + AI images/infographics + film-free narrated video | `visual-engine` |
| M02 face | **Higgsfield** (paid, MCP) / HeyGen fallback | Talking-head of HER cloned avatar + voice from a script | `heygen` (talking-head) |
| M03 reels | **Opus Clip** ⚙️ (Blotato fallback) | Long video → many shorts with hooks + CTAs | `reels-factory` |
| M04 distribution | **Blotato** | Schedule to the multi-platform **queue**; writes status back | `distribution` |
| M05 DM/leads | **GHL** (IG) + **Unipile** ⚙️ (LinkedIn) + Blotato/native API (FB/YT) | Comment-keyword → DM resource → capture lead | `dm-responder` |
| M06 performance | **Meta Graph API** + **Apify** scrapers | Scrape all platforms for followers + post engagement; feed dashboard | `performance-tracker` |

**Connected but not yet wired in** (integration backlog):

| Tool | Potential role | Step |
|---|---|---|
| Notion | External content calendar / board mirrored from the vault | 1 |
| Google Drive | Asset storage for generated visuals | 6 |
| Granola | Meeting notes → content raw material | 1 |
| GitHub | Hosting / sync / automation triggers | 6 |

**MISSING — still needs operator action (the live-wiring checklist):**

| Gap | What's needed | Unblocks |
|---|---|---|
| Blotato media egress | Allowlist `database.blotato.io` (+ `*.blotato.io`) in env network egress — currently **blocked** | Uploading the HeyGen MP4, `ai-avatar-broll` |
| Higgsfield MCP | Add Higgsfield MCP server to Claude Code env settings + record avatar/voice IDs in this file | `heygen` (talking-head of her — Higgsfield is primary) |
| HeyGen (fallback) | `HEYGEN_API_KEY` env + allowlist `api.heygen.com`, `resource.heygen.ai` — only needed if Higgsfield unavailable | `heygen` (talking-head fallback) |
| Opus Clip | `OPUS_CLIP_API_KEY` env + allowlist `api.opus.pro` | `reels-factory` |
| ~~ManyChat~~ | Not needed — **GoHighLevel (GHL)** handles IG comment→DM→capture natively | `dm-responder` (IG leads) |
| Unipile | `UNIPILE_API_KEY` + `UNIPILE_DSN` env + allowlist `api.unipile.com` + connect LinkedIn account | `dm-responder` (LinkedIn DM auto) |
| Brain Manager Telegram | Create Telegram bot via @BotFather + set `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` | `brain-manager` daily brain updates |
| Signal sources | X/Grok API key; confirm Apify/Tavily MCP usable from `signal-harvester` | `signal-harvester` live |
| Always-on host | A small VPS (or scheduled web sessions) for crons + the DM webhook | All daily crons (M00 + M01 + M06) |
| TikTok | Connect a TikTok account to Blotato | TikTok publishing |

**Higgsfield IDs (fill after a clone session):** avatar_id = `____`, voice_id = `____`.
**HeyGen IDs (fallback — fill if using HeyGen):** avatar_id = `____`, voice_id = `____`.

> **Note:** AI **image gen**, **infographics**, and **narrated AI-voice video**
> are already wired inside **Blotato** (`blotato_create_visual`). HeyGen is added
> specifically for **talking-head of her real face** (Blotato's avatars are
> generic and must never be presented as her). Default faceless brand voice:
> `Alice (British, confident)`.

> **Note:** AI **image generation** (Flux/Imagen/Seedream/Ideogram-class), AI
> **infographics**, and AI **video + voiceover** (ElevenLabs voices, AI avatars)
> are **already wired** — they live inside **Blotato's visual engine**
> (`blotato_create_visual`), driven by `visual-engine`. No separate
> Midjourney/HeyGen/ElevenLabs connection is required for faceless/narrated work.

> Decision (2026-06-23, updated): the system is **wired for AI visuals, film-free
> video, and queued publishing** — Canva + Gamma + Blotato's visual engine.
> Publishing stays **queue-only** (Blotato schedules, the operator releases).
> Remaining adds: a real avatar of *her*, a TikTok connection, then Notion as a
> visual calendar. Default brand voice: `Alice (British, confident)`.
