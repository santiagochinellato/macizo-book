"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { verifyPresentationCode } from "@/app/actions/presentation";

interface AccessGateProps {
  slug: string;
  clientName: string;
  agencyName: string;
}

export function AccessGate({ slug, clientName, agencyName }: AccessGateProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await verifyPresentationCode(slug, code);
      if (result.success) {
        window.location.reload();
      } else {
        setError(result.error ?? "Código incorrecto");
      }
    });
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: "var(--surface-bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-8 rounded-[var(--radius-xl)]"
        style={{
          background: "var(--surface-card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
          style={{ background: "var(--primary)", color: "#fff" }}
        >
          <Lock size={22} aria-hidden="true" />
        </div>

        <p
          className="text-[10px] font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--primary)" }}
        >
          {agencyName}
        </p>
        <h1
          className="text-xl font-semibold mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          {clientName}
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
          Ingresá el código de acceso que recibiste para ver esta presentación.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="access-code" className="sr-only">
            Código de acceso
          </label>
          <input
            id="access-code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Código de 6 caracteres"
            maxLength={6}
            autoComplete="off"
            autoCapitalize="characters"
            className="w-full px-4 py-3 rounded-lg text-center text-lg font-mono tracking-[0.3em] uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            style={{
              background: "var(--surface-panel)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
            disabled={isPending}
            required
          />

          {error && (
            <p className="text-sm text-center" style={{ color: "var(--accent)" }} role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending || code.length < 4}
            className="w-full py-3 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            style={{ background: "var(--primary)", color: "#fff" }}
          >
            {isPending ? "Verificando…" : "Acceder"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default AccessGate;
