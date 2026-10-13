import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "show-up-in-ai-search",
  lumailTag: "guide-show-up-in-ai-search",
  title: "How to Get ChatGPT to Recommend My Business",
  cover: "/images/guides/show-up-in-ai-search.webp",
  coverAlt: "The blue robot mascot placing a clearly labelled sign where a searchlight can find it",
  seoDescription: "Get ChatGPT to recommend your business: check what ChatGPT, Gemini and Perplexity say about you, fix wrong facts and rewrite your services page.",
  tool: "ChatGPT, Gemini or Perplexity",
  minutes: 45,
  h1: { title: "How to Get ChatGPT to Recommend", accent: "My Business" },
  hero: {
    kind: "scene",
    src: "/images/guides/show-up-in-ai-search.webp",
    alt: "The blue robot mascot placing a clearly labelled sign where a searchlight can find it",
    line: "See what AI tells a client about you. Fix the wrong facts. Then make your services page say clearly who you help.",
  },
  intro: {
    heading: "Find out what AI tells clients about you",
    lead: "Here is the problem. A new client types into ChatGPT: \"Who can help me with my books?\" ChatGPT names three businesses, and yours is not one of them. Today you only guess why. ChatGPT answers from public pages: your website, your profiles, your reviews. In this guide you see what it finds about you, fix what is wrong, and make your own page clear. You get a list of facts that are right everywhere, checked once a month.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A list of every public page about your business**, each one checked",
        "**A saved \"before\" answer**: who AI suggests when a client describes their problem",
        "**A table of what AI says about you**, with each fact marked right, wrong or missing",
        "**Wrong facts fixed** on your Google profile, LinkedIn and listings",
        "**A clear services page**: who you help, with what, where, and your real proof",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer. These steps are for a web browser, like Chrome.",
        "A ChatGPT account. The free plan works. Gemini and Perplexity (two other AI tools) are optional and free to try.",
        "Your website address, and your logins for LinkedIn and any business listings.",
        "One real thing to test with: the problem your best client had before they hired you, in their words.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
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
    { num: "01", title: "List the pages AI reads about you", accent: "15 minutes, done once.", blocks: [
      { kind: "p", text: "AI tools have no secret list of businesses. When they search the web (look at live pages instead of answering from memory), they read the same public pages a client finds. If those pages are missing or out of date, the answer about you will be too. So first you list them." },
      { kind: "h3", text: "A. Make your audit document" },
      { kind: "list", ordered: true, items: [
        "Open [docs.google.com](https://docs.google.com) in your browser. Or open Word, if you use that.",
        "Click **Blank document**. A new empty page opens.",
        "Click **Untitled document** at the top left. Type **AI visibility audit** and press Enter.",
        "Copy the table below and paste it into the page.",
        "Add one more column on the right. Call it **Status**.",
      ] },
      { kind: "table", head: ["Place", "What it tells AI tools", "How to check"], rows: [
        ["Your website", "Who you help, what you offer, where you work", "Open your home page and services page as a visitor"],
        ["Google Business Profile", "Your name, type of business, area, contact details and reviews", "Search your business name on Google, or sign in at [business.google.com](https://business.google.com/)"],
        ["LinkedIn", "Your headline, About section, services and posts", "Open your profile and read it as a stranger would"],
        ["Directories and listings", "Your entry on business lists, like trade groups or booking sites", "Search your business name plus your type of work or town"],
        ["Reviews and articles", "What clients and other people say about you", "Search your business name. Read the first two pages of results."],
      ] },
      { kind: "h3", text: "B. Check each place" },
      { kind: "list", ordered: true, items: [
        "Open a new tab in your browser. Go to [google.com](https://www.google.com).",
        "Type your business name in the search box and press Enter.",
        "Look at the first two pages of results. Each result is a page that AI tools can read too.",
        "For each row in your table, open the page. In the **Status** column, write one of three words: **OK**, **Out of date** or **Missing**.",
        "Found a page that is not in the table, like an old listing? Add a new row for it.",
        "Don't fix anything yet. You fix things in step 05.",
      ] },
      { kind: "example", label: "What a filled-in row looks like", text: "LinkedIn | Your headline, About section... | Read as a stranger | Out of date: still lists [a service you no longer offer]" },
      { kind: "tip", text: "**No Google Business Profile?** Google's profiles are for businesses that meet clients in person or work in one local area. Do you only work online? Skip that row. Not sure? Read [Google's guidelines](https://support.google.com/business/answer/3038177)." },
    ] },
    { num: "02", title: "Search like a client", accent: "Save your \"before\" answer.", blocks: [
      { kind: "p", text: "Clients rarely search for your name. They describe their problem and ask who can help. This step shows you what they see. Do it before you change anything. It is your \"before\" picture." },
      { kind: "h3", text: "A. Open ChatGPT and switch on web search" },
      { kind: "list", ordered: true, items: [
        "Open [chatgpt.com](https://chatgpt.com) and sign in.",
        "Click **New chat** at the top left. You will see an empty chat box at the bottom.",
        "Look below or inside the chat box for a **Search** button or a small globe icon. Click it, so it lights up. On some accounts you click the **+** button on the left of the chat box first, then **Search** or **Web search**.",
        "No button at all? That is fine. The prompt below asks ChatGPT to search the web.",
        "Can't find it? OpenAI moves these menus. Search \"ChatGPT search\" on [OpenAI's help pages](https://help.openai.com).",
      ] },
      { kind: "h3", text: "B. Paste the prompt" },
      { kind: "p", text: "Paste this in the new chat. Change the three parts in [brackets]. Use your client's words, not yours. Then press Enter." },
      { kind: "prompt", label: "Search like a client", text: `Search the web and answer as if I were a client.

I'm a [type of client] in [place, or "online"]. I need help with [the problem you solve, in your client's words].

Which providers should I compare? For each one, give me:
- their name
- what they offer, in one line
- the public page you based that on, with the link

Use only what you can find on public pages. Never invent reviews, prices or results. If you can't find a source for something, say so.` },
      { kind: "example", label: "What you type in the first line", text: "I'm a café owner in Lyon. I need a bookkeeper who understands French VAT." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "1. [provider 1]: bookkeeping for restaurants in Lyon. Source: [link to their services page]",
        "2. [provider 2]: online accountant for small firms in France. Source: [link to a directory listing]",
        "3. [provider 3]: VAT returns for hospitality. Source: [link to their Google profile]",
      ] },
      { kind: "h3", text: "C. Save the answer" },
      { kind: "list", ordered: true, items: [
        "Select the whole answer with your mouse. Press **Ctrl + C** on Windows, or **Cmd + C** on a Mac.",
        "Go to your AI visibility audit document. Type a heading: **Client search, ChatGPT, [today's date]**.",
        "Click under the heading. Press **Ctrl + V** (or **Cmd + V**) to paste.",
        "Optional: do the same in [Gemini](https://gemini.google.com/) and [Perplexity](https://www.perplexity.ai/). Paste each answer under its own heading.",
        "Look at the links in the answers. They show which kinds of pages AI uses for your type of work.",
      ] },
    ] },
    { num: "03", title: "Ask what AI knows about you", accent: "Right, wrong or missing.", blocks: [
      { kind: "p", text: "Now you ask about your own business by name. Then you mark each fact. Only you know what is true." },
      { kind: "h3", text: "A. Ask the question" },
      { kind: "list", ordered: true, items: [
        "In ChatGPT, click **New chat** at the top left.",
        "Switch on **Search** again, if you have the button.",
        "Paste the prompt below. Change your business name and place. Press Enter.",
      ] },
      { kind: "prompt", label: "What do you know about me?", text: `Search the web for [your business name] in [place, or "online"].

List every fact you can find about this business in a table with these columns:
Fact | Source link

Cover: what the business does, who it helps, where it works, the services offered, prices if public, reviews, and the name of the person behind it.

Then list:
1. What you couldn't find or confirm
2. Anything that looks out of date, or where two sources disagree

Use only what you find. Never guess or fill gaps. Write [NOT FOUND] where you have nothing.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "What the business does: bookkeeping for small firms | [link to your website]",
        "Where it works: Paris | [link to an old directory listing]",
        "Reviews: [NOT FOUND]",
        "Out of date: the website says Lyon, the listing says Paris.",
      ] },
      { kind: "h3", text: "B. Mark each fact" },
      { kind: "list", ordered: true, items: [
        "Go to your audit document. Make a new table with the 5 columns below.",
        "Copy each fact from the answer into its own row.",
        "In the fourth column, write **Right**, **Wrong** or **Missing**. Missing means the AI wrote [NOT FOUND].",
        "Copy the source link it gave into the last column.",
      ] },
      { kind: "table", head: ["Fact", "What AI said", "Tool", "Right / wrong / missing", "Source it used"], rows: [
        ["Who I help", "[what it said]", "ChatGPT", "[mark]", "[link]"],
        ["What I do", "[what it said]", "ChatGPT", "[mark]", "[link]"],
        ["Where I work", "[what it said]", "ChatGPT", "[mark]", "[link]"],
        ["Reviews", "[what it said]", "ChatGPT", "[mark]", "[link]"],
      ] },
    ] },
    { num: "04", title: "Check the sources yourself", accent: "2 minutes per fact.", blocks: [
      { kind: "p", text: "AI can be wrong, even when it sounds sure. It can give a link that doesn't say what it claims. Before you fix anything, check where each wrong fact came from." },
      { kind: "list", ordered: true, items: [
        "In your audit table, find a fact you marked **Wrong**.",
        "Click the source link next to it. The page opens in a new tab.",
        "Press **Ctrl + F** on Windows, or **Cmd + F** on a Mac. A small search box opens.",
        "Type one word from the wrong fact, for example the town name. Press Enter. The word lights up on the page.",
        "Read the lines around it. Is the wrong fact really on this page?",
        "Write what you found in your table, next to the link.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["The wrong fact is on the page", "That page is the cause", "Fix that page in step 05"],
        ["The page says the right thing", "The AI mixed things up", "No page to fix. Make your website clearer in step 06"],
        ["The link doesn't open, or opens another business", "The AI made up the link", "Don't trust that fact. Search your name on Google to find the real cause"],
        ["The AI found nothing at all", "There are too few clear pages about you", "Do steps 05 and 06. Then check again next month"],
      ] },
      { kind: "tip", text: "**Two businesses with your name?** Add your town and type of work to the search. In your fixes, always use your full business name the same way." },
    ] },
    { num: "05", title: "Fix the wrong facts", accent: "One fact, one place.", blocks: [
      { kind: "p", text: "Now you turn your table into small jobs. Each job is one fact to fix on one page. ChatGPT sorts them for you." },
      { kind: "h3", text: "A. Make the fix list" },
      { kind: "list", ordered: true, items: [
        "In ChatGPT, click **New chat**.",
        "Copy your audit table from your document.",
        "Paste the prompt below. Put your table where it says [paste the table]. Fill in your correct facts.",
        "Press Enter.",
      ] },
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
      { kind: "result", label: "What a good answer looks like", lines: [
        "Directory listing | Paris | Lyon | High",
        "LinkedIn | Bookkeeping and payroll | Bookkeeping and VAT returns | High",
        "Google Business Profile | No services listed | Bookkeeping, VAT returns | Medium",
      ] },
      { kind: "p", text: "Copy the table into your audit document. Fill in every [CHECK] yourself." },
      { kind: "h3", text: "B. Fix your Google Business Profile" },
      { kind: "list", ordered: true, items: [
        "Go to [business.google.com](https://business.google.com/) and sign in with the account that owns the profile.",
        "Click your business. You will see your profile with an edit option. On some accounts it is called **Edit profile**.",
        "Change each fact from your fix list. Click **Save** after each one.",
        "Can't find a box? Google moves these menus. Search \"edit business profile\" on [Google's help pages](https://support.google.com/business/).",
      ] },
      { kind: "h3", text: "C. Fix LinkedIn and listings" },
      { kind: "list", ordered: true, items: [
        "Open your LinkedIn profile. Click the pencil icon next to your headline. Change it to match your fix list. Click **Save**.",
        "Scroll to **About**. Click its pencil icon. Use the same words as your website. Click **Save**.",
        "For each directory, log in and update your entry. Can't log in? Email the directory with the right details.",
        "In your fix list, tick each row when it is done.",
      ] },
      { kind: "tip", text: "**Use the same words everywhere.** Write your business name, services and area the same way on every page. Small differences make it harder for AI to see the pages are one business." },
      { kind: "tip", text: "**Few or no reviews?** Ask two or three happy clients to leave one on your Google Business Profile or LinkedIn. Never write reviews yourself. Never ask AI to write them." },
    ] },
    { num: "06", title: "Rewrite your services page", accent: "Clear facts AI can repeat.", blocks: [
      { kind: "p", text: "Your website is the one place you fully control. Make it say who you help, with what, where, and why to believe you. Then AI tools have something clear to repeat." },
      { kind: "contrast", items: [
        { label: "Vague (example)", text: "We offer tailored financial solutions for your business needs.", good: false },
        { label: "Clear (example)", text: "Bookkeeping and VAT returns for cafés and restaurants in Lyon, for a fixed monthly fee.", good: true },
      ] },
      { kind: "h3", text: "A. Copy your page" },
      { kind: "list", ordered: true, items: [
        "Open your services page in your browser.",
        "Click at the start of the text. Hold the mouse button and drag to the end. Press **Ctrl + C** (or **Cmd + C**).",
        "If the page names clients who did not say yes, swap their names for [client] before you paste.",
      ] },
      { kind: "h3", text: "B. Let ChatGPT ask you questions" },
      { kind: "list", ordered: true, items: [
        "In ChatGPT, click **New chat**.",
        "Paste the prompt below. Paste your page text at the end, where it says [paste your services page text].",
        "Press Enter. ChatGPT asks you 5 questions, one at a time. Answer each in a sentence or two.",
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
      { kind: "result", label: "What a good opening looks like", lines: [
        "Bookkeeping and VAT returns for cafés and restaurants in Lyon.",
        "Bookkeeping: I record your sales and costs each month, so your books are ready for your accountant.",
        "Proof: [CHECK: add a client quote you have permission to use]",
      ] },
      { kind: "h3", text: "C. Check it and put it live" },
      { kind: "list", ordered: true, items: [
        "Read the new page line by line.",
        "Delete any claim you can't prove.",
        "Fill in every [CHECK] with a real fact, or delete the line.",
        "Paste the new text into your website and publish it.",
        "Copy the first sentence. Paste it into your Google Business Profile description and your LinkedIn About section. Now every place says the same thing.",
      ] },
    ] },
    { num: "07", title: "Check again every month", accent: "Compare before and after.", blocks: [
      { kind: "p", text: "AI tools take time to see changes. Their answers also change from week to week. A check each month shows you what changed." },
      { kind: "list", ordered: true, items: [
        "Open your calendar. Make an event one month from today. Call it **AI visibility check**.",
        "On that day, run the prompts from step 02 and step 03 again, in the same tools.",
        "Paste the new answers into your audit document, under a heading with the new date.",
        "Compare them with your \"before\" answers. What is now right? What is still wrong?",
        "Fix one new wrong or missing fact each month.",
      ] },
      { kind: "honest", text: "**The honest part:** nobody can promise ChatGPT will recommend you. Nobody can buy a place in its answers. AI won't fix your profiles for you, and it can't know which facts are true. You control one thing: every fact about you is right, clear and the same everywhere. That is what this audit checks." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "AI visibility audit document made, every place marked OK, Out of date or Missing",
        "One client search saved, with today's date",
        "Every fact AI found about you marked right, wrong or missing",
        "Each wrong fact traced to its source page",
        "High priority fixes done on Google, LinkedIn and listings",
        "Services page rewritten, checked and live",
        "Monthly AI visibility check in your calendar",
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
    paragraph: "Run the client search once a month. Check the source of every wrong fact. Fix one fact each time. When something changes in your business, update every profile that day.",
    finishLine: "Clear facts, the same everywhere, checked every month.",
  },
};
