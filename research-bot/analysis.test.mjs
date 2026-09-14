import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { normalizeAnalysis, pendingAnalysis } from './analysis-contract.mjs';
import { loadPositioningContext } from './context/positioning.mjs';
import { buildNote } from './note-builder.mjs';
import { formatTelegramReply } from './reply-format.mjs';

const temp=mkdtempSync(join(tmpdir(),'research-contract-'));
// Prevent tests from reading any real bot credentials or using paid providers.
writeFileSync(join(temp,'test.env'),'');
process.env.RESEARCH_ENV=join(temp,'test.env');
process.env.RESEARCH_ALLOW_PAID='0';
const { analyzeContent }=await import('./analyzer.mjs');
process.on('exit',()=>rmSync(temp,{recursive:true,force:true}));
const context={version:'test-current',commit:'123',text:'Keep internal research; do not force a public campaign.'};
const extracted={title:'Internal tool',content:'This repository provides a hand-drawn gallery and reusable visual prompts. It contains examples for internal design exploration, with no claim that a public campaign or paid product is ready.'};
const raw={summary:'The repository contains a hand-drawn gallery and reusable visual prompts.',reasoning:'Useful for internal design exploration, with public use still undecided.',highlights:['A visual gallery is included.'],sourceQuality:'primary',evidence:['hand-drawn gallery and reusable visual prompts'],riskFlags:[],projectFit:[{project:'internal-research',fit:'useful',reason:'Reusable design reference.',sourceExcerpt:'examples for internal design exploration',possibleUse:'Explore styles for an internal prototype.'}]};

test('useful internal research is retained without numeric score or public approval',()=>{
  const a=normalizeAnalysis(raw,'test',extracted,'github',context);
  assert.equal(a.projectFit[0].fit,'useful');assert.equal(a.relevance,null);assert.equal(a.publicEligibility,'unassessed');assert.equal(a.analysisStatus,'draft');assert.equal(a.contextCommit,'123');
});
test('template echoes and invented receipts are rejected',()=>{
  assert.throws(()=>normalizeAnalysis({...raw,summary:'2-4 factual sentences'},'test',extracted,'article',context),/template/);
  assert.throws(()=>normalizeAnalysis({...raw,evidence:['A nonexistent scientific claim']},'test',extracted,'article',context),/Evidence/);
});
test('unknown or duplicate project assessments are rejected',()=>{
  assert.throws(()=>normalizeAnalysis({...raw,projectFit:[{...raw.projectFit[0],project:'invented-brand'}]},'test',extracted,'github',context),/Invalid project/);
  assert.throws(()=>normalizeAnalysis({...raw,projectFit:[...raw.projectFit,...raw.projectFit]},'test',extracted,'github',context),/Duplicate/);
});
test('provider failures preserve capture and never fall through to paid',async()=>{
  let paid=0;const fail=async()=>{throw new Error('unavailable');};
  const a=await analyzeContent(extracted,'github',{loadContext:()=>context,agentOS:fail,groq:fail,haiku:async()=>{paid++;return raw;}});
  assert.equal(a.relevance,null);assert.equal(a.analysisStatus,'needs_analysis');assert.equal(a.captureStatus,'captured');assert.equal(paid,0);
  const note=buildNote(extracted,a,'github','https://example.org/repo');assert(note.includes('relevance: null'));assert(note.includes(extracted.content));assert(!note.includes('Low_Relevance'));
});
test('invalid first provider falls back to valid source-grounded analysis',async()=>{
  const a=await analyzeContent(extracted,'github',{loadContext:()=>context,agentOS:async()=>({...raw,summary:'2-4 factual sentences'}),groq:async()=>raw});
  assert.equal(a.analysisStatus,'draft');assert.equal(a.summary,raw.summary);
});
test('missing context and thin extract do not invoke providers',async()=>{
  let calls=0;const provider=async()=>{calls++;return raw;};
  const a=await analyzeContent(extracted,'github',{loadContext:()=>{throw new Error('missing');},agentOS:provider});
  assert.equal(a.contextVersion,'unavailable');assert.equal(a.captureStatus,'captured');
  const b=await analyzeContent({title:'link',content:'https://example.org'},'article',{loadContext:()=>context,agentOS:provider});
  assert.equal(b.captureStatus,'partial');assert.equal(calls,0);
});
test('missing context directory fails closed',()=>assert.throws(()=>loadPositioningContext(join(temp,'missing'))));
test('reply names confirmed storage, escapes HTML, and does not leak source query',()=>{
  const text=formatTelegramReply({...pendingAnalysis('waiting'),summary:'<b>untrusted</b>'},'article','https://example.org/?token=private','note.md');
  assert(text.includes('Saved to GitHub'));assert(text.includes('&lt;b&gt;'));assert(!text.includes('Saved to Obsidian'));assert(!text.includes('private'));assert(!text.includes('/10'));
});

test('context loads committed approved files and rejects altered source or manifest',()=>{
  const dir=mkdtempSync(join(temp,'context-'));
  const names=['positioning.md','research-policy.md','sources.md'];
  const manifest={context_version:'fixture',active_files:names,sha256:{}};
  for(const name of names){
    const value=`Approved context for ${name}`;
    writeFileSync(join(dir,name),value);
    manifest.sha256[name]=createHash('sha256').update(value).digest('hex');
  }
  const manifestPath=join(dir,'current-context.json');
  writeFileSync(manifestPath,JSON.stringify(manifest));
  const git=(...args)=>execFileSync('git',['-C',dir,...args],{encoding:'utf8',stdio:['ignore','pipe','pipe']});
  git('init');git('add','.');
  git('-c','user.name=Offline Test','-c','user.email=test@example.invalid','-c','commit.gpgsign=false','commit','-m','fixture');
  assert.equal(loadPositioningContext(dir).version,'fixture');
  writeFileSync(join(dir,names[0]),'Unapproved replacement');
  assert.throws(()=>loadPositioningContext(dir),/hash mismatch/);
  git('checkout','--',names[0]);
  writeFileSync(manifestPath,JSON.stringify({...manifest,context_version:'uncommitted'}));
  assert.throws(()=>loadPositioningContext(dir),/uncommitted/);
});

test('Groq GPT-OSS request reserves output budget and rejects truncated JSON',async()=>{
  const {config}=await import('./config.mjs');
  const oldModel=config.groqModel,oldKey=config.groqKey,oldFetch=globalThis.fetch;
  config.groqModel='openai/gpt-oss-20b';config.groqKey='offline-test-key';
  let request;
  try {
    globalThis.fetch=async(url,options)=>{request=JSON.parse(options.body);return {ok:true,json:async()=>({choices:[{finish_reason:'length',message:{content:JSON.stringify(raw)}}]})};};
    const result=await analyzeContent(extracted,'github',{loadContext:()=>context,agentOS:async()=>{throw new Error('offline');}});
    assert.equal(request.reasoning_effort,'low');assert.equal(request.max_completion_tokens,3500);
    assert.equal(result.analysisStatus,'needs_analysis');
    globalThis.fetch=async()=>({ok:true,json:async()=>({choices:[{finish_reason:'stop',message:{content:JSON.stringify(raw)}}]})});
    const valid=await analyzeContent(extracted,'github',{loadContext:()=>context,agentOS:async()=>{throw new Error('offline');}});
    assert.equal(valid.analysisStatus,'draft');
  } finally {config.groqModel=oldModel;config.groqKey=oldKey;globalThis.fetch=oldFetch;}
});
