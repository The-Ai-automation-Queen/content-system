# Source brief: Build 1 AI agent you can test, limit and stop

## Publishing contract

- Slug: `ai-agents`
- Published route: `/guides/ai-agents.html`
- Level: Beginner entry point; sequence: Beginner to Expert
- Hub: AI agents
- Outcome: Build an agent
- Composition: learning-hub
- Content file: `next-app/content/guides/ai-agents.ts`

The copy, source notes, 3-page fillable PDF, final cover, catalogue record and active Lumail capture are complete. The production build and local published-route, desktop, mobile, keyboard, reduced-motion, modal and download checks pass.

## Repository records

| Record | SHA-256 | Use |
| --- | --- | --- |
| `docs/GUIDE-MIGRATION-MATRIX.md` | `dec63c13be87ebba1cd86abc8f61d7a44159b7103f5421d853154b3d203bac58` | Route, hub boundary, source set, deliverable and next-guide contract |
| `docs/GUIDE-LIBRARY-PRODUCTION-CONTRACT.md` | `427d49a6a587d79d4300a665f1b344a042ca4d923a28494c591bc87c520f8e1a` | Library production and publishing rules |
| `shift-and-lead-guide-portfolio-review.xlsx` | `3f19ce36963d309c6df34c565fd1a9b06f25379468c6230a757ec11ca785c8bb` | Portfolio grouping, rewrite decisions and source coverage |

Workbook path: `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/outputs/guide-editorial-review/shift-and-lead-guide-portfolio-review.xlsx`.

## 8 source anchors

The source JSON files are research inputs. Creator wording, examples, metaphors, prompts, diagrams and branding are not copied.

| Source | Original page | SHA-256 | Durable input retained |
| --- | --- | --- | --- |
| `ai-agent-vs-workflow.json` | `https://learnaiwithmariah.com/guides/ai-agent-vs-workflow/` | `6e5c49088660cc8a5180104aa51ae6588b0f410f5f664ef9fcd5c5bc14668510` | Decide whether the path is fixed or must change after a finding |
| `skill-workflow-agent.json` | `https://learnaiwithmariah.com/guides/skill-workflow-agent/` | `22afdd8d1ea03023b70a52c1be027172ea77284ea61cb1aee334ae5d968cc6ea` | Separate reusable instructions, fixed steps and changing paths |
| `first-ai-agent.json` | `https://learnaiwithmariah.com/guides/first-ai-agent/` | `e652be039d303b168d7dc98dd6b01b8d95e853f63e72a272215f5227c3676181` | Start with 1 narrow job and a testable result |
| `notion-agents.json` | `https://learnaiwithmariah.com/guides/notion-agents/` | `b990fd654c31081a342b3aeb3b6369d50845b2e4d71089f7f6cb8440464ba779` | Define context, sources, tools and bounded access |
| `how-i-build-ai-agents.json` | `https://learnaiwithmariah.com/guides/how-i-build-ai-agents/` | `ab511234fea89fce282a696d3e15e47f865cf97a30ee61339f9cdd644f818c1a` | Add memory and connections only after the base job works |
| `agent-guardrails-template.json` | `https://learnaiwithmariah.com/guides/agent-guardrails-template/` | `9555ea8a49a4771a174af90c10713d76a7ba07c620a008b09af5e04306d8eef5` | Define permissions, limits, approvals and failure tests |
| `multi-agent-framework.json` | `https://learnaiwithmariah.com/guides/multi-agent-framework/` | `cab3643327abc02082d3578b3af4e90c584e2394cc0a693c1382ec18d9de0e44` | Give each added agent a different job and a clear handoff |
| `always-on-ai-agent-team.json` | `https://learnaiwithmariah.com/guides/always-on-ai-agent-team/` | `cd1d129d7d2bb426d278e01f69aa31828ce016ce8e6a4dcb48ff4775d34a57e5` | Require monitoring, alerts, fallback, shutdown and approved restart |

## Workbook consolidation

The `Agents that earn their autonomy` sheet contains 17 rows used by this hub. The portfolio decision is:

- 4 rows marked Rewrite and differentiate.
- 13 rows marked Merge into hub.

The intellectual center is not a list of agent products. It is a controlled path from task choice to a bounded job, technical permissions, approval, failure tests, proof and monitored operations.

From relevant `Skills, plugins and connectors` rows, retain only 6 durable mechanics:

1. Reusable role instructions.
2. Named tools and resources.
3. Explicit access.
4. An approved trigger.
5. Logs and status.
6. A feedback and test loop.

Do not import connector names, setup labels, vendor claims, pricing, plans or product-specific steps into this hub.

## Child-guide boundaries

The hub routes the reader and teaches the shared operating standard. It does not repeat each child guide in full.

- `what-is-agentic` owns the full workflow-versus-agent decision and autonomy ladder.
  - Content SHA-256: `5e7f1ffe04672838fe0f884266cea214eefaad0ebc60edf7df734ac33ac8e7e4`
  - Source brief SHA-256: `4fdf2da08213b7d2b671a59030a78b2100aa3e22e0f073213fb2a3c3587d7aa5`
