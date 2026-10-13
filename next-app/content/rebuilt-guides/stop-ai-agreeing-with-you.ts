import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "stop-ai-agreeing-with-you",
  lumailTag: "guide-stop-ai-agreeing-with-you",
  title: "How to Get ChatGPT to Tell Me What's Wrong With My Idea",
  cover: "/images/guides/stop-ai-agreeing-with-you.webp",
  coverAlt: "The blue robot mascot checking pages with a magnifier and a red stamp",
  seoDescription: "How to get ChatGPT to tell you what's wrong with your idea: save a no-flattery rule and a critic assistant that tests your offers, pages and plans.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Get ChatGPT to Tell Me", accent: "What's Wrong With My Idea" },
  hero: {
    kind: "scene",
    src: "/images/guides/stop-ai-agreeing-with-you.webp",
    alt: "The blue robot mascot checking pages with a magnifier and a red stamp",
    line: "Stop it agreeing with everything you say. Save one rule and one critic, and get the problems first.",
  },
  intro: {
    heading: "Feedback you can use, before your clients give it",
    lead: "Ask AI what it thinks of your offer and it will usually tell you it's great. That feels good and teaches you nothing. This guide saves a no-flattery rule in your settings, gives you two prompts that find the problems in an offer, page or plan, and ends with a saved critic you can reuse every time.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **no-flattery rule** saved in your settings, so every chat starts honest",
        "A **problems-first feedback** prompt that reads your offer or sales page as your client would",
        "A **stress test** prompt that imagines your plan failed and works out why",
        "**Your honest critic**: a saved assistant that runs both checks on any offer, page or plan",
        "A short list of weak spots to check with real clients",
      ] },
      { kind: "tip", text: "You need ChatGPT, Claude or Gemini. The free plans work. Have one real offer, sales page or plan ready to test. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get",
    accent: "your honest critic.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Know why it agrees", accent: "And where to fix it.", blocks: [
      { kind: "p", text: "AI tools are trained to give answers people like. People like being agreed with. So when you share your idea and sound excited, the tool tends to praise it, soften any problems and tell you what you hoped to hear." },
      { kind: "p", text: "You fix this with standing instructions (text the tool reads before every chat, so you don't have to repeat it). Find where they live in your tool now. You will paste your rule there in step 02." },
      { kind: "table", head: ["Tool", "Where standing instructions live", "If you can't find it"], rows: [
        ["ChatGPT", "Click your name or profile picture, then **Settings**, then **Personalization**, then **Custom instructions**.", "Search \"custom instructions\" on [OpenAI's help pages](https://help.openai.com/)."],
        ["Claude", "Click your name, then **Settings**, then **Profile**. Look for the box about personal preferences Claude should consider.", "Search \"personal preferences\" on [Anthropic's help pages](https://support.claude.com/)."],
        ["Gemini", "Open **Settings & help**, then **Saved info** (it may be called **Personal context** or **Instructions for Gemini**).", "Search \"saved info\" on [Google's Gemini help pages](https://support.google.com/gemini/)."],
      ] },
      { kind: "tip", text: "**No standing instructions on your plan?** You can still do everything in this guide. Keep the rule from step 02 in your notes and paste it as the first message of any chat where you want honest feedback." },
      { kind: "p", text: "Also watch how you ask. \"Is this good?\" invites a yes. \"What's wrong with this?\" invites an answer." },
    ] },
    { num: "02", title: "Save the no-flattery rule", accent: "Once, in your settings.", blocks: [
      { kind: "p", text: "This rule tells the tool to put problems first, say when it disagrees, and stop praising work that hasn't earned it." },
      { kind: "list", ordered: true, items: [
        "Open the standing instructions box you found in step 01.",
        "If there is already text in it (for example a business profile), add this at the end. Don't replace what's there.",
        "Paste the rule below and save.",
      ] },
      { kind: "prompt", label: "No-flattery rule", text: `When I share an idea, offer, page or plan:
- Start with the problems, most serious first. Then what works.
- Don't praise it unless you can say exactly why it works.
- If you disagree with me, say so plainly and explain why.
- If something is missing, say what is missing.
- Tell me what my client would doubt or object to.
- Don't soften feedback to protect my feelings.
- If you're not sure, say so. Never invent facts, figures or examples to make a point.` },
      { kind: "p", text: "**Test it:** start a new chat and type \"I'm thinking of raising my prices next month. Good idea?\" If the answer starts with questions or risks instead of \"Great idea!\", the rule is working." },
    ] },
    { num: "03", title: "Get problems-first feedback", accent: "Read it as your client would.", blocks: [
      { kind: "p", text: "This prompt asks the AI to read your offer or sales page as the person you want to buy it, and to tell you where they would stop, doubt or leave." },
      { kind: "prompt", label: "Problems-first feedback", text: `Read this as my ideal client: [describe them, for example "a coach with 5 years' experience who has tried two other programmes and was disappointed"].

What I am testing (offer, sales page or email):
[paste it, with client names and private details swapped for brackets]

Give me three sections:

1. PROBLEMS: the 5 biggest problems, most serious first. For each: the exact line, what the client would think when they read it, and why it matters.
2. QUESTIONS: the questions this client would still have before buying, that the text does not answer.
3. WHAT WORKS: up to 3 things that work, and exactly why.

Rules:
- Problems first, always.
- Quote the exact line for every point.
- Use only what I gave you. Don't invent facts about my business or my clients. Write [CHECK] if you need information you don't have.` },
      { kind: "p", text: "Copy the PROBLEMS and QUESTIONS sections into your notes. These are your weak spots. Fix the ones you agree with. For the ones you don't, write one line on why, so you can check them with clients in step 05." },
      { kind: "tip", text: "**Still too kind?** Reply in the same chat: \"You're being too polite. What would make this client close the page?\"" },
    ] },
    { num: "04", title: "Stress-test the plan", accent: "Imagine it already failed.", blocks: [
      { kind: "p", text: "For a launch, a new offer or a big decision, ask the AI to imagine it went wrong and work backwards. This finds risks that ordinary feedback misses." },
      { kind: "prompt", label: "Stress test", text: `Imagine it is [3 or 6] months from now and this plan has failed.

The plan:
[describe the launch, offer or decision, with dates, price range and who it is for]

What I know so far:
[what has worked before, what clients have said, what time and money I have]

Give me:
1. The 5 most likely reasons it failed, most likely first. For each: what went wrong, the early warning sign I could watch for, and one thing I could do now to prevent it.
2. The one assumption in my plan that, if wrong, breaks everything.
3. The cheapest way to test that assumption in the next 2 weeks, before I commit.

Use only what I gave you. Don't invent figures, results or client stories. If you need information, ask me first.` },
      { kind: "p", text: "Add the early warning signs to your calendar or plan. Do the 2-week test before you spend more time or money on the plan." },
    ] },
    { num: "05", title: "Save your honest critic", accent: "Both checks, every time.", blocks: [
      { kind: "p", text: "Your honest critic is a saved assistant that runs the feedback and the stress test whenever you paste something in, so you don't have to find the prompts each time." },
      { kind: "prompt", label: "Honest critic instructions", text: `You are my honest critic for [business name], which sells [what you sell] to [who your clients are].

When I paste an offer, page, email or plan:
1. Read it as my ideal client: [describe them].
2. List the 5 biggest problems, most serious first, quoting the exact line for each.
3. List the questions the client would still have before buying.
4. Imagine it failed in 3 months. Give the 3 most likely reasons and one early warning sign for each.
5. Then up to 3 things that work, and why.

Rules:
- Problems first. No praise without a reason.
- Say plainly when you disagree with me.
- Use only what I give you. Write [CHECK] where information is missing. Never invent facts, figures, names or client stories.
- Finish with the one change that would make the biggest difference.` },
      { kind: "list", ordered: true, items: [
        "**If you see Projects in ChatGPT or Claude:** create a project called **Honest critic** and paste the instructions into its instructions box. Paste your offers, pages and plans into chats inside it.",
        "**In Gemini:** if you see **Gems**, create a new Gem called **Honest critic** and paste the instructions in.",
        "**If you see neither:** save the instructions in your notes as **Honest critic** and paste them as the first message of a new chat.",
      ] },
      { kind: "h3", text: "Then check with real clients" },
      { kind: "p", text: "The critic gives you a list of possible weak spots. Only your clients can tell you which ones are real. Pick the 2 or 3 that worry you most and check them:" },
      { kind: "list", items: [
        "Ask two or three past clients one question each, for example: \"When you first saw this offer, what made you hesitate?\"",
        "On your next sales calls, listen for the questions from the QUESTIONS section.",
        "Keep what clients say in your notes, and paste it into the critic next time as \"What clients have said\".",
      ] },
      { kind: "honest", text: "**The honest part:** the critic has never met your clients. It can spot unclear lines, missing answers and risky assumptions, and it can also be wrong. Treat its list as questions to check. What clients say and do decides." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Found where standing instructions live in your tool",
        "No-flattery rule saved and tested",
        "Problems-first feedback run on one real offer or page",
        "Stress test run on one real plan",
        "Honest critic saved in a project, a Gem or your notes",
        "Two or three weak spots checked with real clients",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You get honest answers now.",
    accent: "Pick the right tool for each job.",
    body: "ChatGPT, Claude, Gemini and Copilot are good at different things. The next guide shows which one to use for which job in your business.",
    label: "Choose the right AI tool →",
    href: "/guides/which-ai-tool-for-what/",
  },
  conclusion: {
    heading: "Keep it honest",
    paragraph: "Run the critic on every new offer, page and plan, add what clients tell you to its instructions, and tighten the rule if the praise creeps back.",
    finishLine: "Hear the problems from AI first, then check them with your clients.",
  },
};
