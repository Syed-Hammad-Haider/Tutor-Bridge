import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendPushNotification } from "@/lib/notify";

const REQUIRED_FIELDS = ["name", "whatsapp", "level", "subject", "city"] as const;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a hidden field real users never fill in. If it's populated,
  // this is almost certainly a bot — pretend success without saving anything.
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
    level: String(body.level).trim().slice(0, 100),
    subject: String(body.subject).trim().slice(0, 200),
    board: body.board ? String(body.board).trim().slice(0, 200) : null,
    city: String(body.city).trim().slice(0, 200),
    format: body.format ? String(body.format).trim().slice(0, 50) : null,
    gender_preference: body.gender ? String(body.gender).trim().slice(0, 50) : null,
    budget: body.budget ? String(body.budget).trim().slice(0, 100) : null,
    availability: body.availability ? String(body.availability).trim().slice(0, 200) : null,
    notes: body.notes ? String(body.notes).trim().slice(0, 2000) : null,
    status: "new",
  };

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("tutor_requests").insert(record);
    if (error) throw error;
  } catch (err) {
    console.error("Failed to store tutor request:", err);
    return NextResponse.json(
      { error: "We couldn't save your request right now. Please try WhatsApp instead." },
      { status: 500 }
    );
  }

  await sendPushNotification({
    title: "New tutor request - TutorBridge",
    message: `${record.name} needs a ${record.subject} tutor (${record.level}) in ${record.city}. WhatsApp: ${record.whatsapp}`,
    tags: "bell,student",
    priority: 4,
  });

  return NextResponse.json({ ok: true });
}
