import test from 'node:test';
import assert from 'node:assert/strict';
import { prioritizeCategoryCoverage } from './category-balance.mjs';
import { capTier2Items, extractTechmemeOriginal } from './crawler.mjs';

test('specialist categories are evaluated before repeated tools stories', () => {
  const items = [
    { title: 'tool one', categoryAffinity: ['Tools'] },
    { title: 'tool two', categoryAffinity: ['Tools'] },
    { title: 'finance', categoryAffinity: ['Finance'] },
    { title: 'health', categoryAffinity: ['Healthcare'] },
    { title: 'media', categoryAffinity: ['Media'] }
  ];
  assert.deepEqual(
    prioritizeCategoryCoverage(items).slice(0, 4).map(item => item.title),
    ['finance', 'health', 'media', 'tool one']
  );
});

test('Techmeme entries resolve to the original publisher and summary', () => {
  const html = '<A NAME="a260529p22"></A><DIV CLASS="itc1"><A CLASS="ourh" HREF="https://publisher.example/story?a=1&amp;b=2">A specific AI cost signal</A></DIV><DIV CLASS="clus">next</DIV>';
  assert.deepEqual(extractTechmemeOriginal(html, 'https://www.techmeme.com/260529/p22#a260529p22'), {
    url: 'https://publisher.example/story?a=1&b=2',
    summary: 'A specific AI cost signal'
  });
});

test('tier-two cap admits the intended evaluation-pool share', () => {
  const items = Array.from({ length: 20 }, (_, index) => ({ title: String(index), sourceTier: 2 }));
  assert.equal(capTier2Items(items, 30, 0.4).length, 12);
});

test('candidate order remains stable inside each category and no item is lost', () => {
  const items = [
    { title: 'new finance', categoryAffinity: ['Finance'] },
    { title: 'old finance', categoryAffinity: ['Finance'] },
    { title: 'strategy', categoryAffinity: ['Strategy', 'Privacy'] }
  ];
  const result = prioritizeCategoryCoverage(items);
  assert.equal(result.length, items.length);
  assert.equal(new Set(result).size, items.length);
  assert.ok(result.indexOf(items[0]) < result.indexOf(items[1]));
});
