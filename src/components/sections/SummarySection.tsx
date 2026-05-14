"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { AlertCircle } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { stagger, fadeUp } from "@/lib/motion-variants";
import type { SummaryData } from "@/types/presentation";

type LucideIconName = keyof typeof LucideIcons;

interface SummarySectionProps {
  data: SummaryData;
  label?: string;
}

function DynamicIcon({ name, size = 18 }: { name: string; size?: number }) {
  const IconComponent = LucideIcons[name as LucideIconName] as React.ComponentType<{ size?: number; style?: React.CSSProperties }> | undefined;
  if (!IconComponent) return <AlertCircle size={size} />;
  return <IconComponent size={size} />;
}

export function SummarySection({ data, label }: SummarySectionProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="summary"
      className="px-5 sm:px-8 lg:px-14 py-12"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <SectionLabel className="mb-6">{label ?? "Resumen ejecutivo"}</SectionLabel>

      <motion.div
        className="flex flex-col gap-6"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Intro */}
        <motion.p
          variants={reduced ? undefined : fadeUp}
          className="text-base sm:text-lg leading-relaxed max-w-2xl"
          style={{ color: "var(--fg)" }}
        >
          {data.intro}
        </motion.p>

        {/* Problem card */}
        {data.problem && (
          <motion.div
            variants={reduced ? undefined : fadeUp}
            className="p-5 rounded-xl border-l-4 flex gap-3"
            style={{
              background: "color-mix(in srgb, var(--accent) 8%, var(--surface))",
              borderLeftColor: "var(--accent)",
              border: "1px solid var(--border)",
              borderLeft: "4px solid var(--accent)",
            }}
          >
            <AlertCircle
              size={18}
              className="flex-shrink-0 mt-0.5"
              style={{ color: "var(--accent)" }}
            />
            <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
              {data.problem}
            </p>
          </motion.div>
        )}

        {/* Highlights */}
        {data.highlights && data.highlights.length > 0 && (
          <motion.ul
            variants={reduced ? undefined : stagger}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            role="list"
          >
            {data.highlights.map((highlight, i) => (
              <motion.li
                key={i}
                variants={reduced ? undefined : fadeUp}
                className="flex items-start gap-3 p-4 rounded-xl transition-transform hover:-translate-y-0.5"
                style={{
                  background: "color-mix(in srgb, var(--primary) 4%, var(--surface))",
                  border: "1px solid var(--border)",
                  transitionDuration: "200ms",
                  transitionTimingFunction: "ease-out",
                }}
              >
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                  style={{ background: "var(--primary)", color: "#fff" }}
                >
                  <DynamicIcon name={highlight.icon} size={15} />
                </span>
                <span
                  className="text-sm font-medium leading-snug pt-1"
                  style={{ color: "var(--fg)" }}
                >
                  {highlight.text}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </section>
  );
}

export default SummarySection;
