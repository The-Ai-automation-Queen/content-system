# Source brief: Run business operations in the right order

## Publishing contract

- Slug: `business-operations`
- Planned canonical route: `/guides/business-operations.html`
- Level: Beginner entry point; sequence: Beginner to Expert
- Hub: Business operations
- Outcome: Run business operations
- Composition: Learning hub
- Working title: `Run business operations in the right order`
- Working promise: `Choose what to automate first, give every process an owner and move forward only when the result and the failure can both be proved.`
- Phase status: source brief only. `business-operations.ts`, the cover, the PDF and publishing integration are not part of this phase.

## Production sources reviewed

| Source | SHA-256 | Contract used |
| --- | --- | --- |
| `docs/GUIDE-EDITORIAL-STANDARDS.md` | `e076bea599b35727dc64ac1cb550e21a6a477a3bd5b8980a6d583abf6a8b2341` | Reader usefulness, density, plain language, capture and ending rules |
| `docs/GUIDE-LIBRARY-PRODUCTION-CONTRACT.md` | `427d49a6a587d79d4300a665f1b344a042ca4d923a28494c591bc87c520f8e1a` | Hub scope, source transformation, page functions and publishing gates |
| `docs/GUIDE-MIGRATION-MATRIX.md` | `6f792100d39611baab46edfab631ba908f296c1fe3898e5e20da5aba68cf168f` | Hub 7 proposed route, level, outcome, child guides, deliverable, capture mapping, related guides and art direction |
| `main-site/api/guide-capture-registry.json` | `294c6f8cdc8e8693b799ffdd8cbebe7ce594bdda32380600103037cba3c58e6f` | Reserved guide ID, tag, filename and inactive capture status |

## Workbook census and selection

- Workbook: `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/outputs/guide-editorial-review/shift-and-lead-guide-portfolio-review.xlsx`
- SHA-256: `3f19ce36963d309c6df34c565fd1a9b06f25379468c6230a757ec11ca785c8bb`
- Primary evidence: `Guide Inventory`, columns `A:Y`.
- Complete source pointer review: `Source Guide Copy`, columns `A:L`.
- Hub confirmation: `Consolidation Hubs` and Hub 7 in `docs/GUIDE-MIGRATION-MATRIX.md`.

### Exact 102-row census

All 102 rows in the 2 matrix-named clusters were reviewed before the hub source set was locked.

| Workbook cluster | Rows | Hub-retained | Child-routed | Excluded from this hub |
| --- | ---: | ---: | ---: | ---: |
| `Practical AI workflows` | 65 | 6 | 4 | 55 |
| `AI for founders and operators` | 37 | 2 | 2 | 33 |
| Total | 102 | 8 | 6 | 88 |

The 8 hub-retained rows inside these clusters are:

- `Practical AI workflows`: `proprietary-data-ai-moat`, `60-30-10-framework`, `self-improving-setup`, `ai-risk-score`, `expert-knowledge-file`, `is-claude-safe`.
- `AI for founders and operators`: `3-step-ai-cost-audit`, `sunday-reset`.

The 6 child-routed rows are:

- `Practical AI workflows`: `15-hours-week`, `ai-sandwich-tasks`, `5-ai-tools`, `claude-email-dashboard`.
- `AI for founders and operators`: `emails-that-make-people-buy`, `ai-tools-worth-the-money`.

`15-hours-week` is boundary and catalogue evidence only. It is not hub-owned research and contributes no task list, time promise or public method.

The other 88 rows are excluded from this hub because their primary job is career, investing, personal finance, legal or health work, lifestyle automation, content production, tool selection beyond the routed stack decision, model or product news, personal productivity, marketing tactics, income promotion, a single workflow or a single agent. `ai-business-idea-workflow` is part of these 88 exclusions because idea discovery and validation are not the cross-business operations portfolio this hub owns. The hub-specific rule is strict: a source remains only when it helps inventory, compare, assign, measure, change or preserve processes across the business.

### Internal workbook material

`Automation Setup` was reviewed as internal production evidence only. Its Select, Retrieve, Rewrite, Human review, Build page, Publish and Record stages do not become the public Business Operations framework, diagram, example or downloadable asset.

`n8n` must not appear in the public architecture or reader copy. If an implementation team later uses it internally, that choice remains behind the process contract and is not presented as a required business platform.

## Complete local JSON audit

