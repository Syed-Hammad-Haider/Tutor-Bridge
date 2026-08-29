import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import Container from "@/components/Container";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import { levels } from "@/lib/data";

export const metadata: Metadata = {
  title: "Subjects & Programs",
  description:
    "Browse tutoring programs on TutorBridge: O Level tutors, IGCSE tutors, A Level tutors, Matric, Intermediate, IELTS and SAT tutors.",
};

export default function SubjectsPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl text-center">
          <p className="eyebrow justify-center">Subjects &amp; programs</p>
          <h1 className="mt-3 text-balance font-display text-[34px] font-medium leading-tight text-ink sm:text-[42px]">
            Every level, covered.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-[15px] leading-relaxed text-slate">
            From Cambridge O Level tuition to SAT preparation, TutorBridge helps you
            find a tutor matched to your exact syllabus and subject. Tap a level to
            get started — you can specify your exact subject on the next page.
          </p>
        </Container>
      </section>

      <section className="border-t border-ink/[0.06] py-20 sm:py-24">
        <Container>
          <Reveal>
            <h2 className="font-display text-[26px] font-medium text-ink sm:text-[30px]">
              Academic levels
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {levels.map((level, i) => (
              <Reveal key={level.name} delay={i * 0.05}>
                <Link
                  href={`/find-a-tutor?level=${encodeURIComponent(level.name)}`}
                  className="group block h-full rounded-2xl border border-ink/[0.06] bg-white/60 p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-[19px] font-medium text-ink">
                      {level.seoTitle}
                    </h3>
                    <GraduationCap
                      size={18}
                      className="text-bridge-dark opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate">{level.blurb}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-[13px] leading-relaxed text-slate-light">
            TutorBridge is an independent tutor-matching platform and is not affiliated
            with or endorsed by Cambridge Assessment International Education or any
            examination board. Board and syllabus names are used to describe the
            tuition we help arrange.
          </p>
        </Container>
      </section>

      <section className="border-t border-ink/[0.06] py-20 sm:py-24">
        <Reveal>
          <Container className="text-center">
            <h2 className="text-balance font-display text-[28px] font-medium text-ink sm:text-[34px]">
              Don&rsquo;t see your exact level?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-balance text-[15px] leading-relaxed text-slate">
              Tell us what you&rsquo;re looking for and we&rsquo;ll try to match you with a
              suitable tutor.
            </p>
            <div className="mt-8 flex justify-center">
              <CTAButton href="/find-a-tutor">Find a Tutor</CTAButton>
            </div>
          </Container>
        </Reveal>
      </section>
    </>
  );
}
