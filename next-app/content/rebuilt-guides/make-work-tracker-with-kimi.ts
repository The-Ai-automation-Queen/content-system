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
    heading: "Stop losing client work between your inbox and your head",
    lead: "Here is the problem. A client asks, \"Did you send the invoice?\" You are not sure. The answer is somewhere in your inbox, your notes or your memory. AI can build you one Excel file that holds every project, next step and invoice. You test it with the mistakes real people make. Then you check one file instead of five places.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**One Excel file with every client project**, each on its own row",
        "**A next step, a name and a due date for each project**, so nothing sits with nobody",
        "**Late projects that turn red by themselves**, and a count of finished work with no invoice sent",
        "**A file you tested on purpose with wrong dates and blank cells**, so you know it catches them",
        "**A 10-minute weekly check** that keeps it up to date",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer. These steps are for a web browser, like Chrome.",
        "An account with one AI tool that can make an Excel file for you to download: [ChatGPT](https://chatgpt.com), [Claude](https://claude.ai/) or [Kimi](https://www.kimi.com/). On some free plans this is limited. Step 03 shows what to do if it says it can't make files.",
        "Excel, Google Sheets or Numbers to open the file.",
        "A list of the client projects you have right now. You use made-up ones first, then the real ones in step 05.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
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
    { num: "01", title: "Plan the columns", accent: "10 minutes, before AI builds anything.", blocks: [
      { kind: "p", text: "A tracker with the wrong columns gets left behind within a week. So decide the columns first, on paper or in your notes." },
      { kind: "h3", text: "A. Start from these 8 columns" },
      { kind: "list", ordered: true, items: [
        "Open a new note on your computer.",
        "Copy the table below into it.",
        "Read each row. Cross out any column you would never fill in. Add one if you really need it.",
      ] },
      { kind: "table", head: ["Column", "What goes in it", "Example"], rows: [
        ["Client", "The client's name", "[client]"],
        ["Project", "What you are doing for them", "Website copy, 5 pages"],
        ["Next action", "The next thing to do, starting with a doing word", "Send first draft"],
        ["Owner", "Who does the next action", "You, or your VA (virtual assistant)"],
        ["Due date", "When the next action is due, as a real date", "17/10/2026"],
        ["Status", "Where the project is, picked from a list", "In progress"],
        ["Invoice sent", "Yes or No, picked from a list", "No"],
        ["Notes", "Anything else, one line", "Waiting on logo files"],
      ] },
      { kind: "contrast", items: [
        { label: "Too vague for Next action", text: "Website", good: false },
        { label: "Clear Next action", text: "Send first draft of the homepage", good: true },
      ] },
      { kind: "h3", text: "B. Write what each status means" },
      { kind: "p", text: "A status only helps if you always mean the same thing by it. Pick 4 or 5. Write one line for each." },
      { kind: "table", head: ["Status", "It means"], rows: [
        ["Not started", "Agreed with the client, no work done yet"],
        ["In progress", "You or your team are working on it now"],
        ["Waiting on client", "You need something from the client before you can go on"],
        ["Done", "Delivered and accepted. Only the invoice is left."],
        ["On hold", "Paused by you or the client, with a note saying why"],
      ] },
      { kind: "h3", text: "C. Write 3 made-up projects" },
      { kind: "p", text: "You use these to test the file before any real client goes in. Write them in your note, one per line." },
      { kind: "example", label: "What your 3 practice projects might look like", text: "Client A, website copy, send first draft, me, next Tuesday, In progress, No. Client B, logo, book a call, my VA, last Friday, Waiting on client, No. Client C, newsletter, no next action yet, no owner yet, no date, Not started, No." },
      { kind: "tip", text: "**One row per project, not per task.** A client with two projects gets two rows." },
    ] },
    { num: "02", title: "Let the AI ask how you work", accent: "So it fits your business.", blocks: [
      { kind: "p", text: "First, let the AI ask you a few questions. Then the tracker fits the way you work, not any business." },
      { kind: "list", ordered: true, items: [
        "Open your AI tool: [ChatGPT](https://chatgpt.com), [Claude](https://claude.ai/) or [Kimi](https://www.kimi.com/).",
        "Click **New chat** at the top left. On some screens it is a pencil or a **+** button.",
        "Copy the prompt below and paste it in the chat box.",
        "Change the parts in [square brackets]. Paste your columns and statuses from step 01. Press Enter.",
      ] },
      { kind: "prompt", label: "Ask me how I work", text: `I want an Excel tracker for my client projects. I'm [what you do, for example: a freelance copywriter] and I usually have [number] client projects at a time.

My starting columns: [paste your columns from step 01]
My statuses and what they mean: [paste your status rules]

Before you build anything, ask me up to 6 questions about how I work, one at a time, and wait for each answer. Ask about: who updates the tracker, when I check it, what "done" means for me, how I know an invoice is due, and what I forget most often.

Then give me:
1. The final list of columns, with one line on why each is needed
2. The final status list with what each one means
3. Anything you would remove because I won't use it

Don't build the file yet. Use only what I tell you.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "First: one question, for example \"Who updates the tracker: only you, or someone else too?\"",
        "You answer. The next question comes. Up to 6 in total.",
        "At the end: your final columns, each with a reason, your statuses, and anything to remove.",
      ] },
      { kind: "list", ordered: true, items: [
        "Answer each question in a sentence or two.",
        "Read the final list. Check it has no columns you never asked for. If it does, type: \"Remove [column].\"",
        "Copy the final columns and statuses into your note. Stay in this chat for step 03.",
      ] },
    ] },
    { num: "03", title: "Build the file", accent: "Lists to pick from, date checks, a summary.", blocks: [
      { kind: "p", text: "Now the AI builds the real Excel file. The prompt asks for checks that keep the tracker tidy, like dropdowns (small lists you pick from, so nobody types a made-up status)." },
      { kind: "h3", text: "A. Ask for the file" },
      { kind: "list", ordered: true, items: [
        "Stay in the same chat from step 02.",
        "Copy the prompt below and paste it in the chat box.",
        "Paste your final columns, statuses and 3 practice projects where the brackets say. Press Enter.",
      ] },
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

Add these 3 practice rows: [paste your 3 made-up projects from step 01].
Leave any cell I didn't give you blank. Never invent clients, dates or amounts.

Give me the .xlsx file to download, then list every dropdown, check and formula you added.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "A link or button to download a file, for example client-tracker.xlsx.",
        "A list: Status dropdown on rows 2 to 201. Date check on Due date. Red rows when late and not Done. Summary sheet with 3 counts.",
      ] },
      { kind: "h3", text: "B. Download and open it" },
      { kind: "list", ordered: true, items: [
        "Click the file name or the download button in the answer. The file goes to your Downloads folder.",
        "Open your Downloads folder and double-click the file. It opens in Excel or Numbers. For Google Sheets, open [sheets.google.com](https://sheets.google.com), click the folder icon, then **Upload**, and pick the file.",
        "Click a Status cell. You should see a small arrow. Click it. You will see your statuses.",
        "Look at the practice row with last Friday's date. It should be light red.",
        "Click the **Summary** tab at the bottom. You should see the counts.",
      ] },
      { kind: "h3", text: "C. The AI says it can't make files?" },
      { kind: "list", ordered: true, items: [
        "Look in the tool for a button or setting about files, code or an agent (an AI that takes actions by itself). On some accounts you switch it on in **Settings**. In Kimi, some accounts have an **Agent** option in the chat box.",
        "Can't find it? These tools move their menus. Search \"create files\" on the help pages for [ChatGPT](https://help.openai.com/) or [Claude](https://support.claude.com/).",
        "Still stuck? Try one of the other two tools with the same prompts.",
        "Last option: ask for the column list and formulas (the sums the sheet does) as text. Then build the sheet yourself.",
      ] },
      { kind: "tip", text: "**Keep the made-up projects in** until the file passes the test in step 04. Add real clients only after that." },
    ] },
    { num: "04", title: "Try to break it", accent: "Check it yourself before you trust it.", blocks: [
      { kind: "p", text: "The AI says it added every check. It can be wrong, even when it sounds sure. Real people type \"tomorrow\" in a date cell and forget the owner. So do each test below in the file, one at a time." },
      { kind: "list", ordered: true, items: [
        "Copy the table below into your note.",
        "Open the tracker. Do the first test in the **Do this** column.",
        "Look at what happens. Compare it with the **It passes if** column.",
        "Write pass or fail next to the test in your note.",
        "Undo the test with **Ctrl + Z** on Windows, or **Cmd + Z** on a Mac. Then do the next one.",
      ] },
      { kind: "table", head: ["Test", "Do this", "It passes if"], rows: [
        ["Wrong date", "Type \"tomorrow\" in a Due date cell", "It says no and shows your error message"],
        ["Impossible date", "Type 31/02/2026", "It says no"],
        ["Blank owner", "Delete the Owner in one row", "The cell is highlighted"],
        ["Made-up status", "Type \"done-ish\" in a Status cell", "It says no: only list options allowed"],
        ["Overdue", "Set a due date last week, Status In progress", "The row turns red"],
        ["Finished", "Change that row's Status to Done", "The red goes away"],
        ["Unpaid", "Leave a Done row with Invoice sent = No", "The Summary counts it"],
        ["New row", "Add a project at the bottom", "The lists and checks work there too"],
        ["Sorting", "Sort by Due date", "Every row stays together"],
      ] },
      { kind: "h3", text: "Check the Summary by hand" },
      { kind: "list", ordered: true, items: [
        "On the Projects sheet, count the rows with Status **In progress** yourself.",
        "Click the **Summary** tab. Is the In progress number the same?",
        "If not, the formula is wrong. Add it to your fail list.",
      ] },
      { kind: "p", text: "Every fail goes on your fix list for step 05." },
    ] },
    { num: "05", title: "Fix what broke", accent: "Only what broke.", blocks: [
      { kind: "h3", text: "A. Ask for the fixes" },
      { kind: "list", ordered: true, items: [
        "Go back to the same chat where the AI built the file. It still knows how it built it.",
        "Copy the prompt below and paste it in the chat box.",
        "Replace [list each failed test] with your fail list from step 04. Press Enter.",
      ] },
      { kind: "prompt", label: "Fix my tracker", text: `I tested the tracker. These tests failed:
[list each failed test, what you did and what happened, for example: I typed "tomorrow" in Due date and it was accepted]

Fix only these problems. Don't change the columns, the dropdown options, the Summary sheet or the practice rows.
Tell me what you changed for each problem, then give me the new .xlsx file.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Wrong date: I added a date check to every Due date cell, rows 2 to 201.",
        "New row: I set the dropdowns to cover rows 2 to 201, not only the first 3.",
        "Then a link to download the new file.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["The same test fails again", "The fix didn't work", "Paste the prompt again with what happened this time"],
        ["Still failing after two tries", "The chat is stuck", "Start a new chat. Upload the file with the **+** button, then paste the fix prompt"],
        ["Columns or statuses changed", "The AI changed more than you asked", "Use the old file. Ask again and say: \"Change nothing else.\""],
        ["The checks vanish in Google Sheets", "Some Excel checks don't carry over", "Open the file in Excel, or ask the AI to rebuild them for Google Sheets"],
      ] },
      { kind: "h3", text: "B. Put your real projects in" },
      { kind: "list", ordered: true, items: [
        "Download the new file. Do the failed tests again. Every test should pass.",
        "Delete the 3 practice rows: right-click the row number on the left, then click **Delete**.",
        "Type in your real client projects, one row each.",
        "Save the file where you will find it every week. For example, a **Clients** folder in OneDrive, Google Drive or Dropbox.",
      ] },
    ] },
    { num: "06", title: "Check it every week", accent: "10 minutes, same time.", blocks: [
      { kind: "p", text: "A tracker only works if it is up to date. Put 10 minutes in your calendar at the same time each week. For example, Monday at 9:00. Then do these 4 things." },
      { kind: "list", ordered: true, items: [
        "**Red rows first (3 minutes).** For each late project, do the next action or change the date. Or write in Notes why it is late.",
        "**Blank owners (1 minute).** Every project needs a name in Owner.",
        "**Done but no invoice (3 minutes).** Open the Summary sheet. Send every invoice it counts. Then change Invoice sent to Yes.",
        "**New work (3 minutes).** Add a row for each new project from your inbox, calls and messages.",
      ] },
      { kind: "honest", text: "**The honest part:** the tracker won't update itself, and it won't chase a client for you. If a VA or freelancer helps you, agree who updates it and when. AI built the file. Keeping it true is still your job." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Columns, status meanings and 3 practice projects written in your note",
        "The AI asked its questions, and the final columns are saved",
        "Tracker downloaded and opened, with dropdowns, red late rows and a Summary sheet",
        "Every break-it test done, and the Summary checked by hand",
        "Fixes made and every test passing",
        "Practice rows deleted, real projects in, weekly 10-minute check in your calendar",
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
    heading: "Keep it simple",
    paragraph: "Do the 10-minute check every week. Add a row the day new work comes in. Run the break-it test again when you change a column.",
    finishLine: "Build it once, test it hard, then keep it true.",
  },
};
