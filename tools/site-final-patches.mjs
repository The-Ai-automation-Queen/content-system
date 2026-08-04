#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAIN = path.join(ROOT, 'main-site');
const BRIEF = path.join(ROOT, 'ai-insider-brief', 'ai-insider-brief');
const GUIDES = path.join(MAIN, 'guides');

function patch(file, fn) {
  if (!fs.existsSync(file)) return;
  const before = fs.readFileSync(file, 'utf8');
  const after = fn(before);
  if (after !== before) fs.writeFileSync(file, after);
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === '_archive' || e.name === 'node_modules') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const HOME_STYLE = `<style id="final-home-accessibility">body[data-page-kind="home"] .possibilities-number{color:var(--blue,#2C4BE0)!important;opacity:1!important}body[data-page-kind="home"] .possibilities-stage,body[data-page-kind="home"] .possibilities-eyebrow{color:var(--blue-deep,#1B2EA0)!important;opacity:1!important}</style>`;
const WORKSHOP_STYLE = `<style id="final-workshop-polish">body[data-page-kind="workshops"] .talk{padding:28px!important}body[data-page-kind="workshops"] .talk .fmt{margin-bottom:16px!important}body[data-page-kind="workshops"] .talk h3{margin:0 0 14px!important}body[data-page-kind="workshops"] .talk p{margin:0 0 20px!important}body[data-page-kind="workshops"] .talk .fee{display:block!important;margin-top:10px!important}body[data-page-kind="workshops"] .guarantee h2{font-size:clamp(34px,4.6vw,46px)!important;line-height:1.08!important;margin-bottom:18px!important}body[data-page-kind="workshops"] .guarantee .line{font-size:18px!important;line-height:1.55!important;font-weight:400!important;margin:0!important}body[data-page-kind="workshops"] .guarantee .support{display:none!important}@media(max-width:700px){body[data-page-kind="workshops"] .talk{padding:24px 20px!important}body[data-page-kind="workshops"] .talk h3{font-size:27px!important;line-height:1.12!important}body[data-page-kind="workshops"] .talk p{font-size:17px!important;line-height:1.55!important}body[data-page-kind="workshops"] .guarantee{padding:24px 20px!important}body[data-page-kind="workshops"] .guarantee h2{font-size:36px!important}body[data-page-kind="workshops"] .guarantee .line{font-size:17px!important;line-height:1.5!important}}</style>`;
const BRIEF_STYLE = `<style id="final-brief-polish">@media(max-width:700px){body[data-page-kind="brief"] .category-bar-inner{justify-content:flex-start!important;overflow-x:auto!important;padding-left:18px!important;padding-right:18px!important;scroll-padding-inline:18px!important}body[data-page-kind="brief"] .category-pill{flex:0 0 auto!important;padding-left:18px!important;padding-right:18px!important}}</style>`;
const GUIDE_STYLE = `<style id="final-guide-clarity">
body.guide .mono,body.guide .eyebrow,body.guide .callout-label,body.guide .gate-proof,body.guide .guide-table th{color:#2C4BE0!important}
body.guide .guide-hero{padding-top:38px!important;padding-bottom:18px!important}
body.guide .guide-hero h1{margin-bottom:16px!important}
body.guide .verdict{margin-bottom:0!important;max-width:650px}
body.guide .prose{padding-top:0!important}
body.guide .prose h2{margin-top:40px!important}
body.guide .callout{background:transparent!important;border:0!important;border-left:3px solid #2C4BE0!important;border-radius:0!important;padding:2px 0 2px 18px!important;margin:28px 0!important}
body.guide .callout-label{margin-bottom:8px!important}
body.guide .gate{margin-top:42px!important;margin-bottom:42px!important;padding:30px 22px!important}
body.guide .gate-title{font-size:28px!important;line-height:1.15!important}
body.guide .gate-sub{font-size:16px!important;line-height:1.55!important}
body.guide .gate-fineprint{color:#555!important}
body.guide .related{margin-top:46px!important}
body.guide .related .card{border-top:3px solid #2C4BE0!important;border-radius:12px!important;box-shadow:none!important}
body.guide .related .card:hover{transform:none!important;box-shadow:none!important}
body.guide .related .card-body{padding:18px!important}
body.guide .byline{margin-top:46px!important}
body.guide .byline-in{background:#fff!important;border:0!important;border-top:1px solid var(--line)!important;border-radius:0!important;padding:22px 0!important;align-items:flex-start!important}
body.guide .byline-in img{width:52px!important;height:52px!important}
body.guide .upsell{margin-top:46px!important;margin-bottom:46px!important}
@media(max-width:700px){
  body.guide{font-size:18px!important;line-height:1.62!important}
  body.guide .guide-doc{padding-left:18px!important;padding-right:18px!important;padding-bottom:48px!important}
  body.guide .guide-hero{padding-top:34px!important}
  body.guide .guide-hero h1{font-size:42px!important;line-height:1.05!important}
  body.guide .verdict{font-size:21px!important;line-height:1.48!important}
  body.guide .prose h2{font-size:31px!important;line-height:1.12!important;margin-top:36px!important;margin-bottom:12px!important}
  body.guide .prose p{margin-bottom:18px!important}
  body.guide .guide-table{overflow:visible!important;border:0!important;border-radius:0!important;margin:26px 0!important;background:transparent!important}
  body.guide .guide-table table,body.guide .guide-table tbody,body.guide .guide-table tr,body.guide .guide-table td{display:block!important;width:100%!important;min-width:0!important}
  body.guide .guide-table thead{display:none!important}
  body.guide .guide-table tr{padding:18px 0!important;border-bottom:1px solid var(--line)!important}
  body.guide .guide-table tr:first-child{border-top:1px solid var(--line)!important}
  body.guide .guide-table td{padding:4px 0!important;border:0!important;font-size:17px!important;line-height:1.5!important;white-space:normal!important;overflow-wrap:anywhere!important}
  body.guide .guide-table td:first-child{font-family:var(--display)!important;font-size:23px!important;font-weight:700!important;line-height:1.2!important;margin-bottom:6px!important}
  body.guide .gate{margin-left:-18px!important;margin-right:-18px!important;padding:28px 18px!important}
  body.guide .gate-form{display:block!important}
  body.guide .gate-form input[type=email],body.guide .gate-form button{width:100%!important;min-width:0!important}
  body.guide .gate-form button{margin-top:10px!important}
  body.guide .related .card-grid{grid-template-columns:1fr!important;gap:14px!important}
  body.guide .byline-in{gap:14px!important}
  body.guide .byline-in p{font-size:16px!important;line-height:1.5!important}
}
</style>`;

