---
kitchen: Claude
tagline: The kitchen that reads the whole room before it answers.
---

## Starters (4) - first wins, 5 minutes each

### S1. The Plain Rewrite
PROMPT:
```
Rewrite the message below so a busy person understands it in one read.
Short sentences. No jargon. No hype. Keep every fact, drop every filler word.

Message:
[paste your message, with names swapped for [Client] / [Me] and any real
numbers rounded]
```
WHEN: You wrote something in five minutes and it shows. Use this before you hit send on any email, update, or post.

### S2. The Two-Minute Verdict
PROMPT:
```
I need to decide between [Option A] and [Option B] by [rounded deadline,
e.g. "end of day"]. Give me your honest recommendation in three sentences,
then one sentence on what would change your mind.
```
WHEN: You're stuck picking and just need a clear-headed opinion, not a essay.

### S3. The Document Once-Over
PROMPT:
```
Read the document below and tell me, in a short list: what's missing, what's
unclear, and what a reader would ask you first. Don't rewrite it yet, just
tell me what's wrong with it.

Document:
[paste, with [Client]/[Me] in place of real names and rounded figures only]
```
WHEN: Something's off in a document you've reread too many times to see clearly.

### S4. The Second Draft
PROMPT:
```
Here's a first attempt: [paste]. Don't just polish it. Give me a genuinely
different second version, same goal, different approach. I want to compare
two real options, not two versions of the same one.
```
WHEN: Your first draft is fine but you suspect "fine" isn't good enough.

## Mains (6) - real business work

### M1. The Long-Document Hold
PROMPT:
```
I'm going to paste a long document in sections. Don't summarize each piece
as it comes in, just confirm you've got it. Once I say "that's everything,"
give me one clean summary of the whole thing: the throughline, the three
things that matter most, and anything that contradicts itself across
sections.

[paste section 1, redacted: [Client] names, rounded numbers, no IDs or
credentials]
```
WHEN: A document (contract, report, transcript) is too long to hold in your own head at once. This is what a big countertop is actually for: it won't lose the thread halfway through like a smaller-context tool will.

### M2. The Client Update, In My Voice
PROMPT:
```
Write an update to [Client] about [project/topic]. Here's what actually
happened this week: [bullet list of facts, names as [Client]/[Me], numbers
rounded]. Match this tone: [paste 2-3 sentences of your own past writing as
a voice sample]. Keep it under 150 words. No filler, no "I hope this finds
you well."
```
WHEN: A status update that needs to sound like you, not like a template.

### M3. The Meeting-to-Action Pass
PROMPT:
```
Below is a rough transcript or notes from a call with [Client]. Turn it into
three lists: decisions made, open questions, and who owns what next with a
rounded deadline for each. If something in the notes is ambiguous, flag it
instead of guessing.

Notes:
[paste, redacted]
```
WHEN: You just got off a call and the notes are messier than the meeting was.

### M4. The Week-Ahead Plan
PROMPT:
```
Here's everything on my plate this week: [list tasks, rough time estimates,
deadlines rounded to the nearest day]. Group it into a plan: what has to
happen first, what can wait, and what I should just say no to. Be honest if
the list is unrealistic for the time I actually have: [rounded hours
available].
```
WHEN: The list is longer than the week. Someone needs to say so out loud.

### M5. The Structure Before The Sentence
PROMPT:
```
I need to write [type of document, e.g. "a training module" or "a proposal"]
about [topic]. Before you write a single sentence, give me three genuinely
different structures I could use, not three versions of the same outline.
Two sentences on each: what it emphasizes and who it's best for. I'll pick
one, then you write it.
```
WHEN: Long, structured writing where the wrong shape wastes an afternoon. Claude holds a long thread without losing the plot, which is exactly what makes it worth planning the shape first instead of writing blind.

### M6. The Steady Second Opinion
PROMPT:
```
I've been going back and forth on this for a while and I've lost perspective:
[describe the decision and the back-and-forth, redacted]. Read it fresh, as
if you'd never seen it, and tell me the steadiest, most level-headed take.
Not what I want to hear, what actually holds up.
```
WHEN: You need a chef who reads the whole room and answers considered rather than confidently wrong, especially on something you've been circling too long to see straight.

## Chef's Specials (3) - only this kitchen can cook these

### C1. The Working Artifact
PROMPT:
```
Build me a working [one-pager / tracker / calculator / simple page] for
[purpose]. I want something I can actually open, edit, and reuse, not a
description of one. Here's what it needs to do: [list requirements]. Here's
the data or content it should start with: [paste, redacted]. Show it to me
as a finished thing, then ask what I'd change.
```
WHEN: You want a takeaway box, not just an answer. This is the one dish only Claude plates this way: a real, editable artifact that appears beside the chat instead of a wall of text describing what you'd have to build yourself.

### C2. The Standing Order
PROMPT:
```
From now on in this project, treat these as standing instructions: [list your
recurring preferences, e.g. tone, format, the client context that applies to
every chat here, redacted]. Every time I bring you something in this project,
apply these automatically without me repeating them.
```
WHEN: You're working the same client or topic across many chats and you're tired of re-explaining context every single time. This is the standing-order notebook a regular gets, set up once inside a Project instead of rebuilt from scratch each visit.

### C3. The Plan-First Build
PROMPT:
```
Here's the full job: [describe the complex task end to end, e.g. building
out a document, a multi-part analysis, a campaign outline]. Before you do
any of it, pause and think it through: lay out your plan in 5 to 8 bullets,
including the order you'll tackle things in and anything you're unsure about.
I'll approve or redirect the plan. Then, and only then, execute it in full.
```
WHEN: A task big enough that rushing in costs you more time than planning does. This is the chef pausing to think before touching an ingredient: worth asking for explicitly when the job has real complexity, not for a five-minute rewrite.

## Verify (2) - make it prove its work

### V1. The Confidence Check
PROMPT:
```
Go back through what you just told me and mark each claim as one of three
things: VERIFIED (you have real evidence for it in what I gave you),
LIKELY (a reasonable inference, but not confirmed), or GUESSED (you filled
a gap because I didn't give you the information). Don't soften this. I'd
rather see an honest GUESSED than a confident answer that isn't backed up.
```
WHEN: Any answer with facts, figures, or claims you'll act on. Confident and correct aren't the same thing, and this is how you tell them apart before you rely on either.

### V2. The Argue-With-Me Pass
PROMPT:
```
I want you to disagree with me if I'm wrong, even though I'm the one asking.
Here's what I think is the right call: [your decision or draft, redacted].
Before you agree with anything, find the strongest honest case against it.
If you still think I'm right after that, say so, and tell me why the
counter-argument didn't hold up.
```
WHEN: Any moment it would be easy for AI to just agree with you because you asked. Politeness isn't the same as being right, and this forces the distinction.

The full verification system lives in The Judge's Prompts.
