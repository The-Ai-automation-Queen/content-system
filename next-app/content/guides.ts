import source from "./guides.json";

export type GuideTrack = "understand" | "setup" | "tools";

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
};

export const guides = (source.guides as Guide[])
  .filter((guide) => guide.status === "live")
  .map((guide) => ({ ...guide }));

export const trackDetails: Record<GuideTrack, { label: string; description: string }> = {
  understand: { label: "Learn", description: "See what AI is, how it works, and what the language really means." },
  setup: { label: "Build", description: "Turn one useful idea into a working system with clear human control." },
  tools: { label: "Choose", description: "Pick tools for the work they do well, not for the noise around them." },
};
