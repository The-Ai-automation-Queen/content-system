# Source brief: Get better at AI with 1 real task

## Publishing contract

- Canonical slug: `get-better-at-ai`
- Canonical route: `/guides/get-better-at-ai.html`
- Legacy SEO alias: `/guides/build-your-ai-learning-loop.html`
- Redirect rule: issue a permanent redirect from the legacy alias to the canonical route. Do not publish 2 indexable copies.
- Level: Beginner
- Hub: AI essentials
- Exact outcome: Understand AI
- Composition: Tutorial
- Reader start state: the reader has already completed and checked 1 low-risk AI task.
- Reader finish state: the reader can repeat the same capability on a new example, explain what improved, keep a useful rule and decide whether to Repeat, Continue or Keep manual.
- Main article constraint: compact. The article teaches the loop and 1 example. The 4-week cadence belongs primarily in the downloadable plan.
- Ending: clean decision rule. Do not add a commercial CTA or a 2nd capture.

The source phase creates only this brief. It does not create TypeScript, artwork, a downloadable file, catalogue integration, redirects or capture registry entries.

## Title test and copy lock

| Option | Decision | Reason |
| --- | --- | --- |
| Build your AI learning loop | Reject as the public title | `Learning loop` is an internal description. A Beginner must decode it before knowing what the guide does. |
| Learn AI by repeating real work | Reject | It is clearer, but `repeating` sounds mechanical and does not promise better judgment. |
| Get better at AI with 1 real task | Lock | It names the result, keeps the scope small and tells the reader they do not need a broad curriculum. |

- Locked H1: `Get better at AI with 1 real task`
- Locked direct promise: `Use 1 real task to find what works, fix what fails and get a result you can repeat.`
- SEO title: `Get better at AI with 1 real task | Shift & Lead`
- Meta description: `Use 1 task you already completed to practise AI, compare real results, keep what works and know when to repeat, raise the difficulty or stop.`
- Cover title overlay: use the locked H1 as live HTML. Do not bake words into the artwork.
- Creator signature: show `The AI Automation Queen` as simple live HTML in the open-guide hero and the full signature in metadata and the footer. Cards use the mascot and level without a creator-name box.

## Distinct reader job

`ai-essentials` owns the 1st useful result. It helps a new reader choose 1 low-risk task, decide where AI fits, find the right guide and complete a checked result in 7 days.

`get-better-at-ai` begins after that success. It owns repeated practice. The reader uses the same capability on new examples, finds the gap between an acceptable and weak result, changes 1 part of the brief or check, and saves only the lesson supported by the work.

The new guide must not repeat:

- the AI Essentials decision map;
- the full 7-day starter sequence;
- beginner definitions from `what-is-ai` or `ai-jargon-guide`;
- the prompt formula or answer scorecard owned by `what-is-a-prompt` and `better-prompts-and-answers`;
- workflow mapping or automation setup owned by `workflows-and-automation`.

The boundary is simple: AI Essentials gets the reader to result 1. This guide helps the reader prove they can do it again and understand why.

## Production records reviewed

| Record | Use | SHA-256 |
| --- | --- | --- |
| `docs/GUIDE-EDITORIAL-STANDARDS.md` | Reader-job structure, density, capture and copy rules | `e076bea599b35727dc64ac1cb550e21a6a477a3bd5b8980a6d583abf6a8b2341` |
| `docs/GUIDE-LIBRARY-PRODUCTION-CONTRACT.md` | Exact level, hub, outcome, capture, brand and related-card requirements | `427d49a6a587d79d4300a665f1b344a042ca4d923a28494c591bc87c520f8e1a` |
| `docs/GUIDE-MIGRATION-MATRIX.md` | Source-brief template, public library order and legacy-route rules | `6f792100d39611baab46edfab631ba908f296c1fe3898e5e20da5aba68cf168f` |
| `next-app/content/structured-guide.ts` | Current structured tutorial and capture schema | `f954e26595120bac345fa4d2d0175c91ada4e3c3b1f037d3d1189d6828853807` |
| `next-app/content/guides.json` | Current catalogue, related-guide availability and exact taxonomy | `a4ad90692bf0a27038bf13070dcf33dec310f110db7c645631e1bd5f13ee2b50` |
| `next-app/content/guides/ai-essentials.source.md` | Editorial boundary with the 7-day starter hub | `fd1c5259f3bdcea4c5b84da34d947bc282e46a8cd6125edfe7a4238b6489dd3f` |
| `next-app/content/guides/ai-essentials.ts` | Current reader copy, example, practice log and related routes | `02cc53a510790d0013e44214b978ba3f1258aafeb8dc0b41e690f2a11d1a332b` |

