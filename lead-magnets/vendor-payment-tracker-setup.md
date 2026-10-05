# The Vendor Payment Tracker Setup

**Keyword: VENDOR** | Pillar: Stop Doing That by Hand | Employee #035 (Dalia) playbook

The complete setup for an AI employee that tracks every vendor bill
against its due date, so you're never the one who's late. She never
pays anything or moves a cent.

---

## What you are building

One workflow with four jobs:

1. You **give her the invoice**: amount, due date, who it's to. That's
   the whole input.
2. She **logs it and checks the due date** against today, every time
   you update the list.
3. She **writes you one reminder line** the day before it's due.
4. You **review it and pay it yourself**. She never pays anything or
   touches your bank.

Time to build: about 10 minutes. The tools are boring on purpose: one
AI (Claude), the vendor invoices you already have.

## The safety rules (read these first)

- 🟢 Green: the invoice amount, due date, and vendor name. That is the entire source.
- 🟠 Orange: the tracked due-date list and the reminder line she writes.
- 🔴 Red: she never pays anything, never moves money, never gets banking or card access.
- The rule that matters most: she tracks, you pay. No AI employee in this system ever touches your money directly.

## Part 1 — Collect what's unpaid (5 minutes, no AI)

Do this even if you build nothing else:

1. Pull every open vendor invoice into one list: who, how much, due
   when.
2. Sort it by due date, oldest first.

## Part 2 — The tracking brain (5 minutes)

With Claude (or your AI tool of choice) directly:

1. **Input**: your list from Part 1, plus today's date.
2. **AI step**: send it with the job description below. Copy it
   exactly, fill the blanks.

```
You are my vendor payment tracker. Here is my unpaid list and today's
date: [VENDOR, AMOUNT, DUE DATE — repeat for each invoice; TODAY'S
DATE].

My rules:
- Flag anything due in the next 3 days as urgent.
- Write one reminder line per invoice due soon: who, how much, when.
- Never say something is paid unless I told you it was paid.
- Never suggest a payment method or move money.

Return the urgent list and the reminder lines only.
```

3. **Review and pay**: check the reminder against the real invoice,
   then pay it yourself, your way.

## Part 3 — Refresh it weekly (5 minutes)

Pick one day a week, add new invoices and cross off what you paid.
A tracker that's a week stale is just a second inbox.

The feeling you are buying: you stop finding out a bill is late from
the vendor's follow-up email, and start seeing it coming three days
out.

## The upgrade path

Once the tracking feels routine, you have built trust with your
thirty-second AI employee. The same pattern, track honestly, flag
early, never touch the money, is how every AI employee in this system
works. That is the system my paid products install across a whole
business.

---

*From the desk of Employee #035. Dalia is AI, built by one human. The
only job she took was tracking which bill is due before I'm the one
who's late.*
