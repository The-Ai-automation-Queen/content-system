#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const guides = JSON.parse(fs.readFileSync(path.join(root, 'data/guides.json'), 'utf8')).guides.filter((guide) => guide.status === 'live');
let changed = 0;
for (const guide of guides) {
  const file = path.join(root, 'main-site/guides', `${guide.slug}.html`);
  if (!fs.existsSync(file)) throw new Error(`Missing active guide: ${guide.slug}`);
  const before = fs.readFileSync(file, 'utf8');
  if (before.includes('/_next/')) continue;
  let after = before;
  if (!after.includes('/assets/guide-gate.css')) after = after.replace('</head>', '<link rel="stylesheet" href="/assets/guide-gate.css">\n<link rel="stylesheet" href="/assets/guide-next-step.css">\n</head>');
  if (!after.includes('/assets/guide-gate.js')) after = after.replace('</body>', '<script defer src="/assets/guide-gate.js"></script>\n<script defer src="/assets/guide-next-step.js"></script>\n</body>');
  if (after !== before) { fs.writeFileSync(file, after); changed += 1; }
}
console.log(`Wired the shared access and next-step system into ${changed} static guide(s).`);
