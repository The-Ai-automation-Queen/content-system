#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAIN = path.join(ROOT, 'main-site');
const BRIEF = path.join(ROOT, 'ai-insider-brief', 'ai-insider-brief');

function patchFile(file, fn) {
  if (!fs.existsSync(file)) return;
  const before = fs.readFileSync(file, 'utf8');
  const after = fn(before);
  if (after !== before) fs.writeFileSync(file, after);
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === '_archive' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const HOME_STYLE = `<style id="final-home-accessibility">
body[data-page-kind="home"] .possibilities-number{
  color:var(--blue,#2C4BE0)!important;
  opacity:1!important;
}
body[data-page-kind="home"] .possibilities-stage,
body[data-page-kind="home"] .possibilities-eyebrow{
  color:var(--blue-deep,#1B2EA0)!important;
  opacity:1!important;
}
</style>`;

const WORKSHOP_STYLE = `<style id="final-workshop-polish">
body[data-page-kind="workshops"] .talk{padding:28px!important}
body[data-page-kind="workshops"] .talk .fmt{margin-bottom:16px!important}
body[data-page-kind="workshops"] .talk h3{margin:0 0 14px!important}
body[data-page-kind="workshops"] .talk p{margin:0 0 20px!important}
body[data-page-kind="workshops"] .talk .fee{display:block!important;margin-top:10px!important}
body[data-page-kind="workshops"] .guarantee h2{font-size:clamp(34px,4.6vw,46px)!important;line-height:1.08!important;margin-bottom:18px!important}
body[data-page-kind="workshops"] .guarantee .line{font-size:18px!important;line-height:1.55!important;font-weight:400!important;margin:0!important}
body[data-page-kind="workshops"] .guarantee .support{display:none!important}
@media(max-width:700px){
  body[data-page-kind="workshops"] .talk{padding:24px 20px!important}
  body[data-page-kind="workshops"] .talk .fmt{margin-bottom:14px!important}
  body[data-page-kind="workshops"] .talk h3{font-size:27px!important;line-height:1.12!important;margin-bottom:14px!important}
  body[data-page-kind="workshops"] .talk p{font-size:17px!important;line-height:1.55!important;margin-bottom:18px!important}
  body[data-page-kind="workshops"] .talk .fee{margin-top:8px!important}
  body[data-page-kind="workshops"] .guarantee{padding:24px 20px!important}
  body[data-page-kind="workshops"] .guarantee h2{font-size:36px!important;line-height:1.08!important;margin-bottom:16px!important}
  body[data-page-kind="workshops"] .guarantee .line{font-size:17px!important;line-height:1.5!important}
}
</style>`;

const BRIEF_STYLE = `<style id="final-brief-polish">
@media(max-width:700px){
  body[data-page-kind="brief"] .category-bar-inner{
    justify-content:flex-start!important;
    overflow-x:auto!important;
    padding-left:18px!important;
    padding-right:18px!important;
    scroll-padding-inline:18px!important;
  }
  body[data-page-kind="brief"] .category-pill{flex:0 0 auto!important;padding-left:18px!important;padding-right:18px!important}
}
</style>`;

patchFile(path.join(MAIN, 'index.html'), html => {
  html = html.replace(/\s*<style id="final-home-accessibility">[\s\S]*?<\/style>/g, '');
  html = html.replace('</head>', `${HOME_STYLE}\n</head>`);
  html = html
    .replace(/\s*<p class="possibilities-principle">[\s\S]*?<\/p>/g, '')
    .replace(/\s*<section class="live-week"[\s\S]*?<\/section>/g, '');
  return html;
});

patchFile(path.join(MAIN, 'workshops.html'), html => {
  html = html.replace(/\s*<style id="final-workshop-polish">[\s\S]*?<\/style>/g, '');
  html = html.replace('</head>', `${WORKSHOP_STYLE}\n</head>`);
  html = html
    .replace(/<div class="fmt">(?:<!-- copy:workshops\.formats\.2\.title -->)?[\s\S]*?(?:<!-- \/copy:workshops\.formats\.2\.title -->)?\s*&middot;\s*teams<\/div>/i, '<div class="fmt">Team transformation &middot; multi-session</div>')
    .replace(/<div class="fmt">MISSING:WORKSHOPS\.FORMATS\.2\.TITLE\s*&middot;\s*TEAMS<\/div>/i, '<div class="fmt">Team transformation &middot; multi-session</div>')
    .replace('<h3>From Corporate to AI-Powered: The Deep Build</h3>', '<h3>Build Your AI Operating System</h3>')
    .replace('A full day inside the method: the team audits its work, picks the highest-value automations, and builds the first ones together. Includes a 30-day follow-up check-in.', 'Your team maps the highest-value work, builds the first automations together, and leaves with a system they can keep improving after the engagement ends.')
    .replace(/<section>\s*<div class="kicker">What changes after<\/div>[\s\S]*?<\/section>/, '<section><div class="kicker">What changes after</div><div class="guarantee"><h2>You leave with something real.</h2><p class="line">Hands-on workshops end with a working first version, while keynotes leave your leaders clear on what to act on, what to wait on, and what stays human.</p></div></section>');
  return html;
});

patchFile(path.join(MAIN, 'how-i-can-help.html'), html => html
  .replace('<a class="button primary" href="/contact.html">Contact Fatiha</a>', '<a class="button primary" href="/contact.html" style="text-transform:none">contact me</a>')
  .replace('Contact Fatiha', 'contact me'));

for (const file of walk(MAIN)) {
  patchFile(file, html => html
    .replaceAll('Starter Kit', 'AI Build Kit')
    .replaceAll('starter kit', 'AI Build Kit')
    .replaceAll('STARTER KIT', 'AI BUILD KIT'));
}

patchFile(path.join(BRIEF, 'index.html'), html => {
  html = html.replace(/\s*<style id="final-brief-polish">[\s\S]*?<\/style>/g, '');
  html = html.replace('</head>', `${BRIEF_STYLE}\n</head>`);
  html = html
    .replace(/<h1>Know which AI changes actually affect what you can build\.<\/h1>/, '<h1>I curate the AI news. You get the brief.</h1>')
    .replace(/<h1><!-- copy:brief\.h1 -->[\s\S]*?<!-- \/copy:brief\.h1 --><\/h1>/, '<h1>I curate the AI news. You get the brief.</h1>')
    .replace(/\s*<p class="curator-note">[\s\S]*?<\/p>/, '');
  return html;
});

console.log('Applied final copy, accessibility and mobile polish.');
