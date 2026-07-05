// AI Insider Brief — Telegram Approval Bot
// Runs 24/7 as persistent process. Reads cards-pending.json, sends to Telegram
// for approval, publishes approved cards to briefs.json.

import { init, sendMessage, sendMessageWithButtons, editMessage, answerCallbackQuery, getUpdates } from './telegram.mjs';
import { filterItem, synthesizeCard } from './synthesizer.mjs';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

// Config — loaded from env
var BOT_TOKEN;
var CHAT_ID;
var BRIEFS_PATH;
var PENDING_PATH;
var LLM_CONFIG;

// Load env from file
function loadEnv(envPath) {
  var content = readFileSync(envPath, 'utf-8');
  var env = {};
  var lines = content.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (!line || line.startsWith('#')) continue;
    var eqIdx = line.indexOf('=');
    if (eqIdx <= 0) continue;
    var key = line.substring(0, eqIdx).trim();
    var val = line.substring(eqIdx + 1).trim();
    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

// Verdict emoji mapping
function verdictEmoji(verdict) {
  if (!verdict) return '';
  var v = verdict.toUpperCase();
  if (v === 'ACT') return '🟢';
  if (v === 'WATCH') return '🟣';
  if (v === 'IGNORE') return '⚫';
  return '';
}

// Format a card for Telegram display
function formatCardMessage(card) {
  var parts = [];

  parts.push('📌 ' + (card.category || 'UNCATEGORIZED').toUpperCase());
  parts.push('');
  parts.push('<b>' + escapeHtml(card.headline || '') + '</b>');
  parts.push('');
  parts.push(escapeHtml(card.narrative || ''));
  parts.push('');

  var emoji = verdictEmoji(card.verdict);
  parts.push(emoji + ' <b>' + (card.verdict || '').toUpperCase() + '</b>: ' + escapeHtml(card.verdict_text || ''));
  parts.push('');

  if (card.topics && card.topics.length > 0) {
    var topicList = Array.isArray(card.topics) ? card.topics.join(', ') : card.topics;
    parts.push('Topics: ' + escapeHtml(topicList));
  }

  return parts.join('\n');
}

// Escape HTML special characters for Telegram
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Send a card for approval
async function sendForApproval(card) {
  var text = formatCardMessage(card);
  var buttons = [
    { text: '✅ Approve', callback_data: 'approve:' + card.id },
    { text: '✏️ Edit', callback_data: 'edit:' + card.id },
    { text: '❌ Reject', callback_data: 'reject:' + card.id }
  ];
  return await sendMessageWithButtons(CHAT_ID, text, buttons);
}

// Ensure directory exists for a file path
function ensureDir(filePath) {
  var dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

// Add approved card to briefs.json
function publishCard(card) {
  ensureDir(BRIEFS_PATH);

  var briefs = { cards: [] };
  if (existsSync(BRIEFS_PATH)) {
    try {
      briefs = JSON.parse(readFileSync(BRIEFS_PATH, 'utf-8'));
    } catch (err) {
      console.error('[PUBLISH] Failed to parse briefs.json, starting fresh:', err.message);
      briefs = { cards: [] };
    }
  }

  // Generate ID: YYYY-MM-DD-NNN
  var today = new Date();
  var dateStr = today.toISOString().slice(0, 10);
  var todayCards = briefs.cards.filter(function(c) { return c.id && c.id.startsWith(dateStr); });
  var num = String(todayCards.length + 1).padStart(3, '0');

  card.id = dateStr + '-' + num;
  card.date = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
  card.timestamp = today.toISOString();

  // Prepend (newest first)
  briefs.cards.unshift(card);
  writeFileSync(BRIEFS_PATH, JSON.stringify(briefs, null, 2));

  console.log('[PUBLISH] Card published: ' + card.headline + ' (' + card.id + ')');
}

// Load pending cards
function loadPending() {
  if (!existsSync(PENDING_PATH)) return [];
  try {
    return JSON.parse(readFileSync(PENDING_PATH, 'utf-8'));
  } catch (err) {
    console.error('[PENDING] Failed to parse pending file:', err.message);
    return [];
  }
}

function savePending(cards) {
  ensureDir(PENDING_PATH);
  writeFileSync(PENDING_PATH, JSON.stringify(cards, null, 2));
}

function removePending(cardId) {
  var pending = loadPending();
  pending = pending.filter(function(c) { return c.id !== cardId; });
  savePending(pending);
}

// ---------------------------------------------------------------------------
// SUBMIT MODE — forward a URL or paste text to create a brief
// ---------------------------------------------------------------------------

function extractUrl(text) {
  var match = text.match(/https?:\/\/[^\s<>"']+/i);
  return match ? match[0] : null;
}

function stripHtmlBot(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchArticleContent(url) {
  var res = await fetch(url, {
    headers: { 'User-Agent': 'AI-Insider-Brief/1.0' },
    signal: AbortSignal.timeout(15000)
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  var html = await res.text();

  var title = '';
  var ogTitle = html.match(/property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
  if (ogTitle) {
    title = ogTitle[1];
  } else {
    var titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (titleTag) title = stripHtmlBot(titleTag[1]);
  }

  var paragraphs = [];
  var pRe = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  var pMatch;
  while ((pMatch = pRe.exec(html)) !== null) {
    var pText = stripHtmlBot(pMatch[1]).trim();
    if (pText.length > 40) paragraphs.push(pText);
  }
  var content = paragraphs.join(' ').slice(0, 800);
  var domain = new URL(url).hostname.replace('www.', '');

  return {
    title: title || 'Untitled',
    content: content || 'No content extracted',
    url: url,
    sourceName: domain,
    sourceTier: 2,
    categoryAffinity: [],
    publishedAt: new Date().toISOString()
  };
}

function buildItemFromText(text) {
  var lines = text.split('\n').filter(function(l) { return l.trim().length > 0; });
  var title = lines[0] || 'Manual submission';
  var content = lines.slice(1).join(' ').slice(0, 800) || title;

  return {
    title: title.slice(0, 120),
    content: content,
    url: '',
    sourceName: 'Manual submission',
    sourceTier: 2,
    categoryAffinity: [],
    publishedAt: new Date().toISOString()
  };
}

async function processSubmission(item) {
  var card = await synthesizeCard(item, LLM_CONFIG);
  card.source_url = item.url || '';
  card.source_name = item.sourceName || 'Manual';
  card.id = 'submit-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);

  var pending = loadPending();
  pending.push(card);
  savePending(pending);
  return card;
}

// State for edit mode
var editState = {}; // chatId -> { card, messageId }

// Check for new pending cards periodically
var lastPendingCheck = 0;
var PENDING_CHECK_INTERVAL = 10000; // 10 seconds

async function checkNewPending() {
  var now = Date.now();
  if (now - lastPendingCheck < PENDING_CHECK_INTERVAL) return;
  lastPendingCheck = now;

  var pending = loadPending();
  var hasNew = false;
  for (var i = 0; i < pending.length; i++) {
    if (!pending[i]._sent) {
      console.log('[BOT] New pending card found: ' + pending[i].headline);
      await sendForApproval(pending[i]);
      pending[i]._sent = true;
      hasNew = true;
    }
  }
  if (hasNew) {
    savePending(pending);
  }
}

// Main polling loop
async function pollLoop() {
  var offset = 0;

  console.log('[BOT] AI Insider Brief approval bot started. Waiting for approvals...');
  console.log('[BOT] Briefs path: ' + BRIEFS_PATH);
  console.log('[BOT] Pending path: ' + PENDING_PATH);

  // Send any unsent pending cards on startup
  var pending = loadPending();
  for (var i = 0; i < pending.length; i++) {
    if (!pending[i]._sent) {
      console.log('[BOT] Sending pending card: ' + pending[i].headline);
      await sendForApproval(pending[i]);
      pending[i]._sent = true;
    }
  }
  if (pending.length > 0) {
    savePending(pending);
    console.log('[BOT] Sent ' + pending.length + ' pending card(s) for approval.');
  } else {
    console.log('[BOT] No pending cards. Watching for new ones...');
  }

  while (true) {
    try {
      // Check for new pending cards between polls
      await checkNewPending();

      var updates = await getUpdates(offset);

      for (var j = 0; j < updates.length; j++) {
        var update = updates[j];
        offset = update.update_id + 1;

        // Chat-ID auth gate. Drop everything not from the authorized chat.
        var _incomingChatId = update.callback_query
          ? (update.callback_query.message && update.callback_query.message.chat && update.callback_query.message.chat.id)
          : (update.message && update.message.chat && update.message.chat.id);
        if (_incomingChatId === undefined || String(_incomingChatId) !== String(CHAT_ID)) {
          console.warn('[auth] rejected update from chat_id=', _incomingChatId);
          continue;
        }

        // Handle callback query (button press)
        if (update.callback_query) {
          var query = update.callback_query;
          var data = query.data;
          var colonIdx = data.indexOf(':');
          var action = data.substring(0, colonIdx);
          var cardId = data.substring(colonIdx + 1);

          await answerCallbackQuery(query.id);

          if (action === 'approve') {
            var pendingCards = loadPending();
            var card = null;
            for (var k = 0; k < pendingCards.length; k++) {
              if (pendingCards[k].id === cardId) { card = pendingCards[k]; break; }
            }
            if (card) {
              // Clean internal fields
              delete card._sent;
              var tempId = card.id;
              delete card.id; // Will be regenerated by publishCard
              publishCard(card);
              removePending(tempId);
              await editMessage(CHAT_ID, query.message.message_id, formatCardMessage(card) + '\n\n✅ <b>APPROVED AND PUBLISHED</b>');
            } else {
              await editMessage(CHAT_ID, query.message.message_id, '⚠️ Card not found in pending queue (may have been already processed).');
            }
          }

          else if (action === 'edit') {
            var pendingCards = loadPending();
            var card = null;
            for (var k = 0; k < pendingCards.length; k++) {
              if (pendingCards[k].id === cardId) { card = pendingCards[k]; break; }
            }
            if (card) {
              editState[CHAT_ID] = { card: card, messageId: query.message.message_id };
              await editMessage(
                CHAT_ID,
                query.message.message_id,
                formatCardMessage(card) +
                '\n\n✏️ <b>Send your corrections as a text message.</b>' +
                '\nFormat: <code>field=value</code>' +
                '\n\nEditable fields: <code>headline</code>, <code>narrative</code>, <code>verdict</code>, <code>verdict_text</code>, <code>category</code>' +
                '\n\nExample: <code>headline=New headline text here</code>'
              );
              console.log('[BOT] Edit mode activated for card: ' + cardId);
            }
          }

          else if (action === 'reject') {
            removePending(cardId);
            await editMessage(CHAT_ID, query.message.message_id, '❌ <b>REJECTED AND DISCARDED</b>');
            console.log('[BOT] Card rejected: ' + cardId);
          }
        }

        // Handle text message
        else if (update.message && update.message.text) {
          var msgText = update.message.text.trim();

          // EDIT MODE — field=value corrections
          if (editState[CHAT_ID]) {
            var es = editState[CHAT_ID];

            var eqIndex = msgText.indexOf('=');
            if (eqIndex > 0) {
              var field = msgText.substring(0, eqIndex).trim().toLowerCase();
              var value = msgText.substring(eqIndex + 1).trim();

              var validFields = ['headline', 'narrative', 'verdict', 'verdict_text', 'category'];
              if (validFields.indexOf(field) !== -1) {
                es.card[field] = value;

                var pendingCards = loadPending();
                for (var k = 0; k < pendingCards.length; k++) {
                  if (pendingCards[k].id === es.card.id) {
                    pendingCards[k] = es.card;
                    break;
                  }
                }
                savePending(pendingCards);
                console.log('[BOT] Card updated: ' + field + ' = ' + value);
              } else {
                await sendMessageWithButtons(CHAT_ID,
                  '\u26a0\ufe0f Unknown field: <code>' + escapeHtml(field) + '</code>\n\nValid fields: <code>headline</code>, <code>narrative</code>, <code>verdict</code>, <code>verdict_text</code>, <code>category</code>',
                  []
                );
                continue;
              }
            }

            delete editState[CHAT_ID];
            await sendForApproval(es.card);
            console.log('[BOT] Card re-sent for approval after edit.');
          }

          // SUBMIT MODE — URL detected → fetch, synthesize, queue
          else if (extractUrl(msgText)) {
            var url = extractUrl(msgText);
            console.log('[SUBMIT] URL received: ' + url);
            await sendMessage(CHAT_ID, '\u23f3 Fetching and analyzing: <code>' + escapeHtml(url) + '</code>');

            try {
              var item = await fetchArticleContent(url);
              console.log('[SUBMIT] Fetched: ' + item.title);

              var card = await processSubmission(item);
              console.log('[SUBMIT] Card created: ' + card.headline);

              await sendForApproval(card);
            } catch (err) {
              console.error('[SUBMIT ERROR] ' + err.message);
              await sendMessage(CHAT_ID, '\u274c Could not process: ' + escapeHtml(err.message));
            }
          }

          // SUBMIT MODE — long text (>100 chars) → treat as newsletter content
          else if (msgText.length > 100) {
            console.log('[SUBMIT] Text received (' + msgText.length + ' chars)');
            await sendMessage(CHAT_ID, '\u23f3 Analyzing submitted text...');

            try {
              var item = buildItemFromText(msgText);
              var card = await processSubmission(item);
              console.log('[SUBMIT] Card created from text: ' + card.headline);

              await sendForApproval(card);
            } catch (err) {
              console.error('[SUBMIT ERROR] ' + err.message);
              await sendMessage(CHAT_ID, '\u274c Could not process text: ' + escapeHtml(err.message));
            }
          }
        }
      }
    } catch (err) {
      console.error('[BOT ERROR] ' + err.message);
      // Wait 5 seconds before retrying on error
      await new Promise(function(r) { setTimeout(r, 5000); });
    }
  }
}

// Entry point
async function main() {
  // Try multiple env file locations
  var envPath = process.env.ENV_PATH || '';
  var paths = [
    envPath,
    '/root/ai-insider-brief-pipeline/.env',
    'C:\\Secrets\\insider-brief.env',
    './config.env'
  ].filter(Boolean);

  var env = null;
  for (var i = 0; i < paths.length; i++) {
    if (existsSync(paths[i])) {
      console.log('[BOT] Loading env from: ' + paths[i]);
      env = loadEnv(paths[i]);
      break;
    }
  }

  if (!env || !env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    console.error('[BOT] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in env.');
    console.error('[BOT] Searched paths: ' + paths.join(', '));
    process.exit(1);
  }

  BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
  CHAT_ID = env.TELEGRAM_CHAT_ID;
  BRIEFS_PATH = env.BRIEFS_JSON_PATH || './data/briefs.json';
  PENDING_PATH = env.PENDING_PATH || './pipeline/cards-pending.json';

  // LLM config for submit mode synthesis
  var llmProvider = env.LLM_PROVIDER || 'ollama';
  if (llmProvider === 'ollama') {
    LLM_CONFIG = {
      provider: 'ollama',
      ollamaUrl: env.OLLAMA_URL || 'http://localhost:11434',
      model: env.OLLAMA_MODEL || 'qwen2.5:3b'
    };
    console.log('[BOT] LLM: Ollama (' + LLM_CONFIG.model + ')');
  } else {
    LLM_CONFIG = {
      provider: 'gemini',
      apiKey: env.GEMINI_API_KEY || process.env.GEMINI_API_KEY,
      model: env.GEMINI_MODEL || 'gemini-2.0-flash'
    };
    console.log('[BOT] LLM: Gemini (' + LLM_CONFIG.model + ')');
  }

  init(BOT_TOKEN);
  await pollLoop();
}

main();
