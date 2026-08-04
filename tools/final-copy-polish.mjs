#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAIN = path.join(ROOT, 'main-site');
const BRIEF = path.join(ROOT, 'ai-insider-brief', 'ai-insider-brief');
const GUIDES = path.join(MAIN, 'guides');

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

const HOME_STYLE = `<style id="final-home-accessibility">body[data-page-kind="home"] .possibilities-number{color:var(--blue,#2C4BE0)!important;opacity:1!important}body[data-page-kind="home"] .possibilities-stage,body[data-page-kind="home"] .possibilities-eyebrow{color:var(--blue-deep,#1B2EA0)!important;opacity:1!important}</style>`;
const WORKSHOP_STYLE = `<style id="final-workshop-polish">body[data-page-kind="workshops"] .talk{padding:28px!important}body[data-page-kind="workshops"] .talk .fmt{margin-bottom:16px!important}body[data-page-kind="workshops"] .talk h3{margin:0 0 14px!important}body[data-page-kind="workshops"] .talk p{margin:0 0 20px!important}body[data-page-kind="workshops"] .talk .fee{display:block!important;margin-top:10px!important}body[data-page-kind="workshops"] .guarantee h2{font-size:clamp(34px,4.6vw,46px)!important;line-height:1.08!important;margin-bottom:18px!important}body[data-page-kind="workshops"] .guarantee .line{font-size:18px!important;line-height:1.55!important;font-weight:400!important;margin:0!important}body[data-page-kind="workshops"] .guarantee .support{display:none!important}@media(max-width:700px){body[data-page-kind="workshops"] .talk{padding:24px 20px!important}body[data-page-kind="workshops"] .talk .fmt{margin-bottom:14px!important}body[data-page-kind="workshops"] .talk h3{font-size:27px!important;line-height:1.12!important;margin-bottom:14px!important}body[data-page-kind="workshops"] .talk p{font-size:17px!important;line-height:1.55!important;margin-bottom:18px!important}body[data-page-kind="workshops"] .talk .fee{margin-top:8px!important}body[data-page-kind="workshops"] .guarantee{padding:24px 20px!important}body[data-page-kind="workshops"] .guarantee h2{font-size:36px!important;line-height:1.08!important;margin-bottom:16px!important}body[data-page-kind="workshops"] .guarantee .line{font-size:17px!important;line-height:1.5!important}}</style>`;
const BRIEF_STYLE = `<style id="final-brief-polish">@media(max-width:700px){body[data-page-kind="brief"] .category-bar-inner{justify-content:flex-start!important;overflow-x:auto!important;padding-left:18px!important;padding-right:18px!important;scroll-padding-inline:18px!important}body[data-page-kind="brief"] .category-pill{flex:0 0 auto!important;padding-left:18px!important;padding-right:18px!important}}</style>`;

patchFile(path.join(MAIN, 'index.html'), html => html
  .replace(/\s*<style id="final-home-accessibility">[\s\S]*?<\/style>/g, '')
  .replace('</head>', `${HOME_STYLE}\n</head>`)
  .replace(/\s*<p class="possibilities-principle">[\s\S]*?<\/p>/g, '')
  .replace(/\s*<section class="live-week"[\s\S]*?<\/section>/g, ''));

