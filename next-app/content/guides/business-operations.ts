import { defineGuideArticle } from "@/content/structured-guide";

export const businessOperationsGuide = defineGuideArticle({
  slug: "business-operations",
  level: "Beginner",
  hub: "Business operations",
  outcomes: ["Run business operations"],
  composition: "learning-hub",
  hero: {
    title: "Run business operations in the right order",
    promise:
      "Compare 5 real tasks, choose what to automate 1st, name the person responsible and show what works and what happens when it fails.",
    illustration: {
      src: "/images/guides/business-operations.webp",
      alt: "The small blue robot mascot moving a blank task card to the front of a short ordered queue at a single antique dispatch table in warm ivory",
      focalPoint: "82% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "business-operations",
    guideId: "hub.business-operations",
    lumailTag: "hub_business_operations_map",
    buttonLabel: "Send me the worksheet",
    modalTitle: "Get the worksheet: What to automate first",
    description:
      "Enter your email to get the fillable worksheet. Download it immediately, compare 5 real tasks and choose 1 safe first build.",
    deliverable: {
      name: "What to automate first worksheet",
      format: "PDF",
      downloadHref: "/downloads/business-operations-automation-map.pdf",
      usefulWhen:
        "Use it before you buy another tool, automate a repeated task or connect several working processes.",
    },
  },
  answer: {
    heading: "Use real records, not guesses",
    paragraphs: [
      "List 5 tasks before you choose a tool. For each one, write the result, how often it happens, who is responsible and a real record of what happens now. Then check the information it uses, the biggest action it can take, the cost of a mistake and how you would put things back.",
      "Give each task 1 decision: Start first, Prepare controls, Keep manual or Remove or merge. Prepare controls means name the missing person responsible, collect proof, set the rule for what information the task may use or write a clear undo plan. A task cannot start 1st without a person responsible and a real record.",
    ],
    keyLine:
      "Do not automate the loudest task. Start with the task backed by the strongest proof and the clearest way to undo a mistake.",
  },
  framework: {
    kind: "learning-hub",
    heading: "Choose the guide for the task in front of you",
    introduction:
      "You do not need every guide. Choose the route that matches the task you need to fix now.",
    pathways: [
      {
        signal: "I have tools doing the same job",
        direction:
          "Give each tool 1 clear job. Remove overlap before you add another subscription.",
        href: "/guides/stack-3-tool-ai-stack.html",
        actionLabel: "Simplify the tool stack",
      },
      {
        signal: "A guide, offer or follow-up does not reach the right person",
        direction:
          "Use the follow-up guide to map the full path from request to delivery and human handoff.",
        href: "/guides/follow-up-setup.html",
        actionLabel: "Build lead follow-up",
      },
      {
        signal: "Replies and urgent messages break up my day",
        direction:
          "Use the inbox guide to build 1 daily brief that shows what needs you and links back to each message.",
        href: "/guides/inbox-manager-setup.html",
        actionLabel: "Build a daily inbox brief",
      },
      {
        signal: "I have approved business data but no clear view for the decision",
        direction:
          "Build 1 small dashboard for 1 named decision, then check every result against the source before using it.",
        href: "/guides/build-a-business-dashboard-with-ai.html",
        actionLabel: "Build the decision dashboard",
      },
      {
        signal: "The task cannot follow the same steps every time",
        direction:
          "Use the AI job guide when the task cannot follow the same steps every time.",
        href: "/guides/first-ai-employee.html",
        actionLabel: "Set limits for 1 AI job",
      },
      {
        signal: "Several proven processes now run on a schedule",
        direction:
          "Use the monitoring guide only after several processes pass their own tests.",
        href: "/guides/24-7-operations-system.html",
        actionLabel: "Monitor proven workflows",
      },
    ],
    sequenceHeading: "Move from 5 tasks to 1 proven process",
    steps: [
      {
        level: "Beginner",
        title: "List the work that repeats",
        action:
          "List every recurring task across demand, delivery, communication, administration, finance, content and service. Then choose 5 to compare today.",
        finishLine:
          "The full list exists, and 5 tasks have a useful result, a person responsible and proof from a dated example, count, record or work sample.",
      },
      {
        level: "Beginner",
        title: "Name where information comes from and goes next",
        action:
          "For each task, write where the facts come from and which source wins if 2 disagree. Name who fixes or removes old information, what moves to the next task, what proof comes back and who receives work that stops.",
        finishLine:
          "A new reviewer can find the source, know which one wins and follow the handoff without guessing.",
      },
      {
        level: "Beginner",
        title: "Choose from evidence",
        action:
          "A task with no owner or real proof cannot start 1st. A task that is hard to undo cannot start 1st unless a safe 1st version removes that action. A task that uses sensitive information without an approved rule for what information the task may use moves to Prepare controls. A task that contacts a customer or changes a lasting record moves to Prepare controls unless the 1st test only prepares work for a person. From the tasks left, choose the task that has the strongest proof, happens most often, has the lowest failure cost and has the clearest way to put things back.",
        finishLine:
          "Every task has a written reason and 1 decision: Start first, Prepare controls, Keep manual or Remove or merge.",
      },
      {
        level: "Intermediate",
        title: "Use the guide that owns the task",
        action:
          "Open the guide that matches the task. Build 1 complete process with the smallest access it needs, then test 1 normal result and 1 failure.",
        finishLine:
          "The task has 1 owner, limited access, proof of a normal result, proof of a failure test and a manual way to finish the work.",
      },
      {
        level: "Intermediate",
        title: "Add the proven process to 1 list",
        action:
          "Keep 1 business-wide process list. Add the task only after its owner accepts the test proof. Record its source, status, what it can read or change, review date and next decision.",
        finishLine:
          "The process list shows what is manual, being prepared, being tested, proven, paused or stopped and why.",
      },
      {
        level: "Intermediate",
        title: "Review what changed",
        action:
          "Compare the result with what happened before the change. Record the approved change, human review, corrections, failures, unusual cases, running cost and business result. Record what the system can read or change, who approved it, when access ends or is reviewed and who removes it.",
        finishLine:
          "The owner can show the real result, correction work, what access remains, when it ends or is reviewed and the next Keep, Change, Remove or Stop decision.",
      },
      {
        level: "Expert",
        title: "Monitor only proven processes together",
        action:
          "Connect processes only after each one passes its own tests. Keep a backup owner, a manual way to finish the work, current source files, a tested stop and approval before restart.",
        finishLine:
          "A forced failure becomes visible, stops the affected work, alerts the owner and starts the manual backup. Restart stays blocked until a person approves it.",
      },
    ],
  },
  example: {
    heading: "Choose the next Shift & Lead operations build",
    situation:
      "Shift & Lead has 5 possible improvements: simplify an overlapping tool, fix a guide-delivery path, prepare a daily reply brief, let AI prepare a failed-delivery review and add shared monitoring.",
    weakApproach:
      "Buy another tool or build the most impressive automation before naming the owner, approved source, proof, failure cost or way to undo a mistake.",
    decision:
      "Put all 5 candidates into the same worksheet. Compare the evidence in the same order and send each task to the guide that owns the detailed build.",
    action:
      "Record the current process, how often it happens, the time people spend on it now, owner and backup, approved data source and rule for what information the task may use, proof, highest-risk action, whether it contacts a customer or creates a lasting record, failure cost and how to recover. Mark overlapping tool work Remove or merge and open the stack guide. Send the guide-delivery path to follow-up, the daily reply brief to inbox and the failed-delivery review to the guide for an AI task with clear limits only if a simpler process that only prepares the review for a person cannot do the useful work. Keep shared monitoring in Prepare controls until each process passes. Start the candidate that has the strongest proof, happens most often, has the lowest failure cost and has the clearest recovery route. After the test, record the baseline, result, corrections, unusual cases and Keep, Change or Stop decision.",
    result:
      "Fatiha can see which process should start 1st, who owns it, what proof matters and which guide shows the full build. Work that is not ready moves to Prepare controls, Keep manual or Remove or merge.",
    lesson:
      "Operations improve when the business chooses from evidence, not when the tool list grows.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Choose what to automate 1st",
    introduction:
      "Use this compact preview to compare 5 tasks and put 3 finalists in order. The downloadable PDF contains the full 3-page worksheet.",
    instructions:
      "Use real proof. Do not score the tasks with made-up numbers. If a task has no owner, no proof or no safe way to undo a change, it cannot start 1st.",
    workedExample: {
      label: "Shift & Lead candidate list",
      content:
        "Candidates: simplify an overlapping tool, fix guide delivery, prepare a daily reply brief, prepare a failed-delivery review and add shared monitoring. Each task needs an owner, proof, a safe 1st version and the correct next worksheet for that task before it moves forward.",
    },
    fields: [
      {
        label: "5 real tasks",
        instruction:
          "Name the result, how often the task happens, monthly time, owner and proof for each task.",
      },
      {
        label: "Compare 3 finalists",
        instruction:
          "For exactly 3 tasks, record the highest-risk action, information used and the approved rule for what information the task may use, owner and backup, failure cost, recovery route, proof and decision.",
      },
      {
        label: "Put them in order",
        instruction:
          "Give the 3 tasks an implementation order. Add the owner, safe 1st version, test proof, undo route, missing control, dates and next worksheet for that task.",
      },
      {
        label: "Action within 48 hours",
        instruction:
          "Write 1 next action, the person responsible and the deadline.",
      },
    ],
    completionRule:
      "The preview is complete when 5 tasks become 3 ordered finalists, each with an owner, proof, decision and recovery route. One task has a safe test, the next worksheet for that task and an action due within 48 hours.",
  },
  resultCheck: {
    heading: "The order is useful only when proof supports it",
    successSignals: [
      "The list starts with 5 real tasks and proof from dated examples, records, counts or work samples.",
      "Exactly 3 finalists are compared using the same questions about owner, proof, the approved rule for what information the task may use, highest-risk action, failure cost and recovery.",
      "The task marked Start first has an owner, strong proof, a safe 1st version, the lowest failure cost among the finalists and a clear way to put things back.",
      "Each finalist has a decision, a written reason, a place in the order and the correct next worksheet.",
      "After a test watched by the owner, that person records the actual result, corrections, failures and Keep, Change, Remove or Stop decision.",
    ],
    limitations: [
      "The comparison chooses an order. It does not give a tool permission to read information or take an action.",
      "This guide does not design the stack, message sequence, inbox brief, AI job or monitoring system. Use the matching full guide for that work.",
      "A time estimate or confident tool summary is not proof. Use an actual record, example, count, log or work sample.",
    ],
    stopConditions: [
      "The task has no named owner or no real proof.",
      "The task is hard to undo and the safe 1st version still takes the risky action.",
      "The task uses sensitive information, contacts a customer or changes a lasting record without a clear rule and approval.",
      "There is no tested way to put things back the way they were or finish the work by hand.",
      "The correct next worksheet for that task has not been completed.",
    ],
  },
  relatedGuideSlugs: [
    "stack-3-tool-ai-stack",
    "follow-up-setup",
    "24-7-operations-system",
  ],
  relatedHeading: "Choose what to fix next.",
  ending: {
    kind: "commercial",
    eyebrow: "Ready to build the 1st process?",
    heading: "Turn the approved 1st process into a working business system",
    body:
      "Complete the worksheet and choose 1 reversible process with strong proof and a clear recovery route. The Shift & Lead Build Sprint can then build the workflow, handoffs and controls around your real business.",
    action: {
      label: "See the Build Sprint",
      href: "/build-sprint.html",
    },
  },
});
