"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import type { DocumentMeta } from "@/types/presentation";

interface AnimatedNumberProps {
  value: number;
  currency?: DocumentMeta["currency"];
  duration?: number;
  className?: string;
}

export function AnimatedNumber({
  value,
  currency,
  duration = 1200,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      setDisplayed(value);
      return;
    }

    const startTime = performance.now();
    const startValue = 0;

    function update(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(startValue + (value - startValue) * eased));
      if (progress < 1) requestAnimationFrame(update);
    }

    const frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, duration, reduced]);

  const formatted = currency
    ? formatCurrency(displayed, currency)
    : displayed.toLocaleString("es-AR");

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  );
}

export default AnimatedNumber;
