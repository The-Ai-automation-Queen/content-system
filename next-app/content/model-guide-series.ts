import type { GuidePage, GuideRelated, GuideSection } from "./guide-page";

export type SeriesGuide = {
  slug: string;
  title: string;
  promise: string;
  coverAlt: string;
  seoDescription: string;
  sources: readonly { label: string; url: string }[];
  answer: readonly [string, ...string[]];
  sections: readonly GuideSection[];
  tryNow: NonNullable<GuidePage["tryNow"]>;
  finish: string;
  related: readonly [GuideRelated, GuideRelated, GuideRelated];
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
  cover: `/images/guides/${guide.slug}.webp`,
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

export const existingGuide = (slug: string, title: string, reason: string, cover: string): GuideRelated => ({ slug, title, reason, cover });

export const makeChatgptAnswersShorterGuide = makeGuide({
  slug: "make-chatgpt-answers-shorter",
  promptMode: "as-written",
  title: "Why does ChatGPT keep giving you an essay?",
  promise: "Tell ChatGPT exactly what a short answer must contain, compare the result and keep the rule only if the answer becomes easier to use.",
  coverAlt: "The small blue robot trimming an overflowing paper scroll into a compact work brief",
  seoDescription: "A practical test for making ChatGPT answers shorter without losing the useful parts.",
  sources: [
    { label: "OpenAI: Custom Instructions", url: "https://help.openai.com/en/articles/8096356-custom-instructions-for-chatgpt" },
  ],
  answer: [
    "**ChatGPT needs a visible limit.** “Be concise” is vague. Ask for a fixed number of items, a word limit and the parts it must leave out.",
  ],
  sections: [
    {
      kind: "comparison",
      heading: "Replace a vague request with a visible finish line",
      columns: ["Too vague", "Easy to check"],
      rows: [
        ["Be concise.", "Use 5 bullets, one sentence each."],
        ["Tell me what matters.", "Give me 3 questions, 2 decisions and one closing sentence."],
        ["Do not ramble.", "No introduction, conclusion or offer to do more."],
      ],
    },
    {
      kind: "cards",
      heading: "Check the answer, not the tone",
      items: [
        { title: "Count the parts", body: "There should be exactly **3 questions and 2 decisions**." },
        { title: "Count the words", body: "The complete answer should stay below **90 words**." },
        { title: "Find the action", body: "The closing sentence should be usable as written." },
        { title: "Remove extras", body: "Delete scene-setting, repetition and offers you did not request." },
      ],
    },
  ],
  tryNow: {
    heading: "Try the difference",
    introduction: "Paste this complete example into a new ChatGPT conversation.",
    prompt: `I need to prepare for a 20-minute project check-in.\n\nGive me:\n1. the 3 questions I should ask;\n2. the 2 decisions the meeting must produce;\n3. one sentence I can use to close the meeting.\n\nUse no introduction, no conclusion and no more than 90 words.`,
    check: "You are done when the answer fits the stated limit and contains every requested item.",
  },
  finish: "You now have a response rule you can reuse when an answer is longer than the job requires.",
  related: [
    promptGuide("stop-chatgpt-forgetting-context", "Why does ChatGPT forget what you told it?", "Keep stable information available across related chats."),
    promptGuide("chatgpt-scheduled-tasks", "Can ChatGPT do a repeated check for you?", "Turn one public check into a quiet scheduled task."),
    existingGuide("what-is-a-prompt", "How to write an AI prompt that gets a useful answer", "Build a clear instruction from a complete example.", "/images/guides/what-is-a-prompt.webp"),
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
        { title: "Add the fixed facts", body: "Open the Project settings and add the instruction in the practice section below." },
        { title: "Start a chat inside it", body: "Ask for an 80-word event description that includes the audience, format and outcome." },
        { title: "Compare outside the Project", body: "Open a normal new chat and send only the drafting request. Compare what the Project brief contributed." },
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
    check: "You are done when a new chat inside the Project keeps all four facts and leaves undecided details undecided.",
  },
  finish: "You can now judge whether a short Project brief reduces repeated corrections for work that continues.",
  related: [
    promptGuide("make-chatgpt-answers-shorter", "Why does ChatGPT keep giving you an essay?", "Make the next Project answer easier to scan."),
    promptGuide("chatgpt-scheduled-tasks", "Can ChatGPT do a repeated check for you?", "Use a separate route for recurring public checks."),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Set the data boundary before adding real Project files.", "/images/guides/learn-master.webp"),
  ],
});

export const chatgptScheduledTasksGuide = makeGuide({
  slug: "chatgpt-scheduled-tasks",
  promptMode: "as-written",
  title: "Can ChatGPT do the boring checking for you?",
  promise: "Use a scheduled task for one public check with a clear trigger, a useful notification and an end date.",
  coverAlt: "The small blue robot princess setting a clockwork lookout beside a public noticeboard",
  seoDescription: "Create and verify one harmless scheduled task in ChatGPT without producing daily notification noise.",
  sources: [{ label: "OpenAI: Tasks in ChatGPT", url: "https://help.openai.com/en/articles/10291617-tasks-in-chatgpt" }],
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
        { title: "Add the instruction", body: "Use the complete example below and replace only the public URL, condition and end date." },
        { title: "Check the controls", body: "Review the schedule, time zone, condition and end date before confirming." },
        { title: "Test one result", body: "Open the source yourself and compare it with the reported status and check time." },
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
    prompt: `Every weekday morning, check [PUBLIC PAGE URL].\n\nNotify me only if [EXACT CONDITION] has changed since the previous check.\n\nIn the notification, include:\n- what changed;\n- the current wording or status;\n- the source link;\n- the time you checked.\n\nIf nothing changed, do not notify me. Stop this task on [END DATE].`,
    check: "You are done when the task appears in Scheduled, the notification route works and one result matches the public source.",
  },
  finish: "You can now decide whether the repeated check deserves a scheduled task or should stay manual.",
  related: [
    promptGuide("make-chatgpt-answers-shorter", "Why does ChatGPT keep giving you an essay?", "Keep task notifications short and usable."),
    promptGuide("stop-chatgpt-forgetting-context", "Why does ChatGPT forget what you told it?", "Use Projects for continuing context rather than schedules."),
    existingGuide("connect-ai-to-email-files-calendar", "Should you connect AI to your accounts?", "Check permissions before scheduling connected work.", "/images/guides/connect-ai-to-email-files-calendar.webp"),
  ],
});

