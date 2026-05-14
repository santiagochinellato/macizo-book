"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { BentoCard } from "@/components/bento/BentoCard";
import { screenEnter, stagger, fadeUp, scaleIn } from "@/lib/motion-variants";
import type { ProductScreenData } from "@/types/presentation";

interface ProductScreenProps {
  data: ProductScreenData;
}

export function ProductScreen({ data }: ProductScreenProps) {
  const reduced = useReducedMotion();
  const { architectureTitle, architectureDescription, features } = data;

  return (
    <motion.div
      className="p-6 sm:p-8 min-h-full"
      variants={reduced ? undefined : screenEnter}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="product"
    >
      <motion.div
        className="flex flex-col gap-6 max-w-5xl mx-auto"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-1">
          <span
            className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--primary)" }}
          >
            Descripción del producto
          </span>
          <h1
            className="font-bold"
            style={{ fontSize: "clamp(20px, 3vw, 32px)", color: "var(--text-primary)" }}
          >
            {architectureTitle}
          </h1>
        </motion.div>

        <BentoGrid>
          {/* Architecture description — 2/3 */}
          <BentoCard colSpan={12} colSpanSm={8}>
            <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-3 h-full">
              <span
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--text-subtle)" }}
              >
                Arquitectura
              </span>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {architectureDescription}
              </p>
            </motion.div>
          </BentoCard>

          {/* Quick stats — 1/3 */}
          <BentoCard colSpan={12} colSpanSm={4} highlight>
            <motion.div
              variants={reduced ? undefined : fadeUp}
              className="flex flex-col gap-4 h-full justify-center"
            >
              {[
                { label: "Uptime garantizado", value: "99.9%" },
                { label: "Core Web Vitals", value: "Verde" },
                { label: "Entregables", value: `${features.length}` },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span
                    className="text-xl font-bold"
                    style={{ color: "var(--primary)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </BentoCard>

          {/* Features — pairs of text + image */}
          {features.map((feature, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={feature.id}
                variants={reduced ? undefined : stagger}
                initial="hidden"
                animate="visible"
                className="col-span-12 grid grid-cols-12 gap-4"
              >
                {/* Text card */}
                <BentoCard
                  colSpan={12}
                  colSpanSm={feature.image ? 7 : 12}
                  className={feature.image && !isEven ? "sm:order-2" : ""}
                >
                  <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-3 h-full justify-center">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{
                          background: "var(--primary-glow)",
                          color: "var(--primary)",
                        }}
                      >
                        0{i + 1}
                      </span>
                    </div>
                    <h3
                      className="text-base font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {feature.description}
                    </p>
                  </motion.div>
                </BentoCard>

                {/* Image card */}
                {feature.image && (
                  <BentoCard
                    colSpan={12}
                    colSpanSm={5}
                    noPadding
                    className={!isEven ? "sm:order-1" : ""}
                  >
                    <motion.div
                      variants={reduced ? undefined : scaleIn}
                      className="relative w-full h-48 sm:h-full min-h-[180px]"
                    >
                      <Image
                        src={feature.image}
                        alt={feature.imageAlt ?? feature.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 40vw"
                      />
                    </motion.div>
                  </BentoCard>
                )}
              </motion.div>
            );
          })}
        </BentoGrid>
      </motion.div>
    </motion.div>
  );
}

export default ProductScreen;
