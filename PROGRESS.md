# Site consolidation and upgrade build

One shared design system across the three static sites, one upgraded guide
template, custom cover art on every guide, a soft email gate, and a voice pass
that retires the cafe framing.

**Status: complete. `node verify.mjs --all` is 715 PASS, 0 FAIL.**

```
node verify.mjs --all          # every page on all three sites
node verify.mjs site/guides/claude.html
node tools/include.mjs         # re-stamp shared assets and partials
node tools/include.mjs --check # fail if any page has drifted from shared/
node tools/make-art.mjs        # regenerate covers and figures
```

---

## 0. Harness and scaffolding

- [x] `verify.mjs` built, zero dependencies, 19 checks per guide page
- [x] `PROGRESS.md` created

## 1. Shared design system

- [x] `shared/assets/site.css` written from the brand DNA
- [x] `shared/assets/capture.js` single email capture, one endpoint pair
- [x] `shared/partials/gate.html` (soft gate)
- [x] `shared/partials/newsletter.html`
- [x] `shared/partials/guide-nav.html`, `byline.html`, `guide-foot.html`
- [x] `tools/include.mjs` stamps partials into pages and syncs assets
- [x] Synced into `site/`, `main-site/`, `ai-insider-brief/ai-insider-brief/`

## 2. Cover art and in-body figures

- [x] `tools/make-art.mjs`, deterministic and brand-locked
- [x] 20 covers generated, one per guide
- [x] 20 in-body figures generated, one per guide
- [x] Newsletter art generated and shared across all three sites

## 3. Tool guides, rewritten to the Straight Verdict format

Every one carries "Where it earns its keep", "Where it'll burn you" and
"What I'd actually do", enforced by the harness.

- [x] claude
- [x] chatgpt (was chez-openai)
- [x] gemini
- [x] copilot
- [x] grok
- [x] mistral
- [x] deepseek
- [x] kimi
- [x] meta-ai
- [x] manus

## 4. Concept and system guides, moved to the shared template

- [x] what-is-ai
- [x] what-is-a-prompt
- [x] what-is-agentic
- [x] chatgpt-vs-ai
- [x] ai-jargon-guide
- [x] stack-3-tool-ai-stack
- [x] follow-up-setup
- [x] first-ai-employee
- [x] inbox-manager-setup
- [x] 24-7-operations-system

## 5. Renames and redirects

- [x] All ten `chez-*.html` renamed to clean slugs
- [x] Redirect stub at every old path, with canonical and noindex
- [x] `deploy/redirects.map` written for real 301s at the web server
- [x] Inbound links updated: `free-resources.html`, `spotlight.json`,
      `sitemap.xml`, `opt-in.html`, `about.html`, `licensing.html`
- [x] `24-7-operations-system` added to the sitemap (it was missing)

## 6. guides.shiftandlead.com landing pages

- [x] free-resources.html, on shared CSS, series block rewritten
- [x] about.html, on shared CSS, newsletter block added
- [x] opt-in.html, on shared CSS, missing `<title>` was present but untagged
- [x] 99.html, on shared CSS, newsletter block added
- [x] time-audit.html, privacy.html, on shared CSS

## 7. www.shiftandlead.com

- [x] All 15 pages on shared CSS with legacy colour tokens folded in
- [x] Legal pages (privacy, terms, refund-policy, licensing) text untouched
- [x] Contact form honeypot added (it had none)

## 8. brief.shiftandlead.com

- [x] `styles.css` layered on the shared tokens, load order corrected
- [x] `index.html` on the shared design system
- [x] Email capture added (the site had none at all)
- [x] `app.js` untouched

---

## Blockers

None. Nothing was reverted and no task was abandoned.

---

## Copy to review with Fatiha

These are decisions I made conservatively rather than guess at. Each one is a
one-line change if you disagree.

1. **queen-brain was not in this session.** `CLAUDE.md` says to ask for it
   before writing anything customer-facing. I could not, so I worked from the
   voice specification in your brief plus the existing homepage copy, and I
   wrote **no price, tier or product status of yours** anywhere. All pricing on
   the guides is third-party tool pricing carried across verbatim with its
   original price-checked date and source link. Please re-read the guides
   against `queen-brain/voice.md` and `offers.md` before release.

