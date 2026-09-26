# Shift & Lead UX Audit

**Repository:** `The-Ai-automation-Queen/content-system`  
**Audit date:** 2026-09-26  
**Reference:** [saadiakaram.ai](https://saadiakaram.ai)  
**Scope:** Published `main-site/`, Next.js guide publisher, content inventories, navigation, conversion paths, and existing validation output.

## Executive conclusion

Shift & Lead already has a strong **learning experience**. The guide library is more task-oriented than a typical resource page: it has search, outcome filters, level filters, rich guide pages, copyable prompts, interactive walkthroughs, progress indicators, related guides, and privacy-aware email gates.

The main weakness is not the guide content. It is the **front door and commercial journey**:

> Visitors can understand the ideas, but they still have to work too hard to understand who the site is for, what they can hire or buy, what outcome each offer creates, and what to do next.

Saadia Karam’s site is a useful reference because it makes the offer ladder explicit: **transformation consulting → practical sprints → private session → custom AI systems**, while the free guide library acts as the entry point. Shift & Lead currently exposes the free layer clearly but keeps the paid/high-intent layer fragmented, pre-launch, unpriced, or unlisted.

## What is already working well

### 1. The guide library is outcome-led

The live guide library currently has **47 live guides** across eight visitor outcomes:

- Understand AI
- Use AI safely
- Choose an AI tool
- Get better answers
- Create content
- Automate a task
- Build an agent
- Run business operations

The library hero starts with a task question, not a generic “resources” label. The search input, outcome filters, level filters, guide counts, and “start with the essentials” links are all strong UX choices.

### 2. Guide pages are designed for action

The guide system includes:

- a concrete promise for each guide
- reading time and difficulty metadata
- interactive walkthroughs and decision points
- copyable prompts/instructions
- explicit checking and human-approval steps
- related guides to continue the journey
- email capture at the guide boundary
- scroll progress and reduced-motion support

This is the strongest product surface in the repo and should be preserved rather than replaced.

### 3. The brand has a clear point of view

`data/site.json` contains a useful foundation:

- Promise: “Find what you actually need from AI without losing the judgment, creativity and experience that make your work yours.”
- Audience: professionals and business owners who want AI to support their work without losing their voice.
- Identity: Fatiha Chikh, AI educator and business architect, with 20 years translating new technology into useful work.

That is differentiated. The site should make this positioning more visible and commercially legible.

## Highest-impact UX gaps

### P0 — Make the commercial path visible from the homepage

**Current state:** The primary navigation is only Guides, Workbooks, Where AI Fits, and About. `data/site.json` records only two offers, both with unresolved price placeholders. `how-i-can-help.html` exists but is not in the primary navigation. The home page has no direct “work with Fatiha” CTA.

**Why this matters:** Saadia’s homepage quickly answers “What can I hire you for?” Shift & Lead currently answers “What can I learn?” much better than “How can you help me apply this?”

**Recommended change:** Add a clear, reader-facing “Work with me” or “For your team” entry point, with three concrete paths:

1. **Learn** — free guides and workbooks
2. **Decide** — Where AI Fits / AI Decision Lab
3. **Build** — facilitated implementation, workshops, or a build sprint

Do not invent pricing. Use one of:

- a verified price
- “From £___” once approved
- “Apply / enquire” or “Request a conversation” for custom work

**Likely source files:** `main-site/index.html`, `main-site/how-i-can-help.html`, `main-site/workshops.html`, `main-site/build-sprint.html`, `data/site.json`, `data/page-status.json`.

### P0 — Give each offer an outcome, format, audience, and next step

**Current state:** The workbook pages have useful “who it is for / what you work through / what you leave with” structure. The Map page has a good seven-decision narrative. But the broader offer architecture is not consistent, and some offers remain described as being developed or waitlist-only.

**Recommended offer-page contract:** Every offer card or landing page should answer, above the fold:

- **Who it is for**
- **The problem or decision it addresses**
- **What changes afterward**
- **Format and time commitment**
- **What is included**
- **What it costs or how to enquire**
- **One primary CTA**

This is the most important pattern to borrow from saadiakaram.ai: each offer is presented as a distinct job-to-be-done, not as a generic capability.

### P0 — Add a proof architecture, not only testimonials

**Current state:** The homepage has two testimonials and a founder portrait. It does not currently make the strongest credibility signals scannable as a visual trust layer.

**Recommended change:** Add a compact proof strip between the hero and the offer chooser:

- **Experience:** Dell · Intel · Microsoft · Quest, once approved for public use
- **Role/credibility:** AI educator · business architect · 20 years translating technology into useful work
- **Outcomes:** 2–3 specific client results, not only praise
- **Optional:** logos or “selected experience” wording where logo rights are not established

The proof strip should support the promise, not compete with it. Saadia’s “20 years at Microsoft, Meta, TikTok” and reference carousel work because the credibility is visible before the visitor has to trust a long About page.

### P1 — Add a homepage capture/conversation path

**Current state:** The main homepage has no form. The guide pages contain email gates, but visitors who are not ready to open a guide have no clear low-friction way to stay connected or start a conversation. The quiz is marked unlisted and the community URL is empty.

**Recommended change:** Add one intentional low-friction capture path near the bottom of the homepage:

- “Tell me what you are trying to make possible” → contact / interest form, or
- “Get the next useful guide for your situation” → short email capture with an outcome selector.

Keep the guide email gate for guide access. Avoid adding multiple competing newsletter forms.

### P1 — Create an explicit “choose your next step” model

**Current state:** The homepage’s three starting points are useful, but they mix learning needs and business decisions without a visible progression into paid work.

**Recommended change:** Make the path explicit:

```text
I want to understand AI → Guides
I want to find what is uniquely mine → Workbooks
I want to decide where AI belongs → Where AI Fits
I want help applying it to my work/team → Work with Fatiha
```

This preserves the existing free-guides layout while making the next step obvious for higher-intent visitors.

## Guide-library improvements

### Preserve the architecture; improve the “catalog” layer

The guide library is already close to the best part of the reference experience. Improve it rather than rebuilding it.

Recommended additions:

1. **Persistent journey context** — show the current outcome filter in the URL or a shareable query state so a visitor can return to “Use AI safely” without losing context.
2. **Recommended first guide** — one “Start here if you are new” card per outcome, not just the global foundation links.
3. **Guide freshness labels** — distinguish evergreen guides from tool/version-sensitive guides using the existing `dateModified` and status fields.
4. **Consistent covers** — remove generic/reused artwork where possible. The inventory shows a duplicate `learn-master.webp` cover and the validation reports missing covers for legacy entries.
5. **Next-step bridge** — after a guide, route the reader to either a related guide, a workbook, Where AI Fits, or a relevant conversation. The current related-guide system is a good foundation for this.
6. **Search empty state** — show a useful fallback such as “Try one of these outcomes” rather than only a no-results message.

## Navigation and information architecture

### Recommended navigation

Keep the existing four content tabs, but add a clear commercial route:

- Guides
- Workbooks
- Where AI Fits
- **Work with me**
- About

If “Work with me” is too broad, use **For teams** for the workshops/implementation path and keep a secondary CTA for individual work.

On mobile, the current details-menu pattern is serviceable. Add the commercial CTA as a visually distinct final action, and keep all links in one consistent shell across the static site and Next.js guide pages.

### Footer

The footer should include:

- Explore: Guides, Workbooks, Where AI Fits
- Work with me: Workshops, Build Sprint / facilitated work, Contact
- About: About Fatiha, LinkedIn
- Legal

Do not expose retired routes or empty waitlist destinations.

## Technical and publishing issues found

The repository’s own `npm run validate` and `npm run validate:guides` currently report **18 of 23 checks failing**. Some failures come from legacy/retired files, but the underlying hygiene still affects confidence and can create real UX problems.

### Highest-priority technical cleanup

1. **Broken guide links and redirect targets** — validation reports 124 broken links and 17 redirect-integrity failures, mostly old `.html` guide URLs after the clean URL migration. Update internal links to `/guides/<slug>/` and keep permanent redirects only for external/legacy traffic.
2. **Shared shell drift** — validation reports nav/footer drift and missing `chrome:nav` / `chrome:footer` markers across exported guide pages. Visitors should see the same header, footer, active-state behavior, and CTA treatment everywhere.
3. **Accessibility** — 141 missing/empty-alt findings are reported. Decorative images should use `alt="" aria-hidden="true"`; meaningful instructional images need descriptive alt text.
4. **Stale/retired page hygiene** — retired and moved pages still exist in the source tree. Keep them if redirects require them, but clearly separate them from publishable content and prevent them from being treated as live UX surfaces.
5. **Metadata quality** — 62 title/description length issues and three workbook pages without `og:image`. Fix high-intent pages first: About, Workbooks, Where AI Fits, Workshops, Build Sprint, and Contact.
6. **Duplicate/empty heading structure** — 23 pages fail the heading check because legacy/moved pages have no H1. Redirect or noindex these pages consistently instead of letting them behave like content pages.
7. **Unresolved offer data** — five TODO price/offer items remain in `data/site.json` and related data. Do not publish invented prices, but replace TODOs with approved “on request” or “apply” language when the offer owner confirms it.

## Recommended implementation order

### Phase 1 — Commercial clarity

- Add the commercial CTA to the shared nav.
- Create or refine one “Work with me” overview page.
- Add the four-path chooser to the homepage.
- Add proof strip with approved experience references.
- Add one bottom-of-page conversation/capture CTA.

### Phase 2 — Offer page consistency

- Normalize the offer-page contract across Workbooks, Where AI Fits, Workshops, and Build Sprint.
- Replace vague or internal-facing labels with outcome-led copy.
- Add approved format/time/price-or-enquiry information.
- Make every page’s primary CTA unambiguous.

### Phase 3 — Cross-surface shell and accessibility

- Unify static `main-site` and Next.js guide header/footer.
- Fix old guide links and redirect targets.
- Resolve meaningful image alt text and decorative-image semantics.
- Fix metadata and social previews.
- Remove or isolate retired-page noise from validation.

### Phase 4 — Guide discovery polish

- Add outcome-specific “start here” recommendations.
- Improve cover uniqueness and missing-cover handling.
- Add freshness/version labels.
- Persist filter state in shareable URLs.
- Strengthen post-guide bridges into Workbooks, Where AI Fits, and the commercial path.

## Bottom line

Do **not** rebuild the guides to imitate saadiakaram.ai. Your guide system already has a strong, practical learning UX. Borrow Saadia’s clarity of **offer architecture, proof placement, and next-step sequencing** for the main site:

> Make the free library the entry point, make the transformation visible, and make the path to working with Fatiha impossible to miss.

The first implementation should focus on the front door and commercial journey, while preserving the existing guide library and publishing workflow.