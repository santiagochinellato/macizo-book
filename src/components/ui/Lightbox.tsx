"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useDragControls } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { overlayFade, lightboxImage } from "@/lib/motion-variants";
import type { GalleryImage } from "@/types/presentation";

interface LightboxProps {
  isOpen: boolean;
  currentImage: GalleryImage | null;
  currentIndex: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export function Lightbox({
  isOpen,
  currentImage,
  currentIndex,
  total,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: LightboxProps) {
  const reduced = useReducedMotion();
  const dragControls = useDragControls();
  const dragStartX = useRef(0);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
          variants={reduced ? undefined : overlayFade}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de imagen"
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          {total > 1 && (
            <div
              className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {currentIndex + 1} / {total}
            </div>
          )}

          {/* Prev */}
          {hasPrev && total > 1 && (
            <button
              className="absolute left-4 z-10 flex items-center justify-center w-10 h-10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Next */}
          {hasNext && total > 1 && (
            <button
              className="absolute right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              aria-label="Imagen siguiente"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Image */}
          <motion.div
            className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-3"
            variants={reduced ? undefined : lightboxImage}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            drag="x"
            dragControls={dragControls}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={(_, info) => { dragStartX.current = info.point.x; }}
            onDragEnd={(_, info) => {
              const delta = info.point.x - dragStartX.current;
              if (delta < -60) onNext();
              else if (delta > 60) onPrev();
            }}
          >
            <div className="relative w-[85vw] max-w-3xl" style={{ aspectRatio: "16/9" }}>
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-contain"
                sizes="85vw"
              />
            </div>
            {currentImage.caption && (
              <p
                className="text-sm text-center px-4"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {currentImage.caption}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Lightbox;