- `first-ai-employee` owns the full 10-decision job description and build tutorial.
  - Content SHA-256: `e3da1436b24b5f650acce1adda2f2336bf5c4dd0c33da79c7db75aacf15e17d4`
  - Source brief SHA-256: `21879a016aead1c8c24cf71a9be1cb0698703aff6f819548d9187e79c0b9e8ff`
- `manus` owns the product-specific bounded tool verdict.
  - Content SHA-256: `711e4e31fb36f8c38f8863337c8b762b9bd5d7474d91643178108dc82152dca3`
  - Source brief SHA-256: `f47ae7d342882f94b93f09a808a758a97a5b099585b75963743c29a344f11310`
- `24-7-operations-system` owns dashboards, approval and exception queues, always-on shutdown and human-approved restart.
  - Content SHA-256: `a08121cb8f86db07e99065009fc518901265ee90a8024656b03b6c5f1b61a547`
  - Source brief SHA-256: `1cd4ad1e853a76d6a55273cd7d8f081c28713b55e2a1bd6bc8d0ceeef80390c4`

## Editorial model retained

- Use an agent only when a finding changes the next step and the next steps are approved.
- Build the smallest system that can complete 1 job.
- Define the goal, finished result, source priority, tools, access, owner and pass rule.
- Start read-only and grant the smallest technical access.
- Put approval immediately before protected actions.
- Test normal input, missing input, conflicting input, hostile instructions, permission denial, tool failure, bad output, duplicates and protected actions.
- Require source proof, logs and a Completed, Stopped or Failed status.
- Stop safely, alert the owner and use a manual fallback.
- Save approved memory only after the bounded job passes.
- Add a 2nd agent only for a different job with a defined handoff.
- Move scheduled work into monitored operations with shutdown and human-approved restart.

## Exclusions

- Lead and governance curriculum. Those remain separate projects.
- Creator wording, metaphors, examples, prompts, diagrams and visual treatment.
- Claims that an agent is a person, employee or expert.
- Product features, setup labels, templates, model names, connector names or install steps.
- Prices, credits, plans, vendor partnerships or tool rankings.
- Claims that an agent runs a business, works without oversight, improves itself or operates safely around the clock.
- Unverified company, experiment or performance claims.
- Income, time or cost claims.
- Broad live access or self-expanding permissions.
- Multi-agent design before 1 bounded agent passes its tests.
- Full child-guide tutorials repeated inside the hub.

## Inline asset and deep download

The page keeps a compact `AGENT ROLE, PERMISSION AND TEST MAP` with 8 parts, 10 processing rules, 10 quality checks and 10 stop rules. It is enough to make the 1st build decision without turning the hub into a long operating manual.

The email deliverable is a distinct 3-page fillable PDF named `Agent role, permission and test canvas`. It includes:

1. The workflow-or-agent decision boundary and 1-job definition.
2. A permission matrix with approval gates, stops and fallback.
3. The 8 evidence tests and the supported pilot decision.

The PDF is a working canvas, not a recap of the article.

- File: `/downloads/agent-role-permission-and-test-canvas.pdf`
- Guide ID: `hub.ai-agents`
- Lumail tag: `hub_agent_role_permission_canvas`
- Capture button: `Send me the agent canvas`
- Modal title: `Get the agent role, permission and test canvas`
- Status: final fillable asset, 3 A4 landscape pages, 94 unique fields and 113 widgets.
- Capacity: all 17 major multiline fields allow 1,200 characters. Matrix fields retain limits of 80, 160, 240, 300, 500 and 600 characters, and the pilot-limits field allows 800 characters.
- SHA-256: `88d1e0a1308058239e397d2a500fc07f5cfaceb89cc280f821636cc8a88dcdd6`

## Artwork

- Published file: `/images/guides/ai-agents.webp`
- Alt text: `The small blue robot mascot controlling a 3-stage machine with 2 red gates and an emergency stop lever`
- Focal point: `78% center`
- Live copy position: left
- Art direction: a warm ivory 16:9 vintage editorial scene. The exact small blue robot operates a 3-chamber canal-lock mechanism on the right, with 2 signal-red approval gates and a red master-stop lever. The left 44% stays quiet for live page copy.
- Title, logo and creator signature remain live HTML and stay out of the artwork.
- Identity reference SHA-256: `6878f60621c925dd757dc76cd633f54065e53cd5de6b3b502c541a57ab2fbfda`.
- Style reference SHA-256: `0236aed5fb0744e7348fe4983f6a68dfe6db038473f602ef384a8e30d74fdfb9`.
- PNG SHA-256: `c68c83f405b1a7fc6b0e8458aacc6f429ab130cc29cc80a2afa2d51cfe68001b`.
- WebP SHA-256: `5d4b33051d04e55d4ccf55f3574f54c640b145802c32e57aad2d256e8a8ad5dd`.
- Size: `1280 × 720`.
- The PNG file is byte-identical between next-app and main-site. The WebP file is also byte-identical between next-app and main-site.

## Related guides and ending

Exactly 3 related guides:

1. `what-is-agentic`
2. `first-ai-employee`
3. `manus`

Related heading: `Choose the next safe level.`

Clean ending: `Build 1 agent with 1 limited job. Keep its access small, test what happens when things go wrong and give it more access only after its results prove it is ready.`
