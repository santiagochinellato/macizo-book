import { notFound } from "next/navigation";
import { loadPresentation } from "@/lib/config-loader";
import { getRegistryEntry } from "@/lib/presentation-store";
import { hasPresentationAccess } from "@/lib/session";
import { PresentationApp } from "@/components/app/PresentationApp";
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

  const registryEntry = await getRegistryEntry(slug);
  const needsAccess = registryEntry !== null;
  const hasAccess = needsAccess ? await hasPresentationAccess(slug) : true;

  if (needsAccess && !hasAccess) {
    return (
      <AccessGate
        slug={slug}
        clientName={config.client.name}
        agencyName={config.agency.name}
      />
    );
  }

  return <PresentationApp config={config} />;
}

export default PresentationWithAccess;
