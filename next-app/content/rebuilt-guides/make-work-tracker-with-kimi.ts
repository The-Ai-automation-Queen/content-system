import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "make-work-tracker-with-kimi",
  lumailTag: "guide-make-work-tracker-with-kimi",
  title: "How to Make a Client Tracker in Excel With AI",
  cover: "/images/guides/make-work-tracker-with-kimi.webp",
  coverAlt: "The blue robot mascot checking one organised set of work files",
  seoDescription: "Make a client tracker in Excel with AI: ChatGPT, Claude or Kimi builds the .xlsx file. Then you test it with real mistakes and fix what breaks.",
  tool: "ChatGPT, Claude or Kimi",
  minutes: 30,
  h1: { title: "How to Make a Client Tracker", accent: "in Excel With AI" },
  hero: {
    kind: "scene",
    src: "/images/guides/make-work-tracker-with-kimi.webp",
    alt: "The blue robot mascot checking one organised set of work files",
    line: "AI builds the spreadsheet. You test it with real mistakes. One file for every client, project and next step.",
  },
  intro: {
    heading: "One tracker for every client project",
    lead: "Client work often sits in your inbox, your notes and your head. Then things get missed: a follow-up, an invoice you never sent. In this guide, AI asks how you work and builds the Excel file. Then you try to break it before you use it with real clients.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **column plan**: the 8 columns you need and what each status means",
        "**Your client project tracker** (.xlsx file) with dropdowns (lists to pick from), date checks, red overdue rows and a summary tab",
        "The tracker **tested with real mistakes**: wrong dates, blank owners, made-up statuses",
        "A **fixed version** that catches those mistakes",
        "A **10-minute weekly check** that keeps it up to date",
      ] },
      { kind: "tip", text: "You need ChatGPT, Claude or Kimi. Any AI that can make an .xlsx file for you to download will work. Excel, Google Sheets or Numbers can open the file. You can copy and paste every prompt below. Replace the parts in [square brackets]." },
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
      { kind: "p", text: "With the wrong columns, people stop using a tracker within a week. Start from these 8. Change them to fit how you work." },
      { kind: "table", head: ["Column", "What goes in it", "Example"], rows: [
        ["Client", "The client's name", "[client]"],
        ["Project", "What you are doing for them", "Website copy, 5 pages"],
        ["Next action", "The next thing to do, starting with a doing word", "Send first draft"],
        ["Owner", "Who does the next action", "You, or your VA"],
        ["Due date", "When the next action is due, as a real date", "17/10/2026"],
        ["Status", "Where the project is, picked from a list", "In progress"],
        ["Invoice sent", "Yes or No, picked from a list", "No"],
        ["Notes", "Anything else, one line", "Waiting on logo files"],
      ] },
      { kind: "h3", text: "Status rules" },
      { kind: "p", text: "A status only helps if everyone means the same thing by it. Pick 4 or 5. Write down what each one means." },
      { kind: "table", head: ["Status", "It means"], rows: [
        ["Not started", "Agreed with the client, no work done yet"],
        ["In progress", "You or your team are working on it now"],
        ["Waiting on client", "You need something from the client before you can go on"],
        ["Done", "Delivered and accepted. Only the invoice is left."],
        ["On hold", "Paused by you or the client, with a note saying why"],
      ] },
      { kind: "tip", text: "Use one row per project, not per task. A client with two projects gets two rows." },
    ] },
    { num: "02", title: "Let AI interview you", accent: "How you actually work.", blocks: [
      { kind: "p", text: "First, let the AI ask how you work. Then the tracker fits your business, not any business." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com), [Claude](https://claude.ai/) or [Kimi](https://www.kimi.com/). Start a new chat.",
        "Paste the prompt below, with your columns and statuses from step 01.",
        "Answer each question. Copy the final column list into your notes.",
      ] },
      { kind: "prompt", label: "Interview me about how I work", text: `I want an Excel tracker for my client projects. I'm [what you do, for example: a freelance copywriter] and I usually have [number] client projects at a time.

My starting columns: [paste your columns from step 01]
My statuses and what they mean: [paste your status rules]

Before you build anything, ask me up to 6 questions about how I work, one at a time, and wait for each answer. Ask about: who updates the tracker, when I check it, what "done" means for me, how I know an invoice is due, and what I forget most often.

Then give me:
1. The final list of columns, with one line on why each is needed
2. The final status list with what each one means
3. Anything you would remove because I won't use it

Don't build the file yet. Use only what I tell you.` },
    ] },
    { num: "03", title: "Build the file", accent: "Dropdowns, dates, a summary.", blocks: [
      { kind: "p", text: "Now the AI builds the real Excel file. The prompt asks for checks that keep the tracker tidy." },
      { kind: "prompt", label: "Build my client tracker", text: `Build my client project tracker as an editable Excel file (.xlsx).

Sheet 1, called "Projects":
- Columns: [paste the final column list]
- Status is a dropdown with only these options: [paste your statuses]
- Invoice sent is a dropdown: Yes, No
- Due date only accepts real dates (DD/MM/YYYY). Anything else shows an error message: "Enter a date like 17/10/2026"
- Owner is highlighted when it's blank
- The whole row turns light red when the due date has passed and Status is not Done
- Freeze the header row, and turn on filters for every column
- The dropdowns and checks must work on at least 200 rows, not only the ones with data

Sheet 2, called "Summary":
- How many projects are in each status
- How many are overdue
- How many are Done with Invoice sent = No
These must update by themselves when Sheet 1 changes.

Add these 3 practice rows: [paste 3 made-up projects, for example: Client A, website copy, send first draft, me, next Tuesday, In progress, No].
Leave any cell I didn't give you blank. Never invent clients, dates or amounts.

Give me the .xlsx file to download, then list every dropdown, check and formula you added.` },
      { kind: "list", ordered: true, items: [
        "Download the file. Open it in Excel, Google Sheets or Numbers.",
        "Click a Status cell. You should see a small arrow with your statuses.",
        "**Does the AI say it can't make files?** Look for a file, code or agent button in the tool and turn it on. Or try one of the other two tools. Still stuck? Ask it for the column list and formulas (the sums the sheet does). Then build the sheet yourself.",
      ] },
      { kind: "tip", text: "Use made-up projects until the tracker passes the break-it test in step 04. Add real client names only after that." },
    ] },
    { num: "04", title: "Try to break it", accent: "Before you trust it.", blocks: [
      { kind: "p", text: "Real people type \"tomorrow\" in a date cell. They forget the owner. Find out now what your tracker does. Do each test and write down what happens." },
      { kind: "table", head: ["Test", "Do this", "It passes if"], rows: [
        ["Wrong date", "Type \"tomorrow\" in a Due date cell", "It says no and shows your error message"],
        ["Impossible date", "Type 31/02/2026", "It says no"],
        ["Blank owner", "Delete the Owner in one row", "The cell is highlighted"],
        ["Done-ish status", "Type \"done-ish\" in a Status cell", "It says no: only list options allowed"],
        ["Overdue", "Set a due date last week, Status In progress", "The row turns red"],
        ["Finished", "Change that row's Status to Done", "The red goes away"],
        ["Unpaid", "Leave a Done row with Invoice sent = No", "The Summary counts it"],
        ["New row", "Add a project at the bottom", "The lists and checks work there too"],
        ["Sorting", "Sort by Due date", "Every row stays together"],
      ] },
      { kind: "p", text: "Every test that fails goes on your fix list for step 05." },
    ] },
    { num: "05", title: "Fix what broke", accent: "Only what broke.", blocks: [
      { kind: "p", text: "Go back to the same chat. The AI still has the file it built there. Give it your fix list." },
      { kind: "prompt", label: "Fix my tracker", text: `I tested the tracker. These tests failed:
[list each failed test, what you did and what happened, for example: I typed "tomorrow" in Due date and it was accepted]

Fix only these problems. Don't change the columns, the dropdown options, the Summary sheet or the practice rows.
Tell me what you changed for each problem, then give me the new .xlsx file.` },
      { kind: "list", ordered: true, items: [
        "Download the new file. Run the failed tests again.",
        "Still failing after two tries? Start a new chat. Upload the file and paste the fix prompt again.",
        "When every test passes, delete the practice rows. Add your real client projects.",
        "Save the file where you will find it every week. For example, a **Clients** folder in OneDrive, Google Drive or Dropbox.",
      ] },
    ] },
    { num: "06", title: "Check it weekly", accent: "10 minutes, same time.", blocks: [
      { kind: "p", text: "A tracker only works if it is up to date. Book 10 minutes at the same time each week. For example, Monday at 9:00. Do these 4 things." },
      { kind: "list", ordered: true, items: [
        "**Red rows first (3 minutes).** For each late project, do the next action or change the date. Or write in Notes why it is late.",
        "**Blank owners (1 minute).** Every project needs a name in Owner.",
        "**Done but no invoice (3 minutes).** Open the Summary sheet. Send every invoice it lists. Then change Invoice sent to Yes.",
        "**New work (3 minutes).** Add a row for each new project from your inbox, calls and messages.",
      ] },
      { kind: "honest", text: "**The honest part:** the tracker won't update itself. It won't chase a client for you. Do you work with a VA (virtual assistant) or freelancer? Agree who updates it and when. AI built the file. Keeping it true is still your job." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Columns and status rules written down",
        "Interview prompt answered, final columns saved",
        "Tracker built with dropdowns, date checks, red overdue rows and Summary sheet",
        "Break-it test done for every row of the table",
        "Fixes made and all tests passing",
        "Real projects in, file saved, weekly 10-minute check in your calendar",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your client work has one home.",
    accent: "Now let Claude build a small tool.",
    body: "The next guide shows small, useful tools Claude can build from a plain description. They have buttons and lists you can click. You write no code.",
    label: "Build a weekend project with Claude →",
    href: "/guides/weekend-projects-with-claude/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Do the 10-minute check every week. Add a row the day new work comes in. Run the break-it test again when you change a column.",
    finishLine: "Build it once, test it hard, then keep it true.",
  },
};
