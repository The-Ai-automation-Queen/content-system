#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GUIDES = path.join(ROOT, 'main-site', 'guides');
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'guides.json'), 'utf8'));
const bySlug = new Map(data.guides.map((g) => [g.slug, g]));

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function cleanEmDashes(html) {
  return html.replace(/\s*—\s*/g, ', ');
}

for (const file of walk(GUIDES)) {
  let html = fs.readFileSync(file, 'utf8');

  // Visible freshness and read-time metadata are intentionally not part of the guide experience.
  html = html
    .replace(/(<!-- data:guide-byline -->)[\s\S]*?(<!-- \/data:guide-byline -->)/g, '$1$2')
    .replace(/\s*<p class="guide-byline[^>]*">[\s\S]*?<\/p>/g, '');

  if (path.basename(file) === 'index.html') {
    // include.mjs generates the library cards. Replace its mechanical date/read-time line
    // with the useful summary stored in guides.json.
    for (const [slug, guide] of bySlug) {
      const href = `${slug}.html`;
      const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const cardRe = new RegExp(`(<a class="card" href="${escapedHref}">[\\s\\S]*?<p class="card-desc">)[\\s\\S]*?(<\\/p>[\\s\\S]*?<\\/a>)`, 'g');
      html = html.replace(cardRe, `$1${guide.summary || ''}$2`);
    }
  }

  html = cleanEmDashes(html);
  fs.writeFileSync(file, html);
}

console.log('Finalized guide copy, summaries and visible metadata.');
