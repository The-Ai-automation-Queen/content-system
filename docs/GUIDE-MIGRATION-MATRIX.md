# Shift & Lead guide migration matrix

Status: planning contract. No guide in this document is considered migrated until it passes the completion gate below.

This matrix implements `docs/GUIDE-LIBRARY-PRODUCTION-CONTRACT.md`. It preserves every current guide, keeps all 10 AI tool guides visible, consolidates the research library into 7 public hubs, and excludes the Lead and governance curriculum from this phase.

## Authoritative inputs

1. Public guide inventory and taxonomy: `next-app/content/guides.json`
2. Current structured guide copy: `next-app/content/ai-jargon-guide.ts`
3. Current React route and components: `next-app/app/guides/[slug]/page.tsx` and `next-app/components/guides/`
4. Current legacy guide copy: `main-site/guides/*.html`
5. Current artwork: `next-app/public/images/guides/`, `main-site/assets/covers/`, and `main-site/assets/art/`
6. Editorial portfolio: `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/outputs/guide-editorial-review/shift-and-lead-guide-portfolio-review.xlsx`
7. Complete workbook source copy: `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/*.json`
8. Editorial standards: `docs/GUIDE-EDITORIAL-STANDARDS.md`
9. Production contract: `docs/GUIDE-LIBRARY-PRODUCTION-CONTRACT.md`

The workbook contains 367 source guides. Its recommendation is 13 standalone pages, 70 differentiated rewrites, 253 guides merged into hubs and 31 internal-only references. This phase does not publish those 367 pages one by one. It uses them as complete research inputs for the 20 existing guides and 7 public hubs below.

## Non-negotiable source rule

"Use the source closely" means preserve useful coverage, prompt mechanics, practical steps and completeness. It does not mean preserve the source creator's sentences, distinctive examples, byline, visual branding or transitions. Each source brief must identify what is retained, excluded, verified and rewritten before copy production starts.

No existing guide is deleted, hidden or reduced to a lighter page because it is less popular. When overlap exists, the guide remains a full standalone destination and the relevant hub becomes the navigation and comparison layer.

## Function codes used in the matrix

| Code | Required function |
| --- | --- |
| F01 | Structured content rendered by the shared React guide system |
| F02 | 16:9 small blue robot mascot hero on an approved cobalt, deep blue, signal red, teal or warm ivory field, with live title and `The AI Automation Queen · Shift & Lead` overlay |
| F03 | Direct promise and one popup email capture near the top |
| F04 | Immediate answer that earns the next scroll |
| F05 | Topic-appropriate framework, comparison or shortest reliable method |
| F06 | Recognisable Shift & Lead business example |
| F07 | Practical inline prompt, checklist, decision tool, worksheet or template |
| F08 | Result check, limitation or failure condition where relevant |
| F09 | Unique deliverable, Lumail guide ID and tag, immediate download, email delivery and failure state |
| F10 | Exactly 3 intentional next-guide cards |
| F11 | One relevant commercial action or an intentional clean ending |
| F12 | Canonical URL, author metadata and social-sharing metadata |
| F13 | `Created by The AI Automation Queen · Shift & Lead` footer credit |
| F14 | Desktop, mobile, keyboard, reduced-motion, interaction, download, build and published-route verification |

## Current-state findings

- There are 20 visible guide records in `next-app/content/guides.json`.
- Only `ai-jargon-guide` currently has structured React article content. The shared dynamic route returns not found for every other slug, so the publishing script preserves 19 legacy static HTML pages.
- Only 1 downloadable asset exists in `next-app/public/downloads`: `10-ai-words-you-need-to-know.pdf`.
- `research-to-content-workflow.html` has an inline capture near the bottom and an HTML companion resource, but not the approved top popup or immediate-download contract.
- The other 18 legacy guides have no email capture or guide-specific downloadable asset.
- The 10 tool guides are all visible in the content inventory. DeepSeek, Grok, Kimi, Manus, Meta AI and Mistral use generic mascot files or small legacy SVGs instead of complete 16:9 card artwork.
- The library taxonomy currently exists twice, once in `guides.json` and again in `guide-card.tsx`. Migration must leave one content source of truth so level, hub and outcome cannot disagree.
- Several legacy pages still refer to the older `12 AI words` title in related links. Every internal title and link must resolve to `10 AI words you need to know`.
- `first-ai-employee` keeps its URL for SEO, but the published title and copy must use `AI teammate`. The old phrase may appear only when explaining or correcting it.

## Existing guide migration matrix

### 1. What AI actually is

- **Route:** `/guides/what-is-ai.html`
- **Level / hub / outcome:** Beginner / AI essentials / Understand AI
- **Current source copy:** `main-site/guides/what-is-ai.html`
- **Workbook sources:** `ai-terms-explained-like-youre-10.json`, `ai-terms-dictionary.json`, `getting-started-ai.json`, and the `AI foundations and learning` cluster. Use the concept coverage, not the source wording.
- **Copy status:** Useful long-form draft exists. It is too broad and repeats the glossary. Rewrite as a compact explainer that distinguishes AI, normal software, generative AI, automation and agents without making the reader learn all 10 terms twice.
- **Action:** **KEEP + REWRITE.** Preserve the canonical route and the strongest existing examples. Do not merge it into the jargon guide.
- **Missing functions:** F01, F02, F03, F06, F07, F09, F11, F13, F14. F04, F05, F08, F10 and basic F12 exist but require migration verification.
- **Guide-specific deliverable:** `AI or automation? 1-page task sorter`, an editable and printable decision sheet.
- **Lumail mapping:** `guide.what-is-ai` / tag `guide_ai_essentials_task_sorter`.
- **Exactly 3 next guides:** `ai-jargon-guide`, `what-is-a-prompt`, `which-ai-tool-for-what`.
- **Artwork:** Existing 16:9 PNG/WebP/SVG set. Reinspect crop and build the branded live overlay. No new concept is required unless the safe zone fails.
- **Commercial ending:** Clean ending. The next action is the task sorter, not a sales pitch.

### 2. 10 AI words you need to know

