# Source brief: What AI agents actually do

## Guide contract

- Route: `/guides/what-is-agentic.html`
- Level: Beginner
- Hub: AI agents
- Outcomes: Understand AI, Build an agent
- Composition: Compact decision guide
- Deliverable: `Workflow or agent? decision card`
- Capture guide slug: `what-is-agentic`
- Capture guide ID: `guide.what-is-agentic`
- Lumail tag: `guide_agent_or_workflow_card`
- Download: `/downloads/workflow-or-agent-decision-card.pdf`
- Next guides: `first-ai-employee`, `manus`, `24-7-operations-system`

## Sources reviewed

| Local source | Source URL | Retained contribution |
| --- | --- | --- |
| Git commit `cc5412d`, path `main-site/guides/what-is-agentic.html`, SHA-256 `cb425f3f4a7e7bc3dd7a977d8ffa27d18878929f176e8bbd530dffaf9ec4c9a6` | `https://www.shiftandlead.com/guides/what-is-agentic.html` | Immutable legacy source for the chatbot-versus-agent distinction, autonomy ladder, permissions, approval and reversible early actions |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/ai-agent-vs-workflow.json` | `https://learnaiwithmariah.com/guides/ai-agent-vs-workflow/` | Workflow when the path is known, agent when the next step depends on what it finds |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/skill-workflow-agent.json` | `https://learnaiwithmariah.com/guides/skill-workflow-agent/` | Use the smallest system that fits the task and do not buy autonomy for fixed work |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/first-ai-agent.json` | `https://learnaiwithmariah.com/guides/first-ai-agent/` | Agent takes a goal, uses tools and works through several steps |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/how-i-build-ai-agents.json` | `https://learnaiwithmariah.com/guides/how-i-build-ai-agents/` | Context, connections, repeatable processes and memory as the deeper build model |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/notion-agents.json` | `https://learnaiwithmariah.com/guides/notion-agents/` | Triggers, explicit access, manual tests, activity logs and gradual permission increases |
| `/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/src/data/guide-details/agent-guardrails-template.json` | `https://learnaiwithmariah.com/guides/agent-guardrails-template/` | Measurable results, narrow scope, reversible steps, run limits, logs and stop conditions |

## Retained

- A chatbot returns an answer and waits.
- A workflow follows a path people set before the run.
- An agent chooses its next step based on what it finds and may use connected tools.
- Known steps should stay a workflow because that is more predictable and easier to test.
- More autonomy requires narrower permissions, clear approval points, logs, reversibility and stop conditions.
- Technical access limits are stronger than a written instruction asking the agent not to act.

## Excluded

- Product setup instructions, prices, model names and feature claims that can change.
- Claims that agents run a whole business or replace a person.
- Technical file structures, code examples and tool-specific implementation steps. The `first-ai-employee` guide owns the practical build.
- The extra skill comparison. It is useful in the later hub, but it would distract this Beginner guide from the agent-versus-workflow decision.
- Source creator stories, slogans, metaphors and examples.

## Shift & Lead transformation

The guide is reduced to 4 levels of action: chatbot, workflow, agent with approval and agent with delegated action. The Shift & Lead example sits inside the approval level, where it proves the decision instead of creating another standalone section. Guide capture and delivery stay a fixed workflow. An unusual reader reply may be prepared by an agent, but a person approves it before send.

The practical decision card asks 4 questions about fixed steps, minimum access, consequence and reversibility. It ends with the operating rule: start with a workflow when the steps are known, then use draft-only or approval mode before any agent acts.

## Publication checks

- Confirm the hero art keeps the agent progression visible on desktop and mobile.
- Confirm `/downloads/workflow-or-agent-decision-card.pdf` exists.
- Confirm capture maps `what-is-agentic` and `guide.what-is-agentic` to `guide_agent_or_workflow_card`.
- Confirm the immediate download, email delivery and failure state.
- Confirm `first-ai-employee`, `manus` and `24-7-operations-system` resolve.
- Test that the related guides follow the decision tool directly, with no repeated result or closing section.
