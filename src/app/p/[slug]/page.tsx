import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadPresentation } from "@/lib/config-loader";
import { PresentationWithAccess } from "@/components/app/PresentationWithAccess";
import { DOC_TYPE_LABELS } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const config = await loadPresentation(slug);
    const typeLabel = DOC_TYPE_LABELS[config.meta.type];
    return {
      title: `${typeLabel}: ${config.meta.title} — ${config.client.name} | ${config.agency.name}`,
      description: config.meta.subtitle ?? `${typeLabel} para ${config.client.name}`,
      robots: { index: false, follow: false },
      openGraph: {
        title: `${config.meta.title} — ${config.client.name}`,
        description: config.meta.subtitle ?? `${typeLabel} presentado por ${config.agency.name}`,
        siteName: config.agency.name,
      },
    };
  } catch {
    return { title: "Presentación no encontrada", robots: { index: false, follow: false } };
  }
}

export default async function PresentationPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    await loadPresentation(slug);
  } catch {
    notFound();
  }

  return <PresentationWithAccess slug={slug} />;
}
