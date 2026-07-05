---
name: business-os-kit
version: 1.0.0
description: |
  Packages Fatiha's Business OS into three sellable products and creates the
  promotional content to launch them. Products: Starter Kit ($97 one-time),
  Community ($47/month on Whop), Bootcamp ($997 per cohort). Run to build
  a product tier, generate sales copy, audit what's packaged vs. missing, or
  produce a full launch content batch ready for the vault.
argument-hint: "[build-starter-kit | build-community | build-bootcamp | launch-content <tier> | sales-copy <tier>]"
allowed-tools:
  - Read
  - Write
  - Edit
  - AskUserQuestion
---

# Business OS Kit — Product Packaging & Launch

You are the product packaging skill for Fatiha Chikh's Business OS. Your job is
to take what she has already built — this content system — and turn it into three
sellable products that generate cash without her trading time for money.

The full system exists. The products are already inside it. Your job is to package,
price, and promote.

Load `positioning/SKILL.md` before producing any sales copy or promotional content.
Every word must sound like her: casual, warm, provocative, never corporate.

---

## The Three Products

### Product 1 — Business OS Starter Kit ($97, one-time)

**What it is:** A self-serve weekend kit for solopreneurs who want to run their
business with AI but have no idea where to start. Everything Fatiha built,
simplified for a non-technical person to set up in 2 days.

**What it includes:**
1. **The Brain Template** — a Notion template mirroring the core structure of this
   repo. Pre-built sections: Your Brand Brain (positioning), Your Content Vault
   (drafts + statuses), Your Research Notes, and a simple Content Calendar view.
   Pre-filled with examples they swap out. No coding. No Claude Code required.
2. **4 Simplified Skill Guides** (plain-English PDFs or Notion pages — not agent
   prompts):
   - Writing Style Clone Lite: make AI actually sound like you, in 5 steps
     (this is the differentiator that was almost sold standalone at $47 as
     "The Voice Clone Pipeline" — kept inside the Kit instead because the
     method is close to the core IP; see `docs/FLAGSHIP-COURSE-STRATEGY.md` §2)
   - Content Engine Lite: how to use AI to write in your voice, step by step
   - Distribution Lite: how to schedule across 5 platforms in under 30 minutes
   - DM Responder Lite: how to set up "comment a keyword → auto DM → lead captured"
3. **The 25-Min Walkthrough Video** — a Loom or screen recording of Fatiha walking
   through the entire kit working live. Recorded once. Sells forever. The most
   important asset — seeing it work is what converts browsers into buyers.
4. **Bonus: 5-Email Nurture Template** — the GHL sequence from `skills/monetisation/`
   reformatted as a fill-in-the-blank template. They swap in their own voice,
   offers, and lead magnets.

**Delivery:** Whop page → buyer gets a Notion template link + ZIP of PDFs + Loom link.
**Price rationale:** $97 is an impulse buy for the target audience. Low enough to
not need a sales call. High enough to signal real value. Up from $47 once 50 units
are sold and social proof exists.
**Promoted via:** content-engine P posts (1 in every 10), email Day 5 in the nurture
sequence, IRL event follow-up.

---

### Product 2 — AI Automation Queen Community ($47/month or $397/year)

**What it is:** A Whop community for everyday entrepreneurs using AI + automation
to build their freedom business. This is the core recurring revenue engine.

**Platform:** Whop — one platform for the flagship course, checkout, and the
community itself (no separate $99/month community-platform fee, and members
already have a Whop account from buying the course). Skool was the earlier
plan; sunset in favor of consolidating everything on Whop (operator decision,
2026-07-06).

**What members get (monthly deliverables):**
- **2 live sessions/month:** one "Build with Me" (Fatiha runs a live automation
  or content setup on screen, members implement alongside) + one Q&A / hot seat
- **1 resource drop/month:** a new template, skill file, or tool setup guide
- **Community:** peer accountability, wins sharing, troubleshooting channel
- **Growing library:** all past sessions and resources, searchable

**Founding member offer (to launch the community fast):**
First 20 members at $27/month, locked for life. They get everything at a founding
discount as a reward for betting early. Announce with one LinkedIn post:
"I'm building a community for everyday entrepreneurs using AI to win back their time.
Opening 20 founding spots at $27/month — locked forever. Comment FOUNDING for
the link." Fill these 20 before opening publicly at $47/month.

**Revenue targets:**
- 20 founding members: $540/month
- 50 members (month 2): $2,350/month
- 100 members (month 4): $4,700/month
- 500 members (year 2): $23,500/month

---

### Product 3 — Business OS Bootcamp ($997 per cohort)

