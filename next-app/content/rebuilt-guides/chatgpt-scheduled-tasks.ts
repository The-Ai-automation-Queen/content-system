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
    line: "Set it up once. ChatGPT runs it every week and sends you the answer.",
  },
  intro: {
    heading: "Stop starting every Monday from your inbox",
    lead: "Here is the problem. It is Monday morning and you open your inbox first. Two hours later, you still have no plan for the week. ChatGPT can come to you instead, at a time you pick. It asks you 3 questions, turns your answers into a plan, and checks the news for you on Friday. You set it up once and it arrives every week.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A plan for your week every Monday**, made from 3 short questions ChatGPT asks you",
        "**Up to 3 news stories every Friday** on one topic your clients care about, each with a link and a date",
        "**A message when one public page changes**, like a competitor's price list, and silence when it doesn't",
        "**The controls to pause, change or delete** any of these in under a minute",
        "**A simple rule after 2 weeks** to keep only what helps you",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer. These steps are for a web browser, like Chrome. The phone app works too, but the menus may sit in other places.",
        "A ChatGPT account. Scheduled tasks are usually on paid plans. Step 01 shows how to check. If you don't have them, step 01 also gives you a free way to do the same job.",
        "One real thing from your work: a topic your clients ask you about, or one public web page you check by hand.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
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
    { num: "01", title: "Check you have scheduled tasks", accent: "5 minutes, with a test.", blocks: [
      { kind: "p", text: "A scheduled task (a message you ask ChatGPT to run at a set time) works like an alarm with a job attached. At the time you pick, ChatGPT runs your request. Then it sends you an alert and the answer appears in a chat." },
      { kind: "h3", text: "A. Find the Tasks page" },
      { kind: "list", ordered: true, items: [
        "Open [chatgpt.com](https://chatgpt.com) in your browser and sign in.",
        "Look at the bottom left corner. You will see your name or a small round picture. On some screens it is at the top right.",
        "Click it. A menu opens.",
        "Look for **Tasks** in that menu. If you see it, click it. You will see a page with your task list. It is empty for now.",
        "Can't find **Tasks**? OpenAI moves these menus. Search \"scheduled tasks\" on [OpenAI's help pages](https://help.openai.com/) for today's steps and which plans have it.",
      ] },
      { kind: "h3", text: "B. Make a test task" },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left.",
        "Click in the chat box at the bottom. Type the line below and press Enter.",
      ] },
      { kind: "example", label: "What you type", text: "In 5 minutes, remind me to check my unpaid invoices." },
      { kind: "result", label: "What you should see", lines: [
        "A short reply that says a task is set, with the time it will run.",
        "On some accounts you will also see a small box with the task name and time.",
        "5 minutes later, an alert or a new message in that chat.",
      ] },
      { kind: "list", ordered: true, items: [
        "Check the time in the reply. Is it your time? If not, type: \"My time zone is [your city]. Change the task to that time.\"",
        "Wait 5 minutes. When the reminder comes, your setup works.",
      ] },
      { kind: "tip", text: "**ChatGPT says it can't set reminders?** Your plan may not have scheduled tasks. On some accounts you first pick a model from the menu at the top of the chat. Look for one that mentions tasks or scheduling." },
      { kind: "h3", text: "C. No Tasks on your plan? Use your calendar" },
      { kind: "list", ordered: true, items: [
        "Open your calendar app and make a weekly event, for example every Monday at 8:00.",
        "Paste the prompt from this guide into the event's notes.",
        "When the event pops up, open ChatGPT, click **New chat** and paste the prompt. It takes 1 minute and does the same job.",
      ] },
      { kind: "h3", text: "D. Know what a task can and can't do" },
      { kind: "p", text: "A task can search the web and read public pages. It can't open your inbox, calendar, bank or client folders, unless you connected that app to ChatGPT yourself. It can't send emails, post or pay for anything." },
      { kind: "table", head: ["Good weekly tasks", "Bad weekly tasks"], rows: [
        ["Ask you planning questions every Monday", "\"Plan my week\" with no details"],
        ["Find up to 3 news stories on one small topic, with links", "\"Tell me everything about AI\""],
        ["Check one public page for one exact change", "Watch a page that needs a login"],
        ["Remind you to chase unpaid invoices", "Chase clients for you"],
      ] },
      { kind: "tip", text: "One task, one job, one end point. If you can't say in one sentence what the task gives you, it is too big." },
    ] },
    { num: "02", title: "Set up the Monday plan", accent: "Start the week with a plan.", blocks: [
      { kind: "p", text: "This task does not plan your week for you. Every Monday it asks you 3 questions. Then it turns your answers into a short plan." },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box.",
        "Change [8:00] to the time you want. Press Enter.",
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
      { kind: "result", label: "What a good answer looks like", lines: [
        "Task created: Monday plan. Runs every Monday at 8:00 (your time zone).",
        "Then on Monday, the 3 questions arrive in the chat.",
      ] },
      { kind: "list", ordered: true, items: [
        "Read the reply. Check 3 things: the day says Monday, the time is right, the time zone is yours.",
        "Something wrong? Type in the same chat: \"Change the time to [time].\"",
      ] },
      { kind: "p", text: "On Monday, answer the questions in the chat the task opens. You might type something like this." },
      { kind: "example", label: "What you type on Monday", text: "1. Send the proposal to [client 1]. Finish the website copy for [client 2]. 2. Waiting on logo files from [client 2]. 3. My own blog post can wait." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Top jobs: 1. Send the proposal to [client 1]. 2. Finish the website copy for [client 2]. 3. [CHECK] Add a third job if you have one.",
        "Follow-ups: ask [client 2] for the logo files.",
        "Not this week: your blog post.",
      ] },
      { kind: "list", ordered: true, items: [
        "Check every job in the plan came from your answers. Nothing new should appear.",
        "Copy the plan to where you keep your week: your notes, your calendar or a piece of paper.",
      ] },
      { kind: "tip", text: "**No message on Monday?** Open the **Tasks** page from step 01. Check the task is on, with the right day and time zone." },
    ] },
    { num: "03", title: "Set up the Friday round-up", accent: "Your field, with sources.", blocks: [
      { kind: "p", text: "This task keeps you up to date on one small topic your clients care about. You don't have to read everything. Keep the topic small." },
      { kind: "contrast", items: [
        { label: "Too big", text: "AI news", good: false },
        { label: "Small enough", text: "New rules on AI in hiring in the UK", good: true },
      ] },
      { kind: "list", ordered: true, items: [
        "Write your topic in one line. Pick something your clients ask you about.",
        "Click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box.",
        "Change the 3 parts in [square brackets]: the time, your topic, and who your clients are. Press Enter.",
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
      { kind: "result", label: "What a good answer looks like", lines: [
        "1. [Short summary of the story]. Why it matters: [one line for your clients]. Source: [name], [date], [link].",
        "2. [Second story, same layout].",
        "Or simply: Nothing new this week. That is a good answer too.",
      ] },
      { kind: "list", ordered: true, items: [
        "Check the reply says Friday, the right time and your time zone.",
        "When the round-up arrives on Friday, do the check in step 05 before you use any story.",
      ] },
      { kind: "tip", text: "**Round-up too wide?** Type in the task's chat: \"Only include stories about [narrower topic].\" A few good stories are better than a long list." },
    ] },
    { num: "04", title: "Set up the page watch", accent: "Silence until it changes.", blocks: [
      { kind: "p", text: "This task checks one public page for one exact change. For example, a competitor changes their prices. Or an event opens speaker sign-ups. Most days you hear nothing. That is how it should be." },
      { kind: "h3", text: "A. Get the page ready" },
      { kind: "list", ordered: true, items: [
        "Open the page in your browser.",
        "Click the address bar at the top of the browser. Copy the link.",
        "Check the page opens without a login. Open a private window and paste the link. If it asks you to sign in, ChatGPT can't read it. Pick another page.",
        "Write the exact change you want to know about in one line.",
      ] },
      { kind: "contrast", items: [
        { label: "Too vague", text: "Tell me if anything changes on this page", good: false },
        { label: "Exact", text: "Tell me if the price of the [package name] package changes", good: true },
      ] },
      { kind: "h3", text: "B. Make the task" },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box.",
        "Change the 4 parts in [square brackets]: the time, the link, the change and the end date. Press Enter.",
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
      { kind: "result", label: "What a good answer looks like", lines: [
        "Most days: No change.",
        "On the day it changes: Before: \"[old words]\". Now: \"[new words]\". Noticed on [date]. [link]",
      ] },
      { kind: "honest", text: "**A page watch can miss a change.** It can also misread a slow page. Open the page yourself now and then. Never change your own prices from the task's message alone. Open the page first." },
    ] },
    { num: "05", title: "Check the answer yourself", accent: "2 minutes, before you use it.", blocks: [
      { kind: "p", text: "AI can get a date wrong or mix up two stories. It can even give a link that doesn't work. So before you tell a client or post about a story, check it. Here is how." },
      { kind: "list", ordered: true, items: [
        "In the round-up, click the link for one story. The source page opens.",
        "Look for the date on the page. It is often near the title. Is it within the last 7 days?",
        "Copy 3 or 4 words from ChatGPT's summary.",
        "Press **Ctrl + F** on Windows, or **Cmd + F** on a Mac. A small search box opens. Paste the words.",
        "If the words don't light up, read the first part of the page. Does it say what the summary says?",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["The page says the same thing, with a recent date", "The story is right", "Use it, in your own words"],
        ["The page is older than 7 days", "ChatGPT got the date wrong", "Leave the story out"],
        ["The link doesn't open, or opens a different story", "The link is wrong or made up", "Don't use the story. Search for it yourself"],
        ["The page says something different from the summary", "ChatGPT misread it", "Use what the page says, not the summary"],
      ] },
    ] },
    { num: "06", title: "Pause, change or delete", accent: "You stay in charge.", blocks: [
      { kind: "p", text: "Tasks keep running until you stop them. Find the controls now, before you need them." },
      { kind: "list", ordered: true, items: [
        "Click your name or picture (bottom left, or top right on some screens).",
        "Click **Tasks**. You will see every task, when it runs next, and if it is on.",
        "Click a task to open it. You will see options to pause it, change the time or the request, or delete it. On some accounts these sit behind a small menu button (three dots).",
        "You can also change a task in the chat where it runs. Type \"Change this task to run at [time]\" or \"Stop this task\".",
        "Can't find these controls? OpenAI moves these menus. Search \"scheduled tasks\" on [OpenAI's help pages](https://help.openai.com/).",
      ] },
      { kind: "tip", text: "**Going on holiday?** Pause the Monday plan. Don't delete it. Turn it back on when you come back." },
      { kind: "h3", text: "Keep or stop, after 2 weeks" },
      { kind: "p", text: "A task you don't read is just noise. After each task has run twice, answer these 3 questions about it." },
      { kind: "table", head: ["Question", "If yes", "If no"], rows: [
        ["Did I read it when it came?", "Keep going", "Move it to a better day or time"],
        ["Did I do something because of it?", "Keep it", "Make the topic smaller"],
        ["Would I miss it if it stopped?", "Keep it", "Delete it"],
      ] },
      { kind: "p", text: "Two or more \"no\" answers? Pause or delete the task. Add a new task only when the ones you have are helping." },
      { kind: "honest", text: "**The honest part:** a scheduled task saves you remembering. It does not do your thinking, and it does not know your clients. It can get a date or a page wrong. You read it, check it, decide and act." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Found the Tasks page, and the 5-minute test reminder arrived (or a calendar reminder set instead)",
        "Monday plan task set, with the right day, time and time zone",
        "Friday round-up task set on one small topic",
        "Page watch task set on a page that opens without a login, with an end date",
        "One story from a round-up checked against its source page",
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
    heading: "Keep it simple",
    paragraph: "Give every task one job and one end point. Check the source before you use a story. Do the keep or stop check every few weeks.",
    finishLine: "Set it up once. Keep only what helps.",
  },
};