- **Route:** `/guides/ai-jargon-guide.html`
- **Level / hub / outcome:** Beginner / AI essentials / Understand AI
- **Current source copy:** `next-app/content/ai-jargon-guide.ts`
- **Workbook sources:** `ai-terms-explained-like-youre-10.json`, `ai-terms-dictionary.json` and related foundation entries. The source concepts have already been independently rewritten into 10 terms with Shift & Lead examples.
- **Copy status:** Approved visual and density baseline. The title contract is exactly 10 terms and there is no bonus list.
- **Action:** **KEEP + COMPLETE INTEGRATION.** Do not reopen the structure unless testing reveals a real comprehension problem.
- **Missing functions:** F09 is incomplete because `/api/guide-capture` is not implemented in the static publishing architecture. F11 and F14 require explicit sign-off. Other functions are present.
- **Guide-specific deliverable:** Existing `10-ai-words-you-need-to-know.pdf`.
- **Lumail mapping:** `guide.ai-jargon-guide` / tag `guide_ai_10_words_pdf`.
- **Exactly 3 next guides:** `what-is-a-prompt`, `what-is-agentic`, `what-is-ai`.
- **Artwork:** Approved `learn-master.webp` hero plus 2 supporting WebP illustrations. Preserve the current safe zones and crop rules.
- **Commercial ending:** Clean ending after related guides.

### 3. What a prompt actually is

- **Route:** `/guides/what-is-a-prompt.html`
- **Level / hub / outcome:** Beginner / Better prompts and answers / Get better answers
- **Current source copy:** `main-site/guides/what-is-a-prompt.html`
- **Workbook sources:** `getting-started-ai.json`, `8-ai-prompts-cheat-sheet.json`, `god-tier-prompts.json`, `five-versions-prompt-hack.json`, `claude-prompts-that-improve-themselves.json`, `context-cleanup-checklist.json`, and the non-Lead members of `Prompting for better work` and `Prompting Claude well`.
- **Copy status:** Useful 4-part brief and weak-versus-useful example exist. Rewrite into a shorter tutorial. Retain goal, context, example, rules and format mechanics where they improve the result, but do not inherit source slogans or inflated claims.
- **Action:** **KEEP + REWRITE.** This remains the beginner explainer. Advanced prompt patterns feed the hub and later supporting guides.
- **Missing functions:** F01, F02, F03, F06, F07, F09, F11, F13, F14. F04, F05, F08, F10 and basic F12 exist but need migration checks.
- **Guide-specific deliverable:** `The useful prompt brief`, an editable one-page form with goal, context, source, limits, output format and review check.
- **Lumail mapping:** `guide.what-is-a-prompt` / tag `guide_prompt_brief`.
- **Exactly 3 next guides:** `chatgpt`, `research-to-content-workflow`, `what-is-agentic`.
- **Artwork:** Existing 16:9 PNG/WebP/SVG set. Preserve the compass-and-brief concept and add the live branded overlay.
- **Commercial ending:** Clean ending after the prompt test.

### 4. What AI agents actually do

- **Route:** `/guides/what-is-agentic.html`
- **Level / hub / outcome:** Beginner / AI agents / Understand AI, Build an agent
- **Current source copy:** `main-site/guides/what-is-agentic.html`
- **Workbook sources:** `ai-agent-vs-workflow.json`, `skill-workflow-agent.json`, `first-ai-agent.json`, `how-i-build-ai-agents.json`, `notion-agents.json`, and `agent-guardrails-template.json`.
- **Copy status:** Good autonomy ladder and permissions material exist. Rewrite the title and opening around what an agent does. Replace abstract `agentic` language with a chatbot, workflow and agent comparison a beginner can use.
- **Action:** **KEEP + REWRITE.** Do not merge with the build tutorial. This page explains the concept; `first-ai-employee` applies it.
- **Missing functions:** F01, F02, F03, F06, F07, F09, F11, F13, F14. Existing F04, F05, F08, F10 and basic F12 require migration checks.
- **Guide-specific deliverable:** `Workflow or agent? decision card` with the autonomy ladder and approval test.
- **Lumail mapping:** `guide.what-is-agentic` / tag `guide_agent_or_workflow_card`.
- **Exactly 3 next guides:** `first-ai-employee`, `manus`, `24-7-operations-system`.
- **Artwork:** Existing 16:9 PNG/WebP/SVG set. Retain the agent progression concept and add the live branded overlay.
- **Commercial ending:** Clean ending with a direct instruction to start with a workflow when the steps are known.

### 5. ChatGPT: what it does best and where it falls short

- **Route:** `/guides/chatgpt.html`
- **Level / hub / outcome:** Beginner / AI tools / Choose an AI tool
- **Current source copy:** `main-site/guides/chatgpt.html`
- **Workbook sources:** `getting-started-ai.json`, `5-ai-tools.json`, `ai-tools-worth-the-money.json`, `tool-prompts.json`, plus the existing canonical HTML. Verify every current feature against OpenAI primary documentation at rewrite time.
- **Copy status:** Full verdict draft exists. It needs a more decisive best-for, poor-fit and first-test structure, fewer repeated definitions, and current feature verification.
- **Action:** **KEEP + REWRITE AS FULL TOOL VERDICT.** Never reduce to a summary tile.
- **Missing functions:** F01, F02, F03, F07, F09, F11, F13, F14. F04, F05, F06, F08, F10 and basic F12 exist but require rewrite and verification.
- **Guide-specific deliverable:** `ChatGPT 30-minute fit test`, with 3 real tasks and a quality scorecard.
- **Lumail mapping:** `guide.chatgpt` / tag `guide_tool_chatgpt_fit_test`.
- **Exactly 3 next guides:** `which-ai-tool-for-what`, `what-is-a-prompt`, `claude`.
- **Artwork:** Complete 16:9 PNG/WebP/SVG set exists. Reinspect crop, then add the live title, level and brand overlay.
- **Commercial ending:** Clean tool verdict ending.

### 6. Claude: what it does best and where it falls short

