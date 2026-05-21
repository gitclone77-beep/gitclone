import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-cyan-glow text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.34)] hover:bg-white hover:shadow-[0_0_44px_rgba(90,167,255,0.48)]",
  secondary:
    "border border-cyan-glow/30 bg-white/5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-cyan-glow/70 hover:bg-cyan-glow/10",
  ghost: "text-muted hover:bg-white/5 hover:text-white"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 min-w-0 items-center justify-center rounded-full px-5 py-2.5 text-center text-sm font-semibold leading-5 transition duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-cyan-glow/70 focus:ring-offset-2 focus:ring-offset-background",
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