All files in this section were read completely from `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/`. The final audit covers 22 complete JSON files and 277,019 bytes:

- 8 matrix source-anchor files. `15-hours-week` is boundary and catalogue evidence only.
- 5 supporting files retained only as transformed mechanics.
- 5 additional files completing the 6 routed rows inside the 102-row census.
- 3 additional old-anchor or child-boundary research files outside the 102-row census.
- 1 explicitly excluded candidate inside the 88 excluded rows.

The workbook and JSON files are research inputs. Their wording, examples, prompts, task lists, product pitches, benchmarks, prices, claims and visual branding are not reused.

## 8 revised matrix source anchors

| Local source | Source URL | SHA-256 | Hub use |
| --- | --- | --- | --- |
| `ai-task-audit-prompt.json` | `https://learnaiwithmariah.com/guides/ai-task-audit-prompt/` | `0708fba2a9fd3753b4d01d26ddde63966939a878aa21d27946cac624377c04a1` | Start with a cross-business task inventory and rank tasks instead of asking which tool looks impressive. Career framing and time-saving claims are excluded. |
| `ai-risk-score.json` | `https://learnaiwithmariah.com/guides/ai-risk-score/` | `d794589486bb3fbefc00cb84047bb0df923bc58d002699771773c02d0378570a` | Separate repeated pattern work from judgment work and include relationship or decision damage in the evidence comparison. Job-loss and career-advantage framing are excluded. |
| `3-step-ai-cost-audit.json` | `https://learnaiwithmariah.com/guides/3-step-ai-cost-audit/` | `f30e18a36624e263b0abb9aa862c02399a1cb6d9f677aab3b48496739c6d55a7` | Link recurring cost to a named process, owner, measured result and limit. Survey figures, vendor setup and autonomous account access are excluded. |
| `proprietary-data-ai-moat.json` | `https://learnaiwithmariah.com/guides/proprietary-data-ai-moat/` | `402f68e5327110af12d36be468370915efb8ffe01865af61f60ea706ab1a367d` | Record the approved source of truth, its owner, date, rights and where the next process receives it. Competitive-moat and training-data claims are excluded. |
| `delegate-this.json` | `https://learnaiwithmariah.com/guides/delegate-this/` | `449424b75cf562fa6258488f3368e8ff129b83b5afa110ef67d3ae2762125ebc` | Define the handoff package: job, reason, approved sources, finished result, deadline, limits, questions and acceptance owner. Connector behavior and the copied delegation brief are excluded. |
| `ai-feedback-loop.json` | `https://learnaiwithmariah.com/guides/ai-feedback-loop/` | `c7a727067731ec3ffffe251992080558cca4eac5827db213abfa6d4f4c107996` | Compare the first result with the human-approved result, record recurring corrections and approve 1 controlled change at a time. Self-improvement claims and product file-watching behavior are excluded. |
| `ai-onboarding-check-before-bank-access.json` | `https://learnaiwithmariah.com/guides/ai-onboarding-check-before-bank-access/` | `68fe0c5d23ad12ec03a26fa1862a00c250c969b52233c022ddbbd41fa3573a5c` | Add an access lifecycle: requested access, real read and action scope, approver, test, expiry, review, revoke owner and proof of removal. All banking examples and vendor capability claims are excluded. |
| `15-hours-week.json` | `https://learnaiwithmariah.com/guides/15-hours-week/` | `7b63969eb07d5f3eec581ca4d6b5799bd2696ccf83f11993e39eb2cc28f02be0` | Boundary and example catalogue only. It confirms that candidate processes span inbox, meetings, content, files and scheduled work. It contributes no source task list, time claim, product setup or public method. |

This matrix source-anchor ledger is not the 102-row retained count. It records the 8 research anchors required by Hub 7. `15-hours-week` is boundary and catalogue evidence only, not a retained hub mechanic, a time-saving promise or a list of automations. The other anchors contribute only the transformed operations use stated above and do not reopen any of the 88 excluded rows.

## 5 supporting sources retained only as transformed mechanics

