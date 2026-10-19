# The Action Item Tracker Setup

**Keyword: ACTION** | Pillar: Stop Doing That by Hand | Employee #045 (Mariam) playbook

The complete setup for an AI employee that turns a meeting's loose
agreements into a clean action list before anyone forgets who owns
what. She never assigns a task to someone or invents an agreement that
wasn't actually made.

---

## What you are building

One workflow with four jobs:

1. You **tell her what was agreed in the meeting**: who said they'd do
   what. That's the whole input.
2. She **writes one clean action list**: task, owner, rough timing.
3. She **flags anything with no clear owner**.
4. You **review it and send it yourself**. She never assigns anything
   or contacts anyone.

Time to build: about 10 minutes. The tools are boring on purpose: one
AI (Claude), your own rough notes from the meeting.

## The safety rules (read these first)

- 🟢 Green: your own notes on what was agreed and who said they'd do it. That is the entire source.
- 🟠 Orange: the written action list and ownership flags she builds from it.
- 🔴 Red: she never assigns a task to anyone herself, and never invents an agreement, an owner, or a deadline that wasn't actually discussed.
- The rule that matters most: if it wasn't actually agreed, it doesn't go on the list. A short honest list beats a padded invented one.

## Part 1 — Capture what was agreed (5 minutes, no AI)

Do this even if you build nothing else:

1. Right after the meeting, write down every task that came up and who
   said they'd handle it.
2. Note anything that was discussed but nobody actually claimed.

## Part 2 — The tracking brain (5 minutes)

With Claude (or your AI tool of choice) directly:

1. **Input**: your notes from Part 1.
2. **AI step**: send it with the job description below. Copy it
   exactly, fill the blanks.

```
You are my action item tracker. Here is what was agreed in the
meeting: [TASK AND WHO SAID THEY'D DO IT, repeat for each one;
ANYTHING DISCUSSED WITH NO CLEAR OWNER].

My rules:
- Write one clean action list: task, owner, rough timing if given.
- Flag anything with no clear owner at the top.
- Never assign a task to someone who didn't actually claim it.
- Never add a task that wasn't actually discussed.

Return the list and the unowned-items flag only.
```

3. **Review and send**: check it against what actually happened, then
   send it yourself to whoever needs it.

## Part 3 — Do it right after every meeting that matters (10 minutes)

Run this the same day, while the agreements are still fresh. A list
built a week later is just everyone's half-memory of what happened.

The feeling you are buying: you stop watching good meetings evaporate
into nothing, and start turning every one into a short, owned list.

## The upgrade path

Once the tracking feels routine, you have built trust with your forty-
second AI employee. The same pattern, capture honestly, list plainly,
never invent an owner, is how every AI employee in this system works.
That is the system my paid products install across a whole business.

---

*From the desk of Employee #045. Mariam is AI, built by one human. The
only job she took was writing down what the meeting actually agreed
before everyone forgot.*
