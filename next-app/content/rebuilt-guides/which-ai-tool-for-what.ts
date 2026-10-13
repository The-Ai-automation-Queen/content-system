import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "which-ai-tool-for-what",
  lumailTag: "guide-which-ai-tool-for-what",
  title: "ChatGPT, Claude or Gemini: Which One Should I Pay For?",
  cover: "/images/guides/which-ai-tool-for-what.webp",
  coverAlt: "The blue robot mascot choosing one tool from a row of brass instruments under glass",
  seoDescription: "ChatGPT, Claude or Gemini: which one should you pay for? Test two of them on your real work for a week, score them, then keep one and cancel the rest.",
  tool: "ChatGPT, Claude, Gemini, Copilot",
  minutes: 30,
  h1: { title: "ChatGPT, Claude or Gemini: Which One", accent: "Should I Pay For?" },
  hero: {
    kind: "scene",
    src: "/images/guides/which-ai-tool-for-what.webp",
    alt: "The blue robot mascot choosing one tool from a row of brass instruments under glass",
    line: "Give two AI tools the same real task for a week. Score them. Keep the winner and cancel the rest.",
  },
  intro: {
    heading: "Stop paying for tools you don't use",
    lead: "Here is the problem. You pay for ChatGPT, and maybe Claude or Gemini too. Each month the card is charged, but you use only one of them. Reviews online can't tell you which to keep, because they don't test your clients or your emails. So you run a small test yourself. Two tools get the same real task, you score both, and the scores tell you what to keep.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**Two tools picked to test**, based on where your work already happens",
        "**One list of every AI subscription you pay for**, with prices and renewal dates",
        "**A score for each tool** on 3 real tasks from your week",
        "**A clear keep or cancel answer** for each subscription",
        "**The ones you don't need, cancelled** before they charge you again",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer with a web browser, like Chrome. A phone works, but two tabs side by side is easier on a computer.",
        "Free accounts for the two tools you want to compare. You don't need to pay for anything to run the test.",
        "Your email inbox and your bank or card statements from the last 2 months.",
        "One real task from this week to use as a test. For example, a client email to reply to, or a proposal paragraph to rewrite.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Tool Scorecard.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Pick the two tools to test", accent: "5 minutes, no AI needed.", blocks: [
      { kind: "p", text: "The best tool is usually the one closest to your email and files. So start with where your work happens. Then you only test tools that make sense for you." },
      { kind: "h3", text: "A. Find where your work happens" },
      { kind: "list", ordered: true, items: [
        "Think about where your client work lives. Which email do you use? Where are your documents saved?",
        "Find that line in the first column of the table below.",
        "Read the middle column. That is the tool to try first.",
      ] },
      { kind: "table", head: ["If your work happens in", "Try first", "Why"], rows: [
        ["Google Workspace (Gmail, Google Docs, Drive)", "Gemini", "It can work inside Gmail and Docs, so you paste less"],
        ["Microsoft 365 (Outlook, Word, Teams)", "Copilot", "It can work inside Outlook and Word, if your plan includes it"],
        ["Writing and thinking: proposals, emails, posts, planning", "ChatGPT or Claude", "Both are good all-round chat tools. Your test decides which suits you"],
        ["Research you will quote to a client or in a post", "A search tool such as Perplexity", "It shows links to its sources, so you can open and check them"],
      ] },
      { kind: "h3", text: "B. Pick a second tool to compare" },
      { kind: "list", ordered: true, items: [
        "Pick one more tool from the table. Most people compare ChatGPT and Claude, or their work app's AI assistant and ChatGPT.",
        "Stop at two. Three tools make the test too long, and you won't finish it.",
        "Write both names at the top of a note on your phone or computer.",
      ] },
      { kind: "example", label: "What you write down", text: "My work is in Gmail and Google Docs. Tool A: Gemini. Tool B: ChatGPT." },
      { kind: "h3", text: "C. Check what your plan already includes" },
      { kind: "list", ordered: true, items: [
        "Do you pay for Google Workspace or Microsoft 365? Your plan may already include an AI assistant.",
        "Open the official pricing page for that plan from the links in the tip below.",
        "Look for the word Gemini or Copilot in the list of what your plan includes.",
        "If it is included, make it Tool A. Test what you already pay for before you buy anything new.",
      ] },
      { kind: "tip", text: "**Prices and plans change often.** Check the official pages, not a blog post: [ChatGPT](https://openai.com/chatgpt/pricing/), [Claude](https://claude.com/pricing), [Gemini for Google Workspace](https://workspace.google.com/pricing) and [Microsoft 365 Copilot](https://www.microsoft.com/microsoft-365/copilot). On a work account? Ask the person who runs your company's account what is switched on." },
    ] },
    { num: "02", title: "List what you pay for", accent: "Every subscription, in one place.", blocks: [
      { kind: "p", text: "You can't decide what to cancel until you see everything you pay for. This step puts it all in one list." },
      { kind: "h3", text: "A. Search your email" },
      { kind: "list", ordered: true, items: [
        "Open your email inbox.",
        "Click the search bar at the top. Type **subscription** and press Enter. Look for any AI tool in the results.",
        "Do the same with the words **receipt** and **renewal**.",
        "Then search each tool name: ChatGPT, OpenAI, Claude, Anthropic, Gemini, Copilot, Perplexity.",
        "For each one you find, write down 4 things: the tool name, what you pay, monthly or yearly, and the next renewal date (the day it charges you next).",
      ] },
      { kind: "h3", text: "B. Check your bank or card statements" },
      { kind: "list", ordered: true, items: [
        "Open your bank app or your card statements for the last 2 months.",
        "Look for the same names. Some show as OpenAI or Anthropic, not the tool name.",
        "Add anything you missed to your list. Leave nothing out, even tools you forgot about.",
      ] },
      { kind: "h3", text: "C. Turn the list into a table" },
      { kind: "p", text: "Open the AI tool you use most and start a new chat. Copy the prompt below and paste it in the chat box. Replace the part in [square brackets] with your list. Press Enter." },
      { kind: "prompt", label: "Turn my subscriptions into a table", text: `Here is a list of the AI tools I pay for:
[paste your list: tool name, what you pay, how often, renewal date]

Turn it into a table with these columns:
Tool | What I pay | Monthly or yearly | Next renewal date | What I mainly use it for

Use only what I give you. Write [CHECK] where information is missing instead of guessing. Do not add any tool I didn't list, and do not look up or change any price.
At the bottom, add one line with the total I pay per month, worked out only from the numbers I gave.` },
      { kind: "example", label: "What you type", text: "ChatGPT, [price], monthly, renews [date]. Claude, [price], monthly, renews [date]. Perplexity, yearly, price and date not sure." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "ChatGPT | [price] | Monthly | [date] | [CHECK]",
        "Claude | [price] | Monthly | [date] | [CHECK]",
        "Perplexity | [CHECK] | Yearly | [CHECK] | [CHECK]",
        "Total per month: ChatGPT plus Claude, and Perplexity is [CHECK] because the price is missing",
      ] },
      { kind: "list", ordered: true, items: [
        "Fill in every [CHECK] yourself, from your email or bank.",
        "Check the total. Add up the monthly prices yourself. Does it match?",
        "Copy the table into your note. You need it again in step 06.",
      ] },
    ] },
    { num: "03", title: "Get both tools ready", accent: "Signed in, with training switched off.", blocks: [
      { kind: "p", text: "You are about to paste real work into two tools. First, stop them from learning from your chats. Then open them side by side." },
      { kind: "h3", text: "A. Switch off training in ChatGPT" },
      { kind: "list", ordered: true, items: [
        "Go to [chatgpt.com](https://chatgpt.com) and sign in.",
        "Click your name or profile picture. It is in the bottom left corner, or the top right on some screens.",
        "Click **Settings**. A window opens.",
        "Click **Data Controls** on the left of that window.",
        "Find the switch about using your chats to improve the model. On some accounts it is called **Improve the model for everyone**. Click it so it turns off.",
        "Can't find **Data Controls**? OpenAI moves these menus. Search \"model training\" on [OpenAI's help pages](https://help.openai.com/).",
      ] },
      { kind: "h3", text: "B. Switch off training in Claude" },
      { kind: "list", ordered: true, items: [
        "Go to [claude.ai](https://claude.ai/) and sign in.",
        "Click your name or initials in the bottom left corner. Then click **Settings**.",
        "Click **Privacy**.",
        "Find the switch that lets Claude learn from your chats. On some accounts it is called **Help improve Claude**. Click it so it turns off.",
        "Can't find **Privacy**? Anthropic moves these menus. Search \"model training\" on [Anthropic's help pages](https://support.anthropic.com/).",
      ] },
      { kind: "tip", text: "**Testing Gemini instead?** Search \"Gemini Apps activity\" on [Google's Gemini help pages](https://support.google.com/gemini) for today's steps. **Testing Copilot at work?** Ask the person who runs your company's Microsoft 365 account how your data is handled." },
      { kind: "h3", text: "C. Open both tools side by side" },
      { kind: "list", ordered: true, items: [
        "Open Tool A in one browser tab and Tool B in a second tab.",
        "In each one, start a new chat. Look for **New chat** at the top left.",
        "Keep both tabs open for the next step.",
      ] },
    ] },
    { num: "04", title: "Run the side-by-side test", accent: "Same task, same words, two tools.", blocks: [
      { kind: "p", text: "The only fair way to compare two tools is to give them the same real task. Use the same words in both. Then score what comes back." },
      { kind: "h3", text: "A. Get your task ready" },
      { kind: "list", ordered: true, items: [
        "Pick one real task from this week. For example, a client email to reply to, or a proposal paragraph to rewrite.",
        "Copy the material into a note first. Swap names and private details for brackets: [client], [price], [date].",
        "Take out card and bank details, passwords and personal details about anyone.",
      ] },
      { kind: "h3", text: "B. Paste the same prompt into both" },
      { kind: "list", ordered: true, items: [
        "Copy the prompt below into your note.",
        "Change the 3 parts in [square brackets]: what you do, the task, and your material.",
        "Copy the finished prompt. Paste it into the new chat in Tool A. Press Enter.",
        "Paste the exact same prompt into Tool B. Change nothing between them. Press Enter.",
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
      { kind: "example", label: "Example task", text: "Rewrite this proposal paragraph so it is clearer and shorter: \"We will deliver the new website pages for [client] in two stages, with the first stage due by [date], subject to receiving the brand files.\"" },
      { kind: "result", label: "What a good answer looks like", lines: [
        "\"We'll build your new pages in two stages. Stage one is due by [date], once we have your brand files.\"",
        "What I changed: shorter sentences. I kept the date and the brand files condition.",
      ] },
      { kind: "h3", text: "C. Score both answers" },
      { kind: "p", text: "Copy this scorecard into your note. Give each line a score from 1 to 5. 5 is best." },
      { kind: "table", head: ["Score out of 5", "Tool A: [name]", "Tool B: [name]"], rows: [
        ["**Right facts**: every fact matches what I gave it, nothing made up", "", ""],
        ["**Sounds like me**: I could send it with few changes", "", ""],
        ["**Time saved**: compared with doing it myself", "", ""],
        ["**Privacy settings**: I could turn off training and found the setting easily", "", ""],
        ["**Cost**: fair for how much I'd use it (check the official pricing page)", "", ""],
      ] },
    ] },
    { num: "05", title: "Check the facts, then repeat for a week", accent: "Three real tasks.", blocks: [
      { kind: "p", text: "A tool can sound good and still change a fact. So before you score **Right facts**, check each answer yourself. Here is how." },
      { kind: "h3", text: "A. Check each answer yourself" },
      { kind: "list", ordered: true, items: [
        "Put your original material next to the answer.",
        "Find every name, date, price and number in the answer.",
        "For each one, find it in your material. Press **Ctrl + F** on Windows, or **Cmd + F** on a Mac, and type it.",
        "Look for anything the answer made sound more certain. \"If we get the files\" must not become \"we will deliver\".",
        "Anything that is not in your material, or changed? Give that tool a low score for **Right facts**.",
      ] },
      { kind: "contrast", items: [
        { label: "Your material says", text: "Stage one is due by [date], once we have your brand files.", good: true },
        { label: "A wrong answer says", text: "Stage one will be ready by [date].", note: "It dropped the condition about the brand files.", good: false },
      ] },
      { kind: "h3", text: "B. Repeat with 2 more tasks" },
      { kind: "list", ordered: true, items: [
        "Pick 2 more tasks you do every week. For example, a client reply and a summary of call notes.",
        "Run each one through both tools with the prompt from step 04.",
        "Fill in a new scorecard for each task on the same day, while you remember how it went.",
        "Write down anything that annoyed or surprised you. You need these notes in step 06.",
      ] },
      { kind: "tip", text: "**Short on time?** Do one task every other day. Do at least 3 tasks in total. One task can be luck." },
      { kind: "h3", text: "C. Testing a search tool for research?" },
      { kind: "p", text: "Ask it a question you already know the answer to. Then open every link it gives. Does the page really say what the tool claims? If not, don't trust it for facts you will quote to a client." },
    ] },
    { num: "06", title: "Decide and cancel", accent: "Keep one, cancel the rest.", blocks: [
      { kind: "p", text: "Now let AI add up your scores. It gives you a keep or cancel answer for each subscription. The final choice is yours." },
      { kind: "h3", text: "A. Get a recommendation from your scores" },
      { kind: "list", ordered: true, items: [
        "Open the tool you use most and start a new chat.",
        "Copy the prompt below and paste it in the chat box.",
        "Replace the 3 parts in [square brackets]: your 3 scorecards, your notes, and your table from step 02. Press Enter.",
      ] },
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
      { kind: "result", label: "What a good answer looks like", lines: [
        "Totals: Tool A [total] out of 75, Tool B [total] out of 75.",
        "Tool B did best. It kept your facts and needed fewer changes.",
        "Tool A | Cancel | Lower scores on facts and tone",
        "Tool B | Keep | Best total score",
        "Tool A did better on: [CHECK], no clear win in your notes.",
      ] },
      { kind: "list", ordered: true, items: [
        "Add up one tool's total yourself. Does it match the answer?",
        "Read your notes again. If it says keep a tool you didn't enjoy using, trust your notes.",
      ] },
      { kind: "h3", text: "B. Cancel the ones you don't need" },
      { kind: "list", ordered: true, items: [
        "For each tool marked **cancel**, sign in to that tool.",
        "Click your name or profile picture, then **Settings**.",
        "Look for a page called billing, plan or subscription. Click it.",
        "Click the cancel button. Do this before the next renewal date in your table.",
        "Check your email for a message that says the cancellation worked. Save it.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["No billing page in Settings", "The menu moved, or you pay another way", "Search \"cancel subscription\" on the tool's help pages: [OpenAI](https://help.openai.com/), [Anthropic](https://support.anthropic.com/), [Google](https://support.google.com/gemini)"],
        ["You pay through the App Store or Google Play", "The app store charges you, not the tool", "Cancel it in your phone's app store subscriptions"],
        ["It is part of your work plan", "Your company pays for it", "Ask the person who runs your company's account"],
        ["Still charged after cancelling", "The cancel may not have gone through", "Find the email from step B. Contact the tool's help team with it"],
      ] },
      { kind: "honest", text: "**The honest part:** a new subscription won't fix an unclear request. The tool you keep is only as good as the details you give it. AI can add up your scores. You decide what to keep, and you check every answer before a client sees it." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Two tools picked, based on where your work happens",
        "Every AI subscription listed in one table, with renewal dates",
        "Training switched off in both tools",
        "One real task run through both tools and scored",
        "Facts in each answer checked against your material",
        "3 real tasks scored over the week",
        "A keep or cancel choice made for each tool",
        "The ones you don't need cancelled, with the email saved",
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
    paragraph: "Keep one main tool. Use the AI assistant already inside your work apps. Run the side-by-side test again only when a new tool says it does your job better.",
    finishLine: "Pay only for the tool that helps you most each week.",
  },
};
