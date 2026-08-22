# Source brief: Check an AI answer before you use it

## Publishing contract

- Public title: `Check an AI answer before you use it`
- Canonical slug: `check-ai-answers`
- Canonical route: `/guides/check-ai-answers.html`
- Level: Beginner
- Hub: Better prompts and answers
- Exact outcome: Get better answers
- Composition: Tutorial
- Reader start state: the reader already has an AI answer with factual claims, sources or assumptions that could affect a message, action or decision.
- Reader finish state: the reader can show what supports each important claim, mark it Supported, Needs context, Not supported or Cannot check, and choose Keep, Rewrite, Remove or Ask a qualified reviewer before use.
- Beginner boundary: this guide teaches the basic claim-to-source check. The hub owns the broader job of evaluating and improving the whole answer, including Intermediate work.
- Ending: clean decision rule. Do not add a commercial CTA or a 2nd capture.

The source phase creates only this brief. It does not create TypeScript, artwork, a PDF, catalogue entries, capture mappings or route integration.

## Title, promise and SEO locks

- Locked H1: `Check an AI answer before you use it`
- Direct promise: `Find the claims that matter, check them against the original information and decide what to keep, rewrite, remove or send to a qualified reviewer.`
- SEO title: `Check an AI answer before you use it | Shift & Lead`
- Meta description: `Check important AI claims against original information, mark what is supported and decide what to keep, rewrite, remove or send to a qualified reviewer.`
- Search intent: check AI answers, fact-check AI, verify AI claims, check AI sources, AI answer accuracy.
- Cover title: use the locked H1 as live HTML. Do not bake text into the artwork.
- Creator signature: show `The AI Automation Queen` as simple live HTML in the open-guide hero and the full signature in metadata and the footer. Cards use the mascot and level without a creator-name box.

## Exact boundary from the hub and prompt tutorial

`what-is-a-prompt` owns the work before the answer. It teaches the reader how to name the job, provide information, set limits and request a useful result.

`better-prompts-and-answers` owns the full route from brief to answer. Its prompt builder and scorecard check task fit, evidence, completeness, limits, use and uncertainty across the whole answer.

`check-ai-answers` owns the narrow work after the answer exists. It breaks important statements into claims, opens the original information, records what each source supports, tests assumptions and makes a final use decision.

This guide must not repeat:

- the 4-step prompt lesson or useful prompt brief from `what-is-a-prompt`;
- the 9-field prompt builder or 6-part answer scorecard from `better-prompts-and-answers`;
- the full source-to-publish workflow from `research-to-content-workflow`;
- a list of prompts presented as accuracy fixes;
- product-specific setup, modes, model comparisons or provider instructions.

The boundary is simple: the prompt guide helps the reader ask. The hub helps the reader build and improve. This guide helps the reader verify before use.

## Production records reviewed

| Record | Use | SHA-256 |
| --- | --- | --- |
| `docs/GUIDE-EDITORIAL-STANDARDS.md` | Reader-job structure, density, capture and plain-language rules | `e076bea599b35727dc64ac1cb550e21a6a477a3bd5b8980a6d583abf6a8b2341` |
| `docs/GUIDE-LIBRARY-PRODUCTION-CONTRACT.md` | Exact taxonomy, capture, brand, route and related-card requirements | `427d49a6a587d79d4300a665f1b344a042ca4d923a28494c591bc87c520f8e1a` |
| `docs/GUIDE-MIGRATION-MATRIX.md` | Better prompts hub boundary and source-brief contract | `6f792100d39611baab46edfab631ba908f296c1fe3898e5e20da5aba68cf168f` |
| `next-app/content/structured-guide.ts` | Current structured tutorial, capture, practical asset and ending schema | `f954e26595120bac345fa4d2d0175c91ada4e3c3b1f037d3d1189d6828853807` |
| `next-app/content/guides.json` | Current catalogue and related-guide availability | `dbe3e3bec06626fbd675d7fab5f7cd7242729422c2f1f7a69ce9e686d35a731a` |
| `next-app/content/guides/better-prompts-and-answers.source.md` | Hub source boundary, retained verification mechanics and exclusions | `4a3bcc6f1515647833dd84b32ddc81043c037ddfaa4deadc52db414e307f8a62` |
| `next-app/content/guides/better-prompts-and-answers.ts` | Current reader sequence, scorecard, example and related routes | `600d878eb9cd0408eaf26b16db2778c6918306f828ca9a6ea4c97955c56721dd` |
| `next-app/content/guides/what-is-a-prompt.source.md` | Prompt-tutorial source boundary and retained beginner mechanics | `5b47466fb3946161c8a50a39e06b1a103cc4f6417bee952f22afe706cecd1229` |
| `next-app/content/guides/what-is-a-prompt.ts` | Current prompt lesson and practical brief | `7d1a244aabd69dcfa0589ae9b18d01cdfb8fa2c45a2729abe4d98f85e0e20670` |

