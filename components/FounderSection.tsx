import Image from "next/image";
import { Linkedin } from "lucide-react";
import Reveal from "./Reveal";

export default function FounderSection() {
  return (
    <Reveal>
      <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        {/* Photo */}
        <div className="relative mx-auto w-full max-w-[300px] md:mx-0">
          {/* Decorative accent tab peeking from behind the photo */}
          <span
            className="absolute -bottom-3 -left-3 h-16 w-5 rounded-md bg-gold/70"
            aria-hidden
          />
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-card-hover">
            <Image
              src="/founder.jpg"
              alt="Hammad, Founder of TutorBridge"
              fill
              sizes="(max-width: 768px) 300px, 30vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="eyebrow flex items-center gap-2">
            <span className="h-px w-6 bg-bridge-dark" aria-hidden />
            About the founder
          </p>

          {/* Quote card */}
          <div className="relative mt-5 rounded-3xl bg-ink/[0.035] px-7 py-8 sm:px-9 sm:py-10">
            <span
              className="pointer-events-none absolute left-5 top-3 font-display text-[72px] italic leading-none text-ink/[0.08]"
              aria-hidden
            >
              &rdquo;
            </span>
            <p className="relative font-display text-[24px] italic leading-[1.35] text-ink sm:text-[27px]">
              &ldquo;Education is the bridge between potential and opportunity. My
              mission with TutorBridge is to guide every family across that
              bridge — to a tutor they can actually trust.&rdquo;
            </p>
          </div>

          <p className="mt-6 text-[14.5px] leading-relaxed text-slate">
            I&rsquo;m Hammad, a <strong className="font-semibold text-ink">Computer
            Science student at FAST-NUCES</strong>. Having gone through{" "}
            <strong className="font-semibold text-ink">O Levels at BVS Parsi High
            School</strong> and <strong className="font-semibold text-ink">A Levels
            at Alpha College</strong> myself, and later teaching students through
            those same systems, I saw firsthand how hard it was for parents to
            find tutors they could truly trust — locally and internationally.
            I founded <strong className="font-semibold text-ink">TutorBridge</strong>{" "}
            in <strong className="font-semibold text-ink">2026</strong> to fix that.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="https://www.linkedin.com/in/syed-hammad-haider-4ab449292/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-5 py-2.5 text-[13.5px] font-medium text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0958AB] hover:shadow-card-hover"
            >
              <Linkedin size={16} />
              Connect on LinkedIn
            </a>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-2 text-[12.5px] font-medium text-ink/70">
              <span className="h-1.5 w-1.5 rounded-full bg-bridge" />
              Actively building TutorBridge
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
