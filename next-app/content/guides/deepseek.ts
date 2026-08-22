import { defineGuideArticle } from "@/content/structured-guide";

export const deepseekGuide = defineGuideArticle({
  slug: "deepseek",
  level: "Intermediate",
  hub: "AI tools",
  outcomes: ["Choose an AI tool", "Get better answers"],
  composition: "tool-verdict",
  hero: {
    title: "Should you use DeepSeek?",
    promise:
      "Choose between the hosted service, the API and a model you run elsewhere before any business data moves.",
    illustration: {
      src: "/images/guides/deepseek.webp",
      alt: "The small blue robot mascot switching between a hosted service and a locked private model",
      focalPoint: "68% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "deepseek",
    guideId: "guide.deepseek",
    lumailTag: "guide_tool_deepseek_data_check",
    buttonLabel: "Send me the data checklist",
    modalTitle: "Get the DeepSeek data and deployment checklist",
    description:
      "Enter your email to get the fillable checklist. Download it immediately and use it before testing DeepSeek with business information.",
    deliverable: {
      name: "DeepSeek data and deployment checklist",
      format: "checklist",
      downloadHref: "/downloads/deepseek-data-and-deployment-checklist.pdf",
      usefulWhen: "Use it to separate product, model, licence, hosting and data decisions.",
    },
  },
  answer: {
    heading: "Choose DeepSeek only after you decide where and how it will run",
    paragraphs: [
      "DeepSeek builds AI models and offers hosted services. Some DeepSeek model weights are also published for developers to download and run under the licence attached to that release.",
      "Using DeepSeek's website, calling its API and running a model through your own provider are different setups. They can have different terms, data locations, security controls, costs and maintenance owners.",
      "The model name does not answer those business questions. Write the deployment path first, then test the model inside that path.",
    ],
    keyLine:
      "Hosted by DeepSeek is not the same as self-hosted. Open weights are not the same as a finished private system.",
  },
  framework: {
    kind: "tool-verdict",
    heading: "DeepSeek is a deployment decision as much as a tool decision",
    verdict:
      "DeepSeek is worth evaluating when a technical owner needs an alternative model, API or downloadable weights and can review the full deployment. A non-technical user who only needs an everyday assistant should not inherit that complexity without a clear benefit.",
    bestFor: [
      "A controlled comparison of model output on a defined technical task",
      "A developer testing an official API with non-sensitive inputs",
      "A team evaluating published model weights under the exact release licence",
      "A deployment project with named owners for infrastructure, security and monitoring",
    ],
    poorFitFor: [
      "Pasting confidential information into the hosted service without reviewing its current policy",
      "Calling a model private merely because its weights can be downloaded",
      "Self-hosting without the people and infrastructure to secure and maintain it",
      "Choosing from benchmark or price headlines instead of a real task and risk review",
    ],
    useCases: [
      {
        task: "Compare model output on 1 known work task",
        whyItWorks:
          "A fixed brief and scoring rule can reveal whether DeepSeek solves a distinct problem without moving sensitive data.",
        firstMove:
          "Use public or invented inputs. Run the same task in the current tool and record accuracy, correction effort, speed and operating requirements.",
      },
      {
        task: "Evaluate the official API",
        whyItWorks:
          "The API can be tested as a component inside a controlled application rather than a general chat habit.",
        firstMove:
          "Name the data sent, where the call goes, what is logged and who can access it. Stop until every answer has an owner and evidence.",
      },
      {
        task: "Evaluate a published model release",
        whyItWorks:
          "Published weights can support a deployment outside DeepSeek's hosted service when the licence and infrastructure fit.",
        firstMove:
          "Record the exact repository, release, licence, derivative model terms, hosting provider and update plan. Review every dependency, not only the top-level model licence.",
      },
    ],
    recommendation:
      "Use DeepSeek only when its model or deployment option solves a written requirement. Otherwise choose the simpler approved assistant that already passes the work test.",
  },
  practicalAsset: {
    kind: "checklist",
    heading: "Complete the data and deployment check",
    introduction:
      "Fill this in for the exact DeepSeek setup you plan to use. A different website, API host or model release needs a new check.",
    instructions:
      "Do not use sensitive business data in the test until every item has a named owner and supporting link.",
    items: [
      "Name the exact hosted service, API endpoint, third-party host or self-hosted model release.",
      "Link the current terms, privacy policy, model licence and any licence inherited from a base model.",
      "List every input, output, log and backup, where it is processed and how long it is kept.",
      "Name the contract, privacy, security and location requirements the setup must meet.",
      "Name the owner for access, updates, monitoring, incident response and model replacement.",
      "Run a non-sensitive task against the current tool and record quality, correction work, cost and maintenance.",
      "Approve, restrict or reject the exact setup. Do not approve the model name in general.",
    ],
    completionRule:
      "The exact deployment, licence, data path, owner and test result are documented and an authorized person has approved that setup.",
  },
  relatedGuideSlugs: ["which-ai-tool-for-what", "mistral", "what-is-ai"],
  relatedHeading: "Choose what to test next.",
  ending: {
    kind: "clean",
    statement:
      "DeepSeek can give you more deployment choices. Each choice creates a separate responsibility for data, licences, security and maintenance.",
  },
});
