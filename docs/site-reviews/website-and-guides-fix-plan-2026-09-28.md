# Website and guides: what to fix to sell — 28 September 2026

Internal working document. Not customer-facing copy.

## How this was checked

- **Shift & Lead:** rendered the current `main` (the code Vercel deploys, commit `b9bb5a3`) in Chromium at 1440px and 390px. That covered Home, Work with me, About, Workbooks, the guide library, and all 37 published guides with the gate on. The live domain could not be opened from this session because the network policy blocks it. Check the fixes below on the live site after deployment.
- **Saadia Karam:** her site could not be opened from this session either. The comparison uses the live capture recorded on 27 September (`live-offer-and-authority-audit-2026-09-27.md`, `GUIDE-COPY-STRUCTURE.md` and the guide screenshot noted there). Refresh it in a browser before copying any detail.

## The short answer

You are close. The guide machine works: useful teaching comes first, the inline form sits before the prompt, the email is delivered, tags are set, and there are clean URLs. What is missing is **commerce**. The site teaches well but does not sell clearly, and the guides do not hand readers over to paid work.

| # | Gap | Saadia does | You do now | Fix |
|---|---|---|---|---|
| 1 | Paid offer is defined | Named routes (consulting, Sprints, private session, custom systems), each with a sequence and deliverables | Two routes on Work with me, with no scope, format, deliverable, start step or price signal | Add "What you get / How it starts / Format / Investment" to each route (needs your facts, see questions) |
| 2 | One message from top to bottom | The hero says what she does, for whom, and what to click | The hero says "AI training & guidance". The next section says "business and marketing transformation". The Work with me hero says "Tell me what is changing". That is three framings. | Pick one sentence and repeat it in the hero, Work with me and About |
| 3 | Guides lead to paid work | Free guides lead to named paid routes | **0 of 37 guides** link to Work with me outside the menu | **Done in this branch:** a bridge after unlock on every guide |
| 4 | Enquiry form is reliable | Project brief form with a confirmation | The form posts straight to an n8n webhook. Visitors land on a raw webhook response, with no thank-you and no retry. | **Done in this branch:** `/api/enquiry` plus an on-page confirmation and retry |
| 5 | Proof sits next to the offer | Roles, client references and linked proof sit beside the offer | Strong proof on About (Dell/Intel/Microsoft, LeLabPlus, Nike). There are no testimonials or client results on Work with me. | Add 1–3 verified client quotes or outcomes next to each paid route |
| 6 | Consistent brand on phones | — | Headings use Impact, which iPhone and Android do not have. Home falls back to heavy Inter, but Work with me fell back to thin Arial. | **Done in this branch:** Work with me now falls back to Inter 900 like Home. Longer term, self-host one display font. |
| 7 | Guide cards look like products | Cover-led cards | Home guide cards are flat colour blocks with no cover | Use the existing guide covers on the three Home cards |

## Home page: section by section

1. **Hero.** "AI TRAINING & GUIDANCE. For your business." It is clearer than before but still generic, and the type is so large on desktop that "GUIDANCE." runs into the portrait. Fix: one plain sentence saying who you help and the result, then two buttons, "Work with me" and "Free guides" (already there). Reduce the h1 so it stays inside its column.
2. **Logo strip (Dell, Intel, Microsoft).** Good. Keep it.
3. **"Change how your business shows up and grows…"** This repeats Work with me. It is a third framing of the offer. Replace it with the two paid routes as cards (Leaders / Teams), each with one line on what they get and a button. That puts the offer on Home, which is what Saadia's home page does.
4. **"I have worked inside global technology companies…"** Good authority story. Keep it and link to About.
5. **Free guides carousel.** Add covers. Choose the three guides closest to what you sell: *Build your Instagram dashboard*, *Teach Claude a repeatable workflow*, *Turn a screen recording into a guide*.
6. **Workbooks "coming next".** The status is correctly stated. Keep it, and make sure the waitlist form is reachable from Home.
7. **"LET'S MAKE IT useful." plus newsletter.** Two actions compete here. The newsletter form asks for email only, with an optional consent box. Its promise is fine, but "Send me the guides" should say what arrives and how often, if you have a cadence.

