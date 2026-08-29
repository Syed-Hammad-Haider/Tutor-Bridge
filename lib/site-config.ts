// ---------------------------------------------------------------------------
// TutorBridge site configuration
// Edit the values below to update contact details and links across the
// entire site. Nothing here is sensitive — safe to keep in source control.
// ---------------------------------------------------------------------------

export const siteConfig = {
  name: "TutorBridge",
  tagline: "Find the Right Tutor. Learn with Confidence.",
  description:
    "TutorBridge connects students and parents with experienced, vetted tutors for O Levels, IGCSE, A Levels, Matric, Intermediate, IELTS, SAT and school-level tuition — online, worldwide.",
  url: "https://tutorbridge.vercel.app",

  // WhatsApp numbers (used for CTAs). First number is treated as primary.
  whatsapp: {
    numbers: ["+923142153290", "+923347774876"],
    // Pre-filled message for the "Find a Tutor" flow.
    defaultMessage:
      "Hi TutorBridge! I'd like help finding a tutor.",
  },

  social: {
    instagram: "https://www.instagram.com/tutorbridge53/",
    facebook: "https://www.facebook.com/people/Tutor-Bridge/61592410440051/",
  },

  email: "tutorbridge53@gmail.com",
};

// Builds a wa.me link from a phone number + optional message.
export function buildWhatsAppLink(message?: string, number?: string) {
  const raw = (number ?? siteConfig.whatsapp.numbers[0]).replace(/[^\d]/g, "");
  const text = encodeURIComponent(message ?? siteConfig.whatsapp.defaultMessage);
  return `https://wa.me/${raw}?text=${text}`;
}
