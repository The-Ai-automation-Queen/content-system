export function grokResearchPrompt(topic: string) {
  return `You are helping me check public X posts about ${topic.trim() || "[PUBLIC ACCOUNT OR TOPIC]"}. Do one read-only search for the past seven days. Do not schedule it.

If you need the X connector or a sign-in, stop and tell me what access is required. I will review the connection and sign in myself. Do not connect other accounts.

Find up to ten original public posts that mention the account or topic directly. Exclude obvious duplicates and unrelated uses of the same words. Open each post before including it. If the search cannot reach X, say so instead of guessing.

Group the useful posts under:
1. Questions someone could answer.
2. Problems someone should investigate.
3. Other relevant signals.

For each item, give the post date, a short neutral description, the direct URL and a suggested next step for my review. Keep a post in only one group. If a group is empty, say “none found in this search”; do not claim that no such posts exist.

Finish with the two posts I should open first and why. Mark any possible reply as a draft idea. Do not post, reply, send a direct message, contact anyone, update a CRM, create another Bot or start a routine. Stop after the brief.`;
}