| Local source | Source URL | SHA-256 | Transformed mechanic |
| --- | --- | --- | --- |
| `60-30-10-framework.json` | `https://learnaiwithmariah.com/guides/60-30-10-framework/` | `0c57faf76b76908c7494114089dbbb67bf46f76e48165da1e0afe372084412bc` | Classify a process as Proven, Improve or Experiment. Do not adopt the source percentages or borrowed framework name. |
| `self-improving-setup.json` | `https://learnaiwithmariah.com/guides/self-improving-setup/` | `0e25dd895ea1eba4306863eaa8400debcc602e0d39bd2ac4d9d390049807ae24` | Schedule a human review of stale instructions, recurring corrections and unused access. The system does not improve itself. |
| `expert-knowledge-file.json` | `https://learnaiwithmariah.com/guides/expert-knowledge-file/` | `d832dd3afc9d291a5616e075f8934fef97297c7cc679e5f850fb1c9106862549` | Maintain an approved source pack with source, date, owner, rights, priority and expiry. Training-data and citation-share claims are excluded. |
| `is-claude-safe.json` | `https://learnaiwithmariah.com/guides/is-claude-safe/` | `1793f011a5f966de923df3e4a7f9a12032fe0ec4086ad6aaffc722826cc323f5` | Record access, approval, expiry and revocation as real settings in the connected tool. Every vendor privacy, training, connector and permission claim needs current primary verification. |
| `sunday-reset.json` | `https://learnaiwithmariah.com/guides/sunday-reset/` | `e58a3d96daeb628b8e95b08fc6a1b5faf119af4197615f2bf2e4e34e52418a75` | Use a weekly operating review to check the process register, approvals, exceptions, access, realized result and next implementation decision. Personal, financial, meal and lifestyle blocks are excluded. |

Together with `proprietary-data-ai-moat`, `ai-risk-score` and `3-step-ai-cost-audit` in the matrix source-anchor ledger, these 5 files form the exact 8 retained transformed mechanics inside the 102 rows. No other row in the named clusters supplies the hub method.

## 6 routed rows inside the 102-row census

These files were read and hashed, but they do not supply the Business Operations framework or public example.

| Source material | SHA-256 | Route and boundary |
| --- | --- | --- |
| `15-hours-week.json` | `7b63969eb07d5f3eec581ca4d6b5799bd2696ccf83f11993e39eb2cc28f02be0` | Boundary and catalogue evidence only. Route the detailed mechanics to `stack-3-tool-ai-stack` and `24-7-operations-system`, where the current source briefs already own them. |
| `ai-sandwich-tasks.json` | `736645d949d17cc8b45f8c601a2c65580f116102847e85e2db3c3bc45d66a477` | Route to `first-ai-employee`. That guide owns the human context, AI preparation and human review pattern for 1 bounded job. The source task list is excluded. |
| `5-ai-tools.json` | `ab009517f911f66f87c1e515c068b636c0e62e0e7063b8a16b96eaa06d924ae3` | Route to `stack-3-tool-ai-stack`. That guide owns the small-stack decision and real task test. Product rankings and copied examples are excluded. |
| `claude-email-dashboard.json` | `5f6ccb3507293372386dad0f09ddd785dd9f14c11f9d4bba800d93257820b11d` | Route to `inbox-manager-setup`. That guide owns the daily inbox brief, source links and exception test. |
| `emails-that-make-people-buy.json` | `c2c9e8da26857565190066974f9d166e5d54f2e50fbdbee7e14f71c9331ec076` | Route to `follow-up-setup`. That guide owns message purpose, CTA and approved sequence details. |
| `ai-tools-worth-the-money.json` | `ad52e23f7197aed0974fcb043c6dfcb628a915a9cf317cacfe8bbb5eef24ee2e` | Route to `stack-3-tool-ai-stack`. That guide owns overlap, cost and Keep or Remove decisions. Prices, vendor verdicts and savings claims are excluded. |

## Additional old-anchor and child-boundary research outside the 102 rows

These 3 files do not change the 8 retained, 6 routed and 88 excluded census.

| Source material | SHA-256 | Route and boundary |
| --- | --- | --- |
| `email-marketing-agent.json` | `3a896b86085bc2f9e67cbb672a51221e095638524dcb3e3f2bd93e4e18d9c189` | Route to `follow-up-setup`. That guide owns message-journey testing, stop rules and handoff. |
| `always-on-ai-agent-team.json` | `cd1d129d7d2bb426d278e01f69aa31828ce016ce8e6a4dcb48ff4775d34a57e5` | Route to `24-7-operations-system`. That guide owns monitored scheduled work, queues, shutdown and restart. |
| `human-agent-teams-playbook.json` | `f117d8abadb6c54b4b90a438afb137d922f0f64328c3638994aa474b4a1b9a70` | Route to `first-ai-employee`, `24-7-operations-system` and the AI agents hub. Those guides own the 1-job brief, agent handoff and multi-process monitoring. |

