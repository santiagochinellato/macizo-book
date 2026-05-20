import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MacizoDigital — Presentaciones",
  description: "Accedé a tu propuesta digital con el enlace y código que recibiste.",
  robots: { index: false, follow: false },
};

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--surface-bg)" }}
    >
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
            <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              MacizoDigital
            </span>
            <span className="text-[10px]" style={{ color: "var(--text-subtle)" }}>
              Presentaciones digitales
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 sm:px-10 py-16">
        <div className="max-w-md text-center flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--primary)" }}
            >
              Acceso privado
            </span>
            <h1
              className="text-2xl font-semibold leading-snug"
              style={{ color: "var(--text-primary)" }}
            >
              Abrí el enlace que te enviamos
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Cada propuesta tiene su propia URL y un código de acceso. Si recibiste un enlace de
              MacizoDigital, abrilo directamente en tu navegador e ingresá el código cuando te lo
              solicite.
            </p>
          </div>

          <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
            ¿No tenés el enlace? Contactanos en{" "}
            <a
              href="mailto:hola@macizo.digital"
              className="underline hover:no-underline"
              style={{ color: "var(--primary)" }}
            >
              hola@macizo.digital
            </a>
          </p>
        </div>
      </main>

      <footer
        className="border-t px-6 sm:px-10 py-5 text-center text-[10px]"
        style={{ borderColor: "var(--border)", color: "var(--text-subtle)" }}
      >
        MacizoDigital © {new Date().getFullYear()} — Bariloche, Argentina
        <span className="mx-2">·</span>
        <Link href="/admin/login" className="hover:underline" style={{ color: "var(--text-subtle)" }}>
          Admin
        </Link>
      </footer>
    </div>
  );
}
