---
kitchen: ChatGPT
tagline: You hear AI names everywhere and never know which does what. This is the one that walks you through the door, the kitchen, and the plate.
---

## Starters (4) - first wins, 5 minutes each

### S1. The five minute business triage
PROMPT:
```
Act as an operations consultant. I run a small business and I want a fast triage of where I'm losing time.

Ask me one question at a time, in this order:
1. What are the 5 tasks I do most often in a working week?
2. Which of those 5 feel repetitive or boring?
3. Which ones need a judgment call only I can make?

Once I've answered all three, give me:
- A short list of the tasks that are safe to hand to an AI tool starting this week
- A short list of the tasks that still need me
- One task to try automating first, and why that one

Keep the tone plain and direct. No jargon.
```
WHEN: First session with ChatGPT, before you've decided what to actually use it for.

### S2. The meeting notes to next steps converter
PROMPT:
```
I'm going to paste rough notes from a meeting. Turn them into:
1. A 3 to 5 line summary of what was discussed
2. A clear list of decisions made (if any)
3. A list of action items, each with: what, who (use [Name] if I haven't said), and by when (use [Date] if no date was given)

If something in my notes is ambiguous, flag it as "NEEDS CLARIFICATION" instead of guessing.

Here are the notes:
[Paste your rough meeting notes here, with any client or company names replaced by [Client] or [Company]]
```
WHEN: Right after any internal or client meeting, while it's still fresh.

### S3. The inbox reply in your voice
PROMPT:
```
Here is an email I need to reply to. Write me a first draft reply.

Rules:
- Match a warm, direct, professional tone. Short sentences.
- No corporate filler like "I hope this email finds you well."
- If the email asks for something I can't confirm (price, date, availability), leave a placeholder like [confirm availability] instead of inventing an answer.
- End with a clear next step, not a vague "let me know."

The email:
[Paste the email, with sender name replaced by [Client] and any account numbers or personal details removed]

My reply should cover these points:
[List the 2 to 3 things you actually want to say]
```
WHEN: Clearing a backlog of client or partner emails without losing your voice.

### S4. The custom instructions setup
PROMPT:
```
Help me write my ChatGPT Custom Instructions so every future conversation already knows who I am.

Ask me these questions one at a time:
1. What's my role and what kind of business do I run? (describe in general terms, no company name needed)
2. Who do I usually write for: clients, my team, or myself?
3. What tone do I want by default: formal, warm, blunt, playful?
4. What should ChatGPT never do when replying to me? (e.g. never use em-dashes, never invent numbers, never assume I want a long answer)

Once I've answered, write two short paragraphs:
- One for "What would you like ChatGPT to know about you?"
- One for "How would you like ChatGPT to respond?"

Keep both under 1500 characters each, since that's the field limit.
```
WHEN: Once, at the very start, so every later chat starts warmer.

## Mains (6) - real business work

### M1. The client proposal first draft
PROMPT:
```
Act as a business writer helping me draft a client proposal.

Here's what I need to cover:
- Client's situation: [describe the problem in general terms, no company name]
- What I'm proposing to do: [describe the service or project]
- Rough timeline: [e.g. "about 6 weeks"]
- Rough investment: [e.g. "around [rounded number]"]

Write a proposal with these sections: Situation, What I'll Do, Timeline, Investment, Why Me. Keep it to one page. Plain English, no filler, no made-up case studies or client names. If I haven't given you enough detail for a section, write [ADD DETAIL] instead of inventing something.
```
WHEN: Turning a verbal agreement into a document a client can actually sign off on.

### M2. The document analyzer using Canvas
PROMPT:
```
I'm going to upload a document (a contract, a report, or a long policy). Open it in Canvas so we can work on it together.

First, give me:
1. A 5 bullet summary of what it actually says
2. Any clauses, numbers, or terms that seem unusual or worth double-checking
3. Plain English translations of the 3 most confusing sections

Then wait for me. I'll tell you which section to rewrite, shorten, or challenge, and we'll edit it together in Canvas rather than you rewriting the whole thing at once.

[Attach or paste the document, with names, account numbers, and identifying details replaced by [Client], [Company], or [rounded number]]
```
WHEN: Reviewing a contract or long report where you want to edit sections, not just read a summary.

### M3. The spreadsheet to chart in one pass
PROMPT:
```
I'm uploading a spreadsheet of business numbers (sales, expenses, or usage, whichever I attach). Use Code Interpreter to:

1. Tell me what columns you found and what each seems to represent
2. Build 2 charts that would actually help me make a decision (you choose the chart type, explain why)
3. Point out the single most surprising or important number in the data
4. Give me one plain English sentence I could say to a business partner about what this data means

If any column headers or values look like personal or client-identifying data, tell me before you chart anything so I can decide whether to redact it first.
```
WHEN: You have a spreadsheet and 10 minutes, and want the story behind the numbers, not just the numbers.

