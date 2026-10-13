import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "stop-chatgpt-forgetting-context",
  lumailTag: "guide-stop-chatgpt-forgetting-context",
  title: "How to Stop Explaining My Business to ChatGPT Every Time",
  cover: "/images/mascot/lightbulb.webp",
  coverAlt: "The blue robot mascot celebrating under a lightbulb",
  seoDescription: "Stop explaining your business to ChatGPT every time: save a brief and files in one ChatGPT Project per client or offer, then test it with 2 chats.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Stop Explaining My Business", accent: "to ChatGPT Every Time" },
  hero: {
    kind: "pose",
    src: "/images/mascot/lightbulb.webp",
    alt: "The blue robot mascot celebrating under a lightbulb",
    line: "Save your details once in a ChatGPT Project. Every chat inside it starts already knowing them.",
  },
  intro: {
    heading: "Write the brief once, use it in every chat",
    lead: "A new ChatGPT chat starts from zero. So every time you work on a client or an offer, you explain the same things again: who they are, what you agreed, how it should sound. This guide puts those details in a ChatGPT Project (a folder that keeps chats, files and instructions together) once, so every chat inside it already knows them.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A clear rule for when to use a new chat, a Project or custom instructions",
        "**One ChatGPT Project** for your most active client or offer",
        "A **Project brief**: who it's for, the goal, what you deliver, deadlines, tone and rules",
        "The **key files** saved inside it (proposal, notes), with private details removed",
        "A 2-chat test that proves the Project remembers, and the same setup for every active client",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. Projects may not be on every plan; step 02 shows what to do if you don't see them. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Project Brief.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Pick the right place", accent: "Three places, three jobs.", blocks: [
      { kind: "p", text: "ChatGPT has three places to put information. Each one remembers something different, so pick the right one before you set anything up." },
      { kind: "table", head: ["Place", "What it remembers", "Use it for"], rows: [
        ["**New chat**", "Only what you say in that chat. The next new chat starts from zero.", "One-off questions: a quick rewrite, an idea, a definition"],
        ["**Project**", "Its own instructions and files, in every chat you start inside it", "Ongoing work on one client or one offer, over many chats"],
        ["**Custom instructions**", "A short note about you and how you like answers, in every chat", "Things true for all your work: your business, your tone, your rules"],
      ] },
      { kind: "list", ordered: true, items: [
        "Write down your active clients and offers: the ones you'll work on more than once in the next month.",
        "Circle the one you explain to ChatGPT most often. That is your first Project.",
        "Collect what you already have for it: the proposal, your call notes, the agreed deliverables.",
      ] },
      { kind: "tip", text: "Before you upload anything, remove what shouldn't be there: card and bank details, passwords, personal information about anyone. Swap names for [client] where you can." },
    ] },
    { num: "02", title: "Create the Project", accent: "One per client or offer.", blocks: [
      { kind: "p", text: "The Project is the container. Everything you add to it is used by every chat you start inside it." },
      { kind: "list", ordered: true, items: [
        "Go to [chatgpt.com](https://chatgpt.com) and sign in.",
        "In the left sidebar, click **New project**.",
        "Name it after the client or offer, for example **[Client] website rewrite** or **[Offer name] launch**.",
        "Leave it open. The next two steps add the brief and the files.",
      ] },
      { kind: "tip", text: "**Don't see Projects?** Menus change and the feature may not be on your plan. Search \"projects\" on [OpenAI's help pages](https://help.openai.com/). If it isn't available, save the brief from step 03 in your notes and paste it as the first message of every chat about that client." },
    ] },
    { num: "03", title: "Write the Project brief", accent: "Everything you keep repeating.", blocks: [
      { kind: "p", text: "The brief holds the facts you would otherwise explain again in every chat. Let ChatGPT interview you so nothing is missed." },
      { kind: "p", text: "Start a chat inside the Project and paste this prompt. Answer in a sentence or two each time." },
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
Use only what I tell you. Write [CHECK] where information is missing instead of guessing. Never invent names, prices, dates or promises.
End the brief with this line: "If something you need is not in this brief or the files, ask me before you write."` },
      { kind: "p", text: "Read the brief, fill in every [CHECK] and fix anything that's off. Then save it as the Project's instructions:" },
      { kind: "list", ordered: true, items: [
        "Open the Project's menu (the three dots or the Project name at the top) and choose **Project settings** or **Instructions**.",
        "Paste the brief into the instructions box and save.",
        "If you can't find it, search \"project instructions\" on [OpenAI's help pages](https://help.openai.com/).",
      ] },
    ] },
    { num: "04", title: "Add your files", accent: "The proposal and the notes.", blocks: [
      { kind: "p", text: "Files give ChatGPT the detail the brief leaves out: what you proposed, what was said on the call, what was agreed." },
      { kind: "list", ordered: true, items: [
        "Pick 2 or 3 files: the proposal, your call notes, the list of deliverables. Fewer, clear files work better than many.",
        "Open each one and remove what shouldn't be shared: card and bank details, other clients' information, personal details. Swap names for [client] where needed.",
        "Inside the Project, find **Add files** (or the paperclip or + icon) and upload them.",
        "Give each file a clear name, for example **Proposal**, **Kick-off call notes**, **Deliverables**.",
      ] },
      { kind: "tip", text: "**Can't upload files?** Paste the key parts of each file into the brief instead, under a heading like \"From the proposal\"." },
    ] },
    { num: "05", title: "Test it with 2 chats", accent: "Proof it remembers.", blocks: [
      { kind: "p", text: "A Project only helps if a brand new chat inside it uses the brief. This test checks that." },
      { kind: "list", ordered: true, items: [
        "Inside the Project, start a new chat and paste test 1.",
        "Then start a second new chat, also inside the Project, and paste test 2.",
        "Compare both answers with your brief.",
      ] },
      { kind: "prompt", label: "Test chat 1", text: `Using only this Project's instructions and files, write a short update email to [client] about where the work stands.
Under 120 words. Use the tone in the brief.
Write [CHECK] where something isn't in the brief or files instead of guessing.` },
      { kind: "prompt", label: "Test chat 2 (a new chat in the same Project)", text: `Without me explaining anything, tell me in 5 bullets:
who this work is for, the goal, what I'm delivering, the next deadline, and one rule I gave you.
If any of these is missing from the Project, say "Not in the brief".` },
      { kind: "p", text: "**It passed if** both chats use the right client, goal and tone, and neither invents a date, price or promise." },
      { kind: "tip", text: "**It missed a fact?** Check both chats are inside the Project (the Project name shows at the top), and that the instructions were saved. If one detail keeps getting missed, move it to the top of the brief." },
    ] },
    { num: "06", title: "One Project per client", accent: "Repeat for each active one.", blocks: [
      { kind: "p", text: "Now do the same for every active client or offer, so none of them needs explaining again." },
      { kind: "list", ordered: true, items: [
        "Go back to your list from step 01 and repeat steps 02 to 05 for each active client or offer.",
        "When something changes (a new deadline, a new deliverable), update the brief the same day.",
        "When the work ends, archive or delete the Project, so old details don't creep into new work.",
      ] },
      { kind: "honest", text: "**The honest part:** a Project keeps your instructions, but it doesn't guarantee every answer follows them. It can still miss a detail or sound sure about something it got wrong. You read every draft before it goes to a client." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Picked your first client or offer",
        "Project created and named",
        "Project brief written, checked and saved as the instructions",
        "Files added with private details removed",
        "2-chat test passed",
        "One Project set up for each active client or offer",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "ChatGPT remembers your work.",
    accent: "Now make it get to the point.",
    body: "The next guide saves one set of length rules, so every answer in every Project comes back short and useful.",
    label: "Make ChatGPT answers shorter →",
    href: "/guides/make-chatgpt-answers-shorter/",
  },
  conclusion: {
    heading: "Keep it current",
    paragraph: "Update the brief when something changes, keep the files to the few that matter, and close the Project when the work ends.",
    finishLine: "Explain it once, then get on with the work.",
  },
};
