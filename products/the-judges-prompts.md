# The Judge's Prompts
### Make AI prove its work before you trust it.

*by Fatiha Chikh — The AI Automation Queen · Shift & Lead*

---

## Why this exists

Every AI guru sells you speed. "Look how fast it builds!" Here's what they don't
show you: the part that matters to a real business owner — **how do you know
it's right?**

I spent 20+ years inside big corporate tech. The thing that environment beat
into me wasn't how to build — it was how to **verify**. Nothing shipped because
someone said it was done. It shipped because it proved it was done.

That's the mindset shift this pack installs: **you're not the builder anymore.
You're the judge.** AI does the work. These prompts are how you check it —
without doing the work yourself.

Every prompt here is one I actually use, running a business where 99 AI
employees do the work and I sign off on it. Copy, paste, adapt. Tool-agnostic:
they work in Claude, ChatGPT, Gemini, Copilot, anything.

---

## The 4 Upgrades — the framework behind the prompts

Most people use AI like an intern: give a task, accept the answer, hope. The
upgrade path:

1. **The Council** — make AI disagree with you *before* you build. One opinion
   is a guess; a panel with assigned opposing roles is a decision.
2. **Self-Verify** — never accept "done." Make it prove its work against
   explicit criteria — and hunt for its own mistakes.
3. **Full Context** — generic answers mean a starving AI. Feed it your real
   business (offers, voice, clients, constraints) before you ask.
4. **The Goal Run** — hand it an outcome, not a step. Then judge the outcome
   against the checklist you wrote *before* it started.

Every prompt below serves one of these four. Use the section that matches the
failure you're seeing.

---

## Part 1 — Council Prompts (decide before you build)

**1. The Devil's Advocate**
> Before I act on this, argue AGAINST it as strongly as you can. What breaks,
> what's the cost of being wrong, and what would a skeptic who dislikes this
> idea say? Only after that, tell me if you still recommend it and why.

*Use when: any decision that costs money or reputation if wrong.*

**2. The Three-Chair Panel**
> Answer this question three times, as three different experts: [a cautious CFO],
> [an aggressive growth marketer], [my most demanding customer]. Have them
> disagree where they honestly would. Then write the one-paragraph verdict that
> survives all three.

*Use when: strategy calls, pricing, positioning.*

**3. The Pre-Mortem**
> Assume this plan failed completely six months from now. Write the honest
> post-mortem: the three most likely reasons it failed, ranked. For each, what
> early warning sign would have shown up first?

*Use when: launching anything.*

**4. The Steelman Swap**
> Here are two options I'm choosing between: [A] and [B]. Steelman each one —
> the strongest honest case for it — before you compare. No verdict until both
> cases are made properly.

**5. The Missing Option**
> I've framed this as a choice between [A] and [B]. What option C am I not
> seeing? Give me two alternatives that reframe the problem, even if they seem
> unrealistic at first.

**6. The Assumption Audit**
> List every assumption baked into my request — things I've treated as true
> without saying so. Rank them by how wrong they'd have to be to change the
> answer. Flag the one you'd verify first.

**7. The Base-Rate Check**
> Before your recommendation: what usually happens when people in my situation
> try this? What's the honest base rate of success, and what separates the ones
> who succeed?

**8. The Confidence Ladder**
> Give your answer, then rate your confidence 1-10 and explain what information
> would move it up or down two points. If it's below 7, say what you'd need
> to check first.

**9. The Second Opinion (cross-tool)**
> [Paste output from one AI into another:] Another assistant produced this
> answer to my question. Review it as a rival expert: what did it get right,
> what did it miss, what would you have done differently?

**10. The Silent Disagreement Hunt**
> Read my plan. Where do you actually disagree with me but have been trained to
> be agreeable about it? Say the uncomfortable part plainly — I'm paying for
> the disagreement, not the encouragement.

---

## Part 2 — Self-Verify Prompts (never accept "done")

**11. Prove It's Done**
> You say this is complete. Prove it: walk through each requirement from my
> original request, quote the part of your output that satisfies it, and mark
> any requirement you only partially met. Be strict — a miss labeled as a miss
> is worth more to me than a claimed pass.

*The single most valuable prompt in this pack. Use on everything.*

**12. The Error Hunt**
> Before I use this, hunt your own output for errors: factual claims that could
> be wrong, numbers that don't add up, steps that skip something, names/dates
> you might have invented. List every suspect item with a risk rating.

