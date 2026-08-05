#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GUIDES = path.join(ROOT, 'main-site', 'guides');

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

function removeVisibleReadingMeta(html) {
  return html
    // Generated article bylines.
    .replace(/(<!-- data:guide-byline -->)[\s\S]*?(<!-- \/data:guide-byline -->)/g, '$1$2')
    .replace(/\s*<p class="guide-byline[^>]*">[\s\S]*?<\/p>/gi, '')

    // Library cards and any other visible paragraphs containing only freshness/read-time copy.
    .replace(/\s*<p[^>]*>\s*Updated\s+[^<·]+(?:·|&middot;|&#183;|\u00b7)\s*\d+\s*min(?:ute)?s?\s*read\s*<\/p>/gi, '')
    .replace(/\s*<p[^>]*>\s*Updated\s+[^<]+?\s+\d+\s*min(?:ute)?s?\s*read\s*<\/p>/gi, '')

    // Defensive cleanup for spans/divs if an older template generated the same line in another element.
    .replace(/\s*<(?:span|div)[^>]*>\s*Updated\s+[^<·]+(?:·|&middot;|&#183;|\u00b7)\s*\d+\s*min(?:ute)?s?\s*read\s*<\/(?:span|div)>/gi, '')

    // Remove standalone read-time or updated labels if they appear separately.
    .replace(/\s*<p[^>]*>\s*\d+\s*min(?:ute)?s?\s*read\s*<\/p>/gi, '')
    .replace(/\s*<p[^>]*>\s*Updated\s+[^<]+\s*<\/p>/gi, '');
}

for (const file of walk(GUIDES)) {
  let html = fs.readFileSync(file, 'utf8');
  html = removeVisibleReadingMeta(html);
  html = cleanEmDashes(html);
  fs.writeFileSync(file, html);
}

console.log('Finalized guides: removed visible dates/read times and cleaned em dashes.');
