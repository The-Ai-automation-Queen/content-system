import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "which-ai-tool-for-what",
  lumailTag: "guide-which-ai-tool-for-what",
  title: "ChatGPT, Claude or Gemini: Which One Should I Pay For?",
  cover: "/images/guides/which-ai-tool-for-what.webp",
  coverAlt: "The blue robot mascot choosing one tool from a row of brass instruments under glass",
  seoDescription: "ChatGPT, Claude or Gemini: which one should you pay for? Test two on your real work, score them, then keep one and cancel the rest. 5 steps.",
  tool: "ChatGPT, Claude, Gemini, Copilot",
  minutes: 30,
  h1: { title: "ChatGPT, Claude or Gemini: Which One", accent: "Should I Pay For?" },
  hero: {
    kind: "scene",
    src: "/images/guides/which-ai-tool-for-what.webp",
    alt: "The blue robot mascot choosing one tool from a row of brass instruments under glass",
    line: "Test two tools on your real work. Keep the winner.",
  },
  intro: {
    heading: "Keep one tool, cancel the rest",
    lead: "You may pay for more AI tools than you use. This guide tests two on your real work, then helps you cancel the rest. It takes 30 minutes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A list of every AI tool** you pay for",
        "**A score for two tools** on your real work",
        "**A keep or cancel answer** for each one",
        "**The ones you don't need**, cancelled before they renew",
      ] },
      { kind: "tip", text: "You need free accounts for the two tools you test. No paid plan needed. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "tool scorecard.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Pick two tools", accent: "No AI needed.", blocks: [
      { kind: "p", text: "The best tool is often the one closest to your email and files. Start where your work happens." },
      { kind: "table", head: ["If your work is in", "Try first", "Why"], rows: [
        ["Gmail, Google Docs, Drive", "Gemini", "It can work inside Gmail and Docs"],
        ["Outlook, Word, Teams", "Copilot", "It can work inside Outlook and Word, if your plan has it"],
        ["Proposals, emails, posts, planning", "ChatGPT or Claude", "Both are good all-round. Your test decides"],
        ["Research you will quote", "A search tool like Perplexity", "It shows links you can open and check"],
      ] },
      { kind: "list", ordered: true, items: [
        "Find your row. That is Tool A.",
        "Pick one more as Tool B. Stop at two.",
        "Pay for Google Workspace or Microsoft 365? Check if Gemini or Copilot is already in your plan.",
      ] },
      { kind: "tip", text: "Prices change often. Check the official pages: [ChatGPT](https://openai.com/chatgpt/pricing/), [Claude](https://claude.com/pricing), [Google Workspace](https://workspace.google.com/pricing), [Microsoft 365 Copilot](https://www.microsoft.com/microsoft-365/copilot)." },
    ] },
    { num: "02", title: "List what you pay for", accent: "Every subscription.", blocks: [
      { kind: "p", text: "You can't choose what to cancel until you see it all." },
      { kind: "list", ordered: true, items: [
        "Search your email for **subscription**, **receipt** and **renewal**.",
        "Search for ChatGPT, OpenAI, Claude, Anthropic, Gemini, Copilot and Perplexity.",
        "Check your bank or card statements for the last 2 months.",
        "Write each tool, the price, how often, and the next renewal date.",
      ] },
      { kind: "prompt", label: "Turn my list into a table", text: `Here are the AI tools I pay for:
[paste your list: tool, price, monthly or yearly, renewal date]

Make a table:
Tool | What I pay | Monthly or yearly | Next renewal date

Use only what I give you. If something is missing, write [CHECK].
Do not add tools or look up prices.
Add one line with the total per month, from my numbers only.` },
      { kind: "list", ordered: true, items: [
        "Fill in every [CHECK] from your email or bank.",
        "Add up the total yourself. Does it match?",
        "Save the table in a note.",
      ] },
    ] },
    { num: "03", title: "Test both on one task", accent: "Same words, two tools.", blocks: [
      { kind: "p", text: "First stop both tools learning from your chats. Then give them the same real task." },
      { kind: "list", ordered: true, items: [
        "ChatGPT: click your name, then **Settings**, then **Data Controls**. Turn off **Improve the model for everyone**.",
        "Claude: click your name, then **Settings**, then **Privacy**. Turn off **Help improve Claude**.",
        "Open both tools in two tabs. Click **New chat** in each.",
        "Paste the same prompt below into both. Change nothing between them.",
      ] },
      { kind: "prompt", label: "The same task for both", text: `I run a small business: [what you do and who you help].

Do this task: [for example: reply to this client email].

Here is the material:
[paste it, with [client] instead of real names]

Use only what I give you. Keep every fact. Add nothing new.
If something is missing, write [CHECK].
Never make up names, prices, dates or promises.
Write in plain English, the way I talk to clients.` },
      { kind: "tip", text: "Can't find the setting? The menus move. Search \"model training\" on [OpenAI's help pages](https://help.openai.com/), [Anthropic's help pages](https://support.anthropic.com/) or [Google's Gemini help](https://support.google.com/gemini)." },
    ] },
    { num: "04", title: "Score both answers", accent: "Facts first.", blocks: [
      { kind: "p", text: "A tool can sound good and still change a fact. Check before you score." },
      { kind: "prompt", label: "List every fact", text: `List every name, date, price and promise in your answer.
For each one, show the words from my material it comes from.
If it is not in my material, write NOT IN MATERIAL.` },
      { kind: "list", ordered: true, items: [
        "Paste this into both tools.",
        "Check for dropped conditions. \"Once we have your files\" must stay.",
        "Score each tool 1 to 5 on: right facts, sounds like me, time saved, cost.",
        "Repeat with 2 more real tasks this week. One task can be luck.",
      ] },
    ] },
    { num: "05", title: "Decide and cancel", accent: "Keep one.", blocks: [
      { kind: "p", text: "Let AI add up your scores. The choice is yours." },
      { kind: "prompt", label: "Read my scores", text: `Here are my scores for two AI tools on 3 real tasks:
[paste your scores and notes]

Here are the AI tools I pay for:
[paste your table from step 02]

1. Add up the scores for each tool.
2. Say which did best for my work, in two sentences.
3. Give me a table: Tool | Keep or cancel | Reason in one line.

Use only what I give you. If you can't decide, write [CHECK].
Do not make up prices or tools.` },
      { kind: "list", ordered: true, items: [
        "Add up one total yourself. Does it match?",
        "For each tool to cancel, open **Settings**, then billing, plan or subscription.",
        "Click cancel before the renewal date.",
        "Pay through the App Store or Google Play? Cancel it there.",
        "Save the email that confirms it.",
      ] },
      { kind: "tip", text: "Can't find billing? Search \"cancel subscription\" on [OpenAI](https://help.openai.com/), [Anthropic](https://support.anthropic.com/) or [Google](https://support.google.com/gemini). Work plan? Ask whoever runs your company's account." },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Picked two tools",
        "Listed every AI tool you pay for",
        "Turned off training in both",
        "Scored both on 3 real tasks",
        "Cancelled what you don't need",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You've picked your tool.",
    accent: "Now teach it your business.",
    body: "The Brand Brain guide gives the tool you kept your voice, so it writes like you.",
    label: "Build your Brand Brain →",
    href: "/guides/brand-brain-guide/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Keep one main tool. Test a new one only on your real work.",
    finishLine: "Pay only for the tool that helps you most.",
  },
};
