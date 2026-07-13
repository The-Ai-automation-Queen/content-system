# The Late-Payment Chaser Setup

**Keyword: CHASER** | Pillar: Stop Doing That by Hand | Employee #005 (Sami) playbook

The complete setup for an AI employee that watches your invoices, sends the
reminder before you have to, and never touches your bank account. He only
sends words, and only in your voice.

---

## What you are building

One workflow with four jobs:

1. Every invoice gets **checked daily** against its due date.
2. **3 days late**: a friendly reminder goes out, in your voice.
3. **10 days late**: a firmer one goes out. Still polite. Still you.
4. **20 days late**: he stops and **flags it to you**. He never escalates alone.

Time to build: about 40 minutes. Cost: your invoice list (a spreadsheet,
Stripe, or QuickBooks all work) + one automation tool (n8n or Make, free
tiers work) + one AI (Claude).

## The safety rules (read these first)

- 🟢 Green: invoice number, due date, amount, client name you already have on file. Safe to process.
- 🟠 Orange: the reminder wording itself. Drafted by the AI, always in your voice, never invented facts about the debt.
- 🔴 Red: late fees, legal language, collections threats, anything that changes the terms of the relationship. The workflow never writes these. That message, if you ever need it, is yours to write and send.
- The send button is yours to hand over or keep. Most people let the first two stages send automatically and keep the third stage (20 days late) as a draft they approve. Set this at the connection level.

## Part 1 — The invoice list (10 minutes, no AI)

Do this even if you build nothing else:

1. One sheet, one row per unpaid invoice: client name, amount, due date, days overdue.
2. A simple formula: `=TODAY()-[due date]` gives you days overdue automatically.
3. Sort by days overdue, worst first.

That is half the job, done, with zero AI. You can already see who to chase.

## Part 2 — The reminder brain (20 minutes)

In n8n (or Make):

1. **Trigger**: schedule, daily at 9am.
2. **Fetch**: every row where days overdue crosses 3, 10, or 20.
3. **AI step**: send the client name, amount, and days overdue to Claude with the job description below. Copy it exactly, fill the blanks.

```
You are my late-payment reminder writer. Write a short, polite email
reminding [CLIENT NAME] that invoice for [AMOUNT] was due [DAYS] days ago.

My rules:
- Stage 1 (3 days): warm, assume it was an oversight.
- Stage 2 (10 days): direct but still friendly, ask if there is an issue.
- Stage 3 (20 days): firm and short, no threats, no legal language, just a
  clear ask and a request to talk if something is wrong.
- Sign off: [YOUR SIGN-OFF].
- Never mention late fees, legal action, or collections. That decision is
  mine alone.

Return the email text only.
```

4. **Send or draft**: stages 1 and 2 can send automatically once you trust the
   wording. Stage 3 always lands as a draft for you to review first.

## Part 3 — Track what happened (10 minutes)

1. When a payment comes in, mark the row paid. The workflow stops chasing automatically.
2. Once a week, scan the sheet for anything stuck past stage 3. That is the
   short list of real conversations you need to have yourself.

The feeling you are buying: the awkward first ask happens without you
opening your email and staring at the cursor.

## The upgrade path

Once the reminders sound like you and the payments start landing faster,
you have built trust with your second AI employee. The same pattern, watch,
remind, escalate to a human, is how every AI employee in this system works.
That is the system my paid products install across a whole business.

---

*From the desk of Employee #005. Sami is AI, built by one human. The only
job he took was the 20 minutes a week his boss spent working up the nerve
to ask for her own money.*
