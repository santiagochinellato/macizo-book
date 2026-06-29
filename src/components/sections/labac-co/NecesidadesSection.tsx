"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { NecesidadesScreenData } from "@/types/presentation";
import { fadeUp, stagger } from "@/lib/motion-variants";
import { CARD_SHADOW, SCROLL_VIEWPORT } from "./scroll-section-utils";

interface NecesidadesSectionProps {
  id: string;
  data: NecesidadesScreenData;
}

function estadoLabel(estado: "oportunidad" | "en_progreso"): string {
  return estado === "en_progreso" ? "En progreso" : "Oportunidad";
}

export function NecesidadesSection({ id, data }: NecesidadesSectionProps) {
  const reduced = useReducedMotion();
  const empresas = Object.entries(data.empresas);

  return (
    <section id={id} className="px-5 sm:px-8 lg:px-14 py-16 sm:py-20">
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
          {data.description && (
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {data.description}
            </p>
          )}
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {empresas.map(([key, empresa]) => (
            <motion.div key={key} variants={fadeUp} className="flex flex-col gap-4">
              <h3 className="text-lg font-bold" style={{ color: "var(--primary)" }}>
                {empresa.titulo}
              </h3>
              <div className="flex flex-col gap-3">
                {empresa.items.map((item) => (
                  <article
                    key={item.area}
                    className="rounded-2xl p-5 flex flex-col gap-2"
                    style={{
                      background: "#fff",
                      boxShadow: CARD_SHADOW,
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {item.area}
                      </h4>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{
                          background:
                            item.estado === "en_progreso"
                              ? "color-mix(in srgb, var(--primary) 12%, transparent)"
                              : "color-mix(in srgb, var(--accent) 15%, transparent)",
                          color: "var(--primary)",
                        }}
                      >
                        {estadoLabel(item.estado)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {item.descripcion}
                    </p>
                  </article>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default NecesidadesSection;
