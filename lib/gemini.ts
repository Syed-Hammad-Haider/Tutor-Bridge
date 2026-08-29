// Shared Gemini (Google Generative Language API) client.
//
// IMPORTANT: this file is server-only. GEMINI_API_KEY must never be
// imported into a "use client" component or exposed in any response sent
// to the browser — every call to Gemini happens here, on the server, and
// only the resulting text (or a generic error) goes back to the client.

// As of August 2026, Google's Gemini 2.x models are being phased out for
// new users (2.5-flash already returns 404 for new keys). gemini-3.6-flash
// is the current stable, generally-available, cost-effective choice — see
// Google's own error message when an old model is used, and
// ai.google.dev/gemini-api/docs/models for the current lineup, since this
// changes over time.
export const DEFAULT_GEMINI_MODEL = "gemini-3.6-flash";

export type GeminiMessage = { role: "user" | "assistant" | "model"; content: string };

export type GeminiResult =
  | { ok: true; text: string; model: string }
  | { ok: false; status: number; errorText: string; model: string; stage: "config" | "network" | "http" | "empty" };

/**
 * Calls Gemini's generateContent endpoint and normalizes the result.
 * Never throws — always returns a GeminiResult so callers can handle
 * failure uniformly (and so the diagnostic route can surface exactly what
 * went wrong to an authenticated admin without ever leaking the key).
 */
export async function callGemini(
  messages: GeminiMessage[],
  systemPrompt: string,
  opts?: { maxOutputTokens?: number }
): Promise<GeminiResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;

  if (!apiKey) {
    return { ok: false, status: 0, errorText: "GEMINI_API_KEY is not set.", model, stage: "config" };
  }

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : m.role,
    parts: [{ text: m.content }],
  }));

  // Gemini REST API — note all top-level fields are camelCase
  // (systemInstruction, generationConfig), unlike some other providers'
  // snake_case conventions. Getting this wrong causes a 400 with no
  // helpful client-side symptom other than "assistant unavailable".
  //
  // temperature/topP/topK are deliberately NOT set here — Gemini 3.x models
  // (3.5/3.6/3.7 Flash) deprecated and silently ignore them; Google's
  // current guidance is to shape behavior via system instructions instead.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent?key=${encodeURIComponent(apiKey)}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: {
          maxOutputTokens: opts?.maxOutputTokens ?? 500,
          // Gemini 3.x models "think" before answering by default (medium
          // level) — this burns hidden reasoning tokens and adds real
          // latency (tens of seconds), even for a simple chat reply.
          // Google's own docs specifically call out "low" thinking for
          // latency-critical real-time chat, which is exactly this widget.
          thinkingConfig: { thinkingLevel: "low" },
        },
      }),
    });
  } catch (err) {
    return {
      ok: false,
      status: 0,
      errorText: err instanceof Error ? err.message : "Network request to Gemini failed.",
      model,
      stage: "network",
    };
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => "(no response body)");
    return { ok: false, status: res.status, errorText: errText, model, stage: "http" };
  }

  const data = await res.json().catch(() => null);
  const text: string =
    data?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? "")
      .join("")
      .trim() ?? "";

  if (!text) {
    return {
      ok: false,
      status: res.status,
      errorText: `Gemini returned no text. Raw response: ${JSON.stringify(data).slice(0, 500)}`,
      model,
      stage: "empty",
    };
  }

  return { ok: true, text, model };
}
