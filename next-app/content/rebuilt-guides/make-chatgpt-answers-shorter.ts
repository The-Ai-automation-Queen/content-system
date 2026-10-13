import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "make-chatgpt-answers-shorter",
  lumailTag: "guide-make-chatgpt-answers-shorter",
  title: "How to Make ChatGPT Give Shorter Answers",
  cover: "/images/mascot/explaining.webp",
  coverAlt: "The blue robot mascot explaining a chart with a pointer",
  seoDescription: "Make ChatGPT give shorter answers: save your length rules once in Custom instructions, add 3 shortcut lines, and check nothing true was cut.",
  tool: "ChatGPT",
  minutes: 20,
  h1: { title: "How to Make ChatGPT Give", accent: "Shorter Answers" },
  hero: {
    kind: "pose",
    src: "/images/mascot/explaining.webp",
    alt: "The blue robot mascot explaining a chart with a pointer",
    line: "One instruction, saved once, so it stops writing essays.",
  },
  intro: {
    heading: "Short answers, every time, without asking",
    lead: "\"Make it shorter\" rarely works, because ChatGPT doesn't know what short means for you. A client reply, a summary and a social post each need a different length. This guide writes your length rules for the jobs you actually do, saves them once so ChatGPT follows them in every chat, and gives you three lines for the times you need it even shorter.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A clear idea of why ChatGPT writes long, and what short means for each of your jobs",
        "**Your answer-length rules**, written for your own work",
        "Those rules saved in **Custom instructions**, so every chat follows them",
        "**3 shortcut lines** you can add to any prompt",
        "A check that the short version didn't cut anything true",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get your",
    accent: "Answer-Length Rules.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Decide what short means", accent: "A length for each job.", blocks: [
      { kind: "p", text: "ChatGPT writes long when it doesn't know what you need, so it covers everything, adds an introduction and offers more at the end. Giving it a length and a shape for each job fixes most of that." },
      { kind: "list", ordered: true, items: [
        "Write down the 4 or 5 things you ask ChatGPT for most often, for example: client email replies, summaries of call notes, social posts, proposal sections.",
        "For each one, decide how long the answer should be. Use the table below as a starting point.",
        "Note the shape too: bullets, a few short paragraphs, or one line.",
      ] },
      { kind: "table", head: ["Job", "Suggested length", "Shape"], rows: [
        ["Reply to a client email", "Under 120 words", "Short paragraphs, answer in the first line"],
        ["Summary of call notes", "3 bullets", "Decisions, actions, open questions"],
        ["Social post", "Under 60 words", "One idea, one call to action"],
        ["Proposal section", "Under 150 words", "Short paragraphs, no filler"],
        ["Quick question", "2 or 3 sentences", "Answer first, then why"],
      ] },
      { kind: "tip", text: "These are suggestions, not rules from ChatGPT. Change any of them to fit how you work. Your own list is what goes into step 02." },
    ] },
    { num: "02", title: "Write your length rules", accent: "Built from your jobs.", blocks: [
      { kind: "p", text: "Your length rules are a short set of instructions that tell ChatGPT how long and what shape each answer should be." },
      { kind: "p", text: "Start a new chat and paste this prompt with your list from step 01." },
      { kind: "prompt", label: "Write my answer-length rules", text: `Write answer-length rules for me to save in my ChatGPT Custom instructions.

Here are the jobs I ask you for most often, with the length and shape I want:
[paste your list from step 01, for example: "Client email reply: under 120 words, answer in the first line"]

Write the rules as instructions to you, in this format:
1. One line of general rules that apply to every answer: answer first, no introduction, no closing offer of more help, no repeating my question.
2. One line per job: the job, the length, the shape.
3. One line saying: if a job isn't listed, keep it under 100 words unless I ask for more.
4. One line saying: never drop a fact, a deadline or a condition to make an answer shorter; if something important doesn't fit, say what you left out.

Keep the whole thing under 1,000 characters. Use only the jobs and lengths I gave you. Plain English, no em dashes.` },
      { kind: "p", text: "Read the rules. If a length looks wrong for how you work, change the number now. Copy the final version." },
    ] },
    { num: "03", title: "Save them once", accent: "So every chat follows them.", blocks: [
      { kind: "p", text: "Custom instructions are read before every chat, so you never have to ask for short answers again." },
      { kind: "list", ordered: true, items: [
        "Go to [chatgpt.com](https://chatgpt.com), click your name or profile picture, then **Settings**.",
        "Open **Personalization**, then **Custom instructions**.",
        "Paste your length rules into the box about how ChatGPT should respond. If something is already there, add your rules underneath. Save.",
        "Start a new chat and ask a normal question. The answer should follow your rules.",
      ] },
      { kind: "tip", text: "**Can't find Custom instructions?** Menus change. Search \"custom instructions\" on [OpenAI's help pages](https://help.openai.com/). If you still can't find it, keep the rules in your notes and paste them as the first message of a chat. If you use a ChatGPT Project, you can also add them to the Project's instructions." },
    ] },
    { num: "04", title: "Keep 3 shortcut lines", accent: "For when you need it shorter.", blocks: [
      { kind: "p", text: "Sometimes you need one answer even shorter than your rules. Add one of these lines to the end of any prompt." },
      { kind: "table", head: ["Add this line", "Use it when"], rows: [
        ["**3 bullets only.**", "You need the main points of a document, a thread or call notes"],
        ["**Under 100 words.**", "You need a reply or a draft you can send quickly"],
        ["**Answer first, then one line of why.**", "You asked a question and only want the answer"],
      ] },
      { kind: "prompt", label: "Example: a shortcut line in use", text: `Here is a client email: [paste the email, with names swapped for brackets].
Draft my reply. Use only what's in the email and my notes: [your notes].
Write [CHECK] where information is missing instead of guessing.
Under 100 words.` },
      { kind: "tip", text: "Save the 3 lines in your notes or a text shortcut on your phone, so you can paste them in a second." },
    ] },
    { num: "05", title: "Check it didn't cut the truth", accent: "Short and still right.", blocks: [
      { kind: "p", text: "When AI shortens, it tends to round things up. \"Waiting for the client to confirm\" can become \"confirmed\". This step catches that." },
      { kind: "list", ordered: true, items: [
        "After a short answer you plan to use, paste the prompt below in the same chat.",
        "Read what it says it left out.",
        "If something important is missing, add it back in your own words before you send.",
      ] },
      { kind: "prompt", label: "What did you leave out?", text: `Look at your last answer and the material I gave you.
What did you leave out that matters? List:
1. Any fact, deadline, price or condition you dropped
2. Anything you made sound more certain or more agreed than it is in my material
3. Anything you added that wasn't in my material

If nothing important was left out, say "Nothing important left out". Do not rewrite the answer.` },
      { kind: "honest", text: "**The honest part:** shorter isn't always better. A short answer that drops a deadline or makes something sound agreed when it isn't can cost you more than a long one. The shorter the answer, the more carefully you read each word before it goes to a client." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Listed your main jobs and a length for each",
        "Answer-length rules written",
        "Rules saved in Custom instructions and tested in a new chat",
        "3 shortcut lines saved in your notes",
        "Used the \"what did you leave out\" check on a real answer",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your answers come back short.",
    accent: "Now hand over the admin.",
    body: "The Claude guide sets up one Admin project for three jobs: call notes to actions, questions about long documents, and rough points into emails.",
    label: "Use Claude for your admin →",
    href: "/guides/claude/",
  },
  conclusion: {
    heading: "Keep it tight",
    paragraph: "When an answer still comes back too long, add that job and its length to your rules. When a short answer drops something important, run the check and add a rule so it doesn't happen again.",
    finishLine: "Say what short means once, and stop asking for it.",
  },
};
