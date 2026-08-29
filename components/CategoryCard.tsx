import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

const palettes: Record<string, string> = {
  ink: "bg-ink text-paper",
  bridge: "bg-bridge text-white",
  gold: "bg-gold text-white",
};

export default function CategoryCard({
  icon: Icon,
  title,
  blurb,
  href,
  tone = "ink",
}: {
  icon: LucideIcon;
  title: string;
  blurb: string;
  href: string;
  tone?: "ink" | "bridge" | "gold";
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink/[0.06] bg-white/70 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
    >
      <div className={`flex h-28 items-center justify-center ${palettes[tone]}`}>
        <Icon size={30} strokeWidth={1.75} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[17px] font-medium text-ink">{title}</h3>
        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slate">{blurb}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-bridge-dark">
          Start now
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
