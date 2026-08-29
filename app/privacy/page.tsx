import type { Metadata } from "next";
import Container from "@/components/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How TutorBridge collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <p className="eyebrow">Privacy</p>
        <h1 className="mt-3 font-display text-[32px] font-medium leading-tight text-ink sm:text-[38px]">
          Privacy Policy
        </h1>
        <p className="mt-3 text-[13.5px] text-slate-light">Last updated: August 2026</p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-slate">
          <div>
            <h2 className="font-display text-[19px] font-medium text-ink">What we collect</h2>
            <p className="mt-2">
              When you submit the &ldquo;Find a Tutor&rdquo; or &ldquo;Become a Tutor&rdquo;
              forms, we collect the details you provide — such as your name, WhatsApp number,
              city, subjects, academic level, and any notes you add. We don&rsquo;t collect
              anything beyond what you choose to submit.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[19px] font-medium text-ink">How we use it</h2>
            <p className="mt-2">
              We use your information solely to match you with a suitable tutor or student and
              to contact you — usually on WhatsApp — about that request. We don&rsquo;t sell your
              information, and we don&rsquo;t use it for advertising.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[19px] font-medium text-ink">Where it&rsquo;s stored</h2>
            <p className="mt-2">
              Submissions are stored in a secured database that only TutorBridge&rsquo;s team can
              access. Access to this data is password-protected and not exposed publicly on the
              website.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[19px] font-medium text-ink">Your choices</h2>
            <p className="mt-2">
              You can ask us to delete your submitted information at any time by messaging us on
              WhatsApp or emailing{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-bridge-dark hover:underline">
                {siteConfig.email}
              </a>
              . We&rsquo;ll remove it promptly.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[19px] font-medium text-ink">AI chat assistant</h2>
            <p className="mt-2">
              The chat assistant on this site is designed to answer general academic and
              TutorBridge-related questions. Please avoid sharing sensitive personal details in
              that chat — use the Find a Tutor form or WhatsApp for anything that should be kept
              private.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[19px] font-medium text-ink">Questions?</h2>
            <p className="mt-2">
              Reach out anytime at{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-bridge-dark hover:underline">
                {siteConfig.email}
              </a>{" "}
              and we&rsquo;ll be glad to help.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
