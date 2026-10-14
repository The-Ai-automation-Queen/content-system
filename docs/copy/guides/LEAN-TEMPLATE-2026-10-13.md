# Lean guide template (owner-approved 13/10/2026)

The owner approved ONE model: `next-app/content/rebuilt-guides/ai-skills-worth-learning-for-work.ts`.
It follows her own Brand Brain guide. Read it first and copy its shape, length and tone exactly.
Every guide must look like it. Do not add anything it does not have.

## Shape (in this order, nothing else)
- `hero.line`: one short line. What the reader gets.
- `intro.heading`: 3 to 7 words. What they get.
- `intro.lead`: 2 or 3 short sentences, under 40 words. The problem in one line, what this guide
  does, how long it takes. No story, no "Here is the problem", no "In this guide you will".
- `intro.blocks`: exactly `h3 "What you end up with"`, then a `list` of 3 to 5 bullets naming real
  things they make (bold part first, under 12 words each), then ONE `tip` saying what they need
  (account, plan) and "Copy each prompt as it is and change the [brackets]."
- `gate`: heading "Get the", accent = the main thing they make, lowercase, ending with a full stop.
  promise and action exactly as in the model.
- `steps`: 4 to 7 numbered steps, then the `✓` checklist step. Each step:
  - `title`: an action, 2 to 5 words. `accent`: 2 to 5 words, ends with a full stop.
  - One `p` of 1 or 2 short sentences: why this step.
  - The clicks as an ordered `list` (one short action per item, button names in **bold**) when the
    step happens in an app.
  - The `prompt` (step 01 must have NO prompt block).
  - One short `p` or ordered `list`: what to do with the answer.
  - A `tip` only for a "Can't find it?" fallback with the official help link, or a must-know
    safety line. Max one tip per step.
  - A `table` only when it truly replaces text (like the four details in the model). Never more
    than one table per guide unless the facts need it.
- At most ONE `honest` block in the whole guide, and only if it matters (privacy, money, safety).
- Checklist step: title "Checklist", accent like "Five boxes.", 3 to 6 short ticks.
- `cta` and `conclusion`: short, like the model. Keep `cta.href`.

## Not allowed (the owner rejected these)
No "Before you start" list. No `example`, `result` or `contrast` blocks. No troubleshooting tables.
No stories. No "habits", "routine", "system", "framework". No tables that point to step numbers.
No rules the owner did not ask for. No long explanations.

## Words
The simplest words possible. Most sentences under 10 words. If a tool word is needed, explain it
in brackets once. "AI assistant", dollars, British spelling. No em or en dashes. Never write:
Lumail, review mode, editorial, approval, template, validator, community, course, Map, helper.
"kit" only in the owner's names Brand Kit and AI Starter Kit. No invented numbers or claims.
Use [client], [price] etc. for private details in prompts. Prompts keep: "Use only what I give
you", "write [CHECK] when something is missing", "never make up names, prices, dates or promises"
where they produce client-facing work.

## Keep exactly
slug, lumailTag, title, h1 (h1.title + " " + h1.accent must equal title), cover, coverAlt,
hero.kind/src/alt, openSteps: 1, cta.href, official help URLs, the guide's facts and the real
things it builds. seoDescription under 160 characters, starts with the search phrase, and any
step count in it must match. Set `minutes` honestly (15 to 45).

## After each file
Run `npx tsc --noEmit -p next-app` from /home/user/content-system. Check with Python that the file
has no U+2014 or U+2013. Do not build, do not commit, do not edit other files. Report per guide:
step titles and the "What you end up with" bullets.