## Workbook evidence inspected

- Workbook: `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/outputs/guide-editorial-review/shift-and-lead-guide-portfolio-review.xlsx`
- SHA-256: `3f19ce36963d309c6df34c565fd1a9b06f25379468c6230a757ec11ca785c8bb`
- The 4 named rows were inspected in Guide Inventory, Source Guide Copy and Daily Publishing Queue. The complete local JSON was read for every row because the workbook notes that cells can be capped.

| Workbook row | Slug | Workbook direction | Decision for this guide |
| --- | --- | --- | --- |
| 30 | `satya-learning-loop` | Rewrite and differentiate; career framing in the source | Keep the idea that completed work can create a reusable lesson. Remove career fear, executive authority, moat language and product setup. |
| 58 | `ai-at-work` | Rewrite and differentiate; systems and work context | Keep the move from isolated chat to repeated work with stable context. Exclude connector setup, product menus, time claims and status comparisons. |
| 85 | `train-your-brain-for-ai` | Rewrite and differentiate; foundations and learning | Keep 1 capability, attempt before reference, practice across time, recall, varied examples and review. Replace the copied 30-day curriculum with an original compact method and a separate 4-week plan. |
| 87 | `use-ai-where-youre-already-good` | Rewrite and differentiate; prompting and judgment | Keep the boundary that the reader must be able to judge the result. Exclude green, yellow and red zone branding, the placement-auditor prompt and distinctive examples. |

The workbook calls several rows career material. This guide does not become a career guide. It uses only durable learning mechanics and remains a Beginner AI essentials guide with the exact `Understand AI` outcome.

## Complete local JSON source ledger

### `satya-learning-loop.json`

- Path: `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/satya-learning-loop.json`
- Source URL: `https://learnaiwithmariah.com/guides/satya-learning-loop/`
- SHA-256: `a1eb30b8ae2e89ec8945f8580595cb801f020f0e4a444968345be767269fc98f`
- Retain as transformed research: use completed work to capture corrections, quality checks and the next useful lesson.
- Do not publish: the Satya Nadella opening, quotations, view counts, `moat`, `new IP`, `hill climbing machine`, hard-to-replace framing, the self-improving prompt, Claude memory, `CLAUDE.md`, Claude Code, `/goal`, or the claim that the system teaches itself.
- Product and factual risk: memory behavior, files, commands and product menus can change. They are not required for the Shift & Lead method.

### `ai-at-work.json`

- Path: `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/ai-at-work.json`
- Source URL: `https://learnaiwithmariah.com/guides/ai-at-work/`
- SHA-256: `4496e6c8b587d9f9e68ab63bfd6526d673ff98215a9331533760fd86ba8f77a1`
- Retain as transformed research: repeated work benefits from stable instructions, approved examples and a clear result format.
- Do not publish: `smart workers` status framing, adoption percentages, Claude Projects, Connectors, Skills, Cowork schedules, Gmail, Slack, Notion, 10-minute setup, weekly time-saved claims, the Person A and Person B comparison, or the bootcamp promotion.
- Product and factual risk: integrations, account permissions and scheduling behavior require current vendor documentation. This guide stays tool-agnostic.

### `train-your-brain-for-ai.json`