`ai-business-idea-workflow.json`, SHA-256 `d1a868a5baab37ac27e836a78880a346e502c1fae80f2d2f043404c7c84150ea`, is explicitly excluded as part of the 88 excluded rows. Researching or validating a business idea is not the process-portfolio job of this hub.

## Hub-owned editorial job

This page is the original portfolio and routing layer for business operations. It does not teach the detailed workflow, inbox, follow-up, agent or monitored-operations methods owned by its child guides.

The Shift & Lead point of view is:

`Do not automate the loudest task. Start with the reversible process that has the strongest proof and the clearest recovery route.`

The hub owns 7 functions that do not belong to any 1 child guide:

1. A cross-business process inventory.
2. An evidence-based comparison using ownership, proof, reversibility, data boundaries, customer or lasting action, repetition, failure cost and recovery.
3. A source-of-truth and handoff map across processes.
4. A portfolio register showing Start first, Prepare controls, Keep manual, Remove or merge, proven, paused and stopped decisions.
5. A change and access lifecycle with approval, expiry and revocation.
6. Realized-benefit measurement against the recorded baseline.
7. Continuity through a backup owner, manual path, current source pack and tested stop.

A tool completes a task. This hub decides which process deserves work next, what must be true before it starts and where the reader goes to build it properly.

## Locked evidence-based comparison

Do not use a numeric score or arithmetic. Compare every candidate with the same evidence rules, in this order:

1. A process with no named owner or no observable proof cannot be `Start first`.
2. Work that is hard to reverse cannot be `Start first` unless a safe version removes the action and prepares the work for a person to approve.
3. A process using sensitive data without an approved data boundary is `Prepare controls`.
4. A customer-facing action or an action that creates a lasting record is `Prepare controls` unless the pilot is preparation-only and a person takes the action.
5. Among the candidates that remain, choose the 1 with the strongest proof, highest repetition, lowest failure cost and clearest recovery route as `Start first`.

Every candidate receives 1 explicit decision:

- `Start first`: the evidence supports a small supervised pilot now.
- `Prepare controls`: ownership, proof, data boundary, reversibility or approval must be fixed before a pilot.
- `Keep manual`: the work still depends on human judgment or the safe version offers too little benefit.
- `Remove or merge`: the process or tool duplicates another job, no longer produces a useful result or should stop.

Record the evidence and reason for the decision. The comparison chooses the next process; it never grants permission to automate consequential work.

## Beginner-to-Expert journey

### Beginner

1. List every recurring process across demand, delivery, communication, administration, finance, content and service.
2. Name the result, owner, source, handoff and current proof for each process.
3. Apply the locked evidence rules and decide `Start first`, `Prepare controls`, `Keep manual` or `Remove or merge` for each candidate.

### Intermediate

4. Open the matching child guide and build 1 complete process with the smallest access and a normal and failure test.
5. Add the process to the portfolio register only after its owner accepts the proof.
6. Record approved changes, access, expiry, realized result and the next review.

### Expert

7. Add shared monitoring only for proven processes. Keep a backup owner, manual path, current source pack, stop control and human-approved restart.

Readers may enter at the matching level. A reader who needs only a stack decision or 1 follow-up path should not have to read the expert monitoring material.

## Process portfolio register

Use 1 row per process:

- process name and business result;
- classification: Proven, Improve or Experiment;
- current state: Start first, Prepare controls, Keep manual, Remove or merge, Testing, Proven, Paused or Stopped;
- what starts it, frequency and volume;
- primary owner and backup owner;
- approved source of truth and source owner;
- input and output handoff;
- evidence comparison: owner, proof, reversibility, approved data boundary, customer or lasting action, repetition, failure cost and recovery route;
- workflow, agent or manual route;
- current access, approver, expiry and revoke owner;
- baseline and realized result;
- latest normal test, failure test and proof;
- manual continuity path and stop control;
- next review and decision.

## Source-of-truth and handoff map

For each process, record:

