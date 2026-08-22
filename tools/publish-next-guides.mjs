import { access, copyFile, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sourceRoot = path.join(root, "next-app", "out");
const publicRoot = path.join(root, "next-app", "public");
const destinationRoot = path.join(root, "main-site");
const guidesRoot = path.join(destinationRoot, "guides");
const guideDataPath = path.join(root, "next-app", "content", "guides.json");

const exists = async (filePath) => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

await mkdir(guidesRoot, { recursive: true });

const librarySource = path.join(sourceRoot, "guides", "index.html");
if (!(await exists(librarySource))) {
  throw new Error("The Next.js guide library export is missing. Run the Next.js production build first.");
}

await copyFile(librarySource, path.join(guidesRoot, "index.html"));

const guideData = JSON.parse(await readFile(guideDataPath, "utf8"));
const published = [];
const preserved = [];

for (const guide of guideData.guides) {
  const source = path.join(sourceRoot, "guides", guide.slug, "index.html");
  const destination = path.join(guidesRoot, `${guide.slug}.html`);
  if (await exists(source)) {
    await copyFile(source, destination);
    published.push(guide.slug);
  } else if (await exists(destination)) {
    preserved.push(guide.slug);
  } else {
    throw new Error(`Guide ${guide.slug} has neither a Next.js export nor an existing published page.`);
  }
}

const nextAssetDestination = path.join(destinationRoot, "_next");
await rm(nextAssetDestination, { recursive: true, force: true });
await cp(path.join(sourceRoot, "_next"), nextAssetDestination, {
  recursive: true,
  force: true,
});

await cp(path.join(publicRoot, "downloads"), path.join(destinationRoot, "downloads"), {
  recursive: true,
  force: true,
});

await cp(path.join(publicRoot, "images", "guides"), path.join(destinationRoot, "images", "guides"), {
  recursive: true,
  force: true,
});

const sitemapPath = path.join(destinationRoot, "sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8");
const withoutGuideEntries = sitemap.replace(
  /\s*<url><loc>https:\/\/www\.shiftandlead\.com\/guides\/[^<]*<\/loc><lastmod>[^<]*<\/lastmod><\/url>/g,
  "",
);
const libraryLastModified = guideData.guides
  .map((guide) => guide.dateModified)
  .filter(Boolean)
  .sort()
  .at(-1);
const guideEntries = [
  `  <url><loc>https://www.shiftandlead.com/guides/</loc><lastmod>${libraryLastModified}</lastmod></url>`,
  ...guideData.guides
    .slice()
    .sort((left, right) => left.slug.localeCompare(right.slug))
    .map((guide) => `  <url><loc>https://www.shiftandlead.com/guides/${guide.slug}.html</loc><lastmod>${guide.dateModified}</lastmod></url>`),
].join("\n");
await writeFile(
  sitemapPath,
  withoutGuideEntries.replace("</urlset>", `${guideEntries}\n</urlset>`),
);

console.log(`Published the guide library and ${published.length} Next.js guide page(s).`);
if (preserved.length > 0) {
  console.log(`Preserved ${preserved.length} existing guide page(s) that have not moved to the shared React template yet.`);
}
