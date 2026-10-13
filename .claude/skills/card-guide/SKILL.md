---
name: card-guide
description: Turn copy that Fatiha pastes or drops in into a published card-format guide on www.shiftandlead.com/guides (numbered step cards, copyable prompts, sign-up card after the first steps). Use when she says "make this a guide", "new guide", "publish this guide", pastes guide copy, or runs /card-guide.
---

# Card guide: from pasted copy to a guide ready to publish

Goal: Fatiha pastes guide copy, and about five minutes later there is a draft
pull request with the finished guide built, checked and ready to merge.
Merging publishes it (Vercel serves `main-site/`). Never merge it yourself.

Reference guide: `brand-brain-guide` in `next-app/content/card-guides.ts`.
Layout: `next-app/components/guides/card-guide-page.tsx`. Copy its shape.

## 0. Before you start

- Read `AGENTS.md` and `CURRENT-WORKFLOW.md` (guide and CTA rules).
- If queen-brain is in the session, read `offers.md` and `voice.md`. The CTA may
  only point to an offer marked active there. Today that is the Free AI Guides
  library (`/guides/`). No prices, inclusions or results from memory.
- `cd next-app && npm ci` if `node_modules` is missing.
- Work on a new branch `guide/<slug>` from an up-to-date `main`.

## 1. Map the copy (do not rewrite it)

Her pasted copy is approved copy. Keep her words. Map them into one new
`CardGuide` object appended to `cardGuides` in `next-app/content/card-guides.ts`:

| Her copy | Field |
|---|---|
| Title | `title`; split into `h1.title` + `h1.accent` (the last few words, ending with a full stop) |
| Opening paragraph | `intro.lead` |
| "What you end up with", requirements | `intro.blocks` (`h3`, `list`, `tip`) |
| Each "Step N: ..." | one `steps[]` entry, `num: "01"` etc. |
| Paragraphs | `p`; numbered instructions `list` with `ordered: true`; bullets `list` |
| Any prompt or text to paste | `prompt` with a short `label`, text verbatim |
| Tables | `table` (`head` + `rows`) |
| "You want / Paste this" tables | `requests` |
| Warnings, "When X goes wrong" | `honest` (blue box); side notes and tips `tip` |
| Extra sections (instructions, habits, checklist) | more `steps` (`num: "06"`, `"07"`, `"✓"`) |

Only write what is missing, and keep it short:
- `accent` subtitles under each step (2 to 5 words, full stop), e.g. "The container."
- `gate` text: `heading: "Get the"`, `accent: "<Guide name>."`, the promise line
  from the reference guide, `action: "Open the rest of the guide"`.
- `openSteps`: usually `1`. Teaching first, then the card, before the first
  full prompt (AGENTS.md rule).
- `cta`: copy the reference guide's Free AI guides block, adjusting the heading
  to this guide's outcome.
- `seoDescription` (under 160 characters), `coverAlt`, `tool`, `minutes`.
- `hero` (mascot banner, like the other guides): `kind: "pose"` with a
  transparent mascot from `next-app/public/images/mascot/` (`email-sorting`,
  `explaining`, `lightbulb`, `planning`, `warning`), or `kind: "scene"` with a
  16:9 illustration. `line` is one sentence taken from her intro. Pick the pose
  that fits the job; if she names one or drops a new image, use hers. Leave
  `hero` out only if she asks for the plain card header.

Voice check on everything you wrote and everything she wrote: no em dashes, no
"It is not X. It is Y.", no invented numbers or claims, redaction shown in
prompts (`[client]`, never a real name). Fix your own text. If her text breaks
a rule, keep it and list the line for her in the PR body.

Never put "Lumail", "review mode", "editorial status" or any internal note in
`card-guides.ts` or a component: the validator rejects it.

## 2. Register the guide (all six, or the validator fails)

Pick a `slug` (lowercase, hyphens) and `lumailTag: "guide-<short-name>"`.

