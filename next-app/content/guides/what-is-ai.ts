import { defineGuideArticle } from "@/content/structured-guide";

/**
 * Source brief
 *
 * Retained from the legacy guide and workbook sources:
 * - AI uses patterns from examples to produce a useful output.
 * - AI is a category, while tools such as ChatGPT are products.
 * - Normal software, automation, generative AI and agents do different jobs.
 * - AI output needs human review when facts, money, access or reputation are at risk.
 *
 * Excluded:
 * - The glossary-style tour of machine learning, LLMs and other terms.
 * - Product recommendations and time-sensitive feature claims.
 * - Source slogans, creator examples and language that treats AI as a person.
 *
 * Shift & Lead rewrite:
 * - The reader sorts a real business task before choosing a tool.
 * - The example separates a fixed automation, an AI judgment step and human approval.
 * - The practical asset is a decision tool that can be used without the article.
 */
export const whatIsAiGuide = defineGuideArticle({
  slug: "what-is-ai",
  level: "Beginner",
  hub: "AI essentials",
  outcomes: ["Understand AI"],
  composition: "explainer",
  hero: {
    title: "What AI actually is",
    promise:
      "Know when a task needs AI, when a simple automation is enough and when a person must decide.",
    illustration: {
      src: "/images/guides/what-is-ai.webp",
      alt: "The small blue robot mascot studying a machine that turns information into useful outputs",
      focalPoint: "68% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "what-is-ai",
    guideId: "guide.what-is-ai",
    lumailTag: "guide_ai_essentials_task_sorter",
    buttonLabel: "Send me the task sorter",
    modalTitle: "Get the AI or automation task sorter",
    description:
      "Enter your email to get the editable 1-page worksheet. Download it immediately and use it before you add another AI tool to your business.",
    deliverable: {
      name: "AI or automation? 1-page task sorter",
      format: "worksheet",
      downloadHref: "/downloads/ai-or-automation-task-sorter.pdf",
      usefulWhen: "Use it to choose the simplest reliable way to handle a task.",
    },
  },
  answer: {
    heading: "AI finds patterns and uses them to produce a result",
    paragraphs: [
      "Give AI an email and it can classify the message, draft a reply or suggest the next action. It can do this because it has learned patterns from many examples.",
      "AI is a type of technology, not 1 app. ChatGPT, Claude and Gemini are products built with it.",
      "AI does not know your business, understand consequences or guarantee the truth. It works from the information it can access, then produces its best answer.",
    ],
    keyLine:
      "Use AI when every case is different and a person can check the result. Use automation when the trigger and every next step are fixed.",
  },
  framework: {
    kind: "explainer",
    heading: "Match the system to the job",
    introduction:
      "The useful question is not whether a tool has AI. Ask what kind of work the task requires.",
    points: [
      {
        title: "Normal software follows fixed rules",
        explanation:
          "A person defines each rule. The same input should produce the same result every time.",
        example:
          "A checkout adds the selected product, calculates the total and creates an order.",
        instruction:
          "Use normal software when the correct steps and answer are already known.",
      },
      {
        title: "Automation moves work through fixed steps",
        explanation:
          "An event starts a set sequence. The system does not need to interpret the situation before it acts.",
        example:
          "A reader requests a guide. The automation saves the email address, sends the correct file and adds the reader to the matching email sequence.",
        instruction:
          "Use automation when you can write the trigger and every next step as a clear rule.",
      },
      {
        title: "AI handles work with variation",
        explanation:
          "AI looks for patterns in words, images, audio or numbers. It can classify, predict, compare or create a result when every case is not identical.",
        example:
          "AI reads 30 customer messages and groups them by complaint, even when customers describe the same problem in different words.",
        instruction:
          "Use AI when the input changes but a person can still describe and check a useful result.",
      },
      {
        title: "Generative AI creates a new draft",
        explanation:
          "This type of AI produces text, images, audio, video or code from instructions and source material.",
        example:
          "It turns an approved workshop transcript into a draft email, a short post and 3 headline options.",
        instruction:
          "Give it approved source material, then check facts, tone, rights and private information before publishing.",
      },
    ],
  },
  practicalAsset: {
    kind: "decision-tool",
    heading: "Sort 1 task before you choose a tool",
    introduction:
      "Write down 1 task that takes time in your business. Answer these questions in order.",
    instructions:
      "Use the smallest system that can produce the result reliably. Do not add AI merely because a tool offers it.",
    questions: [
      {
        question: "Can you write every correct step as a fixed rule?",
        ifYes: "Use normal software or an automation.",
        ifNo: "Continue to question 2.",
      },
      {
        question: "Does the work depend on patterns in text, images, audio or numbers?",
        ifYes: "Test AI on examples from the real task.",
        ifNo: "Keep the task with a person until the process is clearer.",
      },
      {
        question: "Can a person check the result quickly and clearly?",
        ifYes: "Let AI prepare the work, then require that review.",
        ifNo: "Do not automate the decision.",
      },
      {
        question: "Could a mistake affect money, access, customers, rights or reputation?",
        ifYes: "Keep approval with a named person and record what the system did.",
        ifNo: "Run a small test and compare the result with the current process.",
      },
    ],
    decisionRule:
      "Choose automation for fixed steps, AI for variable work with a clear quality check, and a person for decisions where a wrong answer carries a serious consequence.",
  },
  ending: {
    kind: "clean",
    statement: "Sort 1 real task first. Choose the smallest system that can do it reliably and keep the final decision with a person when a mistake matters.",
  },
  relatedGuideSlugs: ["ai-jargon-guide", "what-is-a-prompt", "which-ai-tool-for-what"],
  relatedHeading: "Choose what to learn next.",
});
