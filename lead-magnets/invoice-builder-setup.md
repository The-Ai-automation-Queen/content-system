# The Invoice Builder Setup

**Keyword: INVOICE** | Pillar: Stop Doing That by Hand | Employee #013 (Tariq) playbook

The complete setup for an AI employee that turns finished work into a
clean invoice the same day, so billing stops being the thing you avoid
for three weeks. He never touches payment and never sends anything, he
only drafts.

---

## What you are building

One workflow with four jobs:

1. You **tell him the work, the client, and the rate**. That's the whole
   input.
2. He **drafts one clean invoice**: line items, total, due date.
3. Anything missing, like a tax number or address, **gets flagged, never
   guessed**.
4. You **review it and send it yourself**. He never sends anything.

Time to build: about 15 minutes. Cost: one AI (Claude) + whatever you
already use to send invoices (email, a PDF, an invoicing tool).

## The safety rules (read these first)

- 🟢 Green: the work you describe, the client name, the rate or amount. That is the entire source of the invoice.
- 🟠 Orange: the drafted invoice text itself, built from what you told him.
- 🔴 Red: he never invents a tax rate, a business number, or an amount you did not give him. He never touches payment collection, never marks anything as sent, and never clicks send. That is always your step.
- The rule that matters most: a missing detail gets marked "[NEEDS INFO]," never filled in with a guess. A wrong invoice is worse than a late one.

## Part 1 — Your billing basics (5 minutes, no AI)

Do this even if you build nothing else:

1. Write down your standard payment terms: due in how many days, which
   payment methods you accept.
2. Write down the one job you finished but haven't billed yet. That is
   your first real invoice.
3. Decide where finished invoices get filed so you can find them again.

## Part 2 — The drafting brain (10 minutes)

With Claude (or your AI tool of choice) directly:

1. **Input**: the work you did, who it was for, and the rate or agreed
   amount.
2. **AI step**: send it with the job description below. Copy it exactly,
   fill the blanks.

```
You are my invoice builder. Here is the work I completed:
[DESCRIBE THE WORK, THE CLIENT, AND THE RATE OR AMOUNT].

My rules:
- Draft one clean invoice: line items, total, due date [X] days from
  today.
- Use plain language, no invented tax lines unless I give you the rate.
- If anything is missing (client address, tax number), mark it
  "[NEEDS INFO]" instead of guessing.
- Never mark this as sent, that is always my step.

Return the invoice text only.
```

3. **Review and send**: fill in any "[NEEDS INFO]" markers, check the
   total, and send it yourself through whatever you already use.

## Part 3 — The weekly check (5 minutes)

Once a week, look back at the work you finished and ask: is there
anything here I haven't billed yet? That question, asked honestly, is the
whole job. Most late invoices aren't complicated, they're just avoided.

The feeling you are buying: invoices go out the same week the work is
done, not three weeks later when it feels awkward to bring up.

## The upgrade path

Once billing feels routine instead of avoided, you have built trust with
your tenth AI employee. The same pattern, describe once, draft
honestly, flag the gaps, is how every AI employee in this system works.
That is the system my paid products install across a whole business.

---

*From the desk of Employee #013. Tariq is AI, built by one human. The
only job he took was sitting down to turn finished work into a clean
invoice instead of avoiding it for another week.*
