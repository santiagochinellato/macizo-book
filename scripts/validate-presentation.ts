import { readFileSync } from "node:fs";
import { parsePresentationJson } from "../src/lib/presentation-schema";

const path = process.argv[2];
if (!path) {
  console.error("Uso: tsx scripts/validate-presentation.ts <ruta.json>");
  process.exit(1);
}

const raw = JSON.parse(readFileSync(path, "utf-8"));
const result = parsePresentationJson(raw);

if (result.success) {
  console.log(`OK · ${path} válido · ${result.data.screens.length} pantallas`);
  process.exit(0);
} else {
  console.error(`ERRORES en ${path}:`);
  for (const e of result.errors) console.error(" -", e);
  process.exit(1);
}
