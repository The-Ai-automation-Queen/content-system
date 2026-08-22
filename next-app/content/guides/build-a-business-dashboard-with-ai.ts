import { defineGuideArticle } from "@/content/structured-guide";

export const buildABusinessDashboardWithAiGuide = defineGuideArticle({
  slug: "build-a-business-dashboard-with-ai",
  level: "Expert",
  hub: "Business operations",
  outcomes: ["Run business operations"],
  composition: "tutorial",
  seo: {
    title: "Build a business dashboard with AI | Shift & Lead",
    description:
      "Use approved business data to build 1 decision dashboard, check every result against its source and record who approves the final use.",
  },
  hero: {
    title: "Build a business dashboard with AI",
    promise:
      "Turn approved business data into 1 clear dashboard for 1 named decision.",
    illustration: {
      src: "/images/guides/build-a-business-dashboard-with-ai.webp",
      alt: "The small blue robot mascot checks blank ivory data cards through a brass gauge before they reach 1 clear decision panel",
      focalPoint: "82% 52%",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "build-a-business-dashboard-with-ai",
    guideId: "guide.build-a-business-dashboard-with-ai",
    lumailTag: "guide_business_dashboard_workbook",
    buttonLabel: "Send me the dashboard workbook",
    modalTitle: "Get the business dashboard build workbook",
    description:
      "Enter your email to get the editable 4-sheet workbook. Download it immediately and use its decision brief, 12-row data dictionary, 10-test log and sign-off sheet to build 1 dashboard from approved business data.",
    deliverable: {
      name: "Business dashboard build workbook",
      format: "XLSX",
      downloadHref: "/downloads/business-dashboard-build-workbook.xlsx",
      usefulWhen:
        "Use it when you have an approved business export or table and need 1 tested dashboard for a named decision.",
    },
  },
  answer: {
    heading: "Start with the decision, not the chart",
    paragraphs: [
      "A useful dashboard answers 1 business question. Every result should lead back to an approved field, calculation and date period that another person can check.",
      "AI can prepare calculations, charts and possible patterns. The dashboard prepares evidence only. The named owner checks the result and decides what happens next.",
    ],
    keyLine:
      "The dashboard is ready when the decision owner can explain the source, calculation, limit and next action without asking the builder.",
  },
  framework: {
    kind: "tutorial",
    heading: "Build 1 decision dashboard in 6 steps",
    finishedResult:
      "You will have 1 working dashboard, a field-by-field data guide, passed quality and privacy checks, a named decision owner and a written refresh or rebuild rule.",
    requirements: [
      "An approved business export or table and the person who owns it.",
      "An approved AI or dashboard tool, account and access rule.",
      "A person who can check the calculation, data use and final decision.",
    ],
    steps: [
      {
        title: "Decide what the dashboard must help someone do",
        instruction:
          "Write 1 business question, 1 decision it may support, the decision owner and how often that decision happens. Record what the dashboard must never decide or change.",
        whyItMatters:
          "A dashboard without a decision becomes a collection of charts. The question decides what belongs and what can be removed.",
        completionCheck:
          "The owner can complete this sentence: I will use this dashboard to decide whether to ____.",
      },
      {
        title: "Approve the data boundary",
        instruction:
          "Name the source file or table, source owner, date range, approved account and people with access. Remove fields the decision does not need. Record prohibited fields and the rule for sensitive values or very small groups.",
        whyItMatters:
          "Hiding a value on the screen does not remove it from the file. Approve the working copy before it reaches the AI tool.",
        completionCheck:
          "The source owner and privacy or data owner have approved the working copy, tool, account and people with access.",
      },
      {
        title: "Define every field and calculation",
        instruction:
          "For each field, record what it means, its source column, format, allowed values, empty-value rule, date or time zone, calculation, sensitivity and owner. Write the checks that will prove the dashboard result.",
        whyItMatters:
          "A polished chart can still use the wrong column, period, unit or formula. Clear definitions make the result possible to check and rebuild.",
        completionCheck:
          "Another person can calculate 1 dashboard result from the source without guessing what a field means.",
      },
      {
        title: "Build the smallest useful view",
        instruction:
          "Give the approved tool the decision brief, field definitions, working copy, visible fields, prohibited fields, calculations, output format and quality checks. Ask for only the charts, numbers, filters and notes needed for the decision. Keep the source untouched.",
        whyItMatters:
          "More charts create more places for mistakes and distraction. Keep only what helps the owner decide or inspect the evidence.",
        completionCheck:
          "Every dashboard item answers the business question, explains a limit or helps the owner check the evidence.",
      },
      {
        title: "Test the numbers, privacy and use",
        instruction:
          "Compare the dashboard with a separate calculation from the source. Test missing, duplicate, invalid, zero, tied and unusually large values. Check dates, time zones, filters and empty states. Inspect the final file for prohibited data, outside links, connections that send data elsewhere and source records saved inside the file.",
        whyItMatters:
          "A file can open correctly and still show the wrong result or contain data the viewer should not receive.",
        completionCheck:
          "Every required check records the expected result, actual result, evidence and Pass or Fail. Any Fail blocks use.",
      },
      {
        title: "Sign off and set the rebuild rule",
        instruction:
          "Record the file version, source period, data owner, technical reviewer, decision owner and approval date. Write how to refresh the data, what must be retested and which changes need a full rebuild or new approval.",
        whyItMatters:
          "A dashboard can become wrong when the source, fields or business rule changes. The owner needs to know when a refresh is not enough.",
        completionCheck:
          "The decision owner records exactly 1 status: Use, Fix and retest or Do not use.",
      },
    ],
  },
  example: {
    heading: "Decide which Shift & Lead guide needs attention next",
    situation:
      "Shift & Lead has page-level analytics, the guide catalogue and guide-delivery records. Fatiha wants 1 view that helps her decide which live guide needs attention next.",
    weakApproach:
      "Upload full visitor and contact exports, ask AI for a beautiful content dashboard and rank guides by the largest number on the screen. That exposes data the decision does not need and treats popularity as proof of quality.",
    decision:
      "Choose 1 live guide to fix or review next. Fatiha is the decision owner. The dashboard may prepare a priority view. It may not change a page, email a reader or mark a guide complete.",
    action:
      "Use 1 row for each guide. Include the guide page name, live status, last content review date, visits for the stated period, guide requests, successful downloads or deliveries, failed deliveries, last route check and owner. Exclude names, email addresses, IP addresses, message text and individual event records. Mark a missing delivery record Missing, not 0. Mark a broken download or failed delivery Fix 1st. Mark an old content or route check Review. Everything else is No action from this view. AI prepares the calculations and compact view. A technical reviewer checks the totals, status rules, missing records, duplicate records and excluded fields against the source. Fatiha opens the listed evidence and chooses the next guide.",
    result:
      "Shift & Lead has 1 traceable priority view, each status has a reason and Fatiha keeps the final decision.",
    lesson: "Define the decision and the data before designing the dashboard.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Write the dashboard build contract",
    introduction:
      "Complete these 8 parts before giving business data to an AI tool. The contract keeps the decision, data and approval rules attached to the build.",
    instructions:
      "Use an approved working copy and common words. If a field or calculation cannot be explained, stop and ask its owner before building.",
    workedExample: {
      label: "Shift & Lead guide-priority dashboard",
      content:
        "Decision: choose 1 live guide to fix or review next. Owners: source owners, technical reviewer and Fatiha. Source: approved guide-level analytics, catalogue and delivery records. Data boundary: no names, email addresses, IP addresses, message text or individual events. Data dictionary: every field has a meaning, source, period, empty-value rule and owner. View: Fix first, Review and No action from this view. Proof: totals match the source, missing and duplicate records were tested, links were opened and excluded fields are absent. Final decision: Fatiha records Use only after the checks pass.",
    },
    fields: [
      {
        label: "Decision",
        instruction: "Write the question, action and choice the dashboard may support.",
      },
      {
        label: "Owners",
        instruction:
          "Name the source owner, technical reviewer, privacy or data owner and decision owner.",
      },
      {
        label: "Source",
        instruction: "Record the approved file or table, version, period and refresh date.",
      },
      {
        label: "Data boundary",
        instruction:
          "List allowed fields, prohibited fields, the small-group rule and the approved tool and account.",
      },
      {
        label: "Data dictionary",
        instruction:
          "Record the meaning, format, empty-value rule, calculation and sensitivity of every used field.",
      },
      {
        label: "View",
        instruction: "List the required numbers, charts, filters, notes and output format.",
      },
      {
        label: "Proof",
        instruction:
          "Name the source totals, known cases, unusual cases, privacy scan and technical checks that must pass.",
      },
      {
        label: "Final decision",
        instruction: "Record Use, Fix and retest or Do not use, with the owner and date.",
      },
    ],
    completionRule:
      "Another person can rebuild and check the dashboard without guessing the decision, data meaning, privacy boundary or approval owner.",
  },
  resultCheck: {
    heading: "Use only a dashboard you can trace and explain",
    successSignals: [
      "Exactly 1 business decision and 1 decision owner are named.",
      "The dashboard's prohibited actions are recorded.",
      "The source, version, date period, time zone and source owner are recorded.",
      "Only approved fields reach the working copy and AI tool.",
      "Every used field has a clear definition and calculation rule.",
      "The untouched source export remains available.",
      "Every displayed result matches a separate check from the source.",
      "Missing, duplicate, invalid, zero, tied and unusually large cases have been tested.",
      "The final file contains no unapproved customer data, outside link, connection that sends data elsewhere or source record saved inside the file.",
      "The data owner, technical reviewer and decision owner have approved the named version.",
      "Refresh steps, repeat checks and rebuild triggers are written.",
      "The final status is Use.",
    ],
    limitations: [
      "A dashboard can look polished and still use the wrong field, period, filter, unit or formula.",
      "Local and cloud AI tools can handle data differently. Check the exact tool, account and settings before sharing a file.",
      "Hiding a value on screen does not prove it is absent from the output file.",
      "A small group, precise location, rare phrase or ranked result can still expose a person or confidential fact.",
      "A pattern does not prove a cause or the right business action. The named owner makes the decision.",
    ],
    stopConditions: [
      "The dashboard has no named decision or decision owner.",
      "The source cannot be reopened, its owner is unknown or a field or calculation is unclear.",
      "The data contains sensitive information that is not approved for the tool, account, people and purpose.",
      "Access, storage, deletion or output-sharing rules have not been approved.",
      "A small group, precise location or rare text could expose a person or confidential result.",
      "A dashboard result does not match the separate source check, or missing data is shown as 0, Healthy or Complete.",
      "The file connects to an unapproved outside service, includes an unapproved script or formula, or keeps a source record it should not contain.",
      "The dashboard would trigger an automatic customer, money, access, publishing, deletion or lasting action.",
      "A required test fails, an expert issue cannot be judged or an approval is missing.",
    ],
  },
  relatedGuideSlugs: [
    "check-ai-answers",
    "get-better-at-ai",
    "which-ai-tool-for-what",
  ],
  relatedHeading: "Choose what the dashboard needs next.",
  ending: {
    kind: "clean",
    statement:
      "Use the dashboard only when the checks pass and the named owner can explain the evidence. Otherwise choose Fix and retest or Do not use.",
  },
});
