import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "chatgpt-scheduled-tasks",
  lumailTag: "guide-chatgpt-scheduled-tasks",
  title: "How to Make ChatGPT Do a Task for Me Every Week",
  cover: "/images/guides/chatgpt-scheduled-tasks.webp",
  coverAlt: "The blue robot mascot setting a clockwork lookout beside a public noticeboard",
  seoDescription: "Make ChatGPT do a task every week with scheduled tasks: a Monday plan, a Friday news round-up with sources, and a page watch. 5 steps.",
  tool: "ChatGPT",
  minutes: 25,
  h1: { title: "How to Make ChatGPT Do a Task", accent: "for Me Every Week" },
  hero: {
    kind: "scene",
    src: "/images/guides/chatgpt-scheduled-tasks.webp",
    alt: "The blue robot mascot setting a clockwork lookout beside a public noticeboard",
    line: "Set it up once. ChatGPT runs it every week.",
  },
  intro: {
    heading: "Get your week planned for you",
    lead: "Monday starts in your inbox, with no plan. This guide sets up three weekly tasks that ChatGPT runs on its own. It takes 25 minutes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A Monday plan** from 3 short questions",
        "**A Friday round-up** of up to 3 news stories, with links",
        "**A page watch** that tells you when one page changes",
        "**The controls** to pause, change or delete any task",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. Scheduled tasks are usually on paid plans, and step 01 shows how to check. Copy each prompt as it is and change the [brackets]." },
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
    { num: "01", title: "Check you have tasks", accent: "A 5-minute test.", blocks: [
      { kind: "p", text: "A scheduled task (a request ChatGPT runs at a set time) works like an alarm with a job. It can search the web. It can't send, post or pay." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and click your name or picture.",
        "Look for **Tasks** in the menu.",
        "Click **New chat** and type: **In 5 minutes, remind me to check my unpaid invoices.**",
        "Check the time in the reply is your time.",
        "Wait 5 minutes. The reminder arrives.",
      ] },
      { kind: "p", text: "No Tasks on your plan? Make a weekly calendar event instead. Paste the prompt into a new chat when it pops up." },
      { kind: "tip", text: "Can't find it? OpenAI moves this menu. Search \"scheduled tasks\" on [OpenAI's help pages](https://help.openai.com/)." },
    ] },
    { num: "02", title: "Set up the Monday plan", accent: "Three questions, one plan.", blocks: [
      { kind: "p", text: "Every Monday, ChatGPT asks you 3 questions. Your answers become a short plan." },
      { kind: "prompt", label: "The Monday plan task", text: `Create a scheduled task that runs every Monday at [8:00].

When it runs, ask me these 3 questions:
1. Which client work must be finished or sent this week?
2. What am I waiting on from other people?
3. What can wait until next week?

Then turn my answers into a short plan:
- 3 top jobs, most important first
- 2 follow-ups to send, written as [client]
- 1 thing I am not doing this week

Use only what I tell you. If something is missing, write [CHECK].
Never make up names, dates or tasks. Keep it under 120 words.` },
      { kind: "p", text: "Check the reply says Monday, the right time and your time zone." },
    ] },
    { num: "03", title: "Set up the Friday round-up", accent: "One topic, with sources.", blocks: [
      { kind: "p", text: "Keep the topic small, like new rules on AI in hiring in the UK. Not \"AI news\"." },
      { kind: "prompt", label: "The Friday round-up task", text: `Create a scheduled task that runs every Friday at [16:00].

When it runs, search the web for up to 3 news stories from the last 7 days about [one small topic].

For each story give me:
- A one-line summary in plain English
- Why it matters to [who my clients are]
- The source name, the date and the link

Only stories from the last 7 days. No date? Leave it out.
Use only what the source says. Never make up numbers, quotes or names.
Nothing new? Write "Nothing new this week" and stop.` },
      { kind: "list", ordered: true, items: [
        "Before you use a story, click its link.",
        "Check the date on the page.",
        "Press **Ctrl + F** (or **Cmd + F**) and search a few words from the summary.",
        "Page says something else? Use the page, not the summary.",
      ] },
    ] },
    { num: "04", title: "Set up the page watch", accent: "Silence until it changes.", blocks: [
      { kind: "p", text: "Watch one public page for one exact change, like a competitor's price." },
      { kind: "list", ordered: true, items: [
        "Copy the page link from your browser.",
        "Open it in a private window. If it asks you to sign in, pick another page.",
        "Write the exact change you want to hear about.",
      ] },
      { kind: "prompt", label: "The page watch task", text: `Create a scheduled task that runs every weekday at [9:00].

When it runs, open this public page: [page link]

Only message me if [the exact change, for example: the price of the [package name] package changes].
If it changed, show what it said before and now, word for word, with the date and the link.

If nothing changed, say only "No change".
If you can't open the page or you are not sure, say so. Do not guess.
Stop this task on [end date].` },
      { kind: "tip", text: "A page watch can miss a change. Never change your own prices from its message alone. Open the page first." },
    ] },
    { num: "05", title: "Pause, change or delete", accent: "You stay in charge.", blocks: [
      { kind: "p", text: "Tasks run until you stop them. Find the controls now." },
      { kind: "list", ordered: true, items: [
        "Click your name or picture, then **Tasks**.",
        "Click a task to pause it, change it or delete it.",
        "Or type in the task's chat: **Stop this task**.",
      ] },
      { kind: "p", text: "After 2 weeks, ask: did I read it, did I act on it, would I miss it? Two no answers? Delete it." },
      { kind: "tip", text: "Can't find it? Search \"scheduled tasks\" on [OpenAI's help pages](https://help.openai.com/)." },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Test reminder arrived (or a calendar event set)",
        "Monday plan set, right day and time",
        "Friday round-up set on one small topic",
        "Page watch set, with an end date",
        "One story checked against its source",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "ChatGPT runs your weekly check-ins.",
    accent: "Now teach Claude a weekly job.",
    body: "The next guide saves the steps of one weekly job, like your client update. Claude follows them without you explaining again.",
    label: "Teach Claude steps you repeat →",
    href: "/guides/teach-claude-a-repeatable-workflow/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "One task, one job, one end point. Check the source before you use a story.",
    finishLine: "Set it up once. Keep only what helps.",
  },
};
