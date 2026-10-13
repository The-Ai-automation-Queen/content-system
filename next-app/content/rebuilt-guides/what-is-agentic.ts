import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-is-agentic",
  lumailTag: "guide-what-is-agentic",
  title: "Do I Need an AI Agent for My Business?",
  cover: "/images/guides/what-is-agentic.webp",
  coverAlt: "The blue robot mascot watching a chain of connected brass machines pass a ball from one to the next",
  seoDescription: "Do I need an AI agent for my business? See how a chat, an automation and an agent differ. Then set 4 limits before anything works on its own.",
  tool: "Any AI chat",
  minutes: 30,
  h1: { title: "Do I Need an AI Agent", accent: "for My Business?" },
  hero: {
    kind: "scene",
    src: "/images/guides/what-is-agentic.webp",
    alt: "The blue robot mascot watching a chain of connected brass machines pass a ball from one to the next",
    line: "What an agent is, and how to know if you need one. Then the 4 limits to set before it works alone.",
  },
  intro: {
    heading: "One task, one clear answer",
    lead: "An AI agent is a tool you give a job and your apps. It decides the next step on its own. That helps with some jobs and is risky for others. In this guide you take one real task and decide what it needs: a chat, an automation or an agent. Then you write down the limits before anything works alone.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "The difference between a **chat**, an **automation** and an **agent**",
        "One task from your week with a **chat, automation or agent** answer, and why",
        "**The 4 limits** for that task: one job, only what it needs, your yes, a way to stop",
        "Written **agent rules** to paste into any agent tool you try",
        "Your **agent decision sheet**: all of this saved in one document",
      ] },
      { kind: "tip", text: "You need any AI chat: ChatGPT, Claude, Gemini or Meta AI. The free plans work. You don't need an agent tool for this guide. You can copy and paste every prompt below as it is. Replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get",
    accent: "your agent decision sheet.",
    promise: "Enter your name and email. The rest of the guide opens straight away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Chat, automation or agent", accent: "Three different jobs.", blocks: [
      { kind: "p", text: "People mix up these three words all the time. Here is what each one does. Each has an example from a service business." },
      { kind: "table", head: ["", "What it does", "Example in a service business", "Risk"], rows: [
        ["**Chat**", "You ask, it answers, it waits. You do every step yourself.", "You paste call notes. You get a follow-up email to check and send.", "Low. Nothing happens unless you do it."],
        ["**Automation**", "Fixed steps. You set them up once. They run the same way each time.", "Someone books a call. They get an email, and a new row goes in your spreadsheet.", "Medium. A wrong step repeats on every run until you spot it."],
        ["**Agent**", "You give it a goal and your tools. It decides the next step as it goes.", "It reads new client questions, checks your calendar, writes a reply and offers times.", "Higher. It can take steps you didn't plan, in the apps you connect."],
      ] },
      { kind: "h3", text: "Questions to ask yourself" },
      { kind: "list", ordered: true, items: [
        "**Are the steps the same every time?** Then an automation is usually enough. Zapier and Make are tools that run fixed steps for you.",
        "**Does it need thought, and you're happy to check each answer?** Then a chat does the job.",
        "**Does it need thought across many apps, many times a week?** Only then look at an agent.",
      ] },
      { kind: "p", text: "Pick one task from your week you'd like to hand over. For example: answering new client questions, chasing unpaid invoices, booking calls or sorting your inbox. You'll use it in every step below." },
      { kind: "tip", text: "Write the task in one sentence. Leave out client names. For example: \"Reply to new questions from my website form with my free times.\"" },
    ] },
    { num: "02", title: "Find the right fit", accent: "For your one task.", blocks: [
      { kind: "p", text: "This step gives your task an honest answer: chat, automation or agent. It also tells you why." },
      { kind: "p", text: "Start a new chat and paste this prompt." },
      { kind: "prompt", label: "Which one does my task need?", text: `I run a service business: [what you do, in one sentence].
I want help with this task: [your task in one sentence, no client names].

Ask me these one at a time and wait for each answer:
1. How often does this task happen?
2. Are the steps the same every time, or do they change?
3. Which apps or files does it touch (email, calendar, spreadsheet, invoicing)?
4. What is the worst thing that could happen if it goes wrong?
5. Who sees the result: only me, or a client?

Then tell me which of these fits best: a chat, an automation or an agent.
Give me:
- The answer in one line
- 3 reasons, based only on my answers
- What the simplest version would look like this week
- One reason it might be the wrong choice

If the simpler option would do the job, recommend it. Do not recommend any paid tool by name unless I ask.` },
      { kind: "list", ordered: true, items: [
        "Save the answer in a new document. Call it **Agent decision sheet**.",
        "Is the answer chat or automation? Then you can stop here and use it. Steps 03 to 05 still help if you might add an agent later.",
      ] },
    ] },
    { num: "03", title: "Write down the 4 limits", accent: "Before anything runs alone.", blocks: [
      { kind: "p", text: "An agent can only use what you connect to it. These 4 limits decide what it can touch. They also decide when it must wait for you. Fill in the right-hand column for your task. Copy it into your decision sheet." },
      { kind: "table", head: ["Limit", "What it means", "Your answer"], rows: [
        ["1. One job", "One exact task you can test. \"Help with clients\" is too big. \"Draft replies to new client questions\" is one job.", "[the one job]"],
        ["2. Only what it needs", "Only the apps, folders and inbox the job needs. Make it read-only (it can look but not change) where you can.", "[apps it can see] / [apps it can change]"],
        ["3. Your yes first", "Anything sent, paid or deleted waits for your yes.", "[what waits for me]"],
        ["4. How to stop it", "How you pause it, where you see what it did, and how you undo a change.", "[how I pause it] / [where I check]"],
      ] },
      { kind: "list", items: [
        "**Limit what it can use in the settings.** Writing \"please ask me first\" in its rules is not enough. Does the tool have a setting to ask you before it sends or pays? Switch it on.",
        "**Anything about money, client details or logins** goes in limit 3, every time.",
      ] },
      { kind: "tip", text: "**Can't fill in limit 4?** Then the task isn't ready for an agent. Use a chat or an automation for now." },
    ] },
    { num: "04", title: "Turn it into agent rules", accent: "Written once, pasted anywhere.", blocks: [
      { kind: "p", text: "Agent tools usually have a box for rules (often called instructions). This prompt turns your 4 limits into clear rules for that box. It also shows you any gaps." },
      { kind: "prompt", label: "Write my agent rules", text: `Here are the 4 limits I've set for an AI agent in my business.

The task: [your task in one sentence]
1. One job: [your answer]
2. Only what it needs: [your answer]
3. My yes first: [your answer]
4. How to stop it: [your answer]

First, check each limit and tell me: OK, too broad, or missing. One line each.

Then write the agent's rules, under 1,500 characters, as instructions to the agent:
- The one job, and what it must not do
- What it can read and what it can change
- Exactly which actions must wait for my yes: anything sent, paid or deleted
- When to stop and ask me: missing details, anything unusual, anything about money or client details
- What to report back to me after each run

Use only what I've given you. Write [CHECK] where a limit is unclear instead of guessing.` },
      { kind: "list", ordered: true, items: [
        "Fix every \"too broad\" or \"missing\" before you go on.",
        "Paste the final rules into your decision sheet. Now the sheet is complete. It has the task, the fit, the 4 limits and the rules.",
      ] },
    ] },
    { num: "05", title: "Start one step before automatic", accent: "Prepare, propose, then act.", blocks: [
      { kind: "p", text: "Even when an agent fits, don't let it act alone on day one. Move up one stage at a time." },
      { kind: "table", head: ["Stage", "What it does", "When to move on"], rows: [
        ["1. Prepare", "Looks things up, sorts and drafts. Nothing leaves your account.", "When its drafts need only small fixes"],
        ["2. Propose", "Gets everything ready. Waits for your yes on each action.", "After a month of checked runs with no big mistakes"],
        ["3. Act", "Does the job alone, inside your 4 limits, and reports back.", "Keep checking its report every week"],
      ] },
      { kind: "list", ordered: true, items: [
        "Write your starting stage and the date in your decision sheet.",
        "Each week, read what it did. Write down every mistake. Add a rule for it.",
        "Move up a stage only after a full month of checked runs.",
      ] },
      { kind: "honest", text: "**The honest part:** people sell agents as more than they are right now. A chat you check, or a simple automation, often does the job just as well. And the risk is lower. Giving an agent more apps doesn't make it smarter. It gives its mistakes more places to go. Your clients, your money and your name stay with you." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "One task picked and written in one sentence",
        "Chat, automation or agent decided, with the reasons saved",
        "The 4 limits filled in",
        "Agent rules written and saved in your decision sheet",
        "Starting stage written down: prepare, propose or act",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know what your task needs.",
    accent: "Now set AI up for your business.",
    body: "Most jobs start with a chat that knows your business. The starter guide sets up ChatGPT with your Business Profile. Then it builds your first AI assistant for your biggest weekly job.",
    label: "Start using AI in your business →",
    href: "/guides/start-using-ai-in-your-business/",
  },
  conclusion: {
    heading: "Keep it safe",
    paragraph: "Before you connect anything, run each new task through steps 02 and 03. Add a rule each time an agent gets something wrong. Move up a stage only after a month of checked runs.",
    finishLine: "One job, only what it needs, your yes before it acts.",
  },
};
