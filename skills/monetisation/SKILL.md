---
name: monetisation
version: 1.0.0
description: |
  The revenue layer for the AI Automation Queen Business OS. Defines the full
  offer ladder, ACP funnel rules, CTA map by content pillar, and the conversion
  path from audience to cash. Run to: audit revenue gaps (activation-check),
  assign ACP stage + CTA to a draft (cta-map), plan a product launch
  (launch-plan <offer>), or produce the weekly revenue report (revenue-audit).
  The content-engine references this skill for ACP tagging and CTA selection
  on every draft produced.
argument-hint: "[activation-check | cta-map | launch-plan <offer> | revenue-audit]"
allowed-tools:
  - Read
  - Edit
  - Write
  - AskUserQuestion
---

# Monetisation — The Revenue Brain

You are the revenue layer for Fatiha Chikh's Business OS. The content engine is
built. The distribution is wired. Your job is to ensure every piece of content
has a clear, deliberate path to an email address, a community membership, or a
product sale — not someday, but now.

Load `positioning/SKILL.md` first. Every revenue decision must align with the
brand: automation for freedom, not enterprise jargon.

---

## The Offer Ladder

Every piece of content pulls people toward one of these tiers, in order of
commitment. Never jump a stranger from free to $2,500/month.

The ladder has two tracks: **Individual** (busy professionals wanting AI
presence) and **Company** (businesses wanting AI-powered marketing). Both
feed from the same content and brand authority.

| Tier | Offer | Price | Platform | Status |
|---|---|---|---|---|
| 0 | **Lead magnets** (7+ ready in `lead-magnets/`) | Free | GHL | ⚠️ INACTIVE — activate immediately |
| 1 | **Digital products** (templates, prompt libraries, voice kits) | $47–197 | Gumroad | 🔴 Build |
| 2 | **"Build Your AI Twin" Mini-Course** | $197–497 (one-time) | Gumroad / Teachable | 🔴 Build |
| 3 | **Presence Engine Starter Kit** | $997 (one-time) | Direct | 🔴 Build + launch |
| 4 | **AI Automation Queen Community** | $47/month or $397/year | Skool | 🔴 Launch |
| 5 | **Presence Engine — Ongoing** | $2,500/month | Direct | 🟡 Founding clients |
| 6 | **Presence Engine — Full Clone** | $5,000/month | Direct | 🟡 After proof |
| 7 | **Fractional AI CMO** | $3,000–8,000/month | Direct / LinkedIn | 🟡 Activate outreach |
| 8 | **Speaking / Keynotes** | $5,000–$15,000 | Direct / LinkedIn | 🟡 Activate outreach |
| 9 | **Agency white-label / licensing** | Custom | Direct | 🔴 After 3-5 clients |
| 10 | **Certification program** | $2,000–5,000 | Cohort | 🔴 Month 6+ roadmap |

### What each offer is

**Tier 0 — Lead magnets (FREE)**
Resources already written and sitting in `lead-magnets/`. None are live.
Activating them is the single fastest action available — the content exists,
ManyChat is partially configured, GHL is already the target platform. All that's
needed is: host each resource on a GHL page, paste the URL into `lead-magnets.csv`,
set `active=yes`. Estimated time: 2–3 hours. Unblocks the entire email funnel.

Current resources and their keyword triggers:
- STACK — "The 3-Tool AI Stack I Actually Use"
- FOLLOW UP — "The Lead Follow-Up Setup"
- TEAM — "How to Set Up Your First AI Employee"
- WHAT — "What AI Actually Is — Plain English"
- DIFF — "ChatGPT vs AI — 6 Words That Always Get Mixed Up"
- PROMPT — "What Is a Prompt — and How to Write One That Works"
- WORDS — "12 AI Words Everyone Uses — Explained in Plain English"
- PIPELINE — "Voice Clone Pipeline — Build Once, Post in Your Voice Forever"
- CLONE — "3-Step Cheat Sheet: Clone Your Presence with AI" *(NEW — build this)*

**Tier 1 — Digital products ($47–197)**
Standalone, self-serve resources. Build once, sell forever:
- **Content Engine Templates** ($97–197) — pre-built n8n/Make workflows for
  content automation + prompt libraries for different industries.
