"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  Layers,
  CreditCard,
  Image as ImageIcon,
  BookOpen,
  Palette,
  Handshake,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
} from "lucide-react";
import type { Screen, AgencyConfig, ClientConfig, DocumentMeta } from "@/types/presentation";
import { DOC_TYPE_LABELS, STATUS_LABELS, STATUS_COLORS } from "@/lib/utils";
import { useIsDesktopNav } from "@/hooks/useMediaQuery";

const SCREEN_ICONS: Record<Screen["type"], React.ReactNode> = {
  overview: <LayoutDashboard size={17} />,
  roadmap: <Map size={17} />,
  product: <Layers size={17} />,
  pricing: <CreditCard size={17} />,
  mockups: <ImageIcon size={17} />,
  "book-section": <BookOpen size={17} />,
  "design-system": <Palette size={17} />,
  closing: <Handshake size={17} />,
};

const SCREEN_DEFAULT_LABELS: Record<Screen["type"], string> = {
  overview: "Resumen",
  roadmap: "Roadmap",
  product: "Producto",
  pricing: "Inversión",
  mockups: "Mockups",
  "book-section": "Sección",
  "design-system": "Diseño",
  closing: "Cierre",
};

interface SidebarProps {
  screens: Screen[];
  activeId: string;
  onSelect: (id: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  agency: AgencyConfig;
  client: ClientConfig;
  meta: DocumentMeta;
  onCloseMobile?: () => void;
}

export function Sidebar({
  screens,
  activeId,
  onSelect,
  isCollapsed,
  onToggleCollapse,
  agency,
  client,
  meta,
  onCloseMobile,
}: SidebarProps) {
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktopNav();
  const statusColor = STATUS_COLORS[meta.status];
  const statusLabel = STATUS_LABELS[meta.status];
  const typeLabel = DOC_TYPE_LABELS[meta.type];
  const showLabels = isDesktop ? !isCollapsed : true;

  const handleSelect = (id: string) => {
    onSelect(id);
    onCloseMobile?.();
  };

  return (
    <motion.aside
      animate={isDesktop ? { width: isCollapsed ? 64 : 240 } : { width: "100%" }}
      transition={reduced ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col h-full w-full overflow-hidden relative z-20"
      style={{
        background: "var(--surface-panel)",
        borderRight: isDesktop ? "1px solid var(--border)" : "none",
        boxShadow: isDesktop ? "2px 0 8px rgba(0,0,0,0.04)" : "none",
      }}
      aria-label="Navegación de secciones"
    >
      {/* Header: agency */}
      <div
        className="flex items-center gap-3 px-4 py-4 flex-shrink-0 overflow-hidden"
        style={{ borderBottom: "1px solid var(--border)", minHeight: 64 }}
      >
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
          style={{ background: "var(--primary)", color: "#fff" }}
        >
          <Layers size={15} />
        </div>
        {showLabels && (
          <div className="flex flex-col gap-0 min-w-0 flex-1">
            <span
              className="text-sm font-semibold truncate"
              style={{ color: "var(--text-primary)" }}
            >
              {agency.name}
            </span>
            <span className="text-xs truncate" style={{ color: "var(--text-subtle)" }}>
              {typeLabel} #{meta.number}
            </span>
          </div>
        )}
        {!isDesktop && onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            style={{ color: "var(--text-muted)" }}
            aria-label="Cerrar menú"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Client info */}
      {showLabels && (
        <div
          className="px-4 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-xs font-medium truncate" style={{ color: "var(--text-muted)" }}>
                {client.name}
              </span>
              <span className="text-[10px] truncate" style={{ color: "var(--text-subtle)" }}>
                {client.industry}
              </span>
            </div>
            <span
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: `${statusColor}20`,
                color: statusColor,
              }}
            >
              {statusLabel}
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 flex flex-col py-3 overflow-y-auto overflow-x-hidden relative min-h-0">
        {showLabels && (
          <div
            className="absolute left-[27px] top-5 bottom-5 w-px hidden sm:block"
            style={{ background: "var(--border)" }}
            aria-hidden="true"
          />
        )}

        <ul className="flex flex-col gap-0.5 px-2" role="list">
          {screens.map((screen) => {
            const isActive = screen.id === activeId;
            const label = screen.label ?? SCREEN_DEFAULT_LABELS[screen.type];

            return (
              <li key={screen.id} className="relative">
                <button
                  type="button"
                  onClick={() => handleSelect(screen.id)}
                  className="w-full flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                  style={{
                    background: isActive
                      ? "color-mix(in srgb, var(--primary) 8%, transparent)"
                      : "transparent",
                    color: isActive ? "var(--primary)" : "var(--text-muted)",
                  }}
                  aria-current={isActive ? "page" : undefined}
                  title={!showLabels ? label : undefined}
                >
                  <div className="relative flex-shrink-0 flex items-center justify-center w-7 h-7">
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={
                        isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }
                      }
                      transition={{ duration: 0.2 }}
                      style={{ background: "var(--primary-glow)" }}
                    />
                    <span
                      className="relative z-10 flex items-center justify-center"
                      style={{
                        color: isActive ? "var(--primary)" : "var(--text-subtle)",
                      }}
                    >
                      {SCREEN_ICONS[screen.type]}
                    </span>
                  </div>

                  {showLabels && (
                    <span className="text-sm font-medium text-left truncate min-w-0 flex-1">
                      {label}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div
        className="flex-shrink-0 flex flex-col gap-2 px-3 py-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {showLabels && (
          <a
            href={agency.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs hover:underline overflow-hidden min-w-0"
            style={{ color: "var(--text-subtle)" }}
          >
            <ExternalLink size={11} className="flex-shrink-0" />
            <span className="truncate">{agency.website.replace("https://", "")}</span>
          </a>
        )}

        {isDesktop && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex items-center justify-center w-full h-8 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            style={{
              background: "var(--surface-bg)",
              color: "var(--text-subtle)",
            }}
            aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </div>
    </motion.aside>
  );
}

export default Sidebar;
