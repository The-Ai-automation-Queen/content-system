import { defineGuideArticle } from "@/content/structured-guide";

export const getBetterAtAiGuide = defineGuideArticle({
  slug: "get-better-at-ai",
  level: "Beginner",
  hub: "AI essentials",
  outcomes: ["Understand AI"],
  composition: "tutorial",
  hero: {
    title: "Get better at AI with 1 real task",
    promise:
      "Use 1 real task to find what works, fix what fails and get a result you can repeat.",
    illustration: {
      src: "/images/guides/get-better-at-ai.webp",
      alt: "The small blue robot adjusts a brass machine beside 4 ivory cards arranged from uneven to straight",
      focalPoint: "82% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "get-better-at-ai",
    guideId: "guide.get-better-at-ai",
    lumailTag: "guide_get_better_at_ai_4_week_tracker",
    buttonLabel: "Send me the 4-week tracker",
    modalTitle: "Get the 4-week AI improvement tracker",
    description:
      "Enter your email to get the fillable 6-page tracker. Download it now and use 20 practice rows to improve 1 real task, save 3 rules you can use again and choose what to do next.",
    deliverable: {
      name: "4-week AI improvement tracker",
      format: "PDF",
      downloadHref: "/downloads/4-week-ai-improvement-tracker.pdf",
      usefulWhen:
        "Use it when you have 1 checked low-risk result and want a steady practice routine without turning the guide into a long course.",
    },
  },
  answer: {
    heading: "1 good result is only the start",
    paragraphs: [
      "You can show improvement when you repeat the task on a new example, check the answer against the original information and explain what changed.",
      "This guide starts after your 1st checked result. Keep the task low-risk. If you cannot tell whether the answer is right, ask the person who normally approves that work to review it. If no such person is available, do the task without AI.",
    ],
    keyLine:
      "More answers do not show that you are improving. A change counts only when you can show why the next result is better.",
  },
  framework: {
    kind: "tutorial",
    heading: "Use the same 5 moves each time",
    finishedResult:
      "You will have 1 saved rule backed by 2 different examples and a clear choice: Repeat, Continue or Keep manual.",
    requirements: [
      "1 low-risk task you already completed and checked",
      "2 new examples of the same kind of work",
      "The original information and a clear list of what the required result must contain",
      "A human reviewer when the result could affect another person",
    ],
    steps: [
      {
        title: "Attempt",
        instruction:
          "Use the same kind of task on 1 new real example. Keep the original information and required result open, but do not open your last finished answer. Save the 1st result before you fix it.",
        whyItMatters:
          "You need to see what you can do again, not what you can copy from the last answer.",
        completionCheck:
          "The new example, original information, required result and untouched 1st answer are saved together.",
      },
      {
        title: "Inspect",
        instruction:
          "Check the answer against the original information and required result. Mark what is correct, missing, not supported or hard to use. Do not let AI give itself the final score.",
        whyItMatters:
          "A polished answer can still miss a fact, a requirement or the point of the task.",
        completionCheck:
          "Every correction points to the original information, the required result or a decision a person must make.",
      },
      {
        title: "Change 1 thing",
        instruction:
          "Change only 1 instruction, piece of information or check. Keep the tool, task and everything else the same for this attempt.",
        whyItMatters:
          "If you change everything at once, you cannot tell what helped or what made the result worse.",
        completionCheck:
          "You can name the 1 change and the exact problem it is meant to fix.",
      },
      {
        title: "Repeat",
        instruction:
          "Use the changed method on a different example of the same kind of work. Check the answer against the same original information and required result.",
        whyItMatters:
          "A fix that works only on the 1st example is not a rule you can trust yet.",
        completionCheck:
          "The change fixes the same kind of problem on a new example without causing a serious new problem.",
      },
      {
        title: "Save the rule",
        instruction:
          "Write 1 short rule only when the comparison shows that it helped. Then choose: Repeat to practise again, Continue to use it in low-risk work with the same checks, or Keep manual when a person should do the task. Write the reason.",
        whyItMatters:
          "A useful rule tells you what to do next time. It is backed by the work, not by a good feeling.",
        completionCheck:
          "The log shows the rule, what you checked, your decision and the next example or reviewer.",
      },
    ],
  },
  example: {
    heading: "How Shift & Lead improves 1 guide-card promise",
    situation:
      "Fatiha has 1 approved card summary for What AI actually is. She wants to write clear promises for the rest of the guide library.",
    weakApproach:
      "Ask AI to write every card, choose the lines that sound impressive and never check whether the guides can deliver those promises.",
    decision:
      "Practise on 1 guide at a time. Check every promise against the guide before it reaches the library.",
    action:
      "Fatiha tests the promise on 2 guides. The comparison below shows the weak 1st result, the change she made and what happened when she used that change on a different guide.",
    result:
      "The 2nd card makes a clear promise that its guide can support.",
    lesson:
      "Keep a rule only when it works on a different guide.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "See the whole method in 1 row",
    introduction:
      "This row shows the full check from the 1st answer to the saved rule.",
    instructions:
      "Attempt → Inspect → Change 1 thing → Repeat → Save the rule",
    workedExample: {
      label: "Shift & Lead guide-card comparison",
      content:
        "Task: write clear guide-card promises. 1st example: What a prompt actually is. 1st result: 'Master prompting and unlock better AI answers.' What Fatiha checked: the published guide. Problem: the guide does not promise mastery. Change: name the action instead. New example: What AI agents actually do. Repeated result: 'See how AI can work through several steps and where human approval belongs.' Rule saved: name the action and promise only what the guide teaches.",
    },
    fields: [
      {
        label: "Your comparison",
        instruction:
          "Write the task, 1st example, 1st result, what you checked, problem, change, new example, repeated result and rule saved.",
      },
    ],
    completionRule:
      "The row is complete when another person can see what you checked and how it led to the saved rule.",
  },
  resultCheck: {
    heading: "Choose what happens after the rule",
    successSignals: [
      "You used the same task on 2 different real examples.",
      "Each important correction points to the original information, the required result or a decision a person must make.",
      "You changed 1 thing at a time and can explain what it fixed.",
      "The saved rule helped on a new example, not only the example that exposed the problem.",
      "A person approved anything that could affect a customer, money, rights, access, reputation or a lasting record.",
      "You chose Repeat, Continue or Keep manual and wrote the reason.",
    ],
    limitations: [
      "The tracker has space for 20 attempts. Completing them does not mean you mastered the task.",
      "This guide helps you improve 1 task. It does not make you good at every kind of AI work.",
      "AI can help you spot possible problems, but do not use its review as proof that the answer is right or as approval to use the result.",
    ],
    stopConditions: [
      "You cannot tell whether the result is correct or useful.",
      "The original information is missing, too weak to check the answer or private without permission.",
      "You changed several things and cannot tell what caused the result.",
      "The task needs legal, financial, medical, security or other expert judgment you do not have.",
      "The result would be sent, published, purchased, deleted or used to change a lasting record without human approval.",
    ],
  },
  relatedGuideSlugs: [
    "better-prompts-and-answers",
    "workflows-and-automation",
    "ai-essentials",
  ],
  relatedHeading: "Choose what your result needs next.",
  ending: {
    kind: "clean",
    statement:
      "Let the evidence choose your next move. Do not continue only because you finished the guide.",
  },
});
