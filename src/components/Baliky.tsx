"use client";

import { useState, useEffect, useRef } from "react";
import { type SelectionItem } from "@/components/contactSelection";
import FallbackImage from "@/components/FallbackImage";
import { packageDetailImages } from "@/data/imageAssets";

type PackageId = "s" | "m" | "l";

type PackageData = {
  id: PackageId;
  badge: string;
  name: string;
  price: string;
  unitPrice: number;
  items: string[];
  featured?: boolean;
};

type ModalDetail = {
  badge: string;
  name: string;
  price: string;
  lead: string;
  sections: { title: string; content: string | string[] }[];
};

const PACKAGES: PackageData[] = [
  {
    id: "s",
    badge: "Základný",
    name: "Balík S",
    price: "350 €",
    unitPrice: 350,
    items: [
      "Výzdoba stolov zahrňuje kvetinové ikebany, sviečky, vázu",
      "Uvítacia tabuľa a zasadací poriadok",
      "Balík tlačovín",
    ],
  },
  {
    id: "m",
    badge: "Najpredávanejší",
    name: "Balík M",
    price: "550 €",
    unitPrice: 550,
    featured: true,
    items: [
      "Obsahuje Balík S",
      "Menovky a servítky s vašimi iniciálkami/menami",
      "Personalizovaná kniha hostí s perami a box na obálky",
      "Tabuľky do fotokútika a okuliare s vtipnými hláškami",
      "Detský kútik s personalizovanými omaľovánkami pre každé dieťa",
    ],
  },
  {
    id: "l",
    badge: "Premium",
    name: "Balík L",
    price: "700 €",
    unitPrice: 700,
    items: [
      "Obsahuje Balík S, M",
      "Zrkadlo s menami",
      "Uvítací banner s vašimi menami so zlatým stojanom",
      "Stojan “srdce” s kvetinovou výzdobou",
      "Detské balíčky",
    ],
  },
];

const DETAILS: Record<PackageId, ModalDetail> = {
  s: {
    badge: "Základný",
    name: "Balík S",
    price: "350 €",
    lead: "Jemný základ pre svadbu, kde chcete mať všetko vizuálne zladené a pripravené v elegantnom štýle.",
    sections: [
      {
        title: "Čo balík zahŕňa",
        content: [
          "Výzdoba stolov je navrhnutá podľa vašich farieb a témy svadby. Kvetinové ikebany s vázou a plávajúcimi sviečkami doladia nádhernú atmosféru.",
          "Uvítacia tabuľa je navrhnutá s vašimi menami a dátumom svadby. Obsahuje aj prenajatý stojan.",
          "Balík tlačovín obsahuje zasadací poriadok s QR kódom, harmonogram svadby, čísla stolov, menu a vtipné fakty o novomanželoch pre každý stôl, informačné tabuľky ako sladký bar, slaný bar, kniha hostí a ďalšie.",
        ],
      },
      {
        title: "Podrobnosti",
        content: "Cena je vypočítaná pre 6-8 okrúhlych stolov v počte do 70 hostí. Pre konkrétny a vyšší počet hostí nám prosím napíšte.",
      },
    ],
  },
  m: {
    badge: "Najpredávanejší",
    name: "Balík M",
    price: "550 €",
    lead: "Rozšírený balík pre svadbu, kde chcete k výzdobe pridať viac personalizovaných prvkov a doplnkov pre hostí.",
    sections: [
      {
        title: "Čo balík zahŕňa",
        content: [
          "K balíku S sa pripájajú ďalšie dôležité prvky, ktoré svadbu obohatia o osobnejší a premyslenejší charakter.",
          "Menovky a servítky sú základom každej udalosti a ich vzhľad si vyberiete aký potrebujete vy.",
          "Personalizovaná kniha hostí s perami vytvorí krásny priestor na odkazy, priania a spomienky od vašich blízkych. Box na obálky je súčasť balíka.",
          "Tabuľky do fotokútika vytvoríme s vašimi požadovanými textami a okuliare prispôsobíme k téme svadby.",
          "Pripravený bude aj detský kútik pre najmenších, ktorý obsahuje šmýkalku, farebné stany, mäkkú podložku, kocky, autíčka, bábiky, farbičky aj omaľovánky.",
        ],
      },
      {
        title: "Podrobnosti",
        content: "Cena je vypočítaná pre 6-8 okrúhlych stolov v počte do 70 hostí. Pre konkrétny a vyšší počet hostí nám prosím napíšte.",
      },
    ],
  },
  l: {
    badge: "Premium",
    name: "Balík L",
    price: "700 €",
    lead: "Prémiový balík pre svadbu, kde chcete reprezentatívnejší vizuál a výrazné personalizované prvky.",
    sections: [
      {
        title: "Čo balík zahŕňa",
        content: [
          "Balík L spája výzdobu, personalizované prvky a doplnky pre hostí do jedného celku.",
          "Zrkadlo s menami dopĺňa celkový vizuál o elegantný personalizovaný detail, ktorý pôsobí reprezentatívne a štýlovo.",
          "Uvítací banner s vašimi menami dodá svadbe osobitý charakter a stane sa výraznou súčasťou priestoru.",
          "Veľký stojan v tvare srdca je obohatený kvetmi a môže byť aj pokrytý hebkými štólami pre luxusný efekt. Vytvára výrazný romantický prvok, ktorý krásne vynikne na obrade alebo za hlavným stolom. Taktiež sa môže použiť ako fotostena.",
        ],
      },
      {
        title: "Podrobnosti",
        content: "Cena je vypočítaná pre 6-8 okrúhlych stolov v počte do 70 hostí. Pre konkrétny a vyšší počet hostí nám prosím napíšte.",
      },
    ],
  },
};

