import { cp, copyFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const slug = process.argv[2];

if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  throw new Error("Usage: node tools/publish-next-guide.mjs <guide-slug>");
}

const root = process.cwd();
const publication = JSON.parse(
  await readFile(path.join(root, "data", "guide-publication.json"), "utf8"),
);
const approvedSlugs = new Set(publication.approved.map((guide) => guide.slug));
const rebuildPlan = JSON.parse(
  await readFile(path.join(root, "data", "guide-rebuild-plan.json"), "utf8"),
);
const rebuildStatus = rebuildPlan.guides.find((guide) => guide.slug === slug)?.status;

if (!approvedSlugs.has(slug) || rebuildStatus !== "approved") {
  throw new Error(
    `Refusing to publish ${slug}: its rebuilt page needs final approval in data/guide-rebuild-plan.json and a matching entry in data/guide-publication.json.`,
  );
}

const sourceRoot = path.join(root, "next-app", "out");
const publicRoot = path.join(root, "next-app", "public");
const destinationRoot = path.join(root, "main-site");

await mkdir(path.join(destinationRoot, "guides"), { recursive: true });
await copyFile(
  path.join(sourceRoot, "guides", slug, "index.html"),
  path.join(destinationRoot, "guides", `${slug}.html`),
);

await copyFile(
  path.join(sourceRoot, "guides", "index.html"),
  path.join(destinationRoot, "guides", "index.html"),
);

await cp(path.join(sourceRoot, "_next"), path.join(destinationRoot, "_next"), {
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

console.log(`Published ${slug} to main-site/guides/${slug}.html`);
