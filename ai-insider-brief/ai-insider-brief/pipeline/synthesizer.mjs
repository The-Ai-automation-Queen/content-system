// synthesizer.mjs — Evidence extraction, judgment and independent verification.

import {
  FILTER_PROMPT,
  FACT_EXTRACTION_PROMPT,
  JUDGMENT_PROMPT,
  VERIFICATION_PROMPT
} from './prompts.mjs';
import {
  enforceEditorialContract,
  validateFacts,
  validateDraft
} from './editorial-contract.mjs';

const LLM_TIMEOUT_MS = 120000;

function llmFetch(url, options) {
  return fetch(url, Object.assign({}, options, { signal: AbortSignal.timeout(LLM_TIMEOUT_MS) }));
}

function sleep(ms) {
  return new Promise(function (resolve) { setTimeout(resolve, ms); });
}

async function callOllama(prompt, config) {
  var url = config.ollamaUrl + '/api/generate';
  var res = await llmFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: config.model,
      prompt: prompt,
      stream: false,
      format: config.expectJson ? 'json' : undefined,
      options: {
        temperature: config.temperature === undefined ? 0.1 : config.temperature,
        num_predict: config.maxOutputTokens || 1400
      }
    })
  });
  if (!res.ok) throw new Error('Ollama error: ' + res.status + ' ' + await res.text());
  var data = await res.json();
  return String(data.response || '').trim();
}

async function callGemini(prompt, config) {
  var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + config.model + ':generateContent?key=' + config.apiKey;
  var res = await llmFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: config.temperature === undefined ? 0.1 : config.temperature,
        maxOutputTokens: config.maxOutputTokens || 1400,
        responseMimeType: config.expectJson ? 'application/json' : 'text/plain'
      }
    })
  });
  if (!res.ok) throw new Error('Gemini API error: ' + res.status + ' ' + await res.text());
  var data = await res.json();
  return String(data.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
}

async function callOpenRouter(prompt, config) {
  var res = await llmFetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + config.apiKey,
      'HTTP-Referer': 'https://brief.shiftandlead.com',
      'X-Title': 'The AI Insider Brief'
    },
    body: JSON.stringify({
      model: config.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: config.temperature === undefined ? 0.1 : config.temperature,
      max_tokens: config.maxOutputTokens || 1400,
      response_format: config.expectJson ? { type: 'json_object' } : undefined
    })
  });
  if (!res.ok) throw new Error('OpenRouter error: ' + res.status + ' ' + await res.text());
  var data = await res.json();
  return String(data.choices?.[0]?.message?.content || '').trim();
}

async function callLLM(prompt, config, options) {
  var requestConfig = Object.assign({}, config, options || {});
  if (requestConfig.provider === 'ollama') return callOllama(prompt, requestConfig);
  if (requestConfig.provider === 'gemini') return callGemini(prompt, requestConfig);
  if (requestConfig.provider === 'openrouter') return callOpenRouter(prompt, requestConfig);
  throw new Error('Unsupported LLM provider: ' + requestConfig.provider);
}

function parseJsonResponse(result, stage) {
  var cleaned = String(result || '')
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim();
  var first = cleaned.indexOf('{');
  var last = cleaned.lastIndexOf('}');
  if (first === -1 || last <= first) throw new Error(stage + ' returned no JSON object');
  try {
    return JSON.parse(cleaned.slice(first, last + 1));
  } catch (err) {
    throw new Error(stage + ' returned invalid JSON: ' + err.message);
  }
}

function stageConfig(config, stage) {
  if (config && config.stages && config.stages[stage]) return config.stages[stage];
  return config;
}

async function stagePause(config) {
  await sleep(config.provider === 'ollama' ? 100 : 500);
}

export async function filterItem(item, config) {
  var selected = stageConfig(config, 'filter');
  var result = await callLLM(FILTER_PROMPT(item), selected, {
    expectJson: false,
    maxOutputTokens: 20,
    temperature: 0
  });
  await stagePause(selected);
  return /^BRIEF\b/i.test(result.trim());
}

export async function extractFacts(item, config) {
  var selected = stageConfig(config, 'extraction');
  var result = await callLLM(FACT_EXTRACTION_PROMPT(item), selected, {
    expectJson: true,
    maxOutputTokens: 1500,
    temperature: 0
  });
  await stagePause(selected);
  var facts = parseJsonResponse(result, 'Evidence extraction');
  var valid = validateFacts(facts);
  if (!valid.ok) throw new Error('Invalid evidence record: ' + valid.reason);
  return facts;
}

export async function draftJudgment(item, facts, config) {
  var selected = stageConfig(config, 'judgment');
  var result = await callLLM(JUDGMENT_PROMPT(item, facts), selected, {
    expectJson: true,
    maxOutputTokens: 1200,
    temperature: 0.1
  });
  await stagePause(selected);
  var draft = parseJsonResponse(result, 'Judgment');
  var valid = validateDraft(draft, facts);
  if (!valid.ok) throw new Error('Invalid judgment draft: ' + valid.reason);
  return draft;
}

export async function verifyJudgment(item, facts, draft, config) {
  var selected = stageConfig(config, 'verification');
  var result = await callLLM(VERIFICATION_PROMPT(item, facts, draft), selected, {
    expectJson: true,
    maxOutputTokens: 800,
    temperature: 0
  });
  await stagePause(selected);
  var verification = parseJsonResponse(result, 'Verification');
  if (['PASS', 'DEMOTE', 'HOLD'].indexOf(String(verification.decision || '').toUpperCase()) === -1) {
    throw new Error('Invalid verification decision');
  }
  verification.decision = String(verification.decision).toUpperCase();
  return verification;
}

export async function synthesizeCard(item, config) {
  var facts = await extractFacts(item, config);
  var draft = await draftJudgment(item, facts, config);
  var verification = await verifyJudgment(item, facts, draft, config);
  var enforced = enforceEditorialContract(draft, facts, item, verification);

  if (!enforced.ok) throw new Error('Editorial contract rejected card: ' + enforced.reason);

  var card = enforced.card;
  card.source_url = item.url || '';
  card.source_name = item.sourceName || 'Unknown';
  card.source_published_at = item.publishedAt || null;
  card.article_content_chars = String(item.content || '').length;
  card.article_content_complete = Boolean(item.content_complete);
  return card;
}
