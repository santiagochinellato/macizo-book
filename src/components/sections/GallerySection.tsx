"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Lightbox } from "@/components/ui/Lightbox";
import { useLightbox } from "@/hooks/useLightbox";
import { stagger, scaleIn } from "@/lib/motion-variants";
import type { GalleryData } from "@/types/presentation";

const ASPECT_RATIOS: Record<string, string> = {
  square: "aspect-square",
  landscape: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

interface GallerySectionProps {
  data: GalleryData;
  label?: string;
}

export function GallerySection({ data, label }: GallerySectionProps) {
  const reduced = useReducedMotion();
  const { images } = data;
  const lightbox = useLightbox(images);

  return (
    <section
      id="gallery"
      className="px-5 sm:px-8 lg:px-14 py-12"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <SectionLabel className="mb-6">{label ?? "Portfolio"}</SectionLabel>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {images.map((image, index) => {
          const aspectClass = ASPECT_RATIOS[image.aspectRatio ?? "landscape"] ?? ASPECT_RATIOS.landscape;
          return (
            <motion.button
              key={image.id}
              variants={reduced ? undefined : scaleIn}
              className={`group relative overflow-hidden rounded-xl cursor-pointer focus:outline-none focus-visible:ring-2 ${aspectClass}`}
              style={{
                border: "1px solid var(--border)",
              }}
              onClick={() => lightbox.open(index)}
              aria-label={`Ver imagen: ${image.alt}`}
              whileHover={reduced ? undefined : { scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "rgba(13,31,60,0.7)" }}
              >
                <ZoomIn size={24} style={{ color: "#fff" }} />
                {image.caption && (
                  <span className="text-sm font-medium text-center px-4" style={{ color: "#fff" }}>
                    {image.caption}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <Lightbox
        isOpen={lightbox.isOpen}
        currentImage={lightbox.currentImage}
        currentIndex={lightbox.currentIndex}
        total={images.length}
        onClose={lightbox.close}
        onNext={lightbox.next}
        onPrev={lightbox.prev}
        hasNext={lightbox.hasNext}
        hasPrev={lightbox.hasPrev}
      />
    </section>
  );
}

export default GallerySection;
