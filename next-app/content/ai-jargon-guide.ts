export type JargonCategory = "Basics" | "How it works" | "Building" | "Risk";

export type JargonEntry = {
  term: string;
  aliases?: string[];
  category: JargonCategory;
  plain: string;
  meeting: string;
  example: string;
};

export const aiJargonGuide = {
  slug: "ai-jargon-guide",
  label: "Interactive field guide · 8 minute read",
  title: "Walk into your next AI meeting knowing what to ask",
  deck: "You do not need to sound technical. Learn the three moves that turn a fog of AI jargon into a decision everyone can understand.",
  updated: "21 August 2026",
  cover: "/images/guides/learn-master.webp",
  coverAlt: "The Blue Princess sorting a cloud of AI symbols into clear shapes",
  translatorTitle: "Your turn: stop the meeting without stopping the momentum",
  translatorIntro: "Paste the sentence that made the room nod too quickly. The decoder spots the terms in this guide and gives you the question that brings the conversation back to earth. It works locally in your browser; nothing is sent anywhere.",
  translatorExample: "We’re using RAG with an agent and an MCP connection, but the context window is pushing up our token spend.",
  glossaryTitle: "Build your translation deck",
  glossaryIntro: "Do not memorise the dictionary. Pick the words showing up in your work and learn three things: what each means, where it appears, and what to ask next.",
  quizTitle: "Can you spot the decision hiding behind the jargon?",
  quizIntro: "Four quick situations. No points for sounding clever. You win by asking the question that protects the decision.",
  meetingCardTitle: "Take the meeting card",
  meetingCardIntro: "Five questions that work when jargon starts replacing a clear explanation.",
  meetingQuestions: [
    "In plain English, what job does this system complete?",
    "What information does it need, and where does that information go?",
    "What can it do without approval, and what still needs a person?",
    "How will we know when the answer or action is wrong?",
    "What does the full workflow cost—not just the model call?",
  ],
  story: {
    success: {
      label: "Success",
      title: "The room goes quiet—and this time, you know exactly what to say.",
      body: "A vendor has just promised an agentic, RAG-powered assistant. Everyone looks impressed. You ask one calm question: ‘What can it do without approval, and how do we verify the answer?’ The conversation changes. Features become decisions. Risks become visible. You are no longer trying to keep up with the words; you are leading the room toward clarity.",
    },
    gap: {
      label: "The gap",
      title: "Right now, the words arrive faster than the meaning.",
      body: "You recognise ‘AI’. Then come tokens, context windows, embeddings and MCP. You can either interrupt every sentence, pretend it makes sense, or quietly search later—after the decision has already moved on. None of those options helps you lead.",
    },
    proof: {
      label: "Proof in 30 seconds",
      title: "You already know how to do the important part.",
      body: "The technical sentence below is only hiding three ordinary questions: What information does the system use? What action can it take? What will that access cost or expose? Decode it and watch the fog disappear.",
    },
    realProblem: {
      label: "The real problem",
      title: "Jargon is not the enemy. Unexamined decisions are.",
      body: "You do not need an engineer’s vocabulary. You need enough understanding to find the claim, expose the trade-off and locate the human decision. A perfect definition with no next question is trivia. A plain explanation that changes what the team decides is useful.",
    },
    system: {
      label: "The system",
      title: "Use the S.A.Y. method when the room gets foggy.",
      steps: [
        { name: "Spot the claim", detail: "What is the system supposed to know, produce or do? Ignore the impressive adjectives." },
        { name: "Ask for plain English", detail: "Replace the term with its job: retrieve information, generate an answer, connect a tool or take an action." },
        { name: "Yield to the decision", detail: "Ask about evidence, access, approval, failure or full cost. Choose the question that changes what happens next." },
      ],
    },
    transformation: {
      label: "Transformation",
      title: "From ‘I should know this’ to ‘the team should explain this.’",
      before: "Before: you collect definitions so you can survive the conversation.",
      after: "After: you translate claims so the whole team can make a better decision.",
      body: "That is the shift: fluency is not using more jargon. It is making complexity discussable without removing the important nuance.",
    },
    openLoop: {
      label: "The open loop",
      title: "Knowing the words gets you into the decision. Designing the system is the next move.",
      body: "Your next AI conversation will raise a harder question: should this be a prompt, a predictable workflow or an agent with room to act? That choice shapes the cost, control and risk of everything that follows.",
    },
  },
} as const;

