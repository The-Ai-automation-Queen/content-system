import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(repo, "main-site");
const target = path.join(repo, "next-app", "public");
const pageStatus = JSON.parse(fs.readFileSync(path.join(repo, "data", "page-status.json"), "utf8"));
const pages = new Set(Object.values(pageStatus).filter((entry) => entry.status === "active" || entry.status === "unlisted").map((entry) => entry.path).filter((entry) => typeof entry === "string" && entry.endsWith(".html")));
// Preserve directly linked supporting resource/product pages until those offers have been migrated.
const directories = ["assets", "lib", "workbooks"];
let updated = 0;
function copy(relative) {
  const from = path.join(source, relative);
  const to = path.join(target, relative);
  if (!fs.existsSync(from) || !fs.statSync(from).isFile()) throw new Error(`Missing still-active published asset: ${relative}`);
  const data = fs.readFileSync(from);
  if (fs.existsSync(to) && fs.readFileSync(to).equals(data)) return;
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.writeFileSync(to, data);
  updated += 1;
}
function directoryCopy(relative) {
  const from = path.join(source, relative);
  if (!fs.existsSync(from)) return;
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (entry.isDirectory()) directoryCopy(path.join(relative, entry.name));
    else if (entry.isFile()) copy(path.join(relative, entry.name));
  }
}
for (const page of pages) copy(page.slice(1));
for (const directory of directories) directoryCopy(directory);
for (const filename of fs.readdirSync(source)) {
  if (/\.(?:webp|png|jpe?g|svg|ico)$/i.test(filename)) copy(filename);
}
for (const file of ["robots.txt", "llms.txt"]) copy(file);
console.log(`Synced ${pages.size} approved HTML pages and assets for Next.js (${updated} changed files).`);
