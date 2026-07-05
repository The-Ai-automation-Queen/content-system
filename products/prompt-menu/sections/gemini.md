---
kitchen: Gemini
tagline: Same chef, different service. The skill is knowing which counter to order at.
---

## Starters (4) - first wins, 5 minutes each

### S1. The five-way comparison
PROMPT:
```
I need to choose between five options for [decision, e.g. "project management tools for a 5-person team"]. Use Search grounding to research current information on each of these: [Option A], [Option B], [Option C], [Option D], [Option E].

For each one, give me:
- What it actually does, in plain English
- Price at the tier I'd realistically need (rounded numbers, not exact quotes)
- The one thing it's best at
- The one thing that would make me regret picking it

End with a single recommendation for a business my size ([rounded number] people, [rounded budget] per month) and explain the reasoning in 3 sentences.
```
WHEN: Anytime you're stuck between options and would otherwise open eight tabs and give up.

### S2. The inbox-to-brief rewrite
PROMPT:
```
Here's a messy email thread I need to turn into a clean action brief. I'm going to paste the thread below with names replaced by [Client] or [Colleague] and any numbers rounded.

[paste the redacted thread]

Give me back:
1. What's actually being asked of me, in one sentence
2. Every deadline mentioned, listed in date order
3. A 3-sentence reply I could send right now
4. Anything in the thread that contradicts something earlier in the thread
```
WHEN: A reply-all chain has spiraled and you need the actual ask, not the noise.

### S3. The document first pass
PROMPT:
```
I'm pasting a document below (a draft, a contract section, or a report). Read the whole thing before answering.

[paste document, with any client names as [Client] and financial figures rounded]

Give me:
- A 5-line summary a busy person could read in 20 seconds
- The 3 weakest sentences and why they're weak
- One question I should ask before this goes out the door
```
WHEN: You need a second pair of eyes on something before it leaves your inbox, fast.

### S4. The meeting-notes cleanup
PROMPT:
```
Below are my raw, messy notes from a call with [Client]. Clean them into a structured recap I can send.

[paste raw notes, names as [Client]/[Attendee], numbers rounded]

Format as:
- Attendees and date
- Decisions made (bullet list)
- Open questions (bullet list)
- Next steps with an owner for each one, even if the owner is just "me"
```
WHEN: Right after any call, while the notes are still fresh but too messy to send as-is.

## Mains (6) - real business work

### M1. The long-document analyst
PROMPT:
```
I'm going to paste a long document below (up to a full report, transcript, or set of contracts). I need you to hold the whole thing in mind while I ask questions, not just skim the start.

[paste the full document, with [Client]/[Vendor] names and rounded figures]

First, confirm you've read the entire thing by giving me a one-paragraph summary that references something from the very end of the document, not just the start.

Then wait for my questions about specific sections.
```
WHEN: You've got something too long to read properly yourself and need to interrogate it section by section.

### M2. The Deep Research market scan
PROMPT:
```
Run a deep research pass on [market, e.g. "AI scheduling tools for solo consultants"]. I need this for a real decision, not a surface skim.

Cover:
1. The 5 to 8 real players in this space right now
2. What each one charges (rounded to nearest $5 or $10)
3. Where the actual gaps are, things nobody in this space does well
4. Whether this looks crowded or genuinely open

Hand it back as a structured report I could forward to [Colleague] without editing.
```
WHEN: You need a real market picture before building, pitching, or pricing something, not just a gut feeling.

### M3. The client proposal builder
PROMPT:
```
I'm building a proposal for [Client], a [industry] business with roughly [rounded number] employees. The problem they want solved is [one-line problem].

Draft a one-page proposal with:
- The problem, stated back to them in their own language
- What I'd actually do, in 3 to 5 steps
- Timeline in weeks, not exact dates
- Price framed as a range (rounded), not one number
- One line of risk reversal (what happens if it doesn't work)

Keep it in plain English. No jargon, no hype, no exclamation points.
```
WHEN: A prospect said yes to a call and now you need the follow-up document within the hour.

