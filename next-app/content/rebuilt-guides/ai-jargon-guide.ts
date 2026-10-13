import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "ai-jargon-guide",
  lumailTag: "guide-ai-jargon",
  title: "What Do AI Words Like \"Agent\" and \"Hallucination\" Mean?",
  cover: "/images/guides/learn-master.webp",
  coverAlt: "The blue robot mascot shining a brass lens on an open book, turning words into clear shapes",
  seoDescription: "What do AI words like agent and hallucination mean? 6 words in plain English, a short test for each, and a one-page cheat sheet for your business.",
  tool: "ChatGPT or Claude",
  minutes: 30,
  h1: { title: "What Do AI Words Like \"Agent\" and", accent: "\"Hallucination\" Mean?" },
  hero: {
    kind: "scene",
    src: "/images/guides/learn-master.webp",
    alt: "The blue robot mascot shining a brass lens on an open book, turning words into clear shapes",
    line: "6 AI words in plain English. You see each one happen in a chat.",
  },
  intro: {
    heading: "Six words, seen in a real chat",
    lead: "People use these AI words all the time. This guide explains 6 of them in plain English. You test each one in a short chat, then make a one-page cheat sheet for your business.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "6 words in plain English: hallucination, source, context window, memory, agent, connector",
        "A made-up answer you caused, and the question that catches it",
        "Your AI's **memory setting** checked",
        "The difference between AI that answers and AI that acts",
        "**Your AI cheat sheet**: one page, with a question for each word",
      ] },
      { kind: "tip", text: "You need a ChatGPT or Claude account. The free plans work. You can copy and paste every prompt below. Change the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "AI Cheat Sheet.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Learn the 6 words", accent: "Plain meaning first.", blocks: [
      { kind: "p", text: "This table gives each word a plain meaning. It also says why the word matters for your business." },
      { kind: "list", ordered: true, items: [
        "Read the table one row at a time.",
        "For each word, think of one job in your business where it matters.",
        "Keep the table open. The next steps show each word in a chat.",
      ] },
      { kind: "table", head: ["Word", "Plain meaning", "What it means for your business"], rows: [
        ["Hallucination", "The AI makes something up and sounds sure", "A made-up fact in a client email looks just like a real one"],
        ["Source", "Where a fact came from: a file, a web page, your notes", "Open the source yourself before you tell a client"],
        ["Context window", "Everything the AI can see in this one chat", "In a long chat, it can lose early details. Paste them again"],
        ["Memory", "A setting that saves some details between chats, if it is on", "Do not count on it for client details. Know if it is on"],
        ["Agent", "AI that does steps by itself: searching, clicking, filling in, sending", "It can act without you. Decide what it is allowed to do"],
        ["Connector", "A link that lets AI into your email, files or calendar", "It can read client details. Connect only what the job needs"],
      ] },
      { kind: "tip", text: "Before you test, keep real client names out of the chat. Type [client] instead. The [Start using AI in your business](/guides/start-using-ai-in-your-business/) guide shows how to stop the AI learning from your chats." },
    ] },
    { num: "02", title: "See a hallucination", accent: "Ask about a book that doesn't exist.", blocks: [
      { kind: "p", text: "The fastest way to understand a hallucination is to cause one. You ask about a business book that does not exist. Then you ask where the facts came from." },
      { kind: "list", ordered: true, items: [
        "Open a new chat.",
        "Paste the first prompt and send it.",
        "Read the answer. Then paste the second prompt in the same chat.",
      ] },
      { kind: "prompt", label: "Test 1: ask about the book", text: `Summarise the business book "The Velvet Ledger" by Orla Penrith. Give me its 3 main lessons for small business owners.` },
      { kind: "prompt", label: "Test 2: ask for a source", text: `Give me a link to a real source that shows this book exists. If you can't, tell me which parts of your last answer you made up.` },
      { kind: "table", head: ["What you might see", "What it means"], rows: [
        ["A sure-sounding summary with 3 lessons", "A hallucination. The book does not exist"],
        ["\"I can't find this book\"", "Good. It said it does not know"],
        ["A link that does not open, or shows another book", "A made-up source. Always open the link"],
      ] },
      { kind: "p", text: "**The habit:** before you tell a client a fact, ask \"Where did this come from?\" Then open the source yourself." },
    ] },
    { num: "03", title: "Test context and memory", accent: "What it sees, and what it keeps.", blocks: [
      { kind: "p", text: "This test shows two things. The context window is what the AI sees in one chat. Memory is what it keeps between chats." },
      { kind: "list", ordered: true, items: [
        "Open a new chat. Paste the first prompt below and send it.",
        "Start a **brand-new chat**. Paste the second prompt and send it.",
        "If it does not know the answer, memory is off or did not save it. If it knows, memory is on.",
      ] },
      { kind: "prompt", label: "Chat 1: tell it something", text: `Remember this: my next client workshop is called Bluebird and it runs on Friday.` },
      { kind: "prompt", label: "Chat 2 (a new chat): ask about it", text: `What is my next client workshop called, and when does it run? If you don't know, just say so.` },
      { kind: "p", text: "Now check what your AI keeps between chats:" },
      { kind: "list", ordered: true, items: [
        "**In ChatGPT:** click your name or picture. Click **Settings**, then **Personalization**. Find **Memory**. You can turn it off or see what it saved.",
        "**In Claude:** click your name, then **Settings**. Look for memory under **Capabilities**. If it is there, you can turn it on or off.",
        "Can't find it? Search \"memory\" on [OpenAI's help pages](https://help.openai.com/en/articles/8590148-memory-faq) or [Claude's help centre](https://support.claude.com/). Some plans have no memory.",
      ] },
      { kind: "p", text: "**The habit:** paste the important details into every new chat. Or save them in a Project (a folder in the AI that keeps your files). Do not hope it remembers. In a very long chat, paste the key details again." },
    ] },
    { num: "04", title: "Answer versus action", accent: "Agents and connectors.", blocks: [
      { kind: "p", text: "A chatbot gives you an answer. You decide what to do with it. An agent with a connector can act in your email or calendar for you. This step shows the difference with one example." },
      { kind: "list", ordered: true, items: [
        "Open a new chat.",
        "Paste the prompt below and send it.",
        "Read the part about what could go wrong. That is the risk when you connect a tool.",
      ] },
      { kind: "prompt", label: "Answer or action?", text: `Explain the difference between these two requests, in 3 lines:
1. "Write a reply to [client] saying I can't make Thursday's call."
2. "Decline Thursday's call with [client] in my calendar and email them to rebook."

Then tell me:
- what an AI would need to see and use for the second one
- what could go wrong for a small business if it got it wrong
- 3 rules I should set before letting AI act in my email or calendar

Plain English. No em dashes.` },
      { kind: "p", text: "**The habit:** before you connect anything, ask \"What can it do without me?\" If it can send, book or delete, you do the last step yourself." },
      { kind: "tip", text: "**Not sure what is connected now?** In ChatGPT or Claude, open **Settings**. Look for **Connectors** or **Apps**. Menu names change. If you can't find it, search \"connectors\" on the help pages." },
    ] },
    { num: "05", title: "Write your cheat sheet", accent: "One page you keep.", blocks: [
      { kind: "p", text: "This prompt turns what you learned into one page for your business. It gives you a question to ask for each word." },
      { kind: "list", ordered: true, items: [
        "Open a new chat.",
        "Paste the prompt below and answer its questions.",
        "Read the cheat sheet. Fix anything that does not match how you work.",
        "Save it in your notes, or print it and keep it by your desk.",
      ] },
      { kind: "prompt", label: "Write my AI cheat sheet", text: `I run a small business: [what you sell and who to].
Write a one-page AI cheat sheet for me.

First ask me these one at a time and wait for each answer:
1. Which AI tools do I use, and for which jobs?
2. Is anything connected to them: email, files, calendar?
3. Which client details do I handle that must stay private?

Then write the cheat sheet as a table with these columns:
Word | What it means, in one plain sentence | Where it shows up in my business | The question I ask

Use these 6 words, in this order: hallucination, source, context window, memory, agent, connector.
Use these questions in the last column:
hallucination: "Is every fact here in what I gave it?"
source: "Where did this come from, and have I opened it?"
context window: "Did I paste the key details in this chat?"
memory: "Do I know what it keeps between chats?"
agent: "What can it do without me?"
connector: "What can it see, and does this job need it?"

Rules: use only what I tell you. Write [CHECK] where details are missing instead of guessing. Never invent names, tools or settings. Plain English, no em dashes, under 300 words.` },
      { kind: "honest", text: "**The honest part:** knowing the words does not make an answer right. The words give you the right questions. Where did this come from? What can it see? What can it do without me?" },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Read the 6 words and what they mean",
        "Caused a hallucination and asked for a source",
        "Did the memory test in a new chat",
        "Found your memory setting",
        "Asked the answer or action question",
        "Wrote and saved your cheat sheet",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know the words.",
    accent: "Now learn what to type.",
    body: "The next guide gives you a fill-in-the-blanks prompt for any task. Every chat then starts with the details the AI needs.",
    label: "Learn what to type →",
    href: "/guides/what-is-a-prompt/",
  },
  conclusion: {
    heading: "Keep it close",
    paragraph: "Keep your cheat sheet where you work. When one of the 6 words comes up, ask its question. Update the sheet when you connect a new tool.",
    finishLine: "Six words, six questions, one page.",
  },
};
