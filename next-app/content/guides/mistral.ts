import { defineGuideArticle } from "@/content/structured-guide";

export const mistralGuide = defineGuideArticle({
  slug: "mistral",
  level: "Expert",
  hub: "AI tools",
  outcomes: ["Choose an AI tool", "Build an agent"],
  composition: "tool-verdict",
  hero: {
    title: "Should you use Mistral?",
    promise:
      "Start with the deployment, data and operating requirements, then decide whether Mistral is the right way to meet them.",
    illustration: {
      src: "/images/guides/mistral.webp",
      alt: "The small blue robot mascot unlocking and inspecting a privately controlled engine room",
      focalPoint: "68% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "mistral",
    guideId: "guide.mistral",
    lumailTag: "guide_tool_mistral_deployment_brief",
    buttonLabel: "Send me the deployment brief",
    modalTitle: "Get the private AI deployment requirements brief",
    description:
      "Enter your email to get the fillable requirements brief. Download it immediately and define the system before you compare suppliers.",
    deliverable: {
      name: "Private AI deployment requirements brief",
      format: "worksheet",
      downloadHref: "/downloads/private-ai-deployment-requirements.pdf",
      usefulWhen: "Use it before choosing a model, API, hosted assistant or private deployment.",
    },
  },
  answer: {
    heading: "Choose Mistral when control is a written requirement, not a vague preference",
    paragraphs: [
      "Mistral AI is a French AI company with tools for everyday work, developers and organizational administration. Its platform includes a work and coding assistant, APIs, models and controls for building AI systems.",
      "Mistral publishes models with different access and licences. Some can be run through Mistral services, and some releases provide weights that can be deployed elsewhere under the licence for that exact model.",
      "More deployment choice creates more decisions. Data location, identity, integrations, licences, monitoring, support and maintenance must be defined before a model is selected.",
    ],
    keyLine:
      "Private deployment is an architecture and operating model. It is not a privacy label you get by downloading model weights.",
  },
  framework: {
    kind: "tool-verdict",
    heading: "Mistral is a fit when the requirement comes before the chatbot",
    verdict:
      "Mistral is worth evaluating when a business has a real need for deployment control, data location, model access or a European supplier. If a standard approved assistant already meets the task and data requirements, the custom route may add cost without adding value.",
    bestFor: [
      "A documented requirement for where AI processing and data must run",
      "A developer team comparing APIs or release-specific open-weight models",
      "An organization that needs roles, workspaces, identity and security policies around AI use",
      "A workflow that may run inside a private network with named operational owners",
    ],
    poorFitFor: [
      "Choosing a private deployment before the business task is defined",
      "Assuming every Mistral model has the same licence or deployment rights",
      "A small team without owners for infrastructure, access, monitoring and upgrades",
      "Normal writing or research when an approved hosted tool already passes the work test",
    ],
    useCases: [
      {
        task: "Compare a Mistral assistant on multilingual guide work",
        whyItWorks:
          "A known guide task can show whether the current work product meets the required language, tone and source standards.",
        firstMove:
          "Run the same approved brief in every required language. Have a qualified reader score meaning, tone and unsafe omissions before choosing the tool.",
      },
      {
        task: "Evaluate an API for a controlled workflow",
        whyItWorks:
          "Mistral Studio provides models, API access and evaluation tools for a defined application.",
        firstMove:
          "Write the task, input classes, output schema, error path and human approval. Test with non-sensitive data before connecting a company system.",
      },
      {
        task: "Evaluate a private worker or model deployment",
        whyItWorks:
          "Mistral documents workflows whose workers can run in a private network and open models that can be served on controlled infrastructure.",
        firstMove:
          "Name what stays private, what still connects to a managed service, which model licence applies and who operates every component.",
      },
    ],
    recommendation:
      "Shortlist Mistral only after the requirements are approved. Compare the complete deployment, support and maintenance burden with a simpler hosted option.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Write the private AI requirements brief",
    introduction:
      "Define what the business needs before a vendor or model enters the document. Separate mandatory controls from preferences.",
    instructions:
      "Every mandatory requirement needs an owner, evidence and a test. A supplier statement without a verification method is not complete.",
    fields: [
      {
        label: "Business task and result",
        instruction:
          "Name the users, source information, finished output, volume, response time and quality check.",
      },
      {
        label: "Data and location",
        instruction:
          "List data classes, allowed processing locations, retention, training restrictions, encryption and deletion requirements.",
      },
      {
        label: "Deployment and integration",
        instruction:
          "Choose managed service, private cloud, on-premise or hybrid. List identity, network, connector and logging requirements.",
      },
      {
        label: "Model and licence",
        instruction:
          "Record the exact release, licence, commercial rights, modification rights, base-model obligations and replacement plan.",
      },
      {
        label: "People and operations",
        instruction:
          "Name owners for procurement, security, infrastructure, evaluation, monitoring, incidents, upgrades and user support.",
      },
      {
        label: "Decision test",
        instruction:
          "Compare the full Mistral option with 1 simpler hosted option on quality, control, delivery time, total cost and maintenance.",
      },
    ],
    completionRule:
      "The mandatory requirements, evidence, owners and comparison are approved before the model or deployment is purchased.",
  },
  relatedGuideSlugs: ["which-ai-tool-for-what", "deepseek", "what-is-agentic"],
  relatedHeading: "Choose what to test next.",
  ending: {
    kind: "clean",
    statement:
      "Choose Mistral when the complete system meets a requirement the simpler option cannot, and your team can operate what it chooses.",
  },
});
