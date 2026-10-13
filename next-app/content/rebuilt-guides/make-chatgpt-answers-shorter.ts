import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "make-chatgpt-answers-shorter",
  lumailTag: "guide-make-chatgpt-answers-shorter",
  title: "How to Make ChatGPT Give Shorter Answers",
  cover: "/images/mascot/explaining.webp",
  coverAlt: "The blue robot mascot explaining a chart with a pointer",
  seoDescription: "Make ChatGPT give shorter answers: save your length rules once in Custom instructions, add short lines, and check nothing was cut. 5 steps.",
  tool: "ChatGPT",
  minutes: 20,
  h1: { title: "How to Make ChatGPT Give", accent: "Shorter Answers" },
  hero: {
    kind: "pose",
    src: "/images/mascot/explaining.webp",
    alt: "The blue robot mascot explaining a chart with a pointer",
    line: "Save your length rules once. Get short answers every time.",
  },
  intro: {
    heading: "Short answers without asking",
    lead: "ChatGPT writes long because it does not know what short means to you. This guide saves your lengths once. It takes 20 minutes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A length for each job**, like client replies and call notes",
        "**Your length rules** saved in ChatGPT",
        "**3 short lines** to add when you need it shorter",
        "**One client reply**, short and checked",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "answer length rules.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Decide what short means", accent: "No AI needed.", blocks: [
      { kind: "p", text: "\"Make it shorter\" makes ChatGPT guess. Give it a length and a shape instead." },
      { kind: "list", ordered: true, items: [
        "Open a note.",
        "Write the 4 or 5 jobs you ask ChatGPT for most.",
        "Next to each, write a length and a shape. Start from the table below.",
      ] },
      { kind: "table", head: ["Job", "Length", "Shape"], rows: [
        ["Reply to a client email", "Under 120 words", "Answer in the first line"],
        ["Call notes summary", "3 bullets", "Decisions, actions, open questions"],
        ["Social post", "Under 60 words", "One idea, one next step"],
        ["Quick question", "2 or 3 sentences", "Answer first, then why"],
      ] },
    ] },
    { num: "02", title: "Write your length rules", accent: "From your list.", blocks: [
      { kind: "p", text: "ChatGPT turns your list into clear rules for itself." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and click **New chat**.",
        "Paste the prompt below with your list in the brackets.",
      ] },
      { kind: "prompt", label: "Write my length rules", text: `Write answer-length rules for my ChatGPT Custom instructions.

Here are my jobs, with the length and shape I want:
[paste your list from step 01]

Write them as instructions to you:
1. One line for every answer: answer first, no introduction, no offer of more help at the end, no repeating my question.
2. One line per job: the job, the length, the shape.
3. One line: if a job is not listed, keep it under 100 words unless I ask for more.
4. One line: never drop a fact, deadline or condition to save words. If something does not fit, say what you left out.

Keep it under 1,000 characters. Use only the jobs and lengths I gave you.` },
      { kind: "p", text: "Check every job is there. Copy the rules into your note." },
    ] },
    { num: "03", title: "Save the rules", accent: "Paste once.", blocks: [
      { kind: "p", text: "Custom instructions (a setting ChatGPT reads before every chat) makes every new chat follow them." },
      { kind: "list", ordered: true, items: [
        "Click your name or picture, then **Settings**, then **Personalization**.",
        "Open **Custom instructions**.",
        "Paste the rules into the box about how ChatGPT should respond, then click **Save**.",
        "Click **New chat** and ask for one of your jobs. Check the length.",
      ] },
      { kind: "tip", text: "Can't find it? OpenAI moves this menu. Search \"custom instructions\" on [OpenAI's help pages](https://help.openai.com/)." },
    ] },
    { num: "04", title: "Add a short line", accent: "When you need it shorter.", blocks: [
      { kind: "p", text: "Sometimes one answer must be shorter still. End your prompt with one of these: **3 bullets only.** **Under 100 words.** **Answer first, then one line of why.**" },
      { kind: "prompt", label: "Short client reply", text: `Here is a client email: [paste the email, with names swapped for [client]].
Draft my reply from my notes: [your notes].
Use only what I give you. If something is missing, write [CHECK].
Never make up names, prices, dates or promises.
Under 100 words.` },
      { kind: "p", text: "Keep the 3 lines at the top of your note so you can paste them fast." },
    ] },
    { num: "05", title: "Check nothing was cut", accent: "Short and still right.", blocks: [
      { kind: "p", text: "Short answers can drop a deadline. \"Waiting to confirm\" can become \"confirmed\"." },
      { kind: "prompt", label: "What did you leave out?", text: `Look at your last answer and what I gave you. List:
1. Any fact, deadline, price or condition you dropped
2. Anything you made sound more certain than it is
3. Anything you added that was not in what I gave you

If nothing important was left out, write "Nothing important left out". Do not rewrite the answer.` },
      { kind: "list", ordered: true, items: [
        "Put back anything it dropped, in your own words.",
        "Check every date and price against your notes.",
        "Check words like **agreed**, **confirmed** and **done** are really true.",
      ] },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Gave each job a length and a shape",
        "Wrote your length rules",
        "Saved them in Custom instructions",
        "Wrote one reply with a short line",
        "Checked nothing important was cut",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your answers come back short.",
    accent: "Now hand over the admin.",
    body: "The Claude guide sets up one Admin project for call notes, long documents and emails.",
    label: "Use Claude for your admin →",
    href: "/guides/claude/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Still too long? Add that job to your rules. Check every short answer before you send.",
    finishLine: "Say what short means once. Stop asking for it.",
  },
};
