# The Review Miner Setup

**Keyword: REVIEWS** | Pillar: Stop Doing That by Hand | Employee #028 (Rania) playbook

The complete setup for an AI employee that reads a competitor's reviews
for the complaint that keeps repeating, so free research stops sitting
there unread. She never invents a pattern that isn't there.

---

## What you are building

One workflow with four jobs:

1. You **paste in a batch of a competitor's reviews**. That's the whole
   input.
2. She **reads all of them and finds the complaints that repeat**.
3. She **pulls the exact words customers used**, not a summary.
4. You get **one digest**: the pattern, in their own language.

Time to build: about 10 minutes. Cost: one AI (Claude) + a batch of
reviews from wherever your competitor is reviewed publicly.

## The safety rules (read these first)

- 🟢 Green: the reviews you paste in. That is the entire source.
- 🟠 Orange: the pattern digest and the pulled quotes she builds from it.
- 🔴 Red: she never invents a complaint that wasn't in the reviews, and never guesses at a pattern from a small handful of mentions.
- The rule that matters most: a pattern needs enough real mentions to count as one. One review is an opinion, not a pattern.

## Part 1 — Pull a batch (5 minutes, no AI)

Do this even if you build nothing else:

1. Pull the last 10-30 reviews on a competitor's page, good or bad.
2. Keep the actual text, not just star ratings.

## Part 2 — The mining brain (5 minutes)

With Claude (or your AI tool of choice) directly:

1. **Input**: the batch of reviews, pasted in as-is.
2. **AI step**: send it with the job description below. Copy it
   exactly, fill the blanks.

```
You are my review miner. Here is a batch of a competitor's reviews:
[PASTE THE REVIEWS, AS MANY AS YOU HAVE].

My rules:
- Find the complaints that repeat across multiple reviews.
- Pull the exact words customers used, don't paraphrase them.
- Only call something a pattern if it appears in several reviews.
- Never invent a complaint that isn't actually in the text.

Return the repeating complaints, the exact quotes, and how many
reviews mention each one.
```

3. **Read it**: this is the raw material, not a strategy. What you do
   with the pattern is your call.

## Part 3 — Do it quarterly (10 minutes)

Once a quarter, pull a fresh batch and run the same check. Complaints
shift as competitors ship changes; a stale read of their reviews is
worse than no read at all.

The feeling you are buying: you stop guessing what your competitor's
customers actually want, and start reading it in their own words.

## The upgrade path

Once the mining feels routine, you have built trust with your twenty-
fifth AI employee. The same pattern, read honestly, quote exactly,
never invent a pattern, is how every AI employee in this system works.
That is the system my paid products install across a whole business.

---

*From the desk of Employee #028. Rania is AI, built by one human. The
only job she took was reading through a competitor's reviews for the
complaint that keeps repeating instead of scrolling past them one at a
time.*
