#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const publication = JSON.parse(read("data/guide-publication.json"));
const rebuildPlan = JSON.parse(read("data/guide-rebuild-plan.json"));
const preview = JSON.parse(read("data/guide-preview.json"));
const inventory = JSON.parse(read("next-app/content/guides.json")).guides;
const modelSeriesSource = read("next-app/content/model-guide-series.ts");
const researchSeriesSource = read("next-app/content/research-guide-series.ts");
const pageSource = [
  read("next-app/content/guide-page.ts"),
  read("next-app/content/tool-guide-batch.ts"),
  read("next-app/content/guide-batch-three.ts"),
  read("next-app/content/guide-batch-26-35-pages.ts"),
  read("next-app/content/claude-series.ts"),
  read("next-app/content/instagram-dashboard-guide.ts"),
  modelSeriesSource,
  researchSeriesSource,
].join("\n");
const guidePageSource = read("next-app/content/guide-page.ts");
const librarySource = read("next-app/content/guides.ts");
const libraryUiSource = read("next-app/components/guides/guide-library.tsx");
const libraryPageSource = read("next-app/app/guides/page.tsx");
const headerSource = read("next-app/components/chrome/site-header.tsx");
const globalStyles = read("next-app/app/globals.css");
const footerSource = read("next-app/components/chrome/site-footer.tsx");
const guideAccessSource = read("next-app/components/guides/guide-access-boundary.tsx");
const guideRouteSource = read("next-app/app/guides/[slug]/page.tsx");
const legacyGuideSlugsSource = read("next-app/content/legacy-guide-slugs.ts");
const guideFormatsSource = read("next-app/content/guide-formats.ts");
const guideComponentDir = path.join(root, "next-app/components/guides");
const activeGuideStyles = fs.readdirSync(guideComponentDir)
  .filter((name) => name.endsWith("-page.module.css") && name !== "guide-reading-page.module.css")
  .map((name) => [name, fs.readFileSync(path.join(guideComponentDir, name), "utf8")]);
const readerFacingGuideSources = fs.readdirSync(guideComponentDir)
  .filter((name) => name.endsWith(".tsx"))
  .map((name) => [name, fs.readFileSync(path.join(guideComponentDir, name), "utf8")]);
const guideCaptureApi = read("main-site/api/guide-capture.js");
const guidesIndex = read("main-site/guides/index.html");
const workWithFatiha = read("main-site/work-with-fatiha/index.html");
const vercelConfig = JSON.parse(read("main-site/vercel.json"));
const failures = [];

const approved = publication.approved ?? [];
const parkedPending = new Set((publication.parkedPending ?? []).map((guide) => guide.slug));
const inventoryReviewStatus = new Map(inventory.map((guide) => [guide.slug, guide.reviewStatus]));
for (const [group, expected] of [["approved", "published"], ["heldForReview", "page review"], ["parkedPending", "parked"]]) {
  for (const guide of publication[group] ?? []) {
    if (inventoryReviewStatus.get(guide.slug) !== expected) {
      failures.push(`Inventory editorial status differs from publication registry: ${guide.slug} should be ${expected}`);
    }
  }
}
const slugs = approved.map((guide) => guide.slug);
const inventorySlugs = new Set(inventory.map((guide) => guide.slug));
const approvedSlugSet = new Set(slugs);
const relatedSelectionSource = guidePageSource.match(/export const approvedRelatedSelections:[\s\S]*?= \{([\s\S]*?)\n\};/)?.[1] ?? "";
const approvedRelatedSelections = new Map([...relatedSelectionSource.matchAll(/^\s*"([a-z0-9-]+)": \[([^\]]+)\],?$/gm)]
  .map((match) => [match[1], [...match[2].matchAll(/"([a-z0-9-]+)"/g)].map((item) => item[1])]));
for (const slug of slugs) {
  const related = approvedRelatedSelections.get(slug);
  if (!related || related.length !== 3 || new Set(related).size !== 3 || related.includes(slug) || related.some((item) => !approvedSlugSet.has(item))) {
    failures.push(`Approved guide needs three distinct, approved next-guide links: ${slug}`);
  }
}
const rebuildStatuses = new Set(["approved", "review", "pending"]);
const rebuildSlugs = rebuildPlan.guides.map((guide) => guide.slug);
const rebuildCounts = Object.fromEntries([...rebuildStatuses].map((status) => [status, rebuildPlan.guides.filter((guide) => guide.status === status).length]));
const reviewGuides = inventory.filter((guide) => guide.reviewStatus === "page review" && !approvedSlugSet.has(guide.slug));
const previewBySlug = new Map((preview.guides ?? []).map((guide) => [guide.slug, guide]));
const hasStructuredSlug = (slug) => pageSource.includes(`slug: "${slug}"`) || pageSource.includes(`"slug": "${slug}"`);

