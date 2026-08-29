import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/Container";
import FindTutorForm from "@/components/FindTutorForm";

export const metadata: Metadata = {
  title: "Find a Tutor",
  description:
    "Tell TutorBridge your student's level, subject, board, city and budget — we'll connect you with a suitable tutor on WhatsApp.",
};

export default function FindATutorPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <div className="text-center">
          <p className="eyebrow justify-center">Find a tutor</p>
          <h1 className="mt-3 text-balance font-display text-[34px] font-medium leading-tight text-ink sm:text-[42px]">
            Tell us what you need. We&rsquo;ll find who fits.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-[15px] leading-relaxed text-slate">
            Fill in a few details about your requirement — it takes under two minutes.
            We&rsquo;ll match you with suitable tutors and follow up on WhatsApp.
          </p>
        </div>

        <div className="mt-12">
          <Suspense fallback={null}>
            <FindTutorForm />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
