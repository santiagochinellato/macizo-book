"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { Section } from "@/types/presentation";

const SECTION_LABELS: Record<Section["type"], string> = {
  cover: "Portada",
  client: "Cliente",
  summary: "Resumen",
  scope: "Alcance",
  timeline: "Cronograma",
  investment: "Inversión",
  gallery: "Portfolio",
  testimonials: "Referencias",
  cta: "Contacto",
};

interface SectionNavProps {
  sections: Section[];
}

export function SectionNav({ sections }: SectionNavProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  const enabledSections = sections.filter((s) => s.enabled);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    const ids = enabledSections.map((s) => s.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [enabledSections]);

  if (enabledSections.length <= 1) return null;

  return (
    <>
      {/* Desktop nav */}
      <nav
        className="sticky top-0 z-40 hidden sm:flex items-center justify-center gap-1 px-4 py-2 overflow-x-auto"
        style={{
          background: "color-mix(in srgb, var(--surface) 95%, transparent)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
        aria-label="Navegación de secciones"
      >
        {enabledSections.map((section) => {
          const label = section.label ?? SECTION_LABELS[section.type];
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="relative px-3 py-1.5 text-xs font-medium rounded transition-colors focus:outline-none focus-visible:ring-2 whitespace-nowrap"
              style={{
                color: isActive ? "var(--primary)" : "var(--muted)",
                fontFamily: "var(--font-body)",
              }}
              aria-current={isActive ? "true" : undefined}
            >
              {label}
              {isActive && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Mobile nav — hamburger */}
      <div
        className="sticky top-0 z-40 flex sm:hidden items-center justify-between px-5 py-3"
        style={{
          background: "color-mix(in srgb, var(--surface) 95%, transparent)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span
          className="text-xs font-semibold uppercase"
          style={{ letterSpacing: "0.1em", color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          {enabledSections.find((s) => s.id === activeId)?.label ??
            SECTION_LABELS[enabledSections.find((s) => s.id === activeId)?.type ?? "cover"]}
        </span>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center justify-center w-8 h-8 rounded focus:outline-none focus-visible:ring-2"
          style={{ color: "var(--primary)" }}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.4)" }}
            />
            <motion.nav
              className="absolute top-[57px] left-0 right-0 flex flex-col py-2 shadow-lg"
              style={{
                background: "var(--surface)",
                borderBottom: "1px solid var(--border)",
              }}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              aria-label="Menú de secciones"
            >
              {enabledSections.map((section) => {
                const label = section.label ?? SECTION_LABELS[section.type];
                const isActive = activeId === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-left transition-colors"
                    style={{
                      color: isActive ? "var(--primary)" : "var(--muted)",
                      background: isActive
                        ? "color-mix(in srgb, var(--primary) 6%, transparent)"
                        : "transparent",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {isActive && (
                      <span
                        className="w-1 h-4 rounded-full flex-shrink-0"
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                    {label}
                  </button>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SectionNav;
