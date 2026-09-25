export type PromptBrief = {
  task: string;
  material: string;
  result: string;
  checks: string;
};

export const promptExample: PromptBrief = {
  task: "Turn this rough project note into an agenda for a 15-minute team meeting.",
  material: "We are preparing a website launch. The landing page is approved. The designer expects final graphics by Friday. Pricing still needs approval. The team meets on Tuesday. We have not decided if the launch should wait for pricing approval.",
  result: "Write three agenda items. For each, give the update or decision needed and one useful question. End with a single line headed ‘Decision to make’. Keep the whole answer under 130 words.",
  checks: "Use only the note above. Do not invent people, owners, dates, approvals or promises. If an owner is needed but not named, write ‘Not specified’. Make the unresolved pricing approval visible as a decision, not as a completed fact.",
};

export function buildPrompt({ task, material, result, checks }: PromptBrief) {
  return `I need help with one work task. Use the information I provide and follow the requested result exactly.\n\nTHE JOB\n${task.trim() || "[Describe the job you want done.]"}\n\nWHAT YOU CAN USE\n${material.trim() || "[Paste a short public, made-up or approved non-confidential note.]"}\n\nWHAT I NEED BACK\n${result.trim() || "[Describe the result, format and length.]"}\n\nWHAT TO CHECK\n${checks.trim() || "[Name what must stay accurate and what the AI must not assume.]"}\n\nBefore you answer, check that the note contains enough information for the requested result. If a crucial detail is missing, ask me up to three specific questions and stop. Otherwise, produce the result without adding an introduction or extra task. Mark any detail you cannot confirm from the note as ‘Not specified’; do not fill it in yourself.\n\nAt the end, add a short ‘Check before use’ line naming the facts I should compare with my original note.`;
}
