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

function rewriteGuide(slug, { title, description, ogTitle, ogDescription, hero, beforeGate, afterGate }) {
  patchFile(path.join(MAIN, 'guides', `${slug}.html`), html => {
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
      .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${ogTitle}">`)
      .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${ogDescription}">`)
      .replace(/<header class="guide-hero">[\s\S]*?<\/header>/, hero)
      .replace(/<div class="prose">[\s\S]*?<\/div>\s*(<!-- partial:gate -->)/, `${beforeGate}\n\n  $1`)
      .replace(/(<!-- \/partial:gate -->)\s*<div class="prose">[\s\S]*?<\/div>\s*(<section class="related">)/, `$1\n\n  ${afterGate}\n\n  $2`);
    return html;
  });
}

rewriteGuide('claude', {
  title: 'Claude AI, explained: what it is and when to use it | Shift & Lead',
  description: 'A plain-English guide to Claude: why people choose it, what it is especially good at, where it differs from ChatGPT, and what to try first.',
  ogTitle: 'Claude, explained: why people use it for serious work',
  ogDescription: 'Claude is more than another chatbot. Here is where it stands out, where to be careful, and the first job worth testing with it.',
  hero: `<header class="guide-hero">
    <p class="eyebrow mono">Know the players / Anthropic</p>
    <h1>Claude</h1>
<!-- data:guide-byline --><p class="guide-byline mono">FREE GUIDE &middot; Updated <time datetime="2026-07-28">28 Jul 2026</time> &middot; 6 min read</p><!-- /data:guide-byline -->
    <p class="verdict">The AI I would reach for when the job is less “give me an answer” and more “read all of this, keep the thread, and help me think.”</p>

    <figure class="cover">
      <img src="/assets/covers/claude.svg" alt="Claude AI guide from Shift and Lead" width="1280" height="720">
    </figure>

    <ul class="tldr">
      <li><span>Why people care</span>Claude is unusually good at long documents, careful writing and work that develops over several rounds.</li>
      <li><span>Different from ChatGPT</span>The difference is not “smart versus dumb.” It is how the tools feel on different kinds of work.</li>
      <li><span>Try this first</span>Give Claude three documents you already know well and ask it to find the differences, tensions and unanswered questions.</li>
    </ul>
  </header>`,
  beforeGate: `<div class="prose">
    <h2>What Claude actually is</h2>
    <p>Claude is the AI assistant made by Anthropic. If ChatGPT is the name almost everyone knows, Claude is the one people often discover later and then keep open beside it.</p>
    <p>The useful thing to understand is that you do not need to choose one AI forever. Different models are better at different jobs. Claude earns a place in the mix when the work is long, messy, thoughtful or full of source material.</p>

    <h2>Why people keep choosing it</h2>
    <p>Claude is very good at holding onto context. Give it a long report, notes from a meeting and an old proposal, then keep working through the problem with it. It is less likely than many tools to lose the plot halfway through.</p>
    <p>That makes it particularly useful for proposals, strategy documents, policies, research synthesis and any draft that takes more than one pass to get right.</p>

    <div class="callout">
      <p class="callout-label">The useful distinction</p>
      <p>ChatGPT is often the first AI people open. Claude is often the AI they open when the job has become too large for a quick chat.</p>
    </div>

    <h2>What it is genuinely good at</h2>
    <ul>
      <li><strong>Reading a lot at once.</strong> Contracts, reports, research, transcripts and reference material.</li>
      <li><strong>Keeping a long piece of work coherent.</strong> Useful when a draft changes over several rounds.</li>
      <li><strong>Finding tension in your thinking.</strong> Ask it what does not add up, what is missing, or what a sceptical reader would challenge.</li>
      <li><strong>Code.</strong> Claude Code matters if you or your team build software. If you do not, you can ignore that entire part of the product.</li>
    </ul>

    <h2>One thing I would test</h2>
    <p>Take three documents you already understand well. Ask Claude: “What changed between these? Where do they contradict each other? What decision is still unresolved?”</p>
    <p>Because you already know the material, you can judge the answer instead of being impressed by the format. That is a much better first test than asking an AI to write a random blog post.</p>
  </div>`,
  afterGate: `<div class="prose">
    <h2>The catch</h2>
    <p>Claude can still be confidently wrong. A beautiful explanation is not evidence. Check numbers, dates, quotations, legal claims and anything that could cost you money or credibility if it is wrong.</p>
    <p>It can also agree with the way you framed a question. If you are making a decision, ask for the strongest case against your current view before you ask it to support you.</p>

    <blockquote class="pull">It can carry a lot of the thinking work. It cannot carry the consequences.</blockquote>

    <h2>Who should care</h2>
    <p>Claude is worth trying if your work involves long documents, complex writing, research, policy, strategy, proposals or code. If most of what you need is quick answers and simple everyday tasks, you may not feel a dramatic difference.</p>

    <h2>My take</h2>
    <p>I would not replace one AI with another just because people online say it is “better.” I would give Claude one real job that matches its strengths and compare the result with the tool you already use.</p>
    <p>If it helps you think more clearly on that job, keep it. If it does not, you have lost an hour and learned something useful.</p>
  </div>`
});

