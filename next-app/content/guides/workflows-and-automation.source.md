# Source brief: Build 1 workflow that finishes the task and shows you when it fails

## Published route

- Slug: `workflows-and-automation`
- Canonical route: `/guides/workflows-and-automation.html`
- Primary level: Intermediate
- Hub: Workflows and automation
- Outcome: Automate a task
- Composition: Learning hub

## Production sources reviewed

- Guide migration matrix: `docs/GUIDE-MIGRATION-MATRIX.md`
  - SHA-256: `dec63c13be87ebba1cd86abc8f61d7a44159b7103f5421d853154b3d203bac58`
- Guide library production contract: `docs/GUIDE-LIBRARY-PRODUCTION-CONTRACT.md`
  - SHA-256: `427d49a6a587d79d4300a665f1b344a042ca4d923a28494c591bc87c520f8e1a`
- Existing guide-delivery workflow: `next-app/content/guides/follow-up-setup.ts`
  - SHA-256: `e50b4de0ef95675934bfe3c140544bcbe814c69ffa9aeecb7ed5776676b7c003`
- Existing daily inbox workflow: `next-app/content/guides/inbox-manager-setup.ts`
  - SHA-256: `12167e0b56929229ee27cea144b3ad5092229aa8d57d618ca76abeddd8486fc3`
- Existing source-to-publish workflow: `next-app/content/guides/research-to-content-workflow.ts`
  - SHA-256: `c79aab4c94584b6eb37556347d7766109f74889b4231999d9ed6de58f223a13c`
- Existing workflow-or-agent decision guide: `next-app/content/guides/what-is-agentic.ts`
  - SHA-256: `5e7f1ffe04672838fe0f884266cea214eefaad0ebc60edf7df734ac33ac8e7e4`

## Workbook evidence reviewed

- Editorial portfolio review: `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/outputs/guide-editorial-review/shift-and-lead-guide-portfolio-review.xlsx`
  - SHA-256: `3f19ce36963d309c6df34c565fd1a9b06f25379468c6230a757ec11ca785c8bb`

### Guide Inventory

- Cluster: `Practical AI workflows`
- Rows in cluster: 65
- `Rewrite & differentiate`: 6
- `Merge into hub`: 51
- `Archive / reference only`: 8

The 65 rows cover many tasks, tools and changing product features. The durable workbook instruction is to show the task before and after, name the owner for every step, state the evidence required, define how success is measured and add autonomy limits, review points and failure modes before scaling. The hub keeps this operating method and does not preserve the 65 source pages as separate lessons.

### Automation Setup A6:F12

The 7 workbook stages are Select, Retrieve, Rewrite, Human review, Build page, Publish and Record. The important controls retained for this hub are:

- select 1 eligible record and never process an unselected item;
- retrieve the source without publishing it word for word;
- move the rewrite through an editing state;
- require human approval before publication;
- validate the built file and run the site build;
- use a start-once key when publishing;
- record the live URL only after it works, and log failures for safe recovery.

These stages provide workflow evidence. The hub does not teach the workbook's publishing automation as a product setup.

### Taxonomy & Review Rules

- Range `A6:F20`: the Build pathway requires ownership, checkpoints and failure modes. Durable and practical material is preferred over volatile product detail. Hub consolidation is correct when several pages answer the same job. A reusable execution asset must include inputs, expected output, review checks and limitations.
- Range `A24:F28`: the article must include a decision promise, Shift & Lead point of view, practical method, quality and governance, and a clear action or next guide.

## Relevant creator source files reviewed

| Local source | Source URL | SHA-256 | Durable contribution retained |
| --- | --- | --- | --- |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/15-hours-week.json` | `https://learnaiwithmariah.com/guides/15-hours-week/` | `7b63969eb07d5f3eec581ca4d6b5799bd2696ccf83f11993e39eb2cc28f02be0` | Start from repeated real work and separate workflows by the result they produce. Time-saving claims are excluded. |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/ai-task-audit-prompt.json` | `https://learnaiwithmariah.com/guides/ai-task-audit-prompt/` | `0708fba2a9fd3753b4d01d26ddde63966939a878aa21d27946cac624377c04a1` | Choose 1 repeated task and define what should stay human before choosing a tool. |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/ai-sandwich-tasks.json` | `https://learnaiwithmariah.com/guides/ai-sandwich-tasks/` | `736645d949d17cc8b45f8c601a2c65580f116102847e85e2db3c3bc45d66a477` | Put human context and review around AI preparation instead of handing over the full task. The source task list is not reused. |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/ai-feedback-loop.json` | `https://learnaiwithmariah.com/guides/ai-feedback-loop/` | `c7a727067731ec3ffffe251992080558cca4eac5827db213abfa6d4f4c107996` | Record the correction from a run and use it to change the next version. Automatic self-improvement claims are excluded. |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/email-flows-audit-skill.json` | `https://learnaiwithmariah.com/guides/email-flows-audit-skill/` | `799f6cb7d964176162f25fda9b2769d91ad864e54ffef6259c047a34fd317340` | Test a complete message journey and review weak or broken steps. Benchmarks, product setup and campaign claims are excluded. |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/claude-email-dashboard.json` | `https://learnaiwithmariah.com/guides/claude-email-dashboard/` | `5f6ccb3507293372386dad0f09ddd785dd9f14c11f9d4bba800d93257820b11d` | A daily view can group messages into useful decisions. Current connector and dashboard claims are excluded. |

