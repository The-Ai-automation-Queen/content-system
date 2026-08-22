import { defineGuideArticle } from "@/content/structured-guide";

export const aiEssentialsGuide = defineGuideArticle({
  slug: "ai-essentials",
  level: "Beginner",
  hub: "AI essentials",
  outcomes: ["Understand AI"],
  composition: "learning-hub",
  hero: {
    title: "Start using AI without learning everything",
    promise:
      "Choose 1 real task and finish 1 useful AI result you can check this week.",
    illustration: {
      src: "/images/guides/ai-essentials.webp",
      alt: "The small blue robot mascot choosing a route on a simple AI learning map",
      focalPoint: "100% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "ai-essentials",
    guideId: "hub.ai-essentials",
    lumailTag: "hub_ai_essentials_7_day_plan",
    buttonLabel: "Send me the 7-day plan",
    modalTitle: "Get the 7-day AI starter plan",
    description:
      "Enter your email to get the 7-day starter worksheet and practice log. Download it immediately and use it with 1 real task.",
    deliverable: {
      name: "7-day AI starter worksheet and practice log",
      format: "PDF",
      downloadHref: "/downloads/your-first-7-days-with-ai.pdf",
      usefulWhen:
        "Use it when you want a clear place to start before learning every term, prompt or tool.",
    },
  },
  answer: {
    heading: "You need 1 task, not a tour of AI",
    paragraphs: [
      "Start with work you already understand. Give AI information you are allowed to use, ask it to prepare a result and keep the final decision with you.",
      "Use the map below to open only the guide you need. Return when you can produce and check 1 useful result.",
    ],
    keyLine:
      "Learn at the moment of use. Do not collect terms, prompts or tools before the task asks for them.",
  },
  framework: {
    kind: "learning-hub",
    heading: "Choose the guide that solves today's problem",
    introduction:
      "Start from the signal you recognise. You do not need to read all 3 guides before doing useful work.",
    pathways: [
      {
        signal: "I do not know whether this task needs AI",
        direction:
          "Sort the task before choosing a tool. Decide whether the work needs software that follows fixed rules, automation, AI or a person.",
        href: "/guides/what-is-ai.html",
        actionLabel: "Sort the task",
      },
      {
        signal: "AI words keep blocking the conversation",
        direction:
          "Check only the term in front of you, then return to the task. The 10-word guide is a reference, not homework.",
        href: "/guides/ai-jargon-guide.html",
        actionLabel: "Check the term",
      },
      {
        signal: "I know the task, but the answer is vague",
        direction:
          "Turn the request into a clear brief that gives the AI enough information you are allowed to use and makes the result easy to check.",
        href: "/guides/what-is-a-prompt.html",
        actionLabel: "Build the brief",
      },
      {
        signal: "I have 1 useful result and want to repeat it",
        direction:
          "Use the same kind of task on new examples, change 1 thing at a time and keep only the rule the work supports.",
        href: "/guides/get-better-at-ai.html",
        actionLabel: "Improve the task",
      },
    ],
    sequenceHeading: "Start here",
    steps: [
      {
        title: "Choose 1 real low-risk task",
        action:
          "Pick work you already understand and can check quickly. Name the result you need before you open an AI tool.",
        finishLine:
          "You can state the task and its finished result in 1 sentence.",
      },
      {
        title: "Decide where AI belongs",
        action:
          "Use the task sorter to decide what AI prepares, what software that follows fixed rules handles and what a person must still decide.",
        finishLine:
          "The AI step and the human check are both written.",
        href: "/guides/what-is-ai.html",
        actionLabel: "Open the task sorter",
      },
      {
        title: "Check a term only when it blocks you",
        action:
          "Open the 10-word reference when unfamiliar language stops the task. Read the definition and action, then return to your work.",
        finishLine:
          "You can explain the term through the action it changes in your task.",
        href: "/guides/ai-jargon-guide.html",
        actionLabel: "Open the 10 words",
      },
      {
        title: "Turn the task into a usable brief",
        action:
          "Use the prompt guide with the real task and information you are allowed to use. Do not copy a finished prompt that belongs to a different situation.",
        finishLine:
          "The answer has a clear purpose and can be checked against your real source.",
        href: "/guides/what-is-a-prompt.html",
        actionLabel: "Open the prompt guide",
      },
      {
        title: "Run, check and repeat",
        action:
          "Check the 1st result, improve the brief and run it on a new example. Record what changed and decide Keep, Change or Stop.",
        finishLine:
          "The task works on a 2nd example or you have a clear reason to keep it manual.",
      },
    ],
  },
  example: {
    heading: "How Shift & Lead chooses the next guide",
    situation:
      "Fatiha has 20 reader questions with names removed and needs evidence for the next guide decision.",
    weakApproach:
      "Ask AI which guide to publish next and accept a polished recommendation with no link to what readers actually asked.",
    decision:
      "Use AI to organise the evidence. Keep the editorial choice with Fatiha.",
    action:
      "AI groups the 20 questions and returns a table with each group, its count, question numbers and unclear items. Every group must link back to the original questions. It must not invent demand or guess what a reader meant. Fatiha checks the groups and decides which guide belongs in the library.",
    result:
      "Fatiha gets a faster view of repeated reader problems and can trace every proposed theme back to the source before making the decision.",
    lesson:
      "AI prepares the evidence. The person who owns the audience makes the editorial decision.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Your 1st 7 days with AI",
    introduction:
      "Use 1 real task for the full week. The goal is 1 useful capability you can repeat, not a tour of tools.",
    instructions:
      "Write the result of each day before moving on. Keep private information out unless you are allowed to use it. Keep decisions about customers, money, access, rights or reputation with a person.",
    workedExample: {
      label: "Shift & Lead task",
      content:
        "Task: group 20 reader questions with names removed. Finished result: a table with each group, its count, question numbers and unclear items, all linked back to the original questions. Human decision: Fatiha checks the evidence and chooses the next guide.",
    },
    fields: [
      {
        label: "Day 1: choose the task",
        instruction:
          "Name 1 low-risk task you already understand and write the finished result in 1 sentence.",
      },
      {
        label: "Day 2: decide where AI fits",
        instruction:
          "Use the task sorter. Write what AI prepares, what software that follows fixed rules handles and what a person checks or decides.",
      },
      {
        label: "Day 3: gather the source",
        instruction:
          "Collect the information the task needs and that you are allowed to use. Remove private information that is not required.",
      },
      {
        label: "Day 4: make the 1st attempt",
        instruction:
          "Try the task before copying a finished prompt. Save the result and write what was missing, wrong or hard to use.",
      },
      {
        label: "Day 5: improve the brief",
        instruction:
          "Use the prompt guide to improve the instruction, then run the same task again with the same source.",
      },
      {
        label: "Day 6: check the result",
        instruction:
          "Check important facts against the source. Mark missing information, unsupported claims and every decision that still needs a person.",
      },
      {
        label: "Day 7: repeat and decide",
        instruction:
          "Run the task with a new example. Compare both results and decide Keep, Change or Stop.",
      },
      {
        label: "Practice log",
        instruction:
          "For every run record: task, source used, result needed, result received, corrections, change made and Keep, Change or Stop.",
      },
    ],
    completionRule:
      "The 7 days are complete when the task works on a new example, the important result can be checked and the log shows what made the result better or why the task should stay manual.",
  },
  resultCheck: {
    heading: "You are ready for the next path when the result holds up",
    successSignals: [
      "You can name 1 real task and its finished result.",
      "You can state what AI prepares and what a person still checks or decides.",
      "You can open the correct child guide without reading all 3 beforehand.",
      "The result uses information you are allowed to use and important facts trace back to it.",
      "You improved the brief after a weak result instead of changing tools immediately.",
      "The task works on a new example or you recorded why it should stay manual.",
      "Your practice log ends with a clear Keep, Change or Stop decision.",
    ],
    limitations: [
      "A 7-day plan builds 1 useful capability. It does not teach every AI term, tool or workflow.",
      "A polished answer can still be wrong. Check important facts against the original source.",
      "AI can prepare evidence and options. It does not own decisions involving customers, money, access, rights or reputation.",
    ],
    stopConditions: [
      "The task has no clear finished result.",
      "Important facts cannot be checked against a trusted source.",
      "The task requires private information you are not allowed to use.",
      "The result would send, publish, purchase, delete or change a lasting record without human approval.",
      "You cannot judge whether the answer is useful or safe.",
    ],
  },
  relatedGuideSlugs: ["what-is-ai", "ai-jargon-guide", "what-is-a-prompt"],
  relatedHeading: "Open only the guide you need next.",
  ending: {
    kind: "clean",
    statement:
      "Finish 1 useful, checked result. Then learn only what the next real task requires.",
  },
});
