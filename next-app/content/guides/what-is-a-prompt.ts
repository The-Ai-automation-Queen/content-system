import { defineGuideArticle } from "@/content/structured-guide";

export const whatIsAPromptGuide = defineGuideArticle({
  slug: "what-is-a-prompt",
  level: "Beginner",
  hub: "Better prompts and answers",
  outcomes: ["Understand AI", "Get better answers"],
  composition: "tutorial",
  hero: {
    title: "What a prompt actually is",
    promise:
      "Turn a vague request into a clear brief that gives you an answer you can use and check.",
    illustration: {
      src: "/images/guides/what-is-a-prompt.webp",
      alt: "The small blue robot mascot using a compass and a written brief to set a clear direction",
      focalPoint: "72% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "what-is-a-prompt",
    guideId: "guide.what-is-a-prompt",
    lumailTag: "guide_prompt_brief",
    buttonLabel: "Send me the prompt brief",
    modalTitle: "Get the useful prompt brief",
    description:
      "Enter your email to get the editable 1-page form. Download it immediately and use it to brief ChatGPT, Claude, Gemini or another AI tool.",
    deliverable: {
      name: "The useful prompt brief",
      format: "template",
      downloadHref: "/downloads/useful-prompt-brief.pdf",
      usefulWhen: "Fill it in when an AI answer feels vague, generic or hard to check.",
    },
  },
  answer: {
    heading: "A prompt is the brief you give an AI",
    paragraphs: [
      "A prompt tells the AI what job to do, what information to use and what a useful answer should look like. It can include text, a file, an image or an example.",
      "The prompt does not need to be long. It needs to remove the guesses that would change the result.",
    ],
    keyLine:
      "If a capable stranger could not complete the task from your brief, the AI will have to guess too.",
  },
  framework: {
    kind: "tutorial",
    heading: "Write a useful prompt in 4 steps",
    finishedResult:
      "You will have a prompt that names the job, supplies the facts, sets the limits and makes the answer easy to review.",
    steps: [
      {
        title: "Name the job and situation",
        instruction:
          "Start with a direct verb and the result you need. Add the audience, what happened before and the decision or action the answer must support.",
        whyItMatters:
          "The same email should sound different for a new lead, a current client and a late payer. A broad request makes the AI guess which job and situation you mean.",
        completionCheck:
          "A new person could tell what to produce, who it is for and why it matters.",
      },
      {
        title: "Give the source and an example",
        instruction:
          "Paste or attach the facts, notes, transcript, document or data the answer must use. Add 1 approved example when tone or structure matters. Tell the AI not to invent missing details.",
        whyItMatters:
          "Approved material gives the AI facts to work from. A real example is clearer than labels such as professional, warm or premium.",
        completionCheck:
          "Every important fact has a source and the quality standard can be seen or checked.",
      },
      {
        title: "Set the rules and limits",
        instruction:
          "State the length, tone, required facts, forbidden claims, private information and actions the AI must not take. Tell it to ask when essential information is missing.",
        whyItMatters:
          "Limits prevent an attractive draft from creating a fact, privacy or approval problem.",
        completionCheck:
          "The prompt says what must stay true and what the AI must never invent, expose or decide.",
      },
      {
        title: "Choose the output and review",
        instruction:
          "Ask for the exact shape you need, such as a table, email or checklist. Then ask the AI to flag its assumptions and the parts that need human review.",
        whyItMatters:
          "A clear format makes the result easier to use. This asks the AI to show what it guessed, but you still need to check the result.",
        completionCheck:
          "You can compare the answer with a short checklist instead of judging it by how polished it sounds.",
      },
    ],
  },
  practicalAsset: {
    kind: "template",
    heading: "Use the useful prompt brief",
    introduction:
      "Replace every bracket with information from your real task. Delete a section only when it truly cannot change the result.",
    instructions:
      "Paste the completed brief into your AI tool with the source files. If your brief has blanks, tell the AI to ask you 1 clarifying question at a time before it starts.",
    workedExample: {
      label: "Completed Shift & Lead example",
      content:
        "Job: Write a follow-up for a reader who did not open the 10 AI words guide. Source: the approved guide and original email. Limits: 90 words, no invented results or pressure. Output: 3 clearly different subject lines and 1 email. A person checks the facts, link and promise before scheduling.",
    },
    content: `JOB
[Start with a direct verb. State the finished result.]

AUDIENCE AND SITUATION
[Who is this for? What happened before? What decision or action should this support?]

SOURCE MATERIAL
[Paste or attach the facts, notes, transcript, data or approved copy to use.]
[Use only these sources for factual claims. If a needed fact is missing, flag it.]

EXAMPLE OR QUALITY STANDARD
[Add 1 approved example, or describe what a good result must contain.]

RULES AND LIMITS
[Length, tone, required facts and words to avoid.]
[Do not invent facts, quotes, results, links or customer details.]
[Do not send, publish or change a record. Prepare the work for review.]

OUTPUT FORMAT
[Name the exact sections, order, table columns, file type or number of options.]
[If you are unsure which direction to take, ask for 3 clearly different options.]

REVIEW BEFORE FINAL
Before the final answer:
1. List any missing information or assumptions.
2. Check the result against every rule above.
3. Mark any fact, claim or action that needs human approval.`,
    qualityBar: [
      "The job starts with a direct verb and names the finished result.",
      "The source material contains the facts the answer needs.",
      "The rules are specific enough to check.",
      "The output format matches where the work will be used.",
      "A person still owns facts, permissions and decisions that affect money, access, customers or reputation.",
    ],
  },
  ending: {
    kind: "clean",
    statement: "Use the brief on 1 real task. If the answer is weak, improve the missing source, rule or example before you add more instructions.",
  },
  relatedGuideSlugs: ["chatgpt", "research-to-content-workflow", "what-is-agentic"],
  relatedHeading: "Choose what to learn next.",
});
