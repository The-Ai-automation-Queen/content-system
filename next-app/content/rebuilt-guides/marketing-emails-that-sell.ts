import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "marketing-emails-that-sell",
  lumailTag: "guide-marketing-emails-that-sell",
  title: "How to Write Sales Emails With ChatGPT That Don't Sound Like AI",
  cover: "/images/guides/marketing-emails-that-sell.webp",
  coverAlt: "The blue robot mascot sending envelopes through a line of brass pipes",
  seoDescription: "How to write sales emails with ChatGPT that don't sound like AI: write to one real client, use real proof, check before you send. 6 steps.",
  tool: "ChatGPT",
  minutes: 40,
  h1: { title: "How to Write Sales Emails With ChatGPT", accent: "That Don't Sound Like AI" },
  hero: {
    kind: "scene",
    src: "/images/guides/marketing-emails-that-sell.webp",
    alt: "The blue robot mascot sending envelopes through a line of brass pipes",
    line: "Write to one real client. Show proof, not promises.",
  },
  intro: {
    heading: "Write a sales email that sounds like you",
    lead: "Sales emails to everyone read like adverts. This guide helps you write to one real client, with real proof. It takes 40 minutes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A short picture of one real client**, in their words",
        "**A proof list** of quotes you are allowed to use",
        "**A launch email** in your own voice",
        "**A subject line** that says what is inside",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "sales email prompts.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Pick one real client", accent: "Write to one person.", blocks: [
      { kind: "p", text: "An email to everyone sounds like an advert. An email to one person reads like a note." },
      { kind: "list", ordered: true, items: [
        "Open [Google Docs](https://docs.google.com) and click **Blank document**. Call it **Sales email set**.",
        "Think of one real client who bought something like your offer.",
        "Write [client] instead of their name.",
        "Write the problem they had, in the words they used.",
      ] },
    ] },
    { num: "02", title: "Describe your one reader", accent: "In their words.", blocks: [
      { kind: "p", text: "ChatGPT asks about that client. Then it writes a short description to keep." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and click **New chat**.",
        "Paste the prompt below. Change the offer line.",
        "Answer each question in a sentence or two.",
      ] },
      { kind: "prompt", label: "Ask me about my one reader", text: `Interview me so you can describe the one reader of my sales email.

The offer: [what you're selling, in one line]

Ask me these one at a time and wait for each answer:
1. What is [client]'s work and situation?
2. What problem did they have, in their words?
3. What had they already tried?
4. What nearly stopped them buying?
5. What changed for them afterwards?

Then write: Who they are, Their problem in their words, What they tried, What holds them back, What they want. Under 200 words.

Use only what I tell you. If something is missing, write [CHECK]. Never make up quotes.` },
      { kind: "p", text: "Fix any line that does not sound like your client. Paste it into your document under **One reader**." },
    ] },
    { num: "03", title: "Collect your real proof", accent: "Only what is true and allowed.", blocks: [
      { kind: "p", text: "Proof makes people believe you. ChatGPT must never make it up." },
      { kind: "list", ordered: true, items: [
        "Search your inbox for \"thank you\" and \"so helpful\".",
        "Copy client notes, reviews and results into your document under **Raw proof**.",
        "Swap each name for [client 1], [client 2].",
        "Next to each one, write **yes** if the client said you can use it. Otherwise **not asked**.",
      ] },
      { kind: "prompt", label: "Sort my proof", text: `Sort the proof I can use in my sales emails.

Here is what I have: [paste your raw proof].

Make a table: Proof (word for word) | Type (quote, result, example) | What it proves | Permission (yes, no, [CHECK])

Copy every quote word for word. Use only what I give you. Never make up results, numbers, reviews or names.

After the table, list any claims I make with nothing to back them up.` },
      { kind: "list", ordered: true, items: [
        "Copy 4 or 5 words from each quote you will use.",
        "Press **Ctrl + F** (or **Cmd + F** on a Mac) in **Raw proof** and paste them.",
        "Not the same words? Put the client's real words back.",
        "Save the checked table as **Proof list**.",
      ] },
      { kind: "tip", text: "Use only proof marked yes. Ask the client first." },
    ] },
    { num: "04", title: "Draft the launch email", accent: "Your reader, your proof.", blocks: [
      { kind: "p", text: "Now ChatGPT has what it needs. This puts it together." },
      { kind: "list", ordered: true, items: [
        "Click **New chat**.",
        "Have your Voice Rules from the [Brand Brain guide](/guides/brand-brain-guide/)? Copy them. No? Copy two or three emails you wrote.",
        "Paste the prompt below with your pieces.",
      ] },
      { kind: "prompt", label: "Write my launch email", text: `Write a launch email for my offer.

The offer: [what it is, what's included, when it opens, the price]
The one reader: [paste your One reader text]
The proof: [paste 1 or 2 items marked yes]
My voice: [paste your Voice Rules, or 2 to 3 emails I wrote]
What I want the reader to do: [for example, book a call]

Rules:
- Write to that one reader, using "you". Under 200 words.
- Open with their problem in their words. Then the offer.
- Use the proof exactly as given.
- One link and one clear ask.
- Plain English, short sentences, no dashes, no hype words.

Use only what I give you. If something is missing, write [CHECK]. Never make up names, prices, dates or promises.` },
      { kind: "p", text: "Fill in every [CHECK]. One line wrong? Tell ChatGPT what is true and ask it to change only that line." },
    ] },
    { num: "05", title: "Write the subject line", accent: "Say what is inside.", blocks: [
      { kind: "p", text: "People skip clever subject lines. They open clear ones." },
      { kind: "prompt", label: "Write my subject lines", text: `Give me 5 subject lines for this email.

Each one says exactly what is inside. No teasers, no false urgency, no capitals for emphasis. Under 50 characters each.

Use only what is in the email. Never add a deadline, discount or number that isn't there.

Email: [paste]` },
      { kind: "p", text: "Pick one your reader could guess the email from. Paste it above your email." },
    ] },
    { num: "06", title: "Check it before you send", accent: "Sounds like you, all true.", blocks: [
      { kind: "p", text: "This finds lines that sound like AI and claims your proof does not back." },
      { kind: "list", ordered: true, items: [
        "Click **New chat**, so it checks with fresh eyes.",
        "Paste the prompt below with your voice, proof list and email.",
      ] },
      { kind: "prompt", label: "Check my email", text: `Check this email against my voice and my proof.

My voice: [paste Voice Rules, or 2 to 3 of my emails]
My proof list: [paste]
The email: [paste]

Give me a table: Line | Problem | Suggested fix

Look for:
1. Words I would never use, or that sound like AI
2. Any claim not backed by my proof list
3. Anything written to everyone, not one reader
4. More than one link or ask

List only the lines that need fixing.` },
      { kind: "list", ordered: true, items: [
        "Make the fixes you agree with.",
        "Check the price, date and link yourself. Click the link.",
        "Read the email out loud once, then send it.",
      ] },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Saved your One reader text",
        "Checked every quote word for word",
        "Used only proof marked yes",
        "Picked a clear subject line",
        "Checked price, date and link before sending",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your launch email is ready.",
    accent: "Now plan the launch.",
    body: "The next guide gives you a 30-day launch plan with a date on every task.",
    label: "Plan your launch →",
    href: "/guides/launch-your-product-in-30-days/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Write to one client. Use only real proof. Check every claim before you send.",
    finishLine: "One reader, real proof, your voice.",
  },
};
