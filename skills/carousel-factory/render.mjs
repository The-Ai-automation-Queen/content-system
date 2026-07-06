#!/usr/bin/env node
// Render a carousel HTML file to per-slide PNGs (1080x1350).
// Usage: node render.mjs <carousel.html> <outdir>
// Chromium path: CHROMIUM_PATH env var, default /opt/pw-browsers/chromium.
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';

const [, , htmlFile, outdir = 'out'] = process.argv;
if (!htmlFile) {
  console.error('Usage: node render.mjs <carousel.html> <outdir>');
  process.exit(1);
}
mkdirSync(outdir, { recursive: true });

const executablePath = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium';
const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: 1200, height: 1500 } });
await page.goto('file://' + resolve(htmlFile), { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const slides = page.locator('section.slide');
const n = await slides.count();
if (n === 0) {
  console.error('No <section class="slide"> found in ' + htmlFile);
  await browser.close();
  process.exit(1);
}
const stem = basename(htmlFile).replace(/\.html?$/, '');
for (let i = 0; i < n; i++) {
  const path = `${outdir}/${stem}-${String(i + 1).padStart(2, '0')}.png`;
  await slides.nth(i).screenshot({ path });
  console.log(path);
}
await browser.close();
console.log(`Rendered ${n} slides.`);
