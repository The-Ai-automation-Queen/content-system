import { defineGuideArticle } from "@/content/structured-guide";

export const manusGuide = defineGuideArticle({
  slug: "manus",
  level: "Intermediate",
  hub: "AI tools",
  outcomes: ["Choose an AI tool", "Build an agent"],
  composition: "tool-verdict",
  hero: {
    title: "Should you use Manus?",
    promise:
      "Give Manus 1 bounded multi-step task, with the access, approvals and stopping points written before it starts.",
    illustration: {
      src: "/images/guides/manus.webp",
      alt: "The small blue robot mascot supervising a task conveyor with review gates and a stop lever",
      focalPoint: "68% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "manus",
    guideId: "guide.manus",
    lumailTag: "guide_tool_manus_permission_map",
    buttonLabel: "Send me the permission map",
    modalTitle: "Get the Manus task and permission map",
    description:
      "Enter your email to get the fillable map. Download it immediately and define the task boundary before the agent works.",
    deliverable: {
      name: "Manus task and permission map",
      format: "worksheet",
      downloadHref: "/downloads/manus-task-and-permission-map.pdf",
      usefulWhen: "Use it before Manus can browse, connect, create, publish or change anything.",
    },
  },
  answer: {
    heading: "Choose Manus when the job needs several actions and produces a result you can inspect",
    paragraphs: [
      "Manus is an AI agent. In Agent mode it can plan a multi-step task, use tools and return a deliverable such as a report, slide deck, website or data file.",
      "Its cloud browser can visit sites and complete web steps. Its Browser Operator can use a browser session you authorize, including signed-in sites.",
      "That extra action creates extra risk. A weak assumption can travel through several steps, and a broad login can expose more than the task needs.",
    ],
    keyLine:
      "Give Manus a finish line, the smallest access possible and a written stop before any send, publish, purchase, deletion or permanent change.",
  },
  framework: {
    kind: "tool-verdict",
    heading: "Manus is a fit for bounded execution, not vague delegation",
    verdict:
      "Manus is worth testing when a task bundles research, web work and file creation and the final result is easy to review. Keep the agent out of high-risk systems until a small reversible task has passed and every permission is understood.",
    bestFor: [
      "Collecting public information into a structured, sourced deliverable",
      "Building a draft website or slide deck with checkpoints before publication",
      "Completing a repetitive browser task in a dedicated low-risk account",
      "Testing an agent task whose result, path and cost can all be inspected",
    ],
    poorFitFor: [
      "A vague goal with no finish line or source rule",
      "Customer money, sensitive accounts or irreversible actions in the first test",
      "A login that exposes unrelated data or broad administrator access",
      "A decision that needs human judgment at every step",
    ],
    useCases: [
      {
        task: "Research a public guide topic into a source table",
        whyItWorks:
          "The agent can search several sites and organize findings into a file while the reader checks every link.",
        firstMove:
          "Name the allowed domains, required columns and finish line. Tell Manus to leave a row blank when it cannot verify the primary source.",
      },
      {
        task: "Build a private draft guide companion page",
        whyItWorks:
          "Manus can produce a website with version checkpoints before the owner decides whether to publish it.",
        firstMove:
          "Use invented content and private visibility. Review the latest checkpoint, links and data collection before any public publish action.",
      },
      {
        task: "Repeat a browser task in a test account",
        whyItWorks:
          "The Browser Operator can work through a signed-in flow after explicit access is granted.",
        firstMove:
          "Create a limited test account. Allow only the named pages and draft actions, then watch the first run and revoke access when the test ends.",
      },
    ],
    recommendation:
      "Start with public sources or a limited test account. Do not expand access until Manus follows the brief, stops correctly and produces a result you can verify and undo.",
  },
  practicalAsset: {
    kind: "decision-tool",
    heading: "Map the task before the agent runs",
    introduction:
      "Write 1 sentence for the goal, the allowed environment, the approval point and the rollback. If any answer is vague, the task is not ready.",
    instructions:
      "Use the smallest possible account and access. Keep the first run visible and reversible.",
    questions: [
      {
        question: "Can you describe the finished result and how a person will check it?",
        ifYes: "Write the output format, required evidence and pass rule.",
        ifNo: "Stop. Do not delegate a task with no finish line.",
      },
      {
        question: "Can you name every site, file, account and action the task needs?",
        ifYes: "Grant only those items and record when the access will be removed.",
        ifNo: "Use public sources or a limited test account until the access is clear.",
      },
      {
        question: "Could an action send, publish, buy, delete or change a lasting record?",
        ifYes: "Require a named person to approve immediately before that action.",
        ifNo: "Keep a log and a run limit anyway.",
      },
      {
        question: "Can you undo the action and restore the previous state?",
        ifYes: "Write the rollback steps and test them before expansion.",
        ifNo: "Keep the agent in research or draft-only mode.",
      },
    ],
    decisionRule:
      "Run only when the finish line, access, approval, log, cost limit, stop condition and rollback are all written.",
  },
  relatedGuideSlugs: ["which-ai-tool-for-what", "what-is-agentic", "first-ai-employee"],
  relatedHeading: "Choose what to build next.",
  ending: {
    kind: "clean",
    statement:
      "The useful agent is not the one that can do the most. It is the one that does the named task and stops exactly where you told it to.",
  },
});
