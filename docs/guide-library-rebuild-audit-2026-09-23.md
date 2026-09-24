# Guide library rebuild audit · 23 September 2026

## What the source audit found

The publication registry contains 42 live guides: 16 marked Beginner and 26 Intermediate. Every published guide has a cover file, a guide-specific Lumail tag, and 3 related-guide slots. All routes are Next.js source exported to `.html` URLs. The approved Instagram dashboard has a dedicated interactive layout and compact pre-guide modal. The other 41 still use `GuideReadingPage`, which places an article-like cover/title stack and a mid-guide gate around a mix of older static and interactive components. A format label in `guide-formats.ts` is not proof that the resulting page matches the approved Instagram visual standard.

This is a source and rendered-layout audit, not a claim that all 42 sets of product instructions have been checked against current official interfaces. Approved methods and copyable prompts must be preserved until that guide's freshness check. Do not silently replace them with a generic prompt. The [saved desktop, mobile, diagram and popup screenshots](guide-reference/README.md) for Instagram and **What AI actually is** now serve as two approved format references. Fatiha approved the complete What AI actually is page for publication on 23 September 2026. The remaining 40 non-Instagram pages below are audit findings, not completed migrations.

| Guide | Current level | Rebuild interaction | Content/freshness check before copy edit |
| --- | --- | --- | --- |
| What AI actually is | Beginner | Choice-first explorer, public-excerpt trial and copyable prompt | Approved for publication. The broad first task extracts key points from a short public article and checks each point against the source. The prompt stays detailed; reader copy stays short. |
| 12 AI words you need to know | Beginner | Searchable terms with short examples | Keep the 12 approved definitions; remove repeated introductions. |
| What AI agents actually do | Beginner | Decision examples that reveal what the agent may do | Check that each example clearly separates suggestion from action. |
| What should you never share with AI? | Beginner | Private-data self-check | Verify provider-specific privacy-setting names before changing instructions. |
| Which AI tool for what | Beginner | Task-based decision helper | Check product names and capabilities with primary sources. |
| Make ChatGPT answers shorter | Beginner | Before/after example and editable prompt | Keep full approved prompt; verify current ChatGPT controls if named. |
| Stop ChatGPT forgetting context | Intermediate | Guided context setup | Verify Memory/Projects behaviour, plan access, and exact UI labels. |
| ChatGPT scheduled tasks | Intermediate | Setup and result-check walkthrough | Verify current Tasks availability and notification steps. |
| Claude | Beginner | Practical first-use task selector | Keep the approved pain point and examples; verify current Claude UI. |
| Claude Projects | Intermediate | Project setup with clear decisions and result check | Preserve the corrected beginner wording and example; verify current project workflow. |
| Gemini cannot find a Drive file | Intermediate | Permission and file-access diagnostic | Verify Drive connector/menu and workspace restrictions. |
| Gemini Google Tasks limits | Intermediate | Boundaries exercise | Verify current Tasks integration and plan/account limits. |
| Check Copilot Excel edits | Intermediate | Before/after workbook audit | Verify Excel/Copilot permissions and review controls. |
| Meta AI / Muse | Intermediate | Product-route explorer | Verify which Muse capabilities are actually public and available. |
| Test Meta Business Agent customer replies | Intermediate | Worked customer-reply review | Verify current access, account and handoff controls. |
| Review Grok suggestions | Beginner | Claim-check practice | Keep a concrete example; verify any live-search instructions. |
| Get better professional writing from Grok | Beginner | Editable writing example | Show full prompt, sample input and what to check. |
| Verify Grok current research | Intermediate | Source-check audit | Verify current search/source UI and citation behaviour. |
| Fix DeepSeek wall of text | Beginner | Before/after editing practice | Preserve the complete prompt; show the readable result. |
| Edit long writing with DeepSeek | Intermediate | Section-by-section workflow | Check current document-length and file-support claims. |
| Is Kimi worth paying for? | Beginner | Cost/need decision helper | Recheck current plans, prices and feature access before copy changes. |
| Control Kimi code changes | Intermediate | Safe change-review walkthrough | Verify Kimi Code setup and approval controls. |
| Test Manus without burning credits | Intermediate | Bounded first-task walkthrough | Recheck current credit rules and task controls. |
| Manus browser workflow | Intermediate | Permissions and task-scope decision | Verify current browser access, handoffs and limitations. |
| Switch from ChatGPT to Mistral | Beginner | Comparison and small first task | Recheck current account, import and model claims. |
| Is Mistral Pro worth it? | Beginner | Plan-fit decision | Recheck current pricing and plan differences. |
| Instagram content dashboard | Intermediate | Approved two-path, five-step walkthrough | Preserve approved layout, source instructions and pre-guide modal. |
| What is a prompt? | Beginner | Worked example, then prompt builder | Give a complete example before asking the reader to adapt it. |
| What is an AI browser? | Beginner | Browser-permission audit | Verify current product examples and controls. |
| Connect AI to email, files and calendar | Intermediate | Connection checklist with permission map | Verify each provider's current connection/disconnection path. |
| AI skills worth learning for work | Beginner | Short skill-practice choice | Keep a specific workplace exercise and result check. |
| Show up in AI search | Intermediate | Evidence-based visibility audit | Check current search product behaviour; avoid ranking promises. |
| ChatGPT screen recording to process guide | Intermediate | Screen-recording workflow with output check | Confirm whether transcript/screenshots are still required before editing steps. |
| ChatGPT customer research with evidence | Intermediate | Evidence and citation audit | Verify current source-handling UI; preserve full prompt. |
| Teach Claude a repeatable workflow | Intermediate | Projects/workflow walkthrough | Verify current project instructions and examples. |
| Fix Gemini Workspace action | Intermediate | Failed-action troubleshooting | Verify workspace plan/admin restrictions and UI. |
| What can Copilot see at work? | Intermediate | Permission visibility audit | Verify Microsoft 365 access model and current menus. |
| Test Meta Muse money-saving task | Intermediate | Bounded task decision | Verify Muse availability and capabilities before copy changes. |
| Test Grok repeated image edits | Intermediate | Image-edit sequence | Verify current editing UI, limits and supported changes. |
| Test DeepSeek V4 document work | Intermediate | Document suitability test | Verify product/version availability before using that title publicly. |
| Protect a long DeepSeek project | Intermediate | Context and source-protection audit | Verify current project/file features and retention claims. |
| Mistral multilingual research | Intermediate | Source-led translation/research walkthrough | Verify current browsing, translation and citation behaviour. |