patchFile(path.join(MAIN, 'workshops.html'), html => html
  .replace(/\s*<style id="final-workshop-polish">[\s\S]*?<\/style>/g, '')
  .replace('</head>', `${WORKSHOP_STYLE}\n</head>`)
  .replace(/<div class="fmt">(?:<!-- copy:workshops\.formats\.2\.title -->)?[\s\S]*?(?:<!-- \/copy:workshops\.formats\.2\.title -->)?\s*&middot;\s*teams<\/div>/i, '<div class="fmt">Team transformation &middot; multi-session</div>')
  .replace(/<div class="fmt">MISSING:WORKSHOPS\.FORMATS\.2\.TITLE\s*&middot;\s*TEAMS<\/div>/i, '<div class="fmt">Team transformation &middot; multi-session</div>')
  .replace('<h3>From Corporate to AI-Powered: The Deep Build</h3>', '<h3>Build Your AI Operating System</h3>')
  .replace('A full day inside the method: the team audits its work, picks the highest-value automations, and builds the first ones together. Includes a 30-day follow-up check-in.', 'Your team maps the highest-value work, builds the first automations together, and leaves with a system they can keep improving after the engagement ends.')
  .replace(/<section>\s*<div class="kicker">What changes after<\/div>[\s\S]*?<\/section>/, '<section><div class="kicker">What changes after</div><div class="guarantee"><h2>You leave with something real.</h2><p class="line">Hands-on workshops end with a working first version, while keynotes leave your leaders clear on what to act on, what to wait on, and what stays human.</p></div></section>'));

patchFile(path.join(MAIN, 'how-i-can-help.html'), html => html
  .replace('<a class="button primary" href="/contact.html">Contact Fatiha</a>', '<a class="button primary" href="/contact.html" style="text-transform:none">contact me</a>')
  .replace('Contact Fatiha', 'contact me'));

for (const file of walk(MAIN)) {
  patchFile(file, html => html
    .replaceAll('Starter Kit', 'AI Build Kit')
    .replaceAll('starter kit', 'AI Build Kit')
    .replaceAll('STARTER KIT', 'AI BUILD KIT'));
}

patchFile(path.join(BRIEF, 'index.html'), html => html
  .replace(/\s*<style id="final-brief-polish">[\s\S]*?<\/style>/g, '')
  .replace('</head>', `${BRIEF_STYLE}\n</head>`)
  .replace(/<h1>Know which AI changes actually affect what you can build\.<\/h1>/, '<h1>I curate the AI news. You get the brief.</h1>')
  .replace(/<h1><!-- copy:brief\.h1 -->[\s\S]*?<!-- \/copy:brief\.h1 --><\/h1>/, '<h1>I curate the AI news. You get the brief.</h1>')
  .replace(/\s*<p class="curator-note">[\s\S]*?<\/p>/, ''));

function rewriteGuide(slug, { title, description, ogTitle, ogDescription, hero, beforeGate, afterGate }) {
  patchFile(path.join(GUIDES, `${slug}.html`), html => html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${ogTitle}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${ogDescription}">`)
    .replace(/<header class="guide-hero">[\s\S]*?<\/header>/, hero)
    .replace(/<div class="prose">[\s\S]*?<\/div>\s*(<!-- partial:gate -->)/, `${beforeGate}\n\n  $1`)
    .replace(/(<!-- \/partial:gate -->)\s*<div class="prose">[\s\S]*?<\/div>\s*(<section class="related">)/, `$1\n\n  ${afterGate}\n\n  $2`));
}

