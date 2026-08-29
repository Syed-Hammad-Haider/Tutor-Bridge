"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import Container from "@/components/Container";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center py-16">
      <Container className="max-w-sm">
        <div className="rounded-3xl border border-ink/[0.06] bg-white/70 p-8 shadow-card">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-paper">
            <Lock size={18} />
          </span>
          <h1 className="mt-5 font-display text-[22px] font-medium text-ink">Admin sign in</h1>
          <p className="mt-1.5 text-[14px] text-slate">
            TutorBridge dashboard — requests &amp; applications.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-[14.5px] text-ink outline-none transition-colors focus:border-bridge"
            />
            {error && <p className="text-[13.5px] text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-ink px-6 py-3 text-[14.5px] font-medium text-paper transition-colors hover:bg-ink-light disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
