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
    line: "How to pick one and cancel the others. A one-week test on your real work decides it.",
  },
  intro: {
    heading: "One test week, one clear answer",
    lead: "Most business owners pay for two or three AI tools but use only one. Online reviews don't test the tools on your clients, your writing or your apps. So you test them on your own tasks for a week, score them, and keep the best one.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A short list of where your work happens, and which tool fits it",
        "A list of **every AI subscription you pay for** today, in one place",
        "**Your tool scorecard**: the same real tasks tried in two tools, scored on 5 points",
        "A **keep-or-cancel choice** for each subscription, based on your scores",
        "The subscriptions you don't need, cancelled",
      ] },
      { kind: "tip", text: "You need free accounts for the two tools you want to compare. You don't need to pay for anything to run the test. You can copy and paste every prompt below. Change the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Tool Scorecard.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Start where your work happens", accent: "The tool follows the work.", blocks: [
      { kind: "p", text: "The best tool is usually the one closest to your email, documents and calendar. Start there. Then you only test tools that make sense for you." },
      { kind: "list", ordered: true, items: [
        "Think about where your client work lives: your email, documents and files.",
        "Find your setup in the table below. It shows you the tool to try first.",
        "Pick one more tool to compare it with. You test two tools, no more.",
      ] },
      { kind: "table", head: ["If your work happens in", "Try first", "Why"], rows: [
        ["Google Workspace (Gmail, Google Docs, Drive)", "Gemini", "It can work inside Gmail and Docs, so you paste less"],
        ["Microsoft 365 (Outlook, Word, Teams)", "Copilot", "It can work inside Outlook and Word, if your plan includes it"],
        ["Writing and thinking: proposals, emails, posts, planning", "ChatGPT or Claude", "Both are good all-round chat tools. Your test decides which suits you"],
        ["Research you will quote to a client or in a post", "A search tool such as Perplexity", "It shows links to its sources, so you can open and check them"],
      ] },
      { kind: "p", text: "Then check what you already pay for. Your Google Workspace or Microsoft 365 plan may already include an AI helper. If it does, test that before you buy anything new." },
      { kind: "tip", text: "**Not sure what your plan includes?** Prices and plans change often. Check the official pricing pages: [ChatGPT](https://openai.com/chatgpt/pricing/), [Claude](https://claude.com/pricing), [Gemini for Google Workspace](https://workspace.google.com/pricing) and [Microsoft 365 Copilot](https://www.microsoft.com/microsoft-365/copilot). Don't trust a price you read in a blog post." },
    ] },
    { num: "02", title: "List what you pay for", accent: "Every subscription, in one place.", blocks: [
      { kind: "p", text: "You can't decide what to cancel until you see everything you pay for. This step puts it all in one list." },
      { kind: "list", ordered: true, items: [
        "Search your email for words like \"subscription\", \"receipt\" or \"renewal\". Also search for the tool names: ChatGPT, OpenAI, Claude, Anthropic, Gemini, Copilot, Perplexity.",
        "Check your bank or card statements from the last 2 months for the same names.",
        "Write each one down with what you pay and the renewal date (when it charges you next). Leave nothing out, even tools you forgot about.",
      ] },
      { kind: "p", text: "Then paste your list into the tool you use most. Use this prompt to turn it into a clean table." },
      { kind: "prompt", label: "Turn my subscriptions into a table", text: `Here is a list of the AI tools I pay for:
[paste your list: tool name, what you pay, how often, renewal date]

Turn it into a table with these columns:
Tool | What I pay | Monthly or yearly | Next renewal date | What I mainly use it for

Use only what I give you. Write [CHECK] where information is missing instead of guessing. Do not add any tool I didn't list, and do not look up or change any price.
At the bottom, add one line with the total I pay per month, worked out only from the numbers I gave.` },
      { kind: "p", text: "Fill in every [CHECK] yourself. Save the table in your notes. You'll use it again in step 05." },
    ] },
    { num: "03", title: "Run the side-by-side test", accent: "Same task, two tools.", blocks: [
      { kind: "p", text: "The only fair way to compare two tools is to give them the same real task. Use the same words in both. Then score what comes back." },
      { kind: "list", ordered: true, items: [
        "Pick one real task from this week. For example: a client email to reply to, a proposal paragraph to rewrite, or call notes to summarise.",
        "First, swap names and private details for brackets: [client], [price], [date].",
        "Open both tools in two browser tabs. Start a new chat in each.",
        "Paste the prompt below into both. Change nothing between them.",
      ] },
      { kind: "prompt", label: "The side-by-side test prompt", text: `I run a small business: [one line on what you do and who you help].

Do this task for me: [describe the task, for example "rewrite this proposal paragraph so it is clearer and shorter" or "reply to this client email"].

Here is the material:
[paste your material, with names swapped for brackets]

Rules:
- Use only what I give you.
- Keep every fact. Do not add anything new.
- Write [CHECK] where information is missing instead of guessing.
- Never make up names, prices, dates or promises.
- Write in plain English, the way I would say it to a client.

When you have finished, tell me in one line what you changed or decided.` },
      { kind: "p", text: "Now score both answers out of 5 on each line. Copy this scorecard into your notes and fill it in." },
      { kind: "table", head: ["Score out of 5", "Tool A: [name]", "Tool B: [name]"], rows: [
        ["**Right facts**: every fact matches what I gave it, nothing made up", "", ""],
        ["**Sounds like me**: I could send it with few changes", "", ""],
        ["**Time saved**: compared with doing it myself", "", ""],
        ["**Privacy settings**: I could turn off training and found the setting easily", "", ""],
        ["**Cost**: fair for how much I'd use it (check the official pricing page)", "", ""],
      ] },
      { kind: "tip", text: "**Where are the privacy settings?** In ChatGPT, look in Settings, then Data Controls. In Claude, look in Settings, then Privacy. Menus change. If you can't find it, search the tool's help pages for \"model training\"." },
    ] },
    { num: "04", title: "Test for a week", accent: "Three real tasks.", blocks: [
      { kind: "p", text: "One task can be luck. Three different tasks over a week show you which tool really fits your work." },
      { kind: "list", ordered: true, items: [
        "Pick 3 different tasks you do every week. For example: a client reply, a proposal section and a summary of call notes.",
        "Run each one through both tools with the prompt from step 03.",
        "Fill in a scorecard for each task on the same day, while you remember how it went.",
        "Write down anything that annoyed or surprised you. You will need these notes in step 05.",
      ] },
      { kind: "tip", text: "**Short on time this week?** Do one task every other day. Do at least three tasks. More is better." },
    ] },
    { num: "05", title: "Make the decision", accent: "Keep one, cancel the rest.", blocks: [
      { kind: "p", text: "Now let AI read your scores and your notes. It gives you a clear keep-or-cancel answer for each subscription." },
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

Rules: use only what I give you. Do not make up prices or tools. Write [CHECK] where you can't decide from my scores.` },
      { kind: "p", text: "Check the answer against your own scorecards. The choice is yours. If it says keep a tool you didn't enjoy using, trust your notes." },
      { kind: "h3", text: "Then cancel" },
      { kind: "list", ordered: true, items: [
        "For each tool marked **cancel**, sign in. Find the subscription or billing page in Settings.",
        "Cancel before the next renewal date in your table.",
        "Can't find it? Search the tool's help pages for \"cancel subscription\". If you pay through an app store, cancel it there.",
      ] },
      { kind: "honest", text: "**The honest part:** a new subscription won't fix an unclear request. The tool you keep is only as good as the details you give it. So the next guide shows you how to teach it about your business." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Found where your work happens and picked two tools to test",
        "Listed every AI subscription you pay for",
        "Ran the side-by-side test and filled in a scorecard",
        "Tested 3 real tasks over a week",
        "Made a keep-or-cancel choice for each tool",
        "Cancelled the ones you don't need",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You've picked your tool.",
    accent: "Now teach it your business.",
    body: "The Brand Brain guide sets up one project with your look, your voice rules and your Brand DNA (who you help and why you are different). Then the tool you kept writes like you from the first draft.",
    label: "Build your Brand Brain →",
    href: "/guides/brand-brain-guide/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Keep one main tool. Use the AI helper already inside your work apps. Only run the side-by-side test again when a new tool says it does your job better.",
    finishLine: "Pay only for the tool that helps you most each week.",
  },
};