const DETAIL_HASH_TO_ID: Record<string, PackageId> = {
  "#balik-s-detail": "s",
  "#balik-m-detail": "m",
  "#balik-l-detail": "l",
};

type BalikyProps = {
  onSelectPackage: (selection: SelectionItem) => void;
};

export default function Baliky({ onSelectPackage }: BalikyProps) {
  const [openId, setOpenId] = useState<PackageId | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastCardRef = useRef<HTMLElement | null>(null);

  const detail = openId ? DETAILS[openId] : null;
  const pkg = openId ? PACKAGES.find((p) => p.id === openId) : null;
  const packageImages = openId && detail ? packageDetailImages(openId, detail.name) : [];

  useEffect(() => {
    if (openId) {
      document.body.classList.add("modal-open");
      closeButtonRef.current?.focus();
    } else {
      document.body.classList.remove("modal-open");
      (lastCardRef.current as HTMLElement | null)?.focus();
    }
  }, [openId]);

  useEffect(() => {
    if (!openId) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [openId]);

  useEffect(() => {
    const openFromHash = () => {
      const nextId = DETAIL_HASH_TO_ID[window.location.hash];
      if (!nextId) return;

      const targetCard = document.getElementById(`balik-${nextId}`);
      targetCard?.scrollIntoView({ behavior: "smooth", block: "center" });
      setOpenId(nextId);
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  function handleCardClick(id: PackageId, el: HTMLElement) {
    lastCardRef.current = el;
    setOpenId(id);
  }

  function closeModal() {
    setOpenId(null);
    if (typeof window === "undefined") return;
    if (window.location.hash in DETAIL_HASH_TO_ID) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#baliky`);
    }
  }

  function handleCta() {
    if (pkg) {
      onSelectPackage({
        kind: "packages",
        id: pkg.id,
        name: pkg.name,
        quantity: 1,
        unitLabel: "balík",
        priceLabel: pkg.price,
        unitPrice: pkg.unitPrice,
        priceKind: "fixed",
      });
    }
    closeModal();
  }

  return (
    <section id="baliky">
      <h2 className="reveal reveal-d1">
        Svadobné <em>balíčky</em>
      </h2>
      <div className="rule reveal reveal-d1">
        <div className="rule-diamond" />
      </div>
      <p className="sec-intro reveal reveal-d2">
        Vyberte si balík, ktorý vám najlepšie vyhovuje, alebo si ho vyskladajte na mieru našim kontaktovaním.
      </p>

      <div className="baliky-grid">
        {PACKAGES.map((p, i) => (
          <div
            key={p.id}
            id={`balik-${p.id}`}
            className={`balik-card reveal reveal-d${i + 1}${p.featured ? " featured" : ""}`}
            role="button"
            tabIndex={0}
            onClick={(e) => handleCardClick(p.id, e.currentTarget as HTMLElement)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCardClick(p.id, e.currentTarget as HTMLElement);
              }
            }}
          >
            <div className="balik-badge">{p.badge}</div>
            <div className="balik-name">{p.name}</div>
            <div className="balik-price">{p.price}</div>
            <div className="balik-divider" />
            <ul className="balik-list">
              {p.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="balik-hint">Kliknite pre detail →</div>
          </div>
        ))}
      </div>

      <p className="baliky-note reveal" id="balik-vlastny">
        Uvedené ceny sú orientačne nastavené pre výzdobu svadby do 8 stolov.
        Konečná cena sa odvíja od rozsahu vašej výzdoby.
      </p>

      {openId && detail && (
        <div className="balik-modal" role="dialog" aria-modal="true" aria-labelledby="balik-modal-name">
          <div className="balik-modal-backdrop" onClick={closeModal} />
          <div className="balik-modal-dialog">
            <button
              ref={closeButtonRef}
              type="button"
              className="balik-modal-close"
              aria-label="Zavrieť detail balíka"
              onClick={closeModal}
            >
              &times;
            </button>

            <div className="balik-modal-badge">{detail.badge}</div>
            <div className="balik-modal-head">
              <div className="balik-modal-name" id="balik-modal-name">{detail.name}</div>
              <div className="balik-modal-price">{detail.price}</div>
            </div>
            <p className="balik-modal-lead">{detail.lead}</p>

            <div className="balik-modal-body">
              <div className="balik-modal-section balik-modal-photos">
                <h3>Budúce fotky</h3>
                <div className="balik-photo-grid">
                  {packageImages.map((image) => (
                    <FallbackImage
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      className="balik-photo-img"
                    />
                  ))}
                </div>
              </div>

              {detail.sections.map((sec) => (
                <div key={sec.title} className="balik-modal-section">
                  <h3>{sec.title}</h3>
                  {Array.isArray(sec.content) ? (
                    <ul className="balik-modal-list">
                      {sec.content.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{sec.content}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="balik-modal-actions">
              <span className="balik-modal-note">
                Máte inú predstavu? Balík vieme vyskladať aj na mieru.
              </span>
              <button type="button" className="btn-p" onClick={handleCta}>
                Vybrať
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
