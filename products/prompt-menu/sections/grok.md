---
kitchen: Grok
tagline: Fast, sarcastic, plugged straight into the live feed of X.
---

## Starters (4) - first wins, 5 minutes each

### S1. What is the internet saying about this, right now
PROMPT:
```
Use DeepSearch. I need to know what people are actually saying about
[topic, product, or company] on X and the open web in the last 48 hours.

Read enough sources to be confident, then give me:
1. The overall mood: positive, negative, or split, with a rough percentage
2. The 3 most repeated opinions, in people's own words where you can
3. Any single post or thread that's driving the conversation more than others
4. What's noise vs what's a real pattern worth acting on

Flag anything you're inferring vs anything you actually found stated directly.
```
WHEN: The first morning you need a real pulse check before a meeting, a launch, or a reply, instead of guessing from your own feed.

### S2. Summarize this thread before I wade into it
PROMPT:
```
Here's a link to an X thread: [paste link]. Summarize it for me like I've
never seen it: who started it, what the actual argument is, where the
disagreement is, and whether it's still growing or already dying down.

Then tell me honestly: is this worth me replying to, or is it a 6-hour
story that'll be gone by tomorrow.
```
WHEN: Before you spend 20 minutes reading a thread that turns out to be nothing, or before you jump into one that actually matters.

### S3. Turn my rough note into an X post that sounds like me
PROMPT:
```
Here's a rough note I wrote for myself: [paste your rough note, no client
names or numbers, describe the situation in general terms like "a client
project" or "around 30%"].

Turn it into a short X post. Keep my point, don't add a joke I wouldn't
make, and don't invent a stat or detail I didn't give you. Give me 2
versions: one plain, one with a little more edge.
```
WHEN: Any time you have a real thought and 90 seconds, and want it sharpened without losing your voice.

### S4. Explain this image, chart, or screenshot to me
PROMPT:
```
I'm uploading an image: [attach the chart, screenshot, or photo].

Tell me plainly what it shows, in 4 sentences or less. Then tell me the
one thing in it I'd probably miss if I only glanced at it. If any text
in the image is hard to read, say so instead of guessing at it.
```
WHEN: Someone sends you a screenshot mid-conversation and you need to understand it in the next 10 seconds, not the next 10 minutes.

## Mains (6) - real business work

### M1. Draft the client update from my rough bullet points
PROMPT:
```
I need to write a project update for [Client]. Here are my rough notes,
already stripped of anything private: we finished [rounded number, e.g.
"about 80%"] of the work, the main blocker was [general description, not
the private detail], and next step is [next step].

Write it as a short, professional update: what's done, what's blocked,
what happens next, in that order. No filler opening, no "I hope this
finds you well." Keep it under 150 words.
```
WHEN: Every week you owe a client an update and would rather spend 3 minutes than 20.

### M2. Read this long document and tell me what actually matters
PROMPT:
```
I'm pasting a long document below (or describe it as: a contract, a
report, a set of meeting notes). Because your context window can hold
all of it at once, read the whole thing, not just the start.

[paste document, with any client names swapped for [Client] and dollar
figures rounded first]

Give me: the 5 things that actually matter, anything that contradicts
itself between sections, and one question I should ask before I sign off
on this.
```
WHEN: You've been handed something 40 pages long and a meeting about it in an hour.

### M3. Use Big Brain to stress-test my plan before I commit
PROMPT:
```
Turn on Big Brain mode. Here's a plan I'm considering: [describe the
plan in plain terms: what you'd do, roughly what it would cost, roughly
how long it would take, no real client names].

Don't just tell me it sounds good. Find the weakest assumption in it,
the step most likely to go wrong, and one alternative I haven't
considered. Take your time on this one.
```
WHEN: Before a decision that's expensive to reverse: a pricing change, a hire, a big proposal.

