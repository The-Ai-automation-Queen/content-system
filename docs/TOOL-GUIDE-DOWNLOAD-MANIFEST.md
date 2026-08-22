# Tool guide download manifest

This manifest covers the AI tool chooser hub and its 10 full tool guides. It records the current page contract from each structured TS file and the delivery contract from `main-site/api/guide-capture-registry.json`.

## Audit rules

A mismatch is flagged when:

- the TS deliverable name or filename differs from the registry;
- a visible TS capture points to an inactive registry entry;
- the registered file is absent from `next-app/public/downloads`;
- an existing PDF contradicts the page testing model.

The TS semantic formats such as `worksheet` or `checklist` and the registry file format `PDF` describe different things and are not a mismatch.

## Delivery summary

| Slug | Exact deliverable name | Exact filename | Registry | File | Mismatch |
| --- | --- | --- | --- | --- | --- |
| `which-ai-tool-for-what` | 10-tool comparison scorecard | `10-tool-comparison-scorecard.pdf` | Active | Present | None. |
| `chatgpt` | ChatGPT 30-minute fit test | `chatgpt-30-minute-fit-test.pdf` | Active | Present | None. |
| `claude` | Claude document-work test | `claude-document-work-test.pdf` | Active | Present | None. |
| `gemini` | Gemini Workspace fit checklist | `gemini-workspace-fit-checklist.pdf` | Active | Present | None. |
| `copilot` | Copilot task and permission test | `copilot-task-and-permission-test.pdf` | Active | Present | None. |
| `grok` | Live signal verification checklist | `live-signal-verification-checklist.pdf` | Active | Present | None. |
| `meta-ai` | Meta AI safe-use card | `meta-ai-safe-use-card.pdf` | Active | Present | None. |
| `deepseek` | DeepSeek data and deployment checklist | `deepseek-data-and-deployment-checklist.pdf` | Active | Present | None. |
| `kimi` | Kimi long-file and coding test brief | `kimi-long-file-and-coding-test.pdf` | Active | Present | None. |
| `manus` | Manus task and permission map | `manus-task-and-permission-map.pdf` | Active | Present | None. |
| `mistral` | Private AI deployment requirements brief | `private-ai-deployment-requirements.pdf` | Active | Present | None. |

The TS and registry agree on all 11 deliverable names, filenames, guide IDs and Lumail tags.

## Page and download contracts

### `which-ai-tool-for-what`

- **Page testing model:** Choose 1 real job, split it into 3 repeatable tasks and run the same 3 tasks with the same inputs and quality check in every shortlisted tool. A tool must pass all 3 tasks. Keep 1 winner for 30 days and measure quality, time saved, cost and upkeep.
- **Required decision sections:** `Does the source material already live in 1 connected workspace?`; `Can you name whether the result must be an answer, an editable file or several completed steps?`; `Can the task use the tool without exposing restricted information or giving broad access?`; `Did the tool pass all 3 tasks in the same real job?`
- **Decision rule:** Keep the tool that produces the best checkable result with the least access and upkeep. Add another tool only when a different job has a clear gap.
- **Page CTA:** `Send me the scorecard`
- **Modal title:** `Get the 10-tool comparison scorecard`
- **Registry download CTA:** `Download the scorecard`
- **Mismatch:** None. The PDF title is `10-tool comparison scorecard` and it now tests the same 3-task job with the same inputs and quality checks.

### `chatgpt`

- **Page testing model:** Run 3 real tasks in 30 minutes, with 10 minutes each for a draft, file or data work and current research. Score useful time saved, correction effort, source quality and data fit.
- **Required worksheet fields:** `Task 1: draft`; `Task 2: file or data`; `Task 3: current research`; `Decision`.
- **Completion rule:** Produce 3 scored results and explain why ChatGPT is, or is not, right for the real work.
- **Page CTA:** `Send me the fit test`
- **Modal title:** `Get the ChatGPT 30-minute fit test`
- **Registry download CTA:** `Download the fit test`
- **Mismatch:** None.

### `claude`

- **Page testing model:** Use 3 short documents from 1 real project, ask 1 comparison question, verify 5 claims against the original files and turn the verified comparison into 1 useful output. Compare the evidence and repair time with another tool.
- **Required worksheet fields:** `Document set`; `Comparison question`; `Source check`; `Work test`.
- **Completion rule:** Show whether Claude preserved the source, found useful differences and saved enough review time to earn a place in the work.
- **Page CTA:** `Send me the document test`
- **Modal title:** `Get the Claude document-work test`
- **Registry download CTA:** `Download the document test`
- **Mismatch:** None.

### `gemini`

- **Page testing model:** Run 3 low-risk Google work tasks in Gmail, Docs or Drive and NotebookLM. Check source use, account access, unsupported claims, correction time and useful time saved. At least 2 of 3 tasks must produce supported results and save useful time.
- **Required checklist sections:** `Gmail`; `Docs or Drive`; `NotebookLM`; `Access check`; `Quality check`; `Decision`.
- **Completion rule:** Show that Gemini found the right Google context, supported the answer and saved useful time on at least 2 of the 3 tasks.
- **Page CTA:** `Send me the Workspace test`
- **Modal title:** `Get the Gemini Workspace fit checklist`
- **Registry download CTA:** `Download the checklist`
- **Mismatch:** None.

