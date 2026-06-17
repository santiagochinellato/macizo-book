"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Clock,
  CheckCircle2,
  Hammer,
  RefreshCw,
  Wrench,
  ArrowRight,
  ArrowDown,
  Users,
  Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { BentoCard } from "@/components/bento/BentoCard";
import { screenEnter, stagger, fadeUp } from "@/lib/motion-variants";
import type { RoadmapScreenData } from "@/types/presentation";

interface RoadmapScreenProps {
  data: RoadmapScreenData;
}

const PHASE_ICON_BY_ID: Record<string, LucideIcon> = {
  build: Hammer,
  run: RefreshCw,
};
const PHASE_ICON_FALLBACK: LucideIcon[] = [Hammer, RefreshCw, Wrench];

export function RoadmapScreen({ data }: RoadmapScreenProps) {
  const reduced = useReducedMotion();
  const { phases, technologies, clientRequirements } = data;

  return (
    <motion.div
      className="min-h-full w-full min-w-0 px-5 sm:px-8 lg:px-16 py-6 sm:py-8"
      variants={reduced ? undefined : screenEnter}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="roadmap"
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
            className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--primary)" }}
          >
            Modelo de trabajo
          </span>
          <h1
            className="font-bold"
            style={{ fontSize: "clamp(20px, 3vw, 32px)", color: "var(--text-primary)" }}
          >
            El modelo Build &amp; Run
          </h1>
        </motion.div>

        <BentoGrid>
          {/* ── Build & Run: dos procesos ── */}
          <BentoCard colSpan={12}>
            <motion.div
              className="flex flex-col gap-5"
              variants={reduced ? undefined : stagger}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "var(--text-subtle)" }}
                >
                  Cómo evoluciona el trabajo
                </span>
                <div
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold"
                  style={{
                    background: "rgba(26,92,56,0.08)",
                    color: "var(--primary)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <Clock size={11} />
                  {phases.length} etapas · una inversión que baja al estabilizarse
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-2">
                {phases.map((phase, idx) => {
                  const Icon = PHASE_ICON_BY_ID[phase.id] ?? PHASE_ICON_FALLBACK[idx] ?? Wrench;
                  const isPrimary = idx === 0;
                  return (
                    <Fragment key={phase.id}>
                      <motion.div
                        variants={reduced ? undefined : fadeUp}
                        className="flex flex-col md:flex-1 min-w-0 rounded-[var(--radius-lg)] overflow-hidden"
                        style={{ border: "1px solid var(--border)" }}
                      >
                        {/* Header band */}
                        <div
                          className="flex items-center gap-3 p-4"
                          style={{
                            background: isPrimary
                              ? "var(--primary)"
                              : "var(--primary-glow-strong)",
                          }}
                        >
                          <div
                            className="flex items-center justify-center w-11 h-11 rounded-full text-base font-bold flex-shrink-0"
                            style={{
                              background: isPrimary ? "rgba(255,255,255,0.18)" : "var(--primary)",
                              color: "#fff",
                            }}
                          >
                            {phase.number}
                          </div>
                          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                            <span
                              className="text-sm font-bold leading-snug"
                              style={{ color: isPrimary ? "#fff" : "var(--text-primary)" }}
                            >
                              {phase.title}
                            </span>
                            <span
                              className="flex items-center gap-1 text-xs font-semibold"
                              style={{
                                color: isPrimary ? "rgba(255,255,255,0.85)" : "var(--primary)",
                              }}
                            >
                              <Clock size={11} />
                              {phase.duration}
                            </span>
                          </div>
                          <Icon
                            size={30}
                            className="flex-shrink-0"
                            style={{
                              color: isPrimary
                                ? "rgba(255,255,255,0.55)"
                                : "color-mix(in srgb, var(--primary) 45%, transparent)",
                            }}
                            aria-hidden="true"
                          />
                        </div>

                        {/* Tasks */}
                        <ul
                          className="flex flex-col gap-2 p-4 flex-1"
                          style={{ background: "var(--surface-panel)" }}
                        >
                          {phase.tasks.map((task, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm leading-snug"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              <CheckCircle2
                                size={14}
                                className="flex-shrink-0 mt-0.5"
                                style={{ color: "var(--primary)" }}
                              />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </motion.div>

                      {idx < phases.length - 1 && (
                        <div
                          className="flex items-center justify-center flex-shrink-0 md:px-1"
                          style={{ color: "var(--primary)" }}
                          aria-hidden="true"
                        >
                          <ArrowDown size={20} className="md:hidden" />
                          <ArrowRight size={20} className="hidden md:block" />
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </motion.div>
          </BentoCard>

          {/* ── Participación de Gerencia y RRHH ── */}
          {clientRequirements && clientRequirements.length > 0 && (
            <BentoCard colSpan={12} colSpanMd={8}>
              <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                    style={{ background: "var(--primary-glow-strong)", color: "var(--primary)" }}
                  >
                    <Users size={16} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: "var(--primary)" }}
                    >
                      El rol de Gerencia y RRHH
                    </span>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      Son parte activa del modelo: auditan, priorizan y validan en cada ciclo.
                    </p>
                  </div>
                </div>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {clientRequirements.map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm leading-snug"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <CheckCircle2
                        size={14}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: "var(--primary)" }}
                      />
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </BentoCard>
          )}

          {/* ── Stack: cápsulas al costado ── */}
          {technologies && technologies.length > 0 && (
            <BentoCard colSpan={12} colSpanMd={4}>
              <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-3 h-full">
                <div className="flex items-center gap-2">
                  <Layers size={15} style={{ color: "var(--primary)" }} />
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    Stack tecnológico
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium rounded-full"
                      style={{
                        background: "var(--surface-panel)",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {tech.name}
                    </span>
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

export default RoadmapScreen;
