"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "How does TutorBridge select tutors?",
    a: "Every tutor is reviewed for subject expertise and teaching experience before we recommend them for a match — we don't just hand out a list.",
  },
  {
    q: "How quickly can I get a tutor?",
    a: "Most requests get a response within a day. Once you submit the Find a Tutor form, our team reviews it and follows up on WhatsApp with suitable options.",
  },
  {
    q: "Are both male and female tutors available?",
    a: "Yes — you can specify a preference in the Find a Tutor form, or let us know you have no preference.",
  },
  {
    q: "Is TutorBridge available internationally?",
    a: "Yes. Online tuition means location isn't a limit — we work with students and tutors well beyond any one country.",
  },
  {
    q: "How are fees and payments handled?",
    a: "TutorBridge collects advance payments and pays tutors after classes commence, ensuring safety for all.",
  },
  {
    q: "What levels and boards do you cover?",
    a: (
      <>
        O Levels, IGCSE, A Levels, Matric, Intermediate, IELTS, SAT, and general
        primary/secondary tuition. See the full list on our{" "}
        <Link href="/subjects" className="text-bridge-dark hover:underline">
          Subjects &amp; Programs
        </Link>{" "}
        page.
      </>
    ),
  },
  {
    q: "How do I apply as a tutor?",
    a: (
      <>
        Head to{" "}
        <Link href="/become-a-tutor" className="text-bridge-dark hover:underline">
          Become a Tutor
        </Link>{" "}
        and fill in your subjects, levels, and experience — it takes under two
        minutes.
      </>
    ),
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-ink/[0.06] rounded-3xl border border-ink/[0.06] bg-white/60 shadow-card">
      {faqs.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-[16px] font-medium text-ink">{item.q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-bridge-dark transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-[14.5px] leading-relaxed text-slate">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
