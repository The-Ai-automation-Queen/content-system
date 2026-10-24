import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "stop-chatgpt-forgetting-context",
  lumailTag: "guide-stop-chatgpt-forgetting-context",
  title: "How to Stop Explaining My Business to ChatGPT Every Time",
  cover: "/images/mascot/lightbulb.webp",
  coverAlt: "The blue robot mascot celebrating under a lightbulb",
  seoDescription: "Stop explaining your business to ChatGPT every time: save a short brief and files in one Project per client. Then test it. 5 steps.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Stop Explaining My Business", accent: "to ChatGPT Every Time" },
  hero: {
    kind: "pose",
    src: "/images/mascot/lightbulb.webp",
    alt: "The blue robot mascot celebrating under a lightbulb",
    line: "Explain each client once. Every new chat already knows.",
  },
  intro: {
    heading: "Explain each client only once",
    lead: "You explain the same client to ChatGPT every day. This guide saves those details in a Project (a folder that keeps chats, files and rules together).",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**One Project** for your busiest client or offer",
        "**A short brief** saved inside it",
        "**Your 2 or 3 main files**, with private details taken out",
        "**Proof it remembers**, from 2 new chats",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. Projects may not be on every plan. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "project brief.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Pick one client", accent: "And clean the files.", blocks: [
      { kind: "p", text: "Start with the client you explain most often. Their files must hold nothing private." },
      { kind: "list", ordered: true, items: [
        "Pick the client or offer you explain to ChatGPT most often.",
        "Find 2 or 3 files: the proposal, call notes, what you deliver.",
        "Save a copy of each. Clean the copy, not the original.",
        "Delete bank details, passwords and personal details.",
        "Swap real names for [client].",
      ] },
      { kind: "p", text: "Put the clean copies in one folder. You add them in step 04." },
    ] },
    { num: "02", title: "Make the Project", accent: "One per client.", blocks: [
      { kind: "p", text: "Every chat inside the Project uses what you add to it." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com).",
        "In the left sidebar, click **New project**.",
        "Name it after the client, like **[Client] website rewrite**.",
        "Click **Create project**.",
      ] },
      { kind: "prompt", label: "Interview me for my brief", text: `Interview me to write a Project brief for one client or offer.

Ask me these one at a time and wait for each answer:
1. Who is this for? (I may use [client] instead of a name.)
2. What does a good result look like for them?
3. What am I delivering, exactly?
4. What are the deadlines?
5. What tone should everything have?
6. What must you always do, and never say or promise?

Then write the brief with these sections:
Who it's for | Goal | Deliverables | Deadlines | Tone | Rules

Keep it under 1,500 characters.
Use only what I tell you. If something is missing, write [CHECK].
Never make up names, prices, dates or promises.
End with: "If something you need is not in this brief or the files, ask me before you write."` },
      { kind: "p", text: "Paste this in the Project's chat box. Answer each question. Read the brief and fix any wrong fact." },
      { kind: "tip", text: "Can't find it? OpenAI moves this menu. Search \"projects\" on [OpenAI's help pages](https://help.openai.com/)." },
    ] },
    { num: "03", title: "Save the brief", accent: "Paste it once.", blocks: [
      { kind: "p", text: "Saved as the Project's instructions, the brief goes into every chat." },
      { kind: "list", ordered: true, items: [
        "Copy the whole brief.",
        "Click the three dots next to the Project name.",
        "Click **Project settings** or **Instructions**.",
        "Paste the brief and click **Save**.",
      ] },
      { kind: "tip", text: "Can't find it? Search \"project instructions\" on [OpenAI's help pages](https://help.openai.com/)." },
    ] },
    { num: "04", title: "Add your files", accent: "Proposal and notes.", blocks: [
      { kind: "p", text: "Files give ChatGPT the details the brief leaves out." },
      { kind: "list", ordered: true, items: [
        "On the Project page, click **Add files**.",
        "Pick a clean file from your folder and click **Open**.",
        "Add the other 1 or 2 files the same way.",
      ] },
      { kind: "p", text: "Name each file clearly first, like **Proposal**. A few clear files work best." },
    ] },
    { num: "05", title: "Test with 2 chats", accent: "Proof it remembers.", blocks: [
      { kind: "p", text: "Start a new chat inside the Project. Check its name shows at the top." },
      { kind: "prompt", label: "Test chat", text: `Without me explaining anything, tell me in 5 bullets:
who this work is for, the goal, what I'm delivering, the next deadline, and one rule I gave you.
If any of these is missing from the Project, write "Not in the brief".
Never make up names, prices, dates or promises.` },
      { kind: "list", ordered: true, items: [
        "Check each answer against your brief.",
        "Any date or price not in the brief was made up. Add a rule against it.",
        "Start a second new chat and ask again. Both must match.",
      ] },
      { kind: "honest", text: "**The honest part:** ChatGPT can still miss a detail and sound sure. It writes the first draft. You read it before anything goes to a client." },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Picked one client and cleaned 2 or 3 files",
        "Made the Project",
        "Saved the brief in the Project",
        "Added the clean files",
        "Passed the test in 2 new chats",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "ChatGPT remembers your work.",
    accent: "Now make it get to the point.",
    body: "The next guide saves one set of length rules. Then every answer comes back short.",
    label: "Make ChatGPT answers shorter →",
    href: "/guides/make-chatgpt-answers-shorter/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Start every chat about a client inside its Project. Update the brief when something changes.",
    finishLine: "Explain it once. Then get on with the work.",
  },
};
