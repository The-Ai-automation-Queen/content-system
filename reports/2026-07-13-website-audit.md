# Website audit: shiftandlead.com + guides.shiftandlead.com

Date: 2026-07-13
Scope: every page in `main-site/` (www.shiftandlead.com) and `site/` (guides.shiftandlead.com), plus the cross-domain seams to brief.shiftandlead.com. Focus areas requested: text density, page animation, and coherence of connections between pages.

## Verdict in one paragraph

Both properties share one clean blue/white design system and a coherent free-to-paid funnel, but they are text-heavy exactly where it hurts (the homepage, the Fast Forward sales page, and the 12 "Chez" tool guides), they are almost completely static (one number count-up on the www homepage and one scroll-reveal on a single guide preview are the only motion in roughly 40 pages), and the estate has a set of small coherence leaks: a "Community" nav item with no destination, a privacy page whose nav links lost their UTM tags, orphaned redirect stubs, a hand-synced "3/99 hired" counter duplicated across domains, placeholder analytics IDs, and a 411 KB icon library that no page references.

## 1. Text density

### www.shiftandlead.com (visible words per page)

| Page | Words | Assessment |
|---|---|---|
| fast-forward.html | 1,194 | Heaviest: 9-module curriculum wall + long Problem/Stakes/Story prose + 6-item FAQ |
| index.html | 1,167 | Very long single scroll: hero, router, pains, quiz, founder story, 99 strip, cases, testimonials, ladder, FAQ, contact. One ~90-word run-on sentence in the founder story |
| work-with-fatiha.html | 638 | Moderate |
| terms / refund / licensing | 235 to 348 | Fine for legal |
| case-study-1/2/3 | ~240 each | Lean, well balanced |
| store.html | 100 | Holding page |

### guides.shiftandlead.com

| Page | Words | Assessment |
|---|---|---|
| free-resources.html | 1,452 | Heaviest top-level page (the library hub) |
| about.html | 726 | Long story section |
| 99.html | 435 | Fine |
| time-audit.html / opt-in.html | 256 / 165 | Fine (interactive) |
| guides/ (21 pages) | min 526 / median 2,105 / max 3,237 | The 12 "Chez" tool guides are all 1,993 to 3,237 words |

Top 5 heaviest pages on the whole estate: chez-claude.html (3,237), chez-claude-preview.html (3,237, a byte-level content twin that will drift), chez-meta-ai.html (2,852), chez-grok.html (2,664), chez-mistral.html (2,554). Their bulk comes from 5 to 8 prose sections, a comparison table, a FAQ rendered twice (once as visible details blocks, once repeated inside JSON-LD schema), and the restaurant-metaphor narrative.

Note before cutting: the Chez guides are long-form SEO assets. Word count there is partly deliberate. The pages where "too much text" hurts conversion are the www homepage, fast-forward.html, and free-resources.html, where the reader has a job to do and the copy is in the way.

## 2. Animation and motion

Confirmed: there is no React, no Vue, no framework, no build system anywhere. Both sites are hand-assembled static HTML with inline CSS and inline vanilla JS per page.

Total motion across ~40 pages:

- www homepage: one IntersectionObserver count-up that animates the case stats (1 min, 97%, 42 sec) on scroll. Respects prefers-reduced-motion. The case-study pages reuse the same stat markup but ship without the script, so their numbers are static.
- guides/chez-claude-preview.html: one IntersectionObserver scroll-reveal on .step blocks. Its twin chez-claude.html does not have it.
- Everything else: zero @keyframes anywhere. On www, even hover states are hard cuts with no CSS transition. On guides, hovers have basic transitions only.
- brief.shiftandlead.com (ai-insider-brief/): CSS transitions only, no scroll-driven motion.
- lib/lucide.min.js (411 KB) sits in site/lib/ and is referenced by no page. Dead weight.

## 3. Coherence of connections between pages

### What is coherent

