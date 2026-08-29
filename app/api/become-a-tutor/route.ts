import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendPushNotification } from "@/lib/notify";

const REQUIRED_FIELDS = ["name", "whatsapp", "city", "subjects", "levels"] as const;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — see app/api/find-a-tutor/route.ts for details.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  for (const field of REQUIRED_FIELDS) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
    }
  }

  const record = {
    name: String(body.name).trim().slice(0, 200),
    whatsapp: String(body.whatsapp).trim().slice(0, 50),
    city: String(body.city).trim().slice(0, 200),
    area: body.area ? String(body.area).trim().slice(0, 200) : null,
    subjects: String(body.subjects).trim().slice(0, 300),
    levels: String(body.levels).trim().slice(0, 300),
    experience: body.experience ? String(body.experience).trim().slice(0, 100) : null,
    mode: body.mode ? String(body.mode).trim().slice(0, 50) : null,
    availability: body.availability ? String(body.availability).trim().slice(0, 200) : null,
    notes: body.notes ? String(body.notes).trim().slice(0, 2000) : null,
    status: "new",
  };

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("tutor_applications").insert(record);
    if (error) throw error;
  } catch (err) {
    console.error("Failed to store tutor application:", err);
    return NextResponse.json(
      { error: "We couldn't save your application right now. Please try WhatsApp instead." },
      { status: 500 }
    );
  }

  await sendPushNotification({
    title: "New tutor application - TutorBridge",
    message: `${record.name} applied to teach ${record.subjects} (${record.levels}) in ${record.city}. WhatsApp: ${record.whatsapp}`,
    tags: "bell,teacher",
    priority: 4,
  });

  return NextResponse.json({ ok: true });
}
