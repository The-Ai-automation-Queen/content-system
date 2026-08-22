import { chromium } from "/Users/fatiha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import assert from "node:assert/strict";

const base = "http://127.0.0.1:4173";
const guidePath = "/guides/show-up-in-ai-search.html";
const buttonLabel = "Send me the AI search workbook";
const expectedDescription =
  "Map customer questions to clear public sources, check access and conflicting profiles, then record and correct what current AI search answers show.";
const expectedRelated = [
  "/guides/check-ai-answers.html",
  "/guides/content-and-creative-work.html",
  "/guides/research-to-content-workflow.html",
];
const captureDescription =
  "Enter your email to get the fillable 3-page workbook. Download it immediately and use its 6-question map, 8-source audit and 12-test log to find the source gap behind a missing or wrong AI answer.";
const signature = "The AI Automation Queen · Shift & Lead";

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
  page.on("requestfailed", (request) =>
    diagnostics.push(`requestfailed: ${request.url()} ${request.failure()?.errorText}`),
  );
  return { context, page, diagnostics };
}

function assertReaderCleanup(text) {
  assert.doesNotMatch(
    text,
    /\b(?:FREE|Updated|MIN READ|minute read|By Fatiha|Created by)\b|The 99/i,
  );
  assert.doesNotMatch(
    text,
    /Lumail tag|guide_ai_search_visibility_workbook|guide\.show-up-in-ai-search|datePublished|dateModified|readMinutes|formatLabel|\.source\.md|Source material|Source brief|Editorial brief/i,
  );
  assert.doesNotMatch(
    text,
    /\b\d+(?:\.\d+)?%\b|\b\d+(?:\.\d+)?\s*(?:x|times)\s+(?:more|better|faster|higher)\b|\b#1\b/i,
  );
}

async function assertNoFrameworkErrors(page) {
  assert.equal(
    await page
      .locator('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay')
      .count(),
    0,
  );
  assert.equal(await page.locator("body").evaluate((node) => node.innerText.trim().length > 0), true);
}

async function heroCropFacts(page) {
  return page.locator("[data-guide-hero]").evaluate((hero) => {
    const image = hero.querySelector("img");
    if (!(image instanceof HTMLImageElement)) throw new Error("Guide hero image is missing.");
    const imageBox = image.getBoundingClientRect();
    const position = getComputedStyle(image).objectPosition.split(/\s+/);
    const px = Number.parseFloat(position[0]) / 100;
    const py = Number.parseFloat(position[1]) / 100;
    const sourceWidth = image.naturalWidth;
    const sourceHeight = image.naturalHeight;
    const targetAspect = imageBox.width / imageBox.height;
    const sourceAspect = sourceWidth / sourceHeight;
    let left = 0;
    let top = 0;
    let width = sourceWidth;
    let height = sourceHeight;

    if (targetAspect < sourceAspect) {
      width = sourceHeight * targetAspect;
      left = (sourceWidth - width) * px;
    } else if (targetAspect > sourceAspect) {
      height = sourceWidth / targetAspect;
      top = (sourceHeight - height) * py;
    }

    return {
      complete: image.complete,
      naturalWidth: sourceWidth,
      naturalHeight: sourceHeight,
      objectFit: getComputedStyle(image).objectFit,
      objectPosition: getComputedStyle(image).objectPosition,
      alt: image.alt,
      rendered: { width: imageBox.width, height: imageBox.height },
      visibleSource: { left, top, right: left + width, bottom: top + height },
    };
  });
}

function assertHeroCrop(facts) {
  assert.equal(facts.complete, true);
  assert.equal(facts.naturalWidth, 1280);
  assert.equal(facts.naturalHeight, 720);
  assert.equal(facts.objectFit, "cover");
  assert.equal(facts.objectPosition, "82% 52%");
  assert.equal(
    facts.alt,
    "The small blue robot mascot connects 3 matching public source tiles to a brass routing board that releases an evidence slip",
  );
  assert.ok(facts.rendered.width > 0 && facts.rendered.height > 0);

  // The semantic scene occupies approximately x=580..1215 and y=55..700 in the 1280x720 master.
  // The assertion allows decorative frame edges to trim, but never a tile, cord, output, slip, or mascot.
  assert.ok(facts.visibleSource.left <= 580, JSON.stringify(facts.visibleSource));
  assert.ok(facts.visibleSource.right >= 1215, JSON.stringify(facts.visibleSource));
  assert.ok(facts.visibleSource.top <= 55, JSON.stringify(facts.visibleSource));
  assert.ok(facts.visibleSource.bottom >= 700, JSON.stringify(facts.visibleSource));
}

