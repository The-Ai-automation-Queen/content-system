import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "chatgpt-customer-research-with-evidence",
  lumailTag: "guide-chatgpt-customer-research-with-evidence",
  title: "How to Use ChatGPT to Understand What My Clients Want",
  cover: "/images/guides/chatgpt-customer-research-with-evidence.webp",
  coverAlt: "The blue robot mascot sorting customer notes into labelled evidence trays",
  seoDescription: "Use ChatGPT to understand what your clients want: turn reviews, messages and survey answers into themes with real quotes, then make 3 clear choices.",
  tool: "ChatGPT",
  minutes: 45,
  h1: { title: "How to Use ChatGPT to Understand", accent: "What My Clients Want" },
  hero: {
    kind: "scene",
    src: "/images/guides/chatgpt-customer-research-with-evidence.webp",
    alt: "The blue robot mascot sorting customer notes into labelled evidence trays",
    line: "Turn reviews, messages and survey answers into clear choices. Each theme shows the real quotes behind it.",
  },
  intro: {
    heading: "Your clients already told you what they want",
    lead: "Here is the problem. Clients tell you what they want every week, in reviews, messages, emails and calls. But it is spread over many places. So you guess, or you go with the last thing someone said. ChatGPT can sort all those comments into themes for you, and show the real quotes behind each one. You get three clear choices: one thing to fix, one thing to say, one thing to offer.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**One document with 20 to 50 real client comments**, with names and private details removed",
        "**A table of what clients keep saying**, with how many said it and their exact words",
        "**A short list of where clients disagree**, so you don't act on half the story",
        "**3 decisions you chose yourself**: one to fix, one to say, one to offer, each with a date",
        "**A reminder to do it again** every 3 months",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer. These steps are for a web browser, like Chrome.",
        "A ChatGPT account. The free plan works.",
        "Access to where your clients write to you: your inbox, Google reviews, LinkedIn, Instagram or WhatsApp.",
        "One real thing to test with: a client review or message you remember well. You will check that ChatGPT puts it in the right theme.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
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
    { num: "01", title: "Protect your clients and collect their words", accent: "20 minutes, done once.", blocks: [
      { kind: "p", text: "First you stop ChatGPT learning from your chats. Then you copy real client comments into one document. Then you remove their names. You don't ask ChatGPT anything yet." },
      { kind: "h3", text: "A. Switch off model training" },
      { kind: "p", text: "Model training is a setting that lets OpenAI (the company behind ChatGPT) use your chats to improve its AI. Switch it off before you paste anything about clients." },
      { kind: "list", ordered: true, items: [
        "Open [chatgpt.com](https://chatgpt.com) and sign in.",
        "Click your name or round profile picture. On most screens it is at the bottom left. On some it is at the top right.",
        "Click **Settings**. A window opens.",
        "Click **Data controls** on the left of that window.",
        "Find **Improve the model for everyone**. Click the switch so it turns off.",
        "Can't find **Data controls**? OpenAI moves these menus. Search \"data controls\" on [OpenAI's help page](https://help.openai.com/en/articles/7730893-chatgpt-data-controls-faq) for today's steps.",
      ] },
      { kind: "h3", text: "B. Collect the comments" },
      { kind: "list", ordered: true, items: [
        "Open [docs.google.com](https://docs.google.com), or Word. Click **Blank document**.",
        "Click **Untitled document** at the top left. Type **Client comments** and press Enter.",
        "Go to each place in the table below. Copy 20 to 50 comments in all. Take happy and unhappy ones.",
        "Paste each comment on its own line. Copy it exactly as the client wrote it. Don't fix spelling.",
        "At the start of each line, write where it came from: review, DM, email, survey or call.",
      ] },
      { kind: "table", head: ["Where", "What to copy", "How to find it"], rows: [
        ["Reviews", "Google reviews, LinkedIn recommendations, any review site", "Copy the full text, not just the stars"],
        ["DMs and messages", "Questions before people bought, and messages after", "Scroll back in Instagram, LinkedIn or WhatsApp"],
        ["Emails", "Questions, thank-you emails, complaints", "Search your inbox for \"thank you\", \"question\" or \"problem\""],
        ["Survey answers", "Feedback forms, welcome forms", "Download the answers as a spreadsheet, if your form tool can"],
        ["Call notes", "What clients said on calls", "Copy only the client's words, not your summary"],
      ] },
      { kind: "h3", text: "C. Remove names by hand" },
      { kind: "list", ordered: true, items: [
        "Give each client an ID, like C01, C02, C03. Write the IDs on a piece of paper or a separate file, never in ChatGPT.",
        "In your Client comments document, replace each name with its ID. Use the same ID for the same person every time.",
        "Delete email addresses, phone numbers and company names.",
        "Delete anything about a person's health or money.",
      ] },
      { kind: "contrast", items: [
        { label: "Before (example)", text: "email | [client name] ([client email]) said the first call was too rushed.", good: false },
        { label: "After (example)", text: "email | C03: the first call was too rushed.", good: true },
      ] },
      { kind: "tip", text: "**Fewer than 20 comments?** Start with what you have. The steps still work. Add more in 3 months." },
    ] },
    { num: "02", title: "Let ChatGPT find what you missed", accent: "A second privacy check.", blocks: [
      { kind: "p", text: "You removed names by hand. This prompt looks for anything you missed. It also puts every comment in the same layout, as a table." },
      { kind: "list", ordered: true, items: [
        "In ChatGPT, click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box.",
        "Go to your Client comments document. Select all the text with **Ctrl + A** (or **Cmd + A** on a Mac). Copy it with **Ctrl + C** (or **Cmd + C**).",
        "Go back to ChatGPT. Click at the end of the prompt, after \"Comments:\". Paste with **Ctrl + V** (or **Cmd + V**).",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Clean up my client comments", text: `Clean up these client comments. Do only this:
1. Replace any name of a person with an ID (C01, C02...). If a comment already has an ID, keep it. Use the same ID every time the same person appears.
2. Remove email addresses, phone numbers, street addresses, company names, and any health or money details about a person.
3. Keep the client's words exactly as written. Don't fix spelling, shorten or summarise.
4. Give it back as a table: ID | Source (review, DM, email, survey, call) | Comment

After the table, list everything you removed, so I can check it.

Comments:
[paste your comments]` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "C01 | review | \"Setup took me a week\"",
        "C02 | email | \"The Monday call is what keeps me going\"",
        "Removed: one company name in C04, one phone number in C07.",
      ] },
      { kind: "list", ordered: true, items: [
        "Read the list of what it removed.",
        "Read the table. Is anything personal still there? Delete it yourself.",
        "Copy the table. Paste it at the top of your Client comments document, under the heading **Clean table**.",
      ] },
    ] },
    { num: "03", title: "Find the themes", accent: "With the quotes behind them.", blocks: [
      { kind: "p", text: "A theme is something several clients say. A theme with no quotes is only a guess. With quotes and client IDs, you can check each one." },
      { kind: "list", ordered: true, items: [
        "Stay in the same chat, or click **New chat**.",
        "Paste the prompt below. Paste your clean table where it says [paste the clean table].",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Build my theme table", text: `Here are my client comments: [paste the clean table].

Group them into themes. Give me a table with these columns:
Theme (short name) | Type (complaint, praise, question, request) | Number of clients | Client IDs | 2 exact quotes from different clients

Rules:
- A theme needs at least 2 different clients. Put single comments under a heading "Early signals".
- Keep complaints, praise, questions and requests in separate themes.
- Copy quotes word for word from the comments. Never write or change a quote.
- Count clients, not comments: one client saying the same thing twice counts once.

After the table, add a section called "Disagreements": themes where some clients want the opposite of others, with the client IDs on each side.` },
      { kind: "result", label: "What a good answer looks like (made-up example)", lines: [
        "Getting started feels slow | Complaint | 3 | C01, C03, C05 | \"Setup took me a week\" / \"The first week felt like a lot of forms\"",
        "Weekly calls keep me on track | Praise | 2 | C02, C06 | \"The Monday call is what keeps me going\"",
        "Can't find invoices | Complaint | 2 | C04, C07 | \"I never know where the invoice is\"",
        "Early signals: video guides (C08 only)",
        "Disagreements: C02 wants more calls, C09 wants fewer.",
      ] },
      { kind: "p", text: "Copy the whole answer. Paste it into a new document called **Client insight table**. Add today's date at the top. Don't use it yet. First you check it in step 04." },
      { kind: "tip", text: "**Too many themes?** Reply in the same chat: \"Merge themes that describe the same problem, and show me what you merged.\"" },
    ] },
    { num: "04", title: "Check every quote yourself", accent: "2 minutes per theme.", blocks: [
      { kind: "p", text: "AI can be wrong, even when it sounds sure. It can change a quote a little, or put a comment under the wrong client. So you check each quote against your own document." },
      { kind: "list", ordered: true, items: [
        "Open your Client comments document in one tab, and your Client insight table in another.",
        "In the insight table, copy 4 or 5 words from the first quote.",
        "Go to your Client comments document. Press **Ctrl + F** on Windows, or **Cmd + F** on a Mac. A small search box opens.",
        "Paste the words and press Enter. The words light up on the page.",
        "Check two things: are the words the same, and is the client ID the same?",
        "Do this for both quotes in every theme. Then find your test comment from \"Before you start\". Is it in the theme you expected?",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["The words light up, with the same ID", "The quote is real", "Keep the theme"],
        ["The words light up, but with another ID", "ChatGPT mixed up the clients", "Fix the ID and the count in your table"],
        ["Nothing lights up", "ChatGPT changed or made up the quote", "Ask: \"Which comment did this quote come from? Copy it exactly.\" If it can't, delete the theme"],
        ["A theme has only 1 real client", "It is not a theme yet", "Move it to Early signals"],
        ["Your test comment is in a strange theme", "The theme names may be too wide", "Ask ChatGPT to split that theme in two"],
      ] },
    ] },
    { num: "05", title: "Make 3 decisions", accent: "AI suggests, you decide.", blocks: [
      { kind: "p", text: "A table does not decide anything. This step turns it into options. Then you pick." },
      { kind: "list", ordered: true, items: [
        "In ChatGPT, click **New chat**.",
        "Paste the prompt below. Paste your checked insight table where it says [paste].",
        "Write what you sell, one line per service or package.",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Turn themes into options", text: `Here is my client insight table: [paste].
Here is what I sell: [your services or packages, one line each].

Suggest options in three groups:
1. Fix: something in how I work that clients complain about
2. Say: questions or worries I should answer on my website, in sales calls or in emails, using the clients' own words
3. Offer: something clients ask for that I could add, change or stop

For each option, give: the theme it comes from | how many clients raised it | what it would take from me (small, medium, large).

Use only what is in the table. Don't claim this speaks for all my clients. Never invent prices, results or promises.

End with 3 questions I should ask clients next, to check what I'm still unsure about.` },
      { kind: "result", label: "What a good answer looks like (made-up example)", lines: [
        "Fix: send a one-page start guide before the first call | Getting started feels slow | 3 clients | small",
        "Say: add \"where to find your invoice\" to your welcome email | Can't find invoices | 2 clients | small",
        "Offer: keep the weekly call in every package | Weekly calls keep me on track | 2 clients | medium",
        "Ask next: \"Where exactly did the first week slow you down?\"",
      ] },
      { kind: "p", text: "Read the options. Pick one of each yourself. Copy this table under your insight table and fill it in:" },
      { kind: "table", head: ["Decision", "Theme it comes from", "What I'll do", "By when"], rows: [
        ["Fix", "[theme]", "[action]", "[date]"],
        ["Say", "[theme]", "[action]", "[date]"],
        ["Offer", "[theme]", "[action]", "[date]"],
      ] },
      { kind: "tip", text: "**Not sure which to pick?** Pick the one most clients raised that takes the least work. Do that one first." },
    ] },
    { num: "06", title: "Save it and do it again", accent: "Every 3 months.", blocks: [
      { kind: "p", text: "Clients change. So do your services. A check every 3 months shows what is new. It also shows if your changes worked." },
      { kind: "h3", text: "A. Keep everything in one place" },
      { kind: "list", ordered: true, items: [
        "Look at the left side of ChatGPT. Do you see **Projects** or **New project**? A Project is a folder in ChatGPT that keeps your chats and files together.",
        "If yes, click **New project**. Call it **Client insights**. Upload your insight table into it.",
        "No Projects? Keep your tables in one document, newest at the top.",
        "Can't find Projects? OpenAI moves these menus. Search \"projects\" on [OpenAI's help pages](https://help.openai.com).",
      ] },
      { kind: "h3", text: "B. Set the reminder" },
      { kind: "list", ordered: true, items: [
        "Keep your Client comments document. Add new comments as they come in, with names removed.",
        "Open your calendar. Make an event 3 months from today. Call it **Client comments check**.",
        "On that day, do steps 02 to 05 again on the new comments.",
        "Put the new table next to the old one. Which themes grew? Which went away after your fixes?",
      ] },
      { kind: "honest", text: "**The honest part:** 50 comments are only a small group, not all your clients. Two people can use the same word and mean different things. AI sorts what you give it. It can't talk to your clients or know what they meant. You know the people. Read the quotes before you act. The decisions are yours." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Model training switched off in Data controls",
        "20 to 50 real comments collected, names removed by hand",
        "Clean-up prompt run, and the list of removed details checked",
        "Client insight table saved, with today's date",
        "Two quotes per theme found with Ctrl + F (or Cmd + F)",
        "3 decisions written down, each with a date",
        "Client comments check in your calendar for 3 months from today",
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
