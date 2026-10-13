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
    line: "Stop AI saying yes to everything. Save one rule and one critic. Get the problems first.",
  },
  intro: {
    heading: "Honest feedback, before your clients give it",
    lead: "Ask AI about your offer and it will often say it's great. That feels nice, but you learn nothing. This guide saves one honest answers rule, two prompts that find problems, and a critic you can use again.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "An **honest answers rule** saved in your settings",
        "A **problems first** prompt that reads your offer as your client would",
        "A **what could go wrong** prompt that finds risks in your plan",
        "**Your honest critic**: a saved assistant that runs both checks",
        "A short list of weak spots to check with real clients",
      ] },
      { kind: "tip", text: "You need ChatGPT, Claude or Gemini. The free plans work. Have one real offer, sales page or plan ready. Copy and paste each prompt below. Change the parts in [square brackets]." },
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
    { num: "01", title: "Know why it agrees", accent: "And where to fix it.", blocks: [
      { kind: "p", text: "AI tools learn to give answers people like. People like it when you agree with them. So when you sound excited, the tool praises your idea. It hides problems and says what you hoped to hear." },
      { kind: "p", text: "You fix this with standing rules. These are words the tool reads before every chat, so you don't repeat them. Find where they go in your tool now. You will paste your rule there in step 02." },
      { kind: "table", head: ["Tool", "Where standing rules go", "If you can't find it"], rows: [
        ["ChatGPT", "Click your name or picture. Then **Settings**, **Personalization**, **Custom instructions**.", "Search \"custom instructions\" on [OpenAI's help pages](https://help.openai.com/)."],
        ["Claude", "Click your name. Then **Settings**, **Profile**. Find the box about personal preferences.", "Search \"personal preferences\" on [Anthropic's help pages](https://support.claude.com/)."],
        ["Gemini", "Open **Settings & help**, then **Saved info**. It may say **Personal context** or **Instructions for Gemini**.", "Search \"saved info\" on [Google's Gemini help pages](https://support.google.com/gemini/)."],
      ] },
      { kind: "tip", text: "**Your plan has no standing rules?** You can still do this whole guide. Keep the rule from step 02 in your notes. Paste it as the first message of the chat." },
      { kind: "p", text: "Also watch how you ask. \"Is this good?\" asks for a yes. \"What's wrong with this?\" asks for a real answer." },
    ] },
    { num: "02", title: "Save the honest answers rule", accent: "Once, in your settings.", blocks: [
      { kind: "p", text: "This rule tells the tool to put problems first. It must say when it disagrees. It must not praise work for no reason." },
      { kind: "list", ordered: true, items: [
        "Open the standing rules box from step 01.",
        "Is there text in it already? Add the rule at the end. Don't delete what's there.",
        "Paste the rule below and click save.",
      ] },
      { kind: "prompt", label: "Honest answers rule", text: `When I share an idea, offer, page or plan:
- Start with the problems, most serious first. Then what works.
- Don't praise it unless you can say exactly why it works.
- If you disagree with me, say so plainly and explain why.
- If something is missing, say what is missing.
- Tell me what my client would doubt or object to.
- Don't soften feedback to protect my feelings.
- If you're not sure, say so. Never make up facts, figures or examples to make a point.` },
      { kind: "p", text: "**Test it:** start a new chat. Type \"I'm thinking of raising my prices next month. Good idea?\" Does the answer start with questions or risks, not \"Great idea!\"? Then the rule works." },
    ] },
    { num: "03", title: "Get problems first", accent: "Read it as your client would.", blocks: [
      { kind: "p", text: "This prompt asks the AI to read your offer as your buyer. It tells you where they would stop, doubt or leave." },
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
      { kind: "p", text: "Copy the PROBLEMS and QUESTIONS parts into your notes. These are your weak spots. Fix the ones you agree with. For the others, write one line on why. You will check them with clients in step 05." },
      { kind: "tip", text: "**Still too kind?** Reply in the same chat: \"You're being too polite. What would make this client close the page?\"" },
    ] },
    { num: "04", title: "Find what could go wrong", accent: "Imagine it already failed.", blocks: [
      { kind: "p", text: "Use this for a launch, a new offer or a big choice. Ask the AI to imagine it failed. Then it works back to find out why. This finds risks that normal feedback misses." },
      { kind: "prompt", label: "What could go wrong", text: `Imagine it is [3 or 6] months from now and this plan has failed.

The plan:
[describe the launch, offer or decision, with dates, price range and who it is for]

What I know so far:
[what has worked before, what clients have said, what time and money I have]

Give me:
1. The 5 most likely reasons it failed, most likely first. For each: what went wrong, the early warning sign I could watch for, and one thing I could do now to stop it.
2. The one guess in my plan that, if wrong, breaks everything.
3. The cheapest way to test that guess in the next 2 weeks, before I commit.

Use only what I gave you. Don't make up figures, results or client stories. If you need details, ask me first.` },
      { kind: "p", text: "Put the warning signs in your calendar or plan. Run the 2-week test first. Then spend more time or money." },
    ] },
    { num: "05", title: "Save your honest critic", accent: "Both checks, every time.", blocks: [
      { kind: "p", text: "Your honest critic is a saved assistant. Paste something in, and it runs both checks. You don't need to find the prompts each time." },
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
- Use only what I give you. Write [CHECK] where details are missing. Never make up facts, figures, names or client stories.
- Finish with the one change that would make the biggest difference.` },
      { kind: "list", ordered: true, items: [
        "**You see Projects in ChatGPT or Claude** (a folder that keeps its own rules)? Make one called **Honest critic**. Paste the rules into its instructions box. Paste your work into chats inside it.",
        "**In Gemini:** do you see **Gems** (saved assistants)? Make a new Gem called **Honest critic**. Paste the rules in.",
        "**You see neither?** Save the rules in your notes as **Honest critic**. Paste them as the first message of a new chat.",
      ] },
      { kind: "h3", text: "Then check with real clients" },
      { kind: "p", text: "The critic gives you a list of possible weak spots. Only your clients know which ones are real. Pick the 2 or 3 that worry you most. Check them like this:" },
      { kind: "list", items: [
        "Ask two or three past clients one question. For example: \"When you first saw this offer, what made you unsure?\"",
        "On sales calls, listen for the questions from the QUESTIONS part.",
        "Write down what clients say. Paste it into the critic next time as \"What clients have said\".",
      ] },
      { kind: "honest", text: "**The honest part:** the critic has never met your clients. It can find unclear lines, missing answers and risky guesses. It can also be wrong. Treat its list as questions to check. What clients say and do decides." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Found where standing rules go in your tool",
        "Honest answers rule saved and tested",
        "Problems first prompt run on one real offer or page",
        "What could go wrong prompt run on one real plan",
        "Honest critic saved in a Project, a Gem or your notes",
        "Two or three weak spots checked with real clients",
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
    paragraph: "Run the critic on every new offer, page and plan. Add what clients tell you to its rules. If the praise comes back, make the rule stronger.",
    finishLine: "Hear the problems from AI first. Then check them with your clients.",
  },
};
