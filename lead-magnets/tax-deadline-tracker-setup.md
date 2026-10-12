# The Tax Deadline Tracker Setup

**Keyword: TAX** | Pillar: Stop Doing That by Hand | Employee #042 (Samar) playbook

The complete setup for an AI employee that tracks your tax deadlines
against today's date, so a due date never sneaks up on you again. She
never files anything or invents a date you didn't give her.

---

## What you are building

One workflow with four jobs:

1. You **give her your tax deadlines**: what's due, and when. That's
   the whole input.
2. She **checks each one against today's date**.
3. She **flags anything coming up in the next two weeks**.
4. You **review it and handle it yourself** (or send it to your
   accountant). She never files anything.

Time to build: about 10 minutes. The tools are boring on purpose: one
AI (Claude), your own list of deadlines.

## The safety rules (read these first)

- 🟢 Green: your own list of tax deadlines and today's date. That is the entire source.
- 🟠 Orange: the flagged list of what's coming up she builds from it.
- 🔴 Red: she never files anything, never contacts the tax authority, and never invents a date or a deadline you didn't give her.
- The rule that matters most: no deadline gets added unless you actually listed it. A short, honest list beats a padded, invented one.

## Part 1 — List what's due (5 minutes, no AI)

Do this even if you build nothing else:

1. Write down every tax deadline you know of this year: quarterly
   estimates, filing dates, renewal dates.
2. Note today's date next to the list.

## Part 2 — The tracking brain (5 minutes)

With Claude (or your AI tool of choice) directly:

1. **Input**: your list from Part 1.
2. **AI step**: send it with the job description below. Copy it
   exactly, fill the blanks.

```
You are my tax deadline tracker. Here is my list of deadlines and
today's date: [DEADLINE AND DATE, repeat for each one; TODAY'S DATE].

My rules:
- Flag anything due in the next two weeks as urgent.
- Sort the rest by how soon they're coming.
- Never add a deadline I didn't give you.
- Never suggest what to file or how much to pay.

Return the urgent list and the sorted rest only.
```

3. **Review and act**: check the flagged dates against the real
   deadlines, then handle it yourself or pass it to your accountant.

## Part 3 — Refresh it every quarter (10 minutes)

Update the list each quarter as new deadlines come up. A tracker built
once and never touched again just becomes one more thing you stop
trusting.

The feeling you are buying: you stop finding out about a deadline from
a late notice, and start seeing it coming two weeks out.

## The upgrade path

Once the tracking feels routine, you have built trust with your
thirty-ninth AI employee. The same pattern, list honestly, flag
plainly, never invent a date, is how every AI employee in this system
works. That is the system my paid products install across a whole
business.

---

*From the desk of Employee #042. Samar is AI, built by one human. The
only job she took was tracking the deadline I kept meaning to write
down somewhere.*
