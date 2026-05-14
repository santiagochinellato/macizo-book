"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Globe } from "lucide-react";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { BentoCard } from "@/components/bento/BentoCard";
import { screenEnter, stagger, fadeUp } from "@/lib/motion-variants";
import type {
  BookSectionScreenData,
  BookCard,
  ImageBookCard,
  WireframeBookCard,
  TextBookCard,
  MetricBookCard,
  CardSpan,
} from "@/types/presentation";

type LucideIconName = keyof typeof LucideIcons;

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

function spanToCols(span: CardSpan | undefined): { colSpan: ColSpan; colSpanSm: ColSpan } {
  switch (span) {
    case "1x1":  return { colSpan: 12, colSpanSm: 4 };
    case "half": return { colSpan: 12, colSpanSm: 6 };
    case "2x1":  return { colSpan: 12, colSpanSm: 8 };
    case "3x1":  return { colSpan: 12, colSpanSm: 12 };
    default:     return { colSpan: 12, colSpanSm: 6 };
  }
}

// ─── Sub-card components ──────────────────────────────────────────────────────

function DynamicIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = LucideIcons[name as LucideIconName] as React.ComponentType<{ size?: number }> | undefined;
  if (!Icon) return <Globe size={size} />;
  return <Icon size={size} />;
}

interface ImageCardProps { card: ImageBookCard }

function ImageCardContent({ card }: ImageCardProps) {
  return (
    <div className="flex flex-col gap-0 h-full">
      <div
        className="relative w-full overflow-hidden rounded-[var(--radius-md)] flex-1"
        style={{ minHeight: 180 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.src}
          alt={card.alt}
          className="w-full h-full object-cover"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        {card.badge && (
          <div
            className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider"
            style={{
              background: "var(--primary)",
              color: "#fff",
            }}
          >
            {card.badge}
          </div>
        )}
      </div>
      {card.caption && (
        <p
          className="text-xs mt-2.5 leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {card.caption}
        </p>
      )}
    </div>
  );
}

interface WireframeCardProps { card: WireframeBookCard }

function WireframeCardContent({ card }: WireframeCardProps) {
  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Wireframe image container — light technical treatment */}
      <div
        className="relative w-full overflow-hidden rounded-[var(--radius-md)] flex-1"
        style={{
          minHeight: 180,
          background: "#f4f4f8",
          border: "1px dashed #d1d1dc",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.src}
          alt={card.alt}
          className="w-full h-full object-contain p-2"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <div
          className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider"
          style={{
            background: "rgba(10,37,64,0.08)",
            color: "var(--primary)",
          }}
        >
          Wireframe
        </div>
      </div>
      {/* Label */}
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          {card.title}
        </span>
        {card.description && (
          <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {card.description}
          </span>
        )}
      </div>
    </div>
  );
}

interface TextCardProps { card: TextBookCard }

function TextCardContent({ card }: TextCardProps) {
  return (
    <div
      className="flex flex-col gap-3 h-full"
      style={
        card.accent
          ? { borderLeft: "3px solid var(--primary)", paddingLeft: 14 }
          : undefined
      }
    >
      {card.eyebrow && (
        <span
          className="text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: "var(--primary)" }}
        >
          {card.eyebrow}
        </span>
      )}
      <h3
        className="text-base sm:text-lg font-bold leading-snug"
        style={{ color: "var(--text-primary)" }}
      >
        {card.heading}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {card.body}
      </p>
      {card.bullets && card.bullets.length > 0 && (
        <ul className="flex flex-col gap-1.5 mt-1">
          {card.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "var(--primary)", opacity: 0.6 }}
                aria-hidden="true"
              />
              <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {b}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface MetricCardProps { card: MetricBookCard }

function MetricCardContent({ card }: MetricCardProps) {
  return (
    <div className="flex flex-col gap-3 h-full justify-between">
      {card.icon && (
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
          style={{
            background: "color-mix(in srgb, var(--primary) 10%, transparent)",
            color: "var(--primary)",
          }}
        >
          <DynamicIcon name={card.icon} size={18} />
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        <span
          className="text-3xl sm:text-4xl font-bold tabular-nums leading-none"
          style={{ color: "var(--primary)" }}
        >
          {card.value}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
          {card.label}
        </span>
      </div>
      {card.description && (
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {card.description}
        </p>
      )}
    </div>
  );
}

// ─── Card dispatcher ──────────────────────────────────────────────────────────

function renderCard(card: BookCard, i: number, reduced: boolean | null) {
  const { colSpan, colSpanSm } = spanToCols(card.span);
  const isHighlight = card.type === "metric" || (card.type === "text" && card.accent);

  return (
    <BentoCard
      key={i}
      colSpan={colSpan}
      colSpanSm={colSpanSm}
      highlight={isHighlight}
      noPadding={card.type === "image"}
    >
      <motion.div
        variants={reduced ? undefined : fadeUp}
        className={card.type === "image" ? "h-full" : "h-full"}
      >
        {card.type === "image" && (
          <div className="p-4 h-full flex flex-col">
            <ImageCardContent card={card} />
          </div>
        )}
        {card.type === "wireframe" && <WireframeCardContent card={card} />}
        {card.type === "text" && <TextCardContent card={card} />}
        {card.type === "metric" && <MetricCardContent card={card} />}
      </motion.div>
    </BentoCard>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface BookSectionScreenProps {
  data: BookSectionScreenData;
}

export function BookSectionScreen({ data }: BookSectionScreenProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="p-6 sm:p-8 min-h-full"
      variants={reduced ? undefined : screenEnter}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="flex flex-col gap-6 max-w-5xl mx-auto"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Section heading */}
        <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className="block flex-shrink-0"
              style={{ width: 16, height: 2, background: "var(--primary)", borderRadius: 99 }}
              aria-hidden="true"
            />
            <span
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--primary)" }}
            >
              {data.title}
            </span>
          </div>
          {data.subtitle && (
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {data.subtitle}
            </p>
          )}
        </motion.div>

        {/* Bento grid of cards */}
        <BentoGrid>
          {data.cards.map((card, i) => renderCard(card, i, reduced))}
        </BentoGrid>
      </motion.div>
    </motion.div>
  );
}

export default BookSectionScreen;
