import type { Metadata } from "next";
import { pageMetadata } from "@/data/pageMetadata";
import Link from "next/link";
import Nav from "@/components/Nav";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import RevealController from "@/components/RevealController";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import {
  CONTACT_EMAIL,
  CONTACT_INSTAGRAM_HANDLE,
  CONTACT_INSTAGRAM_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/data/businessInfo";

export const metadata: Metadata = pageMetadata({
  title: "Prenájom dekorácií | Vevsdesign",
  description:
    "Prenájom svadobných a eventových dekorácií: kvetinová výzdoba, detský kútik, stojany, zrkadlá, vázy a svietniky. Košice a okolie.",
  path: "/prenajom/",
});

export default function PrenajomPage() {
  return (
    <>
      <RevealController />
      <BackgroundCanvas />
      <Nav />
      <main>
        <section className="home-intro prenajom-head">
          <p className="sec-label reveal">Prenájom</p>
          <div className="rule reveal reveal-d1">
            <div className="rule-diamond" />
          </div>
          <h1 className="reveal reveal-d1">Prenájom</h1>
        </section>

        <Gallery variant="browse" />

        <section className="home-contact">
          <p className="sec-label reveal">Kontakt</p>
          <div className="rule reveal reveal-d1">
            <div className="rule-diamond" />
          </div>
          <h2 className="reveal reveal-d1">Napíšte nám <em>alebo zavolajte</em></h2>
          <ul className="home-contact-list">
            <li><a href={`tel:${CONTACT_PHONE_HREF}`}>{CONTACT_PHONE_DISPLAY}</a></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            <li>
              <a href={CONTACT_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{CONTACT_INSTAGRAM_HANDLE}</a>
            </li>
          </ul>
          <div className="btn-pair-static">
            <Link href="/kontakt/" className="btn-p">Kontaktný formulár</Link>
          </div>
        </section>
      </main>
      <Link href="/kontakt/" className="mobile-contact-cta">Kontaktujte nás</Link>
      <Footer />
    </>
  );
}