2. **The gate no longer claims a subscriber count.** Your brief specified
   "Join 2,800+ operators". I could not trace that figure, and
   `reports/weekly-ops-2026-07-13.md` records email subscribers as "Unknown
   (measurement dark)" against a target of 500. Publishing 2,800 would break
   the "facts trace or die" law, so the gate now reads "Free, forever. No cost,
   no catch." **Give me the real number and it is a one-line edit in
   `shared/partials/gate.html` that updates all 20 guides at once.**

3. **No avatar row in the gate.** The supplied CSS included `.gate-avatars`.
   Filling it with stock faces would be fabricated social proof, so the row is
   omitted. The CSS is still there. Send real reader photos or the subscriber
   number and it goes in.

4. **The gate button says "Send me the guides", not "Unlock the full guide".**
   Nothing is locked, and "unlock" contradicts the no-catch promise on the same
   card. Your call if you want the original wording.

5. **Covers are generated SVG, not photography.** Hard constraint 1 forbids
   using an API key, so no image generation service was called. Every cover is
   drawn from the brand palette by `tools/make-art.mjs` and is deterministic.
   They use Georgia, which is the declared Playfair fallback, because an SVG
   loaded through `<img>` cannot pull a web font. If you want photographic
   covers, drop files into `site/assets/covers/` with the same slug names.

6. **The email-per-day figure was softened.** The old inbox guide asserted "you
   answer email for about 90 minutes a day" as fact about the reader. It now
   reads "if you spend an hour and a half a day on email, and most people I
   work with do". Give me a source and I will restore the harder claim.

7. **Two colours sit outside the brand DNA and were deliberately not changed.**
   `#E63955`, the red used for negative-state markers on four pages, and the
   ten category hues in the brief's feed. Both are semantic rather than
   decorative, and recolouring them is a design decision, not a consolidation.
   `#E63955` is allowlisted in `verify.mjs` with a comment.

8. **Blotato and GoHighLevel are still named** as your stack in
   `stack-3-tool-ai-stack.html`, carried from the original. Confirm those are
   still current.

9. **`UMAMI-GUIDES-ID` is still a placeholder** in every guide's analytics tag,
   as it was before this build. Not introduced here, but worth fixing.

---

## Decisions taken during the build

- **Partials are stamped, not fetched.** The brief mentioned a tiny include
  script. Fetching partials at runtime would put the email capture behind
  JavaScript and hide the gate copy from search engines. Instead
  `tools/include.mjs` writes the shared markup into each page on disk between
  marker comments, and `--check` fails if a page has drifted. The result is
  plain static HTML with one source of truth. No framework, no build step at
  request time.

- **Partials are not published.** They live only in `shared/` and are never
  copied into a web root, so there is no reachable fragment URL.

- **Nothing was deleted.** All 32 original guide files are in
  `_archive/2026-07-28-pre-consolidation/` with a README explaining why.

- **The guide HTML is hand-authored, not generated.** Constraint 4 rules out a
  build tool beyond the include script, so `content/guides.json` holds only
  what the art generator and the library page need. The HTML files are the
  source of truth for prose.

- **Three real bugs surfaced and were fixed**, all caught by the harness:
  the main-site contact form had no honeypot; `site/index.html` was a redirect
  stub with no canonical or noindex; the brief loaded its own stylesheet before
  the shared one, so shared rules would have overridden it.

---

# Phase 2: replicate the proven funnel

Six mechanics adapted from the competitor analysis, in Fatiha's voice, plus
source tracking so the funnel is measurable.

**Status: all six built. `node verify.mjs --all` is 999 PASS, 0 FAIL, 67/67 files green.**

## 0. Harness, upgraded to the funnel spec

- [x] og:title / og:description / og:url / og:image present **and non-empty**
- [x] og:image and hero cover exist on disk at **1280x720**, read from the file rather than trusting the markup
- [x] in-body `.fig` images exist and declare width/height
- [x] links `/assets/site.css` and has **no inline `<style>` over 500 chars**
- [x] all internal links **and srcs** resolve
- [x] every form has `_gotcha`, a non-empty action, and a source tag
- [x] images lazy except the hero image
- [x] `--all` prints per-file results and a green/total file count
- [x] placeholder form IDs and placeholder copy reported separately, so neither ships unnoticed

Covers regenerated at 1280x720 and every `<img>` dimension synced. Twenty pages
de-inlined into `/assets/pages/<name>.css`, loaded after `site.css` so
page-specific rules still win.

## 1. The always-on paid offer

