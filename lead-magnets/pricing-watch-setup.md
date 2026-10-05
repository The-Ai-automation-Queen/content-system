# The Pricing Watch Setup

**Keyword: PRICE** | Pillar: Stop Doing That by Hand | Employee #039 (Sana) playbook

The complete setup for an AI employee that tells you the moment a named
competitor changes their pricing page, so you're never the last to
know. She never checks a page you didn't name or invents a price.

---

## What you are building

One workflow with four jobs:

1. You **give her the competitor's pricing page and today's prices**.
   That's the whole input.
2. She **compares it against what you last recorded**.
3. She **writes one line if anything changed**: what, from what, to
   what.
4. You **review it and decide what to do**. She never publishes
   anything or reacts on her own.

Time to build: about 10 minutes. The tools are boring on purpose: one
AI (Claude), the competitor's public pricing page.

## The safety rules (read these first)

- 🟢 Green: the competitor's public pricing page and your last recorded prices. That is the entire source.
- 🟠 Orange: the comparison and the one-line change flag she builds from it.
- 🔴 Red: she never visits a page you didn't name, never invents a price, and never posts or reacts publicly on her own.
- The rule that matters most: no price gets reported unless it's actually on the page. A quiet week beats a invented change.

## Part 1 — Record where things stand (5 minutes, no AI)

Do this even if you build nothing else:

1. Pick one or two named competitors and write down their current
   prices, tier by tier.
2. Note today's date next to the list.

## Part 2 — The watching brain (5 minutes)

With Claude (or your AI tool of choice) directly:

1. **Input**: the competitor's current page (copy the pricing section)
   and your last recorded prices from Part 1.
2. **AI step**: send it with the job description below. Copy it
   exactly, fill the blanks.

```
You are my pricing watcher. Here is a competitor's current pricing page
and what I last recorded: [TODAY'S PRICING PAGE TEXT; MY LAST RECORDED
PRICES AND DATE].

My rules:
- Compare the two, tier by tier.
- If nothing changed, say so in one line.
- If something changed, name the tier, the old price, and the new one.
- Never report a price that isn't actually on the page.

Return the comparison only.
```

3. **Review and decide**: check the flagged change against the real
   page yourself before acting on it.

## Part 3 — Check it on a schedule, not just when you remember (10 minutes)

Pick one day every week or two and run the check, whether or not you
think anything changed. A watcher that only runs when you're anxious
misses the quiet changes.

The feeling you are buying: you stop finding out about a price change
from a client mentioning it, and start seeing it the week it happens.

## The upgrade path

Once the watching feels routine, you have built trust with your
thirty-sixth AI employee. The same pattern, compare honestly, flag
plainly, never invent a price, is how every AI employee in this system
works. That is the system my paid products install across a whole
business.

---

*From the desk of Employee #039. Sana is AI, built by one human. The
only job she took was watching the pricing page I kept meaning to
check.*
