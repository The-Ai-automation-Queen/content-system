#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const MAIN=path.join(ROOT,'main-site');
function patch(rel,fn){const p=path.join(MAIN,rel);let h=fs.readFileSync(p,'utf8');const n=fn(h);if(n!==h){fs.writeFileSync(p,n);console.log('polished',rel);}}

patch('the-99.html', h => h
  .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="The 99 is a public AI build log: 99 real business jobs tested with AI, with receipts, human boundaries and failed experiments included.">')
  .replace(/<title>[^<]*The 99[^<]*<\/title>/, '<title>The 99: 99 Real Business Jobs Tested With AI | Shift &amp; Lead</title>')
  .replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="The 99: 99 Real Business Jobs Tested With AI">')
  .replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="A public AI build log. A job only counts when it produces useful work and there is a receipt.">')
  .replace(/"description": "<!--[\s\S]*?with receipts\."/, '"description": "A public AI build log: 99 real business jobs tested with AI, with receipts and clear human boundaries."')
  .replace(/<span class="of">\/ 99 hired<\/span>/, '<span class="of">/ 99 jobs tested</span>')
  .replace(/An employee counts as hired only if it did real work in the last 7 days and I can show the output\. No receipt, no badge\./g, 'A job counts only if AI did useful work in the last 7 days and I can show the output. No receipt, no badge.')
  .replace(/No employee sends anything to a human on its own\./g, 'No AI workflow sends anything to a human on its own.')
  .replace(/An employee that stops working loses its badge until it earns it back\./g, 'A workflow that stops working loses its badge until it earns it back.')
  .replace(/How hiring works here/g, 'How a job earns its place here')
  .replace(/A role gets a job description/g, 'A job gets a clear brief')
  .replace(/The new hire works a real trial shift on my business/g, 'AI runs a real trial on my business')
  .replace(/Only then does the badge appear on this page\. Every hire gets its own story\./g, 'Only then does the badge appear on this page. Kept, assisted, automated or failed: the result is recorded.')
  .replace(/EMPLOYEE #/g, 'JOB #')
  .replace(/HIRED/g, 'TESTED')
  .replace(/Interviewing · starts when the receipts do/g, 'Testing · counts when the receipts do')
  .replace(/MORE ROLES/g, 'MORE JOBS')
  .replace(/Show the full org chart/g, 'Show the full build log')
  .replace(/The free guide walks you through your first AI hire in a day: pick the task, write the job description, run the first shift\./g, 'The free guide helps you choose one real task, define the job, set the boundaries and run the first useful test.')
  .replace(/Get the free hiring guide/g, 'Get the free first-build guide')
  .replace(/Take the free time-leak quiz/g, 'Take the free first-build diagnostic')
);

patch('about.html', h => h
  .replace(/Built a circular fashion business built a circular fashion business in France that worked with Nike\./g, 'Built a circular fashion business in France that worked with Nike.')
  .replace(/<div class="receipt"><div class="n">20\+ years<\/div><p>20\+ years in global technology companies<\/p><\/div>/, '<div class="receipt"><div class="n">20+ years</div><p>Inside global technology companies, turning new technology into something teams could use.</p></div>')
  .replace(/<div class="receipt"><div class="n">7-figure business\s*<\/div><p>built from the ground up and bootstrapped<\/p><\/div>/, '<div class="receipt"><div class="n">7-figure business</div><p>Built from the ground up and bootstrapped.</p></div>')
  .replace(/I make AI feel less scary and more exciting\s*/g, 'Practical AI, built for real work')
);

patch('starter-kit.html', h => h
  .replace(/data-page="freedom-os-kit"/g, 'data-page="ai-starter-toolkit"')
  .replace(/data-source="freedom-os-kit"/g, 'data-source="ai-starter-toolkit"')
  .replace(/guides-freedom-os-kit-hero/g, 'guides-ai-starter-toolkit-hero')
  .replace(/Cover: the Freedom OS AI Build Kit from Shift and Lead/g, 'Cover: the AI Starter Toolkit from Shift and Lead')
  .replace(/The deeper outcome-specific builds belong in the Quick Win path\./g, 'Use these foundations here, then move into an outcome-specific guide when you are ready to build something real.')
);

patch('workshops.html', h => {
  h=h
    .replace(/<title>AI Workshops for Teams \| Fatiha Chikh<\/title>/, '<title>Practical AI Workshops for Business Owners & Teams | Fatiha Chikh</title>')
    .replace(/Practical AI workshops for teams that want to know where AI belongs in real work, what to build first, and what still needs human judgment\./g, 'Practical AI workshops for business owners and teams: choose what to build first, make it useful in real work, and keep human judgment where it belongs.')
    .replace(/<h1>AI your team will actually use\.<\/h1>/, '<h1>Build AI people will actually use.</h1>')
    .replace(/Your team leaves knowing where AI belongs in their work, what to build first, and what still needs human judgment\. Practical, non-technical, built around the work they already do\./g, 'For business owners and organisations who want practical AI in real work. Choose what to build first, make it useful, and keep clear boundaries for what stays human.')
    .replace(/Apply to bring this to your team/g, 'Tell me what you want to build')
    .replace(/Apply to bring Shift &amp; Lead to your team\./g, 'Tell me what you want to build or bring to your team.')
    .replace(/Tell me who they are and what you want them doing differently afterwards\./g, 'Tell me who the session is for and what you want to be different afterwards.');
  // Remove the legacy generic formats block now that owner and organisation routes are explicit.
  h=h.replace(/<section>\s*<div class="kicker" id="business-owner-formats">Formats<\/div>[\s\S]*?<\/section>\s*(?=<section id="owner-workshop-formats">)/, '');
  return h;
});

// General page title/metadata cleanup for the AI Starter Toolkit.
patch('starter-kit.html', h => h.replace(/Freedom OS/g, 'AI Starter'));

console.log('site architecture polish complete');
