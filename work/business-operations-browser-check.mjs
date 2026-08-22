import { chromium } from "/Users/fatiha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";

const base = process.env.GUIDE_AUDIT_BASE ?? "http://127.0.0.1:4173";
const executablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({ headless: true, executablePath });
const results = {};

function attachDiagnostics(page, bucket) {
  page.on("console", (message) => {
    if (message.type() === "error") bucket.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => bucket.push(`pageerror: ${error.message}`));
  page.on("response", (response) => {
    if (response.status() >= 400) bucket.push(`http ${response.status()}: ${response.url()}`);
  });
  page.on("requestfailed", (request) => {
    const reason = request.failure()?.errorText ?? "";
    if (!reason.includes("ERR_ABORTED")) bucket.push(`requestfailed: ${request.url()} ${reason}`);
  });
}

async function inspectGuide(name, viewport, screenshotPath, testModal) {
  const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
  const diagnostics = [];
  attachDiagnostics(page, diagnostics);
  const response = await page.goto(`${base}/guides/business-operations.html`, { waitUntil: "networkidle" });
  const h1 = await page.locator("h1").innerText();
  const bodyText = await page.locator("body").innerText();
  const heroImage = await page.locator("[data-guide-hero] img").evaluate((image) => ({
    complete: image.complete,
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
    objectPosition: getComputedStyle(image).objectPosition,
  }));
  const pathwayHrefs = await page.locator('[aria-labelledby="guide-framework-title"] a').evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")),
  );
  const relatedHrefs = await page.locator('.more-guides__grid a.guide-card').evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")),
  );
  const ctaHref = await page.getByRole("link", { name: /Build my 1st automation/ }).getAttribute("href");
  const overflow = await page.evaluate(() => ({
    innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 350));
    window.scrollTo(0, 0);
  });
  const visibleImages = await page.locator("img").evaluateAll((images) => images.map((image) => ({
    src: image.getAttribute("src"),
    complete: image.complete,
    naturalWidth: image.naturalWidth,
  })));

  let modal = null;
  if (testModal) {
    await page.getByRole("button", { name: "Send me the automation priority worksheet" }).click();
    const dialog = page.getByRole("dialog");
    modal = {
      visible: await dialog.isVisible(),
      title: await dialog.getByRole("heading").innerText(),
      emailVisible: await dialog.locator('input[type="email"]').isVisible(),
    };
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
    modal.closedWithEscape = true;
  }

  await page.screenshot({ path: screenshotPath, fullPage: true });
  results[name] = {
    status: response?.status(),
    h1,
    heroImage,
    pathwayHrefs,
    relatedHrefs,
    ctaHref,
    overflow,
    imagesLoaded: visibleImages.every((image) => image.complete && image.naturalWidth > 0),
    modal,
    counts: {
      pathways: await page.locator('[aria-labelledby="guide-framework-title"] a').count(),
      levels: {
        Beginner: (bodyText.match(/Beginner/gi) ?? []).length,
        Intermediate: (bodyText.match(/Intermediate/gi) ?? []).length,
        Expert: (bodyText.match(/Expert/gi) ?? []).length,
      },
      worksheetBlocks: await page.locator("dl").filter({ hasText: "5 real tasks" }).locator("div").count(),
    },
    exactText: {
      capture: bodyText.includes("Send me the automation priority worksheet"),
      directAnswer: bodyText.includes("Use real records, not guesses"),
      example: bodyText.includes("Choose the next Shift & Lead operations build"),
      relatedHeading: bodyText.includes("Choose what to fix next."),
      brand: await page.locator("[data-guide-hero-copy] p").first().evaluate((element) => element.textContent?.trim()) === "The AI Automation Queen",
      forbiddenMetadata: ["MIN READ", "Updated", "FREE GUIDE", "FREE SETUP"].filter((text) => bodyText.includes(text)),
    },
    diagnostics,
  };
  await page.close();
}

await inspectGuide("desktop", { width: 1440, height: 1000 }, "/private/tmp/business-operations-desktop.png", true);
await inspectGuide("mobile", { width: 390, height: 844 }, "/private/tmp/business-operations-mobile.png", false);

