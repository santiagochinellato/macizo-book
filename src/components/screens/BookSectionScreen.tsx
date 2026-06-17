"use client";

import { useState, useCallback, Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Expand, CheckCircle2, Sparkles } from "lucide-react";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { BentoCard } from "@/components/bento/BentoCard";
import { PageDetailModal } from "@/components/ui/PageDetailModal";
import { DynamicIcon } from "@/components/ui/Icon";
import { Chart } from "@/components/charts/Chart";
import { ArchitectureDiagram } from "@/components/charts/ArchitectureDiagram";
import { InvestmentSection } from "@/components/screens/InvestmentSection";
import { screenEnter, stagger, fadeUp } from "@/lib/motion-variants";
import type {
  BookSectionScreenData,
  ImageBookCard,
  WireframeBookCard,
  TextBookCard,
  TextBookCardTier,
  MetricBookCard,
  ChartBookCard,
  DiagramBookCard,
  CardSpan,
} from "@/types/presentation";

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

function spanToCols(span: CardSpan | undefined): {
  colSpan: ColSpan;
  colSpanSm: ColSpan;
  colSpanMd: ColSpan;
} {
  switch (span) {
    case "1x1":  return { colSpan: 12, colSpanSm: 6, colSpanMd: 4 };
    case "half": return { colSpan: 12, colSpanSm: 6, colSpanMd: 6 };
    case "2x1":  return { colSpan: 12, colSpanSm: 12, colSpanMd: 8 };
    case "3x1":  return { colSpan: 12, colSpanSm: 12, colSpanMd: 12 };
    default:     return { colSpan: 12, colSpanSm: 6, colSpanMd: 6 };
  }
}

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

interface ImageCardContentProps {
  card: ImageBookCard;
  clickable?: boolean;
  onClick?: () => void;
}

function ImageCardContent({ card, clickable, onClick }: ImageCardContentProps) {
  const aspectClass = spanToAspect(card.span);
  return (
    <div
      className={`relative w-full overflow-hidden ${aspectClass} ${clickable ? "cursor-pointer group" : ""}`}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable && onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
      aria-label={clickable ? `Ver detalle: ${card.alt}` : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.src}
        alt={card.alt}
        loading="lazy"
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
          display: "block",
          transition: "transform 0.4s ease",
        }}
        className={clickable ? "group-hover:scale-[1.03]" : ""}
      />

      {/* Expand hint on hover */}
      {clickable && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          style={{ background: "rgba(15,23,42,0.28)" }}
        >
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
            style={{
              backgroundColor: "rgba(255,255,255,0.92)",
              borderRadius: "var(--radius-sm)",
              color: "var(--primary)",
            }}
          >
            <Expand size={13} />
            Ver página
          </div>
        </div>
      )}

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
          loading="lazy"
          decoding="async"
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

function tierGroupLabel(tier: TextBookCardTier): string | null {
  switch (tier) {
    case "offering":
      return "Qué ofrecemos · ciclo BUILD";
    case "future":
      return "Lo que el modelo habilita después";
    default:
      return null;
  }
}

interface TextCardContentProps {
  card: TextBookCard;
  sectionColor: string;
}

function FutureBullets({ bullets, color }: { bullets: string[]; color: string }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-2">
      {bullets.map((b, i) => (
        <li
          key={i}
          className="flex items-start gap-2 px-3 py-2.5 rounded-[var(--radius-md)]"
          style={{
            background: `color-mix(in srgb, ${color} 10%, var(--surface-panel))`,
            border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
          }}
        >
          <Sparkles size={14} className="flex-shrink-0 mt-px" style={{ color }} aria-hidden="true" />
          <span className="text-[12px] font-medium leading-snug" style={{ color: "var(--text-primary)" }}>
            {b}
          </span>
        </li>
      ))}
    </ul>
  );
}

function AccentBullets({ bullets }: { bullets: string[] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-2.5">
      {bullets.map((b, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 px-3.5 py-3 rounded-[var(--radius-md)]"
          style={{
            background: "var(--primary-glow-strong)",
            border: "1px solid color-mix(in srgb, var(--primary) 22%, transparent)",
          }}
        >
          <CheckCircle2
            size={16}
            className="flex-shrink-0 mt-px"
            style={{ color: "var(--primary)" }}
            aria-hidden="true"
          />
          <span className="text-[13px] font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
            {b}
          </span>
        </li>
      ))}
    </ul>
  );
}

