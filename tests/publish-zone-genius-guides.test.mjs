import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publisher = path.join(repoRoot, 'tools', 'publish-zone-genius-guides.mjs');
const slugs = ['ai-essentials', 'get-better-at-ai', 'build-taste-with-ai'];

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

function runPublisher(root) {
  const result = spawnSync(process.execPath, [publisher], {
    cwd: root,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
}

test('publisher regenerates all guide pages from a clean canonical export and is byte-idempotent', () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'zone-genius-publisher-'));

  try {
    const exportGuides = path.join(root, 'next-app', 'out', 'guides');
    const canonicalGuides = path.join(root, 'next-app', 'canonical', 'legacy-guides');
    const publishedGuides = path.join(root, 'main-site', 'guides');
    mkdirSync(exportGuides, { recursive: true });
    mkdirSync(canonicalGuides, { recursive: true });
    mkdirSync(publishedGuides, { recursive: true });
    writeFileSync(path.join(exportGuides, 'index.html'), '<main>canonical guides index</main>');
    writeFileSync(path.join(publishedGuides, 'index.html'), '<main>stale guides index</main>');

    for (const slug of slugs) {
      const sourceDirectory = path.join(exportGuides, slug);
      mkdirSync(sourceDirectory, { recursive: true });
      writeFileSync(
        path.join(canonicalGuides, `${slug}.html`),
        `<main data-canonical-export="${slug}"><article><div class="guide-access-gate"><form><input type="email"></form></div></article><section class="more-guides article-shell"></section></main>`,
      );
      writeFileSync(
        path.join(sourceDirectory, 'index.html'),
        `<main data-stale-next-output="${slug}"></main>`,
      );
      writeFileSync(
        path.join(publishedGuides, `${slug}.html`),
        `<main data-stale-output="${slug}"><article><div class="guide-access-gate"><form><input type="email"></form></div></article><section class="more-guides article-shell"></section></main>`,
      );
    }

    runPublisher(root);

    const firstOutput = new Map();
    assert.equal(readFileSync(path.join(publishedGuides, 'index.html'), 'utf8'), '<main>canonical guides index</main>');
    for (const slug of slugs) {
      const target = path.join(publishedGuides, `${slug}.html`);
      const output = readFileSync(target);
      const html = output.toString('utf8');
      assert.match(html, new RegExp(`data-canonical-export="${slug}"`));
      assert.doesNotMatch(html, /data-stale-output=/);
      assert.doesNotMatch(html, /data-stale-next-output=/);
      assert.equal(count(html, '<form'), 1, `${slug} should retain exactly one email form`);
      assert.equal(count(html, 'guide-access-gate'), 1, `${slug} should retain exactly one email gate`);
      assert.equal(count(html, 'data-zone-genius-invitation="true"'), 1, `${slug} should receive exactly one invitation`);
      firstOutput.set(slug, output);
    }

    runPublisher(root);

    for (const slug of slugs) {
      const secondOutput = readFileSync(path.join(publishedGuides, `${slug}.html`));
      assert.deepEqual(secondOutput, firstOutput.get(slug), `${slug} should be byte-identical after repeated publishing`);
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
