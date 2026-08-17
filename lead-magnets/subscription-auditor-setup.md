# The Subscription Auditor Setup

**Keyword: SUBS** | Pillar: Stop Doing That by Hand | Employee #020 (Rami) playbook

The complete setup for an AI employee that reads your subscription list
and tells you honestly what's earning its place and what isn't. He never
cancels anything or touches an account.

---

## What you are building

One workflow with four jobs:

1. You **list your subscriptions and what each costs**. That's the
   whole input.
2. He **calculates the annual cost** of the whole pile, not just the
   monthly total.
3. He **flags which ones you barely use**.
4. You get **one plain list**: keep, cancel, or downgrade.

Time to build: about 10 minutes. Cost: one AI (Claude) + a list of your
subscriptions and prices, even a rough one from memory works to start.

## The safety rules (read these first)

- 🟢 Green: the subscription list and prices you provide. That is the entire source.
- 🟠 Orange: the annual-cost math and the keep-or-cancel read he builds from it.
- 🔴 Red: he never cancels anything himself, and never touches a card or account. He only tells you what he sees.
- The rule that matters most: a missing price gets marked "[NEEDS INFO]," never estimated. A wrong total is worse than an incomplete one.

## Part 1 — List what you're paying for (5 minutes, no AI)

Do this even if you build nothing else:

1. Open your bank or card statement and list every recurring charge you
   can find, name and price.
2. Add anything billed annually that you might forget: domain renewals,
   yearly plans, one-off "founding member" fees.
3. Note roughly how often you actually use each one: daily, monthly,
   can't remember.

## Part 2 — The audit brain (5 minutes)

With Claude (or your AI tool of choice) directly:

1. **Input**: your subscription list, with prices and usage notes.
2. **AI step**: send it with the job description below. Copy it
   exactly, fill the blanks.

```
You are my subscription auditor. Here is my list of subscriptions and
what each costs: [LIST NAME, PRICE, BILLING CYCLE, HOW OFTEN YOU USE
IT].

My rules:
- Calculate the annual cost of the full list.
- Flag any I mention using rarely or not at all.
- Recommend keep, cancel, or downgrade for each, with a one-line reason.
- Never guess at a price or a subscription I didn't list.

Return the list with recommendations and the annual total only.
```

3. **Decide**: cancel what's flagged, keep what earns its place. You
   make the call, he only surfaces it.

## Part 3 — Do it quarterly (10 minutes)

Once a quarter, run the same list again. Subscriptions creep back in
quietly; a scheduled check catches them before they've cost a year.

The feeling you are buying: you stop finding a forgotten charge on a
statement and start knowing, on purpose, what you're paying for and why.

## The upgrade path

Once the audit feels routine, you have built trust with your
seventeenth AI employee. The same pattern, list honestly, calculate
plainly, flag what's unused, is how every AI employee in this system
works. That is the system my paid products install across a whole
business.

---

*From the desk of Employee #020. Rami is AI, built by one human. The
only job he took was sitting down once a quarter to ask whether every
subscription still earned its place.*
