import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "catch-ai-making-things-up",
  lumailTag: "guide-catch-ai-making-things-up",
  title: "How to Check if ChatGPT Is Wrong Before You Send It to a Client",
  cover: "/images/guides/catch-ai-making-things-up.webp",
  coverAlt: "The blue robot mascot measuring a printed list and marking the wrong lines in red",
  seoDescription: "How to check if ChatGPT is wrong before a client sees it: mark every detail, run 3 check prompts and save one check for every draft. 5 steps.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Check if ChatGPT Is Wrong", accent: "Before You Send It to a Client" },
  hero: {
    kind: "scene",
    src: "/images/guides/catch-ai-making-things-up.webp",
    alt: "The blue robot mascot measuring a printed list and marking the wrong lines in red",
    line: "Find every wrong name, price and date before your client does.",
  },
  intro: {
    heading: "Catch mistakes before you send",
    lead: "ChatGPT sounds just as sure when it is wrong. This guide shows you how to check every detail before a client sees it. It takes 30 minutes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**Every name, price and date** checked against your notes",
        "**Every link** opened and read",
        "**The weak spots** a careful client would question",
        "**One saved check** you run on every draft",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "check before send prompts.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Mark every detail", accent: "Your first check.", blocks: [
      { kind: "p", text: "When AI does not know, it fills the gap. A price or date can change without warning." },
      { kind: "list", ordered: true, items: [
        "Paste your draft into a blank document.",
        "Make every name, number, date, price and promise **bold**.",
        "Open your own notes next to it.",
        "Find each bold detail in your notes.",
        "Not there, or different? Highlight it in yellow.",
      ] },
      { kind: "p", text: "Fix every yellow line from your notes, or delete it. Keep this draft for step 02." },
    ] },
    { num: "02", title: "Run the details check", accent: "Where did it come from?", blocks: [
      { kind: "p", text: "Now let ChatGPT list the details. You check its work against yours." },
      { kind: "prompt", label: "Details check", text: `Check this draft against my notes.

My notes:
[paste your notes, with client names swapped for brackets]

The draft:
[paste the draft]

Make a table: Detail | Where it is in my notes | Status.
For Status, write MATCHES NOTES, CHANGED (say what my notes say) or NOT IN NOTES.
List every name, number, date, price and promise.
Do not fix the draft. Do not guess. If you are not sure, write [CHECK].` },
      { kind: "list", ordered: true, items: [
        "Fix every **CHANGED** line from your notes.",
        "Check or delete every **NOT IN NOTES** line.",
        "Did it miss one of your yellow lines? Then always check by hand too.",
      ] },
    ] },
    { num: "03", title: "Check the sources", accent: "Open every link.", blocks: [
      { kind: "p", text: "AI can give a link that does not exist. Only opening it tells you." },
      { kind: "prompt", label: "Source check", text: `List every claim in this draft about the world, not about my business.
For example: numbers, studies, laws, what a tool can do.

The draft:
[paste the draft]

For each one, give me: the claim, the source and its link, and the exact sentence from the source.
If you do not know a real source, write NO SOURCE.
Never make up a link, an author, a sentence or a study.` },
      { kind: "list", ordered: true, items: [
        "Click each link. Error page? Cut the claim.",
        "Copy 4 or 5 words of the quoted sentence.",
        "Press **Ctrl + F** (Mac: **Cmd + F**) on the page and paste them.",
        "Nothing lights up? Cut the claim. Cut every **NO SOURCE** claim you can't find yourself.",
      ] },
    ] },
    { num: "04", title: "Find the weak spots", accent: "Read it as your client.", blocks: [
      { kind: "p", text: "Some mistakes are not wrong details. A promise goes too far, or a part misses what the client asked." },
      { kind: "prompt", label: "Weak spot check", text: `Read this draft as [who the client is, for example: a careful business owner].

The draft:
[paste the draft]

What the client asked for:
[paste or describe their request]

Find the 5 weakest lines. For each: the line, why a careful reader would question it, and a safer way to say it.
Look for promises, claims bigger than the proof and anything that misses what they asked.
Do not rewrite the whole draft.` },
      { kind: "p", text: "Fix the ones you agree with. You know the client. ChatGPT does not." },
    ] },
    { num: "05", title: "Save one check", accent: "Paste once.", blocks: [
      { kind: "p", text: "Three prompts each time is slow. Save one check in a ChatGPT Project (a folder that keeps its own rules)." },
      { kind: "list", ordered: true, items: [
        "In the sidebar, click **New project**. Name it **Check before send**.",
        "Open the project's **Instructions**.",
        "Paste the text below, then click **Save**.",
      ] },
      { kind: "prompt", label: "Check before send", text: `When I paste my notes and a draft, check the draft before I send it to a client.
Give me three short parts:
1. DETAILS: every name, number, date, price and promise, marked MATCHES NOTES, CHANGED or NOT IN NOTES.
2. SOURCES: every claim about the world, with its source and the exact sentence, or NO SOURCE.
3. WEAK SPOTS: the 3 lines a careful client would question, and a safer way to say each.
Do not rewrite the draft. If you are not sure, write [CHECK].
Never make up names, prices, dates, sources or links.` },
      { kind: "p", text: "Start every check in this project. Paste your notes and your draft." },
      { kind: "tip", text: "Can't find it? Some plans don't have Projects. Search \"projects\" on [OpenAI's help pages](https://help.openai.com/), or keep the text in your notes." },
      { kind: "honest", text: "**The honest part:** AI can miss its own mistakes. This check finds many fast. You still read it last and decide when to send." },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Marked every detail in one draft by hand",
        "Fixed every CHANGED and NOT IN NOTES line",
        "Opened every link and found the sentence",
        "Fixed the weak spots you agree with",
        "Saved Check before send in a Project or your notes",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your drafts get checked.",
    accent: "Now check what AI can reach.",
    body: "About to connect AI to your email, files or calendar? The next guide shows how to let it see as little as possible.",
    label: "Make your AI access list →",
    href: "/guides/connect-ai-to-email-files-calendar/",
  },
  conclusion: {
    heading: "Keep checking",
    paragraph: "Run Check before send on every client draft. Open every link. Read it once more yourself.",
    finishLine: "Two minutes before you send. No sorry email after.",
  },
};