- Path: `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/train-your-brain-for-ai.json`
- Source URL: `https://learnaiwithmariah.com/guides/train-your-brain-for-ai/`
- SHA-256: `7fc5d7b15770e178e488780c2247638a1eb1b4179e9c623c60e33b5f64aa8c1d`
- Retain as transformed research: choose 1 capability, make an attempt before looking at a finished answer, return to the task later, use a different example, compare the 1st and latest attempts, and record the lesson.
- Do not publish: the source title, 5 named moves, 30-day plan, day and week sequence, copied prompts, exact time commitments, the claim that 20 reps are sufficient to learn the skill, 29-study claim, effect size, named trap language, slogans or source examples.
- Evidence boundary: learning research supports generation, retrieval and spacing under conditions. It does not prove that this exact workplace AI method will make every reader broadly good at AI.

### `use-ai-where-youre-already-good.json`

- Path: `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/use-ai-where-youre-already-good.json`
- Source URL: `https://learnaiwithmariah.com/guides/use-ai-where-youre-already-good/`
- SHA-256: `5be18faa026df019379ae29719f1f541ffd9491b4462aa34cbd6d8e6133bbca4`
- Retain as transformed research: practise on work the reader understands well enough to check, and involve a qualified person when they cannot judge the answer.
- Do not publish: `taste` as a multiplier, green, yellow and red zone branding, the placement-auditor prompt, 3-second test, 30-day shift, named tool examples, legal, ad, finance and payment-flow scenarios, or claims that confident output will inevitably cause harm.
- Risk boundary: unfamiliar high-stakes work is not a solo learning exercise. Legal, financial, medical, security, customer, access and irreversible work needs the relevant qualified reviewer and approval.

## Original Shift & Lead thesis

1 successful AI result is not a skill. A useful capability exists when the reader can repeat the work on a new example, judge the result against real proof, explain the correction and know when not to continue.

The guide does not promise that the tool learns. The reader builds a record of what they tried, what the evidence showed and what rule earned a place in the next attempt.

## Retained mechanics, rewritten for Shift & Lead

1. Practise 1 capability at a time. The capability must fit inside a real task and end in an observable result.
2. Start from work the reader already understands. If the reader cannot name what correct looks like, add a qualified reviewer or choose another task.
3. Try the next example before opening the previous finished answer. Existing instructions and source material may remain available, but the reader must make the key decisions again.
4. Compare the result with the approved source and quality bar. AI critique is not proof.
5. Change 1 instruction, source choice or check at a time. Changing the tool, prompt, source and standard together hides the reason for improvement.
6. Save a rule only when the before and after work supports it. A rule is an instruction for the next attempt, not a motivational note.
7. Use a new example to test transfer. Do not declare success because the revised answer fixed the exact case that exposed the problem.
8. Increase difficulty only after the same capability holds up on a different example. Keep customer, money, rights, access, reputation and lasting changes behind human review.

## Story movement and compact page order

The story arc must feel natural. Do not publish `Success`, `Gap`, `Proof`, `Real problem`, `System`, `Transformation` or `Open loop` as decorative labels.

1. Begin from success: the reader already has 1 checked result. This respects the work completed through AI Essentials.
2. Expose the gap: the reader may not be able to repeat the result or explain why it worked.
3. Ask for proof: put a new attempt beside the approved source, finish line and previous lesson.
4. Name the real problem: finishing more outputs is not the same as building judgment. A polished answer can hide weak understanding.
5. Give the system: Attempt, Inspect, Change 1 thing, Repeat, Save the rule.
6. Show the transformation: the reader can produce, inspect and correct the same kind of work on a new example.
7. Leave an open loop: choose Repeat, Continue or Keep manual. The next task is earned by evidence, not by finishing the article.

Recommended article order:

1. Hero and top capture.
2. Immediate answer in 2 short paragraphs.
3. The 5-step method with compact finish lines.
4. 1 Shift & Lead worked example.
5. Inline improvement preview with 1 worked comparison row.
6. Result check and stop rules.
7. Exactly 3 next-guide cards.
8. Clean ending with the Repeat, Continue or Keep manual rule.

## Locked concise method

### 1. Attempt

- Action: choose the same low-risk capability and use it on a different real example before opening the previous finished answer.
- Finish line: the new result is saved beside the source and the result the reader needed.

