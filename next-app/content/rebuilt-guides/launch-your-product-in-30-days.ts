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
    heading: "Stop polishing. Pick a date and launch.",
    lead: "Here is the problem. A client asks, \"When can I buy your new package?\" You say \"soon\", because it keeps getting bigger. Every week you add one more extra, so it never feels ready. ChatGPT (OpenAI's AI assistant) can plan the launch for you. You pick the date and make the product small. It works back from launch day and puts a date on every task.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A launch date that does not move**, written at the top of your plan",
        "**A short list of what goes in the first version**, and a list of what waits for later",
        "**A plan with a date on every task**, sized to the time you really have each day",
        "**A 15-minute check every Friday** that tells you what to cut if a week goes badly",
        "**Your launch week emails and posts planned early**, so launch week is for answering clients",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer with a web browser, like Chrome.",
        "A ChatGPT account. The free plan works for every step.",
        "Google Sheets, Excel or any spreadsheet app. Google Sheets is free at [sheets.google.com](https://sheets.google.com).",
        "A calendar you check every day, like Google Calendar or the calendar on your phone.",
        "One real product or offer you want to launch, like a new package, a workshop or a digital product.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
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
    { num: "01", title: "Set the date", accent: "And see what each week is for.", blocks: [
      { kind: "p", text: "The date stays the same. What goes into the first version can change. In this step you fix the date and write down how much time you really have. No AI yet." },
      { kind: "h3", text: "A. Make your launch sheet" },
      { kind: "list", ordered: true, items: [
        "Open [sheets.google.com](https://sheets.google.com) in your browser. Or open Excel.",
        "Click **Blank spreadsheet** (on some screens a big **+**). A new empty sheet opens.",
        "Click **Untitled spreadsheet** at the top left. Type **Launch checklist** and press Enter.",
      ] },
      { kind: "h3", text: "B. Pick the date" },
      { kind: "list", ordered: true, items: [
        "Open your calendar. Count about 30 days forward from today.",
        "Pick a day near there when you will be at your desk all day. Then you can answer questions as they come in.",
        "Avoid holidays and days you already have client work booked all day.",
        "Go back to your sheet. Click the first box at the top left (it is called A1).",
        "Type **Launch date:** and the date, for example **Launch date: Tuesday 17 November**. Press Enter.",
      ] },
      { kind: "h3", text: "C. Write down your real time" },
      { kind: "list", ordered: true, items: [
        "Click the box under it (A2). Type how much time you can give the launch each day. Be honest. For example **45 minutes a day**.",
        "Click the box under that (A3). Type the days you can't work on it. For example **Saturdays, Sundays, 5 November**.",
        "Click the box under that (A4). Type what you are launching, in one line.",
      ] },
      { kind: "example", label: "What your sheet looks like", text: "Launch date: Tuesday 17 November. 45 minutes a day. Not on Saturdays, Sundays or 5 November. Launching: [your offer, in one line]." },
      { kind: "h3", text: "D. Learn the 4 weeks" },
      { kind: "p", text: "Every launch in this guide uses the same 4 weeks. Copy this table into your sheet, under your notes. ChatGPT uses it in step 03." },
      { kind: "table", head: ["Week", "What it is for", "Done means"], rows: [
        ["Week 1", "Decide and cut", "Date set, version 1 list agreed, the rest on a later list"],
        ["Week 2", "Build the smallest version", "Version 1 made and tested by you"],
        ["Week 3", "Tell people it is coming", "Sales page, payment link and launch emails ready. Your followers know it is coming."],
        ["Week 4", "Open and follow up", "Sales open, launch emails sent, every question answered"],
      ] },
      { kind: "tip", text: "**Not sure people want it yet?** First run the one-week test in the [idea test guide](/guides/test-business-idea-with-ai/). Then come back with your date." },
    ] },
    { num: "02", title: "Cut it to the smallest version", accent: "What's in, what waits.", blocks: [
      { kind: "p", text: "Products don't launch because they keep growing. So you need two lists: what goes in version 1, and what waits for version 2. ChatGPT asks you questions, then makes both lists." },
      { kind: "contrast", items: [
        { label: "The full idea (example)", text: "A 12-session coaching package with worksheets, recordings, a certificate and bonus calls", good: false },
        { label: "A smaller version 1 (example)", text: "4 sessions that get one clear result, with one worksheet. The rest waits for version 2.", good: true },
      ] },
      { kind: "h3", text: "A. Start the chat" },
      { kind: "list", ordered: true, items: [
        "Open [chatgpt.com](https://chatgpt.com) in a new browser tab. Sign in with **Log in** at the top right if you need to.",
        "Click **New chat** at the top left. On some screens it is a pencil icon. A new empty chat opens.",
        "Use this same chat for steps 02 to 05. Then ChatGPT remembers your lists and your plan.",
        "Can't find **New chat**? OpenAI moves these menus. Search \"start a new chat\" on [OpenAI's help pages](https://help.openai.com).",
      ] },
      { kind: "h3", text: "B. Paste the prompt" },
      { kind: "list", ordered: true, items: [
        "Copy the prompt below. Click in the chat box at the bottom and paste it.",
        "Change the 3 parts in [square brackets]: everything you imagine, who it is for, and the one result it gets them.",
        "Press Enter. ChatGPT asks you the first question.",
        "Answer each question in one or two sentences. Press Enter after each one.",
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
      { kind: "result", label: "What a good answer looks like", lines: [
        "**In version 1:** 4 sessions, one worksheet, a booking link.",
        "**Waits for version 2:** recordings (clients get the result without them), certificate (nice, but nobody pays for it), bonus calls (add them when you know what clients ask).",
      ] },
      { kind: "h3", text: "C. Check it and save it" },
      { kind: "list", ordered: true, items: [
        "Read version 1. Ask yourself: would a first client still get the result with only this? If not, move one item back in.",
        "Check ChatGPT did not add anything you never mentioned. Delete it if it did.",
        "Copy both lists into your Launch checklist sheet, under the 4-week table.",
        "During the month, you will want to add things. Put every new idea on the version 2 list. Not into this launch.",
      ] },
    ] },
    { num: "03", title: "Plan backwards from launch day", accent: "A date on every task.", blocks: [
      { kind: "p", text: "Start from launch day. Then you can see what must be done by when. ChatGPT turns your version 1 list into a table with a date and a time on every task." },
      { kind: "h3", text: "A. Get the plan" },
      { kind: "list", ordered: true, items: [
        "Stay in the same chat as step 02.",
        "Copy the prompt below and paste it in the chat box.",
        "Fill in the [square brackets] from the top of your Launch checklist sheet. Write today's date too.",
        "Press Enter. ChatGPT writes a table.",
      ] },
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
      { kind: "result", label: "What a good answer looks like", lines: [
        "Mon 19 Oct | Monday | Week 1 | Write the version 1 list in one sentence each | 30 min |",
        "Tue 20 Oct | Tuesday | Week 1 | Write the one result clients get, in one line | 20 min |",
        "Wed 21 Oct | Wednesday | Week 1 | Free day to catch up | 0 min |",
      ] },
      { kind: "h3", text: "B. Check the dates yourself" },
      { kind: "p", text: "ChatGPT can get a weekday or a date wrong. One wrong date can break the plan. This check takes 5 minutes." },
      { kind: "list", ordered: true, items: [
        "Open your calendar next to ChatGPT.",
        "Take the first row. Find that date in your calendar. Is it really that day of the week?",
        "Do the same for the last row. It must be your launch date.",
        "Look for any task on a day you said you can't work.",
        "Add up the times for one busy day. Is it more than your daily time? Then it is too much.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["A date with the wrong weekday", "ChatGPT counted the calendar wrong", "Reply: \"Row [date] is a [real weekday]. Check every date against a real calendar and fix the table.\""],
        ["A task on a day you can't work", "It missed your days off", "Reply: \"I can't work on [day]. Move those tasks.\""],
        ["A day with more time than you have", "The plan is too big", "Reply: \"This is too much for the time I have. Cut tasks from version 1 to make it fit, and show me what you cut.\""],
        ["A task like \"work on marketing\"", "It is too vague to do", "Reply: \"Split [task] into one clear action per day.\""],
        ["A task for something not in version 1", "It added extras", "Delete the row. Put the idea on the version 2 list."],
      ] },
      { kind: "h3", text: "C. Put it in your sheet" },
      { kind: "list", ordered: true, items: [
        "Select the whole table in ChatGPT with your mouse. Press **Ctrl + C** (or **Cmd + C**) to copy.",
        "Go to your Launch checklist sheet. Click an empty box below your lists. Press **Ctrl + V** (or **Cmd + V**).",
        "Tables usually paste into columns. Does it paste as one long block of text? Go back to ChatGPT and type: \"Give me this table as CSV\" (plain text that spreadsheets can open).",
        "Copy the CSV. In Google Sheets, paste it, then click **Data** at the top and **Split text to columns**.",
        "Can't find **Split text to columns**? Search it on [Google's Sheets help pages](https://support.google.com/docs).",
      ] },
    ] },
    { num: "04", title: "Run the Friday check", accent: "On track, at risk or cut.", blocks: [
      { kind: "p", text: "Sometimes a week goes badly. Then you cut something from version 1 and keep the date. This check, every Friday, tells you what to cut." },
      { kind: "h3", text: "A. Set a Friday reminder" },
      { kind: "list", ordered: true, items: [
        "Open [calendar.google.com](https://calendar.google.com). Or open the calendar you use every day.",
        "Click **Create** at the top left. Click **Event**. A box opens.",
        "Type the title **Friday launch check**. Pick this Friday and a 15-minute time slot.",
        "Click **Does not repeat** under the date. Pick **Weekly on Friday**.",
        "Click **Save**. The check now shows up every Friday.",
        "After launch day, delete the event so it stops.",
        "Can't find these menus? Google moves them. Search \"repeating event\" on [Google's Calendar help pages](https://support.google.com/calendar).",
      ] },
      { kind: "h3", text: "B. Do the check each Friday" },
      { kind: "list", ordered: true, items: [
        "Open your Launch checklist sheet. Type **yes** in the Done column for every task you finished.",
        "Copy this week's rows from the sheet.",
        "Open ChatGPT. Go back to the same chat as your plan. Find it in the list of chats on the left side.",
        "Copy the prompt below and paste it in the chat box. Fill in the [square brackets]. Press Enter.",
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
      { kind: "example", label: "What you type in Not done", text: "Planned 3 recorded sessions. Finished 2. Got stuck on editing the third." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "**Status:** at risk.",
        "**Cut:** record session 3 as a simple video with no editing. Editing goes on the version 2 list.",
        "**Next week:** the updated rows, with the same launch date.",
      ] },
      { kind: "list", ordered: true, items: [
        "Check the answer kept your launch date. If it moved it, reply: \"Keep the date. Cut instead.\"",
        "Delete next week's old rows in your sheet. Paste in the new ones.",
        "Add anything that was cut to your version 2 list.",
      ] },
    ] },
    { num: "05", title: "Plan launch week", accent: "Emails and posts, ready early.", blocks: [
      { kind: "p", text: "In week 4, people hear that sales are open. Plan every email and post now, in week 3. Then in launch week you can spend your time answering clients." },
      { kind: "h3", text: "A. Get the list" },
      { kind: "list", ordered: true, items: [
        "Stay in the same ChatGPT chat as your plan.",
        "Copy the prompt below and paste it in the chat box.",
        "Fill in the [square brackets]. Only add proof clients said yes to.",
        "Press Enter.",
      ] },
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
      { kind: "result", label: "What a good answer looks like", lines: [
        "[launch date] | Email | Doors open | [offer] is open today, for [type of client] | [sales page link]",
        "[launch date + 2] | Post | Answer a question | The question clients ask most: [CHECK] | [sales page link]",
      ] },
      { kind: "h3", text: "B. Check it and use it" },
      { kind: "list", ordered: true, items: [
        "Read every row. Delete any deadline, bonus or result you never gave it.",
        "Fill in every [CHECK] yourself.",
        "Copy the rows into your Launch checklist sheet, on their dates.",
        "Write each email with the [sales email guide](/guides/marketing-emails-that-sell/). Write to one reader. Use a subject line that says what is inside. Use real proof.",
        "On launch day and the days after, answer every question within one working day.",
        "After launch, keep your version 2 list. It is the start of your next launch.",
      ] },
      { kind: "honest", text: "**The honest part:** ChatGPT can plan the launch. It can't make the product or find your first clients. It can get dates wrong, so you check them. The plan works when the date is real and you do the daily time. If you miss a week, cut something from version 1. Keep the date." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Launch date, daily time and days off at the top of your Launch checklist sheet",
        "Version 1 and version 2 lists saved in the sheet",
        "Dated plan pasted into the sheet, with the first and last dates checked in your calendar",
        "No day in the plan longer than your real daily time",
        "Friday launch check repeating in your calendar until launch day",
        "Launch week emails and posts on their dates, with every [CHECK] filled in",
        "Launched on the date, and every question answered within one working day",
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
