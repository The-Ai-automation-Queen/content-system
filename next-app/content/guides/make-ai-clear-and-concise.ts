import { defineGuideArticle } from "@/content/structured-guide";

export const makeAiClearAndConciseGuide = defineGuideArticle({
  slug: "make-ai-clear-and-concise",
  level: "Beginner",
  hub: "Better prompts and answers",
  outcomes: ["Get better answers"],
  composition: "tutorial",
  seo: {
    title: "Make AI clear and concise | Shift & Lead",
    description:
      "Turn a long or vague AI answer into clear writing that gets to the point, keeps the details that matter and tells the reader what to do next.",
  },
  hero: {
    title: "Make AI clear and concise",
    promise:
      "Turn long AI answers into clear writing with an obvious next step.",
    illustration: {
      src: "/images/guides/make-ai-clear-and-concise.webp",
      alt: "The small blue robot mascot turns a brass bookbinding press that compresses a long folded manuscript into 1 clear reader card while a red thread preserves the essential message",
      focalPoint: "79% 52%",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "make-ai-clear-and-concise",
    guideId: "guide.make-ai-clear-and-concise",
    lumailTag: "guide_clear_concise_revision_worksheet",
    buttonLabel: "Send me the worksheet",
    modalTitle: "Get the clear writing revision worksheet",
    description:
      "Enter your email to get the fillable 3-page worksheet. Download it immediately and use its 8-row edit map to turn a long AI answer into writing a real reader can understand and use.",
    deliverable: {
      name: "Clear writing revision worksheet",
      format: "PDF",
      downloadHref: "/downloads/clear-writing-revision-worksheet.pdf",
      usefulWhen:
        "Use it when an AI answer buries the point, repeats itself or leaves the next action unclear.",
    },
  },
  answer: {
    heading: "Clear writing starts with the point",
    paragraphs: [
      "Decide what the reader must understand, decide or do. Put that point at the top. Use the next sentence for the reason they need most.",
      "Then remove anything that repeats, delays or blurs the point. Keep every fact, limit, warning and permission that could change the decision.",
    ],
    keyLine:
      "The point, the useful reason and the next action should never be hidden.",
  },
  framework: {
    kind: "tutorial",
    heading: "Make the answer clear in 4 steps",
    finishedResult:
      "You will have a shorter, clearer answer that tells the reader what matters and what happens next without losing an important detail.",
    steps: [
      {
        title: "Name the point and the reader",
        instruction:
          "Write who will read the answer, what they need to understand and what they should decide or do next. Then state the main point in a separate sentence.",
        whyItMatters:
          "Writing becomes vague when it tries to serve an unnamed reader or several different jobs at once.",
        completionCheck:
          "The point and the reader's next action each fit in 1 clear sentence.",
      },
      {
        title: "Put the answer at the top",
        instruction:
          "Move the answer, decision or request above the background. If the question can be answered yes or no, start with Yes, No or Not yet. Use the next sentence for the reason the reader needs most.",
        whyItMatters:
          "The reader should not have to cross several paragraphs to find out what the writing is asking or saying.",
        completionCheck:
          "The opening gives the answer and the useful reason before the background.",
      },
      {
        title: "Cut and clarify",
        instruction:
          "Remove any question restatement, empty opening, repeated idea or closing summary that adds no meaning. Replace vague nouns and formal verbs with the specific thing and action. Use the same term for the same thing.",
        whyItMatters:
          "Extra words are only part of the problem. Vague words and changing labels can make a short answer hard to follow.",
        completionCheck:
          "Every sentence adds a new fact, reason, instruction, limit or decision. The writing still uses full, natural sentences and does not sound clipped.",
      },
      {
        title: "Protect the meaning",
        instruction:
          "Put back any fact, limit, uncertainty, permission, risk or tradeoff the reader needs. Name the next action and the person who approves the final use.",
        whyItMatters:
          "A shorter answer fails when it hides the condition that changes the promise, cost, timing or decision.",
        completionCheck:
          "The edit has not changed the promise, hidden a condition or removed information needed for a safe decision.",
      },
    ],
  },
  example: {
    heading: "Tell the team whether a guide is ready to publish",
    situation:
      "A team member asks whether a new Shift & Lead guide can go live now that the page, cover and PDF exist. AI returns a long answer about lead magnets and the importance of testing.",
    weakApproach:
      "Trim the answer at random until it looks short. The result still hides the release decision and can remove a check that must pass.",
    decision:
      "The person preparing the release needs a direct answer and a clear reason. The action is to hold publication until the delivery path passes its checks.",
    action:
      "Fatiha moves the decision to the opening, keeps the 4 missing checks and removes the background that does not change the release. The rewrite says: 'Not yet. Publish after the signup form, download link, emailed worksheet and backup message all pass. The page, cover and PDF alone are not enough. Fatiha approves the final test before release.'",
    result:
      "The team knows the guide is not ready, which checks remain and who approves the release. It can act without reading a lesson about lead magnets.",
    lesson:
      "Concise writing removes the search for the point. It keeps the detail that protects the decision.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Use the point-led revision card",
    introduction:
      "Fill in these 5 fields before you rewrite. They show what the reader needs, what must stay and what can go.",
    instructions:
      "Work from the original answer. Do not use a shorter AI version as your only record of what was removed.",
    workedExample: {
      label: "Shift & Lead guide release",
      content:
        "Reader: person preparing the guide release. Point: the guide is not ready. Next action: hold release until 4 delivery checks pass. Keep: signup form, download link, emailed worksheet, backup message and Fatiha's approval. Cut or move: the general lesson about lead magnets and repeated advice to test.",
    },
    fields: [
      {
        label: "Reader",
        instruction:
          "Name the person who needs to understand or use this answer.",
      },
      {
        label: "Point",
        instruction: "Write what the reader must know in 1 sentence.",
      },
      {
        label: "Next action",
        instruction: "Write what the reader should decide or do.",
      },
      {
        label: "Details that must stay",
        instruction:
          "List the facts, reason, limit, uncertainty, permission, risk or tradeoff that could change the decision.",
      },
      {
        label: "Cut or move",
        instruction:
          "Mark the repeated question, empty setup, repeated idea, vague wording or late answer that slows the reader down.",
      },
    ],
    completionRule:
      "The opening gives the point and useful reason, the next action is clear and no required fact or limit was lost.",
  },
  resultCheck: {
    heading: "Use the revision only when the meaning still holds",
    successSignals: [
      "The reader and next action are named.",
      "The opening gives the point and useful reason.",
      "Each later sentence adds a fact, reason, instruction, limit or decision.",
      "Repeated ideas, empty setup and unnecessary summaries are gone.",
      "Full, natural sentences remain and the edit does not sound clipped.",
      "Specific nouns and direct verbs replace vague wording.",
      "The same term means the same thing throughout.",
      "Facts, uncertainty, limits, permissions and risks that change the decision remain.",
      "Important claims have been checked separately.",
      "The person responsible approves public, customer-facing or lasting copy.",
    ],
    limitations: [
      "Shorter writing is not always clearer writing.",
      "Clear wording does not prove that a claim is true.",
      "A word count cannot tell whether the reader has the facts or warning they need.",
      "A clean edit does not replace permission, expert review or human approval.",
    ],
    stopConditions: [
      "Cutting a sentence changes a promise, scope, price, date, right or approval.",
      "An important claim has not been checked against original information.",
      "Personal, private or confidential information is not approved for the tool or task.",
      "Permission to quote, copy, credit or publish source material is unclear.",
      "Legal, financial, medical, security or other expert meaning could change during the edit.",
      "The shorter version hides a tradeoff or warning the reader needs.",
      "The edit is chasing a word count instead of helping the reader understand or act.",
    ],
  },
  relatedGuideSlugs: [
    "better-prompts-and-answers",
    "what-is-a-prompt",
    "check-ai-answers",
  ],
  relatedHeading: "Choose what the answer needs next.",
  ending: {
    kind: "clean",
    statement:
      "Keep every word the reader needs. Remove every word that makes the point harder to find.",
  },
});
