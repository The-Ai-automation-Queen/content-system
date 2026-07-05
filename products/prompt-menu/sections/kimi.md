---
kitchen: Kimi
tagline: The kitchen that puts 300 sous-chefs on one ticket, at a fraction of the bill.
---

## Starters (4) - first wins, 5 minutes each

### S1. Fix this function without breaking anything else
PROMPT:
```
Here is a function from my codebase. Review it for bugs, edge cases, and
readability, then rewrite it.

[paste the function, remove any API keys, tokens, or customer data first]

Rules:
1. Keep the same function name and inputs/outputs unless you tell me why they
   need to change.
2. List every bug you found, in plain English, before you show the fix.
3. Write 3 test cases that would have caught the worst bug.
4. Flag anything you're not fully sure about instead of guessing silently.
```
WHEN: Any time you have working-but-shaky code and want a second pair of eyes before you ship it.

### S2. Turn a screenshot into a working page
PROMPT:
```
I'm attaching a screenshot of a page design [attach the image; blur or crop
out any real names, emails, or account numbers first].

Turn it into working code:
1. Match the layout, spacing, and colors as closely as you can.
2. Use plain HTML/CSS unless I tell you a framework (React, Vue, etc.).
3. Make it responsive down to mobile width.
4. Tell me anywhere you had to guess (a font, an exact color, hidden content)
   so I know what to double-check.
```
WHEN: You have a design, a competitor page, or a whiteboard sketch and want a real first draft in minutes instead of starting from a blank file.

### S3. Explain this error like I'm mid-panic
PROMPT:
```
I'm getting this error and I don't know why:

[paste the exact error message and the 10-15 lines of code around it, with
any secrets or client identifiers replaced by [REDACTED]]

Walk me through:
1. What this error actually means, in one plain sentence.
2. The most likely cause given my code.
3. The exact fix, ready to paste in.
4. One thing to check afterward to confirm it's really fixed, not just quiet.
```
WHEN: You hit a wall mid-build and need the fastest possible path back to working code.

### S4. Turn a rough idea into a spec Kimi can actually build from
PROMPT:
```
I have an idea for a small tool/feature: [describe it in 2-3 sentences, no
client names, just the shape of the thing].

Before you write any code, turn this into a short build spec:
1. What it does, in one paragraph.
2. The inputs and outputs.
3. 3 things that would make this "done."
4. Anything you'd need me to clarify before starting.

Then wait for my go-ahead before writing code.
```
WHEN: Every autonomous coding session, long or short, goes better when it starts from a spec instead of a vibe. Five minutes here saves an hour later.

## Mains (6) - real business work

### M1. Turn a messy client update into a clean status email
PROMPT:
```
Here are my rough notes from this week on a client project:

[paste your notes, replace the client's real name with [Client] and round
any dollar figures or dates to the nearest sensible unit]

Write a short status email to [Client] that:
1. Opens with what's done, not what's pending.
2. Covers blockers in one honest line each, no jargon.
3. Ends with exactly what I need from them next, if anything.
4. Reads like a person wrote it, not a report generator.
```
WHEN: End of week or end of sprint, when you need to sound organized in under two minutes.

### M2. Deep Research a decision before you spend money on it
PROMPT:
```
I'm deciding between a few options for [describe the decision: a tool, a
vendor, a platform, a hire, no real company names needed].

Options to compare: [list 3-5 options]

Do a Deep Research pass and come back with:
1. A short table: option, strongest case for it, strongest case against it.
2. Which one you'd pick if you were me, and why, in plain language.
3. What would change your answer (a different budget, team size, timeline).
4. Sources or reasoning behind each claim, not just assertions.
```
WHEN: Any time a decision is big enough to deserve 20 minutes of real digging instead of a gut call.

### M3. Turn a client call transcript into next steps
PROMPT:
```
Here's a rough transcript or my notes from a call with [Client]:

[paste the notes, with [Client] standing in for the real name and no
account numbers, contract values, or personal details included]

Give me:
1. A 3-bullet summary of what was actually decided.
2. A list of action items with who owns each one: [Me] or [Client].
3. One thing that was said but never resolved, so it doesn't get lost.
4. A short recap message I could send [Client] within the hour.
```
WHEN: Right after any client call, while it's still fresh enough to catch what would otherwise slip.

### M4. Build a one-page project plan from a rough brief
PROMPT:
```
Here's the rough brief for a project: [describe scope, timeline, and goal in
plain terms, rounded numbers only, no real client or company name].

Turn this into a one-page plan:
1. 3-5 phases, each with a one-line goal.
2. A rough time estimate per phase (in days or weeks, not exact dates).
3. The single biggest risk to watch for.
4. What "done" looks like, in one sentence.

Keep it short enough that I could paste it straight into an email.
```
WHEN: Kicking off new work, especially when the client brief itself was vague and you need to hand them back something concrete.

