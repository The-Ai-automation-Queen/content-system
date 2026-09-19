# Cash Machine Activation Plan

> Created: 30/06/2026
> Goal: go from "everything built, nothing live" to cash flowing in 14 days
> Status: IN PROGRESS

---

## The problem in one line

You have 8 lead magnets written, 16 content pieces (11 READY TO POST), 6 offer
tiers designed, a full skill library, and zero dollars flowing through any of it.
Your personal brain is empty so the content engine writes generic. The
distribution pipeline has never fired. The DM responder has no URLs to send.

---

## Phase 1: SEED THE BRAIN (Day 1 — 30 min)

**Why first:** every piece of content the engine writes pulls from
`personal-brain.md`. It's empty. Until it's populated, everything sounds like
generic AI advice instead of Fatiha's actual life, opinions, and numbers.

- [ ] Run `/brain-manager seed` — answer the 15-20 questions about your life,
  projects, opinions, numbers, current focus
- [ ] Review what it wrote in `personal-brain.md`, add anything it missed
- [ ] From now on: run brain-manager daily (evening, 5 min) — the cron is
  designed for 20:00

**You do this.** I can't answer your personal questions for you.

---

## Phase 2: LIGHT UP THE LEAD MAGNETS (Days 1-2 — 2-3 hours)

This is the single fastest path to revenue infrastructure. 8 resources are
written. They just need a public URL.

### Quick path (30 min — do this TODAY)