The workbook and creator pages are research inputs. Their phrases, examples, task lists, prompts, savings claims, performance claims, product steps and visual branding are not reused.

## Editorial job

This page is the Workflows and automation routing hub. It helps an Intermediate reader choose 1 repeated task, map a fixed path, limit access, test failure and make a Keep, Change or Stop decision before increasing volume.

The child guides retain their full jobs:

- `follow-up-setup` owns the detailed guide-delivery and message journey.
- `inbox-manager-setup` owns the daily message brief.
- `research-to-content-workflow` owns the source-to-publish content path.
- `what-is-agentic` owns the full workflow-or-agent decision.

The hub does not repeat those full setups. It provides the task routing, 6-step learning path and reusable task-to-workflow canvas.

## Direct answer

Heading: `If the steps stay the same, build a workflow`

A workflow is a fixed path. One event starts it, each step has an owner and the process ends with a result you can check. Normal software, automation or AI may complete a step, but people set the path and decide what happens when something goes wrong.

Use an agent only when the system must choose its next step from approved options. If several live workflows run across the business, add logs, alerts, an exception queue, a manual fallback and a stop switch. That is business operations, not just 1 workflow.

Key line: `Known path: workflow. Choice of path: agent. Always-on work: monitored operations.`

## 4 task-led pathways

1. `I want every guide request to get the correct file` routes to `follow-up-setup` with `Build the guide journey`. Direction: `Map the popup, contact, guide tag, email, PDF, later messages and failed-delivery handoff.`
2. `I want 1 daily view of messages that need me` routes to `inbox-manager-setup` with `Build the daily brief`. Direction: `Sort a narrow set of messages, keep source links, prepare drafts and show failures without sending or deleting anything.`
3. `I want saved research to become approved content` routes to `research-to-content-workflow` with `Build the content workflow`. Direction: `Move 1 source through capture, drafting, fact-checking, approval, publishing and learning before automating it.`
4. `I do not know whether this task needs a workflow or an agent` routes to `what-is-agentic` with `Choose workflow or agent`. Direction: `Check whether every step can be written now or whether the system must choose what to do next.`

## 6-step learning sequence

1. Beginner: choose 1 repeated task.
2. Beginner: name the start and finish plus duplicate protection.
3. Beginner: map inputs, steps and owners.
4. Intermediate: set access, rules and handoffs.
5. Intermediate: test the normal path and 6 failure cases.
6. Intermediate: run small and decide Keep, Change or Stop.

Every finish line is observable through a manual run, 1 recorded trigger, a blocked duplicate, a visible finished result, named owners, limited permissions, passed failure tests and a recorded decision.

## Shift & Lead example

- Heading: `Deliver the AI jargon guide without sending the wrong PDF`
- Situation: `A reader opens the AI jargon guide, uses the website popup and enters an email address. The reader expects the correct PDF immediately and by email.`
- Weak approach: `Send every popup submission into a general email flow, guess the file from the page title and mark the request complete even when delivery fails.`
- Decision: `Use 1 guide name, 1 matching delivery label and 1 approved PDF. Treat a failed email as an exception that needs an owner, not as a completed delivery.`
- Action: The request names the AI jargon guide. The workflow checks that its delivery label and approved PDF both match that guide. If either one is wrong or missing, the delivery stops. Later messages can start only after delivery succeeds. A rejected send or bounce writes a failure log, stops later messages, alerts Fatiha and creates a manual resend item with the reader, guide and error. Confirm or build each control in the connected system before launch.
- Result: `The reader receives the guide requested. A wrong file cannot be selected from a generic list, and a failed delivery cannot disappear as a false success.`
- Lesson: `A reliable workflow proves both the result and the failure.`

## Practical and downloadable asset

