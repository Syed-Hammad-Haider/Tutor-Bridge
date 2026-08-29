"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/site-config";

const experienceOptions = [
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "5+ years",
];
const modeOptions = ["Online", "Home tuition", "Both"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[13.5px] font-medium text-ink/80">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-[14.5px] text-ink placeholder:text-slate-light/80 outline-none transition-colors focus:border-bridge";

export default function TutorApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData(e.currentTarget);
    const get = (k: string) => (data.get(k) as string)?.trim();
    const payload = {
      name: get("name"),
      whatsapp: get("whatsapp"),
      city: get("city"),
      area: get("area"),
      subjects: get("subjects"),
      levels: get("levels"),
      experience: get("experience"),
      mode: get("mode"),
      availability: get("availability"),
      notes: get("notes"),
      company: get("company"), // honeypot
    };

    try {
      const res = await fetch("/api/become-a-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong.");
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
          Your application has been received.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-slate">
          Our team has been notified and will review your application shortly. We&rsquo;ll
          reach out on WhatsApp once there&rsquo;s a suitable match for your subjects and
          availability.
        </p>
        <a
          href={buildWhatsAppLink("Hi TutorBridge! I just applied to become a tutor on your website — following up here.")}
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
      {/* Honeypot field — hidden from real users, catches simple bots */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name">
          <input required name="name" className={inputClass} placeholder="e.g. Ali Raza" />
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

        <Field label="City">
          <input required name="city" className={inputClass} placeholder="e.g. Karachi" />
        </Field>
        <Field label="Area / neighbourhood">
          <input name="area" className={inputClass} placeholder="e.g. Gulshan-e-Iqbal" />
        </Field>

        <Field label="Subjects you can teach">
          <input
            required
            name="subjects"
            className={inputClass}
            placeholder="e.g. Physics, Mathematics"
          />
        </Field>
        <Field label="Levels you can teach">
          <input
            required
            name="levels"
            className={inputClass}
            placeholder="e.g. O Levels, IGCSE, Matric"
          />
        </Field>

        <Field label="Teaching experience">
          <select required name="experience" defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select experience
            </option>
            {experienceOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Teaching mode">
          <select name="mode" defaultValue={modeOptions[2]} className={inputClass}>
            {modeOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Availability">
            <input
              name="availability"
              className={inputClass}
              placeholder="e.g. Weekday evenings, weekends"
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="About you / qualifications">
            <textarea
              name="notes"
              rows={4}
              className={inputClass}
              placeholder="Degree, institution, relevant achievements, teaching style, etc."
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
        {submitting ? "Sending…" : "Apply to Become a Tutor"}
      </button>
      <p className="mt-4 text-[13px] text-slate-light">
        Your application is saved securely and our team is notified instantly.
      </p>
    </form>
  );
}
