import type { GuidePage, GuideRelated, GuideSection } from "./guide-page";
import { grokResearchPrompt } from "./grok-research-prompt";

export type SeriesGuide = {
  slug: string;
  title: string;
  promise: string;
  cover?: string;
  coverAlt: string;
  seoDescription: string;
  sources: readonly { label: string; url: string }[];
  answer: readonly [string, ...string[]];
  sections: readonly GuideSection[];
  tryNow: NonNullable<GuidePage["tryNow"]>;
  finish: string;
  related: readonly GuideRelated[];
  promptMode?: "as-written";
};

const completePrompt = (task: string) => `You are helping me complete one small, practical task. Follow the instructions exactly and do not broaden the job.

TASK
${task}

WORKING RULES
1. Treat every requirement, limit and stop condition above as mandatory.
2. Use only the information or sources named in the task. Do not invent a fact, name, date, number, quote, result or commitment.
3. If a bracketed detail has not been replaced, or required information is missing, stop and list what I need to provide. Do not guess.
4. Keep the requested structure and size. Do not add a general introduction, repeated summary, extra deliverable or offer to do more.
5. Do not take an external action, change another file or account, contact anyone, publish, purchase, book, delete or send anything unless the task explicitly requests that exact action.

BEFORE YOU FINISH
1. Compare the result with every numbered requirement in the task.
2. Check that every fact comes from the material or source I provided.
3. Check that no prohibited action or extra work was added.

FINAL RESPONSE
- Put the requested result first.
- Then add a short section called “Completion check”.
- In that section, list each requirement as Passed, Needs checking or Not completed, with one short reason.
- If anything is missing or uncertain, label it “Needs checking” rather than filling the gap.

Stop when the requested result and completion check are complete.`;

export const makeGuide = (guide: SeriesGuide): GuidePage => ({
  slug: guide.slug,
  title: guide.title,
  promise: guide.promise,
  cover: guide.cover ?? `/images/guides/${guide.slug}.webp`,
  coverAlt: guide.coverAlt,
  seoDescription: guide.seoDescription,
  lumailTag: `guide-${guide.slug}`,
  sourceNotes: guide.sources,
  answer: { paragraphs: guide.answer },
  sections: guide.sections,
  tryNow: {
    ...guide.tryNow,
    prompt: guide.promptMode === "as-written" ? guide.tryNow.prompt : completePrompt(guide.tryNow.prompt),
    instructions: guide.tryNow.instructions ?? [
      { title: "Open the tool", body: "Open the product named in this guide and start a new conversation or task in the place described above." },
      { title: "Copy the complete instruction", body: "Select **Copy** and paste the full instruction into the message box. Keep the limits and completion check." },
      { title: "Make it yours safely", body: "Replace any bracketed details. Remove names, private messages, customer data, passwords and confidential work before you send it." },
      { title: "Send and check", body: "Send the instruction, then complete the check below before you keep, share or act on the result." },
    ],
  },
  conclusion: {
    heading: "What you can decide now",
    paragraphs: [guide.finish],
    finishLine: "Keep the method only when the checked result is useful for the work you actually do.",
  },
  related: guide.related,
});

export const promptGuide = (slug: string, title: string, reason: string): GuideRelated => ({
  slug,
  title,
  reason,
  cover: `/images/guides/${slug}.webp`,
});

export const comingNextGuide = (slug: string, title: string, reason: string): GuideRelated => ({
  ...promptGuide(slug, title, reason),
  status: "coming-next",
});

export const existingGuide = (slug: string, title: string, reason: string, cover: string): GuideRelated => ({ slug, title, reason, cover });

export const makeChatgptAnswersShorterGuide = makeGuide({
  slug: "make-chatgpt-answers-shorter",
  promptMode: "as-written",
  title: "Why does ChatGPT keep giving you an essay?",
  promise: "Turn a long ChatGPT answer into a short update you can use, without losing the facts or adding new ones.",
  coverAlt: "The small blue robot trimming an overflowing paper scroll into a compact work brief",
  seoDescription: "A practical test for making ChatGPT answers shorter without losing the useful parts.",
  sources: [
    { label: "OpenAI: Prompt engineering best practices", url: "https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt" },
  ],
  answer: [
    "**Tell ChatGPT what the short answer is for.** Name the parts you need, set a length limit and say what it must not add.",
  ],
  sections: [
    {
      kind: "comparison",
      heading: "Replace vague requests with clear ones",
      columns: ["Too vague", "Easy to check"],
      rows: [
        ["Make this shorter.", "Write a meeting update in 3 bullets, under 60 words."],
        ["Tell me what matters.", "Use these headings: Status, Waiting on, Next action."],
        ["Do not ramble.", "No introduction or closing offer. Do not add facts I did not give you."],
      ],
    },
    {
      kind: "cards",
      heading: "Check the answer, not the tone",
      items: [
        { title: "Find the three parts", body: "Look for **Status, Waiting on and Next action**. Each should tell you something different." },
        { title: "Count the words", body: "The complete update should be **60 words or fewer**." },
        { title: "Check the facts", body: "The draft is ready, but it has **not been reviewed or approved**. There is **no agreed publication date**." },
        { title: "Remove extras", body: "Delete repetition, invented details and any introduction you did not ask for." },
      ],
    },
  ],
  tryNow: {
    heading: "Try the difference",
    introduction: "Try this fictional project first, then replace its facts with your own non-confidential work.",
    prompt: `Write a short update for a work meeting. Use only these facts:\n\nWe are updating an internal onboarding checklist. The draft is ready. Team leads have not reviewed it. No publication date has been agreed.\n\nGive me exactly 3 bullets headed:\n- Status\n- Waiting on\n- Next action\n\nKeep the whole update to 60 words or fewer. Do not add an introduction or closing offer. Do not say the checklist is approved or ready to publish. Do not invent an owner, deadline or decision. If the next action is not stated directly, say what still needs to be agreed rather than guessing.`,
    check: "Check the three bullets and the word count. Make sure the answer does not claim an approval, date or owner that was never given.",
  },
  finish: "For your next task, give ChatGPT the facts, the three parts you need and the length limit. Check the result before you use it.",
  related: [
    existingGuide("what-is-ai", "What AI actually is", "Try a small task and check what the answer got right.", "/images/guides/what-is-ai.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Know what to leave out before pasting work into a chat.", "/images/guides/learn-master.webp"),
  ],
});

