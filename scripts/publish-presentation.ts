/**
 * Publica una presentación local en Vercel Blob con código de acceso opcional.
 *
 * Uso:
 *   npm run publish -- transformacion-digital
 *   npm run publish -- transformacion-digital --code LABGRP
 *   npm run publish -- transformacion-digital --regenerate
 *
 * Lee variables desde .env.local (ver .env.example).
 */

import { promises as fs } from "fs";
import path from "path";
import { loadEnvFiles, requireEnv } from "./lib/load-env";

loadEnvFiles();

const CODE_PATTERN = /^[A-Z0-9]{6}$/;

async function main() {
  requireEnv("BLOB_READ_WRITE_TOKEN");
  requireEnv("SESSION_SECRET");

  const args = process.argv.slice(2);
  const slug = args.find((a) => !a.startsWith("--"));
  if (!slug) {
    console.error("Uso: npm run publish -- <slug> [--code XXXXXX] [--regenerate]");
    process.exit(1);
  }

  const codeFlag = args.indexOf("--code");
  const customCode =
    codeFlag !== -1 ? args[codeFlag + 1]?.toUpperCase() : process.env.TRANSFORMACION_DIGITAL_ACCESS_CODE;
  const regenerate = args.includes("--regenerate");

  if (customCode && !CODE_PATTERN.test(customCode)) {
    console.error("El código debe tener 6 caracteres (A-Z, 2-9, sin 0/O/1/I).");
    process.exit(1);
  }

  const filePath = path.join(process.cwd(), "config", "presentations", `${slug}.json`);
  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf-8");
  } catch {
    console.error(`No se encontró config/presentations/${slug}.json`);
    process.exit(1);
  }

  const { parsePresentationJson } = await import("../src/lib/presentation-schema");
  const { savePresentation } = await import("../src/lib/presentation-store");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error("JSON inválido.");
    process.exit(1);
  }

  const result = parsePresentationJson(parsed);
  if (!result.success) {
    console.error("Errores de validación:");
    result.errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  const saved = await savePresentation(result.data, {
    accessCode: customCode,
    regenerateCode: regenerate && !customCode,
  });

  console.log(`✓ Publicado: ${saved.slug}`);
  console.log(`  URL: /p/${saved.slug}`);
  if (saved.accessCode) {
    console.log(`  Código de acceso: ${saved.accessCode}`);
  } else if (customCode) {
    console.log(`  Código de acceso: ${customCode} (actualizado)`);
  } else {
    console.log("  Código de acceso: sin cambios (el anterior sigue vigente)");
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
