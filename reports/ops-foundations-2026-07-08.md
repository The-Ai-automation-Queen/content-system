# Ops Foundations — legal, tracking, performance — 2026-07-08

Phase agent: ops-agent, Shift & Lead web overhaul. Scope: `content-system/`
only, working tree left uncommitted for orchestrator review.

## 1. What was done

### Legal pages (before checkout can go live)
Added three self-contained pages in `main-site/`, matching the estate design
system (cream/ink/purple tokens, nav/footer pattern copied from
`main-site/store.html`), `robots` set to `index, follow`:

- `main-site/terms.html` — Terms of Purchase: what you buy (digital course
  access via Whop, immediate delivery), who sells it (Shift & Lead, operated
  by Fatiha Chikh), lifetime access and free updates, personal-use license,
  contact routed to `index.html#contact` (no invented email address).
- `main-site/refund-policy.html` — Refund Policy: the guarantee quoted
  verbatim from `fast-forward.html` ("Do the first lesson. If your 60-minute
  audit does not show you real hours you can hand to AI, email me and I will
  refund you. No hoops. The risk is mine, not yours."), expanded into claim
  method (reply to purchase email or contact form), window (after your first
  lesson, within 14 days of purchase), and refund to original payment method
  via Whop.
- `main-site/licensing.html` — Template License: personal/client-work use of
  templates, prompts and worksheets allowed; resale, redistribution and
  repackaging as a competing product are not; agency/affiliate terms marked
  "Published when the agency program opens" (no invented terms).

All three carry the honest-status pair required by Constitution Law 8: an
HTML comment `Draft for review. This page takes effect when checkout opens.`
plus a visible muted status bar reading "Effective from the day checkout
opens." None of the three pages state a price (Pricing Policy reserves the
only visible number for `fast-forward.html`).

Linked from:
- `main-site/fast-forward.html`, new line under the waitlist form: "Terms of
  Purchase · Refund Policy · Template License".
- Shared footer legal line, extended from `Privacy · © 2026...` to
  `Privacy · Terms · Refunds · © 2026 Shift & Lead. All rights reserved.` on
  the five main-site pages that carry that footer: `index.html`,
  `fast-forward.html`, `store.html`, `work-with-fatiha.html`,
  `case-study-1.html`, `case-study-2.html`, `case-study-3.html`.
  `case-study-4.html` is a redirect stub with no footer and was left alone.
  Guides-side footers (`site/`) were not touched; free content sits on a
  different surface and law only requires the main-site checkout pages to
  carry Terms/Refunds.
- `main-site/sitemap.xml`: added all three URLs with `lastmod` 2026-07-08.

### Cross-domain journey tagging (no analytics vendor, see memo below)
Appended UTM parameters (`utm_source`, `utm_medium=site`, `utm_campaign=
estate`, `utm_content=<page-slug>`) to every link pointing at
`https://www.shiftandlead.com/fast-forward.html` and
`.../work-with-fatiha.html`, in both nav and body copy, across:

- `site/free-resources.html`, `site/about.html`, `site/99.html`,
  `site/time-audit.html`, `site/opt-in.html` (`utm_source=guides`)
- all 18 live `site/guides/*.html` content pages (`utm_source=guides`,
  `utm_content=<filename-without-extension>`, e.g. `chez-claude`)
- `ai-insider-brief/ai-insider-brief/index.html` (`utm_source=brief`)

79 links tagged in total. Deliberately left clean, per instruction: the
`site/guides/voice-clone-pipeline.html` redirect stub (killed product,
redirects to `fast-forward.html`), `site/work-with-fatiha.html` redirect
stub, all canonicals, both sitemaps, and every JSON-LD block (none of the
JSON-LD in scope referenced either URL).

### Performance and accessibility, site/ (guides domain)
- **Fonts**: audited every Google Fonts `<link>` across `site/*.html` and
  `site/guides/*.html`. All already carry `display=swap` and paired
  `rel="preconnect"` for both `fonts.googleapis.com` and
  `fonts.gstatic.com`. No change needed; this was already correct.
