"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, RefreshCw, Search, Trash2, Bot } from "lucide-react";
import Container from "@/components/Container";
import { buildWhatsAppLink } from "@/lib/site-config";

type Status = "new" | "contacted" | "closed";

type TutorRequest = {
  id: string;
  created_at: string;
  status: Status;
  name: string;
  whatsapp: string;
  level: string;
  subject: string;
  board: string | null;
  city: string;
  format: string | null;
  gender_preference: string | null;
  budget: string | null;
  availability: string | null;
  notes: string | null;
};

type TutorApplication = {
  id: string;
  created_at: string;
  status: Status;
  name: string;
  whatsapp: string;
  city: string;
  area: string | null;
  subjects: string;
  levels: string;
  experience: string | null;
  mode: string | null;
  availability: string | null;
  notes: string | null;
};

const POLL_MS = 15000;

const statusStyles: Record<Status, string> = {
  new: "bg-gold-light text-ink border-gold/40",
  contacted: "bg-bridge-light text-bridge-dark border-bridge/30",
  closed: "bg-ink/5 text-slate border-ink/10",
};

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"requests" | "applications">("requests");
  const [requests, setRequests] = useState<TutorRequest[]>([]);
  const [applications, setApplications] = useState<TutorApplication[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch("/api/admin/requests", { cache: "no-store" });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load.");
      setRequests(data.requests);
      setApplications(data.applications);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load records.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
    const interval = setInterval(() => load(true), POLL_MS);
    return () => clearInterval(interval);
  }, [load]);

  async function updateStatus(type: "requests" | "applications", id: string, status: Status) {
    // optimistic update
    if (type === "requests") {
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } else {
      setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    }
    await fetch("/api/admin/requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id, status }),
    });
  }

  async function remove(type: "requests" | "applications", id: string) {
    if (!confirm("Delete this record permanently?")) return;
    if (type === "requests") {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } else {
      setApplications((prev) => prev.filter((a) => a.id !== id));
    }
    await fetch(`/api/admin/requests?type=${type}&id=${id}`, { method: "DELETE" });
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const filteredRequests = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return requests;
    return requests.filter((r) =>
      [r.name, r.whatsapp, r.subject, r.level, r.city, r.board, r.notes]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [requests, query]);

  const filteredApplications = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return applications;
    return applications.filter((a) =>
      [a.name, a.whatsapp, a.subjects, a.levels, a.city, a.area, a.notes]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [applications, query]);

  const newCount =
    requests.filter((r) => r.status === "new").length +
    applications.filter((a) => a.status === "new").length;

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-[26px] font-medium text-ink sm:text-[30px]">
              Admin dashboard
            </h1>
            <p className="mt-1 text-[13.5px] text-slate">
              {newCount > 0 ? `${newCount} new since last review` : "All caught up"}
              {lastUpdated && (
                <span className="text-slate-light"> · updated {timeAgo(lastUpdated.toISOString())}</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/api/admin/gemini-test"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2 text-[13.5px] font-medium text-ink/70 hover:bg-ink/[0.04]"
            >
              <Bot size={14} /> Test AI Assistant
            </a>
            <button
              onClick={() => load()}
              className="flex items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2 text-[13.5px] font-medium text-ink/70 hover:bg-ink/[0.04]"
            >
              <RefreshCw size={14} /> Refresh
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2 text-[13.5px] font-medium text-ink/70 hover:bg-ink/[0.04]"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex rounded-full border border-ink/10 bg-white/60 p-1">
            {(["requests", "applications"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-5 py-2 text-[13.5px] font-medium transition-colors ${
                  tab === t ? "bg-ink text-paper" : "text-ink/60 hover:text-ink"
                }`}
              >
                {t === "requests" ? `Tutor Requests (${requests.length})` : `Applications (${applications.length})`}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-light" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, subject, city…"
              className="w-64 rounded-full border border-ink/10 bg-white py-2 pl-9 pr-4 text-[13.5px] outline-none focus:border-bridge"
            />
          </div>
        </div>

        {error && (
          <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] text-red-700">
            {error}
          </p>
        )}

        <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/[0.06] bg-white/60 shadow-card">
          {loading ? (
            <p className="p-8 text-center text-[14px] text-slate">Loading…</p>
          ) : tab === "requests" ? (
            <table className="w-full min-w-[900px] text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-ink/[0.06] text-[12px] uppercase tracking-wide text-slate-light">
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">WhatsApp</th>
                  <th className="px-5 py-3 font-medium">Level / Subject</th>
                  <th className="px-5 py-3 font-medium">City</th>
                  <th className="px-5 py-3 font-medium">Format</th>
                  <th className="px-5 py-3 font-medium">Budget</th>
                  <th className="px-5 py-3 font-medium">Received</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-5 py-10 text-center text-slate">
                      No requests yet.
                    </td>
                  </tr>
                )}
                {filteredRequests.map((r) => (
                  <tr key={r.id} className="border-b border-ink/[0.04] align-top last:border-0">
                    <td className="px-5 py-3">
                      <select
                        value={r.status}
                        onChange={(e) => updateStatus("requests", r.id, e.target.value as Status)}
                        className={`rounded-full border px-2.5 py-1 text-[12px] font-medium ${statusStyles[r.status]}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-5 py-3 font-medium text-ink">{r.name}</td>
                    <td className="px-5 py-3">
                      <a
                        href={buildWhatsAppLink(undefined, r.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bridge-dark hover:underline"
                      >
                        {r.whatsapp}
                      </a>
                    </td>
                    <td className="px-5 py-3 text-slate">
                      {r.level} · {r.subject}
                      {r.board && <div className="text-slate-light">{r.board}</div>}
                    </td>
                    <td className="px-5 py-3 text-slate">{r.city}</td>
                    <td className="px-5 py-3 text-slate">
                      {r.format}
                      {r.gender_preference && <div className="text-slate-light">{r.gender_preference}</div>}
                    </td>
                    <td className="px-5 py-3 text-slate">{r.budget || "—"}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-slate-light">{timeAgo(r.created_at)}</td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => remove("requests", r.id)}
                        aria-label="Delete"
                        className="rounded-full p-1.5 text-slate-light hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full min-w-[900px] text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-ink/[0.06] text-[12px] uppercase tracking-wide text-slate-light">
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">WhatsApp</th>
                  <th className="px-5 py-3 font-medium">Subjects / Levels</th>
                  <th className="px-5 py-3 font-medium">City</th>
                  <th className="px-5 py-3 font-medium">Experience</th>
                  <th className="px-5 py-3 font-medium">Mode</th>
                  <th className="px-5 py-3 font-medium">Received</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filteredApplications.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-5 py-10 text-center text-slate">
                      No applications yet.
                    </td>
                  </tr>
                )}
                {filteredApplications.map((a) => (
                  <tr key={a.id} className="border-b border-ink/[0.04] align-top last:border-0">
                    <td className="px-5 py-3">
                      <select
                        value={a.status}
                        onChange={(e) => updateStatus("applications", a.id, e.target.value as Status)}
                        className={`rounded-full border px-2.5 py-1 text-[12px] font-medium ${statusStyles[a.status]}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-5 py-3 font-medium text-ink">{a.name}</td>
                    <td className="px-5 py-3">
                      <a
                        href={buildWhatsAppLink(undefined, a.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bridge-dark hover:underline"
                      >
                        {a.whatsapp}
                      </a>
                    </td>
                    <td className="px-5 py-3 text-slate">
                      {a.subjects}
                      <div className="text-slate-light">{a.levels}</div>
                    </td>
                    <td className="px-5 py-3 text-slate">
                      {a.city}
                      {a.area && <div className="text-slate-light">{a.area}</div>}
                    </td>
                    <td className="px-5 py-3 text-slate">{a.experience || "—"}</td>
                    <td className="px-5 py-3 text-slate">{a.mode || "—"}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-slate-light">{timeAgo(a.created_at)}</td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => remove("applications", a.id)}
                        aria-label="Delete"
                        className="rounded-full p-1.5 text-slate-light hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="mt-4 text-[12.5px] text-slate-light">
          This view refreshes automatically every 15 seconds. Notes submitted with each
          entry aren&rsquo;t shown in the table — click a WhatsApp number to open the
          chat directly.
        </p>
      </Container>
    </section>
  );
}