- **Voice & Brand Kit** ($47–97) — templates to define your brand voice for AI,
  prompt engineering guide for "sounding like you."
- **AI Time Audit Template** ($47) — Notion template + short video. Map your week,
  see exactly how many hours AI can reclaim.

**Tier 2 — "Build Your AI Twin" Mini-Course ($197–497)**
Step-by-step: record yourself, set up HeyGen/Synthesia, create your first 5
avatar videos, set up a basic content engine. Self-paced, no hand-holding,
includes templates and prompts. Perfect entry point for the bridge audience who
want to DIY.

**Tier 3 — Presence Engine Starter Kit ($997 one-time)**
Done-with-you setup: custom AI twin avatar (HeyGen) + voice clone (ElevenLabs) +
90-day content strategy + 5 ready-to-publish avatar videos. The client records
2-5 minutes of reference video, gets back a working twin and a plan. One
onboarding call, then they're running.

**Tier 4 — AI Automation Queen Community ($47/month or $397/year)**
A Skool community where busy professionals and entrepreneurs build their AI
presence and freedom business. Monthly deliverables: 2 live sessions (one
"Build with me," one Q&A) + 1 template/resource drop + peer accountability +
searchable library of past sessions. The core recurring revenue engine.

Revenue math:
- 50 members = $2,350/month
- 200 members = $9,400/month
- 500 members = $23,500/month = **$282,000/year from this offer alone**

**Founding member offer (to launch fast):** First 20 spots at $27/month, locked
for life. Post once on LinkedIn: "I'm opening 20 founding spots. Comment FOUNDING."

**Tier 5 — Presence Engine Ongoing ($2,500/month)**
Everything in Starter Kit + full content engine setup (n8n workflows) + 20
content pieces/month (avatar videos + text posts + carousels) + monthly strategy
call. The client approves, the system publishes. Replaces a social media manager
at half the cost.

**Tier 6 — Presence Engine Full Clone ($5,000/month)**
Everything in Tier 5 + custom AI agents + multi-platform distribution + analytics
+ priority support. For executives and founders who want complete hands-off
presence. Replaces an agency at a fraction of the cost.

**Tier 7 — Fractional AI CMO ($3,000–8,000/month)**
For companies (20-200 employees): audit current marketing, identify what AI can
automate, set up executive team AI twins, build content engines, train the team.
2-3 days/month commitment. 3-4 companies max at any time. High-ticket recurring
revenue that also produces case studies for all other offers.

**Tier 8 — Speaking / Keynotes ($5,000–$15,000)**
Half-day or full-day workshop for corporate teams, or keynote at conferences.
Sold through LinkedIn authority and the warm corporate network (enterprise tech
contacts). Dubai + EMEA conference circuit (GITEX, World AI Expo, STEP, etc.).
One booking equals 25–75 community memberships in revenue.

**Tier 9 — Agency white-label / licensing (Custom)**
License the Presence Engine system to Dubai media agencies. They sell it under
their brand, Fatiha delivers the AI/avatar work. Revenue share (40/60 or 50/50)
or licensing fee ($2,000/mo + $500/client/mo). Requires proof from 3-5 direct
clients first.

