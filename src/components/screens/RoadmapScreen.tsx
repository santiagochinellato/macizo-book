"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, CheckCircle2 } from "lucide-react";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { BentoCard } from "@/components/bento/BentoCard";
import { screenEnter, stagger, fadeUp, slideInLeft } from "@/lib/motion-variants";
import type { RoadmapScreenData } from "@/types/presentation";

interface RoadmapScreenProps {
  data: RoadmapScreenData;
}

export function RoadmapScreen({ data }: RoadmapScreenProps) {
  const reduced = useReducedMotion();
  const { phases, technologies } = data;

  return (
    <motion.div
      className="p-6 sm:p-8 min-h-full"
      variants={reduced ? undefined : screenEnter}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="roadmap"
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
          {/* Timeline — full width */}
          <BentoCard colSpan={12}>
            <motion.div
              className="flex flex-col gap-0"
              variants={reduced ? undefined : stagger}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--text-subtle)" }}
                >
                  Fases del proyecto
                </span>
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--text-subtle)" }}
                >
                  Total: {phases.length} fases ·{" "}
                  {phases.reduce((acc, p) => {
                    const num = parseInt(p.duration);
                    return acc + (isNaN(num) ? 0 : num);
                  }, 0)}{" "}
                  semanas aprox.
                </span>
              </div>

              {/* Desktop horizontal timeline */}
              <div className="hidden sm:block relative pb-4">
                <div
                  className="absolute top-[18px] left-4 right-4 h-px"
                  style={{ background: "var(--border)" }}
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute top-[18px] left-4 h-px"
                  style={{
                    background: "linear-gradient(to right, var(--primary), var(--primary-light))",
                    originX: 0,
                    right: 4,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  aria-hidden="true"
                />
                <div
                  className="grid gap-3"
                  style={{
                    gridTemplateColumns: `repeat(${phases.length}, 1fr)`,
                  }}
                >
                  {phases.map((phase) => (
                    <motion.div
                      key={phase.id}
                      variants={reduced ? undefined : fadeUp}
                      className="flex flex-col items-center gap-3"
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold relative z-10 flex-shrink-0"
                        style={{
                          background: "var(--primary)",
                          color: "#fff",
                          boxShadow: "0 0 0 3px var(--surface-card), 0 0 0 4px var(--border)",
                        }}
                      >
                        {phase.number}
                      </div>
                      <div
                        className="w-full p-3 rounded-xl flex flex-col gap-2"
                        style={{
                          background: "var(--surface-panel)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span
                            className="text-xs font-semibold"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {phase.title}
                          </span>
                          <span
                            className="flex items-center gap-1 text-[10px] flex-shrink-0"
                            style={{ color: "var(--primary-light)" }}
                          >
                            <Clock size={9} />
                            {phase.duration}
                          </span>
                        </div>
                        <ul className="flex flex-col gap-1">
                          {phase.tasks.map((task, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-1.5 text-[10px]"
                              style={{ color: "var(--text-subtle)" }}
                            >
                              <CheckCircle2
                                size={9}
                                className="flex-shrink-0 mt-0.5"
                                style={{ color: "var(--primary-light)", opacity: 0.6 }}
                              />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile vertical timeline */}
              <div className="sm:hidden flex flex-col">
                {phases.map((phase, index) => (
                  <motion.div
                    key={phase.id}
                    variants={reduced ? undefined : slideInLeft}
                    className="flex gap-3"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: "var(--primary)", color: "#fff" }}
                      >
                        {phase.number}
                      </div>
                      {index < phases.length - 1 && (
                        <div
                          className="w-px flex-1 my-2"
                          style={{ background: "var(--border)", minHeight: 20 }}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div
                      className="flex flex-col gap-2 p-3 rounded-xl mb-3 flex-1"
                      style={{
                        background: "var(--surface-panel)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className="text-xs font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {phase.title}
                        </span>
                        <span
                          className="flex items-center gap-1 text-[10px] flex-shrink-0"
                          style={{ color: "var(--primary-light)" }}
                        >
                          <Clock size={9} />
                          {phase.duration}
                        </span>
                      </div>
                      <ul className="flex flex-col gap-1">
                        {phase.tasks.map((task, i) => (
                          <li
                            key={i}
                            className="text-[10px] flex items-start gap-1.5"
                            style={{ color: "var(--text-subtle)" }}
                          >
                            <span
                              className="w-1 h-1 rounded-full flex-shrink-0 mt-1"
                              style={{ background: "var(--primary)" }}
                              aria-hidden="true"
                            />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </BentoCard>

          {/* Tech stack */}
          <BentoCard colSpan={12}>
            <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-4">
              <span
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--text-subtle)" }}
              >
                Stack tecnológico
              </span>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, i) => (
                  <motion.div
                    key={i}
                    variants={reduced ? undefined : fadeUp}
                    className="flex flex-col gap-0.5 px-3 py-2 rounded-lg"
                    style={{
                      background: "var(--surface-panel)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {tech.name}
                    </span>
                    {tech.description && (
                      <span
                        className="text-[10px]"
                        style={{ color: "var(--text-subtle)" }}
                      >
                        {tech.description}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </BentoCard>
        </BentoGrid>
      </motion.div>
    </motion.div>
  );
}

export default RoadmapScreen;
