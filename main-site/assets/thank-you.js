// Thank-you page after a Stripe checkout: confirm the order, show download buttons, email the links once.
(() => {
  const $ = (id) => document.getElementById(id);
  const sessionId = new URLSearchParams(location.search).get("session_id") || "";
  const status = $("ty-status");

  const fail = (message) => {
    $("ty-sub").textContent = "We need one more moment.";
    status.textContent = message;
  };

  if (!sessionId) return fail("This page opens after a purchase. Use the link in your email to download your workbook.");

  fetch(`/api/purchase?session_id=${encodeURIComponent(sessionId)}`)
    .then(async (res) => ({ ok: res.ok, data: await res.json().catch(() => ({})) }))
    .then(({ ok, data }) => {
      if (!ok) return fail(data.error || "We could not check your order. Please refresh this page.");
      const several = data.workbooks.length > 1;
      $("ty-hello").textContent = data.name ? `Thank you, ${data.name}.` : "Thank you.";
      $("ty-sub").textContent = several ? "Your workbooks are ready." : "Your workbook is ready.";
      status.textContent = several ? "Download each one below." : "Download it below.";
      const list = $("ty-downloads");
      list.innerHTML = data.workbooks.map((w) =>
        `<li><span>${w.title}</span><a class="sk-pill sk-pill-ink" href="/api/download?session_id=${encodeURIComponent(sessionId)}&amp;file=${w.key}"><span>Download PDF</span></a></li>`).join("");
      list.hidden = false;
      $("ty-tips").hidden = false;
      sendEmailOnce(data.email);
    })
    .catch(() => fail("We could not check your order. Please refresh this page."));

  function sendEmailOnce(email) {
    const note = $("ty-email");
    const key = `ty-email-${sessionId}`;
    let sent = false;
    try { sent = localStorage.getItem(key) === "1"; } catch (e) {}
    const show = (text) => { note.textContent = text; note.hidden = false; };
    if (sent) return show(`We also emailed the download ${email ? `link to ${email}` : "link"}.`);
    fetch("/api/purchase-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ session_id: sessionId }) })
      .then((res) => {
        if (!res.ok) throw new Error();
        try { localStorage.setItem(key, "1"); } catch (e) {}
        show(`We also emailed the download link to ${email}, so you can download again later.`);
      })
      .catch(() => show("Keep this page open until your download finishes. Bookmark it to download again later."));
  }
})();
