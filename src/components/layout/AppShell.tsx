"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";

interface AppShellProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sectionTitle?: string;
  activeSectionId?: string;
  mobileNavOpen: boolean;
  onMobileNavOpen: () => void;
  onMobileNavClose: () => void;
}

export function AppShell({
  sidebar,
  children,
  sectionTitle,
  activeSectionId,
  mobileNavOpen,
  onMobileNavOpen,
  onMobileNavClose,
}: AppShellProps) {
  const reduced = useReducedMotion();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        onMobileNavClose();
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onMobileNavClose]);

  useEffect(() => {
    if (!activeSectionId) return;
    const main = mainRef.current;
    if (!main) return;
    main.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [activeSectionId]);

  return (
    <div
      className="flex h-[100dvh] w-full overflow-hidden"
      style={{ background: "var(--surface-bg)" }}
    >
      <div className="hidden lg:flex flex-shrink-0 h-full">{sidebar}</div>

      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.2 }}
              className="fixed inset-0 z-40 lg:hidden cursor-default"
              style={{ background: "rgba(15, 23, 42, 0.45)" }}
              aria-label="Cerrar menú"
              onClick={onMobileNavClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
              }
              className="fixed inset-y-0 left-0 z-50 w-[min(288px,88vw)] max-w-full lg:hidden h-full shadow-xl"
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
            >
              {sidebar}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1 min-w-0 w-full h-full">
        <header
          className="lg:hidden flex-shrink-0 flex items-center gap-3 px-4 py-3 min-h-[56px]"
          style={{
            background: "var(--surface-panel)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <button
            type="button"
            onClick={onMobileNavOpen}
            className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            style={{
              background: "color-mix(in srgb, var(--primary) 8%, transparent)",
              color: "var(--primary)",
            }}
            aria-label="Abrir menú de secciones"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <div className="flex flex-col min-w-0 flex-1">
            <span
              className="text-[10px] font-semibold uppercase tracking-widest truncate"
              style={{ color: "var(--primary)" }}
            >
              Sección actual
            </span>
            <span
              className="text-sm font-semibold truncate"
              style={{ color: "var(--text-primary)" }}
            >
              {sectionTitle ?? "Presentación"}
            </span>
          </div>
        </header>

        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 w-full overscroll-contain"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppShell;