### 2. Inspect

- Action: compare the result with the approved source, the finish line and any rule already in the log. Mark what is correct, missing, unsupported or hard to use.
- Finish line: every correction points to a source, requirement or named human judgment.

### 3. Change 1 thing

- Action: change 1 instruction, source choice or quality check. Keep the tool and remaining conditions stable for this run.
- Finish line: the reader can state exactly what changed and why.

### 4. Repeat

- Action: run the revised method on a different example. Do not reuse the previous answer as the new result.
- Finish line: the change improves the same kind of weakness without creating a new serious problem.

### 5. Save the rule

- Action: write 1 reusable instruction only when the comparison shows why it improved the work. Then choose Repeat, Continue or Keep manual.
- Repeat: practise the same capability at the same level with a new example.
- Continue: use the capability in real low-risk work with the same quality bar and human review.
- Keep manual: the reader cannot judge the result, the evidence is weak, or the task needs approval or expertise they do not have.
- Finish line: the log contains the saved rule, decision, reason and next example or reviewer.

## Original Shift & Lead example

### Improve a guide-card promise without losing the truth

Fatiha has 1 approved card summary for `What AI actually is`. She wants to get better at writing clear outcome sentences for the rest of the guide library.

The weak approach is to ask AI for polished card copy across the whole catalogue, choose the sentences that sound good and learn nothing about why they are accurate.

Fatiha chooses 1 new guide, `What a prompt actually is`, and gives AI the published guide copy. The quality bar is clear: name what the reader will understand or do, use words a Beginner knows, keep every claim traceable to the guide and do not promise a result the guide does not deliver.

The 1st draft sounds impressive but says the reader will `master prompting`. The guide does not support that claim. Fatiha marks the gap, changes 1 instruction to require a concrete action instead of a broad benefit, and runs the same source again. She checks the new sentence against the actual guide.

She then uses the revised instruction on `What AI agents actually do`. If the rule produces a clear, accurate promise for the new guide, it stays in the log. If it creates vague or false copy, she changes or removes it. Fatiha approves every public sentence because the card affects reader trust and the editorial decision belongs to her.

No invented conversion rate, time saving, output count or learning claim belongs in the example.

## Inline practical asset

- Kind: worksheet
- Name: `AI improvement preview`
- Purpose: make the method usable before the reader requests the deeper plan.
- It is not a copy of the article and does not require a copy button.

The compact preview contains exactly:

1. The visible method line: `Attempt → Inspect → Change 1 thing → Repeat → Save the rule`.
2. 1 worked comparison row from the Shift & Lead guide-card example.

The worked row shows: task, 1st example, 1st result, what Fatiha checked, problem, change, new example, repeated result and rule saved.

Locked worked row: `Task: write clear guide-card promises. 1st example: What a prompt actually is. 1st result: 'Master prompting and unlock better AI answers.' What Fatiha checked: the published guide. Problem: the guide does not promise mastery. Change: name the action instead. New example: What AI agents actually do. Repeated result: 'See how AI can work through several steps and where human approval belongs.' Rule saved: name the action and promise only what the guide teaches.`

Completion rule: the preview is complete when the reader can follow the comparison from the 1st result to the saved rule without reading a separate explanation.

## Email capture and downloadable asset

- Capture placement: directly below the hero promise.
- Guide slug: `get-better-at-ai`
- Guide ID: `guide.get-better-at-ai`
- Lumail tag: `guide_get_better_at_ai_4_week_tracker`
- Button label: `Send me the 4-week tracker`
- Modal title: `Get the 4-week AI improvement tracker`
- Description: `Enter your email to get the fillable 6-page tracker. Download it now and use 20 practice rows to improve 1 real task, save 3 rules you can use again and choose what to do next.`
- Deliverable name: `4-week AI improvement tracker`
- Format: PDF
- Page count: exactly 6 pages
- Attempt count: exactly 20 attempts
- Reusable-rule count: exactly 3 rules
- Final decision: exactly 1 of Repeat, Continue or Keep manual
- Immediate-download path: `/downloads/4-week-ai-improvement-tracker.pdf`
- Final PDF SHA-256: `48614ad2855b38f7212fe3208d274d9f2de857b40ee99f7a103e63b3185ccf3f`
- Useful when: `Use it when you have 1 checked low-risk result and want a steady practice routine without turning the guide into a long course.`
- Failure copy: `Email delivery is unavailable right now. Download the tracker here and try again later.`

