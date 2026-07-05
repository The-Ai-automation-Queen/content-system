# The AI Insider Brief — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a dark premium AI intelligence dashboard with automated content pipeline, Telegram approval, and self-hosted deployment — a full replica of narratives.now adapted for Fatiha's brand and ICP.

**Architecture:** Static frontend (single HTML/CSS/JS page) reads from a JSON data file. Backend pipeline on VPS crawls sources, synthesizes cards via LLM, sends to Telegram for approval, and publishes approved cards to the JSON file. Frontend auto-refreshes or rebuilds on new data.

**Tech Stack:** HTML/CSS/JS (no framework), JSON data store, Node.js pipeline (matches existing research-bot/carousel-agent patterns), Telegram Bot API, Crawl4AI or Firecrawl, Ollama or Claude API, VPS (existing), cron scheduling.

---

## Phase 1: Frontend — The Intelligence Dashboard

### Task 1: Project scaffold and data model

**Files:**
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\index.html`
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\styles.css`
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\app.js`
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\data\briefs.json`

**Step 1: Create project directory**

```bash
mkdir -p "C:\Users\fatih\.claude\builds\ai-insider-brief\data"
```

**Step 2: Create the data model with sample cards**

Create `data/briefs.json` with 8-10 sample intelligence cards (2 per day across categories) so the frontend has real content to render during development. Each card follows this schema:

```json
{
  "cards": [
    {
      "id": "2026-04-11-001",
      "category": "Privacy",
      "headline": "Google quietly changed Gemini's free-tier data policy",
      "narrative": "Your free Gemini conversations now train Google's models. If you or your team use the free tier for client work, your client data is feeding their AI. That is a liability you did not sign up for.",
      "verdict": "ACT",
      "verdict_text": "Upgrade to paid or switch to Claude for anything client-related. Do not use free-tier AI for business data.",
      "date": "11/04/2026",
      "timestamp": "2026-04-11T08:00:00Z"
    }
  ]
}
```

Include sample cards across all 8 categories (Breaking, Tools, Privacy, Strategy, Teams, Trends, Industry, Noise Filter) with realistic content written in Fatiha's voice. Include at least one WATCH and one IGNORE verdict to test all verdict states.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: scaffold AI Insider Brief project with data model and sample cards"
```

---

### Task 2: HTML structure — full page skeleton

**Files:**
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\index.html`

**Step 1: Build the complete HTML structure**

The page has 5 sections, top to bottom:

1. **Header** (sticky)
   - Left: logo "The AI Insider Brief" (text, not image)
   - Right: "Subscribe" button + "By Fatiha Chikh" text

2. **Hero**
   - Canvas element for particle animation (background)
   - H1: "AI moves fast. You move faster."
   - Subtitle: "The AI brief for business owners who do not have time for noise"
   - Email capture form: single input + "Get the brief" button
   - No other elements

3. **Category bar** (becomes sticky on scroll, below header)
   - Container with horizontal scroll
   - Pill buttons: All (default active), Breaking, Tools, Privacy, Strategy, Teams, Trends, Industry, Noise Filter
   - Breaking pill has a small animated dot

4. **Feed**
   - `#feed` container
   - Date separator divs ("Today", "Yesterday", dates in DD/MM/YYYY)
   - Card elements rendered by JS from JSON

5. **Footer**
   - "Fatiha Chikh · Shift & Lead"
   - Social links row (LinkedIn, Instagram, X — use SVG icons inline)
   - Secondary email signup
   - "Formerly Dell · Intel · Microsoft"

Use semantic HTML. No framework. No dependencies. Cards are rendered by JS in Task 4.

**Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add complete HTML structure for AI Insider Brief"
```

---

### Task 3: CSS — dark premium design with animations

**Files:**
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\styles.css`

**Step 1: Build the complete stylesheet**

This is the most critical file. It must feel like narratives.now — dark, premium, alive — but with Fatiha's brand DNA. Reference the design doc for all values.