## Workbook evidence inspected

- Workbook: `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/outputs/guide-editorial-review/shift-and-lead-guide-portfolio-review.xlsx`
- SHA-256: `3f19ce36963d309c6df34c565fd1a9b06f25379468c6230a757ec11ca785c8bb`
- Rows 56, 65 and 83 were inspected in Guide Inventory, Source Guide Copy and Daily Publishing Queue.
- The complete local JSON was read for every row because the workbook notes that cells may be capped.

| Workbook row | Slug | Workbook direction | Decision for this guide |
| --- | --- | --- | --- |
| 56 | `stop-ai-hallucinations` | Learn, Prompting, rewrite and differentiate | Keep claim extraction, direct source checking and clear unsupported status. Reject the claim that 3 prompts stop false answers. |
| 65 | `devils-advocate` | Build, Agents and Automation, rewrite and differentiate | Keep assumption checks, the other person's likely questions and specific fixes. Reject the skill wrapper, aggressive voice and automatic-review claims. |
| 83 | `honest-ai-prompt` | Learn, Prompting, rewrite and differentiate | Keep direct disagreement, the strongest counter-case, independent estimates and visible uncertainty as review prompts. Reject viral, celebrity and honesty-guarantee framing. |

Row 65 sits in a different workbook cluster. Only its durable review mechanics are used here. Its automation, agent and skill setup remains outside this Beginner guide.

## Complete local JSON source ledger

### `stop-ai-hallucinations.json`

- Path: `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/stop-ai-hallucinations.json`
- Source URL: `https://learnaiwithmariah.com/guides/stop-ai-hallucinations/`
- SHA-256: `d67404bde8debdaaa1b240fe6197ed25f606f0f5703be0d627f7a35c9dfa47aa`
- Retain as transformed research: isolate factual claims, ask what original source supports each claim, open the source, separate supported from unchecked material and check more carefully before publishing or making a decision.
- Do not publish: the source title, the 3 prompts, the claim that any prompt stops false answers, `turns a confident answer into a checked one`, `fresh chat` as the strongest check, model ego or loyalty metaphors, unsupported model-switch explanations, time claims or the claim that every new model makes the problem smaller.
- Critical correction: an AI-provided citation is not evidence until a person opens the original source and confirms that it supports the exact claim. A 2nd AI answer is another lead, not independent proof.

### `devils-advocate.json`

- Path: `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/devils-advocate.json`
- Source URL: `https://learnaiwithmariah.com/guides/devils-advocate/`
- SHA-256: `772743be878a36c06fba6c59ef29be2dd5a11f28d99e7a07ea790cd8ff5766bf`
- Retain as transformed research: test the main assumption, find missing context, ask how the other person could challenge the answer, name what is genuinely supported and turn each weakness into a specific check or change.
- Do not publish: `Devil's Advocate` branding, the copied 5-part prompt, fatal-flaw language, brutal or aggressive tone, expensive-mistake slogan, source use cases, contracts or financial advice, Claude setup, plan availability, skill files, automatic loading or rewrite-in-seconds claims.
- Critical correction: pressure from a 2nd AI can expose a question worth checking. It cannot decide that the original answer is true or false without reliable outside information.

