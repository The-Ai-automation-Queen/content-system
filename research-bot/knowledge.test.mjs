import test from 'node:test';
import assert from 'node:assert/strict';
import {capture,retrieve} from './knowledge.mjs';
const text='# Example\n\n## Summary\nOld invented summary about corporate escape.\n\n## Full Content\n> Original source: People can compare visual treatments before creating a prototype. This example discusses reusable design references and says nothing about an active public campaign or an offer.';
test('retrieval uses original text instead of legacy summary',()=>{const c=capture(text,'example.md');assert(!c.content.includes('corporate escape'));assert.equal(retrieve([c],'corporate escape').length,0);assert.equal(retrieve([c],'visual treatments').length,1);});
test('missing original capture cannot become a research receipt',()=>{assert.equal(capture('# Test\n## Summary\nA confident old summary','x.md'),null)});
test('source identity changes when original text changes',()=>{assert.notEqual(capture(text,'x.md').id,capture(text+' Different evidence.','x.md').id)});