1. Which source supplies each important fact.
2. Which source wins when 2 sources disagree.
3. Who owns correction, expiry and deletion.
4. What exact input passes into the next process.
5. What proof returns to the previous owner.
6. What missing, late, conflicting or sensitive input stops the handoff.
7. Which person receives the stopped item and by when.

Do not make a single large diagram of every tool. The public map follows processes, sources, owners and handoffs.

## Change and access lifecycle

Every change follows the same lifecycle:

1. Name the process problem and baseline.
2. Propose 1 change and the expected result.
3. Name the owner and approver.
4. Grant the smallest access inside the connected tool.
5. Set an expiry or review date and the person who can revoke access.
6. Test the normal path and the failure path.
7. Compare the actual result with the baseline.
8. Keep, change, remove or stop the change.
9. Record the decision and remove unused access.

Realized benefit means the measured change after human review. Record volume, total human time, review time, corrections, exceptions, failures, operating cost and the customer or business result. Do not publish a saving that was estimated before the process ran.

## Child-guide boundaries

| Child guide | Content SHA-256 | Source brief SHA-256 | Child owns |
| --- | --- | --- | --- |
| `stack-3-tool-ai-stack` | `6a39a41f3628fa70a92ffa2cf04fe2cc66f13a549746053183a41ae068c19cf9` | `d1e74db7908bfd941b3b6e78b79f0718e77f1624099c8dd308603ac8ad56e2d9` | The 3-job stack audit, tool overlap, cost and Keep or Remove decision. |
| `follow-up-setup` | `e50b4de0ef95675934bfe3c140544bcbe814c69ffa9aeecb7ed5776676b7c003` | `519234abe3ea289645ad1692a8c20e957858642498d72f15b661819d4af10c3e` | The guide-request and follow-up journey, contact, tag, approved messages, reply stops, opt-out, failure and handoff. |
| `inbox-manager-setup` | `12167e0b56929229ee27cea144b3ad5092229aa8d57d618ca76abeddd8486fc3` | `33390cde9f94f8607bd670eb6f0ad8489b0c8e8031854e8a8ac682fa7b8174f5` | The read-only daily inbox brief, categories, source links, unsent drafts and exception tests. |
| `first-ai-employee` | `e3da1436b24b5f650acce1adda2f2336bf5c4dd0c33da79c7db75aacf15e17d4` | `21879a016aead1c8c24cf71a9be1cb0698703aff6f819548d9187e79c0b9e8ff` | The full job description, minimum permissions, approval, stop, evidence and test for 1 AI-supported job. |
| `24-7-operations-system` | `a08121cb8f86db07e99065009fc518901265ee90a8024656b03b6c5f1b61a547` | `1cd4ad1e853a76d6a55273cd7d8f081c28713b55e2a1bd6bc8d0ceeef80390c4` | The live operations dashboard, approval and exception queues, failure handling, shutdown and human-approved restart. |

The hub owns the portfolio register and routing decision. It must not duplicate the child worksheets, message sequence, inbox rules, agent job description or live monitoring blueprint.

## Task-led routes

1. Too many overlapping tools routes to `stack-3-tool-ai-stack`.
2. A guide, offer or follow-up path that does not finish reliably routes to `follow-up-setup`.
3. Replies, urgent items and delivery failures spread across the day route to `inbox-manager-setup`.
4. A repeated task that genuinely needs changing next steps routes to `first-ai-employee` after the workflow-or-agent check.
5. Several proven processes that run on a schedule route to `24-7-operations-system`.

## Original Shift & Lead worked example

### Choose the next Shift & Lead operations build

Situation: Shift & Lead has several possible improvements: simplify an overlapping tool, fix a guide-delivery path, prepare a daily reply brief, let AI prepare a failed-delivery review and add shared monitoring.

Weak approach: Buy another tool or build the most impressive automation first, without recording the owner, source, failure cost or proof.

Decision: Put all 5 candidates into the process register. Apply the locked evidence rules in the same order. Route each candidate to the guide that owns the detailed build.

Action:

1. Record the current process, repetition, human time, required data boundary, owner, observable proof, reversibility, customer or lasting action, failure cost and recovery route.
2. Mark overlapping tool work `Remove or merge` and route the decision to `stack-3-tool-ai-stack`.
3. Route the guide-delivery path to `follow-up-setup` and the daily reply brief to `inbox-manager-setup`.
4. Mark any customer-facing action or lasting record `Prepare controls`. Route the failed-delivery review job to `first-ai-employee` only if the preparation-only version cannot do the useful work.
5. Keep shared monitoring in `Prepare controls` until the individual processes pass. Then route it to `24-7-operations-system`.
6. Start only the candidate with the strongest proof, highest repetition, lowest failure cost and clearest recovery route. Record the baseline, result, corrections, exceptions and Keep, Change or Stop decision before choosing the next one.

