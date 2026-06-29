"use client";

import { ArrowDown, CheckCircle2, XCircle } from "lucide-react";
import { DynamicIcon } from "@/components/ui/Icon";
import type {
  AllocationExample,
  ChecklistBookCard,
  ComparisonBookCard,
  ComparisonTableBookCard,
  OrgChartBookCard,
  PriceComparisonBookCard,
} from "@/types/presentation";

interface CardHeaderProps {
  eyebrow?: string;
  heading: string;
  color?: string;
}

function CardHeader({ eyebrow, heading, color = "var(--primary)" }: CardHeaderProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {eyebrow && (
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>
          {eyebrow}
        </span>
      )}
      <h3 className="text-base sm:text-lg font-bold leading-snug" style={{ color: "var(--text-primary)" }}>
        {heading}
      </h3>
    </div>
  );
}

export function AllocationExampleBlock({ data, color }: { data: AllocationExample; color: string }) {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="grid sm:grid-cols-3 gap-3">
        {data.months.map((month) => (
          <div
            key={month.label}
            className="flex flex-col gap-2 p-3 rounded-[var(--radius-md)]"
            style={{ background: "var(--surface-panel)", border: "1px solid var(--border)" }}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>
              {month.label}
            </span>
            <div className="flex h-3 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              {month.bars.map((bar) => (
                <div
                  key={bar.company}
                  style={{ width: `${bar.pct}%`, background: bar.color }}
                  title={`${bar.company}: ${bar.pct}%`}
                />
              ))}
            </div>
            <ul className="flex flex-col gap-1">
              {month.bars.map((bar) => (
                <li key={bar.company} className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="flex items-center gap-1.5 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: bar.color }}
                      aria-hidden="true"
                    />
                    <span className="truncate" style={{ color: "var(--text-secondary)" }}>
                      {bar.company}
                    </span>
                  </span>
                  <span className="font-bold tabular-nums flex-shrink-0" style={{ color: "var(--text-primary)" }}>
                    {bar.pct}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {data.footer && (
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {data.footer}
        </p>
      )}
    </div>
  );
}

interface ComparisonCardContentProps {
  card: ComparisonBookCard;
  sectionColor: string;
}

export function ComparisonCardContent({ card, sectionColor }: ComparisonCardContentProps) {
  return (
    <div className="flex flex-col gap-5 h-full">
      <CardHeader eyebrow={card.eyebrow} heading={card.heading} color={sectionColor} />
      <div className="grid md:grid-cols-2 gap-4 flex-1">
        {[card.left, card.right].map((side, idx) => {
          const isPositive = idx === 1;
          const accent = isPositive ? sectionColor : "var(--text-subtle)";
          return (
            <div
              key={side.label}
              className="flex flex-col gap-3 p-4 rounded-[var(--radius-md)] h-full"
              style={{
                background: isPositive
                  ? `color-mix(in srgb, ${sectionColor} 8%, var(--surface-panel))`
                  : "var(--surface-panel)",
                border: isPositive
                  ? `1px solid color-mix(in srgb, ${sectionColor} 25%, transparent)`
                  : "1px solid var(--border)",
              }}
            >
              <div className="flex items-center gap-2">
                {side.icon && (
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-md flex-shrink-0"
                    style={{
                      background: isPositive
                        ? `color-mix(in srgb, ${sectionColor} 15%, transparent)`
                        : "color-mix(in srgb, var(--text-subtle) 12%, transparent)",
                      color: accent,
                    }}
                  >
                    <DynamicIcon name={side.icon} size={16} />
                  </div>
                )}
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: accent }}>
                  {side.label}
                </span>
              </div>
              <ol className="flex flex-col gap-2">
                {side.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold flex-shrink-0 mt-0.5"
                      style={{
                        background: isPositive
                          ? `color-mix(in srgb, ${sectionColor} 18%, transparent)`
                          : "var(--border)",
                        color: isPositive ? sectionColor : "var(--text-subtle)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[13px] leading-snug" style={{ color: "var(--text-secondary)" }}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface OrgChartCardContentProps {
  card: OrgChartBookCard;
  sectionColor: string;
}

export function OrgChartCardContent({ card, sectionColor }: OrgChartCardContentProps) {
  return (
    <div className="flex flex-col gap-5 h-full">
      <CardHeader eyebrow={card.eyebrow} heading={card.heading} color={sectionColor} />
      <div className="flex flex-col items-center gap-3 flex-1">
        <div
          className="flex flex-col items-center gap-1 px-6 py-3 rounded-[var(--radius-md)] text-center w-full max-w-xs"
          style={{ background: sectionColor, color: "#fff" }}
        >
          <span className="text-xs font-bold uppercase tracking-widest">{card.root.label}</span>
          {card.root.sublabel && (
            <span className="text-[11px] leading-snug" style={{ color: "rgba(255,255,255,0.8)" }}>
              {card.root.sublabel}
            </span>
          )}
        </div>
        <ArrowDown size={18} style={{ color: sectionColor }} aria-hidden="true" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
          {card.children.map((child) => (
            <div
              key={child.label}
              className="flex flex-col items-center gap-0.5 px-2 py-2.5 rounded-[var(--radius-md)] text-center"
              style={{
                background: "var(--surface-panel)",
                border: `1px solid color-mix(in srgb, ${sectionColor} 20%, var(--border))`,
              }}
            >
              <span className="text-[11px] font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
                {child.label}
              </span>
              {child.sublabel && (
                <span className="text-[10px] leading-tight" style={{ color: "var(--text-muted)" }}>
                  {child.sublabel}
                </span>
              )}
            </div>
          ))}
        </div>
        {card.footer && (
          <p
            className="text-xs font-semibold text-center mt-1 px-4 py-2 rounded-full"
            style={{
              background: `color-mix(in srgb, ${sectionColor} 10%, var(--surface-panel))`,
              color: sectionColor,
            }}
          >
            {card.footer}
          </p>
        )}
      </div>
    </div>
  );
}

interface ComparisonTableCardContentProps {
  card: ComparisonTableBookCard;
  sectionColor: string;
}

export function ComparisonTableCardContent({ card, sectionColor }: ComparisonTableCardContentProps) {
  return (
    <div className="flex flex-col gap-4 h-full">
      <CardHeader eyebrow={card.eyebrow} heading={card.heading} color={sectionColor} />
      <div className="overflow-x-auto rounded-[var(--radius-md)]" style={{ border: "1px solid var(--border)" }}>
        <table className="w-full min-w-[480px] text-left border-collapse">
          <thead>
            <tr style={{ background: "var(--surface-panel)" }}>
              <th
                className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest w-1/2"
                style={{ color: "var(--text-subtle)", borderBottom: "1px solid var(--border)" }}
              >
                Por separado
              </th>
              <th
                className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest w-1/2"
                style={{ color: sectionColor, borderBottom: "1px solid var(--border)" }}
              >
                Modelo grupal
              </th>
            </tr>
          </thead>
          <tbody>
            {card.rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: i < card.rows.length - 1 ? "1px solid var(--border)" : undefined }}>
                <td className="px-4 py-3 align-top">
                  <div className="flex items-start gap-2">
                    <XCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: "var(--text-subtle)" }} />
                    <span className="text-[13px] leading-snug" style={{ color: "var(--text-muted)" }}>
                      {row.individual}
                    </span>
                  </div>
                </td>
                <td
                  className="px-4 py-3 align-top"
                  style={{ background: `color-mix(in srgb, ${sectionColor} 5%, transparent)` }}
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: sectionColor }} />
                    <span className="text-[13px] font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                      {row.grupal}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {card.footer && (
        <p
          className="text-sm font-semibold leading-snug px-4 py-3 rounded-[var(--radius-md)]"
          style={{
            background: `color-mix(in srgb, ${sectionColor} 10%, var(--surface-panel))`,
            color: "var(--text-primary)",
            borderLeft: `3px solid ${sectionColor}`,
          }}
        >
          {card.footer}
        </p>
      )}
    </div>
  );
}

interface PriceComparisonCardContentProps {
  card: PriceComparisonBookCard;
  sectionColor: string;
}

function PriceSidePanel({
  side,
  variant,
  sectionColor,
}: {
  side: PriceComparisonBookCard["individual"];
  variant: "individual" | "grupal";
  sectionColor: string;
}) {
  const isRecommended = side.recommended ?? variant === "grupal";
  const accent = isRecommended ? sectionColor : "var(--text-subtle)";

  return (
    <div
      className="flex flex-col gap-3 p-4 sm:p-5 rounded-[var(--radius-md)] h-full"
      style={{
        background: isRecommended ? `color-mix(in srgb, ${sectionColor} 10%, var(--surface-panel))` : "var(--surface-panel)",
        border: isRecommended ? `2px solid color-mix(in srgb, ${sectionColor} 35%, transparent)` : "1px solid var(--border)",
      }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>
          {side.label}
        </span>
        {side.tagline && (
          <span className="text-xs leading-snug" style={{ color: "var(--text-muted)" }}>
            {side.tagline}
          </span>
        )}
      </div>
      {side.items && side.items.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {side.items.map((item) => (
            <li key={item.company} className="flex items-center justify-between gap-2 text-xs">
              <span style={{ color: "var(--text-muted)" }}>{item.company}</span>
              <span className="font-semibold tabular-nums" style={{ color: "var(--text-secondary)" }}>
                USD {item.amount.toLocaleString("es-AR")}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto pt-2 flex flex-col gap-0.5">
        <span
          className="text-2xl sm:text-3xl font-bold tabular-nums leading-none"
          style={{ color: isRecommended ? sectionColor : "var(--text-primary)", fontFamily: "var(--font-display)" }}
        >
          {side.totalLabel}
        </span>
        {side.detail && (
          <span className="text-xs leading-snug" style={{ color: "var(--text-muted)" }}>
            {side.detail}
          </span>
        )}
      </div>
    </div>
  );
}

export function PriceComparisonCardContent({ card, sectionColor }: PriceComparisonCardContentProps) {
  return (
    <div className="flex flex-col gap-5 h-full">
      <CardHeader eyebrow={card.eyebrow} heading={card.heading} color={sectionColor} />
      <div className="grid md:grid-cols-2 gap-4">
        <PriceSidePanel side={card.individual} variant="individual" sectionColor={sectionColor} />
        <PriceSidePanel side={card.grupal} variant="grupal" sectionColor={sectionColor} />
      </div>
      {card.savings && (
        <div
          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 rounded-[var(--radius-md)]"
          style={{ background: sectionColor, color: "#fff" }}
        >
          <span
            className="text-2xl sm:text-3xl font-bold tabular-nums flex-shrink-0"
            style={{ fontFamily: "var(--font-display)" }}
          >
            USD {card.savings.amount.toLocaleString("es-AR")}
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold">{card.savings.label}</span>
            {card.savings.detail && (
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.85)" }}>
                {card.savings.detail}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface ChecklistCardContentProps {
  card: ChecklistBookCard;
  sectionColor: string;
}

export function ChecklistCardContent({ card, sectionColor }: ChecklistCardContentProps) {
  return (
    <div className="flex flex-col gap-4 h-full">
      <CardHeader eyebrow={card.eyebrow} heading={card.heading} color={sectionColor} />
      <ul className="grid sm:grid-cols-2 gap-2">
        {card.items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 px-3 py-2.5 rounded-[var(--radius-md)]"
            style={{
              background: `color-mix(in srgb, ${sectionColor} 8%, var(--surface-panel))`,
              border: `1px solid color-mix(in srgb, ${sectionColor} 18%, transparent)`,
            }}
          >
            <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: sectionColor }} />
            <span className="text-[13px] font-medium leading-snug" style={{ color: "var(--text-primary)" }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
