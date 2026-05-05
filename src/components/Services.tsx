"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ShowcaseTile from "@/components/ShowcaseTile";

type ServiceItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  details?: string[];
  category: "Doplnky na mieru" | "Doplnky pre hostí";
};

const CUSTOM_SERVICES: ServiceItem[] = [
  {
    id: "pozvanky",
    name: "Pozvánky",
    price: "Od 0,40 €/ks",
    description: "Pozvánky navrhujeme tak, aby už pri prvom pohľade vystihli štýl, náladu a charakter vašej svadby.",
    category: "Doplnky na mieru",
  },
  {
    id: "menovky",
    name: "Menovky",
    price: "Cena individuálne",
    description: "Jemné menovky doladia prestretie stolov a vytvoria osobnejší dojem pre každého hosťa.",
    details: [
      "Kartičkové: 0,25 €/ks",
      "Zohýbané na polovicu: 0,35 €/ks",
      "S fotkou hosťa: 0,50 €/ks",
      "V tvare kvietka: 0,30 €/ks",
    ],
    category: "Doplnky na mieru",
  },
  {
    id: "balik-tlacovin",
    name: "Balík tlačovín",
    price: "30 €",
    description: "Balík tlačovín vytvorí zladený a praktický set svadobných tlačovín, ktorý doplní výzdobu a zároveň pomôže hosťom lepšie sa zorientovať počas celého dňa.",
    details: [
      "Zasadací poriadok",
      "Harmonogram svadby",
      "Čísla stolov",
      "Menu",
      "Vtipné fakty",
      "Informačné tabuľky: sladký bar, slaný bar, kniha hostí, detský kútik, cigar bar, vejáre, papučky, košík prvej pomoci a ďalšie podľa potreby",
    ],
    category: "Doplnky na mieru",
  },
  {
    id: "servitky",
    name: "Servítky",
    price: "Cena individuálne",
    description: "Servítky vieme doladiť tak, aby pôsobili elegantne a prirodzene zapadli do celého prestretia.",
    details: [
      "S vlastným logom: 0,60 €/ks",
    ],
    category: "Doplnky na mieru",
  },
  {
    id: "kniha-hosti",
    name: "Kniha hostí",
    price: "12 € s perom",
    description: "Kniha hostí vytvorí krásny priestor na odkazy, priania a spomienky od vašich blízkych.",
    category: "Doplnky na mieru",
  },
  {
    id: "box-na-obalky",
    name: "Box na obálky",
    price: "Od 2,50 €",
    description: "Dekoratívny box na obálky je praktický detail, ktorý zároveň pôsobí elegantne a usporiadane.",
    details: [
      "Čistá verzia ako na foto: 2,50 €",
      "Možnosť zdobenia",
      "Možnosť pridať mená svadobčanov",
    ],
    category: "Doplnky na mieru",
  },
  {
    id: "strom-na-platne",
    name: "Strom na plátne",
    price: "15 €",
    description: "Strom na plátne je jemná a osobná pamiatka, do ktorej hostia zanechajú svoj vlastný odtlačok.",
    details: [
      "Farby podľa želania",
      "Prenajatý stojan",
    ],
    category: "Doplnky na mieru",
  },
  {
    id: "uvitacia-tabula",
    name: "Uvítacia tabuľa",
    price: "20 €",
    description: "Uvítacia tabuľa vytvorí krásny prvý dojem a hneď pri príchode naladí hostí na atmosféru svadby.",
    details: [
      "Prenajatý stojan",
      "Personalizovaná uvítacia tabuľa na plátne",
    ],
    category: "Doplnky na mieru",
  },
  {
    id: "uvitacia-latka",
    name: "Uvítací banner",
    price: "25 € + stojan 15 €",
    description: "Uvítací banner pôsobí mäkko, romanticky a veľmi pekne vynikne pri vstupe alebo fotení.",
    details: [
      "Personalizovaná látka svadobčanov: 25 €",
      "Prenajatý stojan: 15 €",
    ],
    category: "Doplnky na mieru",
  },
];

const GUEST_SERVICES: ServiceItem[] = [
  {
    id: "cigar-bar",
    name: "Cigar bar",
    price: "Cena individuálne",
    description: "Cigar bar je štýlový doplnok, ktorý vytvorí výrazný zážitok najmä počas večernej časti programu.",
    details: [
      "Drevená krabička s potrebným príslušenstvom",
      "Personalizované cigary: 15 €/ks",
      "Možnosť prenajatia čapovacieho sudu pre rum podľa želania: 20 € bez rumu",
    ],
    category: "Doplnky pre hostí",
  },
  {
    id: "detske-balicky",
    name: "Detský balíček",
    price: "10 €/ks",
    description: "Detské balíčky spríjemnia svadobný deň malým hosťom a pomôžu zabaviť ich počas hostiny aj programu.",
    category: "Doplnky pre hostí",
  },
  {
    id: "omalovanky",
    name: "Omaľovánky",
    price: "4 €/ks",
    description: "Omaľovánky sú jednoduchý, ale veľmi obľúbený doplnok, ktorý zabaví deti počas svadobného dňa.",
    details: [
      "S menom pre dieťa: 4 €/ks",
    ],
    category: "Doplnky pre hostí",
  },
  {
    id: "vejare",
    name: "Vejáre",
    price: "1,50 €/ks",
    description: "Vejáre sú pekný aj praktický detail, ktorý hostia ocenia najmä počas teplých letných svadieb.",
    details: [
      "Možnosť zdobenia: cena individuálne",
    ],
    category: "Doplnky pre hostí",
  },
  {
    id: "papucky",
    name: "Papučky",
    price: "0,50 €/ks",
    description: "Papučky doprajú hosťom väčšie pohodlie pri tanci a zároveň spríjemnia neskorší priebeh oslavy.",
    details: [
      "Možnosť zdobenia: cena individuálne",
    ],
    category: "Doplnky pre hostí",
  },
  {
    id: "okuliare",
    name: "Okuliare",
    price: "10 €/20 ks",
    description: "Okuliare sú hravý doplnok, ktorý vie oživiť fotenie, fotokútik aj spontánnu zábavu hostí.",
    category: "Doplnky pre hostí",
  },
  {
    id: "domaci-med",
    name: "Domáci med",
    price: "1,50 €/ks",
    description: "Domáci med je milá a vkusná pozornosť pre hostí, ktorá pôsobí osobne a srdcom.",
    category: "Doplnky pre hostí",
  },
  {
    id: "flasticky",
    name: "Fľaštičky",
    price: "1,30 €/ks",
    description: "Fľaštičky vieme pripraviť ako originálny drobný darček alebo tematický detail pre vašich hostí.",
    category: "Doplnky pre hostí",
  },
];