## Work with me: what a buyer still cannot answer

A buyer reading this page today cannot tell:
- **What exactly they receive.** For example a session, a written plan, team materials or reusable instructions. The team programme says "work made from its own brief, reusable instructions and a clear next use". That is the best line on the page. The leader route has nothing equivalent.
- **How it starts.** For example a call, a short brief, then a proposal. State the real first step.
- **Format and size.** Remote or on site, one session or several, team size. Only state what you actually offer.
- **Investment.** Even "from X" or "quoted after a short call" removes a reason not to enquire.
- **Proof for this service.** Testimonials exist elsewhere on the site but not on this page.

The **"Create your own AI twin"** option in the industry picker conflicts with `context/offers.md`, which says the customer AI Twin release is parked with no purchase CTA. Either confirm it is now for sale or remove it from the picker.

## About

This is the strongest page. The career arc, Nike × LeLabPlus with independent links, press and talks all work. One fix: end the page with the two paid routes (it currently ends with "See how we can work together", which is fine), and add one line on what you do for clients now.

## Guides: the whole library (applies to all 37)

1. **Bridge to paid work.** *Done in this branch.* After the reader unlocks the prompt, a short block says: "Want your team working like this? I run a practical AI programme for teams, adapted to your industry and built on your own work. I also help leaders decide what AI should change in their business and marketing." It links to Work with me. The copy only restates what the live Work with me page already says. Your approval is needed before the guide pages are regenerated.
2. **Form friction.** Three required fields (first name, last name, email). Dropping last name is the easiest conversion gain. The contract currently requires it, so this is your call.
3. **Newsletter opt-in wording.** "Also send me practical Shift & Lead emails and product updates" is vague, and it is the only route into your nurture list. Name the benefit, for example "Send me the next practical guide when it is published".
4. **Topic tagging stops after the first guide.** Once someone unlocks one guide, every guide opens on that device. Lumail then only knows the first topic they came for. Consider sending a silent tag on later `guide_open` events so you can see who reads Copilot guides versus content guides. That is useful for picking whom to offer the team programme to.
5. **Library balance.** 25 of 37 guides test one specific tool (Grok ×4, DeepSeek ×4, Kimi ×2, Muse ×2 …). Only 2 guides sit under "Business operations". Your paid offer is about teams creating content, images, video and repeatable tasks. Write the next guides in that area, not more tool tests.

## Guides one by one

"Cards" means onward guide cards (the brief asks for three). "Teaching before form" means visible characters before the email form.