export const geminiDriveFileGuide = makeGuide({
  slug: "gemini-cannot-find-drive-file",
  title: "Why can’t Gemini see the file that is already in your Drive?",
  promise: "Check the account and connection first, then test one clearly named demo file before rewriting the request again.",
  coverAlt: "The Blue Princess tracing one document through a maze of account keys and file drawers",
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
        { title: "File support", body: "If it still fails, test a supported document, spreadsheet, presentation or PDF rather than an image or video." },
      ],
    },
    {
      kind: "prose",
      heading: "If Drive does not appear",
      paragraphs: [
        "With a work or school account, your Workspace edition, Gemini access, activity setting or administrator policy may block the connection. Ask your administrator to check those four items for your account.",
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
    promptGuide("gemini-google-tasks-limits", "Can Gemini organise Google Tasks by project?", "Test another connected Google boundary."),
    existingGuide("gemini", "Should you use Gemini?", "See where the Gemini app and Google Workspace features fit.", "/images/guides/gemini.webp"),
    existingGuide("connect-ai-to-email-files-calendar", "Should you connect AI to your accounts?", "Review the access you grant to files and email.", "/images/guides/connect-ai-to-email-files-calendar.webp"),
  ],
});

export const geminiTasksGuide = makeGuide({
  slug: "gemini-google-tasks-limits",
  title: "Can Gemini organise your Google Tasks by project?",
  promise: "Test whether Gemini can preserve the list that separates your projects before you rely on it to organise real tasks.",
  coverAlt: "The Blue Princess sorting three task cards into two separate mechanical trays",
  seoDescription: "Test whether Gemini can retrieve Google Tasks and identify the project list for each task.",
  sources: [{ label: "Google: Use Google Tasks with Gemini Apps", url: "https://support.google.com/gemini/answer/15330265" }],
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
    promptGuide("gemini-cannot-find-drive-file", "Why can’t Gemini see your Drive file?", "Diagnose another connected Google problem."),
    existingGuide("gemini", "Should you use Gemini?", "Choose the part of Gemini that matches the job.", "/images/guides/gemini.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Keep private task details outside an unapproved account.", "/images/guides/learn-master.webp"),
  ],
});

