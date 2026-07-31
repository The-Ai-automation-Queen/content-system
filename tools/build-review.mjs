// build-review.mjs — regenerate the read-only review page from the live vault.
//
// Produces dashboard/review.html: a single self-contained file (data baked in)
// meant to be published as a private Artifact so Fatiha can review the whole
// vault from any laptop or phone with no terminal, server or install.
//
// It is READ-ONLY by design. Marking a post POSTED or editing it still goes
// through content-vault.md (the source of truth) — the page never writes.
//
// Run:  node tools/build-review.mjs      (from the repo root)
// Then publish dashboard/review.html as an Artifact.
//
// review.html is generated output and is .gitignored; this script plus
// dashboard/review.css are the tracked source.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseVault } from './vault-parse.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VAULT = path.join(ROOT, 'content-vault.md');
const CSS = path.join(ROOT, 'dashboard', 'review.css');
const OUT = path.join(ROOT, 'dashboard', 'review.html');

const norm = (s) => {
  s = s.toUpperCase();
  if (s.includes('READY')) return 'READY';
  if (s.includes('SCHEDULED')) return 'SCHEDULED';
  if (s.includes('POSTED')) return 'POSTED';
  if (s.includes('KILLED')) return 'KILLED';
  if (s.includes('STALE')) return 'STALE';
  if (s.includes('DRAFT')) return 'DRAFT';
  return s;
};

const raw = fs.readFileSync(VAULT, 'utf8');
const data = parseVault(raw)
  .map((e) => ({ num: e.num, date: e.date, platform: e.platform, title: e.title, status: norm(e.status), body: e.text }))
  .sort((a, b) => Number(b.num) - Number(a.num));

const counts = {};
for (const e of data) counts[e.status] = (counts[e.status] || 0) + 1;

const STATUS = [
  { key: 'READY', label: 'Ready', color: '#1a8f4c' },
  { key: 'POSTED', label: 'Posted', color: '#7c3aed' },
  { key: 'SCHEDULED', label: 'Scheduled', color: '#b26a00' },
  { key: 'DRAFT', label: 'Draft', color: '#556075' },
  { key: 'STALE', label: 'Stale', color: '#94a3b8' },
  { key: 'KILLED', label: 'Killed', color: '#c0362c' },
];

