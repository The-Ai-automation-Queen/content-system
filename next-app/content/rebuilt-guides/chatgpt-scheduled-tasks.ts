import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "chatgpt-scheduled-tasks",
  lumailTag: "guide-chatgpt-scheduled-tasks",
  title: "How to Make ChatGPT Do a Task for Me Every Week",
  cover: "/images/guides/chatgpt-scheduled-tasks.webp",
  coverAlt: "The blue robot mascot setting a clockwork lookout beside a public noticeboard",
  seoDescription: "Make ChatGPT do a task every week with scheduled tasks: a Monday plan, a Friday industry round-up with sources and a watch on one public page.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Make ChatGPT Do a Task", accent: "for Me Every Week" },
  hero: {
    kind: "scene",
    src: "/images/guides/chatgpt-scheduled-tasks.webp",
    alt: "The blue robot mascot setting a clockwork lookout beside a public noticeboard",
    line: "Set it once and it runs on its own. Three weekly tasks that arrive without you asking.",
  },
  intro: {
    heading: "Three tasks that run while you work",
    lead: "ChatGPT can run a prompt for you on a schedule: every Monday morning, every Friday afternoon, every weekday at 9:00. This guide sets up three small tasks for your business, each with a clear job and a clear stop point, then shows you how to decide which ones to keep.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **Monday plan** task that asks you 3 questions and turns your answers into the week's priorities",
        "A **Friday industry round-up** task: up to 3 stories from your field, each with a source and a date",
        "A **page watch** task that checks one public page (for example a competitor's pricing page) and only messages you when it changes",
        "Know how to pause, edit or delete any task",
        "A **keep or stop rule** you use after 2 weeks, so no task runs longer than it's useful",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. Scheduled tasks may not be on every plan; step 01 shows you how to check and what to do if you don't have them. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "3 weekly tasks.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Know what tasks can do", accent: "Before you set one up.", blocks: [
      { kind: "p", text: "A scheduled task is a prompt ChatGPT runs at a time you choose, once or on repeat. When it runs, you get a notification and the answer appears in a chat." },
      { kind: "list", ordered: true, items: [
        "Go to [chatgpt.com](https://chatgpt.com) and sign in.",
        "Click your name or profile picture. **If you see Tasks** in the menu, you have scheduled tasks. Click it to see the list of your tasks (it is empty for now).",
        "**If you don't see Tasks,** check the model picker at the top of a chat for an option that mentions scheduled tasks, or search \"scheduled tasks\" on [OpenAI's help pages](https://help.openai.com/) to see which plans include them.",
        "**If your plan doesn't have them:** save each prompt in this guide in your notes, set a weekly reminder in your calendar, and paste the prompt into a new chat when the reminder goes off. It takes 1 minute and does the same job.",
      ] },
      { kind: "p", text: "Then know the limits. A task can search the web and read public pages. It cannot open your inbox, your calendar, your bank or your client folders unless you have connected those apps to ChatGPT yourself. It also cannot send emails, post or pay for anything on its own." },
      { kind: "table", head: ["Good weekly tasks", "Bad weekly tasks"], rows: [
        ["Ask you planning questions every Monday", "\"Plan my week\" with nothing to go on"],
        ["Find up to 3 news stories on one narrow topic, with links", "\"Tell me everything about AI\""],
        ["Check one public page for one exact change", "Watch a page behind a login"],
        ["Remind you to chase unpaid invoices", "Chase clients for you"],
        ["Draft a weekly post idea from a topic you give it", "Publish anything without you reading it"],
      ] },
      { kind: "tip", text: "One task, one job, one stop point. If you can't say in one sentence what the task gives you, it's too big." },
    ] },
    { num: "02", title: "Set up the Monday plan", accent: "The week starts on purpose.", blocks: [
      { kind: "p", text: "This task doesn't plan your week for you. It asks you three questions at the same time every Monday, then turns your answers into a short plan." },
      { kind: "list", ordered: true, items: [
        "Start a new chat. If you see a model or mode option for scheduled tasks, choose it.",
        "Paste the prompt below and change the time in brackets.",
        "ChatGPT replies with the task it has created and when it will run. Check the day, time and time zone are right. If not, tell it: \"Change the time to [time].\"",
      ] },
      { kind: "prompt", label: "The Monday plan task", text: `Create a scheduled task that runs every Monday at [8:00].

When it runs, ask me these 3 questions:
1. Which client work must be finished or sent this week?
2. What am I waiting on from clients or other people?
3. What can wait until next week?

When I answer, turn my answers into a short plan with 3 parts:
- 3 priorities for the week, most important first
- 2 follow-ups to send, with who they go to written as [client]
- 1 thing I'm choosing not to do this week

Rules: use only what I tell you. Never invent clients, deadlines or tasks. If something is unclear, write [CHECK] instead of guessing. Keep the whole plan under 120 words.` },
      { kind: "p", text: "On Monday, answer the three questions in the chat the task opens. Copy the plan into wherever you keep your week (notes, calendar, paper)." },
      { kind: "tip", text: "**No reply from the task on Monday?** Open **Tasks** from your profile menu and check it shows as active, with the right day and time zone." },
    ] },
    { num: "03", title: "Set up the Friday round-up", accent: "Your field, with sources.", blocks: [
      { kind: "p", text: "This task keeps you up to date on one narrow topic your clients care about, without you reading everything. Narrow matters: \"AI rules for UK recruiters\" works, \"AI news\" doesn't." },
      { kind: "list", ordered: true, items: [
        "Pick one topic your clients ask you about. Write it in one line.",
        "Start a new chat and paste the prompt below with your topic and time.",
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
      { kind: "p", text: "When it arrives, open the links before you repeat anything to a client or in a post. The summary is a pointer to the source, not the source." },
      { kind: "tip", text: "**Round-up too broad?** Tell the task: \"Only include stories about [narrower topic].\" Fewer, better stories beat a long list." },
    ] },
    { num: "04", title: "Set up the page watch", accent: "Silence until it changes.", blocks: [
      { kind: "p", text: "This task checks one public page for one exact change, like a competitor changing their prices or a conference opening speaker applications. Most days you hear nothing. That's the point." },
      { kind: "list", ordered: true, items: [
        "Open the page in your browser and copy its link. It must open without a login.",
        "Write the exact change you want to know about, for example: \"the price of the [package name] package changes\".",
        "Start a new chat and paste the prompt below with your link, change and end date.",
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
      { kind: "honest", text: "**A page watch can miss a change** or misread a page that loads slowly. Check the page yourself now and then, and never make a pricing decision from the task's message alone. Open the page first." },
    ] },
    { num: "05", title: "Pause, edit or delete", accent: "You stay in charge.", blocks: [
      { kind: "p", text: "Tasks keep running until you stop them. Know where the controls are before you need them." },
      { kind: "list", ordered: true, items: [
        "Click your name or profile picture, then **Tasks**. You see every task, when it runs next and whether it's active.",
        "Click a task to open it. From there you can pause it, change the time or the prompt, or delete it.",
        "You can also change a task from the chat it runs in: type \"Change this task to run at [time]\" or \"Stop this task\".",
        "Menu names change. If you can't find the task list, search \"scheduled tasks\" on [OpenAI's help pages](https://help.openai.com/).",
      ] },
      { kind: "tip", text: "Going on holiday? Pause the Monday plan instead of deleting it, and switch it back on when you return." },
    ] },
    { num: "06", title: "Keep or stop", accent: "After 2 weeks.", blocks: [
      { kind: "p", text: "A task that nobody reads is noise. After each task has run twice, ask yourself three questions about it." },
      { kind: "table", head: ["Question", "If yes", "If no"], rows: [
        ["Did I read it when it arrived?", "Keep going", "Move it to a better time or day"],
        ["Did I do something because of it?", "Keep it", "Make the prompt narrower"],
        ["Would I miss it if it stopped?", "Keep it", "Delete it"],
      ] },
      { kind: "p", text: "Two or more \"no\" answers: pause or delete the task. Then add one new task only when the ones you have are earning their place." },
      { kind: "honest", text: "**The honest part:** a scheduled task saves you remembering, not thinking. It won't know your clients, it can get a date or a page wrong, and it never replaces you checking the source. You read, decide and act." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Checked you have Tasks (or set up the calendar reminder fallback)",
        "Monday plan task running",
        "Friday round-up task running on one narrow topic",
        "Page watch task running, with an end date",
        "Found where to pause, edit and delete tasks",
        "Keep or stop check booked for 2 weeks from today",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "ChatGPT runs your weekly check-ins.",
    accent: "Now teach Claude a weekly job.",
    body: "The next guide turns one task you repeat every week, like your client update, into saved steps Claude follows without you explaining it again.",
    label: "Teach Claude a repeatable workflow →",
    href: "/guides/teach-claude-a-repeatable-workflow/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Give every task one job and one stop point, check the sources before you use them, and run the keep or stop check every few weeks.",
    finishLine: "Set it once, then keep only what earns its place.",
  },
};
