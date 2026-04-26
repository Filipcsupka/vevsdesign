"use client";

import { useState, useEffect, useRef } from "react";

type PackageId = "s" | "m" | "l";

type PackageData = {
  id: PackageId;
  num: string;
  badge: string;
  name: string;
  price: string;
  items: string[];
  featured?: boolean;
  detailValue: string;
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
    num: "01",
    badge: "Základný",
    name: "Balík S",
    price: "350 €",
    detailValue: "Balík S — 350 €",
    items: [
      "Výzdoba stolov navrhnutá individuálne podľa farieb a témy svadby",
      "Menu, čísla stolov, menovky, personalizované servítky",
      "Uvítacia tabuľa a zasadací poriadok",
      "Informačné karty (sladký bar, kniha hostí, …)",
    ],
  },
  {
    id: "m",
    num: "02",
    badge: "Najpopulárnejší",
    name: "Balík M",
    price: "500 €",
    detailValue: "Balík M — 500 €",
    featured: true,
    items: [
      "Obsahuje Balík S",
      "Personalizovaná kniha hostí + perá",
      "Harmonogram svadby",
      "Rekvizity do fotokútika (tabuľky, okuliare, led tyče, vejáre…)",
      "Pripravený detský kútik",
    ],
  },
  {
    id: "l",
    num: "03",
    badge: "Premium",
    name: "Balík L",
    price: "650 €",
    detailValue: "Balík L — 650 €",
    items: [
      "Obsahuje Balík S, M",
      "Veľký stojan v tvare srdca s kvetinovou výzdobou",
      "Veľký stojan v tvare oválu s vlastným bannerom",
      "Zrkadlo s menami",
    ],
  },
];

const DETAILS: Record<PackageId, ModalDetail> = {
  s: {
    badge: "Základný",
    name: "Balík S",
    price: "350 €",
    lead: "Jemný základ pre svadbu, kde chcete mať všetko vizuálne zladené a premyslené do detailu už od prvého pohľadu hostí.",
    sections: [
      {
        title: "Čo balík zahŕňa",
        content: [
          "Výzdoba stolov je navrhnutá podľa vašich farieb, štýlu a celkovej témy svadby. Na mieru preto vytvárame menu, čísla stolov, menovky, personalizované servítky aj vtipné fakty o novomanželoch.",
          "Stred stola je vyzdobený veľkou vázou, viacerými malými vázami a sviečkami. V cene sú aj umelé kvety, ktoré tvoria ikebanu stola. Živé kvety sú za príplatok.",
          "Uvítacia tabuľa a zasadací poriadok sú navrhnuté podľa želania. V cene sú aj dôležité označenia ako informačné karty pre sladký bar, knihu hostí a iné.",
        ],
      },
      {
        title: "Pre koho je vhodný",
        content: "Pre páry, ktoré chcú elegantný a zladený svadobný základ bez zbytočností, ale s dôrazom na estetiku a detail.",
      },
    ],
  },
  m: {
    badge: "Najpopulárnejší",
    name: "Balík M",
    price: "500 €",
    lead: "Rozšírený balík pre svadbu, kde chcete okrem výzdoby aj viac osobných prvkov, programu a zábavných detailov pre hostí.",
    sections: [
      {
        title: "Čo balík zahŕňa",
        content: [
          "K Balíku S sa pripájajú ďalšie dôležité prvky, ktoré svadbu obohatia o osobnejší charakter.",
          "Personalizovaná kniha hostí s perami vytvára krásny priestor na odkazy a priania od vašich blízkych.",
          "Harmonogram svadby je navrhnutý podľa vašich želaní, aby hostia mali lepší prehľad o priebehu dňa.",
          "Vlastné rekvizity do fotokútika — tabuľky, papučky, vejáre, svetielkujúce tyče, okuliare s vtipnými hláškami.",
          "Pripravený detský kútik so šmýkalkou, autíčkami, bábikmi, hračkami, farbičkami aj omaľovánkami.",
        ],
      },
      {
        title: "Pre koho je vhodný",
        content: "Pre páry, ktoré chcú svadbu obohatiť o ďalšie premyslené prvky a vytvoriť príjemnú atmosféru nielen vizuálne, ale aj prakticky pre hostí.",
      },
    ],
  },
  l: {
    badge: "Premium",
    name: "Balík L",
    price: "650 €",
    lead: "Výraznejší balík pre svadbu, kde chcete dominantné dekorácie, fotogenické prvky a silný vizuálny dojem počas celého dňa.",
    sections: [
      {
        title: "Čo balík zahŕňa",
        content: [
          "Balík L zahŕňa celý Balík S aj Balík M, takže spája výzdobu, personalizované prvky aj doplnky pre hostí do jedného celku.",
          "Veľký stojan v tvare srdca s kvetinovou výzdobou a štólami vytvára výrazný romantický prvok, ktorý krásne vynikne na fotografiách.",
          "Veľký stojan v tvare oválu s vlastným bannerom s menami dodá svadbe osobitý charakter.",
          "Zrkadlo s menami dopĺňa celkový vizuál o elegantný personalizovaný detail.",
        ],
      },
      {
        title: "Pre koho je vhodný",
        content: "Pre páry, ktoré chcú reprezentatívnejší vizuál, dominantné dekorácie a prvky, ktoré vytvoria silný dojem na hostí aj na fotografiách.",
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
  onSelectPackage: (value: string) => void;
};

export default function Baliky({ onSelectPackage }: BalikyProps) {
  const [openId, setOpenId] = useState<PackageId | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastCardRef = useRef<HTMLElement | null>(null);

  const detail = openId ? DETAILS[openId] : null;
  const pkg = openId ? PACKAGES.find((p) => p.id === openId) : null;

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
    if (pkg) onSelectPackage(pkg.detailValue);
    closeModal();
  }

  return (
    <section id="baliky">
      <p className="sec-label reveal">Čo ponúkame</p>
      <h2 className="reveal reveal-d1">
        Naše <em>balíky</em>
      </h2>
      <div className="rule reveal reveal-d1">
        <div className="rule-diamond" />
      </div>
      <p className="sec-intro reveal reveal-d2">
        Vyberte si balík, ktorý vám najlepšie vyhovuje, alebo si ho vyskladajte na mieru.
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
            <div className="balik-num">{p.num}</div>
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
              <a href="#kontakt" className="btn-p" onClick={handleCta}>
                Mám záujem
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