**Global:**
- `* { box-sizing: border-box; margin: 0; padding: 0; }`
- Body: `background: #0d0d0d; color: #ffffff; font-family: Georgia, serif;`
- Custom scrollbar: thin, dark track, purple thumb
- Smooth scroll behavior
- Selection colour: purple background

**Header (sticky):**
- `position: sticky; top: 0; z-index: 100;`
- `background: rgba(13, 13, 13, 0.95); backdrop-filter: blur(20px);`
- Logo in Georgia Italic, 1.2rem
- Subscribe button: purple background, white text, subtle hover glow
- Border-bottom: `1px solid #2a2a2a`

**Hero:**
- Full viewport height minus header
- Centered content, max-width 680px
- H1: Georgia Italic, 3.5rem desktop / 2.2rem mobile, `letter-spacing: -0.02em`
- Subtitle: 1.1rem, `color: #8a8a8a`, max-width 500px
- Email input: dark background `#1a1a1a`, border `#2a2a2a`, focus border purple
- Button: `#6B35C2` background, white text, hover: lighter purple + glow shadow
- Canvas for particles positioned absolute behind content

**Category bar:**
- Sticky below header when scrolled past hero
- `overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch;`
- Hide scrollbar but keep scroll functionality
- Pills: `display: inline-block; padding: 8px 20px; border-radius: 24px;`
- Active: `background: #6B35C2; color: #fff;`
- Inactive: `background: transparent; color: #8a8a8a; border: 1px solid #2a2a2a;`
- Hover inactive: `border-color: #6B35C2; color: #fff;`
- Transition: all 0.2s ease
- Breaking dot: `@keyframes pulse` animation, small purple circle

**Cards:**
- `background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 28px 32px;`
- `margin-bottom: 16px; max-width: 760px; margin-inline: auto;`
- Hover: `transform: translateY(-2px); border-color: rgba(107, 53, 194, 0.4); box-shadow: 0 8px 32px rgba(107, 53, 194, 0.1);`
- Transition: all 0.3s ease
- Category badge: small pill, uppercase Arial 11px, letter-spacing 0.05em
  - Default: purple background with 15% opacity, purple text
  - Breaking: pulsing purple border via keyframe
- Headline: Georgia Italic, 1.35rem, white, margin-top 14px
- Narrative: Georgia, 0.95rem, `color: #c0c0c0`, line-height 1.65, margin-top 10px
- Verdict bar: separate section with left border
  - ACT: left border `#22C55E`, background `rgba(34, 197, 94, 0.08)`, label green
  - WATCH: left border `#6B35C2`, background `rgba(107, 53, 194, 0.08)`, label purple
  - IGNORE: left border `#8a8a8a`, background `rgba(138, 138, 138, 0.05)`, label grey
- Verdict text: Arial, 0.85rem
- Timestamp: `color: #555`, Arial, 0.8rem, top-right
- Share button: ghost style, `color: #555`, hover: purple

**Breaking card special state:**
- `border-color: rgba(107, 53, 194, 0.3);`
- `@keyframes breakingGlow` — subtle pulsing purple box-shadow

**Noise Filter card:**
- Slightly lower opacity (0.7), returns to 1 on hover

**Date separators:**
- Centered text, `color: #555`, Arial 12px uppercase, letter-spacing 0.1em
- Thin lines on either side (`#2a2a2a`)

**Animations:**
- `@keyframes fadeInUp` — cards enter with opacity 0→1, translateY 20px→0
- `@keyframes shimmer` — loading placeholder effect
- `@keyframes breakingPulse` — purple dot pulse
- `@keyframes breakingGlow` — card border glow pulse
- `@keyframes float` — hero particles gentle float

**Footer:**
- `border-top: 1px solid #2a2a2a; padding: 48px 24px;`
- Centered, `color: #555`
- Social icons: `color: #555`, hover: `#fff`
- Trust line "Formerly Dell · Intel · Microsoft" in Arial 12px, `color: #444`

**Responsive:**
- Mobile breakpoint at 768px
- Hero H1 drops to 2.2rem
- Cards: padding 20px 24px, full-width
- Category bar: touch scroll with momentum
- Header: logo smaller, subscribe button icon-only