- [x] `main-site/work-with-me.html`: "Your first AI employee, built with you in a week"
- [x] Promise, what you get, how it works (Apply, 20-min fit call, build week), proof strip, who it is and is not for, FAQ
- [x] Application form with `{{OFFER_FORM_ID}}`, source `www-work-with-me-apply`
- [x] Primary CTA in nav (11 pages) and footer (14 pages)
- [x] No public price. The single pricing line is marked DRAFT on the page itself.

## 2. Qualification gate on workshops

- [x] `work-with-fatiha.html` converted from "Check a date" to "Apply to bring Shift & Lead to your team"
- [x] Qualifying fields added: team size, date window, what they should do differently afterwards
- [x] `{{WORKSHOP_FORM_ID}}`, source `www-workshops-apply`. Kept as the secondary door.

## 3. Free magnet at scale

- [x] `site/freedom-os-kit.html`: The Freedom OS Starter Kit
- [x] 15 real items, each derived from an existing guide or case study
- [x] 3 placeholder cards, clearly marked, listed below
- [x] Category filter: Sales, Follow-up, Inbox, Ops, Content
- [x] Live count read off the rendered cards, excluding placeholders, so it cannot be inflated
- [x] Linked from the library page and the sitemap

## 4. Authority story page

- [x] `site/about.html`: a three-part timeline making the "I have led this shift before" thread visible
- [x] Ends in the primary CTA rather than the secondary doors
- [x] Guide count corrected from 16+ to 20
- [x] Only facts already on her site. Nothing invented.

## 5. Weekly cadence and retention

- [x] Persistent top-ribbon opt-in on the brief
- [x] One inline opt-in inside the feed, as a band across the grid, after the 6th item
- [x] Cadence promise on the brief hero and, via the newsletter partial, sitewide
- [x] No content gate on the brief. It is a feed; its job is capture and freshness.
- [x] `capture.js` exposes `slWireCaptureForms()` so forms rendered after load work, without double-binding

## 6. Soft gates and the free-to-paid bridge

- [x] Gate moved from 47-64% to a section boundary at 67-83% in all 20 guides
- [x] Content below the gate stays in the DOM; the harness fails the page otherwise
- [x] "When free isn't enough" block appended to all 20 guides, single CTA to the offer

Gate depths snap to real `<h2>` boundaries, so they land near rather than exactly
on 77%. A gate mid-section would read worse than one a few points off.

## 7. Source tracking

- [x] Every form on all three sites carries a source tag: page slug plus placement
- [x] Hidden input, no PII. Examples: `www-index-ribbon`, `guides-freedom-os-kit-hero`, `brief-inline-1`
- [x] Pre-existing forms given an explicit `action` on the endpoint they already posted to, so they work with JavaScript off

---

# Phase 3 — layout audit, 29/07/2026

Fatiha reported the brief looked broken. It was, and I shipped it. This is what
went wrong, what else I checked, and what I changed so it cannot happen quietly
again.

## Why the harness did not catch it

`verify.mjs` reported 999 PASS / 0 FAIL on the build that broke. Every check it
ran was true. It reads HTML: tags, attributes, links, copy. A layout is none of
those. A page can pass every structural check and still look wrong, and that is
exactly what happened.

## What was broken on brief.shiftandlead.com

All four were mine, all four shipped in PR #75.

| What | Measured | Fix |
|---|---|---|
| A gradient thumbnail with a large letter on every briefing card | card grew 343px to 573px | Removed. It was decoration nobody asked for, and it drowned the headline it sat above. |
| The in-feed opt-in injected as a direct child of the 3-column feed grid | took a 392px card cell, punched holes in the grid | Spans the grid as a 1200x106 band, once, after the 6th item. |
| Three in-feed opt-ins plus the ribbon plus the footer newsletter | 5 identical CTAs on one page | One in-feed opt-in. Three total, at the top, mid-feed and the end. |
| The opt-in ribbon above the header on a phone | 156px of a 844px screen, 3 rows, before the header | 86px, promise on one line, field and button sharing the next. |

Two more, found while measuring:

- `{{SUBSCRIBER_COUNT}}` was rendering literally in the hero on the live site.
  Removed rather than invented.
- `line-height: 1.65` from the shared stylesheet now inherits into the brief,
  which had none of its own. Header 64px to 70px, logo 23px to 33px. Left as is:
  it is the correct default for body serif and the drift is in the chrome only.

