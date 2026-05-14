"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { stagger, fadeUp, slideInLeft } from "@/lib/motion-variants";
import type { TimelineData } from "@/types/presentation";

interface TimelineSectionProps {
  data: TimelineData;
  label?: string;
}

export function TimelineSection({ data, label }: TimelineSectionProps) {
  const reduced = useReducedMotion();
  const { phases } = data;

  return (
    <section
      id="timeline"
      className="px-5 sm:px-8 lg:px-14 py-12"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <SectionLabel className="mb-8">{label ?? "Cronograma"}</SectionLabel>

      {/* Desktop: horizontal */}
      <div className="hidden sm:block relative">
        {/* Connecting line */}
        <div
          className="absolute top-[28px] left-8 right-8 h-px"
          style={{ background: "var(--border)" }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute top-[28px] left-8 h-px"
          style={{ background: "linear-gradient(to right, var(--primary), var(--accent))", originX: 0 }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          aria-hidden="true"
        />

        <motion.div
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${phases.length}, minmax(0, 1fr))` }}
          variants={reduced ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {phases.map((phase) => (
            <motion.div
              key={phase.id}
              variants={reduced ? undefined : fadeUp}
              className="flex flex-col gap-3"
            >
              {/* Number bubble */}
              <div className="flex justify-center mb-2">
                <span
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold relative z-10"
                  style={{
                    background: "var(--primary)",
                    color: "#fff",
                    fontFamily: "var(--font-display)",
                    boxShadow: "0 0 0 4px var(--surface), 0 0 0 5px var(--border)",
                  }}
                >
                  {phase.number}
                </span>
              </div>

              {/* Card */}
              <div
                className="flex flex-col gap-2 p-4 rounded-xl"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "var(--fg)", fontFamily: "var(--font-body)" }}
                  >
                    {phase.title}
                  </span>
                  <span
                    className="flex items-center gap-1 text-xs flex-shrink-0"
                    style={{ color: "var(--accent)" }}
                  >
                    <Clock size={11} />
                    {phase.duration}
                  </span>
                </div>
                <ul className="flex flex-col gap-1" role="list">
                  {phase.tasks.map((task, i) => (
                    <li
                      key={i}
                      className="text-xs flex items-start gap-1.5"
                      style={{ color: "var(--muted)" }}
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5"
                        style={{ background: "var(--accent)" }}
                        aria-hidden="true"
                      />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile: vertical */}
      <motion.div
        className="sm:hidden flex flex-col"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {phases.map((phase, index) => (
          <motion.div
            key={phase.id}
            variants={reduced ? undefined : slideInLeft}
            className="flex gap-4"
          >
            {/* Left side: number + line */}
            <div className="flex flex-col items-center">
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{
                  background: "var(--primary)",
                  color: "#fff",
                  fontFamily: "var(--font-display)",
                }}
              >
                {phase.number}
              </span>
              {index < phases.length - 1 && (
                <div
                  className="w-px flex-1 my-2"
                  style={{ background: "var(--border)", minHeight: 24 }}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Right side: content */}
            <div
              className="flex flex-col gap-2 p-4 rounded-xl mb-3 flex-1"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className="font-semibold text-sm"
                  style={{ color: "var(--fg)", fontFamily: "var(--font-body)" }}
                >
                  {phase.title}
                </span>
                <span
                  className="flex items-center gap-1 text-xs flex-shrink-0"
                  style={{ color: "var(--accent)" }}
                >
                  <Clock size={11} />
                  {phase.duration}
                </span>
              </div>
              <ul className="flex flex-col gap-1" role="list">
                {phase.tasks.map((task, i) => (
                  <li
                    key={i}
                    className="text-xs flex items-start gap-1.5"
                    style={{ color: "var(--muted)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5"
                      style={{ background: "var(--accent)" }}
                      aria-hidden="true"
                    />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default TimelineSection;
