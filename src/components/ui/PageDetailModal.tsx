"use client";

import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface PageDetail {
  title: string;
  description: string;
  bullets?: string[];
  stack?: string[];
}

interface ModalItem {
  src: string;
  alt: string;
  caption?: string;
  badge?: string;
  detail: PageDetail;
}

interface PageDetailModalProps {
  items: ModalItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function PageDetailModal({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: PageDetailModalProps) {
  const current = items[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && hasNext) onNavigate(currentIndex + 1);
    },
    [onClose, hasPrev, hasNext, currentIndex, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        style={{ backgroundColor: "rgba(15,23,42,0.85)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        <motion.div
          key={`modal-card-${currentIndex}`}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative flex flex-col md:flex-row w-full max-w-5xl max-h-[95dvh] sm:max-h-[90vh] rounded-t-xl sm:rounded-[var(--radius-lg)]"
          style={{
            backgroundColor: "var(--surface-card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-elevated)",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image — 2/3, scrollable vertically */}
          <div
            className="w-full md:w-2/3 shrink-0 overflow-y-auto max-h-[40dvh] md:max-h-none"
            style={{ scrollbarWidth: "thin", scrollbarColor: "var(--border) transparent" }}
          >
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.src}
                alt={current.alt}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              {current.badge && (
                <div
                  className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-widest"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "#fff",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  {current.badge}
                </div>
              )}
            </div>
          </div>

          {/* Detail — 1/3, scrollable */}
          <div className="flex flex-col w-full md:w-1/3 overflow-y-auto p-5 sm:p-8 min-h-0 flex-1 border-t md:border-t-0 md:border-l border-[var(--border)]">
            {/* Dot pagination */}
            {items.length > 1 && (
              <div className="flex gap-1.5 mb-6">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => onNavigate(i)}
                    className="w-2 h-2 rounded-full transition-colors"
                    style={{
                      backgroundColor: i === currentIndex ? "var(--primary)" : "var(--border)",
                    }}
                    aria-label={`Ir a ${i + 1}`}
                  />
                ))}
              </div>
            )}

            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "var(--primary)" }}
            >
              Página {currentIndex + 1} de {items.length}
            </p>

            <h2
              className="text-xl font-semibold mb-4 leading-snug"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
            >
              {current.detail.title}
            </h2>

            {current.caption && (
              <p className="text-xs mb-4" style={{ color: "var(--text-subtle)" }}>
                {current.caption}
              </p>
            )}

            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
              {current.detail.description}
            </p>

            {current.detail.bullets && current.detail.bullets.length > 0 && (
              <ul className="space-y-2 mb-6">
                {current.detail.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--primary)" }} />
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {current.detail.stack && current.detail.stack.length > 0 && (
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {current.detail.stack.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: "var(--surface-bg)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Prev / Next — sticky sobre el panel de imagen */}
          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "rgba(255,255,255,0.92)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                boxShadow: "var(--shadow-card)",
              }}
              aria-label="Anterior"
            >
              <ChevronLeft size={18} style={{ color: "var(--text-primary)" }} />
            </button>
          )}
          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
              className="absolute z-10 flex items-center justify-center w-9 h-9 transition-opacity hover:opacity-80 right-3 md:right-[calc(33%+12px)] top-1/2 -translate-y-1/2"
              style={{
                backgroundColor: "rgba(255,255,255,0.92)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                boxShadow: "var(--shadow-card)",
              }}
              aria-label="Siguiente"
            >
              <ChevronRight size={18} style={{ color: "var(--text-primary)" }} />
            </button>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 transition-opacity hover:opacity-70"
            style={{
              backgroundColor: "var(--surface-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "var(--shadow-card)",
              color: "var(--text-secondary)",
            }}
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
