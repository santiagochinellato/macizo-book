"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { screenEnter, stagger, scaleIn, overlayFade } from "@/lib/motion-variants";
import type { MockupsScreenData, MockupImage } from "@/types/presentation";

interface MockupsScreenProps {
  data: MockupsScreenData;
}

interface LightboxProps {
  image: MockupImage;
  images: MockupImage[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function LightboxModal({ image, images, onClose, onNext, onPrev }: LightboxProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "var(--surface-overlay)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      variants={reduced ? undefined : overlayFade}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Imagen: ${image.alt}`}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        style={{
          background: "var(--surface-card)",
          color: "var(--text-muted)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-card)",
        }}
        onClick={onClose}
        aria-label="Cerrar"
      >
        <X size={16} />
      </button>

      {/* Counter */}
      {images.length > 1 && (
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-mono"
          style={{ color: "var(--text-subtle)" }}
        >
          {images.findIndex((img) => img.id === image.id) + 1} / {images.length}
        </div>
      )}

      {/* Prev */}
      {images.length > 1 && (
        <button
          className="absolute left-4 flex items-center justify-center w-9 h-9 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          style={{
            background: "var(--surface-card)",
            color: "var(--text-muted)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-card)",
          }}
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          className="absolute right-4 flex items-center justify-center w-9 h-9 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          style={{
            background: "var(--surface-card)",
            color: "var(--text-muted)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-card)",
          }}
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Imagen siguiente"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Image with shared layoutId transition */}
      <motion.div
        layoutId={`mockup-${image.id}`}
        className="relative rounded-[var(--radius-lg)] overflow-hidden"
          style={{
          maxWidth: "88vw",
          maxHeight: "82vh",
          width: "100%",
          aspectRatio: "16/9",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-elevated)",
        }}
        onClick={(e) => e.stopPropagation()}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="88vw"
          priority
        />
        {image.caption && (
          <div
            className="absolute bottom-0 left-0 right-0 px-4 py-3"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}
          >
            <p
              className="text-sm font-medium text-center"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              {image.caption}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function MockupsScreen({ data }: MockupsScreenProps) {
  const reduced = useReducedMotion();
  const { images } = data;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedImage = images.find((img) => img.id === selectedId) ?? null;
  const selectedIndex = selectedImage ? images.indexOf(selectedImage) : -1;

  function handleNext() {
    if (selectedIndex < images.length - 1) setSelectedId(images[selectedIndex + 1].id);
    else setSelectedId(images[0].id);
  }

  function handlePrev() {
    if (selectedIndex > 0) setSelectedId(images[selectedIndex - 1].id);
    else setSelectedId(images[images.length - 1].id);
  }

  if (images.length === 0) {
    return (
      <motion.div
        className="p-6 sm:p-8 flex items-center justify-center min-h-full"
        variants={reduced ? undefined : screenEnter}
        initial="hidden"
        animate="visible"
        exit="exit"
        key="mockups-empty"
      >
        <p className="text-sm" style={{ color: "var(--text-subtle)" }}>
          Sin imágenes de portfolio configuradas.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        className="p-6 sm:p-8 min-h-full"
        variants={reduced ? undefined : screenEnter}
        initial="hidden"
        animate="visible"
        exit="exit"
        key="mockups"
      >
        <motion.div
          className="flex flex-col gap-6 max-w-5xl mx-auto"
          variants={reduced ? undefined : stagger}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col gap-1">
            <span
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--primary)" }}
            >
              Portfolio
            </span>
            <h1
              className="font-bold"
              style={{ fontSize: "clamp(20px, 3vw, 32px)", color: "var(--text-primary)" }}
            >
              Trabajos realizados
            </h1>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={reduced ? undefined : stagger}
            initial="hidden"
            animate="visible"
          >
            {images.map((image) => (
              <motion.button
                key={image.id}
                layoutId={`mockup-${image.id}`}
                variants={reduced ? undefined : scaleIn}
                className="group relative overflow-hidden rounded-[var(--radius-lg)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] aspect-video"
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--border)",
                }}
                onClick={() => setSelectedId(image.id)}
                aria-label={`Ver imagen: ${image.alt}`}
                whileHover={
                  reduced
                    ? undefined
                    : {
                        borderColor: "color-mix(in srgb, var(--primary) 40%, var(--border))",
                        boxShadow: "0 0 24px var(--primary-glow)",
                        transition: { duration: 0.2 },
                      }
                }
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover caption overlay */}
                <div
                  className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }}
                >
                  {image.caption && (
                    <span
                      className="text-xs font-medium text-left"
                      style={{ color: "rgba(255,255,255,0.9)" }}
                    >
                      {image.caption}
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <LightboxModal
            image={selectedImage}
            images={images}
            onClose={() => setSelectedId(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default MockupsScreen;
