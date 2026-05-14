"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { CheckCircle2, XCircle, Package } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { stagger, fadeUp } from "@/lib/motion-variants";
import type { ScopeData } from "@/types/presentation";

type LucideIconName = keyof typeof LucideIcons;

interface ScopeSectionProps {
  data: ScopeData;
  label?: string;
}

function DynamicIcon({ name, size = 18 }: { name: string; size?: number }) {
  const IconComponent = LucideIcons[name as LucideIconName] as React.ComponentType<{ size?: number; style?: React.CSSProperties }> | undefined;
  if (!IconComponent) return <Package size={size} />;
  return <IconComponent size={size} />;
}

export function ScopeSection({ data, label }: ScopeSectionProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="scope"
      className="px-5 sm:px-8 lg:px-14 py-12"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <SectionLabel className="mb-6">{label ?? "Alcance y entregables"}</SectionLabel>

      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        role="list"
      >
        {data.items.map((item) => (
          <motion.li
            key={item.id}
            variants={reduced ? undefined : fadeUp}
            className="flex flex-col gap-3 p-5 rounded-xl transition-transform hover:-translate-y-0.5"
            style={{
              background: item.included
                ? "var(--surface)"
                : "color-mix(in srgb, var(--muted) 6%, var(--surface))",
              border: "1px solid var(--border)",
              opacity: item.included ? 1 : 0.65,
              transitionDuration: "200ms",
              transitionTimingFunction: "ease-out",
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                {item.icon ? (
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                    style={{
                      background: item.included
                        ? "color-mix(in srgb, var(--primary) 10%, transparent)"
                        : "color-mix(in srgb, var(--muted) 10%, transparent)",
                      color: item.included ? "var(--primary)" : "var(--muted)",
                    }}
                  >
                    <DynamicIcon name={item.icon} size={17} />
                  </span>
                ) : null}
                <span
                  className="font-semibold text-sm leading-snug"
                  style={{ color: "var(--fg)", fontFamily: "var(--font-body)" }}
                >
                  {item.title}
                </span>
              </div>
              <span className="flex-shrink-0">
                {item.included ? (
                  <CheckCircle2 size={16} style={{ color: "var(--success)" }} />
                ) : (
                  <XCircle size={16} style={{ color: "var(--muted)" }} />
                )}
              </span>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {item.description}
            </p>

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {item.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

export default ScopeSection;
