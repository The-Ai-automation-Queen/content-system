import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "test-meta-muse-money-saving-task",
  lumailTag: "guide-test-meta-muse-money-saving-task",
  title: "How to Find and Cancel Business Subscriptions I Don't Use",
  cover: "/images/guides/test-meta-muse-money-saving-task.webp",
  coverAlt: "The blue robot mascot holding the final lever while a machine compares three price tags",
  seoDescription: "Find and cancel business subscriptions you don't use: AI finds the repeat payments, adds up the cost for a year and writes the message. You decide.",
  tool: "Any AI chat (ChatGPT, Claude, Gemini or Meta AI)",
  minutes: 30,
  h1: { title: "How to Find and Cancel Business Subscriptions", accent: "I Don't Use" },
  hero: {
    kind: "scene",
    src: "/images/guides/test-meta-muse-money-saving-task.webp",
    alt: "The blue robot mascot holding the final lever while a machine compares three price tags",
    line: "AI finds the repeat payments. You decide what to cancel. Then AI writes the message for you.",
  },
  intro: {
    heading: "Every tool you pay for, in one table",
    lead: "Apps and memberships on a business card add up without you noticing. Finding the same payment each month is slow for you. It is quick for AI. This guide finds each repeat payment and its cost for a year. AI writes the message. You make every choice.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A clean **payments file** with card numbers and personal details taken out",
        "**Your subscriptions table**: each repeat payment, how often, when you last used it",
        "The **real cost for a year** of each renewal coming up",
        "A **keep, downgrade or cancel** choice for every tool",
        "Ready **cancel or ask-for-less messages**, and a reminder before each renewal",
      ] },
      { kind: "tip", text: "You need any AI chat: ChatGPT, Claude, Gemini or Meta AI. The free plans work. Copy and paste each prompt below. Change the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get",
    accent: "your subscriptions table.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Download and clean your payments", accent: "Before anything goes in.", blocks: [
      { kind: "p", text: "The AI can only find what you give it. Three months of payments shows the monthly ones. Twelve months also shows the yearly ones." },
      { kind: "list", ordered: true, items: [
        "Log in to your business bank or card account **in your browser**. Not in the AI chat.",
        "Go to the transactions or statements page. Look for **Export** or **Download**. Choose **CSV** (a simple spreadsheet file) and the last 3 months.",
        "No export button? Search your bank's help pages for \"export transactions CSV\". Most banks have it. Some only give PDFs, and those work too.",
        "Open the file in Excel, Google Sheets or Numbers.",
        "Delete every column except **date**, **payee** (who you paid) and **amount**.",
        "Delete any personal payments on the business card.",
        "Save it as a new file, for example **transactions-clean.csv**.",
      ] },
      { kind: "table", head: ["Never paste", "Take out first", "Fine to paste"], rows: [
        ["Logins, passwords or security answers", "Card and account numbers", "Date, payee and amount"],
        ["Screenshots of your banking app", "Your address and reference numbers", "The name of each tool you pay for"],
        ["Full statements with your details", "Client names in payment notes", "Your own notes on what each tool is for"],
      ] },
      { kind: "tip", text: "**No AI tool needs your bank login for this.** If an app or chat asks for it, stop and close it." },
    ] },
    { num: "02", title: "Find the repeat payments", accent: "Your subscriptions table.", blocks: [
      { kind: "p", text: "This step turns a long list of payments into one short table. It shows everything you pay for again and again." },
      { kind: "list", ordered: true, items: [
        "Start a new chat in your AI tool.",
        "Paste the prompt below. Then paste your clean file where it says [paste]. In most chats you can also add the file with the paperclip or **+** button.",
      ] },
      { kind: "prompt", label: "Find my repeat payments", text: `Here are my business transactions from the last [3] months (date, payee, amount). I have removed card numbers and personal details.

Find every payment that looks like a subscription or repeat payment.

Give me a table with these columns:
Tool or payee | Amount as shown | How often (monthly, yearly, other) | Last payment date | Last used | Keep, cancel or check

Rules:
- Use only what is in my transactions. Copy each amount exactly as shown.
- Leave "Last used" blank for me to fill in.
- If you are not sure a payment repeats, write [CHECK] in the last column.
- If you don't know a payee, write the name exactly as shown and [CHECK]. Never guess what a company is.
- Put one-off payments in a short separate list under the table.

Transactions:
[paste]` },
      { kind: "list", ordered: true, items: [
        "Copy the table into a spreadsheet. This is **your subscriptions table**.",
        "Fill in **Last used** for each row. Use your memory, or log in to the tool.",
        "Look up every [CHECK] row yourself. Search your email for the payee name to find the receipt.",
      ] },
      { kind: "tip", text: "**The table looks short?** Paste 12 months, not 3. Yearly payments only show up once a year." },
    ] },
    { num: "03", title: "Add up the real cost for a year", accent: "For anything renewing soon.", blocks: [
      { kind: "p", text: "A renewal email often shows a monthly price or a starter deal. Or it shows a price per user. Adding up twelve months shows the real number." },
      { kind: "p", text: "Copy the words from the renewal email or the tool's billing page. Paste them with this prompt." },
      { kind: "prompt", label: "Add up the real cost for a year", text: `Work out what this subscription will cost my business over the next 12 months, including every fee mentioned.

Show the sum step by step, so I can check it.

Then list up to 5 questions I should ask before it renews, for example: what happens when a starter price ends, whether there is a cheaper plan, whether I pay for users I don't have, and whether there is a cancellation fee.

Use only what is in the text I paste. If a number is missing, write [CHECK] instead of guessing.

Renewal wording:
[paste the renewal email or billing page text]` },
      { kind: "list", ordered: true, items: [
        "Check the sum once with a calculator. AI can add up wrong.",
        "Add the cost for a year as a new column in your table.",
      ] },
    ] },
    { num: "04", title: "Decide: keep, downgrade or cancel", accent: "Your choice, not the AI's.", blocks: [
      { kind: "p", text: "Go through your table one row at a time. Give each tool one of three choices." },
      { kind: "table", head: ["Choice", "When it fits", "What you do next"], rows: [
        ["Keep", "You used it this month and it's worth it", "Nothing. Set a renewal reminder (step 06)"],
        ["Downgrade", "You use it, but not every tool or every user in it", "Move to a cheaper plan, or ask for a lower price (step 05)"],
        ["Cancel", "You haven't used it in a month or two, or another tool does the same job", "Save anything you need from it, then cancel (step 05)"],
      ] },
      { kind: "list", items: [
        "**Before you cancel,** download any client files, contacts or invoices in the tool.",
        "**Two tools doing one job** (like two design apps)? Keep the one you open most.",
        "**Not sure?** Mark it Downgrade, or check again in a month. You don't have to decide it all today.",
      ] },
      { kind: "tip", text: "Add a **Choice** column to your table. Fill it in for every row." },
    ] },
    { num: "05", title: "Write the cancel or ask-for-less message", accent: "The one you've put off.", blocks: [
      { kind: "p", text: "Many tools let you cancel in the account settings in two clicks. Look there first. For the rest, or to ask for a lower price, AI writes a short, polite, firm message." },
      { kind: "prompt", label: "Write my cancel or ask-for-less message", text: `Write a short email to [company] asking them to [cancel my plan / move me to a cheaper plan / lower my price].

My facts:
- Account name or email: [the email the account is under]
- Plan: [plan name, as shown on my invoice]
- [any other fact: how long I have been a customer, the price I have seen elsewhere, the date it renews]

Rules:
- Polite and firm, under 100 words, one clear ask.
- Ask for written confirmation, and a reply by [date].
- Use only my facts. Never make up a competitor price, a length of time or a reason I did not give you.
- Write [CHECK] where a fact is missing.

Draft only. I will read it and send it myself.` },
      { kind: "list", ordered: true, items: [
        "Fill in every [CHECK]. Read the message out loud once.",
        "Send it from your own email, or paste it into the tool's help chat.",
        "Save the reply that says it's done. Check your next statement to make sure the payment stopped.",
      ] },
    ] },
    { num: "06", title: "Set renewal reminders", accent: "So it doesn't come back.", blocks: [
      { kind: "p", text: "Yearly renewals are the easiest to miss. One calendar reminder before each one gives you time to decide." },
      { kind: "list", ordered: true, items: [
        "For each tool you kept, find the next renewal date. It's in your table or the billing page.",
        "In your calendar, add an event **2 weeks before** each date. Call it \"Renewal: [tool]\".",
        "In the event notes, write the cost for a year and one question: \"Did I use this last month?\"",
        "Add one more event 3 months from today: \"Check my subscriptions again\".",
      ] },
      { kind: "honest", text: "**The honest part:** AI can read a payee wrong and add up wrong. It can't see offers you haven't told it about. Check the sums with a calculator. Check any price on the company's own page. Make every keep or cancel choice yourself." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Payments downloaded and cleaned: date, payee, amount only",
        "Subscriptions table saved in a spreadsheet",
        "Real cost for a year added up for each renewal coming up",
        "Keep, downgrade or cancel chosen for every row",
        "Cancel or ask-for-less messages sent, replies saved",
        "Renewal reminders in your calendar",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know what you pay for.",
    accent: "Now see if you need an AI agent.",
    body: "Everyone is selling agents right now. The next guide shows what an agent is. It shows how an agent is different from a chat or an automation. And it helps you see which one a task needs.",
    label: "Decide if you need an agent →",
    href: "/guides/what-is-agentic/",
  },
  conclusion: {
    heading: "Keep costs low",
    paragraph: "Check your subscriptions again every 3 months. Look at each renewal reminder when it comes up. Add each new tool to your table the day you sign up.",
    finishLine: "AI finds the payments. You decide what stays.",
  },
};