rewriteGuide('mistral', {
  title: 'Mistral AI, explained: why the European player matters | Shift & Lead',
  description: 'A plain-English guide to Mistral AI: what the French AI company is building, why open models and European data questions matter, and who should pay attention.',
  ogTitle: 'Mistral, explained: why this European AI company matters',
  ogDescription: 'Mistral is not just “the European ChatGPT.” Here is what makes it different, when that difference matters, and who should pay attention.',
  hero: `<header class="guide-hero">
    <p class="eyebrow mono">Know the players / Mistral AI</p>
    <h1>Mistral</h1>
<!-- data:guide-byline --><p class="guide-byline mono">FREE GUIDE &middot; Updated <time datetime="2026-07-28">28 Jul 2026</time> &middot; 5 min read</p><!-- /data:guide-byline -->
    <p class="verdict">The European AI player worth understanding if where models run, who controls them and where your data goes are part of the decision.</p>

    <figure class="cover">
      <img src="/assets/covers/mistral.svg" alt="Mistral AI guide from Shift and Lead" width="1280" height="720">
    </figure>

    <ul class="tldr">
      <li><span>Why people care</span>Mistral gives Europe a serious home-grown AI company instead of leaving the field entirely to US and Chinese labs.</li>
      <li><span>What makes it different</span>It combines a consumer assistant with models that developers and companies can run in more controlled ways.</li>
      <li><span>Who should look closer</span>Teams with European data, deployment or procurement requirements.</li>
    </ul>
  </header>`,
  beforeGate: `<div class="prose">
    <h2>What Mistral actually is</h2>
    <p>Mistral AI is a French artificial-intelligence company. Its chat product is called Le Chat, but the more interesting part of the story is bigger than another chatbot.</p>
    <p>Mistral is trying to compete at the model level: building AI models that companies can use through a chat interface, an API, or in some cases deploy with much more control than a normal consumer AI account gives you.</p>

    <h2>Why should a normal business owner care?</h2>
    <p>You may not need Mistral today. You should still know why it exists. AI is becoming infrastructure, and infrastructure questions eventually become business questions: where is the data processed, who controls the model, can it run in your environment, and what happens if your client has rules about suppliers?</p>
    <p>For many small businesses, those questions are still secondary. For regulated businesses, European organisations and companies selling into large enterprises, they can become the whole buying decision.</p>

    <div class="callout">
      <p class="callout-label">Do not confuse these two questions</p>
      <p>“Which AI gives me the best answer?” and “Which AI am I allowed to use for this data?” are not the same decision.</p>
    </div>

    <h2>What makes Mistral different</h2>
    <ul>
      <li><strong>It is European.</strong> That matters politically, commercially and sometimes contractually.</li>
      <li><strong>It has open-weight models.</strong> Some Mistral models can be downloaded and run outside Mistral's own chat product.</li>
      <li><strong>It gives companies more deployment choices.</strong> That can matter when a normal cloud chatbot is not acceptable.</li>
      <li><strong>It is multilingual by design.</strong> That makes it particularly interesting for European organisations operating across languages.</li>
    </ul>

    <h2>One thing I would test</h2>
    <p>If you work in more than one language, give Le Chat the same real business task in English and in the language your customers actually use. Compare tone, nuance and how much editing you need.</p>
    <p>If data location is the reason you are looking at Mistral, do not test writing first. Start by mapping the exact data and contractual requirement you need the tool to satisfy.</p>
  </div>`,
  afterGate: `<div class="prose">
    <h2>The catch</h2>
    <p>Mistral has a smaller ecosystem than OpenAI, Google or Microsoft. That means fewer integrations, fewer tutorials and fewer people who have already solved your exact setup problem.</p>
    <p>And being European does not automatically make a product the right choice for sensitive data. You still need to check the exact service, deployment, contract and settings you are using.</p>

    <h2>Who should care</h2>
    <p>Pay closer attention if you sell to European enterprises, work in a regulated environment, need more control over where AI runs, or want the option to use models outside a single vendor's hosted chat product.</p>
    <p>If your only question is “Which chatbot should help me write emails this week?”, Mistral is interesting but probably not the first decision you need to make.</p>

    <h2>My take</h2>
    <p>Mistral matters even if you never become a customer. A market with several serious AI players is healthier than one where every company depends on the same two or three labs.</p>
    <p>For a small business, I would choose Mistral because a real requirement points me there—not because “European AI” sounds better on a slide.</p>
  </div>`
});