export const stopChatgptForgettingContextGuide = makeGuide({
  slug: "stop-chatgpt-forgetting-context",
  promptMode: "as-written",
  title: "Why does ChatGPT forget what you already told it?",
  promise: "Put the small set of facts that must stay stable in a Project, then test whether the next answer uses them without another correction.",
  coverAlt: "The small blue robot filing four fixed facts into a cabinet while loose chat pages drift away",
  seoDescription: "Use a ChatGPT Project to keep a short working brief available across related conversations.",
  sources: [{ label: "OpenAI: Projects in ChatGPT", url: "https://help.openai.com/en/articles/10169521-projects-in-chatgpt" }],
  answer: [
    "**A long chat is not a reliable filing system.** Use a normal chat for a one-off question and a Project when several chats need the same short brief, files or instructions.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Build one safe test Project",
      introduction: "Use invented information so you can test the method without exposing work data.",
      steps: [
        { title: "Create the Project", body: "In ChatGPT select **New project** and name it **Autumn event plan**." },
        { title: "Add the fixed facts", body: "Open the Project’s menu, choose **Project settings** and paste the brief below into its instructions field." },
        { title: "Draft the event description", body: "Start a chat inside the Project and send the first test message. Check it against the Project brief." },
        { title: "Try a second Project chat", body: "Start another new chat inside the same Project and ask for an invitation. Check that it keeps the audience, format, goal and recording boundary without you pasting the brief again." },
      ],
    },
    {
      kind: "cards",
      heading: "What the answer must keep",
      items: [
        { title: "Audience", body: "First-time managers." },
        { title: "Format", body: "A 60-minute online session." },
        { title: "Promise", body: "Help them run a clearer weekly team meeting." },
        { title: "Boundary", body: "Do not promise a recording. Mark missing details **Not decided**." },
      ],
    },
  ],
  tryNow: {
    heading: "Add this Project instruction",
    introduction: "Use the example as written before adapting it to your own work.",
    prompt: `Project facts\n- The event is a 60-minute online session for first-time managers.\n- The goal is to help them run a clearer weekly team meeting.\n- The tone must be practical and calm.\n- Do not promise a recording.\n\nFor every draft, separate confirmed facts from suggestions. If information is missing, label it “Not decided”.`,
    check: "The second chat should use the Project brief without you pasting it again. If it misses a fact, confirm that both chats are in the same Project and that the instruction was saved in Project settings before relying on it.",
  },
  finish: "You can now judge whether a short Project brief reduces repeated corrections for work that continues.",
  related: [
    existingGuide("what-is-ai", "What AI actually is", "See why a convincing answer still needs a check against the source.", "/images/guides/what-is-ai.webp"),
    existingGuide("connect-ai-to-email-files-calendar", "Should you let AI connect to your email, files and calendar?", "Understand access before you connect work tools to a Project.", "/images/guides/connect-ai-to-email-files-calendar.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Set the data boundary before adding real Project files.", "/images/guides/learn-master.webp"),
  ],
});

export const chatgptScheduledTasksGuide = makeGuide({
  slug: "chatgpt-scheduled-tasks",
  promptMode: "as-written",
  title: "Can ChatGPT tell you when a public page changes?",
  promise: "Use a scheduled task for one non-urgent public-page check with a clear alert condition and stop rule.",
  coverAlt: "The small blue robot princess setting a clockwork lookout beside a public noticeboard",
  seoDescription: "Set up one ChatGPT scheduled task to check a public page and alert you only when a relevant change occurs.",
  sources: [{ label: "OpenAI: Scheduled tasks in ChatGPT", url: "https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt" }],
  answer: [
    "**Yes, when the repeated check has a specific condition.** “Check this every day” creates noise. “Tell me only when this named result changes” creates a decision.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Create a task you can inspect",
      introduction: "Start with a public page you already trust.",
      steps: [
        { title: "Open Scheduled tasks", body: "Open ChatGPT on the web and go to **Scheduled**. Availability can vary by account or workspace." },
        { title: "Create the task", body: "In Scheduled, create a task and paste the complete instruction above. Ask ChatGPT to schedule it for weekday mornings." },
        { title: "Check before saving", body: "Review the schedule and time zone. Confirm the saved instruction says to alert only when your condition is met and when to stop checking." },
        { title: "Check it was saved", body: "Find the task in Scheduled and confirm its instruction and next run. If an alert arrives later, compare it with the linked public page." },
      ],
    },
    {
      kind: "prose",
      heading: "Keep the first task harmless",
      paragraphs: [
        "Use an official service-status page, public event page or public deadline page. Do not use a private dashboard, account number, health information or financial information for the first test.",
      ],
      keyLine: "Pause or delete the task if it creates noise or cannot show the source it checked.",
    },
  ],
  tryNow: {
    heading: "Build one quiet monitoring task",
    introduction: "Replace the 3 bracketed details.",
    prompt: `Every weekday morning, check [PUBLIC PAGE URL].\n\nOnly notify me if this condition is met: [EXACT CONDITION]. Compare the relevant part of the page with the previous check before sending an alert. If you cannot open the page or confirm a change, do not claim that the condition was met.\n\nIn the notification, include:\n- what changed;\n- the current wording and the previous wording if you can verify it;\n- a direct link to the source page;\n- the time you checked.\n\nIf nothing changed, do not notify me. Stop checking [STOP RULE].`,
    check: "You are done setting it up when the task appears in Scheduled with the right instruction and next run. Check any later alert against the public source.",
  },
  finish: "You can now decide whether the repeated check deserves a scheduled task or should stay manual.",
  related: [
    existingGuide("what-is-ai", "What AI actually is", "Know why an automated answer still needs checking.", "/images/guides/what-is-ai.webp"),
    existingGuide("what-is-agentic", "What AI agents actually do", "See when an agent makes sense instead of a scheduled check.", "/images/guides/what-is-agentic.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Check what the scheduled task may access.", "/images/guides/learn-master.webp"),
  ],
});

export const geminiDriveFileGuide = makeGuide({
  slug: "gemini-cannot-find-drive-file",
  promptMode: "as-written",
  title: "Why can’t Gemini see the file that is already in your Drive?",
  promise: "Check the account and connection first, then test one clearly named demo file before rewriting the request again.",
  coverAlt: "The small blue robot princess tracing one document through account keys and file drawers",
  seoDescription: "Diagnose why Gemini cannot find a Google Drive file with one safe demo document and five checks.",
  sources: [
    { label: "Google: Connect Google Workspace apps to Gemini", url: "https://support.google.com/gemini/answer/15229592" },
    { label: "Google: Use apps in Gemini", url: "https://support.google.com/gemini/answer/13695044" },
  ],
  answer: [
    "**The file is only one possible problem.** The blocker may be the Google account, the app connection, an administrator rule, the file type or the words used to find it.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Run the five checks",
      introduction: "Create a Google document called **Autumn launch brief demo** with the decision, owner and review date shown below.",
      steps: [
        { title: "Account", body: "Open Gemini and confirm you are signed in with the same Google account that owns or can open the demo file." },
        { title: "Connection", body: "Type **@** in a new Gemini chat and select **Google Drive** if it appears." },
        { title: "Request", body: "Ask for the file by its exact, unique title and request the source." },
        { title: "Source", body: "Open the source Gemini lists and check that it is the demo file." },
        { title: "Your original file", body: "If Gemini finds the demo Doc but not your original file, check the original's type. Google Workspace connection can read documents, spreadsheets, presentations and PDFs, but not Drive pictures or videos." },
      ],
    },
    {
      kind: "prose",
      heading: "If Drive does not appear",
      paragraphs: [
        "Check Gemini’s Connected Apps and Keep Activity first. If Google Workspace appears but will not connect, check Gmail’s Smart features in other Google products setting. With a work or school account, ask your administrator if connected apps are enabled.",
      ],
    },
  ],
  tryNow: {
    heading: "Create and find the demo file",
    introduction: "Put this invented text in the demo document, then use the request below it in Gemini.",
    prompt: `Demo document text:\nAutumn launch brief demo\nDecision: use the blue cover.\nOwner: Sam.\nReview date: 18 October.\n\nGemini request:\nFind the Google Drive file titled “Autumn launch brief demo”. Tell me the decision, owner and review date. Show the source.`,
    check: "You are done when you can name the failing layer, or the three returned facts match the opened source.",
  },
  finish: "You now know whether to fix the account, connection, administrator setting, file type or search wording.",
  related: [
    existingGuide("connect-ai-to-email-files-calendar", "Should you let AI connect to your email, files and calendar?", "Check the access Gemini needs before connecting a work account.", "/images/guides/connect-ai-to-email-files-calendar.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Check what belongs outside a connected chat.", "/images/guides/learn-master.webp"),
  ],
});

