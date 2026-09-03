# Shift & Lead guide production framework

This is the single operating framework for writing, approving, building and publishing the Shift & Lead guide series.

## The rule that prevents drift

The guide inventory is not the public library.

- `next-app/content/guides.json` keeps existing and future guide ideas.
- `data/guide-publication.json` is the only public approval registry.
- A guide that is not in the registry stays hidden from the library, search, featured areas and related-guide cards.
- Never infer approval from an old HTML page, an inventory status, a spreadsheet, a previous title or a finished draft.
- Add one guide to the public registry only after Fatiha approves its copy and complete preview.

## The workflow

### Classify every request before writing

When Fatiha asks for a guide, first add the idea to `next-app/content/guides.json` and determine:

- whether it belongs in the free library, should be reserved for a paid product, or should not be published;
- its reader level: beginner, intermediate or expert;
- its learning lane and outcome section;
- the single reader question and useful outcome;
- its journey order and the three logical guides that should follow it;
- its status: idea, copy review, copy approved, page review, page approved, published or paid candidate.

Free guides explain knowledge, choices and a useful first action. They must not give away a complete proprietary method, implementation system or paid product. A request does not become a free guide automatically.

Keep every classified idea in the content inventory, including hidden, rewritten, paid-candidate and rejected ideas. The approval registry controls public visibility; it does not delete the content base.

Each guide moves through these gates in order:

1. **Choose the next guide.** Confirm its reader question, journey level and library section.
2. **Draft the copy only.** Show the complete copy to Fatiha before changing the page.
3. **Copy approval.** Record explicit approval. Revision requests are not approval.
4. **Build the approved copy.** Use the fixed guide page system. Do not redesign the portal, header, footer, gate or global template during a copy build.
5. **Preview the complete page.** Check desktop and mobile, the email gate, images, links, prompt and three related guides.
6. **Page approval.** Add the guide to `data/guide-publication.json` in its correct section and journey order.
7. **Publish only that guide.** Build, run the framework validator, copy the generated guide and library files, then push only after Fatiha asks.
8. **Verify production.** Check the custom-domain guide, library card, image, Lumail tag and internal links.

If approval is unclear, stop before step 4 or step 7, whichever applies.

The publishing tool rejects any slug missing from the approval registry. `npm run publish:guides` reads the registry instead of keeping a second hard-coded guide list.

## Writing framework

Every guide answers one useful question for a capable non-specialist. It should sound like a trusted friend who understands the technology and gets to the point.

### Voice

- Use spoken, conversational sentences and day-to-day words.
- Answer before explaining.
- Be accurate without sounding academic.
- Explain a technical term immediately or replace it.
- Give the reader a useful decision, action or result, not a tour of everything known about the topic.
- Speak to the reader. Do not make Fatiha the example.
- Name the exact human work that remains: choosing the source, recognising context, setting the standard, checking the claim, approving a consequence or accepting responsibility.
- Use UK English.
- Do not use em dashes.
- Write `one` as a word in normal prose or a title when it sounds natural. Use digits for numbered steps, promised list counts, measurements, prices and technical values.

### Required page sequence

1. **Title and direct promise.** No metadata, reading time, date, byline or internal labels.
2. **Email access gate on first visit.** One reusable gate, one email field, one Lumail request and the guide-specific tag. A recognised visitor should not be asked again on every related guide.
3. **The answer.** Two or three short paragraphs that answer the title in language a beginner can repeat.
4. **The useful explanation.** Choose the format that fits the reader's job: comparison, grouped definitions, steps, checklist or decision guide. Do not force every guide into identical sections.
5. **What still needs the reader.** Weave the relevant judgement, context or responsibility into the explanation. Do not add a repeated “human layer” label.
6. **Try it now.** Give a useful copy-and-paste prompt or a specific action that takes about 10 minutes or less. Show where to open the tool, what to copy, what to replace, how to send it and how to check the result.
7. **Conclusion.** Tell the reader what they now understand or can do. Do not repeat the opening.
8. **Continue.** Show exactly three logical next-step slots. Use approved guides when available. A planned guide awaiting copy approval may appear as a clearly marked, non-clickable `Coming next` placeholder, never as a broken link.