- Inline asset: `Task-to-workflow canvas`
- Download: `Task-to-workflow canvas`
- File: `/downloads/task-to-workflow-canvas.pdf`
  - Status: final fillable asset, 3 A4 landscape pages, 52 unique fields and 54 widgets.
  - Capacity: all 15 multiline canvas fields allow 1,200 characters each.
  - SHA-256: `932f5ad86072b03fa229d760d989d9a569f61dc058d78c3c6dd54bf2916c4f8e`
- Guide ID: `hub.workflows-and-automation`
- Lumail tag: `hub_task_to_workflow_canvas`
- Capture button: `Send me the workflow canvas`

The canvas includes all 15 approved fields:

1. Task and current owner: task, current owner and why it repeats.
2. Useful result: what must be true when finished.
3. Trigger and start-once rule: exact start event and how duplicate starts are blocked.
4. Frequency, volume and scope: how often, number of items and what stays outside.
5. Required inputs: every file, field, message or event needed.
6. Source of truth: where each important fact comes from and what wins when sources disagree.
7. Fixed steps in order: trigger to finish, with a workflow-or-agent stop when the next step is not known in advance.
8. Owner for every step: Human, Automation or AI, plus 1 named owner.
9. Access and permissions: the smallest mailbox, folder, record, field or action each step may use.
10. Output and finish check: output format, destination and visible proof of completion.
11. Rules and human approval: what stays true, what never happens and named-person approval.
12. Exceptions and handoff: unusual cases, owner and response time.
13. Failure handling: error log, owner alert, retry limit, duplicate protection and manual fallback.
14. Test set: normal, missing input, wrong input, duplicate trigger, provider failure, bad output and human-review case.
15. Run record and decision: what started, finished, failed or needed human help and who decides Keep, Change or Stop.

The inline asset also includes 9 processing rules, a 10-point quality bar and all 10 approved stop rules.

## 10 stop rules

1. No clear trigger or finished result.
2. The task cannot be completed manually once.
3. Inputs are missing, unclear or not allowed.
4. Access is broader than the task needs.
5. An action involving a customer, money, private data, publishing, deletion or a lasting record lacks named approval.
6. A duplicate trigger or retry could repeat the action.
7. A failure can remain hidden or has no owner.
8. There is no manual fallback.
9. The next step cannot be written before the run, so the task must be checked for an agent.
10. Several always-on workflows need shared monitoring, so the work moves to business operations.

## Material excluded

- Claimed time or cost savings.
- Tool installation steps, connector walkthroughs and copied prompt packs.
- Current product features, model names, plans, prices, limits or benchmark claims.
- Personal finance, legal, health and other high-risk use cases from the workbook cluster.
- Agent architecture and multi-agent design.
- Shared operations monitoring beyond the stop and handoff to the business-operations project.
- Copied creator language, examples, task lists and slogans.

## Exactly 3 next guides

1. `follow-up-setup`
2. `inbox-manager-setup`
3. `research-to-content-workflow`

## Artwork and publishing notes

- Published cover: `/images/guides/workflows-and-automation.webp`
  - WebP SHA-256: `058d8eeed30a107f8f6d87dd9b457f36e36a09ec03aaf93a9315d45ed4550279`
  - PNG SHA-256: `ab33c16e1548de1009f9abdf5977528aaa066bd37c6907859f686341e667e4bb`
  - Size: `1280 × 720`
  - The copies in `next-app/public/images/guides/` and `main-site/images/guides/` are byte-identical.
- Art direction: 16:9 small blue robot mascot mapping 1 trigger through ordered steps to a checked result, with a visible side path for failure and a full title safe zone on the left.
- Alt text: `The small blue robot mascot mapping a workflow from 1 trigger through ordered steps to a checked result and visible failure path`
- Focal point: `100% center`
- Keep the title and creator signature as live HTML.
- Do not show reading time, update date, `FREE` or byline metadata in the opening.
- Use the exact clean ending with no hard commercial action.

## Verification notes

- No current product capability, connector, model, plan, price, limit or benchmark claim is needed.
- The cover and final fillable PDF are present in both publish targets with byte-identical copies.
- The capture registry maps `hub.workflows-and-automation` to `hub_task_to_workflow_canvas`, and its active-download integration test passes.
- All 3 related routes resolve in the declared order: `follow-up-setup`, `inbox-manager-setup`, `research-to-content-workflow`.
- The production build publishes 25 guide routes. Guide-library validation passes for all 25 guides, 7 hubs and 10 required tool guides.
- Automated browser QA passes at 1440 × 1100 and 390 × 844: HTTP 200, no horizontal overflow, all reveal sections visible after scrolling, all 4 images loaded, hero focal point `100% 50%`, modal opens with the approved deliverable, and the PDF returns HTTP 200 as `application/pdf`.
- The library card is a single accessible link, displays the Intermediate level and creator signature, loads the 1280 × 720 cover and keeps the title in the open left safe zone.
