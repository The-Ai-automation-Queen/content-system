import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const page = fs.readFileSync(path.join(root, 'main-site/workbooks/find-your-zone-of-genius.html'), 'utf8');
const checkoutScript = fs.readFileSync(path.join(root, 'main-site/assets/checkout.js'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'main-site/assets/pages/zone-genius.css'), 'utf8');
const waitlistScriptPath = path.join(root, 'main-site/assets/zone-genius-waitlist.js');
const waitlistApiPath = path.join(root, 'main-site/api/zone-genius-waitlist.js');
const canonical = 'https://www.shiftandlead.com/workbooks/find-your-zone-of-genius.html';
const title = 'Find Your Zone of Genius | A private reflection with AI';
const description = 'Think you have nothing special? Use your own life as evidence, let AI find the patterns and leave with a direction you can test.';
const cta = 'Start my private reflection';

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replaceAll('&amp;', '&')
    .replaceAll('&rsquo;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&middot;', '·')
    .replace(/\s+/g, ' ')
    .trim();
}

const text = visibleText(page);

test('landing page publishes the approved search and sharing metadata', () => {
  assert.match(page, new RegExp(`<title>${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</title>`));
  assert.ok(page.includes(`<meta name="description" content="${description}">`));
  assert.ok(page.includes(`<link rel="canonical" href="${canonical}">`));

  for (const property of ['og:title', 'twitter:title']) {
    assert.ok(page.includes(`content="${title}"`) && page.includes(`${property}`), `${property} must use the approved title`);
  }
  for (const property of ['og:description', 'twitter:description']) {
    assert.ok(page.includes(`content="${description}"`) && page.includes(`${property}`), `${property} must use the approved description`);
  }
  assert.ok(page.includes(`<meta property="og:url" content="${canonical}">`));
  assert.match(page, /<meta property="og:image" content="https:\/\/www\.shiftandlead\.com\/[^"]+">/);
  assert.match(page, /<meta name="twitter:image" content="https:\/\/www\.shiftandlead\.com\/[^"]+">/);
  assert.match(page, /<meta name="twitter:card" content="summary_large_image">/);
});

test('landing page contains every approved compact section and no proof section', () => {
  const requiredHeadings = [
    "Think you have nothing special? Let's look more closely.",
    'You are not starting with nothing.',
    'Start with what actually happened.',
    'One product. Three useful results.',
    'AI can compare your evidence. It cannot decide who you are.',
    'This is for you if a chapter is changing.',
    'You see what will be shared before anything is analysed.',
    'Take the reflection at your own pace.',
    'FAQ',
    'You may not need a new identity. You may need to see the pattern in the life you already lived.',
  ];

  for (const heading of requiredHeadings) assert.ok(text.includes(heading), `missing approved heading: ${heading}`);
  assert.doesNotMatch(text, /What beta readers found|testimonial|customer stor(?:y|ies)/i);
  assert.doesNotMatch(page, /class="[^"]*proof/i);
});

test('landing page presents the approved process, results, price, beta limit, and terms', () => {
  for (const step of ['Remember', 'Compare', 'Decide', 'Test']) assert.match(page, new RegExp(`>${step}<`));
  for (const result of ['Your evidence', 'Your possible patterns', 'Your direction to test']) assert.ok(text.includes(result));
  assert.ok(text.includes('US$39'));
  assert.ok(text.includes('12 beta buyers'));
  assert.ok(text.includes('No refunds are available because this is a downloadable product.'));
  assert.ok(page.includes('href="/workbooks/find-your-zone-of-genius-refund-terms.html"'));
});

test('landing page uses the approved privacy wording exactly', () => {
  const privacy = 'You install the reflection agent inside your own ChatGPT Project. Shift & Lead does not receive your answers, analysis or final page. ChatGPT still processes and stores what you enter according to your account, workspace and data-control settings. Review those settings and leave out anything you do not want ChatGPT to process.';
  assert.ok(text.includes(privacy));
  assert.ok(text.includes('Read how your answers are handled'));
});

test('landing page includes all six approved FAQ answers', () => {
  const faq = [
    ['Is AI deciding my Zone of Genius?', 'No. It offers three possible readings of your evidence. You choose, edit or reject them.'],
    ['What if I cannot remember impressive examples?', 'They do not need to be impressive. Ordinary moments often show what you notice, what people trust you with and what kind of effort gives you energy.'],
    ['Do I need to know how to use AI?', 'No. The download includes simple instructions for creating a ChatGPT Project, adding the file and starting the reflection.'],
    ['How long does it take?', 'There is no tested completion time yet. The reflection is designed to be completed over more than one sitting. The 30-day test happens afterwards.'],
    ['Is this career advice?', 'No. It helps you form a direction from your own evidence. You are responsible for any career, business or financial decision you make from it.'],
    ['What happens to my answers?', 'Shift & Lead does not receive them. The reflection runs inside your own ChatGPT Project. ChatGPT processes and stores the conversation under your account, workspace and data-control settings. The setup file shows you which settings to review before starting.'],
  ];

  for (const [question, answer] of faq) {
    assert.ok(text.includes(question), `missing FAQ question: ${question}`);
    assert.ok(text.includes(answer), `missing FAQ answer: ${question}`);
  }
});

test('unfinished checkout is replaced by a useful Lumail waitlist', () => {
  assert.doesNotMatch(page, /data-checkout-button|Checkout is not open yet|src="\/assets\/checkout\.js"/);
  assert.match(page, /href="#zone-genius-waitlist"[^>]*>Join the beta waitlist<\/a>/);
  assert.match(page, /<form[^>]+id="zone-genius-waitlist"[^>]+action="\/api\/zone-genius-waitlist"/);
  assert.match(page, /<input[^>]+type="email"[^>]+name="email"[^>]+required/);
  assert.match(page, /<input[^>]+name="consent"[^>]+required/);
  assert.match(page, /<input[^>]+name="website"/);
  assert.match(page, /<button[^>]+type="submit"[^>]*>Join the beta waitlist<\/button>/);
  assert.ok(fs.existsSync(waitlistScriptPath));
  assert.ok(fs.existsSync(waitlistApiPath));
  const waitlistScript = fs.readFileSync(waitlistScriptPath, 'utf8');
  const waitlistApi = fs.readFileSync(waitlistApiPath, 'utf8');
  assert.match(waitlistScript, /fetch\(form\.action/);
  assert.match(waitlistApi, /LUMAIL_API_TOKEN/);
  assert.match(waitlistApi, /zone-genius-beta-waitlist/);
  assert.doesNotMatch(`${waitlistScript}\n${waitlistApi}`, /reflection_answers|analysis|final_page|hypothesis_text/);
});

test('blue CTAs force readable white text while the light CTA stays blue on white', () => {
  assert.match(styles, /body\[data-page-kind\] \.product-cta\{[^}]*color:#fff!important/);
  assert.match(styles, /body\[data-page-kind\] \.product-cta--light\{[^}]*color:#1b2ea0!important/);
});

test('landing page preserves site chrome and avoids banned landing copy', () => {
  assert.match(page, /<!-- chrome:nav -->[\s\S]*<!-- \/chrome:nav -->/);
  assert.match(page, /<!-- chrome:footer -->[\s\S]*<!-- \/chrome:footer -->/);
  assert.doesNotMatch(page, /—/);
  assert.doesNotMatch(text, /For anyone who feels ordinary|sense of where it may lead|Your reflection stays yours|guaranteed job|discover your purpose/i);
});