- **Route:** `/guides/claude.html`
- **Level / hub / outcome:** Beginner / AI tools / Choose an AI tool
- **Current source copy:** `main-site/guides/claude.html`
- **Workbook sources:** `getting-started-ai.json`, `claude-for-businesses.json`, `claude-for-small-business.json`, `claude-small-business.json`, `5-ai-tools.json`, `tool-prompts.json`, and selected useful mechanics from the Claude-heavy source library. Verify features against Anthropic primary documentation.
- **Copy status:** Strong document-work positioning exists. Rewrite as a current tool verdict and keep Claude Code as a short boundary, not a detour for beginners.
- **Action:** **KEEP + REWRITE AS FULL TOOL VERDICT.** Preserve its standalone route and depth.
- **Missing functions:** F01, F02, F03, F07, F09, F11, F13, F14. F04, F05, F06, F08, F10 and basic F12 exist but require rewrite and verification.
- **Guide-specific deliverable:** `Claude document-work test`, with a 3-document comparison brief and evaluation rubric.
- **Lumail mapping:** `guide.claude` / tag `guide_tool_claude_document_test`.
- **Exactly 3 next guides:** `which-ai-tool-for-what`, `what-is-a-prompt`, `research-to-content-workflow`.
- **Artwork:** Complete 16:9 PNG/WebP/SVG set exists. Reinspect crop and add the branded live overlay.
- **Commercial ending:** Clean tool verdict ending.

### 7. Gemini: what it does best and where it falls short

- **Route:** `/guides/gemini.html`
- **Level / hub / outcome:** Beginner / AI tools / Choose an AI tool
- **Current source copy:** `main-site/guides/gemini.html`
- **Workbook sources:** `getting-started-ai.json`, `5-ai-tools.json`, `gemini-files.json`, `tool-prompts.json`, and the existing canonical HTML. Verify Gemini, Workspace and NotebookLM features against Google primary documentation.
- **Copy status:** Strong Google Workspace positioning exists. Rewrite as a direct fit test with current product boundaries and no generic tool tour.
- **Action:** **KEEP + REWRITE AS FULL TOOL VERDICT.** Preserve the standalone route.
- **Missing functions:** F01, F02, F03, F07, F09, F11, F13, F14. F04, F05, F06, F08, F10 and basic F12 require rewrite and verification.
- **Guide-specific deliverable:** `Gemini Workspace fit checklist`, with 3 test tasks and a source-access check.
- **Lumail mapping:** `guide.gemini` / tag `guide_tool_gemini_workspace_test`.
- **Exactly 3 next guides:** `which-ai-tool-for-what`, `research-to-content-workflow`, `copilot`.
- **Artwork:** Complete 16:9 PNG/WebP/SVG set exists. Reinspect crop and add the branded live overlay.
- **Commercial ending:** Clean tool verdict ending.

### 8. Copilot: what it does best and where it falls short

- **Route:** `/guides/copilot.html`
- **Level / hub / outcome:** Beginner / AI tools / Choose an AI tool
- **Current source copy:** `main-site/guides/copilot.html`
- **Workbook sources:** `5-ai-tools.json`, `ai-tools-worth-the-money.json`, `tool-prompts.json`, and the existing canonical HTML. Verify Microsoft 365, Graph and permission behavior against Microsoft primary documentation.
- **Copy status:** Strong embedded-workflow and permissions angle exists. Rewrite as a clear decision guide for a business already using Microsoft 365.
- **Action:** **KEEP + REWRITE AS FULL TOOL VERDICT.** Preserve the standalone route.
- **Missing functions:** F01, F02, F03, F07, F09, F11, F13, F14. F04, F05, F06, F08, F10 and basic F12 require rewrite and verification.
- **Guide-specific deliverable:** `Copilot task and permission test`, with 3 Microsoft 365 tasks and an access review.
- **Lumail mapping:** `guide.copilot` / tag `guide_tool_copilot_permission_test`.
- **Exactly 3 next guides:** `which-ai-tool-for-what`, `inbox-manager-setup`, `gemini`.
- **Artwork:** Complete 16:9 PNG/WebP/SVG set exists. Reinspect crop and add the branded live overlay.
- **Commercial ending:** Clean tool verdict ending.

### 9. Grok: what it does best and where it falls short

- **Route:** `/guides/grok.html`
- **Level / hub / outcome:** Beginner / AI tools / Choose an AI tool
- **Current source copy:** `main-site/guides/grok.html`
- **Workbook sources:** Existing canonical HTML, `5-ai-tools.json`, `ai-tools-worth-the-money.json` and `tool-prompts.json`. Verify current X and Grok capabilities against xAI primary documentation.
- **Copy status:** Useful live-conversation angle exists. Rewrite as a complete verdict with a practical signal-checking example and a strict difference between live conversation and verified evidence.
- **Action:** **KEEP + REWRITE AS FULL TOOL VERDICT.** Do not group it into a lighter secondary-tool page.
- **Missing functions:** F01, F02, F03, F07, F09, F11, F13, F14. F04, F05, F06, F08, F10 and basic F12 require rewrite and verification.
- **Guide-specific deliverable:** `Live signal verification checklist`, for checking a trend before using it in a decision or publication.
- **Lumail mapping:** `guide.grok` / tag `guide_tool_grok_signal_check`.
- **Exactly 3 next guides:** `which-ai-tool-for-what`, `meta-ai`, `research-to-content-workflow`.
- **Artwork:** Only a small legacy SVG exists and the current data falls back to a generic mascot image. Create a new 16:9 small blue robot mascot cover showing live signals being checked against evidence.
- **Commercial ending:** Clean tool verdict ending.

### 10. Meta AI: what it does best and where it falls short

- **Route:** `/guides/meta-ai.html`
- **Level / hub / outcome:** Beginner / AI tools / Choose an AI tool, Create content
- **Current source copy:** `main-site/guides/meta-ai.html`
- **Workbook sources:** `meta-ai-for-marketers.json`, `meta-business-agent.json`, `5-ai-tools.json`, `tool-prompts.json`, and the existing canonical HTML. Verify features against Meta primary documentation.
- **Copy status:** Useful in-app convenience and privacy material exist. Rewrite the page as a complete verdict for WhatsApp, Instagram and Meta surfaces, with a current first task and clear data boundary.
- **Action:** **KEEP + REWRITE AS FULL TOOL VERDICT.** Do not treat it as a supporting paragraph inside another page.
- **Missing functions:** F01, F02, F03, F07, F09, F11, F13, F14. F04, F05, F06, F08, F10 and basic F12 require rewrite and verification.
- **Guide-specific deliverable:** `Meta AI safe-use card`, with what to use in-app AI for and what not to share.
- **Lumail mapping:** `guide.meta-ai` / tag `guide_tool_meta_safe_use`.
- **Exactly 3 next guides:** `which-ai-tool-for-what`, `grok`, `research-to-content-workflow`.
- **Artwork:** Only a small legacy SVG exists and the current data falls back to a generic mascot image. Create a new 16:9 small blue robot mascot cover using recognisable communication channels without platform-logo clutter.
- **Commercial ending:** Clean tool verdict ending.

