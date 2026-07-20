# The SOP Writer Setup

**Keyword: SOP** | Pillar: Stop Doing That by Hand | Employee #011 (Idris) playbook

The complete setup for an AI employee that turns what's in your head into a
real document. You describe a process once, out loud or in writing, and he
turns it into a clean, numbered SOP, flagging anything unclear instead of
filling the gap with a guess.

---

## What you are building

One workflow with four jobs:

1. You **talk or type through a process once**, the way you'd explain it
   to a person.
2. He **turns it into numbered steps**, plain language.
3. He **flags anything unclear or missing a step**, and asks you.
4. You get **one clean document**, ready to hand to anyone.

Time to build: about 20 minutes. Cost: one AI (Claude) + a way to record
or type (your phone's voice memo app works fine) + a shared doc.

## The safety rules (read these first)

- 🟢 Green: the process description you give him. That is the entire source of the document.
- 🟠 Orange: follow-up questions he asks to fill a gap. Answered by you, added to the same document.
- 🔴 Red: any step he cannot confirm from what you told him. He never invents a step to make the document look complete.
- The rule that matters most: if you didn't say it, it doesn't go in the document. "Needs detail" is always the honest answer to a gap, never a guess.

## Part 1 — Pick one process (10 minutes, no AI)

Do this even if you build nothing else:

1. Pick one process you've explained more than once this year. Onboarding
   a new tool, handling a specific customer request, a weekly task, all
   work.
2. Decide how you'll describe it: a voice memo works best for most people,
   typing works too.
3. Just talk through it start to finish, the way you'd explain it to a
   new hire standing next to you. Don't worry about being organized, that's
   the next step's job.

## Part 2 — The structuring brain (10 minutes)

With Claude (or your AI tool of choice) directly, or wired into an
automation flow if you do this often:

1. **Input**: your voice memo transcript or typed description.
2. **AI step**: send it with the job description below. Copy it exactly,
   fill the blanks.

```
You are my SOP writer. Here is a process described in my own words:
[YOUR DESCRIPTION OR TRANSCRIPT].

My rules:
- Turn this into numbered steps, one action per step, plain language.
- If a step seems to be missing or unclear from what I said, do not fill
  it in. Mark it: "[NEEDS DETAIL: describe what happens here]".
- Do not add steps I did not describe, even if they seem obviously
  implied.
- End with a one-line summary of what "done" looks like for this process.

Return the formatted SOP only.
```

3. **Review**: read the document. Fill in any "[NEEDS DETAIL]" markers
   yourself, that's the one part only you can do.

## Part 3 — Store it where it's findable (5 minutes)

Save the finished SOP in one shared place (a shared drive folder, a wiki,
whatever your team already opens). One SOP is nice. A pile of them where
nobody can find them is the same problem you started with.

The feeling you are buying: the next time someone asks the question, you
send a link instead of explaining it again.

## The upgrade path

Once a handful of your most-repeated processes are documented this way,
you have built trust with your seventh AI employee. The same pattern,
describe once, structure honestly, flag the gaps, is how every AI employee
in this system works. That is the system my paid products install across
a whole business.

---

*From the desk of Employee #011. Idris is AI, built by one human. The only
job he took was the twenty minutes his boss spent re-explaining a process
she'd already explained a dozen times.*
