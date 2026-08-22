import { defineGuideArticle } from "@/content/structured-guide";

export const geminiGuide = defineGuideArticle({
  slug: "gemini",
  level: "Beginner",
  hub: "AI tools",
  outcomes: ["Choose an AI tool", "Get better answers"],
  composition: "tool-verdict",
  hero: {
    title: "Should you use Gemini?",
    promise:
      "Find out whether Gemini can save useful work where your email, documents and files already live.",
    illustration: {
      src: "/images/guides/gemini.webp",
      alt: "The small blue robot mascot plugging several work sources into one antique switchboard",
      focalPoint: "84% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "gemini",
    guideId: "guide.gemini",
    lumailTag: "guide_tool_gemini_workspace_test",
    buttonLabel: "Send me the Workspace test",
    modalTitle: "Get the Gemini Workspace fit checklist",
    description:
      "Enter your email to get the fillable checklist. Download it immediately and test Gemini on 3 jobs inside your Google work.",
    deliverable: {
      name: "Gemini Workspace fit checklist",
      format: "checklist",
      downloadHref: "/downloads/gemini-workspace-fit-checklist.pdf",
      usefulWhen: "Use it before you choose Gemini because your business uses Google Workspace.",
    },
  },
  answer: {
    heading: "Choose Gemini when the work and its source material already live in Google",
    paragraphs: [
      "Gemini is Google's AI assistant. It can work in the Gemini app and, on eligible plans, inside Google tools such as Gmail, Docs and Drive.",
      "The reason to test it is not the Google name. The reason is fewer handoffs. Gemini can use files, emails and other sources you have permission to access without making you move everything into a separate chat first.",
      "Access does not guarantee accuracy. Gemini may use only part of a large source set, point to the wrong file or produce a claim the source does not support.",
    ],
    keyLine:
      "Choose Gemini for useful access to your Google work, then check which source supported the answer.",
  },
  framework: {
    kind: "tool-verdict",
    heading: "Gemini is a workspace decision before it is a model decision",
    verdict:
      "Gemini is worth testing if important work already happens in Gmail, Docs, Drive, Sheets or Meet. If the information lives elsewhere, its main advantage becomes smaller and another broad AI assistant may be just as useful.",
    bestFor: [
      "Summarizing an email thread and listing the open questions",
      "Drafting or revising a document beside its Google Drive sources",
      "Comparing permitted files without downloading and uploading each one",
      "Using NotebookLM when an answer must stay grounded in a selected source set",
    ],
    poorFitFor: [
      "A business whose work lives mainly outside Google Workspace",
      "An answer that must be correct without checking the listed source",
      "A request that depends on files or emails the signed-in account cannot access",
      "A fixed process that a normal Workspace rule or automation can handle",
    ],
    useCases: [
      {
        task: "Turn an email thread into the next action",
        whyItWorks:
          "Gemini can summarize a Gmail thread and use related Workspace sources when the account and administrator settings allow it.",
        firstMove:
          "Choose 1 non-sensitive thread you know. Ask for the decision, owner, deadline and unanswered question, then compare the result with the full thread.",
      },
      {
        task: "Prepare a guide update from Drive",
        whyItWorks:
          "You can add specific Drive sources so the answer focuses on the approved research, brief and previous draft.",
        firstMove:
          "Add the named files as sources. Ask for a change list with the supporting file beside every recommendation.",
      },
      {
        task: "Study a fixed source collection in NotebookLM",
        whyItWorks:
          "NotebookLM answers from the sources added to the notebook and provides inline citations for checking.",
        firstMove:
          "Add only the files you have the right to use. Ask what the sources agree on, where they conflict and which question none of them answers.",
      },
    ],
    recommendation:
      "Test Gemini inside the Google tool where the task already happens. Keep it only if source access saves more time than the checking and permission work it adds.",
  },
  practicalAsset: {
    kind: "checklist",
    heading: "Run the 3-task Gemini Workspace test",
    introduction:
      "Use familiar, low-risk work. The test should prove whether Gemini can find the right context and turn it into a usable result.",
    instructions:
      "Before each task, note the account, sources and permissions Gemini should use. After each task, open the sources and check the answer.",
    items: [
      "Gmail: summarize 1 known thread into decision, owner, deadline and open question.",
      "Docs or Drive: compare 3 named sources and attach the correct source to every important claim.",
      "NotebookLM: ask 1 question across a selected source set and verify 5 inline citations.",
      "Access check: confirm Gemini used only the files, emails and locations the task required.",
      "Quality check: record missing context, unsupported claims, correction time and useful time saved.",
      "Decision: keep Gemini, test another tool or use no AI for this work.",
    ],
    completionRule:
      "You can show that Gemini found the right Google context, supported the answer and saved useful time on at least 2 of the 3 tasks.",
  },
  relatedGuideSlugs: ["which-ai-tool-for-what", "research-to-content-workflow", "copilot"],
  relatedHeading: "Choose what to test next.",
  ending: {
    kind: "clean",
    statement:
      "Gemini belongs in the workflow only when access to Google context produces a result you can verify and use.",
  },
});
