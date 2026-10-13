import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "teach-claude-a-repeatable-workflow",
  lumailTag: "guide-teach-claude-a-repeatable-workflow",
  title: "How to Get Claude to Do the Same Weekly Task Without Explaining It Again",
  cover: "/images/guides/teach-claude-a-repeatable-workflow.webp",
  coverAlt: "The blue robot mascot feeding scattered notes into a machine that stacks them into neat pages",
  seoDescription: "Get Claude to do the same weekly task without explaining it again: write the steps once, test them on 2 real weeks and save them in a Claude Project.",
  tool: "Claude",
  minutes: 30,
  h1: { title: "How to Get Claude to Do the Same Weekly Task", accent: "Without Explaining It Again" },
  hero: {
    kind: "scene",
    src: "/images/guides/teach-claude-a-repeatable-workflow.webp",
    alt: "The blue robot mascot feeding scattered notes into a machine that stacks them into neat pages",
    line: "Write the steps once, test them, save them. Then every week starts with your notes, not a blank chat.",
  },
  intro: {
    heading: "One weekly job, written down once",
    lead: "If you explain the same job to Claude every week, you are doing the hard part every week. This guide writes the job down once as a workflow (a fixed set of instructions: what goes in, what Claude does, what comes out and where it stops), tests it on two real weeks and saves it so you only paste your notes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **workflow map** for one weekly job: input, steps, output and stop point",
        "**Workflow instructions** that Claude wrote by interviewing you",
        "A **saved weekly workflow** in a Claude Project (or in your notes), ready to reuse",
        "The workflow **tested on 2 real weeks**, with the fixes added as rules",
        "A clear **stop point** where Claude hands the work back to you",
      ] },
      { kind: "tip", text: "You need a Claude account. Projects make this easier; if your plan doesn't have them, step 03 gives you a fallback. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "saved weekly workflow.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Map the job in 4 parts", accent: "Before Claude sees it.", blocks: [
      { kind: "p", text: "Every repeatable job has 4 parts. Fill them in for one job first, so you know exactly what you are asking Claude to do." },
      { kind: "list", ordered: true, items: [
        "Pick one job you do every week that starts from notes or messages. A weekly client update is a good first one.",
        "Copy the table below into your notes.",
        "Fill in the right-hand column for your job. Short phrases are fine.",
      ] },
      { kind: "table", head: ["Part", "What it means", "Example: weekly client update"], rows: [
        ["Input", "What you give Claude each time", "My rough notes from the week, the client's last email, the project dates"],
        ["Steps", "What Claude does, in order", "Sort the notes into done, in progress and waiting; spot anything late; draft the update"],
        ["Output", "Exactly what comes back", "An email with 4 headings: Done, In progress, Waiting on you, Next week. Under 200 words"],
        ["Stop point", "What Claude must leave to you", "Draft only. I check dates and promises, and I send it"],
      ] },
      { kind: "tip", text: "**Can't fill in the Steps row?** Next time you do the job, write down what you do as you do it. That list is your Steps row." },
      { kind: "p", text: "Keep the reader's data safe from the start: in your notes, swap client names for [client] and amounts for [amount]. You put the real ones back in the final version." },
    ] },
    { num: "02", title: "Let Claude interview you", accent: "It writes the instructions.", blocks: [
      { kind: "p", text: "You know the job; Claude is good at turning what you know into clear instructions. Let it ask the questions." },
      { kind: "list", ordered: true, items: [
        "Go to [claude.ai](https://claude.ai/) and start a new chat.",
        "Paste the prompt below, with your filled-in table from step 01.",
        "Answer each question in a sentence or two.",
      ] },
      { kind: "prompt", label: "Interview me for my workflow", text: `I want to write instructions for a job I do every week, so you can do it the same way each time without me explaining it again.

Here is my map of the job:
Input: [what I give you each time]
Steps: [what you do, in order]
Output: [exactly what comes back]
Stop point: [what you must leave to me]

Ask me up to 6 questions to fill any gaps, one at a time, and wait for each answer. Ask about: what a good result looks like, the tone I use with clients, what goes wrong when I do it in a hurry, and anything you must never do.

Then write the workflow instructions with these sections:
1. What I will paste in each time
2. The steps, numbered
3. The output: format, headings, length, tone
4. Rules
5. Stop point: what you hand back to me

Always include these rules: use only what I paste in this chat; write [CHECK] where information is missing instead of guessing; never invent names, prices, dates or promises; draft only, never send or schedule anything.

Keep it under 2,000 characters, written as instructions to you.` },
      { kind: "p", text: "Read the instructions. If a step is wrong or missing, tell Claude what to change in the same chat. Copy the final version into your notes." },
    ] },
    { num: "03", title: "Save it in a Project", accent: "So it's there every week.", blocks: [
      { kind: "p", text: "A Claude Project (a workspace where every chat follows the same instructions) means you never paste the instructions again. You just open the project and paste the week's notes." },
      { kind: "list", ordered: true, items: [
        "**If you see Projects in the left sidebar:** click it, then **New project**. Name it after the job, for example **Weekly client update**.",
        "Inside the project, find the instructions box (it may be called **Set project instructions** or **Instructions**). Paste your workflow instructions and save.",
        "**If you don't see Projects:** save the instructions in your notes under the job name. Each week, paste them as the first message of a new chat, then paste your notes.",
        "Menu names change. If you can't find it, search \"projects\" on [Claude's help pages](https://support.claude.com/).",
      ] },
      { kind: "tip", text: "Keep a copy of the instructions in your notes even if you use a Project. It's your backup, and you can see what changed over time." },
    ] },
    { num: "04", title: "Test it on 2 weeks", accent: "One week proves nothing.", blocks: [
      { kind: "p", text: "A workflow that works once can still fail next week. Run it on two different weeks of real material and compare." },
      { kind: "list", ordered: true, items: [
        "Find last week's notes for the job and swap names for brackets.",
        "Open a new chat in the project (or a new chat with the instructions pasted first) and paste the notes. This is week 1.",
        "Open another new chat and paste the notes from the week before. This is week 2.",
        "Put the two results side by side and fill in the table below.",
      ] },
      { kind: "table", head: ["Check", "Week 1", "Week 2"], rows: [
        ["Same headings and order?", "[yes or no]", "[yes or no]"],
        ["Every name, date and number is in my notes?", "[yes or no]", "[yes or no]"],
        ["Missing facts marked [CHECK]?", "[yes or no]", "[yes or no]"],
        ["Right length and tone?", "[yes or no]", "[yes or no]"],
        ["Would I send it after a quick check?", "[yes or no]", "[yes or no]"],
      ] },
      { kind: "p", text: "Write down every \"no\". Those are your fixes for step 05." },
    ] },
    { num: "05", title: "Fix it with rules", accent: "Fix once, not every week.", blocks: [
      { kind: "p", text: "Every \"no\" from step 04 becomes a rule in the instructions, so the same mistake doesn't come back." },
      { kind: "prompt", label: "Turn my fixes into rules", text: `Here are my workflow instructions:
[paste the instructions]

I tested them on 2 weeks of notes. Here is what went wrong:
[list each problem, for example: the update was 350 words; it promised a delivery date that wasn't in my notes]

For each problem, add one short rule to the Rules section that stops it happening again.
Change nothing else. Show me the full updated instructions, then list the rules you added.` },
      { kind: "list", ordered: true, items: [
        "Paste the updated instructions into your project, replacing the old ones.",
        "Run week 1 again in a new chat. If the problem is gone, you're done.",
        "If a problem comes back twice, make the rule more specific, for example \"Under 200 words\" instead of \"Keep it short\".",
      ] },
    ] },
    { num: "06", title: "Set the stop point", accent: "Where Claude hands back.", blocks: [
      { kind: "p", text: "The stop point is what keeps a weekly workflow safe. Make it clear in the instructions, and keep these jobs with you." },
      { kind: "table", head: ["Claude can", "You must"], rows: [
        ["Sort your notes and draft the update", "Check every date, price and promise"],
        ["Mark missing information with [CHECK]", "Fill in every [CHECK] yourself"],
        ["Suggest what to say about a delay", "Decide what you tell the client"],
        ["Draft a reply to a client's question", "Read it and send it with your name on it"],
      ] },
      { kind: "p", text: "Check your instructions end with a line like this, and add it if they don't: \"Stop after the draft. Do not send, schedule or promise anything. Hand back to me with a list of what I must check.\"" },
      { kind: "honest", text: "**The honest part:** a saved workflow doesn't make Claude remember last week. Each run only knows the instructions and what you paste in, which also means it can't carry old facts into this week. It drafts. You check, decide and send." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Workflow map filled in for one weekly job",
        "Workflow instructions written by the interview prompt",
        "Instructions saved in a Claude Project or in your notes",
        "Tested on 2 real weeks and compared",
        "Fixes added as rules",
        "Stop point written into the instructions",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Claude does your weekly job.",
    accent: "Now write down how you do the rest.",
    body: "The next guide turns a screen recording of a task into written steps someone else can follow, so you can hand the work to a VA or freelancer.",
    label: "Turn a recording into instructions →",
    href: "/guides/chatgpt-screen-recording-to-process-guide/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Add a rule every time you fix the same thing twice, keep a copy of the instructions in your notes, and build the next workflow only when this one runs cleanly.",
    finishLine: "Explain it once, then let the rules do the remembering.",
  },
};