export const geminiTasksGuide = makeGuide({
  slug: "gemini-google-tasks-limits",
  promptMode: "as-written",
  title: "Can Gemini see which Google Tasks list a task is in?",
  promise: "Test whether Gemini can preserve the list that separates your projects before you rely on it to organise real tasks.",
  coverAlt: "The small blue robot princess sorting three tasks into two separate trays",
  seoDescription: "Test whether Gemini can retrieve Google Tasks and identify the project list for each task.",
  sources: [{ label: "Google: Capture tasks and reminders with Gemini Apps", url: "https://support.google.com/gemini/answer/15230285?co=GENIE.Platform%3DDesktop&hl=en" }],
  answer: [
    "**Gemini may find a task without exposing every detail you use to organise it.** Test the list name directly with harmless tasks before you depend on it for project separation.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Build the complete demo",
      introduction: "Create 2 temporary lists in Google Tasks.",
      steps: [
        { title: "Demo project North", body: "Add **Review demo budget** and **Confirm demo venue**." },
        { title: "Demo project South", body: "Add **Approve demo headline**." },
        { title: "Open Gemini", body: "Start a new conversation, type **@** and select **Google Tasks**." },
        { title: "Compare", body: "Place Google Tasks beside Gemini and compare the exact title, list and due date for every row." },
      ],
    },
    {
      kind: "cards",
      heading: "Choose the response",
      items: [
        { title: "The list is correct", body: "Repeat the test once before relying on it." },
        { title: "The list is missing", body: "Put the project name in the task title or organise lists directly in Google Tasks." },
        { title: "The task is wrong", body: "Do not ask Gemini to move or delete real tasks." },
      ],
    },
  ],
  tryNow: {
    heading: "Test the list boundary",
    introduction: "Send this after creating the three demo tasks.",
    prompt: `Show my 3 open tasks whose titles contain the word “demo”.\n\nFor each task, give me:\n- the exact task title;\n- its Google Tasks list;\n- its due date, or “No due date”.\n\nDo not guess a list name. If the list is unavailable, say “List not available”.`,
    check: "You are done when you know whether Gemini can show the project list your work depends on. Delete the demo tasks and lists afterwards.",
  },
  finish: "You can now keep Gemini for task retrieval or keep project organisation inside Google Tasks.",
  related: [
    existingGuide("connect-ai-to-email-files-calendar", "Should you let AI connect to your email, files and calendar?", "Understand the access a connected tool receives.", "/images/guides/connect-ai-to-email-files-calendar.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Keep private task details outside an unapproved account.", "/images/guides/learn-master.webp"),
  ],
});

export const copilotExcelGuide = makeGuide({
  slug: "check-copilot-excel-edits",
  promptMode: "as-written",
  title: "Did Copilot change only the Excel cells you asked it to change?",
  promise: "Make one small change in a practice workbook and check every cell, formula and total Copilot touched.",
  coverAlt: "The Blue Princess inspecting one changed cell through a brass magnifier while guarding the rest of a spreadsheet",
  seoDescription: "A beginner practice for checking Microsoft Copilot edits in Excel before using it on an important workbook.",
  sources: [{ label: "Microsoft: Get started with Copilot in Excel", url: "https://support.microsoft.com/en-us/excel/copilot/get-started-with-copilot-in-excel" }],
  answer: [
    "**Copilot can edit a workbook, but you still need to prove what changed.** Keep an untouched copy and ask for one exact edit at a time.",
  ],
  sections: [
    {
      kind: "walkthrough",
      heading: "Build the practice workbook",
      introduction: "Save one untouched original and one working copy.",
      blocks: [
        { kind: "table", rows: [["Item (A)", "Units (B)", "Price (C)", "Total formula (D)"], ["Pens", "10", "2", "=B2*C2"], ["Notebooks", "5", "6", "=B3*C3"], ["Folders", "8", "3", "=B4*C4"]] },
        { kind: "note", icon: "check", text: "Enter the formulas in column D. Excel displays 20, 30 and 24 before the edit." },
      ],
    },
    {
      kind: "steps",
      heading: "Check the workbook yourself",
      introduction: "Review the working copy before accepting the result.",
      steps: [
        { title: "Requested cell", body: "The Notebooks Units cell should change from **5 to 6**." },
        { title: "Formula", body: "The Notebooks Total formula should still be **=B3*C3**." },
        { title: "Untouched rows", body: "Pens and Folders must remain unchanged." },
        { title: "Totals", body: "The totals should be **20, 36 and 24**." },
      ],
    },
  ],
  tryNow: {
    heading: "Ask for one exact change",
    introduction: "Send this in Copilot in Excel while the working copy is open.",
    prompt: `In the open working copy of my practice workbook, find the row where Item is Notebooks. The columns are Item (A), Units (B), Price (C) and Total (D). In that row, Units is 5, Price is 6 and Total uses the formula =B3*C3.\n\nChange only the Notebooks Units cell, B3, from 5 to 6. Keep the formula =B3*C3 in D3. Do not change the Pens or Folders rows, any labels, prices or other formulas.\n\nAfter the edit, tell me the cell you changed and its old and new values. Tell me the three displayed totals in row order. If you cannot make the edit, say so and do not claim the workbook changed.`,
    check: "You are done when only the requested cell changed, the formula still works and all three totals are correct.",
  },
  finish: "You now have a repeatable way to check a small Copilot edit before trusting it with a larger workbook.",
  related: [
    existingGuide("which-ai-tool-for-what", "Which AI tool fits the job?", "Check when a spreadsheet task belongs in Copilot.", "/images/guides/which-ai-tool-for-what.webp"),
    existingGuide("what-is-a-prompt", "Write a prompt that gets a useful answer", "Give the tool a clearer job and a result you can check.", "/images/guides/what-is-a-prompt.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Protect workbook data before using connected tools.", "/images/guides/learn-master.webp"),
  ],
});

export const reviewGrokSuggestionsGuide = makeGuide({
  slug: "review-grok-suggestions",
  promptMode: "as-written",
  title: "When should Grok Bot ask you first?",
  promise: "Decide which parts of a Bot's job it may do alone and which need your permission.",
  coverAlt: "The blue robot sorting proposed work into review trays",
  seoDescription: "Set simple approval boundaries for Grok Bot before connecting an account or letting it act.",
  sources: [{ label: "xAI: Grok Bot approvals, security and privacy", url: "https://docs.x.ai/grok-bot/approvals-security-and-privacy" }],
  answer: [
    "**Start with read-only work.** Let your Bot collect public links and prepare drafts. Review any account connection or external action yourself.",
  ],
  sections: [
    {
      kind: "cards",
      heading: "Three kinds of action",
      items: [
        { title: "Read", body: "Search public posts and bring back links for you to check." },
        { title: "Ask first", body: "Show you the access request before connecting an account." },
        { title: "Stop", body: "Draft a reply, but do not post or send it for this job." },
      ],
    },
    {
      kind: "steps",
      heading: "Set the boundary before connecting tools",
      introduction: "Open Grok Bot settings and choose narrow rules for this Bot.",
      steps: [
        { title: "Describe the job", body: "Name what the Bot may read and what it must return." },
        { title: "Review a request", body: "Check the account, target and exact action before allowing it." },
        { title: "Keep sending separate", body: "Drafts stay in chat until you decide to send or publish them yourself." },
      ],
    },
  ],
  tryNow: {
    heading: "Tell Grok Bot where to stop",
    introduction: "Replace the bracketed job, then paste the full instruction into the Bot you created.",
    prompt: `This Bot helps me with [ONE PUBLIC MONITORING JOB]. For now, it may read public pages or posts and return a brief with original links. It may prepare draft replies or suggested next steps, but must label them as drafts.

Before connecting any account, opening private work, changing a permission, or signing in, stop and tell me which account you need and why. I will complete any login myself.

Do not send a message, post a reply, publish, buy, delete, edit an account or create a recurring routine for this job. Do not treat a broad request such as “handle it” as permission to do those things.

When you report back, give me: what you read, the original links, the result, anything uncertain, and any action you want me to approve. If an action needs approval, show the exact destination and text before asking. If you cannot complete the read-only job, say what blocked you and stop.

Confirm these boundaries in one short list, then wait for my first task.`,
    check: "The Bot confirms it will read and draft only. It asks before connecting an account, and nothing is sent or scheduled.",
  },
  finish: "The first useful boundary is simple: read and draft now, ask before connecting or acting.",
  related: [
    existingGuide("get-better-professional-writing-from-grok", "Can Grok Bot take one recurring check off your plate?", "Set up one Bot and give it a first job.", "/images/guides/grok.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Choose what stays out of a Bot's workspace.", "/images/guides/learn-master.webp"),
    existingGuide("what-is-agentic", "When do you need an AI agent?", "Check if this task needs an agent at all.", "/images/guides/what-is-agentic.webp"),
  ],
});

