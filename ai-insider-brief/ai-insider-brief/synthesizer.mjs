// synthesizer.mjs — Filter and synthesize crawled items via Ollama or Gemini

import { FILTER_PROMPT, SYNTHESIZE_PROMPT } from './prompts.mjs';

// Rate-limit helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Call Ollama (local LLM on VPS)
async function callOllama(prompt, ollamaUrl, model) {
  var url = ollamaUrl + '/api/generate';
  var res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: model,
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.3,
        num_predict: 500
      }
    })
  });
  if (!res.ok) {
    var errText = await res.text();
    throw new Error('Ollama error: ' + res.status + ' ' + errText);
  }
  var data = await res.json();
  return data.response.trim();
}

// Call Gemini API (fallback)
async function callGemini(prompt, apiKey, model) {
  var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + apiKey;
  var res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 500
      }
    })
  });
  if (!res.ok) {
    var errText = await res.text();
    throw new Error('Gemini API error: ' + res.status + ' ' + errText);
  }
  var data = await res.json();
  return data.candidates[0].content.parts[0].text.trim();
}

// Unified LLM call — routes to Ollama or Gemini based on config
async function callLLM(prompt, config) {
  if (config.provider === 'ollama') {
    return await callOllama(prompt, config.ollamaUrl, config.model);
  } else {
    return await callGemini(prompt, config.apiKey, config.model);
  }
}

// Filter: should this article become a brief?
export async function filterItem(item, config) {
  var prompt = FILTER_PROMPT(item);
  var result = await callLLM(prompt, config);
  await sleep(500);
  return result.toUpperCase().includes('BRIEF');
}

// Synthesize: write the intelligence card
export async function synthesizeCard(item, config) {
  var prompt = SYNTHESIZE_PROMPT(item);
  var result = await callLLM(prompt, config);
  await sleep(500);

  // Clean up response — remove markdown backticks if present
  result = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  var card = JSON.parse(result);

  // Validate
  var valid = validateCard(card);
  if (!valid.ok) {
    throw new Error('Invalid card: ' + valid.reason);
  }

  // ACT integrity gate — demote fake ACTs to WATCH
  card = enforceActIntegrity(card);

  // Add metadata
  card.source_url = item.url;
  card.source_name = item.sourceName;

  return card;
}

// Hard gate against fake ACT verdicts.
// Demotes ACT to WATCH when verdict_text uses vague verbs or names an organisation as subject.
var FAKE_ACT_VERBS = /\b(consider|explore|evaluate|experiment with|stay (informed|on top of)|keep an eye|be (aware|prepared)|maximi[sz]e|leverage|navigate|harness|embrace|look into|think about|improve (performance|presence|experience|results))\b/i;
var ORG_SUBJECT = /^(companies|businesses|organi[sz]ations|enterprises|teams|the industry|firms|brands)\s+(should|must|need to|have to|ought to)/i;
var IMPERATIVE_OPENERS = /^(run|open|check|change|ask|download|audit|switch|disable|opt out|save|screenshot|read|review|update|delete|enable|set|turn (on|off)|copy|paste|test|verify|confirm|install|uninstall|export|import|share|forward|bookmark|subscribe|unsubscribe|toggle|adjust|configure|edit|create|measure|track|monitor|compare|search|browse|click|select|choose|pick|take|do|stop|start|pause|resume|join|leave|book|schedule|call|email|message|sign up|log in|log out)\b/i;

function enforceActIntegrity(card) {
  if (card.verdict !== 'ACT') return card;
  var t = (card.verdict_text || '').trim();
  if (FAKE_ACT_VERBS.test(t) || ORG_SUBJECT.test(t) || !IMPERATIVE_OPENERS.test(t)) {
    card.verdict = 'WATCH';
    card._demoted_from = 'ACT';
  }
  return card;
}

// Validate card has all required fields and values
function validateCard(card) {
  var categories = ['Breaking', 'Tools', 'Privacy', 'Strategy', 'Marketing', 'Real Estate', 'Health', 'Finance', 'Education', 'Media'];
  var verdicts = ['ACT', 'WATCH', 'IGNORE'];

  if (!card.category || categories.indexOf(card.category) === -1) {
    return { ok: false, reason: 'Invalid category: ' + card.category };
  }
  if (!card.headline || card.headline.length > 100) {
    return { ok: false, reason: 'Headline missing or too long' };
  }
  if (!card.narrative || card.narrative.length > 350) {
    return { ok: false, reason: 'Narrative missing or too long' };
  }
  if (!card.verdict || verdicts.indexOf(card.verdict) === -1) {
    return { ok: false, reason: 'Invalid verdict: ' + card.verdict };
  }
  if (!card.verdict_text) {
    return { ok: false, reason: 'Verdict text missing' };
  }
  if (!card.topics || !Array.isArray(card.topics) || card.topics.length === 0) {
    return { ok: false, reason: 'Topics missing' };
  }
  return { ok: true };
}
