// weekly-audit.mjs — Self-audit of insider brief pipeline health.
// Runs weekly via cron, sends Telegram report. No external API keys needed.

import { readFileSync, existsSync } from 'fs';
import { execFileSync } from 'child_process';

const ENV_PATH = '/root/ai-insider-brief-pipeline/.env';
const PIPELINE_LOG = '/var/log/insider-brief-pipeline.log';
const BRIEFS_PATH = '/root/ai-insider-brief-pipeline/data/briefs.json';
const PENDING_PATH = '/root/ai-insider-brief-pipeline/cards-pending.json';
const SOURCES_PATH = '/root/ai-insider-brief-pipeline/sources.json';
const UA = 'AI-Insider-Brief-Crawler/1.0';

const BANNED_FILLERS = [
  'stay informed', 'consider implications', 'be aware',
  'keep an eye on', 'be prepared', 'try out', 'adopt ai tools',
  'follow how', 'stay ahead', 'keep up with'
];

function loadEnv(filePath) {
  const env = {};
  readFileSync(filePath, 'utf-8').split('\n').forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    const eq = line.indexOf('=');
    if (eq === -1) return;
    let val = line.substring(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[line.substring(0, eq).trim()] = val;
  });
  return env;
}

async function sendTelegram(token, chatId, text) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
  });
}

function probeFeed(url) {
  try {
    const code = execFileSync(
      'curl',
      ['-sL', '-o', '/dev/null', '-w', '%{http_code}', '-A', UA, '--max-time', '10', url],
      { encoding: 'utf-8', timeout: 15000 }
    ).trim();
    return parseInt(code) || 0;
  } catch {
    return 0;
  }
}

function checkRunStats() {
  if (!existsSync(PIPELINE_LOG)) return { runs: 0, totalQueued: 0, zeroRuns: 0 };
  const log = readFileSync(PIPELINE_LOG, 'utf-8');
  const sevenDaysAgo = Date.now() - 7 * 86400000;
  const runBlocks = log.split('PIPELINE SUMMARY');
  let runs = 0, totalQueued = 0, zeroRuns = 0;
  runBlocks.forEach(block => {
    const tsMatch = block.match(/(\d{4}-\d{2}-\d{2}T[\d:.]+Z)/);
    if (!tsMatch) return;
    if (new Date(tsMatch[1]).getTime() < sevenDaysAgo) return;
    const queuedMatch = block.match(/Queued for approval:\s*(\d+)/);
    if (!queuedMatch) return;
    const q = parseInt(queuedMatch[1]);
    runs++;
    totalQueued += q;
    if (q === 0) zeroRuns++;
  });
  return { runs, totalQueued, zeroRuns };
}

function checkVerdictQuality() {
  const data = JSON.parse(readFileSync(BRIEFS_PATH, 'utf-8'));
  const cards = (data.cards || []).slice(0, 30);
  if (cards.length === 0) return { sampled: 0, fillerCount: 0, fillerPct: 0 };
  let fillerCount = 0;
  cards.forEach(c => {
    const txt = (c.verdict_text || '').toLowerCase();
    if (BANNED_FILLERS.some(p => txt.includes(p))) fillerCount++;
  });
  return { sampled: cards.length, fillerCount, fillerPct: Math.round((fillerCount / cards.length) * 100) };
}

function checkPendingDepth() {
  if (!existsSync(PENDING_PATH)) return 0;
  try {
    return JSON.parse(readFileSync(PENDING_PATH, 'utf-8')).length;
  } catch {
    return 0;
  }
}

function checkCategoryDistribution() {
  const data = JSON.parse(readFileSync(BRIEFS_PATH, 'utf-8'));
  const cards = (data.cards || []).slice(0, 30);
  const expected = ['Breaking', 'Tools', 'Privacy', 'Strategy', 'Marketing', 'Real Estate', 'Healthcare', 'Finance', 'Education', 'Media'];
  const counts = {};
  expected.forEach(c => counts[c] = 0);
  cards.forEach(c => { if (counts[c.category] !== undefined) counts[c.category]++; });
  const empty = expected.filter(c => counts[c] === 0);
  return { counts, empty };
}

async function checkDeadFeeds() {
  const sources = JSON.parse(readFileSync(SOURCES_PATH, 'utf-8')).sources;
  const dead = [];
  for (const src of sources) {
    const code = probeFeed(src.url);
    if (code === 0 || code >= 400) {
      dead.push({ name: src.name, code });
    }
    await new Promise(r => setTimeout(r, 200));
  }
  return dead;
}

async function main() {
  const env = loadEnv(ENV_PATH);
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('[FATAL] Missing Telegram credentials');
    process.exit(1);
  }

  console.log('[AUDIT] Starting weekly audit...');

  const runs = checkRunStats();
  const verdict = checkVerdictQuality();
  const pending = checkPendingDepth();
  const cat = checkCategoryDistribution();
  console.log('[AUDIT] Probing feeds...');
  const dead = await checkDeadFeeds();

  const lines = [];
  lines.push('<b>Insider Brief — Weekly Audit</b>');
  lines.push(`<i>${new Date().toISOString().slice(0, 10)}</i>`);
  lines.push('');
  lines.push(`<b>Runs (7d):</b> ${runs.runs} runs, ${runs.totalQueued} cards queued${runs.zeroRuns > 0 ? `, WARN ${runs.zeroRuns} zero-card runs` : ''}`);
  lines.push(`<b>Pending queue:</b> ${pending}${pending > 50 ? ' WARN approval bottleneck' : ''}`);
  lines.push(`<b>Verdict quality:</b> ${verdict.fillerPct}% filler (${verdict.fillerCount}/${verdict.sampled})`);
  if (verdict.fillerPct > 40) {
    lines.push('  -> inspect the evidence/judgment/verifier stages and deterministic contract failures');
  }
  lines.push(`<b>Empty verticals:</b> ${cat.empty.length === 0 ? 'none' : cat.empty.join(', ')}`);
  lines.push(`<b>Dead feeds (${dead.length}):</b>`);
  if (dead.length === 0) {
    lines.push('  none');
  } else {
    dead.slice(0, 12).forEach(d => lines.push(`  - ${d.name} (${d.code})`));
    if (dead.length > 12) lines.push(`  ... +${dead.length - 12} more`);
  }
  lines.push('');
  lines.push('Edit sources.json + scp + restart pipeline to remove dead feeds.');

  const msg = lines.join('\n').slice(0, 4000);
  console.log(msg.replace(/<[^>]+>/g, ''));
  await sendTelegram(token, chatId, msg);
  console.log('[AUDIT] Report sent to Telegram');
}

main().catch(err => {
  console.error('[FATAL]', err.message);
  process.exit(1);
});
