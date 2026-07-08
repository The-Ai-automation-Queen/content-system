// AI Insider Brief — Telegram Approval Bot
// Runs 24/7 as persistent process. Reads cards-pending.json, sends to Telegram
// for approval, publishes approved cards to briefs.json.

import { init, sendMessage, sendMessageWithButtons, editMessage, answerCallbackQuery, getUpdates } from './telegram.mjs';
import { filterItem, synthesizeCard } from './synthesizer.mjs';
import { loadMergedConfig, resolveLLMConfig } from './config-loader.mjs';
import { getConfig as getNewsletterConfig, buildEmailHTML, selectCards, buildSubject, sendBroadcast } from './newsletter-sender.mjs';
import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

var __dirname = dirname(fileURLToPath(import.meta.url));

// Config — loaded from env
var BOT_TOKEN;
var CHAT_ID;
var BRIEFS_PATH;
var PENDING_PATH;
var PREVIEW_TRIGGER_PATH;
var LLM_CONFIG;

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
// TUESDAY SEND-APPROVAL FLOW
// Constitution Law 11 / Engine Law 1: agents queue, a human releases. This
// bot never calls Kit's send API on its own. It only ever gets there after
// the "Send to subscribers" button is tapped in the authorized Telegram
// chat. Cache is in-memory and keyed by the preview message_id; if the bot
// restarts between the preview and the tap, the cache is gone and the
// operator is told to run /preview again rather than risk sending stale data.
// ---------------------------------------------------------------------------

var previewCache = {}; // message_id -> { cards, mode, nlConfig }

async function buildTuesdayPreviewData() {
  var nlConfig = getNewsletterConfig();
  if (!existsSync(nlConfig.briefsPath)) return null;

  var briefsData;
  try {
    briefsData = JSON.parse(readFileSync(nlConfig.briefsPath, 'utf-8'));
  } catch (err) {
    console.error('[PREVIEW] Could not parse briefs.json: ' + err.message);
    return null;
  }

  var allCards = briefsData.cards || [];
  var mode = 'weekly'; // The Brief sends once a week, Tuesday only (see CONTEXT.md).
  var cards = selectCards(allCards, mode);

  return { cards: cards, mode: mode, nlConfig: nlConfig };
}

function formatPreviewMessage(data, statusLine) {
  var parts = [];
  parts.push('<b>Tuesday Brief: Send Preview</b>');
  parts.push('Subject: ' + escapeHtml(buildSubject(data.mode, new Date())));
  parts.push('Cards: ' + data.cards.length);
  parts.push('');

  if (data.cards.length === 0) {
    parts.push('No cards in this window. Sending now would deliver an empty issue.');
  } else {
    data.cards.slice(0, 5).forEach(function (c, i) {
      parts.push((i + 1) + '. [' + (c.category || 'UNCATEGORIZED') + '] ' + escapeHtml(c.headline || ''));
    });
    if (data.cards.length > 5) {
      parts.push('... +' + (data.cards.length - 5) + ' more');
    }
  }

  if (statusLine) {
    parts.push('');
    parts.push(statusLine);
  }

  return parts.join('\n');
}

// Sends the preview card with Send/Skip buttons. Nothing is sent to
// subscribers until "Send to subscribers" is tapped.
async function sendTuesdayPreview() {
  var data = await buildTuesdayPreviewData();
  if (!data) {
    await sendMessage(CHAT_ID, '⚠️ Could not build the Tuesday preview: briefs.json not found or unreadable.');
    return;
  }

  var text = formatPreviewMessage(data, null);
  var buttons = [
    { text: '✅ Send to subscribers', callback_data: 'tuesday:send' },
    { text: '⏭️ Skip this week', callback_data: 'tuesday:skip' }
  ];
  var sent = await sendMessageWithButtons(CHAT_ID, text, buttons);
  if (sent && sent.message_id) {
    previewCache[sent.message_id] = data;
  }
  console.log('[PREVIEW] Tuesday preview sent (' + data.cards.length + ' card(s)).');
}

