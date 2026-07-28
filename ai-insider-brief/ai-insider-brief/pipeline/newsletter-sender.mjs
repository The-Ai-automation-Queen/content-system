// newsletter-sender.mjs — Compile daily/weekly briefs and send via Kit (ConvertKit)
// Usage:
//   node newsletter-sender.mjs daily    — sends today's briefs to daily subscribers
//   node newsletter-sender.mjs weekly   — sends last 7 days' briefs to weekly subscribers

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { loadMergedConfig } from './config-loader.mjs';
import { isCurrentEditorialCard } from './editorial-contract.mjs';

var __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

// Exported so approval-bot.mjs's Tuesday send-approval flow (task: human
// releases, agents only queue) can build the exact same broadcast this
// script would send, without duplicating the config/env resolution logic.
export function getConfig() {
  var env = loadMergedConfig(__dirname).env;

  return {
    kitApiSecret: env.KIT_API_SECRET || process.env.KIT_API_SECRET,
    kitApiKey: env.KIT_API_KEY || process.env.KIT_API_KEY || 'bvkVWvPgYeSP4-QJr0NGiw',
    dailyTagId: env.KIT_DAILY_TAG_ID || process.env.KIT_DAILY_TAG_ID,
    weeklyTagId: env.KIT_WEEKLY_TAG_ID || process.env.KIT_WEEKLY_TAG_ID,
    briefsPath: env.BRIEFS_JSON_PATH || resolve(__dirname, '..', 'data', 'briefs.json')
  };
}

// ---------------------------------------------------------------------------
// Date helpers
// ---------------------------------------------------------------------------

function formatDateDMY(date) {
  var d = String(date.getDate()).padStart(2, '0');
  var m = String(date.getMonth() + 1).padStart(2, '0');
  var y = date.getFullYear();
  return d + '/' + m + '/' + y;
}

function isSameDay(dateStr, target) {
  var d = new Date(dateStr);
  return d.getFullYear() === target.getFullYear() &&
    d.getMonth() === target.getMonth() &&
    d.getDate() === target.getDate();
}

function isWithinDays(dateStr, days) {
  var d = new Date(dateStr);
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return d >= cutoff;
}

// ---------------------------------------------------------------------------
// Verdict emoji
// ---------------------------------------------------------------------------

function verdictEmoji(verdict) {
  if (verdict === 'ACT') return '\u{1F7E2}';    // green circle
  if (verdict === 'WATCH') return '\u{1F7E3}';  // purple circle
  return '\u{26AA}';                              // white circle (IGNORE)
}

function verdictColor(verdict) {
  if (verdict === 'ACT') return '#16a34a';
  if (verdict === 'WATCH') return '#6B35C2';
  return '#999999';
}

function categoryColor(category) {
  var colors = {
    'Breaking': '#6B35C2',
    'Tools': '#6B35C2',
    'Privacy': '#6B35C2',
    'Strategy': '#6B35C2',
    'Marketing': '#EA580C',
    'Healthcare': '#16A34A',
    'Finance': '#2563EB',
    'Real Estate': '#A855F7',
    'Education': '#0891B2',
    'Media': '#DB2777'
  };
  return colors[category] || '#6B35C2';
}

// ---------------------------------------------------------------------------
// Email HTML builder
// ---------------------------------------------------------------------------

// The one money link in the whole pipeline (Constitution: turn attention
// into emails, emails into checkouts). Voice: premium approachable, no
// em-dashes, no hype words, contractions welcome. One clear line, one
// button, one smaller secondary link to the free guides. Nothing else
// competes with it.
var FAST_FORWARD_URL = 'https://www.shiftandlead.com/fast-forward.html?utm_source=brief&utm_medium=email&utm_campaign=insider-brief';
var GUIDES_URL = 'https://guides.shiftandlead.com/?utm_source=brief&utm_medium=email&utm_campaign=insider-brief';

