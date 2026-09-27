import type { GuidePage } from "./guide-page";
import { buildPrompt, promptExample } from "./prompt-builder-example";

export const promptGuide = {
  slug: "what-is-a-prompt",
  title: "How to write an AI prompt that gets a useful answer",
  promise: "Stop guessing what to type. This guide shows you where a prompt goes, what to include and how to get an answer you can actually use.",
  cover: "/images/guides/what-is-a-prompt.webp",
  coverAlt: "The small blue robot mascot operating an antique instruction press that turns a rough note into an ordered result",
  seoDescription: "Learn how to write an AI prompt, where to paste it and what to include so ChatGPT, Claude or Gemini gives you a useful answer.",
  lumailTag: "guide-what-is-a-prompt",
  sourceNotes: [
    { label: "OpenAI: prompt engineering best practices", url: "https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api" },
    { label: "Anthropic: prompt engineering overview", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" },
  ],
  answer: { paragraphs: [
    "A prompt is simply **your instruction to the AI**. It can be a question, a request or a set of directions.",
    "You do not need a complicated formula. Tell the AI **what you want**, **what it needs to know**, **what it must avoid** and **what the finished answer should look like**.",
  ] },
  sections: [
    { kind: "steps", heading: "Where the prompt goes", introduction: "If you have never used an AI chat before, follow this exact path.", steps: [
      { title: "Open an AI chat", body: "Choose **ChatGPT, Claude or Gemini** and create an account or sign in.", links: [
        { label: "Open ChatGPT", href: "https://chatgpt.com/" },
        { label: "Open Claude", href: "https://claude.ai/" },
        { label: "Open Gemini", href: "https://gemini.google.com/" },
      ] },
      { title: "Start a new conversation", body: "Find the message box at the bottom of the screen. This is where the prompt goes." },
      { title: "Copy and paste", body: "Select **Copy** in this guide, paste the instruction into the message box and replace anything inside brackets." },
      { title: "Remove private information", body: "Take out names, passwords, customer details and confidential business information before you send it." },
      { title: "Send and check", body: "Send the message, then check the answer against what you asked for and the information you provided." },
    ] },
    { kind: "cards", heading: "Give the AI enough to work with", introduction: "A useful prompt normally gives the AI 4 things.", items: [
      { title: "The job", body: "Say exactly what you want it to do, such as **draft an email, compare 2 options or summarise a document**." },
      { title: "The context", body: "Explain who the result is for, what has happened and which details matter." },
      { title: "The boundaries", body: "Set the length, tone, sources, exclusions or facts it must not invent." },
      { title: "The format", body: "Ask for the result as an email, checklist, table, plan or another format you can use." },
    ] },
    { kind: "comparison", heading: "See the difference", introduction: "The improvement is not a clever phrase. It is the missing information.", columns: ["Too vague", "More useful"], rows: [
      ["Make an agenda.", "Turn this rough project note into an agenda for a 15-minute team meeting."],
      ["No result or check is given.", "Give three agenda items and flag the pricing decision. Do not invent owners or approvals."],
    ] },
    { kind: "prose", heading: "Let the AI ask before it answers", paragraphs: [
      "You will not always know which details the AI needs. Ask it to question you before it starts.",
      "This is often more useful than writing a very long prompt yourself because it makes the missing information visible.",
    ] },
  ],
  tryNow: {
    heading: "Try the complete example, then make it yours",
    introduction: "Start with a made-up project note. See what a full instruction looks like before changing it for your work.",
    prompt: buildPrompt(promptExample),
    instructions: [
      { title: "Choose one AI chat", body: "Open ChatGPT, Claude or Gemini and start a new conversation." },
      { title: "Copy and paste", body: "Select **Copy**, paste the instruction and replace every bracketed section." },
      { title: "Remove private details", body: "Do not include confidential, personal or customer information." },
      { title: "Check the result", body: "Confirm it followed the request, kept the important details and did not add unsupported information." },
    ],
    check: "The agenda must keep pricing approval as an open decision, use only the note and name any missing owner as ‘Not specified’.",
  },
  conclusion: {
    heading: "You now know how to brief an AI tool",
    paragraphs: ["You can give an AI chat a clear job and recognise whether its answer is useful."],
    finishLine: "You do not need a collection of clever prompts. You need enough context and a clear idea of what good looks like.",
  },
  related: [
    { slug: "which-ai-tool-for-what", title: "Which AI tool should you use?", reason: "Match the task to the right tool before opening another account.", cover: "/images/guides/which-ai-tool-for-what.webp" },
    { slug: "what-should-you-never-share-with-ai", title: "What should you never share with AI?", reason: "Know what to remove before you paste information into a prompt.", cover: "/images/guides/learn-master.webp" },
    { slug: "make-chatgpt-answers-shorter", title: "Why does ChatGPT keep giving you an essay?", reason: "Keep useful detail while cutting the length of an answer.", cover: "/images/guides/make-chatgpt-answers-shorter.webp" },
  ],
} as const satisfies GuidePage;

export const aiBrowserGuide = {
  slug: "what-is-an-ai-browser",
  title: "What can an AI browser actually do?",
  promise: "See the difference between asking about a page and letting an assistant act in your browser, then try a source-checked comparison on public pages.",
  cover: "/images/guides/what-is-an-ai-browser.webp",
  coverAlt: "The small blue robot mascot operating an antique viewing instrument while closing a privacy shutter",
  seoDescription: "Learn what an AI browser can read or do, then compare two public pages and check every claim against its source.",
  lumailTag: "guide-what-is-an-ai-browser",
  sourceNotes: [
    { label: "Microsoft: Using Copilot in Edge at work", url: "https://support.microsoft.com/en-us/microsoft-copilot/using-microsoft-copilot-in-edge-at-work" },
    { label: "Microsoft: Getting started with Copilot in Edge", url: "https://support.microsoft.com/en-us/microsoft-copilot/getting-started-with-copilot-in-microsoft-edge" },
  ],
  answer: { paragraphs: [
    "An AI browser puts an assistant beside the pages you visit. Depending on your browser, account and settings, it may **explain the current page, compare information or act on a page you authorise**.",
    "Start with a public page. Check the assistant's answer against that page before allowing it into private work.",
  ] },
  sections: [
    { kind: "cards", heading: "Use it where the browser is doing the hard part", items: [
      { title: "Compare public pages", body: "Compare product pages, policies or public information without copying every section into a separate chat." },
      { title: "Read a long page", body: "Ask for the part that answers one question, then open the section and check it yourself." },
      { title: "Find a hidden detail", body: "Search a long website for a date, requirement or condition that would take time to locate manually." },
      { title: "Understand an unfamiliar page", body: "Ask for an explanation in everyday language while keeping the original page open beside it." },
    ] },
    { kind: "cards", heading: "Check what the browser can see", introduction: "Before you use one on work pages, check access.", items: [
      { title: "This page", body: "Is the assistant allowed to read the content on the page you are viewing, or only its title and address?" },
      { title: "Other tabs", body: "Could the answer use titles, addresses or content from other open tabs? Close unrelated tabs before an action task." },
      { title: "Work controls", body: "Has your organisation allowed page access, limited it to approved sites or blocked it on protected pages?" },
      { title: "Taking action", body: "Are you only asking a question, or are you allowing the assistant to click and type? Watch each action and take back control if it goes off task." },
    ] },
    { kind: "prose", heading: "Start with public pages", paragraphs: [
      "In Edge for work, Copilot can explain a webpage when page access is allowed. Browse with Copilot can take actions only where that separate feature is available to your account.",
      "Read the original page yourself before relying on a price, deadline, policy or contract term in the answer.",
    ], keyLine: "Do not test a new browser assistant first on banking, payroll, customer or administrator pages." },
  ],
  tryNow: {
    heading: "Try it with public information first",
    introduction: "Open a public pricing page and its terms page. Do not sign in or use private documents.",
    prompt: `I am deciding whether a public service's terms fit my needs. Compare the two public pages I have open: its pricing page and its cancellation or service-terms page. If you cannot access both pages, tell me which one is missing before answering.

Tell me:

1. What I would pay, including any condition or extra charge stated on the pages.
2. How and when I can cancel, according to the terms page.
3. Where the two pages disagree or leave a question unanswered.
4. What I should check with the provider before I decide.

For each finding, give a short exact quote and the page URL. Say "not found" when the pages do not answer a question. Do not fill gaps from memory, other websites or assumptions. Do not recommend a purchase.`,
    instructions: [
      { title: "Choose public pages", body: "Open 2 pages that do not require an account or contain private information." },
      { title: "Copy the instruction", body: "Select **Copy** and paste it into the browser's AI chat or sidebar." },
      { title: "Check the quotes", body: "Open the quoted sections and make sure they support the comparison." },
    ],
    check: "If a quote is missing or inaccurate, do not rely on that part of the comparison.",
  },
  conclusion: {
    heading: "Decide whether the convenience is worth the access",
    paragraphs: ["Use an AI browser when it saves time on public research or reading."],
    finishLine: "Before using it around private work, know what the AI can see, remember and act on.",
  },
  related: [
    { slug: "manus-browser-workflow", title: "When does a Manus browser workflow make sense?", reason: "See what changes when AI uses your browser.", cover: "/images/guides/manus-browser-workflow.webp" },
    { slug: "what-should-you-never-share-with-ai", title: "What should you never share with AI?", reason: "See which information must stay out of any AI tool.", cover: "/images/guides/learn-master.webp" },
    { slug: "what-is-agentic", title: "What AI agents actually do", reason: "Understand what changes when AI can take several steps and use tools.", cover: "/images/guides/what-is-agentic.webp" },
  ],
} as const satisfies GuidePage;

export const aiConnectionsGuide = {
  slug: "connect-ai-to-email-files-calendar",
  title: "Should you let AI connect to your email, files and calendar?",
  promise: "A connection can save time, but it also gives the AI access to information you did not paste into the chat. Connect only what you need and know how to remove it.",
  cover: "/images/guides/connect-ai-to-email-files-calendar.webp",
  coverAlt: "The small blue robot mascot choosing one cable on an antique email, files and calendar switchboard",
  seoDescription: "Decide whether to connect AI to email, files and calendars, understand the permissions and learn where to disconnect ChatGPT, Claude, Gemini and Copilot.",
  lumailTag: "guide-connect-ai-to-email-files-calendar",
  sourceNotes: [
    { label: "OpenAI: Connected apps in ChatGPT", url: "https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt" },
    { label: "Anthropic: Use connectors", url: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" },
    { label: "Google: Manage Connected Apps in Gemini", url: "https://support.google.com/gemini/answer/13695044?co=GENIE.Platform%3DDesktop" },
    { label: "Microsoft: Personal Copilot connectors", url: "https://support.microsoft.com/en-us/microsoft-copilot/connecting-microsoft-copilot-to-other-services" },
    { label: "Microsoft: Work Copilot data and permissions", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy" },
  ],
  answer: { paragraphs: [
    "Connect an AI tool only when a repeated task genuinely needs information from another service. Start with the **smallest amount of access** that can complete the job.",
    "A connection may let the tool retrieve email, files, contacts or events. Some connections can also create, edit or delete information after you approve an action.",
  ] },
  sections: [
    { kind: "cards", heading: "Start with the smallest level of access", items: [
      { title: "Upload one file", body: "Best when the AI needs one document for one task." },
      { title: "Connect one service", body: "Useful when you repeatedly need to search that email, drive or calendar." },
      { title: "Allow actions", body: "Use only when you understand what the tool can create, edit, send or delete." },
    ] },
    { kind: "steps", heading: "Where to review or disconnect access", introduction: "Menu names can vary by plan, device or workspace policy.", steps: [
      { title: "ChatGPT", body: "Open **Settings → Apps** (or **Plugins**, if shown). Choose the connected account to review or disconnect it." },
      { title: "Claude", body: "Open **Customize → Connectors**. Choose the service and select disconnect." },
      { title: "Gemini", body: "Open **Settings & help → Connected Apps**. If that is not shown, open **Personal Intelligence → Connected Apps**. Turn off the app you do not want Gemini to use." },
      { title: "Personal Copilot", body: "On Copilot.com, open **+ → Use connectors**. On mobile, open **Profile → Connectors**. Turn off a connector you do not want used in this conversation." },
    ] },
    { kind: "prose", heading: "Disconnecting is not the same as deleting", paragraphs: [
      "Disconnecting normally stops future access. It does not always remove information already present in a chat or activity history.",
      "ChatGPT says existing conversations remain. Gemini stores connected information separately in Gemini Apps Activity. Copilot responses remain until you delete the conversation. Claude stores retrieved information with the associated chat, which you can delete.",
    ], keyLine: "After disconnecting, review the conversation or activity history separately." },
    { kind: "cards", heading: "Ask 4 questions before connecting", items: [
      { title: "What can it read?", body: "Check whether the permission covers one folder, one account or everything you can access." },
      { title: "Can it change anything?", body: "Look for permission to create, edit, send, share or delete." },
      { title: "Where does the result remain?", body: "Check whether retrieved information appears in chat history, memory or another activity record." },
      { title: "Is there a smaller option?", body: "Ask whether uploading one file can complete the same task." },
    ] },
  ],
  tryNow: {
    heading: "Read the permission before you approve it",
    introduction: "Copy the permission text shown by the tool. Do not include passwords or private information.",
    prompt: `Explain these permissions in everyday language.

For each permission, tell me whether the tool can:

- Read
- Create
- Edit
- Delete
- Send
- Share

Then tell me:

1. What information this could expose.
2. Which permission creates the most risk.
3. Whether I could complete the task with less access.
4. What I should check before approving it.

Do not assume the tool has a permission unless it appears in the text.

Permission text:
[Paste the permission text here]`,
    instructions: [
      { title: "Copy the permission screen", body: "Copy only the permission wording, not account details or passwords." },
      { title: "Paste the instruction", body: "Select **Copy**, paste it into an AI chat and add the permission text." },
      { title: "Check the original", body: "Compare the explanation with the actual permission screen before deciding." },
    ],
    check: "If you cannot explain why the task needs the permission, do not approve it yet.",
  },
  conclusion: {
    heading: "Connect for a job, not for convenience",
    paragraphs: ["A useful connection solves a repeated problem. If you cannot name that problem, leave the service disconnected."],
    finishLine: "You can always connect it later. Start with less access and add only what the work proves it needs.",
  },
  related: [
    { slug: "what-should-you-never-share-with-ai", title: "What should you never share with AI?", reason: "Know which information should never enter a connected tool.", cover: "/images/guides/learn-master.webp" },
    { slug: "what-is-an-ai-browser", title: "What is an AI browser, and should you use one?", reason: "Check what browser-based AI may see while you work online.", cover: "/images/guides/what-is-an-ai-browser.webp" },
    { slug: "which-ai-tool-for-what", title: "Which AI tool should you use?", reason: "Choose the tool before granting another account access.", cover: "/images/guides/which-ai-tool-for-what.webp" },
  ],
} as const satisfies GuidePage;

export const aiSkillsGuide = {
  slug: "ai-skills-worth-learning-for-work",
  title: "Which AI skill should you practise first?",
  promise: "Choose one familiar task, see which skill will help most, and try a small exercise you can check yourself.",
  cover: "/images/guides/ai-skills-worth-learning-for-work.webp",
  coverAlt: "The small blue robot mascot carrying a compass, magnifying glass, key and measuring gauge past changing machines",
  seoDescription: "Choose one practical AI skill to practise on a familiar work task, with a worked example and a checkable exercise.",
  lumailTag: "guide-ai-skills-worth-learning-for-work",
  sourceNotes: [
    { label: "PwC: 2026 Global AI Jobs Barometer", url: "https://www.pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-ai-jobs-barometer.html" },
    { label: "OpenAI: Preparing teams to work with agents", url: "https://cdn.openai.com/business-guides-and-resources/a-business-leaders-guide-to-working-with-agents.pdf" },
  ],
  answer: { paragraphs: [
    "The most useful AI skills are not memorising menus or collecting prompts. Learn to **define the job, choose the source, check the result, protect the information and own the final decision**.",
    "Those skills remain useful when a provider changes its models, features or interface.",
  ] },
  sections: [
    { kind: "cards", heading: "Build the skills that travel with you", items: [
      { title: "Direct the work", body: "Explain what needs doing, why it matters, what good must contain and what must not happen." },
      { title: "Choose the source", body: "Decide which document is current, which person has the context and which claim needs evidence." },
      { title: "Check the result", body: "Look for missing details, invented facts, weak reasoning and consequences if the answer is wrong." },
      { title: "Control access", body: "Recognise the difference between pasting information, uploading one file, connecting an account and allowing an action." },
      { title: "Keep responsibility", body: "Set the standard, understand the relationship, approve the consequence and stand behind the decision." },
    ] },
    { kind: "prose", heading: "Do not learn every feature", paragraphs: [
      "A new feature can disappear or move before you have finished learning it. Start with one task you repeat and improve the way you direct and check that work.",
      "Current workplace research is placing more emphasis on judgement, creativity, leadership and adaptability alongside specific AI skills.",
    ] },
    { kind: "steps", heading: "Choose what to practise first", introduction: "Use the gap that slows your real work, not the feature creating the most noise.", steps: [
      { title: "Pick one repeated task", body: "Choose work you already understand well enough to recognise a weak result." },
      { title: "Name the difficult part", body: "Is the problem giving instructions, finding the right information, checking the answer, protecting access or making the final decision?" },
      { title: "Practise one skill", body: "Use one AI tool and one real example. Keep the test small enough to finish this week." },
    ] },
  ],
  tryNow: {
    heading: "Practise one useful skill",
    introduction: "Start with one familiar task. Use a public, invented or non-confidential example.",
    prompt: `I want to practise one AI skill on a task I already know how to do.

Task: [Describe one familiar task]
Skill to practise: [Choose clearer instructions, better sources, checking results, protecting information or keeping the final decision].

Give me one small exercise I can finish this week. Tell me what to prepare, what to ask the tool to do and how to compare the result with the original. Do not invent facts about my work or suggest that I buy a new tool. Use only public, invented or non-confidential material. Keep your answer to one exercise and one check. I will decide if the result is suitable for real work.`,
    instructions: [
      { title: "Choose a familiar task", body: "Pick one task you know well enough to judge." },
      { title: "Choose one skill", body: "Use the part of that task that most often slows you down." },
      { title: "Keep details safe", body: "Use public, invented or non-confidential material for the exercise." },
      { title: "Check the result", body: "Compare the result with the original before using it at work." },
    ],
    check: "The exercise should help with one familiar task and give you a way to judge the result.",
  },
  conclusion: {
    heading: "Practise one skill on work you already know",
    paragraphs: ["Use a familiar task, compare the answer with your source and keep the part that helps."],
    finishLine: "Try that skill once before adding another tool.",
  },
  paidNextStep: {
    label: "Your Human Evidence",
    title: "Collect the proof of what people trust you to notice, decide and handle",
    body: "This upcoming workbook will help you find evidence of your judgement and contribution without turning the process into another personality test.",
    status: "coming-soon",
  },
  related: [
    { slug: "what-is-ai", title: "What AI actually is", reason: "See what the tool can and cannot know before you rely on an answer.", cover: "/images/guides/what-is-ai.webp" },
    { slug: "what-should-you-never-share-with-ai", title: "What should you never share with AI?", reason: "Choose safe material for your first exercise.", cover: "/images/guides/learn-master.webp" },
  ],
} as const satisfies GuidePage;

export const aiSearchGuide = {
  slug: "show-up-in-ai-search",
  title: "How to show up in AI search results",
  promise: "There is no button that adds your business to every AI answer. You can make it easier for search systems to find, understand and verify what you do.",
  cover: "/images/guides/show-up-in-ai-search.webp",
  coverAlt: "The small blue robot mascot feeding verified fact cards into an antique signal beacon watched by search instruments",
  seoDescription: "Learn how to improve AI search visibility with clear public business facts, useful pages, verifiable claims and a simple visibility test.",
  lumailTag: "guide-show-up-in-ai-search",
  sourceNotes: [
    { label: "Google: Creating helpful, reliable, people-first content", url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
    { label: "Google: Influencing title links", url: "https://developers.google.com/search/docs/appearance/title-link" },
    { label: "Google: Introduction to structured data", url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
  ],
  answer: { paragraphs: [
    "You cannot force an AI tool to recommend your business. You can make your public information **clearer, easier to find and easier to verify**.",
    "Start with useful pages that answer real questions and keep your important business facts accurate across your website and public profiles.",
  ] },
  sections: [
    { kind: "cards", heading: "Give search systems something public to find", items: [
      { title: "Who you help", body: "Name the type of person or business the service is designed for." },
      { title: "What you do", body: "Describe each service or product in specific, everyday language." },
      { title: "Where you work", body: "Make locations, markets and delivery boundaries clear where they matter." },
      { title: "Why the facts are trustworthy", body: "Use evidence, examples, named responsibility and clear contact information." },
    ] },
    { kind: "prose", heading: "Answer the questions people actually ask", paragraphs: [
      "Create pages that help someone choose a service, understand a process, check what is included or decide whether the offer fits them.",
      "Do not publish vague articles simply to produce more content. A useful page should answer its title and leave the reader able to make a decision.",
    ] },
    { kind: "steps", heading: "Make important claims easy to verify", introduction: "A search system has more to work with when the page is clear and the evidence agrees.", steps: [
      { title: "Use one clear main title", body: "Give every page a concise title that accurately describes its answer." },
      { title: "State the important facts", body: "Name services, products, dates, people and locations where they help the reader decide." },
      { title: "Link the evidence", body: "Connect related pages and include relevant examples, sources or proof." },
      { title: "Keep public profiles consistent", body: "Update conflicting names, descriptions, offers and contact details." },
      { title: "Earn outside confirmation", body: "Credible interviews, references and public mentions can help confirm that the business exists and does the work it describes." },
    ] },
    { kind: "prose", heading: "Do not flood the website with AI-written pages", paragraphs: [
      "More pages do not automatically create more visibility. Thin, repeated pages create noise for readers and search systems.",
      "Publish when the page answers a real question, adds evidence or makes an important fact easier to find.",
    ] },
  ],
  tryNow: {
    heading: "Check what is visible now",
    introduction: "Run the first test without naming your business. Search results vary by tool, date, location and wording.",
    prompt: `I am researching [type of service or product] for [type of customer] in [location or market].

Which providers should I compare?

For each provider:

1. Explain what they appear to offer.
2. Cite the public sources supporting the answer.
3. State which important details could not be verified.
4. Do not invent prices, services, reviews or claims.`,
    instructions: [
      { title: "Run a neutral search", body: "Replace the brackets and run the prompt without mentioning your business." },
      { title: "Check your business", body: "Then ask what the tool can verify about your business and require a source for every fact." },
      { title: "Record the result", body: "Save the date, tool, question, sources, missing facts and anything that was wrong." },
      { title: "Fix the source", body: "Improve the public page holding the missing or inaccurate fact, then test again later." },
    ],
    check: "The useful result is a dated record showing which public facts are visible, missing or wrong. It is not a promise that the tool will rank you.",
  },
  conclusion: {
    heading: "You know what to improve next",
    paragraphs: ["You cannot control every AI answer. You can improve the public information those answers may rely on."],
    finishLine: "Make one important fact clear, public and verifiable before creating another page.",
  },
  related: [
    { slug: "create-useful-content-without-losing-your-voice", title: "Create useful content without handing AI your voice", reason: "Turn clear expertise into useful pages without publishing generic AI copy.", cover: "/images/guides/show-up-in-ai-search.webp", status: "coming-next" },
    { slug: "what-is-a-prompt", title: "How to write an AI prompt that gets a useful answer", reason: "Give a research task a clearer brief and require verifiable evidence.", cover: "/images/guides/what-is-a-prompt.webp" },
    { slug: "which-ai-tool-for-what", title: "Which AI tool should you use?", reason: "Choose a search-capable tool that fits the work you need to check.", cover: "/images/guides/which-ai-tool-for-what.webp" },
  ],
} as const satisfies GuidePage;