export const copilotExcelGuide = makeGuide({
  slug: "check-copilot-excel-edits",
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
        { kind: "table", rows: [["Item", "Units × Price"], ["Pens", "10 × 2 = 20"], ["Notebooks", "5 × 6 = 30"], ["Folders", "8 × 3 = 24"]] },
        { kind: "note", icon: "check", text: "Use formulas in the Total column: =B2*C2, =B3*C3 and =B4*C4." },
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
    prompt: `Change only the Units value for Notebooks from 5 to 6.\n\nDo not change any other number, label or formula. Before I accept the edit, tell me which cell you changed.`,
    check: "You are done when only the requested cell changed, the formula still works and all three totals are correct.",
  },
  finish: "You now have a repeatable way to check a small Copilot edit before trusting it with a larger workbook.",
  related: [
    existingGuide("copilot", "Should you use Copilot?", "Choose the Microsoft Copilot that fits your account and work.", "/images/guides/copilot.webp"),
    existingGuide("what-is-a-prompt", "Write a prompt that gets a useful answer", "Give the tool a clearer job and a result you can check.", "/images/guides/what-is-a-prompt.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Protect workbook data before using connected tools.", "/images/guides/learn-master.webp"),
  ],
});

export const reviewGrokSuggestionsGuide = makeGuide({
  slug: "review-grok-suggestions",
  title: "Did Grok catch an error or rewrite your work into something else?",
  promise: "Sort every suggestion into a factual correction, an optional improvement or a change you did not ask for.",
  coverAlt: "The Blue Princess sorting marked pages into correction, option and reject trays",
  seoDescription: "Review Grok writing suggestions without accepting factual changes or broad rewrites you did not request.",
  sources: [{ label: "xAI: Grok consumer FAQ", url: "https://x.ai/legal/faq" }],
  answer: [
    "**Judge one suggestion at a time.** A factual correction needs evidence, an optional improvement needs your preference, and a rewrite outside the request should be rejected.",
  ],
  sections: [
    {
      kind: "walkthrough",
      heading: "Use one paragraph and one fact sheet",
      introduction: "The example is invented, so every factual change can be checked.",
      blocks: [
        { kind: "paragraph", text: "Paragraph: The pilot ran from 3 to 14 June. Twelve managers joined. Nine completed the final exercise. The team will decide in July whether to repeat the session. A recording was promised to every participant." },
        { kind: "list", items: ["Pilot dates: 3 to 14 June", "Participants: 12", "Completed: 9", "Repeat decision: July", "Recording: discussed, not promised"] },
      ],
    },
    {
      kind: "cards",
      heading: "Sort every suggestion",
      items: [
        { title: "Correction", body: "It fixes a claim that conflicts with the fact sheet." },
        { title: "Optional", body: "It improves clarity without changing the meaning." },
        { title: "Reject", body: "It adds facts, changes the scope or rewrites more than requested." },
      ],
    },
  ],
  tryNow: {
    heading: "Ask for the smallest useful review",
    introduction: "Paste the sample paragraph above this instruction.",
    prompt: `Review this paragraph only for:\n1. contradictions;\n2. unclear wording;\n3. claims that need a source.\n\nFor each suggestion, quote the exact sentence, name the problem and propose the smallest possible change. Do not change the purpose, tone, dates or structure. Do not rewrite the whole paragraph.`,
    check: "You are done when every accepted factual change matches the fact sheet and no accepted suggestion exceeds the review scope.",
  },
  finish: "You can now separate a useful correction from a stylistic preference or an unwanted rewrite.",
  related: [
    promptGuide("get-better-professional-writing-from-grok", "Why is Grok’s professional writing too thin?", "Give the next draft a stronger structure."),
    promptGuide("verify-grok-current-research", "Can Grok research a current topic safely?", "Keep public conversation separate from verified facts."),
    existingGuide("what-is-a-prompt", "Write a prompt that gets a useful answer", "Use the same checking habit with a complete instruction.", "/images/guides/what-is-a-prompt.webp"),
  ],
});

