import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-12 gap-3 sm:gap-4 w-full min-w-0",
        className
      )}
    >
      {children}
    </div>
  );
}

export default BentoGrid;
