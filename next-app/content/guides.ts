import source from "./guides.json";

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

export const hiddenGuideSlugs = [
  "business-operations",
  "first-ai-employee",
  "24-7-operations-system",
  "research-to-content-workflow",
  "workflows-and-automation",
  "follow-up-setup",
  "inbox-manager-setup",
  "ai-agents",
  "build-a-business-dashboard-with-ai",
  "stack-3-tool-ai-stack",
  "content-and-creative-work",
  "show-up-in-ai-search",
] as const;

const hiddenGuideSlugSet = new Set<string>(hiddenGuideSlugs);

export const publicGuides = guides.filter((guide) => !hiddenGuideSlugSet.has(guide.slug));

export function isPublicGuide(guide: Guide): boolean {
  return !hiddenGuideSlugSet.has(guide.slug);
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
