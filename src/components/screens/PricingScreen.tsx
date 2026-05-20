"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, CreditCard, Star } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { screenEnter, stagger, fadeUp } from "@/lib/motion-variants";
import { formatCurrency } from "@/lib/utils";
import type { PricingScreenData, DocumentMeta } from "@/types/presentation";

interface PricingScreenProps {
  data: PricingScreenData;
  meta: DocumentMeta;
}

export function PricingScreen({ data, meta }: PricingScreenProps) {
  const reduced = useReducedMotion();
  const { items, subtotal, discount, total, paymentPlans, paymentMethods, terms, note } = data;

  return (
    <motion.div
      className="min-h-full w-full min-w-0 px-5 sm:px-8 lg:px-14 py-6 sm:py-8"
      variants={reduced ? undefined : screenEnter}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="pricing"
    >
      <motion.div
        className="flex flex-col gap-8 max-w-4xl mx-auto w-full min-w-0"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        animate="visible"
      >
        {/* ── Hero total ── */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className="block flex-shrink-0"
              style={{ width: 14, height: 2, background: "var(--primary)", borderRadius: 0 }}
              aria-hidden="true"
            />
            <span
              className="text-[9px] font-bold uppercase tracking-widest"
              style={{ color: "var(--primary)" }}
            >
              Inversión total
            </span>
          </div>
          <div className="flex items-end gap-4 flex-wrap">
            <span
              className="font-bold tabular-nums leading-none"
              style={{
                fontSize: "clamp(42px, 7vw, 72px)",
                color: "var(--primary)",
                fontFamily: "var(--font-display)",
              }}
            >
              <AnimatedNumber value={total} currency={meta.currency} />
            </span>
            <span
              className="text-base font-medium mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              Sitio web profesional · Ciudad Oeste Centro Médico
            </span>
          </div>
          <div
            className="mt-1"
            style={{ height: 2, width: 48, background: "var(--primary)", borderRadius: 0 }}
          />
        </motion.div>

        {/* ── Planes de pago ── */}
        {paymentPlans && paymentPlans.length > 0 && (
          <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-3">
            <span
              className="text-[9px] font-bold uppercase tracking-widest"
              style={{ color: "var(--text-tertiary)" }}
            >
              Opciones de pago
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paymentPlans.map((plan, i) => (
                <div
                  key={i}
                  className="relative flex flex-col gap-2 p-5"
                  style={{
                    background: plan.featured
                      ? "color-mix(in srgb, var(--primary) 6%, var(--surface-card))"
                      : "var(--surface-card)",
                    border: plan.featured
                      ? "2px solid var(--primary)"
                      : "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: plan.featured ? "var(--shadow-card-hover)" : "var(--shadow-card)",
                  }}
                >
                  {plan.featured && (
                    <div
                      className="absolute -top-3 left-5 flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                      style={{
                        background: "var(--primary)",
                        color: "#fff",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      <Star size={9} />
                      Recomendado
                    </div>
                  )}
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: plan.featured ? "var(--primary)" : "var(--text-secondary)" }}
                  >
                    {plan.title}
                  </span>
                  <span
                    className="text-2xl font-bold tabular-nums leading-none"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {plan.amount}
                  </span>
                  <span
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {plan.detail}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Desglose itemizado ── */}
        <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-3">
          <span
            className="text-[9px] font-bold uppercase tracking-widest"
            style={{ color: "var(--text-tertiary)" }}
          >
            Desglose del presupuesto
          </span>
          <div
            className="overflow-x-auto overflow-hidden"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              background: "var(--surface-card)",
            }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 text-[10px] font-bold uppercase tracking-widest"
              style={{
                background: "var(--surface-bg)",
                borderBottom: "1px solid var(--border)",
                color: "var(--text-tertiary)",
              }}
            >
              <span>Concepto</span>
              <span>Total</span>
            </div>

            {items.map((item, i) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4"
                style={{
                  borderBottom: i < items.length - 1 ? "1px solid var(--border)" : undefined,
                }}
              >
                <div className="flex flex-col gap-0.5">
                  {item.category && (
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {item.category}
                    </span>
                  )}
                  <span
                    className="text-sm font-medium"
                    style={{ color: item.highlight ? "var(--primary)" : "var(--text-primary)" }}
                  >
                    {item.name}
                  </span>
                  {item.description && (
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {item.description}
                    </span>
                  )}
                </div>
                <span
                  className="text-sm font-semibold tabular-nums self-center"
                  style={{ color: item.highlight ? "var(--primary)" : "var(--text-primary)" }}
                >
                  {formatCurrency(item.total, meta.currency)}
                </span>
              </div>
            ))}

            {/* Summary row */}
            <div
              className="flex flex-col gap-2 px-5 py-4"
              style={{ borderTop: "2px solid var(--border)" }}
            >
              {subtotal !== total && (
                <div className="flex justify-between text-sm" style={{ color: "var(--text-muted)" }}>
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatCurrency(subtotal, meta.currency)}</span>
                </div>
              )}
              {discount !== undefined && discount > 0 && (
                <div className="flex justify-between text-sm" style={{ color: "var(--success)" }}>
                  <span>Descuento</span>
                  <span className="tabular-nums">− {formatCurrency(discount, meta.currency)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-1">
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Total del proyecto
                </span>
                <span className="text-xl font-bold tabular-nums" style={{ color: "var(--primary)" }}>
                  {formatCurrency(total, meta.currency)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Métodos de pago ── */}
        {paymentMethods && paymentMethods.length > 0 && (
          <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <CreditCard size={13} style={{ color: "var(--text-tertiary)" }} />
              <span
                className="text-[9px] font-bold uppercase tracking-widest"
                style={{ color: "var(--text-tertiary)" }}
              >
                Métodos de pago aceptados
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-xs font-medium"
                  style={{
                    background: "var(--surface-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-secondary)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  {method}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Condiciones ── */}
        {terms && terms.length > 0 && (
          <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-3">
            <span
              className="text-[9px] font-bold uppercase tracking-widest"
              style={{ color: "var(--text-tertiary)" }}
            >
              Condiciones del presupuesto
            </span>
            <div
              className="flex flex-col gap-0"
              style={{
                background: "var(--surface-bg)",
                borderLeft: "3px solid var(--primary)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
                borderLeftWidth: "3px",
                borderLeftColor: "var(--primary)",
              }}
            >
              {terms.map((term, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-5 py-3"
                  style={{
                    borderBottom: i < terms.length - 1 ? "1px solid var(--border)" : undefined,
                  }}
                >
                  <CheckCircle2
                    size={13}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "var(--primary)" }}
                  />
                  <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {term}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Nota final ── */}
        {note && (
          <motion.div variants={reduced ? undefined : fadeUp}>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {note}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default PricingScreen;
