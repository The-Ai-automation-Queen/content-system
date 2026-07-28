import test from 'node:test';
import assert from 'node:assert/strict';
import {
  enforceEditorialContract,
  isCurrentEditorialCard,
  validateDraft,
  validateFacts
} from './editorial-contract.mjs';

function sourceText(seed) {
  return (seed + ' ').repeat(Math.ceil(3600 / (seed.length + 1)));
}

function facts(overrides) {
  return Object.assign({
    what_happened: ['Acme released a usage report in Acme Console.'],
    entities: ['Acme', 'Acme Console', 'Usage Report'],
    dates_and_deadlines: [],
    affected_audiences: ['Acme workspace administrators'],
    evidence: [{
      id: 'e1',
      claim: 'Acme workspace administrators can open the usage report.',
      source_text: 'Workspace administrators can open Acme Console and check the Usage Report.'
    }],
    unknowns: [],
    content_complete: true,
    source_confidence: 'high'
  }, overrides || {});
}

function draft(overrides) {
  return Object.assign({
    category: 'Tools',
    headline: 'Acme adds a workspace usage report',
    narrative: 'Acme released a usage report for workspace administrators. It shows account activity in Acme Console.',
    verdict: 'ACT',
    applies_to: ['Acme workspace administrators'],
    reason: 'The report is available now and can reveal unused access.',
    trigger: null,
    action: 'Check the Acme Console Usage Report',
    evidence_ids: ['e1'],
    confidence: 0.92,
    verification_warning: null,
    topics: ['Acme', 'Usage']
  }, overrides || {});
}

function item(content, complete) {
  return {
    title: 'Acme adds a usage report',
    sourceName: 'Acme',
    content: content,
    content_complete: complete !== false,
    url: 'https://example.com/acme'
  };
}

function verification(decision, overrides) {
  return Object.assign({
    decision: decision || 'PASS',
    reasons: ['Evidence IDs and audience checked'],
    unsupported_claims: [],
    recommended_verdict: null,
    recommended_trigger: null
  }, overrides || {});
}

test('valid evidence and draft pass schema checks', function () {
  assert.deepEqual(validateFacts(facts()), { ok: true });
  assert.deepEqual(validateDraft(draft(), facts()), { ok: true });
});

test('a source-supported, low-risk ACT survives the contract', function () {
  var result = enforceEditorialContract(
    draft(),
    facts(),
    item(sourceText('Acme Console Usage Report workspace administrators can check account activity')),
    verification('PASS')
  );

  assert.equal(result.ok, true);
  assert.equal(result.card.verdict, 'ACT');
  assert.equal(result.card.editorial_contract_version, 2);
  assert.equal(result.card.verification.verified_verdict, 'ACT');
});

test('a named recommendation absent from the source is demoted', function () {
  var result = enforceEditorialContract(
    draft({ action: 'Check the HubSpot AI Visibility score for your brand' }),
    facts(),
    item(sourceText('Acme published a report about cloud capacity rationing')),
    verification('PASS')
  );

  assert.equal(result.ok, true);
  assert.equal(result.card.verdict, 'WATCH');
  assert.equal(result.card._demoted_from, 'ACT');
  assert.match(result.card.verification_warning, /not supported/i);
});

test('high-risk ACT is demoted even when the source contains its terms', function () {
  var highRiskFacts = facts({
    what_happened: ['Acme described a privacy control.'],
    evidence: [{
      id: 'e1',
      claim: 'Acme described a data-sharing control.',
      source_text: 'Administrators can disable data sharing in Acme Privacy Settings.'
    }]
  });
  var result = enforceEditorialContract(
    draft({
      category: 'Privacy',
      action: 'Disable data sharing in Acme Privacy Settings',
      evidence_ids: ['e1']
    }),
    highRiskFacts,
    item(sourceText('Administrators can disable data sharing in Acme Privacy Settings')),
    verification('PASS')
  );

  assert.equal(result.ok, true);
  assert.equal(result.card.verdict, 'WATCH');
  assert.match(result.card.verification_warning, /high-risk/i);
});

test('ACT from an incomplete article is demoted', function () {
  var result = enforceEditorialContract(
    draft(),
    facts({ content_complete: false, source_confidence: 'medium' }),
    item('Short RSS summary', false),
    verification('PASS')
  );

  assert.equal(result.ok, true);
  assert.equal(result.card.verdict, 'WATCH');
  assert.match(result.card.verification_warning, /complete article/i);
});

test('verifier HOLD prevents a card from entering the queue', function () {
  var result = enforceEditorialContract(
    draft(),
    facts(),
    item(sourceText('Acme Console Usage Report workspace administrators can check')),
    verification('HOLD', { reasons: ['The summary invents a deadline'] })
  );

  assert.equal(result.ok, false);
  assert.match(result.reason, /hold/i);
});

test('incomplete IGNORE is converted to WATCH', function () {
  var ignoreDraft = draft({
    verdict: 'IGNORE',
    action: null,
    reason: 'The announcement contains no shipped product or availability change.',
    confidence: 0.7
  });
  var result = enforceEditorialContract(
    ignoreDraft,
    facts({ content_complete: false, source_confidence: 'medium' }),
    item('Short promotional text', false),
    verification('PASS')
  );

  assert.equal(result.ok, true);
  assert.equal(result.card.verdict, 'WATCH');
  assert.ok(result.card.trigger);
});

test('legacy cards are not current editorial cards', function () {
  assert.equal(isCurrentEditorialCard({ verdict: 'ACT' }), false);
  assert.equal(isCurrentEditorialCard({ editorial_contract_version: 2 }), true);
});
