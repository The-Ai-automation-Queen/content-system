#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAIN = path.join(ROOT, 'main-site');
const INDEX = path.join(MAIN, 'guides', 'index.html');

function patchFile(rel, fn){
  const p = path.join(MAIN, rel);
  let html = fs.readFileSync(p, 'utf8');
  const next = fn(html);
  if(next !== html){ fs.writeFileSync(p, next); console.log('guide-cover', rel); }
}

// Load the cover system after the existing guides layout CSS.
let index = fs.readFileSync(INDEX, 'utf8');
if(!index.includes('/assets/pages/guides-cover-system.css')){
  index = index.replace('</head>', '<link rel="stylesheet" href="/assets/pages/guides-cover-system.css?v=20260810b">\n</head>');
}

const cards = {
  'ai-jargon-guide.html': {
    title: 'Understand the AI terms you actually need',
    cover: 'UNDERSTAND AI TERMS',
    label: 'UNDERSTAND AI',
    highlight: 'NO JARGON',
    mascot: '/assets/mascot/explaining.png'
  },
  'what-is-a-prompt.html': {
    title: 'Write prompts that get better results',
    cover: 'WRITE BETTER PROMPTS',
    label: 'USE AI BETTER',
    highlight: 'CLEAR BRIEFS WIN',
    mascot: '/assets/mascot/pointing-right.png'
  },
  'what-is-agentic.html': {
    title: 'Understand what AI agents can actually do',
    cover: 'UNDERSTAND AI AGENTS',
    label: 'UNDERSTAND AI',
    highlight: 'AUTONOMY, EXPLAINED',
    mascot: '/assets/mascot/planning.png'
  },
  'what-is-ai.html': {
    title: 'Understand AI in 5 minutes',
    cover: 'UNDERSTAND AI IN 5 MINUTES',
    label: 'START HERE',
    highlight: 'PLAIN ENGLISH',
    mascot: '/assets/mascot/celebrating-lightbulb.png'
  },
  'chatgpt.html': {
    title: 'Use ChatGPT for everyday business work',
    cover: 'USE CHATGPT FOR EVERYDAY WORK',
    label: 'CHOOSE YOUR AI',
    highlight: 'GENERALIST PICK',
    mascot: '/assets/mascot/hero-seated.png'
  },
  'claude.html': {
    title: 'Use Claude for complex work and long documents',
    cover: 'HANDLE COMPLEX WORK WITH CLAUDE',
    label: 'CHOOSE YOUR AI',
    highlight: 'LONG CONTEXT',
    mascot: '/assets/mascot/explaining.png'
  },
  'copilot.html': {
    title: 'Use Copilot inside Word, Excel and Outlook',
    cover: 'WORK FASTER IN MICROSOFT 365',
    label: 'CHOOSE YOUR AI',
    highlight: 'WORD · EXCEL · OUTLOOK',
    mascot: '/assets/mascot/pointing-right.png'
  },
  'gemini.html': {
    title: 'Use Gemini with Gmail, Drive and your business files',
    cover: 'USE GEMINI WITH YOUR GOOGLE WORK',
    label: 'CHOOSE YOUR AI',
    highlight: 'GMAIL · DRIVE · DOCS',
    mascot: '/assets/mascot/planning.png'
  },
  '24-7-operations-system.html': {
    title: 'Keep routine work moving while you are offline',
    cover: 'KEEP WORK MOVING 24/7',
    label: 'AUTOMATE',
    highlight: 'WITHOUT STAYING ONLINE',
    mascot: '/assets/mascot/hero-seated.png'
  },
  'first-ai-employee.html': {
    title: 'Build your first AI assistant',
    cover: 'BUILD YOUR FIRST AI ASSISTANT',
    label: 'BUILD AI HELP',
    highlight: 'ONE JOB FIRST',
    mascot: '/assets/mascot/celebrating-lightbulb.png'
  },
  'follow-up-setup.html': {
    title: 'Follow up with leads without doing it manually',
    cover: 'FOLLOW UP WITHOUT CHASING',
    label: 'SELL WITH AI',
    highlight: 'CONSISTENT FOLLOW-UP',
    mascot: '/assets/mascot/pointing-right.png'
  },
  'inbox-manager-setup.html': {
    title: 'Save time by letting AI organise your inbox',
    cover: 'SAVE TIME ON EMAIL',
    label: 'SAVE TIME',
    highlight: 'YOU KEEP SEND',
    mascot: '/assets/mascot/email-sorting.png'
  },
  'stack-3-tool-ai-stack.html': {
    title: 'Choose a simple AI stack for your business',
    cover: 'CHOOSE A SIMPLE AI STACK',
    label: 'CHOOSE YOUR AI',
    highlight: '3 TOOLS. 3 JOBS.',
    mascot: '/assets/mascot/planning.png'
  }
};

for(const [href, meta] of Object.entries(cards)){
  const escaped = href.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const re = new RegExp(`<a class="card" href="${escaped}">[\\s\\S]*?<div class="card-body">[\\s\\S]*?<p class="card-kicker mono">([^<]+)<\\/p>[\\s\\S]*?<h3>[\\s\\S]*?<\\/h3>`, 'm');
  index = index.replace(re, (m, kicker) => {
    const imageAlt = `Guide cover: ${meta.title}`;
    const cover = `<a class="card" href="${href}">\n        <div class="guide-cover" role="img" aria-label="${imageAlt}">\n          <div class="guide-cover-copy">\n            <p class="guide-cover-label">${meta.label}</p>\n            <p class="guide-cover-title">${meta.cover}</p>\n            <span class="guide-cover-highlight">${meta.highlight}</span>\n          </div>\n          <div class="guide-cover-mascot"><img src="${meta.mascot}" alt="" loading="lazy" decoding="async"></div>\n        </div>\n        <div class="card-body">\n          <p class="card-kicker mono">${kicker}</p>\n          <h3>${meta.title}</h3>`;
    return m.replace(/^<a class="card"[\s\S]*?<h3>[\s\S]*?<\/h3>/m, cover);
  });
}

fs.writeFileSync(INDEX, index);

const pageTitles = {
  'guides/what-is-ai.html': 'Understand AI in 5 minutes',
  'guides/what-is-a-prompt.html': 'Write prompts that get better results',
  'guides/what-is-agentic.html': 'Understand what AI agents can actually do',
  'guides/ai-jargon-guide.html': 'Understand the AI terms you actually need',
  'guides/chatgpt.html': 'Use ChatGPT for everyday business work',
  'guides/claude.html': 'Use Claude for complex work and long documents',
  'guides/copilot.html': 'Use Copilot inside Word, Excel and Outlook',
  'guides/gemini.html': 'Use Gemini with Gmail, Drive and your business files',
  'guides/24-7-operations-system.html': 'Keep routine work moving while you are offline',
  'guides/first-ai-employee.html': 'Build your first AI assistant',
  'guides/follow-up-setup.html': 'Follow up with leads without doing it manually',
  'guides/inbox-manager-setup.html': 'Save time by letting AI organise your inbox',
  'guides/stack-3-tool-ai-stack.html': 'Choose a simple AI stack for your business'
};

for(const [rel, title] of Object.entries(pageTitles)){
  patchFile(rel, html => html.replace(/<header class="guide-hero">([\s\S]*?)<h1>[\s\S]*?<\/h1>/m, (m, before) => `<header class="guide-hero">${before}<h1>${title}</h1>`));
}

console.log('Applied outcome-first guide titles and unified covers.');
