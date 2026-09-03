#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const publication = JSON.parse(read("data/guide-publication.json"));
const inventory = JSON.parse(read("next-app/content/guides.json")).guides;
const pageSource = [
  read("next-app/content/guide-page.ts"),
  read("next-app/content/tool-guide-batch.ts"),
  read("next-app/content/guide-batch-three.ts"),
].join("\n");
const librarySource = read("next-app/content/guides.ts");
const headerSource = read("next-app/components/chrome/site-header.tsx");
const globalStyles = read("next-app/app/globals.css");
const footerSource = read("next-app/components/chrome/site-footer.tsx");
const guideAccessSource = read("next-app/components/guides/guide-access-boundary.tsx");
const guideCaptureApi = read("main-site/api/guide-capture.js");
const guidesIndex = read("main-site/guides/index.html");
const buildSprint = read("main-site/build-sprint.html");
const sharedBrandSystem = read("shared/assets/brand-system.css");
const sharedDensitySystem = read("shared/assets/density-system.css");
const vercelConfig = JSON.parse(read("main-site/vercel.json"));
const failures = [];

const approved = publication.approved ?? [];
const slugs = approved.map((guide) => guide.slug);
const inventorySlugs = new Set(inventory.map((guide) => guide.slug));

if (publication.schemaVersion !== 1) failures.push("Unsupported guide publication schema version.");
if (!approved.length) failures.push("The publication registry has no approved guides.");
if (new Set(slugs).size !== slugs.length) failures.push("The publication registry contains a duplicate slug.");

for (const guide of approved) {
  if (!inventorySlugs.has(guide.slug)) failures.push(`Approved guide is missing from inventory: ${guide.slug}`);
  if (!pageSource.includes(`slug: "${guide.slug}"`)) failures.push(`Approved guide has no structured page: ${guide.slug}`);
  if (!guide.section || !Number.isFinite(guide.journeyOrder)) failures.push(`Approved guide needs a section and journeyOrder: ${guide.slug}`);
  if (!guideCaptureApi.includes(`"${guide.slug}": "guide-`)) failures.push(`Approved guide has no Lumail tag mapping: ${guide.slug}`);
}

if (!guideAccessSource.includes('fetch("/api/guide-capture"')) {
  failures.push("The guide gate no longer submits to the server-side Lumail endpoint.");
}
if (!guideAccessSource.includes("<GuideAccessBoundary") && !read("next-app/components/guides/guide-reading-page.tsx").includes("<GuideAccessBoundary")) {
  failures.push("Published guide pages are no longer protected by the shared email gate.");
}

if (!librarySource.includes('import publication from "../../data/guide-publication.json"')) {
  failures.push("The public library is not controlled by the approval registry.");
}

const expectedNav = [
  ["Guides", "/guides/"],
  ["Workbooks", "/workbooks.html"],
  ["About", "/about.html"],
];

for (const [label, href] of expectedNav) {
  if (!headerSource.includes(`"${label}", "${href}"`) && !headerSource.includes(`href="${href}">${label}`)) {
    failures.push(`Guide header is missing ${label} → ${href}`);
  }
}

if (!/\.wordmark\s*\{[^}]*font-weight:\s*400/.test(globalStyles)) {
  failures.push("The guide wordmark must use regular font weight.");
}

if (!/\.site-header nav\s*\{[^}]*font:\s*400\s+12px/.test(globalStyles)) {
  failures.push("The guide navigation must use regular font weight.");
}

if (/\bQuiz\b/.test(headerSource) || /\bQuiz\b/.test(footerSource)) {
  failures.push("The stale Quiz link has returned to the guide shell.");
}
if (!footerSource.includes('["Workbooks", "/workbooks.html"]')) {
  failures.push("The guide footer is missing Workbooks.");
}
if (!guidesIndex.includes('<link rel="canonical" href="https://www.shiftandlead.com/guides/"')) {
  failures.push("The deployable guide index does not declare the official /guides/ canonical URL.");
}
if (vercelConfig.outputDirectory !== ".") {
  failures.push("Vercel is not configured to serve the committed main-site directory.");
}
if (/AI Build Kit|Open the Starter Kit/i.test(buildSprint)) {
  failures.push("The retired AI Build Kit offer has returned to the Build Sprint page.");
}
if (!buildSprint.includes('href="/workbooks.html">Explore the workbooks</a>')) {
  failures.push("The Build Sprint fallback path is missing the current Workbooks offer.");
}
if (!buildSprint.includes('<span class="offer-accent">possible.</span>')) {
  failures.push("The Build Sprint hero is missing its approved electric-blue accent word.");
}
if (!sharedBrandSystem.includes('body[data-page-kind="build"] .offer-hero .offer-accent{color:var(--blue)!important}')) {
  failures.push("The Build Sprint accent word is no longer electric blue.");
}
if (/body\[data-page-kind="build"\] \.offer-hero\{[^}]*background:[^}]*(?:cream|var\(--blue\))/i.test(sharedDensitySystem)) {
  failures.push("The Build Sprint hero background must stay white; electric blue is reserved for the accent word.");
}

if (failures.length) {
  console.error(`Guide framework validation failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Guide framework passed: ${approved.length} explicitly approved guides.`);
