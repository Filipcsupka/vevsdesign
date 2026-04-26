"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ServiceItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  category: "Doplnky na mieru" | "Doplnky pre hostí";
};

const CUSTOM_SERVICES: ServiceItem[] = [
  {
    id: "pozvanky",
    name: "Pozvánky",
    price: "Cena individuálne",
    description: "Pozvánky navrhujeme tak, aby už pri prvom pohľade vystihli štýl, náladu a charakter vašej svadby.",
    category: "Doplnky na mieru",
  },
  {
    id: "menovky",
    name: "Menovky",
    price: "Cena individuálne",
    description: "Jemné menovky doladia prestretie stolov a vytvoria osobnejší dojem pre každého hosťa.",
    category: "Doplnky na mieru",
  },
  {
    id: "zasadaci-poriadok",
    name: "Zasadací poriadok",
    price: "Cena individuálne",
    description: "Zasadací poriadok pripravíme prehľadne a elegantne, aby hostí prirodzene navigoval na ich miesto.",
    category: "Doplnky na mieru",
  },
  {
    id: "harmonogram-svadby",
    name: "Harmonogram svadby",
    price: "Cena individuálne",
    description: "Harmonogram pomôže hosťom ľahko sa zorientovať v priebehu dňa a zároveň doplní celkový vizuál svadby.",
    category: "Doplnky na mieru",
  },
  {
    id: "cisla-stolov",
    name: "Čísla stolov",
    price: "Cena individuálne",
    description: "Čísla stolov navrhujeme v jednotnom štýle s ostatnými tlačovinami, aby všetko pôsobilo zladene.",
    category: "Doplnky na mieru",
  },
  {
    id: "menu",
    name: "Menu",
    price: "Cena individuálne",
    description: "Svadobné menu dotvára prestretie a hosťom zároveň príjemne predstaví priebeh hostiny.",
    category: "Doplnky na mieru",
  },
  {
    id: "vtipne-fakty",
    name: "Vtipné fakty",
    price: "Cena individuálne",
    description: "Vtipné fakty o novomanželoch pridajú stolom hravosť a vytvoria medzi hosťami milú konverzáciu.",
    category: "Doplnky na mieru",
  },
  {
    id: "servitky",
    name: "Servítky",
    price: "Cena individuálne",
    description: "Servítky vieme doladiť tak, aby pôsobili elegantne a prirodzene zapadli do celého prestretia.",
    category: "Doplnky na mieru",
  },
  {
    id: "kniha-hosti",
    name: "Kniha hostí",
    price: "Cena individuálne",
    description: "Kniha hostí vytvorí krásny priestor na odkazy, priania a spomienky od vašich blízkych.",
    category: "Doplnky na mieru",
  },
  {
    id: "box-na-obalky",
    name: "Box na obálky",
    price: "Cena individuálne",
    description: "Dekoratívny box na obálky je praktický detail, ktorý zároveň pôsobí elegantne a usporiadane.",
    category: "Doplnky na mieru",
  },
  {
    id: "strom-na-platne",
    name: "Strom na plátne",
    price: "Cena individuálne",
    description: "Strom na plátne je jemná a osobná pamiatka, do ktorej hostia zanechajú svoj vlastný odtlačok.",
    category: "Doplnky na mieru",
  },
  {
    id: "uvitacia-tabula",
    name: "Uvítacia tabuľa",
    price: "Cena individuálne",
    description: "Uvítacia tabuľa vytvorí krásny prvý dojem a hneď pri príchode naladí hostí na atmosféru svadby.",
    category: "Doplnky na mieru",
  },
  {
    id: "uvitacia-latka",
    name: "Uvítacia látka",
    price: "Cena individuálne",
    description: "Uvítacia látka pôsobí mäkko, romanticky a veľmi pekne vynikne pri vstupe alebo fotení.",
    category: "Doplnky na mieru",
  },
  {
    id: "informacne-tabulky",
    name: "Informačné tabuľky",
    price: "Cena individuálne",
    description: "Informačné tabuľky zrozumiteľne navedú hostí a zároveň doplnia výzdobu o premyslené detaily.",
    category: "Doplnky na mieru",
  },
];

const GUEST_SERVICES: ServiceItem[] = [
  {
    id: "cigar-bar",
    name: "Cigar bar",
    price: "Cena individuálne",
    description: "Cigar bar je štýlový doplnok, ktorý vytvorí výrazný zážitok najmä počas večernej časti programu.",
    category: "Doplnky pre hostí",
  },
  {
    id: "detske-balicky",
    name: "Detské balíčky",
    price: "Cena individuálne",
    description: "Detské balíčky spríjemnia svadobný deň malým hosťom a pomôžu zabaviť ich počas hostiny aj programu.",
    category: "Doplnky pre hostí",
  },
  {
    id: "vejare",
    name: "Vejáre",
    price: "Cena individuálne",
    description: "Vejáre sú pekný aj praktický detail, ktorý hostia ocenia najmä počas teplých letných svadieb.",
    category: "Doplnky pre hostí",
  },
  {
    id: "papucky",
    name: "Papučky",
    price: "Cena individuálne",
    description: "Papučky doprajú hosťom väčšie pohodlie pri tanci a zároveň spríjemnia neskorší priebeh oslavy.",
    category: "Doplnky pre hostí",
  },
  {
    id: "led-tycky",
    name: "Led tyčky",
    price: "Cena individuálne",
    description: "Led tyčky pridajú večernej zábave energiu a vytvoria efektnú atmosféru na parkete aj na fotkách.",
    category: "Doplnky pre hostí",
  },
  {
    id: "okuliare",
    name: "Okuliare",
    price: "Cena individuálne",
    description: "Okuliare sú hravý doplnok, ktorý vie oživiť fotenie, fotokútik aj spontánnu zábavu hostí.",
    category: "Doplnky pre hostí",
  },
  {
    id: "domaci-med",
    name: "Domáci med",
    price: "Cena individuálne",
    description: "Domáci med je milá a vkusná pozornosť pre hostí, ktorá pôsobí osobne a srdcom.",
    category: "Doplnky pre hostí",
  },
  {
    id: "flasticky",
    name: "Fľaštičky",
    price: "Cena individuálne",
    description: "Fľaštičky vieme pripraviť ako originálny drobný darček alebo tematický detail pre vašich hostí.",
    category: "Doplnky pre hostí",
  },
  {
    id: "omalovanky",
    name: "Omaľovánky",
    price: "Cena individuálne",
    description: "Omaľovánky sú jednoduchý, ale veľmi obľúbený doplnok, ktorý zabaví deti počas svadobného dňa.",
    category: "Doplnky pre hostí",
  },
];

const ALL_SERVICES = [...CUSTOM_SERVICES, ...GUEST_SERVICES];

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
          <div className="doplnkove-grid">
            {CUSTOM_SERVICES.map((service) => (
              <button
                key={service.id}
                type="button"
                className="doplnkove-item"
                onClick={() => setOpenId(service.id)}
              >
                <span className="doplnkove-dot" />
                <span className="doplnkove-item-text">{service.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="doplnkove-inner" id="doplnky-pre-hosti">
          <div className="doplnkove-title">Doplnky pre hostí</div>
          <div className="doplnkove-grid">
            {GUEST_SERVICES.map((service) => (
              <button
                key={service.id}
                type="button"
                className="doplnkove-item"
                onClick={() => setOpenId(service.id)}
              >
                <span className="doplnkove-dot" />
                <span className="doplnkove-item-text">{service.name}</span>
              </button>
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

            <p className="service-modal-lead">{activeService.description}</p>

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
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
