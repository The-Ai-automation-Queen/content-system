import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "test-meta-muse-money-saving-task",
  lumailTag: "guide-test-meta-muse-money-saving-task",
  title: "How to Find and Cancel Business Subscriptions I Don't Use",
  cover: "/images/guides/test-meta-muse-money-saving-task.webp",
  coverAlt: "The blue robot mascot holding the final lever while a machine compares three price tags",
  seoDescription: "Find and cancel business subscriptions you don't use: AI finds the repeat payments, adds up the cost for a year and writes the message. 4 steps.",
  tool: "Any AI assistant (ChatGPT, Claude, Gemini or Meta AI)",
  minutes: 30,
  h1: { title: "How to Find and Cancel Business Subscriptions", accent: "I Don't Use" },
  hero: {
    kind: "scene",
    src: "/images/guides/test-meta-muse-money-saving-task.webp",
    alt: "The blue robot mascot holding the final lever while a machine compares three price tags",
    line: "AI finds the repeat payments. You decide what goes.",
  },
  intro: {
    heading: "Every subscription in one table",
    lead: "Forgotten apps keep charging your business card. This guide finds every repeat payment and its cost for a year. It takes 30 minutes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A clean copy** of your payments, private details out",
        "**A subscriptions table** of every repeat payment",
        "**The cost for a year** of each tool renewing soon",
        "**A cancel message** ready to send",
      ] },
      { kind: "tip", text: "You need your business bank or card account, a spreadsheet app and any AI assistant. The free plans work. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "subscriptions table.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Download and clean payments", accent: "Nothing goes to AI yet.", blocks: [
      { kind: "p", text: "The AI assistant needs your payments, never your private details. Clean them first." },
      { kind: "list", ordered: true, items: [
        "Log in to your bank **in your browser**, never in the AI chat.",
        "Open **Transactions** and click **Export** or **Download**.",
        "Choose **CSV** (a simple spreadsheet file) and the last 12 months.",
        "Open it in your spreadsheet app. Keep only **date**, **payee** (who you paid) and **amount**.",
        "Delete personal payments, card numbers, reference numbers and client names.",
        "Save it as **payments-clean.csv**.",
      ] },
      { kind: "tip", text: "No AI tool needs your bank login for this. If one asks, close it. Can't find the export? Search \"export transactions CSV\" on your bank's help pages." },
    ] },
    { num: "02", title: "Find repeat payments", accent: "Your subscriptions table.", blocks: [
      { kind: "p", text: "A long list of payments becomes one short table." },
      { kind: "list", ordered: true, items: [
        "Open your AI assistant and click **New chat**.",
        "Paste the prompt below.",
        "Add **payments-clean.csv** with the paperclip or **+**. No upload? Paste the rows instead.",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Find my repeat payments", text: `Here are my business payments from the last [12] months (date, payee, amount). Private details are removed.

Find every payment that looks like a subscription.

Table: Tool or payee | Amount as shown | How often | Last payment date | Last used

- Use only what is in my payments. Copy each amount exactly.
- Leave "Last used" blank for me.
- If you are not sure a payment repeats, write [CHECK].
- Never guess what a company is.

Payments:
[paste]` },
      { kind: "list", ordered: true, items: [
        "Pick 2 rows. Find them in your file with **Ctrl + F** (or **Cmd + F**). Do the amounts match?",
        "Paste the table into a spreadsheet called **Subscriptions table**.",
        "Fill in **Last used** for each tool.",
      ] },
    ] },
    { num: "03", title: "Add up the yearly cost", accent: "For anything renewing soon.", blocks: [
      { kind: "p", text: "Starter deals and monthly prices hide the real number. Add up 12 months." },
      { kind: "list", ordered: true, items: [
        "Open the renewal email, or the tool's **Billing** page.",
        "Copy the words about price, fees and dates. Take out your account number.",
        "Paste them into the prompt below.",
      ] },
      { kind: "prompt", label: "Add up the cost for a year", text: `Work out what this subscription will cost my business over the next 12 months, with every fee.

Show the sum step by step, so I can check it.
Then list up to 5 questions to ask before it renews.

Use only the text I paste. If a number is missing, write [CHECK].

Renewal wording:
[paste]` },
      { kind: "p", text: "Check the sum with a calculator. Add it to your table as **Cost for a year**." },
      { kind: "honest", text: "**The honest part:** AI can misread a payee and add up wrong. Check every sum. Check every price on the company's own page. You make every choice." },
    ] },
    { num: "04", title: "Keep, downgrade or cancel", accent: "Your choice, not the AI's.", blocks: [
      { kind: "p", text: "Give each tool one choice. Then send the message you've put off." },
      { kind: "table", head: ["Choice", "When it fits"], rows: [
        ["Keep", "You used it this month and it's worth it"],
        ["Downgrade", "You use it, but not every part or user"],
        ["Cancel", "Not used in a month or two, or another tool does the job"],
      ] },
      { kind: "list", ordered: true, items: [
        "Before you cancel, download any client files or invoices from the tool.",
        "Try the tool's **Billing** page first. Look for **Cancel plan** or **Change plan**.",
        "No button? Paste the prompt below.",
      ] },
      { kind: "prompt", label: "Write my cancel message", text: `Write a short email to [company] asking them to [cancel my plan / move me to a cheaper plan / lower my price].

My facts:
- Account email: [email]
- Plan: [plan name, as on my invoice]
- [any other true fact]

Polite and firm, under 100 words, one clear ask.
Ask for written confirmation by [date].
Use only my facts. If something is missing, write [CHECK].
Never make up names, prices, dates or promises.` },
      { kind: "list", ordered: true, items: [
        "Fill every **[CHECK]**, then send it yourself. Save the reply.",
        "Next month, check the payment is gone.",
        "For each tool you keep, add a calendar reminder 2 weeks before it renews.",
      ] },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Payments cleaned: date, payee and amount only",
        "Subscriptions table saved and 2 rows checked",
        "Cost for a year checked with a calculator",
        "One tool cancelled or downgraded",
        "Renewal reminders in your calendar",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know what you pay for.",
    accent: "Now see if you need an AI agent.",
    body: "Everyone is selling agents. The next guide shows which kind of AI a task really needs.",
    label: "Decide if you need an agent →",
    href: "/guides/what-is-agentic/",
  },
  conclusion: {
    heading: "Keep costs low",
    paragraph: "Check your subscriptions every 3 months. Add each new tool to your table the day you sign up.",
    finishLine: "AI finds the payments. You decide what stays.",
  },
};
