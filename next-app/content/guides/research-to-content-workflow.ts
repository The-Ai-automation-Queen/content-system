import { defineGuideArticle } from "@/content/structured-guide";

export const researchToContentWorkflowGuide = defineGuideArticle({
  slug: "research-to-content-workflow",
  level: "Intermediate",
  hub: "Content and creative work",
  outcomes: ["Create content", "Automate a task"],
  composition: "workflow",
  hero: {
    title: "Turn saved research into content you can actually publish",
    promise:
      "Move 1 useful source through a clear process that protects the evidence, adds your point of view and produces an original piece ready to publish.",
    illustration: {
      src: "/images/guides/research-to-content-workflow.webp",
      alt: "The small blue robot mascot operating a machine that turns research cards into organised content files",
      focalPoint: "86% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "research-to-content-workflow",
    guideId: "guide.research-to-content-workflow",
    lumailTag: "guide_research_content_workflow_map",
    buttonLabel: "Send me the workflow map",
    modalTitle: "Send me the workflow map",
    description:
      "Enter your email to get the 1-page Research-to-Content Workflow Map. Download it immediately and use it with 1 saved source.",
    deliverable: {
      name: "Research-to-Content Workflow Map",
      format: "worksheet",
      downloadHref: "/downloads/research-to-content-workflow-map.pdf",
      usefulWhen:
        "Use it when a saved article, post or video should become an original guide, post, email or script.",
    },
  },
  answer: {
    heading: "Stop saving links. Move 1 source to a publishable decision",
    paragraphs: [
      "Saved research is not content. It becomes content after you trace the source, extract the useful signal, choose an angle, add your judgement, draft from grounded notes, verify every important claim, publish and learn from the response.",
      "AI can prepare notes and a draft. It should not invent your point of view, approve its own evidence or turn an uncertain claim into a fact.",
    ],
    keyLine: "Run 1 source through all 8 stages manually before you automate anything.",
  },
  framework: {
    kind: "workflow",
    heading: "Use the same 8 stages every time",
    outcome:
      "An original piece of content with traceable evidence, a clear Shift & Lead point of view, a publish decision and a response ready to guide the next angle.",
    trigger:
      "You save a source because it may help your audience understand something, make a decision or complete a task.",
    requiredInputs: [
      "The original source, its title, URL and publication or capture date",
      "1 sentence explaining why you saved it",
      "The reader you want to help and what should change for them",
      "The format and publishing destination you are considering",
    ],
    steps: [
      {
        owner: "Human",
        title: "Capture",
        action:
          "Save the source or title, URL, publication or capture date and why it caught your attention. Keep enough information to reopen it later.",
        output: "A traceable source record.",
      },
      {
        owner: "AI",
        title: "Distil",
        action:
          "Prepare a short source brief with the key claim, supporting evidence, why it matters and any uncertainty, promotion, experiment or version risk. Check the brief against the source before using it.",
        output: "An approved source brief, not a summary of everything.",
        approvalRequired: true,
      },
      {
        owner: "Human",
        title: "Find the angle",
        action:
          "Name the intended reader and finish this sentence: after reading this, they should understand, decide or do something differently. Choose the 1 useful point the content will make.",
        output: "A specific reader outcome and content angle.",
      },
      {
        owner: "Human",
        title: "Add your point of view",
        action:
          "Write what your experience adds, challenges, simplifies or changes. If you have nothing to add, keep researching instead of publishing a retelling.",
        output: "A clear point of view that makes the piece yours.",
      },
      {
        owner: "AI",
        title: "Draft",
        action:
          "Give AI the approved source brief, reader outcome, angle, point of view, output format, 3 required points and primary CTA. Tell it to use only the approved source links for factual claims.",
        output: "A grounded draft with a clear job and no unsupported additions.",
      },
      {
        owner: "Human",
        title: "Verify",
        action:
          "Review the draft in a separate pass. Reopen every important source. Check dates, versions, statistics, quotes, current tool claims and rights. Qualify financial, legal and security claims. Label opinions and examples. Remove or escalate anything you cannot trace.",
        output: "An approved draft or an unresolved-claim log with a named human approver.",
        approvalRequired: true,
      },
      {
        owner: "Automation",
        title: "Publish",
        action:
          "Move only the approved version to the chosen channel. Confirm the title, format, CTA, links, source rights and final URL before release.",
        output: "A published piece at a recorded final URL, or a clear do not publish decision.",
        approvalRequired: true,
      },
      {
        owner: "Human",
        title: "Learn",
        action:
          "Record the questions, replies, saves, clicks or objections that reveal what the audience needs next. Use the useful signal to change the next angle, not to rewrite history or chase every number.",
        output: "1 audience signal and 1 change to the next content brief.",
      },
    ],
    finalOutput:
      "A publishable, source-backed piece and a feedback note that improves the next research decision.",
  },
  example: {
    heading: "How Shift & Lead used a creator's 5-agent system",
    situation:
      "Shift & Lead saved a creator's content system with 5 roles: a trend scout, script writer, carousel builder, comment miner and performance analyst. The system showed how research, production and audience response could feed each other.",
    weakApproach:
      "Copy the creator's exact agents, tools and instructions, then present the stack as the only way to create content.",
    decision:
      "Keep the durable loop, remove the tool dependence and build a distinct guide around traceable research, human judgement and a separate verification pass.",
    action:
      "Capture the creator page and date. Distil a source brief: current signals feed ideas, chosen ideas feed drafts, approved work can become another format, audience questions reveal demand and performance data can guide later choices. Choose the angle that a useful content system must connect evidence, judgement, production and response. Add the Shift & Lead point of view: AI prepares work, while a person owns the angle, evidence and publish decision. Draft the 8-stage method, verify it against the saved source and publish only after the claims and rights are approved.",
    result:
      "The finished guide teaches a tool-independent workflow. It credits the source in the research record, adds an original operating method and uses reader response to improve the next angle.",
    lesson:
      "Do not copy someone's content machine. Extract the durable method, add your judgement, preserve the evidence and verify the result.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Run the manual 1-source test",
    introduction:
      "Choose 1 saved source and complete every field before you connect an agent, scraper, scheduler or publishing automation.",
    instructions:
      "Write short answers. Keep the source open. If a field does not apply, mark it not applicable and explain why. Do not leave a risk or approval field blank.",
    workedExample: {
      label: "Shift & Lead example",
      content:
        "Source: a creator's 5-agent content system. Useful signal: research, drafting, repurposing, comments and performance can form a loop. Shift & Lead point of view: the loop needs traceable sources, a human angle and a separate verification pass. Reader outcome: turn 1 saved source into original content without copying the source stack.",
    },
    fields: [
      {
        label: "1. Capture",
        instruction:
          "Record the source or title, URL, published or captured date and why you saved it.",
      },
      {
        label: "2. Distil",
        instruction:
          "Write the key claim and evidence. Mark risk flags for uncertainty, promotion, experiment and version risk.",
      },
      {
        label: "3. Find the angle",
        instruction: "Name the intended reader and what should change for them.",
      },
      {
        label: "4. Add your point of view",
        instruction:
          "Write the personal judgement that adds, challenges, simplifies or changes the source.",
      },
      {
        label: "5. Draft",
        instruction:
          "Set the outcome-first title or hook, output format, primary CTA, 3 required points, approved source links and destination guide or resource.",
      },
      {
        label: "6. Verify",
        instruction:
          "Reopen the original. Check dates or versions, statistics, quotes and current tool claims. Qualify financial, legal or security claims. Label opinions or examples. Record any unresolved claim or escalation and name the human approver.",
      },
      {
        label: "7. Publish",
        instruction:
          "Confirm source rights or reuse, record publish or do not publish and add the final URL.",
      },
      {
        label: "8. Learn",
        instruction: "Record the audience signal and what that signal changes next.",
      },
    ],
    completionRule:
      "The source can be reopened, the point of view is distinct, every important claim passed a separate review, a human owns the publish decision, the final URL is recorded and the next audience signal has somewhere to go.",
  },
  resultCheck: {
    heading: "The workflow is ready to repeat when 1 source passes",
    successSignals: [
      "A reviewer can reopen the original source and trace every important claim.",
      "The draft gives the reader a clear outcome and contains a distinct Shift & Lead judgement.",
      "Verification happened in a separate pass with a named human approver.",
      "The publish decision, final URL, audience signal and next change are recorded.",
    ],
    limitations: [
      "An AI summary can miss context or repeat an error from the source. It does not replace reopening the evidence.",
      "Audience response shows what attracted attention or raised a question. It does not prove that a claim is true.",
    ],
    stopConditions: [
      "The original source or an important claim cannot be traced.",
      "A current tool, financial, legal or security claim has not been checked by the right source or person.",
      "Source rights, the human approver or the publish decision are missing.",
      "Automation is being added before the manual 1-source test produces an approved result.",
    ],
  },
  relatedGuideSlugs: ["what-is-a-prompt", "stack-3-tool-ai-stack", "first-ai-employee"],
  relatedHeading: "Build the next useful skill.",
  ending: {
    kind: "commercial",
    eyebrow: "Ready to turn the manual loop into a system?",
    heading: "Build the workflow after the 1-source test works",
    body:
      "Complete the Workflow Map first. If the manual method produces an approved piece, the Shift & Lead Build Sprint can turn the repeatable steps into a working process with clear ownership, checks and failure handling.",
    action: {
      label: "See the Build Sprint",
      href: "/work-with-me.html",
    },
  },
});
