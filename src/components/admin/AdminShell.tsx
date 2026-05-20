import Link from "next/link";
import { logoutAdmin } from "@/app/actions/admin";

interface AdminShellProps {
  children: React.ReactNode;
  title?: string;
}

export function AdminShell({ children, title }: AdminShellProps) {
  return (
    <div className="min-h-screen" style={{ background: "var(--surface-bg)" }}>
      <header
        className="px-6 sm:px-10 py-4 flex items-center justify-between"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--surface-panel)",
        }}
      >
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              M
            </div>
            <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              Admin
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-xs">
            <Link
              href="/admin"
              className="hover:underline"
              style={{ color: "var(--text-muted)" }}
            >
              Proyectos
            </Link>
            <Link
              href="/admin/new"
              className="hover:underline"
              style={{ color: "var(--primary)" }}
            >
              Nuevo proyecto
            </Link>
          </nav>
        </div>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="text-xs hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded px-2 py-1"
            style={{ color: "var(--text-subtle)" }}
          >
            Cerrar sesión
          </button>
        </form>
      </header>

      <main className="px-6 sm:px-10 py-8 max-w-4xl mx-auto w-full">
        {title && (
          <h1
            className="text-xl font-semibold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h1>
        )}
        {children}
      </main>
    </div>
  );
}

export default AdminShell;
