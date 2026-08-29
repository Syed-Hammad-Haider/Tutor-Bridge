import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const TABLES = {
  requests: "tutor_requests",
  applications: "tutor_applications",
} as const;

type TypeKey = keyof typeof TABLES;

function tableFor(type: unknown): string | null {
  if (type === "requests" || type === "applications") return TABLES[type as TypeKey];
  return null;
}

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const [requestsRes, applicationsRes] = await Promise.all([
      supabase.from("tutor_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("tutor_applications").select("*").order("created_at", { ascending: false }),
    ]);
    if (requestsRes.error) throw requestsRes.error;
    if (applicationsRes.error) throw applicationsRes.error;

    return NextResponse.json({
      requests: requestsRes.data ?? [],
      applications: applicationsRes.data ?? [],
    });
  } catch (err) {
    console.error("Failed to load admin records:", err);
    return NextResponse.json({ error: "Failed to load records." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => null);
  const table = tableFor(body?.type);
  const id = body?.id;
  const status = body?.status;

  if (!table || !id || !["new", "contacted", "closed"].includes(status)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from(table).update({ status }).eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to update record:", err);
    return NextResponse.json({ error: "Failed to update record." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const table = tableFor(searchParams.get("type"));
  const id = searchParams.get("id");

  if (!table || !id) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to delete record:", err);
    return NextResponse.json({ error: "Failed to delete record." }, { status: 500 });
  }
}
