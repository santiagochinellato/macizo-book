"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "@/lib/motion-variants";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      variants={reduced ? undefined : fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <span
        className="flex-shrink-0"
        style={{ width: 20, height: 2, background: "var(--accent)", display: "block" }}
      />
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.14em",
          color: "var(--accent)",
          textTransform: "uppercase",
          fontFamily: "var(--font-body)",
        }}
      >
        {children}
      </span>
    </motion.div>
  );
}

export default SectionLabel;
