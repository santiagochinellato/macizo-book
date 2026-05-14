"use client";

import { CoverSection } from "./CoverSection";
import { ClientSection } from "./ClientSection";
import { SummarySection } from "./SummarySection";
import { ScopeSection } from "./ScopeSection";
import { TimelineSection } from "./TimelineSection";
import { InvestmentSection } from "./InvestmentSection";
import { GallerySection } from "./GallerySection";
import { TestimonialsSection } from "./TestimonialsSection";
import { CTASection } from "./CTASection";
import type {
  PresentationConfig,
  Section,
  SummaryData,
  ScopeData,
  TimelineData,
  InvestmentData,
  GalleryData,
  TestimonialsData,
  CTAData,
} from "@/types/presentation";

interface SectionsRendererProps {
  config: PresentationConfig;
}

function renderSection(section: Section, config: PresentationConfig) {
  const { agency, client, meta } = config;

  switch (section.type) {
    case "cover":
      return (
        <CoverSection
          key={section.id}
          agency={agency}
          client={client}
          meta={meta}
        />
      );
    case "client":
      return (
        <ClientSection
          key={section.id}
          client={client}
          meta={meta}
        />
      );
    case "summary":
      return (
        <SummarySection
          key={section.id}
          data={section.data as SummaryData}
          label={section.label}
        />
      );
    case "scope":
      return (
        <ScopeSection
          key={section.id}
          data={section.data as ScopeData}
          label={section.label}
        />
      );
    case "timeline":
      return (
        <TimelineSection
          key={section.id}
          data={section.data as TimelineData}
          label={section.label}
        />
      );
    case "investment":
      return (
        <InvestmentSection
          key={section.id}
          data={section.data as InvestmentData}
          meta={meta}
          label={section.label}
        />
      );
    case "gallery":
      return (
        <GallerySection
          key={section.id}
          data={section.data as GalleryData}
          label={section.label}
        />
      );
    case "testimonials":
      return (
        <TestimonialsSection
          key={section.id}
          data={section.data as TestimonialsData}
          label={section.label}
        />
      );
    case "cta":
      return (
        <CTASection
          key={section.id}
          data={section.data as CTAData}
          agency={agency}
          label={section.label}
        />
      );
    default: {
      const _exhaustive: never = section.type;
      return null;
    }
  }
}

export function SectionsRenderer({ config }: SectionsRendererProps) {
  const enabledSections = config.sections.filter((s) => s.enabled);
  return (
    <>
      {enabledSections.map((section) => renderSection(section, config))}
    </>
  );
}

export default SectionsRenderer;