### `honest-ai-prompt.json`

- Path: `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/honest-ai-prompt.json`
- Source URL: `https://learnaiwithmariah.com/guides/honest-ai-prompt/`
- SHA-256: `981bf3887f5d8b13ae3e29481da623e75dd60ff71dc512180486ac507523baff`
- Retain as transformed research: ask for the strongest counter-case, identify where the answer follows the user's wording or estimate, state missing information and make uncertainty visible.
- Do not publish: `viral honesty prompt`, Marc Andreessen framing, copied or rewritten prompts, view counts, celebrity authority, OpenAI rollback claims, GPT or Claude setup, aggressive instructions, political language, instructions to remove ethics or safety notes, or claims that the reader will feel a reliable difference in the 1st answer.
- Critical correction: asking for honesty, pushback or a confidence label may change the response. It does not make the answer honest, accurate or independently verified.

## Original Shift & Lead point of view

An AI answer is not checked because another AI agrees with it. It is checked when the important claims match original information, missing facts stay visible and the person responsible accepts what remains.

The answer may sound certain, balanced or direct and still be wrong. The reader's job is not to judge the tone. The job is to show what each important claim rests on and what decision that evidence allows.

## Durable mechanics retained

1. Start with how the answer will be used. A rough idea needs less checking than a public claim, customer promise or business decision.
2. Pull out the statements that could change an action, promise, cost, date, number, name, right, access choice or public message.
3. Find the original information. Open the report, contract, transcript, account record, official page or approved internal file.
4. Compare the exact claim with the exact source. Do not accept a working link if the page says something different.
5. Use 4 claim statuses: Supported, Needs context, Not supported and Cannot check.
6. Record the assumption, missing fact or strong counter-case that could change the answer while comparing the claim with the source. Treat AI suggestions as questions to investigate, not proof.
7. Keep self-reported confidence separate from evidence. `High confidence` is not a source.
8. Decide the action for every claim: Keep, Rewrite, Remove or Ask a qualified reviewer.
9. Check permission, privacy, attribution, quotation and reuse before copying, sending or publishing source material.
10. Name the person who approves the final answer before it is sent, published or used for a decision.

## Compact story movement

The page must not display internal story labels.

1. Begin with a useful-looking answer that the reader wants to use.
2. Show the hidden gap: polish and confidence do not show whether a claim is true.
3. Move to proof outside the answer: the original document, record, message or official page.
4. Name the real problem: asking AI to check AI can repeat the same mistake or create a new one.
5. Give the 4-step claim-by-claim method.
6. Show the Shift & Lead call-recap example and its final use decision.
7. End with a simple rule: if an important claim cannot be checked, it cannot be used as a fact.

Recommended page order:

1. Hero and top capture.
2. Immediate answer in 2 short paragraphs.
3. The 4-step check method.
4. 1 Shift & Lead example.
5. Compact 4-status claim table.
6. Result check and stop rules.
7. Exactly 3 related guides.
8. Clean ending with the important-claim rule.

## Locked 4-step method

### 1. Mark the claims that matter

- Action: underline statements that could change a decision, customer promise, cost, date, number, name, right, access choice or public message.
- Finish line: each important claim is copied into the check sheet in its own row.

### 2. Open the original information

- Action: open the report, contract, transcript, account record, official page or approved internal file. Do not stop at the AI summary or citation list.
- Finish line: each claim has a named original source or is marked Cannot check.

### 3. Compare and record the result

- Action: read the exact part that should support the claim. Mark Supported, Needs context, Not supported or Cannot check. Record missing facts, assumptions and counter-cases here. Check whether you have permission to use or reproduce the source material.
- Finish line: the status and any missing context can be explained from the opened source without asking AI to score itself, and any permission or privacy limit is recorded.

### 4. Decide before use

- Action: give each claim 1 action: Keep, Rewrite, Remove or Ask a qualified reviewer. Name the person who approves the final answer.
- Finish line: no unsupported or unchecked important claim remains in the answer as a fact.

