import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-is-ai",
  lumailTag: "guide-what-is-ai",
  title: "What Can I Use AI For in My Business?",
  cover: "/images/guides/what-is-ai.webp",
  coverAlt: "The blue robot mascot at a loom that turns shapes into an ordered pattern",
  seoDescription: "What can I use AI for in my business? 12 jobs AI can do for you, and how to build your own AI job menu with a ready prompt for each.",
  tool: "ChatGPT or Claude",
  minutes: 30,
  h1: { title: "What Can I Use AI For", accent: "in My Business?" },
  hero: {
    kind: "scene",
    src: "/images/guides/what-is-ai.webp",
    alt: "The blue robot mascot at a loom that turns shapes into an ordered pattern",
    line: "A list of the jobs AI can do for you, and the 3 to try first. Then you turn it into a menu for your own business.",
  },
  intro: {
    heading: "Your AI job menu, built from your own week",
    lead: "Most lists of AI uses are written for someone else's business. This guide starts with 12 jobs AI can do for a small business that sells its expertise, then turns that list into your own job menu: the jobs in your week, ranked, each with a prompt you can reuse.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A clear picture of the 12 jobs AI can help with, and what stays with you in each one",
        "Your **AI job menu**: the jobs in your business AI can help with, ranked, with your top 5 marked",
        "A **ready prompt** for each of your top 5 jobs, written for your business",
        "Job number 1 done on real work, and checked by you",
        "Your menu saved in your notes or in a project, with one new job added each week",
      ] },
      { kind: "tip", text: "You need a ChatGPT or Claude account. The free plans work. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "AI Job Menu.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "See the 12 jobs", accent: "What AI can do, and what stays with you.", blocks: [
      { kind: "p", text: "This table shows the jobs AI handles well in a small business, grouped by area, so you can see where it fits before you change anything." },
      { kind: "list", ordered: true, items: [
        "Read the table one area at a time.",
        "Put a mark next to every job you do at least once a week.",
        "Circle the 3 that take you longest or that you put off most. Those are the 3 to try first.",
      ] },
      { kind: "table", head: ["Area", "Job", "What AI does", "What you still do"], rows: [
        ["Admin", "Routine email replies", "Drafts the reply from your bullet points", "Add the facts, read it, send it"],
        ["Admin", "Call notes into actions", "Turns rough notes into a summary and a to-do list", "Check nothing was missed or added"],
        ["Admin", "Long documents", "Pulls out the points that matter and quotes where each came from", "Read the quoted parts before you rely on them"],
        ["Clients", "Follow-up after a call", "Drafts the follow-up email from your call notes", "Check every promise and date"],
        ["Clients", "Welcoming a new client", "Drafts the welcome email and the list of what you need from them", "Decide what goes in, then send it"],
        ["Clients", "Sorting feedback", "Groups client feedback or survey answers into themes", "Decide which themes matter"],
        ["Sales", "Replying to enquiries", "Drafts a reply to a new enquiry using what you offer", "Set the price and the next step"],
        ["Sales", "First draft of a proposal", "Turns your notes into a proposal with clear sections", "Price, scope and every promise"],
        ["Content", "Posts from rough ideas", "Turns a voice note or rough idea into a draft post", "Your story, your opinion, the final edit"],
        ["Content", "Reusing what you made", "Turns one newsletter or talk into shorter posts", "Choose what to publish"],
        ["Planning", "Your weekly plan", "Orders your task list by deadline and effort", "Decide what actually gets done"],
        ["Planning", "Launch checklist", "Lists the steps for an offer launch from your notes", "Dates, prices and what you commit to"],
      ] },
      { kind: "p", text: "Notice the right-hand column. In every job, AI prepares and you decide. That split is what keeps your clients safe." },
      { kind: "tip", text: "**Haven't set up ChatGPT for your business yet?** Do the [Start using AI in your business](/guides/start-using-ai-in-your-business/) guide first. It switches off training on your chats and saves a Business Profile, so the prompts below already know who you are." },
    ] },
    { num: "02", title: "Build your job menu", accent: "Your business, your tasks.", blocks: [
      { kind: "p", text: "The table above is general. This prompt interviews you about your own week and turns it into a job menu that fits your business." },
      { kind: "list", ordered: true, items: [
        "Open a new chat in ChatGPT or Claude.",
        "Paste the prompt below and send it.",
        "Answer each question in a sentence or two. Use [client] instead of real names.",
      ] },
      { kind: "prompt", label: "Build my AI job menu", text: `I run a small business. I want a list of the jobs in my week that AI could help with.

Here is a list of jobs AI can help a small business with:
Admin: routine email replies, call notes into actions, long documents
Clients: follow-up after a call, welcoming a new client, sorting feedback
Sales: replying to enquiries, first draft of a proposal
Content: posts from rough ideas, reusing what I made
Planning: my weekly plan, launch checklist

Interview me about my business. Ask me one question at a time and wait for each answer, up to 8 questions, about:
- what I sell and who my clients are
- the tasks I repeat every week, and how long each one takes
- the tasks I put off or dread
- which of the jobs above I do, and any jobs I do that are not on the list

Then give me my AI job menu as a table with these columns:
Job | What I paste in | What AI gives back | What I check before using it | Hours per week now | Risk if AI gets it wrong (low, medium, high)

Rank the table: most hours saved and lowest risk first. Mark the top 5 with a star.

Rules: use only what I tell you. Write [CHECK] where information is missing instead of guessing. Never invent names, prices, dates or promises. Plain English, no em dashes.` },
      { kind: "p", text: "Read the table. If a job is missing, tell it: \"Add [job]. I do it [how often].\" If a risk looks too low to you, change it. You know your clients, it doesn't." },
      { kind: "tip", text: "**If you saved a Business Profile** with the first guide, ChatGPT already knows what you sell. Answer the first question with \"Use my Business Profile\" and move on." },
    ] },
    { num: "03", title: "Write a prompt per job", accent: "One for each of your top 5.", blocks: [
      { kind: "p", text: "A job on a list saves you nothing until you have a prompt ready for it. This step writes one reusable prompt for each of your top 5 jobs." },
      { kind: "list", ordered: true, items: [
        "Stay in the same chat, so it can see your job menu.",
        "Paste the prompt below and send it.",
      ] },
      { kind: "prompt", label: "Write a prompt for each top job", text: `Take the 5 starred jobs from my AI job menu.

For each one, write a reusable prompt I can paste into a new chat every time the job comes round. Each prompt must:
1. Start with one line saying what the job is
2. Say what I will paste in, as [square brackets], for example [paste the call notes]
3. Say exactly what to give back: format, length and tone
4. End with these rules: use only what I paste; write [CHECK] where information is missing instead of guessing; never invent names, prices, dates or promises

Keep each prompt under 800 characters.
Give me the 5 prompts under headings: Job 1, Job 2, Job 3, Job 4, Job 5, each with the job name.` },
      { kind: "p", text: "Read each prompt. If it asks for something you never have to hand, cross that line out. If it misses something you always include, add it." },
    ] },
    { num: "04", title: "Try job 1 on real work", accent: "Then check it.", blocks: [
      { kind: "p", text: "One real job, done and checked, tells you more than any list. Use this week's material, not an invented example." },
      { kind: "list", ordered: true, items: [
        "Open a new chat.",
        "Paste the prompt for Job 1.",
        "Replace the [square brackets] with this week's real material. Swap names for [client], prices for [price] and dates for [date].",
        "Send it.",
      ] },
      { kind: "p", text: "Before you use what comes back, check these 4 things:" },
      { kind: "list", ordered: true, items: [
        "**Names, numbers and dates.** Every one must be in what you pasted. If not, fix it or delete it.",
        "**Promises.** Delete anything you didn't agree to.",
        "**[CHECK] marks.** Fill in every one yourself.",
        "**Your voice.** Would you send this with your name on it?",
      ] },
      { kind: "p", text: "If one part is wrong, tell it what to change in the same chat:" },
      { kind: "prompt", label: "Fix one part", text: `Change this part: [paste the line].
Why it's wrong: [what's actually true].
Keep everything else the same.` },
      { kind: "tip", text: "**The same fix twice?** Add it to that job's prompt as a new rule, so you never correct it again." },
    ] },
    { num: "05", title: "Save your menu", accent: "Add one job a week.", blocks: [
      { kind: "p", text: "Your job menu only works if you can find it next week. Save it in one place with its prompts." },
      { kind: "list", ordered: true, items: [
        "**If you see Projects in the left sidebar** (in ChatGPT or Claude): click **New project**, name it **AI job menu**, and add the menu table and the 5 prompts to the project's instructions or files. Start every job chat inside the project.",
        "**If you don't:** copy the menu table and the 5 prompts into one note in your notes app, called **AI job menu**. Paste the right prompt into a new chat each time.",
        "Put a reminder in your calendar for the same time each week: \"Add one job.\"",
        "Each week, take the next job on the menu, write its prompt with step 03, and try it with step 04.",
      ] },
      { kind: "tip", text: "Menus change. If you can't find Projects, search \"projects\" on [OpenAI's help pages](https://help.openai.com/) or [Claude's help centre](https://support.claude.com/). A note works just as well." },
      { kind: "honest", text: "**The honest part:** AI won't know which jobs matter most to your clients, and it won't notice when a draft is wrong. It prepares the work. You check it, decide and send it." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Marked the jobs you do every week in the table",
        "AI job menu built and ranked, top 5 starred",
        "A ready prompt written for each of the top 5",
        "Job 1 done on real work and checked",
        "Menu and prompts saved in a project or a note",
        "Weekly reminder set to add one job",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know which jobs to hand over.",
    accent: "Now know what never goes in.",
    body: "Before you paste real client work into your prompts every week, the next guide shows you exactly what to keep out of AI and how to swap it safely.",
    label: "See what never to share →",
    href: "/guides/what-should-you-never-share-with-ai/",
  },
  conclusion: {
    heading: "Keep it growing",
    paragraph: "Add one job a week from your menu, put every repeated fix into that job's prompt, and keep the menu and prompts saved in one place.",
    finishLine: "One job a week, prepared by AI and checked by you.",
  },
};
