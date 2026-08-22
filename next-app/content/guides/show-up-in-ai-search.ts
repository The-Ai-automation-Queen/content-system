import { defineGuideArticle } from "@/content/structured-guide";

export const showUpInAiSearchGuide = defineGuideArticle({
  slug: "show-up-in-ai-search",
  level: "Intermediate",
  hub: "Content and creative work",
  outcomes: ["Create content"],
  composition: "tutorial",
  seo: {
    title: "Show up in AI search | Shift & Lead",
    description:
      "Map customer questions to clear public sources, check access and conflicting profiles, then record and correct what current AI search answers show.",
  },
  hero: {
    title: "Show up in AI search",
    promise:
      "Make your business facts easier for people and AI tools to find and verify.",
    illustration: {
      src: "/images/guides/show-up-in-ai-search.webp",
      alt: "The small blue robot mascot connects 3 matching public source tiles to a brass routing board that releases an evidence slip",
      focalPoint: "82% 52%",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "show-up-in-ai-search",
    guideId: "guide.show-up-in-ai-search",
    lumailTag: "guide_ai_search_visibility_workbook",
    buttonLabel: "Send me the workbook",
    modalTitle: "Get the AI search visibility workbook",
    description:
      "Enter your email to get the fillable 3-page workbook. Download it immediately and use its 6-question map, 8-source audit and 12-test log to find the source gap behind a missing or wrong AI answer.",
    deliverable: {
      name: "AI search visibility workbook",
      format: "PDF",
      downloadHref: "/downloads/ai-search-visibility-workbook.pdf",
      usefulWhen:
        "Use it when an AI answer misses your business, states an old or wrong fact or points to the wrong page.",
    },
  },
  answer: {
    heading: "AI search visibility starts at the source",
    paragraphs: [
      "An AI answer may use your website, pages saved by a search engine, a business profile or another public page. If those sources are blocked, vague or in conflict, the answer can miss your business or repeat the wrong fact.",
      "Choose the correct answer first. Put it on 1 strong page you control, make the public record agree and test what current systems show. Fix the source of the error instead of publishing more pages at random.",
    ],
    keyLine:
      "You cannot force an AI system to name your business. You can give it a clearer public record to find and a reader a source they can check.",
  },
  framework: {
    kind: "tutorial",
    heading: "Build a clear source chain in 4 steps",
    finishedResult:
      "You will have approved answers on reachable pages, a public record that agrees and a dated log showing what current AI search systems found, missed or described wrongly.",
    steps: [
      {
        title: "Map the question to the right page",
        instruction:
          "Write 6 questions a real customer asks before choosing, contacting or trusting your business. For each question, write the short answer you can prove, choose the strongest page you control and name the person who approves the answer.",
        whyItMatters:
          "Publishing more pages does not help when the correct answer has no clear home. 1 approved source gives people and search systems a better place to check the fact.",
        completionCheck:
          "Every question has a current answer, 1 owned source page and a named approver.",
      },
      {
        title: "Make the page clear and reachable",
        instruction:
          "Put the useful answer in words a person can read. Give the page a clear title, heading and link from another useful page. Keep its main URL in the sitemap, the file that lists your important pages. Ask your site owner or developer to check that the page opens without a login, points to the current main version and is not marked to stay out of search. When a company offers separate controls, record 3 choices: public search, model training and a user asking an AI tool to open the page. Check current official instructions before changing bot or website security settings.",
        whyItMatters:
          "A bot rule, login or duplicate page can hide the answer you want found. A technical check removes avoidable blocks without pretending that access guarantees a citation.",
        completionCheck:
          "A customer can open the page, find the answer and follow its proof, and the technical owner has recorded the access check.",
      },
      {
        title: "Make the public record agree",
        instruction:
          "Compare the approved facts with the public sources your audience actually uses. Check your About page, official profiles and partner pages. Use genuine reviews, first-hand proof and coverage you earned. Never buy or invent reviews, mentions or coverage. If you run an eligible local business, also check the approved name, location or service area, phone, hours, category, services and website. Follow each platform's current rules.",
        whyItMatters:
          "An old profile or partner page can keep an outdated fact in circulation. Matching the record reduces avoidable confusion, but it does not create a ranking guarantee.",
        completionCheck:
          "Every important source either matches the approved facts or has a named correction and owner.",
      },
      {
        title: "Test the answer and fix the source",
        instruction:
          "Run the 6 questions across at least 2 current AI search systems. Record the system, date, account or location context, answer and cited page. Open every citation. Mark each result Seen accurately, Seen with an error, Not seen or Cannot test. Fix the strongest source of the problem and record a later test date.",
        whyItMatters:
          "A single AI answer is not a rank report. Dated tests show a pattern, keep the evidence honest and tell the team what source to correct next.",
        completionCheck:
          "All 12 tests are recorded, every wrong or missing fact has a source fix and no result is presented as permanent.",
      },
    ],
  },
  example: {
    heading: "Point an old AI explainer link to the current Shift & Lead source",
    situation:
      "Shift & Lead wants a person asking what AI actually is to reach the current What AI actually is guide. An older route still exists, and different pages describe the guide differently.",
    weakApproach:
      "Publish several short pages that repeat the question, add search terms to every heading and hope that more pages create more citations.",
    decision:
      "Keep 1 current guide as the strongest source. The approved answer is: AI finds patterns in information and uses them to produce a result, while a person remains responsible for consequential decisions.",
    action:
      "Fatiha checks that the current guide states the answer near the top, uses the correct main URL, appears in the sitemap and receives a direct link from the guide library. The developer checks access and sends the old route directly to the current page. Fatiha then aligns the guide description on the About page and official profile. The team runs the 6 approved questions across 2 current systems, opens every cited page and records any missing or old result.",
    result:
      "Shift & Lead has 1 current answer, old links lead to it and the team has a dated record of what each system showed.",
    lesson:
      "Fix the strongest source and the route to it before creating another page about the same question.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Map the question, source and fix",
    introduction:
      "Use this 7-field map for 1 customer question. It shows where the correct answer lives, what a current system returned and who owns the next correction.",
    instructions:
      "Use an approved answer and open every page you record. A dated result is evidence of 1 test, not proof of a stable ranking.",
    workedExample: {
      label: "Shift & Lead AI explainer",
      content:
        "Question: What is AI? Correct answer: AI finds patterns in information and uses them to produce a result, while a person remains responsible for consequential decisions. Owned source: /guides/what-is-ai.html. Reach check: public page, main URL, sitemap entry, library link and technical access checked. Outside record: current description on the About page and official profile. Test result: 1 dated result links to an old route and is marked Seen with an error. Fix: developer checks the redirect, Fatiha checks the wording and the team records a later test date.",
    },
    fields: [
      {
        label: "Customer question",
        instruction: "Write the real question a buyer, reader or customer asks.",
      },
      {
        label: "Correct answer",
        instruction: "Write the short answer the business can prove and approve.",
      },
      {
        label: "Owned source",
        instruction: "Name the strongest page controlled by the business.",
      },
      {
        label: "Reach check",
        instruction:
          "Record public access, the main URL, sitemap, link from another page, search rule and current bot access check.",
      },
      {
        label: "Outside record",
        instruction:
          "Name the legitimate profile, partner page or publication that carries the same fact.",
      },
      {
        label: "Test result",
        instruction:
          "Record the system, date, context, answer status and cited URL.",
      },
      {
        label: "Fix and owner",
        instruction: "Name the source to change, responsible person and later test date.",
      },
    ],
    completionRule:
      "Another person can see the question, approved answer, strongest source, access check, outside record, dated result and named fix without a separate explanation.",
  },
  resultCheck: {
    heading: "Finish with a source you can defend",
    successSignals: [
      "Exactly 6 real customer questions are recorded.",
      "Every question has an answer the business can prove, 1 strongest owned page and a named approver.",
      "A customer can open each source page and find the useful answer in visible words.",
      "The main URL, sitemap, internal link and search rule have been checked.",
      "Search discovery, model training and a user-requested page visit are treated as separate choices when the vendor separates them.",
      "Extra page code that describes the business, when used, matches what a person can read on the page.",
      "Important public profiles match the approved facts or have a named correction.",
      "Exactly 12 dated tests record the system, context, answer, cited URL and accuracy.",
      "Every cited page was opened before the answer was marked accurate.",
      "Every wrong or missing fact has a source fix, owner and later test date.",
      "The business owner approves public facts and a qualified site owner approves technical changes.",
    ],
    limitations: [
      "Letting a bot read the page, having the page saved by a search engine, a sitemap, extra page code, a public profile or outside coverage does not guarantee a ranking, recommendation or citation.",
      "AI answers can change by system, date, location, account, history and run.",
      "A manual test is a dated sample, not complete visibility measurement.",
      "A cited page can still fail to support the answer.",
      "Search systems can use public sources the business does not own or know about.",
      "A source correction may take time to appear, and no fixed delay can be promised.",
    ],
    stopConditions: [
      "The proposed source contains private, paid, personal, client or confidential information.",
      "The team is using a public file called robots.txt, which gives bots instructions, as the only protection for private material.",
      "The current official bot, website security, search or profile rule cannot be confirmed.",
      "A technical change could weaken security, expose an admin page or block a required search bot.",
      "The business fact, offer, location, testimonial, review or public claim is not approved.",
      "An old page and current page conflict and no owner has decided which version wins.",
      "A public profile is ineligible, unclaimed or managed without the business owner's permission.",
      "The plan includes fake reviews, hidden paid mentions, copied competitor wording or misleading extra page code.",
      "A vendor promises guaranteed placement, citation share or ranking.",
      "The result depends on 1 answer, 1 account or a test that was not dated.",
      "The cited page was not opened and checked.",
    ],
  },
  relatedGuideSlugs: [
    "check-ai-answers",
    "build-taste-with-ai",
    "make-ai-clear-and-concise",
  ],
  relatedHeading: "Choose what the source or answer needs next.",
  ending: {
    kind: "clean",
    statement:
      "Fix the strongest source, record what changed and treat every AI result as a dated observation.",
  },
});
