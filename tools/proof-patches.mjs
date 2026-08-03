#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function patchFile(relativePath, transform) {
  const file = path.join(ROOT, relativePath);
  if (!fs.existsSync(file)) return;
  const before = fs.readFileSync(file, 'utf8');
  const after = transform(before);
  if (after !== before) fs.writeFileSync(file, after);
}

function ensureNeutralCss(html) {
  if (html.includes('/assets/section-overrides.css')) return html;
  return html.replace('</head>', '<link rel="stylesheet" href="/assets/section-overrides.css">\n</head>');
}

const coccoShortCard = `    <div class="testi-card">
      <div class="testi-stat">From no AI experience to building AI products.</div>
      <p class="testi-quote">&ldquo;I went from having no AI experience to automating much of my workflow and building AI products faster than I thought possible. Fatiha made something complex feel simple and practical.&rdquo;</p>
      <div class="testi-attrib">
        <div class="testi-name">Cocco M., Beauty Business Coach, HighPerfomanceBusinessAcademy</div>
      </div>
    </div>`;

patchFile('main-site/index.html', (html) => {
  const myriamCard = /    <div class="testi-card">\s*<div class="testi-stat">Less admin\. More innovation\.<\/div>[\s\S]*?<div class="testi-name">Myriam M\.<\/div>[\s\S]*?<\/div>\s*<\/div>/;
  html = html.replace(myriamCard, coccoShortCard);

  html = html
    .replace('<div class="section-eyebrow">Let&rsquo;s talk</div>', '<div class="section-eyebrow"><!-- copy:home.contact_eyebrow -->Have something you want to build?<!-- /copy:home.contact_eyebrow --></div>')
    .replace('<h2>Speaking, bespoke builds, or just say hello.</h2>', '<h2><!-- copy:home.contact_h2 -->Tell me what you want AI to make possible.<!-- /copy:home.contact_h2 --></h2>')
    .replace('<p>For workshops, keynotes, or a quoted done-with-you project, or if you just want to be first in line when the Community opens.</p>', '<p><!-- copy:home.contact_body -->Share what you are trying to build, what is slowing it down, and where you think AI could help. I will point you to the most useful next step.<!-- /copy:home.contact_body --></p>')
    .replace('placeholder="What are you working on?"', 'placeholder="What are you trying to build?"')
    .replace('>Email me your question</button>', '><!-- copy:home.contact_cta -->Tell me what you\'re building<!-- /copy:home.contact_cta --></button>');

  return ensureNeutralCss(html);
});

const aboutQuote = `<section class="client-pullquote">
  <div class="kicker">In her words</div>
  <h2>&ldquo;I never believed I would be able to understand and use AI the way I do today.&rdquo;</h2>
  <p><strong>Cocco M.</strong><br>Beauty Business Coach, HighPerfomanceBusinessAcademy</p>
</section>`;

patchFile('main-site/about.html', (html) => {
  if (!html.includes('HighPerfomanceBusinessAcademy')) {
    const anchor = `</section>\n\n<section>\n  <div class="company">`;
    html = html.replace(anchor, `</section>\n\n${aboutQuote}\n\n<section>\n  <div class="company">`);
  }
  return ensureNeutralCss(html);
});

const fullTestimonial = `<section class="offer-section client-proof">
  <p class="eyebrow mono">Client outcome</p>
  <h2>From no AI experience to building AI products.</h2>
  <blockquote>
    <p>&ldquo;Working with Fatiha has genuinely changed the way I work.</p>
    <p>I never believed I would be able to understand and use AI the way I do today. Fatiha has an incredible ability to explain complex things in such a simple, practical way that even someone with no AI experience can quickly understand and start applying it.</p>
    <p>Since working with her, I&rsquo;ve saved countless hours creating content because so much of my workflow is now automated. I&rsquo;ve also built AI products faster than I ever thought possible.</p>
    <p>Fatiha doesn&rsquo;t just teach AI; she empowers you to use it with confidence. Her knowledge is exceptional, and the impact she&rsquo;s had on my business has been truly life-changing.&rdquo;</p>
  </blockquote>
  <p><strong>Cocco M.</strong><br>Beauty Business Coach, HighPerfomanceBusinessAcademy</p>
</section>`;

patchFile('main-site/build-sprint.html', (html) => {
  const oldProof = /<section class="offer-section">\s*<h2><!-- copy:build_sprint\.examples_h2 -->[\s\S]*?<\/section>\s*/;
  html = html.replace(oldProof, '');

  if (!html.includes('Beauty Business Coach, HighPerfomanceBusinessAcademy')) {
    const anchor = `<section class="offer-section">\n  <h2><!-- copy:build_sprint.fit_h2 -->Who this is for<!-- /copy:build_sprint.fit_h2 -->, and who it's not</h2>`;
    html = html.replace(anchor, `${fullTestimonial}\n\n${anchor}`);
  }

  return ensureNeutralCss(html);
});

patchFile('main-site/workshops.html', (html) => ensureNeutralCss(html));

patchFile('main-site/starter-kit.html', (html) => {
  html = html
    .replace('Every prompt, template and setup I use, written in plain English for people who don\'t code and don\'t want to. Nothing here\'s locked. Put your email in and the new ones come to you as I add them.', 'Use the same briefs, guardrails and setup templates I use to turn an AI idea into something you can actually run. Start with what you need now, then come back as the library grows.')
    .replace('<h3>The lead-qualifier brief</h3>\n      <p>The shape behind the day care build: qualify, answer, book, hand over. From the case study.</p>\n      <a href="https://www.shiftandlead.com/case-study-2.html">Read the case study</a>', '<h3>The first-use-case scorecard</h3>\n      <p>A simple way to choose what AI should handle first: repeatable work, clear inputs, visible output, human review.</p>\n      <a href="/guides/first-ai-employee.html">Open the guide</a>')
    .replace('<h3>The missed-call recovery loop</h3>\n      <p>Catch the call you didn\'t answer and get back to them before they ring a competitor. From the tire shop build.</p>\n      <a href="https://www.shiftandlead.com/case-study-3.html">Read the case study</a>', '<h3>The human handoff rule</h3>\n      <p>Define what AI can finish, what it must flag, and exactly when a person takes over before you automate the work.</p>\n      <a href="/guides/24-7-operations-system.html">Open the guide</a>');
  return html;
});

console.log('Applied proof and copy patches.');
