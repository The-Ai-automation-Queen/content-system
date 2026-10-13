import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "catch-ai-making-things-up",
  lumailTag: "guide-catch-ai-making-things-up",
  title: "How to Check if ChatGPT Is Wrong Before You Send It to a Client",
  cover: "/images/guides/catch-ai-making-things-up.webp",
  coverAlt: "The blue robot mascot measuring a printed list and marking the wrong lines in red",
  seoDescription: "How to check if ChatGPT is wrong before a client sees it: 3 check prompts and a 5-item checklist for names, numbers, prices, dates and sources.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Check if ChatGPT Is Wrong", accent: "Before You Send It to a Client" },
  hero: {
    kind: "scene",
    src: "/images/guides/catch-ai-making-things-up.webp",
    alt: "The blue robot mascot measuring a printed list and marking the wrong lines in red",
    line: "A 2-minute check for names, numbers and facts. Set it up once. Use it on every draft.",
  },
  intro: {
    heading: "A check you run before anything reaches a client",
    lead: "AI sounds just as sure when it is wrong. A wrong price or a made-up fact can cost you a client. This guide gives you a short check. You try it on a real draft as you go.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A table of **what to check** for proposals, emails, posts and reports",
        "A **details check** prompt: every name, number, date and price, and where it came from",
        "A **source check** prompt, and the habit of opening every link",
        "A **weak-spot** prompt that finds the parts most likely to be wrong",
        "**Your fact-check routine**: one saved \"check before send\" prompt and a 5-item checklist",
      ] },
      { kind: "tip", text: "You need ChatGPT or any AI chat tool. The free plan works. You also need one real draft you are about to send. Swap client names for brackets first. You can copy and paste every prompt below. Change the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get",
    accent: "your fact-check routine.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Know where it goes wrong", accent: "Before you check anything.", blocks: [
      { kind: "p", text: "AI guesses the most likely next words. Most of the time that is right. When it does not know, it often fills the gap. It adds a number, date, name or source that only sounds right." },
      { kind: "p", text: "The mistakes show up in the same places every time:" },
      { kind: "list", items: [
        "**Details you did not give it:** a price, a date, a client's job title.",
        "**Details you gave it, but changed:** your $1,500 price becomes $1,200. Tuesday becomes Thursday.",
        "**Facts about the world:** numbers, laws, what a tool can do.",
        "**Sources:** articles, studies and links that do not exist or say something else.",
        "**Promises:** a delivery date or an extra you never agreed to.",
      ] },
      { kind: "p", text: "Use this table to see what to check first for each kind of work." },
      { kind: "table", head: ["Type of work", "Check first", "Most common mistake"], rows: [
        ["Proposal", "Prices, what is included, dates", "An extra or a deadline you never offered"],
        ["Client email", "Names, dates, times, what you agreed on a call", "A detail from the call changed or added"],
        ["Social post", "Numbers, quotes, claims about results", "A number with no real source"],
        ["Report or summary", "Every number, and if it matches the original", "A point the original never made"],
      ] },
      { kind: "p", text: "Now pick one real draft you are about to send. You check it in each step below. First swap client names for brackets. The guide on [what to keep out of AI](/guides/what-should-you-never-share-with-ai/) shows how." },
      { kind: "tip", text: "If you can, do the checks in the chat that wrote the draft. Then ChatGPT can see what you gave it. Did the draft come from somewhere else? Paste your first notes in with it." },
    ] },
    { num: "02", title: "Run the details check", accent: "Every name, number and date.", blocks: [
      { kind: "p", text: "The details check lists every exact detail in the draft. It says where each one came from. A detail with no source is a guess until you check it." },
      { kind: "prompt", label: "Details check", text: `Check this draft against my source notes.

My source notes (what I gave you or what is true):
[paste your notes, the client's email or the call summary]

The draft:
[paste the draft]

Make a table with these columns:
Detail | Type (name, number, date, price, promise) | Exactly where it appears in my source notes | Status

For Status, write one of:
- MATCHES SOURCE
- CHANGED (say what the source says)
- NOT IN SOURCE

List every detail, even the small ones. Do not fix the draft. Do not guess. If you are not sure, write [CHECK].` },
      { kind: "p", text: "Go through the table. Fix every **CHANGED** line. For each **NOT IN SOURCE** line, find the real answer yourself. Or delete it from the draft." },
      { kind: "tip", text: "**No source notes?** Then every detail is NOT IN SOURCE. Check each one by hand. Or ask it to rewrite the draft with [CHECK] in place of each detail it can't back up." },
    ] },
    { num: "03", title: "Run the source check", accent: "Then open every link.", blocks: [
      { kind: "p", text: "The source check finds every claim about the world. That means numbers, studies, laws and what a product does. It asks where each one comes from. Then you check the source yourself." },
      { kind: "prompt", label: "Source check", text: `List every claim in this draft that is about the world, not about my business: numbers, studies, laws, dates of events, what a tool or product can do.

The draft:
[paste the draft]

For each one, give me:
Claim | The source (name, publisher, link if you have one) | How sure you are (high, medium, low) | What I should search for to check it

Rules:
- If you do not know a real source, write NO SOURCE. Do not invent one.
- Never invent a link, an author or a study.
- If a claim is your own guess, say so.` },
      { kind: "p", text: "Now check by hand:" },
      { kind: "list", ordered: true, items: [
        "Open every link. Make sure the page exists and says what the draft says.",
        "For **NO SOURCE** and **low** lines, search the claim yourself. No good source in a couple of minutes? Cut the claim.",
        "If you keep a claim, save the real source in your notes. Then you can show it if a client asks.",
      ] },
      { kind: "tip", text: "A link that opens is not proof. Read the page. Find the number or fact with your own eyes." },
    ] },
    { num: "04", title: "Find the weak spots", accent: "What a sharp client would question.", blocks: [
      { kind: "p", text: "Some mistakes are not wrong details. A claim goes too far. A promise is one you can't keep. A part does not match what the client asked. The weak-spot check finds these." },
      { kind: "prompt", label: "Weak-spot check", text: `Read this draft as [who the client is, for example "a careful business owner deciding whether to hire me"].

The draft:
[paste the draft]

What the client asked for:
[paste or describe their request]

Find the 5 weakest spots. For each one, give me:
Line | Why a careful reader would question it | How risky it is (low, medium, high) | A safer way to say it

Look for:
- promises about results, deadlines or extras
- claims that sound bigger than the proof
- anything that does not answer what the client asked
- anything that could be read two ways

Do not rewrite the whole draft. Only point out and suggest.` },
      { kind: "p", text: "Fix the **high** ones. Read the others and decide. You know the client. The AI does not." },
    ] },
    { num: "05", title: "Save your routine", accent: "One prompt, five ticks.", blocks: [
      { kind: "p", text: "Three prompts every time is too slow. Put them in one saved check. Add a short checklist you do yourself." },
      { kind: "prompt", label: "Check before send", text: `Check this draft before I send it to a client.

My source notes:
[paste notes, the client's email or the call summary]

The draft:
[paste the draft]

Give me three short sections:

1. DETAILS: a table of every name, number, date, price and promise. Columns: Detail | Where it is in my source | MATCHES SOURCE, CHANGED or NOT IN SOURCE.
2. CLAIMS: every claim about the world, with its source or NO SOURCE. Never invent a source or a link.
3. WEAK SPOTS: the 3 lines a careful client would question, and a safer way to say each.

Do not rewrite the draft. Do not guess. Write [CHECK] wherever you are not sure.` },
      { kind: "p", text: "Save it where you will find it:" },
      { kind: "list", ordered: true, items: [
        "**Do you see Projects in the left sidebar?** A Project is a folder in ChatGPT that keeps your files and rules. Make one called **Check before send**. Paste the prompt into its instructions (the rules for every chat in it). Paste each new draft into a chat inside it.",
        "**No Projects?** Save the prompt in your notes as **Check before send**. Paste it each time you have a draft to check.",
      ] },
      { kind: "h3", text: "Your 5-item checklist" },
      { kind: "p", text: "The AI check helps. These 5 checks are yours, every time:" },
      { kind: "list", ordered: true, items: [
        "Every name is spelled right and is the right person.",
        "Every number, price and date matches your own records.",
        "Every link opens and says what the draft says.",
        "No promise you did not agree to.",
        "You would send it with your name on it.",
      ] },
      { kind: "table", head: ["Always check by hand", "Why"], rows: [
        ["Contracts, terms and anything legal", "A wrong word can change what you owe"],
        ["Invoices, prices and money", "A wrong number costs you or the client"],
        ["Anything about health", "Wrong advice can hurt someone"],
        ["Anything you or the client will sign", "Your signature makes it your promise"],
      ] },
      { kind: "honest", text: "**The honest part:** AI can't fully check its own work. It can miss its own mistakes. It can say something is fine when it is not. This check catches most problems fast. You still do the final read. You decide when to send." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Saved the what-to-check table for your main kinds of work",
        "Ran the details check on a real draft and fixed every NOT IN SOURCE line",
        "Opened and read every link in the draft",
        "Checked the weak spots and fixed the high ones",
        "Saved the Check before send prompt in a project or your notes",
        "Saved the 5-item checklist next to it",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your drafts get checked.",
    accent: "Now check what AI can reach.",
    body: "Are you about to connect AI to your email, files or calendar? The next guide shows what it can see. It also shows how to let it see as little as possible.",
    label: "Make your AI access list →",
    href: "/guides/connect-ai-to-email-files-calendar/",
  },
  conclusion: {
    heading: "Keep checking",
    paragraph: "Run Check before send on every draft for a client. Do the 5 checks yourself. If the same mistake gets through twice, add a new rule to the prompt.",
    finishLine: "Two minutes before you send. No sorry email after.",
  },
};