export const grokProfessionalWritingGuide = makeGuide({
  slug: "get-better-professional-writing-from-grok",
  promptMode: "as-written",
  title: "Can Grok Bot take one recurring check off your plate?",
  promise: "Ask Grok Bot to find useful public posts on one topic. Check the links and your usage before asking it to do more.",
  cover: "/images/guides/grok.webp",
  coverAlt: "The blue robot reviewing public updates against their original sources",
  seoDescription: "Set up one Grok Bot to prepare a source-linked brief from public X posts, with no posting or automatic routine.",
  sources: [
    { label: "xAI: Get started with Grok Bot", url: "https://docs.x.ai/grok-bot/get-started" },
    { label: "xAI: Grok Bot and X", url: "https://x.ai/news/grok-bot-and-x" },
    { label: "Cursor: Grok Bot plans and usage", url: "https://cursor.com/help/grok-bot/plans" },
  ],
  answer: [
    "**Grok Bot is worth testing when a job repeats and needs more than a chat answer.** Give it one public source to watch and one review-ready result. Check the result and usage before adding a routine.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Set up one Bot, not a team",
      introduction: "Start with public information and one read-only pass.",
      steps: [
        { title: "Check access", body: "Grok Bot needs an eligible paid Cursor plan or a linked individual SuperGrok plan. Check your current entitlement before buying another plan.", links: [{ label: "Check plans", href: "https://cursor.com/help/grok-bot/plans" }] },
        { title: "Create the Bot", body: "Open Grok Bot, sign in with Cursor, choose **Create your own**, name it **Signal Scout**, and give it one job: prepare a source-linked brief from public X posts.", links: [{ label: "Open setup steps", href: "https://docs.x.ai/grok-bot/get-started" }] },
        { title: "Connect X only if needed", body: "Use the X connector if your chosen search needs your account. Review the permission request yourself. Do not connect email, CRM or other accounts for this test.", links: [{ label: "See the X connection", href: "https://x.ai/news/grok-bot-and-x" }] },
      ],
    },
    {
      kind: "cards",
      heading: "What makes this a useful first job",
      items: [
        { title: "One outcome", body: "A short brief you can scan and use at work." },
        { title: "Named sources", body: "Every item links to the original public post." },
        { title: "No surprise actions", body: "The Bot does not post, reply, message or set a routine." },
        { title: "A value check", body: "Compare the brief and usage with doing the check yourself." },
      ],
    },
  ],
  tryNow: {
    heading: "Give Signal Scout its first job",
    introduction: "Replace the bracketed public topic before sending. Run it once; decide about a routine later.",
    prompt: `You are Signal Scout. For this first test, prepare one read-only brief about [PUBLIC TOPIC OR BUSINESS NAME] from public X posts.

Search only posts from the past seven days. Find up to five relevant original posts that show a question, complaint, request or meaningful change. Open each post before including it. Do not treat repost counts or repeated claims as proof.

Return a compact table with: the date, a one-sentence description, the link to the original post, and why I might need to pay attention. Group similar posts together only when the wording supports it. If you find fewer than five useful posts, return fewer. If you cannot access X or verify a post, say exactly what blocked you and stop rather than filling the gap.

Then give me three possible follow-ups for my review. Label each as a draft idea, not an action you have taken. Do not post, reply, send a message, contact anyone, connect another account, create another Bot or schedule a routine. Ask me before any sign-in or permission change.

Stop after this one brief. Do not repeat the search automatically.`,
    instructions: [
      { title: "Open your Bot", body: "Open Signal Scout in Grok Bot. If X asks you to sign in, do that yourself after checking the permission request." },
      { title: "Copy the full job", body: "Copy the instruction, replace the bracketed public topic, and send it to Signal Scout." },
      { title: "Check and decide", body: "Open two source links, check their dates and wording, then look at your Grok Bot usage. Schedule nothing until a second brief is useful too." },
    ],
    check: "The Bot returned a source-linked brief without posting or scheduling anything. You checked two originals and your remaining usage before deciding if it is worth repeating.",
  },
  finish: "If the posts are useful and the links check out, you can ask Grok Bot to search again when you need it.",
  related: [
    existingGuide("what-is-agentic", "When do you need an AI agent?", "See when a task needs an agent instead of a chat answer.", "/images/guides/what-is-agentic.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Choose what to keep out of your Bot’s workspace.", "/images/guides/learn-master.webp"),
    existingGuide("what-is-a-prompt", "Write a prompt that gets a useful answer", "Give the Bot a clear job and a result you can check.", "/images/guides/what-is-a-prompt.webp"),
  ],
});

export const verifyGrokResearchGuide = makeGuide({
  slug: "verify-grok-current-research",
  promptMode: "as-written",
  title: "Can Grok Bot find the X posts worth your attention?",
  promise: "Get a short brief with direct X links, then decide which posts deserve your attention.",
  coverAlt: "The Blue Princess tracing many speech bubbles back to one opened official document",
  seoDescription: "Ask Grok Bot for current X posts with direct links, then separate public reaction from verified product facts.",
  sources: [
    { label: "xAI: Grok Bot now works with X", url: "https://x.ai/news/grok-bot-and-x" },
    { label: "xAI: Grok Bot overview", url: "https://x.ai/bot" },
  ],
  answer: [
    "**A post can show what people are asking or saying.** Open its direct link before you use it, and check product claims at the original source.",
  ],
  sections: [
    {
      kind: "cards",
      heading: "Use three evidence boxes",
      items: [
        { title: "Conversation", body: "What people are saying in posts or replies." },
        { title: "Confirmed", body: "A claim you checked in an opened official or first-hand source." },
        { title: "Unverified", body: "A claim you could not trace, even if many posts repeat it." },
      ],
    },
    {
      kind: "steps",
      heading: "Open the evidence",
      introduction: "Choose a harmless public event, product update or deadline.",
      steps: [
        { title: "Open every important link", body: "Check the author, date and exact wording." },
        { title: "Find the original source", body: "A screenshot of a post is not the original document." },
        { title: "Remove false certainty", body: "Move any claim without a direct source to **Unverified**." },
      ],
    },
  ],
  tryNow: {
    heading: "Find the posts worth opening",
    introduction: "Start with Grok Bot, or enter a public topic relevant to your work.",
    prompt: grokResearchPrompt("Grok Bot"),
    check: "Open two post links. Check their dates and words, and confirm any factual product claim with the original announcement.",
  },
  finish: "You can now spot the public posts worth reviewing without treating reactions as verified facts.",
  related: [
    promptGuide("review-grok-suggestions", "When should Grok Bot ask you first?", "Choose which Bot actions need your approval."),
    promptGuide("get-better-professional-writing-from-grok", "Can Grok Bot take one recurring check off your plate?", "Test a source-linked brief before repeating it."),
    existingGuide("what-is-a-prompt", "Write a prompt that gets a useful answer", "Build another instruction with a clear evidence check.", "/images/guides/what-is-a-prompt.webp"),
  ],
});

