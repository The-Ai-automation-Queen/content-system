// Applies an explicitly reviewed editorial expansion to a briefs snapshot.
// It is deterministic, refuses invalid contract-v2 cards and never deploys.

import { readFileSync, writeFileSync, renameSync } from 'fs';
import { resolve } from 'path';
import { isCurrentEditorialCard } from './editorial-contract.mjs';

function arg(name) {
  const value = process.argv.find(entry => entry.startsWith(`--${name}=`));
  return value ? resolve(value.slice(value.indexOf('=') + 1)) : null;
}

export function applyExpansion(briefs, expansion) {
  const cards = structuredClone(briefs.cards || []);
  const overrideIds = new Set(Object.keys(expansion.headline_overrides || {}));
  const updatedIds = new Set();

  cards.forEach(card => {
    if (!overrideIds.has(card.id)) return;
    card.headline = expansion.headline_overrides[card.id];
    card.human_review = card.human_review || { status: 'approved', changes: [] };
    card.human_review.status = 'approved';
    card.human_review.changes = Array.from(new Set([...(card.human_review.changes || []), 'headline']));
    updatedIds.add(card.id);
  });

  const missingOverrides = [...overrideIds].filter(id => !updatedIds.has(id));
  if (missingOverrides.length) throw new Error(`Headline override IDs not found: ${missingOverrides.join(', ')}`);

  const sourceIndexes = new Map(cards.map((card, index) => [card.source_url, index]).filter(([url]) => Boolean(url)));
  for (const card of expansion.cards || []) {
    if (!isCurrentEditorialCard(card)) throw new Error(`Invalid contract-v2 card: ${card.headline || card.id}`);
    if (!card.source_url) throw new Error(`Missing source URL: ${card.id}`);
    if (sourceIndexes.has(card.source_url)) {
      const index = sourceIndexes.get(card.source_url);
      if (cards[index].id !== card.id) throw new Error(`Duplicate source URL: ${card.source_url}`);
      cards[index] = structuredClone(card);
    } else {
      sourceIndexes.set(card.source_url, cards.length);
      cards.push(structuredClone(card));
    }
  }

  cards.sort((a, b) => {
    const contractOrder = Number(isCurrentEditorialCard(b)) - Number(isCurrentEditorialCard(a));
    if (contractOrder) return contractOrder;
    return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
  });
  return { cards };
}

if (process.argv[1] && import.meta.url === new URL('file://' + resolve(process.argv[1])).href) {
  const input = arg('input');
  const expansionPath = arg('expansion');
  const output = arg('output');
  if (!input || !expansionPath || !output) {
    throw new Error('Usage: node apply-editorial-expansion.mjs --input=briefs.json --expansion=expansion.json --output=briefs.json');
  }
  const result = applyExpansion(
    JSON.parse(readFileSync(input, 'utf8')),
    JSON.parse(readFileSync(expansionPath, 'utf8'))
  );
  const temporary = output + '.tmp';
  writeFileSync(temporary, JSON.stringify(result, null, 2) + '\n');
  renameSync(temporary, output);
  console.log(JSON.stringify({
    output,
    total: result.cards.length,
    current: result.cards.filter(isCurrentEditorialCard).length,
    archives: result.cards.filter(card => card.lifecycle === 'archive').length
  }, null, 2));
}
