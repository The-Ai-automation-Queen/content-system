#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(ROOT, 'main-site', 'guides', 'first-ai-employee.html');
let html = fs.readFileSync(file, 'utf8');

const css = '<link rel="stylesheet" href="/assets/guide-infographics.css?v=20260810">';
if (!html.includes('/assets/guide-infographics.css')) {
  html = html.replace('</head>', `${css}\n</head>`);
}

const figure = `
<figure class="guide-infographic instructional-diagram" data-visual-value="instructional" data-animate="reveal">
  <img src="/assets/diagrams/first-ai-assistant-flow.svg" width="1448" height="1086" loading="eager" decoding="async" alt="Five-step diagram for building a first AI assistant: input, context and rules, AI task, human review, and output. A Queen Bot in a blue dress with an F marks the AI task. AI prepares and the human approves.">
  <figcaption>Start with one repeatable job, give AI clear rules and minimum access, then keep a human approval point before the final output.</figcaption>
</figure>`;

// Replace the older compact flow explainer with the richer instructional diagram.
// This prevents the page from repeating the same idea twice.
const oldExplainer = /\s*<div class="callout"[^>]*>[\s\S]*?<p class="callout-label">PICTURE IT<\/p>[\s\S]*?<\/div>\s*<div class="guide-flow"[^>]*>[\s\S]*?<\/div>/i;
if (oldExplainer.test(html)) {
  html = html.replace(oldExplainer, `\n${figure}`);
} else if (!html.includes('first-ai-assistant-flow.svg')) {
  // Fallback for future copy revisions: place it after the short definition paragraph.
  const anchor = /(<p>It might sort an inbox, prepare a report, qualify a lead or turn meeting notes into actions\.<\/p>)/i;
  if (anchor.test(html)) html = html.replace(anchor, `$1\n${figure}`);
  else html = html.replace(/(<div class="prose"[^>]*>)/i, `$1\n${figure}`);
}

fs.writeFileSync(file, html);
console.log('guide-infographic first-ai-employee.html');
