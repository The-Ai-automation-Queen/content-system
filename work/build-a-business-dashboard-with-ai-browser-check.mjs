import { chromium } from "/Users/fatiha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import assert from "node:assert/strict";

const base = "http://127.0.0.1:4173";
const guidePath = "/guides/build-a-business-dashboard-with-ai.html";
const canonical = `https://www.shiftandlead.com${guidePath}`;
const buttonLabel = "Send me the dashboard workbook";
const signature = "The AI Automation Queen · Shift & Lead";
const expectedDescription =
  "Use approved business data to build 1 decision dashboard, check every result against its source and record who approves the final use.";
const expectedPromise =
  "Turn approved business data into 1 clear dashboard that helps a named person make 1 decision.";
const expectedCardSummary =
  "Turn approved business data into 1 tested dashboard for 1 named decision, then record who checks the calculations and approves its use.";
const expectedRelated = [
  "/guides/business-operations.html",
  "/guides/workflows-and-automation.html",
  "/guides/24-7-operations-system.html",
];
const captureDescription =
  "Enter your email to get the editable 4-sheet workbook. Download it immediately and use its decision brief, 12-row data dictionary, 10-test log and sign-off sheet to build 1 dashboard from approved business data.";
const downloadPath = "/downloads/business-dashboard-build-workbook.xlsx";
const downloadMime =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const downloadBytes = 13529;

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
    /\b(?:FREE|Updated|MIN READ|minute read|By Fatiha|Created by Fatiha)\b|The 99/i,
  );
  assert.doesNotMatch(
    text,
    /Lumail tag|guide_business_dashboard_workbook|guide\.build-a-business-dashboard-with-ai|datePublished|dateModified|readMinutes|formatLabel|\.source\.md|Source material|Source brief|Editorial brief/i,
  );
  assert.doesNotMatch(
    text,
    /Build 3 Codex Dashboards From Your Customer Data|codex-dashboards|learnaiwithmariah|Mariah Brunner|customer-location map|24-hour order heatmap|review-language word map/i,
  );
  assert.doesNotMatch(
    text,
    /\b(?:5\s*seconds?|5\s*[-–]\s*10\s*minutes?|30\s*minutes?)\b|premium interactive|premium look|Apple-like|Apple built|works? (?:on|with) (?:every|any) platform|paid plan/i,
  );
  assert.doesNotMatch(
    text,
    /\b\d+(?:\.\d+)?%\b|\b\d+(?:\.\d+)?\s*(?:x|times)\s+(?:more|better|faster|higher)\b|\b#1\b/i,
  );
}

