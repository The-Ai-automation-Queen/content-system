import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "ai-jargon-guide",
  lumailTag: "guide-ai-jargon",
  title: "What Do AI Words Like \"Agent\" and \"Hallucination\" Mean?",
  cover: "/images/guides/learn-master.webp",
  coverAlt: "The blue robot mascot shining a brass lens on an open book, turning words into clear shapes",
  seoDescription: "What do AI words like agent and hallucination mean? 6 words in plain English, a short chat test for each, and a one-page cheat sheet. 5 steps.",
  tool: "ChatGPT or Claude",
  minutes: 20,
  h1: { title: "What Do AI Words Like \"Agent\" and", accent: "\"Hallucination\" Mean?" },
  hero: {
    kind: "scene",
    src: "/images/guides/learn-master.webp",
    alt: "The blue robot mascot shining a brass lens on an open book, turning words into clear shapes",
    line: "Six AI words in plain English, and a short test for each.",
  },
  intro: {
    heading: "Six AI words, made plain",
    lead: "People say agent and hallucination, and you nod along. This guide explains 6 words and shows each one in a chat. It takes 20 minutes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**Six AI words** you can explain in one line",
        "**A made-up answer** you caught yourself",
        "**Your memory setting** found and checked",
        "**A one-page cheat sheet** with a question for each word",
      ] },
      { kind: "tip", text: "You need a ChatGPT or Claude account. The free plan works. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "AI cheat sheet.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Learn the six words", accent: "One short table.", blocks: [
      { kind: "p", text: "Each word changes how far you can trust an answer. Read them once." },
      { kind: "table", head: ["Word", "Plain meaning", "Why it matters"], rows: [
        ["Hallucination", "The AI makes something up and sounds sure", "A made-up fact looks just like a real one"],
        ["Source", "Where a fact came from: a file, a web page, your notes", "Open it yourself before you tell a client"],
        ["Context window", "Everything the AI can see in this one chat", "In a long chat it can lose early details"],
        ["Memory", "A setting that may keep details between chats", "Know if it is on"],
        ["Agent", "AI that does steps by itself: clicking, filling in, sending", "It can act without you"],
        ["Connector", "A link that lets AI into your email, files or calendar", "It can read client details"],
      ] },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) or [Claude](https://claude.ai/) and sign in.",
        "For each word, write one job in your business where it matters.",
      ] },
    ] },
    { num: "02", title: "Catch a made-up answer", accent: "Hallucination and source.", blocks: [
      { kind: "p", text: "You ask about a book that does not exist. Watch what the AI does." },
      { kind: "list", ordered: true, items: [
        "Click **New chat**.",
        "Paste the prompt below. Press **Enter**.",
      ] },
      { kind: "prompt", label: "Ask about a made-up book", text: `Summarise the business book "The Velvet Ledger" by Orla Penrith.
Give me its 3 main lessons for small business owners.
Then give me a link to a real source that shows this book exists.
If you can't, tell me which parts you made up.` },
      { kind: "list", ordered: true, items: [
        "A summary with no real link? It made it up. The book does not exist.",
        "Got a link? Click it. Check the title and author are on the page.",
        "Before you tell a client a fact, ask where it came from. Then open it.",
      ] },
    ] },
    { num: "03", title: "Test its memory", accent: "Context window and memory.", blocks: [
      { kind: "p", text: "One chat can see what you told it. A new chat may not." },
      { kind: "list", ordered: true, items: [
        "Click **New chat**. Paste the prompt below. Press **Enter**.",
        "Click **New chat** again. Type: \"What is my next workshop called? If you don't know, say so.\"",
      ] },
      { kind: "prompt", label: "Tell it something", text: `Remember this: my next client workshop is called Bluebird and it runs on Friday.` },
      { kind: "list", ordered: true, items: [
        "It says it doesn't know? Memory is off, or it did not save this.",
        "It says Bluebird? Memory is on.",
        "ChatGPT: click your name, then **Settings**, then **Personalization**, then **Memory**.",
        "Claude: click your name, then **Settings**, then **Capabilities**.",
        "Either way, paste key details into each new chat. Don't count on memory.",
      ] },
      { kind: "tip", text: "Can't find it? The menus move. Search \"memory\" on [OpenAI's help pages](https://help.openai.com/en/articles/8590148-memory-faq) or [Claude's help centre](https://support.claude.com/)." },
    ] },
    { num: "04", title: "Answers versus actions", accent: "Agent and connector.", blocks: [
      { kind: "p", text: "A chat gives you words to send. An agent with a connector can act in your email or calendar." },
      { kind: "prompt", label: "Answer or action?", text: `Explain the difference between these two requests in 3 lines:
1. "Write a reply to [client] saying I can't make Thursday's call."
2. "Decline Thursday's call with [client] in my calendar and email them to rebook."

Then tell me:
- what an AI needs access to for the second one
- what could go wrong for a small business
- 3 rules to set before AI acts in my email or calendar
Plain English.` },
      { kind: "list", ordered: true, items: [
        "Click your name, then **Settings**.",
        "Open **Apps** or **Connectors**.",
        "See a tool you don't use? Click it, then **Disconnect**.",
      ] },
      { kind: "honest", text: "**The honest part:** if AI can send, book or delete for you, it can get it wrong for you. Do that last step yourself." },
    ] },
    { num: "05", title: "Make your cheat sheet", accent: "One page you keep.", blocks: [
      { kind: "p", text: "Each word gets one question you ask before you trust an answer." },
      { kind: "prompt", label: "Write my AI cheat sheet", text: `I run a small business: [what you sell and who to].
Write me a one-page AI cheat sheet.

First ask me these, one at a time, and wait for each answer:
1. Which AI tools do I use, and for which jobs?
2. Is anything connected: email, files, calendar?
3. Which client details must stay private?

Then make a table:
Word | Plain meaning | Where it shows up in my business | The question I ask

Use these words and questions:
hallucination: "Is every fact here in what I gave it?"
source: "Where did this come from, and have I opened it?"
context window: "Did I paste the key details in this chat?"
memory: "Do I know what it keeps between chats?"
agent: "What can it do without me?"
connector: "What can it see, and does this job need it?"

Use only what I tell you. If something is missing, write [CHECK].
Never make up names, tools or settings. Under 300 words.` },
      { kind: "list", ordered: true, items: [
        "Fill in every [CHECK] yourself.",
        "Paste it into a note called **AI cheat sheet**, or print it.",
      ] },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Read the six words",
        "Caught the made-up book",
        "Ran the memory test and found the setting",
        "Disconnected tools you don't use",
        "Saved your cheat sheet",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know the words.",
    accent: "Now learn what to type.",
    body: "The next guide gives you 4 lines that work for any task.",
    label: "Learn what to type →",
    href: "/guides/what-is-a-prompt/",
  },
  conclusion: {
    heading: "Keep it close",
    paragraph: "Keep your cheat sheet where you work. When a word comes up, ask its question.",
    finishLine: "Six words. Six questions. One page.",
  },
};
