import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-is-ai",
  lumailTag: "guide-what-is-ai",
  title: "What Can I Use AI For in My Business?",
  cover: "/images/guides/what-is-ai.webp",
  coverAlt: "The blue robot mascot at a loom that turns shapes into an ordered pattern",
  seoDescription: "What can I use AI for in my business? See 12 jobs AI can do for you. Then build your own AI job menu, with a ready prompt for each job.",
  tool: "ChatGPT or Claude",
  minutes: 30,
  h1: { title: "What Can I Use AI For", accent: "in My Business?" },
  hero: {
    kind: "scene",
    src: "/images/guides/what-is-ai.webp",
    alt: "The blue robot mascot at a loom that turns shapes into an ordered pattern",
    line: "A list of jobs AI can do for you, and the 3 to try first. Then you turn it into a menu for your business.",
  },
  intro: {
    heading: "Your AI job menu, built from your own week",
    lead: "Most lists of AI uses are made for someone else's business. This guide starts with 12 jobs AI can do for a small business. Then you turn that list into your own job menu. It holds the jobs in your week, in order, each with a prompt you can use again.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "The 12 jobs AI can help with, and what stays with you in each one",
        "Your **AI job menu**: your jobs AI can help with, in order, top 5 marked",
        "A **ready prompt** for each of your top 5 jobs",
        "Job 1 done on real work, and checked by you",
        "Your menu saved in a note or a project, with one new job each week",
      ] },
      { kind: "tip", text: "You need a ChatGPT or Claude account. The free plans work. You can copy and paste every prompt below as it is. Replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "AI Job Menu.",
    promise: "Enter your name and email. The rest of the guide opens straight away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "See the 12 jobs", accent: "What AI can do, and what stays with you.", blocks: [
      { kind: "p", text: "This table shows the jobs AI does well in a small business. They are grouped by area. You can see where AI fits before you change anything." },
      { kind: "list", ordered: true, items: [
        "Read the table one area at a time.",
        "Mark every job you do at least once a week.",
        "Circle the 3 that take you longest, or that you put off most. Try those 3 first.",
      ] },
      { kind: "table", head: ["Area", "Job", "What AI does", "What you still do"], rows: [
        ["Admin", "Everyday email replies", "Drafts the reply from your short notes", "Add the facts, read it, send it"],
        ["Admin", "Call notes into a to-do list", "Turns rough notes into a summary and a to-do list", "Check nothing was missed or added"],
        ["Admin", "Long documents", "Pulls out the main points and quotes where each one came from", "Read the quoted parts before you rely on them"],
        ["Clients", "Follow-up after a call", "Drafts the follow-up email from your call notes", "Check every promise and date"],
        ["Clients", "Welcoming a new client", "Drafts the welcome email and what you need from them", "Decide what goes in, then send it"],
        ["Clients", "Sorting feedback", "Groups client feedback or survey answers by topic", "Decide which topics matter"],
        ["Sales", "Replying to new client questions", "Drafts a reply using what you offer", "Set the price and the next step"],
        ["Sales", "First draft of a proposal", "Turns your notes into a written offer with clear sections", "Price, what's included and every promise"],
        ["Content", "Posts from rough ideas", "Turns a voice note or rough idea into a draft post", "Your story, your view, the final edit"],
        ["Content", "Using what you made again", "Turns one newsletter or talk into shorter posts", "Choose what to publish"],
        ["Planning", "Your weekly plan", "Puts your tasks in order by deadline and effort", "Decide what really gets done"],
        ["Planning", "Launch checklist", "Lists the steps to launch an offer, from your notes", "Dates, prices and what you promise"],
      ] },
      { kind: "p", text: "Look at the right-hand column. In every job, AI prepares and you decide. That keeps your clients safe." },
      { kind: "tip", text: "**Haven't set up ChatGPT for your business yet?** Do the [Start using AI in your business](/guides/start-using-ai-in-your-business/) guide first. It stops ChatGPT learning from your chats. It also saves a Business Profile (a short note about your business). Then the prompts below already know who you are." },
    ] },
    { num: "02", title: "Build your job menu", accent: "Your business, your tasks.", blocks: [
      { kind: "p", text: "The table above is for any business. This prompt asks you about your own week. Then it makes a job menu that fits your business." },
      { kind: "list", ordered: true, items: [
        "Open a new chat in ChatGPT or Claude.",
        "Paste the prompt below and send it.",
        "Answer each question in a sentence or two. Use [client] instead of real names.",
      ] },
      { kind: "prompt", label: "Build my AI job menu", text: `I run a small business. I want a list of the jobs in my week that AI could help with.

Here is a list of jobs AI can help a small business with:
Admin: everyday email replies, call notes into a to-do list, long documents
Clients: follow-up after a call, welcoming a new client, sorting feedback
Sales: replying to new client questions, first draft of a proposal
Content: posts from rough ideas, using what I made again
Planning: my weekly plan, launch checklist

Interview me about my business. Ask me one question at a time and wait for each answer, up to 8 questions, about:
- what I sell and who my clients are
- the tasks I repeat every week, and how long each one takes
- the tasks I put off or dread
- which of the jobs above I do, and any jobs I do that are not on the list

Then give me my AI job menu as a table with these columns:
Job | What I paste in | What AI gives back | What I check before using it | Hours per week now | Risk if AI gets it wrong (low, medium, high)

Rank the table: most hours saved and lowest risk first. Mark the top 5 with a star.

Rules: use only what I tell you. Write [CHECK] where details are missing instead of guessing. Never make up names, prices, dates or promises. Plain English, no em dashes.` },
      { kind: "p", text: "Read the table. Is a job missing? Tell it: \"Add [job]. I do it [how often].\" Does a risk look too low? Change it. You know your clients. The AI doesn't." },
      { kind: "tip", text: "**Did you save a Business Profile** in the first guide? Then ChatGPT already knows what you sell. Answer the first question with \"Use my Business Profile\" and move on." },
    ] },
    { num: "03", title: "Write a prompt per job", accent: "One for each of your top 5.", blocks: [
      { kind: "p", text: "A job on a list saves you nothing until it has a ready prompt. This step writes one prompt for each of your top 5 jobs. You can use each prompt again and again." },
      { kind: "list", ordered: true, items: [
        "Stay in the same chat, so it can see your job menu.",
        "Paste the prompt below and send it.",
      ] },
      { kind: "prompt", label: "Write a prompt for each top job", text: `Take the 5 starred jobs from my AI job menu.

For each one, write a prompt I can paste into a new chat every time the job comes round. Each prompt must:
1. Start with one line saying what the job is
2. Say what I will paste in, as [square brackets], for example [paste the call notes]
3. Say exactly what to give back: format, length and tone
4. End with these rules: use only what I paste; write [CHECK] where details are missing instead of guessing; never make up names, prices, dates or promises

Keep each prompt under 800 characters.
Give me the 5 prompts under headings: Job 1, Job 2, Job 3, Job 4, Job 5, each with the job name.` },
      { kind: "p", text: "Read each prompt. Does it ask for something you never have? Cross that line out. Does it miss something you always include? Add it." },
    ] },
    { num: "04", title: "Try job 1 on real work", accent: "Then check it.", blocks: [
      { kind: "p", text: "One real job, done and checked, teaches you more than any list. Use this week's real notes, not a made-up example." },
      { kind: "list", ordered: true, items: [
        "Open a new chat.",
        "Paste the prompt for Job 1.",
        "Replace the [square brackets] with this week's real notes. Swap names for [client], prices for [price] and dates for [date].",
        "Send it.",
      ] },
      { kind: "p", text: "Before you use the answer, check these 4 things:" },
      { kind: "list", ordered: true, items: [
        "**Names, numbers and dates.** Each one must be in what you pasted. If not, fix it or delete it.",
        "**Promises.** Delete anything you didn't agree to.",
        "**[CHECK] marks.** Fill in every one yourself.",
        "**Your voice.** Would you send this with your name on it?",
      ] },
      { kind: "p", text: "Is one part wrong? Tell it what to change, in the same chat:" },
      { kind: "prompt", label: "Fix one part", text: `Change this part: [paste the line].
Why it's wrong: [what's actually true].
Keep everything else the same.` },
      { kind: "tip", text: "**Made the same fix twice?** Add it to that job's prompt as a new rule. Then you never fix it again." },
    ] },
    { num: "05", title: "Save your menu", accent: "Add one job a week.", blocks: [
      { kind: "p", text: "Your job menu only helps if you can find it next week. Save it in one place with its prompts." },
      { kind: "list", ordered: true, items: [
        "**Do you see Projects in the left side menu** (in ChatGPT or Claude)? A Project is a folder that remembers your files and rules. Click **New project** and name it **AI job menu**. Add the menu table and the 5 prompts to the project's instructions or files. Start every job chat inside the project.",
        "**No Projects?** Copy the menu table and the 5 prompts into one note in your notes app. Call it **AI job menu**. Paste the right prompt into a new chat each time.",
        "Set a weekly reminder in your calendar, at the same time each week: \"Add one job.\"",
        "Each week, take the next job on the menu. Write its prompt with step 03. Try it with step 04.",
      ] },
      { kind: "tip", text: "Menus change. Can't find Projects? Search \"projects\" on [OpenAI's help pages](https://help.openai.com/) or [Claude's help centre](https://support.claude.com/). A note works just as well." },
      { kind: "honest", text: "**The honest part:** AI won't know which jobs matter most to your clients. It won't notice when a draft is wrong. It prepares the work. You check it, decide and send it." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Marked the jobs you do every week in the table",
        "AI job menu built and put in order, top 5 starred",
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
    body: "Soon you will paste real client work into your prompts every week. First, read the next guide. It shows what to keep out of AI, and how to swap it safely.",
    label: "See what never to share →",
    href: "/guides/what-should-you-never-share-with-ai/",
  },
  conclusion: {
    heading: "Keep it growing",
    paragraph: "Add one job a week from your menu. Put every fix you repeat into that job's prompt. Keep the menu and prompts saved in one place.",
    finishLine: "One job a week, prepared by AI and checked by you.",
  },
};