if (publication.schemaVersion !== 1) failures.push("Unsupported guide publication schema version.");
if (!approved.length) failures.push("The publication registry has no approved guides.");
if (new Set(slugs).size !== slugs.length) failures.push("The publication registry contains a duplicate slug.");
if (new Set(rebuildSlugs).size !== rebuildSlugs.length) failures.push("The guide rebuild plan contains a duplicate slug.");
for (const guide of rebuildPlan.guides) {
  const correctlyListed = (guide.status === "approved" && approvedSlugSet.has(guide.slug)) ||
    (guide.status === "review" && previewBySlug.has(guide.slug)) ||
    (guide.status === "pending" && parkedPending.has(guide.slug));
  if (!correctlyListed) failures.push(`Rebuild plan guide has no matching approved, review or parked listing: ${guide.slug}`);
  if (!rebuildStatuses.has(guide.status)) failures.push(`Rebuild plan guide has an invalid status: ${guide.slug}`);
}
for (const slug of slugs) {
  if (!rebuildSlugs.includes(slug)) failures.push(`Publication registry guide is missing from the rebuild plan: ${slug}`);
}

for (const guide of approved) {
  if (!inventorySlugs.has(guide.slug)) failures.push(`Approved guide is missing from inventory: ${guide.slug}`);
  if (!hasStructuredSlug(guide.slug)) failures.push(`Approved guide has no structured page: ${guide.slug}`);
  if (!guide.section || !Number.isFinite(guide.journeyOrder)) failures.push(`Approved guide needs a section and journeyOrder: ${guide.slug}`);
  if (!/^guide-[a-z0-9-]+$/.test(guide.lumailTag || "")) failures.push(`Approved guide has no Lumail tag mapping: ${guide.slug}`);
  const hasLiteralTag = pageSource.includes(`lumailTag: "${guide.lumailTag}"`) || pageSource.includes(`"lumailTag": "${guide.lumailTag}"`);
  const hasSeriesTag = guide.lumailTag === `guide-${guide.slug}` &&
    (modelSeriesSource.includes(`slug: "${guide.slug}"`) || researchSeriesSource.includes(`slug: "${guide.slug}"`));
  if (!hasLiteralTag && !hasSeriesTag) failures.push(`Approved guide Lumail tag differs from its structured page: ${guide.slug}`);
}

const mappedFormats = new Set([...guideFormatsSource.matchAll(/(?:"([a-z0-9-]+)"|\b([a-z0-9-]+)):\s*"(?:explorer|glossary|decision|walkthrough|prompt-builder|practice|audit)"/g)].map((match) => match[1] || match[2]));
const customExperiences = new Set(["instagram-content-dashboard", "claude-projects", "chatgpt-screen-recording-to-process-guide"]);
for (const slug of slugs) {
  if (!mappedFormats.has(slug) && !customExperiences.has(slug)) {
    failures.push(`Approved guide lacks an interactive route: ${slug}`);
  }
}

for (const guide of reviewGuides) {
  const previewGuide = previewBySlug.get(guide.slug);
  if (!previewGuide) failures.push(`Review guide is missing from the preview email allowlist: ${guide.slug}`);
  if (previewGuide && !/^guide-[a-z0-9-]+$/.test(previewGuide.lumailTag || "")) {
    failures.push(`Review guide has no valid preview Lumail tag: ${guide.slug}`);
  }
  if (previewGuide && !hasStructuredSlug(guide.slug)) {
    failures.push(`Review guide has no structured page: ${guide.slug}`);
  }
}

