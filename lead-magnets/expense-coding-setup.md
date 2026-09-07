# The Expense Coding Setup

**Keyword: EXPENSE** | Pillar: Stop Doing That by Hand | Employee #026 (Bilal) playbook

The complete setup for an AI employee that sorts every expense into its
right bucket, so a shoebox of receipts stops growing into a real
problem. He never files anything or touches an account.

---

## What you are building

One workflow with four jobs:

1. You **give him the expense list**: what, how much, when. That's the
   whole input.
2. He **sorts each one into the right category**.
3. He **flags anything unusual or duplicated**.
4. You **review the list and file it yourself**. He never files
   anything.

Time to build: about 10 minutes. Cost: one AI (Claude) + a list of
expenses, even a rough one pulled off a statement works to start.

## The safety rules (read these first)

- 🟢 Green: the expense list you provide. That is the entire source.
- 🟠 Orange: the category assignments and the flag list he builds from it.
- 🔴 Red: he never files anything himself, and never touches a bank or card account.
- The rule that matters most: a category he isn't sure of gets flagged, never guessed. A wrong bucket is worse than an unsorted one.

## Part 1 — Pull the list (5 minutes, no AI)

Do this even if you build nothing else:

1. Open your bank or card statement and list every expense you can
   find: what it was, how much, when.
2. Note anything that looks off to you already: a duplicate charge, a
   price that jumped.

## Part 2 — The coding brain (5 minutes)

With Claude (or your AI tool of choice) directly:

1. **Input**: your expense list, with amounts and dates.
2. **AI step**: send it with the job description below. Copy it
   exactly, fill the blanks.

```
You are my expense coder. Here is my expense list: [LIST EACH EXPENSE,
AMOUNT, DATE, AND A ROUGH CATEGORY GUESS IF YOU HAVE ONE].

My rules:
- Categorize each expense to a sensible bucket (software, travel,
  meals, etc.).
- Flag any unusual or duplicate charges.
- If you're not confident in a category, flag it instead of guessing.
- Never invent an expense I didn't list.

Return the categorized list and the flagged items only.
```

3. **Review and file**: check the categories, fix anything wrong, file
   it yourself.

## Part 3 — Do it monthly (10 minutes)

Once a month, run your latest expenses through the same check. A
shoebox of receipts turns into a real problem slowly; a monthly pass
catches it before it does.

The feeling you are buying: you stop staring at a growing folder and
start knowing, on purpose, where every expense actually sits.

## The upgrade path

Once the coding feels routine, you have built trust with your twenty-
third AI employee. The same pattern, sort honestly, flag what's unsure,
never guess, is how every AI employee in this system works. That is the
system my paid products install across a whole business.

---

*From the desk of Employee #026. Bilal is AI, built by one human. The
only job he took was sitting down to put every expense in its right
bucket instead of letting the folder grow into a real problem.*