### Tool-specific guide addition

A guide about ChatGPT, Claude, Gemini, Copilot or another tool must work for someone opening that tool for the first time. Include only current, verified information:

- what the tool is best for and when to choose something else;
- the official signup or access path;
- account and plan choices that change the experience;
- where to start a first task;
- the main everyday features;
- advanced features in a clearly marked section, such as Codex or Claude Code, when relevant;
- how to connect or enable each important feature;
- privacy and training controls with official links;
- one useful first task and a result-checking method;
- the date-sensitive source links used to verify the guide.

Do not assume the reader already knows where prompts go, where settings live or how to start a new chat.

## Fixed design rules

The site header is shared across the main website and every guide. The Shift & Lead wordmark uses Playfair Display at 21px, line-height 1, regular weight 400 and -0.03em letter spacing. Desktop navigation uses Inter at 12px, line-height 1, regular weight 400, 0.08em letter spacing and uppercase labels. Never create a page-specific bold, larger or smaller version of the logo or navigation.

- The guide library keeps its approved structure. A copy revision must not redesign it.
- The guide page keeps one clean reading layout with a full-width cover, readable body and clear sections.
- Never place text over an image where it overlaps the mascot or illustration.
- Do not put titles over library-card images. Card titles sit below the image.
- Keep cover images in WebP and use the blue robot mascot, not a human queen.
- Keep hero covers at 16:9 on every screen. Mobile must scale the complete artwork down and must not switch to a taller crop.
- Use responsive title sizes with `clamp()` and no manual line breaks.
- Eyebrows and small labels are at least 12px.
- Do not use decorative vertical lines.
- Cream may be used only where the approved template already uses it. Do not introduce new beige sections during a guide build.
- Use bold sparingly to make dense copy skimmable.
- Keep three related cards equal in height with their actions aligned.
- Motion is optional and must improve hierarchy or comprehension. Do not add Three.js or GSAP to decorate a simple guide.

## Approval checklist

Before adding a guide to the registry, confirm all of the following:

- Fatiha approved the full copy.
- The page answers one question.
- The opening is direct and conversational.
- Technical definitions are accurate and sourced.
- The action is useful in everyday work.
- The email gate uses a unique guide tag and one successful Lumail request.
- The page has a useful conclusion.
- All three journey slots are present. Live cards point to approved guides; planned cards are clearly marked, non-clickable placeholders.
- Desktop and mobile have no clipped text, forced title break, broken image or horizontal scroll.
- The header and footer match the current live homepage.

## Current site shell

The guide header uses the focused live site navigation. The Shift & Lead wordmark is the route back to the homepage:

`Guides · Workbooks · About`

The logo, menu links and mobile menu control use regular font weight. Do not
reintroduce bold navigation typography.

The footer groups are:

- **Learn:** Guides, Workbooks
- **Explore:** Guides, Workbooks
- **About:** About Fatiha
- **Legal:** Privacy, Terms
- **Legal:** Privacy, Terms, Refunds, Licensing

On screens up to 760px, keep the footer compact: navigation links are 14px,
section labels are 12px, the guide wordmark is 19px and spacing must tighten
without clipping or horizontal overflow. Desktop footer typography stays unchanged.

Any appearance of `Quiz` in the guide shell is stale and must fail validation.

## Production route

- Official URL: `https://www.shiftandlead.com/guides/`
- Deployable file: `main-site/guides/index.html`
- Editable source: `next-app/app/guides/page.tsx` and `next-app/components/guides/guide-library.tsx`
- Vercel output directory: `main-site`

Do not review or publish `site/guides/`, an archived HTML copy or a temporary worktree as the canonical library. The generated `main-site/guides/index.html` must declare the official URL as its canonical link before it can pass validation.
