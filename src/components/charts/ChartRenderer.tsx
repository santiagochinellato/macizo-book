"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { ChartDataPoint, ChartType } from "@/types/presentation";

/** Theme-aligned palette (derived from CSS tokens in globals.css). */
export const DEFAULT_COLORS = [
  "#1a5c38", // primary — forest green
  "#4ade80", // accent — lime
  "#22c55e", // primary-light
  "#0f766e", // teal
  "#84cc16", // olive lime
  "#64748b", // slate
];

const AXIS_COLOR = "#94a3b8";
const GRID_COLOR = "#e2e8f0";

interface ChartRendererProps {
  chartType: ChartType;
  data: ChartDataPoint[];
  unit?: string;
  seriesLabels?: [string, string?] | string[];
  colors?: string[];
  height?: number;
}

function formatValue(value: number | string, unit?: string): string {
  const num = typeof value === "number" ? value : Number(value);
  const formatted = Number.isFinite(num) ? num.toLocaleString("es-AR") : `${value}`;
  return unit ? `${formatted} ${unit}` : formatted;
}

interface TooltipEntry {
  name?: string | number;
  value?: number | string;
  color?: string;
}

function ChartTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
  unit?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        padding: "8px 10px",
      }}
    >
      {label !== undefined && (
        <p
          className="text-[11px] font-semibold mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </p>
      )}
      {payload.map((entry, i) => (
        <p key={i} className="text-[11px]" style={{ color: "var(--text-muted)" }}>
          <span
            className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
            style={{ background: entry.color }}
            aria-hidden="true"
          />
          {entry.name ? `${entry.name}: ` : ""}
          {formatValue(entry.value ?? 0, unit)}
        </p>
      ))}
    </div>
  );
}

export function ChartRenderer({
  chartType,
  data,
  unit,
  seriesLabels,
  colors,
  height = 220,
}: ChartRendererProps) {
  const palette = colors && colors.length > 0 ? colors : DEFAULT_COLORS;
  const hasSecondSeries = data.some((d) => typeof d.value2 === "number");
  const labelOne = seriesLabels?.[0] ?? "Valor";
  const labelTwo = seriesLabels?.[1] ?? "Comparativa";

  const axisProps = {
    tick: { fontSize: 11, fill: AXIS_COLOR },
    tickLine: false,
    axisLine: { stroke: GRID_COLOR },
  } as const;

  if (chartType === "bar") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
          <XAxis dataKey="label" {...axisProps} interval={0} />
          <YAxis {...axisProps} />
          <Tooltip content={<ChartTooltip unit={unit} />} cursor={{ fill: "rgba(26,92,56,0.06)" }} />
          {hasSecondSeries && <Legend wrapperStyle={{ fontSize: 11 }} />}
          <Bar dataKey="value" name={labelOne} fill={palette[0]} radius={[4, 4, 0, 0]}>
            {!hasSecondSeries &&
              data.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
          </Bar>
          {hasSecondSeries && (
            <Bar dataKey="value2" name={labelTwo} fill={palette[1]} radius={[4, 4, 0, 0]} />
          )}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "line") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
          <XAxis dataKey="label" {...axisProps} interval={0} />
          <YAxis {...axisProps} />
          <Tooltip content={<ChartTooltip unit={unit} />} />
          {hasSecondSeries && <Legend wrapperStyle={{ fontSize: 11 }} />}
          <Line
            type="monotone"
            dataKey="value"
            name={labelOne}
            stroke={palette[0]}
            strokeWidth={2.5}
            dot={{ r: 3, fill: palette[0] }}
            activeDot={{ r: 5 }}
          />
          {hasSecondSeries && (
            <Line
              type="monotone"
              dataKey="value2"
              name={labelTwo}
              stroke={palette[1]}
              strokeWidth={2.5}
              dot={{ r: 3, fill: palette[1] }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "area") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="areaFill1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette[0]} stopOpacity={0.28} />
              <stop offset="100%" stopColor={palette[0]} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="areaFill2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette[1]} stopOpacity={0.24} />
              <stop offset="100%" stopColor={palette[1]} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
          <XAxis dataKey="label" {...axisProps} interval={0} />
          <YAxis {...axisProps} />
          <Tooltip content={<ChartTooltip unit={unit} />} />
          {hasSecondSeries && <Legend wrapperStyle={{ fontSize: 11 }} />}
          <Area
            type="monotone"
            dataKey="value"
            name={labelOne}
            stroke={palette[0]}
            strokeWidth={2.5}
            fill="url(#areaFill1)"
          />
          {hasSecondSeries && (
            <Area
              type="monotone"
              dataKey="value2"
              name={labelTwo}
              stroke={palette[1]}
              strokeWidth={2.5}
              fill="url(#areaFill2)"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "donut") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Tooltip content={<ChartTooltip unit={unit} />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            stroke="var(--surface-card)"
            strokeWidth={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={palette[i % palette.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }

  // radial
  const radialData = data.map((d, i) => ({
    ...d,
    fill: palette[i % palette.length],
  }));
  const maxValue = Math.max(...data.map((d) => d.value), 100);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadialBarChart
        data={radialData}
        innerRadius="25%"
        outerRadius="100%"
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={[0, maxValue]} tick={false} />
        <RadialBar background dataKey="value" cornerRadius={6} />
        <Tooltip content={<ChartTooltip unit={unit} />} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default ChartRenderer;
