"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import FallbackImage from "@/components/FallbackImage";

const PLACEHOLDER = "/images/gallery/placeholder.png";

type VfPhotosProps = {
  images: string[];
  alt: string;
};

export default function VfPhotos({ images, alt }: VfPhotosProps) {
  const list = images.length ? images : [PLACEHOLDER];
  const count = list.length;
  const hasMore = count > 1;

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpenIndex(null), []);
  const show = useCallback(
    (next: (current: number) => number) =>
      setOpenIndex((current) => (current === null ? current : (next(current) + count) % count)),
    [count],
  );
  const prev = useCallback(() => show((c) => c - 1), [show]);
  const next = useCallback(() => show((c) => c + 1), [show]);

  // lock body scroll + keyboard nav while lightbox open
  useEffect(() => {
    if (openIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowLeft") prev();
      else if (event.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, prev, next]);

  const thumbs = list.slice(1, 5);
  const extra = count - 1 - thumbs.length;

  return (
    <div className="vf-gallery">
      <button
        type="button"
        className={`vf-gallery-main${hasMore ? " has-more" : ""}`}
        onClick={() => setOpenIndex(0)}
        aria-label={hasMore ? `${alt} — otvoriť galériu (${count} fotiek)` : `${alt} — zväčšiť`}
      >
        <FallbackImage src={list[0]} alt={alt} loading="lazy" />
        {hasMore && (
          <span className="vf-count" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="7" width="18" height="13" rx="2.5" />
              <path d="M8 7l1.6-2.4h4.8L16 7" />
              <circle cx="12" cy="13.5" r="3.2" />
            </svg>
            {count}
          </span>
        )}
      </button>

      {hasMore && (
        <div className="vf-thumbs" aria-hidden="true">
          {thumbs.map((src, i) => (
            <button
              key={src + i}
              type="button"
              className="vf-thumb"
              onClick={() => setOpenIndex(i + 1)}
              tabIndex={-1}
            >
              <FallbackImage src={src} alt="" loading="lazy" />
              {extra > 0 && i === thumbs.length - 1 && <span className="vf-thumb-more">+{extra}</span>}
            </button>
          ))}
        </div>
      )}

      {mounted && openIndex !== null
        ? createPortal(
            <div
              className="vf-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              onClick={close}
            >
              <button type="button" className="vf-lb-close" onClick={close} aria-label="Zavrieť">
                ×
              </button>
              {hasMore && (
                <button
                  type="button"
                  className="vf-lb-nav vf-lb-prev"
                  onClick={(event) => {
                    event.stopPropagation();
                    prev();
                  }}
                  aria-label="Predchádzajúca fotka"
                >
                  ‹
                </button>
              )}
              <div
                className="vf-lb-stage"
                onClick={(event) => event.stopPropagation()}
                onTouchStart={(event) => {
                  touchStartX.current = event.changedTouches[0].clientX;
                }}
                onTouchEnd={(event) => {
                  if (touchStartX.current === null) return;
                  const dx = event.changedTouches[0].clientX - touchStartX.current;
                  touchStartX.current = null;
                  if (Math.abs(dx) < 45) return;
                  if (dx < 0) next();
                  else prev();
                }}
              >
                <FallbackImage src={list[openIndex]} alt={alt} loading="eager" />
              </div>
              {hasMore && (
                <button
                  type="button"
                  className="vf-lb-nav vf-lb-next"
                  onClick={(event) => {
                    event.stopPropagation();
                    next();
                  }}
                  aria-label="Ďalšia fotka"
                >
                  ›
                </button>
              )}
              {hasMore && (
                <div className="vf-lb-counter" onClick={(event) => event.stopPropagation()}>
                  {openIndex + 1} / {count}
                </div>
              )}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
