import { comingNextGuide, existingGuide, makeGuide, promptGuide } from "./model-guide-series";

export const chatgptScreenRecordingGuide = makeGuide({
  slug: "chatgpt-screen-recording-to-process-guide",
  title: "Can ChatGPT turn a screen recording into a usable process guide?",
  promise: "Upload a short screen recording, turn what it actually shows into clear steps, then test whether someone else can follow them. A transcript and screenshots provide a fallback when video upload is unavailable.",
  coverAlt: "The Blue Princess feeding a film reel and picture cards into a press that produces an ordered instruction booklet",
  seoDescription: "Upload a clean screen recording to ChatGPT, turn visible actions into a process guide, and test the steps with someone new.",
  sources: [
    { label: "OpenAI: Video attachments and their limits", url: "https://help.openai.com/en/articles/8400551-chatgpt-image-inputs-faq" },
    { label: "OpenAI: File uploads in ChatGPT", url: "https://help.openai.com/en/articles/8555545-file-uploads-faq" },
  ],
  answer: [
    "**Yes, but treat the recording as evidence, not a finished guide.** ChatGPT can accept a video attachment where that upload method is available. It may miss actions or audio, so every written step still needs to be checked against the recording.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Prepare a recording ChatGPT can inspect",
      introduction: "Use a short practice task in a demo account or clean workspace. Do not record names, customer data, passwords or private account details.",
      steps: [
        { title: "Record one complete task", body: "Start with the screen where the task begins. Say why you make each choice and show the finished result." },
        { title: "Remove identifying details", body: "Use demo information or permanently remove names, emails, account details and notifications before uploading the recording." },
        { title: "Attach the video", body: "In ChatGPT, use **+ → Add photos & files** and choose the video. If Photos will not accept it, try **Files**. Availability depends on the account and platform." },
        { title: "Keep a fallback ready", body: "If video upload is unavailable or ChatGPT misses part of it, provide a corrected transcript and a few clean screenshots from the same recording. Do not fill gaps from memory." },
      ],
    },
    {
      kind: "cards",
      heading: "A usable process guide has four parts",
      items: [
        { title: "Starting point", body: "What must already be open, available or approved." },
        { title: "Numbered actions", body: "One action per step, using the visible button or menu name." },
        { title: "Success check", body: "What the reader should see before moving on." },
        { title: "Unclear moments", body: "A visible flag instead of a guessed instruction." },
      ],
    },
  ],
  tryNow: {
    heading: "Create a guide from the recording",
    introduction: "Attach the clean video, replace the two brackets below and copy the complete instruction.",
    prompt: `Create a process guide from the screen recording I attached.

The guide is for [WHO WILL USE IT]. The result they need is [FINISHED RESULT].

First, tell me whether you can inspect the attached video. If you cannot, stop and ask for a corrected transcript and clean screenshots. Do not claim to have watched a video you could not inspect.

Before drafting, list the actions you can actually observe in order. Give a timestamp for each video action when possible. Mark anything you cannot see or hear as “Needs clarification”. Ask me about missing decisions rather than guessing.

Then write the process guide with:
1. A short “Before you begin” checklist.
2. Numbered steps in the order shown in the recording, one user action per step.
3. The exact button, menu and field names you can verify from the source. If a label is unreadable, mark it “Needs clarification”.
4. “You should see:” after each step, naming the visible result.
5. A timestamp or source screenshot beside the step it supports, where available.
6. A 3-point final check that proves the process is complete.

Use plain English. Do not invent a click, feature, result, shortcut or reason that the source does not support. At the end, list every step that still needs a human check.`,
    instructions: [
      { title: "Open ChatGPT", body: "Start a new chat at chatgpt.com. Use a recording with no private or identifying details." },
      { title: "Attach the recording", body: "Select **+ → Add photos & files** and choose your video. Try **Files** if Photos does not offer it." },
      { title: "Copy and send", body: "Select **Copy**, paste the full instruction, replace both brackets and send it with the recording." },
      { title: "Use the fallback if needed", body: "If video upload is unavailable or ChatGPT cannot inspect it, attach a corrected transcript and clean screenshots. Keep the same checks and do not let it guess missing steps." },
    ],
    check: "Give the draft to someone who has not watched the recording. Keep it only if they can finish the practice task and the written screen checks match what they see.",
  },
  promptMode: "as-written",
  finish: "You now have a repeatable way to turn a demonstration into instructions that can be followed and checked.",
  related: [
    promptGuide("chatgpt-customer-research-with-evidence", "Can ChatGPT group customer research without inventing themes?", "Use the same evidence-first method with interviews and survey notes."),
    existingGuide("what-is-a-prompt", "How to write an AI prompt that gets a useful answer", "Adapt a complete instruction without losing its checks.", "/images/guides/what-is-a-prompt.webp"),
    promptGuide("make-chatgpt-answers-shorter", "Why does ChatGPT keep giving you an essay?", "Keep future process updates concise."),
  ],
});

