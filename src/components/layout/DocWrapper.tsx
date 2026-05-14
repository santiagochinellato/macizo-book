"use client";

import { motion, useReducedMotion } from "framer-motion";
import { docEntrance } from "@/lib/motion-variants";
import type { ThemeConfig } from "@/types/presentation";

interface DocWrapperProps {
  theme: ThemeConfig;
  children: React.ReactNode;
}

export function DocWrapper({ theme, children }: DocWrapperProps) {
  const reduced = useReducedMotion();

  const cssVars = {
    "--bg": theme.colors.background,
    "--fg": theme.colors.foreground,
    "--surface": theme.colors.surface,
    "--primary": theme.colors.primary,
    "--accent": theme.colors.accent,
    "--muted": theme.colors.muted,
    "--border": theme.colors.border,
    "--success": theme.colors.success,
    "--r": theme.radius,
    "--shadow": theme.shadow,
    "--font-display": `"${theme.typography.fontDisplay}", Georgia, serif`,
    "--font-body": `"${theme.typography.fontBody}", system-ui, sans-serif`,
  } as React.CSSProperties;

  return (
    <div
      className="min-h-screen w-full py-6 sm:py-10 flex items-start justify-center"
      style={{ background: "var(--bg)", ...cssVars }}
    >
      <motion.div
        className="w-full mx-auto flex flex-col overflow-hidden"
        style={{
          maxWidth: 980,
          borderRadius: 16,
          background: "var(--surface)",
          boxShadow: "var(--shadow)",
          fontFamily: "var(--font-body)",
          color: "var(--fg)",
          minHeight: "100vh",
        }}
        variants={reduced ? undefined : docEntrance}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default DocWrapper;
