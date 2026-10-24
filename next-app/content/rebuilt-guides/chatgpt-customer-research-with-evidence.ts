import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "chatgpt-customer-research-with-evidence",
  lumailTag: "guide-chatgpt-customer-research-with-evidence",
  title: "How to Use ChatGPT to Understand What My Clients Want",
  cover: "/images/guides/chatgpt-customer-research-with-evidence.webp",
  coverAlt: "The blue robot mascot sorting customer notes into labelled evidence trays",
  seoDescription: "How to use ChatGPT to understand what my clients want: sort their real words into themes with quotes, then make 3 choices. 6 steps.",
  tool: "ChatGPT",
  minutes: 45,
  h1: { title: "How to Use ChatGPT to Understand", accent: "What My Clients Want" },
  hero: {
    kind: "scene",
    src: "/images/guides/chatgpt-customer-research-with-evidence.webp",
    alt: "The blue robot mascot sorting customer notes into labelled evidence trays",
    line: "Your clients already told you. Here is how to see it.",
  },
  intro: {
    heading: "See what your clients keep saying",
    lead: "Client comments sit in many places, so you guess. This guide sorts them into themes with real quotes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**One list of client comments**, with names removed",
        "**A theme table** with real quotes behind each theme",
        "**3 decisions**: one to fix, one to say, one to offer",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "client insight table.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Switch off model training", accent: "Before any client words.", blocks: [
      { kind: "p", text: "Model training lets OpenAI (the company behind ChatGPT) use your chats to improve its AI. Switch it off first." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and sign in.",
        "Click your name or picture, then **Settings**.",
        "Click **Data controls**.",
        "Turn off **Improve the model for everyone**.",
      ] },
      { kind: "tip", text: "Can't find it? OpenAI moves this menu. See [OpenAI's data controls help page](https://help.openai.com/en/articles/7730893-chatgpt-data-controls-faq)." },
    ] },
    { num: "02", title: "Collect their words", accent: "Names out.", blocks: [
      { kind: "p", text: "Clients tell you what they want every week. Put 20 to 50 comments in one place." },
      { kind: "list", ordered: true, items: [
        "Open [Google Docs](https://docs.google.com) and click **Blank document**. Call it **Client comments**.",
        "Copy happy and unhappy comments from the places below. One per line, exactly as written.",
        "Start each line with where it came from: review, DM, email, survey or call.",
        "Swap each name for an ID like C01. Same person, same ID.",
        "Delete emails, phone numbers, company names, and any health or money details.",
      ] },
      { kind: "table", head: ["Where", "What to copy"], rows: [
        ["Reviews", "Google reviews, LinkedIn recommendations"],
        ["Messages", "Questions before and after people bought"],
        ["Emails", "Questions, thank-you notes, complaints"],
        ["Surveys", "Feedback and welcome form answers"],
        ["Call notes", "The client's words, not your summary"],
      ] },
      { kind: "tip", text: "Keep the list of IDs and names on paper or in a separate file. Never put it in ChatGPT." },
    ] },
    { num: "03", title: "Run a privacy check", accent: "Catch what you missed.", blocks: [
      { kind: "p", text: "This finds personal details you missed. It also puts every comment in one table." },
      { kind: "prompt", label: "Clean up my client comments", text: `Clean up these client comments. Do only this:
1. Replace any person's name with an ID (C01, C02...). Keep IDs that are already there.
2. Remove email addresses, phone numbers, street addresses, company names, and any health or money details.
3. Keep the client's words exactly as written. Don't fix spelling or shorten.
4. Give it back as a table: ID | Source | Comment

After the table, list everything you removed.

Comments:
[paste your comments]` },
      { kind: "p", text: "Read what it removed. Delete anything personal still there. Paste the table into your document." },
    ] },
    { num: "04", title: "Find the themes", accent: "With the quotes behind them.", blocks: [
      { kind: "p", text: "A theme is something several clients say. Quotes let you check it." },
      { kind: "prompt", label: "Build my theme table", text: `Here are my client comments: [paste the clean table].

Group them into themes. Give me a table:
Theme | Type (complaint, praise, question, request) | Number of clients | Client IDs | 2 exact quotes from different clients

Rules:
- A theme needs at least 2 different clients. Put single comments under "Early signals".
- Copy quotes word for word. Never write or change a quote.
- Count clients, not comments.

Then list "Disagreements": where some clients want the opposite of others, with their IDs.` },
      { kind: "p", text: "Paste the answer into a new document called **Client insight table**. Add today's date." },
    ] },
    { num: "05", title: "Check every quote", accent: "One theme at a time.", blocks: [
      { kind: "p", text: "ChatGPT can change a quote or mix up clients. Check before you trust it." },
      { kind: "list", ordered: true, items: [
        "Copy 4 or 5 words from a quote in your insight table.",
        "In **Client comments**, press **Ctrl + F** (or **Cmd + F** on a Mac) and paste them.",
        "Same words, same ID? Keep it. Wrong ID? Fix it.",
        "Nothing found? Ask ChatGPT the prompt below.",
      ] },
      { kind: "prompt", label: "Where is this quote from?", text: `Which comment did this quote come from? Copy it exactly: [paste the quote]
If it is not in my comments, write NOT FOUND.` },
      { kind: "p", text: "Delete any theme with a NOT FOUND quote. Move themes with 1 real client to Early signals." },
    ] },
    { num: "06", title: "Make 3 decisions", accent: "AI suggests, you decide.", blocks: [
      { kind: "p", text: "A table decides nothing. Turn it into options, then pick." },
      { kind: "prompt", label: "Turn themes into options", text: `Here is my client insight table: [paste].
Here is what I sell: [your services, one line each].

Suggest options in three groups:
1. Fix: something clients complain about in how I work
2. Say: worries I should answer on my website or in emails, in the clients' own words
3. Offer: something clients ask for that I could add, change or stop

For each: the theme | how many clients raised it | effort (small, medium, large).

Use only what is in the table. Never make up prices, results or promises.` },
      { kind: "list", ordered: true, items: [
        "Pick one fix, one thing to say and one thing to offer.",
        "Write each one down with a date.",
        "Add a calendar event in 3 months: **Client comments check**. Do it again with new comments.",
      ] },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Switched off model training",
        "Collected 20 to 50 comments, names removed",
        "Ran the privacy check",
        "Checked two quotes per theme",
        "Wrote down 3 decisions, each with a date",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know what clients want.",
    accent: "Now test your next idea.",
    body: "The next guide checks a new offer with five critics and a one-week test with real people.",
    label: "Test your idea →",
    href: "/guides/test-business-idea-with-ai/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Remove names first. Let ChatGPT sort. Check the quotes before you act.",
    finishLine: "Their words, sorted. Your decisions.",
  },
};
