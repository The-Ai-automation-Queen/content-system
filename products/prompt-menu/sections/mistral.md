---
kitchen: Mistral
tagline: The fastest kitchen in Paris, EU-only ingredients, no telemetry on request.
---

## Starters (4) - first wins, 5 minutes each

### S1. The one-thread translation run
PROMPT:
```
I need the same message in three languages, staying in this one thread so
tone carries over consistently. Here's the source, in English:

"[Paste your message, 1 paragraph max. Example: a client update, redacted:
'Hi [Client], the [rounded number]-day rollout is on track. We'll confirm
the go-live date by [date].']"

Give me:
1. A German version written the way a German native would actually write
   it, not a literal translation
2. A French version, same rule
3. A Brazilian Portuguese version, same rule

After each one, flag anything that reads stiff or too literal so I know
what to double-check.
```
WHEN: You need one message to land naturally in more than one language, fast, without opening three separate tools.

### S2. The daily brief, no throttle
PROMPT:
```
Give me a 5-bullet brief on [topic, e.g. "changes to EU data protection
rules this month"]. Rules:
- Each bullet is one sentence, plain language, no jargon
- End with one line: what I should actually do differently because of this
- If you're not sure something is current, say so instead of guessing
```
WHEN: A fast, no-nonsense daily or weekly briefing you can read in under a minute, using the free tier's instant response speed.

### S3. The redaction-first document check
PROMPT:
```
I'm about to paste a document summary. Before I do, confirm: are you
running in a mode where this content won't be used for training? If you
can't confirm that, tell me now so I can adjust what I share.

Once confirmed, here's what I need checked: [describe the check, e.g.
"does this match our standard contract terms for a [rounded number]-month
engagement?"]. I've already replaced names with [Client] and [Me] and
rounded all numbers.
```
WHEN: Any time you're about to hand over document content and want the privacy question answered before you paste anything sensitive.

### S4. The multilingual meeting recap
PROMPT:
```
Here's a rough recap of a meeting, in English, already redacted (names
replaced with [Client]/[Me], numbers rounded):

"[Paste recap]"

Turn this into a clean summary with three sections: Decided, Open
questions, Who owns what next. Then give me the same three sections
translated into [second language, e.g. French], written the way a native
speaker would phrase a meeting recap, not a literal translation.
```
WHEN: You just left a call and need a shareable recap in two languages before you forget the details.

## Mains (6) - real business work

### M1. The client email in the client's own idiom
PROMPT:
```
Write an email to [Client] about [topic, e.g. "a [rounded number]-week
delay on the deliverable"]. Requirements:
- Original language: [language]
- Tone: professional but warm, not stiff or overly formal
- Length: under 150 words
- Do not translate from an English draft. Write it directly in
  [language] the way a native speaker in that market would actually
  phrase it
Give me two versions: one that leads with the delay, one that leads with
the reason first. I'll pick.
```
WHEN: You need client-facing copy in a language you don't speak fluently, and a literal translation would read wrong.

### M2. The 100-page contract read
PROMPT:
```
I'm uploading a contract (redacted: party names replaced with [Client]
and [Me], all figures rounded). I need:
1. Every termination clause, quoted directly, with its trigger condition
2. Every clause with a hard deadline or date, listed chronologically
3. A one-paragraph plain-English summary of what happens if either side
   walks away early
Flag anything you're inferring versus anything directly stated in the
text. Don't summarize the whole document, just answer these three things.
```
WHEN: A long document lands in your inbox and you need the three things that actually matter, not a full re-read.

### M3. The weekly report from raw notes
PROMPT:
```
Here are my raw notes from this week (redacted, numbers rounded):

"[Paste bullet notes]"

Turn this into a client-ready weekly status report with sections: Summary
(2 sentences), Progress this week, Blockers, Next week's plan. Keep it
under 300 words total. Match a tone that's confident but not salesy, like
I'm updating a partner, not pitching a stranger.
```
WHEN: Friday afternoon, messy notes, need a clean report before you can close the week.

