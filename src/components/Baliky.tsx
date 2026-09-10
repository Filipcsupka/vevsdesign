"use client";

import { useState, useEffect, useRef } from "react";
import { type SelectionItem } from "@/components/contactSelection";
import { createPortal } from "react-dom";

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
  followUp?: string;
  sections: { title: string; content: string | string[] }[];
};

const PACKAGES: PackageData[] = [
  {
    id: "s",
    badge: "Základný",
    name: "Balík S",
    price: "450 €",
    unitPrice: 450,
    items: [
      "Výzdoba stolov (stredové ikebany alebo viacero váz so živými kvetmi)",
      "Sviečky a champagne svietniky pre každý stôl",
      "Menovky a servítky s vašimi iniciálkami",
      "Uvítacia tabuľa alebo 50x40cm uvítacie zrkadlo",
      "Zasadací poriadok A3 za sklom",
    ],
  },
  {
    id: "m",
    badge: "Najpredávanejší",
    name: "Balík M",
    price: "600 €",
    unitPrice: 600,
    featured: true,
    items: [
      "Výzdoba stolov (stredové ikebany alebo viacero váz so živými kvetmi)",
      "Sviečky a champagne svietniky pre každý stôl",
      "Menovky a servítky s vašimi iniciálkami",
      "Výzdoba hlavného stola (zahŕňajúca dlhú ikebanu a úzke svietniky so sviečkami)",
      "Uvítací banner s Vašim textom",
      "Zrkadlo s Vašim textom",
      "Balík tlačovín a 2x ikebana na stojanoch pri vchode",
    ],
  },
  {
    id: "l",
    badge: "Premium",
    name: "Balík L",
    price: "750 €",
    unitPrice: 750,
    items: [
      "Kompletný balík M",
      "Fotostena 2x2m akákoľvek z nášho výberu alebo srdcový stojan",
      "Personalizované tabuľky do fotokútika",
      "Výzdoba priestoru malými ikebanami alebo inými požiadavkami",
    ],
  },
];

