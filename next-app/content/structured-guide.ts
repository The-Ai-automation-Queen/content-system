import type { GuideHub, GuideLevel, GuideOutcome } from "@/content/guides";

export const GUIDE_BRAND_SIGNATURE = "The AI Automation Queen · Shift & Lead" as const;

export const guideCompositions = [
  "glossary",
  "explainer",
  "tutorial",
  "workflow",
  "decision",
  "tool-verdict",
  "learning-hub",
] as const;

export type GuideComposition = (typeof guideCompositions)[number];
export type NonEmptyList<T> = readonly [T, ...T[]];
export type RelatedGuideSlugs = readonly [string, string, string];

export type GuideIllustration = {
  src: string;
  alt: string;
  /** CSS object-position value, for example "70% center". */
  focalPoint?: string;
};

export type GuideHero = {
  title: string;
  promise: string;
  illustration: GuideIllustration;
  /** Keeps the title in the quiet part of the illustration. */
  copyPosition?: "left" | "right";
};

export type GuideSeo = {
  /** Complete browser title. Use an absolute title so the site template does not alter the approved copy. */
  title: string;
  description: string;
};

export type GuideCapture = {
  /** Canonical slug passed to the capture endpoint. */
  guideSlug: string;
  /** Stable delivery identifier recorded by the capture registry. */
  guideId: `guide.${string}` | `hub.${string}`;
  /** Unique Lumail tag used by the delivery mapping. */
  lumailTag: string;
  buttonLabel: string;
  modalTitle: string;
  description: string;
  deliverable: {
    name: string;
    format: "PDF" | "XLSX" | "Markdown" | "worksheet" | "template" | "checklist";
    downloadHref: string;
    usefulWhen: string;
  };
};

export type ImmediateAnswer = {
  heading: string;
  paragraphs: NonEmptyList<string>;
  keyLine?: string;
};

export type GlossaryFramework = {
  kind: "glossary";
  heading: string;
  introduction?: string;
  groups: NonEmptyList<{
    id: string;
    title: string;
    introduction?: string;
    illustration?: GuideIllustration;
    entries: NonEmptyList<{
      term: string;
      fullName?: string;
      meaning: string;
      example: string;
      instruction?: string;
    }>;
  }>;
};

export type ExplainerFramework = {
  kind: "explainer";
  heading: string;
  introduction?: string;
  points: NonEmptyList<{
    title: string;
    explanation: string;
    example?: string;
    instruction?: string;
  }>;
};

export type TutorialFramework = {
  kind: "tutorial";
  heading: string;
  finishedResult: string;
  requirements?: NonEmptyList<string>;
  steps: NonEmptyList<{
    title: string;
    instruction: string;
    whyItMatters?: string;
    completionCheck: string;
  }>;
};

export type WorkflowFramework = {
  kind: "workflow";
  heading: string;
  outcome: string;
  trigger: string;
  requiredInputs: NonEmptyList<string>;
  steps: NonEmptyList<{
    owner: "Human" | "AI" | "Automation";
    title: string;
    action: string;
    output: string;
    approvalRequired?: boolean;
  }>;
  finalOutput: string;
};

export type DecisionFramework = {
  kind: "decision";
  heading: string;
  question: string;
  recommendation: string;
  options: NonEmptyList<{
    name: string;
    bestWhen: string;
    tradeoff: string;
    decision: string;
  }>;
  decisionRule: string;
};

export type ToolVerdictFramework = {
  kind: "tool-verdict";
  heading: string;
  verdict: string;
  bestFor: NonEmptyList<string>;
  poorFitFor: NonEmptyList<string>;
  useCases: NonEmptyList<{
    task: string;
    whyItWorks: string;
    firstMove: string;
  }>;
  recommendation: string;
};

export type LearningHubFramework = {
  kind: "learning-hub";
  heading: string;
  introduction: string;
  pathways: NonEmptyList<{
    signal: string;
    direction: string;
    href: `/guides/${string}.html`;
    actionLabel: string;
  }>;
  sequenceHeading: string;
  steps: NonEmptyList<{
    level?: GuideLevel;
    title: string;
    action: string;
    finishLine: string;
    href?: `/guides/${string}.html`;
    actionLabel?: string;
  }>;
};

