import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "make-work-tracker-with-kimi",
  lumailTag: "guide-make-work-tracker-with-kimi",
  title: "How to Make a Client Tracker in Excel With AI",
  cover: "/images/guides/make-work-tracker-with-kimi.webp",
  coverAlt: "The blue robot mascot checking one organised set of work files",
  seoDescription: "Make a client tracker in Excel with AI. ChatGPT, Claude or Kimi builds the file, you test it with real mistakes and fix what breaks. 5 steps.",
  tool: "ChatGPT, Claude or Kimi",
  minutes: 30,
  h1: { title: "How to Make a Client Tracker", accent: "in Excel With AI" },
  hero: {
    kind: "scene",
    src: "/images/guides/make-work-tracker-with-kimi.webp",
    alt: "The blue robot mascot checking one organised set of work files",
    line: "One Excel file for every client, project and next step.",
  },
  intro: {
    heading: "Get one file for client work",
    lead: "Client work hides in your inbox, notes and head. This guide has AI build one Excel tracker you test yourself. It takes 30 minutes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**One Excel file** with a row for each client project",
        "**A next step, owner and due date** for every project",
        "**Late rows that turn red** by themselves",
        "**A summary count** of finished work with no invoice sent",
      ] },
      { kind: "tip", text: "You need [ChatGPT](https://chatgpt.com), [Claude](https://claude.ai/) or [Kimi](https://www.kimi.com/), on a plan that can make files, plus Excel, Google Sheets or Numbers. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "client project tracker.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Plan the columns", accent: "Before AI builds anything.", blocks: [
      { kind: "p", text: "Wrong columns get a tracker dropped in a week. Start from these 8 and cross out any you would never fill in." },
      { kind: "table", head: ["Column", "Example"], rows: [
        ["Client", "[client]"],
        ["Project", "Website copy, 5 pages"],
        ["Next action", "Send first draft"],
        ["Owner", "You, or your VA (virtual assistant)"],
        ["Due date", "17/10/2026"],
        ["Status", "Not started, In progress, Waiting on client, Done, On hold"],
        ["Invoice sent", "Yes or No"],
        ["Notes", "Waiting on logo files"],
      ] },
      { kind: "p", text: "Then write 3 made-up projects in a note. One late, one with no owner. You test the file with these first." },
    ] },
    { num: "02", title: "Let the AI ask first", accent: "So it fits your work.", blocks: [
      { kind: "p", text: "A few questions first make the tracker fit how you work." },
      { kind: "list", ordered: true, items: [
        "Open your AI tool and click **New chat**.",
        "Paste the prompt below with your columns from step 01. Press Enter.",
      ] },
      { kind: "prompt", label: "Ask me how I work", text: `I want an Excel tracker for my client projects. I'm [what you do] and I usually have [number] client projects at a time.

My starting columns: [paste your columns]
My statuses: [paste your statuses]

Before you build anything, ask me up to 6 questions about how I work, one at a time. Ask about who updates it, what "done" means for me, and how I know an invoice is due.

Then give me the final columns and statuses, and anything you would remove.
Don't build the file yet. Use only what I tell you.` },
      { kind: "p", text: "Answer each question in a sentence. Stay in this chat for step 03." },
    ] },
    { num: "03", title: "Build the file", accent: "Dropdowns, date checks, a summary.", blocks: [
      { kind: "p", text: "Now the AI makes the real .xlsx file. Dropdowns (small lists you pick from) stop made-up statuses." },
      { kind: "prompt", label: "Build my client tracker", text: `Build my client project tracker as an editable Excel file (.xlsx).

Sheet 1, called "Projects":
- Columns: [paste the final columns]
- Status is a dropdown with only: [paste your statuses]
- Invoice sent is a dropdown: Yes, No
- Due date only accepts real dates (DD/MM/YYYY). Anything else shows: "Enter a date like 17/10/2026"
- Owner is highlighted when blank
- The row turns light red when the due date has passed and Status is not Done
- Freeze the header row and turn on filters
- Dropdowns and checks work on at least 200 rows

Sheet 2, called "Summary": how many projects in each status, how many overdue, and how many Done with Invoice sent = No. These update by themselves.

Add these 3 practice rows: [paste your 3 made-up projects].
Leave any cell I didn't give you blank. Never make up clients, dates or amounts.
Give me the .xlsx file, then list every dropdown, check and formula you added.` },
      { kind: "list", ordered: true, items: [
        "Click the file in the answer to download it. Open it.",
        "Click a **Status** cell. You should see your list.",
        "Check the late practice row is light red.",
      ] },
      { kind: "tip", text: "Can't find it? If the AI says it can't make files, search \"create files\" on [ChatGPT help](https://help.openai.com/) or [Claude help](https://support.claude.com/), or try one of the other tools." },
    ] },
    { num: "04", title: "Try to break it", accent: "Before you trust it.", blocks: [
      { kind: "p", text: "The AI can say it added a check when it did not. Test each one yourself." },
      { kind: "list", ordered: true, items: [
        "Type **tomorrow** in a Due date cell. It should say no.",
        "Type **31/02/2026**. It should say no.",
        "Delete an Owner. The cell should be highlighted.",
        "Set a due date last week, Status **In progress**. The row should turn red. Change it to **Done**. The red should go.",
        "Add a project at the bottom. The dropdowns should work there too.",
        "Count the **In progress** rows yourself. The Summary should match.",
      ] },
      { kind: "p", text: "Write down every test that fails. Undo each test with **Ctrl + Z** or **Cmd + Z**." },
    ] },
    { num: "05", title: "Fix it and go live", accent: "Only what broke.", blocks: [
      { kind: "p", text: "Go back to the same chat. It still knows how it built the file." },
      { kind: "prompt", label: "Fix my tracker", text: `I tested the tracker. These tests failed:
[each failed test: what you did and what happened]

Fix only these problems. Change nothing else.
Tell me what you changed for each one, then give me the new .xlsx file.` },
      { kind: "list", ordered: true, items: [
        "Download the new file. Run the failed tests again.",
        "When every test passes, delete the 3 practice rows.",
        "Add your real projects, one row each. Save it in your **Clients** folder.",
      ] },
      { kind: "honest", text: "**The honest part:** the tracker won't update itself or chase a client. Check it for 10 minutes each week and send every invoice the Summary counts." },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Columns and 3 practice projects written down",
        "The AI asked its questions first",
        "Tracker downloaded with dropdowns, red late rows and a Summary",
        "Every break-it test passing",
        "Real projects in, practice rows deleted",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your client work has one home.",
    accent: "Now let Claude build a small tool.",
    body: "The next guide shows small tools Claude can build from a plain description. You write no code.",
    label: "Build a weekend project with Claude →",
    href: "/guides/weekend-projects-with-claude/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Plan the columns. Let AI build it. Try to break it before you trust it.",
    finishLine: "One file. Nothing lost.",
  },
};
