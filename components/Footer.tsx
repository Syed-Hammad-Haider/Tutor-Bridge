import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Linkedin, Mail, MessageCircle } from "lucide-react";
import Container from "./Container";
import { siteConfig, buildWhatsAppLink } from "@/lib/site-config";
import { levels } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/[0.06] bg-ink text-paper/80">
      <Container className="py-16">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-paper/10 pb-10 sm:flex-row sm:items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo-mark.png"
              alt="TutorBridge logo"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full bg-paper/95 p-1.5"
            />
            <span>
              <span className="block font-display text-[19px] font-semibold text-paper">
                Tutor<span className="text-bridge">Bridge</span>
              </span>
              <span className="block text-[12.5px] text-paper/50">
                Find the Right Tutor. Learn with Confidence.
              </span>
            </span>
          </Link>

          <div className="flex gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TutorBridge on Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-bridge hover:text-bridge"
            >
              <Instagram size={17} />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TutorBridge on Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-bridge hover:text-bridge"
            >
              <Facebook size={17} />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TutorBridge on LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-bridge hover:text-bridge"
            >
              <Linkedin size={17} />
            </a>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with TutorBridge on WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-bridge hover:text-bridge"
            >
              <MessageCircle size={17} />
            </a>
          </div>
        </div>

        <div className="grid gap-10 pt-10 sm:grid-cols-3">
          <div>
            <p className="eyebrow text-bridge">Levels We Cover</p>
            <ul className="mt-4 space-y-3 text-[14.5px]">
              {levels.map((l) => (
                <li key={l.name}>
                  <Link
                    href={`/find-a-tutor?level=${encodeURIComponent(l.name)}`}
                    className="text-paper/70 transition-colors hover:text-paper"
                  >
                    {l.seoTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-bridge">Links</p>
            <ul className="mt-4 space-y-3 text-[14.5px]">
              <li><Link href="/about" className="text-paper/70 transition-colors hover:text-paper">About Us</Link></li>
              <li><Link href="/subjects" className="text-paper/70 transition-colors hover:text-paper">Subjects &amp; Programs</Link></li>
              <li><Link href="/find-a-tutor" className="text-paper/70 transition-colors hover:text-paper">Find a Tutor</Link></li>
              <li><Link href="/become-a-tutor" className="text-paper/70 transition-colors hover:text-paper">Become a Tutor</Link></li>
              <li><Link href="/privacy" className="text-paper/70 transition-colors hover:text-paper">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-bridge">Contact</p>
            <ul className="mt-4 space-y-3 text-[14.5px] text-paper/70">
              {siteConfig.whatsapp.numbers.map((n, i) => (
                <li key={n}>
                  <a
                    href={buildWhatsAppLink(undefined, n)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-paper"
                  >
                    WhatsApp{i === 0 ? "" : " (Alt)"}: {n}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-paper"
                >
                  <Mail size={14} className="text-bridge" /> {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-8 text-[13px] text-paper/45 sm:flex-row">
          <p>© {year} TutorBridge. All rights reserved.</p>
          <p>Connecting students with the right tutors, wherever they are.</p>
        </div>
      </Container>
    </footer>
  );
}
