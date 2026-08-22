import { defineGuideArticle } from "@/content/structured-guide";

export const checkAiAnswersGuide = defineGuideArticle({
  slug: "check-ai-answers",
  level: "Beginner",
  hub: "Better prompts and answers",
  outcomes: ["Get better answers"],
  composition: "tutorial",
  seo: {
    title: "Check an AI answer before you use it | Shift & Lead",
    description:
      "Check important AI claims against original information, mark what is supported and decide what to keep, rewrite, remove or send to a qualified reviewer.",
  },
  hero: {
    title: "Check an AI answer before you use it",
    promise:
      "Find the claims that matter, check them against the original information and decide what to keep, rewrite, remove or send to a qualified reviewer.",
    illustration: {
      src: "/images/guides/check-ai-answers.webp",
      alt: "The small blue robot mascot checks an ivory card under a brass magnifying glass while a red card waits on a separate tray",
      focalPoint: "82% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "check-ai-answers",
    guideId: "guide.check-ai-answers",
    lumailTag: "guide_check_ai_answers_source_check",
    buttonLabel: "Send me the source-checking worksheet",
    modalTitle: "Get the AI answer source-checking worksheet",
    description:
      "Enter your email to get the fillable 4-page worksheet. Download it immediately and use its 10-row claim log to check important claims before you use, send or publish an AI answer.",
    deliverable: {
      name: "AI answer source-checking worksheet",
      format: "PDF",
      downloadHref: "/downloads/ai-answer-source-checking-worksheet.pdf",
      usefulWhen:
        "Use it when an AI answer contains facts, sources or assumptions that could change a message, action or decision.",
    },
  },
  answer: {
    heading: "Check the claim against the source",
    paragraphs: [
      "A polished AI answer can still get a name, date, number or approval wrong. A claim is a statement that says something is true. Start with the claims that could change what someone does next.",
      "Open the original document, record, message or official page for each claim. Mark what it supports, fix what it does not and let a person approve the final use.",
    ],
    keyLine:
      "Another AI can suggest what to check. It cannot prove that the answer is right.",
  },
  framework: {
    kind: "tutorial",
    heading: "Check the answer in 4 steps",
    finishedResult:
      "You will know which important claims to keep, rewrite, remove or send to a qualified reviewer before the answer is used.",
    steps: [
      {
        title: "Mark the claims that matter",
        instruction:
          "Underline every statement that could change a decision, customer promise, cost, date, number, name, right, access choice or public message. Put each claim in its own row on the worksheet.",
        whyItMatters:
          "Checking the whole answer at once makes important details easy to miss. A list of exact claims gives you something clear to test.",
        completionCheck:
          "Each important claim appears in its own row, using the exact words from the answer.",
      },
      {
        title: "Open the original information",
        instruction:
          "Open the report, contract, transcript, account record, official page or approved internal file behind each claim. Do not stop at the AI summary or its list of links.",
        whyItMatters:
          "A real-looking link can lead to a page that does not support the claim. You need to read the part that the claim depends on.",
        completionCheck:
          "Each claim has a named original source, or it is marked Cannot check.",
      },
      {
        title: "Compare and record the result",
        instruction:
          "Read the exact part that should support the claim. Mark it Supported, Needs context, Not supported or Cannot check. Record what is missing, what the other person could challenge and what would prove the claim wrong. Check that you have permission to use, quote or share the source.",
        whyItMatters:
          "This separates what the source says from what the answer added. It also stops private or protected material from being copied into the wrong place.",
        completionCheck:
          "You can explain the status from the opened source, and any privacy or permission limit is written down.",
      },
      {
        title: "Decide before use",
        instruction:
          "Give every claim 1 action: Keep, Rewrite, Remove or Ask a qualified reviewer. Name the person who will approve the final answer before it is sent, published or used for a decision.",
        whyItMatters:
          "A check is useful only when it changes what happens next. The final choice belongs to the person responsible for the result.",
        completionCheck:
          "No important claim is left as a fact when it is unsupported or cannot be checked.",
      },
    ],
  },
  example: {
    heading: "Check a client call recap before the team acts",
    situation:
      "After a Shift & Lead discovery call, AI writes an internal recap. The recap says the client approved a guide-delivery automation and agreed to a launch date.",
    weakApproach:
      "Ask another AI if the recap is accurate, then accept its confident answer.",
    decision:
      "Use the call transcript and current proposal as the original information. Fatiha owns the final approval.",
    action:
      "Fatiha puts the approval and launch-date claims into the worksheet. The transcript shows interest, so that part is Supported. It does not show approval, so that claim is Not supported. The transcript gives no launch date, so the date is Cannot check. It also says budget and access still need to be confirmed, so the recap Needs context. Fatiha rewrites the recap to say the decision is pending and lists the open questions.",
    result:
      "The team sees what the client discussed and what still needs a decision. It does not start work from an approval or date that never happened.",
    lesson:
      "A confident recap is not a record of the call. Check each important claim against the call before the team acts.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Use the 4-status claim check",
    introduction:
      "Give each important claim 1 status and 1 action. The status says what the original information supports. The action says what you will do next.",
    instructions:
      "Copy the exact claim, name the original source and record where you found the supporting information. Do not use another AI answer as the source.",
    workedExample: {
      label: "Shift & Lead client-call example",
      content:
        "Claim: The client approved the guide-delivery automation. Source checked: call transcript and current proposal. Status: Not supported. Action: Replace it with: 'The client is interested. Approval is pending budget and access questions.'",
    },
    fields: [
      {
        label: "Supported",
        instruction:
          "The original information directly backs the claim. Keep it.",
      },
      {
        label: "Needs context",
        instruction:
          "Part of the claim is supported, but an important limit or condition is missing. Rewrite it.",
      },
      {
        label: "Not supported",
        instruction:
          "The original information does not back the claim. Remove it.",
      },
      {
        label: "Cannot check",
        instruction:
          "No reliable original information is available. Do not use the claim as a fact. Ask a qualified reviewer when the decision cannot wait.",
      },
    ],
    completionRule:
      "Another person can see the claim, original information, status and action without needing a separate explanation.",
  },
  resultCheck: {
    heading: "Use the answer only after every important claim has a decision",
    successSignals: [
      "The answer's real use and the person who will approve it are named.",
      "Every important claim has its own row and an opened source, or it is marked Cannot check.",
      "Each claim has 1 of the 4 statuses and 1 action.",
      "Facts, assumptions and missing information stay separate.",
      "A 2nd AI answer is treated as a lead to investigate, not proof.",
      "No unsupported or unchecked important claim remains as a fact.",
      "Privacy, permission, credit, quotes and reuse have been checked.",
      "The person responsible approves the final answer before use.",
    ],
    limitations: [
      "A confident answer, including 1 labelled high confidence, is not proof.",
      "A working link does not prove that the page supports the claim.",
      "A 2nd AI answer is not an original source or final approval.",
      "This check cannot replace a qualified review when the decision needs expert knowledge.",
    ],
    stopConditions: [
      "The original information cannot be found or opened.",
      "Sources disagree and no person has decided which source wins.",
      "A legal, financial, medical, security or other expert claim cannot be judged by the reviewer.",
      "Personal, private or confidential information is not approved for the tool or task.",
      "Permission to quote, copy, credit or publish the source is unclear.",
      "The answer could affect employment, access, customers, money, rights, reputation or a lasting record without qualified review and approval.",
      "A quote, number, date, name, calculation or link cannot be confirmed.",
      "The check depends only on another AI answer.",
    ],
  },
  relatedGuideSlugs: [
    "better-prompts-and-answers",
    "what-is-a-prompt",
    "research-to-content-workflow",
  ],
  relatedHeading: "Choose what the answer needs next.",
  ending: {
    kind: "clean",
    statement:
      "If an important claim cannot be checked, do not use it as a fact.",
  },
});