### 11. DeepSeek: what it does best and where it falls short

- **Route:** `/guides/deepseek.html`
- **Level / hub / outcome:** Intermediate / AI tools / Choose an AI tool
- **Current source copy:** `main-site/guides/deepseek.html`
- **Workbook sources:** Existing canonical HTML, `ai-tools-worth-the-money.json`, `5-ai-tools.json`, `tool-prompts.json`, and relevant open-model entries from the source library. Verify model, licence, hosting and data claims against DeepSeek primary documentation.
- **Copy status:** Solid open-weight, self-hosting and data-location explanation exists. Rewrite for current facts and add a realistic business decision rather than a generic product tour.
- **Action:** **KEEP + REWRITE AS FULL TOOL VERDICT.** Preserve its technical depth and standalone route.
- **Missing functions:** F01, F02, F03, F07, F09, F11, F13, F14. F04, F05, F06, F08, F10 and basic F12 require rewrite and verification.
- **Guide-specific deliverable:** `DeepSeek data and deployment checklist`, covering hosted use, self-hosting, licences and sensitive inputs.
- **Lumail mapping:** `guide.deepseek` / tag `guide_tool_deepseek_data_check`.
- **Exactly 3 next guides:** `which-ai-tool-for-what`, `mistral`, `what-is-ai`.
- **Artwork:** Only a small legacy SVG exists and the current data falls back to a generic mascot image. Create a new 16:9 small blue robot mascot cover showing an AI engine moving between hosted and private environments.
- **Commercial ending:** Clean tool verdict ending.

### 12. Kimi: what it does best and where it falls short

- **Route:** `/guides/kimi.html`
- **Level / hub / outcome:** Intermediate / AI tools / Choose an AI tool
- **Current source copy:** `main-site/guides/kimi.html`
- **Workbook sources:** Existing canonical HTML, `5-ai-tools.json`, `ai-tools-worth-the-money.json`, `tool-prompts.json`, and relevant context and coding entries. Verify current Kimi, long-context and coding claims against Moonshot AI primary documentation.
- **Copy status:** Useful long-context and coding angle exists. Rewrite around a real file or code test so the reader can decide whether adding Kimi solves a distinct job.
- **Action:** **KEEP + REWRITE AS FULL TOOL VERDICT.** Preserve the standalone route.
- **Missing functions:** F01, F02, F03, F07, F09, F11, F13, F14. F04, F05, F06, F08, F10 and basic F12 require rewrite and verification.
- **Guide-specific deliverable:** `Kimi long-file and coding test brief`, with the same test that can be run in Claude or DeepSeek for comparison.
- **Lumail mapping:** `guide.kimi` / tag `guide_tool_kimi_long_file_test`.
- **Exactly 3 next guides:** `which-ai-tool-for-what`, `claude`, `deepseek`.
- **Artwork:** Only a small legacy SVG exists and the current data falls back to a generic mascot image. Create a new 16:9 small blue robot mascot cover showing a very long document being inspected beside a code mechanism.
- **Commercial ending:** Clean tool verdict ending.

### 13. Manus: what it does best and where it falls short

- **Route:** `/guides/manus.html`
- **Level / hub / outcome:** Intermediate / AI tools / Choose an AI tool, Build an agent
- **Current source copy:** `main-site/guides/manus.html`
- **Workbook sources:** `manus-shopify.json`, `ai-agent-vs-workflow.json`, `agent-guardrails-template.json`, `how-i-build-ai-agents.json`, `skill-workflow-agent.json`, and the existing canonical HTML. Verify current features against Manus primary documentation.
- **Copy status:** Strong multi-step-task and computer-use explanation exists. Rewrite as a full tool verdict with a permission map and a bounded test task.
- **Action:** **KEEP + REWRITE AS FULL TOOL VERDICT.** It remains both a tool page and a bridge into the AI agents hub.
- **Missing functions:** F01, F02, F03, F07, F09, F11, F13, F14. F04, F05, F06, F08, F10 and basic F12 require rewrite and verification.
- **Guide-specific deliverable:** `Manus task and permission map`, defining allowed tools, stopping points, review and rollback.
- **Lumail mapping:** `guide.manus` / tag `guide_tool_manus_permission_map`.
- **Exactly 3 next guides:** `which-ai-tool-for-what`, `what-is-agentic`, `first-ai-employee`.
- **Artwork:** Only a small legacy SVG exists and the current data falls back to a generic mascot image. Create a new 16:9 small blue robot mascot cover showing a multi-step task with visible checkpoints.
- **Commercial ending:** Relevant action to the AI agents hub, not a hard sell.

### 14. Mistral: what it does best and where it falls short

- **Route:** `/guides/mistral.html`
- **Level / hub / outcome:** Expert / AI tools / Choose an AI tool, Build an agent
- **Current source copy:** `main-site/guides/mistral.html`
- **Workbook sources:** Existing canonical HTML, `5-ai-tools.json`, `ai-tools-worth-the-money.json`, `tool-prompts.json`, and relevant open-model and deployment entries. Verify current model, licence and deployment details against Mistral primary documentation.
- **Copy status:** Good control, private deployment and European supplier decision angle exists. Rewrite as an expert tool verdict with a requirements-first decision path.
- **Action:** **KEEP + REWRITE AS FULL TOOL VERDICT.** Preserve its expert depth and standalone route.
- **Missing functions:** F01, F02, F03, F07, F09, F11, F13, F14. F04, F05, F06, F08, F10 and basic F12 require rewrite and verification.
- **Guide-specific deliverable:** `Private AI deployment requirements brief`, covering data location, control, integration, licences, staffing and maintenance.
- **Lumail mapping:** `guide.mistral` / tag `guide_tool_mistral_deployment_brief`.
- **Exactly 3 next guides:** `which-ai-tool-for-what`, `deepseek`, `what-is-agentic`.
- **Artwork:** Only a small legacy SVG exists and the current data falls back to a generic mascot image. Create a new 16:9 small blue robot mascot cover showing a controlled private AI environment.
- **Commercial ending:** Clean tool verdict ending or Build Sprint only if the page genuinely leads into deployment help.

### 15. The 3-tool stack I actually use

