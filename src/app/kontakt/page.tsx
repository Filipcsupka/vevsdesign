import type { Metadata } from "next";
import { pageMetadata } from "@/data/pageMetadata";
import Nav from "@/components/Nav";
import Kontakt from "@/components/Kontakt";
import KontaktSelectionHint from "@/components/KontaktSelectionHint";
import Footer from "@/components/Footer";
import RevealController from "@/components/RevealController";
import BackgroundCanvas from "@/components/BackgroundCanvas";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt | Vevsdesign",
  description:
    "Nezáväzný dopyt na svadobnú výzdobu, prenájom dekorácií alebo NFC srdce. Košice a východné Slovensko.",
  path: "/kontakt/",
});

export default function KontaktPage() {
  return (
    <>
      <RevealController />
      <BackgroundCanvas />
      <Nav />
      <main>
        <section className="home-intro kontakt-head">
          <p className="sec-label reveal">Kontakt</p>
          <div className="rule reveal reveal-d1">
            <div className="rule-diamond" />
          </div>
          <h1 className="reveal reveal-d1">Napíšte <em>nám</em></h1>
          <KontaktSelectionHint />
        </section>
        <Kontakt />
      </main>
      <Footer />
    </>
  );
}
