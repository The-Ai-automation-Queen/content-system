# Commercial rebuild brief — owner instruction of 28 September 2026

This is the working brief for every agent (Codex, Claude, any other) touching the
Shift & Lead website, offers or guides. It supersedes
`shift-lead-website-and-guides-goal-2026-09-27.md` where they conflict. It is
internal. Never paste any of it into a page.

## What Fatiha asked for

1. A commercial site modelled on the **structure** of saadiakaram.ai: a clear offer
   ladder, industry-specific ("vertical") workshops shown the way her Sprints are,
   and a free guide library that captures email. Adapt the structure. Never copy
   her words, images, prices, products, identity or client claims.
2. **Keep** the About story and credentials (Dell, Intel, Microsoft, the four
   businesses, LeLabPlus, Nike). Keep the current layout direction.
3. **Rebuild the guides' content**: new copy and a new guide format. Keep the
   existing cover images.
4. **One brand everywhere.** Every page uses the same fonts, colours and
   components.
5. **Content before format.** Fatiha reads and approves the words before any page
   layout or code changes.

The workshop restriction of 20 September is lifted. Fatiha now wants a workshop
series. The old `/workshops.html` page and its copy stay retired. The new series
is built from Phase 1 copy.

## Rules that apply to every phase

- **Gate order:** copy deck → Fatiha approves the text → build → Fatiha reviews the
  rendered page → merge. No step is skipped, and one approval does not cover
  another page.
- **Show copy as plain text first.** Deliver each copy deck as a Markdown file in
  `docs/copy/` and also as a Notion page if the connector works. Mark every line
  that is a claim, number, price, duration or deliverable with `[VERIFY]` until
  Fatiha confirms it.
- **Never invent** a price, duration, deliverable, client result, testimonial,
  guide count or date. Leave `[FATIHA: …]` placeholders instead.
- **Do not run `npm run build` or `npm run ship`.** They are retired: they rewrite
  published pages and crash. `main-site/` is served exactly as committed. Guides
  publish with `npm run publish:guides` after approval.
- **One branch per phase step.** Open a draft PR, get approval, merge within 24
  hours and delete the branch. Do not open a second branch for the same page
  while one is open. Visual tweaks go into the open PR, not new branches.
- **Delete, do not comment out.** Retired pages get a redirect in
  `main-site/vercel.json`, a `redirected` entry in `data/page-status.json`, then
  regenerate the sitemap with `node tools/build-public-discovery.mjs`.
- Lumail is the only email provider. Forms post to server routes in
  `main-site/api/`. Marketing consent stays a separate, optional checkbox.
- Customer-facing text contains only what a visitor needs. No build notes,
  statuses, provider names or instructions to the site team.

## Phase 0 — Offer decisions (Fatiha answers; the agent does not guess)

Present this sheet and wait. Each answer feeds Phase 1.

| Rung | Proposed role | Fatiha decides |
|---|---|---|
| Free guide library | Door. Every guide ends with a next step. | Library-wide sign-up or per-guide form (see Phase 3) |
| **Industry workshop series** | Main paid entry. One practical day or session per industry: Content & marketing, Beauty & wellness, Jewellery & accessories, Property, Education, Professional services. | Format (in person or remote), length, group size, city or cities, price or "on request", which industries launch first, and whether to join a waitlist or book |
| Private session | Short paid session for one leader and one problem | Exists? Length, price, deliverable |
| Business & marketing transformation | Consulting for leaders | Stages, typical duration, deliverable (for example a prioritised plan), how it starts |
| Custom build (optional) | Build a system for the client | Does Fatiha offer this now? If not, leave it out |
| Workbooks / Where AI Fits | Coming soon, waitlist only | Keep as waitlist or hide |
| AI twin | Currently listed in the industry picker | For sale now, or remove |

## Phase 1 — Copy decks for the main pages (text only)

For each page, write a copy deck in `docs/copy/<page>.md`. Order: Home → Work with
me → one workshop page per industry (start with one as the template) → Guides
library → About (light touch only).

Every deck follows the visitor's questions in order:

1. **Hero:** what you get, who it is for, one primary button and one secondary.
   Plain words and no "AI-" compound jargon. Buttons are concrete and low
   commitment, for example "Choose your workshop", "See the programme", "Find a
   free guide".
2. **Proof strip:** the verified career line.
3. **Offer ladder:** one card per approved rung, each with who it is for, what
   happens, what you receive, format and investment.
4. **Workshop page template:** the industry problem in the reader's words; three
   jobs they will do on the day; the programme hour by hour (only once Fatiha
   gives the timings); what they leave with; data-safety line; who it is not for;
   a FAQ; one button.
