import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-is-an-ai-browser",
  lumailTag: "guide-what-is-an-ai-browser",
  title: "What Is an AI Browser and Should I Use One?",
  cover: "/images/guides/what-is-an-ai-browser.webp",
  coverAlt: "The blue robot mascot at an antique viewing instrument, closing a privacy shutter",
  seoDescription: "What is an AI browser? A browser with an AI assistant that reads pages and can click for you. Try one safely in 5 steps.",
  tool: "An AI browser (for example ChatGPT Atlas, Comet or Gemini in Chrome)",
  minutes: 30,
  h1: { title: "What Is an AI Browser", accent: "and Should I Use One?" },
  hero: {
    kind: "scene",
    src: "/images/guides/what-is-an-ai-browser.webp",
    alt: "The blue robot mascot at an antique viewing instrument, closing a privacy shutter",
    line: "A browser with an AI assistant built in. Here is how to try one safely.",
  },
  intro: {
    heading: "Try an AI browser safely",
    lead: "An AI browser reads pages and clicks for you, which is risky near your email. This guide sets up a safe space and tries 3 jobs. It takes 30 minutes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A safe test profile** with no saved logins",
        "**A rival's page summed up**, with quotes you checked",
        "**Two suppliers compared** in one table",
        "**Your AI browser rules** on one page",
      ] },
      { kind: "tip", text: "You need a computer and an AI browser, like ChatGPT Atlas, Comet or Gemini in Chrome. Free plans can read pages. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "safe test setup.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Make a safe space", accent: "Done once.", blocks: [
      { kind: "p", text: "An AI browser has a chat panel beside the page. Some can also click and type for you (agent mode)." },
      { kind: "table", head: ["Job", "Risk"], rows: [
        ["Read the page you are on", "Low: nothing is sent"],
        ["Compare two open pages", "Low: you check the quotes"],
        ["Fill a form, then stop", "Medium: you watch every step"],
        ["Act while signed in", "High: mistakes are real"],
      ] },
      { kind: "list", ordered: true, items: [
        "Open your AI browser. Click your picture or letter in the top corner.",
        "Click **Add profile**. Skip signing in.",
        "Name it **AI test** and click **Done**.",
        "In **Settings**, switch off saving passwords and cards.",
        "Never log in to email, banking or client accounts in this window.",
      ] },
      { kind: "honest", text: "**Why it matters:** a web page can hide orders meant for the AI assistant. If it is signed in to your email, a page could push it to act. So every job here runs signed out." },
      { kind: "tip", text: "Can't find it? Search \"profiles\" on [Google Chrome help](https://support.google.com/chrome) or [OpenAI's help pages](https://help.openai.com). Or use a private window." },
    ] },
    { num: "02", title: "Sum up a rival's page", accent: "The safest job.", blocks: [
      { kind: "p", text: "Reading is safe. Nothing is clicked or sent." },
      { kind: "list", ordered: true, items: [
        "In your **AI test** window, open a rival's services or pricing page.",
        "Open the AI assistant's chat panel.",
        "Paste the prompt below and press Enter.",
      ] },
      { kind: "prompt", label: "Sum up this page", text: `Read this page only. I run [what your business does] for [who your clients are].

Give me:
1. What they offer, in 3 bullet points
2. Who it is for, in one sentence
3. What they promise, quoting the exact words
4. What they say about price or how to buy, quoting the page

Use only what is on this page. Write "Not on the page" where something is missing.
Never make up names, prices, dates or promises.
Do not click anything or open other pages.` },
      { kind: "list", ordered: true, items: [
        "Copy a few words from one quote.",
        "Click on the page. Press **Ctrl + F** (or **Cmd + F** on a Mac) and paste.",
        "No match? It made the quote up. Do not use the answer.",
      ] },
    ] },
    { num: "03", title: "Compare two suppliers", accent: "Two pages, one table.", blocks: [
      { kind: "p", text: "No more jumping between tabs. You still check the quotes." },
      { kind: "list", ordered: true, items: [
        "In your **AI test** window, open each supplier's page in its own tab.",
        "Open the chat panel. If it sees one tab only, add the other (often **+** or **@**).",
        "Paste the prompt below and press Enter.",
      ] },
      { kind: "prompt", label: "Compare two pages", text: `Compare the two pages I have open.

Table: Detail | [supplier 1] | [supplier 2] | Exact words from each page

Details: [price, what's included, contract length, how to cancel]

Use only what is on the two pages. Write "Not on the page" where a detail is missing.
Do not recommend one. Do not click anything.` },
      { kind: "p", text: "Check 2 quotes with **Ctrl + F**. Look up every \"Not on the page\" yourself. Then you decide." },
    ] },
    { num: "04", title: "Fill a practice form", accent: "Stop before you send.", blocks: [
      { kind: "p", text: "Now it acts for the first time. Use a form you made, so nothing real happens." },
      { kind: "list", ordered: true, items: [
        "In your normal browser, open [Google Forms](https://forms.google.com) and click **Blank form**.",
        "Add three questions: Name, Email, Message.",
        "Click **Preview** (the eye). Copy that web address.",
        "Open it in your **AI test** window. Switch on **Agent mode**. Not on your plan? Skip to step 05.",
        "Paste the prompt below. Watch. Do not click while it works.",
      ] },
      { kind: "prompt", label: "Fill the practice form", text: `Fill in the form on this page with these made-up details:
Name: [made-up name]
Email: test@example.com
Message: I'd like to ask about [made-up service].

Stop before you press Submit, Send or any button that finishes the form.
Tell me what you typed into each field, then wait.` },
      { kind: "p", text: "Did it stop before **Submit**? Close the tab. In your form, **Responses** should say 0." },
    ] },
    { num: "05", title: "Write your rules", accent: "One page, kept.", blocks: [
      { kind: "p", text: "Your rules come from what you just saw." },
      { kind: "prompt", label: "Write my AI browser rules", text: `Write my AI browser rules for my business.

Ask me these one at a time and wait for each answer:
1. Which AI browser and plan did I test?
2. When it read a page, were the quotes right?
3. When it compared pages, did it miss or make up anything?
4. Did it stop before Submit on the practice form?
5. Which accounts must it never be signed in to?

Then write one page:
- What it may do
- What it may do only while I watch
- What it must never do (send, buy, book, delete, reply to clients)
- Where it runs (my AI test profile, signed out)

Use only what I tell you. If something is missing, write [CHECK]. Plain English, under 300 words.` },
      { kind: "p", text: "Fill every **[CHECK]**. Save it as **AI browser rules**." },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "AI test profile made, signed out",
        "One rival page summed up and 2 quotes found",
        "Two suppliers compared in a table",
        "Practice form filled and not sent",
        "AI browser rules saved",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know where AI is safe to help.",
    accent: "Now teach it your brand.",
    body: "The Brand Brain guide sets up one Claude project (a folder that remembers your files). Then AI writes like you.",
    label: "Build your Brand Brain →",
    href: "/guides/brand-brain-guide/",
  },
  conclusion: {
    heading: "Keep it safe",
    paragraph: "Try every new job in your test profile first. Check 2 quotes before you use an answer.",
    finishLine: "Let it read. You press send.",
  },
};