**13. Source or Silence**
> Go back through your answer and mark every factual claim as either
> [VERIFIABLE — here's where] or [MY GENERATION — treat with caution]. Rewrite
> the answer keeping only what survives.

**14. The Nut-Free Check** *(from the Kitchen Map)*
> You've told me this is safe/correct/compliant. That's exactly the kind of
> claim that's dangerous when wrong. What would have to be true for your claim
> to hold? Which of those things have you actually verified vs assumed?

**15. Read It Back Cold**
> Read your output as if you'd never seen my request — as a stranger receiving
> it. What's confusing, what's missing context, what would make the stranger
> ask "wait, what about—"? Fix those before showing me again.

**16. The Edge-Case Sweep**
> What inputs or situations would break this? Give me the five most likely
> edge cases, and for each: does your solution handle it, fail loudly, or fail
> silently? Silent failures first.

**17. The Numbers Audit**
> Recompute every number in your answer from scratch, showing the arithmetic.
> If any number can't be recomputed from stated inputs, flag it as unverified.

**18. Two Drafts, One Judge**
> Produce two genuinely different versions of this. Then judge them against
> [my criteria] and tell me which wins, where, and what you'd steal from the
> loser.

**19. The Regression Check**
> You just changed [X]. What else in this document/plan/system did that change
> silently affect? Check every section that references or depends on it.

**20. Score It Before I Do**
> Score your own output against this rubric before I see it: [accuracy /
> completeness / voice match / usability, each /10]. Anything under 8, fix
> first and tell me what you changed.

---

## Part 3 — Full Context Prompts (stop starving your AI)

**21. The Interview First**
> Before you write anything: interview me. Ask the 5-7 questions whose answers
> would most change the result. Don't start until I've answered.

*Use when: any important deliverable from a cold start.*

**22. What Am I Not Telling You?**
> Based on what I've asked, what context are you missing that would most
> improve your answer? List what you'd want to know about my business, audience,
> and constraints — I'll fill in the blanks.

**23. The Voice Calibration**
> Here are three things I've written that sound like me: [paste]. Describe my
> voice in 6 rules, then keep those rules visible and follow them in everything
> you produce for me in this conversation.

**24. The Constraint Load**
> Before answering, restate my constraints back to me: budget, time, tools I
> use, things I refuse to do. If I haven't given you some, ask. Solutions that
> ignore constraints are worthless to me.

**25. The Audience Stand-In**
> My reader is [a non-technical corporate professional who's overwhelmed by AI].
> Before you answer me, describe that person's day, fears, and vocabulary in
> three lines — then answer *for them*, not for me.

**26. Business Brain Load**
> Here's my business context: [paste your offers, audience, voice rules].
> Confirm you've absorbed it by summarizing my business back to me in 4 lines —
> including the thing you'd say I care most about. Then we start.

**27. The Definition Lock**
> We keep using the word [X]. Define what YOU mean by it, I'll correct it, and
> we lock that definition for the rest of this work. Misaligned definitions are
> where wrong answers hide.

**28. Refresh the Context**
> We're deep in this conversation. Summarize: what we've decided, what's open,
> and what constraints are active. I'll correct any drift — then we continue
> from the corrected summary.

---

## Part 4 — Goal-Run Prompts (judge outcomes, not steps)

**29. The Acceptance Test (write it first)**
> Before you start: write the checklist I should use to judge whether your
> result is acceptable. I'll approve or edit the checklist — then do the work
> and grade yourself against it.

*The judge's core move: define "done" before the work exists.*

**30. The Handoff Brief**
> You're about to do this multi-step job. First give me: the steps you'll take,
> what you'll produce at each, and where you might need my judgment. I'll flag
> where I want a checkpoint.

**31. The Checkpoint Gate**
> Stop at [step]. Show me what you have, list what changed from the plan, and
> wait for my go before continuing. Don't optimize past a gate.

**32. Judge the Runner**
> [After a long task:] Here was the goal: [paste]. Here's the checklist we
> agreed: [paste]. Grade the result item by item — pass, partial, fail — with
> evidence quoted for each grade. No narrative, just the grading table first.

**33. The Diff Report**
> Compare what you delivered against what I asked for. Three lists: delivered
> as asked / delivered differently (and why) / not delivered (and why). The
> middle list is where trust is won or lost.

**34. The Rollback Plan**
> Before we ship this change: if it turns out wrong, what exactly do we undo,
> in what order, and what can't be undone? If anything is irreversible, flag it
> now — irreversible needs my explicit sign-off.

**35. The Unattended Rule**
> You'll do this while I'm away. Rules: [what you may do freely], [what waits
> for my approval], [what you must never do]. Repeat the rules back, then begin.

---

## Part 5 — The Sensitive-Work Set (money, clients, reputation)

**36. The Client-Facing Gate**
> This will be read by a client. Before I see it: check it for anything that
> overpromises, anything that could embarrass me if screenshot, and anything
> that doesn't sound like me. Rewrite those parts and show me what you changed.

**37. The Money Math Proof**
> This involves money. Show every calculation, state every assumption with its
> source, and mark clearly which numbers are estimates. Then tell me the
> worst-case if each estimate is 30% off.

**38. The Legal Humility Check**
> Does any part of this touch legal, tax, or compliance territory? Mark those
> sections [PROFESSIONAL REVIEW NEEDED] — and never present them as settled
> advice.

**39. The Screenshot Test**
> If this exact text were screenshot and posted publicly with my name on it,
> what's the worst honest reading of it? Fix anything that fails that test.

**40. The Send-Delay Judgment**
> I'm about to send this while [annoyed/excited/tired]. Read it as the
> recipient. What lands differently than I intend? What would 'tomorrow-me'
> soften or cut?

---

## The Judge's Daily Habit (bonus)

**41. The Morning Brief**
> Each morning: list what you completed since yesterday, what you're blocked
> on, and the ONE decision only I can make today. Nothing else.

**42. The Friday Receipts**
> It's Friday. Give me the week's receipts: tasks completed, hours saved
> (honest estimate with reasoning), anything you got wrong and how it was
> caught. The 'got wrong' section is mandatory — empty means you didn't look.

---

## How to use this pack

- **Don't use all 42.** Pick the three that match your current failure mode.
  Most people need #11 (Prove It's Done), #21 (Interview First), and #29
  (Acceptance Test) — that trio alone changes everything.
- **Chain them:** Council before building → Context while building →
  Self-Verify after → Goal-Run for anything unattended.
- **Adapt the brackets** [like this] to your business. The prompts get
  stronger every time you make them more specific.

You're not behind. You were just never taught to judge.
Now you have the gavel.

— Fatiha

---

*© 2026 Fatiha Chikh / Shift & Lead. Original IP. For the buyer's personal or
single-business use. Redistribution, resale, or use as AI training data
prohibited. Free updates included — this pack improves as the kitchens change.*