rewriteGuide('first-ai-employee', {
  title: 'Build your first AI worker: one task, clear rules, real handoff | Shift & Lead',
  description: 'A practical guide to handing one repeatable business task to AI without giving away judgment, control or more access than it needs.',
  ogTitle: 'Your first AI worker should have one job',
  ogDescription: 'Do not automate your whole business. Hand AI one repeatable task, give it clear rules, and keep the decisions that need you.',
  hero: `<header class="guide-hero">
    <p class="eyebrow mono">Put AI to work</p>
    <h1>Your first AI worker should have one job.</h1>
<!-- data:guide-byline --><p class="guide-byline mono">FREE SETUP &middot; Updated <time datetime="2026-07-28">28 Jul 2026</time> &middot; 6 min read</p><!-- /data:guide-byline -->
    <p class="verdict">Do not start by automating your business. Start by handing off one repeatable task you already understand.</p>

    <figure class="cover">
      <img src="/assets/covers/first-ai-employee.svg" alt="Guide to building your first AI worker from Shift and Lead" width="1280" height="720">
    </figure>

    <ul class="tldr">
      <li><span>Start with</span>A task that repeats, has clear inputs and does not need your judgment every time.</li>
      <li><span>Do not hand off</span>Final decisions, sensitive actions or anything you cannot explain clearly yourself.</li>
      <li><span>The goal</span>You review finished work instead of recreating the same steps from scratch.</li>
    </ul>
  </header>`,
  beforeGate: `<div class="prose">
    <h2>Start smaller than you think</h2>
    <p>“AI employee” sounds like you are replacing a person. That is not the useful way to think about it.</p>
    <p>Your first AI worker should be much narrower: one repeatable job with a clear beginning, a clear end and rules about when it has to stop and ask you.</p>
    <p>Think: sort the inbox and draft replies. Turn a meeting transcript into actions. Check new leads against a qualification list. Prepare the Monday report. One job.</p>

    <h2>1. Pick work that repeats</h2>
    <p>Look for something you do the same way over and over. The best first task is usually boring enough that you already know what “good” looks like.</p>
    <p>Avoid starting with the most important decision in the company. Start with the work around the decision.</p>

    <h2>2. Write the job before you choose the tool</h2>
    <p>If you cannot explain the job clearly, AI will not magically understand it. Write down the outcome, the inputs, the steps, the rules and what it must never do.</p>

    <div class="guide-table">
      <table>
        <tbody>
          <tr><td><strong>Job</strong></td><td>What is this worker responsible for?</td></tr>
          <tr><td><strong>Input</strong></td><td>What does it receive?</td></tr>
          <tr><td><strong>Output</strong></td><td>What should arrive back to you?</td></tr>
          <tr><td><strong>Rules</strong></td><td>What must always be true?</td></tr>
          <tr><td><strong>Never do</strong></td><td>What requires your approval or must stay off-limits?</td></tr>
        </tbody>
      </table>
    </div>

    <div class="callout">
      <p class="callout-label">The line I write first</p>
      <p>“Never send, publish, buy, delete or commit anything without approval.” Then I remove permissions from that sentence only when I am ready.</p>
    </div>

    <h2>3. Give it the minimum access it needs</h2>
    <p>A prompt saying “do not send emails” is weaker than an account that simply cannot send emails. Put guardrails in the permissions, not only in the instructions.</p>
    <p>Give the worker the files, inbox, examples or tools it needs to finish the job—and nothing else.</p>
  </div>`,
  afterGate: `<div class="prose">
    <h2>4. Decide what starts the job</h2>
    <p>A useful AI worker should not depend on you remembering to open a chat. Give the job a trigger: every weekday at 7am, when a new lead arrives, after a meeting ends, or when a file lands in a folder.</p>
    <p>This is the moment AI moves from “something I use” to “work that gets carried in the background.”</p>

    <h2>5. Review the system, not just the output</h2>
    <p>When the result is wrong, do not quietly fix it and move on. Ask why it failed. Was the rule unclear? Was an example missing? Did it have too much access? Did the task actually require judgment?</p>
    <p>Improve the job description and the guardrail so the same mistake is less likely next time.</p>

    <blockquote class="pull">The goal is not to remove yourself from the business. It is to remove yourself from steps that never needed you.</blockquote>

    <h2>A good first AI worker</h2>
    <p>It does one job. It knows what good looks like. It has limited access. It stops when the decision needs you. And when it finishes, you review instead of rebuilding the work from scratch.</p>

    <h2>Try this today</h2>
    <p>Write down one task you did at least three times last month. Under it, write: <strong>input, output, rules, never do, trigger.</strong> If you can fill those five lines clearly, you have a candidate worth building.</p>
  </div>`
});

console.log('Applied final copy, accessibility, guide rewrites and mobile polish.');
