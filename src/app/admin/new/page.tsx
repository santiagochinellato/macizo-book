import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { JsonDropZone } from "@/components/admin/JsonDropZone";

export const metadata: Metadata = {
  title: "Nuevo proyecto — Admin MacizoDigital",
  robots: { index: false, follow: false },
};

export default function AdminNewPage() {
  return (
    <AdminShell title="Nuevo proyecto">
      <p className="text-sm mb-6 -mt-2" style={{ color: "var(--text-muted)" }}>
        Pegá o arrastrá el JSON generado por Codex. La plantilla está en{" "}
        <code
          className="px-1 py-0.5 rounded text-xs font-mono"
          style={{ background: "var(--surface-panel)", color: "var(--primary)" }}
        >
          config/templates/presentation-template.json
        </code>
        . Ver también{" "}
        <span className="font-mono text-xs" style={{ color: "var(--primary)" }}>
          docs/GUIA-JSON-PARA-CODEX.md
        </span>
      </p>
      <JsonDropZone />
    </AdminShell>
  );
}
