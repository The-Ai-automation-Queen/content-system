// Deterministically merges checkpoint files created by parallel draft-only
// reassessment workers. A reviewed result wins over HOLD for the same key.

import { readFileSync, writeFileSync, renameSync } from 'fs';
import { resolve } from 'path';

function argValue(name) {
  const arg = process.argv.find(entry => entry.startsWith(`--${name}=`));
  return arg ? arg.slice(arg.indexOf('=') + 1) : null;
}

const inputPaths = String(argValue('inputs') || '').split(',').filter(Boolean).map(path => resolve(path));
const outputPath = argValue('output') ? resolve(argValue('output')) : null;
if (!inputPaths.length || !outputPath) throw new Error('Usage: node merge-reassessments.mjs --inputs=a.json,b.json --output=merged.json');

const inputs = inputPaths.map(path => JSON.parse(readFileSync(path, 'utf8')));
const merged = {
  generated_at: new Date().toISOString(),
  editorial_contract_version: 2,
  source_card_count: Math.max(...inputs.map(input => input.source_card_count || 0)),
  results: {}
};
for (const input of inputs) {
  for (const [key, entry] of Object.entries(input.results || {})) {
    const existing = merged.results[key];
    if (!existing || (existing.status === 'hold' && entry.status === 'reviewed')) merged.results[key] = entry;
  }
}
const tempPath = outputPath + '.tmp';
writeFileSync(tempPath, JSON.stringify(merged, null, 2) + '\n');
renameSync(tempPath, outputPath);
const values = Object.values(merged.results);
console.log(JSON.stringify({
  processed: values.length,
  reviewed: values.filter(entry => entry.status === 'reviewed').length,
  held: values.filter(entry => entry.status === 'hold').length,
  remaining: merged.source_card_count - values.length
}, null, 2));
