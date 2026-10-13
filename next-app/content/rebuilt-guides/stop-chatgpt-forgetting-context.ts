import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "stop-chatgpt-forgetting-context",
  lumailTag: "guide-stop-chatgpt-forgetting-context",
  title: "How to Stop Explaining My Business to ChatGPT Every Time",
  cover: "/images/mascot/lightbulb.webp",
  coverAlt: "The blue robot mascot celebrating under a lightbulb",
  seoDescription: "Stop explaining your business to ChatGPT every time: save a short brief and files in one Project per client or offer. Then test it with 2 chats.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Stop Explaining My Business", accent: "to ChatGPT Every Time" },
  hero: {
    kind: "pose",
    src: "/images/mascot/lightbulb.webp",
    alt: "The blue robot mascot celebrating under a lightbulb",
    line: "Save your details once in a ChatGPT Project. Every chat inside it already knows them.",
  },
  intro: {
    heading: "Write the brief once, use it in every chat",
    lead: "A new ChatGPT chat knows nothing about you. So you explain the same things again and again. This guide saves those details once in a ChatGPT Project (a folder that keeps chats, files and rules together).",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A simple rule: when to use a new chat, a Project or custom instructions",
        "**One ChatGPT Project** for your busiest client or offer",
        "A **Project brief**: who, goal, what you deliver, dates, tone and rules",
        "Your **main files** saved inside it, with private details removed",
        "A 2-chat test that shows it remembers, and one Project per active client",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. Some plans may not have Projects. Step 02 shows what to do then. Copy and paste each prompt below. Change the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Project Brief.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Pick the right place", accent: "Three places, three jobs.", blocks: [
      { kind: "p", text: "ChatGPT has three places to put details. Each one remembers something different. Pick the right one first." },
      { kind: "table", head: ["Place", "What it remembers", "Use it for"], rows: [
        ["**New chat**", "Only that chat. The next new chat knows nothing.", "Quick, one-time questions"],
        ["**Project**", "Its own rules and files, in every chat inside it", "One client or one offer, over many chats"],
        ["**Custom instructions**", "A short note about you, in every chat", "Things true for all your work: your business, tone, rules"],
      ] },
      { kind: "list", ordered: true, items: [
        "Write down your active clients and offers. These are the ones you'll work on again this month.",
        "Circle the one you explain to ChatGPT most often. That is your first Project.",
        "Collect what you already have for it: the proposal, call notes, the list of what you'll deliver.",
      ] },
      { kind: "tip", text: "Before you upload anything, take out private details. That means card and bank details, passwords, and personal details about anyone. Swap names for [client] where you can." },
    ] },
    { num: "02", title: "Make the Project", accent: "One per client or offer.", blocks: [
      { kind: "p", text: "The Project holds everything. Every chat inside it uses what you add." },
      { kind: "list", ordered: true, items: [
        "Go to [chatgpt.com](https://chatgpt.com) and sign in.",
        "In the left sidebar, click **New project**.",
        "Name it after the client or offer. For example, **[Client] website rewrite** or **[Offer name] launch**.",
        "Leave it open. The next two steps add the brief and the files.",
      ] },
      { kind: "tip", text: "**Don't see Projects?** Menus change, and your plan may not have them. Search \"projects\" on [OpenAI's help pages](https://help.openai.com/). Still not there? Save the brief from step 03 in your notes. Paste it as the first message of each chat about that client." },
    ] },
    { num: "03", title: "Write the Project brief", accent: "Everything you keep repeating.", blocks: [
      { kind: "p", text: "The brief holds the facts you keep explaining. Let ChatGPT ask you questions, so you don't miss anything." },
      { kind: "p", text: "Start a chat inside the Project. Paste this prompt. Answer each question in a sentence or two." },
      { kind: "prompt", label: "Interview me for my Project brief", text: `Interview me to write a Project brief for one client or offer.

Ask me these one at a time and wait for each answer:
1. Who is this for? (Use [client] instead of a real name if I prefer.)
2. What is the goal: what does a good result look like for them?
3. What am I delivering, exactly?
4. What are the deadlines? (I'll give dates as [date] if they aren't fixed yet.)
5. What tone should everything have?
6. What are the rules: things to always do, things to never say or promise?

Then write the brief with these sections:
Who it's for | Goal | Deliverables | Deadlines | Tone | Rules

Keep it under 1,500 characters.
Use only what I tell you. Write [CHECK] where details are missing instead of guessing. Never make up names, prices, dates or promises.
End the brief with this line: "If something you need is not in this brief or the files, ask me before you write."` },
      { kind: "p", text: "Read the brief. Fill in every [CHECK]. Fix anything that's wrong. Then save it as the Project's rules:" },
      { kind: "list", ordered: true, items: [
        "Open the Project's menu (the three dots, or the Project name at the top). Choose **Project settings** or **Instructions**.",
        "Paste the brief into the box and save.",
        "Can't find it? Search \"project instructions\" on [OpenAI's help pages](https://help.openai.com/).",
      ] },
    ] },
    { num: "04", title: "Add your files", accent: "The proposal and the notes.", blocks: [
      { kind: "p", text: "Files give ChatGPT the details the brief leaves out. For example, what you offered and what you agreed on the call." },
      { kind: "list", ordered: true, items: [
        "Pick 2 or 3 files: the proposal, call notes, the list of what you'll deliver. A few clear files work better than many.",
        "Open each one. Take out private details: card and bank details, other clients' details, personal details. Swap names for [client].",
        "Inside the Project, find **Add files** (or the paperclip or + icon). Upload the files.",
        "Give each file a clear name. For example, **Proposal**, **Kick-off call notes**, **Deliverables**.",
      ] },
      { kind: "tip", text: "**Can't upload files?** Paste the main parts into the brief instead. Put them under a heading like \"From the proposal\"." },
    ] },
    { num: "05", title: "Test it with 2 chats", accent: "Proof it remembers.", blocks: [
      { kind: "p", text: "A Project only helps if a new chat inside it uses the brief. This test checks that." },
      { kind: "list", ordered: true, items: [
        "Inside the Project, start a new chat. Paste test 1.",
        "Start a second new chat, also inside the Project. Paste test 2.",
        "Compare both answers with your brief.",
      ] },
      { kind: "prompt", label: "Test chat 1", text: `Using only this Project's instructions and files, write a short update email to [client] about where the work stands.
Under 120 words. Use the tone in the brief.
Write [CHECK] where something isn't in the brief or files instead of guessing.` },
      { kind: "prompt", label: "Test chat 2 (a new chat in the same Project)", text: `Without me explaining anything, tell me in 5 bullets:
who this work is for, the goal, what I'm delivering, the next deadline, and one rule I gave you.
If any of these is missing from the Project, say "Not in the brief".` },
      { kind: "p", text: "**It passed if** both chats use the right client, goal and tone. Neither one makes up a date, price or promise." },
      { kind: "tip", text: "**It missed a fact?** Check both chats are inside the Project. The Project name shows at the top. Check the rules were saved. Does one detail keep going missing? Move it to the top of the brief." },
    ] },
    { num: "06", title: "One Project per client", accent: "Repeat for each active one.", blocks: [
      { kind: "p", text: "Now do the same for every active client or offer. Then you never explain them again." },
      { kind: "list", ordered: true, items: [
        "Go back to your list from step 01. Repeat steps 02 to 05 for each client or offer.",
        "Something changed, like a new date? Update the brief the same day.",
        "When the work ends, archive or delete the Project. Then old details don't get mixed into new work.",
      ] },
      { kind: "honest", text: "**The honest part:** a Project keeps your rules. But not every answer will follow them. It can still miss a detail. It can sound sure and still be wrong. Read every draft before it goes to a client." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Picked your first client or offer",
        "Project made and named",
        "Project brief written, checked and saved",
        "Files added, private details removed",
        "2-chat test passed",
        "One Project for each active client or offer",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "ChatGPT remembers your work.",
    accent: "Now make it get to the point.",
    body: "The next guide saves one set of length rules. Then every answer comes back short and useful.",
    label: "Make ChatGPT answers shorter →",
    href: "/guides/make-chatgpt-answers-shorter/",
  },
  conclusion: {
    heading: "Keep it up to date",
    paragraph: "Update the brief when something changes. Keep only the few files that matter. Close the Project when the work ends.",
    finishLine: "Explain it once. Then get on with the work.",
  },
};
