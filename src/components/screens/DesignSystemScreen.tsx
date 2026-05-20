"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Globe,
  ShieldCheck,
  Smartphone,
  Target,
  Zap,
  Users,
  CircleCheck,
  type LucideProps,
} from "lucide-react";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { BentoCard } from "@/components/bento/BentoCard";
import { screenEnter, stagger, fadeUp } from "@/lib/motion-variants";
import type { DesignSystemScreenData, DesignColor, DesignFont, DesignPrinciple } from "@/types/presentation";

const PRINCIPLE_ICONS: Record<string, React.ComponentType<LucideProps>> = {
  ShieldCheck, Smartphone, Target, Zap, Users, Globe,
  Accessibility: CircleCheck,
};

interface DesignSystemScreenProps {
  data: DesignSystemScreenData;
}

function ColorSwatch({ color }: { color: DesignColor }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl" style={{ border: "1px solid var(--border)" }}>
      <div
        className="h-16 w-full flex items-end p-2.5"
        style={{ backgroundColor: color.hex }}
      >
        <span
          className="text-[10px] font-mono font-bold tracking-wider"
          style={{ color: color.textLight ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.45)" }}
        >
          {color.hex.toUpperCase()}
        </span>
      </div>
      <div className="flex flex-col gap-0.5 p-3" style={{ background: "var(--surface-card)" }}>
        <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
          {color.name}
        </span>
        <span className="text-[10px] leading-snug" style={{ color: "var(--text-muted)" }}>
          {color.role}
        </span>
      </div>
    </div>
  );
}

function FontCard({ font }: { font: DesignFont }) {
  const isSerif = font.category === "serif" || font.category === "display";
  return (
    <div
      className="flex flex-col gap-4 p-6 rounded-xl"
      style={{ background: "var(--surface-panel)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--primary)" }}
          >
            {font.role}
          </span>
          <span className="text-lg font-bold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
            {font.name}
          </span>
        </div>
        <span
          className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest rounded"
          style={{
            background: "rgba(26,92,56,0.08)",
            color: "var(--primary)",
          }}
        >
          {isSerif ? "Serif" : "Sans-serif"}
        </span>
      </div>

      <p
        className="text-2xl sm:text-3xl leading-snug"
        style={{
          color: "var(--text-primary)",
          fontFamily: isSerif ? `'${font.name}', Georgia, serif` : `'${font.name}', system-ui, sans-serif`,
          fontWeight: isSerif ? 600 : 400,
        }}
      >
        {font.sample}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
          Pesos:
        </span>
        {font.weights.split(" · ").map((w) => (
          <span
            key={w}
            className="px-2 py-0.5 text-[10px] rounded"
            style={{
              background: "var(--surface-bg)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

function PrincipleCard({ principle }: { principle: DesignPrinciple }) {
  const Icon = PRINCIPLE_ICONS[principle.icon] ?? Globe;
  return (
    <div
      className="flex flex-col gap-3 p-5 rounded-xl"
      style={{ background: "var(--surface-panel)", border: "1px solid var(--border)" }}
    >
      <div
        className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
        style={{ background: "rgba(26,92,56,0.1)", color: "var(--primary)" }}
      >
        <Icon size={16} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
          {principle.title}
        </span>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {principle.description}
        </p>
      </div>
    </div>
  );
}

export function DesignSystemScreen({ data }: DesignSystemScreenProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="p-6 sm:p-8 min-h-full"
      variants={reduced ? undefined : screenEnter}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="design-system"
    >
      <motion.div
        className="flex flex-col gap-6 max-w-5xl mx-auto"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
            {data.title}
          </span>
          <h1 className="font-bold" style={{ fontSize: "clamp(20px, 3vw, 32px)", color: "var(--text-primary)" }}>
            {data.subtitle ?? "Sistema de diseño propuesto"}
          </h1>
          {data.description && (
            <p className="text-sm max-w-2xl mt-1" style={{ color: "var(--text-muted)" }}>
              {data.description}
            </p>
          )}
        </motion.div>

        <BentoGrid>
          {/* Palette */}
          <BentoCard colSpan={12}>
            <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-5">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
                Paleta de colores
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {data.palette.map((color, i) => (
                  <motion.div key={i} variants={reduced ? undefined : fadeUp}>
                    <ColorSwatch color={color} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </BentoCard>

          {/* Typography */}
          <BentoCard colSpan={12}>
            <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-5">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
                Tipografía
              </span>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.typography.map((font, i) => (
                  <motion.div key={i} variants={reduced ? undefined : fadeUp}>
                    <FontCard font={font} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </BentoCard>

          {/* Principles */}
          {data.principles && data.principles.length > 0 && (
            <BentoCard colSpan={12}>
              <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-5">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
                  Principios de diseño
                </span>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {data.principles.map((p, i) => (
                    <motion.div key={i} variants={reduced ? undefined : fadeUp}>
                      <PrincipleCard principle={p} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </BentoCard>
          )}
        </BentoGrid>
      </motion.div>
    </motion.div>
  );
}

export default DesignSystemScreen;
