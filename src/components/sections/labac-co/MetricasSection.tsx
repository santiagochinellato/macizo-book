"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { MetricasScreenData } from "@/types/presentation";
import { fadeUp, stagger } from "@/lib/motion-variants";
import { CARD_SHADOW, SCROLL_VIEWPORT } from "./scroll-section-utils";

interface MetricasSectionProps {
  id: string;
  data: MetricasScreenData;
}

export function MetricasSection({ id, data }: MetricasSectionProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id={id}
      className="px-5 sm:px-8 lg:px-14 py-16 sm:py-20"
      style={{ background: "var(--surface-panel)" }}
    >
      <motion.div
        className="mx-auto max-w-6xl flex flex-col gap-10"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={SCROLL_VIEWPORT}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-3 max-w-2xl">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
          >
            {data.title}
          </h2>
          {data.bajada && (
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {data.bajada}
            </p>
          )}
        </motion.div>

        <div className="flex flex-col gap-4">
          {data.metricas.map((metrica) => (
            <motion.article
              key={metrica.indicador}
              variants={fadeUp}
              className="rounded-2xl p-5 sm:p-6 flex flex-col gap-4"
              style={{
                background: "#fff",
                boxShadow: CARD_SHADOW,
                border: "1px solid var(--border)",
              }}
            >
              <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                {metrica.indicador}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <span className="text-sm leading-snug flex-1" style={{ color: "var(--text-muted)" }}>
                  {metrica.antes}
                </span>
                <ArrowRight
                  size={18}
                  className="hidden sm:block flex-shrink-0"
                  style={{ color: "var(--text-subtle)" }}
                  aria-hidden
                />
                <span className="text-sm font-semibold leading-snug flex-1" style={{ color: "var(--primary)" }}>
                  {metrica.despues}
                </span>
              </div>
              <p className="text-sm font-bold leading-snug" style={{ color: "var(--text-primary)" }}>
                {metrica.impacto}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default MetricasSection;