### M4. Watch what's being said about my brand and brief me daily
PROMPT:
```
Set up a persistent agent for me. Its job: monitor X for mentions of
[my brand or product name, not a client's], plus the general topic of
[your industry or niche].

Every time I check in, give me: anything new worth knowing, anything
that looks like a complaint building momentum, and anything positive
worth responding to or reposting. Keep the tone factual, not alarmist.
```
WHEN: You can't watch the feed all day but you still need to know before a small thing becomes a big thing.

### M5. Build me a one-page brief from scattered research
PROMPT:
```
I've gathered notes on [topic, e.g. "a competitor's new pricing" or "a
trend in my industry"] from a few different places. Here they are,
unpolished: [paste your notes, general terms only, no client specifics].

Use DeepSearch to fill in anything missing or outdated, then combine it
all into one clean brief: what's happening, why it matters to me, and
what I should consider doing about it. One page, plain language.
```
WHEN: You have half a research project already done in scattered notes and need it turned into something you can actually hand someone.

### M6. Give me the honest read on this trend before I bet on it
PROMPT:
```
Use DeepSearch across X and the web. I'm considering betting on
[a trend, tool, or shift in my industry] being real and lasting, not a
flash in the pan.

Give me the case for it being real, the case for it being hype, and
which case currently has more evidence behind it. Tell me plainly if
you're not confident either way instead of picking a side to sound
useful.
```
WHEN: Before you spend real time or money chasing something because it's loud on X this week.

## Chef's Specials (3) - only this kitchen can cook these

### C1. The live pulse check, sourced and dated
PROMPT:
```
Use DeepSearch to pull only what's been posted on X in the last 6 hours
about [topic, product, or event]. I don't want a general summary of the
topic, I want what's happening in this window specifically.

Tell me: what changed in the last 6 hours, who's driving it, and
whether it's still moving or has already peaked. Note the rough time of
the posts you're drawing from where you can.
```
WHEN: The one thing no other kitchen can cook: a genuinely live read on X, not a snapshot from whenever the model was trained.

### C2. Feed this entire codebase or book into the countertop at once
PROMPT:
```
I'm giving you a large amount of material at once because your context
window can hold it all: [paste the full codebase, manuscript, or long
document, with any private client details replaced by [Client] and
figures rounded].

Read the whole thing before answering. Then tell me: the overall
structure as you understood it, the 3 weakest or most inconsistent
parts, and one thing that appears in more than one place but should
only appear once.
```
WHEN: Whenever something is too long for a normal conversation and you don't want it read in fragments, since this is the biggest countertop in the industry.

### C3. Generate the visual, then critique your own work
PROMPT:
```
Using Aurora, generate an image of: [describe the image plainly, no real
people's likenesses, no client logos].

Once it's generated, look at your own output and tell me honestly: what
looks off, what you'd change if I asked for a second version, and
whether this is ready to use or needs a redo. Don't just say it looks
great.
```
WHEN: When you need a fast visual and want the chef to flag its own weak spots instead of you catching them later.

## Verify (2) - make it prove its work

### V1. Show me the sources, not just the summary
PROMPT:
```
Go back through your last answer about [topic]. For each specific claim
or number you gave me, tell me whether it came from a source you can
point to, or whether you inferred or estimated it.

List the claims you're less than 80 percent confident in separately, so
I know exactly what to double-check myself before I repeat any of this
to someone else.
```
WHEN: Any time an answer sounded confident, because that confidence and being right aren't the same thing here.

### V2. Argue the other side before I trust this
PROMPT:
```
I asked you about [topic or decision] and you gave me an answer. Now
argue against your own answer as hard as you honestly can. Don't soften
it and don't agree with me just because I'm the one asking.

Then tell me which side, the original answer or this counter-argument,
you'd actually bet on if you had to pick one.
```
WHEN: Before you act on advice from a chef that's built to agree with you unless you push back first.

The full verification system lives in The Judge's Prompts.
