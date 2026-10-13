import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "launch-your-product-in-30-days",
  lumailTag: "guide-launch-your-product-in-30-days",
  title: "How to Launch My Product in 30 Days",
  cover: "/images/guides/launch-your-product-in-30-days.webp",
  coverAlt: "The blue robot mascot watching a conveyor carry parcels from moon to sun",
  seoDescription: "Launch your product in 30 days: cut it to the smallest version, plan backwards from a fixed date with ChatGPT, and get a dated day-by-day checklist.",
  tool: "ChatGPT",
  minutes: 45,
  h1: { title: "How to Launch My Product", accent: "in 30 Days" },
  hero: {
    kind: "scene",
    src: "/images/guides/launch-your-product-in-30-days.webp",
    alt: "The blue robot mascot watching a conveyor carry parcels from moon to sun",
    line: "A day-by-day checklist, with AI doing the planning. You fix the date, and you do the making.",
  },
  intro: {
    heading: "Your dated 30-day launch checklist",
    lead: "Many products never launch because they keep growing. This guide fixes the date first, cuts the product to its smallest useful version, and uses ChatGPT to plan backwards from launch day into a checklist with a date on every task. A short check every Friday keeps it moving.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **launch date** that stays put",
        "A **smallest version** list: what's in version 1 and what waits",
        "Your **dated 30-day launch checklist**: every task with a day and the time it takes",
        "A **Friday check** to run each week: on track, at risk or cut",
        "A **launch week list** of the emails and posts to send",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "30-Day Launch Checklist.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Set the date", accent: "And see the 4 weeks.", blocks: [
      { kind: "p", text: "The date stays fixed. What goes into the first version can change. This skeleton shows what each of the four weeks is for." },
      { kind: "table", head: ["Week", "Focus", "Done means"], rows: [
        ["Week 1", "Decide and cut", "Launch date fixed, version 1 list agreed, everything else on a later list"],
        ["Week 2", "Build the smallest version", "Version 1 made and tested by you"],
        ["Week 3", "Warm up the audience", "Sales page, payment link and launch emails ready; your audience knows it's coming"],
        ["Week 4", "Open and follow up", "Doors open, launch emails sent, every enquiry answered"],
      ] },
      { kind: "list", ordered: true, items: [
        "Open a new document or spreadsheet called **Launch checklist**.",
        "Pick a launch date about 30 days from today and write it at the top. Choose a day you'll be at your desk, so you can answer questions as they come in.",
        "Write down how much time you have for the launch each day, for example 45 minutes or 2 hours, and any days you can't work.",
        "Copy the table above into the document.",
      ] },
      { kind: "tip", text: "**Not sure people want it yet?** Run the one-week test in the [idea test guide](/guides/test-business-idea-with-ai/) first, then come back with your date." },
    ] },
    { num: "02", title: "Cut to the smallest version", accent: "What's in, what waits.", blocks: [
      { kind: "p", text: "A \"waits for version 2\" list is the quickest way to stop polishing. This prompt helps you find the smallest thing a first client would pay for." },
      { kind: "table", head: ["The full idea (example)", "A smaller version 1 (example)"], rows: [
        ["A 12-session coaching package with worksheets, recordings, a certificate and bonus calls", "4 sessions that get one clear result, with one worksheet. The rest waits for version 2."],
      ] },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and start a new chat. You'll use this same chat for steps 02 to 05.",
        "Paste the prompt below and answer its questions.",
      ] },
      { kind: "prompt", label: "Find my smallest version", text: `Here's my product idea in full: [describe everything you imagine it including].
Who it's for: [type of client]
The one result it should get them: [result]

Help me define version 1: the smallest thing a first client would pay for that still gets them that result.

Ask me up to 5 questions, one at a time, and wait for each answer before you suggest anything.

Then give me two lists:
1. In version 1
2. Waits for version 2, with one line on why each item can wait

Use only what I tell you. Don't add features I didn't mention. Write [CHECK] where you need information I haven't given.` },
      { kind: "p", text: "Save both lists in your Launch checklist. When you're tempted to add something during the month, it goes on the version 2 list." },
    ] },
    { num: "03", title: "Plan backwards", accent: "A date on every task.", blocks: [
      { kind: "p", text: "Starting from launch day shows what must be done by when. This prompt turns your four weeks into a checklist with a date on each task." },
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
Week 3: warm up the audience
Week 4: open and follow up

Give me a table with these columns:
Date | Day | Week | Task | Time needed | Done (leave empty)

Rules:
- Use real calendar dates, counted from today's date to the launch date.
- Every task fits in the time I have that day.
- Every task is one clear action, such as "write the sales page headline", never "work on marketing".
- Leave one free day each week to catch up.
- Write [CHECK] where you need information I haven't given. Don't add tasks for things that aren't in version 1.` },
      { kind: "list", ordered: true, items: [
        "Read every row. Move or delete anything that doesn't fit your real week.",
        "Copy the table from ChatGPT and paste it into your Launch checklist, or into Google Sheets or Excel. Tables usually paste straight into columns.",
        "If it pastes as one long block of text, ask ChatGPT: \"Give me this table as CSV\" (plain text that spreadsheets can open), save it as a .csv file and open it in your spreadsheet.",
      ] },
      { kind: "tip", text: "**The plan doesn't fit?** Reply: \"This is too much for the time I have. Cut tasks from version 1 to make it fit, and show me what you cut.\" Keep the date." },
    ] },
    { num: "04", title: "Run the Friday check", accent: "On track, at risk or cut.", blocks: [
      { kind: "p", text: "When a week slips, cut something from version 1 and keep the date. This check, every Friday, tells you what to cut." },
      { kind: "list", ordered: true, items: [
        "Put a 15-minute reminder in your calendar every Friday until launch day.",
        "Tick what's done in your Launch checklist.",
        "Paste the prompt below into the same chat as your plan, so ChatGPT can see it.",
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
      { kind: "p", text: "*An example:* planned 3 recorded sessions, finished 2, stuck on editing. A useful answer keeps the date, records the third as a simple unedited video, and moves the polish to the version 2 list." },
      { kind: "p", text: "Replace next week's rows in your checklist with the updated ones." },
    ] },
    { num: "05", title: "Plan launch week", accent: "Emails and posts, ready early.", blocks: [
      { kind: "p", text: "Week 4 is when people hear that it's open. Plan every email and post now, so launch week is for answering clients." },
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
- Write [CHECK] where you need information I haven't given.` },
      { kind: "list", ordered: true, items: [
        "Add the rows to your Launch checklist, on their dates.",
        "Write each email with the [sales email guide](/guides/marketing-emails-that-sell/): one reader, a subject line that says what's inside, and real proof.",
        "On launch day and the days after, answer every enquiry within one working day.",
        "After launch, save your version 2 list. It's the start of your next launch.",
      ] },
      { kind: "honest", text: "**The honest part:** ChatGPT can plan the launch, but it can't make the product or find your first clients. The plan works when the date is real and the daily time happens. If you miss a week, cut something from version 1 and keep the date." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Launch date written at the top of your Launch checklist",
        "Version 1 and version 2 lists saved",
        "Dated day-by-day checklist saved",
        "Friday reminder in your calendar until launch",
        "Launch week emails and posts on their dates",
        "Launched, and every enquiry answered",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your launch has a date.",
    accent: "Now let ChatGPT check in for you.",
    body: "The scheduled tasks guide sets up check-ins that ChatGPT runs on a schedule, so a Monday plan arrives without you having to remember to ask.",
    label: "Set up your check-ins →",
    href: "/guides/chatgpt-scheduled-tasks/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Keep the date, run the Friday check every week, and put every new idea on the version 2 list instead of into this launch.",
    finishLine: "A fixed date, a smaller version, and a check every Friday.",
  },
};
