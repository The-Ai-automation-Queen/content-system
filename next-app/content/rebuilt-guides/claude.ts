import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "claude",
  lumailTag: "guide-claude",
  title: "How to Use Claude to Do My Admin",
  cover: "/images/mascot/planning.webp",
  coverAlt: "The blue robot mascot holding a calendar and a checklist",
  seoDescription: "Use Claude to do your admin: one Admin project turns call notes into actions, answers questions about documents and writes emails. 6 steps.",
  tool: "Claude",
  minutes: 30,
  h1: { title: "How to Use Claude", accent: "to Do My Admin" },
  hero: {
    kind: "pose",
    src: "/images/mascot/planning.webp",
    alt: "The blue robot mascot holding a calendar and a checklist",
    line: "Call notes, long documents and emails. One short prompt each.",
  },
  intro: {
    heading: "Hand Claude your weekly admin",
    lead: "Call notes, long documents and replies eat your week. This guide sets up Claude (an AI assistant) to draft all three.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**One Admin project** in Claude, with your rules saved",
        "**An action list** from real call notes",
        "**A document answer** with the exact sentence to check",
        "**A short email** from your rough points",
      ] },
      { kind: "tip", text: "You need a Claude account. The free plan works. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "admin project rules.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Set up Claude safely", accent: "Done once.", blocks: [
      { kind: "p", text: "Do this before you paste any client work. It stops Claude learning from your chats." },
      { kind: "list", ordered: true, items: [
        "Open [Claude](https://claude.ai/) and sign in.",
        "Click your name in the bottom left, then **Settings**, then **Privacy**.",
        "Turn off the switch that lets Claude learn from your chats, like **Help improve Claude**.",
        "Copy your call notes and one email into a note. Swap real names for [client].",
        "Delete bank details, passwords and personal details.",
      ] },
      { kind: "tip", text: "Can't find it? Anthropic moves this menu. Search \"model training\" on [Anthropic's help pages](https://support.anthropic.com/)." },
    ] },
    { num: "02", title: "Make the Admin project", accent: "One home for admin.", blocks: [
      { kind: "p", text: "A project (a folder with its own rules) makes every chat inside it follow your rules." },
      { kind: "list", ordered: true, items: [
        "In the left menu, click **Projects**, then **New project**.",
        "Name it **Admin** and click **Create project**.",
        "Click in the chat box and paste the prompt below.",
      ] },
      { kind: "prompt", label: "Write my Admin rules", text: `Write instructions for my Admin project. I run a small business: [what you do and who you help].

Ask me these one at a time and wait for each answer:
1. How do I like emails to sound?
2. How do I sign off my emails?
3. What do I never want to say or promise in writing?

Then write the instructions in 4 parts:

Job 1, call notes to actions: give me Decisions, then a table (Action | Owner | Deadline), then Open questions. Keep suggestions apart from decisions. Write "Not agreed" where an owner or deadline is missing.

Job 2, questions about a document: answer only from the attached document. Quote the exact sentence and give the page or section. If it does not answer it, say so.

Job 3, rough points to email: under 120 words, in my tone, with my sign-off.

Every job: use only what I give you. If something is missing, write [CHECK]. Never make up names, prices, dates or promises.

Keep it under 2,000 characters.` },
      { kind: "p", text: "Answer the 3 questions. Check your answers are in the rules, then copy them." },
      { kind: "tip", text: "Can't find it? Search \"projects\" on [Anthropic's help pages](https://support.anthropic.com/)." },
    ] },
    { num: "03", title: "Save the rules", accent: "Paste once.", blocks: [
      { kind: "p", text: "Saved rules apply to every chat in the project." },
      { kind: "list", ordered: true, items: [
        "Open the Admin project page.",
        "Click **Instructions** on the right.",
        "Paste your rules and click **Save**.",
      ] },
      { kind: "tip", text: "Can't find it? Search \"project instructions\" on [Anthropic's help pages](https://support.anthropic.com/)." },
    ] },
    { num: "04", title: "Turn notes into actions", accent: "Who does what, by when.", blocks: [
      { kind: "p", text: "Messy notes become a clear list. Start a new chat in the Admin project." },
      { kind: "prompt", label: "Job 1: call notes", text: `Job 1. Here are my notes from a call with [client]:
[paste your notes]` },
      { kind: "list", ordered: true, items: [
        "Find each name and date in your notes. Delete any that are not there.",
        "Move anything only \"suggested\" from **Decisions** to **Open questions**.",
        "Ask the client about each **Not agreed**.",
      ] },
    ] },
    { num: "05", title: "Ask a document", accent: "With the exact sentence.", blocks: [
      { kind: "p", text: "Claude quotes the sentence it used. You can check it against the source." },
      { kind: "list", ordered: true, items: [
        "Start a new chat in the Admin project.",
        "Click the **paperclip** or **+** and pick your document.",
        "Paste the prompt below with your question.",
      ] },
      { kind: "prompt", label: "Job 2: ask the document", text: `Job 2. My question about the attached document: [your question, for example: What is the notice period?]
Quote the exact sentence you used and give the page or section.` },
      { kind: "list", ordered: true, items: [
        "Copy 4 or 5 words from the quote.",
        "Open the document and press **Ctrl + F** (or **Cmd + F** on a Mac).",
        "Paste the words. Nothing found? Do not use the answer.",
      ] },
    ] },
    { num: "06", title: "Turn points into email", accent: "In your tone.", blocks: [
      { kind: "p", text: "You know what to say, not how. Claude writes it short." },
      { kind: "prompt", label: "Job 3: points to email", text: `Job 3. Write an email to [client] from these points:
[paste your rough points]` },
      { kind: "list", ordered: true, items: [
        "Delete any date, price or promise not in your points.",
        "Fill in every **[CHECK]** and put the real name back.",
        "One line wrong? Tell Claude the right fact in the same chat.",
        "Send it yourself.",
      ] },
      { kind: "honest", text: "**The honest part:** Claude can get a detail wrong and sound sure. It writes the first version. You check it and you send it." },
    ] },
    { num: "✓", title: "Checklist", accent: "Six boxes.", blocks: [
      { kind: "checklist", items: [
        "Turned off training in Privacy",
        "Made the Admin project",
        "Saved your Admin rules",
        "Turned one set of call notes into actions",
        "Found one quoted sentence with Ctrl + F",
        "Sent one email you checked",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Claude handles your admin.",
    accent: "Now find files in Gemini.",
    body: "Are your documents in Google Drive? The next guide gets Gemini to find the right file.",
    label: "Fix Gemini and your Drive files →",
    href: "/guides/gemini-cannot-find-drive-file/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Use the Admin project for every call, document and reply. Check names and dates before you send.",
    finishLine: "Claude writes the admin. You decide.",
  },
};
