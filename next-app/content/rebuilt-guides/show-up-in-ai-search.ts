import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "show-up-in-ai-search",
  lumailTag: "guide-show-up-in-ai-search",
  title: "How to Get ChatGPT to Recommend My Business",
  cover: "/images/guides/show-up-in-ai-search.webp",
  coverAlt: "The blue robot mascot placing a clearly labelled sign where a searchlight can find it",
  seoDescription: "How to get ChatGPT to recommend my business: see what AI says about you, fix the wrong facts and make your services page clear. 6 steps.",
  tool: "ChatGPT, Gemini or Perplexity",
  minutes: 45,
  h1: { title: "How to Get ChatGPT to Recommend", accent: "My Business" },
  hero: {
    kind: "scene",
    src: "/images/guides/show-up-in-ai-search.webp",
    alt: "The blue robot mascot placing a clearly labelled sign where a searchlight can find it",
    line: "See what AI tells clients about you. Then fix it.",
  },
  intro: {
    heading: "See what AI tells clients",
    lead: "A client asks ChatGPT who can help, and you are not named. This guide shows what AI finds about you and how to fix it. It takes 45 minutes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A list of your public pages**, each one checked",
        "**Your \"before\" answer**: who AI suggests to your clients",
        "**Wrong facts fixed** on Google, LinkedIn and listings",
        "**A clear services page** that AI can repeat",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "AI visibility audit.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "List your public pages", accent: "What AI reads.", blocks: [
      { kind: "p", text: "AI tools read the same public pages a client finds. If they are wrong, the answer about you is wrong." },
      { kind: "list", ordered: true, items: [
        "Open [Google Docs](https://docs.google.com) and click **Blank document**. Call it **AI visibility audit**.",
        "Go to [google.com](https://www.google.com) and search your business name.",
        "Open each page in the first two pages of results.",
        "Write each page in your document with one word: **OK**, **Out of date** or **Missing**.",
        "Don't fix anything yet.",
      ] },
      { kind: "table", head: ["Place", "What to check"], rows: [
        ["Your website", "Who you help, what you offer, where you work"],
        ["Google Business Profile", "Name, type of business, area, contact details, reviews"],
        ["LinkedIn", "Headline, About section, services"],
        ["Listings", "Your entry on trade or booking sites"],
        ["Reviews and articles", "What other people say about you"],
      ] },
      { kind: "p", text: "Only work online? You may not need a Google Business Profile. Check [Google's guidelines](https://support.google.com/business/answer/3038177)." },
    ] },
    { num: "02", title: "Search like a client", accent: "Save your \"before\" answer.", blocks: [
      { kind: "p", text: "Clients describe their problem. They rarely search your name. See what they see before you change anything." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and click **New chat**.",
        "Click **Search** or the globe icon below the chat box. On some accounts, click **+** first.",
        "Paste the prompt below. Use your client's words, not yours.",
      ] },
      { kind: "prompt", label: "Search like a client", text: `Search the web and answer as if I were a client.

I'm a [type of client] in [place, or "online"]. I need help with [the problem you solve, in your client's words].

Which providers should I compare? For each one, give me:
- their name
- what they offer, in one line
- the public page you based that on, with the link

Use only what you find on public pages. Never make up reviews, prices or results. If you can't find a source, say so.` },
      { kind: "p", text: "Copy the answer into your document under **Client search, [today's date]**." },
      { kind: "tip", text: "Can't find Search? OpenAI moves this button. Search \"ChatGPT search\" on [OpenAI's help pages](https://help.openai.com)." },
    ] },
    { num: "03", title: "Ask what AI knows", accent: "Right, wrong or missing.", blocks: [
      { kind: "p", text: "Now ask about your business by name. Only you know what is true." },
      { kind: "prompt", label: "What do you know about me?", text: `Search the web for [your business name] in [place, or "online"].

List every fact you find about this business as: Fact | Source link

Cover: what the business does, who it helps, where it works, services, prices if public, reviews, and the person behind it.

Then list what you couldn't find, and anything where two sources disagree.

Use only what you find. Never guess. Write [NOT FOUND] where you have nothing.` },
      { kind: "list", ordered: true, items: [
        "Mark each fact **Right**, **Wrong** or **Missing** in your document.",
        "For each wrong fact, click its source link.",
        "Press **Ctrl + F** (or **Cmd + F** on a Mac) and search one word from the fact.",
        "Is the wrong fact really on that page? Write down the page to fix.",
        "Link broken, or the fact is not there? Don't trust that fact.",
      ] },
    ] },
    { num: "04", title: "Fix the wrong facts", accent: "One fact, one place.", blocks: [
      { kind: "p", text: "Each fix is one fact on one page. ChatGPT sorts them for you." },
      { kind: "prompt", label: "Build my fix list", text: `Here is my AI visibility audit: [paste your document].

Here are the correct facts:
- Business name: [name]
- Who I help: [type of client]
- What I do: [services, in plain words]
- Where I work: [place, or online]
- How to book: [link]

Make a fix list: Place | What it says now | What it should say | Priority (high, medium, low)

High: anything wrong. Medium: anything missing. Low: small wording differences.

Use only what I give you. If something is missing, write [CHECK]. Never make up services, reviews, results or qualifications.` },
      { kind: "list", ordered: true, items: [
        "Fill in every **[CHECK]** yourself.",
        "Go to [business.google.com](https://business.google.com/). Click your business, then **Edit profile**. Fix each fact and click **Save**.",
        "On LinkedIn, click the pencil next to your headline and **About**. Fix them and click **Save**.",
        "Log in to each listing and fix it. Can't log in? Email the site.",
        "Write your name, services and area the same way everywhere.",
      ] },
      { kind: "tip", text: "Can't find a box? Google moves these menus. Search \"edit business profile\" on [Google's help pages](https://support.google.com/business/)." },
    ] },
    { num: "05", title: "Rewrite your services page", accent: "Clear facts AI can repeat.", blocks: [
      { kind: "p", text: "Your website is the one place you fully control. Make it say who you help, with what and where." },
      { kind: "prompt", label: "Rewrite my services page", text: `Help me rewrite my services page. Ask me these one at a time and wait for each answer:
1. Who do I help?
2. What exactly do I do for them?
3. Where do I work?
4. What proof do I have? Only what I can show.
5. How does a client start?

Then rewrite the page:
- One opening line: who I help, with what, where
- Each service: a heading and 2 or 3 plain sentences
- Proof: only what I gave you
- One clear next step

Plain English, short sentences. Use only what I give you. If something is missing, write [CHECK]. Never make up names, prices, dates or promises.

My current page: [paste your services page text]` },
      { kind: "list", ordered: true, items: [
        "Delete any claim you can't prove. Fill in every **[CHECK]**.",
        "Put the new text on your website.",
        "Paste the opening line into your Google profile and LinkedIn **About**.",
      ] },
      { kind: "tip", text: "Your page names clients who did not say yes? Swap them for [client] before you paste." },
    ] },
    { num: "06", title: "Check again monthly", accent: "Compare before and after.", blocks: [
      { kind: "p", text: "AI tools take time to see changes. A monthly check shows what moved." },
      { kind: "list", ordered: true, items: [
        "Add a calendar event one month from today: **AI visibility check**.",
        "On that day, run the client search and the \"What do you know about me?\" prompts again.",
        "Paste the answers under the new date. Compare with your \"before\" answer.",
        "Fix one new wrong or missing fact.",
      ] },
      { kind: "honest", text: "**The honest part:** nobody can promise ChatGPT will recommend you. Nobody can sell you a place in its answers. You control one thing: every fact about you is right and the same everywhere." },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Listed and checked your public pages",
        "Saved your \"before\" client search",
        "Marked every fact right, wrong or missing",
        "Fixed the wrong facts on Google, LinkedIn and listings",
        "Put a clear services page live",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your facts are straight.",
    accent: "Now find out what clients want.",
    body: "The next guide sorts your client reviews and messages into themes, with real quotes.",
    label: "Understand your clients →",
    href: "/guides/chatgpt-customer-research-with-evidence/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Check what AI says once a month. Fix one fact each time. Keep your facts the same everywhere.",
    finishLine: "Clear facts in. Clear answers out.",
  },
};
