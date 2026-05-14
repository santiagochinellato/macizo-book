"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface UseScrollRevealOptions {
  once?: boolean;
}

export function useScrollReveal({ once = true }: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once });
  return { ref, isInView };
}
