import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "which-ai-tool-for-what",
  lumailTag: "guide-which-ai-tool-for-what",
  title: "ChatGPT, Claude or Gemini: Which One Should I Pay For?",
  cover: "/images/guides/which-ai-tool-for-what.webp",
  coverAlt: "The blue robot mascot choosing one tool from a row of brass instruments under glass",
  seoDescription: "ChatGPT, Claude or Gemini: which one should you pay for? Test them on your real work for a week, score them, then keep one and cancel the rest.",
  tool: "ChatGPT, Claude, Gemini, Copilot",
  minutes: 30,
  h1: { title: "ChatGPT, Claude or Gemini: Which One", accent: "Should I Pay For?" },
  hero: {
    kind: "scene",
    src: "/images/guides/which-ai-tool-for-what.webp",
    alt: "The blue robot mascot choosing one tool from a row of brass instruments under glass",
    line: "How to pick one and cancel the others. One test week on your real work decides it.",
  },
  intro: {
    heading: "One test week, one clear answer",
    lead: "Most business owners end up paying for two or three AI tools and using one. Reviews online can't tell you which one suits your work, because they don't test it on your clients, your writing or your apps. This guide has you test the tools on your own real tasks for a week, score them, and keep only the one that earns its place.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A short list of where your work actually happens, and which tool fits it",
        "A list of **every AI subscription you pay for** today, in one place",
        "**Your tool scorecard**: the same real tasks tested in two tools and scored on 5 points",
        "A **keep-or-cancel decision** for each subscription, made from your scores, not from hype",
        "The subscriptions you don't need, cancelled",
      ] },
      { kind: "tip", text: "You need free accounts for the two tools you want to compare. You don't need to pay for anything to run the test. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Tool Scorecard.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Start where your work happens", accent: "The tool follows the work.", blocks: [
      { kind: "p", text: "The best tool for you is usually the one that sits closest to your email, documents and calendar. Start there, so you only test the tools that make sense for you." },
      { kind: "list", ordered: true, items: [
        "Think about where your client work lives: your email, your documents, your files.",
        "Find your setup in the table below. That gives you the tool to try first.",
        "Pick one more tool to compare it with. You test exactly two, no more.",
      ] },
      { kind: "table", head: ["If your work happens in", "Try first", "Why"], rows: [
        ["Google Workspace (Gmail, Google Docs, Drive)", "Gemini", "It can work inside Gmail and Docs, so you paste less"],
        ["Microsoft 365 (Outlook, Word, Teams)", "Copilot", "It can work inside Outlook and Word, if your plan includes it"],
        ["Writing and thinking: proposals, emails, posts, planning", "ChatGPT or Claude", "Both are strong all-round chat tools; your test decides which suits you"],
        ["Research you will quote to a client or in a post", "A search tool such as Perplexity", "It shows the source links, so you can open them and check"],
      ] },
      { kind: "p", text: "Then check what you already pay for. If your Google Workspace or Microsoft 365 plan already includes an AI assistant, test that before you pay for anything new." },
      { kind: "tip", text: "**Not sure what your plan includes?** Prices and what each plan includes change often, so check the official pricing pages: [ChatGPT](https://openai.com/chatgpt/pricing/), [Claude](https://claude.com/pricing), [Gemini for Google Workspace](https://workspace.google.com/pricing) and [Microsoft 365 Copilot](https://www.microsoft.com/microsoft-365/copilot). Don't rely on a price you read in a blog post." },
    ] },
    { num: "02", title: "List what you pay for", accent: "Every subscription, in one place.", blocks: [
      { kind: "p", text: "You can't decide what to cancel until you can see everything you pay for. This step puts it in one list." },
      { kind: "list", ordered: true, items: [
        "Search your email for receipts with words like \"subscription\", \"receipt\" or \"renewal\", plus the tool names: ChatGPT, OpenAI, Claude, Anthropic, Gemini, Copilot, Perplexity.",
        "Check your bank or card statement for the last 2 months for the same names.",
        "Write each one down with what you pay and the renewal date. Leave nothing out, even tools you forgot about.",
      ] },
      { kind: "p", text: "Then paste your list into the tool you already use most, with this prompt, to turn it into a clean table." },
      { kind: "prompt", label: "Turn my subscriptions into a table", text: `Here is a list of the AI tools I pay for:
[paste your list: tool name, what you pay, how often, renewal date]

Turn it into a table with these columns:
Tool | What I pay | Monthly or yearly | Next renewal date | What I mainly use it for

Use only what I give you. Write [CHECK] where information is missing instead of guessing. Do not add any tool I didn't list, and do not look up or change any price.
At the bottom, add one line with the total I pay per month, worked out only from the numbers I gave.` },
      { kind: "p", text: "Fill in every [CHECK] yourself. Save the table in your notes. You'll come back to it in step 05." },
    ] },
    { num: "03", title: "Run the side-by-side test", accent: "Same task, two tools.", blocks: [
      { kind: "p", text: "The only fair way to compare two tools is to give them the same real task, with the same words, and score what comes back." },
      { kind: "list", ordered: true, items: [
        "Pick one real task from this week: a client email to reply to, a proposal paragraph to rewrite, notes from a call to summarise.",
        "Swap names and private details for brackets first: [client], [price], [date].",
        "Open both tools in two browser tabs and start a new chat in each.",
        "Paste the same prompt below into both. Change nothing between them.",
      ] },
      { kind: "prompt", label: "The side-by-side test prompt", text: `I run a small business: [one line on what you do and who you help].

Do this task for me: [describe the task, for example "rewrite this proposal paragraph so it is clearer and shorter" or "reply to this client email"].

Here is the material:
[paste your material, with names swapped for brackets]

Rules:
- Use only what I give you.
- Keep every fact. Do not add anything new.
- Write [CHECK] where information is missing instead of guessing.
- Never invent names, prices, dates or promises.
- Write in plain English, the way I would say it to a client.

When you have finished, tell me in one line what you changed or decided.` },
      { kind: "p", text: "Now score both answers out of 5 on each line. Copy this scorecard into your notes and fill it in." },
      { kind: "table", head: ["Score out of 5", "Tool A: [name]", "Tool B: [name]"], rows: [
        ["**Accuracy**: every fact matches what I gave it, nothing invented", "", ""],
        ["**Sounds like me**: I could send it with few changes", "", ""],
        ["**Time saved**: compared with doing it myself", "", ""],
        ["**Privacy settings**: I could switch off training and found the setting easily", "", ""],
        ["**Cost**: fair for how much I'd use it (from the official pricing page)", "", ""],
      ] },
      { kind: "tip", text: "**Where are the privacy settings?** In ChatGPT, look in Settings, then Data Controls. In Claude, look in Settings, then Privacy. Menus change, so if you can't find it, search the tool's help pages for \"model training\"." },
    ] },
    { num: "04", title: "Test for a week", accent: "Three real tasks.", blocks: [
      { kind: "p", text: "One task can be luck. Three different tasks over a week show you which tool really fits your work." },
      { kind: "list", ordered: true, items: [
        "Pick 3 different tasks you do every week, for example: a client reply, a proposal section, and a summary of call notes.",
        "Run each one through both tools with the prompt from step 03.",
        "Fill in a scorecard for each task, the same day, while you remember how it went.",
        "Keep a note of anything that annoyed you or surprised you. Those notes matter in step 05.",
      ] },
      { kind: "tip", text: "**Short on time this week?** Do one task every other day. Three tasks is the minimum; more is better." },
    ] },
    { num: "05", title: "Make the decision", accent: "Keep one, cancel the rest.", blocks: [
      { kind: "p", text: "Now let AI read your scores and your notes, and give you a clear keep-or-cancel answer for each subscription." },
      { kind: "prompt", label: "Read my scorecard and recommend", text: `Here are my scorecards from a one-week test of two AI tools on my real work:
[paste your 3 scorecards]

Here are my notes from the week:
[paste your notes]

Here is the table of AI subscriptions I pay for:
[paste your table from step 02]

Do this:
1. Add up the scores for each tool, per line and in total.
2. Tell me which tool did best for my work, in two sentences, using only my scores and notes.
3. Give me a table: Tool | Keep or cancel | Reason in one line.
4. Name any job where the other tool clearly did better, so I know if I'd miss it.

Rules: use only what I give you. Do not invent prices or features. Write [CHECK] where you can't decide from my scores.` },
      { kind: "p", text: "Read the answer against your own scorecards. The decision is yours. If it says keep a tool you didn't enjoy using, trust your notes." },
      { kind: "h3", text: "Then cancel" },
      { kind: "list", ordered: true, items: [
        "For each tool marked **cancel**, sign in and find the subscription or billing page in Settings.",
        "Cancel before the next renewal date in your table.",
        "If you can't find it, search the tool's help pages for \"cancel subscription\". If you pay through an app store, cancel it there instead.",
      ] },
      { kind: "honest", text: "**The honest part:** a new subscription won't fix a vague request. The tool you keep will only be as good as the details you give it. That is why the next guide shows you how to teach it about your business." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Found where your work happens and picked two tools to test",
        "Listed every AI subscription you pay for",
        "Ran the side-by-side test and filled in a scorecard",
        "Tested 3 real tasks over a week",
        "Made a keep-or-cancel decision for each tool",
        "Cancelled the ones you don't need",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You've picked your tool.",
    accent: "Now teach it your business.",
    body: "The Brand Brain guide sets up one project with your look, your voice rules and your Brand DNA, so the tool you kept writes like you from the first draft.",
    label: "Build your Brand Brain →",
    href: "/guides/brand-brain-guide/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Keep one main tool, use the assistant already inside your work apps, and run the side-by-side test again only when a new tool claims to do your job better.",
    finishLine: "Pay for the tool you use, not the one you read about.",
  },
};
