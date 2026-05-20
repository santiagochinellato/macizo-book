import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { listPresentationsForAdmin } from "@/lib/presentation-store";
import { DOC_TYPE_LABELS } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Proyectos — Admin MacizoDigital",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const presentations = await listPresentationsForAdmin();

  return (
    <AdminShell title="Proyectos publicados">
      <div className="flex justify-end mb-6">
        <Link
          href="/admin/new"
          className="px-4 py-2 rounded-lg text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          style={{ background: "var(--primary)", color: "#fff" }}
        >
          + Nuevo proyecto
        </Link>
      </div>

      {presentations.length === 0 ? (
        <div
          className="rounded-[var(--radius-lg)] p-10 text-center"
          style={{
            background: "var(--surface-card)",
            border: "1px solid var(--border)",
          }}
        >
          <p className="text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>
            No hay proyectos publicados
          </p>
          <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
            Subí tu primer JSON desde la plantilla en config/templates/
          </p>
          <Link
            href="/admin/new"
            className="text-sm font-semibold hover:underline"
            style={{ color: "var(--primary)" }}
          >
            Crear proyecto →
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-3" role="list">
          {presentations.map((p) => (
            <li
              key={p.slug}
              className="flex items-center justify-between gap-4 p-4 rounded-[var(--radius-lg)]"
              style={{
                background: "var(--surface-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                  {p.clientName}
                </span>
                <span className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                  {p.title}
                </span>
                <span className="text-[10px] font-mono" style={{ color: "var(--text-subtle)" }}>
                  {DOC_TYPE_LABELS[p.docType as keyof typeof DOC_TYPE_LABELS] ?? p.docType} · /p/{p.slug}
                </span>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className="text-[10px]" style={{ color: "var(--text-subtle)" }}>
                  {formatDate(p.updatedAt.slice(0, 10), "es")}
                </span>
                <Link
                  href={`/p/${p.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold hover:underline"
                  style={{ color: "var(--primary)" }}
                >
                  Ver →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
