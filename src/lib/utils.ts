import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DocumentMeta } from "@/types/presentation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: DocumentMeta["currency"]): string {
  const localeMap: Record<DocumentMeta["currency"], string> = {
    ARS: "es-AR",
    USD: "en-US",
    EUR: "de-DE",
  };
  return new Intl.NumberFormat(localeMap[currency], {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string, language: "es" | "en" = "es"): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString(language === "es" ? "es-AR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const STATUS_LABELS: Record<DocumentMeta["status"], string> = {
  borrador: "Borrador",
  enviado: "Enviado",
  aprobado: "Aprobado",
  rechazado: "Rechazado",
};

export const STATUS_COLORS: Record<DocumentMeta["status"], string> = {
  borrador: "#6b7a99",
  enviado: "#1b3a6b",
  aprobado: "#2e7d52",
  rechazado: "#c0392b",
};

export const DOC_TYPE_LABELS: Record<DocumentMeta["type"], string> = {
  presupuesto: "Presupuesto",
  propuesta: "Propuesta",
  informe: "Informe",
  estrategia: "Estrategia",
};