export const chatgptCustomerResearchGuide = makeGuide({
  slug: "chatgpt-customer-research-with-evidence",
  promptMode: "as-written",
  title: "Find patterns in customer feedback with ChatGPT",
  promise: "Turn interview or survey notes into themes that keep their supporting evidence, disagreements and gaps visible.",
  coverAlt: "The Blue Princess sorting interview cards through a glass evidence cabinet into labelled clusters",
  seoDescription: "Use ChatGPT to group customer research into traceable themes without losing quotes, disagreements or uncertainty.",
  sources: [{ label: "OpenAI: Data analysis with ChatGPT", url: "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt" }],
  answer: [
    "**A theme is useful only when you can trace it back to the people who expressed it.** Ask for evidence IDs, exceptions and unanswered questions with every conclusion.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Make the notes safe and traceable",
      introduction: "Create a copy before using an AI tool.",
      steps: [
        { title: "Remove identity", body: "Replace names, companies, emails and account details with participant IDs such as P01 and P02." },
        { title: "Keep the speaker ID", body: "Put the participant ID on every response so a claim can be checked later." },
        { title: "Separate questions and answers", body: "Use one row per response with columns for participant, question and answer." },
        { title: "Choose a decision", body: "Name the product, service or process decision this research should inform." },
      ],
    },
    {
      kind: "comparison",
      heading: "Keep evidence beside every theme",
      columns: ["Include", "Why it matters"],
      rows: [
        ["Participant IDs", "Shows how many different people support the theme."],
        ["Short source extracts", "Lets you verify the wording in the original notes."],
        ["Contradictions", "Stops a neat summary from hiding disagreement."],
        ["Evidence pattern", "Separates repeated evidence, disagreement and one-person signals."],
      ],
    },
  ],
  tryNow: {
    heading: "Build an evidence table",
    introduction: "Upload the anonymised notes and replace the decision in brackets.",
    prompt: `Analyse the uploaded customer research to help with this decision: [DECISION].

Use only the uploaded notes.

Create a table with these columns:
- Theme
- What people are trying to achieve
- Participant IDs supporting it
- 2 short supporting extracts, each from a different participant ID
- Contradicting or different evidence
- Evidence pattern: repeated or mixed
- What we still need to ask

Rules
1. A theme needs support from at least 2 different participant IDs. Show an extract from each of those people. Put one-person findings under “Early signals” after the main table, with the participant ID and extract.
2. Keep complaints, requests and suggested solutions separate.
3. Do not claim that the sample represents all customers.
4. Do not merge responses that describe different problems merely because they use similar words.
5. If an extract cannot be tied to a participant ID, exclude it and report the gap.

After the table, propose 3 next research questions. Do not recommend a product decision that the evidence cannot support.`,
    check: "Open the original notes and verify every participant ID and extract. Remove any theme that cannot be traced to its evidence.",
  },
  finish: "You can now use AI to organise customer research while keeping the final interpretation open to inspection.",
  related: [
    promptGuide("chatgpt-screen-recording-to-process-guide", "Can ChatGPT turn a screen recording into a process guide?", "Turn observed work into checked instructions."),
    promptGuide("verify-grok-current-research", "How do you verify research from Grok?", "Separate discussion from confirmed sources."),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Remove personal and confidential information before uploading research.", "/images/guides/learn-master.webp"),
  ],
});

