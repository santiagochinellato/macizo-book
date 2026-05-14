import { promises as fs } from "fs";
import path from "path";
import type { PresentationConfig, PresentationListItem } from "@/types/presentation";

export async function loadPresentation(slug: string): Promise<PresentationConfig> {
  const filePath = path.join(process.cwd(), "config", "presentations", `${slug}.json`);
  const raw = await fs.readFile(filePath, "utf-8");
  const config = JSON.parse(raw) as PresentationConfig;
  return config;
}

export async function listPresentations(): Promise<PresentationListItem[]> {
  const dir = path.join(process.cwd(), "config", "presentations");
  const files = await fs.readdir(dir);
  const configs = await Promise.all(
    files
      .filter((f) => f.endsWith(".json"))
      .map((f) => loadPresentation(f.replace(".json", "")))
  );
  return configs.map(({ slug, client, meta, agency }) => ({ slug, client, meta, agency }));
}