patch(path.join(MAIN, 'index.html'), html => html
  .replace(/\s*<style id="final-home-accessibility">[\s\S]*?<\/style>/g, '')
  .replace('</head>', `${HOME_STYLE}\n</head>`)
  .replace(/\s*<p class="possibilities-principle">[\s\S]*?<\/p>/g, '')
  .replace(/\s*<section class="live-week"[\s\S]*?<\/section>/g, ''));

patch(path.join(MAIN, 'workshops.html'), html => html
  .replace(/\s*<style id="final-workshop-polish">[\s\S]*?<\/style>/g, '')
  .replace('</head>', `${WORKSHOP_STYLE}\n</head>`)
  .replace(/<div class="fmt">MISSING:WORKSHOPS\.FORMATS\.2\.TITLE\s*&middot;\s*TEAMS<\/div>/i, '<div class="fmt">Team transformation &middot; multi-session</div>')
  .replace(/<div class="fmt">[^<]*workshops\.formats\.2[^<]*<\/div>/i, '<div class="fmt">Team transformation &middot; multi-session</div>')
  .replace('<h3>From Corporate to AI-Powered: The Deep Build</h3>', '<h3>Build Your AI Operating System</h3>')
  .replace('A full day inside the method: the team audits its work, picks the highest-value automations, and builds the first ones together. Includes a 30-day follow-up check-in.', 'Your team maps the highest-value work, builds the first automations together, and leaves with a system they can keep improving after the engagement ends.')
  .replace(/<section>\s*<div class="kicker">What changes after<\/div>[\s\S]*?<\/section>/, '<section><div class="kicker">What changes after</div><div class="guarantee"><h2>You leave with something real.</h2><p class="line">Hands-on workshops end with a working first version, while keynotes leave your leaders clear on what to act on, what to wait on, and what stays human.</p></div></section>'));

