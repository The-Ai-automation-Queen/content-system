import { defineGuideArticle } from "@/content/structured-guide";

export const stackThreeToolAiStackGuide = defineGuideArticle({
  slug: "stack-3-tool-ai-stack",
  level: "Beginner",
  hub: "Business operations",
  outcomes: ["Choose an AI tool", "Run business operations"],
  composition: "decision",
  hero: {
    title: "Build your 3-tool AI stack",
    promise:
      "Give 1 tool the job of preparing work, 1 the job of publishing it and 1 the job of capturing what happens next. Remove the overlap.",
    illustration: {
      src: "/images/guides/stack-3-tool-ai-stack.webp",
      alt: "The small blue robot mascot operating a mechanism that connects a work drawer, megaphone and capture net",
      focalPoint: "86% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "stack-3-tool-ai-stack",
    guideId: "guide.stack-3-tool-ai-stack",
    lumailTag: "guide_3_tool_stack_audit",
    buttonLabel: "Send me the stack audit",
    modalTitle: "Get the 3-tool stack audit",
    description:
      "Enter your email to get the fillable audit. Use it to name each job, expose overlap and decide what to keep, replace or cancel.",
    deliverable: {
      name: "3-tool stack audit",
      format: "worksheet",
      downloadHref: "/downloads/3-tool-stack-audit.pdf",
      usefulWhen: "Use it before you renew, add or replace an AI or automation subscription.",
    },
  },
  answer: {
    heading: "Choose 3 jobs before you choose 3 products",
    paragraphs: [
      "An AI stack is the small set of tools you use together to move work from an idea to a result. It should be easy to explain, pay for and repair.",
      "Start with 3 jobs: prepare the work, publish or deliver it, and capture the response. A product can own more than 1 job when that is simpler. What matters is that every job has 1 clear owner.",
    ],
    keyLine:
      "If you cannot name the job a tool owns and the result it produced in the last 30 days, do not renew it yet.",
  },
  framework: {
    kind: "decision",
    heading: "Give every part of the stack 1 clear job",
    question: "Which product owns each handoff from useful work to a captured response?",
    recommendation:
      "Map the jobs first. Then keep the smallest combination of products that can complete them with the access, cost and checks you approve.",
    options: [
      {
        name: "1. Prepare the work",
        bestWhen:
          "The job starts with source material that must become a draft, analysis, plan, visual or other useful work.",
        tradeoff:
          "A general AI assistant can prepare many types of work, but every result still needs a named quality check and a person who approves it.",
        decision:
          "Choose 1 main assistant for this job. Add a second only when a repeated task has a clear quality gap that the first tool cannot close.",
      },
      {
        name: "2. Capture the response",
        bestWhen:
          "A reader, lead or customer raises a hand and their details, request or next step must not disappear.",
        tradeoff:
          "Two forms or 2 contact databases create duplicates and broken follow-up. Store the response once and make 1 system responsible for what happens next.",
        decision:
          "Set up capture before adding more promotion. Confirm the person receives what was promised and the contact enters the correct sequence.",
      },
      {
        name: "3. Publish or deliver",
        bestWhen:
          "Approved work must reach the right channel, audience or inbox on a reliable schedule.",
        tradeoff:
          "A publishing tool can move content faster, but speed is useless when the link, version or approval is wrong.",
        decision:
          "Give 1 product the delivery job and keep a final approval step for anything public, personal or difficult to reverse.",
      },
    ],
    decisionRule:
      "Build in this order: prepare, capture, publish. The operating flow then runs prepare, publish, capture. Add another product only when 1 of those jobs has a measured gap.",
  },
  example: {
    heading: "The Shift & Lead guide delivery stack",
    situation:
      "An Instagram or Facebook post invites readers to comment a keyword for a guide. The reader needs the correct link, the guide popup must capture the email and the promised file must arrive immediately.",
    weakApproach:
      "Several platforms collect the same contact, another automation copies data between them and nobody can name which system owns delivery or follow-up.",
    decision:
      "Use 3 jobs with 1 owner each and remove any platform that only moves the same contact between systems.",
    action:
      "The chosen AI assistant helps prepare the guide under the editorial review process. Blotato publishes the post and sends the guide link from the keyword-triggered DM on supported Meta channels. Lumail captures the email in the guide popup, delivers the file and applies the tag for the matching sequence. The sequence starts only when that Lumail workflow is active.",
    result:
      "The reader receives 1 clear path from comment to guide, each system has a visible job and there is no duplicate contact database or extra automation handoff to maintain.",
    lesson:
      "A simple stack is not a small logo collection. It is a chain of owned handoffs that you can test from start to finish.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Audit the stack before you buy another tool",
    introduction:
      "Create 1 row for each job: prepare, capture and publish or deliver. In each row, list every product that currently touches that job.",
    instructions:
      "Complete the evidence before the decision. Do not mark a tool as essential because it might be useful later.",
    fields: [
      {
        label: "Job and owner",
        instruction:
          "Name the single job this product owns and the person responsible when it fails.",
      },
      {
        label: "Monthly cost",
        instruction:
          "Record the full monthly cost, including extra seats, usage charges and paid connections.",
      },
      {
        label: "Access",
        instruction:
          "List the accounts, files, contacts and customer information the product can reach.",
      },
      {
        label: "Last useful result",
        instruction:
          "Name the last result it produced, the date and the time or risk it genuinely reduced.",
      },
      {
        label: "Overlap",
        instruction:
          "Name every other product that can already perform the same job and which one is the clearer owner.",
      },
      {
        label: "Decision",
        instruction:
          "Choose keep, replace, cancel or test for 30 days. Add the decision date and the proof required.",
      },
    ],
    completionRule:
      "Every product has 1 named job, 1 owner, a visible cost, a recent result and a keep, replace, cancel or test decision.",
  },
  resultCheck: {
    heading: "The stack is ready when the handoffs are clear",
    successSignals: [
      "Every job has 1 system responsible for it.",
      "A test contact can move from the public link to the correct download and sequence.",
      "The total monthly cost and every product's access are visible.",
      "Removing 1 product does not silently break an unrelated step.",
    ],
    limitations: [
      "Product features, plans and connections change. Confirm the capability in your own account before redesigning the stack.",
      "The 3 jobs do not require exactly 3 paid subscriptions. One product may own more than 1 job when the boundary remains clear.",
    ],
    stopConditions: [
      "Two systems capture the same contact without a written reason.",
      "A tool can access more customer or business information than its job requires.",
      "No person owns failed delivery, an incorrect link or a broken follow-up sequence.",
    ],
  },
  relatedGuideSlugs: ["which-ai-tool-for-what", "follow-up-setup", "research-to-content-workflow"],
  relatedHeading: "Build the next handoff.",
  ending: {
    kind: "commercial",
    eyebrow: "Need the system built with you?",
    heading: "Turn the stack audit into a working process",
    body:
      "The Shift & Lead Build Sprint turns 1 approved workflow into a working system with clear ownership, checks and failure handling.",
    action: {
      label: "See the Build Sprint",
      href: "/work-with-me.html",
    },
  },
});