rewriteGuide('claude', {
  title: 'What is Claude AI? Claude vs ChatGPT, best uses and limits | Shift & Lead',
  description: 'What is Claude AI, who owns it, what is Claude best used for, and how is Claude different from ChatGPT? A plain-English guide with a real test to try.',
  ogTitle: 'What is Claude AI and when should you use it?',
  ogDescription: 'Claude AI explained in plain English: best uses, Claude vs ChatGPT, limits, and one useful test to try.',
  hero: `<header class="guide-hero"><p class="eyebrow mono">Know the players / Anthropic</p><h1>Claude AI</h1><p class="verdict">Claude is an AI assistant built by Anthropic. It is especially useful when you need AI to read a lot, keep track of context and help you think through a problem.</p><figure class="cover"><img src="/assets/covers/claude.svg" alt="Claude AI guide from Shift and Lead" width="1280" height="720"></figure><ul class="tldr"><li><span>Best for</span>Long documents, research, complex writing and work that takes several rounds.</li><li><span>Different from ChatGPT</span>Claude often feels strongest when the job is reading, comparing and keeping a long thread together.</li><li><span>Try this first</span>Give Claude three documents you already know and ask it what changed, what conflicts and what is missing.</li></ul></header>`,
  beforeGate: `<div class="prose"><h2>What is Claude AI?</h2><p>Claude is an AI assistant made by Anthropic, an AI company founded by former OpenAI researchers. You can use Claude to ask questions, write, analyse files, summarise information and work through problems.</p><p>The easiest way to picture it is this: a normal chatbot answers one question. Claude is most useful when you put a pile of information on the table and say, “Read all of this with me.”</p><div class="callout"><p class="callout-label">Picture it like this</p><p><strong>You</strong> → reports, notes, contracts, research → <strong>Claude</strong> → patterns, differences, questions → <strong>You decide</strong>.</p></div><h2>What is Claude best used for?</h2><p>Claude is a strong choice for long documents, research, proposals, strategy, policy, transcripts and other work where the AI needs to remember a lot at once.</p><ul><li><strong>Compare documents.</strong> Ask what changed between two versions or where several sources disagree.</li><li><strong>Build a long draft.</strong> Keep the same context while you improve a proposal, report or training document over several rounds.</li><li><strong>Question your thinking.</strong> Ask what is missing, what does not add up and what a sceptical reader would challenge.</li><li><strong>Work with code.</strong> Claude Code is designed for developers who want AI to read and change code across a project.</li></ul><h2>Claude vs ChatGPT: what is the difference?</h2><p>Claude and ChatGPT overlap a lot. Both can write, analyse files, answer questions and help with research. The useful difference is not “one is smart and one is not.” It is which one fits the job better.</p><p>If your work is a long report, several source files or a draft that needs to stay coherent over time, Claude is worth testing. If you already use ChatGPT well for everyday work, there is no reason to switch everything.</p><h2>Try Claude on this first</h2><p>Choose three documents you already understand well. Ask: “What changed between these? Where do they contradict each other? What decision is still unresolved?”</p><p>Because you already know the material, you can judge whether Claude is helping instead of being impressed by a polished answer.</p></div>`,
  afterGate: `<div class="prose"><h2>Can Claude AI be wrong?</h2><p>Yes. Claude can make up facts, misread a source or give a confident answer that sounds better than it is. Check dates, numbers, quotations, legal claims and anything important enough to cost you money or trust.</p><p>If you are making a decision, ask Claude for the strongest argument against your current view. That reduces the risk of using AI only to agree with you.</p><blockquote class="pull">Claude can carry a lot of the thinking work. It cannot carry the consequences.</blockquote><h2>Who should use Claude AI?</h2><p>Claude is worth trying if your work involves long documents, research, complex writing, strategy, policy, proposals or code. If most of your needs are quick questions and simple everyday tasks, the difference may feel small.</p><h2>My take on Claude</h2><p>Do not choose Claude because someone online says it is “better.” Give it one job that matches its strengths and compare the result with the AI you already use. Keep the tool that helps you do that job better.</p></div>`
});

