# Web estate overhaul: close-out report (2026-07-08)

Branch: `claude/shift-lead-web-overhaul-gc1ew1` (content-system; companion
proposal branch in queen-brain; fast-forward branch pushed unchanged, the
briefs there were the source of truth). NOT merged to main: the money path
is built but the Whop checkout does not exist yet, so Phase 1 cannot be
"verified live" taking money. Merge is Fatiha's call; everything on the
branch ships with waitlist CTAs and no dead buy buttons.

## The 10-point estate verification

1. **Voice gate**: clean. Zero em-dashes in rendered prose across both
   domains. Zero contractions in rendered prose except 2 deliberate
   exemptions: the 99.html title pun ("a payroll ain't one", a 99 Problems
   reference; expanding it kills the joke, DECISION for Fatiha) and one
   verbatim customer testimonial quote (quotes stay as spoken). ~290
   contractions expanded estate-wide, 217 of them in the 17 guide articles.
2. **Fast Forward is the only visible price**: confirmed. $299/$499 core
   and $199/$299 Depth appear only on fast-forward.html. The only other
   dollar figures on the estate are $0 cost receipts on the scoreboard
   (factual) and third-party tool tier tables inside the chez-* guides
   (competitor reference data, kept per the neutral-descriptions carve-out;
   cheap-register framing around them is gone).
3. **No cheap-coded words**: zero hits for dirt-cheap / cheap menu /
   cheapest-register across both domains. Named price anchors ($14.99, $19)
   removed from all promotional surfaces.
4. **Nav + footer**: one nav per domain, uniform (www: Home/About/Case
   Studies/Fast Forward/Workshops/Community/Contact + Free Guides CTA;
   guides: Home/Free Resources/The 99/The Insider Brief/About/Workshops +
   Fast Forward CTA button). Store and Speaking gone everywhere. One shared
   footer content set; guide articles use a compact footer with the same
   Privacy link and legal line. www footers add Terms and Refunds.
5. **No dead buttons, zero 404s**: all internal hrefs resolve (favicon
   root-absolute paths resolve at deploy; files exist at both roots). No
   href="#" remains. All buy-intent CTAs point at the waitlist form or the
   flagship page. Link-integrity report: reports/link-integrity-2026-07-08.md.
6. **Sitemaps + robots**: both sitemaps well-formed (www carries
   fast-forward.html and the 3 legal pages; store and product URLs
   removed). Both robots.txt: training crawlers blocked, ChatGPT-User and
   PerplexityBot allowed, clean ASCII, no duplicate lines. llms.txt at both
   roots.
7. **One H1 per page**: verified programmatically across every non-redirect
   page on both domains.
8. **Named method**: "Freedom OS" appears on fast-forward.html (2x),
   work-with-fatiha.html (2x, incl. the keynote title), site/about.html,
   and the www homepage founder section.
9. **Legal before checkout**: terms.html, refund-policy.html,
   licensing.html live on www, linked from the fast-forward waitlist block
   and every www footer, in the sitemap, honestly marked "Effective from
   the day checkout opens."
10. **Scoreboard timestamp**: the www homepage mirrors the canonical
    scoreboard: 3 of 99 hired, 3 real employee cards, "Last updated 07 Jul
    2026" stamp, SYNC comments so the hiring-campaign machine updates both.

## Diff summary by phase (14 commits)

- **Phase 1 (837d029)** fast-forward.html money page: PART 1 copy, $299
  founding shown, waitlist CTAs (no live checkout exists), Whop handoff
  line, OG/canonical/sitemap, new brand tokens.
- **Phase 2 (31e0b77)** store.html noindex holding page; 6 product stubs
  redirect to the flagship; sitemap cleaned.
- **Phase 3 (5026ca0)** 18 in-body retired CTAs repointed, cheap register
  killed, voice-clone stub repointed, zero broken links;
  reports/link-integrity-2026-07-08.md.
- **Phase 4 (c6153a3)** unified nav/footer estate-wide, cream/ink/purple
  tokens on core pages, guides hero reframed as the free library,
  community and workshop prices stripped, Queen retired as title.
- **Phase 5 (8f93069)** start-here router on www homepage (solo -> Fast
  Forward, team -> Workshops, exploring -> guides + Brief).
- **Phase 6 (00e2d2b)** Workshops & Keynotes enterprise rebuild: PART 4
  copy, fit-conversation pricing, outcome guarantee, not-for-you block.
- **Phase 7 (26380d1)** on-page fit-call form (workshops-fit-call tag),
  Brief as nurture path, testimonial attribution slots with honest
  placeholders (proof.md has no attributable client results).
- **Phase 8 (ace2635, 1973c03)** robots split + llms.txt + Org/Person
  schema + head hygiene; Article/FAQ/HowTo JSON-LD and extractable Q&A
  intros on all 19 guides.
- **Phase 9 (2c6fa65)** homepage scoreboard mirror, inline 7-question Time
  Leak Quiz (PART 5 spec, result before email, homepage-time-leak-quiz
  tag), count-up case stats with reduced-motion support.
- **Phase 10 (c453391)** legal drafts, UTM journey tagging (guides/brief ->
  www money pages), guides perf/a11y pass, Editor's-pick cadence guard,
  products/ 137 -> 99; reports/ops-foundations-2026-07-08.md.
- **Close-out (e7a7f77, 6d48457, 62be7af)** estate voice sweep, Freedom OS
  on About/Home, quiz CTA static fallback.

## Decisions Fatiha owns (nothing below is done until she says so)

1. **Create the Whop checkout** ($299 founding). Founder work per
   MONEY-IN-FIRST.md. When live: replace the 3 marked CTA blocks in
   fast-forward.html (SWAP comments), test one real purchase end to end,
   then merge to main.
2. **Ratify or decline the canon amendments**:
   queen-brain/proposals/2026-07-08-web-overhaul-canon-amendments.md
   (offers.md slotting, brand palette, Queen nickname rule, 137 vs 99,
   Freedom OS, testimonial attribution, case-study number tracing).
3. **The 99.html pun**: keep "a payroll ain't one" (recommended; it is the
   campaign's voice) or expand it for a fully literal voice gate.
4. **Analytics**: stay vendor-free (recommended, keeps the privacy promise)
   or adopt a cookieless vendor; memo in ops-foundations-2026-07-08.md.
5. **Testimonial attribution**: collect name/role/industry/number for the
   3 quoted customers; placeholders are live until then.
6. **OG images**: bespoke per-page-type images remain a design-asset task
   (Portrait.jpeg standardized meanwhile).
7. **Product source markdown** (content-system/products/*.md) still
   carries em-dashes from before the overhaul; they become Fast Forward
   bonus material and need a voice pass in the factory before shipping.
