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
      style={{ background: "var(--surface-bg)" }}
    >
      <style>{`
        .presentation-card:hover {
          box-shadow: var(--shadow-card-hover);
          border-color: color-mix(in srgb, var(--primary) 15%, var(--border));
        }
      `}</style>
      {/* Header */}
      <header
        className="px-6 sm:px-10 py-5 flex items-center justify-between"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--surface-panel)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ background: "var(--primary)", color: "#fff" }}
          >
            M
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              MacizoDigital
            </span>
            <span
              className="text-[10px]"
              style={{ color: "var(--text-subtle)" }}
            >
              Sistema de Presentaciones
            </span>
          </div>
        </div>
        <a
          href="https://macizodigital.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs hover:underline"
          style={{ color: "var(--text-subtle)" }}
        >
          macizodigital.ar
        </a>
      </header>

      <main className="px-6 sm:px-10 py-10 max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <span
            className="block flex-shrink-0"
            style={{ width: 16, height: 2, background: "var(--primary)", borderRadius: 99 }}
            aria-hidden="true"
          />
          <span
            className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--primary)" }}
          >
            Presentaciones
          </span>
        </div>

        {presentations.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 rounded-[var(--radius-xl)] text-center"
            style={{
              background: "var(--surface-card)",
              border: "1px solid var(--border)",
            }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              No hay presentaciones aún
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>
              Agregá un archivo JSON en{" "}
              <code
                className="px-1.5 py-0.5 rounded font-mono text-[10px]"
                style={{ background: "var(--surface-panel)", color: "var(--primary)" }}
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
                    className="presentation-card group flex flex-col gap-4 p-5 rounded-[var(--radius-lg)] transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-bg)]"
                    style={{
                      background: "var(--surface-card)",
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-card)",
                      transitionDuration: "200ms",
                      transitionTimingFunction: "ease-out",
                    }}
                  >
                    {/* Client */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-0.5">
                        <span
                          className="text-[10px] font-semibold uppercase tracking-wider"
                          style={{ color: "var(--primary)" }}
                        >
                          {p.client.industry ?? typeLabel}
                        </span>
                        <span
                          className="text-base font-semibold leading-snug"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {p.client.name}
                        </span>
                      </div>
                      <span
                        className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold flex-shrink-0"
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
                      style={{ borderTop: "1px solid var(--border)" }}
                    >
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {p.meta.title}
                      </span>
                      {p.meta.subtitle && (
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {p.meta.subtitle}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div
                      className="flex items-center justify-between text-[10px]"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      <span className="font-mono">
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
        className="mt-auto border-t px-6 sm:px-10 py-5 text-center text-[10px]"
        style={{
          borderColor: "var(--border)",
          color: "var(--text-subtle)",
        }}
      >
        MacizoDigital © {new Date().getFullYear()} — Bariloche, Argentina
      </footer>
    </div>
  );
}
