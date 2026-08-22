import { chromium } from "/Users/fatiha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import assert from "node:assert/strict";

const base = process.env.GUIDE_AUDIT_BASE ?? "http://127.0.0.1:4173";
const guidePath = "/guides/check-ai-answers.html";
const expectedRelated = [
  "/guides/better-prompts-and-answers.html",
  "/guides/what-is-a-prompt.html",
  "/guides/research-to-content-workflow.html",
];

const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});

async function createPage(width, height, reducedMotion = "reduce") {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion });
  const page = await context.newPage();
  const diagnostics = [];
  page.on("console", (message) => {
    if (message.type() === "error") diagnostics.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => diagnostics.push(`pageerror: ${error.message}`));
  page.on("requestfailed", (request) => diagnostics.push(`requestfailed: ${request.url()} ${request.failure()?.errorText}`));
  return { context, page, diagnostics };
}

try {
  const desktop = await createPage(1440, 1000);
  const response = await desktop.page.goto(`${base}${guidePath}`, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200);
  assert.equal(await desktop.page.title(), "Check an AI answer before you use it | Shift & Lead");
  assert.equal(
    await desktop.page.locator('meta[name="description"]').getAttribute("content"),
    "Check important AI claims against original information, mark what is supported and decide what to keep, rewrite, remove or send to a qualified reviewer.",
  );
  assert.equal(await desktop.page.locator("h1").textContent(), "Check an AI answer before you use it");
  assert.equal(
    await desktop.page.locator("[data-guide-hero-copy] > p").nth(1).textContent(),
    "Find the claims that matter, check them against the original information and decide what to keep, rewrite, remove or send to a qualified reviewer.",
  );
  assert.equal(
    await desktop.page.getByRole("button", { name: "Send me the source-checking worksheet", exact: true }).first().textContent(),
    "Send me the source-checking worksheet",
  );

  const hero = desktop.page.locator("[data-guide-hero] img");
  const heroFacts = await hero.evaluate((image) => ({
    complete: image.complete,
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
    objectPosition: getComputedStyle(image).objectPosition,
    alt: image.alt,
  }));
  assert.deepEqual(heroFacts, {
    complete: true,
    naturalWidth: 1280,
    naturalHeight: 720,
    objectPosition: "82% 50%",
    alt: "The small blue robot mascot checks an ivory card under a brass magnifying glass while a red card waits on a separate tray",
  });

  const canonical = await desktop.page.locator('link[rel="canonical"]').getAttribute("href");
  assert.equal(canonical, "https://www.shiftandlead.com/guides/check-ai-answers.html");
  assert.equal(await desktop.page.locator("main").evaluate((node) => node.scrollWidth <= node.clientWidth), true);
  assert.equal(await desktop.page.locator("body").evaluate((node) => /\b(?:FREE|Updated|MIN READ|minute read|By Fatiha)\b/i.test(node.innerText)), false);
  await desktop.page.locator(".more-guides").scrollIntoViewIfNeeded();
  await desktop.page.waitForFunction(() => Array.from(document.images).every((image) => image.complete));
  assert.equal(await desktop.page.locator("img").evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0)), true);

  const related = await desktop.page.locator(".more-guides__grid > a").evaluateAll((anchors) =>
    anchors.map((anchor) => anchor.getAttribute("href")),
  );
  assert.deepEqual(related, expectedRelated);

  const trigger = desktop.page.getByRole("button", { name: "Send me the source-checking worksheet", exact: true }).first();
  await trigger.focus();
  await desktop.page.keyboard.press("Enter");
  const dialog = desktop.page.locator("dialog[open]");
  await dialog.waitFor();
  assert.equal(await dialog.getByRole("heading").textContent(), "Get the AI answer source-checking worksheet");
  assert.equal(await desktop.page.evaluate(() => document.activeElement?.getAttribute("type")), "email");
  await desktop.page.keyboard.press("Escape");
  assert.equal(await desktop.page.locator("dialog[open]").count(), 0);
  assert.equal(await trigger.evaluate((node) => document.activeElement === node), true);
  assert.deepEqual(desktop.diagnostics, []);

  await desktop.page.route("**/api/guide-capture", async (route) => {
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Email delivery is unavailable right now." }),
    });
  });
  await trigger.click();
  await dialog.getByLabel("Email address").fill("reader@example.com");
  await dialog.getByRole("button", { name: "Send me the source-checking worksheet" }).click();
  const fallback = dialog.getByRole("link", { name: "Download it now" });
  await fallback.waitFor();
  assert.equal(await fallback.getAttribute("href"), "/downloads/ai-answer-source-checking-worksheet.pdf");
  await dialog.getByRole("button", { name: "Close" }).click();

  const pdfResponse = await desktop.context.request.get(`${base}/downloads/ai-answer-source-checking-worksheet.pdf`);
  assert.equal(pdfResponse.status(), 200);
  assert.match(pdfResponse.headers()["content-type"] || "", /application\/pdf/);
  assert.ok((await pdfResponse.body()).byteLength > 100000);

  await desktop.page.screenshot({ path: "work/check-ai-answers-desktop.png", fullPage: true });
  assert.deepEqual(
    desktop.diagnostics.filter((entry) => !entry.includes("status of 503")),
    [],
  );
  await desktop.context.close();

  const mobile = await createPage(390, 844);
  const mobileResponse = await mobile.page.goto(`${base}${guidePath}`, { waitUntil: "networkidle" });
  assert.equal(mobileResponse?.status(), 200);
  assert.equal(await mobile.page.locator("body").evaluate((node) => node.scrollWidth <= node.clientWidth), true);
  const mobileHeroBox = await mobile.page.locator("[data-guide-hero]").boundingBox();
  const mobileButtonBox = await mobile.page.getByRole("button", { name: "Send me the source-checking worksheet", exact: true }).first().boundingBox();
  assert.ok(mobileHeroBox && mobileButtonBox && mobileButtonBox.y < mobileHeroBox.y + mobileHeroBox.height);
  await mobile.page.locator(".more-guides").scrollIntoViewIfNeeded();
  await mobile.page.waitForFunction(() => Array.from(document.images).every((image) => image.complete));
  assert.equal(await mobile.page.locator("img").evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0)), true);
  await mobile.page.screenshot({ path: "work/check-ai-answers-mobile.png", fullPage: true });
  assert.deepEqual(mobile.diagnostics, []);
  await mobile.context.close();

  const library = await createPage(1440, 1000);
  const libraryResponse = await library.page.goto(`${base}/guides/`, { waitUntil: "networkidle" });
  assert.equal(libraryResponse?.status(), 200);
  const card = library.page.locator(`a[href="${guidePath}"]`).filter({ hasText: "Check an AI answer before you use it" });
  assert.equal(await card.count(), 1);
  assert.equal(await card.locator(".guide-card__body h2").textContent(), "Check an AI answer before you use it");
  assert.equal(await card.locator(".guide-card__brand").textContent(), "The AI Automation Queen");
  assert.equal(await card.locator(".guide-card__level").textContent(), "Beginner");
  assert.match((await card.textContent()) || "", /Open guide/);
  const libraryText = await library.page.locator("body").innerText();
  for (const tool of ["ChatGPT", "Claude", "Gemini", "Copilot", "DeepSeek", "Grok", "Kimi", "Manus", "Meta AI", "Mistral"]) {
    assert.match(libraryText, new RegExp(tool.replace(" ", "\\s+"), "i"));
  }
  assert.doesNotMatch(libraryText, /The 99|\bFREE\b|\bMIN READ\b/i);
  assert.equal(await library.page.locator("body").evaluate((node) => node.scrollWidth <= node.clientWidth), true);
  assert.deepEqual(library.diagnostics, []);
  await library.context.close();

  const hub = await createPage(1440, 1000);
  const hubResponse = await hub.page.goto(`${base}/guides/better-prompts-and-answers.html`, { waitUntil: "networkidle" });
  assert.equal(hubResponse?.status(), 200);
  const handoff = hub.page.locator('a[href="/guides/check-ai-answers.html"]', { hasText: "Check the answer" });
  assert.equal(await handoff.count(), 1);
  assert.deepEqual(hub.diagnostics, []);
  await hub.context.close();

  const motion = await createPage(1440, 1000, "no-preference");
  const motionResponse = await motion.page.goto(`${base}${guidePath}`, { waitUntil: "networkidle" });
  assert.equal(motionResponse?.status(), 200);
  await motion.page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await motion.page.waitForTimeout(900);
  const revealOpacity = await motion.page.locator("[data-guide-reveal]").evaluateAll((elements) =>
    elements.map((element) => Number(getComputedStyle(element).opacity)),
  );
  assert.equal(revealOpacity.every((opacity) => opacity > 0.99), true);
  assert.notEqual(await motion.page.locator(".guide-progress > div").evaluate((node) => getComputedStyle(node).transform), "none");
  assert.deepEqual(motion.diagnostics, []);
  await motion.context.close();

  console.log("Check AI answers browser QA passed on desktop, mobile, library, Better Prompts handoff and GSAP motion.");
} finally {
  await browser.close();
}
