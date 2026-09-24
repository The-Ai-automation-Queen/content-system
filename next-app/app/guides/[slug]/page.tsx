import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { approvedGuideSlugs } from "@/content/guides";
import { GuideReadingPage } from "@/components/guides/guide-reading-page";
import { InstagramDashboardPage } from "@/components/guides/instagram-dashboard-page";
import { WhatIsAiPage } from "@/components/guides/what-is-ai-page";
import { AiJargonPage } from "@/components/guides/ai-jargon-page";
import { GuideAccessBoundary } from "@/components/guides/guide-access-boundary";
import { getGuidePage, guidePages } from "@/content/guide-page";
import { legacyGuideSlugs } from "@/content/legacy-guide-slugs";

export function generateStaticParams() {
  return guidePages.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuidePage(slug);
  if (!guide) return {};
  const canonical = `/guides/${guide.slug}.html`;
  return {
    title: guide.title,
    ...(approvedGuideSlugs.includes(slug) ? {} : { robots: { index: false, follow: false } }),
    description: guide.seoDescription,
    alternates: { canonical },
    openGraph: {
      title: guide.title,
      description: guide.seoDescription,
      url: canonical,
      type: "article",
      images: [{ url: guide.cover, width: 1280, height: 721 }],
    },
  };
}

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuidePage(slug);
  if (!guide) notFound();
  if (slug === "instagram-content-dashboard") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} variant="entry"><InstagramDashboardPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "what-is-ai") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="See what AI can do, then decide if it is worth trying for one task at work. Enter your email to open the guide." variant="entry"><WhatIsAiPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "ai-jargon-guide") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Understand the AI words you keep hearing, then ask better questions about what a tool can do. Enter your email to open the guide." variant="entry"><AiJargonPage guide={guide} /></GuideAccessBoundary>;
  if (legacyGuideSlugs.has(slug)) return <GuideReadingPage guide={guide} />;
  throw new Error(`Guide ${slug} needs an approved interactive Next.js composition before it can be built.`);
}