rewriteGuide('mistral', {
  title: 'What is Mistral AI? Le Chat, open-weight models and private deployment | Shift & Lead',
  description: 'What is Mistral AI, what is Le Chat, what are open-weight AI models, and what does private AI deployment mean? A plain-English guide to the European AI company.',
  ogTitle: 'What is Mistral AI and why does it matter?',
  ogDescription: 'Mistral AI explained simply: Le Chat, open-weight models, private deployment and when European businesses should care.',
  hero: `<header class="guide-hero"><p class="eyebrow mono">Know the players / Mistral AI</p><h1>Mistral AI</h1><p class="verdict">Mistral AI is a French AI company. Its main difference is not just the chatbot: it gives businesses more ways to control where and how some AI models run.</p><figure class="cover"><img src="/assets/covers/mistral.svg" alt="Mistral AI guide from Shift and Lead" width="1280" height="720"></figure><ul class="tldr"><li><span>What it is</span>A European AI company that builds AI models and the Le Chat assistant.</li><li><span>Why it matters</span>Open-weight models and private deployment can matter when your company needs more control.</li><li><span>Who should look closer</span>European, regulated or privacy-sensitive organisations.</li></ul></header>`,
  beforeGate: `<div class="prose"><h2>What is Mistral AI?</h2><p>Mistral AI is a French artificial-intelligence company. It builds large language models, usually shortened to <strong>LLMs</strong>, and its own AI assistant called <strong>Le Chat</strong>.</p><p>An LLM is the type of AI model behind tools that can understand and generate text. Le Chat is the part a normal user opens and talks to.</p><h2>Why is Mistral AI different?</h2><p>Mistral matters because it gives companies more choices about where some models run and who controls them. That is important when a business cannot simply put sensitive data into any public AI service.</p><div class="callout"><p class="callout-label">Picture it like this</p><p><strong>Public AI service:</strong> your file → AI company's computers → answer.<br><strong>Private deployment:</strong> your file → computers or cloud systems your company controls → answer.</p></div><h2>What is private AI deployment?</h2><p><strong>Private deployment</strong> means the AI runs in an environment your company controls more directly, instead of only through a public chatbot website. That environment might be your own computers, private servers or a private cloud setup.</p><p>This does not automatically make the AI “safe.” It simply gives the organisation more control over where the system runs and how access is managed.</p><h2>What are open-weight AI models?</h2><p><strong>Open-weight models</strong> are AI models whose trained model files can be downloaded and run outside the company that created them, under the licence that model provides.</p><p>The simple version: instead of always renting access to somebody else's AI, a company may be able to run some Mistral models itself.</p><h2>Mistral vs ChatGPT and Claude</h2><p>If your only question is “Which chatbot writes the best email?”, Mistral may not be the first comparison you need. ChatGPT and Claude have larger ecosystems and are easier to find tutorials and integrations for.</p><p>Mistral becomes more interesting when the question is about <strong>data residency, private deployment, open-weight models or European procurement requirements</strong>.</p></div>`,
  afterGate: `<div class="prose"><h2>Who should use Mistral AI?</h2><p>Look more closely at Mistral if you work with European enterprise clients, operate in a regulated environment, need more control over where AI runs or want the option to use models outside a single hosted chat service.</p><h2>What should you try with Le Chat?</h2><p>If you work across languages, give Le Chat the same real business task in English and in the language your customers actually use. Compare tone, meaning and how much editing you need.</p><p>If privacy or data location is the reason you are looking at Mistral, start with the requirement instead: write down exactly what data is involved, where it is allowed to go and what your client or regulator requires.</p><h2>My take on Mistral AI</h2><p>Mistral matters even if you never become a customer. It gives businesses another serious AI option and makes the market less dependent on a handful of US companies.</p><p>For a small business, I would choose it because a real requirement points me there—not because “European AI” sounds better.</p></div>`
});

