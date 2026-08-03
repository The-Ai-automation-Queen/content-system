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

const UI_FONT_LINK = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">';

const BRAND_CONSISTENCY_CSS = `
:root{
  --brand-ui:"Inter",Arial,sans-serif;
  --brand-label:"Space Mono",ui-monospace,"SF Mono",Menlo,monospace;
  --brand-radius-ui:6px;
  --brand-radius-card:10px;
}

body[data-brand-page]{
  font-family:"Source Serif 4",Georgia,serif;
  color:var(--ink,#1A1A1A);
  line-height:1.65;
}
body[data-brand-page]:not([data-brand-page="guide"]):not([data-brand-page="brief"]){font-size:17px}
body[data-brand-page="guide"]{font-size:19px;line-height:1.7}
body[data-brand-page="brief"]{line-height:normal}

body[data-brand-page] h1,
body[data-brand-page] h2,
body[data-brand-page] h3,
body[data-brand-page] h4,
body[data-brand-page] .site-nav-logo,
body[data-brand-page] .header-logo,
body[data-brand-page] .gate-title,
body[data-brand-page] .row-title,
body[data-brand-page] .pull-text,
body[data-brand-page] .router-title,
body[data-brand-page] .section-title{
  font-family:"Playfair Display",Georgia,serif;
}
body[data-brand-page] h1,
body[data-brand-page] h2,
body[data-brand-page] h3,
body[data-brand-page] h4{
  font-weight:400;
  letter-spacing:-.012em;
}
body[data-brand-page] .site-nav-logo,
body[data-brand-page] .header-logo{font-weight:700}

body[data-brand-page] .site-nav-links,
body[data-brand-page] .site-nav-links a,
body[data-brand-page] .nav-links,
body[data-brand-page] .nav-links a,
body[data-brand-page] button,
body[data-brand-page] input,
body[data-brand-page] select,
body[data-brand-page] textarea,
body[data-brand-page] .button,
body[data-brand-page] .btn,
body[data-brand-page] .btn-primary,
body[data-brand-page] .btn-ghost,
body[data-brand-page] .btn-start,
body[data-brand-page] .btn-cream,
body[data-brand-page] .header-subscribe,
body[data-brand-page] .r-cta a,
body[data-brand-page] .row-cta{
  font-family:var(--brand-ui);
}

body[data-brand-page] .mono,
body[data-brand-page] .eyebrow,
body[data-brand-page] .kicker,
body[data-brand-page] .hero-kicker,
body[data-brand-page] .section-eyebrow,
body[data-brand-page] .spotlight-eyebrow,
body[data-brand-page] .controls-eyebrow,
body[data-brand-page] .cta-eyebrow,
body[data-brand-page] .intro-kicker,
body[data-brand-page] .q-area,
body[data-brand-page] .r-kicker,
body[data-brand-page] .gate-proof,
body[data-brand-page] .guide-byline,
body[data-brand-page] .kit-count,
body[data-brand-page] .timeline-item .when,
body[data-brand-page] .offer-step .n,
body[data-brand-page] .kit-item .cat,
body[data-brand-page] .footer-col-head,
body[data-brand-page] .chrome-foot h2,
body[data-brand-page] .chrome-foot-legal,
body[data-brand-page] .row-kicker,
body[data-brand-page] .row-date,
body[data-brand-page] .card-kicker{
  font-family:var(--brand-label);
}

body[data-brand-page] .site-nav-inner{padding:16px 26px}
body[data-brand-page] .site-nav-links{font-size:12px;font-weight:600;letter-spacing:.08em}
body[data-brand-page] .site-nav-links .nav-cta{border-radius:var(--brand-radius-ui)}

body[data-brand-page] .button,
body[data-brand-page] .btn,
body[data-brand-page] .btn-primary,
body[data-brand-page] .btn-ghost,
body[data-brand-page] .btn-start,
body[data-brand-page] .btn-cream,
body[data-brand-page] .header-subscribe,
body[data-brand-page] .r-cta a,
body[data-brand-page] .r-email-row button,
body[data-brand-page] .gate-form button,
body[data-brand-page] .capture-form button,
body[data-brand-page] .apply-form button{
  border-radius:var(--brand-radius-ui);
  font-weight:600;
  letter-spacing:.08em;
}
body[data-brand-page] input,
body[data-brand-page] select,
body[data-brand-page] textarea{
  border-radius:var(--brand-radius-ui);
}

body[data-brand-page] .case-card,
body[data-brand-page] .testi-card,
body[data-brand-page] .router-card,
body[data-brand-page] .ladder-card,
body[data-brand-page] .spot-feat,
body[data-brand-page] .spot-mini,
body[data-brand-page] .cta-card,
body[data-brand-page] .receipt,
body[data-brand-page] .talk,
body[data-brand-page] .leave,
body[data-brand-page] .why > div,
body[data-brand-page] .company,
body[data-brand-page] .community-box,
body[data-brand-page] .offer-card,
body[data-brand-page] .proof,
body[data-brand-page] .client-proof,
body[data-brand-page] .kit-item,
body[data-brand-page] .card,
body[data-brand-page] .r-cta,
body[data-brand-page] .byline-in,
body[data-brand-page] .upsell,
body[data-brand-page] .cover img,
body[data-brand-page] .hero-portrait,
body[data-brand-page] .hero img{
  border-radius:var(--brand-radius-card);
}

body[data-brand-page="guides"] .hero-kicker{
  font-style:normal;
  font-size:11px;
  text-transform:uppercase;
  letter-spacing:.18em;
  color:var(--blue-deep,#1B2EA0);
}
body[data-brand-page="guides"] .hero h1{
  font-size:clamp(42px,6vw,68px);
  line-height:1.03;
  font-style:normal;
  color:var(--ink,#1A1A1A);
}
body[data-brand-page="guides"] .hero h1 em{font-style:italic;color:var(--blue,#2C4BE0)}

body[data-brand-page="brief"] .site-header{
  padding:0 24px;
  border-bottom:1px solid var(--line,#E8E4DD);
  background:rgba(255,255,255,.96);
  backdrop-filter:blur(10px);
}
body[data-brand-page="brief"] .header-inner{min-height:64px;max-width:1220px}
body[data-brand-page="brief"] .header-logo{
  font-style:normal;
  font-size:21px;
  color:var(--ink,#1A1A1A);
  letter-spacing:0;
}
body[data-brand-page="brief"] .header-subscribe{
  border-radius:var(--brand-radius-ui);
  text-transform:uppercase;
  letter-spacing:.08em;
  font-size:12px;
}
body[data-brand-page="brief"] .hero h1{
  font-size:clamp(42px,6vw,68px);
  line-height:1.04;
  font-style:normal;
  font-weight:400;
  color:var(--ink,#1A1A1A);
}
body[data-brand-page="brief"] .hero h1 em{font-style:italic;color:var(--blue,#2C4BE0)}

/* Blue is the brand accent. Red is reserved for true errors or warnings. */
body[data-brand-page] .pains-list li::before{color:var(--blue,#2C4BE0)}
body[data-brand-page] .r-bar-row.worst .r-bar-fill{background:var(--blue-deep,#1B2EA0)}
body[data-brand-page="guides"] .chip-setup,
body[data-brand-page="guides"] .chip-literacy,
body[data-brand-page="guides"] .chip-data,
body[data-brand-page="guides"] .chip-track0{
  background:var(--accent-tint,#E4EAFB);
  color:var(--blue-deep,#1B2EA0);
  border:1px solid var(--line,#E8E4DD);
}

@media(max-width:700px){
  body[data-brand-page] .site-nav-inner{padding:14px 18px}
  body[data-brand-page="guides"] .hero h1,
  body[data-brand-page="brief"] .hero h1{font-size:clamp(38px,11vw,52px)}
}
`;

