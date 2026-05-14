"use client";

import { useState, useCallback, useEffect } from "react";
import type { GalleryImage } from "@/types/presentation";

interface UseLightboxReturn {
  isOpen: boolean;
  currentIndex: number;
  currentImage: GalleryImage | null;
  open: (index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export function useLightbox(images: GalleryImage[]): UseLightboxReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, next, prev]);

  return {
    isOpen,
    currentIndex,
    currentImage: images[currentIndex] ?? null,
    open,
    close,
    next,
    prev,
    hasNext: images.length > 1,
    hasPrev: images.length > 1,
  };
}