// Handles the "Send to subscribers" / "Skip this week" button taps.
async function handleTuesdayCallback(action, messageId) {
  var data = previewCache[messageId];

  if (action === 'skip') {
    var skipText = data
      ? formatPreviewMessage(data, '⏭️ <b>SKIPPED THIS WEEK</b>')
      : '⏭️ <b>SKIPPED THIS WEEK</b>';
    await editMessage(CHAT_ID, messageId, skipText);
    delete previewCache[messageId];
    console.log('[PREVIEW] Tuesday send skipped by operator.');
    return;
  }

  if (action === 'send') {
    if (!data) {
      await editMessage(CHAT_ID, messageId, '⚠️ Preview data expired (bot restarted since /preview ran). Run /preview again before sending.');
      return;
    }

    await editMessage(CHAT_ID, messageId, formatPreviewMessage(data, '⏳ Sending...'));

    try {
      var html = buildEmailHTML(data.cards, data.mode);
      var subject = buildSubject(data.mode, new Date());
      var tagId = data.mode === 'daily' ? data.nlConfig.dailyTagId : data.nlConfig.weeklyTagId;
      var result = await sendBroadcast(data.nlConfig, subject, html, tagId);
      var broadcastId = result && result.broadcast ? result.broadcast.id : 'unknown';
      await editMessage(CHAT_ID, messageId, formatPreviewMessage(data, '✅ <b>SENT</b>. Kit broadcast ID: ' + escapeHtml(String(broadcastId))));
      console.log('[PREVIEW] Tuesday brief sent. Broadcast ID: ' + broadcastId);
    } catch (err) {
      await editMessage(CHAT_ID, messageId, formatPreviewMessage(data, '❌ <b>SEND FAILED</b>: ' + escapeHtml(err.message)));
      console.error('[PREVIEW] Tuesday send failed: ' + err.message);
    }

    delete previewCache[messageId];
  }
}

// Polled from the main loop. tuesday-preview.mjs (run by cron, Tuesday
// 05:30 GST) does not send anything itself — it drops a trigger file that
// this always-on bot picks up and turns into a Telegram preview with
// buttons. This mirrors checkNewPending()'s file-polling pattern instead of
// requiring the bot to expose an HTTP endpoint.
var lastPreviewTriggerCheck = 0;
var PREVIEW_TRIGGER_CHECK_INTERVAL = 10000; // 10 seconds

async function checkPreviewTrigger() {
  var now = Date.now();
  if (now - lastPreviewTriggerCheck < PREVIEW_TRIGGER_CHECK_INTERVAL) return;
  lastPreviewTriggerCheck = now;

  if (!PREVIEW_TRIGGER_PATH || !existsSync(PREVIEW_TRIGGER_PATH)) return;

  try {
    // Consume immediately so a slow Telegram call can't cause a double-fire.
    unlinkSync(PREVIEW_TRIGGER_PATH);
    console.log('[BOT] Tuesday preview trigger detected. Building preview...');
    await sendTuesdayPreview();
  } catch (err) {
    console.error('[BOT] Preview trigger error: ' + err.message);
  }
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

      // Check for a Tuesday preview trigger dropped by cron (tuesday-preview.mjs)
      await checkPreviewTrigger();

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

          // Tuesday send-approval flow. cardId here is 'send' or 'skip',
          // not a card id — see the 'tuesday:send' / 'tuesday:skip' buttons
          // built in sendTuesdayPreview().
          else if (action === 'tuesday') {
            await handleTuesdayCallback(cardId, query.message.message_id);
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

          // /preview — manually trigger the Tuesday send-approval preview
          // (normally fired by cron via tuesday-preview.mjs, Tuesday 05:30 GST).
          else if (msgText === '/preview' || msgText.indexOf('/preview') === 0 || msgText.indexOf('/preview@') === 0) {
            console.log('[BOT] /preview command received.');
            await sendTuesdayPreview();
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
  // Same config resolution as run.mjs: config.env (repo baseline) layered
  // under by the deployment secrets file, so LLM_PROVIDER/GEMINI_MODEL
  // survive even though the secrets file only carries tokens/keys.
  var loaded = loadMergedConfig(__dirname);
  var env = loaded.env;
  console.log('[BOT] Config base: ' + (loaded.basePath || 'not found'));
  console.log('[BOT] Config secrets: ' + (loaded.secretsPath || 'not found (base config.env only)'));

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    console.error('[BOT] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in config.');
    process.exit(1);
  }

  BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
  CHAT_ID = env.TELEGRAM_CHAT_ID;
  BRIEFS_PATH = env.BRIEFS_JSON_PATH || './data/briefs.json';
  PENDING_PATH = env.PENDING_PATH || './pipeline/cards-pending.json';
  PREVIEW_TRIGGER_PATH = env.PREVIEW_TRIGGER_PATH || './pipeline/preview-trigger.json';

  // LLM config for submit mode synthesis — only falls back to Ollama 3B
  // when Gemini is genuinely unconfigured, never as a silent default.
  try {
    LLM_CONFIG = resolveLLMConfig(env);
  } catch (err) {
    console.error('[BOT] ' + err.message);
    process.exit(1);
  }
  if (LLM_CONFIG.provider === 'ollama') {
    console.log('[BOT] LLM: Ollama (' + LLM_CONFIG.model + ') at ' + LLM_CONFIG.ollamaUrl);
  } else {
    console.log('[BOT] LLM: Gemini (' + LLM_CONFIG.model + ')');
  }

  init(BOT_TOKEN);
  await pollLoop();
}

main();
