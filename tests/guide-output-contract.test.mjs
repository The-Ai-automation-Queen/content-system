import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publication = JSON.parse(fs.readFileSync(path.join(root, "data/guide-publication.json"), "utf8"));
const guideStyles = fs.readFileSync(path.join(root, "next-app", "components", "guides", "guide-reading-page.module.css"), "utf8");
const framework = fs.readFileSync(path.join(root, "docs", "GUIDE-PRODUCTION-FRAMEWORK.md"), "utf8");
const coverSkill = fs.readFileSync(path.join(root, "skills", "shift-lead-guide-covers", "SKILL.md"), "utf8");
const structuredGuideSource = ["guide-page.ts", "tool-guide-batch.ts", "guide-batch-three.ts"]
  .map((file) => fs.readFileSync(path.join(root, "next-app", "content", file), "utf8"))
  .join("\n");

function bodyWithoutScripts(html) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
  return body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

function requiredInput(body, name) {
  const input = body.match(new RegExp(`<input\\b[^>]*name="${name}"[^>]*>|<input\\b(?=[^>]*name="${name}")[^>]*>`, "i"))?.[0] ?? "";
  assert.match(input, /\brequired(?:="")?/i, `required ${name} field is missing`);
}

for (const guide of publication.approved) {
  test(`${guide.slug} renders the complete preview and capture contract`, () => {
    const file = path.join(root, "next-app", "out", "guides", guide.slug, "index.html");
    const html = fs.readFileSync(file, "utf8");
    const body = bodyWithoutScripts(html);

    assert.match(body, /<h1\b/i, "semantic H1 must be present before JavaScript runs");
    assert.match(body, /data-guide-preview/, "useful public preview marker is missing");
    assert.match(body, /data-guide-capture-boundary/, "inline capture boundary is missing");
    const gateTeaser = body.match(/<div\b(?=[^>]*data-guide-gate-teaser)[^>]*>/i)?.[0] ?? "";
    assert.match(gateTeaser, /aria-hidden="true"/i, "capture boundary must include an assistive-technology-hidden text teaser");
    assert.doesNotMatch(body, /I will also send practical Shift &amp; Lead emails\./, "redundant marketing sentence remains above consent");
    assert.equal((body.match(/practical Shift &amp; Lead emails/g) ?? []).length, 1, "email disclosure must appear once");
    const coverPath = body.match(/<img\b[^>]*src="(\/images\/guides\/[^"]+)"/i)?.[1] ?? "";
    assert.match(coverPath, /\.webp$/i, "guide cover must use WebP");
    const coverFile = path.join(root, "next-app", "public", coverPath);
    assert.ok(fs.statSync(coverFile).size <= 200 * 1024, "guide cover must not exceed 200 KB");
    const escapedCoverPath = coverPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(html, new RegExp(`<link\\b(?=[^>]*rel="preload")(?=[^>]*as="image")(?=[^>]*href="${escapedCoverPath}")[^>]*>`, "i"), "guide cover must be preloaded");
    const previewEnd = body.indexOf("data-guide-capture-boundary");
    const previewHeadingCount = (body.slice(0, previewEnd).match(/<h2\b/gi) ?? []).length;
    assert.ok(previewHeadingCount >= 2, "capture boundary appears before enough substantive guide sections");
    assert.match(body, /class="[^"]*guide-gated-content/, "gated content selector is missing");
    requiredInput(body, "firstName");
    requiredInput(body, "email");
    requiredInput(body, "consent");
    assert.match(html, /"isAccessibleForFree":false/, "restricted Article structured data is missing");
    assert.match(html, /"cssSelector":"\.guide-gated-content"/, "structured data does not identify the gated section");
  });
}