{
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  const diagnostics = [];
  attachDiagnostics(page, diagnostics);
  const response = await page.goto(`${base}/guides/`, { waitUntil: "networkidle" });
  const card = page.locator('a.guide-card[href="/guides/business-operations.html"]');
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);
  const cardData = await card.evaluate((element) => {
    const art = element.querySelector(".guide-card__art");
    const title = element.querySelector(".guide-card__body h2");
    const image = element.querySelector("img");
    const cardRect = element.getBoundingClientRect();
    const artRect = art.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    return {
      tagName: element.tagName,
      ariaLabel: element.getAttribute("aria-label"),
      cardHeight: cardRect.height,
      titleBelowArt: titleRect.top >= artRect.bottom - 1,
      imageLoaded: image.complete && image.naturalWidth > 0,
      brand: element.querySelector(".guide-card__brand")?.textContent,
      title: element.querySelector("h2")?.textContent,
      summary: element.querySelector(".guide-card__body p")?.textContent,
      action: element.querySelector(".guide-card__link")?.textContent,
    };
  });
  const requiredTools = ["chatgpt", "claude", "gemini", "copilot", "grok", "meta-ai", "deepseek", "kimi", "manus", "mistral"];
  const toolCards = {};
  for (const slug of requiredTools) {
    toolCards[slug] = await page.locator(`a.guide-card[href="/guides/${slug}.html"]`).count();
  }
  const bodyText = await page.locator("body").innerText();
  const overflow = await page.evaluate(() => ({ innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  await page.screenshot({ path: "/private/tmp/business-operations-library.png", fullPage: true });
  results.library = {
    status: response?.status(),
    cardCount: await card.count(),
    cardData,
    brokenImages: await page.locator("img").evaluateAll((images) => images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.getAttribute("src"))),
    toolCards,
    noThe99: !bodyText.includes("The 99"),
    noFreeOrReadTime: !/\bFREE\b|\bMIN READ\b/.test(bodyText),
    overflow,
    diagnostics,
  };
  await page.close();
}

const expectedPathways = [
  "/guides/stack-3-tool-ai-stack.html",
  "/guides/follow-up-setup.html",
  "/guides/inbox-manager-setup.html",
  "/guides/first-ai-employee.html",
  "/guides/24-7-operations-system.html",
];
const expectedRelated = [
  "/guides/stack-3-tool-ai-stack.html",
  "/guides/follow-up-setup.html",
  "/guides/24-7-operations-system.html",
];

const assertions = {
  statuses: results.desktop.status === 200 && results.mobile.status === 200 && results.library.status === 200,
  title: results.desktop.h1 === "Run business operations in the right order" && results.mobile.h1 === results.desktop.h1,
  hero: [results.desktop, results.mobile].every((result) => result.heroImage.complete && result.heroImage.naturalWidth === 1280 && result.heroImage.naturalHeight === 720),
  focalPoint: results.desktop.heroImage.objectPosition.startsWith("82%"),
  noOverflow: [results.desktop, results.mobile].every((result) => result.overflow.scrollWidth <= result.overflow.innerWidth) && results.library.overflow.scrollWidth <= results.library.overflow.innerWidth,
  pathways: JSON.stringify(results.desktop.pathwayHrefs) === JSON.stringify(expectedPathways),
  related: JSON.stringify(results.desktop.relatedHrefs) === JSON.stringify(expectedRelated),
  capture: results.desktop.modal?.visible && results.desktop.modal?.emailVisible && results.desktop.modal?.closedWithEscape && results.desktop.modal?.title === "Get the worksheet: What to automate first",
  cta: results.desktop.ctaHref === "/build-sprint.html",
  text: Object.entries(results.desktop.exactText).every(([key, value]) => key === "forbiddenMetadata" ? value.length === 0 : value === true),
  images: results.desktop.imagesLoaded && results.mobile.imagesLoaded,
  libraryCard: results.library.cardCount === 1 && results.library.cardData.tagName === "A" && results.library.cardData.titleBelowArt && results.library.cardData.imageLoaded && results.library.cardData.brand === "The AI Automation Queen" && results.library.cardData.action.includes("Open guide") && results.library.brokenImages.length === 0,
  tools: Object.values(results.library.toolCards).every((count) => count === 1),
  libraryCleanup: results.library.noThe99 && results.library.noFreeOrReadTime,
  diagnostics: [...results.desktop.diagnostics, ...results.mobile.diagnostics, ...results.library.diagnostics].length === 0,
};

await browser.close();
console.log(JSON.stringify({ assertions, results }, null, 2));
if (Object.values(assertions).some((value) => !value)) process.exitCode = 1;
