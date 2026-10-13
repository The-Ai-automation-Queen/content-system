# Rebuild brief: every guide on the Brand Brain model (owner-approved 13/10/2026)

The owner approved guide 1 (`start-using-ai-in-your-business` in `next-app/content/card-guides.ts`)
as THE template. Read that entry first, then the `brand-brain-guide` entry under it. Every rebuilt
guide must read like those two.

## Who reads these
Business owners who sell their expertise: consultants, coaches, freelancers, small studio or agency
owners (1 to 10 people). They already pay for or tried ChatGPT/Claude, feel overwhelmed, and want
something that works for their business. Not employees, not beginners chasing passive income.

## What makes the template work (do all of these)
1. **The reader builds something they keep.** Every guide ends with a named, saved asset (a profile,
   a project, a checklist, a policy, a spreadsheet, a saved set of instructions). Say what it is in
   "What you end up with" (4 to 5 bullets, the asset names in **bold**).
2. **Numbered steps that build on each other** (5 to 7 steps, `num: "01"`...), then a `✓` checklist
   step. Each step: a 2-to-6-word title, a short `accent` subtitle ending with a full stop, one plain
   sentence saying what the step is for, then exact actions (`list` with `ordered: true`: where to
   click, what you'll see), then the prompt where it is used, then what to do with the answer.
3. **Prompts that produce real output.** Interview-style where useful ("Ask me one at a time and wait
   for each answer"), with [brackets] for the reader's details, an exact output format (table columns,
   sections, character limits), and safety rules: "use only what I give you", "write [CHECK] where
   information is missing instead of guessing", "never invent names, prices, dates or promises".
4. **Business examples only:** clients, proposals, enquiries, invoices, launches, offers, calls.
   No "my boss", no team meetings at a company, no household chores, no personal bills.
5. **Plain English, short sentences, explicit.** Assume the reader has never done this. Explain any
   tool word in brackets the first time.
6. **Product steps:** menus change. Give the path you believe is current, and ALWAYS a fallback line
   ("If you can't find it, ..." or a link to the vendor's official help page). Never invent a menu
   item with certainty. If a feature may not exist on the free plan, say "If you see X..., if you don't...".
7. **Tables** for comparisons and "good first / leave for later" style choices. **tip** for fallbacks
   and "Stuck?" help. One **honest** block near the end (what AI won't do, what stays with them).
8. **Gate:** `openSteps: 1`. Step 01 is free and must contain NO `prompt` block (setup, a table, the
   rules). Every `prompt` block is in step 02 or later.
9. CTA: point to the next guide in the reader's journey (given per guide below), with a one-line
   reason. Label ends with " →". `href` is `/guides/<slug>/`.

## Hard rules
- No em dashes or en dashes anywhere. Use commas, colons or full stops.
- No invented numbers, results, statistics, client stories or quotes. Examples are labelled examples.
- No prices, no paid offers, no "community", no course, no Map, no kit. CTA goes to another free guide.
- Never write these words anywhere: Lumail, review mode, editorial, approval, template, validator.
- Do not use "It is not X. It is Y." or symmetrical "not this, but that" slogans. No hype words
  (revolutionise, game-changer, unlock your potential, 10x).
- British spelling (summarise, organise, colour).
- Keep the reader's data safe in every prompt: names swapped for [client] etc.

## File format
Create `next-app/content/rebuilt-guides/<slug>.ts`:

```ts
import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "<slug>",
  lumailTag: "<lumailTag given below>",
  title: "<exact title given below>",
  cover: "<hero.art.src from the old guide>",
  coverAlt: "<hero.art.alt from the old guide>",
  seoDescription: "<under 160 characters, starts with the search phrase>",
  tool: "<tool name>",
  minutes: 30,
  h1: { title: "<title minus the last 2 to 4 words>", accent: "<last 2 to 4 words>" },
  hero: { kind: "<hero.art.kind>", src: "<hero.art.src>", alt: "<hero.art.alt>", line: "<subtitle given below, may extend by one short sentence>" },
  intro: { heading: "...", lead: "...", blocks: [ {kind:"h3",text:"What you end up with"}, {kind:"list",items:[...]}, {kind:"tip",text:"You need ... Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]."} ] },
  openSteps: 1,
  gate: { heading: "Get the", accent: "<asset name>.", promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.", action: "Open the rest of the guide" },
  steps: [ ... ],
  cta: { eyebrow: "Next step", heading: "...", accent: "...", body: "...", label: "... →", href: "/guides/<next>/" },
  conclusion: { heading: "...", paragraph: "...", finishLine: "..." },
};
```

Only these block kinds: `p`, `h3`, `list` (optional `ordered: true`), `tip`, `honest`, `prompt`
(`label`, `text` as a template literal), `table` (`head`, `rows`), `checklist`.
Inline marks allowed in text: `**bold**`, `*italic*`, `[label](https://link)` or `[label](/guides/slug/)`.

The old guide's data (facts, product paths, official links worth keeping) is in
`/tmp/claude-0/-home-user/6c052983-ee6a-5407-adf4-cb2d51e14695/scratchpad/dump/guides.json`
keyed by slug. Reuse its correct facts and official links; rewrite everything else.

After writing each file, run `npx tsc --noEmit -p next-app` from `/home/user/content-system`
(other writers work in parallel; only fix errors in YOUR files). Then check your files contain no
`—` or `–`. Do NOT edit any other file, do NOT run builds, do NOT commit.
