import { claudeGuide, claudeProjectsGuide } from "./claude-series";
export { claudeGuide, claudeProjectsGuide } from "./claude-series";
import { instagramDashboardGuide } from "./instagram-dashboard-guide";
import { copilotGuide, deepSeekGuide, grokGuide, kimiGuide, manusGuide, metaAiGuide, mistralGuide } from "./tool-guide-batch";
import { aiBrowserGuide, aiConnectionsGuide, aiSearchGuide, aiSkillsGuide, promptGuide } from "./guide-batch-three";
import { modelSeriesGuides } from "./model-guide-series";
import { researchGuideSeries } from "./research-guide-series";
import { newGuidePages } from "./guide-batch-26-35-pages";
import { batchOneGuides } from "./guide-batch-one";

export type GuideStep = {
  title: string;
  body: string;
  links?: readonly { label: string; href: string }[];
};

export type WalkthroughBlock =
  | { kind: "heading" | "paragraph"; text: string }
  | { kind: "note"; text: string; icon: string }
  | { kind: "code"; text: string; label: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "table"; rows: readonly (readonly string[])[] };

export type GuideSection =
  | { kind: "walkthrough"; heading: string; introduction: string; blocks: readonly WalkthroughBlock[] }
  | { kind: "tutorial"; heading: string; introduction: string; steps: readonly GuideStep[]; prompt?: string; check: string }
  | { kind: "diagram"; heading: string; variant?: "checks"; nodes: readonly [GuideStep, GuideStep, GuideStep] }
  | {
      kind: "prose";
      heading: string;
      paragraphs: readonly [string, ...string[]];
      keyLine?: string;
    }
  | {
      kind: "cards";
      heading: string;
      introduction?: string;
      items: readonly [
        { title: string; body: string },
        { title: string; body: string },
        ...Array<{ title: string; body: string }>,
      ];
    }
  | {
      kind: "comparison";
      heading: string;
      introduction?: string;
      columns: readonly [string, string];
      rows: readonly [
        readonly [string, string],
        readonly [string, string],
        ...Array<readonly [string, string]>,
      ];
    }
  | {
      kind: "steps";
      heading: string;
      introduction: string;
      steps: readonly [
        GuideStep,
        GuideStep,
        ...Array<GuideStep>,
      ];
    }
  | {
      kind: "accordion";
      heading: string;
      introduction: string;
      items: readonly [
        GuideStep,
        GuideStep,
        ...Array<GuideStep>,
      ];
    };

export type GuideRelated = {
  slug: string;
  title: string;
  reason: string;
  cover: string;
  status?: "coming-next";
};

export type GuidePage = {
  slug: string;
  title: string;
  promise: string;
  cover: string;
  coverAlt: string;
  seoDescription: string;
  lumailTag: string;
  sourceNotes?: readonly { label: string; url: string }[];
  answer: {
    heading?: string;
    paragraphs: readonly [string, ...string[]];
  };
  sections: readonly GuideSection[];
  series?: { part: 1; tasks: readonly { id: string; title: string; outcome: string; example: string; prompt: string; result: string; wrongLine: string; correctionFact: string }[]; correction: string } | { part: 2; instructions: string; exercise: string };
  workshopInvitation?: { title: string; body: string; href?: string; label?: string };
  tutorial?: readonly GuideSection[];
  gateTeaser?: { heading: string; body: string };
  tryNow?: {
    heading: string;
    introduction: string;
    workedExample?: { task: string; signals: readonly string[]; decision: string };
    prompt: string;
    check: string;
    instructions?: readonly [GuideStep, GuideStep, ...Array<GuideStep>];
  };
  conclusion: {
    heading: string;
    paragraphs: readonly [string, ...string[]];
    questions?: {
      introduction: string;
      items: readonly [string, string, string];
    };
    finishLine: string;
    extensions?: readonly string[];
  };
  paidNextStep?: {
    label: string;
    title: string;
    body: string;
    status: "coming-soon";
  };
  related: readonly GuideRelated[];
};