## Original Shift & Lead example

### Check a client call recap before the team acts on it

After a discovery call, AI prepares an internal recap for Shift & Lead. The recap says the client approved a guide-delivery automation and agreed to a launch date.

The call transcript shows interest in the idea. It also shows that the client needs to confirm budget, access and timing. No approval or launch date exists in the call.

The weak approach is to ask another AI whether the recap is accurate and accept a confident yes.

Fatiha copies the approval and date statements into the check sheet. She opens the transcript and proposal. Interest is Supported. Approval is Not supported. The launch date is Cannot check. The need to confirm budget and access is missing context that must be added.

Fatiha rewrites the recap to say the decision is pending and lists the open questions. She approves the internal note before the team plans work or sends anything to the client.

No invented conversion rate, revenue, time saving, customer result or product behavior belongs in this example.

## Inline practical asset

- Kind: worksheet
- Name: `4-status claim check`
- Purpose: let the reader understand the method from 1 worked row before requesting the deeper sheet.
- It does not need a copy button.

The compact preview contains:

1. 4 plain statuses with direct actions.
   - Supported: the original information directly backs the claim. Keep it.
   - Needs context: part is supported, but an important limit or condition is missing. Rewrite it.
   - Not supported: the original information does not back the claim. Remove it.
   - Cannot check: no reliable original information is available. Do not use it as a fact. Ask a qualified reviewer when the decision cannot wait.
2. 1 worked Shift & Lead row.
   - Claim: `The client approved the guide-delivery automation.`
   - What was checked: call transcript and current proposal.
   - Status: Not supported.
   - Action: rewrite as `The client is interested. Approval is pending budget and access questions.`

Completion rule: another person can see the claim, original information, status and action without reading a separate explanation.

## Email capture and downloadable asset

- Capture placement: directly below the hero promise.
- Guide slug: `check-ai-answers`
- Guide ID: `guide.check-ai-answers`
- Lumail tag: `guide_check_ai_answers_source_check`
- Button label: `Send me the source-checking worksheet`
- Modal title: `Get the AI answer source-checking worksheet`
- Description: `Enter your email to get the fillable 4-page worksheet. Download it immediately and use its 10-row claim log to check important claims before you use, send or publish an AI answer.`
- Deliverable name: `AI answer source-checking worksheet`
- Format: PDF
- Immediate-download path: `/downloads/ai-answer-source-checking-worksheet.pdf`
- Useful when: an AI answer contains factual claims, sources or assumptions that could change a message, action or decision.
- Failure copy: `Email delivery is unavailable right now. Download the worksheet here and try again later.`

The 4-page PDF must be meaningfully deeper than the page.

### Page 1: set up the check

- Answer or file being checked and where the untouched version is saved.
- Intended use and what could happen if an important claim is wrong.
- Person responsible for the final decision.
- Original information available and which source wins if sources conflict.
- Information date or period covered by the sources.
- Material that needs checking: names and titles, dates and status, numbers and statistics, quotes and links, calculations, advice and assumptions.
- Permission, privacy, attribution, quotation and reuse limits.
- Action that remains blocked until the check and named human review are complete.

### Page 2: claims 1 to 5

- Exactly 5 claim rows.
- Each row records the exact claim, original source, exact source location, what the source says, status, action and correction.
- Status choice: Supported, Needs context, Not supported or Cannot check.
- Action choice: Keep, Rewrite, Remove or Ask a qualified reviewer.

### Page 3: claims 6 to 10

- Exactly 5 more claim rows with the same fields, status choices and actions.
- If the answer contains more than 10 important claims, start another worksheet. Do not skip claims to fit the page.

### Page 4: record changes and make the final decision

- Counts for claims checked, Supported, Needs context, Not supported and Cannot check.
- Changes made, claims removed and open questions.
- Missing information, main assumptions, strongest counter-case and source conflicts.
- Final answer location, approval owner and approval date.
- Confirmation that sources were opened, exact locations recorded, links tested, calculations redone, original information used and human review completed.
- Confirmation that privacy, attribution, quotation and reuse permission were checked.
- Final decision: Use after review, Revise and recheck, Do not use or Ask a qualified reviewer.

