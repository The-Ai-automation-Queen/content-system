import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-is-ai",
  lumailTag: "guide-what-is-ai",
  title: "What Can I Use AI For in My Business?",
  cover: "/images/guides/what-is-ai.webp",
  coverAlt: "The blue robot mascot at a loom that turns shapes into an ordered pattern",
  seoDescription: "What can I use AI for in my business? List the jobs in your week, get a ready prompt for each, and do one real job today. 5 steps.",
  tool: "ChatGPT or Claude",
  minutes: 25,
  h1: { title: "What Can I Use AI For", accent: "in My Business?" },
  hero: {
    kind: "scene",
    src: "/images/guides/what-is-ai.webp",
    alt: "The blue robot mascot at a loom that turns shapes into an ordered pattern",
    line: "Find the jobs in your week that AI can draft for you.",
  },
  intro: {
    heading: "Find the jobs AI can do",
    lead: "You hear AI can help, but not with which jobs. This guide finds them in your week and gives you a prompt for each. It takes 25 minutes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A list of your jobs**, safest ones first",
        "**A ready prompt** for each of your top 5 jobs",
        "**One real job done**, checked by you",
      ] },
      { kind: "tip", text: "You need a ChatGPT or Claude account. The free plan works. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "AI job list.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "See what AI can do", accent: "Five kinds of jobs.", blocks: [
      { kind: "p", text: "An AI assistant (a chat tool like ChatGPT or Claude) writes the first draft. You check it and decide." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) or [Claude](https://claude.ai/) and sign in.",
        "Read the table below.",
        "Write down every job you do each week.",
        "Circle the 3 that take longest, or that you put off.",
      ] },
      { kind: "table", head: ["Area", "Jobs AI can draft"], rows: [
        ["Admin", "Email replies, call notes into a to-do list, main points of a long document"],
        ["Clients", "Follow-up after a call, welcome email, sorting feedback by topic"],
        ["Sales", "Replies to new enquiries, first draft of a proposal"],
        ["Content", "Posts from rough ideas, short posts from one newsletter"],
        ["Planning", "Your weekly plan, a launch checklist from your notes"],
      ] },
      { kind: "p", text: "In every job, AI prepares and you decide. Prices, promises and what gets sent stay with you." },
    ] },
    { num: "02", title: "List your own jobs", accent: "It asks, you answer.", blocks: [
      { kind: "p", text: "The table is for any business. Now the AI asks about yours." },
      { kind: "list", ordered: true, items: [
        "Click **New chat**.",
        "Paste the prompt below and change the [brackets].",
        "Press **Enter**. Answer each question in a sentence or two.",
      ] },
      { kind: "prompt", label: "List my AI jobs", text: `I run a small business: [what you sell and who to].
Help me list the jobs in my week that AI could draft.

Ask me one question at a time and wait for my answer.
Ask no more than 8 questions, about:
- the tasks I repeat every week, and how long they take
- the tasks I put off
- client emails, proposals, notes, posts and planning

Then give me a table:
Job | What I paste in | What AI gives back | What I check | Hours per week | Risk if wrong (low, medium, high)

Put the most hours saved and lowest risk first. Star the top 5.
Use only what I tell you. If something is missing, write [CHECK].
Never make up names, prices, dates or promises.` },
      { kind: "list", ordered: true, items: [
        "Job missing? Type: \"Add [job].\"",
        "Risk too low? Type: \"Change the risk for [job] to high.\" You know your clients.",
        "Keep this chat open for step 03.",
      ] },
    ] },
    { num: "03", title: "Get a prompt per job", accent: "Copy and paste next time.", blocks: [
      { kind: "p", text: "A job on a list saves nothing until you have the words to ask for it." },
      { kind: "prompt", label: "Write a prompt for each top job", text: `Take the 5 starred jobs from my table.
For each one, write a prompt I can paste into a new chat every time.

Each prompt must:
- start with one line saying what the job is
- show what I paste in as [brackets], for example [paste the call notes]
- say the length and tone I want back
- end with: Use only what I paste. If something is missing, write [CHECK]. Never make up names, prices, dates or promises.

Keep each prompt short. Put the job name above each one.` },
      { kind: "list", ordered: true, items: [
        "Delete any line that asks for something you never have.",
        "Add anything you always include, like your booking link.",
        "Paste your table and the 5 prompts into one note called **AI job menu**.",
      ] },
    ] },
    { num: "04", title: "Do one real job", accent: "This week's work.", blocks: [
      { kind: "p", text: "One real job, done and checked, teaches you more than any list." },
      { kind: "list", ordered: true, items: [
        "Copy this week's notes for job 1 into a note.",
        "Swap names for [client], prices for [price], private dates for [date].",
        "Click **New chat** and paste your prompt for job 1.",
        "Replace the [brackets] with your notes. Press **Enter**.",
      ] },
      { kind: "p", text: "One line wrong? Stay in the same chat and paste this." },
      { kind: "prompt", label: "Fix one part", text: `Change this part: [paste the line].
Why it is wrong: [what is true].
Keep everything else the same.` },
      { kind: "p", text: "Made the same fix twice? Add it to that job's prompt in your note." },
    ] },
    { num: "05", title: "Check it before you send", accent: "2 minutes.", blocks: [
      { kind: "p", text: "AI sounds just as sure when it is wrong. Find the mistake before your client does." },
      { kind: "prompt", label: "List every fact", text: `List every name, date, price and promise in the draft you wrote.
For each one, show the words from my notes it comes from.
If it is not in my notes, write NOT IN NOTES.` },
      { kind: "list", ordered: true, items: [
        "Delete or fix every line marked **NOT IN NOTES**.",
        "Fill in every **[CHECK]** yourself.",
        "Read it out loud. Would you sign it?",
        "Put the real names back, then send.",
      ] },
      { kind: "honest", text: "**The honest part:** AI does not know which jobs matter most to your clients. It does not notice when a draft is wrong. You check it, decide and send it." },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Wrote down the jobs you do each week",
        "Got your own job list, top 5 starred",
        "Saved a prompt for each top job",
        "Did one real job this week",
        "Checked every fact and filled every [CHECK]",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know which jobs to hand over.",
    accent: "Now know what never goes in.",
    body: "You will paste real client work into AI now. The next guide shows what must never go in.",
    label: "See what never to share →",
    href: "/guides/what-should-you-never-share-with-ai/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "AI drafts the job. You check every fact. You send it.",
    finishLine: "Prepared by AI. Decided by you.",
  },
};
