import { defineGuideArticle } from "@/content/structured-guide";

export const claudeGuide = defineGuideArticle({
  slug: "claude",
  level: "Beginner",
  hub: "AI tools",
  outcomes: ["Choose an AI tool", "Get better answers"],
  composition: "tool-verdict",
  hero: {
    title: "Should you use Claude?",
    promise:
      "Test Claude on 3 source-heavy tasks and see whether it helps you read, compare and write without losing the evidence.",
    illustration: {
      src: "/images/guides/claude.webp",
      alt: "The small blue robot mascot checking a long document as it leaves an antique press",
      focalPoint: "86% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "claude",
    guideId: "guide.claude",
    lumailTag: "guide_tool_claude_document_test",
    buttonLabel: "Send me the document test",
    modalTitle: "Get the Claude document-work test",
    description:
      "Enter your email to get the fillable comparison brief. Download it immediately and test Claude on documents you already know.",
    deliverable: {
      name: "Claude document-work test",
      format: "worksheet",
      downloadHref: "/downloads/claude-document-work-test.pdf",
      usefulWhen: "Use it before you choose Claude for research, writing or document review.",
    },
  },
  answer: {
    heading: "Choose Claude when the answer must stay tied to a body of source material",
    paragraphs: [
      "Claude is an AI assistant made by Anthropic. It can write, search the web, analyze files and work with source material kept inside a Claude Project.",
      "Its clearest test is document work. Give it several files you already understand, ask it to compare them and see whether it keeps the important details attached to the right source.",
      "Claude can still miss a page, misread a table or produce a polished claim the documents do not support. The review does not disappear because the answer sounds careful.",
    ],
    keyLine:
      "Use Claude to work across the documents. Keep a person responsible for checking the source, the claim and the decision.",
  },
  framework: {
    kind: "tool-verdict",
    heading: "Claude earns its place on document-heavy work",
    verdict:
      "Claude is worth testing when the job starts with reports, transcripts, policies, proposals or several versions of the same document. A Claude Project can keep reference files and project instructions together for repeated work.",
    bestFor: [
      "Comparing several documents and showing where they agree or conflict",
      "Turning approved source material into a coherent long draft",
      "Keeping repeated research or writing work inside 1 Project",
      "Finding unanswered questions before a person makes a decision",
    ],
    poorFitFor: [
      "A source-free answer that must be correct without review",
      "Visual details hidden inside an unsupported or difficult document format",
      "A quick fixed process that normal software or automation can run",
      "Sensitive files before you have checked the plan, workspace and data controls",
    ],
    useCases: [
      {
        task: "Compare 3 versions of a guide brief",
        whyItWorks:
          "Claude can read the files together and separate what changed from what stayed consistent.",
        firstMove:
          "Upload the 3 named files. Ask for a table with changed requirement, old version, new version and the source file for each claim.",
      },
      {
        task: "Build a draft from approved research",
        whyItWorks:
          "A Project can hold the source material and the writing instructions used across related chats.",
        firstMove:
          "Add only approved sources and the Shift & Lead copy rules. Ask Claude to label any paragraph it cannot support from those files.",
      },
      {
        task: "Find the gaps before publishing",
        whyItWorks:
          "Claude can compare the promise of a guide with the evidence and instructions inside the draft.",
        firstMove:
          "Ask for missing proof, unsupported claims and reader questions the draft does not answer. Check every item against the original files.",
      },
    ],
    recommendation:
      "Test Claude on files you know well. Keep it only if it preserves source details, exposes gaps and reduces editing time better than the tool you already use.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Run the 3-document Claude test",
    introduction:
      "Choose 3 short documents from the same real project. You should already know what they contain so you can judge the answer.",
    instructions:
      "Use original files with clear names. Do not begin with a 100-page report you have never read.",
    fields: [
      {
        label: "Document set",
        instruction:
          "Name the 3 files, why they belong together and which version or date should take priority.",
      },
      {
        label: "Comparison question",
        instruction:
          "Ask what changed, where the files conflict and what important question remains unanswered.",
      },
      {
        label: "Source check",
        instruction:
          "Choose 5 claims from Claude's answer. Find each claim in the original file and note anything missing, mixed up or unsupported.",
      },
      {
        label: "Work test",
        instruction:
          "Ask Claude to turn the verified comparison into 1 useful output, such as a decision note or revised brief. Record the editing time.",
      },
    ],
    completionRule:
      "You can show whether Claude preserved the source, found useful differences and saved enough review time to earn a place in the work.",
  },
  relatedGuideSlugs: ["which-ai-tool-for-what", "what-is-a-prompt", "research-to-content-workflow"],
  relatedHeading: "Choose what to test next.",
  ending: {
    kind: "clean",
    statement:
      "Claude is not valuable because it can read a pile of files. It is valuable when the result stays useful after you check it against the pile.",
  },
});