- **Images**: 17 `<img>` tags total in scope.
  - `site/about.html` hero portrait (`fatiha-paris.jpg`) and
    `site/free-resources.html` hero portrait (`fatiha-shelf.jpg`): above the
    fold, given `loading="eager" decoding="async"` explicitly (no lazy load
    on the LCP image). `free-resources.html`'s `.hero-portrait` already
    carries `aspect-ratio:4/5` in existing CSS, so no new sizing hack was
    needed there; `about.html`'s hero image has no existing aspect-ratio to
    reuse, so none was invented (per instruction, only add where trivially
    known).
  - 15 `closeUp.jpeg` byline photos in `site/guides/*.html` (bottom-of-page
    author bio, well below the fold): given `loading="lazy" decoding=
    "async"`. Their size is already fixed at 64x64 in existing
    `.byline-in img` CSS.
  - Every `<img>` in scope already had a non-empty, accurate `alt`; none
    needed fixing.
- **Spotlight fetch chain** (`site/free-resources.html`): `current.json` and
  `spotlight.json` were fetched serially (`await` one, then `await` the
  other). Rewrote as `Promise.all` over two promises, with the
  `current.json` fetch resolving to `null` on any failure or non-OK
  response so a missing override file cannot block the required
  `spotlight.json` fetch. Behavior is identical; only the network timing
  changed (both requests now fire together instead of one after the other).
- **Heading hierarchy** (site/ root pages only, per instruction): every root
  page was clean except `free-resources.html`, which jumped from `<h1>`
  straight to `<h3>` (the spotlight section's visual title was a plain
  `<div class="spotlight-title">`). Promoted that one element to
  `<h2 class="spotlight-title">` (class-based CSS, so styling is unchanged).
  Sequence is now h1 → h2 → h3 → h4 → h2, no skips. `site/guides/*.html`
  pages were out of scope for this check (explicitly "site/ root pages") and
  were left untouched; their h2→h4 card patterns are a deliberate content
  layout, not something this pass should restructure.
- **Focus visibility**: `.search` (library search input) and `.pill`
  (library filter buttons) on `free-resources.html` had no explicit focus
  style. Added `.search:focus-visible,.pill:focus-visible{outline:2px solid
  var(--accent-deep);outline-offset:2px}` next to the existing `.search`
  rule.

### Editorial cadence guard (`site/free-resources.html`)
The spotlight eyebrow used to read "This week's pick · <date range>"
whenever the JS ran, even when the current ISO week had no entry in
`spotlight.json` and the code silently fell back to `data.default`. That is
a dated claim the fallback cannot back up. Fixed: the fetch logic now tracks
whether an actual `weekConfig` was found for the current ISO week
(`usedWeekConfig`). The eyebrow reads "This week's pick · <dates>" only when
`usedWeekConfig` is true; both the override-active path and the
no-weekConfig fallback path now read "Editor's pick" with no date range.
`spotlight.json` currently has weekly entries through `2026-W36` only; once
the current week rolls past that, the front page will now say "Editor's
pick" instead of quietly lying about which week it is.

## 2. Analytics decision memo, for Fatiha

**The conflict**: `site/privacy.html` publicly promises "no tracking
pixels, no advertising cookies, no analytics profiles." Any analytics
vendor install (GA4, even a cookieless one) would be a promise-breaking
change to a page a customer can read right now. Per the orchestrator's
standing decision for this phase, no analytics vendor was installed. Instead,
cross-domain journey tracking runs on two things already true of the estate:
first-party capture-source tags (already in the n8n → GHL pipeline per
`CLAUDE.md`) and the UTM scheme added in this pass.

**What this buys you now**: for any lead that clicks from a guide or the
brief into Fast Forward or Workshops, the `utm_source` / `utm_content` on
that link tells you which page and which surface (guides vs. brief) sent
them, once that URL reaches Formspree/GHL and the query string is captured
alongside the lead. It does not give you on-site behavior (time on page,
scroll depth, bounce) or anything about visitors who never click through.

**Options if you want more, ranked by how much they cost the privacy
promise**:
1. **Stay vendor-free (current state).** Zero conflict with `privacy.html`.
   Blind to on-site behavior; only tells you which link converted.
