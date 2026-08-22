import { defineGuideArticle } from "@/content/structured-guide";

export const operationsSystemGuide = defineGuideArticle({
  slug: "24-7-operations-system",
  level: "Expert",
  hub: "Business operations",
  outcomes: ["Run business operations", "Automate a task"],
  composition: "tutorial",
  hero: {
    title: "Run a business around the clock without being on 24/7",
    promise:
      "Keep routine work moving with visible exceptions, human approval and a shutdown route you have tested.",
    illustration: {
      src: "/images/guides/24-7-operations-system.webp",
      alt: "The small blue robot mascot beside a day-and-night operations machine that separates completed work from alerts",
      focalPoint: "100% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "24-7-operations-system",
    guideId: "guide.24-7-operations-system",
    lumailTag: "guide_247_operations_blueprint",
    buttonLabel: "Send me the operations blueprint",
    modalTitle: "Get the 24/7 operations blueprint",
    description:
      "Enter your email to get the operating blueprint with the dashboard, approval queue, exception queue, failure alert and shutdown controls. Download it immediately and map 1 job before adding another workflow.",
    deliverable: {
      name: "24/7 operations blueprint",
      format: "PDF",
      downloadHref: "/downloads/24-7-operations-blueprint.pdf",
      usefulWhen:
        "Use it before you schedule routine work outside your working hours or connect another workflow to live business systems.",
    },
  },
  answer: {
    heading: "24/7 means monitored routine work, not unsupervised autonomy",
    paragraphs: [
      "A safe operations system can notice an approved event, complete a bounded routine job and prepare the next step while you are offline. It does not own the business decision at the end.",
      "You should return to a current dashboard, a short approval queue and visible exceptions. If the system cannot prove what happened, it must stop and hand the work back to a named person.",
    ],
    keyLine:
      "Keep routine work moving. Queue judgment. Stop loudly. Make restart a human decision.",
  },
  framework: {
    kind: "tutorial",
    heading: "Build the monitored operating system in 7 steps",
    finishedResult:
      "1 bounded workflow that can run during approved hours, show current proof on an operations dashboard, pause for human approval, surface exceptions and shut down safely.",
    requirements: [
      "1 routine business job with a documented current process and clear result",
      "A named owner, approver and backup owner for the operating window",
      "Sample normal, missing, duplicate, late, sensitive and failed inputs",
      "A manual fallback that can keep the work moving while automation is off",
    ],
    steps: [
      {
        title: "1. Choose 1 routine job and owner",
        instruction:
          "Choose work with a clear trigger, repeatable path and result you can verify. Name the business result, human owner, backup owner, operating hours, expected volume and maximum acceptable risk. Keep strategy, promises and sensitive judgment out of the job.",
        whyItMatters:
          "Around-the-clock coverage becomes dangerous when a broad system owns several unrelated jobs or nobody owns the result when people return.",
        completionCheck:
          "The job has 1 result, 1 primary owner, 1 backup, a volume limit and a pass rule a person can check from evidence.",
      },
      {
        title: "2. Lock the operating boundary",
        instruction:
          "Write the trigger, approved inputs, source systems, fixed output and destination. List permitted tools and actions. List prohibited actions separately. A different message, publish, purchase, refund, deletion or lasting record change requires explicit approval before it happens.",
        whyItMatters:
          "A workflow that can reach more systems or actions than its job requires has a larger failure area than the business can supervise.",
        completionCheck:
          "A test run starts from the right event, reads only approved inputs, produces the fixed output and cannot take an unlisted action.",
      },
      {
        title: "3. Build the approval queue",
        instruction:
          "Send every protected action to 1 queue before execution. Show the proposed action, source evidence, expected effect, risk, undo plan, approver, approval deadline and current state. Keep the workflow paused until the named person approves or rejects it. Expired approval means Stopped, not assumed approval.",
        whyItMatters:
          "A human review point is useless when the request arrives after the action or lacks the evidence needed to make a decision.",
        completionCheck:
          "The approver can approve or reject from the queue, the action remains blocked beforehand and an expired item becomes a visible stop.",
      },
      {
        title: "4. Build the operations dashboard",
        instruction:
          "Give each workflow 1 row showing workflow name, owner, last start and finish, Completed, Stopped, Failed or Unknown, input count, completed count, failure count, approval count, exception count, oldest approval age, oldest exception age, retries, cost and risk limit status, output link, evidence link, run-log link, last alert test and next review. No recent evidence means Unknown, never Healthy.",
        whyItMatters:
          "A success label without current proof can hide missed work, stale data or a broken connection.",
        completionCheck:
          "A person can see what ran, what finished, what is waiting, what failed and where the proof lives without opening every tool.",
      },
      {
        title: "5. Build the exception queue",
        instruction:
          "Route missing, conflicting, sensitive, late, duplicate, out-of-scope and uncertain items to a separate queue. Record detected time, workflow and run, source item, exception type, impact, safe state, missing decision, owner, deadline, resolution and proof. Do not hide unresolved items inside a total count.",
        whyItMatters:
          "Routine work can continue only when the unusual work has a visible owner and cannot be silently forced through the normal path.",
        completionCheck:
          "Every exception test appears once, remains visible until resolved and shows the next human action and deadline.",
      },
      {
        title: "6. Make failure loud and recovery manual",
        instruction:
          "Set a retry limit for each expected technical failure. When the limit is reached, stop that item or workflow, preserve its safe state and alert the owner through a separate route. Start the written manual fallback. Never turn a provider failure, missing output or broken alert into an empty success report.",
        whyItMatters:
          "Silent failure creates false confidence. Unlimited retry can duplicate work, raise cost or repeat a harmful action.",
        completionCheck:
          "A forced provider failure reaches the retry limit, produces the alert, preserves the source and activates a fallback a person can complete.",
      },
      {
        title: "7. Test shutdown and earn more coverage",
        instruction:
          "Write the shutdown conditions and emergency disable route. On shutdown, disable the trigger, stop new work, preserve logs and queues, alert the owners and use the fallback. Restart only after the cause is named, the fix is approved, normal and failure tests pass and the owner approves. Extend hours or add another workflow only after a clean track record and review.",
        whyItMatters:
          "A kill switch that has never been tested is a hope. More coverage should follow evidence, not enthusiasm.",
        completionCheck:
          "The owner can stop the workflow, see that no new item starts, complete the fallback and restart only after the written checks pass.",
      },
    ],
  },
  example: {
    heading: "The Shift & Lead guide-delivery operation",
    situation:
      "Readers request Shift & Lead guides across different time zones. The requested file, guide request, delivery label, delivery result, replies and follow-up state all need to stay visible while Fatiha is offline.",
    weakApproach:
      "Give 1 broad agent access to the website, email system and inbox, then ask it to handle every request, reply and delivery problem on its own.",
    decision:
      "Use separate bounded workflows for capture, approved guide delivery, follow-up state and the daily inbox brief. Monitor all of them from 1 operations dashboard and keep exceptions and changes with Fatiha.",
    action:
      "The delivery runs only when the submitted guide name, recipient, approved template, downloadable file and delivery label all match. The dashboard records the request, label, delivery result and proof. A missing file, label mismatch, delivery failure, reply, opt-out or complaint enters the exception queue. Follow-up stops on a reply, opt-out or complaint. Fatiha owns the queue, approves any changed message or mapping and controls restart after failure.",
    result:
      "Routine requested guides can be delivered during the approved operating window. Fatiha returns to current proof and a short queue of decisions instead of hidden background activity.",
    lesson:
      "The system provides coverage because each routine job is narrow, monitored and easy to stop. It does not gain authority because nobody is watching the screen.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "10-minute action: map 1 monitored job",
    introduction:
      "Choose 1 routine job that already happens after hours or across time zones. Fill the 8 fields before selecting another tool or adding another workflow.",
    instructions:
      "Use the real process. If you cannot name the owner, evidence, fallback and shutdown route in 10 minutes, keep the job manual until those controls exist.",
    workedExample: {
      label: "Shift & Lead example",
      content:
        "Job: deliver the guide a reader requested. Trigger: approved guide request. Pass: the guide name, file, recipient, template and delivery label match, then delivery proof is recorded. Exceptions: missing file, label mismatch, failure, reply, opt-out or complaint. Owner: Fatiha. Shutdown: disable delivery and follow-up, preserve the queue and use manual delivery after verification.",
    },
    fields: [
      {
        label: "1. Routine job and owner",
        instruction:
          "Name the job, business result, primary owner, backup owner, operating hours, expected volume and maximum risk.",
      },
      {
        label: "2. Trigger, inputs and output",
        instruction:
          "Name the exact start event, approved sources, required fields, fixed output, destination and completion proof.",
      },
      {
        label: "3. Action boundary",
        instruction:
          "List permitted actions, prohibited actions, minimum permissions and every action that requires approval before execution.",
      },
      {
        label: "4. Approval queue",
        instruction:
          "Record the proposed action, source evidence, expected effect, risk, undo plan, approver, deadline, current state and what happens when nobody approves in time.",
      },
      {
        label: "5. Dashboard row",
        instruction:
          "Write the workflow name, owner, run times, status, input, completed, failure, approval and exception counts, separate queue ages, retries, cost and risk limits, output, evidence and run-log links, alert test and next review.",
      },
      {
        label: "6. Exception queue",
        instruction:
          "List exception types, owner, deadline, safe state, required decision, resolution and proof fields.",
      },
      {
        label: "7. Failure and fallback",
        instruction:
          "Set retry limits, the separate alert route, manual fallback, emergency owner and the rule for an unknown state.",
      },
      {
        label: "8. Shutdown and restart",
        instruction:
          "List stop conditions, disable steps, preserved records, recovery tests and the named person who may approve restart.",
      },
    ],
    completionRule:
      "The job is ready only when normal, approval, exception, failure, shutdown and restart tests pass and the owner can verify every result from the dashboard evidence.",
  },
  resultCheck: {
    heading: "The operation is ready when a person can see, stop and recover it",
    successSignals: [
      "Each workflow has 1 routine job, a named owner, a narrow boundary and a measurable finish line.",
      "The dashboard shows fresh evidence for Completed, Stopped, Failed or Unknown and never treats missing evidence as healthy.",
      "Protected actions remain paused in the approval queue until the named person decides.",
      "Exceptions remain visible with an owner, deadline, safe state and next action.",
      "Retry limits, separate alerts and the manual fallback pass forced-failure tests.",
      "The shutdown route stops new work, preserves logs and queues and requires human approval before restart.",
      "Daily review closes urgent approvals and exceptions. Weekly review removes unused access and fixes repeated failure patterns.",
    ],
    limitations: [
      "Monitoring can fail too. Test alerts through a route that does not depend on the workflow being monitored.",
      "Provider availability, rate limits, permission scopes and delivery states can change. Confirm the real state instead of trusting a success message alone.",
      "A dashboard reduces search time. It does not replace the owner's judgment about customers, money, sensitive data or reputation.",
    ],
    stopConditions: [
      "A workflow has no owner, no current evidence or no working manual fallback.",
      "The trigger, source, destination, permission or approved template changes unexpectedly.",
      "An approval or exception passes its deadline without escalation.",
      "The retry, volume, value, cost or risk limit is reached.",
      "The alert route, audit log, shutdown control or fallback fails.",
      "A reply, opt-out, complaint or unknown state does not stop the affected path.",
      "The system takes an unapproved action or hides a partial result as complete.",
    ],
  },
  relatedGuideSlugs: ["what-is-agentic", "manus", "check-ai-answers"],
  relatedHeading: "Build the systems that sit underneath the dashboard.",
  ending: {
    kind: "commercial",
    eyebrow: "Ready to build the monitored version?",
    heading: "Turn the approved blueprint into a controlled operating system",
    body:
      "Complete the 10-minute map and test the approval, exception, failure and shutdown routes first. The Shift & Lead Build Sprint can then build the bounded workflows, dashboard and handoffs around your real business process.",
    action: {
      label: "Build my operations system",
      href: "/work-with-me.html",
    },
  },
});
