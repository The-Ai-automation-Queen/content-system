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
    line: "A 2-minute check for names, numbers and facts. Set it up once and run it on every draft.",
  },
  intro: {
    heading: "A check you run before anything reaches a client",
    lead: "AI writes with the same confidence whether it is right or wrong. A wrong price in a proposal or a made-up fact in a post costs you more than the time AI saved. This guide builds a short routine that catches those mistakes, and you use it on a real draft as you go.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A table of **what to check** for each kind of work you send: proposals, emails, posts and reports",
        "A **details check** prompt that lists every name, number, date and price, and where each one came from",
        "A **source check** prompt, and the habit of opening every link before you use it",
        "A **weak-spot** prompt that finds the parts of a draft most likely to be wrong",
        "**Your fact-check routine**: one saved \"check before send\" prompt and a 5-item checklist, used on a real draft",
      ] },
      { kind: "tip", text: "You need ChatGPT (the free plan works) or any AI chat tool, and one real draft you are about to send, with client names swapped for brackets. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get",
    accent: "your fact-check routine.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Know where it goes wrong", accent: "Before you check anything.", blocks: [
      { kind: "p", text: "AI writes the most likely next words. Most of the time that is right. When it doesn't know something, it often fills the gap with something that sounds right: a figure, a date, a name, a source." },
      { kind: "p", text: "The mistakes show up in the same places every time:" },
      { kind: "list", items: [
        "**Details you didn't give it:** a price, a date, a client's job title.",
        "**Details you did give it, changed:** for example, the $1,500 you quoted becomes $1,200, or Tuesday becomes Thursday.",
        "**Facts and figures about the world:** statistics, laws, what a tool can do.",
        "**Sources:** articles, studies and links that don't exist or don't say what it claims.",
        "**Promises:** a delivery date or an extra you never agreed to.",
      ] },
      { kind: "p", text: "Use this table to know what to look at first for each kind of work." },
      { kind: "table", head: ["Type of work", "Check first", "Most common mistake"], rows: [
        ["Proposal", "Prices, scope, dates, what is included", "An extra service or a deadline you never offered"],
        ["Client email", "Names, dates, times, anything agreed on a call", "A detail from the call changed or added"],
        ["Social post", "Figures, quotes, claims about results", "A statistic with no real source"],
        ["Report or summary", "Every number, and whether the summary matches the original", "A point the original never made"],
      ] },
      { kind: "p", text: "Now pick one real draft you are about to send. You will check it with each step below. Swap client names for brackets first, as in the guide on [what to keep out of AI](/guides/what-should-you-never-share-with-ai/)." },
      { kind: "tip", text: "Run the checks in the same chat that wrote the draft if you can, so ChatGPT can see what you gave it. If the draft came from somewhere else, paste your original notes in with it." },
    ] },
    { num: "02", title: "Run the details check", accent: "Every name, number and date.", blocks: [
      { kind: "p", text: "The details check pulls every specific detail out of the draft and says where it came from. Anything with no source is a guess until you prove it." },
      { kind: "prompt", label: "Details check", text: `Check this draft against my source material.

My source material (what I gave you or what is true):
[paste your notes, the client's email or the call summary]

The draft:
[paste the draft]

Make a table with these columns:
Detail | Type (name, number, date, price, promise) | Exactly where it appears in my source material | Status

For Status, write one of:
- MATCHES SOURCE
- CHANGED (say what the source says)
- NOT IN SOURCE

List every detail, even the small ones. Do not fix the draft. Do not guess. If you are not sure, write [CHECK].` },
      { kind: "p", text: "Go through the table. Fix every **CHANGED** line. For every **NOT IN SOURCE** line, either find the real answer yourself or delete it from the draft." },
      { kind: "tip", text: "**No source material?** Then every detail in the draft is NOT IN SOURCE. Check each one by hand, or ask it to rewrite the draft with [CHECK] in place of every detail it can't back up." },
    ] },
    { num: "03", title: "Run the source check", accent: "Then open every link.", blocks: [
      { kind: "p", text: "The source check finds every claim about the world (statistics, research, laws, what a product does) and asks where it comes from. You then check the source yourself." },
      { kind: "prompt", label: "Source check", text: `List every claim in this draft that is about the world, not about my business: statistics, research, laws, dates of events, what a tool or product can do.

The draft:
[paste the draft]

For each one, give me:
Claim | The source (name, publisher, link if you have one) | How confident you are (high, medium, low) | What I should search for to check it

Rules:
- If you do not know a real source, write NO SOURCE. Do not invent one.
- Never invent a link, an author or a study.
- If a claim is your own estimate, say so.` },
      { kind: "p", text: "Now check by hand:" },
      { kind: "list", ordered: true, items: [
        "Open every link. Make sure the page exists and says what the draft claims.",
        "For **NO SOURCE** and **low** lines, search the claim yourself. If you can't find a trustworthy source in a couple of minutes, cut the claim.",
        "Where you keep a claim, add the real source to your notes so you can show it if a client asks.",
      ] },
      { kind: "tip", text: "A link that opens is not proof. Read enough of the page to see the figure or fact with your own eyes." },
    ] },
    { num: "04", title: "Find the weak spots", accent: "What a sharp client would question.", blocks: [
      { kind: "p", text: "Some mistakes are not wrong details. They are claims that go too far, promises you can't keep, or parts that don't fit what the client asked for. The weak-spot check finds those." },
      { kind: "prompt", label: "Weak-spot check", text: `Read this draft as [who the client is, for example "a careful business owner deciding whether to hire me"].

The draft:
[paste the draft]

What the client asked for:
[paste or describe their request]

Find the 5 weakest spots. For each one, give me:
Line | Why a careful reader would question it | How risky it is (low, medium, high) | A safer way to say it

Look for:
- promises about results, deadlines or extras
- claims that sound bigger than the evidence
- anything that does not answer what the client asked
- anything that could be read two ways

Do not rewrite the whole draft. Only flag and suggest.` },
      { kind: "p", text: "Fix the **high** ones. Read the others and decide. You know the client; the AI doesn't." },
    ] },
    { num: "05", title: "Save your routine", accent: "One prompt, five ticks.", blocks: [
      { kind: "p", text: "Running three prompts every time is too slow. Combine them into one saved check, plus a short checklist you do yourself." },
      { kind: "prompt", label: "Check before send", text: `Check this draft before I send it to a client.

My source material:
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
        "**If you see Projects in the left sidebar:** create a project called **Check before send** and paste the prompt into its instructions. Paste each new draft into a chat inside it.",
        "**If you don't:** save the prompt in your notes as **Check before send** and paste it whenever you have a draft to check.",
      ] },
      { kind: "h3", text: "Your 5-item checklist" },
      { kind: "p", text: "The AI check helps. These five ticks are yours, every time:" },
      { kind: "list", ordered: true, items: [
        "Every name is spelled right and is the right person.",
        "Every number, price and date matches your own records.",
        "Every link opens and says what the draft claims.",
        "No promise you didn't agree to.",
        "You would send it with your name on it.",
      ] },
      { kind: "table", head: ["Always check by hand", "Why"], rows: [
        ["Contracts, terms and anything legal", "A wrong word can change what you owe"],
        ["Invoices, prices and anything about money", "A wrong figure costs you or the client"],
        ["Anything about health", "Wrong advice can hurt someone"],
        ["Anything you or the client will sign", "Your signature makes it your promise"],
      ] },
      { kind: "honest", text: "**The honest part:** AI can't fully check its own work. It can miss its own mistakes, and it can mark something as fine when it isn't. The routine catches most problems fast. The final read, and the decision to send, stay with you." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "What-to-check table saved for your main kinds of work",
        "Details check run on a real draft and every NOT IN SOURCE line fixed",
        "Every link in the draft opened and read",
        "Weak spots checked and the high ones fixed",
        "Check before send prompt saved in a project or your notes",
        "5-item checklist saved next to it",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your drafts get checked.",
    accent: "Now check what AI can reach.",
    body: "Before you connect AI to your email, files or calendar, the next guide shows you what it can see and how to give it as little access as possible.",
    label: "Build your AI access list →",
    href: "/guides/connect-ai-to-email-files-calendar/",
  },
  conclusion: {
    heading: "Keep checking",
    paragraph: "Run Check before send on every draft that goes to a client, tick the 5 items yourself, and add a new rule to the prompt whenever the same mistake gets through twice.",
    finishLine: "Two minutes before send beats an apology after.",
  },
};
