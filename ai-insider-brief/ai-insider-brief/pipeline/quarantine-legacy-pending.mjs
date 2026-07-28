// quarantine-legacy-pending.mjs
// Preserves old-contract Telegram cards as an evaluation dataset, then removes
// them from the active approval queue. Dry-run unless --apply is provided.

import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync
} from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { loadMergedConfig } from './config-loader.mjs';
import { isCurrentEditorialCard } from './editorial-contract.mjs';

var __dirname = dirname(fileURLToPath(import.meta.url));
var env = loadMergedConfig(__dirname).env;
var pendingPath = env.PENDING_PATH || join(__dirname, 'cards-pending.json');
var apply = process.argv.indexOf('--apply') !== -1;

if (!existsSync(pendingPath)) {
  console.log('[LEGACY] No pending queue at ' + pendingPath);
  process.exit(0);
}

var cards = JSON.parse(readFileSync(pendingPath, 'utf-8'));
if (!Array.isArray(cards)) throw new Error('Pending queue must be a JSON array');

var current = cards.filter(isCurrentEditorialCard);
var legacy = cards.filter(function (card) { return !isCurrentEditorialCard(card); });

console.log('[LEGACY] Queue: ' + cards.length);
console.log('[LEGACY] Current contract: ' + current.length);
console.log('[LEGACY] To preserve for evaluation: ' + legacy.length);

if (!apply || legacy.length === 0) {
  if (!apply) console.log('[LEGACY] Dry run only. Use --apply after reviewing these counts.');
  process.exit(0);
}

var stamp = new Date().toISOString().replace(/[:.]/g, '-');
var evaluationDir = join(dirname(pendingPath), 'evaluation');
mkdirSync(evaluationDir, { recursive: true, mode: 0o700 });

var sourceBackup = join(evaluationDir, 'cards-pending-before-contract-v2-' + stamp + '.json');
var legacyPath = join(evaluationDir, 'legacy-verdict-evaluation-' + stamp + '.json');
var tempPath = pendingPath + '.contract-v2.tmp';

copyFileSync(pendingPath, sourceBackup);
writeFileSync(legacyPath, JSON.stringify({
  archived_at: new Date().toISOString(),
  reason: 'Generated before evidence-based editorial contract v2',
  cards: legacy
}, null, 2), { mode: 0o600 });
writeFileSync(tempPath, JSON.stringify(current, null, 2), { mode: 0o600 });
renameSync(tempPath, pendingPath);

console.log('[LEGACY] Full backup: ' + sourceBackup);
console.log('[LEGACY] Evaluation set: ' + legacyPath);
console.log('[LEGACY] Active queue now contains ' + current.length + ' current-contract card(s).');
