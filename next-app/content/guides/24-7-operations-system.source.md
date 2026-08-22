# Source brief: Run a business around the clock without being on 24/7

## Published route

- Slug: `24-7-operations-system`
- Canonical route: `/guides/24-7-operations-system.html`
- Level: Expert
- Hub: Business operations
- Outcomes: Run business operations, Automate a task

## Source files reviewed

- Existing Shift & Lead page snapshot: `main-site/guides/24-7-operations-system.html` at commit `962ab23a78db492e27108c70dc509afd49d1a086`
  - SHA-256: `45b2ba3fa9b1529014e1a44ed2aaab18bcdafa9fd6f7d012c79df224f992eda8`
- Editorial portfolio review: `shift-and-lead-guide-portfolio-review.xlsx`
  - SHA-256: `3f19ce36963d309c6df34c565fd1a9b06f25379468c6230a757ec11ca785c8bb`
- `always-on-ai-agent-team.json`
  - Source: `https://learnaiwithmariah.com/guides/always-on-ai-agent-team/`
  - SHA-256: `cd1d129d7d2bb426d278e01f69aa31828ce016ce8e6a4dcb48ff4775d34a57e5`
- `human-agent-teams-playbook.json`
  - Source: `https://learnaiwithmariah.com/guides/human-agent-teams-playbook/`
  - SHA-256: `f117d8abadb6c54b4b90a438afb137d922f0f64328c3638994aa474b4a1b9a70`
- `ai-agent-manager.json`
  - Source: `https://learnaiwithmariah.com/guides/ai-agent-manager/`
  - SHA-256: `fcf38efabcfd44e7db3ec44743edfb31a431e475bdd2559f199d13d64d97ec73`
- `managed-agents.json`
  - Source: `https://learnaiwithmariah.com/guides/managed-agents/`
  - SHA-256: `0ca5ee135575215abaf181fccc40ae90012eade3f4f2c0ab8ae63edeadbc0e83`
- `multi-agent-framework.json`
  - Source: `https://learnaiwithmariah.com/guides/multi-agent-framework/`
  - SHA-256: `cab3643327abc02082d3578b3af4e90c584e2394cc0a693c1382ec18d9de0e44`
- `agent-guardrails-template.json`
  - Source: `https://learnaiwithmariah.com/guides/agent-guardrails-template/`
  - SHA-256: `9555ea8a49a4771a174af90c10713d76a7ba07c620a008b09af5e04306d8eef5`
- `15-hours-week.json`
  - Source: `https://learnaiwithmariah.com/guides/15-hours-week/`
  - SHA-256: `7b63969eb07d5f3eec581ca4d6b5799bd2696ccf83f11993e39eb2cc28f02be0`

The creator pages and workbook are research inputs. Their sentences, bylines, vendor claims, performance claims, partnership language, setup commands and visual branding are not reused.

## Editorial decision

The guide treats around-the-clock operations as monitored coverage for routine work. It never promises unsupervised autonomy. Every workflow has 1 job, a named owner, a narrow action boundary, current evidence, an approval queue, an exception queue, a manual fallback and a tested shutdown route.

The operating principle is direct: keep routine work moving, queue judgment for a person, stop loudly when the safe path ends and make restart a human decision.

The guide does not recommend a large agent team or a supervisor agent as the starting point. A small operation should run separate bounded workflows and view their status in 1 operations dashboard. This makes ownership, permissions and failure easier to inspect.

## Exact operating method

The published tutorial uses 7 steps:

1. Choose 1 routine job, business result and human owner.
2. Define the trigger, approved inputs, fixed output, destination, allowed actions and prohibited actions.
3. Put consequential actions in an approval queue before they happen.
4. Build a daily operations dashboard from current evidence, not status claims.
5. Route missing, conflicting, sensitive, late and out-of-scope work to an exception queue.
6. Set retry limits, failure alerts and a manual fallback.
7. Test the shutdown and restart rule before adding operating hours or another workflow.

