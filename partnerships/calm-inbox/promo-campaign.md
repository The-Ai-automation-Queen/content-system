# Promo Engine — 8-Week Campaign + Podcast One-Pager

**Purpose:** fill the workshop (20 seats) and the pod (10 seats) over the
summer window. The brief's logic: summer = breathing space = the moment
professionals will actually reflect and redesign before September.

**The tension every post plays on (from the brief):** people fall into two
traps — they **avoid AI** because it feels overwhelming, or they **use AI for
everything** and drown in prompting, rewriting and second-guessing. Both cost
time; both create cognitive load. We sell the third way.

**Mechanics (all automated by this repo):**
- `content-engine` drafts each week's pieces into `content-vault.md` from the
  angles below (both LinkedIn-first for Fatiha's bridge audience, and a
  short-video variant for IG/TikTok). Tessa gets a co-post version to publish
  natively — same idea, her voice, never a copy-paste duplicate.
- CTA on every piece: **"Comment CALM"** → `dm-responder` sends the **Calm
  Inbox Kit** (the 5 prompts + PPP card + blueprint, from
  `participant-handout.md`) → GHL captures the email → nurture sequence →
  workshop invite. Keyword row lives in `lead-magnets.csv` (flip to
  `active=yes` once the Kit is hosted).
- Weeks 5–8 switch the CTA to the workshop/pod booking link directly.
- `performance-tracker` Lessons decide which hook style weeks 5–8 double down on.

Patterns referenced below are from `inspiration-library/SKILL.md`.

| Wk | Theme (from brief) | Lead hook (LinkedIn) | Short-video hook (IG/TT) | Pattern | Pillar | CTA |
|---|---|---|---|---|---|---|
| 1 | Is AI actually saving you time? | "AI saves me about 12 hours a week. It also once cost me 3. Nobody posts about the second number." | "You spent 40 minutes prompting a task that takes 10 by hand. Be honest." | P1 provocation + P11 specific number | What's Worth It | Comment CALM |
| 2 | The hidden cost of bad AI habits | "New productivity killer, nobody's naming it: prompt perfectionism. You're not working with AI, you're performing for it." | "POV: your 5th rewrite of an AI draft that was fine the first time." | P14 contrarian operational | Real Talk / What's Worth It | Comment CALM |
| 3 | Your inbox isn't the problem | "Your inbox isn't the problem. The 200 micro-decisions it demands before lunch are." | "It's not the emails. It's what they do to your nervous system." (Tessa co-post week) | P1 provocation | Stop Doing That by Hand | Comment CALM |
| 4 | What should AI never do? | "I automate almost everything. Here are 3 things I refuse to let AI touch — on purpose." | "The tasks I keep doing manually. Yes, on purpose." | P14 contrarian + P7 vulnerability | Real Talk | Comment CALM |
| 5 | The Human + AI Operating System | "You don't need more AI tools. You need an operating system: when to use it, when not to, and how to stay human doing both." | Result-first: show the one-page OS filled in, then explain it | P12 named framework + P10 result-first | Build Once, Runs Forever | Workshop link |
| 6 | Behind the scenes | "How we actually use AI — including what we deliberately don't use it for." (joint piece, both accounts) | Screen-share micro-demo: one of the 5 prompts eating a real thread | P10 result-first demo | Time Wins | Workshop link |
| 7 | Summer Reset | "Everyone redesigns their life in January. The smart ones do it in the quiet of August." | "Your inbox is quiet right now. That's the window." | P2 fear/urgency (soft) | The Freedom Business | Workshop link |
| 8 | Ready for September | "September you will inherit whatever August you builds. 20 seats. One workshop. Bring your laptop." | Before/after: last cohort quote + numbers | P13 before/after + P5 comment-trigger | The Freedom Business | Workshop/pod link |

**Volume per week:** 1 LinkedIn post (Fatiha) + 1 short video (Fatiha) +
1 native co-post (Tessa) + cross-comments on each other's posts within the
first hour. That's enough; capped-room offers don't need a content firehose,
they need consistency and one clear door.

**Workshop-week extras (whenever W lands):** 1 "what to expect" story
sequence, 1 seats-left post (only if true — no fake scarcity, per
positioning's no-engagement-bait rule), and the post-event recap piece from
the share-out quote captured in runbook §3.

---

## Podcast one-pager — "AI Meets the Human Mind"

**Premise (from the brief, verbatim spirit):** not another prompts-and-
productivity conversation. AI can save hours — and waste them. It can create
clarity — and create overthinking, endless prompting, information overload.
The interesting question isn't whether AI is good or bad; it's **when, why,
and for whom.** Not AI versus humans — helping people become better humans
while working with increasingly capable AI.

**Format:** 45–60 min, co-hosted (Fatiha = the evidence and the builds,
Tessa = the mind and the nervous system). Works as a guest spot on an
existing show or episode 1 of a co-branded mini-series — decision open
(README §6).

**Three acts (the brief's 11 questions, grouped):**

**Act 1 — The productivity illusion (~20 min)**
- When does AI genuinely save time — and when is it another distraction?
- Are we more productive, or just producing more?
- Can AI increase perfectionism by making endless iteration possible?
- *Receipts:* Fatiha's real numbers — hours saved by the content engine, and
  an honest story of hours lost to over-prompting.

**Act 2 — Your brain on AI (~20 min)**
- What happens to our brain when every decision has an AI option?
- Why do some people become dependent while others use it as a thinking partner?
- How do we prevent AI from replacing critical thinking?
- How do you regulate your nervous system working with AI all day?
- *Tessa's lane:* decision fatigue, activation vs. busyness, the reactivity loop.

**Act 3 — The intentional operator (~15 min)**
- How do you know when to trust AI and when to trust your own judgement?
- What habits integrate AI without cognitive overload? What role do
  reflection, boundaries and recovery play?
- What opportunities open for professionals who build both technical AND
  human capability?
- *Landing:* the balanced take — opportunities and risks both real; the edge
  goes to people who train intentionality, confidence, and judgement.

**Sound bites to plant (clip-ready for `reels-factory`):**
1. "AI handles the volume. Your nervous system handles the response."
2. "You're not working with AI — you're performing for it."
3. "Busy is a schedule state. Activated is a body state."
4. "AI can't fix a task that shouldn't exist."
5. "The future belongs to people who know when to use AI, when not to, and how to stay human doing both."

**CTA:** Comment/DM CALM for the Calm Inbox Kit → workshop → pod. Episode
drops ~3 weeks before workshop date (README §5 timeline).
