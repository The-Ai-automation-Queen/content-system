# Source brief: Which AI tool should you use?

## Guide contract

- Canonical route: `/guides/which-ai-tool-for-what.html`
- Level: Beginner
- Hub: AI tools
- Outcome: Choose an AI tool
- Composition: Compact decision guide with 10 equal tool options
- Deliverable: `10-tool comparison scorecard`
- Capture slug: `which-ai-tool-for-what`
- Capture guide ID: `hub.ai-tools`
- Lumail tag: `hub_ai_tool_comparison_scorecard`
- Download: `/downloads/10-tool-comparison-scorecard.pdf`
- Related guides: `chatgpt`, `claude`, `stack-3-tool-ai-stack`

## Immutable legacy snapshot

- Git commit: `cc5412d`
- Git path: `main-site/guides/which-ai-tool-for-what.html`
- SHA-256: `094701be58ccdb3d0e88492066a412445ed849668aeb839cfe0e3433c9735632`
- Verification command: `git show cc5412d:main-site/guides/which-ai-tool-for-what.html | shasum -a 256`

The snapshot contains all 10 tool names and links but gives every tool the same empty verdict. It also promotes the 1st 4 tools above the other 6, includes read-time metadata and links to the obsolete split verdict page. The new hub keeps the canonical URL and all 10 destinations but replaces popularity order with reader-job fit.

## Migration and editorial sources

- `docs/GUIDE-MIGRATION-MATRIX.md`, Hub 3: AI tools
- `docs/GUIDE-EDITORIAL-STANDARDS.md`
- `docs/GUIDE-LIBRARY-PRODUCTION-CONTRACT.md`

The matrix requires the current page to become the AI tools cornerstone hub, preserve all 10 standalone verdicts, compare them by task and provide a real scorecard.

## Workbook source groups consulted

- `AI for founders and operators`
- `Prompting Claude well`
- `Skills, plugins and connectors`
- `AI creative workflows`
- `AI for marketing and sales`

Career, governance and Lead material was excluded. The groups were used to identify recurring reader jobs, source-access needs, workflow fit and maintenance tradeoffs. Their creator examples, rankings, slogans and product claims were not reused.

## Workbook anchor sources

| Local source | Source URL | Retained contribution |
| --- | --- | --- |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/5-ai-tools.json` | `https://learnaiwithmariah.com/guides/5-ai-tools/` | Start from the job, keep the active tool set small and give each tool a real test |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/ai-tools-worth-the-money.json` | `https://learnaiwithmariah.com/guides/ai-tools-worth-the-money/` | Compare a tool with the cost and work it replaces rather than buying from excitement |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/tool-prompts.json` | `https://learnaiwithmariah.com/guides/tool-prompts/` | Separate a chat answer from a finished work product or built tool |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/getting-started-ai.json` | `https://learnaiwithmariah.com/guides/getting-started-ai/` | Test 1 tool at a time on work the reader already needs to complete |

## Canonical tool verdict sources

These 10 legacy pages were reviewed at commit `cc5412d`. Their useful business positioning was retained as research. Their dated product details require current primary verification in the individual verdict rewrites.

| Tool | Git path | SHA-256 | Canonical URL |
| --- | --- | --- | --- |
| ChatGPT | `main-site/guides/chatgpt.html` | `0b9dabfbed61bd6428c7c75f53614a9785fd642e4dc5afe6f83dc5b96585192c` | `https://www.shiftandlead.com/guides/chatgpt.html` |
| Claude | `main-site/guides/claude.html` | `ff05f55718077ee979bd6ed453cd3796ecaf700309b77b0e310590671e4cdf79` | `https://www.shiftandlead.com/guides/claude.html` |
| Gemini | `main-site/guides/gemini.html` | `cec53cd6be4fe4c32c8a58747e701d0ee4d34841635aba9e78e673904089daac` | `https://www.shiftandlead.com/guides/gemini.html` |
| Copilot | `main-site/guides/copilot.html` | `2dca10a023fd0e6e4c3ac7921f056454624ffcf7e6153be063a0a4490bfb9c18` | `https://www.shiftandlead.com/guides/copilot.html` |
| DeepSeek | `main-site/guides/deepseek.html` | `1b2bd683acca7cbcfdf5d5817aa066cddf67074af5f2aae4b0251624cbd74fdf` | `https://www.shiftandlead.com/guides/deepseek.html` |
| Grok | `main-site/guides/grok.html` | `25b54c70dd7688311c43961533d62d1c142e1afd4c32b293b7c9c5926d87f575` | `https://www.shiftandlead.com/guides/grok.html` |
| Kimi | `main-site/guides/kimi.html` | `7480f03b077dd04b54dcce788c79bfdc32e5ac7856ca2c6d78401089b90d409b` | `https://www.shiftandlead.com/guides/kimi.html` |
| Manus | `main-site/guides/manus.html` | `316349243d66d91fc9fce3d7e43859f16acfe6249419c0cbfe60ccf3c0d77700` | `https://www.shiftandlead.com/guides/manus.html` |
| Meta AI | `main-site/guides/meta-ai.html` | `0721502cf462036a631b5a44a33b449c3f4b4ee5a350b61a92f43934373385ed` | `https://www.shiftandlead.com/guides/meta-ai.html` |
| Mistral | `main-site/guides/mistral.html` | `72e6a4a1e4bbbcc85eb36fc08a7b2de1e079a29beca854dbc807280ae61a5ec4` | `https://www.shiftandlead.com/guides/mistral.html` |

