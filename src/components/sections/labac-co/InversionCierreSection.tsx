"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import type { AgencyConfig, InversionCierreScreenData } from "@/types/presentation";
import { fadeUp, stagger } from "@/lib/motion-variants";
import { formatUsd, SCROLL_VIEWPORT } from "./scroll-section-utils";

interface InversionCierreSectionProps {
  id: string;
  data: InversionCierreScreenData;
  agency: AgencyConfig;
}

export function InversionCierreSection({ id, data, agency }: InversionCierreSectionProps) {
  const reduced = useReducedMotion();
  const { inversion, proximos_pasos, cta } = data;
  const cuotas = Array.from({ length: inversion.modalidad_pago.cuotas }, (_, i) => i + 1);

  // Sección de cierre — fondo oscuro intencional para marcar momento de decisión
  const darkBg = "color-mix(in srgb, var(--primary) 92%, black)";

  return (
    <section
      id={id}
      className="px-5 sm:px-8 lg:px-14 py-16 sm:py-24"
      style={{ background: darkBg, color: "#fff" }}
    >
      <motion.div
        className="mx-auto max-w-4xl flex flex-col gap-12"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={SCROLL_VIEWPORT}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-3 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {data.title}
          </h2>
          <p className="text-base opacity-85 leading-relaxed">{data.bajada}</p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-2 text-center">
          <span className="text-sm uppercase tracking-widest opacity-75">LABAC + CO · un solo proyecto</span>
          <span
            className="text-5xl sm:text-6xl font-bold tabular-nums leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {formatUsd(inversion.precio_unificado_usd)}
          </span>
          <p className="text-sm opacity-80 max-w-md">{inversion.nota_precio}</p>
          <p className="text-xs opacity-65 mt-1">
            Referencia por empresa: {formatUsd(inversion.precio_por_empresa_usd)}
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <p className="text-center text-sm font-semibold">{inversion.modalidad_pago.descripcion}</p>
          <div className="flex items-center justify-between gap-2 max-w-lg mx-auto w-full">
            {cuotas.map((n, i) => (
              <div key={n} className="flex items-center flex-1 min-w-0">
                <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background: "#fff",
                      color: darkBg,
                    }}
                  >
                    {n}
                  </div>
                  <span className="text-[10px] sm:text-xs text-center opacity-85 tabular-nums">
                    {formatUsd(inversion.modalidad_pago.monto_por_cuota_usd)}
                  </span>
                </div>
                {i < cuotas.length - 1 && (
                  <div className="h-px flex-1 opacity-30" style={{ background: "#fff" }} aria-hidden />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="text-center flex flex-col gap-1">
          <p className="text-sm font-medium">{inversion.mantenimiento_mensual.descripcion}</p>
          <p className="text-xs opacity-70">{inversion.mantenimiento_mensual.nota}</p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-3">
          {proximos_pasos.map((paso) => (
            <article
              key={paso.paso}
              className="rounded-2xl p-5 flex flex-col gap-3"
              style={{
                background: paso.destacado
                  ? "color-mix(in srgb, #fff 18%, transparent)"
                  : "color-mix(in srgb, #fff 8%, transparent)",
                border: paso.destacado ? "2px solid color-mix(in srgb, #fff 40%, transparent)" : "1px solid color-mix(in srgb, #fff 15%, transparent)",
              }}
            >
              <span className="text-xs font-bold uppercase tracking-wider opacity-75">
                Paso {paso.paso}
              </span>
              <h3 className="text-base font-bold leading-snug">{paso.accion}</h3>
              <p className="text-sm opacity-85 leading-relaxed flex-1">{paso.descripcion}</p>
              <span className="text-xs font-semibold opacity-90">{paso.timing}</span>
            </article>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-5 pt-4">
          <p className="text-xl font-bold">{cta.texto}</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {cta.whatsapp && agency.social?.whatsapp && (
              <a
                href={agency.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{ background: "#fff", color: darkBg }}
              >
                <MessageCircle size={18} aria-hidden />
                WhatsApp
              </a>
            )}
            {cta.email && (
              <a
                href={`mailto:${agency.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "2px solid color-mix(in srgb, #fff 50%, transparent)",
                }}
              >
                <Mail size={18} aria-hidden />
                Email
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default InversionCierreSection;
