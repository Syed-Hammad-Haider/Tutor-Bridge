// Lightweight, stateless admin session handling for the /admin dashboard.
//
// There's no user database or session store here on purpose — TutorBridge
// has one admin (you). The session cookie is an HMAC of a fixed string,
// keyed with your ADMIN_PASSWORD. It can only be produced or verified by
// someone who knows ADMIN_PASSWORD (the server), and the cookie itself is
// httpOnly so client-side JS can never read or forge it.
//
// This runs in Next.js Middleware (Edge runtime) as well as API routes
// (Node runtime), so it only uses the Web Crypto API (`crypto.subtle`),
// which both environments support — no Node-only `crypto` module.

export const ADMIN_COOKIE_NAME = "tb_admin_session";
const SESSION_MESSAGE = "tutorbridge-admin-session";

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** The expected cookie value for a valid admin session, or null if ADMIN_PASSWORD isn't set. */
export async function getExpectedAdminToken(): Promise<string | null> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return null;
  return hmacSha256Hex(secret, SESSION_MESSAGE);
}

export async function isValidAdminToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const expected = await getExpectedAdminToken();
  if (!expected) return false;
  return token === expected;
}