| Guide | Teaching before form | Cards | Fix |
|---|---|---|---|
| what-is-ai | 1930 | 3 | Good. Add bridge (done). |
| ai-jargon-guide | 1362 | 3 | Good. |
| what-is-agentic | 2570 | 3 | Longest pre-gate teaching. Fine, but check the form is not below the fold on phone. |
| what-should-you-never-share-with-ai | 1076 | 3 | Library hero feature. Good first guide. |
| which-ai-tool-for-what | 1685 | 3 | Good. Natural lead-in to the team programme. |
| make-chatgpt-answers-shorter | 1264 | 3 | Good. |
| stop-chatgpt-forgetting-context | 1448 | 3 | Good. |
| chatgpt-scheduled-tasks | 1059 | 3 | Niche use case (page-change monitoring). Low commercial value. Keep but do not feature. |
| chatgpt-screen-recording-to-process-guide | 1081 | **2** | Add a third card. Strong match for the team programme ("repeatable task"). Feature it on Home. |
| chatgpt-customer-research-with-evidence | 1896 | **2** | Add a third card. Strong match for the leader route. |
| claude | 1221 | 3 | Good. |
| claude-projects | 1091 | 3 | Good. |
| teach-claude-a-repeatable-workflow | 1836 | **2** | Add a third card. Feature on Home. |
| gemini-cannot-find-drive-file | 1567 | 3 | Troubleshooting. Fine. |
| gemini-google-tasks-limits | 1018 | 3 | Very narrow. Consider parking. |
| check-copilot-excel-edits | 1377 | 3 | End-to-end capture tested on 27/09. Good. |
| what-can-copilot-see-at-work | 1715 | **2** | **Slug and title disagree** (the slug says "what can Copilot see", the page is "Get through your inbox with Copilot"). Add a third card. |
| meta-ai | 1913 | **2** | Slug says Meta AI, page is about Meta Muse. Add a third card. |
| test-meta-muse-money-saving-task | 1275 | **2** | Consumer-leaning (price comparison). Weak fit for professionals. Consider parking. |
| review-grok-suggestions | 2157 | 3 | Fine. |
| get-better-professional-writing-from-grok | 1405 | 3 | **Slug promises professional writing, H1 is "Can Grok Bot do one useful job for you?"**. Align the title with the slug. |
| verify-grok-current-research | 1419 | **1** | Only one onward card. Add two. |
| test-grok-repeated-image-edits | 1290 | **1** | Only one onward card. Add two. Relevant to the programme's "images". |
| fix-deepseek-wall-of-text | **900** | 2 | Thin teaching before the ask, and fiction-writing focused. Add a work example or park. Add a third card. |
| edit-long-writing-with-deepseek | 2017 | **2** | Fiction-writing focused (characters, scenes). Off-audience for professionals. Consider parking. |
| test-deepseek-v4-document-work | 1826 | **2** | Add a third card. |
| protect-a-long-deepseek-project | 1977 | **2** | Add a third card. |
| make-work-tracker-with-kimi | form at step 2 | 3 | By design. Check phone users reach step 2. |
| is-kimi-worth-paying-for | **564** | 3 | **Least teaching before the ask on the site.** Move the worked example above the form. |
| manus-browser-workflow | 1125 | **2** | Add a third card. |
| mistral-multilingual-research | 1206 | **2** | Add a third card. |
| instagram-content-dashboard | 1608 | 3 | Your flagship build guide and closest to the offer. Feature it. |
| what-is-a-prompt | 1206 | 3 | Good. |
| what-is-an-ai-browser | 2214 | 3 | Good. |
| connect-ai-to-email-files-calendar | 1329 | 3 | Good. |
| ai-skills-worth-learning-for-work | 1548 | 3 | Good bridge to the team programme. |
| show-up-in-ai-search | 1086 | 3 | Strong fit for the leader route ("how customers find you"). Feature it on Work with me. |

Automated checks on all 37 guides: each has a heading and loaded cover, and an inline form before the prompt (Kimi tracker at step 2). No horizontal overflow at 390px, and no production wording leaked (review mode, template, Lumail, editorial).

## Questions only you can answer (needed to finish Work with me and Home)

1. For **Business & marketing transformation**: what does a client get, how does it start, and how long does it usually run?
2. For the **Practical AI programme**: remote or on site, how many sessions, what team size?
3. **Price signal:** publish "from X", "quoted after a call", or nothing?
4. **Testimonials:** which verified client quotes can go on Work with me?
5. **AI twin:** is it for sale now, or should it leave the industry picker?
6. **Form:** may the guide form drop the last-name field?

## Done in this branch

- `main-site/api/enquiry.js`: server-side enquiry route. It forwards to the existing lead webhook (override with `ENQUIRY_WEBHOOK_URL`) and returns a clear error if the forward fails. Enquirers are not added to the email list, because they have not given marketing consent there.
- `main-site/assets/industry-sessions.js`: the enquiry form sends through `/api/enquiry` and shows a thank-you or a retry message on the page. Without JavaScript it still posts to the webhook as before.
- `main-site/assets/work-with-me-v3.css`: Inter replaces the Arial fallbacks so the page matches Home on phones. Styles added for the form status messages.
- `next-app/components/guides/guide-access-boundary.tsx` plus CSS: a Work with me bridge shown only after unlock, on every guide. The source is built and checked (hidden before unlock, visible after, no phone overflow). **The published guide HTML is not regenerated.** Run `npm run publish:guides` after you approve the copy.

## Still to verify after deploy

- Submit the enquiry form on the Vercel preview and confirm the lead arrives wherever the n8n webhook delivers it.
- After `publish:guides`, open two guides on a phone, unlock, and click the bridge.
