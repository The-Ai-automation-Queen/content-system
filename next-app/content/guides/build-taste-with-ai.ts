import { defineGuideArticle } from "@/content/structured-guide";

export const buildTasteWithAiGuide = defineGuideArticle({
  slug: "build-taste-with-ai",
  level: "Intermediate",
  hub: "Content and creative work",
  outcomes: ["Create content"],
  composition: "tutorial",
  seo: {
    title: "Choose and improve AI creative work | Shift & Lead",
    description:
      "Build better creative judgment by setting a clear standard, comparing AI options, finishing the selected work and saving what you learn.",
  },
  hero: {
    title: "Choose and improve AI creative work",
    promise:
      "Turn vague preferences into a clear standard you can use to choose, improve and approve AI-assisted creative work.",
    illustration: {
      src: "/images/guides/build-taste-with-ai.webp",
      alt: "The small blue robot mascot compares 3 blank ivory design cards at a brass table and frames the selected card before improving it",
      focalPoint: "80% 52%",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "build-taste-with-ai",
    guideId: "guide.build-taste-with-ai",
    lumailTag: "guide_ai_taste_practice_workbook",
    buttonLabel: "Send me the creative review workbook",
    modalTitle: "Get the AI creative review workbook",
    description:
      "Enter your email to get the fillable 3-page workbook. Download it immediately and use its 3-option comparison and 6-change finish log on a real draft or design.",
    deliverable: {
      name: "AI creative review workbook",
      format: "PDF",
      downloadHref: "/downloads/ai-creative-review-workbook.pdf",
      usefulWhen:
        "Use it when you have several AI drafts or designs but cannot explain which option is stronger or how to finish it.",
    },
  },
  answer: {
    heading: "Taste becomes useful when you can explain the choice",
    paragraphs: [
      "AI can give you several polished options. That does not mean any of them solves the right problem. Before you choose, decide what the work must do for its reader.",
      "Then compare the options against the same standard. Choose the strongest direction, fix what it still misses and save the lesson for the next brief.",
    ],
    keyLine:
      "If you can explain the choice, another person can review it, improve it and use the lesson again.",
  },
  framework: {
    kind: "tutorial",
    heading: "Build creative judgment in 5 steps",
    finishedResult:
      "You will have a finished option that the responsible person can approve, a clear reason for choosing it and a practical rule that improves the next brief.",
    steps: [
      {
        title: "Define the job and the standard",
        instruction:
          "Name the reader, the place where the work will appear and the result it must support. Write up to 5 things you can see or test. For a guide cover, that might mean the subject is clear, the action is visible and the title stays readable at card size.",
        whyItMatters:
          "Words such as better, bold or premium mean different things to different people. A visible standard gives the team something real to review.",
        completionCheck:
          "Another reviewer can use the standard without asking what better means.",
      },
      {
        title: "Compare 3 real options",
        instruction:
          "Place exactly 3 genuinely different directions side by side. Keep the source facts, brief and firm rules the same. Look for a different idea or approach, not a small change in colour or decoration.",
        whyItMatters:
          "A weak option can look impressive on its own. A fair comparison shows which direction best serves the same job.",
        completionCheck:
          "Each option makes a meaningful creative choice that the other options do not make.",
      },
      {
        title: "Choose and explain",
        instruction:
          "Write what each option gets right, where it fails and what it gives up. Select the option that best serves the job. Explain the reason without relying on I like it or a total score.",
        whyItMatters:
          "A written reason turns a personal reaction into a decision the team can understand and challenge.",
        completionCheck:
          "Another person can see why the selected option fits and why the other 2 do not.",
      },
      {
        title: "Finish the selected work",
        instruction:
          "Fix what the chosen option still misses. Review the details, tone, what the reader notices and in what order, the final format, less common uses and anything that can be removed. Treat unchecked facts, unclear permission to use material, private information and missing approval as stop signs, not style choices.",
        whyItMatters:
          "The best direction can still fail in the final details. Finishing turns a strong idea into work that is ready for its real setting.",
        completionCheck:
          "Every change has a reason tied to the reader, the job or a firm rule.",
      },
      {
        title: "Save the rule for next time",
        instruction:
          "Turn the most useful final change into 1 short instruction. Add it to the next brief or review checklist. Keep the earlier and approved versions when you have the right to store them.",
        whyItMatters:
          "A saved rule helps the next person avoid the same weak direction before new work is made.",
        completionCheck:
          "The rule is clear enough to use before the next set of options is created.",
      },
    ],
  },
  example: {
    heading: "Choose a cover for a clear-writing guide",
    situation:
      "Shift & Lead needs a cover for Make AI clear and concise. AI prepares 3 directions from the same approved brief. Option A uses sparkles and a smooth gradient. It looks polished but does not show the reader's job. Option B is a large portrait of the blue robot. The mascot is easy to recognise, but nothing is happening. Option C shows the robot using a brass bookbinding press to turn a long manuscript into 1 clear reader card. A red thread keeps the essential message intact.",
    weakApproach:
      "Choose the prettiest image and ask for more polish. That leaves the team with no useful reason for the choice and no lesson for the next cover.",
    decision:
      "Fatiha chooses Option C. The action explains the guide, the vintage press fits the Shift & Lead visual system and the idea still reads at card size.",
    action:
      "She keeps a calm title area on the left, keeps the mascot fully visible on the right, removes stray marks and checks both the desktop and card crops. Facts, image rights and final approval are checked separately.",
    result:
      "The final cover shows the reader's job instead of using a general AI symbol. The team can explain the choice and repeat the useful principle.",
    lesson:
      "Show the reader's job through 1 active visual action. Do not use a mascot portrait when the process is the point.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Compare your 3 options on 1 page",
    introduction:
      "Use this short worksheet to compare 3 options, record the reason for your choice and improve the next brief.",
    instructions:
      "Keep the untouched options. Fill in the worksheet before polishing the selected option.",
    workedExample: {
      label: "Shift & Lead clear-writing guide cover",
      content:
        "Job: show how a long AI answer becomes clear writing on a guide cover. Standards: active mascot, clear metaphor, vintage editorial style, readable card crop and safe title area. Options: sparkle field, mascot portrait and bookbinding press. Choice: bookbinding press because the action explains the guide and fits the visual system. Finish: reserve the left title area, keep the robot visible, remove stray marks and check 2 crops. Saved rule: show the reader's job through 1 active visual action.",
    },
    fields: [
      {
        label: "Job",
        instruction: "Name the reader, channel and result the work must support.",
      },
      {
        label: "Standards",
        instruction: "List up to 5 things the work must visibly do.",
      },
      {
        label: "Options",
        instruction: "Describe exactly 3 genuinely different directions.",
      },
      {
        label: "Choice",
        instruction: "Name the selected option and explain why it fits.",
      },
      {
        label: "Finish",
        instruction: "List what must change before approval.",
      },
      {
        label: "Saved rule",
        instruction: "Write 1 instruction for the next brief.",
      },
    ],
    completionRule:
      "Another reviewer can see the standard, the 3 options, the reason for the choice, the finishing work and the rule for the next brief.",
  },
  resultCheck: {
    heading: "Approve the work only when the choice holds up",
    successSignals: [
      "The job, reader, channel and decision are named.",
      "Up to 5 standards describe something that can be seen or tested.",
      "Exactly 3 meaningful options were compared against the same brief.",
      "The written reason explains what the selected option gains and gives up.",
      "Every finishing change connects to the reader, job or a firm rule.",
      "Important claims have a separate source check.",
      "References guide the quality without being copied.",
      "Exactly 1 useful rule is saved for the next brief.",
      "The person responsible approves the final work.",
    ],
    limitations: [
      "Taste is not a universal score. The same option can suit 1 reader and fail another.",
      "A polished result is not proof that the idea works.",
      "AI can describe differences and suggest weaknesses. The responsible person still decides the purpose, what the work gains and gives up, and whether to approve it.",
      "A reference can show a useful quality. It does not give permission to copy the work.",
    ],
    stopConditions: [
      "A factual claim has not been checked against original information.",
      "The right to use or adapt an image, quote, voice sample, design or reference is unclear.",
      "Personal, private or client material lacks approval.",
      "A legal, financial, medical, security or other expert point cannot be judged by the reviewer.",
      "A score conflicts with a fact, permission to use material, privacy limit or firm brand rule.",
      "The team cannot explain the choice beyond I like it.",
      "The work is being polished before the reader or intended result is clear.",
    ],
  },
  relatedGuideSlugs: [
    "content-and-creative-work",
    "research-to-content-workflow",
    "make-ai-clear-and-concise",
  ],
  relatedHeading: "Choose what the creative work needs next.",
  ending: {
    kind: "clean",
    statement:
      "Make the standard visible, explain the choice and save the lesson for the next brief.",
  },
});