export const grokProfessionalWritingGuide = makeGuide({
  slug: "get-better-professional-writing-from-grok",
  title: "Why is Grok’s professional writing too thin?",
  promise: "Give Grok the reader, decision, evidence and structure, then decide whether the improved draft is worth keeping.",
  coverAlt: "The Blue Princess rebuilding a thin paper draft around four solid evidence blocks",
  seoDescription: "Turn a vague Grok writing request into a structured workplace draft and judge the result.",
  sources: [{ label: "xAI: Grok", url: "https://x.ai/grok" }],
  answer: [
    "**Professional writing needs more than a topic.** Name the reader, the decision, the evidence and the structure you need.",
  ],
  sections: [
    {
      kind: "comparison",
      heading: "See what the stronger instruction adds",
      columns: ["Vague", "Useful"],
      rows: [
        ["Write a professional update.", "Write for the operations director."],
        ["Explain the pilot.", "Recommend whether to continue it for one month."],
        ["Make it convincing.", "Use the 4 facts provided and name the main risk."],
        ["Make it clear.", "Use recommendation, evidence, risk and next step."],
      ],
    },
    {
      kind: "cards",
      heading: "What a usable answer shows",
      items: [
        { title: "Decision", body: "The recommendation is visible immediately." },
        { title: "Evidence", body: "All four facts appear without invented benefits." },
        { title: "Risk", body: "Late pre-reading is named as a real issue." },
        { title: "Next step", body: "The action follows from the evidence." },
      ],
    },
  ],
  tryNow: {
    heading: "Build the draft around evidence",
    introduction: "Use this complete work example.",
    prompt: `Write a short recommendation for an operations director about whether to continue a meeting pilot.\n\nUse only these facts:\n- 18 people joined the pilot.\n- 14 used the new agenda.\n- 3 meetings were delayed because pre-reading arrived late.\n- The team wants to continue for one month.\n\nStructure:\n1. recommendation;\n2. evidence;\n3. risk;\n4. next step.\n\nDo not invent cost savings, satisfaction scores or causes.`,
    check: "You are done when you can point to the decision, evidence, risk and next step without repairing most of the draft.",
  },
  finish: "You can now keep Grok for this writing job, retest it or choose another tool based on a visible result.",
  related: [
    promptGuide("review-grok-suggestions", "Did Grok catch an error or rewrite your work?", "Review changes one at a time."),
    promptGuide("verify-grok-current-research", "Can Grok research a current topic safely?", "Trace current claims to opened sources."),
    existingGuide("what-is-a-prompt", "How to write an AI prompt that gets a useful answer", "Build clearer work instructions from examples.", "/images/guides/what-is-a-prompt.webp"),
  ],
});

