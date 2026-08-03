#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOTS = [
  path.join(ROOT, 'main-site'),
  path.join(ROOT, 'ai-insider-brief', 'ai-insider-brief')
];
const LINK = '<link rel="stylesheet" href="/assets/density-system.css">';

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === '_archive' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const before = fs.readFileSync(file, 'utf8');
    let html = before.replace(/\s*<link rel="stylesheet" href="\/assets\/density-system\.css(?:\?v=[^"]*)?">/g, '');
    html = html.replace('</head>', `${LINK}\n</head>`);
    if (html !== before) fs.writeFileSync(file, html);
  }
}

console.log('Applied compact page-density system.');
