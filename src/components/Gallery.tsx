"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ShowcaseTile from "@/components/ShowcaseTile";

const IMAGES = [
  { src: "/images/gallery/01.webp", alt: "Svadobná výzdoba" },
  { src: "/images/gallery/02.webp", alt: "Detail výzdoby" },
  { src: "/images/gallery/03.webp", alt: "Svadobný stôl" },
  { src: "/images/gallery/04.webp", alt: "Srdcový stojan" },
  { src: "/images/gallery/05.webp", alt: "Výzdoba obradu" },
  { src: "/images/gallery/06.webp", alt: "Kvety & ikebany" },
];

const GALLERY_FALLBACK_IMAGE = "/images/gallery/placeholder.png";

type RentalOffer = {
  id: string;
  title: string;
  description?: string;
};

type RentalCategory = {
  id: string;
  title: string;
  text: string;
  price: string;
  lead: string;
  offers: RentalOffer[];
  hideOffersGrid?: boolean;
  note?: string;
};

const RENTAL_CATEGORIES: RentalCategory[] = [
  {
    id: "prenajom-kvetinova-vyzdoba",
    title: "Kvetinová výzdoba",
    text: "",
    price: "Cena individuálne",
    lead: "Kvetinovú výzdobu pripravujeme tak, aby jemne doplnila štýl svadby a prirodzene nadviazala na ostatné dekorácie.",
    offers: [
      {
        id: "ikebany",
        title: "Ikebana na stoly",
        description: "Ikebana na stoly podľa štýlu, farebnosti a rozsahu vašej svadby.",
      },
      {
        id: "ikebana-s-vazami-okolo",
        title: "Ikebana na stoly s vázami okolo",
        description: "Ikebana na stoly doplnená o vázy okolo podľa štýlu, farebnosti a rozsahu vašej svadby.",
      },
      {
        id: "mala-ikebana",
        title: "Malá ikebana",
        description: "Malá ikebana pripravená podľa štýlu, farebnosti a rozsahu vašej svadby.",
      },
      {
        id: "dlha-ikebana",
        title: "Dlhá ikebana",
        description: "Dlhá ikebana pripravená podľa štýlu, farebnosti a rozsahu vašej svadby.",
      },
    ],
  },
  {
    id: "prenajom-detsky-kutik",
    title: "Detský kútik",
    text: "Obsahuje šmýkalku, penovú podložku, farebné stany, kocky, autíčka, bábiky, omaľovánky.",
    price: "Cena individuálne",
    lead: "Detský kútik pripravíme tak, aby mali malí hostia svoj vlastný bezpečný a hravý priestor počas celej svadby.",
    hideOffersGrid: true,
    offers: [],
  },
  {
    id: "prenajom-stojany-zrkadla",
    title: "Stojany a zrkadlá",
    text: "",
    price: "Cena individuálne",
    lead: "Stojany a zrkadlá pripravíme ako výrazné dekoračné prvky, ktoré vyniknú pri vstupe, obrade aj počas fotenia.",
    offers: [
      {
        id: "ovalny-stojan",
        title: "Oválny stojan",
        description: "Vhodný na uvítací banner.",
      },
      {
        id: "srdcovy-stojan",
        title: "Srdcový stojan",
        description: "Vhodný na obrade alebo za svadobným stolom.",
      },
      {
        id: "stojace-tyce-s-balonmi",
        title: "Stojace tyče s balónmi",
        description: "Vhodné pri vstupe.",
      },
      {
        id: "zrkadlo-s-menami-a-textom",
        title: "Zrkadlo s menami a textom",
      },
    ],
  },
  {
    id: "prenajom-vazy-svietniky",
    title: "Vázy a svietniky",
    text: "",
    price: "Cena individuálne",
    lead: "Vázy a svietniky vyberáme tak, aby prirodzene doplnili prestretie stolov a podčiarkli jemný svadobný charakter.",
    offers: [
      { id: "vysoke-svietniky", title: "Vysoké svietniky" },
      { id: "champagne-svietniky", title: "Champagne svietniky" },
      { id: "vysoke-vazy", title: "Vysoké vázy" },
      { id: "uzke-vazy", title: "Úzke vázy" },
    ],
  },
  {
    id: "prenajom-ostatne",
    title: "Ostatné",
    text: "",
    price: "Cena individuálne",
    lead: "Ak chcete doplniť svadbu o ďalšie efektné alebo praktické kúsky, radi vyskladáme prenájom aj podľa vašej predstavy.",
    offers: [
      { id: "instax-foto", title: "Instax foto" },
      { id: "champagne-tower", title: "Champagne tower" },
      { id: "behun-stola", title: "Behúň / štóla" },
      { id: "lampase", title: "Lampáše" },
      { id: "drevene-boxy", title: "Drevené boxy" },
    ],
  },
];

type ActiveRental = {
  category: RentalCategory;
  offer: RentalOffer | null;
};

const TILE_VARIANTS = ["mist", "sky", "sand", "pearl"] as const;

function getTileVariant(index: number) {
  return TILE_VARIANTS[index % TILE_VARIANTS.length];
}

