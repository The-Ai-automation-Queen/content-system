// Guides 26 to 35, approved from the rebuilt copy decks (28/09/2026).
// Generated from the approved decks; every hero uses a full mascot scene card.
// Inline marks: **bold**, *italic*, [label](https://link).
import type { BatchGuide } from "./guide-batch-one";

export const batchTwentySixThirtyFiveGuides: readonly BatchGuide[] = [
  {
    slug: "stop-ai-agreeing-with-you",
    seoTitle: "Prompts that stop AI just agreeing with you",
    seoDescription: "AI tools are built to be helpful, and agreeing feels helpful.",
    title: "Stop AI Agreeing With Everything You Say",
    question: "Why does AI always agree with me?",
    answer: "AI tools are built to be helpful, and agreeing feels helpful. Ask for problems before praise, give it a job that includes disagreeing, and set that rule once in your settings.",
    level: "Beginner",
    minutes: 10,
    tool: "ChatGPT, Claude or Gemini",
    hero: { title: "Stop AI agreeing", accent: "with everything you say.", line: "Get honest feedback on your writing, a real stress test for your plans, and a standing rule that switches off the flattery.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/stop-ai-agreeing-with-you.webp", alt: "The blue robot mascot checking pages with a magnifier and a red stamp" } },
    leaveWith: "a feedback prompt that ranks problems first, a plan stress test, and a one-paragraph \"no flattery\" rule for your settings.",
    howTo: "Take something you wrote or planned this week. Run job 1 on it, then job 2. Set up job 3 once, and every chat after that starts honest.",
    sections: [
      { title: "Job 1: Feedback that starts with the problems", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "real feedback on a draft: an email, a proposal, a post." }, { label: "Why it works", text: "when you ask \"is this good?\", the easy answer is yes. Asking for the 3 biggest problems first, ranked, gives it a job where agreeing doesn't count." }] },
        { kind: "example", label: "Your draft", text: "A 200-word proposal to a new client." },
        { kind: "result", label: "What a good answer looks like", lines: ["\"1. The price appears before the benefit. 2. Two paragraphs say the same thing. 3. No clear next step.\" Each with the line it's about. One strength at the end, not the start."] },
        { kind: "locked", label: "The problems-first prompt", prompt: 0 },
      ] },
      { title: "Job 2: Stress-test a plan", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "a plan you're about to commit time or money to." }, { label: "Why it works", text: "imagining the plan has already failed makes it easier to name the reasons. You get risks you can act on instead of encouragement." }] },
        { kind: "example", label: "The plan", text: "Run a paid workshop in 6 weeks, promoted only on Instagram." },
        { kind: "result", label: "What a good answer looks like", lines: ["The 4 most likely reasons it didn't work (too little time to fill seats, one channel only, no price tested, no reminder emails), and one early sign for each that you'd see by week 2."] },
        { kind: "locked", label: "The stress-test prompt", prompt: 1 },
      ] },
      { title: "Job 3: Switch off the flattery for good", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "stopping every future chat from opening with \"Great question!\"" }, { label: "Why it works", text: "most AI tools let you save standing instructions. Put your honesty rule there once, instead of typing it every time." }] },
        { kind: "example", label: "Where it goes", text: "ChatGPT custom instructions, Claude's personal preferences, Gemini saved info." },
        { kind: "result", label: "What changes", lines: ["Answers start with the point, disagree when you're wrong, and say \"I'm not sure\" instead of guessing."] },
        { kind: "locked", label: "The no-flattery rule", prompt: 2 },
      ] },
    ],
    honest: "An honest AI is still not a person who knows your clients, your team or your history. Use it to find the weak spots, then decide with people who do.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The problems-first prompt", text: `Give me feedback on this [email / proposal / post] for [who will read it].

Start with the 3 biggest problems, most serious first. For each one, quote the line and say why it's a problem for this reader.

Then give me one thing that works. Don't rewrite it, and don't soften the problems.

Draft: [paste]` },
      { title: "Job 2: The stress-test prompt", text: `Here's my plan: [describe it in 3 to 5 lines].

Imagine it's [3 months] from now and the plan didn't work. Give me the 4 most likely reasons, most likely first.

For each reason, tell me the early warning sign I'd notice in the first [2 weeks], and one change I could make now to prevent it.` },
      { title: "Job 3: The no-flattery rule (paste into your AI's settings)", text: `Be direct with me. Skip compliments and start with the answer.

If I'm wrong, or my plan has a weak spot, say so plainly and explain why. If you're not sure about something, say "I'm not sure" rather than guessing.

When I ask for feedback, give me the problems first.` },
    ],
    pass: "**Before you act on the feedback:** do the problems match what you know about the reader? Would a trusted colleague agree?",
    kit: { name: "Use AI safely at work", heading: "Want your whole team checking AI the same way?", body: "The *Use AI safely at work* kit includes team guidelines for checking AI output before it goes out." },
  },
  {
    slug: "catch-ai-making-things-up",
    seoTitle: "Why AI gets things wrong and how to catch it",
    seoDescription: "Trust it like a fast new colleague: useful, but check before it goes out under your name.",
    title: "Catch AI Making Things Up in 30 Seconds",
    question: "Can I trust what AI tells me?",
    answer: "Trust it like a fast new colleague: useful, but check before it goes out under your name. Three 10-second checks catch most mistakes before anyone else sees them.",
    level: "Beginner",
    minutes: 10,
    tool: "Any AI chat",
    hero: { title: "Catch AI making things up", accent: "in 30 seconds.", line: "Three quick checks for the three places AI mistakes hide: numbers and names, sources, and the bits it's least sure of.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/catch-ai-making-things-up.webp", alt: "The blue robot mascot measuring a printed list and marking the wrong lines in red" } },
    leaveWith: "3 checks you can run on any answer, a prompt for each, and a rule for when to check by hand.",
    howTo: "Take an AI answer you were about to use today. Run the three checks on it, in order. Each one takes about 10 seconds.",
    sections: [
      { title: "Check 1: Names, numbers and dates", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The check", text: "pull out every specific detail and mark where it came from." }, { label: "Why it works", text: "a made-up detail looks exactly like a real one. Listing them separately makes each one easy to check." }] },
        { kind: "example", label: "The AI answer", text: "The event is on 14 March at the Riverside Hall, and 120 people have signed up." },
        { kind: "result", label: "What a good check looks like", lines: ["14 March · from your notes · 120 people · not in anything you gave it. That second one is your problem."] },
        { kind: "locked", label: "The details check prompt", prompt: 0 },
      ] },
      { title: "Check 2: Open the source", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The check", text: "click the link and find the sentence that supports the claim." }, { label: "Why it works", text: "AI can give a real link that says something different, or a link that doesn't exist. Only opening it tells you." }] },
        { kind: "example", label: "The claim", text: "Most small businesses now use AI for marketing,\" with a link." },
        { kind: "result", label: "What checking finds", lines: ["The page exists, but it's about large companies in one country. The claim goes beyond the source, so it stays out or gets rewritten."] },
        { kind: "locked", label: "The source check prompt", prompt: 1 },
      ] },
      { title: "Check 3: Ask where it's least sure", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The check", text: "ask the AI to mark its own weak spots." }, { label: "Why it works", text: "asked directly, AI tools will often flag which parts are guesses. It doesn't catch everything, but it tells you where to look first." }] },
        { kind: "example", label: "Your question", text: "Which parts of your last answer are you least sure about?" },
        { kind: "result", label: "What a good answer looks like", lines: ["\"The date of the rule change and the second statistic. I'd check both.\" Now you know what to check by hand."] },
        { kind: "locked", label: "The confidence check prompt", prompt: 2 },
      ] },
    ],
    honest: "None of these checks makes an answer true. For anything legal, medical, financial or going to a client, check the original source yourself, every time.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Check 1: The details check prompt", text: `List every name, number, date and place in your last answer.

For each one, tell me where it came from: something I gave you, a source you can link to, or your general knowledge. If you can't say, write "Unsure".` },
      { title: "Check 2: The source check prompt", text: `For each claim in your last answer that has a source, give me the exact sentence from that source that supports it.

If the source only partly supports the claim, say so. If you can't find the sentence, tell me to remove the claim.` },
      { title: "Check 3: The confidence check prompt", text: `Which parts of your last answer are you least sure about? List up to 3, and say what I should check to confirm each one.` },
    ],
    pass: "**The by-hand rule:** if a mistake would cost money, trust or a relationship, check the original yourself. The AI's own check is not enough.",
    kit: { name: "Use AI safely at work", heading: "Want your whole team checking AI the same way?", body: "The *Use AI safely at work* kit has a one-page checking routine your whole team can use." },
  },
  {
    slug: "ai-quit-or-stay-decision",
    seoTitle: "How to use AI to decide if you should quit your job",
    seoDescription: "AI can't decide for you, and it tends to agree with however you ask.",
    title: "Make a Quit-or-Stay Decision With 5 AI Advisors",
    question: "Should I quit my job? Can AI help me think it through?",
    answer: "AI can't decide for you, and it tends to agree with however you ask. It can help if you describe both options equally, ask five advisors with different jobs to weigh in, and turn the result into a small test.",
    level: "Beginner",
    minutes: 20,
    tool: "ChatGPT, Claude or Gemini",
    hero: { title: "Make a quit-or-stay decision", accent: "with 5 AI advisors.", line: "Describe both options fairly, hear five very different advisors, and test the decision before you hand in any notice.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/ai-quit-or-stay-decision.webp", alt: "The blue robot mascot weighing two options on a brass balance between two presses" } },
    leaveWith: "a fair way to describe your decision, a 5-advisor prompt, and a 30-day test that gives you real evidence before you decide.",
    howTo: "Do job 1 on paper first. Leave out your employer's name and anything confidential. Then run jobs 2 and 3 in the same chat.",
    sections: [
      { title: "Job 1: Describe both options fairly", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "writing the decision down so it doesn't lean one way." }, { label: "Why it works", text: "\"I'm miserable and thinking of leaving\" already contains the answer. Two equal descriptions, with the good and bad of each, give the AI nothing to agree with." }] },
        { kind: "example", label: "Leaning", text: "I hate my job and want to go freelance. Should I?" },
        { kind: "result", label: "Fair", lines: ["\"Option A: stay. Steady salary, good team, no growth for 2 years. Option B: freelance. More control, 4 months of savings, two possible first clients.\""] },
        { kind: "locked", label: "The fair description prompt", prompt: 0 },
      ] },
      { title: "Job 2: Hear 5 advisors", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "looking at the decision from five angles you'd normally mix together." }, { label: "Why it works", text: "one answer blends hope, fear and money into one paragraph. Five advisors keep them apart, and one of them is required to argue against you." }] },
        { kind: "example", label: "The 5 advisors", text: "The Bank Balance (runway and the worst month) · The Tuesday Test (what an ordinary day looks like in each option) · The Hiring Manager (how each choice looks on your CV in 3 years) · The Person Who Knows You (what you've said you want before) · The Contrarian (the best case for the option you're leaning against)." },
        { kind: "result", label: "What a good answer looks like", lines: ["Five short, different views, then a summary of where they agree, where they clash, and what you'd need to know to decide."] },
        { kind: "locked", label: "The 5-advisor prompt", prompt: 1 },
      ] },
      { title: "Job 3: Test before you decide", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "turning the advice into something you can try without quitting yet." }, { label: "Why it works", text: "a small test gives you facts instead of feelings: can you win a client, do you enjoy the work, does the money add up?" }] },
        { kind: "example", label: "A test", text: "Land one paid freelance project on evenings and weekends in the next 30 days." },
        { kind: "result", label: "What a good test looks like", lines: ["One clear goal, a date, and the result that would change your mind agreed in advance (\"no paid project in 30 days means I stay and try again in the spring\")."] },
        { kind: "locked", label: "The 30-day test prompt", prompt: 2 },
      ] },
    ],
    honest: "This is your life and your money. Use the advisors to see the decision clearly, then talk it through with someone who knows you, and with a qualified adviser for anything about tax, contracts or benefits.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The fair description prompt", text: `I'm deciding between two options. Help me describe them fairly before we discuss anything.

Option A: [describe]
Option B: [describe]

Rewrite both in the same format: what I gain · what I give up · what I don't know yet. Remove any wording that makes one sound better. Don't give me your opinion yet.` },
      { title: "Job 2: The 5-advisor prompt", text: `Now look at my decision as 5 different advisors. Keep each view under 80 words.

1. The Bank Balance: my money, my runway and the worst month I could face.
2. The Tuesday Test: what an ordinary day would look like in each option.
3. The Hiring Manager: how each choice would look on my CV in 3 years.
4. The Person Who Knows Me: what I've told you matters to me.
5. The Contrarian: the strongest case for the option I seem to be leaning against.

Then summarise: where they agree, where they clash, and the 2 facts I'd need to decide.` },
      { title: "Job 3: The 30-day test prompt", text: `Based on this, design a 30-day test I can run without quitting.

Give me: one clear goal · the steps, week by week · how much time it needs each week · the result that would tell me to stay, and the result that would tell me to go.

Keep it realistic for someone with a full-time job.` },
    ],
    pass: "**Before you decide:** both options described fairly · the Contrarian taken seriously · a real test result, not just a feeling.",
    kit: { name: "AI for your career and job search", heading: "Want the full career toolkit?", body: "The *AI for your career and job search* kit (coming soon) has CV, LinkedIn, interview and pay-rise prompts." },
  },
  {
    slug: "is-ai-coming-for-my-job",
    seoTitle: "Will AI replace my job?",
    seoDescription: "AI changes tasks, not whole jobs, at least at first.",
    title: "Check How Exposed Your Job Is to AI in 5 Minutes",
    question: "Is AI coming for my job?",
    answer: "AI changes tasks, not whole jobs, at least at first. List what you actually do each week, sort each task honestly, and put your energy into the parts that need you.",
    level: "Beginner",
    minutes: 15,
    tool: "ChatGPT, Claude or Gemini",
    hero: { title: "Check how exposed your job is", accent: "to AI, in 5 minutes.", line: "Not a scary score. A task-by-task look at your real week, and the one skill to build next.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/is-ai-coming-for-my-job.webp", alt: "The blue robot mascot sorting cards on a conveyor past a gauge and a stop sign" } },
    leaveWith: "a list of your real tasks, an honest sort of what AI can and can't take on, and a 90-day plan for the one skill that matters most.",
    howTo: "Look at last week's calendar and sent emails before you start. Describe your work in general terms, with no company or client names.",
    sections: [
      { title: "Job 1: List what you really do", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "turning \"I'm a marketing coordinator\" into the 10 tasks that fill your week." }, { label: "Why it works", text: "a job title tells AI nothing. Tasks, with the hours each one takes, show where change would actually land." }] },
        { kind: "example", label: "The title", text: "Office manager." },
        { kind: "result", label: "The real week", lines: ["Supplier emails (5 hrs) · booking rooms and travel (3 hrs) · onboarding new starters (4 hrs) · handling complaints (2 hrs) · monthly budget report (3 hrs)."] },
        { kind: "locked", label: "The task list prompt", prompt: 0 },
      ] },
      { title: "Job 2: Sort each task honestly", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "placing each task in one of three groups, with a reason." }, { label: "Why it works", text: "three plain groups are more useful than a single risk score. They show what to hand over, what to speed up and what to protect." }] },
        { kind: "example", label: "AI can draft it", text: "Supplier emails, the first version of the budget report." },
        { kind: "result", label: "AI can help, you lead", lines: ["Onboarding plans, travel bookings."] },
        { kind: "p", text: "**Stays with you:** handling complaints, knowing which supplier to call when it goes wrong." },
        { kind: "locked", label: "The task sort prompt", prompt: 1 },
      ] },
      { title: "Job 3: Pick one skill for the next 90 days", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "choosing where to put your learning time." }, { label: "Why it works", text: "one skill, practised on real work, beats a pile of courses. Build it where the \"stays with you\" tasks and your AI use meet." }] },
        { kind: "example", label: "The skill", text: "Using AI to draft the budget report, then being the person who explains it to leadership." },
        { kind: "result", label: "What a good plan looks like", lines: ["One skill, 3 monthly steps, and one piece of proof to show your manager at the end."] },
        { kind: "locked", label: "The 90-day skill prompt", prompt: 2 },
      ] },
    ],
    honest: "Nobody can tell you exactly how your job will change, and any tool that gives you a precise score is guessing. What you can control is how well you use AI on your own work, and how clearly you can show the value of the parts only you do.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The task list prompt", text: `Help me list the tasks in my job. My role: [general job title and sector, no company names].

Ask me up to 5 questions about my typical week, one at a time. Then list my 8 to 10 main tasks, with roughly how many hours a week each one takes.` },
      { title: "Job 2: The task sort prompt", text: `Sort each task into one of 3 groups:
1. AI can draft it (I check it).
2. AI can help, but I lead.
3. Stays with me.

For each task, give a one-line reason. Be realistic about what today's AI tools can do. If it depends on my company's rules or tools, say so. Don't give me a risk score.` },
      { title: "Job 3: The 90-day skill prompt", text: `Looking at my "stays with me" tasks and the tasks AI can help with, suggest the one skill that would make me most valuable in my role.

Give me a 90-day plan: one step per month, using my real work, not a course. End with one piece of proof I could show my manager.` },
    ],
    pass: "**Before you trust the sort:** would your manager agree with the \"stays with me\" list? Anything you're unsure about, test with AI on a real task this week.",
    kit: { name: "AI for your career and job search", heading: "Want the full career toolkit?", body: "The *AI for your career and job search* kit (coming soon) turns this into CV, LinkedIn and interview prompts." },
  },
  {
    slug: "test-business-idea-with-ai",
    seoTitle: "How to test a business idea with AI",
    seoDescription: "Asking AI \"is this a good idea?\" gets you encouragement.",
    title: "Put Your Business Idea in Front of 5 AI Critics",
    question: "Is my business idea any good?",
    answer: "Asking AI \"is this a good idea?\" gets you encouragement. Ask five critics with different jobs to find the problems, then let real people answer the only question that counts: will they pay?",
    level: "Beginner",
    minutes: 20,
    tool: "ChatGPT, Claude or Gemini",
    hero: { title: "Put your business idea", accent: "in front of 5 AI critics.", line: "Write the idea down in one paragraph, let five critics find the holes, and run a one-week test before you spend anything.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/test-business-idea-with-ai.webp", alt: "The blue robot mascot stamping a row of idea cards with ticks and crosses" } },
    leaveWith: "a one-paragraph idea brief, a 5-critic prompt, and a one-week demand test with the pass mark set in advance.",
    howTo: "Write your idea in one paragraph before you open any AI. If you can't, that's the first thing to fix.",
    sections: [
      { title: "Job 1: The one-paragraph brief", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "putting the idea into a form a critic can judge." }, { label: "Why it works", text: "a vague idea gets vague feedback. Four clear lines give the critics something to push against." }] },
        { kind: "example", label: "Vague", text: "Something to help older people with technology." },
        { kind: "result", label: "Clear", lines: ["\"A one-hour home visit that sets up a new smartphone for someone over 70: contacts, photos, video calls. For their grown-up children who live too far away to help. Because the phone was a gift and it's still in the box. A fixed price per visit.\""] },
        { kind: "locked", label: "The idea brief prompt", prompt: 0 },
      ] },
      { title: "Job 2: Five critics", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "finding the weak spots while changing the idea is still free." }, { label: "Why it works", text: "each critic has one narrow job, so nobody can hide behind \"overall it's promising\"." }] },
        { kind: "example", label: "The 5 critics", text: "The Stranger (would someone who's never met you care?) · The Rival (what do people already use instead?) · The Accountant (does the price cover your time?) · Month-6 You (what will be hard once the excitement goes?) · The Sceptical Friend (the one question you're avoiding)." },
        { kind: "result", label: "What a good answer looks like", lines: ["2 sharp points from each critic, then the 3 problems that matter most, ranked."] },
        { kind: "locked", label: "The 5-critic prompt", prompt: 1 },
      ] },
      { title: "Job 3: A one-week demand test", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "finding out whether anyone will say yes, before you build anything." }, { label: "Why it works", text: "AI can only guess what customers will do. A simple offer to real people gives you an answer." }] },
        { kind: "example", label: "The test", text: "Message 20 people with a parent over 70, describe the offer in 3 lines, and ask if they'd book a visit." },
        { kind: "result", label: "Pass mark, set before you start", lines: ["3 people say yes and agree a date. Fewer than 3: change the idea, not the pass mark."] },
        { kind: "locked", label: "The demand test prompt", prompt: 2 },
      ] },
    ],
    honest: "AI critics have never run your business, met your customers or seen your market up close. Use them to find questions, then answer those questions with real people.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The idea brief prompt", text: `Help me turn my business idea into a one-paragraph brief with 4 parts:
Who it's for · What they get · Why they need it now · Roughly what it costs them.

Ask me questions one at a time until each part is specific. Don't tell me whether the idea is good.

My idea: [describe it in your own words]` },
      { title: "Job 2: The 5-critic prompt", text: `Review my business idea as 5 critics. Give 2 sharp points from each. No encouragement.

1. The Stranger: would someone who's never met me care?
2. The Rival: what do people already use or do instead?
3. The Accountant: does the price cover my time and costs?
4. Month-6 Me: what will be hard once the excitement wears off?
5. The Sceptical Friend: what's the question I'm avoiding?

Then rank the 3 problems that matter most.

My brief: [paste]` },
      { title: "Job 3: The demand test prompt", text: `Design a one-week test of my idea that costs nothing and involves real people.

Give me: who to contact and how many · a 3-line message describing the offer · the question to ask · a pass mark I should set before I start.

Don't suggest building a website, an app or anything else first.` },
    ],
    pass: "**Before you build anything:** the brief is clear · the top 3 problems have an answer · real people said yes.",
    kit: { name: "AI for small business owners", heading: "Want this for your whole business?", body: "The *AI for small business owners* kit (coming soon) has prompts for offers, pricing, customer messages and weekly admin." },
  },
  {
    slug: "weekend-projects-with-claude",
    seoTitle: "Simple things you can build with Claude in a weekend",
    seoDescription: "Claude can build small interactive tools, with buttons and lists you can click, straight from a description.",
    title: "Weekend Projects: 7 Useful Things Claude Can Build",
    question: "What can I actually build with Claude on a free weekend?",
    answer: "Claude can build small interactive tools, with buttons and lists you can click, straight from a description. Start with three for your home, then try the four after sign-up.",
    level: "Beginner",
    minutes: 20,
    tool: "Claude (artifacts)",
    hero: { title: "Weekend projects:", accent: "7 useful things Claude can build.", line: "Small tools for real life, each built from a single description. Nothing to install, and nothing private inside.", tool: "Claude", art: { kind: "scene", src: "/images/guides/weekend-projects-with-claude.webp", alt: "The blue robot mascot building a small machine from gears, a drawer and a horn" } },
    leaveWith: "7 build prompts for everyday tools, the one follow-up that fixes most first versions, and what not to put inside them.",
    howTo: "Open Claude and paste one build prompt. Claude builds the tool in the chat. Try it, then ask for one change at a time.",
    sections: [
      { title: "Build 1: The family chore rota", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The build", text: "a weekly chore chart that rotates jobs between people." }, { label: "Why it's a good first build", text: "simple lists and buttons, and you'll know straight away if it works." }] },
        { kind: "example", label: "You describe", text: "4 people · 6 chores · jobs rotate each week · tick a job when it's done." },
        { kind: "result", label: "What a good first version looks like", lines: ["This week's chart with names and chores, a Done button on each, and a \"Next week\" button that moves everyone along one job."] },
        { kind: "locked", label: "The chore rota prompt", prompt: 0 },
      ] },
      { title: "Build 2: The renewal calendar", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The build", text: "a list of subscriptions and renewals, sorted by date, with the next 30 days highlighted." }, { label: "Why it's useful", text: "the insurance, the domain, the streaming service. All in one place, soonest first." }] },
        { kind: "example", label: "You add", text: "Name · cost · how often · next renewal date." },
        { kind: "result", label: "What a good first version looks like", lines: ["A sorted list, anything renewing within 30 days in a different colour, and a yearly total at the top."] },
        { kind: "locked", label: "The renewal calendar prompt", prompt: 1 },
      ] },
      { title: "Build 3: The gift and birthday planner", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The build", text: "a list of people, dates and gift ideas you jot down through the year." }, { label: "Why it's useful", text: "the best gift ideas come in March, and the birthday is in November." }] },
        { kind: "example", label: "You add", text: "Name · birthday · budget · ideas as they come." },
        { kind: "result", label: "What a good first version looks like", lines: ["The next 3 birthdays at the top, a place to add ideas under each person, and a \"bought\" tick."] },
        { kind: "locked", label: "The gift planner prompt", prompt: 2 },
      ] },
    ],
    honest: "These are handy personal tools, not secure apps. Don't put bank details, passwords, health information or anyone's address into them, and check whether your tool keeps its data before you rely on it.",
    gate: { promise: "7 prompts.", action: "Unlock" },
    prompts: [
      { title: "Build 1: The chore rota prompt", text: `Build me a simple interactive weekly chore rota as a single page.

People: [names]
Chores: [list]

- Show this week's chart: each person with their chore.
- A "Done" button next to each chore.
- A "Next week" button that moves everyone to the next chore on the list.

Keep it clean and easy to read on a phone. Don't connect to any outside website.` },
      { title: "Build 2: The renewal calendar prompt", text: `Build me an interactive renewal calendar as a single page.

For each item I can add: name · cost · how often (monthly / yearly) · next renewal date.

- Sort by next renewal date, soonest first.
- Highlight anything renewing in the next 30 days.
- Show the total yearly cost at the top.

Include 3 made-up example rows I can delete. Don't connect to any outside website.` },
      { title: "Build 3: The gift planner prompt", text: `Build me an interactive gift and birthday planner as a single page.

For each person: name · birthday (day and month only) · budget · a list of gift ideas I can add to · a "bought" tick.

Show the next 3 birthdays at the top. Include 2 made-up people I can delete. Don't connect to any outside website.` },
      { title: "Build 4: The packing list", text: `Build me a packing list maker as a single page. I choose the trip type (beach / city / work / camping) and the number of nights, and it shows a checklist I can tick off. Let me add my own items to each trip type.` },
      { title: "Build 5: The weekly meal planner", text: `Build me a weekly meal planner as a single page: 7 days, one dinner each. When I fill in the meals, list the ingredients I type for each one as a combined shopping list I can tick off.` },
      { title: "Build 6: The plant care tracker", text: `Build me a plant care tracker as a single page. For each plant: name · how often it needs water · last watered date. Show which plants need water today at the top, with a "Watered" button that updates the date.` },
      { title: "Build 7: The reading log", text: `Build me a reading log for a child as a single page. For each book: title · date finished · a 1 to 5 star rating · one line on what they liked. Show a count of books read this month.` },
    ],
    pass: "**The one follow-up that fixes most first versions:** \"Change one thing: [describe it]. Keep everything else exactly the same.\"",
    kit: { name: "AI workflows that save time", heading: "Want more jobs like these, ready for your week?", body: "The *AI workflows that save time* kit has 10 more everyday jobs, each with a ready prompt." },
  },
  {
    slug: "money-plan-with-ai",
    seoTitle: "How to make a money plan with AI",
    seoDescription: "AI is good at explaining, adding up and organising.",
    title: "Build a Money Plan From Your Payslip With AI",
    question: "Where is my money going, and can AI help me plan?",
    answer: "AI is good at explaining, adding up and organising. Give it your take-home pay and your regular costs (never your account details), and it can help you build a simple plan and check it each month. The decisions stay yours.",
    level: "Beginner",
    minutes: 20,
    tool: "ChatGPT, Claude or Gemini",
    hero: { title: "Build a money plan", accent: "from your payslip, with AI.", line: "Understand every line on your payslip, split what's left into a plan you can live with, and check it once a month.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/money-plan-with-ai.webp", alt: "The blue robot mascot holding a checklist beside a balance of coins and receipts" } },
    leaveWith: "a payslip explainer, a one-page monthly plan, and a 10-minute monthly check-in.",
    howTo: "Have your latest payslip and a list of your regular monthly costs ready. Type the numbers in yourself. Don't upload the payslip: it carries your name, employer and ID numbers.",
    sections: [
      { title: "Job 1: Understand your payslip", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "knowing what each deduction is and why your take-home is what it is." }, { label: "Why it works", text: "payslips use codes and short names. AI can explain each one in plain words, and tell you what to ask your payroll team." }] },
        { kind: "example", label: "What you type", text: "Gross pay 3,000 · Tax 400 · National Insurance 200 · Pension 150 · Net pay 2,250." },
        { kind: "result", label: "What a good answer looks like", lines: ["One plain line per deduction, a check that the numbers add up, and \"ask payroll\" next to anything that looks unusual."] },
        { kind: "locked", label: "The payslip explainer prompt", prompt: 0 },
      ] },
      { title: "Job 2: A one-page monthly plan", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "deciding in advance where your take-home pay goes." }, { label: "Why it works", text: "three simple pots are easier to stick to than twenty categories. AI does the maths; you choose the numbers." }] },
        { kind: "example", label: "What you give it", text: "Take-home 2,250 · rent 900 · bills 250 · travel 120 · goal: an emergency fund." },
        { kind: "result", label: "What a good plan looks like", lines: ["Needs 1,270 · Goals 400 · Everyday spending 580, about 135 a week. One line on the emergency fund: how long to reach 3 months of needs at 400 a month."] },
        { kind: "locked", label: "The monthly plan prompt", prompt: 1 },
      ] },
      { title: "Job 3: The monthly check-in", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "comparing what you planned with what happened." }, { label: "Why it works", text: "a plan you never look at again is a wish. One short check each month shows what to adjust." }] },
        { kind: "example", label: "What you type", text: "Planned vs actual for each pot." },
        { kind: "result", label: "What a good check-in looks like", lines: ["Where you were over or under, the one change for next month, and no judgement."] },
        { kind: "locked", label: "The check-in prompt", prompt: 2 },
      ] },
    ],
    honest: "AI isn't a financial adviser and can get sums wrong. Check the totals once with a calculator. For pensions, debt, tax or investing decisions, speak to a qualified adviser or a free, official money guidance service in your country.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The payslip explainer prompt", text: `Explain my payslip line by line in plain English. I've typed the numbers in myself, with no names or ID numbers. I live in [country].

[Gross pay, each deduction and net pay]

For each deduction, say what it is in one line. Check that the numbers add up. If anything looks unusual, tell me what to ask my payroll team. Don't give me tax advice.` },
      { title: "Job 2: The monthly plan prompt", text: `Help me build a simple monthly plan.

Take-home pay: [amount]
Regular costs: [list with amounts]
My goal: [for example an emergency fund]

Split my pay into 3 pots: Needs · Goals · Everyday spending. Show the sums. Then tell me how many months it would take to reach [my goal amount] at this rate.

Use only my numbers. Ask me if anything is missing.` },
      { title: "Job 3: The check-in prompt", text: `Here's my plan and what actually happened this month.

Planned: [pot amounts]
Actual: [pot amounts]

Show where I was over or under. Suggest one change for next month. Keep it short and practical.` },
    ],
    pass: "**Never type in:** account or card numbers · your employee or tax ID · login details.",
    kit: { name: "AI workflows that save time", heading: "Want more jobs like these, ready for your week?", body: "The *AI workflows that save time* kit has 10 more jobs worth handing to AI, each with a check before you act." },
  },
  {
    slug: "ai-job-interview-practice",
    seoTitle: "How to prepare for a job interview with AI",
    seoDescription: "Nerves drop when you've practised out loud.",
    title: "Rehearse Any Job Interview With AI",
    question: "I have an interview next week and I'm nervous.",
    answer: "Nerves drop when you've practised out loud. AI can read the job ad for what they'll test, act as your interviewer one question at a time, and help you prepare stories that answer most questions.",
    level: "Beginner",
    minutes: 30,
    tool: "ChatGPT, Claude or Gemini (voice mode works well)",
    hero: { title: "Rehearse any job interview", accent: "with AI.", line: "Work out what they'll really test, practise one question at a time, and walk in with five stories ready.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/ai-job-interview-practice.webp", alt: "The blue robot mascot at a brass console with speech bubbles above it" } },
    leaveWith: "a job-ad decoder, a one-question-at-a-time mock interview, and a bank of 5 stories you can adapt on the day.",
    howTo: "Have the job ad open. Do job 1 today, job 3 tomorrow, and job 2 (the mock interview) twice before the day, out loud if you can.",
    sections: [
      { title: "Job 1: Decode the job ad", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "turning a long job ad into the few things the interview will focus on." }, { label: "Why it works", text: "most ads list 15 things but care about 4 or 5. Knowing which ones tells you what to prepare." }] },
        { kind: "example", label: "The ad says", text: "Fast-paced environment · manage multiple stakeholders · excellent written communication · experience with CRM systems · proactive." },
        { kind: "result", label: "What a good decode looks like", lines: ["\"They'll test: juggling competing requests, writing clearly to senior people, and using a CRM. Expect a question about a time priorities clashed.\""] },
        { kind: "locked", label: "The job ad decoder prompt", prompt: 0 },
      ] },
      { title: "Job 2: The mock interview", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "practising answers with feedback before it counts." }, { label: "Why it works", text: "one question, your answer, specific feedback, then the next. It feels like the real thing and you improve as you go." }] },
        { kind: "example", label: "The question", text: "Tell me about a time you had to say no to a senior colleague." },
        { kind: "result", label: "What good feedback looks like", lines: ["\"Clear situation, but you didn't say what you did or how it ended. Add the outcome in one sentence.\" Then the next question."] },
        { kind: "locked", label: "The mock interview prompt", prompt: 1 },
      ] },
      { title: "Job 3: Your 5-story bank", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "preparing a handful of real stories that answer most behavioural questions." }, { label: "Why it works", text: "five well-told stories can cover dozens of questions. You pick the story; AI helps you tell it tightly." }] },
        { kind: "example", label: "Your 5 stories", text: "A problem you solved · a conflict you handled · a mistake you learned from · a time you led · a result you're proud of." },
        { kind: "result", label: "What a good story looks like", lines: ["Under 90 seconds out loud, in four parts: what was happening, what you did, what changed, what you learned."] },
        { kind: "locked", label: "The story bank prompt", prompt: 2 },
      ] },
    ],
    honest: "Practise with AI, but don't memorise its words. Interviewers notice scripted answers. Use your own stories, told in your own way, and check any fact about the company on its own website.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The job ad decoder prompt", text: `Here's a job ad. Tell me the 4 or 5 things this interview will most likely test, in plain words.

For each one, give me a likely interview question and what a strong answer would need to show.

Use only the ad. Don't guess facts about the company.

Job ad: [paste]` },
      { title: "Job 2: The mock interview prompt", text: `Act as the interviewer for this role: [job title]. Ask me the questions from the list we made, one by one, and wait for my answer each time.

After each answer, give me 2 lines of feedback: what worked and the one thing to improve. Then ask the next question.

After 5 questions, give me my strongest answer and the one to practise again.` },
      { title: "Job 3: The story bank prompt", text: `Help me build 5 interview stories: a problem I solved, a conflict I handled, a mistake I learned from, a time I led, and a result I'm proud of.

For each one, ask me questions until you have the details. Then write it in 4 short parts: situation · what I did · what changed · what I learned. Under 150 words each, in my words, not yours.` },
    ],
    pass: "**The morning of:** read your 5 stories once · check the company website for anything new · 3 questions ready to ask them.",
    kit: { name: "AI for your career and job search", heading: "Want the full career toolkit?", body: "The *AI for your career and job search* kit (coming soon) has CV, LinkedIn, interview and pay-rise prompts." },
  },
  {
    slug: "launch-your-product-in-30-days",
    seoTitle: "A 30-day checklist to launch your product",
    seoDescription: "Most products don't launch because they keep growing.",
    title: "The 30-Day Checklist That Gets Your Product Out the Door",
    question: "I keep polishing and never launch.",
    answer: "Most products don't launch because they keep growing. Decide what the first version doesn't include, plan backwards from a fixed date, and let AI do the planning and the Friday check so you can spend your time making.",
    level: "Beginner",
    minutes: 15,
    tool: "ChatGPT, Claude or Gemini",
    hero: { title: "The 30-day checklist that gets your product", accent: "out the door.", line: "Cut the product to its smallest useful version, plan 4 weeks backwards from launch day, and check every Friday what's blocking you.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/launch-your-product-in-30-days.webp", alt: "The blue robot mascot watching a conveyor carry parcels from moon to sun" } },
    leaveWith: "a \"smallest version\" prompt, a 4-week plan built backwards from launch day, and a Friday check that keeps it moving.",
    howTo: "Pick your launch date before you start and write it down. It doesn't move. What goes into the first version can.",
    sections: [
      { title: "Job 1: Cut to the smallest useful version", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "deciding what version 1 is, and what waits for version 2." }, { label: "Why it works", text: "a \"not in version 1\" list is the fastest way to stop polishing. AI is good at spotting what a first customer actually needs." }] },
        { kind: "example", label: "The full idea", text: "An online course with 12 modules, a community, worksheets, a certificate and bonus live calls." },
        { kind: "result", label: "A good version 1", lines: ["3 modules that get one clear result, plus one live call. Out for now: the community, the certificate, 9 modules."] },
        { kind: "locked", label: "The smallest version prompt", prompt: 0 },
      ] },
      { title: "Job 2: Plan backwards from launch day", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "a week-by-week plan that ends on your fixed date." }, { label: "Why it works", text: "starting from the launch date shows what must be done by when. One milestone per week keeps it manageable." }] },
        { kind: "example", label: "Launch date", text: "A Tuesday, 4 weeks from now." },
        { kind: "result", label: "A good plan", lines: ["Week 1 · content outlined and one module made. Week 2 · all 3 modules made. Week 3 · sales page, payment and emails set up. Week 4 · 10 people told, launch. About 45 minutes a day."] },
        { kind: "locked", label: "The backwards plan prompt", prompt: 1 },
      ] },
      { title: "Job 3: The Friday check", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The job", text: "a short weekly look at what's done, what's stuck and what to cut." }, { label: "Why it works", text: "when a week slips, the answer is to cut scope, not to move the date. AI can suggest what to drop." }] },
        { kind: "example", label: "What you type", text: "Planned: all 3 modules. Done: 2. Stuck: editing the videos takes too long." },
        { kind: "result", label: "What a good check looks like", lines: ["Keep the date · record module 3 as a simple talking-head video · move editing polish to version 2."] },
        { kind: "locked", label: "The Friday check prompt", prompt: 2 },
      ] },
    ],
    honest: "AI can plan, but it can't make the thing or find your first customers. The plan only works if the date is real and the daily 45 minutes happen. If you miss a week, cut, don't delay.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Job 1: The smallest version prompt", text: `Here's my product idea in full: [describe everything you imagine it including].

Help me define version 1: the smallest thing a first customer would pay for that gets them one clear result.

Give me two lists: In version 1 · Not in version 1 (yet). For each item you cut, one line on why it can wait.` },
      { title: "Job 2: The backwards plan prompt", text: `My launch date is [date], [4] weeks from now. I have about [45 minutes] a day.

Version 1 includes: [paste your list].

Plan backwards from the launch date: one milestone per week, and the daily tasks for each week. Keep every task under [45 minutes]. Include telling at least 10 people before launch day.` },
      { title: "Job 3: The Friday check prompt", text: `It's Friday. Here's my week:
Planned: [what I planned]
Done: [what I did]
Stuck: [what's blocking me]

The launch date doesn't move. Tell me what to cut or simplify to stay on track, and give me next week's 3 priorities.` },
    ],
    pass: "**On launch day:** it's live · 10 people know · your version 2 list is saved for later.",
    kit: { name: "AI for small business owners", heading: "Want this for your whole business?", body: "The *AI for small business owners* kit (coming soon) has prompts for offers, pricing, customer messages and weekly admin." },
  },
  {
    slug: "marketing-emails-that-sell",
    seoTitle: "How to write marketing emails people buy from",
    seoDescription: "Most sales emails talk to everyone, hide what they're about and make big promises.",
    title: "3 Email Rules That Make People Click Buy",
    question: "Why don't people buy from my emails?",
    answer: "Most sales emails talk to everyone, hide what they're about and make big promises. Write to one real customer, say what's inside in the subject line, and show proof instead of promises. AI helps with drafts; you bring the customer and the proof.",
    level: "Beginner",
    minutes: 15,
    tool: "ChatGPT, Claude or Gemini",
    hero: { title: "3 email rules that make people", accent: "click buy.", line: "Write to one person, make the subject line say what's inside, and let a real customer's words do the persuading.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/marketing-emails-that-sell.webp", alt: "The blue robot mascot sending envelopes through a line of brass pipes" } },
    leaveWith: "3 rules, a prompt for each, and a 4-point check to run before you press send.",
    howTo: "Pick one product and one email you're about to send. Apply the three rules to that email, in order.",
    sections: [
      { title: "Rule 1: Write to one person", icon: "target", blocks: [
        { kind: "fields", items: [{ label: "The rule", text: "picture one real customer and write to them." }, { label: "Why it works", text: "an email written to everyone sounds like an advert. One written to one person sounds like a note, and gets read." }] },
        { kind: "example", label: "To everyone", text: "Dear valued customers, we're excited to announce our new range of candles." },
        { kind: "result", label: "To one person", lines: ["\"You told me the lavender candle was the only thing that helped you switch off after work. There's now a bigger one.\""] },
        { kind: "locked", label: "The one-reader prompt", prompt: 0 },
      ] },
      { title: "Rule 2: Say what's inside", icon: "check", blocks: [
        { kind: "fields", items: [{ label: "The rule", text: "the subject line tells the reader exactly what they'll get by opening." }, { label: "Why it works", text: "clever subject lines get skipped. Clear ones get opened by the people who actually want the thing." }] },
        { kind: "example", label: "Clever", text: "You won't believe this..." },
        { kind: "result", label: "Clear", lines: ["\"The big lavender candle is back (40 hours)\" · \"New: the lavender candle, twice the size\""] },
        { kind: "locked", label: "The subject line prompt", prompt: 1 },
      ] },
      { title: "Rule 3: Proof, not promises", icon: "sparkle", blocks: [
        { kind: "fields", items: [{ label: "The rule", text: "use a real customer's words, a real detail or a real result instead of adjectives." }, { label: "Why it works", text: "\"the best candle ever\" is a claim. \"I light it every night at 9\" from a real customer is proof." }] },
        { kind: "example", label: "A promise", text: "Our candles are amazing and long-lasting." },
        { kind: "result", label: "Proof", lines: ["One short real review, with permission · \"burns for about 40 hours\" (only if you've tested it) · a photo of it on a real customer's shelf."] },
        { kind: "locked", label: "The proof prompt", prompt: 2 },
      ] },
    ],
    honest: "AI can write a smooth email, but it can't invent your proof. Never let it make up reviews, results or numbers. If you don't have proof yet, ask your last five customers for a sentence before you send.",
    gate: { promise: "3 prompts.", action: "Unlock" },
    prompts: [
      { title: "Rule 1: The one-reader prompt", text: `Write a short sales email for [product] to one specific customer: [describe them: who they are, why they bought before, what they said].

Write as if to that one person. Under 120 words. One link, one clear reason to click. Use only the facts I've given you.` },
      { title: "Rule 2: The subject line prompt", text: `Give me 5 subject lines for this email. Each one must say exactly what's inside. No teasers, no "you won't believe", no false urgency. Under 50 characters each.

Email: [paste]` },
      { title: "Rule 3: The proof prompt", text: `Here's my email and the real proof I have: [paste reviews, tested details or results, with permission].

Replace any vague claims in the email with this proof. Don't invent any reviews, numbers or results. If a claim has no proof, mark it [NO PROOF] so I can cut it.

Email: [paste]` },
    ],
    pass: "**Before you press send:** written to one person · the subject says what's inside · every claim has proof · one link, one ask.",
    kit: { name: "AI for small business owners", heading: "Want this for your whole business?", body: "The *AI for small business owners* kit (coming soon) has prompts for offers, pricing, customer messages and weekly admin." },
  },
];
