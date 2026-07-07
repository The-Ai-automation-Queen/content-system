# Estate Architecture Blueprint — shiftandlead.com + guides — 2026-07-07

Method: 5-agent workflow (run wf_0fd60f16-820). Four forensic auditors
(main-site section-by-section inventory, cross-estate offer coherence
matrix, duplication detective with grep evidence, return-mechanics audit)
feeding one high-effort architect. The blueprint below is a RULING
document: decisions, not options. Canon = queen-brain/offers.md; where a
page and canon disagree, the page changes.

# THE BLUEPRINT — Shift & Lead two-property estate
Ruling document. Canon = `/workspace/queen-brain/offers.md`. Where a page and canon disagree, the page changes. Where canon is stale against reality (speaking page, magnet count), canon gets one reconciliation edit first, then everything flows from it. Voice laws apply to every copy string written below: plain English, no em-dashes.

---

## 1. ONE JOB PER PAGE

Rule: every message has exactly one owner page. If a page does a second page's job, it gets cut to a one-line pointer. "Never do" is enforceable at review time.

### www.shiftandlead.com (`main-site/`) — the trust read. A visitor comes once, believes, and gets routed. It sells credibility, never content.

| Page | Single job | ONE primary CTA | Must never do |
|---|---|---|---|
| `main-site/index.html` | Convince a cold, skeptical visitor Fatiha is real in under 90 seconds, then route them by intent (learn / buy / hire) | `Get the free guides` → guides.shiftandlead.com | Teach anything. State any price except by pointer. Host offer detail (that is `store.html` / `about.html#community` / `work-with-fatiha.html`). Carry rotating editorial content. |
| `main-site/case-study-1.html`–`4` | One verifiable proof narrative each | `Start with the free guides` → guides site (existing line, keep) | Pitch the ladder. Restate the bio. Two studies sharing one stat grid (see §2, ruling D). |

### guides.shiftandlead.com (`site/`) — the school. Every visit should teach something and remember the visitor.

| Page | Single job | ONE primary CTA | Must never do |
|---|---|---|---|
| `site/free-resources.html` | Library home: route the reader into the right track, surface what changed this week | Start-here diagnostic → a track | Sell more than one card per offer. Restate the bio. Duplicate guide content. |
| `site/guides/*.html` (16) | Teach one thing to done, deliver one first win | The in-series next step (`Next on the map →` or next track guide) | Carry the 3-card sales triad (§2 ruling A). Carry a full bio (§2 ruling B). State any price. |
| `site/about.html` | Own the founder story AND own the Community offer (`#community`) | Join the Community waitlist (real form, §3) | Restate the 99 rules (pointer to `99.html`, §2 ruling E). List other offers beyond one pointer to the store. |
| `site/99.html` | The scoreboard. Own the 99-employee proof story, its rules, its receipts | `Follow the hires: get the Tuesday Brief` (existing sub pattern) | Sell paid tiers. Duplicate the about-page story. |
| `site/time-audit.html` | Free diagnostic quiz (renamed, §3 C4 ruling): quantify the reader's leak, capture email, hand off to the $47 product | Email-me-my-result capture | Share a name with the paid product. Route its result CTA to the Community (current `:186` bug — result routes to the $47 AI Time Audit and the STACK track instead). |
| `site/store.html` | The one full paid catalog: every purchasable rung, canonical order, honest status | Buy (or `Notify me` per not-yet-live SKU) | Undersell its own product pages (card copy = product page facts). List offers absent from canon. |
| `site/products/prompt-menu.html`, `judges-prompts.html`, `products/time-audit.html` | One sales page per SKU: full pitch, exact contents, one buy button | Buy now (real checkout URL when live; until then a SKU-scoped notify form, not a loop to store.html) | Route "buy" back to a page that says "coming soon" (§3 ruling 10). |
| `site/work-with-fatiha.html` | Own speaking/workshops: the three-tier rate card and booking path | `Message me on LinkedIn` / check-a-date (existing) | Nothing to change; this is the estate's reference page. Others point here, never restate prices. |
| `site/opt-in.html` | Lead-magnet capture gate | Subscribe/download | Grow content. The single pull-quote repeat is approved (§2 ruling F). |
| `site/ai-vocabulary-explained.html`, `ai-tools-compared.html` | **None. Killed.** 301 → `free-resources.html` (§2 ruling C) | — | Exist. |
| `site/index.html` | Redirect (existing pattern, keep) | — | — |

