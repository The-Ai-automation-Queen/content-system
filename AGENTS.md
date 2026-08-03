# Shift & Lead Next.js rebuild instructions

## Scope

Work on the Next.js rebuild only on the `nextjs-rebuild` branch unless explicitly told otherwise.

Do not modify the production HTML implementation merely to make the rebuild easier. The current HTML estate remains the production reference until the Next.js migration is approved.

The new application belongs in `next-app/`.

## Before coding

1. Read this file fully.
2. Read every relevant skill under `skills/**/SKILL.md` before making design or frontend decisions. In particular, use any frontend design, accessibility, SEO, responsive design, media, or Next.js skills present in the repository.
3. Inspect the current source content before rewriting anything:
   - `data/copy.json`
   - `data/site.json`
   - `data/guides.json`
   - `main-site/`
   - `ai-insider-brief/ai-insider-brief/`
4. Treat the current HTML as content and visual reference, not architecture to port.

## Architecture rules

- Use Next.js App Router and TypeScript.
- Build reusable React components and a clean design-token system.
- Do not reproduce the current patch pipeline.
- Do not port `brand-system-patch.mjs`, `density-patch.mjs`, `site-positioning-patches.mjs`, or other post-build layout hacks into the Next.js app.
- No giant page-specific CSS overrides to fix component mistakes. Fix the component or token instead.
- Keep content data separate from presentation where practical.
- Prefer server-rendered or statically generated content for public pages.
- Keep JavaScript sent to the browser minimal.
- Use semantic HTML and accessible interactions.
- Do not change production URLs, canonicals, metadata, schema, redirects, or form behavior without an explicit migration decision.

## Visual system

Shift & Lead should feel premium, editorial, intelligent, warm, and practical. It must not look like a generic SaaS dashboard.

### Brand tokens

- Foundation: white and `#FAF7F2` cream.
- Primary blue: `#2C4BE0`.
- Deep blue: `#1B2EA0`.
- Ink: `#1A1A1A`.
- Hairline: `#E8E4DD`.
- Red is reserved for genuine warnings and errors.
- Headings: Playfair Display.
- Body: Source Serif 4.
- UI: Inter.
- Labels and eyebrows: Space Mono.
- UI radius: about 6px.
- Card radius: about 10px.
- Site shell: about 1240px.
- Main content width: about 1080px.
- Reading width: about 760px.

### Layout rules

- Do not put every section into cards.
- Use cards only when items genuinely belong as discrete units.
- Processes must visually read as processes.
- Avoid unnecessary vertical travel.
- Typical desktop section padding should land around 40px to 56px unless the composition clearly needs more.
- Long-form guide text keeps comfortable reading line-height and paragraph spacing.
- Do not create giant empty areas to vertically center short content.
- Do not use oversized full-width photographs immediately after another prominent photograph.

### Contrast rules

- Strong blue surface means white foreground text.
- Eyebrows on blue may use pale blue.
- Never use black text on strong blue.
- Never use medium or dark blue text on strong blue.
- White or cream surfaces use ink text with blue as an accent.

## Media roles

Photography and illustration have different jobs.

### Photography

Photography represents Fatiha, authority, trust, teaching, and real-world proof.

- Portraits: personal introduction and founder context.
- Stage photos: teaching, authority, workshops, speaking, real-world evidence.
- Podcast clips or stills: point of view and thought leadership.
- Do not repeat essentially the same portrait treatment twice on one page.
- Do not add an image simply because a section has empty space.

### Mascot

The robot mascot represents AI doing work.

Good uses:
- guide thumbnails,
- explanatory diagrams,
- process moments,
- planning,
- inbox or workflow concepts,
- warnings when genuinely relevant.

Avoid:
- About page decoration,
- Quiz decoration,
- Brief hero decoration,
- placing a mascot beside Fatiha simply to fill a layout,
- using a mascot on every page.

## Messaging rules

The reader or client is the hero. Fatiha is the guide and proof.

Every headline promise must pass the 10-year-old test: a 10-year-old should understand what changes and be able to draw the before and after.

- Name the result before the mechanism.
- Use plain English.
- Avoid jargon in headline promises.
- Technical language may appear in supporting explanation.
- Do not describe AI as replacing people or as a reason to hire fewer people.
- Position AI as additional business capability with responsible guardrails.
- Human judgment stays visible.
- Avoid em dashes in site copy.

Current approved homepage hero direction:

- Eyebrow: `For ambitious professionals ready to build with AI.`
- H1: `Get more of your business done with AI.`
- Accent: `step by step.`
- Supporting copy should explain what to focus on, what to skip, and how, with Fatiha's experience as proof rather than making her the hero.

## Homepage design direction

Build Home first. Do not build the rest of the site until Home establishes the final component language.

Recommended page rhythm:

1. Hero
2. What becomes possible with AI
3. Client proof
4. Real-world authority, using stage photography and/or a short podcast clip when supplied
5. Founder proof and method
6. Choose your next step
7. Free guides
8. FAQ
9. Contact
10. Footer

The Home page is the visual reference for the rest of the site.

## Remaining pages after Home approval

Migrate in this order:

1. Guides hub
2. Individual guide template
3. Work With Me
4. Workshops
5. About
6. Quiz
7. Starter Kit
8. AI Insider Brief

## URL and SEO preservation

The migration must preserve search equity.

Before launch, inventory and preserve:

- current public URLs,
- canonical URLs,
- titles and meta descriptions,
- Open Graph data,
- structured data / JSON-LD,
- sitemap behavior,
- robots directives,
- internal links,
- form endpoints,
- redirects,
- HTTP status behavior.

Do not casually convert `.html` URLs to clean URLs during the first migration. If clean URLs are introduced later, use deliberate permanent redirects and update canonicals and internal links together.

Guides remain under `www.shiftandlead.com/guides/`.

## Responsive QA

Every major page must be reviewed at approximately:

- 1440px desktop,
- 1024px laptop/tablet landscape,
- 768px tablet,
- 390px phone.

Check for:

- horizontal overflow,
- giant blank regions,
- overly dominant images,
- broken type wrapping,
- low-contrast text,
- cramped forms,
- navigation collapse,
- card stacking,
- readable tap targets.

## Preview workflow

Do not use Vercel as the design preview loop.

Use the local Next.js development server:

```bash
cd next-app
npm install
npm run dev
```

Review the real rendered page locally. When browser automation or screenshot tooling is available, capture desktop, tablet, and mobile renders after each meaningful page milestone.

Only push a milestone when the page has been reviewed locally. Batch related changes into purposeful commits rather than creating a deployment-triggering commit for every small visual adjustment.

## Definition of done for each page

A page is not done merely because it compiles.

It is done when:

- content is accurate,
- hierarchy is obvious,
- the promise is understandable immediately,
- contrast is accessible,
- mobile is intentionally designed,
- there is no unnecessary scroll,
- photography and mascot usage follow their roles,
- metadata and structured data are preserved,
- forms and links work,
- the page has been visually reviewed at all required viewport sizes.
