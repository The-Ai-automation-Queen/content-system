export type LearningFormat = "explorer" | "glossary" | "decision" | "walkthrough" | "prompt-builder" | "practice" | "audit";
export const guideFormats: Record<string, LearningFormat> = {
  "what-is-ai": "explorer", "ai-jargon-guide": "glossary", "what-is-agentic": "decision",
  "what-should-you-never-share-with-ai": "audit", "which-ai-tool-for-what": "decision",
  chatgpt: "walkthrough", claude: "walkthrough", gemini: "walkthrough", copilot: "decision",
  "meta-ai": "explorer", grok: "audit", deepseek: "decision", kimi: "walkthrough", manus: "walkthrough", mistral: "decision",
  "what-is-a-prompt": "prompt-builder", "what-is-an-ai-browser": "audit",
  "connect-ai-to-email-files-calendar": "audit", "ai-skills-worth-learning-for-work": "practice", "show-up-in-ai-search": "audit",
  "make-chatgpt-answers-shorter": "practice", "stop-chatgpt-forgetting-context": "walkthrough", "chatgpt-scheduled-tasks": "walkthrough",
  "gemini-cannot-find-drive-file": "walkthrough", "gemini-google-tasks-limits": "practice", "check-copilot-excel-edits": "practice",
  "review-grok-suggestions": "practice", "get-better-professional-writing-from-grok": "practice", "verify-grok-current-research": "audit",
  "is-kimi-worth-paying-for": "decision", "control-kimi-code-changes": "walkthrough",
  "test-manus-without-burning-credits": "walkthrough", "manus-browser-workflow": "decision",
  "switch-from-chatgpt-to-mistral": "decision", "is-mistral-pro-worth-it": "decision",
  "test-meta-business-agent-customer-replies": "practice", "fix-deepseek-wall-of-text": "practice", "edit-long-writing-with-deepseek": "walkthrough",
};
