import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "launch-your-product-in-30-days",
  lumailTag: "guide-launch-your-product-in-30-days",
  title: "How to Launch My Product in 30 Days",
  cover: "/images/guides/launch-your-product-in-30-days.webp",
  coverAlt: "The blue robot mascot watching a conveyor carry parcels from moon to sun",
  seoDescription: "Launch your product in 30 days: make it small, plan back from a fixed date with ChatGPT, and check in every Friday. 5 steps.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Launch My Product", accent: "in 30 Days" },
  hero: {
    kind: "scene",
    src: "/images/guides/launch-your-product-in-30-days.webp",
    alt: "The blue robot mascot watching a conveyor carry parcels from moon to sun",
    line: "Pick a date. ChatGPT plans every task back from it.",
  },
  intro: {
    heading: "Launch on a date that holds",
    lead: "Your launch keeps slipping because the product keeps growing. Here you fix the date, make the product small and let ChatGPT plan every task. It takes 30 minutes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A launch date** that does not move",
        "**A version 1 list**, and a list of what waits",
        "**A dated plan** that fits the time you really have",
        "**A Friday check** that tells you what to cut",
        "**Launch week emails and posts**, planned early",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. You also need a spreadsheet, like Google Sheets. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "30-day launch plan.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Pick your date", accent: "It never moves.", blocks: [
      { kind: "p", text: "The date stays fixed. What goes in the product can change." },
      { kind: "list", ordered: true, items: [
        "Open [Google Sheets](https://sheets.google.com) and click **Blank spreadsheet**.",
        "Name it **Launch checklist**.",
        "Pick a day about 30 days away when you are at your desk.",
        "In the first box, type **Launch date:** and the date.",
        "Below it, type your time each day, for example **45 minutes**.",
        "Below that, type the days you can't work, and what you are launching in one line.",
      ] },
      { kind: "p", text: "Keep this sheet open. You use it in every step." },
    ] },
    { num: "02", title: "Cut it down", accent: "What's in, what waits.", blocks: [
      { kind: "p", text: "Products don't launch because they keep growing. Make version 1 the smallest thing a client would pay for." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and click **New chat**.",
        "Use this same chat for steps 02 to 05.",
        "Paste the prompt below and answer each question.",
      ] },
      { kind: "prompt", label: "Find my smallest version", text: `Here is my product idea in full: [everything you imagine it including].
Who it is for: [type of client]
The one result it gets them: [result]

Help me pick version 1: the smallest thing a first client would pay for that still gets that result.
Ask me up to 5 questions, one at a time. Wait for each answer.

Then give me two lists:
1. In version 1
2. Waits for version 2, with one line on why

Use only what I give you. Do not add features I did not mention.
If something is missing, write [CHECK].` },
      { kind: "p", text: "Delete anything ChatGPT added that you never said. Copy both lists into your sheet. New ideas go on the version 2 list." },
    ] },
    { num: "03", title: "Plan back from launch day", accent: "A date on every task.", blocks: [
      { kind: "p", text: "Start from the date and work back. Every task gets a day and a time." },
      { kind: "prompt", label: "Plan my launch backwards", text: `Plan my launch backwards from the launch date.

Launch date: [date]
Today's date: [date]
Time I have each day: [for example, 45 minutes]
Days I can't work: [days or dates]
Version 1 includes: [paste your list]
Still to set up: [for example, sales page, payment link, launch emails]

Use 4 weeks:
Week 1: decide and cut
Week 2: build the smallest version
Week 3: tell people it is coming
Week 4: open and follow up

Give me a table: Date | Day | Week | Task | Time needed | Done (leave empty)

Rules:
- Use real calendar dates from today to the launch date.
- Every task fits the time I have that day.
- Every task is one clear action, never "work on marketing".
- Leave one free day each week to catch up.
- Use only what I give you. If something is missing, write [CHECK].` },
      { kind: "list", ordered: true, items: [
        "Check the first and last dates in your calendar. ChatGPT can get a weekday wrong.",
        "Check no task lands on a day you can't work.",
        "Copy the table and paste it into your sheet.",
      ] },
    ] },
    { num: "04", title: "Run the Friday check", accent: "Cut, never move the date.", blocks: [
      { kind: "p", text: "Some weeks go badly. Then you cut something and keep the date." },
      { kind: "list", ordered: true, items: [
        "Open [Google Calendar](https://calendar.google.com) and click **Create**, then **Event**.",
        "Call it **Friday launch check**, 15 minutes this Friday.",
        "Click **Does not repeat** and pick **Weekly on Friday**. Click **Save**.",
        "Each Friday, type **yes** next to every task you finished in your sheet.",
        "Go back to your launch chat and paste the prompt below.",
      ] },
      { kind: "prompt", label: "Friday check", text: `It is Friday, week [1, 2, 3 or 4] of my launch. The launch date stays [date].

Planned this week: [paste the rows]
Done: [what I finished]
Not done: [what I did not finish, and why]

Give me:
1. A status: on track, at risk, or cut needed
2. If at risk: what to cut from version 1 to keep the date, with one line on why
3. Next week's rows, updated, in the same table

Do not move the launch date. Do not add new tasks. Use only what I give you.` },
      { kind: "p", text: "Did it move the date? Reply: \"Keep the date. Cut instead.\" Paste next week's rows into your sheet." },
      { kind: "tip", text: "Can't find it? Google moves this menu. Search \"repeating event\" on [Google's Calendar help pages](https://support.google.com/calendar)." },
    ] },
    { num: "05", title: "Plan launch week", accent: "Emails and posts, ready early.", blocks: [
      { kind: "p", text: "Plan every launch email and post in week 3. Then launch week is for answering clients." },
      { kind: "prompt", label: "Plan my launch week", text: `Plan my launch week emails and posts.

Launch date: [date]
The offer: [what it is, who it is for, [price]]
Where I post: [for example, LinkedIn, Instagram, my email list]
Proof I can use: [real client words, with permission]

Give me a table: Date | Email or post | Purpose | One-line idea | Link

Include a doors-open email, an email answering the question clients ask most, a proof email and a last-call email.

Use only what I give you. If something is missing, write [CHECK].
Never make up names, prices, dates or promises.` },
      { kind: "list", ordered: true, items: [
        "Delete any deadline, bonus or result you never gave it.",
        "Fill in every **[CHECK]** yourself.",
        "Put each row in your sheet on its date.",
      ] },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Launch date and daily time in your sheet",
        "Version 1 and version 2 lists saved",
        "Dated plan pasted in, first and last dates checked",
        "Friday check repeating in your calendar",
        "Launch week emails and posts planned, every [CHECK] filled",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your launch has a date.",
    accent: "Now let ChatGPT check in for you.",
    body: "The next guide sets up weekly check-ins. ChatGPT runs them on a timetable, without you asking.",
    label: "Set up your check-ins →",
    href: "/guides/chatgpt-scheduled-tasks/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Keep the date. Run the Friday check. Put new ideas on the version 2 list.",
    finishLine: "A fixed date. A smaller product. A check every Friday.",
  },
};
