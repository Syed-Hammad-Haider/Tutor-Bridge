import type { Metadata } from "next";
import { MessageCircle, Mail, Instagram, Facebook } from "lucide-react";
import Container from "@/components/Container";
import { siteConfig, buildWhatsAppLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with TutorBridge on WhatsApp, email or social media — for parents looking for tutors and tutors looking for students.",
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <div className="text-center">
          <p className="eyebrow justify-center">Contact</p>
          <h1 className="mt-3 text-balance font-display text-[34px] font-medium leading-tight text-ink sm:text-[42px]">
            Let&rsquo;s talk.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-balance text-[15px] leading-relaxed text-slate">
            The fastest way to reach TutorBridge is WhatsApp. We typically respond
            within the same day.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {siteConfig.whatsapp.numbers.map((n, i) => (
            <a
              key={n}
              href={buildWhatsAppLink(undefined, n)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-ink/[0.06] bg-white/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-bridge/30 hover:shadow-card"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bridge text-white">
                <MessageCircle size={20} />
              </span>
              <div>
                <p className="text-[13px] font-medium uppercase tracking-wide text-slate-light">
                  WhatsApp {i === 0 ? "(Primary)" : ""}
                </p>
                <p className="mt-0.5 font-display text-[18px] font-medium text-ink">{n}</p>
              </div>
            </a>
          ))}

          <a
            href={`mailto:${siteConfig.email}`}
            className="group flex items-center gap-4 rounded-2xl border border-ink/[0.06] bg-white/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-bridge/30 hover:shadow-card"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
              <Mail size={20} />
            </span>
            <div>
              <p className="text-[13px] font-medium uppercase tracking-wide text-slate-light">Email</p>
              <p className="mt-0.5 font-display text-[18px] font-medium text-ink">{siteConfig.email}</p>
            </div>
          </a>
        </div>

        <div className="mt-14 text-center">
          <p className="eyebrow justify-center">Follow along</p>
          <div className="mt-5 flex justify-center gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TutorBridge on Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink/70 transition-colors hover:border-bridge hover:text-bridge-dark"
            >
              <Instagram size={18} />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TutorBridge on Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink/70 transition-colors hover:border-bridge hover:text-bridge-dark"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
