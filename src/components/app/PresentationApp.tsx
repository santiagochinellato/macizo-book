"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { Sidebar } from "@/components/layout/Sidebar";
import { OverviewScreen } from "@/components/screens/OverviewScreen";
import { RoadmapScreen } from "@/components/screens/RoadmapScreen";
import { ProductScreen } from "@/components/screens/ProductScreen";
import { PricingScreen } from "@/components/screens/PricingScreen";
import { MockupsScreen } from "@/components/screens/MockupsScreen";
import { BookSectionScreen } from "@/components/screens/BookSectionScreen";
import type {
  PresentationConfig,
  Screen,
  OverviewScreen as OverviewScreenType,
  RoadmapScreen as RoadmapScreenType,
  ProductScreen as ProductScreenType,
  PricingScreen as PricingScreenType,
  MockupsScreen as MockupsScreenType,
  BookSectionScreen as BookSectionScreenType,
} from "@/types/presentation";

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
    default: {
      const _exhaustive: never = screen;
      return null;
    }
  }
}

export function PresentationApp({ config }: PresentationAppProps) {
  const enabledScreens = config.screens.filter((s) => s.enabled);
  const [activeId, setActiveId] = useState(enabledScreens[0]?.id ?? "");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSelect = useCallback((id: string) => setActiveId(id), []);
  const handleToggle = useCallback(() => setIsCollapsed((v) => !v), []);

  const activeScreen = enabledScreens.find((s) => s.id === activeId);

  return (
    <AppShell
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
        />
      }
    >
      <AnimatePresence mode="wait">
        {activeScreen ? renderScreen(activeScreen, config) : null}
      </AnimatePresence>
    </AppShell>
  );
}

export default PresentationApp;
