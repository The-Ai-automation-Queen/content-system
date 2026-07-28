// Converts reviewed reassessment drafts into a public briefs preview.
// This command never deploys. It rejects legacy cards and writes only to the
// explicit --output path supplied by the operator.

import { readFileSync, writeFileSync, renameSync } from 'fs';
import { resolve } from 'path';
import { createHash } from 'crypto';
import { isCurrentEditorialCard } from './editorial-contract.mjs';

function argValue(name) {
  const arg = process.argv.find(entry => entry.startsWith(`--${name}=`));
  return arg ? arg.slice(arg.indexOf('=') + 1) : null;
}

function publicDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid publication date: ${value}`);
  return String(date.getUTCDate()).padStart(2, '0') + '/' +
    String(date.getUTCMonth() + 1).padStart(2, '0') + '/' + date.getUTCFullYear();
}

export function promoteDrafts(drafts, selection = {}) {
  const byUrl = new Map();
  const includeUrls = Array.isArray(selection.include_urls) ? new Set(selection.include_urls) : null;
  const excludeUrls = new Set(selection.exclude_urls || []);
  const overrides = selection.overrides || {};
  const editableFields = ['headline', 'narrative', 'category', 'trigger', 'reason'];
  drafts.forEach(draft => {
    Object.values(draft.results || {}).forEach(entry => {
      if (entry.status !== 'reviewed' || !isCurrentEditorialCard(entry.proposed)) return;
      const card = structuredClone(entry.proposed);
      const timestamp = card.source_published_at || entry.legacy?.timestamp;
      if (!card.source_url || !timestamp) return;
      if ((includeUrls && !includeUrls.has(card.source_url)) || excludeUrls.has(card.source_url)) return;
      const changes = [];
      if (overrides[card.source_url]) {
        editableFields.forEach(field => {
          if (Object.hasOwn(overrides[card.source_url], field)) {
            card[field] = overrides[card.source_url][field];
            changes.push(field);
          }
        });
      }
      if (changes.length) {
        card.human_review = { status: 'approved', changes };
        card.verdict_text = card.verdict === 'WATCH' ? card.trigger : card.reason;
      }
      card.timestamp = new Date(timestamp).toISOString();
      card.date = publicDate(card.timestamp);
      card.id = card.timestamp.slice(0, 10) + '-' + createHash('sha256').update(card.source_url).digest('hex').slice(0, 8);
      const existing = byUrl.get(card.source_url);
      if (!existing || card.timestamp > existing.timestamp) byUrl.set(card.source_url, card);
    });
  });
  return Array.from(byUrl.values()).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

export function appendHistoricalArchive(currentCards, historicalCards) {
  const currentUrls = new Set(currentCards.map(card => card.source_url));
  const archived = (historicalCards || []).filter(card => card.source_url && !currentUrls.has(card.source_url)).map(card => {
    const copy = structuredClone(card);
    const timestamp = copy.timestamp || copy.source_published_at;
    copy.timestamp = new Date(timestamp).toISOString();
    copy.date = publicDate(copy.timestamp);
    copy.id = 'archive-' + copy.timestamp.slice(0, 10) + '-' + createHash('sha256').update(copy.source_url).digest('hex').slice(0, 8);
    copy.category = copy.category === 'Health' ? 'Healthcare' : copy.category;
    copy.lifecycle = 'archive';
    delete copy.editorial_contract_version;
    return copy;
  });
  return currentCards.concat(archived).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

if (process.argv[1] && import.meta.url === new URL('file://' + resolve(process.argv[1])).href) {
  const draftPaths = String(argValue('drafts') || '').split(',').filter(Boolean).map(path => resolve(path));
  const outputPath = argValue('output') ? resolve(argValue('output')) : null;
  if (!draftPaths.length || !outputPath) {
    throw new Error('Usage: node promote-reassessment.mjs --drafts=a.json,b.json --output=briefs.preview.json');
  }
  const drafts = draftPaths.map(path => JSON.parse(readFileSync(path, 'utf8')));
  const selectionPath = argValue('selection');
  const selection = selectionPath ? JSON.parse(readFileSync(resolve(selectionPath), 'utf8')) : {};
  let cards = promoteDrafts(drafts, selection);
  const archivePath = argValue('archive');
  if (archivePath) {
    const archiveData = JSON.parse(readFileSync(resolve(archivePath), 'utf8'));
    cards = appendHistoricalArchive(cards, archiveData.cards || []);
  }
  const tempPath = outputPath + '.tmp';
  writeFileSync(tempPath, JSON.stringify({ cards }, null, 2) + '\n');
  renameSync(tempPath, outputPath);
  const currentCards = cards.filter((card) => card.editorial_contract_version === 2);
  const verdicts = currentCards.reduce((counts, card) => {
    counts[card.verdict] = (counts[card.verdict] || 0) + 1;
    return counts;
  }, {});
  console.log(JSON.stringify({
    output: outputPath,
    cards: cards.length,
    current: currentCards.length,
    archives: cards.length - currentCards.length,
    verdicts
  }, null, 2));
}
