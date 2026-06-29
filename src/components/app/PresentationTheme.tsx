"use client";

import type { CSSProperties, ReactNode } from "react";
import type { ThemeConfig } from "@/types/presentation";

interface PresentationThemeProps {
  theme: ThemeConfig;
  children: ReactNode;
  className?: string;
}

export function PresentationTheme({ theme, children, className }: PresentationThemeProps) {
  const accent = theme.accentColor ?? "#1a5c38";

  const style = {
    "--primary": accent,
    "--accent": accent,
    "--primary-hover": `color-mix(in srgb, ${accent} 85%, black)`,
    "--primary-glow": `color-mix(in srgb, ${accent} 18%, transparent)`,
  } as CSSProperties;

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

export default PresentationTheme;