Result: Fatiha can see why 1 process is `Start first`, who owns it, what proof will count and which guide contains the detailed build method. Work that fails a gate moves to `Prepare controls`, `Keep manual` or `Remove or merge`.

Lesson: Operations improve when the business chooses from evidence, not when the tool list grows.

This example is original to Shift & Lead. It does not claim that any provider supplies a trigger, permission, alert, handoff or stop automatically.

## Practical and downloadable asset

- Reader-facing inline and downloadable asset: `What to automate first worksheet`
- Planned file: `/downloads/business-operations-automation-map.pdf`
- Guide ID: `hub.business-operations`
- Lumail tag: `hub_business_operations_map`
- Capture button: `Send me the worksheet`
- Modal title: `Get the worksheet: What to automate first`
- Reader PDF subtitle: `Compare 5 real tasks. Choose 1 safe first build. Put the rest in order.`
- Internal asset record: `Business operations automation map`
- Current registry status: reserved and inactive.
- Current file status: not created in either publish target.
- Internal filename, guide ID and Lumail mapping remain unchanged even though the reader-facing asset name changes.

Plan an exact 3-page fillable PDF that is deeper than the page:

1. `5 candidates`: capture only the task and useful result, repetition, current monthly time, current owner and proof for exactly 5 candidates. Select exactly 3 finalists.
2. `3 finalists`: for each finalist, capture repetition, highest-risk action, data, owner and backup owner, failure cost, reversibility and recovery, proof, ranking reason and 1 decision: `Start first`, `Prepare controls`, `Keep manual` or `Remove or merge`.
3. `3 positions`: order the 3 tasks. For each, record owner, reason, first safe version, test proof, undo or restore route, missing control, dates, next child worksheet and final readiness and action. Position records order only. It does not force a decision, and each finalist keeps the decision supported by its evidence.

The worksheet compares evidence and records implementation order without a numeric score. It must not contain a dashboard or shutdown plan, detailed permissions, sequence timing, inbox rules or a tool audit. It contains no product setup.

### Locked practical result

The completed worksheet must produce:

- 1 task to test first;
- 2 tasks in implementation order;
- a named owner for each;
- the evidence supporting the order;
- the approved data boundary;
- the highest-risk action;
- the cost if the task fails;
- how the current state can be restored;
- the next child worksheet;
- 1 action due within 48 hours.

The worksheet remains a prioritisation tool. It must not contain:

- dashboard or shutdown design;
- detailed permissions;
- approval-queue architecture;
- follow-up sequence timing or message mechanics;
- inbox categories or daily brief design;
- tool-by-tool stack auditing.

### Locked Page 1 implementation: Find 5 real candidates

Context fields:

| Field | Capacity and control |
| --- | --- |
| Business area | 120 characters |
| Decision owner | 80 characters |
| Review period | 40 characters |
| Result wanted this quarter | 500 characters, multiline |

Each of the 5 task rows contains:

| Field | Capacity and control |
| --- | --- |
| Task and useful result | 500 characters, multiline |
| Repetition | 80 characters |
| Time spent each month | 40 characters |
| Current owner | 80 characters |
| Proof source | 300 characters |
| Take to comparison | Checkbox |

The proof source must be a dated example, count, log, source record or actual work sample. "It feels repetitive" is not sufficient evidence. Exactly 3 tasks continue to Page 2.

### Locked Page 2 implementation: Compare the 3 finalists

Use no numeric score and no arithmetic formula. Each finalist records:

| Field | Capacity and control |
| --- | --- |
| Task | 160 characters |
| Repetition | 80 characters |
| Risk or highest action | 160 characters |
| Data used | 160 characters |
| Owner and backup | 120 characters |
| Failure cost | 240 characters |
| Reversibility or recovery route | 300 characters |
| Proof used for the comparison | 300 characters |
| Evidence-based ranking reason | 500 characters, multiline |
| Decision | Radio group |

Use these 7 plain comparison bands exactly:

