"use client";

import { useEffect, useMemo, useState } from "react";
import FallbackImage from "@/components/FallbackImage";
import type { ImageAsset } from "@/data/imageAssets";

type ModalImageGalleryProps = {
  images: ImageAsset[];
  label: string;
};

export default function ModalImageGallery({ images, label }: ModalImageGalleryProps) {
  const galleryImages = useMemo(() => images.slice(0, 4), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryKey = galleryImages.map((image) => image.src).join("|");

  useEffect(() => {
    setActiveIndex(0);
  }, [galleryKey]);

  if (!galleryImages.length) return null;

  const activeImage = galleryImages[activeIndex] ?? galleryImages[0];

  return (
    <div className="modal-gallery" aria-label={`${label} galéria`}>
      <div className="modal-gallery-main">
        <FallbackImage
          src={activeImage.src}
          alt={activeImage.alt}
          className="modal-gallery-main-img"
          loading="eager"
        />
        <div className="modal-gallery-meta">
          <span>Galéria</span>
          <strong>{activeIndex + 1} / {galleryImages.length}</strong>
        </div>
      </div>

      {galleryImages.length > 1 ? (
        <div className="modal-gallery-thumbs">
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`modal-gallery-thumb${index === activeIndex ? " is-active" : ""}`}
              aria-pressed={index === activeIndex}
              aria-label={`Zobraziť fotku ${index + 1} z ${galleryImages.length}`}
              onClick={() => setActiveIndex(index)}
            >
              <FallbackImage
                src={image.src}
                alt={image.alt}
                className="modal-gallery-thumb-img"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
