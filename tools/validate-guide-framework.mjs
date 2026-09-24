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
  read("next-app/content/claude-series.ts"),
  read("next-app/content/instagram-dashboard-guide.ts"),
  modelSeriesSource,
  researchSeriesSource,
].join("\n");
const librarySource = read("next-app/content/guides.ts");
const libraryUiSource = read("next-app/components/guides/guide-library.tsx");
const libraryPageSource = read("next-app/app/guides/page.tsx");
const headerSource = read("next-app/components/chrome/site-header.tsx");
const globalStyles = read("next-app/app/globals.css");
const footerSource = read("next-app/components/chrome/site-footer.tsx");
const guideAccessSource = read("next-app/components/guides/guide-access-boundary.tsx");
const guideReadingSource = read("next-app/components/guides/guide-reading-page.tsx");
const guideRouteSource = read("next-app/app/guides/[slug]/page.tsx");
const legacyGuideSlugsSource = read("next-app/content/legacy-guide-slugs.ts");
const instagramPageSource = read("next-app/components/guides/instagram-dashboard-page.tsx");
const interactiveWalkthroughSource = read("next-app/components/guides/interactive-walkthrough.tsx");
const guideFormatsSource = read("next-app/content/guide-formats.ts");
const guideReadingStyles = read("next-app/components/guides/guide-reading-page.module.css");
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
const approvedSlugSet = new Set(slugs);
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
  if (!approvedSlugSet.has(guide.slug)) failures.push(`Rebuild plan guide is missing from the publication registry: ${guide.slug}`);
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
if (!guideAccessSource.includes("<GuideAccessBoundary") && !guideReadingSource.includes("<GuideAccessBoundary")) {
  failures.push("Published guide pages are no longer protected by the shared email gate.");
}
const genericPreview = guideReadingSource.indexOf("data-guide-preview");
const genericGate = guideReadingSource.indexOf("<GuideAccessBoundary", genericPreview);
if (genericPreview < 0 || genericGate < genericPreview ||
    !guideReadingSource.includes("<Section section={guide.sections[0]} />")) {
  failures.push("The inline opt-in must follow a useful first section of the guide.");
}
if (!guideRouteSource.includes('slug === "instagram-content-dashboard"') ||
    !guideRouteSource.includes("<InstagramDashboardPage guide={guide} />") ||
    !instagramPageSource.includes('variant="instagram"') ||
    !guideRouteSource.includes('variant="entry"') ||
    !interactiveWalkthroughSource.includes('variant === "instagram" ? "agent" : null') ||
    !interactiveWalkthroughSource.includes('variant !== "instagram" && saved') ||
    instagramPageSource.includes('variant="save"') ||
    interactiveWalkthroughSource.includes('afterSteps')) {
  failures.push("The Instagram guide must use its dedicated Next.js walkthrough behind a pre-guide Lumail entry gate.");
}
if (!guideRouteSource.includes("legacyGuideSlugs.has(slug)") ||
    !guideRouteSource.includes("needs an approved interactive Next.js composition") ||
    !legacyGuideSlugsSource.includes("Frozen migration allowlist")) {
  failures.push("New guides must not fall back to the legacy static article renderer.");
}
if (!libraryUiSource.includes('role="search"') || !libraryPageSource.includes("searchIndex={searchIndex}")) {
  failures.push("The guide library search must stay visible and index published guide content.");
}
if (guideAccessSource.includes("data-guide-gate-teaser") || guideReadingStyles.includes(".gateTeaser") || guideReadingStyles.includes("filter: blur(2px)")) {
  failures.push("The guide gate must not use a blurred teaser or overlay.");
}
const sectionSpace = Number(guideReadingStyles.match(/--guide-section-space:\s*(\d+)px/)?.[1]);
const majorSpace = Number(guideReadingStyles.match(/--guide-major-space:\s*(\d+)px/)?.[1]);
if (!(sectionSpace > 0 && sectionSpace <= 48) || !(majorSpace > 0 && majorSpace <= 48)) {
  failures.push("The shared guide template exceeds the approved compact spacing limits.");
}
if (!/\.shell\s*\{[^}]*var\(--guide-body-width\)/s.test(guideReadingStyles)) {
  failures.push("The shared guide hero must align with the reading column.");
}

if (!/--guide-heading-accent:\s*#FF5733\b/i.test(guideReadingStyles)) {
  failures.push("The shared guide heading accent must remain Sunset Orange #FF5733.");
}
if (!/\.intro h1,\s*\.section h2,\s*\.tryNow h2,\s*\.conclusion h2\s*\{[^}]*color:\s*var\(--guide-heading-accent\)/s.test(guideReadingStyles)) {
  failures.push("The shared guide H1 and white-background major H2 headings must use the heading accent.");
}
if (/(?:\.section|\.tryNow|\.conclusion) h2[^{}]*\{[^}]*(?:border-left|border-inline-start):[^}]*var\(--guide-heading-accent\)/s.test(guideReadingStyles)) {
  failures.push("Major guide H2 headings must not use an orange marker.");
}
if (/h3[^{}]*\{[^}]*color:\s*var\(--guide-heading-accent\)/s.test(guideReadingStyles)) {
  failures.push("Guide H3 headings must remain dark rather than use the heading accent.");
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

console.log(`Guide framework passed: ${approved.length} registry guides; rebuilt pages: ${rebuildCounts.approved} approved, ${rebuildCounts.review} in review, ${rebuildCounts.pending} pending.`);
