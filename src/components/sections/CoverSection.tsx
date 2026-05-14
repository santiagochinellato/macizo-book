"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { fadeUp, stagger } from "@/lib/motion-variants";
import { formatDate, DOC_TYPE_LABELS, STATUS_LABELS, STATUS_COLORS } from "@/lib/utils";
import type { AgencyConfig, ClientConfig, DocumentMeta } from "@/types/presentation";

interface CoverSectionProps {
  agency: AgencyConfig;
  client: ClientConfig;
  meta: DocumentMeta;
}

export function CoverSection({ agency, client, meta }: CoverSectionProps) {
  const reduced = useReducedMotion();
  const statusColor = STATUS_COLORS[meta.status];
  const statusLabel = STATUS_LABELS[meta.status];
  const typeLabel = DOC_TYPE_LABELS[meta.type];

  const containerVariants = reduced ? undefined : stagger;
  const itemVariants = reduced ? undefined : fadeUp;

  return (
    <section
      id="cover"
      className="relative flex flex-col justify-between overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--primary) 0%, var(--fg) 100%)`,
        minHeight: 480,
        padding: "56px 56px 48px",
      }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, var(--accent) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--surface) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 flex flex-col gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top row: agency + client logos */}
        <motion.div variants={itemVariants} className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            {agency.logoLight ? (
              <Image
                src={agency.logoLight}
                alt={agency.name}
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
              />
            ) : (
              <span
                className="text-xl font-bold"
                style={{ color: "#fff", fontFamily: "var(--font-display)" }}
              >
                {agency.name}
              </span>
            )}
          </div>

          {client.logo && (
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={80}
                height={32}
                className="h-7 w-auto object-contain"
              />
            </div>
          )}
        </motion.div>

        {/* Main content */}
        <div className="flex flex-col gap-4">
          <motion.div variants={itemVariants} className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--accent)" }}
            >
              {typeLabel} #{meta.number}
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{
                background: `${statusColor}30`,
                color: statusColor,
                border: `1px solid ${statusColor}50`,
              }}
            >
              {statusLabel}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-bold leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "#fff",
              fontSize: "clamp(32px, 5vw, 52px)",
            }}
          >
            {meta.title}
          </motion.h1>

          {meta.subtitle && (
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {meta.subtitle}
            </motion.p>
          )}
        </div>

        {/* Bottom row */}
        <motion.div variants={itemVariants} className="flex items-end justify-between flex-wrap gap-4 pt-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              Preparado para
            </span>
            <span
              className="text-base font-semibold"
              style={{ color: "#fff" }}
            >
              {client.name}
            </span>
            {client.contact.name && (
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                {client.contact.name}
                {client.contact.role && `, ${client.contact.role}`}
              </span>
            )}
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              Fecha
            </span>
            <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
              {formatDate(meta.date, meta.language)}
            </span>
            {meta.validUntil && (
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                Válido hasta {formatDate(meta.validUntil, meta.language)}
              </span>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-10 flex justify-center mt-8"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={20} style={{ color: "rgba(255,255,255,0.4)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default CoverSection;