**Step 2: Commit**

```bash
git add styles.css
git commit -m "feat: add dark premium stylesheet with animations and responsive design"
```

---

### Task 4: JavaScript — feed rendering, filtering, particles

**Files:**
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\app.js`

**Step 1: Build the application JavaScript**

Three modules in one file (no bundler needed):

**Module A — Data loading and card rendering:**
- `async function loadBriefs()` — fetch `data/briefs.json`
- `function renderCard(card)` — returns HTML string for one card element
  - Category badge with colour class
  - Headline
  - Narrative
  - Verdict bar with correct verdict type styling
  - Timestamp formatted DD/MM/YYYY
  - Share button with click handler
- `function renderFeed(cards)` — clears feed container, groups cards by date, inserts date separators, renders all cards with staggered fadeInUp animation (each card delayed by 50ms × index)
- `function groupByDate(cards)` — groups cards into "Today", "Yesterday", or DD/MM/YYYY buckets

**Module B — Category filtering:**
- Event listeners on all category pills
- `function filterByCategory(category)` — filters cards array, re-renders feed with animation
- "All" shows everything
- Active pill state management (add/remove active class)
- Smooth transition when switching categories

**Module C — Hero particle animation:**
- Canvas-based particle system (not a library — vanilla JS)
- 30-40 small circles, `rgba(107, 53, 194, opacity)` where opacity varies 0.1-0.4
- Slow random float movement (0.2-0.5px per frame)
- Particles wrap around edges
- `requestAnimationFrame` loop
- Pause when hero is not visible (IntersectionObserver)
- Canvas resizes with window

**Module D — Share functionality:**
- `function shareCard(cardId)` — uses Web Share API on mobile, copies URL with card anchor on desktop
- Toast notification "Link copied" for 2 seconds

**Module E — Scroll behaviors:**
- Category bar becomes sticky when hero scrolls out of view (IntersectionObserver)
- Add/remove `sticky-active` class for visual change (subtle background darken)

**Module F — Auto-refresh:**
- `setInterval` every 5 minutes — re-fetch briefs.json
- If new cards exist (compare IDs), prepend them with animation
- No full page reload — just inject new cards at top

**Init:**
- `DOMContentLoaded` → load briefs → render feed → init particles → init scroll observers

**Step 2: Verify in browser**

Open `index.html` in browser. Verify:
- All sample cards render correctly
- Category filtering works
- Particles animate in hero
- Cards have hover effects
- Share button works
- Responsive on mobile viewport

**Step 3: Commit**

```bash
git add app.js
git commit -m "feat: add feed rendering, category filtering, particles, and auto-refresh"
```

---

### Task 5: Polish — animations, micro-interactions, edge cases

**Files:**
- Modify: `C:\Users\fatih\.claude\builds\ai-insider-brief\styles.css`
- Modify: `C:\Users\fatih\.claude\builds\ai-insider-brief\app.js`
- Modify: `C:\Users\fatih\.claude\builds\ai-insider-brief\index.html`

**Step 1: Add shimmer loading state**

Before cards load, show 3 shimmer placeholder cards (dark rectangles with animated gradient sweep). Remove once data loads.

**Step 2: Add empty state**

If a category filter returns zero cards, show: "Nothing in [Category] right now. That is a good sign." centered, grey text.

**Step 3: Add scroll-to-top button**

Small purple circle button, appears after scrolling past hero, smooth scrolls to top.

**Step 4: Add favicon**

Create a simple inline SVG favicon — purple circle with "B" in white (for Brief).

**Step 5: Add meta tags**

Open Graph tags for social sharing:
- `og:title` — "The AI Insider Brief"
- `og:description` — "The AI brief for business owners who do not have time for noise"
- `og:image` — TBD (create a social card later)
- `twitter:card` — summary_large_image

**Step 6: Test responsive**

Test at 375px (iPhone), 768px (iPad), 1440px (desktop). Fix any overflow, touch target, or readability issues.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add shimmer loading, empty states, scroll-to-top, meta tags"
```

