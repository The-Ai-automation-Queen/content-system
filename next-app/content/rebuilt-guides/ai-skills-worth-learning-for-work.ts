import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "ai-skills-worth-learning-for-work",
  lumailTag: "guide-ai-skills-worth-learning-for-work",
  title: "Why Are My ChatGPT Answers So Average?",
  cover: "/images/guides/ai-skills-worth-learning-for-work.webp",
  coverAlt: "The blue robot mascot carrying a compass, magnifier, key and gauge past changing machines",
  seoDescription: "Why are my ChatGPT answers so average? 3 things to do differently: brief it, check it, keep what's yours. Save them as a routine for real work.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "Why Are My ChatGPT Answers", accent: "So Average?" },
  hero: {
    kind: "scene",
    src: "/images/guides/ai-skills-worth-learning-for-work.webp",
    alt: "The blue robot mascot carrying a compass, magnifier, key and gauge past changing machines",
    line: "The 3 things to do differently to get better answers. You practise all 3 on one real task from your week.",
  },
  intro: {
    heading: "Three habits, practised on one real task",
    lead: "Average answers usually come from a thin request, an unchecked draft, or AI deciding things that should be yours. This guide gives you a fix for each: brief it, check it, and keep what's yours. You practise all 3 on one task from your week and save them as a routine.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A clear view of why your answers come back average, and the fix for each cause",
        "A **briefing checklist**: the questions ChatGPT needs answered before it writes",
        "A **check prompt** that tests an answer claim by claim against your source",
        "A task split for one real job: what AI drafts, and what you decide",
        "All 3 saved as a **3-line routine** you use on every task that matters",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works, and the prompts also work in Claude. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Briefing Checklist.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Find the cause", accent: "Why the answer is average.", blocks: [
      { kind: "p", text: "Each average answer has a cause you can fix. This table matches the usual causes to the fix, and to the skill in this guide that covers it." },
      { kind: "list", ordered: true, items: [
        "Think of the last ChatGPT answer you didn't use.",
        "Find its cause in the left column.",
        "Pick one task you do every week, for example a follow-up email, a reply to an enquiry or a proposal. You'll use it in every step.",
      ] },
      { kind: "table", head: ["Why the answer is average", "The fix", "Skill"], rows: [
        ["The request was one line, so it guessed the rest", "Let it interview you before it writes", "Brief it"],
        ["It had none of your material to work from", "Paste your notes, emails or documents", "Brief it"],
        ["You didn't say what you wanted back", "Give it the format, length and tone", "Brief it"],
        ["It sounded right, so you didn't check it", "Check each claim against your source", "Check it"],
        ["It made a decision that was yours: a price, a promise, a tone with a client", "Split the job: AI drafts, you decide", "Keep what's yours"],
      ] },
      { kind: "tip", text: "Swap real details for brackets before you paste: [client], [price], [date]. You put the real ones back in the final version." },
    ] },
    { num: "02", title: "Brief it", accent: "Let it interview you.", blocks: [
      { kind: "p", text: "Most average answers come from a thin request. The fastest fix is to let ChatGPT ask what it needs before it writes anything." },
      { kind: "list", ordered: true, items: [
        "Open a new chat.",
        "Paste the prompt below, with the weekly task you picked in step 01.",
        "Answer each question. Paste real material where it asks, with names swapped for [client].",
      ] },
      { kind: "prompt", label: "Interview me first", text: `I need: [the task, for example a follow-up email to a client after our discovery call].

Before you write anything, ask me up to 6 questions you need answered to do this well. Cover:
- who it is for and what they already know
- the material you should work from (I will paste it)
- the one thing it must achieve
- format, length and tone
- anything you must not say or promise

Ask one question at a time and wait for each answer. Then write it.

Rules: use only what I tell you. Write [CHECK] where information is missing instead of guessing. Never invent names, prices, dates or promises. Plain English, no em dashes.` },
      { kind: "p", text: "When the draft is done, ask for your briefing checklist in the same chat:" },
      { kind: "prompt", label: "Turn it into my briefing checklist", text: `List the questions you asked me in this chat as a briefing checklist I can reuse for any task.
One line per question, under 15 words each, maximum 8 lines.
Add one line at the end: "Ask me anything else you need before you start."` },
      { kind: "p", text: "Save the checklist in your notes as **Briefing checklist**. Next time, answer it in your first message and skip the interview." },
    ] },
    { num: "03", title: "Check it", accent: "Claim by claim.", blocks: [
      { kind: "p", text: "An answer can sound right and still be wrong. This prompt tests each claim in the draft against what you gave it." },
      { kind: "list", ordered: true, items: [
        "Open a new chat, so it checks with fresh eyes.",
        "Paste the prompt below, then the draft from step 02 and the material you gave it.",
        "Read every line marked **not supported** or **contradicted**.",
      ] },
      { kind: "prompt", label: "Check each claim", text: `Check this answer against the source I've pasted.

List every claim in the answer: each fact, number, name, date and promise.
For each one, give me a table with these columns:
Claim | Supported, not supported or contradicted | The exact sentence from the source that shows it

Be strict. If the source doesn't say it, mark it not supported.
Do not rewrite the answer. Do not add new facts.

Answer: [paste the draft]
Source: [paste your notes, email or document]` },
      { kind: "p", text: "Fix or delete every claim that isn't supported. Save this prompt in your notes as **Check prompt**. You'll use it on anything that goes to a client." },
      { kind: "tip", text: "**Nothing flagged?** Check the names, numbers and dates yourself anyway. The check prompt helps you look; you still decide." },
    ] },
    { num: "04", title: "Keep what's yours", accent: "Split the job.", blocks: [
      { kind: "p", text: "Some parts of a task need your judgement: the price, the promise, how you speak to this client. This prompt splits the task so AI only drafts the rest." },
      { kind: "list", ordered: true, items: [
        "Open a new chat.",
        "Paste the prompt below with your weekly task described in a few lines.",
        "Read the second list. Those parts stay with you every time.",
      ] },
      { kind: "prompt", label: "Split my task", text: `Here's a task from my business: [describe it in 2 to 4 lines, with real names swapped for brackets].

Split it into two lists:
1. What AI could draft or prepare for me
2. What I should decide or do myself, and why, in one line each

Flag with [RISK] any part where a mistake could cost me a client, money or trust.
Be honest. If a part should not be done by AI at all, say so.
Use only what I tell you. Plain English, no em dashes.` },
      { kind: "p", text: "Copy the second list into your briefing checklist under a heading **I decide**. Next time you brief this task, those parts stay out of the draft." },
    ] },
    { num: "05", title: "Save the routine", accent: "Three lines, every task.", blocks: [
      { kind: "p", text: "The three skills work best as one short routine you run on every task that matters." },
      { kind: "list", ordered: true, items: [
        "Open your notes and make one note called **Better answers routine**.",
        "Paste the 3 lines in the table below at the top.",
        "Under the 3 lines, paste your **Briefing checklist** and your **Check prompt**.",
        "**If you see Projects in the left sidebar,** you can also add the note to a project's instructions, so every chat in it follows the routine. If you don't, the note works on its own.",
      ] },
      { kind: "table", head: ["Line", "What you do"], rows: [
        ["1. Brief it", "Answer the briefing checklist, or paste \"Interview me first\""],
        ["2. Check it", "Run the check prompt against your source before anything goes to a client"],
        ["3. Keep what's yours", "Prices, promises and client decisions stay on your I decide list"],
      ] },
      { kind: "honest", text: "**The honest part:** better prompts make better drafts, and they still need you. The judgement about your clients, your prices and your promises stays with you, and that is what makes the work worth paying for." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Found the cause of your last average answer",
        "Briefed one real task with the interview prompt",
        "Briefing checklist saved",
        "Check prompt run on the draft and saved",
        "Task split done, with your I decide list",
        "3-line routine saved in your notes or a project",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your answers are better.",
    accent: "Now keep your clients safe.",
    body: "You're about to paste more real work into ChatGPT. The next guide shows exactly what never goes in, and how to swap it out safely.",
    label: "See what never to share →",
    href: "/guides/what-should-you-never-share-with-ai/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Run the 3-line routine on every task that goes to a client, add any question you keep answering to your briefing checklist, and keep your I decide list up to date.",
    finishLine: "Brief it, check it, keep what's yours.",
  },
};
