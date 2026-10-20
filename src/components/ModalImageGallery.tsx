"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import FallbackImage from "@/components/FallbackImage";
import type { ImageAsset } from "@/data/imageAssets";

type ModalImageGalleryProps = { images: ImageAsset[]; label: string };

function Arrow({ previous = false }: { previous?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={previous ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"} />
    </svg>
  );
}

// A new image collection starts at its first slide, without resetting on label changes.
export default function ModalImageGallery(props: ModalImageGalleryProps) {
  if (!props.images.length) return null;
  return <PhotoGallery key={props.images.map((image) => image.src).join("|")} {...props} />;
}

function PhotoGallery({ images, label }: ModalImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const activeRef = useRef(0);
  const requestedIndex = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const activeImage = images[activeIndex];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const resize = new ResizeObserver(() => {
      requestedIndex.current = null;
      track.scrollTo({ left: activeRef.current * track.clientWidth, behavior: "instant" });
    });
    resize.observe(track);
    return () => resize.disconnect();
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const dialog = dialogRef.current;
    const trigger = expandButtonRef.current;
    if (!dialog) return;
    // The native modal keeps focus inside the viewer and makes the item dialog inert.
    requestedIndex.current = null;
    const track = trackRef.current;
    track?.scrollTo({ left: activeRef.current * track.clientWidth, behavior: "instant" });
    dialog.showModal();
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      setExpanded(false);
    };
    // Capture before the containing item's document-level Escape listener,
    // including when browser chrome temporarily holds keyboard focus.
    document.addEventListener("keydown", handleEscape, true);
    return () => {
      document.removeEventListener("keydown", handleEscape, true);
      dialog.close();
      if (trigger?.isConnected) trigger.focus();
    };
  }, [expanded]);

  function goTo(index: number) {
    const next = Math.max(0, Math.min(images.length - 1, index));
    requestedIndex.current = next;
    activeRef.current = next;
    setActiveIndex(next);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    trackRef.current?.scrollTo({
      left: next * trackRef.current.clientWidth,
      behavior: expanded || reduce ? "instant" : "smooth",
    });
  }

  function handleKeys(event: KeyboardEvent<HTMLElement>) {
    if (expanded && event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation(); // Keep the underlying item dialog open.
      setExpanded(false);
      return;
    }
    const next = event.key === "ArrowLeft" ? activeIndex - 1
      : event.key === "ArrowRight" ? activeIndex + 1
      : event.key === "Home" ? 0
      : event.key === "End" ? images.length - 1 : null;
    if (next !== null) {
      event.preventDefault();
      event.stopPropagation();
      goTo(next);
    }
  }

  function finishSwipe(event: TouchEvent<HTMLElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || event.touches.length) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      goTo(activeIndex + (dx < 0 ? 1 : -1));
    }
  }

  function navigation(className: string) {
    if (images.length < 2) return null;
    return (
      <div className={className}>
        <button type="button" className="gallery-control" aria-label="Predchádzajúca fotka" aria-disabled={activeIndex === 0} onClick={() => goTo(activeIndex - 1)}>
          <Arrow previous />
        </button>
        <span className="gallery-position" aria-live="polite" aria-atomic="true">
          <span className="sr-only">Fotka </span>{activeIndex + 1} / {images.length}
        </span>
        <button type="button" className="gallery-control" aria-label="Ďalšia fotka" aria-disabled={activeIndex === images.length - 1} onClick={() => goTo(activeIndex + 1)}>
          <Arrow />
        </button>
      </div>
    );
  }

  return (
    <div className="modal-gallery" role="region" aria-roledescription="karusel" aria-label={`${label} galéria`} onKeyDown={handleKeys}>
      <div className="modal-gallery-main">
        <div
          ref={trackRef}
          className="modal-gallery-track"
          tabIndex={0}
          aria-label="Fotografie — listujte potiahnutím alebo šípkami"
          onPointerDown={() => { requestedIndex.current = null; }}
          onWheel={() => { requestedIndex.current = null; }}
          onScroll={() => {
            const track = trackRef.current;
            if (!track?.clientWidth) return;
            // Keep rapid button presses and immediate enlargement on the requested
            // photo instead of announcing every intermediate smooth-scroll frame.
            if (requestedIndex.current !== null) {
              if (Math.abs(track.scrollLeft - requestedIndex.current * track.clientWidth) > 1) return;
              requestedIndex.current = null;
            }
            const next = Math.max(0, Math.min(images.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
            activeRef.current = next;
            setActiveIndex(next);
          }}
        >
          {images.map((image, index) => (
            <div key={image.src} className="modal-gallery-slide" role="group" aria-roledescription="snímka" aria-label={`${index + 1} z ${images.length}`} aria-hidden={index !== activeIndex}>
              <FallbackImage src={image.src} alt={image.alt} className="modal-gallery-main-img" loading={index === 0 ? "eager" : "lazy"} />
            </div>
          ))}
        </div>
        <button ref={expandButtonRef} type="button" className="gallery-expand" aria-label="Zväčšiť fotku" aria-haspopup="dialog" onClick={() => setExpanded(true)}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
          </svg>
          Zväčšiť
        </button>
      </div>
      {navigation("modal-gallery-navigation")}
      {images.length > 1 && (
        <div className="modal-gallery-thumbs">
          {images.map((image, index) => (
            <button key={image.src} type="button" className={`modal-gallery-thumb${index === activeIndex ? " is-active" : ""}`} aria-pressed={index === activeIndex} aria-label={`Zobraziť fotku ${index + 1} z ${images.length}`} onClick={() => goTo(index)}>
              <FallbackImage src={image.src} alt="" className="modal-gallery-thumb-img" />
            </button>
          ))}
        </div>
      )}
      <dialog ref={dialogRef} className="gallery-viewer" aria-label={`${label} — zväčšené fotografie`} onCancel={(event) => { event.preventDefault(); setExpanded(false); }} onClick={(event) => { if (event.target === event.currentTarget) setExpanded(false); }}>
        <div className="gallery-viewer-header">
          <p>{label}</p>
          <button type="button" className="gallery-control" aria-label="Zavrieť zväčšenú fotku" onClick={() => setExpanded(false)} autoFocus>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
          </button>
        </div>
        <div className="gallery-viewer-stage" onTouchStart={(event) => { touchStart.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null; }} onTouchEnd={finishSwipe} onTouchCancel={() => { touchStart.current = null; }}>
          <FallbackImage key={activeImage.src} src={activeImage.src} alt={activeImage.alt} loading="eager" />
        </div>
        {navigation("gallery-viewer-navigation")}
      </dialog>
    </div>
  );
}
