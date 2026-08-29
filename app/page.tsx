import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Home as HomeIcon,
  ClipboardList,
  Users,
  CalendarCheck,
  School,
  GraduationCap,
  BookOpenText,
  Award,
  PenLine,
  Layers,
  Languages,
  Target,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/Container";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import FlagMarquee from "@/components/FlagMarquee";
import CategoryCard from "@/components/CategoryCard";
import HeroPreviewCard from "@/components/HeroPreviewCard";
import FAQ from "@/components/FAQ";
import { levels } from "@/lib/data";

const levelStyle: Record<string, { icon: LucideIcon; tone: "ink" | "bridge" | "gold" }> = {
  "Primary & Secondary": { icon: School, tone: "gold" },
  "O Levels": { icon: GraduationCap, tone: "ink" },
  IGCSE: { icon: BookOpenText, tone: "bridge" },
  "A Levels": { icon: Award, tone: "gold" },
  Matric: { icon: PenLine, tone: "ink" },
  Intermediate: { icon: Layers, tone: "bridge" },
  IELTS: { icon: Languages, tone: "gold" },
  SAT: { icon: Target, tone: "ink" },
};

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Personally screened",
    text: "Every tutor is reviewed for subject expertise and teaching experience before being matched.",
  },
  {
    icon: Sparkles,
    title: "Matched to your needs",
    text: "We match on level, board, subject, budget and availability — not a generic list.",
  },
  {
    icon: HomeIcon,
    title: "Online or at home",
    text: "Choose home tuition, online sessions, or a hybrid — whatever fits your routine.",
  },
  {
    icon: MessageCircle,
    title: "Fast on WhatsApp",
    text: "Share your requirement once and hear back quickly — no long sign-up forms.",
  },
  {
    icon: ShieldCheck,
    title: "No hidden fees",
    text: "Clear expectations before you commit to a tutor — fees are agreed directly with no surprises.",
  },
  {
    icon: Users,
    title: "Direct communication",
    text: "You speak with TutorBridge and your tutor directly on WhatsApp, no middle layer.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden bg-noise">
        <div
          className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-bridge/10 blur-3xl"
          aria-hidden
        />
        <Container className="relative grid items-center gap-16 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20 lg:pt-28">
          <div className="animate-rise">
            <p className="eyebrow">A smarter way to find your tutor</p>
            <h1 className="mt-5 text-balance font-display text-[40px] font-medium leading-[1.08] tracking-tight text-ink sm:text-[54px] lg:text-[60px]">
              Find the right tutor.
              <br />
              <span className="italic text-bridge-dark">Learn with confidence.</span>
            </h1>
            <p className="mt-6 max-w-lg text-balance text-[17px] leading-relaxed text-slate">
              Connect with experienced tutors for O Levels, IGCSE, A Levels, Matric,
              Intermediate, IELTS, SAT and more — matched to your level, board and
              budget, wherever you are.
            </p>

            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
              <CTAButton href="/find-a-tutor" variant="primary">
                Find a Tutor
              </CTAButton>
              <CTAButton href="/become-a-tutor" variant="secondary">
                Become a Tutor
              </CTAButton>
            </div>

            <div className="mt-10 flex flex-wrap gap-2.5">
              {["O Levels", "IGCSE", "A Levels", "Matric", "IELTS", "SAT"].map((l) => (
                <Link
                  key={l}
                  href={`/find-a-tutor?level=${encodeURIComponent(l)}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/60 px-3.5 py-1.5 text-[13px] font-medium text-ink/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-bridge/40 hover:bg-white hover:text-ink"
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <HeroPreviewCard />
            <p className="mt-4 text-center font-mono text-[12px] uppercase tracking-[0.14em] text-slate-light">
              One request. The right match.
            </p>
          </div>
        </Container>

        <div className="border-t border-ink/[0.06] py-6">
          <Container>
            <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-slate-light">
              Students &amp; tutors, wherever they are
            </p>
            <FlagMarquee />
          </Container>
        </div>
      </section>

      {/* ------------------------------------------------------- WHY TUTORBRIDGE */}
      <section className="border-t border-ink/[0.06] bg-ink py-20 text-paper sm:py-24">
        <Container>
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="eyebrow text-bridge justify-center">Why TutorBridge</p>
            <h2 className="mt-3 text-balance font-display text-[30px] font-medium leading-tight sm:text-[36px]">
              Built around trust, not just a tutor list.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-paper/10 bg-paper/[0.04] p-6 transition-colors duration-300 hover:bg-paper/[0.07]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bridge/15 text-bridge">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 font-display text-[16.5px] font-medium text-paper">{title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-paper/55">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- LEVELS WE COVER */}
      <section className="relative overflow-hidden border-t border-ink/[0.06] py-20 sm:py-24">
        <div
          className="pointer-events-none absolute left-[-6%] bottom-0 h-80 w-80 rounded-full bg-bridge/[0.06] blur-3xl"
          aria-hidden
        />
        <Container className="relative">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Levels we cover</p>
            <h2 className="mt-3 text-balance font-display text-[32px] font-medium leading-tight text-ink sm:text-[38px]">
              Whatever you&rsquo;re working toward, start here.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {levels.map((level, i) => {
              const style = levelStyle[level.name] ?? { icon: GraduationCap, tone: "ink" as const };
              return (
                <Reveal key={level.name} delay={i * 0.05}>
                  <CategoryCard
                    icon={style.icon}
                    title={level.seoTitle}
                    blurb={level.blurb}
                    tone={style.tone}
                    href={`/find-a-tutor?level=${encodeURIComponent(level.name)}`}
                  />
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ HOW IT WORKS */}
      <section className="relative overflow-hidden border-t border-ink/[0.06] bg-ink/[0.02] py-20 sm:py-24">
        <div
          className="pointer-events-none absolute right-[-8%] top-1/3 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
          aria-hidden
        />
        <Container className="relative">
          <Reveal className="max-w-xl">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 text-balance font-display text-[32px] font-medium leading-tight text-ink sm:text-[38px]">
              From request to your first session.
            </h2>
          </Reveal>

          <div className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div
              className="pointer-events-none absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-ink/0 via-ink/15 to-ink/0 lg:block"
              aria-hidden
            />
            {[
              {
                icon: ClipboardList,
                step: "01",
                title: "Share your requirement",
                text: "Tell us the level, subject, board, city and budget in a short form.",
              },
              {
                icon: Users,
                step: "02",
                title: "We shortlist tutors",
                text: "We match your requirement against tutors who genuinely fit it.",
              },
              {
                icon: MessageCircle,
                step: "03",
                title: "Connect on WhatsApp",
                text: "We reach out with suitable options so you can ask questions directly.",
              },
              {
                icon: CalendarCheck,
                step: "04",
                title: "Start learning",
                text: "Agree on a schedule with your chosen tutor and begin sessions.",
              },
            ].map(({ icon: Icon, step, title, text }, i) => (
              <Reveal key={step} delay={i * 0.08} className="relative pl-1">
                <div className="relative flex items-center gap-3">
                  <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <span className="font-mono text-[13px] text-slate-light">{step}</span>
                </div>
                <h3 className="mt-4 font-display text-[18px] font-medium text-ink">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate">{text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------------------- FAQ */}
      <section className="border-t border-ink/[0.06] py-20 sm:py-24">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">FAQs</p>
            <h2 className="mt-3 text-balance font-display text-[32px] font-medium leading-tight text-ink sm:text-[38px]">
              Questions, answered.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <FAQ />
          </Reveal>
        </Container>
      </section>

      {/* --------------------------------------------------------------- FINAL CTA */}
      <section className="border-t border-ink/[0.06] py-20 sm:py-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-bridge px-8 py-16 text-center sm:px-16">
              <div
                className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
                aria-hidden
              />
              <h2 className="text-balance font-display text-[30px] font-medium leading-tight text-white sm:text-[38px]">
                Ready to find the right tutor?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-balance text-[15px] leading-relaxed text-white/80">
                Tell us what you need and we&rsquo;ll connect you with a suitable tutor
                on WhatsApp — usually within a day.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
                <CTAButton href="/find-a-tutor" variant="primary" className="!bg-ink hover:!bg-ink-light">
                  Find a Tutor
                </CTAButton>
                <CTAButton href="/become-a-tutor" variant="secondary" className="!border-white/30 !text-white hover:!bg-white/10">
                  Become a Tutor
                </CTAButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
