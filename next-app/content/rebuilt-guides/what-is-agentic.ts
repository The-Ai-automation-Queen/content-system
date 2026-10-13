import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-is-agentic",
  lumailTag: "guide-what-is-agentic",
  title: "Do I Need an AI Agent for My Business?",
  cover: "/images/guides/what-is-agentic.webp",
  coverAlt: "The blue robot mascot watching a chain of connected brass machines pass a ball from one to the next",
  seoDescription: "Do I need an AI agent for my business? Compare a chat, an automation and an agent, then set 4 limits before anything runs on its own.",
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
    lead: "An AI agent is a tool you give a job and access to your apps, and it decides the next step on its own. That is useful for some jobs and risky for others. This guide takes one real task from your business, works out whether it needs a chat, an automation or an agent, and writes down the limits before anything runs alone.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A clear picture of the difference between a **chat**, an **automation** and an **agent**",
        "One task from your week with a **chat, automation or agent** answer, and the reason",
        "**The 4 limits** filled in for that task: one job, smallest access, a sign-off point, a way to stop",
        "Written **agent rules** you can paste into any agent tool you try",
        "Your **agent decision sheet**: all of the above saved in one document",
      ] },
      { kind: "tip", text: "You need any AI chat: ChatGPT, Claude, Gemini or Meta AI. The free plans work. You don't need an agent tool to finish this guide. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get",
    accent: "your agent decision sheet.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Chat, automation or agent", accent: "Three different jobs.", blocks: [
      { kind: "p", text: "These three words get mixed up all the time. Here is what each one does, with an example from a service business." },
      { kind: "table", head: ["", "What it does", "Example in a service business", "Risk"], rows: [
        ["**Chat**", "You ask, it answers, it waits. You do every step yourself.", "You paste call notes and get a follow-up email to check and send.", "Low. Nothing happens unless you do it."],
        ["**Automation**", "Fixed steps, set up once, run the same way every time.", "When someone books a call, they get a confirmation email and a row is added to your spreadsheet.", "Medium. A wrong step repeats on every run until you spot it."],
        ["**Agent**", "You give it a goal and access to tools. It decides the next step as it goes.", "It reads new enquiries, checks your calendar, drafts a reply and offers times.", "Higher. It can take steps you didn't plan for, in the apps you connect."],
      ] },
      { kind: "h3", text: "Questions to ask yourself" },
      { kind: "list", ordered: true, items: [
        "**Are the steps the same every time?** Then an automation (like Zapier or Make) is usually enough.",
        "**Does it need judgement, and you're happy to check each answer?** Then a chat does the job.",
        "**Does it need judgement across several apps, many times a week?** Only then is an agent worth looking at.",
      ] },
      { kind: "p", text: "Pick one task from your week you'd like to hand over: answering enquiries, chasing invoices, booking calls, sorting your inbox. You'll use it in every step below." },
      { kind: "tip", text: "Write the task in one sentence, with no client names in it. For example: \"Reply to new enquiries from my website form with my availability.\"" },
    ] },
    { num: "02", title: "Find the right fit", accent: "For your one task.", blocks: [
      { kind: "p", text: "This step gives your task an honest answer: chat, automation or agent, and why." },
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
        "Save the answer in a new document called **Agent decision sheet**.",
        "If the answer is chat or automation, you can stop here and use it. Steps 03 to 05 still help if you plan to add an agent later.",
      ] },
    ] },
    { num: "03", title: "Write down the 4 limits", accent: "Before anything runs alone.", blocks: [
      { kind: "p", text: "An agent only has the power you connect to it. These 4 limits decide what it can touch, and when it must wait for you. Fill in the right-hand column for your task and copy it into your decision sheet." },
      { kind: "table", head: ["Limit", "What it means", "Your answer"], rows: [
        ["1. One job", "One exact task you can test. \"Help with clients\" is too broad; \"draft replies to new enquiries\" is one job.", "[the one job]"],
        ["2. Smallest access", "Only the apps, folders and inbox the job needs, and read-only (it can look but not change) wherever possible.", "[apps it can see] / [apps it can change]"],
        ["3. Sign-off point", "Anything that is sent, paid or deleted waits for you to say yes first.", "[what waits for me]"],
        ["4. How to stop it", "How you pause it, where you see what it did, and how you undo a change.", "[how I pause it] / [where I check]"],
      ] },
      { kind: "list", items: [
        "**Restrict the access itself.** Writing \"please ask me first\" in the instructions is not enough. If the tool has a setting that needs your OK before sending or paying, switch it on.",
        "**Anything touching money, client data or logins** belongs in limit 3, every time.",
      ] },
      { kind: "tip", text: "**Can't fill in limit 4?** Then the task isn't ready for an agent yet. Go back to a chat or an automation for now." },
    ] },
    { num: "04", title: "Turn it into agent rules", accent: "Written once, pasted anywhere.", blocks: [
      { kind: "p", text: "Agent tools usually have a place for instructions. This prompt turns your 4 limits into clear rules you can paste there, and points out any gaps." },
      { kind: "prompt", label: "Write my agent rules", text: `Here are the 4 limits I've set for an AI agent in my business.

The task: [your task in one sentence]
1. One job: [your answer]
2. Smallest access: [your answer]
3. Sign-off point: [your answer]
4. How to stop it: [your answer]

First, check each limit and tell me: OK, too broad, or missing. One line each.

Then write the agent's rules, under 1,500 characters, as instructions to the agent:
- The one job, and what it must not do
- What it can read and what it can change
- Exactly which actions must wait for my yes: anything sent, paid or deleted
- When to stop and ask me: missing information, anything unusual, anything about money or client data
- What to report back to me after each run

Use only what I've given you. Write [CHECK] where a limit is unclear instead of guessing.` },
      { kind: "list", ordered: true, items: [
        "Fix every \"too broad\" or \"missing\" before you go further.",
        "Paste the final rules into your decision sheet. That sheet is now complete: the task, the fit, the 4 limits and the rules.",
      ] },
    ] },
    { num: "05", title: "Start one step before automatic", accent: "Prepare, propose, then act.", blocks: [
      { kind: "p", text: "Even when an agent is the right fit, don't let it act alone on day one. Move up one stage at a time." },
      { kind: "table", head: ["Stage", "What it does", "When to move on"], rows: [
        ["1. Prepare", "Researches, sorts and drafts. Nothing leaves your account.", "When its drafts need only small fixes"],
        ["2. Propose", "Gets everything ready and waits for your yes on each action.", "After a month of runs you've checked, with no serious mistakes"],
        ["3. Act", "Does the job alone, within your 4 limits, and reports back.", "Keep checking its report every week"],
      ] },
      { kind: "list", ordered: true, items: [
        "Write down the stage you're starting at in your decision sheet, and the date.",
        "Each week, read what it did. Note every mistake and add a rule for it.",
        "Move up a stage only after a full month of checked runs at the current one.",
      ] },
      { kind: "honest", text: "**The honest part:** agents are oversold right now. Many tasks sold as \"agent\" work are done just as well by a chat you check or a simple automation, at lower risk. More access doesn't make an agent smarter; it gives its mistakes more places to go. Your clients, your money and your name stay with you." },
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
    body: "Most jobs start with a chat that knows your business. The starter guide sets ChatGPT up with your Business Profile and builds your first assistant for the job that eats most of your week.",
    label: "Start using AI in your business →",
    href: "/guides/start-using-ai-in-your-business/",
  },
  conclusion: {
    heading: "Keep it safe",
    paragraph: "Run every new task through steps 02 and 03 before you connect anything, add a rule each time an agent gets something wrong, and only move up a stage after a month of checked runs.",
    finishLine: "One job, the smallest access, your yes before it acts.",
  },
};
