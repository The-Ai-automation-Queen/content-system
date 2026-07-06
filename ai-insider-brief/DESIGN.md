# The AI Insider Brief — Design Document
*Date: 11/04/2026*

---

## Overview

A dark premium intelligence dashboard — inspired by narratives.now — that delivers curated AI intelligence for women business owners. Automated content pipeline powered by open-source agents, Telegram approval flow, and self-hosted infrastructure.

**Name:** The AI Insider Brief
**Tagline:** The AI brief for business owners who do not have time for noise
**Brand:** Fatiha Chikh / Shift & Lead
**URL:** TBD (subdomain of shiftandlead.com or standalone)

---

## Design Direction

### Visual Identity
- **Mode:** Dark premium — contrasts with the warm editorial of content/carousels
- **Background:** `#0d0d0d` (near-black)
- **Text:** `#ffffff` (white)
- **Subtext:** `#8a8a8a` (muted grey)
- **Dividers:** `#2a2a2a` (dark grey)
- **Accent:** `#6B35C2` (brand purple — used for category badges, hover states, CTA)
- **Breaking indicator:** Pulsing purple glow (not orange — stays on-brand)
- **Positive/action signals:** `#22C55E` (green)
- **Ignore/noise signals:** `#8a8a8a` (grey)
- **Title font:** Georgia Italic (same as brand)
- **Body font:** Georgia
- **UI/labels font:** Arial

### Animations (inspired by narratives.now)
- Floating particle effects in hero background (subtle, purple-tinted)
- Pulsing glow on Breaking cards
- Shimmer loading state for incoming cards
- Smooth fade-in on scroll for card entries
- Hover lift effect on cards (subtle shadow + translate)
- Horizontal scroll momentum on category bar

---

## Page Structure (top to bottom)

### 1. Header
- Logo: "The AI Insider Brief" in Georgia Italic
- Right side: "Subscribe" button (email capture) + "By Fatiha Chikh"
- Sticky on scroll

### 2. Hero Section
- **Headline:** "AI moves fast. You move faster."
- **Subline:** "The AI brief for business owners who do not have time for noise"
- **Email capture:** Single input field + "Get the brief" button
- **Background:** Floating particle animation (purple-tinted, subtle)
- **No signature line in hero** — the tagline IS the positioning

### 3. Category Bar
- Horizontal scrollable bar (sticky below header on scroll)
- Categories with pill-style buttons:
  - Breaking (with pulse dot when active)
  - Tools
  - Privacy
  - Strategy
  - Teams
  - Trends
  - Industry
  - Noise Filter
- "All" selected by default
- Active state: purple background, white text
- Inactive state: transparent, grey text

### 4. Intelligence Feed
- Reverse chronological card layout
- Single column, full-width cards (not a grid — readability first)
- Cards are the core content unit (see Card Structure below)
- Infinite scroll or "Load more" at bottom
- Date separators between days: "Today" / "Yesterday" / "09/04/2026"

### 5. Footer
- "Fatiha Chikh · Shift & Lead"
- Social links (LinkedIn, Instagram, X)
- Newsletter signup repeat
- "Formerly Dell · Intel · Microsoft" — here it works as a trust footer, not a signature

---

## Card Structure

Each intelligence card contains exactly 6 elements:

```
┌─────────────────────────────────────────────────┐
│ [CATEGORY BADGE]                    [TIMESTAMP]  │
│                                                  │
│ HEADLINE                                         │
│ One punchy line in Georgia Italic                │
│                                                  │
│ NARRATIVE                                        │
│ What happened. Why it matters for your business. │
│ 2-3 sentences max. Plain language.               │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ VERDICT: ACT / WATCH / IGNORE               │ │
│ │ One sentence — what to do about it           │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│                                        [SHARE]   │
└─────────────────────────────────────────────────┘
```

### Card elements:
1. **Category badge** — colour-coded pill (purple for most, pulsing for Breaking)
2. **Headline** — one line, Georgia Italic, practitioner voice
3. **Narrative** — 2-3 sentences: what happened + why she should care
4. **Verdict bar** — highlighted section with verdict type + action
   - ACT (green) — do something now
   - WATCH (purple) — monitor, not urgent
   - IGNORE (grey) — noise, skip it
5. **Timestamp** — date, DD/MM/YYYY format
6. **Share button** — copies card as shareable link or image

### Card states:
- Default: dark card background (`#1a1a1a`)
- Hover: slight lift + border glow (purple)
- Breaking: subtle pulsing purple border
- Noise Filter cards: slightly dimmed, grey verdict

