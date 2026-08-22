import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { chromium } from "/Users/fatiha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";

const root = new URL("../", import.meta.url);
const catalogue = JSON.parse(await readFile(new URL("../next-app/content/guides.json", import.meta.url), "utf8"));
const captureRegistry = JSON.parse(
  await readFile(new URL("../main-site/api/guide-capture-registry.json", import.meta.url), "utf8"),
);
const guides = catalogue.guides.filter((guide) => guide.status === "live");
const base = process.env.GUIDE_AUDIT_BASE ?? "http://127.0.0.1:4173";
const brandSignature = "The AI Automation Queen · Shift & Lead";
const visualBrand = "The AI Automation Queen";
const requiredTools = ["chatgpt", "claude", "gemini", "copilot", "deepseek", "grok", "kimi", "manus", "meta-ai", "mistral"];
const expectedHubs = new Set([
  "AI essentials",
  "Better prompts and answers",
  "AI tools",
  "Content and creative work",
  "Workflows and automation",
  "AI agents",
  "Business operations",
]);
const findings = [];

function record(slug, viewport, check, error) {
  findings.push({
    slug,
    viewport,
    check,
    message: error instanceof Error ? error.message : String(error),
  });
}

async function check(slug, viewport, name, callback) {
  try {
    await callback();
  } catch (error) {
    record(slug, viewport, name, error);
  }
}

