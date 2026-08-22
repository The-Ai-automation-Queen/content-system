export type GuideTerm = {
  term: string;
  fullName?: string;
  group: "basics" | "conversation" | "work";
  definition: string;
  example: string;
  action: string;
};

export const aiJargonGuide = {
  slug: "ai-jargon-guide",
  title: "10 AI words you need to know",
  deck: "Follow the AI conversation, question the sales pitch and know what to check before you approve the work.",
  cover: "/images/guides/learn-master.webp",
  coverAlt: "The small blue robot mascot learning from an open book filled with AI symbols",
  groups: [
    {
      id: "basics",
      number: "01",
      title: "What the technology is",
      image: "/images/guides/ai-words-learning.webp",
      imageAlt: "The small blue robot mascot sorting small idea tiles at a library desk",
    },
    {
      id: "conversation",
      number: "02",
      title: "What happens in the chat",
      image: "/images/guides/ai-words-connections.webp",
      imageAlt: "The small blue robot mascot inspecting connections between books, a chat and a toolbox",
    },
    {
      id: "work",
      number: "03",
      title: "How AI completes work",
    },
  ] as const,
  terms: [
    {
      term: "AI",
      fullName: "Artificial Intelligence",
      group: "basics",
      definition: "Software that can recognise patterns, create content or recommend an answer using information it has been given.",
      example: "A proposal that promises an “AI customer service system” is describing a category, not what the system will actually do.",
      action: "Ask which task the AI performs, what information it uses and who approves the result.",
    },
    {
      term: "Generative AI",
      group: "basics",
      definition: "AI that creates new text, images, audio, video or code from an instruction.",
      example: "Use it to draft a client email, produce 3 campaign concepts or turn meeting notes into a first action list.",
      action: "Treat the output as a draft. Check facts, tone, rights and confidential information before it leaves the business.",
    },
    {
      term: "LLM",
      fullName: "Large Language Model",
      group: "basics",
      definition: "The language engine inside tools such as ChatGPT and Claude. It produces a response by working out which words are likely to come next.",
      example: "A vendor may say its product uses a more powerful LLM. That does not prove the product will improve your workflow.",
      action: "Judge the tool on the work it completes accurately, not the model name in the sales pitch.",
    },
    {
      term: "Prompt",
      group: "conversation",
      definition: "The request and information you give an AI so it knows what work to produce.",
      example: "“Write a proposal” leaves the AI guessing. Add the client, goal, evidence, limits and required format to give it a usable brief.",
      action: "Write the prompt as if you were briefing a capable person who does not know your business yet.",
    },
    {
      term: "Context window",
      group: "conversation",
      definition: "The limit on how much of your conversation, instructions and attached material an AI can consider at once.",
      example: "In a long project chat, an instruction agreed at the beginning can be pushed out or overlooked later.",
      action: "Start a clean chat with the current brief and approved source material when the work begins to drift.",
    },
    {
      term: "Hallucination",
      group: "conversation",
      definition: "A name, number, quote, source or other detail that AI invents and presents as true.",
      example: "A polished market report can contain a study that does not exist or a statistic the source never published.",
      action: "Open the original source and verify every important claim before you send, publish or decide from it.",
    },
    {
      term: "AI agent",
      group: "work",
      definition: "An AI system that works through several steps and uses tools to pursue a goal, instead of returning only 1 answer.",
      example: "An inbox agent might identify an urgent client email, draft a reply and create a follow-up task.",
      action: "Require approval before it sends, deletes, spends, publishes or changes a customer record.",
    },
    {
      term: "Automation",
      group: "work",
      definition: "A rule that makes software complete the same step whenever a specific event happens.",
      example: "When someone requests this guide, an automation can save the contact, deliver the PDF and start the correct email sequence.",
      action: "Define the trigger, the expected result and what should happen when the automation fails.",
    },
    {
      term: "Connector",
      group: "work",
      definition: "A link that lets an AI tool read information from another app or take an action inside it. MCP, short for Model Context Protocol, is 1 way tools create these links.",
      example: "A calendar connector could check availability and create an event. An email connector could also expose private messages.",
      action: "Grant only the access required for the task and remove it when the connection is no longer needed.",
    },
    {
      term: "RAG",
      fullName: "Retrieval-Augmented Generation",
      group: "work",
      definition: "A method that lets AI search information you choose before answering, such as your policies, product documents or client files.",
      example: "A team assistant can search the current company handbook before answering a question about annual leave.",
      action: "Keep the source material current and require the answer to show exactly which document it used.",
    },
  ] satisfies GuideTerm[],
  capture: {
    buttonLabel: "Send me the guide",
    title: "Take the 10 terms with you",
    description: "Enter your email to get the printable 1-page reference for your next tool demo, proposal or meeting.",
    downloadHref: "/downloads/10-ai-words-you-need-to-know.pdf",
  },
} as const;