## Official primary sources used

Only the current product fit stated in the guide was taken from these pages. Plan limits, prices, model names, benchmarks and release-specific claims were excluded.

| Tool | Official URL | Verified fit used |
| --- | --- | --- |
| ChatGPT | `https://help.openai.com/en/articles/9260256-prompt-engineering-best-practices-for-chatgpt` | General assistant for writing, questions, files, images and data tasks |
| Claude | `https://claude.com/product/overview` | Document, writing, analysis and research work from supplied context |
| Gemini | `https://support.google.com/gemini/answer/14959807?co=GENIE.Platform%3DDesktop&hl=en` | Connected Google Workspace information, with plan, account and admin limits |
| Copilot | `https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-overview` | Work in Microsoft 365 apps and organizational information the user may access |
| DeepSeek | `https://www.deepseek.com/en/` | Chat and API are official product routes; deeper deployment claims were not made |
| Grok | `https://x.ai/grok` | Current web and X search for live public signals |
| Kimi | `https://www.kimi.com/en/help/others/product-comparison` | Chat, research, documents, spreadsheets, slides and agent-style deliverables |
| Manus | `https://manus.im/download` | Multi-step agent work that can return slides, websites and other deliverables |
| Meta AI | `https://about.fb.com/news/2025/04/introducing-meta-ai-app-new-way-access-ai-assistant/` | Availability across WhatsApp, Instagram, Facebook, Messenger and the standalone app |
| Mistral | `https://mistral.ai/products/vibe/` | Vibe assistant for work and code, plus enterprise deployment and data-residency options |

## Original Shift & Lead point of view

The buyer should not rank tools by popularity or the polish of a demo. The right tool has the shortest safe path from the reader's source material to a result they can approve. The same task, inputs, limits and quality check must be used across every tool test.

The on-page decision tool asks 4 questions: where the source lives, what finished output is required, whether access is acceptable and whether the tool passed the same 3 tasks. The download turns this into a weighted scorecard covering task fit, source access, privacy, output quality, workflow fit, cost and maintenance.

## Artwork and publishing notes

- Final cover: `/images/guides/which-ai-tool-for-what.webp`.
- Final artwork: 16:9 small blue robot mascot operating an antique switchboard that routes 1 work request toward 10 equal symbolic stations, with a clean live-title safe zone.
- Alt text: `The small blue robot mascot routing one work request toward 10 tool stations`.
- Keep the level and `The AI Automation Queen` visual label as live HTML over the raster image. Put the compact card title below the image. Keep `Shift & Lead` in metadata and the creator footer.
- Link each of the 10 decision options directly to its full standalone tool guide.
- Confirm the crop on desktop, mobile and library cards before publication.
- Confirm `/downloads/10-tool-comparison-scorecard.pdf` exists and is editable or printable.
- Confirm `hub.ai-tools` maps to `hub_ai_tool_comparison_scorecard` and the exact download.
- Confirm immediate download, email delivery and capture failure handling.
- Keep exactly 3 related guides: ChatGPT for the broad generalist test, Claude for the document-heavy test and the 3-tool stack for deciding whether 1 tool is no longer enough.
- Clean ending: the scorecard decision rule should be the final instruction before related guides.