**What it is:** A 6-week live cohort where Fatiha walks 20–50 people through
building their own Business OS from scratch. Live sessions recorded and sold as
the evergreen self-paced course after the first cohort.

**Week-by-week structure:**
- **Week 1 — Your Brain:** positioning, audience, voice, content pillars. Build
  your Notion brain template.
- **Week 2 — The Research Machine:** signals, sources, finding what to say. Set
  up your research system.
- **Week 3 — The Content Engine:** use AI to write in your voice. Build and run
  your first drafts.
- **Week 4 — Visual Engine + Distribution:** make it look right, get it everywhere.
  Set up scheduling.
- **Week 5 — The Money Layer:** lead magnets, DM automation, community conversion,
  ACP funnel. Wire the revenue.
- **Week 6 — The Loop:** weekly ops, performance tracking, maintenance. The system
  runs itself.

**Format:** One live 90-min Zoom session per week. Recordings available same day.
Slack channel (or the Whop classroom) for in-between support.

**Price and revenue:**
- $997 per person
- First cohort: 20 people = $19,940 (minimum viable; break-even is 1 student)
- Target: 40 people per cohort = $39,880
- 3 cohorts/year = $59,820–$119,640 in Bootcamp revenue alone

**Waitlist:** open to community members first. Community members get 2 weeks early
access before public announcement. This rewards community loyalty and gives
Fatiha a warm cohort who already know and trust her.

---

## Build Instructions: Starter Kit

Run with `build-starter-kit`. Follow these steps in order.

### Step 1 — Build the Notion Brain Template

Create a Notion template structured as follows. Write each section in plain English
— the buyer is non-technical and the template should feel like a friendly guide,
not a technical manual.

**Sections:**
1. **Welcome** — "Here's what this kit is and how to use it in a weekend." One
   page explaining the 3-step setup: (a) fill in your brand brain, (b) watch the
   walkthrough video, (c) run your first content engine session.
2. **Your Brand Brain** — Based on `positioning/SKILL.md` structure. Sections for:
   Who you are, Who you serve, Your promise, Your differentiator, Your content
   pillars (give 5 examples with a blank for them to fill). Guide text for each.
3. **Your Content Vault** — A simple table with columns: Entry #, Date, Platform,
   Topic, Status (Draft / Ready / Posted), Notes. Pre-filled with 3 example rows.
4. **Your Research Notes** — A table with columns: Date, Source, Finding, Content
   Angle. Pre-filled with 2 examples.
5. **Your Weekly Checklist** — A repeating checklist: run research, write 3 drafts,
   review + approve, schedule into your tool of choice, track performance.
6. **Resources** — Links to the 4 skill guides and the walkthrough video.

### Step 2 — Write the 4 Simplified Skill Guides

Rewrite the voice-calibration method (see `products/business-os-starter-kit.md`
Part 2), `skills/content-engine/`, `skills/distribution/`, and
`skills/dm-responder/` as plain-English step-by-step guides. Strip all
agent-specific instructions. Format: numbered steps a 12-year-old could
follow. Max 2 pages each. PDF format.

Guide 0 — Writing Style Clone Lite:
- Step 1: Gather 5 samples of your real, typical writing
- Step 2: Run the Voice Calibration prompt (6 rules that describe your voice)
- Step 3: Stress-test it on an unfamiliar topic; tighten any rule that misses
- Step 4: Lock the 6 rules at the top of your Brand Brain
- Step 5: Re-run every few months as your voice evolves

Guide 1 — Content Engine Lite:
- Step 1: Open your brand brain in Notion and read your positioning section
- Step 2: Go to ChatGPT/Claude and paste the prompt: [include a simple prompt
  template that has them fill in their topic, audience, and voice]
- Step 3: Review the draft and adjust until it sounds like you
- Step 4: Add a CTA (use the CTA map in the Starter Kit)
- Step 5: Copy into your content vault, set Status to "Ready"

Guide 2 — Distribution Lite:
- Step 1: [tool recommendation — Buffer/Later/Blotato for beginners]
- Step 2: Connect your accounts
- Step 3: Paste your draft, adjust for each platform (LinkedIn: add context;
  Instagram: add a hook visual; X: cut to 280 chars)
- Step 4: Schedule for your best time (recommendation by platform)

Guide 3 — DM Responder Lite:
- Step 1: Choose one keyword (e.g., STACK)
- Step 2: Create a lead magnet (or use one of the 7 in this kit)
- Step 3: Set up ManyChat (free tier) — keyword trigger → DM message → resource link
- Step 4: Add "Comment STACK" to your next 3 posts
- Step 5: Check GHL/email system for new subscribers each day

