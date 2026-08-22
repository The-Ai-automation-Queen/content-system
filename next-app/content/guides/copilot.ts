import { defineGuideArticle } from "@/content/structured-guide";

export const copilotGuide = defineGuideArticle({
  slug: "copilot",
  level: "Beginner",
  hub: "AI tools",
  outcomes: ["Choose an AI tool", "Get better answers"],
  composition: "tool-verdict",
  hero: {
    title: "Should you use Copilot?",
    promise:
      "Test Copilot on 3 Microsoft 365 tasks and check what information it can access.",
    illustration: {
      src: "/images/guides/copilot.webp",
      alt: "The small blue robot mascot holding a permission key at a connected office work machine",
      focalPoint: "82% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "copilot",
    guideId: "guide.copilot",
    lumailTag: "guide_tool_copilot_permission_test",
    buttonLabel: "Send me the permission test",
    modalTitle: "Get the Copilot task and permission test",
    description:
      "Enter your email to get the fillable test. Download it immediately and use it before a Copilot rollout.",
    deliverable: {
      name: "Copilot task and permission test",
      format: "worksheet",
      downloadHref: "/downloads/copilot-task-and-permission-test.pdf",
      usefulWhen: "Use it to test useful work and expose access problems before expansion.",
    },
  },
  answer: {
    heading: "Use Copilot when the work already lives in Microsoft 365",
    paragraphs: [
      "Microsoft 365 Copilot works inside apps such as Outlook, Teams, Word, Excel and PowerPoint. It can use the files, emails, chats and meetings the signed-in person is allowed to open.",
      "It can save copying when the work is already in Microsoft 365. You still need to check the answer and open the source it used.",
      "Check access first. If someone can open a file they should not see, Copilot may make that file easier to find.",
    ],
    keyLine:
      "Check who can open the source files, then test Copilot on 1 real Microsoft 365 task.",
  },
  framework: {
    kind: "tool-verdict",
    heading: "Copilot saves copying between Microsoft apps",
    verdict:
      "Copilot is worth testing for people who spend much of the day inside Microsoft 365 and repeatedly search, summarize or draft from company information. Do not buy it for everyone merely because the company uses Microsoft.",
    bestFor: [
      "Summarizing a known Outlook thread and opening the cited messages",
      "Turning a Teams transcript into decisions, owners and next steps",
      "Drafting from permitted Word, SharePoint or OneDrive material",
      "Helping a user explore an Excel file while the user checks the method and numbers",
    ],
    poorFitFor: [
      "A team whose important work sits mainly outside Microsoft 365",
      "A rollout before old links, groups and shared locations have been reviewed",
      "A summary or calculation that no person will check",
      "A fixed task that an Outlook rule, template or normal automation can handle",
    ],
    useCases: [
      {
        task: "Turn an Outlook thread into a clear reply",
        whyItWorks:
          "Copilot can summarize the thread and may cite the messages used, then help draft the response.",
        firstMove:
          "Choose 1 familiar thread. Check the summary against the cited emails before you draft or send anything.",
      },
      {
        task: "Recover decisions from a Teams meeting",
        whyItWorks:
          "When the required meeting transcript is available, Copilot can identify discussion points and proposed actions.",
        firstMove:
          "Ask for decision, owner, deadline and unresolved question. Have the meeting owner confirm the list before it becomes a task plan.",
      },
      {
        task: "Find guide material across Microsoft files",
        whyItWorks:
          "Copilot can use Microsoft Graph, the connection system behind Microsoft 365, to bring permitted work information into an answer.",
        firstMove:
          "Run the query with a test user. Open every source and note any file that is available because of an old or overly broad permission.",
      },
    ],
    recommendation:
      "Start with a small group whose work is tied to Microsoft 365. Expand only after the task result and the permission review both pass.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Run the task and permission test",
    introduction:
      "Choose 3 low-risk tasks and 1 person who does this work. The test must show useful time saved and whether the person can reach the right information.",
    instructions:
      "List the information each task should use before Copilot runs. Treat any surprising source as a permission issue to investigate.",
    fields: [
      {
        label: "Outlook task",
        instruction:
          "Summarize 1 known thread, check the cited messages and record missing context, correction time and useful time saved.",
      },
      {
        label: "Teams task",
        instruction:
          "Turn 1 transcript into decisions, owners and next steps. Ask the meeting owner to confirm every item.",
      },
      {
        label: "File task",
        instruction:
          "Find or compare named Microsoft files. Open every source and flag information the test user should not need for the task.",
      },
      {
        label: "Permission decision",
        instruction:
          "Record access to remove, groups to review, content to label and the person responsible before another user is added.",
      },
    ],
    completionRule:
      "At least 2 tasks save useful time, every important result has been checked and no unexplained access remains open.",
  },
  relatedGuideSlugs: ["which-ai-tool-for-what", "inbox-manager-setup", "gemini"],
  relatedHeading: "Choose what to test next.",
  ending: {
    kind: "clean",
    statement:
      "Copilot should make permitted work easier. If the permission map is wrong, fix the map before you expand the assistant.",
  },
});
