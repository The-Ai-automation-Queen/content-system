import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "stop-ai-agreeing-with-you",
  lumailTag: "guide-stop-ai-agreeing-with-you",
  title: "How to Get ChatGPT to Tell Me What's Wrong With My Idea",
  cover: "/images/guides/stop-ai-agreeing-with-you.webp",
  coverAlt: "The blue robot mascot checking pages with a magnifier and a red stamp",
  seoDescription: "How to get ChatGPT to tell you what's wrong with your idea: save one honest answers rule and a critic for your offers and plans. 5 steps.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Get ChatGPT to Tell Me", accent: "What's Wrong With My Idea" },
  hero: {
    kind: "scene",
    src: "/images/guides/stop-ai-agreeing-with-you.webp",
    alt: "The blue robot mascot checking pages with a magnifier and a red stamp",
    line: "Make ChatGPT show you the problems first.",
  },
  intro: {
    heading: "Get honest feedback first",
    lead: "ChatGPT tends to praise whatever you show it. This guide makes it show you the problems first.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**One rule** saved, so ChatGPT starts with the problems",
        "**The 5 biggest problems** in your offer",
        "**The risks in your next plan**, with warning signs",
        "**A saved honest critic** for every new offer",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "honest critic prompts.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "See it agree", accent: "Two questions.", blocks: [
      { kind: "p", text: "AI learns to give answers people like. So it praises what you show it." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and click **New chat**.",
        "Type: \"Here is my offer: [one line]. Is it good?\"",
        "Click **New chat** again.",
        "Type: \"Here is my offer: [one line]. What would make a client say no?\"",
      ] },
      { kind: "p", text: "Compare the two answers. The second one is the one you need." },
    ] },
    { num: "02", title: "Save the honest rule", accent: "Paste once.", blocks: [
      { kind: "p", text: "Save one rule in ChatGPT. Every new chat then puts problems first." },
      { kind: "list", ordered: true, items: [
        "Click your name or picture, then **Settings**, then **Personalization**.",
        "Open **Custom instructions**.",
        "Paste the text below at the end of the box, then click **Save**.",
      ] },
      { kind: "prompt", label: "Honest answers rule", text: `When I share an idea, offer, page or plan:
Start with the problems, most serious first. Then what works.
Don't praise it unless you can say exactly why it works.
If you disagree with me, say so plainly.
Tell me what my client would doubt.
If you're not sure, say so. Never make up facts, figures or examples.` },
      { kind: "p", text: "Open a new chat and ask: \"I'm thinking of raising my prices. Good idea?\" It should start with questions or risks." },
      { kind: "tip", text: "Can't find it? OpenAI moves this menu. Search \"custom instructions\" on [OpenAI's help pages](https://help.openai.com/)." },
    ] },
    { num: "03", title: "Get the problems first", accent: "Read it as your client.", blocks: [
      { kind: "p", text: "Ask ChatGPT to read your offer as your buyer would." },
      { kind: "prompt", label: "Problems first", text: `Read this as my ideal client: [describe them, for example: a coach who tried two programmes and was let down].

My offer, page or email:
[paste it, with client names swapped for brackets]

Give me:
1. PROBLEMS: the 5 biggest, most serious first. Quote the exact line for each.
2. QUESTIONS: what this client would still ask before buying.
3. WHAT WORKS: up to 3 things, and why.

Use only what I give you. If you need details, write [CHECK].
Never make up facts about my business or my clients.` },
      { kind: "list", ordered: true, items: [
        "Copy 4 or 5 words of each quoted line.",
        "Press **Ctrl + F** (Mac: **Cmd + F**) in your offer and paste them.",
        "Nothing lights up? It made the line up. Cross that problem off.",
        "Save the rest in a note called **Weak spots**. Fix the ones you agree with.",
      ] },
      { kind: "honest", text: "**The honest part:** ChatGPT has never met your clients. Its list is questions to check, not answers. What clients say decides." },
    ] },
    { num: "04", title: "Find what could go wrong", accent: "Before you spend money.", blocks: [
      { kind: "p", text: "Use this before a launch, a new offer or a new price." },
      { kind: "prompt", label: "What could go wrong", text: `Imagine it is [3 or 6] months from now and this plan has failed.

The plan:
[what, when, the price range, who it is for]

What I know so far:
[what worked before, what clients said, my time and money]

Give me:
1. The 5 most likely reasons it failed. For each, one early warning sign.
2. The one guess that breaks everything if it is wrong.
3. The cheapest way to test that guess in 2 weeks.

Use only what I give you. Never make up figures, results or client stories.` },
      { kind: "list", ordered: true, items: [
        "Put each warning sign in your calendar.",
        "Run the cheapest test first.",
        "Only then spend more time or money.",
      ] },
    ] },
    { num: "05", title: "Save your honest critic", accent: "Both checks in one place.", blocks: [
      { kind: "p", text: "Save both checks in a ChatGPT Project (a folder that keeps its own rules)." },
      { kind: "list", ordered: true, items: [
        "In the sidebar, click **New project**. Name it **Honest critic**.",
        "Open the project's **Instructions**.",
        "Paste the text below, fill in the brackets, then click **Save**.",
      ] },
      { kind: "prompt", label: "Honest critic", text: `You are my honest critic for [business name]. I sell [what you sell] to [who your clients are].

When I paste an offer, page, email or plan:
1. Read it as my ideal client: [describe them].
2. List the 5 biggest problems, most serious first. Quote the exact line for each.
3. List the questions the client would still have.
4. Imagine it failed in 3 months. Give 3 likely reasons and a warning sign for each.
5. Then up to 3 things that work.

Quote only lines that are really in what I paste.
Use only what I give you. If something is missing, write [CHECK].
Never make up facts, figures, names or client stories.` },
      { kind: "list", ordered: true, items: [
        "Pick the 2 or 3 weak spots that worry you most.",
        "Ask two past clients: \"When you first saw this offer, what made you unsure?\"",
        "Add what they say to the critic's instructions.",
      ] },
      { kind: "tip", text: "Can't find it? Some plans don't have Projects. Search \"projects\" on [OpenAI's help pages](https://help.openai.com/), or keep the text in your notes." },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Asked both questions and saw the difference",
        "Saved the honest answers rule",
        "Ran problems first on one real offer",
        "Ran what could go wrong on one real plan",
        "Saved your honest critic and asked two clients",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You get honest answers now.",
    accent: "Pick the right tool for each job.",
    body: "ChatGPT, Claude, Gemini and Copilot are good at different things. The next guide shows which to use for each job.",
    label: "Choose the right AI tool →",
    href: "/guides/which-ai-tool-for-what/",
  },
  conclusion: {
    heading: "Keep it honest",
    paragraph: "Run the critic on every new offer and plan. Check every quoted line. Ask real clients.",
    finishLine: "Hear the problems from AI first. Then check them with your clients.",
  },
};
