import { defineGuideArticle } from "@/content/structured-guide";

export const firstAiEmployeeGuide = defineGuideArticle({
  slug: "first-ai-employee",
  level: "Intermediate",
  hub: "AI agents",
  outcomes: ["Build an agent", "Automate a task"],
  composition: "tutorial",
  hero: {
    title: "Build your 1st AI teammate",
    promise:
      "Give 1 AI teammate a clear job, limited access and a human stopping point.",
    illustration: {
      src: "/images/guides/first-ai-employee.webp",
      alt: "The small blue robot mascot operating a role-design machine that produces approved task cards",
      focalPoint: "95% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "first-ai-employee",
    guideId: "guide.first-ai-employee",
    lumailTag: "guide_ai_teammate_job_description",
    buttonLabel: "Send me the job description",
    modalTitle: "Get the AI teammate job description",
    description:
      "Enter your email to get the fillable job description, permission map, stop rules and 30-day review. Download it immediately and define the job before choosing a tool.",
    deliverable: {
      name: "AI teammate job description",
      format: "PDF",
      downloadHref: "/downloads/ai-teammate-job-description.pdf",
      usefulWhen:
        "Use it before you connect a tool, grant access, schedule a run or expand an existing AI system.",
    },
  },
  answer: {
    heading: "Give the system 1 job before you give it tools",
    paragraphs: [
      "An AI teammate is not a person or an employee. It is a bounded AI system set up to complete 1 repeatable job and report the result to a named human owner.",
      "Use a fixed workflow when the steps are already known. Use an agent only when the next step must change based on what the system finds. Either way, write the job, access, approval and stop rules first.",
    ],
    keyLine:
      "Never expand access to fix a bad instruction. Fix the instruction, example, rule or test.",
  },
  framework: {
    kind: "tutorial",
    heading: "Write the job in 10 decisions",
    finishedResult:
      "A tested job description for 1 AI system, with a trigger, approved inputs, exact output, minimum access, human approval, stop rules, fallback, proof and a 30-day review.",
    requirements: [
      "1 repeatable task you already understand from start to finish",
      "A named human owner who can review the result and handle exceptions",
      "Sample inputs, an approved example output and a low-risk test environment",
      "A list of every tool, account, file and action the system may need",
    ],
    steps: [
      {
        title: "1. Choose 1 job and business result",
        instruction:
          "Name 1 repeatable job in a sentence, then name the business result it must produce. Choose work with a clear beginning, a clear finish and a result you can check. If the steps are fixed, build a workflow. Use an agent only when the next step depends on what it finds.",
        whyItMatters:
          "A vague role such as help with operations gives the system no finish line and gives you no fair way to judge it.",
        completionCheck:
          "The job names 1 result, 1 owner and 1 pass rule. It does not contain another job joined by and.",
      },
      {
        title: "2. Define the trigger and approved inputs",
        instruction:
          "Write exactly what starts the job, such as a weekday time, a new form entry or a file added to an approved folder. List every input, its location, required fields, allowed date range and source of truth. Add a duplicate-prevention key, maximum frequency, maximum attempts, time limit and cost limit.",
        whyItMatters:
          "A system cannot work reliably when it starts at the wrong time or reads incomplete, old or unapproved information.",
        completionCheck:
          "A test run starts from the named event, reads only the named inputs and stops at every frequency, attempt, time or cost limit without creating a duplicate result.",
      },
      {
        title: "3. Specify the output and destination",
        instruction:
          "Define the exact output format, required sections, order, length, source links and quality bar. Name the single place where the finished result must appear. Give the system 1 approved example to match.",
        whyItMatters:
          "Create a report is not a finish line. A fixed format makes missing work and weak results visible.",
        completionCheck:
          "A person can compare the result with the example, find every required field and open it in the named destination.",
      },
      {
        title: "4. List allowed and prohibited actions",
        instruction:
          "Name every tool and action the job requires. Anything not listed is prohibited. Require explicit human approval immediately before any send, publish, purchase, deletion or change to a lasting record.",
        whyItMatters:
          "A broad goal can lead an agent to choose an action you never intended. The action boundary must be written before the first run.",
        completionCheck:
          "The allowed list is complete, the prohibited list is explicit and no consequential action can happen without approval from the named owner.",
      },
      {
        title: "5. Grant minimum access",
        instruction:
          "Start read-only wherever possible. Grant access only to the named account, folder, database fields and date range. Use a test account or copied data before live systems. Never expand access to fix a bad instruction.",
        whyItMatters:
          "A written rule can be ignored by a faulty system. A missing permission blocks the action completely and keeps the damage small.",
        completionCheck:
          "The system can read the approved test inputs and cannot reach unrelated data, send, publish, purchase, delete or change a record.",
      },
      {
        title: "6. Name the owner and approval gate",
        instruction:
          "Name the person who owns the result, reviews exceptions and can stop the system. Put the approval request immediately before the protected action. Show the proposed action, source evidence, expected effect and undo plan in that request.",
        whyItMatters:
          "Human in the loop means little if nobody is named or the approval arrives after the action has already happened.",
        completionCheck:
          "The correct owner receives a complete approval request and the system stays paused until that person approves or rejects it.",
      },
      {
        title: "7. Stop on missing or unclear information",
        instruction:
          "Tell the system to stop when a required field is missing, 2 sources conflict, an input is sensitive, the request falls outside the job or confidence is low. It must state what is missing and ask the owner. It must never guess to keep the run moving.",
        whyItMatters:
          "A plausible guess can travel through several steps and look complete even when the starting information was wrong.",
        completionCheck:
          "Each ambiguity test produces a visible stop with the source, the unresolved question and the named owner who must decide.",
      },
      {
        title: "8. Define the failure alert and manual fallback",
        instruction:
          "List failures such as no input, bad permission, tool timeout, blocked destination, cost limit or alert failure. Name who receives the alert, where it goes and what manual process keeps the job moving while the system is off.",
        whyItMatters:
          "Silence is not success. A failed system must not hide missing work behind an empty report or a confident completion message.",
        completionCheck:
          "A forced failure creates the alert, leaves the original data unchanged and gives the owner a usable manual fallback.",
      },
      {
        title: "9. Require proof and a fixed status report",
        instruction:
          "Require completion evidence such as source links, record IDs, counts, timestamps, output links and test results. End every run with Completed, Stopped or Failed, then list work done, proof, unresolved items and the action the owner needs to take.",
        whyItMatters:
          "A polished summary is not proof. The owner needs evidence to verify the work without repeating the whole task.",
        completionCheck:
          "The status matches the evidence, every output links back to its source and partial work is reported as partial.",
      },
      {
        title: "10. Review the system after 30 days",
        instruction:
          "After 30 days, compare runs completed, time saved, errors, human corrections, stops, failures and access used. Keep, narrow, change or stop the system. Expand scope or permissions only for a proven need, never as a repair for weak instructions.",
        whyItMatters:
          "A system can complete its job and still create too much review, miss important exceptions or hold access it no longer needs.",
        completionCheck:
          "The owner records a keep, narrow, change or stop decision and removes every permission the job did not use.",
      },
    ],
  },
  example: {
    heading: "The Shift & Lead failed guide-delivery monitor",
    situation:
      "A reader requests a guide, but the delivery fails. Fatiha needs a reliable review queue that shows who was affected, which guide failed and what should happen next without letting software contact the reader or alter the CRM.",
    weakApproach:
      "Let the system retry every failure, edit contact records and email readers until the delivery appears successful.",
    decision:
      "Assign 1 bounded job: prepare failed guide deliveries for Fatiha's review. Give the system read access to guide-delivery records and write access only to Fatiha's review list.",
    action:
      "When a delivery status changes to failed, or the daily review starts, the system checks the guide name, reader email, timestamp, last attempt and error. It rejects duplicate events, groups failures by reason and recommends a safe next step. An unknown guide, missing email, stale status, provider outage or permission error becomes a visible exception. The system never sends the guide, changes the CRM, suppresses a reader or retries indefinitely.",
    result:
      "Fatiha receives a review queue with the affected reader, guide, failure reason, source record and recommended next step. She decides whether to resend, contact the reader, correct the mapping or stop.",
    lesson:
      "The system prepares the decision and evidence. Fatiha owns the action that affects the reader.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Write the AI teammate job description",
    introduction:
      "Complete every field before connecting a live account. If a field is unclear, the system is not ready to run.",
    instructions:
      "Use 1 job only. Test it with copied or low-risk data, then run it beside the current process before scheduling it.",
    workedExample: {
      label: "Shift & Lead example",
      content:
        "Job: prepare failed guide deliveries for Fatiha's review. Trigger: failed delivery status or daily review. Inputs: guide name, reader email, status, timestamp, last attempt and error. Access: read delivery records and write only to Fatiha's review list. Output: affected reader, guide, failure reason, safe next step and source record. Never send, change the CRM, suppress a reader or retry indefinitely. Stop on unknown guides, missing emails, duplicates, stale statuses, provider outages or permission errors. Fatiha decides whether to resend, contact the reader, correct the mapping or stop.",
    },
    fields: [
      {
        label: "Job and business result",
        instruction:
          "Write 1 repeatable job, the result it must produce, the named owner and the pass rule.",
      },
      {
        label: "System type",
        instruction:
          "Choose workflow when the steps are fixed. Choose agent only when the next step depends on what the system finds.",
      },
      {
        label: "Trigger",
        instruction:
          "Name the event, schedule and time zone that start the job, plus the duplicate-prevention key, maximum frequency, attempts, time and cost.",
      },
      {
        label: "Approved inputs",
        instruction:
          "List the source of truth, locations, required fields, date range, excluded data and the rule for missing or conflicting information.",
      },
      {
        label: "Exact output and destination",
        instruction:
          "Write the format, required sections, source evidence, quality bar, approved example and single delivery location.",
      },
      {
        label: "Allowed tools and actions",
        instruction:
          "List every tool, account and action the job needs. Anything not listed stays off-limits.",
      },
      {
        label: "Prohibited actions",
        instruction:
          "Write what the system may never do. Require explicit approval before any send, publish, purchase, deletion or lasting record change.",
      },
      {
        label: "Minimum access",
        instruction:
          "Record the smallest account, folder, fields and time range required, plus the test proving read-only access where possible.",
      },
      {
        label: "Human owner and approval gate",
        instruction:
          "Name the owner, protected actions, approval location, evidence shown and the rule that keeps the system paused.",
      },
      {
        label: "Stop and escalation rules",
        instruction:
          "List missing, conflicting, sensitive, uncertain and out-of-scope conditions. Name who receives the question and what context they get.",
      },
      {
        label: "Failure alert and manual fallback",
        instruction:
          "List technical failures, the alert owner and route, emergency disable method and the manual process used while the system is off.",
      },
      {
        label: "Completion evidence and status report",
        instruction:
          "List required source links, IDs, counts, timestamps and tests. Use Completed, Stopped or Failed, then work done, proof, unresolved items and owner action.",
      },
      {
        label: "30-day review",
        instruction:
          "Record runs, time saved, errors, corrections, stops, failures and access used, then choose keep, narrow, change or stop.",
      },
    ],
    completionRule:
      "The job is ready only when every field is specific, the system passes normal, ambiguity and failure tests, access stays minimal and the named owner can verify, stop and recover the work.",
  },
  resultCheck: {
    heading: "The AI teammate is ready when the job can be trusted",
    successSignals: [
      "Every run starts from the correct trigger and reads only approved inputs.",
      "Duplicate prevention and the frequency, attempt, time and cost limits stop excess work.",
      "The output matches the fixed format, reaches the named destination and includes completion evidence.",
      "The system stops on missing, conflicting, sensitive, uncertain or out-of-scope information.",
      "No send, publish, purchase, deletion or lasting record change happens without explicit approval.",
      "A forced failure creates the right alert and the manual fallback works.",
      "The status report says Completed, Stopped or Failed and does not hide partial work.",
      "The 30-day review supports a written keep, narrow, change or stop decision.",
    ],
    limitations: [
      "AI can misread context, follow a weak example or produce a confident answer from incomplete information.",
      "Connector labels and permission scopes vary by tool. Confirm what the real connection can read and change.",
      "A successful test does not transfer accountability. The named human owner still owns the result and protected actions.",
    ],
    stopConditions: [
      "The job, business result or pass rule is vague.",
      "The system can reach data, accounts or actions that the job does not require.",
      "A weak output is being repaired by adding access instead of improving the specification.",
      "Missing, conflicting, sensitive or uncertain information does not produce a stop.",
      "A consequential action can happen before explicit approval.",
      "The failure alert, emergency disable method or manual fallback does not work.",
      "Completion is reported without source evidence.",
    ],
  },
  relatedGuideSlugs: ["what-is-agentic", "manus", "check-ai-answers"],
  relatedHeading: "Choose what to build next.",
  ending: {
    kind: "commercial",
    eyebrow: "Ready to build the tested version?",
    heading: "Turn the approved job description into a working system",
    body:
      "Complete the worksheet and pass the normal, ambiguity and failure tests first. The Shift & Lead Build Sprint can then build the bounded workflow or agent with minimum access, visible stops and human approval.",
    action: {
      label: "Build my AI teammate",
      href: "/work-with-me.html",
    },
  },
});
