"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Info, CreditCard } from "lucide-react";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { BentoCard } from "@/components/bento/BentoCard";
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
  const { items, subtotal, discount, total, paymentMethods, terms, note } = data;

  return (
    <motion.div
      className="p-6 sm:p-8 min-h-full"
      variants={reduced ? undefined : screenEnter}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="pricing"
    >
      <motion.div
        className="flex flex-col gap-6 max-w-5xl mx-auto"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-1">
          <span
            className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--primary-light)" }}
          >
            Detalle de inversión
          </span>
          <h1
            className="font-bold"
            style={{ fontSize: "clamp(20px, 3vw, 32px)", color: "var(--text-primary)" }}
          >
            Presupuesto detallado
          </h1>
        </motion.div>

        <BentoGrid>
          {/* Main price table — 8 cols */}
          <BentoCard colSpan={12} colSpanSm={8} noPadding>
            <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col">
              {/* Table header */}
              <div
                className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 text-[10px] font-semibold uppercase tracking-widest"
                style={{
                  background: "var(--surface-panel)",
                  borderBottom: "1px solid var(--border)",
                  color: "var(--text-subtle)",
                }}
              >
                <span>Concepto</span>
                <span>Total</span>
              </div>

              {/* Rows */}
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4"
                  style={{
                    borderBottom: i < items.length - 1 ? "1px solid var(--border)" : undefined,
                    background: item.highlight
                      ? "color-mix(in srgb, var(--primary) 5%, var(--surface-card))"
                      : i % 2 !== 0
                      ? "color-mix(in srgb, var(--surface-panel) 40%, var(--surface-card))"
                      : "var(--surface-card)",
                  }}
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      {item.category && (
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded"
                          style={{
                            background: "var(--surface-panel)",
                            color: "var(--text-subtle)",
                          }}
                        >
                          {item.category}
                        </span>
                      )}
                      <span
                        className="text-sm font-medium"
                        style={{ color: item.highlight ? "var(--primary-light)" : "var(--text-primary)" }}
                      >
                        {item.name}
                      </span>
                    </div>
                    {item.description && (
                      <span
                        className="text-xs"
                        style={{ color: "var(--text-subtle)" }}
                      >
                        {item.description}
                      </span>
                    )}
                  </div>
                  <span
                    className="text-sm font-semibold tabular-nums self-center"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {formatCurrency(item.total, meta.currency)}
                  </span>
                </div>
              ))}

              {/* Summary */}
              <div
                className="flex flex-col gap-2 px-5 py-4"
                style={{ borderTop: "1px solid var(--border-strong)" }}
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
                <div className="flex justify-between items-center pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    Total
                  </span>
                  <span
                    className="text-2xl font-bold tabular-nums"
                    style={{ color: "var(--primary-light)" }}
                  >
                    <AnimatedNumber value={total} currency={meta.currency} />
                  </span>
                </div>
              </div>
            </motion.div>
          </BentoCard>

          {/* Right column */}
          <div className="col-span-12 sm:col-span-4 flex flex-col gap-4">
            {/* Payment methods */}
            {paymentMethods && paymentMethods.length > 0 && (
              <BentoCard colSpan={12}>
                <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <CreditCard size={14} style={{ color: "var(--text-subtle)" }} />
                    <span
                      className="text-[10px] font-semibold uppercase tracking-widest"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      Métodos de pago
                    </span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {paymentMethods.map((method, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "var(--primary)" }}
                          aria-hidden="true"
                        />
                        {method}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </BentoCard>
            )}

            {/* Terms */}
            {terms && terms.length > 0 && (
              <BentoCard colSpan={12} highlight>
                <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-3">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    Condiciones
                  </span>
                  <ul className="flex flex-col gap-2">
                    {terms.map((term, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <CheckCircle2
                          size={12}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: "var(--primary-light)" }}
                        />
                        {term}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </BentoCard>
            )}
          </div>

          {/* Note */}
          {note && (
            <BentoCard colSpan={12}>
              <motion.div
                variants={reduced ? undefined : fadeUp}
                className="flex gap-2 items-start"
              >
                <Info
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "var(--text-subtle)" }}
                />
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-subtle)" }}>
                  {note}
                </p>
              </motion.div>
            </BentoCard>
          )}
        </BentoGrid>
      </motion.div>
    </motion.div>
  );
}

export default PricingScreen;
