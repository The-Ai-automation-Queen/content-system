import test from 'node:test';
import assert from 'node:assert/strict';
import { applyExpansion } from './apply-editorial-expansion.mjs';

const validCard = {
  id: 'new', category: 'Privacy', headline: 'A plain headline', narrative: 'A complete summary.',
  verdict: 'WATCH', applies_to: ['International business travellers'], reason: 'A real change.',
  trigger: 'The agency publishes a final rule.', evidence_ids: ['e1'], topics: ['Privacy'],
  editorial_contract_version: 2, source_url: 'https://example.com/new',
  evidence: [{ id: 'e1', claim: 'A claim', source_text: 'A source fragment' }],
  verification: { status: 'verified', verified_verdict: 'WATCH' }, timestamp: '2026-07-28T00:00:00Z'
};

test('applies reviewed headline overrides and adds valid unique cards', () => {
  const result = applyExpansion(
    { cards: [{ id: 'old', headline: 'Technical title', source_url: 'https://example.com/old', timestamp: '2026-07-01T00:00:00Z' }] },
    { headline_overrides: { old: 'Plain title' }, cards: [validCard] }
  );
  assert.equal(result.cards.length, 2);
  assert.equal(result.cards.find(card => card.id === 'old').headline, 'Plain title');
  assert.equal(result.cards[0].id, 'new');
});

test('rejects an unknown override ID', () => {
  assert.throws(() => applyExpansion({ cards: [] }, { headline_overrides: { missing: 'Plain title' }, cards: [] }), /not found/);
});

test('rejects duplicate source URLs', () => {
  assert.throws(() => applyExpansion({ cards: [{ id: 'different', source_url: validCard.source_url }] }, { cards: [validCard] }), /Duplicate/);
});

test('keeps current reviewed cards ahead of historical archives', () => {
  const result = applyExpansion(
    { cards: [{ id: 'archive', lifecycle: 'archive', timestamp: '2026-07-29T00:00:00Z' }] },
    { cards: [validCard] }
  );
  assert.equal(result.cards[0].id, 'new');
});