- **Route:** `/guides/stack-3-tool-ai-stack.html`
- **Level / hub / outcome:** Beginner / Business operations / Choose an AI tool, Run business operations
- **Current source copy:** `main-site/guides/stack-3-tool-ai-stack.html`
- **Workbook sources:** `ai-tools-worth-the-money.json`, `5-ai-tools.json`, `ai-stack-replace-saas.json`, `ai-task-audit-prompt.json`, `15-hours-week.json`, and selected `Practical AI workflows` members.
- **Copy status:** Strong brain, megaphone and net model exists. Rewrite to make the personal claim precise, keep the 3 jobs, add cost and overlap tests, and avoid implying that the same products fit everyone.
- **Action:** **KEEP + REWRITE.** It is the beginner bridge from tool choice to business systems.
- **Missing functions:** F01, F02, F03, F07, F09, F11, F13, F14. F04, F05, F06, F08, F10 and basic F12 require migration checks.
- **Guide-specific deliverable:** `3-tool stack audit`, with job owner, monthly cost, overlap and remove/keep decision.
- **Lumail mapping:** `guide.stack-3-tool-ai-stack` / tag `guide_3_tool_stack_audit`.
- **Exactly 3 next guides:** `which-ai-tool-for-what`, `follow-up-setup`, `research-to-content-workflow`.
- **Artwork:** Existing 16:9 PNG/WebP/SVG set. Reinspect the crop and add the branded live overlay.
- **Commercial ending:** Relevant Build Sprint action after the audit, or a clean ending if the page remains purely educational.

### 16. Turn saved research into content you can actually publish

- **Route:** `/guides/research-to-content-workflow.html`
- **Level / hub / outcome:** Intermediate / Content and creative work / Create content, Automate a task
- **Current source copy:** `main-site/guides/research-to-content-workflow.html`
- **Workbook sources:** `ai-content-strategy.json`, `ai-content-creator.json`, `content-skills.json`, `content-creator-skills.json`, `ai-watch-youtube-skill.json`, `watch-how-the-best-use-ai.json`, and relevant members of `AI creative workflows` and `AI for marketing and sales`.
- **Copy status:** Strongest legacy workflow page. The 8-stage method, source brief, worked example and verification pass are useful. Preserve them while tightening copy and migrating to the shared composition.
- **Action:** **KEEP + POLISH + MIGRATE.** Do not flatten the 8-stage system into generic content tips.
- **Missing functions:** F01, F02, F03, F09, F10, F11, F13, F14. F04, F05, F06, F07, F08 and basic F12 exist. The current bottom inline form must move to the top popup and the duplicate bottom capture must disappear.
- **Guide-specific deliverable:** Existing `Research-to-Content Workflow Map`, rebuilt as a direct downloadable PDF or editable worksheet rather than an HTML capture page.
- **Lumail mapping:** `guide.research-to-content-workflow` / tag `guide_research_content_workflow_map`.
- **Exactly 3 next guides:** `what-is-a-prompt`, `stack-3-tool-ai-stack`, `first-ai-employee`.
- **Artwork:** Complete 16:9 PNG/WebP set exists. Reinspect crop and place the title and brand in a tested safe zone.
- **Commercial ending:** Relevant Build Sprint action only after the reader completes the map.

### 17. The lead follow-up that runs itself

- **Route:** `/guides/follow-up-setup.html`
- **Level / hub / outcome:** Intermediate / Workflows and automation / Automate a task, Run business operations
- **Current source copy:** `main-site/guides/follow-up-setup.html`
- **Workbook sources:** `emails-that-make-people-buy.json`, `email-marketing-agent.json`, `email-flows-audit-skill.json`, `ai-task-audit-prompt.json`, `15-hours-week.json`, and relevant `Practical AI workflows` members.
- **Copy status:** Good trigger, immediate reply, tagging, AI draft and testing sequence exists. Rewrite with a more realistic Shift & Lead example, explicit failure handling and a reusable message sequence.
- **Action:** **KEEP + REWRITE.** Preserve the full tutorial, not just an automation diagram.
- **Missing functions:** F01, F02, F03, F07, F09, F11, F13, F14. F04, F05, F06, F08, F10 and basic F12 exist but require migration checks.
- **Guide-specific deliverable:** `Lead follow-up map and 3-message builder`, with trigger, CRM fields, timing, handoff and stop conditions.
- **Lumail mapping:** `guide.follow-up-setup` / tag `guide_lead_follow_up_builder`.
- **Exactly 3 next guides:** `inbox-manager-setup`, `first-ai-employee`, `24-7-operations-system`.
- **Artwork:** Existing 16:9 PNG/WebP/SVG set. Reinspect crop and add the branded live overlay.
- **Commercial ending:** Relevant Build Sprint action for implementation.

### 18. 1 summary a day: the inbox manager

- **Route:** `/guides/inbox-manager-setup.html`
- **Level / hub / outcome:** Intermediate / Workflows and automation / Automate a task, Run business operations
- **Current source copy:** `main-site/guides/inbox-manager-setup.html`
- **Workbook sources:** `claude-email-dashboard.json`, `email-scam-detector.json`, `email-flows-audit-skill.json`, `ai-task-audit-prompt.json`, `agent-guardrails-template.json`, and relevant `Practical AI workflows` members.
- **Copy status:** Strong draft-only safety principle and daily-summary method exist. Rewrite into a platform-neutral tutorial for Gmail or Outlook, with category rules, expected summary format and a failure test.
- **Action:** **KEEP + REWRITE.** Preserve the full implementation logic.
- **Missing functions:** F01, F02, F03, F07, F09, F11, F13, F14. F04, F05, F06, F08, F10 and basic F12 exist but require migration checks.
- **Guide-specific deliverable:** `Inbox triage rules and daily summary template`, with categories, exceptions, draft-only rules and sample output.
- **Lumail mapping:** `guide.inbox-manager-setup` / tag `guide_inbox_summary_template`.
- **Exactly 3 next guides:** `follow-up-setup`, `first-ai-employee`, `24-7-operations-system`.
- **Artwork:** Existing 16:9 PNG/WebP/SVG set. Reinspect crop and add the branded live overlay.
- **Commercial ending:** Relevant Build Sprint action for implementation.

### 19. Build your 1st AI teammate

