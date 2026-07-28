// editorial-contract.mjs — Deterministic safety gates for evidence-first cards.

export const EDITORIAL_CONTRACT_VERSION = 2;

const CATEGORIES = [
  'Breaking', 'Tools', 'Privacy', 'Strategy', 'Marketing', 'Real Estate',
  'Healthcare', 'Finance', 'Education', 'Media'
];

const VERDICTS = ['ACT', 'WATCH', 'IGNORE'];

const VAGUE_AUDIENCES = /^(everyone|anyone|all (people|professionals|businesses)|businesses|companies|professionals|users|readers|people)$/i;
const VAGUE_ACTIONS = /\b(consider|explore|evaluate|experiment with|stay informed|stay on top of|keep an eye|be aware|be prepared|maximi[sz]e|leverage|navigate|harness|embrace|look into|think about|improve performance)\b/i;
const IMPERATIVE_OPENERS = /^(open|check|change|ask|download|audit|switch|disable|opt out|save|read|review|update|delete|enable|set|turn (?:on|off)|test|verify|confirm|install|uninstall|export|import|share|forward|bookmark|toggle|adjust|configure|edit|create|measure|compare|search|click|select|stop|start|pause|resume|call|email|message|sign up|log in|log out)\b/i;
const HIGH_RISK = /\b(buy|purchase|pay|spend|invest|legal|law|regulat|compliance|privacy|personal data|security|medical|health|diagnos|treat|finance|financial|tax|insurance|hire|fire|employment|delete|disable|transfer|publish|send)\b/i;
const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'before', 'by', 'do', 'for', 'from',
  'in', 'is', 'it', 'its', 'of', 'on', 'or', 'that', 'the', 'their', 'this', 'to',
  'your', 'you', 'with', 'within', 'now', 'today', 'week', 'account', 'team'
]);

function normalizeArray(value) {
  if (!Array.isArray(value)) return [];
  return value.map(function (entry) { return String(entry || '').trim(); }).filter(Boolean);
}

function clampConfidence(value) {
  var parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.min(1, parsed));
}

function cleanText(value) {
  return String(value || '').replace(/[\u2013\u2014]/g, ':').replace(/\s+/g, ' ').trim();
}

function evidenceIdSet(facts) {
  return new Set(normalizeArray((facts.evidence || []).map(function (entry) { return entry && entry.id; })));
}

function hasValidEvidenceIds(card, facts) {
  var available = evidenceIdSet(facts);
  var cited = normalizeArray(card.evidence_ids);
  return cited.length > 0 && cited.every(function (id) { return available.has(id); });
}

function hasSpecificAudience(card) {
  var audiences = normalizeArray(card.applies_to);
  return audiences.length > 0 && audiences.every(function (audience) {
    return audience.length >= 4 && !VAGUE_AUDIENCES.test(audience);
  });
}

