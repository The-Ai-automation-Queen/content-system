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
        { title: string; body: string },
        { title: string; body: string },
        ...Array<{ title: string; body: string }>,
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
      "You do not need to learn how every AI system is built. You now understand what the term means, why AI can produce different answers and why a confident answer can still be wrong.",
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
      title: "The AI words you will hear next",
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

export const guidePages = [whatIsAiGuide] as const;

export function getGuidePage(slug: string) {
  return guidePages.find((guide) => guide.slug === slug);
}
