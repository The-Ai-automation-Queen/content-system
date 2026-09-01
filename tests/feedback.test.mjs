import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

test('feedback form includes every approved product feedback question with usable fields', () => {
  const page = read('main-site/workbooks/find-your-zone-of-genius-feedback.html');
  const approvedPrompts = [
    'Before starting, what were you hoping this would help you understand?',
    'Did you complete the workbook, the private-agent reflection, or both?',
    'At what point did you stop, pause or feel unsure?',
    'Which result, if any, helped you connect something you had not connected before?',
    'Which result felt generic, wrong or unsupported?',
    'Could you trace the main suggestions back to your own answers?',
    'Did showing contradictions and uncertainty make the result more useful, less useful, or neither?',
    'Did you keep, edit or reject the suggested working hypothesis?',
    'Could you explain your chosen hypothesis to a friend in one sentence?',
    'Is your 30-day test specific enough to begin?',
    'What, if anything, felt too private or unsafe to enter?',
    'What should be removed, clarified or changed before another person uses this?',
    'Would you recommend it to someone in a similar transition?',
    'What price would have felt fair for the version you used?',
  ];

  for (const prompt of approvedPrompts) assert.ok(page.includes(prompt), prompt);
  for (let question = 1; question <= 14; question += 1) {
    assert.match(page, new RegExp(`name=["']q${question}["']`));
  }
  assert.equal((page.match(/<fieldset/g) || []).length, 14);
});

test('testimonial permission is separate, optional, and exact-quote approval is explicit', () => {
  const page = read('main-site/workbooks/find-your-zone-of-genius-feedback.html');
  const permissionStart = page.indexOf('May Shift &amp; Lead quote part of your feedback publicly?');
  const feedbackEnd = page.indexOf('</form>');

  assert.ok(permissionStart > 0);
  assert.ok(feedbackEnd > permissionStart);
  assert.match(page, /name="quote_permission"/);
  assert.doesNotMatch(page, /name="quote_permission"[^>]*required/);
  assert.ok(page.includes('No, keep all my feedback private.'));
  assert.ok(page.includes('Yes, but show me the exact edited quote before it is published.'));
  assert.ok(page.includes('Yes, using my first name and role, after I approve the exact quote.'));
  assert.ok(page.includes('Yes, anonymously, after I approve the exact quote.'));
  assert.ok(page.includes('Which sentence best describes what changed for you, in your own words?'));
  assert.doesNotMatch(page, /name="testimonial_words"[^>]*required/);
});

test('testimonial wording prompt appears only after an optional yes choice', () => {
  const page = read('main-site/workbooks/find-your-zone-of-genius-feedback.html');
  const script = read('main-site/assets/zone-genius-feedback.js');

  assert.match(page, /data-testimonial-words[^>]*hidden/);
  assert.match(script, /quote_permission/);
  assert.match(script, /value !== 'private'/);
  assert.match(script, /words\.hidden = !show/);
  assert.match(script, /textarea\.required = show/);
});

test('form keeps reflection content private and cannot submit to an unapproved collector', () => {
  const page = read('main-site/workbooks/find-your-zone-of-genius-feedback.html');
  const script = read('main-site/assets/zone-genius-feedback.js');
  const combined = `${page}\n${script}`;

  assert.ok(page.includes('Shift &amp; Lead does not receive your reflection answers, analysis or final page.'));
  assert.match(page, /Do not paste or describe your private reflection answers/i);
  assert.doesNotMatch(page, /If yes, write it here/i);
  assert.doesNotMatch(page, /name=["'](?:reflection_answers|analysis|final_page|hypothesis_text)["']/i);
  assert.doesNotMatch(page, /<form[^>]+action=/i);
  assert.match(page, /data-feedback-submit/);
  assert.match(page, /data-feedback-status/);
  assert.match(script, /event\.preventDefault\(\)/);
  assert.match(script, /Feedback collection is not open yet/);
  assert.doesNotMatch(combined, /fetch\s*\(|XMLHttpRequest|sendBeacon|form\.submit\s*\(/);
});

test('four unsent email templates use the approved copy and privacy boundary', () => {
  const templates = [
    'checkout/delivery-email.md',
    'checkout/early-feedback-email.md',
    'checkout/30-day-follow-up-email.md',
    'checkout/exact-quote-approval-email.md',
  ].map(read);
  const combined = templates.join('\n');

  assert.equal(templates.length, 4);
  for (const template of templates) {
    assert.match(template, /Status: Draft only\. Do not send\./);
    assert.match(template, /Do not send private reflection answers by email\./);
    assert.doesNotMatch(template, /—/);
  }

  assert.match(templates[0], /Subject: Your Find Your Zone of Genius reflection/);
  assert.match(templates[0], /You are in\. Here is the best way to begin\./);
  assert.match(templates[0], /Keep what is supported, edit what is partly true and reject what is wrong\./);
  assert.match(templates[1], /short feedback form/);
  assert.match(templates[1], /does not require public quote permission/i);
  assert.match(templates[2], /What did you try\?/);
  assert.match(templates[2], /What happened\?/);
  assert.match(templates[2], /What now needs to change\?/);
  assert.match(templates[3], /\[exact edited quote\]/);
  assert.match(templates[3], /approve the exact quote/i);
  assert.match(templates[3], /will not be published unless you approve/i);
  assert.doesNotMatch(combined, /send (?:me |us )?your (?:answers|analysis|final page)|reply with your (?:answers|analysis|final page)/i);
});

test('feedback page has a responsive Shift and Lead form treatment', () => {
  const page = read('main-site/workbooks/find-your-zone-of-genius-feedback.html');
  const styles = read('main-site/assets/pages/zone-genius-feedback.css');

  assert.match(page, /href="\/assets\/pages\/zone-genius-feedback\.css"/);
  assert.match(styles, /\.feedback-form/);
  assert.match(styles, /'Playfair Display'/);
  assert.match(styles, /'Source Serif 4'/);
  assert.match(styles, /#1b2ea0/i);
  assert.match(styles, /@media\s*\(max-width:/);
  assert.match(styles, /:focus-visible/);
});
