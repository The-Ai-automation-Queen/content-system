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
    line: "Give AI only what the job needs. Often one file is enough. Then find and tidy every link you already have.",
  },
  intro: {
    heading: "Give AI what it needs, and nothing more",
    lead: "Here is the moment. You want ChatGPT to sum up every email from one client. A screen pops up asking to connect your Gmail, and you nearly click Allow. But your inbox also holds contracts, invoices and password reset links. This guide shows you how much access each job really needs. You find every AI link you already have, and you remove the ones you don't need.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**The smallest access for each job**, so AI sees only what it needs",
        "**Every AI link you already have, found**, in your AI tools and in your Google or Microsoft account",
        "**A plain-English reading of any permission screen** (the screen that asks what an app may do), before you click Allow",
        "**One list of every link you keep**, what it can see and why you keep it",
        "**The links you don't need, removed** in both places",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer with a web browser, like Chrome. The steps are for the websites, not the phone apps.",
        "Your AI tool login: ChatGPT, Claude, Gemini or Copilot. Free plans have fewer connections, so you may see less.",
        "The login for your email account (Google or Microsoft). You may need to sign in again.",
        "One real job you want AI to help with this week, like \"sum up the emails from [client]\".",
        "A blank document or spreadsheet, for your list.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted. Change the parts in [square brackets] to your own details." },
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
    { num: "01", title: "Pick the smallest access", accent: "10 minutes. Decide before you connect.", blocks: [
      { kind: "p", text: "There are four ways to give AI your details. Each level up lets it see more. Most jobs only need level 1 or 2." },
      { kind: "table", head: ["Level", "What it means", "When it is enough", "What AI can see"], rows: [
        ["1. Paste one item", "You copy one email or note into the chat", "Replying to one email, summarising one set of notes", "Only what you paste"],
        ["2. Upload one file", "You add one document to the chat", "Checking one proposal, summarising one contract", "Only that file"],
        ["3. Connect one app, read-only", "The AI can search one app (like Gmail or Drive) but not change anything", "Finding all emails from one client, searching your files", "Everything in that app"],
        ["4. Allow actions", "The AI can send, edit or delete in your apps", "Small businesses rarely need this. Never as a first step", "Everything, and it can act for you"],
      ] },
      { kind: "p", text: "**The rule:** use the lowest level that does the job. If pasting one email works, don't connect your inbox." },
      { kind: "p", text: "Think about what your inbox holds. Client emails, contracts, invoices, password reset links, and other people's private details. A connection lets the AI tool see all of it. Not just the one email you had in mind." },
      { kind: "h3", text: "A. Pick a level for your real job" },
      { kind: "list", ordered: true, items: [
        "Open your blank document. Type the job you picked, for example \"sum up the emails from [client]\".",
        "Ask: is it one email or one file? Then write **Level 1** or **Level 2**.",
        "Is it many emails or files, and you don't know which ones? Then write **Level 3**.",
        "Does the job need AI to send, move or delete something? Write **Level 4, do it myself instead**.",
        "Do the same for two more jobs you do each week.",
      ] },
      { kind: "example", label: "Three jobs", text: "Reply to [client]'s question about the invoice. Check my proposal for [client]. Find every email from [client] since June." },
      { kind: "result", label: "What a good list looks like", lines: [
        "Reply to the invoice question: Level 1. Paste that one email.",
        "Check my proposal: Level 2. Upload the one file.",
        "Find every email since June: Level 3. Connect Gmail, read-only.",
      ] },
      { kind: "h3", text: "B. Try level 2 now" },
      { kind: "list", ordered: true, items: [
        "Open ChatGPT and click **New chat** at the top left.",
        "Click the **+** button on the left of the chat box. On some screens it is a paperclip.",
        "Click **Add photos and files** (on some screens, **Upload from computer**). Pick one file with client names swapped for brackets.",
        "You will see the file as a small card above the chat box. Now type your question and press Enter.",
        "That is the job done, and nothing else in your account was opened.",
      ] },
      { kind: "tip", text: "**On a work account** (Google Workspace or Microsoft 365)? The person who runs your accounts may decide what can connect. If a connection is blocked, ask them. Don't look for a way round it." },
    ] },
    { num: "02", title: "Find what's already connected", accent: "Two places to look.", blocks: [
      { kind: "p", text: "You may have connected AI tools months ago and forgotten. Look in two places. First, inside each AI tool. Second, in your email account's list of apps that can see your data. Write down everything you find in your document." },
      { kind: "h3", text: "A. Inside ChatGPT" },
      { kind: "list", ordered: true, items: [
        "Open [chatgpt.com](https://chatgpt.com). Click your name or profile picture. On most screens it is at the bottom left.",
        "Click **Settings**. A settings window opens.",
        "On the left, click **Apps**. On some accounts this is called **Connectors** or **Plugins**.",
        "You will see a list of connected apps, like Gmail or Google Drive. Write down each one.",
        "Can't find **Apps**? OpenAI moves these menus. Search \"connected apps\" on [OpenAI's help page](https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt).",
      ] },
      { kind: "h3", text: "B. Inside your other AI tools" },
      { kind: "p", text: "Only check the tools you use." },
      { kind: "list", ordered: true, items: [
        "**Claude:** open [claude.ai](https://claude.ai). Open **Settings** (on some accounts, **Customize**), then **Connectors**. Write down each one. Can't find it? See [Anthropic's connectors help page](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities).",
        "**Gemini:** open [gemini.google.com](https://gemini.google.com). On the left, near the bottom, click **Settings & help**, then **Connected Apps**. On some accounts it sits under **Personal Intelligence**. Can't find it? See [Google's Gemini connected apps page](https://support.google.com/gemini/answer/13695044?co=GENIE.Platform%3DDesktop).",
        "**Copilot:** on copilot.com, click the **+** button, then **Use connectors**. On a phone, tap your profile, then **Connectors**. Can't find it? See [Microsoft's Copilot connectors page](https://support.microsoft.com/en-us/microsoft-copilot/connecting-microsoft-copilot-to-other-services).",
      ] },
      { kind: "h3", text: "C. In your Google account" },
      { kind: "list", ordered: true, items: [
        "Open [your Google third-party connections page](https://myaccount.google.com/connections). Sign in if Google asks.",
        "You will see a list of every app linked to your Google account.",
        "Click one app. A page opens that shows what it can see and do.",
        "Write down the app name and what it can see. Then click the back arrow and do the next one.",
        "Write down any app you don't know, too.",
      ] },
      { kind: "h3", text: "D. In your Microsoft account" },
      { kind: "list", ordered: true, items: [
        "Sign in at [account.microsoft.com](https://account.microsoft.com).",
        "Click **Privacy**.",
        "Look for the apps and services that can reach your account. Write down each one.",
        "Can't find it? Microsoft moves these menus. Search \"apps with access to your account\" on Microsoft's help pages.",
      ] },
      { kind: "tip", text: "**Turning a connection off in one chat** may leave the account still connected. Always check the settings page too." },
    ] },
    { num: "03", title: "Read the permission screen", accent: "Before you click Allow.", blocks: [
      { kind: "p", text: "When you connect an app, a permission screen lists what the tool will be able to do. Look for these words: read, create, edit, delete, send, share. Each one is a different level of access." },
      { kind: "p", text: "In ChatGPT, for example, **Allow read actions** means it can read from the connected app without asking each time. It still asks before making changes." },
      { kind: "h3", text: "A. Copy the screen" },
      { kind: "list", ordered: true, items: [
        "Start connecting the app. Stop when you reach the permission screen. Don't click **Allow** yet.",
        "Select the words on the screen with your mouse and copy them. Leave out your email address.",
        "Open a new tab. Start a new chat in your AI tool.",
        "Copy the prompt below and paste it in. Fill in the brackets and paste the screen text at the end.",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Explain this permission screen", text: `I run a small business. I'm about to connect [AI tool] to [app, for example Gmail].
I want it for this job: [the job, for example "find emails from one client and summarise them"].

Here is the text from the permission screen:
[paste the permission text, without my account details]

Explain it in plain English, in a table with these columns:
Permission | What it lets the tool do | Can it read? | Can it create, send or change? | Can it delete or share? | Risk for my business (low, medium, high)

Then tell me:
1. What information this could show the tool
2. Which permission is the riskiest
3. Whether a lower level would do the job (pasting one item, uploading one file, or read-only)
4. One sentence: connect, connect with care, or don't connect

Use only the text I pasted. Don't assume a permission that isn't in the text. If a permission is unclear, write [CHECK] instead of guessing.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Read your email | Can see every email in your inbox | Yes | No | No | high",
        "Riskiest: reading every email, including contracts and invoices.",
        "Lower level: upload the client's emails as one file, or paste the 3 you need.",
        "Connect with care, read-only, and remove it after the job.",
      ] },
      { kind: "h3", text: "B. Check it yourself" },
      { kind: "p", text: "The AI can misread the screen. The screen decides what the tool can do, not the AI's summary. So check the two side by side." },
      { kind: "list", ordered: true, items: [
        "Go back to the tab with the permission screen.",
        "Read each line of the screen. Find the same line in the AI's table.",
        "Does the screen say **send**, **delete** or **share** anywhere? Then the table must say yes for that line.",
        "Is there a line on the screen that is not in the table? The AI missed it. Treat it as high risk.",
        "Now answer these 3 questions yourself. Can you say yes to all of them?",
      ] },
      { kind: "list", items: [
        "I know what it can read.",
        "I know whether it can create, edit, send, share or delete.",
        "I know where to turn it off (step 02).",
      ] },
      { kind: "p", text: "All yes, and you still need it? Click **Allow**. Then add it to your list in step 04. Any no? Click **Cancel** and use a lower level." },
    ] },
    { num: "04", title: "Build your access list", accent: "Keep, cut back or remove.", blocks: [
      { kind: "p", text: "Your access list is one table of every AI link you have. It shows what each one can see, and what you decided to do with it." },
      { kind: "list", ordered: true, items: [
        "Start a new chat in your AI tool.",
        "Copy the prompt below and paste it in.",
        "Swap the bracket for the list you wrote in step 02. Use app names only, no email addresses.",
        "Press Enter. The AI asks you 2 questions about each link. Answer each one.",
      ] },
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
      { kind: "result", label: "What a good answer looks like", lines: [
        "ChatGPT + Gmail | all email | no | summing up client emails | last week | Keep | used often, read-only",
        "Claude + Google Drive | all files | [CHECK] | not sure | months ago | Remove | not used in the last month",
        "Unknown app: [name] | [CHECK] | [CHECK] | don't know | don't know | Remove | I don't know what it is",
      ] },
      { kind: "list", ordered: true, items: [
        "Copy the table into your document or a spreadsheet. Name it **AI access list**.",
        "Press **Ctrl + F** (or **Cmd + F** on a Mac) and search for **[CHECK]**.",
        "For each [CHECK], open the app on your Google or Microsoft connections page from step 02. Write in what it really says.",
        "Check the decisions. Change any you don't agree with. You know how you work. The AI does not.",
      ] },
    ] },
    { num: "05", title: "Remove what you don't need", accent: "In two places.", blocks: [
      { kind: "p", text: "Removing a connection in the AI tool may not remove it from your account. Do both. Work down every **Remove** and **Reduce** line in your list." },
      { kind: "h3", text: "A. In the AI tool" },
      { kind: "list", ordered: true, items: [
        "Go back to the page from step 02 (for ChatGPT: **Settings**, then **Apps**).",
        "Click the app you want to remove. A page opens about that app.",
        "Click **Disconnect** (on some screens, **Remove**). Click it again if a box asks you to confirm.",
        "You will see the app is no longer in the list, or it says **Connect** again.",
      ] },
      { kind: "h3", text: "B. In your Google or Microsoft account" },
      { kind: "list", ordered: true, items: [
        "**Google:** open [your third-party connections page](https://myaccount.google.com/connections). Click the app. Click **Delete all connections** (on some screens, **Remove access**). Confirm.",
        "**Microsoft:** go to the apps and services page from step 02. Choose the app and remove it.",
        "Refresh the page. Check the app is gone from the list.",
        "Write the date next to each one in your AI access list.",
      ] },
      { kind: "h3", text: "C. To cut back a connection" },
      { kind: "list", ordered: true, items: [
        "Disconnect it in both places, as above.",
        "Connect it again. On the permission screen, allow only what the job needs.",
        "No choice on the screen? Don't connect. Paste or upload instead.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["The app is gone in the AI tool but still on your Google page", "The account link is still open", "Remove it on the Google page too"],
        ["An app you don't know", "It may be old, or not yours", "Remove it first. Then change your email password"],
        ["The Disconnect button is grey or missing", "Your work account may control it", "Ask the person who runs your accounts"],
        ["You disconnected, but old chats still show your emails", "Disconnecting stops future access only", "Delete those chats from your chat history"],
      ] },
      { kind: "tip", text: "**Found an app you don't know?** Remove it, then change your email password. Turn on two-step sign-in (a code on your phone as well as your password) if it is off." },
      { kind: "honest", text: "**The honest part:** a connected AI tool can't tell a client's private email from a newsletter. It reads whatever it is allowed to. The less it can see, the less can go wrong. You decide what it can reach. Check your access list every 3 months and remove anything you stopped using." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "A level picked for 3 real jobs, and one done with a single uploaded file",
        "Connections checked in every AI tool you use",
        "Google or Microsoft connections page checked, and every app written down",
        "One permission screen explained by AI and checked line by line yourself",
        "AI access list saved, with a decision for every connection and no [CHECK] left",
        "Unused connections removed in the tool and in your account, with the date",
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
    paragraph: "Pick the lowest level for every job. Read every permission screen before you click Allow. Add each new link to your access list, and check the list every 3 months.",
    finishLine: "Use the lowest level that does the job. Every time.",
  },
};
