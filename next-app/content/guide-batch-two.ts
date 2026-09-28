// Batch 2 guide copy, approved from the batch 2 copy deck (28/09/2026).
// Inline marks: **bold**, *italic*, [label](https://link).
import type { BatchGuide } from "./guide-batch-one";

const prompt4: BatchGuide = {
  slug: "what-is-a-prompt",
  seoTitle: "How to write a good AI prompt: the 4-line method",
  seoDescription: "How to write a good AI prompt for ChatGPT, Claude or Gemini: the job, what it can use, what you want back and what to check. A reusable 4-line prompt with an example.",
  title: "The 4-Line Prompt That Works in Any AI",
  question: "I never know what to type into AI.",
  answer: "You don't need clever wording. Tell the AI the job, what it can use, what you want back and what to check. That's the whole method.",
  level: "Beginner",
  minutes: 5,
  tool: "ChatGPT, Claude or Gemini",
  hero: { title: "The 4-line prompt that works in", accent: "any AI.", line: "Four short lines. Paste them into ChatGPT, Claude or Gemini and get an answer you can use.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/what-is-a-prompt.webp", alt: "The blue robot mascot turning a rough note into ordered shapes with a brass instruction press" } },
  leaveWith: "a 4-line prompt you can reuse for any task, a worked example, and one line that makes the AI ask you questions before it guesses.",
  howTo: "Read the 4 lines, look at the before-and-after, then try the full prompt with the example note. Swap in your own task once you've seen a good answer.",
  sections: [
    {
      title: "The 4 lines",
      accent: "Job · material · result · check.",
      icon: "list",
      blocks: [
        { kind: "list", ordered: true, items: [
          "**The job:** what you want done. *Draft an email, compare 2 options, summarise a report.*",
          "**What it can use:** the notes, facts or document it should work from.",
          "**What you want back:** the format and length. *3 bullets, a table, under 100 words.*",
          "**What to check:** what must stay accurate and what it must not invent.",
        ] },
      ],
    },
    {
      title: "See the difference",
      accent: "The missing piece is information.",
      icon: "check",
      blocks: [
        { kind: "contrast", items: [
          { label: "Too vague", text: "\"Make an agenda.\"", note: "No material, no format, nothing to check." },
          { label: "Useful", text: "\"Turn this project note into an agenda for a 15-minute team meeting. Give 3 items and flag the pricing decision. Don't invent owners or approvals.\"", good: true },
        ] },
        { kind: "locked", label: "The full 4-line prompt", prompt: 0 },
      ],
    },
    {
      title: "Let the AI ask first",
      accent: "Questions before guesses.",
      icon: "question",
      blocks: [
        { kind: "p", text: "You won't always know what the AI needs. Add one line asking it to check for missing details and ask you up to 3 questions before it answers. The gaps become visible instead of being filled with guesses." },
        { kind: "locked", label: "The \"ask me first\" line", prompt: 1 },
      ],
    },
  ],
  honest: "A good prompt makes a good answer more likely, not certain. Always compare the answer with what you gave it: names, dates and anything that sounds decided.",
  gate: { promise: "The 4-line prompt and the ask-me-first line.", action: "Unlock" },
  prompts: [
    { title: "The 4-line prompt (with the example filled in)", text: `THE JOB
Turn this rough project note into an agenda for a 15-minute team meeting.

WHAT YOU CAN USE
We are preparing a website launch. The landing page is approved. The designer expects final graphics by Friday. Pricing still needs approval. The team meets on Tuesday. We have not decided if the launch should wait for pricing approval.

WHAT I NEED BACK
Three agenda items. For each, the update or decision needed and one useful question. End with one line headed "Decision to make". Under 130 words.

WHAT TO CHECK
Use only the note above. Don't invent people, owners, dates or approvals. If an owner is needed but not named, write "Not specified". Show the pricing approval as an open decision.` },
    { title: "The \"ask me first\" line (add it to any prompt)", text: `Before you answer, check whether you have enough information. If something important is missing, ask me up to 3 specific questions and stop. Otherwise, answer and mark anything you can't confirm as "Not specified".` },
  ],
  checks: { title: "Check before you use it", ordered: true, items: [
    "It followed the format you asked for.",
    "Every fact is in your note.",
    "Nothing undecided has become decided.",
  ] },
  kit: { name: "AI workflows that save time", heading: "Want this for your whole week?", body: "The *AI workflows that save time* kit has 10 ready prompts built on this method, each with an example and a check." },
};

