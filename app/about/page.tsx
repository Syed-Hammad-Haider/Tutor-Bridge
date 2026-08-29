import type { Metadata } from "next";
import { Target, Handshake, Compass } from "lucide-react";
import Container from "@/components/Container";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import ConnectionGraphic from "@/components/ConnectionGraphic";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "TutorBridge is a platform that helps parents and students find suitable tutors, and helps tutors access relevant teaching opportunities.",
};

export default function AboutPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-2xl">
              <p className="eyebrow">About TutorBridge</p>
              <h1 className="mt-3 text-balance font-display text-[34px] font-medium leading-tight text-ink sm:text-[42px]">
                A bridge between good tutors and the families who need them.
              </h1>
              <p className="mt-6 text-[16px] leading-relaxed text-slate">
                TutorBridge exists to make one part of parenting a little easier: finding a
                tutor you can actually trust. We work as a matching platform — parents and
                students share what they need, and we connect them with tutors who genuinely
                fit that requirement, across O Levels, IGCSE, A Levels, Matric,
                Intermediate, IELTS, SAT and general school-level tuition.
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-slate">
                On the other side, we help tutors spend less time chasing leads and more
                time teaching, by connecting them with students whose level, subject and
                schedule genuinely match what they offer.
              </p>
            </div>
            <Reveal className="mx-auto w-full max-w-sm rounded-3xl border border-ink/[0.06] bg-white/60 p-6 shadow-card">
              <ConnectionGraphic className="w-full" />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink/[0.06] py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Our focus",
                text: "Matching, not just listing — every request is reviewed before we recommend tutors.",
              },
              {
                icon: Handshake,
                title: "Our approach",
                text: "Direct, human communication over WhatsApp instead of complex dashboards.",
              },
              {
                icon: Compass,
                title: "Our scope",
                text: "Built for how tuition actually works — real boards, real routines, real schedules.",
              },
            ].map(({ icon: Icon, title, text }, i) => (
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

      <section className="border-t border-ink/[0.06] py-20 sm:py-24">
        <Container className="text-center">
          <h2 className="text-balance font-display text-[28px] font-medium text-ink sm:text-[34px]">
            Whichever side of the bridge you&rsquo;re on
          </h2>
          <p className="mx-auto mt-4 max-w-md text-balance text-[15px] leading-relaxed text-slate">
            We&rsquo;d like to help. Reach out as a parent looking for a tutor, or a
            tutor looking for students.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <CTAButton href="/find-a-tutor">Find a Tutor</CTAButton>
            <CTAButton href="/become-a-tutor" variant="secondary">
              Become a Tutor
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}
