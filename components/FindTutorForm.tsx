"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/site-config";
import { levels as levelData } from "@/lib/data";

const levelOptions = [...levelData.map((l) => l.name), "Other"];
const formats = ["Online", "Home tuition", "Either works"];
const genders = ["No preference", "Female tutor", "Male tutor"];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[13.5px] font-medium text-ink/80">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-[14.5px] text-ink placeholder:text-slate-light/80 outline-none transition-colors focus:border-bridge";

export default function FindTutorForm() {
  const searchParams = useSearchParams();
  const prefillLevel = levelOptions.includes(searchParams.get("level") || "")
    ? (searchParams.get("level") as string)
    : "";
  const prefillSubject = searchParams.get("subject") || "";

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData(e.currentTarget);
    const get = (k: string) => (data.get(k) as string)?.trim();
    const payload = {
      name: get("name"),
      whatsapp: get("whatsapp"),
      level: get("level"),
      subject: get("subject"),
      board: get("board"),
      city: get("city"),
      format: get("format"),
      gender: get("gender"),
      budget: get("budget"),
      availability: get("availability"),
      notes: get("notes"),
      company: get("company"), // honeypot
    };

    try {
      const res = await fetch("/api/find-a-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong.");
      setWhatsappNumber(payload.whatsapp || "");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-bridge/20 bg-bridge-light p-10 text-center sm:p-14">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-bridge text-white">
          <CheckCircle2 size={24} />
        </span>
        <h2 className="mt-6 font-display text-[24px] font-medium text-ink">
          Your requirement has been received.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-slate">
          Our team has been notified and will review your requirement shortly. We&rsquo;ll
          reach out on WhatsApp at <span className="font-medium text-ink">{whatsappNumber}</span> once
          we have a suitable tutor for you — usually within a day.
        </p>
        <a
          href={buildWhatsAppLink("Hi TutorBridge! I just submitted a requirement on your website — following up here.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-3.5 text-[15px] font-medium text-ink transition-all hover:border-ink/35"
        >
          <MessageCircle size={18} />
          Message us on WhatsApp now
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-ink/[0.06] bg-white/70 p-6 shadow-card sm:p-10"
    >
      {/* Honeypot field — hidden from real users, left blank by them, catches simple bots */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Parent / student name">
          <input required name="name" className={inputClass} placeholder="e.g. Ayesha Khan" />
        </Field>
        <Field label="WhatsApp number">
          <input
            required
            name="whatsapp"
            className={inputClass}
            placeholder="e.g. 0333 6887699"
            inputMode="tel"
          />
        </Field>

        <Field label="Student level">
          <select required name="level" defaultValue={prefillLevel} className={inputClass}>
            <option value="" disabled>
              Select level
            </option>
            {levelOptions.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Subject(s)">
          <input
            required
            name="subject"
            defaultValue={prefillSubject}
            className={inputClass}
            placeholder="e.g. Physics, Chemistry"
          />
        </Field>

        <Field label="Board / syllabus">
          <input
            name="board"
            className={inputClass}
            placeholder="e.g. Cambridge, Federal Board"
          />
        </Field>
        <Field label="City / area">
          <input required name="city" className={inputClass} placeholder="e.g. your city or area" />
        </Field>

        <Field label="Online or home tuition">
          <select name="format" defaultValue={formats[0]} className={inputClass}>
            {formats.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Preferred tutor gender">
          <select name="gender" defaultValue={genders[0]} className={inputClass}>
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Budget (per month)">
          <input name="budget" className={inputClass} placeholder="e.g. PKR 15,000" />
        </Field>
        <Field label="Availability">
          <input
            name="availability"
            className={inputClass}
            placeholder="e.g. Weekday evenings"
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Additional requirements">
            <textarea
              name="notes"
              rows={4}
              className={inputClass}
              placeholder="Anything else that would help us find the right tutor"
            />
          </Field>
        </div>
      </div>

      {error && (
        <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper shadow-card transition-all hover:bg-ink-light hover:shadow-card-hover disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending…" : "Find My Tutor"}
      </button>
      <p className="mt-4 text-[13px] text-slate-light">
        Your requirement is saved securely and our team is notified instantly — we&rsquo;ll
        follow up on WhatsApp.
      </p>
    </form>
  );
}
