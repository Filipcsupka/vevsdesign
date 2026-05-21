"use client";

import { useEffect, useState } from "react";
import { FALLBACK_IMAGE } from "@/data/imageAssets";

type FallbackImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
};

export default function FallbackImage({
  src,
  alt,
  className,
  loading = "lazy",
}: FallbackImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={(event) => {
        const img = event.currentTarget;
        if (img.dataset.fallbackApplied === "true") return;
        img.dataset.fallbackApplied = "true";
        img.src = FALLBACK_IMAGE;
        setCurrentSrc(FALLBACK_IMAGE);
      }}
    />
  );
}
