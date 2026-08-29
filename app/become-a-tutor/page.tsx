import type { Metadata } from "next";
import { Wallet, CalendarClock, Users2, BadgeCheck } from "lucide-react";
import Container from "@/components/Container";
import TutorApplicationForm from "@/components/TutorApplicationForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Become a Tutor",
  description:
    "Join TutorBridge as a tutor and get access to genuine, relevant tutoring opportunities — online and home-based.",
};

const benefits = [
  {
    icon: Users2,
    title: "Relevant leads only",
    text: "We match requirements to your subjects and levels — no chasing leads that don't fit.",
  },
  {
    icon: Wallet,
    title: "You set your rate",
    text: "Share your expected rate; we connect you with families whose budget aligns.",
  },
  {
    icon: CalendarClock,
    title: "Flexible commitment",
    text: "Take on as many or as few students as your schedule allows.",
  },
  {
    icon: BadgeCheck,
    title: "Build a reputation",
    text: "Consistent, well-matched students help you build a track record over time.",
  },
];

export default function BecomeATutorPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl text-center">
          <p className="eyebrow justify-center">Become a tutor</p>
          <h1 className="mt-3 text-balance font-display text-[34px] font-medium leading-tight text-ink sm:text-[42px]">
            Teach students who are the right fit for you.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-[15px] leading-relaxed text-slate">
            TutorBridge connects qualified tutors with parents and students actively
            looking for tuition — in O Levels, IGCSE, A Levels, Matric, Intermediate,
            IELTS, SAT and more. Apply in under two minutes.
          </p>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-ink/[0.06] py-20 sm:py-24">
        <div
          className="pointer-events-none absolute right-[-8%] top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
          aria-hidden
        />
        <Container className="relative">
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-ink/[0.06] bg-white/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bridge-light text-bridge-dark">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 font-display text-[18px] font-medium text-ink">{title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-ink/[0.06] py-20 sm:py-24" id="apply">
        <Container className="max-w-3xl">
          <div className="text-center">
            <p className="eyebrow justify-center">Application</p>
            <h2 className="mt-3 text-balance font-display text-[30px] font-medium leading-tight text-ink sm:text-[36px]">
              Tell us about your teaching background.
            </h2>
          </div>
          <div className="mt-12">
            <TutorApplicationForm />
          </div>
        </Container>
      </section>
    </>
  );
}