- [x] Pick 3 lead magnets to activate first: (done, confirmed 19/09/2026, UNB-009/011/012)
  1. **TEAM** — "How to Set Up Your First AI Employee" (highest overlap with your
     audience + Alicia Lyttle's viral topic)
  2. **STACK** — "The 3-Tool AI Stack I Actually Use" (easy win, curiosity-driven)
  3. **PROMPT** — "What Is a Prompt and How to Write One That Works" (beginner
     magnet, huge TAM)
- [ ] For each one, choose a hosting path:

  **Option A — GHL (best, captures email + runs nurture):**
  1. GHL → Sites → Funnels → New page
  2. Paste the `.md` content as page body
  3. Add email opt-in field at the top
  4. On submit → tag the lead (`lm-team`, `lm-stack`, `lm-prompt`)
  5. Trigger your existing GHL nurture workflow
  6. Copy the page URL

  **Option B — Google Doc (fastest, upgrade later):**
  1. Paste the `.md` into a Google Doc
  2. Set sharing to "anyone with the link"
  3. Copy the URL
  4. (You lose email capture — upgrade to GHL within a week)

- [x] Update `lead-magnets.csv` with the live URLs and set `active=yes` (done, confirmed 19/09/2026, UNB-009/011/012 — TEAM/STACK/PROMPT rows all `active=yes` with live URLs)

### I can do right now:
- [ ] Create `lead-magnets.csv` with all 8 rows (URLs blank, ready for you to fill)

---

## Phase 3: POST THE CONTENT (Days 2-3)

You have **11 pieces at READY TO POST** sitting in the vault doing nothing.

- [ ] Log into Blotato dashboard
- [ ] Pick 5 of the READY TO POST pieces (start with the LinkedIn ones — that's
  where your bridge audience lives)
- [ ] Schedule them across the next 5 days (1/day)
- [ ] For each one that has a comment-CTA keyword (TEAM, STACK, etc.), make sure
  that keyword's lead magnet URL is live (Phase 2)
- [ ] After posting, come back and I'll update their status to POSTED in the vault

**Or** run the `distribution` skill to queue them through Blotato automatically
(needs Blotato media egress allowlisted — check if `database.blotato.io` is
unblocked in your environment).

---

## Phase 4: WIRE THE DM MACHINE (Days 3-4 — 1-2 hours)

This turns comments into leads automatically. No more manual DMs.

### Instagram (GHL — you already have it)

- [ ] Connect IG `@thefatihachikh` to GHL: Settings → Integrations →
  Facebook/Instagram
- [ ] For each active keyword in `lead-magnets.csv`, build one GHL workflow:
  - Trigger: IG comment contains `TEAM` (case-insensitive)
  - Action: send IG DM with the resource link in her voice
  - Action: tag contact `lm-team`
  - Action: add to nurture sequence
- [ ] Test with a comment from a second account

### LinkedIn (manual for now, Unipile later)

- [ ] LinkedIn doesn't support automated DMs natively
- [ ] For now: manually DM anyone who comments the keyword
- [ ] Later: wire Unipile (`UNIPILE_API_KEY` + `UNIPILE_DSN`) for auto-DMs

---

## Phase 5: ACTIVATE OFFER TIER 1-2 (Days 5-7)

With lead magnets flowing and content posting, you need something to SELL.

### Tier 1: AI Time Audit Template — $47

- [ ] I build the template content (a structured worksheet/checklist that helps
  someone audit where they waste time and pick their first AI employee)
- [ ] You host it on Gumroad (15 min setup)
- [ ] Add the Gumroad link to your GHL nurture email sequence (email 3 or 4:
  "Ready to go deeper? Here's the tool I use with my clients")

### Tier 2: Business OS Starter Kit — $97

- [ ] Run `business-os-kit` skill to generate the kit content
- [ ] Package as a Gumroad product (PDF bundle or Notion template)
- [ ] Add to nurture sequence as the next-step offer

### Tier 5: Corporate Speaking — $5-15K (parallel track)

- [ ] I build your speaker one-sheet / media kit using the Manus prompt trick
  (or Gamma right now since we have it connected)
- [ ] You send it to 10 warm LinkedIn contacts this week
- [ ] This is your highest-ticket, lowest-volume play — one booking pays for
  months of the content operation

---

## Phase 6: BUILD THE COMMUNITY (Days 7-10)

### Tier 3: Skool Community — $47/month (launch at $27 founding price)

- [ ] Set up the Skool group: "AI Automation Queen Community"
- [ ] Seed with 3-5 pieces of value content (repurpose from your lead magnets)
- [ ] Announce founding member spots in your next 3 LinkedIn posts
- [ ] Add community CTA to GHL nurture sequence (email 5-6)
- [ ] Goal: 20 founding members at $27/month = $540/month recurring (proof of
  concept, not the end game)

---

## Phase 7: DAILY MACHINE LOOP (Day 10+)

Once Phases 1-6 are live, the daily loop keeps it running:

```
20:00  brain-manager     → personal-brain.md updated with today's life
02:00  signal-harvester  → research-notes.md fed with fresh signals
02:30  content-engine    → 5 new drafts in vault (in voice, critic-scored)
03:00  performance-tracker → engagement data back into the system
       distribution      → READY TO POST pieces queued in Blotato
       dm-responder      → keywords caught, leads captured, DMs sent
```

For this to run unattended, you need:
- [ ] A VPS or scheduled Claude web sessions for the crons
- [ ] Brain Manager Telegram bot (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`)
- [ ] Signal source keys (Apify, Tavily — already partially working)
- [ ] Blotato media egress allowlisted

---

## Phase 8: PROSPECTING AGENT (Day 10-14)

The Alicia Lyttle play you're missing — a daily AI briefing on business
development opportunities.

- [ ] I build a `prospecting` skill that runs daily and delivers via Telegram:
  - 10 events/meetups happening in Dubai this week relevant to your niche
  - 5 LinkedIn profiles to engage with (warm leads, potential speaking clients)
  - 3 content collaboration opportunities
  - Corporate training RFP alerts
- [ ] Add to the daily cron after performance-tracker

---

## What I can do RIGHT NOW in this session

| # | Action | Time |
|---|---|---|
| 1 | Create `lead-magnets.csv` with all 8 rows ready for URLs | 5 min |
| 2 | Build your speaker media kit / one-sheet using Gamma | 15 min |
| 3 | Build the AI Time Audit Template (Tier 1, $47 product) | 20 min |
| 4 | Create the `prospecting` skill scaffold | 15 min |
| 5 | Run brain-manager seed (needs your answers) | 10 min |

---

## What ONLY YOU can do

| # | Action | Time |
|---|---|---|
| 1 | Answer brain-manager seed questions | 30 min |
| 2 | Host lead magnets on GHL (or Google Docs) | 1-2 hrs |
| 3 | Connect IG to GHL + build keyword workflows | 1 hr |
| 4 | Post content to Blotato / schedule | 30 min |
| 5 | Set up Gumroad products (Tier 1 + 2) | 1 hr |
| 6 | Set up Skool community | 1 hr |
| 7 | Send speaker one-sheet to 10 LinkedIn contacts | 30 min |
| 8 | Set up VPS/crons for daily loop | 2 hrs |

---

## Revenue targets (conservative)

| Timeframe | Source | Monthly |
|---|---|---|
| Week 2 | Lead magnets flowing → nurture → Tier 1 ($47) × 10 sales | $470 |
| Week 4 | Add Tier 2 ($97) × 5 sales + Tier 1 continuing | $955 |
| Month 2 | Community (20 members × $27) + products | $1,500 |
| Month 3 | Community (50 members × $47) + 1 speaking gig ($7,500) | $9,850 |
| Month 6 | Community (200 × $47) + products + speaking | $15,000+ |

The math works. The system is built. The only thing missing is the "go" button.
