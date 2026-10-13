import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-is-an-ai-browser",
  lumailTag: "guide-what-is-an-ai-browser",
  title: "What Is an AI Browser and Should I Use One?",
  cover: "/images/guides/what-is-an-ai-browser.webp",
  coverAlt: "The blue robot mascot at an antique viewing instrument, closing a privacy shutter",
  seoDescription: "What is an AI browser? A browser with an assistant that reads pages and can click and type. Set up a safe test profile and try 3 business jobs.",
  tool: "An AI browser (for example ChatGPT Atlas, Comet or Gemini in Chrome)",
  minutes: 30,
  h1: { title: "What Is an AI Browser", accent: "and Should I Use One?" },
  hero: {
    kind: "scene",
    src: "/images/guides/what-is-an-ai-browser.webp",
    alt: "The blue robot mascot at an antique viewing instrument, closing a privacy shutter",
    line: "What it does, and 3 safe ways to try it. Start with reading, then comparing, and stop before anything is sent.",
  },
  intro: {
    heading: "Try it without risking a client account",
    lead: "An AI browser is a web browser with an assistant built in. It can read the page you're on and, in some cases, click and type for you. That is useful for research and risky near your email, bank or client accounts. This guide sets up a safe place to test one and runs 3 business jobs, from safest to riskiest.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A clear answer to what an AI browser does, and which jobs are low or high risk",
        "A **separate test profile** with no saved passwords and no client logins",
        "**3 tested jobs**: summarise a competitor's page, compare two supplier pages, fill a practice form",
        "Your **AI browser rules**: one page on what it may and may not do for your business",
      ] },
      { kind: "tip", text: "You need an AI browser installed, or an AI assistant built into the browser you already use. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Safe Test Setup.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "What an AI browser is", accent: "Reads, and sometimes acts.", blocks: [
      { kind: "p", text: "Know what it can do before you decide where to let it work." },
      { kind: "p", text: "An AI browser looks like a normal browser, with a chat panel beside the page. You ask in plain English and it answers from the page you're on. Some can also **act**: click buttons, type into forms and move between pages for you (this is often called *agent mode*)." },
      { kind: "p", text: "Examples you may have heard of: **ChatGPT Atlas** (from OpenAI), **Comet** (from Perplexity) and **Gemini in Chrome** (from Google). Features and availability change often and differ by country and plan, so check the maker's own website before you install anything." },
      { kind: "table", head: ["What you ask it to do", "Example", "Risk"], rows: [
        ["Read the page you're on", "Summarise a competitor's services page", "Low: nothing is clicked or sent"],
        ["Compare pages you have open", "Line up two suppliers' terms", "Low: you check the quotes"],
        ["Type into a form, then stop", "Fill a practice form without sending it", "Medium: you watch every step"],
        ["Act while signed in", "Send an email, book, buy, reply to a client", "High: mistakes are real and hard to undo"],
      ] },
      { kind: "honest", text: "**Why the risk is real:** a web page can hide instructions written for the AI, not for you. If the assistant is signed in to your email or client tools, it could be pushed to do something you didn't ask for. That is why every job in this guide runs signed out, in a separate profile." },
      { kind: "tip", text: "**Should you use one?** For reading and comparing pages, it can save you time. For anything that sends, buys or replies, not yet. Test it with the steps below and decide for yourself." },
    ] },
    { num: "02", title: "Set up a test profile", accent: "Nothing to lose in it.", blocks: [
      { kind: "p", text: "A browser profile is a separate space with its own logins, history and saved passwords. Your test profile has none, so the assistant can't reach anything that matters." },
      { kind: "list", ordered: true, items: [
        "Open your AI browser and find the profile menu (usually your picture or initial in a top corner).",
        "Choose **Add profile** or **New profile** and name it **AI test**. Don't sign in to it with your main account.",
        "In settings, switch off saving passwords and payment details for this profile, if the option is there.",
        "Don't log in to email, banking, payment tools, your website or any client account in this profile.",
        "Look in the settings for anything about memory, history or training, and read what it says. Switch off what you don't want kept.",
        "Menus change. If you can't find profiles, search \"[browser name] profiles\" on the maker's own help pages.",
      ] },
      { kind: "tip", text: "**Can't make a separate profile?** Use a private or incognito window, signed out of everything, for every job below." },
    ] },
    { num: "03", title: "Job 1: Read a page", accent: "A competitor's page, summarised.", blocks: [
      { kind: "p", text: "Reading is the safest job: the assistant only looks at the page you're on." },
      { kind: "list", ordered: true, items: [
        "In your **AI test** profile, open a competitor's services or pricing page.",
        "Open the assistant panel and paste the prompt below.",
      ] },
      { kind: "prompt", label: "Summarise this page", text: `Read this page only. I run [what your business does] for [who your clients are].

Give me:
1. What they offer, in 3 bullet points
2. Who it is for, in one sentence
3. What they promise, quoting the exact words from the page
4. Anything they say about price or how to buy, quoting the page

Rules:
- Use only what is on this page. Write "Not on the page" where something is missing.
- Never invent names, prices, dates or promises.
- Don't click anything or open other pages.` },
      { kind: "p", text: "Pick two of the quotes and find them on the page yourself (Ctrl+F or Cmd+F). If a quote isn't there, the assistant guessed, and you know how far to trust it." },
    ] },
    { num: "04", title: "Job 2: Compare two pages", accent: "Two suppliers, one table.", blocks: [
      { kind: "p", text: "Comparing saves you flipping between tabs. You still check the quotes." },
      { kind: "list", ordered: true, items: [
        "In your **AI test** profile, open two supplier pages side by side, for example two scheduling tools or two printers you might use for client work.",
        "Paste the prompt below into the assistant panel.",
      ] },
      { kind: "prompt", label: "Compare two pages in a table", text: `Compare the two pages I have open.

Make a table with these columns:
Detail | [supplier 1] | [supplier 2] | Exact words from each page

Compare these details: [the 4 details you care about, for example price, what's included, contract length, cancellation terms]

Rules:
- Use only what is on the two pages.
- Write "Not on the page" wherever a detail is missing.
- Don't recommend one. Don't click anything or open other pages.` },
      { kind: "p", text: "Check every \"Not on the page\" yourself: it may be on another page of their site. Then you decide." },
    ] },
    { num: "05", title: "Job 3: Fill a practice form", accent: "Stop before submit.", blocks: [
      { kind: "p", text: "This is the first job where the assistant acts. You do it on a form you made yourself, so nothing real can happen." },
      { kind: "list", ordered: true, items: [
        "In your main browser, go to [forms.google.com](https://forms.google.com) and make a new blank form called **Practice enquiry** with three questions: Name, Email, Message.",
        "Click the **Preview** icon (an eye) at the top of the form editor, copy the address of the page that opens and paste it into your **AI test** profile. If you can't find Preview, click **Send**, choose the link icon and copy the link instead.",
        "Check the assistant can act in this browser. Some only do this on certain plans or with a setting switched on. If you don't see an option to let it act, skip to step 06.",
        "Paste the prompt below and watch every step.",
      ] },
      { kind: "prompt", label: "Fill the practice form", text: `Fill in the form on this page with these made-up details:
Name: [made-up name]
Email: [made-up email, for example test@example.com]
Message: I'd like to ask about [made-up service].

Stop before you press Submit, Send or any button that finishes the form.
Tell me what you typed into each field, then wait. Don't submit.` },
      { kind: "p", text: "Watch for three things: did it fill the right fields, did it stop before Submit, and did it ask you before doing anything you didn't request? Close the tab without sending." },
      { kind: "tip", text: "**It pressed Submit anyway?** That is exactly what this test is for. Write it down for step 06 and don't let it act on real pages." },
    ] },
    { num: "06", title: "Write your rules", accent: "One page, kept.", blocks: [
      { kind: "p", text: "Your rules say what the AI browser may do for your business, based on what you saw in jobs 1 to 3." },
      { kind: "prompt", label: "Write my AI browser rules", text: `Write my AI browser rules for my business.

Ask me these one at a time and wait for each answer:
1. Which AI browser did I test, and which plan am I on?
2. In job 1 (reading a page), were the quotes accurate?
3. In job 2 (comparing pages), did it miss or invent anything?
4. In job 3 (practice form), did it stop before Submit?
5. Which accounts must it never be signed in to? (for example email, banking, client tools)

Then write one page with these sections:
- What it may do (reading and comparing jobs)
- What it may do only while I watch
- What it must never do (send, buy, book, delete, reply to clients)
- Where it runs (my AI test profile, signed out)
- What I check before I use any answer

Use only what I tell you. Write [CHECK] where I haven't given an answer. Plain English, under 300 words.` },
      { kind: "p", text: "Save the rules as a Doc or note called **AI browser rules** and read them again before you try anything new with it." },
      { kind: "honest", text: "**The honest part:** an AI browser can misread a page, miss a detail or follow instructions hidden on a page. It reads and drafts. You check the quotes, make the decisions and press every button that sends, buys or replies." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "AI test profile set up, with no saved passwords or client logins",
        "Job 1 done: a competitor's page summarised and two quotes checked",
        "Job 2 done: two supplier pages compared in a table",
        "Job 3 done or skipped: practice form filled, not submitted",
        "AI browser rules saved",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know where AI is safe to help.",
    accent: "Now teach it your brand.",
    body: "The Brand Brain guide sets up one Claude project with your brand kit, voice rules and Brand DNA, so everything AI writes for you sounds like you.",
    label: "Build your Brand Brain →",
    href: "/guides/brand-brain-guide/",
  },
  conclusion: {
    heading: "Keep it safe",
    paragraph: "Run every new job in your test profile first, check the quotes before you use an answer, and add a line to your rules each time the assistant surprises you.",
    finishLine: "Let it read. You decide and you press send.",
  },
};
