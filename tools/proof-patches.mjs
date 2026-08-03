#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function patchFile(relativePath, transform) {
  const file = path.join(ROOT, relativePath);
  if (!fs.existsSync(file)) return;
  const before = fs.readFileSync(file, 'utf8');
  const after = transform(before);
  if (after !== before) fs.writeFileSync(file, after);
}

const coccoShortCard = `    <div class="testi-card">
      <div class="testi-stat">From no AI experience to building AI products.</div>
      <p class="testi-quote">&ldquo;I went from having no AI experience to automating much of my workflow and building AI products faster than I thought possible. Fatiha made something complex feel simple and practical.&rdquo;</p>
      <div class="testi-attrib">
        <div class="testi-name">Cocco M., Beauty Business Coach, HighPerfomanceBusinessAcademy</div>
      </div>
    </div>`;

patchFile('main-site/index.html', (html) => {
  const myriamCard = /    <div class="testi-card">\s*<div class="testi-stat">Less admin\. More innovation\.<\/div>[\s\S]*?<div class="testi-name">Myriam M\.<\/div>[\s\S]*?<\/div>\s*<\/div>/;
  return html.replace(myriamCard, coccoShortCard);
});

const aboutQuote = `<section class="client-pullquote">
  <div class="kicker">In her words</div>
  <h2>&ldquo;I never believed I would be able to understand and use AI the way I do today.&rdquo;</h2>
  <p><strong>Cocco M.</strong><br>Beauty Business Coach, HighPerfomanceBusinessAcademy</p>
</section>`;

patchFile('main-site/about.html', (html) => {
  if (html.includes('HighPerfomanceBusinessAcademy')) return html;
  const anchor = `</section>\n\n<section>\n  <div class="company">`;
  return html.replace(anchor, `</section>\n\n${aboutQuote}\n\n<section>\n  <div class="company">`);
});

const fullTestimonial = `<section class="offer-section client-proof">
  <p class="eyebrow mono">Client outcome</p>
  <h2>From no AI experience to building AI products.</h2>
  <blockquote>
    <p>&ldquo;Working with Fatiha has genuinely changed the way I work.</p>
    <p>I never believed I would be able to understand and use AI the way I do today. Fatiha has an incredible ability to explain complex things in such a simple, practical way that even someone with no AI experience can quickly understand and start applying it.</p>
    <p>Since working with her, I&rsquo;ve saved countless hours creating content because so much of my workflow is now automated. I&rsquo;ve also built AI products faster than I ever thought possible.</p>
    <p>Fatiha doesn&rsquo;t just teach AI; she empowers you to use it with confidence. Her knowledge is exceptional, and the impact she&rsquo;s had on my business has been truly life-changing.&rdquo;</p>
  </blockquote>
  <p><strong>Cocco M.</strong><br>Beauty Business Coach, HighPerfomanceBusinessAcademy</p>
</section>`;

patchFile('main-site/build-sprint.html', (html) => {
  if (html.includes('Beauty Business Coach, HighPerfomanceBusinessAcademy')) return html;
  const anchor = `<section class="offer-section">\n  <h2><!-- copy:build_sprint.fit_h2 -->Who this is for<!-- /copy:build_sprint.fit_h2 -->, and who it's not</h2>`;
  return html.replace(anchor, `${fullTestimonial}\n\n${anchor}`);
});

console.log('Applied testimonial proof patches.');
