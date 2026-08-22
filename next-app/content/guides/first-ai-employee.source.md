# Source brief: Build your 1st AI teammate

## Published route

- Slug: `first-ai-employee`
- Canonical route: `/guides/first-ai-employee.html`
- Level: Intermediate
- Hub: AI agents
- Outcomes: Build an agent, Automate a task

The route remains unchanged for SEO and compatibility. The published title and reader copy use `AI teammate` or `AI system`. The old phrase may appear only when correcting the idea that software is a person or an employee.

## Source files reviewed

- Existing Shift & Lead page snapshot: `main-site/guides/first-ai-employee.html` at commit `7888f03c0e83175d705503363f0dac6b09bf0ec8`
  - SHA-256: `dae593f72d838734c9e4ec7d99a077bd54b4f51e6325d504f0365871354da649`
- Editorial portfolio review: `shift-and-lead-guide-portfolio-review.xlsx`
  - SHA-256: `3f19ce36963d309c6df34c565fd1a9b06f25379468c6230a757ec11ca785c8bb`
- `first-ai-agent.json`
  - Source: `https://learnaiwithmariah.com/guides/first-ai-agent/`
  - SHA-256: `e652be039d303b168d7dc98dd6b01b8d95e853f63e72a272215f5227c3676181`
- `notion-agents.json`
  - Source: `https://learnaiwithmariah.com/guides/notion-agents/`
  - SHA-256: `b990fd654c31081a342b3aeb3b6369d50845b2e4d71089f7f6cb8440464ba779`
- `how-i-build-ai-agents.json`
  - Source: `https://learnaiwithmariah.com/guides/how-i-build-ai-agents/`
  - SHA-256: `ab511234fea89fce282a696d3e15e47f865cf97a30ee61339f9cdd644f818c1a`
- `agent-guardrails-template.json`
  - Source: `https://learnaiwithmariah.com/guides/agent-guardrails-template/`
  - SHA-256: `9555ea8a49a4771a174af90c10713d76a7ba07c620a008b09af5e04306d8eef5`
- `ai-agent-vs-workflow.json`
  - Source: `https://learnaiwithmariah.com/guides/ai-agent-vs-workflow/`
  - SHA-256: `6e5c49088660cc8a5180104aa51ae6588b0f410f5f664ef9fcd5c5bc14668510`
- `skill-workflow-agent.json`
  - Source: `https://learnaiwithmariah.com/guides/skill-workflow-agent/`
  - SHA-256: `22afdd8d1ea03023b70a52c1be027172ea77284ea61cb1aee334ae5d968cc6ea`

The creator pages and workbook are research inputs. Their sentences, bylines, product claims, setup instructions, performance claims and visual branding are not reused.

## Editorial decision

This is a job-design tutorial, not an agent feature tour. An AI teammate is a bounded AI system assigned to 1 repeatable job. It has no employment status, personhood or independent business authority. A named person still owns the result and every consequential decision.

Use the smallest system that fits the task. If every step can be written in advance, build a fixed workflow. Use an agent only when the next step genuinely depends on what the system finds. In both cases, the same job description, permissions and stop rules apply.

Never expand access to fix a bad instruction. Fix the instruction, example, rule or test. Access follows the job and never grows as a shortcut around a failed result.

## Full job-design method

The published tutorial preserves all 10 operating decisions:

1. Choose 1 repeatable job and name the business result.
2. Define the trigger, approved inputs, duplicate key and frequency, attempt, time and cost limits.
3. Specify the exact output and destination.
4. List the allowed tools and actions, then list the prohibited actions.
5. Grant minimum access and start read-only wherever possible.
6. Name the human owner and place approval immediately before a consequential action.
7. Stop when required data is missing, conflicting, sensitive or unclear.
8. Define the failure alert and a manual fallback.
9. Require completion evidence and a fixed status report.
10. Run a 30-day review before keeping, changing or expanding the system.

No system may send, publish, purchase, delete or change a lasting record without explicit human approval. A written instruction is not a substitute for a technical permission boundary.

## Shift & Lead worked example

The example is a failed guide-delivery monitor for Shift & Lead:

- Job: prepare failed guide deliveries for Fatiha's review.
- Trigger: a Lumail delivery changes to failed or the daily review starts.
- Inputs: guide ID, reader email, delivery status, timestamp, last attempt and error.
- Method: validate the guide mapping, prevent duplicates, group failures by reason and recommend a safe next step.
- Output: a review queue with the affected reader, guide, failure reason, source record and recommended next step.
- Permissions: read guide-delivery records and write only to the internal review queue.
- Prohibited actions: never send the guide, change the CRM, suppress a reader, invent an email address or retry indefinitely.
- Approval: Fatiha decides whether to resend, contact the reader, correct the mapping or stop.
- Stop: unknown guide, missing email, duplicate event, stale status, provider outage or permission error becomes a visible exception.
- Status: checked, ready for review, duplicates ignored, exceptions and unresolved items, plus why the run stopped.

## Practical and downloadable assets

- Inline asset: AI teammate job description worksheet.
- Download: `AI teammate job description`
- File: `/downloads/ai-teammate-job-description.pdf`
  - SHA-256: `598211257b6e10a8b2f34b02adbd265c112f2604bc0b6eed859bc1898be53008`
- Guide ID: `guide.first-ai-employee`
- Lumail tag: `guide_ai_teammate_job_description`
- Capture button: `Send me the job description`

The deliverable includes the job boundary, input and output specification, permission map, approval gate, stop and fallback rules, completion evidence, status report and 30-day review.

## Exactly 3 next guides

1. `what-is-agentic`
2. `inbox-manager-setup`
3. `24-7-operations-system`

## Artwork and publishing notes

- Final cover: `/images/guides/first-ai-employee.webp`
- Alt text: `The small blue robot mascot operating a role-design machine that produces approved task cards`
- Focal point: `95% center`
- Keep the title and creator signature as live HTML.
- The existing cover uses the exact small blue robot in a role-design metaphor. It does not depict a human employee or hiring scene.
- The Build Sprint may appear only after the complete method, worksheet, example and result check.

## Verification notes

- The named PDF must exist at the capture path before release.
- Tool permissions vary by provider. Confirm the exact connector scope used in the real build.
- Test a normal run, missing data, conflicting data, sensitive input, connector failure, alert failure and manual fallback.
- Do not expand access because an output is weak. Revise the specification and repeat the test with the same or narrower access.
