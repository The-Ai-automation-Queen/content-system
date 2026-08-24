import source from "./guides.json";
import publication from "../../data/guide-publication.json";

export type GuideTrack = "understand" | "create" | "setup" | "tools";

export const guideLevels = ["Beginner", "Intermediate", "Expert"] as const;
export type GuideLevel = (typeof guideLevels)[number];

export const guideHubs = [
  "AI essentials",
  "Better prompts and answers",
  "AI tools",
  "Content and creative work",
  "Workflows and automation",
  "AI agents",
  "Business operations",
] as const;
export type GuideHub = (typeof guideHubs)[number];

export const guideOutcomes = [
  "Understand AI",
  "Use AI safely",
  "Choose an AI tool",
  "Get better answers",
  "Create content",
  "Automate a task",
  "Build an agent",
  "Run business operations",
] as const;
export type GuideOutcome = (typeof guideOutcomes)[number];

export type Guide = {
  slug: string;
  title: string;
  h1: string;
  summary: string;
  datePublished: string;
  dateModified: string;
  readMinutes: number;
  cover: string;
  track: GuideTrack;
  status: string;
  access?: "free" | "paid-candidate" | "do-not-publish";
  positioningLane?: "Use AI at work" | "Keep learning as work changes" | "Protect and develop your human value";
  reviewStatus?: "idea" | "copy review" | "copy approved" | "page review" | "page approved" | "published" | "paid candidate" | "rejected";
  formatLabel: string;
  level: GuideLevel;
  hub: GuideHub;
  outcomes: GuideOutcome[];
  tags: string[];
  sequence: number;
};

export const guides = (source.guides as Guide[])
  .filter((guide) => guide.status === "live")
  .sort((a, b) => a.sequence - b.sequence || a.title.localeCompare(b.title))
  .map((guide) => ({ ...guide }));

/**
 * A guide is public only after its copy and complete reading page have been
 * explicitly approved. Inventory records stay in guides.json for future
 * review, but they must never appear in the library by accident.
 */
export const approvedGuideSlugs = publication.approved
  .toSorted((a, b) => a.journeyOrder - b.journeyOrder)
  .map((guide) => guide.slug);

const approvedGuideSlugSet = new Set<string>(approvedGuideSlugs);

export const publicGuides = guides.filter((guide) => approvedGuideSlugSet.has(guide.slug));
export const hiddenGuideSlugs = guides
  .filter((guide) => !approvedGuideSlugSet.has(guide.slug))
  .map((guide) => guide.slug);

/**
 * Editorially chosen next steps for the public guide series.
 *
 * These are deliberately stable rather than randomly shuffled. Each set gives
 * the reader a logical next lesson, something practical to use, and a relevant
 * alternative or deeper path. Keeping the rotation here prevents every article
 * from falling back to the same popular guides.
 */
