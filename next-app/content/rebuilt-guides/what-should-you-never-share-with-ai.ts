import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-should-you-never-share-with-ai",
  lumailTag: "guide-what-not-to-share-with-ai",
  title: "Is It Safe to Put Client Information Into ChatGPT?",
  cover: "/images/mascot/warning.webp",
  coverAlt: "The blue robot mascot thinking beside a warning sign",
  seoDescription: "Is it safe to put client information into ChatGPT? Switch off training, swap names for brackets and write a one-page AI data policy. 4 steps.",
  tool: "ChatGPT",
  minutes: 25,
  h1: { title: "Is It Safe to Put", accent: "Client Information Into ChatGPT?" },
  hero: {
    kind: "pose",
    src: "/images/mascot/warning.webp",
    alt: "The blue robot mascot thinking beside a warning sign",
    line: "Switch off one setting. Swap real names for brackets. Then tell clients how you use AI.",
  },
  intro: {
    heading: "Use AI and keep clients safe",
    lead: "Client details can leak into AI tools. This guide shows what to switch off, what to keep out and how to tell clients.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**Training switched off** in ChatGPT",
        "**A clear list** of what never goes in",
        "**Client notes with brackets** instead of real names",
        "**A one-page AI data policy** to show clients",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "AI data policy prompts.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Switch off training", accent: "Do it once.", blocks: [
      { kind: "p", text: "Training means the company can use your chats to improve its AI. Switch it off before any client work goes in." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and click your name or picture.",
        "Click **Settings**, then **Data Controls**.",
        "Switch off **Improve the model for everyone**.",
        "Close **Settings**, open it again and check the switch is still off.",
      ] },
      { kind: "p", text: "Use other AI tools too? Do the same in [Claude](https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings), [Gemini](https://support.google.com/gemini/answer/13278892) and [Copilot](https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls)." },
      { kind: "tip", text: "Can't find it? OpenAI moves this menu. Search \"data controls\" on [OpenAI's help page](https://help.openai.com/en/articles/7730893-chatgpt-data-controls-faq)." },
    ] },
    { num: "02", title: "Know what stays out", accent: "Before you paste.", blocks: [
      { kind: "p", text: "Training off does not make a chat private. Sort what you paste first." },
      { kind: "table", head: ["Never paste", "Ask the client first", "Fine to paste"], rows: [
        ["Passwords, card and bank details", "A client's emails and files", "Your own notes, names taken out"],
        ["Health or personal details", "Contracts and proposals with prices", "Your website and public posts"],
        ["Anything you signed to keep secret", "Money figures from their business", "Questions about how to do a task"],
      ] },
      { kind: "prompt", label: "Is this task safe?", text: `I sell [what you sell] to [who your clients are].
I want AI to help with this task: [the task, for example: turn my call notes into a proposal].

The notes have these kinds of details. I am describing them, not pasting them:
[for example: client name, prices, start date]

For each kind of detail, tell me: paste it, swap it for a bracket, or leave it out.
Then tell me what to ask the client first.
Do not ask me to paste any real details.` },
      { kind: "p", text: "Anything marked leave out stays out, even with brackets." },
    ] },
    { num: "03", title: "Swap names for brackets", accent: "Nothing real goes in.", blocks: [
      { kind: "p", text: "Brackets let AI help without knowing who the client is." },
      { kind: "list", ordered: true, items: [
        "Paste the client text into a blank document, not into ChatGPT.",
        "Swap names for **[client]**, prices for **[price]** and dates for **[date]**.",
        "Press **Ctrl + F** (Mac: **Cmd + F**). Search for **@**, **$** and the client's name.",
        "Swap anything that lights up. Then paste the text into ChatGPT with the prompt below.",
      ] },
      { kind: "prompt", label: "Write with brackets", text: `Here are my notes. Real details are swapped for brackets:

[paste your bracket version here]

Write [what you need, for example: a proposal] from these notes.
Keep every bracket exactly as it is. Do not guess what is behind them.
Use only what I give you. If something is missing, write [CHECK].
Never make up names, prices, dates or promises.` },
      { kind: "list", ordered: true, items: [
        "Copy the answer into your document.",
        "Press **Ctrl + H** (Google Docs on a Mac: **Cmd + Shift + H**) to open **Find and replace**.",
        "Swap each bracket back for the real detail. Fill in every **[CHECK]** yourself.",
      ] },
      { kind: "tip", text: "Keep your list of what each bracket means in your client file. Never paste it into AI." },
    ] },
    { num: "04", title: "Write your AI data policy", accent: "One page for clients.", blocks: [
      { kind: "p", text: "Clients ask how you use AI. One page answers them before they ask." },
      { kind: "prompt", label: "Interview me for my AI data policy", text: `Interview me to write a one-page AI data policy for my business.
Ask me one question at a time and wait for my answer:
1. What is my business name, and what do I sell?
2. Which AI tools do I use, and for which jobs?
3. What do I never put into AI tools?
4. How do I hide client details before they go in?
5. Have I switched off training?
6. Does a person check AI work before a client sees it?
7. Who should a client contact with questions?

Then write the policy. Plain English, short sentences, under 400 words.
Use only what I tell you. If something is missing, write [CHECK].
Never promise anything I have not told you I do.` },
      { kind: "list", ordered: true, items: [
        "Read each line. Delete any line that is not true today.",
        "Fill in every **[CHECK]** yourself.",
        "Put it on a page called **How we use AI** on your website.",
        "Add the link to your proposals and your welcome email.",
      ] },
      { kind: "honest", text: "**The honest part:** this is a safety check, not legal advice. Work in health, money or law? Ask a qualified adviser to read your policy first." },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Switched off training and checked it stayed off",
        "Sorted what you paste with the table",
        "Swapped one client text for brackets and put it back",
        "Wrote your AI data policy and filled every [CHECK]",
        "Put the policy on your website and in your proposals",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your client details are safe.",
    accent: "Now check what AI writes.",
    body: "AI can get names, prices and dates wrong. The next guide shows how to catch it before you send.",
    label: "Check AI before you send →",
    href: "/guides/catch-ai-making-things-up/",
  },
  conclusion: {
    heading: "Keep it safe",
    paragraph: "Switch off training in every AI tool you use. Swap real details for brackets. Tell clients how you use AI.",
    finishLine: "You put the brackets in. You put the real details back.",
  },
};
