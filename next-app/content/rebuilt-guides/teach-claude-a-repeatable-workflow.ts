import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "teach-claude-a-repeatable-workflow",
  lumailTag: "guide-teach-claude-a-repeatable-workflow",
  title: "How to Get Claude to Do the Same Weekly Task Without Explaining It Again",
  cover: "/images/guides/teach-claude-a-repeatable-workflow.webp",
  coverAlt: "The blue robot mascot feeding scattered notes into a machine that stacks them into neat pages",
  seoDescription: "Get Claude to do the same weekly task without explaining it again: write the steps once, test them on 2 real weeks, save them in a Claude Project.",
  tool: "Claude",
  minutes: 30,
  h1: { title: "How to Get Claude to Do the Same Weekly Task", accent: "Without Explaining It Again" },
  hero: {
    kind: "scene",
    src: "/images/guides/teach-claude-a-repeatable-workflow.webp",
    alt: "The blue robot mascot feeding scattered notes into a machine that stacks them into neat pages",
    line: "Write the steps once. Test them. Save them. Then each week you just paste your notes.",
  },
  intro: {
    heading: "One weekly job, written down once",
    lead: "Do you explain the same job to Claude every week? Then you do the hard part every week. This guide writes the job down once as clear rules for Claude. You test the rules on two real weeks. Then you save them and only paste your notes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **job plan** for one weekly job: what goes in, the steps, what comes out, where it stops",
        "**Job rules** that Claude wrote by asking you questions",
        "**Your saved weekly job** in a Claude Project or your notes",
        "The rules **tested on 2 real weeks**, with fixes added",
        "A clear **stop point** where Claude gives the work back to you",
      ] },
      { kind: "tip", text: "You need a Claude account. Projects make this easier. No Projects on your plan? Step 03 shows another way. Copy and paste each prompt below. Change the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get",
    accent: "your saved weekly job.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Plan the job in 4 parts", accent: "Before Claude sees it.", blocks: [
      { kind: "p", text: "Every job you repeat has 4 parts. Fill them in for one job first. Then you know exactly what to ask Claude." },
      { kind: "list", ordered: true, items: [
        "Pick one job you do every week that starts from notes or messages. A weekly client update is a good first one.",
        "Copy the table below into your notes.",
        "Fill in the right-hand column for your job. Short phrases are fine.",
      ] },
      { kind: "table", head: ["Part", "What it means", "Example: weekly client update"], rows: [
        ["Input", "What you give Claude each time", "My rough notes, the client's last email, the project dates"],
        ["Steps", "What Claude does, in order", "Sort notes into done, in progress, waiting. Find anything late. Write the update"],
        ["Output", "Exactly what comes back", "An email with 4 headings: Done, In progress, Waiting on you, Next week. Under 200 words"],
        ["Stop point", "What Claude must leave to you", "Draft only. I check dates and promises. I send it"],
      ] },
      { kind: "tip", text: "**Can't fill in the Steps row?** Next time you do the job, write down each thing you do. That list is your Steps row." },
      { kind: "p", text: "Keep client details safe from the start. In your notes, swap client names for [client] and amounts for [amount]. You put the real ones back at the end." },
    ] },
    { num: "02", title: "Let Claude ask you questions", accent: "It writes the rules.", blocks: [
      { kind: "p", text: "You know the job. Claude is good at turning what you know into clear rules. Let it ask the questions." },
      { kind: "list", ordered: true, items: [
        "Go to [claude.ai](https://claude.ai/) and start a new chat.",
        "Paste the prompt below with your table from step 01.",
        "Answer each question in a sentence or two.",
      ] },
      { kind: "prompt", label: "Interview me for my weekly job", text: `I want to write instructions for a job I do every week, so you can do it the same way each time without me explaining it again.

Here is my plan of the job:
Input: [what I give you each time]
Steps: [what you do, in order]
Output: [exactly what comes back]
Stop point: [what you must leave to me]

Ask me up to 6 questions to fill any gaps, one at a time, and wait for each answer. Ask about: what a good result looks like, the tone I use with clients, what goes wrong when I do it in a hurry, and anything you must never do.

Then write the instructions with these sections:
1. What I will paste in each time
2. The steps, numbered
3. The output: format, headings, length, tone
4. Rules
5. Stop point: what you hand back to me

Always include these rules: use only what I paste in this chat; write [CHECK] where details are missing instead of guessing; never make up names, prices, dates or promises; draft only, never send or schedule anything.

Keep it under 2,000 characters, written as instructions to you.` },
      { kind: "p", text: "Read the rules. Is a step wrong or missing? Tell Claude what to change in the same chat. Copy the final version into your notes." },
    ] },
    { num: "03", title: "Save it in a Project", accent: "So it's there every week.", blocks: [
      { kind: "p", text: "A Claude Project is a space where every chat follows the same rules. So you never paste the rules again. You open the Project and paste the week's notes." },
      { kind: "list", ordered: true, items: [
        "**You see Projects in the left sidebar?** Click it, then **New project**. Name it after the job, for example **Weekly client update**.",
        "Inside the Project, find the rules box. It may say **Set project instructions** or **Instructions**. Paste your rules and save.",
        "**You don't see Projects?** Save the rules in your notes under the job name. Each week, paste them first in a new chat. Then paste your notes.",
        "Menu names change. Can't find it? Search \"projects\" on [Claude's help pages](https://support.claude.com/).",
      ] },
      { kind: "tip", text: "Keep a copy of the rules in your notes, even with a Project. It's your backup. You can also see what changed over time." },
    ] },
    { num: "04", title: "Test it on 2 weeks", accent: "One week proves nothing.", blocks: [
      { kind: "p", text: "Rules that work once can still fail next week. Run them on two different weeks of real notes. Then compare." },
      { kind: "list", ordered: true, items: [
        "Find last week's notes for the job. Swap names for brackets.",
        "Open a new chat in the Project, or paste the rules first in a new chat. Paste the notes. This is week 1.",
        "Open another new chat. Paste the notes from the week before. This is week 2.",
        "Put the two results side by side. Fill in the table below.",
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
      { kind: "p", text: "Every \"no\" from step 04 becomes a new rule. Then the same mistake doesn't come back." },
      { kind: "prompt", label: "Turn my fixes into rules", text: `Here are my weekly job instructions:
[paste the instructions]

I tested them on 2 weeks of notes. Here is what went wrong:
[list each problem, for example: the update was 350 words; it promised a delivery date that wasn't in my notes]

For each problem, add one short rule to the Rules section that stops it happening again.
Change nothing else. Show me the full updated instructions, then list the rules you added.` },
      { kind: "list", ordered: true, items: [
        "Paste the new rules into your Project. Delete the old ones.",
        "Run week 1 again in a new chat. Is the problem gone? Then you're done.",
        "Does a problem come back twice? Make the rule more exact. For example, \"Under 200 words\", not \"Keep it short\".",
      ] },
    ] },
    { num: "06", title: "Set the stop point", accent: "Where Claude hands back.", blocks: [
      { kind: "p", text: "The stop point keeps your weekly job safe. Make it clear in the rules. Keep these jobs for yourself." },
      { kind: "table", head: ["Claude can", "You must"], rows: [
        ["Sort your notes and write the draft", "Check every date, price and promise"],
        ["Mark missing details with [CHECK]", "Fill in every [CHECK] yourself"],
        ["Suggest what to say about a delay", "Decide what you tell the client"],
        ["Draft a reply to a client's question", "Read it and send it with your name on it"],
      ] },
      { kind: "p", text: "Check your rules end with a line like this. If not, add it: \"Stop after the draft. Do not send, schedule or promise anything. Hand back to me with a list of what I must check.\"" },
      { kind: "honest", text: "**The honest part:** saved rules don't make Claude remember last week. Each time, it only knows the rules and what you paste in. So it can't bring old facts into this week either. Claude writes the draft. You check, decide and send." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Job plan filled in for one weekly job",
        "Job rules written with the question prompt",
        "Rules saved in a Claude Project or your notes",
        "Tested on 2 real weeks and compared",
        "Fixes added as rules",
        "Stop point written into the rules",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Claude does your weekly job.",
    accent: "Now write down how you do the rest.",
    body: "The next guide turns a screen recording of a task into written steps. Then an assistant or freelancer can do the task for you.",
    label: "Turn a recording into instructions →",
    href: "/guides/chatgpt-screen-recording-to-process-guide/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Fixed the same thing twice? Add a rule. Keep a copy of the rules in your notes. Start the next weekly job only when this one runs well.",
    finishLine: "Explain it once. Then let the rules do the remembering.",
  },
};
