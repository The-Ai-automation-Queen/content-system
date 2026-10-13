import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "gemini-google-tasks-limits",
  lumailTag: "guide-gemini-google-tasks-limits",
  title: "How to Plan My Week With Gemini",
  cover: "/images/guides/gemini-google-tasks-limits.webp",
  coverAlt: "The blue robot mascot sorting three tasks into two separate trays",
  seoDescription: "Plan your week with Gemini: turn a messy to-do list into Google Tasks with dates, see what's due and clear late tasks every Friday.",
  tool: "Gemini",
  minutes: 30,
  h1: { title: "How to Plan My Week", accent: "With Gemini" },
  hero: {
    kind: "scene",
    src: "/images/guides/gemini-google-tasks-limits.webp",
    alt: "The blue robot mascot sorting three tasks into two separate trays",
    line: "Turn a messy to-do list into tasks with dates. You check the list before anything is added.",
  },
  intro: {
    heading: "A weekly plan that takes 15 minutes",
    lead: "Deadlines, follow-ups and unpaid invoices are in your head, your inbox and three notebooks. Gemini can put them all in one clean list in Google Tasks (Google's free to-do list app). It can tell you what is due. You still decide what goes on the list, when it is due, and what gets dropped.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "Gemini **connected to Google Tasks**, and a clear idea of what it can and can't do there",
        "A **Monday brain dump prompt**: everything in your head becomes tasks with dates",
        "A **this-week view** you can ask for any morning",
        "A **Friday reset** for late tasks: done, moved or dropped",
        "Your **weekly planning routine**: 15 minutes, written down and in your calendar",
      ] },
      { kind: "tip", text: "You need a Google account and Gemini at gemini.google.com. You can copy and paste every prompt below. Change the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Weekly Planning Routine.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Connect Gemini to Tasks", accent: "And know its limits.", blocks: [
      { kind: "p", text: "Gemini can only add or read your tasks once Google Tasks is connected. You do this once." },
      { kind: "list", ordered: true, items: [
        "Go to [gemini.google.com](https://gemini.google.com). Check the profile picture in the top right corner. It should be the account you use for work.",
        "Open **Settings** (the menu or gear icon), then **Apps**. On some accounts this is still called **Extensions**.",
        "Find **Google Tasks** and turn it on. It may be next to **Google Keep**, or under **Google Workspace**.",
        "Open the Google Tasks app on your phone. Or click the Tasks icon on the right side of Gmail or Google Calendar. Now you can see your lists.",
        "Menus change. Can't find it? Search \"Google Tasks\" on [Google's Gemini help pages](https://support.google.com/gemini).",
      ] },
      { kind: "p", text: "Before you trust it, know what it does well. Know where you need to check." },
      { kind: "table", head: ["Gemini can", "Check yourself"], rows: [
        ["Turn long notes into short tasks", "Which list a task goes in: it may use your main list"],
        ["Add tasks with the due dates you give it", "Dates it worked out itself, like \"next Thursday\""],
        ["Tell you what is due and what is late", "Tasks in lists it can't see, or tasks it missed"],
        ["Suggest what to move or drop", "Anything it changed, moved or marked done"],
      ] },
      { kind: "tip", text: "**Rule for the whole guide:** after every change, open the Tasks app and look. It takes ten seconds. It catches the mistakes above." },
    ] },
    { num: "02", title: "The Monday brain dump", accent: "Everything out of your head.", blocks: [
      { kind: "p", text: "On Monday morning, type everything you need to do this week. Do it in one go, in any order. Gemini turns it into tasks." },
      { kind: "p", text: "Open a new chat in Gemini and paste this prompt. Under it, type your list. For example: client deadlines, calls to book, invoices to chase, jobs you keep putting off." },
      { kind: "prompt", label: "Turn my brain dump into tasks", text: `Turn my brain dump into a task list for Google Tasks.

Rules:
- Start each task with a verb and keep it under 8 words.
- Use [client] names exactly as I wrote them.
- Add a due date only where I gave one, written as [date]. Don't make up dates.
- Where something is unclear (no date, two jobs in one line), write [CHECK] next to it.
- Show me the list as a table first: Task | Due date | [CHECK] notes
- Don't add anything to Google Tasks until I reply "add them".

My brain dump:
[for example: send [client] the proposal by [date], chase invoice [number], book the kick-off call with [client], update my website bio, prepare the workshop slides for [date]]` },
      { kind: "tip", text: "Before you paste, change anything private to brackets: [client], [amount], [number]. The tasks will still make sense to you." },
    ] },
    { num: "03", title: "Check before it adds", accent: "You say yes, then it types.", blocks: [
      { kind: "p", text: "Here you stop mistakes before they reach your list." },
      { kind: "list", ordered: true, items: [
        "Read the table. Every date must be one you gave. Did Gemini add a date you didn't give? Tell it to remove it.",
        "Answer every [CHECK] in the chat. For example: \"the bio has no date, leave it without one\".",
        "Split any line that has two jobs in it.",
        "When the table is right, reply **add them**.",
        "Open the Tasks app. Check the task names, the dates and which list they went into.",
      ] },
      { kind: "p", text: "Did something go in the wrong place? Fix it in the Tasks app. Or tell Gemini in the same chat:" },
      { kind: "prompt", label: "Fix what was added", text: `This task is wrong: [task title].
What it should be: [correct title, date or list].
Change only this task and tell me exactly what you changed.` },
      { kind: "tip", text: "**Gemini says it can't add tasks?** Go back to step 01. Check Google Tasks is turned on. Still not working? Copy the table into Google Tasks yourself. The sorting is the part that saves time." },
    ] },
    { num: "04", title: "What's due this week", accent: "Any morning, in one view.", blocks: [
      { kind: "p", text: "Ask this on any weekday morning. You see the whole week without opening every list." },
      { kind: "prompt", label: "Show what's due this week", text: `Show my Google Tasks that are due between today and Sunday.

Format:
- Group them by day, today first.
- For each task give the exact title and the list it is in. If you can't see the list, write "List not visible".
- Then list any open tasks with no due date under "No due date".
- At the end, name the one client task I should do first today, and why, in one sentence.

Don't change, add or complete anything. Use only what is in my Google Tasks.` },
      { kind: "p", text: "In the first week, check the answer against the Tasks app once or twice. Does Gemini miss tasks? Ask about one list at a time: \"Show the tasks due this week in my [list name] list.\"" },
    ] },
    { num: "05", title: "The Friday reset", accent: "Done, moved or dropped.", blocks: [
      { kind: "p", text: "Late tasks make you feel behind. On Friday afternoon, decide what happens to each one." },
      { kind: "prompt", label: "Run my Friday reset", text: `Show my overdue Google Tasks and any task due today that is still open.

Put them in a table with these columns:
Task | Due date | Your suggestion (done, move to a date, drop) | One-line reason

Rules:
- If a task looks like it has been moved before, say so and suggest I drop it or give it a fixed slot.
- Client deadlines are never "drop": suggest a date and write [CHECK] so I confirm it with the client.
- Don't change, move, complete or delete anything. Wait for my decision on each one.` },
      { kind: "list", ordered: true, items: [
        "Reply with your choice for each task. For example: \"1 done, 2 move to Tuesday, 3 drop\".",
        "Ask Gemini to make the changes. Or make them yourself in the Tasks app.",
        "Open the Tasks app. Check that no late task is left unless you chose to keep it.",
      ] },
    ] },
    { num: "06", title: "Your 15-minute routine", accent: "Written down once.", blocks: [
      { kind: "p", text: "The prompts only help if you use them every week. Put the routine in your calendar. Keep the prompts in one place." },
      { kind: "table", head: ["When", "What", "Time"], rows: [
        ["Monday morning", "Brain dump (step 02), check and add (step 03)", "About 10 minutes"],
        ["Any weekday morning", "What's due this week (step 04)", "About 2 minutes"],
        ["Friday afternoon", "Friday reset (step 05)", "About 5 minutes"],
      ] },
      { kind: "list", ordered: true, items: [
        "Make a Google Doc called **Weekly planning routine**. Paste the three prompts from steps 02, 04 and 05 into it.",
        "In Google Calendar, add two events that repeat every week: Monday morning and Friday afternoon. Put the Doc link in each one.",
        "On the first Friday, add one line to the Doc. Write what Gemini got wrong this week, and how you will ask next time.",
      ] },
      { kind: "honest", text: "**The honest part:** Gemini may put tasks in the wrong list. It may miss one or read a date wrong. It doesn't know which client matters most this week. Gemini types and sorts. You decide what goes on the list, when it is due, and what gets dropped." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Google Tasks turned on in Gemini",
        "First brain dump turned into tasks and checked in the Tasks app",
        "This-week view asked for and checked against the app",
        "First Friday reset done",
        "Weekly planning routine Doc saved with the three prompts",
        "Monday and Friday times in your calendar",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your week is planned.",
    accent: "Now meet the AI browser.",
    body: "The next guide explains what an AI browser is. It shows 3 safe ways to try one on research jobs, before it goes near a client account.",
    label: "Try an AI browser safely →",
    href: "/guides/what-is-an-ai-browser/",
  },
  conclusion: {
    heading: "Keep it running",
    paragraph: "Brain dump on Monday. Check before anything is added. Look at the week each morning. Reset on Friday. Add every fix you repeat to the prompts in your routine Doc.",
    finishLine: "Fifteen minutes a week. Nothing lives only in your head.",
  },
};
