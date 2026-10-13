import type { CardGuide } from "../card-guides";
import { guide as aiJargonGuide } from "./ai-jargon-guide";
import { guide as aiSkillsWorthLearningForWork } from "./ai-skills-worth-learning-for-work";
import { guide as catchAiMakingThingsUp } from "./catch-ai-making-things-up";
import { guide as chatgptCustomerResearchWithEvidence } from "./chatgpt-customer-research-with-evidence";
import { guide as chatgptScheduledTasks } from "./chatgpt-scheduled-tasks";
import { guide as chatgptScreenRecordingToProcessGuide } from "./chatgpt-screen-recording-to-process-guide";
import { guide as claude } from "./claude";
import { guide as connectAiToEmailFilesCalendar } from "./connect-ai-to-email-files-calendar";
import { guide as geminiCannotFindDriveFile } from "./gemini-cannot-find-drive-file";
import { guide as geminiGoogleTasksLimits } from "./gemini-google-tasks-limits";
import { guide as makeChatgptAnswersShorter } from "./make-chatgpt-answers-shorter";
import { guide as makeWorkTrackerWithKimi } from "./make-work-tracker-with-kimi";
import { guide as showUpInAiSearch } from "./show-up-in-ai-search";
import { guide as stopAiAgreeingWithYou } from "./stop-ai-agreeing-with-you";
import { guide as stopChatgptForgettingContext } from "./stop-chatgpt-forgetting-context";
import { guide as teachClaudeARepeatableWorkflow } from "./teach-claude-a-repeatable-workflow";
import { guide as testMetaMuseMoneySavingTask } from "./test-meta-muse-money-saving-task";
import { guide as weekendProjectsWithClaude } from "./weekend-projects-with-claude";
import { guide as whatIsAPrompt } from "./what-is-a-prompt";
import { guide as whatIsAgentic } from "./what-is-agentic";
import { guide as whatIsAi } from "./what-is-ai";
import { guide as whatIsAnAiBrowser } from "./what-is-an-ai-browser";
import { guide as whatShouldYouNeverShareWithAi } from "./what-should-you-never-share-with-ai";
import { guide as whichAiToolForWhat } from "./which-ai-tool-for-what";

export const rebuiltGuides: Record<string, CardGuide> = Object.fromEntries(
  [aiJargonGuide, aiSkillsWorthLearningForWork, catchAiMakingThingsUp, chatgptCustomerResearchWithEvidence, chatgptScheduledTasks, chatgptScreenRecordingToProcessGuide, claude, connectAiToEmailFilesCalendar, geminiCannotFindDriveFile, geminiGoogleTasksLimits, makeChatgptAnswersShorter, makeWorkTrackerWithKimi, showUpInAiSearch, stopAiAgreeingWithYou, stopChatgptForgettingContext, teachClaudeARepeatableWorkflow, testMetaMuseMoneySavingTask, weekendProjectsWithClaude, whatIsAPrompt, whatIsAgentic, whatIsAi, whatIsAnAiBrowser, whatShouldYouNeverShareWithAi, whichAiToolForWhat].map((guide) => [guide.slug, guide]),
);
