# The Contract Renewal Tracker Setup

**Keyword: CONTRACT** | Pillar: Stop Doing That by Hand | Employee #049 (Warda) playbook

The complete setup for an AI employee that tracks when a vendor
contract auto-renews, so you never miss the cancel window and pay for
another year you didn't want. She never cancels anything or invents a
renewal date you didn't give her.

---

## What you are building

One workflow with four jobs:

1. You **give her your vendor contracts**: who, renewal date, cancel-
   by date if there is one. That's the whole input.
2. She **checks each one against today's date**.
3. She **flags anything with a cancel window coming up**.
4. You **review it and decide yourself**, cancel or let it renew. She
   never cancels anything or contacts a vendor.

Time to build: about 10 minutes. The tools are boring on purpose: one
AI (Claude), the contracts you already have.

## The safety rules (read these first)

- 🟢 Green: your own list of vendor contracts, renewal dates, and cancel-by dates. That is the entire source.
- 🟠 Orange: the flagged list of upcoming windows she builds from it.
- 🔴 Red: she never cancels anything, never contacts a vendor, and never invents a renewal date or a cancel window you didn't give her.
- The rule that matters most: no date gets added unless you actually listed it. A short honest list beats a padded invented one.

## Part 1 — List what you're locked into (5 minutes, no AI)

Do this even if you build nothing else:

1. Write down every vendor contract you can think of: who, renewal
   date, cancel-by date if you know it.
2. Note today's date next to the list.

## Part 2 — The tracking brain (5 minutes)

With Claude (or your AI tool of choice) directly:

1. **Input**: your list from Part 1.
2. **AI step**: send it with the job description below. Copy it
   exactly, fill the blanks.

```
You are my contract renewal tracker. Here is my vendor list and
today's date: [VENDOR, RENEWAL DATE, CANCEL-BY DATE — repeat for each
one; TODAY'S DATE].

My rules:
- Flag anything with a cancel window in the next 30 days as urgent.
- Sort the rest by how soon the window opens.
- Never add a vendor or date I didn't give you.
- Never suggest whether to cancel or renew; that's my call.

Return the urgent list and the sorted rest only.
```

3. **Review and decide**: check the flagged dates against the real
   contracts, then cancel or renew yourself, your way.

## Part 3 — Refresh it whenever you sign something new (10 minutes)

Add every new vendor contract the day you sign it, while the renewal
terms are still in front of you. A tracker that misses new contracts
just becomes a false sense of safety.

The feeling you are buying: you stop finding out a contract renewed
itself the day the charge hits, and start seeing the window coming a
month out.

## The upgrade path

Once the tracking feels routine, you have built trust with your
forty-sixth AI employee. The same pattern, list honestly, flag
plainly, never invent a date, is how every AI employee in this system
works. That is the system my paid products install across a whole
business.

---

*From the desk of Employee #049. Warda is AI, built by one human. The
only job she took was tracking the cancel window before it quietly
closed on me.*
