import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "ai-skills-worth-learning-for-work",
  lumailTag: "guide-ai-skills-worth-learning-for-work",
  title: "Why Are My ChatGPT Answers So Average?",
  cover: "/images/guides/ai-skills-worth-learning-for-work.webp",
  coverAlt: "The blue robot mascot carrying a compass, magnifier, key and gauge past changing machines",
  seoDescription: "Why are my ChatGPT answers so average? 3 things to do differently: tell it more, check it, keep your decisions. Try all 3 on one real task.",
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
    lead: "Here is the problem. You ask ChatGPT for a follow-up email to a client. It comes back polite, vague and a bit wrong. So you fix it by hand and decide AI is not worth it. Most average answers have one of 3 causes: it was told too little, nobody checked it, or it made choices that are yours. This guide fixes each cause on one real task. You end with 3 short habits you use every time.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**The reason your last answer was average**, and the fix for it",
        "**A short list of questions to answer before ChatGPT writes**, so it stops guessing",
        "**A way to check every fact in a draft** against your own notes",
        "**One real task split in two**: what ChatGPT writes, and what you decide",
        "**All 3 habits saved in one note**, ready for every task that matters",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer. These steps are for a web browser, like Chrome.",
        "A ChatGPT account at [chatgpt.com](https://chatgpt.com). The free plan works. Everything here also works in Claude.",
        "One task you do every week, with real notes for it. For example, a follow-up email after a client call, or a first draft of a proposal.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details. Type [client] instead of real client names." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "better answers routine.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Find why your last answer was average", accent: "5 minutes.", blocks: [
      { kind: "p", text: "Each average answer has a cause you can fix. First you find a recent answer you did not use. Then you match it to its cause." },
      { kind: "h3", text: "A. Find your last unused answer" },
      { kind: "list", ordered: true, items: [
        "Open [chatgpt.com](https://chatgpt.com) and sign in.",
        "Look at the left side of the screen. You will see a list of your past chats, newest at the top. On a small window, click the menu button at the top left first.",
        "Click a chat where you did not use the answer. It opens on the right.",
        "Scroll up to your first message. Read what you typed.",
        "No past chats yet? Think of a time you asked AI something and the answer was not useful.",
      ] },
      { kind: "h3", text: "B. Match it to its cause" },
      { kind: "list", ordered: true, items: [
        "Read the left column of the table below.",
        "Find the row that fits your chat. More than one can fit.",
        "Write the cause in a note. The last column tells you which step fixes it.",
      ] },
      { kind: "table", head: ["Why the answer was average", "The fix", "Step"], rows: [
        ["You asked in one line, so it guessed the rest", "Let it ask you questions first", "02"],
        ["It had none of your notes", "Paste your notes, emails or files", "02"],
        ["You did not say what you wanted back", "Tell it the length, layout and tone", "02"],
        ["It sounded right, so you did not check", "Check each fact against your notes", "03"],
        ["It made your choice: a price, a promise, a tone", "ChatGPT writes, you decide", "04"],
      ] },
      { kind: "contrast", items: [
        { label: "Your first message, probably", text: "\"Write a follow-up email to my client.\"", note: "One line, no notes, no length, nothing to check.", good: false },
        { label: "What it needed", text: "Who the client is, your call notes, the length and tone, and what it must not promise.", good: true },
      ] },
      { kind: "h3", text: "C. Pick your task for this guide" },
      { kind: "p", text: "Pick one task you do every week. You use it in every step, so you can see what each habit changes. Write it in one line in your note." },
      { kind: "example", label: "What you write in your note", text: "My task: a follow-up email to [client] after our first call. My notes are in my notebook from Tuesday." },
      { kind: "tip", text: "Before you paste real notes, swap real details for brackets: [client], [price], [date]. Put the real ones back in the final version yourself." },
    ] },
    { num: "02", title: "Tell it more: let it ask you first", accent: "Habit 1.", blocks: [
      { kind: "p", text: "Most average answers come from a short request. The fastest fix is simple. Let ChatGPT ask what it needs before it writes." },
      { kind: "h3", text: "A. Let it ask you questions" },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left. It may show as a small pencil icon.",
        "Copy the prompt below and paste it into the chat box.",
        "Change the part in [square brackets] to your task from step 01.",
        "Press **Enter**. ChatGPT asks its first question.",
        "Answer it and press **Enter**. When it asks for notes, paste your real notes with names swapped for [client].",
      ] },
      { kind: "prompt", label: "Ask me first", text: `I need: [the task, for example a follow-up email to a client after our first call].

Before you write anything, ask me up to 6 questions you need answered to do this well. Cover:
- who it is for and what they already know
- the notes you should work from (I will paste them)
- the one thing it must do
- layout, length and tone
- anything you must not say or promise

Ask one question at a time and wait for each answer. Then write it.

Rules: use only what I tell you. Write [CHECK] where details are missing instead of guessing. Never invent names, prices, dates or promises. Plain English.` },
      { kind: "result", label: "What a good first question looks like", lines: [
        "\"Who is this email for, and what did you talk about on the call?\"",
      ] },
      { kind: "h3", text: "B. Keep the questions for next time" },
      { kind: "list", ordered: true, items: [
        "When the draft is done, stay in the same chat.",
        "Copy the prompt below and paste it in. Press **Enter**.",
      ] },
      { kind: "prompt", label: "Turn the questions into a list I can use again", text: `List the questions you asked me in this chat as a short list I can use again for any task.
One line per question, under 15 words each, 8 lines at most.
Add one line at the end: "Ask me anything else you need before you start."` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "1. Who is it for, and what do they already know?",
        "2. What notes should you work from?",
        "3. What is the one thing it must do?",
        "4. How long, what layout, what tone?",
        "5. What must you not say or promise?",
        "Ask me anything else you need before you start.",
      ] },
      { kind: "list", ordered: true, items: [
        "Click the **copy** button under the answer (two small squares).",
        "Paste it into your note under the heading **Questions before it writes**.",
        "Next time, answer these questions in your first message. Then ChatGPT can skip straight to the draft.",
      ] },
    ] },
    { num: "03", title: "Check every fact", accent: "Habit 2.", blocks: [
      { kind: "p", text: "An answer can sound right and still be wrong. Here ChatGPT lists every fact in the draft and shows where it is in your notes. Then you check its work." },
      { kind: "h3", text: "A. Ask for a fact check" },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left. A fresh chat checks with fresh eyes.",
        "Copy the prompt below and paste it into the chat box.",
        "Delete [paste the draft] and paste the draft from step 02 in its place.",
        "Delete [paste your notes, email or document] and paste the notes you gave it.",
        "Press **Enter**.",
      ] },
      { kind: "prompt", label: "Check each fact", text: `Check this answer against the source I've pasted.

List every claim in the answer: each fact, number, name, date and promise.
For each one, give me a table with these columns:
Claim | Supported, not supported or contradicted | The exact sentence from the source that shows it

Be strict. If the source doesn't say it, mark it not supported.
Do not rewrite the answer. Do not add new facts.

Answer: [paste the draft]
Source: [paste your notes, email or document]` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Thank you for your time on Tuesday | Supported | \"Call with [client], Tuesday\"",
        "We'll start next Monday | Not supported | (no sentence)",
        "The fee is [price] | Supported | \"Quoted [price] for the full project\"",
      ] },
      { kind: "h3", text: "B. Check it yourself" },
      { kind: "p", text: "The check can be wrong too. So test 2 rows by hand." },
      { kind: "list", ordered: true, items: [
        "Pick 2 rows marked **Supported**.",
        "Copy 4 or 5 words from the quoted sentence.",
        "Open your notes. Press **Ctrl + F** on Windows, or **Cmd + F** on a Mac. Paste the words and press **Enter**.",
        "The words light up if they are there. Read the line around them. Does it say the same thing as the draft?",
        "Then go to every row marked **not supported** or **contradicted**. Fix or delete that part of the draft.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["Not supported", "The fact is not in your notes", "Delete it, or add the real fact yourself"],
        ["Contradicted", "Your notes say something else", "Use what your notes say"],
        ["Supported, but the words don't light up with Ctrl + F", "The check made up the quote", "Treat that fact as not supported"],
        ["Nothing marked at all", "It may have missed something", "Check names, numbers and dates by hand anyway"],
      ] },
      { kind: "p", text: "Copy the fact-check prompt into your note under the heading **Fact check**. Use it on anything you send to a client." },
    ] },
    { num: "04", title: "Keep your decisions", accent: "Habit 3.", blocks: [
      { kind: "p", text: "Some parts of a task need you. The price. The promise. How you talk to this client. Here ChatGPT splits your task in two, so it only writes the rest." },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left.",
        "Copy the prompt below and paste it into the chat box.",
        "Change the part in [square brackets]. Describe your task in 2 to 4 lines, with names swapped for [client].",
        "Press **Enter**.",
      ] },
      { kind: "prompt", label: "Split my task", text: `Here's a task from my business: [describe it in 2 to 4 lines, with real names swapped for brackets].

Split it into two lists:
1. What AI could draft or prepare for me
2. What I should decide or do myself, and why, in one line each

Mark with [RISK] any part where a mistake could cost me a client, money or trust.
Be honest. If a part should not be done by AI at all, say so.
Use only what I tell you. Plain English.` },
      { kind: "example", label: "What you type", text: "Here's a task from my business: reply to an unhappy client, [client], about a late delivery. They emailed this morning and they are upset." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "1. AI can draft: the apology, a clear new timeline from your notes.",
        "2. You decide: whether to offer something back [RISK], the tone with this client, and whether to call instead of email [RISK].",
      ] },
      { kind: "list", ordered: true, items: [
        "Read the second list. Those parts stay with you every time.",
        "Copy the second list into your note under the heading **I decide**.",
        "Next time you brief ChatGPT on this task, add one line: \"Leave these for me: [paste your I decide list].\"",
      ] },
    ] },
    { num: "05", title: "Save the 3 habits in one note", accent: "Use them on every task that matters.", blocks: [
      { kind: "p", text: "The 3 habits work best together. Keep them in one note, so you can use them in a minute." },
      { kind: "list", ordered: true, items: [
        "Open your notes app. Make one note called **Better answers routine**.",
        "Type the 3 lines from the table below at the top.",
        "Under them, paste your **Questions before it writes** list, your **Fact check** prompt and your **I decide** list.",
      ] },
      { kind: "table", head: ["Line", "What you do"], rows: [
        ["1. Tell it more", "Answer the questions list, or paste the \"Ask me first\" prompt"],
        ["2. Check every fact", "Run the fact check, then test 2 rows with Ctrl + F"],
        ["3. Keep your decisions", "Prices, promises and client choices stay on your I decide list"],
      ] },
      { kind: "h3", text: "If you see Projects in ChatGPT" },
      { kind: "p", text: "A Project is a folder in ChatGPT that keeps your files and rules together. Free plans may have fewer Projects, or none." },
      { kind: "list", ordered: true, items: [
        "Look at the left side of ChatGPT. Click **Projects**, then **New project**.",
        "Type the name **Better answers** and click **Create project**.",
        "Paste your note into the project's **Instructions**. Every chat you start inside it then follows the routine.",
        "Can't find Projects? OpenAI moves these menus. Search \"projects\" on [OpenAI's help pages](https://help.openai.com/). The note works on its own.",
      ] },
      { kind: "honest", text: "**The honest part:** better prompts give better drafts. They still need you. You know your clients, your prices and your promises. That is what clients pay you for." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Found the cause of your last average answer",
        "One real task briefed with the \"Ask me first\" prompt",
        "Questions list saved in your note",
        "Fact check run on the draft, and 2 rows tested by hand with Ctrl + F",
        "Every not supported fact fixed or deleted",
        "Task split, and your I decide list saved",
        "Better answers routine saved in a note or a Project",
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
    paragraph: "Use the 3 habits on every task for a client. Add any question you keep answering to your questions list. Keep your I decide list up to date.",
    finishLine: "Tell it more, check every fact, keep your decisions.",
  },
};
