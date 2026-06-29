"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import type { ProductosScreenData } from "@/types/presentation";
import { fadeUp, stagger } from "@/lib/motion-variants";
import { CARD_SHADOW, formatUsd, SCROLL_VIEWPORT } from "./scroll-section-utils";

interface ProductosSectionProps {
  id: string;
  data: ProductosScreenData;
}

export function ProductosSection({ id, data }: ProductosSectionProps) {
  const reduced = useReducedMotion();

  return (
    <section id={id} className="px-5 sm:px-8 lg:px-14 py-16 sm:py-20">
      <motion.div
        className="mx-auto max-w-3xl flex flex-col gap-10"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={SCROLL_VIEWPORT}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-3">
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

        <div className="flex flex-col gap-6">
          {data.productos.map((producto) => (
            <motion.article
              key={producto.id}
              variants={fadeUp}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: "#fff",
                boxShadow: CARD_SHADOW,
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="px-6 py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                      {producto.nombre}
                    </h3>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        background: "color-mix(in srgb, var(--primary) 12%, transparent)",
                        color: "var(--primary)",
                      }}
                    >
                      Disponible
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {producto.tagline}
                  </p>
                </div>
                <span
                  className="text-xl font-bold tabular-nums flex-shrink-0 px-3 py-1 rounded-lg"
                  style={{
                    background: "color-mix(in srgb, var(--primary) 8%, transparent)",
                    color: "var(--primary)",
                  }}
                >
                  {formatUsd(producto.precio_usd)}
                </span>
              </div>

              <div className="px-6 py-5 flex flex-col gap-5">
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {producto.descripcion}
                </p>

                {producto.roles_del_sistema && producto.roles_del_sistema.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {producto.roles_del_sistema.map((rol) => (
                      <li
                        key={rol}
                        className="text-sm leading-snug pl-3"
                        style={{
                          color: "var(--text-secondary)",
                          borderLeft: "2px solid var(--border)",
                        }}
                      >
                        {rol}
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="flex flex-col gap-2">
                  {producto.funciones_destacadas.map((fn) => (
                    <li key={fn} className="flex items-start gap-2.5 text-sm leading-snug">
                      <Check
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: "var(--primary)" }}
                        aria-hidden
                      />
                      <span style={{ color: "var(--text-secondary)" }}>{fn}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className="rounded-xl p-4 flex flex-col gap-3"
                  style={{ background: "var(--surface-bg)" }}
                >
                  <div className="flex items-center gap-2">
                    <Clock size={14} style={{ color: "var(--text-subtle)" }} aria-hidden />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
                      Próximos desarrollos
                    </span>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {producto.proximos_desarrollos.map((item) => (
                      <li key={item} className="text-sm leading-snug" style={{ color: "var(--text-muted)" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default ProductosSection;
