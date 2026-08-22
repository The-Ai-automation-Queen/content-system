import { whatIsAiGuide } from "@/content/guides/what-is-ai";
import { aiEssentialsGuide } from "@/content/guides/ai-essentials";
import { betterPromptsAndAnswersGuide } from "@/content/guides/better-prompts-and-answers";
import { contentAndCreativeWorkGuide } from "@/content/guides/content-and-creative-work";
import { workflowsAndAutomationGuide } from "@/content/guides/workflows-and-automation";
import { aiAgentsGuide } from "@/content/guides/ai-agents";
import { businessOperationsGuide } from "@/content/guides/business-operations";
import { buildABusinessDashboardWithAiGuide } from "@/content/guides/build-a-business-dashboard-with-ai";
import { whatIsAPromptGuide } from "@/content/guides/what-is-a-prompt";
import { checkAiAnswersGuide } from "@/content/guides/check-ai-answers";
import { makeAiClearAndConciseGuide } from "@/content/guides/make-ai-clear-and-concise";
import { buildTasteWithAiGuide } from "@/content/guides/build-taste-with-ai";
import { showUpInAiSearchGuide } from "@/content/guides/show-up-in-ai-search";
import { getBetterAtAiGuide } from "@/content/guides/get-better-at-ai";
import { whatIsAgenticGuide } from "@/content/guides/what-is-agentic";
import { whichAiToolForWhatGuide } from "@/content/guides/which-ai-tool-for-what";
import { chatgptGuide } from "@/content/guides/chatgpt";
import { claudeGuide } from "@/content/guides/claude";
import { geminiGuide } from "@/content/guides/gemini";
import { copilotGuide } from "@/content/guides/copilot";
import { grokGuide } from "@/content/guides/grok";
import { metaAiGuide } from "@/content/guides/meta-ai";
import { deepseekGuide } from "@/content/guides/deepseek";
import { kimiGuide } from "@/content/guides/kimi";
import { manusGuide } from "@/content/guides/manus";
import { mistralGuide } from "@/content/guides/mistral";
import { stackThreeToolAiStackGuide } from "@/content/guides/stack-3-tool-ai-stack";
import { researchToContentWorkflowGuide } from "@/content/guides/research-to-content-workflow";
import { followUpSetupGuide } from "@/content/guides/follow-up-setup";
import { inboxManagerSetupGuide } from "@/content/guides/inbox-manager-setup";
import { firstAiEmployeeGuide } from "@/content/guides/first-ai-employee";
import { operationsSystemGuide } from "@/content/guides/24-7-operations-system";
import { guides } from "@/content/guides";
import type { GuideArticleDefinition } from "@/content/structured-guide";

/**
 * Structured guide pages that have passed copy, asset and capture integration.
 * A guide is added here only when it is ready to replace its legacy HTML page.
 */
export const structuredGuides = [
  aiEssentialsGuide,
  betterPromptsAndAnswersGuide,
  contentAndCreativeWorkGuide,
  workflowsAndAutomationGuide,
  aiAgentsGuide,
  businessOperationsGuide,
  buildABusinessDashboardWithAiGuide,
  whatIsAiGuide,
  whatIsAPromptGuide,
  checkAiAnswersGuide,
  makeAiClearAndConciseGuide,
  buildTasteWithAiGuide,
  showUpInAiSearchGuide,
  getBetterAtAiGuide,
  whatIsAgenticGuide,
  whichAiToolForWhatGuide,
  chatgptGuide,
  claudeGuide,
  geminiGuide,
  copilotGuide,
  grokGuide,
  metaAiGuide,
  deepseekGuide,
  kimiGuide,
  manusGuide,
  mistralGuide,
  stackThreeToolAiStackGuide,
  researchToContentWorkflowGuide,
  followUpSetupGuide,
  inboxManagerSetupGuide,
  firstAiEmployeeGuide,
  operationsSystemGuide,
] as const satisfies readonly GuideArticleDefinition[];

for (const article of structuredGuides) {
  const catalogueEntry = guides.find((guide) => guide.slug === article.slug);
  if (!catalogueEntry) {
    throw new Error(`Structured guide ${article.slug} is missing from the live guide catalogue.`);
  }
  if (catalogueEntry.level !== article.level || catalogueEntry.hub !== article.hub) {
    throw new Error(`Structured guide ${article.slug} does not match its catalogue level and hub.`);
  }
  if (catalogueEntry.h1 !== article.hero.title) {
    throw new Error(`Structured guide ${article.slug} does not match its catalogue h1.`);
  }
  if (
    article.outcomes.length !== catalogueEntry.outcomes.length ||
    article.outcomes.some((outcome) => !catalogueEntry.outcomes.includes(outcome))
  ) {
    throw new Error(`Structured guide ${article.slug} does not match its catalogue outcomes.`);
  }
}

export function getStructuredGuide(slug: string): GuideArticleDefinition | undefined {
  return structuredGuides.find((guide) => guide.slug === slug);
}
