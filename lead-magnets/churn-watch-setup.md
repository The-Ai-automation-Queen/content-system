# The Churn Watch Setup

**Keyword: CHURN** | Pillar: Stop Doing That by Hand | Employee #015 (Ziad) playbook

The complete setup for an AI employee that reads a quiet client's pattern
and tells you honestly whether it's a real risk or just a quiet week,
before the decision is already made. He never contacts a client himself.

---

## What you are building

One workflow with four jobs:

1. You **describe how the client has been showing up lately**: replies,
   usage, tone. That's the whole input.
2. He **reads it against what normal looked like for them**.
3. He **says plainly** whether this looks like a real risk or a normal
   quiet patch.
4. If it's a risk, he **suggests one honest save action**, a check-in,
   never a discount.

Time to build: about 15 minutes. Cost: one AI (Claude) + whatever notes
you already keep on your clients (even a rough mental picture works to
start).

## The safety rules (read these first)

- 🟢 Green: the behavior you describe, reply speed, usage, tone, anything that changed. That is the entire input.
- 🟠 Orange: his risk read and the one suggested save action, built from what you told him.
- 🔴 Red: he never reaches out to the client himself, and never offers a discount or refund on your behalf. That is always your call and your message.
- The rule that matters most: he never guesses at why a client has gone quiet. If there isn't enough information to say, he says so instead of inventing a reason.

## Part 1 — Know your baseline (5 minutes, no AI)

Do this even if you build nothing else:

1. Pick the one client you haven't heard from in the longest stretch.
2. Write down how they normally show up: how fast they usually reply,
   how often they use what you sell them, their usual tone.
3. Write down what's different right now.

## Part 2 — The risk-read brain (10 minutes)

With Claude (or your AI tool of choice) directly:

1. **Input**: how the client has been behaving lately, and how they
   normally behave.
2. **AI step**: send both with the job description below. Copy it
   exactly, fill the blanks.

```
You are my churn watch analyst. Here is how this client has been
behaving lately: [DESCRIBE REPLIES, USAGE, TONE, ANYTHING THAT
CHANGED]. Compared to how they normally are:
[DESCRIBE THEIR NORMAL PATTERN].

My rules:
- Say plainly whether this looks like a real risk or a normal quiet
  patch.
- If it's a risk, suggest one honest save action, a check-in, not a
  discount.
- Never guess at why they've gone quiet, name what you don't know.
- If there's not enough information, say so instead of guessing.

Return the risk read and the one suggested action only.
```

3. **Act**: if it's flagged as a real risk, send the check-in yourself,
   in your own words.

## Part 3 — The monthly sweep (10 minutes)

Once a month, run this same check on any client you haven't personally
spoken with in a while. Most will come back "normal quiet patch." The
ones that don't are worth catching early.

The feeling you are buying: you stop losing clients silently, because
you asked the question while there was still time to do something about
it.

## The upgrade path

Once the risk reads feel reliable, you have built trust with your
twelfth AI employee. The same pattern, describe honestly, read the
pattern, suggest one real action, is how every AI employee in this
system works. That is the system my paid products install across a
whole business.

---

*From the desk of Employee #015. Ziad is AI, built by one human. The
only job he took was noticing a client had gone quiet before it was too
late to ask why.*
