export type GuideTerm = {
  term: string;
  plain: string;
  picture: string;
  ask: string;
};

export type GuideSection = {
  label: string;
  title: string;
  intro: string;
  terms: GuideTerm[];
};

export const aiJargonGuide = {
  slug: "ai-jargon-guide",
  label: "A plain-English guide · 10 minute read",
  title: "The AI words they keep using—explained like a human",
  deck: "Twelve terms you will hear in AI conversations, what they actually mean, and the question to ask before your team makes a decision.",
  updated: "21 August 2026",
  author: "Fatiha Chikh",
  cover: "/images/guides/learn-master.webp",
  coverAlt: "The Blue Princess turning a cloud of AI language into clear, useful ideas",
  opening: [
    "Someone says: “We’re building an agent using RAG and MCP.”",
    "A few people nod. The conversation moves on. Yet nobody has said what the system will do, which information it can reach, or whether it can take action without a person.",
    "That is the real problem with AI jargon. The words are not difficult once someone explains them. But when nobody does, important decisions can hide behind impressive language.",
  ],
  promise: "You do not need to become technical. You need enough clarity to picture what is happening—and to ask the question that brings the decision back into the room.",
  sections: [
    {
      label: "Part one",
      title: "The words behind the answer",
      intro: "Start with what the AI receives, what produces the answer, and why long conversations can change the result.",
      terms: [
        {
          term: "AI model",
          plain: "The engine inside an AI product. It learned patterns from large amounts of data and uses those patterns to produce a response.",
          picture: "ChatGPT is the car you use. GPT is one of the engines that can power it.",
          ask: "Which model are we using, and why is it right for this job?",
        },
        {
          term: "Prompt",
          plain: "The instructions you give the AI: what you want, the context it needs, the boundaries it must respect, and the shape of the answer.",
          picture: "A prompt is a brief. “Write an email” is vague; audience, goal, evidence and limits make the brief useful.",
          ask: "What instructions and examples are we actually giving it?",
        },
        {
          term: "Token",
          plain: "A small piece of text that AI systems use to measure what they read and write. Your instructions, documents and the answer all use tokens.",
          picture: "Think of tokens like ingredients counted at the kitchen door. More ingredients can mean more time and cost.",
          ask: "Are we repeatedly paying to send information the AI does not need?",
        },
        {
          term: "Context window",
          plain: "The amount of information the model can consider at one time: instructions, conversation history and source material.",
          picture: "It is the AI’s working desk. If you pile too much onto it, the important note can disappear underneath everything else.",
          ask: "What must be in context for this task, and what can be left out?",
        },
      ],
    },
    {
      label: "Part two",
      title: "The words behind the system",
      intro: "These terms explain where the AI gets information, how software connects, and whether the route is fixed or flexible.",
      terms: [
        {
          term: "RAG",
          plain: "Short for retrieval-augmented generation. The system searches approved material first, then gives the useful passages to the model before it answers.",
          picture: "Instead of answering from memory, the AI opens the current company handbook and reads the relevant page.",
          ask: "Which sources can it search, how current are they, and can I see what supported the answer?",
        },
        {
          term: "Fine-tuning",
          plain: "Extra training that changes how a model behaves for a narrower, repeated kind of task.",
          picture: "It can teach a model to follow a specialist format. It is usually not the best way to add facts that change every month.",
          ask: "What could not be solved with clearer instructions, examples or retrieval first?",
        },
        {
          term: "Workflow",
          plain: "A sequence of steps decided in advance. The system follows the route you designed.",
          picture: "When a form arrives, save the contact, send the email, and notify the owner. Same route each time.",
          ask: "Would a predictable workflow be safer and cheaper than giving AI room to decide?",
        },
        {
          term: "Agent",
          plain: "A system that can choose and perform several steps toward a goal, often by using other tools.",
          picture: "An inbox agent may read a message, look up the customer, decide the next step and draft a reply.",
          ask: "What can it do by itself, where must it stop, and who approves consequential actions?",
        },
        {
          term: "API",
          plain: "A defined way for one piece of software to request information or an action from another.",
          picture: "It is a service counter between two systems: one asks in an agreed format, the other returns a result.",
          ask: "What data crosses this connection, and what happens when the other service is unavailable?",
        },
        {
          term: "MCP",
          plain: "Short for Model Context Protocol. It is a shared way for AI applications to discover and use connected tools or data sources.",
          picture: "Instead of building a different plug for every appliance, MCP aims to give AI tools a common socket.",
          ask: "What access does this connection give the AI—and can it only read, or can it also make changes?",
        },
      ],
    },
    {
      label: "Part three",
      title: "The words behind the risk",
      intro: "Good AI decisions are not only about what the system can do. They are also about how it can fail and what prevents a mistake from becoming an action.",
      terms: [
        {
          term: "Hallucination",
          plain: "An answer that sounds convincing but contains invented or unsupported information.",
          picture: "The AI gives you a confident statistic and a professional-looking citation. Neither one exists.",
          ask: "How will we verify important claims before anyone acts on them?",
        },
        {
          term: "Guardrail",
          plain: "A rule or technical control intended to limit what the system can access, produce or do.",
          picture: "Telling an AI not to send refunds over £100 is an instruction. Removing its permission to do so is a stronger guardrail.",
          ask: "Is this only a written rule, or a control the system cannot bypass?",
        },
      ],
    },
  ] satisfies GuideSection[],
  example: {
    quote: "We’re building an agent using RAG and MCP.",
    translation: "We are building a system that can choose several steps, search approved information before answering, and connect to other tools through a shared standard.",
    decision: "Now the useful questions are obvious: Which information? Which tools? Read-only or able to act? Where does a person approve the result?",
  },
  questionsTitle: "Five questions to use when AI jargon makes a meeting unclear",
  questionsIntro: "You do not need the perfect definition in the moment. Use one of these questions to find the decision hiding behind the words.",
  questions: [
    "In plain English, what job does this system complete?",
    "What information does it need, and where does that information go?",
    "What can it do without approval, and what still needs a person?",
    "How will we know when the answer or action is wrong?",
    "What does the full workflow cost—not just the model call?",
  ],
  ending: "The goal is not to win a vocabulary test. It is to stop important choices from disappearing inside technical language. When a term is unclear, ask what it does, what it touches, and what decision it changes. That is not slowing the room down. That is leadership.",
} as const;