The PDF must be meaningfully deeper than the page. Its 6-page structure is locked:

### Page 1: capability and quality bar

- Choose 1 real capability from work the reader already completed.
- Record the approved source, finish line, reviewer and prohibited actions.
- Record the starting checked result and choose the 5 new examples for Week 1.

### Page 2: Week 1, attempts 1 to 5

- Use 5 different examples of the same work.
- For each attempt record the result, proof inspected, gap and 1 change.

### Page 3: Week 2, attempts 6 to 10

- Continue with 5 new examples.
- Keep the quality bar stable and test only 1 change at a time.

### Page 4: Week 3, attempts 11 to 15

- Start each example without opening the previous finished answer.
- Test whether an earned rule still works when the audience, source shape or constraint changes without adding high-stakes risk.

### Page 5: Week 4, attempts 16 to 20

- Use the capability in real low-risk work with the named reviewer.
- Compare every result with the source and finish line before it is used.

### Page 6: save 3 rules and decide

- Save exactly 3 reusable rules supported by the 20-attempt record.
- Choose exactly 1 final decision: Repeat, Continue or Keep manual.
- Record the evidence, next example, reviewer and next action.

The PDF needs fillable fields, the original Shift & Lead guide-card example, the 20-attempt record, space for exactly 3 reusable rules, a reviewer field and the final decision page. It must carry the creator signature and accessible document metadata. It must not promise mastery after 4 weeks.

The tracker provides 20 recording rows as an editorial practice capacity. It does not claim that 20 attempts prove learning, mastery or workplace performance.

### Exact fillable-field contract

The PDF contains exactly 168 unique fields and 168 widgets:

- 117 text fields;
- 44 choice fields;
- 7 checkboxes;
- no radio buttons;
- no PDF JavaScript;
- no preselected score or final decision.

Page 1 contains exactly 16 widgets:

- `practice_task`, 90 characters;
- `useful_result`, 220 characters;
- `why_i_can_judge`, 220 characters;
- `approved_information`, 280 characters;
- `human_decision`, 220 characters;
- `baseline_example`, 180 characters;
- `baseline_instruction`, multiline, 900 characters;
- `baseline_result`, multiline, 500 characters;
- `baseline_gap`, multiline, 300 characters;
- `quality_test_1`, `quality_test_2` and `quality_test_3`, 120 characters each;
- `baseline_score`, blank choice from 1 to 5;
- `baseline_saved`, `private_data_removed` and `human_check_named`, checkboxes.

Pages 2 to 5 each contain exactly 33 widgets. Each page holds 5 attempt rows using the pattern `w{week}_r{attempt}_{field}`. Every row contains:

- `date`, 10 characters;
- `example`, 100 characters;
- `change`, 140 characters;
- `evidence`, 180 characters;
- `score`, blank choice from 1 to 5;
- `change_verdict`, blank choice from `Keep this change`, `Drop this change` or `Retest`.

Each weekly page ends with `w{week}_pattern`, 360 characters, `w{week}_rule`, 240 characters, and `w{week}_next_test`, 240 characters.

The static score key is:

- 1: unusable;
- 2: mostly wrong;
- 3: usable with edits;
- 4: reliable with minor edits;
- 5: ready after human review.

Page 6 contains exactly 20 widgets:

- `proof_first_score` and `proof_final_score`, blank choices from 1 to 5;
- `proof_before_time` and `proof_after_time`, 20 characters each;
- `proof_first_gap` and `proof_final_evidence`, 300 characters each;
- `proof_error_gone` and `proof_error_remaining`, 240 characters each;
- `proof_rule_1`, `proof_rule_2` and `proof_rule_3`, 160 characters each;
- `proof_rules_saved_where` and `proof_attempts_saved_where`, 220 characters each;
- `proof_next_harder_version` and `proof_human_check`, 220 characters each;
- `proof_verdict`, a blank choice from `Repeat`, `Continue` or `Keep manual`;
- `proof_baseline_saved`, `proof_final_result_saved`, `proof_sources_checked` and `proof_human_review_completed`, checkboxes.

