"use server";

import { headers } from "next/headers";
import {
  getPresentation,
  getRegistryEntry,
  savePresentation,
  verifyPresentationAccess,
} from "@/lib/presentation-store";
import { parsePresentationJson } from "@/lib/presentation-schema";
import {
  createPresentationAccess,
  hasPresentationAccess,
  isAdminAuthenticated,
} from "@/lib/session";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

export async function checkPresentationAccess(slug: string): Promise<boolean> {
  const entry = await getRegistryEntry(slug);
  if (!entry) {
    return true;
  }
  return hasPresentationAccess(slug);
}

export async function verifyPresentationCode(
  slug: string,
  code: string
): Promise<{ success: boolean; error?: string }> {
  const entry = await getRegistryEntry(slug);
  if (!entry) {
    const config = await getPresentation(slug);
    if (!config) {
      return { success: false, error: "Presentación no encontrada" };
    }
    return { success: true };
  }

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";
  const rateKey = `access:${slug}:${ip}`;
  const rate = checkRateLimit(rateKey);

  if (!rate.allowed) {
    const minutes = Math.ceil((rate.retryAfterMs ?? 0) / 60000);
    return {
      success: false,
      error: `Demasiados intentos. Probá de nuevo en ${minutes} minuto(s).`,
    };
  }

  const valid = await verifyPresentationAccess(slug, code);
  if (!valid) {
    return { success: false, error: "Código incorrecto" };
  }

  resetRateLimit(rateKey);
  await createPresentationAccess(slug);
  return { success: true };
}

export async function publishPresentation(
  rawJson: string
): Promise<
  | { success: true; slug: string; accessCode?: string; isUpdate: boolean; url: string }
  | { success: false; errors: string[] }
> {
  if (!(await isAdminAuthenticated())) {
    return { success: false, errors: ["No autorizado"] };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return { success: false, errors: ["JSON inválido. Revisá comas y comillas."] };
  }

  const result = parsePresentationJson(parsed);
  if (!result.success) {
    return { success: false, errors: result.errors };
  }

  try {
    const saved = await savePresentation(result.data);
    const headersList = await headers();
    const host = headersList.get("host") ?? "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const url = `${protocol}://${host}/p/${saved.slug}`;

    return {
      success: true,
      slug: saved.slug,
      accessCode: saved.accessCode,
      isUpdate: saved.isUpdate,
      url,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al guardar";
    return { success: false, errors: [message] };
  }
}