const weeklyJob: BatchGuide = {
  slug: "teach-claude-a-repeatable-workflow",
  seoTitle: "How to teach Claude a repeatable workflow",
  seoDescription: "Teach Claude a job you repeat every week: describe the input, steps, output and stop rule, test it on two weeks of notes, then save it in a Claude Project.",
  title: "Teach Claude a Job Once, Reuse It Every Week",
  question: "I write the same weekly update every Friday and start from scratch every time.",
  answer: "Write the job down once (what goes in, the steps, what comes out, where Claude must stop), test it on two real weeks, then save it.",
  level: "Intermediate",
  minutes: 20,
  tool: "Claude",
  hero: { title: "Teach Claude a job once, reuse it", accent: "every week.", line: "Turn one weekly task into a saved instruction you test once and reuse.", tool: "Claude", art: { kind: "scene", src: "/images/guides/teach-claude-a-repeatable-workflow.webp", alt: "The blue robot mascot feeding scattered notes into a machine that stacks them into neat pages" } },
  leaveWith: "a tested weekly-update instruction, the 4-part template to build your own, and a 2-week test that proves it works.",
  howTo: "Run the example with last week's notes (remove anything confidential). Fix what goes wrong, test with a second week, and only then save it.",
  sections: [
    {
      title: "Describe the job in 4 parts",
      accent: "Input · steps · output · stop.",
      icon: "list",
      blocks: [
        { kind: "fields", items: [
          { label: "Input", text: "what you give it each time (notes, a file, fields)." },
          { label: "Steps", text: "what Claude does, in order." },
          { label: "Output", text: "the exact headings or table you need." },
          { label: "Stop rule", text: "what Claude must leave to you instead of guessing or acting." },
        ] },
      ],
    },
    {
      title: "Test before you save",
      accent: "Two weeks, not one.",
      icon: "check",
      blocks: [
        { kind: "list", ordered: true, items: [
          "Run the full instruction in a new chat.",
          "Every time you fix something, turn the fix into a clearer rule.",
          "Run it again with a different week's notes.",
          "Save the version that works in a Claude Project: open the Project and select **Set project instructions**.",
        ] },
        { kind: "locked", label: "The weekly update instruction", prompt: 0 },
      ],
    },
  ],
  honest: "A saved instruction doesn't mean Claude remembers last week. Each run only knows what you paste in. That's a good thing: it can't carry old facts into this week's update.",
  gate: { promise: "The weekly update instruction.", action: "Unlock" },
  prompts: [
    { title: "The weekly update instruction", text: `You're my weekly update assistant. Every Friday I'll paste my rough notes.

Turn them into an update with these 5 headings:
Done this week · In progress · Blocked (and who can unblock it) · Decisions I need · Next week

Rules:
- Use only this week's notes. If an owner or date is missing, write "Not provided".
- Keep suggestions separate from decisions.
- Bullets under 20 words. The whole update under [150] words.
- Draft only. Don't send, post or create tasks.

End with "Check before sending:" and the facts I should confirm.

This week's notes: [paste]` },
  ],
  pass: "**Pass if:** two different weeks give the same useful structure, missing facts stay visible, and nothing is sent or created.",
  kit: { name: "AI workflows that save time", heading: "Want 10 of these ready to adapt?", body: "The *AI workflows that save time* kit has 10 workflows, plus a picker that shows which of your weekly tasks to hand off first." },
};