export const kimiValueGuide = makeGuide({
  slug: "is-kimi-worth-paying-for",
  promptMode: "as-written",
  title: "Is Kimi worth paying for your work?",
  promise: "Try one useful file, check the result and see if your current credits cover the work you would repeat.",
  coverAlt: "The Blue Princess weighing one finished work result against a meter of remaining usage",
  seoDescription: "Test a useful task in Kimi Sheets and check your own credit use before deciding if a paid Kimi plan is worthwhile.",
  sources: [
    { label: "Kimi: Membership plans and usage details", url: "https://www.kimi.com/en/help/membership/membership-overview" },
    { label: "Kimi: Membership credit rules", url: "https://www.kimi.com/en/help/membership/membership-update-rules" },
    { label: "Kimi: Sheets workflow", url: "https://www.kimi.com/en/help/docs-and-sheets/docs-and-sheets-overview" },
  ],
  answer: [
    "**Start with the result, not the plan list.** If Kimi cannot make a file you would use, more credits will not fix that. If it can, check how much of your current allowance that job used before paying.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Try it before you choose a plan",
      introduction: "The example is a task tracker made with Kimi Sheets. If you have already made one, use that result and move to the checks.",
      steps: [
        { title: "Make one useful file", body: "Open **Kimi Sheets**, sign in and send the full sample instruction below. Do not use private work data for this first test." },
        { title: "Check the file", body: "Open the preview and download the Excel file. Check the 3 tasks, editable status choices and overdue result. If those do not work, fix the file before judging the plan." },
        { title: "Find the credit use", body: "Open your Kimi account’s **Membership Plan** and **Usage Details**. Note how much this task used and when your credits refresh. Kimi features share one monthly credit pool." },
        { title: "Look at the price you would pay", body: "Open Kimi’s current plan page in your region. Compare its price and allowance with how often you would make this kind of file. Do not assume a bigger plan saves time if the first result needed heavy repair." },
      ],
    },
    {
      kind: "cards",
      heading: "Choose from what happened",
      items: [
        { title: "Keep your current plan", body: "The file works and your current allowance covers how often you need it." },
        { title: "Consider paying", body: "The file works, you need it often, and your current allowance falls short. Check the live price and paid allowance before buying." },
        { title: "Wait", body: "The file needs major repair, or you cannot see the real cost and usage yet." },
      ],
    },
  ],
  tryNow: {
    heading: "Make a file you can judge",
    introduction: "Try this fictional task in Kimi Sheets. If you completed the companion tracker guide, use that file instead of running it again.",
    prompt: `Create one editable Excel task tracker for a fictional team launch. Use exactly these 3 tasks:\n\n1. Finalise launch copy | Owner: Marketing | Due: 2 business days from today | Status: In progress\n2. Approve visuals | Owner: Design | Due: 4 business days from today | Status: Waiting\n3. Test the signup form | Owner: Operations | Due: 6 business days from today | Status: Not started\n\nMake one sheet called Tasks with columns Task, Owner, Due date, Status and Overdue. Use real spreadsheet dates. Add a Status dropdown with Not started, In progress, Waiting and Done. Overdue should calculate Yes only when the due date is before today and Status is not Done; otherwise show No. Use a formula, not typed results.\n\nKeep the file editable and leave room for more tasks. Do not invent additional tasks or people. Show me a preview and give me the .xlsx file. Before finishing, check that all 3 rows are present and that changing a task to Done removes any overdue flag. If a dropdown or formula does not work, tell me plainly.`,
    check: "You can change a status in the downloaded file and the overdue result responds correctly.",
  },
  finish: "You can now judge Kimi from a checked file, your own usage and the price shown to you.",
  related: [
    promptGuide("make-work-tracker-with-kimi", "Make a work tracker with Kimi", "Follow the complete tracker exercise one step at a time."),
    existingGuide("which-ai-tool-for-what", "Which AI tool fits the job?", "See what else could handle the work you need done.", "/images/guides/which-ai-tool-for-what.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Check what work data can go into an AI tool.", "/images/guides/learn-master.webp"),
  ],
});

export const kimiTaskTrackerGuide = makeGuide({
  slug: "make-work-tracker-with-kimi",
  promptMode: "as-written",
  title: "Make a work tracker with Kimi",
  promise: "Turn a short task list into an Excel tracker you can open and update at work.",
  cover: "/images/guides/make-work-tracker-with-kimi.webp",
  coverAlt: "The Blue Princess checking one organised set of work files",
  seoDescription: "Use Kimi Sheets to create a practical Excel task tracker from a plain-English brief, then check and download the file.",
  sources: [
    { label: "Kimi Docs and Sheets overview", url: "https://www.kimi.com/en/help/docs-and-sheets/docs-and-sheets-overview" },
    { label: "Kimi Sheets use cases", url: "https://www.kimi.com/en/help/docs-and-sheets/docs-and-sheets-sheets-cases" },
  ],
  answer: [
    "**You do not need to code.** Give Kimi Sheets a few example tasks and ask for an editable tracker. Check the rows and status rules before you use it with real work.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Make a tracker you can use",
      introduction: "Start with sample launch tasks. Replace them with your own work after you have checked the file.",
      steps: [
        { title: "Open Kimi Sheets", body: "Open **Kimi Sheets** in your browser and sign in. You can also open Kimi and choose **Sheets** from its sidebar. Do not upload a private work file for this first try." },
        { title: "Make the tracker", body: "Copy the complete instruction below and paste it into Kimi Sheets. It uses 3 made-up launch tasks so you can see a real example without sharing work data." },
        { title: "Check the preview", body: "Kimi should show an editable spreadsheet. Check that the 3 tasks are present, the due dates are real date cells and the status choices work. If something is missing, ask Kimi to fix that exact part." },
        { title: "Download and test", body: "Download the **.xlsx** file and open it in Excel or another spreadsheet app. Change one task to **Done** and check that it is not marked overdue. Add one task of your own only when you know your organisation allows this tool and data." },
      ],
    },
    {
      kind: "cards",
      heading: "What a usable file needs",
      items: [
        { title: "Your 3 tasks", body: "No invented people, tasks or claims beyond the sample rows." },
        { title: "Status you can change", body: "A task can move between Not started, In progress, Waiting and Done." },
        { title: "An overdue check", body: "A past-due task is flagged unless its status is Done." },
      ],
    },
  ],
  tryNow: {
    heading: "Give Kimi the work, not a spreadsheet formula",
    introduction: "The sample uses a small launch. Replace the task names later if you want to reuse the tracker.",
    prompt: `Create an editable Excel task tracker for a small team launch. Use only these 3 fictional tasks as the starting rows:\n\n1. Finalise launch copy | Owner: Marketing | Due: 2 business days from today | Status: In progress | Next action: Review the draft\n2. Approve visuals | Owner: Design | Due: 4 business days from today | Status: Waiting | Next action: Get final approval\n3. Test the signup form | Owner: Operations | Due: 6 business days from today | Status: Not started | Next action: Submit a test entry\n\nMake one sheet called Tasks with these columns: Task, Owner, Due date, Status, Next action, Overdue. Put each task in its own row. State which date you used as today, and use actual spreadsheet dates in the Due date cells, not text such as “2 business days”.\n\nAdd a Status dropdown with these choices: Not started, In progress, Waiting, Done. Make the Overdue column calculate Yes only when the due date is before today and Status is not Done; otherwise show No. Use a formula, not a manually typed answer. Make the heading row easy to scan, freeze it, and leave room for more rows.\n\nDo not invent other tasks, owners or business facts. Before giving me the file, check that all 3 rows are present, each due date is a date, and a task set to Done is not flagged overdue. Show me a preview and provide the editable .xlsx file. If you cannot make a status dropdown or working overdue formula, tell me which part failed instead of claiming it works.`,
    check: "The workbook has the 3 sample rows, editable status choices, actual date cells and a working overdue rule after download.",
  },
  finish: "You have a task tracker you can inspect, download and adapt to approved work.",
  related: [
    promptGuide("is-kimi-worth-paying-for", "Is Kimi worth paying for?", "Decide if you need it often enough to pay."),
    existingGuide("check-copilot-excel-edits", "Check Copilot's Excel edits", "Compare another way to work with a spreadsheet.", "/images/guides/check-copilot-excel-edits.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Check which work data can go into an AI tool.", "/images/guides/learn-master.webp"),
  ],
});

