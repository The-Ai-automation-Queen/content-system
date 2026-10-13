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
    heading: "Stop explaining the same job every Friday",
    lead: "Here is the problem. Every Friday you write the same client update. You open Claude and explain the job again: the headings, the tone, the length. Then you fix the same mistakes as last week. Claude can keep your rules for you. You write the job down once, test it, and save it. Each week after that, you paste your notes and get a draft that follows your rules.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**One weekly job written down in 4 parts**: what goes in, the steps, what comes out, where Claude stops",
        "**Clear rules for Claude**, written by Claude after it asks you a few questions",
        "**The rules saved in one place**, so you never type them again",
        "**Proof the rules work**, from a test on 2 real weeks of your notes",
        "**A draft each week that you check and send yourself**, with a list of what to check",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer. These steps are for a web browser, like Chrome.",
        "A Claude account at [claude.ai](https://claude.ai/). The free plan works for the test. If you see **Projects** in the left sidebar, you can save the rules there. If not, step 03 shows another way.",
        "One job you do every week that starts from notes or messages. A weekly client update is a good first one.",
        "Your notes from the last 2 weeks for that job. You need them for the test in step 04.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
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
    { num: "01", title: "Write the job down in 4 parts", accent: "10 minutes, no AI yet.", blocks: [
      { kind: "p", text: "Every job you repeat has 4 parts. When you write them down, you know exactly what to ask Claude. You also see where a mistake could slip in." },
      { kind: "h3", text: "A. Pick the job" },
      { kind: "list", ordered: true, items: [
        "Think of one job you do every week that starts from notes or messages.",
        "Check it ends in something you write, like an email or a short report.",
        "Write its name at the top of a new note, for example **Weekly client update**.",
      ] },
      { kind: "h3", text: "B. Fill in the 4 parts" },
      { kind: "list", ordered: true, items: [
        "Copy the table below into your note.",
        "Look at the example column. It shows a weekly client update.",
        "Write your own answer for each part, under the table. Short phrases are fine.",
      ] },
      { kind: "table", head: ["Part", "What it means", "Example: weekly client update"], rows: [
        ["Input", "What you give Claude each time", "My rough notes, the client's last email, the project dates"],
        ["Steps", "What Claude does, in order", "Sort notes into done, in progress, waiting. Find anything late. Write the update"],
        ["Output", "Exactly what comes back", "An email with 4 headings: Done, In progress, Waiting on you, Next week. Under 200 words"],
        ["Stop point", "What Claude must leave to you", "Draft only. I check dates and promises. I send it"],
      ] },
      { kind: "example", label: "What your note might look like", text: "Weekly client update. Input: my Friday notes and the client's last email. Steps: sort into done, in progress, waiting; spot anything late; write the email. Output: email, 4 headings, under 200 words, friendly. Stop point: draft only, I send it." },
      { kind: "tip", text: "**Can't fill in the Steps part?** Next time you do the job, write down each thing you do, in order. That list is your Steps part." },
      { kind: "h3", text: "C. Take out client details" },
      { kind: "list", ordered: true, items: [
        "Open your notes from the last 2 weeks.",
        "Swap every client name for [client]. Swap every amount for [amount].",
        "Save these cleaned notes in your note, under the 4 parts. You use them in step 04.",
      ] },
      { kind: "p", text: "You put the real names back at the end, in the final email, yourself." },
    ] },
    { num: "02", title: "Let Claude write the rules", accent: "It asks, you answer.", blocks: [
      { kind: "p", text: "You know the job. Claude is good at turning what you know into clear rules. So let it ask you the questions." },
      { kind: "list", ordered: true, items: [
        "Open [claude.ai](https://claude.ai/) in your browser and sign in.",
        "Click **New chat** at the top left. On some screens it is a pencil or a **+** button.",
        "Copy the prompt below and paste it in the chat box.",
        "Replace the 4 parts in [square brackets] with your answers from step 01. Press Enter.",
      ] },
      { kind: "prompt", label: "Ask me about my weekly job", text: `I want to write instructions for a job I do every week, so you can do it the same way each time without me explaining it again.

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
      { kind: "result", label: "What a good answer looks like", lines: [
        "First: one question, for example \"What tone do you use with clients: formal or friendly?\"",
        "You answer. Then the next question comes. Up to 6 in total.",
        "At the end: your instructions, with the 5 numbered sections.",
      ] },
      { kind: "list", ordered: true, items: [
        "Answer each question in a sentence or two.",
        "Read the finished instructions. Is a step wrong or missing? Tell Claude what to change in the same chat.",
        "Check the Rules section has all 4 rules from the prompt. If one is missing, type: \"Add the rule: [rule].\"",
        "Copy the final instructions into your note, under the 4 parts.",
      ] },
    ] },
    { num: "03", title: "Save the rules in one place", accent: "So they are there every week.", blocks: [
      { kind: "p", text: "A Project (a folder in Claude that keeps your files and rules together) makes every chat inside it follow the same rules. You don't paste the rules again. You open the Project and paste your notes." },
      { kind: "h3", text: "A. Make the Project" },
      { kind: "list", ordered: true, items: [
        "Look at the left sidebar in Claude. If it is hidden, click the menu button at the top left to open it.",
        "Click **Projects**. You will see a page with your Projects. It may be empty.",
        "Click **New project** (on some screens **Create project**), usually at the top right of that page.",
        "Type a name, for example **Weekly client update**. Click **Create project**. You will see the Project's own page.",
      ] },
      { kind: "h3", text: "B. Paste the rules" },
      { kind: "list", ordered: true, items: [
        "On the Project page, look on the right side for **Instructions**. On some accounts it says **Set project instructions**.",
        "Click it. A box opens.",
        "Paste your instructions from step 02. Click **Save**.",
        "Can't find **Projects** or **Instructions**? Anthropic moves these menus. Search \"projects\" on [Claude's help pages](https://support.claude.com/) for today's steps.",
      ] },
      { kind: "h3", text: "C. No Projects on your plan?" },
      { kind: "list", ordered: true, items: [
        "Keep the instructions in your note, under the job name.",
        "Each week, click **New chat**. Paste the instructions first. Then paste your notes in the same message.",
      ] },
      { kind: "tip", text: "**Keep a copy of the rules in your note**, even with a Project. It is your backup, and you can see what you changed over time." },
    ] },
    { num: "04", title: "Test it on 2 real weeks", accent: "One week proves nothing.", blocks: [
      { kind: "p", text: "Rules that work once can still fail next week. So run them on two different weeks of notes. Then compare the two drafts." },
      { kind: "h3", text: "A. Run week 1" },
      { kind: "list", ordered: true, items: [
        "Open your Project. Click in the chat box on the Project page to start a new chat inside it.",
        "Paste last week's cleaned notes from step 01. Press Enter. (No Project? Paste the instructions first, then the notes.)",
        "Copy the draft into your note, under the heading **Week 1**.",
      ] },
      { kind: "example", label: "What you type", text: "Notes for [client]: homepage copy done and sent Tuesday. About page half written. Still waiting on their photos. Call booked for next Thursday." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Done: Homepage copy, sent on Tuesday.",
        "In progress: About page, about half written.",
        "Waiting on you: Your photos, so I can finish the About page.",
        "Next week: Our call on Thursday. [CHECK] Add the time.",
        "Check before sending: the call day, and that the homepage was sent on Tuesday.",
      ] },
      { kind: "h3", text: "B. Run week 2" },
      { kind: "list", ordered: true, items: [
        "Start another new chat in the same Project.",
        "Paste the notes from the week before. Press Enter.",
        "Copy the draft into your note, under **Week 2**.",
      ] },
      { kind: "h3", text: "C. Check it yourself" },
      { kind: "p", text: "Claude can add a date or a promise that was never in your notes. It sounds right, so it is easy to miss. Check each draft like this." },
      { kind: "list", ordered: true, items: [
        "Put the draft and your notes side by side.",
        "Find every name, date, number and promise in the draft. Underline them, or copy them into a list.",
        "For each one, press **Ctrl + F** on Windows, or **Cmd + F** on a Mac, in your notes. Type the word or number. Does it light up?",
        "Anything that doesn't light up was added by Claude. Write it down.",
        "Then fill in the table below for both weeks.",
      ] },
      { kind: "table", head: ["Check", "Week 1", "Week 2"], rows: [
        ["Same headings, in the same order?", "[yes or no]", "[yes or no]"],
        ["Every name, date and number is in my notes?", "[yes or no]", "[yes or no]"],
        ["Missing facts marked [CHECK]?", "[yes or no]", "[yes or no]"],
        ["Right length and tone?", "[yes or no]", "[yes or no]"],
        ["Would I send it after a quick check?", "[yes or no]", "[yes or no]"],
      ] },
      { kind: "p", text: "Every \"no\" is a fix for step 05. Write each one in a short line." },
    ] },
    { num: "05", title: "Turn each mistake into a rule", accent: "Fix once, not every week.", blocks: [
      { kind: "p", text: "Every \"no\" from step 04 becomes a new rule. Then the same mistake doesn't come back next week." },
      { kind: "list", ordered: true, items: [
        "Click **New chat**. Use a normal chat for this, not the Project.",
        "Copy the prompt below and paste it in the chat box.",
        "Paste your instructions where it says [paste the instructions]. Paste your list of mistakes where it says [list each problem]. Press Enter.",
      ] },
      { kind: "prompt", label: "Turn my mistakes into rules", text: `Here are my weekly job instructions:
[paste the instructions]

I tested them on 2 weeks of notes. Here is what went wrong:
[list each problem, for example: the update was 350 words; it promised a delivery date that wasn't in my notes]

For each problem, add one short rule to the Rules section that stops it happening again.
Change nothing else. Show me the full updated instructions, then list the rules you added.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "The full instructions, with your new rules at the end of the Rules section.",
        "Rules added: \"Keep the whole update under 200 words.\" \"Never write a delivery date unless it is in my notes.\"",
      ] },
      { kind: "contrast", items: [
        { label: "Too loose", text: "Keep it short.", good: false },
        { label: "Exact", text: "Keep the whole update under 200 words.", good: true },
      ] },
      { kind: "list", ordered: true, items: [
        "Open your Project. Click **Instructions** again. Delete the old text and paste the new version. Click **Save**.",
        "Paste the new version into your note too.",
        "Run week 1 again in a new chat in the Project. Is the problem gone? Then that fix worked.",
        "Does a problem come back? Make the rule more exact, like the example above.",
      ] },
    ] },
    { num: "06", title: "Use it every week", accent: "Paste, check, send.", blocks: [
      { kind: "p", text: "The stop point keeps your weekly job safe. Claude writes the draft. You decide what goes to the client." },
      { kind: "table", head: ["Claude can", "You must"], rows: [
        ["Sort your notes and write the draft", "Check every date, price and promise"],
        ["Mark missing details with [CHECK]", "Fill in every [CHECK] yourself"],
        ["Suggest what to say about a delay", "Decide what you tell the client"],
        ["List what you should check", "Put the real names back and send it yourself"],
      ] },
      { kind: "p", text: "Check your instructions end with a line like this. If not, add it in the Project's **Instructions**: \"Stop after the draft. Do not send, schedule or promise anything. Hand back to me with a list of what I must check.\"" },
      { kind: "h3", text: "Your weekly routine" },
      { kind: "list", ordered: true, items: [
        "Swap client names in your notes for [client].",
        "Open the Project and start a new chat in it.",
        "Paste your notes and press Enter.",
        "Do the check from step 04 C on the draft.",
        "Fill in every [CHECK]. Put the real names back. Send it from your own email.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["The draft ignores your headings", "You are in a normal chat, not the Project", "Open the Project and start the chat from there"],
        ["A date or promise you never wrote", "Claude filled a gap", "Delete it. Add a rule in step 05"],
        ["Old facts from last week appear", "You pasted old notes, or used an old chat", "Start a new chat each week. Paste only this week's notes"],
        ["Lots of [CHECK] marks", "Your notes were thin this week", "Fill them in yourself, or add more detail next time"],
      ] },
      { kind: "honest", text: "**The honest part:** saved rules don't make Claude remember last week. Each time, it only knows the rules and what you paste in. That is good: it can't bring old facts into this week. Claude writes the draft. You check it, decide and send." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "One weekly job written down in 4 parts, with client names swapped out",
        "Instructions written by Claude after its questions, with all 4 rules in",
        "Instructions saved in a Claude Project (or in your note)",
        "2 real weeks run, and every name, date and number checked against your notes",
        "Each mistake turned into an exact rule, and week 1 run again",
        "Stop point line at the end of the instructions",
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
    heading: "Keep it simple",
    paragraph: "Fixed the same thing twice? Add a rule. Keep a copy of the rules in your note. Start the next weekly job only when this one runs well.",
    finishLine: "Explain it once. Then let the rules do the remembering.",
  },
};
