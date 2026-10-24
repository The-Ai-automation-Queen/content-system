import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "ai-skills-worth-learning-for-work",
  lumailTag: "guide-ai-skills-worth-learning-for-work",
  title: "Why Are My ChatGPT Answers So Average?",
  cover: "/images/guides/ai-skills-worth-learning-for-work.webp",
  coverAlt: "The blue robot mascot carrying a compass, magnifier, key and gauge past changing machines",
  seoDescription: "Why are my ChatGPT answers so average? Because it has to guess. Give it your details, let it ask questions, and save your rules. 5 steps.",
  tool: "ChatGPT",
  minutes: 20,
  h1: { title: "Why Are My ChatGPT Answers", accent: "So Average?" },
  hero: {
    kind: "scene",
    src: "/images/guides/ai-skills-worth-learning-for-work.webp",
    alt: "The blue robot mascot carrying a compass, magnifier, key and gauge past changing machines",
    line: "Because it has to guess. Here is what to give it instead.",
  },
  intro: {
    heading: "Get a ChatGPT answer you can send",
    lead: "ChatGPT gives average answers when it has to guess. This guide shows you what to give it instead.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "One **follow-up email** to a client, ready to send",
        "A **prompt** that makes ChatGPT ask you questions first",
        "**Your rules** saved in ChatGPT, so every new chat starts better",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "better answers prompts.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Ask with details", accent: "Stop the guessing.", blocks: [
      { kind: "p", text: "A one-line request makes ChatGPT guess. Give it four things instead." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and click **New chat**.",
        "Type your request with these four things:",
      ] },
      { kind: "table", head: ["Give it", "Example"], rows: [
        ["Who it is for", "[client], who runs a [type of business]"],
        ["What happened", "We spoke on [day] about [topic]"],
        ["What you want back", "A follow-up email, under 120 words, friendly"],
        ["What not to do", "Do not add any price or promise I did not give you"],
      ] },
      { kind: "tip", text: "Write [client] instead of real names. Put the real details back in yourself before you send." },
    ] },
    { num: "02", title: "Let it ask you questions", accent: "So you forget nothing.", blocks: [
      { kind: "p", text: "Not sure what to give it? Ask ChatGPT to interview you first." },
      { kind: "prompt", label: "Ask me questions first", text: `I need [the task, for example: a follow-up email to a client after our call].

Before you write anything, ask me the questions you need.
Ask one question at a time and wait for my answer.
Ask no more than 6 questions.

Then write it. Use only what I tell you.
If something is missing, write [CHECK].
Never make up names, prices, dates or promises.` },
      { kind: "p", text: "Answer each question in a few words. ChatGPT writes when it has what it needs." },
    ] },
    { num: "03", title: "Give it your notes", accent: "Your words, not its guesses.", blocks: [
      { kind: "p", text: "Real notes give real answers. Paste them in." },
      { kind: "prompt", label: "Write from my notes", text: `Here are my notes from a call with [client]:

[paste your notes here]

Write a follow-up email from me to [client].
- Under 120 words
- Thank them for the call in one line
- What we agreed, in 2 or 3 short lines
- One next step with a date
- Friendly and plain

Use only what is in my notes. If something is missing, write [CHECK].` },
      { kind: "p", text: "Copy the email into your email app. Do not send it yet." },
    ] },
    { num: "04", title: "Check it before you send", accent: "Every time.", blocks: [
      { kind: "p", text: "ChatGPT can still get a detail wrong. Find it before your client does." },
      { kind: "prompt", label: "List every fact", text: `List every name, date, price and promise in the email you wrote.
For each one, show the words from my notes it comes from.
If it is not in my notes, write NOT IN NOTES.` },
      { kind: "list", ordered: true, items: [
        "Delete or fix every line marked **NOT IN NOTES**.",
        "Fill in every **[CHECK]** yourself.",
        "Read the email once more, then send it.",
      ] },
    ] },
    { num: "05", title: "Save your rules", accent: "Paste once.", blocks: [
      { kind: "p", text: "Save your rules in ChatGPT once. Every new chat then follows them." },
      { kind: "list", ordered: true, items: [
        "Click your name or picture, then **Settings**, then **Personalization**.",
        "Open **Custom instructions**.",
        "Paste the text below into the box about how ChatGPT should respond, then click **Save**.",
      ] },
      { kind: "prompt", label: "My rules", text: `I run [type of business] for [who you help].
Write in plain English. Short sentences. Friendly and direct.
Keep emails under 150 words unless I ask for more.
If you need more details, ask me before you write.
Use only what I give you. If something is missing, write [CHECK].
Never make up names, prices, dates or promises.` },
      { kind: "tip", text: "Can't find it? OpenAI moves this menu. Search \"custom instructions\" on [OpenAI's help pages](https://help.openai.com)." },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Asked with the four details",
        "Used the ask-me-questions prompt once",
        "Wrote one email from your notes",
        "Checked every fact and filled every [CHECK]",
        "Saved your rules in Custom instructions",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your answers are better.",
    accent: "Now keep your clients safe.",
    body: "You will paste more real notes into ChatGPT now. The next guide shows what must never go in.",
    label: "See what never to share →",
    href: "/guides/what-should-you-never-share-with-ai/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Give ChatGPT the details. Let it ask when you are not sure. Check every fact before you send.",
    finishLine: "No guessing in. No surprises out.",
  },
};
