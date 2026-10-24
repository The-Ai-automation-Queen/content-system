import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "connect-ai-to-email-files-calendar",
  lumailTag: "guide-connect-ai-to-email-files-calendar",
  title: "Is It Safe to Connect ChatGPT to My Gmail?",
  cover: "/images/mascot/email-sorting.webp",
  coverAlt: "The blue robot mascot sorting envelopes into a box",
  seoDescription: "Is it safe to connect ChatGPT to your Gmail? Give it the least access the job needs, read the permission screen and remove old links. 4 steps.",
  tool: "ChatGPT",
  minutes: 25,
  h1: { title: "Is It Safe to Connect", accent: "ChatGPT to My Gmail?" },
  hero: {
    kind: "pose",
    src: "/images/mascot/email-sorting.webp",
    alt: "The blue robot mascot sorting envelopes into a box",
    line: "Give AI only what the job needs. Often one file is enough.",
  },
  intro: {
    heading: "Give AI only what it needs",
    lead: "Connecting Gmail lets AI see your whole inbox. This guide shows how little access each job needs, and how to remove old links.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**The smallest access** picked for each job",
        "**One job done** with a single uploaded file",
        "**Any permission screen** explained in plain English",
        "**An AI access list**, with old links removed",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "AI access list.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Pick the smallest access", accent: "Decide before you connect.", blocks: [
      { kind: "p", text: "Your inbox holds contracts, invoices and password links. A connection lets AI see all of it." },
      { kind: "table", head: ["Level", "Good for", "What AI can see"], rows: [
        ["1. Paste one email", "Replying to one email", "Only what you paste"],
        ["2. Upload one file", "Checking one proposal", "Only that file"],
        ["3. Connect one app, read only", "Finding every email from one client", "Everything in that app"],
        ["4. Let it send or delete", "Rarely needed. Do it yourself", "Everything, and it can act"],
      ] },
      { kind: "p", text: "Write down 3 jobs you do each week. Give each the lowest level that works." },
    ] },
    { num: "02", title: "Upload one file", accent: "Nothing else gets opened.", blocks: [
      { kind: "p", text: "Most jobs need one file, not your whole inbox. Try it now." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and click **New chat**.",
        "Click the **+** next to the chat box, then **Add photos and files**.",
        "Pick one file with client names swapped for brackets.",
        "Paste the prompt below and press Enter.",
      ] },
      { kind: "prompt", label: "Work from one file", text: `Use only the file I uploaded.

Sum up what [client] asked for and what I need to reply to, in 5 short lines.
If something is not in the file, write [CHECK].
Never make up names, prices, dates or promises.` },
      { kind: "p", text: "The job is done, and nothing else in your account was opened." },
    ] },
    { num: "03", title: "Read the permission screen", accent: "Before you click Allow.", blocks: [
      { kind: "p", text: "The permission screen says what the tool can do. Read it before you say yes." },
      { kind: "list", ordered: true, items: [
        "Start connecting the app. Stop at the permission screen.",
        "Copy the words on the screen. Leave out your email address.",
        "Open a new chat and paste the prompt below.",
      ] },
      { kind: "prompt", label: "Explain this permission screen", text: `I want to connect [AI tool] to [app, for example: Gmail] for this job: [the job].

Here is the permission screen:
[paste the text]

Explain each permission in plain English.
Say if it can read, send, change, delete or share.
Then tell me if pasting or uploading one file would do the job instead.
Use only the text I pasted. If something is unclear, write [CHECK].` },
      { kind: "list", ordered: true, items: [
        "Check the screen yourself for **send**, **delete** or **share**.",
        "You still need it? Click **Allow**. If not, click **Cancel** and paste or upload instead.",
      ] },
    ] },
    { num: "04", title: "Remove old links", accent: "In two places.", blocks: [
      { kind: "p", text: "You may have connected apps months ago. Removing one in ChatGPT may not remove it from Google." },
      { kind: "list", ordered: true, items: [
        "In ChatGPT, click your name, then **Settings**, then **Apps**. Write down each app.",
        "Open your [Google connections page](https://myaccount.google.com/connections). Write down each app there too.",
        "Paste your list into the prompt below.",
      ] },
      { kind: "prompt", label: "Build my AI access list", text: `Help me build my AI access list.

Here are my connections:
[list each one, for example: ChatGPT connected to Gmail]

For each one, ask me what I use it for and when I last used it. One question at a time.
Then make a table: Connection | What it can see | Keep or remove | Why.
Remove anything not used in the last month, or that I don't know.
Use only what I tell you. If you don't know what an app can see, write [CHECK].` },
      { kind: "list", ordered: true, items: [
        "For each **remove** line, click the app in ChatGPT **Settings**, **Apps**, then **Disconnect**.",
        "On your Google page, click the app, then **Delete all connections**.",
        "Refresh both pages and check the app is gone.",
      ] },
      { kind: "tip", text: "Found an app you don't know? Remove it, then change your email password. Can't find **Apps**? See [OpenAI's connected apps page](https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt)." },
      { kind: "honest", text: "**The honest part:** a connected AI reads whatever it is allowed to. The less it can see, the less can go wrong. Check your list every 3 months." },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Picked a level for 3 real jobs",
        "Did one job with a single uploaded file",
        "Read a permission screen before clicking Allow",
        "Made your AI access list",
        "Removed old links in ChatGPT and in Google",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your access is under control.",
    accent: "Now get honest answers.",
    body: "AI tends to agree with whatever you say. The next guide makes it tell you what is wrong with your offers and plans.",
    label: "Get honest answers →",
    href: "/guides/stop-ai-agreeing-with-you/",
  },
  conclusion: {
    heading: "Keep it tight",
    paragraph: "Pick the lowest level for every job. Read every permission screen. Remove links you stopped using.",
    finishLine: "Use the lowest level that does the job. Every time.",
  },
};
