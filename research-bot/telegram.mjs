import { config } from "./config.mjs";

const API = `https://api.telegram.org/bot${config.telegramToken}`;

export async function sendMessage(text, opts = {}) {
  const body = {
    chat_id: config.chatId,
    text,
    parse_mode: "HTML",
    ...opts,
  };
  const r = await fetch(`${API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return r.json();
}

export async function sendProcessing(linkType) {
  return sendMessage(`Processing ${linkType} link...`);
}

export async function editMessage(messageId, text) {
  const body = {
    chat_id: config.chatId,
    message_id: messageId,
    text,
    parse_mode: "HTML",
  };
  const r = await fetch(`${API}/editMessageText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return r.json();
}

let offset = 0;

export async function getUpdates() {
  try {
    const r = await fetch(
      `${API}/getUpdates?offset=${offset + 1}&timeout=3`,
      { signal: AbortSignal.timeout(10000) }
    );
    const d = await r.json();
    if (d.ok && d.result.length > 0) {
      offset = d.result[d.result.length - 1].update_id;
    }
    return d.ok ? d.result : [];
  } catch {
    return [];
  }
}