const claudeProjectsBatch: BatchGuide = {
  slug: "claude-projects",
  seoTitle: "How to use Claude Projects to stop repeating instructions",
  seoDescription: "How to use Claude Projects: save your instructions once, then turn every meeting's notes into decisions, actions and open questions without retyping them.",
  title: "Stop Retyping Your Instructions to Claude",
  question: "I paste the same instructions into Claude every single time.",
  answer: "A Claude Project keeps your instructions and reference files together. Save them once; you only add what changes each time.",
  level: "Beginner",
  minutes: 10,
  tool: "Claude",
  hero: { title: "Stop retyping your instructions", accent: "to Claude.", line: "Save your instructions once in a Claude Project. Every chat inside it can use them.", tool: "Claude", art: { kind: "scene", src: "/images/guides/claude-projects.webp", alt: "The blue robot mascot filing a checked instruction card in a brass filing cabinet" } },
  leaveWith: "a meeting-notes Project you can reuse, the instructions to paste into it, and a test note that shows it's working.",
  howTo: "Set up the example Project, run the test note, and check the reply uses your headings without you typing them. Then make a Project for your own repeated work.",
  sections: [
    {
      title: "When a Project helps",
      accent: "Same job, again and again.",
      icon: "question",
      blocks: [
        { kind: "list", items: [
          "**One-off question:** a normal chat is fine.",
          "**The same kind of task every week** (meeting notes, client updates, reports): a Project saves the instructions so you stop retyping them.",
        ] },
      ],
    },
    {
      title: "Set up the example",
      accent: "Meeting notes into actions.",
      icon: "folder",
      blocks: [
        { kind: "list", ordered: true, items: [
          "Open [Claude](https://claude.ai/), select **+ New Project** and call it *Meeting follow-ups*.",
          "Select **Set project instructions**, paste the instructions, then select **Save instructions**.",
          "Start a chat inside the Project and paste the test note.",
        ] },
        { kind: "example", label: "The test note", text: "We'll trial a 4-day content calendar next month. Priya drafts the first week by Thursday. Someone should check the budget, but nobody took it. Hiring a freelancer came up, but nothing was agreed." },
        { kind: "result", label: "A good reply", lines: [
          "**Decided:** trial a 4-day content calendar next month.",
          "**Who does what:** Priya · first week · Thursday. Check the budget · Not agreed · Not agreed.",
          "**Still open:** who checks the budget? Hire a freelancer?",
        ] },
        { kind: "locked", label: "The Project instructions", prompt: 0 },
      ],
    },
  ],
  honest: "A Project keeps instructions, not judgement. Read each reply against your notes, especially who does what and by when.",
  gate: { promise: "The Project instructions and the test note.", action: "Unlock" },
  prompts: [
    { title: "The Project instructions", text: `You turn my meeting notes into a follow-up I can check in 2 minutes.

Always use 3 headings:
1. Decided
2. Who does what (a table: Task · Person · By when)
3. Still open

Use only the notes in my message. Write "Not agreed" where a person or date is missing. A suggestion is not a decision. Never carry facts over from another meeting. Don't send anything or create tasks.` },
    { title: "The test note (send it in a chat inside the Project)", text: `Meeting notes: We'll trial a 4-day content calendar next month. Priya drafts the first week by Thursday. Someone should check the budget, but nobody took it. Hiring a freelancer came up, but nothing was agreed.` },
  ],
  pass: "**Keep it if:** the reply used your headings and table without you typing them.",
  kit: { name: "Make AI remember you", heading: "Want AI to know you, not just one task?", body: "The *Make AI remember you* kit has an \"about me\" file, 5 ready-made Projects for Claude and ChatGPT, and a write-like-me setup." },
};

const screenRecording: BatchGuide = {
  slug: "chatgpt-screen-recording-to-process-guide",
  seoTitle: "How to turn a screen recording into a process guide with ChatGPT",
  seoDescription: "Turn a screen recording into a step-by-step process guide with ChatGPT: record one task, ask for only the steps it can see, then have someone new test them.",
  title: "Turn a Screen Recording Into a Step-by-Step Guide",
  question: "Nobody writes down how we do things, and training new people takes forever.",
  answer: "Record one task, upload it to ChatGPT, and ask for only the steps it can actually see. Then have someone new follow them.",
  level: "Intermediate",
  minutes: 20,
  tool: "ChatGPT",
  hero: { title: "Turn a screen recording into a", accent: "step-by-step guide.", line: "Record the task once. ChatGPT drafts the steps. Someone new tests them.", tool: "ChatGPT", art: { kind: "scene", src: "/images/guides/chatgpt-screen-recording-to-process-guide.webp", alt: "The blue robot mascot feeding a film reel into a press that prints numbered instruction cards" } },
  leaveWith: "a prompt that turns a recording into a checked process guide, a recording checklist, and a fallback when video upload isn't available.",
  howTo: "Practise with a short task in a demo account first. No names, customer data or passwords on screen.",
  sections: [
    {
      title: "Record something ChatGPT can use",
      accent: "One task, start to finish.",
      icon: "upload",
      blocks: [
        { kind: "list", ordered: true, items: [
          "Start on the screen where the task begins. Say why you make each choice. Show the finished result.",
          "Use demo data, or remove names, emails and notifications before uploading.",
          "In [ChatGPT](https://chatgpt.com/), select **+ → Add photos & files** and choose the video. If it isn't accepted, try **Files**.",
          "No video upload on your account? Use a corrected transcript and a few clean screenshots instead.",
        ] },
      ],
    },
    {
      title: "What a usable guide contains",
      accent: "Four parts.",
      icon: "list",
      blocks: [
        { kind: "fields", items: [
          { label: "Before you begin", text: "what must already be open or approved." },
          { label: "Numbered steps", text: "one action each, with the real button names." },
          { label: "You should see", text: "the result after each step." },
          { label: "Needs clarification", text: "a flag where ChatGPT couldn't see or hear something, instead of a guess." },
        ] },
        { kind: "locked", label: "The recording-to-guide prompt", prompt: 0 },
      ],
    },
  ],
  honest: "ChatGPT can miss a click or mishear the audio. Treat the recording as evidence and the draft as a first version. The real test is someone new following it.",
  gate: { promise: "The recording-to-guide prompt.", action: "Unlock" },
  prompts: [
    { title: "The recording-to-guide prompt", text: `I've attached a screen recording of me doing a task. Turn it into a step-by-step guide for [who will use it], so they can [finished result] on their own.

First, tell me if you can actually watch the video. If you can't, stop and ask me for a transcript and a few screenshots instead.

Then write:
- Before you start: what must be open or ready.
- Numbered steps, one action each, using the exact button names you can see.
- After each step, "You should see:" and the result.
- "Needs checking" wherever you can't see or hear what happened. Don't guess.

Finish with a 3-point check that proves the task is done.` },
  ],
  pass: "**Keep it if:** someone who hasn't watched the recording can finish the task using only the guide.",
  kit: { name: "AI workflows that save time", heading: "One of 10 workflows", body: "This is workflow 6 in the *AI workflows that save time* kit, alongside 9 others with prompts, examples and checks." },
};

