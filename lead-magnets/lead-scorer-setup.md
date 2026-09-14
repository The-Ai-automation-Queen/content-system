# The Lead Scorer Setup

**Keyword: SCORE** | Pillar: Stop Doing That by Hand | Employee #029 (Mona) playbook

The complete setup for an AI employee that reads through your pile of
leads and tells you which one to call first, so you stop guessing or
working them in whatever order they arrived. She never contacts a lead
herself.

---

## What you are building

One workflow with four jobs:

1. You **give her the lead list**: who, how they found you, what they
   said. That's the whole input.
2. She **scores each one** against what a good-fit lead looks like for
   you.
3. She **explains each score in one line**, so you can sanity-check it.
4. You **call the highest scores first**, in whatever order you choose.

Time to build: about 10 minutes. Cost: one AI (Claude) + a list of your
current leads, even a rough one works to start.

## The safety rules (read these first)

- 🟢 Green: the lead list you provide. That is the entire source.
- 🟠 Orange: the scores and one-line explanations she builds from it.
- 🔴 Red: she never contacts a lead herself, and never touches your CRM or inbox directly.
- The rule that matters most: a score only uses signals you actually gave her. A lead with no information gets flagged as unscoreable, never guessed at.

## Part 1 — Say what a good lead looks like (5 minutes, no AI)

Do this even if you build nothing else:

1. Write down 3-4 things that make a lead worth calling first for you:
   budget signal, urgency, fit, whatever actually matters.
2. Pull your current leads into one list: who, source, anything they
   said.

## Part 2 — The scoring brain (5 minutes)

With Claude (or your AI tool of choice) directly:

1. **Input**: your lead list and your good-fit criteria from Part 1.
2. **AI step**: send it with the job description below. Copy it
   exactly, fill the blanks.

```
You are my lead scorer. Here is what a good-fit lead looks like for me:
[YOUR CRITERIA: BUDGET, URGENCY, FIT SIGNALS]. Here is my lead list:
[LIST NAME, SOURCE, ANYTHING THEY SAID].

My rules:
- Score each lead 0-100 against my criteria.
- Explain each score in one line.
- Flag any lead you don't have enough information to score.
- Never invent a signal that wasn't in what I gave you.

Return the scored list, highest first, with the one-line explanation
for each.
```

3. **Call, highest first**: use the ranking as a starting order, not a
   rule you can't override.

## Part 3 — Rescore weekly (5 minutes)

Once a week, run your current lead list through the same check. New
leads come in, old ones go quiet; a static score from three weeks ago
stops being useful fast.

The feeling you are buying: you stop opening your lead list and
freezing, and start knowing exactly who to call first.

## The upgrade path

Once the scoring feels routine, you have built trust with your twenty-
sixth AI employee. The same pattern, score honestly, explain plainly,
flag what's unscoreable, is how every AI employee in this system works.
That is the system my paid products install across a whole business.

---

*From the desk of Employee #029. Mona is AI, built by one human. The
only job she took was reading through the pile of leads and telling me
which one to call first instead of guessing.*
