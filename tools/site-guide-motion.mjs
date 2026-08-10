#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GUIDES = path.join(ROOT, 'main-site', 'guides');

const files = fs.readdirSync(GUIDES).filter(name => name.endsWith('.html') && name !== 'index.html');
let touched = 0;

for (const name of files) {
  const file = path.join(GUIDES, name);
  let html = fs.readFileSync(file, 'utf8');
  if (!/<body[^>]*class="[^"]*guide/.test(html) || !html.includes('class="guide-doc"')) continue;
  const before = html;

  if (!html.includes('/assets/guide-interactive.css')) {
    html = html.replace('</head>', '<link rel="stylesheet" href="/assets/guide-interactive.css?v=20260810">\n<script defer src="/assets/guide-motion.js?v=20260810"></script>\n</head>');
  }

  html = html.replace('<header class="guide-hero">', '<header class="guide-hero" data-animate="hero">');
  html = html.replace('<section class="related">', '<section class="related" data-animate="reveal">');

  const proseStart = html.indexOf('<div class="prose">');
  const proseEnd = proseStart === -1 ? -1 : html.indexOf('</div>\n<section class="related"', proseStart);
  if (proseStart !== -1 && proseEnd !== -1) {
    const head = html.slice(0, proseStart);
    let prose = html.slice(proseStart, proseEnd + 6);
    const tail = html.slice(proseEnd + 6);

    prose = prose
      .replace(/<div class="callout">/g, '<div class="callout" data-animate="reveal">')
      .replace(/<div class="guide-table">/g, '<div class="guide-table" data-animate="reveal">')
      .replace(/<ul>/g, '<ul data-animate="stagger">')
      .replace(/<ol>/g, '<ol data-animate="stagger">')
      .replace(/<h2>(Step\s+(\d+):[^<]*)<\/h2>/gi, (_m, text, number) => `<h2 data-animate="reveal" data-guide-step="${number}">${text}</h2>`)
      .replace(/<h2>(?![^<]*data-animate)([^<]+)<\/h2>/g, '<h2 data-animate="reveal">$1</h2>');

    html = head + prose + tail;
  }

  if (name === 'first-ai-employee.html' && !html.includes('class="guide-flow"')) {
    const marker = '<div class="callout" data-animate="reveal"><p class="callout-label">PICTURE IT</p><p><strong>Input → AI does the repeatable steps → you review or decide → output.</strong></p></div>';
    const flow = `${marker}\n<div class="guide-flow" data-animate="workflow" aria-label="AI assistant workflow">\n  <div class="guide-flow-node" data-flow-node><span>01</span><strong>INPUT</strong><p>The email, file, form or event that starts the job.</p></div>\n  <div class="guide-flow-arrow" aria-hidden="true">→</div>\n  <div class="guide-flow-node" data-flow-node><span>02</span><strong>AI TASK</strong><p>AI handles the repeatable steps you already understand.</p></div>\n  <div class="guide-flow-arrow" aria-hidden="true">→</div>\n  <div class="guide-flow-node" data-flow-node><span>03</span><strong>HUMAN REVIEW</strong><p>You keep judgment, approval and sensitive decisions.</p></div>\n  <div class="guide-flow-arrow" aria-hidden="true">→</div>\n  <div class="guide-flow-node" data-flow-node><span>04</span><strong>OUTPUT</strong><p>A draft, summary, decision brief or completed task.</p></div>\n</div>`;
    html = html.replace(marker, flow);
  }

  if (name === 'what-is-a-prompt.html' && !html.includes('class="guide-compare"')) {
    const marker = '<p>The second prompt works better because the AI can see the situation.</p>';
    const compare = `<div class="guide-compare" data-animate="compare" aria-label="Weak prompt compared with a useful prompt">\n  <div class="guide-compare-panel" data-compare="before">\n    <p class="guide-compare-kicker">BEFORE · VAGUE</p>\n    <p class="guide-compare-text">“Write a follow-up email.”</p>\n  </div>\n  <div class="guide-compare-panel" data-compare="after">\n    <p class="guide-compare-kicker">AFTER · USEFUL</p>\n    <p class="guide-compare-text">Give the goal, context, tone, limit and desired outcome.</p>\n  </div>\n  <p class="guide-compare-note">The improvement is not a clever phrase. It is the missing information the AI needs to do the job well.</p>\n</div>`;
    html = html.replace(marker, marker + '\n' + compare);
  }

  if (html !== before) {
    fs.writeFileSync(file, html);
    touched++;
    console.log('guide-motion', name);
  }
}

console.log(`Applied guide motion system to ${touched} guide page(s).`);
