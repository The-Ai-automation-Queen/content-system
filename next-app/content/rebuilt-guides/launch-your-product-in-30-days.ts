import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "launch-your-product-in-30-days",
  lumailTag: "guide-launch-your-product-in-30-days",
  title: "How to Launch My Product in 30 Days",
  cover: "/images/guides/launch-your-product-in-30-days.webp",
  coverAlt: "The blue robot mascot watching a conveyor carry parcels from moon to sun",
  seoDescription: "Launch your product in 30 days: make it small, plan back from a fixed date with ChatGPT, and get a checklist with a date on every task.",
  tool: "ChatGPT",
  minutes: 45,
  h1: { title: "How to Launch My Product", accent: "in 30 Days" },
  hero: {
    kind: "scene",
    src: "/images/guides/launch-your-product-in-30-days.webp",
    alt: "The blue robot mascot watching a conveyor carry parcels from moon to sun",
    line: "A day-by-day checklist. AI does the planning. You pick the date and make the product.",
  },
  intro: {
    heading: "Your dated 30-day launch checklist",
    lead: "Many products never launch because they keep getting bigger. In this guide, you pick the date first and make the product small. Then ChatGPT plans back from launch day and puts a date on every task. A short check every Friday keeps you moving.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **launch date** that does not move",
        "A **smallest version** list: what is in version 1, and what waits",
        "Your **dated 30-day launch checklist**: each task with a day and a time",
        "A **Friday check** for each week: on track, at risk or cut",
        "A **launch week list** of emails and posts to send",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. You can copy and paste every prompt below. Replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "30-Day Launch Checklist.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Set the date", accent: "And see the 4 weeks.", blocks: [
      { kind: "p", text: "The date stays the same. What goes into the first version can change. This plan shows what each of the four weeks is for." },
      { kind: "table", head: ["Week", "Focus", "Done means"], rows: [
        ["Week 1", "Decide and cut", "Date set, version 1 list agreed, the rest on a later list"],
        ["Week 2", "Build the smallest version", "Version 1 made and tested by you"],
        ["Week 3", "Tell people it is coming", "Sales page, payment link and launch emails ready. Your followers know it is coming."],
        ["Week 4", "Open and follow up", "Sales open, launch emails sent, every question answered"],
      ] },
      { kind: "list", ordered: true, items: [
        "Open a new document or spreadsheet. Call it **Launch checklist**.",
        "Pick a launch date about 30 days from today. Write it at the top. Pick a day you will be at your desk. Then you can answer questions as they come in.",
        "Write how much time you have for the launch each day. For example, 45 minutes or 2 hours. Also write the days you can't work.",
        "Copy the table above into the document.",
      ] },
      { kind: "tip", text: "**Not sure people want it yet?** First run the one-week test in the [idea test guide](/guides/test-business-idea-with-ai/). Then come back with your date." },
    ] },
    { num: "02", title: "Cut to the smallest version", accent: "What's in, what waits.", blocks: [
      { kind: "p", text: "A \"waits for version 2\" list helps you stop adding small extras. This prompt finds the smallest thing a first client would pay for." },
      { kind: "table", head: ["The full idea (example)", "A smaller version 1 (example)"], rows: [
        ["A 12-session coaching package with worksheets, recordings, a certificate and bonus calls", "4 sessions that get one clear result, with one worksheet. The rest waits for version 2."],
      ] },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and start a new chat. Use this same chat for steps 02 to 05.",
        "Paste the prompt below. Answer its questions.",
      ] },
      { kind: "prompt", label: "Find my smallest version", text: `Here's my product idea in full: [describe everything you imagine it including].
Who it's for: [type of client]
The one result it should get them: [result]

Help me decide on version 1: the smallest thing a first client would pay for that still gets them that result.

Ask me up to 5 questions, one at a time, and wait for each answer before you suggest anything.

Then give me two lists:
1. In version 1
2. Waits for version 2, with one line on why each item can wait

Use only what I tell you. Don't add features I didn't mention. Write [CHECK] where you need details I haven't given.` },
      { kind: "p", text: "Save both lists in your Launch checklist. During the month, you may want to add something. Put it on the version 2 list." },
    ] },
    { num: "03", title: "Plan backwards", accent: "A date on every task.", blocks: [
      { kind: "p", text: "Start from launch day. Then you can see what must be done by when. This prompt puts a date on every task in your four weeks." },
      { kind: "prompt", label: "Plan my launch backwards", text: `Plan my launch backwards from the launch date.

Launch date: [date]
Today's date: [date]
Time I have each day: [for example, 45 minutes]
Days I can't work: [dates or days of the week]
Version 1 includes: [paste your list]
What I still need to set up: [for example, sales page, payment link, booking link, launch emails]

Use these 4 weeks:
Week 1: decide and cut
Week 2: build the smallest version
Week 3: tell people it is coming
Week 4: open and follow up

Give me a table with these columns:
Date | Day | Week | Task | Time needed | Done (leave empty)

Rules:
- Use real calendar dates, counted from today's date to the launch date.
- Every task fits in the time I have that day.
- Every task is one clear action, such as "write the sales page headline", never "work on marketing".
- Leave one free day each week to catch up.
- Write [CHECK] where you need details I haven't given. Don't add tasks for things that aren't in version 1.` },
      { kind: "list", ordered: true, items: [
        "Read every row. Move or delete anything that does not fit your real week.",
        "Copy the table from ChatGPT. Paste it into your Launch checklist, or into Google Sheets or Excel. Tables usually paste into columns.",
        "Does it paste as one long block of text? Ask ChatGPT: \"Give me this table as CSV\" (plain text that spreadsheets can open). Save it as a .csv file. Open it in your spreadsheet.",
      ] },
      { kind: "tip", text: "**The plan doesn't fit?** Reply: \"This is too much for the time I have. Cut tasks from version 1 to make it fit, and show me what you cut.\" Keep the date." },
    ] },
    { num: "04", title: "Run the Friday check", accent: "On track, at risk or cut.", blocks: [
      { kind: "p", text: "Sometimes a week goes badly. Then cut something from version 1 and keep the date. This check, every Friday, tells you what to cut." },
      { kind: "list", ordered: true, items: [
        "Put a 15-minute reminder in your calendar. Set it for every Friday until launch day.",
        "Tick what is done in your Launch checklist.",
        "Paste the prompt below into the same chat as your plan. Then ChatGPT can see the plan.",
      ] },
      { kind: "prompt", label: "Friday check", text: `It's Friday, week [1, 2, 3 or 4] of my launch. The launch date stays [date].

Planned this week: [paste the rows]
Done: [what I finished]
Not done: [what I didn't finish, and why]

Give me:
1. A status: on track, at risk, or cut needed
2. If at risk or cut needed: what to cut or simplify in version 1 to keep the date, with one line on why
3. Next week's checklist rows, updated, in the same table format

Don't move the launch date. Don't add new tasks unless I ask. Use only what I tell you.` },
      { kind: "p", text: "*An example:* you planned 3 recorded sessions. You finished 2 and got stuck on editing. A good answer keeps the date. It says: record the third as a simple video with no editing. The editing goes on the version 2 list." },
      { kind: "p", text: "Put the new rows for next week into your checklist. Delete the old ones." },
    ] },
    { num: "05", title: "Plan launch week", accent: "Emails and posts, ready early.", blocks: [
      { kind: "p", text: "In week 4, people hear that sales are open. Plan every email and post now. Then in launch week you can spend your time answering clients." },
      { kind: "prompt", label: "Plan my launch week", text: `Plan my launch week emails and posts.

Launch date: [date]
The offer: [what it is, who it's for, the price]
Where I post: [for example, LinkedIn, Instagram, my email list]
Proof I can use: [real testimonials or results, with permission]

Give me a table with these columns:
Date | Channel (email or post) | Purpose (doors open, answer a question, show proof, last call) | One-line idea | Link to include

Rules:
- Include at least: a doors-open email, an email answering the question clients ask most, a proof email using real client words, and a last-call email.
- Base every idea on what I give you. Never invent results, testimonials, deadlines or bonuses.
- Write [CHECK] where you need details I haven't given.` },
      { kind: "list", ordered: true, items: [
        "Add the rows to your Launch checklist, on their dates.",
        "Write each email with the [sales email guide](/guides/marketing-emails-that-sell/). Write to one reader. Use a subject line that says what is inside. Use real proof.",
        "On launch day and the days after, answer every question within one working day.",
        "After launch, save your version 2 list. It is the start of your next launch.",
      ] },
      { kind: "honest", text: "**The honest part:** ChatGPT can plan the launch. It can't make the product or find your first clients. The plan works when the date is real and you do the daily time. If you miss a week, cut something from version 1. Keep the date." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Launch date at the top of your Launch checklist",
        "Version 1 and version 2 lists saved",
        "Day-by-day checklist with dates saved",
        "Friday reminder in your calendar until launch",
        "Launch week emails and posts on their dates",
        "Launched, and every question answered",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your launch has a date.",
    accent: "Now let ChatGPT check in for you.",
    body: "The scheduled tasks guide shows you how to set up check-ins. ChatGPT runs them on a timetable. Your Monday plan arrives without you asking.",
    label: "Set up your check-ins →",
    href: "/guides/chatgpt-scheduled-tasks/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Keep the date. Run the Friday check every week. Put every new idea on the version 2 list, not into this launch.",
    finishLine: "A fixed date, a smaller version, and a check every Friday.",
  },
};
