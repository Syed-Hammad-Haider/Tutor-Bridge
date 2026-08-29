import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/chat-knowledge";
import { callGemini, type GeminiMessage } from "@/lib/gemini";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY = 12; // keep the last N messages to control cost/context size

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const messages = body?.messages;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const cleaned: GeminiMessage[] = messages
    .filter(
      (m: unknown): m is GeminiMessage =>
        !!m &&
        typeof m === "object" &&
        ((m as GeminiMessage).role === "user" || (m as GeminiMessage).role === "assistant") &&
        typeof (m as GeminiMessage).content === "string"
    )
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_MESSAGE_LENGTH),
    }))
    .slice(-MAX_HISTORY);

  if (cleaned.length === 0) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = await callGemini(cleaned, buildSystemPrompt());

  if (!result.ok) {
    // Full detail goes to the server log (visible in Vercel's function
    // logs) for debugging — the public response stays generic on purpose,
    // so no internal error detail or key information ever reaches the
    // browser. Use GET /api/admin/gemini-test (while signed into /admin)
    // to see this same detail surfaced safely in the browser instead.
    console.error(`Gemini call failed [stage=${result.stage}, status=${result.status}]:`, result.errorText);
    return NextResponse.json(
      { error: "The assistant is temporarily unavailable. Please try WhatsApp instead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ reply: result.text });
}
