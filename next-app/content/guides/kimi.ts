import { defineGuideArticle } from "@/content/structured-guide";

export const kimiGuide = defineGuideArticle({
  slug: "kimi",
  level: "Intermediate",
  hub: "AI tools",
  outcomes: ["Choose an AI tool", "Get better answers"],
  composition: "tool-verdict",
  hero: {
    title: "Should you use Kimi?",
    promise:
      "Test Kimi on 1 long file or coding task your current tool cannot finish.",
    illustration: {
      src: "/images/guides/kimi.webp",
      alt: "The small blue robot mascot checking a long document through an inspection and punch-card machine",
      focalPoint: "68% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "kimi",
    guideId: "guide.kimi",
    lumailTag: "guide_tool_kimi_long_file_test",
    buttonLabel: "Send me the Kimi test",
    modalTitle: "Get the Kimi long-file and coding test brief",
    description:
      "Enter your email to get the fillable test brief. Download it immediately and run the same task in Kimi and your current tool.",
    deliverable: {
      name: "Kimi long-file and coding test brief",
      format: "worksheet",
      downloadHref: "/downloads/kimi-long-file-and-coding-test.pdf",
      usefulWhen: "Use it before adding Kimi for documents, finished files or code work.",
    },
  },
  answer: {
    heading: "Choose Kimi when a specific Kimi product can finish a file-heavy or technical job",
    paragraphs: [
      "Kimi is an AI product family from Moonshot AI. The main Kimi assistant can handle chat, research and finished files. Kimi Work acts on local desktop files, while Kimi Code is built for software work.",
      "Those are different products with different access and actions. Choose the mode from the job, then test it against the tool you already use.",
      "A large file limit or polished deliverable does not prove that Kimi read every source correctly. Check the source coverage, calculations, code changes and final file before use.",
    ],
    keyLine:
      "Do not add Kimi for its feature list. Add it only when 1 product mode solves a tested gap in your current work.",
  },
  framework: {
    kind: "tool-verdict",
    heading: "Kimi is strongest when the result must be more than a chat answer",
    verdict:
      "Kimi is worth testing when the job ends in an editable document, spreadsheet, slide deck, website or code change. The right comparison is the same source, same brief and same quality check in Kimi and the tool you already have.",
    bestFor: [
      "Turning a defined brief and source set into an editable work file",
      "Comparing long documents when source coverage can be checked",
      "Testing Kimi Code on a known software task and existing test suite",
      "Research that must end in a structured report, sheet or presentation",
    ],
    poorFitFor: [
      "Adding another account for normal questions your current tool answers well",
      "A local-file task before you understand what the desktop product can read and change",
      "A code change without tests, review and a recoverable version history",
      "Confidential material before the exact product, account and data terms have been approved",
    ],
    useCases: [
      {
        task: "Turn guide research into an editable comparison file",
        whyItWorks:
          "Kimi can produce documents and spreadsheets instead of leaving the result inside a chat.",
        firstMove:
          "Provide a small approved source set and the exact columns or headings. Check every source, formula and missing field before download.",
      },
      {
        task: "Compare a long file with the current tool",
        whyItWorks:
          "A known document exposes whether Kimi keeps important details in view and finds the right sections.",
        firstMove:
          "Ask the same 5 questions in Kimi and Claude. Require page or section references, then score 10 claims against the original file.",
      },
      {
        task: "Test Kimi Code on a solved issue",
        whyItWorks:
          "A previously solved bug has a known cause, expected change and test result.",
        firstMove:
          "Use a separate branch. Limit the files Kimi may change, run the test suite and inspect the diff before accepting anything.",
      },
    ],
    recommendation:
      "Start with 1 Kimi product and 1 bounded task. Keep it only if the finished file or code result is better enough to justify another tool and its maintenance.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Run the long-file or code comparison",
    introduction:
      "Choose 1 test you already understand. Run it in Kimi and 1 current tool with identical inputs and limits.",
    instructions:
      "Use non-sensitive material. Record the exact Kimi product or mode, because the result does not transfer automatically to another mode.",
    fields: [
      {
        label: "Known task and finish line",
        instruction:
          "Name the document question or solved code issue, the expected output and what a correct result must contain.",
      },
      {
        label: "Allowed sources and access",
        instruction:
          "List every file, folder, website or repository the tool may use and anything it must not open or change.",
      },
      {
        label: "Kimi result",
        instruction:
          "Record source coverage, factual or test errors, editing time, file quality and any action you did not expect.",
      },
      {
        label: "Comparison result",
        instruction:
          "Run the same brief in Claude or DeepSeek. Record which result required less correction and produced the more useful final file or code change.",
      },
    ],
    completionRule:
      "Kimi solves a named gap better than the current tool, with acceptable access, correction work and maintenance. Otherwise do not add it.",
  },
  relatedGuideSlugs: ["which-ai-tool-for-what", "claude", "deepseek"],
  relatedHeading: "Choose what to test next.",
  ending: {
    kind: "clean",
    statement:
      "Kimi deserves a place only when its finished result is distinctly more useful than another chat answer.",
  },
});
