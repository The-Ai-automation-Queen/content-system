#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const file=path.join(ROOT,'main-site','quiz.html');
if(!fs.existsSync(file))process.exit(0);
let h=fs.readFileSync(file,'utf8');
h=h.replace("qArea.textContent = 'Part ' + (['content','leads','ops','brain'].indexOf(q.area) + 1) + ' of 4 · ' + AREAS[q.area];","qArea.textContent = 'Question ' + (current + 1) + ' of ' + QUESTIONS.length + ' · ' + AREAS[q.area];");
h=h.replace('<div class="r-hours" id="r-hours">0h</div>\n    <div class="r-hours-label">leaking per week &middot; <span id="r-yearly"></span> per year</div>','<div class="r-hours" id="r-hours">01</div>\n    <div class="r-hours-label">recommended first capability</div>');
const resultFn=`  function showResult(){
    var byArea = { research:0, content:0, customer:0, ops:0, knowledge:0 };
    var maxByArea = { research:0, content:0, customer:0, ops:0, knowledge:0 };
    QUESTIONS.forEach(function(q, idx){
      var score=q.opts[answers[idx]].hrs;
      byArea[q.area]+=score;
      maxByArea[q.area]+=q.opts[0].hrs;
    });
    var worst=Object.keys(byArea).reduce(function(a,b){return byArea[b]>byArea[a]?b:a;});
    document.getElementById('r-hours').textContent='01';
    var type=TYPES[0];
    document.getElementById('r-type').textContent=CTAS[worst].title.replace('Start with ','').replace('.','');
    document.getElementById('r-desc').textContent=CTAS[worst].desc;
    var bars=document.getElementById('r-bars');
    bars.innerHTML='';
    Object.keys(byArea).forEach(function(area){
      var row=document.createElement('div');
      row.className='r-bar-row'+(area===worst?' worst':'');
      var pct=maxByArea[area]?Math.round(byArea[area]/maxByArea[area]*100):0;
      row.innerHTML='<span class="r-bar-name">'+AREAS[area]+'</span><div class="r-bar-track"><div class="r-bar-fill" style="width:'+pct+'%"></div></div><span class="r-bar-val">'+pct+'%</span>';
      bars.appendChild(row);
    });
    var cta=CTAS[worst];
    document.getElementById('cta-title').textContent=cta.title;
    document.getElementById('cta-desc').textContent=cta.desc;
    var link=document.getElementById('cta-link');link.href=cta.href;link.textContent=cta.label;
    result.dataset.type=AREAS[worst];
    result.dataset.worst=worst;
    result.dataset.total='first-build';
    show(result);
  }`;
h=h.replace(/  function showResult\(\)\{[\s\S]*?\n  \}\n\n  document\.getElementById\('start-btn'\)/,resultFn+"\n\n  document.getElementById('start-btn')");
h=h.replace("source: 'time-audit',","source: 'first-build-diagnostic',").replace("hoursLeaked: result.dataset.total || '',","firstBuild: result.dataset.type || '',");
fs.writeFileSync(file,h);
console.log('Updated first-build quiz result logic.');