function buildCtaRow() {
  return `
    <tr>
      <td style="padding: 30px 0; border-top: 1px solid #e2ddd4; border-bottom: 1px solid #e2ddd4;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding-bottom: 14px;">
              <p style="margin: 0; font-family: Georgia, serif; font-size: 15px; color: #1C1C1C; line-height: 1.6;">I run my business on 99 AI employees. Fast Forward is the system, taught step by step.</p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 14px;">
              <a href="${FAST_FORWARD_URL}" target="_blank" rel="noopener" style="display: inline-block; background: #2C4BE0; color: #ffffff; font-family: Arial, sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 4px;">See Fast Forward</a>
            </td>
          </tr>
          <tr>
            <td>
              <p style="margin: 0; font-family: Arial, sans-serif; font-size: 12px; color: #888888;">New to this? Start with the <a href="${GUIDES_URL}" style="color: #6B35C2; text-decoration: underline;">free guides</a>.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

export function buildEmailHTML(cards, mode) {
  var today = formatDateDMY(new Date());
  var title = mode === 'daily'
    ? 'Your Daily AI Brief'
    : 'Your Weekly AI Digest';
  var subtitle = mode === 'daily'
    ? today + ' \u2014 ' + cards.length + ' signal' + (cards.length !== 1 ? 's' : '') + ' tracked'
    : 'Week of ' + today + ' \u2014 ' + cards.length + ' signal' + (cards.length !== 1 ? 's' : '') + ' tracked';

  var cardRows = cards.map(function (card) {
    var vColor = verdictColor(card.verdict);
    var cColor = categoryColor(card.category);

    return `
    <tr>
      <td style="padding: 20px 0; border-bottom: 1px solid #e2ddd4;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <span style="display: inline-block; padding: 3px 10px; border-radius: 12px; background: ${cColor}12; color: ${cColor}; font-family: Arial, sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${card.category}</span>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 10px;">
              <p style="margin: 0; font-family: Georgia, serif; font-style: italic; font-size: 18px; color: #1C1C1C; line-height: 1.3;">${card.headline}</p>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 8px;">
              <p style="margin: 0; font-family: Georgia, serif; font-size: 14px; color: #666666; line-height: 1.6;">${card.narrative}</p>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 12px;">
              <table cellpadding="0" cellspacing="0" border="0" style="border-left: 3px solid ${vColor}; padding-left: 12px;">
                <tr>
                  <td style="padding-left: 12px;">
                    <p style="margin: 0; font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: ${vColor};">${card.verdict}</p>
                    <p style="margin: 2px 0 0; font-family: Arial, sans-serif; font-size: 12px; color: #666666; line-height: 1.4;"><strong>For:</strong> ${(card.applies_to || []).join(', ')}</p>
                    <p style="margin: 4px 0 0; font-family: Arial, sans-serif; font-size: 13px; color: #555555; line-height: 1.4;"><strong>${card.verdict === 'ACT' ? 'Action' : card.verdict === 'WATCH' ? 'Trigger' : 'Reason'}:</strong> ${card.verdict === 'ACT' ? card.action : card.verdict === 'WATCH' ? card.trigger : card.reason}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${card.source_url ? `
          <tr>
            <td style="padding-top: 10px;">
              <a href="${card.source_url}" target="_blank" rel="noopener" style="font-family: Arial, sans-serif; font-size: 12px; color: #6B35C2; text-decoration: none;">${card.source_name || 'Read source'} &rarr;</a>
            </td>
          </tr>` : ''}
        </table>
      </td>
    </tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #F5F2EB; font-family: Georgia, serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #F5F2EB;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom: 30px; border-bottom: 1px solid #ddd6c8;">
              <p style="margin: 0; font-family: Georgia, serif; font-style: italic; font-size: 22px; color: #1C1C1C;">The Insider Brief</p>
              <p style="margin: 6px 0 0; font-family: Arial, sans-serif; font-size: 12px; color: #aaa49a;">${subtitle}</p>
            </td>
          </tr>

          <!-- Cards -->
          ${cardRows}

          <!-- CTA -->
          ${buildCtaRow()}

          <!-- Footer -->
          <tr>
            <td style="padding-top: 40px; text-align: center;">
              <p style="margin: 0; font-family: Georgia, serif; font-style: italic; font-size: 14px; color: #1C1C1C;">Fatiha Chikh &middot; Shift &amp; Lead</p>
              <p style="margin: 8px 0 0; font-family: Arial, sans-serif; font-size: 11px; color: #b0a89c; text-transform: uppercase; letter-spacing: 0.06em;">Formerly Dell &middot; Intel &middot; Microsoft</p>
              <p style="margin: 16px 0 0; font-family: Arial, sans-serif; font-size: 11px; color: #aaa49a;">You signed up for the ${mode} brief on The Insider Brief.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Kit API — create broadcast
// ---------------------------------------------------------------------------

// NOTE: throws on misconfiguration/failure rather than process.exit(1) —
// this function is now also called from the long-running approval-bot.mjs
// process (the Tuesday send-approval flow), where exiting the process would
// kill the bot instead of just failing one send. main() below is the only
// caller that should turn a thrown error into a process exit.
export async function sendBroadcast(config, subject, htmlContent, tagId) {
  if (!config.kitApiSecret) {
    throw new Error('KIT_API_SECRET not set. Cannot send broadcasts. Get it from Kit dashboard: Settings > Advanced > API Secret');
  }

  if (!tagId) {
    throw new Error('Tag ID not set. Run setup-kit.mjs first to create tags.');
  }

  var url = 'https://api.convertkit.com/v3/broadcasts';
  var res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_secret: config.kitApiSecret,
      subject: subject,
      content: htmlContent,
      subscriber_filter: [
        { all: [{ tags: [tagId] }] }
      ]
    })
  });

  if (!res.ok) {
    var errText = await res.text();
    throw new Error('Kit broadcast error: ' + res.status + ' ' + errText);
  }

  var data = await res.json();
  return data;
}

