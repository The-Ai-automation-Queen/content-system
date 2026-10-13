import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "connect-ai-to-email-files-calendar",
  lumailTag: "guide-connect-ai-to-email-files-calendar",
  title: "Is It Safe to Connect ChatGPT to My Gmail?",
  cover: "/images/mascot/email-sorting.webp",
  coverAlt: "The blue robot mascot sorting envelopes into a box",
  seoDescription: "Is it safe to connect ChatGPT to your Gmail? See what it can read, find every AI connection you already have, and keep, reduce or remove each one.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "Is It Safe to Connect", accent: "ChatGPT to My Gmail?" },
  hero: {
    kind: "pose",
    src: "/images/mascot/email-sorting.webp",
    alt: "The blue robot mascot sorting envelopes into a box",
    line: "What it can see, and how to give it as little access as possible. Then a list of every connection you keep.",
  },
  intro: {
    heading: "Give AI the access it needs, and nothing more",
    lead: "Connecting AI to your inbox, files or calendar can save time, and it also lets the tool read your clients' emails, contracts and invoices. This guide shows you how much access each job really needs, finds what you have already connected, and ends with a list of every connection and what you decided to do with it.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "The **access ladder**: four levels of access, and which one is enough for each job",
        "Every AI connection you already have, found in your AI tools and in your Google or Microsoft account",
        "A saved prompt that explains any **permission screen** in plain English before you click Allow",
        "**Your AI access list**: every connection, what it can see, and whether you keep, reduce or remove it",
        "Access you don't need removed, in the AI tool and in your account",
      ] },
      { kind: "tip", text: "You need your AI tool (ChatGPT, Claude, Gemini or Copilot) and the login for your email account (Google or Microsoft). Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get",
    accent: "your AI access list.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Climb the access ladder", accent: "Start at the bottom.", blocks: [
      { kind: "p", text: "There are four ways to give AI your information. Each step up the ladder lets it see more. Most jobs only need the first or second rung." },
      { kind: "table", head: ["Level", "What it means", "When it is enough", "What AI can see"], rows: [
        ["1. Paste one item", "You copy one email or note into the chat", "Replying to one email, summarising one set of notes", "Only what you paste"],
        ["2. Upload one file", "You attach one document to the chat", "Checking one proposal, summarising one contract", "Only that file"],
        ["3. Connect one app, read-only", "The AI can search one app (for example Gmail or Drive) but not change anything", "Finding all emails from one client, searching your files", "Everything in that app"],
        ["4. Full access", "The AI can read, send, edit or delete in your apps", "Rarely needed for a small business", "Everything, and it can act for you"],
      ] },
      { kind: "p", text: "**The rule:** use the lowest level that does the job. If pasting one email works, don't connect your inbox." },
      { kind: "p", text: "Before you connect anything, remember what your inbox holds: client emails, contracts, invoices, password reset links and other people's personal details. A connection gives the AI tool access to all of it, not only the email you had in mind." },
      { kind: "tip", text: "On a work account (Google Workspace or Microsoft 365), your administrator may control what can be connected. If a connection is blocked, ask them before you look for a way round it." },
    ] },
    { num: "02", title: "Find what's connected", accent: "Two places to look.", blocks: [
      { kind: "p", text: "You may have connected AI tools months ago and forgotten. Look in two places: inside each AI tool, and in your email account's list of apps that can reach your data." },
      { kind: "h3", text: "1. Inside each AI tool" },
      { kind: "table", head: ["Tool", "Where to look", "Official help page"], rows: [
        ["ChatGPT", "Click your name or profile picture, then **Settings**, then **Apps** (or **Connectors** or **Plugins**, if that is what you see).", "[OpenAI: connected apps](https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt)"],
        ["Claude", "Open **Settings** (or **Customize**), then **Connectors**.", "[Anthropic: connectors](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)"],
        ["Gemini", "Open **Settings & help**, then **Connected Apps** (it may sit under **Personal Intelligence**).", "[Google: Gemini connected apps](https://support.google.com/gemini/answer/13695044?co=GENIE.Platform%3DDesktop)"],
        ["Copilot", "On copilot.com, click **+**, then **Use connectors**. On mobile, your profile, then **Connectors**.", "[Microsoft: connecting Copilot](https://support.microsoft.com/en-us/microsoft-copilot/connecting-microsoft-copilot-to-other-services)"],
      ] },
      { kind: "h3", text: "2. In your email account" },
      { kind: "list", ordered: true, items: [
        "**Google (Gmail, Drive, Calendar):** go to [your Google third-party connections page](https://myaccount.google.com/connections). You'll see every app that can reach your Google account. Click one to see what it can access.",
        "**Microsoft (Outlook, OneDrive):** sign in at [account.microsoft.com](https://account.microsoft.com), open **Privacy**, and look for the apps and services that can access your account.",
        "Write down every AI tool you find, and anything you don't recognise.",
      ] },
      { kind: "tip", text: "Menu names change. If you can't find a page, open the tool's official help page above, or search \"apps with access to my account\" on Google or Microsoft's own help pages." },
    ] },
    { num: "03", title: "Read the permission screen", accent: "Before you click Allow.", blocks: [
      { kind: "p", text: "When you connect an app, you see a permission screen listing what the tool will be able to do. These screens are hard to read. This prompt turns one into plain English." },
      { kind: "list", ordered: true, items: [
        "Start connecting the app, and stop when you reach the permission screen. Don't click **Allow** yet.",
        "Copy the text on the screen (or take a screenshot if your AI tool accepts images).",
        "Paste it into a new chat with this prompt.",
      ] },
      { kind: "prompt", label: "Explain this permission screen", text: `I run a small business. I'm about to connect [AI tool] to [app, for example Gmail].
I want it for this job: [the job, for example "find emails from one client and summarise them"].

Here is the text from the permission screen:
[paste the permission text]

Explain it in plain English, in a table with these columns:
Permission | What it lets the tool do | Can it read? | Can it send or change? | Can it delete? | Risk for my business (low, medium, high)

Then tell me:
1. Which permissions my job actually needs
2. Whether a lower level would do the job (pasting one item, uploading one file, or read-only access)
3. One sentence: connect, connect with care, or don't connect

Use only the text I pasted. If a permission is unclear, write [CHECK] instead of guessing.` },
      { kind: "p", text: "If the answer says a lower level would do the job, use that instead. If you still want to connect, click **Allow** and add it to your access list in the next step." },
    ] },
    { num: "04", title: "Build your access list", accent: "Keep, reduce or remove.", blocks: [
      { kind: "p", text: "Your access list is one table with every AI connection you have. It shows what each one can see and what you decided to do with it." },
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
- Keep: used often, and the access matches the job

Use only what I tell you. Write [CHECK] where you don't know what an app can see.` },
      { kind: "p", text: "Copy the table into your notes or a spreadsheet and name it **AI access list**. Look up every [CHECK] line on the app's help page or on your Google or Microsoft connections page." },
    ] },
    { num: "05", title: "Remove what you don't need", accent: "In two places.", blocks: [
      { kind: "p", text: "Removing a connection in the AI tool doesn't always remove it from your account. Do both." },
      { kind: "list", ordered: true, items: [
        "**In the AI tool:** go back to the page from step 02, choose the connection and click **Disconnect** (or **Remove**).",
        "**In your Google account:** open [your third-party connections page](https://myaccount.google.com/connections), click the app, then **Delete all connections** (or **Remove access**).",
        "**In your Microsoft account:** on the apps and services page from step 02, choose the app and remove its access.",
        "**To reduce:** disconnect, then connect again and give only the permissions the job needs. If the screen gives no choice, use paste or upload instead.",
        "Update your access list with the date you removed each one.",
      ] },
      { kind: "tip", text: "**Found an app you don't recognise?** Remove its access first, then change your email password and turn on two-step sign-in if it is off." },
      { kind: "honest", text: "**The honest part:** a connected AI tool can't tell a client's confidential email from a newsletter. It reads what the permission allows. Less access means less to go wrong. Read the access list every 3 months and remove anything you stopped using." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Lowest access level chosen for each job you use AI for",
        "Connections checked in every AI tool you use",
        "Google or Microsoft connections page checked",
        "Permission screen prompt saved in your notes",
        "AI access list saved with a decision for every connection",
        "Unused connections removed in the tool and in your account",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your access is under control.",
    accent: "Now get honest answers.",
    body: "AI tends to agree with whatever you say. The next guide sets it up to tell you what's wrong with your offers, pages and plans.",
    label: "Build your honest critic →",
    href: "/guides/stop-ai-agreeing-with-you/",
  },
  conclusion: {
    heading: "Keep it tight",
    paragraph: "Run the permission screen prompt before every new connection, add it to your access list, and read the list every 3 months.",
    finishLine: "The lowest level that does the job, every time.",
  },
};
