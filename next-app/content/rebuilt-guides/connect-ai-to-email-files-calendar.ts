import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "connect-ai-to-email-files-calendar",
  lumailTag: "guide-connect-ai-to-email-files-calendar",
  title: "Is It Safe to Connect ChatGPT to My Gmail?",
  cover: "/images/mascot/email-sorting.webp",
  coverAlt: "The blue robot mascot sorting envelopes into a box",
  seoDescription: "Is it safe to connect ChatGPT to your Gmail? See what it can read, find every AI link you already have, and keep, cut back or remove each one.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "Is It Safe to Connect", accent: "ChatGPT to My Gmail?" },
  hero: {
    kind: "pose",
    src: "/images/mascot/email-sorting.webp",
    alt: "The blue robot mascot sorting envelopes into a box",
    line: "See what AI can read. Let it see as little as you can. Then list every link you keep.",
  },
  intro: {
    heading: "Give AI what it needs, and nothing more",
    lead: "Linking AI to your email, files or calendar can save time. But it also lets the AI read client emails, contracts and invoices. This guide shows how much each job really needs. You find what is already linked. You end with a list of every link and what you decided.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "The **access ladder**: four levels, and which one is enough for each job",
        "Every AI link you already have, in your AI tools and your Google or Microsoft account",
        "A saved prompt that explains any **permission screen** (the screen that asks what the app may do) before you click Allow",
        "**Your AI access list**: every link, what it can see, and if you keep, cut back or remove it",
        "Links you don't need removed, in the AI tool and in your account",
      ] },
      { kind: "tip", text: "You need your AI tool: ChatGPT, Claude, Gemini or Copilot. You also need the login for your email account (Google or Microsoft). You can copy and paste every prompt below. Change the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get",
    accent: "your AI access list.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Climb the access ladder", accent: "Start at the bottom.", blocks: [
      { kind: "p", text: "There are four ways to give AI your details. Each level up lets it see more. Most jobs only need level 1 or 2." },
      { kind: "table", head: ["Level", "What it means", "When it is enough", "What AI can see"], rows: [
        ["1. Paste one item", "You copy one email or note into the chat", "Replying to one email, summarising one set of notes", "Only what you paste"],
        ["2. Upload one file", "You add one document to the chat", "Checking one proposal, summarising one contract", "Only that file"],
        ["3. Connect one app, read-only", "The AI can search one app (like Gmail or Drive) but not change anything", "Finding all emails from one client, searching your files", "Everything in that app"],
        ["4. Full access", "The AI can read, send, edit or delete in your apps", "Small businesses rarely need this", "Everything, and it can act for you"],
      ] },
      { kind: "p", text: "**The rule:** use the lowest level that does the job. If pasting one email works, don't connect your inbox." },
      { kind: "p", text: "Think about what your inbox holds. Client emails, contracts, invoices, password reset links, and other people's private details. A connection lets the AI tool see all of it. Not just the one email you had in mind." },
      { kind: "tip", text: "On a work account (Google Workspace or Microsoft 365), the person who runs your accounts may decide what can connect. If a connection is blocked, ask them. Don't look for a way around it." },
    ] },
    { num: "02", title: "Find what's connected", accent: "Two places to look.", blocks: [
      { kind: "p", text: "You may have connected AI tools months ago and forgotten. Look in two places. First, inside each AI tool. Second, in your email account's list of apps that can see your data." },
      { kind: "h3", text: "1. Inside each AI tool" },
      { kind: "table", head: ["Tool", "Where to look", "Official help page"], rows: [
        ["ChatGPT", "Click your name or picture, then **Settings**, then **Apps**. You may see **Connectors** or **Plugins** instead.", "[OpenAI: connected apps](https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt)"],
        ["Claude", "Open **Settings** (or **Customize**), then **Connectors**.", "[Anthropic: connectors](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)"],
        ["Gemini", "Open **Settings & help**, then **Connected Apps**. It may be under **Personal Intelligence**.", "[Google: Gemini connected apps](https://support.google.com/gemini/answer/13695044?co=GENIE.Platform%3DDesktop)"],
        ["Copilot", "On copilot.com, click **+**, then **Use connectors**. On a phone: your profile, then **Connectors**.", "[Microsoft: connecting Copilot](https://support.microsoft.com/en-us/microsoft-copilot/connecting-microsoft-copilot-to-other-services)"],
      ] },
      { kind: "h3", text: "2. In your email account" },
      { kind: "list", ordered: true, items: [
        "**Google (Gmail, Drive, Calendar):** go to [your Google third-party connections page](https://myaccount.google.com/connections). It shows every app linked to your Google account. Click one to see what it can see.",
        "**Microsoft (Outlook, OneDrive):** sign in at [account.microsoft.com](https://account.microsoft.com). Open **Privacy**. Look for the apps and services linked to your account.",
        "Write down every AI tool you find. Also write down anything you don't know.",
      ] },
      { kind: "tip", text: "Menu names change. Can't find a page? Open the tool's help page above. Or search \"apps with access to my account\" on Google or Microsoft's help pages." },
    ] },
    { num: "03", title: "Read the permission screen", accent: "Before you click Allow.", blocks: [
      { kind: "p", text: "When you connect an app, a permission screen lists what the tool will be able to do. These screens are hard to read. This prompt explains one in plain English." },
      { kind: "list", ordered: true, items: [
        "Start connecting the app. Stop when you reach the permission screen. Don't click **Allow** yet.",
        "Copy the words on the screen. Or take a screenshot, if your AI tool takes pictures.",
        "Paste it into a new chat with this prompt.",
      ] },
      { kind: "prompt", label: "Explain this permission screen", text: `I run a small business. I'm about to connect [AI tool] to [app, for example Gmail].
I want it for this job: [the job, for example "find emails from one client and summarise them"].

Here is the text from the permission screen:
[paste the permission text]

Explain it in plain English, in a table with these columns:
Permission | What it lets the tool do | Can it read? | Can it send or change? | Can it delete? | Risk for my business (low, medium, high)

Then tell me:
1. Which permissions my job really needs
2. Whether a lower level would do the job (pasting one item, uploading one file, or read-only)
3. One sentence: connect, connect with care, or don't connect

Use only the text I pasted. If a permission is unclear, write [CHECK] instead of guessing.` },
      { kind: "p", text: "Does the answer say a lower level would work? Then use that. Still want to connect? Click **Allow**. Add it to your access list in the next step." },
    ] },
    { num: "04", title: "Build your access list", accent: "Keep, reduce or remove.", blocks: [
      { kind: "p", text: "Your access list is one table of every AI connection you have. It shows what each one can see. It shows what you decided to do with it." },
      { kind: "prompt", label: "Build my AI access list", text: `Help me build my AI access list.

Here are the connections I found (from my AI tools and my Google or Microsoft account):
[list each one, for example "ChatGPT connected to Gmail", "Claude connected to Google Drive", "Unknown app: [name]"]

For each one, ask me one question at a time and wait for my answer:
- What do I use it for?
- When did I last use it?

Then give me a table with these columns:
Connection | What it can see | Can it send, change or delete? | What I use it for | Last used | Decision (keep, reduce, remove) | Why

Decide like this:
- Remove: not used in the last month, or I don't know what it is
- Reduce: used, but a lower level (paste, upload, read-only) would do the job
- Keep: used often, and what it can see matches the job

Use only what I tell you. Write [CHECK] where you don't know what an app can see.` },
      { kind: "p", text: "Copy the table into your notes or a spreadsheet. Name it **AI access list**. Look up every [CHECK] line. Use the app's help page, or your Google or Microsoft connections page." },
    ] },
    { num: "05", title: "Remove what you don't need", accent: "In two places.", blocks: [
      { kind: "p", text: "Removing a connection in the AI tool may not remove it from your account. Do both." },
      { kind: "list", ordered: true, items: [
        "**In the AI tool:** go back to the page from step 02. Choose the connection. Click **Disconnect** (or **Remove**).",
        "**In your Google account:** open [your third-party connections page](https://myaccount.google.com/connections). Click the app, then **Delete all connections** (or **Remove access**).",
        "**In your Microsoft account:** go to the apps and services page from step 02. Choose the app and remove it.",
        "**To reduce:** disconnect, then connect again. Allow only what the job needs. No choice on the screen? Paste or upload instead.",
        "Add the date you removed each one to your access list.",
      ] },
      { kind: "tip", text: "**Found an app you don't know?** Remove it first. Then change your email password. Turn on two-step sign-in (a code on your phone as well as your password) if it is off." },
      { kind: "honest", text: "**The honest part:** a connected AI tool can't tell a client's private email from a newsletter. It reads whatever it is allowed to. The less it can see, the less can go wrong. Check your access list every 3 months. Remove anything you stopped using." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Lowest level picked for each AI job",
        "Connections checked in every AI tool you use",
        "Google or Microsoft connections page checked",
        "Permission screen prompt saved in your notes",
        "AI access list saved, with a decision for each connection",
        "Unused connections removed in the tool and your account",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your access is under control.",
    accent: "Now get honest answers.",
    body: "AI tends to agree with whatever you say. The next guide sets it up to tell you what is wrong with your offers, pages and plans.",
    label: "Build your honest critic →",
    href: "/guides/stop-ai-agreeing-with-you/",
  },
  conclusion: {
    heading: "Keep it tight",
    paragraph: "Run the permission screen prompt before every new connection. Add each one to your access list. Check the list every 3 months.",
    finishLine: "Use the lowest level that does the job. Every time.",
  },
};
