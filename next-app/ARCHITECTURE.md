# Shift & Lead Next.js rebuild architecture

This directory is the new site. The existing `main-site/`, `site/`, and `ai-insider-brief/` directories remain production references until the migration is approved.

## Target structure

```text
next-app/
  app/
    layout.tsx
    page.tsx
    globals.css
    guides/
      page.tsx
      [slug]/
        page.tsx
    about/
      page.tsx
    work-with-me/
      page.tsx
    workshops/
      page.tsx
    quiz/
      page.tsx
    starter-kit/
      page.tsx
    brief/
      page.tsx
    sitemap.ts
    robots.ts
  components/
    chrome/
      site-header.tsx
      site-footer.tsx
      mobile-nav.tsx
    layout/
      section.tsx
      container.tsx
      reading-container.tsx
    ui/
      button.tsx
      eyebrow.tsx
      card.tsx
      form-field.tsx
    home/
      hero.tsx
      possibilities.tsx
      client-proof.tsx
      authority-media.tsx
      founder-proof.tsx
      next-step-router.tsx
      guides-preview.tsx
      faq.tsx
      contact.tsx
    guides/
      guide-card.tsx
      guide-cover.tsx
      guide-filter.tsx
      guide-layout.tsx
    media/
      stage-photo.tsx
      podcast-clip.tsx
      mascot-art.tsx
  content/
    site.ts
    home.ts
    about.ts
    workshops.ts
    work-with-me.ts
    guides.ts
    brief.ts
  lib/
    metadata.ts
    schema.ts
    routes.ts
    forms.ts
  public/
    images/
      portraits/
      stage/
      podcast/
      mascot/
  styles/
    tokens.css
    utilities.css
  tests/
    route-preservation.test.ts
    metadata.test.ts
  package.json
  next.config.ts
  tsconfig.json
```

This is a target architecture, not a command to create empty files. Create components only when the page needs them.

## First implementation milestone

Only build the shared shell and Home page first.

The first milestone should include:

- App Router + TypeScript setup
- font loading
- global design tokens
- desktop and mobile navigation
- footer
- reusable container/section primitives
- buttons and form fields
- Home page using real current copy
- media placeholders that can be replaced by Fatiha's stage photos and podcast clips without changing layout architecture
- metadata for Home
- local responsive screenshots

Do not migrate Guides or other pages until the Home page has been visually approved.

## Content sources

Use these repository files as source material, but normalize them into the new app rather than importing the old HTML runtime:

- `../data/copy.json`
- `../data/site.json`
- `../data/guides.json`
- `../main-site/index.html`
- `../main-site/about.html`
- `../main-site/workshops.html`
- `../main-site/build-sprint.html`
- `../main-site/quiz.html`
- `../main-site/starter-kit.html`
- `../main-site/guides/`
- `../ai-insider-brief/ai-insider-brief/`

Where source files disagree, prefer the most recently approved copy in `data/copy.json` and the explicit instructions in `AGENTS.md`.

## Route strategy

Build clean internal Next.js routes, but preserve current public URLs during migration.

Initial mapping to account for:

```text
/                         -> Home
/guides/                  -> Guides hub
/about.html               -> About
/build-sprint.html         -> Work With Me
/workshops.html            -> Workshops
/quiz.html                 -> Quiz
/starter-kit.html          -> Starter Kit
```

Individual current guide URLs must be inventoried before launch and preserved exactly or permanently redirected deliberately.

Do not change canonical strategy during component development.

## Media strategy

New media should be organized by meaning, not by page.

### Portraits

Use for personal introduction and founder context.

### Stage photography

Use for authority, workshops, speaking, adoption, and proof that the work exists outside the website.

### Podcast clips

Use for thought leadership and short editorial proof. Prefer short clips with a clear idea and an accessible transcript or caption.

### Mascot

Use for AI systems, guide covers, process illustration, and selected explanatory moments only.

Media components should accept crop/focal-point controls so the same source can work across desktop and mobile without hard-coded giant image bands.

## Design tokens

Start with CSS custom properties in `styles/tokens.css` or `app/globals.css`:

```css
:root {
  --ink: #1A1A1A;
  --paper: #FFFFFF;
  --cream: #FAF7F2;
  --blue: #2C4BE0;
  --blue-deep: #1B2EA0;
  --blue-tint: #E4EAFB;
  --line: #E8E4DD;
  --muted: #555555;

  --shell: 1240px;
  --content: 1080px;
  --reading: 760px;

  --radius-ui: 6px;
  --radius-card: 10px;

  --section-space: clamp(40px, 4.5vw, 56px);
}
```

Do not add a new token for every page. Tokens should describe reusable decisions.

## Home page first-pass composition

```text
HEADER

HERO
For ambitious professionals ready to build with AI.
Get more of your business done with AI.
step by step.
Supporting proof and two clear actions.

WHAT BECOMES POSSIBLE
A visual three-part workflow showing outcome -> system -> capacity with human judgment retained.

CLIENT PROOF
Named client outcomes and concise testimonials.

REAL-WORLD AUTHORITY
Stage photo and/or a short podcast clip once supplied.
The media should prove teaching and point of view rather than decorate the page.

FOUNDER PROOF
Fatiha's experience as evidence for the method, not as the hero of the customer's story.

CHOOSE YOUR NEXT STEP
Guides / Build with me / Workshops.

FREE GUIDES
Small curated preview, not the entire library.

FAQ
Compact closed state.

CONTACT
Deep blue conversion surface with white text and accessible form fields.

FOOTER
```

## Local preview

The expected development loop is local and should not depend on Vercel:

```bash
cd next-app
npm install
npm run dev
```

Before pushing a page milestone, review screenshots at desktop, laptop/tablet, tablet, and phone widths.

## Deployment discipline

Vercel's free deployment quota has already been exhausted during the HTML iteration. Do not use git pushes as a visual preview mechanism.

- Work locally.
- Batch changes.
- Push meaningful milestones.
- Do not create a commit for every spacing tweak.
- Do not point the production Vercel project at `next-app/` until the migration has passed visual, route, SEO, form, and responsive QA.

## First Codex task

After the repository skills have been added, give Codex this task:

```text
Read AGENTS.md, every relevant skills/**/SKILL.md, and next-app/ARCHITECTURE.md before coding.

Initialize the Next.js App Router application in next-app using TypeScript. Do not touch the current production HTML directories. Build only the shared shell and the Home page for the first milestone.

Use the approved Shift & Lead visual rules and current content sources. The Home H1 is "Get more of your business done with AI." with the accent "step by step." Do not port the old CSS patch architecture.

Run the app locally and review the rendered Home page at 1440, 1024, 768, and 390px. Fix overflow, contrast, spacing, image dominance, and unnecessary vertical travel before considering the milestone complete.

Do not deploy to Vercel. Report the local preview URL, files changed, responsive QA results, and any content or media decisions that need approval.
```