export const manusCreditTestGuide = makeGuide({
  slug: "test-manus-without-burning-credits",
  title: "How do you test Manus without burning credits on an unfinished result?",
  promise: "Make the first task small, public and easy to check before you connect accounts or ask for larger work.",
  coverAlt: "The Blue Princess placing a single coin into a machine that must produce one checked table",
  seoDescription: "Test Manus with one bounded public-source task before spending credits on a larger workflow.",
  sources: [
    { label: "Manus: Credits and usage", url: "https://help.manus.im/en/collections/11420097-credits-billing" },
    { label: "Manus: Task modes", url: "https://help.manus.im/en/collections/15921195-functions-modes" },
  ],
  answer: [
    "**Start with one source, one result and one finish line.** A broad request can spend credits while still leaving you with nothing you can check or use.",
  ],
  sections: [
    {
      kind: "cards",
      heading: "A safe first test has five limits",
      items: [
        { title: "One public source", body: "Use an article you already understand." },
        { title: "One output", body: "Ask for one table, not slides, a website and extra files." },
        { title: "One finish line", body: "Every row must trace back to the source." },
        { title: "No account access", body: "Do not connect a login or browser for this first test." },
        { title: "A known credit balance", body: "Check the current balance before you begin." },
      ],
    },
    {
      kind: "steps",
      heading: "Judge the result before the polish",
      introduction: "A polished table with untraceable claims is unfinished.",
      steps: [
        { title: "Open the source", body: "Check all five rows against the original article." },
        { title: "Mark unsupported rows", body: "Do not accept a claim because the table looks professional." },
        { title: "Repeat the same task", body: "Run the identical request 3 times. Record whether each run finishes, keeps the source rule and produces 5 traceable rows." },
        { title: "Record credits after checking", body: "Add the credits used across all 3 runs, then compare the cost with the number of usable results." },
      ],
    },
  ],
  tryNow: {
    heading: "Run one bounded Manus task",
    introduction: "Choose a public article and replace its URL.",
    prompt: `Use only this public source: [ARTICLE URL].\n\nCreate one table with exactly 5 rows and these columns:\n- Claim\n- Evidence quoted or paraphrased from the source\n- Section or heading where it appears\n- Needs checking: Yes or No\n\nDo not browse for additional sources. Do not create slides, a website or extra files. If the source cannot support 5 rows, stop and explain what is missing.\n\nThe task is complete only when the table has 5 traceable rows and every row can be checked against the source.`,
    check: "You are done when all 3 runs have been checked, you know how many results were usable and you know the total credits consumed.",
  },
  finish: "You can now decide whether Manus deserves a larger task without guessing from an unfinished experiment.",
  related: [
    promptGuide("manus-browser-workflow", "When does a Manus browser workflow make sense?", "Choose whether a connected browser is justified."),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Check what belongs outside a connected task.", "/images/guides/learn-master.webp"),
    promptGuide("is-kimi-worth-paying-for", "Is Kimi worth paying for?", "Compare value using completed work rather than features."),
  ],
});

export const manusBrowserWorkflowGuide = makeGuide({
  slug: "manus-browser-workflow",
  promptMode: "as-written",
  title: "Does Manus need your browser at all?",
  promise: "Use the cloud browser for public work, a connector for one supported service, and Browser Operator only when the task truly needs your signed-in browser.",
  coverAlt: "The Blue Princess choosing between a public cloud browser, one connector key and a guarded local browser door",
  seoDescription: "Choose the safest Manus browser route and test one controlled workflow before granting account access.",
  sources: [
    { label: "Manus: Browser Operator", url: "https://manus.im/blog/manus-browser-operator" },
    { label: "Manus: Connectors", url: "https://help.manus.im/en/articles/12231777-how-can-i-use-manus-connectors" },
    { label: "Manus: Take over the browser", url: "https://help.manus.im/en/articles/11711218-how-can-i-take-over-manus-browser-or-vs-code" },
  ],
  answer: [
    "**Choose the smallest access route that can finish the job.** Public research does not need your signed-in browser. One supported service may need a connector. Browser Operator is for pages that depend on your existing browser session.",
  ],
  sections: [
    {
      kind: "comparison",
      heading: "Choose the route",
      columns: ["Route", "Use it when"],
      rows: [
        ["Cloud browser", "The task uses public pages and no account."],
        ["Connector", "One supported service can provide the needed data or action."],
        ["Browser Operator", "The task must use a page already signed in inside your authorised Chrome or Edge browser."],
      ],
    },
    {
      kind: "steps",
      heading: "Test Browser Operator with control",
      introduction: "Use a harmless read-only job before any form, message, purchase or deletion.",
      steps: [
        { title: "Stop before connecting", body: "Confirm the exact account, site and read-only task. If public browsing can answer the question, keep the browser disconnected." },
        { title: "Turn on My Browser", body: "Open Manus connectors, enable **My Browser** and authorise the browser only when the task requests it." },
        { title: "Use a new task tab", body: "Watch the dedicated tab and confirm it opened the intended site and account." },
        { title: "Intervene when needed", body: "Click into the tab to take control. Close the task tab to stop the browser work immediately." },
        { title: "Remove access afterwards", body: "When the job is done, close the task tab and review the access you granted in Manus and your browser. Remove any connection you no longer need." },
      ],
    },
    {
      kind: "prose",
      heading: "Keep the first workflow read-only",
      paragraphs: [
        "Ask Manus to open one page and extract three visible, non-confidential facts. Do not let the first test send a message, submit a form, change a record, buy anything or delete anything.",
      ],
      keyLine: "If a connector can do the same job with narrower access, use the connector.",
    },
  ],
  tryNow: {
    heading: "Set the boundary before authorising",
    introduction: "Replace the page and three fields with a harmless example in an account you may use.",
    prompt: `Open [PAGE] in my authorised browser.\n\nRead only. Return these 3 visible fields: [FIELD 1], [FIELD 2] and [FIELD 3].\n\nDo not open another account, send a message, submit a form, change a record, download a file, make a purchase or delete anything.\n\nStop after showing the 3 fields and the page URL.`,
    check: "You are done when Manus used the intended page, returned only the three fields and stopped without taking another action.",
  },
  finish: "You can now choose between public browsing, a narrow connector and a local browser session from the access the job actually needs.",
  related: [
    comingNextGuide("test-manus-without-burning-credits", "How do you test Manus without wasting credits?", "Prove one small result before connecting accounts."),
    existingGuide("what-is-an-ai-browser", "What is an AI browser?", "Understand what an AI browser can see and do.", "/images/guides/what-is-an-ai-browser.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Check what stays outside connected work.", "/images/guides/learn-master.webp"),
  ],
});

