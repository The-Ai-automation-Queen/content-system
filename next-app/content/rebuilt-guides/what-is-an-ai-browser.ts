import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-is-an-ai-browser",
  lumailTag: "guide-what-is-an-ai-browser",
  title: "What Is an AI Browser and Should I Use One?",
  cover: "/images/guides/what-is-an-ai-browser.webp",
  coverAlt: "The blue robot mascot at an antique viewing instrument, closing a privacy shutter",
  seoDescription: "What is an AI browser? A web browser with an AI assistant that reads pages and can click and type. Set up a safe test space and try 3 business jobs.",
  tool: "An AI browser (for example ChatGPT Atlas, Comet or Gemini in Chrome)",
  minutes: 30,
  h1: { title: "What Is an AI Browser", accent: "and Should I Use One?" },
  hero: {
    kind: "scene",
    src: "/images/guides/what-is-an-ai-browser.webp",
    alt: "The blue robot mascot at an antique viewing instrument, closing a privacy shutter",
    line: "What it does, and 3 safe ways to try it. First reading, then comparing. You stop before anything is sent.",
  },
  intro: {
    heading: "Try it without risking a client account",
    lead: "An AI browser is a web browser with an AI assistant built in. The assistant reads the page you're on. Some can also click and type for you. That helps with research. It is risky near your email, bank or client accounts. This guide sets up a safe place to test one. Then you try 3 business jobs, from safest to riskiest.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "What an AI browser does, and which jobs are low or high risk",
        "A **separate test profile** with no saved passwords and no client logins",
        "**3 tested jobs**: sum up a rival's page, compare two supplier pages, fill a practice form",
        "Your **AI browser rules**: one page on what it may and may not do for you",
      ] },
      { kind: "tip", text: "You need an AI browser, or an AI assistant built into the browser you already use. You can copy and paste every prompt below as it is. Replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Safe Test Setup.",
    promise: "Enter your name and email. The rest of the guide opens straight away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "What an AI browser is", accent: "Reads, and sometimes acts.", blocks: [
      { kind: "p", text: "Learn what it can do first. Then decide where to let it work." },
      { kind: "p", text: "An AI browser looks like a normal browser. It has a chat panel beside the page. You ask in plain English. It answers from the page you're on. Some can also **act**. They click buttons, type into forms and move between pages for you. This is often called *agent mode*." },
      { kind: "p", text: "You may have heard of these: **ChatGPT Atlas** (from OpenAI), **Comet** (from Perplexity) and **Gemini in Chrome** (from Google). What they can do changes often. It also depends on your country and plan. Check the maker's own website before you install anything." },
      { kind: "table", head: ["What you ask it to do", "Example", "Risk"], rows: [
        ["Read the page you're on", "Sum up a rival's services page", "Low: nothing is clicked or sent"],
        ["Compare pages you have open", "Put two suppliers' terms side by side", "Low: you check the quotes"],
        ["Type into a form, then stop", "Fill a practice form without sending it", "Medium: you watch every step"],
        ["Act while signed in", "Send an email, book, buy, reply to a client", "High: mistakes are real and hard to undo"],
      ] },
      { kind: "honest", text: "**Why the risk is real:** a web page can hide orders written for the AI, not for you. Is the assistant signed in to your email or client tools? Then a page could push it to do something you didn't ask for. So every job in this guide runs signed out, in a separate profile." },
      { kind: "tip", text: "**Should you use one?** For reading and comparing pages, it can save you time. For anything that sends, buys or replies, not yet. Test it with the steps below. Then decide for yourself." },
    ] },
    { num: "02", title: "Set up a test profile", accent: "Nothing to lose in it.", blocks: [
      { kind: "p", text: "A browser profile is a separate space in your browser. It has its own logins, history and saved passwords. Your test profile has none of these. So the assistant can't reach anything that matters." },
      { kind: "list", ordered: true, items: [
        "Open your AI browser. Find the profile menu. It is usually your picture or first letter in a top corner.",
        "Choose **Add profile** or **New profile**. Name it **AI test**. Don't sign in to it with your main account.",
        "In settings, switch off saving passwords and payment details for this profile, if you can.",
        "In this profile, don't log in to email, banking, payment tools, your website or any client account.",
        "In settings, look for memory, history or training. Read what each one says. Switch off what you don't want kept.",
        "Menus change. Can't find profiles? Search \"[browser name] profiles\" on the maker's own help pages.",
      ] },
      { kind: "tip", text: "**Can't make a separate profile?** Use a private or incognito window (a window that saves nothing). Stay signed out of everything for every job below." },
    ] },
    { num: "03", title: "Job 1: Read a page", accent: "A rival's page, summed up.", blocks: [
      { kind: "p", text: "Reading is the safest job. The assistant only looks at the page you're on." },
      { kind: "list", ordered: true, items: [
        "In your **AI test** profile, open a rival's services or pricing page.",
        "Open the assistant panel. Paste the prompt below.",
      ] },
      { kind: "prompt", label: "Sum up this page", text: `Read this page only. I run [what your business does] for [who your clients are].

Give me:
1. What they offer, in 3 bullet points
2. Who it is for, in one sentence
3. What they promise, quoting the exact words from the page
4. Anything they say about price or how to buy, quoting the page

Rules:
- Use only what is on this page. Write "Not on the page" where something is missing.
- Never make up names, prices, dates or promises.
- Don't click anything or open other pages.` },
      { kind: "p", text: "Pick two of the quotes. Find them on the page yourself (press Ctrl+F or Cmd+F). Is a quote not there? Then the assistant guessed. Now you know how far to trust it." },
    ] },
    { num: "04", title: "Job 2: Compare two pages", accent: "Two suppliers, one table.", blocks: [
      { kind: "p", text: "Comparing saves you jumping between tabs. You still check the quotes." },
      { kind: "list", ordered: true, items: [
        "In your **AI test** profile, open two supplier pages side by side. For example, two booking tools or two printers for client work.",
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
      { kind: "p", text: "Check every \"Not on the page\" yourself. It may be on another page of their site. Then you decide." },
    ] },
    { num: "05", title: "Job 3: Fill a practice form", accent: "Stop before submit.", blocks: [
      { kind: "p", text: "In this job the assistant acts for the first time. You use a form you made yourself. So nothing real can happen." },
      { kind: "list", ordered: true, items: [
        "In your main browser, go to [forms.google.com](https://forms.google.com). Make a new blank form called **Practice enquiry**. Give it three questions: Name, Email, Message.",
        "Click the **Preview** icon (an eye) at the top of the form. A new page opens. Copy its address and paste it into your **AI test** profile. Can't find Preview? Click **Send**, choose the link icon and copy the link.",
        "Check that the assistant can act in this browser. Some only can on certain plans, or with a setting switched on. No option to let it act? Skip to step 06.",
        "Paste the prompt below. Watch every step.",
      ] },
      { kind: "prompt", label: "Fill the practice form", text: `Fill in the form on this page with these made-up details:
Name: [made-up name]
Email: [made-up email, for example test@example.com]
Message: I'd like to ask about [made-up service].

Stop before you press Submit, Send or any button that finishes the form.
Tell me what you typed into each field, then wait. Don't submit.` },
      { kind: "p", text: "Watch for three things. Did it fill the right boxes? Did it stop before Submit? Did it ask you before doing anything you didn't ask for? Close the tab without sending." },
      { kind: "tip", text: "**It pressed Submit anyway?** That is why you ran this test. Write it down for step 06. Don't let it act on real pages." },
    ] },
    { num: "06", title: "Write your rules", accent: "One page, kept.", blocks: [
      { kind: "p", text: "Your rules say what the AI browser may do for your business. They come from what you saw in jobs 1 to 3." },
      { kind: "prompt", label: "Write my AI browser rules", text: `Write my AI browser rules for my business.

Ask me these one at a time and wait for each answer:
1. Which AI browser did I test, and which plan am I on?
2. In job 1 (reading a page), were the quotes right?
3. In job 2 (comparing pages), did it miss or make up anything?
4. In job 3 (practice form), did it stop before Submit?
5. Which accounts must it never be signed in to? (for example email, banking, client tools)

Then write one page with these sections:
- What it may do (reading and comparing jobs)
- What it may do only while I watch
- What it must never do (send, buy, book, delete, reply to clients)
- Where it runs (my AI test profile, signed out)
- What I check before I use any answer

Use only what I tell you. Write [CHECK] where I haven't given an answer. Plain English, under 300 words.` },
      { kind: "p", text: "Save the rules as a Doc or note called **AI browser rules**. Read them again before you try anything new with it." },
      { kind: "honest", text: "**The honest part:** an AI browser can misread a page or miss a detail. It can follow orders hidden on a page. It reads and drafts. You check the quotes and make the choices. You press every button that sends, buys or replies." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "AI test profile set up, with no saved passwords or client logins",
        "Job 1 done: a rival's page summed up and two quotes checked",
        "Job 2 done: two supplier pages compared in a table",
        "Job 3 done or skipped: practice form filled, not sent",
        "AI browser rules saved",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know where AI is safe to help.",
    accent: "Now teach it your brand.",
    body: "The Brand Brain guide sets up one Claude project (a folder that remembers your files). It holds your brand look, voice rules and Brand DNA. Then everything AI writes for you sounds like you.",
    label: "Build your Brand Brain →",
    href: "/guides/brand-brain-guide/",
  },
  conclusion: {
    heading: "Keep it safe",
    paragraph: "Run every new job in your test profile first. Check the quotes before you use an answer. Each time the assistant surprises you, add a line to your rules.",
    finishLine: "Let it read. You decide and you press send.",
  },
};
