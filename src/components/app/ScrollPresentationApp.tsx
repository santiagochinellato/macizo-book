"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  PresentationConfig,
  Screen,
  HeroScreen,
  NecesidadesScreen,
  MetodologiaScreen,
  ProductosScrollScreen,
  MetricasScreen,
  InversionCierreScreen,
} from "@/types/presentation";
import { AppShell } from "@/components/layout/AppShell";
import { Sidebar } from "@/components/layout/Sidebar";
import { PresentationTheme } from "@/components/app/PresentationTheme";
import { HeroSection } from "@/components/sections/labac-co/HeroSection";
import { NecesidadesSection } from "@/components/sections/labac-co/NecesidadesSection";
import { MetodologiaSection } from "@/components/sections/labac-co/MetodologiaSection";
import { ProductosSection } from "@/components/sections/labac-co/ProductosSection";
import { MetricasSection } from "@/components/sections/labac-co/MetricasSection";
import { InversionCierreSection } from "@/components/sections/labac-co/InversionCierreSection";

interface ScrollPresentationAppProps {
  config: PresentationConfig;
}

function renderScrollSection(screen: Screen, config: PresentationConfig) {
  switch (screen.type) {
    case "hero":
      return <HeroSection id={screen.id} data={(screen as HeroScreen).data} />;
    case "necesidades":
      return <NecesidadesSection id={screen.id} data={(screen as NecesidadesScreen).data} />;
    case "metodologia":
      return <MetodologiaSection id={screen.id} data={(screen as MetodologiaScreen).data} />;
    case "productos":
      return <ProductosSection id={screen.id} data={(screen as ProductosScrollScreen).data} />;
    case "metricas":
      return <MetricasSection id={screen.id} data={(screen as MetricasScreen).data} />;
    case "inversion-cierre":
      return (
        <InversionCierreSection
          id={screen.id}
          data={(screen as InversionCierreScreen).data}
          agency={config.agency}
        />
      );
    default:
      return null;
  }
}

export function ScrollPresentationApp({ config }: ScrollPresentationAppProps) {
  const enabledScreens = config.screens.filter(
    (s) => (s as Screen & { enabled?: boolean }).enabled !== false
  );
  const [activeId, setActiveId] = useState(enabledScreens[0]?.id ?? "");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  const handleScrollToSection = useCallback((id: string) => {
    const root = mainRef.current;
    const target = root?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }, []);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;

    const sections = enabledScreens
      .map((s) => root.querySelector<HTMLElement>(`#${CSS.escape(s.id)}`))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { root, rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabledScreens]);

  const sectionTitle = useMemo(() => {
    const active = enabledScreens.find((s) => s.id === activeId);
    return active?.label ?? "Propuesta";
  }, [activeId, enabledScreens]);

  return (
    <PresentationTheme theme={config.theme} className="h-full w-full">
      <AppShell
        scrollMode
        mainRef={mainRef}
        sectionTitle={sectionTitle}
        activeSectionId={activeId}
        mobileNavOpen={mobileNavOpen}
        onMobileNavOpen={() => setMobileNavOpen(true)}
        onMobileNavClose={() => setMobileNavOpen(false)}
        sidebar={
          <Sidebar
            screens={enabledScreens}
            activeId={activeId}
            onSelect={handleScrollToSection}
            scrollMode
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed((v) => !v)}
            agency={config.agency}
            client={config.client}
            meta={config.meta}
            onCloseMobile={() => setMobileNavOpen(false)}
          />
        }
      >
        <article className="w-full min-w-0">
          {enabledScreens.map((screen) => (
            <div key={screen.id}>{renderScrollSection(screen, config)}</div>
          ))}
        </article>
      </AppShell>
    </PresentationTheme>
  );
}

export default ScrollPresentationApp;
