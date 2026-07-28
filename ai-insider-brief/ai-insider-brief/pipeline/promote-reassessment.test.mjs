import test from 'node:test';
import assert from 'node:assert/strict';
import { promoteDrafts, appendHistoricalArchive } from './promote-reassessment.mjs';

function card(url, timestamp) {
  return {
    editorial_contract_version: 2,
    source_url: url,
    source_published_at: timestamp,
    verdict: 'WATCH',
    headline: 'Test', narrative: 'Test narrative', trigger: 'A primary source confirms rollout.'
  };
}

test('promotion includes reviewed v2 cards only and deduplicates URLs', () => {
  const result = promoteDrafts([{ results: {
    a: { status: 'reviewed', proposed: card('https://example.com/a', '2026-07-20T12:00:00Z') },
    b: { status: 'hold', proposed: card('https://example.com/b', '2026-07-21T12:00:00Z') },
    c: { status: 'reviewed', proposed: { source_url: 'https://example.com/c' } },
    d: { status: 'reviewed', proposed: card('https://example.com/a', '2026-07-20T12:00:00Z') }
  }}]);
  assert.equal(result.length, 1);
  assert.equal(result[0].date, '20/07/2026');
  assert.match(result[0].id, /^2026-07-20-[a-f0-9]{8}$/);
});

test('historical cards retain summaries but lose current-contract status and duplicate IDs', () => {
  const result = appendHistoricalArchive([], [{
    id: 'duplicate', category: 'Health', headline: 'Historical', narrative: 'Summary',
    source_url: 'https://example.com/history', timestamp: '2026-06-04T12:00:00Z',
    editorial_contract_version: 2
  }]);
  assert.equal(result[0].category, 'Healthcare');
  assert.equal(result[0].lifecycle, 'archive');
  assert.equal(result[0].editorial_contract_version, undefined);
  assert.match(result[0].id, /^archive-2026-06-04-/);
});

test('explicit editorial selection filters cards and records safe text overrides', () => {
  const a = card('https://example.com/a', '2026-07-20T12:00:00Z');
  const b = card('https://example.com/b', '2026-07-21T12:00:00Z');
  const result = promoteDrafts([{ results: {
    a: { status: 'reviewed', proposed: a },
    b: { status: 'reviewed', proposed: b }
  }}], {
    include_urls: [a.source_url],
    overrides: { [a.source_url]: { trigger: 'A verified enforcement date is published.' } }
  });
  assert.equal(result.length, 1);
  assert.equal(result[0].trigger, 'A verified enforcement date is published.');
  assert.deepEqual(result[0].human_review.changes, ['trigger']);
});
