#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOTS = [
  path.join(ROOT, 'main-site'),
  path.join(ROOT, 'ai-insider-brief', 'ai-insider-brief')
];
const STYLESHEETS = ['density-system.css', 'mobile-polish.css'];

function versionFor(name) {
  const source = path.join(ROOT, 'shared', 'assets', name);
  if (!fs.existsSync(source)) return '';
  return crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex').slice(0, 8);
}

function linkFor(name) {
  const version = versionFor(name);
  return `<link rel="stylesheet" href="/assets/${name}${version ? `?v=${version}` : ''}">`;
}

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
    let html = before;

    for (const name of STYLESHEETS) {
      const escaped = name.replaceAll('.', '\\.');
      html = html.replace(new RegExp(`\\s*<link rel="stylesheet" href="\\/assets\\/${escaped}(?:\\?v=[^"]*)?">`, 'g'), '');
    }

    const links = STYLESHEETS.map(linkFor).join('\n');
    html = html.replace('</head>', `${links}\n</head>`);

    if (html !== before) fs.writeFileSync(file, html);
  }
}

console.log('Applied page-density and mobile polish systems with cache-busted stylesheets.');
