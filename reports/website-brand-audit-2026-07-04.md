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

## Open items carried into the loop

- Confirm whether an existing newsletter/"Insider Brief" platform already runs
  outside this repo before rebuilding it from scratch.
- Get current Instagram follower count + posting cadence directly from the
  operator (public search cannot reliably surface these).
- `contact-us` on the current shiftandlead.ai posts to GoHighLevel's native
  form — the static-stack migration needs an equivalent capture mechanism
  (reuse the Formspree + n8n webhook pattern already proven in `site/`).