test("shared guide layout keeps a compact reading rhythm", () => {
  const sectionSpace = Number(guideStyles.match(/--guide-section-space:\s*(\d+)px/)?.[1]);
  const majorSpace = Number(guideStyles.match(/--guide-major-space:\s*(\d+)px/)?.[1]);
  assert.ok(sectionSpace > 0 && sectionSpace <= 48, "section spacing must stay at or below 48px");
  assert.ok(majorSpace > 0 && majorSpace <= 48, "major content spacing must stay at or below 48px");
  assert.match(guideStyles, /\.section\s*\{[^}]*var\(--guide-section-space\)/s, "sections must use the compact shared rhythm");
  assert.match(guideStyles, /\.answer\s*\{[^}]*var\(--guide-major-space\)/s, "answer block must use the compact shared rhythm");
});

test("guide hero aligns with the reading column", () => {
  assert.match(guideStyles, /\.shell\s*\{[^}]*width:\s*min\(calc\(100% - 48px\),\s*var\(--guide-body-width\)\)/s, "hero must use the guide body width");
});

test("shared guide headings use Sunset Orange as a restrained title and section marker", () => {
  assert.match(guideStyles, /--guide-heading-accent:\s*#FF5733\b/i, "shared guide accent must be Sunset Orange #FF5733");
  assert.match(
    guideStyles,
    /\.intro h1\s*\{[^}]*color:\s*var\(--guide-heading-accent\)/s,
    "guide H1 must use the shared accent",
  );
  assert.match(
    guideStyles,
    /\.section h2,\s*\.tryNow h2,\s*\.conclusion h2,\s*\.gateTeaser h2\s*\{[^}]*color:\s*var\(--ink\)[^}]*border-left:\s*4px solid var\(--guide-heading-accent\)[^}]*padding-left:\s*14px/s,
    "white-background major H2 headings must stay dark with a Sunset Orange marker",
  );
  assert.doesNotMatch(guideStyles, /(?:\.section|\.tryNow|\.conclusion|\.gateTeaser) h2[^{}]*\{[^}]*color:\s*var\(--guide-heading-accent\)/s, "H2 text must remain dark");
  assert.doesNotMatch(guideStyles, /h3[^{}]*\{[^}]*color:\s*var\(--guide-heading-accent\)/s, "H3 headings must remain dark");
  assert.doesNotMatch(guideStyles, /\.(?:answer|captureBoundary|paidNextStep|related) h2[^{}]*\{[^}]*color:\s*var\(--guide-heading-accent\)/s, "headings on tinted panels must remain dark");
  assert.match(framework, /Sunset Orange[^\n]*#FF5733[^\n]*(?:rule|marker)/i, "production framework must preserve the approved title-and-marker accent");
});

test("future guide production rules preserve the approved image and layout system", () => {
  for (const rule of ["920px", "1280px", "200 KB", "46px", "38px", "48px", "blur", "fade"]) {
    assert.ok(framework.includes(rule), `production framework must preserve the ${rule} rule`);
  }
  assert.match(framework, /after (?:all|every) explanatory (?:guide )?sections? and before (?:the )?[“\"]?Try it now/i, "production framework must keep the semantic gate position");
  assert.match(coverSkill, /public\/images\/guides\/<slug>\.webp/, "cover skill must save production WebP");
  assert.doesNotMatch(coverSkill, /public\/images\/guides\/<slug>\.png/, "cover skill must not direct production PNG output");
});

test("every structured current or upcoming guide cover meets the production asset rules", () => {
  const covers = new Set([...structuredGuideSource.matchAll(/cover:\s*["']([^"']+)["']/g)].map((match) => match[1]));
  assert.ok(covers.size > publication.approved.length - 1, "structured guide covers were not discovered");
  for (const cover of covers) {
    assert.match(cover, /\.webp$/i, `${cover} must use WebP`);
    const file = path.join(root, "next-app", "public", cover);
    assert.ok(fs.existsSync(file), `${cover} is missing`);
    assert.ok(fs.statSync(file).size <= 200 * 1024, `${cover} exceeds 200 KB`);
  }
});