// ---------------------------------------------------------------------------
// Card selection — exported so approval-bot.mjs's Tuesday preview builds the
// exact same card set the real send would use (task: "reusing newsletter-
// sender's selection logic", not a re-implementation that can drift).
// ---------------------------------------------------------------------------

export function selectCards(allCards, mode) {
  // Legacy verdicts were generated before evidence extraction and independent
  // verification. They remain archived on the public board, but can never be
  // selected for a subscriber email.
  allCards = (allCards || []).filter(isCurrentEditorialCard);
  var filtered;
  if (mode === 'daily') {
    var today = new Date();
    filtered = allCards.filter(function (c) {
      return isSameDay(c.timestamp, today);
    });
    // Fallback: if nothing today, grab last 24h
    if (filtered.length === 0) {
      filtered = allCards.filter(function (c) {
        return isWithinDays(c.timestamp, 1);
      });
    }
  } else if (mode === 'semiweekly') {
    // Twice-weekly digest: pull last 4 days so Tue + Fri sends overlap minimally
    filtered = allCards.filter(function (c) {
      return isWithinDays(c.timestamp, 4);
    });
  } else {
    filtered = allCards.filter(function (c) {
      return isWithinDays(c.timestamp, 7);
    });
  }

  // Sort newest first
  filtered.sort(function (a, b) {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return filtered;
}

export function buildSubject(mode, now) {
  var dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][now.getDay()];
  var ddmm = String(now.getDate()).padStart(2, '0') + '/' + String(now.getMonth() + 1).padStart(2, '0');
  if (mode === 'daily') return 'AI Insider Brief // ' + dayShort + ' ' + ddmm;
  if (mode === 'semiweekly') return 'AI Insider Brief // ' + dayShort + ' ' + ddmm;
  return 'AI Insider Brief // Weekly ' + ddmm;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  var mode = process.argv[2];
  if (!mode || (mode !== 'daily' && mode !== 'weekly' && mode !== 'semiweekly')) {
    console.error('Usage: node newsletter-sender.mjs <daily|semiweekly|weekly>');
    process.exit(1);
  }

  console.log('========================================');
  console.log('  THE AI INSIDER BRIEF — Newsletter');
  console.log('  Mode: ' + mode);
  console.log('  ' + new Date().toISOString());
  console.log('========================================\n');

  var config = getConfig();

  // Load briefs
  if (!existsSync(config.briefsPath)) {
    console.error('[ERROR] briefs.json not found at: ' + config.briefsPath);
    process.exit(1);
  }

  var briefsData = JSON.parse(readFileSync(config.briefsPath, 'utf-8'));
  var allCards = briefsData.cards || [];
  console.log('[BRIEFS] ' + allCards.length + ' total cards\n');

  var filtered = selectCards(allCards, mode);

  console.log('[FILTER] ' + filtered.length + ' cards for ' + mode + ' email\n');

  if (filtered.length === 0) {
    var emptyWindow = mode === 'daily' ? 'today' : (mode === 'semiweekly' ? 'in the last 4 days' : 'this week');
    console.log('[SKIP] No cards to send. Nothing happened ' + emptyWindow + '.');
    return;
  }

  // Build email
  var html = buildEmailHTML(filtered, mode);
  var subject = buildSubject(mode, new Date());

  console.log('[EMAIL] Subject: ' + subject);
  console.log('[EMAIL] Cards: ' + filtered.length);
  console.log('[EMAIL] Size: ' + Math.round(html.length / 1024) + ' KB\n');

  // Send via Kit — semiweekly uses weekly tag (same audience, twice the cadence)
  var tagId = mode === 'daily' ? config.dailyTagId : config.weeklyTagId;

  try {
    var result = await sendBroadcast(config, subject, html, tagId);
    console.log('[SENT] Broadcast created. ID: ' + (result.broadcast ? result.broadcast.id : 'unknown'));
    console.log('[DONE] ' + mode + ' newsletter sent successfully.\n');
  } catch (err) {
    console.error('[ERROR] Failed to send: ' + err.message);
    process.exit(1);
  }
}

// Only run main() when this file is executed directly (node newsletter-sender.mjs ...).
// approval-bot.mjs imports getConfig/buildEmailHTML/selectCards/buildSubject/sendBroadcast
// from this module for the Tuesday send-approval flow and must not trigger a second CLI run.
var isMain = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isMain) {
  main().catch(function (err) {
    console.error('[FATAL] ' + err.message);
    console.error(err.stack);
    process.exit(1);
  });
}
