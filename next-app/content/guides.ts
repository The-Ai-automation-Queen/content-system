import source from "./guides.json";
import publication from "../../data/guide-publication.json";
import preview from "../../data/guide-preview.json";

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

const inventoryGuides = (source.guides as Guide[])
  .sort((a, b) => a.sequence - b.sequence || a.title.localeCompare(b.title))
  .map((guide) => ({ ...guide }));

export const guides = inventoryGuides
  .filter((guide) => guide.status === "live")
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
const previewGuideSlugSet = new Set<string>(((preview.guides ?? []) as Array<{ slug: string }>).map((guide) => guide.slug));

export const publicGuides = guides.filter((guide) => approvedGuideSlugSet.has(guide.slug));
export const reviewGuides = inventoryGuides.filter((guide) => approvedGuideSlugSet.has(guide.slug) || previewGuideSlugSet.has(guide.slug));
export const hiddenGuideSlugs = guides
  .filter((guide) => !approvedGuideSlugSet.has(guide.slug))
  .map((guide) => guide.slug);

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
  const candidates = [
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
