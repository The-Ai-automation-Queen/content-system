import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-is-a-prompt",
  lumailTag: "guide-what-is-a-prompt",
  title: "What Do I Type Into ChatGPT?",
  cover: "/images/guides/what-is-a-prompt.webp",
  coverAlt: "The blue robot mascot turning a rough note into ordered shapes with a brass instruction press",
  seoDescription: "What do I type into ChatGPT? Fill in 4 lines: the job, what it can use, what you want back, what to check. Then save prompts for your 3 top jobs.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "What Do I Type", accent: "Into ChatGPT?" },
  hero: {
    kind: "scene",
    src: "/images/guides/what-is-a-prompt.webp",
    alt: "The blue robot mascot turning a rough note into ordered shapes with a brass instruction press",
    line: "One fill-in prompt that works for any task. Four lines. You fill them in once for each job you do most.",
  },
  intro: {
    heading: "Four lines, filled in for your work",
    lead: "You don't need clever words. You tell ChatGPT four things: the job, what it can use, what you want back and what to check. This guide gives you those 4 lines. Then you fill them in for your 3 most common jobs and save them.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "The **4-line prompt**: job, what it can use, what you want back, what to check",
        "The **\"ask me first\" line**, so ChatGPT asks instead of guessing",
        "**Ready prompts** for your 3 most common jobs",
        "One prompt tested on real work and fixed",
        "**Your prompt library**: every prompt saved and named, ready to use again",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. The prompts also work in Claude. You can copy and paste every prompt below as it is. Replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Prompt Library.",
    promise: "Enter your name and email. The rest of the guide opens straight away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Learn the 4 lines", accent: "Job, what it can use, result, check.", blocks: [
      { kind: "p", text: "Every good prompt answers the same 4 questions. The table shows what goes in each line. The example is a client proposal (a written offer for a client)." },
      { kind: "list", ordered: true, items: [
        "Read each line and its example.",
        "Pick one job you do this week. For example: a proposal, a follow-up email or a reply to a new client question.",
        "On paper or in a note, write one sentence for each line for that job.",
      ] },
      { kind: "table", head: ["Line", "What to write", "Example: a client proposal"], rows: [
        ["1. The job", "What you want done, in one sentence", "Write a first draft of a proposal for [client]"],
        ["2. What it can use", "The notes, facts or file it should work from", "My call notes: [paste], and what I offer: [paste]"],
        ["3. What you want back", "Shape, length and tone", "Sections: the problem, what I'll do, timeline, next step. Under 400 words. Warm and direct"],
        ["4. What to check", "What must stay right, and what it must not make up", "Use only my notes. Write [CHECK] for any price or date I didn't give you"],
      ] },
      { kind: "p", text: "A short prompt like \"Write a proposal\" skips lines 2, 3 and 4. So ChatGPT guesses to fill the gaps. That is why the answer feels average." },
      { kind: "tip", text: "Before you paste, swap real details for brackets: [client], [price], [date]. You put the real ones back at the end." },
    ] },
    { num: "02", title: "Use the blank prompt", accent: "Plus one line that asks first.", blocks: [
      { kind: "p", text: "Here is the 4-line prompt with blanks. You can use it for any task. The second prompt is one extra line. Add it when you're not sure what ChatGPT needs." },
      { kind: "list", ordered: true, items: [
        "Open a new chat.",
        "Copy the blank prompt below. Fill in the [square brackets] with your job from step 01.",
        "Add the \"ask me first\" line at the end.",
        "Send it. Answer any questions it asks.",
      ] },
      { kind: "prompt", label: "The 4-line prompt (blank)", text: `THE JOB
[What you want done, in one sentence.]

WHAT YOU CAN USE
[Paste your notes, facts or document here. Swap real names for brackets.]

WHAT I NEED BACK
[Format, length and tone. For example: 3 sections, under 300 words, warm and direct.]

WHAT TO CHECK
Use only what I gave you above. Write [CHECK] where details are missing instead of guessing. Never make up names, prices, dates or promises. [Anything else that must stay right.]` },
      { kind: "prompt", label: "The \"ask me first\" line (add it to any prompt)", text: `Before you answer, check if you have enough details. If something important is missing, ask me up to 3 exact questions and stop. Otherwise, answer and mark anything you can't confirm with [CHECK].` },
      { kind: "p", text: "Did ChatGPT ask questions? Then the gaps were real. Write them down. Next time, put those answers in line 2." },
    ] },
    { num: "03", title: "Fill it for 3 jobs", accent: "Your most common work.", blocks: [
      { kind: "p", text: "Filling in the blank prompt each time is slow. This prompt asks you about your 3 most common jobs. Then it writes a ready prompt for each one. It leaves blanks only for the parts that change." },
      { kind: "list", ordered: true, items: [
        "Open a new chat.",
        "Paste the prompt below and send it.",
        "Answer each question in a sentence or two.",
      ] },
      { kind: "prompt", label: "Write my 3 ready prompts", text: `I run a small business: [what you sell and who to].
I want ready-to-use prompts for the 3 jobs I do most often.

Interview me. Ask me one question at a time and wait for each answer, up to 8 questions, about:
- the 3 jobs I do most often with clients, enquiries or content
- what I usually have to hand for each one (notes, emails, documents)
- what a good result looks like for each one: format, length, tone
- what must never go wrong in each one

Then write one prompt per job, using these 4 headings:
THE JOB
WHAT YOU CAN USE
WHAT I NEED BACK
WHAT TO CHECK

Fill in everything that stays the same each time. Put [square brackets] only where I paste new material, for example [paste the call notes].
In WHAT TO CHECK, always include: use only what I paste; write [CHECK] where details are missing instead of guessing; never make up names, prices, dates or promises.
End each prompt with the "ask me first" line.

Give each prompt a short name, for example "Proposal: first draft".
Use only what I tell you. Plain English, no em dashes.` },
      { kind: "p", text: "Read each prompt. Cross out anything you never have. Add anything you always include." },
    ] },
    { num: "04", title: "Test one on real work", accent: "Then fix it.", blocks: [
      { kind: "p", text: "A prompt is only ready once it works on a real job. Test the one you'll use soonest." },
      { kind: "list", ordered: true, items: [
        "Open a new chat.",
        "Paste one of your 3 prompts. Fill the brackets with this week's real notes. Swap names for [client].",
        "Send it.",
      ] },
      { kind: "p", text: "Before you use the answer, check:" },
      { kind: "list", ordered: true, items: [
        "**It kept the shape.** The sections, length and tone you asked for.",
        "**Every fact is yours.** All names, numbers and dates are in what you pasted.",
        "**Nothing new got decided.** No prices, dates or promises you didn't agree to.",
        "**[CHECK] marks.** Fill in every one yourself.",
      ] },
      { kind: "p", text: "Is something wrong? Fix the prompt, not just this answer:" },
      { kind: "prompt", label: "Fix the prompt", text: `This answer had a problem: [what was wrong].
Rewrite my prompt so this doesn't happen again. Keep the 4 headings. Show me only the new prompt.` },
    ] },
    { num: "05", title: "Save your prompt library", accent: "Named and easy to find.", blocks: [
      { kind: "p", text: "Your prompt library holds the 4-line prompt, the \"ask me first\" line and your 3 ready prompts. Keep them in one place, with clear names." },
      { kind: "list", ordered: true, items: [
        "**Do you see Projects in the left side menu?** (A Project is a folder in ChatGPT that remembers your files.) Click **New project** and name it **Prompt library**. Add your prompts to the project's files or instructions. Start each job chat inside it.",
        "**No Projects?** Make one note in your notes app called **Prompt library**. Paste every prompt into it.",
        "Give each prompt a name you would search for. Say what it does, then the detail. For example: **Proposal: first draft**, **Enquiry: first reply**, **Call: follow-up email**.",
        "Put the blank 4-line prompt and the \"ask me first\" line at the top. Use them for jobs that aren't in the library yet.",
      ] },
      { kind: "tip", text: "**Can't find Projects?** Menus change. Search \"projects\" on [OpenAI's help pages](https://help.openai.com/). A note works just as well." },
      { kind: "honest", text: "**The honest part:** a good prompt makes a good answer more likely. It doesn't make it certain. Always compare the answer with what you gave it. Check names, dates and anything that sounds decided." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Wrote the 4 lines for one job",
        "Used the blank prompt with the \"ask me first\" line",
        "Ready prompts written for your 3 most common jobs",
        "One prompt tested on real work and fixed",
        "Prompt library saved, with every prompt named",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know what to type.",
    accent: "Now make the answers better.",
    body: "Are the answers still average? The next guide shows 3 things to do differently. Brief it well, check the answer, and keep what's yours.",
    label: "Get better answers →",
    href: "/guides/ai-skills-worth-learning-for-work/",
  },
  conclusion: {
    heading: "Keep it growing",
    paragraph: "Does a new job come back again and again? Add a ready prompt for it. Did an answer go wrong? Fix the prompt. Keep the blank 4 lines at the top.",
    finishLine: "Four lines, filled in once, used every week.",
  },
};