export const switchToMistralGuide = makeGuide({
  slug: "switch-from-chatgpt-to-mistral",
  title: "Should you switch from ChatGPT to Mistral?",
  promise: "Run the same small job in both tools and decide from usable work, checking effort and the account terms that fit your work.",
  coverAlt: "The Blue Princess passing one fact sheet through two different workbenches and comparing the results",
  seoDescription: "Compare ChatGPT and Mistral on the same checked workplace task before switching tools.",
  sources: [
    { label: "Mistral: Le Chat", url: "https://mistral.ai/products/le-chat" },
    { label: "Mistral: Help centre", url: "https://help.mistral.ai/" },
  ],
  answer: [
    "**The better tool is the one that finishes your repeated task with less correction and acceptable data handling.** One attractive answer is a reason to retest, not a reason to move all your work.",
  ],
  sections: [
    {
      kind: "walkthrough",
      heading: "Use one invented fact sheet",
      introduction: "Paste the same source and instruction into a new ChatGPT chat and a new Le Chat conversation.",
      blocks: [
        { kind: "list", items: ["42 people registered", "31 attended", "24 completed the exercise", "November is proposed but not approved", "No satisfaction survey was run"] },
      ],
    },
    {
      kind: "cards",
      heading: "Compare what you can check",
      items: [
        { title: "Facts", body: "Did it preserve all five facts?" },
        { title: "Restraint", body: "Did it avoid invented feedback, causes or percentages?" },
        { title: "Status", body: "Is November clearly labelled as proposed?" },
        { title: "Repair", body: "How many edits were needed before the update was usable?" },
      ],
    },
  ],
  tryNow: {
    heading: "Run the same comparison",
    introduction: "Use the fact sheet above in both tools.",
    prompt: `Write a 120-word update for the programme owner.\n\nInclude attendance and completion numbers, state clearly that November is only proposed, and identify one question the owner still cannot answer from the notes.\n\nUse only the source notes. Do not invent feedback, causes or percentages.`,
    check: "You are done when your Switch, Keep both or Stay decision is tied to the same repeated job and a checked result.",
  },
  finish: "You can now choose a tool from the quality and effort of one real job rather than a general model ranking.",
  related: [
    promptGuide("is-mistral-pro-worth-it", "Is Mistral Pro worth paying for?", "Test whether a paid plan removes a real blocker."),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Check what is safe to use in either service.", "/images/guides/learn-master.webp"),
    existingGuide("which-ai-tool-for-what", "Which AI tool should you use for what?", "Choose a tool from the job rather than the brand.", "/images/guides/which-ai-tool-for-what.webp"),
  ],
});

export const mistralProValueGuide = makeGuide({
  slug: "is-mistral-pro-worth-it",
  title: "Is Mistral Pro worth paying for?",
  promise: "Name the repeated job the free plan stops, then check whether the current paid plan changes that exact job.",
  coverAlt: "The Blue Princess using one measured key to open a machine blocked by a clear usage limit",
  seoDescription: "Decide whether Mistral Pro is worth paying for by testing one repeated blocker against the current plan.",
  sources: [
    { label: "Mistral: Current pricing and plan features", url: "https://mistral.ai/pricing/" },
    { label: "Mistral: Usage and limits", url: "https://docs.mistral.ai/admin/billing-usage/usage-limits" },
  ],
  answer: [
    "**Upgrade for a repeated blocker, not a longer feature list.** The current paid plan must remove a limit that affects work you do often enough to justify its price.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Start with the blocker",
      introduction: "If you cannot name the blocked job, keep the current plan until a real limit appears.",
      steps: [
        { title: "Name the job", body: "Write the exact repeated task you cannot finish reliably." },
        { title: "Name the limit", body: "Record the message, allowance or missing capability you can see." },
        { title: "Check today’s plan", body: "Record the current price and the exact wording that addresses the limit. “More” is not the same as unlimited." },
        { title: "Run the smallest test", body: "Use public or invented input and define a visible finish line first." },
      ],
    },
    {
      kind: "cards",
      heading: "Decide",
      items: [
        { title: "Upgrade", body: "The plan removes a repeated blocker and the value exceeds the current cost." },
        { title: "Wait", body: "The benefit is unclear or the need is occasional." },
        { title: "Skip", body: "The real problem is result quality, unclear instructions or heavy checking." },
      ],
    },
  ],
  tryNow: {
    heading: "Write the upgrade test",
    introduction: "Complete the sentence before opening the pricing page.",
    prompt: `I cannot reliably finish [REPEATED JOB] on my current Mistral plan because [VISIBLE LIMIT OR MISSING CAPABILITY]. I need to do this [FREQUENCY].\n\nCurrent price shown to me: [PRICE]\nCurrent plan wording that may solve it: [EXACT WORDING]\nSmall test result: [RESULT]\nChecking time: [MINUTES]\n\nWrite an Upgrade, Wait or Skip decision using only these facts.`,
    check: "You are done when the decision names one blocked job, one current plan difference, one test result and the price shown to you.",
  },
  finish: "You can now separate a real paid-plan benefit from a problem that a subscription will not solve.",
  related: [
    comingNextGuide("switch-from-chatgpt-to-mistral", "Should you switch from ChatGPT to Mistral?", "Compare the tools on one checked task."),
    existingGuide("which-ai-tool-for-what", "Which AI tool fits the job?", "Check if another tool already covers the work.", "/images/guides/which-ai-tool-for-what.webp"),
    promptGuide("is-kimi-worth-paying-for", "Is Kimi worth paying for?", "Use the same completed-work test for another plan."),
  ],
});

export const metaBusinessAgentGuide = makeGuide({
  slug: "test-meta-business-agent-customer-replies",
  title: "Should you let Meta Business Agent answer your customers?",
  promise: "Test five ordinary questions in one practice chat and keep automatic replies paused until every answer is safe and correct.",
  coverAlt: "The Blue Princess checking five customer reply cards before opening a guarded message gate",
  seoDescription: "Test Meta Business Agent customer replies in WhatsApp Business before allowing a wider live rollout.",
  sources: [
    { label: "Meta: Be There for Every Customer With Meta Business Agent", url: "https://about.fb.com/news/2026/06/meta-business-agent/" },
    { label: "WhatsApp: How to set up Meta Business Agent", url: "https://faq.whatsapp.com/1153795669452207/?cms_platform=web" },
  ],
  answer: [
    "**Do not switch on automatic replies and hope for the best.** Prepare the correct answers first, test one practice chat and keep the agent paused if one reply is wrong or risky.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Prepare five questions",
      introduction: "Use only public business information that customers are allowed to know.",
      steps: [
        { title: "Opening hours", body: "Write the question and the exact correct answer." },
        { title: "Price", body: "Use a public price or starting price without inventing a quote." },
        { title: "Service area", body: "State the location or delivery boundary precisely." },
        { title: "Business rule", body: "Use one public cancellation, return or booking rule." },
        { title: "Human handover", body: "Add one request that must go to a person." },
      ],
    },
    {
      kind: "cards",
      heading: "Check every reply",
      items: [
        { title: "Correct", body: "It matches the answer you prepared." },
        { title: "Safe", body: "It makes no promise the business cannot keep." },
        { title: "Relevant", body: "It stays with your business and does not suggest a competitor." },
        { title: "Human when needed", body: "The fifth question is handed to a person." },
        { title: "Natural", body: "The tone is clear and does not sound robotic." },
      ],
    },
  ],
  tryNow: {
    heading: "Run one practice chat",
    introduction: "If the feature is available to your business, keep replies paused for new chats while you test.",
    prompt: `Set up a practice customer-reply test using only the approved public business information below. Do not turn on automatic replies for new customer chats.\n\nAPPROVED BUSINESS INFORMATION\n- Business name: [BUSINESS NAME]\n- Opening hours: [DAYS AND HOURS]\n- Public price or starting price: [PRICE AND WHAT IT INCLUDES]\n- Service or delivery area: [AREA]\n- Public cancellation, return or booking rule: [EXACT RULE]\n- Human handover route: [TEAM OR CONTACT METHOD]\n\nTEST QUESTIONS\n1. What time are you open on [DAY]?\n2. How much does [SERVICE OR PRODUCT] cost?\n3. Do you serve or deliver to [LOCATION]?\n4. What happens if I need to cancel or return [BOOKING OR PRODUCT]?\n5. I am unhappy and want someone to decide what happens next.\n\nREPLY RULES\n- Answer each question in no more than 3 short sentences.\n- Use only the approved information above.\n- If an answer is missing, uncertain, personal, complaint-related or needs a decision, write exactly: “I’m passing this to a person who can help.”\n- Do not invent a price, availability, delivery promise, refund, appointment or policy.\n- Do not suggest another business.\n- Do not send or publish a reply. This is a practice transcript only.\n\nOUTPUT\nCreate a table with these columns: Test question, Draft reply, Source used, Pass or Handover. After the table, list any missing business information that must be fixed before a live test.`,
    check: "You are done when all five answers are correct and the human handover works. Keep the agent paused if any answer fails.",
  },
  finish: "You can now choose to keep replies paused, retest one chat or run a small monitored live test.",
  related: [
    existingGuide("meta-ai", "What is Meta Muse?", "Keep the consumer agent separate from the business reply tool.", "/images/guides/meta-muse.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Keep customer and staff information out of the training material.", "/images/guides/learn-master.webp"),
    existingGuide("what-is-a-prompt", "Write a prompt that gets a useful answer", "Build another instruction with a visible human check.", "/images/guides/what-is-a-prompt.webp"),
  ],
});

