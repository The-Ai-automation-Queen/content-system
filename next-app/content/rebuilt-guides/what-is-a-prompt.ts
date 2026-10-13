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
    line: "Four lines that work for any task. You fill them in once for each job you do most.",
  },
  intro: {
    heading: "Four lines, filled in for your work",
    lead: "Here is the problem. You open ChatGPT to write a follow-up email to a client. You type \"Write a follow-up email\" and get something stiff and vague. So you rewrite it all yourself, and wonder why you bothered. ChatGPT only knows what you tell it. When you tell it 4 things, the job, what it can use, what you want back and what to check, the answer fits. This guide gives you those 4 lines, filled in for the jobs you do most.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**Four lines you can fill in for any task**, so ChatGPT gets the details it needs",
        "**One extra line that makes ChatGPT ask you questions** instead of guessing",
        "**Ready-to-paste messages for your 3 most common jobs**, with blanks only for what changes",
        "**One message tested on real work**, fixed and checked by you",
        "**All of them saved in one place** with clear names, ready for next week",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer. These steps are for a web browser, like Chrome.",
        "A ChatGPT account at [chatgpt.com](https://chatgpt.com). The free plan works. Everything here also works in Claude.",
        "One real job from this week. For example, notes from a client call that need a follow-up email.",
      ] },
      { kind: "tip", text: "A prompt is simply the message you type to the AI. Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "prompt library.",
    promise: "Enter your name and email. The rest of the guide opens straight away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Learn the 4 lines and see the difference", accent: "10 minutes.", blocks: [
      { kind: "p", text: "Every good prompt answers the same 4 questions. First you learn them. Then you try a short request and a 4-line one, so you see the difference." },
      { kind: "h3", text: "A. Learn the 4 lines" },
      { kind: "p", text: "The example is a client proposal (a written offer for a client)." },
      { kind: "table", head: ["Line", "What to write", "Example: a client proposal"], rows: [
        ["1. The job", "What you want done, in one sentence", "Write a first draft of a proposal for [client]"],
        ["2. What it can use", "The notes, facts or file it should work from", "My call notes: [paste], and what I offer: [paste]"],
        ["3. What you want back", "Shape, length and tone", "Sections: the problem, what I'll do, timeline, next step. Under 400 words. Warm and direct"],
        ["4. What to check", "What must stay right, and what it must not make up", "Use only my notes. Write [CHECK] for any price or date I didn't give you"],
      ] },
      { kind: "contrast", items: [
        { label: "Too short", text: "\"Write a proposal.\"", note: "No notes, no shape, nothing to check. ChatGPT has to guess, so the answer feels average.", good: false },
        { label: "4 lines", text: "\"Write a first draft of a proposal for [client]. Use my call notes: [paste]. Give 4 sections, under 400 words, warm and direct. Use only my notes and write [CHECK] for any price.\"", good: true },
      ] },
      { kind: "h3", text: "B. Try a short request" },
      { kind: "list", ordered: true, items: [
        "Open [chatgpt.com](https://chatgpt.com) and sign in.",
        "Click **New chat** at the top left. It may show as a small pencil icon.",
        "Click in the chat box at the bottom. Type the short line below.",
        "Press **Enter**. Read the answer. Notice the gaps it filled with guesses.",
      ] },
      { kind: "example", label: "What you type", text: "Write a follow-up email to a client." },
      { kind: "h3", text: "C. Try the 4 lines" },
      { kind: "list", ordered: true, items: [
        "Click **New chat** again.",
        "Copy the 4 lines below and paste them into the chat box. They are a filled-in example, so nothing to change.",
        "Press **Enter**. Put the two answers side by side and compare.",
      ] },
      { kind: "example", label: "What you type", text: "THE JOB: Write a follow-up email to [client] after our first call. WHAT YOU CAN USE: We talked about a new website. They want it live before their spring launch. I said I would send a proposal by Friday. WHAT I NEED BACK: Under 120 words. Thank them, list what we agreed, give one next step. Warm and direct. WHAT TO CHECK: Use only these notes. Write [CHECK] for any price or date I didn't give you." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Hi [client], thank you for the call today.",
        "We agreed you want the new website live before your spring launch [CHECK: exact date].",
        "Next step: I will send you a proposal by Friday.",
        "Best, [your name]",
      ] },
      { kind: "p", text: "See the [CHECK] mark? The notes gave no launch date, so ChatGPT did not make one up. That is the 4th line doing its job." },
      { kind: "tip", text: "Before you paste real work, swap real details for brackets: [client], [price], [date]. You put the real ones back at the end." },
    ] },
    { num: "02", title: "Use the blank 4 lines", accent: "Plus one line that makes it ask first.", blocks: [
      { kind: "p", text: "Here are the 4 lines with blanks. They work for any task. The second prompt is one extra line. Add it at the end when you are not sure what ChatGPT needs." },
      { kind: "h3", text: "A. Fill in the blanks" },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left.",
        "Copy the blank prompt below and paste it into the chat box. Don't press Enter yet.",
        "Click inside each [square bracket]. Delete it and type your own words for your job from this week.",
      ] },
      { kind: "prompt", label: "The 4-line prompt (blank)", text: `THE JOB
[What you want done, in one sentence.]

WHAT YOU CAN USE
[Paste your notes, facts or document here. Swap real names for brackets.]

WHAT I NEED BACK
[Format, length and tone. For example: 3 sections, under 300 words, warm and direct.]

WHAT TO CHECK
Use only what I gave you above. Write [CHECK] where details are missing instead of guessing. Never make up names, prices, dates or promises. [Anything else that must stay right.]` },
      { kind: "h3", text: "B. Add the \"ask me first\" line" },
      { kind: "list", ordered: true, items: [
        "Click at the very end of your filled-in prompt. Press **Shift + Enter** twice to make a new line without sending.",
        "Copy the line below and paste it there.",
        "Now press **Enter** to send. If ChatGPT asks questions, answer each one and press **Enter**.",
      ] },
      { kind: "prompt", label: "The \"ask me first\" line (add it to any prompt)", text: `Before you answer, check if you have enough details. If something important is missing, ask me up to 3 exact questions and stop. Otherwise, answer and mark anything you can't confirm with [CHECK].` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Before I write this, I need 2 details:",
        "1. What is the price you quoted, or should I leave it as [CHECK]?",
        "2. When do you want them to reply by?",
      ] },
      { kind: "p", text: "Did ChatGPT ask questions? Then the gaps were real. Write the questions in a note. Next time, put those answers in line 2 from the start." },
    ] },
    { num: "03", title: "Get ready prompts for your 3 top jobs", accent: "Your most common work.", blocks: [
      { kind: "p", text: "Filling in the blanks every time is slow. So ChatGPT asks about your 3 most common jobs. Then it writes a ready prompt for each one, with blanks only for what changes." },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left.",
        "Copy the prompt below and paste it into the chat box.",
        "Change the part in [square brackets] to one line about your business.",
        "Press **Enter**. ChatGPT asks its first question. Answer in a sentence or two and press **Enter**. Keep going until it writes the prompts.",
      ] },
      { kind: "prompt", label: "Write my 3 ready prompts", text: `I run a small business: [what you sell and who to].
I want ready-to-use prompts for the 3 jobs I do most often.

Ask me one question at a time and wait for each answer, up to 8 questions, about:
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
Use only what I tell you. Plain English.` },
      { kind: "example", label: "Example answer to one question", text: "I get about 5 new enquiries a week by email. I usually have their message and my price list. A good reply is short, friendly and offers a call." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Enquiry: first reply",
        "THE JOB: Reply to a new enquiry from [client].",
        "WHAT YOU CAN USE: Their message: [paste their email].",
        "WHAT I NEED BACK: Under 120 words, friendly, ends by offering a 20-minute call.",
        "WHAT TO CHECK: Use only what I paste. Write [CHECK] where details are missing. Never make up prices.",
      ] },
      { kind: "list", ordered: true, items: [
        "Read each prompt. Delete any line that asks for something you never have.",
        "Add anything you always include, like your booking link.",
        "Click the **copy** button under the answer (two small squares). Paste all 3 into a note for now.",
      ] },
    ] },
    { num: "04", title: "Test one on real work", accent: "Then check it and fix it.", blocks: [
      { kind: "p", text: "A prompt is only ready once it works on a real job. Test the one you will use soonest." },
      { kind: "h3", text: "A. Run it" },
      { kind: "list", ordered: true, items: [
        "Copy this week's real notes into a note first. Swap client names for [client] and prices for [price].",
        "Click **New chat** at the top left.",
        "Paste one of your 3 ready prompts into the chat box.",
        "Find the part in [square brackets]. Delete it and paste your cleaned-up notes in its place.",
        "Press **Enter**.",
      ] },
      { kind: "h3", text: "B. Check it yourself" },
      { kind: "list", ordered: true, items: [
        "Put the answer and your notes side by side.",
        "**It kept the shape.** Count the sections and check the length you asked for.",
        "**Every fact is yours.** Find each name, number and date in your notes. If one is not there, fix it or delete it.",
        "**Nothing new got decided.** Delete any price, date or promise you did not agree to.",
        "**[CHECK] marks.** Fill in every one yourself.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["Too long, or the wrong shape", "Line 3 was not clear enough", "Add a number: \"under 120 words\" or \"3 sections\""],
        ["A fact that is not in your notes", "ChatGPT filled a gap", "Delete it. Make sure line 4 says \"Use only what I paste\""],
        ["It asks lots of questions every time", "Line 2 is missing details you always have", "Add those details to the ready prompt"],
        ["The tone is wrong for your client", "Line 3 did not name the tone", "Add 2 or 3 words, like \"warm, direct, no jargon\""],
      ] },
      { kind: "h3", text: "C. Fix the prompt, not just this answer" },
      { kind: "p", text: "Found a problem? Paste this in the same chat. Then copy the new prompt into your note, in place of the old one." },
      { kind: "prompt", label: "Fix the prompt", text: `This answer had a problem: [what was wrong].
Rewrite my prompt so this doesn't happen again. Keep the 4 headings. Show me only the new prompt.` },
      { kind: "example", label: "What you type", text: "This answer had a problem: it added a start date I never gave. Rewrite my prompt so this doesn't happen again. Keep the 4 headings. Show me only the new prompt." },
    ] },
    { num: "05", title: "Save your prompt library", accent: "Named and easy to find.", blocks: [
      { kind: "p", text: "Your prompt library is one place that holds the blank 4 lines, the \"ask me first\" line and your 3 ready prompts. Give each one a clear name." },
      { kind: "h3", text: "A. If you see Projects" },
      { kind: "p", text: "A Project is a folder in ChatGPT that keeps your files and rules together. Free plans may have fewer Projects, or none." },
      { kind: "list", ordered: true, items: [
        "Look at the left side of ChatGPT. Do you see **Projects**? On a small window, click the menu button at the top left first.",
        "Click **New project**. A box opens. Type the name **Prompt library** and click **Create project**.",
        "Paste your prompts into the project's **Instructions**, or add them as a file. Start each job chat inside this project.",
        "Can't find Projects? OpenAI moves these menus. Search \"projects\" on [OpenAI's help pages](https://help.openai.com/).",
      ] },
      { kind: "h3", text: "B. If you don't see Projects" },
      { kind: "list", ordered: true, items: [
        "Open the notes app on your computer or phone.",
        "Make one note called **Prompt library**.",
        "Put the blank 4 lines and the \"ask me first\" line at the top. Use them for jobs that are not in the library yet.",
        "Paste your 3 ready prompts under them.",
      ] },
      { kind: "h3", text: "C. Name each prompt so you can find it" },
      { kind: "p", text: "Say what it is for, then the detail. Then you can search your note for it." },
      { kind: "contrast", items: [
        { label: "Hard to find", text: "prompt 1, email thing, new one", good: false },
        { label: "Easy to find", text: "Proposal: first draft, Enquiry: first reply, Call: follow-up email", good: true },
      ] },
      { kind: "honest", text: "**The honest part:** a good prompt makes a good answer more likely. It doesn't make it certain. Always compare the answer with what you gave it. Check names, dates and anything that sounds decided. You still decide what gets sent." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Tried the short request and the 4-line one, and compared the answers",
        "Filled in the blank 4 lines for one job, with the \"ask me first\" line",
        "Ready prompts written for your 3 most common jobs",
        "One prompt tested on real notes and checked with the 4 checks",
        "That prompt fixed so the same problem won't come back",
        "Prompt library saved in a Project or a note, every prompt named",
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
