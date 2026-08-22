import { chromium } from "/Users/fatiha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(`console: ${message.text()}`);
});
page.on("response", (response) => {
  if (response.status() >= 400) errors.push(`http ${response.status()}: ${response.url()}`);
});

await page.goto("http://127.0.0.1:4173/guides/business-operations.html", { waitUntil: "networkidle" });

const focusSequence = [];
for (let index = 0; index < 12; index += 1) {
  await page.keyboard.press("Tab");
  focusSequence.push(await page.evaluate(() => ({
    tag: document.activeElement?.tagName,
    text: document.activeElement?.textContent?.trim().replace(/\s+/g, " ").slice(0, 80),
    aria: document.activeElement?.getAttribute("aria-label"),
  })));
  if ((await page.evaluate(() => document.activeElement?.textContent ?? "")).includes("Send me the worksheet")) break;
}

const triggerFocused = await page.evaluate(() => document.activeElement?.textContent?.includes("Send me the worksheet") ?? false);
await page.keyboard.press("Enter");
const dialog = page.getByRole("dialog");
await dialog.waitFor({ state: "visible" });
const focusStayedInDialog = [];
for (let index = 0; index < 10; index += 1) {
  await page.keyboard.press("Tab");
  focusStayedInDialog.push(await page.evaluate(() => {
    const dialogElement = document.querySelector("dialog[open]");
    return {
      inside: Boolean(dialogElement?.contains(document.activeElement)),
      tag: document.activeElement?.tagName,
      text: document.activeElement?.textContent?.trim().replace(/\s+/g, " ").slice(0, 80),
    };
  }));
}
await page.keyboard.press("Escape");
await dialog.waitFor({ state: "hidden" });
const focusReturned = await page.evaluate(() => document.activeElement?.textContent?.includes("Send me the worksheet") ?? false);

const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
const pdfResponse = await page.request.get("http://127.0.0.1:4173/downloads/business-operations-automation-map.pdf");

const related = page.locator('.more-guides__grid a.guide-card[href="/guides/stack-3-tool-ai-stack.html"]');
await related.scrollIntoViewIfNeeded();
await Promise.all([
  page.waitForURL("**/guides/stack-3-tool-ai-stack.html"),
  related.click(),
]);
await page.waitForLoadState("networkidle");
const destinationTitle = await page.locator("h1").innerText();

const results = {
  triggerFocused,
  focusSequence,
  focusTrap: focusStayedInDialog.every((item) => item.inside),
  focusStayedInDialog,
  focusReturned,
  canonical,
  ogImage,
  pdf: {
    status: pdfResponse.status(),
    contentType: pdfResponse.headers()["content-type"],
    bytes: (await pdfResponse.body()).length,
  },
  navigation: {
    url: page.url(),
    title: destinationTitle,
  },
  errors,
};

const assertions = {
  keyboardTrigger: triggerFocused,
  modalFocusTrap: results.focusTrap,
  modalFocusReturn: focusReturned,
  canonical: canonical === "https://www.shiftandlead.com/guides/business-operations.html",
  ogImage: ogImage === "https://www.shiftandlead.com/images/guides/business-operations.webp",
  pdf: results.pdf.status === 200 && results.pdf.contentType?.includes("application/pdf") && results.pdf.bytes === 120879,
  staticNavigation: results.navigation.url.endsWith("/guides/stack-3-tool-ai-stack.html") && results.navigation.title === "Build your 3-tool AI stack",
  diagnostics: errors.length === 0,
};

await browser.close();
console.log(JSON.stringify({ assertions, results }, null, 2));
if (Object.values(assertions).some((value) => !value)) process.exitCode = 1;