- Header nav is internally consistent on each property: 8 identical items on every www page, 7 identical items on every guides page (including all 21 guide subpages with correct relative paths).
- Footers are byte-identical within each property.
- One design system across both: same palette (#2C4BE0 accent, #1A1A1A ink, #EEF2FC cream), same four font families (Playfair Display, Source Serif 4, Inter, Space Mono) on every page of both sites.
- The funnel ladder reads correctly: free guides + Insider Brief → Fast Forward waitlist → Workshops → done-with-you contact. Cross-domain links carry consistent UTM tagging (utm_source=guides/brief, utm_campaign=estate, utm_content=page-slug).
- The keyword-CTA lead-magnet flow works as designed: opt-in.html?guide=slug personalizes from an inline map, captures to Formspree + the n8n webhook in parallel, then forwards to the guide.
- No broken internal links on either property. All redirect stubs resolve.

### Coherence leaks found

1. "Community" is advertised in the nav and footer of every page on both properties, and it points at index.html#further, which is the "Three ways to go further" ladder. There is no community page. The contact block itself says the Community has not opened.
2. privacy.html (guides) nav drifted: its Workshops and Fast Forward links are the only ones on the estate missing UTM parameters. This is the predictable cost of the nav being copy-pasted into ~37 files with no shared template.
3. The 99 counter ("3 / 99 hired") is hand-maintained in two places: guides 99.html (source of truth) and a mirrored strip on the www homepage with a SYNC comment. It will drift.
4. chez-claude.html vs chez-claude-preview.html: 3,237 identical words in two files; only the preview has the scroll animation. Guaranteed drift.
5. Orphans: main-site case-study-4.html (redirect stub nothing links to; homepage shows only 3 case studies), main-site products/*.html stubs (linked from nowhere; licensing.html names the products as plain text without links).
6. Two different Time Audit destinations: the www homepage quiz links to guides.shiftandlead.com/time-audit.html, while www products/time-audit.html redirects to fast-forward.html.
7. Every buy CTA on www resolves to the waitlist email form. Source comments say SWAP TO LIVE WHOP CHECKOUT URL WHEN PRODUCT IS LIVE. The funnel currently terminates at lead capture, which matches Constitution Law 2 status (no live checkout yet) but means the site cannot take money today.
8. Analytics is not wired on www: every page ships Umami with the placeholder data-website-id="UMAMI-WWW-ID". Board-meeting numbers (store clicks, checkout starts) cannot be measured from www until this is filled.
9. work-with-fatiha.html (www) was authored on a different CSS generation: bold Playfair headings (weight 700 vs 400 everywhere else), different base sizing and line height, full-bleed footer hack. Same brand skin, visibly different tone.
10. Legal pages carry "Draft for review" comments and "Effective from the day checkout opens" status bars; homepage testimonials all read "Attribution being confirmed."
11. The active-state marker in the guides nav is applied inconsistently (99.html marks itself active; most pages mark nothing).
12. Cross-property visual seam: brief.shiftandlead.com is a deliberate second identity (purple/cream, same serif family). Clicking "The Insider Brief" from either blue/white site is a visible brand hand-off.

## 4. Structural finding that drives everything else

There is no shared stylesheet, template, or partial anywhere. The nav, footer, design tokens, and fonts import are copy-pasted into every one of ~37 real pages across the two properties. Findings 2, 3, 9, and 11 above are all symptoms of this. Any site-wide change (adding animation, cutting nav items, fixing UTMs) currently means editing 37 files by hand, and the drift already visible will keep happening.

## 5. Recommended direction (pending founder decisions)

1. Fix the leaks first (cheap, no design risk): privacy.html UTMs, Community nav item (remove or point at the waitlist), orphan stubs, Umami ID, merge chez-claude-preview into chez-claude.
2. Cut text where it blocks conversion: homepage founder story and pains section, fast-forward.html curriculum wall (collapse modules into expandable details), free-resources.html intro. Leave the Chez guides' SEO body largely intact but de-duplicate the FAQ (keep JSON-LD, tighten visible copy).
3. Add motion without a framework: a single shared ~2 KB vanilla JS + CSS scroll-reveal system (IntersectionObserver, prefers-reduced-motion aware), soft transitions on hovers and the existing count-up rolled out to case-study pages. React is not needed for this and would add a build step to a VPS-pull static deploy for no benefit. If a bigger rebuild is wanted, a static-site generator (e.g. Astro) that emits the same static HTML but from shared templates would fix the duplication problem at the root.
4. Decide the brief.shiftandlead.com seam: keep the deliberate second identity or bring it into the blue/white system.

Open questions for the founder are being asked in-session; implementation will not start until scope is confirmed.

---

## Implementation addendum (same day, after founder scope decisions)

Scope confirmed by Fatiha: fix leaks + cut text on conversion pages + motion site-wide with vanilla JS and CSS (no framework, no build step) + unify the Brief into blue/white. Full template rebuild declined. Chez guide bodies left intact.

### Shipped in this change

1. Leak fixes
   - privacy.html nav and footer cross-domain links now carry the standard UTM parameters.
   - Every "Community" link on both sites (26 links) now points at the real community waitlist on guides about.html instead of the nonexistent #further destination.
   - guides/chez-claude-preview.html converted to a redirect stub pointing at chez-claude.html. The 3,237-word duplicate is gone.
   - site/lib/lucide.min.js (411 KB, referenced by nothing) deleted.
   - www homepage "Subscribe free" link for the Insider Brief now points at brief.shiftandlead.com instead of #top.
   - Orphan redirect stubs (case-study-4, products/*) kept: they are not in any sitemap and still catch inbound links.

2. Text cuts (conversion pages only)
   - www index.html: 1,167 to 1,120 words. Hero sub, pains list, founder story (the 90-word run-on is gone), FAQ trimmed.
   - fast-forward.html: 1,194 to 1,171 words, and the 10-module curriculum wall is now collapsible details rows, so the page reads far shorter than the count suggests.
   - guides about.html: 726 to 640 words, story section tightened.
   - free-resources.html left as is: its weight is the 21-row library index, which is the page's purpose.
   - Zero em-dashes introduced. No numbers changed. Offer language unchanged (waitlist per offers.md).

3. Motion system
   - New shared file: site/lib/motion.js and identical main-site/motion.js. Vanilla JS, about 3 KB, no dependencies. Scroll-reveals with stagger on sections and cards, eased hover transitions, count-up on case-study stats. Respects prefers-reduced-motion; with JS off every element stays visible.
   - Injected into all 35 real pages across both sites. Verified in a real browser on 5 representative pages: all tagged elements reveal, no JS errors.

4. Insider Brief
   - The repo's styles.css was already the blue/white system; index.html loads it. The purple/cream version still visible at brief.shiftandlead.com is a stale deploy. Legacy styles-light.css (the purple design) deleted so it cannot regress. Fix on the live site is a VPS pull.

### Founder tasks remaining (cannot be done from the repo)

- Redeploy brief.shiftandlead.com (VPS pull) to replace the stale purple build.
- Fill the Umami website IDs: the placeholders (UMAMI-WWW-ID, UMAMI-GUIDES-ID, UMAMI-BRIEF-ID) need the real IDs from the self-hosted Umami dashboard, per deploy/analytics/README.md. Until then www traffic is not measured.
- The "3 / 99 hired" counter remains hand-synced between site/99.html and the www homepage (SYNC comments in place). Left as is per scope; a shared JSON fetch would need CORS setup.
