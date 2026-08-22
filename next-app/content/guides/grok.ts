import { defineGuideArticle } from "@/content/structured-guide";

export const grokGuide = defineGuideArticle({
  slug: "grok",
  level: "Beginner",
  hub: "AI tools",
  outcomes: ["Choose an AI tool", "Get better answers"],
  composition: "tool-verdict",
  hero: {
    title: "Should you use Grok?",
    promise:
      "Inspect a live public conversation and separate useful signals from claims that still need proof.",
    illustration: {
      src: "/images/guides/grok.webp",
      alt: "The small blue robot mascot weighing fast public signals against a bound evidence ledger",
      focalPoint: "68% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "grok",
    guideId: "guide.grok",
    lumailTag: "guide_tool_grok_signal_check",
    buttonLabel: "Send me the signal check",
    modalTitle: "Get the live signal verification checklist",
    description:
      "Enter your email to get the fillable checklist. Download it immediately and verify a live trend before you repeat it.",
    deliverable: {
      name: "Live signal verification checklist",
      format: "checklist",
      downloadHref: "/downloads/live-signal-verification-checklist.pdf",
      usefulWhen: "Use it before a live post becomes a business decision, claim or publication.",
    },
  },
  answer: {
    heading: "Choose Grok when the public conversation on X is part of the source",
    paragraphs: [
      "Grok is an AI assistant from xAI. It can search the web and public posts on X, which makes it useful for seeing how a fast-moving topic is being discussed now.",
      "That is a listening advantage, not a truth advantage. A live feed mixes first-hand reports, opinion, jokes, promotion, mistakes and deliberate misinformation.",
      "Use Grok to find the claims and voices worth checking. Open the original post, then find stronger evidence before you act or publish.",
    ],
    keyLine:
      "A post can prove that someone said something. It cannot, by itself, prove that what they said is true.",
  },
  framework: {
    kind: "tool-verdict",
    heading: "Grok is a fit for live signal work",
    verdict:
      "Grok is worth testing when X and current public reaction matter to the job. If your work starts with private documents, company email or a fixed source set, another tool may give you a shorter and safer path.",
    bestFor: [
      "Finding the language people use around a fast-moving topic",
      "Collecting first-hand posts, repeated questions and opposing views for review",
      "Spotting an early claim that deserves research outside X",
      "Comparing the public reaction before and after an announcement",
    ],
    poorFitFor: [
      "Treating post volume as proof that a claim is true or widely believed",
      "Publishing a fact from a summary without opening the cited source",
      "Research that must stay inside a private approved source set",
      "A normal writing task where live X context adds no value",
    ],
    useCases: [
      {
        task: "Find the questions behind a new AI announcement",
        whyItWorks:
          "Live X search can surface repeated questions and direct reactions before formal explainers are published.",
        firstMove:
          "Ask for 5 repeated questions, 3 first-hand sources and the exact posts behind each. Do not ask Grok to decide which claim is true.",
      },
      {
        task: "Build a source list for a guide update",
        whyItWorks:
          "Grok can help locate official accounts, named experts and original statements connected to the conversation.",
        firstMove:
          "Open every post. Follow the link to the primary document or official announcement, then use that source in the guide research.",
      },
      {
        task: "Check whether a reaction is broad or only loud",
        whyItWorks:
          "A structured search can expose different communities, time periods and views instead of repeating the most visible posts.",
        firstMove:
          "Ask for supporting, critical and uncertain views across named dates. Record the search limits and never call the result a representative poll.",
      },
    ],
    recommendation:
      "Use Grok as the first listening pass when X matters. Use primary documents, direct evidence and another check before the claim moves into your work.",
  },
  practicalAsset: {
    kind: "checklist",
    heading: "Verify 1 live signal before you use it",
    introduction:
      "Choose 1 claim or trend that could affect a guide, post or decision. Slow the claim down before it travels further.",
    instructions:
      "Save the exact wording and timestamp. Separate what Grok summarized from what the original sources actually show.",
    items: [
      "Open the original post, account and full thread. Do not verify a screenshot with another screenshot.",
      "Label the item as fact, first-hand report, opinion, prediction, joke, promotion or unknown.",
      "Find the earliest available source and check whether later posts changed its meaning.",
      "Find 1 independent primary source outside the repost chain.",
      "Record what would prove the claim false and search for that evidence too.",
      "Write the narrowest statement the evidence supports, or do not use the claim.",
    ],
    completionRule:
      "You can open the original evidence, explain its limits and write a statement that does not claim more than the evidence proves.",
  },
  relatedGuideSlugs: ["which-ai-tool-for-what", "meta-ai", "check-ai-answers"],
  relatedHeading: "Choose what to test next.",
  ending: {
    kind: "clean",
    statement:
      "Use Grok to hear the live conversation. Use evidence to decide what deserves to leave it.",
  },
});