5. **How it starts:** 3 steps, then an enquiry form that asks for name, email,
   company, role, industry, what takes too much time, and a budget range (ask
   Fatiha before adding budget).
6. **Guides teaser:** three guide cards with covers, chosen for the offer.
7. **Footer:** one newsletter line that names what arrives and how often.

Deliver all decks for Phase 1 together, with a one-page summary of the offer
ladder at the top. Stop and wait for approval.

## Phase 2 — One brand system (can run alongside Phase 1 because it changes no words)

Create `main-site/assets/brand-tokens.css` and make every page, static and
Next.js, use it. Remove page-specific overrides that conflict with it.

- **Colours (from `brand_guide_v3.pdf` and the current site):** blue `#2C4BE0`,
  pink `#FF007F`, lilac `#C8C1F0`, ink `#0D1117`, white `#FFFFFF`, plus one light
  tint `#EEF0FF`. Nothing else. Currently off-palette and to be removed: guide
  heading orange `#FF5733`, Work with me pink `#EB008C`, cream `#F7F6F2`.
- **Type:** one self-hosted display face for h1 and h2, the same on every device.
  Today Impact renders on desktop, but iPhone and Android fall back to other
  fonts. Choose a free condensed display font such as Anton or Oswald, self-host
  it, and show Fatiha a sample page before switching. Playfair Display italic
  for accents. Inter for body text, labels and buttons.
- **Components:** one button style (pill, pink primary, ink secondary), one card
  style, one form style, one eyebrow label style, one header and one footer.
  Guides use the same components.
- Deliver a single `/brand-check.html` page (noindex) that shows every token and
  component, and screenshots of Home, Work with me, About, the guide library and
  one guide at 1440px and 390px. Fatiha approves before the tokens are rolled out.

## Phase 3 — Guides: new content format, cover images kept

### Email capture (Fatiha picks one before building)

- **Option A, recommended (closest to Saadia without passwords):** "Free access
  to the full library". One sign-up (first name, email, optional marketing
  consent) unlocks every guide on that device. The welcome email contains a
  personal link that restores access on another device. Every guide shows its
  intro, demo and first exercise openly. The worked correction and complete
  prompts sit behind the sign-up. The current code already unlocks all guides
  after one sign-up, so this is mostly copy and placement.
- **Option B, full account:** a sign-in and sign-up with a password or magic link
  and a "my account" page, built on Supabase auth. More work, and it adds a reader
  database. Build it only if Fatiha explicitly chooses it.

### Guide format (every guide, content adapted to the topic)

1. **Title** framed around the reader's pain, time or money, for example "You are
   doing this by hand every week. Here is the 20-minute fix." Never a bare tool
   name.
2. **Metadata row:** level, time needed, what you will have at the end, tools
   needed. Only verified values.
3. **Why it matters:** 2–3 sentences in the reader's words.
4. **Demo:** a worked example with a real-looking input and the result, shown
   visually. Keep the existing cover and screenshots.
5. **Exercise:** numbered steps the reader does with their own work.
6. **Gate:** the library sign-up (Option A or B), placed before the full prompt
   and the correction.
7. **Correction:** how to check the result, common mistakes and the fix prompt.
8. **Next step:** the relevant industry workshop or Work with me route, plus 3
   related guides with covers.

### Process

- Start with a **library plan**: the current 37 guides mapped to keep and rewrite,
  merge, or park, plus 10 new titles tied to the workshop industries. Fatiha
  approves the plan.
- Then write copy decks in **batches of 5 guides** (`docs/copy/guides/<slug>.md`).
  Fatiha approves each batch. Only then build that batch.
- Each built guide passes: phone and desktop render, gate submit test, prompt
  copy, links, no leaked production text.

## Phase 4 — Clean-up and release

- Retired pages stay redirected, never restored. Keep the sitemap generated from
  `data/page-status.json`.
- Close report-only draft PRs (weekly digests, competitor watches, vault audits)
  once Fatiha agrees. Change those automations to commit reports directly to
  `reports/` instead of opening PRs.
- After each merge, check the live page in a browser on desktop and phone, and
  report exactly what was verified.

## Status on 28 September 2026 (for the next agent)

- Done: zombie pages (workshops, how-i-can-help, contact, quiz) now redirect and
  are out of the sitemap and `llms.txt`. Chained redirects are flattened. The
  legacy build is disabled. Enquiry form and guide-to-paid bridge are in PR #187.
- The old HTML files for the redirected pages (`workshops.html`,
  `how-i-can-help.html`, `contact.html`, `quiz.html`, `the-99.html`,
  `fast-forward.html`) are unreachable but still in the repo. Delete them when
  Fatiha confirms.
- Next: Phase 0 answers from Fatiha.