2. **Plausible or Umami, self-hosted, cookieless.** Both can run without
   cookies or persistent visitor IDs, and Plausible's own marketing leans on
   "no cookies, GDPR/CCPA compliant by default." This is compatible with "no
   advertising cookies" and "no tracking pixels" read narrowly, but it is
   still an analytics profile of aggregate visitor behavior, which
   `privacy.html`'s current wording ("no analytics profiles") reads as
   ruling out entirely. Adopting either would require rewriting that
   sentence in `privacy.html` first, disclosing exactly what is collected,
   and standing behind the rewrite in the same way the guarantee page
   stands behind its own promise. This also means real hosting/maintenance
   (self-hosted) work, which is founder-approved spend under the Constitution
   ("spending money or committing to a vendor: Fatiha only").
3. **Hosted GA4 or similar.** Not recommended. Directly contradicts "no
   analytics profiles" and "no advertising cookies" as currently worded;
   would require the biggest rewrite of `privacy.html` and the most user
   trust risk for the least incremental insight beyond option 2.

**Recommendation**: stay vendor-free until Fatiha decides. If she wants
on-site behavior data badly enough to justify touching the privacy promise,
option 2 (self-hosted Plausible or Umami) is the smallest true change: it
requires a `privacy.html` rewrite and a hosting decision, not a rewrite of
the whole trust posture. This decision sits with Fatiha per the Constitution
("spending money or committing to a vendor" and any material change to a
public-facing legal promise are founder calls, not agent calls); this repo
took no action beyond the UTM scheme.

## 3. Open items

- **Whop checkout creation is founder work.** Per `fast-forward/CLAUDE.md`,
  agents prepare listings, copy, and upload kits; the actual product/price
  creation on Whop is Fatiha's step. The three legal pages in this report
  are explicitly staged as drafts that "take effect when checkout opens" so
  they are ready the moment that happens, but nothing here creates or
  activates a live checkout.
- **OG image design assets.** All new pages (`terms.html`,
  `refund-policy.html`, `licensing.html`) point their `og:image` at the
  existing `Portrait.jpeg` (same pattern as `store.html`/`work-with-
  fatiha.html`). No dedicated legal-page OG art exists; if a distinct
  social-card image is wanted for these pages, that is a design task, not
  copy.
- **`spotlight.json` needs entries beyond W36**, or the site will keep
  running on the "Editor's pick" fallback (now labeled honestly instead of
  falsely dated) starting the week after `2026-W36`. Either extend the
  weekly rotation in `spotlight.json` or accept the undated fallback as the
  steady state; both are now safe, but someone should decide which.

## Files changed
- `main-site/terms.html` (new)
- `main-site/refund-policy.html` (new)
- `main-site/licensing.html` (new)
- `main-site/sitemap.xml`
- `main-site/fast-forward.html`
- `main-site/index.html`
- `main-site/store.html`
- `main-site/work-with-fatiha.html`
- `main-site/case-study-1.html`
- `main-site/case-study-2.html`
- `main-site/case-study-3.html`
- `site/free-resources.html`
- `site/about.html`
- `site/99.html`
- `site/time-audit.html`
- `site/opt-in.html`
- `site/guides/ai-jargon-guide.html`
- `site/guides/chatgpt-vs-ai.html`
- `site/guides/chez-claude.html`
- `site/guides/chez-copilot.html`
- `site/guides/chez-deepseek.html`
- `site/guides/chez-gemini.html`
- `site/guides/chez-grok.html`
- `site/guides/chez-kimi.html`
- `site/guides/chez-manus.html`
- `site/guides/chez-meta-ai.html`
- `site/guides/chez-mistral.html`
- `site/guides/chez-openai.html`
- `site/guides/first-ai-employee.html`
- `site/guides/follow-up-setup.html`
- `site/guides/inbox-manager-setup.html`
- `site/guides/stack-3-tool-ai-stack.html`
- `site/guides/what-is-a-prompt.html`
- `site/guides/what-is-agentic.html`
- `site/guides/what-is-ai.html`
- `ai-insider-brief/ai-insider-brief/index.html`
- `reports/ops-foundations-2026-07-08.md` (this file, new)