No workflow may hide a partial result, continue after an unknown state or mark itself healthy without fresh proof. Sending a different message, publishing, purchasing, refunding, deleting or changing a lasting record requires explicit approval. A narrow pre-approved guide delivery may run only when the recipient requested it and the guide, template, file and tag match the approved specification.

## Operations dashboard

The dashboard shows each workflow on 1 row with:

- workflow name and human owner;
- last run start, finish and status;
- input, completed, approval, exception and failure counts;
- age of the oldest approval and exception;
- retries used and cost or risk limit status;
- link to the output, source evidence and run log;
- last confirmed alert test;
- next human review.

Completed, Stopped and Failed are separate states. Stopped means the safety rules worked. Failed means the workflow did not reach a safe result. No recent evidence means Unknown, never Healthy.

## Approval and exception queues

An approval item contains the proposed action, source evidence, expected effect, risk, undo plan, approver, deadline and current state. The workflow remains paused until the named person approves or rejects it.

An exception contains the detection time, workflow and run, source item, exception type, impact, safe state, missing decision, owner, deadline, resolution and proof. Exceptions never disappear into a summary count while unresolved.

## Shutdown and restart rule

Shut down the affected workflow when:

- there is no named owner or current completion evidence;
- the trigger, source, destination, permission or approved template changes unexpectedly;
- an approval or exception passes its deadline;
- the same failure reaches the written retry limit;
- a risk, volume, value or cost limit is exceeded;
- the alert route, audit log or manual fallback fails;
- the system sends, publishes, purchases, refunds, deletes or changes a lasting record outside the approved boundary;
- a reply, opt-out or complaint is ignored;
- the workflow reaches an unknown state.

Shutdown means disable the trigger, stop new work, preserve the run log and queues, alert the named owner and start the manual fallback. Restart requires a named cause, approved fix, passing normal and failure tests, working alerts and explicit approval from the owner.

## Shift & Lead worked example

The example uses Shift & Lead guide operations across different time zones. Separate bounded workflows handle the guide request, approved delivery, follow-up state and daily inbox brief. The operations dashboard monitors the guide link, downloadable file, capture event, Lumail tag, delivery result, replies and handoffs.

The approved delivery may send the requested guide only when the slug, file, recipient, template and Lumail tag all match. A missing file, tag mismatch, delivery failure, reply, opt-out or complaint enters the exception queue. Follow-up stops on a reply, opt-out or complaint. Fatiha owns the queue, approves changes and restarts a disabled workflow only after the cause is fixed and the tests pass.

## 10-minute action and downloadable asset

- Inline asset: 10-minute monitored-job map.
- Download: `24/7 operations blueprint`
- File: `/downloads/24-7-operations-blueprint.pdf`
  - SHA-256: `a5ddb47c09d02e0d036d910be332f00180527b4c8afcd9dcea49b9c3a32268a2`
- Guide ID: `guide.24-7-operations-system`
- Lumail tag: `guide_247_operations_blueprint`
- Capture button: `Send me the operations blueprint`

The inline action names 1 routine job, trigger, output, owner, approval, exception, failure and shutdown route. The PDF expands the same method into a monitored operating blueprint with dashboard, queues, daily review and restart controls.

## Exactly 3 next guides

1. `first-ai-employee`
2. `inbox-manager-setup`
3. `follow-up-setup`

## Artwork and publishing notes

- Final cover: `/images/guides/24-7-operations-system.webp`
- Alt text: `The small blue robot mascot beside a day-and-night operations machine that separates completed work from alerts`
- Focal point: `100% center`
- Keep the title and creator signature as live HTML.
- The existing cover shows the exact small blue robot beside a monitored day-and-night machine, with visible completed and alert outputs.
- The Build Sprint may appear only after the full method, worksheet, worked example and result check.

## Verification notes

- Test normal work, missing data, an approval timeout, a provider failure, an alert failure, a duplicate event, a volume limit, a reply, an opt-out and a complaint.
- Confirm the shutdown route can stop new work without removing logs or unresolved queue items.
- Confirm the manual fallback works before relying on the automated path.
- Recheck the real permissions and delivery behavior of every connected provider during implementation.