export const deepseekWallOfTextGuide = makeGuide({
  slug: "fix-deepseek-wall-of-text",
  promptMode: "as-written",
  title: "Why did DeepSeek turn your scene into a wall of text?",
  promise: "Ask for paragraph and dialogue breaks while protecting the characters, facts and tone you already like.",
  coverAlt: "The Blue Princess cutting one dense wall of type into clear scene and dialogue panels",
  seoDescription: "Reformat a dense DeepSeek scene without losing the characters, facts or tone that already work.",
  sources: [
    { label: "DeepSeek: Web and app", url: "https://www.deepseek.com/" },
    { label: "DeepSeek: Terms of use", url: "https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html" },
  ],
  answer: [
    "**Separate formatting from rewriting.** Tell DeepSeek which facts and lines must stay, then ask only for readable paragraphs and dialogue breaks.",
  ],
  sections: [
    {
      kind: "walkthrough",
      heading: "Protect the scene first",
      introduction: "Use this short invented scene so you can see whether the method preserves meaning.",
      blocks: [
        { kind: "paragraph", text: "Mara reached the station at 7.15. The last train had gone. “You said it left at half past,” she told Ben, who checked the silent departure board. He had copied the Sunday timetable by mistake. They had 20 minutes to reach the ferry on foot." },
        { kind: "list", items: ["Mara arrives at 7.15", "The last train has gone", "Ben used the Sunday timetable", "They have 20 minutes to reach the ferry", "Keep the tense and restrained tone"] },
      ],
    },
    {
      kind: "cards",
      heading: "Check what changed",
      items: [
        { title: "Paragraphs", body: "Each beat is easier to follow." },
        { title: "Dialogue", body: "The spoken line stays attached to the right speaker." },
        { title: "Facts", body: "All four protected facts remain unchanged." },
        { title: "Voice", body: "No new description, emotion or backstory was added." },
      ],
    },
  ],
  tryNow: {
    heading: "Reformat without rewriting",
    introduction: "Paste the scene above after this instruction.",
    prompt: `Reformat this scene so it is easier to read.\n\nUse short paragraphs and place spoken dialogue on a new line when the speaker changes.\n\nKeep every character, fact, time, event, sentence meaning and the restrained tone. Do not add description, emotion, backstory or dialogue. Do not continue the scene.\n\nReturn only the reformatted scene.`,
    check: "You are done when the scene is easier to scan and every protected fact, line and tone remains intact.",
  },
  finish: "You can now repair a dense scene without inviting a new story or a different voice.",
  related: [
    promptGuide("edit-long-writing-with-deepseek", "How do you edit a long DeepSeek story safely?", "Protect approved facts while revising one passage."),
    promptGuide("review-grok-suggestions", "When should Grok Bot ask you first?", "Decide when a Bot needs to ask before acting."),
    existingGuide("what-is-a-prompt", "How to write an AI prompt that gets a useful answer", "Make the edit boundary clearer.", "/images/guides/what-is-a-prompt.webp"),
  ],
});

export const deepseekLongEditGuide = makeGuide({
  slug: "edit-long-writing-with-deepseek",
  promptMode: "as-written",
  title: "How do you edit a long DeepSeek story without losing what worked?",
  promise: "Lock the approved facts and voice, revise one selected passage, then compare it with the protected brief.",
  coverAlt: "The Blue Princess pinning protected story cards in place while revising one removable page",
  seoDescription: "Edit one passage in a long DeepSeek story while protecting characters, facts, structure and voice.",
  sources: [{ label: "DeepSeek: Web and app", url: "https://www.deepseek.com/" }],
  answer: [
    "**Do not ask for a whole-story rewrite when only one passage is weak.** Protect what already works, name the selected passage and ask for the smallest useful revision.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Build a protected brief",
      introduction: "Keep it short enough to compare with the result.",
      steps: [
        { title: "Characters", body: "List each name, role and relationship that must not change." },
        { title: "Facts", body: "List dates, locations, events and objects that the passage must preserve." },
        { title: "Voice", body: "Name the tense, point of view and tone." },
        { title: "Edit target", body: "Paste only the passage that needs work and state the one problem to fix." },
      ],
    },
    {
      kind: "comparison",
      heading: "Compare before accepting",
      columns: ["Check", "Accept only when"],
      rows: [
        ["Character", "Names, roles and relationships are unchanged."],
        ["Continuity", "Every protected fact still matches."],
        ["Voice", "Tense, point of view and tone remain stable."],
        ["Scope", "Only the named problem was repaired."],
      ],
    },
  ],
  tryNow: {
    heading: "Revise one passage",
    introduction: "Replace the brackets with your brief and one selected passage.",
    prompt: `Protected brief\nCharacters: [NAMES, ROLES AND RELATIONSHIPS]\nFacts that must not change: [FACTS]\nVoice: [TENSE, POINT OF VIEW AND TONE]\n\nEdit target\nProblem to fix: [ONE PROBLEM]\nPassage: [PASTE ONE PASSAGE]\n\nRevise only the pasted passage. Preserve the protected brief. Do not continue the story, add a character, change an event or rewrite another section.\n\nAfter the revision, list each factual or structural change you made.`,
    check: "You are done when the selected problem is fixed and the character, continuity, voice and scope checks all pass.",
  },
  finish: "You can now make a controlled long-form edit without sacrificing the parts you already approved.",
  related: [
    promptGuide("fix-deepseek-wall-of-text", "Why did DeepSeek create a wall of text?", "Fix readability before changing the story."),
    promptGuide("review-grok-suggestions", "When should Grok Bot ask you first?", "Set clear boundaries before the Bot acts."),
    existingGuide("what-is-a-prompt", "Write a prompt that gets a useful answer", "Adapt the same checking habit to another task.", "/images/guides/what-is-a-prompt.webp"),
  ],
});

export const modelSeriesGuides = [
  makeChatgptAnswersShorterGuide,
  stopChatgptForgettingContextGuide,
  chatgptScheduledTasksGuide,
  geminiDriveFileGuide,
  geminiTasksGuide,
  copilotExcelGuide,
  reviewGrokSuggestionsGuide,
  grokProfessionalWritingGuide,
  verifyGrokResearchGuide,
  kimiValueGuide,
  kimiTaskTrackerGuide,
  manusCreditTestGuide,
  manusBrowserWorkflowGuide,
  switchToMistralGuide,
  mistralProValueGuide,
  metaBusinessAgentGuide,
  deepseekWallOfTextGuide,
  deepseekLongEditGuide,
] as const;
