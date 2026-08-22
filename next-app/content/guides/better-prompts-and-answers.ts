import { defineGuideArticle } from "@/content/structured-guide";

export const betterPromptsAndAnswersGuide = defineGuideArticle({
  slug: "better-prompts-and-answers",
  level: "Beginner",
  hub: "Better prompts and answers",
  outcomes: ["Get better answers"],
  composition: "learning-hub",
  hero: {
    title: "Get better AI answers without collecting prompts",
    promise:
      "Turn 1 real task into an answer you can use, improve and verify.",
    illustration: {
      src: "/images/guides/better-prompts-and-answers.webp",
      alt: "The small blue robot mascot building an AI brief and checking the answer against source cards",
      focalPoint: "100% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "better-prompts-and-answers",
    guideId: "hub.better-prompts-and-answers",
    lumailTag: "hub_prompt_builder_scorecard",
    buttonLabel: "Send me the prompt builder",
    modalTitle: "Get the prompt builder and answer-quality scorecard",
    description:
      "Enter your email to get the prompt builder and scorecard. Download it immediately, brief 1 real task and decide whether the answer is ready, needs revision or must stop.",
    deliverable: {
      name: "Prompt builder and answer-quality scorecard",
      format: "PDF",
      downloadHref: "/downloads/prompt-builder-and-answer-quality-scorecard.pdf",
      usefulWhen:
        "Use it when an AI answer sounds polished but you still need to test whether it is useful, supported and safe to use.",
    },
  },
  answer: {
    heading: "A better answer starts with a better job and ends with a real check",
    paragraphs: [
      "Tell AI what result the task needs, add only the context that changes that result and provide the evidence it must use. Then set the limits before it starts.",
      "Do not trust the answer because it sounds polished. Improve the weak part, reopen the sources and check every important claim before you use, send or publish it.",
    ],
    keyLine: "Brief the job. Give it evidence. Check the result.",
  },
  framework: {
    kind: "learning-hub",
    heading: "Choose the problem you need to solve",
    introduction:
      "Open the path that matches your task. You do not need a prompt library or every guide in this hub.",
    pathways: [
      {
        signal: "I am new and my requests are vague",
        direction:
          "Learn how to turn a request into a clear brief with a result you can check.",
        href: "/guides/what-is-a-prompt.html",
        actionLabel: "Build the brief",
      },
      {
        signal: "My answer is too long or hard to follow",
        direction:
          "Move the point to the top, remove repetition and keep the facts, limits and next action the reader needs.",
        href: "/guides/make-ai-clear-and-concise.html",
        actionLabel: "Make it clear",
      },
      {
        signal: "I want to test ChatGPT on real work",
        direction:
          "Run the same draft, file and research tests against a scorecard before choosing it.",
        href: "/guides/chatgpt.html",
        actionLabel: "Run the fit test",
      },
      {
        signal: "I have sources and need publishable content",
        direction:
          "Choose the main point, draft it, check the facts and let a person approve publication.",
        href: "/guides/research-to-content-workflow.html",
        actionLabel: "Build the workflow",
      },
      {
        signal: "I need to check the facts before I use the answer",
        direction:
          "Open the original information, check each important claim and decide what to keep, rewrite, remove or send to a qualified reviewer.",
        href: "/guides/check-ai-answers.html",
        actionLabel: "Check the answer",
      },
    ],
    sequenceHeading: "Build and check the answer in 6 steps",
    steps: [
      {
        level: "Beginner",
        title: "Brief the job",
        action:
          "Name the task, the finished result, the audience and the decision the answer must support.",
        finishLine:
          "A capable person could tell what to produce and why it is needed.",
      },
      {
        level: "Beginner",
        title: "Add useful context",
        action:
          "Include only information that changes the answer. Remove obvious, repeated or conflicting instructions.",
        finishLine: "Every context item has a clear reason to be there.",
      },
      {
        level: "Beginner",
        title: "Provide evidence",
        action:
          "Attach the source, data, example or document you are allowed to use. State which source wins if 2 sources conflict.",
        finishLine:
          "Every important claim can be checked against a named source.",
      },
      {
        level: "Beginner",
        title: "Set rules and limits",
        action:
          "State the required format, length, exclusions, rules for private information, what to do when information is missing and who must approve the result.",
        finishLine:
          "The AI knows what to produce, what it must not invent and when it must stop.",
      },
      {
        level: "Intermediate",
        title: "Improve the weak part",
        action:
          "Score the answer before rewriting it. If the direction is unclear, compare clearly different options. If the same failure repeats, fix the brief, example or source that caused it.",
        finishLine:
          "The revision fixes a named problem instead of replacing the answer at random.",
      },
      {
        level: "Intermediate",
        title: "Verify separately",
        action:
          "Reopen the original sources. Check names, numbers, dates, links, calculations and important claims. AI checking its own answer can point to a problem, but it does not prove the answer is right.",
        finishLine:
          "Unsupported material is removed or marked, and a person approves the result before it is sent, published or used for a decision.",
      },
    ],
  },
  example: {
    heading: "Answer a client question without inventing a service promise",
    situation:
      "A potential client asks whether the Shift & Lead Build Sprint includes strategy, implementation or both.",
    weakApproach:
      "Ask AI to write a persuasive reply from memory. The draft invents a turnaround time and quietly expands the service scope.",
    decision:
      "Use AI to prepare a draft that can use only the named sources. Fatiha owns the service promise and the reply.",
    action:
      "Set the job as a reply under 120 words. Add the client question and relevant conversation as background. Use the current service page and scope template as evidence. Ban new deliverables, deadlines, guarantees and prices. Score the 1st draft, remove the turnaround time that is not backed by a source, reopen both sources and check every service promise. Fatiha approves and sends the final reply.",
    result:
      "The client gets a clear answer tied to the actual offer, with no invented delivery promise or hidden change in scope.",
    lesson:
      "AI can shape the wording. It cannot invent the scope or own the promise made to a client.",
  },
  practicalAsset: {
    kind: "template",
    heading: "Build the brief, then score the answer",
    introduction:
      "Complete all 9 fields before you run the task. Score the answer before you revise or use it.",
    instructions:
      "Use 0 for fails, 1 for partly and 2 for passes. Name the weak score area before changing the brief. An automatic stop overrides the total score.",
    workedExample: {
      label: "Shift & Lead Build Sprint reply",
      content:
        "Job: answer whether the Build Sprint includes strategy, implementation or both. Evidence: current service page and scope template. Rules and limits: under 120 words, no new deliverables, deadlines, guarantees or prices. Human approval: Fatiha checks every promise and sends the reply. 1st draft score: 8. Evidence scored 0 because it invented a turnaround time, so the answer stopped. Revised score: 11 after the promise that was not backed by a source was removed and the sources were checked.",
    },
    content: `PROMPT BUILDER

1. TASK AND FINISHED RESULT
[What must the AI prepare? What must be true when the work is finished?]

2. AUDIENCE AND DECISION SUPPORTED
[Who will use the answer? What decision or action should it support?]

3. CONTEXT THAT CHANGES THE ANSWER
[Add only the background that changes the result.]

4. EVIDENCE YOU CAN USE AND WHICH SOURCE WINS
[Name or attach the sources the answer may use. If sources conflict, state which source wins.]

5. QUALITY EXAMPLE
[Add 1 example you are allowed to use or describe what a strong result must contain.]

6. REQUIRED FORMAT
[State the sections, order, length, table columns or file type.]

7. RULES, LIMITS AND CLAIMS TO AVOID
[State what must stay true and what the AI must not invent, expose, promise or decide.]

8. MISSING-INFORMATION RULE
[Tell the AI to ask, mark the gap or stop when required information is missing.]

9. HUMAN APPROVAL POINT
[Name the person who checks the result and the actions that require approval.]

ANSWER-QUALITY SCORECARD

Score each area 0, 1 or 2.

TASK FIT
0: Misses the job.
1: Partly useful but needs a change.
2: Directly completes the job.

EVIDENCE
0: Important claims are not backed by a source.
1: Some important claims trace to a source.
2: Every important claim traces to a source you are allowed to use.

COMPLETENESS
0: Key information or work is missing.
1: Minor gaps remain.
2: Everything required is present.

RULES AND LIMITS
0: Breaks a stated rule.
1: Needs a small correction.
2: Follows every stated rule.

USABILITY
0: The answer is in the wrong shape or cannot be used.
1: The answer needs a different format.
2: The answer is in the required format and ready for review.

UNCERTAINTY
0: Hides guesses or missing information.
1: Shows some gaps but misses others.
2: Makes assumptions, gaps and uncertain claims clear.

TOTAL DECISION
10-12: USE only after the named human check.
7-9: REVISE the named weak area, then score again.
0-6: STOP and rebuild the brief or source.

AUTOMATIC STOP
- An important claim has no source you are allowed to use.
- Private information is exposed or you were not allowed to use it.
- Sources conflict and the brief does not say which source wins.
- The answer would send, publish, purchase, delete or change a lasting record without human approval.`,
    qualityBar: [
      "All 9 builder fields contain task-specific information.",
      "The finished result and intended audience are clear enough to check.",
      "Every important claim can be traced to a source you are allowed to use.",
      "The answer follows the required format and every stated rule.",
      "Missing information and uncertain claims are marked instead of hidden.",
      "The person responsible for approval is named.",
      "The 0-2 scores explain whether the answer is ready, needs revision or must stop.",
      "An automatic stop is followed even when the total score is high.",
    ],
  },
  resultCheck: {
    heading: "Use the answer only when it survives the check",
    successSignals: [
      "You can name the job and its finished result.",
      "You removed context that does not affect the result.",
      "You attached evidence you are allowed to use and stated which source wins if they disagree.",
      "You set the rules, missing-information response and human approval point.",
      "You can name why the answer failed instead of calling it bad or generic.",
      "You improved the specific weak area and scored the answer again.",
      "You checked important claims outside the original answer.",
      "A named person still owns decisions involving customers, money, access, rights or reputation.",
      "The final score leads to a clear Use, Revise or Stop decision.",
    ],
    limitations: [
      "A longer prompt is not automatically a better brief.",
      "A strong brief cannot supply facts that do not exist in the sources you are allowed to use.",
      "AI checking its own answer is not a separate fact-check.",
      "A high score does not remove the named human approval point.",
    ],
    stopConditions: [
      "The task has no clear finished result.",
      "Important facts cannot be checked against a source you are allowed to use.",
      "The task requires private information you are not allowed to use.",
      "Sources conflict and the brief does not say which source wins.",
      "The answer would act without the required human approval.",
    ],
  },
  relatedGuideSlugs: [
    "what-is-a-prompt",
    "chatgpt",
    "research-to-content-workflow",
  ],
  relatedHeading: "Choose the next useful test.",
  ending: {
    kind: "clean",
    statement:
      "A useful answer earns trust through evidence and review, not polish.",
  },
});