export const teachClaudeWorkflowGuide = makeGuide({
  slug: "teach-claude-a-repeatable-workflow",
  promptMode: "as-written",
  title: "How do you teach Claude a job you repeat every week?",
  promise: "Turn one weekly task into a saved instruction with a clear input, output, stop rule and quality check.",
  coverAlt: "The Blue Princess teaching a clockwork apprentice to move one weekly task through four precise stations",
  seoDescription: "Teach Claude a repeatable weekly workflow with a complete instruction, test case and quality check.",
  sources: [
    { label: "Anthropic: Create and manage projects", url: "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects" },
  ],
  answer: [
    "**Save the method only after it works on a real example.** Claude needs the material it receives, the result it must produce, the decisions it must leave to you and a visible test for success.",
  ],
  sections: [
    {
      kind: "cards",
      heading: "Describe the job in four parts",
      items: [
        { title: "Input", body: "The file, notes or fields you will supply each time." },
        { title: "Method", body: "The steps Claude should follow in order." },
        { title: "Output", body: "The exact headings, table columns or file you need." },
        { title: "Stop rule", body: "What Claude must leave unresolved instead of guessing or acting." },
      ],
    },
    {
      kind: "steps",
      heading: "Test before you save it",
      introduction: "Use a safe example from a completed task.",
      steps: [
        { title: "Run the full instruction", body: "Start a new conversation so the result does not rely on earlier corrections." },
        { title: "Mark every repair", body: "Turn each correction you make into a clearer rule or example." },
        { title: "Run a second example", body: "Use different source material and check whether the method still works." },
        { title: "Save the stable version", body: "Add it to a Project instruction or create a Skill if that feature is available on your account." },
      ],
    },
  ],
  tryNow: {
    heading: "Teach Claude a weekly update",
    introduction: "Replace the bracketed details, then test it with last week’s safe notes.",
    prompt: `You are helping me prepare my weekly work update.

INPUT I WILL PROVIDE
- completed work;
- work still in progress;
- blockers;
- decisions I need from other people.

METHOD
1. Use only the notes in my current message.
2. Separate completed work from work still in progress.
3. Turn each blocker into one clear question for the person who can resolve it.
4. Keep suggestions separate from confirmed decisions.
5. If an owner, date or fact is missing, write “Not provided”. Do not infer it from an earlier week.

OUTPUT
Use these headings in this order:
1. Completed this week
2. In progress
3. Blockers and who can help
4. Decisions needed
5. Next week

Use bullets of no more than 25 words. Keep the complete update under [WORD LIMIT] words.

STOP RULE
Draft only. Do not send a message, update a project tool or create a task. End with a list called “Details to check” containing every missing or uncertain item.`,
    check: "The workflow passes when two different weeks produce the same useful structure, missing facts stay visible and no external action is taken.",
  },
  finish: "You now have a tested workflow you can reuse, improve and save without rebuilding the instruction every week.",
  related: [
    promptGuide("claude-projects", "Stop repeating your instructions to Claude", "Store stable context for work that continues."),
    existingGuide("claude", "Get one useful thing done with Claude", "Practise with a smaller one-off task first.", "/images/guides/claude-first-task.webp"),
    promptGuide("chatgpt-screen-recording-to-process-guide", "Turn a screen recording into a process guide", "Document the human version of a repeatable job."),
  ],
});

export const fixGeminiWorkspaceActionGuide = makeGuide({
  slug: "fix-gemini-workspace-action",
  title: "Why won’t Gemini create the Doc, Task or Calendar item you requested?",
  promise: "Check the account, app connection and requested action before rewriting the same message again.",
  coverAlt: "The Blue Princess tracing one instruction through three locked office machines for documents tasks and calendars",
  seoDescription: "Diagnose why Gemini did not create a Google Doc, Task or Calendar item with a safe step-by-step check.",
  sources: [
    { label: "Google Workspace Updates: Create content and coordinate tasks across Workspace", url: "https://workspaceupdates.googleblog.com/2026/09/create-content-schedule-events-and-coordinate-tasks-across-Workspace-regardless-of-what-app-you-are-in.html" },
    { label: "Google: Connect Workspace apps to Gemini", url: "https://support.google.com/gemini/answer/15229592" },
  ],
  answer: [
    "**A good instruction cannot fix the wrong account, a disabled connection or an action your current product does not offer.** Test those three conditions with harmless sample content.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Find where the action stops",
      introduction: "Use a sample called **Weekly planning demo** and delete it after the test.",
      steps: [
        { title: "Confirm the account", body: "Check that Gemini and Google Workspace use the same intended Google account." },
        { title: "Confirm the app", body: "Open Gemini’s connected apps or app menu and check whether the requested Workspace app appears and is allowed." },
        { title: "Ask for one action", body: "Request either one Doc, one Task or one Calendar event. Do not combine all three in the first test." },
        { title: "Open the result yourself", body: "Check the named app. A draft shown in chat is not proof that an item was created." },
      ],
    },
    {
      kind: "comparison",
      heading: "Read the result correctly",
      columns: ["What happened", "What to do next"],
      rows: [
        ["Gemini created the item", "Open it, check every field and remove the demo."],
        ["Gemini drafted content only", "The action was not completed. Check the app connection and current feature availability."],
        ["Gemini cannot access the app", "Check the account, administrator policy and connected-app setting."],
        ["Gemini chose the wrong account", "Stop, switch accounts and repeat with the demo."],
      ],
    },
  ],
  tryNow: {
    heading: "Run one harmless creation test",
    introduction: "Choose the Doc, Task or Calendar version and remove the other two.",
    prompt: `Create exactly one test item in [GOOGLE DOCS / GOOGLE TASKS / GOOGLE CALENDAR].

Use these details only:
- Title: Weekly planning demo
- Body or description: Test item created to check my Gemini connection.
- Date and time, if required: [DATE, TIME AND TIME ZONE]

Before creating it, tell me which Google account and app you will use. If you cannot confirm them, stop.

After creating it, give me the item title, the app where it was created and the direct link if available. Do not create a second item, invite anyone or add information I did not provide.`,
    check: "Open the named app and verify that exactly one demo item exists with the correct fields. A message in Gemini alone does not pass the test.",
  },
  finish: "You can now distinguish a prompt problem from an account, connection or feature problem.",
  related: [
    promptGuide("gemini-cannot-find-drive-file", "Why can’t Gemini see your Drive file?", "Check access to an existing file."),
    promptGuide("gemini-google-tasks-limits", "Can Gemini manage your Google Tasks?", "Test what Gemini can change in a task."),
    existingGuide("connect-ai-to-email-files-calendar", "Should you connect AI to your accounts?", "Review access before enabling another app.", "/images/guides/connect-ai-to-email-files-calendar.webp"),
  ],
});

