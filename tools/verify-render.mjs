/* Render check for the three sites.

   verify.mjs reads the HTML. This one looks at the page.

   That distinction matters: on 2026-07-29 verify.mjs reported 999 PASS / 0 FAIL
   on a build that had shipped a visibly broken feed to brief.shiftandlead.com.
   Every check it ran was true. None of them could see a layout.

   This script serves each site root over HTTP, opens every page in headless
   Chromium at desktop and phone widths, and fails on the things a structural
   parse cannot reach:

     - the page scrolls sideways
     - a {{PLACEHOLDER}} survived into rendered text or into an attribute
     - an image did not load, once lazy images have had their chance
     - a page that should be styled loaded no stylesheet, or an empty one
     - the page threw a JavaScript error
     - a grid child is the wrong shape, per shape.json

   Root-absolute paths (/assets/site.css) are why this serves over HTTP instead
   of opening file:// URLs. Under file:// they resolve to the filesystem root
   and every page renders unstyled, which looks like a catastrophic failure and
   is really just the wrong protocol.

   Playwright is not a dependency of this repo. verify.mjs stays zero-dep and is
   the gate that must always run. This is the extra pass, and it says so plainly
   when it cannot run.

   Usage:  node tools/verify-render.mjs [--site=brief|guides|www] [--shots=DIR]
*/

import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));

const SITES = {
  guides: { root: join(ROOT, 'site'), label: 'guides.shiftandlead.com' },
  www: { root: join(ROOT, 'main-site'), label: 'www.shiftandlead.com' },
  brief: { root: join(ROOT, 'ai-insider-brief', 'ai-insider-brief'), label: 'brief.shiftandlead.com' }
};

const WIDTHS = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'desktop', width: 1280, height: 900 }
];

/* Shapes that broke once and must not break again. A selector maps to the rule
   its box has to satisfy at a given width. Keep this list short and specific:
   it is a regression net, not a design spec. */
const SHAPES = [
  {
    site: 'brief', path: 'index.html', width: 1280, selector: '.feed-optin',
    // Shipped as a 392px grid cell, which punched a hole in the feed.
    test: box => box.width > 900,
    why: 'the in-feed opt-in must span the feed grid, not sit in one card cell'
  },
  {
    site: 'brief', path: 'index.html', width: 390, selector: '.sl-ribbon',
    // Shipped at 155px, which is a fifth of a phone screen before the header.
    test: box => box.height <= 110,
    why: 'the opt-in ribbon sits above the header, so it must stay a thin band on a phone'
  },
  {
    site: 'brief', path: 'index.html', width: 1280, selector: '.feed-card',
    // Shipped at 573px after a decorative thumbnail was added to every card.
    test: box => box.height < 450,
    why: 'a briefing card is a summary, so it must not grow into a hero tile'
  }
];

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml'
};

function serve(root) {
  return new Promise(ok => {
    const server = createServer(async (req, res) => {
      try {
        let p = decodeURIComponent(req.url.split('?')[0]);
        if (p.endsWith('/')) p += 'index.html';
        const file = join(root, p);
        if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
        const body = await readFile(file);
        res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
        res.end(body);
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain' }).end('not found');
      }
    });
    server.listen(0, '127.0.0.1', () => ok({ server, port: server.address().port }));
  });
}

async function htmlFiles(root) {
  const out = [];
  async function walk(dir) {
    for (const name of await readdir(dir)) {
      if (name === 'node_modules' || name.startsWith('.') || name === '_archive') continue;
      const full = join(dir, name);
      if ((await stat(full)).isDirectory()) await walk(full);
      else if (extname(full) === '.html') out.push(relative(root, full).split('\\').join('/'));
    }
  }
  await walk(root);
  return out.sort();
}

/* A redirect stub is a handful of meta tags and an empty body. It is supposed
   to have no stylesheet, so it must not be judged as a page. */
async function isRedirectStub(root, rel) {
  const html = await readFile(join(root, rel), 'utf8');
  return /http-equiv=["']refresh["']/i.test(html) && html.length < 1200;
}

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error(
    'verify-render needs Playwright, which this repo does not depend on.\n' +
    'Install it where you are running the check, then run this again:\n' +
    '  npm i -D playwright\n' +
    'verify.mjs is the zero-dependency gate and is unaffected.'
  );
  process.exit(2);
}

const args = process.argv.slice(2);
const only = (args.find(a => a.startsWith('--site=')) || '').split('=')[1];
const shotsDir = (args.find(a => a.startsWith('--shots=')) || '').split('=')[1];

const exe = '/opt/pw-browsers/chromium';
const browser = await chromium.launch(existsSync(exe) ? { executablePath: exe } : {});

/* The pages load fonts from Google, and that stylesheet blocks rendering. Fetched
   fresh on every page it costs about twelve seconds each, which turns this check
   into an hour nobody will wait for. So fetch each external URL once and replay it
   from memory after that. The fonts still load, so the type metrics this check
   measures are the real ones. */
const cache = new Map();

async function cacheExternal(context) {
  await context.route('**/*', async route => {
    const url = route.request().url();
    if (url.startsWith('http://127.0.0.1')) return route.continue();
    const hit = cache.get(url);
    if (hit) return route.fulfill(hit);
    try {
      const res = await route.fetch();
      const entry = {
        status: res.status(),
        headers: res.headers(),
        body: await res.body()
      };
      cache.set(url, entry);
      return route.fulfill(entry);
    } catch {
      return route.abort();
    }
  });
}

const contexts = {};
for (const vp of WIDTHS) {
  contexts[vp.name] = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  await cacheExternal(contexts[vp.name]);
}

