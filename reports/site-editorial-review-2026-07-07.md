# Site Editorial Review — guides.shiftandlead.com — 2026-07-07

Method: 12-agent workflow (run wf_e290e36d-9e8). Eight editorial readers
covered all 32 page reviews from source (library, money pages, capture
layer, hubs, 20 guides in track batches), one cross-cutting consistency
auditor grepped the whole estate, a skeptic verified the 15 most
consequential claims against files, and two high-effort chiefs wrote the
fix plans below. Only verified or file-referenced findings included.

## Headline findings

1. **The 137 problem is 21 files deep.** The banned number appears 41
   times in customer-facing copy: about.html (5x plus department pills
   that SUM to 137), work-with-fatiha.html, all 16 guide outros, product
   pages, and thisweek.json, which serves "137" publicly at
   guides.shiftandlead.com/thisweek.json right now. One click from the
   99 scoreboard, the site contradicts its own proof story.
2. **The front page's JavaScript makes it worse on every load.** The
   weekly spotlight rotation has never worked (JS looks up "2026-W27",
   the JSON stores "27") and the hydration reads fields the JSON does
   not have, so it replaces the crafted featured cards with blank
   descriptions and generic CTAs. The page ships worse than its own
   fallback HTML.
3. **Email capture can silently lose leads.** The ribbon reports
   "Subscribed!" before any request is sent, with no failure handling;
   the opt-in and quiz forms lack keepalive on redirect. These forms are
   the site's entire job.
4. **View-source leaks strategy.** store.html ships an internal HTML
   comment with pricing strategy and the URL of the unlinked free copy
   of a killed paid product.
5. **No privacy page** on a domain with four email-capture surfaces.
6. **A strategic fork only the founder can call:** sitemap.xml hands all
   16 gated guide URLs to Google while the funnel pretends they are
   email-gated. Either ungate the guides as SEO assets with in-guide
   capture (recommended), or strip them from the sitemap and noindex.

---

# Copy + Coherence Fix Plan — Shift & Lead site estate
All findings below survived fact-check verification (2026-07-07) or carry a direct file:line reference. Severity tags retained.

---

## 1. Ten highest-impact copy fixes

### FIX 1 — P0 — Purge 137 from about.html (5 instances + pill math)
`site/about.html:78, 102, 111, 112, 115` plus meta at lines 9-10, 16. The banned number is the page's central proof claim and contradicts 99.html one nav click away.

- **:78 current:** `Now I run my own business with a company of 137 AI employees, and I hand over everything I build.`
  **Replace:** `Now I'm hiring 99 AI employees to run my business, one at a time, in public. And I share everything I build.`
- **:102 current:** `<div class="n">137</div><p>AI employees running my own business, in 7 departments</p>`
  **Replace:** `<div class="n">99</div><p>AI employees being hired in public, receipts on the scoreboard</p>`
- **:111 current:** `<h2>My company of 137 AI employees</h2>`
  **Replace:** `<h2>I'm hiring 99 AI employees, in public.</h2>`
- **:112 current:** `This isn't a metaphor. My business runs on an operating system I built: 137 specialized AI agents organized like a real company...`
  **Replace:** `This isn't a metaphor. I'm building a company where the busywork is done by AI employees I hire one at a time. An employee only counts when it did real work this week. The scoreboard is public.`
- **:115:** dept pills sum to 137 (22+24+23+19+17+14+18) with no traceable source (Law 7). Replace with the seven department names without counts, or the live hired count from the 99 campaign.
- **:113 current:** `real numbers, real screenshots, every week.` **Replace:** `real numbers, real screenshots, every week on <a href="99.html">the scoreboard</a>.`

**Scope note:** grep confirms 41 customer-relevant "137" occurrences across 21 deployed files, including all 16 guide outros, `site/products/judges-prompts.html`, and `site/thisweek.json`. Fix site-wide in one commit or the contradiction just moves.

### FIX 2 — P0 — Purge 137 from work-with-fatiha.html
`site/work-with-fatiha.html:72, 124`, in front of exactly the skeptical corporate audience that will check.

- **:72 current:** `Built from a real system: I run my own business with a company of 137 AI employees, and I show exactly how it works.`
  **Replace:** `Built from a real system: I'm hiring 99 AI employees to run my own business, in public, and I show exactly how it works.`
