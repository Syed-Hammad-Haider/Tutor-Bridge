"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Send, MessageCircle, Sparkles } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/site-config";

type Message = { role: "user" | "assistant"; content: string };

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi, I'm Bridget 👋 the TutorBridge assistant. Ask me about O Levels, IGCSE, A Levels, IELTS, SAT, or how TutorBridge works — I'm happy to help.",
};

/**
 * Safety net: the system prompt instructs the model never to use Markdown,
 * since this widget renders plain text only — but models occasionally slip
 * a ** or ### in anyway. This strips common Markdown syntax down to clean
 * plain text so a slip-up never shows up as a wall of asterisks and hashes.
 */
function stripMarkdown(text: string): string {
  return text
    .replace(/^#{1,6}\s*/gm, "") // ## Headers
    .replace(/\*\*(.*?)\*\*/g, "$1") // **bold**
    .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, "$1") // *italic*
    .replace(/^\s*-{3,}\s*$/gm, "") // --- horizontal rules
    .replace(/^\s*[-*]\s+/gm, "• ") // - bullet / * bullet → •
    .replace(/`{1,3}([^`]*)`{1,3}/g, "$1") // `code` / ```code```
    .replace(/\n{3,}/g, "\n\n") // collapse excess blank lines
    .trim();
}

/** Branded avatar used both on the closed bubble and inside the open chat header. */
function BridgetAvatar({ size }: { size: number }) {
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      <Image
        src="/logo-mark.png"
        alt=""
        width={size}
        height={size}
        className="h-full w-full rounded-full bg-paper/95 p-1.5"
      />
      <span className="absolute -bottom-0.5 -right-0.5 flex h-[42%] w-[42%] items-center justify-center rounded-full bg-bridge text-white ring-2 ring-ink">
        <Sparkles size={size * 0.22} strokeWidth={2.5} />
      </span>
    </span>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((m) => m !== WELCOME)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setMessages((prev) => [...prev, { role: "assistant", content: stripMarkdown(data.reply) }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 left-5 z-50 flex h-[500px] w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-ink/[0.08] bg-paper shadow-card-hover sm:bottom-28 sm:left-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-ink/[0.06] bg-ink px-5 py-4">
            <div className="flex items-center gap-2.5">
              <BridgetAvatar size={32} />
              <div>
                <p className="font-display text-[14.5px] font-medium text-paper">Bridget</p>
                <p className="text-[11.5px] text-paper/50">TutorBridge Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper"
            >
              <X size={17} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-ink text-paper"
                    : "bg-ink/[0.05] text-ink"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[70%] rounded-2xl bg-ink/[0.05] px-4 py-2.5 text-[13.5px] text-slate">
                Bridget is typing…
              </div>
            )}
            {error && (
              <div className="space-y-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
                <p>{error}</p>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-red-800 underline underline-offset-2"
                >
                  <MessageCircle size={13} /> Chat with us on WhatsApp instead
                </a>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-ink/[0.06] p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Bridget about O Levels, IELTS…"
              className="flex-1 rounded-full border border-ink/12 bg-white px-4 py-2.5 text-[13.5px] outline-none focus:border-bridge"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bridge text-white transition-colors hover:bg-bridge-dark disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat with Bridget" : "Chat with Bridget, the TutorBridge assistant"}
        className="fixed bottom-6 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper shadow-card-hover transition-transform duration-300 hover:scale-105 sm:bottom-8 sm:left-8"
      >
        {open ? <X size={22} /> : <BridgetAvatar size={36} />}
      </button>
    </>
  );
}