- **Route:** `/guides/first-ai-employee.html` retained for SEO and compatibility
- **Level / hub / outcome:** Intermediate / AI agents / Build an agent, Automate a task
- **Current source copy:** `main-site/guides/first-ai-employee.html`
- **Workbook sources:** `first-ai-agent.json`, `notion-agents.json`, `how-i-build-ai-agents.json`, `agent-guardrails-template.json`, `ai-agent-vs-workflow.json`, `skill-workflow-agent.json`, and relevant `Agents that earn their autonomy` members.
- **Copy status:** Strong one-job, minimum-access, trigger, human-stopping-point and reporting method exists. Replace every personhood implication with `AI teammate` or `AI system`, while preserving the useful job-design framework.
- **Action:** **KEEP ROUTE + RETITLE + REWRITE.** Do not rename the URL during this phase. Never downgrade it to a glossary entry.
- **Missing functions:** F01, F02, F03, F07, F09, F11, F13, F14. F04, F05, F06, F08, F10 and basic F12 exist but require migration checks.
- **Guide-specific deliverable:** `AI teammate job description`, with job, input, output, tools, limits, trigger, approval, failure and reporting fields.
- **Lumail mapping:** `guide.first-ai-employee` / tag `guide_ai_teammate_job_description`.
- **Exactly 3 next guides:** `what-is-agentic`, `inbox-manager-setup`, `24-7-operations-system`.
- **Artwork:** Existing 16:9 PNG/WebP/SVG set. Reinspect crop. The visual can retain the role-design metaphor but must not depict hiring or employment claims.
- **Commercial ending:** Relevant Build Sprint action for building the first bounded system.

### 20. Run a business around the clock without being on 24/7

- **Route:** `/guides/24-7-operations-system.html`
- **Level / hub / outcome:** Expert / Business operations / Run business operations, Automate a task
- **Current source copy:** `main-site/guides/24-7-operations-system.html`
- **Workbook sources:** `always-on-ai-agent-team.json`, `human-agent-teams-playbook.json`, `ai-agent-manager.json`, `managed-agents.json`, `multi-agent-framework.json`, `agent-guardrails-template.json`, `15-hours-week.json`, and relevant `Practical AI workflows` and `Agents that earn their autonomy` members.
- **Copy status:** Good trigger, single-job, approval, reporting and loud-failure structure exists. Rewrite the hero claim so `around the clock` clearly means monitored routine work, not unsupervised autonomy. Add operations dashboard, exception queue and shutdown rule.
- **Action:** **KEEP + REWRITE AS EXPERT SYSTEM GUIDE.** Preserve its depth and full route.
- **Missing functions:** F01, F02, F03, F07, F09, F11, F13, F14. F04, F05, F06, F08, F10 and basic F12 exist but require migration checks.
- **Guide-specific deliverable:** `24/7 operations blueprint`, with trigger, owner, allowed actions, approval queue, failure alert, daily review and stop switch.
- **Lumail mapping:** `guide.24-7-operations-system` / tag `guide_247_operations_blueprint`.
- **Exactly 3 next guides:** `first-ai-employee`, `inbox-manager-setup`, `follow-up-setup`.
- **Artwork:** Existing 16:9 PNG/WebP/SVG set. Reinspect crop and add the branded live overlay.
- **Commercial ending:** Build Sprint is directly relevant after the blueprint.

## Planned consolidated hub matrix

The 7 hubs are reader-facing cornerstone pages and filters. They do not replace or hide the 20 existing full guides. Each hub absorbs overlapping source intent, directs readers to the right standalone guide and prevents publication of dozens of near-duplicate pages.

### Hub 1. AI essentials

- **Proposed route:** `/guides/ai-essentials.html`
- **Level / outcome:** Beginner / Understand AI
- **Workbook source groups:** `AI foundations and learning` (18 guides) plus selected beginner material from `Prompting for better work`.
- **Anchor sources:** `ai-terms-explained-like-youre-10.json`, `ai-terms-dictionary.json`, `getting-started-ai.json`, `7-chatgpt-modes.json`, `train-your-brain-for-ai.json`.
- **Existing guides retained:** `what-is-ai`, `ai-jargon-guide`.
- **Copy status / action:** **NEW CORNERSTONE HUB.** Write a very short orientation, a `Start here` sequence and a decision map. Do not repeat full definitions from child guides.
- **Missing functions:** F01 to F14.
- **Guide-specific deliverable:** `Your first 7 days with AI`, a task-based starter plan that links to the existing guides.
- **Lumail mapping:** `hub.ai-essentials` / tag `hub_ai_essentials_7_day_plan`.
- **Exactly 3 next guides:** `what-is-ai`, `ai-jargon-guide`, `what-is-a-prompt`.
- **Artwork:** New 16:9 small blue robot mascot learning-map cover with a clear left-side text safe zone.

### Hub 2. Better prompts and answers

- **Proposed route:** `/guides/better-prompts-and-answers.html`
- **Level / outcome:** Beginner to Intermediate / Get better answers
- **Workbook source groups:** `Prompting for better work` (16 guides), `Prompting Claude well` (29 guides), and relevant `Context, projects and memory` entries. Lead/governance entries are excluded from this phase even when the workbook placed a prompt guide there.
- **Anchor sources:** `getting-started-ai.json`, `8-ai-prompts-cheat-sheet.json`, `god-tier-prompts.json`, `five-versions-prompt-hack.json`, `claude-prompts-that-improve-themselves.json`, `context-cleanup-checklist.json`, `stop-ai-hallucinations.json`.
- **Existing guides retained:** `what-is-a-prompt`, plus practical use inside `chatgpt`, `claude` and `research-to-content-workflow`.
- **Copy status / action:** **NEW CORNERSTONE HUB.** Consolidate repeated prompt lists into one sequence: brief, add context, provide evidence, constrain, improve, verify.
- **Missing functions:** F01 to F14.
- **Guide-specific deliverable:** `Prompt builder and answer-quality scorecard`.
- **Lumail mapping:** `hub.better-prompts-and-answers` / tag `hub_prompt_builder_scorecard`.
- **Exactly 3 next guides:** `what-is-a-prompt`, `chatgpt`, `research-to-content-workflow`.
- **Artwork:** New 16:9 small blue robot mascot brief-to-result cover with a fixed title safe zone.

### Hub 3. AI tools