patch(path.join(MAIN, 'how-i-can-help.html'), html => html
  .replace('Contact Fatiha', 'contact me')
  .replace('>CONTACT FATIHA<', '>contact me<'));

for (const file of walk(MAIN)) {
  patch(file, html => html.replaceAll('Starter Kit', 'AI Build Kit').replaceAll('starter kit', 'AI Build Kit').replaceAll('STARTER KIT', 'AI BUILD KIT'));
}

patch(path.join(BRIEF, 'index.html'), html => html
  .replace(/\s*<style id="final-brief-polish">[\s\S]*?<\/style>/g, '')
  .replace('</head>', `${BRIEF_STYLE}\n</head>`)
  .replace(/<h1>Know which AI changes actually affect what you can build\.<\/h1>/, '<h1>I curate the AI news. You get the brief.</h1>')
  .replace(/<h1><!-- copy:brief\.h1 -->[\s\S]*?<!-- \/copy:brief\.h1 --><\/h1>/, '<h1>I curate the AI news. You get the brief.</h1>')
  .replace(/\s*<p class="curator-note">[\s\S]*?<\/p>/, ''));

patch(path.join(GUIDES, 'index.html'), html => html
  .replace('THE FULL LIBRARY', 'AI, EXPLAINED CLEARLY')
  .replace('The full library', 'AI, explained clearly')
  .replace('Every guide, every track.', 'Know what the AI tools are. Know which ones matter to you.')
  .replace('Claude. For anything that needs careful reading.', 'Claude is the AI people reach for when the work gets complicated.')
  .replace('Where it earns its keep, and where it will burn you.', 'What Claude is best at, how it differs from ChatGPT, and when it is worth using.')
  .replace('Read the Claude verdict', 'Read the Claude guide'));

for (const file of walk(GUIDES)) {
  if (path.basename(file) === 'index.html') continue;
  patch(file, html => {
    html = html
      .replace(/\s*<style id="final-guide-clarity">[\s\S]*?<\/style>/g, '')
      .replace('</head>', `${GUIDE_STYLE}\n</head>`)
      .replace(/\s*<ul class="tldr">[\s\S]*?<\/ul>/g, '')
      .replace(/\s*<figure class="cover">[\s\S]*?<\/figure>/g, '')
      .replace(/\s*<figure class="fig">[\s\S]*?<\/figure>/g, '')
      .replace(/\s*<blockquote class="pull">[\s\S]*?<\/blockquote>/g, '')
      .replace(/\s*<!-- data:guide-byline -->[\s\S]*?<!-- \/data:guide-byline -->/g, '')
      .replace(/<p class="card-desc">Updated [\s\S]*? min read<\/p>/g, '')
      .replace('Free, forever. No cost, no catch.', 'GET THE NEXT GUIDE')
      .replace('Want the rest of these as they land?', 'Get one useful AI guide each week.')
      .replace('This guide stays open. Add your email and you also get every new guide plus the weekly Insider Brief. Unsubscribe anytime.', 'Plain-English guides and the Insider Brief, sent when there is something worth reading.')
      .replace('Email me the guides', 'Send me the next guide')
      .replace('Already on the list? Just keep reading.', 'Already subscribed? Keep reading.')
      .replace("I'll build your first AI employee with you in a week, using the same systems as the case studies. You keep it, and you can change it.", 'If you have a real workflow you want AI to take on, I can help you choose the right first build and set the boundaries.')
      .replace('See how it works', 'See how I can help');

    html = html.replace(/<section class="related">[\s\S]*?<\/section>/g, section => section.replace(/\s*<img[^>]*>/g, ''));
    return html;
  });
}

console.log('Applied final site patches.');
