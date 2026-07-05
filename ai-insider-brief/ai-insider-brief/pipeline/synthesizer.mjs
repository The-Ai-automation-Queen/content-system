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

  // Add metadata
  card.source_url = item.url;
  card.source_name = item.sourceName;

  return card;
}

// Validate card has all required fields and values
function validateCard(card) {
  var categories = ['Breaking', 'Tools', 'Privacy', 'Strategy', 'Marketing', 'Real Estate', 'Healthcare', 'Finance', 'Education', 'Media'];
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
