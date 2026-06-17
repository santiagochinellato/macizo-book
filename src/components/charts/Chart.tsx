"use client";

import dynamic from "next/dynamic";
import { DEFAULT_COLORS } from "./ChartRenderer";
import type { ChartBookCard } from "@/types/presentation";

const ChartRenderer = dynamic(() => import("./ChartRenderer"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full animate-pulse rounded-[var(--radius-md)]"
      style={{ height: 220, background: "var(--surface-panel)" }}
      aria-hidden="true"
    />
  ),
});

interface ChartProps {
  card: ChartBookCard;
}

/** Charts that benefit from a categorical legend listing each data point. */
const LEGEND_TYPES = new Set(["donut", "radial"]);

export function Chart({ card }: ChartProps) {
  const palette = card.colors && card.colors.length > 0 ? card.colors : DEFAULT_COLORS;
  const showLegend = LEGEND_TYPES.has(card.chartType);

  return (
    <div className="flex flex-col gap-3 h-full">
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

      <div className="flex-1 min-h-0">
        <ChartRenderer
          chartType={card.chartType}
          data={card.data}
          unit={card.unit}
          seriesLabels={card.seriesLabels}
          colors={card.colors}
        />
      </div>

      {showLegend && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5 mt-1">
          {card.data.map((d, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: palette[i % palette.length] }}
                aria-hidden="true"
              />
              <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                {d.label}
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {" "}
                  {d.value.toLocaleString("es-AR")}
                  {card.unit ? ` ${card.unit}` : ""}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Chart;
