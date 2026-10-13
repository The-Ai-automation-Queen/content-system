import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "chatgpt-scheduled-tasks",
  lumailTag: "guide-chatgpt-scheduled-tasks",
  title: "How to Make ChatGPT Do a Task for Me Every Week",
  cover: "/images/guides/chatgpt-scheduled-tasks.webp",
  coverAlt: "The blue robot mascot setting a clockwork lookout beside a public noticeboard",
  seoDescription: "Make ChatGPT do a task every week with scheduled tasks: a Monday plan, a Friday news round-up with sources, and a check on one public page.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Make ChatGPT Do a Task", accent: "for Me Every Week" },
  hero: {
    kind: "scene",
    src: "/images/guides/chatgpt-scheduled-tasks.webp",
    alt: "The blue robot mascot setting a clockwork lookout beside a public noticeboard",
    line: "Set it up once. It runs by itself. Three weekly tasks that arrive without you asking.",
  },
  intro: {
    heading: "Three tasks that run while you work",
    lead: "ChatGPT can run a prompt for you at set times. For example, every Monday morning or every weekday at 9:00. This guide sets up 3 small tasks for your business. Each has one job and a clear end. Then you decide which ones to keep.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **Monday plan** task: 3 questions that turn into your top jobs for the week",
        "A **Friday news round-up** task: up to 3 stories from your field, each with a source and date",
        "A **page watch** task: it checks one public page and tells you only when it changes",
        "How to pause, change or delete any task",
        "A **keep or stop rule** for after 2 weeks, so no task runs when it stops helping",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. Some plans may not have scheduled tasks. Step 01 shows how to check, and what to do if you don't have them. You can copy and paste every prompt below. Change the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "3 weekly tasks.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Know what tasks can do", accent: "Before you set one up.", blocks: [
      { kind: "p", text: "A scheduled task is a prompt ChatGPT runs at a time you pick. It can run once or again and again. When it runs, you get an alert. The answer shows up in a chat." },
      { kind: "list", ordered: true, items: [
        "Go to [chatgpt.com](https://chatgpt.com) and sign in.",
        "Click your name or picture. **Do you see Tasks** in the menu? Then you have scheduled tasks. Click it to see your task list. It is empty for now.",
        "**No Tasks?** Look at the model picker (the menu at the top of a chat). Look for an option about scheduled tasks. Or search \"scheduled tasks\" on [OpenAI's help pages](https://help.openai.com/) to see which plans have them.",
        "**Your plan does not have them?** Save each prompt from this guide in your notes. Set a weekly reminder in your calendar. When it goes off, paste the prompt into a new chat. It takes 1 minute and does the same job.",
      ] },
      { kind: "p", text: "Now know the limits. A task can search the web and read public pages. It cannot open your inbox, calendar, bank or client folders. The only exception is apps you connected to ChatGPT yourself. It also cannot send emails, post or pay for anything by itself." },
      { kind: "table", head: ["Good weekly tasks", "Bad weekly tasks"], rows: [
        ["Ask you planning questions every Monday", "\"Plan my week\" with no details"],
        ["Find up to 3 news stories on one small topic, with links", "\"Tell me everything about AI\""],
        ["Check one public page for one exact change", "Watch a page that needs a login"],
        ["Remind you to chase unpaid invoices", "Chase clients for you"],
        ["Write a weekly post idea from your topic", "Post anything before you read it"],
      ] },
      { kind: "tip", text: "One task, one job, one end point. Can't say in one sentence what the task gives you? Then it is too big." },
    ] },
    { num: "02", title: "Set up the Monday plan", accent: "The week starts on purpose.", blocks: [
      { kind: "p", text: "This task does not plan your week for you. Every Monday it asks you 3 questions. Then it turns your answers into a short plan." },
      { kind: "list", ordered: true, items: [
        "Start a new chat. If you see a model or mode for scheduled tasks, pick it.",
        "Paste the prompt below. Change the time in brackets.",
        "ChatGPT replies with the task and when it will run. Check the day, time and time zone. Wrong? Tell it: \"Change the time to [time].\"",
      ] },
      { kind: "prompt", label: "The Monday plan task", text: `Create a scheduled task that runs every Monday at [8:00].

When it runs, ask me these 3 questions:
1. Which client work must be finished or sent this week?
2. What am I waiting on from clients or other people?
3. What can wait until next week?

When I answer, turn my answers into a short plan with 3 parts:
- 3 top jobs for the week, most important first
- 2 follow-ups to send, with who they go to written as [client]
- 1 thing I'm choosing not to do this week

Rules: use only what I tell you. Never invent clients, deadlines or tasks. If something is unclear, write [CHECK] instead of guessing. Keep the whole plan under 120 words.` },
      { kind: "p", text: "On Monday, answer the 3 questions in the chat the task opens. Copy the plan to where you keep your week: notes, calendar or paper." },
      { kind: "tip", text: "**No message from the task on Monday?** Open **Tasks** from your profile menu. Check it is on, with the right day and time zone." },
    ] },
    { num: "03", title: "Set up the Friday round-up", accent: "Your field, with sources.", blocks: [
      { kind: "p", text: "This task keeps you up to date on one small topic your clients care about. You don't have to read everything. Keep the topic small. \"AI rules for UK recruiters\" works. \"AI news\" does not." },
      { kind: "list", ordered: true, items: [
        "Pick one topic your clients ask you about. Write it in one line.",
        "Start a new chat. Paste the prompt below with your topic and time.",
        "Check the reply shows Friday, the right time and your time zone.",
      ] },
      { kind: "prompt", label: "The Friday round-up task", text: `Create a scheduled task that runs every Friday at [16:00].

When it runs, search the web for up to 3 news stories from the last 7 days about [one narrow topic, for example: new rules on AI in hiring in the UK].

For each story give me:
- A one-line summary in plain English
- Why it matters to [who my clients are], in one line
- The source name
- The date it was published
- The link

Rules:
- Only stories published in the last 7 days. If you can't find a date, leave the story out.
- Only use what the source says. Never invent numbers, quotes or names.
- If there is nothing new, write "Nothing new this week" and stop. Don't fill space.` },
      { kind: "p", text: "When it arrives, open the links. Do this before you tell a client or post about it. The summary only points to the source. It is not the source." },
      { kind: "tip", text: "**Round-up too wide?** Tell the task: \"Only include stories about [narrower topic].\" A few good stories are better than a long list." },
    ] },
    { num: "04", title: "Set up the page watch", accent: "Silence until it changes.", blocks: [
      { kind: "p", text: "This task checks one public page for one exact change. For example, a competitor changes their prices. Or an event opens speaker sign-ups. Most days you hear nothing. That is how it should be." },
      { kind: "list", ordered: true, items: [
        "Open the page in your browser. Copy its link. It must open without a login.",
        "Write the exact change you want to know about. For example: \"the price of the [package name] package changes\".",
        "Start a new chat. Paste the prompt below with your link, change and end date.",
      ] },
      { kind: "prompt", label: "The page watch task", text: `Create a scheduled task that runs every weekday at [9:00].

When it runs, open this public page: [page link]

Only message me if [the exact change, for example: the price of the [package name] package is different from last time].

If it changed, tell me:
- What it said before and what it says now, word for word
- The date you noticed
- The link to the page

Rules:
- If nothing changed, say only "No change".
- If you can't open the page or you aren't sure what changed, say so. Don't guess.
- Stop this task on [end date, for example 3 months from today].` },
      { kind: "honest", text: "**A page watch can miss a change.** It can also misread a slow page. Check the page yourself now and then. Never change your prices from the task's message alone. Open the page first." },
    ] },
    { num: "05", title: "Pause, edit or delete", accent: "You stay in charge.", blocks: [
      { kind: "p", text: "Tasks keep running until you stop them. Find the controls before you need them." },
      { kind: "list", ordered: true, items: [
        "Click your name or picture, then **Tasks**. You see every task, when it runs next and if it is on.",
        "Click a task to open it. You can pause it, change the time or prompt, or delete it.",
        "You can also change a task in the chat it runs in. Type \"Change this task to run at [time]\" or \"Stop this task\".",
        "Menu names change. Can't find the task list? Search \"scheduled tasks\" on [OpenAI's help pages](https://help.openai.com/).",
      ] },
      { kind: "tip", text: "Going on holiday? Pause the Monday plan. Don't delete it. Turn it back on when you come back." },
    ] },
    { num: "06", title: "Keep or stop", accent: "After 2 weeks.", blocks: [
      { kind: "p", text: "A task nobody reads is just noise. After each task runs twice, ask yourself 3 questions about it." },
      { kind: "table", head: ["Question", "If yes", "If no"], rows: [
        ["Did I read it when it came?", "Keep going", "Move it to a better time or day"],
        ["Did I do something because of it?", "Keep it", "Make the topic smaller"],
        ["Would I miss it if it stopped?", "Keep it", "Delete it"],
      ] },
      { kind: "p", text: "Two or more \"no\" answers? Pause or delete the task. Add a new task only when the ones you have are helping." },
      { kind: "honest", text: "**The honest part:** a scheduled task saves you remembering. It does not do your thinking. It does not know your clients. It can get a date or a page wrong. Always check the source. You read, decide and act." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Checked you have Tasks (or set a calendar reminder instead)",
        "Monday plan task running",
        "Friday round-up task running on one small topic",
        "Page watch task running, with an end date",
        "Found where to pause, change and delete tasks",
        "Keep or stop check in your calendar for 2 weeks from today",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "ChatGPT runs your weekly check-ins.",
    accent: "Now teach Claude a weekly job.",
    body: "Pick one job you do every week, like your client update. The next guide turns it into saved steps. Claude follows them without you explaining again.",
    label: "Teach Claude steps you repeat →",
    href: "/guides/teach-claude-a-repeatable-workflow/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Give every task one job and one end point. Check the sources before you use them. Do the keep or stop check every few weeks.",
    finishLine: "Set it up once. Keep only what helps.",
  },
};
