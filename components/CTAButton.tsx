import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink-light shadow-card hover:shadow-card-hover",
  secondary:
    "bg-transparent text-ink border border-ink/15 hover:border-ink/35 hover:bg-ink/[0.03]",
  ghost: "bg-transparent text-ink hover:text-bridge-dark",
  whatsapp: "bg-bridge text-white hover:bg-bridge-dark shadow-card hover:shadow-card-hover",
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
  icon = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  icon?: boolean;
  className?: string;
}) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition-all duration-300 ease-out";

  const content = (
    <>
      {children}
      {icon && (
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.25}
        />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${variants[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {content}
    </Link>
  );
}