const html = `<div class="wrap">
  <header class="masthead">
    <div class="brand">
      <span class="mark" aria-hidden="true"></span>
      <div>
        <h1>Content Review</h1>
        <p class="sub">Shift &amp; Lead vault &middot; every post, one place. Read, filter, copy.</p>
      </div>
    </div>
    <button id="theme" class="theme" type="button" aria-label="Toggle dark mode"><span class="ti">◐</span></button>
  </header>

  <section class="kpis" aria-label="Totals">
    <div class="kpi"><span class="n" id="k-total">${data.length}</span><span class="l">Posts</span></div>
    <div class="kpi ready"><span class="n">${counts.READY || 0}</span><span class="l">Ready to post</span></div>
    <div class="kpi posted"><span class="n">${counts.POSTED || 0}</span><span class="l">Posted</span></div>
    <div class="kpi draft"><span class="n">${counts.DRAFT || 0}</span><span class="l">Draft</span></div>
  </section>

  <div class="controls">
    <div class="filters" id="filters" role="tablist">
      <button class="pill active" data-f="all" role="tab">All <b>${data.length}</b></button>
      ${STATUS.filter((s) => counts[s.key]).map((s) =>
        `<button class="pill" data-f="${s.key}" role="tab" style="--pc:${s.color}">${s.label} <b>${counts[s.key]}</b></button>`
      ).join('\n      ')}
    </div>
    <div class="search">
      <input id="q" type="search" placeholder="Search title or text…" autocomplete="off" />
    </div>
  </div>

  <main id="list" class="list"></main>
  <p id="empty" class="empty" hidden>Nothing matches that filter.</p>

  <footer class="foot">
    <p>Read-only snapshot for reviewing on any device. To mark a post <b>Posted</b> or edit it, tell Claude the entry number.</p>
  </footer>
</div>

<div id="toast" class="toast" role="status" aria-live="polite"></div>

<script id="vault-data" type="application/json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
<script>
(function () {
  var DATA = JSON.parse(document.getElementById("vault-data").textContent);
  var COLOR = ${JSON.stringify(Object.fromEntries(STATUS.map((s) => [s.key, s.color])))};
  var LABEL = ${JSON.stringify(Object.fromEntries(STATUS.map((s) => [s.key, s.label])))};
  var list = document.getElementById("list");
  var empty = document.getElementById("empty");
  var q = document.getElementById("q");
  var state = { filter: "all", term: "" };

  function esc(s){ return (s||"").replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;"}[c]; }); }

  function card(e) {
    var color = COLOR[e.status] || "#556075";
    var label = LABEL[e.status] || e.status;
    var chars = (e.body || "").length;
    var el = document.createElement("article");
    el.className = "card";
    el.style.setProperty("--sc", color);
    el.innerHTML =
      '<div class="meta">' +
        '<span class="entry">ENTRY ' + esc(e.num) + '</span>' +
        '<span class="dot">&middot;</span><span class="plat">' + esc(e.platform) + '</span>' +
        '<span class="dot">&middot;</span><span class="date">' + esc(e.date) + '</span>' +
        '<span class="status" style="--sc:' + color + '">' + esc(label) + '</span>' +
      '</div>' +
      '<h2 class="title">' + esc(e.title) + '</h2>' +
      (e.body
        ? '<div class="body clamp">' + esc(e.body).replace(/\\n{2,}/g,"</p><p>").replace(/\\n/g,"<br>").replace(/^/,"<p>").replace(/$/,"</p>") + '</div>' +
          '<div class="cardfoot">' +
            '<button class="more" type="button">Show full</button>' +
            '<span class="grow"></span>' +
            '<span class="cc" title="Character count">' + chars + ' chars</span>' +
            '<button class="copy" type="button">Copy post</button>' +
          '</div>'
        : '<p class="nobody">No text on this entry.</p>');

    if (e.body) {
      var body = el.querySelector(".body");
      var more = el.querySelector(".more");
      requestAnimationFrame(function(){
        if (body.scrollHeight <= body.clientHeight + 4) more.style.display = "none";
      });
      more.addEventListener("click", function(){
        body.classList.toggle("clamp");
        more.textContent = body.classList.contains("clamp") ? "Show full" : "Show less";
      });
      el.querySelector(".copy").addEventListener("click", function(){
        navigator.clipboard.writeText(e.body).then(function(){ toast("Copied ENTRY " + e.num + " — paste it straight in"); },
          function(){ toast("Copy failed — select the text manually"); });
      });
    }
    return el;
  }

  function render() {
    var term = state.term.trim().toLowerCase();
    var rows = DATA.filter(function(e){
      if (state.filter !== "all" && e.status !== state.filter) return false;
      if (term && (e.title + " " + (e.body||"")).toLowerCase().indexOf(term) === -1) return false;
      return true;
    });
    list.innerHTML = "";
    rows.forEach(function(e){ list.appendChild(card(e)); });
    empty.hidden = rows.length !== 0;
  }

  var toastEl = document.getElementById("toast"), tt;
  function toast(msg){ toastEl.textContent = msg; toastEl.classList.add("on"); clearTimeout(tt); tt = setTimeout(function(){ toastEl.classList.remove("on"); }, 2200); }

  document.getElementById("filters").addEventListener("click", function(ev){
    var b = ev.target.closest(".pill"); if (!b) return;
    document.querySelectorAll(".pill").forEach(function(p){ p.classList.remove("active"); });
    b.classList.add("active"); state.filter = b.dataset.f; render();
  });
  q.addEventListener("input", function(){ state.term = q.value; render(); });

  var root = document.documentElement, tbtn = document.getElementById("theme");
  tbtn.addEventListener("click", function(){
    var dark = root.getAttribute("data-theme") === "dark"
      || (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    root.setAttribute("data-theme", dark ? "light" : "dark");
  });

  render();
})();
</script>`;

const styles = fs.readFileSync(CSS, 'utf8');
fs.writeFileSync(OUT, '<style>\n' + styles + '\n</style>\n' + html);
console.log('wrote', path.relative(ROOT, OUT), fs.statSync(OUT).size, 'bytes —', data.length, 'entries', JSON.stringify(counts));
