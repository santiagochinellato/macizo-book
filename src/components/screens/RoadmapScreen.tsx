"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, CheckCircle2, PackageOpen, Pencil, Code2, Rocket, Wrench } from "lucide-react";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { BentoCard } from "@/components/bento/BentoCard";
import { screenEnter, stagger, fadeUp, slideInLeft } from "@/lib/motion-variants";
import type { RoadmapScreenData } from "@/types/presentation";

interface RoadmapScreenProps {
  data: RoadmapScreenData;
}

const PHASE_ICONS = [Pencil, Code2, Rocket, Wrench];

export function RoadmapScreen({ data }: RoadmapScreenProps) {
  const reduced = useReducedMotion();
  const { phases, technologies, clientRequirements } = data;

  const totalWeeks = phases.reduce((acc, p) => {
    const n = parseInt(p.duration);
    return acc + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <motion.div
      className="min-h-full w-full min-w-0 px-5 sm:px-8 lg:px-14 py-6 sm:py-8"
      variants={reduced ? undefined : screenEnter}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="roadmap"
    >
      <motion.div
        className="flex flex-col gap-6 max-w-5xl mx-auto w-full min-w-0"
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
            Plan de trabajo
          </span>
          <h1
            className="font-bold"
            style={{ fontSize: "clamp(20px, 3vw, 32px)", color: "var(--text-primary)" }}
          >
            Cronograma del proyecto
          </h1>
        </motion.div>

        <BentoGrid>
          {/* ── Timeline ── */}
          <BentoCard colSpan={12}>
            <motion.div
              className="flex flex-col gap-6"
              variants={reduced ? undefined : stagger}
              initial="hidden"
              animate="visible"
            >
              {/* Meta row */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "var(--text-subtle)" }}
                >
                  Fases del proyecto
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
                  {phases.length} fases · {totalWeeks} semanas aprox.
                </div>
              </div>

              {/* Desktop horizontal timeline */}
              <div className="hidden sm:block relative">
                {/* Track */}
                <div
                  className="absolute left-0 right-0 h-0.5"
                  style={{ top: 28, background: "var(--border)" }}
                  aria-hidden="true"
                />
                {/* Animated fill */}
                <motion.div
                  className="absolute left-0 h-0.5"
                  style={{
                    top: 28,
                    right: 0,
                    background: "linear-gradient(to right, var(--primary), color-mix(in srgb, var(--primary) 70%, transparent))",
                    originX: 0,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                  aria-hidden="true"
                />

                {/* Phase columns */}
                <div
                  className="grid gap-4"
                  style={{ gridTemplateColumns: `repeat(${phases.length}, 1fr)` }}
                >
                  {phases.map((phase, idx) => {
                    const PhaseIcon = PHASE_ICONS[idx] ?? Wrench;
                    return (
                      <motion.div
                        key={phase.id}
                        variants={reduced ? undefined : fadeUp}
                        className="flex flex-col items-center gap-4"
                      >
                        {/* Circle */}
                        <div
                          className="relative flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full text-lg font-bold z-10"
                          style={{
                            background: "var(--primary)",
                            color: "#fff",
                            boxShadow: "0 0 0 4px var(--surface-card), 0 0 0 6px var(--primary), 0 4px 16px rgba(26,92,56,0.25)",
                          }}
                        >
                          {phase.number}
                        </div>

                        {/* Card */}
                        <div
                          className="w-full flex flex-col gap-3 p-5 rounded-xl"
                          style={{
                            background: "var(--surface-panel)",
                            border: "1px solid var(--border)",
                            borderTop: "3px solid var(--primary)",
                          }}
                        >
                          {/* Card header */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div
                                className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
                                style={{ background: "rgba(26,92,56,0.1)", color: "var(--primary)" }}
                              >
                                <PhaseIcon size={14} />
                              </div>
                              <span
                                className="text-sm font-bold leading-snug"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {phase.title}
                              </span>
                            </div>
                            <span
                              className="flex items-center gap-1 text-xs font-semibold flex-shrink-0 px-2 py-0.5 rounded"
                              style={{
                                background: "rgba(26,92,56,0.08)",
                                color: "var(--primary)",
                              }}
                            >
                              <Clock size={10} />
                              {phase.duration}
                            </span>
                          </div>

                          {/* Tasks */}
                          <ul className="flex flex-col gap-2">
                            {phase.tasks.map((task, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm leading-snug"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                <CheckCircle2
                                  size={13}
                                  className="flex-shrink-0 mt-0.5"
                                  style={{ color: "var(--primary)" }}
                                />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile vertical timeline */}
              <div className="sm:hidden flex flex-col gap-0">
                {phases.map((phase, idx) => {
                  const PhaseIcon = PHASE_ICONS[idx] ?? Wrench;
                  return (
                    <motion.div
                      key={phase.id}
                      variants={reduced ? undefined : slideInLeft}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0"
                          style={{
                            background: "var(--primary)",
                            color: "#fff",
                            boxShadow: "0 0 0 3px var(--surface-card), 0 0 0 5px var(--primary)",
                          }}
                        >
                          {phase.number}
                        </div>
                        {idx < phases.length - 1 && (
                          <div
                            className="w-0.5 flex-1 my-2"
                            style={{ background: "var(--primary)", opacity: 0.25, minHeight: 24 }}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div
                        className="flex flex-col gap-3 p-4 rounded-xl mb-4 flex-1"
                        style={{
                          background: "var(--surface-panel)",
                          border: "1px solid var(--border)",
                          borderTop: "3px solid var(--primary)",
                        }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <PhaseIcon size={14} style={{ color: "var(--primary)" }} />
                            <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                              {phase.title}
                            </span>
                          </div>
                          <span
                            className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded"
                            style={{ background: "rgba(26,92,56,0.08)", color: "var(--primary)" }}
                          >
                            <Clock size={10} />
                            {phase.duration}
                          </span>
                        </div>
                        <ul className="flex flex-col gap-2">
                          {phase.tasks.map((task, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </BentoCard>

          {/* ── Tech stack ── */}
          <BentoCard colSpan={12}>
            <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "var(--text-subtle)" }}
                >
                  Stack tecnológico
                </span>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Las herramientas que construyen y sostienen el sitio.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {technologies.map((tech, i) => (
                  <motion.div
                    key={i}
                    variants={reduced ? undefined : fadeUp}
                    className="flex flex-col gap-2 p-4 rounded-xl"
                    style={{
                      background: "var(--surface-panel)",
                      border: "1px solid var(--border)",
                      borderLeft: "3px solid var(--primary)",
                    }}
                  >
                    <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                      {tech.name}
                    </span>
                    {tech.description && (
                      <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {tech.description}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </BentoCard>

          {/* ── Client requirements ── */}
          {clientRequirements && clientRequirements.length > 0 && (
            <BentoCard colSpan={12}>
              <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                    style={{ background: "rgba(26,92,56,0.1)", color: "var(--primary)" }}
                  >
                    <PackageOpen size={15} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: "var(--primary)" }}
                    >
                      Para iniciar el proyecto
                    </span>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      Materiales que el cliente provee dentro de los primeros 3 días hábiles tras la confirmación.
                    </p>
                  </div>
                </div>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {clientRequirements.map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm leading-snug"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--primary)" }}
                        aria-hidden="true"
                      />
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </BentoCard>
          )}
        </BentoGrid>
      </motion.div>
    </motion.div>
  );
}

export default RoadmapScreen;
