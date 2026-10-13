import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "chatgpt-customer-research-with-evidence",
  lumailTag: "guide-chatgpt-customer-research-with-evidence",
  title: "How to Use ChatGPT to Understand What My Clients Want",
  cover: "/images/guides/chatgpt-customer-research-with-evidence.webp",
  coverAlt: "The blue robot mascot sorting customer notes into labelled evidence trays",
  seoDescription: "Use ChatGPT to understand what your clients want: turn reviews, messages and survey answers into themes with real quotes, then 3 clear decisions.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Use ChatGPT to Understand", accent: "What My Clients Want" },
  hero: {
    kind: "scene",
    src: "/images/guides/chatgpt-customer-research-with-evidence.webp",
    alt: "The blue robot mascot sorting customer notes into labelled evidence trays",
    line: "Turn reviews, messages and survey answers into clear decisions. Every theme comes with the quotes behind it.",
  },
  intro: {
    heading: "Your client insight table, built from their own words",
    lead: "Your clients already tell you what they want, in reviews, messages, emails and calls. It's spread across too many places to read at once. This guide shows you how to collect those comments, clean out personal details, and use ChatGPT to group them into themes with the exact quotes behind each one. Then you decide what to fix, what to say and what to offer.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **comment file**: 20 to 50 real client comments in one place, with names removed",
        "Your **client insight table**: themes, how many clients raised each one, and the exact quotes behind it",
        "A list of **disagreements**: where some clients want the opposite of others",
        "**3 decisions**: one thing to fix, one thing to say and one thing to offer, chosen by you",
        "A routine to repeat it every quarter",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Before you paste anything about clients, switch off model training in Data Controls ([OpenAI's help page](https://help.openai.com/en/articles/7730893-chatgpt-data-controls-faq) shows how). Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Client Insight Table.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Collect the comments", accent: "Their words, as written.", blocks: [
      { kind: "p", text: "This step gathers what clients have actually said, so every theme later traces back to a real comment." },
      { kind: "table", head: ["Where", "What to copy", "How to find it"], rows: [
        ["Reviews", "Google reviews, LinkedIn recommendations, any review site", "Copy the full text, not just the stars"],
        ["DMs and messages", "Questions people asked before buying, and messages after", "Scroll back through Instagram, LinkedIn or WhatsApp"],
        ["Emails", "Enquiries, thank-you emails, complaints", "Search your inbox for \"thank you\", \"question\" or \"problem\""],
        ["Survey answers", "Feedback forms, onboarding forms", "Download the answers as a spreadsheet if your form tool allows it"],
        ["Call notes", "What clients said on sales and client calls", "Copy only the client's words, not your own summary"],
      ] },
      { kind: "list", ordered: true, items: [
        "Open a new document called **Client comments**.",
        "Copy 20 to 50 comments into it, one per line. Include happy and unhappy ones. Copy each one exactly as written: the client's own wording is what you'll use later.",
        "Next to each comment, write where it came from: review, DM, email, survey or call.",
        "Remove names before anything goes into ChatGPT. Replace each person with an ID such as C01, C02, and give the same person the same ID every time.",
        "Delete email addresses, phone numbers, company names and anything about a person's health or money.",
      ] },
      { kind: "tip", text: "**Fewer than 20 comments?** Start with what you have. The steps work the same way, and you'll add more next quarter." },
    ] },
    { num: "02", title: "Clean up the file", accent: "A second check on privacy.", blocks: [
      { kind: "p", text: "You removed names by hand. This prompt catches anything you missed and puts every comment in the same format." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and start a new chat.",
        "Paste the prompt below, with your comments at the end.",
      ] },
      { kind: "prompt", label: "Clean up my client comments", text: `Clean up these client comments. Do only this:
1. Replace any name of a person with an ID (C01, C02...). If a comment already has an ID, keep it. Use the same ID every time the same person appears.
2. Remove email addresses, phone numbers, street addresses, company names, and any health or money details about a person.
3. Keep the client's words exactly as written. Don't fix spelling, shorten or summarise.
4. Give it back as a table: ID | Source (review, DM, email, survey, call) | Comment

After the table, list everything you removed, so I can check it.

Comments:
[paste your comments]` },
      { kind: "p", text: "Read the list of removed details. If anything personal is still in the table, delete it yourself before you go on. Save the clean table in your Client comments document." },
    ] },
    { num: "03", title: "Find the themes", accent: "With the quotes behind them.", blocks: [
      { kind: "p", text: "A theme without quotes is only an opinion. With the quotes and the client IDs, you can check every one." },
      { kind: "prompt", label: "Build my theme table", text: `Here are my client comments: [paste the clean table].

Group them into themes. Give me a table with these columns:
Theme (short name) | Type (complaint, praise, question, request) | Number of clients | Client IDs | 2 exact quotes from different clients

Rules:
- A theme needs at least 2 different clients. Put single comments under a heading "Early signals".
- Keep complaints, praise, questions and requests in separate themes.
- Copy quotes word for word from the comments. Never write or change a quote.
- Count clients, not comments: one client saying the same thing twice counts once.

After the table, add a section called "Disagreements": themes where some clients want the opposite of others, with the client IDs on each side.` },
      { kind: "p", text: "A good answer looks like this. *This example is made up*; yours will use your clients' words." },
      { kind: "table", head: ["Theme", "Type", "Clients", "IDs", "Quote"], rows: [
        ["Getting started feels slow", "Complaint", "3", "C01, C03, C05", "\"The first week felt like a lot of forms\""],
        ["Weekly calls keep me on track", "Praise", "2", "C02, C06", "\"The Monday call is what keeps me going\""],
        ["Can't find invoices", "Complaint", "2", "C04, C07", "\"I never know where the invoice is\""],
      ] },
      { kind: "list", ordered: true, items: [
        "For each theme, find two of its quotes in your original comments.",
        "If you can't find a quote, delete the theme, or ask ChatGPT which comment it came from.",
        "Save the checked table as **Client insight table**, with today's date.",
      ] },
      { kind: "tip", text: "**Too many themes?** Reply: \"Merge themes that describe the same problem, and show me what you merged.\"" },
    ] },
    { num: "04", title: "Make 3 decisions", accent: "AI suggests, you decide.", blocks: [
      { kind: "p", text: "A table doesn't decide anything. This step turns it into options, and then you choose." },
      { kind: "prompt", label: "Turn themes into options", text: `Here is my client insight table: [paste].
Here is what I sell: [your services or packages, one line each].

Suggest options in three groups:
1. Fix: something in how I work that clients complain about
2. Say: questions or worries I should answer on my website, in sales calls or in emails, using the clients' own words
3. Offer: something clients ask for that I could add, change or stop

For each option, give: the theme it comes from | how many clients raised it | what it would take from me (small, medium, large).

Use only what is in the table. Don't claim this represents all my clients. Never invent prices, results or promises.

End with 3 questions I should ask clients next, to check what I'm still unsure about.` },
      { kind: "p", text: "Read the options and choose one of each yourself. Write them under your table, with a date for each:" },
      { kind: "table", head: ["Decision", "Theme it comes from", "What I'll do", "By when"], rows: [
        ["Fix", "[theme]", "[action]", "[date]"],
        ["Say", "[theme]", "[action]", "[date]"],
        ["Offer", "[theme]", "[action]", "[date]"],
      ] },
      { kind: "tip", text: "**Not sure which to pick?** Choose the option raised by the most clients that takes you the least work. Do that one first." },
    ] },
    { num: "05", title: "Save it and repeat", accent: "Every quarter.", blocks: [
      { kind: "p", text: "Clients change, and so do your services. A quarterly check shows you what's new and whether your decisions worked." },
      { kind: "list", ordered: true, items: [
        "Keep the Client comments document open and add new comments as they come in, with names removed.",
        "Put a reminder in your calendar for three months from today.",
        "Run steps 02 to 04 again on the new comments.",
        "Compare the new table with the last one: which themes grew, and which went away after your fixes.",
      ] },
      { kind: "tip", text: "**If you see Projects in ChatGPT's left sidebar,** create one called **Client insights** and keep each quarter's table in it. If you don't, keep them in one document, newest at the top." },
      { kind: "honest", text: "**The honest part:** 50 comments are a sample, and two people using the same word don't always mean the same thing. Read the quotes before you act. AI groups what you give it. You know the people behind the words, and the decisions stay with you." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "20 to 50 comments collected, names removed",
        "Clean-up prompt run and removed details checked",
        "Client insight table saved, with quotes and counts",
        "Two quotes per theme checked against the originals",
        "3 decisions written down, each with a date",
        "Quarterly reminder in your calendar",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know what clients want.",
    accent: "Now test your next idea.",
    body: "The idea test guide puts a new offer in front of five critics and a one-week demand test, so you find out whether people will pay before you build it.",
    label: "Test your idea →",
    href: "/guides/test-business-idea-with-ai/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Add new comments as they arrive, run the theme table every quarter, and check two quotes per theme before you act on it.",
    finishLine: "Their words, sorted, and the decisions yours.",
  },
};
