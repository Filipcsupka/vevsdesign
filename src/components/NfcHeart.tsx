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
      <p className="sec-label reveal">Váš príbeh ukrytý v srdci</p>
      <h2 className="reveal reveal-d1">NFC srdce</h2>
      <div className="rule reveal reveal-d1"><div className="rule-diamond" /></div>
      <p className="sec-intro reveal reveal-d2">
        3D tlačené srdce s vlastným nápisom a dátumom ukrýva NFC tag. Po priložení telefónu otvorí odkaz, ktorý si sami vyberiete.
      </p>
      <div className="rental-stage reveal reveal-d2">
        <div className="showcase-grid showcase-grid-rental">
          <ShowcaseTile
            eyebrow="NFC srdce"
            title="Personalizované NFC srdce"
            description="3D tlačené srdce s vlastným nápisom, dátumom a NFC tagom, ktorý otvorí váš osobný odkaz."
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
                  Každé srdce vytlačíme na 3D tlačiarni s vaším vlastným nápisom, menami alebo dátumom a doladíme zdobením vo farbách podľa vašej predstavy. Zabudovaný NFC tag po priložení telefónu otvorí odkaz, ktorý si zvolíte.
                </p>
                <div className="rental-modal-section">
                  <h3>Kam môže NFC odkaz smerovať?</h3>
                  <p>
                    Napríklad na váš spoločný príbeh, svadobnú stránku, fotogalériu, video alebo inú osobnú spomienku. Pozrite si našu ukážku príbehu <a className="nfc-heart-example-link" href="/vf/">V/F</a>.
                  </p>
                </div>
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
