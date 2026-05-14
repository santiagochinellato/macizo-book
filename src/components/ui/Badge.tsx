import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "muted" | "accent" | "outline";
  className?: string;
}

const VARIANT_STYLES: Record<NonNullable<BadgeProps["variant"]>, React.CSSProperties> = {
  default: {
    background: "var(--primary)",
    color: "#fff",
  },
  success: {
    background: "var(--success)",
    color: "#fff",
  },
  muted: {
    background: "color-mix(in srgb, var(--muted) 15%, transparent)",
    color: "var(--muted)",
  },
  accent: {
    background: "color-mix(in srgb, var(--accent) 15%, transparent)",
    color: "var(--accent)",
  },
  outline: {
    background: "transparent",
    color: "var(--muted)",
    border: "1px solid var(--border)",
  },
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", className)}
      style={{
        letterSpacing: "0.04em",
        ...VARIANT_STYLES[variant],
      }}
    >
      {children}
    </span>
  );
}

export default Badge;
