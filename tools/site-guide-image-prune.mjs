#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GUIDES = path.join(ROOT, 'main-site', 'guides');
const files = fs.readdirSync(GUIDES).filter(name => name.endsWith('.html') && name !== 'index.html');

let touched = 0;
let removedHeroVisuals = 0;
let removedRelatedImages = 0;
const retainedArticleImages = [];

for (const name of files) {
  const file = path.join(GUIDES, name);
  let html = fs.readFileSync(file, 'utf8');
  if (!/<body[^>]*class="[^"]*guide/.test(html)) continue;
  const before = html;

  // Guide covers are useful in the library and as social/OG images, but repeating
  // the cover directly under the article H1 adds no instructional value.
  html = html.replace(/<header class="guide-hero"([^>]*)>([\s\S]*?)<\/header>/g, (whole, attrs, body) => {
    let next = body;
    const figuresBefore = (next.match(/<figure\b[^>]*>[\s\S]*?<img\b[\s\S]*?<\/figure>/gi) || []).length;
    const standaloneBefore = (next.match(/<img\b[^>]*>/gi) || []).length;

    next = next
      .replace(/\s*<figure\b[^>]*>[\s\S]*?<img\b[\s\S]*?<\/figure>/gi, '')
      .replace(/\s*<img\b[^>]*>/gi, '');

    const figuresAfter = (next.match(/<figure\b[^>]*>[\s\S]*?<img\b[\s\S]*?<\/figure>/gi) || []).length;
    const standaloneAfter = (next.match(/<img\b[^>]*>/gi) || []).length;
    removedHeroVisuals += Math.max(0, figuresBefore - figuresAfter) + Math.max(0, standaloneBefore - standaloneAfter - figuresBefore);
    return `<header class="guide-hero"${attrs}>${next}</header>`;
  });

  // Related-guide cards should stay text-first. Their library covers already do the visual job.
  html = html.replace(/<section class="related"([^>]*)>([\s\S]*?)<\/section>/g, (whole, attrs, body) => {
    const count = (body.match(/<img\b[^>]*>/gi) || []).length;
    removedRelatedImages += count;
    return `<section class="related"${attrs}>${body.replace(/\s*<img\b[^>]*>/gi, '')}</section>`;
  });

  // Remove explicitly decorative/legacy article figures only. Explanatory screenshots,
  // diagrams and interactive visuals are intentionally left alone.
  html = html
    .replace(/\s*<figure\b[^>]*class="[^"]*(?:cover|decorative)[^"]*"[^>]*>[\s\S]*?<\/figure>/gi, '')
    .replace(/\s*<figure\b[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/figure>/gi, '');

  // Audit any image still inside the article. Keeping one is a conscious decision:
  // it should explain a concept, show a real interface, demonstrate an example or provide evidence.
  const article = html.match(/<(?:article|main) class="guide-doc"[^>]*>([\s\S]*?)<\/(?:article|main)>/i);
  if (article) {
    const imgs = article[1].match(/<img\b[^>]*>/gi) || [];
    imgs.forEach(img => retainedArticleImages.push(`${name}: ${img.replace(/\s+/g, ' ')}`));
  }

  if (html !== before) {
    fs.writeFileSync(file, html);
    touched++;
    console.log('guide-image-prune', name);
  }
}

console.log(`Guide image review: ${touched} page(s) changed; ${removedHeroVisuals} hero visual(s) removed; ${removedRelatedImages} related-card image(s) removed.`);
if (retainedArticleImages.length) {
  console.log('Retained instructional/evidence images for manual review:');
  retainedArticleImages.forEach(line => console.log('  ' + line));
} else {
  console.log('No remaining raster/SVG images inside guide article bodies. Interactive HTML/CSS explainers remain.');
}