1. `next-app/content/guides.json`: append an inventory entry. Copy the
   `brand-brain-guide` entry; set `title` (library card title, Title Case),
   `h1`, dates (today), `readMinutes`, `cover`, `track`, `hub`, `level`,
   `outcomes`, `tags`, `summary` (one sentence), `sequence`,
   `status: "live"`, `reviewStatus: "published"`, `access: "free"`.
2. `data/guide-publication.json`: append to `approved`
   `{ slug, lumailTag, section: <hub>, journeyOrder }` and add one sentence to
   `approvalNote` with today's date saying the owner supplied the copy.
3. `data/guide-rebuild-plan.json`: append
   `{ slug, pattern: "walkthrough", status: "approved", component: "card-guide-page" }`.
4. `next-app/content/guide-formats.ts`: `"<slug>": "walkthrough",`.
5. `next-app/content/guide-page.ts` → `approvedRelatedSelections`: three
   different approved slugs that make sense as the next read.
6. `next-app/app/guides/[slug]/page.tsx`: above the `legacyGuideSlugs` line add
   `if (slug === "<slug>") return <CardGuidePage guide={guide} />;`

Then add the slug to `buildGuideSlugs` in
`next-app/components/guides/guide-library.tsx` so it shows in "Step-by-step builds".

## 3. Cover and hero scene

`next-app/public/images/guides/<slug>.webp`, 1280x720, under 200 KB. The same
file is the library card and the `hero` scene (`kind: "scene"`, `src` = cover).
1. Use the image she drops in if there is one (convert to WebP).
2. Otherwise reuse one of her mascot illustrations in that folder that fits the
   job and is not the cover of a live guide (check `guides.json` covers of the
   slugs in `guide-publication.json` `approved`). Copy it to `<slug>.webp`.
   Show her which one you picked in the PR.
3. Only if nothing fits, use a mascot `pose` for the hero and say the cover
   needs an illustration.

Every guide image needs a phone copy next to it: `<slug>-640.webp` (640px
wide, WebP quality 80). Phones load it instead of the 1280px file, and
`validate:guides` fails without it. Make it with either:

```bash
python3 -c "from PIL import Image as I;im=I.open('next-app/public/images/guides/<slug>.webp');im.resize((640,round(im.height*640/im.width)),I.LANCZOS).save('next-app/public/images/guides/<slug>-640.webp','WEBP',quality=80,method=6)"
ffmpeg -i next-app/public/images/guides/<slug>.webp -vf scale=640:-1 -quality 80 next-app/public/images/guides/<slug>-640.webp
```

Never pick a `-640.webp` file as a cover; use the full-size name.

## 4. Build, ship, check

```bash
npx tsc --noEmit -p next-app
npm run guide:ship -- <slug>      # builds Next, copies to main-site, validates
```

`guide:ship` ends with the rebuild harness, which currently fails on `main`
too (TypeScript TS5112). Ignore only that error. Everything else must pass.

Add the new URL by hand, sorted, without re-dating other pages:
- `main-site/sitemap.xml`: `<url><loc>https://www.shiftandlead.com/guides/<slug>/</loc><lastmod>YYYY-MM-DD</lastmod></url>`
- `main-site/llms.txt`: `- <inventory title>: https://www.shiftandlead.com/guides/<slug>/` after the last guide line

Then `npm run validate:guides` must print both "passed" lines.

Browser check: serve `main-site/` (`python3 -m http.server`), open
`/guides/<slug>/?gate=1` and `/guides/`. Confirm at 1280px and 390px: no
sideways scroll, intro and open steps visible, sign-up card over a blurred
preview, later steps hidden; with `/api/guide-capture` mocked to 200, submitting
reveals every step and prompt; the guide appears under "Step-by-step builds".
Screenshot the guide and send it to her.

## 5. Hand over

Commit the source and the `main-site` output together. Push the branch and
open a **draft** PR titled `Guide: <title>`, listing: the URL it will have,
any lines of her copy that break a voice rule, the subtitles you wrote,
whether the cover is temporary, and the checks you ran. Tell her: merging
the PR publishes the guide. Do not merge, and do not publish anywhere else.
