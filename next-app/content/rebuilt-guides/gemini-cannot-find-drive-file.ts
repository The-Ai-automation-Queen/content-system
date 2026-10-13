import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "gemini-cannot-find-drive-file",
  lumailTag: "guide-gemini-cannot-find-drive-file",
  title: "How to Get Gemini to Find Things in My Google Drive",
  cover: "/images/guides/gemini-cannot-find-drive-file.webp",
  coverAlt: "The blue robot mascot tracing one document through account keys and file drawers",
  seoDescription: "Get Gemini to find things in your Google Drive: switch on the connection, pick the file, and get the answer with the exact sentence it came from.",
  tool: "Gemini",
  minutes: 30,
  h1: { title: "How to Get Gemini to Find Things", accent: "in My Google Drive" },
  hero: {
    kind: "scene",
    src: "/images/guides/gemini-cannot-find-drive-file.webp",
    alt: "The blue robot mascot tracing one document through account keys and file drawers",
    line: "Type a question. Gemini opens your file, gives you the answer, and copies the exact sentence so you can check it.",
  },
  intro: {
    heading: "Stop opening 20 files to find one answer",
    lead: "Here is the problem. A client asks, \"What did we agree about the deposit?\" You know the answer is in a proposal or in your call notes. But you don't remember which file, so you open one after another. Gemini (Google's AI chat) can do that search for you. You type the question. It opens the file, writes the answer, and copies the sentence it found, so you can check it in 10 seconds.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**Gemini switched on for your Google Drive**, on the account where your client files are",
        "**A way to point Gemini at one exact file**, so it can't answer from the wrong one",
        "**3 questions saved in a Doc**: find a file, answer from a file, test the connection. You copy and paste them each time.",
        "**A simple way to name client files**, so you and Gemini can find any file in seconds",
        "**A 2-minute test** for the day Gemini says \"I can't find that\"",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer. These steps are for a web browser, like Chrome.",
        "Your Google account that has your client files in Google Drive.",
        "One file you opened this week, like a proposal or call notes. Pick a file where you already know an answer. Then you can see if Gemini gets it right.",
      ] },
      { kind: "tip", text: "Every question below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Drive search rules.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Switch on Drive in Gemini", accent: "5 minutes, done once.", blocks: [
      { kind: "p", text: "Gemini can't see your files until you let it. First you check you are in the right Google account. Then you switch on the connection to Drive." },
      { kind: "h3", text: "A. Check the account" },
      { kind: "list", ordered: true, items: [
        "Open [gemini.google.com](https://gemini.google.com) in your browser.",
        "Look at the top right corner. You will see a small round picture or a letter. That is your Google account.",
        "Click it. A box opens with an email address. Is it the email where your client files are? If yes, close the box and go to B.",
        "If it is the wrong email, click the right account in that box. If the right one is not there, click **Add another account** and sign in.",
      ] },
      { kind: "tip", text: "**Why this matters:** many people have two Google accounts, one personal and one for work. Gemini only searches the account you are signed in to. This is the number 1 reason it \"can't find\" a file." },
      { kind: "h3", text: "B. Switch on the connection to Drive" },
      { kind: "list", ordered: true, items: [
        "On the left side of Gemini, near the bottom, click **Settings & help**. On a small window, click the menu button (three lines, top left) first.",
        "Click **Apps**. On some accounts this is still called **Extensions**.",
        "You will see a list of Google apps. Find **Google Workspace** (it covers Gmail, Drive and Docs).",
        "Click the switch next to it so it turns on. On most screens it turns blue.",
        "Can't find **Settings & help** or **Apps**? Google moves these menus. Search \"connected apps\" on [Google's Gemini help pages](https://support.google.com/gemini) for today's steps.",
      ] },
      { kind: "h3", text: "C. Test it in 10 seconds" },
      { kind: "p", text: "Go back to the chat box. Type this short question and press Enter." },
      { kind: "example", label: "What you type", text: "Can you see my Google Drive? Answer yes or no, then name 3 file names you can see." },
      { kind: "result", label: "What you should see", lines: [
        "Yes, and 3 real file names from your Drive. Now you are ready for the next steps.",
        "If it says no, or names files you don't recognise, go back to A and check the account.",
      ] },
      { kind: "tip", text: "**On a work account and the switch is missing or grey?** The person who runs your company's Google account may have turned it off. Ask them. Don't look for a way round it." },
    ] },
    { num: "02", title: "Point Gemini at one file", accent: "The surest way to get the right answer.", blocks: [
      { kind: "p", text: "When you know which file has the answer, pick the file yourself. Then Gemini reads only that file. It can't mix it up with an older version or a similar name." },
      { kind: "list", ordered: true, items: [
        "Click in the chat box at the bottom of Gemini.",
        "Click the **+** button on the left side of the box.",
        "Click **Add from Drive** (on some screens it just says **Drive**). Your Drive files open in a window.",
        "Type part of the file name in the search bar at the top of that window. Click the file. Then click **Insert** (or **Select**).",
        "You will see the file name as a small card above the chat box. That means Gemini will read it.",
        "No **+** button? Type **@** in the chat box instead. A list appears. Click **Google Drive** (or **Workspace**), then type the file name.",
      ] },
      { kind: "p", text: "Now ask your question with the prompt below. It makes Gemini copy the exact sentence it used. You use that sentence in step 04 to check the answer." },
      { kind: "prompt", label: "Answer from this file, with the sentence", text: `Use only the file I attached. Answer this question: [your question, for example: what did we agree about the deposit?]

Reply in this order:
1. The exact sentence from the file that answers it, copied word for word, in quotation marks.
2. The heading or section it sits under.
3. The answer in one short line.

Rules:
- Use only this file. Do not use other files or general knowledge.
- If the file does not answer the question, write "Not in this file" and stop.
- Never make up names, prices, dates or promises.` },
      { kind: "example", label: "Example question", text: "What did we agree about the deposit?" },
      { kind: "result", label: "What a good answer looks like", lines: [
        "1. \"Half of the fee is paid as a deposit when the contract is signed.\"",
        "2. Under the heading: Payment terms",
        "3. Half the fee is due when the contract is signed.",
      ] },
      { kind: "tip", text: "**It said \"Not in this file\"?** That is good news. It means Gemini did not guess. Try another file, or use step 03 to search for it." },
    ] },
    { num: "03", title: "Let Gemini search for the file", accent: "When you don't know which file it is.", blocks: [
      { kind: "p", text: "Sometimes you don't know which file has the answer. Then Gemini can search your Drive for it. But first it must show you which file it found. Otherwise you might trust an answer from the wrong file." },
      { kind: "list", ordered: true, items: [
        "Start a new chat. Click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box.",
        "Change the part in [square brackets]. Give the client name and what kind of file it is, for example \"the call notes for [client] from October\".",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Find the file first", text: `Search my Google Drive for: [describe the file, for example: the call notes for [client] from October].

Do not answer anything from the file yet. First show me a list of the files that match, with:
- the exact file name
- the date it was last changed
- a link to open it

Number the list. If nothing matches, write "No match" and do not guess.
Then wait. I will tell you which number is the right file.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "1. [client] - Call notes - 2026-10, changed 9 October, with a link",
        "2. [client] - Call notes - 2026-09, changed 14 September, with a link",
      ] },
      { kind: "list", ordered: true, items: [
        "Click the link of the file you think is right. Check it opens the file you meant.",
        "Go back to Gemini. Type the number, for example: \"Number 1. Now use the answer prompt from step 02 on this file.\" Then paste your question.",
      ] },
      { kind: "tip", text: "**Gemini found nothing, or the wrong files?** Most of the time the file name is the problem. Step 05 fixes that." },
    ] },
    { num: "04", title: "Check the answer yourself", accent: "10 seconds, every time.", blocks: [
      { kind: "p", text: "AI can be wrong, even when it sounds sure. So before you send anything to a client, check the sentence is really in the file. Here is how." },
      { kind: "list", ordered: true, items: [
        "In Gemini's answer, copy 4 or 5 words from the quoted sentence.",
        "Open the file. Click the link Gemini gave you, or open it from Drive.",
        "Press **Ctrl + F** on Windows, or **Cmd + F** on a Mac. A small search box opens.",
        "Paste the words and press Enter. The words light up in yellow in the file.",
        "Read the whole sentence and the lines around it. Does it say what Gemini said?",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["The words light up and say the same thing", "The answer is right", "Use it"],
        ["The words light up, but the lines around them change the meaning", "Gemini took it out of context", "Use what the file says, not what Gemini said"],
        ["Nothing lights up", "Gemini made up the sentence", "Don't use the answer. Ask again, or read the file yourself"],
      ] },
      { kind: "honest", text: "**The honest part:** Gemini finds and quotes. You check and decide. It can miss a file, misread a scanned page, or mix up two versions. The check above takes 10 seconds and protects you from telling a client the wrong thing." },
    ] },
    { num: "05", title: "Name your files so they can be found", accent: "One simple rule.", blocks: [
      { kind: "p", text: "Gemini searches by file name first. It can't find \"Untitled document (3)\". It finds \"[client] - Proposal - 2026-10\" right away. So give every client file a name with three parts." },
      { kind: "table", head: ["Part", "What you write", "Example"], rows: [
        ["1. Client", "The client's name, written the same way every time", "[client]"],
        ["2. Type of file", "One word from a short list: Proposal, Contract, Call notes, Invoice, Brief", "Call notes"],
        ["3. Date", "Year, then month, as numbers", "2026-10"],
      ] },
      { kind: "contrast", items: [
        { label: "Hard to find", text: "notes final v2, Untitled document, proposal NEW", good: false },
        { label: "Easy to find", text: "[client] - Call notes - 2026-10, [client] - Proposal - 2026-09", good: true },
      ] },
      { kind: "h3", text: "Rename your files the quick way" },
      { kind: "list", ordered: true, items: [
        "Open [drive.google.com](https://drive.google.com). Write down the names of your 10 most-used client files. Or select them and copy the names.",
        "In the list, swap real client names for [client 1], [client 2] and so on. This keeps their names out of the AI.",
        "Paste the list into the prompt below, in a new Gemini chat.",
      ] },
      { kind: "prompt", label: "Give me new file names", text: `Help me rename my client files in Google Drive.

Here are my current file names:
[paste your list here]

My naming rule is: Client - Type - Date
- Type is one of: Proposal, Contract, Call notes, Invoice, Brief
- Date is written as YYYY-MM, for example 2026-10

Give me a table with 3 columns: Current name | New name | Which client folder it goes in.
If you can't tell the type or the date of a file, write [CHECK] instead of guessing.
Use only the names I give you. Do not rename or move anything yourself.` },
      { kind: "list", ordered: true, items: [
        "In Drive, right-click each file, click **Rename**, and type the new name from the table.",
        "From today, name every new client file with the rule.",
      ] },
      { kind: "tip", text: "**Make it easy to remember:** create a Google Doc called **Drive rules**. Type the naming rule on the first line. Then paste the 3 prompts from steps 02, 03 and 06 under it. Next time, you open this Doc and copy." },
    ] },
    { num: "06", title: "When it says \"I can't find it\"", accent: "Find out why in 2 minutes.", blocks: [
      { kind: "p", text: "There are only two possible problems. Either the connection is broken, or something is wrong with that one file. This test tells you which." },
      { kind: "list", ordered: true, items: [
        "Open [docs.google.com](https://docs.google.com) and click **Blank document** to make a new Doc.",
        "Click **Untitled document** at the top left and type the name **Gemini test note**. Press Enter.",
        "In the page, type one line: The colour of the week is teal.",
        "Wait 1 minute. Then go back to Gemini, start a **New chat** and paste the prompt below.",
      ] },
      { kind: "prompt", label: "Test the connection", text: `Find my Google Doc called "Gemini test note" and tell me the colour of the week it mentions.

If you can't find it, tell me:
- which Google account you are searching
- whether you can see my Google Drive at all

Do not guess the colour.` },
      { kind: "table", head: ["What Gemini says", "What it means", "What to do"], rows: [
        ["Teal", "The connection works. The problem is the first file.", "Check the reasons in the table below"],
        ["It can't find the test note", "The connection is broken", "Do step 01 again: check the account, then check Google Workspace is switched on"],
      ] },
      { kind: "h3", text: "Why one file can't be found" },
      { kind: "table", head: ["Reason", "How you can tell", "What to do"], rows: [
        ["It was shared with your other email", "The client sent it to a different address", "Ask them to share it with this account. Or open it and click File, then Make a copy, to save it in your own Drive."],
        ["It is a scan or a photo", "A PDF made by a scanner, or a picture of a page", "Gemini may not read it well. Use the typed version if you have one."],
        ["The name is too vague", "Many files have a similar name, or the name says nothing", "Rename it with the rule from step 05"],
        ["You asked in a vague way", "\"The budget doc\" could be 10 files", "Pick the file with + (step 02), or give the client and type (step 03)"],
      ] },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Signed in to Gemini with the account where your client files are",
        "Google Workspace switched on in Gemini, and the 10-second test said yes",
        "One real question answered from a file you picked with +",
        "The quoted sentence found in the file with Ctrl + F (or Cmd + F)",
        "Your 10 most-used files renamed with the rule",
        "A Doc called Drive rules with the naming rule and the 3 prompts",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Gemini can find your files.",
    accent: "Now plan your week with it.",
    body: "The next guide uses the same Gemini connection. It turns your messy to-do list into Google Tasks with dates. You get a plan for Monday and a quick reset on Friday.",
    label: "Plan your week with Gemini →",
    href: "/guides/gemini-google-tasks-limits/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Pick the file with + when you know it. Ask Gemini to search when you don't. Check the sentence with Ctrl + F every time. Name every new file with the rule.",
    finishLine: "Clear names in. Checked answers out.",
  },
};
