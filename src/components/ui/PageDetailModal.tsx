"use client";

import { useEffect, useCallback, useRef } from "react";
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

const navButtonStyle = {
  backgroundColor: "var(--surface-card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  boxShadow: "var(--shadow-card)",
  color: "var(--text-primary)",
} as const;

export function PageDetailModal({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: PageDetailModalProps) {
  const current = items[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;
  const detailRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    detailRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    imageRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [currentIndex]);

  const showCarousel = items.length > 1;

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
        style={{ backgroundColor: "rgba(15,23,42,0.85)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        <motion.div
          key={`modal-card-${currentIndex}`}
          initial={{ opacity: 0, scale: 0.98, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 16 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative flex flex-col w-full max-w-5xl max-h-[96dvh] md:max-h-[90vh] rounded-t-xl md:rounded-[var(--radius-lg)] overflow-hidden"
          style={{
            backgroundColor: "var(--surface-card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-elevated)",
          }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={current.detail.title}
        >
          {/* Header fijo */}
          <div
            className="flex-shrink-0 flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--border)]"
            style={{ background: "var(--surface-panel)" }}
          >
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 flex-shrink-0 transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              style={navButtonStyle}
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>

            {showCarousel && (
              <div className="flex flex-col items-center gap-1.5 min-w-0 flex-1">
                <p
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "var(--primary)" }}
                >
                  Página {currentIndex + 1} de {items.length}
                </p>
                <div className="flex gap-1.5">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => onNavigate(i)}
                      className="w-2 h-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                      style={{
                        backgroundColor:
                          i === currentIndex ? "var(--primary)" : "var(--border)",
                      }}
                      aria-label={`Ir a página ${i + 1}`}
                      aria-current={i === currentIndex ? "step" : undefined}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="w-9 flex-shrink-0 hidden sm:block" aria-hidden="true" />
          </div>

          {/* Cuerpo: imagen + detalle */}
          <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
            {/* Panel imagen */}
            <div
              ref={imageRef}
              className="relative w-full md:w-[58%] shrink-0 overflow-y-auto max-h-[38dvh] md:max-h-none md:min-h-0"
              style={{ scrollbarWidth: "thin", scrollbarColor: "var(--border) transparent" }}
            >
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.src}
                  alt={current.alt}
                  className="w-full h-auto block"
                />
                {current.badge && (
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
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

              {/* Flechas solo en el panel de imagen (desktop) */}
              {showCarousel && hasPrev && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(currentIndex - 1);
                  }}
                  className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                  style={navButtonStyle}
                  aria-label="Página anterior"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              {showCarousel && hasNext && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(currentIndex + 1);
                  }}
                  className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                  style={navButtonStyle}
                  aria-label="Página siguiente"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>

            {/* Panel detalle */}
            <div
              ref={detailRef}
              className="flex flex-col w-full md:w-[42%] flex-1 min-h-0 overflow-y-auto p-5 md:p-6 border-t md:border-t-0 md:border-l border-[var(--border)]"
              style={{ scrollbarWidth: "thin", scrollbarColor: "var(--border) transparent" }}
            >
              <h2
                className="text-lg md:text-xl font-semibold mb-3 leading-snug"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
              >
                {current.detail.title}
              </h2>

              {current.caption && (
                <p className="text-xs mb-3" style={{ color: "var(--text-subtle)" }}>
                  {current.caption}
                </p>
              )}

              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                {current.detail.description}
              </p>

              {current.detail.bullets && current.detail.bullets.length > 0 && (
                <ul className="space-y-2 mb-5">
                  {current.detail.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: "var(--primary)" }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {current.detail.stack && current.detail.stack.length > 0 && (
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest mb-2"
                    style={{ color: "var(--text-subtle)" }}
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
                          color: "var(--text-muted)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer navegación — mobile y tablet */}
          {showCarousel && (
            <div
              className="md:hidden flex-shrink-0 flex items-center gap-2 px-4 py-3 border-t border-[var(--border)]"
              style={{ background: "var(--surface-panel)" }}
            >
              <button
                type="button"
                onClick={() => onNavigate(currentIndex - 1)}
                disabled={!hasPrev}
                className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                style={{
                  ...navButtonStyle,
                  color: hasPrev ? "var(--primary)" : "var(--text-subtle)",
                }}
                aria-label="Página anterior"
              >
                <ChevronLeft size={18} />
                <span>Anterior</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate(currentIndex + 1)}
                disabled={!hasNext}
                className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                style={{
                  background: "var(--primary)",
                  color: "#fff",
                  borderRadius: "var(--radius-sm)",
                }}
                aria-label="Página siguiente"
              >
                <span>Siguiente</span>
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
