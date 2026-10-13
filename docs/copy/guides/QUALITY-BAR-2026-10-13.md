# Guide quality bar (owner rejected the last pass on 13/10/2026)

The owner read "Why Are My ChatGPT Answers So Average?" and said the quality is poor and the
instructions were not applied to every guide. The fixed version is
`next-app/content/rebuilt-guides/ai-skills-worth-learning-for-work.ts`. Read it, then read
`gemini-cannot-find-drive-file.ts`. Those two are the bar. Every other guide must meet it.

## What was wrong (do not repeat)
- **Meta homework instead of results.** Step 01 asked the reader to find an old chat, read a table of
  "causes" and "match it". That teaches nothing and produces nothing.
- **Abstract promises.** "3 habits", "the reason your answer was average", "a better answers routine",
  "a way to check". The reader cannot picture what they get.
- **Tables that point to other steps** ("STEP 02", "fixes in step 04"). Confusing.
- **Concept step titles** ("Find why your last answer was average"). Titles must be actions.

## The bar (every guide must pass all 10)
1. **One concrete thing made today.** The hero line and the intro lead name the real output the
   reader will have at the end: a sendable email, a saved Claude project, a spreadsheet, a
   cancelled subscription. Never "habits", "routine", "system", "framework", "mindset".
2. **The intro lead tells the client moment** (what happens today, why it goes wrong, what they will
   do instead) in 4 to 6 short sentences.
3. **Step 01 is a hands-on win in under 10 minutes.** The reader does something in the real tool and
   sees a result. Use `example` (What you type) and `result` (What you should see) blocks. No
   `prompt` block in step 01. No self-diagnosis, no "think of a time", no reading-only steps.
4. **Every step title is an action** (Give it your notes, Check it before you send, Save your rules).
5. **Every step produces something** and says what to do with it next ("Copy the email into your
   email app. Do not send it yet.").
6. **One running business example** (one client, one job) used from step 01 to the end, with
   [brackets] for private details.
7. **Every click is spelled out**: where on screen, the button name in **bold**, what you will see.
   Every menu has a "Can't find it?" line with the official help page.
8. **Every prompt** is followed by a short, realistic `result` ("What a good answer looks like").
9. **A check-it-yourself part** with a "What you see | What it means | What to do" table that
   talks about the output, never about step numbers.
10. **No waste.** 4 to 6 numbered steps plus the checklist. Cut anything that does not lead to the
    output. No tables of theory. Simple words, short sentences, "AI assistant", dollars, British
    spelling, no em or en dashes, none of: Lumail, review mode, editorial, approval, template,
    validator, community, course, Map, helper. "kit" only in the owner's names Brand Kit and
    AI Starter Kit.

## Keep exactly
slug, lumailTag, title, h1, cover, coverAlt, hero.kind/src/alt, openSteps: 1, cta.href, official
help URLs, the guide's facts. You may rewrite hero.line, intro, gate.accent (plain, lowercase),
steps, cta copy (not href), conclusion, seoDescription (under 160 characters, starts with the
search phrase), minutes.

## Process for each guide
1. Score the current file against the 10 points. Write down every failure.
2. Rewrite the guide so it passes all 10. Most guides need step 01 and the intro redone; many need
   steps merged or cut.
3. Run `npx tsc --noEmit -p next-app` from /home/user/content-system. Check with Python that the
   file has no U+2014 or U+2013.
4. Report per guide: the failures you found, what the reader now makes, the step titles, and any
   menu path you are unsure of. Do not build, do not commit, do not edit other files.
