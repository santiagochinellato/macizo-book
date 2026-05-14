import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadPresentation, listPresentations } from "@/lib/config-loader";
import { PresentationApp } from "@/components/app/PresentationApp";
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

  return <PresentationApp config={config} />;
}
