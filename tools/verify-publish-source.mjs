#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAIN = path.join(ROOT, 'main-site');
const statuses = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'page-status.json'), 'utf8'));
const failures = [];

function read(rel) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    failures.push(`Missing required source file: ${rel}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

function chrome(html) {
  return [
    html.match(/<!-- chrome:nav -->([\s\S]*?)<!-- \/chrome:nav -->/i)?.[1] || '',
    html.match(/<!-- chrome:footer -->([\s\S]*?)<!-- \/chrome:footer -->/i)?.[1] || ''
  ].join('\n');
}

const retired = Object.entries(statuses).filter(([, page]) => page.status === 'retired');
const unlisted = Object.entries(statuses).filter(([, page]) => page.status === 'unlisted');
const siteData = JSON.parse(read('data/site.json'));
const publicSurfaces = [
  ['homepage', read('main-site/index.html')],
  ['sitemap', read('main-site/sitemap.xml')],
  ['AI discovery', read('main-site/llms.txt')],
  ['canonical navigation data', JSON.stringify({nav: siteData.nav, footer: siteData.footer})]
];

const retiredTerms = {
  newsletter: [/AI Insider Brief/i, /brief\.shiftandlead\.com/i, /ribbon-form/i],
  the99: [/\bThe 99\b/i, /99 AI employees/i, /the-99\.html/i]
};

for (const [id, page] of retired) {
  const patterns = retiredTerms[id] || [new RegExp(page.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')];
  for (const [surface, text] of publicSurfaces) {
    for (const pattern of patterns) {
      if (pattern.test(text)) failures.push(`${id} is retired but appears in ${surface}: ${pattern}`);
    }
  }
}

for (const [id, page] of unlisted) {
  const escapedPath = page.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = [new RegExp(escapedPath, 'i')];
  for (const [surface, text] of publicSurfaces) {
    for (const pattern of patterns) {
      if (pattern.test(text)) failures.push(`${id} is unlisted but appears in ${surface}: ${pattern}`);
    }
  }
}

for (const [id, page] of Object.entries(statuses).filter(([, value]) => value.status === 'active')) {
  const relative = page.path === '/' ? 'main-site/index.html' : `main-site${page.path}`;
  const expected = relative.endsWith('/') ? `${relative}index.html` : relative;
  if (!fs.existsSync(path.join(ROOT, expected))) failures.push(`${id} is active but its source file is missing: ${expected}`);
}

for (const file of fs.readdirSync(MAIN).filter(name => name.endsWith('.html'))) {
  if (file === 'the-99.html') continue;
  const shell = chrome(fs.readFileSync(path.join(MAIN, file), 'utf8'));
  for (const [id] of retired) {
    for (const pattern of retiredTerms[id] || []) {
      if (pattern.test(shell)) failures.push(`${id} is retired but appears in ${file} navigation or footer`);
    }
  }
  for (const [id, page] of unlisted) {
    if (new RegExp(page.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(shell)) {
      failures.push(`${id} is unlisted but appears in ${file} navigation or footer`);
    }
  }
}

const homepage = read('main-site/index.html');
const vercel = JSON.parse(read('main-site/vercel.json'));
if (!/<title>[^<]+<\/title>/i.test(homepage)) failures.push('Homepage is missing a title');
if (!/<h1\b/i.test(homepage)) failures.push('Homepage is missing an H1');
if (!/href=["']\/guides\//i.test(homepage)) failures.push('Homepage no longer links to the guides');
if (vercel.buildCommand !== 'cd .. && node tools/verify-publish-source.mjs') {
  failures.push('Vercel buildCommand must verify the committed source without rewriting it');
}

if (failures.length) {
  console.error('Publish source check failed:\n- ' + failures.join('\n- '));
  process.exit(1);
}

console.log('Publish source check passed. Vercel will publish the committed main-site files without rewriting them.');
