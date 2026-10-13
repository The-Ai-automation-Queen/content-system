import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "ai-skills-worth-learning-for-work",
  lumailTag: "guide-ai-skills-worth-learning-for-work",
  title: "Why Are My ChatGPT Answers So Average?",
  cover: "/images/guides/ai-skills-worth-learning-for-work.webp",
  coverAlt: "The blue robot mascot carrying a compass, magnifier, key and gauge past changing machines",
  seoDescription: "Why are my ChatGPT answers so average? 3 things to do differently: tell it more, check it, keep your decisions. Save them as steps for real work.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "Why Are My ChatGPT Answers", accent: "So Average?" },
  hero: {
    kind: "scene",
    src: "/images/guides/ai-skills-worth-learning-for-work.webp",
    alt: "The blue robot mascot carrying a compass, magnifier, key and gauge past changing machines",
    line: "3 things to do differently for better answers. You try all 3 on one real task.",
  },
  intro: {
    heading: "Three habits, tried on one real task",
    lead: "Average answers have 3 usual causes. You asked too little. You did not check the draft. Or the AI made choices that are yours. This guide fixes each one: brief it, check it, keep what's yours. You try all 3 on one real task and save them.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "Why your answers come back average, and the fix for each cause",
        "A **briefing checklist**: the questions ChatGPT needs answered first",
        "A **check prompt** that checks each fact against your notes",
        "One real job split: what AI writes, and what you decide",
        "All 3 saved as a **3-line routine** for every task that matters",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. The prompts also work in Claude. You can copy and paste every prompt below. Change the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Briefing Checklist.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Find the cause", accent: "Why the answer is average.", blocks: [
      { kind: "p", text: "Each average answer has a cause you can fix. This table shows the usual causes. It gives the fix and the step that covers it." },
      { kind: "list", ordered: true, items: [
        "Think of the last ChatGPT answer you did not use.",
        "Find its cause in the left column.",
        "Pick one task you do every week. For example, a follow-up email or a proposal. You use it in every step.",
      ] },
      { kind: "table", head: ["Why the answer is average", "The fix", "Skill"], rows: [
        ["You asked in one line, so it guessed the rest", "Let it ask you questions first", "Brief it"],
        ["It had none of your notes", "Paste your notes, emails or files", "Brief it"],
        ["You did not say what you wanted back", "Tell it the length, layout and tone", "Brief it"],
        ["It sounded right, so you did not check", "Check each fact against your notes", "Check it"],
        ["It made your choice: a price, a promise, a tone", "AI writes, you decide", "Keep what's yours"],
      ] },
      { kind: "tip", text: "Before you paste, swap real details for brackets: [client], [price], [date]. Put the real ones back in the final version." },
    ] },
    { num: "02", title: "Brief it", accent: "Let it interview you.", blocks: [
      { kind: "p", text: "Most average answers come from a short request. The fastest fix is simple. Let ChatGPT ask what it needs before it writes." },
      { kind: "list", ordered: true, items: [
        "Open a new chat.",
        "Paste the prompt below. Add the weekly task you picked in step 01.",
        "Answer each question. Paste your real notes where it asks. Type [client] instead of real names.",
      ] },
      { kind: "prompt", label: "Interview me first", text: `I need: [the task, for example a follow-up email to a client after our first call].

Before you write anything, ask me up to 6 questions you need answered to do this well. Cover:
- who it is for and what they already know
- the notes you should work from (I will paste them)
- the one thing it must do
- layout, length and tone
- anything you must not say or promise

Ask one question at a time and wait for each answer. Then write it.

Rules: use only what I tell you. Write [CHECK] where details are missing instead of guessing. Never invent names, prices, dates or promises. Plain English, no em dashes.` },
      { kind: "p", text: "When the draft is done, ask for your briefing checklist in the same chat:" },
      { kind: "prompt", label: "Turn it into my briefing checklist", text: `List the questions you asked me in this chat as a briefing checklist I can use again for any task.
One line per question, under 15 words each, 8 lines at most.
Add one line at the end: "Ask me anything else you need before you start."` },
      { kind: "p", text: "Save the checklist in your notes as **Briefing checklist**. Next time, answer it in your first message. Then you can skip the questions." },
    ] },
    { num: "03", title: "Check it", accent: "Claim by claim.", blocks: [
      { kind: "p", text: "An answer can sound right and still be wrong. This prompt checks each fact in the draft against what you gave it." },
      { kind: "list", ordered: true, items: [
        "Open a new chat, so it checks with fresh eyes.",
        "Paste the prompt below. Add the draft from step 02 and the notes you gave it.",
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
      { kind: "p", text: "Fix or delete every claim that is not supported. Save this prompt in your notes as **Check prompt**. Use it on anything you send to a client." },
      { kind: "tip", text: "**Nothing marked?** Check the names, numbers and dates yourself anyway. The check prompt helps you look. You still decide." },
    ] },
    { num: "04", title: "Keep what's yours", accent: "Split the job.", blocks: [
      { kind: "p", text: "Some parts of a task need you. The price. The promise. How you talk to this client. This prompt splits the task, so AI only writes the rest." },
      { kind: "list", ordered: true, items: [
        "Open a new chat.",
        "Paste the prompt below. Describe your weekly task in a few lines.",
        "Read the second list. Those parts stay with you every time.",
      ] },
      { kind: "prompt", label: "Split my task", text: `Here's a task from my business: [describe it in 2 to 4 lines, with real names swapped for brackets].

Split it into two lists:
1. What AI could draft or prepare for me
2. What I should decide or do myself, and why, in one line each

Mark with [RISK] any part where a mistake could cost me a client, money or trust.
Be honest. If a part should not be done by AI at all, say so.
Use only what I tell you. Plain English, no em dashes.` },
      { kind: "p", text: "Copy the second list into your briefing checklist. Put it under a heading called **I decide**. Next time, those parts stay out of the draft." },
    ] },
    { num: "05", title: "Save the routine", accent: "Three lines, every task.", blocks: [
      { kind: "p", text: "The 3 skills work best together. Use them as one short routine on every task that matters." },
      { kind: "list", ordered: true, items: [
        "Open your notes. Make one note called **Better answers routine**.",
        "Paste the 3 lines from the table below at the top.",
        "Under them, paste your **Briefing checklist** and your **Check prompt**.",
        "**Do you see Projects in the left sidebar?** Projects are folders in ChatGPT that keep your files and rules. Paste the note into a project's rules. Every chat in it then follows the routine. No Projects? The note works on its own.",
      ] },
      { kind: "table", head: ["Line", "What you do"], rows: [
        ["1. Brief it", "Answer the briefing checklist, or paste \"Interview me first\""],
        ["2. Check it", "Run the check prompt before anything goes to a client"],
        ["3. Keep what's yours", "Prices, promises and client choices stay on your I decide list"],
      ] },
      { kind: "honest", text: "**The honest part:** better prompts give better drafts. They still need you. You know your clients, your prices and your promises. That is what clients pay you for." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Found the cause of your last average answer",
        "Briefed one real task with the interview prompt",
        "Saved your briefing checklist",
        "Ran the check prompt on the draft and saved it",
        "Split the task and wrote your I decide list",
        "Saved the 3-line routine in your notes or a project",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your answers are better.",
    accent: "Now keep your clients safe.",
    body: "You will paste more real work into ChatGPT now. The next guide shows what must never go in. It also shows how to swap it out safely.",
    label: "See what never to share →",
    href: "/guides/what-should-you-never-share-with-ai/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Use the 3-line routine on every task for a client. Add any question you keep answering to your briefing checklist. Keep your I decide list up to date.",
    finishLine: "Brief it, check it, keep what's yours.",
  },
};
