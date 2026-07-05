---
kitchen: DeepSeek
tagline: The kitchen that cooks the same quality dish for a fraction of the bill.
---

## Starters (4) - first wins, 5 minutes each

### S1. The free first order
PROMPT:
```
I'm going to give you a real task, not a test question. Before you start,
tell me in one line: should I be using V4 Flash or V4 Pro for this, and
should thinking mode be on or off? Then do the task with that setup.

Task: [describe the task in 2-3 sentences, rounded numbers only, no names
or account details, e.g. "draft a follow-up email for a client proposal
worth about [10] thousand, they went quiet after [2] weeks"]
```
WHEN: The very first thing to run in chat.deepseek.com, so you learn which chef to call next time instead of guessing.

### S2. The cost-check habit
PROMPT:
```
Before you answer, estimate roughly how long your response will be and
whether this task actually needs your strongest reasoning mode or would
run just as well on the fast, cheap setting. Tell me your estimate in one
line, then answer.

Task: [paste the task, redact any client name to [Client], round any
number, remove account numbers or emails]
```
WHEN: Use this on routine requests (a quick draft, a short summary) so you build the habit of matching effort to the job instead of defaulting to the expensive setting out of habit.

### S3. The bilingual draft
PROMPT:
```
Write this once in English, then write a second version in Chinese that a
native speaker would actually say, not a direct translation. Flag any
line where the two versions carry a different tone.

Content: [paste the message or post with real names swapped for [Client]/
[Vendor] and any figure rounded, e.g. "a short note to [Vendor] about a
delayed shipment worth about [5k], keep it polite but firm"]
```
WHEN: Any time you're writing for a bilingual audience or a supplier relationship, DeepSeek's EN/ZH strength does real work here that most other kitchens fake with a translation pass.

### S4. The document opener
PROMPT:
```
I'm uploading a document. First, tell me its length and structure in 3
bullets so I know you've actually read it. Then wait for my real question,
don't summarize yet.

Document: [upload the file, redact names, account numbers, and signatures
before uploading, e.g. replace "Acme Corp" with "[Client]" and any dollar
figure with a rounded placeholder like "[about 50k]"]
```
WHEN: The first move on any file over a few pages, so you confirm the 1M-word context actually caught the whole thing before you trust its answers.

## Mains (6) - real business work

### M1. The contract read
PROMPT:
```
Read this contract end to end. Give me three sections: (1) the 5 clauses
that actually matter to me as the [buyer/seller], in plain English, (2)
anything unusual compared to a standard version of this kind of contract,
(3) the 3 questions I should ask before signing. Use rounded figures only
when you quote numbers back to me, and never repeat account or routing
numbers even if they appear in the file.

Contract: [upload the file with names replaced by [Client]/[Vendor], and
any bank details blacked out before upload]
```
WHEN: Any contract, lease, or vendor agreement long enough that reading it yourself would eat an hour, this is where the 1M context earns its keep.

### M2. The client update, redacted by default
PROMPT:
```
Draft a status update email to a client. Use [Client] for their name and
[Me] for mine throughout, and round every number mentioned (budget,
timeline, hours) to the nearest sensible figure. Tone: warm but factual,
no filler sentences, 3 short paragraphs max.

Details: [what's done, what's next, any blocker, e.g. "phase 1 finished
about [2] weeks early, phase 2 starts [Monday], one blocker: waiting on
their sign-off"]
```
WHEN: Weekly or milestone client emails where you want a fast, cheap draft you can personalize in 30 seconds before sending, never paste the client's actual name or invoice numbers into the prompt itself.

### M3. The multi-file cross-check
PROMPT:
```
I'm uploading several files that should agree with each other (a proposal,
an invoice, and a contract, for example). Read all of them and tell me
anywhere they contradict each other on price, dates, or scope. List each
mismatch as: what document A says, what document B says, and which one
looks like the error.

Files: [upload 2-4 documents, all names and figures redacted to
[Client]/rounded numbers before upload]
```
WHEN: Before sending anything out the door where three documents need to tell the same story, catching a mismatch here costs nothing; catching it after signature costs a client.