The fillable file needs clear tab order, blank choices by default, enough space for full claims and URLs, accessible field names, the creator signature and document metadata. It must contain exactly 10 claim rows across pages 2 and 3. The immediate download and emailed attachment must be byte-identical.

The asset must state: `A 2nd AI answer can suggest what to check. It does not count as an original source or final approval.`

Final PDF record:

- File: `/downloads/ai-answer-source-checking-worksheet.pdf`.
- SHA-256: `d1c704a120a042fd529cbeb58a320792803a145c46a2836b3468ecdf073359e1` in both publish targets.
- Format: exactly 4 A4 landscape pages.
- Fields: exactly 116 unique widgets: 74 text fields, 22 blank choices and 20 checkboxes.
- Page widget counts: 20, 35, 35 and 26.
- Claim rows: exactly 10, named `claim_01` through `claim_10`.
- Every claim records the claim, source, exact location, what the source says, status, action and correction.
- Status choices: Supported, Needs context, Not supported or Cannot check.
- Action choices: Keep, Rewrite, Remove or Ask a qualified reviewer.
- Final choices: Use after review, Revise and recheck, Do not use or Ask a qualified reviewer.
- All choices open blank. Text, choice and checkbox values persist after save and reopen.
- Every page uses semantic tab order. The PDF has no JavaScript, OpenAction, duplicate fields, overlapping widgets or encryption.
- All 4 pages passed rendered visual inspection, including the page 1 impact field, permission box and plain-language reader labels.

## Result check and stop rules

The check is complete when:

- the answer's real use and approval owner are named;
- every important claim has its own row;
- every named source has been opened and its relationship to the exact claim recorded, or the claim is marked Cannot check;
- each claim has 1 of the 4 statuses and 1 action;
- facts, assumptions and missing information are kept separate;
- a 2nd AI answer is treated as a lead to investigate, not proof;
- the final answer contains no unsupported or unchecked important claim presented as fact;
- privacy, permission, attribution, quotation and reuse have been checked before source material is copied, sent or published;
- the person responsible approves the final use decision.

Stop or ask a qualified reviewer when:

- the original information cannot be found or opened;
- sources conflict and no person has decided which source wins;
- the claim involves legal, financial, medical, security or another field the reader cannot judge;
- personal, private or confidential information is not approved for the tool or task;
- quotation, reproduction, attribution or publishing rights are unclear;
- the answer would affect employment, access, customers, money, rights, reputation or a lasting record without a qualified reviewer and approval;
- a quote, number, date, name, calculation or link cannot be confirmed;
- checking depends only on another AI answer.

## Exactly 3 related guides

Use these cards in this exact order:

1. `better-prompts-and-answers`
   - Signal: the answer has wider problems with task fit, completeness, limits or use.
   - Reader action: return to the full prompt builder and answer scorecard.
2. `what-is-a-prompt`
   - Signal: missing information or a vague request caused the weak answer.
   - Reader action: rebuild the brief before asking again.
3. `research-to-content-workflow`
   - Signal: the checked answer will become published content.
   - Reader action: follow the full source, point-of-view, review and approval workflow.

- Related heading: `Choose what the answer needs next.`
- Do not add a 4th route in the article body.

## Cover plan and safe zone

- Required format: 16:9 editorial cover.
- Palette direction: deep teal field, warm ivory paper, brass tools and restrained signal-red warning details. Keep the palette distinct from the cobalt prompt hub and signal-red learning tracker.
- Final scene: the exact small blue robot mascot checks 1 blank ivory answer card against a larger blank source plate beneath a brass inspection lens. A signal-red card rests in a separate tray.
- Meaning: compare a claim with original information and separate material that is not ready to use.
- Title safe zone: reserve the left 44% as a calm deep-teal field with no mascot, paper edge, tool or high-contrast detail.
- Mascot position: right 1/3, fully visible, separated from the teal by warm ivory paper and brass details.
- Card crop: the robot, answer card, source plate, inspection lens and separate red tray stay inside the right 56% and away from the outer 6% edge.
- Expected focal point: `82% center`.
- Live overlay: white title and white creator signature in the left safe zone.
- Artwork exclusion: no baked-in title, words, letters, numbers, logos, watermarks, citations or interface text.
- Alt text: `The small blue robot mascot checks an ivory card under a brass magnifying glass while a red card waits on a separate tray`.
- Texture: vintage engraving, cross-hatching, halftone and warm paper grain must affect the mascot and scene, not only the background.

