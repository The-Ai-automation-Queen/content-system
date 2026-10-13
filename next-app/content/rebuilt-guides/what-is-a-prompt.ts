import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-is-a-prompt",
  lumailTag: "guide-what-is-a-prompt",
  title: "What Do I Type Into ChatGPT?",
  cover: "/images/guides/what-is-a-prompt.webp",
  coverAlt: "The blue robot mascot turning a rough note into ordered shapes with a brass instruction press",
  seoDescription: "What do I type into ChatGPT? Fill in 4 lines: the job, what it can use, what you want back, what to check. Then save prompts for your top 3 jobs.",
  tool: "ChatGPT",
  minutes: 20,
  h1: { title: "What Do I Type", accent: "Into ChatGPT?" },
  hero: {
    kind: "scene",
    src: "/images/guides/what-is-a-prompt.webp",
    alt: "The blue robot mascot turning a rough note into ordered shapes with a brass instruction press",
    line: "Four lines that work for any task.",
  },
  intro: {
    heading: "Four lines for any task",
    lead: "A short request makes ChatGPT guess. This guide gives you 4 lines that tell it what it needs. It takes 20 minutes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A 4-line prompt** you fill in for any task",
        "**One extra line** that makes ChatGPT ask you first",
        "**Ready prompts** for your 3 most common jobs",
        "**One prompt** tested on real work and fixed",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works, and Claude works too. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "ready prompts.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Learn the 4 lines", accent: "See the difference.", blocks: [
      { kind: "p", text: "A prompt is the message you type to the AI. A good one answers 4 questions." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and click **New chat**.",
        "Type: \"Write a follow-up email to a client.\" Press **Enter**.",
        "Read the answer. See how much it had to guess.",
      ] },
      { kind: "table", head: ["Line", "What to write", "Example"], rows: [
        ["1. The job", "What you want done, in one sentence", "Write a follow-up email to [client]"],
        ["2. What it can use", "Your notes or facts", "My call notes: [paste]"],
        ["3. What you want back", "Length, shape and tone", "Under 120 words, warm and direct"],
        ["4. What to check", "What it must not make up", "Use only my notes. Write [CHECK] for any price or date"],
      ] },
    ] },
    { num: "02", title: "Fill in the 4 lines", accent: "For one job this week.", blocks: [
      { kind: "p", text: "This works for any task. The last line makes ChatGPT ask when it needs more." },
      { kind: "list", ordered: true, items: [
        "Click **New chat**.",
        "Paste the prompt below. Change the [brackets] for one real job.",
        "Press **Enter**. Answer any questions it asks.",
      ] },
      { kind: "prompt", label: "The 4 lines", text: `THE JOB
[What you want done, in one sentence.]

WHAT YOU CAN USE
[Paste your notes. Write [client] instead of real names.]

WHAT I NEED BACK
[Length, shape and tone. For example: under 150 words, warm and direct.]

WHAT TO CHECK
Use only what I gave you. If something is missing, write [CHECK].
Never make up names, prices, dates or promises.

Before you answer, check you have enough details.
If something important is missing, ask me up to 3 questions and stop.` },
      { kind: "p", text: "Did it ask questions? Put those answers in line 2 next time." },
    ] },
    { num: "03", title: "Get 3 ready prompts", accent: "For your top jobs.", blocks: [
      { kind: "p", text: "Filling in blanks every time is slow. Let ChatGPT write a ready prompt for each top job." },
      { kind: "prompt", label: "Write my 3 ready prompts", text: `I run a small business: [what you sell and who to].
I want ready prompts for the 3 jobs I do most.

Ask me one question at a time and wait for my answer.
Ask no more than 8 questions, about:
- the 3 jobs I do most
- what I usually have to hand for each
- what a good result looks like
- what must never go wrong

Then write one prompt per job with 4 headings:
THE JOB, WHAT YOU CAN USE, WHAT I NEED BACK, WHAT TO CHECK.
Fill in what stays the same. Use [brackets] only where I paste new material.
In WHAT TO CHECK, always write: Use only what I paste. If something is missing, write [CHECK]. Never make up names, prices, dates or promises.
Give each prompt a short name, like "Enquiry: first reply".` },
      { kind: "list", ordered: true, items: [
        "Delete any line that asks for something you never have.",
        "Add anything you always include, like your booking link.",
        "Paste all 3 into one note called **Prompt library**.",
      ] },
    ] },
    { num: "04", title: "Test one on real work", accent: "Then fix the prompt.", blocks: [
      { kind: "p", text: "A prompt is only ready once it works on a real job." },
      { kind: "list", ordered: true, items: [
        "Copy this week's notes. Swap names for [client] and prices for [price].",
        "Click **New chat** and paste one ready prompt.",
        "Replace the [brackets] with your notes. Press **Enter**.",
        "Check every name, date and price is in your notes. Fill every [CHECK].",
      ] },
      { kind: "p", text: "Something wrong? Paste this in the same chat." },
      { kind: "prompt", label: "Fix the prompt", text: `This answer had a problem: [what was wrong].
Rewrite my prompt so this does not happen again.
Keep the 4 headings. Show me only the new prompt.` },
      { kind: "p", text: "Paste the new prompt into your note, in place of the old one." },
    ] },
    { num: "✓", title: "Checklist", accent: "Four boxes.", blocks: [
      { kind: "checklist", items: [
        "Saw the short request guess",
        "Filled in the 4 lines for one job",
        "Saved 3 ready prompts in one note",
        "Tested one on real work and fixed it",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know what to type.",
    accent: "Now make the answers better.",
    body: "Answers still average? The next guide shows what to give ChatGPT instead.",
    label: "Get better answers →",
    href: "/guides/ai-skills-worth-learning-for-work/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Say the job. Give it your notes. Say what you want back. Say what to check.",
    finishLine: "Four lines. Fewer guesses.",
  },
};
