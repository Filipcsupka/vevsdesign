import type { Metadata } from "next";
import { pageMetadata } from "@/data/pageMetadata";
import Link from "next/link";
import Nav from "@/components/Nav";
import Baliky from "@/components/Baliky";
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
  title: "Plánovanie celej svadby | Vevsdesign",
  description:
    "Svadobné balíčky výzdoby na mieru. Košice a okolie.",
  path: "/svadba/",
});

export default function SvadbaPage() {
  return (
    <>
      <RevealController />
      <Nav />
      <main>
        <section className="home-intro svadba-head">
          <p className="sec-label reveal">Svadba</p>
          <div className="rule reveal reveal-d1">
            <div className="rule-diamond" />
          </div>
          <h1 className="reveal reveal-d1">Plánovanie <em>celej svadby</em></h1>
          <p className="home-intro-text reveal reveal-d2">
            Tvoríme kompletnú svadobnú a eventovú výzdobu plnú detailov. Každú svadbu vnímame ako jedinečný príbeh,
            pri ktorom nám záleží na každom prvku a každej emócii. Vyberte si balíček, ktorý vám sadne.
          </p>
        </section>

        <Baliky />

        <section className="home-inventory">
          <div className="home-inventory-inner reveal">
            <p className="sec-label">Inventár</p>
            <p className="home-inventory-text">
              Všetky doplnky a položky si môžete vybrať v inventári.
            </p>
            <Link href="/inventar/" className="home-link">Vybrať z celého inventára <span aria-hidden="true">→</span></Link>
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
