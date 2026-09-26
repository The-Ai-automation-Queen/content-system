# Shift & Lead guide production framework

This records repository-specific production details for the Shift & Lead guide series. The latest owner instructions and `docs/shift-lead-website-and-guides-goal-2026-09-27.md` control writing, layout, capture and release. The old `shift-lead-guide-builder` skill is superseded.

## The rule that prevents drift

The guide inventory is not the public library.

- `next-app/content/guides.json` keeps existing and future guide ideas.
- `data/guide-publication.json` is a publication registry, not proof of current editorial approval. Reconcile it with the owner's explicit decisions and `data/guide-rebuild-plan.json` before release.
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
4. **Build the approved copy and layout.** Use the guide's approved full-page visual reference. Reuse site chrome and working components where appropriate; do not let a legacy renderer decide the page format.
5. **Preview the complete page.** Check desktop and mobile, the email gate, images, links, prompt and three related guides.
6. **Page approval.** Add the guide to `data/guide-publication.json` in its correct section and journey order.
7. **Publish only that guide.** After final page approval, build, run the framework validator, copy the generated guide and library files, and push unless Fatiha explicitly holds release.
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

### Current page anatomy, adapted to the reader's job

1. **Specific promise and map.** Say what the reader can accomplish. A compact contents map should show the journey, without forcing identical section counts.
2. **Useful public opening.** Answer the immediate question and show a realistic worked example. A beginner should see how to use the guide before being asked to adapt it.
3. **Task-specific teaching.** For a tool or method, explain what it does for this job, why it fits, how to start and what to check. Use a build map, diagnosis, decision aid, real tool example or short sequence as appropriate. Each section should earn its place.
4. **Natural inline capture.** Put a compact Lumail form after useful teaching at the point where the reader wants the next resource. If the guide has a prompt, the form must precede the full prompt and Copy button. Tell readers exactly what unlocks. Keep first name, last name and email; marketing consent is separate and optional. Reveal gated content only after success.
5. **Practical action and result check.** Give complete, uncollapsed copyable instructions with the Copy action inside the prompt block. Explain how to judge the result. Use verified, identity-scrubbed screenshots only where the interface matters.
6. **Finish and continue.** Name the result the reader gained and offer varied relevant next guides with working links. Do not repeat the same footer cards across the library.

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

## Site design and page-specific layouts

The site header is shared across the main website and every guide. The Shift & Lead wordmark uses Playfair Display at 21px, line-height 1, regular weight 400 and -0.03em letter spacing. Desktop navigation uses Inter at 12px, line-height 1, regular weight 400, 0.08em letter spacing and uppercase labels. Never create a page-specific bold, larger or smaller version of the logo or navigation.

- The guide library keeps its approved structure. A copy revision must not redesign it.
- Every rebuilt guide uses a dedicated, task-appropriate interactive Next.js composition. The current static article renderer is legacy infrastructure, not the target layout. Use the approved Instagram guide's compact visual hierarchy as the reference without copying its five steps or two choices into unrelated topics.
- Keep the back link, site header and footer consistent with the live site. Set each guide's content width from its approved layout and check it at desktop and mobile sizes.
- Never place text over an image where it overlaps the mascot or illustration.
- Do not put titles over library-card images. Card titles sit below the image.
- Keep production cover images in WebP at `public/images/guides/<slug>.webp`; use the blue robot mascot, not a human queen.
- Export covers at 16:9, no more than 1280px wide and no more than 200 KB. Keep the generator original outside the production path when preservation is useful.
- Keep original topic-specific artwork visible without cropping out the subject. The cover may be placed within the approved hero composition rather than imposed as a full-width article banner.
- Use responsive title sizes with `clamp()` and no manual line breaks.
- Use Shift & Lead colours with sufficient contrast across every rebuilt guide: white reading surface, cobalt and deep blue hierarchy, and cool pale-blue supporting panels. Do not carry cream panels or the current static article styling into the new guide format.
- Eyebrows and small labels are at least 12px.
- Do not use decorative vertical lines.
- Use pale-blue panels only where they help the approved guide's hierarchy.
- Use bold sparingly to make dense copy skimmable.
- Keep three related cards equal in height with their actions aligned.
- Motion is optional and must improve hierarchy or comprehension. Do not add Three.js or GSAP to decorate a simple guide.

### Reusable behavior contract

Reuse working components for prompt copying, progress, screenshots and Lumail submission when they fit the approved guide. A shared component supplies behavior, not a mandatory layout. The Instagram walkthrough is a dedicated Next.js composition with its approved two choices and five-step map. Its inline capture follows useful material. When the owner changes a design or form position, update source, validation and instructions together.

The library-wide target is a compact inline Lumail form with first name, last name, email, optional marketing consent and a guide-specific tag. The content before and after capture adapts to the reader's job. Do not describe an entry-modal guide as migrated.

On the Instagram guide, keep the current layout but select “Let an agent guide me” and the first “Meta setup” tab when the guide opens. Reopening may retain completed checkmarks, but it must begin on the first tab rather than a previously visited step. This default does not apply to other guides.

## Approval checklist

Before adding a guide to the registry, confirm all of the following:

- Fatiha approved the full copy.
- The page answers one question.
- The opening is direct and conversational.
- Technical definitions are accurate and sourced.
- The action is useful in everyday work.
- The email form uses a unique guide tag and one successful Lumail request at its approved position.
- The page has a useful conclusion.
- All three journey slots are present. Live cards point to approved guides; planned cards are clearly marked, non-clickable placeholders.
- Desktop and mobile have no clipped text, forced title break, broken image or horizontal scroll.
- The cover is a topic-specific WebP used in the approved page composition.
- The form follows useful teaching and an example, at a natural handoff before the next resource. Consent text is clear and marketing consent remains optional.
- Typography, contrast and section hierarchy match the approved full-page reference at desktop and mobile sizes.
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
