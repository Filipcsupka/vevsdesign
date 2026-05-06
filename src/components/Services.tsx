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
      "0,40 €/ks bez zdobenia",
      "0,50 €/ks s perličkami alebo čipkou naokolo",
      "Možnosť čistej obálky: +0,20 €/ks",
      "Možnosť personalizovanej obálky s iniciálkami: +0,70 €/ks",
      "Pečiatky na zavretie obálky sú v cene",
      "Minimálny odber: 30 ks",
    ],
    modalSectionTitle: "Podrobnosti",
    modalAbout: "V poznámke produktu prosím napísať počet pozvánok, mená a informácie o svadbe, tému svadby pre vašu škálu farieb a či ich chcete bez zdobenia, s perličkami, s obálkami alebo bez nich. Finálny dizajn vám pošleme do 3 dní. Doba doručenia je 5 až 15 pracovných dní.",
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
      "Minimálny odber: 30 ks",
    ],
    modalAbout: "V poznámke produktu prosím napísať všetky mená. Finálny dizajn vám pošleme do 3 dní. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
  {
    id: "balik-tlacovin",
    name: "Balík tlačovín",
    price: "30 €",
    description: "Balík tlačovín vytvorí zladený a praktický set svadobných tlačovín, ktorý doplní výzdobu a zároveň pomôže hosťom lepšie sa zorientovať počas celého dňa.",
    modalDescription: "Balík tlačovín obsahuje zladený set svadobných tlačovín vo vašej téme svadby a farbách, ktorý hosťom uľahčí orientáciu a pekne doplní výzdobu.",
    modalDetails: [
      "Cena balíka: 30 €",
      "Zasadací poriadok s QR kódom",
      "Harmonogram svadby",
      "Čísla stolov",
      "Menu",
      "Vtipné fakty",
      "Informačné tabuľky vo vašej téme svadby a ich farbách",
      "Možnosť doplniť karty do fotokútika s vašimi alebo našimi vtipnými hláškami: +0,40 €/ks",
    ],
    modalAbout: "V poznámke produktu prosím napísať vašu tému svadby a škálu farieb. Ostatné informácie si doladíme mailovo po zaslaní nášho formuláru pre vyplnenie informácií. Finálny dizajn vám pošleme do 3 dní. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
  {
    id: "servitky",
    name: "Servítky",
    price: "0,60 €/ks",
    description: "Servítky vieme doladiť tak, aby pôsobili elegantne a prirodzene zapadli do celého prestretia.",
    modalDescription: "Servítky s vlastným logom jemne doplnia prestretie a prepoja svadobné detaily do jedného vizuálneho celku.",
    modalDetails: [
      "S vlastným logom: 0,60 €/ks",
      "Minimálny odber: 30 ks",
    ],
    modalAbout: "V poznámke produktu prosíme napísať farbu servítok a vaše mená. Doba doručenia je 5 až 20 pracovných dní podľa počtu kusov.",
    category: "Doplnky na mieru",
  },
  {
    id: "kniha-hosti",
    name: "Kniha hostí",
    price: "12 €",
    description: "Kniha hostí vytvorí krásny priestor na odkazy, priania a spomienky od vašich blízkych.",
    modalDescription: "Kniha hostí je krásnou spomienkou na svadobný deň a ponúka priestor na odkazy, priania aj milé slová od vašich blízkych.",
    modalDetails: [
      "Cena: 12 €",
      "Obsahuje personalizovanú prednú časť knihy s vašimi menami",
      "Kniha má čisté strany",
    ],
    modalAbout: "Do poznámky prosím uviesť vaše mená a dátum svadby. Finálny dizajn vám pošleme do 3 dní. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
  {
    id: "box-na-obalky",
    name: "Box na obálky",
    price: "Od 2,50 €",
    description: "Dekoratívny box na obálky je praktický detail, ktorý zároveň pôsobí elegantne a usporiadane.",
    modalDescription: "Box na obálky je praktický aj dekoratívny prvok, ktorý pekne doplní svadobný stôl a zároveň udrží obálky na jednom mieste.",
    modalDetails: [
      "Čistý box: 2,50 €",
      "Personalizovaný box: 5 €",
    ],
    modalAbout: "Do poznámky prosím uviesť pri možnosti zdobenia vaše mená a dátum svadby. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
  {
    id: "strom-na-platne",
    name: "Strom na plátne",
    price: "15 €",
    description: "Strom na plátne je jemná a osobná pamiatka, do ktorej hostia zanechajú svoj vlastný odtlačok.",
    modalDescription: "Strom na plátne ostane po svadbe ako krásna osobná spomienka, do ktorej hostia zanechajú svoj odtlačok.",
    modalDetails: [
      "Cena: 15 €",
      "Farby podľa želania",
      "Prenajatý stojan",
    ],
    modalAbout: "Strom na plátne vám ostane ako krásna spomienka. Do poznámky prosím uviesť vaše mená a dátum svadby. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
  {
    id: "uvitacia-tabula",
    name: "Uvítacia tabuľa",
    price: "25 €",
    description: "Uvítacia tabuľa vytvorí krásny prvý dojem a hneď pri príchode naladí hostí na atmosféru svadby.",
    modalDescription: "Uvítacia tabuľa vytvorí krásny prvý dojem a hneď pri príchode privíta hostí v štýle vašej svadby.",
    modalDetails: [
      "Cena: 25 €",
      "Prenajatý stojan",
      "Personalizovaná uvítacia tabuľa na plátne",
    ],
    modalAbout: "Do poznámky prosím uviesť vaše mená a dátum svadby. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
  {
    id: "uvitacia-latka",
    name: "Uvítací banner",
    price: "45 €",
    description: "Uvítací banner pôsobí mäkko, romanticky a veľmi pekne vynikne pri vstupe alebo fotení.",
    modalDescription: "Uvítací banner pôsobí romanticky a výrazne vynikne pri vstupe, obrade aj svadobnom fotení.",
    modalDetails: [
      "Cena: 45 €",
      "Obsahuje personalizovanú látku s prenajatým stojanom a mašličkami",
    ],
    modalAbout: "Do poznámky prosím uviesť vaše mená a dátum svadby. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky na mieru",
  },
];

const GUEST_SERVICES: ServiceItem[] = [
  {
    id: "cigar-bar",
    name: "Cigar bar",
    price: "Cena individuálne",
    description: "Cigar bar je štýlový doplnok, ktorý vytvorí výrazný zážitok najmä počas večernej časti programu.",
    modalDescription: "Cigar bar je štýlový doplnok, ktorý vytvorí výrazný zážitok počas rozlúčky so slobodou, príprav ženícha aj priamo na svadbe.",
    modalDetails: [
      "Drevená krabička s potrebným príslušenstvom",
      "Personalizované cigary: 15 €/ks",
      "Možnosť malého sudu s rumom podľa želania",
      "Minimálny odber cigár: 6 ks",
    ],
    modalAbout: "Hodí sa to aj na rozlúčku so slobodou, na prípravu ženícha alebo priamo na svadbu. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky pre hostí",
  },
  {
    id: "detske-balicky",
    name: "Detský balíček",
    price: "10 €/ks",
    description: "Detské balíčky spríjemnia svadobný deň malým hosťom a pomôžu zabaviť ich počas hostiny aj programu.",
    modalDescription: "Detský balíček je milý a praktický doplnok, ktorý zabaví deti počas svadby a vytvorí im vlastný malý darček na pamiatku.",
    modalDetails: [
      "10 €/ks",
      "Obsahuje omaľovánku s menom dieťaťa",
      "Ceruzky",
      "Nálepky",
      "Naťahovaciu hračku",
      "Detskú pružinku",
      "Bludiská pre zabavenie detí napríklad počas prvého tanca novomanželov",
    ],
    modalAbout: "Vhodné aj ako darček pre deti do škôlky alebo na iné podujatia. V poznámke produktu prosím napísať mená detičiek. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky pre hostí",
  },
  {
    id: "omalovanky",
    name: "Omaľovánky",
    price: "4 €/ks",
    description: "Omaľovánky sú jednoduchý, ale veľmi obľúbený doplnok, ktorý zabaví deti počas svadobného dňa.",
    modalDescription: "Omaľovánky s menom dieťatka vytvoria milú spomienku a zároveň deti zabavia počas svadobného dňa aj ďalších príležitostí.",
    modalDetails: [
      "4 €/ks",
      "Omaľovánka má meno dieťatka pre krajšiu spomienku",
      "Možnosť pridania ceruziek: +0,50 €",
    ],
    modalAbout: "V poznámke produktu prosím napísať mená. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky pre hostí",
  },
  {
    id: "vejare",
    name: "Vejáre",
    price: "1,50 €/ks",
    description: "Vejáre sú pekný aj praktický detail, ktorý hostia ocenia najmä počas teplých letných svadieb.",
    modalDescription: "Vejáre sú elegantný a praktický doplnok, ktorý hostia ocenia najmä počas teplých dní, no hodia sa aj na ďalšie oslavy.",
    modalDetails: [
      "1,50 €/ks bez zdobenia",
      "2 €/ks s pridaním mien alebo iným zdobením",
      "Minimálny odber: 8 ks",
    ],
    modalAbout: "Vhodné aj na rozlúčku so slobodou alebo iné príležitosti. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky pre hostí",
  },
  {
    id: "papucky",
    name: "Papučky",
    price: "0,50 €/ks",
    description: "Papučky doprajú hosťom väčšie pohodlie pri tanci a zároveň spríjemnia neskorší priebeh oslavy.",
    modalDescription: "Papučky sú praktický detail, ktorý hosťom spríjemní večernú časť oslavy a dopraje im viac pohodlia pri tanci.",
    modalDetails: [
      "0,50 €/ks bez zdobenia",
      "1 €/ks s pridaním mašličky alebo iného zdobenia",
      "Minimálny odber: 8 ks",
    ],
    modalAbout: "Vhodné aj na rozlúčku so slobodou alebo na iné príležitosti. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky pre hostí",
  },
  {
    id: "okuliare",
    name: "Okuliare",
    price: "10 €/balík",
    description: "Okuliare sú hravý doplnok, ktorý vie oživiť fotenie, fotokútik aj spontánnu zábavu hostí.",
    modalDescription: "Okuliare prinesú do fotenia a svadobnej zábavy hravosť, farbu a uvoľnenú atmosféru.",
    modalDetails: [
      "10 €/balík",
      "Obsahuje balík vtipných okuliarov vo vašich farbách",
    ],
    modalAbout: "Do poznámky prosím uviesť potrebné farby okuliarov. Doba doručenia je 5 až 15 pracovných dní.",
    category: "Doplnky pre hostí",
  },
  {
    id: "domaci-med",
    name: "Mini medík domáci",
    price: "1,50 €/ks",
    description: "Domáci med je milá a vkusná pozornosť pre hostí, ktorá pôsobí osobne a srdcom.",
    modalDescription: "Mini medík domáci je chutný a osobný darček pre hostí, ktorý pekne doplní svadobný stôl aj výslužku.",
    modalDetails: [
      "1,50 €/ks bez lyžičky",
      "1,90 €/ks s lyžičkou",
      "Med je domáci, plnený",
      "Mini medík bez lyžičky obsahuje personalizovanú etiketu a zlatú včielku",
      "Mini medík s lyžičkou obsahuje aj vrecúško a lyžičku k medu",
      "Minimálny odber: 30 ks",
    ],
    modalAbout: "V poznámke produktu prosím napísať vaše mená. Doba doručenia je 5 až 20 pracovných dní podľa počtu kusov.",
    category: "Doplnky pre hostí",
  },
  {
    id: "flasticky",
    name: "Mini fľaštičky",
    price: "1,50 €/ks",
    description: "Fľaštičky vieme pripraviť ako originálny drobný darček alebo tematický detail pre vašich hostí.",
    modalDescription: "Mini fľaštičky sú obľúbený darček pre hostí, ktorý vieme zladiť s vašou svadobnou témou aj konkrétnou náplňou podľa želania.",
    modalDetails: [
      "1,50 €/ks",
      "Obsahuje personalizovanú etiketu, mašľu alebo stužku",
      "Na výber klobúčik zlatý, strieborný alebo čierny",
      "Naplnenie fľašiek podľa vašej požiadavky: limoncello, medovina, slivka, hruška, marhuľa a ďalšie",
      "Minimálny odber: 30 ks",
    ],
    modalAbout: "V poznámke produktu prosím napísať farbu klobúčika, farbu stužky, mená, tému a farbu svadby pre etiketu aj náplň. Doba doručenia je 5 až 20 pracovných dní podľa počtu kusov.",
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
              <p className="service-modal-lead">{activeService.modalDescription ?? activeService.description}</p>
              {(activeService.modalDetails ?? activeService.details)?.length ? (
                <ul className="service-modal-list service-modal-list-top">
                  {(activeService.modalDetails ?? activeService.details)?.map((detail) => (
                    <li key={detail}>{detail}</li>
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
