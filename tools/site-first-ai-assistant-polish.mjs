#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GUIDE = path.join(ROOT, 'main-site', 'guides', 'first-ai-employee.html');
const DIAGRAM = path.join(ROOT, 'main-site', 'assets', 'diagrams', 'first-ai-assistant-flow.svg');

if (!fs.existsSync(GUIDE)) process.exit(0);

let html = fs.readFileSync(GUIDE, 'utf8');

// One concept, one name. The legacy URL can stay for link compatibility, but
// everything a reader sees (including metadata) uses "AI assistant".
html = html
  .replace(/AI workers/g, 'AI assistants')
  .replace(/AI worker/g, 'AI assistant')
  .replace(/AI WORKERS/g, 'AI ASSISTANTS')
  .replace(/AI WORKER/g, 'AI ASSISTANT')
  .replace(/INBOX WORKER/g, 'INBOX ASSISTANT')
  .replace(/Inbox worker/g, 'Inbox assistant');

// Explain the term once instead of switching vocabulary mid-page.
html = html.replace(
  /<h2([^>]*)>What is an AI assistant\?<\/h2>\s*<p>An <strong>AI assistant<\/strong> is an AI system set up to do one repeatable job for your business\.<\/p>\s*<p>It might sort an inbox, prepare a report, qualify a lead or turn meeting notes into actions\.<\/p>/i,
  `<h2$1>What do I mean by an AI assistant?</h2>\n<p>Here, an <strong>AI assistant</strong> is an AI system you set up to help with one repeatable business job.</p>\n<p>It might sort an inbox, prepare a report, qualify a lead or turn meeting notes into actions. The assistant handles repeatable steps; you keep decisions, approvals and exceptions.</p>`
);

const style = `<style id="first-ai-assistant-polish">
body.guide[data-page="first-ai-employee"] .guide-hero{padding-bottom:32px!important}
body.guide[data-page="first-ai-employee"] .guide-hero .verdict{margin-bottom:26px!important;max-width:680px!important}
body.guide[data-page="first-ai-employee"] .guide-hero .tldr{margin:0!important;padding:24px 28px!important;border-radius:12px!important}
body.guide[data-page="first-ai-employee"] .guide-hero .tldr li{display:grid!important;grid-template-columns:120px minmax(0,1fr)!important;gap:18px!important;align-items:start!important;padding:0!important;line-height:1.5!important}
body.guide[data-page="first-ai-employee"] .guide-hero .tldr li+li{margin-top:16px!important}
body.guide[data-page="first-ai-employee"] .guide-hero .tldr span{display:block!important;margin:0!important;padding-top:2px!important;line-height:1.35!important}
body.guide[data-page="first-ai-employee"] .prose>h2:first-child{margin-top:0!important}
body.guide[data-page="first-ai-employee"] .prose>h2:first-child+p{margin-bottom:12px!important}
body.guide[data-page="first-ai-employee"] .guide-infographic{margin-top:30px!important;margin-bottom:44px!important}
@media(max-width:700px){
  body.guide[data-page="first-ai-employee"] .guide-hero{padding-bottom:26px!important}
  body.guide[data-page="first-ai-employee"] .guide-hero .verdict{margin-bottom:22px!important}
  body.guide[data-page="first-ai-employee"] .guide-hero .tldr{padding:20px!important}
  body.guide[data-page="first-ai-employee"] .guide-hero .tldr li{grid-template-columns:1fr!important;gap:4px!important}
  body.guide[data-page="first-ai-employee"] .guide-hero .tldr li+li{margin-top:15px!important}
  body.guide[data-page="first-ai-employee"] .guide-infographic{margin-top:24px!important;margin-bottom:36px!important}
}
</style>`;

html = html
  .replace(/\s*<style id="first-ai-assistant-polish">[\s\S]*?<\/style>/g, '')
  .replace('</head>', `${style}\n</head>`)
  .replace(/(<img src="\/assets\/diagrams\/first-ai-assistant-flow\.svg"[^>]*?)height="1086"/i, '$1height="936"')
  .replace(
    /<figcaption>Start with one repeatable job, give AI clear rules and minimum access, then keep a human approval point before the final output\.<\/figcaption>/i,
    '<figcaption>The flow: input → context and rules → AI task → human review → output.</figcaption>'
  );

// The article already owns the title. Remove the repeated title/subtitle from the
// diagram and crop that now-empty top band so the visual starts with the actual flow.
if (fs.existsSync(DIAGRAM)) {
  let svg = fs.readFileSync(DIAGRAM, 'utf8');
  svg = svg
    .replace('viewBox="0 0 1448 1086"', 'viewBox="0 150 1448 936"')
    .replace(
      /(<rect width="1448" height="1086" rx="28" fill="#F7F7F3"\/>)[\s\S]*?(?=\s*<!-- Callouts -->)/,
      '$1\n\n'
    );
  fs.writeFileSync(DIAGRAM, svg);
}

// Guard against the exact drift that produced the mixed page.
if (/AI worker|AI WORKER|INBOX WORKER/i.test(html)) {
  throw new Error('First AI assistant guide still contains worker terminology');
}

fs.writeFileSync(GUIDE, html);
console.log('Polished first AI assistant guide: consistent terminology, balanced summary spacing, duplicate visual title removed.');
