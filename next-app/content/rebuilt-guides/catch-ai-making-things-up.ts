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
    line: "Find every name, number and date in a draft. See where each one came from. Fix the ones that came from nowhere.",
  },
  intro: {
    heading: "A check you run before anything reaches a client",
    lead: "Here is the moment. ChatGPT wrote your proposal in one minute, and it reads well. You are about to press send. But your price was $1,500, and the draft says $1,200. AI sounds just as sure when it is wrong. This guide gives you a short check that finds every detail and says where it came from. You fix the wrong ones before the client ever sees them.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**Every name, number, date and price in your draft found**, with where each one came from",
        "**Every link in your draft opened and read**, so you know the page says what the draft says",
        "**The parts most likely to be wrong**, pointed out before a client points them out",
        "**One saved check you paste in before you send**, so you don't need three prompts each time",
        "**5 things you check by hand**, every time, in under 2 minutes",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer with a web browser, like Chrome. The steps are for the website.",
        "A ChatGPT account. The free plan works. Claude or Gemini work too.",
        "One real draft you are about to send this week: a proposal, a client email or a post.",
        "Your own notes for that draft: the client's email, your call notes or your price list.",
      ] },
      { kind: "tip", text: "Swap client names for brackets before anything goes into AI, like [client] and [price]. The guide on [what to keep out of AI](/guides/what-should-you-never-share-with-ai/) shows how. Every prompt below can be copied and pasted. Change the parts in [square brackets]." },
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
    { num: "01", title: "Mark every detail by hand", accent: "10 minutes. Your first check.", blocks: [
      { kind: "p", text: "AI guesses the most likely next words. Most of the time that is right. When it does not know, it often fills the gap. It adds a number, a date or a name that only sounds right." },
      { kind: "h3", text: "A. Know where mistakes hide" },
      { kind: "list", items: [
        "**Details you did not give it:** a price, a date, a client's job title.",
        "**Details you gave it, but changed:** your $1,500 price becomes $1,200. Tuesday becomes Thursday.",
        "**Facts about the world:** numbers, laws, what a tool can do.",
        "**Sources:** articles, studies and links that do not exist, or say something else.",
        "**Promises:** a delivery date or an extra you never agreed to.",
      ] },
      { kind: "table", head: ["Type of work", "Check first", "Most common mistake"], rows: [
        ["Proposal", "Prices, what is included, dates", "An extra or a deadline you never offered"],
        ["Client email", "Names, dates, times, what you agreed on a call", "A detail from the call changed or added"],
        ["Social post", "Numbers, quotes, claims about results", "A number with no real source"],
        ["Report or summary", "Every number, and if it matches the original", "A point the original never made"],
      ] },
      { kind: "h3", text: "B. Mark the details in your draft" },
      { kind: "list", ordered: true, items: [
        "Open a blank document in Google Docs or Word.",
        "Copy your draft and paste it in.",
        "Read it slowly, one line at a time.",
        "Each time you see a name, number, date, price or promise, select it with your mouse. Then press **Ctrl + B** on Windows, or **Cmd + B** on a Mac. It turns bold.",
        "Now open your own notes next to it. For each bold detail, find it in your notes.",
        "Found it, and it is the same? Leave it. Not found, or different? Highlight it in yellow. In Google Docs, click the pen icon with the letter A in the top bar.",
      ] },
      { kind: "example", label: "A line from a draft", text: "Thanks for your time on Tuesday. As agreed, the website will be ready by 14 March for $1,200, with 2 rounds of changes." },
      { kind: "result", label: "What your marked-up line looks like", lines: [
        "**Tuesday**: in your call notes. Fine.",
        "**14 March**: in your call notes. Fine.",
        "**$1,200**: your notes say $1,500. Yellow.",
        "**2 rounds of changes**: not in your notes at all. Yellow.",
      ] },
      { kind: "p", text: "Every yellow line is a mistake waiting to happen. Fix it from your notes, or delete it. In the next steps, AI does this listing for you, and you check its work." },
      { kind: "tip", text: "**Is a check one day too slow?** Keep this marked-up draft. In step 02 you compare it with what the AI finds. If the AI misses one of your yellow lines, you learn how far to trust it." },
    ] },
    { num: "02", title: "Run the details check", accent: "Every name, number and date.", blocks: [
      { kind: "p", text: "The details check lists every exact detail in the draft. It says where each one came from. A detail with no source is a guess until you check it." },
      { kind: "list", ordered: true, items: [
        "Go to the ChatGPT chat that wrote the draft, if you have it. Then ChatGPT can see what you gave it.",
        "No chat? Click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box.",
        "Swap **[paste your notes...]** for your notes, with names in brackets. Swap **[paste the draft]** for your draft.",
        "Press Enter.",
      ] },
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
      { kind: "result", label: "What a good answer looks like", lines: [
        "Tuesday | date | \"call on Tuesday\" | MATCHES SOURCE",
        "$1,200 | price | \"fee $1,500\" | CHANGED (source says $1,500)",
        "2 rounds of changes | promise | not found | NOT IN SOURCE",
      ] },
      { kind: "h3", text: "What to do with the table" },
      { kind: "list", ordered: true, items: [
        "Fix every **CHANGED** line in your draft. Use what your notes say.",
        "For each **NOT IN SOURCE** line, find the real answer yourself. Or delete it from the draft.",
        "Look at your yellow lines from step 01. Did the AI find all of them? If it missed one, check every table it gives you more slowly.",
      ] },
      { kind: "tip", text: "**No source notes?** Then every detail is NOT IN SOURCE. Check each one by hand. Or ask it to rewrite the draft with [CHECK] in place of each detail it can't back up." },
    ] },
    { num: "03", title: "Check the sources yourself", accent: "Open every link. Find the sentence.", blocks: [
      { kind: "p", text: "Some claims are about the world: numbers, studies, laws, what a product can do. AI can give a link that does not exist. Or a real link that says something different. Only opening it tells you." },
      { kind: "h3", text: "A. Ask for the sources" },
      { kind: "list", ordered: true, items: [
        "Stay in the same chat.",
        "Copy the prompt below and paste it in. Paste your draft where it says [paste the draft].",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Source check", text: `List every claim in this draft that is about the world, not about my business: numbers, studies, laws, dates of events, what a tool or product can do.

The draft:
[paste the draft]

For each one, give me:
Claim | The source (name, publisher, link if you have one) | The exact sentence from that source that supports it | How sure you are (high, medium, low) | What I should search for to check it

Rules:
- If you do not know a real source, write NO SOURCE. Do not invent one.
- Never invent a link, an author, a sentence or a study.
- If the source only partly supports the claim, say so.
- If a claim is your own guess, say so.` },
      { kind: "example", label: "A claim from a draft", text: "Most small businesses now use AI for marketing." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Claim: most small businesses use AI for marketing",
        "Source: NO SOURCE. I can't name a study that says this.",
        "How sure: low",
        "Search for: small business AI use survey [year]",
      ] },
      { kind: "h3", text: "B. Check it yourself" },
      { kind: "list", ordered: true, items: [
        "Click the first link in the answer. It opens in a new tab.",
        "Does the page open? If you see an error, the link is wrong. Cut the claim.",
        "Copy 4 or 5 words from the sentence the AI quoted.",
        "On the page, press **Ctrl + F** on Windows, or **Cmd + F** on a Mac. Paste the words and press Enter.",
        "The words light up in yellow if they are there. Read the sentence and the lines around it.",
        "Does it say exactly what your draft says? Same number, same group of people, same year?",
        "Do the same for every link.",
        "For **NO SOURCE** and **low** lines, search the claim yourself. No good source in a few minutes? Cut the claim.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["The page opens and the words light up", "The source is real", "Keep the claim. Save the link in your notes"],
        ["The page opens, but nothing lights up", "The quoted sentence may be made up", "Read the page. No match? Cut the claim"],
        ["The page is about a different group, place or year", "The claim goes further than the source", "Rewrite the claim to match the page, or cut it"],
        ["The link gives an error or a blank page", "The link may not exist", "Cut the claim, or find a real source yourself"],
      ] },
      { kind: "tip", text: "A link that opens is not proof. Read the page. Find the number or fact with your own eyes." },
    ] },
    { num: "04", title: "Find the weak spots", accent: "What a careful client would question.", blocks: [
      { kind: "p", text: "Some mistakes are not wrong details. A claim goes too far. A promise is one you can't keep. A part does not answer what the client asked. This step finds those." },
      { kind: "h3", text: "A. Ask where it is least sure" },
      { kind: "p", text: "In the same chat, type this short question and press Enter." },
      { kind: "example", label: "What you type", text: "Which parts of your last answer are you least sure about? List up to 3, and say what I should check to confirm each one." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "1. The start date. You did not give me one, so I guessed.",
        "2. The number of changes included. Check your price list.",
      ] },
      { kind: "p", text: "Add each one to your yellow list. The AI does not catch everything this way. But it tells you where to look first." },
      { kind: "h3", text: "B. Read it as your client would" },
      { kind: "list", ordered: true, items: [
        "Copy the prompt below and paste it in the same chat.",
        "Describe your client in the first bracket. Paste the draft and what the client asked for.",
        "Press Enter.",
      ] },
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
      { kind: "result", label: "What a good answer looks like", lines: [
        "\"We guarantee more enquiries\" | No proof is given | high | \"We aim to make it easier for visitors to contact you\"",
        "\"Ready soon\" | The client asked for a date | medium | \"Ready by [date]\"",
      ] },
      { kind: "p", text: "Fix the **high** ones. Read the others and decide. You know the client. The AI does not." },
    ] },
    { num: "05", title: "Save one check for every draft", accent: "One prompt. Five ticks.", blocks: [
      { kind: "p", text: "Three prompts every time is too slow. So put them in one saved check. Then add 5 checks you always do yourself." },
      { kind: "prompt", label: "Check before send", text: `Check this draft before I send it to a client.

My source notes:
[paste notes, the client's email or the call summary]

The draft:
[paste the draft]

Give me three short sections:

1. DETAILS: a table of every name, number, date, price and promise. Columns: Detail | Where it is in my source | MATCHES SOURCE, CHANGED or NOT IN SOURCE.
2. CLAIMS: every claim about the world, with its source and the exact supporting sentence, or NO SOURCE. Never invent a source, a sentence or a link.
3. WEAK SPOTS: the 3 lines a careful client would question, and a safer way to say each.

Do not rewrite the draft. Do not guess. Write [CHECK] wherever you are not sure.` },
      { kind: "h3", text: "A. Save it in a ChatGPT Project" },
      { kind: "p", text: "A Project is a folder in ChatGPT that keeps your files and rules together. Every chat inside it follows the same rules." },
      { kind: "list", ordered: true, items: [
        "In the sidebar on the left, find **Projects**. Click **New project** (on some accounts it is a **+** next to Projects).",
        "Type the name **Check before send**. Click **Create project**. The project page opens.",
        "Find the project's **Instructions** (on some screens, click the three dots or the settings icon at the top of the project first).",
        "Paste the prompt above into the instructions box. Click **Save**.",
        "From now on, open this project and start a chat inside it. Paste your notes and your draft. Press Enter.",
        "Can't find **Projects**? OpenAI moves these menus, and some plans don't have them. Search \"projects\" on [OpenAI's help pages](https://help.openai.com/).",
      ] },
      { kind: "h3", text: "B. No Projects? Save it in your notes" },
      { kind: "list", ordered: true, items: [
        "Open your notes app or a Google Doc.",
        "Make a note called **Check before send**. Paste the prompt in.",
        "Each time you have a draft, copy the prompt into a new chat and fill in the brackets.",
      ] },
      { kind: "h3", text: "C. Your 5 checks by hand" },
      { kind: "p", text: "The AI check helps. These 5 checks are yours, every time. Copy them under the prompt in your note." },
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
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["The AI says everything MATCHES SOURCE, but you found a yellow line", "It missed a mistake", "Trust your own check. Read its tables more slowly next time"],
        ["The AI rewrites the whole draft", "It ignored the rule", "Reply: \"Don't rewrite. Only give me the three sections.\""],
        ["The same mistake gets through twice", "The check needs a new rule", "Add one line to the prompt, for example \"Always check the price against my price list.\""],
      ] },
      { kind: "honest", text: "**The honest part:** AI can't fully check its own work. It can miss its own mistakes. It can say something is fine when it is not. This check catches many problems fast. You still do the final read. You decide when to send." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "One real draft marked by hand, with every wrong detail in yellow",
        "Details check run on that draft, and every CHANGED and NOT IN SOURCE line fixed",
        "Every link in the draft opened, and the sentence found with Ctrl + F (or Cmd + F)",
        "Weak spots checked, and the high ones fixed",
        "Check before send saved in a ChatGPT Project or your notes",
        "Your 5 checks by hand saved next to it",
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
