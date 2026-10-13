# Explicit rewrite brief (owner request 13/10/2026)

The owner says the guides lost their instructions and quality. They must be written for a reader who
has never done this before, struggles with reading, and needs every single action spelled out.
Simple words AND full, explicit instructions. Short is not the goal; clear is the goal.

## THE MODEL
Read `next-app/content/rebuilt-guides/gemini-cannot-find-drive-file.ts` in full before you write.
It is the new standard. Every guide you rewrite must feel like it.

## What every guide must have
1. **Intro lead that tells a real story of the problem** in 4 to 6 short sentences: the client
   moment, what the reader does today, what AI does instead, what they get.
2. **"What you end up with"**: 4 to 5 bullets that say the RESULT in plain words, the bold part
   first. Never name a thing the reader doesn't know yet (no "find-the-file prompt").
3. **"Before you start"** (h3 + list): what device, which account or app, plan needed (free or paid,
   say "if you see X" when unsure), and one real piece of their own work to use as a test.
4. **Steps with sub-parts A, B, C** (h3) when a step has more than one job.
5. **Every click spelled out** in ordered lists: where on the screen ("top right corner",
   "the + button on the left of the chat box"), what it is called in **bold**, and **what you will
   see** after you click. One action per list item.
6. **A fallback line for every menu**: "Can't find X? Google/OpenAI/Anthropic moves these menus.
   Search \"...\" on [their help pages](official link)." Never claim a menu exists with certainty
   if you are not sure; say "on some accounts this is called ...".
7. **Before each prompt**: say where to paste it (new chat? which tool? attach a file first?) and
   what to change in [brackets].
8. **After each prompt**: an `example` block (label "What you type" or "Example question") when a
   filled-in example helps, and a `result` block (label "What a good answer looks like") showing a
   short, realistic answer. Then say exactly what to do with the answer (save it where, check what).
9. **A "check it yourself" moment** in every guide: how to spot a wrong AI answer, in steps.
10. **A troubleshooting table** ("What you see | What it means | What to do") where things can go wrong.
11. Use `contrast` blocks (`{ label, text, good: true/false }`) for bad vs good examples.
12. **Honest block**: what AI won't do and what stays with the reader.
13. **Checklist** step `num: "✓"` with concrete ticks ("One real ... done and checked").
14. 5 to 7 numbered steps. Step 01 is free (`openSteps: 1`) and must contain NO `prompt` block.
    Step 01 must still give a real first win (a setup, a test, a table). Use `example`/`result`
    blocks in step 01 if they need to type something.

## Words
- Short sentences (aim 12 words, max 18), everyday words, one idea per sentence.
- Explain every tool word in brackets the first time (e.g. "a Project (a folder in ChatGPT that
  keeps your files and rules together)").
- Use "AI assistant" (never "helper"). Use "AI agent" only for AI that takes actions by itself.
- Dollars for money. British spelling. No em dashes or en dashes anywhere.
- Never write: Lumail, review mode, editorial, approval, template, validator, community, course,
  kit, Map. No hype words. No "It is not X. It is Y." slogans.
- No invented numbers, results, client stories or quotes. Example answers are clearly examples and
  use [client] placeholders.
- Business examples only: clients, proposals, enquiries, invoices, launches, offers, calls.

## Keep exactly
`slug`, `lumailTag`, `title`, `h1`, `cover`, `coverAlt`, `hero.kind/src/alt`, `openSteps: 1`,
`cta.href`, every URL that is an official help link, and the guide's facts and menu names.
You may rewrite everything else, add steps (max 7 plus checklist), and add blocks. Gate `accent`
names the asset; keep it plain. Allowed block kinds: p, h3, list (ordered), tip, honest, prompt,
table, checklist, example, result, contrast.

## After each file
Run `npx tsc --noEmit -p next-app` from `/home/user/content-system` (fix only your files). Check
with Python (not grep) that the file has no U+2014 or U+2013. Do NOT edit other files, do NOT
build, do NOT commit. Report: files, tsc result, any menu path you were unsure of.