## First remaining guide under review: AI terms

**12 AI words you need to know** is now in page review. The old page made readers scroll through 12 long definition cards, three group cards and six first-chat steps before the exercise. The review page keeps the existing `learn-master.webp` cover and the 12 definitions, but presents one term at a time under three practical questions. It puts a realistic AI claim before the complete copyable prompt and result check. The compact pre-guide Lumail popup is present. No new cover was generated, and this review version has not been published.

## Migration rule

Each approved guide needs its own compact pre-guide popup (first name, last name, email, optional marketing consent), white/cobalt layout, concise answer near the top, a topic-appropriate interaction, its full existing copyable instruction, a visible result check, and 3 image-led next guides. The Instagram and What AI actually is pages are complementary references for interaction quality, curiosity, meaningful outcomes and visual pacing. Neither is a universal section sequence. Use two paths only when both genuinely help the task. Reject generic post layouts and decorative interactions that do not help a reader act. Do not deploy or mark a new page approved from this audit alone. Check current official product instructions and show any proposed factual or method changes separately from the design change. Check all eight footer routes in the deployable output and on the custom domain after every release.

## Why the beginner example changed

The 23 September last30days run covered 24 August to 23 September. Most high-ranking results were off-topic, so it does not support a claim about the single most popular beginner task. The useful signal was narrower: in a [recent workplace AI discussion](https://www.reddit.com/r/NoStupidQuestions/comments/1wm571a/i_refuse_to_willingly_use_ai_for_anything_am_i/), people asked what AI does for non-technical jobs, gave document summarisation and extraction as practical examples, and stressed that usefulness depends on the person's work. A [recent beginner lesson](https://www.youtube.com/watch?v=JdnGbQnCLmg) argued for a small task with clear input, visible output and a result the reader can inspect. A [library-workplace discussion](https://www.reddit.com/r/Libraries/comments/1wdq4wk/ai_in_the_workplace/) also showed that some newcomers need explicit first-use steps. The chosen exercise therefore uses one short public excerpt, three key points with supporting sentences, a source check and a plain instruction for opening an AI chat. This is an editorial inference from limited evidence, not a measured ranking of use cases.