### M5. Generate a working slide deck outline from a brief
PROMPT:
```
I need a slide deck on: [topic, in one sentence]
Audience: [who's in the room, e.g. "a client's ops team", not real names]
Goal: [what they should believe or do after watching]

Build me:
1. A slide-by-slide outline, 8-12 slides, one line of content per slide.
2. A one-sentence "so what" for each slide, the point it's actually making.
3. Where a chart, screenshot, or diagram would do more than text.
4. A closing slide that ends on the actual ask, not a generic thank-you.
```
WHEN: You need a deck fast and would rather edit a strong draft than stare at a blank slide.

### M6. Audit a piece of client-facing copy before it goes out
PROMPT:
```
Here's copy I'm about to send or publish for [Client]:

[paste the copy, with [Client] replacing the real name and no real pricing
or personal claims left in]

Review it for:
1. Anywhere it overpromises or makes a claim I couldn't defend if asked.
2. Anywhere it's vague when it could be specific.
3. One line that could be cut entirely without losing meaning.
4. A tightened rewrite, same length or shorter.
```
WHEN: Before anything client-facing goes out the door, especially copy you wrote fast and haven't re-read yet.

## Chef's Specials (3) - only this kitchen can cook these

### C1. Agent Swarm: build a full multi-page site in one pass
PROMPT:
```
I want a multi-page marketing site for [describe the business in one
sentence, no real name needed, e.g. "a local bakery" or "a B2B consulting
firm"].

Pages needed: [list them, e.g. home, about, services, contact]

With Agent Swarm on, assign a different agent to each page and have them
work in parallel. For each page, come back with:
1. The working code for that page.
2. How it connects to the others (nav, shared styling).
3. One thing that's still a placeholder and needs my real content.

Tell me up front if any page needs client logos, photos, or real copy before
it can be finished, so I know what to gather.
```
WHEN: You need a full working site draft in one sitting instead of one page at a time. This is the dish no other kitchen on the menu can plate the same way.

### C2. Set it loose for an unsupervised overnight refactor
PROMPT:
```
Here's a part of my codebase that's grown messy over time [describe the
folder or module, no real client names or secrets, share only the code
itself with any keys or tokens replaced by [REDACTED]].

I want you to run an autonomous refactor:
1. First, tell me your plan: what you'll touch, what you won't, and why.
2. Then refactor for readability and consistency without changing behavior.
3. Add or update tests so I can verify nothing broke.
4. At the end, give me a plain-English changelog of everything you touched,
   long enough that I can review it in one sitting even if the session ran
   for hours.

Do not touch anything outside the scope I gave you, even if you spot other
issues. Just list those separately for me to approve later.
```
WHEN: You have a real backlog of technical debt and hours to let it run unsupervised, the way a 13-hour overnight refactor actually plays out here.

### C3. Deep Thinking: stress-test a plan before you commit to it
PROMPT:
```
Here's a plan I'm about to commit to: [describe it in a few sentences,
rounded numbers, no real client or company names].

Turn on Deep Thinking and reason through this as carefully as you can before
answering:
1. Walk through the plan step by step and find the weakest link.
2. Think through 2 ways this could fail that I haven't mentioned.
3. Tell me what would have to be true for this plan to actually work.
4. Give me your honest read: would you commit to this as written, or change
   something first?

Show your reasoning, not just the final verdict.
```
WHEN: A decision is big enough that you want the chef to actually plan before cooking, not just answer fast.

## Verify (2) - make it prove its work

### V1. Make it show its work, not just its confidence
PROMPT:
```
Look back at your last answer in this conversation.

1. Point out anything you stated as fact that you're not fully certain about.
2. If you cited a library, tool, source, or fact, tell me plainly whether you
   actually verified it exists or whether you're pattern-matching from
   training.
3. Rate your own confidence in the answer, low, medium, or high, and say why.
4. If you'd tell a paying client this exact answer with your name on it,
   say so. If not, tell me what you'd change first.
```
WHEN: Right after any answer you're about to act on, especially generated code or a cited claim you haven't checked yourself.

### V2. Catch the yes-chef problem before it costs you
PROMPT:
```
Here's something I built or wrote, and I want your honest opinion, not a
polite one: [paste the work, redacted of any client name, real numbers, or
personal data].

1. If there's a real problem with this, say so plainly, don't soften it.
2. Tell me the single weakest part, even if the rest is strong.
3. If you'd normally just say "looks good," stop and actually check it first.
4. Give me one thing you'd change if this were your name on it, not mine.
```
WHEN: Any time you suspect the answer you're about to get is the agreeable one, not the accurate one.

The full verification system lives in The Judge's Prompts.