### M4. The service package, quoted and named
PROMPT:
```
I offer [describe the service, e.g. "a [rounded number]-week onboarding
package for small business owners"]. Help me write:
1. Three name options for this package, none of them generic
2. A one-paragraph description of what's included, no jargon
3. A price justification paragraph: why this price makes sense, without
   sounding defensive
Keep the tone direct, like I'm explaining it to a smart friend, not
pitching a room.
```
WHEN: You're packaging or repricing an offer and need the naming and framing done in one pass.

### M5. The multi-region rollout plan
PROMPT:
```
I'm planning to roll out [describe the thing, e.g. "a new pricing page"]
across [list regions, e.g. "France, Germany, and Brazil"]. For each
region, tell me:
1. One cultural or legal difference I should account for, if there is one
   worth mentioning, don't invent one if there isn't
2. Whether the copy should be adapted or fully rewritten for that market
3. One risk of launching the same version everywhere
Keep each region's answer to 4 lines max.
```
WHEN: You're about to launch something across more than one country and want the regional gaps flagged before you ship, not after.

### M6. The EU-only data handling check
PROMPT:
```
Before I share [describe the data type in general terms, e.g. "customer
survey responses, already anonymized"], walk me through: where does this
data get processed, does any of it leave EU servers, and what's the
difference in your answer if I have No Telemetry Mode on versus off?
Answer plainly, no marketing language. If you're not certain about
something, say so instead of reassuring me.
```
WHEN: A GDPR-conscious business owner needs a straight answer on data residency before uploading anything, in plain language, not legal boilerplate.

## Chef's Specials (3) - only this kitchen can cook these

### C1. The step-by-step reasoning audit (Magistral)
PROMPT:
```
Turn on step-by-step reasoning for this one. I need you to work through
[describe a genuinely multi-step problem, e.g. "whether a [rounded
number]-month payment plan or a single upfront price makes more sense for
[Client]'s cash flow situation, redacted"] and show your reasoning at
each step before the final answer. Don't skip to the conclusion. At the
end, tell me the one step where a different assumption would have changed
the answer.
```
WHEN: A decision has real stakes and you want to see the chef's thinking exposed, not just the final plate, using Magistral's extended reasoning mode.

### C2. The sourced deep research brief
PROMPT:
```
Run deep research on [topic, e.g. "current EU rules affecting small
consultancies working with client data"]. I need:
1. A structured brief, not a wall of text
2. Every claim tied to a source you actually read, not a guess
3. A final section: what's still unclear or where sources disagree
If you can't find enough current sources, tell me that instead of filling
the gap with a confident-sounding guess.
```
WHEN: You need a real research pass across multiple sources with citations, not a single quick answer, using Deep Research mode (Pro).

### C3. The Vibe pair-programming session
PROMPT:
```
I'm working in Mistral Vibe on [describe the task, e.g. "cleaning up a
script that processes client invoices, no real data included"]. Don't
just hand me a rewrite. Work with me: ask what the code currently does
wrong, propose one fix at a time, and wait for me to confirm before
moving to the next one. Flag any part where you're guessing at intent
instead of reading it directly from the code.
```
WHEN: An all-day coding session where you want a collaborator, not a one-shot code dump, inside Mistral Vibe.

## Verify (2) - make it prove its work

### V1. The confabulation check
PROMPT:
```
Before I trust this, tell me honestly: is there anything in your last
answer that you're not fully certain about, including any source,
citation, or fact you might have stitched together rather than actually
verified? List each one separately. Don't reassure me, just flag them.
```
WHEN: Right after any answer that includes facts, dates, or citations you plan to actually use or share.

### V2. The sycophancy break
PROMPT:
```
Take the opposite side of what I just proposed and argue it as
convincingly as you can, like you actually believe it. Then tell me
honestly: on balance, which side is stronger, and why? Don't just tell me
what I want to hear.
```
WHEN: You've just gotten agreement that felt a little too easy and want a genuine second opinion before you commit.

The full verification system lives in The Judge's Prompts.
