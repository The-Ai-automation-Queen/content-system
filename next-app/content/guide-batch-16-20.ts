// Guides 16 to 20, approved from the rebuilt copy decks (28/09/2026).
// Generated from the approved decks; every hero uses a full mascot scene card.
// Inline marks: **bold**, *italic*, [label](https://link).
import type { BatchGuide } from "./guide-batch-one";

export const batchSixteenTwentyGuides: readonly BatchGuide[] = [
  {
    slug: "what-is-ai",
    seoTitle: "What can AI actually do for me? 3 things to try today",
    seoDescription: "You'll understand AI faster by using it than by reading about it.",
    title: "3 Things to Try With AI Before Lunch",
    question: "Everyone talks about AI. I still don't get what it would do for me.",
    answer: "You'll understand AI faster by using it than by reading about it. Give it three jobs you already do (a reply, a summary, a sort) and judge the results against your own work.",
    level: "Beginner",
    minutes: 15,
    tool: "ChatGPT, Claude or Gemini",
    hero: { title: "3 things to try with AI", accent: "before lunch.", line: "Skip the theory. Hand AI three small jobs you already do and see for yourself.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/what-is-ai.webp", alt: "The blue robot mascot at a loom that turns shapes into an ordered pattern" } },
    leaveWith: "3 prompts for jobs you do every week, a worked example for each, and the one habit that stops AI embarrassing you.",
    howTo: "Open any free AI chat. Do job 1 with the example, then with a real email of your own (remove names first). Jobs 2 and 3 take five minutes each.",
    sections: [
      { title: "Job 1: The reply you keep putting off", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "an email that needs a careful answer, and you don't know where to start." }, { label: "Why it works", text: "AI is good at structure and tone. You bring the facts and the decision." }] },
        { kind: "example", label: "The email you received", text: "Hi, quick one, can you confirm whether the workshop on the 14th is still on, whether we can bring two extra people, and if the invoice goes to me or to finance? Thanks, Jo" },
        { kind: "result", label: "What a good answer looks like", lines: ["Three short answers in Jo's order, your facts only, a friendly close, under 90 words. No promises you didn't make."] },
        { kind: "locked", label: "The reply prompt", prompt: 0 },
      ] },
      { title: "Job 2: The 3 points that matter", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "a long article or report you should have read before a meeting." }, { label: "Why it works", text: "AI can find the key points in seconds, and it can show you the exact sentence each one came from, so you can check it." }] },
        { kind: "example", label: "What you paste", text: "Any public article or report of up to 2 pages." },
        { kind: "result", label: "What a good answer looks like", lines: ["3 points, each with the sentence it came from, and one line on what the article *doesn't* say."] },
        { kind: "locked", label: "The 3-point prompt", prompt: 1 },
      ] },
      { title: "Job 3: Sort the pile", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "a list of feedback, survey answers or ideas you need to make sense of." }, { label: "Why it works", text: "grouping is slow for people and fast for AI. You decide if the groups are right." }] },
        { kind: "example", label: "What you paste", text: "Too long · loved the examples · audio kept cutting · more time for questions · slides arrived late · great host · wanted the recording · room was cold" },
        { kind: "result", label: "What a good answer looks like", lines: ["Content (2) · Tech (2) · Format (2) · Venue and admin (2), with every comment in exactly one group."] },
        { kind: "locked", label: "The sorting prompt", prompt: 2 },
      ] },
    ],
    honest: "AI sounds just as confident when it's wrong. The habit that protects you: before you use any answer, put it next to what you gave it and check the names, numbers and anything that sounds decided.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The reply prompt", text: `Help me reply to this email. Here's what I know:
[your facts, as bullet points]

Answer each question in the order they asked. Keep it friendly and under 90 words. Use only my facts. If I haven't given you an answer to something, write [CHECK] there instead of making one up.

The email: [paste]` },
      { title: "Job 2: The 3-point prompt", text: `Read this and give me the 3 points that matter most for [who it's for, for example my team meeting].

For each point, quote the sentence it came from. Then add one line: what does this text NOT tell us that we might need?

Text: [paste]` },
      { title: "Job 3: The sorting prompt", text: `Sort these into 3 to 5 groups. Name each group and count the items in it.

Put every item in exactly one group. If something doesn't fit, put it under "Other" rather than forcing it.

Items: [paste]` },
    ],
    pass: "**Before you use any answer:** Is every fact from me? Did it answer what was actually asked? Would a mistake here matter?",
    kit: { name: "AI workflows that save time", heading: "Want more jobs like these, ready for your week?", body: "Liked it? The *AI workflows that save time* kit gives you 10 more jobs like these, ready for your week." },
  },
  {
    slug: "which-ai-tool-for-what",
    seoTitle: "Which AI tool should I use? ChatGPT, Claude, Gemini or Copilot",
    seoDescription: "Match the tool to where the work happens: one chat for writing and thinking, the assistant built into your email and files, and a search tool for anything ",
    title: "Stop Paying for Five AI Tools",
    question: "ChatGPT, Claude, Gemini, Copilot... which one is actually worth paying for?",
    answer: "Match the tool to where the work happens: one chat for writing and thinking, the assistant built into your email and files, and a search tool for anything you'll quote. Test for a week before you pay.",
    level: "Beginner",
    minutes: 15,
    tool: "ChatGPT, Claude, Gemini, Copilot, Perplexity",
    hero: { title: "Stop paying for", accent: "five AI tools.", line: "Most people need one chat, plus the assistant already inside their work apps. Here's how to tell which.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/which-ai-tool-for-what.webp", alt: "The blue robot mascot choosing one tool from a row of brass instruments under glass" } },
    leaveWith: "a side-by-side test for choosing your main chat, a check for the assistant in your work apps, a research prompt that forces sources, and a 7-day keep-or-cancel rule.",
    howTo: "Start with job 1 in the free versions. Only look at paid plans after the 7-day test at the end.",
    sections: [
      { title: "Job 1: Choose your everyday chat", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "drafting, rewriting, thinking a problem through." }, { label: "Why this test", text: "the only fair comparison is the same task, with the same words, in both tools." }] },
        { kind: "example", label: "The test", text: "Paste the same rough paragraph into ChatGPT and Claude with the same prompt." },
        { kind: "result", label: "What a good result looks like", lines: ["The one that kept your meaning, needed fewer fixes and sounded more like you. That's your main chat."] },
        { kind: "locked", label: "The side-by-side test prompt", prompt: 0 },
      ] },
      { title: "Job 2: Use the assistant already in your work apps", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "summarising an email thread or a shared document." }, { label: "Why this tool", text: "if your work lives in Outlook and Teams, Copilot can see it (if your company allows it). If it lives in Gmail and Docs, Gemini can. Pasting work into a separate chat is slower and riskier." }] },
        { kind: "example", label: "The test", text: "One long email thread you already know well." },
        { kind: "result", label: "What a good result looks like", lines: ["It gets the decision and the next step right, and links back to the emails it used."] },
        { kind: "locked", label: "The thread summary prompt", prompt: 1 },
      ] },
      { title: "Job 3: Research you'll repeat to someone", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "a fact you'll quote in a meeting, a post or to a client." }, { label: "Why this tool", text: "it shows the source links, so you can open them and check." }] },
        { kind: "example", label: "The test", text: "One question you already know the answer to." },
        { kind: "result", label: "What a good result looks like", lines: ["Every claim has a link, and the links say what it claims."] },
        { kind: "locked", label: "The sourced research prompt", prompt: 2 },
      ] },
    ],
    honest: "A new subscription won't fix a vague request. Pay only for the tool you've used at least 3 times in the last week, and cancel the rest.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The side-by-side test prompt (paste the same one into both tools)", text: `Rewrite this paragraph so it's clearer and shorter, in my voice. Keep every fact. Don't add anything new.

Then tell me in one line what you changed.

Paragraph: [paste something you wrote]` },
      { title: "Job 2: The thread summary prompt", text: `Summarise this email thread for me:
1. What was decided (and who decided it).
2. What's still open.
3. What I need to do next, and by when.

Link to the email each point came from. If something isn't clear in the thread, say so.` },
      { title: "Job 3: The sourced research prompt", text: `[Your question]

Answer in 5 bullet points or fewer. Give a source link for every claim. If sources disagree, show both. If you can't find a reliable source, say so rather than guessing.` },
    ],
    pass: "**The 7-day keep-or-cancel rule:** used it 3 times or more · it saved you time each time · you trusted the result after checking. Three yeses: keep it. Anything else: cancel.",
    kit: { name: "AI workflows that save time", heading: "Want more jobs like these, ready for your week?", body: "The *AI workflows that save time* kit has a setup card for each of these tools, showing where to click." },
  },
  {
    slug: "ai-skills-worth-learning-for-work",
    seoTitle: "What AI skills should I learn for work?",
    seoDescription: "Nobody can promise what AI will change.",
    title: "3 AI Skills to Practise at Work This Week",
    question: "Is AI coming for my job? And what should I actually learn?",
    answer: "Nobody can promise what AI will change. What makes you valuable is the part AI can't do alone: briefing it well, catching its mistakes and deciding what stays human. Practise those three on real work.",
    level: "Beginner",
    minutes: 20,
    tool: "Any AI tool",
    hero: { title: "3 AI skills to practise", accent: "at work this week.", line: "Not tools, not tricks. Three habits that make your AI work better than your colleagues', whatever tool you use.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/ai-skills-worth-learning-for-work.webp", alt: "The blue robot mascot carrying a compass, magnifier, key and gauge past changing machines" } },
    leaveWith: "3 skills with a 10-minute exercise each, a prompt for each exercise, and a way to show the result to your manager.",
    howTo: "Pick one task you do every week. Use it for all three exercises, so you can see the difference each skill makes.",
    sections: [
      { title: "Skill 1: Brief it", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The skill", text: "turning a vague request into a clear brief." }, { label: "Why it matters", text: "most bad AI answers come from a thin request. The fix is to let the AI ask what it needs to know." }] },
        { kind: "example", label: "The vague request", text: "Write a LinkedIn post about our new service." },
        { kind: "result", label: "What a good brief looks like", lines: ["Who it's for · the one problem it solves · one real example · the tone · the length · what not to say."] },
        { kind: "locked", label: "The \"interview me first\" prompt", prompt: 0 },
      ] },
      { title: "Skill 2: Check it", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The skill", text: "spotting what's wrong in an answer that sounds right." }, { label: "Why it matters", text: "this is the skill managers notice. Anyone can get an AI draft; few people check it properly." }] },
        { kind: "example", label: "The AI answer", text: "The report shows sales rose 12% in March, driven mainly by the new pricing." },
        { kind: "result", label: "What checking finds", lines: ["The report says 8%, and never mentions pricing as the reason."] },
        { kind: "locked", label: "The fact-check prompt", prompt: 1 },
      ] },
      { title: "Skill 3: Own it", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The skill", text: "splitting a task into what AI can draft and what you must decide." }, { label: "Why it matters", text: "judgement, relationships and responsibility stay with you. Being clear about that is what makes you trusted." }] },
        { kind: "example", label: "The task", text: "Reply to an unhappy client about a late delivery." },
        { kind: "result", label: "A good split", lines: ["AI drafts the apology and the timeline · you decide the offer, the tone with this client, and whether to call instead."] },
        { kind: "locked", label: "The task-split prompt", prompt: 2 },
      ] },
    ],
    honest: "No course or certificate protects a job. Being the person who knows what good looks like, and can prove the AI's work is right, does.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Skill 1: The \"interview me first\" prompt", text: `I need [what you want, for example a LinkedIn post about our new service].

Before you write anything, ask me up to 5 questions you need answered to do this well. Ask them one at a time and wait for my answer each time. Then write it.` },
      { title: "Skill 2: The fact-check prompt", text: `Check this answer against the source I've pasted.

For each claim, tell me: supported (quote the source) · not supported · contradicted. Be strict. If the source doesn't say it, it's not supported.

Answer: [paste the AI's answer]
Source: [paste the original]` },
      { title: "Skill 3: The task-split prompt", text: `Here's a task: [describe it].

Split it into two lists:
1. What AI could draft or prepare for me.
2. What I should decide or do myself, and why.

Be honest about the parts where getting it wrong would hurt a relationship, cost money or break a rule.` },
    ],
    pass: "**Show your manager:** one before-and-after from this week. The vague request vs. the brief, or the mistake you caught.",
    kit: { name: "AI for your career and job search", heading: "Want the full career toolkit?", body: "The *AI for your career and job search* kit (coming soon) has CV, LinkedIn, interview and pay-rise prompts, including the Profile Insight Report." },
  },
  {
    slug: "chatgpt-customer-research-with-evidence",
    seoTitle: "How to analyse customer feedback with ChatGPT",
    seoDescription: "Don't ask AI for \"insights\". Ask it to group the comments, show which customers said what, and flag where they disagree. Then decide yourself what to fix.",
    title: "Turn 50 Customer Comments Into 3 Decisions",
    question: "I have pages of customer feedback and no time to read it all.",
    answer: "Don't ask AI for \"insights\". Ask it to group the comments, show which customers said what, and flag where they disagree. Then decide yourself what to fix.",
    level: "Intermediate",
    minutes: 20,
    tool: "ChatGPT",
    hero: { title: "Turn 50 customer comments", accent: "into 3 decisions.", line: "Clean the notes, find the patterns with proof, and leave with what to fix first.", tool: "ChatGPT", art: { kind: "scene", src: "/images/guides/chatgpt-customer-research-with-evidence.webp", alt: "The blue robot mascot sorting customer notes into labelled evidence trays" } },
    leaveWith: "a prompt that cleans private details out of your notes, a theme table where every claim has a quote, and a prompt that turns the table into your next 3 actions.",
    howTo: "Try it first with the 8 example comments below. Then run it on your own feedback, cleaned first.",
    sections: [
      { title: "Job 1: Clean the notes", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "removing names, emails and company names from feedback." }, { label: "Why it matters", text: "you can't un-share personal data, and you don't need it to find patterns." }] },
        { kind: "example", label: "Before", text: "Sarah Klein (sarah@studio-k.com) said the onboarding call was too rushed." },
        { kind: "result", label: "After", lines: ["\"C03: the onboarding call was too rushed.\""] },
        { kind: "locked", label: "The clean-up prompt", prompt: 0 },
      ] },
      { title: "Job 2: Find the patterns, with proof", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "grouping comments into themes you can defend." }, { label: "Why it matters", text: "a theme without quotes is an opinion. With quotes and customer IDs, it's evidence." }] },
        { kind: "example", label: "The comments", text: "C01 \"Setup took me a week\" · C02 \"Loved the templates\" · C03 \"Onboarding call was rushed\" · C04 \"Couldn't find the invoice\" · C05 \"Setup was confusing\" · C06 \"Templates saved me hours\" · C07 \"Billing page is a maze\" · C08 \"Wish there were video guides" },
        { kind: "result", label: "What a good answer looks like", lines: ["Setup is hard (C01, C03, C05) · Templates are loved (C02, C06) · Billing is hard to find (C04, C07) · Early signal: video guides (C08 only)."] },
        { kind: "locked", label: "The theme table prompt", prompt: 1 },
      ] },
      { title: "Job 3: From themes to decisions", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "choosing what to act on." }, { label: "Why it matters", text: "a table doesn't decide for you. This step turns it into 3 actions and 3 questions." }] },
        { kind: "example", label: "What a good answer looks like", text: "1. Fix setup first (3 customers) · 2. Make the invoice easy to find (2) · 3. Keep promoting templates (2) · Ask next: \"Where exactly did setup slow you down?\"" },
        { kind: "locked", label: "The decision prompt", prompt: 2 },
      ] },
    ],
    honest: "Eight or even fifty comments are not \"all your customers\". And two people using the same word don't always mean the same problem. Read the quotes before you act.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The clean-up prompt", text: `Remove all personal details from these notes. Replace each person with an ID (C01, C02...) and keep the same ID every time they appear. Remove emails, phone numbers and company names. Don't change anything else.

Notes: [paste]` },
      { title: "Job 2: The theme table prompt", text: `Group these customer comments into themes.

For each theme: a short name · the customer IDs · 2 quotes from different customers · anyone who says the opposite.

A theme needs at least 2 customers. Put single comments under "Early signals". Keep complaints, praise and feature requests apart.

Comments: [paste]` },
      { title: "Job 3: The decision prompt", text: `From this theme table, suggest:
1. The 3 things to act on first, and why (based on how many customers and how serious it is).
2. The 3 questions we should ask customers next.

Only use what's in the table. Don't claim this represents all our customers.

Table: [paste]` },
    ],
    pass: "**Before you act:** open two quotes per theme in your original notes. If you can't find them, drop the theme.",
    kit: { name: "AI workflows that save time", heading: "Want more jobs like these, ready for your week?", body: "This is workflow 7 in the *AI workflows that save time* kit, with a ready spreadsheet for your feedback." },
  },
  {
    slug: "show-up-in-ai-search",
    seoTitle: "How to show up when people ask ChatGPT for a business like mine",
    seoDescription: "You can't buy your way into AI answers.",
    title: "Find Out What ChatGPT Says About Your Business",
    question: "When people ask ChatGPT for someone like me, I don't show up.",
    answer: "You can't buy your way into AI answers. You can check what AI finds today, fix the facts it gets wrong or can't find, and make your own pages say clearly who you help and how.",
    level: "Beginner",
    minutes: 20,
    tool: "ChatGPT, Gemini or Perplexity",
    hero: { title: "Find out what ChatGPT says", accent: "about your business.", line: "Search like a client, see what AI knows about you, then fix the one page that matters most.", tool: "AI search", art: { kind: "scene", src: "/images/guides/show-up-in-ai-search.webp", alt: "The blue robot mascot placing a clearly labelled sign where a searchlight can find it" } },
    leaveWith: "a client-style search to run every month, a check on what AI can verify about you, and a prompt that rewrites your services page around facts AI can find.",
    howTo: "Do job 1 before you change anything, and save the answer. That's your \"before\".",
    sections: [
      { title: "Job 1: Search like a client", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "seeing who AI recommends for what you do." }, { label: "Why it matters", text: "your clients don't search for your name. They describe their problem." }] },
        { kind: "example", label: "The example", text: "I'm a small café owner in Lyon. I need a bookkeeper who understands French VAT. Who should I compare?" },
        { kind: "result", label: "What a good answer shows you", lines: ["Which providers come up, what AI says each one does, and the pages it used."] },
        { kind: "locked", label: "The client search prompt", prompt: 0 },
      ] },
      { title: "Job 2: See what AI knows about you", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "checking what AI can confirm about your business." }, { label: "Why it matters", text: "missing or wrong facts are usually the reason you don't appear." }] },
        { kind: "example", label: "What a good answer looks like", text: "What you do, who for, where, with a link for each fact · plus a list of what it couldn't confirm." },
        { kind: "result", label: "What to look for", lines: ["Anything missing, out of date or contradicted between your website and your profiles."] },
        { kind: "locked", label: "The \"what do you know about me\" prompt", prompt: 1 },
      ] },
      { title: "Job 3: Fix the one page that matters", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "making your services page clear about who you help, what you do and why it's true." }, { label: "Why it matters", text: "clear, checkable facts on your own site are what AI tools can find and repeat." }] },
        { kind: "example", label: "Before", text: "We offer tailored financial solutions for your business needs." },
        { kind: "result", label: "After", lines: ["\"Bookkeeping and VAT returns for cafés and restaurants in Lyon. 40 local clients. Monthly fixed fee.\""] },
        { kind: "locked", label: "The services page prompt", prompt: 2 },
      ] },
    ],
    honest: "No one can promise you'll appear in AI answers, and more AI-written pages won't help. Clear facts, consistent everywhere, are the part you control.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The client search prompt", text: `I'm a [type of customer] in [place]. I need [the problem you solve, in your client's words].

Which providers should I compare? For each one: what they offer, and the public page you're basing that on (with the link). Don't invent reviews or prices.` },
      { title: "Job 2: The \"what do you know about me\" prompt", text: `What can you find about [your business name] in [place]?

List each fact with its source link: what we do, who for, where, prices if public. Then list what you couldn't find or confirm, and anything that looks out of date or contradictory.` },
      { title: "Job 3: The services page prompt", text: `Rewrite my services page using only these facts:
- Who I help: [type of client]
- What I do: [each service in plain words]
- Where: [place or online]
- Proof: [numbers, examples, credentials you can back up]

Start with one sentence a client would search for. Use plain words, no buzzwords. Don't add any claim that isn't in my facts.` },
    ],
    pass: "**Every month:** run job 1 again, save the answer next to last month's, and fix one missing fact.",
    kit: { name: "AI for small business owners", heading: "Want this for your whole business?", body: "The *AI for small business owners* kit (coming soon) covers the 10 business jobs to hand off first, including your public profile." },
  },
];
