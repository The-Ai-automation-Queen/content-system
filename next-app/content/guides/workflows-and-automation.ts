import { defineGuideArticle } from "@/content/structured-guide";

export const workflowsAndAutomationGuide = defineGuideArticle({
  slug: "workflows-and-automation",
  level: "Intermediate",
  hub: "Workflows and automation",
  outcomes: ["Automate a task"],
  composition: "learning-hub",
  hero: {
    title: "Build 1 workflow that finishes the task and shows you when it fails",
    promise:
      "Map the trigger, steps, owner, finish line and failure path before connecting a tool.",
    illustration: {
      src: "/images/guides/workflows-and-automation.webp",
      alt: "The small blue robot mascot mapping a workflow from 1 trigger through ordered steps to a checked result and visible failure path",
      focalPoint: "100% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "workflows-and-automation",
    guideId: "hub.workflows-and-automation",
    lumailTag: "hub_task_to_workflow_canvas",
    buttonLabel: "Send me the workflow canvas",
    modalTitle: "Get the task-to-workflow canvas",
    description:
      "Enter your email to get the canvas. Download it immediately, map 1 repeated task and test both the result and the failure path before you automate it.",
    deliverable: {
      name: "Task-to-workflow canvas",
      format: "PDF",
      downloadHref: "/downloads/task-to-workflow-canvas.pdf",
      usefulWhen:
        "Use it when a repeated task feels ready for automation but its trigger, owner, finish check or failure path is still unclear.",
    },
  },
  answer: {
    heading: "If the steps stay the same, build a workflow",
    paragraphs: [
      "A workflow is a fixed path. 1 event starts it, each step has an owner and the process ends with a result you can check. Normal software, automation or AI may complete a step, but people set the path and decide what happens when something goes wrong.",
      "Use an agent only when the system must choose its next step from approved options. If several live workflows run across the business, add logs, alerts, an exception queue, a manual fallback and a stop switch. That is business operations, not just 1 workflow.",
    ],
    keyLine:
      "Known path: workflow. Choice of path: agent. Always-on work: monitored operations.",
  },
  framework: {
    kind: "learning-hub",
    heading: "Choose the workflow job in front of you",
    introduction:
      "Start with the task you need to finish. Open only the guide that matches that job.",
    pathways: [
      {
        signal: "I want every guide request to get the correct file",
        direction:
          "Map the popup, contact, guide tag, email, PDF, later messages and failed-delivery handoff.",
        href: "/guides/follow-up-setup.html",
        actionLabel: "Build the guide journey",
      },
      {
        signal: "I want 1 daily view of messages that need me",
        direction:
          "Sort a narrow set of messages, keep source links, prepare drafts and show failures without sending or deleting anything.",
        href: "/guides/inbox-manager-setup.html",
        actionLabel: "Build the daily brief",
      },
      {
        signal: "I want saved research to become approved content",
        direction:
          "Move 1 source through capture, drafting, fact-checking, approval, publishing and learning before automating it.",
        href: "/guides/research-to-content-workflow.html",
        actionLabel: "Build the content workflow",
      },
      {
        signal: "I do not know whether this task needs a workflow or an agent",
        direction:
          "Check whether every step can be written now or whether the system must choose what to do next.",
        href: "/guides/what-is-agentic.html",
        actionLabel: "Choose workflow or agent",
      },
    ],
    sequenceHeading: "Map and test the workflow in 6 steps",
    steps: [
      {
        level: "Beginner",
        title: "Choose 1 repeated task",
        action:
          "Pick a task you can complete and check by hand. Name its current owner, how often it repeats and why it is worth changing.",
        finishLine:
          "You completed the task manually once and can state the useful result in 1 sentence.",
      },
      {
        level: "Beginner",
        title: "Name the start and finish",
        action:
          "Write the exact event that starts the task, the proof that it finished and the rule that blocks the same event from starting twice.",
        finishLine:
          "A test start creates 1 run, a duplicate creates no new action and the finished result is visible.",
      },
      {
        level: "Beginner",
        title: "Map the inputs, steps and owners",
        action:
          "List every required input and fixed step in order. Give each step to Human, Automation or AI and name 1 person who owns the whole workflow.",
        finishLine:
          "A person can follow the map from trigger to finish without guessing the next step or its owner.",
      },
      {
        level: "Intermediate",
        title: "Set access, rules and handoffs",
        action:
          "Give each step the smallest access it needs. Write what must stay true, what must never happen, which actions need approval and where unusual cases go.",
        finishLine:
          "Every permission, approval and exception has a named reason, owner and response time.",
      },
      {
        level: "Intermediate",
        title: "Test the normal path and 6 failures",
        action:
          "Test a normal run, missing input, wrong input, duplicate trigger, provider failure, bad output and a human-review case. Check the log, alert, retry limit and manual fallback every time.",
        finishLine:
          "The normal run finishes once, and all 6 failures stop safely with a visible owner and next action.",
      },
      {
        level: "Intermediate",
        title: "Run small and decide Keep, Change or Stop",
        action:
          "Use a small, approved set. Record what started, finished, failed or needed human help. Keep only what passes the finish and failure checks.",
        finishLine:
          "The run record supports a named Keep, Change or Stop decision before the workflow handles more work.",
      },
    ],
  },
  example: {
    heading: "Deliver the AI jargon guide without sending the wrong PDF",
    situation:
      "A reader opens the AI jargon guide, uses the website popup and enters an email address. The reader expects the correct PDF immediately and by email.",
    weakApproach:
      "Send every popup submission into a general email flow, guess the file from the page title and mark the request complete even when delivery fails.",
    decision:
      "Use 1 guide name, 1 matching delivery label and 1 approved PDF. Treat a failed email as an exception that needs an owner, not as a completed delivery.",
    action:
      "The request names the AI jargon guide. The workflow checks that its delivery label and approved PDF both match that guide. If either one is wrong or missing, the delivery stops. Later messages can start only after delivery succeeds. A rejected send or bounce writes a failure log, stops later messages, alerts Fatiha and creates a manual resend item with the reader, guide and error. Confirm or build each control in the connected system before launch.",
    result:
      "The reader receives the guide requested. A wrong file cannot be selected from a generic list, and a failed delivery cannot disappear as a false success.",
    lesson:
      "A reliable workflow proves both the result and the failure.",
  },
  practicalAsset: {
    kind: "template",
    heading: "Map the task before you connect a tool",
    introduction:
      "Complete all 15 fields. Then run the processing rules, quality bar and stop rules before the workflow handles real work.",
    instructions:
      "Run the task by hand once. Keep the map narrow. If a stop rule is true, do not automate the task until the problem is fixed or the task moves to the correct system.",
    workedExample: {
      label: "AI jargon guide delivery",
      content:
        "Task: deliver the requested guide. Trigger: 1 popup request for the AI jargon guide. Duplicate rule: 1 delivery run per request ID. Required delivery label: AI jargon guide. Output: immediate and email delivery of the approved 10 AI words PDF. Finish check: delivery succeeds. Failure: a label or file mismatch stops the delivery. A rejected send or bounce stops later messages, logs the error, alerts Fatiha and creates a manual resend item with the reader, guide and error.",
    },
    content: `TASK-TO-WORKFLOW CANVAS

1. TASK AND CURRENT OWNER
Task: [Name the repeated task.]
Current owner: [Name the person or role.]
Why it repeats: [State the reason.]

2. USEFUL RESULT
[What must be true when the task is finished?]

3. TRIGGER AND START-ONCE RULE
Exact start event: [Name the event.]
Duplicate protection: [How is the same start blocked from running twice?]

4. FREQUENCY, VOLUME AND SCOPE
Frequency: [How often?]
Volume: [How many items?]
Outside scope: [What must stay outside this workflow?]

5. REQUIRED INPUTS
[List every file, field, message or event needed before the 1st step.]

6. SOURCE OF TRUTH
[Where does each important fact come from? What source wins when sources disagree?]

7. FIXED STEPS IN ORDER
[Write every step from trigger to finish. If the next step cannot be known before the run, stop and use the workflow-or-agent test.]

8. OWNER FOR EVERY STEP
[Mark each step Human, Automation or AI. Name 1 person who owns the whole workflow.]

9. ACCESS AND PERMISSIONS
[Name the smallest mailbox, folder, record, field or action each step may use.]

10. OUTPUT AND FINISH CHECK
Output format: [What is produced?]
Destination: [Where does it go?]
Visible proof: [How do you know the task finished correctly?]

11. RULES AND HUMAN APPROVAL
[What must stay true? What must never happen? Which actions need approval from which named person?]

12. EXCEPTIONS AND HANDOFF
[List unusual cases, the owner for each and the response time.]

13. FAILURE HANDLING
Error log: [Where is the failure recorded?]
Owner alert: [Who is told and how?]
Retry limit: [How many retries are allowed?]
Duplicate protection: [How does a retry avoid repeating the action?]
Manual fallback: [How will the task finish by hand?]

14. TEST SET
- Normal run
- Missing input
- Wrong input
- Duplicate trigger
- Provider failure
- Bad output
- Human-review case

15. RUN RECORD AND DECISION
Started: [What started?]
Finished: [What finished?]
Failed: [What failed?]
Human help: [What needed a person?]
Decision owner: [Who decides?]
Decision: [Keep, Change or Stop]

PROCESSING RULES
1. Complete the task manually once before automating it.
2. Accept only the named trigger and block duplicate starts before step 1.
3. Check every required input and source before processing.
4. Follow the fixed steps in order. Do not guess a new path.
5. Give each step 1 owner and only the access it needs.
6. Pause before every action that needs human approval.
7. When a step fails, stop the action, write the error, alert the owner and stay inside the retry limit.
8. Use the manual fallback when the workflow cannot finish safely.
9. Save the run record and make a Keep, Change or Stop decision before increasing volume.

STOP RULES
1. There is no clear trigger or finished result.
2. You cannot complete the task manually once.
3. Inputs are missing, unclear or not allowed.
4. Access is broader than the task needs.
5. An action involving a customer, money, private data, publishing, deletion or a lasting record lacks named approval.
6. A duplicate trigger or retry could repeat the action.
7. A failure can remain hidden or has no owner.
8. There is no manual fallback.
9. The next step cannot be written before the run. Evaluate an agent instead.
10. Several always-on workflows need shared monitoring. Move the work to business operations.`,
    qualityBar: [
      "The task passed 1 manual run before automation.",
      "The trigger creates 1 run and duplicate starts create no repeated action.",
      "Every required input and source of truth is named and allowed.",
      "Every fixed step has an owner and can be followed in order.",
      "Each step has only the access it needs.",
      "The output, destination and visible finish check are clear.",
      "Human approvals, exceptions and response times have named owners.",
      "The normal path and all 6 failure cases have passed.",
      "Every failure creates a log, alert, safe stop and manual fallback.",
      "The run record ends with a named Keep, Change or Stop decision.",
    ],
  },
  resultCheck: {
    heading: "Trust the workflow only when the result and failure are visible",
    successSignals: [
      "The task works by hand and has a clear trigger and finished result.",
      "A duplicate start or retry cannot repeat the action.",
      "Required inputs, sources, fixed steps and owners are complete.",
      "Access is limited to the named mailbox, folder, record, field or action.",
      "The normal path finishes once and all 6 failure cases stop safely.",
      "Errors create a visible log, owner alert and manual fallback.",
      "Actions involving customers, money, private data, publishing, deletion or lasting records wait for named approval.",
      "The small run ends with a recorded Keep, Change or Stop decision.",
    ],
    limitations: [
      "A workflow is the wrong design when the next step cannot be known before the run. Test whether the task needs an agent.",
      "1 workflow canvas does not provide shared monitoring for several always-on workflows. Move that work to business operations.",
      "A written rule does not block an action by itself. Confirm the connected system enforces the access, stop, alert and approval controls.",
    ],
  },
  relatedGuideSlugs: [
    "what-is-agentic",
    "get-better-at-ai",
    "check-ai-answers",
  ],
  relatedHeading: "Choose the next workflow to build.",
  ending: {
    kind: "clean",
    statement:
      "Start with 1 task you can run by hand. Map it, break it on purpose and automate it only when both the result and the failure are visible.",
  },
});
