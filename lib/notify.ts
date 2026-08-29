// Sends a live push notification via ntfy.sh (free, no account required).
// You subscribe to a private topic name from the ntfy app on your phone or
// desktop, and this fires an HTTP POST whenever someone submits a form.
// See README.md for setup instructions.
//
// This is intentionally best-effort: if NTFY_TOPIC isn't configured, or the
// request to ntfy fails for any reason, we swallow the error. A missed push
// notification should never cause a real form submission to fail — the
// database write (which already succeeded before this is called) is the
// source of truth.
//
// IMPORTANT: HTTP header values can only contain basic Latin characters
// (code points 0–255) — things like em dashes (—), curly quotes ("), or
// non-Latin scripts will crash the request entirely. Only the *body* of the
// notification (the `message`) can safely contain any Unicode text (e.g. a
// name typed in Urdu). Title and Tags go out as headers, so we strip
// anything unsafe from them automatically here as a safety net.

function toSafeHeaderValue(value: string): string {
  // Replace common "smart" punctuation with plain ASCII equivalents, then
  // drop anything else outside the Latin-1 header-safe range.
  return value
    .replace(/[\u2012-\u2015]/g, "-") // en/em dashes → hyphen
    .replace(/[\u2018\u2019]/g, "'") // curly single quotes
    .replace(/[\u201C\u201D]/g, '"') // curly double quotes
    .replace(/[\u2026]/g, "...") // ellipsis
    .split("")
    .filter((ch) => ch.charCodeAt(0) <= 255)
    .join("");
}

export async function sendPushNotification(params: {
  title: string;
  message: string;
  tags?: string;
  priority?: 1 | 2 | 3 | 4 | 5;
}) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) return;

  const server = process.env.NTFY_SERVER || "https://ntfy.sh";

  try {
    await fetch(`${server}/${topic}`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Title: toSafeHeaderValue(params.title),
        Priority: String(params.priority ?? 4),
        ...(params.tags ? { Tags: toSafeHeaderValue(params.tags) } : {}),
      },
      body: params.message, // body supports full Unicode — no sanitization needed
    });
  } catch (err) {
    console.error("Push notification failed (submission was still saved):", err);
  }
}
