import type { MetodologiaIcono } from "@/types/presentation";

export const SCROLL_VIEWPORT = { once: true, margin: "-80px" } as const;

export const METODOLOGIA_ICONS: Record<MetodologiaIcono, string> = {
  people: "Users",
  ux: "LayoutDashboard",
  standard: "ShieldCheck",
  synergy: "Handshake",
};

export function formatUsd(amount: number): string {
  return `USD ${amount.toLocaleString("es-AR", { minimumFractionDigits: amount % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}

export const CARD_SHADOW = "0 2px 12px rgba(0, 0, 0, 0.06)";
