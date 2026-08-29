"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "./Container";
import CTAButton from "./CTAButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/subjects", label: "Subjects" },
  { href: "/find-a-tutor", label: "Find a Tutor" },
  { href: "/become-a-tutor", label: "Become a Tutor" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/[0.06] bg-paper/80 backdrop-blur-md">
      <Container className="flex h-[76px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/logo-mark.png"
            alt="TutorBridge logo"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0"
            priority
          />
          <span className="font-display text-[20px] font-semibold tracking-tight text-ink">
            Tutor<span className="text-bridge-dark">Bridge</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[14.5px] font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CTAButton href="/find-a-tutor" variant="primary" icon={false}>
            Find a Tutor
          </CTAButton>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-ink/[0.06] bg-paper lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-[15px] font-medium text-ink/80 hover:bg-ink/[0.04]"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 px-3">
              <CTAButton href="/find-a-tutor" variant="primary" className="w-full justify-center" icon={false}>
                Find a Tutor
              </CTAButton>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