Final cover files:

- PNG: `/images/guides/check-ai-answers.png`, exactly 1280 × 720, SHA-256 `333f9cfe8ef32d8642fbe5d6f56a45a47631a19841f6b8197c8a691e32abf967`.
- WebP: `/images/guides/check-ai-answers.webp`, exactly 1280 × 720, SHA-256 `acff1f93e111cbe16128cbc2e2a4d788b3230c9a2f499e2ed5233bbef3783222`.
- Generated source: `/Users/fatiha/.codex/generated_images/01a0230b-a793-7a01-a5af-5626d2c9cec1/exec-3cda2ff0-01ba-4d03-aaff-c0d5b11b7ec7.png`.
- Both formats are mirrored byte-identically between the Next.js public directory and the static publish directory.

## Factual verification

Primary and authoritative sources checked on 2026-08-22:

- NIST, `Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile`, NIST AI 600-1: `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf`
  - Supports the public boundary that generative systems can produce confident false or erroneous content and that risk management cannot be reduced to a prompt.
- OpenAI, `Why language models hallucinate`: `https://openai.com/index/why-language-models-hallucinate/`
  - Defines hallucinations as plausible but false statements and explains that evaluation incentives can reward guessing. It does not show that a fixed user prompt stops them.
- Anthropic, `Towards Understanding Sycophancy in Language Models`: `https://www.anthropic.com/news/towards-understanding-sycophancy-in-language-models`
  - Supports the limited claim that some language-model answers may follow a user's stated beliefs over the correct answer. It does not show that an aggressive honesty prompt guarantees truth.

Publication rules:

- The guide may say that an AI answer can sound confident and still be wrong.
- The guide may say that another AI answer can suggest questions or possible problems.
- The guide must say that another AI answer is not an original source or final proof.
- Never claim that a prompt stops hallucinations, guarantees honesty, forces reliable source checking or makes a model independent.
- Never use a confidence label as evidence.
- Do not publish changing provider features, model rankings, plans, prices, menus, product setup or claims that newer models solve the problem.
- If a future draft adds a named study, product behavior or numeric rate, verify it against the current primary source before publication.

## Source transformation and originality lock

Do not reuse source titles, sentences, slogans, prompt wording, examples, section names, creator bylines, celebrity framing, provider branding, skill setup or visual treatment.

The published guide must use:

- the original Shift & Lead point of view;
- the 4-step post-answer check;
- the original client-call recap example;
- the 4-status claim check;
- the 4-page AI answer source-checking worksheet with 10 claim rows;
- the exact 3 related-guide order;
- explicit human approval and qualified-reviewer boundaries.

## Source-phase readiness

- Title, slug, canonical route, Beginner level, hub and exact outcome are locked.
- Reader start and finish states are distinct from the hub and prompt tutorial.
- All 3 workbook rows and complete local JSON sources were inspected.
- Source hashes, retained mechanics, exclusions and corrections are recorded.
- The 4-step method and compact story movement are locked.
- The original Shift & Lead example and inline 4-status table are locked.
- The 4-page, 10-claim deliverable, capture identifiers, immediate download and failure copy are locked.
- Exactly 3 related guides are locked in order.
- Cover palette, scene, safe zone, card crop and alt text are locked.
- Primary verification and publication limits are recorded.
- No TypeScript, artwork, PDF or integration work is authorized in this phase.

Status: source phase passed before reader-copy drafting. Current production status is recorded in `work/post-hub-editorial-queue.md`.
