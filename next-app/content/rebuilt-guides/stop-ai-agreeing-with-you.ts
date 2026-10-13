import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "stop-ai-agreeing-with-you",
  lumailTag: "guide-stop-ai-agreeing-with-you",
  title: "How to Get ChatGPT to Tell Me What's Wrong With My Idea",
  cover: "/images/guides/stop-ai-agreeing-with-you.webp",
  coverAlt: "The blue robot mascot checking pages with a magnifier and a red stamp",
  seoDescription: "How to get ChatGPT to tell you what's wrong with your idea: save one honest answers rule and a critic that checks your offers, pages and plans.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Get ChatGPT to Tell Me", accent: "What's Wrong With My Idea" },
  hero: {
    kind: "scene",
    src: "/images/guides/stop-ai-agreeing-with-you.webp",
    alt: "The blue robot mascot checking pages with a magnifier and a red stamp",
    line: "Save one rule that puts problems first. Then get honest feedback on your offers, pages and plans.",
  },
  intro: {
    heading: "Honest feedback, before your clients give it",
    lead: "Here is the moment. You wrote a new offer and you ask ChatGPT, \"Is this good?\" It says \"Great offer!\" and adds a few small tips. You feel good, and you launch. Then nobody buys, and you don't know why. This guide sets AI up to show you the problems first. You get the weak spots in your offer before your clients find them.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**AI that starts with the problems**, in every chat, because one rule is saved in your settings",
        "**The 5 biggest problems in your offer**, as your client would see them, with the exact line for each",
        "**The risks in your next plan**, and the early warning sign for each one",
        "**One saved AI assistant that runs both checks**, so you paste your work in and get honest feedback",
        "**2 or 3 weak spots checked with real clients**, so you know which ones are real",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer with a web browser, like Chrome. The steps are for the website.",
        "A ChatGPT account. The free plan works. Claude or Gemini work too.",
        "One real offer, sales page or client email you wrote. Swap client names for brackets like [client].",
        "One real plan you are about to spend time or money on, like a launch or a new price.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted. Change the parts in [square brackets] to your own details." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get",
    accent: "your honest critic.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "See why it agrees", accent: "5 minutes. Then find where to fix it.", blocks: [
      { kind: "p", text: "AI tools learn to give answers people like. People like it when you agree with them. So when you sound excited, the tool praises your idea. It hides problems and says what you hoped to hear." },
      { kind: "h3", text: "A. See it for yourself" },
      { kind: "list", ordered: true, items: [
        "Open [chatgpt.com](https://chatgpt.com). Click **New chat** at the top left.",
        "Type the first question below. Swap the bracket for one line about your offer. Press Enter.",
        "Read the first sentence of the answer. Does it start with praise?",
        "Click **New chat** again. Type the second question. Press Enter.",
        "Compare the two answers.",
      ] },
      { kind: "example", label: "What you type, first", text: "Here is my new offer: [one line about your offer]. Is it good?" },
      { kind: "example", label: "What you type, second", text: "Here is my new offer: [one line about your offer]. What would make a client say no?" },
      { kind: "result", label: "What you will often see", lines: [
        "First answer: \"This sounds like a great offer!\" and a few small tips.",
        "Second answer: real reasons, like an unclear price or no proof that it works.",
      ] },
      { kind: "contrast", items: [
        { label: "Asks for a yes", text: "Is this good? Do you like my idea?", good: false },
        { label: "Asks for a real answer", text: "What's wrong with this? What would make a client say no?", good: true },
      ] },
      { kind: "h3", text: "B. Find where standing rules go" },
      { kind: "p", text: "You fix this for good with standing rules. These are words the tool reads before every chat, so you don't repeat them. Find the box now. You paste your rule into it in step 02." },
      { kind: "p", text: "**ChatGPT:**" },
      { kind: "list", ordered: true, items: [
        "Click your name or profile picture. On most screens it is at the bottom left.",
        "Click **Settings**. A settings window opens.",
        "Click **Personalization**. Look for **Custom instructions**. You will see a text box.",
        "Can't find it? OpenAI moves these menus. Search \"custom instructions\" on [OpenAI's help pages](https://help.openai.com/).",
      ] },
      { kind: "p", text: "**Claude:**" },
      { kind: "list", ordered: true, items: [
        "Open [claude.ai](https://claude.ai). Click your name at the bottom left.",
        "Click **Settings**, then **Profile**. Find the box about personal preferences.",
        "Can't find it? Anthropic moves these menus. Search \"personal preferences\" on [Anthropic's help pages](https://support.claude.com/).",
      ] },
      { kind: "p", text: "**Gemini:**" },
      { kind: "list", ordered: true, items: [
        "Open [gemini.google.com](https://gemini.google.com). On the left, near the bottom, click **Settings & help**.",
        "Click **Saved info**. On some accounts it is called **Personal context** or **Instructions for Gemini**.",
        "Can't find it? Google moves these menus. Search \"saved info\" on [Google's Gemini help pages](https://support.google.com/gemini/).",
      ] },
      { kind: "tip", text: "**No standing rules box on your plan?** You can still do this whole guide. Keep the rule from step 02 in your notes. Paste it as the first message of each chat." },
    ] },
    { num: "02", title: "Save the honest answers rule", accent: "Once, in your settings.", blocks: [
      { kind: "p", text: "This rule tells the tool to put problems first. It must say when it disagrees. It must not praise work for no reason." },
      { kind: "list", ordered: true, items: [
        "Open the standing rules box you found in step 01.",
        "Is there text in it already? Click at the very end of it and press Enter twice. Don't delete what is there.",
        "Copy the rule below and paste it in. You don't need to change anything.",
        "Click **Save**. You will see the box close, or a small message that it saved.",
      ] },
      { kind: "prompt", label: "Honest answers rule", text: `When I share an idea, offer, page or plan:
- Start with the problems, most serious first. Then what works.
- Don't praise it unless you can say exactly why it works.
- If you disagree with me, say so plainly and explain why.
- If something is missing, say what is missing.
- Tell me what my client would doubt or object to.
- Don't soften feedback to protect my feelings.
- If you're not sure, say "I'm not sure". Never make up facts, figures or examples to make a point.` },
      { kind: "h3", text: "Test it" },
      { kind: "list", ordered: true, items: [
        "Click **New chat**. The rule only works in new chats.",
        "Type the question below and press Enter.",
        "Read the first two sentences of the answer.",
      ] },
      { kind: "example", label: "What you type", text: "I'm thinking of raising my prices next month. Good idea?" },
      { kind: "result", label: "What a good answer looks like", lines: [
        "\"It depends on a few things I don't know yet. What do clients say about your price now? How many clients could you afford to lose?\"",
        "Then the risks, then what could work. No \"Great idea!\" at the start.",
      ] },
      { kind: "p", text: "Still starts with praise? Open the box again and check the rule saved. Then try in a new chat." },
    ] },
    { num: "03", title: "Get the problems first", accent: "Read it as your client would.", blocks: [
      { kind: "p", text: "This prompt asks the AI to read your offer as your buyer. It tells you where they would stop, doubt or leave." },
      { kind: "list", ordered: true, items: [
        "Click **New chat**.",
        "Copy the prompt below and paste it in the chat box.",
        "Describe your client in the first bracket. Be exact: what they do, what they tried before.",
        "Paste your offer, page or email where it says [paste it]. Client names swapped for brackets.",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Problems first", text: `Read this as my ideal client: [describe them, for example "a coach with 5 years' experience who has tried two other programmes and was disappointed"].

What I am testing (offer, sales page or email):
[paste it, with client names and private details swapped for brackets]

Give me three sections:

1. PROBLEMS: the 5 biggest problems, most serious first. For each: the exact line, what the client would think when they read it, and why it matters.
2. QUESTIONS: the questions this client would still have before buying, that the text does not answer.
3. WHAT WORKS: up to 3 things that work, and exactly why.

Rules:
- Problems first, always.
- Quote the exact line for every point.
- Use only what I gave you. Don't make up facts about my business or my clients. Write [CHECK] if you need details you don't have.` },
      { kind: "example", label: "What you test", text: "A 200-word proposal to a new client." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "PROBLEMS 1. \"The fee is [price]\" comes before any benefit. The client sees the cost before the value.",
        "PROBLEMS 2. The second and third paragraphs say the same thing.",
        "PROBLEMS 3. No clear next step. The client does not know what to do to say yes.",
        "QUESTIONS: How long does it take? What if I'm not happy?",
        "WHAT WORKS: the first line names the client's problem in their words.",
      ] },
      { kind: "list", ordered: true, items: [
        "Copy the PROBLEMS and QUESTIONS parts into a note. Call it **Weak spots**.",
        "Fix the ones you agree with in your offer.",
        "For the ones you don't agree with, write one line on why. You check them with clients in step 06.",
      ] },
      { kind: "tip", text: "**Still too kind?** Reply in the same chat: \"You're being too polite. What would make this client close the page?\"" },
    ] },
    { num: "04", title: "Find what could go wrong", accent: "Imagine it already failed.", blocks: [
      { kind: "p", text: "Use this for a launch, a new offer or a big choice. You ask the AI to imagine the plan failed. Then it works back to find out why. This finds risks that normal feedback misses." },
      { kind: "list", ordered: true, items: [
        "Click **New chat**.",
        "Copy the prompt below and paste it in.",
        "Pick 3 or 6 months in the first bracket.",
        "Describe your plan in 3 to 5 lines: what, when, the price range, who it is for.",
        "Add what you know so far: what worked before, what clients said, how much time and money you have.",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "What could go wrong", text: `Imagine it is [3 or 6] months from now and this plan has failed.

The plan:
[describe the launch, offer or decision, with dates, price range and who it is for]

What I know so far:
[what has worked before, what clients have said, what time and money I have]

Give me:
1. The 5 most likely reasons it failed, most likely first. For each: what went wrong, the early warning sign I could watch for in the first 2 weeks, and one thing I could do now to stop it.
2. The one guess in my plan that, if wrong, breaks everything.
3. The cheapest way to test that guess in the next 2 weeks, before I commit.

Use only what I gave you. Don't make up figures, results or client stories. If you need details, ask me first.` },
      { kind: "example", label: "Example plan", text: "Run a paid workshop in 6 weeks, promoted only on Instagram." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "1. Too little time to fill seats. Warning sign: few sign-ups by week 2.",
        "2. One place to promote it only. Warning sign: the same few people reply each time.",
        "3. The price was never tested. Warning sign: people ask about it, then don't buy.",
        "The guess that breaks everything: that your followers want a paid workshop.",
        "Cheapest test: ask 10 past clients if they would pay [price] for it.",
      ] },
      { kind: "list", ordered: true, items: [
        "Open your calendar. Add each warning sign on the date you would see it.",
        "Run the cheapest test first.",
        "Only then spend more time or money on the plan.",
      ] },
    ] },
    { num: "05", title: "Check the feedback yourself", accent: "Honest is not the same as right.", blocks: [
      { kind: "p", text: "An honest AI can still be wrong. It can quote a line you never wrote. It can guess what your clients think. So check its feedback before you change anything." },
      { kind: "list", ordered: true, items: [
        "Take the first problem in the answer. Copy 4 or 5 words from the line it quoted.",
        "Open your own offer. Press **Ctrl + F** on Windows, or **Cmd + F** on a Mac. Paste the words and press Enter.",
        "Do the words light up? If not, the AI made up the line. Cross that problem off.",
        "Read the problem again. Does it say something about your clients, like \"they have tried this before\"? Did you tell it that? If not, it is a guess. Mark it **check with clients**.",
        "Look for any number or fact in the feedback. Did it come from you? If not, don't use it.",
        "Do this for each problem on the list.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["It still starts with \"Great idea!\"", "The rule did not save, or it is an old chat", "Check the rule saved. Start a new chat"],
        ["It quotes a line you can't find", "It made up the line", "Cross the problem off. Ask it to quote only real lines"],
        ["It says what your clients think, with no proof", "It is guessing", "Mark it check with clients"],
        ["It finds a problem in everything, even small things", "It is being harsh to follow the rule", "Ask: \"Which 2 of these matter most to a buyer?\""],
        ["You disagree with a point", "You may know better", "Write one line on why. Check it with a client"],
      ] },
      { kind: "honest", text: "**The honest part:** the AI has never met your clients. It can find unclear lines, missing answers and risky guesses. It can also be wrong. Treat its list as questions to check. What clients say and do decides." },
    ] },
    { num: "06", title: "Save your honest critic", accent: "Both checks, every time.", blocks: [
      { kind: "p", text: "Your honest critic is a saved AI assistant. You paste something in, and it runs both checks. You don't need to find the prompts each time." },
      { kind: "prompt", label: "Honest critic rules", text: `You are my honest critic for [business name], which sells [what you sell] to [who your clients are].

When I paste an offer, page, email or plan:
1. Read it as my ideal client: [describe them].
2. List the 5 biggest problems, most serious first, quoting the exact line for each.
3. List the questions the client would still have before buying.
4. Imagine it failed in 3 months. Give the 3 most likely reasons and one early warning sign for each.
5. Then up to 3 things that work, and why.

Rules:
- Problems first. No praise without a reason.
- Say plainly when you disagree with me.
- Quote only lines that are really in what I paste.
- Use only what I give you. Write [CHECK] where details are missing. Never make up facts, figures, names or client stories.
- Finish with the one change that would make the biggest difference.` },
      { kind: "h3", text: "A. In ChatGPT or Claude: make a Project" },
      { kind: "p", text: "A Project is a folder that keeps its own rules. Every chat inside it follows them." },
      { kind: "list", ordered: true, items: [
        "In the sidebar on the left, find **Projects**. Click **New project** (on some accounts it is a **+** next to Projects).",
        "Type the name **Honest critic**. Click **Create project**. The project page opens.",
        "Find the project's **Instructions** box. On some screens, click the three dots or the settings icon at the top of the project first.",
        "Paste the rules above. Fill in the brackets. Click **Save**.",
        "Start a chat inside the project. Paste your offer, page or plan. Press Enter.",
        "Can't find **Projects**? Some plans don't have them, and the menus move. Search \"projects\" on [OpenAI's help pages](https://help.openai.com/) or [Anthropic's help pages](https://support.claude.com/).",
      ] },
      { kind: "h3", text: "B. In Gemini: make a Gem" },
      { kind: "p", text: "A Gem is a saved AI assistant in Gemini with its own rules." },
      { kind: "list", ordered: true, items: [
        "On the left side of Gemini, look for **Gems** (on some screens, **Explore Gems**). Click it.",
        "Click **New Gem**. Type the name **Honest critic**.",
        "Paste the rules into the **Instructions** box. Fill in the brackets. Click **Save**.",
        "Can't find **Gems**? Search \"Gems\" on [Google's Gemini help pages](https://support.google.com/gemini/).",
      ] },
      { kind: "h3", text: "C. Neither? Use your notes" },
      { kind: "list", ordered: true, items: [
        "Make a note called **Honest critic**. Paste the rules in.",
        "Each time, start a new chat. Paste the rules as the first message, then your work under them.",
      ] },
      { kind: "h3", text: "D. Check with real clients" },
      { kind: "p", text: "The critic gives you possible weak spots. Only your clients know which ones are real. Open your **Weak spots** note. Pick the 2 or 3 that worry you most." },
      { kind: "list", ordered: true, items: [
        "Email two or three past clients one question. For example: \"When you first saw this offer, what made you unsure?\"",
        "On your next sales calls, listen for the questions from the QUESTIONS part.",
        "Write down what clients say, in their words, in your Weak spots note.",
        "Next time you use the critic, paste it in under the heading \"What clients have said\".",
      ] },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Asked \"Is it good?\" and \"What would make a client say no?\" and saw the difference",
        "Honest answers rule saved, and tested in a new chat",
        "Problems first run on one real offer, page or email, and the Weak spots note saved",
        "What could go wrong run on one real plan, with warning signs in your calendar",
        "Every quoted line found in your own work with Ctrl + F (or Cmd + F)",
        "Honest critic saved in a Project, a Gem or your notes",
        "2 or 3 weak spots checked with real clients",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You get honest answers now.",
    accent: "Pick the right tool for each job.",
    body: "ChatGPT, Claude, Gemini and Copilot are good at different things. The next guide shows which one to use for each job.",
    label: "Choose the right AI tool →",
    href: "/guides/which-ai-tool-for-what/",
  },
  conclusion: {
    heading: "Keep it honest",
    paragraph: "Run the critic on every new offer, page and plan. Check every quoted line yourself. Add what clients tell you to its rules. If the praise comes back, make the rule stronger.",
    finishLine: "Hear the problems from AI first. Then check them with your clients.",
  },
};
