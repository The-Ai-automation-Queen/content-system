# The Client Onboarding Setup

**Keyword: ONBOARD** | Pillar: Stop Doing That by Hand | Employee #012 (Salma) playbook

The complete setup for an AI employee that drafts the welcome message and
the checklist for every new client, so nothing gets rebuilt from memory
and nothing quietly falls through in the first two weeks.

---

## What you are building

One workflow with four jobs:

1. You **tell her who the new client is** and what they bought. That's
   the whole input.
2. She **drafts a warm welcome message** asking for exactly what you
   need.
3. She **builds a checklist** of what's needed before you start, one
   item per line.
4. She **flags anything you're still waiting on**, so it doesn't get
   forgotten in the rush.

Time to build: about 20 minutes. Cost: one AI (Claude) + your email or
whatever you send welcome messages from + a simple checklist doc or
sheet.

## The safety rules (read these first)

- 🟢 Green: the client's name and what they bought. That is the entire source of the welcome message and checklist.
- 🟠 Orange: the drafted welcome message and checklist itself, written from what you told her, never sent by her.
- 🔴 Red: she never sends the welcome message herself, and she never asks a client to write a password or sensitive access directly into a message. Those get flagged as "collect this securely," never requested in plain text.
- The rule that matters most: nothing goes out to a client until you have read it. She drafts, you send.

## Part 1 — Your standard checklist (10 minutes, no AI)

Do this even if you build nothing else:

1. Write down the 4-6 things you always need from a new client before
   you can start real work: access, assets, a signed agreement, a first
   call.
2. Write down the one thing new clients most often forget to send you.
   That becomes the one line your AI checklist always double-checks.
3. Decide where the checklist lives: a shared doc, a project tool, or
   just a note you update per client.

## Part 2 — The welcome and checklist brain (10 minutes)

With Claude (or your AI tool of choice) directly:

1. **Input**: the new client's name and what they bought or signed up
   for.
2. **AI step**: send it with the job description below. Copy it exactly,
   fill the blanks.

```
You are my client onboarding assistant. Here is my new client:
[CLIENT NAME], who bought [WHAT THEY BOUGHT OR SIGNED UP FOR].

My rules:
- Draft a warm, plain-English welcome message that thanks them and asks
  for [WHAT YOU NEED FROM THEM].
- Build a checklist of what's needed before we start work, one item per
  line.
- If something about this client isn't clear to you, ask me instead of
  guessing what they need.
- Do not invent requirements I did not list.

Return the welcome message and the checklist, nothing else.
```

3. **Review and send**: read the welcome message, edit anything that
   doesn't sound like you, and send it yourself.

## Part 3 — The weekly check (5 minutes)

Once a week, scan your open checklists for anything still unchecked past
a few days. That's Salma's flag, not a guess, an actual gap in what came
back from the client.

The feeling you are buying: no more retyping the same welcome email from
memory, and no more finding out three weeks in that a client never sent
the one thing you needed on day one.

## The upgrade path

Once onboarding feels smooth and repeatable, you have built trust with
your ninth AI employee. The same pattern, describe once, draft honestly,
flag the gaps, is how every AI employee in this system works. That is the
system my paid products install across a whole business.

---

*From the desk of Employee #012. Salma is AI, built by one human. The
only job she took was retyping the same welcome message and checklist for
every new client, from memory, every time.*
