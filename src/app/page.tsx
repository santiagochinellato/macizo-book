import Link from "next/link";
import { listPresentations } from "@/lib/config-loader";
import { formatDate, DOC_TYPE_LABELS, STATUS_LABELS, STATUS_COLORS } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MacizoDigital — Presentaciones",
  description: "Sistema de presentaciones digitales para presupuestos y propuestas.",
};

export default async function IndexPage() {
  let presentations: Awaited<ReturnType<typeof listPresentations>> = [];

  try {
    presentations = await listPresentations();
  } catch {
    presentations = [];
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#f5f7fa",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <header
        className="border-b px-5 sm:px-10 py-5 flex items-center justify-between"
        style={{
          background: "#fff",
          borderColor: "#dde3ed",
        }}
      >
        <div className="flex flex-col gap-0.5">
          <span
            className="text-xl font-bold"
            style={{ color: "#1b3a6b", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            MacizoDigital
          </span>
          <span className="text-xs" style={{ color: "#6b7a99" }}>
            Sistema de Presentaciones
          </span>
        </div>
        <a
          href="https://macizodigital.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs hover:underline"
          style={{ color: "#6b7a99" }}
        >
          macizodigital.ar
        </a>
      </header>

      <main className="px-5 sm:px-10 py-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span
            className="block"
            style={{ width: 20, height: 2, background: "#c9a96e", flexShrink: 0 }}
          />
          <span
            className="text-xs font-bold uppercase"
            style={{ letterSpacing: "0.14em", color: "#c9a96e" }}
          >
            Presentaciones disponibles
          </span>
        </div>

        {presentations.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 rounded-2xl text-center"
            style={{ background: "#fff", border: "1px solid #dde3ed" }}
          >
            <p className="text-base font-medium" style={{ color: "#0d1f3c" }}>
              No hay presentaciones aún
            </p>
            <p className="text-sm mt-1" style={{ color: "#6b7a99" }}>
              Agregá un archivo JSON en{" "}
              <code
                className="px-1.5 py-0.5 rounded text-xs"
                style={{ background: "#f5f7fa", color: "#1b3a6b" }}
              >
                config/presentations/
              </code>
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            {presentations.map((p) => {
              const statusColor = STATUS_COLORS[p.meta.status];
              const statusLabel = STATUS_LABELS[p.meta.status];
              const typeLabel = DOC_TYPE_LABELS[p.meta.type];

              return (
                <li key={p.slug}>
                  <Link
                    href={`/p/${p.slug}`}
                    className="group flex flex-col gap-4 p-5 rounded-2xl transition-all hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{
                      background: "#fff",
                      border: "1px solid #dde3ed",
                      boxShadow: "0 2px 8px rgba(13,31,60,0.04)",
                      transitionDuration: "200ms",
                      transitionTimingFunction: "ease-out",
                    }}
                  >
                    {/* Client */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-0.5">
                        <span
                          className="text-xs font-medium uppercase tracking-wider"
                          style={{ color: "#c9a96e" }}
                        >
                          {p.client.industry ?? typeLabel}
                        </span>
                        <span
                          className="text-base font-semibold leading-snug"
                          style={{ color: "#0d1f3c", fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {p.client.name}
                        </span>
                      </div>
                      <span
                        className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold flex-shrink-0"
                        style={{
                          background: `${statusColor}20`,
                          color: statusColor,
                        }}
                      >
                        {statusLabel}
                      </span>
                    </div>

                    {/* Project */}
                    <div
                      className="flex flex-col gap-1 pt-3"
                      style={{ borderTop: "1px solid #dde3ed" }}
                    >
                      <span className="text-sm font-medium" style={{ color: "#0d1f3c" }}>
                        {p.meta.title}
                      </span>
                      {p.meta.subtitle && (
                        <span className="text-xs" style={{ color: "#6b7a99" }}>
                          {p.meta.subtitle}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs" style={{ color: "#6b7a99" }}>
                      <span>
                        {typeLabel} #{p.meta.number}
                      </span>
                      <span>{formatDate(p.meta.date, p.meta.language)}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>

      <footer
        className="mt-auto border-t px-5 sm:px-10 py-5 text-center text-xs"
        style={{
          borderColor: "#dde3ed",
          color: "#6b7a99",
        }}
      >
        MacizoDigital © {new Date().getFullYear()} — Bariloche, Argentina
      </footer>
    </div>
  );
}