async function loadAllImages(page) {
  await page.evaluate(async () => {
    const step = Math.max(320, Math.floor(window.innerHeight * 0.7));
    for (let top = 0; top < document.documentElement.scrollHeight; top += step) {
      window.scrollTo(0, top);
      await new Promise((resolve) => window.setTimeout(resolve, 35));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await page.waitForFunction(
    () => Array.from(document.images).every((image) => image.complete),
    undefined,
    { timeout: 15_000 },
  );
  await page.evaluate(() => window.scrollTo(0, 0));
}

assert.equal(guides.length, 33, "The release catalogue must contain exactly 33 live guides.");
assert.equal(new Set(guides.map((guide) => guide.slug)).size, 33, "Every guide slug must be unique.");
assert.deepEqual(new Set(guides.map((guide) => guide.hub)), expectedHubs, "All 7 public hubs must be represented.");
assert.equal(Object.values(captureRegistry.guides).filter((entry) => entry.active).length, 33);

const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});

try {
  const libraryContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  const library = await libraryContext.newPage();
  const libraryRuntimeErrors = [];
  library.on("pageerror", (error) => libraryRuntimeErrors.push(error.message));
  library.on("console", (message) => {
    if (message.type() === "error") libraryRuntimeErrors.push(message.text());
  });
  const libraryResponse = await library.goto(`${base}/guides/`, { waitUntil: "networkidle" });
  assert.equal(libraryResponse?.status(), 200);
  assert.equal(await library.locator("h1").count(), 1);
  assert.equal(await library.locator(".guide-grid .guide-card").count(), 33);
  assert.equal(await library.locator(".guide-grid .guide-card__art h2").count(), 0);
  assert.equal(await library.locator(".guide-grid .guide-card__body h2").count(), 33);
  assert.equal(
    await library.locator(".guide-grid .guide-card__brand").evaluateAll(
      (nodes, expected) => nodes.every((node) => node.textContent?.trim() === expected),
      visualBrand,
    ),
    true,
  );
  assert.equal(
    await library.locator(".guide-grid .guide-card").evaluateAll((cards) => cards.every((card) => {
      const art = card.querySelector(".guide-card__art")?.getBoundingClientRect();
      const title = card.querySelector(".guide-card__body h2")?.getBoundingClientRect();
      return Boolean(art && title && title.top >= art.bottom - 1 && card.getBoundingClientRect().height < 500);
    })),
    true,
  );
  assert.equal(await library.locator(".level-nav button").count(), 3);
  assert.equal(await library.locator(".hub-nav button").count(), 7);
  assert.equal(await library.locator(".start-here__steps > li").count(), 4);
  assert.doesNotMatch(await library.locator("body").innerText(), /The 99/i);
  assert.equal(await library.locator("main").evaluate((node) => node.scrollWidth <= node.clientWidth), true);
  await loadAllImages(library);
  assert.equal(
    await library.locator("img").evaluateAll((images) => images.every((image) => image.naturalWidth > 0)),
    true,
  );
  assert.deepEqual(libraryRuntimeErrors, []);

  for (const guide of guides) {
    const expectedHref = `/guides/${guide.slug}.html`;
    assert.equal(await library.locator(`.guide-grid .guide-card[href="${expectedHref}"]`).count(), 1);
  }

  await library.getByRole("button", { name: "Expert", exact: true }).first().click();
  assert.equal(
    Number.parseInt(await library.locator(".result-count").innerText(), 10),
    guides.filter((guide) => guide.level === "Expert").length,
  );
  await library.locator("#guide-search").fill("dashboard");
  assert.equal(Number.parseInt(await library.locator(".result-count").innerText(), 10) > 0, true);
  assert.equal(await library.locator('.guide-card[href="/guides/build-a-business-dashboard-with-ai.html"]').count(), 1);
  await libraryContext.close();

  for (const viewport of [
    { name: "desktop", width: 1440, height: 1000 },
    { name: "mobile", width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    for (const guide of guides) {
      const runtimeErrors = [];
      const failedSameOriginRequests = [];
      const onPageError = (error) => runtimeErrors.push(error.message);
      const onConsole = (message) => {
        if (message.type() === "error") runtimeErrors.push(message.text());
      };
      const onRequestFailed = (request) => {
        if (request.url().startsWith(base)) {
          failedSameOriginRequests.push(`${request.url()} ${request.failure()?.errorText ?? "failed"}`);
        }
      };
      page.on("pageerror", onPageError);
      page.on("console", onConsole);
      page.on("requestfailed", onRequestFailed);

      const path = `/guides/${guide.slug}.html`;
      const response = await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
      const bodyText = await page.locator("body").innerText();

      await check(guide.slug, viewport.name, "route", () => assert.equal(response?.status(), 200));
      await check(guide.slug, viewport.name, "article root", async () => {
        assert.equal(await page.locator("[data-guide-article]").count(), 1);
        assert.equal(await page.locator("h1").count(), 1);
        assert.equal((await page.locator("h1").innerText()).trim(), guide.h1);
      });
      await check(guide.slug, viewport.name, "SEO", async () => {
        assert.equal(
          await page.locator('link[rel="canonical"]').getAttribute("href"),
          `https://www.shiftandlead.com${path}`,
        );
        assert.ok((await page.locator('meta[name="description"]').getAttribute("content"))?.trim());
        assert.ok((await page.locator('meta[property="og:image"]').getAttribute("content"))?.endsWith(guide.cover));
        assert.equal(await page.locator('meta[name="publisher"]').getAttribute("content"), "Shift & Lead");
      });
      await check(guide.slug, viewport.name, "reader cleanup", () => {
        assert.doesNotMatch(bodyText, /The 99/i);
        assert.doesNotMatch(
          bodyText,
          /(?:^|\n)\s*(?:FREE(?:\s+(?:GUIDE|SETUP|TOOL VERDICT))?|Updated(?:\s+\w+){0,4}|\d+\s+MIN READ|\d+\s+minute read|By Fatiha|Created by Fatiha)\s*(?:\n|$)/i,
        );
        assert.doesNotMatch(
          bodyText,
          /\bguide_[a-z0-9_]+\b|\b(?:datePublished|dateModified|readMinutes|formatLabel)\b|\.source\.md|Editorial brief/i,
        );
        assert.doesNotMatch(
          bodyText,
          /Lumail tag|guide slug|guide ID|capture event|primary CTA|internal review queue|commercial CTA/i,
        );
        assert.doesNotMatch(bodyText, /—/);
      });
      await check(guide.slug, viewport.name, "brand signature", () => {
        assert.equal(bodyText.toLocaleLowerCase().includes(brandSignature.toLocaleLowerCase()), true);
      });
      await check(guide.slug, viewport.name, "visual brand", async () => {
        assert.equal((await page.locator("[data-guide-hero-copy] > p").first().textContent())?.trim(), visualBrand);
        assert.equal(await page.locator(".article-credit", { hasText: brandSignature }).count(), 1);
      });
      await check(guide.slug, viewport.name, "navigation", async () => {
        assert.equal(await page.getByRole("navigation", { name: "Main navigation" }).count(), 1);
        assert.equal(await page.getByRole("link", { name: "Shift and Lead home" }).count(), 1);
        assert.equal(await page.locator('a[href="/guides/"]').count() > 0, true);
      });
      await check(guide.slug, viewport.name, "capture", async () => {
        const dialog = page.locator("dialog.guide-capture");
        assert.equal(await dialog.count(), 1);
        const trigger = page.locator("[data-guide-hero-copy] button").first();
        assert.equal(await trigger.count(), 1);
        await trigger.click();
        await dialog.waitFor({ state: "visible" });
        assert.equal(await dialog.getByLabel("Email address").count(), 1);
        assert.equal(await dialog.getByRole("button", { name: "Close" }).count(), 1);
        await dialog.getByRole("button", { name: "Close" }).click();
        assert.equal(await trigger.evaluate((node) => node === document.activeElement), true);
      });
      await check(guide.slug, viewport.name, "related guides", async () => {
        assert.equal(await page.locator(".more-guides__grid > .guide-card").count(), 3);
        assert.equal(await page.locator(".more-guides__grid .guide-card__art h2").count(), 0);
        assert.equal(await page.locator(".more-guides__grid .guide-card__body h2").count(), 3);
        assert.equal(
          await page.locator(".more-guides__grid .guide-card__brand").evaluateAll(
            (nodes, expected) => nodes.every((node) => node.textContent?.trim() === expected),
            visualBrand,
          ),
          true,
        );
        const hrefs = await page.locator(".more-guides__grid > .guide-card").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
        assert.equal(new Set(hrefs).size, 3);
        for (const href of hrefs) assert.ok(guides.some((entry) => `/guides/${entry.slug}.html` === href));
      });
      await check(guide.slug, viewport.name, "images", async () => {
        await loadAllImages(page);
        assert.equal(
          await page.locator("img").evaluateAll((images) => images.every((image) => image.naturalWidth > 0)),
          true,
        );
        const heroImage = page.locator("[data-guide-hero] img").first();
        assert.ok((await heroImage.getAttribute("alt"))?.trim());
        if (viewport.name === "mobile" && guide.slug !== "ai-jargon-guide") {
          const framing = await heroImage.evaluate((image) => ({
            objectFit: getComputedStyle(image).objectFit,
            transform: getComputedStyle(image).transform,
          }));
          assert.deepEqual(framing, { objectFit: "contain", transform: "none" });
        }
      });
      await check(guide.slug, viewport.name, "responsive layout", async () => {
        assert.equal(await page.locator("html").evaluate((node) => node.scrollWidth <= node.clientWidth), true);
        assert.equal(await page.locator("[data-guide-article]").evaluate((node) => node.scrollWidth <= node.clientWidth), true);
      });
      await check(guide.slug, viewport.name, "reduced motion", async () => {
        const facts = await page.evaluate(() => ({
          progress: document.querySelector(".guide-progress")
            ? getComputedStyle(document.querySelector(".guide-progress")).display
            : "absent",
          hiddenReveals: Array.from(document.querySelectorAll("[data-guide-reveal]")).filter(
            (element) => Number(getComputedStyle(element).opacity) < 0.99,
          ).length,
        }));
        assert.ok(facts.progress === "none" || facts.progress === "absent");
        assert.equal(facts.hiddenReveals, 0);
      });
      await check(guide.slug, viewport.name, "runtime", () => {
        assert.deepEqual(runtimeErrors, []);
        assert.deepEqual(failedSameOriginRequests, []);
      });

      page.off("pageerror", onPageError);
      page.off("console", onConsole);
      page.off("requestfailed", onRequestFailed);

      if (guide.slug === "which-ai-tool-for-what") {
        await check(guide.slug, viewport.name, "10 direct tool routes", async () => {
          assert.equal(await page.locator("a[class*='optionAction']").count(), 10);
          for (const slug of requiredTools) {
            assert.equal(await page.locator(`a[class*='optionAction'][href="/guides/${slug}.html"]`).count(), 1);
          }
        });
      }
    }

    await context.close();
  }

  const mobileMotionContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "no-preference",
  });
  const mobileMotionPage = await mobileMotionContext.newPage();
  for (const guide of guides.filter((entry) => entry.slug !== "ai-jargon-guide")) {
    await mobileMotionPage.goto(`${base}/guides/${guide.slug}.html`, { waitUntil: "networkidle" });
    await mobileMotionPage.waitForTimeout(120);
    const framing = await mobileMotionPage.locator("[data-guide-hero] img").first().evaluate((image) => ({
      objectFit: getComputedStyle(image).objectFit,
      transform: getComputedStyle(image).transform,
    }));
    assert.deepEqual(framing, { objectFit: "contain", transform: "none" }, `${guide.slug} mobile hero framing`);
  }
  await mobileMotionContext.close();

  for (const guide of guides) {
    const capture = captureRegistry.guides[guide.slug];
    assert.ok(capture?.active, `${guide.slug} needs an active capture mapping.`);
    const fileResponse = await fetch(`${base}/downloads/${capture.deliverable.file}`);
    assert.equal(fileResponse.status, 200, `${guide.slug} download must return 200.`);
    assert.ok(Number(fileResponse.headers.get("content-length")) > 0, `${guide.slug} download must not be empty.`);
    assert.ok((await fileResponse.arrayBuffer()).byteLength > 0, `${guide.slug} download must contain bytes.`);
  }
} finally {
  await browser.close();
}

if (findings.length > 0) {
  console.error(`Guide library browser audit failed with ${findings.length} finding(s):`);
  for (const finding of findings) {
    console.error(`- ${finding.slug} [${finding.viewport}] ${finding.check}: ${finding.message}`);
  }
  process.exit(1);
}

console.log(`Guide library browser audit passed for ${guides.length} guides at desktop and mobile widths.`);
console.log(`Verified ${guides.length} active capture mappings and ${guides.length} downloadable files.`);
