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
- [x] Inline opt-in after every 3rd briefing item, injected as the feed renders
- [x] 16:9 thumbnail on every item, generated inline from its own category, no external images
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
- [x] Hidden input, no PII. Examples: `www-index-ribbon`, `guides-freedom-os-kit-hero`, `brief-inline-2`
- [x] Pre-existing forms given an explicit `action` on the endpoint they already posted to, so they work with JavaScript off

---

## Approve with Fatiha

**Form IDs to fill in (2).** Both `{{PLACEHOLDER}}`, reported by the harness on every run:

| File | Form | Placeholder |
|---|---|---|
| `main-site/work-with-me.html` | Offer application | `{{OFFER_FORM_ID}}` |
| `main-site/work-with-fatiha.html` | Workshop application | `{{WORKSHOP_FORM_ID}}` |

**Subscriber count (1).** `{{SUBSCRIBER_COUNT}}` on the brief hero. The brief said
to use the real number or a placeholder. The real one is not in the repo, so the
placeholder stands until you supply it.

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