---

## Phase 2: Content Pipeline — The Intelligence Engine

### Task 6: Source list and crawl configuration

**Files:**
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\pipeline\sources.json`
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\pipeline\config.env`

**Step 1: Define the source list**

Create `sources.json` with 20-30 curated sources grouped by category affinity:

```json
{
  "sources": [
    {
      "url": "https://techcrunch.com/category/artificial-intelligence/feed/",
      "type": "rss",
      "category_affinity": ["Tools", "Breaking", "Trends"],
      "priority": "high"
    },
    {
      "url": "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml",
      "type": "rss",
      "category_affinity": ["Tools", "Breaking"],
      "priority": "high"
    }
  ]
}
```

Include sources across:
- AI news (TechCrunch AI, The Verge AI, Ars Technica, MIT Tech Review)
- Privacy/policy (EFF, IAPP, GDPR enforcement tracker)
- Vendor blogs (OpenAI, Anthropic, Google AI, Microsoft AI)
- Business impact (HBR, McKinsey AI, Forrester)
- Industry-specific (BoF for fashion, consulting.us, retail dive)

**Step 2: Create config.env**

```
TELEGRAM_BOT_TOKEN=<from C:\Secrets\>
TELEGRAM_CHAT_ID=<user chat id>
LLM_PROVIDER=ollama
LLM_MODEL=llama3.2
OLLAMA_URL=http://localhost:11434
CRAWL_INTERVAL_HOURS=6
MAX_CARDS_PER_DAY=5
BRIEFS_JSON_PATH=/var/www/ai-insider-brief/data/briefs.json
```

**Step 3: Commit**

```bash
git add pipeline/
git commit -m "feat: add source list and pipeline configuration"
```

---

### Task 7: Crawler module

**Files:**
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\pipeline\crawler.mjs`

**Step 1: Build the crawler**

Node.js ESM module (matches existing research-bot pattern). Functions:

- `async function crawlSources(sources)` — iterates source list, fetches RSS feeds and web pages
- `async function fetchRSS(url)` — parse RSS/Atom XML, extract title + link + published date + summary for items from last 24h
- `async function fetchPage(url)` — use `fetch` or a lightweight scraper to get article text (similar to research-bot's article extractor via Jina Reader API)
- `async function deduplicateItems(items, existingBriefs)` — check against existing card headlines/URLs to avoid duplicates
- Returns array of raw items: `{ title, url, content, source, publishedAt }`

Use the same patterns as `C:\Users\fatih\.claude\builds\research-bot\extractors\article.mjs` for content extraction.

**Step 2: Test with 3 sources**

Run crawler manually against 3 RSS feeds. Verify it returns structured items.

**Step 3: Commit**

```bash
git add pipeline/crawler.mjs
git commit -m "feat: add multi-source crawler module"
```

---

### Task 8: Synthesizer module — the brain

**Files:**
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\pipeline\synthesizer.mjs`
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\pipeline\prompts.mjs`

**Step 1: Build the classification and synthesis prompts**

`prompts.mjs` exports two prompt templates:

**Filter prompt** — given a raw item, decide: BRIEF or DISCARD. Most items get discarded. Only brief items that directly affect how a woman business owner runs her company.

**Synthesis prompt** — given a raw item that passed the filter, produce:
- `category`: one of the 8 categories (with rules from design doc)
- `headline`: one punchy line, practitioner voice, no clickbait
- `narrative`: 2-3 sentences — what happened + why it matters for her business
- `verdict`: ACT / WATCH / IGNORE
- `verdict_text`: one sentence — what to do about it

Voice rules embedded in prompt:
- Non-contracted English
- No banned phrases
- No herald sentences
- Plain language, no jargon
- Practitioner tone

**Step 2: Build the synthesizer**

`synthesizer.mjs` functions:

- `async function filterItem(item)` — sends item + filter prompt to LLM, returns boolean
- `async function synthesizeCard(item)` — sends item + synthesis prompt to LLM, returns card object
- `async function callLLM(prompt)` — abstraction that supports both Ollama (local) and Claude API, configured via env var
- `function validateCard(card)` — checks all required fields present, headline < 100 chars, narrative < 300 chars, verdict is valid enum

Uses Ollama API (`POST /api/generate`) for local or Anthropic API for Claude. Same provider-agnostic pattern.

**Step 3: Test with sample items**

Feed 5 raw items through the pipeline. Verify cards are well-formed and voice is correct.

**Step 4: Commit**

```bash
git add pipeline/synthesizer.mjs pipeline/prompts.mjs
git commit -m "feat: add AI synthesizer with filter, classification, and voice prompts"
```

---

### Task 9: Telegram approval bot

**Files:**
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\pipeline\approval-bot.mjs`
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\pipeline\telegram.mjs`

**Step 1: Build Telegram helpers**

Copy and adapt `C:\Users\fatih\.claude\builds\research-bot\telegram.mjs` — same pattern:
- `sendMessage(chatId, text, options)` — with HTML parse mode
- `sendMessageWithButtons(chatId, text, buttons)` — inline keyboard
- `getUpdates(offset)` — long polling
- `answerCallbackQuery(queryId)`

**Step 2: Build the approval flow**

When a new card is synthesized, send to Telegram:

```
📌 PRIVACY