### M4. The quarterly plan in one sitting
PROMPT:
```
Help me build a 90-day plan for [Business/Client], working from these rough inputs:
- Current state: [2 to 3 lines, rounded numbers]
- The one goal that matters most: [goal]
- Hours available per week: [rounded number]

Structure it as three 30-day blocks. Each block gets: the one priority, 3 concrete actions, and one number I'll check at the end of the block to know if it worked.

Push back if the goal and the hours available don't match. Don't just agree with me.
```
WHEN: Planning season, or any time a goal needs breaking into weeks instead of staying a wish.

### M5. The Workspace-native rewrite
PROMPT:
```
I'm working inside [Docs/Sheets/Gmail] on [what the document is, e.g. "a client-facing report" or "a cold outreach draft"]. Rewrite what's on the page right now to be:
- Shorter, cut by roughly a third
- Plain English, no jargon
- One clear next action at the end

Keep it in place in the document rather than starting a new one, and show me what changed versus what I had before.
```
WHEN: You're already inside Docs, Sheets, or Gmail and don't want to lose the thread by switching tools.

### M6. The Canvas working draft
PROMPT:
```
Open a working draft with me for [type of document, e.g. "a one-page client-facing service menu"]. Start with a rough structure, then I'll tell you what to change section by section as we go, the way I'd mark up a paper draft.

Begin with just the skeleton: headings and one line under each saying what goes there. Wait for me before writing full paragraphs.
```
WHEN: Building something collaboratively over 20 minutes, where you want to steer section by section instead of getting one big draft to fix afterward.

## Chef's Specials (3) - only this kitchen can cook these

### C1. The Gem, built once
PROMPT:
```
Set yourself up as a standing Gem called "[Name, e.g. Weekly Client Briefing]" with these saved instructions:

Role: [one line, e.g. "You summarize my week's client activity into a Monday-morning briefing"]
Always do: [2 to 3 standing rules, e.g. "round all figures, flag anything overdue, keep it under 200 words"]
Never do: [1 to 2 hard boundaries, e.g. "never invent a number you weren't given"]

Confirm the role back to me in your own words, then wait for me to feed you this week's inputs.
```
WHEN: Any task you'll repeat weekly or monthly, so the setup only happens once and every future order already knows the job.

### C2. The NotebookLM source briefing
PROMPT:
```
I'm uploading [rounded number] source documents about [topic, e.g. "our onboarding process" or "this client's industry"]. Treat these as the only truth, don't pull in outside information.

Give me:
1. A summary of what these sources actually say, cross-referenced against each other
2. Any place two sources disagree
3. Three questions I should be ready to answer that these sources don't cover

Then let me ask follow-up questions against just these sources.
```
WHEN: You've got a pile of PDFs, transcripts, or research and need answers grounded only in what you actually gave it, not general web knowledge.

### C3. The multi-modal audit
PROMPT:
```
I'm giving you [a screenshot / an image / an audio clip / a short video] of [what it shows, e.g. "our current landing page" or "a client walkthrough recording"].

Look at (or listen to) the whole thing, then tell me:
- What's actually there, described plainly
- The single biggest thing you'd change first, and why
- One thing that's working well enough to leave alone

Keep the tone like a colleague giving feedback, not a grading rubric.
```
WHEN: You've got something visual or spoken to review and typing a description yourself would take longer than just handing it over.

## Verify (2) - make it prove its work

### V1. The disagree-with-me check
PROMPT:
```
Before I trust this, argue against your own answer. Take the response you just gave me about [topic] and find the 3 strongest reasons it could be wrong or incomplete. Don't soften them. If you genuinely can't find a weak point, say so and explain why you're confident instead of just agreeing with yourself.
```
WHEN: Anytime the answer sounds too smooth, or matters enough that a "yes-chef" response isn't good enough.

### V2. The grounded-fact check
PROMPT:
```
Go back through your last answer about [topic] and flag every specific claim, number, or fact. For each one, tell me: is this something you found via Search grounding just now, or something from general training that could be outdated? Mark each claim as "checked live" or "unverified" so I know exactly what to double-check myself before I use it.
```
WHEN: The output has specific numbers, dates, or claims in it and you're about to put your name behind it.

The full verification system lives in The Judge's Prompts.
