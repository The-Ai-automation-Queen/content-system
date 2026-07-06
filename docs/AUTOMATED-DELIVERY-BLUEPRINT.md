# Automated Delivery Blueprint — the AI Twin, the Wiring, the ICP, and the Ladder

> Created: 2026-07-05 · Status: LIVING DOCUMENT
> Companion to `docs/FLAGSHIP-COURSE-STRATEGY.md` and the 2026-07-05 estate audit.
> Question this answers: *"If everything were wired and delivered automatically
> through the publishing platforms, with an AI twin building the courses from my
> pre-written scripts, deep ICP understanding, and a fixed pricing ladder — how?"*

---

## 1. The core insight before any wiring

The AI twin is not just a production shortcut — **it is the product demo.**
Your promise is "a business that runs without running your life." A course about
automating yourself, *taught by your AI twin while you're at dinner in Dubai*,
is the promise made visible. Say it out loud in the marketing: "My AI twin
taught 51 lessons this month. I recorded for half a day." Full disclosure, worn
as a badge — it converts skeptics because it is the proof.

One rule from `security.md` stays absolute: the twin is a clone of **you**
(your face, your voice, from a real recording session you approve). Generic AI
avatars are never presented as you.

---

## 2. Layer 1 — The AI-twin course factory

The 51 lessons are already written as scripts. Production is a pipeline, not a
project:

**Step 0 — One human half-day (the only filming you do).**
Record ~30 minutes of high-quality footage + clean voice audio. This creates the
avatar clone (Higgsfield primary / HeyGen fallback — your `heygen` skill already
contains the working HeyGen v2 API calls) and the voice clone. Record the IDs in
`inventory.md` (the blanks are already there waiting).

**Step 1 — Script transformation (fully automatable, I can build this).**
A `course-production` skill converts each lesson `.md` into three artifacts:
a spoken-register teleprompter script (written prose ≠ spoken cadence), a slide
deck brief, and a screen-demo shot list.

**Step 2 — Batch rendering (API loop).**
- Talking-head segments: HeyGen/Higgsfield API, looped over 51 scripts.
  ~400 minutes of video ≈ a few hundred dollars of render credits, days not months.
- Slide decks: **Gamma API (already connected in this workspace)** generates and
  exports per-lesson decks from the briefs.
- Screen demos: the honest 20% that resists full automation — lessons teaching
  Claude Code/tools need real screen capture. Two options: (a) you screen-record
  demos in batches with the AI voice narrating over them (no face, no
  performance pressure — 2–3 days total), or (b) scripted capture via Playwright
  for repeatable flows (you literally sell a Playwright guide in `skool-guides`).
- Assembly: templated composition — intro card → talking head → deck/screen →
  outro CTA. **Remotion** does this programmatically (again: you sell a Remotion
  guide — your own paid content teaches the tech that builds your course).

**Step 3 — The human gate (non-negotiable).**
You review each module batch before upload — pronunciation, claims, brand. One
evening per module. Quality control is the one thing the twin cannot do.

**Step 4 — Publish.**
Whop — one platform for the flagship, checkout, the community, and the
cohort classroom (Skool was the earlier plan, sunset 2026-07-06) — drip
schedule. Timeline for the whole factory: **3–4 weeks from avatar session to
full course live**, versus 3–6 months of filming.

The same factory then runs forever: new lesson script in → rendered lesson out.
Course updates ("lifetime updates" is already in your bonus stack promise)
become a cron job, not a re-launch.

---

## 3. Layer 2 — The marketing machine (built; needs keys, not code)

The 7-machine loop already exists as skills. What "wired and delivered
automatically" requires is the activation checklist from `inventory.md`:

| Gap | Unblocks |
|---|---|
| VPS (or scheduled sessions) + `deploy/` runbook executed | All daily crons: brain 20:00, signals 02:00, engine 02:30, tracker 03:00 |
| Telegram bot token | brain-manager daily Q&A → personal brain stays alive |
| Blotato egress allowlisted | distribution queue + film-free video |
| GHL connected to IG | keyword comment → DM → lead capture |
| Unipile | LinkedIn auto-DM (until then: manual, 10 min/day) |
| Apify/Tavily keys confirmed | signal-harvester live |

Standing rule preserved: **queue-only publishing** — the machine schedules,
you release. And the dm-responder lesson from the audit is now law: *never
automate a loop whose upstream is inactive.*

## 4. Layer 3 — Sales & delivery wiring (the glue is n8n, already connected)

The event chain, fully automatic:

