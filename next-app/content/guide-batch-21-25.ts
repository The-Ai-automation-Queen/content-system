// Guides 21 to 25, approved from the rebuilt copy decks (28/09/2026).
// Generated from the approved decks; every hero uses a full mascot scene card.
// Inline marks: **bold**, *italic*, [label](https://link).
import type { BatchGuide } from "./guide-batch-one";

export const batchTwentyOneTwentyFiveGuides: readonly BatchGuide[] = [
  {
    slug: "ai-jargon-guide",
    seoTitle: "AI terms explained simply: hallucination, context window, agent and more",
    seoDescription: "You'll understand AI words faster by seeing them happen in a chat. Three short experiments show you six words, and what each one changes about how you work.",
    title: "Learn 6 AI Words by Watching Them Happen",
    question: "People keep saying 'hallucination', 'context window', 'agent'. I nod along. What do they actually mean?",
    answer: "You'll understand AI words faster by seeing them happen in a chat. Three short experiments show you six words, and what each one changes about how you work.",
    level: "Beginner",
    minutes: 10,
    tool: "Any free AI chat",
    hero: { title: "Learn 6 AI words", accent: "by watching them happen.", line: "Don't memorise a glossary. Run three 2-minute experiments and you'll never forget what these words mean.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/learn-master.webp", alt: "The blue robot mascot shining a brass lens on an open book, turning words into clear shapes" } },
    leaveWith: "3 experiments, 6 words you can explain to a colleague, and the one habit each word should give you.",
    howTo: "Open any free AI chat. Run each experiment exactly as written, then read what happened. The words make sense after you've seen them.",
    sections: [
      { title: "Experiment 1: Hallucination and sources", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "What you do", text: "ask the AI about a book that was never written." }, { label: "What it shows", text: "a **hallucination** is the AI inventing something and saying it confidently. **Grounding** means tying an answer to a real source, which is how you catch it." }] },
        { kind: "example", label: "What you ask", text: "Summarise the novel *The Glass Orchard* by Mara Quell." },
        { kind: "result", label: "What you might see", lines: ["A confident plot summary (a hallucination), or \"I can't find this book\" (good). Then ask for a source link and watch what happens."] },
        { kind: "p", text: "**The habit:** for any fact you'll repeat, ask where it came from." },
        { kind: "locked", label: "Experiment 1 prompts", prompt: 0 },
      ] },
      { title: "Experiment 2: Context window and memory", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "What you do", text: "tell the AI something in one chat, then ask about it in a new one." }, { label: "What it shows", text: "the **context window** is everything the AI can see in this conversation. **Memory** is a separate setting that saves some details between chats, if it's switched on." }] },
        { kind: "example", label: "Chat 1", text: "My project is called Bluebird and the deadline is Friday." },
        { kind: "result", label: "Chat 2 (new)", lines: ["\"What's my project called?\" Usually: it doesn't know. If it does, memory is on."] },
        { kind: "p", text: "**The habit:** put the important details in every new chat, or in a Project, instead of hoping it remembers." },
        { kind: "locked", label: "Experiment 2 prompts", prompt: 2 },
      ] },
      { title: "Experiment 3: Agent and connector", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "What you do", text: "compare a request for an answer with a request for an action." }, { label: "What it shows", text: "a chatbot answers. An **agent** takes steps on its own, like clicking, searching or sending. A **connector** is the link that lets AI into your email, files or calendar." }] },
        { kind: "example", label: "An answer", text: "Write a reply declining the meeting." },
        { kind: "result", label: "An action", lines: ["\"Decline the meeting in my calendar and email the organiser.\" That needs a connector and permission, and it happens without you pressing Send."] },
        { kind: "p", text: "**The habit:** before you connect anything, ask \"what can it do without me?\"" },
        { kind: "locked", label: "Experiment 3 prompts", prompt: 4 },
      ] },
    ],
    honest: "Knowing the words won't make an answer right. What they give you is the right question to ask: where did this come from, what can it see, and what can it do without me?",
    gate: { promise: "5 prompts.", action: "Unlock" },
    prompts: [
      { title: "Experiment 1, step 1", text: `Summarise the novel "The Glass Orchard" by Mara Quell.` },
      { title: "Experiment 1, step 2", text: `Give me a link to a real source that shows this book exists. If you can't, tell me which parts of your last answer you made up.` },
      { title: "Experiment 2, step 1", text: `Remember this: my project is called Bluebird and the deadline is Friday.` },
      { title: "Experiment 2, step 2 (in a brand-new chat)", text: `What's my project called, and when is it due? If you don't know, just say so.` },
      { title: "Experiment 3 prompt", text: `Explain the difference between these two requests, in 3 lines:
1. "Write a reply declining the meeting."
2. "Decline the meeting in my calendar and email the organiser."

Then tell me what access an AI would need for the second one, and what could go wrong.` },
    ],
    pass: "**The 6 words on one card:** hallucination · grounding · context window · memory · agent · connector. One line each, with the habit that goes with it.",
    kit: { name: "AI workflows that save time", heading: "Want more jobs like these, ready for your week?", body: "The *AI workflows that save time* kit puts these ideas to work in 10 ready workflows." },
  },
  {
    slug: "chatgpt-scheduled-tasks",
    seoTitle: "How to use ChatGPT scheduled tasks: 3 useful weekly check-ins",
    seoDescription: "Start with three small, harmless check-ins: one that helps you plan, one that gathers news with sources, and one that watches a public page.",
    title: "Set Up 3 Check-Ins That ChatGPT Runs for You",
    question: "I've heard ChatGPT can do things on a schedule. What's actually worth setting up?",
    answer: "Start with three small, harmless check-ins: one that helps you plan, one that gathers news with sources, and one that watches a public page. Each has a clear stop point.",
    level: "Beginner",
    minutes: 15,
    tool: "ChatGPT (scheduled tasks)",
    hero: { title: "Set up 3 check-ins", accent: "ChatGPT runs for you.", line: "A Monday plan, a Friday news round-up, and one alert you actually want. Set them once and let them arrive.", tool: "ChatGPT", art: { kind: "scene", src: "/images/guides/chatgpt-scheduled-tasks.webp", alt: "The blue robot mascot setting a clockwork lookout beside a public noticeboard" } },
    leaveWith: "3 ready check-ins, the settings for each, and a rule for switching off any task that isn't earning its place.",
    howTo: "Set up one check-in today. Add the next only once the first has run twice and been useful.",
    sections: [
      { title: "Job 1: The Monday plan", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "starting the week on purpose instead of from your inbox." }, { label: "Why it works", text: "the task doesn't plan for you. It asks you three questions at the same time each week, and turns your answers into a short plan." }] },
        { kind: "example", label: "What arrives at 8:00 on Monday", text: "What must be done this week? What are you waiting on? What can wait?" },
        { kind: "result", label: "What a good plan looks like", lines: ["Your answers turned into 3 priorities, 2 follow-ups and 1 thing you're choosing not to do."] },
        { kind: "locked", label: "The Monday plan task", prompt: 0 },
      ] },
      { title: "Job 2: The Friday round-up", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "keeping up with one topic without reading everything." }, { label: "Why it works", text: "one narrow topic, a small number of stories, and a link for each means it stays short and you can check it." }] },
        { kind: "example", label: "The topic", text: "New rules on AI in hiring in the UK." },
        { kind: "result", label: "What a good round-up looks like", lines: ["Up to 3 stories from this week, one line each, the source and date. \"Nothing new this week\" is a good answer too."] },
        { kind: "locked", label: "The Friday round-up task", prompt: 1 },
      ] },
      { title: "Job 3: One alert you actually want", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "watching a public page for one specific change, like a course opening or a price dropping." }, { label: "Why it works", text: "an exact condition means silence most days, and a message only when it matters." }] },
        { kind: "example", label: "The condition", text: "Tell me when the booking page says 'Open' instead of 'Closed'." },
        { kind: "result", label: "What a good alert looks like", lines: ["The date, what changed, and a link to the page. No message on days nothing changed."] },
        { kind: "locked", label: "The page alert task", prompt: 2 },
      ] },
    ],
    honest: "A scheduled task can miss a change, misread a page or keep running long after it's useful. Check the first two results yourself, keep it to public pages, and give every task an end date.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The Monday plan task", text: `Every Monday at [8:00], ask me these 3 questions:
1. What must be done this week?
2. What am I waiting on from other people?
3. What can wait until next week?

When I answer, turn my answers into: 3 priorities · 2 follow-ups · 1 thing I'm choosing not to do. Use only what I tell you.` },
      { title: "Job 2: The Friday round-up task", text: `Every Friday at [16:00], find up to 3 news stories from the last 7 days about [one narrow topic].

For each: one-line summary · source name · date · link.

Use sources from this week only. If there's nothing new, say "Nothing new this week" instead of filling space.` },
      { title: "Job 3: The page alert task", text: `Every weekday at [9:00], check [public page link].

Only message me if [the exact change]. Tell me what changed, compared with your last check, and link to the page.

If you can't open the page or aren't sure, say so. Stop after [a date].` },
    ],
    pass: "**The keep-or-switch-off rule:** after 2 weeks, ask: did I read it, did I act on it, would I miss it? Two noes: switch it off.",
    kit: { name: "AI workflows that save time", heading: "Want more jobs like these, ready for your week?", body: "The *AI workflows that save time* kit has 10 workflows you can run on a schedule once you've checked them." },
  },
  {
    slug: "what-is-an-ai-browser",
    seoTitle: "What is an AI browser? 3 safe things to try first",
    seoDescription: "An AI browser is a web browser with an assistant built in that can read the page and, in some cases, click and type for you.",
    title: "3 Safe First Jobs to Give an AI Browser",
    question: "Everyone's talking about AI browsers. What would I use one for, and is it safe?",
    answer: "An AI browser is a web browser with an assistant built in that can read the page and, in some cases, click and type for you. Start with jobs where it only reads, and work up to acting on a page you don't care about.",
    level: "Beginner",
    minutes: 15,
    tool: "An AI browser (for example ChatGPT Atlas, Comet or Gemini in Chrome)",
    hero: { title: "3 safe first jobs", accent: "for an AI browser.", line: "Start with reading, then comparing, and only then let it touch a form. Stop before anything is sent.", tool: "AI browsers", art: { kind: "scene", src: "/images/guides/what-is-an-ai-browser.webp", alt: "The blue robot mascot at an antique viewing instrument, closing a privacy shutter" } },
    leaveWith: "3 first jobs from safest to riskiest, a prompt for each, and the settings to check before you let it near a work account.",
    howTo: "Use a separate browser profile, not signed in to email, banking or work accounts. Do the jobs in order.",
    sections: [
      { title: "Job 1: Read this page for me", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "a long page you need the point of, like terms, a report or a policy." }, { label: "Why it's safe", text: "it only looks at the page you're on. Nothing is clicked or sent." }] },
        { kind: "example", label: "The page", text: "A 4,000-word returns policy." },
        { kind: "result", label: "What a good answer looks like", lines: ["The 3 things that matter to you (how many days, who pays postage, what's excluded), each with the exact words from the page."] },
        { kind: "locked", label: "The page reading prompt", prompt: 0 },
      ] },
      { title: "Job 2: Compare two tabs", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "two similar options open side by side, like two courses or two tools." }, { label: "Why it's useful", text: "it lines up the details you'd otherwise flip between. You check the quotes." }] },
        { kind: "example", label: "Two tabs", text: "Two online courses on the same topic." },
        { kind: "result", label: "What a good answer looks like", lines: ["A table with price, length, what's included and refund terms, and \"Not on the page\" wherever a detail is missing."] },
        { kind: "locked", label: "The two-tab comparison prompt", prompt: 1 },
      ] },
      { title: "Job 3: Fill in a practice form", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "seeing the browser click and type, on a page where nothing real can happen." }, { label: "Why it's the last step", text: "once it acts, mistakes are real. A practice form shows you how it behaves before you trust it with anything that matters." }] },
        { kind: "example", label: "The practice", text: "A public newsletter or contact form, filled with made-up details." },
        { kind: "result", label: "What a good run looks like", lines: ["It fills the fields, stops, and asks you before pressing Submit. You then close the tab without sending."] },
        { kind: "locked", label: "The practice form prompt", prompt: 2 },
      ] },
    ],
    honest: "A web page can hide instructions meant for the AI, not for you. That's why you start signed out, read before you act, and never let it submit, buy or send without asking. If a page makes the assistant do something odd, stop it and close the tab.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The page reading prompt", text: `Read this page and tell me the 3 things that matter most for [who I am and what I want].

Quote the exact words from the page for each one. If the page doesn't cover something important, say so.

Don't click anything or open other pages.` },
      { title: "Job 2: The two-tab comparison prompt", text: `Compare the two pages I have open in a table:
[the 4 details I care about, for example price · length · what's included · refunds]

Quote the page for each detail. Write "Not on the page" where it's missing. Don't recommend one. Don't click anything.` },
      { title: "Job 3: The practice form prompt", text: `Fill in the form on this page with these made-up details: [name, email, message].

Stop before you press Submit, Send or any button that finishes the form. Tell me what you filled in and wait. Don't submit.` },
    ],
    pass: "**Before any real page:** signed out of what matters · you can see every step · it stops and asks before anything is sent, bought or deleted.",
    kit: { name: "AI workflows that save time", heading: "Want more jobs like these, ready for your week?", body: "The *AI workflows that save time* kit includes a research workflow built on the same quote-and-check method." },
  },
  {
    slug: "test-meta-muse-money-saving-task",
    seoTitle: "How to use AI to cut your bills and subscriptions",
    seoDescription: "Yes. AI is good at spotting repeat payments in a list, working out the true yearly cost of a renewal, and drafting a firm, polite message.",
    title: "Cut 3 Bills This Month With AI Doing the Legwork",
    question: "I know I'm paying for things I don't use. Can AI help me find and cut them?",
    answer: "Yes. AI is good at spotting repeat payments in a list, working out the true yearly cost of a renewal, and drafting a firm, polite message. You keep the bank details private and make every decision.",
    level: "Beginner",
    minutes: 20,
    tool: "Any AI chat (Meta AI, ChatGPT, Claude or Gemini)",
    hero: { title: "Cut 3 bills this month", accent: "with AI doing the legwork.", line: "Find the subscriptions you forgot, see the real cost of a renewal, and send the message you've been putting off.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/test-meta-muse-money-saving-task.webp", alt: "The blue robot mascot holding the final lever while a machine compares three price tags" } },
    leaveWith: "a subscription finder, a renewal cost check, a cancel-or-negotiate message, and a list of what never to paste.",
    howTo: "Before you paste anything, remove account numbers, card numbers, your address and anything that identifies you. Keep only date, name of payee and amount.",
    sections: [
      { title: "Job 1: Find the subscriptions you forgot", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "three months of payments, and the small monthly charges hiding in them." }, { label: "Why it works", text: "spotting the same payee every month is tedious for you and quick for AI." }] },
        { kind: "example", label: "What you paste (cleaned)", text: "03/07 StreamBox 9.99 · 05/07 CloudDrive 2.99 · 03/08 StreamBox 9.99 · 12/08 FitApp 14.99 · 03/09 StreamBox 9.99 · 12/09 FitApp 14.99" },
        { kind: "result", label: "What a good answer looks like", lines: ["StreamBox, monthly, 9.99 · FitApp, monthly, 14.99 · CloudDrive, once so far, check it. Then a yearly total for each."] },
        { kind: "locked", label: "The subscription finder prompt", prompt: 0 },
      ] },
      { title: "Job 2: The real cost of a renewal", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "a renewal letter for broadband, insurance or a phone plan." }, { label: "Why it works", text: "the headline price often hides the end of an intro deal or extra fees. Adding up 12 months shows the real number." }] },
        { kind: "example", label: "The renewal", text: "20 a month for the first 3 months, then 32 a month. Setup fee 25." },
        { kind: "result", label: "What a good answer looks like", lines: ["3 × 20 + 9 × 32 + 25 = 373 for the year. Plus the questions to ask before you accept."] },
        { kind: "locked", label: "The renewal cost prompt", prompt: 1 },
      ] },
      { title: "Job 3: The message you've been putting off", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "the cancellation or \"can you do better?\" email." }, { label: "Why it works", text: "AI writes a clear, polite, firm message in seconds. You decide what you're asking for." }] },
        { kind: "example", label: "Your facts", text: "Customer for 3 years · the new price is 32 · you've seen 25 elsewhere · you'll leave if they can't match." },
        { kind: "result", label: "What a good message looks like", lines: ["Under 100 words, your facts only, one clear ask, a date you need a reply by."] },
        { kind: "locked", label: "The cancel-or-negotiate prompt", prompt: 2 },
      ] },
    ],
    honest: "AI can add up wrong and can't see offers you haven't told it about. Check the maths once with a calculator, and confirm any price on the company's own page before you act. Never paste full bank statements, card numbers or login details.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The subscription finder prompt", text: `Here are my payments from the last 3 months (date · payee · amount). I've removed my account details.

Find anything that looks like a repeat payment. For each: payee · how often · amount · yearly total.

List one-off payments separately. If you're not sure something repeats, mark it "Check". Don't guess what the payee is.

Payments: [paste]` },
      { title: "Job 2: The renewal cost prompt", text: `Work out the total cost of this deal over 12 months, including every fee mentioned. Show the sum step by step.

Then list up to 5 questions I should ask before accepting, like what happens after the first year or if there's an exit fee.

Use only what's in the text. Deal: [paste the renewal wording]` },
      { title: "Job 3: The cancel-or-negotiate prompt", text: `Write a short email to [company] asking them to [lower my price / cancel my plan].

My facts: [bullet points]

Polite and firm, under 100 words, one clear ask, and ask for a reply by [date]. Use only my facts. Draft only, I'll send it myself.` },
    ],
    pass: "**Never paste:** card or account numbers · passwords or security answers · full statements with your address.",
    kit: { name: "AI workflows that save time", heading: "Want more jobs like these, ready for your week?", body: "The *AI workflows that save time* kit has 10 workflows like this, each with a check before you act." },
  },
  {
    slug: "make-work-tracker-with-kimi",
    seoTitle: "How to make an Excel task tracker with AI (Kimi or any AI)",
    seoDescription: "Yes, and the file is the easy part.",
    title: "Let AI Build Your Excel Tracker, Then Try to Break It",
    question: "Our tasks live in emails and sticky notes. Can AI make us a proper tracker?",
    answer: "Yes, and the file is the easy part. Let the AI ask how your team works before it builds anything, then test the tracker by doing the things real people do: wrong dates, blank owners, \"done-ish\".",
    level: "Beginner",
    minutes: 20,
    tool: "Kimi, ChatGPT or Claude (any AI that can make an .xlsx file)",
    hero: { title: "Let AI build your Excel tracker,", accent: "then try to break it.", line: "Get AI to ask how your team works, build the file, and then test it with the mistakes real people make.", tool: "Kimi or any AI", art: { kind: "scene", src: "/images/guides/make-work-tracker-with-kimi.webp", alt: "The blue robot mascot checking one organised set of work files" } },
    leaveWith: "a prompt that designs the tracker around your team, a build prompt, and a 5-minute break test to run before anyone else sees it.",
    howTo: "Use made-up tasks first. Only move real tasks in once the tracker has passed the break test.",
    sections: [
      { title: "Job 1: Let it interview you", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "deciding what the tracker needs, before it's built." }, { label: "Why it works", text: "a tracker with the wrong columns gets abandoned in a week. Five questions about how your team works get you the right ones." }] },
        { kind: "example", label: "Questions it might ask", text: "Who updates it? What does \"done\" mean for you? Do tasks wait on other people? What do you check on Monday?" },
        { kind: "result", label: "What a good answer looks like", lines: ["5 to 7 columns you'll actually fill in, each with a reason, and nothing added \"just in case\"."] },
        { kind: "locked", label: "The interview prompt", prompt: 0 },
      ] },
      { title: "Job 2: Build the file", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "turning the agreed columns into a working Excel file." }, { label: "Why it works", text: "dropdowns and real date cells stop the mess that makes trackers useless." }] },
        { kind: "example", label: "Three practice tasks", text: "Draft the newsletter · Amir · Tuesday\" · \"Book the photographer · Priya · last Friday\" · \"Update the price list · no owner yet\"." },
        { kind: "result", label: "What a good file looks like", lines: ["Status as a dropdown, dates as real dates, \"Book the photographer\" flagged overdue, the missing owner shown as blank, not invented."] },
        { kind: "locked", label: "The build prompt", prompt: 1 },
      ] },
      { title: "Job 3: Try to break it", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "testing the file the way a busy team will use it." }, { label: "Why it works", text: "real people type \"tomorrow\" in a date cell and forget the owner. Better to find out now." }] },
        { kind: "example", label: "The break test", text: "Type \"tomorrow\" as a date · leave an owner blank · mark a past task Done · sort by due date · add a row at the bottom." },
        { kind: "result", label: "What passing looks like", lines: ["The date cell refuses \"tomorrow\" · the blank owner stands out · the overdue flag clears when it's Done · sorting keeps rows together · the new row gets the dropdown too."] },
        { kind: "locked", label: "The fix-it prompt", prompt: 2 },
      ] },
    ],
    honest: "The tracker won't make anyone update it. Agree who updates it and when (for example, everyone before Monday's meeting), and keep it to the columns people actually use.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The interview prompt", text: `I want an Excel tracker for my team's tasks. Before you build anything, ask me up to 5 questions about how we work: who updates it, what "done" means, what we check each week. Ask one at a time and wait for my answer.

Then suggest 5 to 7 columns, with one line on why each one is needed. Don't build the file yet.` },
      { title: "Job 2: The build prompt", text: `Build the tracker as an editable Excel file with these columns: [paste the agreed columns].

- Status is a dropdown: [your statuses].
- Dates are real date cells.
- Add an "Overdue?" column that says Yes only when the date has passed and Status isn't Done.
- Add these practice tasks: [paste 3 made-up tasks]. Leave anything I didn't give you blank.

Give me the .xlsx file to download.` },
      { title: "Job 3: The fix-it prompt", text: `I tested the tracker. Here's what went wrong: [list what broke in the break test].

Fix only these problems. Don't change the columns, the dropdown options or the practice tasks. Tell me what you changed, then give me the new file.` },
    ],
    pass: "**Before your team sees it:** break test passed · someone owns updating it · no real tasks until then.",
    kit: { name: "AI workflows that save time", heading: "Want more jobs like these, ready for your week?", body: "This is workflow 9 (messy list into a tracker in a spreadsheet) in the *AI workflows that save time* kit." },
  },
];
