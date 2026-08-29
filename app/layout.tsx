import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatWidget from "@/components/ChatWidget";
import { siteConfig } from "@/lib/site-config";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "TutorBridge — Find the Right Tutor. Learn with Confidence.",
    template: "%s | TutorBridge",
  },
  description: siteConfig.description,
  keywords: [
    "TutorBridge",
    "online tutors",
    "O Level tutors",
    "IGCSE tutors",
    "A Level tutors",
    "Matric tutors",
    "IELTS tutors",
    "SAT tutors",
    "home tutors",
    "international tutors",
  ],
  openGraph: {
    title: "TutorBridge — Find the Right Tutor. Learn with Confidence.",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "TutorBridge",
    locale: "en_US",
    type: "website",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "TutorBridge" }],
  },
  twitter: {
    card: "summary",
    title: "TutorBridge — Find the Right Tutor. Learn with Confidence.",
    description: siteConfig.description,
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
      </body>
    </html>
  );
}