```
Whop purchase → webhook → n8n
  ├─ GHL: create/tag contact (product, ICP, ACP stage)
  ├─ deliver access email (sequence already written — 14 of 21 emails exist)
  ├─ tier ≥ community → Whop community invite + onboarding DM
  ├─ tier = cohort → calendar + week-0 checklist + workbook (versioned, named)
  └─ 14 days later → automated testimonial/case-study ask → feeds testimonial-engine
Lead magnet opt-in → GHL 5-email nurture (written) → $47 tripwire → flagship → community → cohort waitlist
Corporate: prospecting skill (daily briefing) → one-pager DM (templated) → call (HUMAN) → install
```

**What stays human, permanently:** the avatar session, lesson QA, pricing
decisions, sales conversations above ~$2k, and ~2 live hours/week in the
community. Trust cannot be automated; everything around it can. That's the whole
model: automate the machine so your human hours go *only* where trust is built —
lives, calls, stage.

---

## 5. The ICP, in depth

Two ICPs, and every asset (post, page, email, lesson CTA) must name which one it
serves. `content-engine` should tag every draft `ICP-1` or `ICP-2`.

### ICP-1 — "The Corporate Escapee" (primary, B2C — the bridge)

- **Who:** 35–52, mid-to-senior corporate (program manager, marketing lead, IT
  manager, consultant), 10–25 years in, earning $8–25k/month. LinkedIn-native.
  Dubai/GCC, Europe, North America. In or one foot out of corporate.
- **Identity state:** golden handcuffs. Competent, respected, quietly
  desperate. Dreams of a business; terrified of being "not technical enough"
  and of starting from zero at 45.
- **Pains (in their words):** "I don't have time to figure all this out." ·
  "Every week there's a new AI tool — I'm behind before I start." · "I'm not a
  programmer." · "I can't risk my salary on a maybe."
- **Buying triggers:** restructuring/layoff rumors, a milestone birthday, a
  peer who escaped, New-Year/bonus season (Q1 is your selling season), a viral
  "AI took my job" headline.
- **Objections → offer answers:** not technical → done-with-you templates +
  the twin proving a non-engineer built this; no time → 15-min/day design +
  21-day challenge; AI keeps changing → lifetime updates + living community;
  who are you → 20 years Dell/Intel/Microsoft + the Activation Arc receipts.
- **What they actually buy:** an identity ("freedom business owner") and
  certainty — not features. $47 is an impulse; $299 comes from savings without
  a conversation; $997–2k involves a spouse and needs a guarantee + payment plan.
- **Where they are:** LinkedIn during work hours (insight/transition angle),
  Instagram evenings (payoff/lifestyle angle), YouTube in research mode,
  podcasts on the commute.

### ICP-2 — "The Capability Buyer" (B2B, corporate)

- **Who:** L&D directors, heads of innovation/digital, HR transformation leads
  — GCC first (UAE national AI agenda makes "AI upskilling" a mandated budget
  line), then multinationals.
- **What they buy:** *safety and credibility.* Your Dell/Intel/Microsoft past
  does more work here than any content — it makes you procurement-legible.
