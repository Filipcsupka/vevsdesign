"use client";

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
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={(event) => {
        const img = event.currentTarget;
        if (img.dataset.fallbackApplied === "true") return;
        img.dataset.fallbackApplied = "true";
        img.src = FALLBACK_IMAGE;
      }}
    />
  );
}
