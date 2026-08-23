export type GuideStep = {
  title: string;
  body: string;
  links?: readonly { label: string; href: string }[];
};

export type GuideSection =
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
  sections: readonly [GuideSection, GuideSection, ...GuideSection[]];
  tryNow: {
    heading: string;
    introduction: string;
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
  };
  related: readonly [GuideRelated, GuideRelated, GuideRelated];
};

export const whatIsAiGuide = {
  slug: "what-is-ai",
  title: "What AI actually is",
  promise: "You do not need to understand how AI is built. You just need to know what it can do, where it can go wrong and what you still need to check.",
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
      "**AI is not one app.** It is a name for technologies that can work with language, recognise images, make predictions and create content.",
      "An AI system takes in information and produces a result for a specific job. **That result can still be wrong, so you need to check it.**",
    ],
  },
  sections: [
    {
      kind: "cards",
      heading: "What an AI system can produce",
      introduction: "You will usually see 1 or more of these 4 kinds of output.",
      items: [
        { title: "Classification", body: "It can place something into a category, like marking a message as **spam or not spam**." },
        { title: "Prediction", body: "It can estimate what may happen next, like which customers may **need support soon**." },
        { title: "Recommendation", body: "It can suggest an option, like the **next product to show** or the fastest route to take." },
        { title: "Content", body: "It can produce a **draft, image, summary, translation or piece of code** from the input it receives." },
      ],
    },
    {
      kind: "prose",
      heading: "What makes an AI system different",
      paragraphs: [
        "AI systems still use software. What changes is **how they produce the result**.",
        "Give an AI tool a new email, image or question, and it can respond to that new information. That is why the same tool can **summarise a document, sort messages, recommend an option or create a draft**.",
      ],
    },
    {
      kind: "prose",
      heading: "What AI cannot decide for you",
      paragraphs: [
        "An AI system only works with the input, data and sources available to it. It does not automatically know **which source you trust**, **what your customer expects** or **what a mistake would cost**.",
        "It can sound completely sure and still be wrong. Check the answer against the original information, especially when it could affect **money, access, rights, customers or reputation**.",
      ],
      keyLine: "AI gives you an output. You decide whether it is accurate, appropriate and safe to use.",
    },
  ],
  tryNow: {
    heading: "Try it now",
    introduction: "Copy this into an AI tool. Use a short piece of text that **contains no private information**.",
    prompt: `I am testing how carefully you use source text. Use only the text I provide below.

Please:
1. Summarise it in 3 clear bullets.
2. Under each bullet, quote the exact sentence or detail from my text that supports it.
3. If my text does not support a bullet, write "Not provided."
4. Do not add facts or assumptions.

Text:
[Paste a short, non-confidential email, note or document here]`,
    check: "When the answer comes back, **check every quote against your original text**. If a quote does not support the bullet, do not use that bullet.",
  },
  conclusion: {
    heading: "You have enough to get started",
    paragraphs: [
      "You now understand what the term means, why AI can produce different answers and why a confident answer can still be wrong.",
    ],
    questions: {
      introduction: "When you meet a new AI tool, ask 3 questions:",
      items: ["What goes in?", "What comes out?", "Who checks the result?"],
    },
    finishLine: "If you can answer those, you can decide whether the tool is useful for your work.",
  },
  related: [
    {
      slug: "ai-jargon-guide",
      title: "12 AI words you need to know",
      reason: "Learn the everyday terms that appear in tools, meetings and sales pitches.",
      cover: "/images/guides/learn-master.webp",
    },
    {
      slug: "what-is-a-prompt",
      title: "What a prompt actually is",
      reason: "Learn how to give an AI tool a clear job and enough useful context.",
      cover: "/images/guides/what-is-a-prompt.webp",
    },
    {
      slug: "which-ai-tool-for-what",
      title: "Which AI tool should you use?",
      reason: "Match the job to the tool before you open another account.",
      cover: "/images/guides/chatgpt.webp",
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
          body: "The app is what you open. The **AI model** is one of the parts doing the work behind it. A product can use one or more models. **Why it matters:** A newer model may be more capable, but its name alone does not prove the product is useful for your work.",
        },
        {
          title: "Generative AI",
          body: "AI that creates new **text, images, audio, video or code** from instructions and input. **Why it matters:** The result may look convincing without being accurate, original or safe to use.",
        },
        {
          title: "LLM",
          body: "Short for **large language model**. It is a type of AI model built to work with language, such as writing, summarising, translating, classifying and answering questions. **Why it matters:** Polished language can still contain a wrong claim.",
        },
        {
          title: "Chatbot or AI assistant",
          body: "The conversational screen where you type or speak to an AI tool. An assistant may also use files, search, memory or connected apps. **Why it matters:** The word assistant does not tell you what it can access. Check the permissions.",
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
          body: "What you give the AI to guide its response. A prompt can include a question, instructions, background, examples, files and the format you want. **Why it matters:** A prompt is a brief. If important information is missing, the tool may guess.",
        },
        {
          title: "Context and context window",
          body: "**Context** is the information available to the AI for this response. The **context window** is the limit on how much it can work with at once. **Why it matters:** In a long chat, earlier instructions or details may be missed.",
        },
        {
          title: "Training data",
          body: "The data and examples used to develop a model before you use it. This is not the same as the information you enter in your current chat. **Why it matters:** Whether your chats are stored or used to improve a service depends on the product, account and settings.",
        },
        {
          title: "Hallucination",
          body: "Information the AI invents or cannot support but presents as true. It may be a whole answer or one false name, date, quote, link or statistic. **Why it matters:** Check important claims against the original source.",
        },
      ],
    },
    {
      kind: "cards",
      heading: "What the tool can access or do",
      introduction: "These words tell you whether the tool goes beyond a simple text response.",
      items: [
        {
          title: "Multimodal",
          body: "AI that can work with more than one type of content, such as **text, images, audio or video**. **Why it matters:** Supporting several formats does not mean it handles every format equally well.",
        },
        {
          title: "Connector or integration",
          body: "A link between the AI tool and another service, such as your email, calendar, cloud drive or customer system. It may let the tool read information or take an action. **Why it matters:** Check what it can see, change, send or delete.",
        },
        {
          title: "Automation",
          body: "Software that runs a process when a trigger or rule is met. An automation may use AI for one step, but automation and AI are not the same thing. **Why it matters:** Ask what starts it, what happens next and what happens if it fails.",
        },
        {
          title: "AI agent",
          body: "A system that uses an AI model, instructions and tools to work towards a goal across several steps. What it can actually do depends on the tools, connections and permissions it has. **Why it matters:** More capability needs clearer limits and approval points.",
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
    heading: "Try it now: decode one AI claim",
    introduction: "Copy this prompt into your AI tool, then paste one product description, meeting note or sentence you want explained.",
    prompt: `I am new to AI.

Explain the text below like a friend who understands the technology, not like a salesperson.

For every AI term or technical claim:

1. Tell me what it means in everyday language.
2. Tell me what it changes in practice.
3. Tell me what the tool may be able to access or do.
4. Give me one question I should ask before I trust the claim.

If a phrase is vague marketing language, write:

“This does not tell you enough yet.”

Do not introduce new AI terms without explaining them.

Only use information supported by the text. Do not invent product features.

Text:
[Paste the sentence, product description or meeting note here]`,
    check: "Check the answer against the original text. You should be able to see **the actual task**, **the information used**, **what the tool may access** and **what a person still needs to check**. Remove any claim that is not supported by the original.",
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
      title: "What a prompt actually is",
      reason: "Learn how to give an AI tool a clear job, useful context and a result you can check.",
      cover: "/images/guides/what-is-a-prompt.webp",
    },
    {
      slug: "which-ai-tool-for-what",
      title: "Which AI tool should you use?",
      reason: "Match the job to the tool before you open another account.",
      cover: "/images/guides/chatgpt.webp",
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
  title: "What AI agents actually do",
  promise: "AI agents do more than give you an answer. They can work through a task, use connected tools and take actions on your behalf.",
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
      "Start with one low-risk task and keep the first test in preparation mode.",
    ],
    finishLine: "Move forward only when you can see what the agent did and correct it safely.",
  },
  related: [
    {
      slug: "which-ai-tool-for-what",
      title: "Which AI tool should you use?",
      reason: "Match the work to the right kind of tool before you open another account.",
      cover: "/images/guides/chatgpt.webp",
    },
    {
      slug: "what-is-a-prompt",
      title: "What a prompt actually is",
      reason: "Learn how to give an AI tool a clear job, useful context and a result you can check.",
      cover: "/images/guides/what-is-a-prompt.webp",
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
  title: "What should you never share with AI?",
  promise: "Know what must stay out, what needs permission and which privacy setting to change before you paste anything.",
  cover: "/images/guides/learn-master.webp",
  coverAlt: "The small blue robot mascot inspecting information beside an open book",
  seoDescription: "Learn what never to share with AI, what needs permission and how to change the privacy setting in ChatGPT, Claude, Gemini, Copilot, Grok, Meta AI and DeepSeek.",
  lumailTag: "guide-what-not-to-share-with-ai",
  sourceNotes: [
    { label: "OpenAI: ChatGPT Data Controls", url: "https://help.openai.com/en/articles/7730893-chatgpt-data-controls-faq" },
    { label: "Anthropic: model improvement privacy settings", url: "https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings" },
    { label: "Google: Gemini Apps Activity", url: "https://support.google.com/gemini/answer/13278892" },
    { label: "Microsoft: Copilot privacy controls", url: "https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls" },
    { label: "Microsoft: Microsoft 365 Copilot privacy", url: "https://learn.microsoft.com/en-us/deployoffice/privacy/microsoft-365-copilot" },
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
          body: "On the website, go to **Menu → Settings & help → Activity → Turn off**. On mobile, go to **Menu → Profile → Gemini Apps Activity → Turn off**. You can also start a Temporary Chat. Google may still keep temporary conversations for up to 72 hours to operate and protect the service.",
          links: [{ label: "Official instructions", href: "https://support.google.com/gemini/answer/13278892" }],
        },
        {
          title: "Microsoft Copilot",
          body: "With a personal account, go to **Profile → Profile name → Privacy** and switch off **Training on conversation activity** and **Training on voice conversations**. Microsoft 365 Copilot work prompts and responses are not used to train the underlying models. Still use only the account and information your employer has approved.",
          links: [
            { label: "Personal Copilot instructions", href: "https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls" },
            { label: "Microsoft 365 information", href: "https://learn.microsoft.com/en-us/deployoffice/privacy/microsoft-365-copilot" },
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
      slug: "which-ai-tool-for-what",
      title: "Which AI tool should you use?",
      reason: "Match the task to the right tool and account before you share any work.",
      cover: "/images/guides/chatgpt.webp",
    },
    {
      slug: "what-is-a-prompt",
      title: "What a prompt actually is",
      reason: "Learn what to include without sharing more information than the task needs.",
      cover: "/images/guides/what-is-a-prompt.webp",
    },
    {
      slug: "what-is-agentic",
      title: "What AI agents actually do",
      reason: "See what changes when AI can use tools, access information and take several steps.",
      cover: "/images/guides/what-is-agentic.webp",
    },
  ],
} as const satisfies GuidePage;

export const guidePages = [whatIsAiGuide, aiJargonGuidePage, whatIsAgenticGuide, whatNotToShareWithAiGuide] as const;

export function getGuidePage(slug: string) {
  return guidePages.find((guide) => guide.slug === slug);
}
