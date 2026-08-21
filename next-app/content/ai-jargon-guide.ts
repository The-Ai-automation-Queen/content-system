export type GuideTerm = {
  term: string;
  fullName?: string;
  group: "basics" | "conversation" | "work";
  definition: string;
  inConversation: string;
  caution?: string;
};

export const aiJargonGuide = {
  slug: "ai-jargon-guide",
  title: "10 AI words you need to know",
  deck: "Understand the 10 terms that help you question an AI tool, follow a proposal and spot when someone is overselling it.",
  cover: "/images/guides/learn-master.webp",
  coverAlt: "The Blue Princess learning from an open book filled with AI symbols",
  intro: "Use this guide when an AI tool, proposal or meeting uses a term nobody stops to explain.",
  groups: [
    {
      id: "basics",
      number: "01",
      title: "Start with what AI is",
      description: "These 3 terms explain what the technology does and what powers the tools you use.",
      image: "/images/guides/ai-words-learning.webp",
      imageAlt: "The Blue Princess sorting small idea tiles at a library desk",
    },
    {
      id: "conversation",
      number: "02",
      title: "Know what happens in the chat",
      description: "These 3 terms help you ask for better work and check the answer before you use it.",
      image: "/images/guides/ai-words-connections.webp",
      imageAlt: "The Blue Princess inspecting connections between books, a chat and a toolbox",
    },
    {
      id: "work",
      number: "03",
      title: "Understand how AI does work",
      description: "These 4 terms explain how AI completes steps, uses your information and connects to other tools.",
    },
  ] as const,
  terms: [
    {
      term: "AI",
      fullName: "Artificial Intelligence",
      group: "basics",
      definition: "Computer software that can do tasks that normally need human judgment, such as recognising a photo, writing a summary or recommending what to do next.",
      inConversation: "AI is the broad category. ChatGPT, image generators and recommendation systems are different kinds of AI tools.",
      caution: "AI is software, not a person. A human is still responsible for the decision and the result.",
    },
    {
      term: "Generative AI",
      group: "basics",
      definition: "AI that creates something new from your instructions, including text, images, audio, video or code.",
      inConversation: "When ChatGPT drafts an email or an image tool makes a poster, you are using generative AI.",
    },
    {
      term: "LLM",
      fullName: "Large Language Model",
      group: "basics",
      definition: "The part inside tools such as ChatGPT and Claude that reads your words and writes a response.",
      inConversation: "The LLM is the engine. The chat screen, saved files and buttons are the tool built around it.",
      caution: "A fluent answer is not proof that the answer is correct.",
    },
    {
      term: "Prompt",
      group: "conversation",
      definition: "The question, instruction or information you give an AI.",
      inConversation: "“Summarise this document in 5 bullets for a client” is a prompt. A clearer prompt usually produces a more useful first answer.",
    },
    {
      term: "Context window",
      group: "conversation",
      definition: "The amount of information an AI can consider at one time, including your request, earlier messages and attached files.",
      inConversation: "In a very long chat, the AI may lose track of an instruction from the beginning because too much information is competing for space.",
    },
    {
      term: "Hallucination",
      group: "conversation",
      definition: "Information an AI makes up but presents as if it were true.",
      inConversation: "A fake source, a wrong date or a product feature that does not exist can all be hallucinations.",
      caution: "Check names, dates, numbers, quotes and sources before you send, publish or act on the answer.",
    },
    {
      term: "AI agent",
      group: "work",
      definition: "An AI tool that works through several steps to complete a goal, instead of giving you only 1 answer.",
      inConversation: "An email agent could read new messages, identify the urgent ones, draft replies and add follow-up dates to your calendar.",
      caution: "Check which actions require your approval before an agent can send, delete, buy or publish anything.",
    },
    {
      term: "Automation and workflow",
      group: "work",
      definition: "A workflow is the order of steps in a job. Automation lets software complete some of those steps without you repeating them by hand.",
      inConversation: "A form can save a new contact, send the promised guide and start an email sequence automatically.",
      caution: "Keep human approval where a mistake could affect money, privacy, customers or your reputation.",
    },
    {
      term: "Connector and MCP",
      fullName: "Model Context Protocol",
      group: "work",
      definition: "A connector gives an AI access to another tool, such as your email, calendar or files. MCP is 1 standard that tools can use to make those connections.",
      inConversation: "A calendar connector could let an AI check your availability and create an event instead of only telling you how to do it.",
      caution: "Approve only the access needed for the job. A connector may allow the AI to see or change private information.",
    },
    {
      term: "RAG",
      fullName: "Retrieval-Augmented Generation",
      group: "work",
      definition: "A way for AI to search information you choose before it answers, instead of relying only on what it already knows.",
      inConversation: "If you connect your company handbook, RAG can find the relevant policy and use it to answer an employee's question.",
      caution: "The answer can still be wrong if the source is missing, outdated or misunderstood. Ask to see the source it used.",
    },
  ] satisfies GuideTerm[],
  capture: {
    buttonLabel: "Get the 1-page reference",
    title: "Keep the 10 AI terms nearby",
    description: "Enter your email and we will send you the 1-page reference for your next tool demo, proposal or meeting.",
  },
} as const;
