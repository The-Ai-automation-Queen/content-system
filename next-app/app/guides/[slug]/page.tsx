import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideReadingPage } from "@/components/guides/guide-reading-page";
import { getGuidePage, guidePages } from "@/content/guide-page";

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
  return <GuideReadingPage guide={guide} />;
}