| Factor | Reader-facing choices |
| --- | --- |
| Repetition | Many times daily / Daily / Weekly / Monthly or less |
| Risk | Read or prepare only / Reversible internal change / Customer-facing or lasting action |
| Data | Public / Internal / Customer / Sensitive or regulated |
| Owner | Owner and backup / Owner only / No owner |
| Failure cost | Small rework / Missed work or delay / Customer or money impact / Hard to recover |
| Reversibility | Undo in the same day / Restore manually / Hard or impossible to reverse |
| Proof | Current record or example / Estimate only / No evidence |

Use these stable decision exports exactly:

- `StartFirst`
- `PrepareControls`
- `KeepManual`
- `RemoveOrMerge`

Apply these 6 evidence rules exactly:

1. A task with no owner cannot be first.
2. A task with no evidence cannot be first.
3. A task that is hard to reverse cannot be first unless its safe first version removes that action.
4. Sensitive data without an approved rule for what data may be used moves to `Prepare controls`.
5. Customer-facing or lasting actions move to `Prepare controls` unless the first test is preparation-only.
6. Among the remaining tasks, put the task with the strongest proof, highest repetition, lowest failure cost and clearest recovery route first.

This creates an evidence-based order without pretending that subjective risks can be reduced to an exact score.

### Locked Page 3 implementation: Put the work in order

Use these 3 implementation slots:

1. Build first
2. Prepare next
3. Prepare after that

Each slot contains:

| Field | Capacity and control |
| --- | --- |
| Implementation order | 2 characters |
| Task | 160 characters |
| Owner | 80 characters |
| Why this position | 300 characters |
| First safe version | 500 characters, multiline |
| Proof to collect during the test | 300 characters |
| How to undo or restore the current state | 300 characters |
| Control still needed | 300 characters |
| Start date | 40 characters |
| Review date | 40 characters |
| Next worksheet | Radio group |

Use these stable next-worksheet exports and reader-facing labels exactly:

| Export | Reader-facing label |
| --- | --- |
| `ToolStack` | Simplify the tool stack |
| `LeadFollowUp` | Build lead follow-up |
| `InboxBrief` | Build a daily inbox brief |
| `BoundedAIJob` | Set limits for 1 AI job |
| `MonitoredOperations` | Monitor proven workflows |
| `KeepManual` | Keep this task manual |

Use these 8 final readiness checks exactly:

1. The current process has been observed or documented.
2. The ranking uses real proof.
3. The owner and reviewer are named.
4. The data source and rule for what it may use are approved.
5. The first version prepares only or uses reversible test data.
6. The expected result and proof are defined.
7. The recovery route has been tested manually.
8. The correct next worksheet is selected.

Use these stable final decision exports exactly:

- `StartSafeTest`
- `CollectProof`
- `PrepareControl`
- `KeepManual`

Final 48-hour fields:

| Field | Capacity and control |
| --- | --- |
| Next action within 48 hours | 300 characters, multiline |
| Person and deadline | 120 characters |

### Locked form implementation

- Target: 108 unique fields and approximately 135 widgets.
- Set an explicit capacity for every text field.
- Prefix every unique field name with `business_ops_`.
- Use no embedded PDF JavaScript.
- Keep radio export states stable.
- Use a semantic tab order.

### Locked child-worksheet boundaries

- Tool stack: ownership, overlap and subscription decisions only.
- Lead follow-up: trigger, delivery, follow-up and handoff mechanics only.
- Inbox brief: message classification, draft handling and summary design only.
- Bounded AI job: job boundary, access, approval and failure handling only.
- Monitored operations: dashboards, queues, alerts, shutdown and restart only.

The hub worksheet selects which child asset is needed. It does not begin designing that system.

### Evidence dependency before PDF generation

Do not invent values for the worked Shift & Lead example. Verify:

- the exact task being compared;
- actual repetition or the dated record used to prove it;
- the current owner and backup;
- the exact approved data source;
- the highest action the proposed system could take;
- 1 real or credible failure consequence;
- how the current state would be restored;
- the proof collected during a safe test;
- the correct child worksheet route.

If exact operating evidence is unavailable, use a short qualitative example with no invented counts, costs or performance claims.

## Exactly 3 next guides

Use the migration-matrix order exactly:

1. `stack-3-tool-ai-stack`
2. `follow-up-setup`
3. `24-7-operations-system`

