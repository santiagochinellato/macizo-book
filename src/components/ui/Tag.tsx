import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn("inline-flex items-center rounded px-2 py-0.5 text-xs font-medium", className)}
      style={{
        background: "color-mix(in srgb, var(--border) 60%, transparent)",
        color: "var(--muted)",
        fontFamily: "var(--font-body)",
      }}
    >
      {children}
    </span>
  );
}

export default Tag;
