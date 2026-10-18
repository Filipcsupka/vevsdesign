import Link from "next/link";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import News2027 from "@/components/News2027";
import Footer from "@/components/Footer";
import FallbackImage from "@/components/FallbackImage";
import RevealController from "@/components/RevealController";
import { PACKAGES } from "@/data/packages";
import {
  CONTACT_EMAIL,
  CONTACT_INSTAGRAM_HANDLE,
  CONTACT_INSTAGRAM_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/data/businessInfo";
import { rentalImage } from "@/data/imageAssets";

const planningPhoto = rentalImage("kvetinova-vyzdoba", "mala-ikebana", "Priehľadné stoličky s modrými stuhami a kvetmi pri svadobnom obrade v záhrade");
const rentalPhoto = rentalImage("stojany-zrkadla", "stojan-oval-s-bocnymi-vlnami", "Biely oblúkový stojan s bielymi kvetmi a sviečkami");

const SERVICE_CARDS = [
  {
    href: "/svadba/",
    title: "Plánovanie celej svadby",
    text: "Balíky výzdoby od návrhu až po zariadenie priestoru.",
    image: planningPhoto,
  },
  {
    href: "/prenajom/",
    title: "Prenájom dekorácií",
    text: "Stojany, zrkadlá, ikebany, vázy a svietniky na mieru.",
    image: rentalPhoto,
  },
];

export default function Page() {
  return (
    <>
      <RevealController />
      <Nav />
      <main>
        <Hero />

        <section className="home-intro">
          <p className="sec-label reveal">O nás</p>
          <div className="rule reveal reveal-d1">
            <div className="rule-diamond" />
          </div>
          <p className="home-intro-text reveal reveal-d2">
            Tvoríme kompletnú svadobnú a eventovú výzdobu plnú detailov. Každú svadbu vnímame ako jedinečný príbeh,
            pri ktorom nám záleží na každom prvku a každej emócii. Od kvetinových ikebán a stolov až po tlačoviny
            na mieru.
          </p>
        </section>

        <section className="home-services" aria-label="Naše služby">
          <p className="sec-label reveal">Naše služby</p>
          <div className="rule reveal reveal-d1">
            <div className="rule-diamond" />
          </div>
          <div className="home-cards">
            {SERVICE_CARDS.map((card, i) => (
              <Link key={card.href} href={card.href} className={`home-card reveal reveal-d${i + 1}`}>
                <FallbackImage src={card.image.src} alt={card.image.alt} className="home-card-img" />
                <span className="home-card-shade" aria-hidden="true" />
                <span className="home-card-body">
                  <span className="home-card-text">{card.text}</span>
                  <span className="home-card-btn">{card.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <News2027 />

        <section className="home-packages">
          <p className="sec-label reveal">Balíčky</p>
          <div className="rule reveal reveal-d1">
            <div className="rule-diamond" />
          </div>
          <h2 className="reveal reveal-d1">Svadobné <em>balíčky</em></h2>
          <div className="home-pkg-grid">
            {PACKAGES.map((p, i) => (
              <Link key={p.id} href="/svadba/" className={`home-pkg reveal reveal-d${i + 1}`}>
                <span className="home-pkg-badge">{p.badge}</span>
                <span className="home-pkg-name">{p.name}</span>
                <span className="home-pkg-price">{p.price}</span>
                <span className="home-pkg-line">{p.summary}</span>
              </Link>
            ))}
          </div>
          <p className="home-more reveal">
            <Link href="/svadba/" className="home-link">Všetky balíčky <span aria-hidden="true">→</span></Link>
          </p>
        </section>

        <section className="home-inventory">
          <div className="home-inventory-inner reveal">
            <p className="sec-label">Inventár</p>
            <p className="home-inventory-text">
              Celý inventár na jednom mieste. Vyberte si položky a dopyt nám odošlete sami.
            </p>
            <Link href="/inventar/" className="home-link">Celý inventár <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="home-contact">
          <p className="sec-label reveal">Kontakt</p>
          <div className="rule reveal reveal-d1">
            <div className="rule-diamond" />
          </div>
          <h2 className="reveal reveal-d1">Napíšte nám <em>alebo zavolajte</em></h2>
          <ul className="home-contact-list reveal reveal-d2">
            <li><a href={`tel:${CONTACT_PHONE_HREF}`}>{CONTACT_PHONE_DISPLAY}</a></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            <li>
              <a href={CONTACT_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{CONTACT_INSTAGRAM_HANDLE}</a>
            </li>
          </ul>
          <div className="btn-pair-static reveal reveal-d3">
            <Link href="/kontakt/" className="btn-p">Kontaktný formulár</Link>
          </div>
        </section>
      </main>
      <Link href="/kontakt/" className="mobile-contact-cta">Kontaktujte nás</Link>
      <Footer />
    </>
  );
}
