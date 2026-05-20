"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/app/actions/admin";

interface AdminLoginFormProps {
  redirectTo?: string;
}

export function AdminLoginForm({ redirectTo }: AdminLoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    startTransition(async () => {
      const result = await loginAdmin(username, password);
      if (result.success) {
        router.push(redirectTo ?? "/admin");
        router.refresh();
      } else {
        setError(result.error ?? "Error de autenticación");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="username" className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          Usuario
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className="px-4 py-2.5 rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          style={{
            background: "var(--surface-panel)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
          disabled={isPending}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="px-4 py-2.5 rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          style={{
            background: "var(--surface-panel)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
          disabled={isPending}
        />
      </div>
      {error && (
        <p className="text-sm" style={{ color: "var(--accent)" }} role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="py-3 rounded-lg text-sm font-semibold disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        style={{ background: "var(--primary)", color: "#fff" }}
      >
        {isPending ? "Ingresando…" : "Ingresar"}
      </button>
    </form>
  );
}

export default AdminLoginForm;
