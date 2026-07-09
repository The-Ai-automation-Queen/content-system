import { crawlSources } from './crawler.mjs';
import { filterItem, synthesizeCard } from './synthesizer.mjs';
import { loadMergedConfig, resolveLLMConfig } from './config-loader.mjs';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

var __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log('========================================');
  console.log('  THE AI INSIDER BRIEF — Pipeline Run');
  console.log('  ' + new Date().toISOString());
  console.log('========================================\n');

  // Load config — config.env (repo baseline) layered under by the
  // deployment secrets file, so LLM_PROVIDER/GEMINI_MODEL in config.env
  // survive even when the secrets file exists and only carries tokens/keys.
  var loaded = loadMergedConfig(__dirname);
  var env = loaded.env;
  console.log('[CONFIG] Base: ' + (loaded.basePath || 'not found'));
  console.log('[CONFIG] Secrets: ' + (loaded.secretsPath || 'not found (base config.env only)'));

  var llmConfig;
  try {
    llmConfig = resolveLLMConfig(env);
  } catch (err) {
    console.error('[ERROR] ' + err.message);
    process.exit(1);
  }

  if (llmConfig.provider === 'ollama') {
    console.log('[LLM] Using Ollama (' + llmConfig.model + ') at ' + llmConfig.ollamaUrl);
  } else {
    console.log('[LLM] Using Gemini (' + llmConfig.model + ')');
  }

  var maxCardsPerRun = parseInt(env.MAX_CARDS_PER_RUN) || 5;

  // Paths
  var briefsPath = env.BRIEFS_JSON_PATH || resolve(__dirname, '..', 'data', 'briefs.json');
  var statePath = env.STATE_JSON_PATH || resolve(__dirname, 'state.json');
  var sourcesPath = env.SOURCES_JSON_PATH || resolve(__dirname, 'sources.json');
  var pendingPath = env.PENDING_PATH || resolve(__dirname, 'cards-pending.json');

  // Load sources
  if (!existsSync(sourcesPath)) {
    console.error('[ERROR] sources.json not found at: ' + sourcesPath);
    process.exit(1);
  }
  var sourcesData = JSON.parse(readFileSync(sourcesPath, 'utf-8'));
  var sources = sourcesData.sources;
  console.log('[SOURCES] Loaded ' + sources.length + ' sources\n');

  // Load existing briefs for dedup
  var existingBriefs = [];
  if (existsSync(briefsPath)) {
    var briefsData = JSON.parse(readFileSync(briefsPath, 'utf-8'));
    existingBriefs = briefsData.cards || [];
  }
  console.log('[BRIEFS] ' + existingBriefs.length + ' existing cards\n');

  // Load pending (already-queued, not-yet-approved) cards for dedup. Without
  // this, the crawler re-fetches and re-queues the same story every run
  // until a human approves or rejects it.
  var pendingForDedup = [];
  if (existsSync(pendingPath)) {
    try {
      pendingForDedup = JSON.parse(readFileSync(pendingPath, 'utf-8'));
    } catch (err) {
      console.error('[WARN] Could not parse pending cards for dedup: ' + err.message);
    }
  }

  // Step 1: CRAWL
  console.log('--- STEP 1: CRAWLING ---\n');
  var rawItems = await crawlSources(sources, statePath, existingBriefs, {
    pendingCards: pendingForDedup,
    maxCardsPerRun: maxCardsPerRun
  });

  if (rawItems.length === 0) {
    console.log('\n[DONE] No new items found. Nothing to process.');
    return;
  }

  // Step 2: FILTER
  console.log('\n--- STEP 2: FILTERING ---\n');
  var briefItems = [];
  var discardCount = 0;

  for (var item of rawItems) {
    try {
      var shouldBrief = await filterItem(item, llmConfig);
      if (shouldBrief) {
        briefItems.push(item);
        console.log('[BRIEF] ' + item.title);
      } else {
        discardCount++;
        console.log('[DISCARD] ' + item.title);
      }
      // Rate limit
      await new Promise(function(r) { setTimeout(r, 500); });
    } catch (err) {
      console.error('[FILTER ERROR] ' + item.title + ': ' + err.message);
    }

    // Stop filtering if we already have enough candidates
    // (filter 3x the cap to have options, then stop)
    if (briefItems.length >= maxCardsPerRun * 3) {
      console.log('[FILTER] Enough candidates, stopping early');
      break;
    }
  }

  console.log('\n[FILTER SUMMARY] ' + briefItems.length + ' brief, ' + discardCount + ' discarded\n');

  if (briefItems.length === 0) {
    console.log('[DONE] No items passed the filter. All noise today.');
    return;
  }

  // Step 3: SYNTHESIZE
  console.log('--- STEP 3: SYNTHESIZING ---\n');
  var cards = [];

  for (var item of briefItems) {
    if (cards.length >= maxCardsPerRun) {
      console.log('[SYNTH] Reached cap of ' + maxCardsPerRun + ' cards');
      break;
    }
    try {
      var card = await synthesizeCard(item, llmConfig);
      cards.push(card);
      console.log('[CARD] ' + card.category + ' | ' + card.headline + ' | ' + card.verdict);
      // Rate limit
      await new Promise(function(r) { setTimeout(r, 500); });
    } catch (err) {
      console.error('[SYNTH ERROR] ' + item.title + ': ' + err.message);
    }
  }

  console.log('\n[SYNTH SUMMARY] ' + cards.length + ' cards synthesized\n');

  if (cards.length === 0) {
    console.log('[DONE] No cards synthesized successfully.');
    return;
  }

  // Step 4: QUEUE FOR APPROVAL
  console.log('--- STEP 4: QUEUING FOR APPROVAL ---\n');

  // Load existing pending cards fresh (the approval bot polls and mutates
  // this file independently, so re-read right before writing).
  var pending = [];
  if (existsSync(pendingPath)) {
    pending = JSON.parse(readFileSync(pendingPath, 'utf-8'));
  }

  // Add temp IDs and queue
  cards.forEach(function(card) {
    card.id = 'temp-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
    pending.push(card);
    console.log('[QUEUED] ' + card.headline);
  });

  writeFileSync(pendingPath, JSON.stringify(pending, null, 2));
  console.log('\n[DONE] ' + cards.length + ' cards queued for Telegram approval.');
  console.log('[DONE] The approval bot will send them to your Telegram shortly.\n');

  // Summary
  console.log('========================================');
  console.log('  PIPELINE SUMMARY');
  console.log('  Sources checked: ' + sources.length);
  console.log('  Raw items found: ' + rawItems.length);
  console.log('  Passed filter:   ' + briefItems.length);
  console.log('  Cards created:   ' + cards.length);
  console.log('  Queued for approval: ' + cards.length);
  console.log('========================================');
}

main().catch(function(err) {
  console.error('[FATAL] ' + err.message);
  console.error(err.stack);
  process.exit(1);
});
