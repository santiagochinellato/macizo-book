"use client";

import { useState, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { Sidebar } from "@/components/layout/Sidebar";
import { OverviewScreen } from "@/components/screens/OverviewScreen";
import { RoadmapScreen } from "@/components/screens/RoadmapScreen";
import { ProductScreen } from "@/components/screens/ProductScreen";
import { PricingScreen } from "@/components/screens/PricingScreen";
import { MockupsScreen } from "@/components/screens/MockupsScreen";
import { BookSectionScreen } from "@/components/screens/BookSectionScreen";
import { DesignSystemScreen } from "@/components/screens/DesignSystemScreen";
import { ClosingScreen } from "@/components/screens/ClosingScreen";
import type {
  PresentationConfig,
  Screen,
  OverviewScreen as OverviewScreenType,
  RoadmapScreen as RoadmapScreenType,
  ProductScreen as ProductScreenType,
  PricingScreen as PricingScreenType,
  MockupsScreen as MockupsScreenType,
  BookSectionScreen as BookSectionScreenType,
  DesignSystemScreen as DesignSystemScreenType,
} from "@/types/presentation";

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

interface PresentationAppProps {
  config: PresentationConfig;
}

function renderScreen(screen: Screen, config: PresentationConfig) {
  switch (screen.type) {
    case "overview":
      return (
        <OverviewScreen
          key={screen.id}
          data={(screen as OverviewScreenType).data}
          meta={config.meta}
          client={config.client}
          agency={config.agency}
        />
      );
    case "roadmap":
      return (
        <RoadmapScreen
          key={screen.id}
          data={(screen as RoadmapScreenType).data}
        />
      );
    case "product":
      return (
        <ProductScreen
          key={screen.id}
          data={(screen as ProductScreenType).data}
        />
      );
    case "pricing":
      return (
        <PricingScreen
          key={screen.id}
          data={(screen as PricingScreenType).data}
          meta={config.meta}
        />
      );
    case "mockups":
      return (
        <MockupsScreen
          key={screen.id}
          data={(screen as MockupsScreenType).data}
        />
      );
    case "book-section":
      return (
        <BookSectionScreen
          key={screen.id}
          data={(screen as BookSectionScreenType).data}
        />
      );
    case "design-system":
      return (
        <DesignSystemScreen
          key={screen.id}
          data={(screen as DesignSystemScreenType).data}
        />
      );
    case "closing":
      return (
        <ClosingScreen
          key={screen.id}
          config={config}
        />
      );
    default: {
      const _exhaustive: never = screen;
      return null;
    }
  }
}

export function PresentationApp({ config }: PresentationAppProps) {
  const enabledScreens = config.screens.filter(
    (s) => (s as Screen & { enabled?: boolean }).enabled !== false
  );
  const [activeId, setActiveId] = useState(enabledScreens[0]?.id ?? "");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleToggle = useCallback(() => setIsCollapsed((v) => !v), []);
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);
  const openMobileNav = useCallback(() => setMobileNavOpen(true), []);

  const activeScreen = enabledScreens.find((s) => s.id === activeId);

  const sectionTitle = useMemo(() => {
    if (!activeScreen) return "Presentación";
    return activeScreen.label ?? SCREEN_DEFAULT_LABELS[activeScreen.type];
  }, [activeScreen]);

  return (
    <AppShell
      sectionTitle={sectionTitle}
      activeSectionId={activeId}
      mobileNavOpen={mobileNavOpen}
      onMobileNavOpen={openMobileNav}
      onMobileNavClose={closeMobileNav}
      sidebar={
        <Sidebar
          screens={enabledScreens}
          activeId={activeId}
          onSelect={handleSelect}
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggle}
          agency={config.agency}
          client={config.client}
          meta={config.meta}
          onCloseMobile={closeMobileNav}
        />
      }
    >
      <AnimatePresence mode="wait">
        {activeScreen ? (
          <div key={activeId} className="h-full w-full min-w-0">
            {renderScreen(activeScreen, config)}
          </div>
        ) : null}
      </AnimatePresence>
    </AppShell>
  );
}

export default PresentationApp;
