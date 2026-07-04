# Website & Brand Audit — 2026-07-04

Full audit of the three live properties (shiftandlead.ai, guides.shiftandlead.com,
Instagram @thefatihachikh), triggered by the operator's request to prioritize and
sequence "fix my online presence" work. Interactive version shared with the
operator as an artifact in-session; this is the durable record.

## At a glance

| Property | Status | Notes |
|---|---|---|
| shiftandlead.ai | Off-brand | Hosted on GoHighLevel (leadconnectorhq/filesafe.space) — source not in this repo. Speaks the retired "Shift & Lead" agency voice (done-for-you automation for founders, B2B case studies, 1:1 retainer FAQ). No link to the guides site at all. |
| guides.shiftandlead.com | Aligned, disconnected | Source lives in this repo at `site/`. Good voice, a real named format (Kitchen Map), clean opt-ins. But: no SEO metadata on most pages, no case studies/testimonials, and (until today) three dead CTA links and a stale price. |
| Instagram @thefatihachikh | Aligned, underused | Bio matches the corporate-escape positioning. "The AI Automation Queen" is the display name, not a second account — identity is already resolved (per `ROADMAP.md` 22/06 entry). Gap is cadence/content plan, not identity. |

## Decisions locked in (04/07/2026)

1. **One brand.** shiftandlead.ai and The AI Automation Queen merge into a single
   public voice. The old Shift & Lead agency framing (retainers, "monthly
   management," done-for-you as the default sale) is retired as the site's front
   door — consistent with `positioning/SKILL.md`'s 22/06/2026 rebuild, which
   already retired 1:1 advisory/enterprise framing. The founder story and the 4
   existing case studies stay as proof, reframed from "we built it for you" to
   "I built this, here's how you can too." Bespoke implementation work becomes a
   quoted "Done-With-You Intensive" add-on (Tier 7 in `inventory.md`), not the
   main CTA.
2. **Main site access: migrate to the static stack.** shiftandlead.ai will be
   rebuilt as static HTML in this repo (mirroring `site/`'s approach) rather than
   maintained by hand-copying generated copy into the GoHighLevel builder. This
   is queued as the next build phase.
3. **Pricing ladder reconciled.** guides.shiftandlead.com showed Community
   $49/mo + a $499 "Fast Forward" course not represented in `skills/monetisation/`;
   the plan showed $47/mo Community + $97 Starter Kit + $997 Bootcamp with no
   Fast Forward tier. Resolution: keep both pieces of built work — Fast Forward
   is adopted as a new tier (flagship one-time, between Starter Kit and
   Bootcamp) rather than deleted. Full ladder now in `inventory.md` and
   `skills/monetisation/SKILL.md`.
4. **Execution:** a recurring `/loop` runs the phased build below.

## The build order (4 phases)

**Phase 1 — Stop the bleed.** Brand-split decision (done, above). Rebuild
shiftandlead.ai on the static stack, in the merged voice. Add a guide-site
button on the main page + a "Blog" nav entry pointing at the guides. Logo v2
(parallel, non-blocking).

**Phase 2 — Make it findable and credible.** SEO layer (meta description, OG/
Twitter tags, canonical URL, Article schema, sitemap.xml) across every guide
page — 6 of 13 guide pages plus `free-resources.html`/`opt-in.html` currently
have zero SEO metadata; the 7 Kitchen Map pages have a description tag only, no
OG/canonical. SEO topic-hub pages clustering the vocabulary + Kitchen Map
guides. Case studies + testimonials ported into the guides/main site, reframed
to the teach-don't-do voice.

**Phase 3 — Turn traffic into leads.** Quiz + audit tool (dedicated frontend
design pass, not a generic form). Newsletter — confirm whether an "Insider
Brief" already exists on another platform before rebuilding (nothing found in
this repo). Free webinar for free-guide subscribers, sequenced after the
newsletter exists.

**Phase 4 — Grow the channel.** Instagram cadence + content-mix plan, feeding
off the now-connected site + guides + newsletter.

## Immediate fixes shipped same day (in `site/`)

Ahead of the phased rebuild, fixed what was safely fixable in the existing
guides-site code without waiting on the main-site migration:

- `free-resources.html`: nav ("Home", "Community", "About") and footer links
  were literal `href="#"` placeholders — now point to the live main site or an
  in-page anchor. The three pricing CTAs ("Join $49/mo", "Enroll $499",
  "Request scope") were dead links — converted to buttons that open a waitlist
  capture form, reusing the existing dual-post lead pipeline (Formspree +
  `auto.shiftandlead.com` n8n webhook) already wired for the newsletter ribbon,
  tagged by tier (`waitlist-community`, `waitlist-fast-forward`,
  `waitlist-custom-scope`).
- Same dead `Community`/`About` nav links fixed across all 6 vocabulary/
  pipeline guide pages (`what-is-ai`, `chatgpt-vs-ai`, `what-is-a-prompt`,
  `ai-jargon-guide`, `what-is-agentic`, `voice-clone-pipeline`) and `opt-in.html`.
- Community pricing copy updated from a flat "$49/mo" (no founding-rate
  mention) to "$27/mo founding → $47/mo standard," matching the rest of the
  roadmap.
- Fixed two pre-existing typos in `skills/monetisation/SKILL.md` where the
  founding-member price was written as "$97/month" instead of "$27/month" in
  the CTA map and activation checklist (contradicted the rest of the same
  document).

## Addendum — 04/07/2026, later same day

Operator supplied the two facts flagged as open items above, plus a fourth
property that changes Phase 3's scope:

- **The AI Insider Brief newsletter already exists and is live**, at
  brief.shiftandlead.com — twice-weekly (Tue/Fri), a curated AI-news digest
  with a plain-English summary + ACT/WATCH/IGNORE verdict per story, email
  delivery via Kit (ConvertKit). Branded "By The AI Automation Queen" already.
  Its source is **not in this repo** (separate hosting, unknown CMS — same
  situation as shiftandlead.ai). **Phase 3's "newsletter refresh" is therefore
  a refresh of this existing asset**, not a new build: I can produce the
  content/copy/design updates, but they need to be applied on whatever
  platform actually hosts brief.shiftandlead.com.
- **Two bugs found in the newsletter's own footer**, to fix as part of the
  refresh:
  1. Its Instagram icon links to `instagram.com/fati_chic_` — confirmed with
     the operator this is a **stale/wrong handle**. The real, current account
     is `@thefatihachikh` (636 followers, 312 posts, confirmed 04/07/2026).
     The footer link needs to point there instead.
  2. Its Skool icon links to `skool.com/@ai-automation-queen-5858` — confirmed
     with the operator this is her **personal Skool profile**, not a live
     community (matches `inventory.md`'s "🔴 Launch" status — the community
     itself doesn't exist yet). Leave unlinked or repoint once Tier 3
     (Community) actually launches, rather than sending subscribers to a
     profile with nothing to join.
- Instagram stats now confirmed: **@thefatihachikh, 636 followers, 312 posts**
  — recorded in `inventory.md`. This is the baseline Phase 4's cadence/content
  plan works from.

## Addendum 2 — 04/07/2026, Phase 1 build (same day, not waiting for the loop)

Operator asked to build now rather than wait for the Monday trigger. Shipped
Phase 1 in full within this repo:

- **shiftandlead.ai migrated onto the static stack** at `main-site/` — mirrors
  `site/`'s hand-built HTML approach (no build step, self-contained pages).
  `index.html` is the merged-brand home page: hero, pain points, founder story
  (reframed, employer names kept vague per `positioning/SKILL.md`'s voice
  rule), three-pillar "how I help" (Learn / Build / Speak — replacing the
  retired Advise/Educate/Be-a-Voice framing), a case-studies grid, the 3
  existing testimonials (kept verbatim — real client quotes, only the
  surrounding frame was rewritten), the reconciled pricing ladder, a reframed
  FAQ, and a contact/newsletter section. SEO meta (description, OG, Twitter
  card, canonical) included from the start, plus `robots.txt` and
  `sitemap.xml`.
- **Guide button + Blog nav**: nav includes a `Blog` link to
  guides.shiftandlead.com, a prominent "Free Guides" nav CTA, and a hero CTA —
  satisfies both of the operator's original asks in one build.
- **4 case studies rebuilt** (`case-study-1.html`..`case-study-4.html`) at the
  same slugs as the original GHL pages, reframed from "we built it for your
  business" to "I built this, here's how you can too," with the original
  challenge/solution/results kept factually intact (no invented stats). Note:
  case-study-3 (tire shop) and case-study-4 (coffee shop) share near-identical
  solution copy and identical result numbers in the original GHL source —
  carried through faithfully rather than invented apart.
- **Contact/lead capture**: reuses the same Formspree + `auto.shiftandlead.com`
  n8n webhook dual-post pattern already proven in `site/`, tagged
  `main-site-ribbon` / `main-site-contact`.
- **Logo v2**: a simple SVG wordmark (badge + "the ai" in electric-blue italic
  Playfair Display + "AUTOMATION QUEEN" in Inter) replaces the plain-text
  "Shift & Lead" nav wordmark — applied to `main-site/` and rolled out across
  all of `site/` (free-resources.html, opt-in.html, and all 6 vocabulary/
  pipeline guide pages) so both properties are visually consistent. This is a
  systemized starting point, not a final professional logo — worth a real
  design pass in Canva once that connector is authorized.
- **Not yet done**: DNS/hosting cutover for shiftandlead.ai (the code exists in
  `main-site/`, but pointing the live domain at it is an operator action —
  flagged as an open item below), and the SEO topic-hub pages + case
  studies/testimonials on the *guides* site itself (still Phase 2 work).

## Addendum 3 — 04/07/2026, Phase 2 build (SEO layer)

Operator said "go for it" to keep building without waiting. Shipped Phase 2's
SEO pass in full:

- **Meta layer added to all 16 guide pages** in `site/guides/` (corrected count
  — there are 16, not 13 as earlier estimated: 6 vocabulary/pipeline guides +
  10 Kitchen Map guides including the 3 not-yet-published ones). Each page now
  has a meta description (written fresh for the 6 that had none), Open Graph
  tags, Twitter card, a canonical URL, and a JSON-LD `Article` schema block
  with author/publisher/datePublished pulled from the guide's own
  `data-publish` attribute on the library page (kept factual — omitted
  `datePublished` entirely for `voice-clone-pipeline.html`, which isn't listed
  in the library and has no confirmed publish date, rather than invent one).
- **`free-resources.html`**: added meta description, OG, and Twitter tags, plus
  a self-referencing canonical.
- **`opt-in.html`**: this is a single static file serving many guides via
  `?guide=` query string, so per-guide meta tags aren't feasible without a
  build step. Set `robots` to `noindex, follow` (keeps this transactional gate
  page out of search results — avoiding thin/duplicate-content flags — while
  preserving link equity to the real guide pages it redirects to) and pointed
  its canonical at `free-resources.html`.
- **Two new SEO topic-hub pages**: `ai-tools-compared.html` (clusters all 10
  Kitchen Map guides, targets "Claude vs ChatGPT vs Gemini"-style searches) and
  `ai-vocabulary-explained.html` (clusters the 5 vocabulary guides in their
  intended reading order). Both link back to `free-resources.html` and to each
  other, and are linked *from* `free-resources.html`'s library header so
  they're not orphan pages.
- **`sitemap.xml`** created for guides.shiftandlead.com (19 URLs — didn't exist
  before) and referenced from `robots.txt`.
- **Noted, not fixed**: the library page's search box and Tool/Topic filter
  pills (`free-resources.html`, `.controls` section) render but aren't wired to
  any JS — they're currently decorative. Worth fixing in a later pass since
  they'd otherwise mislead a visitor into thinking search/filter works.

## Open items carried into the loop

- ~~Confirm whether an existing newsletter platform already runs~~ — resolved,
  see addendum above.
- ~~Get current Instagram follower count~~ — resolved, see addendum above.
- ~~`contact-us` needs an equivalent capture mechanism~~ — resolved, `main-site/`
  reuses the Formspree + n8n webhook pattern.
- **DNS/hosting cutover**: `main-site/` is built and ready, but shiftandlead.ai
  still needs to actually point at it (currently live on GoHighLevel) — an
  operator action (or a decision to keep GHL live in parallel during a
  transition period). Ask before flipping the live domain.
- Find out what platform actually hosts brief.shiftandlead.com (Carrd, Framer,
  custom — unknown) before attempting the Phase 3 refresh, since the fix has to
  be applied there, not in this repo.
