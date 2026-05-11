"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import FallbackImage from "@/components/FallbackImage";
import ShowcaseTile from "@/components/ShowcaseTile";
import { GALLERY_IMAGES, rentalDetailImages, rentalImage } from "@/data/imageAssets";

type RentalOffer = {
  id: string;
  title: string;
  price?: string;
  lead?: string;
  text?: string;
  description?: string;
  details?: string;
};

type RentalCategory = {
  id: string;
  title: string;
  text: string;
  price: string;
  lead: string;
  offers: RentalOffer[];
  details?: string;
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
        id: "ikebana-na-stoly",
        title: "Ikebana na stoly",
        price: "30 €/ks",
        description: "Obsahuje všetky kvety ako na fotke vo Vašich požadovaných farbách.",
        lead: "Obsahuje všetky kvety ako na fotke vo Vašich požadovaných farbách. Vysoká váza v strede so živou ružou. Dva poháre s plávajúcimi sviečkami.",
        details: "Možnosť osobného odberu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska od 4 ks vyššie alebo aj 1 ks pri objednávke nad 100 € (+ príplatok PHM).",
      },
      {
        id: "ikebana-na-stoly-s-vazami-okolo",
        title: "Ikebana na stoly s vázami okolo",
        price: "40 €/ks",
        description: "Obsahuje všetky kvety ako na fotke vo Vašich požadovaných farbách.",
        lead: "Obsahuje všetky kvety ako na fotke vo Vašich požadovaných farbách. Vysoká váza v strede so živou ružou. Dva poháre s plávajúcimi sviečkami. Osem váz dookola s umelými kvetmi. Možnosť živých kvetov v 8 vázach naokolo, napríklad po jednej ruži alebo iných kvetov podľa požiadavky v cene 50 - 70 €.",
        details: "Možnosť osobného odberu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska od 4 ks vyššie alebo aj 1 ks pri objednávke nad 100 € (+ príplatok PHM).",
      },
      {
        id: "mala-ikebana",
        title: "Malá ikebana",
        price: "15 €/ks",
        description: "Obsahuje kvety ako na fotke vo Vašich požadovaných farbách.",
        lead: "Obsahuje kvety ako na fotke vo Vašich požadovaných farbách. Vhodné umiestniť napríklad ku uvítacej tabuli, na obrad pozdĺž uličky alebo pred hlavný stôl novomanželov.",
        details: "Možnosť osobného odberu alebo dopravy s našim aranžmánom v sále alebo na obrade v rámci Východného Slovenska od 6 ks vyššie alebo aj 1 ks pri objednávke nad 100 € (+ príplatok PHM).",
      },
      {
        id: "dlha-ikebana",
        title: "Dlhá ikebana",
        price: "30 €/ks",
        description: "Obsahuje kvety ako na fotke vo Vašich požadovaných farbách, úzke svietniky a sviečky.",
        lead: "Obsahuje kvety ako na fotke vo Vašich požadovaných farbách, úzke svietniky a sviečky.",
        details: "Možnosť osobného odberu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100 € (+ príplatok PHM).",
      },
    ],
  },
  {
    id: "prenajom-detsky-kutik",
    title: "Detský kútik",
    text: "",
    price: "50 €",
    lead: "Detský kútik pripravíme tak, aby mali malí hostia svoj vlastný bezpečný a hravý priestor počas celej svadby.",
    offers: [
      {
        id: "detsky-kutik",
        title: "Detský kútik",
        price: "50 €",
        description: "Obsahuje šmýkalku, penovú podložku, farebné stany, kocky, autíčka, bábiky, omaľovánky.",
        lead: "Obsahuje šmýkalku, penovú podložku, farebné stany, kocky, autíčka, bábiky, omaľovánky.",
        details: "Možnosť osobného odberu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100 € (+ príplatok PHM).",
      },
    ],
  },
  {
    id: "prenajom-stojany-zrkadla",
    title: "Stojany a zrkadlá",
    text: "Dekoračné stojany, zrkadlá a výrazné prvky vhodné na uvítanie hostí, fotenie aj personalizovaný program.",
    price: "Cena individuálne",
    lead: "Stojany a zrkadlá pripravíme ako výrazné dekoračné prvky, ktoré vyniknú pri vstupe, obrade aj počas fotenia.",
    offers: [
      {
        id: "ovalny-stojan",
        title: "Oválny stojan",
        price: "25 €",
        description: "Cena je za čistý zlatý stojan vhodný na uvítanie hostí.",
        lead: "Cena je za čistý zlatý stojan, ktorý je vhodný na uvítanie hostí alebo fotenie. Možnosť uvítacej personalizovanej látky +20 € alebo len zaveseného zasadacieho poriadku +15 €.",
        details: "Možnosť osobného odberu, zaslania iba čistého stojanu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100 € (+ príplatok PHM).",
      },
      {
        id: "srdcovy-stojan",
        title: "Srdcový stojan",
        price: "40 €",
        description: "Čistý zlatý stojan, ktorý krásne vynikne na obrade alebo za hlavným stolom.",
        lead: "Cena je za čistý zlatý stojan, ktorý krásne vynikne na obrade alebo za hlavným stolom. Taktiež sa môže použiť ako fotostena. Možnosť pokrytia hebkými štólami pre luxusný efekt +20 € a pridania kvetov na rám podľa množstva kvetov od 10 €.",
        details: "Možnosť osobného odberu, zaslania iba čistého stojanu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100 € (+ príplatok PHM).",
      },
      {
        id: "stojace-tyce-s-balonmi",
        title: "Stojace tyče s balónmi",
        price: "25 €/ks",
        description: "V cene sú zahrnuté aj balóny.",
        lead: "V cene sú zahrnuté aj balóny. Vhodné pre vstup do sály.",
        details: "Možnosť osobného odberu, zaslania alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100 € (+ príplatok PHM).",
      },
      {
        id: "zrkadlo-s-menami-a-textom",
        title: "Zrkadlo s menami a textom",
        price: "30 €",
        description: "V cene sú zahrnuté aj Vaše personalizované údaje.",
        lead: "V cene sú zahrnuté aj Vaše personalizované údaje ako mená, dátum a text.",
        details: "Možnosť osobného odberu, zaslania alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100 € (+ príplatok PHM).",
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

  const activeRentalBodyText =
    activeRental?.offer?.text ?? (!activeRental?.offer ? activeRental?.category.text : "");
  const activeRentalDetails =
    activeRental?.offer?.details ?? activeRental?.category.details ?? "";
  const activeRentalTitle = activeRental?.offer?.title ?? activeRental?.category.title ?? "";
  const activeRentalImages = activeRental
    ? rentalDetailImages(
        activeRental.category.id,
        activeRental.offer?.id ?? activeRental.category.id.replace(/^prenajom-/, ""),
        activeRentalTitle
      )
    : [];

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

  function handleCta() {
    setOpenKey(null);
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
              {category.text && <p className="rental-group-text">{category.text}</p>}
              <div className="showcase-grid showcase-grid-rental">
                {category.offers.map((offer, index) => (
                  <ShowcaseTile
                    key={offer.id}
                    eyebrow={category.title}
                    title={offer.title}
                    description={offer.description ?? offer.lead ?? category.lead}
                    meta={offer.price ?? category.price}
                    variant={getTileVariant(index)}
                    image={rentalImage(category.id, offer.id, offer.title)}
                    featured={index === 0}
                    onClick={(event) => {
                      openDetail(category, offer, event.currentTarget);
                    }}
                  />
                ))}
              </div>
              {category.note ? <p className="rental-group-note">{category.note}</p> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="gallery-collection reveal reveal-d3">
        <div className="gallery-grid">
          {GALLERY_IMAGES.map((img) => (
            <div key={img.src} className="gal-item">
              <FallbackImage
                src={img.src}
                alt={img.alt}
                className="gal-img"
                loading="lazy"
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
              <div className="rental-modal-price">{activeRental.offer?.price ?? activeRental.category.price}</div>
            </div>

            <p className="rental-modal-lead">
              {activeRental.offer?.lead ?? activeRental.offer?.description ?? activeRental.category.lead}
            </p>

            <div className="rental-modal-layout">
              {activeRentalBodyText ? (
                <div className="rental-modal-section">
                  <h3>O položke</h3>
                  <p>{activeRentalBodyText}</p>
                </div>
              ) : null}

              {activeRentalDetails ? (
                <div className="rental-modal-section">
                  <h3>Podrobnosti</h3>
                  <p>{activeRentalDetails}</p>
                </div>
              ) : null}

              <div className="rental-modal-section rental-modal-photos">
                <h3>Budúce fotky</h3>
                <div className="rental-photo-grid">
                  {activeRentalImages.map((image) => (
                    <FallbackImage
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      className="rental-photo-img"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="rental-modal-actions">
              <span className="rental-modal-note">
                Máte záujem o tento prenájom? Napíšte nám a pripravíme ho podľa vašej predstavy.
              </span>
              <a href="#kontakt" className="btn-p" onClick={handleCta}>
                Vybrať
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
