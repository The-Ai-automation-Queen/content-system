import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const expected = {
  'ai-essentials': 'Learning AI is one part of staying relevant. Knowing what is yours is the next.',
  'get-better-at-ai': 'AI can improve the task. It still needs something worth building around.',
  'build-taste-with-ai': 'Your taste did not appear from nowhere.',
};

test('guide invitations have one canonical next-app source and a repeatable publisher', async () => {
  const sourcePath = path.join(root, 'next-app/content/product-invitations.mjs');
  assert.ok(fs.existsSync(sourcePath), 'canonical invitation source is missing');
  const { productInvitations } = await import('../next-app/content/product-invitations.mjs');
  assert.deepEqual(Object.keys(productInvitations).sort(), Object.keys(expected).sort());

  const publisher = read('tools/publish-zone-genius-guides.mjs');
  assert.match(publisher, /next-app\/content\/product-invitations\.mjs/);
  assert.match(publisher, /next-app["'], ["']out/);
  assert.match(publisher, /main-site["'], ["']guides/);
  assert.match(publisher, /guide-access-gate/);

  for (const [slug, heading] of Object.entries(expected)) {
    assert.equal(productInvitations[slug].heading, heading);
    assert.equal(productInvitations[slug].cta, 'Start my private reflection');
    assert.equal(productInvitations[slug].href, '/workbooks/find-your-zone-of-genius.html');
    const page = read(`main-site/guides/${slug}.html`);
    assert.ok(page.includes(heading));
    assert.ok(page.indexOf('guide-access-gate') < page.indexOf('data-zone-genius-invitation="true"'));
    assert.ok(page.indexOf('data-zone-genius-invitation="true"') < page.indexOf('more-guides'));
  }
});

test('beta test command includes the launch integration contract', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.match(pkg.scripts['test:beta'], /tests\/launch-integration\.test\.mjs/);
});
