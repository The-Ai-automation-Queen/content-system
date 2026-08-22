import { defineGuideArticle } from "@/content/structured-guide";

export const whatIsAgenticGuide = defineGuideArticle({
  slug: "what-is-agentic",
  level: "Beginner",
  hub: "AI agents",
  outcomes: ["Understand AI", "Build an agent"],
  composition: "decision",
  hero: {
    title: "What AI agents actually do",
    promise:
      "See when you need a chatbot, a workflow or an agent, and where a person should keep control.",
    illustration: {
      src: "/images/guides/what-is-agentic.webp",
      alt: "The small blue robot mascot operating the final machine in a connected mechanical process",
      focalPoint: "70% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "what-is-agentic",
    guideId: "guide.what-is-agentic",
    lumailTag: "guide_agent_or_workflow_card",
    buttonLabel: "Send me the workflow or agent worksheet",
    modalTitle: "Get the workflow or agent worksheet",
    description:
      "Enter your email to get the 1-page worksheet. Download it immediately and use it before you give an AI tool access to your work.",
    deliverable: {
      name: "Workflow or agent worksheet",
      format: "worksheet",
      downloadHref: "/downloads/workflow-or-agent-decision-card.pdf",
      usefulWhen: "Use it to choose the right level of action and approval for 1 task.",
    },
  },
  answer: {
    heading: "An AI agent works through a goal in several steps",
    paragraphs: [
      "In this guide, a chatbot means AI that gives you an answer and waits for your next instruction. An agent is allowed to take several approved steps toward a result.",
      "Use an agent only when it must choose between approved actions after seeing the previous result. If the steps are known, use a workflow. It will be easier to test and more predictable.",
    ],
    keyLine:
      "Give the system only the access it needs. A person must approve before it sends, deletes, spends, publishes or changes a customer record.",
  },
  framework: {
    kind: "decision",
    heading: "Choose the lowest level of freedom that can do the job",
    question:
      "Does the system only need to answer, follow known steps or choose what to do next?",
    recommendation:
      "Start at the left. Move right only when the task cannot succeed without more freedom.",
    options: [
      {
        name: "1. Chatbot",
        bestWhen:
          "You need 1 answer, draft, summary or comparison and a person will decide what happens next.",
        tradeoff:
          "It does not move the work into another tool unless you ask it to or connect an action.",
        decision:
          "Choose this when a person will use the answer or draft.",
      },
      {
        name: "2. Workflow",
        bestWhen:
          "You can write every step before the task starts.",
        tradeoff:
          "You must define what happens when a case does not fit.",
        decision:
          "What starts the workflow, every step and the finish line are clear.",
      },
      {
        name: "3. Agent with approval",
        bestWhen:
          "The AI must choose between approved actions, but a mistake could affect customers, private information or reputation.",
        tradeoff:
          "A person approves each action before it happens.",
        decision:
          "Shift & Lead uses a workflow to deliver a requested guide. If a reader sends an unusual reply, an agent may prepare a response from the approved guide library, but a person approves it before send.",
      },
      {
        name: "4. Agent allowed to act",
        bestWhen:
          "The system has passed tests, the action is easy to reverse and the cost of a mistake is low.",
        tradeoff:
          "The action may happen before a person sees it. Narrow access, activity logs, limits and a stop condition are required.",
        decision:
          "The agent can touch only named records, use approved tools and stop outside those limits.",
      },
    ],
    decisionRule:
      "Use a workflow when the steps are known. Use an agent only when it must choose between approved actions. Start with a person approving every action that affects money, customers, private data, rights or reputation.",
  },
  practicalAsset: {
    kind: "decision-tool",
    heading: "Run the workflow or agent test",
    introduction:
      "Choose 1 real task. Answer 4 questions before you connect a tool or grant access.",
    instructions:
      "Write the answer beside the task. If you cannot answer a question clearly, do not give the system more freedom.",
    questions: [
      {
        question: "Can you write every step before the task starts?",
        ifYes: "Build a workflow. Define what happens when a case does not fit.",
        ifNo: "Continue only if the task truly needs the system to choose its next step.",
      },
      {
        question: "Can you name the smallest access the task needs?",
        ifYes:
          "Grant access only to the named inbox, folder, calendar, database fields or actions.",
        ifNo: "Do not connect the tool until you can name and limit the required access.",
      },
      {
        question: "Could a wrong action affect money, customers, private data, rights or reputation?",
        ifYes:
          "A named person must approve before the agent sends, deletes, spends, publishes or changes a customer record.",
        ifNo: "Test the action on a small, reversible set and keep an activity log.",
      },
      {
        question: "Can you test the result, undo the action and see what the agent did?",
        ifYes:
          "Set a success check, a run limit and a stop condition. Review the log after every early run.",
        ifNo: "Let the agent prepare drafts only. It is not ready to act.",
      },
    ],
    decisionRule:
      "When in doubt, choose the workflow. If the path must change, let the agent prepare drafts or require a person to approve each action until its access, results and failures are understood.",
  },
  ending: {
    kind: "clean",
    statement: "Build the fixed path first. Give an agent a choice only when the task needs it, the choices are limited and a person can stop or undo every important action.",
  },
  relatedGuideSlugs: ["first-ai-employee", "manus", "24-7-operations-system"],
  relatedHeading: "Choose what to build next.",
});
