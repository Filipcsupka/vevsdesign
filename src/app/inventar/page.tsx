import type { Metadata } from "next";
import { pageMetadata } from "@/data/pageMetadata";
import Link from "next/link";
import Nav from "@/components/Nav";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import SelectionBar from "@/components/SelectionBar";
import Footer from "@/components/Footer";
import RevealController from "@/components/RevealController";
import {
  CONTACT_EMAIL,
  CONTACT_INSTAGRAM_HANDLE,
  CONTACT_INSTAGRAM_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/data/businessInfo";

export const metadata: Metadata = pageMetadata({
  title: "Celý inventár | Vevsdesign",
  description:
    "Celý inventár na jednom mieste: prenájom dekorácií, doplnky na mieru a doplnky pre hostí. Vyberte si položky a odošlite jeden dopyt. Košice a okolie.",
  path: "/inventar/",
});

export default function InventarPage() {
  return (
    <>
      <RevealController />
      <Nav />
      <main>
        <section className="home-intro inventar-head">
          <p className="sec-label reveal">Inventár</p>
          <div className="rule reveal reveal-d1">
            <div className="rule-diamond" />
          </div>
          <h1 className="reveal reveal-d1">Celý <em>inventár</em></h1>
          <p className="home-intro-text reveal reveal-d2">
            Prezrite si všetko na jednom mieste, pridajte položky do výberu a my vám pošleme jeden dopyt.
          </p>
          <nav className="inventar-jump reveal reveal-d3" aria-label="Sekcie inventára">
            <a href="#galeria" className="home-link">Prenájom</a>
            <a href="#services" className="home-link">Doplnky</a>
          </nav>
        </section>

        <Gallery />
        <Services afterSelect="stay" />

        <section className="inventar-packages">
          <div className="home-inventory-inner reveal">
            <p className="sec-label">Svadobné balíčky</p>
            <p className="home-inventory-text">Balíčky výzdoby nájdete na stránke plánovania svadby.</p>
            <Link href="/svadba/" className="home-link">Balíčky na svadbu <span aria-hidden="true">→</span></Link>
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
      <SelectionBar />
      <Footer />
    </>
  );
}