- **:124 current:** `<strong>She runs on the system she teaches</strong>Her business is operated by 137 AI agents she built, and every example is real and current.`
  **Replace:** `<strong>I run on the system I teach</strong>My business runs on AI employees I hire in public, one at a time. Every example is real and current.` (Also converts the page's only third-person card to first person; do the same at :123, `she speaks corporate fluently` → `I speak corporate fluently`.)

### FIX 3 — P0 — thisweek.json: banned number on a public URL
`site/thisweek.json:5` ships `"stat_n": "137"` to guides.shiftandlead.com/thisweek.json; zero pages reference the file (verified orphan). **Primary fix: delete the file from site/.** If revived as the Brief-teaser strip: stat sourced from the 99 scoreboard (`stat_p: "AI employees hired so far, in public. The receipts are on the scoreboard."`) and the em-dashes at lines 2-3 rewritten: `act: "EU AI Act enforcement starts for general-purpose models. If you sell into Europe, check your disclosures."` / `watch: "Agentic checkout inside chat apps: commerce is moving into the conversation."` Do not leave as-is.

### FIX 4 — P1 — Brief cadence contradiction: "twice a week" vs "every Tuesday"
`site/time-audit.html:291, 382` vs `site/opt-in.html:156` and `site/free-resources.html:671` (`Free · every Tuesday`). One is false in public. Canonical: **every Tuesday** (2 pages vs 1; verify against `ai-insider-brief/` config before commit).

- **:291 current:** `The AI Insider Brief does it twice a week: plain English, an ACT / WATCH / IGNORE verdict on every story, free.`
  **Replace:** `The AI Insider Brief does it every Tuesday: plain English, an ACT / WATCH / IGNORE verdict on every story, free.`
- **:382 current:** `...The AI Insider Brief filters the noise for you, twice a week.`
  **Replace:** `...The AI Insider Brief filters the noise for you, every Tuesday.`

### FIX 5 — P1 — time-audit.html community overclaim
`site/time-audit.html:185` promises a price and scarcity the destination does not back (about.html#community shows no price, no waitlist form).

- **Current:** `Want to fix all of it with people one step ahead of you? <a href="about.html#community">Join the founding community waitlist, $27/mo, locked for life for the first 20.</a>`
  **Replace:** `Want to fix all of it with people one step ahead of you? <a href="about.html#community">The founding community is opening soon. Get on the list.</a>`
  (Restore the $27/first-20 detail only after queen-brain/offers.md confirms it AND about.html#community states it.)

### FIX 6 — P1 — store.html present-tense delivery promise over an empty shelf
`site/store.html:73-75` plus H1 at :66.

- **:73-75 current:** `<strong>Instant delivery.</strong> Checkout is handled by Stripe or Whop, you get the product link immediately, plus an email copy. Every purchase includes free updates when the product improves.`
  **Replace:** `<strong>When the Store opens.</strong> Checkout will be handled by Stripe or Whop. You get the product link the moment you pay, plus an email copy. Every purchase includes free updates when the product improves.`
- **After the :67 sub, add one status line:** `The Store opens soon. The free guides are open now, and Insider Brief readers get the opening email first.` (No invented dates.)
- **:108-114:** Business OS Starter Kit at $97 traces to nothing (queen-brain absent from session, no detail page exists). Do not render the card until it traces to offers.md and has a home.

### FIX 7 — P1 — opt-in.html fallback state promises a guide that never comes
`site/opt-in.html:434`: with no/unknown `?guide` param the page promises a guide but submit redirects to the library.

- **Current:** `'Enter your details and the guide lands in your inbox immediately.'`
  **Replace:** `'Tell us where to send you, and we\'ll open the full free library.'` and in the same else branch set the submit button text to `Open the library →`.

### FIX 8 — P1 — free-resources.html "it isn't, almost" is unparseable
`site/free-resources.html:278`.

- **Current:** `You think ChatGPT <em>is</em> AI (it isn't, almost)`
  **Replace:** `You think ChatGPT is all of AI (it's one small piece)`

### FIX 9 — P1 — free-resources.html Level 02 tells one path, pushes another
`site/free-resources.html:295-296`: route says start with Basics 3; CTA jumps to Chez Claude.

- **:296 current:** `<a class="path-cta" href="opt-in.html?guide=chez-claude">Enter Chez Claude →</a>`
  **Replace:** `<a class="path-cta" href="opt-in.html?guide=what-is-a-prompt">Start with Basics 3 →</a>`
- Companion fix, **:309 current route:** `Basics 5 → the Tool Maps → the next step below` (nothing is labeled "next step") **Replace:** `Basics 5 → the Kitchen Maps → hire your first AI employee`

### FIX 10 — P1 — Estate-wide em-dash sweep (voice law)
Pattern: replace ` — ` with a colon, comma, or period. Confirmed customer-facing instances:

- `site/opt-in.html` GUIDES catalog, 14 instances (lines 214, 234, 254, 265, 298, 309, 320, 331, 342, 353, 364, 375, 386, 397). Representative rewrites: :214 `The hierarchy — what contains what` → `The hierarchy: what contains what`; :234 `RAG, MCP, hallucination, fine-tuning — all 12 defined` → `RAG, MCP, hallucination, fine-tuning: all 12 defined`; :397 chez-manus (two dashes) → `An autonomous multi-agent brigade of planner, executor, and verifier, working browser, code, and files for hours, unsupervised.`
- `site/spotlight.json:57` `What is a prompt — and how to write one that works.` → `What is a prompt, and how do you write one that works?`; `:72` `12 AI words everyone uses — explained in plain English.` → `12 AI words everyone uses, explained in plain English.`; guide_data agentic desc `What 'agentic' means — and why it changes everything.` → `What 'agentic' means, and why it matters for your week.` (also removes "changes everything" hype).
- Meta/OG blocks: `site/free-resources.html:10` og:title `The AI Edition &mdash; Shift & Lead` → `The AI Edition · Shift & Lead`; `site/store.html:9-10,16` and `site/about.html:9-10,16` and `site/work-with-fatiha.html:9-10,16` em-dashes → commas, e.g. `Book Fatiha Chikh, The AI Automation Queen, for keynotes and hands-on AI workshops. Practical, non-technical, built from a system that actually runs.`

**Runners-up (verified, queue next):** work-with-fatiha.html:82 keynote title `How to Reclaim 20 Hours a Week with AI` fails Law 7 unless the number traces; retitle `The Freedom OS: How to Hand Your Busywork to AI`. time-audit.html:188-189 promises a "fix-first plan" email the payload cannot produce; soften to `Your result and the guide that fixes your biggest leak, in your inbox.` until the n8n branch exists. free-resources.html:701 footer `Work With Her` → `Work with Fatiha`. store.html:124-138: strip the internal strategy HTML comment (names the unlinked voice-clone-pipeline free copy) to docs/.

---

## 2. Coherence fixes: one canonical term everywhere

| Drift | Where it varies | Canonical term | Files to change |
|---|---|---|---|
| Series name: "Tool Map(s)" vs "Kitchen Map(s)" vs "the maps" | free-resources.html:295, 309, 477 (pill "Tool Maps"), 491-572 (chips "TOOL MAP" but kickers "· Kitchen Map"); about.html:103 "Kitchen Map series"; ai-tools-compared.html:71 "The Kitchen Map Series" | **Kitchen Map / the Kitchen Maps** (carries the restaurant metaphor the Chez guides are built on) | free-resources.html pill and chips → `Kitchen Maps` / `KITCHEN MAP`; :295 `Kitchen Map: Claude`; :309 per Fix 9 |
| Newsletter name + cadence | "The Insider Brief" (free-resources.html:672), "The AI Insider Brief" (time-audit.html:291), "twice a week" vs "every Tuesday" | **The AI Insider Brief, every Tuesday** | time-audit.html per Fix 4; free-resources.html:672 h3 → `The AI Insider Brief.` |
| Proof story | 137 (about, work-with-fatiha, thisweek.json, 16 guide outros, products/judges-prompts.html) vs 99 (99.html, nav) | **"hiring 99 AI employees in public, receipts"; count always sourced from the 99.html scoreboard; 137 never appears** | All 21 files from the grep in Fix 1 |
| How the site names Fatiha | "Work With Her" (free-resources.html:701) vs "Work with Fatiha" (nav, CTA band) | **Work with Fatiha** (Fatiha is a person; Shift & Lead is the wordmark) | free-resources.html:701 |
| Person voice on money pages | Third person (work-with-fatiha.html:123-124 "She/Her") vs first person everywhere else | **First person** | work-with-fatiha.html per Fix 2 |
| Nav wordmark target | `#` (free-resources.html:221), `../index.html` (opt-in.html:121), `index.html` (opt-in footer :182), `free-resources.html` (time-audit.html:137) | **`free-resources.html`** (index.html is a bare redirect) | free-resources.html:221, opt-in.html:121 and :182 |
| Slogan phrasing | "Buy once. Use forever." (store H1/meta) vs "Buy once, use forever, on every AI tool you touch" vs "...across every AI tool" (product detail pages) | **"Buy once, use forever, on every AI tool you touch"** as the long form; "Buy once. Use forever." as H1 only | site/products/*.html payoff lines |
| Title separator in meta/OG | `&mdash;` vs `·` | **Middle dot `·`** | Per Fix 10 meta sweep |
| Chip class naming | `.chip-purple` renders Electric blue (opt-in.html:37 + 9 catalog chipClass values) | **`.chip-accent`** | opt-in.html rename |
| Insider shorthand | "verdicts included" (opt-in.html:156); "Gulf-friendly" (work-with-fatiha.html:126); "brain → megaphone → net" (time-audit.html:282) | **Always translate:** `with a clear verdict on every story`; `easy to book across the Gulf and Europe`; `the exact create-once, post-everywhere setup` | Those three lines |

---

## 3. Typography normalization spec

Canon: Playfair Display (display), Source Serif 4 (body), Inter (UI only), Space Mono (labels/kickers), Electric #2C4BE0 on white. Apply this table across all site/ pages:

| Element | Font | Size | Weight | Deviations to fix |
|---|---|---|---|---|
| Nav wordmark `.nav-logo` | Playfair Display | 21px | 700 | time-audit.html defines no `.nav-logo` rule; wordmark renders in 17px body serif. Copy the rule from opt-in.html:31 |
| Hero H1 (money pages) | Playfair Display | clamp to **3.4rem** max | 400 | about.html:33 clamps 3.6rem, store.html:23 3.2rem, work-with-fatiha.html:33 3.4rem; unify at 3.4 |
| Section titles (`.spotlight-title`, `.controls-title`, `.row-title`, `.cta-title`, `.paths-title`, `.path-name`) | Playfair Display | as set | **400** | free-resources.html inline styles :246, :253 set `.paths-title`/`.path-name` at 700; change to 400 |
| Body / editorial copy | Source Serif 4 | 1rem+ | 400, line-height **1.75** | store.html:23 line-height 1.7 → 1.75; free-resources.html :254/:257/:328 set `.path-col li` and `.bip p` in Inter → inherit body serif; store.html:42 `.product p` (the sales argument) in Inter 14.5px → Source Serif 4 ~1rem |
| UI: buttons, form inputs, nav links, pills, product bullets | Inter | 13-15px | 400-600 | Keep `.path-check`, `.path-route` labels in Inter; keep product bullets in Inter |
| Labels: kickers, chips, prices, `.fmt`, progress, receipt numerals | Space Mono | 11-13px | 400 | Compliant; work-with-fatiha.html:132 inline kicker color `#7FA0FF` → a `.kicker-inverse` class |
| Chip palette | — | — | — | free-resources.html `--chip-literacy` #E63955 (BASICS 04 only) is off-palette red reading as an error state; change to `chip-track0` electric and retire the variable (update the JS fallback at :409) |
| Ink-panel body color | — | — | — | about.html:51 `.company p` #CFC8DD (purple-gray) → blue-tinted neutral, e.g. #B9C6F2 |
| Structural | — | — | — | Fold free-resources.html's two mid-body `<style>` blocks (:243-264, :325-330) into the head stylesheet; that is where the 700-weight and Inter-body drift crept in |

---

## 4. Per-page verdicts

| File | Verdict |
|---|---|
| site/free-resources.html | Strong editorial skeleton, but the spotlight hydration blanks its own cards on every load (both P0s confirmed) and the ribbon reports success before any fetch runs; the page ships worse than its fallback HTML. |
| site/spotlight.json | Cannot do its job: week keys ("27") never match the JS ("2026-W27") and `desc` never matches the renderer's `summary`/`side_summary`, so all four planned rotations silently no-op. |
| site/thisweek.json | Verified orphan (zero references repo-wide) publicly deploying the banned 137 plus em-dashes; pure liability, delete or wire in this run. |
| site/store.html | A clean shelf with nothing on it: JS-only grid, four inert Coming-soon buttons, no capture, no links to the three product pages that already exist, and internal pricing strategy readable in view-source. |
| site/about.html | The warmest, best-voiced page in the batch, and the most trust-breaking: 137 five times plus pills summing to it, directly contradicting the 99 scoreboard one click away, with no body link to 99.html. |
| site/work-with-fatiha.html | Credible speaking page that would book gigs, except the proof number is banned and contradicted on-site, fees/hours claims are untraceable (queen-brain absent), and the sole booking path is a LinkedIn DM (zero mailto: confirmed). |
| site/opt-in.html | The gate works and all 19 catalog slugs verify, but the submit handler lacks keepalive (leads can die on redirect), the honeypot skips Formspree yet not the n8n webhook, and 14 catalog em-dashes break the voice law. |
| site/time-audit.html | Genuinely good quiz mechanics, undercut by a false Brief cadence ("twice a week"), a community promise the destination doesn't back, an audit-email promise the payload can't fulfill, and an unstyled brand wordmark. |

**Sequencing note:** land Fix 1-3 (the 137 purge, all files in one commit) before anything else deploys; every other fix polishes a page that currently contradicts the brand's public proof story. Fixes 4-10 are copy-only and safe to batch. The spotlight.json/free-resources.html field and key renames must land in the same commit as each other.
---

# Funnel + Interactivity Plan — guides.shiftandlead.com
All paths relative to `/home/user/content-system/site/`. Governing principle for every paid mention: **"The guides are free forever. These are the shortcuts."** Free = understand + one first win; paid = the system + speed + updates. Every segue below is a statement about how the publication works, never a pitch. Gate on store state: while `store.html` products say Coming soon, every store segue below points at the notify block, not at a buy button.

---

## 1. The free → paid segue design, by page type

### 1a. Library (free-resources.html)

**Placement 1 — Level 03 "Operator" column (`~line 309`), second ghost CTA under the Agentic guide button.** This is the page's only missing bridge to the quiz that fronts the $47 product, and it is free and on-voice today (no store dependency):

> Not sure what to hand off first? Take the 10-minute Time Audit →

Links to `time-audit.html`. Style as the existing ghost/secondary button class.

**Placement 2 — one quiet serif line under the "Put AI to work" series-intro card (`~line 583`), added only when the store flips live:**

> The guides are free forever. When you'd rather skip the building, the ready-made versions of these setups live in <a href="store.html">the Store</a>.

**Placement 3 — the `.bip` strip (`line 333`) stops repeating the hero and advances the proof story instead:**

> Every employee I hire gets logged on a public scoreboard. This library explains, in plain English, what each one actually does. <a href="99.html">See the scoreboard →</a>

No other paid mention on this page. The cta-band (Brief / community / speaking) already carries three rungs; adding more makes the front page a brochure.

### 1b. Guide end (all 16 `guides/*.html`, the "chef's table" block, e.g. chez-claude.html:520-544)

The 3-card block is the right structure and the right location (after the reader got the free win). Fix its three defects in lockstep across all 16 files:

- **Card 1 (Prompt Menu, $19)** currently links `../store.html` where the reader meets a Coming-soon button — a dead end that teaches readers the paid links go nowhere. Until live, change the mono kicker to `Prompt pack · $19 · opening soon` and the link to `../store.html#notify` with text **"Get the opening email →"**. When live, restore **"Get it in the Store →"** pointing at `../products/prompt-menu.html` (the detail page, not the shelf).
- **Card 3 (speaking)** rewrite (also kills a 137 instance, one of 14+ that must change in the same commit — see §4):
  > Bring the whole method into your team: practical, non-technical, from someone who is hiring 99 AI employees in public and shows the receipts.
- **Add a per-track fourth line, not a fourth card** — a single serif sentence under the grid stating the model:
  > The guides stay free, always. The paid versions exist for one reason: they skip you past the building.

For the 5 guides with no outro at all (first-ai-employee, follow-up-setup, inbox-manager-setup, stack-3-tool, chatgpt-vs-ai): the 4 business-track guides should get the block with Card 1 swapped for the **$47 Time Audit** ("You just built one system. The Time Audit finds the next three." → `../time-audit.html` free quiz while store is closed, `../products/time-audit.html` after). That is the correct product-market pairing; the chez guides pair with the Prompt Menu.

### 1c. Quiz result (time-audit.html:170-199)

- **Fix the overclaim first** (line 185): the $27/first-20 promise lands on an about.html#community box that shows no price and no waitlist. Until offers.md confirms and about.html backs it, soften to:
  > Want to fix all of it with people one step ahead of you? <a href="about.html#community">The founding community is opening soon. Get on the list.</a>
- **Tier-gated store line** (added only when store is live), one Space Mono line under `.r-email`, shown only for the two heaviest tiers (Do-It-All Founder, Half-Systemized):
  > This free audit has a paid big sister: the full Time Audit system, in <a href="store.html">the Store</a>.
  System Owner tier never sees it (nothing to sell someone who already won; send them to the Brief instead).
- **Honesty guard**: the "full audit in your inbox" promise (lines 188-189) must be verified against the n8n `formspree-lead` workflow branching on `source=time-audit`; if no automation composes that email, ship the fallback copy "Your result and the guide that fixes your biggest leak, in your inbox." This is a funnel integrity issue, not polish: the audit email is the nurture entry point for the $47 product.

### 1d. The 99 page (99.html)

Already the best-wired page: cta-band → `opt-in.html?guide=first-ai-employee` with a time-audit sub-link (lines 196-200 area, verified in source). Two additions only:

- **Under each hired employee's receipt card**, when a hire corresponds to a guide or product, add one mono link line, e.g. under Nadia/Inbox Manager once hired: `Hire your own: the free Inbox Manager guide →` (`opt-in.html?guide=inbox-manager-setup`). This makes the scoreboard itself a lead-magnet index. Maintain via the same JSON the grid reads.
- **Do not add store copy here.** The 99 page is the proof asset; its conversion job is belief, then email. One CTA band is correct.

### 1e. SEO hubs (ai-tools-compared.html, ai-vocabulary-explained.html)

These pages receive cold search traffic and currently leak it (off-site "Home", hidden mobile nav, direct ungated guide links). After the gating decision (§3, item 2):

- **Above the footer line**, add a capture-first segue block (these visitors have never seen the brand):
  > **Want the maps in your inbox?** Every Kitchen Map, plus one plain-English AI briefing every Tuesday, with a clear verdict on every story. Free.
  CTA → `opt-in.html` (library fallback state, once its copy is fixed per the opt-in findings).
- **Paid mention: none.** A hub visitor is at "what is this tool" stage; the only honest segue is the free tier. The existing footer cross-link between the two hubs stays.

### 1f. Store shelf (store.html) — the segue *target* must exist

Replace the "Instant delivery" note (lines 73-75) with the **notify block** (`id="notify"` so guide outros can deep-link it):

> **While the shelves fill.** The Store opens soon. Insider Brief readers get the opening email first, and the free guides already cover the first win each of these products speeds up.
> [Email field + button "Send me the opening email"] · quiet secondary link: "Start with the free guides →" (`free-resources.html#library`)

Wire it to the existing Formspree + n8n pattern with `source:'store-notify'` so the board meeting can see store-intent emails as their own line. This is currently the only possible conversion on the page and it does not exist.

---

## 2. The interactive layer — top 5, ranked by impact ÷ effort

**#1 — Start-here diagnostic (free-resources.html, replaces passive triage). Impact: high. Effort: ~40 lines JS.**
Insert a hidden `<div class="path-quiz">` above `.paths-grid`. Three yes/no questions, one per screen: "Could you explain what AI is to a friend?", "Do you use ChatGPT or something like it at least weekly?", "Do you want AI to do tasks without you watching?" Answers map no/–/– → Level 01, yes/no or yes/yes/no → Level 02, yes/yes/yes → Level 03. On completion: add `.recommended` to the matching `.path-col` (reuse the existing `.crown` styling), scroll to it, announce via `aria-live="polite"`. Buttons reuse the existing `.pill` class; no fetch, no dependencies; the static three columns are the no-JS fallback. This converts the page's weakest block into the reader's first small win — literally the "free = one first win" law rendered as UI.

**#2 — Live 99 scoreboard strip (about.html line 115, replaces the banned dept pills). Impact: high (kills a P0 while adding proof). Effort: ~50 lines.**
Replace the seven department pills (which sum to the banned 137) with: an inline SVG progress bar "X of 99 hired", the 2-3 most recent hires each with name, role, and one-line receipt, and "See the full scoreboard →" (`99.html`). Data source: extract the hire data 99.html currently bakes into HTML into a shared `site/99-data.json` (fields: `hired_count`, `hires:[{num,name,role,dept,receipt,date}]`), have 99.html's existing grid script and this strip both read it, static fallback sentence ("I'm hiring 99 AI employees in public. The scoreboard has the receipts.") baked in HTML. **Rule learned from the spotlight bugs: JS only enhances, never blanks; the baked fallback must be complete and correct on its own.**

**#3 — Store notify block + ladder strip (store.html). Impact: high (creates the page's only conversion). Effort: notify ~30 lines, ladder pure HTML/CSS ~40 lines.**
The notify block per §1f. Above the product grid, a horizontal five-node ladder: Free guides → $19 Prompt Menu → $27 Judge's Prompts → $47 AI Time Audit → Community. Plain flexbox, inline SVG connector arrows, each node an `<a>` (guides → `free-resources.html`, products → their `products/*.html` detail pages, community → `about.html#community`), the "you are here" node (Free guides) filled Electric #2C4BE0 with white text, others outlined. Space Mono node labels, no JS at all. It answers the catalog page's unasked question ("which one first, and why these prices?") and makes the ladder read as a curriculum. **Precondition: the Business OS $97 node stays off the ladder until it traces to offers.md.**

**#4 — This-week verdict strip (free-resources.html, directly above the cta-band; revives site/thisweek.json). Impact: medium-high (shows the Brief instead of describing it). Effort: ~60 lines.**
Three `<details>` rows, one per verdict: chip in Space Mono (ACT in the existing green-ink treatment, WATCH electric, IGNORE muted, consistent with existing `.chip` styles), `<summary>` = the one-line verdict, expanded body = one supporting sentence. Closing line: "Verdicts like these, every Tuesday →" linking `brief.shiftandlead.com`. Bake the current week as static HTML; `fetch('thisweek.json')` only swaps text on success. **Preconditions (P0): delete `stat_n`/`stat_p` from thisweek.json (contains banned 137, publicly fetchable today) and de-dash the `act`/`watch` lines per the findings before wiring anything to the file.** Add updating thisweek.json to the weekly-ops runbook, same entry that should validate spotlight.json.

**#5 — "First win" peek on the opt-in gate (opt-in.html). Impact: medium (proof at the exact moment of the email decision). Effort: ~20 lines CSS + one field per catalog entry.**
Add a `peek` field to each GUIDES entry containing the guide's real first actionable snippet (2-3 lines, e.g. the prompt template opener for what-is-a-prompt). Render under the bullets as a Source Serif blockquote with a `mask-image` linear-gradient fade on the last line and a Space Mono caption "FROM PAGE ONE OF THE GUIDE". Pure HTML/CSS. This converts "trust me, it's inside" into visible evidence, and the fade is an honest tease, not a trick.

**Bench (build later, in order):** format-fit selector on work-with-fatiha.html (two radios toggling `.recommended` on the three format cards; high value per booking but low traffic); library read-state memory (localStorage checkmark on visited library rows, "pick up where you left off"); spotlight rotation itself once the P0 key/field fixes land (it is interactivity the page already paid for and never got).

---

## 3. UX flow fixes — top 10

1. **P0 — Fix spotlight hydration** (`free-resources.html:372-411` + `spotlight.json`): rename weeks keys to `"2026-W27"` format (year-prefixed, safe across year boundaries), rename JSON `desc` → `summary`/`side_summary` OR point JS at `.desc` (one commit, both files), add per-slug `cta` field so hydration stops erasing the crafted CTA lines. Until fixed, the script makes the page strictly worse than its own fallback; if the fix can't ship this run, comment out the hydration call.
2. **P0 — Pick one gating model and align sitemap.xml + hubs + guide cross-links.** Today the sitemap hands all 16 gated guide URLs to Google while the funnel pretends they're email-gated. Recommended: model (a) — guides are ungated SEO assets; keep sitemap, keep hub direct links, and add an in-guide capture block above the fold of every guide ("Get every guide + the Tuesday Brief"). This monetizes search traffic instead of fighting it and resolves the robots.txt/sitemap intent conflict deliberately. If (b) gated is chosen instead: strip the 16 URLs from sitemap.xml, add `noindex`, point both hubs' cards at `opt-in.html?guide=SLUG`.
3. **P1 — Make email capture reliable on all four capture surfaces.** free-resources ribbon (lines 738-759): await the Formspree fetch, show "Subscribed!" only on `res.ok`, re-enable with "Try again" on failure. opt-in.html (452-471) and time-audit.html forms: add `keepalive:true` to both fetches; gate the n8n webhook behind the `_gotcha` honeypot (opt-in) and add the missing honeypot to time-audit; extract the shared block to `site/lib/capture.js` so the fix lands once. These forms are the page's entire job; today they can silently lose the lead.
4. **P1 — Ship `site/privacy.html` and link it from all four footer systems** (free-resources/opt-in dark footer, about/store/wwf/products light footer, 99/time-audit minimal footer, guides ipbar). Four surfaces capture emails with zero privacy link; the primary capture domain has a compliance hole.
5. **P1 — Nav normalization, one sweep:** `free-resources.html:221` logo off `#` → `free-resources.html`; 4 guide logos off `https://shiftandlead.com` (chez-kimi:166, chez-manus:177, chez-meta-ai:179, chez-mistral:176, dropping `target="_blank"`) → `../free-resources.html`; both hubs' "Home" off the .com site → `free-resources.html`; opt-in.html seven `../` prefixes stripped and logo off `../index.html`; hub mobile nav unhidden (replace `display:none` at ai-tools-compared:61 / ai-vocabulary-explained:55 with free-resources' wrap pattern); add "The 99" to all three `products/*` navs (proof story is missing exactly where money is asked for).
6. **P1 — Store detail-page loop:** render the four product cards as static HTML (grid currently blank without JS), link each card h3 to its `products/*.html` page, point detail-page buy buttons at the notify block until payment URLs exist. Pull the Business OS card until it traces to offers.md and has a detail page.
7. **P1 — Booking path on work-with-fatiha.html (131-136):** email primary (`mailto:` with `subject=Speaking%20enquiry` or the GHL form), LinkedIn demoted to ghost secondary; add "See the receipts →" (`99.html`) after the why-cards; add the wrong-reader exit line "Not booking an event? Start with the free guides."
8. **P1 — Proof wiring on about.html:** "See the scoreboard →" inside the company box (109-117) and the 99.html link in the "real numbers, real screenshots" sentence (113). The trust page must link its own receipt.
9. **P2 — Wordmark and hero discipline:** define `.nav-logo` on time-audit.html (currently renders in body serif — the brand element itself); standardize wordmark at 21px desktop / 20px mobile sitewide; unify the money-page h1 clamp and drop products' Playfair 900 to 400/700.
10. **P2 — Console and state hygiene:** ship permanent `site/current.json` `{"active":false}` (kills the 404 on every flagship load); fix time-audit progress bar to `(current+1)/8`; hide the "0 full work-weeks" span when weeks === 0; move the free-resources ribbon below the pull quote and measure via the existing `source:'ribbon'` tag.

---

## 4. Remove outright

- **`thisweek.json` `stat_n`/`stat_p` fields — this run, before anything else.** Banned 137, publicly fetchable at guides.shiftandlead.com/thisweek.json right now. Remove the fields (keep the file for the §2#4 strip) or delete the file entirely if the strip isn't built.
- **`store.html:124-137` HTML comment** — internal pricing strategy and the URL of an unlinked free copy of a retired paid product, shipped in public page source. Move to `docs/PRODUCTS-LAUNCH-CHECKLIST.md`, strip from the page.
- **`guides/voice-clone-pipeline.html`** — delete from `site/` (zero inbound links; its only pointer is the strategy comment above; "unlisted" is not a protection once the comment names it). Keep the source in git history or move under `docs/` if the content is wanted later.
- **The Business OS Starter Kit card** (`store.html:108-114`) until it traces to queen-brain/offers.md and has a detail page. Never ship a price that doesn't trace.
- **`--chip-literacy` #E63955** (free-resources.html:33/104/622 + JS fallback at 409) — off-palette red that reads as an error state; BASICS 04 joins `chip-track0`.
- **The department pills row** (about.html:115) — replaced by the scoreboard strip (§2#2); the pills' sum *is* the banned number.
- **Two of the three "You're not behind" instances on free-resources** (keep the pull quote at 237; rewrite 343 via the spotlight fix and 648 to "Nobody ever sat you down and told you. Here it is, in 4 lines.") plus the hub/guide echoes (ai-vocabulary-explained:74, what-is-ai:183) — a brand line once, a tic at seven.
- **The duplicate og:description** shared verbatim (em-dash included) across free-resources + 5 guides — each guide gets its own de-dashed standfirst as description.
- **The mid-body `<style>` blocks** (free-resources.html:243-264, 325-330) — fold into the head stylesheet; they are where the weight-700 and Inter-body drift originated.
- **Not removed but lockstep-mandatory:** the 137→99 sweep is one commit across the full 21-file inventory (about, work-with-fatiha, thisweek.json, 3 products, 16 guides ×2 instances) or the contradiction merely relocates; and the "twice a week" Brief cadence on time-audit.html:291/382 dies in favor of "every Tuesday" (18-to-2 canon, verify against `ai-insider-brief/` config first).

**Sequencing:** (1) thisweek.json stat removal + store comment strip + voice-clone delete (public exposure, minutes of work); (2) the 137→99 one-commit sweep; (3) capture reliability + privacy.html; (4) spotlight P0 fix + nav sweep; (5) gating decision; (6) segue copy per §1; (7) interactive layer in §2 rank order.
---

# Appendix A — Cross-cutting consistency audit

# Cross-page consistency audit — guides.shiftandlead.com (verified from source, 2026-07-07)

All paths relative to `/home/user/content-system/site/`. Verdicts below were re-checked with grep/ls against the working tree; reader findings are confirmed unless marked otherwise, and findings tagged **[NEW]** were not in any per-page report.

---

## 1. Navigation — four incompatible nav systems ship today

| Nav family | Pages | Links | Logo target |
|---|---|---|---|
| A. Money nav (7 links: Home, Free Resources, The 99, Brief, About, Store, Work with Fatiha) | free-resources, 99, about, store, work-with-fatiha | consistent | `free-resources.html` — except **free-resources.html:221 `href="#"` (dead)** |
| B. Guide nav (5 links; NO "Home" label, NO "The Insider Brief") | all 16 guides/ | consistent among themselves | 12 → `../free-resources.html`; **4 deviate (see below)** |
| C. Product nav (5 links; **omits "The 99" entirely**, order differs: Free Resources, Brief, Store, About, WWF) | products/judges-prompts:83, prompt-menu:91, time-audit:104 | — | `../free-resources.html` |
| D. Hub nav (3 links: All Guides, sibling hub, "Home") | ai-tools-compared:66, ai-vocabulary-explained:63 | — | `free-resources.html` |

- **P1 [NEW] — logo exits the funnel domain on 4 guides.** `guides/chez-kimi.html:166` and `guides/chez-manus.html:177` set logo `href="https://shiftandlead.com"`; `guides/chez-meta-ai.html:179` and `guides/chez-mistral.html:176` do the same **with `target="_blank"`**, so tapping the brand wordmark opens the .com site in a new tab mid-read. Hurts: reader leaves the capture domain from the highest-traffic element on the page. Fix: `href="../free-resources.html"`, drop target/rel, on all 4.
- **P1 [NEW] — hub "Home" goes off-site.** `ai-tools-compared.html` and `ai-vocabulary-explained.html` nav "Home" → `https://www.shiftandlead.com`. These are the SEO entry pages; their only "Home" sends cold search traffic to the brand site with no capture. Fix: `href="free-resources.html"` labeled "Home".
- **P1 (confirms reader) — hub mobile nav vanishes.** `ai-tools-compared.html:61` and `ai-vocabulary-explained.html:55`: `@media (max-width:600px){.nav-links{display:none}}` with no hamburger. Mobile search visitors get wordmark only. Fix: copy free-resources.html's ≤600px wrap pattern (its :175 block shrinks, never hides).
- **P2 [NEW] — products nav has no route to The 99.** The proof story is absent exactly on the pages asking for money. Add "The 99" between Free Resources and Brief in all three products/ navs.
- **P2 — opt-in.html:121 logo → `../index.html`** (meta-refresh page, phantom `../` from site root). Standardize sitewide: logo → `free-resources.html` (as 99.html:117 already does). index.html is redirect-only (verified, 9 lines).
- **P2 [NEW] — wordmark renders at three sizes:** 21px (99:42, free-resources:51, opt-in:31, chatgpt-vs-ai:36, first-ai-employee:47, follow-up-setup:47, inbox-manager-setup:47, stack-3-tool:47), 20px (about:27, store:26, work-with-fatiha:27, all products:27), 19px (the other 13 guides, e.g. chez-claude:29). Pick 21px/20px-mobile once.
- **P1 (confirms reader) — time-audit.html uses class `nav-logo` at :137 but never defines it**; wordmark falls back to body serif. Fix: add opt-in.html:31's rule.

## 2. Footer — four footer systems, zero privacy links

- Dark multi-column footer: free-resources (:691-706) and opt-in only. **free-resources.html:701 `Work With Her` is the sole "Her" reference sitewide (confirmed unique)** → "Work with Fatiha".
- Light socials + © footer: about, store, work-with-fatiha, all 3 products (LinkedIn/Instagram/Brief + "© 2026 Fatiha Chikh / Shift & Lead").
- Link-less minimal footer: 99.html (:214-216, zero links — confirmed) and time-audit.html.
- Guides: no `<footer>` at all; byline block + `ipbar` IP notice (e.g. chez-claude.html:546-556).
- **P1 [NEW, extends reader] — no privacy/terms page exists anywhere in site/** (only "privacy" string is opt-in.html:156's form note), while **four** surfaces capture emails: free-resources ribbon, opt-in form, time-audit form, and the 16 guide-end capture forms. This is a sitewide compliance gap, not a free-resources-only one. Ship `site/privacy.html` and link it from all four footer systems.

## 3. Typography deviation table (canon: Playfair display / Source Serif 4 body / Inter UI / Space Mono labels / #2C4BE0)

All pages load the four canon families (fonts.googleapis check). Deviations:

| What | Canon-consistent value | Deviants |
|---|---|---|
| h1/display weight | 400 (99:51, hubs:44, time-audit:55, guides) | **700**: about:33, store:32, work-with-fatiha:33; **900** [NEW]: products/judges-prompts:33, prompt-menu:33, time-audit:33 (Playfair 900 is loaded, but the sales pages are the loudest family on the quietest brand — drop to 700) |
| h1 clamp max | — | 76px (99), 3.6rem (about), 3.4rem (wwf + 3 products), 3.2rem (store), 56px (time-audit), 50px (hubs). Unify at least the 3 money pages (reader-confirmed) |
| body line-height | 1.75 (about:23, wwf:23, products:23) | store.html:23 = 1.7 |
| Kicker face | Space Mono everywhere (about:32, 99:50, hubs:43) | **[NEW]** free-resources.html:56 `.hero-kicker` is Playfair *italic* 28-38px — decide if deliberate hero treatment; if not, Space Mono |
| Body copy in Inter | Source Serif 4 | free-resources.html:254 (.path-tag), :257 (.path-col li 14.5px), :328 (.bip p) — confirmed in source; also store.html:42 .product p (reader-confirmed) |
| Display weight in start-here | 400 | free-resources.html:246 (.paths-title), :253 (.path-name) = 700 — confirmed |
| Inline style blocks mid-body | head stylesheet | free-resources.html:243-264, :325-330, plus inline font styles at :230, :486, :583 |
| Off-palette red | — | free-resources.html --chip-literacy #E63955 (reader-confirmed) |

## 4. Duplicated copy blocks (lockstep-edit inventory)

- **"…company of 137 AI employees. I build everything I teach."** — verbatim byline in **16 guide files** (2 hits each except chatgpt-vs-ai:393 with 1) + near-verbatim third-person variant in **products/judges-prompts.html:204, prompt-menu.html:242, time-audit.html:309** + about.html. **20 files must change together** in the 99-rewrite or the contradiction survives partially fixed.
- **"Bring the whole method into your team… business runs on 137 AI employees."** — 14 guides. Internal drift: 10 use a colon after "team", 4 use a comma (what-is-a-prompt:415, what-is-agentic:485, chez-meta-ai:509, ai-jargon-guide:437). The 4 business-track guides (first-ai-employee, follow-up-setup, inbox-manager-setup, stack-3-tool) and chatgpt-vs-ai have no speaking outro at all — **[NEW]** decide whether that's intentional before the rewrite.
- **Insider Brief cadence:** "every Tuesday" in 18 places (free-resources:671, opt-in:156, 16 guides) vs **"twice a week" only in time-audit.html:291 and :382**. Tuesday is canon by 18-to-2; rewrite the two time-audit lines (verify against ai-insider-brief/ config first).
- **"You're not behind"** — 7+ customer-visible instances: free-resources:237, :343, :648; opt-in.html:170 (identical pull quote) and :199 (catalog desc); ai-vocabulary-explained.html:74; guides/what-is-ai.html:183. Reader counted 3; sitewide it's a tic across 4 files. Keep pull quotes on free-resources + opt-in, rewrite the row/catalog/hub copies.
- **P2 [NEW] — duplicate og:description across 6 URLs:** "AI, explained quietly. Free guides by Fatiha Chikh — The AI Automation Queen." verbatim (em-dash included) on free-resources.html:11 and guides/{ai-jargon-guide:11, chatgpt-vs-ai:11, what-is-a-prompt:10, what-is-agentic:11, what-is-ai:7+11}. Duplicate metas across distinct URLs hurt SEO and multiply the em-dash fix. Give each guide its own one-line description (its standfirst, de-dashed).

## 5. CTA / opt-in catalog integrity — VERIFIED CLEAN, with one exposure

- All **19 distinct `opt-in.html?guide=SLUG` slugs** referenced sitewide (free-resources ×20 links, 99.html→first-ai-employee, time-audit ×3, guide cross-links in first-ai-employee/follow-up-setup/stack-3-tool) exist **both** in opt-in.html's GUIDES catalog **and** as files in guides/. Zero mismatches.
- `guides/voice-clone-pipeline.html`: on disk, absent from catalog, sitemap, and every href (grep-confirmed 0 inbound). Consistent with retirement — **but store.html:124-137's public HTML comment names its URL**, so "unlisted" only holds until someone views source. Strip the comment (reader-confirmed) or delete the file.
- **P0 [NEW] — the email gate is structurally bypassed by sitemap.xml.** The sitemap submits **all 16 gated guide URLs** (guides/*.html) directly to Google; combined with ai-tools-compared's 7 and ai-vocabulary-explained's 5 direct `guides/*.html` hrefs (the second hub was not in the reader's finding), any searcher reaches the full gated library with zero capture, while the board metric is emails. Decide one model this run: (a) guides are ungated SEO assets → keep sitemap, add an in-guide capture block above the fold; or (b) guides are gated → remove the 16 URLs from sitemap.xml, add `noindex` to guide pages, and point both hubs' cards at `opt-in.html?guide=SLUG`. Current state is the worst of both.
- **P2 [NEW]** — Gating is also inconsistent *between* guides: business guides cross-link via `../opt-in.html?guide=` while chez guides link each other directly (`./chez-openai.html` etc.). Align with whichever model wins above.

## 6. Banned tokens

**"137" — 44 customer-visible instances in 21 deployed files** (reader lists undercounted; full set):
- about.html:10, :16, :78, :102, :111, :112, plus :115 dept pills summing 22+24+23+19+17+14+18 = 137 (verified).
- work-with-fatiha.html:72, :124.
- thisweek.json:5 (`stat_n`), publicly fetchable.
- products/judges-prompts.html:204, prompt-menu.html:242, time-audit.html:309.
- 16 guides ×2 (outro + byline; chatgpt-vs-ai ×1 at :393): chez-claude:539+550, chez-openai:452+463, chez-gemini:477+488, chez-copilot:455+466, chez-grok:529+540, chez-mistral:498+509, chez-deepseek:499+510, chez-kimi:477+488, chez-meta-ai:509+520, chez-manus:456+467, what-is-ai:418+429, what-is-a-prompt:415+426, what-is-agentic:485+496, ai-jargon-guide:437+448.
Fix must land as one commit across all 21 files or the 99/137 contradiction just relocates.

**Em-dashes (— and &mdash;) in customer-visible text — ~45 instances:**
- Meta/og/title: about:9,10,16; free-resources:10(&mdash;),11; store:9,10,16; work-with-fatiha:9,10,16; 99:8(&mdash;),13(&mdash;); opt-in:7(&mdash; in `<title>`); guides ai-jargon:10,11; chatgpt-vs-ai:10,11; what-is-a-prompt:9,10; what-is-agentic:7,10,11; what-is-ai:7,10,11.
- Rendered body/JS: opt-in catalog descs ×15 (:213,:234,:254,:265,:287,:298,:309,:320,:331,:342,:353,:364,:375,:386,:397 — reader said 14, it's 15 lines) **plus [NEW] opt-in.html:417** — JS writes `guide.title + ' — Shift & Lead'` into the tab title on every gated visit. **[NEW] guides/what-is-agentic.html:435, :436, :442** — the only in-body &mdash; instances in any guide ("start at Level 2 or 3 &mdash; chat with tools…"); replace with commas/periods.
- spotlight.json:57, :63, :72 (reader-confirmed).
- Guide bodies otherwise clean; remaining — hits are CSS/HTML comments (not customer-visible, ignore).

**"Skool": 0 occurrences sitewide. CLEAN.**

**Dead hrefs:** every internal href in all 32 HTML files resolves on disk except `free-resources.html:221 href="#"` (logo). opt-in.html's seven `../` paths work only by origin-root clamping (reader-confirmed; strip the prefix). sitemap.xml: 27/27 URLs resolve; products/*, opt-in, voice-clone-pipeline correctly absent. `store.html`'s `'+p.url+'` hit is a JS template, not a link.

**[NEW] P2 — robots.txt vs sitemap intent conflict:** robots.txt blocks 14 AI crawlers to protect the guides as IP, while sitemap.xml hands the same gated guide content to Google. Not wrong, but resolve deliberately alongside the §5 gating decision.

---

**Top 5 actions by impact:** (1) one-commit 137→99 sweep across the 21-file inventory above; (2) pick a gating model and align sitemap.xml + both hubs + guide cross-links; (3) ship privacy.html into all four footer systems; (4) em-dash sweep using the exact line list (metas, opt-in catalog+`:417`, what-is-agentic body, spotlight.json); (5) nav normalization: 4 guide logos back on-domain, hub "Home" on-domain, hub mobile nav visible, free-resources logo off `#`, The 99 into products nav.
---

# Appendix B — Verification pass (skeptic)

FACT-CHECK RESULTS — 15 most consequential claims, verified against source (2026-07-07)

1. **P0 — spotlight.json week keys never match getISOWeek(): CONFIRMED.** `site/free-resources.html:378` returns `date.getFullYear() + '-W' + String(weekNum).padStart(2,'0')` (e.g. "2026-W27"); `site/spotlight.json:10-31` keys are bare `"27"`, `"28"`, `"29"`, `"30"`. No lookup ever hits; weeks 27-30 never air.

2. **P0 — hydration reads fields spotlight.json doesn't have, blanking descriptions and erasing crafted CTAs: CONFIRMED.** `free-resources.html:397` reads `guide.summary`, `:411` reads `item.data.side_summary || item.data.summary`; every entry in spotlight.json's `guide_data` (lines 40-89) provides only `desc`. Both renderers hardcode the generic CTA `'Read the guide →'` (`:398`, `:412`). On successful load the script replaces baked cards with empty-paragraph versions.

3. **P0 — thisweek.json is orphaned and publicly ships the banned 137: CONFIRMED.** Repo-wide grep for `thisweek` returns zero content matches (no HTML/JS/skill references it). `site/thisweek.json:5` is `"stat_n": "137"`; lines 2-3 contain em-dashes (`\u2014`). It sits in site/ on the deploy path.

4. **P0 — about.html states 137 five times plus dept pills summing to 137: CONFIRMED.** Hero sub `:78`, receipt `:102`, H2 `:111`, body `:112`, plus meta hits (grep: 6 occurrences in file). Dept pills `:115`: 22+24+23+19+17+14+18 = 137. Company section (`:109-117`) has no link to 99.html; the only 99.html path is the nav (`:69`). `:113` promises "real numbers, real screenshots, every week" with no link — confirmed.

5. **P0 — work-with-fatiha.html 137 in hero and why-card: CONFIRMED.** `:72` "a company of 137 AI employees", `:124` "operated by 137 AI agents" (third person "She/Her" also confirmed). Also confirmed nearby: unverifiable "Reclaim 20 Hours a Week" keynote title `:82`; fees $5,000/$8,000/$15,000 at `:85/:93/:101` with `queen-brain/` absent from the session (`ls` fails), so fees/ladder cannot be traced — the "verify before deploy" claim stands.

6. **P0 — sitemap.xml hands the gated guides to Google: CONFIRMED, undercounted.** `site/sitemap.xml` contains **19** `guides/*.html` `<loc>` URLs (report said 16) — all guides except voice-clone-pipeline, including the business track. The gate (opt-in.html?guide=) is structurally bypassed for search traffic.

7. **P1 — ribbon form lies on failure: CONFIRMED.** `free-resources.html:744-746` sets `btn.innerHTML='<strong>Subscribed!</strong>'` and `btn.disabled=true` BEFORE the two fetches (`:748-758`), which have no `.then`/`.catch`/`await`. A failed request is silently swallowed after showing success.

8. **P1 — Level 02 reading order contradicts its CTA: CONFIRMED (lines off by one).** `free-resources.html:295` route says "Basics 3 → Tool Map: Claude → the rest of the maps"; `:296` CTA is `href="opt-in.html?guide=chez-claude"` "Enter Chez Claude →". Also confirmed: `:309` Level 03 route ends "the next step below" with nothing so labeled; `:278` reads exactly `You think ChatGPT <em>is</em> AI (it isn't, almost)`.

9. **P1 — opt-in submit can lose the lead on navigation: CONFIRMED.** `opt-in.html:452-463` — two `fetch()` calls, neither has `keepalive: true`; `:469-471` redirects via `setTimeout(..., 900)`. Also confirmed: the n8n webhook (`:459-463`) omits the `_gotcha` value entirely, so honeypot-filling bots still become GHL contacts.

10. **P1 — store product grid is JS-only: CONFIRMED.** `store.html:71` is `<div class="grid" id="products"></div>` (empty); cards are built by `PRODUCTS.forEach` + `innerHTML` at `:140-156`. No-JS/non-executing crawlers get a blank shelf. Rendered `<h3>` (`:147`) has no anchor — product detail pages `site/products/{judges-prompts,prompt-menu,time-audit}.html` exist on disk but cards never link to them; Business OS Starter Kit ($97, `:107-114`) has no detail page (`ls site/products/` shows only 3 files) and cannot be traced to offers.md (queen-brain absent).

11. **P1 — internal strategy ships in public page source: CONFIRMED.** `store.html:124-138` HTML comment explains the Voice Clone Pipeline retirement, calls the method "too close to the core IP to sell standalone at low ticket," and names `site/guides/voice-clone-pipeline.html` — which exists on disk and has zero inbound links anywhere else (grep: the comment is the sole reference).

12. **P1 — four guide logos exit the funnel domain: CONFIRMED, exact lines.** `guides/chez-kimi.html:166` and `chez-manus.html:177` → `href="https://shiftandlead.com"`; `chez-meta-ai.html:179` and `chez-mistral.html:176` add `target="_blank" rel="noopener"`.

13. **P1 — no privacy page anywhere while four surfaces capture emails: CONFIRMED.** No `site/privacy.html` (ls fails); grep for "privacy" across site/*.html finds only the opt-in form note (`opt-in.html:156`) and guide body copy about vendor privacy — zero policy links in any footer. Capture surfaces confirmed: ribbon (`free-resources.html:213-218`), opt-in form, time-audit form, guide-end forms.

14. **P1 — front-page nav logo is a dead link: CONFIRMED.** `free-resources.html:221` `<a class="nav-logo" href="#">`. The ribbon being the literal first body element (`:213`, before `<nav>` at `:220`) is also confirmed.

15. **P1 — "every Tuesday" vs "twice a week" cadence contradiction: CONFIRMED.** `time-audit.html:291` and `:382` say the Brief arrives "twice a week"; `opt-in.html:156` says "one curated AI briefing every Tuesday". (ai-insider-brief/ config not checked; the on-site contradiction itself is real.)

Discrepancies found while verifying (none overturn a claim): "137" grep = 42 occurrences in 22 files, one of which is `site/lib/lucide.min.js` (false positive) — so 41 customer-relevant across 21 deployed files, vs the cross-cut's "44 in 21"; per-guide distribution (14 guides x2, chatgpt-vs-ai x1, business guides x0) matches the cross-cut. free-resources line refs in the page report run one high (279→278, 296→295-296). sitemap gated-guide count is 19, not 16. Also independently confirmed: `site/current.json` does not exist (the `fetch('current.json')` at free-resources.html:423 404s every load), and work-with-fatiha.html has zero `mailto:` — the LinkedIn DM (`:135`) is the sole booking path.

Score: 15/15 CONFIRMED (two with corrected counts/line numbers, direction and severity intact). The two P0 spotlight bugs compound: even if week keys matched, hydration would still blank every description.