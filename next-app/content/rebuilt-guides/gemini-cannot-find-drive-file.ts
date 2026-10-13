import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "gemini-cannot-find-drive-file",
  lumailTag: "guide-gemini-cannot-find-drive-file",
  title: "How to Get Gemini to Find Things in My Google Drive",
  cover: "/images/guides/gemini-cannot-find-drive-file.webp",
  coverAlt: "The blue robot mascot tracing one document through account keys and file drawers",
  seoDescription: "Get Gemini to find things in your Google Drive: connect Workspace, name client files clearly and use 3 saved prompts that quote the exact line.",
  tool: "Gemini",
  minutes: 30,
  h1: { title: "How to Get Gemini to Find Things", accent: "in My Google Drive" },
  hero: {
    kind: "scene",
    src: "/images/guides/gemini-cannot-find-drive-file.webp",
    alt: "The blue robot mascot tracing one document through account keys and file drawers",
    line: "Ask a question and get the answer with the exact line it came from. No more scrolling through client folders.",
  },
  intro: {
    heading: "Your Drive, searchable in plain English",
    lead: "You know the answer is in a proposal or a call note somewhere in Drive, but you can't remember which one. Gemini can open your files and answer from them, if it is connected to the right account, your files have clear names and you ask in a way that makes it show its source. This guide sets up all three.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "Gemini **connected to Google Workspace** on the account that owns your client files",
        "A **naming rule for client files**, so Gemini (and you) can find any file by its name",
        "A **find-the-file prompt** that confirms the file before it tells you anything",
        "An **answer-with-the-line prompt** that quotes the sentence its answer comes from",
        "A **couldn't-find-it prompt** that tells you whether the problem is the file or the connection",
      ] },
      { kind: "tip", text: "You need a Google account with your files in Google Drive, and access to Gemini at gemini.google.com. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Drive search rules.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Connect Gemini to Drive", accent: "The right account, switched on.", blocks: [
      { kind: "p", text: "Gemini can only search files it has permission to open. This step makes sure it is looking in the right place." },
      { kind: "list", ordered: true, items: [
        "Go to [gemini.google.com](https://gemini.google.com) and check the profile picture in the top right corner. It must be the Google account that owns your client files. If not, click it and switch account.",
        "Open **Settings** (the menu or gear icon), then **Apps**. On some accounts this is still called **Extensions**.",
        "Find **Google Workspace** (it covers Gmail, Drive and Docs) and switch it on.",
        "Menus change. If you can't find it, search \"Google Workspace\" on [Google's Gemini help pages](https://support.google.com/gemini).",
      ] },
      { kind: "p", text: "When Gemini comes back with \"I couldn't find that\", it is almost always one of these reasons." },
      { kind: "table", head: ["Reason", "What it looks like", "What to do"], rows: [
        ["The file isn't shared with this account", "A client shared it with your other email address", "Ask for it to be shared with this account, or save a copy into your own Drive"],
        ["You're signed in to the wrong account", "Gemini finds nothing at all, or finds your personal files", "Switch account in the top right corner and try again"],
        ["The file type is hard to read", "A scanned PDF or a photo of a page", "Open it in Google Docs to turn it into text, or ask about a typed version"],
        ["The request is vague", "\"The budget doc\" matches ten files, or none", "Use the exact file name or folder name (steps 02 and 03)"],
        ["Your workplace has switched it off", "The Workspace option is missing or greyed out on a work account", "Ask whoever manages your Google Workspace account"],
      ] },
      { kind: "tip", text: "**Quick check:** ask Gemini \"Can you see my Google Drive?\" If it says no, go back through the list above before you try anything else." },
    ] },
    { num: "02", title: "Name your client files", accent: "One rule, every file.", blocks: [
      { kind: "p", text: "Gemini searches by name first. A file called \"Untitled document (3)\" is invisible; a file called \"[client] - Proposal - 2026-10\" is easy to find." },
      { kind: "p", text: "Use this rule for every new file: **Client - Type - Date**." },
      { kind: "table", head: ["Part", "What goes there", "Example"], rows: [
        ["Client", "The client or project name, written the same way every time", "[client]"],
        ["Type", "One word from a short list you keep: Proposal, Contract, Call notes, Invoice, Brief", "Call notes"],
        ["Date", "Year and month, so files sort in order", "2026-10"],
      ] },
      { kind: "p", text: "You don't have to rename everything today. To plan it, open a new chat in Gemini and paste this prompt with a list of your folder and file names (type them out or copy them from Drive)." },
      { kind: "prompt", label: "Plan my folders and file names", text: `Help me organise my Google Drive for client work.

Here is a list of my current folders and file names:
[paste the list, with client names swapped for [client 1], [client 2] and so on]

My naming rule is: Client - Type - Date (Date as YYYY-MM).
My file types are: Proposal, Contract, Call notes, Invoice, Brief.

Give me:
1. A simple folder plan: one folder per client, and what goes inside
2. A table with these columns: Current name | New name | Folder
3. Any file you can't place, marked [CHECK] instead of guessing

Use only the names I give you. Don't move or rename anything yourself.` },
      { kind: "p", text: "Rename the 10 files you open most often first. Name every new file with the rule from today." },
      { kind: "tip", text: "**Tip:** save the naming rule as the first line of a Doc called \"Drive rules\" so you don't have to remember it." },
    ] },
    { num: "03", title: "Find the right file", accent: "Confirm it before you trust it.", blocks: [
      { kind: "p", text: "This prompt makes Gemini show you which file it opened before it answers anything, so you never trust an answer from the wrong version." },
      { kind: "prompt", label: "Find the file", text: `Find my Google Drive file called "[exact file name]" (or: the most recent file in the folder "[folder name]").

Before you tell me anything from it, confirm:
- the exact file name you found
- when it was last edited
- a link to it

If more than one file matches, list them all and ask me which one I mean.
If nothing matches, say "No match" and don't guess.` },
      { kind: "p", text: "Click the link and check it is the file you meant. If Gemini lists several, reply with the number of the right one." },
      { kind: "tip", text: "**Don't know the exact name?** Give the folder name and the type, for example \"the Call notes file in the [client] folder from October\". That is the naming rule from step 02 doing its job." },
    ] },
    { num: "04", title: "Get the answer with its line", accent: "Proof you can check.", blocks: [
      { kind: "p", text: "When Gemini has to quote the sentence it used, you can see straight away whether it read the file or filled a gap." },
      { kind: "prompt", label: "Answer with the exact line", text: `From my file "[exact file name]", answer this: [your question, for example: what did we agree about the deposit?]

Start with the exact sentence from the file that answers it, in quotation marks, and the heading it sits under.
Then give me the answer in one line.

Rules:
- Use only this file. Don't use other files or general knowledge.
- If the file doesn't answer it, say "Not in this file".
- Never invent names, prices, dates or promises.` },
      { kind: "p", text: "Before you use the answer, open the file and find the quoted sentence (Ctrl+F or Cmd+F, then paste a few words of it). If it isn't there, don't use the answer." },
    ] },
    { num: "05", title: "When it can't find it", accent: "File or connection?", blocks: [
      { kind: "p", text: "This step tells you whether the problem is the file or the connection, in about two minutes." },
      { kind: "list", ordered: true, items: [
        "Go to [docs.google.com](https://docs.google.com) and create a new Doc.",
        "Name it **Gemini test note** and type one line: \"The colour of the week is teal.\"",
        "Go back to Gemini and paste the prompt below.",
      ] },
      { kind: "prompt", label: "Test the connection", text: `Find my Google Doc called "Gemini test note" and tell me the colour of the week it mentions.

If you can't find it, tell me:
- which Google account you are searching
- whether you can see my Google Drive at all

Don't guess the colour.` },
      { kind: "table", head: ["What happens", "What it means", "What to do"], rows: [
        ["It says teal", "The connection works", "The problem is the original file: check its name, its type and who it is shared with (table in step 01)"],
        ["It can't find the test note", "The connection isn't working", "Check the account in the top right corner and that Google Workspace is switched on (step 01)"],
      ] },
      { kind: "p", text: "Save the three prompts from steps 03, 04 and 05 in your \"Drive rules\" Doc, under the naming rule. That Doc is your Drive search rules." },
      { kind: "honest", text: "**The honest part:** Gemini can only see what your signed-in account can open, and it can miss files or misread a scanned page. It finds and quotes. You open the file, check the line and decide what to tell your client." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Signed in to Gemini with the account that owns your client files",
        "Google Workspace switched on in Gemini",
        "Naming rule saved in your \"Drive rules\" Doc",
        "Your 10 most-used files renamed",
        "Find-the-file, answer-with-the-line and connection test prompts saved",
        "One real answer found and checked against the file",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Gemini can find your files.",
    accent: "Now plan your week with it.",
    body: "The next guide uses the same Gemini connection to turn your messy to-do list into Google Tasks with dates, with a Monday plan and a Friday reset.",
    label: "Plan your week with Gemini →",
    href: "/guides/gemini-google-tasks-limits/",
  },
  conclusion: {
    heading: "Keep it findable",
    paragraph: "Name every new file with the rule, ask for the exact line behind every answer, and run the test note when Gemini says it can't find something.",
    finishLine: "Clear names in, checked answers out.",
  },
};
