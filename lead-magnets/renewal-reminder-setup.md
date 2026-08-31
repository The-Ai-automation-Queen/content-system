# The Renewal Reminder Setup

**Keyword: RENEW** | Pillar: Stop Doing That by Hand | Employee #024 (Dania) playbook

The complete setup for an AI employee that tracks a client's renewal
date and says something before it becomes a surprise. She never sends
anything or touches billing.

---

## What you are building

One workflow with four jobs:

1. You **tell her the renewal date and the account**. That's the whole
   input.
2. She **flags it at 60, 30, and 7 days out**, whichever window applies
   now.
3. She **drafts one renewal reminder email**, matched to the account's
   tone.
4. You **review it and send it yourself**. She never sends anything.

Time to build: about 10 minutes. Cost: one AI (Claude) + a list of your
renewal dates, even a rough one from memory works to start.

## The safety rules (read these first)

- 🟢 Green: the renewal date and account details you provide. That is the entire source.
- 🟠 Orange: the reminder-window flag and the drafted email she builds from it.
- 🔴 Red: she never sends anything, never changes a price or term, and never touches billing.
- The rule that matters most: she never assumes a renewal is happening. She only flags the date; whether it renews is always your call.

## Part 1 — Name the date (2 minutes, no AI)

Do this even if you build nothing else:

1. Write down the next renewal date you actually know off the top of
   your head, and which account it's for.
2. Note how the account usually likes to be talked to: formal, casual,
   somewhere between.

## Part 2 — The reminder brain (5 minutes)

With Claude (or your AI tool of choice) directly:

1. **Input**: the renewal date, the account, and today's date.
2. **AI step**: send it with the job description below. Copy it
   exactly, fill the blanks.

```
You are my renewal reminder. Here is an account and its renewal date:
[ACCOUNT NAME, RENEWAL DATE, TODAY'S DATE, HOW THIS ACCOUNT LIKES TO BE
TALKED TO].

My rules:
- Tell me which window this falls in: 60, 30, or 7 days out.
- If none apply yet, say so plainly, don't force a reminder early.
- Draft one renewal reminder email, matched to the account's tone.
- Never assume the renewal is happening, only flag the date.

Return the window it falls in, and the drafted email if one applies.
```

3. **Review and send**: read it once for tone, then send it yourself.

## Part 3 — Check monthly (10 minutes)

Once a month, run your full renewal list through the same check.
Renewal dates don't announce themselves; a scheduled look catches them
before they become a surprise on either side.

The feeling you are buying: a renewal stops being something you find out
about after the fact, and starts being something you saw coming.

## The upgrade path

Once the tracking feels routine, you have built trust with your
twenty-first AI employee. The same pattern, track honestly, flag
plainly, draft with the right tone, is how every AI employee in this
system works. That is the system my paid products install across a
whole business.

---

*From the desk of Employee #024. Dania is AI, built by one human. The
only job she took was tracking a renewal date and saying something
before it became a surprise instead of finding out after the fact.*