Nav fix: `main-site/index.html` nav label "Blog" → **"Free Guides"** (matches the CTA button and the guides site's own self-description; nothing on the destination is labeled Blog).

---

## 2. THE DEDUP RULINGS

Detective's table adopted with corrections. Owner keeps the full version; every other instance becomes the exact one-liner written here.

**A. Guide-footer sales triad (15 files) — ADOPTED, biggest leak.** Owner of "ways to go further": `site/free-resources.html` next-steps band. Every guide's closing 3-card section collapses to one line under the byline:
> `Ready for more than free? See the three ways to go further → ../free-resources.html#next-steps`
(Add `id="next-steps"` to the CTA band at `free-resources.html:665`.) Files: all 15 listed in the audit (`what-is-ai.html` … `chez-manus.html`).

**B. Founder byline paragraph (15 files) — ADOPTED.** Owner: `site/about.html`. Replacement line:
> `Written by Fatiha Chikh, The AI Automation Queen. The story → ../about.html`
No restated bio, no "20+ years," no receipts sentence (that sentence lives on `about.html` and `99.html` only).

**C. Orphan library duplicates — ADOPTED, escalated.** `site/ai-vocabulary-explained.html` and `ai-tools-compared.html` are deleted and 301-redirected to `free-resources.html` (same pattern as `site/index.html`). They are stale (mark live Kimi/Meta AI guides "coming soon") and unlinked; leaving them is an active lie to search traffic. Remove both from `site/sitemap.xml`.

**D. Case studies 3 and 4 — NEW RULING (detective missed severity; main-site auditor caught it).** Identical stat grids and near-identical builds read as fabricated proof under a "Proof, not theory" headline. Ruling: merge into one case study ("Missed-call recovery for local service businesses") or rewrite study 4 with its own real numbers traced per Engine Law 4. Until real distinct numbers exist, `case-study-4.html` comes down and the index grid shows three cards. Never ship two studies with one dataset.

**E. 99 hiring rule restated on about.html — ADOPTED.** Owner: `site/99.html`. `about.html` `.company` paragraph becomes:
> `I hire AI employees in public, one at a time. The rules and the scoreboard → 99.html`

**F. Approved repeats (no action):** pull-quote on `opt-in.html` (ruling 6), signature headline (7), speaking pointers (9), Time Audit pointers (10), case-study closing CTA line (12).

**G. Product byline card (3 product pages) — ADOPTED.** Keep as-is for now but mark in each file with `<!-- SHARED BYLINE: edit in all three products/*.html together -->`. Fold into a build partial when the site gets one.

**H. Community pricing fork — ADOPTED with the ownership flipped to match §3.** Prices move OUT of `main-site/index.html` and INTO `site/about.html#community` (sourced from canon Tier 3). Main-site ladder card copy becomes:
> `Founding spots are limited and locked for life. See current pricing and join the waitlist → https://guides.shiftandlead.com/about.html#community`

**I. Founder-facts fragmentation (LeLabPlus / "trusted by Nike") — ADOPTED, with a Law 4 ruling.** "Trusted by Nike" is an untraced brand claim appearing in exactly one place. Ruling: remove from `main-site/index.html` until a citation lands in `queen-brain/proof.md`; if verified, it moves into `about.html` (the single narrative source) and main-site keeps only the one-line version. Main-site founder section also gains the missing proof line (see §4): one sentence + link to `99.html`.

---

## 3. THE OFFER PRESENTATION SYSTEM

### 3.1 Canon reconciliation (one edit to `/workspace/queen-brain/offers.md`, then it rules)
Merge the ladder table (`:9-16`) and triage table (`:46-57`) into ONE ladder. Canonical order, canonical names, and the only order any page may ever use:

| # | Offer (canonical name) | Price | Status language on pages |
|---|---|---|---|
| 0 | Free library: 16 guides, 8 lead magnets, the Time Leak Quiz, the AI Insider Brief | Free | "Free, no card" |
| 1 | The Prompt Menu | $19 | "Opening soon. Get notified" (until checkout live) |
| 2 | The Judge's Prompts | $27 | same |
| 3 | The AI Time Audit | $47 | same |
| 4 | Business OS Starter Kit | $97 | "In build. Join the list" |
| 5 | AI Automation Queen Community | $27/mo founding (20 spots) then $47/mo | "Founding waitlist open" |
| 6 | Business OS Bootcamp | $997 | "Cohort waitlist" (never sold cold, per canon funnel logic) |
| 7 | Speaking & Workshops | Keynote from $5,000 · Half-day from $8,000 · Full-day from $15,000 | "Booking open" |

Canon housekeeping in the same edit: Tier 0 count 7 → **8** active magnets (`lead-magnets.csv` rows: STACK, FOLLOW UP, TEAM, WHAT, DIFF, PROMPT, WORDS, INBOX). Tier 5 status 🟡 → ✅ live with the three-tier rate card (reality: `site/work-with-fatiha.html:81-102`). Record founding price order as "$27 founding, then $47" everywhere (main-site's order is right; canon's column reads backwards).

### 3.2 Contradiction rulings (every matrix item)
- **C0 (two canon tables):** merged above. Prompt Menu and Judge's Prompts are full ladder rungs 1 and 2.
- **C1 (newsletter cadence):** **"Every Tuesday" wins.** Majority claim (18+ instances), already the editorial-review FIX 4 ruling, and a weekly promise is keepable. Fix the 2 main-site "twice-weekly" strings (`index.html` meta description, og:description, twitter:description, pillars LEARN card `:246`), `site/time-audit.html:291,382`, and the Brief's own title/meta in `ai-insider-brief/ai-insider-brief/index.html`.
- **C2 (Prompt Menu 30 vs 150):** product page wins. `store.html:145` card → "150 copy-paste prompts, 15 per kitchen, across 10 AI tools."
- **C3 (Judge's 40+ vs 42):** exact number wins. `store.html:128` → "42 tested verification prompts."
- **C4 (Time Audit name collision):** the paid product keeps the canon name **The AI Time Audit** ($47). The free quiz at `site/time-audit.html` is renamed **The Time Leak Quiz** (URL stays; change `<title>`, h1, schema name, and the main-site pains CTA label to "Take the free 3-minute Time Leak Quiz →"). Two-way cross-links: quiz result block adds "Want the full fix, not just the score? The AI Time Audit ($47) →" and `products/time-audit.html` adds "Not sure how big your leak is? Take the free 3-minute quiz first →". Fix `time-audit.html:186` result CTA (currently routes to `about.html#community`).
- **C5 (waitlist dead end):** `site/about.html#community` gets a real waitlist form (Formspree + n8n webhook, source tag `community-waitlist`, same double-POST pattern as existing forms) and states canon pricing: "$27/mo founding, 20 spots, locked for life. $47/mo after." Every "join the waitlist" link on 5 pages then becomes true without edits.
- **C6 (Skool vs Whop):** platform names appear on **zero** public pages until launch, ever. Internally: flagged as the open DECISION in `offers.md:37` (Skool) vs `lead-magnets.csv` FOUNDING row (Whop); Fatiha decides before checkout is built. Pages don't wait on this.
- **C7 (speaking status stale):** canon updated per 3.1. `work-with-fatiha.html` unchanged; it is the model page.
- **C8 (Fast Forward $499):** **removed from `main-site/index.html:332-337` now.** Canon wins; no page may show a price canon lacks. The product is real (`/workspace/fast-forward/`), so the same commit files a DECISION line in `offers.md`: "Fast Forward, 54 lessons, proposed $499, where does it slot vs Bootcamp?" It returns to the site only after it has a tier. Also delete its FAQ mention (`main-site` FAQ "Community and Fast Forward" → "Community and the Store").
- **Ruling 10 (circular buy buttons):** until checkout URLs exist, every `products/*.html` buy block becomes a SKU-tagged notify form ("Opening soon. Leave your email, be first in and get the launch price." tags `notify-prompt-menu`, `notify-judges`, `notify-time-audit`). When checkout ships, wire `store.html:121-149` `PRODUCTS[].url` and the product-page buttons to it directly.
- **Untraced numbers (Law 4):** "losing 15+ hours a week" → reframe as the question the quiz answers: "How many hours a week are you leaking? Most owners guess low. Take the free 3-minute quiz." "Pays for itself within the first month" → cut from FAQ until a payback figure exists in `proof.md`. "Trusted by Nike" → §2 ruling I.

### 3.3 Where the ladder lives, and what everyone else shows
- **Full ladder, one place: `site/store.html`.** All paid rungs 1–7 in canonical ascending order (fix the current $27/$47/$19 jumble), each card copy synced to its product page, each with honest status language from 3.1. Starter Kit and Bootcamp get catalog rows with waitlist forms (killing their footnote-only existence at `main-site/index.html:347`; that footnote is deleted).
- **Every other page shows exactly ONE rung, the one its reader is ripest for:**
  - `main-site/index.html` ladder section → three doors, no prices: Community (pointer to `about.html#community`), Everything in the Store (pointer to `store.html`), Speaking (pointer to `work-with-fatiha.html`). Three different destinations for three different intents; the current one-anchor flattening ends.
  - Guide outros → the single §2-A pointer line (the free-resources band does the selling).
  - `free-resources.html` band keeps 3 cards but they become the three doors above, in ladder order, prices only where canon-stable ($19 Prompt Menu card may show its price; Community card points to about for pricing).
  - `time-audit.html` (quiz) → The AI Time Audit $47 only. `99.html` → free tier only (Brief). `about.html` → Community (owns it) + one line to the Store.

---

## 4. THE "THIS WEEK" POLICY

**One asset, one surface, others get pointers.**

| Asset | Its ONE home | Everyone else shows |
|---|---|---|
| Weekly spotlight guide | `site/free-resources.html` spotlight block (`spotlight.json` machinery) | Nothing. No other page names the week's pick. |
| The 3 weekly hire episodes / scoreboard movement | `site/99.html` | `about.html` and main-site link to the scoreboard, never restate the count in copy (counts fork; the DOM-counted number on 99.html is the only count). |
| Tuesday Brief issues | `brief.shiftandlead.com` (source `ai-insider-brief/`) | Subscribe pointers only, all saying "every Tuesday." |

**Main-site shows evergreen pointers, zero rotating content.** It gets one new static band, "Live this week," between founder and cases, with three permanent lines that never need weekly edits because the freshness lives at the destinations:
> `The scoreboard: I'm hiring 99 AI employees in public, receipts updated weekly → guides.shiftandlead.com/99.html`
> `This week's featured guide → guides.shiftandlead.com` (the spotlight is the first thing the library shows)
> `The AI Insider Brief, every Tuesday → subscribe` (existing ribbon anchor)

This simultaneously fixes the #2 main-site finding (99-story absent from the front door) without giving main-site a maintenance cadence. The founder section also gains one sentence: "She is hiring 99 AI employees in public and publishing the receipts." linking to `99.html`.

**Cross-feed rules:** the Brief may summarize the week's hire in one line + link to `99.html` (never the full episode). The spotlight block may feature an employee-story guide (e.g. `inbox-manager-setup.html`); that is a pointer to a guide, not a copy of 99 content. `99.html` may name the guide that documents a hire ("Playbook: the Inbox Manager setup →"). No article body ever renders on two pages.

---

## 5. THE RETURN-VISIT ENGINE (top 5, ranked impact/effort)

**1. Name the spotlight's cadence and extend it.** (JSON + one string; ship this week.) Populate `site/spotlight.json` weeks 2026-W31 onward from already-published guides (weekly-ops absorbs this as a standing item). Change the eyebrow at `free-resources.html:317-367` from "Featured" to `This week's pick · 7 to 13 Jul` (render the ISO week's date range from the same JS that picks the key). An invisible rotation becomes a visible weekly appointment. Delete the dead fetch of `site/current.json` or keep it as the override it was meant to be; delete orphaned `site/thisweek.json` or wire it, never leave it dangling.

**2. Date-stamp the 99 scoreboard.** (Two lines of HTML per weekly run, already mandated as Step 5 of `skills/hiring-campaign/SKILL.md`.) Add to the hero block at `99.html:122-130`: `Last updated 07/07/2026 · Next wave lands Monday.` Keep the "updated when the receipts say so" trust line; the stamp tells visitors WHEN to check without promising an outcome. This turns the estate's flagship asset into its checking habit.

**3. Show unlock dates on gated guide rows.** (One JS function.) The gating script at `free-resources.html:709-737` already reads `data-publish`; render it on disabled rows: `Unlocks 11 Jul` instead of bare "Coming soon." Chez Manus (`data-publish="2026-07-11"`, fully written) becomes a live countdown for free. Add a per-row `Tell me when it's live` mini-capture (source tag `notify-guide-<slug>`) reusing the existing Formspree pattern for event-scoped notifies.

**4. Make the Brief's cadence checkable.** Fix C1 copy (18-to-2, per §3.2), then refresh `ai-insider-brief/ai-insider-brief/data/briefs.json` (cards stale since April against today 2026-07-07) from the pipeline's real current output each send, and expose a small public archive list (issue dates only) so the "every Tuesday" claim is verifiable before subscribing. The Brief is the only externally-operated recurring asset; its landing page must never look dormant.

**5. Close the "new guide in your inbox" loop.** `skills/email-ops/SKILL.md` already names the leak ("captured emails go cold by design"). Extend the skill with a recurring template: on each content-engine publish or hiring-campaign wave, draft one short "new this week" email (the spotlight pick + the hire, two links, same paste-into-GHL convention as the nurture sequence). The ribbon promise at `free-resources.html:214` becomes true, and mechanics 1 and 2 get an email channel driving the return visits.

**Cheap state memory (folds into #1 and §6):** localStorage only, no accounts: store read-guide slugs, chosen start-here path, last-visit timestamp, and quiz score+date. Powers "New since your last visit" badges on library rows, remembers the visitor's track on return, and lets `time-audit.html` say "Your score in June was 14 hours. Retake the quiz and compare." A 30/60-day re-audit invite goes into the email-ops sequence.

---

## 6. THE EDUCATION LAYER (stop reading like a blog)

Ranked builds, all on `site/`:

**E1 — Tracks as courses (highest value).** The three-level start-here diagnostic (`free-resources.html:265-315`) already sorts visitors; make each path a named course with visible progression: **Foundations** (WHAT → DIFF → PROMPT → WORDS → what-is-agentic), **The Kitchen Map** (10 Chez guides, existing "Next on the map" order), **First AI Employee** (TEAM → inbox-manager-setup → follow-up-setup). Render each as a numbered syllabus with checkmarks from localStorage read-state: "Lesson 3 of 5 · 2 left." The library stops being a wall of posts and becomes three courses with free enrollment.

**E2 — Kitchen Map series index + diagram.** One section (on `free-resources.html` or `site/guides/kitchen-map.html`) showing all 10 kitchens as a visual map, progress ticks, and the locked Manus row with its unlock date (mechanic #3). Every chez guide's "Next on the map" footer gains "Map: 6 of 10 visited →". This also inherits the useful intent of the killed `ai-tools-compared.html` in the surface that's actually maintained.

**E3 — Embedded first-win interactions.** Canon triage already prescribes the counter quiz as an involvement device routing to The Prompt Menu (`offers.md:51`). Standardize one interaction per guide: the 3 labeled starter prompts as click-to-copy blocks with a "Did it work? ✓" tap that writes to localStorage progress; literacy guides get a 3-question self-check ("Can you explain this to a colleague?"). Free = understand + one first win, made literal and felt on the page.

**E4 — Progress header.** A one-line strip on `free-resources.html` for returning visitors: "You've read 4 of 16 guides · Foundations 3/5 · pick up where you left off →". First-time visitors see the diagnostic instead.

**E5 — Quiz-to-curriculum bridge.** The Time Leak Quiz result maps score bands to a track ("You're leaking ~12 hrs/wk in follow-up. Start: the FOLLOW UP setup, then First AI Employee.") so the diagnostic feeds the courses, and the $47 AI Time Audit is the paid deepening of the same instrument (C4 cross-link).

---

## 7. PHASED IMPLEMENTATION PLAN (each wave independently shippable)

**Wave 0 — Canon reconciliation (one commit, blocks nothing, unblocks everything).**
Edit `/workspace/queen-brain/offers.md`: merge two tables into the §3.1 ladder; magnet count 7→8; Tier 5 status ✅ + three-tier rate card; add Fast Forward DECISION line; founding-price order noted. Flag Skool-vs-Whop for Fatiha (offers.md:37 vs `lead-magnets.csv` FOUNDING row).

**Wave 1 — Truth and dedup (copy edits only, no new mechanisms).**
1. Cadence to "every Tuesday": `main-site/index.html` (3 meta strings + `:246`), `site/time-audit.html:291,382`, `ai-insider-brief/ai-insider-brief/index.html` title/meta.
2. Remove Fast Forward: `main-site/index.html:332-337` + FAQ mention. Delete Starter Kit/Bootcamp footnote `:347` (they reappear in Wave 2 store).
3. De-price main-site Community card → §2-H pointer line; three-door ladder per §3.3.
4. Guide dedup: 15 files, triad → §2-A line, byline → §2-B line; add `id="next-steps"` to `free-resources.html:665`.
5. Kill orphans: 301 `ai-vocabulary-explained.html`, `ai-tools-compared.html` → `free-resources.html`; purge from `sitemap.xml`.
6. Law 4 scrubs: "15+ hours" reframe, FAQ payback claim cut, "trusted by Nike" out pending `proof.md` citation; `about.html` `.company` → §2-E pointer.
7. Time Audit collision: quiz renamed The Time Leak Quiz (title/h1/schema/main-site CTA label), two-way cross-links, fix `time-audit.html:186` result routing.
8. Main-site: nav "Blog"→"Free Guides"; founder section gains the 99 sentence + link; add the static "Live this week" pointer band (§4); contact form gains name + message fields (`main-site-contact` still tags both POSTs; verify n8n dedupes on email).
9. Case study 4 down or rewritten with traced numbers (§2-D).

**Wave 2 — Offer system (needs Wave 0).**
1. `store.html`: full ladder, ascending order, synced card copy (150 / 42 / $47), Starter Kit + Bootcamp rows with status language and waitlist forms.
2. `about.html#community`: real waitlist form (`community-waitlist` tag) + canon pricing; five upstream "waitlist" links become honest.
3. Product pages: buy loops → SKU-scoped notify forms (`notify-*` tags); wire `PRODUCTS[].url` + buy buttons the day checkout exists (blocked only by the Skool/Whop/Gumroad decision, tracked in offers.md).
4. Main-site ladder doors point at store / about#community / work-with-fatiha (three intents, three destinations).

**Wave 3 — Return engine (needs nothing above, but lands best after Wave 1 credibility fixes).**
1. Spotlight: W31+ entries in `spotlight.json` (standing weekly-ops item); dated "This week's pick" eyebrow; resolve `current.json`/`thisweek.json` dangling files.
2. `99.html` hero: last-updated + next-wave stamp, written by hiring-campaign Step 5 each run.
3. Unlock dates + per-guide notify on gated rows (`free-resources.html:709-737`).
4. Brief: refresh `briefs.json` per send, public issue-date archive.
5. email-ops "new this week" recurring template.

**Wave 4 — Education layer (interactivity last; needs Wave 1's clean guide footers).**
E1 tracks-as-courses with localStorage read-state → E2 Kitchen Map index/diagram → E4 progress header + "new since last visit" badges → E3 click-to-copy first-win interactions → E5 quiz-to-curriculum bridge + 30/60-day re-audit email.

**Definition of done per the board's four questions:** Wave 1 makes every public claim canon-true and traced; Wave 2 gives every offer exactly one owner and every buy-intent a working next step (emails captured per SKU via notify tags); Wave 3 gives visitors dated reasons to return (source tags per mechanic measure it); Wave 4 turns readers into enrolled students whose progress is visible. Each wave's external changes get a dated file in `reports/` per session conventions.

Key files: `/workspace/queen-brain/offers.md` · `/home/user/content-system/main-site/index.html`, `case-study-1.html`–`4.html` · `/home/user/content-system/site/{free-resources,about,99,time-audit,store,work-with-fatiha,opt-in,ai-vocabulary-explained,ai-tools-compared,sitemap.xml,spotlight.json,current.json,thisweek.json}` · `/home/user/content-system/site/products/{prompt-menu,judges-prompts,time-audit}.html` · `/home/user/content-system/site/guides/*.html` (15 triad/byline files + `inbox-manager-setup.html`) · `/home/user/content-system/lead-magnets.csv` · `/home/user/content-system/ai-insider-brief/ai-insider-brief/{index.html,data/briefs.json}` · `/home/user/content-system/skills/{hiring-campaign,email-ops}/SKILL.md`.
---
# Appendix A — Main-site inventory (section by section)

# Main-site index.html — section-by-section copy inventory (nav order)

Read in full: `main-site/index.html`, `main-site/case-study-1.html` through `case-study-4.html`, `main-site/robots.txt`, `main-site/sitemap.xml`. Cross-checked against `/workspace/queen-brain/offers.md` (canon ladder) and `site/about.html` (guides-site bio/community section) for overlap and price-accuracy.

---

## 1. Ribbon (sitewide bar, above nav)
**Job:** capture email before any content loads.
**Copy:** `"Get the AI Insider Brief, every Tuesday, free"` / placeholder `your@email.com` / button `"Subscribe free"`.
**Wiring:** JS posts to `formspree.io/f/xgojoyka` AND `https://auto.shiftandlead.com/webhook/formspree-lead` (double POST, tag `main-site-ribbon`), no honeypot check enforced server-side beyond a hidden `_gotcha` field passed through.
**Verdict:** earns its place as top-funnel capture.
**FLAG — internal contradiction:** ribbon says newsletter is **"every Tuesday"** (weekly, one day). Three other spots on the *same page* say **"twice-weekly"**: `<meta name="description">`, `og:description`, `twitter:description`, and the pillars LEARN card body (`"the twice-weekly AI Insider Brief"`). This is a same-file factual contradiction about cadence, not a guides-site duplication issue.

## 2. Nav
**Links:** logo → `#top` · `Blog` → `https://guides.shiftandlead.com` (external) · `About` → `#about` · `Case Studies` → `#cases` · `Community` → `#further` · `Contact` → `#contact` · CTA button `Free Guides` → `https://guides.shiftandlead.com` (external).
**Verdict:** correctly treats guides.shiftandlead.com as the content property and only anchors within-page for front-door sections. Minor naming mismatch: nav calls it "Blog," guides site's own nav (`site/about.html` line 69) calls the same destination "Home" / "Free Resources" — no page on guides.shiftandlead.com is actually labeled "Blog."

## 3. Hero (`#top`)
**Job:** brand statement, immediate free/paid bifurcation.
**Key copy:** H1 `"Lead with AI. Don't drown in it."`; sub: `"You built your business for freedom. Somewhere along the way, it started running you instead. I teach everyday entrepreneurs to use AI and automation to get their time back, not by handing you more software to figure out, but by showing you exactly what to automate, what to skip, and how, without needing to be technical."`
**CTAs:** `Get the free guides` → `https://guides.shiftandlead.com` (external, primary) · `See how to go further` → `#further` (internal).
**Verdict:** earns its place — this is exactly the job a front door should do and doesn't duplicate guide content.

## 4. Pains ("Sound familiar?")
**Job:** agitation block before the pitch, dark section, unique to a sales front door.
**Key copy:** `"Every week you wait is costing you time, leads, and revenue."` Bullets: *"losing 15+ hours a week to repetitive busywork"*, *"Leads go cold because you can't follow up fast enough"*, *"paying for five tools and actually using two"*, *"your big goals are on hold because today's admin ate the day again"*, *"missing chances because you're buried, not because you're not good enough."*
**CTA:** `Take the 3-minute Time Audit →` → `https://guides.shiftandlead.com/time-audit.html` (external, correct routing).
**Verdict:** earns its place, doesn't duplicate the guides library.
**FLAG:** `"losing 15+ hours a week"` is a bare, uncited number — no trace to `performance-log.md` or `queen-brain/proof.md` per Engine Law 4.
**FLAG — naming collision:** the free quiz is called "Time Audit" here; canon (`queen-brain/offers.md` Tier 1) has a **paid** "AI Time Audit Template ($47, not built)" with the same name. When Tier 1 ships, two different products will share the name "Time Audit."

## 5. Founder (`#about`, nav "About")
**Job:** authority/bio.
**Key copy:** `"She's led this shift before."` — `"Fatiha Chikh spent 20+ years driving go-to-market and digital transformation at Dell, Intel, and Microsoft, leading AI and cloud adoption for Fortune 500 companies across four regions..."` / `"Then she built her own: LeLabPlus, an AI-powered fashion company trusted by Nike."` / `"Now, as founder of Shift & Lead, she installs AI teams that run business operations, less oversight, more output."` Quote: `"The winners don't work harder. They build better."`
**Verdict:** earns its place — bio content isn't guide content.
**Overlap (expected, not a problem):** `site/about.html` also opens with "20+ years... Dell, Intel and Microsoft" — reasonable, both properties need a short bio.
**FLAG — real gap, not overlap:** the main site's authority section makes **zero mention of the 99-AI-employees build-in-public proof story**, which `site/about.html` leads with (`"I'm hiring 99 AI employees to run my business... in public"`, linking to `site/99.html`). The front door is missing the single most distinctive, verifiable proof asset in the business.
**FLAG:** `"trusted by Nike"` is a specific brand claim with no citation anywhere in either site — untraced per Law 4.

## 6. Pillars ("How I help")
**Job:** LEARN / BUILD / SPEAK segmentation, the master map of the whole ladder.
**Key copy:** LEARN — `"Start free, always."` `"Free guides, the twice-weekly AI Insider Brief, and a growing library that turns AI overwhelm into plain English. No card, no catch."` BUILD — `"Templates, a community, a flagship course."` SPEAK — `"Bring it to your team."` `"...Plus quoted, bespoke build projects for the rare business that needs it."`
**CTA:** none — all three cards are dead text, no links.
**Verdict:** earns its place structurally (unique overview no guide page has), but **flag**: zero clickthrough on the one section literally titled "How I help" — a visitor reading LEARN can't click through from the card. Also carries the third "twice-weekly" instance contradicting the ribbon.

## 7. Cases (`#cases`, nav "Case Studies")
**Job:** proof gallery, 4 cards linking to case-study pages.
**Copy/CTAs (all relative links `case-study-N.html`, correct since same domain):**
- E-Commerce — *"A support bot that answers before customers get frustrated."* / **1 min** avg support response → `case-study-1.html`
- Day Care Center — *"An AI agent that qualifies leads and books tours in minutes."* / **97%** faster time-to-first-contact → `case-study-2.html`
- Tire Shop — *"Recovering every missed call before the customer calls a competitor."* / **42 sec** avg time to respond → `case-study-3.html`
- Coffee Shop — *"Retiring the punch card for something that actually keeps people coming back."* / **30%** increase in sales → `case-study-4.html`

**Verdict:** earns its place — unique content type, correct relative wiring (unlike nav, these stay in-property).
**FLAG:** the headline stat picked per card is inconsistent — sometimes the page's 1st stat (Day Care: 97%), sometimes its 2nd (Tire Shop: 42 sec, when the page itself leads with 97% first).

## 8. Testimonials
**Job:** social proof.
**Copy:** 3 quotes, attributed only as `"Pauline P."`, `"Myriam M."`, `"Nazima C."` — first name + last initial, no company, no title, no photo.
**Verdict:** earns its place but weak — same anonymity pattern as the case studies, nothing to independently verify.

## 9. Ladder (`#further`, nav "Community") — the section that earns the site's existence
**Job:** the full paid offer stack in one place; no equivalent exists on the guides site.
- **Community** — `$27/mo founding · $47/mo standard` — *"My actual workflow, swipe vault, and live calls when I run them... 20 founding spots locked for life."* → `Join the waitlist` → `https://guides.shiftandlead.com/about.html#community` (anchor verified present)
- **Course "Fast Forward."** — `$499 one-time` — *"Structured curriculum to build, ship, and install AI. 30-day community trial bundled."* → same waitlist link
- **Speaking & Bespoke** — `Quoted per scope` → `Get in touch` → `#contact`
- Note line: `"...The Starter Kit ($97) and Bootcamp cohorts ($997) are also on the way..."` → same waitlist link

**Price cross-check against `queen-brain/offers.md` (the only canonical version, per its own header):**
- Community $27/$47 → matches Tier 3 exactly. ✅
- Starter Kit $97 → matches Tier 2 exactly. ✅
- Bootcamp $997 → matches Tier 4 exactly. ✅
- **Fast Forward $499 → NOT in the canonical ladder at all.** Canon lists Tiers 0–5 (magnets, Time Audit $47, Starter Kit $97, Community, Bootcamp $997, Speaking); nothing called "Fast Forward" or priced $499 exists there. A real Fast Forward product *does* exist (`/workspace/fast-forward/CLAUDE.md`: "Fast Forward course (54 lessons + Whop kit)") but it's unreconciled with canon — exactly the "price from memory or a copy" this repo's CLAUDE.md forbids.
- Canon's Tier 1 (AI Time Audit Template, $47) never appears on this ladder at all — it's absent while a same-named free quiz runs in the Pains section.
- All three "further" CTAs (Community, Course, Speaking) funnel to the same `about.html#community` waitlist form — lead intent gets flattened to one signal regardless of which tier the visitor clicked.

## 10. FAQ
**Job:** objection handling tied to the ladder above.
**Key lines:** *"I'm not technical, can I still do this?"* → *"Absolutely... You don't need to code. You need the system."* / *"What if the free guides aren't enough?"* → *"That's what the Community and Fast Forward are for..."* / *"Can I actually afford this?"* → *"Everything paid is designed to pay for itself in reclaimed time within the first month."*
**Verdict:** earns its place, no guide-content duplication.
**FLAG:** "pay for itself... within the first month" is an ROI claim with no supporting figure — none of the four case studies shown actually states a payback period.

## 11. Contact (`#contact`, nav "Contact")
**Job:** catch-all lead form.
**Key copy:** *"Speaking, bespoke builds, or just say hello."* / *"I read every message myself. No auto-replies, no funnels."* / alt line → `https://guides.shiftandlead.com` (external, correct).
**FLAG — functional mismatch:** the form has only an **email field**, no message/name/company field — so a promise to "read every message myself" has no message to read, and someone wanting "a quoted done-with-you project" can't state what they need.
**FLAG:** same double-POST pattern as the ribbon (formspree + `auto.shiftandlead.com/webhook`), tag `main-site-contact` — confirm downstream dedupes on email or this double-writes leads.

## 12. Footer
**Job:** sitemap + social + legal.
**Links:** `Free Guides & Blog` → external guides.shiftandlead.com · `Case Studies` → `#cases` · `About` → `#about` · Instagram/LinkedIn (external) · `Contact` → `#contact`.
**Wiring note:** LinkedIn link here is `https://linkedin.com/in/fatihachikh` (no `www.`); `site/about.html` uses `https://www.linkedin.com/in/fatihachikh` — cosmetically inconsistent across properties, likely both resolve.
**Verdict:** earns its place, standard.

## "This week" / rotating content check
**None exists.** No dynamic feed, no embed of the 99-employee tracker (`site/99.html`), nothing pulling live data anywhere on `index.html`. Given the charter's framing of the 99-employee build-in-public as the flagship proof story, its total absence from the front door is itself a finding (see founder section above).

## Case study weaknesses confirmed by direct read
- **Anonymous clients** in all 4: "a growing e-commerce business," "the day care coordinator," "the tire shop," "a coffee shop with several locations" — no names anywhere, matching the testimonials' anonymity.
- **Duplicated stat grids, study 3 vs 4:** case-study-3.html (Tire Shop) and case-study-4.html (Coffee Shop) both show the identical three stats in the identical order — **97% / 42 sec / 30%** — with identical labels (*"Reduction in time-to-first-contact," "Average time to respond to a lead," "Increase in sales"*) and near-identical "What I built" paragraphs (both describe an "automated callback system" that "reaches out... within minutes"). Reads as one case study reskinned as two.

---

## Top 5 problems, ranked

1. **Fast Forward priced at $499 with no canonical backing.** The ladder section states a firm price for a real product that is absent from `queen-brain/offers.md`, the file this repo's own CLAUDE.md calls the only current version and forbids sourcing prices from memory/copies. This is a public-facing price that hasn't been reconciled with canon.

2. **The 99-employees proof story — the business's one truly differentiated asset — is completely absent from the front door.** It's not in the founder bio, not in nav, not in footer, no link to `site/99.html`, while `site/about.html` leads with it. The main site sells generic authority ("20+ years, Dell/Intel/Microsoft") instead of the verifiable, weekly-updated receipts story.

3. **Case studies undermine their own "Proof, not theory" claim.** All 4 are anonymous, and studies 3 and 4 share word-for-word identical stat grids and near-identical copy — this reads as templated filler, not real distinct client results, right under a section literally promising "I've built these results for real businesses."

4. **Newsletter cadence contradicts itself on the same page.** Ribbon says "every Tuesday"; meta description, og:description, twitter:description, and the pillars LEARN card all say "twice-weekly." A visitor or search engine reading two different parts of one page gets two different facts.

5. **Ungrounded numeric claims with no trace, plus a functionally broken contact form.** "Losing 15+ hours a week" and "pays for itself within the first month" have no source per Engine Law 4; separately, the contact form promises "I read every message myself" but collects only an email address, no message field — so intake for the site's highest-value leads (speaking, bespoke builds) is structurally incomplete.

Files referenced: `/home/user/content-system/main-site/index.html`, `/home/user/content-system/main-site/case-study-1.html` through `case-study-4.html`, `/home/user/content-system/main-site/robots.txt`, `/home/user/content-system/main-site/sitemap.xml`, `/workspace/queen-brain/offers.md`, `/home/user/content-system/site/about.html`, `/home/user/content-system/site/index.html`, `/workspace/fast-forward/CLAUDE.md`.
---
# Appendix B — Offer coherence matrix

Note: claude-opus-4-8[1m] (the safety classifier) was unavailable when reviewing this subagent's work. Please carefully verify the subagent's actions and output before acting on them.

# OFFER COHERENCE MATRIX — Shift & Lead Estate
Canon source: `/workspace/queen-brain/offers.md` (rebuilt 05/07/2026). Two canon tables exist inside that single file and already disagree with each other (see Contradiction C0). All line numbers below are 1-indexed from the files as read.

## PART 1 — THE MATRIX (offer × page × claim)

### Offer: Tier 0 / Free lead magnets + guide library
| Page | Claim |
|---|---|
| Canon `offers.md:11` | "7 lead magnets live... PIPELINE retired" ✅ ACTIVE |
| `lead-magnets.csv` | Only 8 rows total marked `active=yes`: STACK, FOLLOW UP, TEAM, WHAT, DIFF, PROMPT, WORDS, INBOX — that's 8, not 7. PIPELINE is `active=no` (retired, matches canon). INBOX (row added 07/07) is a live active magnet canon's "7" count predates and doesn't include. |
| `main-site/index.html:246` | "Free guides, the twice-weekly AI Insider Brief" — no count given |
| `site/about.html:103` | "16+ Free plain-English guides, the Kitchen Map series" — different noun (guides, not lead magnets) and count (16+) |
| CLAUDE.md (this repo, `site/`) | "16 guides" |

**Finding:** canon's "7" lead magnets is stale — CSV shows 8 active rows as of 07/07. No page states "7" anywhere, so the canon count isn't even being contradicted by a page, it's just already wrong against its own source of truth.

### Offer: AI Insider Brief (newsletter)
| Page | Claim |
|---|---|
| `main-site/index.html:179` | Ribbon: "Get the AI Insider Brief, every Tuesday, free" |
| `main-site/index.html:246` | Pillar copy: "the twice-weekly AI Insider Brief" |
| `site/free-resources.html:672-674` | CTA card: "Free · every Tuesday... I read 200+ AI stories a week" |
| CLAUDE.md charter | "The newsletter | `ai-insider-brief/`" — no cadence stated |

**Contradiction C1:** main-site's own hero ribbon says **every Tuesday** (weekly) while its own pillar section two screens down says **twice-weekly**, and guides.shiftandlead.com agrees with the ribbon ("every Tuesday"). Two different cadences on the *same page*.

### Offer: The Prompt Menu — canon triage price $19
| Page | Price | Status/claim |
|---|---|---|
| Canon `offers.md:53` | PAID $19 | "full prompt menus per tool; free shows 3 starters max" |
| `site/store.html:141-148` | $19 | "30 bonus prompts, 3 per tool, not in the free guides" — `url:""` → renders "Coming soon" |
| `site/products/prompt-menu.html:104,213` | $19 | "150 copy-paste prompts... 15 per kitchen, across 10 AI tools" — buy button routes to `../store.html` |
| `site/guides/chez-claude.html:534-537` | $19, "opening soon" | routes to `../store.html#notify` (email capture, not checkout) |
| `site/guides/what-is-ai.html:413-416` | $19, "opening soon" | same pattern |

**Contradiction C2:** store.html's own product-card description says the pack is **"30 bonus prompts, 3 per tool"** (30 total) while the actual product sales page for the same $19 item says **150 prompts** (15 per kitchen × 10 tools). The store undersells its own product by 5x. `store.html:145` vs `products/prompt-menu.html:104,200`.

### Offer: The Judge's Prompts — canon triage price $27
| Page | Price | Claim |
|---|---|---|
| Canon `offers.md:54` | PAID $27 | "42 verification tools; free teaches concepts only" |
| `site/store.html:122-130` | $27 | "40+ tested prompts" — `url:""` → "Coming soon" |
| `site/products/judges-prompts.html:96,163,175` | $27 | "42 verification prompts" (hero, getlist, price block all say 42) |
| `site/guides/chez-claude.html:473` | no price shown | inline text link "The Judge's Prompts →" → `../store.html` |

**Contradiction C3 (minor):** store.html card copy says "40+" while the product's own sales page says exactly "42" three times. Price and existence agree; the count is fuzzed on the storefront card only.

### Offer: The AI Time Audit — **two products share one name**
| Page | Which one | Price | Claim |
|---|---|---|---|
| Canon `offers.md:12` (ladder) | Tier 1 | $47 | Gumroad, 🔴 Not built |
| Canon `offers.md:55` (triage) | — | PAID $47 | "Implementation worksheet + video" |
| `site/store.html:132-139` | paid product | $47 | "Notion + PDF" worksheet + "10-min walkthrough video" — Coming soon |
| `site/products/time-audit.html:117,280` | paid product | $47 | full sales page, same name, same claims |
| **`site/time-audit.html`** (root, not `/products/`) | **free interactive quiz** | **$0** | schema.org `"offers":{"price":"0"}` (`:29`), "8 questions, 3 minutes" (`:11`), title "The AI Time Audit: How Many Hours Are You Leaking?" |
| `main-site/index.html:221` | free quiz | $0 | "Take the 3-minute Time Audit →" links to `site/time-audit.html` |

**Contradiction C4 — the headline finding:** there are **two unrelated offers both called "The AI Time Audit."** One is a free 3-minute quiz (`site/time-audit.html`, schema price `0`), the other is a $47 Notion+PDF worksheet product (`site/products/time-audit.html`, canon Tier 1). Nothing on either page disambiguates them from each other — a visitor who takes the free quiz has no way to know a $47 product with the identical name exists, and the quiz's own internal CTA (`site/time-audit.html:186`) doesn't route to the paid product at all, it routes to `about.html#community`. Platform also conflicts: canon says Gumroad, store.html implies Stripe/Whop (`store.html:75`).

### Offer: Business OS Starter Kit — canon Tier 2, $97
| Page | Claim |
|---|---|
| Canon `offers.md:13` | $97, "Notion brain + 3 lite guides + Loom", Gumroad, 🔴 Not built |
| `main-site/index.html:347` | footnote only: "The Starter Kit ($97)... also on the way" — links to `about.html#community`, not a Starter Kit page |
| `site/store.html` PRODUCTS array | **absent** — not one of the 3 listed products |
| Any `site/products/*.html` | **no dedicated page exists** |

**Finding:** the entire $97 tier is a single dangling footnote line on one page (main-site) that routes to the Community waitlist, not to any Starter Kit content. Guides.shiftandlead.com never mentions it once — not on store.html, not in any of the 3 audited guide outros, not on free-resources.html's CTA band.

### Offer: AI Automation Queen Community — canon Tier 3
| Page | Price | Platform | Status shown |
|---|---|---|---|
| Canon `offers.md:14` | $47/mo · $27 founding ×20 | Skool | 🔴 Not launched |
| `main-site/index.html:328-330` | "$27/mo founding · $47/mo standard" (order flipped vs canon) | not stated | "20 founding spots locked for life" — CTA "Join the waitlist" → `about.html#community` |
| `site/about.html:121-129` | **no price at all** | not stated | "Founding member spots are opening soon" — CTA is actually "Join the Insider Brief, be first to know" (**not a waitlist form**) |
| `site/free-resources.html:678-681` | no price | not stated | "Founding member spots opening soon" → "Be first in line" → `about.html#community` |
| `site/guides/chez-claude.html:540-543`, `what-is-ai.html:419-422` | no price | not stated | "founding spots soon" → `about.html#community` |
| `lead-magnets.csv` FOUNDING row | — | **"Whop community space"** | `active=no`, "founding offer... must actually exist before this goes live" |

**Contradiction C5:** every single page that links to "join the Community waitlist" sends the user to `about.html#community`, and that section **has no waitlist form, no price, and no founding-spot mechanism** — its only button subscribes to the newsletter. Three pages (main-site, free-resources, both guide outros) promise a specific action ("join the waitlist," "be first in line") that the destination page cannot fulfill.

**Contradiction C6 (platform):** canon says the Community lives on **Skool**; `lead-magnets.csv` FOUNDING row says **Whop**; `store.html:75` says checkout (for a different, one-time-purchase context) runs on "Stripe or Whop." No page ever says "Skool." The canon's chosen platform appears on zero customer-facing surfaces.

### Offer: Business OS Bootcamp — canon Tier 4, $997
| Page | Claim |
|---|---|
| Canon `offers.md:15` | $997, Skool+GHL, 🔴 Waitlist not open |
| `main-site/index.html:347` | same footnote as Starter Kit: "Bootcamp cohorts ($997)... also on the way" → routes to `about.html#community` |
| `site/*` (store, about, work-with-fatiha, free-resources, 3 guide outros, 99.html) | **zero mentions anywhere on the guides site** |

**Finding:** identical pattern to Starter Kit — one footnote clause on one page, no dedicated content, routed to a dead-end waitlist.

### Offer: Corporate Speaking / Workshops — canon Tier 5
| Page | Price shown | Claim |
|---|---|---|
| Canon `offers.md:16` | $5,000–15,000 | Direct/LinkedIn, 🟡 One-sheet not sent |
| `main-site/index.html:339-345` | "Quoted per scope" (no numbers) | CTA "Get in touch" → `#contact` |
| `site/work-with-fatiha.html:81-102` | **three explicit tiers**: Keynote from $5,000 · Half-day workshop from $8,000 · Full-day workshop from $15,000 | fully built booking page, CTA "Message me on LinkedIn" |
| `site/about.html:132-139` | no price | "Bring this into your company" → `work-with-fatiha.html` |
| `site/free-resources.html:683-688` | no price | "For companies... Keynotes & workshops" → `work-with-fatiha.html` |
| Both guide outros | no price | same pattern |

**Contradiction C7 (status vs. reality):** canon flags this tier 🟡 "one-sheet not sent," implying it isn't actively being pitched, yet `work-with-fatiha.html` is a fully live, fully priced, three-tier booking page with a "Check a date... I'll reply... within 48 hours" promise — the most complete, most sales-ready page in the entire estate. The canon status is stale by a wide margin.

**Minor drift:** canon's range is "$5,000–15,000" (two endpoints); the live page has three named products at $5k/$8k/$15k. Not contradictory, just more granular than canon records — canon should be updated to reflect the real rate card.

### Offer: "Fast Forward" course — $499 — **not in canon at all**
| Page | Claim |
|---|---|
| `main-site/index.html:332-337` | "Fast Forward. $499 one-time... Structured curriculum to build, ship, and install AI. 30-day community trial bundled." CTA → `about.html#community` |
| Canon `offers.md` | **never mentioned** — no tier, no price, no status |
| `site/*` (store, about, free-resources, work-with-fatiha, 3 guide outros, 99.html) | **never mentioned once** |
| `/workspace/fast-forward/` repo | separate repo with `course-whop-upload/`, `skool-guides/`, `courses/` directories — confirms this is a real, actively-built product living entirely outside this repo's canon and outside guides.shiftandlead.com |

**Contradiction C8 — the second headline finding:** main-site sells a **$499 course** that does not exist in the canonical offer ladder, does not appear anywhere on the guides site, and bundles a "30-day community trial" into a Community that (per C5) has no functioning waitlist or launch. This is a real, priced, named product visible to visitors that the Constitution's canon file has no record of. Per CLAUDE.md's own rule ("Never write a price, tier, or product status from memory or from a copy"), this page is doing exactly the forbidden thing — the price/tier is not sourced from `queen-brain/offers.md` because it can't be, it isn't there.

---

## PART 2 — FULL CONTRADICTION / DRIFT LIST (ranked by severity)

1. **C4 — Name collision, two different "AI Time Audit" products.** `site/time-audit.html` (free, $0, 3-min quiz) vs `site/products/time-audit.html` (paid, $47, Notion worksheet). Same brand name, same site, no cross-link disambiguating them. This alone is probably the single biggest source of "messy offering" feeling — a visitor can complete the free one and never learn the paid one exists, or land on the $47 page from an ad and wonder if it's the same free thing they already did.

2. **C8 — Fast Forward ($499) is a live offer with zero canon record.** `main-site/index.html:332-337`. Not in `queen-brain/offers.md`, not on guides.shiftandlead.com anywhere. Violates the CLAUDE.md rule to never write price/tier/status off-canon.

3. **C5 — Community waitlist is a dead end on 5 pages.** main-site ladder card, `about.html#community` itself, `free-resources.html` CTA band, and both audited guide outros (chez-claude, what-is-ai) all say "join the waitlist" / "be first in line" — the landing section has no form, no price, no mechanism, just a newsletter opt-in disguised as a Community signup.

4. **C6 — Platform contradiction for the Community.** Canon says Skool (`offers.md:14`). `lead-magnets.csv` FOUNDING row says Whop. No live page says either. If Fatiha is about to build the checkout, this needs resolving before launch — the FOUNDING row's operator note already flags "the founding offer... must actually exist before this goes live," so this is an active blocker, not just an editorial nit.

5. **C7 — Speaking status is stale.** Canon: 🟡 "one-sheet not sent." Reality: `work-with-fatiha.html` is a complete, priced, three-tier booking page, the most finished commercial page on either site. Canon needs a status bump to ✅, and the price should be recorded as three tiers ($5k/$8k/$15k), not one range.

6. **C2 — Prompt Menu undersold on its own storefront.** `store.html:145` says "30 bonus prompts, 3 per tool." `products/prompt-menu.html:104,200,213` (the actual $19 sales page) says "150 copy-paste prompts... 15 per kitchen." The storefront card describes a fraction of what's actually being sold.

7. **Starter Kit ($97) and Bootcamp ($997) exist only as one shared footnote sentence** on `main-site/index.html:347`, both routed to the same dead-end Community anchor. Zero presence anywhere on guides.shiftandlead.com — not the store, not any guide outro, not free-resources.html. A canon tier with real pricing and a real funnel role (per `offers.md:24-26`) is invisible to 100% of guides-site traffic.

8. **C1 — Newsletter cadence disagrees within a single page.** `main-site/index.html:179` ("every Tuesday") vs `main-site/index.html:246` ("twice-weekly"), two sections apart on the same URL.

9. **C3 — Judge's Prompts count fuzzed.** Store card: "40+." Actual product page: "42" (repeated 3×). Small, but it's the same pattern as C2 — cards undersell/round down what the linked sales page states precisely.

10. **Buy buttons are circular.** Every `/products/*.html` page's "Get it in the Store →" button (`judges-prompts.html:177`, `prompt-menu.html:215`, `time-audit.html:282`) routes back to `store.html`, where all three products show `url:""` and render as "Coming soon" (`store.html:121-149`). There is currently no live checkout path anywhere in the estate for any of the three priced digital products — every path terminates at a waitlist or a "coming soon" badge, never at Stripe/Whop.

11. **Canon items zero pages ever mention:** the Skool platform name for Community (see C6); the Gumroad platform for Time Audit and Starter Kit (`offers.md:12-13`) — store.html implies Stripe/Whop instead (`store.html:75`); Business OS Bootcamp's "$997" and "6-week cohort" shape (`offers.md:15`) — never described anywhere on either live site, only the bare number in the main-site footnote.

12. **Pages that mention offers the ladder doesn't cover:** Fast Forward $499 (C8); the free `time-audit.html` quiz product-schema entry (technically a $0 "Offer" per its own JSON-LD, `time-audit.html:29`) which sits outside both canon tables since Tier 0 in `offers.md:11` only lists "7 lead magnets," not a quiz.

---

## PART 3 — WHERE THE LADDER *ORDER* ITSELF DIFFERS

1. **Canon disagrees with itself.** `offers.md` contains two separate tables: the "ladder" (Tier 0→5: Lead magnets → Time Audit $47 → Starter Kit $97 → Community → Bootcamp $997 → Speaking) at lines 9-16, and the "free/paid triage" (Prompt Menu $19 → Judge's Prompts $27 → Time Audit $47 → Starter Kit $97 → Community/Bootcamp/Speaking) at lines 46-57. **The triage table includes two products (Prompt Menu $19, Judge's Prompts $27) that the ladder table omits entirely.** Any page trying to build a coherent "here's everything, in order" funnel has no single canon list to draw from.

2. **`main-site/index.html:319-347` ("Three ways to go further")** presents, left to right: Community ($27-47/mo) → Course/Fast Forward ($499, off-canon) → Speaking (quoted), with Starter Kit/Bootcamp relegated to a footnote below. This is priced ascending only if you ignore that Fast Forward isn't in canon at all and Time Audit/Prompt Menu/Judge's Prompts aren't shown here as options whatsoever.

3. **`site/free-resources.html:665-690` and both guide outros ("The chef's table")** present: Prompt Menu ($19) → Community (no price) → Speaking (no price shown here, though the underlying page has three tiers). This *starts* on-canon-order (lowest paid price first) but then skips Judge's Prompts ($27) and Time Audit ($47) entirely, jumping straight to unpriced Community and Speaking — so within the same 3-card layout the ordering logic (price ascending) is abandoned halfway through.

4. **`site/store.html:121-149` (the PRODUCTS array)** lists, in code order: Judge's Prompts ($27) → Time Audit ($47) → Prompt Menu ($19). This is **not** ascending ($27, $47, $19) or descending, and doesn't match either canon table's order, or the guide-outro order, or the main-site order. It's the fourth distinct sequencing of the same handful of SKUs found across the estate.

5. **Guide-outro CTA set (Prompt Menu / Community / Speaking) vs. store.html product set (Judge's Prompts / Time Audit / Prompt Menu):** these are two different 3-item subsets of the paid catalog, shown to the same reader population (guides.shiftandlead.com visitors) depending only on which page they land on, with no consistent "these are the paid options, in this order" pattern anywhere.

6. **`site/guides/inbox-manager-setup.html`** (one of the 3 audited outros) has **no chef's-table / paid-offer block at all** — its only next-step CTA is to another free guide (`first-ai-employee.html`, line 214) and top-nav links to Store/Work-with-Fatiha. So the monetization footer isn't even present on every guide; it's inconsistent whether a guide sells anything at the bottom, on top of being inconsistent about *what* it sells when it does.

---

## File references for a fix pass
- Canon to reconcile first: `/workspace/queen-brain/offers.md:9-16` vs `:46-57` (merge the two tables into one).
- Kill the name collision: rename `site/time-audit.html` (the free quiz) to something like `time-audit-quiz.html` or add explicit "this is the free 3-minute version — see the full $47 worksheet →" cross-link in both directions (`site/time-audit.html:186` and `site/products/time-audit.html`).
- Decide Fast Forward's canon status: either add it to `offers.md` with a real tier/price/platform or pull `main-site/index.html:332-337` until it's canonized.
- Fix or remove the Community waitlist promise: `about.html:121-130` needs an actual form, or every page linking to it (`main-site/index.html:330,347`, `free-resources.html:681`, `chez-claude.html:543`, `what-is-ai.html:422`) needs softer language.
- Resolve Skool vs. Whop before building checkout (`offers.md:14` vs `lead-magnets.csv` FOUNDING row vs `store.html:75`).
- Sync store.html card copy to match the actual product pages: `store.html:128,145` (counts) against `judges-prompts.html:96/163/175` and `prompt-menu.html:104/200/213`.
- Wire real checkout URLs into `store.html:121-149` `PRODUCTS[].url` — currently all three are `""`, making every "Buy" path in the estate a loop.
---
# Appendix C — Duplication table

## Duplication Audit — main-site/ + site/

Scope grepped: `/home/user/content-system/main-site/*.html` (5 files) and `/home/user/content-system/site/**/*.html` (31 files). Ownership principle applied throughout: **the page whose job it is owns the full version; every other appearance becomes a one-line pointer + link.**

### Ruthless dedup table

| # | Duplicate block (quoted) | Appears in | Owner (keep full) | Verdict |
|---|---|---|---|---|
| 1 | **The guide-footer triad, verbatim, 15 times.** Three `chefs-card`/`cta-card` blocks: Prompt Menu card, `<h3>Build alongside me</h3>` + "Live 'build with me' sessions, templates, and people on the same road...", and `<h3>Keynotes &amp; workshops</h3>` + **"Bring the whole method into your team[,/:] practical, non-technical, from someone who is hiring 99 AI employees in public and shows the receipts."** | `site/guides/what-is-ai.html`, `chatgpt-vs-ai.html`, `what-is-a-prompt.html`, `ai-jargon-guide.html`, `what-is-agentic.html`, `chez-claude.html`, `chez-openai.html`, `chez-gemini.html`, `chez-copilot.html`, `chez-grok.html`, `chez-mistral.html`, `chez-deepseek.html`, `chez-kimi.html`, `chez-meta-ai.html`, `chez-manus.html` (15 files, byte-identical except one `,`/`:` swap) | `site/free-resources.html` owns the "3 ways to go further" band (Insider Brief / Community / Speaking) already, in full | This is the single biggest leak in the estate. 15 guides each carry a full 3-card sales pitch instead of one line + link. Collapse every guide's closing section to one sentence: *"Ready to go further? [The three ways →](../free-resources.html#next-steps)"*. Cuts ~45 duplicate paragraphs to 15 one-liners. |
| 2 | **The founder byline paragraph, verbatim, 15 times.** *"Written by Fatiha Chikh: The AI Automation Queen.<br>20+ years inside big corporate tech; now I'm hiring 99 AI employees in public and showing the receipts. I build everything I teach."* | Same 15 guide files as #1 | `site/about.html` owns the founder story (`I watched smart people freeze.` section) | Guides already link `The story →` to about.html — good instinct, wrong execution. Shrink the paragraph to: *"Written by Fatiha Chikh, The AI Automation Queen. [The story →](../about.html)"* — one line, no restated bio. |
| 3 | **`ai-vocabulary-explained.html` and `ai-tools-compared.html` are a whole orphan duplicate of the library.** Not linked from any nav, `free-resources.html`, `about.html`, or `99.html` — only `sitemap.xml` and each other reference them. They re-list the same 5 Basics guides and the same 10 Kitchen Map guides that `free-resources.html`'s filterable library already covers, plus duplicate the exact CTA block *"Want the maps in your inbox? ... Get the free library →"* | `site/ai-vocabulary-explained.html`, `site/ai-tools-compared.html` | `site/free-resources.html` (has search, filters, spotlight rotation — does this job better) | **Also stale, which makes it a live leak, not just clutter**: `ai-tools-compared.html` marks Chez Kimi and Chez Meta AI as `card soon` / "Coming soon" with no link, but both guides are published and linked live from `free-resources.html` (dated 2026-06-29… wait, 2026-07-05 and 2026-07-07, both ≤ today 2026-07-07). A reader who lands here via search gets told two live guides don't exist yet. Either delete both pages and 301/redirect to `free-resources.html` (matches the existing `site/index.html` redirect pattern), or turn them into single links back to the library. Do not leave them live and unmaintained. |
| 4 | **The 99-hiring rule, restated instead of pointed to.** `99.html`: *"An employee counts as hired only if it did real work in the last 7 days..."* / *"real work this week"* (og:description). `about.html`: *"An employee only counts when it did real work this week. I make the decisions, everything else runs without me."* | `site/99.html` (rules card + meta), `site/about.html` (`.company` section) | `site/99.html` — it's the scoreboard, the rule is its constitution | about.html should compress its `.company` paragraph to state the concept once ("I hire AI employees in public, one at a time — [the rules and the scoreboard →](99.html)") rather than re-deriving the hiring rule in its own words. Low risk of drift today since both say "this week," but it's the kind of fact that forks first. |
| 5 | **Product byline card, verbatim, 3 times.** *"The AI Automation Queen · Shift &amp; Lead. 20+ years inside big corporate tech, now hiring 99 AI employees in public to do the work while she judges it. The story →"* | `site/products/judges-prompts.html`, `site/products/prompt-menu.html`, `site/products/time-audit.html` | `site/about.html` | Lowest-severity of the bio dupes since it's already just a byline + link, but it's the identical sentence baked into 3 separate files, and it's on the customer-facing purchase path — a canon edit to the founder facts means editing 3 files by hand. Suggest turning it into one shared partial/include if the build allows, or at minimum flag it as "linked text, not owned prose" so nobody edits one copy and forgets the other two. |
| 6 | **"You're not behind. You just haven't had someone explain it properly yet."** (pull-quote, verbatim, identical markup) | `site/free-resources.html` (`.pull` section), `site/opt-in.html` (`.pull` section, every guide opt-in view) | `site/free-resources.html` — it's the front door, this is its signature line | This one is fine as-is: opt-in.html is a lightweight lead-capture page, and repeating the one signature pull-quote there is brand reinforcement, not bloat. No action needed — noting it because it was a named suspect, not because it's a leak. |
| 7 | **"AI, explained quietly."** | `site/free-resources.html` (hero h1, split across `<br>` + `.block` span) | `site/free-resources.html` | Single occurrence as a headline (og:description elsewhere just says "AI, explained quietly." as the meta description echo of the same h1 — that's expected metadata mirroring, not content duplication). No action. |
| 8 | **The community pitch, present in 4 different forms with 2 different price stories.** `main-site/index.html`: *"$27/mo founding · $47/mo standard... 20 founding spots locked for life"* + a $499 Fast Forward course tier. `about.html`: *"Build your freedom business alongside me"* + *"Founding member spots are opening soon"* — **no price at all.** `free-resources.html` cta-card: *"Build alongside me."* + *"Founding member spots opening soon"* — no price. Guide chefs-cards (15 files): *"Build alongside me"* — no price. | `main-site/index.html`, `site/about.html`, `site/free-resources.html`, 15 guide files | `main-site/index.html` currently has the *only* place pricing lives (`$27/mo` / `$47/mo` / `$499`) — but per CLAUDE.md, canon pricing must come from `queen-brain/offers.md`, never be authored independently on a page | **Flag, don't just dedup**: main-site/index.html is quoting community/course prices that appear nowhere else in this repo's copy (`about.html`, the community's actual landing page, has none). That's a fork risk — if `offers.md` changes those numbers, `about.html` won't contradict it (says nothing) but `main-site/index.html` will go stale silently. Ownership fix: `about.html#community` should be the one page that states current price + spot count (pulled from `offers.md`), and `main-site/index.html`'s ladder card should drop the numbers and read "See current pricing →" linking to `about.html#community`. Guides are already correctly reduced to a pointer (folded into finding #1). |
| 9 | **Speaking pitch — already correctly deduped, flagging as a pass.** Full offer (3 formats, $5k/$8k/$15k) lives only on `work-with-fatiha.html`. `main-site/index.html` pillars/ladder, `about.html`, `free-resources.html` cta-card, and the 15 guide chefs-cards all use one-line pointers ("Bring it to your team," "Work with Fatiha →"). | n/a — no fix needed | `site/work-with-fatiha.html` | This is the pattern #1, #2, and #8 should be copying. No action. |
| 10 | **Time Audit pitch — already correctly deduped, flagging as a pass.** Interactive quiz (canonical) on `site/time-audit.html`. Paid worksheet product (different SKU) on `site/products/time-audit.html`, description string shared verbatim only between `store.html`'s `PRODUCTS` JS array and `products/time-audit.html`'s meta description — expected, same product, one is a card blurb. All other appearances (`main-site/index.html` pains section, `99.html` cta-sub, `free-resources.html` path-cta) are one-line pointers. | n/a — no fix needed | `site/time-audit.html` (free tool) / `site/products/time-audit.html` (paid worksheet) | No action. |
| 11 | **Founder facts (20+ years, Dell/Intel/Microsoft) retold in 4 distinct voices, plus one orphaned fact.** `main-site/index.html`: 3rd-person bio, adds **LeLabPlus, an AI-powered fashion company trusted by Nike** — this fact appears nowhere else in `site/`. `about.html`: 1st-person origin story, no LeLabPlus/Nike mention at all. `work-with-fatiha.html` "why" grid: 1-line version. 15 guide bylines: 1-line version (#2). | `main-site/index.html`, `site/about.html`, `site/work-with-fatiha.html` | `site/about.html` should be the single narrative source | This isn't verbatim duplication (each version is hand-written differently) so it's not a copy-paste leak, but it is a **canon fragmentation risk**: main-site's bio includes a fact (LeLabPlus/Nike) that about.html's fuller origin story omits entirely. Either fold LeLabPlus/Nike into about.html's story (if it's real and durable) or drop it from main-site (if it's decorative filler) — right now a reader who reads both pages gets two different founder histories. |
| 12 | **Case-study CTA, verbatim, 4 times:** *"Want the plain-English version of how this works? Start with the free guides, no pitch, just the actual playbook."* | `main-site/case-study-1.html` through `case-study-4.html` | `main-site/index.html` hero / `guides.shiftandlead.com` | Acceptable as-is — this is already a one-line pointer + link pattern repeated across one content type on one property, not a restated pitch. No action. |

### Priority order to fix
1. **Finding #1 + #2 together** (15 guide files, ~30 duplicate blocks) — highest leverage, mechanical fix, same two paragraphs everywhere.
2. **Finding #3** — `ai-vocabulary-explained.html` / `ai-tools-compared.html` — stale + orphaned, actively misleads on Kimi/Meta AI availability. Kill or redirect.
3. **Finding #8** — community pricing fork between `main-site/index.html` and the rest of the estate — check against `queen-brain/offers.md` before touching, since CLAUDE.md forbids writing price from memory.
4. **Finding #11** — LeLabPlus/Nike fact fragmentation — confirm with Fatiha whether it's canon before adding/removing.
5. **Finding #4, #5** — lower severity, fix opportunistically when those files are next touched.

### Files read for this audit (absolute paths)
`/home/user/content-system/main-site/index.html`, `case-study-1.html` through `case-study-4.html`; `/home/user/content-system/site/about.html`, `free-resources.html`, `work-with-fatiha.html`, `99.html`, `opt-in.html`, `store.html`, `time-audit.html`, `index.html`, `ai-vocabulary-explained.html`, `ai-tools-compared.html`, `products/time-audit.html`, `products/prompt-menu.html`, `products/judges-prompts.html`, and all 15 files in `site/guides/` matching the CTA-triad/byline pattern listed in row 1.
---
# Appendix D — Return mechanics audit

# Return-Visit Mechanics Audit — guides.shiftandlead.com + www.shiftandlead.com

Sources read: `site/spotlight.json`, `site/thisweek.json`, `site/current.json`, `site/free-resources.html`, `site/99.html`, `site/time-audit.html`, `site/store.html`, `site/guides/*.html`, `main-site/index.html`, `main-site/case-study-*.html`, `ai-insider-brief/ai-insider-brief/{index.html,app.js,data/briefs.json}`, `lead-magnets.csv`, `skills/hiring-campaign/SKILL.md`, `skills/email-ops/SKILL.md`, `performance-log.md`, `reports/site-editorial-review-2026-07-07.md`, `git log` on site files. Today per session = 2026-07-07 = ISO week 2026-W28.

## 1. Inventory — every dynamic/recurring/updatable element, verified

| Mechanism | Path | Actually changes on schedule? | Visible to visitor as "this changes"? | Hook to check back? |
|---|---|---|---|---|
| **Weekly spotlight** | `site/spotlight.json` + JS in `site/free-resources.html:369-467` | Yes, now working. Reads ISO week (`2026-W27..W30` keyed correctly; `git log` shows commit `a8825d9` "spotlight repair" already fixed a prior key-mismatch bug). Runs out after **2026-W30** (~27 Jul) — no weeks defined beyond that, silent fallback to the permanent default (`what-is-ai`/`chatgpt-vs-ai`/`chez-claude`). | **No.** Eyebrow just says "Featured" (`id="spotlight-eyebrow"`), no date, no "this week's pick" framing, no week number shown. A repeat visitor has no way to know the block rotates at all. | None. Nothing tells a visitor "come back Monday for a new pick." |
| **`current.json` manual override** | `site/current.json` | Dormant: `{"active": false}`. Fetched on every page load (`cache:'no-store'`) for nothing. | N/A — never active | N/A |
| **`thisweek.json`** | `site/thisweek.json` | Orphaned. `grep -rn "thisweek" site/` returns zero references from any HTML/JS. Content itself is clean now (act/watch/ignore, no banned number), but nothing on the deployed site reads it. | No — not wired to anything | No |
| **The 99 scoreboard** | `site/99.html` | **Static HTML, hand-edited per hire, not data-driven.** The "3" hired-count is hardcoded as literal `<div class="slot hired">` blocks (3 of them) plus one `.slot.interviewing`; JS at line 218-230 only counts DOM nodes and fills empty slots — there is no JSON feed, no live counter. Per `skills/hiring-campaign/SKILL.md`, the campaign is supposed to run **weekly** (3 planned employees/wave, Mon-Fri asset cadence) and update this page each run, but the tracker law is "counter never runs ahead of receipts" — so visible badges lag the weekly cadence and currently sit at 3 hired / 1 interviewing against a 99-slot board. | Copy is honest about this and undercuts urgency on purpose: *"updated when the receipts say so, not before"* (`99.html:128`). Good for trust, bad for return-hooks — it explicitly tells visitors not to expect movement. | None. No "next hire expected" date, no hired-date sort-to-top, no notify option scoped to this page specifically. |
| **Publish-date-gated guide rows** | `site/free-resources.html:490-660` (`data-publish` attrs) + gating script `:709-737` | Real: `chez-manus.html` (`data-publish="2026-07-11"`) is fully written (43KB, already in `site/sitemap.xml:20`) but shown as a greyed "Coming soon" row with disabled CTA until the date passes — a genuine, if silent, drip mechanic. | Partially — the grey row is visible in the library (a real signpost), but there's no date shown on it (just "Coming soon", no "unlocks 11 Jul"). | Weak: a scanning visitor could notice a locked row, but nothing timestamps or promotes it. |
| **Kitchen Map series "next" links** | e.g. `site/guides/chez-claude.html:525` `"Next on the map: → Chez ChatGPT"` | Static, baked at publish time — real series signposting within a session, not a return trigger. | Yes, visible in-page | Only if reader finishes the guide in one sitting; nothing re-invites after they leave. |
| **Time Audit quiz** | `site/time-audit.html` | Deterministic client-side scoring, same result every time for the same answers — no state persists between visits (no localStorage, no account). Optional "email me my full audit" (`site/time-audit.html` `.r-email` block) sends the result once via presumably Formspree/n8n; no evidence of a follow-up cadence tied to it. | Yes, engaging in-session | **No return hook** — result isn't dated, isn't tied to a re-take reminder, and nothing invites a 30/60/90-day re-audit to show improvement. |
| **Store "notify me"** | `site/store.html:75-119` | Static "Store opens soon" + one-time notify form (Formspree + `auto.shiftandlead.com/webhook/formspree-lead`, source `store-notify`) | Yes | One-shot: fires once when Store launches, not recurring. |
| **Insider Brief** (external asset, not in this repo's deploy but linked everywhere) | `https://brief.shiftandlead.com`; source at `ai-insider-brief/ai-insider-brief/` | **Cadence is internally contradictory.** `site/opt-in.html` and 16 guide footers (e.g. `site/guides/what-is-ai.html:380`) say *"every Tuesday"*; `site/time-audit.html:291,382` says *"twice a week"*; the Brief's own `<title>`/meta in `ai-insider-brief/ai-insider-brief/index.html` also say *"Twice-Weekly."* `reports/site-editorial-review-2026-07-07.md` already flagged this exact contradiction (FIX 4) and it is still unresolved in the files I read. The Brief's own visible data is stale: `ai-insider-brief/ai-insider-brief/data/briefs.json` contains only 10 cards, all dated **2026-04-09 to 2026-04-11** — three months old relative to today (2026-07-07) — sitting behind a subscribe-gate ("Subscribe to see the full board," `index.html:171`). | The promise of weekly/twice-weekly cadence is the single strongest recurring hook in the whole estate **on paper** — but the landing page itself currently shows no fresh proof of it running, and no public archive of past issues exists for a subscriber to browse. | Real, if the cadence claim is honored server-side (can't verify from this repo — the crawler/sender pipeline exists in `ai-insider-brief/ai-insider-brief/pipeline/`, but this repo has no evidence of actual recent sends). |
| **"Get every new guide in your inbox" ribbon** | `site/free-resources.html:213-218`, repeated on every guide footer e.g. `site/guides/what-is-ai.html:380` | The ribbon posts to Formspree + `auto.shiftandlead.com/webhook/formspree-lead` (n8n → GHL), source tag `ribbon`. **No skill in `skills/` automates emailing this list when a new guide publishes** — `skills/email-ops/SKILL.md` only drafts a one-time 5-email Day-0–10 nurture sequence (UNB-013) and says outright: *"The funnel's biggest documented leak is that captured emails go cold by design: leads download a magnet and never hear from her again."* The guide-footer copy additionally promises the Insider Brief bundled in ("Plus The Insider Brief... every Tuesday") — but the Brief runs on a separate pipeline/sender (`ai-insider-brief/ai-insider-brief/pipeline/newsletter-sender.mjs`, described in `CLAUDE.md` as "Kit sender") from the GHL list the ribbon feeds. No connector between the two is visible in this repo. | The promise is visible; the fulfillment is unverifiable and, per email-ops's own self-description, actively known to be broken past Day 10. | This is the mechanism most likely to be **the** habit driver and it's the least trustworthy one on inspection. |
| **main-site (www.shiftandlead.com)** | `main-site/index.html`, 4 static `case-study-*.html` | **Nothing dynamic at all.** Site copy calls itself the "brand front door"; only interactive elements are two lead-capture forms (`main-site-ribbon`, `main-site-contact`) posting to the same Formspree/n8n endpoints. No spotlight, no scoreboard, no dated content, no series. | N/A | **Zero.** There is no reason on this domain, ever, for a repeat visit — it functions purely as a one-time trust/credibility read before the visitor is routed to `guides.shiftandlead.com` (nav link "Blog" at `main-site/index.html:188`). |

## 2. The honest diagnosis

What a genuinely habit-forming educational property has that this estate lacks:

1. **No progress/state memory.** Nothing persists across a visitor's sessions — no account, no localStorage, no "you've read 4 of 16 guides," no saved Time Audit score to compare against next month. Every visit starts from zero. The three-level "Start here" self-assessment (`site/free-resources.html:265-315`) sorts a visitor into a path once, but nothing remembers which path they picked on their next visit.
2. **No streaks or cumulative framing.** The 99 scoreboard is the one asset built for this (a counter that should climb visibly week over week) but it's copy-defended against urgency ("updated when the receipts say so, not before") and technically static HTML, not a live feed — so it can't create a checking habit even in principle without a manual edit each time.
3. **No "new since your last visit" signal.** Guide rows are sorted by track, not by recency; there's no "new" badge, no unread indicator, no visit-timestamp comparison. A returning visitor to `free-resources.html` sees the identical page as a first-time visitor, modulo the spotlight (which itself carries no "this changed" signal — see above).
4. **Series exist but don't advertise themselves as ongoing.** The Kitchen Map series (10 guides, `site/guides/chez-*.html`) is the closest thing to "follow a series" content Shift & Lead has, and it already has "next on the map" links baked in per guide. But there's no series index/progress bar, and once a reader finishes today's 9 published entries there is no visible cue that a 10th (Manus) exists and unlocks in 4 days — that information lives only in a disabled grey row easy to miss.
5. **No live counters anywhere that are actually live.** The 99 board's "3/99" is DOM-counted static markup, not a poll/websocket/refresh — it cannot move without a code commit + redeploy.
6. **No notify mechanics tied to specific, individually-interesting events.** There is exactly one working notify signup (Store opening, one-shot) and one broken-by-omission one (ribbon "new guide" promise with no sending automation found). Nothing lets a visitor say "tell me only when Manus goes live" or "tell me only when the next employee gets hired" — the notify surface is generic, not event-scoped.
7. **The two properties don't reinforce each other's cadence.** main-site is 100% static and never signals "go check guides.shiftandlead.com, something changed." It could trivially surface "This week: [spotlight guide title]" or "Latest hire: [name]" pulled from the same content already produced weekly, and currently does neither.

## 3. Top 5 highest-impact return mechanics — existing assets only, no new content sources

Ranked by (visibility × cadence reliability × effort to ship using files/skills that already exist):

**1. Make the spotlight visibly a schedule, and extend it past 2026-W30.**
`site/spotlight.json` already has the machinery; it just needs weeks W31+ populated (this is a data-entry task the same weekly-ops/content-engine cadence can absorb — no new content, just re-sequencing already-published guides into the rotation) and the eyebrow text changed from generic "Featured" to something that names the cadence, e.g. "This week's pick" + the ISO week's human date range, in `site/free-resources.html:317-367`. Cost: near-zero (JSON + one string edit). This turns an invisible rotation into a visible weekly reason to check the homepage.

**2. Turn the 99 scoreboard into the estate's real live counter, fed by the hiring-campaign cadence that already exists.**
`skills/hiring-campaign/SKILL.md` already commits to a weekly 3-employee wave with a defined Monday/Wed/Thu/Fri rhythm; `site/99.html`'s update step ("Tracker. Update site/99.html") is already Step 5 of that skill's weekly run. The gap is purely presentational: add a visible "last updated DD/MM/YYYY" stamp and a "next wave: [day]" line to `99.html`'s hero/counter block (`99.html:122-130`), sourced straight from the wave the campaign just ran. No new mechanism — just exposing the cadence that's already mandated so a visitor knows *when* to come back, not just *that* the count might move.

**3. Fix and repurpose the "coming soon" date-gated rows as an actual countdown/notify hook.**
`site/free-resources.html`'s `data-publish` gating (`:490-660`, `:709-737`) already identifies future content and greys it out — it just discards the date. Show the unlock date on the disabled row ("Unlocks 11 Jul") instead of just "Coming soon," using data already in the `data-publish` attribute. This is a one-function JS change, zero new content, and gives every visitor who scans the library a specific date to return for (the Manus guide is sitting there right now, ready, just silent).

**4. Resolve the Brief cadence contradiction and put the promise where it's checkable.**
The Insider Brief is the estate's only genuinely recurring, dated, externally-operated asset (crawler + sender pipeline already exists in `ai-insider-brief/ai-insider-brief/pipeline/`). Its return-hook value is currently undercut by (a) the "every Tuesday" vs "twice a week" contradiction already flagged in `reports/site-editorial-review-2026-07-07.md` FIX 4 and still live in `site/time-audit.html:291,382`, and (b) stale/gated preview cards (`ai-insider-brief/ai-insider-brief/data/briefs.json` last dated April) that make the landing page look dormant to anyone who peeks before subscribing. Fixing the copy (18-to-2 canon per the existing report) and refreshing the visible preview cards with the pipeline's real current output (no new content — just re-running the existing sender/crawler output through the same landing page) makes the single strongest cadence claim in the estate credible again.

**5. Close the "new guide in your inbox" loop with what email-ops already half-built.**
`skills/email-ops/SKILL.md` already names this exact leak ("captured emails go cold by design... never hear from her again") and already produces a 5-email nurture sequence. Extend that same drafting discipline (no new tooling, same skill, same paste-into-GHL convention) to a lightweight recurring trigger: "new guide published" or "new employee hired" as a 6th/ongoing email template the same skill drafts on each hiring-campaign or content-engine run, fed by content that's already produced weekly (the wave, the spotlight pick). This converts the ribbon's existing, already-displayed promise ("Get every new guide in your inbox," `site/free-resources.html:214`) from unverified to actually fulfilled, using only the nurture-sequence machinery that already exists.

None of the above require a new content source, a new tool, or a new cadence — every one repurposes a mechanism (spotlight rotation, hiring-campaign wave, publish-date gate, Brief pipeline, nurture sequence) that this estate has already built and is already running, just not yet surfaced or dated in a way a visitor can act on.