- **Proposed route:** `/guides/which-ai-tool-for-what.html`, upgrading the current thin comparison page
- **Level / outcome:** Beginner to Expert / Choose an AI tool
- **Workbook source groups:** Relevant tool-selection entries across `AI for founders and operators`, `Prompting Claude well`, `Skills, plugins and connectors`, `AI creative workflows` and `AI for marketing and sales`. Do not import the unrelated career material from those clusters.
- **Anchor sources:** Existing 10 canonical tool HTML pages, `5-ai-tools.json`, `ai-tools-worth-the-money.json`, `tool-prompts.json`, `getting-started-ai.json`, and current primary vendor documentation.
- **Existing guides retained:** ChatGPT, Claude, Gemini, Copilot, DeepSeek, Grok, Kimi, Manus, Meta AI and Mistral. All 10 remain visible and full-length.
- **Copy status / action:** **CONSOLIDATE INTO CORNERSTONE DECISION GUIDE.** Replace the current 1-line table with task-led comparisons, fit tests and direct links to all 10 full verdicts. Redirect `/guides/tool-verdicts.html` here after parity is verified.
- **Missing functions:** F01 to F14.
- **Guide-specific deliverable:** `10-tool comparison scorecard`, editable by task, source access, privacy, output quality, workflow fit, cost and maintenance.
- **Lumail mapping:** `hub.ai-tools` / tag `hub_ai_tool_comparison_scorecard`.
- **Exactly 3 next guides:** `chatgpt`, `claude`, `stack-3-tool-ai-stack`.
- **Artwork:** New 16:9 small blue robot mascot tool-selection table with 10 symbolic stations and a large clean title zone.

### Hub 4. Content and creative work

- **Proposed route:** `/guides/content-and-creative-work.html`
- **Level / outcome:** Intermediate / Create content
- **Workbook source groups:** `AI creative workflows` (27 guides) plus content-relevant members of `AI for marketing and sales` (9 guides) and `Practical AI workflows`.
- **Anchor sources:** `ai-content-strategy.json`, `ai-content-creator.json`, `content-skills.json`, `content-creator-skills.json`, `creative-director-agent.json`, `ai-watch-youtube-skill.json`, `watch-how-the-best-use-ai.json`, `figma-ai-agent-creative-brief.json`.
- **Existing guides retained:** `research-to-content-workflow`; tool guides link in only when a tool is relevant to the task.
- **Copy status / action:** **NEW CORNERSTONE HUB.** Consolidate around research, point of view, drafting, design, repurposing, verification and publishing. Do not publish a separate page for each novelty feature.
- **Missing functions:** F01 to F14.
- **Guide-specific deliverable:** `Source-to-publish content planner`, including evidence, angle, audience promise, format, review and reuse.
- **Lumail mapping:** `hub.content-and-creative-work` / tag `hub_source_to_publish_planner`.
- **Exactly 3 next guides:** `research-to-content-workflow`, `better-prompts-and-answers`, `which-ai-tool-for-what`. This later task-led order supersedes the initial placeholder because it keeps the reader inside source-to-publish work, draft repair and job-led tool selection instead of privileging 1 tool.
- **Artwork:** New 16:9 small blue robot mascot editorial production line with the title in a consistent safe zone.

### Hub 5. Workflows and automation

- **Proposed route:** `/guides/workflows-and-automation.html`
- **Level / outcome:** Intermediate / Automate a task
- **Workbook source groups:** `Practical AI workflows` (65 guides) and workflow-relevant members of `Skills, plugins and connectors` (63 guides). Agent-only material remains in the AI agents hub.
- **Anchor sources:** `15-hours-week.json`, `ai-task-audit-prompt.json`, `skill-workflow-agent.json`, `ai-agent-vs-workflow.json`, `ai-feedback-loop.json`, `email-flows-audit-skill.json`, `claude-email-dashboard.json`.
- **Existing guides retained:** `follow-up-setup`, `inbox-manager-setup`, `research-to-content-workflow`, `stack-3-tool-ai-stack`.
- **Copy status / action:** **NEW CORNERSTONE HUB.** Teach readers to pick a task, map the trigger and steps, define the output, test failure and only then choose tools.
- **Missing functions:** F01 to F14.
- **Guide-specific deliverable:** `Task-to-workflow canvas`, with trigger, inputs, steps, owner, output, exception and test.
- **Lumail mapping:** `hub.workflows-and-automation` / tag `hub_task_to_workflow_canvas`.
- **Exactly 3 next guides:** `follow-up-setup`, `inbox-manager-setup`, `research-to-content-workflow`.
- **Artwork:** New 16:9 small blue robot mascot workflow map with compact, readable stages and a clean title zone.

### Hub 6. AI agents

- **Proposed route:** `/guides/ai-agents.html`
- **Level / outcome:** Beginner to Expert / Build an agent
- **Workbook source groups:** `Agents that earn their autonomy` (17 guides) plus relevant agent mechanics from `Skills, plugins and connectors` and technical source files. Lead/governance curriculum remains excluded.
- **Anchor sources:** `ai-agent-vs-workflow.json`, `skill-workflow-agent.json`, `first-ai-agent.json`, `notion-agents.json`, `how-i-build-ai-agents.json`, `agent-guardrails-template.json`, `multi-agent-framework.json`, `always-on-ai-agent-team.json`.
- **Existing guides retained:** `what-is-agentic`, `first-ai-employee`, `manus`, `24-7-operations-system`.
- **Copy status / action:** **NEW CORNERSTONE HUB.** Organise by complexity: understand an agent, choose agent versus workflow, build 1 bounded agent, add tools and approvals, then design multi-agent systems.
- **Missing functions:** F01 to F14.
- **Guide-specific deliverable:** `Agent role, permission and test canvas`.
- **Lumail mapping:** `hub.ai-agents` / tag `hub_agent_role_permission_canvas`.
- **Exactly 3 next guides:** `what-is-agentic`, `first-ai-employee`, `manus`.
- **Artwork:** New 16:9 small blue robot mascot directing a bounded multi-step mechanism with visible approval gates.

### Hub 7. Business operations