const ALL_SERVICES = [...CUSTOM_SERVICES, ...GUEST_SERVICES];

const TILE_VARIANTS = ["sky", "sand", "pearl", "mist"] as const;

function getTileVariant(index: number) {
  return TILE_VARIANTS[index % TILE_VARIANTS.length];
}

export default function Services() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const activeService = openId ? ALL_SERVICES.find((item) => item.id === openId) ?? null : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (openId) {
      document.body.classList.add("modal-open");
      closeButtonRef.current?.focus();
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [openId]);

  useEffect(() => {
    if (!openId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openId]);

  function handleCta() {
    setOpenId(null);
  }

  return (
    <section id="services">
      <div className="services-bg-lines" />
      <div className="services-glow" />
      <p className="sec-label reveal">Rozšírte svadbu</p>
      <h2 className="reveal reveal-d1">
        Svadobné <em>doplnky</em>
      </h2>
      <div className="rule reveal reveal-d1">
        <div className="rule-diamond" />
      </div>
      <p className="sec-intro reveal reveal-d2">
        Vybrali sme pre vás doplnky, ktoré svadbu krásne doladia, spríjemnia hosťom
        a dodajú vášmu dňu ešte osobitejšiu atmosféru.
      </p>
      <div className="doplnkove-wrap reveal reveal-d2">
        <div className="doplnkove-inner" id="doplnky-na-mieru">
          <div className="doplnkove-title">Doplnky na mieru</div>
          <div className="showcase-grid showcase-grid-services">
            {CUSTOM_SERVICES.map((service, index) => (
              <ShowcaseTile
                key={service.id}
                eyebrow="Doplnky na mieru"
                title={service.name}
                description={service.description}
                meta={service.price}
                variant={getTileVariant(index)}
                featured={index === 0}
                onClick={() => setOpenId(service.id)}
              />
            ))}
          </div>
        </div>

        <div className="doplnkove-inner" id="doplnky-pre-hosti">
          <div className="doplnkove-title">Doplnky pre hostí</div>
          <div className="showcase-grid showcase-grid-services">
            {GUEST_SERVICES.map((service, index) => (
              <ShowcaseTile
                key={service.id}
                eyebrow="Doplnky pre hostí"
                title={service.name}
                description={service.description}
                meta={service.price}
                variant={getTileVariant(index + 1)}
                featured={index === 1}
                onClick={() => setOpenId(service.id)}
              />
            ))}
          </div>
          <p className="price-note">Všetko vieme prispôsobiť počtu hostí, štýlu svadby aj vašej predstave.</p>
        </div>
      </div>

      {mounted && activeService && createPortal(
        <div className="service-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-name">
          <div className="service-modal-backdrop" onClick={() => setOpenId(null)} />
          <div className="service-modal-dialog">
            <button
              ref={closeButtonRef}
              type="button"
              className="service-modal-close"
              aria-label="Zavrieť detail doplnku"
              onClick={() => setOpenId(null)}
            >
              &times;
            </button>

            <div className="service-modal-badge">{activeService.category}</div>
            <div className="service-modal-head">
              <div className="service-modal-name" id="service-modal-name">{activeService.name}</div>
              <div className="service-modal-price">{activeService.price}</div>
            </div>

            <div className="service-modal-summary">
              <p className="service-modal-lead">{activeService.description}</p>
              {activeService.details?.length ? (
                <ul className="service-modal-list service-modal-list-top">
                  {activeService.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="service-modal-layout">
              <div className="service-modal-section">
                <h3>O doplnku</h3>
                <p>
                  Tento doplnok vieme zladiť s vašou farebnosťou, štýlom aj celkovou atmosférou
                  svadby, aby prirodzene zapadol do celého konceptu.
                </p>
              </div>

              <div className="service-photo-placeholder">
                <span>Fotografia doplnku</span>
                <small>Tu neskôr doplníme reálnu ukážku.</small>
              </div>
            </div>

            <div className="service-modal-actions">
              <span className="service-modal-note">
                Máte záujem o tento doplnok? Napíšte nám a pripravíme ho podľa vašej predstavy.
              </span>
              <a href="#kontakt" className="btn-p" onClick={handleCta}>
                Mám záujem
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
