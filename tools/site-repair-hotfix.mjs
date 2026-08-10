#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const MAIN=path.join(ROOT,'main-site');
function patch(rel, fn){const p=path.join(MAIN,rel);let h=fs.readFileSync(p,'utf8');const n=fn(h);if(n!==h){fs.writeFileSync(p,n);console.log('hotfixed',rel);}}

// Guides newsletter: keep the request that checks the response and remove the fire-and-forget duplicate.
patch('guides/index.html', h => h
  .replace(/\n\s*fetch\('https:\/\/auto\.shiftandlead\.com\/webhook\/formspree-lead', \{\n\s*method: 'POST', keepalive: true,\n\s*headers: \{'Content-Type': 'application\/json'\},\n\s*body: JSON\.stringify\(\{email: email, source: 'ribbon'\}\)\n\s*\}\);(?=\n\s*fetch\('https:\/\/auto\.shiftandlead\.com\/webhook\/formspree-lead')/, '')
  .replace(/Fatiha Chikh · Tech Marketing Expert with 20 years at Dell, Intel, Microsoft ·<\!-- \/copy:library_index\.byline --> · /g,'Fatiha Chikh · Tech Marketing Expert with 20 years at Dell, Intel, Microsoft<!-- /copy:library_index.byline --> · ')
  .replace(/Looking for the prompts and templates\? Open the Freedom OS AI Build Kit →/g,'Looking for the prompts and templates? Open the AI Starter Toolkit →')
);

// Opt-in: the two requests currently hit the same endpoint. Keep the source-tagged request only.
patch('opt-in.html', h => h.replace(/\n\s*\/\/ Fire Formspree \(email backup\)\n\s*fetch\('https:\/\/auto\.shiftandlead\.com\/webhook\/formspree-lead', \{[\s\S]*?\n\s*\}\);\n\n\s*\/\/ Fire n8n webhook \(GHL contact \+ tag\)/, '\n\n    // Submit once with the source tag used by the lead workflow'));

// Remove duplicate requests from the other known submit handlers if an earlier pass missed one.
for(const rel of ['workshops.html','quiz.html','fast-forward.html']){
  patch(rel, h => {
    const url="fetch('https://auto.shiftandlead.com/webhook/formspree-lead',";
    let pos=0;
    while(true){
      const a=h.indexOf(url,pos); if(a<0) break;
      const b=h.indexOf(url,a+url.length); if(b<0) break;
      // Only dedupe when both calls are close enough to belong to the same handler.
      if(b-a<1400){
        const end=h.indexOf('});',a);
        if(end>0 && end<b){ h=h.slice(0,a)+h.slice(end+3); pos=Math.max(0,a-1); continue; }
      }
      pos=a+url.length;
    }
    return h;
  });
}

console.log('site hotfix pass complete');
