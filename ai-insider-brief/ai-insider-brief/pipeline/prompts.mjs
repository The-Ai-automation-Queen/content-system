// prompts.mjs — Evidence-first editorial prompts for The AI Insider Brief.
//
// Contract v2 deliberately separates facts from judgment. The old prompt
// asked one small model to summarize an article and invent an action in the
// same pass. It also contained named ACT examples that leaked into unrelated
// cards. These prompts never include a reusable product recommendation.

function articleContext(item) {
  return `Article title: ${item.title || 'Untitled'}
Source: ${item.sourceName || 'Unknown'}
Published: ${item.publishedAt || 'Unknown'}
Content completeness: ${item.content_complete ? 'full article' : 'partial or unconfirmed'}
Content (${String(item.content || '').length} characters):
${item.content || ''}`;
}

export function FILTER_PROMPT(item) {
  return `You are the relevance filter for The AI Insider Brief, a curated intelligence feed for non-technical professionals.

The article must center on artificial intelligence, machine learning, generative tools, AI agents, AI automation, or AI policy. A passing mention is not enough.

Return BRIEF only when the article contains a real business, professional, consumer, legal, safety, privacy, product, pricing, or market signal. Vendor hype can pass only when it is useful to identify as noise later.

Return DISCARD for incidental AI mentions, developer-only patch notes with no wider consequence, duplicates, unsupported speculation, or content too incomplete to understand.

${articleContext(item)}

Respond with exactly one word: BRIEF or DISCARD`;
}

export function FACT_EXTRACTION_PROMPT(item) {
  return `You are the evidence extractor for The AI Insider Brief.

Your only job is to record what the supplied article supports. Do not advise the reader. Do not infer a menu path, deadline, price, availability, legal duty, or product capability that is not stated in the content.

Rules:
- Keep factual claims neutral and specific.
- Identify who is actually affected. Do not write "everyone" or "businesses" when the article names a narrower group.
- Each evidence item must contain a short source fragment copied from the supplied content. Keep each fragment under 160 characters.
- Record unknowns instead of filling gaps.
- Set content_complete to false when the supplied text appears truncated, paywalled, promotional, or lacks enough detail.
- Set source_confidence to high only for a complete primary source or a detailed report with attributable facts.

${articleContext(item)}

Respond with only valid JSON:
{
  "what_happened": ["2 to 5 factual statements"],
  "entities": ["named companies, products, laws, settings, documents or people"],
  "dates_and_deadlines": ["only dates stated in the content"],
  "affected_audiences": ["specific groups supported by the content"],
  "evidence": [
    {"id": "e1", "claim": "fact supported by the fragment", "source_text": "short source fragment"}
  ],
  "unknowns": ["important information the article does not establish"],
  "content_complete": true,
  "source_confidence": "high, medium, or low"
}`;
}

export function JUDGMENT_PROMPT(item, facts) {
  return `You are the judgment editor for The AI Insider Brief. You receive an evidence record made from one article. The default verdict is WATCH. ACT is rare. IGNORE is rarer.

EDITORIAL CONTRACT

ACT is allowed only when every condition is true:
1. The evidence directly supports the action.
2. The relevant tool, setting, document, person, price, or deadline exists in the evidence.
3. The action can be verified from the supplied evidence.
4. A specific affected audience is named.
5. The action is low-risk. Advice involving spending, compliance, privacy, employment, health, finance, security, or irreversible changes is not ACT without independent current verification.
6. There is a source-supported reason to do it now.
7. The reader can perform the action themselves.

WATCH is for a real signal whose action threshold has not been reached. It must name who should watch, what matters, and the concrete future event that would trigger action.

IGNORE is only for genuine noise. It must explain why the reader can safely skip it, such as no shipped product, no policy change, no availability change, or no evidence beyond promotion.

Rules:
- Most cards should be WATCH.
- Never create a product, recommendation, setting path, deadline, or action absent from the evidence.
- Every judgment must cite one or more evidence IDs.
- If the evidence is incomplete, ACT is forbidden.
- Do not use em dashes.
- Do not use vague filler such as stay informed, keep an eye on it, consider the implications, explore, leverage, be prepared, or navigate.
- Write for smart non-technical professionals. Use short direct sentences and no unexplained jargon.

CATEGORY OPTIONS
Breaking, Tools, Privacy, Strategy, Marketing, Real Estate, Healthcare, Finance, Education, Media.

ARTICLE
${articleContext(item)}

EVIDENCE RECORD
${JSON.stringify(facts)}

Respond with only valid JSON:
{
  "category": "one category option",
  "headline": "one clear line, maximum 80 characters",
  "narrative": "two or three factual sentences explaining what happened and why it matters, maximum 320 characters",
  "verdict": "ACT, WATCH, or IGNORE",
  "applies_to": ["one to three specific affected audiences"],
  "reason": "why this verdict follows from the evidence, maximum 180 characters",
  "trigger": "for WATCH, the concrete future event that would justify action, maximum 140 characters; otherwise null",
  "action": "for ACT, one exact source-supported action beginning with a direct verb; otherwise null",
  "evidence_ids": ["evidence IDs supporting the judgment"],
  "confidence": 0.0,
  "verification_warning": "an uncertainty or risk the human reviewer must see, otherwise null",
  "topics": ["one to three short topic labels"]
}`;
}

export function VERIFICATION_PROMPT(item, facts, draft) {
  return `You are the independent verifier for an AI news judgment. Try to disprove the draft. Use only the article and evidence record supplied here.

Return PASS only when the verdict, audience, reason, trigger or action, and every cited evidence ID are supported. ACT requires especially strict review.

Return DEMOTE when an ACT action is unsupported, unverifiable, not urgent, not audience-specific, high-risk, or based on incomplete content. The safe replacement is normally WATCH.

Return HOLD when the summary or judgment contains a factual claim not supported by the evidence, when cited evidence is missing, or when the content is too incomplete for a responsible card. HOLD means do not queue the card for publication.

Checks:
- Reject any product, setting, menu path, deadline, price, availability claim, or recommendation absent from the evidence.
- Reject urgency that the source does not establish.
- Reject vague audiences.
- For WATCH, require a concrete observable trigger.
- For IGNORE, require a specific evidence-based reason it is safe to skip.
- Do not use outside knowledge to rescue the draft.

ARTICLE
${articleContext(item)}

EVIDENCE RECORD
${JSON.stringify(facts)}

DRAFT
${JSON.stringify(draft)}

Respond with only valid JSON:
{
  "decision": "PASS, DEMOTE, or HOLD",
  "reasons": ["specific verification findings"],
  "unsupported_claims": ["draft claims not supported by an evidence ID"],
  "recommended_verdict": "ACT, WATCH, IGNORE, or null",
  "recommended_trigger": "a concrete trigger supported by the evidence, or null"
}`;
}