export type GuideFramework =
  | GlossaryFramework
  | ExplainerFramework
  | TutorialFramework
  | WorkflowFramework
  | DecisionFramework
  | ToolVerdictFramework
  | LearningHubFramework;

export type ShiftLeadExample = {
  heading: string;
  situation: string;
  weakApproach?: string;
  decision: string;
  action: string;
  result: string;
  lesson: string;
};

type AssetBase = {
  heading: string;
  introduction: string;
  instructions?: string;
  workedExample?: {
    label: string;
    content: string;
  };
};

export type PracticalAsset =
  | (AssetBase & {
      kind: "prompt" | "template";
      content: string;
      qualityBar: NonEmptyList<string>;
    })
  | (AssetBase & {
      kind: "checklist";
      items: NonEmptyList<string>;
      completionRule: string;
    })
  | (AssetBase & {
      kind: "worksheet";
      fields: NonEmptyList<{ label: string; instruction: string }>;
      completionRule: string;
    })
  | (AssetBase & {
      kind: "decision-tool";
      questions: NonEmptyList<{ question: string; ifYes: string; ifNo: string }>;
      decisionRule: string;
    });

export type ResultCheck = {
  heading: string;
  successSignals: NonEmptyList<string>;
  limitations?: NonEmptyList<string>;
  stopConditions?: NonEmptyList<string>;
};

export type GuideEnding =
  | {
      kind: "commercial";
      eyebrow?: string;
      heading: string;
      body: string;
      action: { label: string; href: string };
    }
  | {
      kind: "clean";
      statement: string;
    };

type GuideArticleBase = {
  slug: string;
  level: GuideLevel;
  hub: GuideHub;
  outcomes: NonEmptyList<GuideOutcome>;
  seo?: GuideSeo;
  hero: GuideHero;
  capture?: GuideCapture;
  answer: ImmediateAnswer;
  example?: ShiftLeadExample;
  practicalAsset: PracticalAsset;
  resultCheck?: ResultCheck;
  relatedGuideSlugs: RelatedGuideSlugs;
  relatedHeading?: string;
  ending?: GuideEnding;
};

export type GuideArticleDefinition = GuideArticleBase & {
  [K in GuideFramework["kind"]]: {
    composition: K;
    framework: Extract<GuideFramework, { kind: K }>;
  };
}[GuideFramework["kind"]];

function collectStrings(value: unknown, output: string[] = []): string[] {
  if (typeof value === "string") output.push(value);
  else if (Array.isArray(value)) value.forEach((entry) => collectStrings(entry, output));
  else if (value && typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach((entry) => collectStrings(entry, output));
  }
  return output;
}

/**
 * Defines a guide while enforcing the publishing invariants that TypeScript cannot
 * express on its own. Call this around every structured guide content object.
 */
export function defineGuideArticle<const T extends GuideArticleDefinition>(guide: T): T {
  if (guide.framework.kind !== guide.composition) {
    throw new Error(`Guide ${guide.slug} has a framework that does not match its composition.`);
  }

  if (new Set(guide.relatedGuideSlugs).size !== 3) {
    throw new Error(`Guide ${guide.slug} must name exactly 3 different related guides.`);
  }

  if (guide.relatedGuideSlugs.includes(guide.slug)) {
    throw new Error(`Guide ${guide.slug} cannot recommend itself.`);
  }

  if (guide.capture) {
    if (!guide.capture.deliverable.downloadHref.startsWith("/downloads/")) {
      throw new Error(`Guide ${guide.slug} must provide an immediate download for its deliverable.`);
    }
    if (guide.capture.guideSlug !== guide.slug) {
      throw new Error(`Guide ${guide.slug} must use its slug as the capture guideSlug.`);
    }
    const guideScopedId = guide.capture.guideId === `guide.${guide.slug}`;
    const hubScopedId = guide.capture.guideId.startsWith("hub.");
    if (!guideScopedId && !hubScopedId) {
      throw new Error(`Guide ${guide.slug} must use guide.${guide.slug} or a hub-scoped capture guideId.`);
    }
  }

  const emDashCopy = collectStrings(guide).find((value) => value.includes("—"));
  if (emDashCopy) {
    throw new Error(`Guide ${guide.slug} contains an em dash in reader copy: ${emDashCopy}`);
  }

  return guide;
}
