// Draft-only reassessment of every legacy public card under contract v2.
// It checkpoints progress, never replaces briefs.json, never queues Telegram,
// and never contacts subscribers.

import { readFileSync, writeFileSync, existsSync, renameSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { enrichArticleItem } from './crawler.mjs';
import { synthesizeCard } from './synthesizer.mjs';
import { loadMergedConfig, resolvePipelineLLMConfig } from './config-loader.mjs';

const pipelineDir = dirname(fileURLToPath(import.meta.url));
function argValue(name) {
  const arg = process.argv.find((entry) => entry.startsWith(`--${name}=`));
  return arg ? arg.slice(arg.indexOf('=') + 1) : null;
}

const inputPath = resolve(argValue('input') || resolve(pipelineDir, '..', 'data', 'briefs.json'));
const outputPath = resolve(argValue('output') || resolve(pipelineDir, 'archive-reassessment.draft.json'));
const after = argValue('after');
const retryTechmeme = process.argv.includes('--retry-techmeme');
const offset = Math.max(0, Number(argValue('offset') || 0));
const stride = Math.max(1, Number(argValue('stride') || 1));
const limitArg = argValue('limit');
const limit = limitArg ? Math.max(1, Number(limitArg)) : Infinity;

function loadJson(path, fallback) {
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : fallback;
}

function saveDraft(draft) {
  const tempPath = outputPath + '.tmp';
  writeFileSync(tempPath, JSON.stringify(draft, null, 2) + '\n');
  renameSync(tempPath, outputPath);
}

function reviewKey(card, index) {
  // The old archive has duplicate IDs. URL plus position keeps every record
  // distinct until unique IDs are assigned during reviewed promotion.
  return `${index}:${card.id || 'missing'}:${card.source_url || 'no-source'}`;
}

function inferPublishedAt(card) {
  const explicit = card.source_published_at || card.timestamp || card.created_at;
  if (explicit && !Number.isNaN(new Date(explicit).getTime())) return new Date(explicit).toISOString();
  const url = String(card.source_url || '');
  let match = url.match(/\/((?:20)\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])(?:\/|$)/);
  if (match) return `${match[1]}-${match[2]}-${match[3]}T12:00:00.000Z`;
  match = url.match(/\/(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(?:\/|$)/);
  if (match) return `20${match[1]}-${match[2]}-${match[3]}T12:00:00.000Z`;
  return null;
}

const source = loadJson(inputPath, { cards: [] });
const inputCards = Array.isArray(source) ? source : (source.cards || []);
const seenUrls = new Set();
const cards = inputCards.filter((card) => {
  if (!card.source_url || seenUrls.has(card.source_url)) return false;
  seenUrls.add(card.source_url);
  const publishedAt = inferPublishedAt(card);
  return !after || (publishedAt && publishedAt >= `${after}T00:00:00.000Z`);
});
const draft = loadJson(outputPath, {
  generated_at: null,
  editorial_contract_version: 2,
  source_card_count: cards.length,
  results: {}
});
const { env, basePath, secretsPath } = loadMergedConfig(pipelineDir);
const llmConfig = resolvePipelineLLMConfig(env);

console.log(`Archive reassessment: ${cards.length} cards from ${inputCards.length} input records`);
console.log(`Config: ${basePath || 'none'} + ${secretsPath || 'no secrets file'}`);
console.log('Draft-only mode: publication is impossible from this command.');

let attempted = 0;
for (let index = 0; index < cards.length && attempted < limit; index++) {
  if (index % stride !== offset) continue;
  const legacy = cards[index];
  const key = reviewKey(legacy, index);
  if (draft.results[key]?.status === 'reviewed') continue;
  if (draft.results[key]?.status === 'hold' && !(retryTechmeme && /techmeme\.com/i.test(legacy.source_url || ''))) continue;
  attempted++;

  const item = {
    title: legacy.headline,
    url: legacy.source_url,
    sourceName: legacy.source_name,
    publishedAt: inferPublishedAt(legacy),
    content: legacy.narrative,
    content_source: 'legacy-summary',
    content_complete: false
  };

  try {
    await enrichArticleItem(item);
    if (item.content_fetch_warning) {
      throw new Error('Original source could not be read: ' + item.content_fetch_warning);
    }
    const card = await synthesizeCard(item, llmConfig);
    draft.results[key] = {
      status: 'reviewed',
      legacy,
      proposed: card,
      source_fetch_warning: item.content_fetch_warning || null
    };
    console.log(`[${index + 1}/${cards.length}] ${card.verdict}: ${legacy.headline}`);
  } catch (error) {
    draft.results[key] = {
      status: 'hold',
      legacy,
      reason: error.message,
      source_fetch_warning: item.content_fetch_warning || null
    };
    console.error(`[${index + 1}/${cards.length}] HOLD: ${legacy.headline}: ${error.message}`);
  }

  draft.generated_at = new Date().toISOString();
  saveDraft(draft);
}

const values = Object.values(draft.results);
const reviewed = values.filter((entry) => entry.status === 'reviewed').length;
const held = values.filter((entry) => entry.status === 'hold').length;
console.log(`Checkpoint: ${reviewed} reviewed, ${held} held, ${cards.length - values.length} remaining`);
console.log(`Draft: ${outputPath}`);
