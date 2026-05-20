"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, CheckCircle2, MessageCircle, Mail } from "lucide-react";
import { screenEnter, stagger, fadeUp } from "@/lib/motion-variants";
import type {
  PresentationConfig,
  BookSectionScreen as BookSectionScreenType,
  DesignSystemScreen as DesignSystemScreenType,
  RoadmapScreen as RoadmapScreenType,
  PricingScreen as PricingScreenType,
  TextBookCard,
  ImageBookCard,
} from "@/types/presentation";

interface ClosingScreenProps {
  config: PresentationConfig;
}

// ─── Section: Propuesta de valor ──────────────────────────────────────────────

function ValuePropSection({ card }: { card: TextBookCard }) {
  return (
    <div
      className="flex flex-col gap-4 p-7 rounded-2xl"
      style={{
        background: "var(--primary)",
        color: "#fff",
      }}
    >
      {card.eyebrow && (
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.6)" }}>
          {card.eyebrow}
        </span>
      )}
      <h2 className="text-xl sm:text-2xl font-bold leading-snug" style={{ fontFamily: "var(--font-display)" }}>
        {card.heading}
      </h2>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
        {card.body}
      </p>
      {card.bullets && card.bullets.length > 0 && (
        <ul className="grid sm:grid-cols-2 gap-2 mt-1">
          {card.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.88)" }}>
              <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }} />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Section: Design system brief ─────────────────────────────────────────────

function DesignBriefSection({ data }: { data: DesignSystemScreenType["data"] }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
        Sistema visual
      </span>

      <div
        className="flex flex-col gap-5 p-5 rounded-xl"
        style={{ background: "var(--surface-panel)", border: "1px solid var(--border)" }}
      >
        {/* Color swatches */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
            Paleta de colores
          </span>
          <div className="flex gap-2 flex-wrap">
            {data.palette.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0"
                  style={{
                    backgroundColor: c.hex,
                    border: "1px solid rgba(0,0,0,0.10)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  }}
                  title={`${c.name} — ${c.hex}`}
                />
                <span
                  className="text-[9px] font-mono text-center"
                  style={{ color: "var(--text-subtle)", lineHeight: 1.2 }}
                >
                  {c.hex.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
            Tipografía
          </span>
          <div className="grid sm:grid-cols-2 gap-3">
            {data.typography.map((f, i) => {
              const isSerif = f.category === "serif" || f.category === "display";
              return (
                <div
                  key={i}
                  className="flex flex-col gap-1.5 px-4 py-3 rounded-lg"
                  style={{
                    background: "var(--surface-card)",
                    border: "1px solid var(--border)",
                    borderLeft: "3px solid var(--primary)",
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                      {f.name}
                    </span>
                    <span
                      className="text-[9px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded"
                      style={{ background: "rgba(26,92,56,0.08)", color: "var(--primary)" }}
                    >
                      {isSerif ? "Serif" : "Sans"}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-snug"
                    style={{
                      color: "var(--text-secondary)",
                      fontFamily: isSerif
                        ? `'${f.name}', Georgia, serif`
                        : `'${f.name}', system-ui, sans-serif`,
                      fontWeight: isSerif ? 600 : 400,
                    }}
                  >
                    {f.sample}
                  </p>
                  <span className="text-[9px]" style={{ color: "var(--text-subtle)" }}>
                    {f.role}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section: Wireframes grid ──────────────────────────────────────────────────

function WireframesSection({ cards }: { cards: ImageBookCard[] }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
        Páginas propuestas
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {cards.map((card, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-xl"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "9/14" }}>
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
            </div>
            <div
              className="px-2.5 py-2"
              style={{ background: "var(--surface-card)" }}
            >
              <span className="text-[10px] font-bold" style={{ color: "var(--text-primary)" }}>
                {card.badge ?? card.detail?.title ?? card.alt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Cronograma ───────────────────────────────────────────────────────

function RoadmapSection({ data }: { data: RoadmapScreenType["data"] }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
        Cronograma de desarrollo
      </span>
      <div className="grid sm:grid-cols-3 gap-3">
        {data.phases.map((phase) => (
          <div
            key={phase.id}
            className="flex flex-col gap-3 p-4 rounded-xl"
            style={{
              background: "var(--surface-panel)",
              border: "1px solid var(--border)",
              borderTop: "3px solid var(--primary)",
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: "var(--primary)", color: "#fff" }}
                >
                  {phase.number}
                </div>
                <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                  {phase.title}
                </span>
              </div>
              <span
                className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded flex-shrink-0"
                style={{ background: "rgba(26,92,56,0.08)", color: "var(--primary)" }}
              >
                <Clock size={10} />
                {phase.duration}
              </span>
            </div>
            <ul className="flex flex-col gap-1.5">
              {phase.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                  <CheckCircle2 size={11} className="flex-shrink-0 mt-0.5" style={{ color: "var(--primary)", opacity: 0.7 }} />
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Inversión ────────────────────────────────────────────────────────

function PricingSection({ data }: { data: PricingScreenType["data"] }) {
  if (!data.paymentPlans || data.paymentPlans.length === 0) return null;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
          Opciones de inversión
        </span>
        <span className="text-sm font-bold" style={{ color: "var(--primary)" }}>
          Total: ${data.total.toLocaleString("es-AR")} USD
        </span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {data.paymentPlans.map((plan, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 p-5 rounded-xl"
            style={{
              background: plan.featured ? "var(--primary)" : "var(--surface-panel)",
              border: plan.featured ? "none" : "1px solid var(--border)",
            }}
          >
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: plan.featured ? "rgba(255,255,255,0.6)" : "var(--text-subtle)" }}
            >
              {plan.title}
            </span>
            <span
              className="text-2xl font-bold"
              style={{ color: plan.featured ? "#fff" : "var(--text-primary)", fontFamily: "var(--font-display)" }}
            >
              {plan.amount}
            </span>
            <p
              className="text-xs leading-relaxed"
              style={{ color: plan.featured ? "rgba(255,255,255,0.78)" : "var(--text-muted)" }}
            >
              {plan.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: CTA ─────────────────────────────────────────────────────────────

function CtaSection({
  heading,
  body,
  whatsapp,
  email,
}: {
  heading: string;
  body: string;
  whatsapp?: string;
  email: string;
}) {
  return (
    <div
      className="flex flex-col items-center gap-6 py-12 px-6 rounded-2xl text-center"
      style={{
        background: "linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 70%, #000) 100%)",
      }}
    >
      <div className="flex flex-col gap-3 max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#fff", fontFamily: "var(--font-display)" }}>
          {heading}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
          {body}
        </p>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-lg transition-opacity hover:opacity-90"
            style={{ background: "#25d366", color: "#fff" }}
          >
            <MessageCircle size={16} />
            Escribir por WhatsApp
          </a>
        )}
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-lg transition-opacity hover:opacity-90"
          style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}
        >
          <Mail size={16} />
          Enviar un email
        </a>
      </div>
    </div>
  );
}

// ─── Section: Footer ──────────────────────────────────────────────────────────

function FooterSection({ name, website }: { name: string; website: string }) {
  const domain = website.replace(/^https?:\/\//, "");
  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <span className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
        {name}
      </span>
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm transition-opacity hover:opacity-70"
        style={{ color: "var(--primary)" }}
      >
        {domain}
      </a>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export function ClosingScreen({ config }: ClosingScreenProps) {
  const reduced = useReducedMotion();

  const presentacion = config.screens.find(s => s.id === "presentacion") as BookSectionScreenType | undefined;
  const pitchCard = presentacion?.data.cards.find(
    (c): c is TextBookCard => c.type === "text" && !!c.accent
  );

  const designSystemScreen = config.screens.find(s => s.type === "design-system") as DesignSystemScreenType | undefined;

  const solucion = config.screens.find(s => s.id === "solucion") as BookSectionScreenType | undefined;
  const wireframes = (solucion?.data.cards.filter(
    (c): c is ImageBookCard => c.type === "image" && !!c.detail
  ) ?? []);

  const roadmapScreen = config.screens.find(s => s.type === "roadmap") as RoadmapScreenType | undefined;
  const pricingScreen = config.screens.find(s => s.type === "pricing") as PricingScreenType | undefined;

  const { agency } = config;

  return (
    <motion.div
      className="min-h-full w-full min-w-0 px-5 sm:px-8 lg:px-14 py-6 sm:py-8"
      variants={reduced ? undefined : screenEnter}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="closing"
    >
      <motion.div
        className="flex flex-col gap-6 max-w-5xl mx-auto w-full min-w-0"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
            Cierre
          </span>
          <h1 className="font-bold" style={{ fontSize: "clamp(20px, 3vw, 32px)", color: "var(--text-primary)" }}>
            Resumen de la propuesta
          </h1>
        </motion.div>

        {/* 1 — Propuesta de valor */}
        {pitchCard && (
          <motion.div variants={reduced ? undefined : fadeUp}>
            <ValuePropSection card={pitchCard} />
          </motion.div>
        )}

        {/* 2 — Design system brief */}
        {designSystemScreen && (
          <motion.div variants={reduced ? undefined : fadeUp}>
            <DesignBriefSection data={designSystemScreen.data} />
          </motion.div>
        )}

        {/* 3 — Wireframes */}
        {wireframes.length > 0 && (
          <motion.div variants={reduced ? undefined : fadeUp}>
            <WireframesSection cards={wireframes} />
          </motion.div>
        )}

        {/* 4 — Roadmap */}
        {roadmapScreen && (
          <motion.div variants={reduced ? undefined : fadeUp}>
            <RoadmapSection data={roadmapScreen.data} />
          </motion.div>
        )}

        {/* 5 — Pricing */}
        {pricingScreen && (
          <motion.div variants={reduced ? undefined : fadeUp}>
            <PricingSection data={pricingScreen.data} />
          </motion.div>
        )}

        {/* 6 — CTA */}
        <motion.div variants={reduced ? undefined : fadeUp}>
          <CtaSection
            heading="¿Empezamos?"
            body={`Estamos listos para darle a ${config.client.name} la presencia digital que merece. Confirmá la propuesta antes del ${config.meta.validUntil ?? "vencimiento"} para mantener este precio.`}
            whatsapp={agency.social?.whatsapp}
            email={agency.email}
          />
        </motion.div>

        {/* 7 — Footer */}
        <motion.div variants={reduced ? undefined : fadeUp}>
          <FooterSection name={agency.name} website={agency.website} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ClosingScreen;
