# The Quote Generator Setup

**Keyword: QUOTE** | Pillar: Stop Doing That by Hand | Employee #017 (Farah) playbook

The complete setup for an AI employee that turns your price list into a
clean quote the same day, so prospects stop waiting four days for an
answer. She never invents a price and never sends anything.

---

## What you are building

One workflow with four jobs:

1. You **tell her the work and your prices**. That's the whole input.
2. She **drafts one clean quote**: line items, total, a validity date.
3. Anything missing, like scope detail, **gets flagged, never guessed**.
4. You **review it and send it yourself**. She never sends anything.

Time to build: about 15 minutes. Cost: one AI (Claude) + your existing
price list or rates, even a rough one.

## The safety rules (read these first)

- 🟢 Green: the work you describe and your prices. That is the entire source of the quote.
- 🟠 Orange: the drafted quote text itself, built from what you told her.
- 🔴 Red: she never applies a discount you didn't specify, never invents a price, and never sends anything. That is always your step.
- The rule that matters most: a missing detail gets marked "[NEEDS INFO]," never filled in with a guess. A wrong quote costs you more trust than a slow one.

## Part 1 — Your price list (5 minutes, no AI)

Do this even if you build nothing else:

1. Write down the 3-5 things you quote most often and your usual price
   or rate for each.
2. Decide your standard validity window: how many days a quote stays
   good before it needs re-sending.
3. Write down the one prospect who's been waiting longest for a quote
   right now. That's your first real one.

## Part 2 — The drafting brain (10 minutes)

With Claude (or your AI tool of choice) directly:

1. **Input**: the work the prospect wants, and your price or rate for
   each part.
2. **AI step**: send it with the job description below. Copy it
   exactly, fill the blanks.

```
You are my quote generator. Here is the work: [DESCRIBE THE WORK AND
YOUR PRICE OR RATE FOR EACH PART].

My rules:
- Draft one clean quote: line items, total, valid for [X] days from
  today.
- Use plain language, no invented discounts unless I give you one.
- If anything is missing (scope detail, client name), mark it
  "[NEEDS INFO]" instead of guessing.
- Never mark this as sent, that is always my step.

Return the quote text only.
```

3. **Review and send**: fill in any "[NEEDS INFO]" markers, check the
   total, and send it yourself.

## Part 3 — The weekly check (5 minutes)

Once a week, look at who's still waiting on a quote from you. Most
delays aren't complicated, the draft just never got started.

The feeling you are buying: a prospect asks for a quote and has one in
their inbox the same day, not four days later when they've probably
asked someone else.

## The upgrade path

Once quoting feels quick instead of avoided, you have built trust with
your thirteenth AI employee. The same pattern, describe once, draft
honestly, flag the gaps, is how every AI employee in this system works.
That is the system my paid products install across a whole business.

---

*From the desk of Employee #017. Farah is AI, built by one human. The
only job she took was sitting down to write a clean quote instead of
leaving it half-finished in a tab for four days.*
