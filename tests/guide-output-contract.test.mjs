import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const publication = JSON.parse(read("data/guide-publication.json"));
const route = read("next-app/app/guides/[slug]/page.tsx");
const kimiSheetsPage = read("next-app/components/guides/kimi-sheets-page.tsx");
const accessForm = read("next-app/components/guides/guide-access-boundary.tsx");
const framework = read("docs/GUIDE-PRODUCTION-FRAMEWORK.md");

function bodyWithoutScripts(html) {
  return (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

for (const guide of publication.approved) {
  test(`${guide.slug} exports a real Next.js guide page`, () => {
    const html = read(`next-app/out/guides/${guide.slug}/index.html`);
    const body = bodyWithoutScripts(html);
    assert.match(body, /<h1\b/i, "guide needs a semantic title without JavaScript");
    assert.match(html, /\/images\/guides\//, "guide artwork is missing");
    assert.match(html, /rel="canonical"/, "guide canonical URL is missing");
    if (guide.slug === "instagram-content-dashboard") {
      assert.match(body, /What you(’|'|&#x27;)ll build/, "Instagram outcome section is missing");
      assert.match(body, /data-guide-capture-boundary/, "Instagram has no inline Lumail form");
      assert.doesNotMatch(body, /guide-reading-page_previewContent/, "legacy article preview returned to Instagram");
    } else if (guide.slug === "make-work-tracker-with-kimi") {
      assert.match(kimiSheetsPage, /GuideAccessBoundary[\s\S]*variant="unlock"/, "Kimi's selected step needs an inline form before its prompt");
    } else {
      assert.match(body, /data-guide-capture-boundary/, "published guide has no inline Lumail form");
      assert.match(body, /name="email"/, "published guide has no email field");
    }
  });
}

test("Instagram uses the shared batch guide design with an inline Lumail form before the prompts", () => {
  assert.match(route, /slug === "instagram-content-dashboard"\) return <BatchGuidePage guide=\{guide\}/);
  assert.match(accessForm, /fetch\("\/api\/guide-capture"/);
  assert.match(framework, /The current static article renderer is legacy infrastructure, not the target layout/);
});