const agentLimits: BatchGuide = {
  slug: "what-is-agentic",
  seoTitle: "What is an AI agent, and is it safe to use at work?",
  seoDescription: "What an AI agent is, how it differs from a chat or an automation, and the 4 limits to set before one works alone: one job, the smallest access, an approval point and a way to stop.",
  title: "4 Limits to Set Before an AI Agent Works Alone",
  question: "Is it actually safe to let AI do tasks on its own?",
  answer: "An agent only has the power you connect. Give it one job, the smallest access, a clear approval point and a way to stop.",
  level: "Beginner",
  minutes: 10,
  tool: "Any AI agent",
  hero: { title: "4 limits to set before an AI agent", accent: "works alone.", line: "An agent can do tasks for you. Decide what it can touch, change and never do on its own.", tool: "AI agents", art: { kind: "scene", src: "/images/guides/what-is-agentic.webp", alt: "The blue robot mascot watching a chain of connected brass machines pass a ball from one to the next" } },
  leaveWith: "the difference between a chat, an automation and an agent, the 4 limits, and a prompt that checks an agent setup before you switch it on.",
  howTo: "Read the three types, then apply the 4 limits to one real task you'd like to hand off.",
  sections: [
    {
      title: "Chat, automation or agent?",
      accent: "Three different jobs.",
      icon: "question",
      blocks: [
        { kind: "contrast", items: [
          { label: "Chat", text: "You ask, it answers, it waits. You stay in charge of every step." },
          { label: "Automation", text: "The steps are fixed in advance and happen the same way each time." },
          { label: "Agent", text: "You give it a job and tools. It decides the next permitted step as it goes.", good: true },
        ] },
      ],
    },
    {
      title: "The 4 limits",
      accent: "Before you switch it on.",
      icon: "shield",
      blocks: [
        { kind: "list", ordered: true, items: [
          "**One exact job.** Not \"help with customer service\" but \"sort new requests by topic and draft a reply\".",
          "**The smallest access.** Only the files, inbox or apps the job needs.",
          "**An approval point.** Anything touching money, customers, access or privacy waits for a person. Restrict the permission; a polite \"please ask first\" is not enough.",
          "**A way to stop.** It pauses when information is missing, and you can see and undo what it changed.",
        ] },
      ],
    },
    {
      title: "Start one step before automatic",
      accent: "Prepare · propose · act.",
      icon: "check",
      blocks: [
        { kind: "p", text: "Let it **prepare** first (research, sort, draft). Then let it **propose** and wait for your OK. Only let it **act** alone once you've tested it and know how to reverse it." },
        { kind: "locked", label: "The agent setup check", prompt: 0 },
      ],
    },
  ],
  honest: "More access doesn't make an agent smarter. It just gives its mistakes more places to go.",
  gate: { promise: "The agent setup check.", action: "Unlock" },
  prompts: [
    { title: "The agent setup check", text: `I want to hand this task to an AI agent: [describe the task without private details].

It would have access to: [list the tools, files or apps].
It would be allowed to: [read / draft / update / send / delete / spend].

Check my setup against 4 limits and tell me for each: OK, too broad, or missing.
1. Is the job exact enough to test?
2. Is the access the smallest it needs?
3. Which actions should wait for my approval, and is that enforced by a permission, not just an instruction?
4. When should it stop, and how would I see and undo what it changed?
Then suggest the safest first version: prepare only, or propose and wait for approval.` },
  ],
  checks: { title: "Before you switch it on, can you say yes to all 3?", items: [
    "I can name its one job.",
    "I know exactly what it can change.",
    "I know how to stop it and undo what it did.",
  ] },
  kit: { name: "Use AI safely at work", heading: "Rolling agents out to a team?", body: "The *Use AI safely at work* kit includes connection checklists, team guidelines and an approved-tools register." },
};

export const batchTwoGuides: readonly BatchGuide[] = [prompt4, weeklyJob, claudeProjectsBatch, screenRecording, agentLimits];