### M4. The competitor scan with Deep Research
PROMPT:
```
Use Deep Research to build me a briefing on [industry or niche, e.g. "boutique fitness studios" or "B2B invoicing software for freelancers"].

I want:
1. Who the 5 to 8 most visible players are right now
2. What they seem to be charging (rounded ranges are fine)
3. What complaint or gap shows up more than once across reviews or forums
4. One opportunity that looks underserved

Cite your sources. If you can't verify a claim from an actual source, say so instead of presenting it as fact.
```
WHEN: Before you price a new offer or enter a market, when you want real research instead of a guess.

### M5. The one page marketing plan
PROMPT:
```
Act as a marketing advisor for a small business. Ask me these questions one at a time before writing anything:

1. What do I sell and who buys it? (describe in general terms)
2. What's my rough monthly budget for marketing? (rounded number, e.g. "around [rounded number]")
3. What have I already tried, and what happened?
4. How many hours a week can I realistically spend on marketing?

Once I've answered, give me a one page plan with: 3 channels to focus on (and why, given my budget and hours), 1 thing to stop doing, and a simple way to know in 30 days if it worked.

No jargon. No channel I can't realistically run myself or with 1 helper.
```
WHEN: You need a plan you can actually execute this month, not a 40 page strategy deck.

### M6. The multi-step task handed to Agent Mode
PROMPT:
```
Use Agent Mode to complete this task for me:

[Describe a concrete, multi-step task Agent Mode can actually do in a browser, e.g. "Go to [website] and check the current price for [product], then compare it against [website 2] and [website 3], and give me a table" or "Fill out [specific public form] with the following details: [list only non-sensitive placeholder details]"]

Before you take any action that submits information, creates an account, or spends money, stop and ask me to confirm first. Show me what you found or did at each major step, not just the final result.
```
WHEN: A real multi-step errand online (price checks, form filling, comparisons) that would normally cost you 20 minutes of tab-switching.

## Chef's Specials (3) - only this kitchen can cook these

### C1. The Canvas and Code Interpreter tag team
PROMPT:
```
I want to build a simple client-facing report. Here's the situation:

- Data source: [describe what you're uploading, e.g. "a spreadsheet of monthly sales by product"]
- Who it's for: [e.g. "a client update" or "my own monthly review"]
- What decision it should support: [e.g. "whether to discontinue a product line"]

Step 1: Use Code Interpreter to analyze the data and build the 2 most relevant charts.
Step 2: Open a new Canvas and draft a one page written summary that references those charts, written for a reader with no data background.
Step 3: Wait for my edits. I'll tell you which sentences to cut, which chart to swap, and we'll refine the Canvas draft together rather than starting over each time.

Replace any names or account details in the data with [Client] or [rounded number] before you present anything back to me.
```
WHEN: You want the analysis and the polished writeup in the same session, so nothing gets lost translating between them.

### C2. The Deep Research pricing sanity check
PROMPT:
```
Use Deep Research to sanity check a price I'm considering.

Here's my offer: [describe what you're selling in one or two sentences, no client names]
The price I'm considering: around [rounded number]
Who I think it's for: [describe the buyer in general terms]

Find out:
1. What similar offers actually charge (cite sources, rounded ranges are fine)
2. Whether my price sits above, below, or in line with the market
3. One argument for charging more, and one honest reason I might be charging too much

Don't just agree with my number to be polite. If the research says I'm off, tell me plainly and explain why.
```
WHEN: Before you publish a price, when you want outside evidence instead of a gut feeling.

### C3. The connector powered weekly digest
PROMPT:
```
Using the connectors I've enabled (for example Gmail, Google Drive, or Slack, whichever apply), pull together a weekly digest for me covering:

1. Anything that looks like it needs a reply from me and has been sitting more than 2 days
2. Any document that was shared with me this week that I haven't opened
3. A short list of what seems to be waiting on other people, so I know what NOT to chase yet

Summarize in plain sentences, not raw message dumps. Replace any names other than mine with [Contact] or [Client] in the summary you show me. If a connector isn't available or I haven't set one up, tell me instead of guessing at the contents.
```
WHEN: Monday morning, before you open five apps separately to find out what actually needs you.

## Verify (2) - make it prove its work

### V1. The hallucination check on anything cited
PROMPT:
```
Look back at your last answer. For every fact, statistic, or claim you gave me:

1. Tell me whether you actually verified it (via Deep Research, browsing, or an uploaded document) or whether you generated it from general knowledge
2. For anything you generated rather than verified, mark it clearly as "UNVERIFIED"
3. For any source, name, or citation you gave me, confirm whether it's real and checkable, or tell me plainly if you're not fully sure it exists

I would rather see "I'm not sure" than a confident answer that turns out to be invented.
```
WHEN: Right after any answer with numbers, citations, or specific claims you plan to repeat to someone else.

### V2. The sycophancy stress test
PROMPT:
```
I want you to critique the plan I just described, not encourage it.

Specifically:
1. What is the single weakest assumption in what I proposed?
2. If this fails, what is the most likely reason?
3. Is there a simpler or cheaper way to test this before committing fully?

Don't soften this to spare my feelings, and don't tell me it's "a great start" if it isn't. If the plan is genuinely solid, say so plainly, but back it up with a specific reason rather than general praise.
```
WHEN: Before you commit budget, time, or a client relationship to a plan ChatGPT helped you build.

The full verification system lives in The Judge's Prompts.
