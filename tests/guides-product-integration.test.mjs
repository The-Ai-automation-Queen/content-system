import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const productHref = "/workbooks/find-your-zone-of-genius.html";

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

test("the Guides page has one vertical Zone of Genius product card near the bottom", () => {
  const source = read("next-app/app/guides/page.tsx");
  const deployed = read("main-site/guides/index.html");

  for (const [label, page, libraryMarker] of [
    ["source", source, "GuideLibrary"],
    ["deployed page", deployed, 'class="library'],
  ]) {
    assert.equal(count(page, 'data-zone-genius-card="true"'), 1, `${label} should contain one product card`);
    assert.match(page, /Find Your Zone of Genius/);
    assert.match(page, /Use your own life as evidence\. Let AI find the patterns\. Leave with a direction you can explain and test\./);
    assert.match(page, /Start my private reflection/);
    assert.match(page, new RegExp(`href=["']${productHref.replaceAll("/", "\\/")}["']`));
    assert.ok(
      page.indexOf('data-zone-genius-card="true"') > page.indexOf(libraryMarker),
      `${label} should place the card after the guide library`,
    );
  }

  const css = read("next-app/app/globals.css");
  assert.match(css, /\.zone-genius-card\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s);
});

const invitations = {
  "ai-essentials.html": {
    heading: "Learning AI is one part of staying relevant. Knowing what is yours is the next.",
    body: "If the tools are changing faster than your sense of direction, start with your own evidence. Find Your Zone of Genius helps you see what repeats across your life and choose one direction to test.",
    gateId: "guide-access-title-ai-essentials",
    emailId: "guide-email-ai-essentials",
  },
  "get-better-at-ai.html": {
    heading: "AI can improve the task. It still needs something worth building around.",
    body: "Bring together the work people trust you with, the effort that gives you energy and the experience only you have lived. Then let AI compare the patterns without deciding who you are.",
    gateId: "guide-access-title-get-better-at-ai",
    emailId: "guide-email-get-better-at-ai",
  },
  "build-taste-with-ai.html": {
    heading: "Your taste did not appear from nowhere.",
    body: "It was shaped by years of choices, failures, interests and things you learned to notice. Find Your Zone of Genius helps you trace those clues and turn them into a direction you can test.",
    gateId: "guide-access-title-build-taste-with-ai",
    emailId: "guide-email-build-taste-with-ai",
  },
};

test("exactly three approved guide invitations appear after the guide and before related guides without replacing gates", () => {
  const guideFiles = readdirSync(new URL("../main-site/guides/", import.meta.url))
    .filter((file) => file.endsWith(".html") && file !== "index.html");
  let totalInvitations = 0;

  for (const file of guideFiles) {
    const page = read(`main-site/guides/${file}`);
    const invitationCount = count(page, 'data-zone-genius-invitation="true"');
    totalInvitations += invitationCount;

    if (!(file in invitations)) {
      assert.equal(invitationCount, 0, `${file} must not receive a contextual product invitation`);
      continue;
    }

    const approved = invitations[file];
    assert.equal(invitationCount, 1, `${file} should contain one invitation`);
    assert.ok(page.includes(approved.heading), `${file} should use the approved heading`);
    assert.ok(page.includes(approved.body), `${file} should use the approved body`);
    assert.equal(count(page, `href="${productHref}"`), 1, `${file} should link once to the product page`);
    assert.equal(count(page, "Start my private reflection"), 1, `${file} should use the approved CTA once`);

    const articleEnd = page.indexOf("</article>");
    const invitation = page.indexOf('data-zone-genius-invitation="true"');
    const related = page.indexOf('<section class="more-guides');
    assert.ok(articleEnd < invitation, `${file} invitation should follow the useful guide ending`);
    assert.ok(invitation < related, `${file} invitation should precede related guides`);

    assert.equal(count(page, `id="${approved.gateId}"`), 1, `${file} should preserve its access gate`);
    assert.equal(count(page, `id="${approved.emailId}"`), 1, `${file} should preserve its email input`);
    assert.equal(count(page, "You will also receive practical Shift &amp; Lead emails. Unsubscribe at any time."), 1, `${file} should preserve gate consent copy`);
  }

  assert.equal(totalInvitations, 3, "active guide surfaces should contain exactly three invitations");
});

test("active guide surfaces contain no stale price or obsolete newsletter promotion", () => {
  const activeSurfaces = readdirSync(new URL("../main-site/guides/", import.meta.url))
    .filter((file) => file.endsWith(".html"))
    .map((file) => `main-site/guides/${file}`);
  const obsolete = [/US\$99/i, /\$99\b/, /AI Insider (?:Brief )?newsletter/i, /subscribe to (?:the|our) newsletter/i];

  for (const surface of activeSurfaces) {
    const page = read(surface);
    for (const pattern of obsolete) {
      assert.doesNotMatch(page, pattern, `${surface} should not contain ${pattern}`);
    }
  }
});