- **Proposed route:** `/guides/business-operations.html`
- **Level / outcome:** Beginner to Expert / Run business operations
- **Workbook source groups:** Audit all 65 `Practical AI workflows` rows and all 37 `AI for founders and operators` rows. Retain only the durable operations mechanics needed for task inventory, prioritisation, ownership, access, review and portfolio order. Route child-owned mechanics to the existing guide that teaches them. Exclude career, personal-life, investment, finance, health, legal, launch, side-hustle, hype, news and volatile product material from this hub. These are hub-specific exclusions, not instructions to delete the source rows from the editorial portfolio.
- **Anchor sources:** `ai-task-audit-prompt.json`, `ai-risk-score.json`, `3-step-ai-cost-audit.json`, `proprietary-data-ai-moat.json`, `delegate-this.json`, `ai-feedback-loop.json`, `ai-onboarding-check-before-bank-access.json`, `15-hours-week.json`. Use `15-hours-week` only as a use-case boundary and catalogue, not as the hub method.
- **Existing guides retained:** `stack-3-tool-ai-stack`, `follow-up-setup`, `inbox-manager-setup`, `first-ai-employee`, `24-7-operations-system`.
- **Copy status / action:** **NEW CORNERSTONE HUB.** Own the portfolio layer: list recurring operating jobs, score 1 pilot by repetition, time, data, failure cost, reversibility, owner and proof, route it to exactly 1 existing guide, record a manual baseline, run a supervised pilot, connect only proven systems and review the portfolio for result, correction burden, cost, exceptions, access and ownership. Do not repeat the child tutorials.
- **Missing functions:** F01 to F14.
- **Guide-specific deliverable:** `Business operations automation map`, ranking tasks by repetition, risk, data, owner, failure cost and implementation order.
- **Lumail mapping:** `hub.business-operations` / tag `hub_business_operations_map`.
- **Exactly 3 next guides:** `stack-3-tool-ai-stack`, `follow-up-setup`, `24-7-operations-system`.
- **Artwork:** New 16:9 small blue robot mascot operations room with a strong title safe zone and no dashboard clutter.

## Legacy route preservation matrix

These routes are not counted as additional guides, but they must not be dropped during migration.

| Current route | Required action |
| --- | --- |
| `/guides/chatgpt-vs-ai.html` | Preserve redirect and canonical to `/guides/what-is-ai.html#chatgpt-vs-ai` until the destination has an equivalent comparison section. |
| `/guides/which-ai-tool-for-what.html` | Upgrade in place as the AI tools cornerstone hub. Preserve this canonical URL. |
| `/guides/tool-verdicts.html` | Permanent redirect issued to `/guides/which-ai-tool-for-what.html` after the hub reached parity with all 10 full guides. |
| `/guides/chez-openai.html` | Preserve permanent redirect to `/guides/chatgpt.html`. |
| `/guides/chez-claude.html` and `/guides/chez-claude-preview.html` | Preserve permanent redirect to `/guides/claude.html`. |
| `/guides/chez-copilot.html` | Preserve permanent redirect to `/guides/copilot.html`. |
| `/guides/chez-deepseek.html` | Preserve permanent redirect to `/guides/deepseek.html`. |
| `/guides/chez-gemini.html` | Preserve permanent redirect to `/guides/gemini.html`. |
| `/guides/chez-grok.html` | Preserve permanent redirect to `/guides/grok.html`. |
| `/guides/chez-kimi.html` | Preserve permanent redirect to `/guides/kimi.html`. |
| `/guides/chez-manus.html` | Preserve permanent redirect to `/guides/manus.html`. |
| `/guides/chez-meta-ai.html` | Preserve permanent redirect to `/guides/meta-ai.html`. |
| `/guides/chez-mistral.html` | Preserve permanent redirect to `/guides/mistral.html`. |
| `/guides/voice-clone-pipeline.html` | Preserve its current redirect to the main site. Voice cloning is outside this phase and must not silently become a broken route. |

## Copy production order

Copy is produced and approved one guide at a time. A later guide does not begin final implementation until the preceding guide has a source brief, approved copy, approved asset and passing route verification.

1. `what-is-ai`
2. `what-is-a-prompt`
3. `what-is-agentic`
4. `which-ai-tool-for-what` hub
5. `chatgpt`
6. `claude`
7. `gemini`
8. `copilot`
9. `grok`
10. `meta-ai`
11. `deepseek`
12. `kimi`
13. `manus`
14. `mistral`
15. `stack-3-tool-ai-stack`
16. `research-to-content-workflow`
17. `follow-up-setup`
18. `inbox-manager-setup`
19. `first-ai-employee`
20. `24-7-operations-system`
21. `ai-essentials` hub
22. `better-prompts-and-answers` hub
23. `content-and-creative-work` hub
24. `workflows-and-automation` hub
25. `ai-agents` hub
26. `business-operations` hub

`ai-jargon-guide` is the approved baseline and integration reference, so it is not rewritten in this sequence. It still must pass the Lumail and published-route gate.

## Per-guide source brief template

Create one brief before drafting each row above. It must contain:

1. Reader level, hub, outcome, title and canonical slug.
2. Every workbook source used, including the local JSON path and source URL.
3. Coverage, prompt mechanics and examples worth retaining as research.
4. Borrowed phrases, distinctive examples and dated claims that must not be published.
5. Primary sources required to verify current product behavior.
6. The original Shift & Lead point of view and business example.
7. Page composition selected from glossary, explainer, tutorial, workflow, decision or tool verdict.
8. Inline practical asset and guide-specific email deliverable.
9. Lumail guide ID, tag, immediate-download path and failure copy.
10. Exactly 3 related guide slugs and the reason for each.
11. Artwork brief, safe zone, alt text and expected card crop.
12. Commercial action or explicit clean-ending decision.

## Completion gate

For every guide or hub, mark each item with evidence. A checked box without a route, asset, test or file path is not evidence.

- [ ] Approved source brief
- [ ] Original structured copy
- [ ] Useful source coverage retained without copied wording
- [ ] No Lead or governance curriculum added in this phase
- [ ] Relevant 16:9 small blue robot mascot cover
- [ ] Live hero and card brand overlay
- [ ] Guide-specific downloadable asset
- [ ] Unique Lumail guide ID and tag
- [ ] Successful immediate download after capture
- [ ] Successful email delivery
- [ ] Clear capture failure state
- [ ] Exactly 3 related-guide cards
- [ ] Canonical and author metadata
- [ ] Footer creator credit
- [ ] Desktop visual check
- [ ] Mobile visual check
- [ ] Keyboard and reduced-motion check
- [ ] Interaction and download check
- [ ] Passing production build
- [ ] Published canonical route verified
- [ ] Legacy alias and redirect behavior verified

Until all applicable evidence exists, the row remains `Planned` or `In progress`, never `Complete`.
