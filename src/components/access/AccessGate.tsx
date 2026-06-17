"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { verifyPresentationCode } from "@/app/actions/presentation";

const BRAND_GREEN = "#1A5C38";

interface AccessGateProps {
  slug: string;
  clientName: string;
  agencyName: string;
}

export function AccessGate({ slug, clientName }: AccessGateProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const titleParts = clientName.split(" · ").map((part) => part.trim());
  const hasSplitTitle = titleParts.length === 2 && titleParts.every(Boolean);

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
      className="min-h-screen flex items-center justify-center px-5 py-12"
      style={{ background: "var(--surface-bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-8 sm:p-10 rounded-[var(--radius-xl)] flex flex-col items-center text-center"
        style={{
          background: "var(--surface-card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div
          className="mb-8 flex-shrink-0"
          style={{ width: 200, height: 64 }}
          role="img"
          aria-label="MacizoDigital"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundColor: BRAND_GREEN,
              WebkitMaskImage: "url(/logos/MacizoDigitalWhite.svg)",
              maskImage: "url(/logos/MacizoDigitalWhite.svg)",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-1 mb-2 max-w-sm">
          {hasSplitTitle ? (
            <>
              <h1
                className="text-xl sm:text-2xl font-semibold leading-snug text-center"
                style={{ color: "var(--text-primary)" }}
              >
                {titleParts[0]}
              </h1>
              <p
                className="text-base sm:text-lg font-medium leading-snug text-center"
                style={{ color: "var(--text-secondary)" }}
              >
                {titleParts[1]}
              </p>
            </>
          ) : (
            <h1
              className="text-xl sm:text-2xl font-semibold leading-snug text-center"
              style={{ color: "var(--text-primary)" }}
            >
              {clientName}
            </h1>
          )}
        </div>
        <p className="text-sm leading-relaxed mb-8 max-w-xs" style={{ color: "var(--text-muted)" }}>
          Ingresá el código de acceso que recibiste para ver esta presentación.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 items-center">
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
            className="w-full px-4 py-3.5 rounded-lg text-center text-base font-mono tracking-[0.25em] uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)]"
            style={{
              background: "var(--surface-panel)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
            disabled={isPending}
            required
          />

          {error && (
            <p className="text-sm w-full" style={{ color: "var(--danger)" }} role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending || code.length < 4}
            className="w-full py-3.5 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)]"
            style={{
              background: BRAND_GREEN,
              color: "var(--text-inverted)",
            }}
          >
            {isPending ? "Verificando…" : "Acceder"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default AccessGate;