### `copilot`

- **Page testing model:** Give 1 representative signed-in user 3 low-risk tasks in Outlook, Teams and Microsoft files. The work passes only when at least 2 tasks save useful time, every important result is checked and no unexplained access remains.
- **Required worksheet fields:** `Outlook task`; `Teams task`; `File task`; `Permission decision`.
- **Completion rule:** At least 2 tasks save useful time, every important result has been checked and no unexplained access remains open.
- **Page CTA:** `Send me the permission test`
- **Modal title:** `Get the Copilot task and permission test`
- **Registry download CTA:** `Download the permission test`
- **Mismatch:** None.

### `grok`

- **Page testing model:** Take 1 live claim or trend, open the original and earliest source, classify it, find 1 independent primary source, look for evidence that would prove it false and write only the narrowest statement the evidence supports.
- **Required checklist sections:** Original post, account and full thread; item classification; earliest source; 1 independent primary source; falsifying evidence; narrowest supported statement or rejection.
- **Completion rule:** Open the original evidence, explain its limits and keep the statement inside what the evidence proves.
- **Page CTA:** `Send me the signal check`
- **Modal title:** `Get the live signal verification checklist`
- **Registry download CTA:** `Download the checklist`
- **Mismatch:** None.

### `meta-ai`

- **Page testing model:** Apply a safe-to-share gate to both the input and expected output before using Meta AI. Continue only with public or test-only information, no restricted business data, a human review and content that would be safe in a public screenshot.
- **Required decision sections:** `Is every input already public or created only for this test?`; `Does the input contain customer, employee, financial, contract or login information?`; `Can a person check the result before it is sent or published?`; `Would you be comfortable if the prompt appeared in a public screenshot?`
- **Decision rule:** Use Meta AI only when the information is safe to share, the result is easy to check and the task does not need controlled business access.
- **Page CTA:** `Send me the safe-use card`
- **Modal title:** `Get the Meta AI safe-use card`
- **Registry download CTA:** `Download the safe-use card`
- **Mismatch:** None.

### `deepseek`

- **Page testing model:** Define and approve 1 exact DeepSeek setup, not the provider name in general. Document the hosted service or model release, terms, licence, full data path, requirements and owners. Run 1 non-sensitive task against the current tool before approving, restricting or rejecting the setup.
- **Required checklist sections:** Exact service, endpoint, host or model release; current terms and licences; inputs, outputs, logs, backups and retention; contract, privacy, security and location requirements; named operational owners; non-sensitive comparison test; approve, restrict or reject decision.
- **Completion rule:** Document the exact deployment, licence, data path, owner and test result, then obtain approval from an authorized person.
- **Page CTA:** `Send me the data checklist`
- **Modal title:** `Get the DeepSeek data and deployment checklist`
- **Registry download CTA:** `Download the checklist`
- **Mismatch:** None.

### `kimi`

- **Page testing model:** Choose 1 known long-file or solved code task. Run it in Kimi and 1 current tool with identical inputs and limits. Keep Kimi only if it solves a named gap with less correction and acceptable access and maintenance.
- **Required worksheet fields:** `Known task and finish line`; `Allowed sources and access`; `Kimi result`; `Comparison result`.
- **Completion rule:** Kimi solves a named gap better than the current tool with acceptable access, correction work and maintenance. Otherwise do not add it.
- **Page CTA:** `Send me the Kimi test`
- **Modal title:** `Get the Kimi long-file and coding test brief`
- **Registry download CTA:** `Download the test brief`
- **Mismatch:** None.

### `manus`

- **Page testing model:** Define 1 bounded task before the agent runs. Write the finish line, every allowed site, file, account and action, the approval point, logging and cost limit, stop condition and rollback. Use the smallest reversible test environment.
- **Required decision sections:** `Can you describe the finished result and how a person will check it?`; `Can you name every site, file, account and action the task needs?`; `Could an action send, publish, buy, delete or change a lasting record?`; `Can you undo the action and restore the previous state?`
- **Decision rule:** Run only when the finish line, access, approval, log, cost limit, stop condition and rollback are all written.
- **Page CTA:** `Send me the permission map`
- **Modal title:** `Get the Manus task and permission map`
- **Registry download CTA:** `Download the permission map`
- **Mismatch:** None.

### `mistral`

- **Page testing model:** Write the private AI requirements before selecting a vendor or model. Give every mandatory requirement an owner, evidence and a test. Compare the complete Mistral option with 1 simpler hosted option.
- **Required worksheet fields:** `Business task and result`; `Data and location`; `Deployment and integration`; `Model and licence`; `People and operations`; `Decision test`.
- **Completion rule:** Approve the mandatory requirements, evidence, owners and comparison before purchasing the model or deployment.
- **Page CTA:** `Send me the deployment brief`
- **Modal title:** `Get the private AI deployment requirements brief`
- **Registry download CTA:** `Download the requirements brief`
- **Mismatch:** None.

## Delivery status

All 11 registry entries are active and all 11 exact PDF filenames are present in `next-app/public/downloads`. The page contracts, registry metadata and filenames align. The guide-library validator and capture endpoint tests pass.
