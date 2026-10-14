import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "gemini-cannot-find-drive-file",
  lumailTag: "guide-gemini-cannot-find-drive-file",
  title: "How to Get Gemini to Find Things in My Google Drive",
  cover: "/images/guides/gemini-cannot-find-drive-file.webp",
  coverAlt: "The blue robot mascot tracing one document through account keys and file drawers",
  seoDescription: "Get Gemini to find things in your Google Drive: switch on the connection, pick the file, and check the exact sentence it quotes. 5 steps.",
  tool: "Gemini",
  minutes: 25,
  h1: { title: "How to Get Gemini to Find Things", accent: "in My Google Drive" },
  hero: {
    kind: "scene",
    src: "/images/guides/gemini-cannot-find-drive-file.webp",
    alt: "The blue robot mascot tracing one document through account keys and file drawers",
    line: "Ask a question. Gemini finds the file and quotes the answer.",
  },
  intro: {
    heading: "Find any answer in your Drive",
    lead: "You open file after file to find one answer. This guide gets Gemini (Google's AI assistant) to find it and quote it. It takes 25 minutes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**Gemini connected** to the right Google Drive",
        "**One answer** from a file, with the exact sentence",
        "**Your 10 main files** renamed so they are easy to find",
        "**A 2-minute test** for when Gemini can't find a file",
      ] },
      { kind: "tip", text: "You need the Google account that holds your client files. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "drive search prompts.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Switch on Drive", accent: "Done once.", blocks: [
      { kind: "p", text: "Gemini only searches the account you are signed in to. Most \"can't find it\" problems start here." },
      { kind: "list", ordered: true, items: [
        "Open [Gemini](https://gemini.google.com).",
        "Click your picture top right. Check it is the email with your client files.",
        "Click **Settings & help**, then **Apps** (or **Extensions**).",
        "Turn on **Google Workspace**.",
        "Ask: \"Can you see my Google Drive? Name 3 files.\"",
      ] },
      { kind: "tip", text: "Can't find it? Google moves this menu. Search \"connected apps\" on [Google's Gemini help pages](https://support.google.com/gemini). On a work account, ask whoever runs it." },
    ] },
    { num: "02", title: "Point at one file", accent: "The surest answer.", blocks: [
      { kind: "p", text: "Pick the file yourself. Then Gemini cannot use the wrong one." },
      { kind: "list", ordered: true, items: [
        "Click the **+** next to the chat box.",
        "Click **Add from Drive**, find the file and click **Insert**.",
        "Paste the prompt below with your question.",
      ] },
      { kind: "prompt", label: "Answer from this file", text: `Use only the file I attached. Answer this question: [your question, for example: what did we agree about the deposit?]

Reply in this order:
1. The exact sentence from the file, word for word, in quotation marks.
2. The heading it sits under.
3. The answer in one short line.

Use only this file. If it does not answer the question, write "Not in this file".
Never make up names, prices, dates or promises.` },
      { kind: "list", ordered: true, items: [
        "Copy 4 or 5 words from the quote.",
        "Open the file and press **Ctrl + F** (or **Cmd + F** on a Mac).",
        "Paste the words. Nothing found? Do not use the answer.",
      ] },
      { kind: "honest", text: "**The honest part:** Gemini can miss a file or misread a scan. The 10-second check keeps you from telling a client the wrong thing." },
    ] },
    { num: "03", title: "Search for the file", accent: "When you don't know which.", blocks: [
      { kind: "p", text: "Gemini can search your Drive. Make it show the file before it answers." },
      { kind: "prompt", label: "Find the file first", text: `Search my Google Drive for: [the file, for example: the call notes for [client] from October].

Do not answer anything yet. List the matching files with the exact name, the date last changed and a link.
Number the list. If nothing matches, write "No match" and do not guess.
Then wait for me to pick a number.` },
      { kind: "p", text: "Open the link to check it is the right file. Then type its number and ask your question." },
    ] },
    { num: "04", title: "Rename your files", accent: "Client, type, date.", blocks: [
      { kind: "p", text: "Gemini searches by file name. \"Untitled document (3)\" is hard to find." },
      { kind: "table", head: ["Part", "Example"], rows: [
        ["Client", "[client]"],
        ["Type", "Proposal, Contract, Call notes, Invoice or Brief"],
        ["Date", "2026-10"],
      ] },
      { kind: "prompt", label: "Give me new file names", text: `Help me rename my client files.

Here are my current file names:
[paste your 10 file names, with clients as [client 1], [client 2]]

My rule is: Client - Type - Date
- Type is one of: Proposal, Contract, Call notes, Invoice, Brief
- Date is YYYY-MM

Give me a table: Current name | New name.
Use only what I give you. If you can't tell the type or date, write [CHECK].` },
      { kind: "p", text: "In [Drive](https://drive.google.com), right-click each file, click **Rename** and type the new name." },
    ] },
    { num: "05", title: "Test when it fails", accent: "2 minutes.", blocks: [
      { kind: "p", text: "Either the connection is broken or one file is the problem. This test tells you which." },
      { kind: "list", ordered: true, items: [
        "Make a new Google Doc called **Gemini test note**.",
        "Type: The colour of the week is teal.",
        "Wait 1 minute, then start a **New chat** in Gemini.",
      ] },
      { kind: "prompt", label: "Test the connection", text: `Find my Google Doc called "Gemini test note" and tell me the colour of the week.

If you can't find it, tell me which Google account you are searching and whether you can see my Drive.
Do not guess the colour.` },
      { kind: "list", ordered: true, items: [
        "It says **teal**? The connection works. Rename the other file, or ask the sender to share it with this email.",
        "It can't find it? Do step 01 again.",
      ] },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Signed in with the right account",
        "Turned on Google Workspace in Gemini",
        "Got one answer and found the quote with Ctrl + F",
        "Renamed your 10 main files",
        "Ran the test note once",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Gemini can find your files.",
    accent: "Now plan your week with it.",
    body: "The next guide turns your messy to-do list into Google Tasks with dates.",
    label: "Plan your week with Gemini →",
    href: "/guides/gemini-google-tasks-limits/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Pick the file when you know it. Let Gemini search when you don't. Check the quote every time.",
    finishLine: "Clear names in. Checked answers out.",
  },
};