function TextCardContent({ card, sectionColor }: TextCardContentProps) {
  const isWide = card.span === "3x1" || card.span === "2x1";
  const hasBullets = !!card.bullets && card.bullets.length > 0;
  const manyBullets = hasBullets && card.bullets!.length >= 4;

  // ── Tier: oferta principal (BUILD) ──
  if (card.tier === "offering") {
    const idx = card.offeringIndex ?? 1;
    return (
      <div className="flex flex-col gap-2.5 h-full">
        <div className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold flex-shrink-0"
            style={{ background: sectionColor, color: "#fff" }}
            aria-hidden="true"
          >
            {idx}
          </span>
          {card.eyebrow && (
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: sectionColor }}
            >
              {card.eyebrow}
            </span>
          )}
        </div>
        <h3 className="text-base font-bold leading-snug" style={{ color: "var(--text-primary)" }}>
          {card.heading}
        </h3>
        <p className="text-[13px] leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
          {card.body}
        </p>
      </div>
    );
  }

  // ── Tier: desarrollos futuros (Build & Run) ──
  if (card.tier === "future") {
    return (
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 h-full">
        <div className="flex flex-col gap-2 min-w-0">
          {card.eyebrow && (
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "var(--text-subtle)" }}
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
        </div>
        {hasBullets && (
          <div className="flex flex-col gap-2 min-w-0 justify-center">
            <FutureBullets bullets={card.bullets!} color={sectionColor} />
          </div>
        )}
      </div>
    );
  }

  // ── Tier: enfoque ──
  if (card.tier === "focus") {
    return (
      <div
        className="flex flex-col gap-2.5 h-full"
        style={{ borderLeft: `3px solid ${sectionColor}`, paddingLeft: 16 }}
      >
        {card.eyebrow && (
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: sectionColor }}
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
      </div>
    );
  }

  const eyebrowEl = card.eyebrow ? (
    <span
      className="text-[10px] font-bold uppercase tracking-widest"
      style={{ color: "var(--primary)" }}
    >
      {card.eyebrow}
    </span>
  ) : null;

  const headingEl = (
    <h3 className="text-base sm:text-lg font-bold leading-snug" style={{ color: "var(--text-primary)" }}>
      {card.heading}
    </h3>
  );

  const bodyEl = card.body ? (
    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
      {card.body}
    </p>
  ) : null;

  // Accent (pitch) cards highlight their bullets as emphasized chips so the
  // key differentiators stand out instead of reading as a plain muted list.
  const bulletsEl = hasBullets ? (
    card.accent ? (
      <AccentBullets bullets={card.bullets!} />
    ) : (
      <ul
        className={`gap-x-6 gap-y-1.5 ${
          isWide && manyBullets ? "grid sm:grid-cols-2" : "flex flex-col"
        }`}
      >
        {card.bullets!.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "var(--primary)" }}
              aria-hidden="true"
            />
            <span className="text-[13px] leading-relaxed" style={{ color: "var(--text-muted)" }}>{b}</span>
          </li>
        ))}
      </ul>
    )
  ) : null;

  const accentStyle = card.accent
    ? { borderLeft: "3px solid var(--primary)", paddingLeft: 16 }
    : undefined;

  // Wide cards: editorial two-column layout to shorten height and keep a
  // comfortable line length on full-width screens.
  if (isWide) {
    return (
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-3 h-full" style={accentStyle}>
        <div className="flex flex-col gap-2.5 min-w-0">
          {eyebrowEl}
          {headingEl}
          {hasBullets && bodyEl}
        </div>
        <div className="flex flex-col gap-2.5 min-w-0 justify-center">
          {hasBullets ? bulletsEl : bodyEl}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5 h-full" style={accentStyle}>
      {eyebrowEl}
      {headingEl}
      {bodyEl}
      {bulletsEl}
    </div>
  );
}

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
        <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {card.description}
        </p>
      )}
    </div>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

interface BookSectionScreenProps {
  data: BookSectionScreenData;
}

