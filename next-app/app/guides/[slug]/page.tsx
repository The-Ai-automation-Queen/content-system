import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { approvedGuideSlugs } from "@/content/guides";
import { GuideReadingPage } from "@/components/guides/guide-reading-page";
import { InstagramDashboardPage } from "@/components/guides/instagram-dashboard-page";
import { WhatIsAiPage } from "@/components/guides/what-is-ai-page";
import { AiJargonPage } from "@/components/guides/ai-jargon-page";
import { AgenticPage } from "@/components/guides/agentic-page";
import { PrivacyGuidePage } from "@/components/guides/privacy-guide-page";
import { ToolChooserPage } from "@/components/guides/tool-chooser-page";
import { ShortAnswerPage } from "@/components/guides/short-answer-page";
import { ChatGptProjectPage } from "@/components/guides/chatgpt-project-page";
import { ScheduledTaskPage } from "@/components/guides/scheduled-task-page";
import { ClaudeTaskPage } from "@/components/guides/claude-task-page";
import { ClaudeProjectsPage } from "@/components/guides/claude-projects-page";
import { GeminiDrivePage } from "@/components/guides/gemini-drive-page";
import { GeminiTasksPage } from "@/components/guides/gemini-tasks-page";
import { GrokReviewPage } from "@/components/guides/grok-review-page";
import { CopilotExcelPage } from "@/components/guides/copilot-excel-page";
import { CopilotVisibilityPage } from "@/components/guides/copilot-visibility-page";
import { PromptBuilderPage } from "@/components/guides/prompt-builder-page";
import { GrokWritingPage } from "@/components/guides/grok-writing-page";
import { DeepseekWallPage } from "@/components/guides/deepseek-wall-page";
import { DeepseekLongEditPage } from "@/components/guides/deepseek-long-edit-page";
import { KimiValuePage } from "@/components/guides/kimi-value-page";
import { KimiCodePage } from "@/components/guides/kimi-code-page";
import { ManusBrowserPage } from "@/components/guides/manus-browser-page";
import { AiBrowserPage } from "@/components/guides/ai-browser-page";
import { AiConnectionsPage } from "@/components/guides/ai-connections-page";
import { AiSkillsPage } from "@/components/guides/ai-skills-page";
import { AiSearchPage } from "@/components/guides/ai-search-page";
import { CustomerResearchPage } from "@/components/guides/customer-research-page";
import { ClaudeWorkflowPage } from "@/components/guides/claude-workflow-page";
import { DeepseekRecoveryPage } from "@/components/guides/deepseek-recovery-page";
import { DeepseekDocumentPage } from "@/components/guides/deepseek-document-page";
import { MetaMusePage } from "@/components/guides/meta-muse-page";
import { MetaMuseSavingPage } from "@/components/guides/meta-muse-saving-page";
import { ScreenRecordingPage } from "@/components/guides/screen-recording-page";
import { MistralMultilingualPage } from "@/components/guides/mistral-multilingual-page";
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
  const canonical = `/guides/${guide.slug}/`;
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
  if (slug === "what-is-agentic") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="See if your task needs a chat, a fixed automation or an AI agent. Enter your email to open the guide." variant="entry"><AgenticPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "what-should-you-never-share-with-ai") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="See what to keep out of AI, what needs permission and where to check your tool's privacy setting. Enter your email to open the guide." variant="entry"><PrivacyGuidePage guide={guide} /></GuideAccessBoundary>;
  if (slug === "which-ai-tool-for-what") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Choose a first AI tool based on your task and where your work lives. Enter your email to open the guide." variant="entry"><ToolChooserPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "make-chatgpt-answers-shorter") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Give ChatGPT a clear answer limit, then check if it kept the parts you needed. Enter your email to open the guide." variant="entry"><ShortAnswerPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "stop-chatgpt-forgetting-context") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Save a short Project brief and see if a new chat keeps the facts you need. Enter your email to open the guide." variant="entry"><ChatGptProjectPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "chatgpt-scheduled-tasks") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Set one public page to check each weekday. Get an update only when the change matters. Enter your email to open the guide." variant="entry"><ScheduledTaskPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "claude") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Pick one real task and use a complete example in Claude. Enter your email to open the guide." variant="entry"><ClaudeTaskPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "claude-projects") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Save your meeting-note instructions once in Claude, then test a new meeting. Enter your email to open the guide." variant="entry"><ClaudeProjectsPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "gemini-cannot-find-drive-file") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Find out why Gemini cannot open a file you can see in Drive. Enter your email to open the guide." variant="entry"><GeminiDrivePage guide={guide} /></GuideAccessBoundary>;
  if (slug === "gemini-google-tasks-limits") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Check if Gemini can see which project list each Google task belongs to. Enter your email to open the guide." variant="entry"><GeminiTasksPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "review-grok-suggestions") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="See when your Bot should stop and ask you before connecting an account or taking action. Enter your email to open the guide." variant="entry"><GrokReviewPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "check-copilot-excel-edits") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Make one edit in a practice workbook and check exactly what changed. Enter your email to open the guide." variant="entry"><CopilotExcelPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "what-can-copilot-see-at-work") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Test three harmless sources and check what Copilot can actually find in your work account. Enter your email to open the guide." variant="entry"><CopilotVisibilityPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "chatgpt-screen-recording-to-process-guide") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Turn a clean screen recording into instructions someone else can follow. Enter your email to open the guide." variant="entry"><ScreenRecordingPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "meta-ai") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle="What is Meta Muse?" guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Give Muse one public task and check that it stops before any booking or account action. Enter your email to open the guide." variant="entry"><MetaMusePage guide={guide} /></GuideAccessBoundary>;
  if (slug === "test-meta-muse-money-saving-task") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle="Can Muse save you money?" guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Ask for a price comparison with your limits, then check every cost before deciding. Enter your email to open the guide." variant="entry"><MetaMuseSavingPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "what-is-a-prompt") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="See a complete example, then build a prompt for one real task. Enter your email to open the guide." variant="entry"><PromptBuilderPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "get-better-professional-writing-from-grok") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Ask Grok Bot to find public posts on one topic. Check the results before asking it to search again. Enter your email to open the guide." variant="entry"><GrokWritingPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "fix-deepseek-wall-of-text") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Make a dense scene easier to read without changing its words or meaning. Enter your email to open the guide." variant="entry"><DeepseekWallPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "edit-long-writing-with-deepseek") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Protect the story you like, revise one passage and check what DeepSeek changed. Enter your email to open the guide." variant="entry"><DeepseekLongEditPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "is-kimi-worth-paying-for") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Test one repeated job against the current Kimi limit and price before paying. Enter your email to open the guide." variant="entry"><KimiValuePage guide={guide} /></GuideAccessBoundary>;
  if (slug === "control-kimi-code-changes") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Plan one small file change and check every difference before keeping it. Enter your email to open the guide." variant="entry"><KimiCodePage guide={guide} /></GuideAccessBoundary>;
  if (slug === "manus-browser-workflow") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Choose the least access Manus needs, then test the browser route safely if your job requires it. Enter your email to open the guide." variant="entry"><ManusBrowserPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "what-is-an-ai-browser") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Compare two public pages with an AI browser, then check what it may see or remember. Enter your email to open the guide." variant="entry"><AiBrowserPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "connect-ai-to-email-files-calendar") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Choose the access your task needs and read the permission before connecting an AI tool. Enter your email to open the guide." variant="entry"><AiConnectionsPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "ai-skills-worth-learning-for-work") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Choose one skill to practise on a task you already do at work. Enter your email to open the guide." variant="entry"><AiSkillsPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "show-up-in-ai-search") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Test what AI search can verify about your business and find one public fact to improve. Enter your email to open the guide." variant="entry"><AiSearchPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "chatgpt-customer-research-with-evidence") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Group customer research into themes you can trace back to the original notes. Enter your email to open the guide." variant="entry"><CustomerResearchPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "teach-claude-a-repeatable-workflow") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Test a repeatable Claude instruction on two different weeks, then save the version that works. Enter your email to open the guide." variant="entry"><ClaudeWorkflowPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "protect-a-long-deepseek-project") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Build a five-file recovery pack and test whether a new chat can continue the project. Enter your email to open the guide." variant="entry"><DeepseekRecoveryPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "test-deepseek-v4-document-work") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Compare DeepSeek and your current tool on two safe documents, with source checks and repair time. Enter your email to open the guide." variant="entry"><DeepseekDocumentPage guide={guide} /></GuideAccessBoundary>;
  if (slug === "mistral-multilingual-research") return <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} guideCover={guide.cover} guideCoverAlt={guide.coverAlt} guidePromise="Search one question in two languages, then check each claim against its original source. Enter your email to open the guide." variant="entry"><MistralMultilingualPage guide={guide} /></GuideAccessBoundary>;
  if (legacyGuideSlugs.has(slug)) return <GuideReadingPage guide={guide} />;
  throw new Error(`Guide ${slug} needs an approved interactive Next.js composition before it can be built.`);
}
