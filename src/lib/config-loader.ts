import type { PresentationConfig, PresentationListItem } from "@/types/presentation";
import { getPresentation, listAllSlugs, listPresentationsForAdmin } from "@/lib/presentation-store";

export async function loadPresentation(slug: string): Promise<PresentationConfig> {
  const config = await getPresentation(slug);
  if (!config) {
    throw new Error(`Presentación no encontrada: ${slug}`);
  }
  return config;
}

export async function listPresentations(): Promise<PresentationListItem[]> {
  const entries = await listPresentationsForAdmin();
  const items: PresentationListItem[] = [];

  for (const entry of entries) {
    const config = await getPresentation(entry.slug);
    if (config) {
      items.push({
        slug: config.slug,
        client: config.client,
        meta: config.meta,
        agency: config.agency,
      });
    }
  }

  return items;
}

export async function listPresentationSlugs(): Promise<string[]> {
  return listAllSlugs();
}
