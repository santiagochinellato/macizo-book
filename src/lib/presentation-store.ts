import { head, list, put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import type { PresentationConfig } from "@/types/presentation";
import { generateAccessCode, hashAccessCode, verifyAccessCode } from "@/lib/access-code";

const REGISTRY_PATH = "presentations/_registry.json";
const PRESENTATION_PREFIX = "presentations/";

export interface PresentationRegistryEntry {
  slug: string;
  clientName: string;
  title: string;
  docType: string;
  createdAt: string;
  updatedAt: string;
  accessCodeHash: string;
}

export interface PresentationRegistry {
  presentations: PresentationRegistryEntry[];
}

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function presentationBlobPath(slug: string): string {
  return `${PRESENTATION_PREFIX}${slug}.json`;
}

async function loadLocalPresentation(slug: string): Promise<PresentationConfig | null> {
  try {
    const filePath = path.join(process.cwd(), "config", "presentations", `${slug}.json`);
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as PresentationConfig;
  } catch {
    return null;
  }
}

async function readRegistry(): Promise<PresentationRegistry> {
  if (!useBlob()) {
    return { presentations: [] };
  }

  try {
    const blobHead = await head(REGISTRY_PATH);
    const res = await fetch(blobHead.url);
    if (!res.ok) return { presentations: [] };
    return (await res.json()) as PresentationRegistry;
  } catch {
    return { presentations: [] };
  }
}

async function writeRegistry(registry: PresentationRegistry): Promise<void> {
  await put(REGISTRY_PATH, JSON.stringify(registry, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function getPresentation(slug: string): Promise<PresentationConfig | null> {
  if (useBlob()) {
    try {
      const blobHead = await head(presentationBlobPath(slug));
      const res = await fetch(blobHead.url);
      if (!res.ok) return null;
      return (await res.json()) as PresentationConfig;
    } catch {
      // fallback to local in dev
    }
  }

  return loadLocalPresentation(slug);
}

export async function presentationExists(slug: string): Promise<boolean> {
  const registry = await readRegistry();
  if (registry.presentations.some((p) => p.slug === slug)) {
    return true;
  }

  if (useBlob()) {
    try {
      await head(presentationBlobPath(slug));
      return true;
    } catch {
      // continue
    }
  }

  const local = await loadLocalPresentation(slug);
  return local !== null;
}

export async function listPresentationsForAdmin(): Promise<PresentationRegistryEntry[]> {
  const registry = await readRegistry();
  return registry.presentations.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export interface SavePresentationResult {
  slug: string;
  accessCode?: string;
  isUpdate: boolean;
}

export async function savePresentation(
  config: PresentationConfig,
  options?: { accessCode?: string; regenerateCode?: boolean }
): Promise<SavePresentationResult> {
  if (!useBlob()) {
    throw new Error("BLOB_READ_WRITE_TOKEN no configurado. No se puede guardar en producción.");
  }

  const registry = await readRegistry();
  const existing = registry.presentations.find((p) => p.slug === config.slug);
  const isUpdate = Boolean(existing);

  let accessCode: string | undefined;
  let accessCodeHash: string;

  if (options?.accessCode) {
    accessCode = options.accessCode;
    accessCodeHash = await hashAccessCode(accessCode);
  } else if (existing && !options?.regenerateCode) {
    accessCodeHash = existing.accessCodeHash;
  } else {
    accessCode = generateAccessCode();
    accessCodeHash = await hashAccessCode(accessCode);
  }

  await put(presentationBlobPath(config.slug), JSON.stringify(config, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });

  const now = new Date().toISOString();
  const entry: PresentationRegistryEntry = {
    slug: config.slug,
    clientName: config.client.name,
    title: config.meta.title,
    docType: config.meta.type,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    accessCodeHash,
  };

  const others = registry.presentations.filter((p) => p.slug !== config.slug);
  await writeRegistry({ presentations: [...others, entry] });

  return { slug: config.slug, accessCode, isUpdate };
}

export async function verifyPresentationAccess(slug: string, code: string): Promise<boolean> {
  const registry = await readRegistry();
  const entry = registry.presentations.find((p) => p.slug === slug);
  if (!entry) {
    return false;
  }
  return verifyAccessCode(code, entry.accessCodeHash);
}

export async function getRegistryEntry(slug: string): Promise<PresentationRegistryEntry | null> {
  const registry = await readRegistry();
  return registry.presentations.find((p) => p.slug === slug) ?? null;
}

/** Lista slugs desde Blob registry + blobs sueltos (para generateStaticParams legacy) */
export async function listAllSlugs(): Promise<string[]> {
  const slugs = new Set<string>();

  const registry = await readRegistry();
  for (const p of registry.presentations) {
    slugs.add(p.slug);
  }

  if (useBlob()) {
    try {
      const { blobs } = await list({ prefix: PRESENTATION_PREFIX });
      for (const blob of blobs) {
        const match = blob.pathname.match(/^presentations\/(.+)\.json$/);
        if (match?.[1] && match[1] !== "_registry") {
          slugs.add(match[1]);
        }
      }
    } catch {
      // ignore
    }
  }

  try {
    const dir = path.join(process.cwd(), "config", "presentations");
    const files = await fs.readdir(dir);
    for (const f of files) {
      if (f.endsWith(".json")) {
        slugs.add(f.replace(".json", ""));
      }
    }
  } catch {
    // ignore
  }

  return Array.from(slugs);
}