Tab order is semantic and continuous: page 1 uses positions 1 to 16, page 2 uses 17 to 49, page 3 uses 50 to 82, page 4 uses 83 to 115, page 5 uses 116 to 148 and page 6 uses 149 to 168. Within each attempt, focus moves from date to example, change, evidence, score and verdict. Attempts run from top to bottom, followed by the 3 weekly reflection fields.

The saveable fillable PDF and printable PDF are the same file. Page 6 must work as a standalone proof summary. The immediate download and the emailed attachment must be byte-identical.

## Exactly 3 task routes and related guides

Use these 3 cards in this exact order:

1. `better-prompts-and-answers`
   - Signal: the repeated result stays vague, incomplete or unsupported.
   - Reader action: repair the brief and check the answer before adding more practice.
2. `workflows-and-automation`
   - Signal: the task now works on new examples and the reader wants to make the steps repeatable.
   - Reader action: map the task, failure path and human approval before automating it.
3. `ai-essentials`
   - Signal: the reader does not yet have 1 checked low-risk result.
   - Reader action: return to the starter path and complete the prerequisite before continuing.

- Related heading: `Choose what your result needs next.`
- Do not add a 4th recommendation in the article body.
- Do not point the reader to a tool guide merely to create another route.

## Result check and stop rules

The method is working when:

- the same capability is used on a different real example;
- the reader can explain what counts as correct without asking AI to decide for them;
- every important correction points to an approved source, requirement or named human judgment;
- 1 change is tested at a time;
- a saved rule improves a new example, not only the case that exposed the gap;
- the tracker ends with exactly 3 reusable rules and a Repeat, Continue or Keep manual decision with a reason;
- the human owner approves anything that reaches a customer or changes money, rights, access, reputation or a lasting record.

Stop or add a qualified reviewer when:

- the reader cannot judge whether the result is correct;
- the source is missing, private without permission or too weak to verify the answer;
- several variables changed and the reader cannot explain the result;
- the output would be sent, published, purchased, deleted or used to change a lasting record without approval;
- the task enters legal, financial, medical, security or another field where the reader lacks the required expertise;
- practice is producing more output but no traceable improvement.

The guide teaches 1 capability. It does not certify broad AI fluency, expertise or readiness for high-stakes work.

## Cover plan and safe zone

- Required format: 16:9 editorial cover.
- Palette direction: signal red field, warm ivory paper and brass details, with deep blue used only as a secondary mechanism. This keeps the card rhythm distinct from adjacent cobalt AI Essentials covers.
- Scene: the exact small blue robot mascot adjusts 1 prominent brass control on a single antique calibration bench. Exactly 4 blank warm-ivory proof pieces sit beside it. Their physical alignment improves from the 1st piece to the 4th, and the robot checks the final piece with a small brass straightedge.
- Meaning: repeated practice, 1 controlled change, comparison and proof are visible without a dashboard, text or abstract arrows.
- Title safe zone: reserve the left 44% as a calm signal-red field with no mascot, paper edge, tool or high-contrast detail.
- Mascot position: right 1/3, fully visible, with an ivory paper or brass separation area around the cobalt body.
- Card crop: the action must remain clear in the right 56% of a 16:9 crop. Keep the robot, all 4 proof pieces, the straightedge and the calibration bench away from the outer 6% edge.
- Expected focal point: `82% center`.
- Live overlay: white title and white creator signature in the left safe zone.
- Artwork exclusion: no baked-in title, letters, numbers, logo, watermark or interface text.
- Alt text: `The small blue robot adjusts a brass machine beside 4 ivory cards arranged from uneven to straight`.
- Texture: vintage engraving, cross-hatching, halftone and warm paper grain must affect the mascot and scene, not only the background.
- Final PNG: `/images/guides/get-better-at-ai.png`, exactly 1280 by 720.
- Final WebP: `/images/guides/get-better-at-ai.webp`, exactly 1280 by 720.
- Final PNG SHA-256: `a12719e65846aba26df8f60aa8b03026911df66edf659aefb7a45b692a574772`.
- Final WebP SHA-256: `2a715b52831832dd2d710cd71a2812c3855a3716c1d6e8dbcf8440948908ad39`.

