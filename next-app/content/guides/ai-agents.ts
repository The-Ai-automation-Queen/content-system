import { defineGuideArticle } from "@/content/structured-guide";

export const aiAgentsGuide = defineGuideArticle({
  slug: "ai-agents",
  level: "Beginner",
  hub: "AI agents",
  outcomes: ["Build an agent"],
  composition: "learning-hub",
  hero: {
    title: "Build 1 AI agent you can test, limit and stop",
    promise:
      "Give it 1 job, the smallest access, a clear approval point and failure tests before it touches live work.",
    illustration: {
      src: "/images/guides/ai-agents.webp",
      alt: "The small blue robot mascot controlling a 3-stage machine with 2 red gates and an emergency stop lever",
      focalPoint: "78% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "ai-agents",
    guideId: "hub.ai-agents",
    lumailTag: "hub_agent_role_permission_canvas",
    buttonLabel: "Send me the agent canvas",
    modalTitle: "Get the agent role, permission and test canvas",
    description:
      "Enter your email to get the fillable canvas. Download it immediately and use it to define 1 job, limit access and run failure tests before the agent acts.",
    deliverable: {
      name: "Agent role, permission and test canvas",
      format: "PDF",
      downloadHref: "/downloads/agent-role-permission-and-test-canvas.pdf",
      usefulWhen:
        "Use it before you connect an agent to real business data or let it take actions, remember past work, work with another agent or run on a schedule.",
    },
  },
  answer: {
    heading: "Decide what it can and cannot do before choosing tools",
    paragraphs: [
      "An AI agent works toward 1 goal in several steps. After each step, it checks the result and chooses its next step from a list you approved. It may use named tools, but a person decides its job, access, limits and when it must ask for approval.",
      "If you can write every step before the work starts, use a workflow. If 1 agent with 1 clearly limited job cannot complete a normal task and stop safely when something goes wrong, do not let it use past results, connect more tools or work with other agents.",
    ],
    keyLine:
      "Give it 1 job, access only to what that job needs and a rule in the connected tool that stops it at the limit.",
  },
  framework: {
    kind: "learning-hub",
    heading: "Choose the agent guide that matches the job",
    introduction:
      "Start from the problem in front of you. Open 1 route, finish its check and move forward only when the evidence supports it.",
    pathways: [
      {
        signal: "I do not know whether this task needs a workflow or an agent",
        direction:
          "Check whether every step is known before the run or the system must choose its next step from approved options.",
        href: "/guides/what-is-agentic.html",
        actionLabel: "Choose the right system",
      },
      {
        signal: "I want to build my 1st agent",
        direction:
          "Write its 1 job, result and human owner. List what it may see and do, which actions need your approval, what makes it stop and how you will decide whether to keep using it.",
        href: "/guides/first-ai-employee.html",
        actionLabel: "Define the agent’s job",
      },
      {
        signal: "I want to test a multi-step agent tool on real work",
        direction:
          "Give the tool 1 clear result, limited data, review stops and written steps to undo any change before it can act.",
        href: "/guides/manus.html",
        actionLabel: "Test the tool safely",
      },
      {
        signal: "I already have reliable agents or workflows that run on a schedule",
        direction:
          "Track every run in 1 dashboard. Put risky actions and unusual cases in review lists. Add alerts, a manual backup and a tested off switch.",
        href: "/guides/24-7-operations-system.html",
        actionLabel: "Run scheduled work safely",
      },
    ],
    sequenceHeading: "Earn the next level",
    steps: [
      {
        level: "Beginner",
        title: "Choose agent or workflow",
        action:
          "Write the task and ask whether the next step changes because of what the system finds. If every step is known before the run, use a workflow.",
        finishLine:
          "You can name at least 2 approved paths the system may choose after seeing a result. If you cannot, the task routes to a workflow.",
      },
      {
        level: "Beginner",
        title: "Give the agent 1 job",
        action:
          "Name the role, goal, finished result, proof and human owner. Remove every extra job joined by and.",
        finishLine:
          "A new reviewer can state what the agent must produce, how to check it and who owns the result.",
      },
      {
        level: "Intermediate",
        title: "Choose what it may read and do",
        action:
          "List what it may read, which source to trust when 2 sources disagree, its rules and examples, and every tool and action it may use. Give it access only to those items. Make a person approve before it sends, publishes, spends, deletes or changes a lasting record.",
        finishLine:
          "A test shows the agent can do its job but cannot open unrelated data or act without approval.",
      },
      {
        level: "Intermediate",
        title: "Run the normal and failure tests",
        action:
          "Start with a normal run. Then test missing information, 2 sources that disagree, a request outside the job, hidden instructions, blocked access, a broken tool, a poor result and a repeat start. Finally, try to make it send, publish, spend, delete or change a lasting record without approval.",
        finishLine:
          "Every test ends as Completed, Stopped or Failed. It includes links or record IDs that show what the agent used and produced, a record of its actions, an alert to the owner and the safest next step.",
      },
      {
        level: "Expert",
        title: "Let it use past results or work with a 2nd agent only after it passes",
        action:
          "Save only corrections, decisions and results a person approved. Name who may add, fix or delete these saved records. If you add a 2nd agent, give it a different job and write exactly what agent 1 passes to agent 2, what agent 2 must return and who handles a failure.",
        finishLine:
          "The 1st agent passed every test. Every saved record shows where it came from and can be removed. Every move between agents names the input, output, owner and what happens if it fails.",
      },
      {
        level: "Expert",
        title: "Put scheduled work on a dashboard a person checks",
        action:
          "Show fresh results, alerts and 2 review lists: actions waiting for approval and unusual cases needing a person. Limit retries. Add a manual backup and an off switch. Require a person to approve any restart.",
        finishLine:
          "A forced failure becomes visible, stops new work, alerts the owner and starts the manual backup. Restart remains blocked until a person approves it.",
      },
    ],
  },
  example: {
    heading: "The Shift & Lead fit-brief agent",
    situation:
      "Fatiha has an approved intake form and notes from a discovery call. She needs a clear brief showing what Shift & Lead should help the potential client build first.",
    weakApproach:
      "Give an agent broad inbox, customer record system (CRM) and website access. Let it score the lead, invent the scope and send a promise about price or timing.",
    decision:
      "Give the agent 1 internal job: prepare a short internal brief with a link to every source for Fatiha. It may choose which 1 of the approved routes fits the intake, but it may not change a record or contact the client.",
    action:
      "Start only after the intake is marked ready. Read only the approved intake form, discovery notes, current service page and Build Sprint service rules. Choose 1 of 3 paths: fixed steps, agent needed or more information needed. Write the client’s problem, links that support it, the 1st task to fix, why that task needs fixed steps or an agent, missing information, work Shift & Lead should not promise and the next question to ask. Stop if the service rules conflict, files are missing, the agent finds information from another client, a file or webpage contains a hidden command, access fails or a claim has no approved source. Never set a price or deadline, change the CRM or send a message. Put the result in Fatiha’s review list and label it Completed, Stopped or Failed. Fatiha chooses the offer and sends it.",
    result:
      "Fatiha receives a clear review brief where every claim links to its source. The agent makes no promise and takes no hidden action with the client.",
    lesson:
      "The agent may choose how to prepare the evidence. Fatiha owns the offer, promise and client decision.",
  },
  practicalAsset: {
    kind: "template",
    heading: "Set the limits before you connect the agent",
    introduction:
      "Complete these 8 parts for 1 job. Then run the rules and quality checks before the agent touches live work.",
    instructions:
      "If you cannot explain why the task needs a changing path, use a workflow. Start read-only. Do not connect live actions until every test passes.",
    workedExample: {
      label: "Shift & Lead Build Sprint example",
      content:
        "Job: prepare a short internal brief with a link to every source for Fatiha. The agent reads only an approved intake, discovery notes, the current service page and Build Sprint service rules. It chooses fixed steps, agent needed or more information needed. It writes only to Fatiha's review list, stops on missing or conflicting information and never prices, promises, changes the CRM or contacts the client.",
    },
    content: `AGENT ROLE, PERMISSION AND TEST MAP

1. JOB, RESULT AND OWNER
1 job. A useful result. A clear rule for what counts as correct. A named owner and approver.

2. WHY THIS NEEDS AN AGENT
State what finding changes the next step and list the approved choices. If every step is known, route the task to a workflow.

3. INPUTS AND WHICH SOURCE WINS
Name what starts the job, how a repeat start is blocked, approved inputs, required fields, which source to trust when 2 sources disagree, exclusions and date range.

4. DECISIONS, TOOLS AND ACCESS
List the decisions allowed, named tools, resources and actions, and the smallest read and write access. Add an explicit never list.

5. OUTPUT AND PROOF
Name the exact output and where it goes. Include an approved example, links or record IDs for the sources and result, counts, timestamps and the rule for a correct result. End with 1 status: Completed, Stopped or Failed.

6. APPROVAL, STOP AND FALLBACK
List every action that can send, publish, spend, delete or change a lasting record. Name the approver, the evidence they see, the deadline and where the agent pauses. Stop when information is missing, conflicting, sensitive, uncertain or outside the job. Write who gets the alert, how to turn the agent off, how to undo a change and how a person finishes the work while it is off.

7. LIMITS AND RECORDS
Set limits for items, attempts, time and cost. Name where each action is recorded. Save only corrections and results a person approved. Write who can correct or delete saved records, when they expire and who can remove access.

8. TEST SET AND FIRST-RUN DECISION
Test a normal run and every likely failure. Include missing, invalid or conflicting input, a hidden command, a request outside the job, blocked access, a broken tool, a repeat start and an attempt to take a blocked action. Also test a bad or partial result. Then choose 1 next step: Keep in draft mode, Run 1 supervised test, Change it or Stop.

PROCESSING RULES
1. Run the workflow-or-agent test.
2. Build 1 job and complete it manually with test data.
3. Check inputs, which source wins and access before action.
4. Choose only from approved next steps.
5. Start read-only with the smallest access set inside the connected tool.
6. Keep sending, publishing, spending, deleting or changing a lasting record blocked until the named person approves.
7. Change 1 part per test. Write down how to undo the change before you make it.
8. Judge the result against the clear result rule and links or record IDs that show what the agent used and produced, not the agent summary.
9. On failure stop, log, alert, follow the steps to undo the change and start the manual backup.
10. Let it use saved corrections and results from earlier runs, connect more tools, work with a 2nd agent or run on a schedule only after approved test results.

STOP RULES
1. Stop if the task should be a workflow.
2. Stop if the job, result, clear rule for what counts as correct or owner is vague.
3. Stop if the job has not been completed manually with test data.
4. Stop on missing, conflicting, sensitive or unapproved input.
5. Stop if access is broad or the agent can increase it by itself.
6. Stop if sending, publishing, spending, deleting or changing a lasting record is not blocked by the connected tool.
7. Stop if the result or activity is invisible.
8. Stop when a retry, duplicate, item, time or cost limit is reached.
9. Stop if there is no safe stop, alert, steps to undo a change or manual backup.
10. Stop if the agent can use saved corrections and results from earlier runs, work with a 2nd agent or run on a schedule before the 1st agent passes.`,
    qualityBar: [
      "The task needs the agent to choose a next step after seeing a result. If all steps are known first, use a workflow.",
      "The agent has 1 job, 1 useful result, 1 clear rule for what counts as correct and 1 named human owner.",
      "The approved information, required fields, excluded information and the source to trust when sources disagree are written down.",
      "The agent may choose only from named decisions and approved next steps.",
      "The agent has access only to the named information and actions. Tests prove it cannot reach anything else.",
      "The connected tool blocks sending, publishing, spending, deleting or changing a lasting record until the named person approves.",
      "Every output includes links or record IDs that show what the agent used and produced and ends as Completed, Stopped or Failed.",
      "The agent passes the normal run and every required failure test.",
      "A forced failure creates a record, alerts the owner, undoes any partial change and starts the manual backup.",
      "The first-run decision is Keep in draft mode, Run 1 supervised test, Change it or Stop, and the test results support that choice.",
    ],
  },
  resultCheck: {
    heading: "The agent earns access by passing the tests",
    successSignals: [
      "The task needs a next step that changes because of what the agent finds.",
      "The job, result, owner, approved choices and clear rule for what counts as correct are clear to a new reviewer.",
      "The agent can finish the test job but cannot reach unrelated data or take an unapproved action.",
      "Normal and failure tests end with links or record IDs that show what the agent used and produced, a log and a correct Completed, Stopped or Failed status.",
      "A forced failure stops new work, alerts the owner and starts the manual backup.",
      "Any decision to let the agent use past results, connect more tools, work with another agent or run on a schedule is supported by approved test results.",
    ],
    limitations: [
      "A written rule does not block an action. Use the connected system's real permissions and approval controls.",
      "A clean normal run does not prove the agent can handle missing or conflicting information, or a hidden command that tries to change the task.",
      "An agent may prepare evidence and choose an approved path. A person still owns sending, publishing, spending, deleting or changing a lasting record and every business promise.",
    ],
    stopConditions: [
      "The task is a fixed workflow, or the job, result, clear rule for what counts as correct or owner is vague.",
      "Inputs are missing, conflicting, sensitive or unapproved.",
      "Access is broad, the agent can increase it by itself or it can send, publish, spend, delete or change a lasting record before approval.",
      "The result, activity, links or record IDs that show what the agent used and produced, or status is hidden.",
      "A retry, duplicate, item, time or cost limit is reached.",
      "The stop, alert, steps to undo a change and manual backup do not work.",
      "Past results, another agent or a schedule are proposed before the agent with 1 clearly limited job passes.",
    ],
  },
  relatedGuideSlugs: ["what-is-agentic", "first-ai-employee", "manus"],
  relatedHeading: "Choose the next safe level.",
  ending: {
    kind: "clean",
    statement:
      "Build 1 agent with 1 limited job. Keep its access small, test what happens when things go wrong and give it more access only after its results prove it is ready.",
  },
});
