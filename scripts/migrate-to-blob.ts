/**
 * Migra presentaciones locales (config/presentations/*.json) a Vercel Blob.
 *
 * Uso:
 *   BLOB_READ_WRITE_TOKEN=xxx SESSION_SECRET=xxx npx tsx scripts/migrate-to-blob.ts
 *
 * Requiere variables de entorno cargadas (.env.local o export manual).
 */

import { promises as fs } from "fs";
import path from "path";
import { loadEnvFiles } from "./lib/load-env";

loadEnvFiles();

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("Error: BLOB_READ_WRITE_TOKEN no está definido.");
    console.error("Copiá .env.example a .env.local y completá los valores.");
    process.exit(1);
  }

  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 16) {
    console.error("Error: SESSION_SECRET debe tener al menos 16 caracteres.");
    process.exit(1);
  }

  const { parsePresentationJson } = await import("../src/lib/presentation-schema");
  const { savePresentation } = await import("../src/lib/presentation-store");

  const dir = path.join(process.cwd(), "config", "presentations");
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".json"));

  if (files.length === 0) {
    console.log("No hay archivos JSON en config/presentations/");
    return;
  }

  console.log(`Migrando ${files.length} presentación(es) a Vercel Blob…\n`);

  for (const file of files) {
    const slug = file.replace(".json", "");
    const raw = await fs.readFile(path.join(dir, file), "utf-8");
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.error(`✗ ${slug}: JSON inválido`);
      continue;
    }

    const result = parsePresentationJson(parsed);
    if (!result.success) {
      console.error(`✗ ${slug}: errores de validación`);
      result.errors.forEach((e) => console.error(`  - ${e}`));
      continue;
    }

    try {
      const saved = await savePresentation(result.data);
      console.log(`✓ ${slug}`);
      console.log(`  URL: /p/${saved.slug}`);
      if (saved.accessCode) {
        console.log(`  Código: ${saved.accessCode}`);
      }
      console.log("");
    } catch (err) {
      console.error(`✗ ${slug}:`, err instanceof Error ? err.message : err);
    }
  }

  console.log("Migración finalizada. Guardá los códigos de acceso en un lugar seguro.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