export default function Gallery() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const activeRental = useMemo<ActiveRental | null>(() => {
    if (!openKey) return null;

    for (const category of RENTAL_CATEGORIES) {
      if (category.id === openKey) return { category, offer: null };
      const offer = category.offers.find((item) => `${category.id}:${item.id}` === openKey);
      if (offer) return { category, offer };
    }

    return null;
  }, [openKey]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (openKey) {
      document.body.classList.add("modal-open");
      closeButtonRef.current?.focus();
    } else {
      document.body.classList.remove("modal-open");
      lastTriggerRef.current?.focus();
    }
  }, [openKey]);

  useEffect(() => {
    if (!openKey) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenKey(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openKey]);

  function openDetail(category: RentalCategory, offer: RentalOffer, button: HTMLButtonElement) {
    lastTriggerRef.current = button;
    setOpenKey(`${category.id}:${offer.id}`);
  }

  function openCategoryDetail(category: RentalCategory, button: HTMLButtonElement) {
    lastTriggerRef.current = button;
    setOpenKey(category.id);
  }

  return (
    <section id="galeria">
      <div className="rental-bg-lines" />
      <div className="rental-glow" />
      <p className="sec-label reveal">Kúsky, ktoré vieme zapožičať</p>
      <h2 className="reveal reveal-d1">Prenájom</h2>
      <div className="rule reveal reveal-d1">
        <div className="rule-diamond" />
      </div>
      <p className="sec-intro reveal reveal-d2">
        Vyberte si kategóriu prenájmu, ktorá najlepšie doplní atmosféru vášho svadobného dňa.
      </p>

      <div className="rental-stage reveal reveal-d2">
        <div className="rental-groups">
        {RENTAL_CATEGORIES.map((category) => (
          <div key={category.id} className="rental-group" id={category.id}>
            <div className="rental-group-title">{category.title}</div>
            {category.hideOffersGrid ? (
              <div className="showcase-grid showcase-grid-rental">
                <ShowcaseTile
                  eyebrow="Prenájom"
                  title={category.title}
                  description={category.lead}
                  meta={category.price}
                  variant={getTileVariant(0)}
                  featured
                  onClick={(event) => openCategoryDetail(category, event.currentTarget)}
                />
              </div>
            ) : (
              <div className="showcase-grid showcase-grid-rental">
                {category.offers.map((offer, index) => (
                  <ShowcaseTile
                    key={offer.id}
                    eyebrow={category.title}
                    title={offer.title}
                    description={offer.description ?? category.lead}
                    meta={category.price}
                    variant={getTileVariant(index)}
                    featured={index === 0}
                    onClick={(event) => openDetail(category, offer, event.currentTarget)}
                  />
                ))}
              </div>
            )}
            {category.note ? <p className="rental-group-note">{category.note}</p> : null}
          </div>
        ))}
        </div>
      </div>

      <div className="gallery-collection reveal reveal-d3">
      <div className="gallery-grid">
        {IMAGES.map((img) => (
          <div key={img.src} className="gal-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="gal-img"
              loading="lazy"
              onError={(event) => {
                const image = event.currentTarget;
                if (image.src.endsWith(GALLERY_FALLBACK_IMAGE)) return;
                image.src = GALLERY_FALLBACK_IMAGE;
              }}
            />
            <div className="gal-overlay" />
          </div>
        ))}
      </div>
      </div>

      {mounted && activeRental && createPortal(
        <div className="rental-modal" role="dialog" aria-modal="true" aria-labelledby="rental-modal-name">
          <div className="rental-modal-backdrop" onClick={() => setOpenKey(null)} />
          <div className="rental-modal-dialog">
            <button
              ref={closeButtonRef}
              type="button"
              className="rental-modal-close"
              aria-label="Zavrieť detail prenájmu"
              onClick={() => setOpenKey(null)}
            >
              &times;
            </button>

            <div className="rental-modal-badge">Prenájom</div>
            <div className="rental-modal-head">
              <div className="rental-modal-category">{activeRental.category.title}</div>
              <div className="rental-modal-name" id="rental-modal-name">
                {activeRental.offer?.title ?? activeRental.category.title}
              </div>
              <div className="rental-modal-price">{activeRental.category.price}</div>
            </div>

            <p className="rental-modal-lead">
              {activeRental.offer?.description ?? activeRental.category.lead}
            </p>

            <div className="rental-modal-layout">
              <div className="rental-modal-section">
                <h3>O kategórii</h3>
                <p>{activeRental.category.text}</p>
              </div>

              <div className="rental-modal-section rental-modal-photos">
                <h3>Budúce fotky</h3>
                <div className="rental-photo-grid">
                  <div className="rental-photo-placeholder">
                    <span>Miesto pre fotku</span>
                    <small>
                      Sem doplníme prvú ukážku pre {(activeRental.offer?.title ?? activeRental.category.title).toLowerCase()}.
                    </small>
                  </div>
                  <div className="rental-photo-placeholder">
                    <span>Miesto pre fotku</span>
                    <small>Sem doplníme ďalší detail alebo aranžmán.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
