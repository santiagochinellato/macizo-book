import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin — MacizoDigital",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ from?: string }>;
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const { from } = await searchParams;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: "var(--surface-bg)" }}
    >
      <div
        className="w-full max-w-sm p-8 rounded-[var(--radius-xl)]"
        style={{
          background: "var(--surface-card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <h1 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
          Panel de administración
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          MacizoDigital — Presentaciones
        </p>
        <AdminLoginForm redirectTo={from} />
      </div>
    </div>
  );
}
