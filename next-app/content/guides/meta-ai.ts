import { defineGuideArticle } from "@/content/structured-guide";

export const metaAiGuide = defineGuideArticle({
  slug: "meta-ai",
  level: "Beginner",
  hub: "AI tools",
  outcomes: ["Choose an AI tool", "Create content"],
  composition: "tool-verdict",
  hero: {
    title: "Should you use Meta AI?",
    promise:
      "Use the AI already inside Meta apps for low-risk help, without turning a convenient chat into a place for private business information.",
    illustration: {
      src: "/images/guides/meta-ai.webp",
      alt: "The small blue robot mascot using a conversation switchboard while locking private business files away",
      focalPoint: "68% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "meta-ai",
    guideId: "guide.meta-ai",
    lumailTag: "guide_tool_meta_safe_use",
    buttonLabel: "Send me the safe-use card",
    modalTitle: "Get the Meta AI safe-use card",
    description:
      "Enter your email to get the 1-page card. Download it immediately and decide what can, and cannot, go into Meta AI.",
    deliverable: {
      name: "Meta AI safe-use card",
      format: "checklist",
      downloadHref: "/downloads/meta-ai-safe-use-card.pdf",
      usefulWhen: "Use it before you paste business, customer or employee information into an in-app AI chat.",
    },
  },
  answer: {
    heading: "Choose Meta AI when convenience inside a Meta app is the main benefit",
    paragraphs: [
      "Meta AI is Meta's AI assistant. It is available across Meta products such as WhatsApp, Instagram, Facebook and Messenger, as well as a standalone app in supported accounts and regions.",
      "It can help with a quick question, a caption idea, an explanation or a simple creative task while you are already inside the app.",
      "That convenience does not make a consumer chat the right place for confidential client details, employee information, financial records or unreleased plans.",
    ],
    keyLine:
      "Use Meta AI for work you could safely show in public. Move private work into an approved business system.",
  },
  framework: {
    kind: "tool-verdict",
    heading: "Meta AI is a low-friction helper, not your default business workspace",
    verdict:
      "Meta AI is worth using when the task starts and ends inside a Meta app and needs no private business context. Choose a dedicated work tool when the job depends on controlled sources, team permissions, files or an audit trail.",
    bestFor: [
      "Brainstorming caption angles from information that is already public",
      "Rewriting a public announcement in simpler language",
      "Creating a quick visual idea or explaining a general topic",
      "Helping with a casual plan inside a message or group conversation",
    ],
    poorFitFor: [
      "Confidential client, employee, financial or contract information",
      "A business process that needs controlled source files and named approvals",
      "A final customer message no person has checked",
      "Choosing or deploying a Llama model, which is a separate technical decision",
    ],
    useCases: [
      {
        task: "Generate 3 caption angles from a published guide",
        whyItWorks:
          "The source is already public and the output is a low-risk first draft for review.",
        firstMove:
          "Paste only the public guide summary. Ask for 3 different angles and remove any claim the guide itself does not support.",
      },
      {
        task: "Explain a public AI term inside a conversation",
        whyItWorks:
          "Meta AI is close to the message, so the reader does not need to open another tool for a simple explanation.",
        firstMove:
          "Ask for a 2-sentence explanation and 1 everyday example. Check the answer against the Shift & Lead AI jargon guide before sharing.",
      },
      {
        task: "Sketch a public visual idea",
        whyItWorks:
          "A quick image concept can help a creator decide what is worth developing further.",
        firstMove:
          "Use a public topic and no protected client assets. Treat the result as a concept, then check rights, accuracy and brand fit before publication.",
      },
    ],
    recommendation:
      "Use Meta AI for public, low-risk work where staying inside the app saves time. Stop when the task needs private context, controlled access or a business record.",
  },
  practicalAsset: {
    kind: "decision-tool",
    heading: "Run the safe-to-share test",
    introduction:
      "Check the information before you paste it. The task is safe only when both the input and the expected output pass.",
    instructions:
      "If a question makes you hesitate, do not share the information. Replace it with a public or invented example.",
    questions: [
      {
        question: "Is every input already public or created only for this test?",
        ifYes: "Continue to the next question.",
        ifNo: "Remove the private details or use an approved business tool.",
      },
      {
        question: "Does the input contain customer, employee, financial, contract or login information?",
        ifYes: "Stop. Do not put it into the consumer AI chat.",
        ifNo: "Continue to the next question.",
      },
      {
        question: "Can a person check the result before it is sent or published?",
        ifYes: "Use Meta AI for a draft or idea, then perform the review.",
        ifNo: "Do not use the result in the business process.",
      },
      {
        question: "Would you be comfortable if the prompt appeared in a public screenshot?",
        ifYes: "The low-risk test can proceed.",
        ifNo: "Move the task to an approved system with the correct terms and controls.",
      },
    ],
    decisionRule:
      "Use Meta AI only when the information is safe to share, the result is easy to check and the task does not need controlled business access.",
  },
  relatedGuideSlugs: ["which-ai-tool-for-what", "grok", "research-to-content-workflow"],
  relatedHeading: "Choose what to test next.",
  ending: {
    kind: "clean",
    statement:
      "Convenience is a good reason to use Meta AI for a small public task. It is not permission to bring private business information with you.",
  },
});
