import { defineGuideArticle } from "@/content/structured-guide";

export const whichAiToolForWhatGuide = defineGuideArticle({
  slug: "which-ai-tool-for-what",
  level: "Beginner",
  hub: "AI tools",
  outcomes: ["Choose an AI tool"],
  composition: "decision",
  hero: {
    title: "Which AI tool should you use?",
    promise:
      "Compare 10 AI tools by the work you need done, then choose 1 to test.",
    illustration: {
      src: "/images/guides/which-ai-tool-for-what.webp",
      alt: "The small blue robot mascot routing 1 work request toward 10 tool stations",
      focalPoint: "72% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "which-ai-tool-for-what",
    guideId: "hub.ai-tools",
    lumailTag: "hub_ai_tool_comparison_scorecard",
    buttonLabel: "Send me the scorecard",
    modalTitle: "Get the 10-tool comparison scorecard",
    description:
      "Enter your email to get the editable scorecard. Download it immediately and compare shortlisted tools on 1 real job made of 3 repeatable tasks.",
    deliverable: {
      name: "10-tool comparison scorecard",
      format: "PDF",
      downloadHref: "/downloads/10-tool-comparison-scorecard.pdf",
      usefulWhen: "Use it before you start a trial, upgrade a plan or add another AI tool.",
    },
  },
  answer: {
    heading: "Choose the tool that fits the job and the information it needs",
    paragraphs: [
      "There is no best AI tool for every person. A useful choice depends on where your work already lives, what the tool must produce and what information it may access.",
      "Choose 1 real job, split it into 3 repeatable tasks and test the same tasks in each shortlisted tool. Keep a tool only if its result is useful, checkable and easier to run than your current method.",
    ],
    keyLine:
      "Do not compare marketing demos. Give each tool the same source material, task, limits and quality check.",
  },
  framework: {
    kind: "decision",
    heading: "Start with the job you need done",
    question:
      "Which tool gives your real task the shortest path from source material to a result you can approve?",
    recommendation:
      "Use the fit below to create a shortlist. Then run the same 3-task job test before you buy.",
    options: [
      {
        name: "Everyday mixed work: ChatGPT",
        bestWhen:
          "You want 1 general assistant for questions, writing, files, images and data tasks that change from day to day.",
        tradeoff:
          "Its range can hide a weak fit. A tool that does many things still needs to pass the exact task you repeat.",
        decision:
          "Choose ChatGPT when you need a broad starting point and do not yet have a stronger workspace or deployment requirement.",
        href: "/guides/chatgpt.html",
        actionLabel: "Open the ChatGPT guide",
      },
      {
        name: "Long documents and careful writing: Claude",
        bestWhen:
          "Your work starts with documents, detailed instructions or a draft that needs clear structure and close editing.",
        tradeoff:
          "A strong document result does not prove it fits the apps, permissions or actions around your wider process.",
        decision:
          "Choose Claude when reading, reasoning and writing from your source material are the center of the job.",
        href: "/guides/claude.html",
        actionLabel: "Open the Claude guide",
      },
      {
        name: "Google-based work: Gemini",
        bestWhen:
          "Your source material already sits in Gmail, Drive, Docs, Calendar or other Google services and your account can connect them.",
        tradeoff:
          "Access and actions vary by account, plan, location and administrator settings. Confirm the exact connection before you design the process.",
        decision:
          "Choose Gemini when the shortest path to the work runs through Google Workspace.",
        href: "/guides/gemini.html",
        actionLabel: "Open the Gemini guide",
      },
      {
        name: "Microsoft-based work: Copilot",
        bestWhen:
          "Your team works in Word, Excel, PowerPoint, Outlook or Teams and needs answers grounded in Microsoft 365 information it already has permission to use.",
        tradeoff:
          "The result depends on licensing, setup and existing permissions. Poor access rules become an AI access problem too.",
        decision:
          "Choose Copilot when Microsoft 365 is already the operating system for the work.",
        href: "/guides/copilot.html",
        actionLabel: "Open the Copilot guide",
      },
      {
        name: "Live public signals: Grok",
        bestWhen:
          "The task begins with current web information or live discussion on X, such as spotting a new question, claim or public reaction.",
        tradeoff:
          "A live post is a signal, not proof. Open the original source before you publish a claim or make a decision.",
        decision:
          "Choose Grok when current public conversation is the source you need to inspect first.",
        href: "/guides/grok.html",
        actionLabel: "Open the Grok guide",
      },
      {
        name: "Research and finished files: Kimi",
        bestWhen:
          "You want research, documents, spreadsheets, slides or another substantial file produced from 1 task brief.",
        tradeoff:
          "Kimi includes several product modes. Confirm which mode, data access and credit model the task will use.",
        decision:
          "Choose Kimi when the job ends with a research package or editable work file, not only a chat answer.",
        href: "/guides/kimi.html",
        actionLabel: "Open the Kimi guide",
      },
      {
        name: "Multi-step deliverables: Manus",
        bestWhen:
          "You want an agent to carry a project through several steps and return a concrete deliverable such as slides, a website or a designed asset.",
        tradeoff:
          "More action creates more to review. Check its plan, connected tools, source material and final output before anything is shared or launched.",
        decision:
          "Choose Manus when the task needs execution across several steps and you can supervise the checkpoints.",
        href: "/guides/manus.html",
        actionLabel: "Open the Manus guide",
      },
      {
        name: "Work inside Meta apps: Meta AI",
        bestWhen:
          "The task starts inside WhatsApp, Instagram, Facebook or Messenger and convenience matters more than a separate work system.",
        tradeoff:
          "In-app access is useful for quick help, but it is not a reason to share confidential business or customer information.",
        decision:
          "Choose Meta AI for quick ideas or assistance where you already communicate in Meta apps.",
        href: "/guides/meta-ai.html",
        actionLabel: "Open the Meta AI guide",
      },
      {
        name: "Developer-led model testing: DeepSeek",
        bestWhen:
          "A technical person wants to test DeepSeek through its chat or a direct software connection called an API, and can review the data, licence, security and hosting decision.",
        tradeoff:
          "A low barrier to testing does not settle data location, support, model fit or production risk.",
        decision:
          "Choose DeepSeek when the model or its direct software connection is the product decision and a technical owner can evaluate it properly.",
        href: "/guides/deepseek.html",
        actionLabel: "Open the DeepSeek guide",
      },
      {
        name: "Deployment control: Mistral",
        bestWhen:
          "Your requirement is control over where the AI runs, where its data is stored or how it connects to company knowledge and tools.",
        tradeoff:
          "A private or custom setup needs technical work, vendor approval and ongoing care. It is unnecessary when a standard assistant already meets the requirement.",
        decision:
          "Choose Mistral when control is a written business requirement, not a preference added after the tool search starts.",
        href: "/guides/mistral.html",
        actionLabel: "Open the Mistral guide",
      },
    ],
    decisionRule:
      "Choose from the job, the source access and the risk. If 2 tools still fit, test both with the same 3 tasks and keep the simpler one that produces the more useful result.",
  },
  practicalAsset: {
    kind: "decision-tool",
    heading: "Choose 1 tool with a fair test",
    introduction:
      "At Shift & Lead, a tool does not win because its demo looks impressive. It wins only when it completes the real work with the right source, control and review.",
    instructions:
      "Choose 1 real job and split it into 3 repeatable tasks. Use the same inputs and quality check in every tool you test.",
    questions: [
      {
        question: "Does the source material already live in 1 connected workspace?",
        ifYes:
          "Shortlist the tool that can use that workspace with the permissions you approve.",
        ifNo:
          "Choose a general assistant and upload only the source material needed for the test.",
      },
      {
        question: "Can you name whether the result must be an answer, an editable file or several completed steps?",
        ifYes:
          "Match the tool to that final output. Do not score a chat answer against an agent deliverable.",
        ifNo:
          "Define the finished result before you compare tools.",
      },
      {
        question: "Can the task use the tool without exposing restricted information or giving broad access?",
        ifYes:
          "Run the test with the smallest access possible and record what the tool used.",
        ifNo:
          "Stop. Resolve the data, contract, account and permission requirements before testing.",
      },
      {
        question: "Did the tool pass all 3 tasks in the same real job?",
        ifYes:
          "Keep 1 tool for 30 days and measure quality, time saved, cost and effort to keep it working.",
        ifNo:
          "Do not buy it. Fix the brief once, then test the next-best fit.",
      },
    ],
    decisionRule:
      "Keep the tool that produces the best checkable result with the least access and upkeep. Add another tool only when a different job has a clear gap.",
  },
  ending: {
    kind: "clean",
    statement: "Test 1 real job before you pay. Keep the tool that produces the best result you can check with the least access and maintenance.",
  },
  relatedGuideSlugs: ["chatgpt", "claude", "stack-3-tool-ai-stack"],
  relatedHeading: "Test the shortlist next.",
});
