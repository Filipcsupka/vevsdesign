"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { normalizeQuantity, type PriceKind, type SelectionItem } from "@/components/contactSelection";
import { createPortal } from "react-dom";
import FallbackImage from "@/components/FallbackImage";
import ModalImageGallery from "@/components/ModalImageGallery";
import ShowcaseTile from "@/components/ShowcaseTile";
import { GALLERY_IMAGES, rentalDetailImages, rentalImage } from "@/data/imageAssets";

type RentalOffer = {
  id: string;
  title: string;
  price?: string;
  unitPrice?: number | null;
  priceKind?: PriceKind;
  unitLabel?: string;
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
        price: "30 €",
        unitPrice: 30,
        priceKind: "fixed",
        description: "Obsahuje všetky kvety ako na fotke vo Vašich požadovaných farbách.",
        lead: "Obsahuje všetky kvety ako na fotke vo Vašich požadovaných farbách. Vysoká váza v strede so živou ružou. Dva poháre s plávajúcimi sviečkami.",
        details: "Možnosť osobného odberu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska od 4 ks vyššie alebo aj 1 ks pri objednávke nad 100 € (+ príplatok PHM).",
      },
      {
        id: "ikebana-na-stoly-s-vazami-okolo",
        title: "Ikebana na stoly s vázami okolo",
        price: "40 €",
        unitPrice: 40,
        priceKind: "fixed",
        description: "Obsahuje všetky kvety ako na fotke vo Vašich požadovaných farbách.",
        lead: "Obsahuje všetky kvety ako na fotke vo Vašich požadovaných farbách. Vysoká váza v strede so živou ružou. Dva poháre s plávajúcimi sviečkami. Osem váz dookola s umelými kvetmi. Možnosť živých kvetov v 8 vázach naokolo, napríklad po jednej ruži alebo iných kvetov podľa požiadavky v cene 50 - 70 €.",
        details: "Možnosť osobného odberu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska od 4 ks vyššie alebo aj 1 ks pri objednávke nad 100 € (+ príplatok PHM).",
      },
      {
        id: "mala-ikebana",
        title: "Malá ikebana",
        price: "15 €",
        unitPrice: 15,
        priceKind: "fixed",
        description: "Obsahuje kvety ako na fotke vo Vašich požadovaných farbách.",
        lead: "Obsahuje kvety ako na fotke vo Vašich požadovaných farbách. Vhodné umiestniť napríklad ku uvítacej tabuli, na obrad pozdĺž uličky alebo pred hlavný stôl novomanželov.",
        details: "Možnosť osobného odberu alebo dopravy s našim aranžmánom v sále alebo na obrade v rámci Východného Slovenska od 6 ks vyššie alebo aj 1 ks pri objednávke nad 100 € (+ príplatok PHM).",
      },
      {
        id: "dlha-ikebana",
        title: "Dlhá ikebana",
        price: "30 €",
        unitPrice: 30,
        priceKind: "fixed",
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
        unitPrice: 50,
        priceKind: "fixed",
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
        unitPrice: 25,
        priceKind: "fixed",
        description: "Cena je za čistý zlatý stojan vhodný na uvítanie hostí.",
        lead: "Cena je za čistý zlatý stojan, ktorý je vhodný na uvítanie hostí alebo fotenie. Možnosť uvítacej personalizovanej látky +20 € alebo len zaveseného zasadacieho poriadku +15 €.",
        details: "Možnosť osobného odberu, zaslania iba čistého stojanu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100 € (+ príplatok PHM).",
      },
      {
        id: "srdcovy-stojan",
        title: "Srdcový stojan",
        price: "40 €",
        unitPrice: 40,
        priceKind: "fixed",
        description: "Čistý zlatý stojan, ktorý krásne vynikne na obrade alebo za hlavným stolom.",
        lead: "Cena je za čistý zlatý stojan, ktorý krásne vynikne na obrade alebo za hlavným stolom. Taktiež sa môže použiť ako fotostena. Možnosť pokrytia hebkými štólami pre luxusný efekt +20 € a pridania kvetov na rám podľa množstva kvetov od 10 €.",
        details: "Možnosť osobného odberu, zaslania iba čistého stojanu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100 € (+ príplatok PHM).",
      },
      {
        id: "stojace-tyce-s-balonmi",
        title: "Stojace tyče s balónmi",
        price: "25 €",
        unitPrice: 25,
        priceKind: "fixed",
        description: "V cene sú zahrnuté aj balóny.",
        lead: "V cene sú zahrnuté aj balóny. Vhodné pre vstup do sály.",
        details: "Možnosť osobného odberu, zaslania alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100 € (+ príplatok PHM).",
      },
      {
        id: "zrkadlo-s-menami-a-textom",
        title: "Zrkadlo s menami a textom",
        price: "30 €",
        unitPrice: 30,
        priceKind: "fixed",
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
      {
        id: "vysoke-svietniky",
        title: "Vysoké svietniky",
        price: "5 €",
        unitPrice: 5,
        priceKind: "fixed",
        description: "Elegantne vytiahnu prestretie do výšky a dodajú mu slávnostný lesk.",
        lead: "Elegantne vytiahnu prestretie do výšky a dodajú mu slávnostný lesk. Na výber zlaté alebo čierne. Cena je za 3ks ako na fotke.",
        details: "Možnosť osobného odberu, zaslania alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100 € (+ príplatok PHM).",
      },
      {
        id: "uzke-metrove-svietniky",
        title: "Úzke metrové svietniky",
        price: "25 €",
        unitPrice: 25,
        priceKind: "fixed",
        description: "Vytvoria výraznú líniu stola a pôsobia moderne, čisto a luxusne. Vhodné aj na obrade alebo pri uvítaní hostí.",
        lead: "Vytvoria výraznú líniu stola a pôsobia moderne, čisto a luxusne. Vhodné aj na obrade alebo pri uvítaní hostí.",
        details: "Možnosť osobného odberu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100€ (+ príplatok PHM).",
      },
      {
        id: "champagne-svietniky",
        title: "Champagne svietniky",
        price: "1,80 €",
        unitPrice: 1.8,
        priceKind: "fixed",
        description: "Jemne odrážajú svetlo sviečok a dodajú stolom mäkký romantický lesk. Slúžia pre plávajúce sviečky, ktoré sú započítané v cene.",
        lead: "Jemne odrážajú svetlo sviečok a dodajú stolom mäkký romantický lesk. Slúžia pre plávajúce sviečky, ktoré sú započítané v cene.",
        details: "Možnosť osobného odberu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100€ (+ príplatok PHM).",
      },
      {
        id: "vysoke-vazy",
        title: "Vysoké vázy",
        price: "2,50 €",
        unitPrice: 2.5,
        priceKind: "fixed",
        description: "Krásne otvoria priestor na vyššie aranžmány a pôsobia vzdušne aj noblesne.",
        lead: "Krásne otvoria priestor na vyššie aranžmány a pôsobia vzdušne aj noblesne.",
        details: "Možnosť osobného odberu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100€ (+ príplatok PHM).",
      },
      {
        id: "uzke-vazy",
        title: "Úzke vázy",
        price: "1 €",
        unitPrice: 1,
        priceKind: "fixed",
        description: "Sú ideálne na jemné detaily, ktoré doladia stôl bez toho, aby ho vizuálne preťažili.",
        lead: "Sú ideálne na jemné detaily, ktoré doladia stôl bez toho, aby ho vizuálne preťažili.",
        details: "Možnosť osobného odberu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100€ (+ príplatok PHM).",
      },
    ],
  },
  {
    id: "prenajom-ostatne",
    title: "Ostatné",
    text: "",
    price: "Cena individuálne",
    lead: "Ak chcete doplniť svadbu o ďalšie efektné alebo praktické kúsky, radi vyskladáme prenájom aj podľa vašej predstavy.",
    offers: [
      {
        id: "champagne-tower",
        title: "Champagne tower",
        price: "Od 21 €",
        unitPrice: 21,
        priceKind: "from",
        description: "Efektná champagne veža vytvorí moment, na ktorý si hostia spomenú ešte dlho.",
        lead: "Efektná champagne veža vytvorí moment, na ktorý si hostia spomenú ešte dlho. Cena za jeden pohár je 1,50€ a najmenšia veža sa skladá zo 14 pohárov. Možnosť vyskladať do 50 pohárov.",
        details: "Možnosť osobného odberu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100€ (+ príplatok PHM).",
      },
      {
        id: "behun-stola",
        title: "Behúň / štóla",
        price: "Cena individuálne",
        unitPrice: null,
        priceKind: "individual",
        description: "Jemne zmäkčí prestretie a prepojí celú výzdobu do elegantného celku. Máme na výber modrú, zelenú, ružovú, béžovú, bielu, perličkovú.",
        lead: "Jemne zmäkčí prestretie a prepojí celú výzdobu do elegantného celku. Máme na výber modrú, zelenú, ružovú, béžovú, bielu, perličkovú.",
        details: "Možnosť osobného odberu, zaslania alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100€ (+ príplatok PHM).",
      },
      {
        id: "lampase",
        title: "Lampáše",
        price: "Cena individuálne",
        unitPrice: null,
        priceKind: "individual",
        description: "Lampáše vytvoria teplú atmosféru a krásne vyniknú pri obrade, ceste aj večernom svietení.",
        lead: "Lampáše vytvoria teplú atmosféru a krásne vyniknú pri obrade, ceste aj večernom svietení.",
        details: "Možnosť osobného odberu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100€ (+ príplatok PHM).",
      },
      {
        id: "drevene-boxy",
        title: "Drevené boxy",
        price: "Cena individuálne",
        unitPrice: null,
        priceKind: "individual",
        description: "Drevené boxy dodajú aranžmánu príjemný rustikálny charakter a zároveň prakticky usporiadajú detaily. Vhodné na cigar bar, rekvizity a iné.",
        lead: "Drevené boxy dodajú aranžmánu príjemný rustikálny charakter a zároveň prakticky usporiadajú detaily. Vhodné na cigar bar, rekvizity a iné.",
        details: "Možnosť osobného odberu alebo dopravy s našim aranžmánom v sále v rámci Východného Slovenska pri objednávke nad 100€ (+ príplatok PHM).",
      },
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

type GalleryProps = {
  onSelectRental: (selection: SelectionItem) => void;
};

export default function Gallery({ onSelectRental }: GalleryProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [quantity, setQuantity] = useState(1);

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

  useEffect(() => {
    setQuantity(1);
  }, [openKey]);

  function openDetail(category: RentalCategory, offer: RentalOffer, button: HTMLButtonElement) {
    lastTriggerRef.current = button;
    setOpenKey(`${category.id}:${offer.id}`);
  }

  function handleCta() {
    if (activeRental && activeRental.offer) {
      onSelectRental({
        kind: "rentals",
        id: activeRental.offer.id,
        name: activeRental.offer.title,
        quantity: normalizeQuantity(quantity),
        unitLabel: activeRental.offer.unitLabel ?? "ks",
        priceLabel: activeRental.offer.price ?? activeRental.category.price,
        unitPrice: activeRental.offer.unitPrice ?? null,
        priceKind: activeRental.offer.priceKind ?? "individual",
      });
    }
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

            <div className="rental-modal-top">
              <div className="rental-modal-summary">
                <p className="rental-modal-lead">
                  {activeRental.offer?.lead ?? activeRental.offer?.description ?? activeRental.category.lead}
                </p>
                {activeRentalBodyText && activeRentalBodyText !== (activeRental.offer?.lead ?? activeRental.offer?.description ?? activeRental.category.lead) ? (
                  <div className="rental-modal-section">
                    <h3>O položke</h3>
                    <p>{activeRentalBodyText}</p>
                  </div>
                ) : null}
              </div>
              <ModalImageGallery images={activeRentalImages} label={activeRentalTitle} />
            </div>

            <div className="rental-modal-body">
              {activeRentalDetails ? (
                <div className="rental-modal-section">
                  <h3>Podrobnosti</h3>
                  <p>{activeRentalDetails}</p>
                </div>
              ) : null}
            </div>

            <div className="rental-modal-actions">
              <div className="modal-selection-tools">
                <span className="rental-modal-note">
                  Máte záujem o tento prenájom? Napíšte nám a pripravíme ho podľa vašej predstavy.
                </span>
                <div className="modal-selection-inline">
                  <label className="modal-qty-field">
                    <span>Počet</span>
                    <input
                      type="number"
                      min={1}
                      step={1}
                      value={quantity}
                      onChange={(event) => setQuantity(normalizeQuantity(Number(event.target.value)))}
                    />
                  </label>
                  <div className="modal-price-preview">
                    <span>Cena</span>
                    <strong>
                      {activeRental.offer?.unitPrice == null
                        ? activeRental.offer?.price ?? activeRental.category.price
                        : `${activeRental.offer.priceKind === "from" ? "od " : ""}${(activeRental.offer.unitPrice * quantity).toLocaleString("sk-SK", {
                            minimumFractionDigits: Number.isInteger(activeRental.offer.unitPrice * quantity) ? 0 : 2,
                            maximumFractionDigits: 2,
                          })} €`}
                    </strong>
                  </div>
                </div>
              </div>
              <button type="button" className="btn-p" onClick={handleCta}>
                Vybrať
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
