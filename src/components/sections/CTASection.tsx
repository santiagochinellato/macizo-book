"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { stagger, fadeUp, scaleIn } from "@/lib/motion-variants";
import type { AgencyConfig, CTAData } from "@/types/presentation";

type LucideIconName = keyof typeof LucideIcons;

interface CTASectionProps {
  data: CTAData;
  agency: AgencyConfig;
  label?: string;
}

function DynamicIcon({ name, size = 18 }: { name: string; size?: number }) {
  const IconComponent = LucideIcons[name as LucideIconName] as React.ComponentType<{ size?: number }> | undefined;
  if (!IconComponent) return <ExternalLink size={size} />;
  return <IconComponent size={size} />;
}

export function CTASection({ data, agency, label: _label }: CTASectionProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="cta"
      className="px-5 sm:px-8 lg:px-14 py-16"
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, var(--primary) 6%, var(--surface)) 0%, var(--surface) 100%)`,
      }}
    >
      <motion.div
        className="flex flex-col items-center text-center gap-8 max-w-xl mx-auto"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Agency logo */}
        <motion.div variants={reduced ? undefined : scaleIn}>
          {agency.logoDark ? (
            <Image
              src={agency.logoDark}
              alt={agency.name}
              width={120}
              height={36}
              className="h-8 w-auto object-contain opacity-70"
            />
          ) : (
            <span
              className="text-lg font-bold"
              style={{ color: "var(--primary)", fontFamily: "var(--font-display)", opacity: 0.7 }}
            >
              {agency.name}
            </span>
          )}
        </motion.div>

        {/* Message */}
        <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-3">
          <h2
            className="font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--fg)",
              fontSize: "clamp(28px, 5vw, 40px)",
            }}
          >
            {data.message}
          </h2>
          {data.subtext && (
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {data.subtext}
            </p>
          )}
        </motion.div>

        {/* Buttons */}
        <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-wrap gap-3 justify-center">
          {data.buttons.map((btn, i) => (
            <motion.a
              key={i}
              href={btn.href}
              target={btn.href.startsWith("http") ? "_blank" : undefined}
              rel={btn.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-transform focus:outline-none focus-visible:ring-2"
              style={
                btn.variant === "primary"
                  ? {
                      background: "var(--primary)",
                      color: "#fff",
                      fontFamily: "var(--font-body)",
                    }
                  : btn.variant === "outline"
                  ? {
                      background: "transparent",
                      color: "var(--primary)",
                      border: "2px solid var(--primary)",
                      fontFamily: "var(--font-body)",
                    }
                  : {
                      background: "transparent",
                      color: "var(--muted)",
                      fontFamily: "var(--font-body)",
                    }
              }
              whileHover={reduced ? undefined : { scale: 1.02, translateY: -2 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              {btn.icon && <DynamicIcon name={btn.icon} size={16} />}
              {btn.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Agency tagline */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          className="flex flex-col items-center gap-1 pt-4"
          style={{ borderTop: "1px solid var(--border)", width: "100%" }}
        >
          <span
            className="text-xs"
            style={{
              color: "var(--muted)",
              fontStyle: "italic",
              fontFamily: "var(--font-body)",
            }}
          >
            {agency.tagline}
          </span>
          <a
            href={agency.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:underline transition-colors"
            style={{ color: "var(--muted)" }}
          >
            {agency.website.replace("https://", "")}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default CTASection;
