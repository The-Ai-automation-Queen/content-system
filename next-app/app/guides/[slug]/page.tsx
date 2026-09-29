import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { approvedGuideSlugs } from "@/content/guides";
import { GuideReadingPage } from "@/components/guides/guide-reading-page";
import { InstagramDashboardPage } from "@/components/guides/instagram-dashboard-page";
import { GrokReviewPage } from "@/components/guides/grok-review-page";
import { GrokResearchPage } from "@/components/guides/grok-research-page";
import { GrokWritingPage } from "@/components/guides/grok-writing-page";
import { DeepseekLongEditPage } from "@/components/guides/deepseek-long-edit-page";
import { KimiValuePage } from "@/components/guides/kimi-value-page";
import { ManusBrowserPage } from "@/components/guides/manus-browser-page";
import { DeepseekRecoveryPage } from "@/components/guides/deepseek-recovery-page";
import { DeepseekDocumentPage } from "@/components/guides/deepseek-document-page";
import { GrokImageEditsPage } from "@/components/guides/grok-image-edits-page";
import { MetaMusePage } from "@/components/guides/meta-muse-page";
import { MistralMultilingualPage } from "@/components/guides/mistral-multilingual-page";
import { GuideAccessBoundary } from "@/components/guides/guide-access-boundary";
import { BatchGuidePage } from "@/components/guides/batch-guide-page";
import { batchOneGuides } from "@/content/guide-batch-one";
import { getGuidePage, guidePages } from "@/content/guide-page";
import { legacyGuideSlugs } from "@/content/legacy-guide-slugs";

export function generateStaticParams() {
  return guidePages.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuidePage(slug);
  if (!guide) return {};
  const canonical = `/guides/${guide.slug}/`;
  const batch = batchOneGuides[slug];
  return {
    title: batch?.seoTitle ?? guide.title,
    ...(approvedGuideSlugs.includes(slug) ? {} : { robots: { index: false, follow: false } }),
    description: batch?.seoDescription ?? guide.seoDescription,
    alternates: { canonical },
    openGraph: {
      title: batch?.title ?? guide.title,
      description: batch?.seoDescription ?? guide.seoDescription,
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
  if (slug === "instagram-content-dashboard") return <InstagramDashboardPage guide={guide} />;
  if (slug === "what-is-ai") return <BatchGuidePage guide={guide} />;
  if (slug === "ai-jargon-guide") return <BatchGuidePage guide={guide} />;
  if (slug === "what-is-agentic") return <BatchGuidePage guide={guide} />;
  if (slug === "what-should-you-never-share-with-ai") return <BatchGuidePage guide={guide} />;
  if (slug === "which-ai-tool-for-what") return <BatchGuidePage guide={guide} />;
  if (slug === "make-chatgpt-answers-shorter") return <BatchGuidePage guide={guide} />;
  if (slug === "stop-chatgpt-forgetting-context") return <BatchGuidePage guide={guide} />;
  if (slug === "chatgpt-scheduled-tasks") return <BatchGuidePage guide={guide} />;
  if (slug === "claude") return <BatchGuidePage guide={guide} />;
  if (slug === "claude-projects") return <BatchGuidePage guide={guide} />;
  if (slug === "gemini-cannot-find-drive-file") return <BatchGuidePage guide={guide} />;
  if (slug === "gemini-google-tasks-limits") return <BatchGuidePage guide={guide} />;
  if (slug === "review-grok-suggestions") return <GrokReviewPage guide={guide} />;
  if (slug === "check-copilot-excel-edits") return <BatchGuidePage guide={guide} />;
  if (slug === "what-can-copilot-see-at-work") return <BatchGuidePage guide={guide} />;
  if (slug === "chatgpt-screen-recording-to-process-guide") return <BatchGuidePage guide={guide} />;
  if (slug === "meta-ai") return <MetaMusePage guide={guide} />;
  if (slug === "test-meta-muse-money-saving-task") return <BatchGuidePage guide={guide} />;
  if (slug === "what-is-a-prompt") return <BatchGuidePage guide={guide} />;
  if (slug === "verify-grok-current-research") return <GrokResearchPage guide={guide} />;
  if (slug === "get-better-professional-writing-from-grok") return <GrokWritingPage guide={guide} />;
  if (slug === "fix-deepseek-wall-of-text") return <BatchGuidePage guide={guide} />;
  if (slug === "edit-long-writing-with-deepseek") return <DeepseekLongEditPage guide={guide} />;
  if (slug === "is-kimi-worth-paying-for") return <KimiValuePage guide={guide} />;
  if (slug === "make-work-tracker-with-kimi") return <BatchGuidePage guide={guide} />;
  if (slug === "manus-browser-workflow") return <ManusBrowserPage guide={guide} />;
  if (slug === "what-is-an-ai-browser") return <BatchGuidePage guide={guide} />;
  if (slug === "connect-ai-to-email-files-calendar") return <BatchGuidePage guide={guide} />;
  if (slug === "ai-skills-worth-learning-for-work") return <BatchGuidePage guide={guide} />;
  if (slug === "show-up-in-ai-search") return <BatchGuidePage guide={guide} />;
  if (slug === "chatgpt-customer-research-with-evidence") return <BatchGuidePage guide={guide} />;
  if (slug === "teach-claude-a-repeatable-workflow") return <BatchGuidePage guide={guide} />;
  if (slug === "protect-a-long-deepseek-project") return <DeepseekRecoveryPage guide={guide} />;
  if (slug === "test-deepseek-v4-document-work") return <DeepseekDocumentPage guide={guide} />;
  if (slug === "test-grok-repeated-image-edits") return <GrokImageEditsPage guide={guide} />;
  if (slug === "mistral-multilingual-research") return <MistralMultilingualPage guide={guide} />;
  if (slug === "stop-ai-agreeing-with-you") return <BatchGuidePage guide={guide} />;
  if (slug === "catch-ai-making-things-up") return <BatchGuidePage guide={guide} />;
  if (slug === "ai-quit-or-stay-decision") return <BatchGuidePage guide={guide} />;
  if (slug === "is-ai-coming-for-my-job") return <BatchGuidePage guide={guide} />;
  if (slug === "test-business-idea-with-ai") return <BatchGuidePage guide={guide} />;
  if (slug === "weekend-projects-with-claude") return <BatchGuidePage guide={guide} />;
  if (slug === "money-plan-with-ai") return <BatchGuidePage guide={guide} />;
  if (slug === "ai-job-interview-practice") return <BatchGuidePage guide={guide} />;
  if (slug === "launch-your-product-in-30-days") return <BatchGuidePage guide={guide} />;
  if (slug === "marketing-emails-that-sell") return <BatchGuidePage guide={guide} />;
  if (legacyGuideSlugs.has(slug)) return <GuideReadingPage guide={guide} />;
  throw new Error(`Guide ${slug} needs an approved interactive Next.js composition before it can be built.`);
}
