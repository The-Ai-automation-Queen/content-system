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
    line: "Type everything on your mind. Gemini turns it into tasks with dates. You check the list before anything is added.",
  },
  intro: {
    heading: "A weekly plan that takes 15 minutes",
    lead: "Here is the problem. It is Monday, and a client asks, \"Can you send the proposal this week?\" You say yes. But the week is already full, and half of it is in your head. Today you write lists in notebooks and lose them. Gemini (Google's AI chat) can turn everything you type into tasks in Google Tasks (Google's free to-do list). You get one clean list with dates, and you decide what goes on it.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**Gemini linked to your Google Tasks**, so it can add tasks and read them back",
        "**Everything in your head on one list**, with dates only where you gave them",
        "**A view of your whole week** you can ask for any morning in one line",
        "**No pile of late tasks on Friday**: each one done, moved to a date, or dropped",
        "**A 15-minute routine in your calendar**, with every question saved in one Doc",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer with a web browser, like Chrome. You can check tasks on your phone later.",
        "The Google account you use for work. That is where your tasks will go.",
        "Gemini at gemini.google.com. The free plan can work with Google Tasks on many accounts. If you see a message that Tasks is not available, check your plan on Google's help pages.",
        "One real list of jobs for this week. For example: a proposal to send, an invoice to chase, a call to book.",
      ] },
      { kind: "tip", text: "Every question below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "weekly planning routine.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Link Gemini to Google Tasks", accent: "5 minutes, done once.", blocks: [
      { kind: "p", text: "Gemini can't see your tasks until you let it. First you check the account. Then you switch on Google Tasks. Then you test it with one task." },
      { kind: "h3", text: "A. Check the account" },
      { kind: "list", ordered: true, items: [
        "Open [gemini.google.com](https://gemini.google.com) in your browser.",
        "Look at the top right corner. You will see a small round picture or a letter. That is your Google account.",
        "Click it. A box opens with an email address. Is it your work email? If yes, close the box and go to B.",
        "If it is the wrong email, click the right account in that box. If it is not there, click **Add another account** and sign in.",
      ] },
      { kind: "h3", text: "B. Switch on Google Tasks" },
      { kind: "list", ordered: true, items: [
        "On the left side of Gemini, near the bottom, click **Settings & help**. On a small window, click the menu button (three lines, top left) first.",
        "Click **Apps**. On some accounts this is still called **Extensions**.",
        "You will see a list of Google apps. Find **Google Tasks**. It may sit next to **Google Keep**, or under **Google Workspace**.",
        "Click the switch next to it so it turns on. On most screens it turns blue.",
        "Can't find **Settings & help**, **Apps** or **Google Tasks**? Google moves these menus. Search \"Google Tasks\" on [Google's Gemini help pages](https://support.google.com/gemini) for today's steps.",
      ] },
      { kind: "tip", text: "**On a work account and the switch is missing or grey?** The person who runs your company's Google account may have turned it off. Ask them. Don't look for a way round it." },
      { kind: "h3", text: "C. Open your Tasks list" },
      { kind: "list", ordered: true, items: [
        "Open Gmail or Google Calendar in a new tab.",
        "Look at the thin bar on the right side of the screen. Click the round blue icon with a tick in it. That is **Tasks**.",
        "A panel opens with your task list. Keep this tab open. You will look here after every change.",
        "No icon on the right? Click the small arrow at the bottom right to show the bar. Or install the Google Tasks app on your phone.",
      ] },
      { kind: "h3", text: "D. Test it with one task" },
      { kind: "p", text: "Go back to Gemini. Click in the chat box at the bottom. Type this and press Enter." },
      { kind: "example", label: "What you type", text: "Add a task to my Google Tasks: Test task from Gemini. No due date." },
      { kind: "result", label: "What you should see", lines: [
        "Gemini says it added the task, often with a small card that shows the task name.",
        "In your Tasks panel, a task called \"Test task from Gemini\" appears. You may need to close and open the panel once.",
        "If Gemini says it can't do this, go back to B and check Google Tasks is switched on.",
      ] },
      { kind: "list", ordered: true, items: [
        "In the Tasks panel, click the round circle next to the test task. It is marked done and moves away.",
        "Now you know the link works, and you know where to look.",
      ] },
      { kind: "h3", text: "What Gemini does well, and what you check" },
      { kind: "table", head: ["Gemini can", "You check"], rows: [
        ["Turn long notes into short tasks", "Which list a task went into. It may use your main list."],
        ["Add tasks with the dates you give it", "Any date it worked out itself, like \"next Thursday\""],
        ["Tell you what is due and what is late", "Tasks in lists it can't see, or tasks it missed"],
        ["Suggest what to move or drop", "Anything it changed, moved or marked done"],
      ] },
      { kind: "tip", text: "**Rule for the whole guide:** after every change, look at your Tasks panel. It takes 10 seconds. It catches the mistakes in the table above." },
    ] },
    { num: "02", title: "Empty your head on Monday", accent: "Everything on one list.", blocks: [
      { kind: "p", text: "On Monday morning, type every job for the week in one go. Any order is fine. Gemini turns it into short tasks. But first it shows you a table, so nothing goes in without your yes." },
      { kind: "h3", text: "A. Write your list" },
      { kind: "list", ordered: true, items: [
        "Open a notes app or a blank Google Doc.",
        "Type every job you can think of for this week. One line each, or all in one long line.",
        "Think of clients first: proposals, calls to book, files to send, invoices to chase.",
        "Change client names to [client 1], [client 2] if you prefer. Change amounts to [amount].",
      ] },
      { kind: "h3", text: "B. Paste it into Gemini" },
      { kind: "list", ordered: true, items: [
        "In Gemini, click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box.",
        "Delete the example list at the bottom of the prompt. Paste your own list there.",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Turn my list into tasks", text: `Turn my list into tasks for Google Tasks.

Rules:
- Start each task with a verb and keep it under 8 words.
- Use client names exactly as I wrote them.
- Add a due date only where I gave one. Don't make up dates.
- Where something is unclear (no date, two jobs in one line), write [CHECK] next to it.
- Show me the list as a table first: Task | Due date | Notes
- Don't add anything to Google Tasks until I reply "add them".

My list:
[for example: send [client 1] the proposal by Thursday, chase invoice [number], book the kick-off call with [client 2], update my website bio]` },
      { kind: "example", label: "What you type at the bottom", text: "send [client 1] the proposal by Thursday, chase invoice [number], book the kick-off call with [client 2], update my website bio" },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Send proposal to [client 1] | Thursday | (empty)",
        "Chase invoice [number] | no date | [CHECK] no date given",
        "Book kick-off call with [client 2] | no date | [CHECK] no date given",
        "Update website bio | no date | (empty)",
      ] },
      { kind: "p", text: "Don't reply yet. Go to step 03 and check the table first." },
    ] },
    { num: "03", title: "Check the table, then say yes", accent: "You stop mistakes here.", blocks: [
      { kind: "p", text: "This is the check-it-yourself moment. AI can add a date you never gave. It can also join two jobs into one. You catch that here, before it reaches your list." },
      { kind: "h3", text: "A. Check the table, line by line" },
      { kind: "list", ordered: true, items: [
        "Put your own list next to Gemini's table.",
        "Count the lines. Does the table have the same number of jobs as your list? If one is missing, tell Gemini which one.",
        "Look at every date. Is it a date you typed? If Gemini added one you did not give, type: \"Remove the date from [task].\"",
        "Answer every [CHECK] in the chat. For example: \"Chase invoice: Wednesday. Kick-off call: no date.\"",
        "If one line has two jobs, type: \"Split [task] into two tasks.\"",
      ] },
      { kind: "contrast", items: [
        { label: "Wrong: a date you never gave", text: "Update website bio | Friday", good: false },
        { label: "Right: no date, because you gave none", text: "Update website bio | no date", good: true },
      ] },
      { kind: "h3", text: "B. Say yes" },
      { kind: "list", ordered: true, items: [
        "When the table is right, type **add them** and press Enter.",
        "Gemini says the tasks are added. You may see small cards with each task name.",
        "Go to your Tasks panel in Gmail or Calendar. Close and open it once.",
        "Check three things for each task: the name, the date, and which list it is in.",
      ] },
      { kind: "h3", text: "C. Fix anything that went in wrong" },
      { kind: "p", text: "You can fix it yourself in the Tasks panel: click the task and change it. Or paste this in the same Gemini chat. Change the parts in [brackets]." },
      { kind: "prompt", label: "Fix one task", text: `This task is wrong: [task name].
What it should be: [right name, date or list].
Change only this task. Then tell me exactly what you changed.` },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["Gemini says it can't add tasks", "Google Tasks is not switched on, or not on your plan", "Do step 01 B again. Still stuck? Copy the table and type the tasks into Tasks yourself."],
        ["The tasks are in the wrong list", "Gemini used your main list", "Drag them to the right list in the Tasks panel. Or name the list in your prompt next time."],
        ["A task has a date you never gave", "Gemini guessed", "Click the task and delete the date. Add \"Don't make up dates\" again in your next message."],
        ["Nothing shows in the Tasks panel", "The panel has not refreshed, or a different account", "Close and open the panel. Check the account in the top right corner of both tabs."],
      ] },
    ] },
    { num: "04", title: "See what's due this week", accent: "Any morning, 2 minutes.", blocks: [
      { kind: "p", text: "Ask this on any weekday morning. You see the whole week without opening every list." },
      { kind: "list", ordered: true, items: [
        "In Gemini, click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box. You don't need to change anything.",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Show what's due this week", text: `Show my Google Tasks that are due between today and Sunday.

Format:
- Group them by day, today first.
- For each task give the exact name and the list it is in. If you can't see the list, write "List not visible".
- Then list any open tasks with no due date under "No due date".
- At the end, name the one client task I should do first today, and why, in one sentence.

Don't change, add or complete anything. Use only what is in my Google Tasks.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Today: Chase invoice [number] (My Tasks)",
        "Thursday: Send proposal to [client 1] (My Tasks)",
        "No due date: Update website bio, Book kick-off call with [client 2]",
        "Do first: chase the invoice, because it is due today and it is money owed to you.",
      ] },
      { kind: "h3", text: "Check it against your list" },
      { kind: "list", ordered: true, items: [
        "Open your Tasks panel next to the answer.",
        "Pick 2 tasks from the panel that are due this week. Are both in Gemini's answer?",
        "If one is missing, ask about one list at a time: \"Show the tasks due this week in my [list name] list.\"",
        "Do this check every morning in the first week. After that, once a week is enough.",
      ] },
    ] },
    { num: "05", title: "Clear late tasks on Friday", accent: "Done, moved or dropped.", blocks: [
      { kind: "p", text: "Late tasks make you feel behind. On Friday afternoon, you decide what happens to each one. Gemini suggests. You choose." },
      { kind: "list", ordered: true, items: [
        "In Gemini, click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box.",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Clear my late tasks", text: `Show my overdue Google Tasks and any task due today that is still open.

Put them in a table with these columns:
Task | Due date | Your suggestion (done, move to a date, drop) | One-line reason

Rules:
- If a task looks like it has been moved before, say so and suggest I drop it or give it a fixed time.
- Client deadlines are never "drop". Suggest a date and write [CHECK] so I confirm it with the client.
- Don't change, move, complete or delete anything. Wait for my choice on each one.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "1. Chase invoice [number] | Wednesday | Move to Monday | Money owed, do it first thing.",
        "2. Send proposal to [client 1] | Thursday | Move to Tuesday [CHECK] | Client deadline, confirm the new date with them.",
        "3. Update website bio | no date | Drop or give it a fixed time | It keeps waiting.",
      ] },
      { kind: "list", ordered: true, items: [
        "Type your choice for each task. For example: \"1 move to Monday, 2 move to Tuesday, 3 drop\".",
        "For any [CHECK], message the client before you move the date.",
        "Ask Gemini to make the changes: \"Make these changes now.\" Or change them yourself in the Tasks panel.",
        "Open your Tasks panel. Check that no late task is left, unless you chose to keep it.",
      ] },
    ] },
    { num: "06", title: "Put the routine in your calendar", accent: "Written down once.", blocks: [
      { kind: "p", text: "The questions only help if you use them every week. So you save them in one Doc and put two reminders in your calendar." },
      { kind: "table", head: ["When", "What", "Time"], rows: [
        ["Monday morning", "Empty your head (step 02), check and say yes (step 03)", "About 10 minutes"],
        ["Any weekday morning", "What's due this week (step 04)", "About 2 minutes"],
        ["Friday afternoon", "Clear late tasks (step 05)", "About 5 minutes"],
      ] },
      { kind: "h3", text: "A. Save the questions in one Doc" },
      { kind: "list", ordered: true, items: [
        "Open [docs.google.com](https://docs.google.com) and click **Blank document**.",
        "Click **Untitled document** at the top left. Type **Weekly planning routine** and press Enter.",
        "Copy the prompts from steps 02, 04 and 05. Paste them into the Doc, one under the other.",
        "Above each prompt, type the day you use it: Monday, Any morning, Friday.",
      ] },
      { kind: "h3", text: "B. Add two weekly reminders" },
      { kind: "list", ordered: true, items: [
        "Open [calendar.google.com](https://calendar.google.com).",
        "Click **Create** (or the **+** button) at the top left. A small box opens.",
        "Type the name **Plan my week**. Pick next Monday and a morning time.",
        "Click **Does not repeat** and choose **Weekly on Monday**. On some screens click **More options** first.",
        "In the description box, paste the link to your Doc. Click **Save**.",
        "Do the same for Friday afternoon. Call it **Clear late tasks**.",
      ] },
      { kind: "tip", text: "**On the first Friday,** add one line to the Doc. Write what Gemini got wrong this week, and how you will ask next time." },
      { kind: "honest", text: "**The honest part:** Gemini may put tasks in the wrong list. It may miss one or read a date wrong. It doesn't know which client matters most this week. Gemini types and sorts. You decide what goes on the list, when it is due, and what gets dropped." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Signed in to Gemini with your work account",
        "Google Tasks switched on, and the test task showed up in your Tasks panel",
        "One real Monday list turned into tasks and checked line by line",
        "Every date in Tasks is a date you gave",
        "This week's view asked for and checked against the panel",
        "First Friday clear-out done, with client dates confirmed",
        "Weekly planning routine Doc saved, and two weekly reminders in your calendar",
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
    paragraph: "Empty your head on Monday. Check the table before you say yes. Look at the week each morning. Clear late tasks on Friday. Add every fix you repeat to the prompts in your Doc.",
    finishLine: "Fifteen minutes a week. Nothing lives only in your head.",
  },
};