export const whatIsAiGuide = {
  slug: "what-is-ai",
  title: "What AI actually is",
  promise: "Could AI help with your work this week? Pick what you need, try one small task and judge the result for yourself.",
  cover: "/images/guides/what-is-ai.webp",
  coverAlt: "The small blue robot mascot beside a mechanical machine that sorts different shapes",
  seoDescription: "A clear beginner guide to what AI is, what it can do and how to test it safely at work.",
  lumailTag: "guide-what-is-ai",
  sourceNotes: [
    { label: "OECD AI Principles: definition of an AI system", url: "https://oecd.ai/en/principles" },
    { label: "NIST AI Risk Management Framework: definition of an AI system", url: "https://airc.nist.gov/airmf-resources/airmf/0-ai-rmf-1-0/" },
    { label: "EU Artificial Intelligence Act: Article 3 definition", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689" },
  ],
  answer: {
    paragraphs: [
      "**AI is software that works with information and gives you a result.** It might sort a message, suggest an option or draft something for you.",
      "The useful part is a first pass you can build on. **The catch: a convincing answer can still be wrong.**",
    ],
  },
  sections: [
    {
      kind: "cards",
      heading: "What would you like help with?",
      introduction: "Pick one to see the kind of result AI could give you.",
      items: [
        { title: "Sort", body: "It can group similar feedback or mark a message as **spam or not spam**. You check that the labels make sense." },
        { title: "Predict", body: "It can estimate who may **need support soon**. That is a prediction to investigate, not a fact." },
        { title: "Suggest", body: "It can suggest a **next product or route**. You decide if the suggestion fits the real situation." },
        { title: "Draft", body: "It can make a **summary, translation, image, email or code draft**. You check and edit it before use." },
      ],
    },
    {
      kind: "diagram",
      heading: "What happens when you use it?",
      nodes: [
        { title: "You give it material", body: "A question, note or public text." },
        { title: "AI gives a first pass", body: "It can sort, suggest or draft from new material." },
        { title: "You check it", body: "Compare the result with your original before using it." },
      ],
    },
    {
      kind: "diagram",
      heading: "What should you check?",
      variant: "checks",
      nodes: [
        { title: "Match the source", body: "Can you find each point in the original?" },
        { title: "Spot guesses", body: "Did AI add or leave out a detail?" },
        { title: "Check the stakes", body: "Could an error affect money, customers, access or rights? Ask a person to review before anyone acts." },
      ],
    },
  ],
  tryNow: {
    heading: "Try it on a task from this week",
    introduction: "Start with a short public excerpt. The prompt asks AI for a result you can check against the original.",
    workedExample: {
      task: "Find the key points in a public article you need for work.",
      signals: [
        "Paste one short paragraph from the article.",
        "Ask for 3 key points and the sentence behind each one.",
        "Compare each point with the original paragraph. Cross out anything the article did not say.",
      ],
      decision: "If the points are accurate and save you time, try a longer public or approved text.",
    },
    prompt: `I want to test if AI can help with a small part of a task I do at work.

The task: [Describe the task in one sentence. Example: find the key points in a public article before a meeting.]
Here is a small sample: [Paste 3 to 5 lines of public, made-up or approved non-confidential material. Do not paste names, private messages, customer records or confidential work.]
A useful result would be: [Describe what you want to receive. Example: 3 key points, each with the sentence that supports it.]
I will check the result by: [Name the original material or a simple check you can do yourself.]

First, tell me if the sample is enough for a small test. If it is not, ask for the single missing detail and stop. Do not guess or claim to have opened my files or accounts.

If it is enough, do only this small sample. Use only the material above. Give me the requested result in a short list. Show which part of the sample supports each point. Mark anything you are unsure about instead of making it up.

End with two short lines:
- Check: the specific part I should compare with my original material.
- Next step: if this small result is useful enough to test on more material, and what I should still do myself.

Do not treat your answer as a final work decision.`,
    check: "Check the answer against your sample. If it saved time and the details match, you can try it on more approved material. **You decide what to use.**",
  },
  conclusion: {
    heading: "Before you use the result",
    paragraphs: [
      "A quick first pass is useful only if the details hold up.",
    ],
    questions: {
      introduction: "Ask yourself:",
      items: ["Can I trace this back to the original?", "What did AI guess or leave out?", "Would a mistake matter here?"],
    },
    finishLine: "If it saves time and passes your checks, try it on a larger approved task.",
  },
  related: [
    {
      slug: "ai-jargon-guide",
      title: "12 AI words you need to know",
      reason: "Learn the everyday terms that appear in tools, meetings and sales pitches.",
      cover: "/images/guides/learn-master.webp",
    },
    {
      slug: "what-should-you-never-share-with-ai",
      title: "The 3-Question Check Before You Paste Anything Into AI",
      reason: "See what must stay out and which privacy setting to check before you paste anything.",
      cover: "/images/guides/learn-master.webp",
    },
    {
      slug: "what-is-agentic",
      title: "4 Limits to Set Before an AI Agent Works Alone",
      reason: "See what changes when AI can use tools, access information and take several steps.",
      cover: "/images/guides/what-is-agentic.webp",
    },
  ],
} as const satisfies GuidePage;

export const aiJargonGuidePage = {
  slug: "ai-jargon-guide",
  title: "12 AI words you need to know",
  promise: "AI conversations get confusing because the same words keep appearing with no explanation. Learn these 12 and you will understand what a tool is, what shapes its answers and what it may be able to do with your information.",
  cover: "/images/guides/learn-master.webp",
  coverAlt: "The small blue robot mascot learning from an open book filled with AI symbols",
  seoDescription: "Learn 12 everyday AI terms in clear language, see what each one changes in practice and know what to check before you trust an AI tool or product claim.",
  lumailTag: "guide-ai-jargon",
  sourceNotes: [
    { label: "OECD: updated definition of an AI system and AI model", url: "https://oecd.ai/en/wonk/definition" },
    { label: "NIST: Generative Artificial Intelligence Profile", url: "https://www.nist.gov/itl/ai-risk-management-framework" },
    { label: "OpenAI: practical guide to building AI agents", url: "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/" },
    { label: "OpenAI: ChatGPT data controls", url: "https://help.openai.com/en/articles/7730893-datacontrols-faq" },
    { label: "Anthropic: personal data and model training", url: "https://privacy.claude.com/en/articles/10023555-how-do-you-use-personal-data-in-model-training" },
  ],
  answer: {
    paragraphs: [
      "You do not need to memorise every technical term. Start with the words that tell you **what is behind the tool**, **what shapes its answer** and **what it may be able to access or do**.",
      "Once you can spot those 3 things, product pages, demos and AI conversations become much easier to question.",
    ],
  },
  sections: [
    {
      kind: "cards",
      heading: "Most AI language answers 3 questions",
      introduction: "Use these 3 questions whenever a new term appears.",
      items: [
        { title: "What is behind the tool?", body: "Look for the model or technology doing the work." },
        { title: "What shapes the answer?", body: "Look for the instructions, information and limits affecting the response." },
        { title: "What can it access or do?", body: "Look for connections, permissions and actions beyond the chat box." },
      ],
    },
    {
      kind: "cards",
      heading: "What is behind the tool",
      introduction: "These words describe the technology you are using.",
      items: [
        {
          title: "AI model",
          body: "In ChatGPT, you open the app and type a message. An **AI model** behind the app produces the reply.",
        },
        {
          title: "Generative AI",
          body: "Ask ChatGPT to turn rough notes into a first draft. Creating that new text is **generative AI** at work.",
        },
        {
          title: "LLM",
          body: "**Large language model**. It is the kind of model that lets ChatGPT understand a question and write a reply in everyday language.",
        },
        {
          title: "Chatbot or AI assistant",
          body: "The message box and reply you see in ChatGPT make it an **AI assistant**. Some assistants can also search or use connected apps.",
        },
      ],
    },
    {
      kind: "cards",
      heading: "What shapes the answer",
      introduction: "These words explain why the same tool can give different results.",
      items: [
        {
          title: "Prompt",
          body: "The message you type is the **prompt**. For example: ‘Summarise this public article in three points, with links to the passages you used.’",
        },
        {
          title: "Context and context window",
          body: "Paste a public article into a chat and ask about it: the article is part of that chat's **context**. A **context window** limits how much the model can use at once.",
        },
        {
          title: "Memory",
          body: "**Memory** can carry a detail from one chat into a later one. Ask ChatGPT ‘What do you remember about me?’ to see what it reports, then check your settings.",
        },
        {
          title: "Hallucination",
          body: "If an AI answer confidently names a source that does not exist, that is a **hallucination**. Open important links and check the original material.",
        },
      ],
    },
    {
      kind: "cards",
      heading: "What the tool can access or do",
      introduction: "These words tell you whether the tool goes beyond a simple text response.",
      items: [
        {
          title: "Permissions",
          body: "Before connecting a work app to ChatGPT, review the **permissions** shown: can it only read information, or can it also create, change or send it?",
        },
        {
          title: "Connector or integration",
          body: "A **connector** links an AI assistant to another app. A ChatGPT connection to Drive, for example, may let it find files your connected account can access.",
        },
        {
          title: "Automation",
          body: "An **automation** follows a set rule. A reminder sent every Monday is one example; it does not need an AI model to run.",
        },
        {
          title: "AI agent",
          body: "An **AI agent** can choose steps and use available tools toward a goal. In a coding tool such as Codex, it can inspect files, make an edit and run a check.",
        },
      ],
    },
    {
      kind: "steps",
      heading: "Never copied a prompt before? Start here",
      introduction: "You only need one AI chat tool and a non-confidential piece of text.",
      steps: [
        {
          title: "Open one AI tool",
          body: "Pick one. A free personal account is enough for this exercise. For real work, use the account your organisation has approved.",
          links: [
            { label: "Open ChatGPT", href: "https://chatgpt.com/" },
            { label: "Open Claude", href: "https://claude.ai/" },
            { label: "Open Gemini", href: "https://gemini.google.com/" },
          ],
        },
        {
          title: "Start a new conversation",
          body: "Choose **New chat**, the plus sign or the empty message box. This keeps unrelated instructions from an older chat out of your test.",
        },
        {
          title: "Copy the prompt below",
          body: "Click **Copy** beside the prompt. You do not need to rewrite it.",
        },
        {
          title: "Paste it into the AI tool",
          body: "Click the message box, paste the prompt and replace anything inside **square brackets** with your own text.",
        },
        {
          title: "Remove private information",
          body: "Do not paste passwords, customer records, private conversations, financial details or confidential company information. Use public or non-confidential text for this exercise.",
        },
        {
          title: "Send it",
          body: "Press Enter or the send arrow. The answer will appear in the same conversation.",
        },
      ],
    },
  ],
  tryNow: {
    heading: "See what ChatGPT remembers",
    introduction: "Use your own ChatGPT account. You do not need to upload a file or connect another app.",
    prompt: `What do you remember about me from earlier chats? List the details you can use to personalize a new answer. Keep each detail to one short line.

If you cannot see or verify my saved memories, say so. Do not guess my account settings, connected apps, or information you cannot access. Do not invent personal details.

At the end, tell me how I can check the actual memory controls in ChatGPT so I can compare your answer with what my account shows.`,
    check: "Compare the reply with **Memory or Personalization in ChatGPT settings**. Correct or remove outdated details there; the chat reply may be incomplete.",
  },
  conclusion: {
    heading: "You can now question the language",
    paragraphs: [
      "The next time a product describes itself as an **agentic multimodal assistant with secure integrations**, you do not have to nod and move on.",
      "You can break the claim apart and ask what the tool can actually **see, do and change**.",
    ],
    finishLine: "That is enough to follow the conversation without letting impressive vocabulary make the decision for you.",
  },
  related: [
    {
      slug: "what-is-a-prompt",
      title: "The 4-Line Prompt That Works in Any AI",
      reason: "Put the word prompt to work on a real task.",
      cover: "/images/guides/what-is-a-prompt.webp",
    },
    {
      slug: "what-should-you-never-share-with-ai",
      title: "The 3-Question Check Before You Paste Anything Into AI",
      reason: "See what stays out before linking a work account.",
      cover: "/images/guides/learn-master.webp",
    },
    {
      slug: "what-is-agentic",
      title: "What agentic actually means",
      reason: "See how an AI system can work across several steps and where approval belongs.",
      cover: "/images/guides/what-is-agentic.webp",
    },
  ],
} as const satisfies GuidePage;

export const whatIsAgenticGuide = {
  slug: "what-is-agentic",
  title: "4 Limits to Set Before an AI Agent Works Alone",
  promise: "Give an agent one job, the smallest access, an approval point and a way to stop.",
  cover: "/images/guides/what-is-agentic.webp",
  coverAlt: "The small blue robot mascot working beside a series of connected mechanical tools",
  seoDescription: "A beginner-friendly guide to what AI agents do, what they can access and how to test one without giving it too much control.",
  lumailTag: "guide-what-is-agentic",
  sourceNotes: [
    { label: "OpenAI: A practical guide to building agents", url: "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/" },
    { label: "OpenAI: How agents are transforming work", url: "https://openai.com/index/how-agents-are-transforming-work/" },
    { label: "Microsoft Work Trend Index: Agents and human agency", url: "https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization" },
  ],
  answer: {
    paragraphs: [
      "An AI agent is a system configured to carry out a task on your behalf. Instead of stopping after one reply, it can use an AI model to manage several steps and select from the tools and actions it has been given.",
      "That can save you serious time. It also means you need to know **what the agent can access, what it can change and where it must stop.**",
    ],
  },
  sections: [
    {
      kind: "cards",
      heading: "Chat, automation or agent?",
      introduction: "These 3 things are often mixed together, but they do different jobs.",
      items: [
        {
          title: "AI chat",
          body: "You ask a question or request a draft. The AI gives you an answer and waits for your next message. Use it when **you want to remain in charge of every step.**",
        },
        {
          title: "Automation",
          body: "You decide the steps in advance. For example, when someone completes a form, add the contact to your email list and send the confirmation email. Use it when **the path should happen the same way each time.**",
        },
        {
          title: "AI agent",
          body: "You give it a job, instructions and access to certain tools. It can work through several steps and decide which permitted action to take next based on what it finds. Use it when **the next step may change while the task is running.**",
        },
      ],
    },
    {
      kind: "cards",
      heading: "An agent only has the power you connect",
      introduction: "Ignore the label and look at what the product can actually access and do.",
      items: [
        {
          title: "Tools",
          body: "A tool is a connection to something else, such as a **browser, file, inbox, calendar, customer database or another app**. Without a connection, the agent cannot use that system.",
        },
        {
          title: "Permissions",
          body: "Permissions control whether the agent can **read, draft, update, send, delete or spend**. An agent that can read your inbox but cannot send may prepare replies without contacting anyone.",
        },
      ],
    },
    {
      kind: "cards",
      heading: "Start one step before fully automatic",
      introduction: "More access does not make an agent smarter. It simply gives its mistakes more places to travel.",
      items: [
        {
          title: "1. Let it prepare",
          body: "The agent **researches, sorts or drafts**, but cannot change anything. This is the safest place to start.",
        },
        {
          title: "2. Let it propose",
          body: "The agent prepares an action and waits for your approval. It might draft an email, find a meeting time or prepare a customer update.",
        },
        {
          title: "3. Let it act",
          body: "The agent completes an action without asking every time. Use this only after you have tested it and confirmed how to **stop or reverse the action**.",
        },
      ],
    },
    {
      kind: "steps",
      heading: "Before you connect an agent",
      introduction: "For most first uses, preparing or proposing is enough. Keep human approval where an action affects money, customers, access, privacy, rights or reputation.",
      steps: [
        {
          title: "Give it one exact job",
          body: "Do not say, **Help with customer service.** Say, **Sort new support requests by topic and prepare a draft reply.**",
        },
        {
          title: "List what it can access",
          body: "Name the files, inboxes, apps or records it needs. Give it the **minimum access required**, not everything available.",
        },
        {
          title: "List what it can change",
          body: "Be precise. Can it draft, update, send, delete or spend? Reading information is different from changing it.",
        },
        {
          title: "Set the approval point",
          body: "Decide which actions must wait for a person. Do not depend only on a written instruction that says, **Please ask first.** Restrict the permission as well.",
        },
        {
          title: "Plan what happens when it gets stuck",
          body: "Tell it to pause when information is missing, sources conflict or the task falls outside its job. Make sure you can see what changed and undo it.",
        },
      ],
    },
    {
      kind: "steps",
      heading: "Never copied a prompt before? Start here",
      introduction: "You only need one AI chat tool and a task you already understand.",
      steps: [
        {
          title: "Open one AI chat tool",
          body: "Pick one. A free personal account is enough for this exercise. For real work, use the account your organisation has approved.",
          links: [
            { label: "Open ChatGPT", href: "https://chatgpt.com/" },
            { label: "Open Claude", href: "https://claude.ai/" },
            { label: "Open Gemini", href: "https://gemini.google.com/" },
          ],
        },
        {
          title: "Start a new conversation",
          body: "Choose **New chat**, the plus sign or the empty message box.",
        },
        {
          title: "Copy the prompt below",
          body: "Click **Copy** beside the prompt. You do not need to rewrite it.",
        },
        {
          title: "Paste it into the AI tool",
          body: "Click the message box, paste the prompt and replace anything inside **square brackets** with your own details.",
        },
        {
          title: "Remove private information",
          body: "Do not paste passwords, customer records, private conversations, financial details or confidential company information.",
        },
        {
          title: "Send it",
          body: "Press Enter or the send arrow. The answer will appear in the same conversation.",
        },
      ],
    },
  ],
  tryNow: {
    heading: "Try it now: does this task need an agent?",
    introduction: "Copy this into an AI chat tool. Use one task you regularly do and remove any private information first.",
    prompt: `Help me decide whether this task needs an AI chat, a normal automation or an AI agent.

The task:
[Describe one task you regularly do.]

The steps I currently follow:
[List the steps you know.]

The information or systems involved:
[List the files, inboxes, apps or data involved.]

What could go wrong:
[Describe the consequence of a mistake.]

Before recommending anything, ask me up to 5 short questions about information you genuinely need.

Then give me:

1. The simplest suitable option: AI chat, automation or AI agent.
2. Why that option fits the task.
3. The minimum information and access it would need.
4. The actions it must never take without approval.
5. A low-risk first test.
6. A clear stopping point if something goes wrong.

Use everyday language. Do not recommend a tool or design the complete system yet.`,
    check: "Check that the answer gives you **the simplest option**, **minimum access**, **a real approval point**, **a stopping condition** and **a reversible first test**. If any of those are missing, you are not ready to connect an agent.",
  },
  conclusion: {
    heading: "You can now look past the label",
    paragraphs: [
      "You do not need to be impressed because a product calls itself an agent. Inspect the **job, access, permitted actions, approval point and stopping rule**.",
      "Start with one simple task and keep the first test in preparation mode.",
    ],
    finishLine: "Move forward only when you can see what the agent did and correct it safely.",
  },
  related: [
    {
      slug: "what-is-ai",
      title: "What AI actually is",
      reason: "Understand the larger technology before you decide whether a task needs an agent.",
      cover: "/images/guides/what-is-ai.webp",
    },
    {
      slug: "what-should-you-never-share-with-ai",
      title: "The 3-Question Check Before You Paste Anything Into AI",
      reason: "Check what information and access must stay out before you connect an agent.",
      cover: "/images/guides/learn-master.webp",
    },
    {
      slug: "ai-jargon-guide",
      title: "12 AI words you need to know",
      reason: "Understand the terms that appear when tools, providers and sales pitches explain what their systems can do.",
      cover: "/images/guides/learn-master.webp",
    },
  ],
} as const satisfies GuidePage;

export const whatNotToShareWithAiGuide = {
  slug: "what-should-you-never-share-with-ai",
  title: "The 3-Question Check Before You Paste Anything Into AI",
  promise: "Some things should never go in, some need permission first, and some are fine. Run the paste test first.",
  cover: "/images/guides/learn-master.webp",
  coverAlt: "The small blue robot mascot inspecting information beside an open book",
  seoDescription: "Learn what never to share with AI, what needs permission and how to change the privacy setting in ChatGPT, Claude, Gemini, Copilot, Grok, Meta AI and DeepSeek.",
  lumailTag: "guide-what-not-to-share-with-ai",
  sourceNotes: [
    { label: "OpenAI: ChatGPT Data Controls", url: "https://help.openai.com/en/articles/7730893-chatgpt-data-controls-faq" },
    { label: "Anthropic: model improvement privacy settings", url: "https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings" },
    { label: "Google: Gemini Apps Activity", url: "https://support.google.com/gemini/answer/13278892" },
    { label: "Microsoft: Copilot privacy controls", url: "https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls" },
    { label: "Microsoft: Microsoft 365 Copilot privacy", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy" },
    { label: "xAI: Grok consumer privacy controls", url: "https://x.ai/legal/faq" },
    { label: "Meta: Incognito Chat", url: "https://about.fb.com/news/2026/05/incognito-chat-whatsapp-meta-ai/" },
    { label: "DeepSeek Privacy Policy", url: "https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html" },
  ],
  answer: {
    paragraphs: [
      "Do not put information into an AI tool if the wrong person seeing it could **give them access, identify someone, cost you money, harm someone or break a promise**.",
      "When you are unsure, remove the real information and test the task with a public or invented example.",
    ],
  },
  sections: [
    {
      kind: "cards",
      heading: "Sort it before you paste it",
      introduction: "Most information fits into one of these three groups.",
      items: [
        {
          title: "Never paste",
          body: "Keep out **passwords, one-time codes, API keys, private links, payment details, identity documents, medical information and confidential legal information**.",
        },
        {
          title: "Ask first",
          body: "Pause before using **customer or employee information, private emails, meeting notes, internal reports, contracts, financial information or work owned by someone else**.",
        },
        {
          title: "Safer to test",
          body: "Use **public information, your own non-confidential writing, an invented example, a blank template or information with identifying details removed**.",
        },
      ],
    },
    {
      kind: "accordion",
      heading: "Find your tool. Change the setting.",
      introduction: "Turning off training gives you more control. It does not make confidential information safe to share. Open only the tool you use.",
      items: [
        {
          title: "ChatGPT",
          body: "Go to **Profile → Settings → Data Controls** and switch off **Improve the model for everyone**. You can also use Temporary Chat for a conversation you do not want saved in your history or used for training.",
          links: [{ label: "Official instructions", href: "https://help.openai.com/en/articles/7730893-chatgpt-data-controls-faq" }],
        },
        {
          title: "Claude",
          body: "Go to **Your name → Settings → Privacy** and switch off **Help Improve our AI models**. This applies to personal Claude Free, Pro and Max accounts.",
          links: [{ label: "Official instructions", href: "https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings" }],
        },
        {
          title: "Gemini",
          body: "On the website, go to **Settings & help → Activity**. Under **Keep Activity**, choose **Turn off**. You can also start a Temporary Chat. Google may still keep temporary conversations for up to 72 hours to operate and protect the service. Work or school accounts may be controlled by an administrator.",
          links: [{ label: "Official instructions", href: "https://support.google.com/gemini/answer/13278892" }],
        },
        {
          title: "Microsoft Copilot",
          body: "With a personal account, go to **Profile → Profile name → Privacy** and switch off **Training on conversation activity** and **Training on voice conversations**. Microsoft 365 Copilot work prompts and responses are not used to train the underlying models. Still use only the account and information your employer has approved.",
          links: [
            { label: "Personal Copilot instructions", href: "https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls" },
            { label: "Microsoft 365 information", href: "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy" },
          ],
        },
        {
          title: "Grok",
          body: "On the website, go to **Settings → Data → Improve the Model → Off**. On mobile, go to **Settings → Data Controls → Improve the model → Off**. You can also use Private Chat.",
          links: [{ label: "Official instructions", href: "https://x.ai/legal/faq" }],
        },
        {
          title: "Meta AI",
          body: "Use **Incognito Chat** when it appears in WhatsApp or the Meta AI app. Meta does not provide one universal training switch for every regular Meta AI experience. If Incognito Chat is unavailable, keep private information out.",
          links: [{ label: "About Incognito Chat", href: "https://about.fb.com/news/2026/05/incognito-chat-whatsapp-meta-ai/" }],
        },
        {
          title: "DeepSeek",
          body: "Open **Settings** and switch off **Improve the model for everyone**. If you cannot find the setting, request the opt-out through **privacy@deepseek.com**. Keep confidential work out even after changing the setting.",
          links: [{ label: "Official privacy policy", href: "https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html" }],
        },
      ],
    },
    {
      kind: "prose",
      heading: "The setting is not permission",
      paragraphs: [
        "A privacy setting does not give you permission to share someone else’s information.",
        "If the information belongs to a **customer, employee, client or employer**, check that you are allowed to use it before you paste it.",
      ],
      keyLine: "First check permission. Then check the tool, account and privacy setting.",
    },
  ],
  tryNow: {
    heading: "Try it now",
    introduction: "Use this before you put real information into an AI tool.",
    prompt: `I want to use AI for this task:

[Describe the task without including names, files or private details.]

The task may involve these types of information:

[List categories only, such as customer emails, employee names or public website copy.]

Do not ask me to paste the real information.

For each category, tell me:

1. Whether I should keep it out, ask for permission or use it.
2. Why.
3. What safer example I could use instead.
4. Which account or privacy setting I should check.

If you cannot know whether I have permission, tell me who I need to ask.`,
    instructions: [
      { title: "Copy the prompt", body: "Click **Copy** beside the prompt." },
      { title: "Open an approved AI tool", body: "Start a new chat in a tool you are allowed to use." },
      { title: "Paste and replace the brackets", body: "Use categories only. Do not add real names, files or private details." },
      { title: "Send and check the advice", body: "Compare the answer with your organisation’s rules before you share anything." },
    ],
    check: "The answer is useful only if it **keeps real information out**, separates **permission** from **privacy settings** and gives you a safer way to test the task.",
  },
  conclusion: {
    heading: "You now know where the line is",
    paragraphs: [
      "You can decide what stays out, what needs permission and which setting to check before you press send.",
    ],
    questions: {
      introduction: "Ask yourself:",
      items: ["Does the AI need this information?", "Am I allowed to share it?", "Have I checked the account and privacy setting?"],
    },
    finishLine: "If any answer is unclear, remove the information or use an invented example.",
  },
  related: [
    {
      slug: "what-is-ai",
      title: "What AI actually is",
      reason: "Understand what an AI system can produce and why every result still needs checking.",
      cover: "/images/guides/what-is-ai.webp",
    },
    {
      slug: "ai-jargon-guide",
      title: "12 AI words you need to know",
      reason: "Learn the everyday terms that explain what a tool can see, use and change.",
      cover: "/images/guides/learn-master.webp",
    },
    {
      slug: "what-is-agentic",
      title: "4 Limits to Set Before an AI Agent Works Alone",
      reason: "See what changes when AI can use tools, access information and take several steps.",
      cover: "/images/guides/what-is-agentic.webp",
    },
  ],
} as const satisfies GuidePage;

export const whichAiToolGuide = {
  slug: "which-ai-tool-for-what",
  title: "Which AI tool should you use?",
  promise: "Stop choosing AI tools because everyone is talking about them. Choose based on what you need done, where your work lives and what information the tool is allowed to see.",
  cover: "/images/guides/which-ai-tool-for-what.webp",
  coverAlt: "The small blue robot mascot choosing between several tools connected to a control machine",
  seoDescription: "Choose the right AI tool for your work by comparing the job, where your work lives, what the tool must access and what information it is allowed to see.",
  lumailTag: "guide-which-ai-tool-for-what",
  sourceNotes: [
    { label: "OpenAI: What is ChatGPT?", url: "https://help.openai.com/en/articles/12677804-what-is-chatgpt-faq" },
    { label: "Anthropic: What can I use Claude for?", url: "https://support.anthropic.com/en/articles/7996845-what-are-some-things-i-can-use-claude-for" },
    { label: "Google: Using Workspace with Gemini", url: "https://support.google.com/a/users/answer/15146419?hl=en" },
    { label: "Microsoft: Copilot Chat with and without a licence", url: "https://support.microsoft.com/en-us/microsoft-365-copilot/how-copilot-chat-works-with-and-without-a-microsoft-365-copilot-license" },
    { label: "Perplexity: Pro Search and sources", url: "https://www.perplexity.ai/help-center/en/articles/10352903-what-is-pro-search" },
    { label: "xAI: Grok", url: "https://x.ai/grok" },
    { label: "DeepSeek", url: "https://www.deepseek.com/en/" },
    { label: "Kimi: product overview", url: "https://www.kimi.ai/help/getting-started/overview" },
    { label: "Manus: Browser Operator", url: "https://manus.im/docs/features/browser-operator" },
    { label: "Meta AI", url: "https://ai.meta.com/meta-ai/assistant/" },
    { label: "Mistral AI: Le Chat", url: "https://help.mistral.ai/en/collections/701669-le-chat" },
  ],
  answer: {
    paragraphs: [
      "You probably do not need every AI tool. You need **one that fits the work in front of you**.",
      "Start with the job, the apps you already use and the information involved. Then test the smallest suitable option before you pay for another subscription.",
    ],
  },
  sections: [
    {
      kind: "cards",
      heading: "Start with the job",
      introduction: "Use the work you need to finish as your first filter.",
      items: [
        {
          title: "Everyday writing and thinking",
          body: "Start with a chat tool you already have. For a non-confidential note, run the same small request in two tools only if comparing them would help you choose.",
        },
        {
          title: "Work inside Microsoft 365",
          body: "Check **Microsoft Copilot Chat** in your work account. Access to work email, meetings, chats and files depends on your licence and permissions.",
        },
        {
          title: "Work inside Google Workspace",
          body: "Check **Gemini in Google Workspace** when your work is in Gmail or Docs. Your organisation may restrict the feature or its access to content.",
        },
        {
          title: "Research you need to verify",
          body: "Try **Perplexity** for public web research with source links you can open and check.",
        },
      ],
    },
    {
      kind: "accordion",
      heading: "The other tools you will hear about",
      introduction: "These tools are not less important. They simply solve different problems.",
      items: [
        {
          title: "Grok",
          body: "Useful when you want current information from the web and conversations happening on X.",
          links: [{ label: "Open Grok", href: "https://grok.com/" }],
        },
        {
          title: "DeepSeek",
          body: "Another option for chat, reasoning and technical work. Check its privacy terms before using workplace information.",
          links: [{ label: "Open DeepSeek", href: "https://chat.deepseek.com/" }],
        },
        {
          title: "Kimi",
          body: "Useful for working with long files, research and tasks that need several steps.",
          links: [{ label: "Open Kimi", href: "https://www.kimi.com/" }],
        },
        {
          title: "Manus",
          body: "Designed to carry out multi-step tasks using websites, files and browser tools. Review every permission before allowing it to act.",
          links: [{ label: "Open Manus", href: "https://manus.im/" }],
        },
        {
          title: "Meta AI",
          body: "Easy to access inside WhatsApp, Instagram, Messenger and Facebook. Better suited to everyday questions than confidential work.",
          links: [{ label: "Open Meta AI", href: "https://www.meta.ai/" }],
        },
        {
          title: "Mistral Le Chat",
          body: "A general AI assistant from the European company Mistral AI. It is worth considering when provider location, deployment choice or organisational control matters to you.",
          links: [{ label: "Open Le Chat", href: "https://chat.mistral.ai/" }],
        },
      ],
    },
  ],
  tryNow: {
    heading: "Try a small task before choosing a tool",
    introduction: "Use this complete request in a chat tool you already have, then check the answer against your original note.",
    prompt: `Turn the following non-confidential project note into a five-bullet update I can edit for my team.

NOTE
[Paste a short note you wrote yourself, or a made-up example. Remove private names, customer details and confidential information.]

Write exactly five bullets: progress, blocker, next action, owner and date. Use only the note. If the note does not name an owner or date, write "Not stated" for that bullet. Do not invent decisions, commitments or completed work.

After the five bullets, add one line headed "Check before sending" that names the facts I should compare with my original note. Keep the language plain and the whole update under 120 words.`,
    check: "Compare each bullet with your original note. Keep the draft only after correcting missing facts and anything the tool invented.",
  },
  conclusion: {
    heading: "Keep the tool that helped",
    paragraphs: [
      "You have tried a tool on a task you understand and checked the result against the original.",
    ],
    finishLine: "Do not collect tools. Choose one, test it properly and keep it only if it makes the work easier to finish.",
  },
  related: [
    {
      slug: "what-should-you-never-share-with-ai",
      title: "The 3-Question Check Before You Paste Anything Into AI",
      reason: "Check what information should stay out before testing any tool.",
      cover: "/images/guides/learn-master.webp",
    },
    {
      slug: "what-is-ai",
      title: "What AI actually is",
      reason: "Try a small task and see which part of the result you need to check.",
      cover: "/images/guides/what-is-ai.webp",
    },
    {
      slug: "what-is-agentic",
      title: "4 Limits to Set Before an AI Agent Works Alone",
      reason: "Decide if your task needs an agent or a simpler AI chat.",
      cover: "/images/guides/what-is-agentic.webp",
    },
  ],
} as const satisfies GuidePage;

export const chatGptGuide = {
  slug: "chatgpt",
  title: "Should you use ChatGPT?",
  promise: "Use ChatGPT when you want one flexible place to write, research, work with files or think through a task. You do not need every feature, and you should not connect your work accounts on day one.",
  cover: "/images/guides/chatgpt.webp",
  coverAlt: "The small blue robot mascot considering a vintage multi-tool for writing, files, images and ideas",
  seoDescription: "A beginner-friendly guide to choosing ChatGPT, using Chat, Projects, Work and Codex, checking privacy settings and completing a useful first task.",
  lumailTag: "guide-chatgpt",
  sourceNotes: [
    { label: "OpenAI: ChatGPT capabilities", url: "https://help.openai.com/en/articles/9260256-chatgpt-capabilities-overview" },
    { label: "OpenAI: The ChatGPT home page", url: "https://help.openai.com/en/articles/9125172-the-chatgpt-home-page" },
    { label: "OpenAI: Projects in ChatGPT", url: "https://help.openai.com/en/articles/10169521-projects-in-chatgpt" },
    { label: "OpenAI: ChatGPT Work and Codex", url: "https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex" },
    { label: "OpenAI: Apps in ChatGPT", url: "https://help.openai.com/en/articles/11487775-apps-in-chatgpt" },
    { label: "OpenAI: Data Controls FAQ", url: "https://help.openai.com/en/articles/7730893-chatgpt-data-controls-faq" },
    { label: "OpenAI: Memory FAQ", url: "https://help.openai.com/en/articles/8590148-memory-faq" },
    { label: "OpenAI: Using Codex with your ChatGPT plan", url: "https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan" },
  ],
  answer: {
    paragraphs: [
      "**Yes, ChatGPT is a useful first AI tool for everyday work.** Start with the free plan and one simple task. Keep it only if the result saves you time and is easy to check.",
      "Choose another tool first if your organisation requires an approved system or your work needs to remain inside a specific company platform.",
    ],
  },
  sections: [
    {
      kind: "cards",
      heading: "Choose the part you actually need",
      items: [
        { title: "Chat", body: "Use Chat for one question or task. Ask it to explain something, improve a draft, organise notes, compare options or help you think through a problem." },
        { title: "Projects", body: "Use a Project when you keep returning to the same work. It keeps related chats, files and instructions together, so you do not need to explain the background every time." },
        { title: "Work", body: "Use **Work** for a longer task that needs several steps, research or a finished deliverable. If it does not appear in your account, ignore it for now because availability varies." },
        { title: "Codex", body: "Codex is OpenAI's tool for working with code. If you do not work with software, you do not need it yet." },
      ],
    },
    {
      kind: "cards",
      heading: "Match the feature to the job",
      items: [
        { title: "Search", body: "Use Search when the answer may have changed recently. Ask for sources, then open them yourself before using the information." },
        { title: "Files and data", body: "Select the **+** button to attach a document, image or spreadsheet. Say exactly what you want ChatGPT to find, compare or explain, then check the answer against the original file." },
        { title: "Images", body: "Upload an image or screenshot and ask a specific question, or ask ChatGPT to create or edit an image. Check text, numbers, logos, faces and small details before using it." },
        { title: "Voice", body: "Select the voice button when talking is easier than typing. Review the written result because names, numbers and specialist words can be misunderstood." },
        { title: "Canvas", body: "Use Canvas when you want to work through a longer piece of writing or code. Select the section you want to change instead of rebuilding the entire draft." },
      ],
    },
    {
      kind: "steps",
      heading: "Check these settings first",
      introduction: "Set the account up before you use it for real work.",
      steps: [
        { title: "Choose whether chats help train the models", body: "On a personal account, open **Profile → Settings → Data Controls**. Turn off **Improve the model for everyone** if you do not want new conversations used to improve OpenAI's models." },
        { title: "Check what ChatGPT remembers", body: "Open **Settings → Personalization → Memory**. Review what is stored, turn Memory off or use a Temporary Chat when you do not want a conversation added to your history or memory." },
        { title: "Follow your organisation's rules", body: "Do not place confidential work inside a personal account simply because you pay for Plus or Pro. Use the workspace and tools your organisation has approved." },
      ],
    },
    {
      kind: "steps",
      heading: "Connect an app only when it solves a real problem",
      introduction: "ChatGPT can connect to email, calendars, cloud storage and other work tools. Do not connect everything because the option exists.",
      steps: [
        { title: "Open the app directory", body: "Open **Settings → Apps**, or open the Plugin directory from the tools menu." },
        { title: "Review the access", body: "Choose the app, read what information and actions it can access, then connect the correct account." },
        { title: "Start with permission prompts", body: "Choose **Always ask** when it is available, so ChatGPT asks before it uses the connected app." },
        { title: "Use the app deliberately", body: "Open a chat and select the connected app from the tools menu only when the task needs it." },
        { title: "Disconnect it properly", body: "Return to **Settings → Apps**, select the app and disconnect it. This stops future access but does not remove information already used in previous chats or memories." },
      ],
    },
    {
      kind: "prose",
      heading: "Start free and upgrade for a reason",
      paragraphs: [
        "The free plan is enough to find out whether ChatGPT helps with your work.",
        "Consider paying only when you repeatedly reach a limit during useful work, need a feature unavailable on your plan or can clearly see that the time saved is worth the subscription.",
      ],
      keyLine: "Do not upgrade because one vague instruction produced a weak answer. Improve the task, context and checking process first.",
    },
  ],
  tryNow: {
    heading: "Try it now",
    introduction: "Use rough notes that contain no private information. You will finish with a short plan you can check against your original words.",
    prompt: `I have rough notes and need a clear plan for what to do next.

Use only the information in my notes.

Please give me:

1. The outcome I appear to be working towards, in one sentence.
2. The next 3 actions, in the order I should do them.
3. The information I still need before I can act.
4. Any name, date, number or commitment that you could not verify.

Do not invent missing information. Mark it as "Needs checking."

My notes:

[Paste your non-confidential notes here]`,
    instructions: [
      { title: "Open ChatGPT", body: "Go to **chatgpt.com**, sign in if you want to save the conversation and select **New chat**.", links: [{ label: "Open ChatGPT", href: "https://chatgpt.com/" }] },
      { title: "Copy the instruction", body: "Select **Copy**, paste the instruction into the message box and replace the bracketed text." },
      { title: "Remove private information", body: "Use notes without customer details, passwords, financial information or confidential company material." },
      { title: "Send and check", body: "Send the message, then compare every action, name, date and number with your original notes." },
    ],
    check: "If ChatGPT added something that was not in your notes, remove it or verify it before acting.",
  },
  conclusion: {
    heading: "You now know where ChatGPT fits",
    paragraphs: [
      "Use **Chat** for one-off tasks, **Projects** for work you return to, **Work** for longer deliverables and **Codex** for software work.",
    ],
    finishLine: "Keep ChatGPT if it makes useful work easier to finish without creating more risk or checking than it saves.",
  },
  related: [
    { slug: "what-should-you-never-share-with-ai", title: "The 3-Question Check Before You Paste Anything Into AI", reason: "Know what must stay outside an AI tool before you connect files or accounts.", cover: "/images/guides/learn-master.webp" },
    { slug: "which-ai-tool-for-what", title: "Which AI tool should you use?", reason: "Compare the main tools before deciding which one belongs in your everyday work.", cover: "/images/guides/which-ai-tool-for-what.webp" },
    { slug: "claude", title: "3 Admin Jobs to Hand Claude This Week", reason: "Compare ChatGPT with Claude before choosing your main everyday tool.", cover: "/images/guides/claude.webp" },
  ],
} as const satisfies GuidePage;

export const geminiGuide = {
  slug: "gemini",
  title: "Should you use Gemini?",
  promise: "Use Gemini when your work already lives in Google and you want AI closer to Gmail, Drive, Docs or Calendar. Start with the Gemini app, then connect only the Google services the task genuinely needs.",
  cover: "/images/guides/gemini.webp",
  coverAlt: "The small blue robot mascot connecting mail, calendar, files and images to a vintage control desk",
  seoDescription: "A beginner-friendly guide to Gemini, Google Workspace connections, privacy settings, AI Studio and Gemini CLI, with one useful first task.",
  lumailTag: "guide-gemini",
  sourceNotes: [
    { label: "Google: Connected Apps with a work or school account", url: "https://support.google.com/gemini/answer/14959807" },
    { label: "Google: Manage Connected Apps", url: "https://support.google.com/gemini/answer/13695044" },
    { label: "Google: Gemini Apps Activity", url: "https://support.google.com/gemini/answer/13278892" },
    { label: "Google: Gemini Apps Privacy Hub", url: "https://support.google.com/gemini/answer/13594961" },
    { label: "Google: AI Studio quickstart", url: "https://ai.google.dev/gemini-api/docs/ai-studio-quickstart" },
    { label: "Google: Gemini CLI getting started", url: "https://github.com/google-gemini/gemini-cli/blob/main/docs/get-started/index.md" },
  ],
  answer: {
    paragraphs: [
      "**Yes, Gemini is worth trying when Gmail, Drive, Docs, Sheets and Calendar are already where your work happens.** Its main advantage is being close to the Google tools and information you use.",
      "Start with the free Gemini app and one simple task. Do not connect your Google account data until you understand the activity setting, permissions and information involved.",
    ],
  },
  sections: [
    {
      kind: "cards",
      heading: "Choose the part you actually need",
      items: [
        { title: "Gemini app", body: "Use **gemini.google.com** for questions, drafts, research, files, images and everyday tasks. This is where beginners should start." },
        { title: "Gemini in Google Workspace", body: "Use Gemini inside Gmail, Docs, Sheets, Slides or Meet when your account and organisation include it. This keeps the help closer to the work." },
        { title: "NotebookLM", body: "Use NotebookLM when you want answers and summaries based on sources you choose, such as reports, PDFs and notes." },
        { title: "AI Studio and Gemini CLI", body: "Use AI Studio to test prompts or build with the Gemini API. Use Gemini CLI from a terminal for technical and coding work. Most beginners can ignore both for now." },
      ],
    },
    {
      kind: "cards",
      heading: "Match Gemini to the job",
      items: [
        { title: "Find work in Google", body: "Ask Gemini to find or summarise information from a connected Gmail, Drive, Calendar, Keep or Tasks account when the connection is available and approved." },
        { title: "Work with a file", body: "Attach a document, image or spreadsheet and ask one exact question. Check the answer against the original file." },
        { title: "Research current information", body: "Ask for current information and open the sources shown beneath the answer before you rely on it." },
        { title: "Talk through an idea", body: "Use Gemini Live when speaking is easier than typing. Review the transcript and any actions before you keep or send them." },
      ],
    },
    {
      kind: "steps",
      heading: "Check the account and activity setting first",
      introduction: "Personal and work accounts do not use the same controls.",
      steps: [
        { title: "Open Gemini", body: "Go to **gemini.google.com** and sign in with the Google account you intend to use.", links: [{ label: "Open Gemini", href: "https://gemini.google.com/" }] },
        { title: "Review personal activity", body: "On a personal account, open **Settings & help → Activity**. You can review, delete or turn off **Keep Activity**. When it is off, future chats are not used to train Google's AI models, but many Connected Apps become unavailable." },
        { title: "Use a Temporary Chat when suitable", body: "Use a Temporary Chat when you do not want the conversation saved in your activity. It does not turn a personal account into an approved place for confidential work." },
        { title: "Check work or school controls", body: "On a work or school account, your Google Workspace administrator controls availability, retention and which apps Gemini can use." },
      ],
    },
    {
      kind: "steps",
      heading: "Connect Google apps deliberately",
      introduction: "A connection can expose email, files, calendar information or other account data to the task. Connect only what you need.",
      steps: [
        { title: "Open Connected Apps", body: "On a personal account, open **Settings & help → Personal Intelligence → Connected Apps**. Choose individual apps rather than selecting **Connect all**." },
        { title: "Use the correct Google account", body: "For work or school, sign in to Gemini with the same account used for Google Workspace. Your administrator must have enabled the app." },
        { title: "Call the app into the chat", body: "Type **@** in the message box and select Gmail, Drive, Calendar or another available app. Then name the file, email or task Gemini should use." },
        { title: "Check the source", body: "Open the source shown beneath Gemini's response. It can select an older email or misunderstand which file matters." },
        { title: "Disconnect when finished", body: "Return to **Connected Apps** and turn the app off. Disconnecting does not delete information already stored in Gemini Apps Activity, so review and delete that activity separately if needed." },
      ],
    },
    {
      kind: "steps",
      heading: "The advanced route",
      introduction: "Stop here unless you are building software or have technical help.",
      steps: [
        { title: "Use Google AI Studio to experiment", body: "Open AI Studio to test prompts, models and tools. An API key may be created for you, so treat it like a password and never place it in public code.", links: [{ label: "Open Google AI Studio", href: "https://aistudio.google.com/" }] },
        { title: "Use Gemini CLI from a terminal", body: "Gemini CLI can work with files and code on your computer. It requires a terminal, Node.js and a Google sign-in or API setup.", links: [{ label: "Open the Gemini CLI guide", href: "https://github.com/google-gemini/gemini-cli/blob/main/docs/get-started/index.md" }] },
        { title: "Keep the first technical task reversible", body: "Use a copy of the project, review every file change and do not connect production systems until a technical owner has checked the setup." },
      ],
    },
  ],
  tryNow: {
    heading: "Try it now",
    introduction: "Use short notes that contain no private information. Gemini will turn them into a follow-up email and a clear action list.",
    prompt: `Turn the notes below into a short follow-up email and an action list.

Use only the information I provide.

For the email:

1. State the purpose in the first sentence.
2. Keep it under 150 words.
3. Include only confirmed decisions and dates.
4. Mark missing information as [NEEDS CHECKING].

After the email, give me an action list with:

1. The action.
2. The person responsible, if named.
3. The date, if confirmed.

Do not invent names, dates or commitments.

Notes:

[Paste non-confidential notes here]`,
    instructions: [
      { title: "Open Gemini", body: "Go to **gemini.google.com** and start a new chat.", links: [{ label: "Open Gemini", href: "https://gemini.google.com/" }] },
      { title: "Copy and paste", body: "Select **Copy**, paste the instruction and replace the bracketed text." },
      { title: "Remove private information", body: "Do not include customer details, private email, passwords or confidential company information." },
      { title: "Check before sending", body: "Compare every decision, owner and date with your original notes. Do not send the draft directly from a connected app until you have checked it." },
    ],
    check: "The result is ready only when every action, name and date can be traced back to your notes.",
  },
  conclusion: {
    heading: "You now know where Gemini fits",
    paragraphs: [
      "Use the **Gemini app** for one task, **Workspace features** when the work already lives in Google, **NotebookLM** for selected sources and **AI Studio or Gemini CLI** only for technical work.",
    ],
    finishLine: "Keep Gemini if working closer to your Google tools saves more time than the connection and checking create.",
  },
  related: [
    { slug: "what-should-you-never-share-with-ai", title: "The 3-Question Check Before You Paste Anything Into AI", reason: "Check what stays out before you connect Gmail, Drive or Calendar.", cover: "/images/guides/learn-master.webp" },
    { slug: "chatgpt", title: "Should you use ChatGPT?", reason: "Compare Gemini with a broader standalone assistant before choosing your main tool.", cover: "/images/guides/chatgpt.webp" },
    { slug: "claude", title: "3 Admin Jobs to Hand Claude This Week", reason: "See whether careful document work matters more than Google integration.", cover: "/images/guides/claude.webp" },
  ],
} as const satisfies GuidePage;

export const guidePages = [instagramDashboardGuide, whatIsAiGuide, aiJargonGuidePage, whatIsAgenticGuide, whatNotToShareWithAiGuide, whichAiToolGuide, chatGptGuide, claudeGuide, claudeProjectsGuide, geminiGuide, copilotGuide, metaAiGuide, grokGuide, deepSeekGuide, kimiGuide, manusGuide, mistralGuide, promptGuide, aiBrowserGuide, aiConnectionsGuide, aiSkillsGuide, aiSearchGuide, ...modelSeriesGuides, ...researchGuideSeries, ...newGuidePages] as const;

// Every public recommendation points to a currently approved guide. Review pages
// retain their own draft recommendations until their individual editorial pass.
export const approvedRelatedSelections: Record<string, readonly [string, string, string]> = {
  "what-is-ai": ["what-is-a-prompt", "claude", "what-should-you-never-share-with-ai"],
  "ai-jargon-guide": ["what-is-ai", "what-is-agentic", "connect-ai-to-email-files-calendar"],
  "what-is-agentic": ["connect-ai-to-email-files-calendar", "what-should-you-never-share-with-ai", "claude"],
  "what-should-you-never-share-with-ai": ["connect-ai-to-email-files-calendar", "what-is-agentic", "what-is-ai"],
  "check-copilot-excel-edits": ["make-work-tracker-with-kimi", "what-is-a-prompt", "what-can-copilot-see-at-work"],
  "review-grok-suggestions": ["get-better-professional-writing-from-grok", "connect-ai-to-email-files-calendar", "what-should-you-never-share-with-ai"],
  "get-better-professional-writing-from-grok": ["review-grok-suggestions", "show-up-in-ai-search", "what-should-you-never-share-with-ai"],
  "make-work-tracker-with-kimi": ["check-copilot-excel-edits", "teach-claude-a-repeatable-workflow", "claude"],
  "instagram-content-dashboard": ["what-should-you-never-share-with-ai", "what-is-agentic", "show-up-in-ai-search"],
  "connect-ai-to-email-files-calendar": ["what-should-you-never-share-with-ai", "what-is-agentic", "what-can-copilot-see-at-work"],
  "show-up-in-ai-search": ["chatgpt-customer-research-with-evidence", "which-ai-tool-for-what", "what-is-a-prompt"],
  "which-ai-tool-for-what": ["what-is-ai", "what-is-a-prompt", "connect-ai-to-email-files-calendar"],
  "make-chatgpt-answers-shorter": ["claude", "what-is-a-prompt", "what-is-ai"],
  "stop-chatgpt-forgetting-context": ["teach-claude-a-repeatable-workflow", "claude", "make-chatgpt-answers-shorter"],
  "chatgpt-scheduled-tasks": ["teach-claude-a-repeatable-workflow", "what-is-agentic", "what-can-copilot-see-at-work"],
  "chatgpt-screen-recording-to-process-guide": ["teach-claude-a-repeatable-workflow", "what-is-a-prompt", "make-chatgpt-answers-shorter"],
  "chatgpt-customer-research-with-evidence": ["chatgpt-screen-recording-to-process-guide", "what-should-you-never-share-with-ai", "show-up-in-ai-search"],
  "claude": ["stop-chatgpt-forgetting-context", "make-chatgpt-answers-shorter", "what-is-a-prompt"],
  "claude-projects": ["stop-chatgpt-forgetting-context", "teach-claude-a-repeatable-workflow", "claude"],
  "teach-claude-a-repeatable-workflow": ["claude-projects", "claude", "chatgpt-screen-recording-to-process-guide"],
  "gemini-cannot-find-drive-file": ["connect-ai-to-email-files-calendar", "claude", "gemini-google-tasks-limits"],
  "gemini-google-tasks-limits": ["gemini-cannot-find-drive-file", "claude", "what-is-agentic"],
  "what-can-copilot-see-at-work": ["connect-ai-to-email-files-calendar", "check-copilot-excel-edits", "teach-claude-a-repeatable-workflow"],
  "test-meta-muse-money-saving-task": ["which-ai-tool-for-what", "what-should-you-never-share-with-ai", "what-is-an-ai-browser"],
  "verify-grok-current-research": ["get-better-professional-writing-from-grok", "chatgpt-customer-research-with-evidence", "what-is-an-ai-browser"],
  "test-grok-repeated-image-edits": ["get-better-professional-writing-from-grok", "what-is-a-prompt", "which-ai-tool-for-what"],
  "fix-deepseek-wall-of-text": ["what-is-a-prompt", "make-chatgpt-answers-shorter", "stop-ai-agreeing-with-you"],
  "test-deepseek-v4-document-work": ["fix-deepseek-wall-of-text", "chatgpt-customer-research-with-evidence", "what-should-you-never-share-with-ai"],
  "manus-browser-workflow": ["what-is-an-ai-browser", "connect-ai-to-email-files-calendar", "what-should-you-never-share-with-ai"],
  "what-is-a-prompt": ["make-chatgpt-answers-shorter", "claude", "what-should-you-never-share-with-ai"],
  "what-is-an-ai-browser": ["what-is-agentic", "connect-ai-to-email-files-calendar", "what-should-you-never-share-with-ai"],
  "ai-skills-worth-learning-for-work": ["what-is-a-prompt", "what-is-agentic", "which-ai-tool-for-what"],
  "stop-ai-agreeing-with-you": ["catch-ai-making-things-up", "test-business-idea-with-ai", "what-is-a-prompt"],
  "catch-ai-making-things-up": ["stop-ai-agreeing-with-you", "ai-jargon-guide", "what-should-you-never-share-with-ai"],
  "ai-quit-or-stay-decision": ["is-ai-coming-for-my-job", "stop-ai-agreeing-with-you", "ai-skills-worth-learning-for-work"],
  "is-ai-coming-for-my-job": ["ai-skills-worth-learning-for-work", "ai-quit-or-stay-decision", "ai-job-interview-practice"],
  "test-business-idea-with-ai": ["launch-your-product-in-30-days", "stop-ai-agreeing-with-you", "chatgpt-customer-research-with-evidence"],
  "weekend-projects-with-claude": ["what-is-ai", "test-meta-muse-money-saving-task", "make-work-tracker-with-kimi"],
  "money-plan-with-ai": ["test-meta-muse-money-saving-task", "what-should-you-never-share-with-ai", "catch-ai-making-things-up"],
  "ai-job-interview-practice": ["is-ai-coming-for-my-job", "ai-quit-or-stay-decision", "ai-skills-worth-learning-for-work"],
  "launch-your-product-in-30-days": ["test-business-idea-with-ai", "marketing-emails-that-sell", "chatgpt-customer-research-with-evidence"],
  "marketing-emails-that-sell": ["launch-your-product-in-30-days", "test-business-idea-with-ai", "stop-ai-agreeing-with-you"],
};

export function getGuidePage(slug: string): GuidePage | undefined {
  const guide = guidePages.find((item) => item.slug === slug) as GuidePage | undefined;
  if (!guide) return undefined;
  const selections = approvedRelatedSelections[slug];
  if (!selections) return guide;
  const related = selections.map((targetSlug) => {
    const target = guidePages.find((item) => item.slug === targetSlug) as GuidePage | undefined;
    if (!target) throw new Error(`Unknown related guide: ${targetSlug}`);
    const batch = batchOneGuides[target.slug];
    return { slug: target.slug, title: batch?.title ?? target.title, reason: batch?.hero.line ?? target.promise, cover: target.cover };
  }) as [GuideRelated, GuideRelated, GuideRelated];
  return { ...guide, related };
}
