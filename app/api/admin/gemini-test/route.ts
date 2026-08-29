import { NextResponse } from "next/server";
import { callGemini, DEFAULT_GEMINI_MODEL } from "@/lib/gemini";

// Force this route to run fresh on every request. Without this, Next.js can
// statically optimize a plain GET handler and cache its result at build
// time — which would defeat the entire purpose of a live diagnostic check.
export const dynamic = "force-dynamic";

// GET /api/admin/gemini-test
// Protected by middleware.ts (matches /api/admin/:path*) — only reachable
// with a valid admin session cookie, i.e. after logging in at /admin/login.
//
// This exists because the person deploying this site can't otherwise see
// *why* the chat assistant is failing — Gemini's real error (bad key, wrong
// model name, region restriction, quota exceeded, etc.) only ever appears
// in server logs, which most people don't have easy access to. This route
// surfaces that same detail safely in the browser, to an authenticated
// admin only. It never returns the API key itself — only whether one is
// present, and Google's own error text.
export async function GET() {
  const keyPresent = !!process.env.GEMINI_API_KEY;
  const configuredModel = process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;

  if (!keyPresent) {
    return NextResponse.json({
      configured: false,
      model: configuredModel,
      message:
        "GEMINI_API_KEY is not set in this environment. Add it in .env.local (local) or Vercel → Settings → Environment Variables (live), then redeploy/restart.",
    });
  }

  const result = await callGemini(
    [{ role: "user", content: "Reply with exactly: TutorBridge assistant is working." }],
    "You are a connectivity test. Follow the user's instruction exactly, with no extra commentary."
  );

  if (result.ok) {
    return NextResponse.json({
      configured: true,
      success: true,
      model: result.model,
      reply: result.text,
      message: "Gemini responded successfully. The chat assistant should be working.",
    });
  }

  return NextResponse.json({
    configured: true,
    success: false,
    model: result.model,
    stage: result.stage,
    status: result.status,
    upstreamError: result.errorText,
    message:
      "Gemini call failed — see upstreamError above for Google's exact reason (e.g. invalid API key, model not found, region not supported, quota exceeded). Fix based on that message, then reload this page to re-test.",
  });
}
