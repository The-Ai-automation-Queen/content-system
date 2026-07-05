// newsletter-sender.mjs — Compile daily/weekly briefs and send via Kit (ConvertKit)
// Usage:
//   node newsletter-sender.mjs daily    — sends today's briefs to daily subscribers
//   node newsletter-sender.mjs weekly   — sends last 7 days' briefs to weekly subscribers

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

var __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

function loadEnv(filePath) {
  if (!existsSync(filePath)) return {};
  var lines = readFileSync(filePath, 'utf-8').split('\n');
  var env = {};
  lines.forEach(function (line) {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    var eqIndex = line.indexOf('=');
    if (eqIndex === -1) return;
    var key = line.substring(0, eqIndex).trim();
    var val = line.substring(eqIndex + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  });
  return env;
}

function getConfig() {
  var envPaths = [
    process.env.ENV_PATH,
    '/root/ai-insider-brief-pipeline/.env',
    'C:\\Secrets\\insider-brief.env',
    resolve(__dirname, 'config.env')
  ].filter(Boolean);

  var env = {};
  for (var p of envPaths) {
    if (existsSync(p)) {
      env = loadEnv(p);
      break;
    }
  }

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
    'Health': '#16A34A',
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

function buildEmailHTML(cards, mode) {
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
                    <p style="margin: 2px 0 0; font-family: Arial, sans-serif; font-size: 13px; color: #888888; line-height: 1.4;">${card.verdict_text}</p>
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

async function sendBroadcast(config, subject, htmlContent, tagId) {
  if (!config.kitApiSecret) {
    console.error('[ERROR] KIT_API_SECRET not set. Cannot send broadcasts.');
    console.error('Get it from Kit dashboard: Settings > Advanced > API Secret');
    process.exit(1);
  }

  if (!tagId) {
    console.error('[ERROR] Tag ID not set. Run setup-kit.mjs first to create tags.');
    process.exit(1);
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

  // Filter cards by date
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

  console.log('[FILTER] ' + filtered.length + ' cards for ' + mode + ' email\n');

  if (filtered.length === 0) {
    var emptyWindow = mode === 'daily' ? 'today' : (mode === 'semiweekly' ? 'in the last 4 days' : 'this week');
    console.log('[SKIP] No cards to send. Nothing happened ' + emptyWindow + '.');
    return;
  }

  // Build email
  var html = buildEmailHTML(filtered, mode);
  var now = new Date();
  var dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][now.getDay()];
  var ddmm = String(now.getDate()).padStart(2, '0') + '/' + String(now.getMonth() + 1).padStart(2, '0');
  var today = formatDateDMY(now);
  var subject;
  if (mode === 'daily') subject = 'AI Insider Brief // ' + dayShort + ' ' + ddmm;
  else if (mode === 'semiweekly') subject = 'AI Insider Brief // ' + dayShort + ' ' + ddmm;
  else subject = 'AI Insider Brief // Weekly ' + ddmm;

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

main().catch(function (err) {
  console.error('[FATAL] ' + err.message);
  console.error(err.stack);
  process.exit(1);
});
