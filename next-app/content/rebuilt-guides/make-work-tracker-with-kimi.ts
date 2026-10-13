import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "make-work-tracker-with-kimi",
  lumailTag: "guide-make-work-tracker-with-kimi",
  title: "How to Make a Client Tracker in Excel With AI",
  cover: "/images/guides/make-work-tracker-with-kimi.webp",
  coverAlt: "The blue robot mascot checking one organised set of work files",
  seoDescription: "Make a client tracker in Excel with AI: ChatGPT, Claude or Kimi builds the .xlsx file, then you test it with real mistakes and fix what breaks.",
  tool: "ChatGPT, Claude or Kimi",
  minutes: 30,
  h1: { title: "How to Make a Client Tracker", accent: "in Excel With AI" },
  hero: {
    kind: "scene",
    src: "/images/guides/make-work-tracker-with-kimi.webp",
    alt: "The blue robot mascot checking one organised set of work files",
    line: "AI builds the spreadsheet, then you test it with real mistakes. One file for every client, project and next action.",
  },
  intro: {
    heading: "One tracker for every client project",
    lead: "When client work lives in your inbox, your notes and your head, things slip: a follow-up you forgot, an invoice you never sent. This guide has AI interview you about how you work, build the Excel file, and then you try to break it before you trust it with real clients.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **column plan**: the 8 columns your tracker needs and the rules for each status",
        "**Your client project tracker** (.xlsx) with dropdowns, date checks, an overdue highlight and a summary tab",
        "The tracker **tested with real mistakes**: wrong dates, blank owners and \"done-ish\" statuses",
        "A **fixed version** that catches those mistakes",
        "A **10-minute weekly review** routine that keeps it up to date",
      ] },
      { kind: "tip", text: "You need ChatGPT, Claude or Kimi: any AI that can make an .xlsx file for you to download. Excel, Google Sheets or Numbers can open the file. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "client project tracker.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Plan the columns", accent: "Before AI builds anything.", blocks: [
      { kind: "p", text: "A tracker with the wrong columns is abandoned in a week. Start from these 8 and change them to fit how you work." },
      { kind: "table", head: ["Column", "What goes in it", "Example"], rows: [
        ["Client", "The client's name", "[client]"],
        ["Project", "What you're doing for them", "Website copy, 5 pages"],
        ["Next action", "The very next thing to do, starting with a verb", "Send first draft"],
        ["Owner", "Who does the next action", "You, or your VA"],
        ["Due date", "When the next action is due, as a real date", "17/10/2026"],
        ["Status", "Where the project is, from a dropdown", "In progress"],
        ["Invoice sent", "Yes or No, from a dropdown", "No"],
        ["Notes", "Anything else, one line", "Waiting on logo files"],
      ] },
      { kind: "h3", text: "Status rules" },
      { kind: "p", text: "A status only helps if everyone means the same thing by it. Pick 4 or 5 and write down what each one means." },
      { kind: "table", head: ["Status", "It means"], rows: [
        ["Not started", "Agreed with the client, no work done yet"],
        ["In progress", "You or your team are working on it now"],
        ["Waiting on client", "You can't move until the client sends or signs off something"],
        ["Done", "Delivered and accepted. Nothing left to do except the invoice"],
        ["On hold", "Paused by you or the client, with a note saying why"],
      ] },
      { kind: "tip", text: "One row per project, not per task. If a client has two projects, they get two rows." },
    ] },
    { num: "02", title: "Let AI interview you", accent: "How you actually work.", blocks: [
      { kind: "p", text: "Before it builds anything, let the AI ask how you work, so the tracker fits your business instead of a generic one." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com), [Claude](https://claude.ai/) or [Kimi](https://www.kimi.com/) and start a new chat.",
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
      { kind: "p", text: "Now the AI builds the real Excel file. The prompt asks for the checks that stop a tracker from getting messy." },
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
        "Download the file and open it in Excel (or Google Sheets or Numbers).",
        "Click a Status cell. You should see a small arrow with your statuses.",
        "**If the AI says it can't make files:** look for a file, code or agent option in the tool and switch it on, or try one of the other two tools. If you can't find it, ask it for the column list and formulas and build the sheet yourself from those.",
      ] },
      { kind: "tip", text: "Use made-up projects until the tracker has passed the break-it test in step 04. Real client names go in only after that." },
    ] },
    { num: "04", title: "Try to break it", accent: "Before you trust it.", blocks: [
      { kind: "p", text: "Real people type \"tomorrow\" in a date cell and forget the owner. Find out now how your tracker copes. Do each test and write down what happens." },
      { kind: "table", head: ["Test", "Do this", "It passes if"], rows: [
        ["Wrong date", "Type \"tomorrow\" in a Due date cell", "It refuses and shows your error message"],
        ["Impossible date", "Type 31/02/2026", "It refuses"],
        ["Blank owner", "Delete the Owner in one row", "The cell is highlighted"],
        ["Done-ish status", "Type \"done-ish\" in a Status cell", "It refuses: only dropdown options allowed"],
        ["Overdue", "Set a due date last week, Status In progress", "The row turns red"],
        ["Finished", "Change that row's Status to Done", "The red goes away"],
        ["Unpaid", "Leave a Done row with Invoice sent = No", "The Summary counts it"],
        ["New row", "Add a project at the bottom", "The dropdowns and checks work there too"],
        ["Sorting", "Sort by Due date", "Every row stays together"],
      ] },
      { kind: "p", text: "Every test that doesn't pass goes on your fix list for step 05." },
    ] },
    { num: "05", title: "Fix what broke", accent: "Only what broke.", blocks: [
      { kind: "p", text: "Go back to the same chat, so the AI still has the file it built, and give it your fix list." },
      { kind: "prompt", label: "Fix my tracker", text: `I tested the tracker. These tests failed:
[list each failed test, what you did and what happened, for example: I typed "tomorrow" in Due date and it was accepted]

Fix only these problems. Don't change the columns, the dropdown options, the Summary sheet or the practice rows.
Tell me what you changed for each problem, then give me the new .xlsx file.` },
      { kind: "list", ordered: true, items: [
        "Download the new file and run the failed tests again.",
        "Still failing after two tries? Start a new chat, upload the file and paste the fix prompt again.",
        "When every test passes, delete the practice rows and add your real client projects.",
        "Save the file somewhere you'll find it every week, for example a **Clients** folder in OneDrive, Google Drive or Dropbox.",
      ] },
    ] },
    { num: "06", title: "Review it weekly", accent: "10 minutes, same time.", blocks: [
      { kind: "p", text: "A tracker only works if it's up to date. Book 10 minutes at the same time every week, for example Monday at 9:00, and do these 4 things." },
      { kind: "list", ordered: true, items: [
        "**Red rows first (3 minutes).** For each overdue project, do the next action, change the date, or write in Notes why it's late.",
        "**Blank owners (1 minute).** Every project needs a name in Owner.",
        "**Done but not invoiced (3 minutes).** Open the Summary sheet. Send every invoice it lists, then change Invoice sent to Yes.",
        "**New work (3 minutes).** Add a row for every new project from your inbox, calls and enquiries.",
      ] },
      { kind: "honest", text: "**The honest part:** the tracker won't update itself, and it won't chase a client for you. If you work with a VA or freelancer, agree who updates it and when. AI built the file. Keeping it true is still your job." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Columns and status rules written down",
        "Interview prompt answered, final columns saved",
        "Tracker built with dropdowns, date checks, overdue highlight and Summary sheet",
        "Break-it test run on every row of the table",
        "Fixes made and all tests passing",
        "Real projects in, file saved, weekly 10-minute review in your calendar",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your client work has one home.",
    accent: "Now let Claude build a small tool.",
    body: "The next guide shows you small, useful tools Claude can build from a plain description, with buttons and lists you can click, and no code to write.",
    label: "Build a weekend project with Claude →",
    href: "/guides/weekend-projects-with-claude/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Run the 10-minute review every week, add a row the day new work comes in, and run the break-it test again whenever you change a column.",
    finishLine: "Build it once, test it hard, then keep it true.",
  },
};
