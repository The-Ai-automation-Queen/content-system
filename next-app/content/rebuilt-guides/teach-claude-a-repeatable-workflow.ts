import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "teach-claude-a-repeatable-workflow",
  lumailTag: "guide-teach-claude-a-repeatable-workflow",
  title: "How to Get Claude to Do the Same Weekly Task Without Explaining It Again",
  cover: "/images/guides/teach-claude-a-repeatable-workflow.webp",
  coverAlt: "The blue robot mascot feeding scattered notes into a machine that stacks them into neat pages",
  seoDescription: "Get Claude to do the same weekly task without explaining it again: write the steps once, test them on 2 real weeks, save them in a Project.",
  tool: "Claude",
  minutes: 30,
  h1: { title: "How to Get Claude to Do the Same Weekly Task", accent: "Without Explaining It Again" },
  hero: {
    kind: "scene",
    src: "/images/guides/teach-claude-a-repeatable-workflow.webp",
    alt: "The blue robot mascot feeding scattered notes into a machine that stacks them into neat pages",
    line: "Explain it once. Then just paste your notes each week.",
  },
  intro: {
    heading: "Explain your weekly job once",
    lead: "You explain the same weekly job to Claude every time. This guide saves your rules once, so you just paste your notes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**Your weekly job** written down in 4 parts",
        "**Clear rules for Claude**, written after it asks you questions",
        "**The rules saved in a Project**, so you never retype them",
        "**A weekly draft** you check and send yourself",
      ] },
      { kind: "tip", text: "You need a Claude account at claude.ai. The free plan works for the test. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "weekly job rules.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Write the job down", accent: "No AI yet.", blocks: [
      { kind: "p", text: "Pick one job you do every week from notes, like a client update. Write it in 4 parts." },
      { kind: "table", head: ["Part", "Example: weekly client update"], rows: [
        ["What goes in", "My rough notes and the client's last email"],
        ["The steps", "Sort notes into done, in progress, waiting. Write the update"],
        ["What comes out", "An email with 4 headings, under 200 words"],
        ["Where Claude stops", "Draft only. I check it and send it"],
      ] },
      { kind: "list", ordered: true, items: [
        "Write your own 4 parts in a note.",
        "Find your notes from the last 2 weeks.",
        "Swap every client name for [client] and every amount for [amount].",
      ] },
    ] },
    { num: "02", title: "Let Claude write the rules", accent: "It asks, you answer.", blocks: [
      { kind: "p", text: "You know the job. Claude turns it into clear rules." },
      { kind: "list", ordered: true, items: [
        "Open [Claude](https://claude.ai/) and click **New chat**.",
        "Paste the prompt below with your 4 parts.",
        "Answer each question in a sentence or two.",
      ] },
      { kind: "prompt", label: "Ask me about my weekly job", text: `I want instructions for a job I do every week, so you do it the same way each time.

What goes in: [what I give you]
The steps: [what you do, in order]
What comes out: [exactly what comes back]
Where you stop: [what you leave to me]

Ask me up to 6 questions, one at a time. Wait for each answer.

Then write the instructions in 5 sections:
1. What I paste in
2. The steps, numbered
3. The output: headings, length, tone
4. Rules
5. Where you stop

Always include these rules:
- Use only what I give you in this chat.
- If something is missing, write [CHECK].
- Never make up names, prices, dates or promises.
- Draft only. Never send or schedule anything.

Keep it under 2,000 characters.` },
      { kind: "p", text: "Check all 4 rules are in. Copy the instructions into your note." },
    ] },
    { num: "03", title: "Save them in a Project", accent: "Paste once.", blocks: [
      { kind: "p", text: "A Project (a folder in Claude with its own rules) makes every chat in it follow your instructions." },
      { kind: "list", ordered: true, items: [
        "Click **Projects** in the left sidebar, then **New project**.",
        "Name it, for example **Weekly client update**.",
        "Click **Instructions**, paste your instructions, then click **Save**.",
      ] },
      { kind: "p", text: "No Projects? Paste the instructions at the start of each new chat." },
      { kind: "tip", text: "Can't find it? Anthropic moves this menu. Search \"projects\" on [Claude's help pages](https://support.claude.com/)." },
    ] },
    { num: "04", title: "Test on 2 real weeks", accent: "One week proves nothing.", blocks: [
      { kind: "p", text: "Rules that work once can fail next week. Test them on two." },
      { kind: "list", ordered: true, items: [
        "Start a new chat in your Project.",
        "Paste last week's notes. Press Enter.",
        "Start another new chat. Paste the week before.",
      ] },
      { kind: "list", ordered: true, items: [
        "List every name, date, number and promise in each draft.",
        "Press **Ctrl + F** (or **Cmd + F**) in your notes and search each one.",
        "Not in your notes? Claude added it. Write it down.",
      ] },
    ] },
    { num: "05", title: "Fix each mistake", accent: "Fix once, not weekly.", blocks: [
      { kind: "p", text: "Every mistake becomes one new rule. Then it does not come back." },
      { kind: "prompt", label: "Turn my mistakes into rules", text: `Here are my weekly job instructions:
[paste the instructions]

I tested them on 2 weeks of notes. Here is what went wrong:
[each problem, for example: it was 350 words; it promised a date not in my notes]

For each problem, add one short rule that stops it.
Change nothing else. Show the full updated instructions, then list the new rules.` },
      { kind: "list", ordered: true, items: [
        "Paste the new version into your Project's **Instructions** and your note.",
        "Run week 1 again. Is the problem gone?",
      ] },
    ] },
    { num: "06", title: "Use it every week", accent: "Paste, check, send.", blocks: [
      { kind: "p", text: "Claude writes the draft. You decide what goes to the client." },
      { kind: "list", ordered: true, items: [
        "Swap client names in your notes for [client].",
        "Start a new chat in your Project and paste your notes.",
        "Check every name, date and promise against your notes.",
        "Fill in every **[CHECK]**, put the real names back, and send it yourself.",
      ] },
      { kind: "honest", text: "**The honest part:** Claude does not remember last week. It only knows your rules and what you paste. So it can't bring old facts in. You still check, decide and send." },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Job written down in 4 parts",
        "Instructions written, with all 4 rules",
        "Instructions saved in a Project or your note",
        "2 real weeks tested and checked",
        "Each mistake turned into a rule",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Claude does your weekly job.",
    accent: "Now write down how you do the rest.",
    body: "The next guide turns a screen recording of a task into written steps. Then someone else can do it for you.",
    label: "Turn a recording into instructions →",
    href: "/guides/chatgpt-screen-recording-to-process-guide/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Fixed the same thing twice? Add a rule. Keep a copy of the rules in your note.",
    finishLine: "Explain it once. Let the rules remember.",
  },
};