- **What they need to say yes:** a one-pager (exists), a measurable outcome
  ("each employee identifies 5+ automatable hours/week; leaves with one working
  automation"), references, and a clean invoice. Deal size $8–50k, cycle 4–12
  weeks, sourced from 1–2 warm intros per quarter — your network already holds
  a year of pipeline.
- **Their fear:** an embarrassing vendor. Antidote: the live demo — your own
  machine, running, on screen.

**Keeping the ICP deep and current (automatable):** founding members are your
research panel (onboarding survey + monthly "what's hard right now" thread);
signal-harvester scrapes competitor audiences' comments (Apify) for verbatim
pain language into `research-notes.md`; every DM keyword captured in GHL is an
ICP data point. The ICP sections above should graduate into the brain/vault and
be reloaded by content-engine like positioning is.

---

## 6. The pricing ladder, fixed (your biggest challenge, solved by subtraction)

Your ladder's problem is not the numbers — it's **crowding and gaps**. Four SKUs
under $100 ($19, $27, $47, $97) compete with each other, then a 3x cliff jump to
$299, a 3.3x to $997, then nothing until $5k. Successful ladders have ONE offer
per rung, 3–6x spacing, and every rung's only job is to create the belief needed
for the next rung.

### The canonical ladder (supersedes all previous price lists)

| Rung | Offer | Price | The belief it creates |
|---|---|---|---|
| 0 | Lead magnets (12 keywords) | Free | "She gives away better than others sell." |
| 1 | **AI Time Audit** — the ONE tripwire. Judge's Prompts + Chez guides fold in as bonuses, off the store as standalone SKUs | **$47** | "I paid her and got a result." (A buyer list is 10–30x more valuable than a subscriber list.) |
| 2 | **Community** | **$47/mo · $397/yr · founding 20 @ $27 locked** | "I belong with people doing this." The pool between all rungs. |
| 3 | **Flagship self-paced** (51 lessons, AI-twin-taught) | **$299 founding → $499 evergreen** | "The method works; I can do this." |
| 4 | **OS Install cohort** (6 weeks) | **$997 cohort #1 → $1,997 from cohort #2** | "It's installed and running in MY business." |
| 5 | **Corporate**: keynote / workshop / install | $5k / $8–15k / $25–50k | "She's the safe expert choice." |
| 6 | **Agency & Partner license** | $5–10k/yr | Monetizes the copycats. |

Rules that keep it fixed:
1. **One SKU per rung.** Everything else becomes a bonus or dies. Bonuses raise
   perceived value; sibling SKUs create decision paralysis and cheapen the brand.
2. **Prices only move up, on proof.** Cohort #1 at $997 buys testimonials;
   cohort #2 at $1,997 is *earned* by them. Never discount down — founding
   prices with real deadlines instead.
3. **Every price has a "because."** $47 because it replaces a $500 consultant
  hour; $1,997 because the bootcamp installs a system that replaces a $3k/mo VA;
  $25k because one salary-hour saved per employee per week pays for it in a quarter.
4. **The $997→$1,997 move matters.** At $997 the cohort cannibalizes corporate
   attention; at $1,997+ it funds real delivery and filters for implementers.
5. This table propagates to: `CLAUDE.md`, `skills/monetisation`,
   `skills/business-os-kit`, `skills/irl-events`, `inventory.md`, `site/store.html`.

---

## 7. How people actually get to $100k/month

Strip the mythology; the patterns of everyone who's done it durably:

1. **Rule of one until ~$50k/mo:** one avatar (ICP-1), one problem (time), one
   promise (the freedom OS), one channel to mastery (LinkedIn), one flagship.
   Diversification before traction is how estates like yours end up with three
   courses named Fast Forward.
2. **The frontend breaks even; the backend is the business.** Course sales pay
   for ads/effort; profit lives in recurring (community) + high-ticket
   (cohort/corporate). Nobody makes $100k/mo on a $299 course alone.
3. **They sell certainty, not content.** Guarantees, receipts, case studies.
   Proof compounds: every cohort's results justify the next price. Volume of
   content matters less than volume of *evidence*.
4. **A buyer list, built daily.** The $47 tripwire exists to convert subscribers
   into buyers cheaply; buyers ascend, subscribers churn.
5. **They ship publicly every day for years.** There is no known exception. The
   machine you built makes this cheap for you — that is its entire point.
6. **They automate everything except trust.**

### Three compositions of $100k/month (pick your build)

| Model | Composition | Fit for you |
|---|---|---|
| **A — Community-led** (Skool model) | 1,500 members × $67/mo | Needs a big audience; 18–24 months away |
| **B — High-ticket-led** (call-funnel model) | 20 × $5k/mo via sales calls | Sells your time back into the calendar — off-brand |
| **C — The barbell (yours)** | 2 corporate installs/mo ($50k) + 400 community ($19k) + 40 course sales ($12–20k) + 1 cohort/quarter (~$13k/mo amortized) + 1 license/quarter (~$2k/mo) | **≈ $98–105k/mo.** Matches your assets exactly: warm corporate network funds the heavy end while the automated machine grows the light end |

Honest timeline for Model C with your estate: **$5–10k/mo by month 3, $25–40k by
month 9, $100k/mo credible in months 12–18** — *if* the machine turns on now and
ships weekly. The constraint has never been assets. It is contact with the market.

---

## 8. Build order (what I can build vs. what only you can do)

**I can build in sessions on this branch:** the `course-production` skill
(lesson.md → teleprompter + deck brief + shot list ×51), the n8n purchase→
delivery→testimonial workflows, the pricing-canon propagation across all six
files, the ICP tagging rule in content-engine, the corporate one-pager +
workshop workbook from existing modules, the testimonial-engine automation.

**Only you:** the half-day avatar/voice recording session, platform accounts +
keys (HeyGen/Higgsfield, Blotato egress, GHL, Telegram, VPS), Whop
checkout setup, the brain seed, lesson QA, and pressing GO.

Sequence: avatar session + brain seed (week 1) → factory renders M0–M2 while
funnel goes live (weeks 2–3) → founding community opens on the Activation Arc
(week 3) → flagship launches founding at $299 (weeks 6–8) → cohort #1 (month 3)
→ corporate outreach runs in parallel from week 1.