export const copilotVisibilityGuide = makeGuide({
  slug: "what-can-copilot-see-at-work",
  promptMode: "as-written",
  title: "Get through your inbox with Copilot",
  promise: "Set up a checked morning email brief, then schedule it if your work account supports it.",
  coverAlt: "The Blue Princess using a brass viewing scope to inspect three separate locked cabinets for mail files and meetings",
  seoDescription: "Build a practical Copilot inbox brief, check it against Outlook, and schedule the prompt when available.",
  sources: [
    { label: "Microsoft: Copilot in Outlook", url: "https://support.microsoft.com/en-us/outlook/copilot-outlook/chat-with-copilot-in-outlook" },
    { label: "Microsoft: Schedule Copilot prompts", url: "https://support.microsoft.com/en-us/microsoft-365-copilot/schedule-your-most-used-copilot-prompts" },
  ],
  answer: [
    "**Yes, if your work account has Copilot access to Outlook.** Ask for a short list of messages that may need you, check the originals, then draft only the replies you choose. Scheduling is optional and needs a Microsoft Copilot licence.",
  ],
  sections: [
    {
      kind: "cards",
      heading: "Your inbox routine",
      items: [
        { title: "Set up", body: "Give Copilot your role, tone and the result you need in one reusable instruction." },
        { title: "Try it", body: "Compare its morning brief with Outlook before using a draft." },
        { title: "Schedule", body: "Only automate a prompt you have already checked." },
      ],
    },
    {
      kind: "steps",
      heading: "Use your own inbox, with your organisation’s permission",
      introduction: "Start in Outlook with your work account. What Copilot can see depends on your organisation's setup and licence.",
      steps: [
        { title: "Open Copilot Chat", body: "Sign in with your work account in Outlook or the Microsoft Copilot app. Check that work data is available." },
        { title: "Run one complete prompt", body: "Ask for up to five recent messages that appear to need a reply, why they matter, and a link to each source." },
        { title: "Check the originals", body: "Open the emails in Outlook and confirm the request, date, sender and whether you have already replied." },
        { title: "Schedule only if useful", body: "Use Schedule this prompt when available. Read the result in Copilot Chat; no reply is sent for you." },
      ],
    },
  ],
  tryNow: {
    heading: "Make a morning email brief you can trust",
    introduction: "Replace the bracketed details, then run this once manually before scheduling it.",
    prompt: `Help me manage my work email. My name is [NAME]. My role is [ROLE] in [TEAM OR DEPARTMENT] at [ORGANISATION]. I mainly email [TYPES OF CONTACTS]. The email tasks that take most of my time are [YOUR TWO OR THREE COMMON TASKS].

Write in a [YOUR PREFERRED TONE] tone. Keep it professional, clear and concise. Avoid em dashes. Turn my rough notes into polished drafts without changing their meaning. Keep drafts under 150 words unless I ask for more.

When I ask for help with an email:
- Triage: suggest action now, reply later, delegate or no action. Explain the reason briefly.
- Summarise a thread: show the main issue, decisions already made, next actions with owners, and what I need to answer. Link each point to the original email when possible.
- Draft: give me two versions, one under 100 words and one with more detail. I will choose and edit.
- Follow up: draft a polite message under 80 words for an unanswered request. Do not invent a deadline or imply a commitment nobody made.

For today's morning brief, look at work emails received in the last 24 hours that I have not replied to, if you can verify that status. Show up to five messages that may need a response or decision. Rank each from 1 to 5 for urgency, using an explicit deadline, a direct request or work blocking someone as evidence. Do not rank by sender seniority alone.

For each message, give me its subject, sender, request, stated deadline, urgency score, reason, Outlook source link or citation, and a suggested action. For scores of 3 or higher, add a short reply draft for my review. If you cannot confirm whether I replied, write "check reply status" instead of guessing. Tell me if more relevant messages were left out of the five.

End with the two messages I should check first and why. Do not invent facts, dates or commitments. Do not send, move, delete or change any email. I will open the originals, decide what matters and send any reply myself.`,
    check: "Open the cited messages in Outlook. Confirm the requests, deadlines and reply status before drafting or scheduling anything.",
  },
  finish: "You have a checked morning brief. If scheduling is available, let Copilot prepare the first pass; you still decide and send every reply.",
  related: [
    promptGuide("check-copilot-excel-edits", "How do you know Copilot changed the right Excel cells?", "Check a visible Copilot edit."),
    existingGuide("connect-ai-to-email-files-calendar", "Should you connect AI to your accounts?", "Review account permissions and disconnection.", "/images/guides/connect-ai-to-email-files-calendar.webp"),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Set a boundary for sensitive work data.", "/images/guides/learn-master.webp"),
  ],
});