### M4. The planning session, thinking mode on
PROMPT:
```
Turn thinking mode on for this one. I have a decision to make with several
moving parts. Walk through your reasoning step by step, out loud, not just
the final answer, then give me a recommendation and the one assumption
that would change it if it's wrong.

Decision: [describe the situation in plain terms, rounded numbers, no
real names, e.g. "choosing between two vendors, one is [15]% cheaper but
slower, the other costs more but the client needs delivery in [3] weeks"]
```
WHEN: A real decision with tradeoffs, not a quick fact lookup, this is what the "chef plans before cooking" toggle is actually for.

### M5. The coding task, signature dish
PROMPT:
```
Here's a bug/feature request. Before writing code, tell me your plan in 3
bullets. Then write the code with comments explaining any non-obvious
choice, and a short list of what you'd test to confirm it works. Strip any
real API keys, tokens, or credentials from what you paste me back, use
[API_KEY] as a placeholder if one appears in context.

Code + context: [paste the relevant code and the problem, remove
credentials, internal URLs, and customer data before pasting]
```
WHEN: This is the dish DeepSeek is famous for, GPT-class coding quality at a fraction of the price, use it for real bugs and refactors, not toy examples.

### M6. The long-document digest for a meeting
PROMPT:
```
Read this document and produce a one-page brief I could hand someone
before a meeting: 5 key points, 3 open questions, and 1 recommended
position to walk in with. Keep names as [Client]/[Vendor] and round every
figure you mention.

Document: [upload the report or thread, redacted before upload]
```
WHEN: Prepping for a call where the backing document is long but the meeting is short, turns an hour of reading into a page you can skim on the way in.

## Chef's Specials (3) - only this kitchen can cook these

### C1. The self-host data-control check
PROMPT:
```
I'm deciding whether this task needs to stay on hosted chat or should wait
until I can run it on a self-hosted setup. Tell me plainly: does what I'm
about to paste you contain anything (client identity, financial detail,
regulated data) that shouldn't leave my own infrastructure? Answer yes or
no first, then explain why in one line.

What I'm about to paste: [describe it in general terms with names already
swapped for [Client] and figures rounded, don't paste the actual sensitive
content into this check, e.g. "a spreadsheet with [Client] names and
contract values around [rounded numbers]"]
```
WHEN: Before you paste anything remotely sensitive into the hosted product, since hosted chat and API both process data in China. This prompt is the pause button, use it before the real prompt, not instead of it.

### C2. The cheap-model relay
PROMPT:
```
Do this task on the fast, cheap setting first and show me the result.
Then tell me honestly: would switching to the stronger reasoning mode
change the answer in any meaningful way, or is this result already good
enough to use? If it would change, explain what specifically would
improve.

Task: [paste the task, redacted, rounded numbers]
```
WHEN: Whenever you're not sure if a task is worth the upgrade, this makes the chef itself justify the extra cost instead of you guessing, and it works because the price gap between the two chefs here is large enough to actually matter.

### C3. The community fine-tune scout
PROMPT:
```
I work in [industry, e.g. "legal" or "logistics"]. Tell me what a
domain-specialized version of you would likely handle better than the
general model for my kind of work, and what specific terminology or
document type I should test it on first if I go looking for a fine-tuned
variant. Don't invent a specific model name, just describe what to look
for.

My work in one line: [describe your role/industry generally, no client
names or case details]
```
WHEN: When general-purpose answers keep missing industry-specific nuance, this tells you whether it's worth hunting down one of the thousands of community fine-tunes before you go looking.

## Verify (2) - make it prove its work

### V1. The reasoning replay
PROMPT:
```
Show me the reasoning steps you actually used to reach that answer, not a
cleaned-up version after the fact. If any step was a guess rather than
something stated in the source material, mark it clearly as a guess.
```
WHEN: Right after any answer built on an uploaded document or a multi-step decision, so you can tell what came from the source and what got filled in.

### V2. The confidence audit
PROMPT:
```
Go back through your last answer and mark every claim as one of three
things: confirmed by the source I gave you, general knowledge you're
confident in, or a guess you made to fill a gap. Don't soften this, if
something was a guess, call it a guess.
```
WHEN: Before you send anything client-facing or act on a recommendation, this catches confabulation and overconfidence before they cost you something. The full verification system lives in The Judge's Prompts.