export const guideNextStepRotation: Record<string, readonly [string, string, string]> = {
  "what-is-ai": ["ai-jargon-guide", "what-should-you-never-share-with-ai", "what-is-agentic"],
  "ai-jargon-guide": ["what-is-ai", "what-is-agentic", "what-should-you-never-share-with-ai"],
  "what-is-agentic": ["what-is-ai", "what-should-you-never-share-with-ai", "ai-jargon-guide"],
  "what-should-you-never-share-with-ai": ["what-is-ai", "ai-jargon-guide", "what-is-agentic"],
  "which-ai-tool-for-what": ["what-should-you-never-share-with-ai", "ai-jargon-guide", "what-is-agentic"],
  "chatgpt": ["what-should-you-never-share-with-ai", "ai-jargon-guide", "what-is-ai"],
  "claude": ["chatgpt", "what-should-you-never-share-with-ai", "gemini"],
  "gemini": ["chatgpt", "what-should-you-never-share-with-ai", "claude"],
  "copilot": ["chatgpt", "gemini", "what-should-you-never-share-with-ai"],
  "meta-ai": ["what-should-you-never-share-with-ai", "grok", "gemini"],
  "grok": ["what-should-you-never-share-with-ai", "meta-ai", "deepseek"],
  "deepseek": ["what-should-you-never-share-with-ai", "mistral", "kimi"],
  "kimi": ["deepseek", "manus", "what-is-agentic"],
  "manus": ["what-is-agentic", "what-should-you-never-share-with-ai", "kimi"],
  "mistral": ["deepseek", "manus", "what-should-you-never-share-with-ai"],
  "what-is-a-prompt": ["which-ai-tool-for-what", "what-should-you-never-share-with-ai", "what-is-an-ai-browser"],
  "what-is-an-ai-browser": ["connect-ai-to-email-files-calendar", "what-should-you-never-share-with-ai", "which-ai-tool-for-what"],
  "connect-ai-to-email-files-calendar": ["what-should-you-never-share-with-ai", "what-is-an-ai-browser", "which-ai-tool-for-what"],
  "ai-skills-worth-learning-for-work": ["what-is-a-prompt", "which-ai-tool-for-what", "what-is-agentic"],
  "show-up-in-ai-search": ["what-is-a-prompt", "which-ai-tool-for-what", "claude"],
};

for (const guide of publicGuides) {
  if (!guideNextStepRotation[guide.slug]) {
    throw new Error(`Public guide ${guide.slug} is missing its editorial next-step rotation.`);
  }
}

for (const [currentSlug, nextSlugs] of Object.entries(guideNextStepRotation)) {
  if (!publicGuides.some((guide) => guide.slug === currentSlug)) {
    throw new Error(`Next-step rotation contains a hidden or missing guide: ${currentSlug}.`);
  }
  if (new Set(nextSlugs).size !== 3 || nextSlugs.includes(currentSlug)) {
    throw new Error(`Next-step rotation for ${currentSlug} must contain 3 different guides and no self-link.`);
  }
  for (const nextSlug of nextSlugs) {
    if (!publicGuides.some((guide) => guide.slug === nextSlug)) {
      throw new Error(`Next-step rotation for ${currentSlug} points to a hidden or missing guide: ${nextSlug}.`);
    }
  }
}

export function isPublicGuide(guide: Guide): boolean {
  return approvedGuideSlugSet.has(guide.slug);
}

export function getPublicRelatedGuides({
  currentSlug,
  preferredSlugs,
  hub,
  outcomes,
}: {
  currentSlug: string;
  preferredSlugs: readonly string[];
  hub?: GuideHub;
  outcomes?: readonly GuideOutcome[];
}): Guide[] {
  const rotatedSlugs = guideNextStepRotation[currentSlug] ?? [];
  const candidates = [
    ...rotatedSlugs.map((slug) => publicGuides.find((guide) => guide.slug === slug)),
    ...preferredSlugs.map((slug) => publicGuides.find((guide) => guide.slug === slug)),
    ...publicGuides.filter((guide) => guide.hub === hub),
    ...publicGuides.filter((guide) => outcomes?.some((outcome) => guide.outcomes.includes(outcome))),
    ...publicGuides,
  ];
  const seen = new Set<string>([currentSlug]);

  return candidates
    .filter((guide): guide is Guide => Boolean(guide))
    .filter((guide) => {
      if (seen.has(guide.slug)) return false;
      seen.add(guide.slug);
      return true;
    })
    .slice(0, 3);
}

export const trackDetails: Record<GuideTrack, { label: string; description: string }> = {
  understand: { label: "Learn", description: "See what AI is, how it works, and what the language really means." },
  create: { label: "Create", description: "Turn trusted sources into useful content while keeping the voice, facts and publish decision human." },
  setup: { label: "Build", description: "Turn one useful idea into a working system with clear human control." },
  tools: { label: "Choose", description: "Pick tools for the work they do well, not for the noise around them." },
};
