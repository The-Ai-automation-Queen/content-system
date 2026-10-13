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
    lead: "Here is the problem. You send a client an invoice, then see a charge on your card for an app you forgot. Apps and memberships on a business card add up without you noticing. Today you scroll your statement line by line, or you don't look at all. An AI chat can find every repeat payment in minutes and add up what each costs in a year. You get one table, you choose what stays, and AI writes the cancel message.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A safe copy of your payments**, with card numbers and personal details taken out",
        "**One table of everything you pay for again and again**, and when you last used it",
        "**The real cost for a year** of each tool that renews soon",
        "**A keep, downgrade or cancel choice** for every tool, made by you",
        "**Cancel messages ready to send**, and a calendar reminder before each renewal",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer. Cleaning a spreadsheet is much easier on a big screen.",
        "Your business bank or card account, opened in your browser.",
        "A spreadsheet app: Excel, Google Sheets or Numbers.",
        "Any AI chat: ChatGPT, Claude, Gemini or Meta AI. The free plans work. If you see a limit on file uploads, paste the rows as text instead.",
        "Your real payments from the last 3 months. 12 months is better, because it shows the yearly ones.",
      ] },
      { kind: "tip", text: "Every question below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
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
    { num: "01", title: "Download and clean your payments", accent: "15 minutes. Nothing goes to AI yet.", blocks: [
      { kind: "p", text: "The AI can only find what you give it. But it must never see your card numbers or logins. So first you download your payments and take out everything private." },
      { kind: "h3", text: "A. Download your payments" },
      { kind: "list", ordered: true, items: [
        "Log in to your business bank or card account **in your browser**. Never in the AI chat.",
        "Go to the page with your transactions or statements. It is often called **Transactions**, **Activity** or **Statements**.",
        "Look for a button called **Export** or **Download**. It is often near the top right of the list.",
        "Choose **CSV** (a simple spreadsheet file). Choose the last 3 months, or 12 if you can.",
        "Click **Download**. The file goes to your **Downloads** folder.",
        "No export button? Banks move these menus. Search \"export transactions CSV\" on your bank's own help pages. Some banks only give PDFs. That works too: open the PDF and copy the rows.",
      ] },
      { kind: "h3", text: "B. Take out everything private" },
      { kind: "list", ordered: true, items: [
        "Open the file in Excel, Google Sheets or Numbers. You will see rows of payments.",
        "Find the columns for **date**, **payee** (who you paid) and **amount**. Keep these 3.",
        "Delete every other column. Click the letter at the top of a column, then right-click and choose **Delete column**.",
        "Scroll down. Delete any personal payments on the business card. Right-click the row number and choose **Delete row**.",
        "Look in the payee column for card numbers, reference numbers or client names. Delete them from the text.",
        "Click **File**, then **Save as** (or **Download** in Google Sheets). Name it **payments-clean.csv**.",
      ] },
      { kind: "table", head: ["Never paste", "Take out first", "Fine to paste"], rows: [
        ["Logins, passwords or security answers", "Card and account numbers", "Date, payee and amount"],
        ["Screenshots of your banking app", "Your address and reference numbers", "The name of each tool you pay for"],
        ["Full statements with your details", "Client names in payment notes", "Your own notes on what each tool is for"],
      ] },
      { kind: "h3", text: "C. Check your clean file" },
      { kind: "p", text: "Look at your file one last time. It should look like this, and nothing more." },
      { kind: "result", label: "What a clean file looks like", lines: [
        "03/07 | [design app] | $[amount]",
        "05/07 | [file storage] | $[amount]",
        "03/08 | [design app] | $[amount]",
        "12/08 | [booking tool] | $[amount]",
      ] },
      { kind: "contrast", items: [
        { label: "Not clean yet", text: "03/07 CARD 4921 **** [design app] REF 88213 [your address]", good: false },
        { label: "Clean", text: "03/07 | [design app] | $[amount]", good: true },
      ] },
      { kind: "tip", text: "**No AI tool needs your bank login for this.** If an app or chat asks for it, stop and close it." },
    ] },
    { num: "02", title: "Find the repeat payments", accent: "Your subscriptions table.", blocks: [
      { kind: "p", text: "This step turns a long list of payments into one short table. It shows everything you pay for again and again." },
      { kind: "list", ordered: true, items: [
        "Open your AI chat and start a new chat. In ChatGPT and Claude, click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box. Don't press Enter yet.",
        "Change [3] to the number of months in your file.",
        "Add your clean file. Click the paperclip or the **+** button on the left of the chat box, then pick **payments-clean.csv**. No upload button? Open the file, copy all the rows and paste them where it says [paste].",
        "Press Enter.",
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
      { kind: "result", label: "What a good answer looks like", lines: [
        "[design app] | $[amount] | monthly | 03/09 | (blank) | check",
        "[booking tool] | $[amount] | monthly | 12/09 | (blank) | check",
        "[file storage] | $[amount] | other | 05/07 | (blank) | [CHECK] only seen once",
        "One-off payments: [printer], [train ticket]",
      ] },
      { kind: "h3", text: "Check it yourself" },
      { kind: "list", ordered: true, items: [
        "Pick 2 rows from the AI's table.",
        "Open your clean file. Press **Ctrl + F** on Windows, or **Cmd + F** on a Mac. Type the payee name.",
        "Count how many times it shows up. Does it match \"How often\"? Is the amount the same?",
        "If a number is different, the AI misread it. Fix the row yourself, and check every other row too.",
      ] },
      { kind: "h3", text: "Save your table" },
      { kind: "list", ordered: true, items: [
        "Copy the table from the chat. Paste it into a new spreadsheet. Name it **Subscriptions table**.",
        "Fill in **Last used** for each row. Use your memory, or log in to the tool and look.",
        "Look up every [CHECK] row yourself. Search your email for the payee name to find the receipt.",
      ] },
      { kind: "tip", text: "**The table looks short?** Use 12 months, not 3. Yearly payments only show up once a year." },
    ] },
    { num: "03", title: "Add up the real cost for a year", accent: "For anything renewing soon.", blocks: [
      { kind: "p", text: "A renewal email often shows a monthly price, a starter deal or a price per user. Adding up 12 months shows the real number." },
      { kind: "list", ordered: true, items: [
        "Find the renewal email in your inbox. Or log in to the tool and open the **Billing** or **Plan** page.",
        "Select the words about the price, fees and dates. Copy them.",
        "In your AI chat, start a new chat. Paste the prompt below.",
        "Paste the renewal words where it says [paste]. Take out your account number first.",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Add up the real cost for a year", text: `Work out what this subscription will cost my business over the next 12 months, including every fee mentioned.

Show the sum step by step, so I can check it.

Then list up to 5 questions I should ask before it renews, for example: what happens when a starter price ends, whether there is a cheaper plan, whether I pay for users I don't have, and whether there is a cancellation fee.

Use only what is in the text I paste. If a number is missing, write [CHECK] instead of guessing.

Renewal wording:
[paste the renewal email or billing page text]` },
      { kind: "example", label: "Example renewal words", text: "$20 a month for the first 3 months, then $32 a month. Set-up fee $25." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "3 months x $20 = $60",
        "9 months x $32 = $288",
        "Set-up fee = $25",
        "Total for 12 months: $60 + $288 + $25 = $373",
        "Questions: Is there a cheaper plan? Is there a fee to cancel? ...",
      ] },
      { kind: "list", ordered: true, items: [
        "Check the sum once with a calculator. AI can add up wrong.",
        "Add a new column to your Subscriptions table called **Cost for a year**. Type the number in.",
      ] },
    ] },
    { num: "04", title: "Decide: keep, downgrade or cancel", accent: "Your choice, not the AI's.", blocks: [
      { kind: "p", text: "Go through your table one row at a time. Give each tool one of three choices." },
      { kind: "table", head: ["Choice", "When it fits", "What you do next"], rows: [
        ["Keep", "You used it this month and it's worth it", "Nothing. Set a renewal reminder (step 06)"],
        ["Downgrade", "You use it, but not every part of it or every user in it", "Move to a cheaper plan, or ask for a lower price (step 05)"],
        ["Cancel", "You haven't used it in a month or two, or another tool does the same job", "Save anything you need from it, then cancel (step 05)"],
      ] },
      { kind: "list", ordered: true, items: [
        "Add a column to your table called **Choice**.",
        "For each row, type Keep, Downgrade or Cancel.",
        "**Before you cancel,** log in and download any client files, contacts or invoices from the tool.",
        "**Two tools doing one job** (like two design apps)? Keep the one you open most.",
        "**Not sure?** Type Downgrade, or \"check in a month\". You don't have to decide it all today.",
      ] },
    ] },
    { num: "05", title: "Cancel, or ask for a lower price", accent: "The message you've put off.", blocks: [
      { kind: "h3", text: "A. Try the two-click way first" },
      { kind: "list", ordered: true, items: [
        "Log in to the tool. Click your picture or name, usually in the top right corner.",
        "Look for **Billing**, **Plan** or **Subscription**. On some tools it is under **Settings** or **Account**.",
        "Look for **Cancel plan** or **Change plan**. Click it and follow the steps.",
        "When it is done, you usually see a message or get an email. Save that email.",
        "Can't find it? Tools move these menus. Search \"cancel subscription\" on the tool's own help pages.",
      ] },
      { kind: "h3", text: "B. No button? Let AI write the message" },
      { kind: "list", ordered: true, items: [
        "In your AI chat, start a new chat. Paste the prompt below.",
        "Change [company] and pick one ask: cancel, cheaper plan, or lower price. Delete the other two.",
        "Fill in your facts. Use only facts that are true. Delete any line you don't have.",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Write my cancel or lower-price message", text: `Write a short email to [company] asking them to [cancel my plan / move me to a cheaper plan / lower my price].

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
      { kind: "result", label: "What a good answer looks like", lines: [
        "Subject: Please cancel my plan",
        "Hello, please cancel the [plan name] plan on the account [email]. Please confirm in writing by [date] that no more payments will be taken. Thank you, [your name]",
      ] },
      { kind: "list", ordered: true, items: [
        "Fill in every [CHECK]. Check every fact is true. Read the message out loud once.",
        "Send it from your own email, or paste it into the tool's help chat.",
        "Save the reply that says it is done.",
        "Next month, check your statement. Is the payment gone? Then mark the row **Cancelled** in your table.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["The payment is still on next month's statement", "The cancel did not go through", "Reply to the company with the email that says it is done. Ask for a refund."],
        ["They offer a cheaper deal to stay", "This is common", "Use step 03 to add up the cost for a year. Then decide."],
        ["They say you are in a yearly contract", "You may have to wait for the end date", "Ask for the end date in writing. Put it in your calendar (step 06)."],
      ] },
    ] },
    { num: "06", title: "Set renewal reminders", accent: "So it doesn't come back.", blocks: [
      { kind: "p", text: "Yearly renewals are the easiest to miss. One calendar reminder before each one gives you time to decide." },
      { kind: "list", ordered: true, items: [
        "For each tool you kept, find the next renewal date. It is in your table or on the tool's billing page.",
        "Open your calendar. For Google Calendar, go to [calendar.google.com](https://calendar.google.com) and click **Create** at the top left.",
        "Pick the date **2 weeks before** the renewal. Name the event **Renewal: [tool]**.",
        "In the description, type the cost for a year and one question: \"Did I use this last month?\"",
        "Click **Save**.",
        "Add one more event 3 months from today. Name it **Check my subscriptions again**. Click **Does not repeat** and choose a repeat every 3 months, if your calendar has it.",
      ] },
      { kind: "honest", text: "**The honest part:** AI can read a payee wrong and add up wrong. It can't see offers you haven't told it about. Check the sums with a calculator. Check any price on the company's own page. Make every keep or cancel choice yourself." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Payments downloaded and cleaned: only date, payee and amount left",
        "Subscriptions table saved, with 2 rows checked against your clean file",
        "Cost for a year added up and checked with a calculator, for each renewal coming up",
        "Keep, downgrade or cancel chosen for every row",
        "One real tool cancelled or downgraded, and the email saying so saved",
        "Renewal reminders in your calendar, plus a check every 3 months",
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
