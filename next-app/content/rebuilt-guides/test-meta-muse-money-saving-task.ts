import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "test-meta-muse-money-saving-task",
  lumailTag: "guide-test-meta-muse-money-saving-task",
  title: "How to Find and Cancel Business Subscriptions I Don't Use",
  cover: "/images/guides/test-meta-muse-money-saving-task.webp",
  coverAlt: "The blue robot mascot holding the final lever while a machine compares three price tags",
  seoDescription: "Find and cancel business subscriptions you don't use: AI spots the repeat payments, works out the yearly cost and drafts the message. You decide.",
  tool: "Any AI chat (ChatGPT, Claude, Gemini or Meta AI)",
  minutes: 30,
  h1: { title: "How to Find and Cancel Business Subscriptions", accent: "I Don't Use" },
  hero: {
    kind: "scene",
    src: "/images/guides/test-meta-muse-money-saving-task.webp",
    alt: "The blue robot mascot holding the final lever while a machine compares three price tags",
    line: "AI finds the repeat payments; you decide what to cancel. Then it drafts the message you've been putting off.",
  },
  intro: {
    heading: "Every tool you pay for, in one table",
    lead: "Software, apps and memberships add up quietly on a business card. Spotting the same payment every month across three months of transactions is slow for you and quick for AI. This guide finds every repeat payment, shows what each one costs you over a year, and drafts the cancel or negotiate message. You make every decision.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A clean **transactions file** with card numbers and personal details removed",
        "**Your subscription audit table**: every repeat payment, how often it goes out and when you last used it",
        "The **real yearly cost** of each renewal coming up",
        "A **keep, downgrade or cancel** decision for every tool",
        "Ready-to-send **cancel or negotiate messages**, and a reminder before each renewal",
      ] },
      { kind: "tip", text: "You need any AI chat: ChatGPT, Claude, Gemini or Meta AI. The free plans work. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get",
    accent: "your subscription audit table.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Export and clean your transactions", accent: "Before anything goes in.", blocks: [
      { kind: "p", text: "The AI can only find what you give it. Three months of business transactions is enough to catch monthly payments; twelve months also catches yearly ones." },
      { kind: "list", ordered: true, items: [
        "Log in to your business bank or card account **in your browser**, not in the AI chat.",
        "Find the transactions or statements page and look for **Export** or **Download**. Choose **CSV** (a simple spreadsheet file) and the last 3 months.",
        "If you can't find an export option, search your bank's help pages for \"export transactions CSV\". Most banks offer it; a few only give PDFs, which also work.",
        "Open the file in Excel, Google Sheets or Numbers.",
        "Delete every column except **date**, **payee** (who was paid) and **amount**.",
        "Delete any personal payments that slipped onto the business card.",
        "Save it as a new file, for example **transactions-clean.csv**.",
      ] },
      { kind: "table", head: ["Never paste", "Remove first", "Fine to paste"], rows: [
        ["Login details, passwords or security answers", "Card and account numbers", "Date, payee and amount"],
        ["Screenshots of your banking app", "Your address and reference numbers", "The name of each tool you pay for"],
        ["Full statements with your details on them", "Client names in payment references", "Your own notes on what each tool is for"],
      ] },
      { kind: "tip", text: "**No AI tool needs your bank login to do this.** If any app or chat asks for it, stop and close it." },
    ] },
    { num: "02", title: "Find the repeat payments", accent: "Your audit table.", blocks: [
      { kind: "p", text: "This step turns a long list of transactions into one table of everything you pay for again and again." },
      { kind: "list", ordered: true, items: [
        "Start a new chat in your AI tool.",
        "Paste the prompt below, then paste the contents of your clean file where it says [paste]. In most chats you can also attach the file with the paperclip or **+** button.",
      ] },
      { kind: "prompt", label: "Find my repeat payments", text: `Here are my business transactions from the last [3] months (date, payee, amount). I have removed card numbers and personal details.

Find every payment that looks like a subscription or repeat payment.

Give me a table with these columns:
Tool or payee | Amount as shown | How often (monthly, yearly, other) | Last payment date | Last used | Keep, cancel or check

Rules:
- Use only what is in my transactions. Copy each amount exactly as shown.
- Leave "Last used" blank for me to fill in.
- If you are not sure a payment repeats, write [CHECK] in the last column.
- If you don't recognise a payee, write the name exactly as shown and [CHECK]. Never guess what a company is.
- Put one-off payments in a short separate list under the table.

Transactions:
[paste]` },
      { kind: "list", ordered: true, items: [
        "Copy the table into a spreadsheet. This is **your subscription audit table**.",
        "Fill in **Last used** for each row from memory, or by logging in to the tool.",
        "Look up every [CHECK] row yourself. Search your email for the payee name to find the receipt.",
      ] },
      { kind: "tip", text: "**The table looks short?** Paste 12 months instead of 3. Yearly renewals only show up once a year." },
    ] },
    { num: "03", title: "Work out the real yearly cost", accent: "For anything renewing soon.", blocks: [
      { kind: "p", text: "A renewal email often shows a monthly price, an intro deal or a per-seat price (a price for each user). Adding up twelve months shows the real number before you decide." },
      { kind: "p", text: "Copy the wording from the renewal email or the tool's billing page, then paste it with this prompt." },
      { kind: "prompt", label: "Work out the real yearly cost", text: `Work out what this subscription will cost my business over the next 12 months, including every fee mentioned.

Show the sum step by step, so I can check it.

Then list up to 5 questions I should ask before it renews, for example: what happens when an intro price ends, whether there is a cheaper plan, whether I pay for users I don't have, and whether there is a cancellation fee.

Use only what is in the text I paste. If a number is missing, write [CHECK] instead of guessing.

Renewal wording:
[paste the renewal email or billing page text]` },
      { kind: "list", ordered: true, items: [
        "Check the sum once with a calculator. AI can add up wrong.",
        "Add the yearly cost as a new column in your audit table.",
      ] },
    ] },
    { num: "04", title: "Decide: keep, downgrade or cancel", accent: "Your call, not the AI's.", blocks: [
      { kind: "p", text: "Go through your audit table one row at a time and give each tool one of three decisions." },
      { kind: "table", head: ["Decision", "When it fits", "What you do next"], rows: [
        ["Keep", "You used it this month and it earns its place", "Nothing. Set a renewal reminder (step 06)"],
        ["Downgrade", "You use it, but not every feature or every seat", "Move to a cheaper plan, or ask for a better price (step 05)"],
        ["Cancel", "You haven't used it in the last month or two, or another tool does the same job", "Export anything you need from it, then cancel (step 05)"],
      ] },
      { kind: "list", items: [
        "**Before you cancel,** download any client files, contacts or invoices stored in the tool.",
        "**Two tools doing one job** (two schedulers, two design apps)? Keep the one you open most.",
        "**Not sure?** Mark it Downgrade or check again in a month. You don't have to decide everything today.",
      ] },
      { kind: "tip", text: "Add a **Decision** column to your audit table and fill it in for every row." },
    ] },
    { num: "05", title: "Write the cancel or negotiate message", accent: "The one you've put off.", blocks: [
      { kind: "p", text: "Many tools let you cancel in the account settings in two clicks. Look there first. For the rest, or when you want a better price, AI drafts a short, firm, polite message." },
      { kind: "prompt", label: "Write my cancel or negotiate message", text: `Write a short email to [company] asking them to [cancel my plan / move me to a cheaper plan / lower my price].

My facts:
- Account name or email: [the email the account is under]
- Plan: [plan name, as shown on my invoice]
- [any other fact: how long I have been a customer, the price I have seen elsewhere, the date it renews]

Rules:
- Polite and firm, under 100 words, one clear ask.
- Ask for written confirmation, and a reply by [date].
- Use only my facts. Never invent a competitor price, a length of time or a reason I did not give you.
- Write [CHECK] where a fact is missing.

Draft only. I will read it and send it myself.` },
      { kind: "list", ordered: true, items: [
        "Fill in every [CHECK] mark and read the message once out loud.",
        "Send it from your own email, or paste it into the tool's support chat.",
        "Save the confirmation reply. Check your next statement to make sure the payment stopped.",
      ] },
    ] },
    { num: "06", title: "Set renewal reminders", accent: "So it doesn't creep back.", blocks: [
      { kind: "p", text: "Yearly renewals are the easiest to miss. One calendar reminder before each one gives you time to decide." },
      { kind: "list", ordered: true, items: [
        "For every tool you kept, find its next renewal date in your audit table or its billing page.",
        "In your calendar, add an event **2 weeks before** each date, called \"Renewal: [tool]\".",
        "In the event notes, write the yearly cost and one question: \"Did I use this last month?\"",
        "Put one more event in your calendar 3 months from today: \"Run the subscription audit again\".",
      ] },
      { kind: "honest", text: "**The honest part:** AI can misread a payee, add up wrong and can't see offers you haven't told it about. Check the sums once with a calculator, confirm any price on the company's own page, and make every keep or cancel decision yourself." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Transactions exported and cleaned: date, payee, amount only",
        "Subscription audit table saved in a spreadsheet",
        "Real yearly cost worked out for every renewal coming up",
        "Keep, downgrade or cancel decided for every row",
        "Cancel or negotiate messages sent and confirmations saved",
        "Renewal reminders in your calendar",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know what you pay for.",
    accent: "Now see if you need an AI agent.",
    body: "Everyone is selling agents right now. The next guide shows what an agent is, how it differs from a chat or an automation, and how to tell which one a task in your business needs.",
    label: "Decide if you need an agent →",
    href: "/guides/what-is-agentic/",
  },
  conclusion: {
    heading: "Keep it lean",
    paragraph: "Run the audit again every 3 months, check each renewal reminder when it comes up, and add every new tool to your audit table the day you sign up.",
    finishLine: "AI finds the payments. You decide what stays.",
  },
};
