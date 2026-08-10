#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(ROOT, 'main-site', 'guides', 'index.html');
let html = fs.readFileSync(file, 'utf8');

// Tile metadata adds noise without helping the reader choose a guide.
// Keep dates/reading information inside guide pages if useful, but remove it from library cards.
html = html.replace(/\n\s*<p class="card-desc">Updated\s*<time[^>]*>[^<]*<\/time>\s*&middot;\s*\d+\s*min read<\/p>/g, '');

fs.writeFileSync(file, html);
console.log('Removed update dates and reading times from guide tiles.');
