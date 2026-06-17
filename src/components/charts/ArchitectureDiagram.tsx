"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import { DynamicIcon } from "@/components/ui/Icon";
import { stagger, fadeUp } from "@/lib/motion-variants";
import type { DiagramBookCard } from "@/types/presentation";

interface ArchitectureDiagramProps {
  card: DiagramBookCard;
}

/**
 * Per-stage palette so each step of the flow reads as a distinct, ordered
 * block. Cohesive with the brand green but with enough hue separation to
 * follow the sequence at a glance.
 */
const FLOW_PALETTE = [
  "#1a5c38", // 1 · verde marca
  "#0e7490", // 2 · cyan profundo
  "#4f46e5", // 3 · índigo
  "#b45309", // 4 · ámbar tostado
  "#9333ea", // 5 · violeta
];

export function ArchitectureDiagram({ card }: ArchitectureDiagramProps) {
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-bold leading-snug" style={{ color: "var(--text-primary)" }}>
          {card.title}
        </h3>
        {card.subtitle && (
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {card.subtitle}
          </p>
        )}
      </div>

      <motion.div
        className="flex flex-col md:flex-row md:items-stretch gap-2 md:gap-1"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {card.layers.map((layer, li) => {
          const color = FLOW_PALETTE[li % FLOW_PALETTE.length];
          const tint = `color-mix(in srgb, ${color} 12%, transparent)`;
          return (
            <motion.div
              key={li}
              variants={reduced ? undefined : fadeUp}
              className="flex flex-col md:flex-row md:items-stretch md:flex-1 gap-2 md:gap-1 min-w-0"
            >
              <div
                className="flex flex-col gap-2.5 p-3.5 rounded-[var(--radius-lg)] flex-1 min-w-0"
                style={{
                  background: "var(--surface-panel)",
                  border: "1px solid var(--border)",
                  borderTop: `3px solid ${color}`,
                }}
              >
                <div className="flex items-start gap-2">
                  <span
                    className="flex items-center justify-center w-5 h-5 flex-shrink-0 rounded-md text-[11px] font-bold leading-none"
                    style={{ background: color, color: "#fff" }}
                    aria-hidden="true"
                  >
                    {li + 1}
                  </span>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span
                      className="text-[11px] font-bold uppercase tracking-wide leading-tight"
                      style={{ color }}
                    >
                      {layer.title}
                    </span>
                    {layer.role && (
                      <span className="text-[10px] leading-snug" style={{ color: "var(--text-subtle)" }}>
                        {layer.role}
                      </span>
                    )}
                  </div>
                </div>

                {card.compact ? (
                  <div className="flex flex-wrap gap-1.5">
                    {layer.items.map((item, ii) => (
                      <span
                        key={ii}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-[var(--radius-sm)] text-[11px] font-semibold leading-none"
                        style={{
                          background: "var(--surface-card)",
                          border: "1px solid var(--border)",
                          color: "var(--text-primary)",
                        }}
                      >
                        <span className="flex items-center justify-center flex-shrink-0" style={{ color }} aria-hidden="true">
                          <DynamicIcon name={item.icon} size={12} />
                        </span>
                        {item.label}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {layer.items.map((item, ii) => (
                      <div
                        key={ii}
                        className="flex items-start gap-2 px-2.5 py-2 rounded-[var(--radius-md)]"
                        style={{
                          background: "var(--surface-card)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <span
                          className="flex items-center justify-center w-6 h-6 flex-shrink-0 rounded-[var(--radius-sm)]"
                          style={{ background: tint, color }}
                          aria-hidden="true"
                        >
                          <DynamicIcon name={item.icon} size={13} />
                        </span>
                        <span className="flex flex-col gap-0.5 min-w-0">
                          <span
                            className="text-[12px] font-semibold leading-snug"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {item.label}
                          </span>
                          {item.description && (
                            <span className="text-[11px] leading-snug" style={{ color: "var(--text-muted)" }}>
                              {item.description}
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Connector to next layer */}
              {li < card.layers.length - 1 && (
                <div
                  className="flex items-center justify-center md:px-0.5 py-0.5 md:py-0 flex-shrink-0"
                  style={{ color: FLOW_PALETTE[(li + 1) % FLOW_PALETTE.length] }}
                  aria-hidden="true"
                >
                  <ChevronDown size={18} className="md:hidden" />
                  <ChevronRight size={18} className="hidden md:block" />
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default ArchitectureDiagram;
