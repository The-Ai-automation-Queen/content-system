import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "ai-skills-worth-learning-for-work",
  lumailTag: "guide-ai-skills-worth-learning-for-work",
  title: "Why Are My ChatGPT Answers So Average?",
  cover: "/images/guides/ai-skills-worth-learning-for-work.webp",
  coverAlt: "The blue robot mascot carrying a compass, magnifier, key and gauge past changing machines",
  seoDescription: "Why are my ChatGPT answers so average? Because it is guessing. Give it your notes, tell it what you want back, and check it. Step by step, with prompts.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "Why Are My ChatGPT Answers", accent: "So Average?" },
  hero: {
    kind: "scene",
    src: "/images/guides/ai-skills-worth-learning-for-work.webp",
    alt: "The blue robot mascot carrying a compass, magnifier, key and gauge past changing machines",
    line: "Because it is guessing. Today you write one real client email with ChatGPT that you can send.",
  },
  intro: {
    heading: "Get an answer you can actually send",
    lead: "You ask ChatGPT for a follow-up email to a client. It comes back polite, long and vague. So you rewrite it yourself. The answer was average because ChatGPT knew nothing about the call, the client or what you wanted. In this guide you write one real follow-up email with ChatGPT, step by step. At the end you have an email you can send, and a saved set of rules so the next answer starts better.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**One real follow-up email**, written with ChatGPT and checked by you, ready to send",
        "**A copy-paste prompt** that makes ChatGPT ask you questions before it writes",
        "**A 2-minute check** that catches wrong names, dates and prices before a client sees them",
        "**Your rules saved in ChatGPT**, so every new chat already knows your business and your style",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer with a web browser, like Chrome.",
        "A ChatGPT account at [chatgpt.com](https://chatgpt.com). The free plan works.",
        "Your notes from one recent client call. Rough notes are fine: a few lines in a notebook or on your phone.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details. Write [client] instead of the real client name." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "better answers prompts.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "See the difference in 2 minutes", accent: "Same task, two ways of asking.", blocks: [
      { kind: "p", text: "First you see why the answer is average. You ask for the same email twice: once the usual way, once with details. Then you compare." },
      { kind: "h3", text: "A. Ask the usual way" },
      { kind: "list", ordered: true, items: [
        "Open [chatgpt.com](https://chatgpt.com) and sign in.",
        "Click **New chat** at the top left. On a small window, click the menu button (three lines) first.",
        "Click in the box at the bottom of the screen. It says **Ask anything** or **Message ChatGPT**.",
        "Type the line below and press Enter.",
      ] },
      { kind: "example", label: "What you type", text: "Write a follow-up email to my client after our call." },
      { kind: "result", label: "What you will probably get", lines: [
        "A long, polite email with \"I hope this email finds you well\".",
        "Made-up details, or gaps like [insert topic here].",
        "Nothing about your call, your client or your next step.",
      ] },
      { kind: "h3", text: "B. Ask again, with details" },
      { kind: "list", ordered: true, items: [
        "Click **New chat** again.",
        "Type the message below. Change the parts in [square brackets] to your real call. Keep it short.",
        "Press Enter.",
      ] },
      { kind: "example", label: "What you type", text: "Write a follow-up email to [client], who owns a [type of business]. We spoke on [day] about [what they need]. We agreed: [what you agreed]. Next step: [next step and date]. Under 120 words. Friendly and direct. No \"I hope this finds you well\". Do not add any price or promise I did not give you." },
      { kind: "result", label: "What you should see", lines: [
        "A short email about your real call.",
        "Your next step and date, in your words.",
        "Close to something you would send.",
      ] },
      { kind: "contrast", items: [
        { label: "The usual way", text: "One line. ChatGPT has to guess who, what, how long and what tone. So it guesses safe and vague.", good: false },
        { label: "With details", text: "Who the client is, what happened, what you want back and what not to do. Nothing left to guess.", good: true },
      ] },
      { kind: "p", text: "That is the whole secret: **ChatGPT gives average answers when it has to guess.** The rest of this guide shows you how to stop the guessing on every task, without typing all of this each time." },
      { kind: "tip", text: "Before you paste real notes, swap private details for brackets: [client], [price], [phone]. Put the real ones back in the final email yourself." },
    ] },
    { num: "02", title: "Let ChatGPT ask you questions", accent: "So you never forget a detail.", blocks: [
      { kind: "p", text: "You do not need to remember every detail it needs. Ask ChatGPT to interview you first. It asks, you answer, then it writes." },
      { kind: "list", ordered: true, items: [
        "Click **New chat**.",
        "Copy the prompt below and paste it into the box.",
        "Change [the task] to your task, for example \"a follow-up email after a first call\". Press Enter.",
        "ChatGPT asks you one question. Answer it in a few words and press Enter. Repeat until it stops asking.",
      ] },
      { kind: "prompt", label: "Ask me questions first", text: `I need help with [the task, for example: a follow-up email to a client after our first call].

Before you write anything, ask me the questions you need answered to do this well.
Ask one question at a time and wait for my answer.
Ask about: who it is for, what happened, what I want them to do next, the length, and the tone.
Ask no more than 6 questions.

When you have my answers, write it.
Use only what I tell you. If something is missing, write [CHECK] instead of guessing.
Never make up names, prices, dates or promises.` },
      { kind: "result", label: "What you should see", lines: [
        "Question 1: Who is the email for, and what kind of business do they run?",
        "You answer. Then question 2 appears, and so on.",
        "After the last answer: a short email built only from what you said.",
      ] },
      { kind: "tip", text: "**It wrote the email straight away, without questions?** Type: \"Stop. Ask me your questions first, one at a time.\" and press Enter." },
    ] },
    { num: "03", title: "Give it your notes", accent: "Your words, not its guesses.", blocks: [
      { kind: "p", text: "Answers get much better when ChatGPT can read your real notes. You paste them in and tell it exactly what you want back." },
      { kind: "list", ordered: true, items: [
        "Open your call notes. Select all the text and copy it (Ctrl + C on Windows, Cmd + C on a Mac).",
        "Swap private details for brackets: [client], [price], [phone].",
        "In ChatGPT, click **New chat**. Paste the prompt below.",
        "Paste your notes where it says [paste your notes here]. Press Enter.",
      ] },
      { kind: "prompt", label: "Write from my notes", text: `Here are my notes from a call with [client]:

[paste your notes here]

Write a follow-up email from me to [client].

What I want back:
- Under 120 words
- 1 line thanking them for the call
- 2 to 3 short lines on what we agreed
- 1 clear next step with a date
- Friendly and direct. Plain English. No "I hope this finds you well".

Rules:
- Use only what is in my notes.
- If something is missing, write [CHECK] instead of guessing.
- Never add a price, date or promise that is not in my notes.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Hi [client], thanks for the call on Tuesday.",
        "We agreed to start with your onboarding emails and keep the website for later. You will send me your current welcome email.",
        "Next step: I will send you a first draft by Friday [CHECK date].",
      ] },
      { kind: "p", text: "Copy the email into your email app. Do not send it yet. First you check it in step 04." },
    ] },
    { num: "04", title: "Check it before you send", accent: "2 minutes. Every time.", blocks: [
      { kind: "p", text: "ChatGPT can still get a detail wrong, even with your notes. This check finds it before your client does." },
      { kind: "h3", text: "A. Ask ChatGPT to list every fact" },
      { kind: "list", ordered: true, items: [
        "Stay in the same chat. Copy the prompt below and paste it. Press Enter.",
      ] },
      { kind: "prompt", label: "List every fact in the email", text: `List every fact in the email you just wrote: every name, date, number, price and promise.

For each one, make a table with 3 columns:
Fact | The exact words from my notes that it comes from | Found in my notes? (Yes / No)

If a fact is not in my notes, write No. Do not fix anything yet.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Tuesday | \"call Tues\" | Yes",
        "Onboarding emails first | \"start w/ onboarding emails\" | Yes",
        "Draft by Friday | (not in notes) | No",
      ] },
      { kind: "h3", text: "B. Check it yourself" },
      { kind: "list", ordered: true, items: [
        "Look at the last column. Find every **No**.",
        "Open your notes. Press **Ctrl + F** (Windows) or **Cmd + F** (Mac). Type a word from each fact to find it.",
        "Fix or delete every fact you cannot find in your notes.",
        "Fill in every [CHECK] yourself.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["Every fact says Yes, and you found them all", "The email is safe to send", "Read it once more and send it"],
        ["A fact says No", "ChatGPT added something", "Delete it, or replace it with what really happened"],
        ["A date or price you never mentioned", "ChatGPT guessed", "Delete it. Prices and dates are yours to set"],
        ["[CHECK] is still in the email", "A detail was missing", "Fill it in yourself before you send"],
      ] },
      { kind: "honest", text: "**The honest part:** ChatGPT writes the first draft. You decide what is true, what you promise and what you charge. Never send an email you have not read word for word." },
    ] },
    { num: "05", title: "Save your rules", accent: "So every chat starts better.", blocks: [
      { kind: "p", text: "You do not want to type \"under 120 words, no fluff, never invent a price\" every time. Save it once in ChatGPT's settings. Then every new chat follows it." },
      { kind: "list", ordered: true, items: [
        "In ChatGPT, click your name or profile picture. It is at the bottom left on most screens, top right on some.",
        "Click **Settings**, then **Personalization**.",
        "Click **Custom instructions**. You will see one or two text boxes.",
        "Copy the text below. Change the parts in [square brackets]. Paste it into the box that asks how ChatGPT should respond.",
        "Click **Save**.",
        "Can't find it? OpenAI moves these menus. Search \"custom instructions\" on [OpenAI's help pages](https://help.openai.com).",
      ] },
      { kind: "prompt", label: "My rules for every chat", text: `I run [type of business] for [who you help].
Write in plain English, short sentences, friendly and direct.
Keep emails under 150 words unless I ask for more.
No "I hope this finds you well" and no hype words.
If you need more details, ask me before you write.
Use only what I give you. If something is missing, write [CHECK].
Never make up names, prices, dates or promises.` },
      { kind: "h3", text: "Test it in 30 seconds" },
      { kind: "list", ordered: true, items: [
        "Click **New chat**.",
        "Type: \"Write a short email to [client] to book our next call.\" Press Enter.",
      ] },
      { kind: "result", label: "What you should see", lines: [
        "A short, plain email, or a question asking you for the date.",
        "No made-up date. No \"I hope this finds you well\".",
      ] },
      { kind: "tip", text: "**The answer ignores your rules?** Open the settings again and check you clicked Save. Then start a brand new chat. Old chats do not pick up new rules." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Asked for the same email two ways and saw the difference",
        "Used the ask-me-questions prompt on one real task",
        "Wrote one real follow-up email from your own notes",
        "Checked every fact and filled every [CHECK]",
        "Saved your rules in Custom instructions and tested them in a new chat",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your answers are better.",
    accent: "Now keep your clients safe.",
    body: "You will paste more real notes into ChatGPT now. The next guide shows what must never go in, and how to swap it out safely.",
    label: "See what never to share →",
    href: "/guides/what-should-you-never-share-with-ai/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Give ChatGPT your notes. Tell it what you want back. Let it ask you questions when you are not sure. Check every fact before you send.",
    finishLine: "No guessing in. No surprises out.",
  },
};
