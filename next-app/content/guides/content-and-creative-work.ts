import { defineGuideArticle } from "@/content/structured-guide";

export const contentAndCreativeWorkGuide = defineGuideArticle({
  slug: "content-and-creative-work",
  level: "Beginner",
  hub: "Content and creative work",
  outcomes: ["Create content"],
  composition: "learning-hub",
  hero: {
    title: "Create useful content without handing AI your voice",
    promise:
      "Turn 1 trusted source into a clear piece, create versions for the right channels and keep the facts, voice and publish decision with you.",
    illustration: {
      src: "/images/guides/content-and-creative-work.webp",
      alt: "The small blue robot mascot guiding a source through notes, a draft, channel cards and a publish check",
      focalPoint: "100% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "content-and-creative-work",
    guideId: "hub.content-and-creative-work",
    lumailTag: "hub_source_to_publish_planner",
    buttonLabel: "Send me the content planner",
    modalTitle: "Get the source-to-publish content planner",
    description:
      "Enter your email to get the planner. Download it immediately and use it to move 1 source you are allowed to use from idea to publish decision.",
    deliverable: {
      name: "Source-to-publish content planner",
      format: "PDF",
      downloadHref: "/downloads/source-to-publish-content-planner.pdf",
      usefulWhen:
        "Use it when you have research, notes, a recording or a draft but need a clear path to useful content in your own voice.",
    },
  },
  answer: {
    heading: "Let AI prepare the content. Keep the meaning and decision with you",
    paragraphs: [
      "AI can prepare notes, drafts and versions for other channels. You own the main point, the right to use the source, the voice and the decision to publish.",
      "Start with 1 trusted source and 1 change you want for the reader. Build the main piece first. Create other versions only after the facts and your point of view are clear.",
    ],
    keyLine:
      "AI prepares the work. You decide what is true, what is yours and what is ready to publish.",
  },
  framework: {
    kind: "learning-hub",
    heading: "Choose the content job in front of you",
    introduction:
      "Open the path that matches what is blocking the work. You do not need every content tool or every guide before you publish something useful.",
    pathways: [
      {
        signal: "I saved research but have published nothing",
        direction:
          "Move 1 source through notes, point of view, draft, fact-check and a clear publish decision.",
        href: "/guides/research-to-content-workflow.html",
        actionLabel: "Build the 1st piece",
      },
      {
        signal: "I published the answer, but search misses it or points to an old or wrong page",
        direction:
          "Give the answer 1 strong source, align the public record and check what current AI search systems actually show.",
        href: "/guides/show-up-in-ai-search.html",
        actionLabel: "Fix the source",
      },
      {
        signal: "I need a tool for text, images, audio or video",
        direction:
          "Choose the tool from the job, source, output and review needs instead of its popularity.",
        href: "/guides/which-ai-tool-for-what.html",
        actionLabel: "Choose the tool",
      },
      {
        signal: "I have several polished options and cannot explain which one is stronger",
        direction:
          "Set a visible standard, compare 3 different approaches, explain the choice and finish the selected work.",
        href: "/guides/build-taste-with-ai.html",
        actionLabel: "Choose and finish",
      },
    ],
    sequenceHeading: "Move 1 source to a publish decision in 6 steps",
    steps: [
      {
        level: "Beginner",
        title: "Choose 1 trusted source and the reader change",
        action:
          "Record the source, date and right to use it. Name the reader and what they should understand, decide or do after the piece.",
        finishLine:
          "The source can be reopened, its use is allowed and the reader change fits in 1 sentence.",
      },
      {
        level: "Beginner",
        title: "Pull only the facts and examples worth keeping",
        action:
          "Extract the facts, examples and quotes that support the reader change. Remove material that is interesting but does not serve the piece.",
        finishLine:
          "Every kept fact or example points to the source, and every extra note is removed from the brief.",
      },
      {
        level: "Beginner",
        title: "Add the human point of view",
        action:
          "Write what your experience adds, challenges, simplifies or changes. State the main point in words you can defend.",
        finishLine:
          "The brief contains 1 clear judgment that is not a summary of the source.",
      },
      {
        level: "Beginner",
        title: "Build the main piece",
        action:
          "Choose the best main format for the reader change. Draft it from the facts you are allowed to use, your point of view, voice examples and 1 clear next action.",
        finishLine:
          "The full draft has a clear point, facts that link back to the source, the intended voice and 1 useful next action.",
      },
      {
        level: "Intermediate",
        title: "Create a version for each channel without adding claims",
        action:
          "Change the hook, length, order and format for each channel. Keep the checked facts and point of view unchanged unless you reopen the source and review the change.",
        finishLine:
          "Each version fits its channel, links to the same checked sources and adds no claim that the sources do not support.",
      },
      {
        level: "Intermediate",
        title: "Check and approve publishing separately",
        action:
          "In a new pass, reopen the sources and check facts, rights, voice, links and the next action. Name the person who approves each version before it goes live.",
        finishLine:
          "The checklist is complete, the approver recorded Publish or Stop and every published version has a final URL.",
      },
    ],
  },
  example: {
    heading: "Turn 1 workshop into 3 useful pieces without inventing proof",
    situation:
      "Shift & Lead has 1 workshop transcript with names removed and approved slides about what managers should automate first.",
    weakApproach:
      "Ask AI to create a guide, LinkedIn post and email in 1 pass. The drafts flatten Fatiha's judgment and add client results that do not exist in the source.",
    decision:
      "Use the transcript and slides as the only factual sources. Fatiha chooses the main point, voice and publish decision.",
    action:
      "Pull the questions, examples and teaching points Fatiha approved that help a manager choose the 1st task to automate. Add Fatiha's judgment: start with repeatable work that has a clear result and a human check. Build the guide as the main piece. Turn its checked point into a LinkedIn post and an email, changing the opening and length for each channel without adding claims. Reopen the transcript and slides, check every fact and link, then let Fatiha approve all 3 pieces.",
    result:
      "The guide teaches the full decision, while the post and email lead readers to it in formats that fit their channels. All 3 keep the same checked evidence and Shift & Lead point of view.",
    lesson:
      "A useful content system repeats the source and review discipline, not the same wording in every format.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Plan the work from source to publish",
    introduction:
      "Use 1 planner for the main piece and every version. Do not publish from a blank source, a missing right or an unnamed approval step.",
    instructions:
      "Complete the fields in order. Keep the source open while you work. If a check fails, mark Stop and record what must change before the piece can move.",
    workedExample: {
      label: "Shift & Lead workshop example",
      content:
        "Source: workshop transcript with names removed plus approved slides. Reader change: managers can choose the 1st task to automate. Point of view: start with repeatable work that has a clear result and a human check. Main piece: guide. Other versions: LinkedIn post and email. Claim to avoid: no invented client result. Approver: Fatiha. What readers tell us next: the question that appears most often after publishing.",
    },
    fields: [
      {
        label: "1. Source, date and rights",
        instruction:
          "Record the title or file, URL or location, published or captured date and proof that you may use or quote it.",
      },
      {
        label: "2. Reader and change",
        instruction:
          "Name the reader and what they should understand, decide or do after the content.",
      },
      {
        label: "3. Facts and examples",
        instruction:
          "List only the facts, examples and quotes that support the reader change. Link each item to its source location.",
      },
      {
        label: "4. Point of view",
        instruction:
          "Write the judgment, lesson or challenge that you add. It must go beyond repeating the source.",
      },
      {
        label: "5. Main piece brief",
        instruction:
          "Set the main format, title or hook, required points, structure, length, next action and claims to avoid.",
      },
      {
        label: "6. Versions for other channels",
        instruction:
          "For each channel, set the reader context, opening, length, format and link. Name what changes and what must stay true.",
      },
      {
        label: "7. Voice and visual references",
        instruction:
          "Add examples you are allowed to use that show the voice, pace, visual standard or editing choice to follow. Do not copy their wording or design.",
      },
      {
        label: "8. Facts, rights and links check",
        instruction:
          "Reopen every source. Check names, numbers, dates, quotes, reuse rights, links, claims and the next action. Record every fix or unresolved item.",
      },
      {
        label: "9. Named approver",
        instruction:
          "Name the person who decides Publish or Stop for the main piece and every version for another channel.",
      },
      {
        label: "10. Final URL and what readers tell you next",
        instruction:
          "Record the final URL for each published piece, 1 useful audience question or response and what it changes next.",
      },
    ],
    completionRule:
      "The planner is complete when the source and rights can be checked, the human point of view is clear, every version passed a separate check, a named person approved publishing, final URLs are recorded and 1 reader response has a clear next use.",
  },
  resultCheck: {
    heading: "Publish only when the content still belongs to you",
    successSignals: [
      "The source, date, rights and source locations can be checked.",
      "The reader and intended change are clear.",
      "Every kept fact and example supports the main point.",
      "The piece contains a human judgment that is not copied from the source.",
      "The main piece is complete before versions for other channels begin.",
      "Every version fits its channel without adding a new claim.",
      "Voice and visual references guide the work without being copied.",
      "Facts, rights, voice, links and the next action passed a separate review.",
      "A named person approved publishing and every live piece has a final URL.",
      "The reader response changes the next brief or is recorded as no clear response yet.",
    ],
    limitations: [
      "AI can copy an error or bias from the source. A clear draft does not prove the source is correct.",
      "More formats do not make the main idea stronger. Build 1 useful main piece before creating other versions.",
      "Audience response can guide the next topic. It does not prove a claim is true.",
      "A voice reference helps with direction. It does not give permission to copy another person's words or design.",
    ],
    stopConditions: [
      "The original source cannot be reopened or the right to use it is unclear.",
      "An important fact, quote, image, example or link cannot be checked.",
      "The piece has no clear reader change or human point of view.",
      "A version for another channel adds a claim that did not pass the source check.",
      "Private information, names or client results appear without approval.",
      "The named approver has not recorded Publish for that version.",
    ],
  },
  relatedGuideSlugs: [
    "research-to-content-workflow",
    "show-up-in-ai-search",
    "which-ai-tool-for-what",
  ],
  relatedHeading: "Choose the next content job.",
  ending: {
    kind: "clean",
    statement:
      "Use AI to prepare more versions. Keep the source, point of view and publish decision human.",
  },
});
