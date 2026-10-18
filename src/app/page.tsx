import Link from "next/link";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import News2027 from "@/components/News2027";
import Footer from "@/components/Footer";
import Kontakt from "@/components/Kontakt";
import FallbackImage from "@/components/FallbackImage";
import RevealController from "@/components/RevealController";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import { rentalImage } from "@/data/imageAssets";

const planningPhoto = rentalImage("kvetinova-vyzdoba", "mala-ikebana", "Priehľadné stoličky s modrými stuhami a kvetmi pri svadobnom obrade v záhrade");
const rentalPhoto = rentalImage("stojany-zrkadla", "stojan-oval-s-bocnymi-vlnami", "Biely oblúkový stojan s bielymi kvetmi a sviečkami");

const SERVICE_CARDS = [
  {
    href: "/svadba/",
    title: "Kompletná výzdoba",
    image: planningPhoto,
  },
  {
    href: "/inventar/",
    title: "Prenájom",
    image: rentalPhoto,
  },
];

export default function Page() {
  return (
    <>
      <RevealController />
      <BackgroundCanvas />
      <Nav />
      <main>
        <Hero />

        <section className="home-intro">
          <p className="sec-label reveal">O nás</p>
          <div className="rule reveal reveal-d1">
            <div className="rule-diamond" />
          </div>
          <p className="home-intro-text reveal reveal-d2">
            Tvoríme kompletnú svadobnú a eventovú výzdobu plnú detailov. Kreativita je našou silnou stránkou a práve preto každú svadbu alebo event vnímame ako jedinečný príbeh, pri ktorom nám záleží na každom prvku a každej emócii. Ponúkame komplexné balíky, doplnky a tlačoviny na mieru, doplnky pre hostí a deti, stojany, zrkadlá, svietniky a kompletnú výzdobu stolov s vytvorením honosných ikebán a aranžmánom živých kvetov.
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
                  <span className="home-card-btn">{card.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <News2027 />

        <Kontakt />
      </main>
      <Link href="/kontakt/" className="mobile-contact-cta">Kontaktujte nás</Link>
      <Footer />
    </>
  );
}