let pass = 0;
const failures = [];

for (const [key, site] of Object.entries(SITES)) {
  if (only && only !== key) continue;
  if (!existsSync(site.root)) continue;

  const { server, port } = await serve(site.root);
  const base = `http://127.0.0.1:${port}/`;
  const files = await htmlFiles(site.root);
  console.log(`\n${site.label}  (${files.length} pages)`);

  for (const rel of files) {
    const stub = await isRedirectStub(site.root, rel);
    const raw = await readFile(join(site.root, rel), 'utf8');
    const problems = [];

    // A placeholder in an attribute never reaches innerText, so read the source
    // too. This is how {{OFFER_FORM_ID}} sat in a live form action unnoticed.
    for (const m of new Set(raw.match(/\{\{[A-Z0-9_]+\}\}/g) || [])) {
      problems.push(`unresolved placeholder ${m} in the source`);
    }

    for (const vp of WIDTHS) {
      const page = await contexts[vp.name].newPage();
      const jsErrors = [];
      page.on('pageerror', e => jsErrors.push(e.message));

      await page.goto(base + rel, { waitUntil: 'networkidle', timeout: 30000 })
        .catch(e => problems.push(`${vp.name}: did not load (${e.message.split('\n')[0]})`));
      await page.addStyleTag({
        content: 'html{scroll-behavior:auto!important}*{animation:none!important;transition:none!important}'
      }).catch(() => {});

      // Walk the page so lazy images are asked for before we judge them.
      await page.evaluate(async () => {
        const h = document.body.scrollHeight;
        for (let y = 0; y < h; y += 500) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise(r => setTimeout(r, 30));
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      }).catch(() => {});
      await page.waitForTimeout(500);

      const r = await page.evaluate(() => {
        const cw = document.documentElement.clientWidth;
        const inScroller = el => {
          for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
            const o = getComputedStyle(n).overflowX;
            if (o === 'auto' || o === 'scroll' || o === 'hidden') return true;
          }
          return false;
        };
        return {
          hScroll: document.documentElement.scrollWidth - cw,
          wide: [...document.querySelectorAll('body *')].filter(el => {
            const b = el.getBoundingClientRect();
            if (!b.width || !b.height) return false;
            if (getComputedStyle(el).position === 'fixed') return false;
            if (inScroller(el)) return false;
            return b.right > cw + 2;
          }).slice(0, 4).map(el => el.tagName.toLowerCase() +
            (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/)[0] : '')),
          placeholders: [...new Set(document.body.innerText.match(/\{\{[A-Z0-9_]+\}\}/g) || [])],
          brokenImgs: [...document.images]
            .filter(i => i.complete && i.naturalWidth === 0)
            .map(i => i.getAttribute('src')).slice(0, 5),
          sheets: [...document.styleSheets].filter(s => s.href).map(s => {
            let n = null;
            try { n = s.cssRules.length; } catch { n = null; } // cross-origin, cannot read
            return { href: s.href, rules: n };
          })
        };
      }).catch(() => null);

      if (r) {
        if (r.hScroll > 2) {
          problems.push(`${vp.name}: page scrolls sideways by ${r.hScroll}px` +
            (r.wide.length ? ` (${r.wide.join(', ')})` : ''));
        }
        for (const ph of r.placeholders) problems.push(`${vp.name}: ${ph} is visible on the page`);
        for (const src of r.brokenImgs) problems.push(`${vp.name}: image did not load: ${src}`);
        if (!stub) {
          const local = r.sheets.filter(s => s.rules !== null);
          if (!local.length) problems.push(`${vp.name}: no stylesheet loaded`);
          else if (local.some(s => s.rules === 0)) {
            problems.push(`${vp.name}: stylesheet loaded but is empty: ` +
              local.filter(s => s.rules === 0).map(s => s.href.split('/').pop()).join(', '));
          }
        }
      }

      for (const shape of SHAPES) {
        if (shape.site !== key || shape.path !== rel || shape.width !== vp.width) continue;
        const box = await page.evaluate(sel => {
          const el = document.querySelector(sel);
          if (!el) return null;
          const b = el.getBoundingClientRect();
          return { width: Math.round(b.width), height: Math.round(b.height) };
        }, shape.selector).catch(() => null);
        if (!box) problems.push(`${vp.name}: ${shape.selector} is missing, so its shape cannot be checked`);
        else if (!shape.test(box)) {
          problems.push(`${vp.name}: ${shape.selector} is ${box.width}x${box.height} — ${shape.why}`);
        }
      }

      for (const e of jsErrors) problems.push(`${vp.name}: JavaScript error: ${e}`);

      if (shotsDir) {
        await page.screenshot({
          path: join(shotsDir, `${key}-${rel.replace(/[\/.]/g, '_')}-${vp.name}.png`),
          fullPage: true
        }).catch(() => {});
      }
      await page.close();
    }

    if (problems.length) {
      failures.push({ site: site.label, page: rel, problems });
      console.log(`  FAIL  ${rel}`);
      for (const p of problems) console.log(`          ${p}`);
    } else {
      pass++;
      console.log(`  PASS  ${rel}`);
    }
  }

  server.close();
}

await browser.close();

console.log('\n' + '-'.repeat(64));
console.log(`Pages rendered clean: ${pass}   Pages with problems: ${failures.length}`);
if (failures.length) {
  console.log('\nWhat to fix:');
  for (const f of failures) {
    console.log(`  ${f.site} ${f.page}`);
    for (const p of f.problems) console.log(`    - ${p}`);
  }
}
process.exit(failures.length ? 1 : 0);
