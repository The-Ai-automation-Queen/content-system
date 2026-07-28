import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { extractScrapeCandidates } from './crawler.mjs';

test('Claude product announcements are a first-party tier-one source', () => {
  const sources = JSON.parse(readFileSync(new URL('./sources.json', import.meta.url), 'utf8')).sources;
  const source = sources.find(item => item.name === 'Claude Product Announcements');

  assert.ok(source);
  assert.equal(source.url, 'https://claude.com/blog-category/announcements');
  assert.equal(source.type, 'scrape');
  assert.equal(source.tier, 1);
});

test('Claude Webflow-style blog links are discovered and deduplicated', () => {
  const html = `
    <a class="post-card" href="/blog/think-through-hard-problems-in-voice-mode">
      <span>Think through hard problems in voice mode</span>
    </a>
    <a href="https://claude.com/blog/think-through-hard-problems-in-voice-mode">
      Think through hard problems in voice mode
    </a>
    <a href="/blog-category/announcements">Product announcements</a>
  `;

  assert.deepEqual(
    extractScrapeCandidates(html, 'https://claude.com/blog-category/announcements'),
    [{
      title: 'Think through hard problems in voice mode',
      url: 'https://claude.com/blog/think-through-hard-problems-in-voice-mode'
    }]
  );
});