## Factual verification

Primary research checked on 2026-08-22:

- Bjork Learning and Forgetting Lab, UCLA, research overview: `https://bjorklab.psych.ucla.edu/research/`
  - Supports the narrow statement that performance during practice is not always the same as durable learning, and that spacing, testing and varied practice can help under some conditions.
- Elizabeth L. Bjork and Robert Bjork, `Making Things Hard on Yourself, But in a Good Way`: `https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/11/Making-Things-Hard-on-Yourself-but-in-a-Good-Way-20111.pdf`
  - Supports careful use of spacing, testing and generation while explicitly noting boundary conditions and the need for enough background knowledge.
- Slamecka and Graf, `The generation effect: Delineation of a phenomenon`, DOI `10.1037/0278-7393.4.6.592`: `https://doi.org/10.1037/0278-7393.4.6.592`
  - Supports a constrained claim that generating material can improve later memory compared with only reading it in the studied tasks. It does not prove the full Shift & Lead workplace method.
- Karpicke and Roediger, `Repeated retrieval during learning is the key to long-term retention`, DOI `10.1016/j.jml.2006.09.004`: `https://doi.org/10.1016/j.jml.2006.09.004`
  - Supports a constrained claim that repeated retrieval can aid later retention in the studied tasks. It does not establish a universal cadence for AI practice.

Publication rule:

- The article can present Attempt, Inspect, Change 1 thing, Repeat, Save the rule as Shift & Lead's recommended operating method.
- If the article makes a named learning-science claim, link the primary source and preserve its limits.
- Do not publish the source's `effect size 0.74`, `29 studies`, exact daily duration, any claim that 20 attempts are a scientifically established threshold or a mastery implication without tracing and verifying the original paper and its relevance.
- Do not publish the Satya Nadella quotations, posting date, view count or executive interpretation. They are unnecessary to the reader job.
- Do not publish current product capabilities, memory behavior, connector availability, pricing, menus or scheduling instructions. If later added, verify each claim against the provider's current primary documentation on the publication date.

## Source transformation and originality lock

Do not reuse the source guides' sentences, slogans, section names, prompts, distinctive examples, red and green zone metaphor, self-improving language, career-threat framing, creator byline, product promotion, typography or visual treatment.

The published guide must use:

- the original Shift & Lead thesis;
- the 5-step Attempt, Inspect, Change 1 thing, Repeat, Save the rule method;
- the original guide-card promise example;
- the inline worked comparison preview;
- the 6-page `4-week-ai-improvement-tracker.pdf` with 20 attempts, exactly 3 reusable rules and the Repeat, Continue or Keep manual decision;
- human approval and evidence boundaries;
- the exact 3 task routes.

## Source-phase readiness

- Reader, prerequisite and practical outcome are locked.
- Canonical route and legacy redirect are locked.
- Beginner level, AI essentials hub and `Understand AI` outcome are locked.
- Title, promise and SEO copy are locked.
- All 4 named workbook rows and complete local JSON sources were reviewed.
- Source hashes and transformation boundaries are recorded.
- The guide is distinct from AI Essentials and the prompt and workflow hubs.
- The method, story movement, example, inline asset and deeper deliverable are locked.
- Capture identifiers, immediate download and failure copy are locked.
- Exactly 3 related routes are locked in order.
- Cover palette, safe zone, mascot action, crop and alt text are locked.
- Factual claims and exclusions are locked.
- No TypeScript, artwork, PDF or integration work is authorized in this phase.

Status: ready for reader-copy drafting after editorial approval of this source brief.