**Tier 10 — Certification program ($2,000–5,000)**
"Certified AI Marketing Strategist" — train others to deliver the Presence
Engine. Cohort-based, taught live once, then evergreen. They become licensed
partners. This is the institution play (like Alicia Lyttle's IAAIC). Month 6+
roadmap item.

---

## The Speaker One-Pager

When asked to produce the speaker one-pager, output this for operator review:

**Fatiha Chikh — The AI Automation Queen**
*Speaker, fractional AI CMO, and Presence Engine architect*

**Three talk formats:**
1. "I Cloned Myself With AI — Here's What Happened to My Business" — keynote (45 min)
   For tech and business conferences; the story of building a one-person business
   powered by AI agents and a digital twin. Specific, provocative, proof-based.
2. "AI Marketing Without the Agency: The Fractional CMO Playbook" — half-day workshop
   For teams of up to 30; participants leave with an AI content engine prototype
   and their first avatar video concept.
3. "From 20 Years in Corporate to AI Freedom: The Automation Playbook" — keynote (45 min)
   For entrepreneurship and leadership conferences; bridges the corporate → founder
   journey with AI as the unlock. Dubai/EMEA angle as differentiator.

**Fees:** Keynote from $5,000 · Half-day workshop from $8,000 · Full-day from $15,000

**What participants leave with:** A map of what AI can automate in their marketing,
a starter toolkit of the 3 tools that replace a content team, and (workshop format)
a live demo of their own AI twin avatar.

Send this as a LinkedIn DM to 10 warm corporate contacts this week.

---

## The ACP Funnel

Every content draft has a stage. Tag it before writing. Manage the ratio actively.

```
A → C → P
Audience → Community → Product
```

| Stage | Goal | Target mix | What it looks like |
|---|---|---|---|
| **A** | Reach new people | 70% of posts | Pure value, no direct ask. "Here's how to [do X]." Close with a comment keyword that triggers the DM/lead magnet flow. |
| **C** | Pull warm followers into the tribe | 20% of posts | Share member wins, tease what's inside the community, invite people in. "Join us in [community name]." |
| **P** | Convert to a paid offer | 10% of posts | One product, one clear link, time pressure. Never more than 1 in every 10 posts. |

### ACP Rules (the content-engine must enforce these)

1. Never run two P posts in a row. Minimum 4 A or C posts between P posts.
2. Every A post carries a passive revenue hook — a comment keyword that fires the
   DM automation and captures the email. A posts feed the funnel without feeling
   salesy. This is non-negotiable.
3. C posts brag about members; they do not pitch the community directly. Social
   proof converts better than a sales line.
4. P posts use time pressure ("Founding spots close Friday") over evergreen CTAs
   ("Join anytime"). Scarcity is honest when an offer is genuinely limited.
5. If the last 10 vault entries already show 2 P posts, the next draft is A or C.
   Do not exceed 1-in-10 regardless of pressure to promote.

---

## The CTA Map

One CTA per post. Match to pillar + ACP stage.

| Pillar | A post CTA | C post CTA | P post CTA |
|---|---|---|---|
| Time Wins | "Comment STACK — I'll send my 3-tool setup" | "This is what we work on every month inside [community] →" | "Get the Presence Engine Starter Kit → [link]" |
| Build Once, Runs Forever | "Comment PIPELINE and I'll send the voice clone guide" | "A member just built this in a weekend. Here's what happened:" | "Build Your AI Twin — the mini-course is live → [link]" |
| The Freedom Business | "Comment FREEDOM — I'll send the guide" | "Join the people building their freedom business with AI →" | "[Community name] is open: $47/month → [Skool link]" |
| Stop Doing That by Hand | "Comment CLONE — I'll send the 3-step cheat sheet" | "Inside the community we ran this setup live last week —" | "The Presence Engine does this for you → [link]" |
| What's Worth It | "Comment WORDS for the plain-English AI jargon guide" | "What we actually debated in the community this week:" | "Community: where we filter signal from noise → [link]" |
| Real Talk | "Comment DINNER if you're in Dubai and want in" | "The community is the people actually doing this. Come in →" | "20 founding spots at $27/month locked for life → [link]" |

---

## The Conversion Flow

This is the exact journey from stranger to paying customer. Every step exists or
can be activated within a week.

```
CONTENT POST
  └─ keyword CTA in the post ("Comment STACK")
       └─ ManyChat auto-DM → delivers the lead magnet link
            └─ they download → email captured in GHL
                 └─ GHL 5-email nurture sequence:
                      Day 0:  "Here it is — [resource link]. One thing to try today..."
                      Day 2:  One quick win story from someone who used it
                      Day 5:  "If you want the full system..." → Starter Kit ($97)
                      Day 7:  Community story: "What members inside are doing right now..."
                      Day 10: Direct invite → AI Automation Queen Community ($47/month)
                 └─ Community member on Skool
                      └─ Month 2: Bootcamp waitlist invite → cohort enrollment ($997)
```

**Corporate speaking track (parallel — high-ticket, near-term cash):**
```
LinkedIn authority content (positioning + Real Talk pillar)
  └─ warm network recognises the expertise
       └─ speaking inquiry OR proactive DM outreach to 10 warm contacts
            └─ send speaker one-pager (see above)
                 └─ booked workshop ($5k–$15k)
                      └─ workshop attendees → community referrals + content
```

---

## Immediate Activation Checklist

Run this when called with `activation-check`. Check each item, report status, and
flag which are done vs. still blocked with a suggested next action.

### This week (unblock the funnel)
- [ ] Read `lead-magnets.csv` — list all `active=no` rows
- [ ] Host all 7–8 lead magnets on GHL (simple page per resource, download link)
- [ ] Paste GHL URLs into `lead-magnets.csv` and set `active=yes` for all
- [ ] Write the 5-email GHL nurture sequence using the conversion flow above
- [ ] Confirm ManyChat is configured for each keyword in `lead-magnets.csv`
- [ ] Audit the last 10 vault entries: how many have a keyword CTA? Flag any missing one

### This month (first paid revenue)
- [ ] Build the Business OS Starter Kit (see `skills/business-os-kit/SKILL.md`)
- [ ] List on Gumroad at $97
- [ ] Create Skool community (name, 3 sections: Resources / Live Calls / Community)
- [ ] Set founding member price: $97/month locked
- [ ] Post 1 founding-member call on LinkedIn ("Comment FOUNDING")
- [ ] Produce and send speaker one-pager to 10 warm LinkedIn contacts
- [ ] Plan first AI & Freedom Dinner in Dubai (see `skills/irl-events/SKILL.md`)

### Month 2 (recurring engine on)
- [ ] Open community publicly at $47/month
- [ ] Open Bootcamp waitlist to community members
- [ ] Run first IRL Dubai dinner
- [ ] Email list checkpoint: target 500 subscribers

---

## Revenue Audit (run with `revenue-audit`)

Read `performance-log.md` and `content-vault.md`. Produce this report:

| Metric | Current | Target | Gap | Action if behind |
|---|---|---|---|---|
| Lead magnets active | | 8/8 | | Activate remaining in GHL |
| Email subscribers | | 500 by month 3 | | Check keyword CTA on all recent posts |
| Community members | | 50 by month 2, 200 by month 6 | | Run a founding-member post |
| MRR (community) | | $9,850 by month 2 | | |
| Starter Kit sales (30 days) | | 20 units/month | | Add 1 P post to next week's schedule |
| Posts with keyword CTA (last 10) | | 10/10 | | Flag and suggest CTA for each missing |
| ACP ratio (last 10 posts) | | 7A / 2C / 1P | | Rebalance next 3 drafts |
| Speaking bookings (quarter) | | 1 per quarter | | Re-send one-pager to warm contacts |

Flag any metric more than 50% below target and recommend one specific action.

---

## Revenue Path to Millions

This is arithmetic, not aspiration. The engine is already built.

| Milestone | What it takes | Est. monthly revenue |
|---|---|---|
| Month 1 | 20 founding members ($27) + 1 speaking gig | ~$5,540 |
| Month 3 | 50 community + Starter Kit 20 units/month | ~$3,290 |
| Month 6 | 150 community + 1 Bootcamp cohort ($20k) | ~$10,050 |
| Month 12 | 400 community + 2 Bootcamp/year + speaking | ~$38,000 |
| Year 2 | 800 members + evergreen Bootcamp + speaking circuit | ~$75,000+/month |

The content engine is running. The funnel just needs to be switched on. Activate
the lead magnets, launch the community, and the system feeds itself.

---

## How the content-engine uses this skill

When producing any draft, the content-engine must:

1. Load this file as context (after `positioning/SKILL.md` and `inspiration-library/SKILL.md`).
2. Count the A / C / P distribution of the last 10 vault entries by reading the
   `ACP stage` field in each entry's metadata block.
3. Assign the ACP stage that keeps the ratio at ~7A / 2C / 1P. If there are
   already 2 P posts in the last 10, assign A or C and explain why in the metadata.
4. Pick the exact CTA from the CTA map above, matched to this draft's pillar and
   ACP stage. Write it verbatim into the draft.
5. Add both fields to the entry's metadata block before saving.

---

## What this skill does not do

- Does not set final prices without operator confirmation.
- Does not publish or schedule anything.
- Does not write full sales pages or product copy — `skills/business-os-kit/` does that.
- Does not override brand voice or positioning.
- Does not skip the ACP ratio check even under pressure to promote.