const DETAILS: Record<PackageId, ModalDetail> = {
  s: {
    badge: "Základný",
    name: "Balík S",
    price: "450 €",
    lead: "Balík S je navrhnutý tak, aby spolu jednotlivé prvky vytvorili harmonickú a štýlovú výzdobu bez toho, aby ste museli riešiť každý detail samostatne.",
    followUp: "Výzdoba stolov zahŕňa naozaj všetko, už si len vybrať typ menoviek a farbu Vášho dňa. Uvítacia tabuľa a zasadací poriadok sa dodávajú aj so stojanmi.",
    sections: [
      {
        title: "Čo balík zahŕňa",
        content: [
          "Výzdoba stolov (stredové ikebany alebo viacero váz so živými kvetmi).",
          "Sviečky a champagne svietniky pre každý stôl.",
          "Menovky a servítky s vašimi iniciálkami.",
          "Uvítacia tabuľa alebo 50x40cm uvítacie zrkadlo.",
          "Zasadací poriadok A3 za sklom.",
        ],
      },
      {
        title: "Podrobnosti",
        content: "V cene sú zahrnuté jednoduché živé kvietky. Pri výbere konkrétneho druhu kvietkov sa môže cena mierne upraviť.",
      },
    ],
  },
  m: {
    badge: "Najpredávanejší",
    name: "Balík M",
    price: "600 €",
    lead: "Balík M vytvára prepracovanú výzdobu do posledného detailu. Od stolov a hlavného stola až po uvítacie prvky a tlačoviny. Všetko spolu vytvára elegantný a harmonický celok.",
    followUp: "Výzdoba stolov zahŕňa komplex tlačovín, aranžmánu kvetov a doplnkov na mieru. Výzdobu hlavného stola si vyberiete podľa Vašich požiadaviek. Stačí si už len vybrať typ menoviek a farbu Vášho dňa, ktorá sa bude odrážať naprieč celou výzdobou. Uvítací banner je látka, ktorú si hostia všimnú ako prvú. Zrkadlo je hitom, ktoré nesmie chýbať a výzdoba vchodu je niečo čo predstaví Vás a Vašu udalosť.",
    sections: [
      {
        title: "Čo balík zahŕňa",
        content: [
          "Výzdoba stolov (stredové ikebany alebo viacero váz so živými kvetmi).",
          "Sviečky a champagne svietniky pre každý stôl.",
          "Menovky a servítky s vašimi iniciálkami.",
          "Výzdoba hlavného stola (zahŕňajúca dlhú ikebanu a úzke svietniky so sviečkami).",
          "Uvítací banner s Vašim textom.",
          "Zrkadlo s Vašim textom.",
          "Balík tlačovín a 2x ikebana na stojanoch pri vchode.",
        ],
      },
      {
        title: "Podrobnosti",
        content: "V cene sú zahrnuté jednoduché živé kvietky. Pri výbere konkrétneho druhu kvietkov sa môže cena mierne upraviť.",
      },
    ],
  },
  l: {
    badge: "Premium",
    name: "Balík L",
    price: "750 €",
    lead: "Balík L prináša všetko, čo udalosť môže mať. Vytvára krásne zákutia, ktoré si hostia zamilujú. Všetko bude dokonale zladené a zanechá príjemnú atmosféru, na ktorú sa nezabudne.",
    followUp: "Po kompletnom balíku M pridávame fotostenu podľa Vašich požiadaviek, ktoré si upresníme v mailovej alebo osobnej komunikácii. Doplnky k fotostene a dôležitá výzdoba priestoru pre krásny dojem bude obsahovať lampáše, kvety a sviečky.",
    sections: [
      {
        title: "Čo balík zahŕňa",
        content: [
          "Kompletný balík M.",
          "Fotostena 2x2m akákoľvek z nášho výberu alebo srdcový stojan.",
          "Personalizované tabuľky do fotokútika.",
          "Výzdoba priestoru malými ikebanami alebo inými požiadavkami.",
        ],
      },
      {
        title: "Podrobnosti",
        content: "V cene sú zahrnuté jednoduché živé kvietky. Pri výbere konkrétneho druhu kvietkov sa môže cena mierne upraviť.",
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
  const [mounted, setMounted] = useState(false);
  const [openId, setOpenId] = useState<PackageId | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastCardRef = useRef<HTMLElement | null>(null);

  const detail = openId ? DETAILS[openId] : null;
  const pkg = openId ? PACKAGES.find((p) => p.id === openId) : null;

  useEffect(() => {
    setMounted(true);
  }, []);

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

  function handleIndividualPackage() {
    onSelectPackage({
      kind: "packages",
      id: "individual",
      name: "Ponuka na mieru",
      quantity: 1,
      unitLabel: "balík",
      priceLabel: "Cena na dopyt",
      unitPrice: null,
      priceKind: "individual",
    });

    window.requestAnimationFrame(() => {
      const noteField = document.getElementById("poznamka-a-predstava") as HTMLTextAreaElement | null;
      noteField?.focus({ preventScroll: true });
      noteField?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  return (
    <section id="baliky">
      <h2 className="reveal reveal-d1">
        Komplexné <em>balíčky</em>
      </h2>
      <div className="rule reveal reveal-d1">
        <div className="rule-diamond" />
      </div>
      <p className="sec-intro reveal reveal-d2">
        Vyberte si balík, ktorý vám najlepšie vyhovuje, alebo si ho vyskladajte na mieru našim kontaktovaním.
        Cena je do 70 hostí, pri vyššom počte je doplatok 5€/osoba.
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

        <article className="balik-card balik-card-individual reveal reveal-d4">
          <div className="balik-individual-heading">
            <div className="balik-badge">Na mieru</div>
            <div className="balik-name">Ponuka na mieru</div>
          </div>
          <p className="balik-individual-copy">
            Tento balík ponúkame nevestám, ktoré majú vlastnú predstavu. Môžete si ho vyskladať
            z inventára, ktorý ponúkame na stránke, ale aj z toho, čo na stránke nie je. Stačí nám
            opísať vašu predstavu a my ju s radosťou premeníme na realitu.
          </p>
          <button type="button" className="btn-p balik-individual-button" onClick={handleIndividualPackage}>
            Pridať
          </button>
        </article>
      </div>

      {mounted && openId && detail && createPortal(
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
            <div className="balik-modal-top">
              <p className="balik-modal-lead">{detail.lead}</p>
              {detail.followUp ? <p className="balik-modal-lead">{detail.followUp}</p> : null}
            </div>

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
              <button type="button" className="btn-p" onClick={handleCta}>
                Vybrať
              </button>
            </div>
          </div>
        </div>
      , document.body)}
    </section>
  );
}