export const metaMuseSavingGuide = makeGuide({
  slug: "test-meta-muse-money-saving-task",
  promptMode: "as-written",
  title: "Can Muse find a better price without buying for you?",
  promise: "Ask Muse to compare a real buying decision while keeping the budget, evidence and final purchase under your control.",
  coverAlt: "The Blue Princess holding the final lever while a shopping machine compares three price tags through a magnifying glass",
  seoDescription: "Test Meta Muse on one money-saving comparison without allowing it to purchase, subscribe or change an account.",
  sources: [{ label: "Meta: Introducing Muse", url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/" }],
  answer: [
    "**Saving money means comparing the complete cost, not accepting the lowest visible price.** Give Muse a firm budget and require direct sources, exclusions and a stop before purchase.",
  ],
  sections: [
    {
      kind: "cards",
      heading: "Define what cheaper means",
      items: [
        { title: "Total cost", body: "Include delivery, required extras, taxes where shown and recurring fees." },
        { title: "Minimum need", body: "List the features or conditions that cannot be removed to lower the price." },
        { title: "Comparable options", body: "Compare the same quantity, period, condition and cancellation terms." },
        { title: "Human decision", body: "Stop before checkout, subscription, booking or account change." },
      ],
    },
    {
      kind: "steps",
      heading: "Check the shortlist",
      introduction: "Use a low-risk purchase you already understand.",
      steps: [
        { title: "Open each source", body: "Confirm the price, date, seller and item match the comparison." },
        { title: "Add hidden costs", body: "Check delivery, required accessories, renewal price and return conditions." },
        { title: "Remove false matches", body: "Reject an option that misses a required feature or uses a different quantity." },
        { title: "Make the decision yourself", body: "Use the verified table. Do not let the agent complete the purchase." },
      ],
    },
  ],
  tryNow: {
    heading: "Build a checked buying shortlist",
    introduction: "Give Muse your buying limits, then compare the full cost before deciding.",
    prompt: `Help me compare a purchase. Do not buy anything.

Before searching, ask me for the item or service, my location, maximum total budget and currency, 3 to 5 must-haves, and anything I want excluded. Wait for my reply. Do not replace a must-have with a cheaper feature without asking me.

Find up to 3 public options that meet my answers. For each option, show:
- exact product or plan name;
- seller or provider;
- item price;
- delivery, required extras and recurring charges where shown;
- estimated total cost;
- which requirements it meets or misses;
- return or cancellation terms;
- direct source links and the time checked.

Do not purchase, subscribe, book, add to a basket, sign in, contact a seller or change an account. Mark any missing cost or term “Needs checking”. Recommend nothing until I have opened the sources.`,
    check: "The shortlist passes when the three options are genuinely comparable, every cost has a source and no external action was taken.",
  },
  finish: "You can now judge whether Muse reduces the work of comparing options without handing over the buying decision.",
  related: [
    existingGuide("meta-ai", "What can Meta’s Muse agent do for you?", "Understand the wider Muse workflow before connecting more services.", "/images/guides/meta-muse.webp"),
    comingNextGuide("test-meta-business-agent-customer-replies", "Should Meta Business Agent answer customers?", "Test a business use with a separate approval boundary."),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Check what stays out of a connected agent.", "/images/guides/learn-master.webp"),
  ],
});

export const grokRepeatedImageEditsGuide = makeGuide({
  slug: "test-grok-repeated-image-edits",
  promptMode: "as-written",
  title: "How many times can you edit a Grok image before it changes the parts you approved?",
  promise: "Save a master image, change one thing at a time and compare each version before the next edit.",
  coverAlt: "The Blue Princess comparing four prints from one image press while protecting the approved master under glass",
  seoDescription: "Test repeated Grok image edits without losing approved composition, colours or objects.",
  sources: [
    { label: "xAI: Image editing use case", url: "https://x.ai/grok/use-cases/image-editing" },
    { label: "xAI: Grok Imagine Image 2", url: "https://x.ai/news/grok-imagine-image-2" },
  ],
  answer: [
    "**Every new edit can affect more than the requested detail.** Keep the approved image as the master and inspect the complete frame after each change.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Protect the version that works",
      introduction: "Use a practice image with no identifiable person, private place or protected customer material.",
      steps: [
        { title: "Save the master", body: "Download the approved version before requesting any change." },
        { title: "Write the lock list", body: "Name the composition, subject, colours, background and objects that must remain unchanged." },
        { title: "Change one detail", body: "Request a single visible edit, then save it as a new numbered version." },
        { title: "Compare the full frame", body: "Check the requested detail and every locked part before continuing." },
      ],
    },
    {
      kind: "comparison",
      heading: "Record each edit",
      columns: ["Check", "What to record"],
      rows: [
        ["Requested change", "Correct, partly correct or wrong."],
        ["Locked details", "Every object, colour or position that drifted."],
        ["Image quality", "New blur, distortion, text or unwanted marks."],
        ["Decision", "Keep this version, return to master or stop."],
      ],
    },
  ],
  tryNow: {
    heading: "Run a three-edit stability test",
    introduction: "Upload the saved master before each test so every version starts from the same approved image.",
    prompt: `Edit the uploaded master image.

Change only this detail: [ONE VISIBLE CHANGE].

Keep all of these unchanged:
- [SUBJECT AND POSE]
- [COMPOSITION AND CAMERA ANGLE]
- [BACKGROUND]
- [COLOUR PALETTE]
- [OBJECTS THAT MUST REMAIN]
- [LIGHTING OR ILLUSTRATION STYLE]

Do not add text, logos, watermarks, people or objects. Do not crop, rotate or extend the image. If the requested change would require altering a locked detail, stop and explain the conflict instead of generating the edit.`,
    check: "Repeat with three different one-detail edits, always from the master. Keep Grok for this workflow only if the requested edits pass without changing the lock list.",
  },
  finish: "You now have a controlled test for whether Grok can revise an image without slowly replacing it.",
  related: [
    promptGuide("review-grok-suggestions", "Did Grok catch an error or rewrite your work?", "Use the same keep-or-reject habit for text suggestions."),
    promptGuide("get-better-professional-writing-from-grok", "Why is Grok’s professional writing too thin?", "Improve a written result with a structured brief."),
    promptGuide("verify-grok-current-research", "How do you verify research from Grok?", "Check evidence when the task moves from images to current information."),
  ],
});

export const deepseekV4DocumentGuide = makeGuide({
  slug: "test-deepseek-v4-document-work",
  promptMode: "as-written",
  title: "Can DeepSeek V4.1 replace your current AI for document work?",
  promise: "Run the same document task in both tools and compare factual accuracy, instruction-following and checking time.",
  coverAlt: "The Blue Princess running one document through two parallel presses and inspecting the outputs with a ruler",
  seoDescription: "Compare DeepSeek V4.1 with your current AI on the same document task before changing tools.",
  sources: [
    { label: "DeepSeek: V4.1 Flash announcement", url: "https://deepseek.com/news/deepseek-v4-1-flash/" },
    { label: "DeepSeek: Product updates", url: "https://api-docs.deepseek.com/updates/" },
  ],
  answer: [
    "**A newer model is useful only if it improves the work you repeat.** Compare both tools with the same safe document, instruction and scoring sheet.",
  ],
  sections: [
    {
      kind: "cards",
      heading: "Score the work that matters",
      items: [
        { title: "Accuracy", body: "Every claim matches the source document." },
        { title: "Coverage", body: "Every requested part appears in the result." },
        { title: "Restraint", body: "Missing information remains missing instead of being guessed." },
        { title: "Checking time", body: "Count the minutes needed to verify and repair the result." },
      ],
    },
    {
      kind: "steps",
      heading: "Keep the comparison fair",
      introduction: "Use a public or invented document of 2 to 5 pages.",
      steps: [
        { title: "Use identical inputs", body: "Upload the same document and paste the same complete instruction into each tool." },
        { title: "Record the model shown", body: "Note the product, model name and date visible in each tool." },
        { title: "Check against the document", body: "Mark every unsupported claim, missed requirement and formatting repair." },
        { title: "Repeat once", body: "Use a second document before changing your regular workflow." },
      ],
    },
  ],
  tryNow: {
    heading: "Run the document test",
    introduction: "Upload the same safe document to DeepSeek and your current tool.",
    prompt: `Use only the uploaded document.

Create a decision brief with these headings:
1. Purpose
2. 5 key facts
3. Dates and deadlines
4. People or organisations named
5. Decisions already made
6. Questions the document does not answer

For every fact, include the page number and a short supporting extract. If a page number is unavailable, name the section. Do not use outside knowledge. Do not turn a proposal into a decision or an estimate into a fact.

Keep the brief under 500 words. End with a table listing any statement you could not verify in the document.`,
    check: "Score both tools for accuracy, coverage, restraint and checking time. A faster first answer loses if it takes longer to verify or repair.",
  },
  finish: "You can now decide whether DeepSeek V4.1 improves your document work using two checked results rather than release claims.",
  related: [
    promptGuide("protect-a-long-deepseek-project", "What should you save before a DeepSeek project becomes unavailable?", "Protect the work before it grows."),
    promptGuide("edit-long-writing-with-deepseek", "How do you edit long writing without losing what worked?", "Control a focused revision."),
    promptGuide("fix-deepseek-wall-of-text", "Why did DeepSeek create a wall of text?", "Repair readability without changing the facts."),
  ],
});

export const protectDeepseekProjectGuide = makeGuide({
  slug: "protect-a-long-deepseek-project",
  promptMode: "as-written",
  title: "What should you save before a DeepSeek project becomes unavailable?",
  promise: "Create a local recovery pack so a long project can continue in DeepSeek or another approved tool.",
  coverAlt: "The Blue Princess moving project cards from a flickering machine into a sturdy labelled archive case",
  seoDescription: "Back up a long DeepSeek project with a clean brief, source list, decisions and next prompt.",
  sources: [
    { label: "DeepSeek: Service status", url: "https://status.deepseek.com/" },
    { label: "DeepSeek: Terms of use", url: "https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html" },
  ],
  answer: [
    "**The chat history is not the project.** Save the source material, confirmed decisions, working rules and current next step in files you control.",
  ],
  sections: [
    {
      kind: "cards",
      heading: "Your recovery pack needs five files",
      items: [
        { title: "Project brief", body: "Goal, audience, scope, limits and definition of done." },
        { title: "Source list", body: "Files and links used, with dates and what each source supports." },
        { title: "Decision log", body: "What was approved, rejected or left open, and why." },
        { title: "Approved work", body: "The latest version you would keep if the chat disappeared." },
        { title: "Restart prompt", body: "A complete instruction for the next step, with no dependence on old chat history." },
      ],
    },
    {
      kind: "steps",
      heading: "Test the backup before you need it",
      introduction: "Use a new conversation or another approved tool.",
      steps: [
        { title: "Open a clean chat", body: "Do not refer to the original conversation." },
        { title: "Upload the recovery pack", body: "Supply only the files needed for the next step." },
        { title: "Run the restart prompt", body: "Check whether the result preserves approved facts and understands the open decision." },
        { title: "Repair the pack", body: "Add the missing context to the relevant file, then test again." },
      ],
    },
  ],
  tryNow: {
    heading: "Create a restart brief from the current chat",
    introduction: "Copy this into the existing project, then verify the result before saving it locally.",
    prompt: `Create a recovery brief for this project using only the current conversation and files.

Use these headings:
1. Project goal
2. Intended audience or user
3. Scope and explicit exclusions
4. Confirmed facts with their source
5. Decisions already approved
6. Suggestions that were rejected
7. Open questions
8. Current approved deliverable
9. Next task
10. Complete restart instruction for a new conversation

Do not treat your own earlier suggestions as approved decisions. Mark any item without clear evidence “Needs checking”. The restart instruction must contain all information needed for the next task and must not say “as discussed above” or rely on chat history.`,
    check: "Save the verified brief and source files locally, then test the restart instruction in a clean conversation. The pack passes when the next step can continue without the original chat.",
  },
  finish: "You now own the working context needed to continue the project when a chat, account or service is unavailable.",
  related: [
    promptGuide("test-deepseek-v4-document-work", "Can DeepSeek V4.1 replace your current AI for documents?", "Compare tools with the same safe material."),
    promptGuide("edit-long-writing-with-deepseek", "Edit long DeepSeek writing without losing what worked", "Protect approved details during revision."),
    existingGuide("what-should-you-never-share-with-ai", "What should you never share with AI?", "Keep the recovery pack within your organisation’s data rules.", "/images/guides/learn-master.webp"),
  ],
});

export const mistralMultilingualResearchGuide = makeGuide({
  slug: "mistral-multilingual-research",
  title: "Can Mistral research in two languages without losing the source?",
  promise: "Ask one question in two languages, keep every claim tied to its original source and compare what each language reveals.",
  coverAlt: "The Blue Princess aligning two differently scripted newspapers through a bilingual brass lens into one evidence ledger",
  seoDescription: "Use Mistral for bilingual research while preserving original sources, dates, quotes and translation uncertainty.",
  sources: [
    { label: "Mistral and Mozilla: Private multilingual AI browsing", url: "https://mistral.ai/news/mistral-x-mozilla/" },
    { label: "Mistral: Le Chat", url: "https://mistral.ai/products/le-chat" },
    { label: "Mistral: Search the web in Work", url: "https://docs.mistral.ai/vibe/work/web-search-open-url" },
  ],
  answer: [
    "**Translation can make two sources look more similar than they are.** Keep the original wording, a short translation and the direct link beside every important claim.",
  ],
  sections: [
    {
      kind: "steps",
      heading: "Choose a fair research question",
      introduction: "Start with a harmless topic covered by official sources in both languages.",
      steps: [
        { title: "Name both languages", body: "Specify the language of your question and the second language to search." },
        { title: "Set the date range", body: "Use a clear period so older sources do not appear current." },
        { title: "Prefer original sources", body: "Ask for government, company, research or first-hand documents before summaries." },
        { title: "Keep differences visible", body: "Do not merge claims when dates, definitions or local rules differ." },
      ],
    },
    {
      kind: "comparison",
      heading: "Check every useful claim",
      columns: ["Keep", "Check"],
      rows: [
        ["Original title and language", "The source is actually written in the named language."],
        ["Direct link and date", "The page opens and the date supports the claim."],
        ["Original extract", "The words appear in the source and are not taken out of context."],
        ["English translation", "The translation preserves uncertainty, conditions and exceptions."],
      ],
    },
  ],
  tryNow: {
    heading: "Build a bilingual evidence table",
    introduction: "Replace the question, languages and date range.",
    prompt: `Research this question: [QUESTION].

Search in [LANGUAGE 1] and [LANGUAGE 2] for sources published between [START DATE] and [END DATE].

Create a table with these columns:
- Claim
- Source title in the original language
- Source language
- Publisher
- Publication date
- Short supporting extract in the original language
- Careful English translation
- Direct link
- What this source does not prove

Use primary or official sources first. Keep facts found in only one language separate. Do not translate a condition, estimate or possibility into a certain statement. If two sources conflict, show both and explain the difference without choosing a winner unless a stronger primary source resolves it.

End with 3 conclusions supported by the table and 3 questions that still need research.`,
    check: "Open each source, find the original extract and compare it with the translation. Remove any conclusion that lacks a verified source in the table.",
  },
  finish: "You can now use Mistral to widen a search across languages without hiding where each claim came from.",
  related: [
    comingNextGuide("switch-from-chatgpt-to-mistral", "Should you switch from ChatGPT to Mistral?", "Compare both tools on the same checked work task."),
    comingNextGuide("is-mistral-pro-worth-it", "Is Mistral Pro worth paying for?", "Measure whether the feature improves work you repeat."),
    promptGuide("verify-grok-current-research", "How do you verify current research from Grok?", "Use another evidence-first research workflow."),
  ],
});

export const researchGuideSeries = [
  chatgptScreenRecordingGuide,
  chatgptCustomerResearchGuide,
  teachClaudeWorkflowGuide,
  fixGeminiWorkspaceActionGuide,
  copilotVisibilityGuide,
  metaMuseSavingGuide,
  grokRepeatedImageEditsGuide,
  deepseekV4DocumentGuide,
  protectDeepseekProjectGuide,
  mistralMultilingualResearchGuide,
] as const;
