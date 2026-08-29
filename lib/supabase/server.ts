import { createClient, SupabaseClient } from "@supabase/supabase-js";

// SERVER-ONLY. Never import this file from a "use client" component — it
// uses the Supabase service role key, which must never reach the browser.
// All database access happens through Next.js API routes (app/api/**),
// which run on the server.

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment."
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false },
  });
  return cached;
}
