export type GuideTerm = {
  term: string;
  fullName?: string;
  meaning: string;
  example: string;
  why: string;
};

export const aiJargonGuide = {
  slug: "ai-jargon-guide",
  title: "10 AI words you need to know",
  deck: "What each word means, with simple examples that make it easy to remember.",
  cover: "/images/guides/learn-master.webp",
  coverAlt: "The Blue Princess learning from an open book filled with AI symbols",
  intro: [
    "People use AI words without explaining them.",
    "Here are 10 words you will hear often, what they mean and why they matter.",
  ],
  terms: [
    {
      term: "LLM",
      fullName: "Large Language Model",
      meaning: "An LLM is the part of ChatGPT or Claude that reads your question and writes an answer.",
      example: "Think about autocomplete on your phone. It guesses the next word while you type. An LLM does something similar, but on a much larger scale.",
      why: "An LLM can write a useful answer, but it does not know facts the way a person does. It can sound sure and still be wrong.",
    },
    {
      term: "Prompt",
      meaning: "A prompt is what you ask or tell an AI to do.",
      example: "“Write something about marketing” is a prompt. “Write a short email inviting local shop owners to a free workshop” is a clearer prompt.",
      why: "Clear instructions usually lead to a more useful answer. If your request is vague, the answer will often be vague too.",
    },
    {
      term: "Tokens",
      meaning: "Tokens are the small pieces of text an AI reads and writes.",
      example: "A short word may be 1 token. A long word may be split into several tokens. Your question, your files and the answer all use them.",
      why: "AI tools use tokens to measure limits and cost. Longer chats and larger files use more tokens.",
    },
    {
      term: "Context window",
      meaning: "The context window is how much information an AI can use at the same time.",
      example: "Picture a desk. The AI can work with everything on the desk. When the desk gets too crowded, important details can get buried.",
      why: "A very long chat can become less useful. Starting a fresh chat or removing old information can help.",
    },
    {
      term: "Hallucination",
      meaning: "A hallucination is an answer that sounds real but contains made-up information.",
      example: "The AI may give you a book title, date or website that does not exist. It may still write the answer with complete confidence.",
      why: "Check important names, dates, numbers and sources before you use them.",
    },
    {
      term: "Machine learning",
      meaning: "Machine learning is a way for computers to learn from examples.",
      example: "Show a system thousands of emails marked “spam” or “not spam.” It starts to notice what spam emails have in common.",
      why: "The computer is not given a rule for every situation. It learns patterns from the examples it receives.",
    },
    {
      term: "MCP and connectors",
      fullName: "Model Context Protocol",
      meaning: "Connectors let an AI reach information or tools outside the chat. MCP is a common way to make those connections.",
      example: "A connector can let an AI read your calendar, search a folder or create a task in another app.",
      why: "A connected AI can do more, but it may also see or change more. Check what access you are giving it.",
    },
    {
      term: "Generative AI",
      meaning: "Generative AI creates new content from your instructions.",
      example: "It can write an email, make an image, create music or produce a video.",
      why: "This is the type of AI behind most chatbots and image tools people use today.",
    },
    {
      term: "AGI",
      fullName: "Artificial General Intelligence",
      meaning: "AGI is the idea of an AI that could learn and complete almost any thinking task a person can do.",
      example: "Today, different AI tools are good at different jobs. AGI would be able to move between many kinds of work without needing a new system for each job.",
      why: "AGI does not exist today. When people talk about super-smart AI taking over, this is often what they mean.",
    },
    {
      term: "Vibe coding",
      meaning: "Vibe coding means building software by telling an AI what you want instead of writing all the code yourself.",
      example: "You might ask for a simple booking app. The AI writes the code, shows you a version and changes it when you give feedback.",
      why: "More people can now build small tools. You still need to test the result because working code is not always safe or ready to publish.",
    },
  ] satisfies GuideTerm[],
  bonusTitle: "5 more words you will hear next",
  bonus: [
    { term: "Agent", meaning: "An AI system that can choose and complete several steps toward a goal." },
    { term: "RAG", meaning: "A way for AI to search selected documents before it answers." },
    { term: "Fine-tuning", meaning: "Extra training that helps a model follow a certain style or type of task." },
    { term: "Multimodal", meaning: "AI that can work with more than text, such as images, audio or video." },
    { term: "Open-source model", meaning: "A model people can download and run under the rules of its licence." },
  ],
  ending: "You do not need to memorise every AI word. Save this guide and return when a term comes up. Once these 10 make sense, the rest of the conversation becomes much easier to follow.",
} as const;
