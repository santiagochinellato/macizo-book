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

const COL_SPAN_MD: Record<ColSpan, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12",
};

interface BentoCardProps {
  children: React.ReactNode;
  colSpan?: ColSpan;
  rowSpan?: RowSpan;
  colSpanSm?: ColSpan;
  colSpanMd?: ColSpan;
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
  colSpanMd,
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
        colSpanMd ? COL_SPAN_MD[colSpanMd] : "",
        !noPadding && "p-4 sm:p-5",
        onClick && "cursor-pointer",
        className
      )}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        borderLeft: highlight ? "3px solid var(--primary)" : "1px solid var(--border)",
        boxShadow: "var(--shadow-card)",
      }}
      whileHover={
        reduced || !onClick
          ? undefined
          : {
              boxShadow: "var(--shadow-card-hover)",
              borderColor: "color-mix(in srgb, var(--primary) 25%, var(--border))",
              transition: { duration: 0.15 },
            }
      }
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export default BentoCard;
