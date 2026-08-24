#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAIN = path.join(ROOT, 'main-site');

function read(rel){ return fs.readFileSync(path.join(MAIN, rel), 'utf8'); }
function write(rel, html){ fs.writeFileSync(path.join(MAIN, rel), html); }
function patch(rel, fn){ const before=read(rel); const after=fn(before); if(after!==before){write(rel,after); console.log('repaired',rel);} }
function once(html, re, replacement){ return re.test(html) ? html.replace(re,replacement) : html; }

// 1. The 99: never allow unresolved copy markers to reach production.
patch('the-99.html', html => html
  .replace(/MISSING:the99\.eyebrow/g, 'A public experiment')
  .replace(/MISSING:the99\.h1/g, '99 jobs I test handing to AI.')
  .replace(/MISSING:the99\.sub/g, "I test real jobs in my business, one at a time, in public. A role only counts when it produces useful work and I can show the receipt.")
  .replace(/MISSING:the99\.cta_h2/g, 'Want to test your own first AI job?')
  .replace(/99 employees, and not one on payroll\./g, '99 jobs I test handing to AI.')
  .replace(/I'm building a company staffed by AI, 99 employees, hired one at a time, in public\. This is the scoreboard, and it doesn't get to flatter me\./g, "I test real jobs in my business, one at a time, in public. A role only counts when it produces useful work and I can show the receipt.")
  .replace(/Want to hire your own Employee #1\?/g, 'Want to test your own first AI job?')
  .replace(/The org chart/g, 'The build log')
  .replace(/roles still open/g, 'jobs left to test')
);

// 2. Workshops: remove unresolved copy, fix typos, and make the two audience routes explicit.
patch('workshops.html', html => {
  html = html
    .replace(/MISSING:workshops\.formats\.2\.title/g, 'Multi-session team programme')
    .replace(/Share the knowleddge/g, 'Share the knowledge')
    .replace(/Message me\.\s*<\/a>\s*\./g, 'Message me.</a>')
    .replace(/but don't get distracted/g, 'without getting distracted');
  const marker = '<section>\n  <div class="kicker">Why this is different</div>';
  if(html.includes(marker) && !html.includes('workshop-audience-router')){
    const block = `<section id="workshop-audience-router" style="padding-top:12px">\n  <div class="kicker">Choose your route</div>\n  <h2>Who are we building for?</h2>\n  <div class="talks">\n    <div class="talk"><div><div class="fmt">For business owners</div><h3>Build Your AI-Powered Business</h3><p>Hands-on sessions for founders and non-technical business owners who want to save time, build useful AI help, understand their data, sell better and automate the right work.</p></div><a class="btn" href="#business-owner-formats">See business-owner formats &rarr;</a></div>\n    <div class="talk"><div><div class="fmt">For organisations</div><h3>AI for Real Work</h3><p>Executive briefings, team labs and implementation programmes built around the work your people already do, with clear boundaries for what stays human.</p></div><a class="btn" href="#organisation-formats">See organisation formats &rarr;</a></div>\n  </div>\n</section>\n\n`;
    html = html.replace(marker, block + marker);
  }
  html = html.replace('<div class="kicker">Formats</div>', '<div class="kicker" id="business-owner-formats">Formats</div>');
  if(!html.includes('id="organisation-formats"')){
    html = html.replace('<section>\n  <div class="kicker">Outcomes</div>', `<section id="organisation-formats">\n  <div class="kicker">Organisation formats</div>\n  <h2>From clarity to implementation.</h2>\n  <div class="talks">\n    <div class="talk"><div><div class="fmt">Executive briefing</div><h3>What AI changes, what to act on, what stays human</h3><p>A focused leadership session that turns the noise into decisions, priorities and boundaries.</p></div></div>\n    <div class="talk"><div><div class="fmt">Team AI Lab</div><h3>Map the work and choose the first builds</h3><p>Your team identifies high-value workflows, scores them for readiness and leaves with clear first builds.</p></div></div>\n    <div class="talk"><div><div class="fmt">Workflow Sprint</div><h3>Turn one workflow into a working first version</h3><p>We move from process map to tested implementation with permissions, review points and handoff documented.</p></div></div>\n    <div class="talk"><div><div class="fmt">Adoption programme</div><h3>Build capability across the organisation</h3><p>A multi-session programme for teams that need shared standards, practical builds and a repeatable way to decide where AI belongs.</p></div></div>\n  </div>\n</section>\n\n<section>\n  <div class="kicker">Outcomes</div>`);
  }
  return html;
});

// 3. Guides: outcome-first architecture, working paths, clean fallback copy, and stable filtering.
patch('guides/index.html', html => {
  html = html
    .replace(/cta\.href = 'guides\/' \+ encodeURIComponent\((slug|item\.slug)\) \+ '\.html';/g, "cta.href = encodeURIComponent($1) + '.html';")
    .replace(/cont\.href = 'guides\/' \+ firstUnread\.slug \+ '\.html';/g, "cont.href = firstUnread.slug + '.html';")
    .replace(/el\.href = 'guides\/' \+ slug \+ '\.html';/g, "el.href = slug + '.html';")
    .replace(/Nobody says what it's\./g, 'Nobody explains what it is.')
    .replace(/Here's what it's, in 4 lines\./g, 'Here is what it is, in four lines.')
    .replace(/ · · /g, ' · ');

  const start = html.indexOf('<!-- start-here paths -->');
  const end = html.indexOf('<section class="spotlight">');
  if(start !== -1 && end !== -1){
    const nav = `<!-- outcome navigator -->\n<section class="paths" id="start-here">\n  <div class="paths-eyebrow">Start with the outcome</div>\n  <div class="paths-title">What do you want AI to help you achieve?</div>\n  <p class="paths-sub">Choose the business result you want. You can start simple and go deeper when you are ready.</p>\n  <div class="paths-grid" style="grid-template-columns:repeat(3,minmax(0,1fr))">\n    <div class="path-col"><div class="path-lvl">Save time</div><div class="path-name">Save time with AI</div><p class="path-tag">Take repetitive research, admin, inbox work and follow-up off your plate.</p><a class="path-cta" href="#outcome-save-time">Show me how &rarr;</a></div>\n    <div class="path-col"><div class="path-lvl">Think & create</div><div class="path-name">Create and think better</div><p class="path-tag">Brainstorm, structure ideas, research unfamiliar topics and turn expertise into useful output.</p><a class="path-cta" href="#outcome-think-create">Show me how &rarr;</a></div>\n    <div class="path-col"><div class="path-lvl">Understand data</div><div class="path-name">Understand your data</div><p class="path-tag">Use AI to analyse spreadsheets, documents, numbers and patterns without becoming a data analyst.</p><a class="path-cta" href="#outcome-data">Show me how &rarr;</a></div>\n    <div class="path-col"><div class="path-lvl">Sell & market</div><div class="path-name">Sell and market better</div><p class="path-tag">Research customers, improve messaging, create campaigns and make follow-up more reliable.</p><a class="path-cta" href="#outcome-sell">Show me how &rarr;</a></div>\n    <div class="path-col crown"><div class="path-lvl">Build AI help</div><div class="path-name">Build the AI help you need</div><p class="path-tag">Create a researcher, inbox assistant, follow-up helper, internal tool or first AI worker.</p><a class="path-cta" href="#outcome-build">Show me how &rarr;</a></div>\n    <div class="path-col"><div class="path-lvl">Automate & scale</div><div class="path-name">Automate and scale</div><p class="path-tag">Connect repeatable processes so more work can move without waiting for you.</p><a class="path-cta" href="#outcome-scale">Show me how &rarr;</a></div>\n  </div>\n  <div class="path-route" style="margin-top:18px"><strong>New to AI?</strong> Start with <a href="what-is-ai.html">what AI actually is</a>, then <a href="what-is-a-prompt.html">what a prompt does</a> and <a href="what-is-agentic.html">what agentic means</a>.</div>\n  <p style="margin:22px 0 0;font-family:'Playfair Display',Georgia,serif;font-size:24px">AI should not replace your thinking. It should amplify it.</p>\n</section>\n\n<section class="controls" id="outcome-map">\n  <div class="controls-head"><div><div class="controls-eyebrow">Explore by outcome</div><div class="controls-title">Tell me what you are trying to accomplish and I will show you where to start.</div></div></div>\n  <div class="card-grid">\n    <a class="card" id="outcome-save-time" href="inbox-manager-setup.html"><div class="card-body"><p class="card-kicker mono">SAVE TIME</p><h3>Start with repeated work</h3><p class="card-desc">Inbox, follow-up and recurring operations are the clearest first wins.</p></div></a>\n    <a class="card" id="outcome-think-create" href="what-is-a-prompt.html"><div class="card-body"><p class="card-kicker mono">THINK & CREATE</p><h3>Use AI as a thinking partner</h3><p class="card-desc">Brief it clearly, challenge ideas and turn scattered thinking into structure.</p></div></a>\n    <a class="card" id="outcome-data" href="which-ai-tool-for-what.html"><div class="card-body"><p class="card-kicker mono">UNDERSTAND DATA</p><h3>Choose a tool that can work with your files</h3><p class="card-desc">Start with the job, the data and the level of sensitivity before choosing the model.</p></div></a>\n    <a class="card" id="outcome-sell" href="follow-up-setup.html"><div class="card-body"><p class="card-kicker mono">SELL & MARKET</p><h3>Fix follow-up before adding more leads</h3><p class="card-desc">Use AI where response time and consistency are costing you opportunities.</p></div></a>\n    <a class="card" id="outcome-build" href="first-ai-employee.html"><div class="card-body"><p class="card-kicker mono">BUILD AI HELP</p><h3>Give AI one job first</h3><p class="card-desc">Define the job, the inputs, the rules and the human handoff before you automate.</p></div></a>\n    <a class="card" id="outcome-scale" href="24-7-operations-system.html"><div class="card-body"><p class="card-kicker mono">AUTOMATE & SCALE</p><h3>Connect the repeatable steps</h3><p class="card-desc">Move from one useful AI task to a reliable operating workflow.</p></div></a>\n  </div>\n  <p style="margin-top:22px"><a class="row-cta" href="#track-tools">Choose the right AI: ChatGPT, Claude, Gemini, Copilot and more &rarr;</a></p>\n</section>\n\n`;
    html = html.slice(0,start) + nav + html.slice(end);
  }

  // Keep category filters useful even when cards are generated without legacy data-track attributes.
  html = html.replace("document.querySelectorAll('.library .row, .library .card[data-track]').forEach(function(el){", "document.querySelectorAll('.library .row, .library .card').forEach(function(el){");
  html = html.replace("var okTrack = (track === 'all') || (el.getAttribute('data-track') === track);", "var section = el.closest('.lib-track'); var sectionTrack = section && section.id === 'track-understand' ? 'basics' : section && section.id === 'track-tools' ? 'toolmap' : section && section.id === 'track-setup' ? 'business' : el.getAttribute('data-track'); var okTrack = (track === 'all') || (sectionTrack === track);");
  html = html.replace("el.style.display = (okTrack && (isCard ? !q : okQ)) ? '' : 'none';", "el.style.display = (okTrack && okQ) ? '' : 'none';");
  return html;
});

// 4. Homepage: keep three-route structure, add the new Learn -> Build -> Transform -> Team progression and fix button reset label.
patch('index.html', html => {
  html = html.replace("var originalLabel = 'Show me what to do first';", "var originalLabel = btn.textContent;");
  if(!html.includes('id="pathway"')){
    const marker = '<section class="router" id="further">';
    const block = `<section class="router" id="pathway"><div class="router-inner">\n  <div class="section-eyebrow">A clear path</div>\n  <h2 class="router-title">Learn. Build. Transform. Bring it to your team.</h2>\n  <p class="router-sub">Start with what you need now. Each step should create more real capability, not more AI homework.</p>\n  <div class="router-grid" style="grid-template-columns:repeat(4,minmax(0,1fr))">\n    <div class="router-card"><h3>Learn</h3><p>Free interactive guides organised around the result you want from AI.</p><a class="router-cta" href="/guides/">Explore the guides</a></div>\n    <div class="router-card"><h3>Build</h3><p>Quick-win builds and specialist courses for one useful capability at a time.</p><a class="router-cta" href="/quiz.html">Find your first build</a></div>\n    <div class="router-card"><h3>Transform</h3><p>A deeper AI Business OS for connecting the useful pieces into how the business runs.</p><a class="router-cta" href="/contact.html">Ask about the next cohort</a></div>\n    <div class="router-card"><h3>Bring it to your team</h3><p>Workshops, workflow sprints and adoption programmes built around real work.</p><a class="router-cta" href="/workshops.html">See team options</a></div>\n  </div>\n</div></section>\n\n`;
    html = html.replace(marker, block + marker);
  }
  return html;
});

// 5. About: editorial cleanup and a proof-led structure without inventing new claims.
patch('about.html', html => html
  .replace(/Two decades in Big tech companies\./g, 'Two decades inside global technology companies')
  .replace(/Inside Multi-billions dollars companies/g, '20+ years in global technology companies')
  .replace(/trusted by Nike as an exclusive vendor,in France\./g, 'built a circular fashion business in France that worked with Nike.')
  .replace(/7-figures Business/g, '7-figure business')
  .replace(/from the ground up, fully bootstrapped/g, 'built from the ground up and bootstrapped')
  .replace(/Now, on myself with AI, I show you how\./g, 'Now: testing AI in my own business, then showing the work')
  .replace(/Freedom Operating System/g, 'AI operating system')
  .replace(/The Proofs/g, 'The proof')
  .replace(/Multi-billions dollars/g, 'global technology')
);

// 6. Legacy starter-kit route: keep existing copy stable until the route is retired.
patch('starter-kit.html', html => html
  .replace(/Free AI AI Build Kit/g, 'Free AI Starter Toolkit')
  .replace(/Free AI Build Kit/g, 'Free AI Starter Toolkit')
  .replace(/Start building without starting from a blank page\./g, 'Start with the essentials, then build the capability you actually need.')
  .replace(/The briefs, decision rules, guardrails and setup templates I use to turn an AI idea into something that can actually run\. Use what you need now, then come back as the library grows\./g, 'A focused set of briefs, guardrails and setup templates for getting the first useful pieces right. The deeper outcome-specific builds belong in the Quick Win path.')
);

// 7. Opt-in fallback: never send a visitor to the retired /free-resources.html URL.
patch('opt-in.html', html => html.replace("window.location.origin + '/free-resources.html'", "window.location.origin + '/guides/'"));

// 8. Forms: prevent known double-post patterns by removing the first fire-and-forget request when an identical second request follows.
for(const rel of ['workshops.html','quiz.html','opt-in.html','fast-forward.html','guides/index.html']){
  patch(rel, html => html.replace(/\n\s*fetch\('https:\/\/auto\.shiftandlead\.com\/webhook\/formspree-lead', \{[\s\S]*?\}\);\n\s*\n\s*fetch\('https:\/\/auto\.shiftandlead\.com\/webhook\/formspree-lead',/g, "\n    fetch('https://auto.shiftandlead.com/webhook/formspree-lead',"));
}

// 9. Quiz: route results into the new outcome system rather than the old kit when possible.
patch('quiz.html', html => html
  .replace("href:'/starter-kit.html',label:'Open the AI Build Kit →'", "href:'/guides/#outcome-think-create',label:'See the thinking and creation path →'")
  .replace("href:'/starter-kit.html',label:'Open the AI Build Kit →'", "href:'/guides/#outcome-data',label:'See the data and knowledge path →'")
);

// 10. AI-facing estate description: current truth only; no hidden Fast Forward pricing.
const llms = `# Shift & Lead\n\n> Shift & Lead helps non-technical professionals, business owners and teams build practical business capability with AI.\n\nThe site is organised around a simple path: learn what matters, build one useful capability, connect the pieces into how the business runs, and bring the method into a team when needed.\n\n## Current resources\n\n- Free AI guides: https://www.shiftandlead.com/guides/\n- First-build diagnostic: https://www.shiftandlead.com/quiz.html\n- Workbooks: https://www.shiftandlead.com/workbooks.html\n- Workshops and team programmes: https://www.shiftandlead.com/workshops.html\n- Build with Fatiha: https://www.shiftandlead.com/build-sprint.html\n- About and proof: https://www.shiftandlead.com/about.html\n- AI Insider Brief: https://brief.shiftandlead.com\n\n## Editorial approach\n\nShift & Lead explains AI in plain English and starts with the business outcome, not the tool. Current guide navigation is organised around saving time, thinking and creating, understanding data, selling and marketing, building AI help, automating and scaling, plus choosing the right AI tool.\n\n## Usage terms\n\nContent may be cited or quoted with attribution and a link to the source page. It may not be used to train, fine-tune or build machine-learning models.\n`;
fs.writeFileSync(path.join(MAIN,'llms.txt'), llms);

// 11. Product-specific legal pages remain available but are noindex until a checkout/product is actually live.
for(const rel of ['terms.html','refund-policy.html','licensing.html']){
  patch(rel, html => html.replace(/<meta name="robots" content="index, follow(?:, max-image-preview:large)?">/, '<meta name="robots" content="noindex, follow">'));
}

// 12. Case studies: remove overlapping duplicate-looking stats until every number has a traceable receipt.
patch('case-study-1.html', html => html.replace(/\s*<div class="stat"><div class="n">15%<\/div><div class="l">Increase in first-contact resolution<\/div><\/div>/, ''));
patch('case-study-2.html', html => html.replace(/\s*<div class="stat"><div class="n">30%<\/div><div class="l">more tours scheduled<\/div><\/div>/, ''));

// 13. Make social previews less generic on high-value pages using existing, page-relevant assets.
patch('guides/index.html', html => html.replace('https://www.shiftandlead.com/Portrait.jpeg', 'https://www.shiftandlead.com/assets/mascot/celebrating-lightbulb.png'));
patch('quiz.html', html => html.replace('https://www.shiftandlead.com/Portrait.jpeg', 'https://www.shiftandlead.com/assets/mascot/planning.png'));
patch('starter-kit.html', html => html.replace(/https:\/\/www\.shiftandlead\.com\/assets\/covers\/freedom-os-kit\.svg/g, 'https://www.shiftandlead.com/assets/mascot/hero-seated.png'));

console.log('site repair pass complete');