rewriteGuide('first-ai-employee', {
  title: 'How to build an AI worker for your business: one task, clear rules | Shift & Lead',
  description: 'How to build an AI worker for one repeatable business task. Learn the job, input, output, permissions, guardrails and automation trigger in plain English.',
  ogTitle: 'How to build your first AI worker',
  ogDescription: 'A practical AI automation guide: choose one repeatable task, set permissions and guardrails, add a trigger, and keep human judgment where it belongs.',
  hero: `<header class="guide-hero"><p class="eyebrow mono">Put AI to work</p><h1>Build your first AI worker</h1><p class="verdict">Do not automate your whole business. Hand AI one repeatable task, give it clear rules and keep the decisions that need you.</p><figure class="cover"><img src="/assets/covers/first-ai-employee.svg" alt="How to build an AI worker guide from Shift and Lead" width="1280" height="720"></figure><ul class="tldr"><li><span>Start with</span>One task that repeats and has a clear beginning and end.</li><li><span>Set limits</span>Give the AI only the access it needs and make important actions require approval.</li><li><span>The goal</span>AI carries repeatable steps. You keep judgment and final decisions.</li></ul></header>`,
  beforeGate: `<div class="prose"><h2>What is an AI worker?</h2><p>An <strong>AI worker</strong> is an AI system set up to do one repeatable job for your business. It might sort an inbox, prepare a report, qualify a lead or turn meeting notes into actions.</p><p>The important part is that it has a defined job. “Help me with my business” is too vague. “Every morning, sort new support emails into three groups and draft replies for me to approve” is a job.</p><div class="callout"><p class="callout-label">Draw it in one line</p><p><strong>Input</strong> → <strong>AI does the repeatable steps</strong> → <strong>you review or decide</strong> → <strong>output</strong>.</p></div><h2>1. Choose one repeatable task</h2><p>Pick work you already know how to do. Good first tasks repeat often, use similar inputs and do not need a new human decision every time.</p><p>Examples: sorting emails, preparing a weekly summary, checking leads against a list, turning a transcript into action items.</p><h2>2. Write the AI job description</h2><p>Before choosing tools, write the job in plain language. This is the foundation of the automation.</p><div class="guide-table"><table><tbody><tr><td><strong>Job</strong></td><td>What is the AI responsible for?</td></tr><tr><td><strong>Input</strong></td><td>What information arrives?</td></tr><tr><td><strong>Output</strong></td><td>What should come back?</td></tr><tr><td><strong>Rules</strong></td><td>What must always be true?</td></tr><tr><td><strong>Never do</strong></td><td>What needs your approval or must stay off-limits?</td></tr></tbody></table></div><h2>3. Set AI permissions and guardrails</h2><p><strong>Permissions</strong> are what the AI is technically allowed to access or do. <strong>Guardrails</strong> are the rules that keep it inside the job.</p><p>A prompt saying “do not send emails” is weaker than an account that cannot send emails. When the risk matters, put the limit in the permission as well as the instruction.</p><p>A safe first setup might allow the AI to read an inbox and create drafts, but not press Send.</p></div>`,
  afterGate: `<div class="prose"><h2>4. Add an AI automation trigger</h2><p>An <strong>automation trigger</strong> is the event that starts the job. It could be a time, a new email, a new lead, the end of a meeting or a file arriving in a folder.</p><p>Example: <strong>new lead arrives → AI checks the lead → AI prepares a summary → you decide what happens next.</strong></p><h2>5. Review the system, not only the answer</h2><p>When the result is wrong, do not just fix the sentence. Ask why the system failed. Was the rule unclear? Was an example missing? Did the AI have too much access? Did the task actually need human judgment?</p><p>Then improve the job description, example or permission so the same mistake is less likely next time.</p><blockquote class="pull">The goal is not to remove yourself from the business. It is to remove yourself from repeatable steps that never needed you.</blockquote><h2>What is a good first AI automation?</h2><p>A good first AI automation does one job, has a clear input and output, uses limited permissions, stops when a decision needs you and produces work you can review quickly.</p><h2>Try this AI worker exercise</h2><p>Write down one task you did at least three times last month. Under it, write five lines: <strong>input, output, rules, never do, trigger.</strong> If you can fill those five lines clearly, you have a good candidate to build.</p></div>`
});

// Remove visible freshness/read-time metadata across every guide while keeping dates in structured SEO metadata.
for (const file of walk(GUIDES)) {
  patchFile(file, html => html
    .replace(/\s*<!-- data:guide-byline -->[\s\S]*?<!-- \/data:guide-byline -->/g, '')
    .replace(/<p class="card-desc">Updated [\s\S]*? min read<\/p>/g, ''));
}

console.log('Applied final copy, accessibility, SEO guide rewrites and mobile polish.');