Google quietly changed Gemini's free-tier data policy

Your free Gemini conversations now train Google's models. If you or your
team use the free tier for client work, your client data is feeding
their AI. That is a liability you did not sign up for.

🟢 ACT: Upgrade to paid or switch to Claude for anything client-related.

[APPROVE] [EDIT] [REJECT]
```

Button handlers:
- **APPROVE** — card gets added to briefs.json, confirmation sent
- **EDIT** — bot asks for edited text, user sends correction, card updates, re-sends for approval
- **REJECT** — card discarded, confirmation sent

Same polling pattern as carousel approval bot (`C:\Users\fatih\.claude\builds\carousel-agent\approval-bot.mjs`).

**Step 3: Test approval flow**

Send a test card to Telegram. Verify APPROVE adds to JSON, EDIT allows correction, REJECT discards.

**Step 4: Commit**

```bash
git add pipeline/approval-bot.mjs pipeline/telegram.mjs
git commit -m "feat: add Telegram approval bot for intelligence cards"
```

---

### Task 10: Pipeline orchestrator

**Files:**
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\pipeline\run.mjs`

**Step 1: Build the main orchestrator**

This is the entry point. Runs the full pipeline:

```javascript
// 1. Load config and existing briefs
// 2. Crawl all sources
// 3. Deduplicate against existing cards
// 4. Filter: LLM decides BRIEF or DISCARD for each item
// 5. Synthesize: LLM writes card for each BRIEF item
// 6. Cap at MAX_CARDS_PER_DAY
// 7. Send each card to Telegram for approval
// 8. Log results (crawled: X, filtered: Y, briefed: Z, pending approval: W)
```

- Load `.env` config
- Call crawler
- For each raw item: filter → synthesize → validate → queue for approval
- Log summary to console
- Exit (approval bot runs separately as persistent process)

**Step 2: Build the publisher**

After approval in the bot, add card to `briefs.json`:
- Read existing file
- Prepend new card (newest first)
- Write file
- If hosting on VPS with nginx, the static file is immediately live

**Step 3: End-to-end test**

Run `node pipeline/run.mjs` manually. Verify:
- Sources are crawled
- Items are filtered (most discarded)
- Cards are synthesized with correct format
- Telegram messages arrive with buttons
- Approve → card appears in briefs.json
- Frontend page shows new card on refresh

**Step 4: Commit**

```bash
git add pipeline/run.mjs
git commit -m "feat: add pipeline orchestrator — crawl, filter, synthesize, approve, publish"
```

---

### Task 11: VPS deployment

