import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "show-up-in-ai-search",
  lumailTag: "guide-show-up-in-ai-search",
  title: "How to Get ChatGPT to Recommend My Business",
  cover: "/images/guides/show-up-in-ai-search.webp",
  coverAlt: "The blue robot mascot placing a clearly labelled sign where a searchlight can find it",
  seoDescription: "Get ChatGPT to recommend your business: check what ChatGPT, Gemini and Perplexity say about you, fix wrong facts and rewrite your services page.",
  tool: "ChatGPT, Gemini or Perplexity",
  minutes: 30,
  h1: { title: "How to Get ChatGPT to Recommend", accent: "My Business" },
  hero: {
    kind: "scene",
    src: "/images/guides/show-up-in-ai-search.webp",
    alt: "The blue robot mascot placing a clearly labelled sign where a searchlight can find it",
    line: "Check what AI says about you and fix it. Then make your services page say who you help.",
  },
  intro: {
    heading: "Your AI visibility audit, done in one sitting",
    lead: "A client asks ChatGPT who to hire. It answers from what it finds about you online: your website, profiles, reviews and articles. In this guide, you check what AI tools say about you and fix wrong facts. Nobody can promise you a place in the answers. But you can make every fact about you right and easy to find.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A list of the **places AI tools read about you**, each one checked",
        "Your **client search results**: who ChatGPT, Gemini and Perplexity suggest to a client with your client's problem",
        "Your **AI visibility audit**: every fact AI tools say about you, marked right, wrong or missing",
        "A **fix list**: the exact facts to change on each profile",
        "A **new services page**: who you help, with what, where, and your real proof",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Gemini and Perplexity are other AI tools. They are optional and free to try. You can copy and paste every prompt below. Replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "AI Visibility Audit.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Know where AI looks", accent: "The places that describe you.", blocks: [
      { kind: "p", text: "AI tools have no secret list of businesses. Sometimes they search the web (look at live pages instead of answering from memory). Then they read the same public pages a client would find. Are those pages missing, out of date or saying different things? Then the answer about you will be too." },
      { kind: "list", ordered: true, items: [
        "Open a new document or spreadsheet. Call it **AI visibility audit**.",
        "Copy the table below into it. Add a last column called **Status**.",
        "Open each place. In the Status column, write if it exists and if it is up to date. Leave the fixes for step 04.",
      ] },
      { kind: "table", head: ["Place", "What it tells AI tools", "How to check"], rows: [
        ["Your website", "Who you help, what you offer, where you work", "Open your home page and services page as a visitor"],
        ["Google Business Profile", "Your name, type of business, area, contact details and reviews", "Search your business name on Google, or sign in at [business.google.com](https://business.google.com/)"],
        ["LinkedIn", "Your headline, About section, services and posts", "Open your profile and read it as a stranger would"],
        ["Directories and listings", "Your entry on business lists, like trade groups or booking sites", "Search your business name plus your type of work or town"],
        ["Reviews and articles", "What clients and other people say about you", "Search your business name. Read the first two pages of results."],
      ] },
      { kind: "tip", text: "**No Google Business Profile?** Google's profiles are for businesses that meet clients in person or work in one local area. Do you only work online? Skip that row. Not sure? Read [Google's guidelines](https://support.google.com/business/answer/3038177)." },
    ] },
    { num: "02", title: "Search like a client", accent: "See who gets suggested.", blocks: [
      { kind: "p", text: "Your clients rarely search for your name. They describe their problem and ask who can help. This step shows you what they see." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and start a new chat. Do you see a **Search** button or a globe icon? Turn it on, so ChatGPT looks at the web. No button? The prompt asks it to search.",
        "Paste the prompt below with your details filled in.",
        "Run the same prompt in [Gemini](https://gemini.google.com/) and [Perplexity](https://www.perplexity.ai/).",
        "Copy each answer into your audit document. Add the tool name and today's date.",
      ] },
      { kind: "prompt", label: "Search like a client", text: `Search the web and answer as if I were a client.

I'm a [type of client] in [place, or "online"]. I need help with [the problem you solve, in your client's words].

Which providers should I compare? For each one, give me:
- their name
- what they offer, in one line
- the public page you based that on, with the link

Use only what you can find on public pages. Never invent reviews, prices or results. If you can't find a source for something, say so.` },
      { kind: "p", text: "*Example of a filled-in first line:* \"I'm a café owner in Lyon. I need a bookkeeper who understands French VAT.\"" },
      { kind: "p", text: "Look at who comes up. Look at which pages the answers link to. AI tools use pages like these for your type of work." },
      { kind: "tip", text: "**Do this before you change anything.** It is your \"before\" picture. In step 06 you run the same prompt again and compare." },
    ] },
    { num: "03", title: "Ask what AI knows", accent: "Correct, wrong or missing.", blocks: [
      { kind: "p", text: "Now check what AI tools know about your business. You can fix the wrong and missing facts." },
      { kind: "list", ordered: true, items: [
        "Start a new chat in each tool you used in step 02.",
        "Paste the prompt below with your business name and place.",
        "Copy every fact from each answer into the audit table below. Use one row per fact.",
      ] },
      { kind: "prompt", label: "What do you know about me?", text: `Search the web for [your business name] in [place, or "online"].

List every fact you can find about this business in a table with these columns:
Fact | Source link

Cover: what the business does, who it helps, where it works, the services offered, prices if public, reviews, and the name of the person behind it.

Then list:
1. What you couldn't find or confirm
2. Anything that looks out of date, or where two sources disagree

Use only what you find. Never guess or fill gaps. Write [NOT FOUND] where you have nothing.` },
      { kind: "p", text: "Fill in your audit table. Mark each fact yourself. Only you know what is true." },
      { kind: "table", head: ["Fact", "What AI said", "Tool", "Correct / wrong / missing", "Source it used"], rows: [
        ["Who I help", "[what it said]", "ChatGPT", "[mark]", "[link]"],
        ["What I do", "[what it said]", "Gemini", "[mark]", "[link]"],
        ["Where I work", "[what it said]", "Perplexity", "[mark]", "[link]"],
        ["Reviews", "[what it said]", "ChatGPT", "[mark]", "[link]"],
      ] },
      { kind: "tip", text: "**AI said something wrong?** Open the source link it gave. The mistake is usually on that page. Now you know where to fix it." },
    ] },
    { num: "04", title: "Write your fix list", accent: "One fact, one place.", blocks: [
      { kind: "p", text: "The fix list turns your audit into small jobs. Each job is one fact to fix on one page." },
      { kind: "prompt", label: "Build my fix list", text: `Here is my AI visibility audit: [paste the table].

Here are the correct facts about my business:
- Business name: [name]
- Who I help: [type of client]
- What I do: [services, in plain words]
- Where I work: [place, or online]
- How to contact or book: [link]

Make me a fix list as a table with these columns:
Place (website, Google Business Profile, LinkedIn, or the directory's name) | What it says now | What it should say | Priority (high, medium, low)

High priority: anything wrong. Medium: anything missing. Low: small wording differences.

Use only the facts I gave you. Write [CHECK] where you are not sure what the correct fact is. Never invent services, reviews, results or qualifications.` },
      { kind: "p", text: "Work through the list. Start with high priority:" },
      { kind: "list", ordered: true, items: [
        "Use the same words for your name, services and area everywhere. Small differences make it harder for AI to see the pages are one business.",
        "**Google Business Profile:** sign in at [business.google.com](https://business.google.com/). Edit your profile. Menus change. Can't find a box? Search for it on [Google's help pages](https://support.google.com/business/).",
        "**LinkedIn:** change your headline and About section. Use the same words as your website.",
        "**Directories:** log in and update your entry. Can't log in? Email the directory with the right details.",
        "Tick each row in your fix list when it is done.",
      ] },
      { kind: "tip", text: "**Few or no reviews?** Ask two or three happy clients to leave one on your Google Business Profile or LinkedIn. Never write reviews yourself. Never ask AI to write them." },
    ] },
    { num: "05", title: "Rewrite your services page", accent: "Clear facts AI can repeat.", blocks: [
      { kind: "p", text: "Your website is the one place you fully control. Make it say who you help, with what, where, and why to believe you. Then AI tools have something clear to repeat." },
      { kind: "table", head: ["Before (example)", "After (example)"], rows: [
        ["We offer tailored financial solutions for your business needs.", "Bookkeeping and VAT returns for cafés and restaurants in Lyon, for a fixed monthly fee."],
      ] },
      { kind: "list", ordered: true, items: [
        "Open your services page in your browser. Select the text and copy it.",
        "Start a new chat in ChatGPT. Paste the prompt below, with your page text at the end.",
        "Answer the questions one at a time.",
      ] },
      { kind: "prompt", label: "Rewrite my services page", text: `Help me rewrite my services page. Ask me these one at a time and wait for each answer:
1. Who do I help? (type of client, size, situation)
2. What exactly do I do for them? (each service, in plain words)
3. Where do I work? (town, region, or online)
4. What proof do I have? (results, testimonials, qualifications, examples of work: only what I can show)
5. How does a client start? (book a call, send an enquiry, something else)

Then rewrite the page with these sections:
- One opening sentence a client would search for: who I help, with what, where
- Each service: a heading and 2 to 3 plain sentences
- Proof: only what I gave you
- How to start: one clear next step

Rules: plain English, short sentences, no buzzwords. Use only what I tell you. Write [CHECK] where details are missing instead of guessing. Never invent clients, results, numbers, reviews or qualifications.

My current page: [paste your services page text]` },
      { kind: "p", text: "Read it line by line. Delete any claim you can't prove. Fill in every [CHECK]. Then update the page on your website. Use the same first sentence on your Google Business Profile and LinkedIn. Then every place says the same thing." },
      { kind: "tip", text: "Only name clients on your page if they said yes. Swap any other names for [client] before you paste." },
    ] },
    { num: "06", title: "Check again in a month", accent: "Compare before and after.", blocks: [
      { kind: "p", text: "AI tools take time to see changes. Their answers also change from week to week. A check each month shows you what changed." },
      { kind: "list", ordered: true, items: [
        "Put a reminder in your calendar for one month from today.",
        "Run the step 02 and step 03 prompts again, in the same tools.",
        "Paste the new answers into your audit next to the old ones. Add the date.",
        "Fix one new wrong or missing fact each month.",
      ] },
      { kind: "honest", text: "**The honest part:** nobody can promise ChatGPT will recommend you. Nobody can buy a place in its answers. You control one thing: every fact about you is right, clear and the same everywhere. That is what this audit checks." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Every place AI tools read about you checked",
        "Client search saved, with today's date",
        "AI visibility audit filled in: right, wrong or missing",
        "Fix list done, high priority first",
        "Services page rewritten and live",
        "Monthly check in your calendar",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your facts are straight.",
    accent: "Now find out what clients want.",
    body: "The client research guide sorts your reviews, messages and survey answers into topics. Each topic comes with real client quotes. Then your services page can answer what clients ask.",
    label: "Understand your clients →",
    href: "/guides/chatgpt-customer-research-with-evidence/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Run the client search once a month. Fix one fact each time. When something changes in your business, update every profile that day.",
    finishLine: "Clear facts, the same everywhere, checked every month.",
  },
};
