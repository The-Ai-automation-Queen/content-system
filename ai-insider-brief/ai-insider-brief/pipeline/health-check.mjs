// health-check.mjs — Monitor pipeline health, alert on Telegram if something is down
// Runs via cron every hour. Checks:
//   1. Is the approval bot process running?
//   2. Did the pipeline produce cards recently (last 24h)?
//   3. Is briefs.json accessible and valid?
//   4. Is Ollama responding?
//   5. Is frontend serving?

import { readFileSync, existsSync } from 'fs';
import { execFileSync } from 'child_process';

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

async function sendTelegramAlert(botToken, chatId, message) {
  var url = 'https://api.telegram.org/bot' + botToken + '/sendMessage';
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    })
  });
}

async function main() {
  var envPath = '/root/ai-insider-brief-pipeline/.env';
  if (!existsSync(envPath)) {
    console.error('No .env found');
    process.exit(1);
  }
  var env = loadEnv(envPath);

  var botToken = env.TELEGRAM_BOT_TOKEN;
  var chatId = env.TELEGRAM_CHAT_ID;
  var briefsPath = env.BRIEFS_JSON_PATH || '/root/ai-insider-brief-pipeline/data/briefs.json';

  var issues = [];

  // Check 1: Is approval bot running in pm2?
  try {
    var pm2Output = execFileSync('pm2', ['jlist'], { encoding: 'utf-8' });
    var pm2List = JSON.parse(pm2Output);
    var bot = pm2List.find(function (p) { return p.name === 'insider-brief-bot'; });
    if (!bot) {
      issues.push('\u274c Approval bot not found in pm2');
    } else if (bot.pm2_env.status !== 'online') {
      issues.push('\u274c Approval bot status: ' + bot.pm2_env.status + ' (restarts: ' + bot.pm2_env.restart_time + ')');
    }
  } catch (err) {
    issues.push('\u274c Cannot check pm2: ' + err.message);
  }

  // Check 2: Is briefs.json valid and recently updated?
  try {
    if (!existsSync(briefsPath)) {
      issues.push('\u274c briefs.json not found');
    } else {
      var data = JSON.parse(readFileSync(briefsPath, 'utf-8'));
      var cards = data.cards || [];
      if (cards.length === 0) {
        issues.push('\u26a0\ufe0f briefs.json has 0 cards');
      } else {
        var newest = new Date(cards[0].timestamp);
        var hoursAgo = (Date.now() - newest.getTime()) / (1000 * 60 * 60);
        if (hoursAgo > 24) {
          issues.push('\u26a0\ufe0f No new cards in ' + Math.round(hoursAgo) + 'h (last: ' + cards[0].date + ')');
        }
      }
    }
  } catch (err) {
    issues.push('\u274c briefs.json error: ' + err.message);
  }

  // Check 3: Is Ollama running?
  var ollamaUrl = env.OLLAMA_URL || 'http://localhost:11434';
  try {
    var res = await fetch(ollamaUrl + '/api/tags', { signal: AbortSignal.timeout(5000) });
    if (!res.ok) {
      issues.push('\u26a0\ufe0f Ollama HTTP ' + res.status);
    }
  } catch (err) {
    issues.push('\u274c Ollama down at ' + ollamaUrl);
  }

  // Check 4: Is frontend serving?
  try {
    var res = await fetch('http://localhost:8080', { signal: AbortSignal.timeout(5000) });
    if (!res.ok) {
      issues.push('\u274c Frontend HTTP ' + res.status);
    }
  } catch (err) {
    issues.push('\u274c Frontend down');
  }

  // Report
  if (issues.length > 0) {
    var msg = '\ud83d\udea8 <b>Insider Brief Health Alert</b>\n\n' + issues.join('\n') + '\n\n<i>' + new Date().toISOString() + '</i>';
    console.log('[ALERT] ' + issues.length + ' issue(s):');
    issues.forEach(function (i) { console.log('  ' + i); });
    await sendTelegramAlert(botToken, chatId, msg);
    console.log('[ALERT] Sent to Telegram');
  } else {
    console.log('[OK] All healthy — ' + new Date().toISOString());
  }
}

main().catch(function (err) {
  console.error('[FATAL] ' + err.message);
  process.exit(1);
});
