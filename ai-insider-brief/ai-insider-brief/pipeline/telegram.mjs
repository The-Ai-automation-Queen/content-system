// Telegram API helpers for AI Insider Brief approval bot
// Same patterns as research-bot/telegram.mjs — native fetch, no libraries

var BASE_URL;

export function init(botToken) {
  BASE_URL = 'https://api.telegram.org/bot' + botToken;
}

export async function sendMessage(chatId, text, options) {
  var body = {
    chat_id: chatId,
    text: text,
    parse_mode: 'HTML'
  };
  if (options && options.reply_markup) {
    body.reply_markup = options.reply_markup;
  }
  var r = await fetch(BASE_URL + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  var d = await r.json();
  if (!d.ok) {
    console.error('[TELEGRAM] sendMessage failed:', d.description);
  }
  return d;
}

export async function sendMessageWithButtons(chatId, text, buttons) {
  var reply_markup = {
    inline_keyboard: [buttons.map(function(btn) {
      return { text: btn.text, callback_data: btn.callback_data };
    })]
  };
  var result = await sendMessage(chatId, text, { reply_markup: reply_markup });
  return result.result; // Return the message object directly
}

export async function editMessage(chatId, messageId, text) {
  var body = {
    chat_id: chatId,
    message_id: messageId,
    text: text,
    parse_mode: 'HTML'
  };
  var r = await fetch(BASE_URL + '/editMessageText', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  var d = await r.json();
  if (!d.ok) {
    console.error('[TELEGRAM] editMessage failed:', d.description);
  }
  return d;
}

export async function answerCallbackQuery(queryId, text) {
  var body = {
    callback_query_id: queryId
  };
  if (text) {
    body.text = text;
  }
  var r = await fetch(BASE_URL + '/answerCallbackQuery', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  var d = await r.json();
  if (!d.ok) {
    console.error('[TELEGRAM] answerCallbackQuery failed:', d.description);
  }
  return d;
}

export async function getUpdates(offset) {
  try {
    var r = await fetch(BASE_URL + '/getUpdates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        offset: offset,
        timeout: 30
      }),
      signal: AbortSignal.timeout(35000)
    });
    var d = await r.json();
    return d.ok ? d.result : [];
  } catch (err) {
    console.error('[TELEGRAM] getUpdates error:', err.message);
    return [];
  }
}
