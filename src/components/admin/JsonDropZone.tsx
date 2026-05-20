"use client";

import { useCallback, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Check, Copy, ExternalLink } from "lucide-react";
import { publishPresentation } from "@/app/actions/presentation";

export function JsonDropZone() {
  const [jsonText, setJsonText] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<{
    slug: string;
    accessCode?: string;
    url: string;
    isUpdate: boolean;
  } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        setJsonText(text);
        setErrors([]);
        setResult(null);
      }
    };
    reader.readAsText(file);
  }, []);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/json" || file.name.endsWith(".json"))) {
      handleFile(file);
    } else {
      setErrors(["Solo se aceptan archivos .json"]);
    }
  }

  function handlePublish() {
    setErrors([]);
    setResult(null);

    startTransition(async () => {
      const res = await publishPresentation(jsonText);
      if (res.success) {
        setResult({
          slug: res.slug,
          accessCode: res.accessCode,
          url: res.url,
          isUpdate: res.isUpdate,
        });
      } else {
        setErrors(res.errors);
      }
    });
  }

  async function copyToClipboard(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className="relative rounded-[var(--radius-lg)] p-8 text-center transition-colors"
        style={{
          border: `2px dashed ${dragOver ? "var(--primary)" : "var(--border)"}`,
          background: dragOver ? "color-mix(in srgb, var(--primary) 5%, var(--surface-card))" : "var(--surface-card)",
        }}
      >
        <Upload
          size={32}
          className="mx-auto mb-3"
          style={{ color: "var(--text-subtle)" }}
          aria-hidden="true"
        />
        <p className="text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>
          Arrastrá un archivo JSON aquí
        </p>
        <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
          o pegá el contenido en el campo de abajo
        </p>
        <label className="inline-block">
          <span
            className="text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
            style={{ background: "var(--primary)", color: "#fff" }}
          >
            Seleccionar archivo
          </span>
          <input
            type="file"
            accept=".json,application/json"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
      </div>

      <textarea
        value={jsonText}
        onChange={(e) => {
          setJsonText(e.target.value);
          setErrors([]);
          setResult(null);
        }}
        placeholder='Pegá aquí el JSON completo de la presentación…'
        rows={12}
        className="w-full px-4 py-3 rounded-lg font-mono text-xs leading-relaxed resize-y focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        style={{
          background: "var(--surface-panel)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
        }}
        spellCheck={false}
      />

      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-lg p-4 text-xs font-mono whitespace-pre-wrap"
            style={{
              background: "color-mix(in srgb, var(--accent) 10%, var(--surface-card))",
              border: "1px solid var(--accent)",
              color: "var(--text-primary)",
            }}
            role="alert"
          >
            {errors.join("\n")}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={handlePublish}
        disabled={isPending || !jsonText.trim()}
        className="self-start px-6 py-3 rounded-lg text-sm font-semibold disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        style={{ background: "var(--primary)", color: "#fff" }}
      >
        {isPending ? "Publicando…" : "Publicar presentación"}
      </button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[var(--radius-lg)] p-6 flex flex-col gap-4"
            style={{
              background: "color-mix(in srgb, var(--primary) 8%, var(--surface-card))",
              border: "1px solid var(--primary)",
            }}
          >
            <div className="flex items-center gap-2">
              <Check size={18} style={{ color: "var(--primary)" }} />
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {result.isUpdate ? "Presentación actualizada" : "Presentación publicada"}
              </span>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span style={{ color: "var(--text-muted)" }}>URL para el cliente</span>
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono" style={{ color: "var(--text-primary)" }}>
                    {result.url}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(result.url, "url")}
                    className="p-1 rounded hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                    aria-label="Copiar URL"
                  >
                    <Copy size={14} style={{ color: "var(--primary)" }} />
                  </button>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                    aria-label="Abrir presentación"
                  >
                    <ExternalLink size={14} style={{ color: "var(--primary)" }} />
                  </a>
                </div>
              </div>

              {result.accessCode && (
                <div className="flex items-center justify-between gap-2">
                  <span style={{ color: "var(--text-muted)" }}>Código de acceso</span>
                  <div className="flex items-center gap-2">
                    <code
                      className="text-lg font-mono font-bold tracking-widest"
                      style={{ color: "var(--primary)" }}
                    >
                      {result.accessCode}
                    </code>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(result.accessCode!, "code")}
                      className="p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                      aria-label="Copiar código"
                    >
                      <Copy size={14} style={{ color: "var(--primary)" }} />
                    </button>
                  </div>
                </div>
              )}

              {result.isUpdate && !result.accessCode && (
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  El código de acceso anterior sigue vigente.
                </p>
              )}

              {copied && (
                <p className="text-xs" style={{ color: "var(--primary)" }}>
                  {copied === "url" ? "URL copiada" : "Código copiado"}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default JsonDropZone;
