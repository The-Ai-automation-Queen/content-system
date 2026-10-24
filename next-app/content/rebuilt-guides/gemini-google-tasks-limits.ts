import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "gemini-google-tasks-limits",
  lumailTag: "guide-gemini-google-tasks-limits",
  title: "How to Plan My Week With Gemini",
  cover: "/images/guides/gemini-google-tasks-limits.webp",
  coverAlt: "The blue robot mascot sorting three tasks into two separate trays",
  seoDescription: "Plan your week with Gemini: turn a messy to-do list into Google Tasks with real dates, see what is due and clear late tasks. 5 steps.",
  tool: "Gemini",
  minutes: 25,
  h1: { title: "How to Plan My Week", accent: "With Gemini" },
  hero: {
    kind: "scene",
    src: "/images/guides/gemini-google-tasks-limits.webp",
    alt: "The blue robot mascot sorting three tasks into two separate trays",
    line: "Type your whole week. Gemini turns it into tasks with dates.",
  },
  intro: {
    heading: "Your week on one list",
    lead: "Half your week lives in your head. This guide puts it in Google Tasks with real dates.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**Gemini linked** to your Google Tasks",
        "**One task list** with only the dates you gave",
        "**This week's tasks**, shown any morning in one line",
        "**No late tasks** left on Friday",
      ] },
      { kind: "tip", text: "You need a Google account and Gemini. The free plan works on many accounts. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "weekly planning prompts.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Link Gemini to Tasks", accent: "Done once.", blocks: [
      { kind: "p", text: "Gemini can't see your tasks until you switch them on. Use your work Google account." },
      { kind: "list", ordered: true, items: [
        "Open [Gemini](https://gemini.google.com). Check your work account is in the top right.",
        "Click **Settings & help**, then **Apps** (on some accounts, **Extensions**).",
        "Switch on **Google Tasks**.",
        "In the chat box, type: Add a task: Test task from Gemini. Press Enter.",
        "Open Gmail or Google Calendar. Click the **Tasks** icon on the right. Your test task is there.",
        "Tick the test task to clear it.",
      ] },
      { kind: "tip", text: "Can't find it? Google moves these menus. Search \"Google Tasks\" on [Google's Gemini help pages](https://support.google.com/gemini). On a work account, ask whoever runs it." },
    ] },
    { num: "02", title: "Empty your head", accent: "Monday, one list.", blocks: [
      { kind: "p", text: "Type every job for the week, in any order. Gemini shows you a table first, so nothing goes in without your yes." },
      { kind: "prompt", label: "Turn my list into tasks", text: `Turn my list into tasks for Google Tasks.

- Start each task with a verb. Keep it under 8 words.
- Use client names exactly as I wrote them.
- Add a due date only where I gave one. Never make up dates.
- If something is unclear, write [CHECK] next to it.
- Show me a table first: Task | Due date | Notes
- Add nothing to Google Tasks until I reply "add them".

My list:
[send [client 1] the proposal by Thursday, chase invoice [number], book a call with [client 2]]` },
      { kind: "p", text: "Do not reply yet. Check the table first." },
    ] },
    { num: "03", title: "Check, then add", accent: "You stop mistakes here.", blocks: [
      { kind: "p", text: "Gemini can add a date you never gave. Catch it before it reaches your list." },
      { kind: "list", ordered: true, items: [
        "Count the lines. Every job from your list should be there.",
        "Check every date is one you typed.",
        "Answer every **[CHECK]** in the chat.",
        "Type **add them** and press Enter.",
        "Open your **Tasks** panel. Check each name, date and list.",
      ] },
      { kind: "p", text: "Something went in wrong? Paste this in the same chat." },
      { kind: "prompt", label: "Fix one task", text: `This task is wrong: [task name].
It should be: [right name, date or list].
Change only this task. Then tell me exactly what you changed.` },
    ] },
    { num: "04", title: "See this week", accent: "Any morning.", blocks: [
      { kind: "p", text: "See the whole week without opening every list." },
      { kind: "prompt", label: "Show what's due this week", text: `Show my Google Tasks due between today and Sunday.

- Group them by day, today first.
- Give each task's exact name and its list. If you can't see the list, write "List not visible".
- Then list open tasks with no due date.
- Name the one client task I should do first today, and why, in one sentence.

Use only what is in my Google Tasks. Change, add or complete nothing.` },
      { kind: "p", text: "Pick 2 tasks from your **Tasks** panel. Check both are in the answer." },
    ] },
    { num: "05", title: "Clear late tasks", accent: "Every Friday.", blocks: [
      { kind: "p", text: "Late tasks make you feel behind. Gemini suggests. You choose." },
      { kind: "prompt", label: "Clear my late tasks", text: `Show my overdue Google Tasks and any task due today that is still open.

Table: Task | Due date | Your suggestion (done, move to a date, drop) | One-line reason

- Client deadlines are never "drop". Suggest a date and write [CHECK].
- Change, move, complete or delete nothing. Wait for my choice on each one.` },
      { kind: "list", ordered: true, items: [
        "Type your choice for each task, like: 1 move to Monday, 2 drop.",
        "For any **[CHECK]**, message the client before you move the date.",
        "Type **Make these changes now**. Then check your **Tasks** panel.",
      ] },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Google Tasks switched on and tested",
        "One real list turned into tasks",
        "Every date is one you gave",
        "This week's tasks checked against the panel",
        "No late task left on Friday",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your week is planned.",
    accent: "Now meet the AI browser.",
    body: "The next guide shows what an AI browser is, and how to try one safely.",
    label: "Try an AI browser safely →",
    href: "/guides/what-is-an-ai-browser/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Empty your head on Monday. Check the table before you say yes. Clear late tasks on Friday.",
    finishLine: "Nothing lives only in your head.",
  },
};
