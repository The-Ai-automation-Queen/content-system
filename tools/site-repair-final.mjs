#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAIN = path.join(ROOT, 'main-site');

function walk(dir, out=[]){
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    if(e.name.startsWith('.') || e.name==='node_modules') continue;
    const p=path.join(dir,e.name);
    if(e.isDirectory()) walk(p,out); else if(e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

// Resolve the 4-vs-5 language inconsistency without inventing a number.
for(const file of walk(MAIN)){
  let html=fs.readFileSync(file,'utf8');
  const before=html;
  html=html
    .replace(/in 4 languages/g,'across languages')
    .replace(/in five languages/g,'across languages')
    .replace(/She speaks 5 languages/g,'She works across languages')
    .replace(/She speaks 4 languages/g,'She works across languages')
    .replace(/4 languages/g,'multilingual work')
    .replace(/five languages/g,'multiple languages');
  if(html!==before) fs.writeFileSync(file,html);
}

// Make the workshop owner route genuinely owner-specific instead of relabelling team formats.
const workshops=path.join(MAIN,'workshops.html');
if(fs.existsSync(workshops)){
  let html=fs.readFileSync(workshops,'utf8');
  if(!html.includes('id="owner-workshop-formats"')){
    const anchor='<section id="organisation-formats">';
    const block=`<section id="owner-workshop-formats">\n  <div class="kicker">For business owners</div>\n  <h2>Build Your AI-Powered Business.</h2>\n  <p class="hero-sub">For founders and non-technical owners who want useful AI in the business without turning themselves into the IT department.</p>\n  <div class="talks">\n    <div class="talk"><div><div class="fmt">90-minute masterclass</div><h3>Find the first AI win</h3><p>Map where time, ideas, data or follow-up are getting stuck and leave with one clear first build.</p></div></div>\n    <div class="talk"><div><div class="fmt">Half-day build lab</div><h3>Design the AI help you need</h3><p>Choose one outcome, define the job, inputs, rules and human handoff, then build the first useful version.</p></div></div>\n    <div class="talk"><div><div class="fmt">Full-day AI Business Build Day</div><h3>Move from isolated tools to a working system</h3><p>Connect one high-value workflow end to end, test it on real business work and leave with the operating rules documented.</p></div></div>\n  </div>\n</section>\n\n`;
    html=html.replace(anchor,block+anchor);
  }
  html=html.replace('href="#business-owner-formats"','href="#owner-workshop-formats"');
  fs.writeFileSync(workshops,html);
}

// Keep legal pages out of the sitemap while they are product-specific drafts.
const sitemap=path.join(MAIN,'sitemap.xml');
if(fs.existsSync(sitemap)){
  let xml=fs.readFileSync(sitemap,'utf8');
  for(const name of ['terms.html','refund-policy.html','licensing.html']){
    const escaped=name.replace('.','\\.');
    xml=xml.replace(new RegExp(`\\s*<url><loc>https://www\\.shiftandlead\\.com/${escaped}</loc><lastmod>[^<]+</lastmod></url>`,'g'),'');
  }
  fs.writeFileSync(sitemap,xml);
}

// Add lightweight event instrumentation. It uses Umami when a real website ID is configured,
// but does not invent an ID or send visitor data anywhere else.
const events=`(function(){\n  function track(name, data){\n    try { if (window.umami && typeof window.umami.track === 'function') window.umami.track(name, data || {}); } catch(e){}\n  }\n  document.addEventListener('click', function(e){\n    var a=e.target.closest('a'); if(!a) return;\n    var href=a.getAttribute('href')||'';\n    if(href.indexOf('/guides/')===0 || href.indexOf('guides/')===0) track('guide_click',{href:href});\n    if(href.indexOf('/quiz')===0) track('quiz_click',{href:href});\n    if(href.indexOf('/workshops')===0) track('workshop_click',{href:href});\n    if(href.indexOf('/build-sprint')===0) track('build_with_me_click',{href:href});\n  });\n  document.addEventListener('submit', function(e){\n    var f=e.target; if(!f || !f.matches('form')) return;\n    var source=(f.querySelector('[name=source]')||{}).value||f.getAttribute('data-source')||'unknown';\n    track('form_submit',{source:source});\n  }, true);\n  window.slTrack=track;\n})();\n`;
const eventsPath=path.join(MAIN,'assets','events.js');
fs.writeFileSync(eventsPath,events);
for(const file of walk(MAIN)){
  let html=fs.readFileSync(file,'utf8');
  if(!html.includes('/assets/events.js') && html.includes('</head>')){
    html=html.replace('</head>','<script defer src="/assets/events.js"></script>\n</head>');
    fs.writeFileSync(file,html);
  }
}

console.log('final consistency pass complete');
