// Guides 11 to 15, approved from the rebuilt copy decks (28/09/2026).
// Generated from the approved decks; every hero uses a full mascot scene card.
// Inline marks: **bold**, *italic*, [label](https://link).
import type { BatchGuide } from "./guide-batch-one";

export const batchElevenFifteenGuides: readonly BatchGuide[] = [
  {
    slug: "gemini-cannot-find-drive-file",
    seoTitle: "How to get Gemini to answer questions from your Google Drive files",
    seoDescription: "Yes, if you name the file instead of describing it, ask for the exact line behind every answer, and know the four reasons it sometimes comes back empty.",
    title: "Ask Gemini Questions About Your Own Google Docs",
    question: "I know the answer is in one of my Docs somewhere. Can Gemini just find it for me?",
    answer: "Yes, if you name the file instead of describing it, ask for the exact line behind every answer, and know the four reasons it sometimes comes back empty.",
    level: "Beginner",
    minutes: 10,
    tool: "Gemini with Google Drive",
    hero: { title: "Ask Gemini about", accent: "your own Google Docs.", line: "Stop scrolling through folders. Name the file, ask the question, and get the answer with the line it came from.", tool: "Gemini", art: { kind: "scene", src: "/images/guides/gemini-cannot-find-drive-file.webp", alt: "The blue robot mascot tracing one document through account keys and file drawers" } },
    leaveWith: "a way to point Gemini at the right file, a question prompt that always shows its source, and a 2-minute test for when Gemini says it can't find anything.",
    howTo: "Open Gemini while signed in to the Google account that owns your files. Try job 1 with a Doc you opened this week, so you know what the right answer is.",
    sections: [
      { title: "Job 1: Point it at the right file", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "getting Gemini to open the one file you mean, not a similar one." }, { label: "Why it works", text: "\"the budget doc\" could be ten files. An exact title is one. And asking Gemini to confirm the file first stops you trusting an answer from the wrong version." }] },
        { kind: "example", label: "The vague ask", text: "Find the budget doc from the event." },
        { kind: "result", label: "What a good answer looks like", lines: ["\"I found *Autumn event budget v3*, last edited by you, with a link.\" You click it and check before asking anything else."] },
        { kind: "locked", label: "The find-the-file prompt", prompt: 0 },
      ] },
      { title: "Job 2: Get the answer with its line", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "a quick fact from a long Doc: a date, a price, who agreed to what." }, { label: "Why it works", text: "when Gemini has to quote the sentence, you can see straight away if it read the file or filled a gap." }] },
        { kind: "example", label: "Your question", text: "What did we agree about the venue deposit?" },
        { kind: "result", label: "What a good answer looks like", lines: ["\"Half the deposit is due when the contract is signed.\" Then the quote from the Doc, the heading it sits under, and the link."] },
        { kind: "locked", label: "The quote-first prompt", prompt: 1 },
      ] },
      { title: "Job 3: When it says \"I couldn't find it\"", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "working out whether the problem is the file or the connection." }, { label: "Why it works", text: "make a brand-new test Doc with one odd line in it. If Gemini finds that, the connection works and the problem is the original file." }] },
        { kind: "example", label: "The test Doc", text: "Title \"Gemini test note\", one line: \"The colour of the week is teal." },
        { kind: "result", label: "What the result tells you", lines: ["Found it · the connection works, check the original file's title and type. Didn't find it · check which account you're signed in with and whether Drive is switched on for Gemini."] },
        { kind: "locked", label: "The connection test prompt", prompt: 2 },
      ] },
    ],
    honest: "Gemini can only see what the account you're signed in with can open, and at work your company may switch Drive access off. Scanned PDFs and images of text can be hard for it to read. None of this means your file is gone.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The find-the-file prompt", text: `Find my Google Drive file called "[exact title]".

Before you tell me anything from it, confirm:
- the exact title you found
- who last edited it
- a link to it

If more than one file matches, list them all and ask me which one I mean.` },
      { title: "Job 2: The quote-first prompt", text: `From my file "[exact title]", answer this: [your question]

Start with the exact sentence from the file that answers it, and the heading it sits under. Then give me the answer in one line.

If the file doesn't answer it, say "Not in this file". Don't use other files or general knowledge.` },
      { title: "Job 3: The connection test prompt", text: `Find my Google Doc called "Gemini test note" and tell me the colour of the week it mentions.

If you can't find it, tell me which Google account you're searching and whether you can see my Drive at all. Don't guess the colour.` },
    ],
    pass: "**Before you use the answer:** right file · right version · the quote really says what the answer claims.",
    kit: { name: "AI workflows that save time", heading: "Want more jobs like these, ready for your week?", body: "The *AI workflows that save time* kit includes \"find the answer in a long document\" and 9 more jobs like this one." },
  },
  {
    slug: "gemini-google-tasks-limits",
    seoTitle: "How to use Gemini with Google Tasks to plan your week",
    seoDescription: "Gemini can turn a messy brain dump into tasks and tell you what's due. You stay in charge of what gets added, where it goes and what gets dropped.",
    title: "Plan Your Week in Google Tasks With Gemini",
    question: "My to-do list lives in my head and three notebooks. Can Gemini sort it out?",
    answer: "Gemini can turn a messy brain dump into tasks and tell you what's due. You stay in charge of what gets added, where it goes and what gets dropped.",
    level: "Beginner",
    minutes: 15,
    tool: "Gemini with Google Tasks",
    hero: { title: "Plan your week in Google Tasks", accent: "with Gemini.", line: "Empty your head, let Gemini do the typing, and check the list before anything is added.", tool: "Gemini", art: { kind: "scene", src: "/images/guides/gemini-google-tasks-limits.webp", alt: "The blue robot mascot sorting three tasks into two separate trays" } },
    leaveWith: "a brain-dump prompt, a this-week view you can ask for any morning, and a Friday reset that clears the overdue pile without guilt.",
    howTo: "Do job 1 on Monday morning, job 2 on any weekday, job 3 on Friday afternoon. Check the Google Tasks app after each one.",
    sections: [
      { title: "Job 1: Brain dump into tasks", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "everything in your head, typed once, turned into a clean list." }, { label: "Why it works", text: "Gemini is fast at turning rambling notes into short tasks. Asking to see the list first means nothing lands in the wrong place." }] },
        { kind: "example", label: "The brain dump", text: "Call the printer about the flyers, send Sam the draft by Thursday, book the dentist, chase invoice 114, renew the domain before the 20th" },
        { kind: "result", label: "What a good answer looks like", lines: ["5 tasks, each starting with a verb. Due dates only on the two where you gave one. Shown to you first, added only when you say yes."] },
        { kind: "locked", label: "The brain-dump prompt", prompt: 0 },
      ] },
      { title: "Job 2: What's due this week", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "seeing the week at a glance without opening every list." }, { label: "Why it works", text: "a short, fixed format is quick to read and easy to check against the app." }] },
        { kind: "example", label: "Your question", text: "What's due this week?" },
        { kind: "result", label: "What a good answer looks like", lines: ["Tasks grouped by day, then a short \"No due date\" section. Where Gemini can't tell which list a task is in, it says so instead of guessing."] },
        { kind: "locked", label: "The this-week prompt", prompt: 1 },
      ] },
      { title: "Job 3: The Friday reset", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "the overdue tasks that make you feel behind." }, { label: "Why it works", text: "Gemini suggests; you decide. A task you keep moving is a decision waiting to be made." }] },
        { kind: "example", label: "Three overdue tasks", text: "Update the website bio\" (moved 3 times) · \"chase invoice 114\" · \"book the dentist" },
        { kind: "result", label: "A good reset", lines: ["Chase the invoice Monday · book the dentist today, it takes 2 minutes · the bio: drop it or give it a real slot. Nothing changes in the app until you confirm."] },
        { kind: "locked", label: "The Friday reset prompt", prompt: 2 },
      ] },
    ],
    honest: "Gemini may add tasks to your default list, or miss which list a task belongs to. Look at the Tasks app after every change. If a list matters (a client, a project), check it by hand.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The brain-dump prompt", text: `Turn this into a task list for Google Tasks.

- Start each task with a verb and keep it under 8 words.
- Add a due date only where I gave one. Don't invent dates.
- Show me the list first. Only add the tasks after I say "add them".

My brain dump: [paste or type everything]` },
      { title: "Job 2: The this-week prompt", text: `Show my Google Tasks that are due between today and Sunday.

Group them by day. Then list any open tasks with no due date under "No due date".

For each task give the exact title and the list it's in. If you can't see the list, write "List not visible". Don't change anything.` },
      { title: "Job 3: The Friday reset prompt", text: `Show my overdue Google Tasks.

For each one, suggest one of: do it Monday · move it to a specific date · drop it. Give a one-line reason.

Don't change, move or delete anything. Wait for my decision on each one.` },
    ],
    pass: "**Before you trust the list:** open the Tasks app and check the titles, the dates and the list for anything you just added.",
    kit: { name: "AI workflows that save time", heading: "Want more jobs like these, ready for your week?", body: "The *AI workflows that save time* kit includes a weekly planning workflow that works with your task list, not against it." },
  },
  {
    slug: "check-copilot-excel-edits",
    seoTitle: "How to use Copilot in Excel safely: 3 jobs and how to check them",
    seoDescription: "Give Copilot one small job at a time, on a copy of the file, and check each job the way it can go wrong: a tidy-up can lose rows, a formula can miss cells,",
    title: "3 Excel Jobs for Copilot, and the Check for Each",
    question: "Copilot says it's updated my spreadsheet. How do I know it didn't break something?",
    answer: "Give Copilot one small job at a time, on a copy of the file, and check each job the way it can go wrong: a tidy-up can lose rows, a formula can miss cells, a summary can invent a trend.",
    level: "Beginner",
    minutes: 15,
    tool: "Copilot in Excel",
    hero: { title: "3 Excel jobs for Copilot,", accent: "and the check for each.", line: "Tidy a column, add a formula, explain a sheet. Then spend one minute proving it's right.", tool: "Copilot in Excel", art: { kind: "scene", src: "/images/guides/check-copilot-excel-edits.webp", alt: "The blue robot mascot inspecting one changed cell through a brass magnifier" } },
    leaveWith: "3 jobs worth handing to Copilot, a one-minute check for each, and a prompt that makes Copilot tell you exactly what it touched.",
    howTo: "Make a copy of a real sheet, or use the example below. Never try a new job on the only copy of a file people rely on.",
    sections: [
      { title: "Job 1: Tidy a messy column", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "names in different formats, dates typed three ways, extra spaces." }, { label: "Why it works", text: "tidying is slow and boring for people. The risk is lost or merged rows, so you count before and after." }] },
        { kind: "example", label: "The messy column", text: "Jo SMITH · Smith, Amir · priya patel  · LEE, SAM" },
        { kind: "result", label: "What a good result looks like", lines: ["Jo Smith · Amir Smith · Priya Patel · Sam Lee. Still 4 rows, in the same order, next to the same data."] },
        { kind: "locked", label: "The tidy-up prompt", prompt: 0 },
      ] },
      { title: "Job 2: Add a formula column", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "a new column that works something out, like days overdue or price with tax." }, { label: "Why it works", text: "Copilot writes the formula. You test it on one row you can work out in your head." }] },
        { kind: "example", label: "The request", text: "Add a column showing how many days late each invoice is." },
        { kind: "result", label: "What checking looks like", lines: ["Pick one invoice due 10 days ago and still unpaid. The new column should say 10. Paid invoices should say 0 or stay blank."] },
        { kind: "locked", label: "The formula prompt", prompt: 1 },
      ] },
      { title: "Job 3: Explain what the sheet shows", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "a quick read of the numbers before a meeting." }, { label: "Why it works", text: "a summary sounds convincing even when it's wrong. Asking for the cells behind each point lets you check in seconds." }] },
        { kind: "example", label: "Copilot says", text: "Sales grew every month this quarter." },
        { kind: "result", label: "What checking finds", lines: ["The cells it names show April 12, May 15, June 11. June went down. The sentence was wrong; the numbers were right there."] },
        { kind: "locked", label: "The explain-with-cells prompt", prompt: 2 },
      ] },
    ],
    honest: "Copilot can change more than you asked for, and a confident summary can be wrong. Work on a copy, one job at a time, and don't share the file until your one-minute check is done.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The tidy-up prompt", text: `In column [letter], make every name "First Last" with capital first letters, and remove extra spaces.

Change only column [letter]. Don't sort, delete or merge any rows.

When you're done, tell me how many rows there were before and after.` },
      { title: "Job 2: The formula prompt", text: `Add a new column called "[name]" that shows [what to work out].

Explain the formula in one plain-English sentence. Then tell me which row I should check by hand, and what the answer should be in that row.

Don't change any existing column.` },
      { title: "Job 3: The explain-with-cells prompt", text: `Give me 3 things this sheet shows, in plain English.

For each one, name the exact cells or range you used. If the data doesn't clearly show something, say so rather than guess a trend.` },
    ],
    pass: "**The one-minute check:** row count the same · one row checked by hand · every claim matches the cells it names.",
    kit: { name: "AI workflows that save time", heading: "Want more jobs like these, ready for your week?", body: "The *AI workflows that save time* kit includes a messy-list-to-tracker workflow with the same check-before-you-trust step." },
  },
  {
    slug: "what-can-copilot-see-at-work",
    seoTitle: "How to use Microsoft Copilot to prepare for meetings",
    seoDescription: "Copilot can pull together the emails, chats and files you already have access to.",
    title: "Walk Into Every Meeting Prepared, With Copilot",
    question: "I have back-to-back meetings and no time to prepare. Can Copilot help?",
    answer: "Copilot can pull together the emails, chats and files you already have access to. Use it before, during the gap and after a meeting, and check the source behind anything you plan to say out loud.",
    level: "Beginner",
    minutes: 15,
    tool: "Microsoft 365 Copilot",
    hero: { title: "Walk into every meeting", accent: "prepared, with Copilot.", line: "Catch up on the thread, prepare in five minutes, and have the follow-up drafted before you're back at your desk.", tool: "Microsoft 365 Copilot", art: { kind: "scene", src: "/images/guides/what-can-copilot-see-at-work.webp", alt: "The blue robot mascot using a brass viewing scope on three locked cabinets for mail, files and meetings" } },
    leaveWith: "a catch-up prompt for threads you were copied into, a 5-minute meeting prep, and a follow-up draft you check before sending.",
    howTo: "Pick one meeting on tomorrow's calendar. Run all three jobs for that one meeting.",
    sections: [
      { title: "Job 1: Catch up on the thread", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "a long email thread you skimmed, and now you're in the meeting about it." }, { label: "Why it works", text: "Copilot can read the whole thread faster than you. Asking for the open questions tells you what the meeting is really for." }] },
        { kind: "example", label: "The thread", text: "23 emails about moving the client launch." },
        { kind: "result", label: "What a good answer looks like", lines: ["The new date being proposed · who's for and against · the one open question · a link to each email it used."] },
        { kind: "locked", label: "The catch-up prompt", prompt: 0 },
      ] },
      { title: "Job 2: Prepare in 5 minutes", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "knowing who's in the room, what was said last time and what you need to get out of it." }, { label: "Why it works", text: "Copilot can pull the last meeting's notes and the files people shared. You decide your one goal." }] },
        { kind: "example", label: "The meeting", text: "Launch check-in, Thursday 10:00, 5 people." },
        { kind: "result", label: "A good prep card", lines: ["What happened last time · 2 files you should skim · the decision on the table · 2 questions you could ask."] },
        { kind: "locked", label: "The prep prompt", prompt: 1 },
      ] },
      { title: "Job 3: Draft the follow-up", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "the \"thanks, here's what we agreed\" email nobody wants to write." }, { label: "Why it works", text: "fresh notes plus a fixed shape means a draft in a minute. You check names and dates, then send." }] },
        { kind: "example", label: "Your notes", text: "Launch moves to 14th. Amir updates the plan by Mon. Budget still open." },
        { kind: "result", label: "What a good draft looks like", lines: ["Decided · Who does what, by when · Still open. Under 120 words. \"Budget\" listed as open, not as agreed."] },
        { kind: "locked", label: "The follow-up prompt", prompt: 2 },
      ] },
    ],
    honest: "Copilot sees what your account can see. If a file was shared too widely in your company, Copilot can surface it too. Check the source link before you quote anything, and tell your IT team if it shows you something you shouldn't have.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The catch-up prompt", text: `Catch me up on the email thread about [topic].

Tell me:
1. What's being proposed.
2. Who agrees and who has concerns (names only).
3. What's still undecided.

Link to the email each point comes from. If the thread doesn't make something clear, say so.` },
      { title: "Job 2: The prep prompt", text: `Help me prepare for my meeting "[meeting name]" on [day].

Using only emails, chats and files I have access to, give me:
- What was agreed last time, with the source.
- Up to 2 files worth skimming, with links.
- The decision likely to come up.
- 2 questions I could ask.

My goal for this meeting: [one line]. Keep it under 150 words.` },
      { title: "Job 3: The follow-up prompt", text: `Turn these notes into a short follow-up email.

Use 3 headings: Decided · Who does what, by when · Still open.

Use only my notes. If a person or date is missing, write [CHECK]. A suggestion isn't a decision. Under 120 words. Draft only, don't send.

Notes: [paste]` },
    ],
    pass: "**Before you say it or send it:** every name, date and number checked against its source link.",
    kit: { name: "AI workflows that save time", heading: "Want more jobs like these, ready for your week?", body: "The *AI workflows that save time* kit includes \"long thread into a 3-line summary\" and 9 more workflows like this one." },
  },
  {
    slug: "fix-deepseek-wall-of-text",
    seoTitle: "How to stop DeepSeek writing a wall of text",
    seoDescription: "Ask for layout changes only, set your layout rules at the start of every chat, and then make the AI list anything it changed besides line breaks.",
    title: "Get DeepSeek to Write in Paragraphs You Can Actually Read",
    question: "DeepSeek gave me my scene back as one giant block. How do I fix it without losing what I wrote?",
    answer: "Ask for layout changes only, set your layout rules at the start of every chat, and then make the AI list anything it changed besides line breaks.",
    level: "Beginner",
    minutes: 10,
    tool: "DeepSeek (works in any AI chat)",
    hero: { title: "Get DeepSeek to write in paragraphs", accent: "you can actually read.", line: "Fix the block you have, stop it happening again, and prove nothing else changed.", tool: "DeepSeek", art: { kind: "scene", src: "/images/guides/fix-deepseek-wall-of-text.webp", alt: "The blue robot mascot cutting a dense wall of type into clear scene and dialogue panels" } },
    leaveWith: "a layout-only fix, a house-style note to paste at the start of every writing chat, and a check that catches sneaky rewrites.",
    howTo: "Keep your original text saved somewhere else before you start. Do job 1 on the block you have now, then set up job 2 for next time.",
    sections: [
      { title: "Job 1: Break up the block", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "one wall of text that should be paragraphs and dialogue." }, { label: "Why it works", text: "if you only say \"make it readable\", the AI may rewrite. Saying \"layout only\" and naming what counts as layout keeps your words yours." }] },
        { kind: "example", label: "The wall", text: "The rain had stopped by the time Lena reached the station. 'You're late,' Marc said. 'The train was,' she said, and sat down without looking at him. Neither of them mentioned the letter." },
        { kind: "result", label: "What a good answer looks like", lines: ["Four short paragraphs. Each speaker on a new line. Every word the same."] },
        { kind: "locked", label: "The layout-only prompt", prompt: 0 },
      ] },
      { title: "Job 2: Stop it happening next time", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "stopping the next chat doing the same thing." }, { label: "Why it works", text: "AI follows rules better when they come first. A short style note at the start of each writing session sets the layout before a word is written." }] },
        { kind: "example", label: "Your house style", text: "Short paragraphs · new line for each speaker · no headings or bullet points in fiction · British spelling." },
        { kind: "result", label: "What a good answer looks like", lines: ["The next scene arrives already laid out your way, with no reminder needed in that chat."] },
        { kind: "locked", label: "The house-style note", prompt: 1 },
      ] },
      { title: "Job 3: Prove nothing else changed", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "being sure the AI didn't quietly \"improve\" a line." }, { label: "Why it works", text: "asking the AI to compare the two versions word by word catches changes you'd miss when reading." }] },
        { kind: "example", label: "What you paste", text: "Your original, then the reformatted version." },
        { kind: "result", label: "What a good answer looks like", lines: ["\"Only line breaks changed.\" Or a short list: \"Line 3: 'said' became 'replied'.\" Then you put your word back."] },
        { kind: "locked", label: "The difference check prompt", prompt: 2 },
      ] },
    ],
    honest: "No prompt guarantees the AI won't touch a word. That's why job 3 exists. For anything you plan to publish, run the check, or compare the two versions in a document tool.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The layout-only prompt", text: `Change the layout of this text only.

Layout means: paragraph breaks, and a new line whenever someone new speaks. Nothing else.

Keep every word, name, punctuation mark and line of dialogue exactly as it is. Don't add, cut or continue anything.

Return only the text.

Text: [paste]` },
      { title: "Job 2: The house-style note (paste at the start of each writing chat)", text: `House style for everything in this chat:
- Short paragraphs, one moment each.
- A new line for each speaker.
- No headings, bullet points or bold in fiction.
- [Your spelling, for example British English].

If you're editing my text, change only what I ask for. If you're unsure whether something counts, ask me first.` },
      { title: "Job 3: The difference check prompt", text: `Compare these two versions word by word.

List every difference that isn't a line break or paragraph break: the line, the original words and the new words.

If the only differences are line breaks, say "Only line breaks changed."

Original: [paste]
New version: [paste]` },
    ],
    pass: "**Before you save it:** same words · same dialogue · your voice, only easier to read.",
    kit: { name: "AI workflows that save time", heading: "Want more jobs like these, ready for your week?", body: "The *AI workflows that save time* kit includes \"rough points into an email in your tone\", built on the same protect-your-words method." },
  },
];