function ensureBrandConsistency(html, page) {
  html = html.replace(/\s*<style id="brand-consistency-v2">[\s\S]*?<\/style>/g, '');
  html = html.replace(/<body([^>]*)>/, (_m, attrs) => {
    const cleaned = attrs.replace(/\sdata-brand-page="[^"]*"/g, '');
    return `<body${cleaned} data-brand-page="${page}">`;
  });

  if (!html.includes('family=Inter') || !html.includes('family=Space+Mono')) {
    html = html.replace('</head>', `${UI_FONT_LINK}\n</head>`);
  }

  return html.replace('</head>', `<style id="brand-consistency-v2">${BRAND_CONSISTENCY_CSS}</style>\n</head>`);
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

  return ensureBrandConsistency(ensureNeutralCss(html), 'home');
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
  return ensureBrandConsistency(ensureNeutralCss(html), 'about');
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

  return ensureBrandConsistency(ensureNeutralCss(html), 'build');
});

patchFile('main-site/workshops.html', (html) => ensureBrandConsistency(ensureNeutralCss(html), 'workshops'));

patchFile('main-site/starter-kit.html', (html) => {
  html = html
    .replace('Every prompt, template and setup I use, written in plain English for people who don\'t code and don\'t want to. Nothing here\'s locked. Put your email in and the new ones come to you as I add them.', 'Use the same briefs, guardrails and setup templates I use to turn an AI idea into something you can actually run. Start with what you need now, then come back as the library grows.')
    .replace('<h3>The lead-qualifier brief</h3>\n      <p>The shape behind the day care build: qualify, answer, book, hand over. From the case study.</p>\n      <a href="https://www.shiftandlead.com/case-study-2.html">Read the case study</a>', '<h3>The first-use-case scorecard</h3>\n      <p>A simple way to choose what AI should handle first: repeatable work, clear inputs, visible output, human review.</p>\n      <a href="/guides/first-ai-employee.html">Open the guide</a>')
    .replace('<h3>The missed-call recovery loop</h3>\n      <p>Catch the call you didn\'t answer and get back to them before they ring a competitor. From the tire shop build.</p>\n      <a href="https://www.shiftandlead.com/case-study-3.html">Read the case study</a>', '<h3>The human handoff rule</h3>\n      <p>Define what AI can finish, what it must flag, and exactly when a person takes over before you automate the work.</p>\n      <a href="/guides/24-7-operations-system.html">Open the guide</a>');
  return ensureBrandConsistency(html, 'starter-kit');
});

patchFile('main-site/quiz.html', (html) => ensureBrandConsistency(html, 'quiz'));
patchFile('main-site/guides/index.html', (html) => ensureBrandConsistency(html, 'guides'));

const guidesDir = path.join(ROOT, 'main-site', 'guides');
if (fs.existsSync(guidesDir)) {
  for (const name of fs.readdirSync(guidesDir)) {
    if (!name.endsWith('.html') || name === 'index.html') continue;
    patchFile(path.join('main-site', 'guides', name), (html) => ensureBrandConsistency(html, 'guide'));
  }
}

patchFile('ai-insider-brief/ai-insider-brief/index.html', (html) => ensureBrandConsistency(html, 'brief'));

console.log('Applied proof, copy, and brand consistency patches.');
