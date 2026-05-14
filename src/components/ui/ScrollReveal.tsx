"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { stagger, fadeUp } from "@/lib/motion-variants";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  isContainer?: boolean;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  variants,
  isContainer = false,
  delay = 0,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const resolvedVariants = variants ?? (isContainer ? stagger : fadeUp);

  return (
    <motion.div
      className={className}
      variants={resolvedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
