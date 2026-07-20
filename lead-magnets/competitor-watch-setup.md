# The Competitor Watch Setup

**Keyword: WATCH** | Pillar: Stop Doing That by Hand | Employee #008 (Yara) playbook

The complete setup for an AI employee that ends the anxious tab-refreshing.
She checks your named competitors on a schedule, flags only real changes,
and sends you one weekly digest instead of a constant itch to check.

---

## What you are building

One workflow with four jobs:

1. Your competitors get **checked on a schedule**, not on your anxiety.
2. She **flags only real changes**: a new price, a new page, a new offer.
3. She **writes one plain line per change**, no spin, no jargon.
4. You get **one weekly digest**. Nothing pings you mid-day.

Time to build: about 35 minutes. Cost: a change-detection tool (many have
free tiers) + one AI (Claude) + your list of 3-5 real competitors.

## The safety rules (read these first)

- 🟢 Green: public page content, prices, product listings. Safe to check.
- 🟠 Orange: the summary wording itself. Drafted by the AI from what changed, never speculation about strategy.
- 🔴 Red: anything behind a login, anything that requires signing up as a "spy" account, anything that isn't public. The workflow only ever reads what any visitor could see.
- The rule that matters most: she never guesses at why a competitor changed something. She reports what changed, not what it means.

## Part 1 — The watch list (10 minutes, no AI)

Do this even if you build nothing else:

1. Name your 3-5 real competitors. Not aspirational ones, the ones a
   customer would actually compare you to.
2. For each, pick the 1-2 pages that matter most: their pricing page and
   their homepage are usually enough.
3. Write down what "a real change" means to you (new price, new feature
   listed, new testimonial) so the AI has a target, not a vague brief.

## Part 2 — The check and summarize brain (25 minutes)

In your automation tool (n8n, Make, or a change-detection service with a
webhook):

1. **Trigger**: schedule, once a week (or once a day if you want tighter
   coverage).
2. **Fetch**: the page content for each watched URL.
3. **Compare**: against last week's saved version. Most change-detection
   tools do this step for you natively.
4. **AI step**: if something changed, send the before/after to Claude with
   the job description below. Copy it exactly, fill the blanks.

```
You are my competitor watch analyst. Compare this page's old and new
content: [OLD VERSION] vs [NEW VERSION].

My rules:
- Report only real, meaningful changes: price, new page, new offer, new
  feature. Ignore cosmetic changes (typos, layout, minor wording).
- Write one plain-English sentence per real change. No speculation about
  their strategy or intent.
- If nothing meaningful changed, say exactly: "No meaningful changes this
  period."

Return the summary text only.
```

5. **Compile**: gather each competitor's line into one weekly digest,
   delivered to yourself (email, Telegram, or Slack).

## Part 3 — Keep it honest (5 minutes a month)

Once a month, check your watch list is still the right 3-5 competitors.
Businesses change what they compete with faster than they update a
spreadsheet.

The feeling you are buying: you stop refreshing a tab out of anxiety,
because you know the one real change, if there is one, will land in your
inbox on schedule.

## The upgrade path

Once the digest feels reliable and you trust it over your own checking,
you have built trust with your fifth AI employee. The same pattern, watch,
compare, summarize honestly, is how every AI employee in this system
works. That is the system my paid products install across a whole
business.

---

*From the desk of Employee #008. Yara is AI, built by one human. The only
job she took was the ten minutes an hour her boss spent refreshing a tab
hoping for news about someone else.*