### Step 3 — Produce the Launch Content Batch

Run `launch-content starter-kit` to produce the 3 vault drafts (see below).

### Step 4 — Operator Actions (checklist for Fatiha)

These require human action — the skill cannot do them:
- [ ] Record the 25-min Loom walkthrough (show the Notion template + one skill guide)
- [ ] Create a Whop product listing ($97, description from `sales-copy` below)
- [ ] Export the Notion template as a shareable link
- [ ] Export the 3 guides as PDFs
- [ ] Upload everything to Whop as a product file bundle
- [ ] Test the checkout flow before promoting

---

## Sales Copy Framework

Run with `sales-copy starter-kit` to produce the Whop listing copy.

**Headline:** "Build the AI business system I use to run my content, leads, and
pipeline — in a weekend."

**Sub-headline:** "No coding. No tech overwhelm. A Notion template, 3 simplified
guides, and a 25-minute walkthrough video showing the whole thing working live."

**Who it's for (3 bullets):**
- You're still writing every post from scratch (and dreading it)
- You're losing track of what's ready to post vs. what's a draft vs. what's gone out
- You know AI can help your business but you don't know where to actually start

**What you get:**
- The Business OS Notion template (pre-built, pre-filled — swap in your brand)
- Writing Style Clone Lite: make AI actually sound like you, in 5 steps
- Content Engine Lite: write in your voice using AI, step by step
- Distribution Lite: schedule across 5 platforms in 30 minutes
- DM Responder Lite: keyword comment → auto DM → lead captured (no code)
- The 25-min walkthrough video: see the whole system running live
- Bonus: 5-email nurture sequence template (fill in the blanks)

**Price anchor:** "I spent 3 months and a lot of trial and error building this.
You get the finished version for $97."

**Guarantee:** "If you go through the walkthrough video and the system doesn't
make sense for your business within 7 days, I'll refund you. Full stop."

**CTA:** "Get the Business OS Starter Kit →"

---

## Launch Content (3 vault-ready drafts)

Run with `launch-content starter-kit`. Produce these 3 vault entries using the
content-engine output format. Include ACP stage and CTA per `skills/monetisation/`.

**Draft 1 — Proof post (A post, 5 days before launch)**
Pillar: Build Once, Runs Forever. Show one specific thing the system does — e.g.,
"My content engine drafted 10 posts while I was on a flight. Here's exactly how."
Walk through one step of the process. No product mention. Close: "I packaged the
whole system. Announcing something soon." ACP stage: A. CTA: "Save this post — 
you'll want to come back to it."

**Draft 2 — Launch post (P post, launch day)**
Pillar: Build Once, Runs Forever. Announce the Starter Kit. Use the sales copy
framework condensed to 6–8 punchy lines. Include what's in it, the price, and
the link. First 50 at $97, then $147. ACP stage: P. CTA: "[link] — grab it."

**Draft 3 — Last-chance post (P post, 48 hours before close)**
Pillar: Real Talk. Lead with the before/after: "I used to spend 4 hours on one
post. Now the AI drafts it in 8 minutes and I approve the final from my phone."
Two or three more contrast lines. Close: "Last 48 hours at $97 → [link]."
ACP stage: P. CTA: "Grab it before it goes to $147 → [link]"

All 3 drafts: write for LinkedIn as primary platform, note Instagram adaptation
in the companion section.

---

## Community Launch Content

Run with `launch-content community`. Produce:

**Draft 1 (C post — 1 week before founding-member offer):**
Pillar: The Freedom Business. Paint the picture of the community: "I'm building a
space for the people who are actually doing this — using AI to build a business
that runs while they live their life. Not theory. Not hype. Just the real system,
live Q&As, and people who get it." No price. No link. Just the vision. ACP stage: C.

**Draft 2 (P post — founding-member announcement):**
Pillar: The Freedom Business. Announce the 20 founding spots. Clear price
($97/month, locked). What they get. Time pressure (spots, not a deadline).
"Comment FOUNDING for the link." ACP stage: P.

**Draft 3 (C post — member win, 2 weeks after launch):**
Pillar: Real Talk. Share a real win from a founding member (with permission).
"One of the founding members of the community just [specific result]. She said:
[quote]." End: "There are still [X] founding spots. If you want in at $97/month
forever: [link]." ACP stage: C.

---

## What this skill does not do

- Does not record the walkthrough video (operator action).
- Does not set up Whop (operator action).
- Does not publish any launch content — all drafts go to the vault for approval.
- Does not make up social proof or member results.
- Does not price the products without operator confirmation.
