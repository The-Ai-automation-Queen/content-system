import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-is-a-prompt",
  lumailTag: "guide-what-is-a-prompt",
  title: "What Do I Type Into ChatGPT?",
  cover: "/images/guides/what-is-a-prompt.webp",
  coverAlt: "The blue robot mascot turning a rough note into ordered shapes with a brass instruction press",
  seoDescription: "What do I type into ChatGPT? Use 4 fill-in lines (job, material, what you want back, what to check) and save a prompt library for your 3 most common jobs.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "What Do I Type", accent: "Into ChatGPT?" },
  hero: {
    kind: "scene",
    src: "/images/guides/what-is-a-prompt.webp",
    alt: "The blue robot mascot turning a rough note into ordered shapes with a brass instruction press",
    line: "A fill-in-the-blanks prompt that works for any task. Four lines, filled in once for each job you do most.",
  },
  intro: {
    heading: "Four lines, filled in for your work",
    lead: "You don't need clever wording. You need to tell ChatGPT the job, what it can use, what you want back and what to check. This guide gives you those 4 lines, then fills them in for the 3 jobs you do most and saves them as your prompt library.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "The **4-line prompt**: job, material, what you want back, what to check",
        "The **\"ask me first\" line** that makes ChatGPT ask questions instead of guessing",
        "**Filled prompts** for your 3 most common jobs, written for your business",
        "One prompt tested on real work and fixed",
        "**Your prompt library**: all of it saved and named, ready to reuse",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works, and the prompts also work in Claude. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Prompt Library.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Learn the 4 lines", accent: "Job, material, result, check.", blocks: [
      { kind: "p", text: "Every useful prompt answers the same 4 questions. This table shows what goes in each line, with a client proposal as the example." },
      { kind: "list", ordered: true, items: [
        "Read each line and its example.",
        "Pick one job you do this week, for example a proposal, a follow-up email or a reply to an enquiry.",
        "On paper or in a note, write one sentence for each line for that job.",
      ] },
      { kind: "table", head: ["Line", "What to write", "Example: a client proposal"], rows: [
        ["1. The job", "What you want done, in one sentence", "Write a first draft of a proposal for [client]"],
        ["2. What it can use", "The notes, facts or document it should work from", "My call notes: [paste], and what I offer: [paste]"],
        ["3. What you want back", "Format, length and tone", "Sections: the problem, what I'll do, timeline, next step. Under 400 words. Warm and direct"],
        ["4. What to check", "What must stay accurate and what it must not invent", "Use only my notes. Write [CHECK] for any price or date I didn't give you"],
      ] },
      { kind: "p", text: "A vague prompt like \"Write a proposal\" skips lines 2, 3 and 4. ChatGPT fills the gaps with guesses, which is why the answer feels average." },
      { kind: "tip", text: "Swap real details for brackets before you paste: [client], [price], [date]. You put the real ones back in the final version." },
    ] },
    { num: "02", title: "Use the blank prompt", accent: "Plus one line that asks first.", blocks: [
      { kind: "p", text: "This is the 4-line prompt with the blanks left open, so you can use it for any task. The second prompt is one line you add when you're not sure what ChatGPT needs." },
      { kind: "list", ordered: true, items: [
        "Open a new chat.",
        "Copy the blank prompt below and fill in the [square brackets] with the job you picked in step 01.",
        "Add the \"ask me first\" line at the end.",
        "Send it, and answer any questions it asks.",
      ] },
      { kind: "prompt", label: "The 4-line prompt (blank)", text: `THE JOB
[What you want done, in one sentence.]

WHAT YOU CAN USE
[Paste your notes, facts or document here. Swap real names for brackets.]

WHAT I NEED BACK
[Format, length and tone. For example: 3 sections, under 300 words, warm and direct.]

WHAT TO CHECK
Use only what I gave you above. Write [CHECK] where information is missing instead of guessing. Never invent names, prices, dates or promises. [Anything else that must stay accurate.]` },
      { kind: "prompt", label: "The \"ask me first\" line (add it to any prompt)", text: `Before you answer, check whether you have enough information. If something important is missing, ask me up to 3 specific questions and stop. Otherwise, answer and mark anything you can't confirm with [CHECK].` },
      { kind: "p", text: "If ChatGPT asks questions, the gaps were real. Note them: next time, put those answers in line 2." },
    ] },
    { num: "03", title: "Fill it for 3 jobs", accent: "Your most common work.", blocks: [
      { kind: "p", text: "Filling in the blank prompt every time is slow. This prompt interviews you about your 3 most common jobs and writes a filled version for each, with blanks only for the material that changes." },
      { kind: "list", ordered: true, items: [
        "Open a new chat.",
        "Paste the prompt below and send it.",
        "Answer each question in a sentence or two.",
      ] },
      { kind: "prompt", label: "Write my 3 filled prompts", text: `I run a small business: [what you sell and who to].
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
In WHAT TO CHECK, always include: use only what I paste; write [CHECK] where information is missing instead of guessing; never invent names, prices, dates or promises.
End each prompt with the "ask me first" line.

Give each prompt a short name, for example "Proposal: first draft".
Use only what I tell you. Plain English, no em dashes.` },
      { kind: "p", text: "Read each prompt. Cross out anything you never have to hand, and add anything you always include." },
    ] },
    { num: "04", title: "Test one on real work", accent: "Then fix it.", blocks: [
      { kind: "p", text: "A prompt is only ready once it has worked on a real job. Test the one you'll use soonest." },
      { kind: "list", ordered: true, items: [
        "Open a new chat.",
        "Paste one of your 3 prompts and fill the brackets with this week's real material. Swap names for [client].",
        "Send it.",
      ] },
      { kind: "p", text: "Before you use what comes back, check:" },
      { kind: "list", ordered: true, items: [
        "**It followed the format.** The sections, length and tone you asked for.",
        "**Every fact is yours.** Names, numbers and dates all appear in what you pasted.",
        "**Nothing undecided became decided.** No prices, dates or promises you haven't agreed.",
        "**[CHECK] marks.** Fill in every one yourself.",
      ] },
      { kind: "p", text: "If something is off, fix the prompt, not just this answer:" },
      { kind: "prompt", label: "Fix the prompt", text: `This answer had a problem: [what was wrong].
Rewrite my prompt so this doesn't happen again. Keep the 4 headings. Show me only the new prompt.` },
    ] },
    { num: "05", title: "Save your prompt library", accent: "Named and easy to find.", blocks: [
      { kind: "p", text: "Your prompt library is the 4-line prompt, the \"ask me first\" line and your 3 filled prompts, saved in one place with clear names." },
      { kind: "list", ordered: true, items: [
        "**If you see Projects in the left sidebar:** click **New project**, name it **Prompt library**, and add your prompts to the project's files or instructions. Start each job chat inside it.",
        "**If you don't:** make one note in your notes app called **Prompt library** and paste every prompt into it.",
        "Give each prompt a name you'd search for: what it does, then the detail. For example **Proposal: first draft**, **Enquiry: first reply**, **Call: follow-up email**.",
        "Put the blank 4-line prompt and the \"ask me first\" line at the top, for jobs that aren't in the library yet.",
      ] },
      { kind: "tip", text: "**Can't find Projects?** Menus change. Search \"projects\" on [OpenAI's help pages](https://help.openai.com/). A note works just as well." },
      { kind: "honest", text: "**The honest part:** a good prompt makes a good answer more likely, not certain. You still compare the answer with what you gave it: names, dates and anything that sounds decided." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Wrote the 4 lines for one job",
        "Used the blank prompt with the \"ask me first\" line",
        "Filled prompts written for your 3 most common jobs",
        "One prompt tested on real work and fixed",
        "Prompt library saved, with every prompt named",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know what to type.",
    accent: "Now make the answers better.",
    body: "The next guide shows the 3 things to do differently when the answers still feel average: brief it, check it, and keep what's yours.",
    label: "Get better answers →",
    href: "/guides/ai-skills-worth-learning-for-work/",
  },
  conclusion: {
    heading: "Keep it growing",
    paragraph: "Add a filled prompt to your library each time a new job repeats, fix the prompt whenever an answer goes wrong, and keep the blank 4 lines at the top.",
    finishLine: "Four lines, filled in once, used every week.",
  },
};