function meaningfulTokens(text) {
  return cleanText(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(function (token) { return token.length > 2 && !STOPWORDS.has(token); });
}

function sourceSupportsAction(action, item, facts) {
  var source = cleanText((item && item.content) || '').toLowerCase();
  var evidence = cleanText((facts.evidence || []).map(function (entry) {
    return (entry.claim || '') + ' ' + (entry.source_text || '');
  }).join(' ')).toLowerCase();
  var haystack = source + ' ' + evidence;
  var tokens = Array.from(new Set(meaningfulTokens(action)));

  // A real action must share at least two meaningful terms with the supplied
  // source/evidence. This blocks named recommendations copied from a prompt.
  var supported = tokens.filter(function (token) { return haystack.includes(token); });
  return supported.length >= Math.min(2, tokens.length) && tokens.length >= 2;
}

function fallbackTrigger(card, verification) {
  return cleanText(
    card.trigger ||
    (verification && verification.recommended_trigger) ||
    'A primary source confirms a concrete change that affects the named audience'
  );
}

function demoteToWatch(card, reason, verification) {
  card._demoted_from = card.verdict;
  card.verdict = 'WATCH';
  card.action = null;
  card.trigger = fallbackTrigger(card, verification);
  card.verification_warning = cleanText(card.verification_warning || reason);
  return card;
}

export function validateFacts(facts) {
  if (!facts || typeof facts !== 'object') return { ok: false, reason: 'Evidence record missing' };
  if (!Array.isArray(facts.what_happened) || facts.what_happened.length === 0) {
    return { ok: false, reason: 'No factual summary' };
  }
  if (!Array.isArray(facts.evidence) || facts.evidence.length === 0) {
    return { ok: false, reason: 'No source evidence' };
  }
  var ids = new Set();
  for (var i = 0; i < facts.evidence.length; i++) {
    var entry = facts.evidence[i] || {};
    if (!entry.id || !entry.claim || !entry.source_text) {
      return { ok: false, reason: 'Incomplete evidence item' };
    }
    if (ids.has(entry.id)) return { ok: false, reason: 'Duplicate evidence ID: ' + entry.id };
    ids.add(entry.id);
  }
  if (['high', 'medium', 'low'].indexOf(facts.source_confidence) === -1) {
    return { ok: false, reason: 'Invalid source confidence' };
  }
  return { ok: true };
}

export function validateDraft(card, facts) {
  if (!card || typeof card !== 'object') return { ok: false, reason: 'Card missing' };
  if (CATEGORIES.indexOf(card.category) === -1) return { ok: false, reason: 'Invalid category' };
  if (!cleanText(card.headline) || cleanText(card.headline).length > 110) return { ok: false, reason: 'Invalid headline' };
  if (!cleanText(card.narrative) || cleanText(card.narrative).length > 500) return { ok: false, reason: 'Invalid narrative' };
  if (VERDICTS.indexOf(card.verdict) === -1) return { ok: false, reason: 'Invalid verdict' };
  if (!hasSpecificAudience(card)) return { ok: false, reason: 'Affected audience missing or vague' };
  if (!cleanText(card.reason)) return { ok: false, reason: 'Verdict reason missing' };
  if (!hasValidEvidenceIds(card, facts)) return { ok: false, reason: 'Evidence citation missing or invalid' };
  if (!Array.isArray(card.topics) || card.topics.length === 0) return { ok: false, reason: 'Topics missing' };
  if (card.verdict === 'ACT' && !cleanText(card.action)) return { ok: false, reason: 'ACT action missing' };
  if (card.verdict === 'WATCH' && !cleanText(card.trigger)) return { ok: false, reason: 'WATCH trigger missing' };
  return { ok: true };
}

export function enforceEditorialContract(draft, facts, item, verification) {
  var card = JSON.parse(JSON.stringify(draft));
  var decision = cleanText(verification && verification.decision).toUpperCase();

  card.headline = cleanText(card.headline);
  card.narrative = cleanText(card.narrative);
  card.reason = cleanText(card.reason);
  card.trigger = card.trigger ? cleanText(card.trigger) : null;
  card.action = card.action ? cleanText(card.action) : null;
  card.applies_to = normalizeArray(card.applies_to).map(cleanText);
  card.evidence_ids = normalizeArray(card.evidence_ids);
  card.topics = normalizeArray(card.topics).slice(0, 3);
  card.confidence = clampConfidence(card.confidence);
  card.verification_warning = card.verification_warning ? cleanText(card.verification_warning) : null;

  if (decision === 'HOLD') {
    return {
      ok: false,
      reason: 'Independent verifier placed card on hold: ' + normalizeArray(verification.reasons).join('; ')
    };
  }

  if (decision !== 'PASS' && decision !== 'DEMOTE') {
    return { ok: false, reason: 'Independent verification result missing or invalid' };
  }

  var draftValidation = validateDraft(card, facts);
  if (!draftValidation.ok) return draftValidation;

  if (card.verdict === 'ACT') {
    var fullEnough = Boolean(item && item.content_complete) && String(item.content || '').length >= 3000 && facts.content_complete !== false;
    var action = cleanText(card.action);
    var actFailure = null;

    if (decision !== 'PASS') actFailure = 'Independent verifier did not approve ACT';
    else if (!fullEnough) actFailure = 'ACT requires a complete article of at least 3,000 characters';
    else if (facts.source_confidence !== 'high') actFailure = 'ACT requires high source confidence';
    else if (card.confidence < 0.85) actFailure = 'ACT confidence is below 0.85';
    else if (!IMPERATIVE_OPENERS.test(action) || VAGUE_ACTIONS.test(action)) actFailure = 'ACT is not a concrete direct action';
    else if (HIGH_RISK.test(action)) actFailure = 'ACT touches a high-risk decision without independent current verification';
    else if (!sourceSupportsAction(action, item, facts)) actFailure = 'ACT introduces terms not supported by the source evidence';

    if (actFailure) card = demoteToWatch(card, actFailure, verification);
  } else if (decision === 'DEMOTE') {
    card = demoteToWatch(card, 'Independent verifier required a safer verdict', verification);
  }

  if (card.verdict === 'WATCH') {
    card.trigger = fallbackTrigger(card, verification);
    if (!card.trigger || card.trigger.length < 12) {
      return { ok: false, reason: 'WATCH trigger is not concrete enough' };
    }
  }

  if (card.verdict === 'IGNORE' && (card.confidence < 0.75 || facts.content_complete === false)) {
    card = demoteToWatch(card, 'IGNORE requires complete evidence and at least 0.75 confidence', verification);
  }

  card.editorial_contract_version = EDITORIAL_CONTRACT_VERSION;
  card.verification = {
    status: card._demoted_from ? 'demoted' : 'verified',
    verified_verdict: card.verdict,
    checked_at: new Date().toISOString(),
    reasons: normalizeArray(verification.reasons),
    unsupported_claims: normalizeArray(verification.unsupported_claims)
  };
  card.evidence = facts.evidence;
  card.source_confidence = facts.source_confidence;
  card.unknowns = normalizeArray(facts.unknowns);
  card.verdict_text = card.verdict === 'ACT'
    ? card.action
    : card.verdict === 'WATCH'
      ? card.reason + ' Trigger: ' + card.trigger + '.'
      : card.reason;

  return { ok: true, card: card };
}

export function isCurrentEditorialCard(card) {
  return Boolean(card) && card.editorial_contract_version === EDITORIAL_CONTRACT_VERSION;
}