Related heading: `Choose what to fix next.`

`inbox-manager-setup` and `first-ai-employee` remain task routes inside the hub but are not added to the final 3 related cards.

## Cover plan and safe zone

- Planned file: `/images/guides/business-operations.webp`
- Format: 16:9, 1280 by 720.
- Field: signal red `#C92F28`.
- Visual treatment: charcoal engraving with restrained brass.
- Artwork boundary: limit all artwork to the right side.
- Art direction: show the exact small blue robot mascot moving 1 blank task card to the front of a short ordered queue at a single antique dispatch table in warm ivory. Include exactly 1 brass lever.
- Title safe zone: keep the left 46% empty signal red, free of the mascot, table, cards, lever and high-contrast detail.
- Live copy position: left.
- Planned focal point: `82% center`.
- Planned alt text: `The small blue robot mascot moving a blank task card to the front of a short ordered queue at a single antique dispatch table in warm ivory`.
- Keep the title, `The AI Automation Queen · Shift & Lead` and creator signature as live HTML. Do not bake text into the art.
- Do not include a dashboard, pipeline, railway, gates, permission gates, screens, labels, numbers or embedded text.
- Current status: no cover is created in either publish target.

## Ending decision

Use a commercial ending because the reader has completed a portfolio decision and the Shift & Lead Build Sprint is the relevant implementation step. Do not place the offer before the method, example, worksheet and result check.

- Eyebrow: `Ready to build the 1st process?`
- Heading: `Turn the approved 1st process into a working business system`
- Body: `Complete the worksheet and choose 1 reversible process with strong proof and a clear recovery route. The Shift & Lead Build Sprint can then build the workflow, handoffs and controls around your real business.`
- Action: `See the Build Sprint`
- Href: `/build-sprint.html`

Do not add another bottom capture or a second commercial action.

## Exclusions

- Career content, job-loss scores, raise and performance-review material.
- Business-idea generation or validation.
- Investing, stock trading, credit, personal finance, tax and money-app guidance.
- Income, side-hustle, million-dollar-business, pricing and rapid-growth claims.
- Personal, relationship, travel, meal, fitness, home and family automation.
- Legal, medical and other high-risk professional work.
- Marketing copy, content production and channel tactics owned by other guides or hubs.
- Tool and model rankings, prices, plans, limits, benchmarks, release news and feature tours.
- Product setup, connector instructions and product-specific commands.
- Claims that a system runs a business, replaces a person, improves itself or works safely without supervision.
- Copied prompts, metaphors, examples, task lists, slogans, bylines and design treatment.
- Lead and governance curriculum.
- `Automation Setup` and n8n in the public method, copy, example, architecture or asset.

## Factual verification required before drafting or publishing

The portfolio method needs no unstable product, performance or benchmark claim. Keep all source statistics, prices, savings, income, rankings and current feature claims out unless the editor makes a separate evidence-backed decision.

The following facts still require current primary documentation or a real account test if they enter implementation:

1. The exact read, write, action, approval, expiry and revocation controls of each connected tool.
2. Which Shift & Lead operating records are the approved sources of truth and who owns correction, expiry and deletion.
3. The actual current baseline for each process before any realized benefit is reported.
4. The real backup owner, manual continuity path and stop control for each implemented process.
5. Whether the Build Sprint offer and `/build-sprint.html` still match the proposed ending when the guide is drafted.
6. Final canonical metadata and route behavior after `business-operations.ts` is integrated.

Repository facts confirmed in this phase:

- The capture registry reserves `hub.business-operations` and `hub_business_operations_map`, but `active` is `false`.
- `business-operations-automation-map.pdf` does not exist in `next-app/public/downloads/` or `main-site/downloads/`.
- `business-operations.webp` does not exist in `next-app/public/images/guides/` or `main-site/images/guides/`.
- `business-operations.ts` was not created.

## Phase 1 completion statement

The exact 102-row census, revised 8-anchor set, exact 8 retained transformed mechanics, 6 routed rows, 88 exclusions, 3 additional outside-census child boundaries, locked evidence comparison, portfolio register, source and handoff map, change and access lifecycle, realized-benefit measurement, continuity plan, original example, worksheet contract, capture identifiers, cover safe zone, related-guide order, commercial-ending decision and factual-verification list are complete. Reader copy, PDF, cover and integration remain separate phases.