export const verifyGrokResearchGuide = makeGuide({
  slug: "verify-grok-current-research",
  title: "Can Grok research a current topic without turning posts into facts?",
  promise: "Use Grok to find the conversation, then separate public reaction from claims you verified in primary sources.",
  coverAlt: "The Blue Princess tracing many speech bubbles back to one opened official document",
  seoDescription: "Use Grok for current research while keeping social posts separate from verified facts.",
  sources: [
    { label: "X: About Grok", url: "https://help.x.com/en/using-x/about-grok" },
    { label: "xAI: Grok", url: "https://x.ai/grok" },
  ],
  answer: [
    "**Grok can surface fast-moving discussion, but repetition is not proof.** Keep every important source link and mark what you could not confirm.",
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
    heading: "Research one harmless current question",
    introduction: "Avoid health, money, legal rights and personal safety for this first test.",
    prompt: `Research this current question: [QUESTION].\n\nSeparate the answer into:\n1. what people are saying;\n2. what an official or primary source confirms;\n3. what remains unverified.\n\nFor every factual claim, include the direct source link and publication date. Do not treat repeated posts as independent confirmation. Do not fill a gap with an assumption.`,
    check: "You are done when every confirmed claim has an opened source and social reaction remains separate from verified facts.",
  },
  finish: "You can now use Grok as a route into current discussion without treating the discussion itself as evidence.",
  related: [
    promptGuide("review-grok-suggestions", "Did Grok catch an error or rewrite your work?", "Sort suggestions before accepting them."),
    promptGuide("get-better-professional-writing-from-grok", "Why is Grok’s professional writing too thin?", "Turn checked evidence into a structured draft."),
    existingGuide("what-is-a-prompt", "Write a prompt that gets a useful answer", "Build another instruction with a clear evidence check.", "/images/guides/what-is-a-prompt.webp"),
  ],
});

export const kimiValueGuide = makeGuide({
  slug: "is-kimi-worth-paying-for",
  title: "Is Kimi worth paying for, or will the limits stop you working?",
  promise: "Test whether Kimi can finish one repeated job before the current limit interrupts it.",
  coverAlt: "The Blue Princess weighing one finished work result against a meter of remaining usage",
  seoDescription: "Decide whether Kimi is worth paying for by comparing completed work, checking time, limits and current price.",
  sources: [
    { label: "Kimi: Membership plans and shared credit pool", url: "https://www.kimi.com/en/help/membership/membership-overview" },
    { label: "Kimi: Additional usage", url: "https://www.kimi.com/en/help/membership/membership-extra-usage" },
    { label: "Kimi Code overview", url: "https://www.kimi.com/code/docs/en/" },
  ],
  answer: [
    "**Do not pay for a feature list.** Pay only when Kimi completes a repeated job well enough, often enough and with less checking than your current tool.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Measure one job",
      introduction: "Choose a long document, a small code change or a five-slide draft. Do not combine all three.",
      steps: [
        { title: "Record today’s offer", body: "Note the price, included credits, reset period and any visible restriction. Kimi products share one credit pool. Write **Not clear** when the allowance is unclear." },
        { title: "Use the same input", body: "Run the same public task in Kimi and the tool you already use." },
        { title: "Check the result", body: "Record whether it finished, how many corrections it needed and how long checking took." },
        { title: "Check repeatability", body: "Open **My → Membership Plan → Credits and Invoices → My Credits → Usage Details**. Compare the credits used with how often you need this task. Check the cost of any extra usage before buying it." },
      ],
    },
    {
      kind: "cards",
      heading: "Make the decision",
      items: [
        { title: "Pay", body: "Kimi completes the job better or faster, and the visible allowance supports your frequency." },
        { title: "Retest", body: "The result is promising, but the allowance or checking cost is unclear." },
        { title: "Skip", body: "The task remains unfinished, needs heavy repair or cannot be repeated within the limit." },
      ],
    },
  ],
  tryNow: {
    heading: "Write the decision from evidence",
    introduction: "Complete the fields after running the same task in both tools.",
    prompt: `Job tested: [ONE REPEATED JOB]\nUsable result completed: [YES / NO]\nCorrections needed: [NUMBER AND TYPE]\nChecking time: [MINUTES]\nCredits consumed in the shared pool: [WHAT USAGE DETAILS SHOW]\nCurrent price shown to me: [PRICE AND BILLING PERIOD]\nExtra usage cost or spending limit, if shown: [COST OR NOT SHOWN]\nFrequency I need: [FREQUENCY]\n\nBased only on this information, write a 3-sentence Pay, Retest or Skip decision.`,
    check: "You are done when the decision names the job, usable result, checking time, visible limit and current price.",
  },
  finish: "You can now decide from completed work rather than a product comparison or feature list.",
  related: [
    promptGuide("control-kimi-code-changes", "How do you stop Kimi changing extra files?", "Test the coding workflow with plan and diff controls."),
    existingGuide("kimi", "Should you use Kimi?", "See the main Kimi routes before choosing a plan.", "/images/guides/kimi.webp"),
    promptGuide("is-mistral-pro-worth-it", "Is Mistral Pro worth paying for?", "Use the same evidence-led upgrade decision."),
  ],
});

