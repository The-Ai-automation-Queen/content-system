#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const MAIN=path.join(ROOT,'main-site');
function walk(dir,out=[]){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p,out);else if(e.name.endsWith('.html'))out.push(p);}return out;}
function patch(rel,fn){const p=path.join(MAIN,rel);let h=fs.readFileSync(p,'utf8');const n=fn(h);if(n!==h){fs.writeFileSync(p,n);console.log('final-clean',rel);}}

// Broken placeholder analytics is worse than no analytics. Keep event hooks; restore the script only when real Umami IDs exist.
for(const file of walk(MAIN)){
  let h=fs.readFileSync(file,'utf8');
  const n=h.replace(/\s*<script defer src="https:\/\/stats\.shiftandlead\.com\/script\.js" data-website-id="UMAMI-(?:WWW|GUIDES)-ID"><\/script>/g,'');
  if(n!==h) fs.writeFileSync(file,n);
}

patch('quiz.html', h => h
  .replace(/"name": "The Time Leak Quiz"/, '"name": "What Should You Build With AI First?"')
  .replace(/"description": "8 questions, 3 minutes\. Find out how many hours a week your business leaks to manual work, and the exact first fix\."/, '"description": "Eight questions, three minutes. Get a practical recommendation for the first AI capability worth building in your business."')
  .replace(/<!-- Fast Forward CTA hidden pending launch[\s\S]*?-->\s*/, '')
);

patch('starter-kit.html', h => h
  .replace(/src="\/assets\/covers\/freedom-os-kit\.svg"/g, 'src="/assets/mascot/hero-seated.png"')
  .replace(/width="1280" height="720"/g, 'width="1024" height="1024"')
  .replace(/now hiring 99 AI employees to run her business in public/g, 'now testing real business jobs with AI in public')
);

patch('index.html', h => h
  .replace(/Quick-win builds and specialist courses for one useful capability at a time\./g, 'Build one useful capability at a time, starting with the first result your business actually needs.')
  .replace(/A deeper AI Business OS for connecting the useful pieces into how the business runs\./g, 'Connect the useful pieces into a practical AI Business OS for how the business actually runs.')
  .replace(/Ask about the next cohort/g, 'Talk about the next step')
);

patch('the-99.html', h => h
  .replace(/Interviewing &middot; starts when the receipts do/g, 'Testing &middot; counts when the receipts do')
  .replace(/<div class=\"state\">Hiring<\/div>/g, '<div class="state">Planned test</div>')
);

console.log('final clean pass complete');