**Files:**
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\deploy.sh`
- Create: `C:\Users\fatih\.claude\builds\ai-insider-brief\pipeline\crontab.txt`

**Step 1: Create deployment script**

Script that:
- SCPs frontend files to VPS (`/var/www/ai-insider-brief/`)
- SCPs pipeline files to VPS (`/root/ai-insider-brief-pipeline/`)
- Sets up nginx config for the static site (new subdomain or path)
- Installs Node.js dependencies on VPS
- Creates `.env` on VPS from template
- Sets up cron for pipeline runs
- Starts approval bot as persistent process (pm2 or systemd)

**Step 2: Create cron schedule**

```
# Run pipeline every 6 hours
0 */6 * * * cd /root/ai-insider-brief-pipeline && node run.mjs >> /var/log/ai-insider-brief.log 2>&1
```

**Step 3: Create systemd service for approval bot**

The approval bot runs 24/7 (same as carousel approval bot):

```
[Unit]
Description=AI Insider Brief Approval Bot
After=network.target

[Service]
ExecStart=/usr/bin/node /root/ai-insider-brief-pipeline/approval-bot.mjs
WorkingDirectory=/root/ai-insider-brief-pipeline
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Step 4: Create nginx config**

Static file serving for the frontend:

```nginx
server {
    listen 80;
    server_name brief.shiftandlead.com;
    root /var/www/ai-insider-brief;
    index index.html;

    location /data/ {
        add_header Cache-Control "no-cache";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

The `data/` directory has no-cache headers so the feed always shows latest cards.

**Step 5: Test deployment**

Deploy to VPS. Verify:
- Page loads at the configured URL
- Cards render from JSON
- Pipeline cron runs
- Approval bot receives cards
- Approved cards appear on the live page

**Step 6: Commit**

```bash
git add deploy.sh pipeline/crontab.txt
git commit -m "feat: add VPS deployment script, cron, nginx config, systemd service"
```

---

## Phase 3: Content Seeding

### Task 12: Write the first 20 intelligence cards

**Files:**
- Modify: `C:\Users\fatih\.claude\builds\ai-insider-brief\data\briefs.json`

**Step 1: Curate and write 20 real intelligence cards**

Before launch, the page needs real content — not sample data. Write 20 cards covering the last 5 days of actual AI news, filtered through the ICP lens. Distribution:

- 3 Breaking
- 4 Tools
- 3 Privacy
- 3 Strategy
- 2 Teams
- 2 Trends
- 1 Industry
- 2 Noise Filter

Each card must follow the three-layer format (what happened, why you care, what to do) and pass the voice guardrails.

**Step 2: Review and commit**

```bash
git add data/briefs.json
git commit -m "content: seed first 20 intelligence cards for launch"
```

---

## Execution Order

| Phase | Tasks | Dependencies |
|-------|-------|-------------|
| Phase 1: Frontend | Tasks 1-5 | None — can start immediately |
| Phase 2: Pipeline | Tasks 6-11 | Task 1 (needs data model) |
| Phase 3: Content | Task 12 | Task 5 (needs working frontend to verify) |

**Phase 1 and Phase 2 (Tasks 6-10) can run in parallel** after Task 1 establishes the data model. Task 11 (deployment) needs both phases complete. Task 12 is the final step before launch.

---

## File Tree (final state)

```
ai-insider-brief/
├── index.html              # Main page
├── styles.css              # Dark premium stylesheet
├── app.js                  # Feed rendering, filtering, particles
├── data/
│   └── briefs.json         # Intelligence cards (source of truth)
├── pipeline/
│   ├── run.mjs             # Pipeline orchestrator
│   ├── crawler.mjs         # Multi-source crawler
│   ├── synthesizer.mjs     # AI filter + synthesis
│   ├── prompts.mjs         # LLM prompt templates
│   ├── approval-bot.mjs    # Telegram approval flow
│   ├── telegram.mjs        # Telegram API helpers
│   ├── sources.json        # Curated source list
│   ├── config.env          # Pipeline configuration
│   └── crontab.txt         # Cron schedule
├── deploy.sh               # VPS deployment script
└── DESIGN.md               # Design document
```
