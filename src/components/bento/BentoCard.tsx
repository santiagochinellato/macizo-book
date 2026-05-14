"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type RowSpan = 1 | 2 | 3 | 4;

const COL_SPAN_CLASSES: Record<ColSpan, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

const ROW_SPAN_CLASSES: Record<RowSpan, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
};

const COL_SPAN_SM: Record<ColSpan, string> = {
  1: "sm:col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-3",
  4: "sm:col-span-4",
  5: "sm:col-span-5",
  6: "sm:col-span-6",
  7: "sm:col-span-7",
  8: "sm:col-span-8",
  9: "sm:col-span-9",
  10: "sm:col-span-10",
  11: "sm:col-span-11",
  12: "sm:col-span-12",
};

interface BentoCardProps {
  children: React.ReactNode;
  colSpan?: ColSpan;
  rowSpan?: RowSpan;
  colSpanSm?: ColSpan;
  className?: string;
  highlight?: boolean;
  noPadding?: boolean;
  onClick?: () => void;
}

export function BentoCard({
  children,
  colSpan = 12,
  rowSpan = 1,
  colSpanSm,
  className,
  highlight = false,
  noPadding = false,
  onClick,
}: BentoCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "rounded-[var(--radius-lg)] overflow-hidden",
        COL_SPAN_CLASSES[colSpan],
        ROW_SPAN_CLASSES[rowSpan],
        colSpanSm ? COL_SPAN_SM[colSpanSm] : "",
        !noPadding && "p-5",
        onClick && "cursor-pointer",
        className
      )}
      style={{
        background: "var(--surface-card)",
        border: highlight
          ? "1px solid color-mix(in srgb, var(--primary) 40%, var(--border))"
          : "1px solid var(--border)",
        boxShadow: highlight ? "0 0 0 1px var(--primary-glow) inset" : undefined,
      }}
      whileHover={
        reduced || !onClick
          ? undefined
          : {
              borderColor: "color-mix(in srgb, var(--primary) 35%, var(--border))",
              boxShadow: "0 0 20px var(--primary-glow)",
              transition: { duration: 0.2 },
            }
      }
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export default BentoCard;
