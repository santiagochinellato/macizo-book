"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Globe, ArrowUpRight } from "lucide-react";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { BentoCard } from "@/components/bento/BentoCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { screenEnter, stagger, fadeUp } from "@/lib/motion-variants";
import { DOC_TYPE_LABELS, STATUS_LABELS, STATUS_COLORS, formatDate } from "@/lib/utils";
import type {
  OverviewScreenData,
  DocumentMeta,
  ClientConfig,
  AgencyConfig,
} from "@/types/presentation";

type LucideIconName = keyof typeof LucideIcons;

function DynamicIcon({ name, size = 18 }: { name: string; size?: number }) {
  const IconComponent = LucideIcons[name as LucideIconName] as React.ComponentType<{ size?: number; style?: React.CSSProperties }> | undefined;
  if (!IconComponent) return <Globe size={size} />;
  return <IconComponent size={size} />;
}

interface OverviewScreenProps {
  data: OverviewScreenData;
  meta: DocumentMeta;
  client: ClientConfig;
  agency: AgencyConfig;
}

export function OverviewScreen({ data, meta, client, agency }: OverviewScreenProps) {
  const reduced = useReducedMotion();
  const statusColor = STATUS_COLORS[meta.status];
  const statusLabel = STATUS_LABELS[meta.status];
  const typeLabel = DOC_TYPE_LABELS[meta.type];

  return (
    <motion.div
      className="min-h-full w-full min-w-0 px-5 sm:px-8 lg:px-16 py-6 sm:py-8"
      variants={reduced ? undefined : screenEnter}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="overview"
    >
      <motion.div
        className="flex flex-col gap-6 w-full min-w-0"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Page heading */}
        <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs font-mono"
              style={{ color: "var(--text-subtle)" }}
            >
              {typeLabel} #{meta.number}
            </span>
            <span style={{ color: "var(--border)" }}>·</span>
            <span
              className="text-xs font-mono"
              style={{ color: "var(--text-subtle)" }}
            >
              {formatDate(meta.date, meta.language)}
            </span>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: `${statusColor}20`,
                color: statusColor,
              }}
            >
              {statusLabel}
            </span>
          </div>
          <h1
            className="font-bold leading-tight"
            style={{
              fontSize: "clamp(22px, 3vw, 36px)",
              color: "var(--text-primary)",
            }}
          >
            {data.headline}
          </h1>
        </motion.div>

        <BentoGrid>
          {/* Hero image — full width, if provided */}
          {data.heroImage && (
            <BentoCard colSpan={12} noPadding>
              <motion.div
                variants={reduced ? undefined : fadeUp}
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "21/9", minHeight: 200 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.heroImage.src}
                  alt={data.heroImage.alt}
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center 30%",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(15,23,42,0.68) 0%, transparent 55%)" }}
                  aria-hidden="true"
                />
                {data.heroImage.caption && (
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
                    <div
                      className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest mb-1.5"
                      style={{ background: "var(--primary)", color: "#fff", borderRadius: "var(--radius-sm)" }}
                    >
                      Visión
                    </div>
                    <p className="text-sm font-semibold text-white leading-snug">{data.heroImage.caption}</p>
                  </div>
                )}
              </motion.div>
            </BentoCard>
          )}

          {/* Vision card — 8 cols */}
          <BentoCard colSpan={12} colSpanSm={8}>
            <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-3 h-full">
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "var(--primary)" }}
              >
                Visión
              </span>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {data.vision}
              </p>
            </motion.div>
          </BentoCard>

          {/* Price card — 4 cols */}
          <BentoCard colSpan={12} colSpanSm={4} highlight>
            <motion.div
              variants={reduced ? undefined : fadeUp}
              className="flex flex-col gap-2 h-full justify-between"
            >
              <div className="flex flex-col gap-1">
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "var(--text-subtle)" }}
              >
                Inversión total
              </span>
                <div
                  className="text-3xl sm:text-4xl font-bold tabular-nums"
                  style={{ color: "var(--primary)", lineHeight: 1.1 }}
                >
                  <AnimatedNumber value={data.totalPrice} currency={meta.currency} />
                </div>
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--text-subtle)" }}
                >
                  {meta.currency}
                </span>
              </div>
              <div className="flex flex-col gap-1 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                  Para {client.name}
                </span>
                {meta.validUntil && (
                  <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                    Válido hasta {formatDate(meta.validUntil, meta.language)}
                  </span>
                )}
              </div>
            </motion.div>
          </BentoCard>

          {/* Objectives */}
          {data.objectives.map((obj, i) => (
            <BentoCard
              key={i}
              colSpan={12}
              colSpanSm={data.objectives.length <= 2 ? 6 : 3}
            >
              <motion.div
                variants={reduced ? undefined : fadeUp}
                className="flex flex-col gap-3"
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{
                    background: "color-mix(in srgb, var(--primary) 12%, transparent)",
                    color: "var(--primary)",
                  }}
                >
                  <DynamicIcon name={obj.icon} size={18} />
                </div>
                <div className="flex flex-col gap-1">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {obj.title}
                  </span>
                  <span
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {obj.description}
                  </span>
                </div>
              </motion.div>
            </BentoCard>
          ))}

          {/* CTA card */}
          <BentoCard colSpan={12}>
            <motion.div
              variants={reduced ? undefined : fadeUp}
              className="flex items-center justify-between gap-4 flex-wrap"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  ¿Seguimos avanzando?
                </span>
                <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                  Contacto: {agency.email}
                  {agency.social?.whatsapp && " · WhatsApp disponible"}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {agency.social?.whatsapp && (
                  <a
                    href={agency.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-opacity hover:opacity-90"
                    style={{ background: "var(--primary)", color: "#fff" }}
                  >
                    WhatsApp
                    <ArrowUpRight size={12} />
                  </a>
                )}
                <a
                  href={`mailto:${agency.email}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80"
                  style={{
                    background: "var(--surface-elevated)",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border)",
                  }}
                >
                  Email
                </a>
              </div>
            </motion.div>
          </BentoCard>
        </BentoGrid>
      </motion.div>
    </motion.div>
  );
}

export default OverviewScreen;
