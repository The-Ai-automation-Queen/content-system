export type GuideTerm = {
  term: string;
  fullName?: string;
  group: "chat" | "systems" | "future";
  definition: string;
  inConversation: string;
  caution?: string;
};

export const aiJargonGuide = {
  slug: "ai-jargon-guide",
  title: "10 AI words you need to know",
  deck: "Understand the words that come up in AI tools, meetings and sales pitches without learning a new language.",
  cover: "/images/guides/learn-master.webp",
  coverAlt: "The Blue Princess learning from an open book filled with AI symbols",
  intro: "You do not need a technical vocabulary. You need to know what people are actually talking about, what changes for you and when to ask another question.",
  groups: [
    {
      id: "chat",
      number: "01",
      title: "Words inside the chat",
      description: "These 5 explain what happens when you ask an AI tool for something.",
      image: "/images/guides/ai-words-learning.webp",
      imageAlt: "The Blue Princess sorting small idea tiles at a library desk",
    },
    {
      id: "systems",
      number: "02",
      title: "Words behind the tools",
      description: "These explain how AI learns, creates and connects to your other apps.",
      image: "/images/guides/ai-words-connections.webp",
      imageAlt: "The Blue Princess inspecting connections between books, a chat and a toolbox",
    },
    {
      id: "future",
      number: "03",
      title: "Words people use when they talk about what comes next",
      description: "One is an idea about the future. The other is something people are doing now.",
    },
  ] as const,
  terms: [
    {
      term: "LLM",
      fullName: "Large Language Model",
      group: "chat",
      definition: "The engine inside tools such as ChatGPT and Claude. It reads your words and predicts a useful response.",
      inConversation: "If someone says, “We need a better LLM,” they mean the underlying model, not the chat window around it.",
      caution: "It can produce a confident answer without knowing whether that answer is true.",
    },
    {
      term: "Prompt",
      group: "chat",
      definition: "The instruction you give an AI. It can be a question, a task or a set of rules.",
      inConversation: "“Summarise this document in 5 bullets for a client” is a prompt.",
    },
    {
      term: "Tokens",
      group: "chat",
      definition: "The small pieces of text an AI reads and writes. Tools use them to measure usage, limits and sometimes cost.",
      inConversation: "More pages, longer chats and bigger answers use more tokens.",
    },
    {
      term: "Context window",
      group: "chat",
      definition: "The amount of information an AI can work with at one time.",
      inConversation: "When a long chat starts forgetting details, its working space may be too crowded. A fresh chat can help.",
    },
    {
      term: "Hallucination",
      group: "chat",
      definition: "A made-up answer presented as if it were true.",
      inConversation: "A fake source, wrong date or invented product feature can all be hallucinations.",
      caution: "Check important names, numbers, dates and sources before using the answer.",
    },
    {
      term: "Machine learning",
      group: "systems",
      definition: "A way for computers to find patterns by learning from examples instead of following one fixed rule for every case.",
      inConversation: "A spam filter learns from emails marked “spam” and “not spam.”",
    },
    {
      term: "Generative AI",
      group: "systems",
      definition: "AI that creates new text, images, audio, video or code from your instructions.",
      inConversation: "ChatGPT writing an email and an image tool making a poster are both generative AI.",
    },
    {
      term: "MCP and connectors",
      fullName: "Model Context Protocol",
      group: "systems",
      definition: "Ways to let an AI reach information or take actions outside the chat.",
      inConversation: "A connector might let an AI read your calendar, search a folder or create a task.",
      caution: "More access creates more risk. Check what the AI can see and change.",
    },
    {
      term: "AGI",
      fullName: "Artificial General Intelligence",
      group: "future",
      definition: "The idea of an AI that could learn and handle almost any thinking task a person can do.",
      inConversation: "AGI does not exist today. It is usually what people mean when they discuss human-level AI.",
    },
    {
      term: "Vibe coding",
      group: "future",
      definition: "Building software by describing what you want while an AI writes much of the code.",
      inConversation: "You describe a booking tool, test what the AI builds and ask for changes in normal language.",
      caution: "Easy to build does not mean safe to publish. Test the result before real people use it.",
    },
  ] satisfies GuideTerm[],
  bonusTitle: "5 more terms worth recognising",
  bonus: [
    { term: "Agent", meaning: "An AI system that works through a task in several steps. It may search, choose an action, use a tool and check the result before moving on." },
    { term: "RAG", fullName: "Retrieval-Augmented Generation", meaning: "A method that lets AI search trusted documents or data before answering. It gives the model relevant information instead of asking it to rely only on what it learned during training." },
    { term: "Fine-tuning", meaning: "Additional training that teaches a model a specific style, subject or type of task." },
    { term: "Multimodal", meaning: "AI that can understand or create more than one type of content, such as text, images, audio and video." },
    { term: "Open-source model", meaning: "A model whose files are available for people to download, adapt or run themselves under its licence rules." },
  ],
  capture: {
    buttonLabel: "Send me the 10-word guide",
    title: "Send the guide to your inbox",
    description: "Keep it for the next time a tool, sales pitch or meeting uses an AI term you do not know.",
  },
} as const;
