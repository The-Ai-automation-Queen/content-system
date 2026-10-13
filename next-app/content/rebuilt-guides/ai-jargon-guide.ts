import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "ai-jargon-guide",
  lumailTag: "guide-ai-jargon",
  title: "What Do AI Words Like \"Agent\" and \"Hallucination\" Mean?",
  cover: "/images/guides/learn-master.webp",
  coverAlt: "The blue robot mascot shining a brass lens on an open book, turning words into clear shapes",
  seoDescription: "What do AI words like agent and hallucination mean? 6 words in plain English, a short chat test for each, and a one-page cheat sheet for your business.",
  tool: "ChatGPT or Claude",
  minutes: 30,
  h1: { title: "What Do AI Words Like \"Agent\" and", accent: "\"Hallucination\" Mean?" },
  hero: {
    kind: "scene",
    src: "/images/guides/learn-master.webp",
    alt: "The blue robot mascot shining a brass lens on an open book, turning words into clear shapes",
    line: "6 AI words in plain English. You see each one happen in a short chat.",
  },
  intro: {
    heading: "Six AI words, seen in a real chat",
    lead: "Here is the problem. A client asks, \"Are you using an AI agent for this?\" Or a friend warns you that AI hallucinates. You nod, but you are not sure what they mean. So you avoid AI, or you trust it too much. This guide explains 6 words in plain English. You see each one happen in a short chat. Then you keep one page with a question for each word.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**6 AI words you can explain in one sentence each**: hallucination, source, context window, memory, agent and connector",
        "**A made-up answer you caused yourself**, and the question that catches it",
        "**Your AI's memory setting found**, so you know what it keeps between chats",
        "**A clear line between AI that answers and AI that acts** in your email or calendar",
        "**One page you keep by your desk**, with a question to ask for each word",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer. These steps are for a web browser, like Chrome.",
        "A ChatGPT account ([chatgpt.com](https://chatgpt.com)) or a Claude account ([claude.ai](https://claude.ai/)). The free plan works for every step.",
        "One real job you might give AI, like a client email or a proposal. You use it in step 05.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details. Type [client] instead of real client names." },
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
    { num: "01", title: "Learn the 6 words, then see one happen", accent: "10 minutes.", blocks: [
      { kind: "p", text: "First you read what each word means. Then you cause a hallucination yourself. It is the fastest way to remember the word." },
      { kind: "h3", text: "A. Read the 6 words" },
      { kind: "list", ordered: true, items: [
        "Read the table one row at a time.",
        "For each word, think of one job in your business where it matters. Write it down in a note.",
        "Keep the table open. The next steps show each word in a chat.",
      ] },
      { kind: "table", head: ["Word", "Plain meaning", "What it means for your business"], rows: [
        ["Hallucination", "The AI makes something up and sounds sure", "A made-up fact in a client email looks just like a real one"],
        ["Source", "Where a fact came from: a file, a web page, your notes", "Open the source yourself before you tell a client"],
        ["Context window", "Everything the AI can see in this one chat", "In a long chat, it can lose early details. Paste them again"],
        ["Memory", "A setting that saves some details between chats, if it is on", "Don't count on it for client details. Know if it is on"],
        ["Agent", "AI that does steps by itself: searching, clicking, filling in, sending", "It can act without you. Decide what it is allowed to do"],
        ["Connector", "A link that lets AI into your email, files or calendar", "It can read client details. Connect only what the job needs"],
      ] },
      { kind: "h3", text: "B. Cause a hallucination" },
      { kind: "p", text: "You ask about a business book that does not exist. Watch what the AI does." },
      { kind: "list", ordered: true, items: [
        "Open [chatgpt.com](https://chatgpt.com) or [claude.ai](https://claude.ai/).",
        "Click **New chat** at the top left. In ChatGPT it may show as a small pencil icon.",
        "Click in the chat box at the bottom. Copy the line below and paste it in.",
        "Press **Enter**. The answer appears above the chat box.",
      ] },
      { kind: "example", label: "What you type", text: "Summarise the business book \"The Velvet Ledger\" by Orla Penrith. Give me its 3 main lessons for small business owners." },
      { kind: "table", head: ["What you see", "What it means"], rows: [
        ["A sure-sounding summary with 3 lessons", "A hallucination. The book does not exist, so the AI made it all up"],
        ["\"I can't find this book\" or \"I'm not aware of it\"", "Good. It said it does not know"],
        ["A short web search, then \"no results\"", "Good. It looked for a source and found none"],
      ] },
      { kind: "p", text: "Write in your note what it did. Keep this chat open. You use it again in step 02." },
    ] },
    { num: "02", title: "Ask where it came from", accent: "Hallucination and source.", blocks: [
      { kind: "p", text: "A source is where a fact came from. Asking for one is how you catch a made-up answer. Now you ask the AI to prove the book exists." },
      { kind: "list", ordered: true, items: [
        "Go back to the chat from step 01. If you closed it, find it in the list of past chats on the left side.",
        "Copy the prompt below and paste it into the same chat box. Nothing to change.",
        "Press **Enter**.",
      ] },
      { kind: "prompt", label: "Ask for a source", text: `Give me a link to a real source that shows this book exists. If you can't, tell me which parts of your last answer you made up.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "\"I can't find a real source for this book. The summary and the 3 lessons in my last answer were made up. I'm sorry for the mix-up.\"",
      ] },
      { kind: "h3", text: "Check a link yourself" },
      { kind: "p", text: "Sometimes the AI gives a link anyway. Never trust a link you have not opened. Here is how to check it." },
      { kind: "list", ordered: true, items: [
        "Click the link in the answer. It opens in a new tab.",
        "Look at the page. Does it show this exact book title and this author's name?",
        "Press **Ctrl + F** on Windows, or **Cmd + F** on a Mac. Type **Velvet Ledger** and press **Enter**. The words light up if they are on the page.",
        "Nothing lights up, or the page does not open? The source is made up too.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["It says it made the summary up", "It owned the hallucination", "Good. Use this question on real facts too"],
        ["A link that does not open", "A made-up source", "Don't use the fact. Find a real source yourself"],
        ["A link to a page about another book", "A real page, but the wrong source", "Don't use the fact. Always open the link"],
        ["It insists the book is real, with no link", "It is still guessing", "Treat the whole answer as made up"],
      ] },
      { kind: "p", text: "**The habit:** before you tell a client a fact, ask \"Where did this come from?\" Then open the source yourself." },
    ] },
    { num: "03", title: "See what it sees, and what it keeps", accent: "Context window and memory.", blocks: [
      { kind: "p", text: "The context window is everything the AI can see in one chat. Memory is a setting that may keep some details between chats. This test shows which one you have." },
      { kind: "h3", text: "A. Tell it something in one chat" },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left.",
        "Copy the prompt below and paste it into the chat box. Press **Enter**.",
        "It will say something like \"Got it\". That detail is now in this chat's context window.",
      ] },
      { kind: "prompt", label: "Chat 1: tell it something", text: `Remember this: my next client workshop is called Bluebird and it runs on Friday.` },
      { kind: "h3", text: "B. Ask about it in a brand-new chat" },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left again. This starts an empty chat.",
        "Copy the prompt below and paste it in. Press **Enter**.",
      ] },
      { kind: "prompt", label: "Chat 2 (a new chat): ask about it", text: `What is my next client workshop called, and when does it run? If you don't know, just say so.` },
      { kind: "table", head: ["What you see", "What it means"], rows: [
        ["\"I don't know\" or \"You haven't told me\"", "Memory is off, or it did not save this detail"],
        ["\"Bluebird, on Friday\"", "Memory is on. It keeps some details between chats"],
      ] },
      { kind: "h3", text: "C. Find your memory setting" },
      { kind: "list", ordered: true, items: [
        "**In ChatGPT:** click your name or round picture. On most screens it is at the bottom left. Click **Settings**. Click **Personalization**. Look for **Memory**. Here you can turn it off, or see what it saved.",
        "**In Claude:** click your name or initials at the bottom left. Click **Settings**. Look for memory under **Capabilities**. On some plans it is not there yet.",
        "Can't find it? OpenAI and Anthropic move these menus. Search \"memory\" on [OpenAI's help pages](https://help.openai.com/en/articles/8590148-memory-faq) or [Claude's help centre](https://support.claude.com/).",
      ] },
      { kind: "p", text: "**The habit:** paste the important details into every new chat. Or keep them in a Project (a folder in the AI that keeps your files and rules together). Don't hope it remembers. In a very long chat, paste the key details again." },
    ] },
    { num: "04", title: "AI that answers, and AI that acts", accent: "Agent and connector.", blocks: [
      { kind: "p", text: "A chat gives you an answer. You decide what to do with it. An agent with a connector can act for you, in your email or calendar. This step shows the difference with one example." },
      { kind: "contrast", items: [
        { label: "An answer: you stay in control", text: "\"Write a reply to [client] saying I can't make Thursday's call.\" You read it, then you send it.", good: true },
        { label: "An action: it happens without you", text: "\"Decline Thursday's call with [client] in my calendar and email them to rebook.\" This needs a connector, and nobody reads it before it goes.", good: false },
      ] },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left.",
        "Copy the prompt below and paste it into the chat box. Nothing to change.",
        "Press **Enter**. Read the part about what could go wrong.",
      ] },
      { kind: "prompt", label: "Answer or action?", text: `Explain the difference between these two requests, in 3 lines:
1. "Write a reply to [client] saying I can't make Thursday's call."
2. "Decline Thursday's call with [client] in my calendar and email them to rebook."

Then tell me:
- what an AI would need to see and use for the second one
- what could go wrong for a small business if it got it wrong
- 3 rules I should set before letting AI act in my email or calendar

Plain English.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "The first one only writes words. You read them and send them.",
        "The second one needs access to your calendar and email, and acts without you.",
        "What could go wrong: it declines the wrong call, or emails the wrong person.",
        "3 rules, for example: it drafts but never sends; it asks before any change; it only sees the calendar it needs.",
      ] },
      { kind: "h3", text: "Check what is connected now" },
      { kind: "list", ordered: true, items: [
        "Click your name or round picture at the bottom left. Click **Settings**.",
        "In ChatGPT, look for **Apps** or **Connectors**. In Claude, look for **Connectors**. You will see a list of tools linked to your account.",
        "Is something there you don't use? Click it and choose **Disconnect**.",
        "Can't find it? Search \"connectors\" on [OpenAI's help pages](https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt) or [Claude's help centre](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities).",
      ] },
      { kind: "p", text: "**The habit:** before you connect anything, ask \"What can it do without me?\" If it can send, book or delete, you do the last step yourself." },
    ] },
    { num: "05", title: "Make your one-page cheat sheet", accent: "One page you keep.", blocks: [
      { kind: "p", text: "Now you turn the 6 words into one page for your business. Each word gets a question you ask before you trust an answer." },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left.",
        "Copy the prompt below and paste it into the chat box.",
        "Change the part in [square brackets] to one line about your business.",
        "Press **Enter**. The AI asks 3 questions, one at a time. Answer each one and press **Enter**.",
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

Rules: use only what I tell you. Write [CHECK] where details are missing instead of guessing. Never invent names, tools or settings. Plain English, under 300 words.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "A table with 6 rows. For example:",
        "Memory | A setting that keeps some details between chats | I paste [client] details into new chats | Do I know what it keeps between chats?",
        "Connector | A link into my email or files | My Gmail is linked [CHECK] | What can it see, and does this job need it?",
      ] },
      { kind: "list", ordered: true, items: [
        "Read each row. Does the middle column match how you really work? If not, type the change and press **Enter**.",
        "Fill in any [CHECK] mark yourself.",
        "Click the **copy** button under the answer (two small squares). Paste it into a note called **AI cheat sheet**. Or print it and keep it by your desk.",
      ] },
      { kind: "honest", text: "**The honest part:** knowing the words does not make an answer right. The words give you the right questions. Where did this come from? What can it see? What can it do without me? You still check and decide." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Read the 6 words and wrote one business example for each",
        "Caused a hallucination with the made-up book",
        "Asked for a source and opened any link it gave",
        "Did the memory test in two chats",
        "Found your memory setting in Settings",
        "Checked what is connected, and removed anything you don't use",
        "Cheat sheet made, checked and saved in a note or printed",
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
