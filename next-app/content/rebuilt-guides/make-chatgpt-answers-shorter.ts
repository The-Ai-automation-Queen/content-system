import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "make-chatgpt-answers-shorter",
  lumailTag: "guide-make-chatgpt-answers-shorter",
  title: "How to Make ChatGPT Give Shorter Answers",
  cover: "/images/mascot/explaining.webp",
  coverAlt: "The blue robot mascot explaining a chart with a pointer",
  seoDescription: "Make ChatGPT give shorter answers: save your length rules once in Custom instructions, add 3 short lines, and check nothing true was cut.",
  tool: "ChatGPT",
  minutes: 20,
  h1: { title: "How to Make ChatGPT Give", accent: "Shorter Answers" },
  hero: {
    kind: "pose",
    src: "/images/mascot/explaining.webp",
    alt: "The blue robot mascot explaining a chart with a pointer",
    line: "Save one set of rules once. Then ChatGPT stops writing long answers.",
  },
  intro: {
    heading: "Short answers, every time, without asking",
    lead: "\"Make it shorter\" rarely works. ChatGPT does not know what short means for you. In this guide, you write length rules for the jobs you do and save them once. You also get three lines for when you need it even shorter.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "Why ChatGPT writes long, and what short means for each of your jobs",
        "**Your answer-length rules**, written for your own work",
        "Those rules saved in **Custom instructions** (a ChatGPT setting it reads before every chat)",
        "**3 shortcut lines** to add to any prompt",
        "A check that the short answer did not cut anything true",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. You can copy and paste every prompt below. Replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get your",
    accent: "Answer-Length Rules.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Decide what short means", accent: "A length for each job.", blocks: [
      { kind: "p", text: "ChatGPT writes long when it does not know what you need. So it covers everything. It adds an opening and offers more help at the end. Tell it a length and a shape for each job. That fixes most of it." },
      { kind: "list", ordered: true, items: [
        "Write down the 4 or 5 things you ask ChatGPT for most. For example: email replies to clients, notes from calls, social posts, parts of a proposal.",
        "For each one, decide how long the answer should be. Start from the table below.",
        "Write the shape too: bullets, a few short paragraphs, or one line.",
      ] },
      { kind: "table", head: ["Job", "Suggested length", "Shape"], rows: [
        ["Reply to a client email", "Under 120 words", "Short paragraphs, answer in the first line"],
        ["Summary of call notes", "3 bullets", "Decisions, actions, open questions"],
        ["Social post", "Under 60 words", "One idea, one thing to do next"],
        ["Proposal section", "Under 150 words", "Short paragraphs, no extra words"],
        ["Quick question", "2 or 3 sentences", "Answer first, then why"],
      ] },
      { kind: "tip", text: "These are ideas, not rules from ChatGPT. Change any of them to fit how you work. Your own list goes into step 02." },
    ] },
    { num: "02", title: "Write your length rules", accent: "Built from your jobs.", blocks: [
      { kind: "p", text: "Your length rules are a short list. They tell ChatGPT how long each answer should be, and what shape." },
      { kind: "p", text: "Start a new chat. Paste this prompt with your list from step 01." },
      { kind: "prompt", label: "Write my answer-length rules", text: `Write answer-length rules for me to save in my ChatGPT Custom instructions.

Here are the jobs I ask you for most often, with the length and shape I want:
[paste your list from step 01, for example: "Client email reply: under 120 words, answer in the first line"]

Write the rules as instructions to you, in this format:
1. One line of general rules that apply to every answer: answer first, no introduction, no closing offer of more help, no repeating my question.
2. One line per job: the job, the length, the shape.
3. One line saying: if a job isn't listed, keep it under 100 words unless I ask for more.
4. One line saying: never drop a fact, a deadline or a condition to make an answer shorter; if something important doesn't fit, say what you left out.

Keep the whole thing under 1,000 characters. Use only the jobs and lengths I gave you. Plain English, no em dashes.` },
      { kind: "p", text: "Read the rules. Does a length look wrong for how you work? Change the number now. Copy the final rules." },
    ] },
    { num: "03", title: "Save them once", accent: "So every chat follows them.", blocks: [
      { kind: "p", text: "ChatGPT reads Custom instructions before every chat. So you never have to ask for short answers again." },
      { kind: "list", ordered: true, items: [
        "Go to [chatgpt.com](https://chatgpt.com). Click your name or profile picture, then **Settings**.",
        "Open **Personalization**, then **Custom instructions**.",
        "Find the box about how ChatGPT should reply. Paste your length rules there. If there is already text, add your rules below it. Click Save.",
        "Start a new chat and ask a normal question. The answer should follow your rules.",
      ] },
      { kind: "tip", text: "**Can't find Custom instructions?** Menus change. Search \"custom instructions\" on [OpenAI's help pages](https://help.openai.com/). Still can't find it? Keep the rules in your notes. Paste them as the first message of a chat. Do you use a ChatGPT Project (a folder in ChatGPT that remembers your files)? You can also add the rules to the Project's instructions." },
    ] },
    { num: "04", title: "Keep 3 shortcut lines", accent: "For when you need it shorter.", blocks: [
      { kind: "p", text: "Sometimes you need one answer even shorter than your rules. Add one of these lines to the end of any prompt." },
      { kind: "table", head: ["Add this line", "Use it when"], rows: [
        ["**3 bullets only.**", "You need the main points of a document, an email chain or call notes"],
        ["**Under 100 words.**", "You need a reply or a draft to send fast"],
        ["**Answer first, then one line of why.**", "You asked a question and only want the answer"],
      ] },
      { kind: "prompt", label: "Example: a shortcut line in use", text: `Here is a client email: [paste the email, with names swapped for brackets].
Draft my reply. Use only what's in the email and my notes: [your notes].
Write [CHECK] where details are missing instead of guessing.
Under 100 words.` },
      { kind: "tip", text: "Save the 3 lines in your notes, or as a text shortcut on your phone. Then you can paste them in a second." },
    ] },
    { num: "05", title: "Check it didn't cut the truth", accent: "Short and still right.", blocks: [
      { kind: "p", text: "When AI makes an answer shorter, it can make things sound more certain. \"Waiting for the client to confirm\" can become \"confirmed\". This step catches that." },
      { kind: "list", ordered: true, items: [
        "You get a short answer you plan to use. Paste the prompt below in the same chat.",
        "Read what it says it left out.",
        "Is something important missing? Add it back in your own words before you send.",
      ] },
      { kind: "prompt", label: "What did you leave out?", text: `Look at your last answer and the material I gave you.
What did you leave out that matters? List:
1. Any fact, deadline, price or condition you dropped
2. Anything you made sound more certain or more agreed than it is in my material
3. Anything you added that wasn't in my material

If nothing important was left out, say "Nothing important left out". Do not rewrite the answer.` },
      { kind: "honest", text: "**The honest part:** shorter is not always better. A short answer can drop a deadline. It can make something sound agreed when it is not. That can cost you more than a long answer. The shorter the answer, the more carefully you read each word before a client sees it." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Main jobs listed, with a length for each",
        "Answer-length rules written",
        "Rules saved in Custom instructions and tested in a new chat",
        "3 shortcut lines saved in your notes",
        "\"What did you leave out\" check used on a real answer",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your answers come back short.",
    accent: "Now hand over the admin.",
    body: "The Claude guide sets up one Admin project for three jobs. It turns call notes into actions. It answers questions about long documents. It turns rough points into emails.",
    label: "Use Claude for your admin →",
    href: "/guides/claude/",
  },
  conclusion: {
    heading: "Keep it tight",
    paragraph: "Is an answer still too long? Add that job and its length to your rules. Did a short answer drop something important? Run the check. Then add a rule so it does not happen again.",
    finishLine: "Say what short means once, and stop asking for it.",
  },
};
