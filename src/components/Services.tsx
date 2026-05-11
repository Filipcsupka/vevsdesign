"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import FallbackImage from "@/components/FallbackImage";
import ShowcaseTile from "@/components/ShowcaseTile";
import { serviceDetailImages, serviceImage } from "@/data/imageAssets";

type ServiceItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  details?: string[];
  modalSectionTitle?: string;
  modalDescription?: string;
  modalDetails?: string[];
  modalAbout?: string;
  category: "Doplnky na mieru" | "Doplnky pre hostí";
};

const CUSTOM_SERVICES: ServiceItem[] = [
  {
    id: "pozvanky",
    name: "Pozvánky",
    price: "Od 0,40 €/ks",
    description: "Pozvánky navrhujeme tak, aby už pri prvom pohľade vystihli štýl, náladu a charakter vašej svadby.",
    modalDescription: "Svadobné pozvánky pripravíme v štýle vašej svadby tak, aby ladili s témou, farbami aj celkovou atmosférou dňa.",
    modalDetails: [
      "Bez zdobenia: 0,40€/ks",
      "Zdobené perličkami alebo čipkou naokolo: 0,50€/ks",
      "Čistá obálka: +0,20€/ks",
      "Personalizovaná obálka s iniciálkami: +0,70€/ks",
      "Pečiatky na zavretie obálky sú v cene",
    ],
    modalSectionTitle: "Podrobnosti",
    modalAbout: "Finálny dizajn Vám pošleme do 3 dní. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
  {
    id: "menovky",
    name: "Menovky",
    price: "Od 0,25 €/ks",
    description: "Jemné menovky doladia prestretie stolov a vytvoria osobnejší dojem pre každého hosťa.",
    modalDescription: "Menovky vieme pripraviť v rôznych formách tak, aby doplnili prestretie stolov a vizuálne zapadli do vašej svadobnej témy.",
    modalDetails: [
      "Kartičkové: 0,25 €/ks",
      "Zohýbané na polovicu: 0,35 €/ks",
      "S fotkou hosťa: 0,50 €/ks",
      "V tvare kvietka: 0,30 €/ks",
    ],
    modalAbout: "Finálny dizajn Vám pošleme do 3 dní. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
  {
    id: "balik-tlacovin",
    name: "Balík tlačovín",
    price: "30 €",
    description: "Balík tlačovín vytvorí zladený a praktický set svadobných tlačovín, ktorý doplní výzdobu a zároveň pomôže hosťom lepšie sa zorientovať počas celého dňa.",
    modalDescription: "Balík tlačovín obsahuje zladený set svadobných tlačovín vo vašej téme svadby a farbách, ktorý hosťom uľahčí orientáciu a pekne doplní výzdobu.",
    modalDetails: [
      "Zasadací poriadok s QR kódom vo veľkosti A3",
      "Harmonogram svadby vo veľkosti A3",
      "Čísla stolov pre každý stôl",
      "Menu pre každý stôl",
      "Vtipné fakty o novomanželoch pre každý stôl",
      "Informačné tabuľky ako sladký bar, slaný bar, kniha hostí, detský kútik, papučky, ...",
      "Možnosť doplniť karty do fotokútika s vašimi alebo našimi vtipnými hláškami: +0,40 €/ks",
    ],
    modalAbout: "Finálny dizajn Vám pošleme do 3 dní. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
  {
    id: "servitky",
    name: "Servítky",
    price: "0,60 €/ks",
    description: "Servítky vieme doladiť tak, aby pôsobili elegantne a prirodzene zapadli do celého prestretia.",
    modalDescription: "Personalizované servítky jemne doplnia prestretie a prepoja svadobné detaily do jedného vizuálneho celku.",
    modalDetails: [],
    modalAbout: "Minimálny odber je 30ks. Finálny dizajn Vám pošleme do 3 dní. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
  {
    id: "kniha-hosti",
    name: "Kniha hostí",
    price: "12 €",
    description: "Kniha hostí vytvorí krásny priestor na odkazy, priania a spomienky od vašich blízkych.",
    modalDescription: "Kniha hostí je krásnou spomienkou na svadobný deň a ponúka priestor na odkazy, priania aj milé slová od vašich blízkych. Kniha má čisté strany a obsahuje personalizovanú prednú časť s Vašimi menami a dátumom svadby.",
    modalDetails: [],
    modalAbout: "Finálny dizajn Vám pošleme do 3 dní. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
  {
    id: "box-na-obalky",
    name: "Box na obálky",
    price: "Od 2,50 €",
    description: "Dekoratívny box na obálky je praktický detail, ktorý zároveň pôsobí elegantne a usporiadane.",
    modalDescription: "Box na obálky je praktický aj dekoratívny prvok, ktorý pekne doplní svadobný stôl a zároveň udrží obálky na jednom mieste. Cena je za čistý box ako na fotke. Cena pre personalizovaný box s menami a zdobením je 5€.",
    modalDetails: [],
    modalAbout: "Finálny dizajn Vám pošleme do 3 dní. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
  {
    id: "strom-na-platne",
    name: "Strom na plátne",
    price: "15 €",
    description: "Strom na plátne je jemná a osobná pamiatka, do ktorej hostia zanechajú svoj vlastný odtlačok.",
    modalDescription: "Strom na plátne ostane po svadbe ako krásna osobná spomienka, do ktorej hostia zanechajú svoj odtlačok. Farby sú podľa želania a v cene je aj prenajatý stojan.",
    modalDetails: [],
    modalAbout: "Finálny dizajn Vám pošleme do 3 dní. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
  {
    id: "uvitacia-tabula",
    name: "Uvítacia tabuľa",
    price: "25 €",
    description: "Uvítacia tabuľa vytvorí krásny prvý dojem a hneď pri príchode naladí hostí na atmosféru svadby.",
    modalDescription: "Uvítacia tabuľa vytvorí krásny prvý dojem a hneď pri príchode privíta hostí v štýle vašej svadby. V cene je aj prenajatý stojan s personalizovanou uvítacou tabuľou na plátne.",
    modalDetails: [],
    modalAbout: "Finálny dizajn Vám pošleme do 3 dní. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
  {
    id: "uvitacia-latka",
    name: "Uvítací banner",
    price: "45 €",
    description: "Uvítací banner pôsobí mäkko, romanticky a veľmi pekne vynikne pri vstupe alebo fotení.",
    modalDescription: "Uvítací banner pôsobí romanticky a výrazne vynikne pri vstupe, obrade aj svadobnom fotení. Obsahuje personalizovanú látku s prenajatým stojanom a mašličkami.",
    modalDetails: [],
    modalAbout: "Finálny dizajn Vám pošleme do 3 dní. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
];

const GUEST_SERVICES: ServiceItem[] = [
  {
    id: "cigar-bar",
    name: "Cigar bar",
    price: "Cena individuálne",
    description: "Cigar bar je štýlový doplnok, ktorý vytvorí výrazný zážitok najmä pre mužov.",
    modalDescription: "Cigar bar je štýlový doplnok, ktorý vytvorí výrazný zážitok najmä pre chlapov na svadbe, pri príprave ženícha alebo na rozlúčke so slobodou. Obsahuje drevenú krabičku s potrebným príslušenstvom, personalizované cigary 15 €/ks a možnosť malého sudu s rumom podľa želania.",
    modalDetails: [],
    modalAbout: "Minimálny odber cigár je 6 ks. Doba doručenia je 5 - 15 pracovných dní pre cigary, krabičku a príslušenstvo. Malý čapovací sud iba osobný odber alebo náš dovoz na miesto v rámci Východného Slovenska pri objednávke nad 100 € (+ príplatok PHM).",
    category: "Doplnky pre hostí",
  },
  {
    id: "detske-balicky",
    name: "Detský balíček",
    price: "10 €/ks",
    description: "Detské balíčky spríjemnia svadobný deň malým hosťom a pomôžu zabaviť ich počas hostiny aj programu.",
    modalDescription: "Detský balíček je milý a praktický doplnok, ktorý zabaví deti počas svadby a vytvorí im vlastný malý darček na pamiatku. Obsahuje omaľovánku s menom dieťaťa, ceruzky, nálepky, naťahovaciu hračku, detskú pružinku a bludiská pre zabavenie detí napríklad počas prvého tanca novomanželov.",
    modalDetails: [],
    modalAbout: "Vhodné aj ako darček pre deti do škôlky alebo na iné podujatia. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky pre hostí",
  },
  {
    id: "omalovanky",
    name: "Omaľovánky",
    price: "4 €/ks",
    description: "Omaľovánky sú jednoduchý, ale veľmi obľúbený doplnok, ktorý zabaví deti počas svadobného dňa.",
    modalDescription: "Omaľovánky s menom dieťatka vytvoria milú spomienku a zároveň deti zabavia počas svadobného dňa aj ďalších príležitostí. Omaľovánka má meno dieťatka pre krajšiu spomienku a je možnosť pridať aj ceruzky.",
    modalDetails: [],
    modalAbout: "Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky pre hostí",
  },
  {
    id: "vejare",
    name: "Vejáre",
    price: "1,50 €/ks",
    description: "Vejáre sú pekný aj praktický detail, ktorý hostia ocenia najmä počas teplých letných svadieb.",
    modalDescription: "Vejáre sú elegantný a praktický doplnok, ktorý hostia ocenia najmä počas teplých dní, no hodia sa aj na ďalšie oslavy. Môžu byť bez zdobenia alebo s pridaním mien či iným zdobením. Pri zdobení je cena 2€/ks.",
    modalDetails: [],
    modalAbout: "Minimálny odber je 8 ks. Vhodné aj na rozlúčku so slobodou alebo iné príležitosti. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky pre hostí",
  },
  {
    id: "papucky",
    name: "Papučky",
    price: "0,50 €/ks",
    description: "Papučky doprajú hosťom väčšie pohodlie pri tanci a zároveň spríjemnia neskorší priebeh oslavy.",
    modalDescription: "Papučky sú praktický detail, ktoré hosťom spríjemnia večernú časť oslavy a doprajú im pohodlie pri tanci. Môžu byť bez zdobenia alebo s pridaním mašličky či iného zdobenia.",
    modalDetails: [],
    modalAbout: "Minimálny odber je 8 ks. Vhodné aj na rozlúčku so slobodou alebo na iné príležitosti. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky pre hostí",
  },
  {
    id: "okuliare",
    name: "Okuliare",
    price: "10 €/balík",
    description: "Okuliare sú hravý doplnok, ktorý vie oživiť fotenie, fotokútik aj spontánnu zábavu hostí.",
    modalDescription: "Okuliare prinesú do fotenia a svadobnej zábavy hravosť, farbu a uvoľnenú atmosféru. Obsahujú balík vtipných okuliarov vo vašich farbách.",
    modalDetails: [],
    modalAbout: "Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky pre hostí",
  },
  {
    id: "domaci-med",
    name: "Mini medík domáci",
    price: "1,50 €/ks",
    description: "Domáci med je milá a vkusná pozornosť pre hostí, ktorá pôsobí osobne a srdcom.",
    modalDescription: "Mini medík domáci je chutný a osobný darček pre hostí, ktorý pekne doplní svadobný stôl aj výslužku. Mini medík bez lyžičky obsahuje personalizovanú etiketu a zlatú včielku, verzia s lyžičkou 1,90€/ks obsahuje aj vrecúško a lyžičku k medu.",
    modalDetails: [],
    modalAbout: "Minimálny odber je 30 ks. Doba doručenia je 5 až 20 pracovných dní podľa počtu kusov.",
    category: "Doplnky pre hostí",
  },
  {
    id: "flasticky",
    name: "Mini fľaštičky",
    price: "1,50 €/ks",
    description: "Fľaštičky vieme pripraviť ako originálny drobný darček alebo tematický detail pre vašich hostí.",
    modalDescription: "Mini fľaštičky sú obľúbený darček pre hostí, ktorý vieme zladiť s vašou svadobnou témou aj konkrétnou náplňou podľa želania. Obsahujú personalizovanú etiketu, mašľu alebo stužku. Na výber je klobúčik zlatý, strieborný alebo čierny a náplň podľa vašej požiadavky, napríklad limoncello, medovina, slivka, hruška, marhuľa a ďalšie.",
    modalDetails: [],
    modalAbout: "Minimálny odber je 30 ks. Doba doručenia je 5 až 20 pracovných dní podľa počtu kusov.",
    category: "Doplnky pre hostí",
  },
];

const ALL_SERVICES = [...CUSTOM_SERVICES, ...GUEST_SERVICES];

const TILE_VARIANTS = ["sky", "sand", "pearl", "mist"] as const;

function getTileVariant(index: number) {
  return TILE_VARIANTS[index % TILE_VARIANTS.length];
}

function formatModalDetail(detail: string) {
  return /[.!?]$/.test(detail) ? detail : `${detail}.`;
}

export default function Services() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const activeService = openId ? ALL_SERVICES.find((item) => item.id === openId) ?? null : null;
  const activeServiceImages = activeService
    ? serviceDetailImages(activeService.category, activeService.id, activeService.name)
    : [];

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
      <h2 className="reveal reveal-d1">
        Svadobné <em>doplnky</em>
      </h2>
      <div className="rule reveal reveal-d1">
        <div className="rule-diamond" />
      </div>
      <p className="sec-intro reveal reveal-d2">
        Ponúkame doplnky, ktoré svadbu krásne doladia, spríjemnia hosťom
        a dodajú vášmu dňu ešte osobitejšiu atmosféru.
      </p>
      <div className="doplnkove-wrap">
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
                image={serviceImage(service.category, service.id, service.name)}
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
                image={serviceImage(service.category, service.id, service.name)}
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
              <p className="service-modal-lead">{activeService.modalDescription ?? activeService.description}</p>
              {(activeService.modalDetails ?? activeService.details)?.length ? (
                <ul className="service-modal-list service-modal-list-top">
                  {(activeService.modalDetails ?? activeService.details)?.map((detail) => (
                    <li key={detail}>{formatModalDetail(detail)}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="service-modal-layout">
              <div className="service-modal-section">
                <h3>{activeService.modalSectionTitle ?? "Podrobnosti"}</h3>
                <p>
                  {activeService.modalAbout ?? "Tento doplnok vieme zladiť s vašou farebnosťou, štýlom aj celkovou atmosférou svadby, aby prirodzene zapadol do celého konceptu."}
                </p>
              </div>

              <div className="service-photo-placeholder">
                {activeServiceImages.map((image) => (
                  <FallbackImage
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    className="service-photo-img"
                  />
                ))}
              </div>
            </div>

            <div className="service-modal-actions">
              <span className="service-modal-note">
                Máte záujem o tento doplnok? Napíšte nám a pripravíme ho podľa vašej predstavy.
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
