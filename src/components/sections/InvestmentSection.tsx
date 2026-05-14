"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Info } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { stagger, fadeUp } from "@/lib/motion-variants";
import { formatCurrency } from "@/lib/utils";
import type { InvestmentData, DocumentMeta } from "@/types/presentation";

interface InvestmentSectionProps {
  data: InvestmentData;
  meta: DocumentMeta;
  label?: string;
}

export function InvestmentSection({ data, meta, label }: InvestmentSectionProps) {
  const reduced = useReducedMotion();
  const { items, subtotal, discount, total, note } = data;

  return (
    <section
      id="investment"
      className="px-5 sm:px-8 lg:px-14 py-12"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <SectionLabel className="mb-6">{label ?? "Inversión"}</SectionLabel>

      <motion.div
        className="flex flex-col gap-4"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Desktop table */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          className="hidden sm:block rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "color-mix(in srgb, var(--primary) 5%, var(--surface))" }}>
                <th
                  className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--muted)" }}
                >
                  Concepto
                </th>
                <th
                  className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest hidden md:table-cell"
                  style={{ color: "var(--muted)" }}
                >
                  Categoría
                </th>
                <th
                  className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--muted)" }}
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr
                  key={item.id}
                  style={{
                    background: item.highlight
                      ? "color-mix(in srgb, var(--accent) 5%, var(--surface))"
                      : i % 2 === 0
                      ? "var(--surface)"
                      : "color-mix(in srgb, var(--bg) 40%, var(--surface))",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <td className="px-5 py-4">
                    <span
                      className="font-medium"
                      style={{
                        color: item.highlight ? "var(--accent)" : "var(--fg)",
                        fontWeight: item.highlight ? 600 : 400,
                      }}
                    >
                      {item.name}
                    </span>
                    {item.description && (
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        {item.description}
                      </p>
                    )}
                  </td>
                  <td
                    className="px-4 py-4 text-xs hidden md:table-cell"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.category ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-right font-medium" style={{ color: "var(--fg)" }}>
                    {formatCurrency(item.total, meta.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile cards */}
        <div className="sm:hidden flex flex-col gap-2">
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={reduced ? undefined : fadeUp}
              className="flex items-start justify-between p-4 rounded-xl gap-3"
              style={{
                background: item.highlight
                  ? "color-mix(in srgb, var(--accent) 8%, var(--surface))"
                  : "var(--surface)",
                border: `1px solid ${item.highlight ? "var(--accent)" : "var(--border)"}`,
              }}
            >
              <div className="flex flex-col gap-0.5">
                <span
                  className="text-sm font-medium"
                  style={{ color: item.highlight ? "var(--accent)" : "var(--fg)" }}
                >
                  {item.name}
                </span>
                {item.description && (
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    {item.description}
                  </span>
                )}
                {item.category && (
                  <span
                    className="text-xs mt-1 font-medium"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.category}
                  </span>
                )}
              </div>
              <span className="text-sm font-semibold flex-shrink-0" style={{ color: "var(--fg)" }}>
                {formatCurrency(item.total, meta.currency)}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          className="flex flex-col items-end gap-2 pt-2"
        >
          <div className="flex flex-col gap-1 w-full sm:w-64">
            {subtotal !== total && (
              <div className="flex justify-between text-sm" style={{ color: "var(--muted)" }}>
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal, meta.currency)}</span>
              </div>
            )}
            {discount !== undefined && discount > 0 && (
              <div className="flex justify-between text-sm" style={{ color: "var(--success)" }}>
                <span>Descuento</span>
                <span>− {formatCurrency(discount, meta.currency)}</span>
              </div>
            )}
            <div
              className="flex justify-between items-baseline pt-2 mt-1"
              style={{ borderTop: "2px solid var(--border)" }}
            >
              <span
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "var(--muted)" }}
              >
                Total
              </span>
              <span
                className="text-3xl font-bold"
                style={{
                  color: "var(--primary)",
                  fontFamily: "var(--font-display)",
                }}
              >
                <AnimatedNumber value={total} currency={meta.currency} />
              </span>
            </div>
          </div>
        </motion.div>

        {/* Note */}
        {note && (
          <motion.div
            variants={reduced ? undefined : fadeUp}
            className="flex gap-2 p-4 rounded-xl text-sm leading-relaxed"
            style={{
              background: "color-mix(in srgb, var(--primary) 4%, var(--surface))",
              border: "1px solid var(--border)",
              color: "var(--muted)",
            }}
          >
            <Info size={15} className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
            <span>{note}</span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

export default InvestmentSection;