try {
  const desktop = await createPage(1440, 1000, "reduce");
  const response = await desktop.page.goto(`${base}${guidePath}`, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200);
  assert.equal(response?.headers()["content-type"]?.includes("text/html"), true);
  assert.equal(await desktop.page.title(), "Show up in AI search | Shift & Lead");
  assert.equal(
    await desktop.page.locator('meta[name="description"]').getAttribute("content"),
    expectedDescription,
  );
  assert.equal(
    await desktop.page.locator('link[rel="canonical"]').getAttribute("href"),
    "https://www.shiftandlead.com/guides/show-up-in-ai-search.html",
  );
  assert.equal(
    await desktop.page.locator('meta[name="author"]').getAttribute("content"),
    signature,
  );
  assert.equal(
    await desktop.page.locator('meta[name="creator"]').getAttribute("content"),
    signature,
  );
  assert.equal(
    await desktop.page.locator('meta[name="publisher"]').getAttribute("content"),
    "Shift & Lead",
  );
  assert.equal(
    await desktop.page.locator('meta[property="og:url"]').getAttribute("content"),
    "https://www.shiftandlead.com/guides/show-up-in-ai-search.html",
  );
  assert.equal(
    await desktop.page.locator('meta[property="og:image"]').getAttribute("content"),
    "https://www.shiftandlead.com/images/guides/show-up-in-ai-search.webp",
  );
  assert.equal(await desktop.page.locator('meta[property="og:image:width"]').getAttribute("content"), "1280");
  assert.equal(await desktop.page.locator('meta[property="og:image:height"]').getAttribute("content"), "720");
  await assertNoFrameworkErrors(desktop.page);

  assert.equal(await desktop.page.locator("h1").textContent(), "Show up in AI search");
  assert.equal(
    await desktop.page.locator("[data-guide-hero-copy] > p").first().textContent(),
    signature,
  );
  assert.equal(
    await desktop.page.locator("[data-guide-hero-copy] > p").nth(1).textContent(),
    "Make your important business facts reachable, current and easier for a person to verify when they appear in AI search.",
  );
  assert.equal(
    await desktop.page.getByRole("button", { name: buttonLabel, exact: true }).first().textContent(),
    buttonLabel,
  );
  assertHeroCrop(await heroCropFacts(desktop.page));
  assert.equal(
    await desktop.page.locator("main").evaluate((node) => node.scrollWidth <= node.clientWidth),
    true,
  );

  const readerText = await desktop.page.locator("body").innerText();
  assertReaderCleanup(readerText);
  assert.equal(
    await desktop.page
      .locator(".article-credit, .source-label, [data-source-label], [data-editorial-source]")
      .count(),
    0,
  );
  assert.match(readerText, /AI search visibility starts at the source/);
  assert.match(readerText, /Build a clear source chain in 4 steps/);
  assert.match(readerText, /Fix the strongest source and the route to it before creating another page/);

  const reducedMotionFacts = await desktop.page.evaluate(() => ({
    progressDisplay: getComputedStyle(document.querySelector(".guide-progress")).display,
    heroCopyTransform: getComputedStyle(document.querySelector("[data-guide-hero-copy]")).transform,
    heroImageTransform: getComputedStyle(document.querySelector("[data-guide-image] img")).transform,
    reveals: Array.from(document.querySelectorAll("[data-guide-reveal]")).map((element) => ({
      opacity: Number(getComputedStyle(element).opacity),
      transform: getComputedStyle(element).transform,
    })),
  }));
  assert.equal(reducedMotionFacts.progressDisplay, "none");
  assert.equal(reducedMotionFacts.heroCopyTransform, "none");
  assert.equal(reducedMotionFacts.heroImageTransform, "none");
  assert.equal(
    reducedMotionFacts.reveals.every((item) => item.opacity > 0.99 && item.transform === "none"),
    true,
  );

  await desktop.page.locator(".more-guides").scrollIntoViewIfNeeded();
  await desktop.page.waitForFunction(() => Array.from(document.images).every((image) => image.complete));
  assert.equal(
    await desktop.page.locator("img").evaluateAll((images) =>
      images.every((image) => image.complete && image.naturalWidth > 0),
    ),
    true,
  );
  assert.equal(await desktop.page.locator(".more-guides__grid > a").count(), 3);
  assert.deepEqual(
    await desktop.page.locator(".more-guides__grid > a").evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href")),
    ),
    expectedRelated,
  );
  assert.equal(
    await desktop.page.locator("#related-guides-title").textContent(),
    "Choose what the source or answer needs next.",
  );

  const trigger = desktop.page.getByRole("button", { name: buttonLabel, exact: true }).first();
  await trigger.focus();
  await desktop.page.keyboard.press("Enter");
  const dialog = desktop.page.locator("dialog[open]");
  await dialog.waitFor();
  assert.equal(await dialog.getByRole("heading").textContent(), "Get the AI search visibility workbook");
  assert.equal(await dialog.locator(".guide-capture__content > p").textContent(), captureDescription);
  assert.equal(await dialog.getByLabel("Email address").getAttribute("placeholder"), "you@example.com");
  assert.equal(
    await dialog.locator("small").textContent(),
    "You will also receive practical Shift & Lead emails. Unsubscribe at any time.",
  );
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
  await dialog.getByRole("button", { name: buttonLabel }).click();
  assert.equal(await dialog.getByRole("alert").textContent(), "Email delivery is unavailable right now.");
  const fallback = dialog.getByRole("link", { name: "Download it now", exact: true });
  await fallback.waitFor();
  assert.equal(await fallback.getAttribute("href"), "/downloads/ai-search-visibility-workbook.pdf");
  assert.equal(await fallback.getAttribute("download"), "");
  await dialog.getByRole("button", { name: "Close" }).click();

  const pdfResponse = await desktop.context.request.get(
    `${base}/downloads/ai-search-visibility-workbook.pdf`,
  );
  assert.equal(pdfResponse.status(), 200);
  assert.match(pdfResponse.headers()["content-type"] || "", /application\/pdf/);
  assert.ok((await pdfResponse.body()).byteLength > 250000);

  await desktop.page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await desktop.page.screenshot({ path: "work/show-up-in-ai-search-hero-desktop.png" });
  await desktop.page.screenshot({ path: "work/show-up-in-ai-search-desktop.png", fullPage: true });
  assert.deepEqual(
    desktop.diagnostics.filter((entry) => !entry.includes("status of 503")),
    [],
  );
  await desktop.context.close();

  const mobile = await createPage(390, 844, "reduce");
  const mobileResponse = await mobile.page.goto(`${base}${guidePath}`, { waitUntil: "networkidle" });
  assert.equal(mobileResponse?.status(), 200);
  await assertNoFrameworkErrors(mobile.page);
  assert.equal(
    await mobile.page.locator("body").evaluate((node) => node.scrollWidth <= node.clientWidth),
    true,
  );
  assertHeroCrop(await heroCropFacts(mobile.page));
  const mobileHeroBox = await mobile.page.locator("[data-guide-hero]").boundingBox();
  const mobileButtonBox = await mobile.page
    .getByRole("button", { name: buttonLabel, exact: true })
    .first()
    .boundingBox();
  assert.ok(mobileHeroBox && mobileButtonBox && mobileButtonBox.y < mobileHeroBox.y + mobileHeroBox.height);
  await mobile.page.locator(".more-guides").scrollIntoViewIfNeeded();
  await mobile.page.waitForFunction(() => Array.from(document.images).every((image) => image.complete));
  assert.equal(
    await mobile.page.locator("img").evaluateAll((images) =>
      images.every((image) => image.complete && image.naturalWidth > 0),
    ),
    true,
  );
  await mobile.page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await mobile.page.screenshot({ path: "work/show-up-in-ai-search-hero-mobile.png" });
  await mobile.page.screenshot({ path: "work/show-up-in-ai-search-mobile.png", fullPage: true });
  assert.deepEqual(mobile.diagnostics, []);
  await mobile.context.close();

  const library = await createPage(1440, 1000, "reduce");
  const libraryResponse = await library.page.goto(`${base}/guides/`, { waitUntil: "networkidle" });
  assert.equal(libraryResponse?.status(), 200);
  await assertNoFrameworkErrors(library.page);
  const card = library.page
    .locator(`a[href="${guidePath}"]`)
    .filter({ hasText: "Show up in AI search" });
  assert.equal(await card.count(), 1);
  assert.equal(await card.evaluate((node) => node.tagName), "A");
  assert.equal(await card.locator(".guide-card__art h2").textContent(), "Show up in AI search");
  assert.equal(await card.locator(".guide-card__brand").textContent(), signature);
  assert.equal(await card.locator(".guide-card__level").textContent(), "Intermediate");
  assert.equal(
    await card.locator(".guide-card__body > p").textContent(),
    "Give important business facts 1 clear public source, make other public pages agree and log what current AI search answers actually show.",
  );
  assert.equal(await card.locator(".guide-card__link").textContent(), "Open guide →");
  await card.scrollIntoViewIfNeeded();
  await card.locator("img").waitFor({ state: "visible" });
  await card.locator("img").evaluate((image) => {
    if (image.complete && image.naturalWidth > 0) return;
    return new Promise((resolve, reject) => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", () => reject(new Error("Guide library card image failed to load.")), {
        once: true,
      });
    });
  });
  const cardImage = await card.locator("img").evaluate((image) => ({
    complete: image.complete,
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
    objectFit: getComputedStyle(image).objectFit,
  }));
  assert.deepEqual(cardImage, {
    complete: true,
    naturalWidth: 1280,
    naturalHeight: 720,
    objectFit: "cover",
  });
  assertReaderCleanup(await library.page.locator("body").innerText());
  assert.equal(
    await library.page.locator("body").evaluate((node) => node.scrollWidth <= node.clientWidth),
    true,
  );
  await card.screenshot({ path: "work/show-up-in-ai-search-library-card.png" });
  assert.deepEqual(library.diagnostics, []);
  await library.context.close();

  const hub = await createPage(1440, 1000, "reduce");
  const hubResponse = await hub.page.goto(`${base}/guides/content-and-creative-work.html`, {
    waitUntil: "networkidle",
  });
  assert.equal(hubResponse?.status(), 200);
  await assertNoFrameworkErrors(hub.page);
  const handoff = hub.page.locator(`a[href="${guidePath}"]`, { hasText: "Fix the source" });
  assert.equal(await handoff.count(), 1);
  assert.match(
    await hub.page.locator("body").innerText(),
    /I published the answer, but search misses it or points to an old or wrong page/,
  );
  assertReaderCleanup(await hub.page.locator("body").innerText());
  await handoff.screenshot({ path: "work/show-up-in-ai-search-hub-handoff.png" });
  assert.deepEqual(hub.diagnostics, []);
  await hub.context.close();

  const motion = await createPage(1440, 1000, "no-preference");
  const motionResponse = await motion.page.goto(`${base}${guidePath}`, { waitUntil: "networkidle" });
  assert.equal(motionResponse?.status(), 200);
  const progressAtTop = await motion.page
    .locator(".guide-progress > div")
    .evaluate((node) => getComputedStyle(node).transform);
  await motion.page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await motion.page.waitForTimeout(1000);
  const progressAtBottom = await motion.page
    .locator(".guide-progress > div")
    .evaluate((node) => getComputedStyle(node).transform);
  const revealOpacity = await motion.page.locator("[data-guide-reveal]").evaluateAll((elements) =>
    elements.map((element) => Number(getComputedStyle(element).opacity)),
  );
  assert.equal(revealOpacity.every((opacity) => opacity > 0.99), true);
  assert.notEqual(progressAtTop, progressAtBottom);
  assert.match(progressAtBottom, /^matrix\(/);
  const bottomScaleX = Number(progressAtBottom.slice(7, -1).split(",")[0]);
  assert.ok(bottomScaleX > 0.95, progressAtBottom);
  assert.notEqual(
    await motion.page.locator("[data-guide-image] img").evaluate((node) => getComputedStyle(node).transform),
    "none",
  );
  assert.deepEqual(motion.diagnostics, []);
  await motion.context.close();

  console.log(
    "Guide 5 browser QA passed on the published static guide, metadata, desktop/mobile hero crops, reduced-motion and GSAP states, capture fallback, PDF delivery, exactly 3 related guides, library card and Content and Creative Work hub route.",
  );
} finally {
  await browser.close();
}
