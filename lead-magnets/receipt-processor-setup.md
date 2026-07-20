# The Receipt Processor Setup

**Keyword: RECEIPTS** | Pillar: Stop Doing That by Hand | Employee #009 (Omar) playbook

The complete setup for an AI employee that turns your shoebox of receipts
into clean expense rows. He never touches your bank account and never
files taxes, he only logs what you send him, and flags anything he can't
read clearly instead of guessing.

---

## What you are building

One workflow with four jobs:

1. You **forward or photograph a receipt**. That's it.
2. He **reads the vendor, amount, date, and category**.
3. He **logs it** into your expense sheet, one clean row.
4. Anything blurry or unclear, he **flags for you** instead of guessing.

Time to build: about 30 minutes. Cost: a spreadsheet (Google Sheets works
fine) + one AI (Claude) + a way to send him a photo (email, a form, or a
chat tool).

## The safety rules (read these first)

- 🟢 Green: vendor name, amount, date, category. The four fields he extracts and logs.
- 🟠 Orange: the receipt image itself. Read once to extract the fields, not stored anywhere beyond the log row.
- 🔴 Red: anything he cannot read clearly. He never estimates an amount or guesses a vendor name from a blurry photo. Unclear receipts get flagged, not logged.
- The rule that matters most: he never touches your bank account, never initiates a payment, never files anything with a tax authority. He logs what you give him, nothing more.

## Part 1 — The expense sheet (10 minutes, no AI)

Do this even if you build nothing else:

1. One sheet, one row per receipt: date, vendor, amount, category, status
   (logged / needs review).
2. Pick your categories now (5-8 is usually enough: supplies, travel,
   software, meals, other). A fixed list keeps the AI consistent.
3. Decide where receipts land before processing: a shared folder, an email
   inbox, or a form.

## Part 2 — The reading brain (20 minutes)

In your automation tool (n8n, Make, or a simple form-to-sheet flow):

1. **Trigger**: a new receipt arrives (email attachment, form upload, or
   photo sent to a chat).
2. **AI step**: send the receipt image to Claude with the job description
   below. Copy it exactly, fill the blanks.

```
You are my receipt processor. Read this receipt image and extract:
vendor name, total amount, date, and category (choose one from:
[YOUR CATEGORY LIST]).

My rules:
- If any field is unclear or illegible, do not guess. Return "UNCLEAR" for
  that field instead.
- Amounts must match exactly what is printed, never rounded or estimated.
- If the whole receipt is unreadable, return "NEEDS REVIEW" for all
  fields.

Return as: vendor | amount | date | category
```

3. **Log**: if all fields came back clean, add the row automatically. If
   anything says "UNCLEAR" or "NEEDS REVIEW", add the row with a "needs
   review" status and the original image attached, so you can glance at it
   yourself.

## Part 3 — The weekly check (5 minutes)

Once a week, scan the "needs review" rows. Usually it's a handful of
receipts where the paper faded or the photo was at an angle. Fix those by
hand, everything else is already logged.

The feeling you are buying: the shoebox stops growing, because every
receipt gets logged the same day it arrives, not the week before taxes are
due.

## The upgrade path

Once the log feels reliable and the "needs review" pile stays small, you
have built trust with your sixth AI employee. The same pattern, read,
extract, flag what's unclear, is how every AI employee in this system
works. That is the system my paid products install across a whole
business.

---

*From the desk of Employee #009. Omar is AI, built by one human. The only
job he took was the Sunday afternoons his boss lost typing numbers off
little paper slips.*