---

## Categories — Classification Rules

| Category | Trigger | Examples |
|---|---|---|
| Breaking | Major AI release, policy change, acquisition, security incident in last 24h | GPT-5 launch, EU AI Act enforcement, major breach |
| Tools | New tool, major update, pricing change, shutdown | Canva AI video, Jasper price hike, tool comparison |
| Privacy | Data policy change, breach, terms update, fine print | Zoom training clause, Google data retention change |
| Strategy | How AI changes business ops, pricing, competitive dynamics | Service business repricing, content velocity shift |
| Teams | Upskilling, role changes, hiring shifts, workforce impact | Roles to rethink, skills gap analysis |
| Trends | What is coming 3-12 months, emerging patterns, research | Agentic AI predictions, market shifts |
| Industry | Sector-specific: fashion, consulting, retail, health, legal | AI in boutique consulting, retail automation |
| Noise Filter | Overhyped, marketing theatre, safely ignorable | Latest AI wearable, vaporware announcements |

**Rule:** One primary category per card. No multi-tagging.
**Rule:** Most sources get discarded. 3-5 cards per day maximum. Curation is the value.

---

## Content Synthesis — The Three-Layer Card

Every card answers three questions:

1. **What happened?** — one sentence, plain language, no jargon
2. **Why should you care?** — the "so what" for a woman running a business
3. **What should you do?** — one concrete action + verdict (ACT / WATCH / IGNORE)

### Voice rules for the synthesis agent:
- Non-contracted English always
- No banned phrases (see voice.md)
- No herald sentences
- Practitioner tone — not reporter, not blogger
- She is telling you what it means for YOUR business
- Reads like Fatiha wrote it between two client calls

---

## Content Pipeline Architecture

```
Sources (RSS feeds, AI news sites, vendor blogs, policy docs)
    ↓
Crawler Agent (Firecrawl / Crawl4AI — runs every 6 hours)
    ↓
Filter Agent (relevance check — is this worth briefing? Most get discarded)
    ↓
Synthesizer Agent (writes card: headline, narrative, verdict, category)
    ↓
Voice Agent (applies voice guardrails, humanizes)
    ↓
Telegram Approval (same flow as carousel pipeline)
    ↓
Auto-publish to page (JSON → static site rebuild)
```

### Tech stack:
- **Orchestration:** CrewAI or LangGraph (open source)
- **Crawling:** Firecrawl or Crawl4AI
- **LLM:** Ollama + local model on VPS (zero API cost) OR Claude API for quality
- **Approval:** Telegram bot (existing infrastructure)
- **Frontend:** Static HTML/CSS/JS — single page, no framework needed
- **Data:** JSON file — each card is an entry, page reads from it
- **Hosting:** VPS (existing) or Vercel/Netlify for the frontend
- **Scheduling:** Cron on VPS

---

## Email Capture Integration

- Hero section: primary email capture
- Footer: secondary email capture
- Connected to newsletter platform (Beehiiv / ConvertKit — TBD)
- "Get the brief every Sunday" — weekly digest of the best cards
- The page is the daily feed, the newsletter is the weekly summary

---

## Funnel Position

```
The AI Insider Brief (free, daily intelligence)
    ↓
Newsletter subscriber (weekly digest)
    ↓
AI Clarity Challenge ($200-500, front-end offer)
    ↓
Fast Forward signature offer ($1K-2.5K, done-with-you)
    ↓
Corporate workshops ($3K-10K, B2B)
```

The Brief is top-of-funnel. It proves the positioning daily. Every card is a demonstration of insider knowledge that her ICP cannot get anywhere else.

---

## Mobile Design

- Full responsive — her ICP reads on iPhone
- Cards stack vertically (same as desktop, just narrower)
- Category bar: horizontal swipe
- Hero: condensed, email capture prominent
- Share button: native share sheet on mobile
- Touch-friendly card sizes (min 44px touch targets)

---

## What This Is NOT

- Not a blog
- Not a newsletter archive page
- Not a link aggregator
- Not a news site

It is a **curated intelligence feed** from a single trusted source — filtered through 20 years of insider experience, delivered in plain language, with a clear verdict on every item.

---

## Success Metrics

- Email signups from the page
- Share rate per card
- Return visit frequency
- Newsletter open rate (driven by brief quality)
- Pipeline attribution: how many Fast Forward clients came through the Brief
