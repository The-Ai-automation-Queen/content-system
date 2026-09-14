# The NPS Analyst Setup

**Keyword: NPS** | Pillar: Stop Doing That by Hand | Employee #031 (Sara) playbook

The complete setup for an AI employee that reads every comment on your
survey, not just the number, so the pattern people are trying to tell
you stops sitting there unread. She never invents a theme that isn't
there.

---

## What you are building

One workflow with four jobs:

1. You **paste in the survey responses**: scores and comments. That's
   the whole input.
2. She **reads every comment and finds the themes that repeat**.
3. She **drafts one follow-up** for a detractor and one for a promoter.
4. You get **the top three fixable issues**, in plain language.

Time to build: about 10 minutes. Cost: one AI (Claude) + a batch of
survey responses you already have sitting somewhere.

## The safety rules (read these first)

- 🟢 Green: the survey responses you paste in. That is the entire source.
- 🟠 Orange: the theme digest and the drafted follow-ups she builds from it.
- 🔴 Red: she never sends a follow-up herself, and never invents a theme that wasn't actually in the comments.
- The rule that matters most: a theme needs enough real mentions to count as one. One angry comment is a data point, not a pattern.

## Part 1 — Pull the responses (5 minutes, no AI)

Do this even if you build nothing else:

1. Pull your last survey's responses together: the scores and, more
   importantly, the written comments.
2. Note anything that surprised you when it came in.

## Part 2 — The analysis brain (5 minutes)

With Claude (or your AI tool of choice) directly:

1. **Input**: the survey responses, scores and comments both.
2. **AI step**: send it with the job description below. Copy it
   exactly, fill the blanks.

```
You are my NPS analyst. Here are my survey responses: [PASTE THE
SCORES AND COMMENTS, AS MANY AS YOU HAVE].

My rules:
- Find the themes that repeat across multiple comments.
- Draft one follow-up for the clearest detractor, one for the clearest
  promoter.
- Report the top 3 fixable issues, in plain language.
- Never invent a theme that isn't actually in the comments.

Return the themes, the two drafted follow-ups, and the top 3 issues.
```

3. **Read and act**: send the follow-ups yourself if they feel right,
   and take the top 3 issues to whoever can actually fix them.

## Part 3 — Do it every cycle (10 minutes)

Every time you run a survey, run the same check. A single cycle's read
is useful; watching the same themes rise or fall cycle over cycle is
how you know if what you fixed actually worked.

The feeling you are buying: you stop glancing at a score and moving on,
and start knowing exactly what your customers are trying to tell you.

## The upgrade path

Once the analysis feels routine, you have built trust with your twenty-
eighth AI employee. The same pattern, read honestly, quote exactly,
never invent a pattern, is how every AI employee in this system works.
That is the system my paid products install across a whole business.

---

*From the desk of Employee #031. Sara is AI, built by one human. The
only job she took was reading every comment on the survey, not just the
number, and telling me the pattern I was missing.*