export const controlKimiCodeChangesGuide = makeGuide({
  slug: "control-kimi-code-changes",
  title: "How do you stop Kimi changing things you did not ask for?",
  promise: "Start in Plan mode, limit the task to one file and inspect the diff before you keep the change.",
  coverAlt: "The Blue Princess holding a gate across many files while allowing one marked file through",
  seoDescription: "A beginner workflow for controlling Kimi Code changes with Plan mode, one-file scope and diff review.",
  sources: [
    { label: "Kimi Code: Plan mode", url: "https://www.kimi.com/en/help/kimi-code/cli-work-modes" },
    { label: "Kimi Code Desktop: Using the app", url: "https://www.kimi.com/code/docs/en/kimi-code-desktop/using-desktop.html" },
    { label: "Kimi Code for VS Code: File change tracking", url: "https://www.kimi.com/code/docs/en/kimi-code-for-vscode/core-operations.html" },
  ],
  answer: [
    "**Control the scope before Kimi writes.** Use a disposable practice project, ask for a plan first and keep the change only after you have checked every changed file.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Use a plan-first workflow",
      introduction: "Kimi Code Desktop, CLI and VS Code can show plans and file changes. Labels can differ by product.",
      steps: [
        { title: "Open a practice copy", body: "Use a small project you can restore. Confirm Kimi opened the intended folder." },
        { title: "Enter Plan mode", body: "In Kimi Code CLI use **Shift-Tab** to switch modes, or type **/plan**. Confirm the interface says **Plan** before sending the request. In Desktop, choose **Plan** if that control is available." },
        { title: "Approve only the right plan", body: "The plan should name one file, one visible change and one check. Ask for a revision if it adds refactoring or dependencies." },
        { title: "Inspect File Changes", body: "Open the diff after execution. Keep or undo each change from the file-change view." },
      ],
    },
    {
      kind: "cards",
      heading: "Stop if the scope grows",
      items: [
        { title: "Extra files", body: "Undo the change and restate the one-file limit." },
        { title: "New dependency", body: "Do not approve it unless the task truly requires it and you understand the impact." },
        { title: "Unrequested command", body: "Read what the command does before approving it." },
      ],
    },
  ],
  tryNow: {
    heading: "Give Kimi one bounded change",
    introduction: "Replace the bracketed file and visible wording in a practice project.",
    prompt: `Work only in [FILE PATH].\n\nChange [CURRENT VISIBLE WORDING] to [NEW VISIBLE WORDING].\n\nBefore editing, show me a plan that names the file and the exact change.\n\nDo not edit any other file, install a dependency, run a deployment or change formatting outside the selected line.\n\nAfter editing, show me the diff and the shortest check that proves the visible wording changed.`,
    check: "You are done when the diff contains only the requested line and the visible result matches it. Undo the change if any other file moved.",
  },
  finish: "You now have a plan, scope and diff check that make a small Kimi Code change reviewable.",
  related: [
    promptGuide("is-kimi-worth-paying-for", "Is Kimi worth paying for?", "Measure whether the controlled workflow produces enough value."),
    existingGuide("kimi", "Should you use Kimi?", "Choose between Kimi chat and the coding tools.", "/images/guides/kimi.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Keep secrets and private repositories out of an unapproved tool.", "/images/guides/learn-master.webp"),
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
    existingGuide("manus", "Should you use Manus?", "See the main Manus routes and their boundaries.", "/images/guides/manus.webp"),
    promptGuide("is-kimi-worth-paying-for", "Is Kimi worth paying for?", "Compare value using completed work rather than features."),
  ],
});

