import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-is-ai",
  lumailTag: "guide-what-is-ai",
  title: "What Can I Use AI For in My Business?",
  cover: "/images/guides/what-is-ai.webp",
  coverAlt: "The blue robot mascot at a loom that turns shapes into an ordered pattern",
  seoDescription: "What can I use AI for in my business? See 12 jobs AI can do for you, try one in 5 minutes, then list your own jobs with a ready prompt for each.",
  tool: "ChatGPT or Claude",
  minutes: 30,
  h1: { title: "What Can I Use AI For", accent: "in My Business?" },
  hero: {
    kind: "scene",
    src: "/images/guides/what-is-ai.webp",
    alt: "The blue robot mascot at a loom that turns shapes into an ordered pattern",
    line: "See the jobs AI can do for a small business. Try one in 5 minutes. Then list the jobs from your own week.",
  },
  intro: {
    heading: "Find the jobs in your week that AI can do",
    lead: "Here is the problem. It is Monday. A client wants a proposal by Thursday, and you still have call notes to write up. You hear that people use AI for this kind of work. But you don't know which jobs to give it, so you do it all yourself. An AI assistant (a chat tool like ChatGPT or Claude) can write the first draft of many of these jobs. You check it and send it. This guide shows you which jobs, and gives you a ready prompt for each.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A clear picture of 12 jobs AI can do** in a small business, and the part that stays with you",
        "**A list of the jobs from your own week**, with the easiest and safest ones at the top",
        "**A ready prompt for each of your top 5 jobs**, so you copy and paste instead of starting from nothing",
        "**One real job done this week**, and checked by you before anyone sees it",
        "**Everything saved in one place**, with a weekly reminder to add one more job",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer. These steps are for a web browser, like Chrome. The phone apps work too, but the buttons sit in other places.",
        "A ChatGPT account ([chatgpt.com](https://chatgpt.com)) or a Claude account ([claude.ai](https://claude.ai/)). The free plan works for every step.",
        "One real piece of work from this week. For example, rough notes from a client call, or an email you need to answer.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details. Type [client] instead of real client names." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "AI job list.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "See what AI can do, then try one job", accent: "10 minutes, no setup.", blocks: [
      { kind: "p", text: "First you open your AI assistant. Then you read a short table of jobs. Then you try one small job, so you see it work with your own eyes." },
      { kind: "h3", text: "A. Open your AI assistant" },
      { kind: "list", ordered: true, items: [
        "Open [chatgpt.com](https://chatgpt.com) or [claude.ai](https://claude.ai/) in your browser.",
        "No account yet? Click **Sign up** and follow the steps. You can sign up with your email or your Google account.",
        "Once you are in, you will see a big empty box in the middle or at the bottom of the screen. That is the chat box. You type in it.",
        "Look at the top left. You will see **New chat** (in ChatGPT there may be a small pencil icon). Click it any time you want a fresh start.",
      ] },
      { kind: "tip", text: "**Keep client details private.** Before you paste real work, read the [Start using AI in your business](/guides/start-using-ai-in-your-business/) guide. It shows how to stop the AI learning from your chats." },
      { kind: "h3", text: "B. Read the 12 jobs" },
      { kind: "list", ordered: true, items: [
        "Read the table below one row at a time.",
        "On paper or in a note, write down every job you do at least once a week.",
        "Circle the 3 that take you longest, or that you put off most. Those are the ones to try first.",
      ] },
      { kind: "table", head: ["Area", "Job", "What AI does", "What you still do"], rows: [
        ["Admin", "Everyday email replies", "Drafts the reply from your short notes", "Add the facts, read it, send it"],
        ["Admin", "Call notes into a to-do list", "Turns rough notes into a summary and a to-do list", "Check nothing was missed or added"],
        ["Admin", "Long documents", "Pulls out the main points and quotes where each one came from", "Read the quoted parts before you rely on them"],
        ["Clients", "Follow-up after a call", "Drafts the follow-up email from your call notes", "Check every promise and date"],
        ["Clients", "Welcoming a new client", "Drafts the welcome email and what you need from them", "Decide what goes in, then send it"],
        ["Clients", "Sorting feedback", "Groups client feedback or survey answers by topic", "Decide which topics matter"],
        ["Sales", "Replying to new enquiries", "Drafts a reply using what you offer", "Set the price and the next step"],
        ["Sales", "First draft of a proposal", "Turns your notes into a written offer with clear sections", "Price, what's included and every promise"],
        ["Content", "Posts from rough ideas", "Turns a voice note or rough idea into a draft post", "Your story, your view, the final edit"],
        ["Content", "Using what you made again", "Turns one newsletter or talk into shorter posts", "Choose what to publish"],
        ["Planning", "Your weekly plan", "Puts your tasks in order by deadline and effort", "Decide what really gets done"],
        ["Planning", "Launch checklist", "Lists the steps to launch an offer, from your notes", "Dates, prices and what you promise"],
      ] },
      { kind: "p", text: "Look at the last column. In every job, AI prepares and you decide. That is what keeps your clients safe." },
      { kind: "h3", text: "C. Try one small job now" },
      { kind: "p", text: "Let's try the sorting job. It takes 1 minute and needs no client details." },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left.",
        "Click in the chat box. Type the line below, or copy and paste it.",
        "Press **Enter** on your keyboard. The answer appears above the chat box after a few seconds.",
      ] },
      { kind: "example", label: "What you type", text: "Sort these client comments into 3 or 4 groups. Name each group and count the comments in it. Put every comment in exactly one group: too long, loved the examples, audio kept cutting, more time for questions, slides arrived late, great host, wanted the recording, room was cold." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Content (2): too long, loved the examples",
        "Tech (2): audio kept cutting, wanted the recording",
        "Format (2): more time for questions, great host",
        "Venue and admin (2): slides arrived late, room was cold",
      ] },
      { kind: "p", text: "Now count. There were 8 comments. Is each one in exactly one group? If a comment is missing or appears twice, the AI made a mistake. You just did your first check." },
    ] },
    { num: "02", title: "List the jobs from your own week", accent: "The AI asks, you answer.", blocks: [
      { kind: "p", text: "The table in step 01 is for any business. Now the AI asks about your week. Then it makes a list of your jobs, in order, with the safest ones first. We call this list your job menu." },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left.",
        "Copy the prompt below and paste it into the chat box.",
        "Change the part in [square brackets] to one line about your business.",
        "Press **Enter**. The AI asks its first question.",
        "Answer in a sentence or two, then press **Enter**. It asks the next question. Keep going until it makes the table.",
      ] },
      { kind: "prompt", label: "List my AI jobs", text: `I run a small business: [what you sell and who to, in one line].
I want a list of the jobs in my week that AI could help with.

Here are jobs AI can help a small business with:
Admin: everyday email replies, call notes into a to-do list, long documents
Clients: follow-up after a call, welcoming a new client, sorting feedback
Sales: replying to new enquiries, first draft of a proposal
Content: posts from rough ideas, using what I made again
Planning: my weekly plan, launch checklist

Ask me one question at a time and wait for each answer. Ask up to 8 questions about:
- the tasks I repeat every week, and how long each one takes
- the tasks I put off or dread
- which of the jobs above I do, and any jobs I do that are not on the list

Then give me a table with these columns:
Job | What I paste in | What AI gives back | What I check | Hours per week now | Risk if AI gets it wrong (low, medium, high)

Put the table in order: most hours saved and lowest risk first. Mark the top 5 with a star.

Rules: use only what I tell you. Write [CHECK] where details are missing instead of guessing. Never make up names, prices, dates or promises. Plain English.` },
      { kind: "example", label: "Example answer to one question", text: "Every week I write about 4 follow-up emails after calls. Each one takes me about 20 minutes. I put them off." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "A table with 6 to 10 rows. For example:",
        "★ Follow-up after a call | My call notes | A draft email | Every promise and date | 1.5 hours | Medium",
        "★ Call notes into a to-do list | My rough notes | A summary and to-dos | Nothing missed or added | 1 hour | Low",
      ] },
      { kind: "list", ordered: true, items: [
        "Read every row. Is a job missing? Type: \"Add [job]. I do it [how often].\" Press **Enter**.",
        "Does a risk look too low to you? Type: \"Change the risk for [job] to high.\" You know your clients. The AI doesn't.",
        "Keep this chat open. You need it in step 03.",
      ] },
      { kind: "tip", text: "**The AI asked no questions and made a table straight away?** Type: \"Please ask me the questions first, one at a time.\" Then press **Enter**." },
    ] },
    { num: "03", title: "Get a ready prompt for each top job", accent: "Copy and paste next time.", blocks: [
      { kind: "p", text: "A job on a list saves you nothing until you have the words to ask for it. A prompt is the message you type to the AI. In this step the AI writes one prompt for each of your top 5 jobs. You can use each one again and again." },
      { kind: "list", ordered: true, items: [
        "Stay in the same chat as step 02, so the AI can see your table.",
        "Copy the prompt below and paste it into the chat box. Nothing to change this time.",
        "Press **Enter**.",
      ] },
      { kind: "prompt", label: "Write a prompt for each top job", text: `Take the 5 starred jobs from my table.

For each one, write a prompt I can paste into a new chat every time the job comes round. Each prompt must:
1. Start with one line saying what the job is
2. Show what I will paste in, inside [square brackets], for example [paste the call notes]
3. Say exactly what to give back: layout, length and tone
4. End with these rules: use only what I paste; write [CHECK] where details are missing instead of guessing; never make up names, prices, dates or promises

Keep each prompt under 800 characters.
Put each prompt under a heading: Job 1, Job 2, Job 3, Job 4, Job 5, with the job name.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Job 1: Follow-up after a call",
        "Write a follow-up email to [client] after our call. Here are my notes: [paste the call notes]. Thank them, list what we agreed, and give one clear next step. Under 150 words, warm and direct. Use only what I paste. Write [CHECK] where details are missing. Never make up names, prices, dates or promises.",
        "Then Job 2 to Job 5 in the same shape.",
      ] },
      { kind: "list", ordered: true, items: [
        "Read each prompt. Does it ask for something you never have? Delete that line.",
        "Does it miss something you always include, like your booking link? Add it.",
        "Under the answer, click the **copy** button (two small squares). Paste everything into a note on your computer for now. Step 06 shows where to keep it.",
      ] },
    ] },
    { num: "04", title: "Do job 1 on real work", accent: "This week's notes, not a made-up example.", blocks: [
      { kind: "p", text: "One real job, done and checked, teaches you more than any list. Use real notes from this week." },
      { kind: "h3", text: "A. Get your notes ready" },
      { kind: "list", ordered: true, items: [
        "Open the real notes or email for job 1.",
        "Copy them into a note first. Swap every client name for [client], every price for [price], and every date you don't want shared for [date].",
      ] },
      { kind: "h3", text: "B. Run the prompt" },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left.",
        "Paste your prompt for Job 1 into the chat box.",
        "Find the part in [square brackets], for example [paste the call notes]. Delete it and paste your cleaned-up notes in its place.",
        "Press **Enter**. The draft appears above the chat box.",
      ] },
      { kind: "h3", text: "C. Fix one part without starting again" },
      { kind: "p", text: "Is one line wrong? Don't start a new chat. In the same chat, paste the prompt below and fill it in." },
      { kind: "prompt", label: "Fix one part", text: `Change this part: [paste the line].
Why it's wrong: [what's actually true].
Keep everything else the same.` },
      { kind: "example", label: "What you type", text: "Change this part: \"We'll start on Monday.\" Why it's wrong: we agreed to start after the deposit is paid. Keep everything else the same." },
      { kind: "tip", text: "**Made the same fix twice?** Add it to that job's prompt in your note as a new rule. Then you never fix it again." },
    ] },
    { num: "05", title: "Check it yourself", accent: "2 minutes, before anyone sees it.", blocks: [
      { kind: "p", text: "AI sounds just as sure when it is wrong. So before you send the draft, put it next to your notes and check 4 things." },
      { kind: "list", ordered: true, items: [
        "Put the draft and your notes side by side. On a computer, open your notes in one window and the chat in another.",
        "**Names, numbers and dates.** Find each one in the draft. Then find it in your notes. If it is not in your notes, fix it or delete it.",
        "**Promises.** Read every sentence with \"we will\", \"I will\" or a date in it. Delete anything you did not agree to.",
        "**[CHECK] marks.** Fill in each one yourself. Search the draft for the word CHECK to be sure none are left.",
        "**Your voice.** Read it out loud. Would you send this with your name on it? If not, change the words.",
        "Put the real client names back last, just before you send.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["A name, price or date that is not in your notes", "The AI made it up", "Delete it, or replace it with the real fact"],
        ["A promise you never made", "The AI filled a gap", "Delete the sentence. Add a rule to the prompt: \"Never add promises.\""],
        ["[CHECK] in the draft", "A detail was missing from your notes", "Fill it in yourself"],
        ["The answer is long and vague", "The prompt did not say the length or what to include", "Add the length to the prompt, for example \"under 150 words\""],
        ["It answered a different question", "The notes were unclear or too short", "Add one line at the top: \"The main thing is [what you need]\""],
      ] },
      { kind: "honest", text: "**The honest part:** AI won't know which jobs matter most to your clients. It won't notice when a draft is wrong. It prepares the work. You check it, decide and send it." },
    ] },
    { num: "06", title: "Save your list and prompts", accent: "Add one job a week.", blocks: [
      { kind: "p", text: "Your list only helps if you can find it next week. Keep the table and the 5 prompts together in one place." },
      { kind: "h3", text: "A. If you see Projects" },
      { kind: "p", text: "A Project is a folder in ChatGPT or Claude that keeps your files and rules together. Free plans may have fewer Projects, or none." },
      { kind: "list", ordered: true, items: [
        "Look at the left side of the screen. Do you see **Projects**? On a small window, click the menu button at the top left first.",
        "Click **New project** (in Claude it may show as **+ New project**). A box opens.",
        "Type the name **AI job menu**. Click **Create project**. You will see an empty project page.",
        "Paste your table and your 5 prompts into the project's **Instructions** or add them as a file. Then start every job chat inside this project.",
        "Can't find Projects? OpenAI and Anthropic move these menus. Search \"projects\" on [OpenAI's help pages](https://help.openai.com/) or [Claude's help centre](https://support.claude.com/).",
      ] },
      { kind: "h3", text: "B. If you don't see Projects" },
      { kind: "list", ordered: true, items: [
        "Open the notes app on your computer or phone.",
        "Make a new note called **AI job menu**.",
        "Paste the table at the top. Paste the 5 prompts under it, each with its job name.",
        "Next time, open the note, copy the right prompt and paste it into a new chat.",
      ] },
      { kind: "h3", text: "C. Set a weekly reminder" },
      { kind: "list", ordered: true, items: [
        "Open your calendar. Make a 15-minute event at the same time each week.",
        "Call it **Add one AI job**.",
        "Each week, take the next job on your list. Ask for its prompt with step 03. Try it with step 04. Check it with step 05.",
      ] },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "The sorting test done, with all 8 comments counted",
        "Your weekly jobs written down from the 12-job table",
        "Your own job list made by the AI, top 5 starred",
        "A ready prompt for each of the top 5, copied into a note",
        "One real job done this week and checked with the 4 checks",
        "Table and prompts saved in a Project or a note",
        "A weekly reminder set to add one job",
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
    paragraph: "Add one job a week from your list. Put every fix you repeat into that job's prompt. Check every draft with the 4 checks before it goes out.",
    finishLine: "One job a week, prepared by AI and checked by you.",
  },
};
