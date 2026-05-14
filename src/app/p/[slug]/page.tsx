import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadPresentation, listPresentations } from "@/lib/config-loader";
import { DocWrapper } from "@/components/layout/DocWrapper";
import { DocHeader } from "@/components/layout/DocHeader";
import { DocFooter } from "@/components/layout/DocFooter";
import { GradientBar } from "@/components/layout/GradientBar";
import { SectionNav } from "@/components/navigation/SectionNav";
import { SectionsRenderer } from "@/components/sections/SectionsRenderer";
import { DOC_TYPE_LABELS } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const presentations = await listPresentations();
    return presentations.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const config = await loadPresentation(slug);
    const typeLabel = DOC_TYPE_LABELS[config.meta.type];
    return {
      title: `${typeLabel}: ${config.meta.title} — ${config.client.name} | ${config.agency.name}`,
      description: config.meta.subtitle ?? `${typeLabel} para ${config.client.name}`,
      openGraph: {
        title: `${config.meta.title} — ${config.client.name}`,
        description: config.meta.subtitle ?? `${typeLabel} presentado por ${config.agency.name}`,
        siteName: config.agency.name,
      },
    };
  } catch {
    return { title: "Presentación no encontrada" };
  }
}

export default async function PresentationPage({ params }: PageProps) {
  const { slug } = await params;

  let config;
  try {
    config = await loadPresentation(slug);
  } catch {
    notFound();
  }

  return (
    <DocWrapper theme={config.theme}>
      <DocHeader agency={config.agency} meta={config.meta} />
      <GradientBar />
      <SectionNav sections={config.sections} />
      <main className="flex flex-col flex-1">
        <SectionsRenderer config={config} />
      </main>
      <GradientBar />
      <DocFooter agency={config.agency} meta={config.meta} />
    </DocWrapper>
  );
}