export const manusBrowserWorkflowGuide = makeGuide({
  slug: "manus-browser-workflow",
  title: "When does a Manus browser workflow make sense?",
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
        { title: "Remove access afterwards", body: "Disable or remove the connector. Removing a connector clears its saved login information and credentials." },
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
    promptGuide("test-manus-without-burning-credits", "How do you test Manus without wasting credits?", "Prove one small result before connecting accounts."),
    existingGuide("what-is-an-ai-browser", "What is an AI browser?", "Understand what an AI browser can see and do.", "/images/guides/what-is-an-ai-browser.webp"),
    existingGuide("connect-ai-to-email-files-calendar", "Should you connect AI to your accounts?", "Check permissions and disconnection before connected work.", "/images/guides/connect-ai-to-email-files-calendar.webp"),
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
    existingGuide("mistral", "Should you use Mistral?", "See the Mistral product routes before switching.", "/images/guides/mistral.webp"),
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
    { label: "Mistral: Plans", url: "https://mistral.ai/products/le-chat" },
    { label: "Mistral: Help centre", url: "https://help.mistral.ai/" },
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
    promptGuide("switch-from-chatgpt-to-mistral", "Should you switch from ChatGPT to Mistral?", "Compare the tools on one checked task."),
    existingGuide("mistral", "Should you use Mistral?", "Understand the product family before paying.", "/images/guides/mistral.webp"),
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
    { label: "WhatsApp Business help", url: "https://faq.whatsapp.com/" },
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
    prompt: `Reformat this scene so it is easier to read.\n\nUse short paragraphs and place spoken dialogue on a new line when the speaker changes.\n\nKeep every character, fact, time, event, sentence meaning and the restrained tone. Do not add description, emotion, backstory or dialogue. Do not continue the scene.\n\nAfter the edited scene, list any words you changed.`,
    check: "You are done when the scene is easier to scan and every protected fact, line and tone remains intact.",
  },
  finish: "You can now repair a dense scene without inviting a new story or a different voice.",
  related: [
    promptGuide("edit-long-writing-with-deepseek", "How do you edit a long DeepSeek story safely?", "Protect approved facts while revising one passage."),
    existingGuide("deepseek", "Should you use DeepSeek?", "Choose the right DeepSeek route before adding longer work.", "/images/guides/deepseek.webp"),
    existingGuide("what-is-a-prompt", "How to write an AI prompt that gets a useful answer", "Make the edit boundary clearer.", "/images/guides/what-is-a-prompt.webp"),
  ],
});

export const deepseekLongEditGuide = makeGuide({
  slug: "edit-long-writing-with-deepseek",
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
    existingGuide("deepseek", "Should you use DeepSeek?", "See where DeepSeek fits before using it for long writing.", "/images/guides/deepseek.webp"),
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
  controlKimiCodeChangesGuide,
  manusCreditTestGuide,
  manusBrowserWorkflowGuide,
  switchToMistralGuide,
  mistralProValueGuide,
  metaBusinessAgentGuide,
  deepseekWallOfTextGuide,
  deepseekLongEditGuide,
] as const;
