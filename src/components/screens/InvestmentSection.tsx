"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, Hammer, Wrench, CheckCircle2 } from "lucide-react";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { BentoCard } from "@/components/bento/BentoCard";
import { Chart } from "@/components/charts/Chart";
import { screenEnter, stagger, fadeUp } from "@/lib/motion-variants";
import type { BookSectionScreenData, ChartBookCard, InvestmentPhaseData } from "@/types/presentation";

interface InvestmentSectionProps {
  data: BookSectionScreenData;
}

interface PriceFlowProps {
  phase: InvestmentPhaseData;
  businessesCount: number;
  color: string;
  featured?: boolean;
}

function FlowConnector({ businessesCount }: { businessesCount: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-1 px-2 flex-shrink-0"
      style={{ color: "var(--text-subtle)" }}
      aria-hidden="true"
    >
      <ArrowRight size={20} className="hidden md:block" style={{ color: "var(--primary)" }} />
      <ArrowDown size={20} className="md:hidden" style={{ color: "var(--primary)" }} />
      <span className="text-sm font-bold tabular-nums" style={{ color: "var(--primary)" }}>
        ÷ {businessesCount}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-wide text-center leading-tight">
        negocios
      </span>
    </div>
  );
}

function PriceFlow({ phase, businessesCount, color, featured = false }: PriceFlowProps) {
  const Icon = phase.id === "build" ? Hammer : Wrench;
  const tint = `color-mix(in srgb, ${color} ${featured ? "14" : "9"}%, var(--surface-card))`;

  return (
    <div
      className="flex flex-col gap-4 p-5 sm:p-6 rounded-[var(--radius-lg)] h-full"
      style={{
        background: featured ? tint : "var(--surface-panel)",
        border: featured ? `2px solid color-mix(in srgb, ${color} 35%, transparent)` : "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-2">
        <Icon size={16} style={{ color }} aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
          {phase.title}
        </span>
        <span
          className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: `color-mix(in srgb, ${color} 15%, transparent)`, color }}
        >
          {phase.duration}
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-2">
        {/* Grupo */}
        <div
          className="flex flex-col gap-1 p-4 rounded-[var(--radius-md)] flex-1 min-w-0 text-center md:text-left"
          style={{ background: "var(--surface-card)", border: "1px solid var(--border)" }}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
            Abono del grupo
          </span>
          <span
            className="text-2xl sm:text-3xl font-bold tabular-nums leading-none"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
          >
            {phase.groupAmount}
          </span>
          <span className="text-xs leading-snug" style={{ color: "var(--text-muted)" }}>
            {phase.groupDetail}
          </span>
        </div>

        <FlowConnector businessesCount={businessesCount} />

        {/* Por empresa — protagonista */}
        <div
          className="flex flex-col gap-1 p-4 sm:p-5 rounded-[var(--radius-md)] flex-1 min-w-0 text-center"
          style={{
            background: featured ? color : `color-mix(in srgb, ${color} 12%, var(--surface-card))`,
            border: featured ? "none" : `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
          }}
        >
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: featured ? "rgba(255,255,255,0.75)" : color }}
          >
            Cada negocio invierte
          </span>
          <span
            className="text-3xl sm:text-4xl font-bold tabular-nums leading-none"
            style={{ color: featured ? "#fff" : color, fontFamily: "var(--font-display)" }}
          >
            {phase.perCompanyAmount}
          </span>
          <span
            className="text-xs font-semibold"
            style={{ color: featured ? "rgba(255,255,255,0.85)" : "var(--text-muted)" }}
          >
            por mes · {phase.perCompanyDetail}
          </span>
        </div>
      </div>

      <ul className="grid sm:grid-cols-2 gap-2 pt-1">
        {phase.includes.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-snug" style={{ color: "var(--text-secondary)" }}>
            <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5" style={{ color }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InvestmentSection({ data }: InvestmentSectionProps) {
  const reduced = useReducedMotion();
  const inv = data.investment;
  const color = data.accentColor ?? "var(--primary)";
  const chartCards = data.cards.filter((c): c is ChartBookCard => c.type === "chart");

  if (!inv) return null;

  return (
    <motion.div
      className="min-h-full w-full min-w-0 px-5 sm:px-8 lg:px-16 py-6 sm:py-8"
      variants={reduced ? undefined : screenEnter}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="flex flex-col gap-5 w-full min-w-0"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-1">
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color }}
          >
            {data.title}
          </span>
          {data.subtitle && (
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {data.subtitle}
            </p>
          )}
        </motion.div>

        {/* Hero — precio final por negocio */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          className="flex flex-col gap-3 p-6 sm:p-8 rounded-[var(--radius-lg)]"
          style={{ background: color, color: "#fff" }}
        >
          <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.7)" }}>
            {inv.heroEyebrow}
          </p>
          <h1
            className="font-bold leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", fontFamily: "var(--font-display)" }}
          >
            {inv.heroAmount}
            <span className="text-lg sm:text-xl font-semibold opacity-90"> / mes · por negocio</span>
          </h1>
          <p className="text-sm sm:text-base leading-relaxed max-w-3xl" style={{ color: "rgba(255,255,255,0.88)" }}>
            {inv.heroBody}
          </p>
          <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>
            {inv.heroFormula}
          </p>
        </motion.div>

        {/* Flujos BUILD y RUN con conectores */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          className="grid md:grid-cols-2 gap-4"
        >
          {inv.phases.map((phase) => (
            <PriceFlow
              key={phase.id}
              phase={phase}
              businessesCount={inv.businessesCount}
              color={color}
              featured={phase.id === "build"}
            />
          ))}
        </motion.div>

        {/* Contexto + entregables */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          className="grid md:grid-cols-2 gap-4"
        >
          <div
            className="flex flex-col gap-3 p-5 rounded-[var(--radius-lg)]"
            style={{
              background: "var(--surface-panel)",
              border: "1px solid var(--border)",
              borderLeft: `3px solid ${color}`,
            }}
          >
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
              {inv.contextHeading}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {inv.contextBody}
            </p>
            <ul className="flex flex-col gap-2">
              {inv.contextPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-snug" style={{ color: "var(--text-secondary)" }}>
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex flex-col gap-3 p-5 rounded-[var(--radius-lg)]"
            style={{ background: "var(--surface-panel)", border: "1px solid var(--border)" }}
          >
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
              {inv.deliverablesHeading}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {inv.deliverablesBody}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {inv.deliverablesStats.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-0.5 p-3 rounded-[var(--radius-md)] text-center"
                  style={{ background: "var(--surface-card)", border: "1px solid var(--border)" }}
                >
                  <span className="text-xl font-bold tabular-nums" style={{ color, fontFamily: "var(--font-display)" }}>
                    {s.value}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide leading-tight" style={{ color: "var(--text-subtle)" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Gráficos */}
        {chartCards.length > 0 && (
          <BentoGrid>
            {chartCards.map((card, i) => {
              const { colSpan, colSpanSm, colSpanMd } = card.span === "2x1"
                ? { colSpan: 12 as const, colSpanSm: 12 as const, colSpanMd: 8 as const }
                : { colSpan: 12 as const, colSpanSm: 6 as const, colSpanMd: 4 as const };
              return (
                <Fragment key={i}>
                  <BentoCard colSpan={colSpan} colSpanSm={colSpanSm} colSpanMd={colSpanMd}>
                    <motion.div variants={reduced ? undefined : fadeUp}>
                      <Chart card={card} />
                    </motion.div>
                  </BentoCard>
                </Fragment>
              );
            })}
          </BentoGrid>
        )}
      </motion.div>
    </motion.div>
  );
}

export default InvestmentSection;
