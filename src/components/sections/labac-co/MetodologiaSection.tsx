"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { MetodologiaScreenData } from "@/types/presentation";
import { DynamicIcon } from "@/components/ui/Icon";
import { fadeUp, stagger } from "@/lib/motion-variants";
import { CARD_SHADOW, METODOLOGIA_ICONS, SCROLL_VIEWPORT } from "./scroll-section-utils";

interface MetodologiaSectionProps {
  id: string;
  data: MetodologiaScreenData;
}

export function MetodologiaSection({ id, data }: MetodologiaSectionProps) {
  const reduced = useReducedMotion();
  const regularBlocks = data.bloques.filter((b) => b.id !== "sinergia");
  const sinergia = data.bloques.find((b) => b.id === "sinergia");

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
        <motion.div variants={fadeUp} className="flex flex-col gap-3 max-w-3xl">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
          >
            {data.title}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {data.bajada}
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {regularBlocks.map((bloque) => (
            <motion.article
              key={bloque.id}
              variants={fadeUp}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: "#fff",
                boxShadow: CARD_SHADOW,
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl"
                style={{ background: "color-mix(in srgb, var(--primary) 10%, transparent)" }}
              >
                <DynamicIcon name={METODOLOGIA_ICONS[bloque.icono]} size={22} style={{ color: "var(--primary)" }} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                {bloque.titulo}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {bloque.descripcion}
              </p>
            </motion.article>
          ))}
        </div>

        {sinergia && (
          <motion.article
            variants={fadeUp}
            className="rounded-2xl p-6 sm:p-8 flex flex-col gap-6"
            style={{
              background: "#fff",
              boxShadow: CARD_SHADOW,
              border: "2px solid color-mix(in srgb, var(--primary) 25%, transparent)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
                style={{ background: "color-mix(in srgb, var(--primary) 10%, transparent)" }}
              >
                <DynamicIcon name={METODOLOGIA_ICONS.synergy} size={22} style={{ color: "var(--primary)" }} />
              </div>
              <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                {sinergia.titulo}
              </h3>
            </div>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {sinergia.descripcion}
            </p>
            {sinergia.roles && sinergia.roles.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {sinergia.roles.map((role) => (
                  <div
                    key={role.nombre}
                    className="rounded-xl p-4 flex flex-col gap-2"
                    style={{ background: "var(--surface-bg)" }}
                  >
                    <span className="text-sm font-bold" style={{ color: "var(--primary)" }}>
                      {role.nombre}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {role.rol}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.article>
        )}
      </motion.div>
    </section>
  );
}

export default MetodologiaSection;
