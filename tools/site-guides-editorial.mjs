#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(ROOT, 'main-site', 'guides', 'index.html');
let html = fs.readFileSync(file, 'utf8');

// Load the final guides-only layout after all shared style systems.
if (!html.includes('/assets/pages/guides-clean.css')) {
  html = html.replace('</head>', '<link rel="stylesheet" href="/assets/pages/guides-clean.css?v=20260810">\n</head>');
}

// Replace both repeated outcome-navigation layers with one clear editorial navigator.
const outcomeStart = html.indexOf('<!-- outcome navigator -->');
const spotlightStart = html.indexOf('<section class="spotlight">');
if (outcomeStart !== -1 && spotlightStart !== -1 && spotlightStart > outcomeStart) {
  const outcomes = `<!-- outcome navigator -->
<section class="guide-outcomes" id="start-here">
  <div class="guide-section-head">
    <p class="eyebrow">Start with what you need</p>
    <h2>What do you want AI to help you achieve?</h2>
    <p>Pick one outcome. I will show you the most useful place to begin, without making you learn everything first.</p>
  </div>

  <div class="outcome-grid">
    <a class="outcome-card" href="inbox-manager-setup.html">
      <span class="outcome-card-number">01 · SAVE TIME</span>
      <h3>Get repetitive work off your plate.</h3>
      <p>Start with inbox work, follow-up, recurring research or admin that keeps coming back.</p>
      <span class="outcome-card-cta">Start saving time →</span>
    </a>
    <a class="outcome-card" href="what-is-a-prompt.html">
      <span class="outcome-card-number">02 · THINK & CREATE</span>
      <h3>Use AI to think and create better.</h3>
      <p>Turn rough ideas into structure, challenge your thinking, research faster and create stronger first drafts.</p>
      <span class="outcome-card-cta">Build a better brief →</span>
    </a>
    <a class="outcome-card" href="which-ai-tool-for-what.html">
      <span class="outcome-card-number">03 · UNDERSTAND DATA</span>
      <h3>Make sense of your files and numbers.</h3>
      <p>Use AI to question spreadsheets, compare documents, spot patterns and get to the decision faster.</p>
      <span class="outcome-card-cta">Work with your data →</span>
    </a>
    <a class="outcome-card" href="follow-up-setup.html">
      <span class="outcome-card-number">04 · SELL & MARKET</span>
      <h3>Make marketing and follow-up more consistent.</h3>
      <p>Research customers, sharpen messaging, create campaigns and stop good leads disappearing into manual follow-up.</p>
      <span class="outcome-card-cta">Improve follow-up →</span>
    </a>
    <a class="outcome-card" href="first-ai-employee.html">
      <span class="outcome-card-number">05 · BUILD AI HELP</span>
      <h3>Build the assistant or tool you actually need.</h3>
      <p>Give AI one clear job, the right context, the rules and a human handoff before you automate anything.</p>
      <span class="outcome-card-cta">Build your first helper →</span>
    </a>
    <a class="outcome-card" href="24-7-operations-system.html">
      <span class="outcome-card-number">06 · AUTOMATE & SCALE</span>
      <h3>Turn useful tasks into a reliable system.</h3>
      <p>Connect repeatable steps so more work keeps moving without everything waiting for you.</p>
      <span class="outcome-card-cta">Build the workflow →</span>
    </a>
  </div>

  <div class="new-to-ai">
    <div class="new-to-ai-copy">
      <span>New to AI?</span>
      <strong>Start with three short guides.</strong>
    </div>
    <div class="new-to-ai-links">
      <a href="what-is-ai.html">What AI is</a>
      <a href="what-is-a-prompt.html">What a prompt does</a>
      <a href="what-is-agentic.html">What “agentic” means</a>
    </div>
  </div>
  <p class="guide-principle">AI should not replace your thinking. It should amplify it.</p>
</section>

`;
  html = html.slice(0, outcomeStart) + outcomes + html.slice(spotlightStart);
}

// Make the featured area a single strong recommendation rather than three competing cards.
html = html
  .replace('<h2 class="spotlight-title">Start with these.</h2>', '<h2 class="spotlight-title">One good place to start.</h2>')
  .replace('See all guides →', 'Jump to the full library →');

// Replace the dashboard-like controls with a compact library header.
const controlsPattern = /<section class="controls">\s*<div class="controls-head">[\s\S]*?<input class="search" id="lib-search"[\s\S]*?<\/section>\s*<section class="controls" style="padding-top:0">[\s\S]*?<\/section>/;
if (controlsPattern.test(html)) {
  html = html.replace(controlsPattern, `<section class="library-nav" aria-labelledby="library-title">
  <div class="controls-head">
    <p class="eyebrow">The full library</p>
    <h2 id="library-title">Browse only when you need to.</h2>
  </div>
  <div class="library-nav-tools">
    <input class="search" id="lib-search" type="search" placeholder="Search guides…" aria-label="Search guides">
    <div class="filter-group" aria-label="Filter guides">
      <span class="filter-label">Show</span>
      <button class="pill active" data-track="all">All</button>
      <button class="pill" data-track="basics">Basics</button>
      <button class="pill" data-track="toolmap">Tools</button>
      <button class="pill" data-track="business">Build</button>
    </div>
  </div>
</section>`);
}

// Replace the heavy three-card conversion band with two calm next steps.
const ctaPattern = /<section class="cta-band" id="next-steps">[\s\S]*?<\/section>\s*(?=<script>)/;
if (ctaPattern.test(html)) {
  html = html.replace(ctaPattern, `<section class="guides-next" id="next-steps">
  <div class="guides-next-inner">
    <div>
      <p class="eyebrow">When you are ready to go further</p>
      <h2>Keep learning, or build something real.</h2>
    </div>
    <div class="guides-next-grid">
      <a class="guides-next-card" href="https://brief.shiftandlead.com">
        <span>Keep learning</span>
        <h3>The AI Insider Brief</h3>
        <p>One useful filter on what changed in AI, what matters and what you can ignore.</p>
        <b>Read the Brief →</b>
      </a>
      <a class="guides-next-card" href="/how-i-can-help.html">
        <span>Build with me</span>
        <h3>Turn one business goal into a working first version.</h3>
        <p>Start with the outcome. We decide where AI belongs and build around the real work.</p>
        <b>See how I can help →</b>
      </a>
    </div>
  </div>
</section>`);
}

// Remove obsolete progress/course code written for the old three-level start-here layout.
html = html.replace(/\n\s*\/\/ ---- start-here cards: course progress lines ----[\s\S]*?\n\s*\/\/ ---- Tool verdict mini-index inside the series intro card ----/, '\n\n  // ---- Tool verdict mini-index inside the series intro card ----');

fs.writeFileSync(file, html);
console.log('Applied clean editorial guides layout.');
