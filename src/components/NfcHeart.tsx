"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ModalImageGallery from "@/components/ModalImageGallery";
import ShowcaseTile from "@/components/ShowcaseTile";
import { nfcHeartDetailImages, nfcHeartImage } from "@/data/imageAssets";

export default function NfcHeart() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      document.body.classList.add("modal-open");
      closeButtonRef.current?.focus();
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <section id="nfc-srdce">
      <div className="rental-bg-lines" />
      <div className="rental-glow" />
      <p className="sec-label reveal">Osobná spomienka na jeden dotyk</p>
      <h2 className="reveal reveal-d1">NFC srdce</h2>
      <div className="rule reveal reveal-d1"><div className="rule-diamond" /></div>
      <p className="sec-intro reveal reveal-d2">
        Personalizované srdce s NFC technológiou pripravíme ako originálny detail vášho svadobného dňa.
      </p>
      <div className="rental-stage reveal reveal-d2">
        <div className="showcase-grid showcase-grid-rental">
          <ShowcaseTile
            eyebrow="NFC srdce"
            title="Personalizované NFC srdce"
            description="Srdce s vašimi menami, dátumom a zdobením vo farbách podľa vašej predstavy."
            meta="Cena individuálne"
            variant="pearl"
            image={nfcHeartImage()}
            featured
            onClick={() => setOpen(true)}
          />
        </div>
      </div>

      {mounted && open && createPortal(
        <div className="rental-modal" role="dialog" aria-modal="true" aria-labelledby="nfc-heart-modal-name">
          <div className="rental-modal-backdrop" onClick={() => setOpen(false)} />
          <div className="rental-modal-dialog">
            <button
              ref={closeButtonRef}
              type="button"
              className="rental-modal-close"
              aria-label="Zavrieť detail NFC srdca"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
            <div className="rental-modal-badge">NFC srdce</div>
            <div className="rental-modal-head">
              <div className="rental-modal-name" id="nfc-heart-modal-name">Personalizované NFC srdce</div>
              <div className="rental-modal-price">Cena individuálne</div>
            </div>
            <div className="rental-modal-top">
              <div className="rental-modal-summary">
                <p className="rental-modal-lead">
                  Srdce pripravíme s vašimi menami, dátumom a zdobením vo farbách podľa vašej predstavy.
                </p>
              </div>
              <ModalImageGallery images={nfcHeartDetailImages()} label="NFC srdce" />
            </div>
            <div className="rental-modal-actions">
              <span className="rental-modal-note">Pre cenu a možnosti personalizácie nám napíšte.</span>
              <a href="#kontakt" className="btn-p" onClick={() => setOpen(false)}>Kontaktovať nás</a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
