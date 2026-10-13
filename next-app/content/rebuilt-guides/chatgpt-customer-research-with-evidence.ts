import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "chatgpt-customer-research-with-evidence",
  lumailTag: "guide-chatgpt-customer-research-with-evidence",
  title: "How to Use ChatGPT to Understand What My Clients Want",
  cover: "/images/guides/chatgpt-customer-research-with-evidence.webp",
  coverAlt: "The blue robot mascot sorting customer notes into labelled evidence trays",
  seoDescription: "Use ChatGPT to understand what your clients want: turn reviews, messages and survey answers into themes with real quotes, then make 3 clear choices.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Use ChatGPT to Understand", accent: "What My Clients Want" },
  hero: {
    kind: "scene",
    src: "/images/guides/chatgpt-customer-research-with-evidence.webp",
    alt: "The blue robot mascot sorting customer notes into labelled evidence trays",
    line: "Turn reviews, messages and survey answers into clear choices. Each theme shows the real quotes behind it.",
  },
  intro: {
    heading: "Your client insight table, made from their own words",
    lead: "Your clients already tell you what they want. They say it in reviews, messages, emails and calls. This guide shows you how to collect those comments and remove personal details. ChatGPT then sorts them into themes, with real quotes. You decide what to fix, what to say and what to offer.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **comment file**: 20 to 50 real client comments, with names removed",
        "Your **client insight table**: themes, how many clients said each one, and their exact words",
        "A list of **disagreements**: where some clients want the opposite of others",
        "**3 decisions**: one thing to fix, one to say, one to offer, chosen by you",
        "Simple steps to do it again every 3 months",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Before you paste anything about clients, turn off model training in **Data Controls** (the setting that lets OpenAI learn from your chats). [OpenAI's help page](https://help.openai.com/en/articles/7730893-chatgpt-data-controls-faq) shows how. You can copy and paste every prompt below. Change the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Client Insight Table.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Collect the comments", accent: "Their words, as written.", blocks: [
      { kind: "p", text: "This step collects what clients really said. Later, every theme goes back to a real comment." },
      { kind: "table", head: ["Where", "What to copy", "How to find it"], rows: [
        ["Reviews", "Google reviews, LinkedIn recommendations, any review site", "Copy the full text, not just the stars"],
        ["DMs and messages", "Questions before people bought, and messages after", "Scroll back in Instagram, LinkedIn or WhatsApp"],
        ["Emails", "Questions, thank-you emails, complaints", "Search your inbox for \"thank you\", \"question\" or \"problem\""],
        ["Survey answers", "Feedback forms, welcome forms", "Download the answers as a spreadsheet, if your form tool can"],
        ["Call notes", "What clients said on calls", "Copy only the client's words, not your summary"],
      ] },
      { kind: "list", ordered: true, items: [
        "Open a new document called **Client comments**.",
        "Copy 20 to 50 comments into it, one per line. Add happy and unhappy ones. Copy each one exactly. You use the client's own words later.",
        "Next to each comment, write where it came from: review, DM, email, survey or call.",
        "Remove names before anything goes into ChatGPT. Give each person an ID, like C01 or C02. Use the same ID for the same person every time.",
        "Delete email addresses, phone numbers and company names. Delete anything about a person's health or money.",
      ] },
      { kind: "tip", text: "**Fewer than 20 comments?** Start with what you have. The steps still work. Add more in 3 months." },
    ] },
    { num: "02", title: "Clean up the file", accent: "A second check on privacy.", blocks: [
      { kind: "p", text: "You removed names by hand. This prompt finds anything you missed. It also puts every comment in the same layout." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and start a new chat.",
        "Paste the prompt below. Add your comments at the end.",
      ] },
      { kind: "prompt", label: "Clean up my client comments", text: `Clean up these client comments. Do only this:
1. Replace any name of a person with an ID (C01, C02...). If a comment already has an ID, keep it. Use the same ID every time the same person appears.
2. Remove email addresses, phone numbers, street addresses, company names, and any health or money details about a person.
3. Keep the client's words exactly as written. Don't fix spelling, shorten or summarise.
4. Give it back as a table: ID | Source (review, DM, email, survey, call) | Comment

After the table, list everything you removed, so I can check it.

Comments:
[paste your comments]` },
      { kind: "p", text: "Read the list of removed details. Is anything personal still in the table? Delete it yourself before you go on. Save the clean table in your Client comments document." },
    ] },
    { num: "03", title: "Find the themes", accent: "With the quotes behind them.", blocks: [
      { kind: "p", text: "A theme with no quotes is only a guess. With quotes and client IDs, you can check each one." },
      { kind: "prompt", label: "Build my theme table", text: `Here are my client comments: [paste the clean table].

Group them into themes. Give me a table with these columns:
Theme (short name) | Type (complaint, praise, question, request) | Number of clients | Client IDs | 2 exact quotes from different clients

Rules:
- A theme needs at least 2 different clients. Put single comments under a heading "Early signals".
- Keep complaints, praise, questions and requests in separate themes.
- Copy quotes word for word from the comments. Never write or change a quote.
- Count clients, not comments: one client saying the same thing twice counts once.

After the table, add a section called "Disagreements": themes where some clients want the opposite of others, with the client IDs on each side.` },
      { kind: "p", text: "A good answer looks like this. *This example is made up.* Yours will use your clients' words." },
      { kind: "table", head: ["Theme", "Type", "Clients", "IDs", "Quote"], rows: [
        ["Getting started feels slow", "Complaint", "3", "C01, C03, C05", "\"The first week felt like a lot of forms\""],
        ["Weekly calls keep me on track", "Praise", "2", "C02, C06", "\"The Monday call is what keeps me going\""],
        ["Can't find invoices", "Complaint", "2", "C04, C07", "\"I never know where the invoice is\""],
      ] },
      { kind: "list", ordered: true, items: [
        "For each theme, find two of its quotes in your first comments file.",
        "Can't find a quote? Delete the theme. Or ask ChatGPT which comment it came from.",
        "Save the checked table as **Client insight table**. Add today's date.",
      ] },
      { kind: "tip", text: "**Too many themes?** Reply: \"Merge themes that describe the same problem, and show me what you merged.\"" },
    ] },
    { num: "04", title: "Make 3 decisions", accent: "AI suggests, you decide.", blocks: [
      { kind: "p", text: "A table does not decide anything. This step turns it into choices. Then you pick." },
      { kind: "prompt", label: "Turn themes into options", text: `Here is my client insight table: [paste].
Here is what I sell: [your services or packages, one line each].

Suggest options in three groups:
1. Fix: something in how I work that clients complain about
2. Say: questions or worries I should answer on my website, in sales calls or in emails, using the clients' own words
3. Offer: something clients ask for that I could add, change or stop

For each option, give: the theme it comes from | how many clients raised it | what it would take from me (small, medium, large).

Use only what is in the table. Don't claim this speaks for all my clients. Never invent prices, results or promises.

End with 3 questions I should ask clients next, to check what I'm still unsure about.` },
      { kind: "p", text: "Read the options. Pick one of each yourself. Write them under your table, with a date for each:" },
      { kind: "table", head: ["Decision", "Theme it comes from", "What I'll do", "By when"], rows: [
        ["Fix", "[theme]", "[action]", "[date]"],
        ["Say", "[theme]", "[action]", "[date]"],
        ["Offer", "[theme]", "[action]", "[date]"],
      ] },
      { kind: "tip", text: "**Not sure which to pick?** Pick the one most clients raised that takes the least work. Do that one first." },
    ] },
    { num: "05", title: "Save it and repeat", accent: "Every quarter.", blocks: [
      { kind: "p", text: "Clients change. So do your services. A check every 3 months shows what is new. It also shows if your changes worked." },
      { kind: "list", ordered: true, items: [
        "Keep the Client comments document. Add new comments as they come in, with names removed.",
        "Put a reminder in your calendar for 3 months from today.",
        "Do steps 02 to 04 again on the new comments.",
        "Compare the new table with the last one. Which themes grew? Which went away after your fixes?",
      ] },
      { kind: "tip", text: "**Do you see Projects in ChatGPT's left sidebar?** A Project is a folder in ChatGPT that keeps your files. Make one called **Client insights**. Keep each table in it. No Projects? Keep them in one document, newest at the top." },
      { kind: "honest", text: "**The honest part:** 50 comments are only a small group. Two people can use the same word and mean different things. Read the quotes before you act. AI sorts what you give it. You know the people. The decisions are yours." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Collected 20 to 50 comments, names removed",
        "Ran the clean-up prompt and checked what it removed",
        "Saved the client insight table, with quotes and counts",
        "Checked two quotes per theme against your comments",
        "Wrote down 3 decisions, each with a date",
        "Put a reminder in your calendar for 3 months",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know what clients want.",
    accent: "Now test your next idea.",
    body: "The idea test guide puts a new offer in front of five critics. Then you run a one-week test. You find out if people will pay before you build it.",
    label: "Test your idea →",
    href: "/guides/test-business-idea-with-ai/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Add new comments as they come in. Make a new theme table every 3 months. Check two quotes per theme before you act.",
    finishLine: "Their words, sorted. Your decisions.",
  },
};