export function BookSectionScreen({ data }: BookSectionScreenProps) {
  if (data.layout === "investment" && data.investment) {
    return <InvestmentSection data={data} />;
  }

  const reduced = useReducedMotion();
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  // Build the list of image cards that have a `detail` property (in order)
  const modalItems = data.cards
    .filter((c): c is ImageBookCard => c.type === "image" && !!c.detail)
    .map((c) => ({
      src: c.src,
      alt: c.alt,
      caption: c.caption,
      badge: c.badge,
      detail: c.detail!,
    }));

  // Map each card to its index within modalItems (or -1 if it's not in the list)
  let modalItemCounter = -1;
  const cardModalIndex = data.cards.map((c) => {
    if (c.type === "image" && c.detail) {
      modalItemCounter++;
      return modalItemCounter;
    }
    return -1;
  });

  const openModal = useCallback((idx: number) => setModalIndex(idx), []);
  const closeModal = useCallback(() => setModalIndex(null), []);
  const navigateModal = useCallback((idx: number) => setModalIndex(idx), []);

  const sectionColor = data.accentColor ?? "var(--primary)";

  return (
    <>
      <motion.div
        className="min-h-full w-full min-w-0 px-5 sm:px-8 lg:px-16 py-6 sm:py-8"
        variants={reduced ? undefined : screenEnter}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="flex flex-col gap-5 w-full min-w-0"
          variants={reduced ? undefined : stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Section heading */}
          <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span
                className="block flex-shrink-0"
                style={{ width: 14, height: 2, background: sectionColor, borderRadius: 0 }}
                aria-hidden="true"
              />
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: sectionColor }}
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
            {data.cards.map((card, i) => {
              const { colSpan, colSpanSm, colSpanMd } = spanToCols(card.span);
              const prevCard = i > 0 ? data.cards[i - 1] : undefined;
              const prevTier =
                prevCard?.type === "text" ? prevCard.tier : undefined;
              const cardTier = card.type === "text" ? card.tier : undefined;
              const groupLabel =
                cardTier && cardTier !== prevTier ? tierGroupLabel(cardTier) : null;

              const isTextAccent = card.type === "text" && card.accent;
              const isOffering = card.type === "text" && card.tier === "offering";
              const isFuture = card.type === "text" && card.tier === "future";
              const isFocus = card.type === "text" && card.tier === "focus";
              const isHighlight =
                card.type === "metric" || isTextAccent || isOffering || isFuture || isFocus;

              const cardMIdx = cardModalIndex[i];
              const isClickable = card.type === "image" && cardMIdx !== -1;

              return (
                <Fragment key={i}>
                  {groupLabel && (
                    <div className="col-span-12 flex items-center gap-2 pt-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: sectionColor }}
                        aria-hidden="true"
                      />
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest"
                        style={{ color: sectionColor }}
                      >
                        {groupLabel}
                      </span>
                    </div>
                  )}
                  <BentoCard
                    colSpan={colSpan}
                    colSpanSm={colSpanSm}
                    colSpanMd={colSpanMd}
                    highlight={isHighlight}
                    highlightColor={sectionColor}
                    highlightEdge={isOffering ? "top" : "left"}
                    backgroundTint={isOffering ? sectionColor : undefined}
                    noPadding={card.type === "image"}
                  >
                    <motion.div
                      variants={reduced ? undefined : fadeUp}
                      className="h-full"
                    >
                      {card.type === "image" && (
                        <ImageCardContent
                          card={card}
                          clickable={isClickable}
                          onClick={isClickable ? () => openModal(cardMIdx) : undefined}
                        />
                      )}
                      {card.type === "wireframe" && <WireframeCardContent card={card} />}
                      {card.type === "text" && (
                        <TextCardContent card={card} sectionColor={sectionColor} />
                      )}
                      {card.type === "metric" && <MetricCardContent card={card} />}
                      {card.type === "chart" && <Chart card={card} />}
                      {card.type === "diagram" && <ArchitectureDiagram card={card} />}
                    </motion.div>
                  </BentoCard>
                </Fragment>
              );
            })}
          </BentoGrid>
        </motion.div>
      </motion.div>

      {/* Modal */}
      {modalIndex !== null && modalItems.length > 0 && (
        <PageDetailModal
          items={modalItems}
          currentIndex={modalIndex}
          onClose={closeModal}
          onNavigate={navigateModal}
        />
      )}
    </>
  );
}

export default BookSectionScreen;