const structuredCovers = new Set([...pageSource.matchAll(/cover:\s*["']([^"']+)["']/g)].map((match) => match[1]));
for (const match of `${modelSeriesSource}\n${researchSeriesSource}`.matchAll(/^\s*slug:\s*"([^"]+)"/gm)) {
  structuredCovers.add(`/images/guides/${match[1]}.webp`);
}
for (const cover of structuredCovers) {
  if (!/\.webp$/i.test(cover)) {
    failures.push(`Structured guide cover must use WebP: ${cover}`);
    continue;
  }
  const coverFile = path.join(root, "next-app", "public", cover.replace(/^\//, ""));
  if (!fs.existsSync(coverFile)) {
    failures.push(`Structured guide cover is missing: ${cover}`);
  } else if (fs.statSync(coverFile).size > 200 * 1024) {
    failures.push(`Structured guide cover exceeds 200 KB: ${cover}`);
  }
}

if (!guideCaptureApi.includes('require("../../data/guide-publication.json")')) {
  failures.push("Guide capture API does not read approved guide metadata from the publication registry.");
}
if (/const GUIDE_(?:TAGS|FILES)\s*=/.test(guideCaptureApi)) {
  failures.push("Guide capture API duplicates approved guide metadata.");
}

if (!guideAccessSource.includes('fetch("/api/guide-capture"')) {
  failures.push("The guide gate no longer submits to the server-side Lumail endpoint.");
}
const entryRouteSlugs = new Set([...guideRouteSource.matchAll(/if \(slug === "([^"]+)"\) return <GuideAccessBoundary\b[^\n]*variant="entry"[^\n]*<\/GuideAccessBoundary>;/g)].map((match) => match[1]));
const directRouteSlugs = new Set([...guideRouteSource.matchAll(/if \(slug === "([^"]+)"\) return <[A-Za-z]+Page guide=\{guide\} \/>;/g)].map((match) => match[1]));
for (const slug of slugs) {
  if (entryRouteSlugs.has(slug) || !directRouteSlugs.has(slug)) {
    failures.push(`Approved guide must open on its public teaching, with capture inside the page: ${slug}`);
  }
}
for (const guide of rebuildPlan.guides.filter((item) => item.status !== "pending")) {
  if (!entryRouteSlugs.has(guide.slug) && !directRouteSlugs.has(guide.slug)) failures.push(`Rebuilt guide lacks a dedicated Next.js page: ${guide.slug}`);
}
if (!guideAccessSource.includes('fetch("/api/guide-capture"') ||
    !guideAccessSource.includes('hidden={!ready || !unlocked}') ||
    !["firstName", "email", "marketingConsent"].every((field) => guideAccessSource.includes(`name="${field}"`))) {
  failures.push("The inline guide gate must unlock content after Lumail success and collect first name, email and optional marketing consent.");
}
if (!guideRouteSource.includes('if (slug === "instagram-content-dashboard") return <BatchGuidePage guide={guide} />;')) {
  failures.push("The Instagram guide must use the shared batch guide design.");
}
if (!guideRouteSource.includes("legacyGuideSlugs.has(slug)") ||
    !guideRouteSource.includes("needs an approved interactive Next.js composition") ||
    !legacyGuideSlugsSource.includes("Frozen migration allowlist")) {
  failures.push("New guides must not fall back to the legacy static article renderer.");
}
if (!libraryUiSource.includes('role="search"') || !libraryPageSource.includes("searchIndex={searchIndex}")) {
  failures.push("The guide library search must stay visible and index published guide content.");
}
for (const [name, styles] of activeGuideStyles) {
  if (/var\(--cream\)|(?:border-left|border-inline-start)\s*:/.test(styles)) {
    failures.push(`Rebuilt guide styling has returned to cream or decorative vertical lines: ${name}`);
  }
}
for (const [name, source] of [...readerFacingGuideSources, ["guide-library.tsx", libraryUiSource], ["guide content", pageSource]]) {
  if (/review mode|approved and unpublished|editorial (?:review|status)|internal (?:note|instruction)|\bLumail\b|Saadia Karam|guide builder/i.test(source)) {
    failures.push(`Remove production language from reader-facing guide copy: ${name}`);
  }
}

if (!librarySource.includes('import publication from "../../data/guide-publication.json"')) {
  failures.push("The public library is not controlled by the approval registry.");
}

const expectedNav = [
  ["Free guides", "/guides/"],
  ["Workbooks", "/workbooks.html"],
  ["About", "/about.html"],
];

for (const [label, href] of expectedNav) {
  if (!headerSource.includes(`"${label}", "${href}"`) && !headerSource.includes(`href="${href}">${label}`) && !headerSource.includes(`"${label}", "https://www.shiftandlead.com${href}"`)) {
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
if (!footerSource.includes('["Workbooks", "/workbooks.html"]') && !footerSource.includes('["Workbooks", "https://www.shiftandlead.com/workbooks.html"]')) {
  failures.push("The guide footer is missing Workbooks.");
}
if (!guidesIndex.includes('<link rel="canonical" href="https://www.shiftandlead.com/guides/"')) {
  failures.push("The deployable guide index does not declare the official /guides/ canonical URL.");
}
if (vercelConfig.outputDirectory !== ".") {
  failures.push("Vercel is not configured to serve the committed main-site directory.");
}
if (/AI Build Kit|Open the Starter Kit/i.test(workWithFatiha)) {
  failures.push("The retired AI Build Kit offer has returned to the Work with me page.");
}
if (!workWithFatiha.includes('href="/workbooks.html">Workbooks</a>')) {
  failures.push("The Work with me page is missing its Workbooks link.");
}
if (!workWithFatiha.includes('Business and marketing transformation')) {
  failures.push("The Work with me page is missing its current offer framing.");
}
for (const { source, destination } of vercelConfig.redirects) {
  const match = source.match(/^\/guides\/([a-z0-9-]+)(?:\/|\.html)?$/);
  if (match && approvedSlugSet.has(match[1]) && destination !== `/guides/${match[1]}/`) {
    failures.push(`Approved guide is redirected away from its own page: ${source} -> ${destination}`);
  }
}
if (!vercelConfig.redirects.some(({ source, destination }) => source === "/build-sprint.html" && destination === "/work-with-fatiha/")) {
  failures.push("The legacy Build Sprint URL must redirect to Work with me.");
}

if (failures.length) {
  console.error(`Guide framework validation failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Guide framework passed: ${approved.length} registry guides; editorial plan: ${rebuildCounts.approved} approved, ${rebuildCounts.review} in review, ${rebuildCounts.pending} pending; ${entryRouteSlugs.size} routes still need migration from the old opening gate.`);