export const jargonEntries: JargonEntry[] = [
  {
    term: "AI model",
    aliases: ["model", "LLM", "large language model"],
    category: "Basics",
    plain: "The pattern-making engine underneath an AI product. It predicts a useful next response from what it was given.",
    meeting: "Which model are we using, and why is it suitable for this job?",
    example: "Claude, Gemini and GPT are model families. The apps built around them are products.",
  },
  {
    term: "Prompt",
    category: "Basics",
    plain: "The brief you give the system: the task, context, constraints and required output.",
    meeting: "What instructions and examples are we actually giving it?",
    example: "‘Write an email’ is a request. A useful prompt also explains the audience, goal, evidence and limits.",
  },
  {
    term: "Token",
    aliases: ["tokens", "token spend"],
    category: "How it works",
    plain: "A small unit of text used to measure what a model reads and writes.",
    meeting: "Are we paying to send the same unnecessary context every time?",
    example: "Long instructions, files and answers all consume tokens and can increase cost and latency.",
  },
  {
    term: "Context window",
    aliases: ["context"],
    category: "How it works",
    plain: "The finite amount of instructions, conversation and source material the model can consider in one request.",
    meeting: "What must be in context for this task, and what can be left out?",
    example: "A long conversation can become less reliable when the important instruction is buried in old material.",
  },
  {
    term: "RAG",
    aliases: ["retrieval-augmented generation", "retrieval augmented generation"],
    category: "Building",
    plain: "The system searches approved material first, then gives the relevant passages to the model before it answers.",
    meeting: "Which sources can it retrieve, how current are they, and does the answer cite them?",
    example: "A policy assistant can search the current handbook before answering instead of relying on general training.",
  },
  {
    term: "Fine-tuning",
    aliases: ["fine tune", "fine-tuned", "fine tuned"],
    category: "Building",
    plain: "Additional training that changes how a model behaves for a narrower pattern of tasks.",
    meeting: "What failed with better instructions, examples or retrieval before we chose extra training?",
    example: "Fine-tuning can help repeat a specialist format. It is not the default way to load changing company facts.",
  },
  {
    term: "Agent",
    aliases: ["agents", "agentic"],
    category: "Building",
    plain: "A system that can choose and perform several steps toward a goal, often by using tools.",
    meeting: "Which actions can it take, where does it stop, and who approves consequential steps?",
    example: "An inbox agent might classify a message, look up the account and draft a reply—but sending should have a clear approval rule.",
  },
  {
    term: "Workflow",
    aliases: ["automation"],
    category: "Building",
    plain: "A defined sequence of steps. Unlike an agent, the path is usually designed in advance.",
    meeting: "Do we need flexible judgment here, or would a predictable workflow be safer and cheaper?",
    example: "Copying an approved form submission into a CRM is usually a workflow, not an agent problem.",
  },
  {
    term: "MCP",
    aliases: ["model context protocol"],
    category: "Building",
    plain: "A shared standard for exposing tools and data sources to AI applications.",
    meeting: "What access does this connection grant, and is it read-only or able to make changes?",
    example: "An MCP server might let an AI application search documents or create a task in another system.",
  },
  {
    term: "API",
    aliases: ["application programming interface"],
    category: "Building",
    plain: "A documented way for one piece of software to request data or actions from another.",
    meeting: "What data crosses this connection, and what happens when the other service is unavailable?",
    example: "A workflow can call a CRM API to retrieve a customer record without a person opening the CRM.",
  },
  {
    term: "Embedding",
    aliases: ["embeddings", "vector"],
    category: "How it works",
    plain: "A numerical representation that helps software find items with similar meaning.",
    meeting: "What content is being indexed, and how do we remove or refresh it?",
    example: "Embeddings can help a search find ‘late invoice’ when the document says ‘overdue payment’.",
  },
  {
    term: "Multimodal",
    category: "How it works",
    plain: "Able to work with more than one kind of input or output, such as text, images, audio or video.",
    meeting: "Which formats does this specific product support well enough for our use case?",
    example: "A multimodal system might read a photographed receipt and return structured text.",
  },
  {
    term: "Hallucination",
    aliases: ["hallucinate", "hallucinations"],
    category: "Risk",
    plain: "A fluent answer that contains invented or unsupported information.",
    meeting: "How will we verify important claims before anyone acts on them?",
    example: "A confident citation can still be fabricated. Confidence is not evidence.",
  },
  {
    term: "Guardrail",
    aliases: ["guardrails"],
    category: "Risk",
    plain: "A rule or technical control intended to constrain what the system can access, produce or do.",
    meeting: "Is this a written instruction, or a control the system cannot bypass?",
    example: "‘Do not send refunds over £100’ is weak if the sending tool still allows it. Enforced permissions are stronger.",
  },
  {
    term: "Open weights",
    aliases: ["open-weight", "open weight"],
    category: "Basics",
    plain: "The trained model files are available to download under a stated licence.",
    meeting: "What does the licence permit, and who will operate and secure the model?",
    example: "Available weights can enable private deployment, but they do not automatically make a model free, safe or fully open source.",
  },
];

export const jargonQuiz = [
  {
    question: "A vendor says its assistant ‘uses RAG, so it cannot hallucinate.’ What is the best response?",
    choices: [
      "Ask which model it uses",
      "Ask how answers are tied to retrieved sources and what happens when retrieval fails",
      "Accept the claim because RAG removes hallucinations",
    ],
    answer: 1,
    explanation: "Retrieval can ground an answer, but the system can retrieve the wrong passage, miss the right one or still make an unsupported claim.",
  },
  {
    question: "A team wants an agent to approve refunds. Which question matters first?",
    choices: [
      "How creative is the model?",
      "How many tokens does a refund use?",
      "What authority can it exercise, and which refunds require human approval?",
    ],
    answer: 2,
    explanation: "Start with authority and consequences. Model choice and cost come after the control boundary is clear.",
  },
  {
    question: "Your company handbook changes every month. What is usually the better first approach?",
    choices: [
      "Fine-tune the model every month",
      "Retrieve the current approved handbook when answering",
      "Increase temperature",
    ],
    answer: 1,
    explanation: "Changing facts usually belong in an updateable source the system retrieves, not in repeated model training.",
  },
  {
    question: "A long AI session starts ignoring an instruction from the beginning. What should you inspect?",
    choices: [
      "The context being carried into the request",
      "Whether the model is multimodal",
      "Whether the interface has an API",
    ],
    answer: 0,
    explanation: "The important instruction may be buried, summarised away or competing with too much irrelevant context.",
  },
] as const;
