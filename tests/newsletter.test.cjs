const test = require("node:test");
const assert = require("node:assert/strict");
const handler = require("../main-site/api/newsletter");

function response() {
  return {
    code: 200,
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.code = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

function request(body) {
  return { method: "POST", headers: { origin: "https://www.shiftandlead.com" }, body };
}

test("newsletter requires explicit marketing consent and valid email", async () => {
  const previousToken = process.env.LUMAIL_API_TOKEN;
  const previousFetch = global.fetch;
  process.env.LUMAIL_API_TOKEN = "test";
  global.fetch = () => { throw new Error("Fetch should not be called"); };
  try {
    for (const [body, code] of [
      [{ email: "reader@example.com" }, 400],
      [{ email: "reader@example.com", marketingConsent: "true" }, 400],
      [{ email: "bad", marketingConsent: true }, 400],
    ]) {
      const result = response();
      await handler(request(body), result);
      assert.equal(result.code, code);
    }
  } finally {
    global.fetch = previousFetch;
    if (previousToken === undefined) delete process.env.LUMAIL_API_TOKEN;
    else process.env.LUMAIL_API_TOKEN = previousToken;
  }
});

test("newsletter sends one marketing-tagged subscriber to Lumail without guide delivery", async () => {
  const previousToken = process.env.LUMAIL_API_TOKEN;
  const previousFetch = global.fetch;
  process.env.LUMAIL_API_TOKEN = "test";
  let payload;
  global.fetch = async (url, options) => {
    assert.equal(url, "https://lumail.io/api/v1/subscribers");
    payload = JSON.parse(options.body);
    return { ok: true, status: 200 };
  };
  try {
    const result = response();
    await handler(request({ email: " Reader@Example.com ", firstName: " Ada ", marketingConsent: true, source: "forged", timestamp: "forged" }), result);
    assert.equal(result.code, 200);
    assert.deepEqual(result.body, { success: true });
    assert.equal(payload.email, "reader@example.com");
    assert.equal(payload.name, "Ada");
    assert.deepEqual(payload.tags, ["shift-and-lead-newsletter"]);
    assert.equal(payload.fields.source, "/");
    assert.equal(payload.fields.marketing_consent, "true");
    assert.notEqual(payload.fields.consent_timestamp, "forged");
    assert.equal(payload.fields.guide_url, undefined);
    assert.equal(payload.resubscribe, false);
  } finally {
    global.fetch = previousFetch;
    if (previousToken === undefined) delete process.env.LUMAIL_API_TOKEN;
    else process.env.LUMAIL_API_TOKEN = previousToken;
  }
});

test("newsletter reports Lumail failure without claiming signup succeeded", async () => {
  const previousToken = process.env.LUMAIL_API_TOKEN;
  const previousFetch = global.fetch;
  process.env.LUMAIL_API_TOKEN = "test";
  global.fetch = async () => ({ ok: false, status: 500 });
  try {
    const result = response();
    await handler(request({ email: "reader@example.com", marketingConsent: true }), result);
    assert.equal(result.code, 502);
  } finally {
    global.fetch = previousFetch;
    if (previousToken === undefined) delete process.env.LUMAIL_API_TOKEN;
    else process.env.LUMAIL_API_TOKEN = previousToken;
  }
});
