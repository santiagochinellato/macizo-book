import { notFound } from "next/navigation";
import { loadPresentation } from "@/lib/config-loader";
import { getRegistryEntry } from "@/lib/presentation-store";
import { hasPresentationAccess } from "@/lib/session";
import { PresentationApp } from "@/components/app/PresentationApp";
import { ScrollPresentationApp } from "@/components/app/ScrollPresentationApp";
import { AccessGate } from "@/components/access/AccessGate";

interface PresentationWithAccessProps {
  slug: string;
}

export async function PresentationWithAccess({ slug }: PresentationWithAccessProps) {
  let config;
  try {
    config = await loadPresentation(slug);
  } catch {
    notFound();
  }

  let registryEntry = null;
  try {
    registryEntry = await getRegistryEntry(slug);
  } catch {
    registryEntry = null;
  }

  const needsAccess = registryEntry !== null;
  let hasAccess = !needsAccess;
  if (needsAccess) {
    try {
      hasAccess = await hasPresentationAccess(slug);
    } catch {
      hasAccess = false;
    }
  }

  if (needsAccess && !hasAccess) {
    return (
      <AccessGate
        slug={slug}
        clientName={config.client.name}
        agencyName={config.agency.name}
      />
    );
  }

  if (config.layoutMode === "scroll-deck") {
    return <ScrollPresentationApp config={config} />;
  }

  return <PresentationApp config={config} />;
}

export default PresentationWithAccess;