## One more, found by the new check

`free-resources.html` scrolled sideways by 310px on a phone. The Starter Kit
cross-link is a full sentence wearing `.row-cta`, which is `white-space: nowrap`.
That is right for "All guides →" sitting beside a row and wrong for prose: it
forced the line to 676px inside a 390px screen. The library page and the three
stubs that redirect to it were all affected, so this was the most-read page on
the site scrolling sideways on mobile.

Fixed with a `.wraps` variant rather than by rewriting the sentence.

I did not find this by eye. My own earlier sweep only rendered those pages at
1280px, where they are fine.

## What was NOT broken

Every page on all three sites, at 390px and 1280px, against the
pre-consolidation build at `c7ce063`:

- **www.shiftandlead.com**, 19 pages: clean. No overflow, no broken image, no
  JavaScript error, correct fonts, one `<h1>` each.
- **guides.shiftandlead.com**, 47 pages including all 20 guides: clean. The 20
  pages whose inline `<style>` I extracted to `/assets/pages/*.css` all load
  their stylesheet and render correctly.
- Every image on all three sites resolves once lazy loading has had its chance.
- Pages reporting no stylesheet are redirect stubs, which is correct.
- Brief feed interactions hold: show-more, archive switch and category filter
  each keep exactly one opt-in at full width, all three capture forms wired
  once, no JavaScript errors.

Final state: 65 of 67 pages render clean. The two that do not are the two
application forms still carrying `{{OFFER_FORM_ID}}` and `{{WORKSHOP_FORM_ID}}`,
which is the check doing its job.

## Pre-existing, not from this build

Present at `c7ce063` too, so not a regression. Say if you want them fixed:

- Topic bubbles in the brief hero drift past the right edge and sit under the
  headline on a phone. They are clipped, so no sideways scroll, but on a narrow
  screen the words overlap the subtitle.
- The footer band on the brief moved from `#EDE8DF` to the brand cream during
  the palette pass, so it separates by hairline now rather than by tone.

## The check that would have caught it

`tools/verify-render.mjs`. It serves each site and opens every page in headless
Chromium at both widths, then fails on: sideways scroll, a `{{PLACEHOLDER}}` in
rendered text **or in an attribute**, an image that did not load, a real page
with no stylesheet or an empty one, a JavaScript error, and a short list of
element shapes that broke once and must not break again.

Run against the broken build it reports all six problems above. Run against this
one it is clean.

`verify.mjs` stays the zero-dependency gate and is unchanged. This one needs
Playwright, says so plainly when it is missing, and is the extra pass:

```
node verify.mjs --all              # always, ~2 seconds
node tools/verify-render.mjs       # before anything ships, ~4 minutes
```

The pages load fonts from Google and that stylesheet blocks rendering, which
cost about twelve seconds per page fetched fresh. Every external URL is now
fetched once and replayed from memory, so 67 pages at two widths takes under
four minutes instead of over an hour. The fonts still load, so the type metrics
it measures are the real ones.

---

## Approve with Fatiha

**Form IDs to fill in (2).** Both `{{PLACEHOLDER}}`, reported by the harness on every run:

| File | Form | Placeholder |
|---|---|---|
| `main-site/work-with-me.html` | Offer application | `{{OFFER_FORM_ID}}` |
| `main-site/work-with-fatiha.html` | Workshop application | `{{WORKSHOP_FORM_ID}}` |

**Subscriber count (1).** The brief hero now reads "Every week, free, one clear
verdict" with no count. `{{SUBSCRIBER_COUNT}}` was rendering literally on the
live page, which is worse than saying nothing. Give me the real figure from GHL
and the count goes back in.

**DRAFT offer copy (1).** The pricing answer in the work-with-me FAQ is marked
DRAFT on the page. There is no public price anywhere, per the brief.

**Placeholder kit cards (3).** Each needs the prompt Fatiha actually uses:
- The discovery call brief (Sales)
- The weekly content repurposing pass (Content)
- The dormant-lead reactivation message (Follow-up)

**Case-study numbers.** The offer proof strip uses the real numbers from case
studies 1, 2 and 3, labelled as examples rather than promises. Confirm current.

**Ungated pages.** All 20 guides run 800 to 1300 words, so all are gated. None
was short enough to count as an ungated glossary stub. Say if you want
`ai-jargon-guide` left open.