async function assertNoInternalStoryLabels(page) {
  const labels = await page
    .locator("[data-guide-article] h1, [data-guide-article] h2, [data-guide-article] h3, [data-guide-article] h4, [data-guide-article] [class*='eyebrow']")
    .allTextContents();
  for (const label of labels.map((item) => item.trim())) {
    assert.doesNotMatch(label, /^(?:Success|Gap|Real problem|Systems|Transformation|Open loop)$/i);
  }
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

function assertPlaceholderImageLoads(facts) {
  assert.equal(facts.complete, true);
  assert.equal(facts.naturalWidth, 1280);
  assert.equal(facts.naturalHeight, 720);
  assert.equal(facts.objectFit, "cover");
  assert.equal(
    facts.alt,
    "The small blue robot mascot checks blank ivory data cards through a brass gauge before they reach 1 clear decision panel",
  );
  assert.ok(facts.rendered.width > 0 && facts.rendered.height > 0);

  // The current artwork is an explicit release placeholder. Its crop is not a
  // Guide 6 acceptance gate; final crop-safe artwork will be checked separately.
}

async function assertDialogFocusTrap(page, dialog) {
  for (let index = 0; index < 7; index += 1) {
    await page.keyboard.press("Tab");
    assert.equal(await dialog.evaluate((node) => node.contains(document.activeElement)), true);
  }
  for (let index = 0; index < 4; index += 1) {
    await page.keyboard.press("Shift+Tab");
    assert.equal(await dialog.evaluate((node) => node.contains(document.activeElement)), true);
  }
}

try {
  const desktop = await createPage(1440, 1000, "reduce");
  const response = await desktop.page.goto(`${base}${guidePath}`, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200);
  assert.equal(response?.headers()["content-type"]?.includes("text/html"), true);
  assert.equal(await desktop.page.title(), "Build a business dashboard with AI | Shift & Lead");
  assert.equal(
    await desktop.page.locator('meta[name="description"]').getAttribute("content"),
    expectedDescription,
  );
  assert.equal(await desktop.page.locator('link[rel="canonical"]').getAttribute("href"), canonical);
  assert.equal(await desktop.page.locator('meta[name="author"]').getAttribute("content"), signature);
  assert.equal(await desktop.page.locator('meta[name="creator"]').getAttribute("content"), signature);
  assert.equal(
    await desktop.page.locator('meta[name="publisher"]').getAttribute("content"),
    "Shift & Lead",
  );
  assert.equal(await desktop.page.locator('meta[property="og:url"]').getAttribute("content"), canonical);
  assert.equal(
    await desktop.page.locator('meta[property="og:image"]').getAttribute("content"),
    "https://www.shiftandlead.com/images/guides/build-a-business-dashboard-with-ai.webp",
  );
  assert.equal(await desktop.page.locator('meta[property="og:image:width"]').getAttribute("content"), "1280");
  assert.equal(await desktop.page.locator('meta[property="og:image:height"]').getAttribute("content"), "720");
  await assertNoFrameworkErrors(desktop.page);

  assert.equal(await desktop.page.locator("h1").textContent(), "Build a business dashboard with AI");
  assert.equal(
    await desktop.page.locator("[data-guide-hero-copy] > p").first().textContent(),
    signature,
  );
  assert.equal(
    await desktop.page.locator("[data-guide-hero-copy] > p").nth(1).textContent(),
    expectedPromise,
  );
  assert.equal(
    await desktop.page.locator("[data-guide-hero-copy]").getByText(
      "Business dashboard build workbook. Use it when you have an approved business export or table and need 1 tested dashboard for a named decision.",
      { exact: true },
    ).count(),
    1,
  );
  assert.equal(
    await desktop.page.getByRole("button", { name: buttonLabel, exact: true }).first().textContent(),
    buttonLabel,
  );
  assert.equal(
    await desktop.page.getByRole("button", { name: buttonLabel, exact: true }).count(),
    1,
  );
  assert.equal(await desktop.page.locator("dialog.guide-capture").count(), 1);
  assertPlaceholderImageLoads(await heroCropFacts(desktop.page));
  assert.equal(
    await desktop.page.locator("main").evaluate((node) => node.scrollWidth <= node.clientWidth),
    true,
  );

  const readerText = await desktop.page.locator("body").innerText();
  assertReaderCleanup(readerText);
  await assertNoInternalStoryLabels(desktop.page);
  assert.equal(
    await desktop.page
      .locator(".article-credit, .source-label, [data-source-label], [data-editorial-source]")
      .count(),
    0,
  );
  assert.match(readerText, /Start with the decision, not the chart/);
  assert.match(readerText, /Build 1 decision dashboard in 6 steps/);
  assert.match(readerText, /Use only a dashboard you can trace and explain/);
  assert.equal(await desktop.page.locator("#guide-commercial-title").count(), 0);
  assert.equal(
    await desktop.page
      .locator('[data-guide-article] a')
      .filter({ hasText: /^(?:Work with me|Book a call|Apply now|Hire me)$/i })
      .count(),
    0,
  );
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
    "Choose what the dashboard needs next.",
  );
  assert.deepEqual(
    await desktop.page.locator(".more-guides__grid .guide-card__brand").allTextContents(),
    [signature, signature, signature],
  );

  const trigger = desktop.page.getByRole("button", { name: buttonLabel, exact: true }).first();
  await trigger.focus();
  await desktop.page.keyboard.press("Enter");
  const dialog = desktop.page.locator("dialog[open]");
  await dialog.waitFor();
  assert.equal(await dialog.getByRole("heading").textContent(), "Get the business dashboard build workbook");
  assert.equal(await dialog.locator(".guide-capture__content > p").textContent(), captureDescription);
  assert.equal(await dialog.getByLabel("Email address").getAttribute("placeholder"), "you@example.com");
  assert.equal(
    await dialog.locator("small").textContent(),
    "You will also receive practical Shift & Lead emails. Unsubscribe at any time.",
  );
  assert.equal(await desktop.page.evaluate(() => document.activeElement?.getAttribute("type")), "email");
  await assertDialogFocusTrap(desktop.page, dialog);
  await desktop.page.keyboard.press("Escape");
  assert.equal(await desktop.page.locator("dialog[open]").count(), 0);
  assert.equal(await trigger.evaluate((node) => document.activeElement === node), true);
  assert.deepEqual(desktop.diagnostics, []);

  await desktop.page.route("**/api/guide-capture", async (route) => {
    assert.deepEqual(route.request().postDataJSON(), {
      email: "reader@example.com",
      website: "",
      guideSlug: "build-a-business-dashboard-with-ai",
      source: guidePath,
    });
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
  assert.equal(await fallback.getAttribute("href"), downloadPath);
  assert.equal(await fallback.getAttribute("download"), "");
  await dialog.getByRole("button", { name: "Close" }).click();

  const workbookResponse = await desktop.context.request.get(`${base}${downloadPath}`);
  assert.equal(workbookResponse.status(), 200);
  assert.equal((workbookResponse.headers()["content-type"] || "").split(";")[0], downloadMime);
  assert.equal((await workbookResponse.body()).byteLength, downloadBytes);

  await desktop.page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await desktop.page.screenshot({ path: "work/build-a-business-dashboard-with-ai-hero-desktop.png" });
  await desktop.page.screenshot({ path: "work/build-a-business-dashboard-with-ai-desktop.png", fullPage: true });
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
  assertPlaceholderImageLoads(await heroCropFacts(mobile.page));
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
  await mobile.page.screenshot({ path: "work/build-a-business-dashboard-with-ai-hero-mobile.png" });
  await mobile.page.screenshot({ path: "work/build-a-business-dashboard-with-ai-mobile.png", fullPage: true });
  assert.deepEqual(mobile.diagnostics, []);
  await mobile.context.close();

  const library = await createPage(1440, 1000, "reduce");
  const libraryResponse = await library.page.goto(`${base}/guides/`, { waitUntil: "networkidle" });
  assert.equal(libraryResponse?.status(), 200);
  await assertNoFrameworkErrors(library.page);
  const card = library.page
    .locator(`a[href="${guidePath}"]`)
    .filter({ hasText: "Build a business dashboard with AI" });
  assert.equal(await card.count(), 1);
  assert.equal(await card.evaluate((node) => node.tagName), "A");
  assert.equal(await card.getAttribute("aria-label"), "Open guide: Build a business dashboard with AI");
  assert.equal(await card.locator(".guide-card__art h2").textContent(), "Build a business dashboard with AI");
  assert.equal(await card.locator(".guide-card__brand").textContent(), signature);
  assert.equal(await card.locator(".guide-card__level").textContent(), "Expert");
  assert.equal(await card.locator(".guide-card__body > p").textContent(), expectedCardSummary);
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
  const cardImage = await card.locator("img").evaluate((image) => {
    const imageBox = image.getBoundingClientRect();
    return {
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      objectFit: getComputedStyle(image).objectFit,
      objectPosition: getComputedStyle(image).objectPosition,
      aspectRatio: imageBox.width / imageBox.height,
    };
  });
  assert.equal(cardImage.complete, true);
  assert.equal(cardImage.naturalWidth, 1280);
  assert.equal(cardImage.naturalHeight, 720);
  assert.equal(cardImage.objectFit, "cover");
  assert.ok(Math.abs(cardImage.aspectRatio - 16 / 9) < 0.02, JSON.stringify(cardImage));

  const expertButton = library.page
    .getByRole("group", { name: "Filter guides by experience level" })
    .getByRole("button", { name: /Expert/, exact: false });
  await expertButton.click();
  assert.equal(await card.count(), 1);
  const operationsButton = library.page
    .getByRole("group", { name: "Filter guides by outcome" })
    .getByRole("button", { name: /Run business operations/, exact: false });
  assert.equal(await operationsButton.locator(".hub-nav__hub").textContent(), "Business operations");
  await operationsButton.click();
  assert.equal(await card.count(), 1);
  assertReaderCleanup(await library.page.locator("body").innerText());
  assert.equal(
    await library.page.locator("body").evaluate((node) => node.scrollWidth <= node.clientWidth),
    true,
  );
  await card.screenshot({ path: "work/build-a-business-dashboard-with-ai-library-card.png" });
  assert.deepEqual(library.diagnostics, []);
  await library.context.close();

  const hub = await createPage(1440, 1000, "reduce");
  const hubResponse = await hub.page.goto(`${base}/guides/business-operations.html`, {
    waitUntil: "networkidle",
  });
  assert.equal(hubResponse?.status(), 200);
  await assertNoFrameworkErrors(hub.page);
  const handoff = hub.page.locator(`a[href="${guidePath}"]`, { hasText: "Build the decision dashboard" });
  assert.equal(await handoff.count(), 1);
  assert.match(
    await hub.page.locator("body").innerText(),
    /I have approved business data but no clear view for the decision/,
  );
  assert.equal((await handoff.innerText()).trim(), "Build the decision dashboard →");
  assertReaderCleanup(await hub.page.locator("body").innerText());
  await handoff.screenshot({ path: "work/build-a-business-dashboard-with-ai-hub-handoff.png" });
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
    "Guide 6 non-cover browser QA passed on the published static guide, exact metadata and copy contract, desktop/mobile/card image loading and layout, reduced-motion and GSAP states, keyboard-safe capture fallback, exact XLSX delivery, exactly 3 related guides, library Expert/Business operations classification, brand attribution and Business operations task route. The explicit placeholder cover crop is deferred.",
  );
} finally {
  await browser.close();
}
