"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { HeroScreenData } from "@/types/presentation";
import { fadeUp } from "@/lib/motion-variants";

interface HeroSectionProps {
  id: string;
  data: HeroScreenData;
}

export function HeroSection({ id, data }: HeroSectionProps) {
  const reduced = useReducedMotion();

  const scrollToNecesidades = () => {
    const el = document.getElementById("necesidades");
    el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section
      id={id}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-5 sm:px-8 lg:px-14 py-16"
      style={{
        background: "var(--surface-bg)",
        backgroundImage:
          "radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--primary) 8%, transparent) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }}
    >
      <motion.div
        className="flex max-w-3xl flex-col items-center gap-6 text-center"
        initial={reduced ? false : "hidden"}
        animate="visible"
        variants={fadeUp}
      >
        {data.clientLabel && (
          <span
            className="text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "var(--text-subtle)" }}
          >
            {data.clientLabel}
            {data.dateLabel ? ` · ${data.dateLabel}` : ""}
          </span>
        )}
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
          style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
        >
          {data.title}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
          {data.subtitle}
        </p>
        <button
          type="button"
          onClick={scrollToNecesidades}
          className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          style={{ background: "var(--primary)", color: "#fff" }}
        >
          {data.ctaLabel ?? "Ver propuesta ↓"}
          <ChevronDown size={16} aria-hidden />
        </button>
      </motion.div>
    </section>
  );
}

export default HeroSection;
