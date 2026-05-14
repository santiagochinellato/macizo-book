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

/** Aspect ratio for image cards based on their span */
function spanToAspect(span: CardSpan | undefined): string {
  switch (span) {
    case "1x1":  return "aspect-[4/3]";
    case "half": return "aspect-[4/3]";
    case "2x1":  return "aspect-[16/9]";
    case "3x1":  return "aspect-[21/9]";
    default:     return "aspect-[4/3]";
  }
}

// ─── Sub-card components ──────────────────────────────────────────────────────

function DynamicIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = LucideIcons[name as LucideIconName] as React.ComponentType<{ size?: number }> | undefined;
  if (!Icon) return <Globe size={size} />;
  return <Icon size={size} />;
}

// Image card — fills the entire BentoCard. Caption and badge are overlays.
function ImageCardContent({ card }: { card: ImageBookCard }) {
  const aspectClass = spanToAspect(card.span);
  return (
    <div className={`relative w-full overflow-hidden ${aspectClass}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.src}
        alt={card.alt}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Badge — top left */}
      {card.badge && (
        <div
          className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
          style={{
            background: "var(--primary)",
            color: "#fff",
            borderRadius: "var(--radius-sm)",
          }}
        >
          {card.badge}
        </div>
      )}

      {/* Caption — bottom gradient overlay */}
      {card.caption && (
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-3"
          style={{
            background: "linear-gradient(to top, rgba(15,23,42,0.75) 0%, transparent 100%)",
          }}
        >
          <p className="text-xs font-medium leading-snug" style={{ color: "rgba(255,255,255,0.92)" }}>
            {card.caption}
          </p>
        </div>
      )}
    </div>
  );
}

// Wireframe card — technical treatment with high min-height
function WireframeCardContent({ card }: { card: WireframeBookCard }) {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div
        className="relative w-full overflow-hidden flex-1"
        style={{
          minHeight: 220,
          background: "#f4f4f8",
          border: "1px solid #d1d1dc",
          borderRadius: "var(--radius-sm)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.src}
          alt={card.alt}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
        <div
          className="absolute top-2.5 left-2.5 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest"
          style={{
            background: "rgba(26,92,56,0.12)",
            color: "var(--primary)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          Propuesta UI
        </div>
      </div>
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

// Text card
function TextCardContent({ card }: { card: TextBookCard }) {
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
          className="text-[9px] font-bold uppercase tracking-widest"
          style={{ color: "var(--primary)" }}
        >
          {card.eyebrow}
        </span>
      )}
      <h3 className="text-base sm:text-lg font-bold leading-snug" style={{ color: "var(--text-primary)" }}>
        {card.heading}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
        {card.body}
      </p>
      {card.bullets && card.bullets.length > 0 && (
        <ul className="flex flex-col gap-1.5 mt-1">
          {card.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <span
                className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "var(--primary)" }}
                aria-hidden="true"
              />
              <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Metric card
function MetricCardContent({ card }: { card: MetricBookCard }) {
  return (
    <div className="flex flex-col gap-4 h-full justify-between">
      {card.icon && (
        <div
          className="flex items-center justify-center w-9 h-9 flex-shrink-0"
          style={{
            background: "rgba(26,92,56,0.08)",
            color: "var(--primary)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <DynamicIcon name={card.icon} size={17} />
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        <span
          className="text-3xl sm:text-4xl font-bold tabular-nums leading-none"
          style={{ color: "var(--primary)" }}
        >
          {card.value}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: "var(--text-subtle)" }}>
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
        className="h-full"
      >
        {card.type === "image"    && <ImageCardContent    card={card} />}
        {card.type === "wireframe" && <WireframeCardContent card={card} />}
        {card.type === "text"     && <TextCardContent     card={card} />}
        {card.type === "metric"   && <MetricCardContent   card={card} />}
      </motion.div>
    </BentoCard>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

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
              style={{ width: 14, height: 2, background: "var(--primary)", borderRadius: 0 }}
              aria-hidden="true"
            />
            <span
              className="text-[9px] font-bold uppercase tracking-widest"
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

        <BentoGrid>
          {data.cards.map((card, i) => renderCard(card, i, reduced))}
        </BentoGrid>
      </motion.div>
    </motion.div>
  );
}

export default BookSectionScreen;
