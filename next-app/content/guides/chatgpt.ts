import { defineGuideArticle } from "@/content/structured-guide";

export const chatgptGuide = defineGuideArticle({
  slug: "chatgpt",
  level: "Beginner",
  hub: "AI tools",
  outcomes: ["Choose an AI tool", "Get better answers"],
  composition: "tool-verdict",
  hero: {
    title: "Should you use ChatGPT?",
    promise:
      "Use 3 real tasks to decide whether ChatGPT should be your main AI tool or just another subscription.",
    illustration: {
      src: "/images/guides/chatgpt.webp",
      alt: "The small blue robot mascot choosing an attachment on an antique multi-tool beside a stack of papers",
      focalPoint: "84% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "chatgpt",
    guideId: "guide.chatgpt",
    lumailTag: "guide_tool_chatgpt_fit_test",
    buttonLabel: "Send me the fit test",
    modalTitle: "Get the ChatGPT 30-minute fit test",
    description:
      "Enter your email to get the fillable scorecard. Download it immediately and test ChatGPT on work you already do.",
    deliverable: {
      name: "ChatGPT 30-minute fit test",
      format: "worksheet",
      downloadHref: "/downloads/chatgpt-30-minute-fit-test.pdf",
      usefulWhen: "Use it before you pay for ChatGPT or move important work into it.",
    },
  },
  answer: {
    heading: "Choose ChatGPT when you want 1 AI workspace for different kinds of work",
    paragraphs: [
      "ChatGPT is an AI assistant made by OpenAI. It can draft and explain text, work with files, analyze data, search the web and create or edit images.",
      "Its advantage is breadth. You can move from a document to a spreadsheet or image without learning a different tool for every task.",
      "That breadth does not make every answer reliable. ChatGPT can sound certain when it is wrong, miss information in a difficult file or use a method you did not intend.",
    ],
    keyLine:
      "Use ChatGPT for a useful first result. Check the facts, calculations and decisions before the result reaches a customer.",
  },
  framework: {
    kind: "tool-verdict",
    heading: "ChatGPT is the strongest fit when breadth matters",
    verdict:
      "It is a practical first AI tool for a person who wants to write, research, work with files and think through decisions in 1 place. Choose a more specialized tool when the job depends on a specific work ecosystem, very long source material or tightly controlled actions.",
    bestFor: [
      "Turning a brief and approved source material into a first draft",
      "Comparing documents, spreadsheets or options in conversation",
      "Research that needs current web sources and a report you can inspect",
      "Creating or editing an image alongside the written work",
    ],
    poorFitFor: [
      "Answers that must be correct without a person checking them",
      "Sensitive work before you have reviewed the account and workspace data controls",
      "A fixed process that normal software or automation can run more predictably",
      "A decision based on information ChatGPT cannot access or a file it did not read correctly",
    ],
    useCases: [
      {
        task: "Turn a guide into a follow-up email",
        whyItWorks:
          "ChatGPT can use the approved guide, the original email and a clear word limit to produce a reviewable draft.",
        firstMove:
          "Upload the approved guide. Ask for a 90-word follow-up email and 3 clearly different subject lines. Tell it not to invent results or urgency.",
      },
      {
        task: "Find the story inside guide performance data",
        whyItWorks:
          "ChatGPT can inspect a clean spreadsheet, calculate changes and create a table or chart for review.",
        firstMove:
          "Upload 1 clean spreadsheet. Name the columns, calculation and comparison you need, then inspect the method before you use the conclusion.",
      },
      {
        task: "Research a guide update",
        whyItWorks:
          "Deep research can use selected websites, uploaded files and connected sources to produce a report with links you can verify.",
        firstMove:
          "Name the decision the research must support, restrict it to credible sources and open the cited pages before you publish a claim.",
      },
    ],
    recommendation:
      "Do not decide from a feature list. Run the same 3 tasks you already do, score the results and keep ChatGPT only if it reduces useful work after review.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Run the 30-minute ChatGPT fit test",
    introduction:
      "Choose 3 small tasks from your real week. Use the same source material, review rule and time limit you would use at work.",
    instructions:
      "Spend 10 minutes on each task. Score the result, not how impressive the conversation feels.",
    fields: [
      {
        label: "Task 1: draft",
        instruction:
          "Give ChatGPT an approved source and a clear format. Record how much rewriting the result needs before it sounds like Shift & Lead.",
      },
      {
        label: "Task 2: file or data",
        instruction:
          "Upload a clean file. Ask for 1 specific comparison or calculation. Check whether the answer used the full file and the method you requested.",
      },
      {
        label: "Task 3: current research",
        instruction:
          "Ask a question that requires current sources. Check 3 cited pages and record any claim the source does not support.",
      },
      {
        label: "Decision",
        instruction:
          "Keep ChatGPT, test another tool or use no AI. Base the choice on useful time saved, correction effort, source quality and data fit.",
      },
    ],
    completionRule:
      "You have 3 scored results and can explain why ChatGPT is, or is not, the right tool for your real work.",
  },
  relatedGuideSlugs: ["which-ai-tool-for-what", "what-is-a-prompt", "claude"],
  relatedHeading: "Choose what to test next.",
  ending: {
    kind: "clean",
    statement:
      "A broad tool is useful only when it makes your real work better. Test ChatGPT on the job, then keep or reject it with evidence.",
  },
});
