"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { stagger, fadeUp } from "@/lib/motion-variants";
import type { TestimonialsData } from "@/types/presentation";

interface TestimonialsSectionProps {
  data: TestimonialsData;
  label?: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          style={{
            color: i < rating ? "var(--accent)" : "var(--border)",
            fill: i < rating ? "var(--accent)" : "var(--border)",
          }}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection({ data, label }: TestimonialsSectionProps) {
  const reduced = useReducedMotion();
  const { items } = data;

  const cols =
    items.length === 1
      ? "grid-cols-1 max-w-xl"
      : items.length === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      id="testimonials"
      className="px-5 sm:px-8 lg:px-14 py-12"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <SectionLabel className="mb-6">{label ?? "Referencias"}</SectionLabel>

      <motion.div
        className={`grid gap-4 ${cols}`}
        variants={reduced ? undefined : stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={reduced ? undefined : fadeUp}
            className="flex flex-col gap-4 p-5 rounded-xl transition-transform hover:-translate-y-0.5"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              transitionDuration: "200ms",
              transitionTimingFunction: "ease-out",
            }}
          >
            <Quote
              size={20}
              style={{
                color: "var(--accent)",
                opacity: 0.6,
              }}
              aria-hidden="true"
            />

            <p
              className="text-sm leading-relaxed flex-1"
              style={{ color: "var(--fg)", fontStyle: "italic" }}
            >
              &ldquo;{item.quote}&rdquo;
            </p>

            {item.rating !== undefined && item.rating > 0 && (
              <Stars rating={item.rating} />
            )}

            <div
              className="flex items-center gap-3 pt-3"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {item.avatar ? (
                <Image
                  src={item.avatar}
                  alt={item.author}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{
                    background: "var(--primary)",
                    color: "#fff",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {item.author.charAt(0)}
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--fg)" }}
                >
                  {item.author}
                </span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {[item.role, item.company].filter(Boolean).join(", ")}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default TestimonialsSection;
